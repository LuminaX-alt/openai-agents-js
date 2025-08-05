export * from './shims-node';


function mergeAnnotations(finalMessage: any, nonStreamingContent?: any[]) {
  if (!finalMessage?.content || !Array.isArray(finalMessage.content)) return finalMessage;
  
  finalMessage.content = finalMessage.content.map((block: any, idx: number) => ({
    ...block,
    annotations: (nonStreamingContent?.[idx]?.annotations) ?? block.annotations ?? []
  }));
  
  return finalMessage;
}

// Inside the streaming finalization code (where finalMessage is built):
const nonStreamingContent = runResult?.output?.[0]?.content; 
finalMessage = mergeAnnotations(finalMessage, nonStreamingContent);

// Now return/send finalMessage as before

