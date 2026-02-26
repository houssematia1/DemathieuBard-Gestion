# ── Étape 1 : Build Angular ──────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copier package.json en premier pour le cache npm
COPY package*.json ./
RUN npm ci --silent

# Copier les sources et builder
COPY . .
RUN npm run build:prod

# ── Étape 2 : Nginx pour servir l'app ────────────────────────
FROM nginx:1.25-alpine

# Supprimer la config nginx par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copier notre config nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier le build Angular
COPY --from=builder /app/dist/frontend-angular/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
