#!/bin/bash

# ONLY FOR RASPBIAN
apt-get update

red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

echo "Checking installed dependencies :"

# Install MySQL if not installed
if [ `ls /usr/bin/mysql` != '/usr/bin/mysql' ]
then
	echo "${red} - MySQL not found${reset}"
	echo "${red}   => Install MySQL...${reset}"
	echo "mysql-server mysql-server/root_password password root" | debconf-set-selections
	echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections
	apt-get install -y mysql-server
else
	echo "${green} - MySQL already installed${reset}"
fi

# Install Git if not installed
if [ `ls /usr/bin/git` != '/usr/bin/git' ]
then
	echo "${red} - Git not found${reset}"
	echo "${red}   => Install Git...${reset}"
	apt-get install -y git
else
	echo "${green} - Git already installed${reset}"
fi

# Install wget if not installed
if [ `ls /usr/bin/wget` != '/usr/bin/wget' ]
then
	echo "${red} - wget not found${reset}"
	echo "${red}   => Install wget...${reset}"
	apt-get install -y git
else
	echo "${green} - wget already installed${reset}"
fi

# Install nodejs if not present
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
dpkg -i node_latest_armhf.deb

# Install gulp
npm install -g gulp

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



