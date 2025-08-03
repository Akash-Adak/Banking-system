FROM eclipse-temurin:17-jdk-alpine


WORKDIR /app

COPY target/account-service-0.0.1-SNAPSHOT.jar account-service.jar
RUN mkdir -p /app/config && \
    chmod 755 /app/config
EXPOSE 8083

ENTRYPOINT ["java", "-jar", "account-service.jar"]
