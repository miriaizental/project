const dal = require("../dal/dal.js")
const tableName = 'AsksForHelp_tbl'


//בדיקה האם הבקשה כבר בטיפול


async function RequestWasGranted(request, response) {
    const query = `SELECT requestGranted FROM  ${tableName} WHERE requestNumber=${request.query.requestNumber}`
    console.log(query);
    await dal.executeAsync(query, request.body, response).then((data) => {
        response.send(data[0].requestGranted)
    }, (err) => console.log('err from RequestWasGranted: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}

//כל הקריאות

async function GetAllRequests(request, response) {
    const query = `select requestNumber,requestDetails,AsksForHelp_tbl.password,AsksForHelp_tbl.city,street,time,requestGranted,userName,phone,restriction
     from ${tableName} join Users_tbl on Users_tbl.password=AsksForHelp_tbl.password WHERE requestGranted=0`

    await dal.executeAsync(query, request.body, response).then((data) => {

        response.send(data)

    }, (err) => console.log('err from getAllRequests: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}

//מעדכן שהבקשה נענתה

async function UpdateRequestGranted(request, response) {

    const query = `update ${tableName} set requestGranted=1 where requestNumber=${request.body.requestnumber} and requestGranted=0`
    await dal.executeAsync(query, request.body, response).then((result) => {
        response.send()
    }, (err) => console.log('err from UpdateRequestGranted: ' + err))
        .catch((err) => console.log('err from catch: ' + err))

}



module.exports = {
    GetAllRequests,
    UpdateRequestGranted,
    RequestWasGranted
}