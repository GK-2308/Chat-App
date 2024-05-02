DESCRIPTION

This is a chat application where users can communicate with each other in real-time. Users have the ability to set their status as "available" or "busy", and only available users are displayed in the sidebar for messaging.

FEATURES

1. Real-time Messaging: Users can send and receive messages in real-time.
2. User Status: Users can set their status as "available" or "busy".
3. Dynamic Sidebar: The sidebar dynamically displays available users for messaging.

Technologies Used

Frontend:

1. React.js
2. Socket.io Client

Backend:

1. Node.js
2. Express.js
3. Socket.io
4. MongoDB 

USAGE

1. Register or log in to the application.
2. Set your status as "available" or "busy".
3. Start messaging with available users in the sidebar.


AUTHENTICATION ROUTES
1. POST /api/auth/signup
2. POST /api/auth/login
3. POST /api/auth/logout

Message Routes
1. GET /api/messages/:id
- Description: Retrieves messages between the authenticated user and another user.
- Request Parameters:id: String (required) - ID of the other user.

2. POST /api/messages/send/:id
- Description: Sends a message from the authenticated user to another user.
- Request Parameters: id: String (required) - ID of the recipient user.
- Request Body: message: String (required) - Content of the message.
- Response: 200: Successfully sent the message.,500: Internal server error



Installation

1. Clone the repository:
git clone <repository-url>

2. Navigate to the project directory:
cd Chat-App

3. Install dependencies:
npm install

4. Set up the backend:
- Configure MongoDB connection in server/config/db.js.
- Start the server
npm run server

5. Set up frontend
- Update backend API endpoints in src/api/index.js.
- Start the React development server
npm run dev

6. .env.sample

- PORT=
- PASSWORD=
- JWT_SECRET=
- NODE_ENV=





