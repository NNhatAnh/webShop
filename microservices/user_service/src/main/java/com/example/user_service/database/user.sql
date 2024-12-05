CREATE DATABASE IF NOT EXISTS user_db;

USE user_db;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `user` (`id`, `username`, `email`, `password`, `phone`, `address`, `role`, `create_date`) VALUES
(1, 'JohnDoe', 'john.doe@example.com', 'password123', '1234567890', '123 Watch St.', 'user', '2024-11-26 02:43:01'),
(2, 'JaneSmith', 'jane.smith@example.com', 'securepass', '0987654321', '456 Elegant Ave.', 'admin', '2024-11-26 02:43:01'),
(3, 'MikeBrown', 'mike.brown@example.com', 'mypassword', '1122334455', '789 Luxury Ln.', 'user', '2024-11-26 02:43:01'),
(4, 'AliceGreen', 'alice.green@example.com', 'alice1234', '6677889900', '101 Premium Blvd.', 'user', '2024-11-26 02:43:01');
