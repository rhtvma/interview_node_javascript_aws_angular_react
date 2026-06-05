# MLOps and Deployment - Interview Ready Guide

> 🚀 **Goal:** Understand how ML models are deployed, monitored, versioned, and maintained in real production systems.

## Table of Contents
1. [MLOps Overview](#mlops-overview)
2. [Why MLOps Matters](#why-mlops-matters)
3. [MLOps Lifecycle](#mlops-lifecycle)
4. [Experiment Tracking](#experiment-tracking)
5. [Versioning](#versioning)
6. [Model Registry](#model-registry)
7. [Serving Patterns](#serving-patterns)
8. [CI/CD for ML](#cicd-for-ml)
9. [Monitoring and Drift](#monitoring-and-drift)
10. [Deployment Strategies](#deployment-strategies)
11. [Common Interview Questions](#common-interview-questions)

---

## MLOps Overview

**Description:** MLOps is the engineering practice of taking ML models from notebooks to reliable production systems. It combines machine learning, DevOps, data engineering, automation, monitoring, and governance.

**Key Concepts:**
- Reproducible training.
- Versioned data, code, features, and models.
- Automated testing and deployment.
- Model monitoring and drift detection.
- Rollback and retraining strategy.

### Simple Interview Answer
MLOps is the process of operationalizing machine learning models. It ensures models can be trained reproducibly, deployed safely, monitored in production, and retrained when performance drops.

---

## Why MLOps Matters

| Problem Without MLOps | MLOps Solution |
| --- | --- |
| Notebook works locally only | Reproducible pipelines |
| Unknown training data version | Dataset and feature versioning |
| Manual deployment errors | CI/CD automation |
| Model performance drops silently | Monitoring and alerts |
| Hard to rollback | Model registry and deployment history |
| Compliance issues | Audit logs and approvals |

### Interview Tip
ML systems fail not only because of bad models, but also because of bad data pipelines, missing monitoring, drift, and weak release processes.

---

## MLOps Lifecycle

```text
Data -> Feature Pipeline -> Training -> Evaluation -> Registry -> Deployment -> Monitoring -> Retraining
```

| Stage | Description | Interview Keywords |
| --- | --- | --- |
| Data ingestion | Collect raw data | batch, streaming |
| Feature engineering | Prepare model inputs | feature store |
| Training | Fit model | pipeline, reproducibility |
| Evaluation | Validate model quality | metrics, thresholds |
| Registration | Store approved model | model registry |
| Deployment | Serve model | API, batch, canary |
| Monitoring | Track health | drift, latency, errors |
| Retraining | Update model | schedule, trigger |

---

## Experiment Tracking

**Description:** Experiment tracking records model experiments so teams can compare results and reproduce successful runs.

**Track These Items:**
- Dataset version.
- Code commit.
- Hyperparameters.
- Training metrics.
- Validation/test metrics.
- Model artifact.
- Environment/dependencies.
- Notes and owner.

### Tools
MLflow, Weights & Biases, Neptune, SageMaker Experiments, Vertex AI Experiments, Azure ML.

---

## Versioning

**Description:** ML versioning tracks all assets needed to reproduce a model.

| Asset | Why Version It? |
| --- | --- |
| Code | Know training logic |
| Data | Reproduce exact dataset |
| Features | Avoid train/serve mismatch |
| Model artifact | Deploy/rollback safely |
| Configuration | Track hyperparameters |
| Environment | Avoid dependency mismatch |

### Interview Answer
To version ML systems, I track code in Git, data with dataset snapshots or hashes, models in a registry, configs as files, and environments with Docker or lock files.

---

## Model Registry

**Description:** A model registry stores model artifacts and metadata across lifecycle stages.

| Stage | Meaning |
| --- | --- |
| Staging | Candidate model being tested |
| Production | Approved model serving users |
| Archived | Old model retained for audit/rollback |

**Registry Metadata:**
- Model version.
- Training data version.
- Metrics.
- Owner.
- Approval status.
- Deployment target.
- Rollback model.

---

## Serving Patterns

**Description:** Model serving is how predictions are delivered to users or systems.

| Serving Type | Description | Example |
| --- | --- | --- |
| 🟢 Batch | Run predictions on schedule | Daily churn scoring |
| 🔵 Online/API | Return prediction immediately | Fraud check during payment |
| 🟣 Streaming | Process continuous events | Real-time sensor alerts |
| 🟡 Edge | Run model on device | Mobile image detection |

### Low-Latency Serving Tips
- Use smaller model or distillation.
- Cache repeated predictions.
- Optimize model format such as ONNX.
- Use batching where possible.
- Choose correct CPU/GPU resources.
- Keep preprocessing efficient.

---

## CI/CD for ML

**Description:** ML CI/CD automates testing, training, validation, and deployment.

### CI Checks
- Unit tests for preprocessing code.
- Data validation tests.
- Schema checks.
- Training pipeline tests.
- Model metric threshold checks.
- Security and dependency scans.

### CD Steps
```text
Train -> Evaluate -> Register -> Approve -> Deploy -> Monitor -> Rollback if needed
```

### Interview Tip
Unlike normal software, ML CI/CD must test data quality and model performance, not only code correctness.

---

## Monitoring and Drift

**Description:** ML monitoring checks both system health and model quality after deployment.

| Monitoring Area | Metrics |
| --- | --- |
| System health | Latency, throughput, error rate, CPU/GPU, memory |
| Data quality | Missing values, schema changes, invalid ranges |
| Data drift | Feature distribution changes |
| Concept drift | Relationship between features and target changes |
| Model quality | Accuracy, precision, recall, F1, business KPI |
| Fairness | Performance across user groups |

### Drift Types
| Drift Type | Meaning | Example |
| --- | --- | --- |
| Data drift | Input distribution changes | New customer behavior |
| Concept drift | Target relationship changes | Fraud patterns evolve |
| Label drift | Output distribution changes | More refund requests |

---

## Deployment Strategies

| Strategy | Description | Use Case |
| --- | --- | --- |
| Blue-green | Run old and new versions separately, switch traffic | Safe release |
| Canary | Send small traffic to new model first | Risk reduction |
| Shadow | New model receives traffic but does not affect users | Compare silently |
| A/B test | Compare business outcomes between versions | Product experiments |
| Rolling | Gradually replace instances | Standard service rollout |

### Rollback Plan
A production ML deployment should always keep the previous stable model artifact, config, and serving route so rollback is quick.

---

## Common Interview Questions

### 1. What is MLOps?
MLOps is the practice of deploying, monitoring, versioning, and maintaining ML models reliably in production.

### 2. Why is MLOps different from DevOps?
DevOps manages software releases. MLOps includes software plus data, features, model artifacts, metrics, drift, retraining, and experiment tracking.

### 3. How do you version models?
Store model artifacts in a registry with metadata such as code commit, dataset version, hyperparameters, metrics, owner, and deployment stage.

### 4. What is model drift?
Model drift happens when production data or behavior changes over time and model performance decreases.

### 5. What metrics do you monitor for a deployed model?
Monitor latency, error rate, throughput, input feature distributions, missing values, model performance metrics, business KPIs, and fairness metrics.

### 6. How do you deploy a model safely?
Use staging validation, metric thresholds, canary or shadow deployment, monitoring, alerting, and a rollback plan.

### 7. What is a feature store?
A feature store is a centralized system for storing, sharing, and serving ML features consistently for training and inference.

### 8. What is train/serve skew?
Train/serve skew happens when features are computed differently during training and production inference, causing unexpected model behavior.

### 9. How do you trigger retraining?
Retraining can be scheduled periodically or triggered by drift, performance degradation, new labeled data, or business rule changes.

### 10. How do you rollback a bad model?
Switch traffic back to the previous stable model version using the model registry and deployment configuration, then investigate metrics, logs, and data changes.

---

## Quick Revision Cheatsheet

| Concept | Fast Answer |
| --- | --- |
| MLOps | DevOps for ML systems |
| Model registry | Stores model versions and metadata |
| Drift | Production behavior changes |
| Canary | Small traffic to new model |
| Shadow | Test new model silently |
| Feature store | Shared feature management |
| Train/serve skew | Training and production features differ |
| Rollback | Return to previous stable model |
