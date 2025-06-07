import { Request, Response } from "express";
import { ChatSessionService } from "../services/ChatSessionService";
import { MessageService } from "../services/MessageService";

export class ChatSessionController {
  // GET /api/sessions
  static async getAllSessions(req: Request, res: Response) {
    try {
      const sessions = await ChatSessionService.getAllSessions();
      res.json({
        success: true,
        data: sessions,
      });
    } catch (error: any) {
      console.error("Error getting sessions:", error);
      res.status(500).json({
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
      res.status(201).json({
        success: true,
        data: session,
      });
    } catch (error: any) {
      console.error("Error creating session:", error);
      res.status(500).json({
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

      res.json({
        success: true,
        data: session,
      });
    } catch (error: any) {
      console.error("Error getting session:", error);
      res.status(500).json({
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
      res.json({
        success: true,
        data: session,
      });
    } catch (error: any) {
      console.error("Error updating session:", error);
      res.status(500).json({
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

      res.json({
        success: true,
        message: "Session deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting session:", error);
      res.status(500).json({
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
      res.json({
        success: true,
        data: messages,
      });
    } catch (error: any) {
      console.error("Error getting session messages:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }
}
