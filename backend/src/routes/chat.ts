import { Router } from "express";
import { ChatController } from "../controllers/ChatController";

const router = Router();

// POST /api/chat - Send message and get AI response
router.post("/", ChatController.sendMessage);

// POST /api/chat/test - Test Dify connection
router.post("/test", ChatController.testDifyConnection);

export default router;
