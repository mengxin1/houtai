const mongoose = require('mongoose');
const User = require('../models/user.model');
const moment = require('moment');
const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
// const dateTime = moment.tz(Date.now(), "Asia/Shanghai").format('YYYY-MM-DD HH:mm:ss');
//添加
exports.create = function(req, res, next) {
    var user = new User(req.body);
    user.save().then(data => {
        res.json(data);
    });
};
//修改
exports.updata = function(req, res, next) {
    const id = req.params.id;
    User.findByIdAndUpdate(id, { $set: req.body }).then(data => {
        res.json(data);
    });
};
//删除
exports.remove = function(req, res, next) {
    const id = req.params.id;
    User.findByIdAndRemove(id, (err, data) => {
        res.json(data);
    });
};
//查找
exports.list = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var rows = req.body.limit ? req.body.limit : 10;
    var queryCondition = {}
    if (req.body.name && req.body.name.trim().length > 0) {
        name = req.body.name;
        queryCondition = {
            "name": new RegExp(name, 'i')
        };
    }
    User.paginate(queryCondition, { page: +page, limit: +rows }, function(err, result) {
        result.rows = result.docs;
        delete result.docs;
        res.json(result);
    });
};

exports.get = function(req, res, next) {
    const id = req.params.id;
    User.findById(id).then(data => {
        res.json(data);
    });
};