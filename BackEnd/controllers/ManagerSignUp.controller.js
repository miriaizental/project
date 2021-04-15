const dal = require("../dal/dal.js")
const { successResponse, failureResponse } = require("../common/service.js")
const tableName='Manager_tbl'

///////אימות מנהל
async function ManagerAuthentication(request,response){
    const query = `select email from Manager_tbl WHERE password='${request.query.password}' `
    await dal.executeAsync(query, request.body, response).then((data) => {
        console.log('d',data[0].email);
        console.log('ran',Math.floor(Math.random() * 1000) + 1);

    }, (err) => failureResponse('ארעה שגיאה', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))
}

///////////יצירת מנהל חדש

function CreateNewUser(request, response) {
    
    const user = request.body

    const query = `INSERT INTO ${tableName} VALUES('${user.password}','${user.userName}','${user.phone}','${user.email}')`
    dal.executeAsync(query, request.body, response).then((data) => {

        successResponse('מנהל חדש נוסף בהצלחה למערכת', data, response).send()
    }, (err) => failureResponse('ארעה שגיאה בעת ההרשמה למערכת /n אנא נסה שנית', err, response).send())
        .catch((err) => console.log('err from catch: ' + err))

}



module.exports = {
    ManagerAuthentication,
    CreateNewUser
}