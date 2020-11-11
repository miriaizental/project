const dal = require("../dal/dal.js")
const { successResponse } = require("../common/service.js")


tableName = "Users_tbl"



function CreateNewUser(request, response) {
    const user = request.body

    const query = `INSERT INTO ${tableName} VALUES('${user.password}','${user.userName}','${user.phone}','${user.city}','${user.restriction}')`
    dal.executeAsync(query, request.body, response).then((data) => {

    }, (err) => console.log('err from CreateNewUser: ' + err))
        .catch((err) => console.log('err from catch: ' + err))

}






async function CheckPassword(request, response) {
    const query = `SELECT ISNULL((SELECT password FROM  ${tableName} WHERE password='${request.query.password}'),0)`
    console.log(query);
    await dal.executeAsync(query, request.body, response).then((data) => {

        console.log('data from CheckPassword: ' + JSON.stringify(data))
        if (JSON.stringify(data) == '[{"":"0"}]')
            response.send(true)
        else
            response.send(false)

    }, (err) => console.log('err from CheckPassword: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}
module.exports = {
    CreateNewUser,
    CheckPassword
}