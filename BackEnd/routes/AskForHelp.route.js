const AskForHelpController= require("../controllers/AskForHelp.controller.js")
const commonService=require("../common/service")


    function route(app)
     {
      app.post("/api/createNewCall",(req,res)=>{
       var result=   AskForHelpController.CreateNewCall(req,res);
       
      })
     }


module.exports={
    route
}