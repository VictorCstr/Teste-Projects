FROM node:16-slim as base
WORKDIR /code
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
RUN apt-get update -y && apt-get install -y openssl
RUN npm install 
COPY prisma/ /code/prisma
COPY src/ /code/src 
RUN npx prisma generate
CMD npx prisma migrate dev && npm run dev

FROM base as production
ENV NODE_PATH=./build
RUN npm run build
