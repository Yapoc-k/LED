var express = require("express");
var app = express();
const bodyParser = require('body-parser');
var Particle = require('particle-api-js');
var particle = new Particle();
var moongose = require('mongoose');
var Device = require('./API/schemas/DeviceSchema');
var token;

//------------------------------------------------------------------------- 

moongose.connect('mongodb://localhost/LED', { useNewUrlParser: true})
    .then(()=> {
        console.log("magic db is connected")
    })
    .catch ((err)=>{
        console.log(err)
    })

//------------------------------------------------------------------------- 
// Fichiers statiques

app.use('/css', express.static(__dirname + '/client/lib/css'));
app.use('/javascript', express.static(__dirname + '/client/lib/javascript'));
app.use('/images', express.static(__dirname + '/client/lib/images'));

app.set('views', 'view');
app.set('view engine', 'ejs');




//-------------------------------------------------------------------------
// Lister Device(s) 

particle.login({username: 'lisa.ribeiro.fernandes@gmail.com', password: 'ExcbmGena57440'}).then(
    function(data){
      console.logclear
      passerDevice(data.body.access_token);
    },
    function(err) {
      console.log('API call completed on promise fail: ', err);
    }
  );

  function passerDevice(access_token){
    var devicesPr = particle.listDevices({ auth: access_token });
    devicesPr.then(
        function(devices){
          console.log('Devices: ', devices);
        },
        function(err) {
          console.log('List devices call failed: ', err);
        }
      );
}

//-------------------------------------------------------------------------



//-------------------------------------------------------------------------
// Routing
app.get("/", function(req, res){
    res.render('Dashboard');
})

app.get('/Dashboard', (req,res)=>{
    res.render('Dashboard');})

app.get('/Devices', (req,res)=>{
    res.render('Devices');
})
app.get('/DevicesDetails', (req,res)=>{
    res.render('DevicesDetails');
})


var port = 1337;
app.listen(port, function(){
    console.log("Express Node.js server running on port 1337")
})