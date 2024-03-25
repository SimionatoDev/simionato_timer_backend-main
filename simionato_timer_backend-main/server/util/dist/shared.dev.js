"use strict";

var estruturaSrv = require('../services/estruturasService');

function adicionaZero(numero) {
  if (numero <= 9) return "0" + numero;else return "" + numero;
}

exports.formatDate = function (date) {
  if (date == null) {
    return null;
  }

  if (typeof date === 'string') {
    if (date.length > 10) date = date.substring(0, 10);
    return date;
  } else {
    data = new Date(date);
    return data.toLocaleDateString('pt-BR', {
      timeZone: 'UTC'
    });
  }
};

exports.formatDateYYYYMMDD = function (date) {
  if (date == null) {
    return null;
  }

  if (typeof date === 'string') {
    if (date.length == 0) {
      return 'null';
    }

    if (date.length > 10) date = date.substring(0, 10);
    date = date.split('/');
    return [date[2], date[1], date[0]].join('-');
  } else {
    return date.yyyymmdd();
  }
};

exports.IfNUllNoAspas = function (date) {
  if (date == 'null') return 'null';
  return "'".concat(date, "'");
};

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based

  var dd = this.getDate();
  return [this.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-');
};

exports.formatDateHour = function (date) {
  return date;
};

exports.lastConta = function (last) {
  var nro = adicionaZero(parseInt(last) + 1);
  return nro;
};

exports.lastSubConta = function (subconta, last) {
  var _final = adicionaZero(parseInt(last.substring(last.trim().length - 2)) + 1);

  _final = subconta.trim() + _final;
  return _final;
};

exports.novaConta = function _callee(id_empresa, conta, versao, subconta, nivel) {
  var last, nova;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          last = "";
          nova = "";

          if (!(conta == "")) {
            _context.next = 10;
            break;
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(estruturaSrv.lastConta(id_empresa));

        case 5:
          last = _context.sent;

          if (last.max == null) {
            last = '01';
          } else {
            last = this.lastConta(last.max.trim());
          }

          nova = last;
          _context.next = 14;
          break;

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(estruturaSrv.lastSubConta(id_empresa, conta, versao, subconta, nivel));

        case 12:
          last = _context.sent;

          if (last.max == null) {
            last = '01';
            nova = subconta.trim() + last;
            console.log("Ultima SubConta ", last, "Nova Conta", nova);
          } else {
            console.log('last.max', last.max);
            nova = this.lastSubConta(subconta, last.max);
            console.log("Ultima SubConta ", subconta, "Nova Conta", nova);
          }

        case 14:
          return _context.abrupt("return", nova);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};