import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`CREATE TABLE IF NOT EXISTS puffs (id INTEGER PRIMARY KEY, count BIGINT NOT NULL DEFAULT 0)`;
    await sql`INSERT INTO puffs (id, count) VALUES (1, 0) ON CONFLICT (id) DO NOTHING`;
    const rows = await sql`SELECT count FROM puffs WHERE id = 1`;
    return Response.json({ count: Number(rows[0]?.count ?? 0) });
  } catch {
    return Response.json({ count: 0 });
  }
}

export async function POST() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`CREATE TABLE IF NOT EXISTS puffs (id INTEGER PRIMARY KEY, count BIGINT NOT NULL DEFAULT 0)`;
    await sql`INSERT INTO puffs (id, count) VALUES (1, 0) ON CONFLICT (id) DO NOTHING`;
    const rows = await sql`UPDATE puffs SET count = count + 1 WHERE id = 1 RETURNING count`;
    return Response.json({ count: Number(rows[0]?.count ?? 0) });
  } catch {
    return Response.json({ count: 0 }, { status: 500 });
  }
}
