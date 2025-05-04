import { NextResponse, NextRequest } from 'next/server'
import { dbConnect } from '@/utils/db'

// Get user by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const connection = await dbConnect()
    const id = params.id // Extract the ID from the URL path

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'Valid User ID is required' }, { status: 400 })
    }

    const getUserByIdQuery = 'SELECT * FROM article_platform_db.users WHERE id = ?'
    const values = [id]
    const [results]: any[] = (await connection.execute(getUserByIdQuery, values)) as [any[], any]
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

// Update user by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const connection = await dbConnect()
    const id = params.id // Extract the ID from the URL path

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'Valid User ID is required' }, { status: 400 })
    }

    const { name, email, password } = await req.json()

    const updateUserQuery = `
      UPDATE article_platform_db.users
      SET username = ?, email = ?, password_hash = ?
      WHERE id = ?
    `
    const values = [name, email, password, id]
    await connection.execute(updateUserQuery, values)
    await connection.end()
    return NextResponse.json({ message: 'User updated successfully' })
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message)

    const response = {
      error: (err as Error).message,

      returnedStatus: 200,
    }

    return NextResponse.json(response, { status: 200 })
  }
}

// Remove a user
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
      const connection = await dbConnect()
      const id = params.id // Extract the ID from the URL path

      if (!id || isNaN(Number(id))) {
          return NextResponse.json({ error: 'Valid User ID is required' }, { status: 400 })
      }

      const deleteUserQuery = `DELETE FROM article_platform_db.users WHERE id = ?`
      const values = [id]
      await connection.execute(deleteUserQuery, values)
      await connection.end()
      return NextResponse.json({ message: 'User deleted successfully' })
  } catch (err) {
      console.log('ERROR: API - ', (err as Error).message)

      const response = {
          error: (err as Error).message,

          returnedStatus: 200,
      }

      return NextResponse.json(response, { status: 200 })
  }
}