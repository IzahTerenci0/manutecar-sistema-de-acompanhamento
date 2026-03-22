/*
** Service responsável por implementar manipulação de dados de usuário
** e consultas ao banco de dados.
*/


const db = require('../config/database/database');


//------------------------------------------------------------------------------------------- Criação do usuário
exports.criarUsuario = ( { nome, email, senha_hash, telefone } ) => {

    return new Promise((resolve, reject) => {

        const sql = 'INSERT INTO usuario(nome, email, senha_hash, telefone) VALUES(?, ?, ?, ?)';

        db.run(sql, [nome, email, senha_hash, telefone], function(err){

            if(err){

                return(reject(err));

            }

            resolve({

                id: this.lastID,
                nome,
                email,
                telefone

            });

        });

    });

};


//------------------------------------------------------------------------------------------- Listar usuários
exports.listarUsuarios = () => {

    return new Promise((resolve, reject) => {

        const sql = 'SELECT id, nome, email, telefone, data_criacao FROM usuario WHERE status_usr = 1';

        db.all(sql, [], (err, rows) => {

            if(err){

                return(reject(err));

            }

            resolve(rows);

        });

    });

};


//------------------------------------------------------------------------------------------- Buscar usuário por ID
exports.buscarUsuarioID = (id) => {

    return new Promise((resolve, reject) => {

        const sql = 'SELECT id, nome, email, telefone, data_criacao FROM usuario WHERE id = ? AND status_usr = 1';

        db.get(sql, [id], (err, row) => {

            if(err){

                return(reject(err));

            }

            resolve(row);

        });

    });

};


//------------------------------------------------------------------------------------------- Deletar usuário
exports.deletarUsuario = (id) => {

    return new Promise((resolve, reject) => {

        const sql = 'UPDATE usuario SET status_usr = 0 WHERE id = ? AND status_usr = 1';

        db.run(sql, [id], function(err){

            if(err){

                return(reject(err));

            }

            resolve( {changes: this.changes} );

        });

    });

};