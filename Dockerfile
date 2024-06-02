# syntax=docker/dockerfile:1
FROM node:20-alpine AS build
RUN apk add --update --no-cache python3 g++ make
WORKDIR /sbh-fe-ts
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
RUN npm run build-storybook

FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /sbh-fe-ts/dist /usr/share/nginx/html
COPY --from=build /sbh-fe-ts/storybook-static /usr/share/nginx/html/__storybook
