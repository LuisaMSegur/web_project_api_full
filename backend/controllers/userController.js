const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

const getUserMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error al obtener usuario actual:", err);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error al obtener usuario por ID:", err);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "El correo electrónico ya está registrado" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: "Jaques Cousteau",
      about: "Explorador",
      avatar: "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
      email,
      password: hash,
    });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(201).json(userWithoutPassword);
  } catch (err) {
    console.error("Error al crear usuario:", err);

    if (err.code === 11000) {
      return res.status(409).json({ message: "El correo electrónico ya existe" });
    }

    res.status(400).json({ message: "Datos de usuario inválidos" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error al actualizar perfil:", err);
    res.status(400).json({ message: "Datos de perfil inválidos" });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error al actualizar avatar:", err);
    res.status(400).json({ message: "URL de avatar inválida" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.json({ token, user: userWithoutPassword });
  } catch (err) {
    console.error("Error en el login:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  getAllUsers,
  getUserMe,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};