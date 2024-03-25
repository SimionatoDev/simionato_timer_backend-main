"use strict";

var express = require('express'); //const cors = require('cors');


var os = require('os');

var PORT = process.env.PORT || 3000;
var app = express();
app.use(express.json());

var allowCors = function allowCors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // colocar os dominios permitidos | ex: 127.0.0.1:3000

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, X-Access-Token, X-Key");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Credentials", "false");
  next();
};

app.use(allowCors); //app.use(cors());

app.use('/', require('./server/route/helloRoute.js'));
app.use('/', require('./server/route/clienteRoute.js'));
app.use('/', require('./server/route/empresaRoute.js'));
app.use('/', require('./server/route/usuarioRoute.js'));
app.use('/', require('./server/route/feriadoRoute'));
app.use('/', require('./server/route/motivoApoRoute'));
app.use('/', require('./server/route/grupoEcoRoute'));
app.use('/', require('./server/route/grupoUserRouter'));
app.use('/', require('./server/route/projetoRouter'));
app.use('/', require('./server/route/aponExecucaoRoute'));
app.use('/', require('./server/route/aponPlanejamentoRoute'));
app.use('/', require('./server/route/estruturaRoute'));
app.use('/', require('./server/route/atividadeRoute'));
app.use('/', require('./server/route/pro_valorRoute'));
app.use('/', require('./server/route/condicaoRoute'));
app.use('/', require('./server/route/emailRoute'));
app.use('/', require('./server/route/auditoriaRoute'));
app.use('/', require('./server/route/trabalhoRoute'));
app.use('/', require('./server/route/parametroRoute.js'));
app.use('/', require('./server/route/contratoRoute'));
app.use('/', require('./server/route/titulo_projetoRoute.js')); //app.use((err, req, res, next) => { res.status(err.httpStatusCode).json({ error: err.message, merda: "Erro" }) });

app.listen(PORT, function () {
  console.log("Servidor No Ar. Porta ".concat(PORT));
});