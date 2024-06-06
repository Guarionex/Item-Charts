FROM amazoncorretto:17-alpine AS build
LABEL authors="Karaya"
WORKDIR /app
COPY gradle gradle
COPY gradlew .
COPY build.gradle.kts settings.gradle.kts ./
RUN chmod +x ./gradlew
RUN ./gradlew dependencies
COPY src src
RUN ./gradlew build -x test

FROM amazoncorretto:17-alpine
WORKDIR /app
RUN echo "Contents of /app before copying:" && ls -la /app/build
COPY --from=build /app/build/libs/item-api.jar ./app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
