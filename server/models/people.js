/**
 * Created by MUNAZIR AHSAN on 14-04-2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PeopleSchema = new Schema({
    name: {type: number, required: true},

});


module.exports = mongoose.model('Service', ServiceSchema);
