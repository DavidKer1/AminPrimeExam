const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const flash = require('connect-flash');
const routes = require('./routes');

require('dotenv').config({path:'.env'})

// Configuration and models of DB
const db = require('./config/db')

db.sync().then(() => console.log('DB Connected')).catch(err => console.log(err))

// Initialize server
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

app.use(flash())

app.use('/', routes())



app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
})