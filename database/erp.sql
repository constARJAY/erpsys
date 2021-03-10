-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2021 at 03:26 AM
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
-- Database: `erp`
--

-- --------------------------------------------------------

--
-- Table structure for table `gen_approval_tbl`
--

CREATE TABLE `gen_approval_tbl` (
  `approvalID` bigint(20) NOT NULL,
  `moduleID` bigint(20) NOT NULL,
  `approvalUserAccounts` text NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gen_approval_tbl`
--

INSERT INTO `gen_approval_tbl` (`approvalID`, `moduleID`, `approvalUserAccounts`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(5, 1, '2|1|9', 1, 1, '2021-03-05', '2021-03-07 17:56:44'),
(6, 6, '9|1|2', 1, 1, '2021-03-05', '2021-03-07 22:01:19'),
(7, 9, '1|2|9', 1, 1, '2021-03-08', '2021-03-08 07:07:41');

-- --------------------------------------------------------

--
-- Table structure for table `gen_module_list_tbl`
--

CREATE TABLE `gen_module_list_tbl` (
  `moduleID` bigint(20) NOT NULL,
  `projectName` text NOT NULL,
  `moduleHeader` varchar(100) NOT NULL,
  `moduleCategory` varchar(100) DEFAULT NULL,
  `moduleName` varchar(100) NOT NULL,
  `moduleIcon` text DEFAULT NULL,
  `moduleApprover` int(11) DEFAULT NULL,
  `moduleMaxApprover` int(11) DEFAULT NULL,
  `moduleStatus` int(11) NOT NULL,
  `moduleController` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gen_module_list_tbl`
--

INSERT INTO `gen_module_list_tbl` (`moduleID`, `projectName`, `moduleHeader`, `moduleCategory`, `moduleName`, `moduleIcon`, `moduleApprover`, `moduleMaxApprover`, `moduleStatus`, `moduleController`, `createdAt`, `updatedAt`) VALUES
(2, 'Human Resources Information System', 'Main', 'Dashboard', 'HRIS Dashboard', '01615184334.svg', 0, 0, 1, 'Dashboard', '2021-03-08 06:18:38', '2021-03-08 06:18:54'),
(3, 'Project Management System', 'Main', 'Dashboard', 'PMS Dashboard', '01615184384.svg', 0, 0, 1, 'Pms_dashboard', '2021-03-08 06:19:44', '2021-03-08 06:19:44'),
(4, 'Inventory Management System', 'Main', 'Dashboard', 'IMS Dashboard', '01615184500.svg', 0, 0, 1, 'Ims_dashboard', '2021-03-08 06:21:40', '2021-03-08 06:21:40'),
(5, 'Finance Management System', 'Main', 'Dashboard', 'FMS Dashboard', '01615184531.ico', 0, 0, 1, 'Fms_dashboard', '2021-03-08 06:22:11', '2021-03-08 06:22:11'),
(6, 'Human Resources Information System|Project Management System|Inventory Management System|Finance Management System', 'Management', 'Management', 'Notification Management', '01615184673.ico', 0, 0, 1, 'Notification_management', '2021-03-08 06:24:33', '2021-03-08 06:24:33'),
(7, 'Human Resources Information System|Project Management System|Inventory Management System|Finance Management System', 'Forms', 'Masterfile', 'User Account', '01615184751.svg', 0, 0, 1, 'User_account', '2021-03-08 06:25:51', '2021-03-08 06:25:51'),
(8, 'Human Resources Information System|Project Management System|Inventory Management System|Finance Management System', 'Reports', 'Reports', 'Employee Report', '01615185245.svg', 0, 0, 1, 'Employee_report', '2021-03-08 06:34:05', '2021-03-08 06:34:05'),
(9, 'Inventory Management System', 'Forms', 'Purchase', 'Purchase Request', NULL, 1, 3, 1, 'Purchase_request', '2021-03-08 07:01:40', '2021-03-08 07:01:40'),
(10, 'Human Resources Information System|Project Management System|Finance Management System', 'Settings', 'System Settings', 'Approval Setup', '01615187068.ico', 0, 0, 1, 'Approval_setup', '2021-03-08 07:04:28', '2021-03-08 08:02:29'),
(11, 'Human Resources Information System|Project Management System|Inventory Management System|Finance Management System', 'Settings', 'System Settings', 'Roles and Permission', '01615187542.svg', 0, 0, 1, 'Roles_permission', '2021-03-08 07:12:22', '2021-03-08 07:12:22');

-- --------------------------------------------------------

--
-- Table structure for table `gen_operations_tbl`
--

CREATE TABLE `gen_operations_tbl` (
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
  `userType` bigint(20) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gen_operations_tbl`
--

INSERT INTO `gen_operations_tbl` (`userAccountID`, `role`, `firstname`, `lastname`, `email`, `mobile`, `telephone`, `address`, `gender`, `birthday`, `link`, `username`, `password`, `amount`, `skills`, `file`, `userType`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'Ako To Si', 'Natoy', 'rjpinca@gmail.com', '(+63) 099 0908 595', '(32) 1321 423', '1709 Antel Bldg, Julia Vargas', 'Male', '2021-02-03', 'http://theblackcoders.com', 'rjpinca', 'rjpinca', '0.00', 'CSS|HTML|JS', '01614670888.svg|11614670888.svg|21614670888.svg|31614670888.svg', 0, 0, '2021-02-26 05:19:00', '2021-03-02 07:41:28'),
(2, 'Operations', 'Akosi', 'RJ', 'hakdog123@gmail.com', '(+63) 545 8987 987', '(54) 6545 646', '1709 Antel Bldg, Julia Vargas', 'Male', '2021-03-05', 'http://theblackcoders.com', 'hakdog123', 'hakdog123', '999.95', 'CSS|JS', '01614668556.svg|11614668556.svg|21614668556.svg|31614668556.svg|41614668556.svg|51614668556.svg', 0, 1, '2021-02-26 05:25:07', '2021-03-02 07:02:36'),
(9, 'Admin', 'Charles', 'Vincent', 'charlesvincent@gmail.com', '(+63) 123 2141 242', '(53) 2432 423', 'Quezon City', 'Male', '2021-03-09', 'http://theblackcoders.com', 'charles', 'charles', '0.00', 'CSS|HTML|JS', '01614668026.svg|11614668026.svg|21614668026.svg|31614668026.svg|41614668026.svg|51614668026.svg', 0, 1, '2021-03-02 06:52:07', '2021-03-02 06:53:46');

-- --------------------------------------------------------

--
-- Table structure for table `gen_roles_permission_tbl`
--

CREATE TABLE `gen_roles_permission_tbl` (
  `permissionID` bigint(20) NOT NULL,
  `roleID` bigint(20) NOT NULL,
  `moduleID` bigint(20) NOT NULL,
  `permissionStatus` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gen_roles_permission_tbl`
--

INSERT INTO `gen_roles_permission_tbl` (`permissionID`, `roleID`, `moduleID`, `permissionStatus`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, 1, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(2, 1, 3, 1, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(3, 1, 4, 1, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(4, 1, 5, 1, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(5, 1, 6, 1, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(6, 1, 7, 1, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(7, 1, 8, 1, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(8, 1, 9, 1, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(9, 1, 10, 1, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(10, 2, 2, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(11, 2, 3, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(12, 2, 4, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(13, 2, 5, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(14, 2, 6, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(15, 2, 7, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(16, 2, 8, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(17, 2, 9, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(18, 2, 10, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(19, 3, 2, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(20, 3, 3, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(21, 3, 4, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(22, 3, 5, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(23, 3, 6, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(24, 3, 7, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(25, 3, 8, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(26, 3, 9, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(27, 3, 10, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(28, 4, 2, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(29, 4, 3, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(30, 4, 4, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(31, 4, 5, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(32, 4, 6, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(33, 4, 7, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(34, 4, 8, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(35, 4, 9, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(36, 4, 10, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(37, 5, 2, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(38, 5, 3, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(39, 5, 4, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(40, 5, 5, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(41, 5, 6, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(42, 5, 7, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(43, 5, 8, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(44, 5, 9, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(45, 5, 10, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(46, 6, 2, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(47, 6, 3, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(48, 6, 4, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(49, 6, 5, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(50, 6, 6, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(51, 6, 7, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(52, 6, 8, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(53, 6, 9, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(54, 6, 10, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(55, 7, 2, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(56, 7, 3, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(57, 7, 4, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(58, 7, 5, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(59, 7, 6, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(60, 7, 7, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(61, 7, 8, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(62, 7, 9, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(63, 7, 10, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(64, 8, 2, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(65, 8, 3, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(66, 8, 4, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(67, 8, 5, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(68, 8, 6, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(69, 8, 7, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(70, 8, 8, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(71, 8, 9, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14'),
(72, 8, 10, 0, '2021-03-08 07:10:14', '2021-03-08 07:10:14');

-- --------------------------------------------------------

--
-- Table structure for table `gen_system_notification_tbl`
--

CREATE TABLE `gen_system_notification_tbl` (
  `notificationID` bigint(20) NOT NULL,
  `moduleID` bigint(20) NOT NULL,
  `notificationTitle` text NOT NULL,
  `notificationDescription` mediumtext NOT NULL,
  `notificationType` int(100) NOT NULL DEFAULT 2,
  `markRead` int(11) NOT NULL DEFAULT 0,
  `createdBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gen_system_notification_tbl`
--

INSERT INTO `gen_system_notification_tbl` (`notificationID`, `moduleID`, `notificationTitle`, `notificationDescription`, `notificationType`, `markRead`, `createdBy`, `createdAt`, `updatedAt`) VALUES
(1, 8, 'Inventory Item', 'Hammer - Low Stock', 1, 0, 1, '2021-03-09 05:31:59', '2021-03-09 06:31:24'),
(2, 5, 'Arjay Diangzon', 'Passed resignation letter', 2, 0, 1, '2021-03-09 05:33:20', '2021-03-09 06:11:14'),
(3, 3, 'Charles Verdadero', 'Extended Contract', 3, 0, 1, '2021-03-09 05:40:22', '2021-03-09 05:40:22'),
(6, 3, 'Joseph Berongoy', 'Extended Contract', 2, 0, 1, '2021-03-09 07:15:05', '2021-03-09 07:15:05');

-- --------------------------------------------------------

--
-- Table structure for table `gen_user_role_tbl`
--

CREATE TABLE `gen_user_role_tbl` (
  `roleID` bigint(20) NOT NULL,
  `roleName` varchar(100) NOT NULL,
  `roleStatus` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gen_user_role_tbl`
--

INSERT INTO `gen_user_role_tbl` (`roleID`, `roleName`, `roleStatus`, `createdAt`, `updatedAt`) VALUES
(1, 'Administrator', 1, '2021-03-08 00:29:00', '2021-03-08 00:44:40'),
(2, 'Network Engineer', 1, '2021-03-08 02:14:34', '2021-03-08 04:02:49'),
(3, 'Human Resources', 1, '2021-03-08 02:14:55', '2021-03-08 05:02:10'),
(4, 'Junior Developer', 0, '2021-03-08 03:17:38', '2021-03-08 03:17:38'),
(5, 'Senior Developer', 1, '2021-03-08 03:18:39', '2021-03-08 05:17:41'),
(6, 'Finance', 1, '2021-03-08 03:19:57', '2021-03-08 03:19:57'),
(7, 'Installer', 1, '2021-03-08 03:46:14', '2021-03-08 04:03:08'),
(8, 'IT Admin', 1, '2021-03-08 03:46:45', '2021-03-08 03:46:45'),
(9, 'Quality Analyst', 1, '2021-03-09 23:31:46', '2021-03-09 23:31:46'),
(10, 'Marketing', 1, '2021-03-09 23:33:00', '2021-03-09 23:33:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gen_approval_tbl`
--
ALTER TABLE `gen_approval_tbl`
  ADD PRIMARY KEY (`approvalID`);

--
-- Indexes for table `gen_module_list_tbl`
--
ALTER TABLE `gen_module_list_tbl`
  ADD PRIMARY KEY (`moduleID`);

--
-- Indexes for table `gen_operations_tbl`
--
ALTER TABLE `gen_operations_tbl`
  ADD PRIMARY KEY (`userAccountID`);

--
-- Indexes for table `gen_roles_permission_tbl`
--
ALTER TABLE `gen_roles_permission_tbl`
  ADD PRIMARY KEY (`permissionID`);

--
-- Indexes for table `gen_system_notification_tbl`
--
ALTER TABLE `gen_system_notification_tbl`
  ADD PRIMARY KEY (`notificationID`);

--
-- Indexes for table `gen_user_role_tbl`
--
ALTER TABLE `gen_user_role_tbl`
  ADD PRIMARY KEY (`roleID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gen_approval_tbl`
--
ALTER TABLE `gen_approval_tbl`
  MODIFY `approvalID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `gen_module_list_tbl`
--
ALTER TABLE `gen_module_list_tbl`
  MODIFY `moduleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `gen_operations_tbl`
--
ALTER TABLE `gen_operations_tbl`
  MODIFY `userAccountID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `gen_roles_permission_tbl`
--
ALTER TABLE `gen_roles_permission_tbl`
  MODIFY `permissionID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `gen_system_notification_tbl`
--
ALTER TABLE `gen_system_notification_tbl`
  MODIFY `notificationID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `gen_user_role_tbl`
--
ALTER TABLE `gen_user_role_tbl`
  MODIFY `roleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
