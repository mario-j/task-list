// Angular server

const expressAngular = require('express');
const http = require('http');
const path = require('path');

const appAngular = expressAngular();
const port = 4200;
console.log("port test", process.env.PORT);
appAngular.use(expressAngular.static(__dirname + '/dist/my-app'));
appAngular.get('/*', (req, res) => res.sendFile(path.join(__dirname)));
const serverAngular = http.createServer(appAngular);
serverAngular.listen(process.env.PORT || port, () => console.log(`App running on: http://localhost:${port}`));
