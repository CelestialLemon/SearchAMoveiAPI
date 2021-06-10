require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');



const UsersRouter = require('./routes/users')
const ListsRouter = require('./routes/lists')

const server = express();

server.use(cors({credentials : true, origin : ['http://localhost:3000','https://search-a-movie-22.herokuapp.com/']}))
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json());

server.use('/users', UsersRouter);
server.use('/lists', ListsRouter)



server.listen(process.env.PORT, () => console.log("listening on PORT : " + process.env.PORT));
