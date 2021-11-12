FROM node:lts

# Create app directory
RUN mkdir /app
WORKDIR /app
ADD . /app

# Install app dependencies
COPY package.json package-lock.json /app/

# Run npm and install modules
RUN npm install

# Expose application port
EXPOSE 3020

# Run start command
CMD ["npm", "run", "dev"]