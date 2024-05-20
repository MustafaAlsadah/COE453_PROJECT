# Project assembler

This is a simple webapp that helps developers find people to collabrate with on sideprojects

## Architecture

- Projects service: a microservice for querying and creating projects
- Users service: a serverless function service for storing user and their info
- Rest api gateway: provides a REST api interface for interacting with projects and users service
- Graphql api gateway: provides a Graphql interface for interacting with projects and users service
- Frontend: single page application in react.js

