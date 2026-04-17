# Blog Backend API

A backend API for a blog platform with authentication, password reset, and full CRUD operations.

**Tech:** Node.js · Express · TypeScript · PostgreSQL · Prisma · JWT · Nodemailer

---

## Features

- **Auth** — Register, login, JWT access + refresh tokens, bcrypt hashing
- **Password Reset** — Token-based reset flow with email delivery
- **Posts** — Full CRUD, owner-only edit/delete
- **Comments** — Add/delete comments per post
- **Likes** — Like/unlike with duplicate prevention
- **Security** — Rate limiting, password validation, CORS, auth middleware

---

## Project Structure

```
src/
├── controllers/     # Auth, posts, comments, likes, password reset
├── middleware/       # JWT authentication
├── routes/          # Route definitions
├── utils/           # Email sender, token helpers
├── prisma.ts        # Prisma client instance
└── index.ts         # App entry point
```

---

## Setup

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Set: DATABASE_URL, JWT_SECRET, EMAIL_USER, EMAIL_PASS

# Run migrations
npx prisma migrate dev

# Start server
npx tsx src/index.ts
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ✗ | Register user |
| POST | `/api/auth/login` | ✗ | Login |
| POST | `/api/auth/refresh` | ✗ | Refresh token |
| POST | `/api/auth/forgot-password` | ✗ | Request reset email |
| POST | `/api/auth/reset-password` | ✗ | Reset password |
| GET | `/api/posts` | ✗ | List posts |
| GET | `/api/posts/:id` | ✗ | Get post |
| POST | `/api/posts` | ✓ | Create post |
| PUT | `/api/posts/:id` | ✓ | Update post (owner) |
| DELETE | `/api/posts/:id` | ✓ | Delete post (owner) |
| GET | `/api/comments/post/:postId` | ✗ | Get comments |
| POST | `/api/comments` | ✓ | Add comment |
| DELETE | `/api/comments/:id` | ✓ | Delete comment (owner) |
| POST | `/api/likes` | ✓ | Like post |
| DELETE | `/api/likes` | ✓ | Unlike post |
| GET | `/api/likes/:postId` | ✗ | Get like count |

**Auth header:** `Authorization: Bearer <access_token>`

---

Built as a learning project for backend development and system design.
