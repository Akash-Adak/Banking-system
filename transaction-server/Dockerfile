FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/transaction-service-0.0.1-SNAPSHOT.jar transaction-service.jar
RUN mkdir -p /app/config && \
    chmod 755 /app/config
EXPOSE 8084

ENTRYPOINT ["java", "-jar", "transaction-service.jar"]
