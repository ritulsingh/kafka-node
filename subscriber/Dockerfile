FROM node:16

# Create app directory
WORKDIR D:/Mtalkz/workingapp

# Install app dependencies
COPY package*.json ./

# Bundle app source
RUN npm install
COPY . .

CMD [ "node", "wait-for-it.js" ]