const estadoData = require('../data/estadoData');

exports.getUf = async function(sigla) {
    return estadoData.getUf(sigla);
};

exports.getUfs = async function() {
    return estadoData.getUfs();
};

exports.insertUf = async function(uf) {

    return estadoData.insertUf(uf);

};

exports.updateUf = async function(uf) {

    return estadoData.updateUf(uf);

};

exports.deleteUf = function(sigla) {

    return estadoData.deleteUf(sigla);

};