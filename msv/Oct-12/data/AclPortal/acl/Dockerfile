FROM node:latest

RUN mkdir /frontend
WORKDIR /frontend

# Copy package.json and package-lock.json separately
COPY package.json .
COPY package-lock.json .

# Set proxy environment variables (if needed)
ENV http_proxy=http://10.73.211.145:8080/
ENV https_proxy=http://10.73.211.145:8080/

# Install dependencies
RUN apt-get update && apt-get install -y vim
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 5174
EXPOSE 5174

# Start the application
CMD ["npm", "run", "dev"]
