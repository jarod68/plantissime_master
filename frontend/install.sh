#!/bin/sh

echo "---------------------------"
echo "-- Starting installation --"
echo "NOTE : Before that MySQL and Git must be installed"

echo "--------------------"
echo "--Install node.js --"
wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
dpkg -i node_latest_armhf.deb

echo "-------------------"
echo "-- Install bower --"
npm install -g bower

echo "------------------"
echo "-- Test node.js --"
node -v
npm --version

echo "---------------------------------"
echo "-- Install nodejs dependencies --"
npm install 

echo "--------------------------------"
echo "-- Install bower dependencies --"
bower install --allow-root


echo "-- => Installation completed <= --"
echo "----------------------------------"
