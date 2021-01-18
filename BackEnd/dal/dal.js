const commonService = require("../common/service")
const sql = require('mssql')

var config = {
    user: `sa`,
    password: 'a12345',
    server: 'localhost',
    database: 'volunteering'
};

function executeAsync(query, values, res) {
    return new Promise(function (resolve, reject) {
        sql.connect(config).then(() => {
            var request = new sql.Request();
            request.query(query,function(err, result) {
                if (err) {
                    reject(err);
                    //commonService.MySqlError(err, res)
                }
                else {
                    resolve(result);
                }
            })
        })

    })
}


module.exports = {
    executeAsync
}