# Stage 1: Build React app
FROM node:18 AS build
WORKDIR /app
COPY react-app/package*.json ./
RUN npm install
COPY react-app ./
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
