const jwt = require("jsonwebtoken");
exports.tokenize = (payload)=>{

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    return token;
}

exports.decode = (token)=>{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
}
