# SECURITY — Gestion des Secrets

Ce document décrit la stratégie de gestion des secrets du projet : l'architecture technique mise en place, les procédures opérationnelles du quotidien, et le plan de disaster recovery. Tous les secrets Kubernetes du projet sont chiffrés via **Bitnami Sealed Secrets**, ce qui permet de versionner les secrets dans Git sans jamais exposer de valeur en clair.

## 🏗️ Architecture

Le flux complet, de la machine de développement jusqu'au Pod qui consomme le secret :

```
DEV MACHINE                                   KUBERNETES CLUSTER
─────────────                                 ──────────────────
secret.yaml (clair, local)                    kube-system
       │                                      ┌──────────────────────────┐
       │  kubeseal --fetch-cert               │ sealed-secrets-controller │
       │ ◄────── (clé publique) ───────────── │   (clé privée RSA)        │
       │                                      └───────────┬──────────────┘
       │ chiffre avec la clé publique                     │
       ▼                                                  │
sealed-secret.yaml (chiffré) ✅ commitable                │
       │                                                  │
   git commit / git push                                  │
       │                                                  │
       ▼                                                  ▼
   CI/CD ──► kubectl apply ──────────────► déchiffre (clé privée)
                                                          │
                                                          ▼
                                                  Secret K8s standard
                                                  (namespace btp-app)
                                                          │
                                                          ▼
                                                  Pod consomme via envFrom
```

Le principe en quelques phrases :

- Le CLI **`kubeseal`** chiffre les valeurs avec la **clé publique** du cluster (récupérée auprès du controller). N'importe qui peut chiffrer, mais personne ne peut déchiffrer sans la clé privée.
- La **clé privée RSA** vit exclusivement dans le cluster (Secret du namespace `kube-system`) et **ne sort jamais** — elle n'est ni dans Git, ni sur les machines de dev.
- Les **`SealedSecret`** sont des objets CRD Kubernetes contenant uniquement du chiffré : ils sont donc **lisibles et versionnables dans Git** sans risque.
- C'est le **controller** qui réalise le déchiffrement **au moment du `kubectl apply`**, et qui crée alors un `Secret` Kubernetes standard que les Pods consomment normalement.

### Portée (scope) des SealedSecrets

Par défaut, un SealedSecret est chiffré pour un **couple précis (namespace, nom)** : il ne peut être déchiffré que s'il est appliqué dans le bon namespace, sous le bon nom. Cela évite qu'un attaquant copie un SealedSecret vers un namespace qu'il contrôle pour le faire déchiffrer. Trois portées existent :

| Scope | Comportement | Usage dans ce projet |
|-------|--------------|----------------------|
| `strict` (défaut) | Lié au namespace **et** au nom | Tous nos SealedSecrets |
| `namespace-wide` | Lié au namespace, nom libre | Non utilisé |
| `cluster-wide` | Déchiffrable partout | Non utilisé (à proscrire) |

Conséquence pratique : un `sealed-secret.yaml` chiffré pour `btp-app` **ne fonctionnera pas** si on tente de l'appliquer dans `default` ou tout autre namespace.

## 🔑 Composants

| Composant | Emplacement | Rôle |
|-----------|-------------|------|
| Controller Sealed Secrets | Pod `sealed-secrets-controller` (ns `kube-system`) | Détient la clé privée, déchiffre les SealedSecrets à l'`apply` et crée les Secrets K8s |
| CRD `sealedsecrets.bitnami.com` | Cluster-wide | Définit le type d'objet `SealedSecret` reconnu par l'API Kubernetes |
| CLI `kubeseal` | Machine de développement | Chiffre les `secret.yaml` locaux en `sealed-*.yaml` à l'aide de la clé publique |
| Clé publique | Récupérable via `kubeseal --fetch-cert` | Sert à chiffrer ; peut être partagée librement (aucun secret) |
| Clé privée maître | Secret `sealed-secrets-key*` (ns `kube-system`) | Sert à déchiffrer ; **ne quitte jamais le cluster** |
| Backup clé maître | `sealed-secrets-master-key.local.yaml` (racine, **gitignoré**) | Copie de la clé privée pour le disaster recovery |

> ⚠️ Le fichier `sealed-secrets-master-key.local.yaml` contient la clé privée en clair. Il est protégé par `.gitignore` et **ne doit jamais** être commité ni partagé en clair.

## 📋 Liste des Secrets gérés

