import { NextResponse, NextRequest } from 'next/server'
import { dbConnect } from '@/utils/db'


// Get all users
export async function GET(request: Request) {
  try {

    const connection = await dbConnect()
    let get_exp_query = ''
    get_exp_query = 'SELECT * FROM article_platform_db.users'
    let values: any[] = []
    const [results] = await connection.execute(get_exp_query, values)
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
