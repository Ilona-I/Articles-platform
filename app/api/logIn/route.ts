import { NextResponse, NextRequest } from 'next/server'
import { dbConnect } from '@/utils/db'

// Check username and password
export async function POST(req: Request) {
  try {
    const connection = await dbConnect()
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
    }

    const checkUserQuery = 'SELECT * FROM article_platform_db.users WHERE username = ? AND password_hash = ?'
    const values = [username, password]
    const [results]: any[] = (await connection.execute(checkUserQuery, values)) as [any[], any]

    if (results.length === 0) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
    }

    await connection.end()
    return NextResponse.json(results[0])
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message)

    const response = {
      error: (err as Error).message,

      returnedStatus: 200,
    }

    return NextResponse.json(response, { status: 200 })
  }
}