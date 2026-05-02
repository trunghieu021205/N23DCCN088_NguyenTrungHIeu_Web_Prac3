'use client'

import { useState } from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
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
  const queryClient = useQueryClient()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  //  GET
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => api.get('/api/posts').then(res => res.data),
  })

  //  CREATE
  const createMutation = useMutation({
    mutationFn: (data: Omit<Post, 'id'>) =>
      api.post('/api/posts', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast.success('Đăng bài thành công!')
    },
  })

  //  DELETE
  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      api.delete(`/api/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast.success('Đã xoá bài viết')
    },
  })

  //  UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<Post, 'id'> }) =>
      api.put(`/api/posts/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      toast.success('Cập nhật thành công!')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createMutation.mutate({ title, content, author })

    setTitle('')
    setContent('')
    setAuthor('')
  }

  const handleDelete = (id: number) => {
    if (!confirm('Bạn chắc chắn muốn xoá?')) return
    deleteMutation.mutate(id)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4">

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
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Nội dung"
            className="w-full border px-3 py-2 rounded"
          />

          <input
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="Tác giả"
            className="w-full border px-3 py-2 rounded"
          />

          <button
            type="submit"
            disabled={createMutation.isPending}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            {createMutation.isPending ? 'Đang đăng...' : 'Đăng bài'}
          </button>
        </form>

        {/* LOADING */}
        {isLoading && (
          <p className="text-center text-gray-400">Đang tải...</p>
        )}

        {/* LIST */}
        <div className="space-y-4">
          {posts.map((p: Post) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-xl shadow-sm flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-gray-500">{p.author}</p>
                <p>{p.content}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingPost(p)}
                  className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 cursor-pointer"
                >
                  Sửa
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 cursor-pointer"
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {editingPost && (
          <EditPostModal
            post={editingPost}
            onClose={() => setEditingPost(null)}
            onSubmit={(data) => {
              updateMutation.mutate({
                id: editingPost.id,
                data,
              })
              setEditingPost(null)
            }}
          />
        )}
      </div>
    </div>
  )
}