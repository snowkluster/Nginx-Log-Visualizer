FROM node:latest

WORKDIR /var/www/app

COPY . /var/www/app/

RUN npm i

RUN npm run build

CMD [ "npm", "start" ]