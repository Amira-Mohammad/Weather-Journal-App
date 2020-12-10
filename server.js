// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

app = express();
app.use(cors())
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;

const server = app.listen(port , listeningFunc)


function listeningFunc(){
    console.log(`your app is running now on port ${port}`)
}

/// get function 
app.get('/getAll', (request, response) => {
    response.send(projectData).status(200).end();
});


/// post function

app.post('/postData', (req, res) => {
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content
    };
    res.send(projectData).status(200).end();
})


