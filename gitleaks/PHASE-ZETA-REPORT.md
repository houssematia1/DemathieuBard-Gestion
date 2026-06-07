# Phase ζ (zeta) — Détection de secrets avec gitleaks — Rapport

**Projet :** PFE « Plateforme Cloud-Native DevSecOps BTP » (microservices Spring Boot + Kubernetes)
**Date :** 2026-06-07
**Outil :** gitleaks v8.30.1 (installé via `winget install gitleaks.gitleaks`)
**Objectif :** installer gitleaks, scanner l'historique git complet, classifier les findings, allowlister les faux positifs, et ajouter un job CI `secret-scan` fail-fast.
**Contrainte respectée :** aucune réécriture d'historique (pas de filter-repo/BFG), aucun commit automatique.

---

## 0. TL;DR (résumé exécutif)

- **27 findings** détectés sur **51 commits** (~326 MB) par le ruleset par défaut de gitleaks.
- Classification :
  - **9 faux positifs** — blobs chiffrés des SealedSecrets (`sealed-*.yaml`) → **allowlistés**.
  - **7 secrets rotés/morts** — placeholder JWT par défaut → **ignorés** (`.gitleaksignore`).
  - **11 secrets ACTIFS** → **à rotater d'urgence** (NON ignorés, c'est volontaire) :
    - 6 × mot de passe root MongoDB (historique, commit `3c044077`)
    - 3 × mot de passe RabbitMQ (historique, commit `3c044077`)
    - 1 × clé de signature JWT (historique, commit `3c044077`)
    - 1 × **mot de passe admin Grafana — EN CLAIR à HEAD** dans `k8s/monitoring/values.yaml:115` (commit `6c885f6c`)
- 🔴 **Découverte majeure** : le mot de passe Grafana n'a **jamais** été migré vers Sealed Secrets — il est encore en clair dans le **code actuel**, pas seulement dans l'historique.
- ⚠️ **Correction du postulat de départ** : les credentials Mongo/RabbitMQ/JWT n'étaient pas « rotés et juste résiduels » — ce sont (au commit `3c044077`, dit « rotate credentials ») **les credentials qui étaient encore actifs en cluster** lors des Phases γ/ε (2026-06-06). Voir §4.

---

## 1. Fichiers créés / modifiés

| Fichier | Type | Rôle | Committable ? |
|---------|------|------|---------------|
| `gitleaks/.gitleaks.toml` | Config | Étend le ruleset par défaut (`useDefault=true`) + **allowlist** des `sealed-*.yaml` et du dossier `gitleaks/` | ✅ oui |
| `.gitleaksignore` (racine) | Ignore-list | Fingerprints des findings **rotés confirmés** (placeholder JWT). Les 11 actifs y sont en **commentaire** (à décommenter seulement après rotation) | ✅ oui |
| `gitleaks/.gitignore` | Git | Empêche de committer les rapports **bruts** (`scan-history.json`, `*-console.txt`, `*.sarif`) qui contiennent les secrets en clair | ✅ oui |
| `gitleaks/scan-summary.txt` | Rapport | Résumé **rédacté** (aucune valeur de secret), lisible | ✅ oui |
| `gitleaks/scan-history.json` | Rapport brut | Sortie JSON complète gitleaks — **contient les secrets en clair** | ❌ gitignoré |
| `gitleaks/scan-history-console.txt` | Rapport brut | Sortie console `--verbose` — **contient les secrets** | ❌ gitignoré |
| `.github/workflows/secret-scan.yml` | CI | Job GitHub Actions `secret-scan` fail-fast (gitleaks-action officielle) | ✅ oui |
| `gitleaks/PHASE-ZETA-REPORT.md` | Doc | Ce rapport | ✅ oui |

> Aucun fichier existant du projet n'a été modifié. Aucun secret en clair n'est présent dans les fichiers committables.

---

## 2. Commandes exactes exécutées

