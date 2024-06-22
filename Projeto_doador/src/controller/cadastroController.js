const Usuario = require('../model/usuario');

function cadastroView(req, res){
    res.render("cadastro.html");
}

function cadastrarUsuario(req, res) {
    let usuario = {
        email: req.body.email,
        senha: req.body.senha,
        nome: req.body.nome,
        data_nascimento: req.body.dataNascimento,
        telefone: req.body.telefone
    };
    Usuario.create(usuario).then(()=>{
        let sucesso = true;
        res.redirect('/?sucesso=true'); 
    }).catch((err)=>{
        console.log(err);
        let erro = true;
        res.redirect('/?erro=true'); 
    });
}

module.exports = {
    cadastrarUsuario,
    cadastroView
};