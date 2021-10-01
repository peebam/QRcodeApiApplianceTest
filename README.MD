# How to

Installation des dépendances : 

`npm i`

**NOTE:** En cas d'erreur de build du module *snappy*, installer les outils de compilation pour windows (en mode admin) :

`npm --add-python-to-path='true' --debug install --global windows-build-tools`

Démarrage du serveur local

`npm start`

Démarrage du serveur local pour debuggage

`npm run debug`

Test du serveur 

`curl -X POST http://localhost:3000/dev/hello -H "Content-Type:application/json" --data-raw '{ "name" : "john" }'`

# Déroulé du développement du POC

## Mise en place de l'environnement de développement
Mise en place de l'environnement de débuggage / test
- serverless-offline
- débuggage avec Chrome
- mocha / supertest

## Configuration AWS	
- Ajout d'un utilisateur (pour programmation) aws avec IAM

## Configuration Serverless
- Installation de serverless
- Configuration des credentials pour serverless
- Création du projet à partir du template *aws-nodejs-typescript*
- Ajout du plugin serverless-offline pour executions locales
- Configuration du mode de lancement debug pour débuggage avec Chrome

# Notes

## Configurer les 'credentials' aws <> serverless
`serverless config credentials --provider aws --key ***** --secret *****`

## Créer un projet à partir d'un template serverless
`serverless create --template aws-nodejs-typescript --path my-service`