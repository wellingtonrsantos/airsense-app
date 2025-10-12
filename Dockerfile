FROM node:20-slim

# 1. Instalação global do Expo CLI
RUN npm install -g expo-cli && npm install -g @expo/ngrok@^4.1.0

# 2. Define o diretório de trabalho
WORKDIR /app

# 3. Copia APENAS os arquivos de dependência primeiro (para o cache do Docker)
COPY package*.json ./
RUN npm install

# 4. COPIA O RESTO DO PROJETO
COPY . .

# Mapeia a porta padrão do Metro Bundler (8081)
EXPOSE 8081
