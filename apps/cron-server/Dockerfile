FROM node:16-alpine3.11 as build

WORKDIR /usr/src/app

COPY . .

RUN apk update

RUN apk --no-cache add --virtual builds-deps build-base python

# RUN apk add --no-cache \
#       chromium \
#       nss \
#       freetype \
#       harfbuzz \
#       ca-certificates \
#       ttf-freefont \
#       nodejs \
#       yarn

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Puppeteer v10.0.0 works with Chromium 92.
# RUN yarn add puppeteer@10.0.0

RUN npm config set python /usr/bin/python

RUN npm install

RUN npm run build-cron-server

RUN apk del builds-deps

# Add dependencies
# RUN apk add curl bash --no-cache

# Install node-prune
# RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

# remove development dependencies
# RUN npm prune --production

# run node prune
# RUN /usr/local/bin/node-prune

# This is execution only!
FROM node:16-alpine3.11
COPY --from=build /usr/src/app /usr/src/app

WORKDIR /usr/src/app

ENV PORT=5555

EXPOSE 5555

CMD ["node", "dist/apps/cron-server/main"]