-- Custom SQL migration file, put you code below! ---- tags_seed.sql
INSERT INTO tags (name, created_by)
VALUES
  ('New Arrival', 1),
  ('Best Seller', 1),
  ('Sale', 1),
  ('Featured', 1),
  ('Limited Edition', 1),
  ('Premium', 1);

-- product_tags_seed.sql
DO $$ 
DECLARE
  new_arrival_id integer := (SELECT tag_id FROM tags WHERE name = 'New Arrival');
  best_seller_id integer := (SELECT tag_id FROM tags WHERE name = 'Best Seller');
  sale_id integer := (SELECT tag_id FROM tags WHERE name = 'Sale');
  premium_id integer := (SELECT tag_id FROM tags WHERE name = 'Premium');
  
  s24_id integer := (SELECT product_id FROM products WHERE name = 'Galaxy S24 Ultra');
  iphone_id integer := (SELECT product_id FROM products WHERE name = 'iPhone 15 Pro');
  macbook_id integer := (SELECT product_id FROM products WHERE name = 'MacBook Pro M3');
  shirt_id integer := (SELECT product_id FROM products WHERE name = 'Classic Oxford Shirt');
BEGIN
  INSERT INTO product_tags (product_id, tag_id, created_by)
  VALUES
    (s24_id, new_arrival_id, 1),
    (s24_id, premium_id, 1),
    (iphone_id, best_seller_id, 1),
    (iphone_id, sale_id, 1),
    (macbook_id, premium_id, 1),
    (macbook_id, new_arrival_id, 1),
    (shirt_id, sale_id, 1);
END $$;