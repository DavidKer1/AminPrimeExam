const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors')
require('dotenv').config({path:'.env'})

// Initialize server
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())


app.use('/', routes())



app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
})