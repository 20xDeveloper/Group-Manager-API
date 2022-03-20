
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Sequelize = require('sequelize')

const sequelize = require("../db/sequelize")


const Token = require("./token");

function currentDate() {
	var dateTime = require("node-datetime");
	var dt = dateTime.create();
	var formatted = dt.format("Y-m-d H:M:S");
	return formatted;
}

const projectSchema = sequelize.define("Project",{
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        firebaseImageUrl: {
            type: Sequelize.STRING,
            allowNull: true
        }
      
    }, {
    timestamps: false

    });

module.exports = projectSchema