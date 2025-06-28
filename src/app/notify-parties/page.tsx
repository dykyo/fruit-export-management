'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Plus, Search, Edit, Eye, Bell, Phone, MapPin, Mail, X, User } from 'lucide-react'
import { NotifyParty, NotifyPartyFormData } from '@/types/database'

export default function NotifyPartiesPage() {
  const [notifyParties, setNotifyParties] = useState<NotifyParty[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingNotifyParty, setEditingNotifyParty] = useState<NotifyParty | null>(null)
  const [formData, setFormData] = useState<NotifyPartyFormData>({
    notify_code: '',
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

  // Mock data for demonstration
  useEffect(() => {
    setTimeout(() => {
      setNotifyParties([
        {
          id: '1',
          notify_code: 'NOT001',
          company_name: 'BEIJING JUNYAO INTERNATIONAL',
          address: 'COURTYARD 2, JIAOGEZHUANG STREET NANFAXIN TOWN, SHUNYI DISTRICT, BEIJING, CHINA, 101300.',
          phone: '0086-13911653846',
          fax: '0086-13911653846',
          email: 'docs.list@bjncei.com, gm@bjncei.com',
          usci: '91110113MA003ATG6P',
          contact_person: 'Ms.Lv Huibin',
          status: 'active',
          notes: 'Same as consignee',
          created_at: '2024-01-01',
          updated_at: '2024-01-01'
        },
        {
          id: '2',
          notify_code: 'NOT002',
          company_name: 'CHINA CUSTOMS BROKER',
          address: 'ROOM 888, BUILDING C, NO.500 CUSTOMS ROAD, PUDONG NEW AREA, SHANGHAI, CHINA, 201204',
          phone: '0086-21-6666-8888',
          fax: '0086-21-6666-8889',
          email: 'customs@chinacb.com, notify@chinacb.com',
          usci: '91310115MA1FL3XQ5Y',
          contact_person: 'Mr.Li Ming',
          status: 'active',
          notes: 'Customs clearance agent',
          created_at: '2024-01-01',
          updated_at: '2024-01-01'
        },
        {
          id: '3',
          notify_code: 'NOT003',
          company_name: 'SINGAPORE LOGISTICS HUB',
          address: '456 TANJONG PAGAR ROAD, #08-12 PSA BUILDING, SINGAPORE 088381',
          phone: '+65-6789-0123',
          fax: '+65-6789-0124',
          email: 'notify@sglogistics.com, ops@sglogistics.com',
          usci: '201987654K',
          contact_person: 'Ms.Lim Hui Ling',
          status: 'active',
          notes: 'Logistics coordination',
          created_at: '2024-01-01',
          updated_at: '2024-01-01'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredNotifyParties = notifyParties.filter(notifyParty => {
    const matchesSearch = notifyParty.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notifyParty.notify_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notifyParty.contact_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notifyParty.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === '' || notifyParty.status === statusFilter
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
    if (!formData.notify_code) errors.notify_code = 'กรุณากรอกรหัส Notify Party'
    if (!formData.company_name) errors.company_name = 'กรุณากรอกชื่อบริษัท'
    if (!formData.address) errors.address = 'กรุณากรอกที่อยู่'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // TODO: Submit to API
    console.log('Submitting notify party data:', formData)
    
    // Reset form
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      notify_code: '',
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
    setEditingNotifyParty(null)
  }

  const handleEdit = (notifyParty: NotifyParty) => {
    setEditingNotifyParty(notifyParty)
    setFormData({
      notify_code: notifyParty.notify_code,
      company_name: notifyParty.company_name,
      address: notifyParty.address,
      phone: notifyParty.phone || '',
      fax: notifyParty.fax || '',
      email: notifyParty.email || '',
      usci: notifyParty.usci || '',
      contact_person: notifyParty.contact_person || '',
      status: notifyParty.status,
      notes: notifyParty.notes || ''
    })
    setShowAddForm(true)
  }

  const handleInputChange = (field: keyof NotifyPartyFormData, value: any) => {
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
                <Bell className="h-8 w-8 mr-3 text-primary" />
                จัดการข้อมูล Notify Party
              </h1>
              <p className="text-gray-600 mt-2">
                เพิ่ม แก้ไข และจัดการข้อมูลผู้แจ้งการขนส่ง
              </p>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>เพิ่ม Notify Party ใหม่</span>
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
                  placeholder="ค้นหา Notify Party..."
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
                พบ {filteredNotifyParties.length} รายการ
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notify Parties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotifyParties.map((notifyParty) => (
            <Card key={notifyParty.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {notifyParty.company_name}
                    </CardTitle>
                    <CardDescription>
                      {notifyParty.notify_code}
                    </CardDescription>
                  </div>
                  {getStatusBadge(notifyParty.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{notifyParty.address}</span>
                  </div>
                  
                  {notifyParty.contact_person && (
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{notifyParty.contact_person}</span>
                    </div>
                  )}
                  
                  {notifyParty.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{notifyParty.phone}</span>
                    </div>
                  )}
                  
                  {notifyParty.email && (
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="truncate">{notifyParty.email}</span>
                    </div>
                  )}

                  {notifyParty.usci && (
                    <div className="text-sm">
                      <span className="text-gray-600">USCI:</span>
                      <span className="ml-2 font-mono text-xs">{notifyParty.usci}</span>
                    </div>
                  )}

                  {notifyParty.notes && (
                    <div className="pt-3 border-t">
                      <p className="text-sm text-gray-600">{notifyParty.notes}</p>
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
                        onClick={() => handleEdit(notifyParty)}
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

        {filteredNotifyParties.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ไม่พบข้อมูล Notify Party
              </h3>
              <p className="text-gray-600 mb-4">
                ลองเปลี่ยนเงื่อนไขการค้นหา หรือเพิ่ม Notify Party ใหม่
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                เพิ่ม Notify Party ใหม่
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
                    {editingNotifyParty ? 'แก้ไขข้อมูล Notify Party' : 'เพิ่ม Notify Party ใหม่'}
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
                      placeholder="รหัส Notify Party (เช่น NOT001)"
                      value={formData.notify_code}
                      onChange={(e) => handleInputChange('notify_code', e.target.value)}
                      error={formErrors.notify_code}
                      disabled={!!editingNotifyParty}
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

                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                    >
                      ยกเลิก
                    </Button>
                    <Button type="submit">
                      {editingNotifyParty ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล'}
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
