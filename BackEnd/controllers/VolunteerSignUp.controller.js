const dal = require("../dal/dal.js")
const { successResponse, failureResponse } = require("../common/service.js")
tableName = "Volunteers_tbl"

//יצירת מתנדב חדש

function CreateNewUser(request, response) {
    
    const user = request.body
    const query = `INSERT INTO ${tableName} VALUES('${user.password}','${user.userName}','${user.phone}','${user.ipAddress}','${user.email}')`
    console.log(query);
    dal.executeAsync(query, request.body, response).then((data) => {
        successResponse('  נרשמת בהצלחה למערכת', data, response).send()
    }, (err) => failureResponse('ארעה שגיאה בעת ההרשמה למערכת /n אנא נסה שנית', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))

}



// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }
// function showPosition(position) {
//     console.log("lat: "+position.coords.latitude + 
//     "lng: " + position.coords.longitude);
// }

module.exports = {
    CreateNewUser,
}