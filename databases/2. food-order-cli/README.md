# 🍔 Food Ordering CLI

A minimal command-line application for learning PostgreSQL database concepts with Prisma ORM. Perfect for understanding relational databases and basic CLI interactions.

## Features
- **User Management**: Create accounts with simple name-based registration
- **Food Ordering**: Browse available foods and place single-item orders
- **Database Storage**: All data persisted in PostgreSQL with Prisma
- **Interactive CLI**: User-friendly command-line interface

## Quick Setup
```bash
# Install dependencies
npm install

# Configure database connection in .env
DATABASE_URL="postgresql://username:password@localhost:5432/fooddb"

# Initialize database and seed data
npx prisma db push
npx prisma generate
npx tsx prisma/seed.ts
```

## Running the App
```bash
npx tsx script/order.ts
```
The app will display available foods, prompt for your name, and let you place an order.

## Database Schema
- **User**: Stores customer information (id, name)
- **Food**: Menu items with pricing (id, name, price)  
- **Order**: Links users to their food orders (id, userId, foodId, createdAt)

## Database Inspection
```bash
npx prisma studio
```
Browse all tables and data in your browser.

## Next Steps
- Add quantity support and multiple items per order
- Implement OrderItem junction table
- Transform into a REST API service
