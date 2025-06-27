'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Plus, Search, Edit, Eye, Truck, Ship, Calendar, MapPin, Thermometer } from 'lucide-react'
import { Shipment, Order } from '@/types/database'

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration
  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          id: '1',
          order_number: 'ORD-2024-001',
          customer_id: '1',
          order_date: '2024-01-15',
          delivery_date: '2024-02-01',
          shipping_country: 'Singapore',
          currency: 'USD',
          exchange_rate: 1,
          subtotal: 25000,
          discount_percent: 0,
          discount_amount: 0,
          tax_percent: 0,
          tax_amount: 0,
          total_amount: 25000,
          status: 'confirmed',
          created_at: '2024-01-15',
          updated_at: '2024-01-15'
        }
      ])

      setShipments([
        {
          id: '1',
          shipment_number: 'SHIP-2024-001',
          order_id: '1',
          vessel_name: 'MV ASIA STAR',
          voyage_number: 'AS240115',
          container_number: 'TEMU1234567',
          container_type: '20RF',
          loading_port: 'Laem Chabang Port',
          discharge_port: 'Port of Singapore',
          etd: '2024-01-25',
          eta: '2024-01-28',
          shipping_line: 'OOCL',
          freight_cost: 2500,
          temperature_setting: 13.0,
          status: 'preparing',
          tracking_notes: 'Container loaded and sealed. Ready for departure.',
          created_at: '2024-01-20',
          updated_at: '2024-01-24'
        },
        {
          id: '2',
          shipment_number: 'SHIP-2024-002',
          order_id: '1',
          vessel_name: 'MV PACIFIC GLORY',
          voyage_number: 'PG240120',
          container_number: 'COSCO9876543',
          container_type: '40RF',
          loading_port: 'Laem Chabang Port',
          discharge_port: 'Port of Shanghai',
          etd: '2024-02-05',
          eta: '2024-02-12',
          shipping_line: 'COSCO',
          freight_cost: 3800,
          temperature_setting: 12.0,
          status: 'departed',
          actual_departure: '2024-02-05',
          tracking_notes: 'Vessel departed on schedule. Temperature monitoring active.',
          created_at: '2024-01-25',
          updated_at: '2024-02-05'
        },
        {
          id: '3',
          shipment_number: 'SHIP-2024-003',
          order_id: '1',
          vessel_name: 'MV OCEAN BREEZE',
          voyage_number: 'OB240201',
          container_number: 'EVERGREEN123',
          container_type: '20RF',
          loading_port: 'Laem Chabang Port',
          discharge_port: 'Port of Hamburg',
          etd: '2024-02-15',
          eta: '2024-03-05',
          shipping_line: 'Evergreen',
          freight_cost: 4200,
          temperature_setting: 14.0,
          status: 'in_transit',
          actual_departure: '2024-02-15',
          tracking_notes: 'Vessel in transit. All systems normal.',
          created_at: '2024-02-01',
          updated_at: '2024-02-15'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.shipment_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.vessel_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.container_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.discharge_port?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === '' || shipment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      preparing: { text: 'เตรียมการ', color: 'bg-yellow-100 text-yellow-800' },
      loaded: { text: 'บรรทุกแล้ว', color: 'bg-blue-100 text-blue-800' },
      departed: { text: 'ออกเดินทาง', color: 'bg-purple-100 text-purple-800' },
      in_transit: { text: 'ระหว่างทาง', color: 'bg-indigo-100 text-indigo-800' },
      arrived: { text: 'ถึงปลายทาง', color: 'bg-green-100 text-green-800' },
      discharged: { text: 'ขนถ่ายแล้ว', color: 'bg-emerald-100 text-emerald-800' },
      completed: { text: 'เสร็จสิ้น', color: 'bg-gray-100 text-gray-800' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.preparing
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount?: number) => {
    if (!amount) return '-'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getOrderNumber = (orderId?: string) => {
    const order = orders.find(o => o.id === orderId)
    return order?.order_number || '-'
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
                <Ship className="h-8 w-8 mr-3 text-primary" />
                จัดการการจัดส่ง
              </h1>
              <p className="text-gray-600 mt-2">
                ติดตามและจัดการการจัดส่งสินค้าทางเรือ
              </p>
            </div>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>สร้างการจัดส่งใหม่</span>
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
                  placeholder="ค้นหาการจัดส่ง..."
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
                <option value="preparing">เตรียมการ</option>
                <option value="loaded">บรรทุกแล้ว</option>
                <option value="departed">ออกเดินทาง</option>
                <option value="in_transit">ระหว่างทาง</option>
                <option value="arrived">ถึงปลายทาง</option>
                <option value="discharged">ขนถ่ายแล้ว</option>
                <option value="completed">เสร็จสิ้น</option>
              </select>
              <div></div>
              <div className="text-sm text-gray-600 flex items-center">
                พบ {filteredShipments.length} รายการ
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipments List */}
        <div className="space-y-4">
          {filteredShipments.map((shipment) => (
            <Card key={shipment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {shipment.shipment_number}
                      </h3>
                      {getStatusBadge(shipment.status)}
                      <span className="text-sm text-gray-500">
                        {getOrderNumber(shipment.order_id)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {shipment.vessel_name} • {shipment.voyage_number} • {shipment.shipping_line}
                    </p>
                  </div>
                  <div className="flex space-x-2">
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="flex items-center mb-1">
                      <Truck className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-gray-600">ตู้คอนเทนเนอร์:</span>
                    </div>
                    <p className="font-medium">{shipment.container_number}</p>
                    <p className="text-xs text-gray-500">{shipment.container_type}</p>
                  </div>

                  <div>
                    <div className="flex items-center mb-1">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-gray-600">เส้นทาง:</span>
                    </div>
                    <p className="font-medium">{shipment.loading_port}</p>
                    <p className="text-xs text-gray-500">→ {shipment.discharge_port}</p>
                  </div>

                  <div>
                    <div className="flex items-center mb-1">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-gray-600">กำหนดการ:</span>
                    </div>
                    <p className="font-medium">ETD: {formatDate(shipment.etd)}</p>
                    <p className="text-xs text-gray-500">ETA: {formatDate(shipment.eta)}</p>
                  </div>

                  <div>
                    <div className="flex items-center mb-1">
                      <Thermometer className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-gray-600">อุณหภูมิ:</span>
                    </div>
                    <p className="font-medium">{shipment.temperature_setting}°C</p>
                    <p className="text-xs text-gray-500">
                      ค่าขนส่ง: {formatCurrency(shipment.freight_cost)}
                    </p>
                  </div>
                </div>

                {shipment.tracking_notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700">
                      <strong>หมายเหตุ:</strong> {shipment.tracking_notes}
                    </p>
                  </div>
                )}

                {shipment.actual_departure && (
                  <div className="mt-3 text-sm">
                    <span className="text-gray-600">ออกเดินทางจริง:</span>
                    <span className="ml-2 font-medium text-green-600">
                      {formatDate(shipment.actual_departure)}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredShipments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Ship className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ไม่พบข้อมูลการจัดส่ง
              </h3>
              <p className="text-gray-600 mb-4">
                ลองเปลี่ยนเงื่อนไขการค้นหา หรือสร้างการจัดส่งใหม่
              </p>
              <Button>
                สร้างการจัดส่งใหม่
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
