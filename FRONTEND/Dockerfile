FROM node:20.14.0-alpine3.20

WORKDIR /app/front-end

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

ENTRYPOINT [ "npm", "run", "dev" ]
