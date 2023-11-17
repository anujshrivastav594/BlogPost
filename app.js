const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view-engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// mongoose.connect("mongodb://127.0.0.1:27017/BlogPostDB");
mongoose.connect("mongodb+srv://admin-anuj:Apfor%40594@cluster0.jvxhf70.mongodb.net/BlogPostDB");

const blogSchema = new mongoose.Schema({
    title: String,
    content: String
 })

const Blog = mongoose.model("Blog", blogSchema);

// var posts = [];

const homeStartingContent = "I am a third-year undergraduate student pursuing a Bachelor's degree at the prestigious Indian Institute of Technology (IIT) Kharagpur." +
"Proficient in Java, and knowledgeable in C and C++, I have a solid grasp of data structures and algorithms. My passion for technology extends into the realms of machine learning, deep learning, and artificial intelligence, where I constantly seek opportunities to expand my knowledge and skills." +
"In the summer of 2023, I had the privilege of interning at Saint Petersburg Electrotechnical University (LETI) in Russia. During this internship, I made significant contributions to a research paper focusing on teeth segmentation. This research project was conducted under the expert supervision of Professors Dmitry Kaplun and Aleksander Sinitca.";

const aboutContent = "I'm currently in 3rd year of my Bachelor degree at Indian Institute of Technology Kharagpur." + 
"I'm specializing in full-stack development. With expertise in HTML, CSS, JavaScript, Bootstrap, and ReactJS for front-end development, I am proficient in NodeJS, Express, EJS, API, MongoDB, Mongoose, SQL, and JavaScript for back-end development. As a full-stack development enthusiast, I am well-equipped to handle the entire web development process." + 
"Apart from this, I also have hands-on experience in Python and its various libraries such as NumPy, Pandas, and Scikit-learn, and have a keen interest in machine learning and deep learning. Currently, I am pursuing a remote research internship at IIT Hyderabad and and had completed summer intern in 2023 at Saint Petersburg Electrotechnical University LETI, Russia." + 
"I am also currently learning Java language and had learned earlier C language as part of my college curriculum and am eager to continue expanding my knowledge of this programming language. I am constantly learning and seeking new challenges, and I am eager to continue growing my skill set and contributing to the technology industry.";

const contactContent = "Contact me at mail : anujshrivastav594@kgpian.iitkgp.ac.in";


app.get("/", function(req, res) {

    Blog.find().then((foundItems) => { 
        res.render("home.ejs", {
            home: homeStartingContent,
            posts: foundItems
        });
    })  
    
})
app.get("/contact", function(req, res) {
    res.render("contact.ejs", {
        contact: contactContent
    });
})
app.get("/about", function(req, res) {
    res.render("about.ejs", {
        about: aboutContent
    });
})
app.get("/compose", function(req, res) {
    res.render("compose.ejs", {
        
    });
})


app.post("/compose", function(req, res) {
    const post = new Blog({
        title : req.body.postTitle,
        content : req.body.postBody
    });
    // posts.push(post);
    post.save();
    res.redirect("/");
})

app.get("/posts/:link", function(req, res) {
    // console.log(req.params.link);
    
        // posts.forEach(function(post) {
        //     if(_.lowerCase([string=req.params.link]) === _.lowerCase(string=post.title)) {
        //         // console.log("Match found!");
        //         res.render("post.ejs", {
        //          heading: post.title,
        //          para: post.content
        //         })
        //     } else {
        //         console.log("Not a Match!");
        //     }
        // })    

        Blog.find().then((foundItems) => {
            // console.log(foundItems);
        
            foundItems.forEach(function(foundItem) {
                if(_.lowerCase([string=req.params.link]) === _.lowerCase(string=foundItem.title)) {
                    // console.log("Match found!");
                    res.render("post.ejs", {
                     heading: foundItem.title,
                     para: foundItem.content
                    })
                } else {
                    console.log("Not a Match!");
                }
            }) 
            
            })   
        
})

app.post("/delete", function(req, res) {
    const postPage = req.body.remove;

    Blog.deleteOne({ title: postPage }).then(function(){
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
    res.redirect("/");

})

app.listen(3000, function() {
    console.log("Server is running on port 3000.")
})