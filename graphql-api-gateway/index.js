const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const axios = require('axios')
const { schema } = require('./schemas.js')

const PROJECTS_API_URL = process.env.PROJECTS_API_URL ?? "http://localhost:3002"
const USERS_API_URL = process.env.PROJECTS_API_URL ?? "http://localhost:3001"
const port = 4000

async function getProjects() {
  const res = await axios.get(`${PROJECTS_API_URL}/projects`)
  const data = res.data
  return data["projects"]
}

async function createProject(data) {
  const res = await axios.post(`${PROJECTS_API_URL}/projects`, data["project"])
  return res.data
}

async function joinProject({ input }) {
  const { id, member } = input
  const res = await axios.put(`${PROJECTS_API_URL}/projects/${id}/join`, {
    member
  })
  return res.data
}

async function getUser({ input }) {
  const params = new URLSearchParams(input)
  const res = await axios.get(`${USERS_API_URL}/user?${params.toString()}`)
  if (res.data)
    return res.data[0]
  return null
}
async function createUser({ input }) {
  const res = await axios.post(`${USERS_API_URL}/user`, input)
  if (res.data)
    return res.data
  return null
}
async function updateUser({ input }) {
  const res = await axios.put(`${USERS_API_URL}/user`, input)
  if (res.data)
    return res.data
  return null
}

const root = {
  hello: () => {
    return 'Hello, world!';
  },
  projects: getProjects,
  createProject: createProject,
  joinProject: joinProject,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser
};

const app = express();

app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: {
      defaultQuery: '{\n  hello\n}\n',
    },
  })
);

app.listen(port, () =>
  console.log(`Running a GraphQL API server at http://localhost:${port}/`)
);

