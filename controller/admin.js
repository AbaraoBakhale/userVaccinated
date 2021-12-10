const express = require("express");
const route = express.Router();




const users = require("../Model/user");

const mongoose = require("mongoose");

// Admin can see all user vaccinated
route.get('/allVaccinated',(req,res,next)=>{
    users.find()
    .then(result=>{
        res.status(200).json({
            usersData:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
});

// Filter values by Location 
route.get('/location/:State', async (req,res,next)=>{
    users.find({State:req.params.State})
    .then(result=>{
        return res.status(200).json({
            UserLocation:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })


})


// Sort data by desending
route.get('/sort/desc',async (req,res,next)=>{
    users.find({}).sort({Date:-1})

    .then(result => {
        // return res.send("HELLLO")
        res.status(200).json({
            shortData:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
});

// Fetch Data by Asc
route.get('/sort/Asc',async (req,res,next)=>{
    users.find({}).sort({Date:1})

    .then(result => {
        // return res.send("HELLLO")
        res.status(200).json({
            shortData:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
});
// --------------------------------------------------------------------------------
// Count How many user get vaccine in each year:
route.get('/sort/yearly',async (req,res,next)=>{
    users.aggregate([
    {$match:{}},
        {"$group":{
            "_id":{"year":{"$year":"$Date"}},count:{$sum:1}
        }
    }
    ])
    .then(result => {
        // return res.send("HELLLO")
        res.status(200).json({
            shortData:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
});

// --------------------------------------------------------------------------------
// Count How many user get vaccine in each Month:
route.get('/sort/monthly',async (req,res,next)=>{
    users.aggregate([
    {$match:{}},

        {"$group":{
            "_id":{"month":{"$month":"$Date"}},count:{$sum:1}
        }
    }
    ])

    .then(result => {
        // return res.send("HELLLO")
        res.status(200).json({
            shortData:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
});
// --------------------------------------------------------------------------------------------
// Count How many user get vaccine in each Daily:
route.get('/sort/Daily',async (req,res,next)=>{
    users.aggregate([
        {$match:{}},
        {"$group":{
            "_id":{$dateToString:{"$day":"$Date"}},count:{$sum:1}
        }
    }
       
    ])

    .then(result => {
        // return res.send("HELLLO")
        res.status(200).json({
            shortData:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
});





module.exports = route;