const express=require('express');
const router=express.Router();
const cors=require('cors');
const mongoose=require('mongoose');
const BorrowersList=mongoose.model('BorrowersList');
const data=require('../data');


router.post('/borrowerentry',(req,res)=>{
    const {name,load_id,state,loan_amount,amount_paid}=req.body;
    const borrows=new BorrowersList({
        name,
        load_id,
        state,
        loan_amount,
        amount_paid
    });
    borrows.save()
    .then(borrows=>{
        res.status(200).json({message:"saved successfully"})
    })
    .catch(err=>{
        res.status(400).json({error:err})
    })
})

router.get('/filterData', (req, res) => {
    const filters = req.query;
    const filteredUsers = data.filter(user => {
      let isValid = true;
      for (key in filters) {
        console.log(key, user[key], filters[key]);
        isValid = isValid && user[key] == filters[key];
      }
      return isValid;
    });

    if(filters.state){
      var mainData={
        state:filters.state,
        totalLoanAmount:0,
        totalAmountPaid:0
      }
      filteredUsers.forEach((element,index)=>{
        mainData.totalLoanAmount += element.loan_amount;
        mainData.totalAmountPaid += element.amount_paid;
      });
      res.send(mainData);
    }else{
      const uniqueState = new Set();
      for(const obj of filteredUsers){
        uniqueState.add(obj.state);
      }

      const uniqueStateArray = [...uniqueState];

      const allState = []

      for(var a=0;a<uniqueState.size;a++){
        var stateData={
          state:uniqueStateArray[a],
          totalLoanAmount:0,
          totalAmountPaid:0
        }
        filteredUsers.forEach((element,index)=>{
          if(element.state === uniqueStateArray[a]){
            stateData.totalLoanAmount += element.loan_amount;
            stateData.totalAmountPaid += element.amount_paid;
          }
        });
        allState.push(stateData);
      }
      res.send(allState);
    }
  });

module.exports=router