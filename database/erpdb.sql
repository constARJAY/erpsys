-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2021 at 09:15 AM
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

--
-- Dumping data for table `fms_bank_tbl`
--

INSERT INTO `fms_bank_tbl` (`bankID`, `bankCode`, `bankName`, `bankNumber`, `bankStatus`, `datecreated`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'VEN-21-00001', 'BSP', '12345121321', 1, '2021-03-23', 3, 3, '2021-03-23 10:02:31', '0000-00-00 00:00:00'),
(2, 'VEN-21-00002', 'Test', '12321312312321', 0, '2021-03-25', 1, 1, '2021-03-25 13:24:27', '2021-03-25 13:24:32');

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

--
-- Dumping data for table `fms_chart_of_accounts_tbl`
--

INSERT INTO `fms_chart_of_accounts_tbl` (`chartOfAccountID`, `bankID`, `accountCode`, `accountName`, `accountDescription`, `accountLevel`, `ledgerClassificationID`, `accountGrouping`, `financialStatement`, `accountStatus`, `accountDatecreated`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 1, '132', '12312', '123123', '123123', 1, 'Non-current Asset', 'Equity', 1, '2021-03-23', 3, 3, '2021-03-23 10:02:54', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `gen_approval_setup_tbl`
--

CREATE TABLE `gen_approval_setup_tbl` (
  `approvalID` bigint(20) NOT NULL,
  `moduleID` bigint(20) NOT NULL,
  `moduleName` varchar(100) DEFAULT NULL,
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

INSERT INTO `gen_approval_setup_tbl` (`approvalID`, `moduleID`, `moduleName`, `roleID`, `userAccountID`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 55, 'Leave Request', 1, '0', 1, 1, '2021-03-25', '2021-03-25 06:45:37'),
(2, 55, 'Leave Request', 2, '4|3|1', 1, 1, '2021-03-25', '2021-03-25 06:46:25'),
(3, 55, 'Leave Request', 3, '0', 1, 1, '2021-03-25', '2021-03-25 06:45:37'),
(4, 55, 'Leave Request', 4, '0', 1, 1, '2021-03-25', '2021-03-25 06:45:38'),
(5, 33, 'Inventory Receiving', 1, '0', 2, 2, '2021-03-26', '2021-03-26 00:02:12'),
(6, 33, 'Inventory Receiving', 2, '0', 2, 2, '2021-03-26', '2021-03-26 00:02:12'),
(7, 33, 'Inventory Receiving', 3, '0', 2, 2, '2021-03-26', '2021-03-26 00:02:12'),
(8, 33, 'Inventory Receiving', 4, '0', 2, 2, '2021-03-26', '2021-03-26 00:02:12'),
(9, 60, 'Change Schedule', 2, '4|2|1', 1, 1, '2021-03-26', '2021-03-26 06:03:30'),
(10, 60, 'Change Schedule', 3, '4|5|1', 1, 1, '2021-03-26', '2021-03-26 02:06:23'),
(11, 60, 'Change Schedule', 4, '5|6|1', 1, 1, '2021-03-26', '2021-03-26 02:09:42'),
(12, 60, 'Change Schedule', 5, '7|2|1', 1, 1, '2021-03-26', '2021-03-26 02:09:54'),
(13, 60, 'Change Schedule', 6, '3|4|1', 1, 1, '2021-03-26', '2021-03-26 02:10:08'),
(14, 60, 'Change Schedule', 7, '5|6|1', 1, 1, '2021-03-26', '2021-03-26 02:10:24'),
(15, 60, 'Change Schedule', 8, '2|6|1', 1, 1, '2021-03-26', '2021-03-26 02:10:38');

-- --------------------------------------------------------

--
-- Table structure for table `gen_ledger_classification_tbl`
--

CREATE TABLE `gen_ledger_classification_tbl` (
  `ledgerClassificationID` bigint(20) NOT NULL,
  `ledgerClassificationName` varchar(255) NOT NULL,
  `ledgerClassificationDatecreated` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gen_ledger_classification_tbl`
--

INSERT INTO `gen_ledger_classification_tbl` (`ledgerClassificationID`, `ledgerClassificationName`, `ledgerClassificationDatecreated`) VALUES
(1, 'test', '2021-03-25'),
(2, 'Test', '2021-03-25');

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
(1, 5, 1, '01616719509.svg', 'System Setting', 1, '2021-03-23 22:19:25', '2021-03-26 00:45:09'),
(2, 2, 1, '01616718702.svg', 'Masterfiles', 1, '2021-03-23 22:19:25', '2021-03-26 00:31:42'),
(3, 2, 2, '01616718748.svg', 'Inventory Modules', 1, '2021-03-23 22:19:25', '2021-03-26 00:32:28'),
(4, 2, 3, '01616719413.svg', 'Employee Forms', 1, '2021-03-23 22:19:25', '2021-03-26 00:43:33'),
(5, 2, 4, '01616719426.svg', 'Project Modules', 1, '2021-03-23 22:19:25', '2021-03-26 00:43:46'),
(6, 4, 1, '01616719495.svg', 'Reports', 1, '2021-03-23 22:19:25', '2021-03-26 00:44:55'),
(7, 2, 5, '01616719437.svg', 'Finance Modules', 1, '2021-03-23 22:19:25', '2021-03-26 00:43:57'),
(8, 2, 6, '01616719446.svg', 'HR Modules', 1, '2021-03-23 22:19:25', '2021-03-26 00:44:06'),
(9, 5, 2, '01616719521.svg', 'System Setup', 1, '2021-03-23 22:19:25', '2021-03-26 00:45:21'),
(10, 2, 7, '01616719468.svg', 'Recruitment Modules', 1, '2021-03-23 22:19:25', '2021-03-26 00:44:28'),
(11, 2, 8, '01616719482.svg', 'Payroll Modules', 1, '2021-03-23 22:19:25', '2021-03-26 00:44:42'),
(12, 1, 1, '01616718684.svg', 'Dashboard', 1, '2021-03-23 22:53:33', '2021-03-26 00:31:24');

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
(1, 1, 'Main', 1, '2021-03-23 23:26:04', '2021-03-23 23:26:05'),
(2, 2, 'Forms', 1, '2021-03-18 23:26:06', '2021-03-23 23:26:08'),
(3, 3, 'Management', 1, '2021-03-16 23:26:09', '2021-03-23 23:26:10'),
(4, 4, 'Reports', 1, '2021-03-07 23:26:11', '2021-03-23 23:26:12'),
(5, 5, 'Settings', 1, '2021-03-16 23:26:12', '2021-03-23 23:26:13');

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
(1, 5, 1, 1, 'Inventory Management System|Project Management System|Finance Management System|Human Resource Information System', NULL, 'Approval Setup', 0, 'approval_setup', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(2, 5, 1, 2, 'Inventory Management System|Project Management System|Finance Management System|Human Resource Information System', NULL, 'Roles and Permission', 0, 'roles_permission', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(3, 5, 1, 3, 'Inventory Management System|Project Management System|Finance Management System|Human Resource Information System', NULL, 'System Notification', 0, 'system_notification', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(4, 2, 2, 1, 'Inventory Management System', NULL, 'Inventory Item', 0, 'ims/inventory_item', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(5, 2, 2, 2, 'Inventory Management System', NULL, 'Inventory Category', 0, 'ims/inventory_category', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(6, 2, 2, 3, 'Inventory Management System', NULL, 'Inventory Classification', 0, 'ims/inventory_classification', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(7, 2, 2, 4, 'Inventory Management System', NULL, 'Inventory Storage', 0, 'ims/inventory_storage', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(8, 2, 2, 5, 'Inventory Management System', NULL, 'Inventory Vendor', 0, 'ims/inventory_vendor', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(9, 2, 2, 6, 'Inventory Management System', NULL, 'Inventory Condition', 0, 'ims/inventory_condition', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(10, 2, 2, 7, 'Project Management System', NULL, 'Project Milestone', 0, 'pms/project_milestone', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(11, 2, 2, 8, 'Project Management System', NULL, 'Project List', 0, 'pms/project_list', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(12, 2, 2, 9, 'Project Management System', NULL, 'Project Client', 0, 'pms/project_client', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(13, 2, 2, 10, 'Project Management System', NULL, 'Project Category', 0, 'pms/project_category', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(14, 2, 2, 11, 'Finance Management System', NULL, 'Bank', 0, 'fms/bank', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(15, 2, 2, 12, 'Finance Management System', NULL, 'Chart of Accounts', 0, 'fms/chart_of_account', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(16, 2, 2, 13, 'Finance Management System', NULL, 'Ledger Classification', 0, 'fms/ledger_classification', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(17, 2, 2, 14, 'Human Resource Information System', NULL, 'Designation', 0, 'hris/designation', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(18, 2, 2, 15, 'Human Resource Information System', NULL, 'Department', 0, 'hris/department', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(19, 2, 2, 16, 'Human Resource Information System', NULL, 'Requirement', 0, 'hris/requirement', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(20, 2, 2, 17, 'Human Resource Information System', NULL, 'Holiday', 0, 'hris/holiday', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(21, 2, 2, 18, 'Human Resource Information System', NULL, 'Leave Type', 0, 'hris/leave_type', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(22, 2, 2, 19, 'Human Resource Information System', NULL, 'Loan Type', 0, 'hris/loan_type', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(23, 2, 2, 20, 'Human Resource Information System', NULL, 'Code of Conduct Category', 0, 'hris/code_conduct_category', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(24, 2, 2, 21, 'Human Resource Information System', NULL, 'Code of Conduct Section', 0, 'hris/code_conduct_section', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(25, 2, 2, 22, 'Human Resource Information System', NULL, 'Branch', 0, 'hris/branch', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(26, 2, 2, 23, 'Human Resource Information System', NULL, 'Qualification', 0, 'hris/qualification', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(27, 2, 2, 24, 'Human Resource Information System', NULL, 'Award', 0, 'hris/award', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(28, 2, 2, 25, 'Human Resource Information System', NULL, 'SSS Table', 0, 'hris/sss_table', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(29, 2, 2, 26, 'Human Resource Information System', NULL, 'PhilHealth Table', 0, 'hris/philhealth_table', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(30, 2, 2, 27, 'Human Resource Information System', NULL, 'Tax Table', 0, 'hris/tax_table', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(31, 2, 2, 28, 'Human Resource Information System', NULL, 'Training and Development', 0, 'hris/training_development', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(32, 2, 2, 29, 'Human Resource Information System', NULL, 'Examination', 0, 'hris/examination', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(33, 2, 3, 1, 'Inventory Management System', NULL, 'Inventory Receiving', 3, 'ims/inventory_receiving', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(34, 2, 3, 2, 'Inventory Management System', NULL, 'List of Stocks', 0, 'ims/list_stocks', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(35, 2, 3, 3, 'Inventory Management System', NULL, 'Return Item', 3, 'ims/return_item', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(36, 2, 3, 4, 'Inventory Management System', NULL, 'Disposal', 3, 'ims/disposal', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(37, 2, 3, 5, 'Inventory Management System', NULL, 'Transfer Request', 3, 'ims/transfer_request', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(38, 2, 3, 6, 'Inventory Management System', NULL, 'Cost Estimate', 3, 'ims/cost_estimate', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(39, 2, 3, 7, 'Inventory Management System', NULL, 'Bill of Material', 3, 'ims/bill_material', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(40, 2, 3, 8, 'Inventory Management System', NULL, 'Bid Recap', 3, 'ims/bid_recap', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(41, 2, 3, 9, 'Inventory Management System', NULL, 'Service Order', 3, 'ims/service_order', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(42, 2, 4, 1, 'Inventory Management System', NULL, 'Material Withdrawal', 3, 'ims/material_withdrawal', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(43, 2, 4, 2, 'Inventory Management System', NULL, 'Equipment Borrowing', 3, 'ims/equipment_borrowing', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(44, 2, 4, 3, 'Inventory Management System', NULL, 'Inventory Incident', 3, 'ims/inventory_incident', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(45, 2, 4, 4, 'Inventory Management System', NULL, 'Material Usage', 3, 'ims/material_usage', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(46, 2, 4, 5, 'Inventory Management System', NULL, 'Purchase Request', 3, 'ims/purchase_request', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(47, 2, 4, 6, 'Inventory Management System', NULL, 'Purchase Order', 3, 'ims/purchase_order', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(48, 2, 4, 7, 'Inventory Management System', NULL, 'Item Price List', 0, 'ims/item_price_list', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(49, 2, 4, 8, 'Inventory Management System', NULL, 'Service Order Requisition', 3, 'ims/service_order_requisition', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(50, 2, 4, 9, 'Project Management System', NULL, 'Personel Requisition', 3, 'pms/personel_requisition', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(51, 2, 4, 10, 'Project Management System', NULL, 'Employee Taskboard', 3, 'pms/employee_taskboard', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(52, 2, 4, 11, 'Project Management System', NULL, 'Sign-off', 3, 'pms/sign_off', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(53, 2, 4, 12, 'Finance Management System', NULL, 'Petty Cash Request', 3, 'fms/petty_cash_request', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(54, 2, 4, 13, 'Finance Management System', NULL, 'Client Fund Request', 3, 'fms/client_fund_request', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(55, 2, 4, 14, 'Human Resource Information System', NULL, 'Leave Request', 3, 'hris/leave_request', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(56, 2, 4, 15, 'Human Resource Information System', NULL, 'Overtime Request', 3, 'hris/overtime_request', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(57, 2, 4, 16, 'Human Resources Information System', NULL, 'No Time In/Out', 3, 'hris/no_timein_timeout', 1, '2021-03-23 23:22:25', '2021-03-25 05:53:42'),
(58, 2, 4, 17, 'Human Resource Information System', NULL, 'Official Business', 3, 'hris/official_business', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(59, 2, 4, 18, 'Human Resource Information System', NULL, 'Loan', 3, 'hris/loan', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(60, 2, 4, 19, 'Human Resource Information System', NULL, 'Change Schedule', 3, 'hris/change_schedule', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(61, 2, 4, 20, 'Human Resource Information System', NULL, 'Employee Evaluation', 3, 'hris/employee_evaluation', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(62, 2, 4, 21, 'Human Resource Information System', NULL, 'Clearance', 3, 'hris/clearance', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(63, 6, 4, 1, 'Inventory Management System', NULL, 'Purhcase Order Report', 0, 'ims/purchase_order_report', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(64, 6, 4, 2, 'Inventory Management System', NULL, 'Receiving Report', 0, 'ims/receiving_report', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(65, 6, 4, 3, 'Inventory Management System', NULL, 'Inventory Incident Report', 0, 'ims/inventory_incident_report', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(66, 6, 4, 4, 'Inventory Management System', NULL, 'Inventory Report', 0, 'ims/inventory_report', 1, '2021-03-23 23:22:25', '2021-03-23 23:22:25'),
(67, 1, 12, 1, 'Inventory Management System', NULL, 'Inventory Dashboard', 0, 'ims/inventory_dashboard', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(68, 1, 12, 2, 'Project Management System', NULL, 'Project Dashboard', 0, 'pms/project_dashboard', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(69, 1, 12, 3, 'Finance Management System', NULL, 'Finance Dashboard', 0, 'fms/finance_dashboard', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(70, 1, 12, 4, 'Human Resource Information System', NULL, 'HRIS Dashboard', 0, 'hris/hr_dashboard', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(71, 4, 6, 5, 'Project Management System', NULL, 'Project Management', 0, 'fms/project_management', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(72, 4, 6, 6, 'Project Management System', NULL, 'Project Task', 0, 'fms/project_task', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(73, 4, 6, 7, 'Project Management System', NULL, 'Project Timeline', 0, 'fms/project_timeline', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(74, 4, 6, 8, 'Finance Management System', NULL, 'Petty Cash Voucher', 0, 'fms/petty_cash_voucher', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(75, 4, 6, 9, 'Finance Management System', NULL, 'Client Fund Voucher', 0, 'fms/client_fund_voucher', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(76, 4, 6, 10, 'Finance Management System', NULL, 'Payment Request', 0, 'fms/payment_request', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(77, 4, 6, 11, 'Finance Management System', NULL, 'Check Voucher', 0, 'fms/check_voucher', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(78, 4, 6, 12, 'Human Resource Information System', NULL, 'Examination Report', 0, 'hris/examination_report', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(79, 4, 6, 13, 'Human Resource Information System', NULL, 'Timekeeping Report', 0, 'hris/timekeeping_report', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(80, 4, 6, 14, 'Human Resource Information System', NULL, 'Payroll Report', 0, 'hris/payroll_report', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(81, 4, 6, 15, 'Human Resource Information System', NULL, 'Payroll Adjustment Report', 0, 'hris/payroll_adjustment_report', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(82, 4, 6, 16, 'Human Resource Information System', NULL, 'Payslip Generation', 0, 'hris/payslip_generation', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(83, 4, 6, 17, 'Human Resource Information System', NULL, '13th Month Report', 0, 'hris/13th_month_report', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(84, 4, 6, 18, 'Human Resource Information System', NULL, 'PHIC Premium Payment', 0, 'hris/phic_premium_payment', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(85, 4, 6, 19, 'Human Resource Information System', NULL, 'SSS Premium Payment', 0, 'hris/sss_premium_payment', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(86, 4, 6, 20, 'Human Resource Information System', NULL, 'HDMF Premim Payment', 0, 'hris/hdmf_premium_payment', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(87, 4, 6, 21, 'Human Resource Information System', NULL, 'Manpower Management Report', 0, 'hris/manpower_management_report', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(88, 1, 12, 5, 'Human Resource Information System', NULL, 'Employee Dashboard', 0, 'hris/employee_dashboard', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(89, 2, 5, 1, 'Project Management System', NULL, 'Milestone Builder', 3, 'pms/milestone_builder', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(90, 2, 5, 2, 'Project Management System', NULL, 'Project Timeline Builder', 0, 'pms/project_timeline_builder', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(91, 2, 5, 3, 'Project Management System', NULL, 'Manage Project Budget', 3, 'pms/manage_project_budget', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(92, 2, 5, 4, 'Project Management System', NULL, 'Project Management Board', 3, 'pms/project_management_board', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(93, 2, 7, 1, 'Finance Management System', NULL, 'Petty Cash Voucher', 3, 'fms/petty_cash_voucher', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(94, 2, 7, 2, 'Finance Management System', NULL, 'Client Fund Voucher', 3, 'fms/client_fund_voucher', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(95, 2, 7, 3, 'Finance Management System', NULL, 'Payment Request', 3, 'fms/payment_request', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(96, 2, 7, 4, 'Finance Management System', NULL, 'Check Voucher', 3, 'fms/check_voucher', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(97, 2, 7, 5, 'Finance Management System', NULL, 'Check Writer', 3, 'fms/check_writer', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(98, 2, 7, 6, 'Finance Management System', NULL, 'Check Voucher Liquidation', 3, 'fms/check_voucher_liquidation', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(99, 2, 7, 7, 'Finance Management System', NULL, 'Billing', 3, 'fms/billing', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(100, 2, 7, 8, 'Finance Management System', NULL, 'Collection', 3, 'fms/collection', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(101, 5, 9, 1, 'Human Resource Information System', NULL, 'Schedule Setup', 0, 'hris/schedule_setup', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(102, 5, 9, 2, 'Human Resource Information System', NULL, 'Orientation Setup', 0, 'hris/orientation_setup', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(103, 2, 10, 1, 'Human Resources Information System', NULL, 'Job Posting', 0, 'hris/job_posting', 1, '2021-03-23 23:22:25', '2021-03-25 05:25:43'),
(104, 2, 10, 2, 'Human Resource Information System', NULL, 'Applicant Registration', 0, 'hris/application_registration', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(105, 2, 10, 3, 'Human Resource Information System', NULL, 'Examination', 0, 'hris/examination', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(106, 2, 10, 4, 'Human Resource Information System', NULL, 'Applicant List', 0, 'hris/applicant_list', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(107, 2, 10, 5, 'Human Resource Information System', NULL, 'On-boarding', 0, 'hris/on_boarding', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(108, 2, 11, 1, 'Human Resource Information System', NULL, 'Employee Attendance', 0, 'hris/employee_attendance', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(109, 2, 11, 2, 'Human Resource Information System', NULL, 'Timekeeping', 0, 'hris/timekeeping', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(110, 2, 11, 3, 'Human Resource Information System', NULL, 'Payroll', 0, 'hris/payroll', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(111, 2, 11, 4, 'Human Resource Information System', NULL, 'Payroll Adjustment', 0, 'hris/payroll_adjustment', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(112, 2, 11, 5, 'Human Resource Information System', NULL, '13th Month', 0, 'hris/13th_month', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(113, 2, 8, 1, 'Human Resource Information System', NULL, 'Personnel Requisition', 0, 'hris/personnel_requisition', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(114, 2, 8, 2, 'Human Resource Information System', NULL, 'Employee', 0, 'hris/employee', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(115, 2, 8, 3, 'Human Resource Information System', NULL, 'Personal Action Notice', 0, 'hris/personal_action_notice', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(116, 2, 8, 4, 'Human Resource Information System', NULL, 'Manpower Management', 0, 'hris/manpower_management', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(117, 2, 8, 5, 'Human Resource Information System', NULL, 'Employee Relation', 0, 'hris/employee_relation', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(118, 2, 8, 6, 'Human Resource Information System', NULL, 'Employee Evaluation', 0, 'hris/employee_evaluation', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(119, 2, 8, 7, 'Human Resource Information System', NULL, 'Employee Management', 0, 'hris/employee_management', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(120, 2, 8, 8, 'Human Resource Information System', NULL, 'Memorandum', 0, 'hris/memorandum', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(121, 2, 8, 9, 'Human Resource Information System', NULL, 'Employee Award', 0, 'hris/employee_award', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(122, 2, 8, 10, 'Human Resource Information System', NULL, 'Leave Monitoring', 0, 'hris/leave_monitoring', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(123, 2, 8, 11, 'Human Resource Information System', NULL, 'Training and Development', 0, 'hris/training_development', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14'),
(124, 2, 8, 12, 'Human Resource Information System', NULL, 'Event Calendar', 0, 'hris/event_calendar', 1, '2021-03-23 23:22:25', '2021-03-23 23:58:14');

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
(1, 1, 1, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(2, 1, 2, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(3, 1, 3, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(4, 1, 4, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(5, 1, 5, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(6, 1, 6, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(7, 1, 7, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(8, 1, 8, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(9, 1, 9, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(10, 1, 10, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(11, 1, 11, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(12, 1, 12, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(13, 1, 13, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(14, 1, 14, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(15, 1, 15, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(16, 1, 16, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(17, 1, 17, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(18, 1, 18, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(19, 1, 19, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(20, 1, 20, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(21, 1, 21, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(22, 1, 22, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(23, 1, 23, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(24, 1, 24, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(25, 1, 25, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(26, 1, 26, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(27, 1, 27, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(28, 1, 28, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(29, 1, 29, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(30, 1, 30, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(31, 1, 31, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(32, 1, 32, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(33, 1, 33, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(34, 1, 34, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(35, 1, 35, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(36, 1, 36, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(37, 1, 37, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(38, 1, 38, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(39, 1, 39, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(40, 1, 40, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(41, 1, 41, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(42, 1, 42, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(43, 1, 43, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(44, 1, 44, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(45, 1, 45, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(46, 1, 46, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(47, 1, 47, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(48, 1, 48, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(49, 1, 49, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(50, 1, 50, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(51, 1, 51, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(52, 1, 52, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(53, 1, 53, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(54, 1, 54, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(55, 1, 55, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(56, 1, 56, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(57, 1, 57, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(58, 1, 58, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(59, 1, 59, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(60, 1, 60, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(61, 1, 61, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(62, 1, 62, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(63, 1, 63, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(64, 1, 64, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(65, 1, 65, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(66, 1, 66, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(67, 1, 67, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(68, 1, 68, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(69, 1, 69, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(70, 1, 70, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(71, 1, 71, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(72, 1, 72, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(73, 1, 73, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(74, 1, 74, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(75, 1, 75, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(76, 1, 76, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(77, 1, 77, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(78, 1, 78, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(79, 1, 79, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(80, 1, 80, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(81, 1, 81, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(82, 1, 82, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(83, 1, 83, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(84, 1, 84, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(85, 1, 85, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(86, 1, 86, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(87, 1, 87, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(88, 1, 88, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(89, 1, 89, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(90, 1, 90, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(91, 1, 91, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(92, 1, 92, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(93, 1, 93, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(94, 1, 94, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(95, 1, 95, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(96, 1, 96, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(97, 1, 97, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(98, 1, 98, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(99, 1, 99, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(100, 1, 100, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(101, 1, 101, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(102, 1, 102, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(103, 1, 103, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(104, 1, 104, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(105, 1, 105, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(106, 1, 106, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(107, 1, 107, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(108, 1, 108, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(109, 1, 109, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(110, 1, 110, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(111, 1, 111, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(112, 1, 112, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(113, 1, 113, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(114, 1, 114, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(115, 1, 115, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(116, 1, 116, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(117, 1, 117, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(118, 1, 118, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(119, 1, 119, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(120, 1, 120, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(121, 1, 121, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(122, 1, 122, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(123, 1, 123, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(124, 1, 124, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(125, 2, 1, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(126, 2, 2, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(127, 2, 3, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(128, 2, 4, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(129, 2, 5, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(130, 2, 6, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(131, 2, 7, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(132, 2, 8, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(133, 2, 9, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(134, 2, 10, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(135, 2, 11, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(136, 2, 12, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(137, 2, 13, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(138, 2, 14, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(139, 2, 15, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(140, 2, 16, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(141, 2, 17, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(142, 2, 18, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(143, 2, 19, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(144, 2, 20, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(145, 2, 21, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(146, 2, 22, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(147, 2, 23, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(148, 2, 24, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(149, 2, 25, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(150, 2, 26, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(151, 2, 27, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(152, 2, 28, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(153, 2, 29, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(154, 2, 30, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(155, 2, 31, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(156, 2, 32, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(157, 2, 33, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(158, 2, 34, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(159, 2, 35, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(160, 2, 36, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(161, 2, 37, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(162, 2, 38, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(163, 2, 39, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(164, 2, 40, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(165, 2, 41, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(166, 2, 42, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(167, 2, 43, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(168, 2, 44, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(169, 2, 45, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(170, 2, 46, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(171, 2, 47, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(172, 2, 48, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(173, 2, 49, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(174, 2, 50, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(175, 2, 51, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(176, 2, 52, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(177, 2, 53, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(178, 2, 54, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(179, 2, 55, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(180, 2, 56, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(181, 2, 57, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(182, 2, 58, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(183, 2, 59, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(184, 2, 60, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(185, 2, 61, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(186, 2, 62, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(187, 2, 63, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(188, 2, 64, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(189, 2, 65, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(190, 2, 66, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(191, 2, 67, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(192, 2, 68, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(193, 2, 69, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(194, 2, 70, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(195, 2, 71, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(196, 2, 72, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(197, 2, 73, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(198, 2, 74, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(199, 2, 75, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(200, 2, 76, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(201, 2, 77, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(202, 2, 78, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(203, 2, 79, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(204, 2, 80, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(205, 2, 81, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(206, 2, 82, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(207, 2, 83, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(208, 2, 84, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(209, 2, 85, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(210, 2, 86, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(211, 2, 87, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(212, 2, 88, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(213, 2, 89, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(214, 2, 90, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(215, 2, 91, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(216, 2, 92, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(217, 2, 93, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(218, 2, 94, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(219, 2, 95, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(220, 2, 96, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(221, 2, 97, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(222, 2, 98, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(223, 2, 99, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(224, 2, 100, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(225, 2, 101, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(226, 2, 102, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(227, 2, 103, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(228, 2, 104, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(229, 2, 105, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(230, 2, 106, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(231, 2, 107, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(232, 2, 108, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(233, 2, 109, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(234, 2, 110, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(235, 2, 111, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(236, 2, 112, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(237, 2, 113, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(238, 2, 114, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(239, 2, 115, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(240, 2, 116, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(241, 2, 117, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(242, 2, 118, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(243, 2, 119, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(244, 2, 120, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(245, 2, 121, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(246, 2, 122, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(247, 2, 123, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(248, 2, 124, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(249, 3, 1, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(250, 3, 2, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(251, 3, 3, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(252, 3, 4, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(253, 3, 5, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(254, 3, 6, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(255, 3, 7, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(256, 3, 8, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(257, 3, 9, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(258, 3, 10, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(259, 3, 11, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(260, 3, 12, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(261, 3, 13, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(262, 3, 14, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(263, 3, 15, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(264, 3, 16, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(265, 3, 17, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(266, 3, 18, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(267, 3, 19, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(268, 3, 20, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(269, 3, 21, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(270, 3, 22, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(271, 3, 23, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(272, 3, 24, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(273, 3, 25, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(274, 3, 26, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(275, 3, 27, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(276, 3, 28, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(277, 3, 29, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(278, 3, 30, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(279, 3, 31, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(280, 3, 32, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(281, 3, 33, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(282, 3, 34, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(283, 3, 35, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(284, 3, 36, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(285, 3, 37, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(286, 3, 38, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(287, 3, 39, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(288, 3, 40, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(289, 3, 41, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(290, 3, 42, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(291, 3, 43, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(292, 3, 44, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(293, 3, 45, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(294, 3, 46, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(295, 3, 47, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(296, 3, 48, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(297, 3, 49, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(298, 3, 50, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(299, 3, 51, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(300, 3, 52, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(301, 3, 53, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(302, 3, 54, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(303, 3, 55, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(304, 3, 56, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(305, 3, 57, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(306, 3, 58, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(307, 3, 59, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(308, 3, 60, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(309, 3, 61, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(310, 3, 62, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(311, 3, 63, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(312, 3, 64, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(313, 3, 65, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(314, 3, 66, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(315, 3, 67, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(316, 3, 68, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(317, 3, 69, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(318, 3, 70, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(319, 3, 71, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(320, 3, 72, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(321, 3, 73, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(322, 3, 74, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(323, 3, 75, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(324, 3, 76, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(325, 3, 77, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(326, 3, 78, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(327, 3, 79, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(328, 3, 80, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(329, 3, 81, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(330, 3, 82, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(331, 3, 83, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(332, 3, 84, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(333, 3, 85, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(334, 3, 86, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(335, 3, 87, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(336, 3, 88, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(337, 3, 89, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(338, 3, 90, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(339, 3, 91, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(340, 3, 92, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(341, 3, 93, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(342, 3, 94, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(343, 3, 95, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(344, 3, 96, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(345, 3, 97, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(346, 3, 98, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(347, 3, 99, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(348, 3, 100, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(349, 3, 101, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(350, 3, 102, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(351, 3, 103, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(352, 3, 104, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(353, 3, 105, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(354, 3, 106, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(355, 3, 107, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(356, 3, 108, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(357, 3, 109, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(358, 3, 110, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(359, 3, 111, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(360, 3, 112, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(361, 3, 113, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(362, 3, 114, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(363, 3, 115, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(364, 3, 116, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(365, 3, 117, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(366, 3, 118, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(367, 3, 119, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(368, 3, 120, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(369, 3, 121, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(370, 3, 122, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(371, 3, 123, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(372, 3, 124, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(373, 4, 1, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(374, 4, 2, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(375, 4, 3, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(376, 4, 4, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(377, 4, 5, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(378, 4, 6, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(379, 4, 7, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(380, 4, 8, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(381, 4, 9, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(382, 4, 10, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(383, 4, 11, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(384, 4, 12, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(385, 4, 13, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(386, 4, 14, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(387, 4, 15, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(388, 4, 16, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(389, 4, 17, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(390, 4, 18, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(391, 4, 19, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(392, 4, 20, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(393, 4, 21, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(394, 4, 22, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(395, 4, 23, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(396, 4, 24, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(397, 4, 25, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(398, 4, 26, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(399, 4, 27, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(400, 4, 28, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(401, 4, 29, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(402, 4, 30, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(403, 4, 31, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(404, 4, 32, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(405, 4, 33, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(406, 4, 34, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(407, 4, 35, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(408, 4, 36, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(409, 4, 37, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(410, 4, 38, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(411, 4, 39, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(412, 4, 40, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(413, 4, 41, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(414, 4, 42, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(415, 4, 43, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(416, 4, 44, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(417, 4, 45, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(418, 4, 46, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(419, 4, 47, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(420, 4, 48, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(421, 4, 49, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(422, 4, 50, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(423, 4, 51, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(424, 4, 52, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(425, 4, 53, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(426, 4, 54, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(427, 4, 55, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(428, 4, 56, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(429, 4, 57, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(430, 4, 58, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(431, 4, 59, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(432, 4, 60, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(433, 4, 61, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(434, 4, 62, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(435, 4, 63, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(436, 4, 64, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(437, 4, 65, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(438, 4, 66, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(439, 4, 67, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(440, 4, 68, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(441, 4, 69, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(442, 4, 70, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(443, 4, 71, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(444, 4, 72, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(445, 4, 73, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(446, 4, 74, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(447, 4, 75, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(448, 4, 76, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(449, 4, 77, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(450, 4, 78, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(451, 4, 79, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(452, 4, 80, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(453, 4, 81, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(454, 4, 82, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(455, 4, 83, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(456, 4, 84, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(457, 4, 85, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(458, 4, 86, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(459, 4, 87, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(460, 4, 88, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(461, 4, 89, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(462, 4, 90, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(463, 4, 91, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(464, 4, 92, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(465, 4, 93, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(466, 4, 94, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(467, 4, 95, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(468, 4, 96, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(469, 4, 97, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(470, 4, 98, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(471, 4, 99, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(472, 4, 100, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(473, 4, 101, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(474, 4, 102, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(475, 4, 103, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(476, 4, 104, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(477, 4, 105, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(478, 4, 106, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(479, 4, 107, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(480, 4, 108, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(481, 4, 109, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(482, 4, 110, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(483, 4, 111, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(484, 4, 112, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(485, 4, 113, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(486, 4, 114, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(487, 4, 115, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(488, 4, 116, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(489, 4, 117, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(490, 4, 118, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(491, 4, 119, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(492, 4, 120, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(493, 4, 121, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(494, 4, 122, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(495, 4, 123, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(496, 4, 124, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(497, 5, 1, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(498, 5, 2, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(499, 5, 3, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(500, 5, 4, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(501, 5, 5, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(502, 5, 6, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(503, 5, 7, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(504, 5, 8, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(505, 5, 9, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(506, 5, 10, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(507, 5, 11, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(508, 5, 12, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(509, 5, 13, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(510, 5, 14, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(511, 5, 15, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(512, 5, 16, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(513, 5, 17, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(514, 5, 18, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(515, 5, 19, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(516, 5, 20, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(517, 5, 21, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(518, 5, 22, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(519, 5, 23, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(520, 5, 24, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(521, 5, 25, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(522, 5, 26, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(523, 5, 27, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(524, 5, 28, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(525, 5, 29, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(526, 5, 30, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(527, 5, 31, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(528, 5, 32, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(529, 5, 33, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(530, 5, 34, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(531, 5, 35, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(532, 5, 36, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(533, 5, 37, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(534, 5, 38, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(535, 5, 39, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(536, 5, 40, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(537, 5, 41, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(538, 5, 42, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(539, 5, 43, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(540, 5, 44, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(541, 5, 45, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(542, 5, 46, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(543, 5, 47, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(544, 5, 48, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(545, 5, 49, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(546, 5, 50, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(547, 5, 51, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(548, 5, 52, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(549, 5, 53, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(550, 5, 54, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(551, 5, 55, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(552, 5, 56, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(553, 5, 57, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(554, 5, 58, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(555, 5, 59, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(556, 5, 60, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(557, 5, 61, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(558, 5, 62, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(559, 5, 63, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(560, 5, 64, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(561, 5, 65, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(562, 5, 66, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(563, 5, 67, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(564, 5, 68, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(565, 5, 69, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(566, 5, 70, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(567, 5, 71, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(568, 5, 72, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(569, 5, 73, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(570, 5, 74, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(571, 5, 75, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(572, 5, 76, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(573, 5, 77, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(574, 5, 78, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(575, 5, 79, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(576, 5, 80, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(577, 5, 81, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(578, 5, 82, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(579, 5, 83, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(580, 5, 84, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(581, 5, 85, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(582, 5, 86, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(583, 5, 87, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(584, 5, 88, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(585, 5, 89, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(586, 5, 90, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(587, 5, 91, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(588, 5, 92, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(589, 5, 93, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(590, 5, 94, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(591, 5, 95, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(592, 5, 96, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(593, 5, 97, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(594, 5, 98, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(595, 5, 99, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(596, 5, 100, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(597, 5, 101, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(598, 5, 102, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(599, 5, 103, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(600, 5, 104, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(601, 5, 105, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(602, 5, 106, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(603, 5, 107, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(604, 5, 108, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(605, 5, 109, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(606, 5, 110, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(607, 5, 111, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(608, 5, 112, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(609, 5, 113, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(610, 5, 114, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(611, 5, 115, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(612, 5, 116, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(613, 5, 117, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(614, 5, 118, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(615, 5, 119, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(616, 5, 120, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(617, 5, 121, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(618, 5, 122, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(619, 5, 123, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(620, 5, 124, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(621, 6, 1, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(622, 6, 2, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(623, 6, 3, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(624, 6, 4, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(625, 6, 5, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(626, 6, 6, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(627, 6, 7, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(628, 6, 8, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(629, 6, 9, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(630, 6, 10, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(631, 6, 11, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(632, 6, 12, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(633, 6, 13, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(634, 6, 14, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(635, 6, 15, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(636, 6, 16, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(637, 6, 17, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(638, 6, 18, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(639, 6, 19, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(640, 6, 20, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(641, 6, 21, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(642, 6, 22, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(643, 6, 23, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(644, 6, 24, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(645, 6, 25, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(646, 6, 26, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(647, 6, 27, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(648, 6, 28, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(649, 6, 29, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(650, 6, 30, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(651, 6, 31, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(652, 6, 32, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(653, 6, 33, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(654, 6, 34, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(655, 6, 35, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(656, 6, 36, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(657, 6, 37, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(658, 6, 38, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(659, 6, 39, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(660, 6, 40, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(661, 6, 41, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(662, 6, 42, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(663, 6, 43, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(664, 6, 44, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(665, 6, 45, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(666, 6, 46, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(667, 6, 47, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(668, 6, 48, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(669, 6, 49, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(670, 6, 50, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(671, 6, 51, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(672, 6, 52, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(673, 6, 53, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(674, 6, 54, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(675, 6, 55, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(676, 6, 56, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(677, 6, 57, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(678, 6, 58, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(679, 6, 59, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(680, 6, 60, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(681, 6, 61, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(682, 6, 62, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(683, 6, 63, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(684, 6, 64, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(685, 6, 65, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(686, 6, 66, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(687, 6, 67, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(688, 6, 68, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(689, 6, 69, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(690, 6, 70, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(691, 6, 71, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(692, 6, 72, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(693, 6, 73, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(694, 6, 74, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(695, 6, 75, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(696, 6, 76, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(697, 6, 77, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(698, 6, 78, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(699, 6, 79, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(700, 6, 80, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(701, 6, 81, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(702, 6, 82, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(703, 6, 83, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(704, 6, 84, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(705, 6, 85, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(706, 6, 86, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(707, 6, 87, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(708, 6, 88, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(709, 6, 89, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(710, 6, 90, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(711, 6, 91, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(712, 6, 92, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(713, 6, 93, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(714, 6, 94, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(715, 6, 95, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(716, 6, 96, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(717, 6, 97, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(718, 6, 98, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(719, 6, 99, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(720, 6, 100, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(721, 6, 101, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(722, 6, 102, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(723, 6, 103, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(724, 6, 104, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(725, 6, 105, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(726, 6, 106, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(727, 6, 107, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(728, 6, 108, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(729, 6, 109, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(730, 6, 110, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(731, 6, 111, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(732, 6, 112, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(733, 6, 113, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(734, 6, 114, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(735, 6, 115, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(736, 6, 116, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(737, 6, 117, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(738, 6, 118, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(739, 6, 119, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(740, 6, 120, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(741, 6, 121, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(742, 6, 122, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(743, 6, 123, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(744, 6, 124, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(745, 7, 1, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(746, 7, 2, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(747, 7, 3, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(748, 7, 4, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(749, 7, 5, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(750, 7, 6, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(751, 7, 7, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(752, 7, 8, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(753, 7, 9, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(754, 7, 10, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(755, 7, 11, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(756, 7, 12, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(757, 7, 13, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(758, 7, 14, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(759, 7, 15, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(760, 7, 16, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(761, 7, 17, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(762, 7, 18, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(763, 7, 19, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(764, 7, 20, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(765, 7, 21, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(766, 7, 22, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(767, 7, 23, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(768, 7, 24, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(769, 7, 25, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(770, 7, 26, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(771, 7, 27, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(772, 7, 28, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(773, 7, 29, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(774, 7, 30, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(775, 7, 31, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(776, 7, 32, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(777, 7, 33, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(778, 7, 34, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(779, 7, 35, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(780, 7, 36, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(781, 7, 37, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(782, 7, 38, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(783, 7, 39, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(784, 7, 40, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(785, 7, 41, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(786, 7, 42, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(787, 7, 43, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(788, 7, 44, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(789, 7, 45, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(790, 7, 46, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(791, 7, 47, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(792, 7, 48, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(793, 7, 49, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(794, 7, 50, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(795, 7, 51, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(796, 7, 52, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(797, 7, 53, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(798, 7, 54, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(799, 7, 55, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(800, 7, 56, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(801, 7, 57, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(802, 7, 58, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(803, 7, 59, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(804, 7, 60, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(805, 7, 61, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(806, 7, 62, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(807, 7, 63, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(808, 7, 64, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(809, 7, 65, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(810, 7, 66, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(811, 7, 67, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(812, 7, 68, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(813, 7, 69, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(814, 7, 70, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(815, 7, 71, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(816, 7, 72, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(817, 7, 73, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12');
INSERT INTO `gen_roles_permission_tbl` (`permissionID`, `roleID`, `moduleID`, `permissionStatus`, `createdAt`, `updatedAt`) VALUES
(818, 7, 74, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(819, 7, 75, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(820, 7, 76, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(821, 7, 77, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(822, 7, 78, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(823, 7, 79, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(824, 7, 80, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(825, 7, 81, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(826, 7, 82, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(827, 7, 83, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(828, 7, 84, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(829, 7, 85, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(830, 7, 86, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(831, 7, 87, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(832, 7, 88, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(833, 7, 89, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(834, 7, 90, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(835, 7, 91, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(836, 7, 92, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(837, 7, 93, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(838, 7, 94, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(839, 7, 95, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(840, 7, 96, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(841, 7, 97, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(842, 7, 98, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(843, 7, 99, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(844, 7, 100, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(845, 7, 101, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(846, 7, 102, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(847, 7, 103, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(848, 7, 104, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(849, 7, 105, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(850, 7, 106, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(851, 7, 107, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(852, 7, 108, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(853, 7, 109, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(854, 7, 110, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(855, 7, 111, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(856, 7, 112, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(857, 7, 113, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(858, 7, 114, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(859, 7, 115, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(860, 7, 116, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(861, 7, 117, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(862, 7, 118, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(863, 7, 119, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(864, 7, 120, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(865, 7, 121, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(866, 7, 122, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(867, 7, 123, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(868, 7, 124, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(869, 8, 1, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(870, 8, 2, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(871, 8, 3, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(872, 8, 4, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(873, 8, 5, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(874, 8, 6, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(875, 8, 7, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(876, 8, 8, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(877, 8, 9, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(878, 8, 10, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(879, 8, 11, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(880, 8, 12, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(881, 8, 13, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(882, 8, 14, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(883, 8, 15, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(884, 8, 16, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(885, 8, 17, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(886, 8, 18, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(887, 8, 19, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(888, 8, 20, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(889, 8, 21, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(890, 8, 22, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(891, 8, 23, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(892, 8, 24, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(893, 8, 25, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(894, 8, 26, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(895, 8, 27, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(896, 8, 28, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(897, 8, 29, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(898, 8, 30, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(899, 8, 31, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(900, 8, 32, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(901, 8, 33, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(902, 8, 34, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(903, 8, 35, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(904, 8, 36, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(905, 8, 37, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(906, 8, 38, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(907, 8, 39, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(908, 8, 40, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(909, 8, 41, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(910, 8, 42, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(911, 8, 43, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(912, 8, 44, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(913, 8, 45, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(914, 8, 46, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(915, 8, 47, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(916, 8, 48, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(917, 8, 49, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(918, 8, 50, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(919, 8, 51, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(920, 8, 52, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(921, 8, 53, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(922, 8, 54, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(923, 8, 55, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(924, 8, 56, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(925, 8, 57, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(926, 8, 58, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(927, 8, 59, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(928, 8, 60, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(929, 8, 61, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(930, 8, 62, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(931, 8, 63, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(932, 8, 64, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(933, 8, 65, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(934, 8, 66, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(935, 8, 67, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(936, 8, 68, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(937, 8, 69, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(938, 8, 70, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(939, 8, 71, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(940, 8, 72, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(941, 8, 73, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(942, 8, 74, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(943, 8, 75, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(944, 8, 76, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(945, 8, 77, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(946, 8, 78, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(947, 8, 79, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(948, 8, 80, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(949, 8, 81, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(950, 8, 82, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(951, 8, 83, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(952, 8, 84, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(953, 8, 85, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(954, 8, 86, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(955, 8, 87, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(956, 8, 88, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(957, 8, 89, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(958, 8, 90, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(959, 8, 91, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(960, 8, 92, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(961, 8, 93, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(962, 8, 94, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(963, 8, 95, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(964, 8, 96, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(965, 8, 97, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(966, 8, 98, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(967, 8, 99, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(968, 8, 100, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(969, 8, 101, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(970, 8, 102, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(971, 8, 103, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(972, 8, 104, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(973, 8, 105, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(974, 8, 106, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(975, 8, 107, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(976, 8, 108, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(977, 8, 109, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(978, 8, 110, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(979, 8, 111, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(980, 8, 112, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(981, 8, 113, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(982, 8, 114, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(983, 8, 115, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(984, 8, 116, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(985, 8, 117, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(986, 8, 118, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(987, 8, 119, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(988, 8, 120, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(989, 8, 121, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(990, 8, 122, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(991, 8, 123, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(992, 8, 124, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(993, 9, 1, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(994, 9, 2, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(995, 9, 3, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(996, 9, 4, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(997, 9, 5, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(998, 9, 6, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(999, 9, 7, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1000, 9, 8, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1001, 9, 9, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1002, 9, 10, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1003, 9, 11, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1004, 9, 12, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1005, 9, 13, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1006, 9, 14, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1007, 9, 15, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1008, 9, 16, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1009, 9, 17, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1010, 9, 18, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1011, 9, 19, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1012, 9, 20, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1013, 9, 21, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1014, 9, 22, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1015, 9, 23, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1016, 9, 24, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1017, 9, 25, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1018, 9, 26, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1019, 9, 27, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1020, 9, 28, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1021, 9, 29, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1022, 9, 30, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1023, 9, 31, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1024, 9, 32, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1025, 9, 33, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1026, 9, 34, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1027, 9, 35, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1028, 9, 36, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1029, 9, 37, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1030, 9, 38, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1031, 9, 39, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1032, 9, 40, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1033, 9, 41, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1034, 9, 42, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1035, 9, 43, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1036, 9, 44, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1037, 9, 45, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1038, 9, 46, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1039, 9, 47, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1040, 9, 48, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1041, 9, 49, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1042, 9, 50, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1043, 9, 51, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1044, 9, 52, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1045, 9, 53, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1046, 9, 54, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1047, 9, 55, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1048, 9, 56, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1049, 9, 57, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1050, 9, 58, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1051, 9, 59, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1052, 9, 60, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1053, 9, 61, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1054, 9, 62, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1055, 9, 63, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1056, 9, 64, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1057, 9, 65, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1058, 9, 66, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1059, 9, 67, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1060, 9, 68, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1061, 9, 69, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1062, 9, 70, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1063, 9, 71, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1064, 9, 72, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1065, 9, 73, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1066, 9, 74, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1067, 9, 75, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1068, 9, 76, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1069, 9, 77, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1070, 9, 78, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1071, 9, 79, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1072, 9, 80, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1073, 9, 81, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1074, 9, 82, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1075, 9, 83, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1076, 9, 84, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1077, 9, 85, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1078, 9, 86, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1079, 9, 87, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1080, 9, 88, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1081, 9, 89, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1082, 9, 90, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1083, 9, 91, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1084, 9, 92, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1085, 9, 93, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1086, 9, 94, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1087, 9, 95, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1088, 9, 96, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1089, 9, 97, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1090, 9, 98, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1091, 9, 99, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1092, 9, 100, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1093, 9, 101, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1094, 9, 102, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1095, 9, 103, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1096, 9, 104, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1097, 9, 105, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1098, 9, 106, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1099, 9, 107, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1100, 9, 108, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1101, 9, 109, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1102, 9, 110, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1103, 9, 111, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1104, 9, 112, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1105, 9, 113, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1106, 9, 114, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1107, 9, 115, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1108, 9, 116, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1109, 9, 117, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1110, 9, 118, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1111, 9, 119, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1112, 9, 120, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1113, 9, 121, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1114, 9, 122, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1115, 9, 123, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1116, 9, 124, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1117, 10, 1, 1, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1118, 10, 2, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1119, 10, 3, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1120, 10, 4, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1121, 10, 5, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1122, 10, 6, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1123, 10, 7, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1124, 10, 8, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1125, 10, 9, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1126, 10, 10, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1127, 10, 11, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1128, 10, 12, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1129, 10, 13, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1130, 10, 14, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1131, 10, 15, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1132, 10, 16, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1133, 10, 17, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1134, 10, 18, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1135, 10, 19, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1136, 10, 20, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1137, 10, 21, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1138, 10, 22, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1139, 10, 23, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1140, 10, 24, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1141, 10, 25, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1142, 10, 26, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1143, 10, 27, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1144, 10, 28, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1145, 10, 29, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1146, 10, 30, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1147, 10, 31, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1148, 10, 32, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1149, 10, 33, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1150, 10, 34, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1151, 10, 35, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1152, 10, 36, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1153, 10, 37, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1154, 10, 38, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1155, 10, 39, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1156, 10, 40, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1157, 10, 41, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1158, 10, 42, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1159, 10, 43, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1160, 10, 44, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1161, 10, 45, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1162, 10, 46, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1163, 10, 47, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1164, 10, 48, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1165, 10, 49, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1166, 10, 50, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1167, 10, 51, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1168, 10, 52, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1169, 10, 53, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1170, 10, 54, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1171, 10, 55, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1172, 10, 56, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1173, 10, 57, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1174, 10, 58, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1175, 10, 59, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1176, 10, 60, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1177, 10, 61, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1178, 10, 62, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1179, 10, 63, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1180, 10, 64, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1181, 10, 65, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1182, 10, 66, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1183, 10, 67, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1184, 10, 68, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1185, 10, 69, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1186, 10, 70, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1187, 10, 71, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1188, 10, 72, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1189, 10, 73, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1190, 10, 74, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1191, 10, 75, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1192, 10, 76, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1193, 10, 77, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1194, 10, 78, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1195, 10, 79, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1196, 10, 80, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1197, 10, 81, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1198, 10, 82, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1199, 10, 83, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1200, 10, 84, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1201, 10, 85, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1202, 10, 86, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1203, 10, 87, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1204, 10, 88, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1205, 10, 89, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1206, 10, 90, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1207, 10, 91, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1208, 10, 92, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1209, 10, 93, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1210, 10, 94, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1211, 10, 95, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1212, 10, 96, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1213, 10, 97, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1214, 10, 98, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1215, 10, 99, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1216, 10, 100, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1217, 10, 101, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1218, 10, 102, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1219, 10, 103, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1220, 10, 104, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1221, 10, 105, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1222, 10, 106, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1223, 10, 107, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1224, 10, 108, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1225, 10, 109, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1226, 10, 110, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1227, 10, 111, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1228, 10, 112, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1229, 10, 113, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1230, 10, 114, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1231, 10, 115, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1232, 10, 116, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1233, 10, 117, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1234, 10, 118, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1235, 10, 119, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1236, 10, 120, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1237, 10, 121, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1238, 10, 122, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1239, 10, 123, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1240, 10, 124, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1241, 16, 1, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1242, 16, 2, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1243, 16, 3, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1244, 16, 4, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1245, 16, 5, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1246, 16, 6, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1247, 16, 7, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1248, 16, 8, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1249, 16, 9, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1250, 16, 10, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1251, 16, 11, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1252, 16, 12, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1253, 16, 13, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1254, 16, 14, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1255, 16, 15, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1256, 16, 16, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1257, 16, 17, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1258, 16, 18, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1259, 16, 19, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1260, 16, 20, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1261, 16, 21, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1262, 16, 22, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1263, 16, 23, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1264, 16, 24, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1265, 16, 25, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1266, 16, 26, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1267, 16, 27, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1268, 16, 28, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1269, 16, 29, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1270, 16, 30, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1271, 16, 31, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1272, 16, 32, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1273, 16, 33, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1274, 16, 34, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1275, 16, 35, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1276, 16, 36, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1277, 16, 37, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1278, 16, 38, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1279, 16, 39, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1280, 16, 40, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1281, 16, 41, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1282, 16, 42, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1283, 16, 43, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1284, 16, 44, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1285, 16, 45, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1286, 16, 46, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1287, 16, 47, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1288, 16, 48, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1289, 16, 49, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1290, 16, 50, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1291, 16, 51, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1292, 16, 52, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1293, 16, 53, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1294, 16, 54, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1295, 16, 55, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1296, 16, 56, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1297, 16, 57, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1298, 16, 58, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1299, 16, 59, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1300, 16, 60, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1301, 16, 61, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1302, 16, 62, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1303, 16, 63, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1304, 16, 64, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1305, 16, 65, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1306, 16, 66, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1307, 16, 67, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1308, 16, 68, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1309, 16, 69, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1310, 16, 70, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1311, 16, 71, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1312, 16, 72, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1313, 16, 73, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1314, 16, 74, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1315, 16, 75, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1316, 16, 76, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1317, 16, 77, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1318, 16, 78, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1319, 16, 79, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1320, 16, 80, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1321, 16, 81, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1322, 16, 82, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1323, 16, 83, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1324, 16, 84, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1325, 16, 85, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1326, 16, 86, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1327, 16, 87, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1328, 16, 88, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1329, 16, 89, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1330, 16, 90, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1331, 16, 91, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1332, 16, 92, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1333, 16, 93, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1334, 16, 94, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1335, 16, 95, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1336, 16, 96, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1337, 16, 97, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1338, 16, 98, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1339, 16, 99, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1340, 16, 100, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1341, 16, 101, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1342, 16, 102, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1343, 16, 103, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1344, 16, 104, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1345, 16, 105, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1346, 16, 106, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1347, 16, 107, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1348, 16, 108, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1349, 16, 109, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1350, 16, 110, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1351, 16, 111, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1352, 16, 112, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1353, 16, 113, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1354, 16, 114, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1355, 16, 115, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1356, 16, 116, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1357, 16, 117, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1358, 16, 118, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1359, 16, 119, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1360, 16, 120, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1361, 16, 121, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1362, 16, 122, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1363, 16, 123, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12'),
(1364, 16, 124, 0, '2021-03-26 01:44:12', '2021-03-26 01:44:12');

-- --------------------------------------------------------

--
-- Table structure for table `gen_system_notification_tbl`
--

CREATE TABLE `gen_system_notification_tbl` (
  `notificationID` bigint(20) NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `moduleID` bigint(20) NOT NULL,
  `tableID` bigint(20) NOT NULL,
  `notificationTitle` text NOT NULL,
  `notificationDescription` mediumtext NOT NULL,
  `notificationType` int(100) NOT NULL DEFAULT 2,
  `markRead` int(11) NOT NULL DEFAULT 0,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(1, '1', 'Ako To Si', 'Natoy', 'rjpinca@gmail.com', '(+63) 099 0908 595', '(32) 1321 423', '1709 Antel Bldg, Julia Vargas', 'Male', '2021-02-03', 'http://theblackcoders.com', 'admin', 'admin', '0.00', '', '01614667776.svg', 1, 1, '2021-02-26 05:19:00', '2021-03-22 01:45:34'),
(2, '2', 'Akosi', 'RJ', 'hakdog123@gmail.com', '(+63) 545 8987 987', '(54) 6545 646', '1709 Antel Bldg, Julia Vargas', 'Male', '2021-03-05', 'http://theblackcoders.com', 'arjay', 'arjay', '999.95', 'CSS|JS', '01614668556.svg|11614668556.svg|21614668556.svg|31614668556.svg|41614668556.svg|51614668556.svg', 1, 1, '2021-02-26 05:25:07', '2021-03-23 03:40:47'),
(3, '3', 'Charles', 'Vincent', 'charlesvincent@gmail.com', '(+63) 123 2141 242', '(53) 2432 423', 'Quezon City', 'Male', '2021-03-09', 'http://theblackcoders.com', 'charles', 'charles', '0.00', 'CSS|HTML|JS', '01614668026.svg|11614668026.svg|21614668026.svg|31614668026.svg|41614668026.svg|51614668026.svg', 1, 1, '2021-03-02 06:52:07', '2021-03-23 03:40:50'),
(4, '4', 'Joseph', 'Berongoy', 'joseph@gmail.com', '0909900905965', '556565956', 'Pasig City', 'Male', '2021-03-10', 'theblackcoders.com', 'joseph', 'joseph', NULL, NULL, NULL, 1, 1, '2021-03-21 23:56:09', '2021-03-23 03:40:53');

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
(4, 'Junior Developer', 1, '2021-03-08 03:17:38', '2021-03-08 03:17:38'),
(5, 'Senior Developer', 1, '2021-03-08 03:18:39', '2021-03-08 05:17:41'),
(6, 'Finance', 1, '2021-03-08 03:19:57', '2021-03-08 03:19:57'),
(7, 'Installer', 1, '2021-03-08 03:46:14', '2021-03-08 04:03:08'),
(8, 'IT Admin', 1, '2021-03-08 03:46:45', '2021-03-08 03:46:45'),
(9, 'Quality Analyst', 1, '2021-03-09 23:31:46', '2021-03-09 23:31:46'),
(10, 'Marketing', 1, '2021-03-09 23:33:00', '2021-03-09 23:33:00'),
(16, 'Testt', 1, '2021-03-23 03:30:36', '2021-03-23 03:30:36');

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

--
-- Dumping data for table `hris_change_schedule_tbl`
--

INSERT INTO `hris_change_schedule_tbl` (`changeScheduleID`, `changeScheduleCode`, `employeeID`, `changeScheduleDate`, `changeScheduleTimeIn`, `changeScheduleTimeOut`, `changeScheduleReason`, `approversID`, `approversStatus`, `approversDate`, `changeScheduleStatus`, `changeScheduleRemarks`, `submittedAt`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'SCH-21-00001', 1, '2021-03-24', '08:00:00', '17:00:00', 'Ako si Admin , TEST', '1', '2', '2021-03-26 01:44:42', 2, NULL, '2021-03-25 17:44:42', 1, 1, '2021-03-25 17:44:42', '2021-03-26 05:44:44'),
(2, 'SCH-21-00002', 6, '2021-03-23', '08:00:00', '17:00:00', 'There\'s a lot of checkpoint.', '3|4|1', NULL, NULL, 1, NULL, '2021-03-26 05:52:07', 6, 6, '2021-03-25 17:46:21', '2021-03-26 06:01:41'),
(3, 'SCH-21-00003', 6, '2021-03-18', '08:00:00', '18:00:00', 'TEST', '3|4|1', NULL, NULL, 1, NULL, '2021-03-26 05:59:43', 6, 6, '2021-03-26 05:59:43', '2021-03-26 05:59:47'),
(4, 'SCH-21-00004', 4, '2021-03-24', '08:00:00', '17:00:00', 'CHARLES', '5|6|1', NULL, NULL, 1, NULL, '2021-03-26 06:17:21', 4, 4, '2021-03-26 06:17:21', '2021-03-26 06:17:24'),
(5, 'SCH-21-00005', 5, '2021-03-11', '08:00:00', '17:00:00', 'MARK', '7|2|1', '2', '2021-03-26 14:48:27', 1, NULL, '2021-03-26 06:31:08', 5, 7, '2021-03-26 06:31:08', '2021-03-26 06:48:28'),
(6, 'SCH-21-00006', 2, '2021-03-18', '08:00:00', '17:00:00', 'REASON', '1', NULL, NULL, 1, NULL, '2021-03-26 07:33:33', 2, 2, '2021-03-26 07:33:33', '2021-03-26 07:33:35'),
(7, 'SCH-21-00007', 2, '2021-03-25', '08:00:00', '17:00:00', 'Hotdog', '1', NULL, NULL, 1, NULL, '2021-03-26 07:34:27', 2, 2, '2021-03-26 07:34:27', '2021-03-26 07:34:29');

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
(1, 'Test', 1, 1, 1, '2021-03-24 05:25:40', '2021-03-24 05:25:40');

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

--
-- Dumping data for table `hris_department_tbl`
--

INSERT INTO `hris_department_tbl` (`departmentID`, `departmentCode`, `departmentName`, `departmentStatus`, `datecreated`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'DPT-21-00001', 'Operations', 1, '2021-03-24 13:06:48', 1, 1, '2021-03-24 13:06:48', '2021-03-26 13:42:25');

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

--
-- Dumping data for table `hris_designation_tbl`
--

INSERT INTO `hris_designation_tbl` (`designationID`, `designationCode`, `departmentID`, `designationName`, `designationStatus`, `datecreated`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'DSN-21-00001', 1, 'Software Developer', 1, '2021-03-24', 1, 1, '2021-03-24 13:07:13', '2021-03-26 13:42:53'),
(2, 'DSN-21-00002', 1, 'Quality Analyst', 1, '2021-03-26', 1, 1, '2021-03-26 13:43:25', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `hris_employee_list_tbl`
--

CREATE TABLE `hris_employee_list_tbl` (
  `employeeID` bigint(20) NOT NULL,
  `departmentID` bigint(20) NOT NULL,
  `designationID` bigint(20) NOT NULL,
  `roleID` bigint(20) NOT NULL,
  `employeeFirstname` varchar(100) NOT NULL,
  `employeeLastname` varchar(100) NOT NULL,
  `employeeEmail` text NOT NULL,
  `employeeUsername` text NOT NULL,
  `employeePassword` text NOT NULL,
  `employeeStatus` int(11) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hris_employee_list_tbl`
--

INSERT INTO `hris_employee_list_tbl` (`employeeID`, `departmentID`, `designationID`, `roleID`, `employeeFirstname`, `employeeLastname`, `employeeEmail`, `employeeUsername`, `employeePassword`, `employeeStatus`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, 'Akosi', 'Admin', 'akosiadmin@gmail', 'admin', 'admin', 1, 1, 1, '2021-03-26 00:09:46', '2021-03-26 00:21:16'),
(2, 1, 1, 2, 'Arjay', 'Diangzon', 'arjaydiangzon@gmail.com', 'arjay', 'arjay', 1, 1, 1, '2021-03-26 00:09:46', '2021-03-26 00:21:16'),
(3, 1, 1, 3, 'Wilson', 'Parajas', 'wilsonparajas@gmail.com', 'wilson', 'wilson', 1, 1, 1, '2021-03-26 00:09:46', '2021-03-26 00:21:16'),
(4, 1, 1, 4, 'Charles', 'Verdadero', 'charlesverdadero@gmail.com', 'charles', 'charles', 1, 1, 1, '2021-03-26 00:09:46', '2021-03-26 00:21:16'),
(5, 1, 1, 5, 'Mark', 'Nieto', 'marknieto@gmail.com', 'mark', 'mark', 1, 1, 1, '2021-03-26 00:09:46', '2021-03-26 00:21:16'),
(6, 1, 1, 6, 'Joseph', 'Berongoy', 'josephberongoy@gmail.com', 'joseph', 'joseph', 1, 1, 1, '2021-03-26 00:09:46', '2021-03-26 00:21:16'),
(7, 1, 1, 7, 'Renna', 'Telesforo', 'rennatelesforo@gmail.com', 'renna', 'renna', 1, 1, 1, '2021-03-26 00:09:46', '2021-03-26 00:21:16');

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

--
-- Dumping data for table `hris_job_posting_tbl`
--

INSERT INTO `hris_job_posting_tbl` (`jobID`, `jobCode`, `jobCompany`, `jobTitle`, `jobDescription`, `jobResponsibilities`, `jobType`, `jobCategory`, `techSkillsQualification`, `jobBenefits`, `jobLanguage`, `jobSlot`, `salaryRangeSelect`, `salaryRange`, `jobStatus`, `datecreated`, `createdAt`, `updatedAt`, `createdBy`, `updatedBy`) VALUES
(1, 'VEN-21-00001', 'CMTLand Development Inc.', 'Title', 'Decription', 'Responsibilities', 'Part-Time', 'Computer/Information Technology', 'Test', 'Test', 'English', 22, 3, '1500.00', 1, '2021-03-24', '2021-03-24 10:21:13', '2021-03-24 11:24:35', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `hris_leave_request_tbl`
--

CREATE TABLE `hris_leave_request_tbl` (
  `leaveRequestID` bigint(20) NOT NULL,
  `leaveRequestCode` varchar(100) NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `leaveRequestDate` varchar(255) NOT NULL,
  `leaveRequestDateFrom` date NOT NULL,
  `leaveRequestDateTo` date NOT NULL,
  `leaveRequestNumberOfDate` bigint(20) NOT NULL,
  `leaveRequestRemainingLeave` bigint(20) NOT NULL,
  `leaveRequestReason` text DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `leaveRequestStatus` int(20) NOT NULL,
  `leaveRequestRemarks` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
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

-- --------------------------------------------------------

--
-- Table structure for table `hris_loan_form_tbl`
--

CREATE TABLE `hris_loan_form_tbl` (
  `loanFormID` bigint(20) NOT NULL,
  `loanFormCode` text NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `loanID` bigint(20) NOT NULL,
  `loanFormTermPayment` int(10) NOT NULL,
  `loanFormDate` text NOT NULL,
  `loanFormNoOfDays` int(10) NOT NULL,
  `loanFormAmount` decimal(19,2) NOT NULL,
  `loanFormDeductionAmount` decimal(19,2) NOT NULL,
  `approversID` text NOT NULL,
  `approversStatus` text NOT NULL,
  `approversDate` text NOT NULL,
  `loanFormStatus` int(11) NOT NULL,
  `loanFormRemarks` text NOT NULL,
  `submittedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- --------------------------------------------------------

--
-- Table structure for table `hris_official_business_tbl`
--

CREATE TABLE `hris_official_business_tbl` (
  `officialBusinessID` bigint(20) NOT NULL,
  `officialBusinessCode` varchar(50) NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `officialBusinessCompanyID` bigint(40) NOT NULL,
  `officialBusinessAddress` text NOT NULL,
  `officialBusinessDate` date NOT NULL,
  `officialBusinessTimeIn` time NOT NULL,
  `officialBusinessTimeOut` time NOT NULL,
  `officialBusinessReason` text NOT NULL,
  `approversID` text NOT NULL,
  `approversStatus` text NOT NULL,
  `approversDate` text NOT NULL,
  `officialBusinessStatus` int(11) NOT NULL,
  `officialBusinessRemarks` text NOT NULL,
  `submittedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hris_on_timein_timeout_tbl`
--

CREATE TABLE `hris_on_timein_timeout_tbl` (
  `no_Timein_timeoutID` bigint(20) NOT NULL,
  `no_Timein_timeoutCode` varchar(100) NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `no_Timein_timeoutDate` date NOT NULL,
  `no_Timein_timeoutTimeIn` time NOT NULL,
  `no_Timein_timeoutTimeOut` time NOT NULL,
  `no_Timein_timeoutReason` text DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `no_Timein_timeoutStatus` int(11) NOT NULL,
  `no_Timein_timeoutRemarks` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hris_overtime_request_tbl`
--

CREATE TABLE `hris_overtime_request_tbl` (
  `overtimeRequestID` bigint(20) NOT NULL,
  `overtimeRequestCode` text NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `overtimeRequestDate` date NOT NULL,
  `overtimeRequestTimeIn` time NOT NULL,
  `overtimeRequestTimeOut` time NOT NULL,
  `overtimeRequestReason` text NOT NULL,
  `approversID` text NOT NULL,
  `approversStatus` text NOT NULL,
  `approversDate` text NOT NULL,
  `overtimeRequestStatus` int(11) NOT NULL,
  `overtimeRequestRemarks` text NOT NULL,
  `submittedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

--
-- Dumping data for table `hris_requirement_tbl`
--

INSERT INTO `hris_requirement_tbl` (`requirementID`, `requirementCode`, `requirementName`, `requirementDescription`, `requirementStatus`, `datecreated`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'RQT-21-00001', 'Test', 'Test', 1, '2021-03-24', 1, 1, '2021-03-24 13:21:34', '0000-00-00 00:00:00'),
(2, 'RQT-21-00002', 'Tests', 'Test', 1, '2021-03-25', 1, 1, '2021-03-25 13:17:07', '0000-00-00 00:00:00');

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
(1, 'Mid Shift', '08:00:00', '17:00:00', 1, '08:00:00', '14:00:00', 1, '08:00:00', '17:00:00', 1, '08:00:00', '17:00:00', 1, '08:00:00', '17:00:00', 1, '08:00:00', '17:00:00', 0, '08:00:00', '17:00:00', 0, 1, 1, 1, '2021-03-11 02:54:03', '2021-03-23 01:31:12'),
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

--
-- Dumping data for table `ims_inventory_category_tbl`
--

INSERT INTO `ims_inventory_category_tbl` (`categoryID`, `categoryCode`, `categoryName`, `classificationID`, `categoryStatus`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'CTY-21-00001', 'Test', 1, '1', 1, 1, '2021-03-24 11:46:42', '0000-00-00 00:00:00');

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
(1, 'CFN-21-00001', 'Test', 1, 1, 1, '2021-03-24 03:45:17', '2021-03-24 03:45:17');

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

--
-- Dumping data for table `ims_inventory_item_tbl`
--

INSERT INTO `ims_inventory_item_tbl` (`itemID`, `itemCode`, `inventoryStorageID`, `itemName`, `classificationID`, `categoryID`, `itemSize`, `unitOfMeasurementID`, `basePrice`, `reOrderLevel`, `vatType`, `itemStatus`, `datecreated`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'ITM-21-00001', 1, 'Test', 1, 1, 'ExtraSmall', 'Kg', '1223.00', 12, 'Vatable', 1, '2021-03-24', 1, 1, '2021-03-24 12:28:39', '0000-00-00 00:00:00');

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

--
-- Dumping data for table `ims_inventory_storage_tbl`
--

INSERT INTO `ims_inventory_storage_tbl` (`inventoryStorageID`, `inventoryStorageCode`, `inventoryStorageOfficeName`, `inventoryStorageUnitNumber`, `inventoryStorageHouseNumber`, `inventoryStorageStreetName`, `inventoryStorageSubdivisionName`, `inventoryStorageBarangay`, `inventoryStorageMunicipality`, `inventoryStorageProvince`, `inventoryStorageRegion`, `inventoryStorageCountry`, `inventoryStorageZipCode`, `inventoryStorageRoomType`, `inventoryStorageDepartment`, `inventoryStorageStatus`, `createdBy`, `createdAt`, `updatedBy`, `updatedAt`) VALUES
(1, 'ISM-21-00001', 'GTC', '1021', 'Antel', 'Julia Vargas', 'Ortigas', 'ADAMS (POB.)', 'ADAMS', 'ILOCOS NORTE', '01', 'Philippines', 1900, 'Test', 'Testt', '1', 1, '2021-03-24 04:22:07.130988', 1, '2021-03-24 04:22:07.130988');

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
(1, 'VEN-21-00001', 'National Bookstore', '01', 'ILOCOS SUR', 'BURGOS', '', '1701', 'Antel', 'Julia Vargas', 'Ortigas', 'Philippines', '1900', 'Arjay Diangzon', 'arjaydiangzon@email.com', '123 421 523 123', '0956 5969 798', '(12) 1234 1233', 'NB', 1, 1, 1, 3, '2021-03-15 06:28:45', '2021-03-23 04:28:54');

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

--
-- Dumping data for table `pms_category_tbl`
--

INSERT INTO `pms_category_tbl` (`categoryID`, `categoryCode`, `categoryName`, `companyName`, `categoryStatus`, `createdBy`, `updatedBy`, `datecreated`, `createdAt`, `updatedAt`) VALUES
(1, 'PCT-21-00001', 'Test', 'Test', 1, 1, 1, '0000-00-00', '2021-03-24 11:41:45', '0000-00-00 00:00:00');

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

--
-- Dumping data for table `pms_client_tbl`
--

INSERT INTO `pms_client_tbl` (`clientID`, `clientCode`, `clientName`, `clientRegion`, `clientProvince`, `clientCity`, `clientBarangay`, `clientUnitNumber`, `clientHouseNumber`, `clientCountry`, `clientPostalCode`, `clientContactPerson`, `clientEmailAddress`, `clientTin`, `client_MobileNo`, `clientTelephoneNo`, `clientBrandName`, `clientStatus`, `createdBy`, `updatedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'CLT-21-00001', '123', '02', 'BATANES', 'ITBAYAT', 'SAN RAFAEL (IDIANG)', '123', '123', 'dsadsadas', 1233, 'qwe', '', '123 312 312 312', '1233 1232 131', '(31) 2312 312', '', 1, 3, 3, '2021-03-23 08:33:14', '0000-00-00 00:00:00');

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
-- Indexes for table `gen_ledger_classification_tbl`
--
ALTER TABLE `gen_ledger_classification_tbl`
  ADD PRIMARY KEY (`ledgerClassificationID`);

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
-- Indexes for table `hris_employee_list_tbl`
--
ALTER TABLE `hris_employee_list_tbl`
  ADD PRIMARY KEY (`employeeID`);

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
-- Indexes for table `hris_leave_request_tbl`
--
ALTER TABLE `hris_leave_request_tbl`
  ADD PRIMARY KEY (`leaveRequestID`);

--
-- Indexes for table `hris_leave_tbl`
--
ALTER TABLE `hris_leave_tbl`
  ADD PRIMARY KEY (`leaveID`);

--
-- Indexes for table `hris_loan_form_tbl`
--
ALTER TABLE `hris_loan_form_tbl`
  ADD PRIMARY KEY (`loanFormID`);

--
-- Indexes for table `hris_loan_tbl`
--
ALTER TABLE `hris_loan_tbl`
  ADD PRIMARY KEY (`loanID`);

--
-- Indexes for table `hris_official_business_tbl`
--
ALTER TABLE `hris_official_business_tbl`
  ADD PRIMARY KEY (`officialBusinessID`);

--
-- Indexes for table `hris_on_timein_timeout_tbl`
--
ALTER TABLE `hris_on_timein_timeout_tbl`
  ADD PRIMARY KEY (`no_Timein_timeoutID`);

--
-- Indexes for table `hris_overtime_request_tbl`
--
ALTER TABLE `hris_overtime_request_tbl`
  ADD PRIMARY KEY (`overtimeRequestID`);

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
  MODIFY `bankID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `fms_chart_of_accounts_tbl`
--
ALTER TABLE `fms_chart_of_accounts_tbl`
  MODIFY `chartOfAccountID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `gen_approval_setup_tbl`
--
ALTER TABLE `gen_approval_setup_tbl`
  MODIFY `approvalID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `gen_ledger_classification_tbl`
--
ALTER TABLE `gen_ledger_classification_tbl`
  MODIFY `ledgerClassificationID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `gen_module_category_tbl`
--
ALTER TABLE `gen_module_category_tbl`
  MODIFY `moduleCategoryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `gen_module_header_tbl`
--
ALTER TABLE `gen_module_header_tbl`
  MODIFY `moduleHeaderID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `gen_module_list_tbl`
--
ALTER TABLE `gen_module_list_tbl`
  MODIFY `moduleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `gen_operations_tbl`
--
ALTER TABLE `gen_operations_tbl`
  MODIFY `userAccountID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `gen_roles_permission_tbl`
--
ALTER TABLE `gen_roles_permission_tbl`
  MODIFY `permissionID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1365;

--
-- AUTO_INCREMENT for table `gen_system_notification_tbl`
--
ALTER TABLE `gen_system_notification_tbl`
  MODIFY `notificationID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gen_user_account_tbl`
--
ALTER TABLE `gen_user_account_tbl`
  MODIFY `userAccountID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `gen_user_role_tbl`
--
ALTER TABLE `gen_user_role_tbl`
  MODIFY `roleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `hris_award_tbl`
--
ALTER TABLE `hris_award_tbl`
  MODIFY `awardID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_branch_tbl`
--
ALTER TABLE `hris_branch_tbl`
  MODIFY `branchID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_change_schedule_tbl`
--
ALTER TABLE `hris_change_schedule_tbl`
  MODIFY `changeScheduleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `hris_code_conduct_category_tbl`
--
ALTER TABLE `hris_code_conduct_category_tbl`
  MODIFY `codeConductCategoryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hris_code_conduct_section_tbl`
--
ALTER TABLE `hris_code_conduct_section_tbl`
  MODIFY `codeConductSectionID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_department_tbl`
--
ALTER TABLE `hris_department_tbl`
  MODIFY `departmentID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hris_designation_tbl`
--
ALTER TABLE `hris_designation_tbl`
  MODIFY `designationID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hris_employee_list_tbl`
--
ALTER TABLE `hris_employee_list_tbl`
  MODIFY `employeeID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `hris_event_calendar_tbl`
--
ALTER TABLE `hris_event_calendar_tbl`
  MODIFY `eventCalendarID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_holiday_tbl`
--
ALTER TABLE `hris_holiday_tbl`
  MODIFY `holidayID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_job_posting_tbl`
--
ALTER TABLE `hris_job_posting_tbl`
  MODIFY `jobID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hris_leave_request_tbl`
--
ALTER TABLE `hris_leave_request_tbl`
  MODIFY `leaveRequestID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_leave_tbl`
--
ALTER TABLE `hris_leave_tbl`
  MODIFY `leaveID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_loan_form_tbl`
--
ALTER TABLE `hris_loan_form_tbl`
  MODIFY `loanFormID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hris_loan_tbl`
--
ALTER TABLE `hris_loan_tbl`
  MODIFY `loanID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_official_business_tbl`
--
ALTER TABLE `hris_official_business_tbl`
  MODIFY `officialBusinessID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_on_timein_timeout_tbl`
--
ALTER TABLE `hris_on_timein_timeout_tbl`
  MODIFY `no_Timein_timeoutID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_overtime_request_tbl`
--
ALTER TABLE `hris_overtime_request_tbl`
  MODIFY `overtimeRequestID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hris_philhealth_table_tbl`
--
ALTER TABLE `hris_philhealth_table_tbl`
  MODIFY `phID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `hris_qualification_tbl`
--
ALTER TABLE `hris_qualification_tbl`
  MODIFY `qualificationID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hris_requirement_tbl`
--
ALTER TABLE `hris_requirement_tbl`
  MODIFY `requirementID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `categoryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ims_inventory_classification_tbl`
--
ALTER TABLE `ims_inventory_classification_tbl`
  MODIFY `classificationID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ims_inventory_condition_tbl`
--
ALTER TABLE `ims_inventory_condition_tbl`
  MODIFY `conditionID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ims_inventory_item_tbl`
--
ALTER TABLE `ims_inventory_item_tbl`
  MODIFY `itemID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ims_inventory_storage_tbl`
--
ALTER TABLE `ims_inventory_storage_tbl`
  MODIFY `inventoryStorageID` bigint(120) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ims_inventory_vendor_tbl`
--
ALTER TABLE `ims_inventory_vendor_tbl`
  MODIFY `inventoryVendorID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pms_category_tbl`
--
ALTER TABLE `pms_category_tbl`
  MODIFY `categoryID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pms_client_tbl`
--
ALTER TABLE `pms_client_tbl`
  MODIFY `clientID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
