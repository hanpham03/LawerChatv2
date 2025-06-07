import { supabase } from "../config/database";
import { Message, CreateMessageData } from "../models/Message";

export class MessageService {
  // Lấy tin nhắn theo session ID
  static async getMessagesBySessionId(sessionId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error(`Error getting messages: ${error.message}`);
    }

    return data || [];
  }

  // Tạo tin nhắn mới
  static async createMessage(messageData: CreateMessageData): Promise<Message> {
    const { data, error } = await supabase
      .from("messages")
      .insert([messageData])
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating message: ${error.message}`);
    }

    return data;
  }

  // Xóa tin nhắn
  static async deleteMessage(messageId: string): Promise<void> {
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", messageId);

    if (error) {
      throw new Error(`Error deleting message: ${error.message}`);
    }
  }

  // Xóa tất cả tin nhắn trong session
  static async deleteMessagesBySessionId(sessionId: string): Promise<void> {
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("session_id", sessionId);

    if (error) {
      throw new Error(`Error deleting messages: ${error.message}`);
    }
  }
}
