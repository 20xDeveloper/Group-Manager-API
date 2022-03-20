const express = require('express')
// const multer = require('multer')
// const sharp = require('sharp')
const User = require('../models/user')
const Newsis = require('../models/news')
const Comments = require('../models/comment') // I called it comments instead of comment is because comment is reserved for something else. It's predefined.

const Like = require('../models/like')
const Project = require('../models/project');
const Task = require('../models/task');
const Project_section = require('../models/project_section');



const Sequelize = require("./../db/sequelize");



// const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs') //used for hashing passwords
// const userUtils = require('../utils/userUtils');
const GeneralUtils = require('../utils/generalUtils');



const auth = require('../middleware/auth')
const { sendWelcomeEmail, resetPassword } = require('../emails/EmailSender')
const router = new express.Router()


// This route file is used to handle BOTH projects and task related actions. So, if you are manipulating those two tables the code
// should go in this file. 





// -- Get the list of tasks with their section name for a project --
router.post('/project_section/create', async (req, res) => {
    try{
        console.log("here is the value for the req.body ", req.body.project_ID)

        // console.log("here is the value from the req.body ", req.body['new section name']);
        // // finish up this router than test the create button. THIS IS WHERE I LEFT OFF
        let new_project_section = await Project_section.create({
            project_ID: req.body.project_ID,
            name: req.body['new section name']
        });

        await new_project_section.save();


  

        
        res.status(201).send({  })
    } catch (e) {
        res.status(400).send({e: e.message})
        console.log("here is the error message when getting the list of news ", e)
    }
});


// -- Get the list of project sections for a project --
router.post('/project_section', async (req, res) => {
    try{
        console.log("here is the value for the req.body ", req.body.project_ID)

       let project_sections = await Project_section.findAll({where:{
           project_ID: req.body.project_ID
       }});




  

        
        res.status(201).send({project_sections  })
    } catch (e) {
        res.status(400).send({e: e.message})
        console.log("here is the error message when getting the list of news ", e)
    }
});











module.exports = router