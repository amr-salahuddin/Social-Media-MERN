const mongoose = require("mongoose");
module.exports = id => {
    console.log(id)
    return new mongoose.Types.ObjectId(id)
}