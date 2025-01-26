import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import fs from 'fs'
import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { slug } = req.query
  const postsDirectory = path.join(process.cwd(), 'src/content/blog')
  const filePath = path.join(postsDirectory, `${slug}.mdx`)

  switch (req.method) {
    case 'GET':
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8')
        res.status(200).json({ content: fileContents })
      } catch (error) {
        res.status(404).json({ message: 'Post not found' })
      }
      break

    case 'PUT':
      try {
        const { content } = req.body
        fs.writeFileSync(filePath, content)
        res.status(200).json({ message: 'Post updated successfully' })
      } catch (error) {
        res.status(500).json({ message: 'Error updating post' })
      }
      break

    case 'DELETE':
      try {
        fs.unlinkSync(filePath)
        res.status(200).json({ message: 'Post deleted successfully' })
      } catch (error) {
        res.status(500).json({ message: 'Error deleting post' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 