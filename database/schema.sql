-- =====================================================
-- LawerChatV2 Database Schema
-- PostgreSQL database schema for legal consultation chatbot
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Chat Sessions Table
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL DEFAULT 'Cuộc trò chuyện mới',
    conversation_id VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_sessions_updated_at ON public.chat_sessions(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_conversation_id ON public.chat_sessions(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_session_id ON public.messages(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_role ON public.messages(role);

-- Trigger to auto-update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_chat_sessions_updated_at 
    BEFORE UPDATE ON public.chat_sessions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) - Optional
-- ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Sample data for testing
INSERT INTO public.chat_sessions (title, conversation_id) VALUES 
    ('Tư vấn hợp đồng lao động', NULL),
    ('Thành lập doanh nghiệp', NULL),
    ('Vấn đề thuế doanh nghiệp', NULL)
ON CONFLICT DO NOTHING;

-- Comments for documentation
COMMENT ON TABLE public.chat_sessions IS 'Stores chat sessions with Dify conversation context';
COMMENT ON COLUMN public.chat_sessions.conversation_id IS 'Dify.ai conversation ID for context preservation';
COMMENT ON TABLE public.messages IS 'Stores individual messages within chat sessions';
COMMENT ON COLUMN public.messages.role IS 'Message sender: user or assistant';

-- Grant permissions (adjust as needed)
-- GRANT ALL ON public.chat_sessions TO authenticated;
-- GRANT ALL ON public.messages TO authenticated; 