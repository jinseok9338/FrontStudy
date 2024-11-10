-- Custom SQL migration file, put you code below! ---- products_seed.sql
DO $$ 
DECLARE
  phones_id integer := (SELECT category_id FROM categories WHERE name = 'Smartphones' AND depth = 1);
  laptops_id integer := (SELECT category_id FROM categories WHERE name = 'Laptops' AND depth = 1);
  mens_wear_id integer := (SELECT category_id FROM categories WHERE name = 'Men''s Wear' AND depth = 1);
BEGIN
  INSERT INTO products (
    name, description, sku, barcode, code, price, discount_rate, 
    quantity, stock, size, color_code, display_yn, category_id, 
    company_id, created_by
  )
  VALUES
    -- Smartphones
    (
      'Galaxy S24 Ultra', 
      'Latest flagship smartphone with advanced AI features', 
      'SM-S24U-256', 
      '8806094835458', 
      'GAL-S24U',
      1399.99,
      0,
      100,
      95,
      '6.8"',
      '#000000',
      'Y',
      phones_id,
      1,
      1
    ),
    (
      'iPhone 15 Pro', 
      'Pro camera system and dynamic island', 
      'IPH-15P-256', 
      '194252937943',
      'APL-15P',
      999.99,
      0.05,
      150,
      142,
      '6.1"',
      '#A9A9A9',
      'Y',
      phones_id,
      1,
      1
    ),
    
    -- Laptops
    (
      'MacBook Pro M3', 
      'Revolutionary performance with M3 chip', 
      'MBP-M3-512', 
      '194253184189',
      'APL-MBP',
      1999.99,
      0,
      50,
      48,
      '14"',
      '#SILVER',
      'Y',
      laptops_id,
      1,
      1
    ),
    
    -- Men's Wear
    (
      'Classic Oxford Shirt', 
      'Premium cotton business shirt', 
      'MS-OXF-L', 
      '5901234123457',
      'SHT-OXF',
      79.99,
      0.15,
      200,
      180,
      'L',
      '#FFFFFF',
      'Y',
      mens_wear_id,
      1,
      1
    );
END $$;