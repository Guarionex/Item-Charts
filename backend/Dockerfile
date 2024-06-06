FROM amazoncorretto:17-alpine
LABEL authors="Karaya"
WORKDIR /app
COPY build.gradle settings.gradle ./
COPY gradlew ./
COPY gradle gradle
RUN ./gradlew build -x test --parallel --configure-on-demand --no-daemon
COPY . .
RUN ./gradlew clean build --parallel --configure-on-demand --no-daemon
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "build/libs/your-app-name.jar"]
