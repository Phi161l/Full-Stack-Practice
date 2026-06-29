# File Upload Service

A backend service built with TypeScript, Express, Prisma, and Cloudinary to learn the fundamentals of file upload systems.

## Features

- Upload files
- Validate file type and size
- Store files in Cloudinary
- Save file metadata in a database
- Retrieve file information by ID
- Download files by ID
- Error handling and validation
- Storage abstraction layer

## Tech Stack

- TypeScript
- Express
- Prisma
- SQLite
- Multer
- Cloudinary

## Project Structure

```text
src/
├── config/
├── controllers/
├── middlewares/
├── routes/
├── services/
├── lib/
├── app.ts
└── server.ts
```

## API Endpoints

### Upload File

```http
POST /upload
```

### Get File Metadata

```http
GET /files/:id
```

### Download File

```http
GET /files/:id/download
```

## Concepts Learned

- Multipart form data
- File uploads
- Middleware
- Database modeling
- File metadata
- Resource retrieval by ID
- Validation and security
- Error handling
- Cloud storage integration
- Storage abstraction

## Run Locally

```bash
npm install
npm run dev
```

## Environment Variables

```env
DATABASE_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```