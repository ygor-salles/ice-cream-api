FROM node:latest

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 4000

CMD ["yarn", "start"]