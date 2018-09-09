const goose = require("mongoose");


goose.connect("mongodb://localhost:27017/MessageDashboard", {useNewUrlParser: true},(errs)=> console.log(errs?errs:"db MessageDash"));

const CommentSchema = new goose.Schema({
    name:{
        type: String,
        required: true,
        minlength: [2, "yo give a larger name"]
    },
    content:{
        type:String,
        required:true,
        minlength:[5, "Longer Comment"]
    }
},{timestamps:true});

const MessageSchema = new goose.Schema({
    name:{
        type: String,
        required: true,
        minlength: [2, "yo give a larger name"]
    },
    content:{
        type:String,
        required: true,
        minlength:[5, "Longer message!"],
    },
    comment : [CommentSchema]
},{timestamps:true});

// const UserSchema = new goose.Schema({
//     name: {
//         type: String,
//         required: true,
//         minlength: [2, "yo give a larger name"]
//     },
//    Message:[MessageSchema],
//    Comment :[CommentSchema]

// },{timestamps:true});

// const User = goose.model('User', UserSchema);
const Message = goose.model('Message', MessageSchema);
const Comment = goose.model('Comment', CommentSchema)

module.exports = {Message,Comment};