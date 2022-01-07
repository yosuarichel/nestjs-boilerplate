FROM node:14.18-alpine3.12
WORKDIR /app
COPY package.json ./
COPY . /app
# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++ \
    && apk add git \
    && npm install \
    && apk del build-dependencies
CMD [ "node", "src/main.js"]
EXPOSE 15555
