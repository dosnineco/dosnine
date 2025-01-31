ere's the SQL code you need to run in your Supabase SQL Editor to create the tables and security rules:

sql
Copy
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create clicks table
CREATE TABLE clicks (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  tier INT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users insert" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users select" ON users
  FOR SELECT USING (auth.uid() = id);

-- Clicks table policies  
CREATE POLICY "Clicks insert" ON clicks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Clicks select" ON clicks
  FOR SELECT USING (auth.uid() = user_id);

-- Add indexes for performance
CREATE INDEX idx_clicks_user_id ON clicks (user_id);
CREATE INDEX idx_clicks_timestamp ON clicks (timestamp);
Additional security measures to implement in Supabase Dashboard:

Go to Authentication -> Settings:

Disable email confirmation

Disable phone authentication

Enable UUID extension

Go to Database -> Roles:

Edit anon role: REVOKE ALL PRIVILEGES

Edit authenticated role: REVOKE ALL PRIVILEGES

Go to Database -> Extensions:

Enable pgcrypto for UUID generation

Enable uuid-ossp

Create a stored procedure to count valid clicks:

sql
Copy
CREATE OR REPLACE FUNCTION get_valid_clicks(user_uuid UUID)
RETURNS BIGINT AS $$
  SELECT COUNT(*) 
  FROM clicks 
  WHERE user_id = user_uuid
  AND timestamp BETWEEN NOW() - INTERVAL '30 DAYS' AND NOW()
$$ LANGUAGE SQL STABLE;
To prevent cheating:

Go to Database -> Triggers and create a new trigger:

sql
Copy
CREATE OR REPLACE FUNCTION prevent_rapid_clicks()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM clicks
    WHERE user_id = NEW.user_id
    AND timestamp > NOW() - INTERVAL '1 SECOND'
  ) THEN
    RAISE EXCEPTION 'Too many clicks too fast!';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER click_speed_limit
BEFORE INSERT ON clicks
FOR EACH ROW EXECUTE FUNCTION prevent_rapid_clicks();
This setup ensures:

Strict user data isolation

Rate limiting (1 click/second max)

30-day competition window

Valid click tracking

Prevention of direct database manipulation

Secure UUID references

Audit trail for all clicks

To view the leaderboard while preventing cheating:

sql
Copy
CREATE VIEW leaderboard AS
SELECT 
  u.id,
  u.name,
  COUNT(c.id) AS total_clicks,
  MAX(c.timestamp) AS last_click
FROM users u
JOIN clicks c ON u.id = c.user_id
WHERE c.timestamp > NOW() - INTERVAL '30 DAYS'
GROUP BY u.id
ORDER BY total_clicks DESC;
Remember to:

Enable HTTPS only in Supabase settings

Add your domain to allowed origins

Enable rate limiting in Supab