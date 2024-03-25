//const https = require("https");
//const fs = require("fs");
//process.env.TZ = "America/Brasilia";
//process.env.TZ = 'Etc/Universal';
//process.env.PWD = process.cwd();
const express = require('express');
//const cors = require('cors');
var os = require('os');
const ValUser = require('./util/validacao');
const Parametros = require('./util/parametrostabelas');
const Teste = require('./populabase/testebase');
const service = require('./services/auditoriaService')
const PORT = process.env.PORT || 80;
const app = express();
app.use(express.json());
const allowCors = (req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*"); // colocar os dominios permitidos | ex: 127.0.0.1:3000

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, X-Access-Token, X-Key");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS, PATCH");

    res.header("Access-Control-Allow-Credentials", "false");

    next();
}
app.use(allowCors);
//app.use(cors());
//app.use(express.static(process.env.PWD + '/public'));
app.use('/', require('./route/clienteRoute.js'));
app.use('/', require('./route/empresaRoute.js'));
app.use('/', require('./route/usuarioRoute.js'));
app.use('/', require('./route/feriadoRoute'));
app.use('/', require('./route/motivoApoRoute'));
app.use('/', require('./route/grupoEcoRoute'));
app.use('/', require('./route/grupoUserRouter'));
app.use('/', require('./route/projetoRouter'));
app.use('/', require('./route/aponExecucaoRoute'));
app.use('/', require('./route/aponPlanejamentoRoute'));
app.use('/', require('./route/estruturaRoute'));
app.use('/', require('./route/atividadeRoute'));
app.use('/', require('./route/pro_valorRoute'));
app.use('/', require('./route/condicaoRoute'));
app.use('/', require('./route/emailRoute'));
app.use('/', require('./route/auditoriaRoute'));
app.use('/', require('./route/trabalhoRoute'));
//app.use((err, req, res, next) => { res.json({ error: err.message }) });

app.use((err, req, res, next) => { res.status(err.httpStatusCode).json({ error: err.message, merda: "Fudeu" }) });

//app.use(express.static("frontend"));

/*
const options = {
    key: fs.readFileSync("controltime.key"),
    cert: fs.readFileSync("controltime.crt"),
};

https.createServer(options, app)
    .listen(3000, function(req, res) {
        console.log("Server started at port 3000");
    });
*/

//console.log('2022-03-08T07:30:00.000Z', '2022-03-08T07:30:00.000Z'.replace('T', ' ').replace('Z', ''))



app.listen(PORT, () => { console.log(`Servidor No Ar. Porta ${PORT}`); });


//IP-LOCAL
/*
var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

getAuditorias = async function(params) {
    return auditoriaData.getAuditorias(params);
};

console.log(addresses);
*/