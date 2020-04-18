#Base image
FROM node:12
#Set a workdir
WORKDIR /usr/src/app
#Copy package.json and package-lock.json
COPY package*.json ./
#install dependencies
RUN npm ci
#Copy all the code
COPY . .
#expose port
EXPOSE 8080
#run command
RUN ["npm", "run", "dev"]