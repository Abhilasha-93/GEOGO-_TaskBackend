const express = require('express');
const router = express.Router()
const userController = require("../controller/userController");
const eventController = require("../controller/eventController");
const ticketController = require("../controller/ticketController");
const orderController = require("../controller/orderController");
const mid = require("../middleware/auth");

// ---------------------------------------- USER API's -------------------------------------------
router.post("/register", userController.createUser) //craete user

 router.post("/login", userController.userLogin)  //Login

router.post("/event", eventController.createEvent) //Admin user -> create new events -> only admin _user

router.get("/allEvent",eventController.viewEvents) // view all events

router.post("/ticket", ticketController.createTicket) // create tickets -> only admin_user

router.get("/allTickets", ticketController.viewTickets) // view all tickets

router.get("/bookTickets", ticketController.bookTicket) // Book Ticket

router.post("/orderTicket", orderController.orderTicket) //order Ticket

// router.post("/user/:userId/profile", mid,ticketController.configureEvent) //configure avaliable tickets

// router.put("/user/:userId/profile", mid,eventController.publishEvent) // publish/unpublish events

// router.get("/user/:userId/profile", mid,ticketController.reservationList) // see the list of reservation for an event

// router.post("/user/:userId/profile", mid,orderController.reserveEvent) //normal user reserve event tickets


module.exports = router