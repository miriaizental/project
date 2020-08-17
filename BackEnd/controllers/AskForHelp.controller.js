const dal= require("../dal/dal.js")
const { successResponse } = require("../common/service.js")



     tableName="ASK_FOR_HELP"
    function CreateNewCall(request,response)
    {
        const query="SELECT * FROM ${tableName}"
       data= dal.executeAsync(query,request.body,response)
        successResponse("create succesfully",data,response)
    }

    module.exports={
CreateNewCall
    }