# Stage 1: Build the application
FROM amazoncorretto:17-alpine AS build
LABEL authors="Karaya"
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=target/itemapi.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
