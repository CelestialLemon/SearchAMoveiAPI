require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');



const UsersRouter = require('./routes/users')
const ListsRouter = require('./routes/lists')
const ShowsRouter = require('./routes/shows')

const server = express();

server.use(cors({credentials : true, origin : '*'}))
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json());

server.use('/users', UsersRouter);
server.use('/lists', ListsRouter);
server.use('/shows', ShowsRouter);



server.listen(process.env.PORT, () => console.log("listening on PORT : " + process.env.PORT));
