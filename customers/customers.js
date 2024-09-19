const express=require("express");
const app=express();
const bodyParser = require('body-parser');
const mongoose=require("mongoose");


app.use(bodyParser.json());

mongoose.connect("mongodb+srv://aayushkaushik019:8uSxhHIvRNaB8poO@cluster1.pebdu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
    .then(() => {
        console.log('Mongodb connected successfully !!');
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
});

// load our model
require("./Customer")
const Customer=mongoose.model("Customer");


app.post("/customer",(req,res)=>{
    var newCustomer={
        name:req.body.name,
        age:req.body.age,
        address:req.body.address
    }

    var customer=new Customer(newCustomer);

    customer.save().then(()=>{
        res.send("Customer created");
    }).catch((err)=>{
        throw err;
    })
})

// list all the customers
app.get("/customers",(req,res)=>{
    Customer.find().then((customers)=>{
        res.json(customers);
    }).catch((err)=>{
        throw err;
    })
})


app.get("/customer/:id",(req,res)=>{
    Customer.findById(req.params.id).then((customer)=>{
        if(customer){
            res.json(customer)
        }else{
            res.send("Invalid ID");
        }
    }).catch((err)=>{
        throw err;
    })
})

app.delete("/customer/:id",(req,res)=>{
    Customer.findOneAndDelete(req.params.id).then(()=>{
        res.send("Customer deleted successfully!! ");
    }).catch(err=>{                 //ye jo then ,catch hai ise hi promises kahve
        if(err){
            throw err;
        }
    })
})


app.listen(5555,()=>{
    console.log("Up and running! -- This is our Customers service")
})



// aayushkaushik019csls

// 8uSxhHIvRNaB8poO


