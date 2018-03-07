# FROM node:9.7.1 as builder
# RUN mkdir /usr/src/app
# WORKDIR /usr/src/app
# ENV PATH /usr/src/app/node_modules/.bin:$PATH
# COPY package.json /usr/src/app/package.json
# RUN npm install --silent
# COPY . /usr/src/app
# RUN npm run prestart:prod

# FROM node:9.7.1-alpine
# RUN mkdir /usr/dist
# COPY --from=builder /usr/src/app /usr/app
# EXPOSE 8080
# CMD [ "node", "/usr/app/dist/main.js" ]

FROM node:alpine
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . /app
RUN npm run prestart:prod
CMD [ "node", "dist/main.js" ]
EXPOSE 8080