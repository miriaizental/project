const dal = require("../dal/dal.js")
const { successResponse, failureResponse } = require("../common/service.js");
const table_name = 'Statistics_tbl'

///////////////////////הוספת משוב
async function AddFeedBack(request, response) {
    const fb = request.body
    const query = `INSERT INTO ${table_name} VALUES('${fb.responseTime}',${fb.satisfaction},'${fb.remarks}')`
    await dal.executeAsync(query, request.body, response).then((data) => {
        successResponse('המשוב נוסף בהצלחה', data, response).send()
    }, (err) => failureResponse('ארעה שגיאה', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))

}
//////////////////////חלוקה לפי ערים
async function GetCities(request, response) {
    const query = `select  city,count(city) as count from AsksForHelp_tbl group by city`
    await dal.executeAsync(query, request.body, response).then((data) => {

        response.send(data)

    }, (err) => console.log('err from GetCities: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}

////////////////////////////חלוקה לפי מגבלות
async function TypesOfLimitations(request, response) {
    const query = `select restriction,COUNT(restriction) as count from Users_tbl group by restriction`
    await dal.executeAsync(query, request.body, response).then((data) => {

        response.send(data)

    }, (err) => console.log('err from TypesOfLimitations: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}
/////////////////////////בדיקת מידת שביעות רצון
async function Satisfaction(request, response) {
    const query = `select satisfaction from ${table_name}`
    await dal.executeAsync(query, request.body, response).then((data) => {

        response.send(data)

    }, (err) => console.log('err from TypesOfLimitations: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}
/////////////////////////////////////בדיקת זמן הענות
async function ResponseTime(request, response) {
    const query = `select responseTime from ${table_name}`
    await dal.executeAsync(query, request.body, response).then((data) => {

        response.send(data)

    }, (err) => console.log('err from ResponseTime: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}

module.exports = {
    GetCities,
    TypesOfLimitations,
    AddFeedBack,
    Satisfaction,
    ResponseTime


}