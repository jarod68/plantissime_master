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

# Copy files app
ADD . /root/app

# Install API part
WORKDIR /root/app/plantissime-api
RUN npm install

# Install API part
WORKDIR /root/app/plantissime-client
RUN npm install

WORKDIR /root/app/plantissime-client/semantic
RUN gulp build

# Run
WORKDIR /root/app
RUN sudo chmod +x ./run.sh

# Open port
EXPOSE 3000

CMD ["./run.sh"]
