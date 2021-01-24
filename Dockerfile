FROM node:10.16.3-alpine AS build-node-modules

WORKDIR /app

RUN apk update && apk upgrade && apk add --no-cache \
  build-base \
  python \
  cyrus-sasl-dev \
  tini

COPY package.json .
COPY package-lock.json .

RUN NODE_ENV=development npm ci

# ======================================================================================================================
FROM node:10.16.3-alpine AS build-npm

WORKDIR /app

COPY --from=build-node-modules /app/node_modules node_modules

COPY common common
COPY components components
COPY pages pages
COPY public public
COPY styles styles

COPY .babelrc .
COPY .eslintrc .
COPY package.json .

RUN NODE_ENV=production npm run build

# ======================================================================================================================
FROM node:10.16.0-alpine AS run

EXPOSE 3000

WORKDIR /app

ENV TINI_VERSION v0.18.0

COPY --from=build-node-modules /sbin/tini /sbin/tini
COPY --from=build-node-modules /app/node_modules node_modules
COPY --from=build-npm /app/.next .next

COPY common common
COPY components components
COPY pages pages
COPY public public
COPY styles styles

COPY .babelrc .
COPY package.json .


# ======================================================================================================================
FROM run AS test

WORKDIR /app

COPY tests tests

COPY jest.setup.js .