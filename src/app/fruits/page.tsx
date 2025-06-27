'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Plus, Search, Edit, Trash2, Package, X } from 'lucide-react'
import { Fruit, FruitCategory, FruitFormData } from '@/types/database'

export default function FruitsPage() {
  const [fruits, setFruits] = useState<Fruit[]>([])
  const [categories, setCategories] = useState<FruitCategory[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState<FruitFormData>({
    fruit_code: '',
    fruit_name: '',
    fruit_name_th: '',
    category_id: '',
    variety: '',
    origin: '',
    season_start: undefined,
    season_end: undefined,
    unit: 'kg',
    standard_price: undefined,
    shelf_life_days: undefined,
    storage_temp_min: undefined,
    storage_temp_max: undefined,
    humidity_min: undefined,
    humidity_max: undefined,
    status: 'active'
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCategories([
        { id: '1', category_name: 'Tropical Fruits', category_name_th: 'ผลไม้เขตร้อน', created_at: '2024-01-01' },
        { id: '2', category_name: 'Citrus Fruits', category_name_th: 'ผลไม้ตระกูลส้ม', created_at: '2024-01-01' },
        { id: '3', category_name: 'Dried Fruits', category_name_th: 'ผลไม้อบแห้ง', created_at: '2024-01-01' }
      ])

      setFruits([
        {
          id: '1',
          fruit_code: 'DUR001',
          fruit_name: 'Durian',
          fruit_name_th: 'ทุเรียน',
          category_id: '1',
          variety: 'Monthong',
          origin: 'Chanthaburi',
          season_start: 4,
          season_end: 8,
          unit: 'kg',
          standard_price: 400,
          shelf_life_days: 7,
          storage_temp_min: 13,
          storage_temp_max: 15,
          humidity_min: 85,
          humidity_max: 95,
          status: 'active',
          created_at: '2024-01-01',
          updated_at: '2024-01-01'
        },
        {
          id: '2',
          fruit_code: 'MAN001',
          fruit_name: 'Mangosteen',
          fruit_name_th: 'มังคุด',
          category_id: '1',
          variety: 'Premium',
          origin: 'Surat Thani',
          season_start: 5,
          season_end: 9,
          unit: 'kg',
          standard_price: 350,
          shelf_life_days: 14,
          storage_temp_min: 4,
          storage_temp_max: 6,
          humidity_min: 85,
          humidity_max: 95,
          status: 'active',
          created_at: '2024-01-01',
          updated_at: '2024-01-01'
        },
        {
          id: '3',
          fruit_code: 'LON002',
          fruit_name: 'Dried Longan',
          fruit_name_th: 'ลำไยอบแห้ง',
          category_id: '3',
          variety: 'Premium Grade',
          origin: 'Lamphun',
          season_start: 1,
          season_end: 12,
          unit: 'kg',
          standard_price: 800,
          shelf_life_days: 365,
          storage_temp_min: 15,
          storage_temp_max: 25,
          humidity_min: 60,
          humidity_max: 70,
          status: 'active',
          created_at: '2024-01-01',
          updated_at: '2024-01-01'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredFruits = fruits.filter(fruit => {
    const matchesSearch = fruit.fruit_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fruit.fruit_name_th?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fruit.fruit_code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '' || fruit.category_id === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryName = (categoryId?: string) => {
    const category = categories.find(c => c.id === categoryId)
    return category?.category_name_th || category?.category_name || '-'
  }

  const getSeasonText = (start?: number, end?: number) => {
    if (!start || !end) return '-'
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
    return `${months[start - 1]} - ${months[end - 1]}`
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { text: 'ใช้งาน', color: 'bg-green-100 text-green-800' },
      inactive: { text: 'ไม่ใช้งาน', color: 'bg-gray-100 text-gray-800' },
      seasonal: { text: 'ตามฤดูกาล', color: 'bg-yellow-100 text-yellow-800' }
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
    if (!formData.fruit_code) errors.fruit_code = 'กรุณากรอกรหัสผลไม้'
    if (!formData.fruit_name) errors.fruit_name = 'กรุณากรอกชื่อผลไม้'
    if (!formData.unit) errors.unit = 'กรุณาเลือกหน่วยนับ'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // TODO: Submit to API
    console.log('Submitting fruit data:', formData)

    // Reset form
    setFormData({
      fruit_code: '',
      fruit_name: '',
      fruit_name_th: '',
      category_id: '',
      variety: '',
      origin: '',
      season_start: undefined,
      season_end: undefined,
      unit: 'kg',
      standard_price: undefined,
      shelf_life_days: undefined,
      storage_temp_min: undefined,
      storage_temp_max: undefined,
      humidity_min: undefined,
      humidity_max: undefined,
      status: 'active'
    })
    setShowAddForm(false)
  }

  const handleInputChange = (field: keyof FruitFormData, value: any) => {
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
                <Package className="h-8 w-8 mr-3 text-primary" />
                จัดการข้อมูลผลไม้
              </h1>
              <p className="text-gray-600 mt-2">
                เพิ่ม แก้ไข และจัดการข้อมูลผลไม้สำหรับการส่งออก
              </p>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>เพิ่มผลไม้ใหม่</span>
            </Button>
          </div>
        </div>

        {/* Filters Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="ค้นหาผลไม้..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">ทุกประเภท</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.category_name_th || category.category_name}
                  </option>
                ))}
              </select>
              <div className="text-sm text-gray-600 flex items-center">
                พบ {filteredFruits.length} รายการ
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fruits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFruits.map((fruit) => (
            <Card key={fruit.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {fruit.fruit_name_th || fruit.fruit_name}
                    </CardTitle>
                    <CardDescription>
                      {fruit.fruit_code} • {getCategoryName(fruit.category_id)}
                    </CardDescription>
                  </div>
                  {getStatusBadge(fruit.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">พันธุ์:</span>
                      <p className="font-medium">{fruit.variety || '-'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">แหล่งที่มา:</span>
                      <p className="font-medium">{fruit.origin || '-'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">ฤดูกาล:</span>
                      <p className="font-medium">{getSeasonText(fruit.season_start, fruit.season_end)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">ราคามาตรฐาน:</span>
                      <p className="font-medium">
                        {fruit.standard_price ? `฿${fruit.standard_price.toLocaleString()}/${fruit.unit}` : '-'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-xs text-gray-500">
                      อายุการเก็บ: {fruit.shelf_life_days || '-'} วัน
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFruits.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ไม่พบข้อมูลผลไม้
              </h3>
              <p className="text-gray-600 mb-4">
                ลองเปลี่ยนเงื่อนไขการค้นหา หรือเพิ่มผลไม้ใหม่
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                เพิ่มผลไม้ใหม่
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Add Fruit Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>เพิ่มผลไม้ใหม่</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAddForm(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">ข้อมูลพื้นฐาน</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="รหัสผลไม้ (เช่น DUR001)"
                        value={formData.fruit_code}
                        onChange={(e) => handleInputChange('fruit_code', e.target.value)}
                        error={formErrors.fruit_code}
                      />
                      <Input
                        placeholder="ชื่อผลไม้ (ภาษาอังกฤษ)"
                        value={formData.fruit_name}
                        onChange={(e) => handleInputChange('fruit_name', e.target.value)}
                        error={formErrors.fruit_name}
                      />
                      <Input
                        placeholder="ชื่อผลไม้ (ภาษาไทย)"
                        value={formData.fruit_name_th}
                        onChange={(e) => handleInputChange('fruit_name_th', e.target.value)}
                      />
                      <select
                        value={formData.category_id}
                        onChange={(e) => handleInputChange('category_id', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">เลือกประเภทผลไม้</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.category_name_th || category.category_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">รายละเอียดสินค้า</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        placeholder="พันธุ์"
                        value={formData.variety}
                        onChange={(e) => handleInputChange('variety', e.target.value)}
                      />
                      <Input
                        placeholder="แหล่งที่มา"
                        value={formData.origin}
                        onChange={(e) => handleInputChange('origin', e.target.value)}
                      />
                      <select
                        value={formData.unit}
                        onChange={(e) => handleInputChange('unit', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="kg">กิโลกรัม (kg)</option>
                        <option value="ton">ตัน (ton)</option>
                        <option value="piece">ชิ้น (piece)</option>
                        <option value="box">กล่อง (box)</option>
                      </select>
                    </div>
                  </div>

                  {/* Season and Pricing */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">ฤดูกาลและราคา</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <select
                        value={formData.season_start || ''}
                        onChange={(e) => handleInputChange('season_start', e.target.value ? parseInt(e.target.value) : undefined)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">เดือนเริ่มฤดูกาล</option>
                        {Array.from({length: 12}, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'][i]}
                          </option>
                        ))}
                      </select>
                      <select
                        value={formData.season_end || ''}
                        onChange={(e) => handleInputChange('season_end', e.target.value ? parseInt(e.target.value) : undefined)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">เดือนสิ้นสุดฤดูกาล</option>
                        {Array.from({length: 12}, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'][i]}
                          </option>
                        ))}
                      </select>
                      <Input
                        type="number"
                        placeholder="ราคามาตรฐาน (บาท)"
                        value={formData.standard_price || ''}
                        onChange={(e) => handleInputChange('standard_price', e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                      <Input
                        type="number"
                        placeholder="อายุการเก็บ (วัน)"
                        value={formData.shelf_life_days || ''}
                        onChange={(e) => handleInputChange('shelf_life_days', e.target.value ? parseInt(e.target.value) : undefined)}
                      />
                    </div>
                  </div>

                  {/* Storage Conditions */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">เงื่อนไขการเก็บรักษา</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="อุณหภูมิต่ำสุด (°C)"
                        value={formData.storage_temp_min || ''}
                        onChange={(e) => handleInputChange('storage_temp_min', e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="อุณหภูมิสูงสุด (°C)"
                        value={formData.storage_temp_max || ''}
                        onChange={(e) => handleInputChange('storage_temp_max', e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="ความชื้นต่ำสุด (%)"
                        value={formData.humidity_min || ''}
                        onChange={(e) => handleInputChange('humidity_min', e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="ความชื้นสูงสุด (%)"
                        value={formData.humidity_max || ''}
                        onChange={(e) => handleInputChange('humidity_max', e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">สถานะ</h3>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value as 'active' | 'inactive' | 'seasonal')}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="active">ใช้งาน</option>
                      <option value="inactive">ไม่ใช้งาน</option>
                      <option value="seasonal">ตามฤดูกาล</option>
                    </select>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-4 pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                    >
                      ยกเลิก
                    </Button>
                    <Button type="submit">
                      บันทึกข้อมูล
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
