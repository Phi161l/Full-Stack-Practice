# Rate Limiter

A small learning project that implements a **Rate Limiter** from scratch using **Express, TypeScript, and Redis**.

The goal of this project is to understand how backend systems protect APIs from abuse without relying on libraries like `express-rate-limit`.

---

## What is a Rate Limiter?

A rate limiter controls how many requests a client can make during a given period of time.

For example:

- 3 requests per minute for `/login`
- 10 requests per minute for `/search`
- 100 requests per minute for `/api`

If the limit is exceeded, the server returns:

```http
429 Too Many Requests
```

---

## Why do we need it?

Without a rate limiter, clients could:

- Spam APIs
- Perform brute-force login attacks
- Abuse password reset endpoints
- Overload servers
- Increase database load
- Waste computing resources

Rate limiting helps keep APIs secure, stable, and fair for all users.

---

## Technologies

- TypeScript
- Express
- Redis

---

## Concepts Learned

- Express Middleware
- Middleware Factory
- Closures
- Redis
- Redis Sorted Sets (ZSET)
- Fixed Window Algorithm
- Sliding Window Algorithm
- HTTP Status 429
- Response Headers
- Client Identification
- API Protection

---

## Project Structure

```
src/
│
├── config/
│     redis.ts
│
├── middleware/
│     rateLimiter.ts
│
├── utils/
│     identifier.ts
│
├── app.ts
└── server.ts

scripts/
    stress-test.ts
```

---

## How It Works

### 1. Identify the client

Anonymous users are identified by IP address.

Authenticated users are identified by User ID.

Example Redis key:

```
rate_limit:user:42:/login
```

---

### 2. Remove expired requests

Old timestamps outside the configured window are removed from Redis.

---

### 3. Count requests

The remaining timestamps represent requests made within the current window.

---

### 4. Check the limit

If the request count reaches the configured limit:

```
429 Too Many Requests
```

is returned.

Otherwise the request is allowed.

---

### 5. Store the current request

The current timestamp is added to Redis so future requests are counted correctly.

---

## Algorithms

### Fixed Window

Stores a simple request counter.

Pros:

- Simple
- Fast

Cons:

- Allows request bursts at window boundaries.

---

### Sliding Window

Stores timestamps for each request using Redis Sorted Sets.

Pros:

- More accurate
- Fairer request distribution
- Commonly used in production systems

Cons:

- Slightly more complex
- Uses more memory than a simple counter

---

## Testing

The project includes a stress-test script.

Run:

```bash
npm run stress
```

to send multiple requests automatically and verify that the rate limiter behaves as expected.

---

## What I Learned

This project helped me understand:

- How Express middleware intercepts requests.
- How Redis can be used as a distributed data store for rate limiting.
- The difference between Fixed Window and Sliding Window algorithms.
- How Redis Sorted Sets enable efficient sliding-window rate limiting.
- How production systems identify clients using IP addresses or authenticated user IDs.
- How to return meaningful HTTP responses when rate limits are exceeded.
- How to verify middleware behavior with automated testing.

---

## Future Improvements

Possible enhancements include:

- Token Bucket algorithm
- Leaky Bucket algorithm
- Redis Lua scripts for atomic operations
- Distributed rate limiting across multiple servers
- Configurable limits from a database
- Rate-limit metrics and monitoring
- Per-user and per-API quotas