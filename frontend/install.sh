echo "--Install node.js"

wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
sudo dpkg -i node_latest_armhf.deb

echo "-- Test node.js"
node -v
npm --version


echo "-- Install nodejs packages"
sudo npm install 

echo "-- Install bower"
sudo npm install -g bower

echo "-- Install bower packages"
bower install --allow-root
