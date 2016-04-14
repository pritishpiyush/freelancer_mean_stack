/**
 * Created by MUNAZIR AHSAN on 13-04-2016.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
    name: {type: String, required: true, index: {unique: true}},
    created_at: {type: Date, default: Date.now()}
});


module.exports = mongoose.model('Service', ServiceSchema);