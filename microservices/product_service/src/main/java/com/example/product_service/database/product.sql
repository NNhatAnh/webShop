-- Cơ sở dữ liệu: `product`
CREATE DATABASE product_db;

USE product_db;

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `update_time` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `products` (`id`, `name`, `title`, `brand`, `quantity`, `image`, `category`, `update_time`) VALUES
(1, 'Classic Watch', 'Elegant analog watch', 'BrandA', 50, '/images/classic_watch.jpg', 'Analog', '2024-11-26 03:43:44'),
(2, 'Smart Watch', 'Feature-rich smartwatch', 'BrandB', 30, '/images/smart_watch.jpg', 'Digital', '2024-11-26 03:43:44'),
(3, 'Luxury Watch', 'Premium designer watch', 'BrandC', 15, '/images/luxury_watch.jpg', 'Analog', '2024-11-26 03:43:44'),
(4, 'Fitness Tracker', 'Track your workouts', 'BrandD', 100, '/images/fitness_tracker.jpg', 'Digital', '2024-11-26 03:43:44'),
(5, 'Sport Watch', 'Durable and stylish', 'BrandE', 25, '/images/sport_watch.jpg', 'Analog', '2024-11-26 03:43:44');
