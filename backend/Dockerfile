FROM amazoncorretto:17-alpine AS build
LABEL authors="Karaya"
VOLUME /tmp
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]