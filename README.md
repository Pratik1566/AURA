 # AURA — Local-First AI Assistant

**AURA** is a local-first AI assistant powered by Ollama and Qwen 3.5 4B. It connects a locally running AI model to Slack through a Node.js bridge, allowing users to interact with their own AI assistant by mentioning it in a Slack channel.

## Project Overview

The goal of AURA is to make locally hosted AI accessible through familiar communication platforms while keeping AI inference on the user's own computer.

Instead of depending on a paid, hosted AI inference API, AURA uses Ollama to run its language model locally.

## Features

- Local AI inference using Ollama.
- Custom Ollama model named `aura`.
- Powered by Qwen 3.5 4B.
- Slack integration using Slack Bolt.
- Slack Socket Mode communication.
- Responds to messages that mention the bot.
- Replies directly in the original Slack message thread.
- Configurable model and connection settings.

## Architecture

```text
          User
            |
            v
      Slack Workspace
            |
            v
     Slack Socket Mode
            |
            v
    AURA Slack Bridge
        (Node.js)
            |
            v
      Ollama Local API
            |
            v
       AURA Model
      (Qwen 3.5 4B)
            |
            v
     Generated Response
            |
            v
      Slack Thread Reply
```

### How It Works

1. A user mentions AURA in a Slack channel.
2. Slack sends the event to the Node.js bridge through Socket Mode.
3. The bridge extracts the user's question.
4. The bridge sends the question to Ollama's local API.
5. The AURA model generates a response.
6. The bridge posts the response in the original Slack thread.

## Technology Stack

| Component | Technology |
|---|---|
| Language model | Qwen 3.5 4B |
| Model runtime | Ollama |
| Custom model name | aura |
| Backend bridge | Node.js |
| Slack integration | Slack Bolt |
| Communication | Slack Socket Mode |
| Configuration | dotenv |
| Development OS | Windows 11 |

## Local vs Online Processing

AURA is **local-first**, but it is not completely offline.

### Local

- The language model runs on the developer's computer.
- Model inference is handled by Ollama.
- The Slack bridge communicates with the local Ollama API.

### Online

- Slack requires an internet connection.
- Slack messages pass through Slack infrastructure.
- The bridge connects to Slack using Socket Mode.

The current implementation does not require a paid hosted AI inference API.

## Project Structure

```text
AURA/
│
├── README.md
├── AURA.md
├── Modelfile
├── LICENSE
├── .gitignore
│
└── slack-bridge/
    ├── index.js
    ├── package.json
    ├── package-lock.json
    └── .env.example
```

## Requirements

- Windows 11 or another operating system supported by Ollama and Node.js.
- Ollama installed and running.
- Node.js and npm installed.
- A Slack workspace.
- A Slack app configured for Socket Mode.
- Sufficient system memory and processing capacity for the model.

## Installation and Setup

### 1. Install Ollama

Download and install Ollama:

https://ollama.com/

### 2. Download the base model

Open a terminal and run:

```bash
ollama pull qwen3.5:4b
```

### 3. Create the custom AURA model

From the main AURA project directory, run:

```bash
ollama create aura -f Modelfile
```

This creates the custom Ollama model named `aura` using the configuration in `Modelfile`.

### 4. Test the model

```bash
ollama run aura
```

### 5. Configure Slack credentials

Open the `slack-bridge` folder.

Make a copy of `.env.example` and rename the copy to `.env`.

Add your own Slack credentials:

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
OLLAMA_BASE_URL=http://localhost:11434/v1
OLLAMA_MODEL=aura
```

Replace the placeholder values with your own credentials.

**Never upload your real `.env` file to GitHub.**

### 6. Install bridge dependencies

Open a terminal inside the `slack-bridge` directory and run:

```bash
npm install
```

### 7. Start the AURA Slack Bridge

```bash
node index.js
```

The terminal should display:

```text
AURA Slack Bridge is running!
Connected to local Ollama.
```

### 8. Use AURA in Slack

Invite the configured bot to a Slack channel.

Mention the bot and ask a question:

```text
@AURA What is artificial intelligence?
```

AURA should generate a response using the locally running model and reply in the message thread.

## Configuration

The Slack bridge uses these environment variables:

| Variable | Purpose |
|---|---|
| SLACK_BOT_TOKEN | Slack bot authentication |
| SLACK_APP_TOKEN | Slack Socket Mode authentication |
| OLLAMA_BASE_URL | Local Ollama connection address |
| OLLAMA_MODEL | Model name used by the bridge |

## Privacy and Security

- AI inference runs locally through Ollama.
- Slack communication requires internet connectivity.
- Credentials are stored in a local `.env` file.
- `.env` and dependency folders are excluded using `.gitignore`.
- Never publish Slack tokens or other private credentials.

## Current Limitations

- Response speed depends on available hardware.
- CPU-only inference may be slower.
- The current bridge processes individual messages without persistent conversation history.
- Retrieval-Augmented Generation (RAG) is not currently implemented.
- Native custom-agent registration with Switch has not yet been verified.

## Future Improvements

- Persistent conversation memory.
- Document understanding and RAG.
- Improved response speed and model optimization.
- More messaging platform integrations.
- Better error handling and automated testing.
- Verified native Switch agent integration.

## Project Goal

AURA demonstrates a practical local-first AI assistant architecture: a locally hosted language model made accessible through a familiar messaging platform.

The project explores how users can interact with their own AI model without depending on a paid hosted AI inference service.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
