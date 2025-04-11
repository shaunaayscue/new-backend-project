CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_type VARCHAR(10) CHECK(user_type IN ('admin', 'shopper')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Categories (
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name VARCHAR(255) UNIQUE NOT NULL, 
    priority INTEGER DEFAULT 0
);

CREATE TABLE Products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(2048) NOT NULL,
    price REAL NOT NULL,
    isbn VARCHAR(20) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category_id INTEGER NOT NULL,
    pages INTEGER NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    featured INTEGER DEFAULT 0 CHECK (featured IN (0, 1)),
    trending INTEGER DEFAULT 0 CHECK (trending IN (0, 1)),
    new_release INTEGER DEFAULT 0 CHECK (new_release IN (0, 1)),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Carts (
    cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_status VARCHAR(10) NOT NULL CHECK(cart_status IN ('new', 'abandoned', 'purchased')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
CREATE TABLE CartProducts (
    cart_product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    FOREIGN KEY (cart_id) REFERENCES carts (cart_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE CASCADE
);