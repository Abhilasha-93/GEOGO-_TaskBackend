const userModel = require("../model/userModel");
const jwt = require ("jsonwebtoken");


exports.createUser = async function (req,res){
   try {
    let data = req.body;

    const {mobileNumber, email , password , fullName ,role} = data;

    //check data is exist | key exist in data
    if (Object.keys(data).length == 0) {
        return res.status(400).send({ status: false, msg: "Please enter some data to create a user" })
    }
    if(!mobileNumber){
        return res.status(400).send("please enter MobileNumber");
    }

    if(!email){
        return res.status(400).send("please enter MobileNumber");
    }
    
    if(!password){
        return res.status(400).send("please enter MobileNumber");
    }
    if(!fullName){
        return res.status(400).send("please enter MobileNumber");
    }
    
    let userCreated = await userModel.create(data);
    return res.status(201).send({status : true , message : "user created successfully" , data : userCreated});
}
catch (err) {
    return  res.status(500).send({ message: "Error", error: err.message })
  }
}


//Login user
exports.userLogin = async function (req,res) {
  try{
     const data = req.body;
     const { email, password} = data;

     //check data is exist | key exist in data
     if (Object.keys(data).length == 0) {
        return res.status(400).send({ status: false, msg: "Data is required to login" })
    }

     //email is required
     if(!email) 
     return res.status(400).send({status:false,message:"user Email is required"})
     
     //password is required
     if(!password)
      return res.status(400).send({status:false,message:"user password is required"})
     
     //email and password check from db
     let user = await userModel.findOne({ email: email, password: password });
     if (!user)
         return res.status(401).send({ status: false, message: "credentials are not correct" });
 
    
    
    
     //token created here
        var token = jwt.sign(
            {
               "userId": user._id,
                "role": user.role
            },
            "secret@#"
                );
     res.setHeader("x-api-key", token);
     return res.status(201).send({ status: true, message : "success" ,data: token});
 }
 catch (err) {
     console.log(err.message)
     res.status(500).send({status: false, message: err.message })
 }
     
 };
 