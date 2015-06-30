#!/bin/bash

# ONLY FOR RASPBIAN

echo "Plantissime installation :"

echo " - Updating system . . ."
apt-get -qq update

red=`tput setaf 1`
green=`tput setaf 2`
blue=`tput setaf 6`
reset=`tput sgr0`

# Install MySQL if not installed
if mysqld -V 2>/dev/null
then
	echo " - MySQL : ${green}installed${reset}"
else
	echo " - MySQL : ${red}not found${reset}"
	echo "${blue}   => Install MySQL . . .${reset}"
	echo "mysql-server mysql-server/root_password password root" | debconf-set-selections
	echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections
	apt-get -qq -y install mysql-server
	echo "${blue}   => MySQL installed${reset}"
fi

# Install Git if not installed
if git --version 2>/dev/null
then
	echo " - git : ${green}installed${reset}"
else
	echo " - git : ${red}not found${reset}"
	echo "${blue}   => Install Git . . .${reset}"
	apt-get -qq -y install git
	echo "${blue}   => git installed${reset}"
fi

# Install wget if not installed
if wget --version 2>/dev/null
then
	echo " - wget : ${green}installed${reset}"
else
	echo " - wget : ${red}not found${reset}"
	echo "${blue}   => Install wget . . .${reset}"
	apt-get -qq -y install wget
	echo "${blue}   => wget installed${reset}"
fi

# Install nodejs if not present
if node --version 2>/dev/null
then
	echo " - node.js : ${green}installed${reset}"
else
	echo " - node.js : ${red}not found${reset}"
	echo "${blue}   => Install node.js . . .${reset}"

	wget http://node-arm.herokuapp.com/node_latest_armhf.deb
	dpkg -i node_latest_armhf.deb

	echo "${blue}   => node.js installed${reset}"
fi

# Install gulp
if gulp --version 2>/dev/null
then
	echo " - gulp : ${green}installed${reset}"
else
	echo " - gulp : ${blue}installation . . .${reset}"
	npm install -g gulp
	echo "${blue}   => gulp installed${reset}"
fi

# Install forever
if forever --version 2>/dev/null
then
	echo " - forever : ${green}installed${reset}"
else
	echo " - forever : ${blue}installation . . .${reset}"
	npm install -g forever
	echo "${blue}   => forever installed${reset}"
fi
	


# Install plantissime-api
echo " - plantissime-api : ${blue}installation . . .${reset}"
cd  plantissime-api
npm install
cd ..
echo "${blue}   => plantissime-api installed${reset}"


# Install plantissime-client
echo " - plantissime-client : ${blue}installation . . .${reset}"
cd plantissime-client
npm install
echo "${blue}   => plantissime-client installed${reset}"


# Build semantic-ui 
echo " - plantissime-client : ${blue}building . . .${reset}"
cd semantic
gulp build
echo "${blue}   => plantissime-client built${reset}"
cd ..
cd ..

# MySQL
echo " - MySQL database : ${blue}creation . . .${reset}"
service mysql start
mysql --user=root --password=root -e "CREATE DATABASE plantissime;"
service mysql stop