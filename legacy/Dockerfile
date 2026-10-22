# Multi-stage build para Spring Boot
FROM maven:3.9-eclipse-temurin-17-alpine AS build

WORKDIR /app

# Copiar solo los archivos necesarios para el build
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
COPY src src

# Hacer el build
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copiar el JAR del stage anterior
COPY --from=build /app/target/cumple-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto (Render lo asigna dinámicamente)
EXPOSE 8080

# Variables de entorno por defecto
ENV SPRING_PROFILES_ACTIVE=prod
ENV JAVA_TOOL_OPTIONS="-Xmx512m -Xms256m"

# Ejecutar la aplicación
# Usar $PORT de Render si está disponible, sino 8080
ENTRYPOINT ["sh", "-c", "java $JAVA_TOOL_OPTIONS -Dserver.port=${PORT:-8080} -jar app.jar"]
