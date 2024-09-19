const mongoose=require("mongoose");

mongoose.model("Order",{
    CustomerID:{
        // this will hold or tellus customer identity
        type:mongoose.SchemaTypes.ObjectId,  //model mai har cheez ka type dena pade ,to id ka is trah yaha type dena pade
        required:true
    },
    BookID:{
        // that will tell us which book customer will got in our library
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    },
    initialDate:{
        // tell us on which date customer get the book
        type:Date,
        required:true
    },
    deliveryDate:{
        // last date on which customer returned the book to the library
        type:Date,
        required:true
    }
})