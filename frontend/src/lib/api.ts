import axios from "axios";
import type {
  ApiResponse,
  ChatSession,
  CreateSessionRequest,
  Message,
  ChatRequest,
  ChatResponse,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Session APIs
export const sessionApi = {
  // Lấy tất cả sessions
  getAllSessions: async (): Promise<ApiResponse<ChatSession[]>> => {
    const response = await apiClient.get("/api/sessions");
    return response.data;
  },

  // Tạo session mới
  createSession: async (
    data: CreateSessionRequest
  ): Promise<ApiResponse<ChatSession>> => {
    const response = await apiClient.post("/api/sessions", data);
    return response.data;
  },

  // Lấy session theo ID
  getSessionById: async (
    sessionId: string
  ): Promise<ApiResponse<ChatSession>> => {
    const response = await apiClient.get(`/api/sessions/${sessionId}`);
    return response.data;
  },

  // Cập nhật session
  updateSession: async (
    sessionId: string,
    data: Partial<ChatSession>
  ): Promise<ApiResponse<ChatSession>> => {
    const response = await apiClient.put(`/api/sessions/${sessionId}`, data);
    return response.data;
  },

  // Xóa session
  deleteSession: async (sessionId: string): Promise<ApiResponse> => {
    const response = await apiClient.delete(`/api/sessions/${sessionId}`);
    return response.data;
  },

  // Lấy messages của session
  getSessionMessages: async (
    sessionId: string
  ): Promise<ApiResponse<Message[]>> => {
    const response = await apiClient.get(`/api/sessions/${sessionId}/messages`);
    return response.data;
  },
};

// Chat APIs
export const chatApi = {
  // Gửi tin nhắn chat
  sendMessage: async (
    data: ChatRequest
  ): Promise<ApiResponse<ChatResponse>> => {
    const response = await apiClient.post("/api/chat", data);
    return response.data;
  },

  // Test Dify connection
  testConnection: async (): Promise<ApiResponse> => {
    const response = await apiClient.post("/api/chat/test", {
      message: "test",
    });
    return response.data;
  },
};

// Health check
export const healthApi = {
  check: async (): Promise<ApiResponse> => {
    const response = await apiClient.get("/health");
    return response.data;
  },
};
