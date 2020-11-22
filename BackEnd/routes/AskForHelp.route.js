const AskForHelpController = require("../controllers/AskForHelp.controller.js")
const commonService = require("../common/service")
const { CheckPassword } = require("../controllers/AskForHelp.controller");


function route(app) {

    app.post("/api/createNewCall", (req, res) => {
        AskForHelpController.CreateNewCall(req, res);
    })

    app.get("/api/getUserRequests",(req,res)=>{
        AskForHelpController.GetUserRequests(req,res)
    })
    app.post("/api/removeRequest",(req,res)=>{
        AskForHelpController.RemoveRequest(req,res)
    })

}

module.exports = {
    route
}