# Use official Java 17 image
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml for caching
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make mvnw executable
RUN chmod +x mvnw

# Download dependencies (cached layer)
RUN ./mvnw dependency:go-offline

# Copy source code
COPY src ./src

# Build project (skip tests)
RUN ./mvnw clean package -DskipTests

# Expose port (optional, documentation)
EXPOSE 8080

# Run Spring Boot with Render's dynamic PORT
CMD ["sh", "-c", "java -jar target/task-tracker-0.0.1-SNAPSHOT.jar --server.port=$PORT"]

######