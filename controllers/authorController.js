var Author = require('../models/author');
var async = require('async');
var Book = require('../models/book');

// Display list of all authors
exports.author_list = (req, res, next) => {
    Author.find({})
    .sort([['family_name', 'ascending']])
    .exec((err, list_authors) => {
        if (err) {return next(err);}
        res.render('author_list', {title: 'Author List', author_list: list_authors});
    })
}

// Display detail page for a specific author
exports.author_detail = (req, res, next) => {
    async.parallel({
        author: (callback) => {
            Author.findById(req.params.id)
              .exec(callback)
        },
        authors_books: (callback) => {
          Book.find({ 'author': req.params.id },'title summary')
          .exec(callback)
        },
    }, (err, results) => {
        if (err) { return next(err); }
        if (results.author==null) {
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        res.render(
            'author_detail', 
            { 
                title: 'Author Detail', 
                author: results.author, 
                author_books: results.authors_books 
            } 
        );
    });
}

// Display author create form on GET
exports.author_create_get = (req, res) => {
    res.send('TO IMPLEMENT: Author create GET');
}

// Handle Author create on POST
exports.author_create_post = (req, res) => {
    res.send('TO IMPLEMENT: Author Create POST');
}

// Display Author delete form on GET
exports.author_delete_get = (req, res) => {
    res.send('TO IMPLEMENT: Author delete GET');
}

// Handle Authro delete on POST
exports.author_delete_post = (req, res) => {
    res.send('TO IMPLEMENT: Author delete POST');
}

// Display Author update form on GET
exports.author_update_get = (req, res) => {
    res.send('TO IMPLEMENT: Author update GET');
}

// Handle Author update on POST
exports.author_update_post = (req, res) => {
    res.send('TO IMPLEMENT: Author update POST');
}