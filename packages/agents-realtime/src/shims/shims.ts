export * from './shims-node';
async close() {
  try {
    // --- FIX: end the active trace before closing ---
    if (this.ws && this.sessionId) {
      await this.ws.send(
        JSON.stringify({
          type: "trace.end",
          sessionId: this.sessionId,
        })
      );
    }
  } catch (err) {
    console.warn("Failed to end trace before closing:", err);
  }

  // Close the WebSocket as usual
  this.ws?.close();
  this.ws = null;

  // Emit event so listeners know session is fully closed
  this.emit("trace.ended", { sessionId: this.sessionId });
  it("should send trace.end before closing session", async () => {
  const session = new RealtimeSession({ ws: mockWs, sessionId: "123" });
  await session.close();
  expect(mockWs.send).toHaveBeenCalledWith(expect.stringContaining('"type":"trace.end"'));
});

}