| Nom | Namespace | Contenu | Consommé par |
|-----|-----------|---------|--------------|
| `mongodb-secret` | `btp-app` | Root credentials MongoDB | `mongodb` + `mongodb-exporter` |
| `rabbitmq-secret` | `btp-app` | Credentials RabbitMQ | `rabbitmq` + services Spring |
| `jwt-secret` | `btp-app` | Clé HS256 partagée (JWT) | Tous les microservices Spring |
| `user-service-secret` | `btp-app` | Mongo credentials | `user-service` |
| `plan-service-secret` | `btp-app` | Mongo credentials | `plan-service` |
| `affaire-service-secret` | `btp-app` | Mongo credentials | `affaire-service` |
| `controle-service-secret` | `btp-app` | Mongo + RabbitMQ credentials | `controle-service` |
| `notification-service-secret` | `btp-app` | Mongo + RabbitMQ credentials | `notification-service` |

Chacun de ces Secrets possède un fichier `sealed-*.yaml` correspondant versionné dans `k8s/base/<service>/`.

## 🛠️ Procédures opérationnelles

### Créer un nouveau Secret chiffré

Pour ajouter un nouveau secret (exemple : un secret applicatif `mon-service-secret`) :

```bash
# 1. Créer le secret.yaml en clair, en local et hors du repo (ex: /tmp)
kubectl create secret generic mon-service-secret \
  --namespace btp-app \
  --from-literal=API_KEY="$(openssl rand -base64 24)" \
  --dry-run=client -o yaml > /tmp/mon-service-secret.yaml

# 2. Chiffrer avec kubeseal vers l'arborescence du repo
kubeseal \
  --controller-name=sealed-secrets-controller \
  --controller-namespace=kube-system \
  --format=yaml \
  < /tmp/mon-service-secret.yaml \
  > k8s/base/mon-service/sealed-secret.yaml

# 3. Supprimer immédiatement le fichier clair
rm -f /tmp/mon-service-secret.yaml

# 4. Appliquer le SealedSecret au cluster (le controller crée le Secret)
kubectl apply -f k8s/base/mon-service/sealed-secret.yaml

# 5. Versionner le chiffré
git add k8s/base/mon-service/sealed-secret.yaml
git commit -m "feat(secrets): add sealed secret for mon-service"
```

### Rotater un Secret existant

Pour remplacer la valeur d'un credential (exemple : rotation du mot de passe RabbitMQ) :

```bash
# 1. Générer la nouvelle valeur
NEW_PASSWORD="$(openssl rand -base64 24)"

# 2. Construire un secret.yaml temporaire avec la nouvelle valeur
kubectl create secret generic rabbitmq-secret \
  --namespace btp-app \
  --from-literal=username=btp \
  --from-literal=password="$NEW_PASSWORD" \
  --dry-run=client -o yaml > /tmp/rabbitmq-secret.yaml

# 3. Re-chiffrer : écrase le sealed-*.yaml existant
kubeseal \
  --controller-name=sealed-secrets-controller \
  --controller-namespace=kube-system \
  --format=yaml \
  < /tmp/rabbitmq-secret.yaml \
  > k8s/base/rabbitmq/sealed-secret.yaml

# 4. Supprimer le fichier temporaire
rm -f /tmp/rabbitmq-secret.yaml

# 5. Appliquer + redémarrer les consommateurs pour recharger l'env
kubectl apply -f k8s/base/rabbitmq/sealed-secret.yaml
kubectl rollout restart deployment/controle-service -n btp-app
kubectl rollout restart deployment/notification-service -n btp-app

# 6. Versionner le nouveau chiffré
git add k8s/base/rabbitmq/sealed-secret.yaml
git commit -m "chore(secrets): rotate rabbitmq credentials"
```

> 📝 **Important** : les Pods lisent les Secrets via `envFrom` **au démarrage**. Une simple mise à jour du Secret ne suffit pas : il faut un `rollout restart` des Deployments consommateurs pour que la nouvelle valeur soit prise en compte.

### Vérifier qu'un Secret est bien chiffré avant commit

Audit rapide : aucune valeur lisible ne doit figurer dans les `sealed-*.yaml`. Un SealedSecret correct ne contient qu'un bloc `encryptedData` avec des blobs base64 commençant par `Ag`.

```bash
# Le SealedSecret doit contenir encryptedData (et pas data: en clair)
grep -L "encryptedData" k8s/base/**/sealed-*.yaml   # doit ne rien lister

# Recherche défensive de motifs sensibles dans les sealed (doit être vide)
grep -rEi "password:|secret:|api[_-]?key:" k8s/base --include="sealed-*.yaml" \
  | grep -v "encryptedData" || echo "✅ Aucune clé en clair détectée"
```

À terme, cet audit est automatisé par **gitleaks** en CI (voir la section *Politique du repo*).

### Récupérer / sauvegarder la clé publique du cluster

La clé publique n'est pas un secret : elle peut être exportée pour permettre à un développeur de chiffrer des secrets **hors ligne**, sans accès direct au controller.

