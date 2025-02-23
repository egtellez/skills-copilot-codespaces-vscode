// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Create web server
const app = express();

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up static files
app.use(express.static('public'));

// Set up comments
const comments = require('./comments.json');

// Set up routes
app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
    comments.push(req.body);
    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
        if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
        }
        res.json(comments);
    });
    });

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});