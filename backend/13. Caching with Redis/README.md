# Redis Caching System

## Overview

This project is a backend application built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **Redis** to learn the core concepts of caching and backend scalability.

The focus is on understanding **how caching works**, **why it improves performance**, and **how to keep cached data consistent with the database**, rather than building a feature-rich application.

---

## Tech Stack

* Node.js
* Express
* TypeScript
* MongoDB + Mongoose
* Redis

---

## Features

* CRUD API for items
* Redis connection
* Cache-Aside pattern
* Cache Hit / Cache Miss handling
* Cache invalidation on data changes
* TTL (Time To Live) for automatic cache expiration
* Performance comparison between MongoDB and Redis
* Redis counter example
* Redis rate limiting example

---

## What I Learned

* How Redis works as an in-memory database
* The Cache-Aside caching pattern
* Cache hits and cache misses
* Cache invalidation strategies
* Stale cache problems
* TTL (Time To Live)
* Measuring cache performance
* Using Redis for counters
* Using Redis for rate limiting
* Backend scalability fundamentals

---

## Project Structure

```text
src/
├── config/
├── controllers/
├── models/
├── routes/
├── app.ts
└── server.ts
```

---

## API Endpoints

### Items

* `POST /items`
* `GET /items`
* `GET /items/:id`
* `PUT /items/:id`
* `DELETE /items/:id`

### Redis

* `POST /redis/set`
* `GET /redis/get`
* `DELETE /redis/delete`

---

## Caching Flow

```text
Client
   │
   ▼
Express API
   │
   ▼
Check Redis
   │
 ┌─┴─────────────┐
 │               │
Hit             Miss
 │               │
 ▼               ▼
Return       MongoDB
                  │
                  ▼
          Store in Redis
                  │
                  ▼
              Return
```

---

## Purpose

This project was built as a learning exercise to understand the backend concepts behind caching, performance optimization, and scalable system design. The emphasis is on mastering the underlying ideas used in production systems rather than implementing numerous application features.
