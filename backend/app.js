const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { celebrate, errors } = require("celebrate");
const Joi = require("joi");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const path = require("path");
const cardsRoutes = require("./routes/cards");
const usersRoutes = require("./routes/users");
const authMiddleware = require("./middlewares/auth");
const { login, createUser } = require("./controllers/userController");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

const { PORT = 3000 } = process.env;

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

const allowedCors = [
  "https://luisadev.lat",
  "https://www.luisadev.lat",
  "https://api.luisadev.lat",
  "http://localhost:3000",
  "http://localhost:5173",
];

app.use((req, res, next) => {
  const origin  = req.headers.origin;
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).default("Jacques Cousteau"),
      about: Joi.string().min(2).max(30).default("Explorador"),
      avatar: Joi.string().default(
        "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg"
      ),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

app.use(authMiddleware);
app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Error interno del servidor" });
});
app.use(express.static(path.join(__dirname, "/")));
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
