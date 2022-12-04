const mongoose = require ("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    owner:{
        type: ObjectId,
        ref: 'user',
        required: true,
    },
    event: {
        type: ObjectId,
        ref: 'event',
        required: true,
    },
    ticket : {
        type: ObjectId,
        ref: 'ticket',
        required: true,
    },
    purchase_date:{
        type : String,
        required : true
    },
    total_price:{
        type : Number,
        //required : true
    },
    tickets_for : {
        type : Number,
        required : true
    },
    status: {
        type: String,
        default : "pending",
        enum: ["confirmed", "cancelled","pending"] 
       
      },
    
}, { timestamps: true });



module.exports = mongoose.model('order', orderSchema);