# Use the official OpenJDK image as base
FROM eclipse-temurin:17-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy Maven wrapper and pom.xml first (for faster builds)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (cached layer)
RUN ./mvnw dependency:go-offline

# Now copy the rest of the project
COPY src ./src

# Build the application (skip tests for faster build)
RUN ./mvnw clean package -DskipTests

# Run the Spring Boot app
CMD ["java", "-jar", "target/*.jar"]

# Expose the app port
EXPOSE 8080
