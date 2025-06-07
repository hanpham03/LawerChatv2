import { Router } from "express";
import { ChatSessionController } from "../controllers/ChatSessionController";

const router = Router();

// GET /api/sessions - Get all sessions
router.get("/", ChatSessionController.getAllSessions);

// POST /api/sessions - Create new session
router.post("/", ChatSessionController.createSession);

// GET /api/sessions/:id - Get session by ID
router.get("/:id", ChatSessionController.getSessionById);

// PUT /api/sessions/:id - Update session
router.put("/:id", ChatSessionController.updateSession);

// DELETE /api/sessions/:id - Delete session
router.delete("/:id", ChatSessionController.deleteSession);

// GET /api/sessions/:id/messages - Get session messages
router.get("/:id/messages", ChatSessionController.getSessionMessages);

export default router;
