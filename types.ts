// packages/agents-core/src/types.ts

export type AssistantMessageItem = {
  role: "assistant";
  status: "in_progress" | "completed" | "failed";
  content: (
    | {
        type: "output_text";
        text: string;
        providerData?: Record<string, any>;
        logprobs?: unknown[];
        /**
         * Optional annotations (e.g., file citations, code references)
         * included in assistant text output.
         */
        annotations?: Array<{
          type: string;
          container_id?: string;
          file_id?: string;
          filename?: string;
          start_index?: number;
          end_index?: number;
        }>;
      }
    | {
        type: "output_image";
        image_url: string;
        alt_text?: string;
      }
    | {
        type: "output_tool_call";
        tool_name: string;
        arguments: Record<string, unknown>;
      }
    // … other variants remain unchanged
  )[];
  created_at?: string;
  id?: string;
};
// packages/agents-core/tests/assistantMessage.test.ts
import { AssistantMessageItem } from "../src/types";

describe("AssistantMessageItem typing", () => {
  it("allows annotations in output_text content", () => {
    const msg: AssistantMessageItem = {
      role: "assistant",
      status: "completed",
      content: [
        {
          type: "output_text",
          text: "Hello with reference",
          annotations: [
            {
              type: "container_file_citation",
              container_id: "container123",
              file_id: "file456",
              filename: "file.txt",
              start_index: 0,
              end_index: 5
            }
          ]
        }
      ]
    };

    expect(msg.content[0].annotations?.[0].type).toBe("container_file_citation");
  });
});

