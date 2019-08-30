const express = require("express");
const routes = express.Router();

const multer = require('multer')
const uploadConfig = require('./config/upload')

const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const AvatarController = require('./controllers/AvatarController')

const authMiddleware = require("./middleware/auth");

const upload = multer(uploadConfig)

routes.post("/signup", UserController.store);
routes.post("/signin", SessionController.store);

routes.use(authMiddleware);

routes.post('/avatar/:id', upload.single('image'), AvatarController.store)

module.exports = routes;