const express = require('express');
const { celebrate} = require('celebrate');
const Joi = require('joi');
const { getAllUsers, getUserMe, getUserById, updateProfile, updateAvatar } = require('../controllers/userController');
const router = express.Router();


router.get("/", getAllUsers);
router.get("/me", getUserMe);
router.get("/:userId", celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24)
  })
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30)
  })
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri()
  })
}), updateAvatar);

module.exports = router;
