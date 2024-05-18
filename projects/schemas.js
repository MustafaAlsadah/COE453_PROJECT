const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },    
    members: {
        type: [String],
        required: true
    },
    techStack: [String],
    neededFields: [String],

}, { collection:"projects" });

const Project = mongoose.model("Project", ProjectSchema)
module.exports.Project = Project
