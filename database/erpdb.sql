-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2021 at 01:39 AM
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
-- Database: `erpdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `fms_bank_tbl`
--

CREATE TABLE `fms_bank_tbl` (
  `bankID` bigint(20) NOT NULL,
  `bankCode` varchar(255) NOT NULL,
  `bankName` varchar(255) NOT NULL,
  `bankNumber` varchar(255) NOT NULL,
  `bankStatus` int(50) NOT NULL,
  `datecreated` date NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `fms_chart_of_accounts_tbl`
--

CREATE TABLE `fms_chart_of_accounts_tbl` (
  `chartOfAccountID` bigint(20) NOT NULL,
  `bankID` bigint(20) NOT NULL,
  `accountCode` varchar(255) NOT NULL,
  `accountName` varchar(255) NOT NULL,
  `accountDescription` varchar(255) NOT NULL,
  `accountLevel` varchar(255) NOT NULL,
  `ledgerClassificationID` bigint(20) NOT NULL,
  `accountGrouping` varchar(255) NOT NULL,
  `financialStatement` varchar(255) NOT NULL,
  `accountStatus` int(50) NOT NULL,
  `accountDatecreated` date NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `gen_approval_setup_tbl`
--

CREATE TABLE `gen_approval_setup_tbl` (
  `approvalID` bigint(20) NOT NULL,
  `moduleID` bigint(20) NOT NULL,
  `roleID` bigint(20) NOT NULL,
  `userAccountID` text NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gen_approval_setup_tbl`
--

