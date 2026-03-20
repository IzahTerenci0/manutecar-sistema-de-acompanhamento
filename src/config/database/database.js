/*
* Arquivo do script do banco de dados.
* Responsável por: criar a conexão com o banco de dados, ativar foreign keys
* e executar o schema automaticamente
*/


//------------------------------------------------------------------------------------------- Importações
const sqlite = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const caminhoBanco = path.resolve(__dirname, 'manutecar.db');
const caminhoSchema = path.resolve(__dirname, 'schema.sql');

const db = new sqlite.Database(caminhoBanco, (err) =>{

    if(err){

        console.error(`Erro ao realizar conexão do banco de dados: `, err.message);

    } else{

        console.log(`Banco de dados conectado com sucesso!`);

    }

});


db.serialize(() => {

    db.run('PRAGMA foreign_keys = ON');

    const schema = fs.readFileSync(caminhoSchema, 'utf-8');

    db.exec(schema, (err) => {

        if(err){

            console.error(`Erro ao executar schema de criação do banco de dados: `, err.message);

        } else{

            console.log(`Schema de criação do banco de dados carregado com sucesso!`);

        }

    });

});


module.exports = db;