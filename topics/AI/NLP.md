# Natural Language Processing - Interview Ready Guide

> 💬 **Goal:** Understand NLP fundamentals, text preprocessing, embeddings, Transformers, LLMs, and interview-ready answers.

## Table of Contents
1. [NLP Overview](#nlp-overview)
2. [Common NLP Tasks](#common-nlp-tasks)
3. [Text Preprocessing](#text-preprocessing)
4. [Tokenization](#tokenization)
5. [Embeddings](#embeddings)
6. [Language Models](#language-models)
7. [Attention and Transformers](#attention-and-transformers)
8. [Large Language Models](#large-language-models)
9. [NLP Evaluation Metrics](#nlp-evaluation-metrics)
10. [NLP Deployment Concerns](#nlp-deployment-concerns)
11. [Common Interview Questions](#common-interview-questions)

---

## NLP Overview

**Description:** Natural Language Processing is a branch of AI that helps machines understand, interpret, and generate human language.

**Key Concepts:**
- Text must be converted into numerical form before models can process it.
- Context matters because the same word can mean different things in different sentences.
- Modern NLP relies heavily on Transformers and large pretrained language models.
- Evaluation must consider accuracy, fluency, relevance, factuality, and safety.

### Simple Interview Answer
NLP is the field of AI that deals with human language. It includes tasks like text classification, sentiment analysis, named entity recognition, question answering, summarization, translation, and chatbot development.

---

## Common NLP Tasks

| Task | Description | Example |
| --- | --- | --- |
| 🟢 Text classification | Assign category to text | Spam detection |
| 😊 Sentiment analysis | Detect emotion or opinion | Positive/negative review |
| 🏷️ Named Entity Recognition | Extract entities | Person, company, location |
| 🔎 Question answering | Answer from context | FAQ assistant |
| ✂️ Summarization | Shorten long text | Meeting summary |
| 🌐 Translation | Convert between languages | English to Hindi |
| ✨ Text generation | Generate new text | Email drafting |
| 🔍 Semantic search | Search by meaning | Knowledge base search |

---

## Text Preprocessing

**Description:** Text preprocessing cleans and standardizes raw text before modeling.

| Step | Description | Example |
| --- | --- | --- |
| Lowercasing | Normalize case | "Hello" -> "hello" |
| Removing noise | Remove HTML, URLs, symbols | Clean scraped text |
| Stopword removal | Remove common words | "the", "is", "and" |
| Stemming | Cut word to root form | "playing" -> "play" |
| Lemmatization | Convert to dictionary form | "better" -> "good" |
| Normalization | Standardize format | dates, numbers |

### Interview Tip
For traditional NLP, preprocessing is very important. For modern Transformer models, avoid aggressive preprocessing because tokenizers and pretrained models expect natural text patterns.

---

## Tokenization

**Description:** Tokenization splits text into smaller units such as words, characters, or subwords.

| Type | Description | Example |
| --- | --- | --- |
| Word tokenization | Splits by words | "I love AI" -> I, love, AI |
| Character tokenization | Splits by characters | "AI" -> A, I |
| Subword tokenization | Splits into common pieces | "unhappy" -> un, happy |
| Sentence tokenization | Splits by sentences | paragraph -> sentences |

### Subword Tokenization
Modern models often use BPE, WordPiece, or SentencePiece. These reduce out-of-vocabulary problems and handle rare words better.

---

## Embeddings

**Description:** Embeddings convert words, tokens, sentences, or documents into vectors that capture meaning.

| Embedding Type | Description | Example |
| --- | --- | --- |
| One-hot encoding | Sparse vector, no meaning | Traditional baseline |
| Word2Vec | Static word embedding | Same word has same vector |
| GloVe | Global co-occurrence embedding | Static semantic vector |
| FastText | Uses subword information | Handles rare words better |
| BERT embeddings | Contextual embeddings | Word vector changes by context |
| Sentence embeddings | Vector for full text | Semantic search |

### Static vs Contextual Embeddings
Static embeddings assign the same vector to a word every time. Contextual embeddings change based on surrounding words, so "bank" in "river bank" and "bank loan" can have different meanings.

---

## Language Models

**Description:** A language model predicts language patterns, commonly the next word or missing word.

| Model Type | Description | Example |
| --- | --- | --- |
| N-gram model | Uses previous N words | Traditional NLP |
| Masked language model | Predicts hidden tokens | BERT |
| Causal language model | Predicts next token | GPT-style models |
| Seq2Seq model | Converts input sequence to output sequence | Translation |

### Interview Answer
A language model learns probability patterns in text. Modern language models are trained on large text corpora and can generate, classify, summarize, translate, or answer questions.

---

## Attention and Transformers

**Description:** Attention allows a model to focus on the most relevant tokens when processing language.

### Attention
Attention assigns different importance to different words. For example, in translation, the model can focus on the relevant source words while generating each target word.

### Transformer
A Transformer is an architecture based on attention. It processes tokens in parallel and captures long-range dependencies better than traditional RNNs.

| Component | Description |
| --- | --- |
| Self-attention | Tokens attend to other tokens in the same sequence |
| Multi-head attention | Learns multiple relationship patterns |
| Positional encoding | Adds token order information |
| Feed-forward layer | Transforms token representations |
| Layer normalization | Stabilizes training |

---

## Large Language Models

**Description:** Large Language Models are large Transformer-based models trained on massive text/code datasets to understand and generate language.

**Key Concepts:**
- **Prompting:** Give instructions or examples in input.
- **Fine-tuning:** Train model further on task-specific data.
- **RAG:** Retrieval-Augmented Generation; fetch external knowledge before answering.
- **Hallucination:** Model generates confident but incorrect information.
- **Context window:** Maximum tokens the model can consider at once.
- **Temperature:** Controls randomness of generation.

### RAG Interview Answer
RAG combines retrieval with generation. The system first retrieves relevant documents from a knowledge base, then sends them to the LLM as context so the answer is more grounded and up to date.

---

## NLP Evaluation Metrics

| Task | Metrics | Notes |
| --- | --- | --- |
| Classification | Accuracy, Precision, Recall, F1 | Use F1 for imbalance |
| NER | Entity-level Precision, Recall, F1 | Exact span matters |
| Summarization | ROUGE, human evaluation | Check factuality too |
| Translation | BLEU, COMET, human evaluation | BLEU is not enough alone |
| Language modeling | Perplexity | Lower is usually better |
| Semantic search | Recall@K, MRR, NDCG | Ranking quality |
| LLM output | Human review, factuality, safety | Automated metrics are limited |

---

## NLP Deployment Concerns

**Description:** NLP systems have unique production risks because text input can be ambiguous, sensitive, and adversarial.

**Key Concerns:**
- Tokenization consistency between training and serving.
- Latency and cost for large models.
- Privacy of user text and documents.
- Prompt injection and data leakage.
- Hallucination and factual correctness.
- Bias and unsafe generated content.
- Monitoring drift in user language and intent.

---

## Common Interview Questions

### 1. What is NLP?
NLP is a branch of AI that enables machines to understand, process, and generate human language.

### 2. What is tokenization?
Tokenization splits text into smaller units such as words, characters, or subwords so models can process language numerically.

### 3. What is the difference between stemming and lemmatization?
Stemming cuts words to a rough root, while lemmatization converts words to their proper dictionary form using linguistic rules.

### 4. What are embeddings?
Embeddings are dense vector representations of text that capture semantic meaning and can be used by ML or deep learning models.

### 5. What is the difference between Word2Vec and BERT embeddings?
Word2Vec gives a fixed vector for each word, while BERT gives contextual vectors that change based on the sentence.

### 6. What is attention?
Attention lets a model assign different importance to different tokens, helping it capture relevant context and long-range dependencies.

### 7. Why are Transformers powerful for NLP?
Transformers use self-attention, process tokens in parallel, and capture long-range dependencies better than older sequence models like RNNs.

### 8. What is an LLM hallucination?
Hallucination is when an LLM generates information that sounds correct but is factually wrong or unsupported.

### 9. How can you reduce hallucinations?
Use RAG, better prompts, citations, tool/function calling, constrained decoding, validation checks, human review, and clear fallback behavior.

### 10. What is the difference between fine-tuning and prompting?
Prompting guides the model through input instructions without changing weights. Fine-tuning updates model weights using task-specific training data.

---

## Quick Revision Cheatsheet

| Concept | Fast Answer |
| --- | --- |
| NLP | AI for human language |
| Tokenization | Split text into tokens |
| Embedding | Text as vectors |
| Static embedding | Same vector always |
| Contextual embedding | Vector changes by context |
| Attention | Focus on relevant tokens |
| Transformer | Attention-based architecture |
| LLM | Large Transformer language model |
| RAG | Retrieve context before generation |
| Hallucination | Confident but wrong output |
