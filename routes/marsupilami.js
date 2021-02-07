const express = require('express');
const router = express.Router();
const Marsupilami = require('../models/marsupilami');
const bycrypt = require('bcryptjs');


//login
router.post('/login', async function (req, res) {
    if (req.body.username === null || req.body.username === '' || req.body.password === null || req.body.password === '') {
        res.json({ success: false, message: 'Entrer votre username et votre mot de passe' });
    }
    else {
        await Marsupilami.findOne({ username: req.body.username }, function (err, data) {
            if (err) {
                res.json({ success: false, message: 'Connection echoue' });
            }
            else {
                if (!data) {
                    res.json({ success: false, message: 'Aucun marsupilami trouve' });
                } else if (data) {
                    console.log(data);
                    if (data.password !== req.body.password) {
                        res.json({ success: false, message: 'Mot de pass incorrect' });
                    }
                    else {
                        res.json({ success: true, message: data });
                    }
                }
            }
        })
    }
})


//register
router.post('/register', async function (req, res) {
    const marsupilami = new Marsupilami({
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        family: req.body.family,
        race: req.body.race,
        food: req.body.food
    })

    if (req.body.username === null || req.body.username === '' || req.body.password === null || req.body.password === '') {
        res.json({ success: false, message: 'Entrer votre username et votre mot de passe' });
    } else {
        await Marsupilami.findOne({ username: req.body.username }, async function (err, data) {
            if (err) {
                res.json({ success: false, message: "Connection echoue" });
            } else if (data) {
                res.json({ success: false, message: "Ce username existe deja" });
            } else {
                await marsupilami.save(function (err, data) {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        res.json({ success: true, message: data });
                    }
                })
            }
        })
    }
})


//get all marsupilami
router.get('/all/:id', async function (req, res) {
    var allId = [];
    allId.push(req.params.id);
    var currentMarsupilami = await Marsupilami.findById(req.params.id);
    for (var i = 0; i < currentMarsupilami.friends.length; i++) {
        allId.push(currentMarsupilami.friends[i]);
    }
    await Marsupilami.find(
        { _id: { $nin: allId } })
        .then(data => {
            res.json({ success: true, message: data });
        }).catch(err => {
            res.json({ success: false, message: err });
        })
})


//get friend marsupilami
router.get('/friend/:id', async function (req, res) {
    var currentMarsupilami = await Marsupilami.findById(req.params.id);
    await Marsupilami.find(
        { _id: { $in: currentMarsupilami.friends } })
        .then(data => {
            res.json({ success: true, message: data });
        }).catch(err => {
            res.json({ success: false, message: err });
        })
})

//get one marsupilami by id
router.get('/marsupilami/:id', async function (req, res) {
    await Marsupilami.findById(req.params.id)
        .then(data => {
            res.json({ success: true, message: data });
        }).catch(err => {
            res.json({ success: false, message: err });
        })
})


//get one marsupilami by username
router.get('/marsupilami/:username', async function (req, res) {
    await Marsupilami.findOne({ username: req.params.username })
        .then(data => {
            res.json({ success: true, message: data });
        }).catch(err => {
            res.json({ success: false, message: err });
        })
})

//delete marsupilami as friends
router.get('/:friend/:id', async function (req, res) {
    var currentMarsupilami = await Marsupilami.findById(req.params.id);
    var index = currentMarsupilami.friends.indexOf(req.params.friend);
    if (index > -1) {
        currentMarsupilami.friends.splice(index, 1);
    }
    currentMarsupilami.save()
        .then(data => {
            res.json({ success: true, message: data });
        }).catch(err => {
            res.json({ success: false, message: err });
        })
})


//add marsupilami as friends
router.get('/add/:id/:friend', async function (req, res) {
    var currentMarsupilami = await Marsupilami.findById(req.params.id);
    var friendMarsupilami = await Marsupilami.findById(req.params.friend);
    currentMarsupilami.friends.push(friendMarsupilami);
    await currentMarsupilami.save()
        .then(data => {
            res.json({ success: true, message: data });
        }).catch(err => {
            res.json({ success: false, message: err });
        })
})


//update marsupilami informations
router.patch('/:id', async function (req, res) {
    await Marsupilami.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                age: req.body.age,
                family: req.body.family,
                race: req.body.race,
                food: req.body.food
            }
        }, { new: true }, function (err, data) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                console.log(data);
                res.json({ success: true, message: data });
            }
        })
})

module.exports = router;