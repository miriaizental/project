
const SigninController = require("../controllers/SignIn.controller")


function route(app) {


    
    app.get("/api/signIn", (req, res) => {
        SigninController.SignIn(req,res)
    })

}

module.exports = {
    route
}