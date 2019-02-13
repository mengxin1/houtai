const mongoose = require('mongoose');
const News_comment = require('../models/news_comment.model');

exports.create = function(req, res, next) {
    var news_comment = new News_comment(req.body);
    news_comment.save().then(data => {
        res.json(data);
    });
    return false;
};
exports.update = function(req, res, next) {
    const id = req.params.id;
    News_comment.findByIdAndUpdate(id, { $set: req.body }).then(data => {
        res.json(data);
    });
};
exports.remove = function(req, res, next) {
    const id = req.params.id;
    News_comment.findByIdAndRemove(id, (err, data) => {
        res.json(data);
    });
};
exports.list = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var rows = req.body.rows ? req.body.rows : 10;

    var queryCondition = {};

    if (req.body.name && req.body.name.trim().length > 0) {
        name = req.body.name;
        queryCondition = {
            name: new RegExp(name, 'i')
        };
    }

    News_comment.paginate(queryCondition, { page: +page, limit: +rows }, function(err, result) {
        result.rows = result.docs;
        delete result.docs;
        res.json(result);
    });
};

exports.get = function(req, res, next) {
    const id = req.params.id;
    News_comment.findById(id).then(data => {
        res.json(data);
    });
};