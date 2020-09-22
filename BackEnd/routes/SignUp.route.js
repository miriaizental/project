const commonService = require("../common/service")
const AskForHelpController = require("../controllers/AskForHelp.controller.js")
const SignupRouter=require("../controllers/SignUp.controller")

function route(app) {

    app.use("/api/signUp", (req, res, next) => {
        if (req.method == 'POST') {
            var password = AskForHelpController.CheckPassword(req, res);
            if (password == undefined) {
                next()
            }
        }    
    })

    app.get("/api/signUp", (req, res) => {
        res.sendFile('')
    })

    app.post("/api/signUp",(req,res)=>{
        let data=req.body
        console.log(data);
        var result = SignupRouter.CreateNewUser(req, res);
    })
}

module.exports = {
    route
}