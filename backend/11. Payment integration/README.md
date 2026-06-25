# Payment Learning Service

A learning-focused backend project built to understand how real-world payment systems work.

## Tech Stack

* Node.js
* TypeScript
* Express
* PostgreSQL
* Prisma
* Redis
* BullMQ

## Learning Goals

This project explores the core concepts behind payment systems:

* Orders
* Payment initialization
* Payment provider integration
* Checkout sessions
* Webhooks
* Webhook signature verification
* Idempotency
* Database transactions
* Background jobs and queues
* Retry mechanisms
* Refunds
* Audit logging
* Multiple payment providers
* Reconciliation
* Production reliability

## Payment Flow

```text
Create Order
    ↓
Initialize Payment
    ↓
Provider Checkout Page
    ↓
User Pays
    ↓
Webhook Received
    ↓
Verify Signature
    ↓
Process Payment
    ↓
Update Order
    ↓
Queue Background Jobs
```

## Main Features

### Orders

* Create orders
* Track order status

### Payments

* Initialize payments
* Store provider references
* Track payment status

### Webhooks

* Receive payment events
* Verify provider signatures
* Process successful payments

### Reliability

* Idempotent webhook handling
* Database transactions
* Retry failed jobs

### Financial Operations

* Refund processing
* Audit logs
* Payment history

### Scalability

* Background workers
* Multiple provider support
* Reconciliation jobs

## Project Structure

```text
src/
├── config/
├── controllers/
├── routes/
├── services/
├── queues/
├── workers/
├── middleware/
└── utils/
```

## Key Concepts Learned

* API integrations
* Event-driven architecture
* Payment workflows
* Distributed systems basics
* Security and signatures
* Database consistency
* Async processing
* Production backend design

## Purpose

The goal of this project is not to build a production payment gateway, but to gain a deep understanding of the concepts and architecture used in real payment systems.
