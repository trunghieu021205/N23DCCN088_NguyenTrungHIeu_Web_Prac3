'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'
import toast from 'react-hot-toast'

type Props = {
  post: any
  onClose: () => void
  onUpdated: (updatedPost: any) => void
}

export default function EditPostModal({ post, onClose, onUpdated }: Props) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [author, setAuthor] = useState(post.author)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await api.put(`/api/posts/${post.id}`, {
        title,
        content,
        author,
      })

      onUpdated(res.data)
      toast.success('Cập nhật thành công!')
      onClose()
    } catch {
      toast.error('Cập nhật thất bại!')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">✏️ Chỉnh sửa bài viết</h2>

        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            value={author}
            onChange={e => setAuthor(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Huỷ
            </button>

            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}