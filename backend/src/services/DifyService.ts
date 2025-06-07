import axios from "axios";

export interface DifyResponse {
  answer: string;
  conversation_id: string;
  message_id: string;
  metadata?: any;
}

export class DifyService {
  private static readonly API_URL =
    process.env.DIFY_API_URL || "https://api.dify.ai/v1/chat-messages";
  private static readonly API_KEY =
    process.env.DIFY_API_KEY || "app-Ntz5aUkCw7ROTS0Hb05uIl6f";

  // Validate environment variables
  private static validateConfig(): void {
    if (!process.env.DIFY_API_KEY && !this.API_KEY) {
      console.warn(
        "⚠️  DIFY_API_KEY not found in environment variables, using default key"
      );
    }
    if (!process.env.DIFY_API_URL && !this.API_URL) {
      console.warn(
        "⚠️  DIFY_API_URL not found in environment variables, using default URL"
      );
    }
  }

  // Gửi tin nhắn tới Dify.ai và nhận phản hồi
  static async sendMessage(
    message: string,
    conversationId?: string | null
  ): Promise<DifyResponse> {
    // Validate configuration
    this.validateConfig();

    try {
      const response = await axios.post(
        this.API_URL,
        {
          inputs: {},
          query: message,
          response_mode: "blocking",
          conversation_id: conversationId || "",
          user: "user-123",
        },
        {
          headers: {
            Authorization: `Bearer ${this.API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );

      return {
        answer:
          response.data.answer || "Xin lỗi, tôi không thể trả lời câu hỏi này.",
        conversation_id: response.data.conversation_id || conversationId || "",
        message_id: response.data.message_id || "",
        metadata: response.data.metadata,
      };
    } catch (error: any) {
      console.error("Dify API Error:", error.response?.data || error.message);

      // Trả về phản hồi fallback nếu có lỗi
      return {
        answer: "Xin lỗi, hệ thống đang gặp sự cố. Vui lòng thử lại sau.",
        conversation_id: conversationId || "",
        message_id: "",
        metadata: { error: true, fallback: true },
      };
    }
  }

  // Test kết nối với Dify.ai
  static async testConnection(): Promise<boolean> {
    try {
      const testMessage = "Hello";

      const response = await this.sendMessage(testMessage);

      return !response.metadata?.error;
    } catch (error) {
      console.error("Dify connection test failed:", error);
      return false;
    }
  }
}
