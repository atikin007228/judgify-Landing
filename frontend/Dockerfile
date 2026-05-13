FROM node:20-alpine

WORKDIR /app

<<<<<<< HEAD
COPY package*.json /app/
RUN npm install

COPY . /app

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
=======
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
