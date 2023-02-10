FROM node:19-alpine3.17
RUN npm i -g ts-node
WORKDIR /coptit-bot
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY cmd ./cmd/
CMD ["ts-node", "./cmd/bot/main.ts"]