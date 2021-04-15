const express = require("express");
const app = express();
const bd = require('body-parser')
const cors = require('cors')
const cron = require('node-cron');
const ipLocation = require("iplocation");
const { request, response } = require("express");
const { CheckMyRequests } = require("./controllers/RequestsInMyCare.controller");
const { DeletingOldRequests } = require("./controllers/AskForHelp.controller")
//var google = require('google-maps')


const ask_for_help_route = require("./routes/AskForHelp.route");
const sign_up_route = require('./routes/SignUp.route')
const sign_in_route = require('./routes/SignIn.route')
const reservoir_of_requests = require('./routes/reservoirOfRequests.route')
const volunteer_sign_up_route = require('./routes/VolunteerSignUp.route')
const request_in_my_care_route = require('./routes/RequestsInMyCare.route')
const contact_us_route = require('./routes/ContactUs.route')
const manager_sign_up_route = require('./routes/ManagerSignup.route')
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

// const sendMailAuto = () => {
//     cron.schedule('59 17 * * *', () => {
//         CheckMyRequests(request,response)
//     })
// }
//const url = `http://freegeoip.net/json/` + ip
// const fn = (url, (error, response, body) => {
//     if (!error && response.statusCode == 200) {
//         const data = JSON.parse(body)
//         console.log('locationnnn', location(data));
//     }

// })

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
manager_sign_up_route.route(app)

/////////////////////////////////

/////////////////////////////////////
app.listen(process.env.PORT || 3000, () => {
    cron.schedule('55 12 * * *', () => {
        CheckMyRequests(request, response, 'Manager_tbl')
    })
    cron.schedule('53 12 * * *', () => {
        CheckMyRequests(request, response, 'Users_tbl')
    })
    cron.schedule('54 12 * * *', () => {
        CheckMyRequests(request, response, 'Volunteers_tbl')
    })
    cron.schedule('37 18 * * *', () => {
        DeletingOldRequests(request, response)

    })
    ///////////////////////////

    // var geocoder = new google.maps.Geocoder();
    // geocoder.geocode({ 'address': 'miami, us' }, function (results, status) {
    //     if (status == google.maps.GeocoderStatus.OK) {
    //         console.log("location : " + results[0].geometry.location.lat() + " " + results[0].geometry.location.lng());
    //     } else {
    //         console.log("Something got wrong " + status);
    //     }
    // });

    ////////////////////////////
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




