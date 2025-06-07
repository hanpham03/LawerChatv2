import { clsx } from "clsx";
import type { ChatMessage as ChatMessageType } from "@/types";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={clsx(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "flex max-w-[80%] gap-3",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        {/* Avatar */}
        <div
          className={clsx(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
            isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          )}
        >
          {isUser ? "U" : "AI"}
        </div>

        {/* Message Content */}
        <div
          className={clsx(
            "rounded-lg px-4 py-2 shadow-sm",
            isUser
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-900 border border-gray-200"
          )}
        >
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
          <div
            className={clsx(
              "text-xs mt-1 opacity-70",
              isUser ? "text-blue-100" : "text-gray-500"
            )}
          >
            {new Date(message.timestamp).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
