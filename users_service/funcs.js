
const { UserModel, ProjectModel } = require('../db.js');
const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.get("/getUser", async (req, res) => {

    const { name, email, fieldsOfExpertise } = req.query;

    try {
        //fetch user using either name or email or fieldsOfExpertise
        //create query 
        let query = {};
        if (name) {
            query.name = name;
        }
        if (email) {
            query.email = email;
        }
        if (fieldsOfExpertise && fieldsOfExpertise.length > 0) {
            query.fieldsOfExpertise = { $in: fieldsOfExpertise };
        }

        const user = await UserModel.find(query)
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

app.post("/createUser", async (req, res) => {
    const { name, email, phone, projects, fieldsOfExpertise } = req.body;
    console.log(req.body);

    if (!email) {
        return res.status(400).send("Email is required");
    }

    try {
        const user = new UserModel({
            name,
            email,
            phone,
            projects,
            fieldsOfExpertise
        });
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put("/editUser", async (req, res) => {
    const { name, email, phone, projects, fieldsOfExpertise } = req.body;
    console.log(req.body);

    if (!email) {
        return res.status(400).send("Email is required");
    }

    try {
        const user = await UserModel.findOne({ email });
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