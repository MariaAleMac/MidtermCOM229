/* Name: Maria Macias
StudentId: 301290835
Date: July 4th 2023
File name: server/index.js */
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Maria Macias - 301290835',
    description: 'Welcome to the Favourite Book List App. Midterm COMP229.'
   });
});

module.exports = router;
