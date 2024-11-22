#!/bin/sh

# Wait for MinIO to be ready
until curl -s http://127.0.0.1:9000/minio/health/live; do
  echo "Waiting for MinIO to be ready..."
  sleep 5
done

# Set up the MinIO client
mc alias set local http://127.0.0.1:9000 minioadmin minioadmin

# Create the bucket
mc mb local/uploads || echo "Bucket 'uploads' already exists"

# Set public policy on the bucket
mc policy set public local/uploads
