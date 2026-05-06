FROM node:20-alpine
<<<<<<< HEAD
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
=======

WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
>>>>>>> 262b48c57091b92905204c03decba36efb600002
