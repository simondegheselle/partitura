var router = require('express').Router();
var mongoose = require('mongoose');
var Opdracht = mongoose.model('Opdracht');
var User = mongoose.model('User');
var auth = require('../auth');


// geef mij alle vriendeuh
router.get('/', auth.optional, function (req, res, next) {
  return Promise.all([
    Opdracht.find().exec()/*{ user: req.payload.id }*/
  ]).then(function (results) {
    var opdrachten = results[0];
    return res.json({
      opdrachten: opdrachten.map(function (opdracht) {
        return opdracht.toJSONFor();
      })
    })
  }).catch(next);
});


module.exports = router;
