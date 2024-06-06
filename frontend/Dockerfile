FROM node:20 as build
LABEL authors="Karaya"
WORKDIR /app
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM nginx:alpine
LABEL authors="Karaya"
RUN ls -la /
RUN ls -la /app
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
