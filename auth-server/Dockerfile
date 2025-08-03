FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/auth-server-0.0.1-SNAPSHOT.jar auth-service.jar

# Create directories for keys
RUN mkdir -p /etc/secrets && \
    mkdir -p /app/config && \
    chmod 700 /etc/secrets

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "auth-service.jar"]