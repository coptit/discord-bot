FROM node:19-alpine3.17 as base
WORKDIR /coptit-bot
COPY package.json .
RUN npm i
COPY src ./src/
COPY nodemon.json .
COPY tsconfig.json .

FROM base as production

ENV NODE_PATH=./build
RUN npm run build