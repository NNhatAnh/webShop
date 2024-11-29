-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3307
-- Thời gian đã tạo: Th10 26, 2024 lúc 04:19 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `watchshop`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_item`
--

CREATE TABLE `order_item` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_item`
--

INSERT INTO `order_item` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 1, 2, 75.00),
(2, 1, 2, 1, 150.00),
(3, 2, 3, 1, 300.00),
(4, 3, 4, 2, 150.00),
(5, 4, 5, 3, 450.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_list`
--

CREATE TABLE `order_list` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` enum('pending','completed','cancelled') DEFAULT 'pending',
  `total_price` decimal(10,2) DEFAULT NULL,
  `time_order` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_list`
--

INSERT INTO `order_list` (`id`, `user_id`, `status`, `total_price`, `time_order`) VALUES
(1, 1, 'pending', 150.00, '2024-11-26 02:43:47'),
(2, 2, 'completed', 300.00, '2024-11-26 02:43:47'),
(3, 3, 'cancelled', 75.00, '2024-11-26 02:43:47'),
(4, 4, 'completed', 450.00, '2024-11-26 02:43:47');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `update_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `title`, `brand`, `quantity`, `image`, `category`, `update_time`) VALUES
(1, 'Classic Watch', 'Elegant analog watch', 'BrandA', 50, '/images/classic_watch.jpg', 'Analog', '2024-11-26 03:43:44'),
(2, 'Smart Watch', 'Feature-rich smartwatch', 'BrandB', 30, '/images/smart_watch.jpg', 'Digital', '2024-11-26 03:43:44'),
(3, 'Luxury Watch', 'Premium designer watch', 'BrandC', 15, '/images/luxury_watch.jpg', 'Analog', '2024-11-26 03:43:44'),
(4, 'Fitness Tracker', 'Track your workouts', 'BrandD', 100, '/images/fitness_tracker.jpg', 'Digital', '2024-11-26 03:43:44'),
(5, 'Sport Watch', 'Durable and stylish', 'BrandE', 25, '/images/sport_watch.jpg', 'Analog', '2024-11-26 03:43:44');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `rating` tinyint(1) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `update_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `product_id`, `rating`, `comment`, `update_time`) VALUES
(1, 1, 1, 5, 'Excellent watch, highly recommend!', '2024-11-26 02:44:09'),
(2, 2, 2, 4, 'Very functional but a bit pricey.', '2024-11-26 02:44:09'),
(3, 3, 3, 5, 'Absolutely love the design and quality!', '2024-11-26 02:44:09'),
(4, 4, 4, 3, 'Good for workouts but the battery could be better.', '2024-11-26 02:44:09'),
(5, 1, 5, 4, 'Stylish and durable, perfect for sports!', '2024-11-26 02:44:09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `phone`, `address`, `role`, `create_date`) VALUES
(1, 'JohnDoe', 'john.doe@example.com', 'password123', '1234567890', '123 Watch St.', 'user', '2024-11-26 02:43:01'),
(2, 'JaneSmith', 'jane.smith@example.com', 'securepass', '0987654321', '456 Elegant Ave.', 'admin', '2024-11-26 02:43:01'),
(3, 'MikeBrown', 'mike.brown@example.com', 'mypassword', '1122334455', '789 Luxury Ln.', 'user', '2024-11-26 02:43:01'),
(4, 'AliceGreen', 'alice.green@example.com', 'alice1234', '6677889900', '101 Premium Blvd.', 'user', '2024-11-26 02:43:01');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderID` (`order_id`),
  ADD KEY `productID` (`product_id`);

--
-- Chỉ mục cho bảng `order_list`
--
ALTER TABLE `order_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`user_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`user_id`),
  ADD KEY `productID` (`product_id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `order_list`
--
ALTER TABLE `order_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_list` (`id`),
  ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `order_list`
--
ALTER TABLE `order_list`
  ADD CONSTRAINT `order_list_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
