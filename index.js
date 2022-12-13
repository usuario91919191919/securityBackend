const express = require('express');
const { getConnection } = require('./db/db-config');
const cors = require('cors');
const UsuarioRoute = require('./routes/usuario');
const AuthRoute = require('./routes/auth')


getConnection();

const app = express();


app.use(cors());


app.use(express.json());


app.use('/usuario', UsuarioRoute);
app.use('/login', AuthRoute);

app.listen(4000, () => {
    console.log('Server started');
});