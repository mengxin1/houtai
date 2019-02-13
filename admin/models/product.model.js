const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const moment = require('moment');
var schema = new mongoose.Schema({
    cateId: mongoose.Schema.ObjectId,
    type: String,
    name: String,
    price: Number,
    number: Number,
    keywords: String,
    size: String,
    UE: String,
    quality: String,
    date: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    }
}, {
    timestamps: {
        createdAt: 'date'
    }
});

schema.plugin(mongoosePaginate);

var Goods = mongoose.model('Goods', schema); // Model.paginate()

module.exports = Goods;