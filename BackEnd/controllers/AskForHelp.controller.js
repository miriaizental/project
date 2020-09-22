const dal = require("../dal/dal.js")
const { successResponse } = require("../common/service.js")


tableName = "AsksForHelp_tbl"
function CreateNewCall(request, response) {
    const query = `INSERT INTO ${tableName} VALUES('${request.body.requestDetails}','${request.body.password}',0)`
    const data = dal.executeAsync(query, request.body)
    console.log(data);
    if (data != undefined) {
        successResponse("create succesfully", data, response)
    }
}

function CheckPassword(request, response) {
    const query = `SELECT password FROM Users_tbl WHERE password=${request.body.password}`
    const data = dal.executeAsync(query, request.body, response)
    if (data != undefined) {
        successResponse("create succesfully", data, response)
    }
}

module.exports = {
    CreateNewCall,
    CheckPassword
}