const dal = require("../dal/dal.js")
const tableName = 'AsksForHelp_tbl'
const { successResponse, failureResponse } = require("../common/service.js")


//בדיקה האם הבקשה כבר בטיפול


async function RequestWasGranted(request, response) {
    const query = `SELECT requestGranted FROM  ${tableName} WHERE requestNumber=${request.query.requestNumber}`
    console.log(query);
    await dal.executeAsync(query, request.body, response).then((data) => {
        successResponse('בוצע בהצלחה', data[0].requestGranted, response).send()

    }, (err) => failureResponse('ארעה שגיאה בעת הבדיקה ', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))
}

//כל הקריאות

async function GetAllRequests(request, response) {
    const query = `select requestNumber,requestDetails,AsksForHelp_tbl.password,AsksForHelp_tbl.city,street,time,requestGranted,userName,phone,restriction
     from ${tableName} join Users_tbl on Users_tbl.password=AsksForHelp_tbl.password WHERE requestGranted=0`

    await dal.executeAsync(query, request.body, response).then((data) => {

        //successResponse('המידע נשלח בהצלחה', data, response).send()
        response.send(data)

    }, (err) => console.log('err from getAllRequests: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}

//מעדכן שהבקשה נענתה

async function UpdateRequestGranted(request, response) {

    const query = `update ${tableName} set requestGranted=1 where requestNumber=${request.body.requestnumber} and requestGranted=0`
    await dal.executeAsync(query, request.body, response).then((result) => {
        successResponse('הבקשה הועברה לטיפולך', result, response).send()
    }, (err) => failureResponse('ארעה שגיאה', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))

}



module.exports = {
    GetAllRequests,
    UpdateRequestGranted,
    RequestWasGranted
}