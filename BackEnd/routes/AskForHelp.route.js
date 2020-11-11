const AskForHelpController = require("../controllers/AskForHelp.controller.js")
const commonService = require("../common/service")
const { CheckPassword } = require("../controllers/AskForHelp.controller");


function route(app) {


    
    app.post("/api/createNewCall", (req, res) => {
        AskForHelpController.CreateNewCall(req, res);
    })

}

module.exports = {
    route
}