const express = require("express");
const router = express.Router();

const Question = require("../models/Question");


// Get random question by difficulty

router.get("/random", async(req,res)=>{

    try{

        const {difficulty} = req.query;


        const questions = await Question.find({
            difficulty:difficulty
        });


        const randomQuestion =
        questions[Math.floor(Math.random()*questions.length)];


        res.json(randomQuestion);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});


module.exports = router;