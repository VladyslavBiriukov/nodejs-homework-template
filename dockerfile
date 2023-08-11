FROM node:14.20

WORKDIR /app

COPY . /app

RUN npm install 

EXPOSE 3000

CMD ["npm", "start:dev"]