LABEL authors="Karaya"
FROM amazoncorretto:17-alpine AS build
WORKDIR /app
COPY gradle gradle
COPY gradlew .
COPY build.gradle.kts settings.gradle.kts .
RUN chmod +x ./gradlew
RUN ./gradlew dependencies
COPY src src
RUN ./gradlew build -x test

FROM amazoncorretto:17-alpine
WORKDIR /app
COPY --from=build /app/build/libs/your-app-name.jar ./app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
