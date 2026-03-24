# CLAUDE.md — Gestion BTP (Demathieu Bard)

## Architecture du projet

Ce projet est une application de **gestion BTP** (Bâtiment et Travaux Publics) pour le suivi des affaires, plans techniques et contrôles qualité dans le domaine du génie civil.

### Stack technique
- **Backend** : Java Spring Boot (microservices)
- **Frontend** : Angular + TypeScript + SCSS
- **Service Discovery** : Eureka Server
- **API Gateway** : Spring Cloud Gateway
- **Conteneurisation** : Docker Compose

### Microservices existants
```
├── affaire-service/        # Gestion des affaires (chantiers)
├── plan-service/           # Gestion des plans techniques
├── controle-service/       # Gestion des contrôles qualité (EXISTE DÉJÀ)
├── notification-service/   # Notifications (EXISTE MAIS NE FONCTIONNE PAS)
├── user-service/           # Authentification et gestion utilisateurs
├── api-gateway/            # Point d'entrée unique (routing)
├── eureka-server/          # Service Discovery
├── frontend-angular/       # Interface utilisateur Angular
└── docker-compose.yml      # Orchestration
```

---

## Contexte métier BTP — Comprendre le domaine

### Qu'est-ce qu'une Affaire ?
Une **affaire** = un chantier/projet de construction (ex : "Construction Pont A7", "Réhabilitation Tunnel Nord"). Chaque affaire contient plusieurs **plans** (les documents techniques nécessaires à la réalisation du chantier).

