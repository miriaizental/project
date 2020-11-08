const dal = require("../dal/dal.js")
const { successResponse } = require("../common/service.js")


tableName = "Users_tbl"

function CreateNewUser(request, response) {

    const query = `INSERT INTO ${tableName} VALUES('${request.body.password}','${request.body.userName}','${request.body.phone}','${request.body.city}','${request.body.restriction}')`

    const promise = dal.executeAsync(query, request.body, response)

    promise.then((data) => {
        //console.log('data from CreateNewUser: ' + data)
    },
        (err) => console.log('err from CreateNewUser: ' + err)).catch((err) => console.log(err))

}


function CheckPassword(request, response) {
    const query = `SELECT ISNULL((SELECT password FROM Users_tbl WHERE password='${request.body.password}'),0)`
    return dal.executeAsync(query, request.body, response).then((data) => {

        console.log('data from then: ' + JSON.stringify(data));
        if (JSON.stringify(data) == '[{"":"0"}]') {
            return true
        }
        else {
            return false
        }

    }, (err) => console.log('err from CheckPassword: ' + err)).catch((err) => console.log(err)
    ).then((data) => { console.log('second then : ' + data); return data })
}

module.exports = {
    CreateNewUser,
    CheckPassword
}