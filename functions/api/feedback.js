const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // max requests per window

async function checkRateLimit(kv, ip) {
  if (!kv) return true; // KV not bound yet — allow request
  const key = `feedback:${ip}`;
  const raw = await kv.get(key);
  let timestamps = raw ? JSON.parse(raw) : [];
  const now = Date.now();
  timestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) {
    return false;
  }
  timestamps.push(now);
  await kv.put(key, JSON.stringify(timestamps), {
    expirationTtl: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000),
  });
  return true;
}

export async function onRequestPost(context) {
  try {
    const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!(await checkRateLimit(context.env.RATE_LIMIT, ip))) {
      return Response.json({ success: false, error: 'Too many requests. Please wait a moment before trying again.' }, { status: 429 });
    }

    const body = await context.request.json();
    const { name, email, category, message } = body;

    // Validate message (Required, max 5000 characters)
    if (!message || typeof message !== 'string' || !message.trim()) {
      return Response.json({ success: false, error: 'Message is required' }, { status: 400 });
    }
    const trimmedMessage = message.trim();
    if (trimmedMessage.length > 5000) {
      return Response.json({ success: false, error: 'Message cannot exceed 5000 characters' }, { status: 400 });
    }

    // Validate name (Optional, max 100 characters)
    if (name && (typeof name !== 'string' || name.trim().length > 100)) {
      return Response.json({ success: false, error: 'Name cannot exceed 100 characters' }, { status: 400 });
    }

    // Validate email (Optional, max 100 characters, simple regex check)
    if (email) {
      if (typeof email !== 'string' || email.trim().length > 100) {
        return Response.json({ success: false, error: 'Email cannot exceed 100 characters' }, { status: 400 });
      }
      const trimmedEmail = email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        return Response.json({ success: false, error: 'Invalid email format' }, { status: 400 });
      }
    }

    // Validate category (Optional, must be whitelisted)
    const allowedCategories = ['Bug Report', 'Feature Request', 'General Feedback'];
    if (category && (!allowedCategories.includes(category))) {
      return Response.json({ success: false, error: 'Invalid category' }, { status: 400 });
    }

    await context.env.DB.prepare(
      `INSERT INTO feedback (name, email, category, message) VALUES (?, ?, ?, ?)`
    )
      .bind(
        name ? name.trim() : null,
        email ? email.trim() : null,
        category || null,
        trimmedMessage
      )
      .run();

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function onRequest(context) {
  if (context.request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  return onRequestPost(context);
}
