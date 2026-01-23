export function getUserByEmail(email) {
  return mockUsers.find(u => u.email === email);
}

// Somewhere else
getUserByEmail("abc"); // ❌ TypeScript error at compile time
