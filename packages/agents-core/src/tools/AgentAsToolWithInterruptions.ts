import { Tool } from "../types";
import { RunContext } from "../runner/RunContext";

/**
 * AgentAsToolWithInterruptions:
 * Wraps an Agent to be used as a Tool AND bubbles up any interruptions
 * (like needsApproval) from the inner agent to the outer RunContext.
 */
export class AgentAsToolWithInterruptions implements Tool {
  name: string;
  description: string;
  private agent: any;
  import { AgentAsToolWithInterruptions } from "./tools/AgentAsToolWithInterruptions";

const innerAgent = new Agent({
  name: "InnerAgent",
  tools: [/* some tools with needsApproval */],
});

const outerAgent = new Agent({
  name: "OuterAgent",
  tools: [
    new AgentAsToolWithInterruptions(innerAgent)
  ],
});


  constructor(agent: any) {
    this.agent = agent;
    this.name = agent.name;
    this.description = agent.description || "Agent as tool with interruption propagation";
  }

  async execute(input: any, context: RunContext): Promise<any> {
    // Run the inner agent
    const innerResult = await this.agent.run(input, context);

    // --- FIX: propagate interruptions to the parent context ---
    if (innerResult?.interruptions?.length) {
      context.interruptions = [
        ...(context.interruptions || []),
        ...innerResult.interruptions,
      ];
    }

    // Return the inner agent’s final output
    return innerResult.finalOutput;
  }
}
