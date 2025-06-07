import { supabase } from "../config/database";
import {
  ChatSession,
  CreateChatSessionData,
  UpdateChatSessionData,
} from "../models/ChatSession";

export class ChatSessionService {
  // Lấy tất cả sessions
  static async getAllSessions(): Promise<ChatSession[]> {
    const { data, error } = await supabase
      .from("chat_sessions")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      throw new Error(`Error getting sessions: ${error.message}`);
    }

    return data || [];
  }

  // Tạo session mới
  static async createSession(
    sessionData: CreateChatSessionData
  ): Promise<ChatSession> {
    const { data, error } = await supabase
      .from("chat_sessions")
      .insert([sessionData])
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating session: ${error.message}`);
    }

    return data;
  }

  // Lấy session theo ID
  static async getSessionById(sessionId: string): Promise<ChatSession | null> {
    const { data, error } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq("id", sessionId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // Session not found
      }
      throw new Error(`Error getting session: ${error.message}`);
    }

    return data;
  }

  // Cập nhật session
  static async updateSession(
    sessionId: string,
    updateData: UpdateChatSessionData
  ): Promise<ChatSession> {
    const { data, error } = await supabase
      .from("chat_sessions")
      .update(updateData)
      .eq("id", sessionId)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating session: ${error.message}`);
    }

    return data;
  }

  // Xóa session
  static async deleteSession(sessionId: string): Promise<void> {
    const { error } = await supabase
      .from("chat_sessions")
      .delete()
      .eq("id", sessionId);

    if (error) {
      throw new Error(`Error deleting session: ${error.message}`);
    }
  }
}
