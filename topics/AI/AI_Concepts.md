# AI Concepts - Interview Ready Guide

> 🧠 **Goal:** Understand what AI is, its major types, where ML/DL/NLP fit, and how to answer AI fundamentals clearly in interviews.

## Table of Contents
1. [AI Overview](#ai-overview)
2. [Types of AI by Capability](#types-of-ai-by-capability)
3. [Types of AI by Functionality](#types-of-ai-by-functionality)
4. [Major AI Topics](#major-ai-topics)
5. [AI System Lifecycle](#ai-system-lifecycle)
6. [AI vs ML vs DL vs GenAI](#ai-vs-ml-vs-dl-vs-genai)
7. [Responsible AI](#responsible-ai)
8. [Common Interview Questions](#common-interview-questions)
9. [Quick Revision Cheatsheet](#quick-revision-cheatsheet)

---

## AI Overview

**Description:** Artificial Intelligence is the field of building systems that can perform tasks normally requiring human intelligence, such as reasoning, learning, perception, language understanding, planning, and decision-making.

**Key Concepts:**
- AI is the broad umbrella.
- Machine Learning is a subset of AI that learns patterns from data.
- Deep Learning is a subset of ML based on neural networks.
- Generative AI creates new content such as text, images, code, audio, or video.
- Production AI requires data quality, evaluation, deployment, monitoring, and governance.

### Simple Interview Answer
Artificial Intelligence means creating software systems that can perform intelligent tasks like prediction, classification, recommendation, language understanding, and decision-making. Most modern AI systems are data-driven and use machine learning or deep learning models.

### Real-World Examples
| Use Case | AI Capability | Example |
| --- | --- | --- |
| Fraud detection | Pattern recognition | Detect unusual card transactions |
| Recommendation | Prediction | Suggest products, movies, or jobs |
| Chatbots | Language understanding | Customer support assistant |
| Image recognition | Perception | Detect objects in medical scans |
| Route optimization | Planning | Delivery route recommendation |

---

## Types of AI by Capability

**Description:** This classification explains how broad or powerful an AI system is compared with human intelligence.

| Type | Description | Current Status | Example |
| --- | --- | --- | --- |
| 🟢 **Narrow AI / Weak AI** | Solves a specific task very well | Common today | Spam filter, chatbot, recommender |
| 🟡 **General AI / AGI** | Human-like ability across many domains | Research goal | Hypothetical human-level AI |
| 🔴 **Super AI / ASI** | Intelligence beyond humans | Speculative | Future concept |

**Interview Tip:** Most real-world AI is **Narrow AI**. Avoid claiming current systems are AGI unless discussing theory, research, or future possibilities.

---

## Types of AI by Functionality

**Description:** This classification explains how an AI system behaves internally, especially whether it uses memory, user context, or self-awareness.

| Type | Description | Example | Interview Note |
| --- | --- | --- | --- |
| ⚪ **Reactive Machines** | Respond only to current input, no memory | Chess engine style systems | Good for rule-based decisions |
| 🔵 **Limited Memory** | Uses historical data or recent context | Self-driving car perception, ML models | Most deployed AI belongs here |
| 🟣 **Theory of Mind** | Understands emotions, beliefs, intentions | Research-level social AI | Not common in production |
| 🔴 **Self-Aware AI** | Has consciousness and self-understanding | Speculative | Mention as theoretical only |

### Interview Answer
AI can be classified by capability into Narrow AI, General AI, and Super AI, and by functionality into Reactive Machines, Limited Memory, Theory of Mind, and Self-Aware AI. In production, we mainly work with Narrow AI and Limited Memory systems.

---

## Major AI Topics

**Description:** These are the main AI areas you should know for interviews. Each topic has its own file in this folder.

| Topic | Type | Description | Interview Focus |
| --- | --- | --- | --- |
| 🤖 [Machine Learning](Machine_Learning.md) | Data-driven AI | Models learn patterns from data | Algorithms, metrics, overfitting, features |
| 🧬 [Deep Learning](Deep_Learning.md) | Neural-network AI | Uses multi-layer neural networks | Backpropagation, CNNs, RNNs, Transformers |
| 💬 [NLP](NLP.md) | Language AI | Understands and generates human language | Tokenization, embeddings, attention, LLMs |
| 🚀 [MLOps](MLOps.md) | AI engineering | Deploys, monitors, and manages models | CI/CD, drift, registry, serving, rollback |

### Other Useful AI Topics
| Topic | Description |
| --- | --- |
| Computer Vision | AI for images and video |
| Reinforcement Learning | Agents learn by reward and penalty |
| Generative AI | AI that generates new content |
| Explainable AI | Techniques to understand model decisions |
| Responsible AI | Fairness, privacy, safety, and governance |

---

## AI System Lifecycle

**Description:** A production AI system is more than a model. It includes business understanding, data collection, training, evaluation, deployment, monitoring, and improvement.

```text
Problem -> Data -> Features -> Model -> Evaluation -> Deployment -> Monitoring -> Retraining
```

### Lifecycle Steps
| Step | What Happens | Interview Keywords |
| --- | --- | --- |
| Problem framing | Define objective and success metric | business goal, constraints |
| Data collection | Gather relevant data | labels, quality, privacy |
| Data preparation | Clean and transform data | missing values, outliers |
| Model training | Learn patterns from data | algorithm, loss, optimization |
| Evaluation | Measure performance | accuracy, F1, AUC, latency |
| Deployment | Serve predictions | API, batch, streaming |
| Monitoring | Track model health | drift, latency, errors |
| Retraining | Improve with new data | feedback loop, versioning |

---

## AI vs ML vs DL vs GenAI

**Description:** Interviewers often check whether you understand the hierarchy.

| Term | Meaning | Example |
| --- | --- | --- |
| 🎯 **AI** | Broad field of intelligent systems | Rule engine, ML model, chatbot |
| 📊 **ML** | AI that learns from data | Fraud classifier |
| 🧠 **DL** | ML using deep neural networks | Image classifier, speech model |
| ✨ **GenAI** | AI that generates new content | Text generation, image generation |

### Simple Analogy
AI is the whole field, ML is one way to build AI, DL is a powerful way to build ML, and Generative AI is a family of AI systems that create new outputs.

---

## Responsible AI

**Description:** Responsible AI means building systems that are fair, reliable, secure, private, transparent, and aligned with user and business goals.

**Key Concepts:**
- **Fairness:** Avoid unfair bias against groups.
- **Privacy:** Protect sensitive user data.
- **Explainability:** Understand why a model made a prediction.
- **Robustness:** Handle noisy, missing, or adversarial inputs.
- **Safety:** Prevent harmful outputs or decisions.
- **Governance:** Track ownership, approvals, and audit history.

### Interview Tip
When asked about AI risks, connect your answer to production controls: validation, monitoring, human review, access control, audit logs, and rollback plans.

---

## Common Interview Questions

### 1. What is Artificial Intelligence?
AI is the field of building systems that can perform tasks requiring human-like intelligence, such as learning, reasoning, perception, language understanding, and decision-making.

### 2. What is the difference between AI, ML, and Deep Learning?
AI is the broad field, ML is a subset of AI where systems learn from data, and Deep Learning is a subset of ML that uses neural networks with many layers.

### 3. What are the main types of AI?
By capability: Narrow AI, General AI, and Super AI. By functionality: Reactive Machines, Limited Memory, Theory of Mind, and Self-Aware AI.

### 4. What type of AI is used in most companies today?
Most companies use Narrow AI and Limited Memory AI, such as recommendation engines, fraud detection, forecasting, chatbots, and classification systems.

### 5. What is Generative AI?
Generative AI creates new content such as text, images, code, audio, or video. Examples include large language models, image generators, and coding assistants.

### 6. How do you decide whether a problem needs AI?
Use AI when the problem involves patterns, prediction, classification, ranking, personalization, or language/image understanding, and when enough quality data is available. Do not use AI if simple rules solve the problem reliably.

### 7. What are common risks in AI projects?
Poor data quality, biased data, overfitting, unclear success metrics, privacy issues, lack of explainability, high latency, model drift, and weak monitoring.

### 8. What makes an AI system production-ready?
Clear metrics, tested data pipeline, reproducible training, model versioning, secure deployment, monitoring, alerts, rollback strategy, and retraining process.

### 9. What is model drift?
Model drift happens when the data or business behavior changes over time, causing model performance to degrade in production.

### 10. How do you explain an AI model to non-technical stakeholders?
Start with the business problem, explain what input data the model uses, what output it produces, how accuracy is measured, and what controls exist for mistakes.

---

## Quick Revision Cheatsheet

| Concept | One-Line Answer |
| --- | --- |
| AI | Broad field of intelligent systems |
| ML | Models learn from data |
| DL | Neural networks with many layers |
| NLP | AI for human language |
| GenAI | AI that creates new content |
| Narrow AI | AI specialized for one task |
| AGI | Human-like intelligence across tasks |
| Drift | Production data changes over time |
| Responsible AI | Fair, safe, private, explainable AI |

**Best Interview Formula:** Define the concept -> give one example -> mention trade-offs -> connect to production.
