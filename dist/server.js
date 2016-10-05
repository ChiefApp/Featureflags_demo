"use strict";
const Path = require("path");
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
const express = require('express');
const consolidate_1 = require('consolidate');
const features = require('./api/Features/index');
const second = require('./api/Second/index');
let app = express();
let port = 1337;
app.engine('hbs', consolidate_1.handlebars);
app.use('/static', express.static(Path.join(__dirname, '../static')));
app.use(bodyParser.json());
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })
// let router = new Router(app, {
//     routesRoot: Path.join(__dirname, 'routes'),
//     viewsRoot: Path.join(__dirname, '../views'),
//     viewsExtension: 'hbs'
// })
console.log("web server running on port " + port);
app.set('views', Path.join(__dirname, '../views'));
app.set('view engine', 'hbs');
app.use('/', features);
app.use('/feature', features);
app.use('/second', second);
app.disable('etag');
app.listen(port);
//# sourceMappingURL=server.js.map