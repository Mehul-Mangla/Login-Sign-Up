


require("dotenv").config()

const MAPI_KEY = process.env.API_KEY
const MLIST_ID = process.env.LIST_ID
const MAPI_SERVER = process.env.API_SERVER

const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    const email = req.body.email;
    const pswd = req.body.pswd;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    EMAIL: email,
                    PSWD: pswd
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://" + MAPI_SERVER + ".api.mailchimp.com/3.0/lists/" + MLIST_ID;

    const options = {
        method: "POST",
        auth: "Mehul:" + MAPI_KEY
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.send(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});


// e0d1182c086b1cf140fcad1e03790b91-us21

<<<<<<< HEAD
// 411443fed0
=======
// 411443fed0
>>>>>>> 57e76dd24655974b3b1229e5e6ab42495ff72ae4
