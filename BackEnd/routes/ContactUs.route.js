const contactUsController = require("../controllers/ContactUs.controller")
const commonService = require("../common/service")

function route(app){

    app.get("/api/contactUs",(req,res)=>{
        contactUsController.ContactUs(req,res)
    })

    

}

module.exports = {
    route
}