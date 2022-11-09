const User = require("../models/user");
const bcrypt = require("bcrypt");
const fetch = require("cross-fetch");

async function validateRecaptchaToken(recaptchaToken) {
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaToken}`,
    { method: "POST" }
  );
  const data = await response.json();

  return data.success;
}

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirmation = req.body.passwordConfirmation;

  if (password !== passwordConfirmation) {
    return res.status(406).send("As senhas não conferem");
  }

  validateRecaptchaToken(req.body.recaptchaToken).then((recaptchaResult) => {
    if (recaptchaResult === true) {
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
                password: hashedPassword,
              });
            })
            .then((result) => {
              return res.send("Usuario criado com sucesso");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.status(200).send("Invalid Captcha");
    }
  });
};
