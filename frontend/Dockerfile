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

# Exposing the port
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0
ENV WDS_SOCKET_PORT=0

# Starting our application
CMD ["npm", "start"]

