let requests: number[] = [];

export function checkRateLimit(
  limit = 5,
  windowMs = 10000
) {
  const now = Date.now();

  // keep only recent requests
  requests = requests.filter(
    (time) => now - time < windowMs
  );

  if (requests.length >= limit) {
    return false; // blocked
  }

  requests.push(now);
  return true; // allowed
}
