# Search System

A backend project built to learn the fundamentals of search systems using TypeScript, Express, Prisma, and PostgreSQL.

---

## Tech Stack

- TypeScript
- Node.js
- Express
- Prisma
- PostgreSQL

---

## Features

- Search products by keyword
- Filter by category
- Filter by price range
- Sort results
- Pagination
- Input validation
- Database indexing

---

## Project Structure

```
src/
├── controllers/
├── services/
├── routes/
├── lib/
├── app.ts
└── server.ts
```

---

## Installation

Clone the repository

```

Install dependencies

```bash
npm install
```

Create an `.env`

```env
DATABASE_URL=your_database_url
```

Run migrations

```bash
npx prisma migrate dev
```

Seed the database

```bash
npx prisma db seed
```

Start the server

```bash
npm run dev
```

---

## API

### Search Products

```
GET /products/search
```

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| q | Search keyword |
| category | Product category |
| minPrice | Minimum price |
| maxPrice | Maximum price |
| sort | name, price, createdAt |
| order | asc, desc |
| page | Page number |
| limit | Number of items per page |

---

## Example Requests

Search

```
GET /products/search?q=iphone
```

Filter

```
GET /products/search?category=Electronics
```

Sort

```
GET /products/search?sort=price&order=asc
```

Pagination

```
GET /products/search?page=2&limit=10
```

Everything

```
GET /products/search?q=iphone&category=Electronics&minPrice=500&maxPrice=1500&sort=price&order=asc&page=1&limit=10
```

---

## Example Response

```json
{
  "data": [
    {
      "id": "...",
      "name": "iPhone 16",
      "description": "Latest Apple smartphone",
      "category": "Electronics",
      "price": "999.99",
      "createdAt": "2026-07-14T12:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

## Validation

The API returns **400 Bad Request** for invalid requests such as:

- Invalid page number
- Invalid limit
- Invalid sort field
- Invalid sort order
- Invalid price range

---

## Learning Objectives

This project focuses on backend fundamentals:

- REST API design
- Express routing
- Controller-Service architecture
- Prisma ORM
- PostgreSQL querying
- Dynamic query building
- Filtering
- Sorting
- Pagination
- Database indexes
- Query performance
- Request validation

---

## License

This project is for learning purposes.