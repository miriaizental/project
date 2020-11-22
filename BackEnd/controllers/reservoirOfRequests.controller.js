const dal = require("../dal/dal.js")
const tableName = 'AsksForHelp_tbl'

async function GetAllRequests(request, response) {
    const query = `select requestNumber,requestDetails,AsksForHelp_tbl.password,AsksForHelp_tbl.city,street,time,requestGranted,userName,phone,restriction
     from ${tableName} join Users_tbl on Users_tbl.password=AsksForHelp_tbl.password`
    
    await dal.executeAsync(query, request.body, response).then((data) => {

        response.send(data)

    }, (err) => console.log('err from getAllRequests: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}


module.exports = {
    GetAllRequests
}