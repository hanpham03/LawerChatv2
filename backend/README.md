# LawerChatV2 Backend

## Overview
Express.js backend API for the legal consultation chatbot system. Provides REST API endpoints for chat sessions, messages, and AI integration with Dify.ai.

## Architecture

### MVC Pattern
- **Models**: TypeScript interfaces for data structures
- **Views**: JSON API responses  
- **Controllers**: Request handling and business logic
- **Services**: Data access and external API integration
- **Routes**: API endpoint definitions

### Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **AI Service**: Dify.ai
- **Security**: Helmet, CORS
- **Logging**: Morgan

## Project Structure
```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Supabase configuration
│   ├── controllers/
│   │   ├── ChatController.ts    # AI chat logic
│   │   ├── ChatSessionController.ts
│   │   └── MessageController.ts
│   ├── models/
│   │   ├── ChatSession.ts       # TypeScript interfaces
│   │   └── Message.ts
│   ├── routes/
│   │   ├── chat.ts             # AI chat endpoints
│   │   ├── sessions.ts         # Session CRUD
│   │   └── messages.ts         # Message CRUD
│   ├── services/
│   │   ├── ChatSessionService.ts
│   │   ├── MessageService.ts
│   │   └── DifyService.ts      # Dify.ai integration
│   └── index.ts                # Main server file
├── package.json
├── tsconfig.json
└── .env                        # Environment variables
```

## API Endpoints

### Health & Info
- `GET /health` - Health check
- `GET /api` - API information

### Chat Sessions
- `GET /api/sessions` - List all sessions
- `POST /api/sessions` - Create new session
- `GET /api/sessions/:id` - Get session by ID
- `PUT /api/sessions/:id` - Update session
- `DELETE /api/sessions/:id` - Delete session
- `GET /api/sessions/:id/messages` - Get session messages

### Messages
- `GET /api/messages?session_id=<id>` - Get messages by session
- `POST /api/messages` - Create message
- `DELETE /api/messages/:id` - Delete message

### AI Chat
- `POST /api/chat` - Send message to AI and get response
- `POST /api/chat/test` - Test Dify.ai connection

## Environment Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Create `.env` file:
```env
PORT=3001
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_service_role_key
DIFY_API_URL=https://api.dify.ai/v1/chat-messages
DIFY_API_KEY=your_dify_api_key
NODE_ENV=development
```

### 3. Database Setup
- Ensure Supabase project is created
- Run database schema from `../database/schema.sql`
- Test connection with health endpoint

## Development

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run test` - Run tests (if configured)

## Key Features

### Conversation Context Preservation
- Maintains Dify.ai conversation_id across messages
- Enables AI to remember conversation history
- Automatically manages conversation lifecycle

### Error Handling
- Graceful error responses with appropriate HTTP status codes
- Fallback responses when AI service is unavailable
- Comprehensive logging for debugging

### Security
- CORS configuration for frontend integration
- Helmet.js for security headers
- Input validation for all endpoints
- Environment variable protection

### Database Integration
- Supabase PostgreSQL with automatic connection testing
- Transaction support for data integrity
- Optimized queries with proper indexing

## API Usage Examples

### Create Chat Session
```bash
curl -X POST http://localhost:3001/api/sessions \
  -H "Content-Type: application/json" \
  -d '{"title": "Tư vấn hợp đồng"}'
```

### Send Chat Message
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tôi cần tư vấn về hợp đồng lao động",
    "sessionId": "session-uuid-here"
  }'
```

### Get Session Messages
```bash
curl http://localhost:3001/api/sessions/session-uuid-here/messages
```

## Error Handling

### Common Error Responses
- `400 Bad Request` - Invalid input data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server/database errors

### Error Response Format
```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Monitoring & Logging

### Health Check
Monitor application health at `/health`:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "memory": {...},
  "environment": "development"
}
```

### Logging
- Request/response logging via Morgan
- Error logging to console
- Database query logging available

## Production Deployment

### Environment Considerations
- Set `NODE_ENV=production`
- Use production Supabase instance
- Configure proper CORS origins
- Enable database RLS policies
- Use PM2 or similar for process management

### Security Checklist
- [ ] Environment variables secured
- [ ] Database RLS policies enabled
- [ ] CORS origins restricted
- [ ] API rate limiting implemented
- [ ] HTTPS enabled
- [ ] Monitoring configured

## Troubleshooting

### Common Issues

1. **"Missing Supabase environment variables"**
   - Check `.env` file exists and contains correct variables
   - Ensure `dotenv.config()` is called before database imports

2. **"Database connection failed"**
   - Verify Supabase project URL and service_role key
   - Check if database tables exist in `public` schema

3. **"Dify API errors"**
   - Verify DIFY_API_KEY is correct
   - Check Dify.ai service status
   - Test connection via `/api/chat/test`

4. **CORS errors from frontend**
   - Check frontend URL is in CORS origins
   - Verify frontend is running on expected port

### Debug Mode
Enable verbose logging:
```env
NODE_ENV=development
DEBUG=*
```

## Contributing

1. Follow TypeScript strict mode
2. Use consistent error handling patterns
3. Add proper TypeScript interfaces for new features
4. Test all endpoints before committing
5. Update documentation for API changes 