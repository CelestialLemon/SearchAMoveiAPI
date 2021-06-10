require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');



const UsersRouter = require('./routes/users')

const server = express();

server.use(cors({credentials : true, origin : 'http://localhost:3000'}))
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json());

server.use('/users', UsersRouter);




server.listen(process.env.PORT, () => console.log("listening on PORT : " + process.env.PORT));
