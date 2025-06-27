'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import {
  Package,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Truck,
  BarChart3,
  Plus,
  Ship
} from 'lucide-react'

export default function DashboardPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  const stats = [
    {
      title: 'ยอดขายรวม',
      value: '฿2,450,000',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'คำสั่งซื้อ',
      value: '156',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'ลูกค้า',
      value: '89',
      change: '+15.3%',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'การจัดส่ง',
      value: '142',
      change: '+5.7%',
      icon: Truck,
      color: 'text-orange-600'
    }
  ]

  const quickActions = [
    {
      title: 'เพิ่มคำสั่งซื้อใหม่',
      description: 'สร้างคำสั่งซื้อสำหรับลูกค้า',
      icon: Plus,
      color: 'bg-blue-500',
      href: '/orders'
    },
    {
      title: 'จัดการสินค้า',
      description: 'เพิ่มหรือแก้ไขข้อมูลผลไม้',
      icon: Package,
      color: 'bg-green-500',
      href: '/fruits'
    },
    {
      title: 'รายงานยอดขาย',
      description: 'ดูรายงานและสถิติการขาย',
      icon: BarChart3,
      color: 'bg-purple-500',
      href: '/reports'
    },
    {
      title: 'จัดการลูกค้า',
      description: 'เพิ่มหรือแก้ไขข้อมูลลูกค้า',
      icon: Users,
      color: 'bg-orange-500',
      href: '/customers'
    },
    {
      title: 'จัดการการจัดส่ง',
      description: 'ติดตามการจัดส่งทางเรือ',
      icon: Ship,
      color: 'bg-indigo-500',
      href: '/shipments'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ยินดีต้อนรับ, {user?.email?.split('@')[0]}!
          </h2>
          <p className="text-gray-600">
            ภาพรวมธุรกิจส่งออกผลไม้ของคุณวันนี้
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className={`text-sm ${stat.color} flex items-center mt-1`}>
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            การดำเนินการด่วน
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className={`p-3 rounded-full ${action.color} mb-4`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {action.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>คำสั่งซื้อล่าสุด</CardTitle>
              <CardDescription>
                คำสั่งซื้อที่เข้ามาใหม่ในระบบ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        คำสั่งซื้อ #ORD-{1000 + item}
                      </p>
                      <p className="text-sm text-gray-600">
                        ลูกค้า: บริษัท ABC จำกัด
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ฿{(Math.random() * 100000 + 50000).toLocaleString()}
                      </p>
                      <p className="text-sm text-green-600">
                        รอการยืนยัน
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>สินค้าขายดี</CardTitle>
              <CardDescription>
                ผลไม้ที่มียอดขายสูงสุดในเดือนนี้
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'ทุเรียนหมอนทอง', sales: '245 กก.', revenue: '฿98,000' },
                  { name: 'มังคุดสด', sales: '180 กก.', revenue: '฿72,000' },
                  { name: 'ลำไยอบแห้ง', sales: '320 กก.', revenue: '฿64,000' }
                ].map((fruit, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        {fruit.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        ยอดขาย: {fruit.sales}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {fruit.revenue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
