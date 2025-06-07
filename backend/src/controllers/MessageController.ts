import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";

export class MessageController {
  // GET /api/messages
  static async getMessages(req: Request, res: Response) {
    try {
      const { session_id } = req.query;

      if (!session_id) {
        return res.status(400).json({
          success: false,
          error: "session_id is required",
        });
      }

      const messages = await MessageService.getMessagesBySessionId(
        session_id as string
      );
      res.json({
        success: true,
        data: messages,
      });
    } catch (error: any) {
      console.error("Error getting messages:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }

  // POST /api/messages
  static async createMessage(req: Request, res: Response) {
    try {
      const { session_id, content, role } = req.body;

      if (!session_id || !content || !role) {
        return res.status(400).json({
          success: false,
          error: "session_id, content, and role are required",
        });
      }

      const messageData = {
        session_id,
        content,
        role,
      };

      const message = await MessageService.createMessage(messageData);
      res.status(201).json({
        success: true,
        data: message,
      });
    } catch (error: any) {
      console.error("Error creating message:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }

  // DELETE /api/messages/:id
  static async deleteMessage(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await MessageService.deleteMessage(id);
      res.json({
        success: true,
        message: "Message deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting message:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }
}
