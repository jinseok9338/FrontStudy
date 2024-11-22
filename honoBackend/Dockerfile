# Use the official Node.js 20 image
FROM node:20

# Create app directory
RUN mkdir /app
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml drizzle.config.ts tsconfig.json ./
RUN npm install -g pnpm

# Install necessary system dependencies for PostgreSQL (optional, based on your requirements)
RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    postgresql-client \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js dependencies
RUN pnpm install

# Copy the application source code
COPY src ./src
COPY drizzle ./drizzle

# Set environment variables
ENV JWT_SECRET=secret
ENV JWT_REFRESH_SECRET=refresh_secret
ENV AUTH_SECRET=auth_secret_for_hello_world_test

# Expose the application port
EXPOSE 8000

# Run the migration and start the application
CMD pnpm run migrate && pnpm run start
