# Nginx - Complete Interview Preparation Guide

A comprehensive guide covering essential Nginx concepts for interview preparation.

---

## Table of Contents

1. [What is Nginx?](#what-is-nginx)
2. [Nginx Architecture](#nginx-architecture)
3. [Core Features](#core-features)
4. [Nginx as Web Server](#nginx-as-web-server)
5. [Nginx as Reverse Proxy](#nginx-as-reverse-proxy)
6. [Load Balancing](#load-balancing)
7. [Caching](#caching)
8. [SSL/TLS Configuration](#ssltls-configuration)
9. [Configuration Structure](#configuration-structure)
10. [Common Directives](#common-directives)
11. [Performance Optimization](#performance-optimization)
12. [Security Best Practices](#security-best-practices)
13. [Common Interview Questions](#common-interview-questions)

---

## What is Nginx?

**Nginx** (pronounced "engine-x") is a high-performance web server, reverse proxy, load balancer, and HTTP cache.

### Key Features

- **High Performance**: Handles thousands of concurrent connections
- **Low Resource Usage**: Efficient memory and CPU utilization
- **Reverse Proxy**: Routes requests to backend servers
- **Load Balancing**: Distributes traffic across multiple servers
- **HTTP Cache**: Caches static and dynamic content
- **SSL/TLS Termination**: Handles HTTPS encryption
- **Static Content Serving**: Efficiently serves files

### Why Use Nginx?

✅ **Scalability**: Handle high traffic with minimal resources
✅ **Speed**: Fast static file serving
✅ **Flexibility**: Multiple use cases (web server, proxy, load balancer)
✅ **Reliability**: Stable and battle-tested
✅ **Easy Configuration**: Simple, readable config files
✅ **Active Community**: Large ecosystem and support

### Nginx vs Apache

| Feature | Nginx | Apache |
|---------|-------|--------|
| **Architecture** | Event-driven, asynchronous | Process/thread-based |
| **Performance** | Better for static content | Better for dynamic content |
| **Resource Usage** | Lower | Higher |
| **Configuration** | Centralized | Distributed (.htaccess) |
| **Modules** | Compiled-in | Dynamic loading |
| **Concurrency** | Excellent | Good |

---

## Nginx Architecture

### Event-Driven Architecture

```
┌─────────────────────────────────────┐
│         Master Process              │
│    (reads config, manages workers)  │
└──────────────┬──────────────────────┘
               │
       ┌───────┴───────┐
       │               │
┌──────▼──────┐ ┌─────▼──────┐
│   Worker    │ │   Worker   │
│  Process 1  │ │  Process 2 │
│             │ │            │
│ Event Loop  │ │ Event Loop │
│ Non-blocking│ │ Non-blocking│
└─────────────┘ └────────────┘
```

### Process Model

1. **Master Process**
   - Reads and validates configuration
   - Manages worker processes
   - Handles signals (reload, restart)
   - Binds to ports

2. **Worker Processes**
   - Handle actual requests
   - Process connections asynchronously
   - Number typically matches CPU cores
   - Share listening sockets

### Key Advantages

- **Non-blocking I/O**: Handles multiple connections per worker
- **Event-driven**: Efficient resource utilization
- **Asynchronous**: No waiting for I/O operations
- **Scalable**: Thousands of concurrent connections

---

## Core Features

### 1. Web Server

Serves static content efficiently:
- HTML, CSS, JavaScript
- Images, videos
- Downloads
- Single Page Applications (SPAs)

### 2. Reverse Proxy

Routes requests to backend servers:
- Node.js applications
- Python/Django apps
- Java/Spring Boot services
- PHP applications

### 3. Load Balancer

Distributes traffic across multiple servers:
- Round-robin
- Least connections
- IP hash
- Weighted distribution

### 4. HTTP Cache

Caches responses to reduce backend load:
- Static content caching
- Dynamic content caching
- Proxy caching
- FastCGI caching

### 5. SSL/TLS Termination

Handles HTTPS encryption:
- SSL certificate management
- TLS protocol support
- HTTP/2 support
- Certificate renewal

---

## Nginx as Web Server

### Basic Web Server Configuration

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

    # Serve static files
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

### Serving Single Page Applications

```nginx
server {
    listen 80;
    server_name app.example.com;
    root /var/www/app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api {
        proxy_pass http://localhost:3000;
    }
}
```

---

## Nginx as Reverse Proxy

### What is a Reverse Proxy?

A reverse proxy sits between clients and backend servers, forwarding requests and responses.

```
Client → Nginx (Reverse Proxy) → Backend Server
```

### Basic Reverse Proxy Configuration

```nginx
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Multiple Backend Services

```nginx
server {
    listen 80;
    server_name example.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
    }

    # API
    location /api {
        proxy_pass http://localhost:4000;
    }

    # Admin panel
    location /admin {
        proxy_pass http://localhost:5000;
    }

    # WebSocket
    location /ws {
        proxy_pass http://localhost:6000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### Benefits of Reverse Proxy

- **Security**: Hide backend server details
- **Load Distribution**: Balance traffic
- **SSL Termination**: Handle HTTPS at proxy level
- **Caching**: Cache responses
- **Compression**: Compress responses
- **Request Routing**: Route based on URL patterns

---

## Load Balancing

### Load Balancing Methods

#### 1. Round Robin (Default)

```nginx
upstream backend {
    server backend1.example.com;
    server backend2.example.com;
    server backend3.example.com;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
```

#### 2. Least Connections

```nginx
upstream backend {
    least_conn;
    server backend1.example.com;
    server backend2.example.com;
    server backend3.example.com;
}
```

#### 3. IP Hash

```nginx
upstream backend {
    ip_hash;
    server backend1.example.com;
    server backend2.example.com;
    server backend3.example.com;
}
```

#### 4. Weighted Load Balancing

```nginx
upstream backend {
    server backend1.example.com weight=3;
    server backend2.example.com weight=2;
    server backend3.example.com weight=1;
}
```

### Health Checks

```nginx
upstream backend {
    server backend1.example.com max_fails=3 fail_timeout=30s;
    server backend2.example.com max_fails=3 fail_timeout=30s;
    server backend3.example.com backup;  # Backup server
}
```

### Session Persistence

```nginx
upstream backend {
    ip_hash;  # Same client always goes to same server
    server backend1.example.com;
    server backend2.example.com;
}
```

---

## Caching

### Proxy Cache Configuration

```nginx
# Define cache path
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m;

server {
    listen 80;
    server_name example.com;

    location / {
        proxy_cache my_cache;
        proxy_cache_valid 200 60m;
        proxy_cache_valid 404 10m;
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
        proxy_cache_bypass $http_cache_control;
        add_header X-Cache-Status $upstream_cache_status;

        proxy_pass http://backend;
    }
}
```

### Cache Key Customization

```nginx
location / {
    proxy_cache my_cache;
    proxy_cache_key "$scheme$request_method$host$request_uri";
    proxy_pass http://backend;
}
```

### Cache Purging

```nginx
location ~ /purge(/.*) {
    allow 127.0.0.1;
    deny all;
    proxy_cache_purge my_cache "$scheme$request_method$host$1";
}
```

### Static File Caching

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## SSL/TLS Configuration

### Basic HTTPS Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /etc/nginx/ssl/example.com.crt;
    ssl_certificate_key /etc/nginx/ssl/example.com.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:3000;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
```

### Let's Encrypt SSL

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;

    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

### SSL Best Practices

```nginx
# Strong SSL configuration
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
ssl_prefer_server_ciphers off;

# SSL session cache
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;

# OCSP stapling
ssl_stapling on;
ssl_stapling_verify on;

# Security headers
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
```

---

## Configuration Structure

### Main Configuration File

```nginx
# /etc/nginx/nginx.conf

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript application/xml+rss;

    # Include virtual host configs
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

### Virtual Host Configuration

```nginx
# /etc/nginx/sites-available/example.com

server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/example.com;
    index index.html index.htm;

    access_log /var/log/nginx/example.com.access.log;
    error_log /var/log/nginx/example.com.error.log;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### Configuration Contexts

```
main context
├── events context
└── http context
    ├── upstream context
    └── server context
        └── location context
```

---

## Common Directives

### Server Directives

```nginx
server {
    listen 80;                          # Port to listen on
    listen [::]:80;                     # IPv6
    server_name example.com;            # Domain name
    root /var/www/html;                 # Document root
    index index.html index.php;         # Index files
    error_page 404 /404.html;          # Custom error page
    client_max_body_size 10M;          # Max upload size
}
```

### Location Directives

```nginx
# Exact match
location = /exact {
    # Matches /exact only
}

# Prefix match
location /prefix {
    # Matches /prefix, /prefix/path, etc.
}

# Regex match (case-sensitive)
location ~ \.php$ {
    # Matches .php files
}

# Regex match (case-insensitive)
location ~* \.(jpg|jpeg|png|gif)$ {
    # Matches image files
}

# Priority prefix match
location ^~ /static {
    # Stops regex matching if this matches
}
```

### Proxy Directives

```nginx
location / {
    proxy_pass http://backend;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
}
```

### Rewrite Directives

```nginx
# Redirect
rewrite ^/old-url$ /new-url permanent;

# Internal rewrite
rewrite ^/user/(\w+)$ /user.php?name=$1 last;

# Conditional rewrite
if ($request_uri ~* "^/old") {
    rewrite ^/old(.*)$ /new$1 permanent;
}
```

---

## Performance Optimization

### Worker Configuration

```nginx
# Match number of CPU cores
worker_processes auto;

# Increase worker connections
events {
    worker_connections 2048;
    use epoll;  # Linux
    multi_accept on;
}
```

### Buffer Optimization

```nginx
http {
    client_body_buffer_size 10K;
    client_header_buffer_size 1k;
    client_max_body_size 8m;
    large_client_header_buffers 2 1k;
}
```

### Timeout Configuration

```nginx
http {
    client_body_timeout 12;
    client_header_timeout 12;
    keepalive_timeout 15;
    send_timeout 10;
}
```

### Compression

```nginx
http {
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_disable "msie6";
}
```

### Static File Optimization

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}
```

### Open File Cache

```nginx
http {
    open_file_cache max=1000 inactive=20s;
    open_file_cache_valid 30s;
    open_file_cache_min_uses 2;
    open_file_cache_errors on;
}
```

---

## Security Best Practices

### Hide Nginx Version

```nginx
http {
    server_tokens off;
}
```

### Rate Limiting

```nginx
http {
    limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

    server {
        location /api {
            limit_req zone=mylimit burst=20 nodelay;
            proxy_pass http://backend;
        }
    }
}
```

### Connection Limiting

```nginx
http {
    limit_conn_zone $binary_remote_addr zone=addr:10m;

    server {
        location /download {
            limit_conn addr 2;
        }
    }
}
```

### Security Headers

```nginx
server {
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

### Block Bad Bots

```nginx
if ($http_user_agent ~* (bot|crawler|spider)) {
    return 403;
}
```

### IP Whitelisting

```nginx
location /admin {
    allow 192.168.1.0/24;
    allow 10.0.0.1;
    deny all;
}
```

### DDoS Protection

```nginx
# Limit connections per IP
limit_conn_zone $binary_remote_addr zone=conn_limit_per_ip:10m;
limit_conn conn_limit_per_ip 10;

# Limit requests per IP
limit_req_zone $binary_remote_addr zone=req_limit_per_ip:10m rate=5r/s;
limit_req zone=req_limit_per_ip burst=10 nodelay;
```

---

## Common Interview Questions

### 1. What is Nginx?

**Answer:** Nginx is a high-performance web server, reverse proxy, load balancer, and HTTP cache known for its event-driven architecture and ability to handle thousands of concurrent connections efficiently.

---

### 2. What is the difference between Nginx and Apache?

**Answer:**
- **Architecture**: Nginx uses event-driven, asynchronous model; Apache uses process/thread-based
- **Performance**: Nginx better for static content and high concurrency
- **Resource Usage**: Nginx uses less memory and CPU
- **Configuration**: Nginx has centralized config; Apache has distributed (.htaccess)

---

### 3. What is a reverse proxy?

**Answer:** A reverse proxy sits between clients and backend servers, forwarding client requests to appropriate servers and returning responses. Benefits include load balancing, caching, SSL termination, and security.

---

### 4. How does Nginx handle concurrent connections?

**Answer:** Nginx uses an event-driven, asynchronous, non-blocking architecture. Worker processes handle multiple connections using event loops, allowing thousands of concurrent connections with minimal resource usage.

---

### 5. What are Nginx worker processes?

**Answer:** Worker processes handle actual client requests. The master process manages workers, and each worker can handle thousands of connections asynchronously. Number of workers typically matches CPU cores.

---

### 6. What load balancing methods does Nginx support?

**Answer:**
- **Round Robin**: Default, distributes evenly
- **Least Connections**: Sends to server with fewest connections
- **IP Hash**: Same client always goes to same server
- **Weighted**: Distributes based on server capacity

---

### 7. How do you configure SSL in Nginx?

**Answer:**
```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/cert.crt;
    ssl_certificate_key /path/to/key.key;
    ssl_protocols TLSv1.2 TLSv1.3;
}
```

---

### 8. What is the difference between proxy_pass and fastcgi_pass?

**Answer:**
- **proxy_pass**: Forwards HTTP requests to backend HTTP servers
- **fastcgi_pass**: Forwards requests to FastCGI servers (like PHP-FPM)

---

### 9. How do you enable caching in Nginx?

**Answer:**
```nginx
proxy_cache_path /var/cache/nginx keys_zone=my_cache:10m;
server {
    location / {
        proxy_cache my_cache;
        proxy_cache_valid 200 60m;
        proxy_pass http://backend;
    }
}
```

---

### 10. What is the purpose of try_files directive?

**Answer:** try_files checks for file existence in order and serves the first match or falls back to specified URI. Commonly used for SPAs:
```nginx
try_files $uri $uri/ /index.html;
```

---

### 11. How do you implement rate limiting?

**Answer:**
```nginx
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;
location / {
    limit_req zone=mylimit burst=20;
}
```

---

### 12. What is upstream in Nginx?

**Answer:** Upstream defines a group of backend servers for load balancing:
```nginx
upstream backend {
    server backend1.example.com;
    server backend2.example.com;
}
```

---

### 13. How do you redirect HTTP to HTTPS?

**Answer:**
```nginx
server {
    listen 80;
    return 301 https://$server_name$request_uri;
}
```

---

### 14. What is the difference between return and rewrite?

**Answer:**
- **return**: Stops processing and returns response immediately
- **rewrite**: Changes URI and continues processing

---

### 15. How do you troubleshoot Nginx issues?

**Answer:**
- Check error logs: `/var/log/nginx/error.log`
- Test configuration: `nginx -t`
- Check syntax: `nginx -T`
- Reload config: `nginx -s reload`
- Monitor access logs
- Check process status: `ps aux | grep nginx`

---

## Nginx Commands

### Essential Commands

```bash
# Test configuration
nginx -t

# Reload configuration
nginx -s reload

# Stop Nginx
nginx -s stop

# Graceful stop
nginx -s quit

# Reopen log files
nginx -s reopen

# Show version
nginx -v

# Show version and configure options
nginx -V

# Start Nginx
systemctl start nginx

# Stop Nginx
systemctl stop nginx

# Restart Nginx
systemctl restart nginx

# Enable on boot
systemctl enable nginx

# Check status
systemctl status nginx
```

---

## Nginx Cheat Sheet

### Quick Reference

| Task | Command/Config |
|------|----------------|
| Test config | `nginx -t` |
| Reload | `nginx -s reload` |
| Static files | `root /var/www/html;` |
| Reverse proxy | `proxy_pass http://backend;` |
| Load balance | `upstream backend { server s1; server s2; }` |
| SSL | `listen 443 ssl;` |
| Cache | `proxy_cache my_cache;` |
| Rate limit | `limit_req zone=mylimit;` |
| Redirect | `return 301 https://example.com;` |
| Rewrite | `rewrite ^/old /new permanent;` |

---

**Master Nginx! 🚀**