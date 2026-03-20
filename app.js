/*
** Arquivo principal da aplicação
** Responsável pela chamada dos outros componentes da aplicação.
*/


const express = require('express');
const db = require('./src/config/database/database');


const app = express();
app.use(express.json());


app.get('/', (req, res) => {

    res.send('API Manutecar em execução!!!');

});


app.listen(3000, () =>{

    console.log('Servidor em execução na porta 3000');

});