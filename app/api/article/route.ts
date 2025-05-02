import { dbConnect } from "@/utils/db"
import { NextRequest, NextResponse } from "next/server"

// Get all articles
export async function GET(req: NextRequest) {
  try {
    const connection = await dbConnect()

    const getAllArticlesQuery = 'SELECT * FROM article_platform_db.articles'
    const [results]: any[] = (await connection.execute(getAllArticlesQuery)) as [any[], any]
    await connection.end()
    return NextResponse.json(results)
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message)

    const response = {
      error: (err as Error).message,

      returnedStatus: 200,
    }

    return NextResponse.json(response, { status: 200 })
  }
}