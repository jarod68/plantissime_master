#!/bin/bash

# Get Composer
curl -sS https://getcomposer.org/installer | php

# Install dependencies with composer
php composer.phar install 

# Remove composer
rm composer.phar