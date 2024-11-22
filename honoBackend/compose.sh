# Get the local IPv4 address on macOS using 'ifconfig' and filter out IPv6
export MINIO_HOST=$(ifconfig en0 | grep inet | grep -v inet6 | awk '{print $2}' | head -n 1)

# Run Docker Compose with the updated environment variable
docker-compose up -d