const app = require("./app");
mongoose = require("mongoose");

const port = process.env.PORT || 3000;

let uri = process.env.MONGODB_URI;

uri = uri.replace("<password>", process.env.MONGODB_PASSWORD);
console.log(uri);
mongoose
    .connect(uri,
        {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        })
    .then(() => {
        console.log("Connected to Database");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB:", err);
    });


