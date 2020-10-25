const dal = require("../dal/dal.js")
const { successResponse } = require("../common/service.js")


tableName = "Users_tbl"

function CreateNewUser(request, response) {
    //CheckPassword(request, response)
    const query = `INSERT INTO ${tableName} VALUES('${request.body.password}','${request.body.userName}','${request.body.phone}','${request.body.city}','${request.body.restriction}')`
    const data = dal.executeAsync(query, request.body,response)
    if (data!=undefined) {
        console.log('result: '+data.value);
        //successResponse("create succesfully", data, response)
    }
}


function CheckPassword(request, response) {
    const query = `SELECT password FROM Users_tbl WHERE password=${request.body.password}`
    const data = dal.executeAsync(query, request.body, response)
    if (data != undefined) {
        console.log(data +'data');
        //successResponse("create succesfully", data, response)
    }
}

module.exports = {
    CreateNewUser,
    CheckPassword
}