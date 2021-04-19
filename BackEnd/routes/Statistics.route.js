const StatisticsController = require("../controllers/Statistics.controller")
const commonService = require("../common/service")

function route(app) {

    app.post("/api/AddFeedBack", (req, res) => {
        StatisticsController.AddFeedBack(req, res);
    })

    app.get("/api/getCities", (req, res) => {
        StatisticsController.GetCities(req, res)
    })

    app.get("/api/typesOfLimitations",(req,res)=>{
        StatisticsController.TypesOfLimitations(req,res)
    })
    app.get("/api/satisfaction",(req,res)=>{
        StatisticsController.Satisfaction(req,res)
    })
    app.get("/api/responseTime",(req,res)=>{
        StatisticsController.ResponseTime(req,res)
    })

}

module.exports = {
    route
}