CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    productid VARCHAR(50),
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL
);