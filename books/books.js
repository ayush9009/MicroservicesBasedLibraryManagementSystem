const bodyParser = require('body-parser');
//  body parser is used to save data from form or request 
const express=require('express');
const app=express();


app.use(bodyParser.json()); // jo data receive horve json format mai hove , so
// body parser (The middleware) parses this JSON string and converts it into a JavaScript object 

const mongoose=require("mongoose");

// import our model
require('./Book');
const Book=mongoose.model("Book");

// connect our application to databse
// mongodb+srv://aayushkaushik019:<db_password>@cluster0.9q0np.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect("mongodb+srv://aayushkaushik019:wSRxnYGOqf9ej5oC@cluster0.9q0np.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('Mongodb connected successfully !!');
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
});

app.get('/',(req,res)=>{
    res.send("This is the books service !");
})

// create functinality
app.post("/book",(req,res)=>{
    // console.log(req.body);
    // res.send("Testing our book route");

    var newBook={
        title:req.body.title,
        author:req.body.author,
        numberPages:req.body.numberPages,
        publisher:req.body.publisher
    }
    
    var book=new Book(newBook);  //model ka new instance create kara aur usme newly create book pass kar di

    book.save().then(()=>{
        console.log("New book created!");
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
    res.send("A new book created successfully!!");
})


// functionallity to list all the books
app.get("/books",(req,res)=>{
    Book.find().then((books)=>{
        res.send(books)
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})


// functionality to list particular book or single book
app.get("/book/:id",(req,res)=>{
    Book.findById(req.params.id).then((book)=>{
        if(book){
            res.send(book)
        }else{
            res.sendStatus(404);
        }
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})


// functinality to delete a product

app.delete("/book/:id",(req,res)=>{
    Book.findOneAndDelete(req.params.id).then(()=>{
        res.send("Book deleted successfully!! ");
    }).catch(err=>{                 //ye jo then ,catch hai ise hi promises kahve
        if(err){
            throw err;
        }
    })
})

app.listen(4545,()=>{
    console.log(`Up and running! -- This is our Books service`);
})


// mLab is a cloud platform to host our database

// aayushkaushik019
// wSRxnYGOqf9ej5oC

// npm install mongodb


// mongodb+srv://aayushkaushik019:wSRxnYGOqf9ej5oC@cluster0.9q0np.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// body parser isa midlleware in node.js that is commonly
// used in apis to handle incoming request bodies p
// particulary in web applications.

// for example when we make a post request and use 
// bodyParser (built in middleare) the content u post like json or form data 
// is automatically parsed by the mmdllware and made 
// avaible in req.body .this allows us to easily 
// acccess and manipulate posted data within ur route handler 
// using req.body