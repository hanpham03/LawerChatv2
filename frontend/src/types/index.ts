// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Chat Session Types
export interface ChatSession {
  id: string;
  title: string;
  conversation_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSessionRequest {
  title?: string;
}

// Message Types
export interface Message {
  id: string;
  session_id: string;
  content: string;
  role: "user" | "assistant";
  created_at: string;
}

export interface CreateMessageRequest {
  session_id: string;
  content: string;
  role: "user" | "assistant";
}

// Chat Types
export interface ChatRequest {
  message: string;
  sessionId: string;
}

export interface ChatResponse {
  userMessage: Message;
  aiMessage: Message;
  response: string;
  sessionId: string;
  conversationId: string;
}

// UI Types
export interface ChatMessage {
  content: string;
  role: "user" | "assistant";
  timestamp: string;
}
