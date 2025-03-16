const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau",
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Explorador",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: (v) => /^https?:\/\/(www\.)?[\w-]+\.[\w\-.~:/?#[\]@!$&'()*+,;=]+#?$/i.test(v),
      message: "El enlace del avatar no es válido"
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
          return validator.isEmail(v);
      },
      message: "El email no es válido"
  }
},
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

 userSchema.statics.findUserByCredentials = function findUserByCredentials(
   email,
   password
 ) {
   return this.findOne({ email })
     .select("+password")
     .then((user) => {
       if (!user) {
         return Promise.reject(new Error("Email o password Incorrectos"));
       }
       return bcrypt.compare(password, user.password).then((matched) => {
         if (!matched) {
           return Promise.reject(new Error("Email o password Incorrectos"));
         }
         return user;
       });
     });
 };

module.exports = mongoose.model("user", userSchema);
