CREATE DATABASE product_db;

USE product_db;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `update_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `price` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `products` (`id`, `name`, `title`, `brand`, `image`, `category`, `update_time`, `price`) VALUES
(1, 'Classic Watch', 'Elegant analog watch', 'BrandA', '/images/classic_watch.jpg', 'Analog', '2024-11-26 03:43:44', 199.99),
(2, 'Smart Watch', 'Feature-rich smartwatch', 'BrandB', '/images/smart_watch.jpg', 'Digital', '2024-11-26 03:43:44', 299.99),
(3, 'Luxury Watch', 'Premium designer watch', 'BrandC', '/images/luxury_watch.jpg', 'Analog', '2024-11-26 03:43:44', 499.99),
(4, 'Fitness Tracker', 'Track your workouts', 'BrandD', '/images/fitness_tracker.jpg', 'Digital', '2024-11-26 03:43:44', 149.99),
(5, 'Sport Watch', 'Durable and stylish', 'BrandE', '/images/sport_watch.jpg', 'Analog', '2024-11-26 03:43:44', 249.99);
