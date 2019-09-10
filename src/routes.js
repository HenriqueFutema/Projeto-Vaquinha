const express = require("express");
const routes = express.Router();

const multer = require('multer')
const uploadConfig = require('./config/upload')

const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const AvatarController = require('./controllers/AvatarController')
const ProjectController = require('./controllers/ProjectController')

const authMiddleware = require("./middleware/auth");

const upload = multer(uploadConfig)

routes.post("/signup", UserController.store);
routes.post("/signin", SessionController.store);
routes.get('/projects', ProjectController.index)

routes.use(authMiddleware);

routes.post('/avatar/:id', upload.single('image'), AvatarController.store)

//Rotas Projetos
routes.get('/projects/:id', ProjectController.show)
routes.post('/projects/create', upload.single('image'), ProjectController.store)
routes.delete('/projects/:id', ProjectController.destroy)
routes.put('/projects/:id', ProjectController.update)



module.exports = routes;