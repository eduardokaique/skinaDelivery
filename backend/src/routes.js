const express = require('express');
const routes = express.Router();

const UsuariosController = require('./controllers/UsuariosController');
const SecurityController = require('./controllers/SecurityController');

//#region Rotas de Usuário
routes.post('/usuarios', UsuariosController.create);
routes.get('/usuarios', UsuariosController.get);
routes.delete('/usuarios/:id', UsuariosController.delete);
routes.put('/usuarios', UsuariosController.update);
//#endregion

//#region Rotas de Security
routes.post('/security/signin', SecurityController.authenticate);
//#endregion
module.exports = routes;