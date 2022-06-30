CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    orderid VARCHAR(50),
    quantity integer,
    status VARCHAR(15),
    productid integer REFERENCES products(id),
    userid integer REFERENCES users(id)
);