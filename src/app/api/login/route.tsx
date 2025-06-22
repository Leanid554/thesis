import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
        }

        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        const accessToken = jwt.sign(
            {
                id: user.id,
                firstName: user.name,
                lastName: user.surname,
                email: user.email,
            },
            process.env.JWT_SECRET!,
            { expiresIn: '15m' }
        );

        return NextResponse.json({ accessToken }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
