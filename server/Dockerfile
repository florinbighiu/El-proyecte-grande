# Stage 1: Build the Spring Boot jar (JDK 21 — matches pom.xml java.version)
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /server
COPY pom.xml .
COPY src/ src/
RUN mvn -q clean package -DskipTests

# Stage 2: Run the app on a slim JRE 21
FROM eclipse-temurin:21-jre
WORKDIR /server
COPY --from=build /server/target/*.jar app.jar
# Render injects PORT at runtime; Spring binds to it via server.port=${PORT:8080}.
EXPOSE 8080
CMD ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]
