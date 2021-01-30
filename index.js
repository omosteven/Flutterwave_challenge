const express = require("express"); // import the express js

const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
// initiate the express js

// Import the Controllers End Points as Routes
const RuleValidationRoute = require("./routes/RuleValidationRoute");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.use(cors());

// Handle Cors Policy here -- Start

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader("Access-Control-Allow-Credentials", "true");

    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");

    res.setHeader("Access-Control-Allow-Headers", "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    next();
});

// Handle Cors Policy here -- End

app.use("/", RuleValidationRoute);


// app.use("*", (req, res) => {
//     res.status(404).send({message: "rule is required.", status: "error", data: null});
// });

const server = app.listen(process.env.PORT, (params) => {
    host = server.address().address;

    port = process.env.PORT === undefined ? server.address().port : process.env.PORT

    console.log("Server running at " + port);
});
