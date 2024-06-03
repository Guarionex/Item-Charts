DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS product_tags;
DROP TABLE IF EXISTS product_details;
DROP TABLE IF EXISTS products;

CREATE TABLE products
(
    id       VARCHAR(255) PRIMARY KEY,
    title    VARCHAR(255),
    image    VARCHAR(255),
    subtitle VARCHAR(255),
    brand    VARCHAR(255),
    retailer VARCHAR(255)
);

CREATE TABLE reviews
(
    id         SERIAL PRIMARY KEY,
    customer   VARCHAR(255),
    review     TEXT,
    score      INT,
    product_id VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE sales
(
    id             SERIAL PRIMARY KEY,
    weekEnding     DATE,
    retailSales    INT,
    wholesaleSales INT DEFAULT 0,
    unitsSold      INT,
    retailerMargin INT,
    product_id     VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE product_details
(
    id         SERIAL PRIMARY KEY,
    detail     TEXT,
    product_id VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE product_tags
(
    id         SERIAL PRIMARY KEY,
    tag        VARCHAR(255),
    product_id VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES products (id)
);
