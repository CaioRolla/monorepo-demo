FROM node:16-alpine3.11 as build

WORKDIR /usr/src/app

COPY . .

RUN apk update

RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm config set python /usr/bin/python

RUN npm install --force

RUN npm run build-feedback-server

RUN apk del builds-deps

# This is execution only!
FROM node:16-alpine3.11
COPY --from=build /usr/src/app /usr/src/app

WORKDIR /usr/src/app

ENV PORT=5555

EXPOSE 5555

CMD ["node", "dist/apps/feedback-server/main"]