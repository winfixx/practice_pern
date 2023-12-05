const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME, // название бд
    process.env.DB_USER, // я
    process.env.DB_PASSWORD, // пароль
    {
        dialect: 'postgres', // название субд
        host: process.env.DB_HOST, // хост
        port: process.env.DB_PORT // порт
    }
)