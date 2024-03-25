const db = require('../infra/database');

exports.getUf = function(sigla) {
    return db.oneOrNone('select * from uf where sigla = $1 ', [sigla]);
};

exports.getUfs = function() {
    return db.manyOrNone('select * from uf order by sigla');
};

exports.insertUf = function(uf) {

    return db.oneOrNone('insert into uf (sigla,estado) values ($1,$2) returning * ', [uf.sigla, uf.estado]);

};

exports.updateUf = function(uf) {
    return db.oneOrNone('update uf set estado = $2 where sigla = $1 returning * ', [uf.sigla, uf.estado]);
};

exports.deleteUf = function(sigla) {
    return db.none('delete from uf where sigla = $1', [sigla]);
};