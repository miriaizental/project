const ManagerSignUpController = require("../controllers/ManagerSignUp.controller.js")
const commonService = require("../common/service")
const checkPassword = require("../functions/checkPassword")


function route(app) {
    app.get("/api/managerAuthentication", (req, res) => {
        ManagerSignUpController.ManagerAuthentication(req, res)
    })
    app.post("/api/managersignup", (req, res) => {
        ManagerSignUpController.CreateNewUser(req, res);
    })
    app.get("/api/checkPassword", (req, res, next) => {
        checkPassword.CheckPassword(req, res)
    })

}

module.exports = {
    route
}