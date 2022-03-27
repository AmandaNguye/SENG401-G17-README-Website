FROM node:17

WORKDIR /usr/src/app

ENV PORT 5001

COPY package*.json ./

RUN npm install --production

COPY . ./

CMD ["npm", "start"]
