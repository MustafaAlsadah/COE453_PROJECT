const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
    projects: [Project]
    getUser(input: GetUserInput): User
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
    email: String
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

    input UpdateUserInput {
    email: String!
    name: String 
    phone: String
    fieldsOfExpertise: [String]
  }
`);

module.exports.schema = schema