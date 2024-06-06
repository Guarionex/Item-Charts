# Stage 1: Build the React app
FROM node:20 AS build
LABEL authors="Karaya"
WORKDIR /react-app

# Copy package.json and package-lock.json
COPY package.json /react-app
COPY package-lock.json /react-app

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . /react-app

# Build the application
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
LABEL authors="Karaya"

# Copy the build output to Nginx
COPY --from=build /react-app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
