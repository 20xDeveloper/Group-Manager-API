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
router.post('/tasks/create', async (req, res) => {
    try{    
        console.log("HEY ARE YOU SEEING THIS " + req.body);
        // -- Get the project section ID using the project section name you got from the frontend. Remember the project section names are unique so there will never be a conflict. --
        let find_project_section_ID = await Project_section.findOne({
            where: {
                name: req.body.project_section_name
            }
        });

        // -- Create the task using the project section ID we got above --
        let new_task = await Task.create({
            project_ID: req.body.project_ID,
            name: req.body.task_name,
            description: req.body.task_description,
            due: req.body.task_due,
            project_section_ID: find_project_section_ID.id,
            // user_ID: req.body.user_ID
        });

        await new_task.save();


  

        
        res.status(201).send({ message: "You have successfully created a new task!" });
    } catch (e) {
        res.status(400).send({e: e.message})
        console.log("here is the error message when getting the list of news ", e)
    }
})


// -- Mark a task as complete --
router.post('/tasks/complete', async (req, res) => {
    try{    
        let marking_this_task = await Task.findOne({
            where: {
                id: req.body["task ID"]
            }
        });

        marking_this_task.complete = 1;
        await marking_this_task.save();


        

        
        res.status(201).send({ message: "You have successfully makred this task as complete!" });
    } catch (e) {
        res.status(400).send({e: e.message})
        console.log("here is the error message when getting the list of news ", e)
    }
})

// -- Delete a task --
router.post('/tasks/delete', async (req, res) => {
    try{    
        let marking_this_task = await Task.destroy({
            where: {
                id: req.body["task ID"]
            }
        });

        await marking_this_task.save();


        

        
        res.status(201).send({ message: "You have successfully deleted this task!" });
    } catch (e) {
        res.status(400).send({e: e.message})
        console.log("here is the error message when getting the list of news ", e)
    }
})








module.exports = router