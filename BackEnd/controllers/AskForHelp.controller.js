const dal = require("../dal/dal.js")
const { successResponse, failureResponse } = require("../common/service.js");
const table_name = 'AsksForHelp_tbl'

//יצירת בקשה חדשה

async function CreateNewCall(request, response) {
    const call = request.body
    const query = `INSERT INTO ${table_name} VALUES('${call.requestDetails}','${call.password}','${call.city}','${call.street}','${call.time}',0,GETDATE(),null,null,${call.location})`
    await dal.executeAsync(query, request.body, response).then((data) => {
        successResponse('בקשתך נכנסה למאגר', data, response).send()
    }, (err) => failureResponse('ארעה שגיאה', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))

}

//הצגת בקשות המשתמש למשתמש

async function GetUserRequests(request, response) {
    console.log(request.query.password);
    const query = `SELECT requestNumber,requestDetails,requestGranted FROM ${table_name} WHERE password='${request.query.password}'`
    await dal.executeAsync(query, request.body, response).then((data) => {

        response.send(data)

    }, (err) => console.log('err from GetUserRequests: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}

//מחיקת בקשה

async function RemoveRequest(request, response) {
    var x = request.body;
    const query = `delete from ${table_name} where requestNumber=${x.requestnumber}`
    await dal.executeAsync(query, request.body, response).then((data) => {
        successResponse('בקשתך נמחקה מהמאגר', data, response).send()
    }, (err) => failureResponse('ארעה שגיאה', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))

}

//מחיקת בקשות ישנות

async function DeletingOldRequests(request, response) {
    const query = `delete from ${table_name} where 
    DATEDIFF(day,requestDate,GETDATE())>50 and time='מיידי'`
    successResponse('הבקשות נמחקו מהמאגר', data, response).send()
    await dal.executeAsync(query, request.body, response).then((data) => {
    }, (err) => failureResponse('ארעה שגיאה', err, response).send())
        .catch((err) => console.log('err from aaaa: ' + err))
}





module.exports = {
    CreateNewCall,
    GetUserRequests,
    RemoveRequest,
    DeletingOldRequests


}