FROM node:16.2.0

LABEL version="1.0"
LABEL description="Back-end part of Issue Tracker App"
LABEL maintainer = ["yanstoyanov2012@gmail.com"]

WORKDIR /server

COPY package*.json ./
COPY .env ./
RUN npm ci -qy

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
