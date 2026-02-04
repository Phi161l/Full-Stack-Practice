# 📋 SmartList

**High-performance searchable list UI**  

SmartList is a learning-focused Next.js project demonstrating **senior-level frontend patterns** for handling large datasets. It combines **search, multi-filters, pagination, rate limiting, and feature flags** in a clean, scalable way using **Next.js App Router + TypeScript + Tailwind CSS + JSON data**.

---

## 🚀 Features

- **Debounced Search**: Smooth, URL-driven search with ~400ms debounce.  
- **Multi-Filter System**: Filter by `category` and `status`, fully synced with URL.  
- **Pagination**: Server-style pagination for large datasets with URL-driven pages.  
- **Infinite Scroll (Optional)**: Load more items dynamically as you scroll.  
- **Rate Limiting (Demo)**: Prevents excessive requests per user.  
- **Feature Flags**: Toggle major features ON/OFF safely without touching core logic.  


### 📂 Folder Structure Inside `smartlist/`
```
📦src
 ┣ 📂app
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂components
 ┃ ┣ 📜FilterBar.tsx
 ┃ ┣ 📜InfiniteScroll.tsx
 ┃ ┣ 📜Pagination.tsx
 ┃ ┗ 📜SearchBox.tsx
 ┣ 📂data
 ┃ ┗ 📜items.json
 ┣ 📂lib
 ┃ ┣ 📜dataStore.ts
 ┃ ┣ 📜features.ts
 ┃ ┣ 📜pagination.ts@
 ┃ ┗ 📜rateLimiter.ts
 ┗ 📂types
 ┃ ┗ 📜item.ts


 ---

## 💡 Key Concepts Learned

- Debounced search and filter optimization  
- URL query parameters as single source of truth  
- Scalable list rendering and pagination  
- Rate limiting and feature toggle systems  
- Clean separation of UI and data logic  

---

## 📌 Real-World Use Cases

- E-commerce product catalogs  
- Job boards and listings  
- Admin dashboards  
- Analytics and search platforms  

---

## 🏁 Quick Start

```bash
clone the repo
cd smartlist
npm install
npm run dev
Open http://localhost:3000 to view the app.

