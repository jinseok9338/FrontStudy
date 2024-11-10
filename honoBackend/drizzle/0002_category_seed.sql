-- Custom SQL migration file, put you code below! ---- categories_seed.sql
INSERT INTO categories (name, depth, priority, parent_id, company_id, created_by)
VALUES
  -- Level 0 (Root categories)
  ('Electronics', 0, 1, NULL, 1, 1),
  ('Fashion', 0, 2, NULL, 1, 1),
  ('Home & Living', 0, 3, NULL, 1, 1),
  ('Sports', 0, 4, NULL, 1, 1);

-- We need to get the IDs of the root categories for the next level
DO $$ 
DECLARE
  electronics_id integer := (SELECT category_id FROM categories WHERE name = 'Electronics' AND parent_id IS NULL);
  fashion_id integer := (SELECT category_id FROM categories WHERE name = 'Fashion' AND parent_id IS NULL);
  home_id integer := (SELECT category_id FROM categories WHERE name = 'Home & Living' AND parent_id IS NULL);
  sports_id integer := (SELECT category_id FROM categories WHERE name = 'Sports' AND parent_id IS NULL);
BEGIN
  -- Level 1 (Sub-categories)
  INSERT INTO categories (name, depth, priority, parent_id, company_id, created_by)
  VALUES
    -- Electronics subcategories
    ('Smartphones', 1, 1, electronics_id, 1, 1),
    ('Laptops', 1, 2, electronics_id, 1, 1),
    ('Audio', 1, 3, electronics_id, 1, 1),
    
    -- Fashion subcategories
    ('Men''s Wear', 1, 1, fashion_id, 1, 1),
    ('Women''s Wear', 1, 2, fashion_id, 1, 1),
    ('Kids'' Wear', 1, 3, fashion_id, 1, 1),
    
    -- Home & Living subcategories
    ('Furniture', 1, 1, home_id, 1, 1),
    ('Kitchenware', 1, 2, home_id, 1, 1),
    ('Decor', 1, 3, home_id, 1, 1),
    
    -- Sports subcategories
    ('Exercise Equipment', 1, 1, sports_id, 1, 1),
    ('Sports Wear', 1, 2, sports_id, 1, 1),
    ('Outdoor Gear', 1, 3, sports_id, 1, 1);

  -- Level 2 (Leaf categories)
  INSERT INTO categories (name, depth, priority, parent_id, company_id, created_by)
  VALUES
    -- Smartphones subcategories
    ('Android Phones', 2, 1, (SELECT category_id FROM categories WHERE name = 'Smartphones' AND parent_id = electronics_id), 1, 1),
    ('iPhones', 2, 2, (SELECT category_id FROM categories WHERE name = 'Smartphones' AND parent_id = electronics_id), 1, 1),
    
    -- Laptops subcategories
    ('Gaming Laptops', 2, 1, (SELECT category_id FROM categories WHERE name = 'Laptops' AND parent_id = electronics_id), 1, 1),
    ('Business Laptops', 2, 2, (SELECT category_id FROM categories WHERE name = 'Laptops' AND parent_id = electronics_id), 1, 1),
    
    -- Men's Wear subcategories
    ('Shirts', 2, 1, (SELECT category_id FROM categories WHERE name = 'Men''s Wear' AND parent_id = fashion_id), 1, 1),
    ('Pants', 2, 2, (SELECT category_id FROM categories WHERE name = 'Men''s Wear' AND parent_id = fashion_id), 1, 1),
    ('Suits', 2, 3, (SELECT category_id FROM categories WHERE name = 'Men''s Wear' AND parent_id = fashion_id), 1, 1),
    
    -- Furniture subcategories
    ('Living Room', 2, 1, (SELECT category_id FROM categories WHERE name = 'Furniture' AND parent_id = home_id), 1, 1),
    ('Bedroom', 2, 2, (SELECT category_id FROM categories WHERE name = 'Furniture' AND parent_id = home_id), 1, 1),
    ('Office', 2, 3, (SELECT category_id FROM categories WHERE name = 'Furniture' AND parent_id = home_id), 1, 1);
END $$;