#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create server
const server = new McpServer({
  name: "notes-server",
  version: "1.0.0",
});

// ✅ ADD TOOL HERE
server.tool(
  "create_note",
  {
    title: z.string(),
    content: z.string(),
  },
  async ({ title, content }) => {
    console.log("Creating note:", title);

    return {
      content: [
        {
          type: "text",
          text: `Note created: ${title}`,
        },
      ],
    };
  }
);

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.log("MCP Server running...");
}

main().catch((err) => {
  console.error("Server error:", err);
});
