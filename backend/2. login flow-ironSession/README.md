# Manual Cookie Session Demo

Simple Node.js + Express demo showing manual encrypted cookie sessions without `iron-session`.

## Features

- User login with credentials from `data/users.json`
- Session encrypted manually with `crypto` and stored in cookie
- `/login` endpoint for logging in
- `/me` endpoint to check current logged-in user
- Quick HTML frontend to test login and session

## Setup

1. Install dependencies:

```bash
npm install express cors
