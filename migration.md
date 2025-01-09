create table invoices (
  id uuid primary key default uuid_generate_v4(),
  invoice_no varchar not null,
  create_date date not null,
  due_date date not null,
  payment_status varchar not null,
  total_amount numeric not null,
  user_id uuid references auth.users not null
);


-- Create the table if it does not exist
CREATE TABLE IF NOT EXISTS email_templates (
    id SERIAL PRIMARY KEY,                     -- Primary key with auto-increment
    user_id TEXT NOT NULL,                     -- User ID (text type)
    template_name TEXT NOT NULL,               -- Template name (text type)
    template_content TEXT NOT NULL,            -- Template content (text type)
    is_pinned BOOLEAN DEFAULT FALSE,           -- Is pinned (boolean type, default to false)
    date_created TIMESTAMP DEFAULT NOW(),      -- Date created (timestamp type, default to current time)
    usage_count INTEGER DEFAULT 0,             -- Usage count (integer type, default to 0)
    shared_with TEXT[] DEFAULT array[]::TEXT[] -- Shared with (array of text, default to empty array)
);

-- Update the table if it already exists
DO $$
BEGIN
    -- Add column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='email_templates' AND column_name='date_created') THEN
        ALTER TABLE email_templates ADD COLUMN date_created TIMESTAMP DEFAULT NOW();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='email_templates' AND column_name='usage_count') THEN
        ALTER TABLE email_templates ADD COLUMN usage_count INTEGER DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='email_templates' AND column_name='shared_with') THEN
        ALTER TABLE email_templates ADD COLUMN shared_with TEXT[] DEFAULT array[]::TEXT[];
    END IF;
END $$;



ALTER TABLE email_templates
ADD COLUMN public_link TEXT;




create table email_templates (
  id serial primary key,
  user_id text not null,
  template_name text not null,
  template_content text not null,
  is_pinned boolean default false,
  shared_with text[] default array[]::text[]
);


CREATE TABLE page_views (
    id SERIAL PRIMARY KEY,
    page_url TEXT NOT NULL,
    view_count INT NOT NULL DEFAULT 1,
    last_viewed TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- CREATE OR REPLACE FUNCTION get_daily_views()
-- RETURNS TABLE (page_url TEXT, view_count INT) AS $$
-- BEGIN
--   RETURN QUERY
--   SELECT page_url, SUM(view_count) AS view_count
--   FROM page_views
--   WHERE last_viewed >= CURRENT_DATE
--   GROUP BY page_url
--   ORDER BY view_count DESC;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_weekly_views()
-- RETURNS TABLE (page_url TEXT, view_count INT) AS $$
-- BEGIN
--   RETURN QUERY
--   SELECT page_url, SUM(view_count) AS view_count
--   FROM page_views
--   WHERE last_viewed >= CURRENT_DATE - INTERVAL '7 days'
--   GROUP BY page_url
--   ORDER BY view_count DESC;
-- END;
-- $$ LANGUAGE plpgsql;


-- CREATE OR REPLACE FUNCTION get_monthly_views()
-- RETURNS TABLE (page_url TEXT, view_count INT) AS $$
-- BEGIN
--   RETURN QUERY
--   SELECT page_url, SUM(view_count) AS view_count
--   FROM page_views
--   WHERE last_viewed >= CURRENT_DATE - INTERVAL '1 month'
--   GROUP BY page_url
--   ORDER BY view_count DESC;
-- END;
-- $$ LANGUAGE plpgsql;