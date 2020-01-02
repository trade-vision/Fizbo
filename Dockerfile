FROM node:10

RUN mkdir -p /usr/Phzbo/
WORKDIR /usr/Phzbo

COPY package*.json /usr/Phzbo/
RUN npm install

EXPOSE 8080

COPY . .
CMD ["npm", "start"]


