# project/react-app/Dockerfile
FROM node:18 AS build
WORKDIR /app
COPY react-app/package*.json ./
RUN npm install
COPY ./react-app .
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
