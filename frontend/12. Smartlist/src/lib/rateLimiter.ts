type RequestMap = Record<string, number[]>

let requests: RequestMap = {};

export function checkRateLimit(ip: string, limit = 5, windowMs = 10000) {
  const now = Date.now();

  // keep only recent requests
  if (!requests[ip]) requests[ip] = [];

  requests[ip] = requests[ip].filter((time) => now - time < windowMs);

  if (requests[ip].length >= limit) {
    return false; // blocked
  }

  requests[ip].push(now); 
  return true; // allowed
}


 