---
title: "What is GEO MCP server: use this site from your AI assistant"
description: "whatisgeo.app has a free, read-only MCP server at https://whatisgeo.app/mcp. Connect it to Claude, ChatGPT, Claude Code, Cursor or VS Code and your assistant can search and read every public page here."
updated: "2026-11-02"
---
<!-- copy: intro drafted by ScriptGrain in the whatisgeo.app voice profile (generation 34847705-81c1-46be-9657-0708c1ab341b), edited; setup steps checked against Anthropic and OpenAI docs 2026-11-02 -->

If you ask an AI assistant about Generative Engine Optimisation, it usually answers from memory or a quick web search. That's where it goes wrong. whatisgeo.app now runs an MCP server. MCP (Model Context Protocol) is the open standard that assistants such as Claude, ChatGPT, Cursor and VS Code use to connect to outside tools and data. Add the address below, and your assistant can search this site, read any of its public pages in full, and list them newest first. So it's working from the pages themselves, and its answers can quote and link the actual page, with its last-updated date.

It's free. No account, no key, no sign-up. The server is read-only, so it can't change anything, and it only sees pages that are already public on the site. Setup takes a few steps, and they follow below.

## The address

```text
https://whatisgeo.app/mcp
```

It speaks MCP over Streamable HTTP. There is no sign-in, no API key and nothing to install on the site's side.

## What your assistant can do with it

| Tool | What it does |
| --- | --- |
| `search_site` | Searches every page listed in the site's sitemap and returns the best matches, each with its URL, a short snippet and its last-updated date. |
| `get_page` | Fetches one page from this site as clean text, with its title and last-updated date. |
| `list_pages` | Lists the pages, newest first, a section at a time if you want. |

All three only read. None of them can post, buy, sign up or change anything, and none of them can see a page that isn't already public.

Things to ask once it's connected:

- "What does whatisgeo.app say is the difference between AEO and SEO?"
- "Search whatisgeo.app for which AI crawlers to allow in robots.txt."
- "List the newest guides on whatisgeo.app."

## How to connect it

### Claude (claude.ai and the desktop app)

Open **Settings → Connectors** (in newer versions, **Customize → Connectors**), choose **Add custom connector**, name it What is GEO, paste the address above and leave the OAuth fields empty. The Free plan allows one custom connector.

### ChatGPT

ChatGPT adds custom MCP servers through **Developer mode**: **Settings → Apps → Advanced settings → Developer mode**, then create an app with the address above and no authentication. Which plans get Developer mode has changed more than once, so if you can't see it, check OpenAI's help pages for your plan.

### Claude Code

```sh
claude mcp add --transport http whatisgeo https://whatisgeo.app/mcp
```

### Cursor

Add this to `~/.cursor/mcp.json` (or `.cursor/mcp.json` in a project):

```json
{
  "mcpServers": {
    "whatisgeo": { "url": "https://whatisgeo.app/mcp" }
  }
}
```

### VS Code

Add this to `.vscode/mcp.json`:

```json
{
  "servers": {
    "whatisgeo": { "type": "http", "url": "https://whatisgeo.app/mcp" }
  }
}
```

## What we record

When a tool is called, we may count it: which tool, whether it worked, and a rough label for the kind of client (Claude, ChatGPT, Cursor and so on). We don't store what you searched for, which pages you asked for, your IP address or anything else about you.

## Other machine-readable files

- [llms.txt](https://whatisgeo.app/llms.txt): a plain-text map of the site for AI tools.
- [MCP discovery card](https://whatisgeo.app/.well-known/mcp.json): the server's address, transport and tools as JSON.
- [Sitemap](https://whatisgeo.app/sitemap.xml): every public page, with last-modified dates. The MCP server indexes exactly these pages.
