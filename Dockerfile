# Use official Node.js image as the base
FROM node:current-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json, then install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Define the port the app will run on
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
