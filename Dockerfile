# ── Etapa 1: Build ──────────────────────────────────────────
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copiar wrapper y pom primero (aprovecha caché de capas)
COPY mvnw mvnw.cmd ./
COPY .mvn .mvn
COPY pom.xml ./

# Descargar dependencias sin compilar el código fuente
RUN ./mvnw dependency:go-offline -q

# Copiar el código fuente y construir el JAR
COPY src ./src
RUN ./mvnw package -DskipTests -q

# ── Etapa 2: Runtime ─────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copiar solo el JAR generado
COPY --from=build /app/target/*.jar app.jar

# Render asigna el puerto via variable de entorno PORT
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=${PORT}"]
