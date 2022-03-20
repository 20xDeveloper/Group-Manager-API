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
var dateFormat = require('dateformat');



const Sequelize = require("./../db/sequelize");



// const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs') //used for hashing passwords
// const userUtils = require('../utils/userUtils');
const GeneralUtils = require('../utils/generalUtils');



const auth = require('../middleware/auth')
const {
    sendWelcomeEmail,
    resetPassword
} = require('../emails/EmailSender')
const router = new express.Router()


// This route file is used to handle BOTH projects and task related actions. So, if you are manipulating those two tables the code
// should go in this file. 



// -- get all projects and tasks --
router.get('/assignments', async (req, res) => {
    try {
        // Get all the projects and tasks
        let projects = await Project.findAll();
        let tasks = await Task.findAll({
            where: {
                complete: 0
            }
        });

        console.log("here is the value for the projects " + projects);




        res.status(201).send({
            projects,
            tasks
        })
    } catch (e) {
        res.status(400).send({
            e: e.message
        })
        console.log("here is the error message when getting the list of news ", e)
    }
})


// -- Get a certain project using the project ID --
router.post('/assignments/project', async (req, res) => {
    try {
        // Get a certain project using the project ID the front end passed to us
        let project = await Project.findOne({
            where: {
                id: req.body['project ID']
            }
        });


        console.log("we made it " + project.name);


        res.status(201).send({
            project
        })
    } catch (e) {
        res.status(400).send({
            e: e.message
        })
        console.log("here is the error message when getting the list of news ", e)
    }
})


// -- Get the list of tasks with their section name for a project --
router.post('/assignments/project/tasks', async (req, res) => {
    try {

        console.log("here is the value for the user_ID " + req.body.user_ID);
        // Get all tasks for the project we are viewing
        let tasks = await Task.findAll({
            where: {
                project_ID: req.body.projectID,
                complete: 0
                // user_ID: req.body.user_ID
            }
        });

        // Get all the project sections for this project
        let project_sections = await Project_section.findAll({
            where: {
                project_ID: req.body.projectID
            }
        });

        // Initialize the list of tasks with their section name
        let list_of_sections_with_tasks = [];

        // Create the list of tasks with their section name
        for (const project_section of project_sections) {
            section_with_tasks = {};
            section_with_tasks['section name'] = project_section.name // i'm using array notation to access that property called 'section name'
            section_with_tasks['project ID'] = req.body.projectID

            // filter out what ever is not the section ID that we are currently iterating. This will help us get all the tasks for a certain section.
            section_with_tasks.tasks = await tasks.filter((task) => {
                return task.project_section_ID === project_section.id
            });

            await list_of_sections_with_tasks.push(section_with_tasks);

        }



        console.log("here is the value for the list of projects ", list_of_sections_with_tasks);



        res.status(201).send({
            list_of_sections_with_tasks,
            project_sections
        })
    } catch (e) {
        res.status(400).send({
            e: e.message
        })
        console.log("here is the error message when getting the list of news ", e)
    }
})

router.get('/assignments/completed/tasks', async (req, res) => {
    try {
        let completed_tasks = await Task.findAll({
            where: {
                complete: 1
            }
        })



        res.status(201).send({
            completed_tasks
        })
    } catch (e) {
        res.status(400).send({
            e: e.message
        })
        console.log("here is the error message when getting the list of news ", e)
    }
})

router.get('/assignments/today/tasks', async (req, res) => {
    try {
        var now = new Date();

        let todays_date = dateFormat(now, "mmmm d");
        console.log("here is the value for todays_date variable ", todays_date);

        let todays_list_of_tasks = await Task.findAll({
            where: {
                due: todays_date
            }
        })



        res.status(201).send({
            todays_list_of_tasks
        })
    } catch (e) {
        res.status(400).send({
            e: e.message
        })
        console.log("here is the error message when getting the list of news ", e)
    }
})











module.exports = router