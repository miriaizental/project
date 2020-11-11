const reservoirOfRequestsController = require("../controllers/reservoirOfRequests.controller")
const commonService = require("../common/service")
const { CheckPassword } = require("../controllers/AskForHelp.controller");

function route(app) {

    app.get("/api/allRequests", (req, res) => {
        reservoirOfRequestsController.getAllRequests(req,res)
    })

}

module.exports = {
    route
}