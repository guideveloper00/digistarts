const express = require("express");
const app = express();
const sequelize = require("./utils/database");
const authRoutes = require("./routes/auth");
const mysql = require('mysql');
const userRoutes = require("./routes/user");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require('./swagger')(app);

require("dotenv").config();
const secretEnv = process.env.DB_PASSWORD;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2035',
  database: 'digistarts'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

app.use(
  session({
    key: "Cookie",
    secret: secretEnv,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors({
  origin: true,
  credentials: true
}));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3001);
  })
  .catch((error) => {
    console.log(error);
  });
