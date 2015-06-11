#!/bin/bash

# MySQL
service mysql start
mysql --user=root --password=root -e "CREATE DATABASE plantissime;"

# Start app
node plantissime-api