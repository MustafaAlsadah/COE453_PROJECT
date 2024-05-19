const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const axios = require('axios')

const PROJECTS_API_URL = process.env.PROJECTS_API_URL ?? "http://localhost:3000"
const USERS_API_URL = process.env.PROJECTS_API_URL ?? "http://localhost:5000"

/* Query example
query {
  projects {
    name
    members
  }
}
*/

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    projects: [Project]
    getUser: User
  }

  type Mutation {
    createProject(project: CreateProjectInput): Project
    joinProject(input: joinProjectInput): Project
    createUser(input: CreateUserInput): User
    updateUser(input: UpdateUserInput): User
  }

  type Project {
    _id: ID
    name: String
    desc: String
    membersIds: [String]
    techStack: [String]
    neededFields: [String]
  }

  type User {
    email: String!
    name: String 
    phone: String
    fieldsOfExpertise: [String]
  }

  input CreateProjectInput {
    name: String
    desc: String
    membersIds: [String]
  }

  input joinProjectInput {
    id: ID
    member: String
  }

 input GetUserInput {
    name: String 
    email: String
    fieldsOfExpertise: [String]
  } 

  input CreateUserInput {
    email: String!
    name: String 
    phone: String
    fieldsOfExpertise: [String]
  }
`);

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

async function getUser(input) {
  console.log({input});
  const res = await axios.get(`${USERS_API_URL}/getUser`)
  return res.data
}
async function createUser(data) {}
async function updateUser(data) {}

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

app.listen(4000, () =>
  console.log('Running a GraphQL API server at http://localhost:4000/')
);

