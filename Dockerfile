FROM node:20.16.0-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

EXPOSE ${APP_PORT}

CMD ["npm", "run", "start:prod"]
