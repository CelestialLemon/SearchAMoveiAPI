require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();

server.use(cors({credentials : true, origin : 'http://localhost:3000'}))
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json());

server.get("/", (req, res) => {
    res.send("Hello");
})

server.get("/kira", (req, res) =>
{
    res.send("this is kira");
})

server.listen(process.env.PORT, () => console.log("listening on PORT : " + process.env.PORT));
