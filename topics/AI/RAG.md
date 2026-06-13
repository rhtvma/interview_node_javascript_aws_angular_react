# Retrieval-Augmented Generation (RAG)

Retrieval-Augmented Generation, or RAG, is an AI architecture that combines a large language model with an external knowledge retrieval system. Instead of relying only on the model's training data, the application first retrieves relevant information from trusted sources and then gives that context to the model so it can generate a grounded answer.

RAG is commonly used for chatbots, enterprise search, support assistants, document Q&A, legal research, medical knowledge assistants, code assistants, and internal knowledge-base tools.

## Why RAG Is Needed

Large language models are powerful, but they have limits:

- They may not know private, recent, or domain-specific information.
- They can hallucinate when asked about facts outside their reliable knowledge.
- They do not automatically cite internal company documents.
- Retraining or fine-tuning for every knowledge update is expensive.

RAG solves this by keeping knowledge outside the model and retrieving it at query time.

## High-Level Flow

1. User asks a question.
2. The application converts the question into a search query or embedding.
3. A retriever searches a knowledge source such as a vector database, keyword index, or hybrid search system.
4. The most relevant chunks are selected and optionally reranked.
5. The selected context is inserted into the prompt.
6. The LLM generates an answer using the retrieved context.
7. The application may return citations, source links, confidence signals, or follow-up questions.

## Core Components

## 1. Data Sources

These are the documents or systems that contain the knowledge:

- PDFs
- Web pages
- Markdown files
- Wikis
- Database records
- Support tickets
- Code repositories
- API documentation
- CRM or ERP data

Good RAG starts with good source data. Messy, duplicated, stale, or contradictory content usually leads to poor answers.

## 2. Ingestion Pipeline

The ingestion pipeline prepares documents for retrieval.

Typical steps:

- Load documents from source systems.
- Clean unwanted text such as headers, footers, navigation, and boilerplate.
- Split documents into smaller chunks.
- Attach metadata such as title, author, URL, date, department, permissions, and document type.
- Convert chunks into embeddings.
- Store chunks and embeddings in a search index or vector database.

## 3. Chunking

Chunking breaks large documents into smaller pieces that can fit into the model's context window.

Common strategies:

- Fixed-size chunks: split every N tokens or characters.
- Recursive chunks: split by headings, paragraphs, then sentences.
- Semantic chunks: split based on meaning.
- Sliding-window chunks: overlap neighboring chunks to preserve context.

Good chunks are large enough to contain useful meaning but small enough to retrieve precisely.

Example:

```text
Bad chunk: "Refunds"
Better chunk: "Customers can request a refund within 30 days of purchase if the product has not been used."
```

## 4. Embeddings

An embedding is a numeric vector that represents the meaning of text. Similar text produces vectors that are close together in vector space.

In RAG, embeddings are used to compare the user's question with document chunks.

Example:

```text
Question: "How do I reset my password?"
Relevant chunk: "Users can reset their password from Account Settings by selecting Forgot Password."
```

Even though the words are not identical, the embedding search can find the semantic match.

## 5. Vector Database

A vector database stores embeddings and supports similarity search.

Examples:

- Pinecone
- Weaviate
- Milvus
- Qdrant
- Chroma
- FAISS
- Elasticsearch with vector search
- PostgreSQL with pgvector

Vector databases often store both:

- The embedding vector
- The original text chunk and metadata

## 6. Retrieval

Retrieval finds the most relevant chunks for a user query.

Common approaches:

- Vector search: finds semantically similar content.
- Keyword search: finds exact or lexical matches.
- Hybrid search: combines vector and keyword search.
- Metadata filtering: limits results by document type, date, tenant, role, region, or product.
- Reranking: uses a stronger model to reorder retrieved chunks by relevance.

Hybrid retrieval is often better than pure vector search because exact terms, IDs, names, error codes, and product numbers matter.

## 7. Prompt Construction

The retrieved chunks are added to the prompt as context.

Example:

```text
You are a support assistant. Answer using only the provided context.

Context:
[1] Password resets expire after 15 minutes.
[2] Users can request a reset link from the login page.

Question:
How long does a password reset link last?
```

The prompt should clearly tell the model how to use the context and what to do when the answer is missing.

## 8. Generation

The LLM generates the final response from the question and retrieved context.

Good RAG answers should be:

- Grounded in the retrieved documents
- Concise
- Relevant to the user's question
- Clear about uncertainty
- Able to cite sources when required

## RAG vs Fine-Tuning

| RAG | Fine-Tuning |
| --- | --- |
| Adds external knowledge at query time | Changes model behavior or style through training |
| Easier to update knowledge | Requires training process to update learned behavior |
| Good for factual, changing, private data | Good for tone, format, classification, or repeated task patterns |
| Can provide citations | Usually cannot directly cite training examples |
| Depends heavily on retrieval quality | Depends heavily on training data quality |

Use RAG when the model needs access to specific knowledge. Use fine-tuning when the model needs to behave differently.

Many production systems use both.

## Common RAG Architectures

## Basic RAG

```text
User Query -> Retriever -> Relevant Chunks -> LLM -> Answer
```

This is simple and works well for small or clean knowledge bases.

## Advanced RAG

```text
User Query
  -> Query rewriting
  -> Hybrid retrieval
  -> Metadata filtering
  -> Reranking
  -> Context compression
  -> LLM generation
  -> Citation validation
```

