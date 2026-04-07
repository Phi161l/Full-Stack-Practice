# Library Management System

A minimal Library Management System to practice database design and backend development using Node.js, Prisma, PostgreSQL, and Express.

The project includes:
- CLI interface for managing users, books, and loans
- REST API with clean architecture (Routes Controllers Services Prisma DB)
- Core library operations: borrow and return books
- Database schema designed to enforce availability and track loans

## Features

- List users and books (CLI & API)
- Borrow/Return books with availability check
- Track loans with `borrowDate`, `dueDate`, and `returnDate`
- Seeded data for testing
- Reusable service layer for DB logic

## Tech Stack

- Node.js + TypeScript
- Express.js (API)
- Prisma ORM
- PostgreSQL (database)
- Inquirer.js (CLI)

## Project Structure

```
src/
server.ts          # API entry point
prisma.ts          # Prisma client
routes/            # API routes
controllers/       # Request handling
services/          # DB & business logic
prisma/
schema.prisma
seed.ts
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Create `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/library"
```

### 3. Run Migrations & Seed Data

```bash
npx prisma migrate dev
npx tsx prisma/seed.ts
```

### 4. Run CLI

```bash
npx tsx index.ts
```

### 5. Run API

```bash
npx tsx src/server.ts
```

## API Endpoints

### Users

- `GET /users` List users
- `POST /users` Create user

### Books

- `GET /books` List books
- `POST /books` Create book

### Loans

- `GET /loans` List all loans
- `POST /loans/borrow` Borrow book
- `POST /loans/return` Return book

## Notes

- CLI and API share the same service layer, reinforcing database design logic
- All availability is derived from Loan table, no redundant state
- Designed to practice database modeling, relations, and real-world constraints
