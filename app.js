const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();

//Connect to db
mongoose.connect(process.env.DB_URI, { dbName: 'scoreboard', useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to db');
    }
});
mongoose.set('useCreateIndex', true);

// Import of other modules
const users = require('./routes/user');

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', users);


//Routes
app.get('/', (req, res) => {
    res.send('It is Working');
});


//Server
app.listen(3000, () => console.log('Server running on port 3000'));