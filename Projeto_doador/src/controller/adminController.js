const Usuario = require('../model/usuario');

async function adminView(req, res) {
    try {
        if (!req.session.usuario || req.session.usuario.email !== 'admin@admin.com') {
            req.session.errorMessage = 'Acesso negado. Faça login como administrador.';
            req.session.destroy(err => {
                if (err) {
                    console.error('Erro ao destruir a sessão:', err);
                    return res.status(500).send('Erro no servidor');
                }
                return res.redirect('/');
            });
            return;
        }

        const valorMax = await Usuario.sum('valor');
        const usuario = await Usuario.findByPk(req.session.usuario.id);

        if (usuario) {
            const doadores = await Usuario.findAll();

            const doadoresComStatus = doadores.map(doador => {
                return {
                    ...doador.dataValues,
                    statusClass: doador.status === 'online' ? 'online' : 'offline'
                };
            });

            res.render("admin", {
                nome: usuario.nome,
                valorMax,
                doadores: doadoresComStatus
            });
        } else {
            console.log("Usuário não encontrado");
            res.status(404).send("Usuário não encontrado");
        }
    } catch (error) {
        console.error('Erro ao calcular o total em caixa ou buscar o usuário:', error);
        res.status(500).json({ error: 'Erro ao calcular o total em caixa ou buscar o usuário' });
    }
}

function sairAdmin(req, res) {
    req.session.destroy(err => {
        if (err) {
            console.error('Erro ao destruir a sessão:', err);
            return res.status(500).send('Erro no servidor');
        }
        res.redirect('/');
    });
}

module.exports = {
    adminView,
    sairAdmin
};
