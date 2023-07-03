/* Name: Maria Macias
StudentId: 301290835
Date: July 4th 2023
File name: server/routes.js */
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');
const books = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', {
    title: 'Books',
    books: {
      Title: '',
      Genre: '',
      Price: '',
      Author: ''
    }
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  try {
    book.create({
      Title: req.body.title,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre,
      Description: req.body.title
    })
    res.redirect('/books')
  } catch(error) {
    console.log(error)
    res.redirect('/books/add')
  }

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
    book.findById(id, (err, bookToEdit) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
        //show the edit view
        res.render('books/details', {
          title: 'Books',
          books: bookToEdit
        });
      }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let id = req.params.id
  let updatedBook = books({
      "_id": id,
      "Title": req.body.title,
      "Author": req.body.author,
      "Genre": req.body.genre,
      "Price": req.body.price,
  });

  book.updateOne({_id: id}, updatedBook, (err) => {
      if(err) console.log(err);
      else res.redirect('/books'); // redirect to books list
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
   book.deleteOne({_id: id}, (err) => {
        if(err)
        {
          console.log(err);
          res.end(err);
        }
        else
        {
          // refresh the books list
          res.redirect('/books');
        }
    });
});


module.exports = router;
