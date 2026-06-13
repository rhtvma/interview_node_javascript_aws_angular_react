# Generative AI (GenAI)

Generative AI, or GenAI, is a branch of artificial intelligence focused on creating new content such as text, code, images, audio, video, summaries, designs, and structured data. It learns patterns from large datasets and generates outputs that resemble those patterns while adapting to the user's prompt or task.

Common GenAI systems include chat assistants, coding assistants, image generators, voice generators, document summarizers, and enterprise automation agents.

## What GenAI Can Generate

- Text: answers, summaries, emails, reports, articles, translations
- Code: functions, tests, scripts, explanations, refactors
- Images: illustrations, product mockups, concept art, diagrams
- Audio: speech, music, sound effects
- Video: short clips, animations, synthetic scenes
- Structured data: JSON, SQL, tables, forms, classifications

## How GenAI Works

Most modern GenAI systems are built on foundation models. These are large models trained on broad datasets and then adapted for specific tasks.

For text generation, a large language model predicts the next token based on the previous tokens and the context provided in the prompt.

Example:

```text
Prompt: Explain event loop in Node.js.
Model: The event loop is the mechanism that allows Node.js to handle asynchronous operations...
```

The model is not copying a fixed answer from a database. It generates an answer based on learned statistical patterns, prompt context, and decoding settings.

## Important Concepts

## Foundation Model

A foundation model is a large general-purpose model trained on a broad dataset. It can be adapted to many downstream tasks.

Examples:

- Large language models for text and code
- Vision-language models for images and text
- Diffusion models for image generation
- Speech models for transcription or voice generation

## Large Language Model (LLM)

An LLM is a model trained to understand and generate human language. It can answer questions, summarize content, reason over instructions, generate code, and transform text.

LLMs are commonly used in:

- Chatbots
- Code assistants
- Knowledge assistants
- Document processing
- Search experiences
- Workflow automation

## Token

A token is a piece of text processed by the model. It may be a word, part of a word, punctuation, or whitespace.

Example:

```text
"Generative AI is useful" -> tokens such as "Gener", "ative", " AI", " is", " useful"
```

Models have context limits measured in tokens.

## Context Window

The context window is the maximum amount of text the model can consider at once, including system instructions, user input, retrieved documents, tool results, and the generated answer.

If important information is outside the context window, the model cannot use it directly.

## Prompt

A prompt is the input given to the model. It may include instructions, examples, constraints, source material, output format, and the user's question.

Good prompts are specific about:

- Role
- Task
- Context
- Constraints
- Output format
- What to do when information is missing

## Inference

Inference is the process of running a trained model to generate an output.

Training creates the model. Inference uses the model.

## Temperature

Temperature controls randomness during generation.

- Low temperature: more focused and deterministic
- High temperature: more creative and varied

For factual answers, code, and extraction tasks, lower temperature is usually preferred. For brainstorming and creative writing, higher temperature can be useful.

## Hallucination

Hallucination happens when a model produces information that sounds plausible but is incorrect, unsupported, or fabricated.

Ways to reduce hallucination:

- Provide reliable context.
- Use Retrieval-Augmented Generation (RAG).
- Ask for citations.
- Limit the answer to known source material.
- Validate critical outputs.
- Use structured output for extraction tasks.

## Common GenAI Architectures

## Direct Prompting

```text
User Prompt -> LLM -> Response
```

This is the simplest pattern. It works well for general tasks, drafting, rewriting, summarization, and reasoning over small inputs.

## Retrieval-Augmented Generation

```text
User Question -> Retrieve Relevant Knowledge -> LLM -> Grounded Answer
```

RAG connects the model to external knowledge such as company documents, product manuals, databases, and code repositories.

Use RAG when answers must be grounded in private, current, or source-specific information.

## Tool-Using Agents

```text
User Goal -> LLM Plans -> Calls Tools -> Observes Results -> Final Answer
```

Agents use tools such as search, databases, APIs, calculators, browsers, or code execution environments. They are useful for workflows that require multiple steps or external actions.

## Fine-Tuned Model

```text
Training Examples -> Fine-Tuned Model -> Task-Specific Output
```

Fine-tuning adapts a model's behavior for a task, style, domain, or output pattern. It is not usually the first choice for simply adding new facts.

## Multimodal GenAI

Multimodal models can work with more than one type of input or output, such as text, images, audio, video, or files.

Examples:

- Answer questions about an image
- Extract data from a scanned document
- Generate captions for video
- Explain a chart
- Produce code from a UI screenshot

## GenAI vs Traditional AI

