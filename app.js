const express = require("express");
const app = express();
const sequelize = require("./utils/database");
const authRoutes = require("./routes/auth");
const User = require("./models/user");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const cors = require("cors");
const csrf = require("csrf-simple-origin");

require("dotenv").config();

const allowedOrigins = ["http://localhost:3000"];
app.use(csrf(allowedOrigins));

const secretEnv = process.env.SECRET;
const passwordEnv = process.env.PASSWORD;

console.log(secretEnv);

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

var options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: passwordEnv,
  database: "vanguard",
};

var sessionStore = new MySQLStore(options);

app.use(
  session({
    key: "Cookie",
    secret: secretEnv,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

const middleware = csrf(allowedOrigins);
app.use(middleware);

app.use(authRoutes);

app.use("/", (req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        next();
      });
    })
    .catch((err) => console.log(err));
});

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Guilherme",
        email: "guilherme@teste.com",
        password: "teste",
      });
    }
    app.listen(3001);
  })
  .catch((error) => {});
