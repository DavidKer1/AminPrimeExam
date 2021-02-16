const Sequelize = require('sequelize')
require('dotenv').config({path:'.env'})

module.exports = new Sequelize('loginExam', '', '',{
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres'
})