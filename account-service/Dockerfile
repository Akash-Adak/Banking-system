FROM openjdk:21


WORKDIR /app

COPY target/account-service-0.0.1-SNAPSHOT.jar account-service.jar

EXPOSE 8083

ENTRYPOINT ["java", "-jar", "account-service.jar"]
