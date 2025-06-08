import { Request, Response } from "express";
import { ChatSessionService } from "../services/ChatSessionService";
import { MessageService } from "../services/MessageService";

export class ChatSessionController {
  // GET /api/sessions
  static async getAllSessions(req: Request, res: Response) {
    try {
      const sessions = await ChatSessionService.getAllSessions();
      return res.json({
        success: true,
        data: sessions,
      });
    } catch (error: any) {
      console.error("Error getting sessions:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }

  // POST /api/sessions
  static async createSession(req: Request, res: Response) {
    try {
      const { title, conversation_id } = req.body;

      const sessionData = {
        title: title || "Cuộc trò chuyện mới",
        conversation_id,
      };

      const session = await ChatSessionService.createSession(sessionData);
      return res.status(201).json({
        success: true,
        data: session,
      });
    } catch (error: any) {
      console.error("Error creating session:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }

  // GET /api/sessions/:id
  static async getSessionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const session = await ChatSessionService.getSessionById(id);

      if (!session) {
        return res.status(404).json({
          success: false,
          error: "Session not found",
        });
      }

      return res.json({
        success: true,
        data: session,
      });
    } catch (error: any) {
      console.error("Error getting session:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }

  // PUT /api/sessions/:id
  static async updateSession(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const session = await ChatSessionService.updateSession(id, updateData);
      return res.json({
        success: true,
        data: session,
      });
    } catch (error: any) {
      console.error("Error updating session:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }

  // DELETE /api/sessions/:id
  static async deleteSession(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Delete all messages in the session first
      await MessageService.deleteMessagesBySessionId(id);

      // Then delete the session
      await ChatSessionService.deleteSession(id);

      return res.json({
        success: true,
        message: "Session deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting session:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }

  // GET /api/sessions/:id/messages
  static async getSessionMessages(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const messages = await MessageService.getMessagesBySessionId(id);
      return res.json({
        success: true,
        data: messages,
      });
    } catch (error: any) {
      console.error("Error getting session messages:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }
}
