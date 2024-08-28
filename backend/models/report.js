
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    reportedModel: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    attachment: {
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    issuedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
   reportedId:{
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
   }
})

reportSchema.index({ createdAt: -1 });


module.exports= mongoose.model("Report", reportSchema)