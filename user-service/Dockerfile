FROM openjdk:21


WORKDIR /app

COPY target/user-service-0.0.1-SNAPSHOT.jar user-service.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "user-service.jar"]
