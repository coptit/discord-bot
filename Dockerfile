FROM node:19-alpine3.17

RUN mkdir /coptit-bot

WORKDIR /coptit-bot

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY src ./src/
COPY nodemon.json .
COPY tsconfig.json .

RUN npm run build

CMD ["node", "build/main.js"]