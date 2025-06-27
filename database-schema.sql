-- ฐานข้อมูลระบบจัดการส่งออกผลไม้
-- Fruit Export Management Database Schema

-- ตารางลูกค้า (Customers)
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_code VARCHAR(20) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  country VARCHAR(100),
  tax_id VARCHAR(50),
  payment_terms INTEGER DEFAULT 30, -- วันเครดิต
  credit_limit DECIMAL(15,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตารางประเภทผลไม้ (Fruit Categories)
CREATE TABLE fruit_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL,
  category_name_th VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตารางผลไม้ (Fruits/Products)
CREATE TABLE fruits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fruit_code VARCHAR(20) UNIQUE NOT NULL,
  fruit_name VARCHAR(100) NOT NULL,
  fruit_name_th VARCHAR(100),
  category_id UUID REFERENCES fruit_categories(id),
  variety VARCHAR(100), -- พันธุ์
  origin VARCHAR(100), -- แหล่งที่มา
  season_start INTEGER, -- เดือนเริ่มฤดูกาล (1-12)
  season_end INTEGER, -- เดือนสิ้นสุดฤดูกาล (1-12)
  unit VARCHAR(20) DEFAULT 'kg', -- หน่วยนับ
  standard_price DECIMAL(10,2),
  shelf_life_days INTEGER, -- อายุการเก็บรักษา (วัน)
  storage_temp_min DECIMAL(5,2), -- อุณหภูมิเก็บรักษาต่ำสุด
  storage_temp_max DECIMAL(5,2), -- อุณหภูมิเก็บรักษาสูงสุด
  humidity_min DECIMAL(5,2), -- ความชื้นต่ำสุด
  humidity_max DECIMAL(5,2), -- ความชื้นสูงสุด
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'seasonal')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตารางคำสั่งซื้อ (Orders)
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id) NOT NULL,
  order_date DATE NOT NULL,
  delivery_date DATE,
  shipping_address TEXT,
  shipping_country VARCHAR(100),
  shipping_port VARCHAR(100),
  incoterms VARCHAR(20), -- FOB, CIF, etc.
  currency VARCHAR(3) DEFAULT 'THB',
  exchange_rate DECIMAL(10,4) DEFAULT 1,
  subtotal DECIMAL(15,2) DEFAULT 0,
  discount_percent DECIMAL(5,2) DEFAULT 0,
  discount_amount DECIMAL(15,2) DEFAULT 0,
  tax_percent DECIMAL(5,2) DEFAULT 0,
  tax_amount DECIMAL(15,2) DEFAULT 0,
  total_amount DECIMAL(15,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตารางรายการสินค้าในคำสั่งซื้อ (Order Items)
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  fruit_id UUID REFERENCES fruits(id) NOT NULL,
  quantity DECIMAL(10,3) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(15,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  quality_grade VARCHAR(20), -- เกรดคุณภาพ
  packaging_type VARCHAR(50), -- ประเภทบรรจุภัณฑ์
  special_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตารางการจัดส่ง (Shipments)
CREATE TABLE shipments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_number VARCHAR(50) UNIQUE NOT NULL,
  order_id UUID REFERENCES orders(id),
  vessel_name VARCHAR(100), -- ชื่อเรือ
  voyage_number VARCHAR(50), -- เที่ยวเรือ
  container_number VARCHAR(50), -- หมายเลขตู้คอนเทนเนอร์
  container_type VARCHAR(20), -- ประเภทตู้ (20ft, 40ft, etc.)
  container_seal VARCHAR(50), -- หมายเลขซีล
  loading_port VARCHAR(100), -- ท่าเรือต้นทาง
  discharge_port VARCHAR(100), -- ท่าเรือปลายทาง
  etd DATE, -- วันที่ออกเดินทาง (Estimated Time of Departure)
  eta DATE, -- วันที่ถึงปลายทาง (Estimated Time of Arrival)
  actual_departure DATE,
  actual_arrival DATE,
  shipping_line VARCHAR(100), -- สายเรือ
  freight_cost DECIMAL(15,2),
  insurance_cost DECIMAL(15,2),
  other_charges DECIMAL(15,2),
  total_shipping_cost DECIMAL(15,2),
  temperature_setting DECIMAL(5,2), -- การตั้งอุณหภูมิ
  humidity_setting DECIMAL(5,2), -- การตั้งความชื้น
  status VARCHAR(20) DEFAULT 'preparing' CHECK (status IN ('preparing', 'loaded', 'departed', 'in_transit', 'arrived', 'discharged', 'completed')),
  tracking_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตารางเอกสารการส่งออก (Export Documents)
CREATE TABLE export_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID REFERENCES shipments(id),
  document_type VARCHAR(50) NOT NULL, -- invoice, packing_list, certificate, etc.
  document_number VARCHAR(100),
  document_date DATE,
  issued_by VARCHAR(100),
  file_path VARCHAR(500),
  file_name VARCHAR(255),
  file_size INTEGER,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'issued', 'approved', 'rejected')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตารางการติดตามคุณภาพ (Quality Tracking)
CREATE TABLE quality_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID REFERENCES shipments(id),
  inspection_date DATE NOT NULL,
  inspector_name VARCHAR(100),
  temperature DECIMAL(5,2),
  humidity DECIMAL(5,2),
  quality_grade VARCHAR(20),
  defect_percentage DECIMAL(5,2),
  notes TEXT,
  photos JSONB, -- เก็บ URLs ของรูปภาพ
  status VARCHAR(20) DEFAULT 'passed' CHECK (status IN ('passed', 'failed', 'conditional')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- สร้าง Indexes สำหรับประสิทธิภาพ
CREATE INDEX idx_customers_customer_code ON customers(customer_code);
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_fruits_fruit_code ON fruits(fruit_code);
CREATE INDEX idx_fruits_category ON fruits(category_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_shipments_order ON shipments(order_id);
CREATE INDEX idx_shipments_status ON shipments(status);

-- สร้าง Functions สำหรับ auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- สร้าง Triggers สำหรับ auto-update timestamps
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fruits_updated_at BEFORE UPDATE ON fruits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_shipments_updated_at BEFORE UPDATE ON shipments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
