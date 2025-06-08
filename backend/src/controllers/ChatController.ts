import { Request, Response } from "express";
import { DifyService } from "../services/DifyService";
import { MessageService } from "../services/MessageService";
import { ChatSessionService } from "../services/ChatSessionService";

export class ChatController {
  // POST /api/chat
  static async sendMessage(req: Request, res: Response) {
    try {
      const { message, sessionId } = req.body;

      if (!message || !sessionId) {
        return res.status(400).json({
          error: "message and sessionId are required",
        });
      }

      // Verify session exists
      const session = await ChatSessionService.getSessionById(sessionId);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      // Save user message
      const userMessage = await MessageService.createMessage({
        session_id: sessionId,
        content: message,
        role: "user",
      });

      // Send to Dify with existing conversation_id (if any)
      const difyResponse = await DifyService.sendMessage(
        message,
        session.conversation_id
      );

      // Update session with conversation_id if we got a new one
      if (difyResponse.conversation_id && !session.conversation_id) {
        await ChatSessionService.updateSession(sessionId, {
          conversation_id: difyResponse.conversation_id,
          updated_at: new Date().toISOString(),
        });
      }

      // Save AI response
      const aiMessage = await MessageService.createMessage({
        session_id: sessionId,
        content: difyResponse.answer,
        role: "assistant",
      });

      return res.json({
        success: true,
        data: {
          userMessage,
          aiMessage,
          response: difyResponse.answer,
          sessionId: sessionId,
          conversationId: difyResponse.conversation_id,
        },
      });
    } catch (error: any) {
      console.error("Error in chat:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }

  // POST /api/chat/test
  static async testDifyConnection(req: Request, res: Response) {
    try {
      const isConnected = await DifyService.testConnection();

      return res.json({
        success: true,
        data: {
          connected: isConnected,
          message: isConnected
            ? "Dify connection successful"
            : "Dify connection failed",
        },
      });
    } catch (error: any) {
      console.error("Error testing Dify connection:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }
}
