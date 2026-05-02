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

const fs = require('fs').promises
const PATH = './data.json'

async function readData() {
  const raw = await fs.readFile(PATH, 'utf-8')
  return JSON.parse(raw)
}

async function writeData(data) {
  await fs.writeFile(PATH, JSON.stringify(data, null, 2))
}

// Routes
app.get('/api/posts', async (req, res) => {
  const posts = await readData()
  res.json(posts)
})

app.post('/api/posts', async (req, res) => {
  const { title, content, author } = req.body

  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Thiếu dữ liệu' })
  }

  const posts = await readData()

  const newPost = {
    id: Date.now(),
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
  }

  posts.push(newPost)
  await writeData(posts)

  res.status(201).json(newPost)
})

app.delete('/api/posts/:id', async (req, res) => {
  const id = Number(req.params.id)

  const posts = await readData()
  const filtered = posts.filter(p => p.id !== id)

  if (posts.length === filtered.length) {
    return res.status(404).json({ error: 'Không tìm thấy' })
  }

  await writeData(filtered)

  res.json({ message: 'Đã xoá' })
})

app.put('/api/posts/:id', async (req, res) => {
  const id = Number(req.params.id)

  const posts = await readData()
  const index = posts.findIndex(p => p.id === id)

  if (index === -1) {
    return res.status(404).json({ error: 'Không tìm thấy' })
  }

  posts[index] = {
    ...posts[index],
    ...req.body,
  }

  await writeData(posts)

  res.json(posts[index])
})

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('BODY:', req.body);
  next();
});

app.listen(PORT, () => {
  console.log(`✅ Backend Express chạy tại http://localhost:${PORT}`);
});

