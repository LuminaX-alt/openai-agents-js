private handleServerEvent(event: any) {
  switch (event.type) {
    case "message":
      // Existing logic for assistant/user messages
      this.emit("transcript", event.data);
      this.emit("history", event.data);
      break;

    case "tool_call":
      // --- FIX: also emit transcript/history for tool calls ---
      this.emit("transcript", {
        type: "tool_call",
        tool: event.name,
        arguments: event.arguments,
        messageId: event.messageId,
        timestamp: Date.now(),
      });

      this.emit("history", {
        role: "assistant",
        toolCall: { name: event.name, arguments: event.arguments },
        messageId: event.messageId,
      });
      break;

    default:
      // Keep other event types unchanged
      this.emit(event.type, event.data);
      break;
  }
}


