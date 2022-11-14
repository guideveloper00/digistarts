const express = require("express");
const app = express();
const sequelize = require("./utils/database");
const authRoutes = require("./routes/auth");
const path = require("path");
const session = require("express-session");
const cors = require("cors");
const csrf = require("csrf-simple-origin");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const allowedOrigins = ["http://localhost:3000"];
app.use(csrf(allowedOrigins));

const secretEnv = process.env.SECRET;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    key: "Cookie",
    secret: secretEnv,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(authRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3001);
  })
  .catch((error) => {});
