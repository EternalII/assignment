CREATE DATABASE connect_db;
USE connect_db;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE item_volumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    value JSON,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

INSERT INTO categories (name) VALUES 
('Electronics'),
('Furniture'),
('Books'),
('Clothing'),
('Toys');

INSERT INTO items (name, category_id) VALUES 
('Smartphone', 1),
('Laptop', 1),
('Sofa', 2),
('Dining Table', 2),
('Novel', 3),
('Textbook', 3),
('T-Shirt', 4),
('Jeans', 4),
('Action Figure', 5),
('Doll', 5);

INSERT INTO item_volumes (item_id, value) VALUES 
(1, '{"value": "50 כניסות", "price": 20}'),
(1, '{"value": "30 חודשים", "price": 10}'),
(2, '{"value": "20 כניסות", "price": 5}'),
(2, '{"value": "15 חודשים", "price": 8}'),
(3, '{"value": "10 כניסות", "price": 3}'),
(3, '{"value": "5 חודשים", "price": 1}'),
(4, '{"value": "8 כניסות", "price": 4}'),
(4, '{"value": "12 חודשים", "price": 6}'),
(5, '{"value": "100 כניסות", "price": 40}'),
(5, '{"value": "60 חודשים", "price": 25}'),
(6, '{"value": "40 חודשים", "price": 10}'),
(6, '{"value": "25 כניסות", "price": 5}'),
(7, '{"value": "200 חודשים", "price": 80}'),
(7, '{"value": "150 כניסות", "price": 60}'),
(8, '{"value": "120 חודשים", "price": 40}'),
(8, '{"value": "80 כניסות", "price": 30}'),
(9, '{"value": "70 חודשים", "price": 25}'),
(9, '{"value": "40 כניסות", "price": 15}'),
(10, '{"value": "50 חודשים", "price": 20}'),
(10, '{"value": "30 כניסות", "price": 10}');