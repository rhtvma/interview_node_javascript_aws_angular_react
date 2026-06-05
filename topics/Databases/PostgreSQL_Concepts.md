# PostgreSQL Concepts - Interview Ready

## Table of Contents
1. [Introduction to PostgreSQL](#introduction-to-postgresql)
2. [Data Types](#data-types)
3. [SQL Basics](#sql-basics)
4. [Joins](#joins)
5. [Indexes](#indexes)
6. [Transactions & ACID](#transactions--acid)
7. [Views & Materialized Views](#views--materialized-views)
8. [Stored Procedures & Functions](#stored-procedures--functions)
9. [Triggers](#triggers)
10. [Performance Optimization](#performance-optimization)
11. [Partitioning](#partitioning)
12. [Replication & High Availability](#replication--high-availability)
13. [Security](#security)
14. [Common Interview Questions](#common-interview-questions)

---

## Introduction to PostgreSQL

### What is PostgreSQL?
- Open-source, object-relational database management system (ORDBMS)
- ACID compliant
- Supports advanced data types (JSON, Arrays, hstore)
- Extensible with custom functions, operators, and data types
- Strong community support

### Key Features
- **MVCC**: Multi-Version Concurrency Control
- **Full ACID Compliance**: Atomicity, Consistency, Isolation, Durability
- **Advanced Indexing**: B-tree, Hash, GiST, SP-GiST, GIN, BRIN
- **Foreign Keys & Constraints**: Referential integrity
- **Triggers & Stored Procedures**: Business logic in database
- **Full-Text Search**: Built-in text search capabilities
- **JSON Support**: Native JSON and JSONB data types
- **Window Functions**: Advanced analytics
- **CTEs**: Common Table Expressions (WITH clause)

### PostgreSQL vs MySQL

| Feature | PostgreSQL | MySQL |
|---------|-----------|-------|
| **ACID Compliance** | Full | Partial (InnoDB only) |
| **Data Types** | Rich (JSON, Arrays, etc.) | Limited |
| **Concurrency** | MVCC | Table/Row locking |
| **Full-Text Search** | Built-in | Limited |
| **Window Functions** | Yes | Yes (8.0+) |
| **CTEs** | Yes | Yes (8.0+) |
| **Replication** | Streaming, Logical | Master-Slave |
| **Performance** | Complex queries | Simple queries |
| **Use Case** | Complex applications | Web applications |

---

## Data Types

### Numeric Types
```sql
-- Integer types
SMALLINT        -- 2 bytes, -32768 to 32767
INTEGER (INT)   -- 4 bytes, -2147483648 to 2147483647
BIGINT          -- 8 bytes, very large range

-- Decimal types
DECIMAL(p, s)   -- Exact numeric, p=precision, s=scale
NUMERIC(p, s)   -- Same as DECIMAL
REAL            -- 4 bytes, 6 decimal digits precision
DOUBLE PRECISION -- 8 bytes, 15 decimal digits precision

-- Serial types (auto-increment)
SMALLSERIAL     -- Auto-incrementing 2-byte integer
SERIAL          -- Auto-incrementing 4-byte integer
BIGSERIAL       -- Auto-incrementing 8-byte integer
```

### Character Types
```sql
CHAR(n)         -- Fixed-length, padded with spaces
VARCHAR(n)      -- Variable-length with limit
TEXT            -- Variable unlimited length
```

### Date/Time Types
```sql
DATE            -- Date only (YYYY-MM-DD)
TIME            -- Time only (HH:MM:SS)
TIMESTAMP       -- Date and time
TIMESTAMPTZ     -- Timestamp with timezone
INTERVAL        -- Time interval

-- Examples
SELECT CURRENT_DATE;                    -- 2024-01-15
SELECT CURRENT_TIME;                    -- 14:30:45
SELECT CURRENT_TIMESTAMP;               -- 2024-01-15 14:30:45
SELECT NOW();                           -- Same as CURRENT_TIMESTAMP
SELECT AGE(TIMESTAMP '2024-01-15', TIMESTAMP '2020-01-15'); -- 4 years
```

### Boolean Type
```sql
BOOLEAN         -- TRUE, FALSE, NULL
-- Can use: true, 'true', 't', 'yes', 'y', '1'
-- Can use: false, 'false', 'f', 'no', 'n', '0'
```

### JSON Types
```sql
JSON            -- Text-based JSON storage
JSONB           -- Binary JSON storage (faster, indexable)

-- Examples
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    data JSONB
);

INSERT INTO products (data) VALUES 
('{"name": "Laptop", "price": 999, "specs": {"ram": "16GB", "cpu": "i7"}}');

-- Query JSON
SELECT data->>'name' AS name FROM products;
SELECT data->'specs'->>'ram' AS ram FROM products;
SELECT * FROM products WHERE data->>'price' = '999';
```

### Array Types
```sql
-- Array declaration
INTEGER[]
TEXT[]
VARCHAR(50)[]

-- Examples
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    tags TEXT[]
);

INSERT INTO users (name, tags) VALUES 
('John', ARRAY['developer', 'javascript', 'nodejs']);

-- Query arrays
SELECT * FROM users WHERE 'javascript' = ANY(tags);
SELECT * FROM users WHERE tags @> ARRAY['developer'];
```

### Other Types
```sql
UUID            -- Universally Unique Identifier
BYTEA           -- Binary data
INET            -- IP address
CIDR            -- Network address
MACADDR         -- MAC address
XML             -- XML data
```

---

## SQL Basics

### CREATE TABLE
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INTEGER CHECK (age >= 18),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### INSERT
```sql
-- Single insert
INSERT INTO users (username, email, password, age) 
VALUES ('john_doe', 'john@example.com', 'hashed_password', 25);

-- Multiple inserts
INSERT INTO users (username, email, password, age) VALUES 
('jane_doe', 'jane@example.com', 'hashed_password', 30),
('bob_smith', 'bob@example.com', 'hashed_password', 28);

-- Insert with RETURNING
INSERT INTO users (username, email, password, age) 
VALUES ('alice', 'alice@example.com', 'hashed_password', 27)
RETURNING id, username, created_at;
```

### SELECT
```sql
-- Basic select
SELECT * FROM users;
SELECT username, email FROM users;

-- WHERE clause
SELECT * FROM users WHERE age > 25;
SELECT * FROM users WHERE age BETWEEN 20 AND 30;
SELECT * FROM users WHERE username IN ('john_doe', 'jane_doe');
SELECT * FROM users WHERE email LIKE '%@example.com';
SELECT * FROM users WHERE username ILIKE 'john%'; -- Case-insensitive

-- ORDER BY
SELECT * FROM users ORDER BY age DESC;
SELECT * FROM users ORDER BY created_at DESC, username ASC;

-- LIMIT & OFFSET
SELECT * FROM users LIMIT 10;
SELECT * FROM users LIMIT 10 OFFSET 20; -- Pagination

-- DISTINCT
SELECT DISTINCT age FROM users;

-- Aggregate functions
SELECT COUNT(*) FROM users;
SELECT AVG(age) FROM users;
SELECT MAX(age), MIN(age) FROM users;
SELECT SUM(age) FROM users;

-- GROUP BY
SELECT age, COUNT(*) as count 
FROM users 
GROUP BY age 
ORDER BY count DESC;

-- HAVING (filter after GROUP BY)
SELECT age, COUNT(*) as count 
FROM users 
GROUP BY age 
HAVING COUNT(*) > 5;
```

### UPDATE
```sql
-- Update single row
UPDATE users 
SET email = 'newemail@example.com' 
WHERE id = 1;

-- Update multiple columns
UPDATE users 
SET email = 'newemail@example.com', 
    updated_at = CURRENT_TIMESTAMP 
WHERE id = 1;

-- Update with RETURNING
UPDATE users 
SET age = age + 1 
WHERE id = 1 
RETURNING *;
```

### DELETE
```sql
-- Delete specific rows
DELETE FROM users WHERE id = 1;

-- Delete with condition
DELETE FROM users WHERE age < 18;

-- Delete all rows (careful!)
DELETE FROM users;

-- TRUNCATE (faster, resets sequences)
TRUNCATE TABLE users;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;
```

---

## Joins

### INNER JOIN
```sql
-- Returns only matching rows from both tables
SELECT u.username, p.title 
FROM users u 
INNER JOIN posts p ON u.id = p.user_id;
```

### LEFT JOIN (LEFT OUTER JOIN)
```sql
-- Returns all rows from left table, matching rows from right
SELECT u.username, p.title 
FROM users u 
LEFT JOIN posts p ON u.id = p.user_id;
```

### RIGHT JOIN (RIGHT OUTER JOIN)
```sql
-- Returns all rows from right table, matching rows from left
SELECT u.username, p.title 
FROM users u 
RIGHT JOIN posts p ON u.id = p.user_id;
```

### FULL OUTER JOIN
```sql
-- Returns all rows from both tables
SELECT u.username, p.title 
FROM users u 
FULL OUTER JOIN posts p ON u.id = p.user_id;
```

### CROSS JOIN
```sql
-- Cartesian product of both tables
SELECT u.username, p.title 
FROM users u 
CROSS JOIN posts p;
```

### SELF JOIN
```sql
-- Join table to itself
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    manager_id INTEGER REFERENCES employees(id)
);

SELECT e.name AS employee, m.name AS manager 
FROM employees e 
LEFT JOIN employees m ON e.manager_id = m.id;
```

### Multiple Joins
```sql
SELECT u.username, p.title, c.content 
FROM users u 
INNER JOIN posts p ON u.id = p.user_id 
INNER JOIN comments c ON p.id = c.post_id;
```

---

## Indexes

**Definition:** Indexes are database objects that improve the speed of data retrieval operations on tables. They work like a book's index, allowing the database to find data without scanning every row.

**Purpose:** Speed up SELECT queries, WHERE clauses, JOIN operations, and ORDER BY clauses at the cost of slower INSERT, UPDATE, and DELETE operations.

### Types of Indexes

#### B-tree Index (Default)
**Definition:** Balanced tree structure that maintains sorted data and allows searches, insertions, and deletions in logarithmic time.

**Best for:** Equality and range queries (<, <=, >, >=, BETWEEN)

```sql
-- Best for equality and range queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_age ON users(age);

-- Composite index
CREATE INDEX idx_users_name_age ON users(username, age);
```

#### Hash Index
**Definition:** Uses a hash function to map keys to index entries. Only supports equality comparisons.

**Best for:** Simple equality lookups (=)

```sql
-- Best for equality comparisons only
CREATE INDEX idx_users_email_hash ON users USING HASH (email);
```

#### GIN Index (Generalized Inverted Index)
**Definition:** Inverted index that handles values containing multiple component values, like arrays or full-text search.

**Best for:** JSONB, arrays, full-text search, composite types

```sql
-- Best for JSONB, arrays, full-text search
CREATE INDEX idx_products_data ON products USING GIN (data);
CREATE INDEX idx_users_tags ON users USING GIN (tags);
```

#### GiST Index (Generalized Search Tree)
**Definition:** Balanced tree structure that can be used for various data types and custom operators.

**Best for:** Geometric data, full-text search, nearest-neighbor searches

```sql
-- Best for geometric data, full-text search
CREATE INDEX idx_locations ON locations USING GIST (coordinates);
```

#### BRIN Index (Block Range Index)
**Definition:** Stores summaries of values in consecutive physical block ranges. Very space-efficient.

**Best for:** Very large tables with natural ordering (timestamps, sequential IDs)

```sql
-- Best for very large tables with natural ordering
CREATE INDEX idx_logs_created ON logs USING BRIN (created_at);
```

### Index Management
```sql
-- Create unique index
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- Partial index (conditional)
CREATE INDEX idx_active_users ON users(username) WHERE active = true;

-- Expression index
CREATE INDEX idx_users_lower_email ON users(LOWER(email));

-- Drop index
DROP INDEX idx_users_email;

-- Reindex
REINDEX INDEX idx_users_email;
REINDEX TABLE users;

-- List indexes
SELECT * FROM pg_indexes WHERE tablename = 'users';
```

### When to Use Indexes
✅ **Use indexes for:**
- Columns in WHERE clauses
- Columns in JOIN conditions
- Columns in ORDER BY
- Foreign keys
- Columns with high cardinality

❌ **Avoid indexes for:**
- Small tables
- Columns with low cardinality
- Frequently updated columns
- Columns rarely used in queries

---

## Transactions & ACID

### ACID Properties
- **Atomicity**: All or nothing
- **Consistency**: Data integrity maintained
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed data persists

### Transaction Commands
```sql
-- Start transaction
BEGIN;
-- or
START TRANSACTION;

-- Commit transaction
COMMIT;

-- Rollback transaction
ROLLBACK;

-- Savepoint
BEGIN;
INSERT INTO users (username, email) VALUES ('user1', 'user1@example.com');
SAVEPOINT sp1;
INSERT INTO users (username, email) VALUES ('user2', 'user2@example.com');
ROLLBACK TO SAVEPOINT sp1; -- Rollback to savepoint
COMMIT;
```

### Isolation Levels
```sql
-- Read Uncommitted (not supported in PostgreSQL)
-- Read Committed (default)
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Repeatable Read
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Serializable
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- Example
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SELECT * FROM accounts WHERE id = 1;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
COMMIT;
```

### Locking
```sql
-- Row-level locks
SELECT * FROM users WHERE id = 1 FOR UPDATE; -- Exclusive lock
SELECT * FROM users WHERE id = 1 FOR SHARE;  -- Shared lock

-- Table-level locks
LOCK TABLE users IN ACCESS EXCLUSIVE MODE;
```

---

## Views & Materialized Views

### Views
**Definition:** A view is a virtual table based on a SQL query. It doesn't store data physically but provides a way to simplify complex queries and present data in a specific format.

**Purpose:** Simplify complex queries, provide data abstraction, enhance security by limiting data access, and maintain backward compatibility.

**Characteristics:**
- No physical storage (virtual table)
- Always shows current data
- Can be updatable (simple views)
- Query executed every time view is accessed

```sql
-- Create view
CREATE VIEW active_users AS
SELECT id, username, email
FROM users
WHERE active = true;

-- Query view
SELECT * FROM active_users;

-- Update view (if updatable)
UPDATE active_users SET email = 'new@example.com' WHERE id = 1;

-- Drop view
DROP VIEW active_users;

-- Replace view
CREATE OR REPLACE VIEW active_users AS
SELECT id, username, email, created_at
FROM users
WHERE active = true;
```

### Materialized Views
**Definition:** A materialized view is a database object that stores the result of a query physically. Unlike regular views, it contains actual data that must be refreshed to stay current.

**Purpose:** Improve query performance for complex, frequently-accessed queries by pre-computing and storing results.

**Characteristics:**
- Physical storage (actual table)
- Shows snapshot of data at refresh time
- Requires manual refresh
- Much faster query performance
- Uses more storage space

**When to use:**
- Complex aggregations or joins
- Data doesn't change frequently
- Query performance is critical
- Acceptable to have slightly stale data

```sql
-- Create materialized view (stores result)
CREATE MATERIALIZED VIEW user_stats AS
SELECT 
    u.id,
    u.username,
    COUNT(p.id) as post_count,
    MAX(p.created_at) as last_post_date
FROM users u 
LEFT JOIN posts p ON u.id = p.user_id 
GROUP BY u.id, u.username;

-- Query materialized view
SELECT * FROM user_stats;

-- Refresh materialized view
REFRESH MATERIALIZED VIEW user_stats;

-- Refresh concurrently (non-blocking)
REFRESH MATERIALIZED VIEW CONCURRENTLY user_stats;

-- Drop materialized view
DROP MATERIALIZED VIEW user_stats;
```

---

## Stored Procedures & Functions

### Functions
```sql
-- Create function
CREATE OR REPLACE FUNCTION get_user_post_count(user_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    post_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO post_count 
    FROM posts 
    WHERE posts.user_id = $1;
    
    RETURN post_count;
END;
$$ LANGUAGE plpgsql;

-- Call function
SELECT get_user_post_count(1);

-- Function returning table
CREATE OR REPLACE FUNCTION get_active_users()
RETURNS TABLE(id INTEGER, username VARCHAR, email VARCHAR) AS $$
BEGIN
    RETURN QUERY 
    SELECT u.id, u.username, u.email 
    FROM users u 
    WHERE u.active = true;
END;
$$ LANGUAGE plpgsql;

-- Call function
SELECT * FROM get_active_users();
```

### Stored Procedures (PostgreSQL 11+)
```sql
-- Create procedure
CREATE OR REPLACE PROCEDURE update_user_email(
    p_user_id INTEGER,
    p_new_email VARCHAR
)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE users 
    SET email = p_new_email, 
        updated_at = CURRENT_TIMESTAMP 
    WHERE id = p_user_id;
    
    COMMIT;
END;
$$;

-- Call procedure
CALL update_user_email(1, 'newemail@example.com');
```

---

## Triggers

### Trigger Functions
```sql
-- Create trigger function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER users_update_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Audit trigger
CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(50),
    operation VARCHAR(10),
    old_data JSONB,
    new_data JSONB,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (table_name, operation, new_data)
        VALUES (TG_TABLE_NAME, TG_OP, row_to_json(NEW));
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, operation, old_data, new_data)
        VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD), row_to_json(NEW));
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (table_name, operation, old_data)
        VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_audit
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW
EXECUTE FUNCTION audit_trigger();
```

---

## Performance Optimization

### EXPLAIN & ANALYZE
```sql
-- Show query plan
EXPLAIN SELECT * FROM users WHERE age > 25;

-- Show actual execution
EXPLAIN ANALYZE SELECT * FROM users WHERE age > 25;

-- Detailed output
EXPLAIN (ANALYZE, BUFFERS, VERBOSE) 
SELECT * FROM users WHERE age > 25;
```

### Query Optimization Tips

#### 1. Use Indexes
```sql
-- Before
SELECT * FROM users WHERE email = 'john@example.com';

-- Create index
CREATE INDEX idx_users_email ON users(email);
```

#### 2. Avoid SELECT *
```sql
-- Bad
SELECT * FROM users;

-- Good
SELECT id, username, email FROM users;
```

#### 3. Use LIMIT
```sql
-- Limit results
SELECT * FROM users LIMIT 100;
```

#### 4. Use EXISTS instead of IN
```sql
-- Slower
SELECT * FROM users WHERE id IN (SELECT user_id FROM posts);

-- Faster
SELECT * FROM users u WHERE EXISTS (
    SELECT 1 FROM posts p WHERE p.user_id = u.id
);
```

#### 5. Use CTEs for Readability
```sql
WITH active_users AS (
    SELECT id, username FROM users WHERE active = true
),
user_posts AS (
    SELECT user_id, COUNT(*) as post_count 
    FROM posts 
    GROUP BY user_id
)
SELECT au.username, COALESCE(up.post_count, 0) as posts
FROM active_users au
LEFT JOIN user_posts up ON au.id = up.user_id;
```

### Vacuum & Analyze
```sql
-- Vacuum (reclaim storage)
VACUUM users;
VACUUM FULL users; -- More aggressive

-- Analyze (update statistics)
ANALYZE users;

-- Both
VACUUM ANALYZE users;

-- Auto-vacuum (configured in postgresql.conf)
```

---

## Partitioning

### Range Partitioning
```sql
-- Create partitioned table
CREATE TABLE logs (
    id SERIAL,
    message TEXT,
    created_at TIMESTAMP NOT NULL
) PARTITION BY RANGE (created_at);

-- Create partitions
CREATE TABLE logs_2024_01 PARTITION OF logs
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE logs_2024_02 PARTITION OF logs
FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');

-- Insert data (automatically routed to correct partition)
INSERT INTO logs (message, created_at) 
VALUES ('Log message', '2024-01-15');
```

### List Partitioning
```sql
CREATE TABLE orders (
    id SERIAL,
    status VARCHAR(20),
    amount DECIMAL(10, 2)
) PARTITION BY LIST (status);

CREATE TABLE orders_pending PARTITION OF orders
FOR VALUES IN ('pending', 'processing');

CREATE TABLE orders_completed PARTITION OF orders
FOR VALUES IN ('completed', 'shipped');
```

### Hash Partitioning
```sql
CREATE TABLE users (
    id SERIAL,
    username VARCHAR(50)
) PARTITION BY HASH (id);

CREATE TABLE users_p0 PARTITION OF users
FOR VALUES WITH (MODULUS 4, REMAINDER 0);

CREATE TABLE users_p1 PARTITION OF users
FOR VALUES WITH (MODULUS 4, REMAINDER 1);
```

---

## Replication & High Availability

### Streaming Replication
```sql
-- On primary server (postgresql.conf)
wal_level = replica
max_wal_senders = 3
wal_keep_size = 64

-- On standby server (recovery.conf or postgresql.auto.conf)
primary_conninfo = 'host=primary_host port=5432 user=replicator password=secret'
```

### Logical Replication
```sql
-- On publisher
CREATE PUBLICATION my_publication FOR TABLE users, posts;

-- On subscriber
CREATE SUBSCRIPTION my_subscription
CONNECTION 'host=publisher_host dbname=mydb user=replicator password=secret'
PUBLICATION my_publication;
```

---

## Security

### User Management
```sql
-- Create user
CREATE USER john WITH PASSWORD 'secure_password';

-- Create role
CREATE ROLE readonly;

-- Grant privileges
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;
GRANT readonly TO john;

-- Revoke privileges
REVOKE SELECT ON users FROM john;

-- Change password
ALTER USER john WITH PASSWORD 'new_password';

-- Drop user
DROP USER john;
```

### Row-Level Security
```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY user_policy ON users
FOR SELECT
USING (id = current_user_id());

-- Drop policy
DROP POLICY user_policy ON users;
```

### SSL Connection
```sql
-- Require SSL
ALTER USER john WITH CONNECTION LIMIT 10;
ALTER DATABASE mydb SET ssl TO on;
```

---

## Common Interview Questions

### 1. What is the difference between DELETE and TRUNCATE?
- **DELETE**: Removes rows one by one, can use WHERE, slower, can be rolled back
- **TRUNCATE**: Removes all rows at once, faster, resets sequences, minimal logging

### 2. Explain MVCC (Multi-Version Concurrency Control)
MVCC allows multiple transactions to access the same data concurrently without locking. Each transaction sees a snapshot of the database at a point in time.

### 3. What are the different types of joins?
- INNER JOIN: Returns matching rows
- LEFT JOIN: All from left + matching from right
- RIGHT JOIN: All from right + matching from left
- FULL OUTER JOIN: All rows from both tables
- CROSS JOIN: Cartesian product

### 4. How do you optimize a slow query?
1. Use EXPLAIN ANALYZE
2. Add appropriate indexes
3. Avoid SELECT *
4. Use LIMIT
5. Optimize JOIN conditions
6. Update statistics with ANALYZE
7. Consider partitioning for large tables

### 5. What is the difference between a view and a materialized view?
- **View**: Virtual table, query executed each time
- **Materialized View**: Stores result physically, needs refresh

### 6. Explain ACID properties
- **Atomicity**: All or nothing
- **Consistency**: Data integrity
- **Isolation**: Concurrent transactions isolated
- **Durability**: Committed data persists

### 7. What are indexes and when should you use them?
Indexes speed up data retrieval. Use for:
- WHERE clauses
- JOIN conditions
- ORDER BY columns
- Foreign keys

### 8. What is a transaction?
A sequence of operations performed as a single logical unit of work. Either all succeed or all fail.

### 9. What is normalization?
Process of organizing data to reduce redundancy:
- 1NF: Atomic values
- 2NF: No partial dependencies
- 3NF: No transitive dependencies

### 10. What is the difference between UNION and UNION ALL?
- **UNION**: Removes duplicates, slower
- **UNION ALL**: Keeps duplicates, faster

---

## Advanced Topics

### Window Functions
```sql
-- ROW_NUMBER
SELECT 
    username,
    age,
    ROW_NUMBER() OVER (ORDER BY age DESC) as rank
FROM users;

-- RANK and DENSE_RANK
SELECT 
    username,
    age,
    RANK() OVER (ORDER BY age DESC) as rank,
    DENSE_RANK() OVER (ORDER BY age DESC) as dense_rank
FROM users;

-- Partition by
SELECT 
    username,
    department,
    salary,
    AVG(salary) OVER (PARTITION BY department) as dept_avg
FROM employees;

-- LAG and LEAD
SELECT 
    date,
    sales,
    LAG(sales) OVER (ORDER BY date) as prev_sales,
    LEAD(sales) OVER (ORDER BY date) as next_sales
FROM daily_sales;
```

### Common Table Expressions (CTEs)
```sql
-- Simple CTE
WITH active_users AS (
    SELECT * FROM users WHERE active = true
)
SELECT * FROM active_users WHERE age > 25;

-- Recursive CTE
WITH RECURSIVE subordinates AS (
    SELECT id, name, manager_id, 1 as level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    SELECT e.id, e.name, e.manager_id, s.level + 1
    FROM employees e
    INNER JOIN subordinates s ON e.manager_id = s.id
)
SELECT * FROM subordinates;
```

### Full-Text Search
```sql
-- Create tsvector column
ALTER TABLE posts ADD COLUMN search_vector tsvector;

-- Update search vector
UPDATE posts 
SET search_vector = to_tsvector('english', title || ' ' || content);

-- Create GIN index
CREATE INDEX idx_posts_search ON posts USING GIN (search_vector);

-- Search
SELECT * FROM posts 
WHERE search_vector @@ to_tsquery('english', 'postgresql & performance');

-- Rank results
SELECT 
    title,
    ts_rank(search_vector, to_tsquery('postgresql')) as rank
FROM posts
WHERE search_vector @@ to_tsquery('postgresql')
ORDER BY rank DESC;
```

---

## Resources
- [PostgreSQL Official Documentation](https://www.postgresql.org/docs/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [Use The Index, Luke](https://use-the-index-luke.com/)
- [Explain.depesz.com](https://explain.depesz.com/) - Query plan visualizer