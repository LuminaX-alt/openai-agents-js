import { setDefaultModelProvider } from '@openai/agents-core';
import { OpenAIProvider } from '@openai/agents-openai';
import { setDefaultOpenAITracingExporter } from '@openai/agents-openai';

setDefaultModelProvider(new OpenAIProvider());
setDefaultOpenAITracingExporter();

export * from '@openai/agents-core';
export * from '@openai/agents-openai';
export * as realtime from '@openai/agents-realtime';
export function createOpenRouter(config: OpenRouterConfig) {
  return function (modelName: string, options: any = {}) {
    // ─────────────────────────────────────────────────────────────────────────
    // Fix: Automatically enforce JSON output if `outputType` is provided
    if (options.outputType && (!options.extraBody || !options.extraBody.response_format)) {
      options.extraBody = {
        ...options.extraBody,
        response_format: { type: "json" }
      };
    }
    // ─────────────────────────────────────────────────────────────────────────
    return {
      provider: "openrouter",
      model: modelName,
      ...config,
      ...options,
    };
  };
}
