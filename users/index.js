const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { User } = require('./schemas.js');

const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

const port = 3001
const uri = process.env.MONGODB_URI

app.options('/', cors())
app.get("/", async (req, res) => {
    res.json({ "msg": "PONG" })
})


app.options('/user', cors())
app.get("/user", async (req, res) => {

    const { name, email, fieldsOfExpertise, id } = req.query;

    try {
        //fetch user using either name or email or fieldsOfExpertise
        //create query 
        let query = {};
        let byIdQuery;
        if (id) {
            byIdQuery = { _id: id };
        }
        if (name) {
            query.name = name;
        }
        if (email) {
            query.email = email;
        }
        if (fieldsOfExpertise && fieldsOfExpertise.length > 0) {
            query.fieldsOfExpertise = { $in: fieldsOfExpertise };
        }

        const user = await User.find(byIdQuery ? byIdQuery : query)
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        statusCode = "500";
        res.status(statusCode).send(err.message);
    }
});

app.post("/user", async (req, res) => {
    const { name, email, phone, projects, fieldsOfExpertise } = req.body;

    if (!email) {
        return res.status(400).send("Email is required");
    }

    try {
        const user = new User({
            name,
            email,
            phone,
            projects,
            fieldsOfExpertise
        });
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        console.log("ERROR!");
        res.status(500).send(err.message);
    }
});

app.put("/user", async (req, res) => {
    const { name, email, phone, projects, fieldsOfExpertise } = req.body;

    if (!email) {
        return res.status(400).send("Email is required");
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        user.name = name;
        user.phone = phone;
        user.projects = projects;
        user.fieldsOfExpertise = [...user.fieldsOfExpertise, ...fieldsOfExpertise];

        await user.save();
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(port, async () => {
    try {
        await mongoose.connect(uri);
    } catch (err) {
        console.error(`Failed to connect to mongodb instance at ${uri}. ${err.message}`)
    }
    console.log(`Connect to mongodb instance at ${uri}`);
    console.log(`Server is running on port ${port}`);
});


module.exports = { app }
