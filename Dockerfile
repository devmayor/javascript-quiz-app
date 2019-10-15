FROM node

# RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
COPY . /usr/src/app

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm" , "start" ]

# docker build -t nodetodoapi

# docker run -p 5000:3000 nodetodoapi

