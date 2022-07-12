-- CRON
-- Delete execution of last 10 days of free accounts
DELETE FROM execution 
WHERE createdAt < NOW() - INTERVAL 10 DAY 
AND scheduleId IN (
    SELECT id 
    FROM schedule 
    WHERE accountId 
    IN (
        SELECT id FROM account WHERE plan = "FREE"
    )
)
LIMIT 100000;

-- CRON
-- Pause all Schedules of free accounts created more than 1 month ago
UPDATE schedule
SET status = "PAUSED"
WHERE createdAt < NOW() - INTERVAL 10 DAY 
AND accountId 
IN (
    SELECT id FROM account WHERE plan = "FREE"
);