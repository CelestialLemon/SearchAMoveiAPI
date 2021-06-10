const dbConnection = require('./models/db.connect')
const UserModel = require('./models/user.model.js');

const newUser = UserModel({ username : "Ashutosh", password : "Nightmare22"});
newUser.save();