```bash
# Exporter le certificat (clé publique) du controller
kubeseal \
  --controller-name=sealed-secrets-controller \
  --controller-namespace=kube-system \
  --fetch-cert > pub-cert.pem

# Chiffrer ensuite en mode hors ligne avec ce certificat
kubeseal --cert pub-cert.pem --format=yaml \
  < /tmp/mon-secret.yaml > k8s/base/mon-service/sealed-secret.yaml
```

### Sauvegarder la clé privée maître (backup disaster recovery)

À refaire après toute rotation de clé du controller (le controller fait tourner ses clés périodiquement) :

```bash
kubectl get secret -n kube-system \
  -l sealedsecrets.bitnami.com/sealed-secrets-key=active \
  -o yaml > sealed-secrets-master-key.local.yaml

# Vérifier que le backup est bien ignoré par Git AVANT tout commit
git check-ignore -v sealed-secrets-master-key.local.yaml
```

## 🚨 Disaster Recovery

### Scénario 1 : perte d'un pod du controller

Aucune action manuelle requise. Le `Deployment` `sealed-secrets-controller` recrée automatiquement un nouveau Pod, qui relit la clé privée depuis le Secret `sealed-secrets-key*` du namespace `kube-system`. Les SealedSecrets restent déchiffrables sans interruption.

```bash
kubectl get pods -n kube-system -l app.kubernetes.io/name=sealed-secrets
```

### Scénario 2 : perte du Secret `sealed-secrets-key` dans kube-system

La clé privée a été perdue mais le cluster et le backup local existent encore. On restaure la clé puis on redémarre le controller pour qu'il la recharge :

```bash
# Restaurer la clé maître depuis le backup gitignoré
kubectl apply -f sealed-secrets-master-key.local.yaml -n kube-system

# Forcer le controller à recharger la clé
kubectl delete pod -n kube-system -l app.kubernetes.io/name=sealed-secrets
```

### Scénario 3 : perte complète du cluster

Reconstruction intégrale depuis zéro (le backup de la clé maître est indispensable) :

```bash
# 1. Reprovisionner un cluster Kubernetes
#    (Docker Desktop : réactiver Kubernetes ; prod : recréer le cluster)

# 2. Réinstaller le controller via Helm
helm repo add sealed-secrets https://bitnami-labs.github.io/sealed-secrets
helm repo update
helm install sealed-secrets-controller sealed-secrets/sealed-secrets \
  --namespace kube-system \
  --set fullnameOverride=sealed-secrets-controller

# 3. Restaurer la clé privée maître backupée
kubectl apply -f sealed-secrets-master-key.local.yaml -n kube-system

# 4. Redémarrer le controller pour qu'il recharge la clé restaurée
kubectl delete pod -n kube-system -l app.kubernetes.io/name=sealed-secrets

# 5. Re-bootstrapper tous les SealedSecrets de l'application
./scripts/setup-secrets.sh

# 6. Redéployer les workloads applicatifs
kubectl apply -f k8s/base/   # ou la commande kustomize/helm du projet
```

### Scénario 4 : perte du cluster ET du backup

C'est le pire cas : sans la clé privée (perdue avec le cluster) **et** sans le backup, **les SealedSecrets deviennent indéchiffrables définitivement**. Aucune récupération n'est possible. Il faut alors :

1. Réinstaller un controller (qui génère une **nouvelle** paire de clés).
2. **Régénérer tous les credentials** (nouveaux mots de passe Mongo, RabbitMQ, nouvelle clé JWT…).
3. Re-chiffrer tous les secrets avec la nouvelle clé publique et recommiter les `sealed-*.yaml`.

> 🔐 **En production**, le backup `sealed-secrets-master-key.local.yaml` doit impérativement être stocké **hors de la machine de dev** (coffre-fort de secrets, gestionnaire type Vault, ou stockage chiffré séparé), pour que la perte simultanée du cluster et du backup soit improbable.

## ⚠️ Politique du repo

1. **Aucun `secret.yaml` en clair n'est commité** — le `.gitignore` bloque `**/secret.yaml`, `**/*-secret.yaml` et `**/secrets/*.yaml`.
2. **Seuls les `sealed-*.yaml` sont autorisés** dans Git, via l'exception `.gitignore` `!**/sealed-*.yaml` (les SealedSecrets sont chiffrés, donc sûrs).
3. **Les fichiers `*.local.*` ne sont jamais commités** (notamment `sealed-secrets-master-key.local.yaml` et `secrets.local.txt`), réservés au poste local / disaster recovery.
4. **gitleaks** (à intégrer en CI) scanne chaque Pull Request pour détecter toute fuite de credential avant merge.

## 📚 Références

- Bitnami Sealed Secrets : https://github.com/bitnami-labs/sealed-secrets
- Documentation kubeseal (usage) : https://github.com/bitnami-labs/sealed-secrets#usage
