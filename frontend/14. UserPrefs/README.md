# ⚙️ UserPrefs — Personalized Settings App

**UserPrefs** is a Next.js (App Router) project that explores how real applications manage **user preferences**, **persistence**, and **personalization** — from basic layout to full i18n and data validation.

Built step-by-step to simulate real-world app evolution, focusing on clarity, scalability, and production-grade patterns.

---

## 🚀 Key Features

| Phase | Feature | Focus |
|-------|----------|-------|
| 0️⃣ | **Base Layout** | Clean routing & UI setup |
| 1️⃣ | **Theme Toggle** | Global state & Tailwind styling |
| 2️⃣ | **Preferences Storage** | JSON persistence via API routes |
| 3️⃣ | **Notifications** | UX feedback & trust |
| 4️⃣ | **Error Handling** | Custom 404 & error pages |
| 5️⃣ | **Multi-Step Form** | Guided preference workflow |
| 6️⃣ | **Personalization** | Dynamic UI from saved prefs |
| 7️⃣ | **Internationalization (i18n)** | Multi-language with `next-intl` |
| 8️⃣ | **Validation (Zod)** | Type-safe preference schema |

---

## 🧠 What You’ll Learn

- Managing **global state** and persistence  
- **Tailwind theming** and responsive design  
- Building **multi-step forms** with review flow  
- Adding **toast notifications** and error recovery  
- **Localization (i18n)** using `next-intl`  
- **Schema validation** using `zod`  
- Designing **clean, extensible architecture**

---

## 🏗️ Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **next-intl** for localization
- **Zod** for validation
- **JSON file** persistence *(no DB required)*

---

## 💾 Example prefs.json

```json
{
  "theme": "light",
  "notification": true,
  "language": "en"
}

```
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
http://localhost:3000
