'use client'

import { useState, useEffect } from 'react'

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

  const fetchPosts = async () => {
    const res = await fetch('http://localhost:5000/api/posts')
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, author }),
    })

    if (res.ok) {
      setTitle('')
      setContent('')
      setAuthor('')
      fetchPosts()
    } else {
      const err = await res.json()
      console.error(err.error)
    }
  }

  return (
    <div>
      <h1>Posts</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Tiêu đề"
        />
        <br />

        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Nội dung"
        />
        <br />

        <input
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Tác giả"
        />
        <br />

        <button type="submit">Đăng bài</button>
      </form>

      <hr />

      {posts.map(p => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.author} — {p.content}</p>
        </div>
      ))}
    </div>
  )
}