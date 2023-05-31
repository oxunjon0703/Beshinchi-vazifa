require("dotenv").config();
const express = require("express");
const router = require("./routes/index");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(router);

const port = process.env.PORT || 8181;
app.listen(port, () => {
    console.log(port);
});