### Qu'est-ce qu'un Plan ?
Un **plan** = un livrable technique (dessin, note de calcul, plan d'exécution). En BTP, chaque plan passe par un cycle de vie avec des contrôles et des visas avant d'être approuvé pour exécution sur chantier.

#### Types de plans (livrables)
| Code | Signification | Description |
|------|--------------|-------------|
| COF | Coffrage | Plans de coffrage (moules pour couler le béton) |
| FER | Ferraillage | Plans d'armatures en acier dans le béton |
| NCAL | Note de calcul | Calculs de dimensionnement structurel |
| EXE | Exécution | Plans d'exécution finale pour le chantier |
| SYN | Synthèse | Plans de synthèse (coordination entre lots) |

#### Types de prestation
- **PDB** (Prestation De Base) : Livrables contractuels obligatoires inclus dans le marché initial.
- **PS** (Prestation Supplémentaire) : Livrables additionnels demandés en cours de projet (avenants, modifications).

#### Cycle de vie d'un plan (workflow des états)
```
Non commencé → En cours → Visé BPE
```
- **Non commencé** : Le plan est prévu mais pas encore démarré.
- **En cours** : Le plan est en production ou en cours de contrôle/révision.
- **Visé BPE** (Bon Pour Exécution) : Le plan a reçu un visa **VSO** et est approuvé pour utilisation sur chantier. C'est l'état final = feu vert.

### Qu'est-ce qu'un Contrôle ?
Un **contrôle** = une vérification/validation effectuée sur un plan. En BTP, avant qu'un plan puisse être utilisé sur chantier, il doit passer par plusieurs niveaux de contrôle :

#### Types de contrôle (dans l'ordre du processus)
1. **Contrôle interne** : Vérification par le bureau d'études lui-même (auto-contrôle).
2. **Contrôle externe** : Vérification par un organisme externe indépendant.
3. **Contrôle technique** : Vérification par le bureau de contrôle technique (obligatoire en France).
4. **Visa MOE** (Maîtrise d'Œuvre) : Validation finale par le maître d'œuvre (architecte/ingénieur qui supervise).

#### Types de visa (avis du contrôleur)
| Code | Signification | Impact |
|------|--------------|--------|
| **VSO** | Visa Sans Observation | ✅ Approuvé — Le plan est bon, aucune modification requise. Déclenche le passage à "Visé BPE". |
| **VAC** | Visa Avec Commentaire | ⚠️ Approuvé sous réserve — Des commentaires mineurs à prendre en compte, mais le plan peut avancer. |
| **VAO** | Visa Avec Observation | ❌ Non approuvé — Des observations majeures nécessitent une reprise du plan. Nouveau cycle de contrôle requis. |

#### Logique métier critique
Quand un contrôle de type **Visa** reçoit l'avis **VSO** → le plan associé passe automatiquement à l'état **Visé BPE**.

### Indices (versioning des plans)
En BTP, les plans évoluent par **indices** (versions) :
- **Indice interne** : Version interne au bureau d'études (A, B, C... ou 1, 2, 3...). Chaque révision interne incrémente cet indice.
- **Indice externe** : Version officielle diffusée aux parties prenantes. N'est incrémenté que lors d'une diffusion officielle.

Exemple : Un plan peut être à l'indice interne "D" mais seulement à l'indice externe "B" (car il n'a été diffusé officiellement que 2 fois).

### Avancement — Comment ça se calcule

#### Pourcentages d'avancement par état
Chaque état du cycle de vie d'un plan correspond à un **pourcentage d'avancement**. Ce tableau est configurable par affaire :

| État du plan | % d'avancement (défaut) |
|---|---|
| Démarré | 25% |
| 1er indice Diffusé | 30% |
| Contrôle externe | 10% |
| VAO (Visa Avec Observation) | 15% |
| Visé BPE (VSO) | 20% |
| **Total** | **100%** |

Explication : Quand un plan atteint l'état "Démarré", il contribue à 25% de l'avancement. Quand il reçoit son 1er indice diffusé, il ajoute 30%, etc. Un plan complètement terminé (Visé BPE) = 100%.

#### Coefficients de pondération par type de livrable
Tous les types de plans n'ont pas le même poids dans l'avancement global. Un plan de ferraillage (FER) est plus critique qu'un plan de coffrage (COF). Les coefficients sont configurables par affaire :

| Type | Coef (défaut) |
|------|------|
| COF | 1 |
| FER | 3 |
| NCAL | 5 |
| EXE | 1 |
| SYN | 1 |

#### Calcul de l'avancement unitaire
```
Avancement unitaire d'un type = Σ (% avancement de chaque plan de ce type) / nombre de plans de ce type
```

#### Calcul de l'avancement pondéré
```
Avancement pondéré = Σ (avancement unitaire du type × coefficient du type) / Σ (coefficients)
```

---

## Tâches à réaliser

### PRIORITÉ 1 — Diagnostic et réparation du module Notification

**Le service `notification-service` existe mais ne fonctionne pas.**

Actions :
1. Lire le code source de `notification-service/` entièrement.
2. Vérifier la configuration (application.yml/properties, port, enregistrement Eureka).
3. Vérifier la connexion à la base de données.
4. Vérifier que le service est bien enregistré dans Eureka et routable via l'API Gateway.
5. Vérifier les endpoints REST et les tester.
6. Lire les logs pour identifier les erreurs.
7. Corriger tous les bugs trouvés.
8. S'assurer que les notifications sont bien déclenchées par les événements suivants :
   - Plan modifié
   - Nouveau contrôle ajouté sur un plan
   - Changement d'état d'un plan (Non commencé → En cours → Visé BPE)
   - Nouveau fichier ajouté à un plan
   - Visa reçu (VSO/VAC/VAO)
9. Côté frontend Angular : vérifier le composant notifications (icône cloche + badge compteur + panneau déroulant avec notifications récentes). Chaque notification doit contenir : message, date, lien vers le plan/contrôle concerné, statut lu/non lu.

### PRIORITÉ 2 — Compléter les attributs du modèle Affaire

Vérifier que l'entité `Affaire` contient tous ces champs (ajouter ceux qui manquent) :
- `numAffaire` — Numéro d'affaire (unique)
- `nomAffaire` — Nom de l'affaire
- `adresse` — Adresse du chantier
- `description` — Description
- `dateDebut` — Date de début
- `dateFinPrevue` — Date de fin prévue
- `avancement` — Pourcentage d'avancement global (calculé)
- `pourcentagesParEtat` — Tableau configurable état → pourcentage (voir section Avancement)
- `coefficientsParType` — Tableau configurable type livrable → coefficient de pondération

Créer les endpoints et l'interface Angular pour configurer ces tableaux par affaire.

### PRIORITÉ 3 — Compléter les attributs du modèle Plan

Vérifier que l'entité `Plan` contient tous ces champs (ajouter ceux qui manquent) :
- `numeroPlan` (obligatoire, unique)
- `nomPlan` (obligatoire)
- `typePlan` (obligatoire) : COF, FER, NCAL, EXE, SYN
- `indiceExterne`
- `indiceInterne`
- `statut`
- `nombrePlanches`
- `auteur`
- `dateEngagement`
- `fichiers` — Liste de fichiers (PDF, Word, Excel, DWG) — 0 ou plusieurs
- `typePrestation` — Enum : PDB ou PS
- `etat` — Enum workflow : NON_COMMENCE → EN_COURS → VISE_BPE
- `controles` — Relation vers les contrôles associés

### PRIORITÉ 4 — Compléter le module Contrôle existant

**Le `controle-service` existe déjà.** Vérifier et compléter si nécessaire :

Attributs requis pour l'entité Contrôle :
- `reference` — Référence unique
- `typeControle` — Enum : CONTROLE_INTERNE, CONTROLE_EXTERNE, CONTROLE_TECHNIQUE, VISA
- `planImpacte` — Référence au plan concerné
- `indiceExterneImpacte` — L'indice externe du plan au moment du contrôle
- `commentaire` — Texte libre
- `avis` — Enum : VSO, VAC, VAO
- `controlePar` — Utilisateur ayant effectué le contrôle
- `dateTraitement` — Date du contrôle
- `fichierPDF` — Fichier PDF du rapport de contrôle

Logique métier à vérifier/implémenter :
- Quand un contrôle avec `typeControle = VISA` et `avis = VSO` est créé ou modifié → mettre à jour automatiquement l'état du plan associé vers `VISE_BPE`.
- Vérifier le CRUD complet (créer, lister par plan, modifier, supprimer).

### PRIORITÉ 5 — Archivage / Historique des versions des plans

Implémenter un système de versioning pour les plans :
- Avant chaque modification d'un plan, sauvegarder un **snapshot complet** de l'état actuel :
  - Tous les attributs du plan
  - Les indices (interne et externe) au moment de la modification
  - Les fichiers associés à cette version
  - La date de modification et l'utilisateur qui a modifié
- Créer une entité `PlanArchive` ou `PlanHistory` dans le `plan-service`.
- Endpoint pour consulter l'historique des versions d'un plan.
- Composant Angular pour afficher la timeline des versions.

### PRIORITÉ 6 — Modifier et Supprimer un plan

- **Modifier** : Formulaire Angular pré-rempli avec les valeurs actuelles. Avant la sauvegarde, déclencher l'archivage (Priorité 5).
- **Supprimer** : Confirmation modale avant suppression. Préférer une suppression logique (champ `archived = true`) plutôt que physique pour garder la traçabilité.

### PRIORITÉ 7 — Tableau de bord (Dashboard) — 8 graphiques

Ajouter à la page Dashboard **8 graphiques** de suivi d'avancement filtrés par affaire sélectionnée.

**Pour les Prestations de Base (PDB) :**
1. Avancement unitaire par type de livrable (bar chart — COF, FER, NCAL, EXE, SYN)
2. Avancement pondéré par type de livrable (bar chart avec coefficients)
3. Avancement global unitaire par état de livrable (pie/bar chart — Démarré, Diffusé, etc.)
4. Avancement global pondéré par état de livrable (pie/bar chart)

**Pour les Prestations Supplémentaires (PS) :**
5. Avancement unitaire par type de livrable
6. Avancement pondéré par type de livrable
7. Avancement global unitaire par état de livrable
8. Avancement global pondéré par état de livrable

Utiliser une librairie de graphiques compatible Angular (ng2-charts / Chart.js ou équivalent déjà présent dans le projet).

### PRIORITÉ 8 — Authentification 2FA (optionnel)

Si le temps le permet :
- Ajouter une option 2FA (TOTP / Google Authenticator) dans le `user-service`.
- L'utilisateur active/désactive le 2FA depuis ses paramètres.
- Au login, si 2FA activé → saisie du code après le mot de passe.

---

## Conventions à respecter

- **Lire les fichiers existants** avant toute modification pour comprendre les conventions en place.
- Respecter la structure microservices existante (chaque domaine dans son service).
- Respecter les conventions de nommage Java (camelCase) et Angular (kebab-case pour les fichiers).
- Pour la communication inter-services : utiliser le mécanisme déjà en place (REST via Feign/WebClient ou messaging).
- Chaque modification doit être testable indépendamment.
- Commits logiques : un commit par feature/fix (ex : `fix: réparation notification-service`, `feat: archivage plans`).
- En cas de doute sur un point métier BTP, demander avant de coder.
