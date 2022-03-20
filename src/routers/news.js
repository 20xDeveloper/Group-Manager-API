const express = require('express')
// const multer = require('multer')
// const sharp = require('sharp')
const User = require('../models/user')
const Newsis = require('../models/news')
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
router.get('/newsis', async (req, res) => {
    try{
        // Get all the news data
        let newsis = await Newsis.findAll({  order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['createdAt', 'DESC'], ]})

        
        
        res.status(201).send({ newsis })
    } catch (e) {
        res.status(400).send({e: e.message})
        console.log("here is the error message when getting the list of news ", e)
    }
})


// like or dislike a news
router.post('/newsis/like_or_dislike', async (req, res) => {
    try{
    

      // Check if we already liked or disliked this news as this user
      let did_we_already_liked_or_disliked_as_this_user = await Like.findOne({
          where: {
              user_ID: req.body.user_ID,
              news_ID: req.body.news_ID
          }
      })


      // check if we already liked or disliked this post and find out how to update the database table accordingly using a switch case statement
      if(did_we_already_liked_or_disliked_as_this_user){

        switch (did_we_already_liked_or_disliked_as_this_user.liked) {
                case true:
                did_we_already_liked_or_disliked_as_this_user.liked = 0
                did_we_already_liked_or_disliked_as_this_user.icon_color = "white"
                 did_we_already_liked_or_disliked_as_this_user.save() // I removed await because it's making my app slow. it can be synchronous code if it wants. this part wont matter
                break;
                case false:
                did_we_already_liked_or_disliked_as_this_user.liked = 1
                did_we_already_liked_or_disliked_as_this_user.icon_color = "brown"

                 did_we_already_liked_or_disliked_as_this_user.save() // I removed await because it's making my app slow. it can be synchronous code if it wants. this part wont matter
                break;
                default:
                // did_we_already_liked_or_disliked_as_this_user.liked = 1
                // await did_we_already_liked_or_disliked_as_this_user.save()
            }

        }else{

            // Check if we are liking or disliking since a record doesn't exist in the database table. So, we are going to create a new one
            // if(req.body.are_we_liking_or_disliking === "liked"){
                let liked_this_news_as_this_user = await Like.create({
                    user_ID: req.body.user_ID,
                    news_ID: req.body.news_ID,
                    liked: 1,
                    icon_color: "brown"
                })

                liked_this_news_as_this_user.save() // I removed await because it's making my app slow. it can be synchronous code if it wants. this part wont matter. By the time it's done saving im pretty sure we will start getting newsis
            // }

            // if(req.body.are_we_liking_or_disliking === "disliked"){
            //     let liked_this_news_as_this_user = await Like.create({
            //         user_ID: req.body.user_ID,
            //         news_ID: req.body.news_ID,
            //         liked: 0
            //     })

            //     await liked_this_news_as_this_user.save()
            // }


        }
        
        // Get the updated list of news with the new likes and dislikes for that news post
        // I made this because I don't want to send multiple request in the front end which will make the app slower. Also, didn't want to rewrite the code so put it in a utils class file to keep everything maintainable
        let updated_newsis = await GeneralUtils.get_newsis(req.body.user_ID)

        res.send({updated_newsis}) // ES6 object destructuring syntax
      
    } catch (e) {
        res.status(400).send({e: e.message})
        console.log("here is the error message when getting posting a news ", e)
    }
})

// post a news
router.post('/newsis/post-news', async (req, res) => {
    try{
        // Create the new News
        let create_news = await Newsis.create({
            description: req.body.news_description,
            userID: req.body.userID,
            image: req.body.image
        })
        await create_news.save()

        // Create a new Like record in the Like table to let the front end know which color does the icon for like and comment needs to be. It's going to be white and false as you can see below.
        let liked_this_news_as_this_user = await Like.create({
            user_ID: req.body.userID,
            news_ID: create_news.id,
            liked: 0,
            icon_color: "white"
        })

        liked_this_news_as_this_user.save() 

        // Get the new updated list of news and return it back to the user
        // let updated_newsis = await GeneralUtils.get_newsis(req.body.userID)

        
        res.status(201).send({ message: "You have successfully posted a news!" })
    } catch (e) {
        res.status(400).send({e: e.message})
        console.log("here is the error message when getting posting a news ", e)
    }
})




module.exports = router