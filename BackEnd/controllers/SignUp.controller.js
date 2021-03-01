const dal = require("../dal/dal.js")
const { successResponse, failureResponse } = require("../common/service.js")


const tableName = "Users_tbl"



function CreateNewUser(request, response) {

    const user = request.body

    const query = `INSERT INTO ${tableName} VALUES('${user.password}','${user.userName}','${user.phone}','${user.city}','${user.restriction}','${user.email}')`
    console.log(query);

    dal.executeAsync(query, request.body, response).then((data) => {

        successResponse('  נרשמת בהצלחה למערכת', data, response).send()
    }, (err) => failureResponse('ארעה שגיאה בעת ההרשמה למערכת \n אנא נסה שנית', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))

}






async function CheckPassword(request, response) {
    const query = `SELECT ISNULL((SELECT password FROM  ${tableName} WHERE password='${request.query.password}'),0) as password`
    console.log(query);
    await dal.executeAsync(query, request.body, response).then((data) => {

        console.log('data from CheckPassword: ' + JSON.stringify(data))
        if (data[0].password == "0")
            successResponse('סיסמא מאושרת', true, response).send()
        else
            successResponse(' הסיסמא קיימת כבר במערכת', false, response).send()

    }, (err) =>  failureResponse('ארעה שגיאה בעת בדיקת הסיסמה', err, response).send() )
        .catch((err) => console.log('err from catch: ' + err))
}
module.exports = {
    CreateNewUser,
    CheckPassword
}