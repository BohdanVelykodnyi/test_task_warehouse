const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    key: {type: String, required: true, unique: true},
    warehouse: {type: Number, required: true, },
});

module.exports = model('Keys', schema);