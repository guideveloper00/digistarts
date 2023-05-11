const express = require("express");
const app = express();
const sequelize = require("./utils/database");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require('./swagger')(app);

require("dotenv").config();
const secretEnv = process.env.SECRET;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

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
