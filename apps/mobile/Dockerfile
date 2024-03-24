FROM node:20

RUN mkdir mobile
WORKDIR /mobile

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install --global pnpm
RUN pnpm install

VOLUME ["/mobile/node_modules"]

COPY . .

EXPOSE 8081

CMD ["pnpm", "dev"]
