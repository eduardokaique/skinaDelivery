const express = require('express');
const routes = express.Router();

const UsuariosController = require('./controllers/UsuariosController');

//#region Rotas de Usuário
routes.post('/usuarios', UsuariosController.create);
routes.get('/usuarios', UsuariosController.get);
routes.delete('/usuarios/:id', UsuariosController.delete);
routes.put('/usuarios', UsuariosController.update);
routes.post('/usuarios/authenticate', UsuariosController.authenticate);
//#endregion

module.exports = routes;