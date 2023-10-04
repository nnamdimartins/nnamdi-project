# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install your application's dependencies
RUN npm install

# Copy the rest of your application's source code to the working directory
COPY . .

# Expose the port your application will run on (change this if needed)
EXPOSE 3001

# Define the command to run your application
CMD ["node", "app.js"]
