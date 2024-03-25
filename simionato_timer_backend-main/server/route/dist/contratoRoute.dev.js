"use strict";

var express = require('express');

var router = express.Router();

var upload = require('../config/multer');

var constratoServ = require('../services/contratoService');

router.get('/api/contrato', function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            res.status(200).json({
              message: 'GET CONTRATO'
            });
          } catch (err) {
            if (err.name == 'MyExceptionDB') {
              res.status(409).json(err);
            } else {
              res.status(500).json({
                erro: 'BAK-END',
                tabela: 'CONTRATOS',
                message: err.message
              });
            }
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/api/contrato', upload.single('file'), function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {
            constratoServ.insertContrato(req, res);
            res.status(200).json({
              message: 'CONTRATO INCLUIDO!'
            });
          } catch (err) {
            if (err.name == 'MyExceptionDB') {
              res.status(409).json(err);
            } else {
              res.status(500).json({
                erro: 'BAK-END',
                tabela: 'CONTRATOS',
                message: err.message
              });
            }
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;