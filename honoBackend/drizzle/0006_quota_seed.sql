-- Custom SQL migration file, put you code below! ---- quotas_seed.sql
DO $$ 
DECLARE
  phones_id integer := (SELECT category_id FROM categories WHERE name = 'Smartphones' AND depth = 1);
  laptops_id integer := (SELECT category_id FROM categories WHERE name = 'Laptops' AND depth = 1);
BEGIN
  INSERT INTO quotas (
    count, category_id, event_config_id, user_type_id, created_by
  )
  VALUES
    -- Smartphone quotas
    (100, phones_id, 1, 1, 1),  -- Regular user quota
    (200, phones_id, 1, 2, 1),  -- Premium user quota
    
    -- Laptop quotas
    (50, laptops_id, 1, 1, 1),  -- Regular user quota
    (100, laptops_id, 1, 2, 1); -- Premium user quota
END $$;