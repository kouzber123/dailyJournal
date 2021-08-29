const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = [];


const aboutContent = "On this website you can post anon content ;)";
const contactContent = "Contact me at ... ;)";
//homepage
app.get('/', (req, res)=>{

  res.render("home",{posts: posts});
});

//about us page
app.get("/about", (req, res)=>{
  res.render("about", {text: aboutContent});
});

//contact us page
app.get("/contact", (req, res)=>{
  res.render("contact", {text: contactContent});
});

//compose page
app.get("/compose", (req, res)=>{
  res.render("compose");
});

//create dynamic uris
app.get('/posts/:post', (req, res)=>{

  const param =_.lowerCase(req.params.post);
  posts.forEach(post => {

    const title =_.lowerCase(post.title);
   if(title === param){
    res.render("post",{post: post.title, body: post.body});
   };
 });  
});

//get data from compsoe input
app.post("/compose", (req, res)=>{
  const post = {
    title: req.body.postTitle,
    body: req.body.postText
  };
  posts.push(post);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
