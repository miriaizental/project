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
const statistics=require('./routes/Statistics.route')
/////////////////////////

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
statistics.route(app)
/////////////////////////////////

app.listen(process.env.PORT || 3000, () => {
    cron.schedule('05 21 * * *', () => {
        CheckMyRequests(request, response, 'Manager_tbl')
    })
    cron.schedule('53 12 * * *', () => {
        CheckMyRequests(request, response, 'Users_tbl')
    })
    cron.schedule('08 09 * * *', () => {
        CheckMyRequests(request, response, 'Volunteers_tbl')
    })
    cron.schedule('37 18 * * *', () => {
        DeletingOldRequests(request, response)

    })

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




