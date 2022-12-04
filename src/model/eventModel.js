const mongoose = require ("mongoose");

const eventSchema = new mongoose.Schema({
    slug:{
        type : String,
        required : true
    },
    name: {
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    poster:{
        type : String,
        //required : true
    },
    start_date: {
        type: String,
      },
    end_date:{
        type : String,
    },
    published:{
        type : Boolean,
        required : true,
        default : false
    },
    
}, { timestamps: true });



module.exports = mongoose.model('event', eventSchema);