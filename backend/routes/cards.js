const express = require("express");
const { celebrate} = require("celebrate");
const Joi = require("joi");
const { getAllCards, createCard, deleteCard, likeCard, unlikeCard, getCardById } = require("../controllers/cardController.js");

const router = express.Router();

router.get("/", getAllCards);

router.get("/:cardId", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24)
  })
}), getCardById);

router.post("/", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri()
  })
}), createCard);

router.delete("/:cardId", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24)
  })
}), deleteCard);

router.put("/:cardId/likes", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24)
  })
}), likeCard);

router.delete("/:cardId/likes", celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24)
  })
}), unlikeCard);


module.exports = router;
