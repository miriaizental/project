const dal = require("../dal/dal.js")
const { successResponse, failureResponse } = require("../common/service.js")
tableName = "Volunteers_tbl"

//יצירת מתנדב חדש

function CreateNewUser(request, response) {
    
    const user = request.body
    const query = `INSERT INTO ${tableName} VALUES('${user.password}','${user.userName}','${user.phone}','${user.ipAddress}','${user.email}',0,0)`
    console.log(query);
    dal.executeAsync(query, request.body, response).then((data) => {
        successResponse('  נרשמת בהצלחה למערכת', data, response).send()
    }, (err) => failureResponse('ארעה שגיאה בעת ההרשמה למערכת /n אנא נסה שנית', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))

}



module.exports = {
    CreateNewUser,
}