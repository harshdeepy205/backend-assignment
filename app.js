const express=require('express');
const app=express();
const cors=require('cors');
const PORT=5000
const mongoose=require('mongoose');
const {MONGOURI}=require('./key');


app.use(cors())

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log("Connected With MongoDb")
})

mongoose.connection.on('error',(err)=>{
    console.log("Error in Connection",err)
})

app.use(express.json())

require('./models/borrowerInfo.js');
app.use(require('./routes/index'))


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})