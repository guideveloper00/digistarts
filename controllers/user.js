const User = require("../models/user");

exports.getUser = (req, res, next) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user});
  } else {
    res.send({ loggedIn: false });
  }
};

exports.patchUser = (req, res, next) => {
  if (req.session.user) {
    const email = req.body.email;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;
    const birthday = req.body.birthday;
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;
    
    if (password !== passwordConfirmation) {
      return res.status(406).send("As senhas não conferem");
    }
    
    User.update({
      name,
    lastName,
    phoneNumber,
    birthday,
    password,
    },
    { where: { email: email } })
      .then(() => {
        res.send("Usuário atualizado com sucesso")
        return;
      })
      .catch((err) => {
        res.send(err);
        return;
      });
  } else {
    res.send("Apenas um usuário logado pode alterar suas próprias informações")
  }
};

exports.deleteUser = (req, res, next) => {

  const email = req.params.email;

  User.destroy({ where: { email: email } })
    .then(() => {
      res.send("Usuário deletado com sucesso")
      return;
    })
    .catch((err) => {
      res.send(err);
      return;
    });
};