```bash
# Installation (Windows)
winget install gitleaks.gitleaks --accept-source-agreements --accept-package-agreements
gitleaks version          # -> 8.30.1

# Dossier de travail
mkdir -p gitleaks

# Scan #1 — historique complet, ruleset par défaut (sans config custom)
gitleaks git . --report-format json --report-path gitleaks/scan-history.json -v --no-banner
#   -> exit 1, "leaks found: 27"

# Scan #2 — avec config custom + .gitleaksignore (vérification du filtrage)
gitleaks git . -c gitleaks/.gitleaks.toml \
  --report-format json --report-path gitleaks/scan-history.json --no-banner
#   -> exit 1, "leaks found: 11"  (27 - 9 allowlistés - 7 ignorés)
```

> ⚠️ **Note CLI** : la consigne initiale mentionnait `gitleaks detect --source .`. Or la commande
> `detect` a été **retirée** dans gitleaks ≥ 8.19. La syntaxe actuelle est :
> - `gitleaks git <path>` → scanne l'**historique** d'un dépôt git (équivalent de l'ancien `detect`)
> - `gitleaks dir <path>` → scanne des **fichiers** sur disque (working tree, sans historique)
> J'ai donc utilisé `gitleaks git .`, qui est l'équivalent exact attendu.

---

## 3. Résultats du scan & classification

**27 findings**, tous remontés par la règle `generic-api-key` (détection par entropie + mots-clés
`password`/`secret`/`key`). Aucune règle « provider » (AWS, GCP…) n'a matché : il n'y a pas de clé cloud
en dur, uniquement des credentials applicatifs.

### 3.1 — 🟢 Faux positifs : 9 (blobs SealedSecrets)

| Fichier | Commit | Pourquoi c'est un faux positif |
|---------|--------|--------------------------------|
| `k8s/base/{mongodb,rabbitmq,user,plan,affaire}/sealed-secret.yaml` | `8685c396` | `encryptedData` = chiffré RSA/AES base64 |
| `k8s/base/controle-service/sealed-secret.yaml` (×2) | `8685c396` | 2 clés chiffrées (Mongo + RabbitMQ) |
| `k8s/base/notification-service/sealed-secret.yaml` (×2) | `8685c396` | 2 clés chiffrées |
| `k8s/base/shared/sealed-jwt-secret.yaml` | `8685c396` | clé JWT chiffrée |

**Justification technique** : un `SealedSecret` contient un bloc `encryptedData` dont chaque valeur est
un blob produit par un **chiffrement asymétrique hybride** (clé AES de session chiffrée par la clé
**publique** RSA du cluster, voir Bitnami Sealed Secrets). Ce blob a une **forte entropie** → il déclenche
mécaniquement `generic-api-key`. Mais il **n'est pas exploitable** : sans la **clé privée RSA** (qui ne
vit que dans le controller du namespace `kube-system` et ne quitte jamais le cluster), il est
indéchiffrable. C'est précisément l'objectif de Sealed Secrets : du secret chiffré, **safe à committer**.
→ **Allowlistés par chemin** dans `gitleaks/.gitleaks.toml`.

### 3.2 — 🟡 Secrets rotés / morts : 7 (placeholder JWT)

