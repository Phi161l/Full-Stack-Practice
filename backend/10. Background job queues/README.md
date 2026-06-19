# Background Jobs & Queues Learning Project

A TypeScript backend project built to understand how background jobs and queues work in real-world applications.

## What I Learned

* Background Jobs
* Queues
* Workers
* Redis
* BullMQ
* Job States
* Retries
* Multiple Workers
* Multiple Queues
* Delayed Jobs
* Asynchronous Processing

## Architecture

```text
Client
  ↓
API Server
  ↓
BullMQ Queue
  ↓
Redis
  ↓
Worker
```

## Features

* Create background jobs
* Process jobs with workers
* Track job status
* Retry failed jobs
* Run multiple workers
* Separate workloads into multiple queues
* Schedule delayed jobs
* Simulate image processing workflow

## Tech Stack

* TypeScript
* Node.js
* Express
* Redis
* BullMQ

## Why This Project

The goal of this project is not to build a production application, but to understand the core concepts behind queue-based architectures used in systems such as email services, notification systems, image processing pipelines, report generation services, and AI workloads.

## Key Takeaway

Not every task belongs in the request-response cycle. Long-running or non-critical tasks can be moved to background workers, allowing applications to respond faster and scale more effectively.
