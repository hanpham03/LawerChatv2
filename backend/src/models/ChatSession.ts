export interface ChatSession {
  id: string;
  title: string;
  conversation_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateChatSessionData {
  title?: string;
  conversation_id?: string;
}

export interface UpdateChatSessionData {
  title?: string;
  conversation_id?: string;
  updated_at?: string;
}
