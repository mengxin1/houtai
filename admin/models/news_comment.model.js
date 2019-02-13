const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const moment = require('moment');
var schema = new mongoose.Schema({
    title: String,
    content: String,
    name: String,
    tags: String,
    time: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    updateTime: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    }
}, {
    timestamps: {
        createdAt: 'time',
        updatedAt: 'updateTime'
    }
});
schema.plugin(mongoosePaginate);

var News_comment = mongoose.model('News_comment', schema);
module.exports = News_comment;