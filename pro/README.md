# pass-culture-pro

C'est la version (browser) de l'application PRO frontend du pass Culture. Ce repo contient également [un storybook](https://pass-culture.github.io/pass-culture-main/?path=/story/ui-kit-checkboxfield--default) des éléments graphiques

Il faut aller voir le README dans https://github.com/betagouv/pass-culture-main pour être informé des différentes lignes de commande associées à ce repo.

## Note sur Yarn

Yarn est prometteur, on vous conseille de l'utiliser. Tâchez de l'installer globalement sur votre ordinateur (https://yarnpkg.com/en/docs/install), puis:

```bash
  yarn
```

## Installation et Lancement de l'application Pro

- ```shell
  yarn install
  yarn start
  ```

## Lancement des tests

- ### Lancement des tests unitaires

  ```shell
  yarn test:unit
  ```

- ### Lancement des tests end to end

  - Prérequis aux lancement des tests e2e testcafe (⚠️**Depuis le repository api**)

    - Lancement de la base de donnée pc-postgres (pour l'api) via docker-compose
      ```shell
      docker-compose -f ../docker-compose-app.yml up -d postgres
      ```
    - Injection des données de test
      ```shell
      export DATABASE_URL=postgresql://pass_culture:passq@localhost:5434/pass_culture && python src/pcapi/install_database_extensions.py && alembic upgrade head && rm -rf ./src/pcapi/static/object_store_data
      python src/pcapi/scripts/pc.py sandbox -n testcafe
      ```

  - Lancement des tests depuis la ligne de commande (⚠️**Depuis le repository pro**)
    ```shell
    yarn test:cafe
    ```

## Adage

Nous intégrons une sous-route du portail Pro (`/adage-iframe/`) dans une iframe au sein d'Adage, la plateforme des établissements scolaires permettant de gérer leurs activités culturelles.

### Accès à l'iframe Adage

Application web pour les rédacteurs de projets scolaires, leur permettant de réserver des offres sur le pass Culture pour leurs élèves.

1. Ouvrir la console bash

```bash
$ pc bash
```

2. Générer un token via la commande

```bash
flask generate_fake_adage_token
```

3. Copier l'url générée dans le navigateur pour accéder à l'app

### Affichage d'offres en local

Comme le local est branché sur algolia de testing, les ids qui sont remontés d'algolia sont ceux de testing, et il n'est pas certain qu'on ait les mêmes en local.

Pour récupérer les ids de certaines offres en local, on peut utiliser un index local. Pour cela, il faut :

- Créer un nouvel index sur la sandbox algolia : `<votre_nom>-collective-offers`

- Créer un fichier `.env.development.local` dans le dossier `pro` et renseigner le nom de l'index dans la variable `REACT_APP_ALGOLIA_COLLECTIVE_OFFERS_INDEX`

- Créer un fichier `.env.local.secret`

```
ALGOLIA_COLLECTIVE_OFFERS_INDEX_NAME=<votre_nom>-collective-offers
ALGOLIA_TRIGGER_INDEXATION=1
ALGOLIA_API_KEY=<demander l'api key>
ALGOLIA_APPLICATION_ID=testingHXXTDUE7H0
SEARCH_BACKEND=pcapi.core.search.backends.algolia.AlgoliaBackend
```

- Ouvrir la console bash

```
$ pc bash
```

- Réindexer vos offres collectives

```
flask reindex_all_collective_offers
```

## Standards de code et d'architecture

La documentation est intégrée au projet, aux travers de fichiers README à la racine des dossiers principaux.

Vous trouverez une documentation générale ainsi que des liens vers les différents README en suivant ce lien :

[Standards de code et d'architecture](./src/README.md)

## Dette technique

Nous utilisons SonarCloud pour monitorer la dette technique.

[Lien vers le projet Portail Pro sur SonarCloud](https://sonarcloud.io/project/overview?id=pass-culture_pass-culture-main)
