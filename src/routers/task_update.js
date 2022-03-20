const express = require('express')
// const multer = require('multer')
// const sharp = require('sharp')
const User = require('../models/user')
const Newsis = require('../models/news')
const Comments = require('../models/comment') // I called it comments instead of comment is because comment is reserved for something else. It's predefined.

const Like = require('../models/like')
const Project = require('../models/project');
const Task = require('../models/task');
const Task_update = require('../models/task_update');

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


function currentDate() {
	var dateTime = require("node-datetime");
	var dt = dateTime.create();
	var formatted = dt.format("Y-m-d");
	return formatted;
}


// -- Write an update or a question to a task. Like a comment on a blog. --
router.post('/task_update/create', async (req, res) => {
    try{    
        console.log("here is the value for the current date ", currentDate())
        let new_task_update = await Task_update.create({
            description: req.body.description,
            user_ID: req.body.user_ID,
            task_ID: req.body.task_ID,
            date: currentDate()
        });

        await new_task_update.save();
  

        
        res.status(201).send({ message: "You have successfully submitted your update/question for this task!" });
    } catch (e) {
        res.status(400).send({e: e.message})
        console.log("here is the error message when getting the list of news ", e)
    }
})


// -- Get the list of questions and updates for a task using the task ID you get from the user. --
router.post('/task_update', async (req, res) => {
    try{    
        console.log("here is the data the user sent us ", req.body); // When you use the plus operator to concatenate it makes the variable a string which will display [object, object]. That is why Erik Gurney used coma. Now i understand.

        let all_task_updates = await Task_update.findAll({
            where: {
                task_ID: req.body.task_ID
            }
        });

        let list_of_task_updates = [];

        // -- Loop through the tasks and attach the username to the list of tasks for it to be easier to display in the front end --
        for(let task of all_task_updates){

            let user = await User.findOne({where: {
                id: task.user_ID
            }});

            task.user_data = user;

            list_of_task_updates.push(task);

        }
  
        console.log("here is the value for the list of task and updates ",  list_of_task_updates[0].user_data)
        
        res.status(201).send({ list_of_task_updates });
    } catch (e) {
        res.status(400).send({e: e.message})
        console.log("here is the error message when getting the list of news ", e)
    }
})










module.exports = router