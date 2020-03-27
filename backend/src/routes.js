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
const { celebrate, Segments, Joi} = require('celebrate');
const routes = express.Router();
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//Rota para listar todas as ONGs
routes.get('/ongs', OngController.index);

// Rota para inserir uma nova ONG
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

// Rota para listar casos especificos de uma ONG
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

// Rota para criar um novo caso
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),
}), IncidentController.create);

// Rota para listar todos os casos
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), IncidentController.index);

// Rota para apagar um caso
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), IncidentController.delete);


// Rota para iniciar sessao de uma ONG
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    }),
}), SessionController.create );

module.exports = routes;