# Dockerfile
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/loan-service-0.0.1-SNAPSHOT.jar loan-service.jar

EXPOSE 8085

ENTRYPOINT ["java","-jar","loan-service.jar"]
