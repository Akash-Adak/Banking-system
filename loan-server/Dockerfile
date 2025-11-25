FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/loan-server-0.0.1-SNAPSHOT.jar loan-server.jar

RUN mkdir -p /app/config && \
    chmod 755 /app/config

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "loan-server.jar"]
