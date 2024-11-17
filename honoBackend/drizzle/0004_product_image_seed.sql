DO $$ 
DECLARE
    product_cursor CURSOR FOR 
        SELECT product_id FROM products;
    current_product_id integer;
    image_count integer;
    picsum_id integer := 1;
BEGIN
    -- Loop through each product
    OPEN product_cursor;
    LOOP
        FETCH product_cursor INTO current_product_id;
        EXIT WHEN NOT FOUND;
        
        -- Random number of images (1-8) for each product
        image_count := 1 + (random() * 7)::integer;
        
        -- Insert images for current product
        FOR i IN 1..image_count LOOP
            INSERT INTO product_images (
                product_id,
                file_name,
                file_path,
                file_type,
                file_size,
                extension,
                ori_file_name,
                created_by
            )
            VALUES (
                current_product_id,
                picsum_id || '/300/300',                    -- file_name: "123/300/300"
                'https://picsum.photos/id/',                -- file_path: base URL
                'image/jpeg',
                (random() * 2000000 + 500000)::integer,    -- Random file size between 500KB and 2.5MB
                'jpg',
                'Product_' || current_product_id || '_Image_' || i || '.jpg',
                1
            );
            
            picsum_id := picsum_id + 1;
            -- Picsum has limited IDs, so let's reset if we go too high
            IF picsum_id > 1000 THEN
                picsum_id := 1;
            END IF;
        END LOOP;
    END LOOP;
    
    CLOSE product_cursor;
END $$;