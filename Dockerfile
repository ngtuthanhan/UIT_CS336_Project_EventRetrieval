FROM node:16

WORKDIR /app

COPY ./ /app/
RUN npm install -g npm@9.5.0
RUN npm install

CMD ["npm", "start"]
