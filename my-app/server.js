// Angular server

const expressAngular = require('express');
const http = require('http');
const path = require('path');

const appAngular = expressAngular();
const port = 4200;
appAngular.use(expressAngular.static(__dirname + '/dist/my-app'));
appAngular.get('/*', (req, res) => res.sendFile(path.join(__dirname)));
const serverAngular = http.createServer(appAngular);
serverAngular.listen(process.env.PORT || port, () => console.log(`App running on: http://localhost:${port}`));


//Node server
const express = require("express")
var cors = require('cors')
var app = express();
const nodePort = 3000;
var server = app.listen(process.env.PORT || nodePort, () => console.log(`App running on: http://localhost:${nodePort}`));
app.use(cors());

var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route
