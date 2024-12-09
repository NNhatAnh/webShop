CREATE DATABASE IF NOT EXISTS user_db;

USE user_db;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
(1, 'admin', 'admin@example.com', '$2a$10$T6yNALSba.2o/VP/OPDJJ.z0UXaGPP/aDLgg7bgS1NtcEBdRjEyYe', NULL, NULL, 'admin', '2024-11-26 02:43:01');
