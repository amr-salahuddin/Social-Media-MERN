const jwt = require("jsonwebtoken");
const AppError = require("./appError");
exports.tokenize = (payload)=>{

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    return token;
}

exports.decode = (token)=>{
    let decoded;
    try {
         decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (e) {
        throw new AppError('Invalid token', 401);

    }
    return decoded;
}
