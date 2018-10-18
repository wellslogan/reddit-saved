# Dockerfile (tag: v3)
FROM node:10.12
RUN npm install webpack webpack-cli -g

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN cp -a /tmp/node_modules /usr/src/app/
RUN webpack --config ./webpack.prod.js
ENV NODE_ENV=production
ENV PORT=4000
CMD [ "/usr/local/bin/node", "./app.js" ]
EXPOSE 4000