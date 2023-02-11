FROM node:19-alpine3.17 as base
WORKDIR /coptit-bot
COPY package.json .
RUN npm i
COPY src ./src/
COPY nodemon.json .
COPY tsconfig.json .
RUN npm run build
CMD ["node", "build/main.js"]