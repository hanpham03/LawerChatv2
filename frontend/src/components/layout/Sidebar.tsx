import { useState, useEffect } from "react";
import { Plus, MessageSquare, Trash2, Settings } from "lucide-react";
import Button from "@/components/ui/Button";
import { sessionApi } from "@/lib/api";
import type { ChatSession } from "@/types";
import { clsx } from "clsx";

interface SidebarProps {
  currentSessionId?: string;
  onSessionSelect: (sessionId: string) => void;
  onNewSession: () => void;
  className?: string;
}

const Sidebar = ({
  currentSessionId,
  onSessionSelect,
  onNewSession,
  className,
}: SidebarProps) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load sessions
  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setIsLoading(true);
      const response = await sessionApi.getAllSessions();
      if (response.success && response.data) {
        setSessions(
          response.data.sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          )
        );
      }
    } catch (error) {
      console.error("Error loading sessions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSession = async (
    sessionId: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();

    if (!confirm("Bạn có chắc chắn muốn xóa cuộc trò chuyện này?")) {
      return;
    }

    try {
      const response = await sessionApi.deleteSession(sessionId);
      if (response.success) {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));

        // If current session is deleted, trigger new session
        if (sessionId === currentSessionId) {
          onNewSession();
        }
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) {
      return date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInDays === 1) {
      return "Hôm qua";
    } else if (diffInDays < 7) {
      return `${diffInDays} ngày trước`;
    } else {
      return date.toLocaleDateString("vi-VN");
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-col h-full bg-white border-r border-gray-200",
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Chatbot Tư Vấn Luật
        </h2>
        <Button onClick={onNewSession} className="w-full" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Cuộc trò chuyện mới
        </Button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4">
            <div className="animate-pulse space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ) : sessions.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Chưa có cuộc trò chuyện nào</p>
          </div>
        ) : (
          <div className="p-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => onSessionSelect(session.id)}
                className={clsx(
                  "group flex items-center justify-between p-3 rounded-lg cursor-pointer",
                  "hover:bg-gray-50 transition-colors",
                  currentSessionId === session.id
                    ? "bg-blue-50 border border-blue-200"
                    : "border border-transparent"
                )}
              >
                <div className="flex-1 min-w-0">
                  <h3
                    className={clsx(
                      "text-sm font-medium truncate",
                      currentSessionId === session.id
                        ? "text-blue-900"
                        : "text-gray-900"
                    )}
                  >
                    {session.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(session.updated_at)}
                  </p>
                </div>

                <button
                  onClick={(e) => handleDeleteSession(session.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Settings className="w-4 h-4 mr-2" />
          Cài đặt
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
