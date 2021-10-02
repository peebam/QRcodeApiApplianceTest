# How to

Configurer les 'credentials' aws : Néessaire au déploiement et permet aussi d'accéder à S3 depuis une exécution locale :

`serverless config credentials --provider aws --key ***** --secret *****`

Installation des dépendances : 

`npm i`

**NOTE:** En cas d'erreur de build du module *snappy*, installer les outils de compilation pour windows (en mode admin) :

`npm --add-python-to-path='true' --debug install --global windows-build-tools`

Démarrage du serveur local

`npm start`

Démarrage du serveur local pour debuggage

`npm run debug`

Déploimenet sur AWS

`serverless deploy` pour déployer la fonction

`serverless remove` pour supprimer la fonction

# Librairies tierces

- [middy](https://www.npmjs.com/package/middy) : middleware engine pour l'implémentation de lambda AWS
- [aws-sdk](https://www.npmjs.com/package/aws-sdk) : framework AWS
- [clean-deep](https://www.npmjs.com/package/clean-deep) : outils suppresion des propriétés null d'un objet / array
- [jimp](https://www.npmjs.com/package/jimp) : outils de manipulation d'image
- [nanoid](https://www.npmjs.com/package/nanoid) : générateur de chaine de caractères aléatoire 
- [qrcode](https://www.npmjs.com/package/qrcode) : générateur de qrcode


