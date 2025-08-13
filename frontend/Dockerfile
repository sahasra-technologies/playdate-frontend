# -------- Build Stage --------
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files and build the app
COPY . .
RUN npm run build

# -------- Production Stage --------
FROM nginx:alpine

# Remove default config and copy custom one if you have it
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the Vite production build from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Mount certs
VOLUME ["/etc/letsencrypt"]

# Expose port 80
EXPOSE 80
EXPOSE 443

# Start nginx (this is the default command, so not strictly necessary)
CMD ["nginx", "-g", "daemon off;"]

