FROM resin/rpi-raspbian:latest

# Update
RUN sudo apt-get update
RUN sudo apt-get install -y wget

# Copy files
ADD ./frontend /root/app

# Go in directory
WORKDIR /root/app

RUN cat install.sh

# Install
RUN sudo chmod +x ./install.sh
RUN ./install.sh

# Run
RUN sudo chmod +x ./run.sh
RUN ./run.sh

# Open port
EXPOSE 1337

