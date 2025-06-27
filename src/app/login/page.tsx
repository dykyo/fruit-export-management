'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Apple } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const router = useRouter()

  // Check if Supabase is configured
  const isSupabaseConfigured = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    return url && key && url !== 'your_supabase_project_url' && key !== 'your_supabase_anon_key'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!email || !password) {
      setError('กรุณากรอกอีเมลและรหัสผ่าน')
      setLoading(false)
      return
    }

    const { error } = await signIn(email, password)

    if (error) {
      if (error.message?.includes('Supabase is not configured')) {
        setError('ระบบยังไม่ได้ตั้งค่า Supabase กรุณาตรวจสอบไฟล์ .env.local')
      } else if (error.message?.includes('Authentication service is not available')) {
        setError('ไม่สามารถเชื่อมต่อกับระบบยืนยันตัวตนได้')
      } else {
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
      }
    } else {
      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full">
              <Apple className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            ระบบจัดการส่งออกผลไม้
          </CardTitle>
          <CardDescription className="text-gray-600">
            เข้าสู่ระบบเพื่อจัดการธุรกิจส่งออกผลไม้ของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSupabaseConfigured() && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">
                ⚠️ การตั้งค่าระบบ
              </h4>
              <p className="text-sm text-yellow-700">
                กรุณาตั้งค่า Supabase ในไฟล์ .env.local ก่อนใช้งาน
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                ดูรายละเอียดใน README.md
              </p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                อีเมล
              </label>
              <Input
                id="email"
                type="email"
                placeholder="กรอกอีเมลของคุณ"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                รหัสผ่าน
              </label>
              <Input
                id="password"
                type="password"
                placeholder="กรอกรหัสผ่านของคุณ"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ยังไม่มีบัญชี?{' '}
              <a href="#" className="text-primary hover:text-primary/80 font-medium">
                สมัครสมาชิก
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
