// TypeScript types for Fruit Export Management Database

export interface Customer {
  id: string
  customer_code: string
  company_name: string
  contact_person?: string
  email?: string
  phone?: string
  address?: string
  country?: string
  tax_id?: string
  payment_terms: number
  credit_limit: number
  status: 'active' | 'inactive' | 'suspended'
  created_at: string
  updated_at: string
}

export interface FruitCategory {
  id: string
  category_name: string
  category_name_th?: string
  description?: string
  created_at: string
}

export interface Fruit {
  id: string
  fruit_code: string
  fruit_name: string
  fruit_name_th?: string
  category_id?: string
  variety?: string
  origin?: string
  season_start?: number
  season_end?: number
  unit: string
  standard_price?: number
  shelf_life_days?: number
  storage_temp_min?: number
  storage_temp_max?: number
  humidity_min?: number
  humidity_max?: number
  status: 'active' | 'inactive' | 'seasonal'
  created_at: string
  updated_at: string
  category?: FruitCategory
}

export interface Order {
  id: string
  order_number: string
  customer_id: string
  order_date: string
  delivery_date?: string
  shipping_address?: string
  shipping_country?: string
  shipping_port?: string
  incoterms?: string
  currency: string
  exchange_rate: number
  subtotal: number
  discount_percent: number
  discount_amount: number
  tax_percent: number
  tax_amount: number
  total_amount: number
  status: 'draft' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  notes?: string
  created_by?: string
  created_at: string
  updated_at: string
  customer?: Customer
  order_items?: OrderItem[]
  shipments?: Shipment[]
}

export interface OrderItem {
  id: string
  order_id: string
  fruit_id: string
  quantity: number
  unit: string
  unit_price: number
  total_price: number
  quality_grade?: string
  packaging_type?: string
  special_requirements?: string
  created_at: string
  fruit?: Fruit
}

export interface Shipment {
  id: string
  shipment_number: string
  order_id?: string
  vessel_name?: string
  voyage_number?: string
  container_number?: string
  container_type?: string
  container_seal?: string
  loading_port?: string
  discharge_port?: string
  etd?: string
  eta?: string
  actual_departure?: string
  actual_arrival?: string
  shipping_line?: string
  freight_cost?: number
  insurance_cost?: number
  other_charges?: number
  total_shipping_cost?: number
  temperature_setting?: number
  humidity_setting?: number
  status: 'preparing' | 'loaded' | 'departed' | 'in_transit' | 'arrived' | 'discharged' | 'completed'
  tracking_notes?: string
  created_at: string
  updated_at: string
  order?: Order
  export_documents?: ExportDocument[]
  quality_records?: QualityRecord[]
}

export interface ExportDocument {
  id: string
  shipment_id?: string
  document_type: string
  document_number?: string
  document_date?: string
  issued_by?: string
  file_path?: string
  file_name?: string
  file_size?: number
  status: 'draft' | 'issued' | 'approved' | 'rejected'
  notes?: string
  created_at: string
}

export interface QualityRecord {
  id: string
  shipment_id?: string
  inspection_date: string
  inspector_name?: string
  temperature?: number
  humidity?: number
  quality_grade?: string
  defect_percentage?: number
  notes?: string
  photos?: any // JSONB
  status: 'passed' | 'failed' | 'conditional'
  created_at: string
}

// Form types for data entry
export interface CustomerFormData {
  customer_code: string
  company_name: string
  contact_person?: string
  email?: string
  phone?: string
  address?: string
  country?: string
  tax_id?: string
  payment_terms: number
  credit_limit: number
  status: 'active' | 'inactive' | 'suspended'
}

export interface FruitFormData {
  fruit_code: string
  fruit_name: string
  fruit_name_th?: string
  category_id?: string
  variety?: string
  origin?: string
  season_start?: number
  season_end?: number
  unit: string
  standard_price?: number
  shelf_life_days?: number
  storage_temp_min?: number
  storage_temp_max?: number
  humidity_min?: number
  humidity_max?: number
  status: 'active' | 'inactive' | 'seasonal'
}

export interface OrderFormData {
  order_number: string
  customer_id: string
  order_date: string
  delivery_date?: string
  shipping_address?: string
  shipping_country?: string
  shipping_port?: string
  incoterms?: string
  currency: string
  exchange_rate: number
  discount_percent: number
  tax_percent: number
  notes?: string
  order_items: OrderItemFormData[]
}

export interface OrderItemFormData {
  fruit_id: string
  quantity: number
  unit: string
  unit_price: number
  quality_grade?: string
  packaging_type?: string
  special_requirements?: string
}

export interface ShipmentFormData {
  shipment_number: string
  order_id?: string
  vessel_name?: string
  voyage_number?: string
  container_number?: string
  container_type?: string
  container_seal?: string
  loading_port?: string
  discharge_port?: string
  etd?: string
  eta?: string
  shipping_line?: string
  freight_cost?: number
  insurance_cost?: number
  other_charges?: number
  temperature_setting?: number
  humidity_setting?: number
  tracking_notes?: string
}
