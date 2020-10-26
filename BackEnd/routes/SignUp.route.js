const commonService = require("../common/service")
const AskForHelpController = require("../controllers/AskForHelp.controller.js")
const SignupController = require("../controllers/SignUp.controller")

function route(app) {


    // app.use("/api/signUp", (req, res, next) => {
    //     CheckPassword(req,res)
    //     next()
    // })

    app.post("/api/signUp", (req, res) => {
        let data = req.body
        var result = SignupController.CreateNewUser(req, res);
    })
}

module.exports = {
    route
}