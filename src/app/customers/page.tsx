'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Plus, Search, Edit, Eye, Users, Mail, Phone, MapPin } from 'lucide-react'
import { Customer } from '@/types/database'

export default function CustomersPage() {
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
          address: '123 Orchard Road, Singapore',
          country: 'Singapore',
          tax_id: 'SG123456789',
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
          address: '456 Nanjing Road, Shanghai',
          country: 'China',
          tax_id: 'CN987654321',
          payment_terms: 45,
          credit_limit: 800000,
          status: 'active',
          created_at: '2024-01-01',
          updated_at: '2024-01-01'
        },
        {
          id: '3',
          customer_code: 'CUS003',
          company_name: 'Euro Tropical Fruits GmbH',
          contact_person: 'Hans Mueller',
          email: 'h.mueller@eurotropical.de',
          phone: '+49-40-123-4567',
          address: 'Hafenstraße 789, Hamburg',
          country: 'Germany',
          tax_id: 'DE555666777',
          payment_terms: 60,
          credit_limit: 1000000,
          status: 'active',
          created_at: '2024-01-01',
          updated_at: '2024-01-01'
        },
        {
          id: '4',
          customer_code: 'CUS004',
          company_name: 'Fresh Market USA Inc.',
          contact_person: 'Sarah Johnson',
          email: 'sarah@freshmarketusa.com',
          phone: '+1-213-555-0123',
          address: '789 Market Street, Los Angeles, CA',
          country: 'USA',
          tax_id: 'US111222333',
          payment_terms: 30,
          credit_limit: 750000,
          status: 'suspended',
          created_at: '2024-01-01',
          updated_at: '2024-01-01'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.customer_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.contact_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.country?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === '' || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { text: 'ใช้งาน', color: 'bg-green-100 text-green-800' },
      inactive: { text: 'ไม่ใช้งาน', color: 'bg-gray-100 text-gray-800' },
      suspended: { text: 'ระงับ', color: 'bg-red-100 text-red-800' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
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
                <Users className="h-8 w-8 mr-3 text-primary" />
                จัดการลูกค้า
              </h1>
              <p className="text-gray-600 mt-2">
                เพิ่ม แก้ไข และจัดการข้อมูลลูกค้าและพาร์ทเนอร์ทางธุรกิจ
              </p>
            </div>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>เพิ่มลูกค้าใหม่</span>
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
                  placeholder="ค้นหาลูกค้า..."
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
                <option value="active">ใช้งาน</option>
                <option value="inactive">ไม่ใช้งาน</option>
                <option value="suspended">ระงับ</option>
              </select>
              <div></div>
              <div className="text-sm text-gray-600 flex items-center">
                พบ {filteredCustomers.length} รายการ
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {customer.company_name}
                    </CardTitle>
                    <CardDescription>
                      {customer.customer_code}
                    </CardDescription>
                  </div>
                  {getStatusBadge(customer.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customer.contact_person && (
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{customer.contact_person}</span>
                    </div>
                  )}
                  
                  {customer.email && (
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                  )}
                  
                  {customer.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{customer.phone}</span>
                    </div>
                  )}
                  
                  {customer.country && (
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{customer.country}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">เครดิต:</span>
                        <p className="font-medium">{customer.payment_terms} วัน</p>
                      </div>
                      <div>
                        <span className="text-gray-600">วงเงิน:</span>
                        <p className="font-medium text-primary">
                          {formatCurrency(customer.credit_limit)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-xs text-gray-500">
                      Tax ID: {customer.tax_id || '-'}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ไม่พบข้อมูลลูกค้า
              </h3>
              <p className="text-gray-600 mb-4">
                ลองเปลี่ยนเงื่อนไขการค้นหา หรือเพิ่มลูกค้าใหม่
              </p>
              <Button>
                เพิ่มลูกค้าใหม่
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
