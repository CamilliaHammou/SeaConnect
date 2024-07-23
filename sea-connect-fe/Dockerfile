# Utilise une image de base Node.js
FROM node:alpine

# Définit le répertoire de travail
WORKDIR /usr/src/app

# Copie les fichiers de package
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste de l'application
COPY . .

# Copie le fichier .env dans le conteneur
COPY .env .env

# Construis l'application
RUN npm run build

# Expose le port sur lequel l'application va tourner
EXPOSE 3000

# Démarre l'application
CMD ["npm", "start"]
