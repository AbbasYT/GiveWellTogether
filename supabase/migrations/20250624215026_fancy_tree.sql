/*
  # Create Platform Statistics Function

  1. New Function
    - `get_platform_stats()` - Returns total active subscribers and monthly funding
    - Uses SECURITY DEFINER to bypass RLS
    - Returns aggregated data without exposing individual user information

  2. Security
    - Function runs with elevated privileges to access all subscription data
    - Only returns aggregated statistics, no personal information
    - Public access for displaying platform statistics
*/

-- Create function to get platform-wide statistics
CREATE OR REPLACE FUNCTION get_platform_stats()
RETURNS TABLE (
  total_active_subscribers INTEGER,
  total_monthly_funding NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  subscriber_count INTEGER := 0;
  monthly_funding NUMERIC := 0;
  subscription_record RECORD;
BEGIN
  -- Count total active subscribers
  SELECT COUNT(*) INTO subscriber_count
  FROM stripe_subscriptions
  WHERE status = 'active' AND deleted_at IS NULL;

  -- Calculate total monthly funding
  FOR subscription_record IN 
    SELECT price_id 
    FROM stripe_subscriptions 
    WHERE status = 'active' AND deleted_at IS NULL AND price_id IS NOT NULL
  LOOP
    -- Add the monthly equivalent of each subscription
    CASE subscription_record.price_id
      -- Monthly Tier 1: $15/month
      WHEN 'price_1RcolnRnYW51Zw7fMaZfU3R4' THEN
        monthly_funding := monthly_funding + 15;
      -- Monthly Tier 2: $50/month  
      WHEN 'price_1RcooDRnYW51Zw7fj51b9Cih' THEN
        monthly_funding := monthly_funding + 50;
      -- Monthly Tier 3: $100/month
      WHEN 'price_1RcoopRnYW51Zw7f2D5HGmIM' THEN
        monthly_funding := monthly_funding + 100;
      -- Yearly Tier 1: $180/year = $15/month
      WHEN 'price_1RdI1WRnYW51Zw7fS7BbRR1k' THEN
        monthly_funding := monthly_funding + 15;
      -- Yearly Tier 2: $600/year = $50/month
      WHEN 'price_1RdI1xRnYW51Zw7f3V7F60wZ' THEN
        monthly_funding := monthly_funding + 50;
      -- Yearly Tier 3: $1200/year = $100/month
      WHEN 'price_1RdI2QRnYW51Zw7f4ItuGE9M' THEN
        monthly_funding := monthly_funding + 100;
      ELSE
        -- Unknown price_id, skip
        NULL;
    END CASE;
  END LOOP;

  -- Return the results
  RETURN QUERY SELECT subscriber_count, monthly_funding;
END;
$$;

-- Grant execute permission to authenticated and anonymous users
GRANT EXECUTE ON FUNCTION get_platform_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION get_platform_stats() TO anon;