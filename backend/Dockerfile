# Use an official Gradle image to create a build artifact.
FROM gradle:7.4.1-jdk17 AS build
WORKDIR /home/gradle/project
COPY --chown=gradle:gradle . /home/gradle/project
RUN gradle build --no-daemon

# Use Amazon Corretto 17 as the base image
FROM amazoncorretto:17
# Set the working directory
WORKDIR /app
# Copy the jar file from the build stage
COPY --from=build /home/gradle/project/build/libs/*.jar app.jar
# Expose the port the app runs on
EXPOSE 8080
# Run the jar file
ENTRYPOINT ["java","-jar","app.jar"]
