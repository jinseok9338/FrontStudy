# Makefile for managing PostgreSQL migrations

# Define variables
MIGRATION_DIR=./migrations
DB_NAME=front_study_api_development
DB_USER=postgres
DB_PASS=postgres
DB_HOST=127.0.0.1
DB_PORT=5432

# Migration command
MIGRATE_CMD=migrate

# Ensure that golang-migrate is installed
.PHONY: install
install:
	@echo "Installing golang-migrate..."
	go install github.com/golang-migrate/migrate/v4/cmd/migrate@latest

# Run migrations up
.PHONY: migrate-up
migrate-up: install
	@echo "Running migrations up..."
	$(MIGRATE_CMD) -path $(MIGRATION_DIR) -database "postgres://$(DB_USER):$(DB_PASS)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)?sslmode=disable" up

# Run migrations down
.PHONY: migrate-down
migrate-down: install
	@echo "Running migrations down..."
	$(MIGRATE_CMD) -path $(MIGRATION_DIR) -database "postgres://$(DB_USER):$(DB_PASS)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)?sslmode=disable" down

# Rollback the last migration
.PHONY: rollback
rollback: install
	@echo "Rolling back the last migration..."
	$(MIGRATE_CMD) -path $(MIGRATION_DIR) -database "postgres://$(DB_USER):$(DB_PASS)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)?sslmode=disable" down 1

# List migrations
.PHONY: list-migrations
list-migrations: install
	@echo "Listing all migrations..."
	$(MIGRATE_CMD) -path $(MIGRATION_DIR) -database "postgres://$(DB_USER):$(DB_PASS)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)?sslmode=disable" version

# Clean up the binary (if needed)
.PHONY: clean
clean:
	@echo "Cleaning up..."

# Help command
.PHONY: help
help:
	@echo "Makefile for PostgreSQL migrations"
	@echo "Available commands:"
	@echo "  install             - Install golang-migrate"
	@echo "  migrate-up         - Run all migrations up"
	@echo "  migrate-down       - Run all migrations down"
	@echo "  rollback           - Rollback the last migration"
	@echo "  list-migrations    - List all migrations"
	@echo "  clean              - Clean up (if needed)"
	@echo "  help               - Show this help message"
