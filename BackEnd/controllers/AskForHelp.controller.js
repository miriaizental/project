const dal = require("../dal/dal.js")
const { successResponse, failureResponse } = require("../common/service.js")

const table_name = 'AsksForHelp_tbl'

async function CreateNewCall(request, response) {
    const call = request.body

    const query = `INSERT INTO ${table_name} VALUES('${call.requestDetails}','${call.password}','${call.city}','${call.street}','${call.time}',0,GETDATE())`
    await dal.executeAsync(query, request.body, response).then((data) => {
        successResponse('בקשתך נכנסה למאגר', data, response).send()
    }, (err) => failureResponse('ארעה שגיאה', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))

}

async function GetUserRequests(request, response) {
    console.log(request.query.password);
    const query = `SELECT requestNumber,requestDetails,requestGranted FROM ${table_name} WHERE password='${request.query.password}'`
    console.log(query);
    await dal.executeAsync(query, request.body, response).then((data) => {

        response.send(data)

    }, (err) => console.log('err from GetUserRequests: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}


async function RemoveRequest(request, response) {
    var x = request.body;
    const query = `delete from ${table_name} where requestNumber=${x.requestnumber}`
    console.log(query);
    await dal.executeAsync(query, request.body, response).then((data) => {
        successResponse('בקשתך נמחקה מהמאגר', data, response).send()
    }, (err) => failureResponse('ארעה שגיאה', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))

}



module.exports = {
    CreateNewCall,
    GetUserRequests,
    RemoveRequest
}