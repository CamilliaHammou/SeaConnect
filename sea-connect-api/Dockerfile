FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci --legacy-peer-deps

RUN npm install -g nodemon

RUN npm install -g prisma

COPY . .

RUN prisma generate && echo "Prisma client generated successfully"

CMD ["nodemon", "index.js"]