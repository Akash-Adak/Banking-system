FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Install curl
RUN apk add --no-cache curl

# Copy the jar
COPY target/eureka-server-0.0.1-SNAPSHOT.jar eureka-server.jar

# Expose Eureka port
EXPOSE 8761

# Run the application
ENTRYPOINT ["java", "-jar", "eureka-server.jar"]
