const eventModel = require("../model/eventModel");
const upload = require('../aws/config.js');

exports.createEvent = async function (req,res) {
    try{
        const data = req.body;
        let files = req.files;
        const {slug,name,description,poster, start_date,end_date, published} = data;

         //check data is exist | key exist in data
         if (!data) {
            return res.status(400).send({ status: false, msg: "Data is required to create event" })
        }
        
        if(!slug){
            return res.status(400).send({status : false , message : "please enter Slug"})
        }

        if(!name){
            return res.status(400).send({status : false , message : "please enter name"})
        }
        if(!description){
            return res.status(400).send({status : false , message : "please enter description"})
        }
        if(!poster){
            return res.status(400).send({status : false , message : "please enter poster"})
        }

        // if photo is provided then cheking extension of file.
        if (files && files.length > 0) {
            let check = files[0].originalname.split(".")
            const extension = ["png", "jpg", "jpeg", "webp"]
            if (extension.indexOf(check[check.length - 1]) == -1) {
                return res.status(400).send({ status: false, message: "Please provide image only" })
            }
            //upload to s3 and get the uploaded link
            let uploadedFileURL = await upload.uploadFile(files[0])
            data.poster = uploadedFileURL;
        } 
         

        const eventData = await eventModel.create(data);
        return res.status(201).send({status: true , message :" event created successfully" , data : eventData})

    }
    catch (err) {
        return  res.status(500).send({ message: "Error", error: err.message })
      }
}

exports.viewEvents = async function (req,res) {
    try{
         
        const events = await eventModel.find();
        return res.status(200).send({status: true , message : "All events" , data : events})
    }
    catch (err) {
        return  res.status(500).send({ message: "Error", error: err.message })
      }
}