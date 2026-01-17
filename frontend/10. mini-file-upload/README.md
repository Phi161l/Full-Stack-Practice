# 📤 Mini File Upload

A simple file upload application with authentication, built with Next.js and Cloudinary.

✨ Features
- User authentication (email-based login/signup)
- Image upload with preview
- Cloud storage via Cloudinary
- View and delete uploaded images
- Protected routes and API endpoints

🛠️ Tech Stack
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Cloudinary (image storage)
- JSON file storage (users & uploads)

🚀 Quick Start

Prerequisites
- Node.js 18+
- Cloudinary account

Installation
1. Install dependencies:
npm install

2. Create .env.local file with:
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

3. Initialize data files:
Create src/data/users.json with:
[]

Create src/data/uploads.json with:
[]

4. Run development server:
npm run dev

5. Open:
http://localhost:3000

📖 Usage
- Sign Up at /signup (username + email)
- Login at /login (email only)
- Upload images at /upload (max 2MB, JPEG/PNG/WebP/GIF)
- View and delete uploaded images from the gallery
- Logout to end session

🔌 API Endpoints
All endpoints require authentication.
- POST /api/upload – Upload image (multipart/form-data)
- GET /api/list-uploads – Get all uploads
- POST /api/delete-upload – Delete image (body: {id, url})

📁 Project Structure
src/
├── app/
│   ├── (auth)/login, signup/
│   ├── (dashboard)/upload/
│   ├── actions/auth.js
│   └── api/upload, list-uploads, delete-upload/
├── data/users.json, uploads.json
└── lib/auth.js, cloudinary.js

⚙️ Configuration
- Max file size: 2MB (edit in src/app/api/upload/route.js)
- Allowed types: JPEG, PNG, WebP, GIF
- Storage: Cloudinary folder uploads/

📝 Scripts
npm run dev    # Development
npm run build  # Production build
npm start      # Start production server
npm run lint   # Lint code

🔒 Authentication
- Cookie-based sessions
- Protected routes: /upload and all /api/*
- Server actions: signUp(), login(), logOut()
