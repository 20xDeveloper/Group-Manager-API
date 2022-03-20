
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

const taskSchema = sequelize.define("Task",{
    project_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        due: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        project_section_ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        project_section_ID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        complete: {
            type: Sequelize.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        // user_ID: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        // },
    },
    {
    timestamps: false

    });

module.exports = taskSchema