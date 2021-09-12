// Angular server

const expressAngular = require('express');
const http = require('http');
const path = require('path');

const appAngular = expressAngular();
const port = process.env.PORT || 4200;
appAngular.use(expressAngular.static(__dirname + '/dist/task-list'));
appAngular.get('/*', (req, res) => res.sendFile(path.join(__dirname)));
const serverAngular = http.createServer(appAngular);
serverAngular.listen(port, () => console.log(`App running on: http://localhost:${port}`));
