import { useState, useCallback } from "react";
import { chatApi, sessionApi } from "@/lib/api";
import type { ChatMessage, ChatSession } from "@/types";

export const useChat = (initialSessionId?: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // Load messages for a session
  const loadSession = useCallback(async (sessionId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Get session info
      const sessionResponse = await sessionApi.getSessionById(sessionId);
      if (sessionResponse.success && sessionResponse.data) {
        setCurrentSession(sessionResponse.data);
      }

      // Get session messages
      const messagesResponse = await sessionApi.getSessionMessages(sessionId);
      if (messagesResponse.success && messagesResponse.data) {
        const chatMessages: ChatMessage[] = messagesResponse.data.map(
          (msg) => ({
            content: msg.content,
            role: msg.role,
            timestamp: msg.created_at,
          })
        );
        setMessages(chatMessages);
      }
    } catch (err) {
      setError("Failed to load session");
      console.error("Error loading session:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Send a message
  const sendMessage = useCallback(
    async (content: string, sessionId: string) => {
      if (!content.trim()) return;

      const userMessage: ChatMessage = {
        content: content.trim(),
        role: "user",
        timestamp: new Date().toISOString(),
      };

      // Add user message immediately
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const response = await chatApi.sendMessage({
          message: content.trim(),
          sessionId,
        });

        if (response.success && response.data) {
          const aiMessage: ChatMessage = {
            content: response.data.response,
            role: "assistant",
            timestamp: new Date().toISOString(),
          };

          setMessages((prev) => [...prev, aiMessage]);
        } else {
          throw new Error(response.error || "Failed to send message");
        }
      } catch (err) {
        setError("Failed to send message");
        console.error("Error sending message:", err);

        // Add error message
        const errorMessage: ChatMessage = {
          content: "Xin lỗi, hệ thống đang gặp sự cố. Vui lòng thử lại sau.",
          role: "assistant",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Create new session
  const createNewSession = useCallback(async (title?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await sessionApi.createSession({
        title: title || "Cuộc trò chuyện mới",
      });

      if (response.success && response.data) {
        setCurrentSession(response.data);
        setMessages([]);
        return response.data.id;
      } else {
        throw new Error(response.error || "Failed to create session");
      }
    } catch (err) {
      setError("Failed to create session");
      console.error("Error creating session:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear current chat
  const clearChat = useCallback(() => {
    setMessages([]);
    setCurrentSession(null);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    currentSession,
    error,
    loadSession,
    sendMessage,
    createNewSession,
    clearChat,
  };
};
