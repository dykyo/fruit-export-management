-- ข้อมูลตัวอย่างสำหรับ Shipping Parties
-- Sample Data for Shipper, Consignee, and Notify Party

-- เพิ่มข้อมูล Shippers
INSERT INTO shippers (shipper_code, company_name, address, phone, fax, status, notes) VALUES
('SHP001', 'DYY TRADING INTL CO., LTD.', '101 MOO 7 WIANG SUBDISTRICT, CHIANGSAEN DISTRICT CHIANGRAI 57150 THAILAND', '053-650066', '053-650066', 'active', 'Primary shipper for northern region'),
('SHP002', 'THAI FRUIT EXPORT CO., LTD.', '123 SILOM ROAD, BANGRAK DISTRICT, BANGKOK 10500 THAILAND', '02-234-5678', '02-234-5679', 'active', 'Bangkok based fruit exporter'),
('SHP003', 'GOLDEN HARVEST TRADING', '456 CHAROENKRUNG ROAD, BANGRAK DISTRICT, BANGKOK 10500 THAILAND', '02-345-6789', '02-345-6790', 'active', 'Specialized in tropical fruits'),
('SHP004', 'NORTHERN FRUITS CO., LTD.', '789 SUPERHIGHWAY ROAD, MUANG DISTRICT, CHIANGMAI 50000 THAILAND', '053-123-456', '053-123-457', 'active', 'Chiang Mai fruit supplier');

-- เพิ่มข้อมูล Consignees
INSERT INTO consignees (consignee_code, company_name, address, phone, fax, email, usci, contact_person, status, notes) VALUES
('CON001', 'BEIJING JUNYAO INTERNATIONAL', 'COURTYARD 2, JIAOGEZHUANG STREET NANFAXIN TOWN, SHUNYI DISTRICT, BEIJING, CHINA, 101300.', '0086-13911653846', '0086-13911653846', 'docs.list@bjncei.com, gm@bjncei.com', '91110113MA003ATG6P', 'Ms.Lv Huibin', 'active', 'Major importer in Beijing'),
('CON002', 'SHANGHAI FRESH IMPORT LTD.', 'ROOM 1205, BUILDING A, NO.1000 JINHAI ROAD, PUDONG NEW AREA, SHANGHAI, CHINA, 201206', '0086-21-5888-9999', '0086-21-5888-9998', 'import@shfresh.com, manager@shfresh.com', '91310115MA1FL2XQ4X', 'Mr.Wang Lei', 'active', 'Shanghai based importer'),
('CON003', 'GUANGZHOU TROPICAL FRUITS', 'FLOOR 15, TOWER B, NO.233 TIANHE ROAD, TIANHE DISTRICT, GUANGZHOU, CHINA, 510075', '0086-20-3888-7777', '0086-20-3888-7778', 'purchase@gztropical.com, info@gztropical.com', '91440101MA59M8XR7K', 'Ms.Chen Mei', 'active', 'Guangzhou fruit distributor'),
('CON004', 'SINGAPORE FRESH MART PTE LTD', '123 ORCHARD ROAD, #12-34 ORCHARD PLAZA, SINGAPORE 238874', '+65-6123-4567', '+65-6123-4568', 'orders@sgfreshmart.com, admin@sgfreshmart.com', '201234567H', 'Mr.Tan Wei Ming', 'active', 'Singapore retail chain'),
('CON005', 'TOKYO PREMIUM FRUITS KK', '1-2-3 SHIBUYA, SHIBUYA-KU, TOKYO 150-0002, JAPAN', '+81-3-1234-5678', '+81-3-1234-5679', 'import@tokyofruits.jp, sales@tokyofruits.jp', '1234567890123', 'Mr.Tanaka Hiroshi', 'active', 'Premium fruit importer in Japan');

-- เพิ่มข้อมูล Notify Parties
INSERT INTO notify_parties (notify_code, company_name, address, phone, fax, email, usci, contact_person, status, notes) VALUES
('NOT001', 'BEIJING JUNYAO INTERNATIONAL', 'COURTYARD 2, JIAOGEZHUANG STREET NANFAXIN TOWN, SHUNYI DISTRICT, BEIJING, CHINA, 101300.', '0086-13911653846', '0086-13911653846', 'docs.list@bjncei.com, gm@bjncei.com', '91110113MA003ATG6P', 'Ms.Lv Huibin', 'active', 'Same as consignee'),
('NOT002', 'CHINA CUSTOMS BROKER', 'ROOM 888, BUILDING C, NO.500 CUSTOMS ROAD, PUDONG NEW AREA, SHANGHAI, CHINA, 201204', '0086-21-6666-8888', '0086-21-6666-8889', 'customs@chinacb.com, notify@chinacb.com', '91310115MA1FL3XQ5Y', 'Mr.Li Ming', 'active', 'Customs clearance agent'),
('NOT003', 'SINGAPORE LOGISTICS HUB', '456 TANJONG PAGAR ROAD, #08-12 PSA BUILDING, SINGAPORE 088381', '+65-6789-0123', '+65-6789-0124', 'notify@sglogistics.com, ops@sglogistics.com', '201987654K', 'Ms.Lim Hui Ling', 'active', 'Logistics coordination'),
('NOT004', 'TOKYO CUSTOMS SERVICES', '4-5-6 ODAIBA, MINATO-KU, TOKYO 135-0091, JAPAN', '+81-3-5678-9012', '+81-3-5678-9013', 'customs@tokyocs.jp, notify@tokyocs.jp', '9876543210987', 'Mr.Sato Kenji', 'active', 'Japan customs agent'),
('NOT005', 'EUROPE FRUIT LOGISTICS', 'HAVENSTRAAT 123, 3016 DD ROTTERDAM, NETHERLANDS', '+31-10-123-4567', '+31-10-123-4568', 'notify@eurofruitlog.com, ops@eurofruitlog.com', 'NL123456789B01', 'Mr.Jan van der Berg', 'active', 'European distribution hub');
