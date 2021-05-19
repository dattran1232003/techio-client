FROM node:14.17.0

RUN mkdir -p /client

WORKDIR /client

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

RUN yarn

# Copy source code
COPY . .

# Expose port and start application
EXPOSE 3000
CMD ["yarn", "start"]
