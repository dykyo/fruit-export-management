'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Plus, Search, Edit, Eye, Users, Phone, MapPin, Mail, X, User } from 'lucide-react'
import { Consignee, ConsigneeFormData } from '@/types/database'
import { consigneeApi } from '@/lib/api/shipping-parties'

export default function ConsigneesPage() {
  const [consignees, setConsignees] = useState<Consignee[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingConsignee, setEditingConsignee] = useState<Consignee | null>(null)
  const [formData, setFormData] = useState<ConsigneeFormData>({
    consignee_code: '',
    company_name: '',
    address: '',
    phone: '',
    fax: '',
    email: '',
    usci: '',
    contact_person: '',
    status: 'active',
    notes: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Load consignees from database
  useEffect(() => {
    loadConsignees()
  }, [])

  const loadConsignees = async () => {
    setLoading(true)
    try {
      const { data, error } = await consigneeApi.getAll()
      if (error) {
        console.error('Error loading consignees:', error)
      } else {
        setConsignees(data || [])
      }
    } catch (error) {
      console.error('Error loading consignees:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredConsignees = consignees.filter(consignee => {
    const matchesSearch = consignee.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consignee.consignee_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consignee.contact_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consignee.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === '' || consignee.status === statusFilter
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
    if (!formData.consignee_code) errors.consignee_code = 'กรุณากรอกรหัส Consignee'
    if (!formData.company_name) errors.company_name = 'กรุณากรอกชื่อบริษัท'
    if (!formData.address) errors.address = 'กรุณากรอกที่อยู่'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    try {
      if (editingConsignee) {
        // Update existing consignee
        const { error } = await consigneeApi.update(editingConsignee.id, formData)
        if (error) {
          console.error('Error updating consignee:', error)
          setFormErrors({ submit: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล' })
          return
        }
      } else {
        // Create new consignee
        const { error } = await consigneeApi.create(formData)
        if (error) {
          console.error('Error creating consignee:', error)
          if (error.code === '23505') {
            setFormErrors({ consignee_code: 'รหัส Consignee นี้มีอยู่แล้ว' })
          } else {
            setFormErrors({ submit: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' })
          }
          return
        }
      }

      // Reload data and reset form
      await loadConsignees()
      resetForm()
    } catch (error) {
      console.error('Error submitting consignee:', error)
      setFormErrors({ submit: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' })
    }
  }

  const resetForm = () => {
    setFormData({
      consignee_code: '',
      company_name: '',
      address: '',
      phone: '',
      fax: '',
      email: '',
      usci: '',
      contact_person: '',
      status: 'active',
      notes: ''
    })
    setFormErrors({})
    setShowAddForm(false)
    setEditingConsignee(null)
  }

  const handleEdit = (consignee: Consignee) => {
    setEditingConsignee(consignee)
    setFormData({
      consignee_code: consignee.consignee_code,
      company_name: consignee.company_name,
      address: consignee.address,
      phone: consignee.phone || '',
      fax: consignee.fax || '',
      email: consignee.email || '',
      usci: consignee.usci || '',
      contact_person: consignee.contact_person || '',
      status: consignee.status,
      notes: consignee.notes || ''
    })
    setShowAddForm(true)
  }

  const handleInputChange = (field: keyof ConsigneeFormData, value: any) => {
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
                <Users className="h-8 w-8 mr-3 text-primary" />
                จัดการข้อมูล Consignee
              </h1>
              <p className="text-gray-600 mt-2">
                เพิ่ม แก้ไข และจัดการข้อมูลผู้รับสินค้า
              </p>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>เพิ่ม Consignee ใหม่</span>
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
                  placeholder="ค้นหา Consignee..."
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
                พบ {filteredConsignees.length} รายการ
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consignees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConsignees.map((consignee) => (
            <Card key={consignee.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {consignee.company_name}
                    </CardTitle>
                    <CardDescription>
                      {consignee.consignee_code}
                    </CardDescription>
                  </div>
                  {getStatusBadge(consignee.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{consignee.address}</span>
                  </div>
                  
                  {consignee.contact_person && (
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{consignee.contact_person}</span>
                    </div>
                  )}
                  
                  {consignee.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{consignee.phone}</span>
                    </div>
                  )}
                  
                  {consignee.email && (
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="truncate">{consignee.email}</span>
                    </div>
                  )}

                  {consignee.usci && (
                    <div className="text-sm">
                      <span className="text-gray-600">USCI:</span>
                      <span className="ml-2 font-mono text-xs">{consignee.usci}</span>
                    </div>
                  )}

                  {consignee.notes && (
                    <div className="pt-3 border-t">
                      <p className="text-sm text-gray-600">{consignee.notes}</p>
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
                        onClick={() => handleEdit(consignee)}
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

        {filteredConsignees.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ไม่พบข้อมูล Consignee
              </h3>
              <p className="text-gray-600 mb-4">
                ลองเปลี่ยนเงื่อนไขการค้นหา หรือเพิ่ม Consignee ใหม่
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                เพิ่ม Consignee ใหม่
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {editingConsignee ? 'แก้ไขข้อมูล Consignee' : 'เพิ่ม Consignee ใหม่'}
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
                      placeholder="รหัส Consignee (เช่น CON001)"
                      value={formData.consignee_code}
                      onChange={(e) => handleInputChange('consignee_code', e.target.value)}
                      error={formErrors.consignee_code}
                      disabled={!!editingConsignee}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Email (คั่นด้วย comma หากมีหลายอีเมล)"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                    <Input
                      placeholder="USCI"
                      value={formData.usci}
                      onChange={(e) => handleInputChange('usci', e.target.value)}
                    />
                  </div>

                  <Input
                    placeholder="ผู้ติดต่อ"
                    value={formData.contact_person}
                    onChange={(e) => handleInputChange('contact_person', e.target.value)}
                  />

                  <div>
                    <textarea
                      placeholder="หมายเหตุ"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={2}
                    />
                  </div>

                  {formErrors.submit && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                      {formErrors.submit}
                    </div>
                  )}

                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                    >
                      ยกเลิก
                    </Button>
                    <Button type="submit">
                      {editingConsignee ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล'}
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
