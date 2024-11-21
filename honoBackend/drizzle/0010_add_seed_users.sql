-- Seeding additional users
DO $$
DECLARE
    first_names text[] := ARRAY['John', 'Emily', 'Michael', 'Sarah', 'David', 'Jessica', 'Robert', 'Olivia', 'William', 'Emma', 
                                'Daniel', 'Sophia', 'James', 'Ava', 'Alexander', 'Isabella', 'Ethan', 'Mia', 'Benjamin', 'Charlotte'];
    last_names text[] := ARRAY['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 
                               'Anderson', 'Taylor', 'Thomas', 'Lee', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Young'];
    
    default_password CONSTANT text := '$2b$10$pmRBVKhEQCLfob1SC2h6y.K6jruCZIakISZuBpSu9nAa9kjarwUai';
    i int;
    fname text;
    lname text;
    user_email text;
    user_phone text;
    user_emp_no text;
    user_role "user_roles";
    user_auth "auth_levels";
BEGIN
    FOR i IN 7..206 LOOP
        fname := first_names[1 + (i % array_length(first_names, 1))];
        lname := last_names[1 + (i % array_length(last_names, 1))];
        user_email := lower(replace(fname || lname || '@anchors-biz.com', ' ', ''));
        user_phone := '010-' || LPAD(CAST((300 + (i % 700)) AS text), 3, '0') || '-' || LPAD(CAST((1000 + (i % 9000)) AS text), 4, '0');
        user_emp_no := LPAD(CAST((10000 + (i % 90000)) AS text), 5, '0');

        -- Explicitly cast role and auth
        user_role := CASE 
            WHEN i % 10 = 0 THEN 'ADMIN'::user_roles  -- 10% Admins
            ELSE 'USER'::user_roles                   -- 90% Users
        END;

        user_auth := CASE 
            WHEN i % 10 = 0 THEN 'ALL'::auth_levels   -- 10% ALL auth
            ELSE 'READ'::auth_levels                  -- 90% READ auth
        END;

        INSERT INTO public.users (
            company_id, name, email, phone, zip_code, emp_no, 
            password, role, auth, deleted, created_at, updated_at
        ) VALUES (
            1,  -- Anchors company
            fname || ' ' || lname,
            user_email,
            user_phone,
            LPAD(CAST((10000 + (i % 90000)) AS text), 5, '0'),
            user_emp_no,
            default_password,
            user_role,
            user_auth,
            false,
            NOW(),
            NOW()
        );
    END LOOP;

    -- Update the sequence to the maximum user_id
    PERFORM setval('users_user_id_seq', (SELECT MAX(user_id) FROM users));
END $$;