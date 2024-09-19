// request :request is a libraray that  allow our application  to send request to another services

// requset ki madath se i canrequest,get,post,delete etc requests to other services like customers,books

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const axios=require("axios");


// axios is a http library that allows us to make http requests to any address
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://aayushkaushik019:jcAhNI2KMCiyHv7d@cluster2.oybai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2")
    .then(() => {
        console.log('Mongodb connected successfully !!');
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
});

require("./Order");
const Order = mongoose.model("Order");

app.post("/order", (req, res) => {
    var newOrder = {
         // abhi jab run kara ise to postman mai to vo string mil ri ,jabki model mai humne object id , to type ko string se object m convert karna
        
        // CustomerID:req.body.CustomerID,
        // BookID:req.body.BookID,
        // initialDate:req.body.initialDate,
        // deliveryDate:req.body.deliveryDate
        CustomerID: new mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: new mongoose.Types.ObjectId(req.body.BookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    };

    var order = new Order(newOrder);

    order.save()
        .then(() => {
            console.log("Order created successfully");
            res.status(201).send("Order created successfully");
        })
        .catch((err) => {
            if (err) {
                console.error("Error saving the order:", err);
                res.status(500).send("Error creating order");
            }
        });
});


app.get("/order/:id",(req,res)=>{
    Order.findById(req.params.id).then((order)=>{
        if(order){
            axios.get("http://localhost:5555/customer/" + order.CustomerID).then((response)=>{
                // console.log(response);
                var orderObject={customerName:response.data.name,bookTitle: ""}

                axios.get("http://localhost:4545/book/" + order.BookID).then((response)=>{

                    orderObject.bookTitle=response.data.title
                    res.json(orderObject);
                })
            })
            // res.send("Quick response");
        }else{
            res.send("Invalid order");
        }
    })
})


// list all the customers
app.get("/orders",(req,res)=>{
    Order.find().then((orders)=>{
        res.json(orders);
    }).catch((err)=>{
        throw err;
    })
})

app.listen(7777, () => {
    console.log("Up and running! -- This is our Orders service");
});
       
      




// jcAhNI2KMCiyHv7d
// aayushkaushik019