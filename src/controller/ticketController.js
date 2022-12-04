const eventModel = require("../model/eventModel");
const ticketModel = require("../model/ticketModel");
const orderModel = require("../model/orderModel");

exports.createTicket = async function (req,res){
    try{
        const data = req.body ;
        const {event,name,description,price,quantity} = data;

     //check data is exist | key exist in data
    if (Object.keys(data).length == 0) {
        return res.status(400).send({ status: false, msg: "Please enter some data to create a user" })
    }
    if(!event){
        return res.status(400).send("please enter event");
    }
    if(!name){
        return res.status(400).send("please enter name");
    }
    if(!description){
        return res.status(400).send("please enter description");
    }
    if(!price){
        return res.status(400).send("please enter price");
    }
    if(!quantity){
        return res.status(400).send("please enter quantity");
    }

    const ticket = await ticketModel.create(data);
    return res.status(201).send({status: true , message :"tickets created successfully" , data : ticket})


    }
    catch (err) {
        return  res.status(500).send({ message: "Error", error: err.message })
      }
}

exports.viewTickets = async function (req,res) {
    try{
        const tickets = await ticketModel.find();
        return res.status(200).send({status: true , message : "All tickets" , data : tickets})
    }
    catch (err) {
        return  res.status(500).send({ message: "Error", error: err.message })
      }
}

exports.bookTicket = async function(req,res) {
    try{
         const data = req.body
         const {event,name, description, price, quantity} = data
         if (!event) return res.status(400).send ({status: false , message : "enter event Id "})

         if (!name) return res.status(400).send ({status: false , message : "enter name "})

         if (!description) return res.status(400).send ({status: false , message : "enter description "})

         if (!price) return res.status(400).send ({status: false , message : "enter price "})

         if (!quantity) return res.status(400).send ({status: false , message : "enter quantity "})

         const eventBook = await eventModel.findById({_id : data.event,  published : true});

         if(!eventBook) return res.status(400).send({status: false , message :"there is no event"});


         const Obj = {
            event : eventBook._id,
            slung : eventBook.slung,
            name : eventBook.name,
            quantity : data.quantity,
            price : data.price,

         }
         return res.status(200).send({status: true , message : "Event Ticket Booked", data : Obj})
    }
    catch (err) {
        return  res.status(500).send({ message: "Error", error: err.message })
      }
}