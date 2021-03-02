-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 02, 2021 at 08:40 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `template`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_account_tbl`
--

CREATE TABLE `user_account_tbl` (
  `userAccountID` bigint(20) NOT NULL,
  `role` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `telephone` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `gender` varchar(20) NOT NULL,
  `birthday` date NOT NULL,
  `link` text NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `skills` text DEFAULT NULL,
  `file` text DEFAULT NULL,
  `status` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_account_tbl`
--

INSERT INTO `user_account_tbl` (`userAccountID`, `role`, `firstname`, `lastname`, `email`, `mobile`, `telephone`, `address`, `gender`, `birthday`, `link`, `username`, `password`, `amount`, `skills`, `file`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'Ako To Si', 'Natoy', 'rjpinca@gmail.com', '(+63) 099 0908 595', '(32) 1321 423', '1709 Antel Bldg, Julia Vargas', 'Male', '2021-02-03', 'http://theblackcoders.com', 'rjpinca', 'rjpinca', '0.00', '', '01614667776.svg', 0, '2021-02-26 05:19:00', '2021-03-02 06:49:36'),
(2, 'Operations', 'Akosi', 'RJ', 'hakdog123@gmail.com', '(+63) 545 8987 987', '(54) 6545 646', '1709 Antel Bldg, Julia Vargas', 'Male', '2021-03-05', 'http://theblackcoders.com', 'hakdog123', 'hakdog123', '999.95', 'CSS|JS', '01614668556.svg|11614668556.svg|21614668556.svg|31614668556.svg|41614668556.svg|51614668556.svg', 1, '2021-02-26 05:25:07', '2021-03-02 07:02:36'),
(9, 'Admin', 'Charles', 'Vincent', 'charlesvincent@gmail.com', '(+63) 123 2141 242', '(53) 2432 423', 'Quezon City', 'Male', '2021-03-09', 'http://theblackcoders.com', 'charles', 'charles', '0.00', 'CSS|HTML|JS', '01614668026.svg|11614668026.svg|21614668026.svg|31614668026.svg|41614668026.svg|51614668026.svg', 1, '2021-03-02 06:52:07', '2021-03-02 06:53:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_account_tbl`
--
ALTER TABLE `user_account_tbl`
  ADD PRIMARY KEY (`userAccountID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_account_tbl`
--
ALTER TABLE `user_account_tbl`
  MODIFY `userAccountID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
