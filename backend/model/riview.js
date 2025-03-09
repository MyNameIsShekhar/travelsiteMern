const mongoose = require("mongoose");

const RiviewSchema = new mongoose.Schema({
    comment:String,
rating:{
    type:Number,
    min:1,
    max:5
},
createdAt:{
    type:Date,
    default:Date.now()
}
})
const Reviews=mongoose.model("Reviews",RiviewSchema);
module.exports=Reviews