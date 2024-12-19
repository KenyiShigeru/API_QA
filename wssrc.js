//Este script se encarga de instalar el servicio en windows
//Para usarlo debo instalar node-windows con npm de manera global

var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'API_QA',
  description: 'API de backend para el software de Quality Art.',
  script: require('path').join(__dirname,'index.js'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
  //, workingDirectory: '...'
  //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();