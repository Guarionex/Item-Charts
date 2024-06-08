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
ENV HOST=a7f06cbfd91954b0cbee1be17310c5c6-552271409.us-west-2.elb.amazonaws.com

# Starting our application
CMD ["npm", "start"]

