const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { Project } = require('./schemas.js');

const app = express()
const port = 3002
app.use(cors("*"))
app.use(bodyParser.json());

// mongodb uri
const uri = process.env.MONGODB_URI;


app.options('*', cors())
app.options('/', cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.options('/projects', cors())

app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find({})
    const filteredProjects = projects.map((project) => ({
      _id: project.id,
      name: project.name,
      desc: project.desc,
      membersIds: project.membersIds,
      techStack: project.techStack,
      neededFields: project.neededFields
    }))
    res.json({ "projects": filteredProjects })
  } catch (err) {
    res.status(500).send(err.message);
  }
})

app.post('/projects', (req, res) => {
  try {
    const project = new Project(req.body)
    project.save()

    res.status(201).json({
      _id: project.id,
      name: project.name,
      desc: project.desc,
      membersIds: project.membersIds,
      techStack: project.techStack,
      neededFields: project.neededFields
    })
  } catch (err) {
    res.status(500).send(err.message);
  }
})

app.options('/projects/join', cors())
app.post('/projects/join', async (req, res) => {
  try {
    const member = req.body.member;
    const id = req.body.id;
    const project = await Project.findOneAndUpdate({ _id: id }, { $push: { membersIds: member } }, { new: true })
    res.status(201).json({
      _id: project.id,
      name: project.name,
      desc: project.desc,
      membersIds: project.membersIds,
      techStack: project.techStack,
      neededFields: project.neededFields
    })
  } catch (e) {
    res.status(500).send(err.message);
  }
})

app.listen(port, async () => {
  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.error(`Failed to connect to mongodb instance at ${uri}. ${err.message}`)
  }
  console.log(`Connect to mongodb instance at ${uri}`);
  console.log(`Listening on port ${port}`)
})