
const commonService= require("../common/service")
     function executeAsync(sql, values,res) {
        return new Promise((resolve, rejects) => {
            connection.query(sql, values, (err, result) => {
                if (err) {
                    rejects(err);
                    commonService.MySqlError(err,res)
                    return;
                }

                resolve(result);
            });
        });
    }

    module.exports={
        executeAsync
    }
