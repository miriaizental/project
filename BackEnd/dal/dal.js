const commonService = require("../common/service")
const sql = require('mssql')

var config = {
    driver: "msnodesqlv8",
    server: 'DESKTOP-0TQ54N9\LOCAL',
    database: 'volunteering',
    "options": {
        "encrypt": false,
        "enableArithAbort": true,
        trustedConnection: true,
        useUTC: true
    },
};



function executeAsync(sqlq, values, res) {
    return new Promise(function(resolve, rejects){
        sql.connect(config).then(() => {
            var request = new sql.Request();
            request.query(sqlq, values, (err, result) => {
                if (err) {
                    rejects(err);
                    commonService.MySqlError(err, res)
                    return;
                }
                resolve(result);
            })
        })
    });
}


module.exports = {
    executeAsync
}