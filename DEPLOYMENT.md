# 🚀 คำแนะนำการ Deploy ระบบจัดการส่งออกผลไม้

## 🌟 Vercel Deployment (แนะนำ)

### ขั้นตอนที่ 1: เตรียม GitHub Repository

```bash
# ใน project directory
git init
git add .
git commit -m "Initial commit: Fruit Export Management System"

# สร้าง repository ใน GitHub
# แล้ว push code
git remote add origin https://github.com/YOUR_USERNAME/fruit-export.git
git branch -M main
git push -u origin main
```

### ขั้นตอนที่ 2: Deploy ผ่าน Vercel

1. **สมัครสมาชิก Vercel**
   - ไปที่ [vercel.com](https://vercel.com)
   - คลิก **"Sign up"**
   - เลือก **"Continue with GitHub"**

2. **สร้าง Project ใหม่**
   - คลิก **"New Project"**
   - เลือก repository `fruit-export`
   - คลิก **"Import"**

3. **ตั้งค่า Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Deploy**
   - คลิก **"Deploy"**
   - รอ 2-3 นาที
   - ได้ URL: `https://fruit-export-xxx.vercel.app`

### ขั้นตอนที่ 3: อัปเดต Supabase Configuration

1. **อัปเดต Site URL**
   - ไปที่ Supabase Dashboard
   - **Authentication** → **Settings**
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: `https://your-app.vercel.app/**`

2. **อัปเดต CORS Settings**
   ```sql
   -- ใน SQL Editor (ถ้าจำเป็น)
   UPDATE auth.config 
   SET site_url = 'https://your-app.vercel.app';
   ```

## 🔄 ทางเลือกอื่น

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build project
npm run build

# Deploy
netlify deploy --prod --dir=.next
```

### Railway
1. ไปที่ [railway.app](https://railway.app)
2. เชื่อมต่อ GitHub
3. เลือก repository
4. ตั้งค่า environment variables
5. Deploy อัตโนมัติ

## 📱 การทดสอบหลัง Deploy

### 1. ทดสอบการเข้าถึง
- เปิด URL ที่ได้จาก Vercel
- ตรวจสอบว่าหน้าโหลดได้ปกติ

### 2. ทดสอบการล็อกอิน
- ใช้ user ทดสอบ: `admin@fruitexport.com` / `admin123`
- ตรวจสอบการ redirect ไป dashboard

### 3. ทดสอบฟีเจอร์หลัก
- ✅ Dashboard แสดงข้อมูลสถิติ
- ✅ หน้าจัดการผลไม้ทำงานได้
- ✅ หน้าจัดการคำสั่งซื้อทำงานได้
- ✅ หน้าจัดการลูกค้าทำงานได้
- ✅ หน้าจัดการการจัดส่งทำงานได้

## 🔧 การแก้ไขปัญหาที่พบบ่อย

### ปัญหา: Build Error
```bash
# ตรวจสอบ local build
npm run build

# แก้ไข TypeScript errors
npm run type-check
```

### ปัญหา: Environment Variables
- ตรวจสอบว่าตั้งค่าใน Vercel Dashboard แล้ว
- Redeploy หลังจากเปลี่ยน env vars

### ปัญหา: Supabase Connection
- ตรวจสอบ URL และ API Key
- ตรวจสอบ CORS settings
- ตรวจสอบ RLS policies

## 🌐 Custom Domain (ถ้าต้องการ)

### ใน Vercel:
1. ไปที่ **Project Settings**
2. คลิก **"Domains"**
3. เพิ่ม custom domain
4. ตั้งค่า DNS records ตามที่แนะนำ

### DNS Records:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

## 📊 Monitoring และ Analytics

### Vercel Analytics (ฟรี)
- ไปที่ **Project Dashboard**
- เปิดใช้งาน **Analytics**
- ดูสถิติการใช้งาน

### Performance Monitoring
- ตรวจสอบ **Core Web Vitals**
- ดู **Function Logs**
- Monitor **Build Times**

## 🔄 Auto-Deployment

### การตั้งค่า:
- ทุกครั้งที่ push ไป `main` branch
- Vercel จะ build และ deploy อัตโนมัติ
- ได้ preview URL สำหรับ branch อื่น

### Git Workflow:
```bash
# Development
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Create Pull Request ใน GitHub
# Merge เข้า main → Auto deploy
```

## 💰 ข้อจำกัดของแพลนฟรี

### Vercel Free Plan:
- ✅ Unlimited personal projects
- ✅ 100GB bandwidth/month
- ✅ 100 deployments/day
- ✅ Custom domains
- ❌ Team collaboration (Pro plan)

### Supabase Free Plan:
- ✅ 500MB database
- ✅ 50,000 monthly active users
- ✅ 2GB bandwidth
- ✅ 50MB file storage

## 🎯 Next Steps

1. **Deploy ตาม guide นี้**
2. **ทดสอบทุกฟีเจอร์**
3. **แชร์ URL ให้ user ทดลองใช้**
4. **รวบรวม feedback**
5. **ปรับปรุงตาม feedback**

---

**🔗 Useful Links:**
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Production Checklist](https://supabase.com/docs/guides/platform/going-into-prod)
