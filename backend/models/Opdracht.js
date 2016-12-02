var mongoose = require('mongoose');

var OpdrachtSchema = new mongoose.Schema({
  naam: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deadline: { type: mongoose.Schema.Types.Date }
}, {timestamps: true});

// Requires population of author
OpdrachtSchema.methods.toJSONFor = function(user){
  return {
    id: this._id,
    naam: this.naam,
    user: this.user.toProfileJSONFor(user),
    deadline: this.deadline
  };
};

mongoose.model('Opdracht', OpdrachtSchema);
