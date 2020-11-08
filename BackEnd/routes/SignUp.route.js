const commonService = require("../common/service")
const AskForHelpController = require("../controllers/AskForHelp.controller.js")
const SignupController = require("../controllers/SignUp.controller")

function route(app) {



    // app.use("/api/signUp", (req, res, next) => {
    //     var result = SignupController.CheckPassword(req, res);
    //     console.log(result+'-result');
    //     //next()
    // })

    app.post("/api/signUp", (req, res) => {
        var result = SignupController.CreateNewUser(req, res);
    })
}

module.exports = {
    route
}