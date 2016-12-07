var Schema = mongoose.Schema;


var FormSchema = new Schema({

  firstname: {
    type: String,
    trim: true
  },

  lastname: {
    type: String,
    trim: true
  },

  email: {
    type: String,
    unique: true,
    trim: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },

  phone: {
    type: String,
    trim: true
  },

  age: {
    type: Number,
    validate: [function(age) { return age > 1 && age < 100; }, 'Please fill a valid email address']
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
