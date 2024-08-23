FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

COPY .env.production .env

RUN npx prisma generate

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]