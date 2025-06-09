# LawerChatV2 - Legal Consultation Chatbot

<div align="center">
  <h3>🤖 AI-Powered Legal Consultation Platform</h3>
  <p>Hệ thống chatbot tư vấn pháp luật thông minh với khả năng nhớ ngữ cảnh cuộc trò chuyện</p>
  
  ![Status](https://img.shields.io/badge/Status-Development-yellow)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
  ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)
  ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
</div>

## 📋 Tổng quan

LawerChatV2 là một hệ thống chatbot tư vấn pháp luật tiên tiến, được xây dựng với kiến trúc microservices hiện đại. Hệ thống cung cấp khả năng tư vấn pháp luật thông minh thông qua AI, với giao diện người dùng thân thiện và khả năng lưu trữ lịch sử cuộc trò chuyện.

### ✨ Tính năng chính

- 🤖 **AI Chat Integration**: Tích hợp Dify.ai cho khả năng tư vấn pháp luật thông minh
- 💬 **Session Management**: Quản lý phiên chat với khả năng lưu trữ và truy xuất lịch sử
- 🧠 **Context Preservation**: AI nhớ ngữ cảnh cuộc trò chuyện trong cùng một phiên
- 📱 **Responsive Design**: Giao diện responsive, tối ưu cho mọi thiết bị
- ⚡ **Real-time Chat**: Chat real-time với loading states và error handling
- 🔒 **Security**: Bảo mật với CORS, Helmet, và input validation
- 📊 **Database Integration**: Lưu trữ persistent với PostgreSQL qua Supabase

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 + React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Deployment**: Vercel ready

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database ORM**: Supabase Client
- **Security**: Helmet, CORS, Morgan
- **Environment**: Dotenv
- **Deployment**: Render ready

### Database & Services
- **Database**: PostgreSQL (Supabase)
- **AI Service**: Dify.ai
- **Authentication**: Supabase Auth (ready)
- **File Storage**: Supabase Storage (ready)

## 📁 Cấu trúc dự án

```
LawerChatV2/
├── frontend/                 # Next.js Frontend Application
│   ├── src/
│   │   ├── app/             # App Router (Next.js 13+)
│   │   ├── components/      # React Components
│   │   ├── hooks/           # Custom React Hooks
│   │   ├── lib/             # Utility Libraries
│   │   └── types/           # TypeScript Type Definitions
│   ├── public/              # Static Assets
│   └── package.json
│
├── backend/                  # Express.js Backend API
│   ├── src/
│   │   ├── config/          # Database & Service Configurations
│   │   ├── controllers/     # Route Controllers (MVC)
│   │   ├── models/          # TypeScript Interfaces
│   │   ├── routes/          # API Route Definitions
│   │   ├── services/        # Business Logic Services
│   │   └── index.ts         # Entry Point
│   └── package.json
│
├── database/                 # Database Schema & Documentation
│   ├── schema.sql           # PostgreSQL Schema
│   └── README.md            # Database Documentation
│
└── README.md                # Project Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ và npm
- PostgreSQL database (Supabase account)
- Dify.ai API key

### 1. Clone Repository

```bash
git clone <repository-url>
cd LawerChatV2
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp env.example .env
# Điền thông tin vào .env file

# Build và start
npm run build
npm run dev
```

#### Backend Environment Variables (.env)

```env
# Server
PORT=3001
NODE_ENV=development

# Supabase Database
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_service_role_key

# Dify.ai Integration  
DIFY_API_URL=https://api.dify.ai/v1/chat-messages
DIFY_API_KEY=your_dify_api_key
```

### 3. Database Setup

1. Tạo Supabase project tại [supabase.com](https://supabase.com)
2. Chạy schema trong Supabase SQL Editor:
   ```sql
   -- Copy nội dung từ database/schema.sql và execute
   ```

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Setup environment variables
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Start development server
npm run dev
```

### 5. Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Health**: http://localhost:3001/health
- **API Docs**: http://localhost:3001/api

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### Chat Sessions
```bash
GET    /api/sessions           # Lấy tất cả sessions
POST   /api/sessions           # Tạo session mới
GET    /api/sessions/:id       # Lấy session theo ID
PUT    /api/sessions/:id       # Cập nhật session
DELETE /api/sessions/:id       # Xóa session
GET    /api/sessions/:id/messages # Lấy tin nhắn trong session
```

#### Messages
```bash
GET    /api/messages?session_id=<id>  # Lấy tin nhắn theo session
POST   /api/messages                  # Tạo tin nhắn mới
DELETE /api/messages/:id              # Xóa tin nhắn
```

#### AI Chat
```bash
POST   /api/chat               # Gửi tin nhắn và nhận phản hồi AI
POST   /api/chat/test          # Test kết nối Dify.ai
```

#### System
```bash
GET    /health                 # Health check
GET    /api                    # API information
```

### Example Request

```bash
# Tạo session mới
curl -X POST http://localhost:3001/api/sessions \
  -H "Content-Type: application/json" \
  -d '{"title": "Tư vấn hợp đồng lao động"}'

# Gửi tin nhắn chat
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tôi cần tư vấn về Luật Doanh nghiệp",
    "sessionId": "session-uuid-here"
  }'
```

## 🎯 Features Deep Dive

### Conversation Context Preservation
- Mỗi chat session có `conversation_id` riêng từ Dify.ai
- AI nhớ toàn bộ ngữ cảnh cuộc trò chuyện trong session
- Tự động lưu và khôi phục conversation context

### Error Handling
- Graceful fallback responses khi AI service không khả dụng
- Comprehensive error logging và monitoring
- User-friendly error messages

### Performance Optimization
- Database indexing cho queries tối ưu
- Connection pooling và caching
- Responsive loading states

## 🧪 Testing

```bash
# Backend testing
cd backend
npm test

# Frontend testing  
cd frontend
npm test

# API testing với curl/Postman
curl http://localhost:3001/health
```

## 📦 Deployment: https://lawerchatv2frontend-h8zsf5j5e.vercel.app

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

### Development Guidelines

- Sử dụng TypeScript strict mode
- Follow ESLint và Prettier configurations
- Viết tests cho features mới
- Update documentation khi cần thiết

## 📝 Changelog

### Version 1.0.0 (Current)
- ✅ Initial release
- ✅ AI chat integration với Dify.ai
- ✅ Session management system
- ✅ Responsive UI với TailwindCSS
- ✅ PostgreSQL database integration
- ✅ RESTful API với Express.js

## 📄 License

This project is licensed under the MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 🙋‍♂️ Support

Nếu gặp vấn đề hoặc có câu hỏi:

1. Kiểm tra [Issues](../../issues) để xem vấn đề đã được báo cáo chưa
2. Tạo issue mới với template phù hợp
3. Cung cấp thông tin chi tiết về môi trường và steps to reproduce

## 👥 Team

- **Developer**: LawerChatV2 Team
- **AI Integration**: Dify.ai
- **Database**: Supabase
- **Deployment**: Vercel + Render

---

<div align="center">
  <p>Made with ❤️ for legal professionals and tech enthusiasts</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div> 
