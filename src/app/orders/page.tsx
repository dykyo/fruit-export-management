'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Plus, Search, Edit, Eye, ShoppingCart, Calendar, MapPin } from 'lucide-react'
import { Order, Customer } from '@/types/database'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration
  useEffect(() => {
    setTimeout(() => {
      setCustomers([
        {
          id: '1',
          customer_code: 'CUS001',
          company_name: 'Asia Fresh Import Co., Ltd.',
          contact_person: 'John Chen',
          email: 'john@asiafresh.com',
          phone: '+65-6123-4567',
          country: 'Singapore',
          payment_terms: 30,
          credit_limit: 500000,
          status: 'active',
          created_at: '2024-01-01',
          updated_at: '2024-01-01'
        },
        {
          id: '2',
          customer_code: 'CUS002',
          company_name: 'Golden Dragon Trading',
          contact_person: 'Li Wei',
          email: 'li.wei@goldendragon.cn',
          phone: '+86-21-1234-5678',
          country: 'China',
          payment_terms: 45,
          credit_limit: 800000,
          status: 'active',
          created_at: '2024-01-01',
          updated_at: '2024-01-01'
        }
      ])

      setOrders([
        {
          id: '1',
          order_number: 'ORD-2024-001',
          customer_id: '1',
          order_date: '2024-01-15',
          delivery_date: '2024-02-01',
          shipping_country: 'Singapore',
          shipping_port: 'Port of Singapore',
          incoterms: 'FOB',
          currency: 'USD',
          exchange_rate: 1,
          subtotal: 25000,
          discount_percent: 0,
          discount_amount: 0,
          tax_percent: 0,
          tax_amount: 0,
          total_amount: 25000,
          status: 'confirmed',
          notes: 'First shipment of the year - premium quality required',
          created_at: '2024-01-15',
          updated_at: '2024-01-15'
        },
        {
          id: '2',
          order_number: 'ORD-2024-002',
          customer_id: '2',
          order_date: '2024-01-20',
          delivery_date: '2024-02-10',
          shipping_country: 'China',
          shipping_port: 'Port of Shanghai',
          incoterms: 'CIF',
          currency: 'USD',
          exchange_rate: 1,
          subtotal: 45000,
          discount_percent: 0,
          discount_amount: 0,
          tax_percent: 0,
          tax_amount: 0,
          total_amount: 45000,
          status: 'processing',
          notes: 'Regular monthly order - mixed fruits',
          created_at: '2024-01-20',
          updated_at: '2024-01-20'
        },
        {
          id: '3',
          order_number: 'ORD-2024-003',
          customer_id: '1',
          order_date: '2024-01-25',
          delivery_date: '2024-02-15',
          shipping_country: 'Singapore',
          shipping_port: 'Port of Singapore',
          incoterms: 'FOB',
          currency: 'USD',
          exchange_rate: 1,
          subtotal: 18000,
          discount_percent: 5,
          discount_amount: 900,
          tax_percent: 0,
          tax_amount: 0,
          total_amount: 17100,
          status: 'draft',
          notes: 'Special discount for loyal customer',
          created_at: '2024-01-25',
          updated_at: '2024-01-25'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredOrders = orders.filter(order => {
    const customer = customers.find(c => c.id === order.customer_id)
    const matchesSearch = order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer?.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer?.customer_code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === '' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId)
    return customer?.company_name || '-'
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { text: 'ร่าง', color: 'bg-gray-100 text-gray-800' },
      confirmed: { text: 'ยืนยันแล้ว', color: 'bg-blue-100 text-blue-800' },
      processing: { text: 'กำลังดำเนินการ', color: 'bg-yellow-100 text-yellow-800' },
      shipped: { text: 'จัดส่งแล้ว', color: 'bg-purple-100 text-purple-800' },
      delivered: { text: 'ส่งมอบแล้ว', color: 'bg-green-100 text-green-800' },
      cancelled: { text: 'ยกเลิก', color: 'bg-red-100 text-red-800' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <ShoppingCart className="h-8 w-8 mr-3 text-primary" />
                จัดการคำสั่งซื้อ
              </h1>
              <p className="text-gray-600 mt-2">
                เพิ่ม แก้ไข และติดตามคำสั่งซื้อจากลูกค้า
              </p>
            </div>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>สร้างคำสั่งซื้อใหม่</span>
            </Button>
          </div>
        </div>

        {/* Filters Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="ค้นหาคำสั่งซื้อ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">ทุกสถานะ</option>
                <option value="draft">ร่าง</option>
                <option value="confirmed">ยืนยันแล้ว</option>
                <option value="processing">กำลังดำเนินการ</option>
                <option value="shipped">จัดส่งแล้ว</option>
                <option value="delivered">ส่งมอบแล้ว</option>
                <option value="cancelled">ยกเลิก</option>
              </select>
              <div></div>
              <div className="text-sm text-gray-600 flex items-center">
                พบ {filteredOrders.length} รายการ
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {order.order_number}
                      </h3>
                      {getStatusBadge(order.status)}
                      <span className="text-sm text-gray-500">
                        {order.incoterms}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">ลูกค้า:</span>
                        <p className="font-medium">{getCustomerName(order.customer_id)}</p>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        <div>
                          <span className="text-gray-600">วันที่สั่ง:</span>
                          <p className="font-medium">{formatDate(order.order_date)}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        <div>
                          <span className="text-gray-600">ปลายทาง:</span>
                          <p className="font-medium">{order.shipping_country}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">มูลค่า:</span>
                        <p className="font-medium text-lg text-primary">
                          {formatCurrency(order.total_amount, order.currency)}
                        </p>
                      </div>
                    </div>

                    {order.delivery_date && (
                      <div className="mt-3 text-sm">
                        <span className="text-gray-600">กำหนดส่ง:</span>
                        <span className="ml-2 font-medium">{formatDate(order.delivery_date)}</span>
                      </div>
                    )}

                    {order.notes && (
                      <div className="mt-3 text-sm">
                        <span className="text-gray-600">หมายเหตุ:</span>
                        <p className="mt-1 text-gray-800">{order.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      ดู
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      แก้ไข
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ไม่พบคำสั่งซื้อ
              </h3>
              <p className="text-gray-600 mb-4">
                ลองเปลี่ยนเงื่อนไขการค้นหา หรือสร้างคำสั่งซื้อใหม่
              </p>
              <Button>
                สร้างคำสั่งซื้อใหม่
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
