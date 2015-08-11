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
|   update			update plantissime
|   start <options>		start plantissime 
|   stop <options>		stop plantissime
|   restart <options>		restart plantissime
|   status			status
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
services_parse() {
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
services_start() {
	index=0
	while [ "$index" -lt "${#services[@]}" ]
	do    
	  case ${services[$index]} in
			"mysql")
				echo "| Starting MySQL . . ."
				service mysql start
				;;
			"app")
				echo "| Starting Plantissime App . . ."
				forever start -a --uid "planti-app" plantissime-api
				;;
			"receive")
				echo "| Starting Receive Script . . ."
				forever start -a --uid "planti-receive" -c python scripts/receive.py
				;;
		esac
	  let "index = $index + 1"
	done
}

# Stop
services_stop() {
	index=0
	while [ "$index" -lt "${#services[@]}" ]
	do    
	  case ${services[$index]} in
			"mysql")
				echo "| Stopping MySQL . . ."
				service mysql stop
				;;
			"app")
				echo "| Stopping Plantissime App . . ."
				forever stop "planti-app" 
				;;
			"receive")
				echo "| Stopping Receive Script . . ."
				forever stop "planti-receive" 
				;;
		esac
	  let "index = $index + 1"
	done
}

# Status
services_restart() {
	index=0
	while [ "$index" -lt "${#services[@]}" ]
	do    
	  case ${services[$index]} in
			"mysql")
				echo "| Restarting MySQL . . ."
				service mysql stop
				service mysql start
				;;
			"app")
				echo "| Restarting Plantissime App . . ."
				`forever restart -s "planti-app"` 2>/dev/null
				;;
			"receive")
				echo "| Restarting Receive Script . . ."
				`forever restart "planti-receive"` 2>/dev/null
				;;
		esac
	  let "index = $index + 1"
	done
}

services_status() {
	echo "| Plantissime status :"
	`forever columns set uid uptime logfile` 2>/dev/null
	forever list
	`forever columns reset` 2>/dev/null
}

case $1 in
	"help")
		show_usage
		;;
	"install")
		./scripts/install.sh
		;;
	"update")
		./scripts/update.sh
		;;
	"start")
		services_parse $@
		services_start
		;;
	"stop")
		services_parse $@
		services_stop
		;;	
	"restart")
		services_parse $@
		services_restart
		;;
	"status")
		services_status
		;;
	*) 
		show_error "Unknown command: $1"
		;;
esac

exit 0