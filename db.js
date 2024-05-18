const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sadah9999:7oVWWGjB2jvDAlg0@cluster0.bmt0cj9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const User = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    phone: String,
    projects: Array,
    fieldsOfExpertise: Array
});

const Project = new mongoose.Schema({
    name: String,
    description: String,
    techStack: Array,
    neededFields: Array,
    projectId: {
        type: String,
        unique: true,
        required: true
    },
    participants: Array
});

const UserModel = mongoose.model('User', User);
const ProjectModel = mongoose.model('Project', Project);


module.exports = { UserModel, ProjectModel };