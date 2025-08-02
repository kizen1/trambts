# 📡 Trạm BTS - Hệ thống quản lý trạm BTS

Đây là một dự án web giúp quản lý thông tin và vận hành các trạm BTS, gồm hai phần chính:

- **📦 Backend**: API server (Node.js)
- **🌐 Frontend**: Giao diện người dùng (Vite + React)

---

## 🚀 Bắt đầu nhanh cho người mới

### ⚙️ Yêu cầu hệ thống

Trước khi bắt đầu, bạn cần cài đặt:

- [Git](https://git-scm.com/)
- [Node.js (>= 18)](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (nếu chưa có, cài bằng lệnh `npm install -g pnpm`)

---

## 📂 Cấu trúc thư mục

```
trambts/
├── backend/      ← API server
└── frontend/     ← Giao diện người dùng
```

---

## 🔧 1. Chạy Backend (API)

### Bước 1: Di chuyển vào thư mục backend

```bash
cd backend
```

### Bước 2: Cài đặt thư viện

```bash
pnpm install
```

### Bước 3: Tạo file `.env`

Tạo file `.env` trong thư mục `backend`. Ví dụ:

```env
PORT=3000
DB_URL=mongodb://localhost:27017/trambts
```

> ⚠️ Hỏi người quản lý dự án để lấy nội dung `.env` đầy đủ nếu cần.

### Bước 4: Chạy server backend

```bash
pnpm dev
```

Server sẽ chạy ở địa chỉ: [http://localhost:3000](http://localhost:3000)

---

## 🌐 2. Chạy Frontend (UI)

### Bước 1: Mở terminal mới, chuyển vào thư mục frontend

```bash
cd ../frontend
```

### Bước 2: Cài đặt thư viện

```bash
pnpm install
```

### Bước 3: Tạo file `.env`

Tạo file `.env` trong thư mục `frontend`. Ví dụ:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Bước 4: Chạy ứng dụng

```bash
pnpm dev
```

Truy cập giao diện: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Một số lệnh hữu ích

| Lệnh           | Mục đích                       |
| -------------- | ------------------------------ |
| `pnpm dev`     | Chạy ở chế độ phát triển       |
| `pnpm build`   | Đóng gói dự án cho production  |
| `pnpm preview` | Xem thử dự án đã build         |
| `pnpm lint`    | Kiểm tra định dạng và lỗi code |

---

## 🧠 Hướng dẫn nâng cao

### 🌿 Git Workflow cơ bản khi làm việc nhóm

1. **Luôn tạo nhánh mới từ `main`**

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feat/tinh-nang-moi
   ```

2. **Commit thay đổi**

   ```bash
   git add .
   git commit -m "feat: thêm form đăng ký người dùng"
   ```

3. **Đẩy nhánh lên GitHub**

   ```bash
   git push origin feat/tinh-nang-moi
   ```

4. **Tạo Pull Request**
   - Truy cập [GitHub repo](https://github.com/kizen1/trambts)
   - Nhấn "Compare & pull request"
   - Ghi mô tả rõ ràng, yêu cầu review

---

### 📝 Quy tắc đặt tên branch

| Loại công việc | Tiền tố     | Ví dụ                  |
| -------------- | ----------- | ---------------------- |
| Tính năng mới  | `feat/`     | `feat/dang-nhap`       |
| Sửa lỗi        | `fix/`      | `fix/sai-email-format` |
| Refactor code  | `refactor/` | `refactor/table-ui`    |
| Tài liệu       | `docs/`     | `docs/huong-dan-setup` |

---

### ✍️ Quy tắc viết commit message

Cú pháp:

```
<loại>: <mô tả ngắn gọn>
```

**Một số loại phổ biến:**

- `feat`: Thêm mới tính năng
- `fix`: Sửa lỗi
- `docs`: Thay đổi tài liệu
- `style`: Chỉnh sửa giao diện/format (không ảnh hưởng logic)
- `refactor`: Cải tổ lại code
- `chore`: Việc phụ như cập nhật config

**Ví dụ:**

```bash
git commit -m "fix: không hiển thị danh sách trạm"
```

---

### 🔄 Cập nhật nhánh `main`

Khi đang làm trên nhánh lâu ngày:

```bash
git checkout main
git pull origin main
git checkout ten-nhanh-cua-ban
git merge main
```

Hoặc dùng `rebase` để giữ lịch sử gọn:

```bash
git rebase main
```

---

### 💡 Mẹo khi làm việc nhóm

- Luôn chạy `pnpm lint` trước khi commit.
- Kiểm tra kỹ thay đổi trước khi gửi Pull Request.
- Ghi rõ ràng mô tả trong PR để người khác dễ review.
- Không commit file `.env` hoặc thông tin nhạy cảm.

---

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Bạn có thể:

- Fork repo này
- Tạo nhánh mới (`git checkout -b feat/your-feature`)
- Commit và push
- Gửi Pull Request để được review

---
