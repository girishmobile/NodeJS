
const mongoose = require('mongoose');
const Joi = require('joi');const 
 genreSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true,
      minlength:5,
      maxlength:255
    }
});
const Genre =  mongoose.model('Gener',genreSchema);

function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
  };
  module.exports.Genre = Genre;
  module.exports.validateGenre = validateGenre;