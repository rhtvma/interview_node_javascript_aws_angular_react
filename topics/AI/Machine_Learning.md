# Machine Learning - Interview Ready Guide

> 📊 **Goal:** Understand ML types, algorithms, model training, evaluation, and production interview answers.

## Table of Contents
1. [Machine Learning Overview](#machine-learning-overview)
2. [Types of Machine Learning](#types-of-machine-learning)
3. [Supervised Learning](#supervised-learning)
4. [Unsupervised Learning](#unsupervised-learning)
5. [Reinforcement Learning](#reinforcement-learning)
6. [Model Training Workflow](#model-training-workflow)
7. [Overfitting, Underfitting, Bias, Variance](#overfitting-underfitting-bias-variance)
8. [Evaluation Metrics](#evaluation-metrics)
9. [Feature Engineering](#feature-engineering)
10. [Common Algorithms](#common-algorithms)
11. [Common Interview Questions](#common-interview-questions)

---

## Machine Learning Overview

**Description:** Machine Learning is a subset of AI where systems learn patterns from data and make predictions or decisions without being explicitly programmed with every rule.

**Key Concepts:**
- ML depends on data quality.
- The model learns relationships between input features and target output.
- Good ML is measured by generalization, not memorization.
- Production ML must handle drift, latency, monitoring, and retraining.

### Simple Interview Answer
Machine Learning allows computers to learn patterns from historical data and use those patterns to make predictions on new data. For example, a fraud detection model learns from past transactions and predicts whether a new transaction is suspicious.

---

## Types of Machine Learning

| Type | Description | Example |
| --- | --- | --- |
| 🟢 **Supervised Learning** | Learns from labeled data | Predict house price, classify spam |
| 🔵 **Unsupervised Learning** | Finds patterns in unlabeled data | Customer segmentation |
| 🟣 **Reinforcement Learning** | Learns actions using rewards | Game AI, robot control |
| 🟡 **Semi-Supervised Learning** | Uses small labeled data + large unlabeled data | Image classification with limited labels |
| 🟠 **Self-Supervised Learning** | Creates training signal from raw data | Language model pretraining |

---

## Supervised Learning

**Description:** Supervised learning trains a model using input data and known correct outputs called labels.

### Types
| Type | Output | Example Algorithm | Example Use Case |
| --- | --- | --- | --- |
| **Regression** | Continuous value | Linear Regression, Random Forest Regressor | Price prediction |
| **Classification** | Category/class | Logistic Regression, Decision Tree, SVM | Spam detection |

### Interview Example
If the target is a number, it is usually regression. If the target is a label or class, it is classification.

---

## Unsupervised Learning

**Description:** Unsupervised learning works with unlabeled data and tries to discover hidden structure, groups, or patterns.

### Common Tasks
| Task | Description | Example |
| --- | --- | --- |
| **Clustering** | Group similar records | Segment customers |
| **Dimensionality Reduction** | Reduce features while preserving information | PCA for visualization |
| **Anomaly Detection** | Find unusual records | Detect abnormal server traffic |
| **Association Rules** | Find item relationships | Market basket analysis |

---

## Reinforcement Learning

**Description:** Reinforcement Learning trains an agent to make decisions by interacting with an environment and receiving rewards or penalties.

**Key Terms:**
- **Agent:** Learner or decision-maker.
- **Environment:** World where the agent acts.
- **State:** Current situation.
- **Action:** Decision taken by the agent.
- **Reward:** Feedback signal.
- **Policy:** Strategy used to choose actions.

### Example Answer
In reinforcement learning, an agent learns the best actions by trial and error. It receives rewards for good actions and penalties for bad ones, then improves its policy over time.

---

## Model Training Workflow

```text
Collect Data -> Clean Data -> Split Data -> Train Model -> Validate -> Test -> Deploy -> Monitor
```

| Step | Description | Interview Focus |
| --- | --- | --- |
| Data collection | Gather relevant examples | quality, labels, bias |
| Preprocessing | Clean, normalize, encode data | missing values, outliers |
| Train/validation/test split | Separate data for learning and evaluation | avoid leakage |
| Training | Fit model parameters | loss function, optimizer |
| Tuning | Choose hyperparameters | grid search, random search |
| Testing | Final unbiased evaluation | generalization |
| Deployment | Serve predictions | API, batch, streaming |
| Monitoring | Track performance | drift, latency, errors |

---

## Overfitting, Underfitting, Bias, Variance

**Description:** These concepts explain why models fail to generalize.

| Concept | Meaning | Symptom | Fix |
| --- | --- | --- | --- |
| 🔴 **Overfitting** | Model memorizes training data | High train accuracy, low test accuracy | Regularization, more data, simpler model |
| 🟡 **Underfitting** | Model is too simple | Low train and test accuracy | Better features, complex model, train longer |
| 🔵 **High Bias** | Wrong assumptions, too simple | Underfitting | Increase model capacity |
| 🟣 **High Variance** | Too sensitive to training data | Overfitting | Regularization, cross-validation |

### Bias-Variance Tradeoff
Bias is error from overly simple assumptions. Variance is error from being too sensitive to training data. A good model balances both to perform well on unseen data.

---

## Evaluation Metrics

**Description:** Metrics depend on the business problem and cost of mistakes.

### Classification Metrics
| Metric | Meaning | Use When |
| --- | --- | --- |
| Accuracy | Correct predictions / all predictions | Balanced classes |
| Precision | Of predicted positives, how many are correct | False positives are costly |
| Recall | Of actual positives, how many found | False negatives are costly |
| F1 Score | Harmonic mean of precision and recall | Imbalanced data |
| ROC-AUC | Ranking quality across thresholds | Compare classifiers |
| Confusion Matrix | TP, FP, TN, FN breakdown | Error analysis |

### Regression Metrics
| Metric | Meaning | Use When |
| --- | --- | --- |
| MAE | Average absolute error | Easy interpretation |
| MSE | Average squared error | Penalize large errors |
| RMSE | Square root of MSE | Same unit as target |
| R2 Score | Variance explained | Model comparison |

---

## Feature Engineering

**Description:** Feature engineering is the process of transforming raw data into useful model inputs.

**Common Techniques:**
- Handle missing values using mean, median, mode, or model-based imputation.
- Encode categorical variables using one-hot encoding, label encoding, or embeddings.
- Scale numerical features using standardization or normalization.
- Create derived features such as age from date of birth.
- Remove leakage features that reveal the target directly.
- Select important features using correlation, mutual information, L1 regularization, or tree importance.

### Interview Tip
Feature engineering often matters more than the algorithm for classical ML problems.

---

## Common Algorithms

| Algorithm | Type | Strength | Weakness |
| --- | --- | --- | --- |
| Linear Regression | Regression | Simple, interpretable | Assumes linear relation |
| Logistic Regression | Classification | Strong baseline | Limited non-linearity |
| Decision Tree | Both | Easy to explain | Overfits easily |
| Random Forest | Both | Robust, handles non-linearity | Less interpretable |
| Gradient Boosting | Both | High accuracy | Needs tuning |
| SVM | Classification | Good for margins | Slow on large datasets |
| KNN | Both | Simple, no training | Slow prediction |
| K-Means | Clustering | Fast segmentation | Need choose K |
| PCA | Dimensionality reduction | Reduces features | Less interpretable |

---

## Common Interview Questions

### 1. What is Machine Learning?
Machine Learning is a subset of AI where models learn patterns from data and use those patterns to make predictions or decisions on new data.

### 2. What is the difference between supervised and unsupervised learning?
Supervised learning uses labeled data with known outputs, while unsupervised learning uses unlabeled data to find patterns or groups.

### 3. What is overfitting?
Overfitting happens when a model memorizes training data and performs poorly on unseen data. It can be reduced using regularization, cross-validation, simpler models, more data, or early stopping.

### 4. What is cross-validation?
Cross-validation splits data into multiple folds, trains on some folds, and validates on the remaining fold. It gives a more reliable estimate of model performance.

### 5. How do you handle imbalanced classes?
Use class weights, oversampling, undersampling, SMOTE, threshold tuning, and metrics like precision, recall, F1, and PR-AUC instead of accuracy alone.

### 6. How do you choose an evaluation metric?
Choose based on business cost. Use precision when false positives are costly, recall when false negatives are costly, F1 for imbalanced classification, and MAE/RMSE for regression.

### 7. What is regularization?
Regularization adds a penalty to model complexity to reduce overfitting. L1 can shrink some coefficients to zero, while L2 shrinks coefficients smoothly.

### 8. What is data leakage?
Data leakage happens when training data contains information that would not be available during real prediction. It causes unrealistically high evaluation scores.

### 9. What is the difference between parameters and hyperparameters?
Parameters are learned from data, such as model weights. Hyperparameters are set before training, such as learning rate, tree depth, or number of neighbors.

### 10. How would you improve a weak ML model?
Check data quality, remove leakage, add useful features, tune hyperparameters, try stronger algorithms, collect more data, and evaluate with the right metric.

---

## Quick Revision Cheatsheet

| Question | Fast Answer |
| --- | --- |
| Regression vs classification | Number output vs class output |
| Overfitting | Good train score, poor test score |
| Underfitting | Poor train and test score |
| Precision | Correct positive predictions |
| Recall | Found actual positives |
| F1 | Balance of precision and recall |
| Cross-validation | More stable model evaluation |
| Leakage | Future/target information in training |
