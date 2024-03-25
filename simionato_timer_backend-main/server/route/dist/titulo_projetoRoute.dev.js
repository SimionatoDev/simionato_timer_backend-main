"use strict";

/* ROUTE titulos_projeto */
var db = require('../infra/database');

var shared = require('../util/shared');

var express = require('express');

var router = express.Router();

var titulo_projetoSrv = require('../services/titulo_projetoService');
/* ROTA GETONE titulo_projeto */


router.get("/api/titulo_projeto/:id_empresa/:id_projeto/:data_vencto", function _callee(req, res) {
    var searchRegExp, vencto, lsLista;
    return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    searchRegExp = /_/g;
                    vencto = req.params.data_vencto.replace(searchRegExp, '/');
                    _context.prev = 2;
                    _context.next = 5;
                    return regeneratorRuntime.awrap(titulo_projetoSrv.getTitulo_Projeto(req.params.id_empresa, req.params.id_projeto, vencto));

                case 5:
                    lsLista = _context.sent;

                    if (lsLista == null) {
                        res.status(409).json({
                            message: 'Titulo_Projeto Não Encontrada.'
                        });
                    } else {
                        res.status(200).json(lsLista);
                    }

                    _context.next = 12;
                    break;

                case 9:
                    _context.prev = 9;
                    _context.t0 = _context["catch"](2);

                    if (_context.t0.name == 'MyExceptionDB') {
                        res.status(409).json(_context.t0);
                    } else {
                        res.status(500).json({
                            erro: 'BAK-END',
                            tabela: 'titulo_projeto',
                            message: _context.t0.message
                        });
                    }

                case 12:
                case "end":
                    return _context.stop();
            }
        }
    }, null, null, [
        [2, 9]
    ]);
});
/* ROTA GETALL titulo_projeto */

router.get("/api/titulos_projeto", function _callee2(req, res) {
    var lsLista;
    return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return regeneratorRuntime.awrap(titulo_projetoSrv.getTitulos_Projeto());

                case 3:
                    lsLista = _context2.sent;

                    if (lsLista.length == 0) {
                        res.status(409).json({
                            message: 'Nehuma Informação Para Esta Consulta.'
                        });
                    } else {
                        res.status(200).json(lsLista);
                    }

                    _context2.next = 10;
                    break;

                case 7:
                    _context2.prev = 7;
                    _context2.t0 = _context2["catch"](0);

                    if (_context2.t0.name == 'MyExceptionDB') {
                        res.status(409).json(_context2.t0);
                    } else {
                        res.status(500).json({
                            erro: 'BAK-END',
                            tabela: 'titulo_projeto',
                            message: _context2.t0.message
                        });
                    }

                case 10:
                case "end":
                    return _context2.stop();
            }
        }
    }, null, null, [
        [0, 7]
    ]);
});
/* ROTA INSERT titulo_projeto */

router.post("/api/titulo_projeto", function _callee3(req, res) {
    var titulo_projeto, registro;
    return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.prev = 0;
                    titulo_projeto = req.body;
                    console.log("Rota titulo_projeto", titulo_projeto);
                    _context3.next = 5;
                    return regeneratorRuntime.awrap(titulo_projetoSrv.insertTitulo_Projeto(titulo_projeto));

                case 5:
                    registro = _context3.sent;

                    if (registro == null) {
                        res.status(409).json({
                            message: 'Titulo_Projeto Não Cadastrado!'
                        });
                    } else {
                        res.status(200).json(registro);
                    }

                    _context3.next = 12;
                    break;

                case 9:
                    _context3.prev = 9;
                    _context3.t0 = _context3["catch"](0);

                    if (_context3.t0.name == 'MyExceptionDB') {
                        res.status(409).json(_context3.t0);
                    } else {
                        res.status(500).json({
                            erro: 'BAK-END',
                            tabela: 'Titulo_Projeto',
                            message: _context3.t0.message
                        });
                    }

                case 12:
                case "end":
                    return _context3.stop();
            }
        }
    }, null, null, [
        [0, 9]
    ]);
});
/* ROTA UPDATE titulo_projeto */

router.put("/api/titulo_projeto", function _callee4(req, res) {
    var titulo_projeto, registro;
    return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    _context4.prev = 0;
                    titulo_projeto = req.body;
                    console.log('params=>Rota UPDATE titulosprojeto', titulo_projeto);
                    _context4.next = 5;
                    return regeneratorRuntime.awrap(titulo_projetoSrv.updateTitulo_Projeto(titulo_projeto));

                case 5:
                    registro = _context4.sent;

                    if (registro == null) {
                        res.status(409).json({
                            message: 'Titulo_Projeto Não Alterado!'
                        });
                    } else {
                        res.status(200).json(registro);
                    }

                    _context4.next = 12;
                    break;

                case 9:
                    _context4.prev = 9;
                    _context4.t0 = _context4["catch"](0);

                    if (_context4.t0.name == 'MyExceptionDB') {
                        res.status(409).json(_context4.t0);
                    } else {
                        res.status(500).json({
                            erro: 'BAK-END',
                            tabela: 'Titulo_Projeto',
                            message: _context4.t0.message
                        });
                    }

                case 12:
                case "end":
                    return _context4.stop();
            }
        }
    }, null, null, [
        [0, 9]
    ]);
});
/* ROTA DELETE titulo_projeto */

