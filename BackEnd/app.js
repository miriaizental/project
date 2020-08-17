const express= require("express");
const app = express();
const ask_for_help_route=require("./routes/AskForHelp.route")




ask_for_help_route.route(app)

app.listen(process.env.PORT||3000,()=>{console.log("server is listening on port 3000")})
