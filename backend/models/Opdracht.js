var mongoose = require('mongoose');

var OpdrachtSchema = new mongoose.Schema({
  naam: String,
  beschrijving: String,
  deadline: { type: mongoose.Schema.Types.Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

}, {timestamps: true});

// Requires population of author
OpdrachtSchema.methods.toJSON = function(){
  return {
    id: this._id,
    naam: this.naam,
    beschrijving: this.beschrijving,
    user: this.user.toJSON(),
    deadline: this.deadline
  };
};

mongoose.model('Opdracht', OpdrachtSchema);
