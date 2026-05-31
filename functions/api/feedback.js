export async function onRequestPost(context) {
  try {
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
