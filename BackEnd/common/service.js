

 function successResponse(message, DATA, res) {
    
    res.status(200).json({
        STATUS: 'SUCCESS',
        MESSAGE: message,
        DATA
    });
}

 function failureResponse(message, DATA, res) {
    res.status(200).json({
        STATUS: 'FAILURE',
        MESSAGE: message,
        DATA
    });
    
}

 function insufficientParameters(res) {
    res.status(401).json({
        STATUS: 'FAILURE',
        MESSAGE: 'Insufficient parameters',
        DATA: {}
    });
}

 function MySqlError(err, res) {
    res.status(500).json({
        STATUS: 'FAILURE',
        MESSAGE: 'DataBase error',
        DATA: err
    })}

    module.exports={
        successResponse,
        failureResponse,
        insufficientParameters,
        MySqlError
    }