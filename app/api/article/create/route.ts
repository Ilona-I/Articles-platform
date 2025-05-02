import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/utils/db'

// Create article
export async function POST(req: NextRequest) {
  try {
    const connection = await dbConnect()
    const { title, content, authorId } = await req.json()

    // Validate input data
    if (!title || !content || !authorId) {
      return NextResponse.json({ error: 'Title, content, and author ID are required' }, { status: 400 })
    }

    const insertArticleQuery = `
      INSERT INTO article_platform_db.articles (title, content, author_id)
      VALUES (?, ?, ?)
    `
    const values = [title, content, authorId]
    await connection.execute(insertArticleQuery, values)
    await connection.end()
    return NextResponse.json({ message: 'Article created successfully' }, { status: 201 })
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message)

    const response = {
      error: (err as Error).message,

      returnedStatus: 200,
    }

    return NextResponse.json(response, { status: 200 })
  }
}