const reservoirOfRequestsController = require("../controllers/reservoirOfRequests.controller")
const commonService = require("../common/service")
const { CheckPassword } = require("../controllers/AskForHelp.controller");

function route(app) {

    app.get("/api/requestWasGranted", (req, res) => {
        reservoirOfRequestsController.RequestWasGranted(req, res)
    })

    app.post("/api/updateRequestGranted", (req, res) => {
        reservoirOfRequestsController.UpdateRequestGranted(req, res)
    })

    app.post("/api/updateResponseDate",(req,res)=>{
        reservoirOfRequestsController.UpdateResponseDate(req,res)
    })

    app.use("/api/allRequests", (req, res, next) => {
        next()
    })

    app.get("/api/allRequests", (req, res) => {

        reservoirOfRequestsController.GetAllRequests(req, res)
    })


}

module.exports = {
    route
}