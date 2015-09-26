#!/bin/bash

# Get latest version
git pull

# Update plantissime-api 
echo " - plantissime-api : ${blue}updating . . .${reset}"
cd  plantissime-api

## Update dependences
npm install

cd ..
echo "${blue}   => plantissime-api updated${reset}"


# Update plantissime-api 
echo " - plantissime-client : ${blue}updating . . .${reset}"
cd plantissime-client

## Update dependences
npm install

## Build
gulp build

cd ..
echo "${blue}   => plantissime-client updated${reset}"