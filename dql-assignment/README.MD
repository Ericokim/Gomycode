-- 1. Display all the data of customers
SELECT customer_id, customer_name, customer_tel
FROM Customers;

-- 2. Display the product_name and category for products with price between 5000 and 10000
SELECT product_name, category
FROM Product
WHERE price BETWEEN 5000 AND 10000;

-- 3. Display all the data of products sorted in descending order of price
SELECT product_id, product_name, price, category
FROM Product
ORDER BY price DESC;

-- 4. Display the total number of orders, the average amount, the highest total amount and the lower total amount
SELECT
COUNT(\*) AS total_orders,
ROUND(AVG(total_amount), 2) AS avg_amount,
MAX(total_amount) AS highest_amount,
MIN(total_amount) AS lowest_amount
FROM Orders;

-- 5. For each product_id, display the number of orders
SELECT
product_id,
COUNT(\*) AS number_of_orders
FROM Orders
GROUP BY product_id
ORDER BY number_of_orders DESC;

-- 6. Display the customer*id which has more than 2 orders
SELECT
customer_id,
COUNT(*) AS order*count
FROM Orders
GROUP BY customer_id
HAVING COUNT(*) > 2
ORDER BY order_count DESC;

-- 6. Number of orders per month in 2020
SELECT 7. For each month of the 2020 year, display the number of orders
SELECT
EXTRACT(MONTH FROM order_date) AS month,
COUNT(\*) AS number_of_orders
FROM Orders
WHERE EXTRACT(YEAR FROM order_date) = 2020
GROUP BY EXTRACT(MONTH FROM order_date)
ORDER BY order: product_name, customer_name, order_date
SEL8. For each order, display the product_name, the customer_name and the date of the order
SELECT
p.product_name,
c.customer_name,
o.order_date
FROM Orders o
JOIN Product p ON o.product_id = c.customer_id
ORDER BY o.order_date DESC;

-- 8. Orders made three months ago
SELECT _
FROM Orders
WHE9. Display all the orders made three months ago
SELECT _
FROM Orders
WHERE order_date >= CURRENT_DATE - INTERVAL '3 months'
AND order_date < CURRENT_DATE - INTERVAL '2 months'
SELECT 10. Display customers (customer_id) who have never ordered a product
SELECT c.customer_id
SELECT 1
FROM Orders o
WHERE o.customer_id = c.customer_id
)
ORDER BY c.customer_id;
