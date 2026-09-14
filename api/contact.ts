/**
 * Standalone contact API for use when the site is hosted on static GitHub Pages.
 * Pages does not run server endpoints — deploy this separately (Bun, VPS, Worker, etc.).
 *
 * Env (server secrets — never PUBLIC_*):
 *   RESEND_API_KEY       — Resend API key
 *   CONTACT_TO_EMAIL     — inbox that receives messages
 *   CONTACT_FROM_EMAIL   — verified Resend from address
 *   CONTACT_CORS_ORIGIN  — comma-separated allowed origins (e.g. https://user.github.io)
 *   CONTACT_API_PORT     — listen port (default 8787)
 *
 * Run: bun run api:contact
 */

const PORT = Number(process.env.CONTACT_API_PORT || 8787);
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const TO = process.env.CONTACT_TO_EMAIL || '';
const FROM = process.env.CONTACT_FROM_EMAIL || 'Baruch <onboarding@resend.dev>';
const CORS_ORIGINS = (process.env.CONTACT_CORS_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

function corsHeaders(origin: string | null): HeadersInit {
  const allow =
    origin && (CORS_ORIGINS.length === 0 || CORS_ORIGINS.includes(origin) || CORS_ORIGINS.includes('*'))
      ? origin
      : CORS_ORIGINS[0] || '*';

  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function json(status: number, body: unknown, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin),
    },
  });
}

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  experience?: string;
  message?: string;
};

Bun.serve({
  port: PORT,
  async fetch(req) {
    const origin = req.headers.get('Origin');
    const url = new URL(req.url);

    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (url.pathname !== '/contact' && url.pathname !== '/contact/') {
      return json(404, { ok: false, error: 'Not found' }, origin);
    }

    if (req.method !== 'POST') {
      return json(405, { ok: false, error: 'Method not allowed' }, origin);
    }

    if (CORS_ORIGINS.length > 0 && origin && !CORS_ORIGINS.includes(origin) && !CORS_ORIGINS.includes('*')) {
      return json(403, { ok: false, error: 'Origin not allowed' }, origin);
    }

    let data: ContactPayload;
    try {
      data = (await req.json()) as ContactPayload;
    } catch {
      return json(400, { ok: false, error: 'Invalid JSON' }, origin);
    }

    const name = (data.name || '').trim();
    const email = (data.email || '').trim();
    const phone = (data.phone || '').trim();
    const experience = (data.experience || '').trim();
    const message = (data.message || '').trim();

    if (!name || !email || !message) {
      return json(400, { ok: false, error: 'name, email and message are required' }, origin);
    }

    if (!RESEND_API_KEY || !TO) {
      console.error('[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL');
      return json(503, { ok: false, error: 'Contact API is not configured' }, origin);
    }

    const text = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      phone ? `Teléfono: ${phone}` : null,
      experience ? `Experiencia: ${experience}` : null,
      '',
      message,
    ]
      .filter((line) => line !== null)
      .join('\n');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Contacto web — ${name}`,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('[contact] Resend error', res.status, detail);
      return json(502, { ok: false, error: 'Failed to send message' }, origin);
    }

    return json(200, { ok: true }, origin);
  },
});

console.log(`[contact] listening on http://127.0.0.1:${PORT}/contact`);
