# 📍 旅游足迹记录器 - 部署指南

## 🚀 快速部署到 Vercel

### 步骤 1：将代码推送到 GitHub

1. 在 GitHub 上创建一个新仓库（例如：`travel-footprint`）
2. 在终端中运行以下命令：

```bash
# 关联远程仓库
git remote add origin https://github.com/你的用户名/travel-footprint.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 步骤 2：连接到 Vercel

1. 访问 [vercel.com](https://vercel.com) 并使用 GitHub 登录
2. 点击 **"New Project"**
3. 选择你刚才创建的仓库
4. 点击 **"Deploy"**
5. 等待部署完成（约1分钟）
6. 完成！你会得到一个类似 `https://travel-footprint.vercel.app` 的链接

### 步骤 3：在手机上查看

复制 Vercel 提供的链接，在手机浏览器中打开即可！

---

## 📱 使用说明

- **拖动地图** - 旋转查看
- **滚轮/双指** - 缩放
- **点击省份** - 进入详情
- **点击城市** - 添加足迹
- **数据保存** - 自动保存到本地存储

---

## 🔧 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:5173

---

## 📦 技术栈

- React 18 + TypeScript + Vite
- Three.js + @react-three/fiber (3D地图)
- Zustand (状态管理)
- Tailwind CSS (样式)

---

## 📄 License

MIT
