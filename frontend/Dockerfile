FROM node:20 as build
LABEL authors="Karaya"
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

RUN echo "Contents of /app after build:" && ls -la /
RUN #echo "Contents of /app/build after build:" && ls -la /app/build

FROM nginx:alpine
LABEL authors="Karaya"
WORKDIR /app
RUN echo "Contents of / before copying:" && ls -la /
RUN echo "Contents of /app before copying:" && ls -la /app
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
