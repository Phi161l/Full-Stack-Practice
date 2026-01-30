# 🧭 CoreDash

**CoreDash** is a learning-focused, role-based admin dashboard built with **Next.js App Router**. I built this project to deepen my understanding of full-stack concepts, including authentication, authorization, server actions, secure data mutations, pagination, filtering, activity logging, and modular component architecture. CoreDash simulates a real-world SaaS admin dashboard while using a **JSON-based temporary data store** to focus on learning architecture and logic rather than database setup.

**Features:**  
- 🔐 **Authentication & Sessions:** Login via API routes, HttpOnly cookies, session expiration, and logout support.  
- 🛂 **Authorization & RBAC:** Admin vs User roles, middleware-protected routes, and admin-only pages.  
- 🧩 **Server Actions & Safe CRUD:** Update user roles, delete users with confirmation modals, and automatic UI revalidation.  
- 📊 **Pagination & Filtering:** Query-based pagination and role-based filtering for user lists.  
- 🧾 **Activity Logging:** Track sensitive actions such as role changes or deletions; logs are stored in JSON and visible only to admins.  
- 🗂 **UI & Components:** Modular layout with Header, Sidebar, and reusable UI components like ConfirmModal, LogoutButton, and UserActions, styled using Tailwind CSS.

**Roles:**  
- **Admin:** Can view all users, change roles, delete users, and view activity logs.  
- **User:** Can access the dashboard home only; cannot access user management or logs.  

**Getting Started:**  
Install dependencies with `npm install` and start the development server with `npm run dev`. Open [http://localhost:3000](http://localhost:3000) in your browser. Test accounts include `admin@coredash.com` (Admin) and `user@coredash.com` (User). Login uses email only for simplicity.

**Notes:**  
- JSON files are used as a temporary data store; the architecture is designed to be database-ready and can be upgraded to PostgreSQL, MongoDB, Prisma, or any backend system.  
- Server components fetch and render data, while client components handle interactivity.  
- Middleware enforces route protection, role checks, and secure access for sensitive actions.  

**Future Enhancements:**  
- Integrate a real database (PostgreSQL, MongoDB, etc.)  
- Input validation with Zod  
- Fine-grained permissions and audit log filtering  
- Soft deletes and improved session management  
- Search, sorting, and full UI design system  

**Learning Goals:**  
This project helped me understand authentication vs authorization, role-based access control, secure backend patterns, server actions, pagination, query handling, activity logging, and clean modular project architecture. It demonstrates how to design and implement a secure, maintainable, and scalable dashboard while learning modern Next.js patterns.

**License:** For learning and practice purposes only.
