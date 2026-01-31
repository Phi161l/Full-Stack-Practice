# 🧭 CoreDash

**CoreDash** is a learning-focused, role-based admin dashboard built with **Next.js App Router**. I built this project to deeply understand how real-world full-stack dashboards are designed, especially around authentication, authorization, secure data handling, and modular architecture.

The project simulates a SaaS-style admin dashboard while intentionally using a **JSON-based temporary data store** to focus on backend logic, security patterns, and system design rather than database setup.

---

## ✨ Features

- 🔐 **Authentication & Sessions**
  - Email-based **Signup and Login** using API routes
  - Server-side session creation with **HttpOnly cookies**
  - Session validation and logout support
  - Clear API responses for invalid login or duplicate signup attempts

- 🛂 **Authorization & Role-Based Access Control (RBAC)**
  - Admin and User roles
  - Middleware-protected routes
  - Admin-only pages and actions

- 🧩 **Server Actions & Safe Data Mutations**
  - Update user roles
  - Delete users with confirmation modals
  - Automatic UI revalidation after mutations

- 📊 **Pagination & Filtering**
  - Query-based pagination
  - Role-based filtering for user lists

- 🧾 **Activity Logging**
  - Tracks sensitive actions such as role changes and deletions
  - Logs stored in JSON files
  - Logs are visible only to admins

- 🗂 **UI & Component Architecture**
  - Modular layout with Header, Sidebar, and reusable UI components
  - Shared components like `ConfirmModal`, `LogoutButton`, and `UserActions`
  - Styled consistently using **Tailwind CSS** across the entire application

---

## 👥 Roles

- **Admin**
  - View all users
  - Change user roles
  - Delete users
  - View activity logs

- **User**
  - Access dashboard home
  - Cannot access user management or activity logs

---

## 🚀 Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev

Open **http://localhost:3000** in your browser.

### Test Accounts

- `admin@coredash.com` → **Admin**
- `user@coredash.com` → **User**

> Login and signup use **email only** for simplicity in this learning-focused project.
