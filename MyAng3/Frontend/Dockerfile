FROM stefanscherer/node-windows:6
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#RUN npm install

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

RUN npm install -g @angular/cli@1.7.4

# Bundle app source
COPY . .

EXPOSE 4200
#CMD [ "npm", "start" ]
CMD ng serve -H 0.0.0.0