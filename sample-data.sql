-- ข้อมูลตัวอย่างสำหรับระบบจัดการส่งออกผลไม้
-- Sample Data for Fruit Export Management System

-- เพิ่มประเภทผลไม้
INSERT INTO fruit_categories (category_name, category_name_th, description) VALUES
('Tropical Fruits', 'ผลไม้เขตร้อน', 'ผลไม้ที่ปลูกในเขตร้อนชื้น'),
('Citrus Fruits', 'ผลไม้ตระกูลส้ม', 'ผลไม้ตระกูลส้มและมะนาว'),
('Stone Fruits', 'ผลไม้มีเมล็ดแข็ง', 'ผลไม้ที่มีเมล็ดแข็งตรงกลาง'),
('Dried Fruits', 'ผลไม้อบแห้ง', 'ผลไม้ที่ผ่านการอบแห้ง');

-- เพิ่มข้อมูลผลไม้
INSERT INTO fruits (fruit_code, fruit_name, fruit_name_th, category_id, variety, origin, season_start, season_end, unit, standard_price, shelf_life_days, storage_temp_min, storage_temp_max, humidity_min, humidity_max) VALUES
('DUR001', 'Durian', 'ทุเรียน', (SELECT id FROM fruit_categories WHERE category_name = 'Tropical Fruits'), 'Monthong', 'Chanthaburi', 4, 8, 'kg', 400.00, 7, 13, 15, 85, 95),
('MAN001', 'Mangosteen', 'มังคุด', (SELECT id FROM fruit_categories WHERE category_name = 'Tropical Fruits'), 'Premium', 'Surat Thani', 5, 9, 'kg', 350.00, 14, 4, 6, 85, 95),
('LON001', 'Longan', 'ลำไย', (SELECT id FROM fruit_categories WHERE category_name = 'Tropical Fruits'), 'Diamond River', 'Lamphun', 7, 9, 'kg', 120.00, 21, 1, 3, 85, 95),
('LON002', 'Dried Longan', 'ลำไยอบแห้ง', (SELECT id FROM fruit_categories WHERE category_name = 'Dried Fruits'), 'Premium Grade', 'Lamphun', 1, 12, 'kg', 800.00, 365, 15, 25, 60, 70),
('MAN002', 'Mango', 'มะม่วง', (SELECT id FROM fruit_categories WHERE category_name = 'Tropical Fruits'), 'Nam Dok Mai', 'Chachoengsao', 3, 6, 'kg', 180.00, 14, 10, 13, 85, 90),
('POM001', 'Pomelo', 'ส้มโอ', (SELECT id FROM fruit_categories WHERE category_name = 'Citrus Fruits'), 'Thong Dee', 'Nakhon Pathom', 10, 2, 'kg', 80.00, 30, 8, 10, 85, 90);

-- เพิ่มข้อมูลลูกค้า
INSERT INTO customers (customer_code, company_name, contact_person, email, phone, address, country, tax_id, payment_terms, credit_limit, status) VALUES
('CUS001', 'Asia Fresh Import Co., Ltd.', 'John Chen', 'john@asiafresh.com', '+65-6123-4567', '123 Orchard Road, Singapore', 'Singapore', 'SG123456789', 30, 500000.00, 'active'),
('CUS002', 'Golden Dragon Trading', 'Li Wei', 'li.wei@goldendragon.cn', '+86-21-1234-5678', '456 Nanjing Road, Shanghai', 'China', 'CN987654321', 45, 800000.00, 'active'),
('CUS003', 'Euro Tropical Fruits GmbH', 'Hans Mueller', 'h.mueller@eurotropical.de', '+49-40-123-4567', 'Hafenstraße 789, Hamburg', 'Germany', 'DE555666777', 60, 1000000.00, 'active'),
('CUS004', 'Fresh Market USA Inc.', 'Sarah Johnson', 'sarah@freshmarketusa.com', '+1-213-555-0123', '789 Market Street, Los Angeles, CA', 'USA', 'US111222333', 30, 750000.00, 'active'),
('CUS005', 'Tokyo Premium Fruits', 'Tanaka Hiroshi', 'tanaka@tokyofruits.jp', '+81-3-1234-5678', '321 Shibuya, Tokyo', 'Japan', 'JP444555666', 30, 600000.00, 'active');

