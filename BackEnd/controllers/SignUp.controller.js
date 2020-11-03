const dal = require("../dal/dal.js")
const { successResponse } = require("../common/service.js")
const { json } = require("body-parser")


tableName = "Users_tbl"

function CreateNewUser(request, response) {
    
    const query = `INSERT INTO ${tableName} VALUES('${request.body.password}','${request.body.userName}','${request.body.phone}','${request.body.city}','${request.body.restriction}')`

    const promise = dal.executeAsync(query, request.body,response)
    promise.then((data)=>console.log('data: '+ data),(err)=>console.log('err: '+err)).catch((err)=>console.log(err))
}


function CheckPassword(request, response) {
    const query = `SELECT password FROM Users_tbl WHERE password=${request.body.password}`
    const data = dal.executeAsync(query, request.body, response)
}

module.exports = {
    CreateNewUser,
    CheckPassword
}