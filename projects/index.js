const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { Project } = require('./schemas.js');

const app = express()
const port = 3000
app.use(bodyParser.json());

// mongodb uri
const uri = process.env.MONGODB_URI;


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/projects', async (req, res) => {
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
})


app.post('/projects', (req, res) => {
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
})

app.put('/projects/:id/join', async (req, res) => {
  try {
    const member = req.body.member;
    const id = req.params.id;
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
    console.log("ERROR: ", e);
  }
})

app.listen(port, async () => {
  await mongoose.connect(uri)
  console.log(`Listening on port ${port}`)
})