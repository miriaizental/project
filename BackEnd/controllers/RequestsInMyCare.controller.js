const dal = require("../dal/dal.js")
const { successResponse, failureResponse } = require("../common/service.js")


async function GetVolunteerRequests(request, response) {
    console.log(request.query.password);
    const query = `select Users_tbl.userName,AsksForHelp_tbl.requestDetails from AsksForHelp_tbl 
    join Users_tbl on AsksForHelp_tbl.password=Users_tbl.password where AsksForHelp_tbl.volunteerpassword='${request.query.password}'`
    console.log(query);
    await dal.executeAsync(query, request.body, response).then((data) => {

        response.send(data)

    }, (err) => console.log('err from GetVolunteerRequests: ' + err))
        .catch((err) => console.log('err from catch: ' + err))
}

module.exports = {
    GetVolunteerRequests
}