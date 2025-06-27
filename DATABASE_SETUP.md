# การตั้งค่าฐานข้อมูลสำหรับระบบจัดการส่งออกผลไม้

## 📋 ขั้นตอนการตั้งค่าฐานข้อมูล Supabase

### 1. สร้างโปรเจค Supabase

1. เข้าไปที่ [Supabase Dashboard](https://supabase.com/dashboard)
2. คลิก **"New Project"**
3. เลือก Organization และกรอกข้อมูล:
   - **Name**: `fruit-export-db`
   - **Database Password**: สร้างรหัสผ่านที่แข็งแกร่ง
   - **Region**: เลือกภูมิภาคที่ใกล้ที่สุด (เช่น Southeast Asia)
4. คลิก **"Create new project"**

### 2. รันสคริปต์สร้างตาราง

1. ไปที่ **SQL Editor** ในแดชบอร์ด Supabase
2. คัดลอกและรันสคริปต์จากไฟล์ `database-schema.sql`
3. รอให้การสร้างตารางเสร็จสิ้น

### 3. เพิ่มข้อมูลตัวอย่าง

1. ในหน้า **SQL Editor** เดียวกัน
2. คัดลอกและรันสคริปต์จากไฟล์ `sample-data.sql`
3. ตรวจสอบว่าข้อมูลถูกเพิ่มเรียบร้อยแล้ว

### 4. ตั้งค่า Row Level Security (RLS)

รันคำสั่ง SQL ต่อไปนี้เพื่อเปิดใช้งาน RLS:

```sql
-- เปิดใช้งาน RLS สำหรับทุกตาราง
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE fruit_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE fruits ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE export_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE quality_records ENABLE ROW LEVEL SECURITY;

-- สร้าง Policy สำหรับผู้ใช้ที่ล็อกอินแล้ว
CREATE POLICY "Enable all operations for authenticated users" ON customers
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON fruit_categories
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON fruits
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON orders
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON order_items
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON shipments
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON export_documents
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON quality_records
FOR ALL USING (auth.role() = 'authenticated');
```

### 5. ตั้งค่าการยืนยันตัวตน

1. ไปที่ **Authentication** > **Settings**
2. เปิดใช้งาน **Email** provider
3. ปิดการใช้งาน **Email confirmation** สำหรับการทดสอบ (ไม่แนะนำสำหรับ production)
4. ตั้งค่า **Site URL** เป็น `http://localhost:3000`

### 6. สร้างผู้ใช้ทดสอบ

#### วิธีที่ 1: ผ่าน Dashboard
1. ไปที่ **Authentication** > **Users**
2. คลิก **"Add user"**
3. กรอกข้อมูล:
   - **Email**: `admin@fruitexport.com`
   - **Password**: `admin123`
4. คลิก **"Create user"**

#### วิธีที่ 2: ผ่าน SQL
```sql
-- สร้างผู้ใช้ทดสอบ
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@fruitexport.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
);
```

### 7. ตั้งค่าตัวแปรสภาพแวดล้อม

1. คัดลอก **Project URL** และ **anon public key** จาก **Settings** > **API**
2. อัปเดตไฟล์ `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 🗂️ โครงสร้างฐานข้อมูล

### ตารางหลัก

1. **customers** - ข้อมูลลูกค้า
2. **fruit_categories** - ประเภทผลไม้
3. **fruits** - ข้อมูลผลไม้
4. **orders** - คำสั่งซื้อ
5. **order_items** - รายการสินค้าในคำสั่งซื้อ
6. **shipments** - การจัดส่ง
7. **export_documents** - เอกสารการส่งออก
8. **quality_records** - บันทึกคุณภาพ

### ความสัมพันธ์

- `orders` → `customers` (Many-to-One)
- `order_items` → `orders` (Many-to-One)
- `order_items` → `fruits` (Many-to-One)
- `fruits` → `fruit_categories` (Many-to-One)
- `shipments` → `orders` (Many-to-One)
- `export_documents` → `shipments` (Many-to-One)
- `quality_records` → `shipments` (Many-to-One)

## 🧪 การทดสอบ

### ทดสอบการเชื่อมต่อ

1. เริ่มเซิร์ฟเวอร์: `npm run dev`
2. เข้าไปที่ `http://localhost:3000`
3. ล็อกอินด้วย:
   - **Email**: `admin@fruitexport.com`
   - **Password**: `admin123`

### ทดสอบฟีเจอร์

1. **Dashboard** - ตรวจสอบการแสดงข้อมูลสถิติ
2. **จัดการผลไม้** - ทดสอบการเพิ่ม/แก้ไข/ลบข้อมูลผลไม้
3. **จัดการคำสั่งซื้อ** - ทดสอบการสร้างและจัดการคำสั่งซื้อ
4. **จัดการลูกค้า** - ทดสอบการจัดการข้อมูลลูกค้า
5. **จัดการการจัดส่ง** - ทดสอบการติดตามการจัดส่ง

## 🔧 การแก้ไขปัญหา

### ปัญหาที่พบบ่อย

1. **ไม่สามารถเชื่อมต่อฐานข้อมูล**
   - ตรวจสอบ URL และ API Key ใน `.env.local`
   - ตรวจสอบว่าโปรเจค Supabase ทำงานปกติ

2. **ไม่สามารถล็อกอินได้**
   - ตรวจสอบว่าผู้ใช้ถูกสร้างแล้ว
   - ตรวจสอบการตั้งค่า Authentication

3. **ไม่สามารถเข้าถึงข้อมูลได้**
   - ตรวจสอบ RLS Policies
   - ตรวจสอบสิทธิ์ของผู้ใช้

### การตรวจสอบ Logs

1. ไปที่ **Logs** > **Database** ใน Supabase Dashboard
2. ตรวจสอบ error logs
3. ใช้ **SQL Editor** เพื่อทดสอบ queries

## 📚 ข้อมูลเพิ่มเติม

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
