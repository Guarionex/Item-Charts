FROM gradle:7.5.1-jdk17-alpine AS build
LABEL authors="Karaya"
WORKDIR /app
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle
RUN ./gradlew build || return 0
COPY . .
RUN ./gradlew build

FROM amazoncorretto:17-alpine
LABEL authors="Karaya"
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
