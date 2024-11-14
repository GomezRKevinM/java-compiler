# Usar la imagen oficial de Node.js
FROM node:16

# Crear y usar el directorio de la app
WORKDIR /usr/src/app

# Copiar los archivos necesarios
COPY package*.json ./
RUN npm install

# Copiar el código fuente del proyecto
COPY . .

# Exponer el puerto del servidor
EXPOSE 3001

# Comando para iniciar el servidor
CMD ["node", "server.js"]
