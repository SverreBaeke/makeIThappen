import express from "express";
import * as path from 'path';
import expressLayouts from 'express-ejs-layouts';
import cookieParser from "cookie-parser";

import { home } from "./controllers/page-controller.js";
import { postLogin, login,postRegister,register } from "./controllers/auth-controller.js";
import * as API_TaskController from "./controllers/api/task-controller.js";
import * as API_CategoryController from "./controllers/api/category-controller.js";

import  AuthRegisterValidation  from "./middleware/validation/AuthRegisterValidation.js"
import  AuthLoginValidation  from "./middleware/validation/AuthLoginValidation.js"

import jwAuth from "./middleware/jwAuth.js";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set("layout", "layout/main");
app.set("views", path.resolve("src", "views"));

app.use(express.static('public'));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.get('/login', login);
app.get('/register', register);

app.post('/register', AuthRegisterValidation, postRegister, register);
app.post('/login', AuthLoginValidation, postLogin, login);

app.use(jwAuth);
app.get('/', home);

app.get('/tasks', API_TaskController.index);
app.get('/tasks/:id', API_TaskController.show);
app.post('/tasks', API_TaskController.store);
app.put('/tasks/:id', API_TaskController.update);
app.delete('/tasks/:id', API_TaskController.destroy);

app.get('/categories', API_CategoryController.index);
app.get('/categories/:id', API_CategoryController.show);
app.post('/categories', API_CategoryController.store);
app.put('/categories/:id', API_CategoryController.update);
app.delete('/categories/:id', API_CategoryController.destroy);



app.get('*', (req,res) => {
    res.status(404).render("errors/404", {
        layout: "layout/error"
    })    
})

app.listen(port, () => {
    console.log(`Server is aan luisteren op  http://localhost:${port}`)
})

