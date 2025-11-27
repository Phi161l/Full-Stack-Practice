# Mini Next Shop
A small Next.js project to practice routing, layouts, SSR, CSR, and API routes.

## Project Structure
mini-next-shop/
├─ app/
│  ├─ layout.js               # Root layout (header/footer)
│  ├─ page.js                 # Home page (Client Component)
│  ├─ about/page.js           # About page (Server Component)
│  ├─ api/products/route.js   # API route
├─ public/                     # Static assets
├─ package.json

## Features
- File-based App Router  
- RootLayout wrapping all pages  
- Client Component fetching products from API  
- Server Component rendered on server  
- API route returning product data  

## Pages
- `/` → Home (Client Component)  
- `/about` → About (Server Component)  
- `/api/products` → API Route  

## Getting Started
```bash
git clone <repo-url>
cd mini-next-shop
npm install
npm run dev

