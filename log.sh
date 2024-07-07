#!/usr/bin/env bash

Green="\e[32m"
Red="\033[0;31m"

mapfile -t NGINX_CONTAINERS < <(sudo docker ps --filter ancestor=nginx:latest --quiet) 
if (( ${#NGINX_CONTAINERS[@]} == 0 )); then
    echo "${Red}No NGINX container found."
    exit 1
fi

if (( ${#NGINX_CONTAINERS[@]} != 1 )); then
    echo "${Green}Multiple NGINX containers detected. Please specify which one to tail:"
    printf "%s\n" "${NGINX_CONTAINERS[@]}"
    exit 1
fi

NGINX_CONTAINER=${NGINX_CONTAINERS[0]}
LOG_FILE=./logs/nginx.log
touch "${LOG_FILE}"
chmod o+r "${LOG_FILE}"

sudo docker logs -f --tail="0" "${NGINX_CONTAINER}" | stdbuf -oL tee -a "${LOG_FILE}" > /dev/null