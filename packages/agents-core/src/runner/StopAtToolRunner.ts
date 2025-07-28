import { Runner } from "./Runner";
import { RunOptions, RunResult } from "../types";

/**
 * StopAtToolRunner:
 * Extends the base Runner to ensure that when stopAtToolNames is triggered,
 * the tool's output becomes the finalOutput of the run.
 */
export class StopAtToolRunner extends Runner {
  constructor(options: RunOptions) {
    super(options);
  }

  import { StopAtToolRunner } from "./runner/StopAtToolRunner";

const runner = new StopAtToolRunner({
  toolUseBehavior: { stopAtToolNames: ["MyTool"] },
  tools: [
    {
      name: "MyTool",
      description: "A test tool",
      execute: async () => "Tool Success"
    }
  ]
});

const result = await runner.run("Call MyTool");
console.log(result.finalOutput); // "Tool Success"

  async run(...args: Parameters<Runner["run"]>): Promise<RunResult> {
    // Run using the base Runner logic first
    const runResult = await super.run(...args);

    const { toolUseBehavior } = this.options || {};
    const lastStep = runResult.steps?.[runResult.steps.length - 1];

    // If the last executed tool is in stopAtToolNames, set its output as finalOutput
    if (
      lastStep?.toolName &&
      toolUseBehavior?.stopAtToolNames?.includes(lastStep.toolName)
    ) {
      runResult.finalOutput = lastStep.output ?? "";
      (runResult as any).stoppedAtTool = lastStep.toolName;
    }

    return runResult;
  }
}
