# CI-starter kit

## Installation

Installer les dépendences du sous-project `backend` et du sous-projet
`frontend`:

    $ cd backend
    $ npm install
    
    $ cd ..
    $ cd frontend
    $ npm install

Les installations de packages peuvent prendre plusieurs minutes.

## Exécution

Dans une première fenêtre de terminal, executer le projet `backend`:

    $ cd backend
    $ npm run start

Dans une *seconde* fenêtre de terminal, exécuter le projet `frontend`:

    $ cd frontend
    $ npm run start

Avec un fureteur, se rendre à l'adresse [http://localhost:3000](http://localhost:3000)

## API

Le backend représente l'API d'un serveur d'intégration continue. Il est possible
d'obtenir la liste des projets, d'obtenir l'état d'un projet en particulier, de
déclencher un build et d'ajouter et de retirer un projet.

### Obtenir la liste des projets

    GET /api/projects

    200 OK
    [
      {
        id: string,
        projectName: string,
        tech: string,
        buildHistory: [
          {
            buildTime: string format ISO-8601,
            status: string enum [success|warning|error],
            commit: string,
          }
        ]
      }
    ]

### Obtenir un projet

    GET /api/projects/:id

    200 OK
    << project >>

### Mettre à jour un projet

    PUT /api/projects/:id
    { projectName: string, tech: string }

    200 OK
    << project >>

### Retirer un projet en particulier

    DELETE /api/projects/:id

    204 No Content

### Déclencher un build d'un projet en particulier

    POST /api/projects/:id/builds

    201 Created
    << project >>

### Ajouter un project

    POST /api/projects
    { projectName: string, tech: string }

    201 Created
    << project >>

