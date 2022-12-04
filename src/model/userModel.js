const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    mobileNumber :{
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    fullName :{
        type : String,
        required : true
    },
    role: {
        type: String,
        default: "normal_user",
        enum: ["normal_user", "admin_user"] 
      },
 
}, { timestamps: true });



module.exports = mongoose.model('user', userSchema);