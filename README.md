# 📘 Lab 3 — Fullstack Integration (NextJS + Express)
---

## 👨‍💻 Tác giả

* Họ và tên: Nguyễn Trung Hiếu
* MSSV: N23DCCN088
* NextJS + Express

## 🎯 Mục tiêu

Xây dựng ứng dụng blog mini fullstack:

* Frontend: NextJS (App Router + TailwindCSS)
* Backend: ExpressJS (REST API)
* Kết nối 2 phía qua HTTP (fetch / axios / React Query)

Sau bài lab, bạn có thể:

* Hiểu cách frontend gọi API backend
* Xử lý CORS
* Thực hiện CRUD (Create, Read, Update, Delete)
* Sử dụng React Query để quản lý data
* Lưu dữ liệu vào file JSON (persist data)

---

## 🛠️ Công nghệ sử dụng

* Node.js (>= 18)
* ExpressJS
* NextJS (App Router)
* TailwindCSS
* Axios
* React Query (@tanstack/react-query)
* React Hot Toast

---

## 📁 Cấu trúc dự án

```
fullstack-blog/
├── backend/
│   ├── server.js
│   ├── data.json
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── layout.tsx
    │   ├── providers.tsx
    │   └── posts/page.tsx
    ├── components/
    │   └── EditPostModal.tsx
    ├── lib/
    │   └── api.ts
    └── package.json
```

---

## 🚀 Cài đặt & chạy project

### 1. Clone project

```bash
git clone <repo-url>
cd fullstack-blog
```

---

### 2. Cài đặt Backend

```bash
cd backend
npm install
node server.js
```

👉 Backend chạy tại: http://localhost:5000

---

### 3. Cài đặt Frontend

```bash
cd frontend
npm install
npm run dev
```

👉 Frontend chạy tại: http://localhost:3000

---

## 🔥 Các chức năng đã thực hiện

### 1. GET — Lấy danh sách bài viết

* API: `GET /api/posts`
* Hiển thị danh sách bài viết trên UI

---

### 2. POST — Tạo bài viết mới

* API: `POST /api/posts`
* Gửi dữ liệu từ form (title, content, author)
* Hiển thị toast khi thành công / lỗi

---

### 3. DELETE — Xoá bài viết

* API: `DELETE /api/posts/:id`
* Có confirm trước khi xoá
* UI cập nhật ngay (React Query refetch)

---

### 4. PUT — Cập nhật bài viết

* API: `PUT /api/posts/:id`
* Sử dụng modal chỉnh sửa
* Sau khi cập nhật → reload data bằng React Query

---

## 🔄 React Query Integration

* useQuery: fetch danh sách bài viết
* useMutation:

  * create post
  * update post
  * delete post
* invalidateQueries: tự động refetch sau khi mutation

👉 Ưu điểm:

* Tự cache data
* Code gọn hơn
* Quản lý state server tốt hơn

---

## 💾 Lưu dữ liệu bằng JSON (Nâng cao 3)

Thay vì dùng mảng trong RAM:

```js
let posts = []
```

→ chuyển sang file:

```
backend/data.json
```

### Helper functions:

```js
const fs = require('fs').promises

async function readData() { ... }
async function writeData(data) { ... }
```

👉 Dữ liệu không bị mất khi restart server

---

## ⚠️ Các lỗi thường gặp

### ❌ CORS Error

* Do thiếu middleware `cors()` trong Express

---

### ❌ 400 Bad Request

* Thiếu `Content-Type: application/json`
* Body rỗng

---

### ❌ 404 Not Found

* Sai URL hoặc method (GET vs POST)

---

### ❌ 500 Internal Error

* Lỗi code backend
* Kiểm tra terminal

---

### ❌ Only plain objects error (NextJS)

* Do đặt `QueryClient` trong Server Component
* Fix: tách `providers.tsx` (client component)

---

## 🧠 Kiến thức học được

* Cách hoạt động của REST API
* Kết nối frontend ↔ backend
* CORS là gì và cách xử lý
* State management với React Query
* Tách UI và logic (clean architecture)
* Persist data với file JSON

---

## ✅ Checklist hoàn thành

* [x] Backend chạy port 5000
* [x] Frontend gọi API thành công
* [x] Không còn lỗi CORS
* [x] Tạo bài viết thành công
* [x] Xoá bài viết thành công
* [x] Cập nhật bài viết bằng modal
* [x] Toast hiển thị đúng
* [x] Dữ liệu lưu vào file JSON

---

## 🚀 Hướng phát triển tiếp theo

* Authentication (JWT)
* Upload ảnh
* Pagination / infinite scroll
* Deploy (Vercel + Render)
* Database (MongoDB / PostgreSQL)


