module.exports = {
    home:home,
    messages:Messages,
    comments:Comments
}

const {Message,Comment} = require("./model.js");

function home(req,res){
    console.log("hit root route");
    Message.find({}, function(errs,data){
        if(errs){
            console.log("Home errs");
            console.log(errs);    
        }else{
            console.log("Home data");
            console.log(data); 
            console.log(data.comment);
            
        }
        res.render("index", {data:data.reverse(), cmt: data.comment});
    })
}

function Messages(req,res){
    console.log("hit message route");
    console.log(req.body);
    // var newMsg = new Message({name: req.body.Msgname},{content: req.body.msgtxt});
    var newMsg = new Message()
    newMsg.name = req.body.Msgname
    newMsg.content = req.body.msgtxt
    // Message.create({Msgname: req.body.Msgname, msgtxt : req.body.msgtxt}, function(errs,data){
    newMsg.save(function(errs,data){
        if(errs){
            console.log("message errs");
            console.log(errs);
            for(var key in errs.errors){
                console.log(errs.errors[key].message);
                req.flash('message', errs.errors[key].message);
            }
            res.redirect('/');
            
        }else{
            console.log("message results");
            console.log(data);     
            res.redirect("/"); 
        }
    })
}

function Comments(req,res){
    console.log("hit comment route");
    console.log(req.body.msgid);
    
    var newCmt = new Comment()
    newCmt.name = req.body.Cmtname
    newCmt.content = req.body.cmtxt
    // Comment.create(req.body, function (errs,data) {
    newCmt.save(function(errs,data){
        if(errs){
            console.log("errs");
            console.log(errs);
            for(var key in errs.errors){
                console.log(errs.errors[key].message);
                
                req.flash('comment', errs.errors[key].message);
            }
            res.redirect('/');
        }else{
            console.log("data");
            console.log(data);
            Message.update({_id : req.body.msgid}, {$push : {comment : data}}, function (errs,data) {
                if(errs){
                    console.log("comment error")
                    console.log(errs);
                    for(var key in errs.errors){
                        console.log(errs.errors[key].message);
                        
                        req.flash('comment', errs.errors[key].message);
                    }
                    res.redirect('/');
                }else{
                    console.log("comment results");
                    console.log(data);
                    
                }                  
            })
            res.redirect('/');
        }
    })
}