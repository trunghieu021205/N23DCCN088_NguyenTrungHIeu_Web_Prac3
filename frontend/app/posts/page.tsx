'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import EditPostModal from '@/components/EditPostModal'

type Post = {
  id: number
  title: string
  content: string
  author: string
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [loading, setLoading] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const res = await api.get('/api/posts')
      setPosts(res.data)
    } catch {
      toast.error('Không thể tải dữ liệu')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await toast.promise(
      api.post('/api/posts', { title, content, author }),
      {
        loading: 'Đang đăng...',
        success: 'Đăng bài thành công!',
        error: 'Có lỗi xảy ra!',
      }
    )

    setTitle('')
    setContent('')
    setAuthor('')
    fetchPosts()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn chắc chắn muốn xoá?')) return

    try {
      await api.delete(`/api/posts/${id}`)
      setPosts(prev => prev.filter(p => p.id !== id))
      toast.success('Đã xoá bài viết')
    } catch {
      toast.error('Xoá thất bại')
      fetchPosts()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4">
        
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-8 text-center">
          📝 Blog Mini
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-xl shadow-sm mb-8 space-y-3"
        >
          <h2 className="text-lg font-semibold">Tạo bài viết</h2>

          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Tiêu đề"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Nội dung"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="Tác giả"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Đăng bài
          </button>
        </form>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-400">Đang tải...</p>
        )}

        {/* EMPTY */}
        {!loading && posts.length === 0 && (
          <p className="text-center text-gray-400">
            Chưa có bài viết nào
          </p>
        )}

        {/* LIST POSTS */}
        <div className="space-y-4">
          {posts.map(p => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {p.title}
                </h3>

                <p className="text-sm text-gray-500 mb-2">
                  {p.author}
                </p>

                <p className="text-gray-700">
                  {p.content}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingPost(p)}
                  className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                >
                  Sửa
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL (đặt ngoài map 🔥) */}
        {editingPost && (
          <EditPostModal
            post={editingPost}
            onClose={() => setEditingPost(null)}
            onUpdated={(updatedPost) => {
              setPosts(prev =>
                prev.map(p =>
                  p.id === updatedPost.id ? updatedPost : p
                )
              )
            }}
          />
        )}

      </div>
    </div>
  )
}