#!/bin/bash

# Usage info
show_usage() {
	cat << EOF
| Usage:
|   ./planti.sh COMMAND <options>
|	
| Commands:
|   help			display this help and exit
|   install			install plantissime
|   start <options>		start plantissime 
|   stop <options>		stop plantissime
| 
| Options:
|   -a 				for only app
|   -m 				for only mysql
|   -r 				for only receive
EOF
}

show_error() {
	echo "| ERROR	$1"
  echo ""
	show_usage
	exit 1
}

services=()
parseServices() {
	OPTIND=2
	while getopts "mar" opt; do
		case $opt in
			m)
				services[${#services[*]}]=mysql
				;;
			a)
			 	services[${#services[*]}]=app
				;;
			r)
				services[${#services[*]}]=receive
				;;
			*)
				show_error "Unknown option: $opt"
				;;
		esac
	done
	if [ "${#services[*]}" = 0 ]; then
		services[${#services[*]}]=mysql
	 	services[${#services[*]}]=app
		services[${#services[*]}]=receive
	fi
}

# Start
startServices() {
	index=0
	while [ "$index" -lt "${#services[@]}" ]
	do    
	  case ${services[$index]} in
			"mysql")
				startMysql
				;;
			"app")
				startApp
				;;
			"receive")
				startReceive
				;;
		esac
	  let "index = $index + 1"
	done
}

startMysql() {
	echo "| Starting MySQL . . ."
	service mysql start
}

startApp() {
	echo "| Starting Plantissime App . . ."
	forever start -a --uid "planti-app" plantissime-api
}

startReceive() {
	echo "| Starting Receive Script . . ."
	forever start -a --uid "planti-receive" -c ./scripts/receive.py
}

# Stop
stopServices() {
	index=0
	while [ "$index" -lt "${#services[@]}" ]
	do    
	  case ${services[$index]} in
			"mysql")
				stopMysql
				;;
			"app")
				stopApp
				;;
			"receive")
				stopReceive
				;;
		esac
	  let "index = $index + 1"
	done
}

stopMysql() {
	echo "| Stopping MySQL . . ."
	service mysql stop
}

stopApp() {
	echo "| Stopping Plantissime App . . ."
	forever stop "planti-app" 
}

stopReceive() {
	echo "| Stopping Receive Script . . ."
	forever stop "planti-receive" 
}


case $1 in
	"help")
		show_usage
		;;
	"install")
		./scripts/install.sh
		;;
	"start")
		parseServices $@
		startServices
		;;
	"stop")
		parseServices $@
		stopServices
		;;
	*) 
		show_error "Unknown command: $1"
		;;
esac

exit 0