# Product CRUD Challenge: SQL and NoSQL Edition

This project demonstrates the same Product CRUD operations with two database styles:

- MongoDB with Mongoose in `controllers/NoSQLcontroller.js`
- MySQL with mysql2 in `controllers/SQLcontroller.js`

## Product Fields

| Field | MongoDB | MySQL |
| --- | --- | --- |
| `id` | Auto-generated `_id` | Auto-increment `id` |
| `name` | String, required | `VARCHAR(255) NOT NULL` |
| `price` | Number, required | `DECIMAL(10, 2) NOT NULL` |
| `category` | String, optional | `VARCHAR(255)` |
| `inStock` | Boolean, default `true` | `BOOLEAN DEFAULT TRUE` |

## Project Files

```text
config/mongo.js              # MongoDB connection
config/mysql.js              # MySQL connection pool
controllers/NoSQLcontroller.js
controllers/SQLcontroller.js
models/Product.js            # Mongoose Product schema
routes/productRoutes.js      # Shared CRUD route builder
sql/schema.sql               # MySQL database and products table
app.js
server.js
```

## Install

```bash
npm install
```

## Environment

Create a local `.env` file from `.env.example`.

```text
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/product_crud_checkpoint

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=product_crud_checkpoint
```

## MySQL Setup

Run the schema file before using the SQL routes:

```bash
mysql -u root -p < sql/schema.sql
```

## Run

```bash
npm start
```

Server URL:

```text
http://localhost:3000
```

## Routes

MongoDB routes:

| Method | Route | Description |
| --- | --- | --- |
| POST | `/nosql/products` | Create product |
| GET | `/nosql/products` | Read all products |
| GET | `/nosql/products/:id` | Read one product |
| PUT | `/nosql/products/:id` | Update product |
| DELETE | `/nosql/products/:id` | Delete product |

MySQL routes:

| Method | Route | Description |
| --- | --- | --- |
| POST | `/sql/products` | Create product |
| GET | `/sql/products` | Read all products |
| GET | `/sql/products/:id` | Read one product |
| PUT | `/sql/products/:id` | Update product |
| DELETE | `/sql/products/:id` | Delete product |

## Example Requests

Create a MongoDB product:

```bash
curl -i -X POST http://localhost:3000/nosql/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop","price":1200,"category":"Electronics","inStock":true}'
```

Create a MySQL product:

```bash
curl -i -X POST http://localhost:3000/sql/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Desk","price":250,"category":"Furniture","inStock":true}'
```

Update a product:

```bash
curl -i -X PUT http://localhost:3000/sql/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Standing Desk","price":350,"category":"Furniture","inStock":true}'
```

Delete a product:

```bash
curl -i -X DELETE http://localhost:3000/sql/products/1
```
