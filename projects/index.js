const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { Project } = require('schemas.js');

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
  res.json({ "projects": projects })
})


app.post('/projects', (req, res) => {
  const project = new Project(req.body)
  project.save()
  res.status(201).json({ "project": project })
})

app.put('/projects/:id/join', async (req, res) => {
  try {
    const member = req.body.member;
    const id = req.params.id;
    const project = await Project.findOneAndUpdate({ _id: id }, { $push: { members: member } }, { new: true })
    res.status(201).json({ "project": project })
  } catch (e) {
    console.log("ERROR: ", e);
  }
})

app.listen(port, async () => {
  await mongoose.connect(uri)
  console.log(`Listening on port ${port}`)
})

