const Usuario = require('../model/usuario');
function loginView(req, res) {
    const erroAutenticacao = req.query.erro_autenticacao === 'true';
    res.render("login.html", { erroAutenticacao });
}

async function autenticar(req, res){
    const usuario = await Usuario.findOne({ where: {
        email: req.body.email, 
        senha: req.body.senha}
    });
    if (req.body.email === 'admin@admin.com' && req.body.senha ==='123admin') {
        req.session.autorizado = true;
        req.session.usuario = usuario;
        res.redirect('/admin');
        console.log("admin entrando");
    }    
    else if(usuario !== null){
        await usuario.update({ status: 'online' });
        req.session.autorizado = true;
        req.session.usuario = usuario;
        res.redirect('/HomePageDoador', );
    }    
    else{
        let erro_autenticacao = true;
        res.render('login.html', {erro_autenticacao});
    }
}

function verificarAutenticacao(req, res, next) {
    if(req.session.autorizado){
        console.log("usuário autorizado");
        next();
    }
    else{
        console.log("usuário NÃO autorizado");
        res.redirect('/');
    }   
}

async function sair(req, res) {
    const usuario = req.session.usuario; 
    if (usuario) {
        await Usuario.update({ status: 'offline' }, { where: { id: usuario.id } });
        req.session.destroy();
    }
    res.redirect('/');
}

module.exports = {
    autenticar,
    loginView,
    verificarAutenticacao,
    sair
};
