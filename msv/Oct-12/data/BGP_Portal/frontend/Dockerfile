FROM node:latest

RUN mkdir /frontend
WORKDIR /frontend

# Copy package.json and package-lock.json separately
COPY package.json .
# COPY package-lock.json .

# Install dependencies
RUN apt-get update && apt-get install -y vim && rm -rf /var/lib/apt/lists/*
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 5174
EXPOSE 5174

# Start the application
CMD ["npm", "run", "dev"]
