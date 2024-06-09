# Stage 1: Build the React app
FROM node:20 AS build
LABEL authors="Karaya"
WORKDIR /react-app

# Copy package.json and package-lock.json
COPY ./package*.json /react-app

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . ./

# Build the application
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine
LABEL authors="Karaya"
COPY --from=build /react-app/build /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

