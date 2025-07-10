

<p align="center">
  <img src="https://github.com/jztchl/random-chat-front_end/blob/main/screenshots/logo.png?raw=true" alt="App Logo" width="200"/>
</p>

<h1 align="center">Terminal Styled Random Chat App</h1>



# 🖥️ Random Chat

*Chat freely in rooms — terminal-style, real-time, anonymous*

---

## ⚡ Overview

**Random Chat** is a cyberpunk-themed, real-time web chat app where users can:

* Join or create public chat rooms
* Chat anonymously without signup
* Experience a slick terminal-style UI
* See who's active in real time
* Send and receive messages live via WebSockets

> Built with 💚 Next.js App Router + TailwindCSS + native WebSockets

---

## 🖼️ Preview
<p align="center">
  <img src="https://github.com/jztchl/random-chat-front_end/blob/main/screenshots/1.png?raw=true" width="400"/>
  <img src="https://github.com/jztchl/random-chat-front_end/blob/main/screenshots/2.png?raw=true" width="400"/>
</p>


---

## 🧠 Features

* 🔓 No signup — pick a nickname and go
* 📡 Real-time messaging via WebSockets
* 🧪 Terminal-style hacker UI
* 🏠 Room creation & discovery
* 🔐 Local username persistence
* ⚙️ Deployed + environment-configurable frontend

---

## 🔧 Tech Stack

| Layer     | Tech                                        |
| --------- | ------------------------------------------- |
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Styling   | [TailwindCSS](https://tailwindcss.com/)     |
| Real-Time | Native WebSocket API                        |
| Hosting   | [Vercel](https://vercel.com/) or similar    |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/jztchl/random-chat-frontend.git
cd random-chat-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root and add:

```env
NEXT_PUBLIC_BACKEND_URL_HTTPS=https://your-url
NEXT_PUBLIC_BACKEND_URL_WSS=wss://your-url
```

> 🔒 Backend & WebSocket URLs are injected via environment variables for flexibility.

### 4. Run locally

```bash
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) and start chatting.

---

## 🧪 Project Structure

```txt
app/
│
├─ page.tsx              # Home - Join/Create rooms
├─ chat/
│   └─ [room]/page.tsx   # Dynamic Chat Room UI
│      
│
├─ styles/
│   └─ globals.css       # Global styles
│
└─ .env.local            # Environment variables
```

---

## 📦 Deployment

This project works seamlessly on [Vercel](https://vercel.com/):

1. Link your repo on Vercel
2. Add the same `.env` variables to the dashboard
3. Deploy and go live 🌐

---

## 🙏 Credits

Backend API by [random-room-chats](https://github.com/jztchl/random-room-chats)

Built with ❤️ by jztchl

---

## 📄 License

MIT License — use it, remix it, own it.

---
