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


//------------------------------------------------------------------------------------------- Listar usuários
exports.listarUsuarios = async (req, res) => {

    try{

        const usuarios = await usuarioService.listarUsuarios();
        return res.status(200).json(usuarios);

    } catch(error){

        return res.status(500).json({

            erro: error.message
        
        });

    }

};


//------------------------------------------------------------------------------------------- Buscar usuário por ID
exports.buscarUsuarioPorId = async (req, res) => {

    try{

        const { id } = req.params;
        const usuario = await usuarioService.buscarUsuarioID(id);

        if(!usuario){

            return res.status(404).json({

                erro: "Usuário não encontrado."

            });

        }

        return res.status(200).json(usuario);

    } catch(error){

        return res.status(500).json({

            erro: error.message

        });

    }

};


//------------------------------------------------------------------------------------------- Inativar usuário
exports.deletarUsuario = async (req, res) => {

    try{

        const { id } = req.params;

        const resultado = await usuarioService.deletarUsuario(id);

        if(resultado.changes === 0){

            return res.status(404).json({

                erro: "Usuário não encontrado ou já inativo."

            });

        }

        return res.status(200).json({

            mensagem: "Usuário inativado com sucesso."

        });

    } catch(error){

        return res.status(500).json({

            erro: error.message

        });

    }
    
};