-- อัปเดต Site URL สำหรับ Vercel deployment
-- แทนที่ YOUR_VERCEL_URL ด้วย URL จริงที่ได้จาก Vercel

-- อัปเดต authentication configuration
UPDATE auth.config 
SET site_url = 'https://YOUR_VERCEL_URL.vercel.app'
WHERE parameter = 'site_url';

-- ตรวจสอบการตั้งค่า
SELECT parameter, value 
FROM auth.config 
WHERE parameter IN ('site_url', 'redirect_urls');
