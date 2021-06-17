const express = require('express')
const router = express.Router();

const UserModel = require('../models/user.model')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

const authenticateToken = (req, res, next) =>
{
    if(req.headers && req.headers['authorization'])
    {
        console.log("token found");
        const token = req.headers['authorization'].split(' ')[1];
       
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>
        {
            if(err)
            {
              
                res.status(401).send({"loggedIn" : false, "msg" : "Invalid token"});
                console.log("Invalid token")
                return;
            }

            console.log("token valid");
            req.user = user;
            next();
        }
        )
    }
    else
    {
        //token wasn't sent
        res.status(401).send({"msg" : "token wasn't sent"});
        console.log("No token recieved");
        return;
    }
}


//add functions

router.post("/addlist",authenticateToken, async (req, res) =>
{
    console.log(req.user);
    console.log("procceding to add list...");
    const userToUpdate = await UserModel.findOne({"username" : req.user.username});
    let listAlreadyExists = false;
    userToUpdate.lists.map(list =>
        {
            if(list.listName === req.body.listName)
            {
                listAlreadyExists = true;
               res.send({"msg" : "list already exists"});
            }

        });

    if(!listAlreadyExists)
    {
        userToUpdate.lists.push({"listName" : req.body.listName, "shows" : []});

        const updatedUser = await UserModel.findOneAndUpdate({ "username" : req.user.username}, userToUpdate, {useFindAndModify : false});
        console.log(updatedUser);
        res.status(201).send({"msg" : "list added"})
    }
})

router.post("/addshowtolist", authenticateToken, async (req, res, next) =>
{
    console.log("adding show to the list");

    let showAlreadyExists = false;
    const userToUpdate = await UserModel.findOne({"username" : req.user.username});
    userToUpdate.lists.map(list =>
        {
            if(list.listName === req.body.listName)
            {
                list.shows.map(show =>
                    {
                        if(show.showId === req.body.showId)
                        {
                            showAlreadyExists = true;
                        }
                    })

                if(!showAlreadyExists)
                list.shows.push({"showId" : req.body.showId, "progress" : req.body.progress, "episodesWatched" : "0x0"});
            }

        });


    if(!showAlreadyExists)
    {
        const updatedUser = await UserModel.findOneAndUpdate({"username" : req.user.username}, userToUpdate, {useFindAndModify : false});
        console.log(updatedUser);
        res.status(200).send({"msg" : "show added in list successfully"});
    }
    else
    {
        res.send({"msg" : "show already exists in this list"});
    }
})

//update functions

router.put('/updateProgress', authenticateToken, async (req, res) =>
{
    console.log("Request to update progress at " + new Date());
    const userToUpdate = await UserModel.findOne({"username" : req.user.username});
    console.log(userToUpdate.lists);
    userToUpdate.lists.map(list =>
        {
            if(list.listName === req.body.listName)
            {
                list.shows.map(show =>
                    {
                        if(show.showId === req.body.showId)
                        {
                            show.progress = req.body.progress;
                            show.episodesWatched = req.body.episodesWatched;
                        }
                    })
            }
            
        });

    
    const updatedUser = await UserModel.findOneAndUpdate({"username" : req.user.username}, userToUpdate, {useFindAndModify : false});
    res.send({"msg" : "modified"});
})


//delete functions
router.post("/deletelist", authenticateToken, async (req, res) =>
{
    console.log("Request to delete list at " + new Date());
    const userToUpdate = await UserModel.findOne({"username" : req.user.username});
    userToUpdate.lists = userToUpdate.lists.filter(list => list.listName !== req.body.listName);
    console.log("list to delete " + req.body.listName); 

    const updatedUser = await UserModel.findOneAndUpdate({"username" : req.user.username}, userToUpdate, {useFindAndModify : false});

    res.send({"msg" : "list deleted successfully"});
})

router.post("/deleteshowfromlist", authenticateToken, async (req, res) =>
{
    console.log("Request to delete show from list at " + new Date());
    console.log(req.body);

    const userToUpdate = await UserModel.findOne({"username" : req.user.username});

    userToUpdate.lists.map(list =>
        {
            if(list.listName === req.body.listName)
            {
                list.shows = list.shows.filter(show => show.showId !== req.body.showId);
            }
            
        });
    const updatedUser = await UserModel.findOneAndUpdate({"username" : req.user.username}, userToUpdate, {useFindAndModify : false})
    res.send({"msg" : "show deleted"});
})


//get functions
router.get("/userlists", authenticateToken, async (req, res) =>
{
    console.log("Request for userlists at " + new Date());
    const userData = await UserModel.findOne({"username" : req.user.username});
    if(userData)
    {
        res.send(userData.lists);
    }
    else
    {
        res.send({"msg" : "not found"});
    }
})





module.exports = router