const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'bc5fbc1efc9628',
    database: 'heroku_4bd16e4f117e4bc',
    password: 'bb463698'
});

module.exports = pool.promise();

// IF YOU ARE USING SEQUELIZE YOU DON'T HAVE TO USE THE ABOVE. YOU DON'T EVEN HAVE TO USE THIS FILE