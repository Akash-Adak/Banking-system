FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/user-service-0.0.1-SNAPSHOT.jar user-service.jar

RUN mkdir -p /app/config && \
    chmod 755 /app/config

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "user-service.jar"]
