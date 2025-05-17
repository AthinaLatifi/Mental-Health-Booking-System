-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 13, 2025 at 10:56 PM
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `absence`
--

INSERT INTO `absence` (`id`, `doc_id`, `from_date`, `to_date`) VALUES
(1, 13, '2025-04-30', '2025-05-03'),
(2, 13, '2025-05-04', '2025-05-10'),
(3, 13, '2025-05-11', '2025-05-17'),
(4, 13, '2025-05-11', '2025-05-17');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `doc_id`, `patient_id`, `on_date`, `on_time`) VALUES
(1, 13, 1, '2025-05-20', '09:00'),
(2, 13, 2, '2025-05-20', '10:00'),
(3, 13, 2, '2025-05-31', '10:00'),
(5, 13, 1, '2025-05-21', '10:00'),
(7, 13, 2, '2025-05-21', '10:00');

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
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `doc`
--

INSERT INTO `doc` (`id`, `full_name`, `email`, `password`, `telephone`, `location`, `speciality`, `type`) VALUES
(13, 'Maria', 'maria@gmail.com', 'maria123', '0735664703', 'Vasgatan 66, Stockholm', 'Insomnia', 'Both'),
(14, 'babis', 'baBIS@gmail.com', 'BABIS123', '0735664703', 'Vasgatan 66, Stockholm', 'Insomnia', 'Both'),
(15, 'Dr. John Smith', 'john.smith@example.com', 'password1', '1234567890', 'New York', 'Anxiety', 'Online'),
(16, 'Dr. Emily Carter', 'emily.carter@example.com', 'password2', '0987654321', 'Los Angeles', 'Anxiety', 'On Site'),
(17, 'Dr. Amina Patel', 'amina.patel@example.com', 'password3', '5551234567', 'Chicago', 'Anxiety', 'On Site'),
(18, 'Dr. Marcus Lee', 'marcus.lee@example.com', 'hashed_password4', '2125557890', 'San Francisco', 'Stress', 'Both'),
(19, 'Dr. Sofia Alvarez', 'sofia.alvarez@example.com', 'hashed_password5', '3054441234', 'Miami', 'Stress', 'On Site'),
(20, 'Dr. Yusuf Khan', 'yusuf.khan@example.com', 'hashed_password6', '7133339876', 'Houston', 'Emotional Damage', 'Both');

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
  `test` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `full_name`, `email`, `password`, `telephone`, `test`) VALUES
(1, 'Athina Latifi', 'athinalatifi@gmail.com', 'athins123', '0735664703', 'no'),
(2, 'Stavros sirbopoulos', 'stavros@gmail.com', 'stavros123', '0736558024', 'yes');

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
