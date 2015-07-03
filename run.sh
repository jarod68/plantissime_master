#!/bin/bash

# MySQL
service mysql start

# Start app
forever start plantissime-api

# Start receiving script
forever start receive.py