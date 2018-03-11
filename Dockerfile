FROM node:alpine
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . /app
RUN npm run prestart:prod
CMD [ "node", "dist/main.js" ]
EXPOSE 8080