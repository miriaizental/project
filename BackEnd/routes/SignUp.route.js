const commonService = require("../common/service")
const AskForHelpController = require("../controllers/AskForHelp.controller.js")
const SignupController = require("../controllers/SignUp.controller.js")
const checkPassword= require("../functions/checkPassword")


function route(app) {



    app.get("/api/checkPassword", (req, res, next) => {
        checkPassword.CheckPassword(req,res)
    })

    app.post("/api/signUp", (req, res) => {
         SignupController.CreateNewUser(req, res);
    })
}

module.exports = {
    route
}