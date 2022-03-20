const express = require('express')
// const multer = require('multer')
// const sharp = require('sharp')
const User = require('../models/user')
const Events = require('../models/events')
const Comments = require('../models/comment') // I called it comments instead of comment is because comment is reserved for something else. It's predefined.

const Like = require('../models/like')
const Sequelize = require("./../db/sequelize");



// const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs') //used for hashing passwords
// const userUtils = require('../utils/userUtils');
const GeneralUtils = require('../utils/generalUtils');



const auth = require('../middleware/auth')
const { sendWelcomeEmail, resetPassword } = require('../emails/EmailSender')
const router = new express.Router()

// get all the news
router.get('/events', async (req, res) => {
    try{
        // Get all the news data
        let events = await Events.findAll({  order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['createdAt', 'DESC'], ]})

        
        
        res.status(201).send({ events })
    } catch (e) {
        res.status(400).send({e: e.message})
        console.log("here is the error message when getting the list of news ", e)
    }
})







module.exports = router