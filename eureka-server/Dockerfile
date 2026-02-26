# ---- Étape 1 : Build Maven ----
FROM maven:3.9.5-eclipse-temurin-17 AS builder

WORKDIR /app

# Copier le pom.xml en premier pour bénéficier du cache des dépendances
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copier les sources et compiler
COPY src ./src
RUN mvn clean package -DskipTests

# ---- Étape 2 : Image de runtime légère ----
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "app.jar"]
