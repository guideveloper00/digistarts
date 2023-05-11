const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  const phoneNumber = req.body.phoneNumber;
  const cpf = req.body.cpf;
  const email = req.body.email;
  const birthday = req.body.birthday;
  const password = req.body.password;
  const passwordConfirmation = req.body.passwordConfirmation;

  if (password !== passwordConfirmation) {
    return res.status(406).send("As senhas não conferem");
  }
  User.findAll({ where: { email: email } })
    .then((userDoc) => {
      if (userDoc[0]) {
        res
          .status(406)
          .send("Este email já está cadastrado, tente com um diferente");
        return;
      }
      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          return User.create({
            name: name,
            email: email,
            lastName: lastName,
            phoneNumber: phoneNumber,
            cpf: cpf,
            password: hashedPassword,
            birthday: birthday,
            isAdmin: false
          });
        })
        .then(() => {
          return res.status(201).send("Usuario criado com sucesso");
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};

exports.postSignin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findAll({ where: { email: email } })
    .then((users) => {
      const user = users[0];
      if (!user) {
        return;
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          console.log(doMatch);
          if (doMatch) {
            if(!req.session.user) {
              req.session.user = user;
              res.send("Logado com sucesso!");
            } else {
              res.send("Usuário já está logado!");
            }
          }
          return;
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignout = (req, res, next) => {
  if(req.session.user) {
    req.session.user = null;
    res.send("Usuário deslogado com sucesso!");
  } else {
    res.send("Usuário já está deslogado!");
  }

};
