const express = require ("express");
const app = express();
const bodyParser = require('body-parser');
const route = require('./route/route.js');
const mongoose = require ("mongoose");
const multer = require('multer');

app.use(multer().any());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 

mongoose.connect("mongodb+srv://Seema:C5PtEdt23kmtx9ov@cluster0.gjunl.mongodb.net/TicketBookingSystem?retryWrites=true&w=majority")
    .then(()=> console.log("mongodb connected"))
    .catch(err => console.log(err))

app.use('/',route);

//Connecting on port
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

