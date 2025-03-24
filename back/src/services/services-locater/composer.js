const {getInstance} = require('./dependencyLocator')
const CloudFlare = require('../cloudflare');

const serviceLocator = getInstance();

const nameServices = {
    cloudflare: 'CloudFlare-service'
}


function init(){
    serviceLocator.bindLazySingleton('cloudflare', () => CloudFlare.getInstance());
}
init();

function getCloudFlare(){
    return serviceLocator.get('cloudflare');
}

module.exports = { getCloudFlare };

// internancionalizacion es un conjunto de diccionarios (NExt.js)
// digitalocean comprear servcio
// linode
// crear instancia de ubunti
// instalar ngnix en el servidor
// instalar pm2 node (PM2 - Home)
// ttener insalado, node
// ngnix install ubutnu,  version 22.4
// intall node NVM
// opcion 3 INTALL NODE VERSION MANAGER
// intall PM2 witch: NPM:
// (comando)
// investigar que es CERBOT
// resend email for developers, crear un cuenta
//siento el cuerpo tenso cuando no te tengo si no mas te pienso y me pongo a temblar.