const mongoose = require("mongoose");
const Card = require("../models/Card");

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate("owner").populate("likes");
    res.json(cards);
  } catch (err) {
    console.error("Error al obtener tarjetas:", err);
    res.status(500).json({ message: "Error al obtener tarjetas" });
  }
};

const getCardById = async (req, res) => {
  await Card.findById(req.params.cardId)
  .then(card => {
    if(!card.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "No tienes permiso para ver esta tarjeta" });
    }
    return res.json(card);
  })
    }


const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;

    if (!name || !link) {
      return res.status(400).json({ message: "El nombre y el enlace son obligatorios" });
    }

    const card = await Card.create({
      name,
      link,
      owner: req.user._id,
    });

    const populatedCard = await card.populate("owner");

    res.status(201).json(populatedCard);
  } catch (err) {
    console.error("Error al crear tarjeta:", err);
    res.status(500).json({ message: "Error al crear tarjeta" });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      return res.status(400).json({ message: "ID de tarjeta no válido" });
    }

    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: "Tarjeta no encontrada" });
    }

    if (!card.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "No tienes permiso para eliminar esta tarjeta" });
    }

    await Card.deleteOne({ _id: cardId });
    res.status(200).json({ message: "Tarjeta eliminada con éxito" });
  } catch (err) {
    console.error("Error eliminando tarjeta:", err);
    res.status(500).json({ message: "Error eliminando tarjeta" });
  }
};

// Función para agregar un like
const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).populate("owner");

    if (!card) {
      return res.status(404).json({ message: "Tarjeta no encontrada" });
    }

    res.json(card);
  } catch (err) {
    console.error("Error al dar like a la tarjeta:", err);
    res.status(500).json({ message: "Error al dar like a la tarjeta" });
  }
};

// Función para quitar un like
const unlikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).populate("owner");

    if (!card) {
      return res.status(404).json({ message: "Tarjeta no encontrada" });
    }

    res.json(card);
  } catch (err) {
    console.error("Error al quitar like a la tarjeta:", err);
    res.status(500).json({ message: "Error al quitar like a la tarjeta" });
  }
};



module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
  getCardById
};
