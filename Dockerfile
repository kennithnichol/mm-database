FROM node:12.18.4

WORKDIR /usr/src/mmdb

RUN apt-get update && apt-get install -y netcat

ENV path /usr/srv/mmdb/node_modules/.bin:$path

COPY . /usr/src/mmdb

RUN npm i -g dotenv-cli
RUN npm i

RUN cd public/app && npm i

RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]