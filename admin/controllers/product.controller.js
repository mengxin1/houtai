const mongoose = require('mongoose');
const Goods = require('../models/product.model');

exports.create = function(req, res, next) {
    var goods = new Goods(req.body);
    goods.save().then(data => {
        res.json(data);
    });
};

exports.update = function(req, res, next) {
    const id = req.params.id;
    Goods.findByIdAndUpdate(id, { $set: req.body }).then(data => {
        res.json(data);
    });
};

exports.remove = function(req, res, next) {
    const id = req.params.id;

    Goods.findByIdAndRemove(id, (err, data) => {
        res.json(data);
    });
};

exports.list = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var rows = req.body.rows ? req.body.rows : 10;
    var queryCondition = {};
    var cateId = req.body.cateId;
    if (cateId == undefined) {
        res.json({ message: 'error message' });
        return;
    } else {
        queryCondition = {
            cateId: cateId
        }
    }


    if (req.body.title && req.body.title.trim().length > 0) {
        title = req.body.title;
        queryCondition = Object.assign(queryCondition, {
            title: new RegExp(title, 'i')
        });
    }

    Goods.paginate(queryCondition, { page: +page, limit: +rows }, function(err, result) {
        result.rows = result.docs;
        delete result.docs;
        res.json(result);
    });
};

exports.get = function(req, res, next) {
    const id = req.params.id;
    Goods.findById(id).then(data => {
        res.json(data);
    });
};