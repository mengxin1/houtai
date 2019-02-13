const mongoose = require('mongoose');
const moment = require('moment');
var mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    cateId: mongoose.Schema.ObjectId,
    title: String,
    content: String,
    author: String,
    registerTime: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    updateTime: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    }
}, {
    timestamps: {
        createdAt: 'registerTime',
        updatedAt: 'updateTime'
    }
});
schema.plugin(mongoosePaginate);

var News = mongoose.model('News', schema); // Model.paginate()

module.exports = News;