var mongoose = require("mongoose"),
    materializedPlugin = require("mongoose-materialized");

var schema = new mongoose.Schema({
    text: { type: String },
    type: { type: String }
});

schema.plugin(materializedPlugin);

var Cate = mongoose.model("Cate", schema);
module.exports = Cate;