import { dbConnect } from "@/utils/db"
import { NextRequest, NextResponse } from "next/server"

// Get article by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const connection = await dbConnect()
    const id = params.id // Extract the ID from the URL path

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'Valid Article ID is required' }, { status: 400 })
    }

    const getArticleByIdQuery = 'SELECT * FROM article_platform_db.articles WHERE id = ?'
    const values = [id]
    const [results]: any[] = (await connection.execute(getArticleByIdQuery, values)) as [any[], any]
    console.log('RESULTS: ', results)
    await connection.end()
    return NextResponse.json(results[0])
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message)

    const response = {
      error: (err as Error).message,

      returnedStatus: 200,
    }
}
}