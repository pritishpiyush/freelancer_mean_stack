/**
 * Created by MUNAZIR AHSAN on 21-04-2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema ({
    comment: {type: String, required: true},
    user: {type: String, required: true},
    created_at: {type: Date, default: Date.now()}



});



module.exports = mongoose.model('Job', JobSchema);
