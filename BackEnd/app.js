const express = require("express");
const app = express();
const bd = require('body-parser')
const cors = require('cors')
const cron = require('node-cron');
const { CheckMyRequests } = require("./controllers/RequestsInMyCare.controller");
const { request, response } = require("express");

const ask_for_help_route = require("./routes/AskForHelp.route");
const sign_up_route = require('./routes/SignUp.route')
const sign_in_route = require('./routes/SignIn.route')
const reservoir_of_requests = require('./routes/reservoirOfRequests.route')
const volunteer_sign_up_route = require('./routes/VolunteerSignUp.route')
const request_in_my_care_route = require('./routes/RequestsInMyCare.route')
const contact_us_route=require('./routes/ContactUs.route')
/////////////////////////
// const googleMapsClient = require('@google/maps').createClient({
//     key: 'AIzaSyBQ15dTEVyPYF67jF4omi6YBx3CIFFO2oA'
// });

// function getDirections(req, callback) {
//     googleMapsClient.directions({
//         origin: req.origin,
//         destination: req.destination,
//         mode: req.mode
//     }, function (error, res) {
//         console.log(error);
//         console.log(res);
//         if (!error)
//             callback(res)
//     })
// }

// var inputs = {
//     origin: "1600 Amphitheatre Parkway, Mountain View, CA",
//     destination: "1 Infinite Loop, Cupertino, CA 95014, USA",
//     mode: "driving"
// }

// app.get('',(req,res)=>{
//     getDirections(inputs,function(result){
//         console.log('res:'+JSON.stringify(JSON.parse(JSON.stringify(result))));
//     })
// })

const sendMailAuto = () => {
    cron.schedule('21 16 * * *', () => {
        CheckMyRequests(request,response)
    })
}

app.use(cors())
app.use(bd.json())
app.use(bd.urlencoded())


reservoir_of_requests.route(app)
ask_for_help_route.route(app)
sign_up_route.route(app)
sign_in_route.route(app)
volunteer_sign_up_route.route(app)
request_in_my_care_route.route(app)
contact_us_route.route(app)

/////////////////////////////////

/////////////////////////////////////
app.listen(process.env.PORT || 3000, () => {
    sendMailAuto()
    console.log("server is listening on port 3000")
})


const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
    ws.on('message', (messege) => {
        wss.clients.forEach(client => client.send('refresh'));
    })
    //ws.on('close', () => console.log('Client disconnected'));
})




