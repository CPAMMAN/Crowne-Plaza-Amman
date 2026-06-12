// ============================================================
//  CP AMMAN ISSUE TRACKER — CONFIG
//  Fill in your credentials below after creating your accounts
// ============================================================

// ── SUPABASE (free database) ─────────────────────────────────
// 1. Go to https://supabase.com → New Project
// 2. Settings → API → copy Project URL and anon public key
const SUPABASE_URL  = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_KEY  = 'YOUR_ANON_PUBLIC_KEY';

// ── IMGBB (free photo hosting) ───────────────────────────────
// 1. Go to https://imgbb.com → Sign up free
// 2. Account → API → Generate API Key
const IMGBB_API_KEY = 'YOUR_IMGBB_API_KEY';

// ── Export ───────────────────────────────────────────────────
window.CP_CONFIG = { SUPABASE_URL, SUPABASE_KEY, IMGBB_API_KEY };
