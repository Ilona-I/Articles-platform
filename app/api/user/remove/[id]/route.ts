import { dbConnect } from "@/utils/db"
import { NextResponse } from "next/server"

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