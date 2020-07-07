const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose = require("mongoose");
//TEXT FROM BACK END TO FRONT END
const homeStartingContent = "Hi there! Welcome to my personal site where you can find information about me and my blogs, if you want to subscribe to my newsletter go to http://polar-brushlands-97635.herokuapp.com/. GO NOW! If you want to know about me and my services go to About us. Go to contact me to get in touch with me. In this page you will find all my articles. If you are interested in technology, tech companies, programming, coffee and awesome content check my posts. Post are uploaded every Saturday!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Connection to our MongoD Atlas
mongoose.connect("mongodb+srv://admin-josue:Test123@cluster0.usnm4.mongodb.net/blogsite?retryWrites=true&w=majority",{useUnifiedTopology : true});

const postSchema = mongoose.Schema({
  title : String,
  content : String
})
const Post = mongoose.model( "Post", postSchema);

app.get("/",function(req,res){
  Post.find(function(e,posts){
    if(!e){
      res.render("home",{
        pageTitle : "Welcome",
        posts : posts,
        homeStartingContent : homeStartingContent })
    }else{console.log(e);}
  })


});
app.get("/about",function(req,res){
  res.render("about",{pageTitle : "About Me", aboutContent : aboutContent })
});

app.get("/contact",function(req,res){
  res.render("contact",{ pageTitle :"Contact Me" })
})

app.get("/compose",function(req,res){
  res.render("compose",{pageTitle : "Compose"})
})

app.get("/posts/:post",function(req,res){
  // const requestedTitle = lodash.lowerCase(req.params.post)
  const requestedTitle = req.params.post
  Post.find({_id : requestedTitle},function(e,post){
    if(!e){
    res.render("post" , {
      pageTitle :post[0].title,
      postTitle: post[0].title,
      postContent: post[0].content
    })
  }else{res.render("pagenotfound")}
  })
})

app.post("/compose",function(req,res){
  const post = new Post({
    title : req.body.postTitle,
    content : req.body.postBody
  })
  post.save();
  res.redirect("/")
})

app.listen(8080,function(){
  console.log("Page running on port 8080");
});
