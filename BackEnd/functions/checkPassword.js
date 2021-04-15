const dal = require("../dal/dal.js")
const { successResponse, failureResponse } = require("../common/service.js")
var tableName = ""



async function CheckPassword(request, response) {
    if (request.query.number == '1')
        tableName = 'Users_tbl'
    else {
        if (request.query.number == '2')
            tableName = 'Volunteers_tbl'
        else
            tableName = 'Manager_tbl'
    }
    const query = `SELECT ISNULL((SELECT password FROM  ${tableName} WHERE password='${request.query.password}'),0) as password`
    await dal.executeAsync(query, request.body, response).then((data) => {

        if (data[0].password == "0")
            successResponse('סיסמא מאושרת', true, response).send()
        else
            successResponse(' הסיסמא קיימת כבר במערכת', false, response).send()

    }, (err) => failureResponse('ארעה שגיאה בעת בדיקת הסיסמה', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))
}

module.exports = {
    CheckPassword
}