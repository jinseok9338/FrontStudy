FROM node:20-slim

# Create app directory
RUN mkdir /app
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm
RUN npm install -g ts-node
RUN npm install node-gyp -g
RUN npm install bcrypt -g


# Copy package files
COPY package.json pnpm-lock.yaml tsconfig.json drizzle.config.ts ./

# Install necessary system dependencies for PostgreSQL (optional, based on your requirements)
RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    postgresql-client \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies
RUN pnpm install

# Copy the application source code
COPY src ./src
COPY drizzle ./drizzle

# Expose the application port
EXPOSE 8000

# run the migration and start the application
CMD ["sh", "-c", "pnpm run migrate && pnpm run start"]
