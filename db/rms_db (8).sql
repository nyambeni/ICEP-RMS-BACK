-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 20, 2020 at 08:04 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rms_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `landlord`
--

CREATE TABLE `landlord` (
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `id_no` int(13) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cell` int(10) NOT NULL,
  `campus_loc` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `landlord`
--

INSERT INTO `landlord` (`fname`, `lname`, `id_no`, `email`, `cell`, `campus_loc`, `title`, `pwd`) VALUES
('themba', '0', 2147483647, 'thembaantuli@gmail.com', 835113602, 'Soshanguve South', 'Mr', ''),
('themba', 'ntuli', 2147483647, 'thembaantuli@gmail.com', 835113602, 'Soshanguve South', 'Mr', 'gsjhkjlkjh55'),
('thembaa', 'ntuli', 2147483647, 'thembaantuli@gmail.com', 835113602, 'Soshanguve South', 'Mr', 'gsjhkjlkjh55'),
('nuno', 'mathe', 2147483647, 'ny@gmail.com', 826879542, 'Soshangve', 'MS', '78925'),
('nuno', 'mathe', 2147483647, 'ny@gmail.com', 826879542, 'Soshangve', 'MS', '78925'),
('nuno', 'mathe', 2147483647, 'ny@gmail.com', 826879542, 'Soshangve', 'MS', '78925'),
('nuno', 'mathe', 2147483647, 'ny@gmail.com', 826879542, 'Soshangve', 'MS', '78925'),
('nuno', 'mathe', 2147483647, 'ny@gmail.com', 826879542, 'Soshangve', 'MS', '78925'),
('nuno', 'mathe', 2147483647, 'ny@gmail.com', 826879542, 'Soshangve', 'MS', '78925'),
('nuno', 'mathe', 2147483647, 'ny@gmail.com', 826879542, 'Soshangve', 'MS', '78925'),
('nuno', 'mathe', 2147483647, 'ny@gmail.com', 826879542, 'Soshangve', 'MS', '78925'),
('nuno', 'mathe', 2147483647, 'ny@gmail.com', 826879542, 'Soshangve', 'MS', '78925'),
('', 'mathe', 2147483647, 'ny@gmail.com', 826879542, 'Soshangve', 'MS', '78925'),
('', 'mathe', 2147483647, 'ny@gmail.com', 826879542, 'Soshangve', 'MS', '78925'),
('', ' jhyugkj', 2147483647, 'kjlijjk,', 2145055414, 'E', 'b', 'dryutytuu');

-- --------------------------------------------------------

--
-- Table structure for table `lord`
--

CREATE TABLE `lord` (
  `reg_proof` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lord`
--

INSERT INTO `lord` (`reg_proof`) VALUES
('uploadID.pdf'),
('uploadCV.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `firstName` longtext DEFAULT NULL,
  `lastName` longtext DEFAULT NULL,
  `email` longtext DEFAULT NULL,
  `password` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `firstName`, `lastName`, `email`, `password`) VALUES
(2, 'ntombi', 'Baloyi', 'nto@gmail.com', '6789'),
(3, 'Rose', 'Mathebula', 'mama@gmail.co.za', '6666'),
(4, 'Thomas', 'Mathebula', 'papa@gmail.co.za', '6622'),
(5, 'Sara', 'Baloyi', 'gra@gmail.co.za', '5522'),
(6, 'Fortune', 'Ntimana', 'fort@gmail.co.za', '8991'),
(7, 'Sam', 'Maceke', 'sams@gmail.com', ''),
(9, 'hojo', 'kula', 'ks@gmail.com', '7833'),
(10, 'pinky', 'muko', 'mus@gmail.com', '9833'),
(11, 'thuli', 'mawe', 'nina@gmail.com', '1234'),
(18, 'thuni', 'mhawe', 'na@gmail.com', '1288'),
(28, 'sanele', 'mbombi', 'mb@gmail.com', '8741'),
(29, 'joko', 'gogo', '', '4752');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
