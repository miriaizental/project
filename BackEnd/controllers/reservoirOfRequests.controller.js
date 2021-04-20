const dal = require("../dal/dal.js")
const tableName = 'AsksForHelp_tbl'
const { successResponse, failureResponse } = require("../common/service.js")
var geoip = require('geoip-lite');
var haversine = require("haversine-distance");
var arr = []
var geocoder = require('google-geocoder');
const { GeoPlace } = require("google-geocoder");
const geo = geocoder({
    key: 'AIzaSyBsvYj0B0vSJWv5Gd0rQI-besChUa2ngzc'
});



//בדיקה האם הבקשה כבר בטיפול

async function RequestWasGranted(request, response) {
    const query = `SELECT requestGranted FROM  ${tableName} WHERE requestNumber=${request.query.requestNumber}`
    await dal.executeAsync(query, request.body, response).then((data) => {
        successResponse('בוצע בהצלחה', data[0].requestGranted, response).send()

    }, (err) => failureResponse('ארעה שגיאה בעת הבדיקה ', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))
}

//הצגת כל הקריאות הנמצאות באזורו של בעל המכשיר

async function GetAllRequests(request, response) {

    await FindLatAndLng(request, response)
    const query = `select requestNumber,requestDetails,AsksForHelp_tbl.password,AsksForHelp_tbl.city,street,time,requestGranted,userName,phone,restriction,email
        from ${tableName} join Users_tbl on Users_tbl.password=AsksForHelp_tbl.password WHERE requestGranted=0 and requestNumber
        in (${arr})`

    await dal.executeAsync(query, request.body, response).then((data) => {
        //successResponse('המידע נשלח בהצלחה', data, response).send()
        response.send(data)

    }, (err) => console.log('err from getAllRequests: ' + err))
        .catch((err) => console.log('err from catch: ' + err))

    arr = []
}

//מעדכן שהבקשה נענתה

async function UpdateRequestGranted(request, response) {

    const query = `update ${tableName} set requestGranted=1,volunteerpassword='${request.body.login}' where requestNumber=${request.body.requestnumber} and requestGranted=0`
    await dal.executeAsync(query, request.body, response).then((result) => {
        successResponse('העדכון התבצע', result, response).send()
    }, (err) => failureResponse('ארעה שגיאה', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))

}

//מעדכן תאריך ענייה לבקשה

async function UpdateResponseDate(request, response) {

    const query = `update ${tableName} set responseDate=GETDATE() where requestNumber=${request.body.requestnumber}`
    await dal.executeAsync(query, request.body, response).then((result) => {
        successResponse('העדכון התבצע', result, response).send()
    }, (err) => failureResponse('ארעה שגיאה', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))
}

//מציאת נקודות אורך ורוחב לפי כתובת IP

async function FindLatAndLng(request, response) {
    let position = request.query
    const lat1 = position.lat
    const lng1 = position.lng

    let query = `select requestNumber,a.city,a.street from Users_tbl u
    join AsksForHelp_tbl a on a.password=u.password`

    await dal.executeAsync(query, request.body, response).then((data) => {

        data.forEach(element => {
          
            geo.find(`${element.city} ${element.street},ישראל`, function (err, res) {
                var location = res[0]['location']
                let lat2 = location['lat']
                let lng2 = location['lng']
                calcCrow(lat1, lng1, lat2, lng2, element.requestNumber)

            });


        });


    }, (err) => console.log('err from FindLatAndLng: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
    /////////////////////////////////////


}

//חישוב מרחק בין שתי נקודות

function calcCrow(lat1, lng1, lat2, lng2, n) {

    var point1 = { lat: lat1, lng: lng1 }
    var point2 = { lat: lat2, lng: lng2 }
    var haversine_km = haversine(point1, point2) / 1000

    if (haversine_km < 10) {
        arr.push(n)
    }
}



module.exports = {
    GetAllRequests,
    UpdateRequestGranted,
    RequestWasGranted,
    UpdateResponseDate,
    FindLatAndLng
}