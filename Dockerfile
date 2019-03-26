FROM node:8

# Getting port number from parameters
ARG build-env="dev"

# Create app directory
WORKDIR /opt/ecuakaraokeNg

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ENV http_proxy http://proxy-chain.intel.com:911
ENV https_proxy http://proxy-chain.intel.com:911
ENV no_proxy 127.0.0.1,localhost,.intel.com

RUN npm config set registry https://pixi.intel.com/
RUN npm install -g @angular/cli
#RUN npm install

# If you are building your code for production
RUN npm ci --only=production

#EXPOSE 41100

# Bundle app source
COPY . .

CMD [ "npm", "run", "build" ]
