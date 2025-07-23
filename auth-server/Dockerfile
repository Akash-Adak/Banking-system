FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY target/auth-server-0.0.1-SNAPSHOT.jar auth-service.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "auth-service.jar"]
