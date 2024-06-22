const Usuario = require('../model/usuario');
const { Op } = require('sequelize');


async function listUserView(req, res) {
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

       
        const usuario = await Usuario.findByPk(req.session.usuario.id);

        if (usuario) {
           
            const doadores = await Usuario.findAll({
                where: {
                    email: {
                        [Op.ne]: 'admin@admin.com' 
                    }
                }
            });

            const doadoresComStatus = doadores.map(doador => ({
                ...doador.dataValues,
                statusClass: doador.status === 'online' ? 'online' : 'offline'
            }));

            res.render("listUser", {
                nome: usuario.nome,
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

async function handleUserAction(req, res) {
    try {
        const { email, action, message } = req.body;

        if (action === 'sendMessage') {
            if (message) {
                await Usuario.update({ mensagem: message }, { where: { email } });
                console.log(`Mensagem enviada para: ${email}`);
            } else {
                console.log('Mensagem vazia.');
            }
        } else if (action === 'deleteUser') {
            const usuario = await Usuario.findOne({ where: { email } });
            if (usuario) {
                if (usuario.status === 'offline') {
                    await Usuario.destroy({ where: { email } });
                    console.log(`Usuário excluído: ${email}`);
                } else {
                    console.log("Não é possível excluir um usuário online.");
                }
            } else {
                console.log(`Usuário não encontrado com email: ${email}`);
            }
        }

        res.redirect('/listUser');
    } catch (error) {
        console.error('Erro ao executar a ação do usuário:', error);
        res.status(500).send('Erro no servidor');
    }
}

module.exports = {
    listUserView,
    handleUserAction
};
