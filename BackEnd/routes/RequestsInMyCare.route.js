const RequestsInMyCareController = require("../controllers/RequestsInMyCare.controller.js")
const commonService = require("../common/service")

function route(app) {

    app.get("/api/getVolunteerRequests", (req, res) => {
        RequestsInMyCareController.GetVolunteerRequests(req, res)
    })


}
module.exports = {
    route
}