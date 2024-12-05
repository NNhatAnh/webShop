-- Cơ sở dữ liệu: `order`
CREATE DATABASE IF NOT EXISTS order_db;

USE order_db;

CREATE TABLE `order_list` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` enum('pending','completed','cancelled') DEFAULT 'pending',
  `total_price` decimal(10,2) DEFAULT NULL,
  `time_order` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `order_item` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orderID` (`order_id`),
  KEY `productID` (`product_id`),
  FOREIGN KEY (`order_id`) REFERENCES `order_list` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `order_list` (`id`, `user_id`, `status`, `total_price`, `time_order`) VALUES
(1, 1, 'pending', 150.00, '2024-11-26 02:43:47'),
(2, 2, 'completed', 300.00, '2024-11-26 02:43:47'),
(3, 3, 'cancelled', 75.00, '2024-11-26 02:43:47'),
(4, 4, 'completed', 450.00, '2024-11-26 02:43:47');

INSERT INTO `order_item` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 1, 2, 75.00),
(2, 1, 2, 1, 150.00),
(3, 2, 3, 1, 300.00),
(4, 3, 4, 2, 150.00),
(5, 4, 5, 3, 450.00);
