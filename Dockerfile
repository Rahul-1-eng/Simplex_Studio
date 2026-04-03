FROM node:22-bookworm

RUN apt-get update && apt-get install -y g++ make && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package.json ./
COPY client/package.json client/package.json
COPY server/package.json server/package.json
RUN npm install

COPY . .
RUN npm run build

EXPOSE 8787
CMD ["npm", "run", "start"]
