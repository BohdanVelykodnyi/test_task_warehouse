const express = require("express");
const config = require("config");
const  mongoose = require("mongoose");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use("/api", require("./routes/keys_routs"));

const PORT = config.get("port") || 5000;
const DB_URL = config.get('mongoURL');

async function start(){
    try {
        await mongoose.connect((DB_URL), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (error) {
        console.log("Server error:", error.message);
        process.exit(1)
    }
}

start();

