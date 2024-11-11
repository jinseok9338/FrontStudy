-- Custom SQL migration file, put you code below! ---- product_images_seed.sql
DO $$ 
DECLARE
  s24_id integer := (SELECT product_id FROM products WHERE name = 'Galaxy S24 Ultra');
  iphone_id integer := (SELECT product_id FROM products WHERE name = 'iPhone 15 Pro');
  macbook_id integer := (SELECT product_id FROM products WHERE name = 'MacBook Pro M3');
  shirt_id integer := (SELECT product_id FROM products WHERE name = 'Classic Oxford Shirt');
BEGIN
  INSERT INTO product_images (
    product_id, file_name, file_path, file_type, file_size,
    extension, ori_file_name, created_by
  )
  VALUES
    -- Galaxy S24 Ultra images
    (
      s24_id,
      'galaxy-s24-ultra-main.jpg',
      '/products/smartphones/samsung/',
      'image/jpeg',
      2048576,
      'jpg',
      'Galaxy S24 Ultra Main.jpg',
      1

    ),
    (
      s24_id,
      'galaxy-s24-ultra-side.jpg',
      '/products/smartphones/samsung/',
      'image/jpeg',
      1843200,
      'jpg',
      'Galaxy S24 Ultra Side.jpg',
      1

    ),
    
    -- iPhone 15 Pro images
    (
      iphone_id,
      'iphone-15-pro-front.jpg',
      '/products/smartphones/apple/',
      'image/jpeg',
      1536000,
      'jpg',
      'iPhone 15 Pro Front.jpg',
      1
      
    ),
    
    -- MacBook Pro images
    (
      macbook_id,
      'macbook-pro-m3-main.jpg',
      '/products/laptops/apple/',
      'image/jpeg',
      2457600,
      'jpg',
      'MacBook Pro M3 Main.jpg',
      1

    ),
    
    -- Shirt images
    (
      shirt_id,
      'oxford-shirt-white-front.jpg',
      '/products/clothing/shirts/',
      'image/jpeg',
      1228800,
      'jpg',
      'Oxford Shirt White Front.jpg',
      1

    );
END $$;