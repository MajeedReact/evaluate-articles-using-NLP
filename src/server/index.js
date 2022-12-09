var path = require("path");
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

console.log(`Your API key is ${process.env.API_KEY}`);

const app = express();
app.use(cors());

// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

const callingApi = async (req, res) => {
  const apiUrl = "https://api.meaningcloud.com/sentiment-2.1";

  //get the url that was entered by the end user
  const url = req.body.url;

  const formdata = new FormData();
  //api passed from enviorment file
  formdata.append("key", process.env.API_KEY);
  //passing the input url from the user
  formdata.append("url", url);
  formdata.append("lang", "en");

  //construct object for api call
  const requestOptions = {
    body: formdata,
    method: "POST",
  };
  try {
    console.log(requestOptions);
    const response = await fetch(apiUrl, requestOptions);
    const result = await response.json();

    console.log(result);
    res.send(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
app.post("/analysis", callingApi);

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log(`App running on http://localhost:${8081}`);
});
