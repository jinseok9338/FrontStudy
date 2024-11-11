FROM oven/bun:latest

# Create app directory
RUN mkdir /app
WORKDIR /app

# Copy package files
COPY package.json bun.lockb drizzle.config.ts ./

# Install necessary system dependencies for PostgreSQL (optional, based on your requirements)
RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    postgresql-client \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Bun dependencies
RUN bun install

# Copy the application source code
COPY src ./src
COPY drizzle ./drizzle

ENV JWT_SECRET=secret
ENV JWT_REFRESH_SECRET=refresh_secret
ENV AUTH_SECRET=auth_secret_for_hello_world_test
# Expose the application port
EXPOSE 8000
# run the migration and start the application
CMD bun run migrate && bun run start
