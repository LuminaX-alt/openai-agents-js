export * from './shims-node';
let transport;
if (client?.constructor?.name === "AzureOpenAI") {
  // Use Azure-specific transport for Realtime
  transport = await OpenAIRealtimeWS.azure(client);
} else {
  // Default OpenAI realtime transport
  transport = await OpenAIRealtimeWS.openai(client);
}
if (client?.constructor?.name === "AzureOpenAI" && !OpenAIRealtimeWS.azure) {
  throw new Error(
    "Azure OpenAI Realtime is not supported in this SDK. Please use OpenAIRealtimeWS.azure()."
  );
}
if (client?.constructor?.name === "AzureOpenAI" && !OpenAIRealtimeWS.azure) {
  throw new Error(
    "Azure OpenAI Realtime is not supported in this SDK. Please use OpenAIRealtimeWS.azure()."
  );
}
