# Use a specific Node.js version for consistency
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json for dependency installation
COPY package.json ./

# Install production dependencies only
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the environment variable for the build
ARG NEXT_PUBLIC_BACKEND_URL=http://backend-service:8080
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

# ARG NEXT_PUBLIC_BACKEND_URL
# ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
# docker build --build-arg NEXT_PUBLIC_BACKEND_URL=http://backend-service:8080 -t your-image-name .
 
 

 
 
 
 

 
 
