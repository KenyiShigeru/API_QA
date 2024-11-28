//Este script se encarga de instalar el servicio en windows
//Para usarlo debo instalar node-windows con npm de manera global

var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'API_QA'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('uninstall',function(){
  svc.start();
});

svc.uninstall();