Advanced RAG is useful when the knowledge base is large, noisy, permissioned, or business critical.

## Agentic RAG

Agentic RAG lets the model decide when and how to retrieve information, sometimes across multiple tools.

Example:

- Search policy documents.
- Query a database.
- Call an API.
- Compare the retrieved information.
- Generate a final answer.

This is more flexible but harder to control, test, and secure.

## Important Design Choices

## Chunk Size

If chunks are too small, they may miss context. If chunks are too large, retrieval may become noisy and expensive.

A common starting point is 300 to 800 tokens per chunk with some overlap, then tune based on evaluation results.

## Top-K Results

Top-k means how many chunks are retrieved.

- Too few chunks: missing information.
- Too many chunks: noisy prompt and higher cost.

Many systems retrieve more chunks first, then rerank and pass only the best few to the model.

## Metadata

Metadata makes retrieval more precise.

Examples:

```json
{
  "source": "employee-handbook.pdf",
  "department": "HR",
  "region": "US",
  "updated_at": "2026-01-10",
  "access_level": "internal"
}
```

Metadata is also important for access control and citations.

## Permissions

Enterprise RAG must enforce document-level or chunk-level permissions. The retriever should only return content the user is allowed to see.

Never rely only on the final LLM prompt to hide unauthorized data.

## Evaluation

RAG systems should be evaluated regularly.

Important metrics:

- Retrieval precision: are retrieved chunks relevant?
- Retrieval recall: did the system find the needed evidence?
- Answer faithfulness: is the answer supported by the context?
- Answer relevance: does the answer address the question?
- Citation accuracy: do cited sources actually support the claim?
- Latency: how fast is the system?
- Cost: how many tokens and model calls are used?

## Common Problems

## Hallucination

The model may answer with unsupported information.

Mitigations:

- Instruct the model to answer only from context.
- Return "I don't know" when evidence is missing.
- Use citations.
- Validate answers against retrieved evidence.

## Poor Retrieval

The answer may fail because the right chunk was never retrieved.

Mitigations:

- Improve chunking.
- Use hybrid search.
- Add metadata filters.
- Use query rewriting.
- Add reranking.
- Improve source document quality.

## Lost Context

The retrieved chunk may contain partial information but miss surrounding details.

Mitigations:

- Use chunk overlap.
- Retrieve neighboring chunks.
- Chunk by headings or semantic sections.
- Include document hierarchy metadata.

## Stale Data

The index may contain outdated documents.

Mitigations:

- Track source update times.
- Re-index changed documents.
- Remove deleted or expired content.
- Display source dates.

## Prompt Injection

Documents may contain malicious instructions such as "ignore previous instructions."

Mitigations:

- Treat retrieved content as untrusted data.
- Separate system instructions from retrieved text.
- Filter or sanitize risky content.
- Use instruction hierarchy.
- Restrict tool access.

## Best Practices

- Start with clean, authoritative data.
- Use hybrid search for real-world document collections.
- Store rich metadata with every chunk.
- Enforce permissions before generation.
- Add citations for factual answers.
- Evaluate retrieval separately from generation.
- Build test questions from real user queries.
- Log retrieved chunks for debugging.
- Prefer "not enough information" over unsupported answers.
- Monitor quality, latency, and cost in production.

## Simple RAG Pseudocode

```javascript
async function answerQuestion(question, user) {
  const queryEmbedding = await embed(question);

  const candidates = await vectorDb.search({
    vector: queryEmbedding,
    topK: 20,
    filter: {
      tenantId: user.tenantId,
      allowedRoles: user.roles
    }
  });

  const rankedChunks = await rerank(question, candidates);
  const context = rankedChunks.slice(0, 5).map(chunk => chunk.text).join("\n\n");

  return llm.generate({
    system: "Answer using only the provided context. If the answer is missing, say you do not know.",
    user: `Context:\n${context}\n\nQuestion:\n${question}`
  });
}
```

## Interview Questions

## What is RAG?

RAG is an architecture that retrieves relevant external knowledge and provides it to a language model so the model can generate a more accurate, grounded answer.

## Why not just fine-tune the model?

Fine-tuning is better for changing behavior, style, or repeated task performance. RAG is better when the model needs access to current, private, or source-specific knowledge. RAG is also easier to update because the knowledge lives in an external index.

## What is the role of embeddings in RAG?

Embeddings convert text into vectors that capture semantic meaning. They allow the system to find chunks that are conceptually similar to the user's query.

## What is hybrid search?

Hybrid search combines semantic vector search with keyword search. It is useful because vector search handles meaning, while keyword search handles exact terms such as names, IDs, codes, and product numbers.

## What is reranking?

Reranking takes an initial set of retrieved chunks and reorders them using a stronger relevance model. It improves the quality of the context passed to the LLM.

## How do you reduce hallucination in RAG?

Use high-quality retrieval, provide clear instructions, require answers to be grounded in context, add citations, and make the model say it does not know when evidence is missing.

## How do you secure an enterprise RAG system?

Enforce access control during retrieval, filter by tenant and permissions, avoid exposing raw unauthorized chunks, protect against prompt injection, log access, and audit source usage.

## Key Takeaway

RAG is not just "vector database plus LLM." A reliable RAG system depends on clean data, thoughtful chunking, strong retrieval, metadata, access control, evaluation, and careful prompt design.