router["delete"]("/api/titulo_projeto/:id_empresa/:id_projeto/:data_vencto", function _callee5(req, res) {
    var searchRegExp, vencto, titulo_projeto;
    return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    console.log('params=>Rota delete titulosprojeto', req.params.id_empresa, req.params.id_projeto, req.params.data_vencto);
                    searchRegExp = /_/g;
                    vencto = req.params.data_vencto.replace(searchRegExp, '/');
                    _context5.prev = 3;
                    titulo_projeto = req.body;
                    _context5.next = 7;
                    return regeneratorRuntime.awrap(titulo_projetoSrv.deleteTitulo_Projeto(req.params.id_empresa, req.params.id_projeto, vencto));

                case 7:
                    res.status(200).json({
                        message: 'Titulo_Projeto Excluído Com Sucesso!'
                    });
                    _context5.next = 13;
                    break;

                case 10:
                    _context5.prev = 10;
                    _context5.t0 = _context5["catch"](3);

                    if (_context5.t0.name == 'MyExceptionDB') {
                        res.status(409).json(_context5.t0);
                    } else {
                        res.status(500).json({
                            erro: 'BAK-END',
                            tabela: 'Titulo_Projeto',
                            message: _context5.t0.message
                        });
                    }

                case 13:
                case "end":
                    return _context5.stop();
            }
        }
    }, null, null, [
        [3, 10]
    ]);
}); //consultas post

router.post('/api/titulosprojeto', function _callee6(req, res) {
    var params, lsTitulos;
    return regeneratorRuntime.async(function _callee6$(_context6) {
        while (1) {
            switch (_context6.prev = _context6.next) {
                case 0:
                    /*
                        {
                            public id_empresa: number = 0;
                    public id_projeto: number = 0;	
                    public data_vencto:string =  ""  ; 
                    public data_pagto:string =   "" ; 
                    public pagina: number = 0;
                    public tamPagina: number = 50;
                    public contador: string = 'N';
                    public orderby: string = '';
                    public sharp: boolean = false;
                        }
                    */
                    params = req.body;
                    console.log('params=>Rota titulosprojeto', params);
                    _context6.prev = 2;
                    _context6.next = 5;
                    return regeneratorRuntime.awrap(titulo_projetoSrv.getTitulos_Projeto(params));

                case 5:
                    lsTitulos = _context6.sent;

                    if (params.contador == "S") {
                        res.status(200).json(lsTitulos);
                    } else {
                        if (lsTitulos.length == 0) {
                            res.status(409).json({
                                message: 'Nehuma Informação Para Esta Consulta.'
                            });
                        } else {
                            res.status(200).json(lsTitulos);
                        }
                    }

                    _context6.next = 12;
                    break;

                case 9:
                    _context6.prev = 9;
                    _context6.t0 = _context6["catch"](2);

                    if (_context6.t0.name == 'MyExceptionDB') {
                        res.status(409).json(_context6.t0);
                    } else {
                        res.status(500).json({
                            erro: 'BAK-END',
                            tabela: 'TíTULOS',
                            message: _context6.t0.message
                        });
                    }

                case 12:
                case "end":
                    return _context6.stop();
            }
        }
    }, null, null, [
        [2, 9]
    ]);
}); //Gravação de um array

router.post("/api/titulo_projeto_save_all", function(req, res) {
try {
    var titulos = req.body;
    console.log("Rota titulo_projeto_save_all", titulos);
    titulos.forEach(function _callee7(titulo_projeto) {
        var registro;
        return regeneratorRuntime.async(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _context7.next = 2;
                        return regeneratorRuntime.awrap(titulo_projetoSrv.insertTitulo_Projeto(titulo_projeto));

                    case 2:
                        registro = _context7.sent;

                    case 3:
                    case "end":
                        return _context7.stop();
                }
            }
        });
    });
    res.status(200).json({
        message: 'Títulos Gravados Com Sucesso!'
    });
} catch (err) {
    if (err.name == 'MyExceptionDB') {
        res.status(409).json(err);
    } else {
        res.status(500).json({
            erro: 'BAK-END',
            tabela: 'Titulo_Projeto',
            message: err.message
        });
    }
}

case 1:
case "end":
    return _context8.stop();
}
}
});
});
module.exports = router;