-- เพิ่มคำสั่งซื้อตัวอย่าง
INSERT INTO orders (order_number, customer_id, order_date, delivery_date, shipping_address, shipping_country, shipping_port, incoterms, currency, subtotal, total_amount, status, notes) VALUES
('ORD-2024-001', 
 (SELECT id FROM customers WHERE customer_code = 'CUS001'), 
 '2024-01-15', 
 '2024-02-01', 
 '123 Orchard Road, Singapore', 
 'Singapore', 
 'Port of Singapore', 
 'FOB', 
 'USD', 
 25000.00, 
 25000.00, 
 'confirmed',
 'First shipment of the year - premium quality required'),

('ORD-2024-002', 
 (SELECT id FROM customers WHERE customer_code = 'CUS002'), 
 '2024-01-20', 
 '2024-02-10', 
 '456 Nanjing Road, Shanghai', 
 'China', 
 'Port of Shanghai', 
 'CIF', 
 'USD', 
 45000.00, 
 45000.00, 
 'processing',
 'Regular monthly order - mixed fruits');

-- เพิ่มรายการสินค้าในคำสั่งซื้อ
INSERT INTO order_items (order_id, fruit_id, quantity, unit, unit_price, quality_grade, packaging_type, special_requirements) VALUES
-- Order 1 items
((SELECT id FROM orders WHERE order_number = 'ORD-2024-001'), 
 (SELECT id FROM fruits WHERE fruit_code = 'DUR001'), 
 50.000, 'kg', 12.00, 'Grade A', 'Vacuum Pack', 'Temperature controlled shipping required'),

((SELECT id FROM orders WHERE order_number = 'ORD-2024-001'), 
 (SELECT id FROM fruits WHERE fruit_code = 'MAN001'), 
 30.000, 'kg', 15.00, 'Premium', 'Foam Tray', 'Handle with care - fragile fruit'),

-- Order 2 items
((SELECT id FROM orders WHERE order_number = 'ORD-2024-002'), 
 (SELECT id FROM fruits WHERE fruit_code = 'LON002'), 
 100.000, 'kg', 25.00, 'Grade A', 'Sealed Bag', 'Moisture control packaging'),

((SELECT id FROM orders WHERE order_number = 'ORD-2024-002'), 
 (SELECT id FROM fruits WHERE fruit_code = 'MAN002'), 
 80.000, 'kg', 8.50, 'Grade A', 'Carton Box', 'Ripeness level 70%'),

((SELECT id FROM orders WHERE order_number = 'ORD-2024-002'), 
 (SELECT id FROM fruits WHERE fruit_code = 'POM001'), 
 60.000, 'kg', 4.50, 'Grade A', 'Net Bag', 'Large size preferred');

-- เพิ่มข้อมูลการจัดส่ง
INSERT INTO shipments (shipment_number, order_id, vessel_name, voyage_number, container_number, container_type, loading_port, discharge_port, etd, eta, shipping_line, freight_cost, temperature_setting, status) VALUES
('SHIP-2024-001', 
 (SELECT id FROM orders WHERE order_number = 'ORD-2024-001'), 
 'MV ASIA STAR', 
 'AS240115', 
 'TEMU1234567', 
 '20RF', 
 'Laem Chabang Port', 
 'Port of Singapore', 
 '2024-01-25', 
 '2024-01-28', 
 'OOCL', 
 2500.00, 
 13.0, 
 'preparing'),

('SHIP-2024-002', 
 (SELECT id FROM orders WHERE order_number = 'ORD-2024-002'), 
 'MV PACIFIC GLORY', 
 'PG240120', 
 'COSCO9876543', 
 '40RF', 
 'Laem Chabang Port', 
 'Port of Shanghai', 
 '2024-02-05', 
 '2024-02-12', 
 'COSCO', 
 3800.00, 
 12.0, 
 'preparing');
