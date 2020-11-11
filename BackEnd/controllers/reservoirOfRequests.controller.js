const dal = require("../dal/dal.js")
const tableName = 'AsksForHelp_tbl'

async function getAllRequests(request, response) {
    const query = `SELECT * FROM  ${tableName}`
    console.log(query);
    await dal.executeAsync(query, request.body, response).then((data) => {

        response.send(data)

    }, (err) => console.log('err from getAllRequests: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}

module.exports = {
    getAllRequests
}