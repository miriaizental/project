const commonService = require("../common/service")
const VolunteerSignUpController = require("../controllers/VolunteerSignUp.controller.js")
const checkPassword= require("../functions/checkPassword")

function route(app) {



    app.get("/api/checkPassword", (req, res, next) => {
        checkPassword.CheckPassword(req,res)
    })

    app.post("/api/volunteerSignUp", (req, res) => {
        VolunteerSignUpController.CreateNewUser(req, res);
    })
}

module.exports = {
    route
}