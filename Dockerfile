FROM node:16-alpine as BUILD_IMAGE
WORKDIR /app

COPY ./package*.json ./

RUN npm ci && npm cache clean --force

COPY src/ src/
COPY .babelrc ./

RUN npm run build
RUN npm prune --production

FROM nginx:alpine-slim

COPY --from=BUILD_IMAGE /app/dist /usr/share/nginx/html
