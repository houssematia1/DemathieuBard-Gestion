# ── Stage 1 : Build ──────────────────────────────────────────
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -q
COPY src ./src
RUN mvn package -DskipTests -q

# ── Stage 2 : Run ────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN addgroup -S btp && adduser -S btp -G btp
COPY --from=build /app/target/*.jar app.jar
RUN mkdir -p /app/uploads && chown btp:btp /app/uploads
USER btp
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
