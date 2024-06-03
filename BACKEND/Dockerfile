FROM node:20.14.0-alpine3.20

WORKDIR /app/back-end

COPY package*.json ./

RUN npm install

COPY . .

# Adicione o script wait-for-it.sh ao contêiner
COPY wait-for-it.sh /app/back-end/wait-for-it.sh

# Defina as permissões para o script wait-for-it.sh
RUN chmod +x /app/back-end/wait-for-it.sh

EXPOSE 3333
EXPOSE 5555

# Use wait-for-it.sh para esperar pelo banco de dados antes de iniciar o backend
ENTRYPOINT ["./wait-for-it.sh", "db:5432", "--", "npm", "run", "dev"]
