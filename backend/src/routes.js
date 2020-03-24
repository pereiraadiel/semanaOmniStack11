/* 
    Metodos HTTP
    
    get: buscar/listar informacao do backend
    post: criar informacao no backend
    put: alterar informacao no backend
    delete: apagar informacao no backend
*/

/*
    Tipos de parametros:

    Query Params: parametros nomeados enviados na rota apos o simbolo de '?'(Filtro/paginacao)
    Route Params: parametro utilizados para identificar recursos
    Request body: utilizado para criar ou alterar recursos
 */

const express = require('express');
const routes = express.Router();
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//Rota para listar todas as ONGs
routes.get('/ongs', OngController.index);
// Rota para inserir uma nova ONG
routes.post('/ongs', OngController.create);

// Rota para listar casos especificos de uma ONG
routes.get('/profile', ProfileController.index);

// Rota para criar um novo caso
routes.post('/incidents', IncidentController.create);
// Rota para listar todos os casos
routes.get('/incidents', IncidentController.index);
// Rota para apagar um caso
routes.delete('/incidents/:id', IncidentController.delete);


// Rota para iniciar sessao de uma ONG
routes.post('/sessions', SessionController.create );
module.exports = routes;