INSERT INTO `gen_approval_setup_tbl` (`approvalID`, `moduleID`, `roleID`, `userAccountID`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(58, 13, 1, '1|2|9|0', 9, 9, '2021-03-19', '2021-03-18 23:00:50'),
(59, 13, 3, '0', 9, 9, '2021-03-19', '2021-03-18 22:55:07'),
(60, 13, 6, '0', 9, 9, '2021-03-19', '2021-03-18 22:55:07'),
(61, 13, 8, '0', 9, 9, '2021-03-19', '2021-03-18 22:55:08'),
(62, 13, 10, '0', 9, 9, '2021-03-19', '2021-03-18 22:55:08');

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
(2, 2, 0, '01615538110.svg', 'Masterfiles', 1, '2021-03-12 08:35:10', '2021-03-18 23:16:39'),
(3, 3, 4, '01615538293.svg', 'System Settings', 1, '2021-03-12 08:38:13', '2021-03-12 08:44:00'),
(4, 5, 5, '01615538430.svg', 'Management', 1, '2021-03-12 08:40:30', '2021-03-18 23:16:01'),
(5, 2, 2, '01616108987.svg', 'Employee', 1, '2021-03-18 23:09:47', '2021-03-18 23:15:20');

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
(5, 2, 'Management', 1, '2021-03-12 08:40:11', '2021-03-12 08:40:11'),
(6, 1, 'Test', 1, '2021-03-17 05:29:58', '2021-03-17 05:31:10');

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
(8, 2, 2, 1, 'Human Resources Information System', NULL, 'Leave Request', 3, 'hris/leave_request', 1, '2021-03-12 08:45:29', '2021-03-18 22:59:48'),
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
(19, 2, 2, 1, 'Project Management System', NULL, 'Project Client', 0, 'pms/project_client', 1, '2021-03-12 09:02:38', '2021-03-12 09:02:38'),
(22, 2, 2, 1, 'Project Management System', NULL, 'Project Milestone', 0, 'pms/project_milestone', 1, '2021-03-18 04:26:52', '2021-03-18 04:26:52'),
(23, 2, 5, 1, 'Human Resources Information System', NULL, 'Change Schedule', 3, 'hris/change_schedule', 1, '2021-03-18 23:14:31', '2021-03-18 23:14:31');

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
(1, 1, 1, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(2, 1, 2, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(3, 1, 3, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(4, 1, 4, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(5, 1, 5, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(6, 1, 6, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(7, 1, 7, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(8, 1, 8, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(9, 1, 9, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(10, 1, 10, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(11, 1, 11, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(12, 1, 12, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(13, 1, 13, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(14, 1, 14, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(15, 1, 15, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(16, 1, 16, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(17, 1, 17, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(18, 1, 18, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(19, 1, 19, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(20, 1, 22, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(21, 1, 23, 1, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(22, 2, 1, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(23, 2, 2, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(24, 2, 3, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(25, 2, 4, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(26, 2, 5, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(27, 2, 6, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(28, 2, 7, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(29, 2, 8, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(30, 2, 9, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(31, 2, 10, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(32, 2, 11, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(33, 2, 12, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(34, 2, 13, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(35, 2, 14, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(36, 2, 15, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(37, 2, 16, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(38, 2, 17, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(39, 2, 18, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(40, 2, 19, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(41, 2, 22, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(42, 2, 23, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(43, 3, 1, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(44, 3, 2, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(45, 3, 3, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(46, 3, 4, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(47, 3, 5, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(48, 3, 6, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(49, 3, 7, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(50, 3, 8, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(51, 3, 9, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(52, 3, 10, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(53, 3, 11, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(54, 3, 12, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(55, 3, 13, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(56, 3, 14, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(57, 3, 15, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(58, 3, 16, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(59, 3, 17, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(60, 3, 18, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(61, 3, 19, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(62, 3, 22, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(63, 3, 23, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(64, 4, 1, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(65, 4, 2, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(66, 4, 3, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(67, 4, 4, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(68, 4, 5, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(69, 4, 6, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(70, 4, 7, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(71, 4, 8, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(72, 4, 9, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(73, 4, 10, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(74, 4, 11, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(75, 4, 12, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(76, 4, 13, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(77, 4, 14, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(78, 4, 15, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(79, 4, 16, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(80, 4, 17, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(81, 4, 18, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(82, 4, 19, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(83, 4, 22, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(84, 4, 23, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(85, 5, 1, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(86, 5, 2, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(87, 5, 3, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(88, 5, 4, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(89, 5, 5, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(90, 5, 6, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(91, 5, 7, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(92, 5, 8, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(93, 5, 9, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(94, 5, 10, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(95, 5, 11, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(96, 5, 12, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(97, 5, 13, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(98, 5, 14, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(99, 5, 15, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(100, 5, 16, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(101, 5, 17, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(102, 5, 18, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(103, 5, 19, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(104, 5, 22, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(105, 5, 23, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(106, 6, 1, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(107, 6, 2, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(108, 6, 3, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(109, 6, 4, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(110, 6, 5, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(111, 6, 6, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(112, 6, 7, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(113, 6, 8, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(114, 6, 9, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(115, 6, 10, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(116, 6, 11, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(117, 6, 12, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(118, 6, 13, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(119, 6, 14, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(120, 6, 15, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(121, 6, 16, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(122, 6, 17, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(123, 6, 18, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(124, 6, 19, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(125, 6, 22, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(126, 6, 23, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(127, 7, 1, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(128, 7, 2, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(129, 7, 3, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(130, 7, 4, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(131, 7, 5, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(132, 7, 6, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(133, 7, 7, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(134, 7, 8, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(135, 7, 9, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(136, 7, 10, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(137, 7, 11, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(138, 7, 12, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(139, 7, 13, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(140, 7, 14, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(141, 7, 15, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(142, 7, 16, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(143, 7, 17, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(144, 7, 18, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(145, 7, 19, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(146, 7, 22, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(147, 7, 23, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(148, 8, 1, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(149, 8, 2, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(150, 8, 3, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(151, 8, 4, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(152, 8, 5, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(153, 8, 6, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(154, 8, 7, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(155, 8, 8, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(156, 8, 9, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(157, 8, 10, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(158, 8, 11, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(159, 8, 12, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(160, 8, 13, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(161, 8, 14, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(162, 8, 15, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(163, 8, 16, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(164, 8, 17, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(165, 8, 18, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(166, 8, 19, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(167, 8, 22, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(168, 8, 23, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(169, 9, 1, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(170, 9, 2, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(171, 9, 3, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(172, 9, 4, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(173, 9, 5, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(174, 9, 6, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(175, 9, 7, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(176, 9, 8, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(177, 9, 9, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(178, 9, 10, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(179, 9, 11, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(180, 9, 12, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(181, 9, 13, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(182, 9, 14, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(183, 9, 15, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(184, 9, 16, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(185, 9, 17, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(186, 9, 18, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(187, 9, 19, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(188, 9, 22, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(189, 9, 23, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(190, 10, 1, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(191, 10, 2, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(192, 10, 3, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(193, 10, 4, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(194, 10, 5, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(195, 10, 6, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(196, 10, 7, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(197, 10, 8, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(198, 10, 9, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(199, 10, 10, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(200, 10, 11, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(201, 10, 12, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(202, 10, 13, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(203, 10, 14, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(204, 10, 15, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(205, 10, 16, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(206, 10, 17, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(207, 10, 18, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(208, 10, 19, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(209, 10, 22, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(210, 10, 23, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(211, 11, 1, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(212, 11, 2, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(213, 11, 3, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(214, 11, 4, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(215, 11, 5, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(216, 11, 6, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(217, 11, 7, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(218, 11, 8, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(219, 11, 9, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(220, 11, 10, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(221, 11, 11, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(222, 11, 12, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(223, 11, 13, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(224, 11, 14, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(225, 11, 15, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(226, 11, 16, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(227, 11, 17, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(228, 11, 18, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(229, 11, 19, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(230, 11, 22, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(231, 11, 23, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(232, 12, 1, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(233, 12, 2, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(234, 12, 3, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(235, 12, 4, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(236, 12, 5, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(237, 12, 6, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(238, 12, 7, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(239, 12, 8, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(240, 12, 9, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(241, 12, 10, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(242, 12, 11, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(243, 12, 12, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(244, 12, 13, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(245, 12, 14, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(246, 12, 15, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(247, 12, 16, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(248, 12, 17, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(249, 12, 18, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(250, 12, 19, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(251, 12, 22, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00'),
(252, 12, 23, 0, '2021-03-19 00:21:00', '2021-03-19 00:21:00');

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
(2, 5, 'Arjay Diangzon', 'Passed resignation letter', 2, 1, 1, '2021-03-09 05:33:20', '2021-03-17 07:04:08'),
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
(1, 'Admin', 'Ako To Si', 'Natoy', 'rjpinca@gmail.com', '(+63) 099 0908 595', '(32) 1321 423', '1709 Antel Bldg, Julia Vargas', 'Male', '2021-02-03', 'http://theblackcoders.com', 'admin', 'admin', '0.00', '', '01614667776.svg', 1, 1, '2021-02-26 05:19:00', '2021-03-19 00:29:18'),
(2, 'Operations', 'Akosi', 'RJ', 'hakdog123@gmail.com', '(+63) 545 8987 987', '(54) 6545 646', '1709 Antel Bldg, Julia Vargas', 'Male', '2021-03-05', 'http://theblackcoders.com', 'arjay', 'arjay', '999.95', 'CSS|JS', '01614668556.svg|11614668556.svg|21614668556.svg|31614668556.svg|41614668556.svg|51614668556.svg', 1, 1, '2021-02-26 05:25:07', '2021-03-19 00:29:12'),
(3, 'Admin', 'Charles', 'Vincent', 'charlesvincent@gmail.com', '(+63) 123 2141 242', '(53) 2432 423', 'Quezon City', 'Male', '2021-03-09', 'http://theblackcoders.com', 'charles', 'charles', '0.00', 'CSS|HTML|JS', '01614668026.svg|11614668026.svg|21614668026.svg|31614668026.svg|41614668026.svg|51614668026.svg', 1, 1, '2021-03-02 06:52:07', '2021-03-19 00:28:56'),
(4, 'Admin', 'Joseph', 'Berongoy', 'joseph@gmail.com', '0909900905965', '556565956', 'Pasig City', 'Male', '2021-03-10', 'theblackcoders.com', 'joseph', 'joseph', NULL, NULL, NULL, 1, 1, '2021-03-21 23:56:09', '2021-03-22 00:16:59');

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
(10, 'Marketing', 1, '2021-03-09 23:33:00', '2021-03-09 23:33:00'),
(11, 'Testt', 1, '2021-03-17 05:38:29', '2021-03-17 05:38:29'),
(12, 'Teest', 0, '2021-03-18 03:37:47', '2021-03-18 03:37:47');

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
-- Table structure for table `hris_branch_tbl`
--

CREATE TABLE `hris_branch_tbl` (
  `branchID` bigint(20) NOT NULL,
  `branchCode` text NOT NULL,
  `branchName` text NOT NULL,
  `branchStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hris_branch_tbl`
--

INSERT INTO `hris_branch_tbl` (`branchID`, `branchCode`, `branchName`, `branchStatus`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'BRC-21-00001', 'Mark lang charot', 1, 1, 2, '2021-03-15 06:10:25', '2021-03-15 06:11:55'),
(2, 'BRC-21-00002', 'qweqweqwe', 1, 9, 9, '2021-03-15 07:56:37', '2021-03-15 07:56:37');

-- --------------------------------------------------------

--
-- Table structure for table `hris_change_schedule_tbl`
--

CREATE TABLE `hris_change_schedule_tbl` (
  `changeScheduleID` bigint(20) NOT NULL,
  `changeScheduleCode` varchar(100) NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `changeScheduleDate` date NOT NULL,
  `changeScheduleTimeIn` time NOT NULL,
  `changeScheduleTimeOut` time NOT NULL,
  `changeScheduleReason` text DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `changeScheduleStatus` int(11) NOT NULL,
  `changeScheduleRemarks` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(1, 'Sample Category One', 1, 1, 2, '2021-03-15 03:28:09', '2021-03-12 03:46:42'),
(2, 'Sample Category Two', 1, 1, 2, '2021-03-15 03:28:24', '2021-03-15 03:19:57');

-- --------------------------------------------------------

--
-- Table structure for table `hris_code_conduct_section_tbl`
--

CREATE TABLE `hris_code_conduct_section_tbl` (
  `codeConductSectionID` bigint(20) NOT NULL,
  `codeConductCategoryID` bigint(20) NOT NULL,
  `codeConductSection` varchar(10) NOT NULL,
  `codeConductSectionDescription` text NOT NULL,
  `codeConductSectionStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hris_code_conduct_section_tbl`
--

INSERT INTO `hris_code_conduct_section_tbl` (`codeConductSectionID`, `codeConductCategoryID`, `codeConductSection`, `codeConductSectionDescription`, `codeConductSectionStatus`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(9, 1, '1.1', 'Sample Code Section', 1, 1, 1, '2021-03-15 07:52:15', '2021-03-15 07:52:15');

-- --------------------------------------------------------

--
-- Table structure for table `hris_department_tbl`
--

CREATE TABLE `hris_department_tbl` (
  `departmentID` bigint(20) NOT NULL,
  `departmentCode` varchar(255) NOT NULL,
  `departmentName` varchar(255) NOT NULL,
  `departmentStatus` int(50) NOT NULL,
  `datecreated` text NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hris_designation_tbl`
--

CREATE TABLE `hris_designation_tbl` (
  `designationID` bigint(20) NOT NULL,
  `designationCode` varchar(255) NOT NULL,
  `departmentID` bigint(20) NOT NULL,
  `designationName` varchar(255) NOT NULL,
  `designationStatus` int(50) NOT NULL,
  `datecreated` date NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hris_event_calendar_tbl`
--

CREATE TABLE `hris_event_calendar_tbl` (
  `eventCalendarID` bigint(20) NOT NULL,
  `eventCalendarName` text NOT NULL,
  `eventCalendarBackground` text NOT NULL,
  `eventCalendarDateFrom` date NOT NULL,
  `eventCalendarDateTo` date NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hris_event_calendar_tbl`
--

INSERT INTO `hris_event_calendar_tbl` (`eventCalendarID`, `eventCalendarName`, `eventCalendarBackground`, `eventCalendarDateFrom`, `eventCalendarDateTo`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(4, 'Arjay Event nga', 'bg-violet', '2021-03-15', '2021-03-22', 0, 9, '2021-03-17 01:27:32', '2021-03-17 03:12:22'),
(7, 'Event 1', '', '2021-03-01', '2021-03-05', 0, 9, '2021-03-17 03:29:27', '2021-03-17 03:29:27'),
(10, 'Sample lang', 'bg-red', '2021-03-01', '2021-03-02', 0, 9, '2021-03-17 03:31:06', '2021-03-17 03:31:06'),
(14, 'qweqwe', '', '2021-03-04', '2021-03-07', 0, 9, '2021-03-17 03:34:57', '2021-03-18 05:17:59'),
(15, 'Sammple lang po', 'bg-red', '2021-03-18', '2021-03-20', 0, 9, '2021-03-17 05:10:25', '2021-03-17 05:10:25'),
(16, 'Sample lang po', 'bg-yellow', '2021-03-07', '2021-03-08', 0, 9, '2021-03-17 05:10:47', '2021-03-17 05:10:47');

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
(18, 'HLD-21-00001', 'Independence Dayw', '2021-03-11', 'Regular Holiday', 1, 1, 2, '2021-03-12 02:32:12', '2021-03-15 07:33:23'),
(19, 'HLD-21-00000', 'Sanal All holiday', '2021-04-02', 'Regular Holiday', 1, 1, 2, '2021-03-12 02:32:57', '2021-03-12 02:37:49');

-- --------------------------------------------------------

--
-- Table structure for table `hris_job_posting_tbl`
--

CREATE TABLE `hris_job_posting_tbl` (
  `jobID` bigint(20) NOT NULL,
  `jobCode` varchar(255) NOT NULL,
  `jobCompany` varchar(255) NOT NULL,
  `jobTitle` varchar(255) NOT NULL,
  `jobDescription` longtext NOT NULL,
  `jobResponsibilities` longtext NOT NULL,
  `jobType` varchar(255) NOT NULL,
  `jobCategory` varchar(255) NOT NULL,
  `techSkillsQualification` longtext NOT NULL,
  `jobBenefits` longtext NOT NULL,
  `jobLanguage` varchar(255) NOT NULL,
  `jobSlot` int(50) NOT NULL,
  `salaryRangeSelect` int(50) NOT NULL,
  `salaryRange` decimal(10,2) NOT NULL,
  `jobStatus` int(50) NOT NULL,
  `datecreated` date NOT NULL DEFAULT current_timestamp(),
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(2, 'LON-21-00000', 'Pautang Arjay', 1, 1, 2, '2021-03-12 03:09:55', '2021-03-12 03:10:09'),
(3, 'LON-21-00001', 'qweqwe', 1, 9, 9, '2021-03-15 07:45:10', '2021-03-15 07:45:10'),
(4, 'LON-21-00002', 'qweqweqweqwe', 0, 9, 9, '2021-03-15 07:45:25', '2021-03-15 07:45:53');

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
-- Table structure for table `hris_qualification_tbl`
--

CREATE TABLE `hris_qualification_tbl` (
  `qualificationID` bigint(20) NOT NULL,
  `qualificationName` text NOT NULL,
  `qualificationStatus` int(5) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hris_qualification_tbl`
--

INSERT INTO `hris_qualification_tbl` (`qualificationID`, `qualificationName`, `qualificationStatus`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'Smaple Qualifcation Ones', 0, 1, 2, '2021-03-15 06:39:58', '2021-03-15 06:42:35'),
(2, 'Smaple Qualification Ones', 0, 1, 1, '2021-03-15 06:42:29', '2021-03-15 06:42:29');

-- --------------------------------------------------------

--
-- Table structure for table `hris_requirement_tbl`
--

CREATE TABLE `hris_requirement_tbl` (
  `requirementID` bigint(20) NOT NULL,
  `requirementCode` varchar(255) NOT NULL,
  `requirementName` varchar(255) NOT NULL,
  `requirementDescription` longtext NOT NULL,
  `requirementStatus` int(50) NOT NULL,
  `datecreated` date NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(1, 'Mid Shift', '08:00:00', '17:00:00', 1, '08:00:00', '14:00:00', 0, '08:00:00', '17:00:00', 1, '08:00:00', '17:00:00', 1, '08:00:00', '17:00:00', 1, '08:00:00', '17:00:00', 0, '08:00:00', '17:00:00', 0, 1, 1, 1, '2021-03-11 02:54:03', '2021-03-17 03:44:17'),
(2, 'Morning Shift', '06:00:00', '15:00:00', 1, '06:00:00', '15:00:00', 1, '06:00:00', '15:00:00', 0, '06:00:00', '15:00:00', 0, '06:00:00', '15:00:00', 0, '06:00:00', '15:00:00', 0, '06:00:00', '15:00:00', 0, 0, 0, 0, '2021-03-17 03:32:18', '2021-03-17 03:50:04'),
(3, 'Graveyard', '02:00:00', '10:00:00', 1, '08:00:00', '17:00:00', 0, '08:00:00', '17:00:00', 0, '08:00:00', '17:00:00', 0, '08:00:00', '17:00:00', 0, '08:00:00', '17:00:00', 0, '08:00:00', '17:00:00', 1, 1, 0, 0, '2021-03-17 03:53:29', '2021-03-17 03:54:06');

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
  `categoryCode` varchar(255) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `classificationID` bigint(20) NOT NULL,
  `categoryStatus` varchar(50) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
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

-- --------------------------------------------------------

--
-- Table structure for table `ims_inventory_condition_tbl`
--

CREATE TABLE `ims_inventory_condition_tbl` (
  `conditionID` bigint(20) NOT NULL,
  `conditionCode` varchar(100) NOT NULL,
  `conditionName` varchar(100) NOT NULL,
  `conditionDescription` text NOT NULL,
  `conditionStatus` int(11) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ims_inventory_condition_tbl`
--

INSERT INTO `ims_inventory_condition_tbl` (`conditionID`, `conditionCode`, `conditionName`, `conditionDescription`, `conditionStatus`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'ICO-21-00001', 'Good Condition', 'Good Condition Good Condition Good Condition Good Condition Good Condition ', 1, 0, 0, '2021-03-16 00:55:24', '2021-03-16 00:55:24');

-- --------------------------------------------------------

--
-- Table structure for table `ims_inventory_item_tbl`
--

CREATE TABLE `ims_inventory_item_tbl` (
  `itemID` bigint(20) NOT NULL,
  `itemCode` varchar(255) NOT NULL,
  `inventoryStorageID` bigint(20) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `classificationID` bigint(20) NOT NULL,
  `categoryID` bigint(20) NOT NULL,
  `itemSize` varchar(255) NOT NULL,
  `unitOfMeasurementID` varchar(255) NOT NULL,
  `basePrice` decimal(10,2) NOT NULL,
  `reOrderLevel` int(50) NOT NULL,
  `vatType` varchar(255) NOT NULL,
  `itemStatus` int(50) NOT NULL,
  `datecreated` date NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ims_inventory_storage_tbl`
--

CREATE TABLE `ims_inventory_storage_tbl` (
  `inventoryStorageID` bigint(120) NOT NULL,
  `inventoryStorageCode` varchar(225) NOT NULL,
  `inventoryStorageOfficeName` varchar(80) NOT NULL,
  `inventoryStorageUnitNumber` varchar(80) NOT NULL,
  `inventoryStorageHouseNumber` varchar(80) NOT NULL,
  `inventoryStorageStreetName` varchar(80) NOT NULL,
  `inventoryStorageSubdivisionName` varchar(80) NOT NULL,
  `inventoryStorageBarangay` varchar(80) NOT NULL,
  `inventoryStorageMunicipality` varchar(80) NOT NULL,
  `inventoryStorageProvince` varchar(80) NOT NULL,
  `inventoryStorageRegion` varchar(255) NOT NULL,
  `inventoryStorageCountry` varchar(80) NOT NULL,
  `inventoryStorageZipCode` int(80) NOT NULL,
  `inventoryStorageRoomType` varchar(80) DEFAULT NULL,
  `inventoryStorageDepartment` varchar(80) DEFAULT NULL,
  `inventoryStorageStatus` varchar(120) NOT NULL,
  `createdBy` bigint(80) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedBy` bigint(80) NOT NULL,
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ims_inventory_vendor_tbl`
--

CREATE TABLE `ims_inventory_vendor_tbl` (
  `inventoryVendorID` bigint(20) NOT NULL,
  `inventoryVendorCode` varchar(100) NOT NULL,
  `inventoryVendorName` varchar(100) NOT NULL,
  `inventoryVendorRegion` varchar(100) DEFAULT NULL,
  `inventoryVendorProvince` varchar(100) DEFAULT NULL,
  `inventoryVendorCity` varchar(100) DEFAULT NULL,
  `inventoryVendorBarangay` varchar(100) DEFAULT NULL,
  `inventoryVendorUnit` varchar(100) DEFAULT NULL,
  `inventoryVendorBuilding` varchar(100) DEFAULT NULL,
  `inventoryVendorStreet` varchar(100) DEFAULT NULL,
  `inventoryVendorSubdivision` varchar(100) DEFAULT NULL,
  `inventoryVendorCountry` varchar(100) DEFAULT NULL,
  `inventoryVendorZipCode` varchar(100) DEFAULT NULL,
  `inventoryVendorPerson` varchar(100) NOT NULL,
  `inventoryVendorEmail` varchar(100) NOT NULL,
  `inventoryVendorTIN` varchar(100) NOT NULL,
  `inventoryVendorMobile` varchar(100) NOT NULL,
  `inventoryVendorTelephone` varchar(100) NOT NULL,
  `inventoryVendorBrand` varchar(100) DEFAULT NULL,
  `inventoryVendorVAT` int(11) NOT NULL,
  `inventoryVendorStatus` int(11) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ims_inventory_vendor_tbl`
--

INSERT INTO `ims_inventory_vendor_tbl` (`inventoryVendorID`, `inventoryVendorCode`, `inventoryVendorName`, `inventoryVendorRegion`, `inventoryVendorProvince`, `inventoryVendorCity`, `inventoryVendorBarangay`, `inventoryVendorUnit`, `inventoryVendorBuilding`, `inventoryVendorStreet`, `inventoryVendorSubdivision`, `inventoryVendorCountry`, `inventoryVendorZipCode`, `inventoryVendorPerson`, `inventoryVendorEmail`, `inventoryVendorTIN`, `inventoryVendorMobile`, `inventoryVendorTelephone`, `inventoryVendorBrand`, `inventoryVendorVAT`, `inventoryVendorStatus`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'VEN-21-00001', 'National Bookstore', '01', 'ILOCOS SUR', 'BURGOS', 'BANGBANGAR', '1701', 'Antel', 'Julia Vargas', 'Ortigas', 'Philippines', '1900', 'Arjay Diangzon', 'arjaydiangzon@email.com', '123 421 523 123', '0956 5969 798', '(12) 1234 1233', 'NB', 1, 1, 1, 1, '2021-03-15 06:28:45', '2021-03-16 07:30:16');

-- --------------------------------------------------------

--
-- Table structure for table `pms_category_tbl`
--

CREATE TABLE `pms_category_tbl` (
  `categoryID` bigint(20) NOT NULL,
  `categoryCode` varchar(255) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `categoryStatus` int(50) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `datecreated` date NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pms_client_tbl`
--

CREATE TABLE `pms_client_tbl` (
  `clientID` bigint(20) NOT NULL,
  `clientCode` varchar(255) NOT NULL,
  `clientName` varchar(255) NOT NULL,
  `clientRegion` varchar(255) NOT NULL,
  `clientProvince` varchar(255) NOT NULL,
  `clientCity` varchar(255) NOT NULL,
  `clientBarangay` varchar(255) NOT NULL,
  `clientUnitNumber` varchar(255) NOT NULL,
  `clientHouseNumber` varchar(255) NOT NULL,
  `clientCountry` varchar(255) NOT NULL,
  `clientPostalCode` int(50) NOT NULL,
  `clientContactPerson` varchar(255) NOT NULL,
  `clientEmailAddress` varchar(255) NOT NULL,
  `clientTin` varchar(255) NOT NULL,
  `client_MobileNo` varchar(255) NOT NULL,
  `clientTelephoneNo` varchar(255) NOT NULL,
  `clientBrandName` varchar(255) NOT NULL,
  `clientStatus` int(50) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pms_project_list_tbl`
--

CREATE TABLE `pms_project_list_tbl` (
  `projectListID` bigint(20) NOT NULL,
  `projectListCode` varchar(100) NOT NULL,
  `projectListName` varchar(100) NOT NULL,
  `projectListDescription` text NOT NULL,
  `projectListFrom` date NOT NULL,
  `projectListTo` date NOT NULL,
  `projectListClientID` bigint(20) NOT NULL,
  `projectListManagerID` bigint(20) NOT NULL,
  `projectListLeaderID` bigint(20) NOT NULL,
  `projectListMemberID` varchar(100) NOT NULL,
  `projectListPriorityLevel` int(11) NOT NULL,
  `projectListStatus` int(11) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pms_project_milestone_tbl`
--

CREATE TABLE `pms_project_milestone_tbl` (
  `projectMilestoneID` bigint(20) NOT NULL,
  `projectMilestoneCode` varchar(100) NOT NULL,
  `projectMilestoneName` varchar(100) NOT NULL,
  `projectMilestoneDescription` text NOT NULL,
  `projectMilestoneStatus` int(11) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pms_project_milestone_tbl`
--

INSERT INTO `pms_project_milestone_tbl` (`projectMilestoneID`, `projectMilestoneCode`, `projectMilestoneName`, `projectMilestoneDescription`, `projectMilestoneStatus`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(5, 'MIL-21-00001', 'Milestone 1', 'Milestone Desc', 1, 0, 0, '2021-03-18 01:25:52', '2021-03-18 01:25:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fms_bank_tbl`
--
ALTER TABLE `fms_bank_tbl`
  ADD PRIMARY KEY (`bankID`);

--
-- Indexes for table `fms_chart_of_accounts_tbl`
--
ALTER TABLE `fms_chart_of_accounts_tbl`
  ADD PRIMARY KEY (`chartOfAccountID`);

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
-- Indexes for table `hris_branch_tbl`
--
ALTER TABLE `hris_branch_tbl`
  ADD PRIMARY KEY (`branchID`);

--
-- Indexes for table `hris_change_schedule_tbl`
--
ALTER TABLE `hris_change_schedule_tbl`
  ADD PRIMARY KEY (`changeScheduleID`);

--
-- Indexes for table `hris_code_conduct_category_tbl`
--
ALTER TABLE `hris_code_conduct_category_tbl`
  ADD PRIMARY KEY (`codeConductCategoryID`);

--
-- Indexes for table `hris_code_conduct_section_tbl`
--
ALTER TABLE `hris_code_conduct_section_tbl`
  ADD PRIMARY KEY (`codeConductSectionID`);

--
-- Indexes for table `hris_department_tbl`
--
ALTER TABLE `hris_department_tbl`
  ADD PRIMARY KEY (`departmentID`);

--
-- Indexes for table `hris_designation_tbl`
--
ALTER TABLE `hris_designation_tbl`
  ADD PRIMARY KEY (`designationID`);

--
-- Indexes for table `hris_event_calendar_tbl`
--
ALTER TABLE `hris_event_calendar_tbl`
  ADD PRIMARY KEY (`eventCalendarID`);

--
-- Indexes for table `hris_holiday_tbl`
--
ALTER TABLE `hris_holiday_tbl`
  ADD PRIMARY KEY (`holidayID`);

--
-- Indexes for table `hris_job_posting_tbl`
--
ALTER TABLE `hris_job_posting_tbl`
  ADD PRIMARY KEY (`jobID`);

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
-- Indexes for table `hris_qualification_tbl`
--
ALTER TABLE `hris_qualification_tbl`
  ADD PRIMARY KEY (`qualificationID`);

--
-- Indexes for table `hris_requirement_tbl`
--
ALTER TABLE `hris_requirement_tbl`
  ADD PRIMARY KEY (`requirementID`);

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
-- Indexes for table `ims_inventory_condition_tbl`
--
ALTER TABLE `ims_inventory_condition_tbl`
  ADD PRIMARY KEY (`conditionID`);

--
-- Indexes for table `ims_inventory_item_tbl`
--
ALTER TABLE `ims_inventory_item_tbl`
  ADD PRIMARY KEY (`itemID`);

--
-- Indexes for table `ims_inventory_storage_tbl`
--
ALTER TABLE `ims_inventory_storage_tbl`
  ADD PRIMARY KEY (`inventoryStorageID`);

--
-- Indexes for table `ims_inventory_vendor_tbl`
--
ALTER TABLE `ims_inventory_vendor_tbl`
  ADD PRIMARY KEY (`inventoryVendorID`);

--
-- Indexes for table `pms_category_tbl`
--
ALTER TABLE `pms_category_tbl`
  ADD PRIMARY KEY (`categoryID`);

--
-- Indexes for table `pms_client_tbl`
--
ALTER TABLE `pms_client_tbl`
  ADD PRIMARY KEY (`clientID`);

--
-- Indexes for table `pms_project_list_tbl`
--
ALTER TABLE `pms_project_list_tbl`
  ADD PRIMARY KEY (`projectListID`);

--
-- Indexes for table `pms_project_milestone_tbl`
--
ALTER TABLE `pms_project_milestone_tbl`
  ADD PRIMARY KEY (`projectMilestoneID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fms_bank_tbl`
--
ALTER TABLE `fms_bank_tbl`
  MODIFY `bankID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fms_chart_of_accounts_tbl`
--
ALTER TABLE `fms_chart_of_accounts_tbl`
  MODIFY `chartOfAccountID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gen_approval_setup_tbl`
--
ALTER TABLE `gen_approval_setup_tbl`
  MODIFY `approvalID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `gen_module_category_tbl`
--
ALTER TABLE `gen_module_category_tbl`
  MODIFY `moduleCategoryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `gen_module_header_tbl`
--
ALTER TABLE `gen_module_header_tbl`
  MODIFY `moduleHeaderID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `gen_module_list_tbl`
--
ALTER TABLE `gen_module_list_tbl`
  MODIFY `moduleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `gen_operations_tbl`
--
ALTER TABLE `gen_operations_tbl`
  MODIFY `userAccountID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `gen_roles_permission_tbl`
--
ALTER TABLE `gen_roles_permission_tbl`
  MODIFY `permissionID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=253;

--
-- AUTO_INCREMENT for table `gen_system_notification_tbl`
--
ALTER TABLE `gen_system_notification_tbl`
  MODIFY `notificationID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `gen_user_account_tbl`
--
ALTER TABLE `gen_user_account_tbl`
  MODIFY `userAccountID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `gen_user_role_tbl`
--
ALTER TABLE `gen_user_role_tbl`
  MODIFY `roleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `hris_award_tbl`
--
ALTER TABLE `hris_award_tbl`
  MODIFY `awardID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hris_branch_tbl`
--
ALTER TABLE `hris_branch_tbl`
  MODIFY `branchID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hris_change_schedule_tbl`
--
ALTER TABLE `hris_change_schedule_tbl`
  MODIFY `changeScheduleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hris_code_conduct_category_tbl`
--
ALTER TABLE `hris_code_conduct_category_tbl`
  MODIFY `codeConductCategoryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hris_code_conduct_section_tbl`
--
ALTER TABLE `hris_code_conduct_section_tbl`
  MODIFY `codeConductSectionID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `hris_department_tbl`
--
ALTER TABLE `hris_department_tbl`
  MODIFY `departmentID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_designation_tbl`
--
ALTER TABLE `hris_designation_tbl`
  MODIFY `designationID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_event_calendar_tbl`
--
ALTER TABLE `hris_event_calendar_tbl`
  MODIFY `eventCalendarID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `hris_holiday_tbl`
--
ALTER TABLE `hris_holiday_tbl`
  MODIFY `holidayID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `hris_job_posting_tbl`
--
ALTER TABLE `hris_job_posting_tbl`
  MODIFY `jobID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_leave_tbl`
--
ALTER TABLE `hris_leave_tbl`
  MODIFY `leaveID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hris_loan_tbl`
--
ALTER TABLE `hris_loan_tbl`
  MODIFY `loanID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hris_philhealth_table_tbl`
--
ALTER TABLE `hris_philhealth_table_tbl`
  MODIFY `phID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hris_qualification_tbl`
--
ALTER TABLE `hris_qualification_tbl`
  MODIFY `qualificationID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hris_requirement_tbl`
--
ALTER TABLE `hris_requirement_tbl`
  MODIFY `requirementID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_schedule_setup_tbl`
--
ALTER TABLE `hris_schedule_setup_tbl`
  MODIFY `scheduleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `classificationID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `ims_inventory_condition_tbl`
--
ALTER TABLE `ims_inventory_condition_tbl`
  MODIFY `conditionID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ims_inventory_item_tbl`
--
ALTER TABLE `ims_inventory_item_tbl`
  MODIFY `itemID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ims_inventory_storage_tbl`
--
ALTER TABLE `ims_inventory_storage_tbl`
  MODIFY `inventoryStorageID` bigint(120) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ims_inventory_vendor_tbl`
--
ALTER TABLE `ims_inventory_vendor_tbl`
  MODIFY `inventoryVendorID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pms_category_tbl`
--
ALTER TABLE `pms_category_tbl`
  MODIFY `categoryID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pms_client_tbl`
--
ALTER TABLE `pms_client_tbl`
  MODIFY `clientID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pms_project_list_tbl`
--
ALTER TABLE `pms_project_list_tbl`
  MODIFY `projectListID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pms_project_milestone_tbl`
--
ALTER TABLE `pms_project_milestone_tbl`
  MODIFY `projectMilestoneID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
