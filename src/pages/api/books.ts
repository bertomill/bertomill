import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ error: "You must be logged in." })
  }

  // Only allow admin users to add books
  if (!session.user.isAdmin) {
    return res.status(403).json({ error: "Only admin users can manage books." })
  }

  if (req.method === "POST") {
    try {
      const { title, author, description } = req.body

      const book = await prisma.book.create({
        data: {
          title,
          author,
          description,
          userId: session.user.id,
        },
      })

      return res.status(200).json(book)
    } catch (error) {
      console.error("Failed to create book:", error)
      return res.status(500).json({ error: "Failed to create book" })
    }
  }

  if (req.method === "GET") {
    try {
      const books = await prisma.book.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          addedBy: {
            select: {
              name: true,
            },
          },
        },
      })

      return res.status(200).json(books)
    } catch (error) {
      console.error("Failed to fetch books:", error)
      return res.status(500).json({ error: "Failed to fetch books" })
    }
  }

  return res.status(405).json({ error: "Method not allowed" })
} 