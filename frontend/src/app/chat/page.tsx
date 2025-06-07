"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import { useChat } from "@/hooks/useChat";

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const {
    messages,
    isLoading,
    currentSession,
    error,
    loadSession,
    sendMessage,
    createNewSession,
    clearChat,
  } = useChat();

  // Handle session selection from URL or default
  useEffect(() => {
    const sessionId = searchParams.get("session");
    if (sessionId) {
      setCurrentSessionId(sessionId);
      loadSession(sessionId);
    } else {
      handleNewSession();
    }
  }, [searchParams]);

  const handleSessionSelect = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    loadSession(sessionId);
    // Update URL without page reload
    router.push(`/chat?session=${sessionId}`);
  };

  const handleNewSession = async () => {
    const newSessionId = await createNewSession();
    if (newSessionId) {
      setCurrentSessionId(newSessionId);
      router.push(`/chat?session=${newSessionId}`);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (currentSessionId) {
      await sendMessage(message, currentSessionId);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 flex-shrink-0">
        <Sidebar
          currentSessionId={currentSessionId || undefined}
          onSessionSelect={handleSessionSelect}
          onNewSession={handleNewSession}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentSession ? (
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            sessionTitle={currentSession.title}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-white">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Chọn cuộc trò chuyện
              </h3>
              <p className="text-gray-600">
                Chọn một cuộc trò chuyện từ danh sách bên trái hoặc tạo cuộc trò
                chuyện mới.
              </p>
            </div>
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md m-4">
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
