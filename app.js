require('dotenv').config();
const PORT = process.env.SERVER_PORT || 3000;

const express = require('express');
const app = express();

const expressSession = require('express-session');
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {  }
}));

const cors = require('cors');
app.use(cors());

app.use(express.json());

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: false}));

// Connect to Database
require('./app/configs/database');

app.use('/', require('./app/routers/api/index'));


// Path html
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Listen
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


module.exports = app;
