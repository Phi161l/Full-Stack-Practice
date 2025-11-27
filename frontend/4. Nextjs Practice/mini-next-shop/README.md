# Mini Next Shop

A small practice project built with **Next.js App Router** to learn routing, layouts, client/server components, and API routes.

## Features
- Next.js App Router (file-based routing)
- Root layout with shared header/footer
- Client Component home page with client-side data fetching
- Server Component about page
- API route returning product data
- Simple navigation using `<Link>`

## Project Structure
```
mini-next-shop/
├── app/
│ ├── layout.js # Root layout
│ ├── page.js # Home (Client Component)
│ ├── about/page.js # About (Server Component)
│ └── api/products/route.js # API route
├── public/ # Static assets
└── package.json
```

## How It Works
- **Home page (`page.js`)** fetches products from `/api/products` using `useEffect`.
- **About page** is fully server-rendered.
- **API route** returns a list of products in JSON.
- **Root layout** wraps all pages and provides consistent UI.

## What I Learned
- How Next.js handles client and server components  
- How to build API routes inside the App Router  
- How layouts and nested routing work together  
- The difference between SSR and CSR in practice  
- How to fetch data from an API and display it on the client  

