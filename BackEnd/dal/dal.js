const commonService = require("../common/service")
const sql = require('mssql')

var config = {
    user: `sa`,
    password: '12345',
    server: 'localhost', 
    database: 'volunteering' 
};

function executeAsync(sqlq, values, res) {
    return new Promise(function(resolve, rejects){
        sql.connect(config).then(() => {
            var request = new sql.Request();
            request.query(sqlq,function(err, result){
                if (err) {
                    rejects(err);
                    //commonService.MySqlError(err, res)
                }
                resolve(result);
            })
        })
    });
}


module.exports = {
    executeAsync
}