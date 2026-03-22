/*
**
**
*/


//------------------------------------------------------------------------------------------- Importações
const usuarioService = require('../services/usuarioService');


//------------------------------------------------------------------------------------------- Criação de usuário
exports.criarUsuario = async(req, res) => {

    try{

        const{ nome, email, senha_hash, telefone } = req.body;

        if(!nome || !!email || !senha_hash){

            return res.status(400).json({

                erro: 'Nome, e-mail e senha são obrigatórios na criação de usuário.'

            });

        }

        const usuario = await usuarioService.criarUsuario({

            nome, email, senha_hash, telefone

        });

        return(res.status(201).json(usuario));

    } catch(error){

        if(error.message.includes('UNIQUE constraint')){

            return(res.status(409).json({

                erro: 'Endereço de e-mail já está cadastrado.'

            }));

        }

        return(res.status(500).json({

            erro: error.message

        }));

    }

};