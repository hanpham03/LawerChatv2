import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";
import { clsx } from "clsx";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const ChatInput = ({
  onSendMessage,
  isLoading = false,
  placeholder = "Nhập câu hỏi của bạn...",
  disabled = false,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            rows={1}
            className={clsx(
              "w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm",
              "placeholder-gray-400 resize-none",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              "disabled:bg-gray-50 disabled:text-gray-500",
              "transition-all duration-200"
            )}
          />
          <div className="text-xs text-gray-500 mt-1">
            Nhấn Enter để gửi, Shift + Enter để xuống dòng
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={!message.trim() || isLoading || disabled}
          isLoading={isLoading}
          className="flex-shrink-0"
        >
          <Send className="w-4 h-4" />
          <span className="sr-only">Gửi tin nhắn</span>
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
