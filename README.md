# 🌾 Plot Farm Monorepo

Hệ thống quản lý trang trại thông minh (**Plot Farm**) được xây dựng theo kiến trúc Monorepo hiện đại với **Turborepo** và **pnpm Workspaces**.

---

## 📁 Cấu trúc Dự án (Project Architecture)

```text
plot-farm/
├── apps/
│   ├── client/                  # FRONTEND: React + Vite + TypeScript
│   └── server/                  # BACKEND: Express.js + TypeScript
│
├── packages/                    # TẦNG PACKAGES DÙNG CHUNG
│   ├── database/                # Prisma DB Client & schema.prisma
│   ├── shared/                  # Zod Schemas & TypeScript Types dùng chung
│   ├── eslint-config/           # Cấu hình ESLint chuẩn monorepo
│   └── tsconfig/                # Cấu hình TypeScript base, react, node
│
├── docs/                        # TÀI LIỆU DỰ ÁN
│   ├── CODING_CONVENTION.md     # Quy chuẩn nhánh us-xx, commit, PR & Husky
│   ├── ESLINT_RULES.md          # Diễn giải các luật ESLint cho team
│   └── CI_CD_GUIDE.md           # Hướng dẫn CI/CD Pipeline & Discord Webhook
│
├── .github/workflows/           # CI/CD Workflows (GitHub Actions)
├── .husky/                      # Git Hooks tự động hóa local
└── package.json                 # Monorepo Root Package
```

---

## 📚 Tài liệu Hướng dẫn (Documentation Links)

| Tài liệu | Mô tả |
| :--- | :--- |
| **[Quy chuẩn Lập trình (Coding Conventions)](docs/CODING_CONVENTION.md)** | Quy định đặt tên nhánh `us-xx`, commit message, PR workflow & Husky |
| **[Hướng dẫn Luật ESLint (ESLint Rules Guide)](docs/ESLINT_RULES.md)** | Diễn giải quy tắc linter, TypeScript strict & React Hooks rules |
| **[Hướng dẫn CI/CD Pipeline (CI/CD Guide)](docs/CI_CD_GUIDE.md)** | Hướng dẫn vận hành GitHub Actions, Discord Webhook & Backlog |

---

## 🚀 Khởi động Dự án (Quick Start)

### 1. Cài đặt Dependencies
```bash
pnpm install
```

### 2. Chạy môi trường Development (FE + BE)
```bash
pnpm dev
```

### 3. Kiểm tra Linter & Chạy Unit Tests
```bash
pnpm lint
pnpm test
```

### 4. Build toàn bộ Monorepo
```bash
pnpm build
```
