const Usuario = require('../model/usuario');

function HomePageDoadorView(req, res) {
    Usuario.findByPk(req.session.usuario.id)
        .then((usuario) => {
            if (usuario) {
                
                if (usuario.mensagem) {
                    res.render("HomePageDoador.html", { nome: usuario.nome, mensagem: usuario.mensagem });
                } else {
                    res.render("HomePageDoador.html", { nome: usuario.nome });
                }
            } else {
                res.render("HomePageDoador.html", { erro: "Usuário não encontrado" });
            }
        })
        .catch((erro) => {
            res.render("HomePageDoador.html", { erro });
        });
}

module.exports = {
    HomePageDoadorView
};
