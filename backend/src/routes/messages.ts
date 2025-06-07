import { Router } from "express";
import { MessageController } from "../controllers/MessageController";

const router = Router();

// GET /api/messages - Get messages with session_id query
router.get("/", MessageController.getMessages);

// POST /api/messages - Create new message
router.post("/", MessageController.createMessage);

// DELETE /api/messages/:id - Delete message
router.delete("/:id", MessageController.deleteMessage);

export default router;
