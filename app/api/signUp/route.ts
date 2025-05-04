import { NextResponse } from 'next/server'
import { dbConnect } from '@/utils/db'
import CreateUserRequest from '@/app/dto/user/CreateUserRequest';

// Create a new user
export async function POST(req: Request) {
    const connection = await dbConnect();
    const { username, email, password } = await req.json();
    const newUser: CreateUserRequest = { username: username, email: email, password: password, role: 'user', createdAt: new Date() };
    // Validate input data
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;
    const usernameRegex = /^[A-Za-z0-9_]+$/;
    
    if (!emailRegex.test(newUser.email)) {
        return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (!passwordRegex.test(newUser.password)) {
        return NextResponse.json({ error: 'Password must be at least 7 characters long and contain both letters and numbers' }, { status: 400 });
    }

    if (!usernameRegex.test(newUser.username)) {
        return NextResponse.json({ error: 'Username can only contain letters, numbers, and underscores' }, { status: 400 });
    }
    
    // Check if username and email are unique
    const checkEmailQuery = `SELECT COUNT(*) as count FROM article_platform_db.users WHERE email = ?`;
    const [emailRows]: any = await connection.execute(checkEmailQuery, [newUser.email]);
    const emailExists = emailRows[0].count > 0;

    if (emailExists) {
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }
    const checkUsernameQuery = `SELECT COUNT(*) as count FROM article_platform_db.users WHERE username = ?`;
    const [rows]: any = await connection.execute(checkUsernameQuery, [newUser.username]);
    const usernameExists = rows[0].count > 0;
   
    if (usernameExists) {
        return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }
  
    const insertUserQuery = `
        INSERT INTO article_platform_db.users (username, email, password_hash, role, created_at)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [newUser.username, newUser.email, newUser.password, newUser.role, newUser.createdAt];
    await connection.execute(insertUserQuery, values);
    return NextResponse.json(newUser, { status: 201 });
}