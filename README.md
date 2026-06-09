# CodeFusion

A real-time collaborative coding platform that enables multiple users to write, edit, and execute code together in shared coding rooms.

## Project Goal

Build a production-ready collaborative coding environment similar to VS Code Live Share, Replit Multiplayer, or CodeSandbox collaboration.

Users should be able to:

- Create coding rooms
- Join rooms using room IDs
- Collaboratively edit code in real time
- View connected participants
- Chat with team members
- Execute code in multiple languages
- Participate in video/voice calls
- Save coding sessions

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Monaco Editor
- Socket.IO Client

### Backend

- Node.js
- Express.js
- Socket.IO
- JWT Authentication
- MongoDB

### DevOps

- GitHub
- Vercel
- Render
- MongoDB Atlas

---

## Project Structure

```text
codefusion/
│
├── frontend/
│
├── backend/
│
├── docs/
│
└── README.md
```

---

## Development Roadmap

### Phase 1 - MVP

- [ ] User Authentication
- [ ] Create Room
- [ ] Join Room
- [ ] Real-Time Code Synchronization
- [ ] Connected Users List

### Phase 2

- [ ] Room Chat
- [ ] Persistent Code Storage
- [ ] Room History

### Phase 3

- [ ] Code Execution
- [ ] Multiple Languages
- [ ] Execution Output Panel

### Phase 4

- [ ] Video Calling
- [ ] Voice Chat
- [ ] Collaborative Whiteboard

### Phase 5

- [ ] AI Code Review
- [ ] AI Pair Programmer
- [ ] AI Debugging Assistant

---

## Coding Standards

- Use functional React components.
- Use hooks instead of class components.
- Follow clean folder architecture.
- Write reusable components.
- Use environment variables for secrets.
- Keep backend routes modular.

---

## AI Agent Instructions

When generating code:

1. Follow the existing project structure.
2. Prefer modular and reusable code.
3. Use modern React patterns.
4. Use Socket.IO for real-time communication.
5. Use MongoDB with Mongoose.
6. Add comments for complex logic.
7. Avoid unnecessary dependencies.
8. Maintain production-ready code quality.

---

## Current Milestone

Initial project setup.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
npm run dev:backend
```

Start the frontend in another terminal:

```bash
npm run dev:frontend
```

Copy the example environment files before running locally:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```
