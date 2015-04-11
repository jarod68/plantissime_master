FROM resin/rpi-raspbian:latest

# Update
RUN sudo apt-get update
RUN sudo apt-get install -y wget

# Install MySQL
RUN echo "mysql-server mysql-server/root_password password root" | debconf-set-selections
RUN echo "mysql-server mysql-server/root_password_again password root" | debconf-set-selections
RUN apt-get install -y mysql-server

# Install Git
RUN apt-get install -y git

# Install node.js
RUN wget http://node-arm.herokuapp.com/node_latest_armhf.deb
RUN dpkg -i node_latest_armhf.deb

RUN npm install -g bower

# Copy files app
ADD ./frontend /root/app
WORKDIR /root/app

# Install node.js dependencies
RUN npm install


# Install bower dependencies
RUN bower install --allow-root

# 
RUN sudo chmod +x ./run.sh

# Open port
EXPOSE 1337

CMD ["./run.sh"]
