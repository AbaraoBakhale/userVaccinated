const express = require("express");
const route = express.Router();

const users = require("../Model/user");
const mongoose = require("mongoose");


route.post('/getVaccine', (req, res, next) => {
    
        const user = new users({
            _id: new mongoose.Types.ObjectId,
            AdharNumber: req.body.AdharNumber,
            State: req.body.State,
            Date: req.body.Date,
            
        })
        user.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    User: result
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
    

    
});

module.exports = route;

