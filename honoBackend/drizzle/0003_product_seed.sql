DO $$
DECLARE
    brand_names text[] := ARRAY['Samsung', 'Apple', 'Sony', 'LG', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Nike', 'Adidas'];
    product_adjectives text[] := ARRAY['Premium', 'Ultra', 'Pro', 'Lite', 'Classic', 'Modern', 'Advanced', 'Elite', 'Essential', 'Deluxe'];
    colors text[] := ARRAY['#000000', '#FFFFFF', '#808080', '#C0C0C0', '#A9A9A9', '#D3D3D3', '#FFD700', '#87CEEB', '#F08080', '#98FB98'];
    
    -- Category paths for different product types
    smartphone_categories integer[] := ARRAY[1,5,17];  -- Electronics > Smartphones > Android
    iphone_categories integer[] := ARRAY[1,5,18];      -- Electronics > Smartphones > iPhones
    gaming_laptop_categories integer[] := ARRAY[1,6,19]; -- Electronics > Laptops > Gaming
    business_laptop_categories integer[] := ARRAY[1,6,20]; -- Electronics > Laptops > Business
    mens_shirt_categories integer[] := ARRAY[2,8,21];   -- Fashion > Men's Wear > Shirts
    mens_pants_categories integer[] := ARRAY[2,8,22];   -- Fashion > Men's Wear > Pants
    mens_suits_categories integer[] := ARRAY[2,8,23];   -- Fashion > Men's Wear > Suits
    living_room_categories integer[] := ARRAY[3,11,24]; -- Home & Living > Furniture > Living Room
    
    base_sku text;
    base_price decimal;
    category_path integer[];
BEGIN
    -- Generate Smartphones (Android)
    INSERT INTO products (
        name, description, sku, barcode, code,
        price, discount_rate, quantity, stock,
        size, color_code, display_yn, categories,
        company_id, created_by
    )
    SELECT 
        brand_names[1 + (i % array_length(brand_names, 1))] || ' ' ||
        product_adjectives[1 + (i % array_length(product_adjectives, 1))] || ' Phone ' || i,
        'High-end smartphone with advanced features - Model ' || i,
        'SP-' || TO_CHAR(i, 'FM0000'),
        '880' || TO_CHAR(i, 'FM000000000'),
        'PHN-' || TO_CHAR(i, 'FM0000'),
        799.99 + (i % 5) * 100,
        CASE WHEN i % 5 = 0 THEN 0.1 ELSE 0 END,
        100 + (i % 50),
        90 + (i % 45),
        CASE 
            WHEN i % 3 = 0 THEN '6.1"'
            WHEN i % 3 = 1 THEN '6.4"'
            ELSE '6.7"'
        END,
        colors[1 + (i % array_length(colors, 1))],
        'Y',
        smartphone_categories,
        1,
        1
    FROM generate_series(1, 50) i;

    -- Generate iPhones
    INSERT INTO products (
        name, description, sku, barcode, code,
        price, discount_rate, quantity, stock,
        size, color_code, display_yn, categories,
        company_id, created_by
    )
    SELECT 
        'iPhone ' || (15 + (i % 3)) || ' ' ||
        product_adjectives[1 + (i % array_length(product_adjectives, 1))],
        'Latest iPhone with innovative features - Model ' || i,
        'IP-' || TO_CHAR(i, 'FM0000'),
        '194' || TO_CHAR(i, 'FM000000000'),
        'APL-' || TO_CHAR(i, 'FM0000'),
        999.99 + (i % 5) * 100,
        CASE WHEN i % 5 = 0 THEN 0.1 ELSE 0 END,
        100 + (i % 50),
        95 + (i % 45),
        CASE 
            WHEN i % 2 = 0 THEN '6.1"'
            ELSE '6.7"'
        END,
        colors[1 + (i % array_length(colors, 1))],
        'Y',
        iphone_categories,
        1,
        1
    FROM generate_series(1, 30) i;

    -- Generate Gaming Laptops
    INSERT INTO products (
        name, description, sku, barcode, code,
        price, discount_rate, quantity, stock,
        size, color_code, display_yn, categories,
        company_id, created_by
    )
    SELECT 
        brand_names[1 + (i % array_length(brand_names, 1))] || ' ' ||
        product_adjectives[1 + (i % array_length(product_adjectives, 1))] || ' Gaming Laptop ' || i,
        'High-performance gaming laptop with RTX graphics - Model ' || i,
        'GL-' || TO_CHAR(i, 'FM0000'),
        '471' || TO_CHAR(i, 'FM000000000'),
        'GML-' || TO_CHAR(i, 'FM0000'),
        1499.99 + (i % 10) * 200,
        CASE WHEN i % 5 = 0 THEN 0.15 ELSE 0 END,
        50 + (i % 30),
        45 + (i % 25),
        CASE 
            WHEN i % 3 = 0 THEN '15.6"'
            WHEN i % 3 = 1 THEN '16"'
            ELSE '17.3"'
        END,
        colors[1 + (i % array_length(colors, 1))],
        'Y',
        gaming_laptop_categories,
        1,
        1
    FROM generate_series(1, 40) i;

    -- Generate Men's Shirts
    INSERT INTO products (
        name, description, sku, barcode, code,
        price, discount_rate, quantity, stock,
        size, color_code, display_yn, categories,
        company_id, created_by
    )
    SELECT 
        product_adjectives[1 + (i % array_length(product_adjectives, 1))] || ' ' ||
        CASE 
            WHEN i % 3 = 0 THEN 'Oxford Shirt'
            WHEN i % 3 = 1 THEN 'Dress Shirt'
            ELSE 'Casual Shirt'
        END || ' ' || i,
        'Premium quality cotton shirt - Style ' || i,
        'MS-' || TO_CHAR(i, 'FM0000'),
        '590' || TO_CHAR(i, 'FM000000000'),
        'SHT-' || TO_CHAR(i, 'FM0000'),
        59.99 + (i % 5) * 10,
        CASE WHEN i % 4 = 0 THEN 0.2 ELSE 0 END,
        200 + (i % 100),
        180 + (i % 90),
        CASE 
            WHEN i % 4 = 0 THEN 'S'
            WHEN i % 4 = 1 THEN 'M'
            WHEN i % 4 = 2 THEN 'L'
            ELSE 'XL'
        END,
        colors[1 + (i % array_length(colors, 1))],
        'Y',
        mens_shirt_categories,
        1,
        1
    FROM generate_series(1, 80) i;

    -- Generate Men's Suits
    INSERT INTO products (
        name, description, sku, barcode, code,
        price, discount_rate, quantity, stock,
        size, color_code, display_yn, categories,
        company_id, created_by
    )
    SELECT 
        product_adjectives[1 + (i % array_length(product_adjectives, 1))] || ' ' ||
        CASE 
            WHEN i % 3 = 0 THEN 'Wool'
            WHEN i % 3 = 1 THEN 'Cotton'
            ELSE 'Linen'
        END || ' Suit ' || i,
        'Premium quality suit - Style ' || i,
        'ST-' || TO_CHAR(i, 'FM0000'),
        '590' || TO_CHAR(i, 'FM000000000'),
        'SUT-' || TO_CHAR(i, 'FM0000'),
        499.99 + (i % 5) * 100,
        CASE WHEN i % 4 = 0 THEN 0.15 ELSE 0 END,
        50 + (i % 30),
        45 + (i % 25),
        CASE 
            WHEN i % 6 = 0 THEN '38R'
            WHEN i % 6 = 1 THEN '40R'
            WHEN i % 6 = 2 THEN '42R'
            WHEN i % 6 = 3 THEN '44R'
            WHEN i % 6 = 4 THEN '46R'
            ELSE '48R'
        END,
        colors[1 + (i % array_length(colors, 1))],
        'Y',
        mens_suits_categories,
        1,
        1
    FROM generate_series(1, 40) i;

END $$;