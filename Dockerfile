FROM node:19-alpine3.17 as base
RUN npm install -g npm@9.5.1

RUN mkdir /coptit-bot

WORKDIR /coptit-bot

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY src ./src/
COPY nodemon.json .
COPY tsconfig.json .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build

ENTRYPOINT [ "npm", "start" ]