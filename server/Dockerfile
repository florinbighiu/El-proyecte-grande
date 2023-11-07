# Stage 1: Build the Maven project
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /server
COPY pom.xml .
COPY src/ src/
RUN mvn clean install -DskipTests

# Stage 2: Run the Spring Boot application
FROM openjdk:17-oracle
WORKDIR /app
COPY --from=build /server/target/elproyectegrande-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
