FROM node:20.14.0-alpine3.20

WORKDIR /app/back-end

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

ENTRYPOINT [ "npm", "run", "dev" ]