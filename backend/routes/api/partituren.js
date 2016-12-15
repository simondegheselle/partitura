var router = require('express').Router();
var mongoose = require('mongoose');
var Partituur = mongoose.model('Partituur');
var User = mongoose.model('User');
var auth = require('../auth');


// geef mij alle vriendeuh
router.get('/', auth.required, function(req, res, next) {
    Partituur.find().populate('eigenaar').then(function(partituren) {
        return res.json({
            partituren: partituren.map(function(partituur) {
                return partituur.toJSON();
            })
        })
    }).catch(next);
});



// maak nieuw vriendje
router.post('/', auth.required, function(req, res, next) {
    if (!req.body.partituur.naam) {
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

        var partituur = new Partituur(req.body.partituur);

        partituur.eigenaar = user;

        return partituur.save().then(function() {
            return res.json({
                partituur: partituur.toJSON()
            });
        });
    }).catch(next);
});

// wijzig opdracht
router.put('/', auth.required, function(req, res, next) {

    Partituur.findById(req.body.partituur.id).then(function(partituur) {
        if (!partituur) {
            return res.sendStatus(401);
        }

        //var opdracht = req.body.opdracht;

        if (typeof req.body.partituur.naam !== 'undefined') {
            partituur.naam = req.body.partituur.naam;
        }

        if (typeof req.body.partituur.filename !== 'undefined') {
            partituur.filename = req.body.partituur.filename;
        }



        return partituur.save().then(function() {
            return res.json({
                partituur: partituur.toJSON()
            });
        });
    }).catch(next);
});

router.put('/sharing', auth.required, function(req, res, next) {

    Partituur.findById(req.body.partituur.id).then(function(partituur) {
        if (!partituur) {
            return res.sendStatus(401);
        }

        if (typeof req.body.partituur.gedeeldMet !== 'undefined') {
            partituur.gedeeldMet = req.body.partituur.gedeeldMet.map(value => {
                return value.id;
            });
        }

        return partituur.save().then(function() {
            return res.json({
                partituur: partituur.toJSON()
            });
        });
    }).catch(next);
});



// verwijder vriendje :'(
router.delete('/:partituur', auth.required, function(req, res, next) {
    Partituur.findOne({
        _id: req.body.partituur.id
    }).then(function(partituur) {
        return partituur.remove().then(function() {
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

router.param('partituur', function(req, res, next, id) {
    Partituur.findOne({
            _id: id
        })
        .then(function(partituur) {
            if (!partituur) {
                return res.sendStatus(404);
            }

            req.body.partituur = partituur;

            return next();
        }).catch(next);
});

module.exports = router;
