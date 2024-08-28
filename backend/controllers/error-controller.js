const AppError = require("../utils/appError");


function sendErrorDev(err, res) {
    res.json({
        status: err.status,
        mzzzzessage: err.message,
        // error: err,
        // stack: err.stack
    })
}

function sendErrorProd(err, res) {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }
}

function handleDuplicateFieldsDB(error) {
    //get keyvalue keyname
    //get key name from error.keyValue
    const duplicatedName=Object.keys(error.keyValue)[0];
    const message = `Duplicate field value entered: ${duplicatedName}.`;
    return new AppError(message, 400);
}

module.exports = (err, req, res, next) => {
    err.statusCode= err.statusCode || 500;
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        let error = {...err};
        if(err.code === 11000) error = handleDuplicateFieldsDB(err);
        sendErrorProd(error, res)
    }
}