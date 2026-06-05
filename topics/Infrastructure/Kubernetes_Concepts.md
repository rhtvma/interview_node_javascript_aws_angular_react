# Kubernetes - Complete Interview Preparation Guide

A comprehensive guide covering essential Kubernetes concepts for interview preparation.

---

## Table of Contents

1. [What is Kubernetes?](#what-is-kubernetes)
2. [Kubernetes Architecture](#kubernetes-architecture)
3. [Kubernetes Components](#kubernetes-components)
4. [Kubernetes Objects](#kubernetes-objects)
5. [Pods](#pods)
6. [Services](#services)
7. [Deployments](#deployments)
8. [ConfigMaps and Secrets](#configmaps-and-secrets)
9. [Volumes and Storage](#volumes-and-storage)
10. [Networking](#networking)
11. [Kubectl Commands](#kubectl-commands)
12. [Best Practices](#best-practices)
13. [Common Interview Questions](#common-interview-questions)

---

## What is Kubernetes?

**Kubernetes (K8s)** is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications.

### Key Features

- **Automated Deployment**: Deploy containers automatically
- **Self-Healing**: Restart failed containers
- **Auto-Scaling**: Scale based on demand
- **Load Balancing**: Distribute traffic
- **Rolling Updates**: Zero-downtime deployments
- **Service Discovery**: Automatic DNS and load balancing
- **Storage Orchestration**: Mount storage systems

### Why Kubernetes?

✅ **Container Orchestration**: Manage thousands of containers
✅ **High Availability**: Ensure application uptime
✅ **Scalability**: Scale horizontally with ease
✅ **Portability**: Run on any cloud or on-premises
✅ **Declarative Configuration**: Define desired state
✅ **Self-Healing**: Automatic recovery from failures
✅ **Resource Optimization**: Efficient resource utilization

### Kubernetes vs Docker Swarm

| Feature | Kubernetes | Docker Swarm |
|---------|-----------|--------------|
| **Complexity** | Complex | Simple |
| **Scalability** | Highly scalable | Limited |
| **Community** | Large | Smaller |
| **Features** | Rich | Basic |
| **Learning Curve** | Steep | Gentle |
| **Auto-scaling** | Yes | Limited |
| **Load Balancing** | Advanced | Basic |

---

## Kubernetes Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Control Plane                       │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ API Server   │  │  Scheduler   │  │Controller │ │
│  │              │  │              │  │ Manager   │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
│  ┌──────────────┐                                   │
│  │    etcd      │                                   │
│  │  (Database)  │                                   │
│  └──────────────┘                                   │
└─────────────────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────▼──────┐  ┌──────▼──────┐  ┌─────▼───────┐
│   Worker     │  │   Worker    │  │   Worker    │
│    Node 1    │  │    Node 2   │  │    Node 3   │
│              │  │             │  │             │
│ ┌──────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │
│ │  Kubelet │ │  │ │ Kubelet │ │  │ │ Kubelet │ │
│ └──────────┘ │  │ └─────────┘ │  │ └─────────┘ │
│ ┌──────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │
│ │Kube-proxy│ │  │ │Kube-    │ │  │ │Kube-    │ │
│ │          │ │  │ │proxy    │ │  │ │proxy    │ │
│ └──────────┘ │  │ └─────────┘ │  │ └─────────┘ │
│ ┌──────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │
│ │Container │ │  │ │Container│ │  │ │Container│ │
│ │ Runtime  │ │  │ │Runtime  │ │  │ │Runtime  │ │
│ └──────────┘ │  │ └─────────┘ │  │ └─────────┘ │
│              │  │             │  │             │
│   [Pods]     │  │   [Pods]    │  │   [Pods]    │
└──────────────┘  └─────────────┘  └─────────────┘
```

### Control Plane Components

1. **API Server**: Frontend for Kubernetes control plane
2. **etcd**: Key-value store for cluster data
3. **Scheduler**: Assigns pods to nodes
4. **Controller Manager**: Runs controller processes

### Worker Node Components

1. **Kubelet**: Agent that runs on each node
2. **Kube-proxy**: Network proxy
3. **Container Runtime**: Docker, containerd, CRI-O

---

## Kubernetes Components

### Control Plane Components

#### 1. API Server (kube-apiserver)

- Central management entity
- Exposes Kubernetes API
- Validates and processes REST requests
- Updates etcd

#### 2. etcd

- Distributed key-value store
- Stores cluster state and configuration
- Highly available
- Source of truth for cluster

#### 3. Scheduler (kube-scheduler)

- Watches for new pods
- Assigns pods to nodes
- Considers resource requirements
- Respects constraints and policies

#### 4. Controller Manager (kube-controller-manager)

Runs controller processes:
- **Node Controller**: Monitors node health
- **Replication Controller**: Maintains pod count
- **Endpoints Controller**: Populates endpoints
- **Service Account Controller**: Creates default accounts

#### 5. Cloud Controller Manager

- Interacts with cloud providers
- Manages cloud-specific resources
- Node, route, service, volume controllers

### Node Components

#### 1. Kubelet

- Agent on each node
- Ensures containers are running
- Reports node status
- Executes pod specifications

#### 2. Kube-proxy

- Network proxy on each node
- Maintains network rules
- Enables service abstraction
- Implements load balancing

#### 3. Container Runtime

- Runs containers
- Examples: Docker, containerd, CRI-O
- Implements Kubernetes CRI

---

## Kubernetes Objects

### Basic Objects

1. **Pod**: Smallest deployable unit
2. **Service**: Network abstraction for pods
3. **Volume**: Storage abstraction
4. **Namespace**: Virtual cluster

### Controllers

1. **Deployment**: Manages ReplicaSets
2. **ReplicaSet**: Maintains pod replicas
3. **StatefulSet**: Manages stateful applications
4. **DaemonSet**: Runs pod on all nodes
5. **Job**: Runs pods to completion
6. **CronJob**: Scheduled jobs

---

## Pods

### What is a Pod?

Smallest deployable unit in Kubernetes. Can contain one or more containers.

### Pod Lifecycle

```
Pending → Running → Succeeded/Failed
```

**Phases:**
- **Pending**: Accepted but not running
- **Running**: Bound to node and running
- **Succeeded**: All containers terminated successfully
- **Failed**: All containers terminated, at least one failed
- **Unknown**: State cannot be determined

### Pod YAML Example

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
    tier: frontend
spec:
  containers:
  - name: nginx
    image: nginx:1.21
    ports:
    - containerPort: 80
    env:
    - name: ENV_VAR
      value: "production"
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
    livenessProbe:
      httpGet:
        path: /health
        port: 80
      initialDelaySeconds: 30
      periodSeconds: 10
    readinessProbe:
      httpGet:
        path: /ready
        port: 80
      initialDelaySeconds: 5
      periodSeconds: 5
```

### Multi-Container Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: multi-container-pod
spec:
  containers:
  - name: app
    image: myapp:1.0
    ports:
    - containerPort: 8080
  - name: sidecar
    image: logging-agent:1.0
  - name: init-container
    image: busybox
    command: ['sh', '-c', 'echo Initializing...']
```

### Pod Commands

```bash
# Create pod
kubectl run nginx --image=nginx

# Create from YAML
kubectl apply -f pod.yaml

# List pods
kubectl get pods

# Detailed pod info
kubectl describe pod nginx-pod

# View logs
kubectl logs nginx-pod

# Follow logs
kubectl logs -f nginx-pod

# Execute command in pod
kubectl exec -it nginx-pod -- bash

# Delete pod
kubectl delete pod nginx-pod

# Port forward
kubectl port-forward nginx-pod 8080:80
```

---

## Services

### What is a Service?

Abstraction that defines logical set of pods and access policy.

### Service Types

1. **ClusterIP** (default): Internal cluster IP
2. **NodePort**: Exposes on each node's IP
3. **LoadBalancer**: External load balancer
4. **ExternalName**: Maps to DNS name

### Service YAML Examples

#### ClusterIP Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  type: ClusterIP
  selector:
    app: backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
```

#### NodePort Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
    nodePort: 30080
```

#### LoadBalancer Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  type: LoadBalancer
  selector:
    app: web
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
```

### Service Commands

```bash
# Create service
kubectl expose pod nginx-pod --port=80 --type=NodePort

# List services
kubectl get services

# Describe service
kubectl describe service backend-service

# Delete service
kubectl delete service backend-service

# Get service endpoints
kubectl get endpoints backend-service
```

---

## Deployments

### What is a Deployment?

Provides declarative updates for pods and ReplicaSets.

### Deployment Features

- **Rolling Updates**: Zero-downtime updates
- **Rollback**: Revert to previous version
- **Scaling**: Scale replicas up/down
- **Self-Healing**: Replace failed pods

### Deployment YAML

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
```

### Deployment Commands

```bash
# Create deployment
kubectl create deployment nginx --image=nginx --replicas=3

# Create from YAML
kubectl apply -f deployment.yaml

# List deployments
kubectl get deployments

# Describe deployment
kubectl describe deployment nginx-deployment

# Scale deployment
kubectl scale deployment nginx-deployment --replicas=5

# Update image
kubectl set image deployment/nginx-deployment nginx=nginx:1.22

# Rollout status
kubectl rollout status deployment/nginx-deployment

# Rollout history
kubectl rollout history deployment/nginx-deployment

# Rollback
kubectl rollout undo deployment/nginx-deployment

# Rollback to specific revision
kubectl rollout undo deployment/nginx-deployment --to-revision=2

# Delete deployment
kubectl delete deployment nginx-deployment
```

### Update Strategies

#### Rolling Update (Default)

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1        # Max pods above desired
    maxUnavailable: 1  # Max pods unavailable
```

#### Recreate

```yaml
strategy:
  type: Recreate  # Kill all, then create new
```

---

## ConfigMaps and Secrets

### ConfigMaps

Store non-confidential configuration data.

#### ConfigMap YAML

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_url: "postgres://db:5432"
  log_level: "info"
  config.json: |
    {
      "feature_flags": {
        "new_ui": true
      }
    }
```

#### Using ConfigMap in Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  containers:
  - name: app
    image: myapp:1.0
    env:
    - name: DATABASE_URL
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: database_url
    volumeMounts:
    - name: config-volume
      mountPath: /etc/config
  volumes:
  - name: config-volume
    configMap:
      name: app-config
```

### Secrets

Store sensitive data like passwords, tokens.

#### Secret YAML

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: YWRtaW4=      # base64 encoded
  password: cGFzc3dvcmQ=  # base64 encoded
```

#### Using Secret in Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  containers:
  - name: app
    image: myapp:1.0
    env:
    - name: DB_USERNAME
      valueFrom:
        secretKeyRef:
          name: db-secret
          key: username
    - name: DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: db-secret
          key: password
```

### Commands

```bash
# Create ConfigMap
kubectl create configmap app-config --from-literal=key=value

# Create from file
kubectl create configmap app-config --from-file=config.json

# Create Secret
kubectl create secret generic db-secret \
  --from-literal=username=admin \
  --from-literal=password=secret

# Encode/Decode base64
echo -n 'admin' | base64
echo 'YWRtaW4=' | base64 --decode

# View ConfigMap
kubectl get configmap app-config -o yaml

# View Secret
kubectl get secret db-secret -o yaml
```

---

## Volumes and Storage

### Volume Types

1. **emptyDir**: Temporary directory
2. **hostPath**: Mount from host
3. **persistentVolumeClaim**: Persistent storage
4. **configMap**: ConfigMap as volume
5. **secret**: Secret as volume
6. **nfs**: Network file system

### PersistentVolume (PV)

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-storage
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: standard
  hostPath:
    path: /mnt/data
```

### PersistentVolumeClaim (PVC)

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-storage
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
  storageClassName: standard
```

### Using PVC in Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  containers:
  - name: app
    image: myapp:1.0
    volumeMounts:
    - name: storage
      mountPath: /data
  volumes:
  - name: storage
    persistentVolumeClaim:
      claimName: pvc-storage
```

---

## Networking

### Network Policies

Control traffic between pods.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-policy
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: database
    ports:
    - protocol: TCP
      port: 5432
```

### Ingress

Manages external access to services.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 8080
  tls:
  - hosts:
    - myapp.example.com
    secretName: tls-secret
```

---

## Kubectl Commands

### Cluster Management

```bash
# Cluster info
kubectl cluster-info

# View nodes
kubectl get nodes

# Node details
kubectl describe node node-name

# View all resources
kubectl get all

# View resources in namespace
kubectl get all -n namespace-name
```

### Resource Management

```bash
# Apply configuration
kubectl apply -f file.yaml

# Create resource
kubectl create -f file.yaml

# Delete resource
kubectl delete -f file.yaml

# Edit resource
kubectl edit deployment nginx

# Replace resource
kubectl replace -f file.yaml
```

### Debugging

```bash
# View logs
kubectl logs pod-name

# Follow logs
kubectl logs -f pod-name

# Previous container logs
kubectl logs pod-name --previous

# Execute command
kubectl exec -it pod-name -- bash

# Port forward
kubectl port-forward pod-name 8080:80

# Copy files
kubectl cp pod-name:/path/file ./file

# Top (resource usage)
kubectl top nodes
kubectl top pods
```

### Namespace Operations

```bash
# List namespaces
kubectl get namespaces

# Create namespace
kubectl create namespace dev

# Set default namespace
kubectl config set-context --current --namespace=dev

# Delete namespace
kubectl delete namespace dev
```

---

## Best Practices

### Resource Management

1. ✅ **Set resource requests and limits**
   ```yaml
   resources:
     requests:
       memory: "64Mi"
       cpu: "250m"
     limits:
       memory: "128Mi"
       cpu: "500m"
   ```

2. ✅ **Use namespaces** for organization

3. ✅ **Implement health checks**
   ```yaml
   livenessProbe:
     httpGet:
       path: /health
       port: 8080
   readinessProbe:
     httpGet:
       path: /ready
       port: 8080
   ```

### Security

1. ✅ **Use RBAC** for access control
2. ✅ **Run as non-root user**
3. ✅ **Use Secrets** for sensitive data
4. ✅ **Implement Network Policies**
5. ✅ **Scan images** for vulnerabilities
6. ✅ **Use Pod Security Policies**

### Deployment

1. ✅ **Use Deployments** instead of bare pods
2. ✅ **Implement rolling updates**
3. ✅ **Set appropriate replica counts**
4. ✅ **Use labels** for organization
5. ✅ **Version your images**
6. ✅ **Use ConfigMaps** for configuration

### Monitoring

1. ✅ **Implement logging**
2. ✅ **Set up monitoring** (Prometheus, Grafana)
3. ✅ **Use health checks**
4. ✅ **Monitor resource usage**
5. ✅ **Set up alerts**

---

## Common Interview Questions

### 1. What is Kubernetes?

**Answer:** Open-source container orchestration platform that automates deployment, scaling, and management of containerized applications.

---

### 2. Explain Kubernetes architecture

**Answer:** 
- **Control Plane**: API Server, etcd, Scheduler, Controller Manager
- **Worker Nodes**: Kubelet, Kube-proxy, Container Runtime
- **Objects**: Pods, Services, Deployments, etc.

---

### 3. What is a Pod?

**Answer:** Smallest deployable unit in Kubernetes. Can contain one or more containers that share network and storage.

---

### 4. What is a Service?

**Answer:** Abstraction that defines logical set of pods and access policy. Types: ClusterIP, NodePort, LoadBalancer, ExternalName.

---

### 5. What is a Deployment?

**Answer:** Controller that provides declarative updates for pods and ReplicaSets. Supports rolling updates, rollbacks, and scaling.

---

### 6. Difference between Deployment and StatefulSet?

**Answer:**
- **Deployment**: For stateless applications, pods are interchangeable
- **StatefulSet**: For stateful applications, pods have unique identities and persistent storage

---

### 7. What is a Namespace?

**Answer:** Virtual cluster within Kubernetes cluster. Provides scope for names and resource isolation.

---

### 8. What is kubectl?

**Answer:** Command-line tool for interacting with Kubernetes clusters. Used to deploy applications, inspect resources, and view logs.

---

### 9. What is etcd?

**Answer:** Distributed key-value store that stores all cluster data. Source of truth for Kubernetes cluster state.

---

### 10. What is a ConfigMap?

**Answer:** Object used to store non-confidential configuration data in key-value pairs. Can be consumed as environment variables or files.

---

### 11. What is a Secret?

**Answer:** Object used to store sensitive data like passwords, tokens. Data is base64 encoded.

---

### 12. What is Ingress?

**Answer:** API object that manages external access to services, typically HTTP/HTTPS. Provides load balancing, SSL termination, and name-based virtual hosting.

---

### 13. What is a DaemonSet?

**Answer:** Ensures that all (or some) nodes run a copy of a pod. Used for node-level operations like logging or monitoring.

---

### 14. What is a Job?

**Answer:** Creates one or more pods and ensures specified number complete successfully. Used for batch processing.

---

### 15. How does Kubernetes handle scaling?

**Answer:**
- **Horizontal Pod Autoscaler**: Scales pods based on CPU/memory
- **Vertical Pod Autoscaler**: Adjusts resource requests/limits
- **Cluster Autoscaler**: Scales nodes in cluster

---

### 16. What is a rolling update?

**Answer:** Deployment strategy that updates pods gradually, ensuring zero downtime. Old pods are replaced one by one with new ones.

---

### 17. What is a liveness probe?

**Answer:** Checks if container is running. If fails, kubelet kills container and restarts it.

---

### 18. What is a readiness probe?

**Answer:** Checks if container is ready to serve traffic. If fails, pod is removed from service endpoints.

---

### 19. What is RBAC?

**Answer:** Role-Based Access Control. Regulates access to Kubernetes resources based on roles assigned to users.

---

### 20. How to troubleshoot a failing pod?

**Answer:**
```bash
kubectl describe pod pod-name
kubectl logs pod-name
kubectl exec -it pod-name -- bash
kubectl get events
```

---

## Kubernetes Cheat Sheet

### Quick Reference

| Command | Description |
|---------|-------------|
| `kubectl get pods` | List pods |
| `kubectl describe pod name` | Pod details |
| `kubectl logs pod-name` | View logs |
| `kubectl exec -it pod bash` | Enter pod |
| `kubectl apply -f file.yaml` | Apply config |
| `kubectl delete pod name` | Delete pod |
| `kubectl get services` | List services |
| `kubectl get deployments` | List deployments |
| `kubectl scale deployment name --replicas=3` | Scale |
| `kubectl rollout status deployment/name` | Rollout status |
| `kubectl rollout undo deployment/name` | Rollback |

---

**Master Kubernetes! ☸️**