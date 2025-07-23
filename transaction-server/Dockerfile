FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY target/transaction-service-0.0.1-SNAPSHOT.jar transaction-service.jar

EXPOSE 8084

ENTRYPOINT ["java", "-jar", "transaction-service.jar"]
