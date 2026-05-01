const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',   // Chỉ cho phép Next.js
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Dữ liệu tạm (in-memory)
let posts = [
  { 
    id: 1, 
    title: 'Bài viết đầu tiên', 
    content: 'Nội dung bài viết 1', 
    author: 'Admin',
    createdAt: new Date().toISOString()
  },
  { 
    id: 2, 
    title: 'Hướng dẫn NextJS + Express', 
    content: 'Nội dung bài viết 2', 
    author: 'Admin',
    createdAt: new Date().toISOString()
  }
];

// Routes
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;

  // Validation
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Thiếu dữ liệu' });
  }

  const newPost = {
    id: Date.now(),
    title,
    content,
    author,
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

app.delete('/api/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  console.log('DELETE HIT:', req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy bài viết' });
  }

  posts.splice(index, 1);

  res.json({ message: 'Đã xoá thành công' });
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('BODY:', req.body);
  next();
});

app.listen(PORT, () => {
  console.log(`✅ Backend Express chạy tại http://localhost:${PORT}`);
});

