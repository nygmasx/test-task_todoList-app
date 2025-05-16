# Test technique Maltese — Application ToDo List

Bienvenue ! Ce dépôt contient une application ToDo List divisée en deux parties : un frontend (Angular) et un backend (Node.js/Sails.js).

Votre objectif consiste à terminer plusieurs fonctionnalités (détails ci-dessous) afin d'améliorer l’application.

---

## Lancer le projet

### Prérequis

- Node.js (version recommandée : ≥18)
- npm

### Installation & Démarrage

#### 1. Backend

Modifier l'URL de la base de donnée mongodb (todo-app-backend/config/datastores.js)
- USERNAME: sent to you by email
- PASSWORD: sent to you by email
- DBNAME: test-task-[votre nom]

Pour un accès en direct à la base de données via ligne de commande (avec mongosh) :
```
mongosh "mongodb+srv://cluster0.hop5zdk.mongodb.net/DBNAME" --apiVersion 1 --username USERNAME
```

Ensuite entrer les commande suivante:
```
cd todo-app-backend
npm install
node app
```

Le serveur back-end sera disponible sur [http://localhost:1337](http://localhost:1337).

#### 2. Frontend

Entrer les commande suivante:
```
cd todo-app-frontend
npm install
ng serve
```

Le serveur web Angular s'exécutera sur [http://localhost:4200](http://localhost:4200) par défaut.

---

## Tâches à réaliser

### 1. Finir l’implémentation de la fonctionnalité de tâche complétée

Permettre à l’utilisateur de marquer une tâche comme complétée ou non.  
L’état doit être enregistré côté backend.

---

### 2. Afficher la deadline d’une tâche

Afficher la date limite (deadline) de chaque tâche dans la liste.  
Le format de la date est libre (ex : `JJ/MM/AAAA`, `YYYY-MM-DD`, etc).

---

### 3. Mise en forme de la tâche selon son statut et sa deadline

Appliquer un style visuel différent selon l’état de chaque tâche :
- **Vert** : tâche complétée
- **Orange** : tâche non complétée avec une deadline aujourd’hui
- **Rouge** : tâche non complétée avec une deadline dépassée

---

### 4. Ajouter la fonctionnalité de tâche favorite

Permettre à l’utilisateur d’ajouter/enlever une tâche de ses favoris.  
Les tâches favorites doivent apparaître en haut de la liste (triées avant les autres), mais aussi rester visibles parmi toutes les tâches.

---

### 5. Ajouter une barre de recherche

Ajouter un champ de recherche au-dessus de la liste principale des tâches pour filtrer celles-ci selon le titre.

---

**Bonus (facultatif) :**  
Passer le composant principal de la liste de tâches (task-list.component.ts) en `ChangeDetectionStrategy.OnPush` pour une meilleure performance avec Angular.

---
### 6. Démarche globale de sécurisation de l'application

Question ouverte : pour cette application lister les points des plus important dans une démarche de securisation avant l'exposition de l'application sur internet.

**Bonus (facultatif) :**  
Proposer une implémentation d'un des mécanismes de sécurité proposé à la question précédente.

---

**Bonus (facultatif) :**  
Pour la démo, utiliser un déploiement sur une plateforme Cloud
Recommendation : utiliser un compte de test gratuit sur des plateformes IAAS (e.g. Google Cloud / AWS / OVH) ou des outils du type Vercel / Heroku / Scalingo.

---

## Consignes générales

- Toutes les implémentations demandées doivent être commit sur un nouveau fork de ce repo. (https://docs.github.com/fr/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).
**Ce fork doit être créé avec un visibilité privée**. Une fois le travail terminé, vous devez inviter sur ce repo privé 2 utilisateurs github:
  - AntoineB05
  - vincent-maltese-tech
- Toutes les implémentations demandées doivent être commit et push sur la branche main de votre fork
- L’UX/UI n’est pas évaluée, restez simple et fonctionnel.
- La modification du code existant est autorisé.
- L'installation de librairies externes est autorisée si cela vous semble pertinent, mais le projet a été conçu pour être réalisable sans dépendances supplémentaires.

## Liens utiles

Voici quelques liens pour de la documentation utile :
- Angular v19 doc: https://angular.dev/overview
- Sails.js doc: https://sailsjs.com/documentation/reference
- MongoDB doc: https://www.mongodb.com/docs/mongodb-shell/install/


Bon test ! 👨‍💻👩‍💻
