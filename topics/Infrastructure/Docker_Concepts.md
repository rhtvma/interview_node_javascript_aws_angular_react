# Docker - Complete Interview Preparation Guide

A comprehensive guide covering essential Docker concepts for interview preparation.

---

## Table of Contents

1. [What is Docker?](#what-is-docker)
2. [Docker Architecture](#docker-architecture)
3. [Docker Components](#docker-components)
4. [Docker Images](#docker-images)
5. [Docker Containers](#docker-containers)
6. [Dockerfile](#dockerfile)
7. [Docker Compose](#docker-compose)
8. [Docker Networking](#docker-networking)
9. [Docker Volumes](#docker-volumes)
10. [Docker Commands](#docker-commands)
11. [Docker Best Practices](#docker-best-practices)
12. [Common Interview Questions](#common-interview-questions)

---

## What is Docker?

**Docker** is an open-source platform that automates the deployment, scaling, and management of applications using containerization technology.

### Key Features

- **Containerization**: Package applications with dependencies
- **Portability**: Run anywhere (dev, test, prod)
- **Isolation**: Applications run in isolated environments
- **Efficiency**: Lightweight compared to VMs
- **Scalability**: Easy to scale up/down

### Docker vs Virtual Machines

| Feature | Docker Container | Virtual Machine |
|---------|-----------------|-----------------|
| **Size** | Lightweight (MBs) | Heavy (GBs) |
| **Startup** | Seconds | Minutes |
| **Performance** | Near-native | Overhead |
| **Isolation** | Process-level | Hardware-level |
| **OS** | Shares host OS | Separate OS |
| **Resource Usage** | Minimal | High |

### Benefits of Docker

✅ **Consistency**: Same environment everywhere
✅ **Speed**: Fast deployment and startup
✅ **Portability**: Run on any platform
✅ **Scalability**: Easy horizontal scaling
✅ **Efficiency**: Better resource utilization
✅ **Version Control**: Image versioning
✅ **Microservices**: Perfect for microservices architecture

---

## Docker Architecture

### Components

```
┌─────────────────────────────────────────┐
│           Docker Client                  │
│         (docker commands)                │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         Docker Daemon (dockerd)          │
│  ┌────────────────────────────────────┐ │
│  │         Docker Engine              │ │
│  │  ┌──────────┐  ┌──────────────┐  │ │
│  │  │ Images   │  │  Containers  │  │ │
│  │  └──────────┘  └──────────────┘  │ │
│  │  ┌──────────┐  ┌──────────────┐  │ │
│  │  │ Networks │  │   Volumes    │  │ │
│  │  └──────────┘  └──────────────┘  │ │
│  └────────────────────────────────────┘ │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         Docker Registry                  │
│         (Docker Hub, etc.)               │
└─────────────────────────────────────────┘
```

### Architecture Layers

1. **Docker Client**: CLI interface for users
2. **Docker Daemon**: Background service managing containers
3. **Docker Registry**: Repository for Docker images
4. **Docker Objects**: Images, containers, networks, volumes

---

## Docker Components

### 1. Docker Engine

Core component that runs and manages containers.

**Components:**
- **Docker Daemon** (dockerd): Background service
- **REST API**: Interface for communication
- **Docker CLI**: Command-line interface

### 2. Docker Images

Read-only templates used to create containers.

**Characteristics:**
- Layered file system
- Immutable
- Shareable
- Versioned with tags

### 3. Docker Containers

Running instances of Docker images.

**Characteristics:**
- Isolated processes
- Writable layer on top of image
- Can be started, stopped, deleted
- Ephemeral by default

### 4. Docker Registry

Repository for storing and distributing images.

**Types:**
- **Docker Hub**: Public registry
- **Private Registry**: Self-hosted
- **Cloud Registries**: AWS ECR, Google GCR, Azure ACR

---

## Docker Images

### Image Layers

```
┌─────────────────────────┐
│   Application Layer     │  ← Writable
├─────────────────────────┤
│   Dependencies Layer    │  ← Read-only
├─────────────────────────┤
│   Runtime Layer         │  ← Read-only
├─────────────────────────┤
│   Base OS Layer         │  ← Read-only
└─────────────────────────┘
```

### Working with Images

```bash
# Pull image from registry
docker pull nginx:latest

# List images
docker images

# Build image from Dockerfile
docker build -t myapp:1.0 .

# Tag image
docker tag myapp:1.0 username/myapp:1.0

# Push image to registry
docker push username/myapp:1.0

# Remove image
docker rmi myapp:1.0

# Remove unused images
docker image prune

# Inspect image
docker inspect nginx:latest

# View image history
docker history nginx:latest
```

### Image Naming Convention

```
[registry/][username/]repository[:tag]

Examples:
nginx                          # Official image, latest tag
nginx:1.21                     # Specific version
myusername/myapp:1.0          # User image with tag
registry.example.com/app:prod  # Private registry
```

---

## Docker Containers

### Container Lifecycle

```
┌─────────┐
│ Created │
└────┬────┘
     │ docker start
     ▼
┌─────────┐
│ Running │ ◄──┐
└────┬────┘    │
     │         │ docker restart
     │ docker stop/kill
     ▼         │
┌─────────┐    │
│ Stopped │ ───┘
└────┬────┘
     │ docker rm
     ▼
┌─────────┐
│ Removed │
└─────────┘
```

### Container Operations

```bash
# Run container
docker run nginx

# Run with options
docker run -d -p 8080:80 --name webserver nginx

# List running containers
docker ps

# List all containers
docker ps -a

# Stop container
docker stop webserver

# Start container
docker start webserver

# Restart container
docker restart webserver

# Remove container
docker rm webserver

# Remove running container (force)
docker rm -f webserver

# Execute command in container
docker exec -it webserver bash

# View logs
docker logs webserver

# Follow logs
docker logs -f webserver

# View container stats
docker stats webserver

# Inspect container
docker inspect webserver

# Copy files to/from container
docker cp file.txt webserver:/app/
docker cp webserver:/app/file.txt ./
```

### Run Options

```bash
# Detached mode
docker run -d nginx

# Interactive terminal
docker run -it ubuntu bash

# Port mapping
docker run -p 8080:80 nginx

# Volume mounting
docker run -v /host/path:/container/path nginx

# Environment variables
docker run -e KEY=value nginx

# Container name
docker run --name mycontainer nginx

# Restart policy
docker run --restart=always nginx

# Resource limits
docker run --memory="512m" --cpus="1.0" nginx

# Network
docker run --network=mynetwork nginx

# Remove after exit
docker run --rm nginx
```

---

## Dockerfile

### Dockerfile Structure

```dockerfile
# Base image
FROM node:16-alpine

# Metadata
LABEL maintainer="your.email@example.com"
LABEL version="1.0"

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Define volume
VOLUME ["/app/data"]

# Run as non-root user
USER node

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node healthcheck.js

# Default command
CMD ["node", "server.js"]
```

### Dockerfile Instructions

| Instruction | Description | Example |
|-------------|-------------|---------|
| `FROM` | Base image | `FROM node:16` |
| `WORKDIR` | Set working directory | `WORKDIR /app` |
| `COPY` | Copy files | `COPY . .` |
| `ADD` | Copy with extraction | `ADD file.tar.gz /app` |
| `RUN` | Execute command | `RUN npm install` |
| `CMD` | Default command | `CMD ["npm", "start"]` |
| `ENTRYPOINT` | Main command | `ENTRYPOINT ["node"]` |
| `EXPOSE` | Document port | `EXPOSE 3000` |
| `ENV` | Set environment | `ENV NODE_ENV=prod` |
| `ARG` | Build argument | `ARG VERSION=1.0` |
| `VOLUME` | Define volume | `VOLUME ["/data"]` |
| `USER` | Set user | `USER node` |
| `LABEL` | Add metadata | `LABEL version="1.0"` |

### Multi-Stage Build Example

```dockerfile
# Build stage
FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Best Practices for Dockerfile

1. ✅ Use official base images
2. ✅ Use specific tags (not `latest`)
3. ✅ Minimize layers
4. ✅ Use multi-stage builds
5. ✅ Order instructions by change frequency
6. ✅ Use .dockerignore
7. ✅ Don't run as root
8. ✅ Use COPY instead of ADD
9. ✅ Combine RUN commands
10. ✅ Clean up in same layer

### .dockerignore Example

```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.DS_Store
*.log
dist
coverage
```

---

## Docker Compose

### What is Docker Compose?

Tool for defining and running multi-container Docker applications using YAML files.

### docker-compose.yml Example

```yaml
version: '3.8'

services:
  # Web application
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db
      - redis
    volumes:
      - ./src:/app/src
    networks:
      - app-network
    restart: unless-stopped

  # Database
  db:
    image: postgres:13
    environment:
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=myapp
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - app-network
    restart: unless-stopped

  # Cache
  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"
    networks:
      - app-network
    restart: unless-stopped

volumes:
  db-data:

networks:
  app-network:
    driver: bridge
```

### Docker Compose Commands

```bash
# Start services
docker-compose up

# Start in detached mode
docker-compose up -d

# Build and start
docker-compose up --build

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs

# Follow logs
docker-compose logs -f

# List services
docker-compose ps

# Execute command in service
docker-compose exec web bash

# Scale services
docker-compose up -d --scale web=3

# Restart services
docker-compose restart

# Pull images
docker-compose pull

# Validate compose file
docker-compose config
```

---

## Docker Networking

### Network Types

1. **Bridge** (default): Isolated network for containers
2. **Host**: Use host's network directly
3. **None**: No networking
4. **Overlay**: Multi-host networking
5. **Macvlan**: Assign MAC address to container

### Network Commands

```bash
# List networks
docker network ls

# Create network
docker network create mynetwork

# Create with driver
docker network create --driver bridge mynetwork

# Inspect network
docker network inspect mynetwork

# Connect container to network
docker network connect mynetwork container1

# Disconnect container
docker network disconnect mynetwork container1

# Remove network
docker network rm mynetwork

# Remove unused networks
docker network prune
```

### Container Communication

```bash
# Run containers on same network
docker network create app-net
docker run -d --name db --network app-net postgres
docker run -d --name web --network app-net myapp

# Containers can communicate using names
# web can connect to db using hostname "db"
```

---

## Docker Volumes

### Volume Types

1. **Named Volumes**: Managed by Docker
2. **Bind Mounts**: Mount host directory
3. **tmpfs Mounts**: Temporary in-memory storage

### Volume Commands

```bash
# Create volume
docker volume create myvolume

# List volumes
docker volume ls

# Inspect volume
docker volume inspect myvolume

# Remove volume
docker volume rm myvolume

# Remove unused volumes
docker volume prune

# Use volume in container
docker run -v myvolume:/app/data nginx

# Bind mount
docker run -v /host/path:/container/path nginx

# Read-only mount
docker run -v myvolume:/app/data:ro nginx
```

### Volume Examples

```bash
# Named volume
docker run -d \
  --name db \
  -v postgres-data:/var/lib/postgresql/data \
  postgres

# Bind mount (development)
docker run -d \
  --name web \
  -v $(pwd)/src:/app/src \
  myapp

# tmpfs mount (temporary data)
docker run -d \
  --name cache \
  --tmpfs /tmp \
  redis
```

---

## Docker Commands

### Essential Commands

```bash
# System information
docker version
docker info
docker system df

# Clean up
docker system prune          # Remove unused data
docker system prune -a       # Remove all unused data
docker container prune       # Remove stopped containers
docker image prune          # Remove unused images
docker volume prune         # Remove unused volumes
docker network prune        # Remove unused networks

# Build and run
docker build -t myapp .
docker run -d -p 8080:80 myapp

# Debugging
docker logs container_name
docker exec -it container_name bash
docker inspect container_name
docker top container_name
docker stats

# Export/Import
docker save -o myapp.tar myapp:latest
docker load -i myapp.tar
docker export container_name > container.tar
docker import container.tar myapp:imported
```

---

## Docker Best Practices

### Image Best Practices

1. ✅ **Use official base images**
   ```dockerfile
   FROM node:16-alpine
   ```

2. ✅ **Use specific tags**
   ```dockerfile
   FROM node:16.14.0-alpine3.15
   ```

3. ✅ **Minimize layers**
   ```dockerfile
   RUN apt-get update && apt-get install -y \
       package1 \
       package2 \
       && rm -rf /var/lib/apt/lists/*
   ```

4. ✅ **Use multi-stage builds**
   ```dockerfile
   FROM node:16 AS builder
   # Build steps
   FROM node:16-alpine
   COPY --from=builder /app/dist ./dist
   ```

5. ✅ **Don't run as root**
   ```dockerfile
   USER node
   ```

### Container Best Practices

1. ✅ **One process per container**
2. ✅ **Use environment variables for configuration**
3. ✅ **Keep containers stateless**
4. ✅ **Use volumes for persistent data**
5. ✅ **Implement health checks**
6. ✅ **Set resource limits**
7. ✅ **Use restart policies**
8. ✅ **Log to stdout/stderr**

### Security Best Practices

1. ✅ **Scan images for vulnerabilities**
2. ✅ **Use trusted base images**
3. ✅ **Don't store secrets in images**
4. ✅ **Run as non-root user**
5. ✅ **Keep images updated**
6. ✅ **Use read-only file systems**
7. ✅ **Limit container capabilities**
8. ✅ **Use Docker secrets for sensitive data**

---

## Common Interview Questions

### 1. What is Docker and why use it?

**Answer:** Docker is a containerization platform that packages applications with dependencies. Benefits: consistency, portability, efficiency, scalability, and isolation.

---

### 2. What is the difference between Docker and Virtual Machines?

**Answer:**
- **Docker**: Shares host OS, lightweight, fast startup
- **VM**: Separate OS, heavy, slower startup

---

### 3. Explain Docker architecture

**Answer:** Docker uses client-server architecture:
- **Client**: Docker CLI
- **Daemon**: Manages containers
- **Registry**: Stores images
- **Objects**: Images, containers, networks, volumes

---

### 4. What is a Docker image?

**Answer:** Read-only template with application code and dependencies, used to create containers. Built in layers.

---

### 5. What is a Docker container?

**Answer:** Running instance of a Docker image. Isolated, portable, and ephemeral by default.

---

### 6. What is Dockerfile?

**Answer:** Text file with instructions to build Docker image. Contains commands like FROM, RUN, COPY, CMD.

---

### 7. Difference between CMD and ENTRYPOINT?

**Answer:**
- **CMD**: Default command, can be overridden
- **ENTRYPOINT**: Main command, arguments appended

```dockerfile
# CMD - can override
CMD ["npm", "start"]
docker run myapp npm test  # Overrides CMD

# ENTRYPOINT - cannot override easily
ENTRYPOINT ["npm"]
CMD ["start"]
docker run myapp test  # Runs "npm test"
```

---

### 8. What is Docker Compose?

**Answer:** Tool for defining and running multi-container applications using YAML configuration files.

---

### 9. What are Docker volumes?

**Answer:** Mechanism for persisting data generated by containers. Types: named volumes, bind mounts, tmpfs.

---

### 10. What is Docker networking?

**Answer:** Allows containers to communicate. Types: bridge (default), host, none, overlay, macvlan.

---

### 11. How to reduce Docker image size?

**Answer:**
- Use alpine base images
- Multi-stage builds
- Minimize layers
- Remove unnecessary files
- Use .dockerignore

---

### 12. What is multi-stage build?

**Answer:** Dockerfile technique using multiple FROM statements to create smaller final images by copying only necessary artifacts.

---

### 13. How to debug a Docker container?

**Answer:**
```bash
docker logs container_name
docker exec -it container_name bash
docker inspect container_name
docker stats container_name
```

---

### 14. What is Docker registry?

**Answer:** Repository for storing and distributing Docker images. Examples: Docker Hub, AWS ECR, private registries.

---

### 15. How to secure Docker containers?

**Answer:**
- Run as non-root user
- Scan images for vulnerabilities
- Use trusted base images
- Don't store secrets in images
- Keep images updated
- Limit resources and capabilities

---

## Docker Cheat Sheet

### Quick Reference

| Command | Description |
|---------|-------------|
| `docker build -t name .` | Build image |
| `docker run -d name` | Run container |
| `docker ps` | List containers |
| `docker images` | List images |
| `docker stop id` | Stop container |
| `docker rm id` | Remove container |
| `docker rmi id` | Remove image |
| `docker logs id` | View logs |
| `docker exec -it id bash` | Enter container |
| `docker-compose up` | Start services |
| `docker-compose down` | Stop services |
| `docker system prune` | Clean up |

---

**Master Docker! 🐳**