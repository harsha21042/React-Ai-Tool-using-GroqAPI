# ⚡ DevPulse AI Studio

> A specialized, production-ready AI developer workspace and prompt studio built with React.js, Tailwind CSS v4, and the Groq API. 

[![Live Demo](https://img.shields.io/badge/Live-Demo-emerald?style=flat-square&logo=vercel)](https://your-vercel-deployment-link.vercel.app)
[![GitHub Repo](https://github.com/harsha21042/React-Ai-Tool-using-GroqAPI.git)]
[![Built with React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)

---

## 🚀 Overview

**DevPulse AI Studio** is an advanced evolution of a standard AI chatbot, designed specifically for software engineers, developers, and data practitioners. Instead of a generic chat interface, it features **Specialized AI Modes** that dynamically shape system behavior for writing clean code, debugging asynchronous errors, and generating optimized SQL queries.

Designed with a sleek, modern dark-mode UI inspired by professional developer tools, it provides a high-performance experience with syntax highlighting, one-click code copying, and seamless chat history management.

---

## ✨ Key Features

- **🎯 Specialized AI Modes:** Toggle between different developer workflows on the fly:
  - **General:** Standard developer assistant and technical Q&A.
  - **Code Architect:** Generates clean, production-ready components and functions following best practices.
  - **Bug Debugger:** Analyzes code and error stack traces to provide accurate root-cause corrections.
  - **SQL Generator:** Formulates optimized database queries with detailed structural explanations.
- **⚡ Interactive Landing Hero & Quick Prompts:** Built-in starter prompt cards on the empty state allow instant exploration without staring at a blank screen.
- **📋 Advanced Markdown & Code Highlighting:** Powered by `react-markdown` and `react-syntax-highlighter` (OneDark theme) featuring:
  - Language type headers (`javascript`, `python`, `sql`, etc.)
  - Interactive **"Copy"** button with dynamic **"Copied!"** visual feedback.
  - Formatted tables and custom typography for technical documentation.
- **💬 Robust Chat Management:** Persistent chat history with inline session renaming, deletion, and quick new session creation (`+ New Session`).
- **✨ Polished UX/UI:** Custom animated typing loaders with rotating developer status logs, smooth sidebar drawer transitions, and responsive mobile-first layouts.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (v19) with Vite
- **Styling:** Tailwind CSS v4
- **AI Integration:** Groq API SDK / REST endpoints
- **Markdown & Code Rendering:** `react-markdown`, `remark-gfm`, `react-syntax-highlighter`
- **Deployment:** Vercel

---

## 📂 Project Architecture

```tree
src/
├── components/
│   ├── Answers.jsx       # Markdown parser with syntax highlighter & copy button
│   ├── ChatArea.jsx      # Main scrollable chat container & empty state landing hero
│   ├── ChatInput.jsx     # Input toolbar with active mode badges and keybindings
│   ├── Header.jsx        # Top navbar with sidebar toggle & AI Mode Switcher toolbar
│   ├── Loader.jsx        # Animated neon typing loader with rotating status logs
│   ├── MessageBubble.jsx # Individual user/bot message layout with avatars
│   ├── NewChat.jsx       # New session creation trigger
│   └── Sidebar.jsx       # Chat history drawer with inline rename and delete actions
├── hooks/
│   └── useChat.js        # Custom state hook for managing chat sessions and messages
├── services/
│   └── groqApi.js        # Groq API client integration
├── App.jsx               # Root layout and global state controller
└── main.jsx              # React entry point