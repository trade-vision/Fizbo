FROM node:10

RUN mkdir -p /usr/Phzbo/
WORKDIR /usr/Phzbo

COPY package*.json /usr/Phzbo/
RUN npm install

COPY . .
CMD ["npm", "start"]

