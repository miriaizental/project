const express = require("express");
const app = express();
const bd = require('body-parser')
const cors = require('cors')
const ask_for_help_route = require("./routes/AskForHelp.route");
const sign_up_route = require('./routes/SignUp.route')
const sign_in_route = require('./routes/SignIn.route')
const reservoir_of_requests=require('./routes/reservoirOfRequests.route')



app.use(cors())
app.use(bd.json())
app.use(bd.urlencoded())



reservoir_of_requests.route(app)
ask_for_help_route.route(app)
sign_up_route.route(app)
sign_in_route.route(app)
//----------------------------------------------------------------------------------------------------------

// app.get('/', function (req, res) {

//     var sql = require("mssql");

//     // config for your database
//     var config = {
//         user: `sa`,
//         password: '12345',
//         server: 'localhost', 
//         database: 'volunteering' 
//     };

//     // connect to your database
//     sql.connect(config, function (err) {

//         if (err) console.log("first"+err);

//         // create Request object
//         var request = new sql.Request();

//         // query to the database and get the records
//         request.query('select * from AsksForHelp_tbl', function (err, recordset) {

//             if (err) console.log(err)

//             // send records as a response
//             res.send(recordset);

//         });
//     });
// });


app.listen(process.env.PORT || 3000, () => { console.log("server is listening on port 3000") })
