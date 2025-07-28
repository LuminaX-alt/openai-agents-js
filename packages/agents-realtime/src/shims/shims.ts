export * from './shims-node';
export interface RealtimeSessionOptions {
  url: string;
  apiKey?: string;
  mode?: "voice" | "text"; // NEW
  // ...existing options
}
if (this.mode !== "voice") return; // No-op for text mode
export class RealtimeSession extends EventEmitter {
  private mode: "voice" | "text";

  constructor(options: RealtimeSessionOptions) {
    super();
    this.mode = options.mode || "voice"; // default to voice
    this.setupConnection(options);
  }
  const session = new RealtimeSession({
  url: "wss://api.openai.com/v1/realtime",
  apiKey: process.env.OPENAI_API_KEY,
  mode: "text" // NEW: no audio tracks
});

session.send({
  type: "message",
  role: "user",
  content: "Hello, text-only session!"
});
  private async setupConnection(options: RealtimeSessionOptions) {
    // --- NEW: Skip audio setup for text-only sessions ---
    if (this.mode === "voice") {
      await this.initializeAudioPipeline();
    }
    this.initializeWebSocket(options);
  }
}
