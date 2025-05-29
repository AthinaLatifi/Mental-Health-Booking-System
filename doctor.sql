-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 29, 2025 at 11:50 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doctor`
--

-- --------------------------------------------------------

--
-- Table structure for table `absence`
--

DROP TABLE IF EXISTS `absence`;
CREATE TABLE IF NOT EXISTS `absence` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doc_id` int NOT NULL,
  `from_date` varchar(10) NOT NULL,
  `to_date` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `doc_id` (`doc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `absence`
--

INSERT INTO `absence` (`id`, `doc_id`, `from_date`, `to_date`) VALUES
(1, 13, '2025-04-30', '2025-05-03'),
(2, 13, '2025-05-04', '2025-05-10'),
(3, 13, '2025-05-11', '2025-05-17'),
(4, 13, '2025-05-11', '2025-05-17'),
(5, 13, '2025-05-25', '2025-05-27');

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
CREATE TABLE IF NOT EXISTS `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doc_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `on_date` varchar(10) NOT NULL,
  `on_time` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `doc_id` (`doc_id`,`patient_id`),
  KEY `patient_id` (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `doc_id`, `patient_id`, `on_date`, `on_time`) VALUES
(1, 13, 1, '2025-05-20', '09:00'),
(2, 13, 2, '2025-05-20', '10:00'),
(3, 13, 2, '2025-05-31', '10:00'),
(5, 13, 1, '2025-05-21', '10:00'),
(18, 13, 1, '2025-05-28', '10:00'),
(19, 13, 1, '2025-06-01', '09:00'),
(20, 14, 2, '2025-06-01', '10:00'),
(21, 15, 10, '2025-06-02', '09:30'),
(22, 16, 11, '2025-06-02', '11:00'),
(23, 17, 12, '2025-06-03', '08:45'),
(24, 18, 13, '2025-06-04', '10:15'),
(25, 19, 14, '2025-06-04', '11:45'),
(26, 20, 1, '2025-06-05', '09:00'),
(27, 13, 2, '2025-06-06', '10:30'),
(28, 14, 10, '2025-06-06', '14:00'),
(29, 15, 11, '2025-06-07', '08:00'),
(30, 16, 12, '2025-06-07', '09:15'),
(31, 17, 13, '2025-06-07', '10:45'),
(32, 18, 14, '2025-06-08', '11:00'),
(33, 19, 1, '2025-06-09', '12:30'),
(34, 20, 2, '2025-06-10', '13:00'),
(35, 13, 10, '2025-06-10', '14:30'),
(36, 14, 11, '2025-06-11', '09:30'),
(37, 15, 12, '2025-06-12', '11:00'),
(38, 16, 13, '2025-06-12', '15:00');

-- --------------------------------------------------------

--
-- Table structure for table `doc`
--

DROP TABLE IF EXISTS `doc`;
CREATE TABLE IF NOT EXISTS `doc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `location` varchar(255) NOT NULL,
  `speciality` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `doc`
--

INSERT INTO `doc` (`id`, `full_name`, `email`, `password`, `telephone`, `location`, `speciality`) VALUES
(13, 'Dr. Maria ', 'maria@gmail.com', 'maria123', '0735664703', 'Vasgatan 66, Stockholm', 'Insomnia'),
(14, 'babis', 'baBIS@gmail.com', 'BABIS123', '0735664703', 'Vasgatan 66, Stockholm', 'Insomnia'),
(15, 'Dr. John Smith', 'john.smith@example.com', 'password1', '1234567890', 'New York', 'Anxiety'),
(16, 'Dr. Emily Carter', 'emily.carter@example.com', 'password2', '0987654321', 'Los Angeles', 'Anxiety'),
(17, 'Dr. Amina Patel', 'amina.patel@example.com', 'password3', '5551234567', 'Chicago', 'Anxiety'),
(18, 'Dr. Marcus Lee', 'marcus.lee@example.com', 'hashed_password4', '2125557890', 'San Francisco', 'Stress'),
(19, 'Dr. Sofia Alvarez', 'sofia.alvarez@example.com', 'hashed_password5', '3054441234', 'Miami', 'Stress'),
(20, 'Dr. Yusuf Khan', 'yusuf.khan@example.com', 'hashed_password6', '7133339876', 'Houston', 'Emotional Damage');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
CREATE TABLE IF NOT EXISTS `patient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `full_name`, `email`, `password`, `telephone`) VALUES
(1, 'Athina Latifi', 'athinalatifi@gmail.com', 'athins123', '0735664703'),
(2, 'Stavros sirbopoulos', 'stavros@gmail.com', 'stavros123', '0736558024'),
(10, 'Alice Johnson', 'alice.johnson@example.com', 'hashed_password1', '123-456-7890'),
(11, 'Brian Smith', 'brian.smith@example.com', 'hashed_password2', '234-567-8901'),
(12, 'Carla Mendes', 'carla.mendes@example.com', 'hashed_password3', '345-678-9012'),
(13, 'Daniel Cho', 'daniel.cho@example.com', 'hashed_password4', '456-789-0123'),
(14, 'Eva Stein', 'eva.stein@example.com', 'hashed_password5', '567-890-1234');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `absence`
--
ALTER TABLE `absence`
  ADD CONSTRAINT `absence_ibfk_1` FOREIGN KEY (`doc_id`) REFERENCES `doc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`doc_id`) REFERENCES `doc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
