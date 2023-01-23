const { query } = require('express');
var express = require('express');
var router = express.Router();
mongodb://localhost:27017
/* GET users listing. */

var mongoose = require('./db');
const User = mongoose.model('messcuts', { name: String, usercode: Number, messcut: Boolean, time: String });
router.get('/full', function (req, res, next) {
    User.find({}, (err, users) => {
        if (err) console.log("error");;
        res.send(users);
    });
});
router.get('/:id', function (req, res, next) {
    User.find({ usercode: req.params.id }, (err, users) => {
        console.log(req.params.id)
        if (err) console.log("error");;
        if (users.length >= 1)
            res.json({ messcut: true });
        else
            res.json({ messcut: false });
    });
});
router.post('/', function (req, res, next) {
    if (req.body.messcut) {
        const offset = new Date().getTimezoneOffset();
        const indianTime = new Date(new Date().getTime() + offset * 60 * 1000 + 330 * 60 * 1000);
        const indianTimeFormat = new Intl.DateTimeFormat('en-IN', {
            year: 'numeric', 
            month: 'short', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        }).format(indianTime);
        const newMessCut = new User({
            name: req.body.name,
            usercode: req.body.usercode,
            messcut: req.body.messcut,
            time: indianTimeFormat
        });
        newMessCut.save((err,messcut) => {
            if (err) return console.error(err);
            res.json(messcut);
        });
    } else {
        User.deleteOne({ usercode: req.body.usercode }, (err) => {
            if (err) return console.error(err);
            res.json({ message: "Successfully deleted the messcut with usercode: " + req.body.usercode });
        });
    }
});
module.exports = router;
