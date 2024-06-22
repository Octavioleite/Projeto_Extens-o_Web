const Usuario = require('../model/usuario');

function dinheiroView(req, res) {
    res.render("doadorDinheiro.html");
}

async function adicionarDinheiro(req, res) {
    try {
        let usuario = req.session.usuario;

        if (!usuario || !usuario.email) {
            return res.status(400).send("Usuário não autenticado ou email não fornecido.");
        }

        let doacaoExistente = await Usuario.findOne({ where: { email: usuario.email } });

        if (!doacaoExistente) {
            return res.status(404).send("Usuário não encontrado.");
        }

        let valorDoacao = parseFloat(req.body.valorDoacao);

        if (isNaN(valorDoacao)) {
            return res.status(400).send("Valor de doação inválido.");
        }

        let valorTotal = parseFloat(doacaoExistente.valor) + valorDoacao;

        await Usuario.update({ valor: valorTotal }, { where: { email: usuario.email } });

        res.redirect('/doadorDinheiro');
    } catch (error) {
        console.error("Erro:", error);
        res.status(500).send("Algo deu errado.");
    }
}

module.exports = {
    dinheiroView,
    adicionarDinheiro
};
