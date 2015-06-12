#!/bin/bash

# ONLY FOR RASPBIAN

# Install nodejs if not present
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
dpkg -i node_latest_armhf.deb

# Install gulp
RUN npm install -g gulp

# Install plantissime-api
cd  plantissime-api
## Install npm packages
npm install
cd ..

# Install plantissime-client
#mkdir -p plantissime-client/semantic
cd plantissime-client
## Install npm packages
npm install
## Build semantic-ui 
#TODO
#RUN gulp build
cd ..



