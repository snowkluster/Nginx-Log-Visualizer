#!/bin/sh

Green="\e[32m"
Red="\033[0;31m"
Blue='\033[0;34m'
NC='\033[0m'

networks=$(sudo docker network ls)

if [ "$1" = "stop" ]; then
    echo "${Red}Stopping API containers and closing all pipelines${NC}"
    sudo docker compose down --rmi local
    pkill -f ./log.sh
    echo "${Red}clearing log files for fresh start${NC}\n"
    truncate -s 0 ./logs/nginx.log
    exit 0
fi

if [ "$1" = "clean" ]; then
  echo "${Blue} Removing <none> images to clean system"
  sudo docker rmi $(sudo docker images -f "dangling=true" -q)
  exit 0
fi

if [ "$(stat -c %A log.sh | sed 's/...\(.\).\+/\1/')" = "x" ]; then
  echo "${Green}Owner has execute permission for log.sh${NC}"
else
  echo "${Red}Adding execute permission to log.sh${NC}"
  chmod +x log.sh
fi

if echo "$networks" | grep -q "nginx_network"; then
  echo "${Green}The 'nginx_network' network already exists."
else
  echo "${Red}The 'nginx_network' network does not exist."
  echo "${Green}creating network"
  sudo docker network create nginx_network
fi

echo "${Green}starting server build"

sudo docker compose build

echo "${Green}starting server in deattached mode"

sudo docker compose up -d

./log.sh &
