# Build Stage
FROM golang:1.23.2-bullseye AS builder

ENV GOPROXY=https://proxy.golang.org
ENV CGO_ENABLED=1
ENV GOOS=linux

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    postgresql-client \
    libpq-dev

# Create the application directory
RUN mkdir -p /src/backend
WORKDIR /src/backend

# Copy module manifests and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Install Buffalo CLI

RUN go install github.com/gobuffalo/cli/cmd/buffalo@latest


# Copy application source code and config files
COPY . .

# Build the application
RUN go get github.com/gobuffalo/buffalo-pop
RUN buffalo pop migrate up

# Final Stage
FROM golang:1.23.2-bullseye

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    postgresql-client \
    libpq5 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create necessary directories
RUN mkdir -p /app/config
# Create necessary directories
RUN mkdir -p /app/config
RUN go install github.com/gobuffalo/cli/cmd/buffalo@latest

# Copy the binary and config files from builder
COPY --from=builder /bin/app /app/app
COPY --from=builder /src/backend/database.yml /app/database.yml
COPY --from=builder /src/backend/config /app/config


# Set environment variables
ENV ADDR=0.0.0.0
ENV PORT=3000
ENV GO_ENV=development

# Expose the port
EXPOSE 3000

# Set the entrypoint
ENTRYPOINT ["/app/app"]