"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function HomePage() {
  const router = useRouter();

  const handleStartChat = () => {
    router.push("/chat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Chatbot Tư Vấn Luật
            <span className="text-blue-600">Thông Minh</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Nhận tư vấn pháp lý nhanh chóng và chính xác với công nghệ AI tiên
            tiến. Giải đáp mọi thắc mắc về luật doanh nghiệp, hợp đồng, và các
            vấn đề pháp lý khác.
          </p>
          <Button
            onClick={handleStartChat}
            size="lg"
            className="px-8 py-4 text-lg"
          >
            Bắt đầu tư vấn ngay
          </Button>
        </header>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tư vấn nhanh chóng
            </h3>
            <p className="text-gray-600">
              Nhận câu trả lời tức thì cho các câu hỏi pháp lý của bạn, 24/7
              không nghỉ.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Thông tin chính xác
            </h3>
            <p className="text-gray-600">
              Dựa trên cơ sở dữ liệu pháp luật Việt Nam được cập nhật liên tục.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Bảo mật tuyệt đối
            </h3>
            <p className="text-gray-600">
              Thông tin tư vấn được bảo mật hoàn toàn, đảm bảo quyền riêng tư
              của bạn.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sẵn sàng nhận tư vấn pháp lý?
          </h2>
          <p className="text-gray-600 mb-6">
            Bắt đầu cuộc trò chuyện với AI để giải đáp mọi thắc mắc pháp lý của
            bạn.
          </p>
          <Button onClick={handleStartChat} size="lg" className="px-8 py-3">
            Trò chuyện với AI ngay
          </Button>
        </div>
      </div>
    </div>
  );
}
