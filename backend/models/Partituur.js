var mongoose = require('mongoose');

var PartituurSchema = new mongoose.Schema({
  naam: String,
  filename: String,
  eigenaar: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  gedeeldMet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});

// Requires population of author
PartituurSchema.methods.toJSON = function(){
  return {
    id: this._id,
    naam: this.naam,
    filename: this.filename,
	eigenaar: this.eigenaar.toJSON(),
	gedeeldMet: this.gedeeldMet
  };
};

mongoose.model('Partituur', PartituurSchema);
