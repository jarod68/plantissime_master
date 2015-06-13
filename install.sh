#!/bin/bash

# ONLY FOR RASPBIAN
echo "Updating system..."
apt-get -qq update

red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

echo "Checking installed dependencies :"

# Install MySQL if not installed
if ls /usr/bin/mysql 2>/dev/null
then
	echo "${green} - MySQL already installed${reset}"
else
	echo "${red} - MySQL not found${reset}"
	echo "${red}   => Install MySQL . . .${reset}"
	echo "mysql-server mysql-server/root_password password root" | debconf-set-selections
	echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections
	apt-get -qq -y install mysql-server
	echo "${green}   => MySQL installed${reset}"
fi

# Install Git if not installed
if ls /usr/bin/git 2>/dev/null
then
	echo "${green} - Git already installed${reset}"
else
	echo "${red} - Git not found${reset}"
	echo "${red}   => Install Git . . .${reset}"
	apt-get -qq -y install git
	echo "${green}   => Git installed${reset}"
fi

# Install wget if not installed
if ls /usr/bin/wget 2>/dev/null
then
	echo "${green} - wget already installed${reset}"
else
	echo "${red} - wget not found${reset}"
	echo "${red}   => Install wget . . .${reset}"
	apt-get -qq -y install wget
	echo "${green}   => wget installed${reset}"
fi

# Install nodejs if not present
if ls /usr/local/bin/node
then 
	echo "${green} - node.js already installed${reset}"
else
	echo "${red} - node.js not found${reset}"
	echo "${red}   => Install node.js . . .${reset}"

	wget http://node-arm.herokuapp.com/node_latest_armhf.deb
	dpkg -i node_latest_armhf.deb

	echo "${green}   => node.js installed${reset}"
fi

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
cd semantic
gulp build
cd ..
cd ..



