-- ฐานข้อมูลสำหรับ Shipping Parties
-- Database Schema for Shipper, Consignee, and Notify Party

-- ตาราง Shipper (ผู้ส่ง)
CREATE TABLE shippers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipper_code VARCHAR(20) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(50),
  fax VARCHAR(50),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง Consignee (ผู้รับ)
CREATE TABLE consignees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  consignee_code VARCHAR(20) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(50),
  fax VARCHAR(50),
  email TEXT, -- เก็บหลาย email คั่นด้วย comma
  usci VARCHAR(100), -- Unified Social Credit Identifier
  contact_person VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ตาราง Notify Party (ผู้แจ้ง)
CREATE TABLE notify_parties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  notify_code VARCHAR(20) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(50),
  fax VARCHAR(50),
  email TEXT, -- เก็บหลาย email คั่นด้วย comma
  usci VARCHAR(100), -- Unified Social Credit Identifier
  contact_person VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- อัปเดตตาราง shipments เพื่อเชื่อมโยงกับ shipping parties
ALTER TABLE shipments 
ADD COLUMN shipper_id UUID REFERENCES shippers(id),
ADD COLUMN consignee_id UUID REFERENCES consignees(id),
ADD COLUMN notify_party_id UUID REFERENCES notify_parties(id);

-- สร้าง Indexes สำหรับประสิทธิภาพ
CREATE INDEX idx_shippers_code ON shippers(shipper_code);
CREATE INDEX idx_shippers_status ON shippers(status);
CREATE INDEX idx_shippers_company ON shippers(company_name);

CREATE INDEX idx_consignees_code ON consignees(consignee_code);
CREATE INDEX idx_consignees_status ON consignees(status);
CREATE INDEX idx_consignees_company ON consignees(company_name);

CREATE INDEX idx_notify_parties_code ON notify_parties(notify_code);
CREATE INDEX idx_notify_parties_status ON notify_parties(status);
CREATE INDEX idx_notify_parties_company ON notify_parties(company_name);

CREATE INDEX idx_shipments_shipper ON shipments(shipper_id);
CREATE INDEX idx_shipments_consignee ON shipments(consignee_id);
CREATE INDEX idx_shipments_notify_party ON shipments(notify_party_id);

-- สร้าง Triggers สำหรับ auto-update timestamps
CREATE TRIGGER update_shippers_updated_at 
  BEFORE UPDATE ON shippers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consignees_updated_at 
  BEFORE UPDATE ON consignees 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notify_parties_updated_at 
  BEFORE UPDATE ON notify_parties 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- เพิ่ม RLS Policies
ALTER TABLE shippers ENABLE ROW LEVEL SECURITY;
ALTER TABLE consignees ENABLE ROW LEVEL SECURITY;
ALTER TABLE notify_parties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all operations for authenticated users" ON shippers
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON consignees
FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Enable all operations for authenticated users" ON notify_parties
FOR ALL USING (auth.role() = 'authenticated');
