# AURA Project Context

## Project Overview

AURA is a local-first AI assistant designed to make locally hosted AI accessible through messaging platforms.

## Current AI Engine

- Runtime: Ollama
- Custom model name: `aura`
- Base model: Qwen 3.5 4B
- Model configuration: `Modelfile`

## Current Integration

- Platform: Slack
- Bridge: Node.js
- Framework: Slack Bolt
- Connection: Slack Socket Mode
- Event handled: `app_mention`
- Replies are posted in the original message thread.

## Architecture

Slack → Node.js Slack Bridge → Local Ollama API → AURA Model → Slack Reply

## Local Processing

AI inference runs locally on the developer's computer through Ollama. Slack communication requires an internet connection.

## Development Environment

- Operating system: Windows 11
- Runtime: Node.js
- AI runtime: Ollama

## Current Limitations

- No persistent conversation memory.
- No implemented RAG or document retrieval.
- Response speed depends on local hardware.
- Native custom-agent registration with Switch is not yet verified.

## Development Principles

- Prefer local processing for AI inference.
- Never expose API keys, bot tokens, or secrets.
- Keep the implementation simple and modular.
- Document verified features accurately.
