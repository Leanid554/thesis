import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  try {
    const { name, surname, email, password } = await req.json();

    if (!email || !password || !name || !surname) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, surname, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, surname, email',
      [name, surname, email, hashedPassword]
    );

    const user = result.rows[0];

    // tokens
    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    // coockie refresh
    const response = NextResponse.json({ user, accessToken }, { status: 201 });
    response.headers.set(
      'Set-Cookie',
      serialize('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    );

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
