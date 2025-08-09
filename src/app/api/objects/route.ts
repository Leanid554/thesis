// app/api/objects/route.ts
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ObjectType = 'room' | 'hotel' | 'other';
type Body = {
  name?: string;
  number?: string | null;
  location?: string | null;
  info?: string | null;
  type?: ObjectType;
  flavors?: string[];
  images?: string[];
};

// ===================== helpers =====================

const SELECT_FIELDS =
  'id, name, number, location, info, type, flavors, images, created_at, updated_at';

function badRequest(msg: string) {
  return NextResponse.json({ error: msg }, { status: 400 });
}
function notFound(msg = 'Object not found') {
  return NextResponse.json({ error: msg }, { status: 404 });
}
function serverError(e: unknown, where: string) {
  console.error(where, e);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

async function saveFilesAndGetUrls(fileList: File[]) {
  if (!fileList?.length) return [] as string[];
  const uploadedDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(uploadedDir, { recursive: true });

  const urls: string[] = [];
  for (const file of fileList) {
    const buf = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name).toLowerCase() || '.bin';
    const safeName = `${Date.now()}_${crypto.randomBytes(6).toString('hex')}${ext}`;
    await fs.writeFile(path.join(uploadedDir, safeName), buf);
    urls.push(`/uploads/${safeName}`);
  }
  return urls;
}

// ===================== GET =====================
// GET /api/objects                -> список (search, type, page, limit)
// GET /api/objects?id=123         -> одна запись
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const { rows } = await pool.query(
        `SELECT ${SELECT_FIELDS} FROM objects WHERE id = $1`,
        [id]
      );
      if (!rows.length) return notFound();
      return NextResponse.json(rows[0]);
    }

    const search = searchParams.get('search')?.trim();
    const type = searchParams.get('type') as ObjectType | null;
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '20', 10), 1), 100);
    const offset = (page - 1) * limit;

    const whereParts: string[] = [];
    const values: any[] = [];
    let i = 1;

    if (search) {
      whereParts.push(`(name ILIKE $${i} OR location ILIKE $${i})`);
      values.push(`%${search}%`);
      i++;
    }
    if (type) {
      whereParts.push(`type = $${i}`);
      values.push(type);
      i++;
    }
    const where = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

    const countRes = await pool.query(
      `SELECT COUNT(*)::int AS count FROM objects ${where}`,
      values
    );
    const { rows } = await pool.query(
      `SELECT ${SELECT_FIELDS}
       FROM objects ${where}
       ORDER BY created_at DESC
       LIMIT $${i} OFFSET $${i + 1}`,
      [...values, limit, offset]
    );

    return NextResponse.json({
      items: rows,
      pagination: { page, limit, total: countRes.rows[0]?.count ?? 0 },
    });
  } catch (e) {
    return serverError(e, 'GET /api/objects');
  }
}

// ===================== POST =====================
// Поддерживает JSON и multipart/form-data (files)
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();

      const name = String(form.get('name') || '').trim();
      if (!name) return badRequest('Field "name" is required');

      const number = (form.get('number') as string) || null;
      const location = (form.get('location') as string) || null;
      const info = (form.get('info') as string) || null;
      const type = ((form.get('type') as string) || 'room') as ObjectType;

      let flavors: string[] = [];
      const flavorsRaw = form.get('flavors');
      if (typeof flavorsRaw === 'string' && flavorsRaw.length) {
        try { flavors = JSON.parse(flavorsRaw); } catch {}
      }

      const files = form.getAll('files').filter(Boolean) as File[];
      const images = await saveFilesAndGetUrls(files);

      const { rows } = await pool.query(
        `INSERT INTO objects (name, number, location, info, type, flavors, images)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         RETURNING ${SELECT_FIELDS}`,
        [name, number, location, info, type, flavors, images]
      );
      return NextResponse.json(rows[0], { status: 201 });
    }

    // JSON
    const body = (await req.json()) as Body;
    if (!body?.name) return badRequest('Field "name" is required');

    const type: ObjectType = body.type ?? 'room';
    const flavors = Array.isArray(body.flavors) ? body.flavors : [];
    const images = Array.isArray(body.images) ? body.images : [];

    const { rows } = await pool.query(
      `INSERT INTO objects (name, number, location, info, type, flavors, images)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING ${SELECT_FIELDS}`,
      [
        body.name,
        body.number ?? null,
        body.location ?? null,
        body.info ?? null,
        type,
        flavors,
        images,
      ]
    );
    return NextResponse.json(rows[0], { status: 201 });
  } catch (e) {
    return serverError(e, 'POST /api/objects');
  }
}

// ===================== PUT =====================
// PUT /api/objects?id=123  (полная замена; без файлов)
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return badRequest('Query param "id" is required');

    const body = (await req.json()) as Required<Body>;
    if (!body?.name) return badRequest('Field "name" is required');

    const type: ObjectType = body.type ?? 'room';
    const flavors = Array.isArray(body.flavors) ? body.flavors : [];
    const images = Array.isArray(body.images) ? body.images : [];

    const { rows } = await pool.query(
      `UPDATE objects
       SET name=$1, number=$2, location=$3, info=$4, type=$5, flavors=$6, images=$7, updated_at=now()
       WHERE id=$8
       RETURNING ${SELECT_FIELDS}`,
      [
        body.name,
        body.number ?? null,
        body.location ?? null,
        body.info ?? null,
        type,
        flavors,
        images,
        id,
      ]
    );
    if (!rows.length) return notFound();
    return NextResponse.json(rows[0]);
  } catch (e) {
    return serverError(e, 'PUT /api/objects');
  }
}

// ===================== PATCH =====================
// PATCH /api/objects?id=123
export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return badRequest('Query param "id" is required');

    const body = (await req.json()) as Body;

    const fields: string[] = [];
    const values: any[] = [];
    let i = 1;

    if (body.name !== undefined)     { fields.push(`name = $${i++}`);     values.push(body.name); }
    if (body.number !== undefined)   { fields.push(`number = $${i++}`);   values.push(body.number); }
    if (body.location !== undefined) { fields.push(`location = $${i++}`); values.push(body.location); }
    if (body.info !== undefined)     { fields.push(`info = $${i++}`);     values.push(body.info); }
    if (body.type !== undefined)     { fields.push(`type = $${i++}`);     values.push(body.type); }
    if (body.flavors !== undefined)  {
      fields.push(`flavors = $${i++}`); values.push(Array.isArray(body.flavors) ? body.flavors : []);
    }
    if (body.images !== undefined)  {
      fields.push(`images = $${i++}`); values.push(Array.isArray(body.images) ? body.images : []);
    }

    if (!fields.length) return badRequest('No fields to update');

    const q = `
      UPDATE objects
      SET ${fields.join(', ')}, updated_at = now()
      WHERE id = $${i}
      RETURNING ${SELECT_FIELDS}
    `;
    values.push(id);

    const { rows } = await pool.query(q, values);
    if (!rows.length) return notFound();
    return NextResponse.json(rows[0]);
  } catch (e) {
    return serverError(e, 'PATCH /api/objects');
  }
}

// ===================== DELETE =====================
// DELETE /api/objects?id=123
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return badRequest('Query param "id" is required');

    const res = await pool.query('DELETE FROM objects WHERE id = $1 RETURNING id', [id]);
    if (res.rowCount === 0) return notFound();
    return NextResponse.json({ message: 'Object deleted successfully' });
  } catch (e) {
    return serverError(e, 'DELETE /api/objects');
  }
}
