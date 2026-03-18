# Writing Prompts

A full-stack app that generates randomized creative writing prompts. Each prompt combines a **Thing**, a **Place**, and an **Emotion** drawn from curated word lists, giving writers a quick spark of inspiration.

## Stack

- **Server** — Node.js / Express, serves prompts via `/api/prompt`
- **Client** — React, displays the three prompt cards and a Shuffle button

## Running locally

```bash
# Install root dependencies
npm install

# Start both server and client
npm run dev
```

Or run them separately:

```bash
# Server (port 5000)
cd server && npm start

# Client (port 3000)
cd client && npm start
```

## Tests

```bash
# Server
cd server && npm test

# Client
cd client && npm test -- --watchAll=false
```
