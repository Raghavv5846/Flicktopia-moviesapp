const mongoose=require('mongoose');
const path=require('path');

// console.log(AVATAR_PATH);
const watchSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    list:[{
        type:mongoose.Schema.Types.Mixed
    }]
},{timestamp:true})

const Watch=mongoose.model('Watch',watchSchema);
module.exports=Watch;