| Traditional AI | Generative AI |
| --- | --- |
| Often predicts, classifies, ranks, or detects | Creates new content |
| Usually trained for a narrow task | Often general-purpose and prompt-driven |
| Output may be a label, score, or decision | Output may be text, code, image, audio, or structured data |
| Examples: fraud detection, recommendation, forecasting | Examples: chatbots, summarizers, code generation, image generation |

Traditional AI and GenAI are often used together in production systems.

## GenAI vs Machine Learning

Machine learning is the broader field where systems learn patterns from data. GenAI is a type of machine learning focused on generating new content.

In simple terms:

```text
Machine Learning -> broad category
Deep Learning -> neural-network-based ML
Generative AI -> models that create new content
LLMs -> GenAI models focused on language
```

## Business Use Cases

- Customer support assistants
- Internal knowledge chatbots
- Code generation and review
- Test case generation
- Document summarization
- Contract and policy analysis
- Sales email drafting
- Data extraction from documents
- Personalized learning assistants
- Search result summarization
- Report generation
- Meeting notes and action items

## Engineering Use Cases

- Generate boilerplate code
- Explain unfamiliar code
- Write unit tests
- Refactor code
- Translate code between languages
- Generate API documentation
- Debug errors
- Create SQL queries
- Summarize logs
- Build developer assistants over internal repositories

## Risks and Limitations

## Hallucination

Generated output may be wrong even when it sounds confident.

## Bias

Models can reproduce biases from training data or user-provided context.

## Data Privacy

Sensitive data must be handled carefully. Do not send confidential data to external model providers unless approved by company policy.

## Security

GenAI applications can be vulnerable to prompt injection, data leakage, insecure tool use, and unsafe generated code.

## Cost

Large models and long prompts can be expensive. Token usage, model choice, caching, and retrieval design affect cost.

## Latency

Complex prompts, large context, tool calls, and multi-step agents can increase response time.

## Non-Determinism

The same prompt may produce slightly different outputs, especially with higher temperature settings.

## Best Practices

- Define the task clearly before choosing a model.
- Use smaller or cheaper models when they meet quality needs.
- Keep prompts clear, specific, and testable.
- Use RAG for private or frequently changing knowledge.
- Use structured outputs for data extraction and automation.
- Add human review for high-risk decisions.
- Do not trust generated code without testing it.
- Log prompts, outputs, model versions, and evaluation results.
- Monitor quality, cost, latency, and safety.
- Protect sensitive data and enforce access control.

## Evaluation

GenAI systems should be evaluated with realistic examples.

Important evaluation dimensions:

- Accuracy
- Relevance
- Faithfulness to provided context
- Completeness
- Safety
- Bias
- Format correctness
- Latency
- Cost
- User satisfaction

For production systems, evaluation should include both automated checks and human review.

## Prompt Engineering Example

Weak prompt:

```text
Summarize this.
```

Better prompt:

```text
Summarize the following support ticket in 5 bullet points.
Include the customer's problem, affected product, troubleshooting steps already tried, likely cause, and recommended next action.
If any detail is missing, write "Not provided."
```

The better prompt defines the task, format, required fields, and behavior for missing information.

## Interview Questions

## What is Generative AI?

Generative AI is AI that creates new content such as text, code, images, audio, video, or structured data based on patterns learned from training data and context from the prompt.

## How is GenAI different from traditional AI?

Traditional AI often classifies, predicts, ranks, or detects. GenAI creates new content. For example, a traditional model may classify an email as spam, while a GenAI model may write a reply to the email.

## What is an LLM?

An LLM is a large language model trained to understand and generate text. It predicts tokens based on context and can perform tasks such as answering questions, summarizing, translating, and generating code.

## What is a token?

A token is a unit of text processed by the model. Models count input and output size in tokens.

## What is prompt engineering?

Prompt engineering is the process of designing effective instructions and context for a model so it produces useful, accurate, and well-formatted outputs.

## What is the difference between RAG and fine-tuning?

RAG retrieves external knowledge at query time, which is useful for current or private facts. Fine-tuning changes model behavior using training examples, which is useful for style, format, or task specialization.

## What are common GenAI risks?

Common risks include hallucination, bias, data leakage, prompt injection, unsafe tool use, copyright concerns, high cost, and unreliable outputs for high-stakes decisions.

## How do you make a GenAI application production-ready?

Use clear requirements, reliable prompts, model evaluation, monitoring, logging, security controls, access control, fallback behavior, human review where needed, and cost and latency optimization.

## Key Takeaway

GenAI is powerful because it can generate useful content from natural-language instructions, but production systems need grounding, evaluation, security, monitoring, and human judgment for reliable results.
