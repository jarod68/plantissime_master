#!/bin/sh

# MySQL
service mysql start
mysql --user=root --password=root -e "CREATE DATABASE plantissime2;"

# Build App


# Run app
#node app.js --port=1667 --prod
#sails lift --prod
node app.js
