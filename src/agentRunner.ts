//install dependencies
npm install dotenv zod @openrouter/ai-sdk-provider @openai/agents @openai/agents-extensions
//open router key.env
OPEN_ROUTER_KEY=your_api_key_here
//run
ts-node agentRunner.ts

// agentRunner.ts
import dotenv from "dotenv";
import { Agent } from "@openai/agents";
import { aisdk } from "@openai/agents-extensions";
import { Runner } from "@openai/agents";
import { z } from "zod";
import { createOpenRouter as originalCreateOpenRouter } from "@openrouter/ai-sdk-provider";

dotenv.config();

/**
 * Patched OpenRouter provider:
 * Automatically forces JSON response_format if outputType is provided
 */
function createOpenRouterWithJSON(config: { apiKey: string; baseUrl?: string }) {
  return function (modelName: string, options: any = {}) {
    if (options.outputType && (!options.extraBody || !options.extraBody.response_format)) {
      options.extraBody = {
        ...options.extraBody,
        response_format: { type: "json" }
      };
    }
    return originalCreateOpenRouter(config)(modelName, options);
  };
}

// ---------- CONFIGURE PROVIDER ----------
const openrouter = createOpenRouterWithJSON({
  apiKey: process.env.OPEN_ROUTER_KEY || ""
});

// ---------- DEFINE SCHEMA ----------
const StartAgentResponseSchema2 = z.object({
  content: z.string().describe("Markdown formatted content")
});

// ---------- CREATE MODEL & AGENT ----------
const model = aisdk(openrouter("anthropic/claude-sonnet-4"));

const agent = new Agent({
  name: "Assistant",
  instructions: "You are a helpful assistant",
  outputType: StartAgentResponseSchema2
});

// ---------- RUNNER ----------
const runner = new Runner({
  model,
  tracingDisabled: true
});

// ---------- EXECUTE ----------
(async () => {
  try {
    const result = await runner.run(agent, "Write a haiku about programming.");
    console.log("Final Output:", result.finalOutput);
  } catch (e) {
    console.error("Error:", e);
  }
})();
