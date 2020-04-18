const express = require('express');

const OngController = require('./controller/OngController');
const incidentController = require('./controller/incidentController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');

const routes = express.Router();

routes.post('/sessions',SessionController.create);


routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create);

routes.get('/profile',ProfileController.index);

routes.get('/incidents',incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id',incidentController.delete)
module.exports = routes;