Valeur : `btp-secret-key-for-jwt-signing-must-be-at-least-256-bits-long-for-hs256` — une clé JWT
**placeholder** (valeur d'exemple, jamais un secret de prod). Présente dans `.env.example` (template) et
6 anciens `secret.yaml` (commit `0ef01905`), tous supprimés/remplacés depuis. Remplacée par la vraie clé
au commit `3c044077`.
→ **Findings morts → ignorés** dans `.gitleaksignore` (par fingerprint).

### 3.3 — 🔴 Secrets ACTIFS : 11 (à rotater, NON ignorés)

| Type | Occurrences | Où | Statut |
|------|-------------|-----|--------|
| MongoDB root password | 6 | historique, commit `3c044077` (secret.yaml supprimés) | actif en cluster (γ/ε) |
| RabbitMQ password | 3 | historique, commit `3c044077` | actif en cluster (γ/ε) |
| JWT signing key | 1 | historique, commit `3c044077` (`shared/jwt-secret.yaml`) | actif en cluster (γ/ε) |
| **Grafana adminPassword** | 1 | **HEAD**, `k8s/monitoring/values.yaml:115` | **EN CLAIR dans le code actuel** |

**Vérifications faites** (`git grep` sur HEAD) :
- Mongo/RabbitMQ/JWT : **absents des fichiers trackés à HEAD** (bien remplacés par les SealedSecrets) — ils ne subsistent que dans l'**historique** (commit `3c044077`).
- Grafana : `git show HEAD:k8s/monitoring/values.yaml` → `adminPassword: <valeur>` en clair **ligne 115**. Ce secret **n'a jamais été migré** vers Sealed Secrets (la migration α→ε ne couvrait que `k8s/base/*/secret.yaml`).

→ **Volontairement NON ignorés** : allowlister un secret encore vivant reviendrait à masquer une fuite réelle. La bonne réponse est la **rotation** (voir §7), pas l'`.gitleaksignore`.

---

## 4. ⚠️ Correction d'un postulat (point d'honnêteté technique)

Le contexte de départ supposait que Mongo/RabbitMQ/JWT/Grafana avaient été « rotés en phases précédentes
et ne subsistaient que dans l'historique ». L'analyse montre une réalité plus nuancée :

- Le commit `3c044077` s'appelle « rotate credentials » : c'est lui qui a **introduit** les valeurs
  Mongo/RabbitMQ/JWT **actuelles**. Autrement dit, la « rotation » a mis les **credentials courants**
  dans l'historique — ils ne sont pas morts, ils sont **vivants**.
- Preuve : en Phases γ/ε (2026-06-06), les Pods consommaient exactement ces valeurs (env vars vérifiées,
  MongoDB `CONNECTED ok=true`). Les SealedSecrets actuels chiffrent ces mêmes valeurs.
- Le **placeholder** JWT (§3.2), lui, est bien mort (remplacé à `3c044077`).
- Grafana est le cas le plus grave : **toujours en clair à HEAD**.

**Conclusion** : seuls les 7 placeholders sont des « secrets rotés confirmés » légitimement ignorables.
Les 11 autres exigent une rotation effective avant tout `.gitleaksignore` ou purge d'historique.

---

## 5. Pourquoi gitleaks (vs trufflehog / detect-secrets)

| Critère | **gitleaks** | trufflehog | detect-secrets (Yelp) |
|---------|-------------|------------|------------------------|
| Langage / déploiement | Go, **binaire unique** statique, zéro dépendance | Go (binaire) | Python (pip + runtime) |
| Scan d'**historique git** | ✅ natif (`git log -p`) | ✅ natif | ⚠️ surtout working tree / baseline |
| **Vérification de validité** (secret « live ») | ❌ non (détection statique) | ✅ oui (peut tester les clés vivantes) | ❌ non |
| Config & allowlist | TOML clair, `.gitleaksignore` par fingerprint | YAML/flags | baseline JSON (`.secrets.baseline`) |
| Intégration CI | **Action GitHub officielle** + pre-commit | Action + pre-commit | pre-commit hook |
| Bruit / faux positifs | modéré, allowlist fine | + de bruit (verified réduit) | nécessite audit de baseline |

**Choix : gitleaks**, parce que :
1. **Binaire unique Go** : aucune dépendance Python à gérer côté CI ou dev Windows → reproductible.
2. **Scan d'historique de première classe** : exactement le besoin (auditer 51 commits).
3. **Allowlist par fingerprint + config TOML** : on cible précisément un finding (commit+fichier+ligne)
   sans désactiver une règle globalement — essentiel pour distinguer faux positif / roté / actif.
4. **Action GitHub officielle** maintenue → intégration CI directe.

**Tradeoff assumé** : gitleaks ne fait **pas** de *secret verification* (tester si une clé est encore
valide en ligne), contrairement à trufflehog. Pour ce projet c'est acceptable : nos secrets sont des
credentials internes (Mongo/RabbitMQ/JWT/Grafana), pas des clés d'API SaaS testables. La validité a été
établie autrement (corrélation avec l'état cluster en Phases γ/ε). Une piste d'amélioration serait
d'ajouter trufflehog en complément pour les futures clés cloud.

---

## 6. Pourquoi le job CI est en amont du build (fail-fast)

Le workflow `secret-scan` tourne sur **chaque push et chaque PR**, et c'est un **job autonome** qui doit
être vert **avant** tout build / packaging / déploiement.

**Ce que ça apporte :**
- **Arrêt au plus tôt** : si un secret est introduit dans une PR, le pipeline échoue **avant** de
  construire une image Docker ou de pousser un artefact. On évite qu'un secret soit **figé dans une image**
  (où il resterait même après suppression du code) ou propagé à un registre/déploiement.
- **Coût minimal** : le scan dure ~10 s ; le placer en amont évite de gaspiller des minutes de build sur
  une PR qui sera de toute façon rejetée.
- **Boucle de feedback courte** pour le développeur : commentaire de PR (`GITLEAKS_ENABLE_COMMENTS`) +
  job summary, directement sur la PR.
- **Garde-fou systématique** : la détection ne dépend plus de la rigueur humaine (un dev qui oublie le
  hook pre-commit local est quand même rattrapé en CI).

Détails d'implémentation (`.github/workflows/secret-scan.yml`) :
- `actions/checkout@v4` avec **`fetch-depth: 0`** → historique complet, sinon gitleaks ne verrait que le
  dernier commit d'une PR.
- `GITLEAKS_CONFIG: gitleaks/.gitleaks.toml` → applique notre allowlist (sinon les sealed-secrets
  feraient échouer la CI en faux positifs).
- `concurrency … cancel-in-progress` → annule les runs obsolètes (économie).
- L'action renvoie un **exit code ≠ 0** dès qu'un secret est trouvé → job rouge = pipeline bloqué.

---

## 7. Ce qui reste à faire / limites connues

1. **Rotation des 4 credentials actifs** (priorité haute) :
   - MongoDB root, RabbitMQ, JWT signing key → générer de nouvelles valeurs, regénérer les SealedSecrets
     (`kubeseal`), `kubectl apply` + `kubectl rollout restart` des Deployments consommateurs.
   - **Grafana** (priorité **critique**, car en clair à HEAD) : migrer `k8s/monitoring/values.yaml`
     (`adminPassword`) vers un Secret / SealedSecret référencé par le chart, **supprimer la valeur en clair**,
     puis rotater le mot de passe.
2. **Secrets toujours présents dans l'historique** : `git rm` (Phase δ) ne supprime pas du passé. Tant que
   l'historique n'est pas purgé, les valeurs restent récupérables via `git log`. Options :
   - **Rotation** (rend les valeurs historiques inutiles) — recommandé, le plus simple.
   - **Purge d'historique** (`git filter-repo` ou BFG) — plus lourd, réécrit les SHA, impose un
     `push --force` et un re-clone pour tous. À faire **hors de cette phase** (consigne respectée).
3. **Après rotation** : décommenter les 11 fingerprints dans `.gitleaksignore` (si on conserve l'historique)
   pour repasser le scan d'historique au vert.
4. **Compléments DevSecOps** : pre-commit hook gitleaks local (détection avant même le push) ; éventuel
   ajout de trufflehog pour la *verification* des futures clés cloud ; intégration du scan au reste du
   pipeline (SAST, image scanning Trivy déjà présent).

---

## 8. Questions probables en entretien + réponses

**Q1. Pourquoi committer des secrets (même chiffrés) dans Git avec Sealed Secrets ? N'est-ce pas dangereux ?**
> Non : un SealedSecret ne contient que du chiffré asymétrique. Le chiffrement se fait avec la **clé
> publique** du cluster ; seul le controller, qui détient la **clé privée** (jamais sortie du cluster),
> peut déchiffrer. Le base64 dans `encryptedData` est inexploitable sans cette clé privée. C'est ce qui
> permet de versionner les secrets en GitOps sans fuite. D'où l'allowlist gitleaks : flagger ces blobs
> serait un faux positif par conception.

**Q2. gitleaks a trouvé 27 secrets : votre projet est-il « cassé » ?**
> Il faut classifier, pas paniquer. 9 sont des faux positifs (sealed), 7 sont un placeholder mort. Restent
> 11 occurrences correspondant à 4 credentials réels, dont la majorité ne vit plus que dans l'historique
> (déjà migrés vers Sealed Secrets à HEAD) et un cas Grafana encore en clair à HEAD. Le plan d'action est
> la rotation + éventuelle purge d'historique. La valeur de l'exercice, c'est justement cette
> **triage discipliné**.

**Q3. Pourquoi ne pas avoir tout mis dans `.gitleaksignore` pour avoir un scan vert ?**
> Parce qu'`.gitleaksignore` doit servir à **accepter des faux positifs ou des secrets morts**, pas à
> **cacher des secrets vivants**. Ignorer un credential actif donnerait une fausse assurance. Je n'y ai mis
> que le placeholder rotaté ; les 11 actifs restent visibles (rouge) tant qu'ils ne sont pas rotés. Un scan
> rouge **honnête** vaut mieux qu'un vert trompeur.

**Q4. Différence entre `gitleaks git` et `gitleaks dir` ? Et l'ancien `detect` ?**
> `gitleaks git` scanne l'**historique** (tous les commits) ; `gitleaks dir` scanne les **fichiers** sur
> disque (working tree, sans historique). `detect` était l'ancienne commande unifiée, retirée en 8.19+ ;
> `git` en est l'équivalent. En CI, scanner l'historique d'une PR impose `fetch-depth: 0` au checkout.

**Q5. Pourquoi le scan en amont du build plutôt qu'en parallèle ?**
> Fail-fast : empêcher qu'un secret soit figé dans une image Docker ou un artefact (où il survivrait à la
> suppression du code), et ne pas gaspiller du temps de build sur une PR qui sera rejetée. Le scan coûte
> ~10 s, le placer en première barrière est quasi gratuit et maximise la protection.

**Q6. gitleaks détecte-t-il si un secret est encore valide ?**
> Non, c'est de la détection **statique** (entropie + motifs). Pour tester la validité en ligne, il
> faudrait trufflehog (mode *verified*). Ici les secrets sont internes (Mongo/RabbitMQ/JWT/Grafana), donc
> j'ai corrélé leur « activité » avec l'état réel du cluster observé aux phases précédentes.

**Q7. Comment empêcher qu'un futur secret soit commité, en plus de la CI ?**
> Hook **pre-commit** gitleaks côté développeur (détection locale avant le push), en complément du job CI
> (filet de sécurité côté serveur, non contournable). Défense en profondeur.

---

## 9. Verdict

🟢 **Phase ζ RÉUSSIE** sur le volet outillage : gitleaks installé, historique scanné (51 commits),
27 findings triés avec justification, faux positifs allowlistés, config + `.gitleaksignore` documentés,
job CI fail-fast en place.

🔴 **Action de sécurité en suspens (hors scope outillage)** : **4 credentials actifs** à rotater, dont le
**mot de passe Grafana en clair à HEAD**. La détection a fait son travail — la remédiation (rotation +
éventuelle purge d'historique) reste à exécuter.

> Conformité : aucune réécriture d'historique, aucun commit automatique. Voir la section commandes git
> ci-dessous (dans le message d'accompagnement) pour committer manuellement.
