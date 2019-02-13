const mongoose = require('mongoose');
const moment = require('moment');
var mongoosePaginate = require('mongoose-paginate');

var schema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    telphone: Number,
    subject: String,
    age: Number,
    sex: String,
    hobit: String,
    registerTime: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    }
}, {
    timestamps: {
        createdAt: 'registerTime'
    }
});
schema.plugin(mongoosePaginate);

var User = mongoose.model('users', schema);

module.exports = User;