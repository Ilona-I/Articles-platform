import { dbConnect } from "@/utils/db"
import { NextRequest, NextResponse } from "next/server"

// Get article by ID
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const connection = await dbConnect()
    const { id } = await context.params // Await params before accessing properties

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'Valid Article ID is required' }, { status: 400 })
    }

    const getArticleByIdQuery = 'SELECT * FROM article_platform_db.articles WHERE id = ?'
    const values = [id]
    const [results]: any[] = (await connection.execute(getArticleByIdQuery, values)) as [any[], any]
    await connection.end()
    return NextResponse.json(results)
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message)

    const response = {
      error: (err as Error).message,

      returnedStatus: 200,
    }
  }
}

// Update article by ID
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const connection = await dbConnect()
    const { id } = await context.params // Await params before accessing properties

    // Get user_id from headers
    const user_id = req.headers.get('X-User-ID')
    if (!user_id) {
      return NextResponse.json({ error: 'User ID is required in headers' }, { status: 400 })
    }

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'Valid Article ID is required' }, { status: 400 })
    }

    const { title, content } = await req.json()

    // Validate input data
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    // Check if the user_id matches the user_id in the database
    const checkUserQuery = `
      SELECT user_id FROM article_platform_db.articles
      WHERE id = ?
    `
    const [userCheckResult]: any[] = (await connection.execute(checkUserQuery, [id])) as [any[], any]

    if (userCheckResult.length === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }
  
    const dbUserId = userCheckResult[0].user_id
    if (String(dbUserId) !== String(user_id)) {
      return NextResponse.json({ error: 'Unauthorized: User ID does not match' }, { status: 403 })
    }

    const updateArticleQuery = `
        UPDATE article_platform_db.articles
        SET title = ?, content = ?
        WHERE id = ?
        `
    console.log(76)
    const values = [title, content, id]
    await connection.execute(updateArticleQuery, values)
    await connection.end()
    return NextResponse.json({ message: 'Article updated successfully' }, { status: 200 })
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message)

    const response = {
      error: (err as Error).message,

      returnedStatus: 200,
    }
    console.log('RESPONSE: ', response)
    return NextResponse.json(response, { status: 200 })
  }
}

// Remove an article by ID
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const connection = await dbConnect()
    const { id } = await context.params // Await params before accessing properties
    // Get user_id from headers
    const user_id = req.headers.get('X-User-ID')
    if (!user_id) {
      return NextResponse.json({ error: 'User ID is required in headers' }, { status: 400 })
    }

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'Valid Article ID is required' }, { status: 400 })
    }
    // Check if the user_id matches the user_id in the database
    const checkUserQuery = `
     SELECT user_id FROM article_platform_db.articles
     WHERE id = ?
   `
    const [userCheckResult]: any[] = (await connection.execute(checkUserQuery, [id])) as [any[], any]

    if (userCheckResult.length === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    const dbUserId = userCheckResult[0].user_id
    if (String(dbUserId) !== String(user_id)) {
      return NextResponse.json({ error: 'Unauthorized: User ID does not match' }, { status: 403 })
    }

    const deleteArticleQuery = `DELETE FROM article_platform_db.articles WHERE id = ?`
    const values = [id]
    await connection.execute(deleteArticleQuery, values)
    await connection.end()
    return NextResponse.json({ message: 'Article deleted successfully' })
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message)

    const response = {
      error: (err as Error).message,

      returnedStatus: 200,
    }

    return NextResponse.json(response, { status: 200 })
  }
}


