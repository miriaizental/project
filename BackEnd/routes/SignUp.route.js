const commonService = require("../common/service")
const AskForHelpController = require("../controllers/AskForHelp.controller.js")
const SignupController = require("../controllers/SignUp.controller")

function route(app) {



    app.get("/api/checkPassword", (req, res, next) => {
        SignupController.CheckPassword(req, res);
    })

    app.post("/api/signUp", (req, res) => {
        var result = SignupController.CreateNewUser(req, res);
    })
}

module.exports = {
    route
}