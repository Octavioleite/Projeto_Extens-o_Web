const Usuario = require('../model/usuario');

async function atualizarPerfil(req, res) {
  try {
    const { name, email, phone, dob, password } = req.body;

   
    const usuario = await Usuario.findByPk(req.session.usuario.id);

    if (!usuario) {
      return res.status(404).send("Usuário não encontrado");
    }

    
    await usuario.update({
      nome: name,
      email: email,
      telefone: phone,
      data_nascimento: dob,
      senha: password
    });

   
   
    req.session.successMessage = 'Perfil atualizado com sucesso!';

 
    res.redirect('/Meuperfil');
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    req.session.errorMessage = 'Erro ao atualizar perfil: ' + error.message;
    res.status(500).redirect('/Meuperfil');
  }
}

function MeuperfilView(req, res) {
 
  const successMessage = req.session.successMessage;
  const errorMessage = req.session.errorMessage;

  
  delete req.session.successMessage;
  delete req.session.errorMessage;

 
  Usuario.findByPk(req.session.usuario.id)
    .then((usuario) => {
      if (usuario) {
        res.render("Meuperfil", {
          nome: usuario.nome,
          email: usuario.email,
          telefone: usuario.telefone,
          senha: usuario.senha,
          data_nascimento: usuario.data_nascimento,
          successMessage: successMessage,
          errorMessage: errorMessage
        });
      } else {
        res.status(404).send("Usuário não encontrado");
      }
    })
    .catch((erro) => {
      console.log("Erro ao buscar usuário:", erro);
      res.status(500).send("Erro interno do servidor");
    });
}

module.exports = {
  MeuperfilView,
  atualizarPerfil
};
