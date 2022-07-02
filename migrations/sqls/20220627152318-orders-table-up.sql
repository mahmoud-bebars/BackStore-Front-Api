CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    orderid VARCHAR(50),
    quantity integer,
    status VARCHAR(15),
    userid integer REFERENCES users(id)
);