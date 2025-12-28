# Mini Dashboard (Next.js)

This project is a **dashboard-style web application** built with **Next.js App Router**.  
It demonstrates how to design and implement a small administrative dashboard using modern Next.js patterns, focusing on server-side logic, routing, and persistent data handling.

---

## Overview

The application provides a basic dashboard experience with task and user management features.  
It is intentionally minimal in UI to emphasize **architecture, data flow, and correctness** rather than styling.

---

## Features

### Dashboard
- Overview page with aggregated system data
- Task statistics (total, completed, pending)
- User count
- Recent activity section
- Quick action links

### Task Management
- Create, edit, and delete tasks
- Toggle task completion
- Persistent task state using JSON file storage

### Users
- Users list view
- User detail pages
- User deletion via server actions

### Routing & Layout
- Shared dashboard layout (sidebar + header)
- Nested routing using App Router
- Protected dashboard routes via middleware

---

## Technical Details

- Built with **Next.js App Router**
- Uses **Server Components** for reading and aggregating data
- Uses **Client Components** only for user interactions (e.g., toggling, clicks)
- Mutations handled through **Server Actions**
- File-based persistence using JSON (no database)
- Clear separation between read logic and mutation logic

---

## Purpose

This project is intended to:
- Practice dashboard-style application architecture
- Understand Server vs Client Components in real scenarios
- Learn Server Actions for CRUD operations
- Implement protected routes using middleware
- Work with persistent data without external databases

The project serves as a foundation for later enhancements such as styling, authentication providers, or database integration.

---

## Notes

- Data is stored locally in JSON files for simplicity
- No external services or databases are used
- Designed primarily for learning, experimentation, and reference
