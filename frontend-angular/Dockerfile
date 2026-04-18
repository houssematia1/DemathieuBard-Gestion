# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Installer Angular CLI globalement (clé du fix)
RUN npm install -g @angular/cli

COPY package*.json ./

RUN npm install

COPY . .

RUN ng build --configuration production

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]