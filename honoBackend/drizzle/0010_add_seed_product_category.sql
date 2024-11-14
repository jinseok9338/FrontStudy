-- Custom SQL migration file, put you code below! --
-- alter categories column of products whose product_id is 1 
-- categories column is an array of integers and it should contain [1,5,17]

DO $$
DECLARE
  category_ids integer[] := ARRAY[1, 5, 17];
BEGIN
    UPDATE products
    SET categories = category_ids
    WHERE product_id = 1;
    END $$;
