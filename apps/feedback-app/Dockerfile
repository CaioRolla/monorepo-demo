FROM node:16-alpine3.11 as node

WORKDIR /usr/src/app

COPY . .

RUN apk update

RUN apk --no-cache add --virtual builds-deps build-base python git

RUN npm config set python /usr/bin/python

RUN npm install

RUN npm install @angular/cli@12 -g

RUN npm install ngx-i18nsupport -g

RUN ng extract-i18n --project=feedback-app --outputPath ./apps/feedback-app/locale

RUN xliffmerge --profile apps/feedback-app/xliffmerge.json

RUN npm run build-feedback-app

RUN apk del builds-deps

FROM nginx:1.13 as prod

COPY --from=node /usr/src/app/dist/apps/feedback-app /usr/share/nginx/html
COPY --from=node /usr/src/app/apps/feedback-app/nginx-custom.conf /etc/nginx/conf.d/default.conf
