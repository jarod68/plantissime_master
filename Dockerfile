FROM resin/rpi-raspbian:latest


# Update system
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

# Install gulp
RUN npm install -g gulp


# Install API part
ADD plantissime-api /root/app/plantissime-api
WORKDIR /root/app/plantissime-api
RUN npm install


# Install Client part
ADD plantissime-client /root/app/plantissime-client
WORKDIR /root/app/plantissime-client
RUN mkdir -p /root/app/plantissime-client/semantic
RUN npm install


# Install semantic
WORKDIR /root/app/plantissime-client/semantic
RUN ls
#RUN gulp build


# Add run script
ADD run.sh /root/app/run.sh
WORKDIR /root/app
RUN sudo chmod +x ./run.sh


# Set port to expose
EXPOSE 3000
# and start command
CMD ["./run.sh"]