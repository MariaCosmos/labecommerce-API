-- Active: 1676297740825@@127.0.0.1@3306
CREATE TABLE users (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES 
("u003", "flufi@bmail.com", "pass135"),
("u004", "banali@bmail.com", "caramelo123"),
("u005", "guti@bmail.com", "todinho");

CREATE TABLE products (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES
("p003","shampoo", 8.5, "cosmeticos"),
("p004","calça jeans", 48, "roupas"),
("p005","margarina", 6.25, "alimentos"),
("p006","milho", 7, "alimentos"),
("p007","sabonete", 2.2, "cosmeticos");


SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products
WHERE name = "milho";

INSERT INTO products (id, name, price, category)
VALUES
("p008","farofa", 5.5, "alimentos");

INSERT INTO users (id, email, password)
VALUES 
("u006", "bina@bmail.com", "senha135");

SELECT * FROM products
WHERE id = "p004";

DELETE FROM users 
WHERE id = "u006";

DELETE FROM products 
WHERE id = "p007";

UPDATE users
SET password = "farinhaDeMilho"
WHERE id = "u003";

UPDATE products
SET price = 7
WHERE id = "p008";

SELECT * FROM users
ORDER BY email ASC;

SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 1;

SELECT * FROM products
WHERE price < 20 AND price > 5
ORDER BY price ASC;

CREATE TABLE purchases (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  total_price REAL NOT NULL,
  paid INTERGER NOT NULL,
  delivered_at TEXT,
  buyer_id TEXT NOT NULL,
  FOREIGN KEY (buyer_id) REFERENCES users(id)
);

INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
("c001", 8.5, 0, "u003"),
("c002", 6.25, 0, "u003"),
("c003", 7, 0, "u004"),
("c004", 48, 0, "u004"),
("c005", 7, 0, "u005"),
("c006", 8.5, 0, "u005");

UPDATE purchases
SET delivered_at = "2023-02-13 18:01"
WHERE id = "c001";

SELECT * FROM purchases;

SELECT * FROM users
INNER JOIN purchases
ON users.id = purchases.buyer_id;

SELECT * FROM products
INNER JOIN purchases;

CREATE TABLE purchases_products (
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (purchase_id) REFERENCES purchases(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES 
("c001", "p003", 1),
("c001", "p005", 1),
("c001", "p006", 1),
("c001", "p004", 1),
("c001", "p006", 1),
("c001", "p003", 1);

SELECT 
purchases.id AS purchase_id,
purchases.total_price,
purchases.paid, 
purchases.delivered_at,
purchases.buyer_id,
purchases_products.product_id,
purchases_products.purchase_id,
purchases_products.quantity,
products.name AS product_name,
products.price AS product_price,
products.category 
FROM purchases_products
INNER JOIN products
ON purchases_products.product_id = products.id
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id;

