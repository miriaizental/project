const dal = require("../dal/dal.js")
const { successResponse } = require("../common/service.js")

tableName = "AsksForHelp_tbl"
function CreateNewCall(request, response) {
    //CheckPassword(request, response)
    const query = `INSERT INTO ${tableName} VALUES('${request.body.requestDetails}','${request.body.password}',0)`
    const data = dal.executeAsync(query, request.body,response).then((val)=>{
        console.log('state:'+val); 
    })
    if (data!=undefined) {
        console.log('result: '+data.value);
        successResponse("create succesfully", data, response)
    }
}



module.exports = {
    CreateNewCall,
}