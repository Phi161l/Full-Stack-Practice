# 📝 Notes App – Next.js CRUD Project

A **simple Notes application** built with **Next.js (App Router)** for learning core full-stack concepts without styling distractions. Focuses on **logic, data flow, and real-world patterns**.

## 🎯 Purpose

* Learn **Next.js App Router** step by step
* Understand **Client vs Server Components**
* Practice **CRUD operations** (Create, Read, Update, Delete)
* Learn how **API routes** work in Next.js
* Connect frontend and backend logic
* Keep everything minimal and clear

## 🧠 What i Learn

* API Routes with `GET`, `POST`, `PUT`, `DELETE`
* Reading/writing server data (JSON file as DB)
* Client Components for forms and actions
* Server logic for data handling
* Dynamic routes (`/edit/[id]`)
* Basic state management
* Navigation and redirects

## ⚡i have understood React Rendering & Async 

* **Client render is synchronous** → JSX must return immediately.
* **useEffect** → fetch after render, UI stays responsive.
* **Suspense** → pause a UI branch, show fallback, resume on data.
* **SWR / React Query** → fetch outside render, cached/loading UI, auto-update.
* **Top-level async in client** → breaks render → infinite loop.
* **Server Components** → can await safely → pre-render HTML.
* **Next.js fetch** → not cached by default; use `cache: 'no-store'` for fresh data.
* **Async in UI** → must be controlled (effects, events, Suspense) to avoid blocking render.


## 📁 Folder Structure
```
notes-app/
├── src/app/
│ ├── page.js # Home page (list notes)
│ ├── add/page.js # Add note
│ ├── edit/[id]/page.js # Edit note
│ └── api/notes/ # API routes
│ ├── route.js # GET, POST
│ └── [id]/route.js # PUT, DELETE
└── src/data/notes.json # Local storage
```


## 🔌 API Routes

* `/api/notes` → GET all notes, POST new note  
* `/api/notes/[id]` → PUT update note, DELETE note  

## 🖥 Pages & Features

* **Home (`/`)** → List notes, add/edit links, delete button  
* **Add Note (`/add`)** → Form, POST request, redirect home  
* **Edit Note (`/edit/[id]`)** → Pre-filled form, PUT request, redirect home  

## ⚙️ How to Run

```bash
npm install
npm run dev

Open: http://localhost:3000