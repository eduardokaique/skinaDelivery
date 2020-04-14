const express = require('express');
const routes = express.Router();

const UsuariosController = require('./controllers/UsuariosController');
const PerfisController = require('./controllers/PerfisController');

//#region Rotas de Usuários
routes.post('/usuarios', UsuariosController.create);
routes.get('/usuarios', UsuariosController.get);
routes.delete('/usuarios/:id', UsuariosController.delete);
routes.put('/usuarios', UsuariosController.update);
routes.post('/usuarios/authenticate', UsuariosController.authenticate);
//#endregion
routes.post('/perfis', PerfisController.create);
routes.get('/perfis', PerfisController.get);
routes.delete('/perfis/:id', PerfisController.delete);
routes.put('/perfis', PerfisController.update);
//#region Rotas de Perfis

//#endregion

module.exports = routes;