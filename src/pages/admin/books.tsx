import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import { useState } from "react"
import { BookPlus } from "lucide-react"

interface BookForm {
  title: string
  author: string
  description: string
}

export default function AdminBooks() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [form, setForm] = useState<BookForm>({
    title: "",
    author: "",
    description: "",
  })

  // Redirect if not admin
  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session?.user?.isAdmin) {
    router.push("/")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
      if (response.ok) {
        setForm({ title: "", author: "", description: "" })
        // Optionally refresh the book list
      }
    } catch (error) {
      console.error("Failed to add book:", error)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <BookPlus className="w-6 h-6 text-emerald-500" />
            <h1 className="text-2xl font-medium">Add New Book</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-stone-300">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="author" className="block text-sm font-medium text-stone-300">
                Author
              </label>
              <input
                type="text"
                id="author"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-stone-300">
                Description
              </label>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
} 