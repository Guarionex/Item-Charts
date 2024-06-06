# Stage 1: Build the application
FROM amazoncorretto:17-alpine AS build
LABEL authors="Karaya"
WORKDIR /spring-boot

# Copy the Gradle wrapper and build files
COPY gradlew /spring-boot
COPY gradle gradle
COPY build.gradle.kts settings.gradle.kts /spring-boot/

# Make the Gradle wrapper executable
RUN chmod +x gradlew

# Build the application without running tests
RUN ./gradlew build -x test --parallel --configure-on-demand --no-daemon

# Copy the source code
COPY src ./src

# Final build to create the application JAR file
RUN ./gradlew build --parallel --configure-on-demand --no-daemon

# Stage 2: Run the application
FROM amazoncorretto:17-alpine
LABEL authors="Karaya"

# Copy the built JAR file from the build stage
COPY --from=build /spring-boot/build/libs/itemapi.jar /app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
