const express = require('express');
const routes = express.Router();

const UsuariosController = require('./controllers/UsuariosController');
const PerfisController = require('./controllers/PerfisController');
const PagamentosController = require('./controllers/PagamentosController');

//#region Rotas de Usuários
routes.post('/usuarios', UsuariosController.create);
routes.get('/usuarios', UsuariosController.get);
routes.delete('/usuarios/:id', UsuariosController.delete);
routes.put('/usuarios', UsuariosController.update);
routes.post('/usuarios/authenticate', UsuariosController.authenticate);
//#endregion

//#region Rotas de Perfis
routes.post('/perfis', PerfisController.create);
routes.get('/perfis', PerfisController.get);
routes.delete('/perfis/:id', PerfisController.delete);
routes.put('/perfis', PerfisController.update);
//#endregion

//#region Rotas de Pagamentos
routes.post('/pagamentos', PagamentosController.create);
routes.get('/pagamentos', PagamentosController.get);
routes.delete('/pagamentos/:id', PagamentosController.delete);
routes.put('/pagamentos', PagamentosController.update);
//#endregion

module.exports = routes;