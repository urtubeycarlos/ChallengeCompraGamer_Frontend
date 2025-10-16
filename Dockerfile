# Etapa 1: Build de Angular
FROM node:22 AS builder
WORKDIR /app

# Copiamos los archivos del proyecto
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servidor NGINX
FROM nginx:stable-alpine
# Copiamos los archivos compilados al directorio público de NGINX
COPY --from=builder /app/dist/challenge-compra-gamer-frontend/browser /usr/share/nginx/html

# Configuración personalizada de NGINX para Angular routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]