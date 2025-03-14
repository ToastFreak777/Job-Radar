# syntax=docker/dockerfile:1

ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN mkdir -p /app/.next && chown node:node /app/.next

RUN chown -R node:node .

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
