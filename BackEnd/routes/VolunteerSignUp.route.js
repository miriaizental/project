const commonService = require("../common/service")
const VolunteerSignUpController = require("../controllers/VolunteerSignUp.controller.js")

function route(app) {



    app.get("/api/checkPassword", (req, res, next) => {
        VolunteerSignUpController.CheckPassword(req, res);
    })

    app.post("/api/volunteerSignUp", (req, res) => {


        
        VolunteerSignUpController.CreateNewUser(req, res);
    })
}

module.exports = {
    route
}