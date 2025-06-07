export interface Message {
  id: string;
  session_id: string;
  content: string;
  role: "user" | "assistant";
  created_at: string;
}

export interface CreateMessageData {
  session_id: string;
  content: string;
  role: "user" | "assistant";
}

export interface ChatRequest {
  message: string;
  sessionId: string;
}
