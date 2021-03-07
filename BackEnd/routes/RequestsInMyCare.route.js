const RequestsInMyCareController = require("../controllers/RequestsInMyCare.controller.js")
const commonService = require("../common/service")

function route(app) {

    app.get("/api/getVolunteerRequests", (req, res) => {
        RequestsInMyCareController.GetVolunteerRequests(req, res)
    })
    app.get("/api/checkMyRequests", (req, res) => {
        RequestsInMyCareController.CheckMyRequests(req, res)
    })
    
    
}


module.exports = {
    route,
}