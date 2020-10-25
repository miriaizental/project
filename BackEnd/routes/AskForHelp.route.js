const AskForHelpController = require("../controllers/AskForHelp.controller.js")
const commonService = require("../common/service")
const { CheckPassword } = require("../controllers/AskForHelp.controller");


function route(app) {


    
    app.post("/api/createNewCall", (req, res) => {
        let data=req.body
        //console.log(data);
        var result = AskForHelpController.CreateNewCall(req, res);

    })

}

module.exports = {
    route
}