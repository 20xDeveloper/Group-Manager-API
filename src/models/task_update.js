const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Sequelize = require('sequelize')

const sequelize = require("../db/sequelize")


const Token = require("./token");

function currentDate() {
    var dateTime = require("node-datetime");
    var dt = dateTime.create();
    var formatted = dt.format("Y-m-d");
    return formatted;
}

const task_update_schema = sequelize.define("Task_update", {
    // id: {
    //     type: Sequelize.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true
    // },

    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    task_ID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    user_ID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: currentDate()
    },
    user_data: {
        type: Sequelize.VIRTUAL
    },
}, {
    timestamps: false

});

module.exports = task_update_schema