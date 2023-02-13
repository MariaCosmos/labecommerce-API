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




