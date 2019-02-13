const mongoose = require("mongoose");
const Cate = require("../models/cate.model");
//增加
exports.creat = function(req, res, nest) {
    var cate = new Cate(req.body);
    cate.save().then(data => {
        res.json(data);

    });
};
//修改
exports.update = function(req, res, next) {
    const id = req.params.id;
    Cate.findByIdAndUpdate(id, { $set: req.body }).then(data => {
        res.json(data);
    });
};

function reverseTree(data, pid) {
    var results = [],
        temp;
    var data = JSON.parse(JSON.stringify(data)); //防止和数据模型有关系
    for (var i in data) {
        if (data[i].parentId === pid) {
            results.push(data[i]);
            temp = reverseTree(data, data[i]._id);
            if (temp.length > 0) {
                data[i].children = temp;
            }
        }
    }
    return results;
}

exports.remove = function(req, res, next) {
    const id = req.params.id;
    var ids = [];
    Cate.findOne({ _id: id }, function(err, doc) {
        ids = [doc._id];
        doc.getChildren().then(function(docs) {
            for (var i = 0; i < docs.length; i++) {
                ids.push(docs[i]._id);
            }
            Cate.remove({ _id: { $in: ids } }).then(data => {
                res.json({ 'message': 'delete ok' });
            });
        });
    });
};
exports.list = function(req, res, next) {
    var type = req.params.type || 1;
    Cate.find({ type: type }, function(err, data) {
        var rpTree = reverseTree(data, null);
        res.json(rpTree);
    });

};
exports.get = function(req, res, next) {
    const id = req.params.id;
    Cate.findById(id).then(data => {
        res.json(data);
    });
};