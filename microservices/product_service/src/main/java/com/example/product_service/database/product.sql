CREATE DATABASE IF NOT EXISTS product_db;
USE product_db;

CREATE TABLE `products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) DEFAULT NULL,
  `title` VARCHAR(255) DEFAULT NULL,
  `brand` VARCHAR(255) DEFAULT NULL,
  `image` VARCHAR(255) DEFAULT NULL,
  `category` VARCHAR(255) DEFAULT NULL,
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `price` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `is_deleted` BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `products` (`id`, `name`, `title`, `brand`, `image`, `category`, `update_time`, `price`, `is_deleted`) VALUES
(1, 'Classic Watch', 'Elegant analog watch', 'BrandA', '/images/classic_watch.jpg', 'Analog', '2024-11-26 03:43:44', 199.99, FALSE),
(2, 'Smart Watch', 'Feature-rich smartwatch', 'BrandB', '/images/smart_watch.jpg', 'Digital', '2024-11-26 03:43:44', 299.99, FALSE),
(3, 'Luxury Watch', 'Premium designer watch', 'BrandC', '/images/luxury_watch.jpg', 'Analog', '2024-11-26 03:43:44', 499.99, FALSE),
(4, 'Fitness Tracker', 'Track your workouts', 'BrandD', '/images/fitness_tracker.jpg', 'Digital', '2024-11-26 03:43:44', 149.99, FALSE),
(5, 'Sport Watch', 'Durable and stylish', 'BrandE', '/images/sport_watch.jpg', 'Analog', '2024-11-26 03:43:44', 249.99, FALSE);