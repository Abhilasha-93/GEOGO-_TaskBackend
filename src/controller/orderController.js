const orderModel = require("../model/orderModel");
const ticketModel = require("../model/ticketModel");

exports.orderTicket = async function (req,res) {
    const data = req.body;
    const {owner,event,ticket ,purchase_date,tickets_for } = data;

    if(!owner) return res.status(400).send({status: false , message :" please enter userId"});

    if(!event) return res.status(400).send({status: false , message :" please enter eventId"});

    if(!ticket) return res.status(400).send({status: false , message :" please enter ticketId"});

    if(!purchase_date) return res.status(400).send({status: false , message :" please enter purchase_date"});

    if(!owner) return res.status(400).send({status: false , message :" please enter userId"});

    const order = await orderModel.create(data);
    const ticketData = await ticketModel.find();
     
    let obj = {
        userId : owner,
        event : event,
        quantity : tickets_for,
        
    }

    return res.status(201).send({status: true , message : "Tickets Booked ",obj});


}