const mongoose = require('mongoose');

const borrowsersList=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    load_id:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    loan_amount:{
        type:Number,
        required:true
    },
    amount_paid:{
        type:Number,
        required:true
    }
})

mongoose.model('BorrowersList',borrowsersList);