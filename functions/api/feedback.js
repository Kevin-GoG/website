export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { name, email, category, message } = body;

    if (!message || !message.trim()) {
      return Response.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

    await context.env.DB.prepare(
      `INSERT INTO feedback (name, email, category, message) VALUES (?, ?, ?, ?)`
    )
      .bind(name || null, email || null, category || null, message.trim())
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
