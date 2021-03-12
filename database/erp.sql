-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2021 at 10:17 AM
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
-- Table structure for table `gen_approval_setup_tbl`
--

CREATE TABLE `gen_approval_setup_tbl` (
  `approvalID` bigint(20) NOT NULL,
  `moduleID` bigint(20) NOT NULL,
  `approvalUserAccounts` text NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gen_approval_setup_tbl`
--

INSERT INTO `gen_approval_setup_tbl` (`approvalID`, `moduleID`, `approvalUserAccounts`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(5, 1, '9|2|1', 1, 1, '2021-03-05', '2021-03-10 07:15:59'),
(9, 6, '2|1|9', 1, 1, '2021-03-10', '2021-03-10 08:02:06');

-- --------------------------------------------------------

--
-- Table structure for table `gen_module_category_tbl`
--

CREATE TABLE `gen_module_category_tbl` (
  `moduleCategoryID` bigint(20) NOT NULL,
  `moduleHeaderID` bigint(20) NOT NULL,
  `moduleCategoryOrder` int(11) NOT NULL,
  `moduleCategoryIcon` varchar(100) NOT NULL,
  `moduleCategoryName` varchar(100) NOT NULL,
  `moduleCategoryStatus` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gen_module_category_tbl`
--

INSERT INTO `gen_module_category_tbl` (`moduleCategoryID`, `moduleHeaderID`, `moduleCategoryOrder`, `moduleCategoryIcon`, `moduleCategoryName`, `moduleCategoryStatus`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '01615537147.svg', 'Dashboard', 1, '2021-03-12 08:19:07', '2021-03-12 08:19:07'),
(2, 2, 3, '01615538110.svg', 'Masterfiles', 1, '2021-03-12 08:35:10', '2021-03-12 08:43:55'),
(3, 3, 4, '01615538293.svg', 'System Settings', 1, '2021-03-12 08:38:13', '2021-03-12 08:44:00'),
(4, 5, 2, '01615538430.svg', 'Management', 1, '2021-03-12 08:40:30', '2021-03-12 08:43:49');

-- --------------------------------------------------------

--
-- Table structure for table `gen_module_header_tbl`
--

CREATE TABLE `gen_module_header_tbl` (
  `moduleHeaderID` bigint(20) NOT NULL,
  `moduleHeaderOrder` int(11) NOT NULL,
  `moduleHeaderName` varchar(100) NOT NULL,
  `moduleHeaderStatus` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gen_module_header_tbl`
--

INSERT INTO `gen_module_header_tbl` (`moduleHeaderID`, `moduleHeaderOrder`, `moduleHeaderName`, `moduleHeaderStatus`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Main', 1, '2021-03-12 08:17:06', '2021-03-12 08:30:08'),
(2, 3, 'Forms', 1, '2021-03-12 08:22:13', '2021-03-12 08:44:27'),
(3, 4, 'Settings', 1, '2021-03-12 08:23:32', '2021-03-12 08:44:34'),
(4, 5, 'Reports', 1, '2021-03-12 08:24:01', '2021-03-12 08:44:38'),
(5, 2, 'Management', 1, '2021-03-12 08:40:11', '2021-03-12 08:40:11');

-- --------------------------------------------------------

--
-- Table structure for table `gen_module_list_tbl`
--

CREATE TABLE `gen_module_list_tbl` (
  `moduleID` bigint(20) NOT NULL,
  `moduleHeaderID` bigint(20) NOT NULL,
  `moduleCategoryID` bigint(20) DEFAULT NULL,
  `moduleOrder` int(11) NOT NULL,
  `projectName` text NOT NULL,
  `moduleIcon` varchar(100) DEFAULT NULL,
  `moduleName` varchar(100) NOT NULL,
  `moduleApprover` int(11) NOT NULL,
  `moduleController` varchar(100) NOT NULL,
  `moduleStatus` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gen_module_list_tbl`
--

INSERT INTO `gen_module_list_tbl` (`moduleID`, `moduleHeaderID`, `moduleCategoryID`, `moduleOrder`, `projectName`, `moduleIcon`, `moduleName`, `moduleApprover`, `moduleController`, `moduleStatus`, `createdAt`, `updatedAt`) VALUES
(1, 2, 2, 1, 'Human Resources Information System', NULL, 'Schedule Setup', 0, 'hris/schedule_setup', 1, '2021-03-12 08:46:30', '2021-03-12 08:52:42'),
(2, 1, 1, 1, 'Human Resources Information System', '01615537839.svg', 'HRIS Dashboard', 0, 'hris/dashboard', 1, '2021-03-12 08:30:39', '2021-03-12 08:52:39'),
(3, 2, 2, 1, 'Finance Management System', NULL, 'Bank', 0, 'fms/bank', 1, '2021-03-12 08:36:28', '2021-03-12 08:52:37'),
(4, 3, 3, 1, 'Human Resources Information System|Project Management System|Inventory Management System|Finance Management System', NULL, 'Approval Setup', 0, 'approval_setup', 1, '2021-03-12 08:38:47', '2021-03-12 08:52:34'),
(5, 3, 3, 1, 'Human Resources Information System|Project Management System|Inventory Management System|Finance Management System', NULL, 'Roles and Permission', 0, 'roles_permission', 1, '2021-03-12 08:39:34', '2021-03-12 08:52:32'),
(6, 5, 4, 1, 'Human Resources Information System|Project Management System|Inventory Management System|Finance Management System', NULL, 'System Notification', 0, 'system_notification', 1, '2021-03-12 08:41:05', '2021-03-12 08:52:29'),
(7, 2, 2, 1, 'Human Resources Information System', NULL, 'Holiday', 0, 'hris/holiday', 1, '2021-03-12 08:43:31', '2021-03-12 08:52:24'),
(8, 2, 2, 1, 'Human Resources Information System', NULL, 'Leave Request', 0, 'hris/leave_request', 1, '2021-03-12 08:45:29', '2021-03-12 08:52:21'),
(9, 2, 2, 1, 'Human Resources Information System', NULL, 'Leave', 0, 'hris/leave', 1, '2021-03-12 08:46:05', '2021-03-12 08:52:18'),
(10, 2, 2, 1, 'Human Resources Information System', NULL, 'Loan', 0, 'hris/load', 1, '2021-03-12 08:46:30', '2021-03-12 08:52:15'),
(11, 2, 2, 1, 'Human Resources Information System', NULL, 'PhilHealth Table', 0, 'hris/philhealth_table', 1, '2021-03-12 08:46:30', '2021-03-12 08:46:30'),
(12, 2, 2, 1, 'Human Resources Information System', NULL, 'SSS Table', 0, 'hris/sss_table', 1, '2021-03-12 08:54:47', '2021-03-12 08:54:47'),
(13, 2, 2, 1, 'Human Resources Information System', NULL, 'Tax Table', 0, 'hris/tax_table', 1, '2021-03-12 08:55:14', '2021-03-12 08:55:14'),
(14, 2, 2, 1, 'Inventory Management System', NULL, 'Inventory Category', 0, 'ims/inventory_category', 1, '2021-03-12 08:58:23', '2021-03-12 08:58:23'),
(15, 2, 2, 1, 'Inventory Management System', NULL, 'Inventory Classification', 0, 'ims/inventory_classification', 1, '2021-03-12 09:00:13', '2021-03-12 09:00:13'),
(16, 2, 2, 1, 'Inventory Management System', NULL, 'Inventory Condition', 0, 'ims/inventory_condition', 1, '2021-03-12 09:00:41', '2021-03-12 09:00:41'),
(17, 2, 2, 1, 'Inventory Management System', NULL, 'Inventory Item', 0, 'ims/inventory_item', 1, '2021-03-12 09:01:06', '2021-03-12 09:01:06'),
(18, 2, 2, 1, 'Inventory Management System', NULL, 'Inventory Vendor', 0, 'ims/inventory_vendor', 1, '2021-03-12 09:02:00', '2021-03-12 09:02:00'),
(19, 2, 2, 1, 'Project Management System', NULL, 'Project Client', 0, 'pms/project_client', 1, '2021-03-12 09:02:38', '2021-03-12 09:02:38');

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
(1, 1, 2, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(2, 1, 3, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(3, 1, 4, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(4, 1, 5, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(5, 1, 6, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(6, 1, 7, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(7, 1, 8, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(8, 1, 9, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(9, 1, 10, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(10, 1, 11, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(11, 1, 12, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(12, 1, 13, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(13, 1, 14, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(14, 1, 15, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(15, 1, 16, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(16, 1, 17, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(17, 1, 18, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(18, 2, 2, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(19, 2, 3, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(20, 2, 4, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(21, 2, 5, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(22, 2, 6, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(23, 2, 7, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(24, 2, 8, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(25, 2, 9, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(26, 2, 10, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(27, 2, 11, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(28, 2, 12, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(29, 2, 13, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(30, 2, 14, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(31, 2, 15, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(32, 2, 16, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(33, 2, 17, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(34, 2, 18, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(35, 3, 2, 1, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(36, 3, 3, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(37, 3, 4, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(38, 3, 5, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(39, 3, 6, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(40, 3, 7, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(41, 3, 8, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(42, 3, 9, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(43, 3, 10, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(44, 3, 11, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(45, 3, 12, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(46, 3, 13, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(47, 3, 14, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(48, 3, 15, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(49, 3, 16, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(50, 3, 17, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(51, 3, 18, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(52, 4, 2, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(53, 4, 3, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(54, 4, 4, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(55, 4, 5, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(56, 4, 6, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(57, 4, 7, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(58, 4, 8, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(59, 4, 9, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(60, 4, 10, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(61, 4, 11, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(62, 4, 12, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(63, 4, 13, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(64, 4, 14, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(65, 4, 15, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(66, 4, 16, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(67, 4, 17, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(68, 4, 18, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(69, 5, 2, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(70, 5, 3, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(71, 5, 4, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(72, 5, 5, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(73, 5, 6, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(74, 5, 7, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(75, 5, 8, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(76, 5, 9, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(77, 5, 10, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(78, 5, 11, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(79, 5, 12, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(80, 5, 13, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(81, 5, 14, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(82, 5, 15, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(83, 5, 16, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(84, 5, 17, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(85, 5, 18, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(86, 6, 2, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(87, 6, 3, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(88, 6, 4, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(89, 6, 5, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(90, 6, 6, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(91, 6, 7, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(92, 6, 8, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(93, 6, 9, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(94, 6, 10, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(95, 6, 11, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(96, 6, 12, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(97, 6, 13, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(98, 6, 14, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(99, 6, 15, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(100, 6, 16, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(101, 6, 17, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(102, 6, 18, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(103, 7, 2, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(104, 7, 3, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(105, 7, 4, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(106, 7, 5, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(107, 7, 6, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(108, 7, 7, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(109, 7, 8, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(110, 7, 9, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(111, 7, 10, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(112, 7, 11, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(113, 7, 12, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(114, 7, 13, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(115, 7, 14, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(116, 7, 15, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(117, 7, 16, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(118, 7, 17, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(119, 7, 18, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(120, 8, 2, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(121, 8, 3, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(122, 8, 4, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(123, 8, 5, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(124, 8, 6, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(125, 8, 7, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(126, 8, 8, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(127, 8, 9, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(128, 8, 10, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(129, 8, 11, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(130, 8, 12, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(131, 8, 13, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(132, 8, 14, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(133, 8, 15, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(134, 8, 16, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(135, 8, 17, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(136, 8, 18, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(137, 9, 2, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(138, 9, 3, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(139, 9, 4, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(140, 9, 5, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(141, 9, 6, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(142, 9, 7, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(143, 9, 8, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(144, 9, 9, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(145, 9, 10, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(146, 9, 11, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(147, 9, 12, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(148, 9, 13, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(149, 9, 14, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(150, 9, 15, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(151, 9, 16, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(152, 9, 17, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(153, 9, 18, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(154, 10, 2, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(155, 10, 3, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(156, 10, 4, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(157, 10, 5, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(158, 10, 6, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(159, 10, 7, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(160, 10, 8, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(161, 10, 9, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(162, 10, 10, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(163, 10, 11, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(164, 10, 12, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(165, 10, 13, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(166, 10, 14, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(167, 10, 15, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(168, 10, 16, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(169, 10, 17, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38'),
(170, 10, 18, 0, '2021-03-11 00:22:38', '2021-03-11 00:22:38');

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
(1, 1, 'Inventory Item', 'Hammer - Low Stock', 1, 1, 1, '2021-03-09 05:31:59', '2021-03-12 08:14:07'),
(2, 5, 'Arjay Diangzon', 'Passed resignation letter', 2, 1, 1, '2021-03-09 05:33:20', '2021-03-10 06:34:47'),
(3, 3, 'Charles Verdadero', 'Extended Contract', 3, 1, 1, '2021-03-09 05:40:22', '2021-03-10 06:34:38'),
(6, 3, 'Joseph Berongoy', 'Extended Contract', 2, 1, 1, '2021-03-09 07:15:05', '2021-03-10 06:34:47');

-- --------------------------------------------------------

--
-- Table structure for table `gen_user_account_tbl`
--

CREATE TABLE `gen_user_account_tbl` (
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
-- Dumping data for table `gen_user_account_tbl`
--

INSERT INTO `gen_user_account_tbl` (`userAccountID`, `role`, `firstname`, `lastname`, `email`, `mobile`, `telephone`, `address`, `gender`, `birthday`, `link`, `username`, `password`, `amount`, `skills`, `file`, `userType`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'Ako To Si', 'Natoy', 'rjpinca@gmail.com', '(+63) 099 0908 595', '(32) 1321 423', '1709 Antel Bldg, Julia Vargas', 'Male', '2021-02-03', 'http://theblackcoders.com', 'rjpinca', 'rjpinca', '0.00', '', '01614667776.svg', 0, 0, '2021-02-26 05:19:00', '2021-03-04 00:11:19'),
(2, 'Operations', 'Akosi', 'RJ', 'hakdog123@gmail.com', '(+63) 545 8987 987', '(54) 6545 646', '1709 Antel Bldg, Julia Vargas', 'Male', '2021-03-05', 'http://theblackcoders.com', 'hakdog123', 'hakdog123', '999.95', 'CSS|JS', '01614668556.svg|11614668556.svg|21614668556.svg|31614668556.svg|41614668556.svg|51614668556.svg', 0, 1, '2021-02-26 05:25:07', '2021-03-04 00:11:21'),
(9, 'Admin', 'Charles', 'Vincent', 'charlesvincent@gmail.com', '(+63) 123 2141 242', '(53) 2432 423', 'Quezon City', 'Male', '2021-03-09', 'http://theblackcoders.com', 'charles', 'charles', '0.00', 'CSS|HTML|JS', '01614668026.svg|11614668026.svg|21614668026.svg|31614668026.svg|41614668026.svg|51614668026.svg', 1, 1, '2021-03-02 06:52:07', '2021-03-10 01:34:47');

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

-- --------------------------------------------------------

--
-- Table structure for table `hris_award_tbl`
--

CREATE TABLE `hris_award_tbl` (
  `awardID` bigint(20) NOT NULL,
  `awardTitle` text NOT NULL,
  `awardDescription` text NOT NULL,
  `awardSignatories` text NOT NULL,
  `awardStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hris_award_tbl`
--

INSERT INTO `hris_award_tbl` (`awardID`, `awardTitle`, `awardDescription`, `awardSignatories`, `awardStatus`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'Best Employee of the Month', 'Ito ay para sa mga taong malulupit sa buwan na nabanggit', '9|2', 1, 1, 2, '2021-03-12 07:38:07', '2021-03-12 07:53:11'),
(2, 'Sample date', 'askdljaskldaskd', '2', 0, 1, 2, '2021-03-12 08:01:10', '2021-03-12 08:01:20');

-- --------------------------------------------------------

--
-- Table structure for table `hris_code_conduct_category_tbl`
--

CREATE TABLE `hris_code_conduct_category_tbl` (
  `codeConductCategoryID` bigint(20) NOT NULL,
  `codeConductCategoryName` text NOT NULL,
  `codeConductCategoryStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hris_code_conduct_category_tbl`
--

INSERT INTO `hris_code_conduct_category_tbl` (`codeConductCategoryID`, `codeConductCategoryName`, `codeConductCategoryStatus`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'Arjay Mahina', 0, 1, 2, '2021-03-12 03:47:10', '2021-03-12 03:46:42');

-- --------------------------------------------------------

--
-- Table structure for table `hris_holiday_tbl`
--

CREATE TABLE `hris_holiday_tbl` (
  `holidayID` bigint(20) NOT NULL,
  `holidayCode` text NOT NULL,
  `holidayName` text NOT NULL,
  `holidayDate` date NOT NULL,
  `holidayType` text NOT NULL,
  `holidayStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hris_holiday_tbl`
--

INSERT INTO `hris_holiday_tbl` (`holidayID`, `holidayCode`, `holidayName`, `holidayDate`, `holidayType`, `holidayStatus`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(18, 'HLD-21-00001', 'Independence Day', '2021-03-11', 'Regular Holiday', 1, 1, 2, '2021-03-12 02:32:12', '2021-03-12 08:13:06'),
(19, 'HLD-21-00000', 'Sanal All holiday', '2021-04-02', 'Regular Holiday', 1, 1, 2, '2021-03-12 02:32:57', '2021-03-12 02:37:49');

-- --------------------------------------------------------

--
-- Table structure for table `hris_leave_tbl`
--

CREATE TABLE `hris_leave_tbl` (
  `leaveID` bigint(20) NOT NULL,
  `leaveCode` text NOT NULL,
  `leaveName` text NOT NULL,
  `leaveStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hris_leave_tbl`
--

INSERT INTO `hris_leave_tbl` (`leaveID`, `leaveCode`, `leaveName`, `leaveStatus`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'LVE-21-00001', 'Vacation Leave', 0, 1, 2, '2021-03-12 02:57:49', '2021-03-12 02:58:37');

-- --------------------------------------------------------

--
-- Table structure for table `hris_loan_tbl`
--

CREATE TABLE `hris_loan_tbl` (
  `loanID` bigint(20) NOT NULL,
  `loanCode` text NOT NULL,
  `loanName` text NOT NULL,
  `loanStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hris_loan_tbl`
--

INSERT INTO `hris_loan_tbl` (`loanID`, `loanCode`, `loanName`, `loanStatus`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'LON-21-00001', 'Pautan mark loan', 1, 1, 2, '2021-03-12 03:09:40', '2021-03-12 03:10:03'),
(2, 'LON-21-00000', 'Pautang Arjay', 1, 1, 2, '2021-03-12 03:09:55', '2021-03-12 03:10:09');

-- --------------------------------------------------------

--
-- Table structure for table `hris_philhealth_table_tbl`
--

CREATE TABLE `hris_philhealth_table_tbl` (
  `phID` bigint(20) NOT NULL,
  `phMinimumRange` decimal(15,2) NOT NULL,
  `phMaximumRange` decimal(15,2) NOT NULL,
  `phPercentage` decimal(15,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hris_philhealth_table_tbl`
--

INSERT INTO `hris_philhealth_table_tbl` (`phID`, `phMinimumRange`, `phMaximumRange`, `phPercentage`, `createdAt`, `updatedAt`) VALUES
(1, '15000.00', '15000.00', '50.00', '2021-03-10 08:05:10', '2021-03-10 08:05:10');

-- --------------------------------------------------------

--
-- Table structure for table `hris_schedule_setup_tbl`
--

CREATE TABLE `hris_schedule_setup_tbl` (
  `scheduleID` bigint(20) NOT NULL,
  `scheduleName` varchar(100) NOT NULL,
  `mondayFrom` time NOT NULL,
  `mondayTo` time NOT NULL,
  `mondayStatus` int(11) NOT NULL,
  `tuesdayFrom` time NOT NULL,
  `tuesdayTo` time NOT NULL,
  `tuesdayStatus` int(11) NOT NULL,
  `wednesdayFrom` time NOT NULL,
  `wednesdayTo` time NOT NULL,
  `wednesdayStatus` int(11) NOT NULL,
  `thursdayFrom` time NOT NULL,
  `thursdayTo` time NOT NULL,
  `thursdayStatus` int(11) NOT NULL,
  `fridayFrom` time NOT NULL,
  `fridayTo` time NOT NULL,
  `fridayStatus` int(11) NOT NULL,
  `saturdayFrom` time NOT NULL,
  `saturdayTo` time NOT NULL,
  `saturdayStatus` int(11) NOT NULL,
  `sundayFrom` time NOT NULL,
  `sundayTo` time NOT NULL,
  `sundayStatus` int(11) NOT NULL,
  `scheduleStatus` int(11) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `updatedBy` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hris_schedule_setup_tbl`
--

INSERT INTO `hris_schedule_setup_tbl` (`scheduleID`, `scheduleName`, `mondayFrom`, `mondayTo`, `mondayStatus`, `tuesdayFrom`, `tuesdayTo`, `tuesdayStatus`, `wednesdayFrom`, `wednesdayTo`, `wednesdayStatus`, `thursdayFrom`, `thursdayTo`, `thursdayStatus`, `fridayFrom`, `fridayTo`, `fridayStatus`, `saturdayFrom`, `saturdayTo`, `saturdayStatus`, `sundayFrom`, `sundayTo`, `sundayStatus`, `scheduleStatus`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'Mid Shift', '07:00:00', '12:00:00', 1, '08:00:00', '13:00:00', 1, '08:00:00', '13:00:00', 1, '08:00:00', '13:00:00', 1, '08:00:00', '13:00:00', 1, '08:00:00', '13:00:00', 1, '08:00:00', '13:00:00', 1, 0, 1, 1, '2021-03-11 02:54:03', '2021-03-11 06:00:01');

-- --------------------------------------------------------

--
-- Table structure for table `hris_sss_table_tbl`
--

CREATE TABLE `hris_sss_table_tbl` (
  `sssID` bigint(20) NOT NULL,
  `sssMinimumRange` decimal(15,2) NOT NULL,
  `sssMaximumRange` decimal(15,2) NOT NULL,
  `sssEmployerContribution` decimal(15,2) NOT NULL,
  `sssEmployeeContribution` decimal(15,2) NOT NULL,
  `sssECContribution` decimal(15,2) NOT NULL,
  `sssTotal` decimal(15,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hris_sss_table_tbl`
--

INSERT INTO `hris_sss_table_tbl` (`sssID`, `sssMinimumRange`, `sssMaximumRange`, `sssEmployerContribution`, `sssEmployeeContribution`, `sssECContribution`, `sssTotal`, `createdAt`, `updatedAt`) VALUES
(1, '15000.00', '15000.00', '15000.00', '15000.00', '15000.00', '15000.00', '2021-03-10 07:59:03', '2021-03-10 07:59:03');

-- --------------------------------------------------------

--
-- Table structure for table `hris_tax_table_tbl`
--

CREATE TABLE `hris_tax_table_tbl` (
  `taxID` bigint(20) NOT NULL,
  `taxMinimumRange` decimal(15,2) NOT NULL,
  `taxMaximumRange` decimal(15,2) NOT NULL,
  `taxAdditionalTax` decimal(15,2) NOT NULL,
  `taxPercentage` decimal(15,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hris_tax_table_tbl`
--

INSERT INTO `hris_tax_table_tbl` (`taxID`, `taxMinimumRange`, `taxMaximumRange`, `taxAdditionalTax`, `taxPercentage`, `createdAt`, `updatedAt`) VALUES
(1, '15000.00', '15000.00', '15000.00', '50.00', '2021-03-10 23:22:42', '2021-03-10 23:22:42');

-- --------------------------------------------------------

--
-- Table structure for table `ims_inventory_category_tbl`
--

CREATE TABLE `ims_inventory_category_tbl` (
  `categoryID` bigint(20) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `categoryStatus` varchar(50) NOT NULL,
  `datecreated` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ims_inventory_classification_tbl`
--

CREATE TABLE `ims_inventory_classification_tbl` (
  `classificationID` bigint(20) NOT NULL,
  `classificationCode` text NOT NULL,
  `classificationName` text NOT NULL,
  `classificationStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ims_inventory_classification_tbl`
--

INSERT INTO `ims_inventory_classification_tbl` (`classificationID`, `classificationCode`, `classificationName`, `classificationStatus`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'CFN-2100001', 'Aplha Data', 1, 1, 1, '2021-03-11 07:06:30', '2021-03-11 08:22:16'),
(2, 'CFN-2100002', 'Bravo Account', 0, 1, 1, '2021-03-11 07:10:01', '2021-03-11 08:28:39'),
(3, 'CFN-2100002', 'Arjaydasd', 1, 1, 1, '2021-03-11 07:10:34', '2021-03-11 07:10:34'),
(5, 'CFN-21-00003', 'charlesasdasd ', 0, 1, 2, '2021-03-11 07:27:27', '2021-03-12 08:32:03'),
(6, 'CFN-21-00003', 'Charles lang po', 0, 1, 2, '2021-03-11 07:33:00', '2021-03-12 03:20:55'),
(7, 'CFN-21-00003', 'joseph mmalang', 1, 1, 1, '2021-03-12 01:15:44', '2021-03-12 01:15:44'),
(8, 'CFN-21-00003', 'qweqweqw', 0, 1, 1, '2021-03-12 01:16:10', '2021-03-12 01:16:10'),
(9, 'CFN-21-00003', 'Arjaytasd ', 1, 1, 1, '2021-03-12 01:16:32', '2021-03-12 01:16:32'),
(10, 'CFN-21-00003', 'Charles Lang Po', 0, 1, 1, '2021-03-12 03:20:44', '2021-03-12 03:20:44');

-- --------------------------------------------------------

--
-- Table structure for table `ims_inventory_item_tbl`
--

CREATE TABLE `ims_inventory_item_tbl` (
  `itemID` bigint(20) NOT NULL,
  `storage` varchar(255) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `itemClassification` varchar(255) NOT NULL,
  `itemCategory` varchar(255) NOT NULL,
  `itemSize` varchar(255) NOT NULL,
  `basePrice` decimal(10,2) NOT NULL,
  `reOrderLevel` int(50) NOT NULL,
  `vatType` varchar(255) NOT NULL,
  `datecreated` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gen_approval_setup_tbl`
--
ALTER TABLE `gen_approval_setup_tbl`
  ADD PRIMARY KEY (`approvalID`);

--
-- Indexes for table `gen_module_category_tbl`
--
ALTER TABLE `gen_module_category_tbl`
  ADD PRIMARY KEY (`moduleCategoryID`);

--
-- Indexes for table `gen_module_header_tbl`
--
ALTER TABLE `gen_module_header_tbl`
  ADD PRIMARY KEY (`moduleHeaderID`);

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
-- Indexes for table `gen_user_account_tbl`
--
ALTER TABLE `gen_user_account_tbl`
  ADD PRIMARY KEY (`userAccountID`);

--
-- Indexes for table `gen_user_role_tbl`
--
ALTER TABLE `gen_user_role_tbl`
  ADD PRIMARY KEY (`roleID`);

--
-- Indexes for table `hris_award_tbl`
--
ALTER TABLE `hris_award_tbl`
  ADD PRIMARY KEY (`awardID`);

--
-- Indexes for table `hris_code_conduct_category_tbl`
--
ALTER TABLE `hris_code_conduct_category_tbl`
  ADD PRIMARY KEY (`codeConductCategoryID`);

--
-- Indexes for table `hris_holiday_tbl`
--
ALTER TABLE `hris_holiday_tbl`
  ADD PRIMARY KEY (`holidayID`);

--
-- Indexes for table `hris_leave_tbl`
--
ALTER TABLE `hris_leave_tbl`
  ADD PRIMARY KEY (`leaveID`);

--
-- Indexes for table `hris_loan_tbl`
--
ALTER TABLE `hris_loan_tbl`
  ADD PRIMARY KEY (`loanID`);

--
-- Indexes for table `hris_philhealth_table_tbl`
--
ALTER TABLE `hris_philhealth_table_tbl`
  ADD PRIMARY KEY (`phID`);

--
-- Indexes for table `hris_schedule_setup_tbl`
--
ALTER TABLE `hris_schedule_setup_tbl`
  ADD PRIMARY KEY (`scheduleID`);

--
-- Indexes for table `hris_sss_table_tbl`
--
ALTER TABLE `hris_sss_table_tbl`
  ADD PRIMARY KEY (`sssID`);

--
-- Indexes for table `hris_tax_table_tbl`
--
ALTER TABLE `hris_tax_table_tbl`
  ADD PRIMARY KEY (`taxID`);

--
-- Indexes for table `ims_inventory_category_tbl`
--
ALTER TABLE `ims_inventory_category_tbl`
  ADD PRIMARY KEY (`categoryID`);

--
-- Indexes for table `ims_inventory_classification_tbl`
--
ALTER TABLE `ims_inventory_classification_tbl`
  ADD PRIMARY KEY (`classificationID`);

--
-- Indexes for table `ims_inventory_item_tbl`
--
ALTER TABLE `ims_inventory_item_tbl`
  ADD PRIMARY KEY (`itemID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gen_approval_setup_tbl`
--
ALTER TABLE `gen_approval_setup_tbl`
  MODIFY `approvalID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `gen_module_category_tbl`
--
ALTER TABLE `gen_module_category_tbl`
  MODIFY `moduleCategoryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `gen_module_header_tbl`
--
ALTER TABLE `gen_module_header_tbl`
  MODIFY `moduleHeaderID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `gen_module_list_tbl`
--
ALTER TABLE `gen_module_list_tbl`
  MODIFY `moduleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `gen_operations_tbl`
--
ALTER TABLE `gen_operations_tbl`
  MODIFY `userAccountID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `gen_roles_permission_tbl`
--
ALTER TABLE `gen_roles_permission_tbl`
  MODIFY `permissionID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT for table `gen_system_notification_tbl`
--
ALTER TABLE `gen_system_notification_tbl`
  MODIFY `notificationID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `gen_user_account_tbl`
--
ALTER TABLE `gen_user_account_tbl`
  MODIFY `userAccountID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `gen_user_role_tbl`
--
ALTER TABLE `gen_user_role_tbl`
  MODIFY `roleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `hris_award_tbl`
--
ALTER TABLE `hris_award_tbl`
  MODIFY `awardID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hris_code_conduct_category_tbl`
--
ALTER TABLE `hris_code_conduct_category_tbl`
  MODIFY `codeConductCategoryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hris_holiday_tbl`
--
ALTER TABLE `hris_holiday_tbl`
  MODIFY `holidayID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `hris_leave_tbl`
--
ALTER TABLE `hris_leave_tbl`
  MODIFY `leaveID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hris_loan_tbl`
--
ALTER TABLE `hris_loan_tbl`
  MODIFY `loanID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hris_philhealth_table_tbl`
--
ALTER TABLE `hris_philhealth_table_tbl`
  MODIFY `phID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hris_schedule_setup_tbl`
--
ALTER TABLE `hris_schedule_setup_tbl`
  MODIFY `scheduleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hris_sss_table_tbl`
--
ALTER TABLE `hris_sss_table_tbl`
  MODIFY `sssID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hris_tax_table_tbl`
--
ALTER TABLE `hris_tax_table_tbl`
  MODIFY `taxID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ims_inventory_category_tbl`
--
ALTER TABLE `ims_inventory_category_tbl`
  MODIFY `categoryID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ims_inventory_classification_tbl`
--
ALTER TABLE `ims_inventory_classification_tbl`
  MODIFY `classificationID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ims_inventory_item_tbl`
--
ALTER TABLE `ims_inventory_item_tbl`
  MODIFY `itemID` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
