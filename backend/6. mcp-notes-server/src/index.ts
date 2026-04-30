#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// -----------------------------
// In-memory storage
// -----------------------------
const notes: { id: number; title: string; content: string }[] = [];
let currentId = 1;

// -----------------------------
// Create MCP Server
// -----------------------------
const server = new McpServer({
  name: "notes-server",
  version: "1.0.0",
});

// -----------------------------
// Tool: create_note
// -----------------------------
server.tool(
  "create_note",
  {
    title: z.string(),
    content: z.string(),
  },
  async ({ title, content }) => {
    const newNote = {
      id: currentId++,
      title,
      content,
    };

    notes.push(newNote);

    console.log("New note created:", newNote);
    console.log("All notes:", notes);

    return {
      content: [
        {
          type: "text",
          text: `✅ Note created (ID: ${newNote.id})\nTitle: ${title}`,
        },
      ],
    };
  }
);

// -----------------------------
// Tool: get_notes
// -----------------------------
server.tool(
  "get_notes",
  {},
  async () => {
    if (notes.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "No notes found.",
          },
        ],
      };
    }

    const formatted = notes
      .map((n) => `ID: ${n.id} | ${n.title} -> ${n.content}`)
      .join("\n");

    return {
      content: [
        {
          type: "text",
          text: `📒 Notes:\n${formatted}`,
        },
      ],
    };
  }
);

// -----------------------------
// Tool: delete_note
// -----------------------------
server.tool(
  "delete_note",
  {
    id: z.number(),
  },
  async ({ id }) => {
    const index = notes.findIndex((n) => n.id === id);

    if (index === -1) {
      return {
        content: [
          {
            type: "text",
            text: `❌ Note with ID ${id} not found.`,
          },
        ],
      };
    }

    const deleted = notes.splice(index, 1)[0];

    console.log("Deleted note:", deleted);
    console.log("Remaining notes:", notes);

    return {
      content: [
        {
          type: "text",
          text: `🗑️ Deleted note: ${deleted.title}`,
        },
      ],
    };
  }
);

// -----------------------------
// Start server
// -----------------------------
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.log("MCP Server running...");
}

main().catch((err) => {
  console.error("Server error:", err);
});