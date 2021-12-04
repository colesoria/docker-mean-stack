const express = require('express');
const app = express();
const PORT = 3000;

// Cargar rutas
const post_routes = require('./routes/post');
const user_routes = require('./routes/user');

// Cargar middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas definitivas
app.use('/post', post_routes);
app.use('/user', user_routes);

app.listen(PORT, ()=> console.log("Conectado a la aplicación."))