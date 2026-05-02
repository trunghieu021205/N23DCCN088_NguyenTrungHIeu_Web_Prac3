'use client'

import { useState } from 'react'

type PostInput = {
  title: string
  content: string
  author: string
}

type Props = {
  post: {
    id: number
    title: string
    content: string
    author: string
  }
  onClose: () => void
  onSubmit: (data: PostInput) => void
}

export default function EditPostModal({ post, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [author, setAuthor] = useState(post.author)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit({
      title,
      content,
      author,
    })
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">
          ✏️ Chỉnh sửa bài viết
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
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
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}