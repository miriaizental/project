const dal = require("../dal/dal.js")
const { successResponse, failureResponse } = require("../common/service.js")
 const tableName = "Users_tbl"

function SignIn(request, response) {


    const query = `SELECT ISNULL((SELECT password FROM ${tableName} WHERE password='${request.query.password}' AND userName='${request.query.userName}'),0) as password`

    dal.executeAsync(query, request.body, response).then((data) => {
        if (data[0].password == "0")
            successResponse('שם משתמש או סיסמא שגויים', false, response).send()
        else
            successResponse('נכנסת בהצלחה למערכת', true, response).send()
        // return successResponse(' נכנסת בהצלחה', data, response.)

    }, (err) => failureResponse('ארעה שגיאה בעת כניסתך למערכת, אנא נסה שנית', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))
}

module.exports = {
    SignIn
}