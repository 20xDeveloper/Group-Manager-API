// const mongoose = require('mongoose')
// const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Sequelize = require('sequelize')

const sequelize = require("../db/sequelize")


const Token = require("./token");

function currentDate() {
	var dateTime = require("node-datetime");
	var dt = dateTime.create();
    var formatted = dt.format("Y-m-d H:M:S");
    console.log("here is the value for formatted ", formatted)
	return formatted;
}

const eventsSchema = sequelize.define("Events",{
    title: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },

        createdAt: {
            type: Sequelize.DATE,
            defaultValue: currentDate() 
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: currentDate() 
        },
        firebaseImageUrl: {
            type: Sequelize.STRING,
            allowNull: true
        },
        eventURL: {
            type: Sequelize.TEXT,
            allowNull: false
        },
       
        // Coming soon
        // number_of_comments: {
        //     type: Sequelize.VIRTUAL
        // }
      
});


module.exports = eventsSchema