// const mongoose = require('mongoose')

// mongoose.connect(process.env.MONGODB_URL, { //see this is how we access a environment variable from config directory and dev.env. i don't know if the directory and file name has to be called those. dev.env and config directory. Maybe look into it.
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// })

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'sys',
//     password: 'root'
// });

// module.exports = pool.promise();


// IF YOU WANT TO USE NO SQL DATABASE THEN USE THE CODE ABOVE. I SUGGEST YOU USE MYSQL BECAUSE IT'S MUCH MORE BETTER


const Sequelize = require("sequelize");
const sequelizeTransforms = require('sequelize-transforms');


const sequelize = new Sequelize('heroku_4bd16e4f117e4bc', 'bc5fbc1efc9628', 'bb463698', {
    host: 'us-cdbr-iron-east-04.cleardb.net',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  });

  sequelize.sync().then((result) => {
    return result
  })
  
  sequelizeTransforms(sequelize);

  module.exports = sequelize;