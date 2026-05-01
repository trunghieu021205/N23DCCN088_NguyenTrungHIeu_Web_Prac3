'use client'
import api from '@/lib/api'
import toast from 'react-hot-toast'
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

        await toast.promise(
            api.post('/api/posts', { title, content, author }),
            {
            loading: 'Đang lưu...',
            success: 'Lưu thành công!',
            error: 'Có lỗi xảy ra!',
            }
        )

        fetchPosts()
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Bạn chắc chắn muốn xoá bài viết này?')) return;

        try {
            console.log('DELETE URL:', `/api/posts/${id}`)
            
            await api.delete(`/api/posts/${id}`);

            // optimistic update
            setPosts(prev => prev.filter(p => p.id !== id));

            toast.success('Đã xoá bài viết');
        } catch (err) {
            toast.error('Xoá thất bại, thử lại!');
            fetchPosts(); // rollback
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
                    <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500 hover:text-red-700"
                    >
                    Xoá
                    </button>
            </div>
            ))}
        </div>
    )
}