FROM node:17

WORKDIR /usr/src/app

ENV PORT=5005

ENV USER_URL="https://user-service-gqqz6zzd4a-uc.a.run.app"

ENV POST_URL="https://post-service-gqqz6zzd4a-uc.a.run.app"

ENV COMMENT_URL="https://comment-service-gqqz6zzd4a-uc.a.run.app"

COPY package*.json ./

RUN npm install --production

COPY . ./

CMD ["npm", "start"]
