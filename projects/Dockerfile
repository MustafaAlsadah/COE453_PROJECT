FROM node:latest

COPY package.json /app/
COPY index.js /app/

WORKDIR /app
RUN npm install
EXPOSE 5000
CMD ["node", "index.js"]
