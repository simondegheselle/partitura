var router = require('express').Router();
var mongoose = require('mongoose');
var Opdracht = mongoose.model('Opdracht');
var User = mongoose.model('User');
var auth = require('../auth');


// geef mij alle vriendeuh
router.get('/', auth.optional, function(req, res, next) {
    return Promise.all([
        Opdracht.find().exec() /*{ user: req.payload.id }*/
    ]).then(function(results) {
        var opdrachten = results[0];
        return res.json({
            opdrachten: opdrachten.map(function(opdracht) {
                return opdracht.toJSON();
            })
        })
    }).catch(next);
});



// maak nieuw vriendje
router.post('/', auth.required, function(req, res, next) {
    if (!req.body.opdracht.naam) {
        return res.status(422).json({
            errors: {
                naam: "gelieve een naam in te geven."
            }
        });
    }


    User.findById(req.payload.id).then(function(user) {
        if (!user) {
            return res.sendStatus(401);
        }

        var opdracht = new Opdracht(req.body.opdracht);

        opdracht.user = user;

        return opdracht.save().then(function() {
            console.log(opdracht);
            return res.json({
                opdracht: opdracht.toJSON()
            });
        });
    }).catch(next);
});

// wijzig opdracht
router.put('/opdracht', auth.required, function(req, res, next) {

    Opdracht.findById(req.body.opdracht.id).then(function(opdracht) {
        if (!opdracht) {
            return res.sendStatus(401);
        }

        //var opdracht = req.body.opdracht;

        if (typeof req.body.opdracht.naam !== 'undefined') {
            opdracht.naam = req.body.opdracht.naam;
        }

        if (typeof req.body.opdracht.beschrijving !== 'undefined') {
            opdracht.beschrijving = req.body.opdracht.beschrijving;
        }


        if (typeof req.body.opdracht.deadline !== 'undefined') {
            opdracht.deadline = req.body.opdracht.deadline;
        }

        return opdracht.save().then(function() {
            return res.json({
                opdracht: opdracht.toJSON()
            });
        });
    }).catch(next);
});

// verwijder vriendje :'(
router.delete('/:opdracht', auth.required, function(req, res, next) {
    Opdracht.findOne({
        _id: req.body.opdracht.id
    }).then(function(opdracht) {
        return opdracht.remove().then(function() {
            return res.sendStatus(204);
        }).catch(next);
    });
});




// geef specifiek vriendje
router.get('/:opdracht', auth.optional, function(req, res, next) {
    Promise.all([
        Opdracht.findOne({
            user: req.payload.id,
            _id: req.body.opdracht.id
        }).exec()
    ]).then(function(results) {
        var opdracht = results[0];
        return res.json({
            opdracht: opdracht.toJSON()
        });
    }).catch(next);
});

router.param('opdracht', function(req, res, next, id) {
    Opdracht.findOne({
            _id: id
        })
        .then(function(opdracht) {
            if (!opdracht) {
                return res.sendStatus(404);
            }

            req.body.opdracht = opdracht;

            return next();
        }).catch(next);
});

module.exports = router;
