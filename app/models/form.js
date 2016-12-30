var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;


var FormSchema = new Schema({

  gender: {
    type: String,
    enum: ['female', 'male'],
    required: [true, 'Gender not specified'],
    match: [/^(female|male)$/, 'Please fill a valid gender']
  },

  firstname: {
    type: String,
    trim: true,
    required: [true, 'Firstname not specified'],
    match: [/^\w+$/, 'Please fill a valid firstname']
  },

  lastname: {
    type: String,
    trim: true,
    required: [true, 'Lastname not specified'],
    match: [/^\w+$/, 'Please fill a valid lastname']
  },

  email: {
    type: String,
    unique: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },

  phone: {
    type: String,
    trim: true,
    match: [/^\w+$/, 'Please fill a valid phone']
  },

  age: {
    type: Number,
    validate: [function(age) { return Number(age) == age && age >= 1 && age <= 99; }, 'Please fill a valid age']
  },

  zip: {
    type: Number,
    required: 'Zip is required',
    match: [/^\d{3,5}$/, 'Please fill a valid zip code']
  }

}, {
  timestamps: true
});


FormSchema.statics = {

}

FormSchema.plugin(autoIncrement.plugin, {
  model: 'Form',
  startAt: 1
});

module.exports.Form = mongoose.model('Form', FormSchema);
