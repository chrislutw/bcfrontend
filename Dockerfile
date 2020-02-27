FROM node:12.13.0-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
RUN apk update && apk upgrade && apk add git

# ONBUILD COPY . /app
COPY . .
RUN npm install && npm cache clean --force

ENV DEPLOY_ENV staging
ENV HOST 0.0.0.0

# Build app
RUN npm run build:staging

EXPOSE 3000

# start command
CMD [ "npm", "run", "start:staging" ]
