# 🚀 Mini Next.js Auth — Simple Cookie-Based Authentication

A minimalist authentication demo using **Next.js App Router**, **custom cookies**, and **middleware**.  
No JWT, no server-side sessions, no database lookups.  
Purely educational — not production secure.

---

## ✅ Key Features

- Login with email + password (from `users.json`)
- Generate a random token on login
- Store token in an **httpOnly cookie** (`session`)
- Middleware checks the cookie on every request
- Protect routes like `/dashboard` and `/about`
- Redirect unauthenticated users to `/login`

❌ No JWT  
❌ No session store  
❌ No token verification  

---


## 🔄 Basic Flow

### **Sign Up**
- User submits signup form → email/password saved in local JSON  
- If email already exists → return error  
- On success → redirect to `/login`

### **Login**
- User submits login form → email/password checked in local JSON  
- On success → server generates random token & sets `session` cookie

### **Middleware**
- Runs on every request → reads `session` cookie  
- If cookie exists → user is authenticated  
- If no cookie → redirect to `/login`

### **Logout**
- Clears `session` cookie  
- Redirects user to `/login`
 

> **Important:** Presence of the cookie **= authenticated**.  
> No verification, no signature, no server-side session storage.

---

## 🧠 How It Works (Summary)

- Users are verified from `data/users.json`
- `auth.js` generates a random token
- Token is saved in the browser as an httpOnly cookie
- Middleware checks cookie to allow or block access
- Protected pages are only accessible when cookie exists

---

## 📂 Project Structure

/app
    /login
    /signup
    /dashboard
    /about
    /api
    layout.js
    page.js


/middleware.js

/lib
auth.js ← random token generator

/data
users.json ← fake user database 



---

## ⚠️ Limitations (Not Production-Ready)

- Token is never stored on the server → cannot be revoked  
- Anyone with the cookie can impersonate a user  
- No expiration unless added manually  
- No hashing or encryption  
- Logout works, but simple: cookie cleared → logged out
- Simply: **cookie exists → logged in**

---

## 🎯 Why This Project Is Useful

You learn:

- How cookies work in Next.js  
- How middleware enforces route protection  
- How auth flows through redirects  
- How “presence-based” auth works before learning JWT or real sessions

---

## ▶️ Run the Project

```bash
npm install
npm run dev

Visit: http://localhost:3000/login