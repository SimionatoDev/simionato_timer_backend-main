const estruturaSrv = require('../services/estruturasService');

function adicionaZero(numero) {
    if (numero <= 9)
        return "0" + numero;
    else
        return "" + numero;
}


exports.formatDate = function(date) {

    if (date == null) {
        return null;
    }

    if (typeof(date) === 'string') {
        if (date.length > 10) date = date.substring(0, 10);
        return date;
    } else {
        data = new Date(date);
        return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    }
}




exports.formatDateYYYYMMDD = function(date) {

    if (date == null) {
        return null;
    }
    if (typeof(date) === 'string') {
        if (date.length == 0) {
            return 'null'
        }
        if (date.length > 10) date = date.substring(0, 10);
        date = date.split('/');
        return [date[2], date[1], date[0]].join('-');
    } else {
        return date.yyyymmdd();
    }
}

exports.IfNUllNoAspas = function(date) {

    if (date == 'null') return 'null';

    return `'${date}'`;

}


Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('-');
};

exports.formatDateHour = function(date) {

    return date;

}

exports.lastConta = function(last) {

    const nro = adicionaZero(parseInt(last) + 1);

    return nro;
}

exports.lastSubConta = function(subconta, last) {

    let final = adicionaZero(parseInt(last.substring(last.trim().length - 2)) + 1);

    final = subconta.trim() + final;

    return final
}



exports.novaConta = async function(id_empresa, conta, versao, subconta, nivel) {

    let last = "";

    let nova = "";

    if (conta == "") {

        last = await estruturaSrv.lastConta(id_empresa);

        if (last.max == null) {
            last = '01'
        } else {
            last = this.lastConta(last.max.trim());
        }

        nova = last;

    } else {

        last = await estruturaSrv.lastSubConta(id_empresa, conta, versao, subconta, nivel);

        if (last.max == null) {
            last = '01'
            nova = subconta.trim() + last;
            console.log("Ultima SubConta ", last, "Nova Conta", nova);

        } else {
            console.log('last.max', last.max);
            nova = this.lastSubConta(subconta, last.max);
            console.log("Ultima SubConta ", subconta, "Nova Conta", nova);
        }

    }

    return nova;

}