const dal = require("../dal/dal.js")
const { successResponse } = require("../common/service.js")


async function CreateNewCall(request, response) {
    const call = request.body

    const query = `INSERT INTO AsksForHelp_tbl VALUES('${call.requestDetails}','${call.password}','${call.city}','${call.street}','${call.time}',0)`
    await dal.executeAsync(query, request.body, response).then((data) => {
        response.send()
    }, (err) => console.log('err from CreateNewCall: ' + err))
        .catch((err) => console.log('err from catch: ' + err))

}



module.exports = {
    CreateNewCall,
}