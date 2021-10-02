# But

Implémentation d'une lambda AWS permettant de générer un ou un ensemble de qrcode. Un identifiant sur 7 caractères aléatoires est généré pour chaque qrcode. Le contenu du qrcode est son identifant éventuellement préfixé par une chaine, si elle est fournie.

Cette fonction acceptent les paramètres suivant :

- `quantity : number [required]` : nombre de qrcodes à générer,
- `prefix : string [optional]` : prefix de l'identifiant constituant le contenu du qrcode,
- `addLabel : boolean (= false) [optional]` : si `true`, l'identifiant est affichée sous le qrcode (centré en bas)

# How to

## Configurer les 'credentials' aws : 

Néessaire au déploiement et permet aussi d'accéder à S3 depuis une exécution locale :

`serverless config credentials --provider aws --key ***** --secret *****`

## Installation des dépendances : 

`npm i`

**NOTE:** En cas d'erreur de build du module *snappy*, installer les outils de compilation pour windows (en mode admin) :

`npm --add-python-to-path='true' --debug install --global windows-build-tools`

## Démarrage du serveur local

`npm start`

## Démarrage du serveur local pour debuggage

`npm run debug`

## Déploimenet sur AWS

`serverless deploy` pour déployer la fonction

`serverless remove` pour supprimer la fonction

## Test 

Test avec curl: 

`curl -X POST url -H 'Content-Type: application/json' --data-raw '{ "quantity": 2, "addLabel": true, "prefix": "prefix/"}'`

Retour : 

`Code 201 / {"QUUH28E":"https://URL/qrcodes/QUUH28E","DKE535A":"https://URL/qrcodes/DKE535A"}`

# Thid party libraries

- [middy](https://www.npmjs.com/package/middy) : middleware engine pour l'implémentation de lambda AWS
- [aws-sdk](https://www.npmjs.com/package/aws-sdk) : framework AWS
- [clean-deep](https://www.npmjs.com/package/clean-deep) : outils suppresion des propriétés null d'un objet / array
- [jimp](https://www.npmjs.com/package/jimp) : outils de manipulation d'image
- [nanoid](https://www.npmjs.com/package/nanoid) : générateur de chaine de caractères aléatoire 
- [qrcode](https://www.npmjs.com/package/qrcode) : générateur de qrcode

# Going Further

- Pouvoir déployer plusieurs types d'environnement (dev, prod, etc.) avec Serverless
- Ajouter des tests unitaires, des tests d'intégration
- Pouvoir passer les propriétés du bucket S3 via des paramètres / variables d'environnement
- Action github de prévalidation d'une PR, avec jeu des tests unitaires / intégrations / API
- Action github de déploiement
- etc.