'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Plus, Search, Edit, Eye, Truck, Phone, MapPin, X } from 'lucide-react'
import { Shipper, ShipperFormData } from '@/types/database'

export default function ShippersPage() {
  const [shippers, setShippers] = useState<Shipper[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingShipper, setEditingShipper] = useState<Shipper | null>(null)
  const [formData, setFormData] = useState<ShipperFormData>({
    shipper_code: '',
    company_name: '',
    address: '',
    phone: '',
    fax: '',
    status: 'active',
    notes: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Mock data for demonstration
  useEffect(() => {
    setTimeout(() => {
      setShippers([
        {
          id: '1',
          shipper_code: 'SHP001',
          company_name: 'DYY TRADING INTL CO., LTD.',
          address: '101 MOO 7 WIANG SUBDISTRICT, CHIANGSAEN DISTRICT CHIANGRAI 57150 THAILAND',
          phone: '053-650066',
          fax: '053-650066',
          status: 'active',
          notes: 'Primary shipper for northern region',
          created_at: '2024-01-01',
          updated_at: '2024-01-01'
        },
        {
          id: '2',
          shipper_code: 'SHP002',
          company_name: 'THAI FRUIT EXPORT CO., LTD.',
          address: '123 SILOM ROAD, BANGRAK DISTRICT, BANGKOK 10500 THAILAND',
          phone: '02-234-5678',
          fax: '02-234-5679',
          status: 'active',
          notes: 'Bangkok based fruit exporter',
          created_at: '2024-01-01',
          updated_at: '2024-01-01'
        },
        {
          id: '3',
          shipper_code: 'SHP003',
          company_name: 'GOLDEN HARVEST TRADING',
          address: '456 CHAROENKRUNG ROAD, BANGRAK DISTRICT, BANGKOK 10500 THAILAND',
          phone: '02-345-6789',
          fax: '02-345-6790',
          status: 'active',
          notes: 'Specialized in tropical fruits',
          created_at: '2024-01-01',
          updated_at: '2024-01-01'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredShippers = shippers.filter(shipper => {
    const matchesSearch = shipper.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipper.shipper_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipper.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === '' || shipper.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { text: 'ใช้งาน', color: 'bg-green-100 text-green-800' },
      inactive: { text: 'ไม่ใช้งาน', color: 'bg-gray-100 text-gray-800' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    )
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})

    // Validation
    const errors: Record<string, string> = {}
    if (!formData.shipper_code) errors.shipper_code = 'กรุณากรอกรหัส Shipper'
    if (!formData.company_name) errors.company_name = 'กรุณากรอกชื่อบริษัท'
    if (!formData.address) errors.address = 'กรุณากรอกที่อยู่'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // TODO: Submit to API
    console.log('Submitting shipper data:', formData)
    
    // Reset form
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      shipper_code: '',
      company_name: '',
      address: '',
      phone: '',
      fax: '',
      status: 'active',
      notes: ''
    })
    setFormErrors({})
    setShowAddForm(false)
    setEditingShipper(null)
  }

  const handleEdit = (shipper: Shipper) => {
    setEditingShipper(shipper)
    setFormData({
      shipper_code: shipper.shipper_code,
      company_name: shipper.company_name,
      address: shipper.address,
      phone: shipper.phone || '',
      fax: shipper.fax || '',
      status: shipper.status,
      notes: shipper.notes || ''
    })
    setShowAddForm(true)
  }

  const handleInputChange = (field: keyof ShipperFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }))
    }
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
                <Truck className="h-8 w-8 mr-3 text-primary" />
                จัดการข้อมูล Shipper
              </h1>
              <p className="text-gray-600 mt-2">
                เพิ่ม แก้ไข และจัดการข้อมูลผู้ส่งสินค้า
              </p>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>เพิ่ม Shipper ใหม่</span>
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
                  placeholder="ค้นหา Shipper..."
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
              </select>
              <div></div>
              <div className="text-sm text-gray-600 flex items-center">
                พบ {filteredShippers.length} รายการ
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shippers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShippers.map((shipper) => (
            <Card key={shipper.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {shipper.company_name}
                    </CardTitle>
                    <CardDescription>
                      {shipper.shipper_code}
                    </CardDescription>
                  </div>
                  {getStatusBadge(shipper.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{shipper.address}</span>
                  </div>
                  
                  {shipper.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{shipper.phone}</span>
                    </div>
                  )}
                  
                  {shipper.fax && (
                    <div className="flex items-center text-sm">
                      <span className="text-gray-600 mr-2">Fax:</span>
                      <span>{shipper.fax}</span>
                    </div>
                  )}

                  {shipper.notes && (
                    <div className="pt-3 border-t">
                      <p className="text-sm text-gray-600">{shipper.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-end pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(shipper)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredShippers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ไม่พบข้อมูล Shipper
              </h3>
              <p className="text-gray-600 mb-4">
                ลองเปลี่ยนเงื่อนไขการค้นหา หรือเพิ่ม Shipper ใหม่
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                เพิ่ม Shipper ใหม่
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {editingShipper ? 'แก้ไขข้อมูล Shipper' : 'เพิ่ม Shipper ใหม่'}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetForm}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="รหัส Shipper (เช่น SHP001)"
                      value={formData.shipper_code}
                      onChange={(e) => handleInputChange('shipper_code', e.target.value)}
                      error={formErrors.shipper_code}
                      disabled={!!editingShipper}
                    />
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value as 'active' | 'inactive')}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="active">ใช้งาน</option>
                      <option value="inactive">ไม่ใช้งาน</option>
                    </select>
                  </div>

                  <Input
                    placeholder="ชื่อบริษัท"
                    value={formData.company_name}
                    onChange={(e) => handleInputChange('company_name', e.target.value)}
                    error={formErrors.company_name}
                  />

                  <div>
                    <textarea
                      placeholder="ที่อยู่"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={3}
                    />
                    {formErrors.address && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="เบอร์โทรศัพท์"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                    <Input
                      placeholder="เบอร์ Fax"
                      value={formData.fax}
                      onChange={(e) => handleInputChange('fax', e.target.value)}
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder="หมายเหตุ"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={2}
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                    >
                      ยกเลิก
                    </Button>
                    <Button type="submit">
                      {editingShipper ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
