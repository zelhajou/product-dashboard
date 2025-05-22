PROJECT_NAME = product-dashboard
DOCKER_CMD = docker compose

# Help command
help:
	@echo "Available commands:"
	@echo "  make setup   - Build and install dependencies"
	@echo "  make dev     - Start development server"
	@echo "  make shell   - Access container shell"
	@echo "  make stop    - Stop containers"
	@echo "  make clean   - Remove containers"

# Setup project
setup:
	${DOCKER_CMD} build
	${DOCKER_CMD} run --rm app npm install
	@echo "✅ Setup complete! Run 'make dev' to start"

# Start development
dev:
	@echo "🚀 Starting at http://localhost:5173"
	${DOCKER_CMD} up

# Access shell
shell:
	${DOCKER_CMD} exec app sh

# Stop containers
stop:
	${DOCKER_CMD} down

# Clean up
clean:
	${DOCKER_CMD} down -v

# Install packages (usage: make install pkg=package-name)
install:
	${DOCKER_CMD} run --rm app npm install $(pkg)

.PHONY: help setup dev shell stop clean install