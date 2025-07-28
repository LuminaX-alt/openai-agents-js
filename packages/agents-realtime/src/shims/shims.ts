export * from './shims-node';
case "message": {
  // Always emit a message event
  this.emit("message", event.data);

  // --- FIX: also push to session history even if no text ---
  if (!this._history) this._history = [];
  this._history.push(event.data);

  // Also emit transcript/history for UI sync
  this.emit("transcript", event.data);
  this.emit("history", this._history);
  break;
}
