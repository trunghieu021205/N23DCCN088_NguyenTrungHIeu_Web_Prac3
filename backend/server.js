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

app.listen(PORT, () => {
  console.log(`✅ Backend Express chạy tại http://localhost:${PORT}`);
});