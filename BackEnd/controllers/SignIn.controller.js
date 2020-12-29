const dal = require("../dal/dal.js")

tableName = "Users_tbl"

function SignIn(request, response) {

    const query = `SELECT ISNULL((SELECT password FROM ${tableName} WHERE password='${request.query.password}' AND userName='${request.query.userName}'),0) as password`
    dal.executeAsync(query, request.body, response).then((data) => {
        if (data[0].password == "0")
            response.send(false)
        else
            response.send(true)

    }, (err) => console.log('err from SignIn: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}

module.exports = {
    SignIn
}