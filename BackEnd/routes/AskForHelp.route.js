const AskForHelpController = require("../controllers/AskForHelp.controller.js")
const commonService = require("../common/service")


function route(app) {

    app.use("/api/createNewCall", (req, res, next) => {
        if (req.method == 'POST') {
            var password = AskForHelpController.CheckPassword(req, res);
            if (password == undefined) {
                //undefined password
            }
        }
        next()
    })

    app.get("/api/createNewCall", (req, res) => {
        res.sendFile('')
    })

    app.post("/api/createNewCall", (req, res) => {
        let data=req.body
        console.log(data);
        var result = AskForHelpController.CreateNewCall(req, res);

    })

}

module.exports = {
    route
}