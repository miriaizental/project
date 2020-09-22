const express= require("express");
const app = express();
const bd=require('body-parser')
const ask_for_help_route=require("./routes/AskForHelp.route");
const { CheckPassword } = require("./controllers/AskForHelp.controller");
//const sign_up_route=require('../BackEnd/routes/SignUp.route')



app.use(bd.json())
app.use(bd.urlencoded())

ask_for_help_route.route(app)
//sign_up_route.route(app)

app.listen(process.env.PORT||3000,()=>{console.log("server is listening on port 3000")})
