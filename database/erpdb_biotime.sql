-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2021 at 01:50 AM
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
-- Database: `erpdb_biotime`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts_adminbiodata`
--

CREATE TABLE `accounts_adminbiodata` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `bio_tmp` longtext NOT NULL,
  `bio_no` int(11) DEFAULT NULL,
  `bio_index` int(11) DEFAULT NULL,
  `bio_type` int(11) NOT NULL,
  `major_ver` varchar(30) NOT NULL,
  `minor_ver` varchar(30) DEFAULT NULL,
  `bio_format` int(11) DEFAULT NULL,
  `valid` tinyint(1) NOT NULL,
  `duress` tinyint(1) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `accounts_usernotification`
--

CREATE TABLE `accounts_usernotification` (
  `id` int(11) NOT NULL,
  `content` longtext NOT NULL,
  `send_time` datetime(6) NOT NULL,
  `read_time` datetime(6) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category` int(11) DEFAULT NULL,
  `event` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts_usernotification`
--

INSERT INTO `accounts_usernotification` (`id`, `content`, `send_time`, `read_time`, `status`, `user_id`, `category`, `event`) VALUES
(1, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-23 10:56:28\"}', '2021-08-24 13:15:16.459533', NULL, 0, 1, 1, 101),
(2, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-23 10:56:28\"}', '2021-08-24 14:01:53.505196', NULL, 0, 1, 1, 101),
(3, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-23 10:56:28\"}', '2021-08-24 14:14:13.926149', NULL, 0, 1, 1, 101),
(4, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-23 10:56:28\"}', '2021-08-24 14:17:04.354139', NULL, 0, 1, 1, 101),
(5, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-23 10:56:28\"}', '2021-08-24 14:26:38.249246', NULL, 0, 1, 1, 101),
(6, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-24 14:29:58\"}', '2021-08-24 14:29:59.164511', NULL, 0, 1, 1, 102),
(7, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-25 16:27:59\"}', '2021-08-26 07:13:36.774596', NULL, 0, 1, 1, 101),
(8, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.0\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-26 07:36:49\"}', '2021-08-26 07:36:54.135783', NULL, 0, 1, 1, 102),
(9, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-26 11:27:06\"}', '2021-08-26 11:33:34.287298', NULL, 0, 1, 1, 101),
(10, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-26 15:03:29\"}', '2021-08-26 15:03:34.598044', NULL, 0, 1, 1, 102),
(11, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-26 15:00:25\"}', '2021-08-27 07:28:47.871121', NULL, 0, 1, 1, 101),
(12, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.203\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-27 07:38:38\"}', '2021-08-27 07:38:43.024262', NULL, 0, 1, 1, 102),
(13, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-27 12:36:02\"}', '2021-08-27 12:49:55.451547', NULL, 0, 1, 1, 101),
(14, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-27 12:53:03\"}', '2021-08-27 12:53:06.863512', NULL, 0, 1, 1, 102),
(15, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-31 07:52:23\"}', '2021-08-31 08:46:07.444167', NULL, 0, 1, 1, 101),
(16, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-31 07:52:23\"}', '2021-08-31 09:32:19.965669', NULL, 0, 1, 1, 101),
(17, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-31 09:32:27\"}', '2021-08-31 09:32:30.086582', NULL, 0, 1, 1, 102),
(18, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-08-31 16:06:16\"}', '2021-08-31 16:12:25.052033', NULL, 0, 1, 1, 101),
(19, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-09-09 16:26:08\"}', '2021-09-10 07:40:11.236636', NULL, 0, 1, 1, 101),
(20, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-09-10 11:29:18\"}', '2021-09-10 11:30:11.019129', NULL, 0, 1, 1, 102),
(21, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-09-10 15:42:36\"}', '2021-09-13 08:31:46.300830', NULL, 0, 1, 1, 101),
(22, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-09-10 15:42:36\"}', '2021-09-13 15:10:30.153061', NULL, 0, 1, 1, 101),
(23, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-09-13 15:13:44\"}', '2021-09-13 15:13:47.316565', NULL, 0, 1, 1, 102),
(24, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-09-13 16:11:32\"}', '2021-09-14 07:35:14.125495', NULL, 0, 1, 1, 101),
(25, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-09-14 08:01:24\"}', '2021-09-14 08:01:33.958683', NULL, 0, 1, 1, 102),
(26, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-09-14 16:27:46\"}', '2021-09-15 07:38:11.609747', NULL, 0, 1, 1, 101),
(27, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-09-15 10:24:42\"}', '2021-09-15 10:24:46.545982', NULL, 0, 1, 1, 102),
(28, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": \"F22/ID\", \"area_name\": \"Pasig City\", \"last_activity\": \"2021-09-15 11:36:35\"}', '2021-09-15 11:41:26.867580', NULL, 0, 1, 1, 101);

-- --------------------------------------------------------

--
-- Table structure for table `acc_acccombination`
--

CREATE TABLE `acc_acccombination` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `combination_no` int(11) NOT NULL,
  `combination_name` varchar(100) NOT NULL,
  `group1` int(11) DEFAULT NULL,
  `group2` int(11) DEFAULT NULL,
  `group3` int(11) DEFAULT NULL,
  `group4` int(11) DEFAULT NULL,
  `group5` int(11) DEFAULT NULL,
  `remark` varchar(999) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `area_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `acc_acccombination`
--

INSERT INTO `acc_acccombination` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `combination_no`, `combination_name`, `group1`, `group2`, `group3`, `group4`, `group5`, `remark`, `update_time`, `area_id`) VALUES
(1, '2021-08-03 08:00:50.147391', NULL, '2021-08-03 08:00:50.147391', NULL, 0, 1, '1', 1, 0, 0, 0, 0, NULL, '2021-08-03 08:00:50.146391', 2),
(2, '2021-08-03 08:00:50.147391', NULL, '2021-08-03 08:00:50.147391', NULL, 0, 2, '2', 0, 0, 0, 0, 0, NULL, '2021-08-03 08:00:50.146391', 2),
(3, '2021-08-03 08:00:50.147391', NULL, '2021-08-03 08:00:50.147391', NULL, 0, 3, '3', 0, 0, 0, 0, 0, NULL, '2021-08-03 08:00:50.146391', 2),
(4, '2021-08-03 08:00:50.147391', NULL, '2021-08-03 08:00:50.147391', NULL, 0, 4, '4', 0, 0, 0, 0, 0, NULL, '2021-08-03 08:00:50.146391', 2),
(5, '2021-08-03 08:00:50.147391', NULL, '2021-08-03 08:00:50.147391', NULL, 0, 5, '5', 0, 0, 0, 0, 0, NULL, '2021-08-03 08:00:50.146391', 2),
(6, '2021-08-03 08:00:50.147391', NULL, '2021-08-03 08:00:50.147391', NULL, 0, 6, '6', 0, 0, 0, 0, 0, NULL, '2021-08-03 08:00:50.146391', 2),
(7, '2021-08-03 08:00:50.147391', NULL, '2021-08-03 08:00:50.147391', NULL, 0, 7, '7', 0, 0, 0, 0, 0, NULL, '2021-08-03 08:00:50.146391', 2),
(8, '2021-08-03 08:00:50.147391', NULL, '2021-08-03 08:00:50.147391', NULL, 0, 8, '8', 0, 0, 0, 0, 0, NULL, '2021-08-03 08:00:50.146391', 2),
(9, '2021-08-03 08:00:50.147391', NULL, '2021-08-03 08:00:50.147391', NULL, 0, 9, '9', 0, 0, 0, 0, 0, NULL, '2021-08-03 08:00:50.146391', 2),
(10, '2021-08-03 08:00:50.147391', NULL, '2021-08-03 08:00:50.147391', NULL, 0, 10, '10', 0, 0, 0, 0, 0, NULL, '2021-08-03 08:00:50.146391', 2);

-- --------------------------------------------------------

--
-- Table structure for table `acc_accgroups`
--

CREATE TABLE `acc_accgroups` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `group_no` int(11) NOT NULL,
  `group_name` varchar(100) NOT NULL,
  `verify_mode` int(11) NOT NULL,
  `timezone1` int(11) DEFAULT NULL,
  `timezone2` int(11) DEFAULT NULL,
  `timezone3` int(11) DEFAULT NULL,
  `is_include_holiday` smallint(6) NOT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `area_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `acc_accgroups`
--

INSERT INTO `acc_accgroups` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `group_no`, `group_name`, `verify_mode`, `timezone1`, `timezone2`, `timezone3`, `is_include_holiday`, `update_time`, `area_id`) VALUES
(1, '2021-08-03 08:00:50.140806', NULL, '2021-08-03 08:00:50.140806', NULL, 0, 1, '1', 0, 1, 0, 0, 0, '2021-08-03 08:00:50.139805', 2);

-- --------------------------------------------------------

--
-- Table structure for table `acc_accholiday`
--

CREATE TABLE `acc_accholiday` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `area_id` int(11) NOT NULL,
  `holiday_id` int(11) NOT NULL,
  `timezone_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `acc_accprivilege`
--

CREATE TABLE `acc_accprivilege` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `is_group_timezone` smallint(6) NOT NULL,
  `timezone1` int(11) DEFAULT NULL,
  `timezone2` int(11) DEFAULT NULL,
  `timezone3` int(11) DEFAULT NULL,
  `is_group_verifycode` smallint(6) NOT NULL,
  `verify_mode` int(11) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `area_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `acc_accprivilege`
--

INSERT INTO `acc_accprivilege` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `is_group_timezone`, `timezone1`, `timezone2`, `timezone3`, `is_group_verifycode`, `verify_mode`, `update_time`, `area_id`, `employee_id`, `group_id`) VALUES
(10, '2021-08-24 14:29:44.993550', NULL, '2021-08-24 14:29:44.993550', NULL, 0, 1, 0, 0, 0, 1, -1, '2021-08-24 14:29:44.993550', 2, 59, 1),
(11, '2021-08-24 14:29:45.700985', NULL, '2021-08-24 14:29:45.700985', NULL, 0, 1, 0, 0, 0, 1, -1, '2021-08-24 14:29:45.700985', 2, 60, 1),
(12, '2021-08-24 14:29:46.610448', NULL, '2021-08-24 14:29:46.610448', NULL, 0, 1, 0, 0, 0, 1, -1, '2021-08-24 14:29:46.609441', 2, 61, 1),
(13, '2021-09-15 10:23:59.611900', NULL, '2021-09-15 10:23:59.611900', NULL, 0, 1, 0, 0, 0, 1, -1, '2021-09-15 10:23:59.611900', 2, 63, 1);

-- --------------------------------------------------------

--
-- Table structure for table `acc_accterminal`
--

CREATE TABLE `acc_accterminal` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `door_name` varchar(50) DEFAULT NULL,
  `door_lock_delay` int(11) NOT NULL,
  `door_sensor_delay` int(11) NOT NULL,
  `door_sensor_type` smallint(6) NOT NULL,
  `door_alarm_delay` int(11) NOT NULL,
  `retry_times` smallint(6) NOT NULL,
  `valid_holiday` smallint(6) NOT NULL,
  `nc_time_period` int(11) NOT NULL,
  `no_time_period` int(11) NOT NULL,
  `speaker_alarm` smallint(6) NOT NULL,
  `duress_fun_on` smallint(6) NOT NULL,
  `alarm_1_1` smallint(6) NOT NULL,
  `alarm_1_n` smallint(6) NOT NULL,
  `alarm_password` smallint(6) NOT NULL,
  `duress_alarm_delay` int(11) NOT NULL,
  `anti_passback_mode` smallint(6) NOT NULL,
  `anti_door_direction` smallint(6) NOT NULL,
  `verify_mode_485` smallint(6) NOT NULL,
  `push_time` datetime(6) DEFAULT NULL,
  `terminal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `acc_acctimezone`
--

CREATE TABLE `acc_acctimezone` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `timezone_no` int(11) NOT NULL,
  `timezone_name` varchar(100) NOT NULL,
  `sun_start` time(6) NOT NULL,
  `sun_end` time(6) NOT NULL,
  `sun_on` smallint(6) DEFAULT NULL,
  `mon_start` time(6) NOT NULL,
  `mon_end` time(6) NOT NULL,
  `mon_on` smallint(6) DEFAULT NULL,
  `tue_start` time(6) NOT NULL,
  `tue_end` time(6) NOT NULL,
  `tue_on` smallint(6) DEFAULT NULL,
  `wed_start` time(6) NOT NULL,
  `wed_end` time(6) NOT NULL,
  `wed_on` smallint(6) DEFAULT NULL,
  `thu_start` time(6) NOT NULL,
  `thu_end` time(6) NOT NULL,
  `thu_on` smallint(6) DEFAULT NULL,
  `fri_start` time(6) NOT NULL,
  `fri_end` time(6) NOT NULL,
  `fri_on` smallint(6) DEFAULT NULL,
  `sat_start` time(6) NOT NULL,
  `sat_end` time(6) NOT NULL,
  `sat_on` smallint(6) DEFAULT NULL,
  `remark` varchar(999) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `area_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `acc_acctimezone`
--

INSERT INTO `acc_acctimezone` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `timezone_no`, `timezone_name`, `sun_start`, `sun_end`, `sun_on`, `mon_start`, `mon_end`, `mon_on`, `tue_start`, `tue_end`, `tue_on`, `wed_start`, `wed_end`, `wed_on`, `thu_start`, `thu_end`, `thu_on`, `fri_start`, `fri_end`, `fri_on`, `sat_start`, `sat_end`, `sat_on`, `remark`, `update_time`, `area_id`) VALUES
(1, '2021-08-03 08:00:50.075761', NULL, '2021-08-03 08:00:50.075761', NULL, 0, 1, '1', '00:00:00.000000', '23:59:00.000000', 1, '00:00:00.000000', '23:59:00.000000', 1, '00:00:00.000000', '23:59:00.000000', 1, '00:00:00.000000', '23:59:00.000000', 1, '00:00:00.000000', '23:59:00.000000', 1, '00:00:00.000000', '23:59:00.000000', 1, '00:00:00.000000', '23:59:00.000000', 1, NULL, '2021-08-03 08:00:50.075761', 2);

-- --------------------------------------------------------

--
-- Table structure for table `attparam`
--

CREATE TABLE `attparam` (
  `id` int(11) NOT NULL,
  `paraname` varchar(30) NOT NULL,
  `paratype` varchar(10) DEFAULT NULL,
  `paravalue` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attparam`
--

INSERT INTO `attparam` (`id`, `paraname`, `paratype`, `paravalue`) VALUES
(1, 'ruleID', 'rule_0', '0'),
(2, 'DeptID', 'rule_0', '0'),
(3, 'ApplyName', 'rule_0', 'All'),
(4, 'ruleName', 'rule_0', 'Default Attendance Rules'),
(5, 'MinsEarly', 'rule_0', '0'),
(6, 'MinsLate', 'rule_0', '0'),
(7, 'MinsNoBreakIn', 'rule_0', '60'),
(8, 'MinsNoBreakOut', 'rule_0', '60'),
(9, 'MinsNoIn', 'rule_0', '60'),
(10, 'MinsNoLeave', 'rule_0', '60'),
(11, 'MinsNotOverTime', 'rule_0', '60'),
(12, 'MinsWorkDay', 'rule_0', '480'),
(13, 'NoBreakIn', 'rule_0', '1012'),
(14, 'NoBreakOut', 'rule_0', '1012'),
(15, 'NoIn', 'rule_0', '1001'),
(16, 'NoLeave', 'rule_0', '1002'),
(17, 'OutOverTime', 'rule_0', '0'),
(18, 'TwoDay', 'rule_0', '0'),
(19, 'CheckInColor', 'rule_0', '16777151'),
(20, 'CheckOutColor', 'rule_0', '12910591'),
(21, 'DBVersion', '', '2002'),
(22, 'InstallDate', '', '8cc18Eibi3ofiSuHEgYay4CKwD7IbOVnfpgkIzPXLq2ln73aeYR4'),
(23, 'SysDate', '', '8cc18Eibi3ofiSuHEgYay4CKwD7IbOVnfpgkIzPXLq2ln73aeYR4'),
(24, 'ADMSDBVersion', '', '544;');

-- --------------------------------------------------------

--
-- Table structure for table `att_attcalclog`
--

CREATE TABLE `att_attcalclog` (
  `id` int(11) NOT NULL,
  `dept_id` int(11) DEFAULT NULL,
  `emp_id` int(11) DEFAULT NULL,
  `start_date` datetime(6) NOT NULL,
  `end_date` datetime(6) NOT NULL,
  `update_time` datetime(6) NOT NULL,
  `log_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_attcode`
--

CREATE TABLE `att_attcode` (
  `id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `alias` varchar(50) NOT NULL,
  `display_format` smallint(6) NOT NULL,
  `symbol` varchar(20) NOT NULL,
  `round_off` smallint(6) NOT NULL,
  `min_val` decimal(4,1) NOT NULL,
  `symbol_only` tinyint(1) NOT NULL,
  `order` smallint(6) NOT NULL,
  `color_setting` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `att_attcode`
--

INSERT INTO `att_attcode` (`id`, `code`, `alias`, `display_format`, `symbol`, `round_off`, `min_val`, `symbol_only`, `order`, `color_setting`) VALUES
(1, 'duration', 'Duration', 4, '', 1, '0.1', 0, 1, NULL),
(2, 'duty_duration', 'Duty Duration', 4, '', 1, '0.1', 0, 2, NULL),
(3, 'total_hrs', 'Total Hours', 4, '', 1, '0.1', 0, 3, NULL),
(4, 'worked_hrs', 'Worked Hours', 4, '', 1, '0.1', 0, 4, NULL),
(5, 'actual_worked', 'Actual Worked Hours', 4, '', 1, '0.1', 0, 5, NULL),
(6, 'break_duration', 'Break Duration', 4, '', 1, '0.1', 0, 6, NULL),
(7, 'break_total_hrs', 'Break Total Hours', 4, '', 1, '0.1', 0, 7, NULL),
(8, 'break_hrs', 'Break Hours', 4, '', 1, '0.1', 0, 8, NULL),
(9, 'actual_break', 'Actual Break Hours', 4, '', 1, '0.1', 0, 9, NULL),
(10, 'approval_hrs', 'Approval Hours', 4, '', 1, '0.1', 0, 10, NULL),
(11, 'early_in', 'Early In', 4, '', 1, '0.1', 0, 11, NULL),
(12, 'late_out', 'Late Out', 4, '', 1, '0.1', 0, 12, NULL),
(13, 'unschedule', 'Unscheduled', 4, '', 1, '0.1', 0, 13, NULL),
(14, 'remaining', 'Remaining', 4, '', 1, '0.1', 0, 14, NULL),
(15, 'total_ot', 'Total OT', 4, '', 1, '0.1', 0, 15, NULL),
(16, 'rule_total_ot', 'Rule Total OT', 4, '', 1, '0.1', 0, 16, NULL),
(17, 'total_leave', 'Total Leaves', 2, '', 1, '0.1', 0, 17, NULL),
(18, 'day_off', 'Day Off', 0, 'Off', 0, '0.1', 1, 18, NULL),
(19, 'weekend', 'Weekend', 0, 'W', 0, '0.1', 1, 19, NULL),
(20, 'holiday', 'Holiday', 0, 'H', 0, '0.1', 1, 20, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `att_attemployee`
--

CREATE TABLE `att_attemployee` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `enable_attendance` tinyint(1) NOT NULL,
  `enable_schedule` tinyint(1) NOT NULL,
  `enable_overtime` tinyint(1) NOT NULL,
  `enable_holiday` tinyint(1) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `group_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `att_attemployee`
--

INSERT INTO `att_attemployee` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `enable_attendance`, `enable_schedule`, `enable_overtime`, `enable_holiday`, `emp_id`, `group_id`) VALUES
(9, '2021-08-24 14:29:44.398011', NULL, '2021-08-24 14:29:44.398011', NULL, 0, 1, 1, 1, 1, 59, NULL),
(10, '2021-08-24 14:29:45.514799', NULL, '2021-08-24 14:29:45.514799', NULL, 0, 1, 1, 1, 1, 60, NULL),
(11, '2021-08-24 14:29:46.556429', NULL, '2021-08-24 14:29:46.556429', NULL, 0, 1, 1, 1, 1, 61, NULL),
(12, '2021-09-15 10:23:58.655260', NULL, '2021-09-15 10:23:58.655260', NULL, 0, 1, 1, 1, 1, 63, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `att_attgroup`
--

CREATE TABLE `att_attgroup` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `att_attgroup`
--

INSERT INTO `att_attgroup` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `code`, `name`) VALUES
(1, '2021-08-03 07:46:42.961642', NULL, '2021-08-03 07:46:42.961642', NULL, 0, '1', 'default');

-- --------------------------------------------------------

--
-- Table structure for table `att_attpolicy`
--

CREATE TABLE `att_attpolicy` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `use_ot` smallint(6) NOT NULL,
  `weekend1` smallint(6) NOT NULL,
  `weekend2` smallint(6) NOT NULL,
  `start_of_week` smallint(6) NOT NULL,
  `max_hrs` decimal(4,1) NOT NULL,
  `day_change` time(6) NOT NULL,
  `paring_rule` smallint(6) NOT NULL,
  `punch_period` smallint(6) NOT NULL,
  `daily_ot` tinyint(1) NOT NULL,
  `daily_ot_rule` char(32) DEFAULT NULL,
  `weekly_ot` tinyint(1) NOT NULL,
  `weekly_ot_rule` char(32) DEFAULT NULL,
  `weekend_ot` tinyint(1) NOT NULL,
  `weekend_ot_rule` char(32) DEFAULT NULL,
  `holiday_ot` tinyint(1) NOT NULL,
  `holiday_ot_rule` char(32) DEFAULT NULL,
  `late_in2absence` int(11) NOT NULL,
  `early_out2absence` int(11) NOT NULL,
  `miss_in` smallint(6) NOT NULL,
  `late_in_hrs` int(11) NOT NULL,
  `miss_out` smallint(6) NOT NULL,
  `early_out_hrs` int(11) NOT NULL,
  `require_capture` tinyint(1) NOT NULL,
  `require_work_code` tinyint(1) NOT NULL,
  `require_punch_state` tinyint(1) NOT NULL,
  `email_send_time` time(6) NOT NULL,
  `global_frequency` smallint(6) NOT NULL,
  `global_send_day` smallint(6) NOT NULL,
  `max_absent` smallint(6) NOT NULL,
  `max_early_out` smallint(6) NOT NULL,
  `max_late_in` smallint(6) NOT NULL,
  `sending_day` smallint(6) NOT NULL,
  `weekend1_color_setting` varchar(30) DEFAULT NULL,
  `weekend2_color_setting` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `att_attpolicy`
--

INSERT INTO `att_attpolicy` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `use_ot`, `weekend1`, `weekend2`, `start_of_week`, `max_hrs`, `day_change`, `paring_rule`, `punch_period`, `daily_ot`, `daily_ot_rule`, `weekly_ot`, `weekly_ot_rule`, `weekend_ot`, `weekend_ot_rule`, `holiday_ot`, `holiday_ot_rule`, `late_in2absence`, `early_out2absence`, `miss_in`, `late_in_hrs`, `miss_out`, `early_out_hrs`, `require_capture`, `require_work_code`, `require_punch_state`, `email_send_time`, `global_frequency`, `global_send_day`, `max_absent`, `max_early_out`, `max_late_in`, `sending_day`, `weekend1_color_setting`, `weekend2_color_setting`) VALUES
(1, '2021-08-03 07:46:43.534857', NULL, '2021-08-03 07:46:43.534857', NULL, 0, 1, 7, 7, 0, '12.0', '00:00:00.000000', 1, 1, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 100, 100, 1, 60, 1, 60, 0, 0, 0, '00:00:00.000000', 0, 0, 0, 0, 0, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `att_attreportsetting`
--

CREATE TABLE `att_attreportsetting` (
  `id` int(11) NOT NULL,
  `resign_emp` smallint(6) NOT NULL,
  `short_date` smallint(6) NOT NULL,
  `short_time` smallint(6) NOT NULL,
  `filter_by_hire_date` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `att_attreportsetting`
--

INSERT INTO `att_attreportsetting` (`id`, `resign_emp`, `short_date`, `short_time`, `filter_by_hire_date`) VALUES
(1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `att_attrule`
--

CREATE TABLE `att_attrule` (
  `param_name` varchar(20) NOT NULL,
  `param_value` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `att_attrule`
--

INSERT INTO `att_attrule` (`param_name`, `param_value`) VALUES
('global_att_rule', '{\"in_rule\": 1, \"out_rule\": 1, \"use_ot\": 1, \"punch_period\": 1, \"weekend\": [], \"mins_late_absent\": 100, \"mins_early_absent\": 100, \"miss_in\": 1, \"miss_in_mins\": 60, \"miss_out\": 1, \"miss_out_mins\": 60, \"leave_include_in\": 2, \"leave_include_out\": 2, \"training_include_in\": 2, \"training_include_out\": 2, \"check_in\": \"0\", \"check_out\": \"1\", \"break_out\": \"2\", \"break_in\": \"3\", \"overtime_in\": \"4\", \"overtime_out\": \"5\", \"enable_capture\": 0, \"enable_workcode\": 0, \"enable_funckey\": 0}');

-- --------------------------------------------------------

--
-- Table structure for table `att_attschedule`
--

CREATE TABLE `att_attschedule` (
  `id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `employee_id` int(11) NOT NULL,
  `shift_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_attshift`
--

CREATE TABLE `att_attshift` (
  `id` int(11) NOT NULL,
  `alias` varchar(50) NOT NULL,
  `cycle_unit` smallint(6) NOT NULL,
  `shift_cycle` int(11) NOT NULL,
  `work_weekend` tinyint(1) NOT NULL,
  `weekend_type` smallint(6) NOT NULL,
  `work_day_off` tinyint(1) NOT NULL,
  `day_off_type` smallint(6) NOT NULL,
  `auto_shift` smallint(6) NOT NULL,
  `enable_ot_rule` tinyint(1) NOT NULL,
  `frequency` smallint(6) NOT NULL,
  `ot_rule` char(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_breaktime`
--

CREATE TABLE `att_breaktime` (
  `id` int(11) NOT NULL,
  `alias` varchar(50) NOT NULL,
  `period_start` time(6) NOT NULL,
  `duration` int(11) NOT NULL,
  `end_margin` int(11) NOT NULL,
  `func_key` smallint(6) NOT NULL,
  `available_interval_type` smallint(6) NOT NULL,
  `available_interval` int(11) NOT NULL,
  `multiple_punch` smallint(6) NOT NULL,
  `calc_type` smallint(6) NOT NULL,
  `minimum_duration` int(11) DEFAULT NULL,
  `early_in` smallint(6) NOT NULL,
  `late_in` smallint(6) NOT NULL,
  `profit_rule` tinyint(1) NOT NULL,
  `min_early_in` int(11) NOT NULL,
  `loss_rule` tinyint(1) NOT NULL,
  `min_late_in` int(11) NOT NULL,
  `loss_code_id` int(11) DEFAULT NULL,
  `profit_code_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_changeschedule`
--

CREATE TABLE `att_changeschedule` (
  `workflowinstance_ptr_id` int(11) NOT NULL,
  `att_date` date NOT NULL,
  `previous_timeinterval` varchar(100) DEFAULT NULL,
  `apply_time` datetime(6) NOT NULL,
  `apply_reason` varchar(200) DEFAULT NULL,
  `attachment` varchar(100) DEFAULT NULL,
  `timeinterval_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_departmentpolicy`
--

CREATE TABLE `att_departmentpolicy` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `use_ot` smallint(6) NOT NULL,
  `weekend1` smallint(6) NOT NULL,
  `weekend2` smallint(6) NOT NULL,
  `start_of_week` smallint(6) NOT NULL,
  `max_hrs` decimal(4,1) NOT NULL,
  `day_change` time(6) NOT NULL,
  `paring_rule` smallint(6) NOT NULL,
  `punch_period` smallint(6) NOT NULL,
  `daily_ot` tinyint(1) NOT NULL,
  `daily_ot_rule` char(32) DEFAULT NULL,
  `weekly_ot` tinyint(1) NOT NULL,
  `weekly_ot_rule` char(32) DEFAULT NULL,
  `weekend_ot` tinyint(1) NOT NULL,
  `weekend_ot_rule` char(32) DEFAULT NULL,
  `holiday_ot` tinyint(1) NOT NULL,
  `holiday_ot_rule` char(32) DEFAULT NULL,
  `late_in2absence` int(11) NOT NULL,
  `early_out2absence` int(11) NOT NULL,
  `miss_in` smallint(6) NOT NULL,
  `late_in_hrs` int(11) NOT NULL,
  `miss_out` smallint(6) NOT NULL,
  `early_out_hrs` int(11) NOT NULL,
  `require_capture` tinyint(1) NOT NULL,
  `require_work_code` tinyint(1) NOT NULL,
  `require_punch_state` tinyint(1) NOT NULL,
  `department_id` int(11) NOT NULL,
  `dept_frequency` smallint(6) NOT NULL,
  `dept_send_day` smallint(6) NOT NULL,
  `email_send_time` time(6) NOT NULL,
  `max_absent` smallint(6) NOT NULL,
  `max_early_out` smallint(6) NOT NULL,
  `max_late_in` smallint(6) NOT NULL,
  `sending_day` smallint(6) NOT NULL,
  `weekend1_color_setting` varchar(30) DEFAULT NULL,
  `weekend2_color_setting` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_departmentschedule`
--

CREATE TABLE `att_departmentschedule` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `department_id` int(11) NOT NULL,
  `shift_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_deptattrule`
--

CREATE TABLE `att_deptattrule` (
  `id` int(11) NOT NULL,
  `alias` varchar(50) NOT NULL,
  `rule` longtext DEFAULT NULL,
  `department_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_grouppolicy`
--

CREATE TABLE `att_grouppolicy` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `use_ot` smallint(6) NOT NULL,
  `weekend1` smallint(6) NOT NULL,
  `weekend2` smallint(6) NOT NULL,
  `start_of_week` smallint(6) NOT NULL,
  `max_hrs` decimal(4,1) NOT NULL,
  `day_change` time(6) NOT NULL,
  `paring_rule` smallint(6) NOT NULL,
  `punch_period` smallint(6) NOT NULL,
  `daily_ot` tinyint(1) NOT NULL,
  `daily_ot_rule` char(32) DEFAULT NULL,
  `weekly_ot` tinyint(1) NOT NULL,
  `weekly_ot_rule` char(32) DEFAULT NULL,
  `weekend_ot` tinyint(1) NOT NULL,
  `weekend_ot_rule` char(32) DEFAULT NULL,
  `holiday_ot` tinyint(1) NOT NULL,
  `holiday_ot_rule` char(32) DEFAULT NULL,
  `late_in2absence` int(11) NOT NULL,
  `early_out2absence` int(11) NOT NULL,
  `miss_in` smallint(6) NOT NULL,
  `late_in_hrs` int(11) NOT NULL,
  `miss_out` smallint(6) NOT NULL,
  `early_out_hrs` int(11) NOT NULL,
  `require_capture` tinyint(1) NOT NULL,
  `require_work_code` tinyint(1) NOT NULL,
  `require_punch_state` tinyint(1) NOT NULL,
  `group_id` int(11) NOT NULL,
  `email_send_time` time(6) NOT NULL,
  `group_frequency` smallint(6) NOT NULL,
  `group_send_day` smallint(6) NOT NULL,
  `max_absent` smallint(6) NOT NULL,
  `max_early_out` smallint(6) NOT NULL,
  `max_late_in` smallint(6) NOT NULL,
  `sending_day` smallint(6) NOT NULL,
  `weekend1_color_setting` varchar(30) DEFAULT NULL,
  `weekend2_color_setting` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_groupschedule`
--

CREATE TABLE `att_groupschedule` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `group_id` int(11) NOT NULL,
  `shift_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_holiday`
--

CREATE TABLE `att_holiday` (
  `id` int(11) NOT NULL,
  `alias` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `duration_day` smallint(6) NOT NULL,
  `enable_ot_rule` tinyint(1) NOT NULL,
  `ot_rule` char(32) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `att_group_id` int(11) DEFAULT NULL,
  `color_setting` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_leave`
--

CREATE TABLE `att_leave` (
  `workflowinstance_ptr_id` int(11) NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `apply_reason` longtext DEFAULT NULL,
  `apply_time` datetime(6) NOT NULL,
  `attachment` varchar(100) DEFAULT NULL,
  `pay_code_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_manuallog`
--

CREATE TABLE `att_manuallog` (
  `workflowinstance_ptr_id` int(11) NOT NULL,
  `punch_time` datetime(6) NOT NULL,
  `punch_state` varchar(5) NOT NULL,
  `work_code` varchar(20) DEFAULT NULL,
  `apply_reason` longtext DEFAULT NULL,
  `apply_time` datetime(6) NOT NULL,
  `attachment` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_overtime`
--

CREATE TABLE `att_overtime` (
  `workflowinstance_ptr_id` int(11) NOT NULL,
  `overtime_type` smallint(6) NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `apply_reason` longtext DEFAULT NULL,
  `apply_time` datetime(6) NOT NULL,
  `attachment` varchar(100) DEFAULT NULL,
  `pay_code_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_overtimepolicy`
--

CREATE TABLE `att_overtimepolicy` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `mode` smallint(6) NOT NULL,
  `hrs_from` decimal(4,1) NOT NULL,
  `hrs_to` decimal(4,1) NOT NULL,
  `master` char(32) NOT NULL,
  `overnight_pay_code_id` int(11) DEFAULT NULL,
  `pay_code_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_paycode`
--

CREATE TABLE `att_paycode` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `code_type` smallint(6) NOT NULL,
  `tag` smallint(6) DEFAULT NULL,
  `fixed_code` smallint(6) DEFAULT NULL,
  `is_work` tinyint(1) NOT NULL,
  `fixed_hours` decimal(8,2) NOT NULL,
  `is_paid` tinyint(1) NOT NULL,
  `is_benefit` tinyint(1) NOT NULL,
  `round_off` smallint(6) NOT NULL,
  `min_val` decimal(4,1) NOT NULL,
  `display_format` smallint(6) NOT NULL,
  `symbol` varchar(20) DEFAULT NULL,
  `display_order` smallint(6) NOT NULL,
  `desc` longtext DEFAULT NULL,
  `is_display` tinyint(1) NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `color_setting` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `att_paycode`
--

INSERT INTO `att_paycode` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `code`, `name`, `code_type`, `tag`, `fixed_code`, `is_work`, `fixed_hours`, `is_paid`, `is_benefit`, `round_off`, `min_val`, `display_format`, `symbol`, `display_order`, `desc`, `is_display`, `is_default`, `color_setting`) VALUES
(1, '2021-08-03 07:46:40.278762', NULL, '2021-08-03 07:46:40.278762', NULL, 0, 'REG', 'Regular', 1, NULL, 1, 1, '8.00', 1, 0, 1, '0.1', 2, 'P', 1, NULL, 1, 1, NULL),
(2, '2021-08-03 07:46:40.330669', NULL, '2021-08-03 07:46:40.330669', NULL, 0, 'L', 'Late In', 4, NULL, 2, 1, '8.00', 1, 0, 1, '1.0', 1, 'L', 2, NULL, 1, 1, NULL),
(3, '2021-08-03 07:46:40.377672', NULL, '2021-08-03 07:46:40.377672', NULL, 0, 'E', 'Early Out', 4, NULL, 3, 1, '8.00', 1, 0, 1, '1.0', 1, 'E', 3, NULL, 1, 1, NULL),
(4, '2021-08-03 07:46:40.475654', NULL, '2021-08-03 07:46:40.475654', NULL, 0, 'A', 'Absence', 4, NULL, 4, 1, '8.00', 1, 0, 1, '0.1', 2, 'A', 4, NULL, 1, 1, NULL),
(5, '2021-08-03 07:46:40.514025', NULL, '2021-08-03 07:46:40.514025', NULL, 0, 'NOT', 'Normal OT', 2, NULL, NULL, 1, '8.00', 1, 0, 1, '0.1', 2, '', 5, NULL, 1, 1, NULL),
(6, '2021-08-03 07:46:40.600754', NULL, '2021-08-03 07:46:40.600754', NULL, 0, 'WOT', 'Weekend OT', 2, NULL, NULL, 1, '8.00', 1, 0, 1, '0.1', 2, '', 6, NULL, 1, 1, NULL),
(7, '2021-08-03 07:46:40.656161', NULL, '2021-08-03 07:46:40.656161', NULL, 0, 'HOT', 'Holiday OT', 2, NULL, NULL, 1, '8.00', 1, 0, 1, '0.1', 2, '', 7, NULL, 1, 1, NULL),
(8, '2021-08-03 07:46:40.739676', NULL, '2021-08-03 07:46:40.739676', NULL, 0, 'OT1', 'OT1', 2, 6, NULL, 1, '8.00', 1, 0, 1, '0.1', 2, '', 8, NULL, 1, 1, NULL),
(9, '2021-08-03 07:46:41.034333', NULL, '2021-08-03 07:46:41.034333', NULL, 0, 'OT2', 'OT2', 2, 7, NULL, 1, '8.00', 1, 0, 1, '0.1', 2, '', 9, NULL, 1, 1, NULL),
(10, '2021-08-03 07:46:41.108685', NULL, '2021-08-03 07:46:41.108685', NULL, 0, 'OT3', 'OT3', 2, 8, NULL, 1, '8.00', 1, 0, 1, '0.1', 2, '', 10, NULL, 1, 1, NULL),
(11, '2021-08-03 07:46:41.171956', NULL, '2021-08-03 07:46:41.171956', NULL, 0, 'AL', 'Annual Leave', 3, NULL, NULL, 0, '8.00', 1, 1, 1, '0.1', 2, '', 11, NULL, 1, 1, NULL),
(12, '2021-08-03 07:46:41.259027', NULL, '2021-08-03 07:46:41.259027', NULL, 0, 'SL', 'Sick Leave', 3, NULL, NULL, 0, '8.00', 0, 1, 1, '0.1', 2, '', 12, NULL, 1, 1, NULL),
(13, '2021-08-03 07:46:41.297925', NULL, '2021-08-03 07:46:41.297925', NULL, 0, 'CL', 'Casual Leave', 3, NULL, NULL, 0, '8.00', 0, 1, 1, '0.1', 2, '', 13, NULL, 1, 1, NULL),
(14, '2021-08-03 07:46:41.350426', NULL, '2021-08-03 07:46:41.350426', NULL, 0, 'ML', 'Maternity Leave', 3, NULL, NULL, 0, '8.00', 0, 1, 1, '0.1', 2, '', 14, NULL, 1, 1, NULL),
(15, '2021-08-03 07:46:41.392400', NULL, '2021-08-03 07:46:41.392400', NULL, 0, 'COL', 'Compassionate Leave', 3, NULL, NULL, 0, '8.00', 0, 0, 1, '0.1', 2, '', 15, NULL, 1, 1, NULL),
(16, '2021-08-03 07:46:41.492686', NULL, '2021-08-03 07:46:41.492686', NULL, 0, 'BT', 'Business Trip', 3, NULL, NULL, 0, '8.00', 0, 0, 1, '0.1', 2, '', 16, NULL, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `att_payloadattcode`
--

CREATE TABLE `att_payloadattcode` (
  `id` char(32) NOT NULL,
  `att_date` date NOT NULL,
  `week` int(11) NOT NULL,
  `weekday` int(11) NOT NULL,
  `att_code_alias` varchar(50) NOT NULL,
  `att_code_symbol` varchar(20) DEFAULT NULL,
  `duration` int(11) NOT NULL,
  `workday` decimal(4,1) NOT NULL,
  `hours` decimal(6,1) NOT NULL,
  `minutes` decimal(8,1) NOT NULL,
  `is_weekly` tinyint(1) NOT NULL,
  `att_code_id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `shift_id` int(11) DEFAULT NULL,
  `time_card_id` char(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_payloadbase`
--

CREATE TABLE `att_payloadbase` (
  `uuid` varchar(36) NOT NULL,
  `att_date` date DEFAULT NULL,
  `weekday` smallint(6) DEFAULT NULL,
  `check_in` datetime(6) DEFAULT NULL,
  `check_out` datetime(6) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `duty_duration` int(11) DEFAULT NULL,
  `work_day` double NOT NULL,
  `clock_in` datetime(6) DEFAULT NULL,
  `clock_out` datetime(6) DEFAULT NULL,
  `total_time` int(11) DEFAULT NULL,
  `duty_worked` int(11) DEFAULT NULL,
  `actual_worked` int(11) DEFAULT NULL,
  `unscheduled` int(11) DEFAULT NULL,
  `remaining` int(11) DEFAULT NULL,
  `total_worked` int(11) DEFAULT NULL,
  `late` int(11) DEFAULT NULL,
  `early_leave` int(11) DEFAULT NULL,
  `short` int(11) DEFAULT NULL,
  `absent` int(11) DEFAULT NULL,
  `leave` int(11) DEFAULT NULL,
  `exception` varchar(50) DEFAULT NULL,
  `day_off` smallint(6) NOT NULL,
  `break_time_id` varchar(36) DEFAULT NULL,
  `emp_id` int(11) NOT NULL,
  `overtime_id` varchar(36) DEFAULT NULL,
  `timetable_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_payloadbreak`
--

CREATE TABLE `att_payloadbreak` (
  `uuid` varchar(36) NOT NULL,
  `break_out` datetime(6) DEFAULT NULL,
  `break_in` datetime(6) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `taken` int(11) DEFAULT NULL,
  `actual_duration` int(11) DEFAULT NULL,
  `early_in` int(11) DEFAULT NULL,
  `late_in` int(11) DEFAULT NULL,
  `late` int(11) DEFAULT NULL,
  `early_leave` int(11) DEFAULT NULL,
  `absent` int(11) DEFAULT NULL,
  `work_time` int(11) DEFAULT NULL,
  `overtime` int(11) DEFAULT NULL,
  `weekend_ot` int(11) DEFAULT NULL,
  `holiday_ot` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_payloadeffectpunch`
--

CREATE TABLE `att_payloadeffectpunch` (
  `id` char(32) NOT NULL,
  `att_date` date NOT NULL,
  `punch_datetime` datetime(6) NOT NULL,
  `punch_date` date NOT NULL,
  `punch_time` time(6) NOT NULL,
  `week` smallint(6) NOT NULL,
  `weekday` smallint(6) NOT NULL,
  `work_code` varchar(20) NOT NULL,
  `punch_state` varchar(5) NOT NULL,
  `adjust_state` varchar(5) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `time_card_id` char(32) DEFAULT NULL,
  `trans_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_payloadexception`
--

CREATE TABLE `att_payloadexception` (
  `uuid` varchar(36) NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `duration` int(11) DEFAULT NULL,
  `days` double DEFAULT NULL,
  `data_type` smallint(6) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `skd_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_payloadmulpunchset`
--

CREATE TABLE `att_payloadmulpunchset` (
  `id` int(11) NOT NULL,
  `att_date` date NOT NULL,
  `weekday` smallint(6) DEFAULT NULL,
  `data_index` smallint(6) NOT NULL,
  `clock_in` datetime(6) DEFAULT NULL,
  `in_id` int(11) DEFAULT NULL,
  `clock_out` datetime(6) DEFAULT NULL,
  `out_id` int(11) DEFAULT NULL,
  `total_time` int(11) DEFAULT NULL,
  `worked_time` int(11) DEFAULT NULL,
  `data_type` smallint(6) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `timetable_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_payloadovertime`
--

CREATE TABLE `att_payloadovertime` (
  `uuid` varchar(36) NOT NULL,
  `normal_wt` int(11) DEFAULT NULL,
  `normal_ot` int(11) DEFAULT NULL,
  `weekend_ot` int(11) DEFAULT NULL,
  `holiday_ot` int(11) DEFAULT NULL,
  `ot_lv1` int(11) DEFAULT NULL,
  `ot_lv2` int(11) DEFAULT NULL,
  `ot_lv3` int(11) DEFAULT NULL,
  `total_ot` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_payloadparing`
--

CREATE TABLE `att_payloadparing` (
  `id` char(32) NOT NULL,
  `stamp` bigint(20) NOT NULL,
  `att_date` date NOT NULL,
  `week` smallint(6) NOT NULL,
  `weekday` smallint(6) NOT NULL,
  `data_type` smallint(6) NOT NULL,
  `clock_in` datetime(6) DEFAULT NULL,
  `in_date` date DEFAULT NULL,
  `in_time` time(6) DEFAULT NULL,
  `clock_out` datetime(6) DEFAULT NULL,
  `out_date` date DEFAULT NULL,
  `out_time` time(6) DEFAULT NULL,
  `duration` int(11) NOT NULL,
  `worked_duration` int(11) NOT NULL,
  `data_index` int(11) NOT NULL,
  `workday` decimal(4,1) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `in_trans_id` int(11) DEFAULT NULL,
  `out_trans_id` int(11) DEFAULT NULL,
  `pay_code_id` int(11) DEFAULT NULL,
  `time_card_id` char(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_payloadpaycode`
--

CREATE TABLE `att_payloadpaycode` (
  `id` char(32) NOT NULL,
  `att_date` date NOT NULL,
  `week` int(11) NOT NULL,
  `weekday` int(11) NOT NULL,
  `pay_code_alias` varchar(50) NOT NULL,
  `pay_code_symbol` varchar(20) DEFAULT NULL,
  `duration` int(11) NOT NULL,
  `workday` decimal(4,1) NOT NULL,
  `hours` decimal(6,1) NOT NULL,
  `minutes` decimal(8,1) NOT NULL,
  `is_weekly` tinyint(1) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `pay_code_id` int(11) NOT NULL,
  `shift_id` int(11) DEFAULT NULL,
  `time_card_id` char(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_payloadpunch`
--

CREATE TABLE `att_payloadpunch` (
  `uuid` varchar(36) NOT NULL,
  `att_date` date DEFAULT NULL,
  `correct_state` varchar(3) DEFAULT NULL,
  `emp_id` int(11) NOT NULL,
  `orig_id` int(11) DEFAULT NULL,
  `skd_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_payloadtimecard`
--

CREATE TABLE `att_payloadtimecard` (
  `id` char(32) NOT NULL,
  `att_date` date NOT NULL,
  `week` int(11) NOT NULL,
  `weekday` int(11) NOT NULL,
  `date_type` smallint(6) NOT NULL,
  `time_table_alias` varchar(50) NOT NULL,
  `check_in` datetime(6) NOT NULL,
  `check_out` datetime(6) NOT NULL,
  `work_day` decimal(4,1) NOT NULL,
  `clock_in` datetime(6) DEFAULT NULL,
  `clock_out` datetime(6) DEFAULT NULL,
  `break_out` datetime(6) DEFAULT NULL,
  `break_in` datetime(6) DEFAULT NULL,
  `lock_down` tinyint(1) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `time_table_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_reportparam`
--

CREATE TABLE `att_reportparam` (
  `param_name` varchar(20) NOT NULL,
  `param_value` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `att_reportparam`
--

INSERT INTO `att_reportparam` (`param_name`, `param_value`) VALUES
('report_setting', '{\"short_date\": 1, \"short_time\": 1, \"filter_emp\": 1, \"multiple_dept\": 0, \"funckey0\": \"Check In\", \"funckey1\": \"Check Out\", \"funckey2\": \"Break Out\", \"funckey3\": \"Break In\", \"funckey4\": \"Overtime In\", \"funckey5\": \"Overtime Out\", \"funckey6\": \"6\", \"funckey7\": \"7\", \"funckey8\": \"8\", \"funckey9\": \"9\", \"funckey10\": \"10\", \"funckey11\": \"11\", \"funckey12\": \"12\", \"funckey13\": \"13\", \"funckey14\": \"14\", \"funckey255\": \"Unknown\", \"LeaveClass\": [{\"RemaindCount\": 1, \"LeaveId\": 1000, \"Color\": 0, \"round_off\": 1, \"report_symbol\": \" \", \"minimum_unit\": 0.5, \"IsLeave\": 1, \"LeaveName\": \"Actual Worked Hours\", \"unit\": 3}, {\"RemaindCount\": 1, \"LeaveId\": 1001, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \" \", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Duty Duration/Short\", \"unit\": 2}, {\"RemaindCount\": 1, \"LeaveId\": 1002, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \" \", \"minimum_unit\": 1.0, \"IsLeave\": 2, \"LeaveName\": \"Total Time/Total Worked Hours\", \"unit\": 2}, {\"RemaindCount\": 1, \"LeaveId\": 1003, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \" \", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Break Time/Actual Break Time\", \"unit\": 2}, {\"RemaindCount\": 1, \"LeaveId\": 1004, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \" \", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Timetable Duration\", \"unit\": 2}, {\"RemaindCount\": 1, \"LeaveId\": 1005, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \">\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Late\", \"unit\": 2}, {\"RemaindCount\": 1, \"LeaveId\": 1006, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \"<\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Early Leave\", \"unit\": 2}, {\"RemaindCount\": 1, \"LeaveId\": 1007, \"Color\": 0, \"round_off\": 1, \"report_symbol\": \"V\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Leave\", \"unit\": 2}, {\"RemaindCount\": 1, \"LeaveId\": 1008, \"Color\": 0, \"round_off\": 1, \"report_symbol\": \"A\", \"minimum_unit\": 0.5, \"IsLeave\": 1, \"LeaveName\": \"Absent\", \"unit\": 3}, {\"RemaindCount\": 1, \"LeaveId\": 1009, \"Color\": 0, \"round_off\": 1, \"report_symbol\": \"+\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Overtime\", \"unit\": 1}, {\"RemaindCount\": 0, \"LeaveId\": 1010, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \"[\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"No Clock In\", \"unit\": 1}, {\"RemaindCount\": 0, \"LeaveId\": 1011, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \"]\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"No Clock Out\", \"unit\": 1}, {\"RemaindCount\": 0, \"LeaveId\": 1012, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \"P\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Present\", \"unit\": 1}, {\"RemaindCount\": 0, \"LeaveId\": 1013, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \"D\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Day Off\", \"unit\": 1}, {\"RemaindCount\": 0, \"LeaveId\": 1014, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \"W\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Weekend\", \"unit\": 1}, {\"RemaindCount\": 0, \"LeaveId\": 1015, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \"H\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Holiday\", \"unit\": 1}, {\"RemaindCount\": 0, \"LeaveId\": 1016, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \"T\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Training\", \"unit\": 1}]}');

-- --------------------------------------------------------

--
-- Table structure for table `att_reporttemplate`
--

CREATE TABLE `att_reporttemplate` (
  `id` int(11) NOT NULL,
  `report` varchar(50) NOT NULL,
  `template_user` varchar(50) NOT NULL,
  `template_name` varchar(50) NOT NULL,
  `template_value` longtext NOT NULL,
  `is_share` tinyint(1) NOT NULL,
  `is_auto_export` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_shiftdetail`
--

CREATE TABLE `att_shiftdetail` (
  `id` int(11) NOT NULL,
  `in_time` time(6) NOT NULL,
  `out_time` time(6) NOT NULL,
  `day_index` int(11) NOT NULL,
  `shift_id` int(11) NOT NULL,
  `time_interval_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_temporaryschedule`
--

CREATE TABLE `att_temporaryschedule` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `att_date` date NOT NULL,
  `employee_id` int(11) NOT NULL,
  `time_interval_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_tempschedule`
--

CREATE TABLE `att_tempschedule` (
  `id` int(11) NOT NULL,
  `att_date` date DEFAULT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `rule_flag` smallint(6) NOT NULL,
  `work_type` smallint(6) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `time_interval_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_timeinterval`
--

CREATE TABLE `att_timeinterval` (
  `id` int(11) NOT NULL,
  `alias` varchar(50) NOT NULL,
  `use_mode` smallint(6) NOT NULL,
  `in_time` time(6) NOT NULL,
  `in_ahead_margin` int(11) NOT NULL,
  `in_above_margin` int(11) NOT NULL,
  `out_ahead_margin` int(11) NOT NULL,
  `out_above_margin` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `in_required` smallint(6) NOT NULL,
  `out_required` smallint(6) NOT NULL,
  `allow_late` int(11) NOT NULL,
  `allow_leave_early` int(11) NOT NULL,
  `work_day` double NOT NULL,
  `early_in` smallint(6) NOT NULL,
  `min_early_in` int(11) NOT NULL,
  `late_out` smallint(6) NOT NULL,
  `min_late_out` int(11) NOT NULL,
  `overtime_lv` smallint(6) NOT NULL,
  `overtime_lv1` smallint(6) NOT NULL,
  `overtime_lv2` smallint(6) NOT NULL,
  `overtime_lv3` smallint(6) NOT NULL,
  `multiple_punch` smallint(6) NOT NULL,
  `available_interval_type` smallint(6) NOT NULL,
  `available_interval` int(11) NOT NULL,
  `work_time_duration` int(11) NOT NULL,
  `func_key` smallint(6) NOT NULL,
  `work_type` smallint(6) NOT NULL,
  `day_change` time(6) NOT NULL,
  `enable_early_in` tinyint(1) NOT NULL,
  `enable_late_out` tinyint(1) NOT NULL,
  `enable_overtime` tinyint(1) NOT NULL,
  `ot_rule` char(32) DEFAULT NULL,
  `color_setting` varchar(30) DEFAULT NULL,
  `enable_max_ot_limit` tinyint(1) NOT NULL,
  `max_ot_limit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_timeinterval_break_time`
--

CREATE TABLE `att_timeinterval_break_time` (
  `id` int(11) NOT NULL,
  `timeinterval_id` int(11) NOT NULL,
  `breaktime_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_training`
--

CREATE TABLE `att_training` (
  `workflowinstance_ptr_id` int(11) NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `apply_time` datetime(6) NOT NULL,
  `apply_reason` longtext DEFAULT NULL,
  `attachment` varchar(100) DEFAULT NULL,
  `pay_code_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `authtoken_token`
--

CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `authtoken_token`
--

INSERT INTO `authtoken_token` (`key`, `created`, `user_id`) VALUES
('acba2aa2e0e18bc97d25ac60bf7e18d7a99f21d2', '2021-08-03 08:00:14.464560', 1);

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add permission', 1, 'add_permission'),
(2, 'Can change permission', 1, 'change_permission'),
(3, 'Can delete permission', 1, 'delete_permission'),
(4, 'Can add group', 2, 'add_group'),
(5, 'Can change group', 2, 'change_group'),
(7, 'Can view permission', 1, 'view_permission'),
(8, 'Can view group', 2, 'view_group'),
(9, 'Can GroupDelete group', 2, 'group_delete_group'),
(10, 'Can add content type', 111, 'add_contenttype'),
(11, 'Can change content type', 111, 'change_contenttype'),
(12, 'Can delete content type', 111, 'delete_contenttype'),
(13, 'Can view contenttype', 111, 'view_contenttype'),
(14, 'Can add log entry', 112, 'add_logentry'),
(15, 'Can change log entry', 112, 'change_logentry'),
(16, 'Can delete log entry', 112, 'delete_logentry'),
(17, 'Can view logentry', 112, 'view_logentry'),
(18, 'Can add session', 113, 'add_session'),
(19, 'Can change session', 113, 'change_session'),
(20, 'Can delete session', 113, 'delete_session'),
(21, 'Can view session', 113, 'view_session'),
(22, 'Can add Token', 114, 'add_token'),
(23, 'Can change Token', 114, 'change_token'),
(24, 'Can delete Token', 114, 'delete_token'),
(25, 'Can view token', 114, 'view_token'),
(26, 'Can add group object permission', 115, 'add_groupobjectpermission'),
(27, 'Can change group object permission', 115, 'change_groupobjectpermission'),
(28, 'Can delete group object permission', 115, 'delete_groupobjectpermission'),
(29, 'Can add user object permission', 116, 'add_userobjectpermission'),
(30, 'Can change user object permission', 116, 'change_userobjectpermission'),
(31, 'Can delete user object permission', 116, 'delete_userobjectpermission'),
(32, 'Can view userobjectpermission', 116, 'view_userobjectpermission'),
(33, 'Can view groupobjectpermission', 115, 'view_groupobjectpermission'),
(34, 'Can add crontab', 11, 'add_crontabschedule'),
(35, 'Can change crontab', 11, 'change_crontabschedule'),
(36, 'Can delete crontab', 11, 'delete_crontabschedule'),
(37, 'Can add interval', 12, 'add_intervalschedule'),
(38, 'Can change interval', 12, 'change_intervalschedule'),
(39, 'Can delete interval', 12, 'delete_intervalschedule'),
(40, 'Can add periodic task', 10, 'add_periodictask'),
(41, 'Can change periodic task', 10, 'change_periodictask'),
(42, 'Can delete periodic task', 10, 'delete_periodictask'),
(43, 'Can add periodic tasks', 117, 'add_periodictasks'),
(44, 'Can change periodic tasks', 117, 'change_periodictasks'),
(45, 'Can delete periodic tasks', 117, 'delete_periodictasks'),
(46, 'Can add solar event', 118, 'add_solarschedule'),
(47, 'Can change solar event', 118, 'change_solarschedule'),
(48, 'Can delete solar event', 118, 'delete_solarschedule'),
(49, 'Can add clocked', 119, 'add_clockedschedule'),
(50, 'Can change clocked', 119, 'change_clockedschedule'),
(51, 'Can delete clocked', 119, 'delete_clockedschedule'),
(52, 'Can view solarschedule', 118, 'view_solarschedule'),
(53, 'Can view intervalschedule', 12, 'view_intervalschedule'),
(54, 'Can view clockedschedule', 119, 'view_clockedschedule'),
(55, 'Can view crontabschedule', 11, 'view_crontabschedule'),
(56, 'Can view periodictasks', 117, 'view_periodictasks'),
(57, 'Can view periodictask', 10, 'view_periodictask'),
(58, 'Can view base.models.adminLog', 5, 'view_adminlog'),
(59, 'Can add attendance rule', 120, 'add_attparam'),
(60, 'Can change attendance rule', 120, 'change_attparam'),
(61, 'Can delete attendance rule', 120, 'delete_attparam'),
(62, 'Can add attParamDepts', 121, 'add_attparamdepts'),
(63, 'Can change attParamDepts', 121, 'change_attparamdepts'),
(64, 'Can delete attParamDepts', 121, 'delete_attparamdepts'),
(65, 'Can add base_model_autoAttExportTask', 19, 'add_autoattexporttask'),
(66, 'Can change base_model_autoAttExportTask', 19, 'change_autoattexporttask'),
(67, 'Can delete base_model_autoAttExportTask', 19, 'delete_autoattexporttask'),
(68, 'Can add base_model_autoExportTask', 8, 'add_autoexporttask'),
(69, 'Can change base_model_autoExportTask', 8, 'change_autoexporttask'),
(70, 'Can delete base_model_autoExportTask', 8, 'delete_autoexporttask'),
(71, 'Can delete base_model_bookmark', 7, 'delete_bookmark'),
(72, 'Can change base_model_bookmark', 7, 'change_bookmark'),
(73, 'Can add base.model.dbMigrate', 122, 'add_dbmigrate'),
(74, 'Can change base.model.dbMigrate', 122, 'change_dbmigrate'),
(75, 'Can delete base.model.dbMigrate', 122, 'delete_dbmigrate'),
(76, 'Can add base_model_lineNotifySetting', 9, 'add_linenotifysetting'),
(77, 'Can change base_model_lineNotifySetting', 9, 'change_linenotifysetting'),
(78, 'Can delete base_model_lineNotifySetting', 9, 'delete_linenotifysetting'),
(79, 'Can add base.models.securityPolicy', 22, 'add_securitypolicy'),
(80, 'Can change base.models.securityPolicy', 22, 'change_securitypolicy'),
(81, 'Can delete base.models.securityPolicy', 22, 'delete_securitypolicy'),
(82, 'Can add model_send_email', 123, 'add_sendemail'),
(83, 'Can change model_send_email', 123, 'change_sendemail'),
(84, 'Can delete model_send_email', 123, 'delete_sendemail'),
(85, 'Can add sftp_setting', 4, 'add_sftpsetting'),
(86, 'Can change sftp_setting', 4, 'change_sftpsetting'),
(87, 'Can delete sftp_setting', 4, 'delete_sftpsetting'),
(88, 'Can view base_integrationTable_area', 18, 'view_syncarea'),
(89, 'Can view base_integrationTable_department', 15, 'view_syncdepartment'),
(90, 'Can view base_integrationTable_employee', 17, 'view_syncemployee'),
(91, 'Can view base_integrationTable_position', 16, 'view_syncjob'),
(92, 'Can add System Rule', 124, 'add_sysparam'),
(93, 'Can change System Rule', 124, 'change_sysparam'),
(94, 'Can delete System Rule', 124, 'delete_sysparam'),
(95, 'Can add System Parameter related to Department', 125, 'add_sysparamdept'),
(96, 'Can change System Parameter related to Department', 125, 'change_sysparamdept'),
(97, 'Can delete System Parameter related to Department', 125, 'delete_sysparamdept'),
(98, 'Can view base.models.systemLog', 20, 'view_systemlog'),
(99, 'Can add base.model.systemSetting', 126, 'add_systemsetting'),
(100, 'Can change base.model.systemSetting', 126, 'change_systemsetting'),
(101, 'Can delete base.model.systemSetting', 126, 'delete_systemsetting'),
(102, 'Can add task_result_log', 13, 'add_taskresultlog'),
(103, 'Can change task_result_log', 13, 'change_taskresultlog'),
(104, 'Can delete task_result_log', 13, 'delete_taskresultlog'),
(105, 'Can add Abstract Permission', 1, 'add_abstractpermission'),
(106, 'Can change Abstract Permission', 1, 'change_abstractpermission'),
(107, 'Can delete Abstract Permission', 1, 'delete_abstractpermission'),
(108, 'Can add System Setting Permission', 1, 'add_systemsettingpermission'),
(109, 'Can change System Setting Permission', 1, 'change_systemsettingpermission'),
(110, 'Can delete System Setting Permission', 1, 'delete_systemsettingpermission'),
(111, 'Can view base.models.apiLog', 6, 'view_apilog'),
(112, 'Can add base.model.emailTemplate', 23, 'add_emailtemplate'),
(113, 'Can change base.model.emailTemplate', 23, 'change_emailtemplate'),
(114, 'Can delete base.model.emailTemplate', 23, 'delete_emailtemplate'),
(115, 'Can add base.models.eventAlertSetting', 24, 'add_eventalertsetting'),
(116, 'Can change base.models.eventAlertSetting', 24, 'change_eventalertsetting'),
(117, 'Can delete base.models.eventAlertSetting', 24, 'delete_eventalertsetting'),
(118, 'Can view sendemail', 123, 'view_sendemail'),
(119, 'Can view sysparam', 124, 'view_sysparam'),
(120, 'Can view sftpsetting', 4, 'view_sftpsetting'),
(121, 'Can view linenotifysetting', 9, 'view_linenotifysetting'),
(122, 'Can view dbmigrate', 122, 'view_dbmigrate'),
(123, 'Can view sysparamdept', 125, 'view_sysparamdept'),
(124, 'Can view attparam', 120, 'view_attparam'),
(125, 'Can view attparamdepts', 121, 'view_attparamdepts'),
(126, 'Can view systemsetting', 126, 'view_systemsetting'),
(127, 'Can view autoexporttask', 8, 'view_autoexporttask'),
(128, 'Can ManualExport autoexporttask', 8, 'manual_export_autoexporttask'),
(129, 'Can view autoattexporttask', 19, 'view_autoattexporttask'),
(130, 'Can ManualAttExport autoattexporttask', 19, 'manual_att_export_autoattexporttask'),
(131, 'Can view taskresultlog', 13, 'view_taskresultlog'),
(132, 'Can DBBackupAuto dbbackuplog', 14, 'd_b_backup_auto_dbbackuplog'),
(133, 'Can DBBackupManually dbbackuplog', 14, 'd_b_backup_manually_dbbackuplog'),
(134, 'Can DBRestoreManually dbbackuplog', 14, 'd_b_restore_manually_dbbackuplog'),
(135, 'Can view securitypolicy', 22, 'view_securitypolicy'),
(136, 'Can view emailtemplate', 23, 'view_emailtemplate'),
(137, 'Can view eventalertsetting', 24, 'view_eventalertsetting'),
(138, 'Can view bookmark', 7, 'view_bookmark'),
(139, 'Can add iclock_model_bioData', 31, 'add_biodata'),
(140, 'Can change iclock_model_bioData', 31, 'change_biodata'),
(141, 'Can delete iclock_model_bioData', 31, 'delete_biodata'),
(142, 'Can delete iclock_model_bioPhoto', 36, 'delete_biophoto'),
(143, 'Can view iclock_model_bioPhoto', 36, 'view_biophoto'),
(144, 'Can add iclock_model_deviceConfig', 35, 'add_devicemoduleconfig'),
(145, 'Can change iclock_model_deviceConfig', 35, 'change_devicemoduleconfig'),
(146, 'Can delete iclock_model_deviceConfig', 35, 'delete_devicemoduleconfig'),
(147, 'Can add terminal_model_errorCommandLog', 37, 'add_errorcommandlog'),
(148, 'Can change terminal_model_errorCommandLog', 37, 'change_errorcommandlog'),
(149, 'Can delete terminal_model_errorCommandLog', 37, 'delete_errorcommandlog'),
(150, 'Can delete iclock_model_privateMessage', 32, 'delete_privatemessage'),
(151, 'Can change iclock_model_privateMessage', 32, 'change_privatemessage'),
(152, 'Can view iclock_model_privateMessage', 32, 'view_privatemessage'),
(153, 'Can delete iclock_model_publicMessage', 33, 'delete_publicmessage'),
(154, 'Can change iclock_model_publicMessage', 33, 'change_publicmessage'),
(155, 'Can view iclock_model_publicMessage', 33, 'view_publicmessage'),
(156, 'Can add terminal.models.shortMessage', 129, 'add_shortmessage'),
(157, 'Can change terminal.models.shortMessage', 129, 'change_shortmessage'),
(158, 'Can delete terminal.models.shortMessage', 129, 'delete_shortmessage'),
(159, 'Can add iclock_model_terminal', 25, 'add_terminal'),
(160, 'Can change iclock_model_terminal', 25, 'change_terminal'),
(161, 'Can delete iclock_model_terminal', 25, 'delete_terminal'),
(162, 'Can add iclock_model_terminalCommand', 29, 'add_terminalcommand'),
(163, 'Can change iclock_model_terminalCommand', 29, 'change_terminalcommand'),
(164, 'Can delete iclock_model_terminalCommand', 29, 'delete_terminalcommand'),
(165, 'Can add iclock_model_terminalEmployee', 130, 'add_terminalemployee'),
(166, 'Can change iclock_model_terminalEmployee', 130, 'change_terminalemployee'),
(167, 'Can delete iclock_model_terminalEmployee', 130, 'delete_terminalemployee'),
(168, 'Can add iclock_model_terminalLog', 27, 'add_terminallog'),
(169, 'Can change iclock_model_terminalLog', 27, 'change_terminallog'),
(170, 'Can delete iclock_model_terminalLog', 27, 'delete_terminallog'),
(171, 'Can add iclock_model_terminalParameter', 131, 'add_terminalparameter'),
(172, 'Can change iclock_model_terminalParameter', 131, 'change_terminalparameter'),
(173, 'Can delete iclock_model_terminalParameter', 131, 'delete_terminalparameter'),
(174, 'Can add iclock_model_terminalUploadLog', 28, 'add_terminaluploadlog'),
(175, 'Can change iclock_model_terminalUploadLog', 28, 'change_terminaluploadlog'),
(176, 'Can delete iclock_model_terminalUploadLog', 28, 'delete_terminaluploadlog'),
(177, 'Can add iclock_model_terminalWorkCode', 34, 'add_terminalworkcode'),
(178, 'Can change iclock_model_terminalWorkCode', 34, 'change_terminalworkcode'),
(179, 'Can delete iclock_model_terminalWorkCode', 34, 'delete_terminalworkcode'),
(180, 'Can view iclock_model_transaction', 26, 'view_transaction'),
(181, 'Can add transaction.proof.command', 132, 'add_transactionproofcmd'),
(182, 'Can change transaction.proof.command', 132, 'change_transactionproofcmd'),
(183, 'Can delete transaction.proof.command', 132, 'delete_transactionproofcmd'),
(184, 'Can add visitor.model.bioData', 133, 'add_visitorbiodata'),
(185, 'Can change visitor.model.bioData', 133, 'change_visitorbiodata'),
(186, 'Can delete visitor.model.bioData', 133, 'delete_visitorbiodata'),
(187, 'Can add iclock.models.terminalCommandLog', 30, 'add_terminalcommandlog'),
(188, 'Can change iclock.models.terminalCommandLog', 30, 'change_terminalcommandlog'),
(189, 'Can delete iclock.models.terminalCommandLog', 30, 'delete_terminalcommandlog'),
(190, 'Can add Device Setting Permission', 1, 'add_devicesettingpermission'),
(191, 'Can change Device Setting Permission', 1, 'change_devicesettingpermission'),
(192, 'Can delete Device Setting Permission', 1, 'delete_devicesettingpermission'),
(193, 'Can view terminal', 25, 'view_terminal'),
(194, 'Can TerminalNewArea terminal', 25, 'terminal_new_area_terminal'),
(195, 'Can TerminalClearCommand terminal', 25, 'terminal_clear_command_terminal'),
(196, 'Can TerminalClearAttendanceData terminal', 25, 'terminal_clear_attendance_data_terminal'),
(197, 'Can TerminalDeleteCapture terminal', 25, 'terminal_delete_capture_terminal'),
(198, 'Can TerminalClearAll terminal', 25, 'terminal_clear_all_terminal'),
(199, 'Can TerminalReUploadData terminal', 25, 'terminal_re_upload_data_terminal'),
(200, 'Can TerminalReUploadTransaction terminal', 25, 'terminal_re_upload_transaction_terminal'),
(201, 'Can TerminalReloadData terminal', 25, 'terminal_reload_data_terminal'),
(202, 'Can TerminalManualSync terminal', 25, 'terminal_manual_sync_terminal'),
(203, 'Can TerminalReboot terminal', 25, 'terminal_reboot_terminal'),
(204, 'Can TerminalReadInformation terminal', 25, 'terminal_read_information_terminal'),
(205, 'Can TerminalEnrollRemotely terminal', 25, 'terminal_enroll_remotely_terminal'),
(206, 'Can TerminalDuplicatePunchPeriod terminal', 25, 'terminal_duplicate_punch_period_terminal'),
(207, 'Can TerminalCapture terminal', 25, 'terminal_capture_terminal'),
(208, 'Can TerminalUpgradeFirmware terminal', 25, 'terminal_upgrade_firmware_terminal'),
(209, 'Can TerminalDaylightSavingTime terminal', 25, 'terminal_daylight_saving_time_terminal'),
(210, 'Can TerminalPullFile terminal', 25, 'terminal_pull_file_terminal'),
(211, 'Can TerminalSetOption terminal', 25, 'terminal_set_option_terminal'),
(212, 'Can USBDataUpload transaction', 26, 'u_s_b_data_upload_transaction'),
(213, 'Can AttCaptureDownload transaction', 26, 'att_capture_download_transaction'),
(214, 'Can view terminallog', 27, 'view_terminallog'),
(215, 'Can view terminaluploadlog', 28, 'view_terminaluploadlog'),
(216, 'Can view terminalcommand', 29, 'view_terminalcommand'),
(217, 'Can TerminalCommandBulkDelete terminalcommand', 29, 'terminal_command_bulk_delete_terminalcommand'),
(218, 'Can view terminalcommandlog', 30, 'view_terminalcommandlog'),
(219, 'Can TerminalCommandLogBulkDelete terminalcommandlog', 30, 'terminal_command_log_bulk_delete_terminalcommandlog'),
(220, 'Can view terminalparameter', 131, 'view_terminalparameter'),
(221, 'Can view terminalemployee', 130, 'view_terminalemployee'),
(222, 'Can view shortmessage', 129, 'view_shortmessage'),
(223, 'Can AddPublicMessage publicmessage', 33, 'add_public_message_publicmessage'),
(224, 'Can SendPublicMessage publicmessage', 33, 'send_public_message_publicmessage'),
(225, 'Can AddPrivateMessage privatemessage', 32, 'add_private_message_privatemessage'),
(226, 'Can SendPrivateMessage privatemessage', 32, 'send_private_message_privatemessage'),
(227, 'Can view terminalworkcode', 34, 'view_terminalworkcode'),
(228, 'Can SendWorkCode terminalworkcode', 34, 'send_work_code_terminalworkcode'),
(229, 'Can RemoveWorkCode terminalworkcode', 34, 'remove_work_code_terminalworkcode'),
(230, 'Can view transactionproofcmd', 132, 'view_transactionproofcmd'),
(231, 'Can view biodata', 31, 'view_biodata'),
(232, 'Can view devicemoduleconfig', 35, 'view_devicemoduleconfig'),
(233, 'Can BioPhotoApprove biophoto', 36, 'bio_photo_approve_biophoto'),
(234, 'Can BioPhotoQRCode biophoto', 36, 'bio_photo_q_r_code_biophoto'),
(235, 'Can ImportBioPhoto biophoto', 36, 'import_bio_photo_biophoto'),
(236, 'Can view errorcommandlog', 37, 'view_errorcommandlog'),
(237, 'Can view visitorbiodata', 133, 'view_visitorbiodata'),
(238, 'Can add psnl_model_area', 38, 'add_area'),
(239, 'Can change psnl_model_area', 38, 'change_area'),
(240, 'Can delete psnl_model_area', 38, 'delete_area'),
(241, 'Can add model_assign_area_to_employee', 135, 'add_assignareaemployee'),
(242, 'Can change model_assign_area_to_employee', 135, 'change_assignareaemployee'),
(243, 'Can delete model_assign_area_to_employee', 135, 'delete_assignareaemployee'),
(244, 'Can add psnl_model_certification', 39, 'add_certification'),
(245, 'Can change psnl_model_certification', 39, 'change_certification'),
(246, 'Can delete psnl_model_certification', 39, 'delete_certification'),
(247, 'Can add psnl_model_department', 40, 'add_department'),
(248, 'Can change psnl_model_department', 40, 'change_department'),
(249, 'Can delete psnl_model_department', 40, 'delete_department'),
(250, 'Can add model_employee', 41, 'add_employee'),
(251, 'Can change model_employee', 41, 'change_employee'),
(252, 'Can delete model_employee', 41, 'delete_employee'),
(253, 'Can delete employee certification', 44, 'delete_employeecertification'),
(254, 'Can change employee certification', 44, 'change_employeecertification'),
(255, 'Can view employee certification', 44, 'view_employeecertification'),
(256, 'Can add employee leave balance', 45, 'add_employeeleavebalance'),
(257, 'Can change employee leave balance', 45, 'change_employeeleavebalance'),
(258, 'Can delete employee leave balance', 45, 'delete_employeeleavebalance'),
(259, 'Can add pnsl_model_empProfile', 136, 'add_employeeprofile'),
(260, 'Can change pnsl_model_empProfile', 136, 'change_employeeprofile'),
(261, 'Can delete pnsl_model_empProfile', 136, 'delete_employeeprofile'),
(262, 'Can add psnl.models.employment', 137, 'add_employment'),
(263, 'Can change psnl.models.employment', 137, 'change_employment'),
(264, 'Can delete psnl.models.employment', 137, 'delete_employment'),
(265, 'Can add psnl_model_position', 42, 'add_position'),
(266, 'Can change psnl_model_position', 42, 'change_position'),
(267, 'Can delete psnl_model_position', 42, 'delete_position'),
(268, 'Can delete psnl_model_resign', 43, 'delete_resign'),
(269, 'Can change psnl_model_resign', 43, 'change_resign'),
(270, 'Can view psnl_model_resign', 43, 'view_resign'),
(271, 'Can add employee calendar', 138, 'add_employeecalendar'),
(272, 'Can change employee calendar', 138, 'change_employeecalendar'),
(273, 'Can delete employee calendar', 138, 'delete_employeecalendar'),
(274, 'Can add personnel.models.employeeCustomAttribute', 46, 'add_employeecustomattribute'),
(275, 'Can change personnel.models.employeeCustomAttribute', 46, 'change_employeecustomattribute'),
(276, 'Can delete personnel.models.employeeCustomAttribute', 46, 'delete_employeecustomattribute'),
(277, 'Can add personnel.models.employeeExtraInfo', 139, 'add_employeeextrainfo'),
(278, 'Can change personnel.models.employeeExtraInfo', 139, 'change_employeeextrainfo'),
(279, 'Can delete personnel.models.employeeExtraInfo', 139, 'delete_employeeextrainfo'),
(280, 'Can view department', 40, 'view_department'),
(281, 'Can Import department', 40, 'import_department'),
(282, 'Can SetDepartment department', 40, 'set_department_department'),
(283, 'Can view position', 42, 'view_position'),
(284, 'Can Import position', 42, 'import_position'),
(285, 'Can SetPosition position', 42, 'set_position_position'),
(286, 'Can view area', 38, 'view_area'),
(287, 'Can Import area', 38, 'import_area'),
(288, 'Can SetArea area', 38, 'set_area_area'),
(289, 'Can view certification', 39, 'view_certification'),
(290, 'Can Import certification', 39, 'import_certification'),
(291, 'Can view employee', 41, 'view_employee'),
(292, 'Can ImportEmployee employee', 41, 'import_employee_employee'),
(293, 'Can ImportDocument employee', 41, 'import_document_employee'),
(294, 'Can ImportPhoto employee', 41, 'import_photo_employee'),
(295, 'Can AdjustDepartment employee', 41, 'adjust_department_employee'),
(296, 'Can PositionTransfer employee', 41, 'position_transfer_employee'),
(297, 'Can AdjustArea employee', 41, 'adjust_area_employee'),
(298, 'Can PassProbation employee', 41, 'pass_probation_employee'),
(299, 'Can Resignation employee', 41, 'resignation_employee'),
(300, 'Can EnableApp employee', 41, 'enable_app_employee'),
(301, 'Can DisableApp employee', 41, 'disable_app_employee'),
(302, 'Can ResynchronizeDevice employee', 41, 'resynchronize_device_employee'),
(303, 'Can ReUploadFromDevice employee', 41, 're_upload_from_device_employee'),
(304, 'Can DeleteBiometricTemplates employee', 41, 'delete_biometric_templates_employee'),
(305, 'Can view employment', 137, 'view_employment'),
(306, 'Can view assignareaemployee', 135, 'view_assignareaemployee'),
(307, 'Can AddEmployeeResign resign', 43, 'add_employee_resign_resign'),
(308, 'Can Reinstatement resign', 43, 'reinstatement_resign'),
(309, 'Can Import resign', 43, 'import_resign'),
(310, 'Can DisableAttendanceFunction resign', 43, 'disable_attendance_function_resign'),
(311, 'Can AddEmployeeCert employeecertification', 44, 'add_employee_cert_employeecertification'),
(312, 'Can Import employeecertification', 44, 'import_employeecertification'),
(313, 'Can view employeeprofile', 136, 'view_employeeprofile'),
(314, 'Can view employeeleavebalance', 45, 'view_employeeleavebalance'),
(315, 'Can Import employeeleavebalance', 45, 'import_employeeleavebalance'),
(316, 'Can view employeecalendar', 138, 'view_employeecalendar'),
(317, 'Can view employeeextrainfo', 139, 'view_employeeextrainfo'),
(318, 'Can view employeecustomattribute', 46, 'view_employeecustomattribute'),
(319, 'Can add workflow_node_instance', 140, 'add_nodeinstance'),
(320, 'Can change workflow_node_instance', 140, 'change_nodeinstance'),
(321, 'Can delete workflow_node_instance', 140, 'delete_nodeinstance'),
(322, 'Can add workflow_model_workflowEngine', 48, 'add_workflowengine'),
(323, 'Can change workflow_model_workflowEngine', 48, 'change_workflowengine'),
(324, 'Can delete workflow_model_workflowEngine', 48, 'delete_workflowengine'),
(325, 'Can add workflow instance', 141, 'add_workflowinstance'),
(326, 'Can change workflow instance', 141, 'change_workflowinstance'),
(327, 'Can delete workflow instance', 141, 'delete_workflowinstance'),
(328, 'Can add workflow_model_workflowNode', 49, 'add_workflownode'),
(329, 'Can change workflow_model_workflowNode', 49, 'change_workflownode'),
(330, 'Can delete workflow_model_workflowNode', 49, 'delete_workflownode'),
(331, 'Can add workflow_model_workflowRole', 47, 'add_workflowrole'),
(332, 'Can change workflow_model_workflowRole', 47, 'change_workflowrole'),
(333, 'Can delete workflow_model_workflowRole', 47, 'delete_workflowrole'),
(334, 'Can view workflowrole', 47, 'view_workflowrole'),
(335, 'Can WorkFlowRoleAssignEmployee workflowrole', 47, 'work_flow_role_assign_employee_workflowrole'),
(336, 'Can view workflowengine', 48, 'view_workflowengine'),
(337, 'Can WorkFlowSetupForDepartment workflowengine', 48, 'work_flow_setup_for_department_workflowengine'),
(338, 'Can WorkFlowSetupForPosition workflowengine', 48, 'work_flow_setup_for_position_workflowengine'),
(339, 'Can WorkFlowSetupForEmployee workflowengine', 48, 'work_flow_setup_for_employee_workflowengine'),
(340, 'Can view workflownode', 49, 'view_workflownode'),
(341, 'Can view nodeinstance', 140, 'view_nodeinstance'),
(342, 'Can view workflowinstance', 141, 'view_workflowinstance'),
(343, 'Can add att_calc_log', 142, 'add_attcalclog'),
(344, 'Can change att_calc_log', 142, 'change_attcalclog'),
(345, 'Can delete att_calc_log', 142, 'delete_attcalclog'),
(346, 'Can change att.models.attCode', 51, 'change_attcode'),
(347, 'Can view att.models.attCode', 51, 'view_attcode'),
(348, 'Can add att.models.attEmployee', 143, 'add_attemployee'),
(349, 'Can change att.models.attEmployee', 143, 'change_attemployee'),
(350, 'Can delete att.models.attEmployee', 143, 'delete_attemployee'),
(351, 'Can add att.models.attGroup', 52, 'add_attgroup'),
(352, 'Can change att.models.attGroup', 52, 'change_attgroup'),
(353, 'Can delete att.models.attGroup', 52, 'delete_attgroup'),
(354, 'Can add att.models.attPolicy', 53, 'add_attpolicy'),
(355, 'Can change att.models.attPolicy', 53, 'change_attpolicy'),
(356, 'Can delete att.models.attPolicy', 53, 'delete_attpolicy'),
(357, 'Can add att.model.calculateItem', 73, 'add_attreportsetting'),
(358, 'Can change att.model.calculateItem', 73, 'change_attreportsetting'),
(359, 'Can delete att.model.calculateItem', 73, 'delete_attreportsetting'),
(360, 'Can add att_model_attRule', 56, 'add_attrule'),
(361, 'Can change att_model_attRule', 56, 'change_attrule'),
(362, 'Can delete att_model_attRule', 56, 'delete_attrule'),
(363, 'Can delete att_model_schedule', 61, 'delete_attschedule'),
(364, 'Can change att_model_schedule', 61, 'change_attschedule'),
(365, 'Can view att_model_schedule', 61, 'view_attschedule'),
(366, 'Can add att_model_shift', 60, 'add_attshift'),
(367, 'Can change att_model_shift', 60, 'change_attshift'),
(368, 'Can delete att_model_shift', 60, 'delete_attshift'),
(369, 'Can add att_model_breakTime', 69, 'add_breaktime'),
(370, 'Can change att_model_breakTime', 69, 'change_breaktime'),
(371, 'Can delete att_model_breakTime', 69, 'delete_breaktime'),
(372, 'Can add att_model_changeSchedule', 70, 'add_changeschedule'),
(373, 'Can change att_model_changeSchedule', 70, 'change_changeschedule'),
(374, 'Can delete att_model_changeSchedule', 70, 'delete_changeschedule'),
(375, 'Can add att.models.departmentPolicy', 54, 'add_departmentpolicy'),
(376, 'Can change att.models.departmentPolicy', 54, 'change_departmentpolicy'),
(377, 'Can delete att.models.departmentPolicy', 54, 'delete_departmentpolicy'),
(378, 'Can delete att_model_deptSchedule', 71, 'delete_departmentschedule'),
(379, 'Can change att_model_deptSchedule', 71, 'change_departmentschedule'),
(380, 'Can view att_model_deptSchedule', 71, 'view_departmentschedule'),
(381, 'Can delete att_model_deptAttRule', 68, 'delete_deptattrule'),
(382, 'Can change att_model_deptAttRule', 68, 'change_deptattrule'),
(383, 'Can view att_model_deptAttRule', 68, 'view_deptattrule'),
(384, 'Can add att.models.groupPolicy', 55, 'add_grouppolicy'),
(385, 'Can change att.models.groupPolicy', 55, 'change_grouppolicy'),
(386, 'Can delete att.models.groupPolicy', 55, 'delete_grouppolicy'),
(387, 'Can add att.models.groupSchedule', 72, 'add_groupschedule'),
(388, 'Can change att.models.groupSchedule', 72, 'change_groupschedule'),
(389, 'Can delete att.models.groupSchedule', 72, 'delete_groupschedule'),
(390, 'Can delete att_model_holiday', 67, 'delete_holiday'),
(391, 'Can change att_model_holiday', 67, 'change_holiday'),
(392, 'Can view att_model_holiday', 67, 'view_holiday'),
(393, 'Can delete att_model_leave', 64, 'delete_leave'),
(394, 'Can change att_model_leave', 64, 'change_leave'),
(395, 'Can view att_model_leave', 64, 'view_leave'),
(396, 'Can add att_model_manualLog', 58, 'add_manuallog'),
(397, 'Can change att_model_manualLog', 58, 'change_manuallog'),
(398, 'Can delete att_model_manualLog', 58, 'delete_manuallog'),
(399, 'Can delete att_model_overtime', 66, 'delete_overtime'),
(400, 'Can change att_model_overtime', 66, 'change_overtime'),
(401, 'Can view att_model_overtime', 66, 'view_overtime'),
(402, 'Can add att.models.overtimePolicy', 144, 'add_overtimepolicy'),
(403, 'Can change att.models.overtimePolicy', 144, 'change_overtimepolicy'),
(404, 'Can delete att.models.overtimePolicy', 144, 'delete_overtimepolicy'),
(405, 'Can add att.models.payCode', 50, 'add_paycode'),
(406, 'Can change att.models.payCode', 50, 'change_paycode'),
(407, 'Can delete att.models.payCode', 50, 'delete_paycode'),
(408, 'Can add payload att code', 145, 'add_payloadattcode'),
(409, 'Can change payload att code', 145, 'change_payloadattcode'),
(410, 'Can delete payload att code', 145, 'delete_payloadattcode'),
(411, 'Can add payload base', 146, 'add_payloadbase'),
(412, 'Can change payload base', 146, 'change_payloadbase'),
(413, 'Can delete payload base', 146, 'delete_payloadbase'),
(414, 'Can add payload break', 147, 'add_payloadbreak'),
(415, 'Can change payload break', 147, 'change_payloadbreak'),
(416, 'Can delete payload break', 147, 'delete_payloadbreak'),
(417, 'Can add payload effect punch', 148, 'add_payloadeffectpunch'),
(418, 'Can change payload effect punch', 148, 'change_payloadeffectpunch'),
(419, 'Can delete payload effect punch', 148, 'delete_payloadeffectpunch'),
(420, 'Can add payload exception', 149, 'add_payloadexception'),
(421, 'Can change payload exception', 149, 'change_payloadexception'),
(422, 'Can delete payload exception', 149, 'delete_payloadexception'),
(423, 'Can add payload mul punch set', 150, 'add_payloadmulpunchset'),
(424, 'Can change payload mul punch set', 150, 'change_payloadmulpunchset'),
(425, 'Can delete payload mul punch set', 150, 'delete_payloadmulpunchset'),
(426, 'Can add payload overtime', 151, 'add_payloadovertime'),
(427, 'Can change payload overtime', 151, 'change_payloadovertime'),
(428, 'Can delete payload overtime', 151, 'delete_payloadovertime'),
(429, 'Can add payload paring', 152, 'add_payloadparing'),
(430, 'Can change payload paring', 152, 'change_payloadparing'),
(431, 'Can delete payload paring', 152, 'delete_payloadparing'),
(432, 'Can add payload pay code', 153, 'add_payloadpaycode'),
(433, 'Can change payload pay code', 153, 'change_payloadpaycode'),
(434, 'Can delete payload pay code', 153, 'delete_payloadpaycode'),
(435, 'Can add payload punch', 154, 'add_payloadpunch'),
(436, 'Can change payload punch', 154, 'change_payloadpunch'),
(437, 'Can delete payload punch', 154, 'delete_payloadpunch'),
(438, 'Can add att.models.payloadTimeCard', 155, 'add_payloadtimecard'),
(439, 'Can change att.models.payloadTimeCard', 155, 'change_payloadtimecard'),
(440, 'Can delete att.models.payloadTimeCard', 155, 'delete_payloadtimecard'),
(441, 'Can add att_model_reportParameter', 57, 'add_reportparam'),
(442, 'Can change att_model_reportParameter', 57, 'change_reportparam'),
(443, 'Can delete att_model_reportParameter', 57, 'delete_reportparam'),
(444, 'Can add att_model_reportTemplate', 156, 'add_reporttemplate'),
(445, 'Can change att_model_reportTemplate', 156, 'change_reporttemplate'),
(446, 'Can delete att_model_reportTemplate', 156, 'delete_reporttemplate'),
(447, 'Can add att_model_shiftDetail', 157, 'add_shiftdetail'),
(448, 'Can change att_model_shiftDetail', 157, 'change_shiftdetail'),
(449, 'Can delete att_model_shiftDetail', 157, 'delete_shiftdetail'),
(450, 'Can delete att.models.temporarySchedule', 63, 'delete_temporaryschedule'),
(451, 'Can change att.models.temporarySchedule', 63, 'change_temporaryschedule'),
(452, 'Can view att.models.temporarySchedule', 63, 'view_temporaryschedule'),
(453, 'Can delete att_model_tempSchedule', 62, 'delete_tempschedule'),
(454, 'Can change att_model_tempSchedule', 62, 'change_tempschedule'),
(455, 'Can view att_model_tempSchedule', 62, 'view_tempschedule'),
(456, 'Can delete att_model_timeInterval', 59, 'delete_timeinterval'),
(457, 'Can change att_model_timeInterval', 59, 'change_timeinterval'),
(458, 'Can view att_model_timeInterval', 59, 'view_timeinterval'),
(459, 'Can add att_model_training', 65, 'add_training'),
(460, 'Can change att_model_training', 65, 'change_training'),
(461, 'Can delete att_model_training', 65, 'delete_training'),
(462, 'Can add Att Setting Permission', 1, 'add_attsettingpermission'),
(463, 'Can change Att Setting Permission', 1, 'change_attsettingpermission'),
(464, 'Can delete Att Setting Permission', 1, 'delete_attsettingpermission'),
(465, 'Can add Report Permission', 1, 'add_reportpermission'),
(466, 'Can change Report Permission', 1, 'change_reportpermission'),
(467, 'Can delete Report Permission', 1, 'delete_reportpermission'),
(468, 'Can view paycode', 50, 'view_paycode'),
(469, 'Can view attgroup', 52, 'view_attgroup'),
(470, 'Can SetGroup attgroup', 52, 'set_group_attgroup'),
(471, 'Can view attpolicy', 53, 'view_attpolicy'),
(472, 'Can view departmentpolicy', 54, 'view_departmentpolicy'),
(473, 'Can AddDepartmentPolicy departmentpolicy', 54, 'add_department_policy_departmentpolicy'),
(474, 'Can view grouppolicy', 55, 'view_grouppolicy'),
(475, 'Can AddGroupPolicy grouppolicy', 55, 'add_group_policy_grouppolicy'),
(476, 'Can view attrule', 56, 'view_attrule'),
(477, 'Can view attemployee', 143, 'view_attemployee'),
(478, 'Can view attshift', 60, 'view_attshift'),
(479, 'Can AddAttSchedule attschedule', 61, 'add_att_schedule_attschedule'),
(480, 'Can Import attschedule', 61, 'import_attschedule'),
(481, 'Can view breaktime', 69, 'view_breaktime'),
(482, 'Can AddDepartmentHoliday holiday', 67, 'add_department_holiday_holiday'),
(483, 'Can AddLeave leave', 64, 'add_leave_leave'),
(484, 'Can BulkAddLeave leave', 64, 'bulk_add_leave_leave'),
(485, 'Can Approve leave', 64, 'approve_leave'),
(486, 'Can Reject leave', 64, 'reject_leave'),
(487, 'Can Revoke leave', 64, 'revoke_leave'),
(488, 'Can Import leave', 64, 'import_leave'),
(489, 'Can view manuallog', 58, 'view_manuallog'),
(490, 'Can AddManualLog manuallog', 58, 'add_manual_log_manuallog'),
(491, 'Can BulkAddManualLog manuallog', 58, 'bulk_add_manual_log_manuallog'),
(492, 'Can Approve manuallog', 58, 'approve_manuallog'),
(493, 'Can Reject manuallog', 58, 'reject_manuallog'),
(494, 'Can Revoke manuallog', 58, 'revoke_manuallog'),
(495, 'Can Import manuallog', 58, 'import_manuallog'),
(496, 'Can AddOvertime overtime', 66, 'add_overtime_overtime'),
(497, 'Can BulkAddOvertime overtime', 66, 'bulk_add_overtime_overtime'),
(498, 'Can Approve overtime', 66, 'approve_overtime'),
(499, 'Can Reject overtime', 66, 'reject_overtime'),
(500, 'Can Revoke overtime', 66, 'revoke_overtime'),
(501, 'Can Import overtime', 66, 'import_overtime'),
(502, 'Can view reportparam', 57, 'view_reportparam'),
(503, 'Can view attreportsetting', 73, 'view_attreportsetting'),
(504, 'Can AddNormalTimetable timeinterval', 59, 'add_normal_timetable_timeinterval'),
(505, 'Can AddFlexibleTimetable timeinterval', 59, 'add_flexible_timetable_timeinterval'),
(506, 'Can view shiftdetail', 157, 'view_shiftdetail'),
(507, 'Can AddTempSchedule tempschedule', 62, 'add_temp_schedule_tempschedule'),
(508, 'Can Import tempschedule', 62, 'import_tempschedule'),
(509, 'Can AddTemporarySchedule temporaryschedule', 63, 'add_temporary_schedule_temporaryschedule'),
(510, 'Can ImportTemporarySchedule temporaryschedule', 63, 'import_temporary_schedule_temporaryschedule'),
(511, 'Can view training', 65, 'view_training'),
(512, 'Can AddTraining training', 65, 'add_training_training'),
(513, 'Can BulkAddTraining training', 65, 'bulk_add_training_training'),
(514, 'Can Approve training', 65, 'approve_training'),
(515, 'Can Reject training', 65, 'reject_training'),
(516, 'Can Revoke training', 65, 'revoke_training'),
(517, 'Can Import training', 65, 'import_training'),
(518, 'Can BatchAddDepartmentRule deptattrule', 68, 'batch_add_department_rule_deptattrule'),
(519, 'Can view changeschedule', 70, 'view_changeschedule'),
(520, 'Can Approve changeschedule', 70, 'approve_changeschedule'),
(521, 'Can Reject changeschedule', 70, 'reject_changeschedule'),
(522, 'Can Revoke changeschedule', 70, 'revoke_changeschedule'),
(523, 'Can AddDepartmentSchedule departmentschedule', 71, 'add_department_schedule_departmentschedule'),
(524, 'Can view groupschedule', 72, 'view_groupschedule'),
(525, 'Can AddGroupSchedule groupschedule', 72, 'add_group_schedule_groupschedule'),
(526, 'Can view payloadtimecard', 155, 'view_payloadtimecard'),
(527, 'Can view payloadpaycode', 153, 'view_payloadpaycode'),
(528, 'Can view payloadattcode', 145, 'view_payloadattcode'),
(529, 'Can view payloadparing', 152, 'view_payloadparing'),
(530, 'Can view payloadeffectpunch', 148, 'view_payloadeffectpunch'),
(531, 'Can view payloadovertime', 151, 'view_payloadovertime'),
(532, 'Can view payloadbreak', 147, 'view_payloadbreak'),
(533, 'Can view payloadbase', 146, 'view_payloadbase'),
(534, 'Can view payloadpunch', 154, 'view_payloadpunch'),
(535, 'Can view payloadexception', 149, 'view_payloadexception'),
(536, 'Can view payloadmulpunchset', 150, 'view_payloadmulpunchset'),
(537, 'Can view overtimepolicy', 144, 'view_overtimepolicy'),
(538, 'Can view reporttemplate', 156, 'view_reporttemplate'),
(539, 'Can view attcalclog', 142, 'view_attcalclog'),
(540, 'Can add base_model_user', 3, 'add_myuser'),
(541, 'Can change base_model_user', 3, 'change_myuser'),
(542, 'Can add accounts.models.adminBioData', 160, 'add_adminbiodata'),
(543, 'Can change accounts.models.adminBioData', 160, 'change_adminbiodata'),
(544, 'Can delete accounts.models.adminBioData', 160, 'delete_adminbiodata'),
(545, 'Can add accounts.models.userNotification', 21, 'add_usernotification'),
(546, 'Can change accounts.models.userNotification', 21, 'change_usernotification'),
(547, 'Can delete accounts.models.userNotification', 21, 'delete_usernotification'),
(548, 'can_enter_menu_system_module', 161, 'enter_system_module'),
(549, 'can_enter_personnel_module', 161, 'enter_personnel_module'),
(550, 'can_enter_terminal_module', 161, 'enter_terminal_module'),
(551, 'can_enter_attendance_module', 161, 'enter_attendance_module'),
(552, 'can_enter_payroll_module', 161, 'enter_payroll_module'),
(553, 'can_enter_access_module', 161, 'enter_access_module'),
(554, 'can_enter_visitor_module', 161, 'enter_visitor_module'),
(555, 'can_enter_meeting_module', 161, 'enter_meeting_module'),
(556, 'can_enter_ep_module', 161, 'enter_ep_module'),
(557, 'Can view myuser', 3, 'view_myuser'),
(558, 'Can ChangePassword myuser', 3, 'change_password_myuser'),
(559, 'Can UserDelete myuser', 3, 'user_delete_myuser'),
(560, 'Can view adminbiodata', 160, 'view_adminbiodata'),
(561, 'Can view usernotification', 21, 'view_usernotification'),
(562, 'Can MarkerAll usernotification', 21, 'marker_all_usernotification'),
(563, 'Can add StaffToken', 162, 'add_stafftoken'),
(564, 'Can change StaffToken', 162, 'change_stafftoken'),
(565, 'Can delete StaffToken', 162, 'delete_stafftoken'),
(566, 'Can view stafftoken', 162, 'view_stafftoken'),
(567, 'Can delete app_model_announcement', 74, 'delete_announcement'),
(568, 'Can delete app_model_actionLog', 77, 'delete_appactionlog'),
(569, 'Can delete app_model_appList', 75, 'delete_applist'),
(570, 'Can delete app_model_notification', 76, 'delete_appnotification'),
(571, 'Can delete mobile_model_gpsForDepartment', 79, 'delete_gpsfordepartment'),
(572, 'Can change mobile_model_gpsForDepartment', 79, 'change_gpsfordepartment'),
(573, 'Can view mobile_model_gpsForDepartment', 79, 'view_gpsfordepartment'),
(574, 'Can delete mobile_model_gpsForEmployee', 78, 'delete_gpsforemployee'),
(575, 'Can change mobile_model_gpsForEmployee', 78, 'change_gpsforemployee'),
(576, 'Can view mobile_model_gpsForEmployee', 78, 'view_gpsforemployee'),
(577, 'Can add mobile_model_gpsLocation', 80, 'add_gpslocation'),
(578, 'Can change mobile_model_gpsLocation', 80, 'change_gpslocation'),
(579, 'Can delete mobile_model_gpsLocation', 80, 'delete_gpslocation'),
(580, 'Can view appactionlog', 77, 'view_appactionlog'),
(581, 'Can view applist', 75, 'view_applist'),
(582, 'Can PushNotification applist', 75, 'push_notification_applist'),
(583, 'Can ForceOffline applist', 75, 'force_offline_applist'),
(584, 'Can Disable applist', 75, 'disable_applist'),
(585, 'Can Enable applist', 75, 'enable_applist'),
(586, 'Can view announcement', 74, 'view_announcement'),
(587, 'Can AddPublicNotice announcement', 74, 'add_public_notice_announcement'),
(588, 'Can AddPrivateNotice announcement', 74, 'add_private_notice_announcement'),
(589, 'Can view appnotification', 76, 'view_appnotification'),
(590, 'Can view gpslocation', 80, 'view_gpslocation'),
(591, 'Can AddGPSForDepartment gpsfordepartment', 79, 'add_g_p_s_for_department_gpsfordepartment'),
(592, 'Can AddGPSForEmployee gpsforemployee', 78, 'add_g_p_s_for_employee_gpsforemployee'),
(593, 'Can add payroll_model_deductionFormula', 82, 'add_deductionformula'),
(594, 'Can change payroll_model_deductionFormula', 82, 'change_deductionformula'),
(595, 'Can delete payroll_model_deductionFormula', 82, 'delete_deductionformula'),
(596, 'Can delete payroll_model_empLoan', 87, 'delete_emploan'),
(597, 'Can add payroll_model_empPayrollProfile', 81, 'add_emppayrollprofile'),
(598, 'Can change payroll_model_empPayrollProfile', 81, 'change_emppayrollprofile'),
(599, 'Can delete payroll_model_empPayrollProfile', 81, 'delete_emppayrollprofile'),
(600, 'Can add payroll_model_exceptionFormula', 83, 'add_exceptionformula'),
(601, 'Can change payroll_model_exceptionFormula', 83, 'change_exceptionformula'),
(602, 'Can delete payroll_model_exceptionFormula', 83, 'delete_exceptionformula'),
(603, 'Can delete payroll_model_extraDeduction', 92, 'delete_extradeduction'),
(604, 'Can change payroll_model_extraDeduction', 92, 'change_extradeduction'),
(605, 'Can view payroll_model_extraDeduction', 92, 'view_extradeduction'),
(606, 'Can delete payroll_model_extraIncrease', 91, 'delete_extraincrease'),
(607, 'Can change payroll_model_extraIncrease', 91, 'change_extraincrease'),
(608, 'Can view payroll_model_extraIncrease', 91, 'view_extraincrease'),
(609, 'Can add payroll_model_increasementFormula', 84, 'add_increasementformula'),
(610, 'Can change payroll_model_increasementFormula', 84, 'change_increasementformula'),
(611, 'Can delete payroll_model_increasementFormula', 84, 'delete_increasementformula'),
(612, 'Can add payroll_model_leaveFormula', 85, 'add_leaveformula'),
(613, 'Can change payroll_model_leaveFormula', 85, 'change_leaveformula'),
(614, 'Can delete payroll_model_leaveFormula', 85, 'delete_leaveformula'),
(615, 'Can add payroll_model_overtimeFormula', 86, 'add_overtimeformula'),
(616, 'Can change payroll_model_overtimeFormula', 86, 'change_overtimeformula'),
(617, 'Can delete payroll_model_overtimeFormula', 86, 'delete_overtimeformula'),
(618, 'Can add payroll_model_payroll_payload', 163, 'add_payrollpayload'),
(619, 'Can change payroll_model_payroll_payload', 163, 'change_payrollpayload'),
(620, 'Can delete payroll_model_payroll_payload', 163, 'delete_payrollpayload'),
(621, 'Can add payroll payload pay code', 164, 'add_payrollpayloadpaycode'),
(622, 'Can change payroll payload pay code', 164, 'change_payrollpayloadpaycode'),
(623, 'Can delete payroll payload pay code', 164, 'delete_payrollpayloadpaycode'),
(624, 'Can delete payroll_model_Reimbursement', 88, 'delete_reimbursement'),
(625, 'Can delete payroll_model_SalaryAdvance', 89, 'delete_salaryadvance'),
(626, 'Can delete payroll_model_salarystructure', 90, 'delete_salarystructure'),
(627, 'Can change payroll_model_salarystructure', 90, 'change_salarystructure'),
(628, 'Can view payroll_model_salarystructure', 90, 'view_salarystructure'),
(629, 'Can add Payroll Report Permission', 1, 'add_payrollreportpermission'),
(630, 'Can change Payroll Report Permission', 1, 'change_payrollreportpermission'),
(631, 'Can delete Payroll Report Permission', 1, 'delete_payrollreportpermission'),
(632, 'Can view emppayrollprofile', 81, 'view_emppayrollprofile'),
(633, 'Can view deductionformula', 82, 'view_deductionformula'),
(634, 'Can view exceptionformula', 83, 'view_exceptionformula'),
(635, 'Can view increasementformula', 84, 'view_increasementformula'),
(636, 'Can view leaveformula', 85, 'view_leaveformula'),
(637, 'Can view overtimeformula', 86, 'view_overtimeformula'),
(638, 'Can view emploan', 87, 'view_emploan'),
(639, 'Can AddEmpLoanAction emploan', 87, 'add_emp_loan_action_emploan'),
(640, 'Can view reimbursement', 88, 'view_reimbursement'),
(641, 'Can AddReimbursementAction reimbursement', 88, 'add_reimbursement_action_reimbursement'),
(642, 'Can view salaryadvance', 89, 'view_salaryadvance'),
(643, 'Can AddSalaryAdvanceAction salaryadvance', 89, 'add_salary_advance_action_salaryadvance'),
(644, 'Can AddSalaryStructureAction salarystructure', 90, 'add_salary_structure_action_salarystructure'),
(645, 'Can AddExtraIncreaseAction extraincrease', 91, 'add_extra_increase_action_extraincrease'),
(646, 'Can AddExtraDeductionAction extradeduction', 92, 'add_extra_deduction_action_extradeduction'),
(647, 'Can view payrollpayload', 163, 'view_payrollpayload'),
(648, 'Can view payrollpayloadpaycode', 164, 'view_payrollpayloadpaycode'),
(649, 'Can add acc_combination', 96, 'add_acccombination'),
(650, 'Can change acc_combination', 96, 'change_acccombination'),
(651, 'Can delete acc_combination', 96, 'delete_acccombination'),
(652, 'Can add acc_groups', 95, 'add_accgroups'),
(653, 'Can change acc_groups', 95, 'change_accgroups'),
(654, 'Can delete acc_groups', 95, 'delete_accgroups'),
(655, 'Can add acc_holiday', 94, 'add_accholiday'),
(656, 'Can change acc_holiday', 94, 'change_accholiday'),
(657, 'Can delete acc_holiday', 94, 'delete_accholiday'),
(658, 'Can add acc_privilege', 97, 'add_accprivilege'),
(659, 'Can change acc_privilege', 97, 'change_accprivilege'),
(660, 'Can delete acc_privilege', 97, 'delete_accprivilege'),
(661, 'Can change menu_access_terminal', 98, 'change_accterminal'),
(662, 'Can view menu_access_terminal', 98, 'view_accterminal'),
(663, 'Can add acc_timezone', 93, 'add_acctimezone'),
(664, 'Can change acc_timezone', 93, 'change_acctimezone'),
(665, 'Can delete acc_timezone', 93, 'delete_acctimezone'),
(666, 'Can view acctimezone', 93, 'view_acctimezone'),
(667, 'Can CloneToArea acctimezone', 93, 'clone_to_area_acctimezone'),
(668, 'Can view accholiday', 94, 'view_accholiday'),
(669, 'Can CloneToArea accholiday', 94, 'clone_to_area_accholiday'),
(670, 'Can view accgroups', 95, 'view_accgroups'),
(671, 'Can CloneToArea accgroups', 95, 'clone_to_area_accgroups'),
(672, 'Can SetEmployeeGroup accgroups', 95, 'set_employee_group_accgroups'),
(673, 'Can view acccombination', 96, 'view_acccombination'),
(674, 'Can CloneToArea acccombination', 96, 'clone_to_area_acccombination'),
(675, 'Can view accprivilege', 97, 'view_accprivilege'),
(676, 'Can AdjustEmployeePrivilege accprivilege', 97, 'adjust_employee_privilege_accprivilege'),
(677, 'Can OpenDoor accterminal', 98, 'open_door_accterminal'),
(678, 'Can CancelAlarm accterminal', 98, 'cancel_alarm_accterminal'),
(679, 'Can SetParameter accterminal', 98, 'set_parameter_accterminal'),
(680, 'Can add visitor.field.reason', 101, 'add_reason'),
(681, 'Can change visitor.field.reason', 101, 'change_reason'),
(682, 'Can delete visitor.field.reason', 101, 'delete_reason'),
(683, 'Can add menu.visitor.reservation', 100, 'add_reservation'),
(684, 'Can change menu.visitor.reservation', 100, 'change_reservation'),
(685, 'Can delete menu.visitor.reservation', 100, 'delete_reservation'),
(686, 'Can add menu.visitor', 99, 'add_visitor'),
(687, 'Can change menu.visitor', 99, 'change_visitor'),
(688, 'Can delete menu.visitor', 99, 'delete_visitor'),
(689, 'Can add visitor.model.configuration', 103, 'add_visitorconfig'),
(690, 'Can change visitor.model.configuration', 103, 'change_visitorconfig'),
(691, 'Can delete visitor.model.configuration', 103, 'delete_visitorconfig'),
(692, 'Can delete model.visitor.log', 102, 'delete_visitorlog'),
(693, 'Can view model.visitor.log', 102, 'view_visitorlog'),
(694, 'Can view reason', 101, 'view_reason'),
(695, 'Can view visitor', 99, 'view_visitor'),
(696, 'Can ExitRegistration visitor', 99, 'exit_registration_visitor'),
(697, 'Can view reservation', 100, 'view_reservation'),
(698, 'Can Approve reservation', 100, 'approve_reservation'),
(699, 'Can Reject reservation', 100, 'reject_reservation'),
(700, 'Can Revoke reservation', 100, 'revoke_reservation'),
(701, 'Can ReservationQRCode reservation', 100, 'reservation_q_r_code_reservation'),
(702, 'Can EnableVisitor visitorlog', 102, 'enable_visitor_visitorlog'),
(703, 'Can DisableVisitor visitorlog', 102, 'disable_visitor_visitorlog'),
(704, 'Can view visitorconfig', 103, 'view_visitorconfig'),
(705, 'Can add meeting.models.meetingEntity', 106, 'add_meetingentity'),
(706, 'Can change meeting.models.meetingEntity', 106, 'change_meetingentity'),
(707, 'Can delete meeting.models.meetingEntity', 106, 'delete_meetingentity'),
(708, 'Can delete meeting.models.manualLog', 107, 'delete_meetingmanuallog'),
(709, 'Can change meeting.models.manualLog', 107, 'change_meetingmanuallog'),
(710, 'Can view meeting.models.manualLog', 107, 'view_meetingmanuallog'),
(711, 'Can add meeting.models.meetingPayloadBase', 166, 'add_meetingpayloadbase'),
(712, 'Can change meeting.models.meetingPayloadBase', 166, 'change_meetingpayloadbase'),
(713, 'Can delete meeting.models.meetingPayloadBase', 166, 'delete_meetingpayloadbase'),
(714, 'Can delete meeting.models.meetingRoom', 104, 'delete_meetingroom'),
(715, 'Can change meeting.models.meetingRoom', 104, 'change_meetingroom'),
(716, 'Can view meeting.models.meetingRoom', 104, 'view_meetingroom'),
(717, 'Can add meeting.models.device', 105, 'add_meetingroomdevice'),
(718, 'Can change meeting.models.device', 105, 'change_meetingroomdevice'),
(719, 'Can delete meeting.models.device', 105, 'delete_meetingroomdevice'),
(720, 'Can view meeting.models.transaction', 108, 'view_meetingtransaction'),
(721, 'Can add Meeting Report Permission', 1, 'add_meetingreportpermission'),
(722, 'Can change Meeting Report Permission', 1, 'change_meetingreportpermission'),
(723, 'Can delete Meeting Report Permission', 1, 'delete_meetingreportpermission'),
(724, 'Can AddMeetingRoom meetingroom', 104, 'add_meeting_room_meetingroom'),
(725, 'Can view meetingroomdevice', 105, 'view_meetingroomdevice'),
(726, 'Can view meetingentity', 106, 'view_meetingentity'),
(727, 'Can MeetingCalculation meetingentity', 106, 'meeting_calculation_meetingentity'),
(728, 'Can Approve meetingentity', 106, 'approve_meetingentity'),
(729, 'Can Revoke meetingentity', 106, 'revoke_meetingentity'),
(730, 'Can Reject meetingentity', 106, 'reject_meetingentity'),
(731, 'Can AddMeetingAttender meetingentity', 106, 'add_meeting_attender_meetingentity'),
(732, 'Can SyncMeeting2Device meetingentity', 106, 'sync_meeting2_device_meetingentity'),
(733, 'Can AddMeetingManualLog meetingmanuallog', 107, 'add_meeting_manual_log_meetingmanuallog'),
(734, 'Can Approve meetingmanuallog', 107, 'approve_meetingmanuallog'),
(735, 'Can Reject meetingmanuallog', 107, 'reject_meetingmanuallog'),
(736, 'Can Revoke meetingmanuallog', 107, 'revoke_meetingmanuallog'),
(737, 'Can view meetingpayloadbase', 166, 'view_meetingpayloadbase'),
(738, 'Can add ep.models.epSetup', 109, 'add_epsetup'),
(739, 'Can change ep.models.epSetup', 109, 'change_epsetup'),
(740, 'Can delete ep.models.epSetup', 109, 'delete_epsetup'),
(741, 'Can add ep.models.epTransaction', 110, 'add_eptransaction'),
(742, 'Can change ep.models.epTransaction', 110, 'change_eptransaction'),
(743, 'Can delete ep.models.epTransaction', 110, 'delete_eptransaction'),
(744, 'Can add Ep Dashboard Permission', 1, 'add_epdashboardpermission'),
(745, 'Can change Ep Dashboard Permission', 1, 'change_epdashboardpermission'),
(746, 'Can delete Ep Dashboard Permission', 1, 'delete_epdashboardpermission'),
(747, 'Can add Report Permission', 1, 'add_epreportpermission');
INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(748, 'Can change Report Permission', 1, 'change_epreportpermission'),
(749, 'Can delete Report Permission', 1, 'delete_epreportpermission'),
(750, 'Can view epsetup', 109, 'view_epsetup'),
(751, 'Can view eptransaction', 110, 'view_eptransaction'),
(752, 'Can view company_setting', 170, 'view_company_setting'),
(753, 'Can view email_setting', 170, 'view_email_setting'),
(754, 'Can view email_template_setting', 170, 'view_email_template_setting'),
(755, 'Can view ad_server_setting', 170, 'view_ad_server_setting'),
(756, 'Can view pdf_report_setting', 170, 'view_pdf_report_setting'),
(757, 'Can view db_migrate', 170, 'view_db_migrate'),
(758, 'Can view safe_setting', 170, 'view_safe_setting'),
(759, 'Can view punch_state', 170, 'view_punch_state'),
(760, 'Can view device_config', 171, 'view_device_config'),
(761, 'Can view att_rule_page', 172, 'view_att_rule_page'),
(764, 'Can view report_setting_page', 173, 'view_report_setting_page'),
(766, 'Can view calculation_view', 173, 'view_calculation_view'),
(767, 'Can view total_time_card_v2', 173, 'view_total_time_card_v2'),
(768, 'Can view scheduled_punch_report', 173, 'view_scheduled_punch_report'),
(769, 'Can view punch_paring', 173, 'view_punch_paring'),
(770, 'Can view daily_activity', 173, 'view_daily_activity'),
(771, 'Can view daily_overtime', 173, 'view_daily_overtime'),
(773, 'Can view daily_leave', 173, 'view_daily_leave'),
(774, 'Can view daily_late_in', 173, 'view_daily_late_in'),
(776, 'Can view daily_early_out', 173, 'view_daily_early_out'),
(777, 'Can view daily_absent', 173, 'view_daily_absent'),
(778, 'Can view daily_exception', 173, 'view_daily_exception'),
(780, 'Can view weekly_worked_hours', 173, 'view_weekly_worked_hours'),
(781, 'Can view weekly_overtime', 173, 'view_weekly_overtime'),
(782, 'Can view employee_overtime', 173, 'view_employee_overtime'),
(785, 'Can view employee_leave', 173, 'view_employee_leave'),
(788, 'Can view sage_vip', 173, 'view_sage_vip'),
(790, 'Can view emp_summary_report', 173, 'view_emp_summary_report'),
(791, 'Can view dept_summary_report', 173, 'view_dept_summary_report'),
(794, 'Can view group_summary_report', 173, 'view_group_summary_report'),
(796, 'Can view monthly_status', 173, 'view_monthly_status'),
(799, 'Can view monthly_work_hours', 173, 'view_monthly_work_hours'),
(801, 'Can view monthly_punch', 173, 'view_monthly_punch'),
(803, 'Can view monthly_overtime', 173, 'view_monthly_overtime'),
(804, 'Can view department_overtime', 173, 'view_department_overtime'),
(807, 'Can view group_overtime', 173, 'view_group_overtime'),
(809, 'Can view daily_multiple_punch_paring', 173, 'view_daily_multiple_punch_paring'),
(812, 'Can view daily_multiple_break_paring', 173, 'view_daily_multiple_break_paring'),
(814, 'Can view employeeschedule_report', 173, 'view_employeeschedule_report'),
(817, 'Can view transaction_report', 173, 'view_transaction_report'),
(818, 'Can view time_card_report', 173, 'view_time_card_report'),
(821, 'Can view first_last_report', 173, 'view_first_last_report'),
(822, 'Can view first_in_last_out_report', 173, 'view_first_in_last_out_report'),
(823, 'Can view leavebalance_summary_report', 173, 'view_leavebalance_summary_report'),
(826, 'Can view view_by_personnel', 173, 'view_view_by_personnel'),
(828, 'Can view payroll_reportcalculator', 174, 'view_payroll_reportcalculator'),
(830, 'Can view payroll_salarystructure_report', 174, 'view_payroll_salarystructure_report'),
(836, 'Can view payroll_increase_report', 174, 'view_payroll_increase_report'),
(838, 'Can view payroll_deduction_report', 174, 'view_payroll_deduction_report'),
(840, 'Can view payroll_salarydetail_report', 174, 'view_payroll_salarydetail_report'),
(842, 'Can view payroll_calcparam_report', 174, 'view_payroll_calcparam_report'),
(843, 'Can view payroll_calculate_setting', 174, 'view_payroll_calculate_setting'),
(846, 'Can view meeting_attendance_report', 176, 'view_meeting_attendance_report'),
(850, 'Can view meeting_room_scheduled', 176, 'view_meeting_room_scheduled'),
(851, 'Can view ep_dashboard', 177, 'view_ep_dashboard'),
(856, 'Can view daily_detail_report', 179, 'view_daily_detail_report'),
(859, 'Can view department_summary_report', 179, 'view_department_summary_report'),
(861, 'Can view unusual_employees_report', 179, 'view_unusual_employees_report'),
(864, 'Can view ep_real_time_monitoring', 177, 'view_ep_real_time_monitoring');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(128) NOT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `emp_pin` varchar(30) DEFAULT NULL,
  `email` varchar(254) NOT NULL,
  `tele_phone` varchar(30) DEFAULT NULL,
  `auth_time_dept` int(11) DEFAULT NULL,
  `login_id` int(11) DEFAULT NULL,
  `login_type` int(11) DEFAULT NULL,
  `login_count` int(11) DEFAULT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `is_public` tinyint(1) NOT NULL,
  `can_manage_all_dept` tinyint(1) NOT NULL,
  `del_flag` int(11) DEFAULT NULL,
  `date_joined` datetime(6) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `session_key` varchar(32) DEFAULT NULL,
  `login_ip` varchar(32) DEFAULT NULL,
  `photo` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id`, `username`, `password`, `update_time`, `first_name`, `last_name`, `emp_pin`, `email`, `tele_phone`, `auth_time_dept`, `login_id`, `login_type`, `login_count`, `is_staff`, `is_active`, `is_superuser`, `is_public`, `can_manage_all_dept`, `del_flag`, `date_joined`, `last_login`, `session_key`, `login_ip`, `photo`) VALUES
(1, 'arjaydiangzon', 'pbkdf2_sha256$36000$a1Nk9agOo0xS$ahmwh17OktU6bhGnaKeupfDBQ79YTWAIrniVsG0Q9qU=', '2021-08-03 08:00:14.347639', '', '', NULL, 'bcgiarjay@gmail.com', NULL, 0, 0, 0, 25, 1, 1, 1, 0, 0, 0, '2021-08-03 08:00:14.347639', '2021-09-14 07:38:10.550856', NULL, NULL, 'user/default.gif');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_auth_area`
--

CREATE TABLE `auth_user_auth_area` (
  `id` int(11) NOT NULL,
  `myuser_id` int(11) NOT NULL,
  `area_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_auth_dept`
--

CREATE TABLE `auth_user_auth_dept` (
  `id` int(11) NOT NULL,
  `myuser_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL,
  `myuser_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_profile`
--

CREATE TABLE `auth_user_profile` (
  `id` int(11) NOT NULL,
  `login_name` varchar(30) NOT NULL,
  `pin_tabs` longtext NOT NULL,
  `disabled_fields` longtext NOT NULL,
  `column_order` longtext NOT NULL,
  `preferences` longtext NOT NULL,
  `pwd_update_time` datetime(6) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth_user_profile`
--

INSERT INTO `auth_user_profile` (`id`, `login_name`, `pin_tabs`, `disabled_fields`, `column_order`, `preferences`, `pwd_update_time`, `user_id`) VALUES
(1, 'arjaydiangzon', '', '', '', '', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL,
  `myuser_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `base_adminlog`
--

CREATE TABLE `base_adminlog` (
  `id` int(11) NOT NULL,
  `action` varchar(50) NOT NULL,
  `targets` longtext DEFAULT NULL,
  `targets_repr` longtext DEFAULT NULL,
  `action_status` smallint(6) NOT NULL,
  `description` longtext DEFAULT NULL,
  `ip_address` char(39) DEFAULT NULL,
  `can_routable` tinyint(1) NOT NULL,
  `op_time` datetime(6) NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `base_adminlog`
--

INSERT INTO `base_adminlog` (`id`, `action`, `targets`, `targets_repr`, `action_status`, `description`, `ip_address`, `can_routable`, `op_time`, `content_type_id`, `user_id`) VALUES
(1, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-03 08:00:20.224449', 3, 1),
(2, 'Add', '[2]', 'Pasig City', 0, 'Area Name=Pasig City', '192.168.50.250', 0, '2021-08-03 08:00:50.241181', 38, 1),
(3, 'Modify', '[1]', 'BOCK191760589', 0, 'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1),Enable Access Control(0->0)', '192.168.50.250', 0, '2021-08-03 08:01:04.618241', 25, 1),
(4, 'Modify', '[1]', 'BOCK191760589', 0, 'Device Name(Auto add->BCGI),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1),Enable Access Control(0->0)', '192.168.50.250', 0, '2021-08-03 08:01:16.572204', 25, 1),
(5, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.108', 0, '2021-08-03 11:14:03.658627', 3, 1),
(6, 'Resynchronize to device', '[1, 10, 2, 11, 12, 13, 14, 3, 4, 5, 6, 7, 8, 9]', '1 Akosi,19 Lawrence,2 Arjay,20 Joseph,21 Ayesha,22 Jelo,23 Yow Lee,3 Wilson,4 Charles,5 Mark,6 Francis,7 Renna,8 Matthew,9 Errol', 0, '', '192.168.50.108', 0, '2021-08-03 11:14:04.862713', 41, 1),
(7, 'Resynchronize to device', '[1, 10, 2, 11, 12, 13, 14, 3, 4, 5, 6, 7, 8, 9]', '1 Akosi,19 Lawrence,2 Arjay,20 Joseph,21 Ayesha,22 Jelo,23 Yow Lee,3 Wilson,4 Charles,5 Mark,6 Francis,7 Renna,8 Matthew,9 Errol', 0, '', '192.168.50.108', 0, '2021-08-03 11:14:04.940709', 41, 1),
(8, 'Delete', '', 'BOCK191760589', 0, '', '192.168.50.108', 0, '2021-08-03 11:14:06.701065', 25, 1),
(9, 'Add', '[2]', 'BOCK191760589', 0, 'Serial Number=BOCK191760589,Device Name=BCGI,Device IP=192.168.50.204,Area=Pasig City', '192.168.50.108', 0, '2021-08-03 11:14:06.764870', 25, 1),
(10, 'Modify', '[2]', '2 Arjay', 0, 'Area([<Area: Not Authorized>, <Area: Pasig City>]-><QuerySet [<Area: Pasig City>]>),Employment Type(None->1),None(True->False),Effective Start Date(None->2021-08-03),Effective End Date(None->2021-08-03),None(None->),Payment Period(None->1),Payment Type(None->1)', '192.168.50.108', 0, '2021-08-03 11:14:08.684595', 41, 1),
(11, 'Resynchronize to device', '[2]', '2 Arjay', 0, '', '192.168.50.108', 0, '2021-08-03 11:14:09.051660', 41, 1),
(12, 'Re-upload from device', '[1, 10, 2, 11, 12, 13, 14, 3, 4, 5, 6, 7, 8, 9]', '1 Admin,19 Lawrence,2 Arjay,20 Joseph,21 Ayesha,22 Jelo,23 Yow Lee,3 Wilson,4 Charles,5 Mark,6 Francis,7 Renna,8 Matthew,9 Errol', 0, 'Device=1Serial Number=', '192.168.50.108', 0, '2021-08-03 11:14:11.224974', 41, 1),
(13, 'Re-upload from device', '[1, 10, 2, 11, 12, 13, 14, 3, 4, 5, 6, 7, 8, 9]', '1 Admin,19 Lawrence,2 Arjay,20 Joseph,21 Ayesha,22 Jelo,23 Yow Lee,3 Wilson,4 Charles,5 Mark,6 Francis,7 Renna,8 Matthew,9 Errol', 0, 'Device=1Serial Number=', '192.168.50.108', 0, '2021-08-03 11:14:12.650828', 41, 1),
(14, 'Resynchronize to device', '[15]', '24 Jamie', 0, '', '192.168.50.108', 0, '2021-08-03 11:14:13.003875', 41, 1),
(15, 'Re-upload from device', '[1, 10, 2, 11, 12, 13, 14, 15, 3, 4, 5, 6, 7, 8, 9]', '1 Admin,19 Lawrence,2 Arjay,20 Joseph,21 Ayesha,22 Jelo,23 Yow Lee,24 Jamie,3 Wilson,4 Charles,5 Mark,6 Francis,7 Renna,8 Matthew,9 Errol', 0, 'Device=1Serial Number=', '192.168.50.108', 0, '2021-08-03 11:14:13.934754', 41, 1),
(16, 'Modify', '[2]', 'BOCK191760589', 0, 'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1),Enable Access Control(0->1)', '192.168.50.108', 0, '2021-08-03 11:14:14.024518', 25, 1),
(17, 'Re-upload from device', '[2]', '2 Arjay', 0, 'Device=1Serial Number=', '192.168.50.108', 0, '2021-08-03 11:14:14.208907', 41, 1),
(18, 'Resynchronize to device', '[2]', '2 Arjay', 0, '', '192.168.50.108', 0, '2021-08-03 11:14:14.248709', 41, 1),
(19, 'Sync Data to the Device', '[2]', 'BOCK191760589', 0, 'Employee=TruePhoto=TrueFingerprint=TrueFace=TruePalm=TrueFinger Vein=TrueBio-Photo=True', '192.168.50.108', 0, '2021-08-03 11:14:14.470723', 25, 1),
(20, 'Reboot', '[2]', 'BOCK191760589', 0, '', '192.168.50.108', 0, '2021-08-03 11:14:15.456221', 25, 1),
(21, 'Reboot', '[2]', 'BOCK191760589', 0, '', '192.168.50.108', 0, '2021-08-03 11:14:15.934735', 25, 1),
(22, 'Logout', '[1]', 'arjaydiangzon', 0, '', '192.168.50.108', 0, '2021-08-03 11:14:16.025608', 3, 1),
(23, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.108', 0, '2021-08-03 11:14:16.233591', 3, 1),
(24, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:16.810662', 3, 1),
(25, 'Modify', '[2]', 'BOCK191760589', 0, 'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1),Enable Access Control(1->1)', '192.168.50.250', 0, '2021-08-03 11:14:16.842026', 25, 1),
(26, 'Delete', '', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:17.316716', 25, 1),
(27, 'Add', '[3]', 'BOCK191760589', 0, 'Serial Number=BOCK191760589,Device Name=BCGI,Device IP=192.168.50.204,Area=Pasig City,Enable Access Control=1', '192.168.50.250', 0, '2021-08-03 11:14:17.375719', 25, 1),
(28, 'Resynchronize to device', '[2]', '2 Arjay', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:17.501462', 41, 1),
(29, 'Delete', '', '1 Admin,19 Lawrence,2 Arjay,20 Joseph,21 Ayesha,22 Jelo,23 Yow Lee,24 Jamie,3 Wilson,4 Charles,5 Mark,6 Francis,7 Renna,8 Matthew,9 Errol', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:19.308900', 41, 1),
(30, 'Modify', '[16]', '1 Akosi', 0, 'Device Privilege(0->14),None(True->False),Effective Start Date(None->2021-08-03),Effective End Date(None->2021-08-03),None(None->),Payment Period(None->1),Payment Type(None->1)', '192.168.50.250', 0, '2021-08-03 11:14:19.792033', 41, 1),
(31, 'Resynchronize to device', '[16]', '1 Akosi', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:19.858758', 41, 1),
(32, 'Modify', '[16]', '1 Akosi', 0, 'APP Status(0->1),Effective Start Date(None->2021-08-03),Effective End Date(None->2021-08-03),None(None->),Payment Period(None->1),Payment Type(None->1)', '192.168.50.250', 0, '2021-08-03 11:14:19.946585', 41, 1),
(33, 'Resynchronize to device', '[16]', '1 Akosi', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:19.975589', 41, 1),
(34, 'Re-upload from device', '[16]', '1 Akosi', 0, 'Device=1Serial Number=', '192.168.50.250', 0, '2021-08-03 11:14:20.044153', 41, 1),
(35, 'Delete', '', '1 Akosi,19 Lawrence,2 Arjay,20 Joseph,21 Ayesha,22 Jelo,23 Yow Lee,3 Wilson,4 Charles,5 Mark,6 Francis,7 Renna,8 Matthew,9 Errol', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:22.366743', 41, 1),
(36, 'Add', '[30]', '1 RJ', 0, 'First Name=RJ,Last Name=Diangzon,Department=Department,Position=Position,Area=<QuerySet [<Area: Pasig City>]>,Employment Type=1,Effective Start Date=2021-08-03,Effective End Date=2021-08-03,None=,Payment Period=1,Payment Type=1', '192.168.50.250', 0, '2021-08-03 11:14:22.392958', 41, 1),
(37, 'Resynchronize to device', '[30]', '1 RJ', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:22.432444', 41, 1),
(38, 'Reboot', '[3]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:22.640930', 25, 1),
(39, 'Sync Data to the Device', '[3]', 'BOCK191760589', 0, 'Employee=TruePhoto=TrueFingerprint=TrueFace=TruePalm=TrueFinger Vein=TrueBio-Photo=True', '192.168.50.250', 0, '2021-08-03 11:14:22.768771', 25, 1),
(40, 'Clear All Data', '[3]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:22.854977', 25, 1),
(41, 'Re-upload from device', '[30]', '1 RJ', 0, 'Device=1Serial Number=', '192.168.50.250', 0, '2021-08-03 11:14:22.961987', 41, 1),
(42, 'Sync Data to the Device', '[3]', 'BOCK191760589', 0, 'Employee=TruePhoto=FalseFingerprint=FalseFace=FalsePalm=FalseFinger Vein=FalseBio-Photo=False', '192.168.50.250', 0, '2021-08-03 11:14:24.854079', 25, 1),
(43, 'Add', '[32]', '3 Test', 0, 'First Name=Test,Last Name=test,Department=Department,Position=Position,Area=<QuerySet [<Area: Pasig City>]>,Effective Start Date=2021-08-03,Effective End Date=2021-08-03,None=,Payment Period=1,Payment Type=1', '192.168.50.250', 0, '2021-08-03 11:14:24.953020', 41, 1),
(44, 'Modify', '[32]', '3 Test', 0, 'Effective Start Date(None->2021-08-03),Effective End Date(None->2021-08-03),None(None->),Attendance Group(None->default),Payment Period(None->1),Payment Type(None->1)', '192.168.50.250', 0, '2021-08-03 11:14:25.057880', 41, 1),
(45, 'Resynchronize to device', '[30, 31, 32]', '1 RJ,2 G,3 Test', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:25.199404', 41, 1),
(46, 'Re-upload from device', '[30, 31, 32]', '1 RJ,2 G,3 Test', 0, 'Device=1Serial Number=', '192.168.50.250', 0, '2021-08-03 11:14:25.504918', 41, 1),
(47, 'Modify', '[3]', 'BOCK191760589', 0, 'Time Zone(8->8),Attendance Device(1->0),Transfer Mode(1->1),Enable Access Control(1->0)', '192.168.50.250', 0, '2021-08-03 11:14:25.552923', 25, 1),
(48, 'Modify', '[3]', 'BOCK191760589', 0, 'Time Zone(8->8),Attendance Device(0->1),Transfer Mode(1->1),Enable Access Control(0->1)', '192.168.50.250', 0, '2021-08-03 11:14:25.990743', 25, 1),
(49, 'Read Information', '[3]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:26.617147', 25, 1),
(50, 'Read Information', '[3]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:26.672057', 25, 1),
(51, 'Sync Data to the Device', '[3]', 'BOCK191760589', 0, 'Employee=TruePhoto=TrueFingerprint=TrueFace=TruePalm=TrueFinger Vein=TrueBio-Photo=True', '192.168.50.250', 0, '2021-08-03 11:14:27.066269', 25, 1),
(52, 'Resynchronize to device', '[30, 31, 32]', '1 Bcgi,2 G,3 Test', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:27.707924', 41, 1),
(53, 'Modify', '[31]', '2 G', 0, 'Area([<Area: Pasig City>]-><QuerySet [<Area: Not Authorized>]>),None(True->False),Effective Start Date(None->2021-08-03),Effective End Date(None->2021-08-03),None(None->),Payment Period(None->1),Payment Type(None->1)', '192.168.50.250', 0, '2021-08-03 11:14:27.783242', 41, 1),
(54, 'Resynchronize to device', '[31]', '2 G', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:28.113229', 41, 1),
(55, 'Re-upload from device', '[30, 31, 32]', '1 Bcgi,2 G,3 Test', 0, 'Device=1Serial Number=', '192.168.50.250', 0, '2021-08-03 11:14:28.200236', 41, 1),
(56, 'Sync Data to the Device', '[3]', 'BOCK191760589', 0, 'Employee=TruePhoto=TrueFingerprint=TrueFace=TruePalm=TrueFinger Vein=TrueBio-Photo=True', '192.168.50.250', 0, '2021-08-03 11:14:29.158738', 25, 1),
(57, 'Logout', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:29.533112', 3, 1),
(58, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:29.562117', 3, 1),
(59, 'Resynchronize to device', '[30, 33, 31, 32]', '1 Bcgi,12 RJ,2 G,3 Test', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:29.592116', 41, 1),
(60, 'Reboot', '[3]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:29.826732', 25, 1),
(61, 'Clear All Data', '[3]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:29.930795', 25, 1),
(62, 'Sync Data to the Device', '[3]', 'BOCK191760589', 0, 'Employee=TruePhoto=TrueFingerprint=TrueFace=TruePalm=TrueFinger Vein=TrueBio-Photo=True', '192.168.50.250', 0, '2021-08-03 11:14:30.064091', 25, 1),
(63, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-03 11:14:30.756712', 3, 1),
(64, 'Resynchronize to device', '[30, 33, 31, 32]', '1 Bcgi,12 RJ,2 G,3 Test', 0, '', '192.168.50.250', 0, '2021-08-03 11:17:13.885806', 41, 1),
(65, 'Modify', '[31]', '2 G', 0, 'Area([<Area: Not Authorized>]-><QuerySet [<Area: Pasig City>]>),Effective Start Date(None->2021-08-03),Effective End Date(None->2021-08-03),None(None->),Payment Period(None->1),Payment Type(None->1)', '192.168.50.250', 0, '2021-08-03 11:17:40.845885', 41, 1),
(66, 'Logout', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-03 11:18:28.506171', 3, 1),
(67, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-03 11:18:43.040160', 3, 1),
(68, 'Reboot', '[3]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-08-03 11:19:22.258373', 25, 1),
(69, 'Clear Pending Command', '[3]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-08-03 11:19:37.571909', 25, 1),
(70, 'Clear Pending Command', '[3]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-08-03 11:19:42.515220', 25, 1),
(71, 'Resynchronize to device', '[30, 33, 40, 31, 41, 42, 43, 44, 32, 34, 35, 36, 37, 38, 39]', '1 Akosi,12 RJ,19 Lawrence,2 Arjay,20 Joseph,21 Ayesha,22 Jelo,23 Yow Lee,3 Wilson,4 Charles,5 Mark,6 Francis,7 Renna,8 Matthew,9 Errol', 0, '', '192.168.50.250', 0, '2021-08-03 11:19:52.878345', 41, 1),
(72, 'Clear All Data', '[3]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-08-03 11:20:40.099199', 25, 1),
(73, 'Logout', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-03 11:21:19.931315', 3, 1),
(74, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-03 11:21:26.821479', 3, 1),
(75, 'Resynchronize to device', '[30, 33, 40, 31, 41, 42, 43, 44, 32, 34, 35, 36, 37, 38, 39]', '1 Akosi,12 RJ,19 Lawrence,2 Arjay,20 Joseph,21 Ayesha,22 Jelo,23 Yow Lee,3 Wilson,4 Charles,5 Mark,6 Francis,7 Renna,8 Matthew,9 Errol', 0, '', '192.168.50.250', 0, '2021-08-03 11:21:50.390164', 41, 1),
(76, 'Delete', '', '1 Akosi,12 RJ,19 Lawrence,2 Arjay,20 Joseph,21 Ayesha,22 Jelo,23 Yow Lee,3 Wilson,4 Charles,5 Mark,6 Francis,7 Renna,8 Matthew,9 Errol', 0, '', '192.168.50.250', 0, '2021-08-03 11:22:59.642048', 41, 1),
(77, 'Resynchronize to device', '[45, 54, 46, 55, 56, 57, 58, 47, 48, 49, 50, 51, 52, 53]', '1 Akosi,19 Lawrence,2 Arjay,20 Joseph,21 Ayesha,22 Jelo,23 Yow Lee,3 Wilson,4 Charles,5 Mark,6 Francis,7 Renna,8 Matthew,9 Errol', 0, '', '192.168.50.250', 0, '2021-08-03 11:23:17.919859', 41, 1),
(78, 'Resynchronize to device', '[45, 54, 46, 55, 56, 57, 58, 47, 48, 49, 50, 51, 52, 53]', '1 Akosi,19 Lawrence,2 RJ,20 Joseph,21 Ayesha,22 Jelo,23 Yow Lee,3 Wilson,4 Charles,5 Mark,6 Francis,7 Renna,8 Matthew,9 Errol', 0, '', '192.168.50.250', 0, '2021-08-03 11:24:52.502329', 41, 1),
(79, 'Logout', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-03 12:25:48.204298', 3, 1),
(80, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-03 12:50:58.774345', 3, 1),
(81, 'Logout', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-03 13:51:48.349475', 3, 1),
(82, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-24 13:15:12.726521', 3, 1),
(83, 'Resynchronize to device', '[45, 54, 46, 55, 56, 57, 58, 47, 48, 49, 50, 51, 52, 53]', '1 Akosi,19 Lawrence,2 RJ,20 Joseph,21 Ayesha,22 Jelo,23 Yow Lee,3 Wilson,4 Charles,5 Mark,6 Francis,7 Renna,8 Matthew,9 Errol', 0, '', '192.168.50.250', 0, '2021-08-24 13:15:13.239428', 41, 1),
(84, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-24 13:15:15.050809', 3, 1),
(85, 'Logout', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-24 13:15:15.091964', 3, 1),
(86, 'Login', '[1]', 'arjaydiangzon', 0, '', '::1', 0, '2021-08-24 14:09:25.396715', 3, 1),
(87, 'Login', '[1]', 'arjaydiangzon', 0, '', '::1', 0, '2021-08-24 14:14:31.983138', 3, 1),
(88, 'Login', '[1]', 'arjaydiangzon', 0, '', '::1', 0, '2021-08-24 14:17:26.031009', 3, 1),
(89, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-24 14:22:20.945751', 3, 1),
(90, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-24 14:26:46.186578', 3, 1),
(91, 'Delete', '', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-08-24 14:27:35.298725', 25, 1),
(92, 'Modify', '[4]', 'BOCK191760589', 0, 'Device Name(Auto add->BCGI),Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1),Enable Access Control(0->1)', '192.168.50.250', 0, '2021-08-24 14:29:18.302909', 25, 1),
(93, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-25 13:38:01.203929', 3, 1),
(94, 'Logout', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-25 14:39:16.558706', 3, 1),
(95, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-08-31 09:32:55.512584', 3, 1),
(96, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.108', 0, '2021-09-10 14:20:14.939579', 3, 1),
(97, 'Resynchronize to device', '[45]', '1 Akosi', 0, '', '192.168.50.108', 0, '2021-09-10 14:20:55.882726', 41, 1),
(98, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.108', 0, '2021-09-10 14:46:38.786677', 3, 1),
(99, 'Logout', '[1]', 'arjaydiangzon', 0, '', '192.168.50.108', 0, '2021-09-10 15:21:50.078773', 3, 1),
(100, 'Logout', '[1]', 'arjaydiangzon', 0, '', '192.168.50.108', 0, '2021-09-10 15:49:12.056496', 3, 1),
(101, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.108', 0, '2021-09-13 15:15:43.719699', 3, 1),
(102, 'Logout', '[1]', 'arjaydiangzon', 0, '', '192.168.50.108', 0, '2021-09-13 16:15:49.350769', 3, 1),
(103, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.108', 0, '2021-09-14 07:38:11.100896', 3, 1),
(104, 'Delete', '', '27 Joseph Ilong', 0, '', '192.168.50.108', 0, '2021-09-14 08:03:46.718933', 41, 1);

-- --------------------------------------------------------

--
-- Table structure for table `base_apilog`
--

CREATE TABLE `base_apilog` (
  `id` int(11) NOT NULL,
  `action` varchar(50) NOT NULL,
  `targets` longtext DEFAULT NULL,
  `targets_repr` longtext DEFAULT NULL,
  `action_status` smallint(6) NOT NULL,
  `description` longtext DEFAULT NULL,
  `ip_address` char(39) DEFAULT NULL,
  `can_routable` tinyint(1) NOT NULL,
  `op_time` datetime(6) NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `base_apilog`
--

INSERT INTO `base_apilog` (`id`, `action`, `targets`, `targets_repr`, `action_status`, `description`, `ip_address`, `can_routable`, `op_time`, `content_type_id`, `user_id`) VALUES
(1, 'Add', '2', '2 ', 0, 'emp_code=2,department=Department,area=[<Area: Not Authorized>, <Area: Pasig City>],app_role=1,self_password=pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=,verify_mode=-1,hire_date=2021-08-03', '192.168.50.250', 0, '2021-08-03 08:30:40.569763', 41, 1),
(2, 'resync_to_device', NULL, NULL, 0, '{\"employees\": [1, 2, 3]}', '192.168.50.108', 0, '2021-08-03 11:14:05.274693', 41, 1),
(3, 'resync_to_device', NULL, NULL, 0, '{\"employees\": [1, 2, 3]}', '192.168.50.108', 0, '2021-08-03 11:14:06.153899', 41, 1),
(4, 'resync_to_device', NULL, NULL, 0, '{\"employees\": [1, 2, 3]}', '192.168.50.108', 0, '2021-08-03 11:14:06.872068', 41, 1),
(5, 'resync_to_device', NULL, NULL, 0, '{\"employees\": [1, 2, 3]}', '192.168.50.108', 0, '2021-08-03 11:14:07.317645', 41, 1),
(6, 'resync_to_device', NULL, NULL, 0, '{\"employees\": [1, 2, 3]}', '192.168.50.108', 0, '2021-08-03 11:14:08.763524', 41, 1),
(7, 'resync_to_device', NULL, NULL, 0, '{\"employees\": [1, 2, 3]}', '192.168.50.108', 0, '2021-08-03 11:14:08.908170', 41, 1),
(8, 'resync_to_device', NULL, NULL, 0, '{\"employees\": [3]}', '192.168.50.108', 0, '2021-08-03 11:14:08.938463', 41, 1),
(9, 'resync_to_device', NULL, NULL, 0, '{\"employees\": [2]}', '192.168.50.108', 0, '2021-08-03 11:14:08.971466', 41, 1),
(10, 'Add', '15', '24 Jamie', 0, 'emp_code=24,first_name=Jamie,department=Department,area=[<Area: Pasig City>],app_role=1,self_password=pbkdf2_sha256$36000$3IRxp3kz3j6r$lr5Xr4mmoTJ9pUNDJHL19qfvDv4CURuVGcVU21f1agg=,verify_mode=-1,hire_date=2021-08-03', '192.168.50.108', 0, '2021-08-03 11:14:12.715383', 41, 1),
(11, 'resync_to_device', NULL, NULL, 0, '{\"employees\": [2]}', '192.168.50.108', 0, '2021-08-03 11:14:12.756459', 41, 1),
(12, 'resync_to_device', NULL, NULL, 0, '{\"employees\": [15]}', '192.168.50.108', 0, '2021-08-03 11:14:12.789725', 41, 1),
(13, 'resync_to_device', NULL, NULL, 0, '{\"employees\": [15]}', '192.168.50.250', 0, '2021-08-03 11:14:17.036905', 41, 1),
(14, 'resync_to_device', NULL, NULL, 0, '{\"employees\": [15]}', '192.168.50.250', 0, '2021-08-03 11:14:17.237627', 41, 1),
(15, 'resync_to_device', NULL, NULL, 0, '{\"employees\": [15]}', '192.168.50.250', 0, '2021-08-03 11:14:17.407870', 41, 1),
(16, 'Add', '33', '12 RJ', 0, 'emp_code=12,first_name=RJ,department=Department,area=[<Area: Pasig City>],app_role=1,self_password=pbkdf2_sha256$36000$BCIPz5gBKybt$KRt8zCv0UhddhBMXIR2P+CTWKmn/TCXW1bpF7j4quDo=,verify_mode=-1,hire_date=2021-08-03', '192.168.50.250', 0, '2021-08-03 11:14:28.229241', 41, 1),
(17, 'resync_to_device', NULL, NULL, 0, '{\"employees\": [33]}', '192.168.50.250', 0, '2021-08-03 11:14:28.265241', 41, 1),
(18, 'resync_to_device', NULL, NULL, 0, '{\"employees\": [33]}', '192.168.50.250', 0, '2021-08-03 11:14:28.373492', 41, 1);

-- --------------------------------------------------------

--
-- Table structure for table `base_attparamdepts`
--

CREATE TABLE `base_attparamdepts` (
  `id` int(11) NOT NULL,
  `rulename` varchar(40) NOT NULL,
  `deptid` int(11) NOT NULL,
  `operator` varchar(20) DEFAULT NULL,
  `optime` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `base_autoattexporttask`
--

CREATE TABLE `base_autoattexporttask` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `task_code` varchar(30) NOT NULL,
  `task_name` varchar(30) NOT NULL,
  `params` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `base_autoexporttask`
--

CREATE TABLE `base_autoexporttask` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `task_code` varchar(30) NOT NULL,
  `task_name` varchar(30) NOT NULL,
  `params` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `base_bookmark`
--

CREATE TABLE `base_bookmark` (
  `id` int(11) NOT NULL,
  `title` varchar(128) NOT NULL,
  `filters` varchar(1000) NOT NULL,
  `is_share` tinyint(1) NOT NULL,
  `time_saved` datetime(6) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `base_dbbackuplog`
--

CREATE TABLE `base_dbbackuplog` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `db_type` varchar(50) NOT NULL,
  `db_name` varchar(50) NOT NULL,
  `operator` varchar(50) DEFAULT NULL,
  `backup_file` varchar(100) NOT NULL,
  `backup_time` datetime(6) NOT NULL,
  `backup_status` smallint(6) NOT NULL,
  `remark` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `base_dbmigrate`
--

CREATE TABLE `base_dbmigrate` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `name` varchar(30) NOT NULL,
  `value` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `base_emailtemplate`
--

CREATE TABLE `base_emailtemplate` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `category` int(11) NOT NULL,
  `sub_category` int(11) NOT NULL,
  `event` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `template` longtext NOT NULL,
  `enable` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `base_emailtemplate`
--

INSERT INTO `base_emailtemplate` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `category`, `sub_category`, `event`, `receiver`, `subject`, `template`, `enable`) VALUES
(1, '2021-08-03 07:46:16.710533', NULL, '2021-08-03 07:46:16.710533', NULL, 0, 11, 0, 1, 1, NULL, '', 0),
(2, '2021-08-03 07:46:16.867537', NULL, '2021-08-03 07:46:16.867537', NULL, 0, 11, 0, 2, 1, NULL, '', 0),
(3, '2021-08-03 07:46:16.953603', NULL, '2021-08-03 07:46:16.953603', NULL, 0, 11, 0, 3, 1, NULL, '', 0),
(4, '2021-08-03 07:46:17.009606', NULL, '2021-08-03 07:46:17.009606', NULL, 0, 11, 0, 7, 1, NULL, '', 0),
(5, '2021-08-03 07:46:17.317733', NULL, '2021-08-03 07:46:17.317733', NULL, 0, 12, 121, 4, 1, NULL, '', 0),
(6, '2021-08-03 07:46:17.394294', NULL, '2021-08-03 07:46:17.395294', NULL, 0, 12, 121, 5, 1, NULL, '', 0),
(7, '2021-08-03 07:46:17.442560', NULL, '2021-08-03 07:46:17.443561', NULL, 0, 12, 121, 6, 1, NULL, '', 0),
(8, '2021-08-03 07:46:17.500706', NULL, '2021-08-03 07:46:17.500706', NULL, 0, 12, 122, 4, 1, NULL, '', 0),
(9, '2021-08-03 07:46:17.575899', NULL, '2021-08-03 07:46:17.575899', NULL, 0, 12, 122, 5, 1, NULL, '', 0),
(10, '2021-08-03 07:46:17.671997', NULL, '2021-08-03 07:46:17.671997', NULL, 0, 12, 122, 6, 1, NULL, '', 0),
(11, '2021-08-03 07:46:17.768002', NULL, '2021-08-03 07:46:17.768002', NULL, 0, 12, 123, 4, 1, NULL, '', 0),
(12, '2021-08-03 07:46:18.018783', NULL, '2021-08-03 07:46:18.018783', NULL, 0, 12, 123, 5, 1, NULL, '', 0),
(13, '2021-08-03 07:46:18.088967', NULL, '2021-08-03 07:46:18.088967', NULL, 0, 12, 123, 6, 1, NULL, '', 0),
(14, '2021-08-03 07:46:18.176302', NULL, '2021-08-03 07:46:18.176302', NULL, 0, 12, 124, 4, 1, NULL, '', 0),
(15, '2021-08-03 07:46:18.378376', NULL, '2021-08-03 07:46:18.378376', NULL, 0, 12, 124, 5, 1, NULL, '', 0),
(16, '2021-08-03 07:46:18.426545', NULL, '2021-08-03 07:46:18.426545', NULL, 0, 12, 124, 6, 1, NULL, '', 0),
(17, '2021-08-03 07:46:18.469252', NULL, '2021-08-03 07:46:18.469252', NULL, 0, 12, 125, 4, 1, NULL, '', 0),
(18, '2021-08-03 07:46:18.517846', NULL, '2021-08-03 07:46:18.517846', NULL, 0, 12, 125, 5, 1, NULL, '', 0),
(19, '2021-08-03 07:46:18.559474', NULL, '2021-08-03 07:46:18.559474', NULL, 0, 12, 125, 6, 1, NULL, '', 0),
(20, '2021-08-03 07:46:18.610154', NULL, '2021-08-03 07:46:18.610154', NULL, 0, 13, 1310, 4, 1, NULL, '', 0),
(21, '2021-08-03 07:46:18.652522', NULL, '2021-08-03 07:46:18.652522', NULL, 0, 13, 1310, 5, 1, NULL, '', 0),
(22, '2021-08-03 07:46:18.684297', NULL, '2021-08-03 07:46:18.684297', NULL, 0, 13, 1310, 6, 1, NULL, '', 0),
(23, '2021-08-03 07:46:18.760919', NULL, '2021-08-03 07:46:18.760919', NULL, 0, 13, 1311, 4, 1, NULL, '', 0),
(24, '2021-08-03 07:46:18.818075', NULL, '2021-08-03 07:46:18.818075', NULL, 0, 13, 1311, 5, 1, NULL, '', 0),
(25, '2021-08-03 07:46:18.859910', NULL, '2021-08-03 07:46:18.860920', NULL, 0, 13, 1311, 6, 1, NULL, '', 0),
(26, '2021-08-03 07:46:18.909586', NULL, '2021-08-03 07:46:18.909586', NULL, 0, 14, 149, 4, 1, NULL, '', 0),
(27, '2021-08-03 07:46:18.959980', NULL, '2021-08-03 07:46:18.959980', NULL, 0, 14, 149, 5, 1, NULL, '', 0),
(28, '2021-08-03 07:46:19.318241', NULL, '2021-08-03 07:46:19.319241', NULL, 0, 14, 149, 6, 1, NULL, '', 0),
(29, '2021-08-03 07:46:19.398709', NULL, '2021-08-03 07:46:19.398709', NULL, 0, 21, 0, 1, 2, NULL, '', 0),
(30, '2021-08-03 07:46:19.655256', NULL, '2021-08-03 07:46:19.655256', NULL, 0, 21, 0, 2, 2, NULL, '', 0),
(31, '2021-08-03 07:46:19.694060', NULL, '2021-08-03 07:46:19.694060', NULL, 0, 21, 0, 3, 2, NULL, '', 0),
(32, '2021-08-03 07:46:19.734786', NULL, '2021-08-03 07:46:19.734786', NULL, 0, 21, 0, 7, 2, NULL, '', 0),
(33, '2021-08-03 07:46:19.777267', NULL, '2021-08-03 07:46:19.777267', NULL, 0, 32, 321, 4, 3, NULL, '', 0),
(34, '2021-08-03 07:46:19.818375', NULL, '2021-08-03 07:46:19.818375', NULL, 0, 32, 321, 5, 3, NULL, '', 0),
(35, '2021-08-03 07:46:19.887623', NULL, '2021-08-03 07:46:19.887623', NULL, 0, 32, 321, 6, 3, NULL, '', 0),
(36, '2021-08-03 07:46:19.936131', NULL, '2021-08-03 07:46:19.936131', NULL, 0, 32, 322, 4, 3, NULL, '', 0),
(37, '2021-08-03 07:46:19.976783', NULL, '2021-08-03 07:46:19.976783', NULL, 0, 32, 322, 5, 3, NULL, '', 0),
(38, '2021-08-03 07:46:20.061682', NULL, '2021-08-03 07:46:20.061682', NULL, 0, 32, 322, 6, 3, NULL, '', 0),
(39, '2021-08-03 07:46:20.110298', NULL, '2021-08-03 07:46:20.110298', NULL, 0, 32, 323, 4, 3, NULL, '', 0),
(40, '2021-08-03 07:46:20.169365', NULL, '2021-08-03 07:46:20.169365', NULL, 0, 32, 323, 5, 3, NULL, '', 0),
(41, '2021-08-03 07:46:20.460315', NULL, '2021-08-03 07:46:20.460315', NULL, 0, 32, 323, 6, 3, NULL, '', 0),
(42, '2021-08-03 07:46:20.501052', NULL, '2021-08-03 07:46:20.501052', NULL, 0, 32, 324, 4, 3, NULL, '', 0),
(43, '2021-08-03 07:46:20.544293', NULL, '2021-08-03 07:46:20.544293', NULL, 0, 32, 324, 5, 3, NULL, '', 0),
(44, '2021-08-03 07:46:20.594294', NULL, '2021-08-03 07:46:20.594294', NULL, 0, 32, 324, 6, 3, NULL, '', 0),
(45, '2021-08-03 07:46:20.776947', NULL, '2021-08-03 07:46:20.776947', NULL, 0, 32, 325, 4, 3, NULL, '', 0),
(46, '2021-08-03 07:46:20.811294', NULL, '2021-08-03 07:46:20.811294', NULL, 0, 32, 325, 5, 3, NULL, '', 0),
(47, '2021-08-03 07:46:20.860036', NULL, '2021-08-03 07:46:20.860036', NULL, 0, 32, 325, 6, 3, NULL, '', 0),
(48, '2021-08-03 07:46:20.894047', NULL, '2021-08-03 07:46:20.894047', NULL, 0, 33, 3310, 4, 3, NULL, '', 0),
(49, '2021-08-03 07:46:20.944295', NULL, '2021-08-03 07:46:20.944295', NULL, 0, 33, 3310, 5, 3, NULL, '', 0),
(50, '2021-08-03 07:46:20.978047', NULL, '2021-08-03 07:46:20.978047', NULL, 0, 33, 3310, 6, 3, NULL, '', 0),
(51, '2021-08-03 07:46:21.019292', NULL, '2021-08-03 07:46:21.019292', NULL, 0, 33, 3311, 4, 3, NULL, '', 0),
(52, '2021-08-03 07:46:21.060473', NULL, '2021-08-03 07:46:21.060473', NULL, 0, 33, 3311, 5, 3, NULL, '', 0),
(53, '2021-08-03 07:46:21.102050', NULL, '2021-08-03 07:46:21.102050', NULL, 0, 33, 3311, 6, 3, NULL, '', 0),
(54, '2021-08-03 07:46:21.135806', NULL, '2021-08-03 07:46:21.135806', NULL, 0, 34, 349, 4, 3, NULL, '', 0),
(55, '2021-08-03 07:46:21.186296', NULL, '2021-08-03 07:46:21.186296', NULL, 0, 34, 349, 5, 3, NULL, '', 0),
(56, '2021-08-03 07:46:21.219355', NULL, '2021-08-03 07:46:21.219355', NULL, 0, 34, 349, 6, 3, NULL, '', 0),
(57, '2021-08-03 07:46:21.260699', NULL, '2021-08-03 07:46:21.260699', NULL, 0, 42, 421, 4, 4, NULL, '', 0),
(58, '2021-08-03 07:46:21.310586', NULL, '2021-08-03 07:46:21.310586', NULL, 0, 42, 421, 5, 4, NULL, '', 0),
(59, '2021-08-03 07:46:21.352364', NULL, '2021-08-03 07:46:21.352364', NULL, 0, 42, 421, 6, 4, NULL, '', 0),
(60, '2021-08-03 07:46:21.735823', NULL, '2021-08-03 07:46:21.735823', NULL, 0, 42, 422, 4, 4, NULL, '', 0),
(61, '2021-08-03 07:46:21.802655', NULL, '2021-08-03 07:46:21.802655', NULL, 0, 42, 422, 5, 4, NULL, '', 0),
(62, '2021-08-03 07:46:21.978080', NULL, '2021-08-03 07:46:21.978080', NULL, 0, 42, 422, 6, 4, NULL, '', 0),
(63, '2021-08-03 07:46:22.035427', NULL, '2021-08-03 07:46:22.035427', NULL, 0, 42, 423, 4, 4, NULL, '', 0),
(64, '2021-08-03 07:46:22.085646', NULL, '2021-08-03 07:46:22.085646', NULL, 0, 42, 423, 5, 4, NULL, '', 0),
(65, '2021-08-03 07:46:22.119293', NULL, '2021-08-03 07:46:22.119293', NULL, 0, 42, 423, 6, 4, NULL, '', 0),
(66, '2021-08-03 07:46:22.161731', NULL, '2021-08-03 07:46:22.161731', NULL, 0, 42, 424, 4, 4, NULL, '', 0),
(67, '2021-08-03 07:46:22.210743', NULL, '2021-08-03 07:46:22.211746', NULL, 0, 42, 424, 5, 4, NULL, '', 0),
(68, '2021-08-03 07:46:22.235548', NULL, '2021-08-03 07:46:22.235548', NULL, 0, 42, 424, 6, 4, NULL, '', 0),
(69, '2021-08-03 07:46:22.277418', NULL, '2021-08-03 07:46:22.277418', NULL, 0, 42, 425, 4, 4, NULL, '', 0),
(70, '2021-08-03 07:46:22.319294', NULL, '2021-08-03 07:46:22.319294', NULL, 0, 42, 425, 5, 4, NULL, '', 0),
(71, '2021-08-03 07:46:22.360334', NULL, '2021-08-03 07:46:22.360334', NULL, 0, 42, 425, 6, 4, NULL, '', 0),
(72, '2021-08-03 07:46:22.411283', NULL, '2021-08-03 07:46:22.411283', NULL, 0, 43, 4310, 4, 4, NULL, '', 0),
(73, '2021-08-03 07:46:22.511705', NULL, '2021-08-03 07:46:22.511705', NULL, 0, 43, 4310, 5, 4, NULL, '', 0),
(74, '2021-08-03 07:46:22.560124', NULL, '2021-08-03 07:46:22.560124', NULL, 0, 43, 4310, 6, 4, NULL, '', 0),
(75, '2021-08-03 07:46:22.595314', NULL, '2021-08-03 07:46:22.595314', NULL, 0, 43, 4311, 4, 4, NULL, '', 0),
(76, '2021-08-03 07:46:22.902482', NULL, '2021-08-03 07:46:22.903485', NULL, 0, 43, 4311, 5, 4, NULL, '', 0),
(77, '2021-08-03 07:46:23.003301', NULL, '2021-08-03 07:46:23.003301', NULL, 0, 43, 4311, 6, 4, NULL, '', 0),
(78, '2021-08-03 07:46:23.251928', NULL, '2021-08-03 07:46:23.251928', NULL, 0, 44, 449, 4, 4, NULL, '', 0),
(79, '2021-08-03 07:46:23.295281', NULL, '2021-08-03 07:46:23.295281', NULL, 0, 44, 449, 5, 4, NULL, '', 0),
(80, '2021-08-03 07:46:23.319239', NULL, '2021-08-03 07:46:23.319239', NULL, 0, 44, 449, 6, 4, NULL, '', 0),
(81, '2021-08-03 07:46:23.378518', NULL, '2021-08-03 07:46:23.378518', NULL, 0, 0, 0, 101, 5, NULL, '', 0),
(82, '2021-08-03 07:46:23.419299', NULL, '2021-08-03 07:46:23.419299', NULL, 0, 0, 0, 102, 5, NULL, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `base_eventalertsetting`
--

CREATE TABLE `base_eventalertsetting` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `event_id` int(11) NOT NULL,
  `event` varchar(50) NOT NULL,
  `module` varchar(50) NOT NULL,
  `sub_module` varchar(50) NOT NULL,
  `email_alert` tinyint(1) NOT NULL,
  `app_alert` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `base_eventalertsetting`
--

INSERT INTO `base_eventalertsetting` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `event_id`, `event`, `module`, `sub_module`, `email_alert`, `app_alert`) VALUES
(1, '2021-08-03 07:46:23.565969', NULL, '2021-08-03 07:46:23.565969', NULL, 0, 1, 'menu_att_manualLog', 'menu_attendance', 'menu_group_approvalManagement', 1, 1),
(2, '2021-08-03 07:46:23.636152', NULL, '2021-08-03 07:46:23.636152', NULL, 0, 2, 'menu_att_leave', 'menu_attendance', 'menu_group_approvalManagement', 1, 1),
(3, '2021-08-03 07:46:23.761160', NULL, '2021-08-03 07:46:23.761160', NULL, 0, 3, 'menu_att_overtime', 'menu_attendance', 'menu_group_approvalManagement', 1, 1),
(4, '2021-08-03 07:46:23.853833', NULL, '2021-08-03 07:46:23.853833', NULL, 0, 4, 'menu_att_training', 'menu_attendance', 'menu_group_approvalManagement', 1, 1),
(5, '2021-08-03 07:46:24.336538', NULL, '2021-08-03 07:46:24.336538', NULL, 0, 5, 'menu_att_adjustSchedule', 'menu_attendance', 'menu_group_approvalManagement', 1, 1),
(6, '2021-08-03 07:46:24.411583', NULL, '2021-08-03 07:46:24.411583', NULL, 0, 6, 'payCode.default.lateIn', 'menu_attendance', 'menu_group_att_rule', 1, 1),
(7, '2021-08-03 07:46:24.479147', NULL, '2021-08-03 07:46:24.479147', NULL, 0, 7, 'payCode.default.earlyOut', 'menu_attendance', 'menu_group_att_rule', 1, 1),
(8, '2021-08-03 07:46:24.537332', NULL, '2021-08-03 07:46:24.537332', NULL, 0, 8, 'payCode.default.absence', 'menu_attendance', 'menu_group_att_rule', 1, 1),
(9, '2021-08-03 07:46:24.750172', NULL, '2021-08-03 07:46:24.750172', NULL, 0, 9, 'menu.visitor.registration', 'menu.visitor.registration.visitor', 'menu.visitor.reservation', 1, 0),
(10, '2021-08-03 07:46:24.822888', NULL, '2021-08-03 07:46:24.823906', NULL, 0, 10, 'meeting.menus.meeting', 'meeting.menus.meeting', 'meeting.menus.meeting', 1, 0),
(11, '2021-08-03 07:46:24.885785', NULL, '2021-08-03 07:46:24.886804', NULL, 0, 11, 'meeting.menus.manualLog', 'meeting.menus.meeting', 'meeting.menus.manualLog', 1, 0),
(12, '2021-08-03 07:46:24.927264', NULL, '2021-08-03 07:46:24.927264', NULL, 0, 12, 'menu_device_publicMessage', 'menu_group_device_deviceManagement', 'menu_mobile_announcement', 0, 1),
(13, '2021-08-03 07:46:25.004283', NULL, '2021-08-03 07:46:25.004283', NULL, 0, 13, 'menu_device_privateMessage', 'menu_group_device_deviceManagement', 'menu_mobile_announcement', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `base_linenotifysetting`
--

CREATE TABLE `base_linenotifysetting` (
  `id` int(11) NOT NULL,
  `include_sub_department` int(11) DEFAULT NULL,
  `line_notify_token` varchar(200) DEFAULT NULL,
  `message_type` int(11) DEFAULT NULL,
  `message_head` varchar(100) DEFAULT NULL,
  `message_tail` varchar(100) DEFAULT NULL,
  `push_time` time(6) DEFAULT NULL,
  `is_valid` int(11) DEFAULT NULL,
  `remark` varchar(200) DEFAULT NULL,
  `line_notify_dept_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `base_securitypolicy`
--

CREATE TABLE `base_securitypolicy` (
  `id` int(11) NOT NULL,
  `single_login` tinyint(1) NOT NULL,
  `security_code` tinyint(1) NOT NULL,
  `code_length` int(11) NOT NULL,
  `valid_duration` int(11) NOT NULL,
  `failed_locked` tinyint(1) NOT NULL,
  `lock_failed_count` int(11) NOT NULL,
  `lock_duration` int(11) NOT NULL,
  `enforce_pwd_change` tinyint(1) NOT NULL,
  `enforce_pwd_expiration` tinyint(1) NOT NULL,
  `validity_period` int(11) NOT NULL,
  `password_level` smallint(6) NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `app_single_user_login` tinyint(1) NOT NULL,
  `session_timeout` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `base_securitypolicy`
--

INSERT INTO `base_securitypolicy` (`id`, `single_login`, `security_code`, `code_length`, `valid_duration`, `failed_locked`, `lock_failed_count`, `lock_duration`, `enforce_pwd_change`, `enforce_pwd_expiration`, `validity_period`, `password_level`, `is_default`, `app_single_user_login`, `session_timeout`) VALUES
(1, 0, 0, 5, 1, 0, 5, 60, 0, 0, 90, 2, 1, 0, 60);

-- --------------------------------------------------------

--
-- Table structure for table `base_sendemail`
--

CREATE TABLE `base_sendemail` (
  `id` int(11) NOT NULL,
  `purpose` int(11) NOT NULL,
  `email_to` longtext NOT NULL,
  `email_cc` longtext DEFAULT NULL,
  `email_bcc` longtext DEFAULT NULL,
  `email_subject` varchar(40) NOT NULL,
  `email_content` longtext DEFAULT NULL,
  `send_time` datetime(6) DEFAULT NULL,
  `send_status` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `base_sftpsetting`
--

CREATE TABLE `base_sftpsetting` (
  `id` int(11) NOT NULL,
  `host` varchar(39) NOT NULL,
  `port` int(11) NOT NULL,
  `auth_method` int(11) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `user_password` varchar(128) DEFAULT NULL,
  `user_key` longtext DEFAULT NULL,
  `key_password` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `base_sysparam`
--

CREATE TABLE `base_sysparam` (
  `id` int(11) NOT NULL,
  `para_name` varchar(30) NOT NULL,
  `para_type` varchar(10) DEFAULT NULL,
  `para_value` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `base_sysparam`
--

INSERT INTO `base_sysparam` (`id`, `para_name`, `para_type`, `para_value`) VALUES
(1, 'rule_id', 'rule_0', '0'),
(2, 'dept_id', 'rule_0', '0'),
(3, 'apply_name', 'rule_0', 'All'),
(4, 'rule_name', 'rule_0', 'Default Attendance Rules'),
(5, 'minutes_early', 'rule_0', '0'),
(6, 'minutes_late', 'rule_0', '0'),
(7, 'minutes_no_break_in', 'rule_0', '60'),
(8, 'minutes_no_break_out', 'rule_0', '60'),
(9, 'minutes_no_in', 'rule_0', '60'),
(10, 'minutes_no_leave', 'rule_0', '60'),
(11, 'minutes_not_over_time', 'rule_0', '60'),
(12, 'minutes_work_day', 'rule_0', '480'),
(13, 'no_break_in', 'rule_0', '1012'),
(14, 'no_break_out', 'rule_0', '1012'),
(15, 'no_in', 'rule_0', '1001'),
(16, 'no_leave', 'rule_0', '1002'),
(17, 'out_over_time', 'rule_0', '0'),
(18, 'two_day', 'rule_0', '0'),
(19, 'check_in_color', 'rule_0', '16777151'),
(20, 'check_out_color', 'rule_0', '12910591'),
(21, 'db_version', '', '2002'),
(22, 'installdate', '', '73e7-_Mb9weUMRWpGymnlzZl8jyGq73CYpxloBQHl5XPFe037OLo'),
(23, 'sys_date', '', '73e7-_Mb9weUMRWpGymnlzZl8jyGq73CYpxloBQHl5XPFe037OLo'),
(24, 'ADMSDBVersion', '', '544'),
(25, 'active_date', '', 'efcevuZ5Qs2ITNJRyXUC3i_1_BabLb_tPw0hlTS41pMpRImfQeVs');

-- --------------------------------------------------------

--
-- Table structure for table `base_sysparamdept`
--

CREATE TABLE `base_sysparamdept` (
  `id` int(11) NOT NULL,
  `rule_name` varchar(40) NOT NULL,
  `dept_id` int(11) NOT NULL,
  `operator` varchar(20) DEFAULT NULL,
  `op_time` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `base_systemlog`
--

CREATE TABLE `base_systemlog` (
  `id` int(11) NOT NULL,
  `execute_time` datetime(6) NOT NULL,
  `operation` smallint(6) NOT NULL,
  `execute_status` smallint(6) NOT NULL,
  `description` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `base_systemlog`
--

INSERT INTO `base_systemlog` (`id`, `execute_time`, `operation`, `execute_status`, `description`) VALUES
(1, '2021-08-31 08:46:07.161212', 1, 0, 'Success: 0, Failed: 0'),
(2, '2021-08-31 08:46:07.263709', 2, 0, 'Active: 0, Inactive: 0'),
(3, '2021-08-31 09:32:29.496634', 1, 0, 'Success: 0, Failed: 0'),
(4, '2021-08-31 09:32:30.616637', 2, 0, 'Active: 0, Inactive: 0'),
(5, '2021-09-09 14:58:33.279058', 1, 0, 'Success: 0, Failed: 0'),
(6, '2021-09-09 14:58:35.064501', 2, 0, 'Active: 0, Inactive: 0'),
(7, '2021-09-13 15:10:31.380925', 1, 0, 'Success: 0, Failed: 0'),
(8, '2021-09-13 15:10:32.336535', 2, 0, 'Active: 0, Inactive: 0');

-- --------------------------------------------------------

--
-- Table structure for table `base_systemsetting`
--

CREATE TABLE `base_systemsetting` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `name` varchar(30) NOT NULL,
  `value` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `base_taskresultlog`
--

CREATE TABLE `base_taskresultlog` (
  `id` int(11) NOT NULL,
  `task` varchar(50) NOT NULL,
  `status` varchar(10) NOT NULL,
  `result` varchar(500) NOT NULL,
  `time` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2021-08-03 08:00:50.170398', '2', 'Pasig City', 1, 'Area Name=Pasig City', 38, 1),
(2, '2021-08-03 08:01:03.546483', '1', 'BOCK191760589', 2, 'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1),Enable Access Control(0->0)', 25, 1),
(3, '2021-08-03 08:01:16.520183', '1', 'BOCK191760589', 2, 'Device Name(Auto add->BCGI),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1),Enable Access Control(0->0)', 25, 1),
(4, '2021-08-03 10:24:15.111273', '2', 'BOCK191760589', 1, 'Serial Number=BOCK191760589,Device Name=BCGI,Device IP=192.168.50.204,Area=Pasig City', 25, 1),
(5, '2021-08-03 10:29:09.215261', '2', '2 Arjay', 2, 'Area([<Area: Not Authorized>, <Area: Pasig City>]-><QuerySet [<Area: Pasig City>]>),Employment Type(None->1),None(True->False),Effective Start Date(None->2021-08-03),Effective End Date(None->2021-08-03),None(None->),Payment Period(None->1),Payment Type(None->1)', 41, 1),
(6, '2021-08-03 10:37:01.354991', '2', 'BOCK191760589', 2, 'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1),Enable Access Control(0->1)', 25, 1),
(7, '2021-08-03 10:42:00.243516', '2', 'BOCK191760589', 2, 'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1),Enable Access Control(1->1)', 25, 1),
(8, '2021-08-03 10:43:29.329559', '3', 'BOCK191760589', 1, 'Serial Number=BOCK191760589,Device Name=BCGI,Device IP=192.168.50.204,Area=Pasig City,Enable Access Control=1', 25, 1),
(9, '2021-08-03 10:46:37.909368', '16', '1 Akosi', 2, 'Device Privilege(0->14),None(True->False),Effective Start Date(None->2021-08-03),Effective End Date(None->2021-08-03),None(None->),Payment Period(None->1),Payment Type(None->1)', 41, 1),
(10, '2021-08-03 10:46:59.424206', '16', '1 Akosi', 2, 'APP Status(0->1),Effective Start Date(None->2021-08-03),Effective End Date(None->2021-08-03),None(None->),Payment Period(None->1),Payment Type(None->1)', 41, 1),
(11, '2021-08-03 10:48:45.663473', '30', '1 RJ', 1, 'First Name=RJ,Last Name=Diangzon,Department=Department,Position=Position,Area=<QuerySet [<Area: Pasig City>]>,Employment Type=1,Effective Start Date=2021-08-03,Effective End Date=2021-08-03,None=,Payment Period=1,Payment Type=1', 41, 1),
(12, '2021-08-03 10:52:50.775073', '32', '3 Test', 1, 'First Name=Test,Last Name=test,Department=Department,Position=Position,Area=<QuerySet [<Area: Pasig City>]>,Effective Start Date=2021-08-03,Effective End Date=2021-08-03,None=,Payment Period=1,Payment Type=1', 41, 1),
(13, '2021-08-03 10:54:02.532880', '32', '3 Test', 2, 'Effective Start Date(None->2021-08-03),Effective End Date(None->2021-08-03),None(None->),Attendance Group(None->default),Payment Period(None->1),Payment Type(None->1)', 41, 1),
(14, '2021-08-03 10:55:08.944083', '3', 'BOCK191760589', 2, 'Time Zone(8->8),Attendance Device(1->0),Transfer Mode(1->1),Enable Access Control(1->0)', 25, 1),
(15, '2021-08-03 10:55:17.830624', '3', 'BOCK191760589', 2, 'Time Zone(8->8),Attendance Device(0->1),Transfer Mode(1->1),Enable Access Control(0->1)', 25, 1),
(16, '2021-08-03 11:00:57.590238', '31', '2 G', 2, 'Area([<Area: Pasig City>]-><QuerySet [<Area: Not Authorized>]>),None(True->False),Effective Start Date(None->2021-08-03),Effective End Date(None->2021-08-03),None(None->),Payment Period(None->1),Payment Type(None->1)', 41, 1),
(17, '2021-08-03 11:17:40.773146', '31', '2 G', 2, 'Area([<Area: Not Authorized>]-><QuerySet [<Area: Pasig City>]>),Effective Start Date(None->2021-08-03),Effective End Date(None->2021-08-03),None(None->),Payment Period(None->1),Payment Type(None->1)', 41, 1),
(18, '2021-08-24 14:29:18.057324', '4', 'BOCK191760589', 2, 'Device Name(Auto add->BCGI),Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1),Enable Access Control(0->1)', 25, 1);

-- --------------------------------------------------------

--
-- Table structure for table `django_celery_beat_clockedschedule`
--

CREATE TABLE `django_celery_beat_clockedschedule` (
  `id` int(11) NOT NULL,
  `clocked_time` datetime(6) NOT NULL,
  `enabled` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `django_celery_beat_crontabschedule`
--

CREATE TABLE `django_celery_beat_crontabschedule` (
  `id` int(11) NOT NULL,
  `minute` varchar(240) NOT NULL,
  `hour` varchar(96) NOT NULL,
  `day_of_week` varchar(64) NOT NULL,
  `day_of_month` varchar(124) NOT NULL,
  `month_of_year` varchar(64) NOT NULL,
  `timezone` varchar(63) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_celery_beat_crontabschedule`
--

INSERT INTO `django_celery_beat_crontabschedule` (`id`, `minute`, `hour`, `day_of_week`, `day_of_month`, `month_of_year`, `timezone`) VALUES
(1, '0', '4', '*', '*', '*', 'Asia/Singapore'),
(2, '0', '2', '*', '*', '*', 'Asia/Singapore'),
(3, '30', '2', '*', '*', '*', 'Asia/Singapore'),
(4, '0', '0', '*', '*', '*', 'Asia/Singapore'),
(5, '1', '0', '*', '*', '*', 'Asia/Singapore'),
(6, '5', '0', '*', '*', '*', 'Asia/Singapore'),
(7, '10', '0', '*', '*', '*', 'Asia/Singapore'),
(8, '15', '0', '*', '*', '*', 'Asia/Singapore');

-- --------------------------------------------------------

--
-- Table structure for table `django_celery_beat_intervalschedule`
--

CREATE TABLE `django_celery_beat_intervalschedule` (
  `id` int(11) NOT NULL,
  `every` int(11) NOT NULL,
  `period` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_celery_beat_intervalschedule`
--

INSERT INTO `django_celery_beat_intervalschedule` (`id`, `every`, `period`) VALUES
(1, 3, 'seconds'),
(2, 60, 'seconds'),
(3, 10, 'seconds'),
(4, 200, 'seconds');

-- --------------------------------------------------------

--
-- Table structure for table `django_celery_beat_periodictask`
--

CREATE TABLE `django_celery_beat_periodictask` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `task` varchar(200) NOT NULL,
  `args` longtext NOT NULL,
  `kwargs` longtext NOT NULL,
  `queue` varchar(200) DEFAULT NULL,
  `exchange` varchar(200) DEFAULT NULL,
  `routing_key` varchar(200) DEFAULT NULL,
  `expires` datetime(6) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL,
  `last_run_at` datetime(6) DEFAULT NULL,
  `total_run_count` int(10) UNSIGNED NOT NULL,
  `date_changed` datetime(6) NOT NULL,
  `description` longtext NOT NULL,
  `crontab_id` int(11) DEFAULT NULL,
  `interval_id` int(11) DEFAULT NULL,
  `solar_id` int(11) DEFAULT NULL,
  `one_off` tinyint(1) NOT NULL,
  `start_time` datetime(6) DEFAULT NULL,
  `priority` int(10) UNSIGNED DEFAULT NULL,
  `headers` longtext NOT NULL,
  `clocked_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_celery_beat_periodictask`
--

INSERT INTO `django_celery_beat_periodictask` (`id`, `name`, `task`, `args`, `kwargs`, `queue`, `exchange`, `routing_key`, `expires`, `enabled`, `last_run_at`, `total_run_count`, `date_changed`, `description`, `crontab_id`, `interval_id`, `solar_id`, `one_off`, `start_time`, `priority`, `headers`, `clocked_id`) VALUES
(1, 'celery.backend_cleanup', 'celery.backend_cleanup', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-14 07:33:22.718469', 6, '2021-09-14 07:33:22.718469', '', 1, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(2, 'acc.tasks.data_sync_guard', 'acc.tasks.data_sync_guard', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 16:10:15.693598', 79621, '2021-09-15 16:10:15.693598', '', NULL, 1, NULL, 0, NULL, NULL, '{}', NULL),
(3, 'att.tasks.att_exception_alert', 'att.tasks.att_exception_alert', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 16:10:15.604896', 4116, '2021-09-15 16:10:15.604896', '', NULL, 2, NULL, 0, NULL, NULL, '{}', NULL),
(4, 'base.tasks.daily_licence_verify', 'base.tasks.daily_licence_verify', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-14 07:33:23.284522', 6, '2021-09-14 07:33:23.284522', '', 2, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(5, 'base.tasks.daily_aof_rewrite', 'base.tasks.daily_aof_rewrite', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 07:35:28.907544', 8, '2021-09-15 07:35:28.914062', '', 3, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(6, 'base.tasks.database_backup', 'base.tasks.database_backup', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 16:10:15.915552', 4112, '2021-09-15 16:10:15.915552', '', NULL, 2, NULL, 0, NULL, NULL, '{}', NULL),
(7, 'base.tasks.auto_export_task_executive', 'base.tasks.auto_export_task_executive', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 16:10:15.893597', 4113, '2021-09-15 16:10:15.893597', '', NULL, 2, NULL, 0, NULL, NULL, '{}', NULL),
(8, 'base.tasks.auto_att_export_task_executive', 'base.tasks.auto_att_export_task_executive', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 16:10:15.735501', 4112, '2021-09-15 16:10:15.736500', '', NULL, 2, NULL, 0, NULL, NULL, '{}', NULL),
(9, 'base.tasks.middleware_data_migrate', 'base.tasks.middleware_data_migrate', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 16:10:15.768144', 4114, '2021-09-15 16:10:15.768144', '', NULL, 2, NULL, 0, NULL, NULL, '{}', NULL),
(10, 'iclock.tasks.save_transaction_from_file2db', 'iclock.tasks.save_transaction_from_file2db', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 16:10:15.632138', 24121, '2021-09-15 16:10:15.632138', '', NULL, 3, NULL, 0, NULL, NULL, '{}', NULL),
(11, 'iclock.tasks.data_sync', 'iclock.tasks.data_sync', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 16:10:15.826927', 79620, '2021-09-15 16:10:15.826927', '', NULL, 1, NULL, 0, NULL, NULL, '{}', NULL),
(12, 'iclock.tasks.device_online_monitor', 'iclock.tasks.device_online_monitor', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 16:10:15.660263', 1247, '2021-09-15 16:10:15.660263', '', NULL, 4, NULL, 0, NULL, NULL, '{}', NULL),
(13, 'mobile.task.upload_gps', 'mobile.task.upload_gps', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 07:35:30.935342', 8, '2021-09-15 07:35:30.935342', '', 4, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(14, 'psnl.tasks.employment_status_monitoring', 'psnl.tasks.employment_status_monitoring', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-14 07:33:23.818150', 7, '2021-09-14 07:33:23.819149', '', 5, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(15, 'psnl.tasks.resigned_scanner', 'psnl.tasks.resigned_scanner', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 07:35:29.478537', 8, '2021-09-15 07:35:29.478537', '', 6, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(16, 'psnl.tasks.document_expired_alert', 'psnl.tasks.document_expired_alert', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-14 07:33:23.214508', 6, '2021-09-14 07:33:23.214508', '', 7, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(17, 'visitor.tasks.exit_scanner', 'visitor.tasks.exit_scanner', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 16:10:15.859184', 4112, '2021-09-15 16:10:15.860184', '', NULL, 2, NULL, 0, NULL, NULL, '{}', NULL),
(18, 'meeting.tasks.meeting_monitor', 'meeting.tasks.meeting_monitor', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 07:35:29.563147', 7, '2021-09-15 07:35:29.563147', '', 8, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(19, 'meeting.tasks.process_calculation', 'meeting.tasks.process_calculation', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 16:10:15.933858', 4112, '2021-09-15 16:10:15.933858', '', NULL, 2, NULL, 0, NULL, NULL, '{}', NULL),
(20, 'bask.tasks.auto_sync_adServer_data', 'bask.tasks.auto_sync_adServer_data', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 16:10:15.792519', 4111, '2021-09-15 16:10:15.792519', '', NULL, 2, NULL, 0, NULL, NULL, '{}', NULL),
(21, 'psnl.tasks.employee_type_notification', 'psnl.tasks.employee_type_notification', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-15 07:35:29.315774', 8, '2021-09-15 07:35:29.315774', '', 8, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(22, 'att.tasks.exception_notification', 'att.tasks.exception_notification', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-14 07:33:23.075496', 6, '2021-09-14 07:33:23.075496', '', 8, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(23, 'iclock.tasks.data_clean', 'iclock.tasks.data_clean', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-14 07:33:24.105932', 6, '2021-09-14 07:33:24.105932', '', 4, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(24, 'iclock.tasks.zip_clean', 'iclock.tasks.zip_clean', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-09-14 07:33:23.951813', 6, '2021-09-14 07:33:23.951813', '', 4, NULL, NULL, 0, NULL, NULL, '{}', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `django_celery_beat_periodictasks`
--

CREATE TABLE `django_celery_beat_periodictasks` (
  `ident` smallint(6) NOT NULL,
  `last_update` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_celery_beat_periodictasks`
--

INSERT INTO `django_celery_beat_periodictasks` (`ident`, `last_update`) VALUES
(1, '2021-09-13 15:10:26.643217');

-- --------------------------------------------------------

--
-- Table structure for table `django_celery_beat_solarschedule`
--

CREATE TABLE `django_celery_beat_solarschedule` (
  `id` int(11) NOT NULL,
  `event` varchar(24) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(96, 'acc', 'acccombination'),
(95, 'acc', 'accgroups'),
(94, 'acc', 'accholiday'),
(97, 'acc', 'accprivilege'),
(98, 'acc', 'accterminal'),
(93, 'acc', 'acctimezone'),
(160, 'accounts', 'adminbiodata'),
(3, 'accounts', 'myuser'),
(21, 'accounts', 'usernotification'),
(161, 'accounts', 'userprofile'),
(112, 'admin', 'logentry'),
(142, 'att', 'attcalclog'),
(51, 'att', 'attcode'),
(143, 'att', 'attemployee'),
(52, 'att', 'attgroup'),
(53, 'att', 'attpolicy'),
(73, 'att', 'attreportsetting'),
(56, 'att', 'attrule'),
(61, 'att', 'attschedule'),
(158, 'att', 'attsettingpermission'),
(60, 'att', 'attshift'),
(172, 'att', 'att_setting_permission'),
(69, 'att', 'breaktime'),
(70, 'att', 'changeschedule'),
(54, 'att', 'departmentpolicy'),
(71, 'att', 'departmentschedule'),
(68, 'att', 'deptattrule'),
(55, 'att', 'grouppolicy'),
(72, 'att', 'groupschedule'),
(67, 'att', 'holiday'),
(64, 'att', 'leave'),
(58, 'att', 'manuallog'),
(66, 'att', 'overtime'),
(144, 'att', 'overtimepolicy'),
(50, 'att', 'paycode'),
(145, 'att', 'payloadattcode'),
(146, 'att', 'payloadbase'),
(147, 'att', 'payloadbreak'),
(148, 'att', 'payloadeffectpunch'),
(149, 'att', 'payloadexception'),
(150, 'att', 'payloadmulpunchset'),
(151, 'att', 'payloadovertime'),
(152, 'att', 'payloadparing'),
(153, 'att', 'payloadpaycode'),
(154, 'att', 'payloadpunch'),
(155, 'att', 'payloadtimecard'),
(57, 'att', 'reportparam'),
(159, 'att', 'reportpermission'),
(156, 'att', 'reporttemplate'),
(173, 'att', 'report_permission'),
(157, 'att', 'shiftdetail'),
(63, 'att', 'temporaryschedule'),
(62, 'att', 'tempschedule'),
(59, 'att', 'timeinterval'),
(65, 'att', 'training'),
(2, 'auth', 'group'),
(1, 'auth', 'permission'),
(114, 'authtoken', 'token'),
(127, 'base', 'abstractpermission'),
(5, 'base', 'adminlog'),
(6, 'base', 'apilog'),
(120, 'base', 'attparam'),
(121, 'base', 'attparamdepts'),
(19, 'base', 'autoattexporttask'),
(8, 'base', 'autoexporttask'),
(7, 'base', 'bookmark'),
(14, 'base', 'dbbackuplog'),
(122, 'base', 'dbmigrate'),
(23, 'base', 'emailtemplate'),
(24, 'base', 'eventalertsetting'),
(9, 'base', 'linenotifysetting'),
(22, 'base', 'securitypolicy'),
(123, 'base', 'sendemail'),
(4, 'base', 'sftpsetting'),
(18, 'base', 'syncarea'),
(15, 'base', 'syncdepartment'),
(17, 'base', 'syncemployee'),
(16, 'base', 'syncjob'),
(124, 'base', 'sysparam'),
(125, 'base', 'sysparamdept'),
(20, 'base', 'systemlog'),
(126, 'base', 'systemsetting'),
(128, 'base', 'systemsettingpermission'),
(170, 'base', 'system_setting_permission'),
(13, 'base', 'taskresultlog'),
(111, 'contenttypes', 'contenttype'),
(119, 'django_celery_beat', 'clockedschedule'),
(11, 'django_celery_beat', 'crontabschedule'),
(12, 'django_celery_beat', 'intervalschedule'),
(10, 'django_celery_beat', 'periodictask'),
(117, 'django_celery_beat', 'periodictasks'),
(118, 'django_celery_beat', 'solarschedule'),
(168, 'ep', 'epdashboardpermission'),
(169, 'ep', 'epreportpermission'),
(109, 'ep', 'epsetup'),
(110, 'ep', 'eptransaction'),
(177, 'ep', 'ep_dashboard_permission'),
(179, 'ep', 'ep_report_permission'),
(115, 'guardian', 'groupobjectpermission'),
(116, 'guardian', 'userobjectpermission'),
(31, 'iclock', 'biodata'),
(36, 'iclock', 'biophoto'),
(35, 'iclock', 'devicemoduleconfig'),
(134, 'iclock', 'devicesettingpermission'),
(171, 'iclock', 'device_setting_permission'),
(37, 'iclock', 'errorcommandlog'),
(32, 'iclock', 'privatemessage'),
(33, 'iclock', 'publicmessage'),
(129, 'iclock', 'shortmessage'),
(25, 'iclock', 'terminal'),
(29, 'iclock', 'terminalcommand'),
(30, 'iclock', 'terminalcommandlog'),
(130, 'iclock', 'terminalemployee'),
(27, 'iclock', 'terminallog'),
(131, 'iclock', 'terminalparameter'),
(28, 'iclock', 'terminaluploadlog'),
(34, 'iclock', 'terminalworkcode'),
(26, 'iclock', 'transaction'),
(132, 'iclock', 'transactionproofcmd'),
(133, 'iclock', 'visitorbiodata'),
(106, 'meeting', 'meetingentity'),
(107, 'meeting', 'meetingmanuallog'),
(166, 'meeting', 'meetingpayloadbase'),
(167, 'meeting', 'meetingreportpermission'),
(104, 'meeting', 'meetingroom'),
(105, 'meeting', 'meetingroomdevice'),
(108, 'meeting', 'meetingtransaction'),
(176, 'meeting', 'meeting_report_permission'),
(74, 'mobile', 'announcement'),
(77, 'mobile', 'appactionlog'),
(75, 'mobile', 'applist'),
(76, 'mobile', 'appnotification'),
(79, 'mobile', 'gpsfordepartment'),
(78, 'mobile', 'gpsforemployee'),
(80, 'mobile', 'gpslocation'),
(82, 'payroll', 'deductionformula'),
(87, 'payroll', 'emploan'),
(81, 'payroll', 'emppayrollprofile'),
(83, 'payroll', 'exceptionformula'),
(92, 'payroll', 'extradeduction'),
(91, 'payroll', 'extraincrease'),
(84, 'payroll', 'increasementformula'),
(85, 'payroll', 'leaveformula'),
(86, 'payroll', 'overtimeformula'),
(163, 'payroll', 'payrollpayload'),
(164, 'payroll', 'payrollpayloadpaycode'),
(165, 'payroll', 'payrollreportpermission'),
(174, 'payroll', 'payroll_report_permission'),
(88, 'payroll', 'reimbursement'),
(89, 'payroll', 'salaryadvance'),
(90, 'payroll', 'salarystructure'),
(38, 'personnel', 'area'),
(135, 'personnel', 'assignareaemployee'),
(39, 'personnel', 'certification'),
(40, 'personnel', 'department'),
(41, 'personnel', 'employee'),
(138, 'personnel', 'employeecalendar'),
(44, 'personnel', 'employeecertification'),
(46, 'personnel', 'employeecustomattribute'),
(139, 'personnel', 'employeeextrainfo'),
(45, 'personnel', 'employeeleavebalance'),
(136, 'personnel', 'employeeprofile'),
(137, 'personnel', 'employment'),
(42, 'personnel', 'position'),
(43, 'personnel', 'resign'),
(113, 'sessions', 'session'),
(162, 'staff', 'stafftoken'),
(101, 'visitor', 'reason'),
(100, 'visitor', 'reservation'),
(99, 'visitor', 'visitor'),
(103, 'visitor', 'visitorconfig'),
(102, 'visitor', 'visitorlog'),
(140, 'workflow', 'nodeinstance'),
(48, 'workflow', 'workflowengine'),
(141, 'workflow', 'workflowinstance'),
(49, 'workflow', 'workflownode'),
(47, 'workflow', 'workflowrole');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'personnel', '0001_initial', '2021-08-03 07:39:16.933276'),
(2, 'contenttypes', '0001_initial', '2021-08-03 07:39:17.431093'),
(3, 'contenttypes', '0002_remove_content_type_name', '2021-08-03 07:39:18.474038'),
(4, 'workflow', '0001_initial', '2021-08-03 07:39:39.853581'),
(5, 'iclock', '0001_initial', '2021-08-03 07:39:46.051723'),
(6, 'auth', '0001_initial', '2021-08-03 07:39:54.933373'),
(7, 'auth', '0002_alter_permission_name_max_length', '2021-08-03 07:39:56.904246'),
(8, 'auth', '0003_alter_user_email_max_length', '2021-08-03 07:39:56.977455'),
(9, 'auth', '0004_alter_user_username_opts', '2021-08-03 07:39:57.058257'),
(10, 'auth', '0005_alter_user_last_login_null', '2021-08-03 07:39:57.118437'),
(11, 'auth', '0006_require_contenttypes_0002', '2021-08-03 07:39:57.187232'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2021-08-03 07:39:57.391959'),
(13, 'auth', '0008_alter_user_username_max_length', '2021-08-03 07:39:57.531626'),
(14, 'base', '0001_initial', '2021-08-03 07:40:09.097710'),
(15, 'accounts', '0001_initial', '2021-08-03 07:40:15.193672'),
(16, 'base', '0002_auto_20200901_1642', '2021-08-03 07:40:24.247205'),
(17, 'att', '0001_initial', '2021-08-03 07:40:28.810736'),
(18, 'att', '0002_auto_20200901_1642', '2021-08-03 07:41:45.308664'),
(19, 'personnel', '0002_auto_20200901_1642', '2021-08-03 07:42:05.304739'),
(20, 'acc', '0001_initial', '2021-08-03 07:42:07.358368'),
(21, 'acc', '0002_auto_20200901_1642', '2021-08-03 07:42:14.250596'),
(22, 'acc', '0003_auto_20200901_1642', '2021-08-03 07:42:21.194268'),
(23, 'accounts', '0002_auto_20200901_1642', '2021-08-03 07:42:33.037395'),
(24, 'accounts', '0003_auto_20201021_1551', '2021-08-03 07:42:33.098416'),
(25, 'accounts', '0004_auto_20201229_0852', '2021-08-03 07:42:33.804341'),
(26, 'admin', '0001_initial', '2021-08-03 07:42:36.354647'),
(27, 'admin', '0002_logentry_remove_auto_add', '2021-08-03 07:42:36.522183'),
(28, 'att', '0003_auto_20200909_1810', '2021-08-03 07:42:37.043927'),
(29, 'att', '0004_auto_20201021_1551', '2021-08-03 07:42:37.634094'),
(30, 'att', '0005_auto_20201106_1538', '2021-08-03 07:42:38.519411'),
(31, 'att', '0006_auto_20201116_1052', '2021-08-03 07:42:38.571151'),
(32, 'att', '0007_auto_20201229_0852', '2021-08-03 07:42:45.318836'),
(33, 'authtoken', '0001_initial', '2021-08-03 07:42:46.580018'),
(34, 'authtoken', '0002_auto_20160226_1747', '2021-08-03 07:42:47.930953'),
(35, 'base', '0003_auto_20201229_0852', '2021-08-03 07:42:51.881517'),
(36, 'django_celery_beat', '0001_initial', '2021-08-03 07:42:54.159576'),
(37, 'django_celery_beat', '0002_auto_20161118_0346', '2021-08-03 07:42:55.284624'),
(38, 'django_celery_beat', '0003_auto_20161209_0049', '2021-08-03 07:42:55.568577'),
(39, 'django_celery_beat', '0004_auto_20170221_0000', '2021-08-03 07:42:55.610688'),
(40, 'django_celery_beat', '0005_add_solarschedule_events_choices', '2021-08-03 07:42:55.664706'),
(41, 'django_celery_beat', '0006_auto_20180322_0932', '2021-08-03 07:42:56.163475'),
(42, 'django_celery_beat', '0007_auto_20180521_0826', '2021-08-03 07:42:56.395794'),
(43, 'django_celery_beat', '0008_auto_20180914_1922', '2021-08-03 07:42:56.483979'),
(44, 'django_celery_beat', '0006_auto_20180210_1226', '2021-08-03 07:42:56.542154'),
(45, 'django_celery_beat', '0006_periodictask_priority', '2021-08-03 07:42:56.808928'),
(46, 'django_celery_beat', '0009_periodictask_headers', '2021-08-03 07:42:57.270436'),
(47, 'django_celery_beat', '0010_auto_20190429_0326', '2021-08-03 07:43:01.126541'),
(48, 'django_celery_beat', '0011_auto_20190508_0153', '2021-08-03 07:43:03.085023'),
(49, 'visitor', '0001_initial', '2021-08-03 07:43:03.387545'),
(50, 'visitor', '0002_reservation_visitor_visitorconfig_visitorlog', '2021-08-03 07:43:23.377718'),
(51, 'iclock', '0002_auto_20200901_1642', '2021-08-03 07:43:45.414776'),
(52, 'ep', '0001_initial', '2021-08-03 07:43:48.562159'),
(53, 'ep', '0002_auto_20201217_1608', '2021-08-03 07:43:49.436810'),
(54, 'ep', '0003_auto_20201229_0852', '2021-08-03 07:43:49.609725'),
(55, 'guardian', '0001_initial', '2021-08-03 07:43:56.306510'),
(56, 'iclock', '0003_auto_20201229_0852', '2021-08-03 07:43:57.738343'),
(57, 'meeting', '0001_initial', '2021-08-03 07:44:18.004784'),
(58, 'meeting', '0002_meetingroom_enable_room', '2021-08-03 07:44:18.374423'),
(59, 'mobile', '0001_initial', '2021-08-03 07:44:20.548097'),
(60, 'mobile', '0002_auto_20200901_1642', '2021-08-03 07:44:29.087145'),
(61, 'mobile', '0003_auto_20201229_0852', '2021-08-03 07:44:36.436052'),
(62, 'payroll', '0001_initial', '2021-08-03 07:44:44.445689'),
(63, 'payroll', '0002_auto_20200901_1642', '2021-08-03 07:45:05.797940'),
(64, 'payroll', '0003_auto_20200901_1642', '2021-08-03 07:45:24.818517'),
(65, 'personnel', '0003_auto_20201229_0852', '2021-08-03 07:45:32.495415'),
(66, 'sessions', '0001_initial', '2021-08-03 07:45:33.353681'),
(67, 'staff', '0001_initial', '2021-08-03 07:45:37.045757'),
(68, 'visitor', '0003_reservation_email', '2021-08-03 07:45:38.476314');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ep_epsetup`
--

CREATE TABLE `ep_epsetup` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `temp_alarm` tinyint(1) NOT NULL,
  `temp_warning` decimal(4,1) NOT NULL,
  `temp_warning_F` decimal(4,1) DEFAULT NULL,
  `temp_unit` smallint(6) NOT NULL,
  `mask_alarm` tinyint(1) NOT NULL,
  `is_default` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ep_epsetup`
--

INSERT INTO `ep_epsetup` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `temp_alarm`, `temp_warning`, `temp_warning_F`, `temp_unit`, `mask_alarm`, `is_default`) VALUES
(1, '2021-08-03 07:46:54.919982', NULL, '2021-08-03 07:46:54.919982', NULL, 0, 1, '37.3', '99.2', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ep_eptransaction`
--

CREATE TABLE `ep_eptransaction` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `area` varchar(30) NOT NULL,
  `check_datetime` datetime(6) DEFAULT NULL,
  `check_date` date NOT NULL,
  `check_time` time(6) NOT NULL,
  `temperature` decimal(4,1) NOT NULL,
  `is_mask` int(11) NOT NULL,
  `upload_time` datetime(6) NOT NULL,
  `source` smallint(6) NOT NULL,
  `terminal_sn` varchar(50) DEFAULT NULL,
  `emp_id` int(11) DEFAULT NULL,
  `terminal_id` int(11) DEFAULT NULL,
  `emp_code` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `guardian_groupobjectpermission`
--

CREATE TABLE `guardian_groupobjectpermission` (
  `id` int(11) NOT NULL,
  `object_pk` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `guardian_userobjectpermission`
--

CREATE TABLE `guardian_userobjectpermission` (
  `id` int(11) NOT NULL,
  `object_pk` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `iclock_biodata`
--

CREATE TABLE `iclock_biodata` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `bio_tmp` longtext NOT NULL,
  `bio_no` int(11) DEFAULT NULL,
  `bio_index` int(11) DEFAULT NULL,
  `bio_type` int(11) NOT NULL,
  `major_ver` varchar(30) NOT NULL,
  `minor_ver` varchar(30) DEFAULT NULL,
  `bio_format` int(11) DEFAULT NULL,
  `valid` int(11) NOT NULL,
  `duress` int(11) NOT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `sn` varchar(50) DEFAULT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `iclock_biodata`
--

INSERT INTO `iclock_biodata` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `bio_tmp`, `bio_no`, `bio_index`, `bio_type`, `major_ver`, `minor_ver`, `bio_format`, `valid`, `duress`, `update_time`, `sn`, `employee_id`) VALUES
(5, NULL, NULL, '2021-08-24 14:29:48.036647', NULL, 0, 'SidTUzIxAAADZGkECAUHCc7QAAAbZWkBAAAAg4kXW2QyAHwPkwCKAA1rEgBjAOoPpABkZHcPowCoAEkPOmSuAFIPWQByAOxriwC+AHgP8QDHZNUPEgDMABEPSWTWAE4PcQAcAFBrvADjACEP5wDsZEoPwwD1AFgPdWT5AEAPLgA+AM5rhAD/APgPlwAOZT8PpwAXAeEOdWQYATMPkADkASprdQBEATAP+gkYF26X45oHl2qHmBN+c8ebx/0+aozrWxQnb1c7vII5AF8HHpzmocMe7YhrJY+IdYYMiyVlpwHeipeEFH8FBTf+ahQO3XcGluGy/s8rVYAjegQcmH1Ce1+nlEj5iIMMVYTKklaAGtzfxL7RUg4Tci1nzP72LzqLnA8lWA/0SQbl+8sxEZsvC/v3az2yIDRlAy8csQgAhhj5IjwLAC0i+pFGUGMBVC+Ai8M6CQM4MgPAPVMHxVQ1GcN8wA4AE/3tQpv+wMA4wvzAAJUpDcBGCgCOi4lyGoQHAJZTE5hKEGTWXJbCwv0Ew/6n/sHCcMPAQgoDOWV9jXBxC8VlZWc8/0xbCwCbanSn/pPAwcHAwAAoCmN0FAADgRb9KCT+///+wEqREwNii9rA/v3/OsD8mcHA/////5MWA7mimsBqwIxDhH2lhA4AoKeTV5tzpsHCDgA8qyUwK5k5VwgANa+ffmRpAVqy6f3/7f78IMANAF237TguO6TBPhUA67dSwPwGdoCJwmrCwwBW3l93wRcA53uTPaXBjHnBwcOiXMFqAYa/esHCAIvBClQQADjC2gX//Zn//jP+wcCHBANWyVN5DwBOFtf+Q/3A/v9lN8IAdrLw/fvANgzFbdo4wohbagcAg9pTpMB8CQBM3ZVwfaYKAHHfVsJMVsOkDQC535yEA8DAp8KRBgDB4tv/WmEBv+cnwVvGACeXR8EKAIT7G/f4pDRXCQCJ+zj6O6T+wAMALf+DwQp0jwA6xMH/BMFtbBGXAxzARKAIE/MKJP7CwP8HwAV0ThBDe8AG1VQTXln/BhCqG+Fbw2MRehwwwMCwBxMQHDfBacIS1eMexsBab8XDxwfAxxYHEJQiKWoFBhPrJTB3wBUQGiikEG7CxMnGwQfBw6XBwn0EEHiDMI9nEXNHOsJShwAIJwAAAAtFUg==', 6, 0, 1, '10', '0', 0, 1, 0, '2021-08-24 14:29:48.036647', 'BOCK191760589', 45),
(6, NULL, NULL, '2021-08-24 14:29:48.151140', NULL, 0, 'Sv1TUzIxAAADvr4ECAUHCc7QAAAbv2kBAAAAg2Mcbb4bAAwPYgDqAIuxtwAxAI0P+AA+vn8PcABBAEAPK75FAP8P3gCOABKwygBNAJAOjwBUvoUPLwBqALkPYr5xAAAOcwC1AIKwoABzAIcPjgCLvv0PMwCJAKoP5L6KAJQPlABQAIaxuQCjAIsPsgCvvnUPEQCtACoPbb6/APoPYgAMAG2xogDXAIMPQAD1vm8PzAAbAUkPrL4zAXkPuACTAXaxLQBhAVEPDIa1NN6THQbNfq8OGUMOfEMLdYL0//VEoP66emYDsIK5OJd+7YELhG5/7j+XBVcKqQujCB07Qwzu+L5+RIHhuiN9gYED/K6ESbt+CCv9BY6j/CU8EHbO9HOBngmoOZ4HygFiEcv+hbTi+acFYX2jCfFPcoF792d3LIxaN2Z29XTu/f4CXanO+pOL8u9+AsTJWxVDG6MLK+09u7IPwv3b634LDFki2y/fAD4RACOEAAJMINsExYoCvfzADABkBNXC/EFl/sE5CABICBPWZQ0AXQ4MBEfDQVRyAwC6EcrBDL48Gv3/KXAEwCl8BwB0GwxKBAwDiCAAMP/CwZTAB743KANEBgDtNAXvwBAAMCwMr0LD6sD/PwMAFvgDwa4BLkQGXcL9TMOJEwAbSQbAjFdX+/9KBQANUMxtEb4PXv1CXUb7wMPrAgAMZwDBzAAw1Pxk/v9SBMUrbslzBwBdcH2oage+dnEDUggAYHUM+/5XEABPhDhPUEBSwP9xBgCCiXd8agUAL4pwB1EMvk6LAME+PjvAZ0EUAAiR6f6G/8OAVf9DVAoAVZSF0WZtDwC0okqDZX91wGYKAHNsen1+asELAHusxUY1fkcKAHOwcAX/e9oMAHC69C4FN/zsCABqv3RpocEPvnPA/TzA/gT/w/QVAAnI7cCPwPz/VP///lgKxV7J1cHAasFoDsWf0DiNhcJYdgfFp9uy/sDAQw4AWtqAf4qDUlsVADHzlH5u/sGMwcOuwMJ+fQwAgfV3TGdofAgAifb9O4H/D76C+m3AeMGxVxau8geacMHAB8CKyV3AhRQQ78qaeHzBiP/EwMKcwfx9DhDJGoyBB8N/f8ByFBDrH1JkwMKSwIDAwE/WEOiUlv+FxIbBB8DBfn/ABxCqMbJ5la8R7zOQ/4G8kIPnDhDnO5fABv+LenDCcw0Q2vuXwX/+xJbCiwrV2EQtwMCkwpIJ1ddTLv6elwMQs5B6wLkRz1qXwsNkBRNwZZbFl1JCxQtAvwEAC0VSAA==', 5, 0, 1, '10', '0', 0, 1, 0, '2021-08-24 14:29:48.151140', 'BOCK191760589', 46),
(7, NULL, NULL, '2021-08-04 07:56:19.968175', NULL, 0, 'So9TUzIxAAADzM4ECAUHCc7QAAAbzWkBAAAAg3EbS8whAOQPwAD2AILDZgA2AF0PWgA1zP4P2gA6AM8Orsw/AHoPJQClANDDtABqAAMPKwBvzI8PgQCHACUPH8yNAFAPWABRANLDJACeANIPRAC/zNIPnwC9ACYP1czHAHcP5wAcAIvD3QDyAF0OBAD2zEkP4wD6AOsO28z8ADoOUwA7ANLDiQADAcwPCgAEzUEO3gAfAfIOtswgAccPzwDkAUbDt4rzE6vnrAoKt3+EvnonYu7nmkh/gAOmAYszk6iynHzx+kJ7M4fsz84HNotHhuoGpEp2jpsPFhMmDYwTXIH6fzeDY/MozdICXYWrAbYDsTxu9U8GIhBibkjLLPJGH18xWBJK4z9cRDNwJ7weXsZEEjXv9NMN974+PQ8U36T/cgWIz5bzO/3PBmqHI8fk+ikWxfQw+wUxuIeaibqS8BD+y7yDSX05BuU3As5nIfkMAE/Fa4oNwWpZDQBcxWfCtMNYaAQAa8RwkMoBhQF6k8HMADTKYYXC/20PxbwFT8HCwv/Ce1FwBsweFFdiFAAeIIqlh//D/sTAB2TClxQA5iCXkASLhwzDb/9vBgCBJFkMbhgA5iuJmYTCDcLCZ8H+c5fBEsyaNneSwcEEakmfCQCjOANeOlcJzGU5YIRbwAUKA2Y/fZHCwsCwGQM7P5rDxP79AMDBDMPDeML/wQXAwwzBSg4A5k1Vd8eVxcHBbQcA52RQm5oHAM5kg0yWF8zqaJOIwsBewl+VRRoBBGiaB/+Lu5PCwUp2UpoJA3RrAP/+O1bfAQy1m2qEiZd7BFbCif4DABiOVwcDA9KRTMAIAFZdUMIzwcBSFwETW57DuYDCwsOIe7ZEAMwloVD/GAHWp50NZ4zCwsPBVsBeDEcOAQ+2ngXAgA7CksT/EABEuM8y/ir8MC9HyACdddb8/f3+/TtGScABo7ze/vs5//4M/v5gCQCABUxVisEGAJzBUARkFM0TxKJqwnkBwcAOw/9/wEvBygDQCoKuxFE9wTvCDMzm1JfGw8MBifyIOhkBFdepvcJ/CY7BhWn9/4gPAy/YjMbEm8E6RP0zwAQA6twghxQCyO6pwv/BxAWwkIZNwAoA2vGhozb7FwET854/BobGD8LCwsL//gT/w4oFAMD6THDGAOQwJf8FAOP++MPCMgUQ3AA9lc0Q1s1BbSQLEQTCpGQJxp/BEBD/1auLC8nFwP/B/gT9ScoRzCRD/i/DENHoQf8oAxDf4Tr9yhG0JUzA/jr/UY4BC0MBAADORVHM', 7, 0, 1, '10', '0', 0, 1, 0, '2021-08-04 07:56:19.968175', 'BOCK191760589', 47),
(8, NULL, NULL, '2021-08-04 15:25:17.227411', NULL, 0, 'TE9TUzIxAAAFDBMECAUHCc7QAAAdDWkBAAAAhDEvdAwZAHYPmADpAIQD0ABEAB0PBABUDCIPSwBTAKUPhQxmAGEPzgBEADcDegCFAEgOUACDDCwOVgCYAIQPiAybAC8OIQBZAE8CbgCoADQP1ACvDE0OlwCqAHUO5AyrAD8PQABuAEcDKAC3AEgO3wC9DMgOMwC4AIcPnQy4ALcOtgAGAEoClwDFALoOkwDNDDYPDgDNAIoPogzMAFwOugAUAEoClgDTAKIOAwDhDFIOsQDpAAoPMAztAEYPpQA0AHUDWQD+ALQOhQAHDS0PhwAIAVAOowwUAeAPcgDcAYsCOgAdAfMO5wAjDdgPUwAqAUQPKgwtAf0PlwDpAXMDgQAyAYEPFAA2DWgPigA/ASoPqgxDAekPfACUAXIDH/djG0cXUw8abhJnyf2n7zKfRAWW8f+mMwKGG14vZxhKNVc1u/cCHc4GOR9dG8fooA7U55J9pQOfDCv3fIEhBvXrXAFoC4CD5vQ+BN/tWIgYBUkHDfi8gRT38w+v8aPyZAGo8yADPAu1gOALsIxgfA1+xP/kAcR2Ef+JCPFeoACc+cOYjAcFGBxh9/nf9iYGCYrTCfMJlLwNDbmlIAC8+Vz+nejRSGTvoIrYBp7lGWBsfoSPaB5OlhsQPKDH3AMdRYruKadySHYA6p07UQs7tdcq+G8yTWJxHPsYA18N6fkBH2R3vNCY64eslZMr9XuJFCRhDYJ9oIqE+uCbJZT1Dmj3j42yiZ/3OXAoemx2N3Qe/YqBIIrX9OYAECikgg1tJTAAArQkkAnFiA2PdsGFBwCQzQY9RwIASQl0ws0AaBR2hMFaDgBRLIaAwX7CasESxR4y6P5UMVf+wPjAAQzVRiBXFAAuR5nMwHvDdJTABv95GAHmTaCDagSQx8xucBEAT08sOPs/Ov/A//7AzQBCXmWAwMDCCMXEVy5HwP//BwCPV2XNhMIRAHxprJ3BzMDBw/7CwQbCwskbAOtqp3BVwsbyxWdxd2LABAYFw4UwwP/9wMYAlYlCxQUAh4j4wJMKAZaIJyr/ywB/hlHDxGnDzwz+x4IHAIOVQ5c7BAVan0PBwAkAtawyiMPJx8QPACStPzI5/v4+QQPFDatDwAUAE65JOloPDD60Q3jAwWwEBfa0N0IEAQYFOsXyCwAyu0BUhFIADBm8TML9/8wALbBIW/9FGABzvsafw8LEyMPDBsL6yf7DwMLFyQHCxQgBuMZMSw/FqszAwsHDwcPFDMfHnsEUANvJQ47++vP/Qi5ZagbFVM4xw/+mBwBaDjdwqwQAxelQ/jr+AAw08kb///znAKT+avv5/is1Ovz6Kvz9Mf8+/jhAJUQBVvu0PGg7PSHy/Pz/McD+if37MP78//z+/zr6xPHBwMD//v86/vrz/P79/v3+OMD788HA/cD/wTv++MwgEAkH08M4wsTywcFT/zL/OEH7Jv7+wMBGwcAA9bg1NQgA8PSJ/jlCCBBBCCnHBYaBDxHrF1r/CtXjKmzBMFTAMRCFGwxWisN5gmJ4B27HzcLCncRxwbPDxfPDwP/+/vzGEEoqh8IoEAkrE8H6zcCFU0c1/zoq+vAy/8E1wv37OxQc4gBT//8y/kr6dwUQVysD/gcDFf8uF/8IEHzyfUdxCxDRN2T/8MHFzf8GENtBYPbBARyqRHFMBxC9T39FMwUQeVV0BWFXTgELQwEAAM5FVww=', 6, 0, 1, '10', '0', 0, 1, 0, '2021-08-04 15:25:17.227411', 'BOCK191760589', 55),
(9, NULL, NULL, '2021-08-24 14:29:48.092184', NULL, 0, 'Tb9TUzIxAAAE/AMECAUHCc7QAAAc/WkBAAAAhCEqY/wfAO0PfgD1APHznwBTAP4PfwBg/H8PTQBnACgPhPxoAPcPzgCxAIXzYgB2AGsPrQCB/PIPHwCXAKMPTvyeAGUPHwBkAOPzlwClAPkPqgCj/O4PoADMAM4PgfzWAP0PtQAbAB/zhgDlAAkPbgDt/C0PwgD0AO4Pkfz7AGcOqADFAUnz2QABASgP5QAG/UwOwwACAfYPk/wEAWcOtwDNAUTzfgAJAecNnAAJ/ToONwASAYYOaPwSAdIOZQDeARDywQAbAUEPdQAZ/VcPnQAiAakPMfwnAcQOtADxAVDzVwBAARAPuQBB/YkPogBJAakPqvxKAdEPoQCYAeLzsPu38+MD7AurBMoCmoDqCeIIGQObgIOLrYdz/pMF+4zqBXL5WAefe2KLSXitg8N0RXTHBW79XIPnA/+HJ3oCdpqDnYOee3b/Bg6+8hL9TgEbjpL6lfMgE64cvPR197KaAPCVDwQTMQyhpp8BMeyY4mkClfhs7u3+UQMlHcFijAytFcDp2fXt/xfpSfNfiz8XvPfICEnx0QMNHZWC6Q/RCHABBRWVgkSDbdVQacL5gYEQ+z71DcM9mZ3tjUcVJVcsveztAcASIeig7fkaCRn0G8r4gIFqe9q3IAJ9eojrdopC/stP+uJ/ehKnHJ+cifXnNWcJ7nl+mH1x6jNjHpYgATYBJLYAAuAllAfFdAGMwkPCCACFwG3EP/9lBgCoCLJnxfgBWwhkPw3FshSBw//Cwf6Dhg4ESBd3YsL/ezrBxD0HAMcad8CnBwQzIHfAWMEQxc4qf8Nq/8F+W58IBIYzcHPAXRLF0TJ8eVlpwMD+BMCV9wHSPYBvUr0MBCRCelrBYsEE/gH830yAawwAX1V+d/5nwFEFACVVhz5QEADhX4OcZ8cDwf/BwWQFxbZmfIAEAL5lADr/Ffy3Z33AbcQEUV89wcIGAElqrljF+gHKdINvwNEA7ImNb3DAwsGvwF6nBwBgd2tkBAcEZ336RDAEAFx9foIXAOqIjHyxcMaIZHDABABxTHeT6wHvlJDBcE53cDxlwWcTAK5cfYM9hcBZwf7BAcDA+gGynAP+/5AHBLqeacFrwAnFSaeewf/C/8Fo3wDzWJ2TwIvCwFX/xZhdwYwLAHNg7UUD/jb/FQCSY3HFfVjBbMCbwQfBxvsBmqf3wCI6AwRZqP39BADGaAwx5wHAuIzCiLB+xD5+xcHDw8AGw8VrBADCuRBLzACUOPYu/UkMAEvFcGqBwMKcHAAqyZM9cML/mYNntMKJfsAIAKTMCTtBS/YBidP3/TE6RAj8iNj9//s3OEPE8QGB2WfDwGXBwznFoQ4AUtyZb30/wMOLHQD3GpdhP3TDcYnAiwbCxz6ejQYAut/bU8T7AYrkAPz8OScA/KzrJC0WAC/smDxul4jBg40ApQH8nfeMyJ4GxcT82P9REgCe+YP+/wH9+vj7/v44/vgA/vz9BwCnOavDP8adAwCX/qf+AOzYAyfAwAnVHwCskcb+lAcQYARNAfr+HwwQq8FA/z36wPv+/Pw+/QHsxgUw/1MK1cICyMH///v/+/EDFGoJXvwDELjJPfv4Eb8fQzAG1cQbwf78/f8FEGkgVwIpChCyIEk5/voCLf8EENU+ksD5+BEOQyJcBNWrSp7B+1JCAAuGAQT8CkVSAA==', 4, 0, 1, '10', '0', 0, 1, 0, '2021-08-24 14:29:48.092184', 'BOCK191760589', 61),
(10, NULL, NULL, '2021-08-26 10:55:17.386719', NULL, 0, 'TN1TUzIxAAAFnpwECAUHCc7QAAAdn2kBAAAAhUM/j54PAOoPHgDgAG+TJQAqAGMN0AA1nusNGwA4AKMNOZ5DAOIPYQCBAO2RdwBPAO0PcABjnn4PhQBoADwPyZ58AA8PTwBFAOaQQgCOAFgOXwCLnncPeQCYADYPTp6gAN8ONQBmANyQrgCoAH0PTACpnmYPXQCwAJgPoJ61AAYPDgBwAFKRLADDAFAOhQDGnt4OWQDGACQPLJ7MANAOuAAmACGRLQDuAFIPWQD/nk0O4AD9AAEOrZ4BATkOdgDGAdORuAAHAUEOFwANn7MNKwAOAYIOXp4QAUQP4QDXAdWT1AATAb4NcQAen7wO2AAfAQINmp4hAcMOuADkAVuQKwAnAcUOIQAtn9UOTAArAfkPK54sAVkNwgDoAVCTnwAuAcsNkAAzn8IPeQA2Ae8OEp45AcwOaQD8AT6QPwA6AVENewA6n2MMHwBCAR8NL55FAdUNqgCAAe+SigBMAQAO7gBUn3UMvwBSAaMMc55UAa8NzQCeAV2QJQBfAe8PNgfiYdrzNAp1gJgFvWSMeHX8vIewgIwWwX/xBOH9h4Er46P9rf4eCX7xLJi89x8PInBGiF6WMA+2h4d815DOC+aZ/Y3mBD8PAOtYeYGCMvhHhWePsI+CffKZlIkYlLyGpf6BgjeIZOarCIIavXfgY/dvbH7Bgo6BnIgAPTOSPglKid+DhR0wcf54IZHUEqCcaIYlBlIGRYOkbO+Asuye5QfZd5LvhPIHSBeDDB+3IBX99REKGe9cZ3t8GpSijm6d1JeIhUGSBPdw8ex7fIZ28P70Vwgv7oeBLBcJCIwhfZHB8/j77GJIfTxgcQvV9JH4xPiwlMBmzKJFCGCe4fB8gh36SQysBlCFaHil7Rr4FZZAl3CG0fh19RSafJbg45kTYYgAiTzo0PB9L5p8HffIZJgKPRDNebOMCIvM+Z1+6Q2Y/ZDnrQdME81p8f/t/ZiGjYmthoAj9Mwk23oYyKOkhLQDMBDZBbF+BLKH6peEwfTW+AdyYOJYH00X1X6+C7tld1sgRQECQR7/kAF/AGlrwapUW5YBjQJtfv++CwX/BXCJc2UExboC43cMAGMJZ7Vrx2BhBABGDmlFDwUYEGvBwMFXAVJAiwHGEX3AeEbB+l7DZlVbAwDoFGxgCwDOHIBqB8DH4ggAziWAwAf/lV8UAOcygFFFd/rmwGRsAwAZ+V7FlAHkP4lqjATADp5cR2fCwMEFwfpeVgoA6U2QBv6FXMP/DQByUqzBffn+wHEPAO+YloZew4B0wsAJxYlmav87VQQAsaKAeJQBgWpraYWvDwVpbpfAg8DDsMHF4gIAz3sMwMsA6+WNYsRFwoMEFQVZfYyUjMHDO2zEYf7/wsH+BMXPhI1tBwCejv06/jKPAfuciT/BTP/GXcBkwQUAM2NXxcUEALOpBv6BDwU1qn3BmcGEBHH7kAGFrWfBwavC+uA8DQDrrZYEwJUXw4QGAFixpXTHmQGpsQD9VDoIBcO1XGpwDABktH8DhXDCBgCocgY9YA8A98CcfkHCwGOXCQBWylq7cfudASbRV/8TxePnCWaNxIDBwQdkxI4B7uKefIQAwccSdAwAlOT0Pvz4Y8H+//09BMW84ID/+wgAlurF+/hj/v3+BQAnNVdonQHq8Ez+BsWH9MnAkwQALfKVPAKejfRTkJcFxZj718PB/QsAdzrT+2H/G/3A+QTVqgGpHRUQ2Q/DBarFXMPDxMPAwgZqx17FBBAnEE8A+gaOVhRGwgcQmRRF04oKELMYwAHDzVfEwnYGENjmScSwBRC7JVcfwBDnsk3Awf4FEIwuRlxsBRBPLjoFw/iYEXc5NMPBBccBjjs9V/n+BNWySPP/+QQQulKs/vidEShUd8BShwAO3QAAAAtFUg==', 6, 0, 1, '10', '0', 0, 1, 0, '2021-08-26 10:55:17.386719', 'BOCK191760589', 49),
(11, NULL, NULL, '2021-08-31 16:03:29.695149', NULL, 0, 'SsFTUzIxAAADgoIECAUHCc7QAAAbg2kBAAAAg68a0oIjAIkOxADiAH6MsgApAAAObQBDgngPdwBOADIPpIJOAAQP3wCRAI2NxwBiAIQPDQBvghEP5gB4AFUPj4J8APoPzgBUAIiNvACeABYPfQCjgoEPcQDAAKYP/ILAACgPsQAHAGiN5wDCAKAPVADFgl8PrQDSAJoPx4LjAJIOdQAjAN6N9ADoAKkPqgAQg+MOegAaAT8LpoInAagMaQyriFyT9PSBfGYGuITWCHt4SXTZei/+iHZ+gbv9QYxTgUmEXA9SgC4B8XfqeZeBKI+CgJeEgQJTBaoFNwWa+aD8XHVdD9b9GZlSD7uu8G3p948VJYZbiisH2YpjgsQZYAySDN7tJHoReEIQNgAe9G/87nY4z7IAiTdfKdB2Y36Cg+r/Z4KJiF4YtOtmB2o+H5mTV0cdZrOiyqiZi2eKAyA4xAIrm7MIAM4gjFHCw0MHAMAjfV0GAwNmMBrADAB2/ffCfTPAKsEHAGE+fgZ1CgCsQAA6/v18wP9KBACkhndYjQFqRPTAPJIr/M4LAKtPA8A4wf26wQwA21GPBMPD9HvABAAvUrXCwosBwl+Gb8AExMOFAcpjCf7+OlIKgrtkg4HBw6UKA0Zqg8B+w3PXAFHt7ML+Mv7AOv5MwcEJALNwgEF+w4gBt3ED/f8F/vxCPw0AkHr3Ov78fEFM/wUA6r4cw7kLALV9Bv73N/yEAYh/dIfBzQCgC3zCwsFuCcWilviSWcALAKxQBvx9JljACgC0WYbAQcDBwVEEAASeEHz+BQCpoX0BdweCvaEXOBMAiKvkQsE4/jv+/pH/X4YBbMBiRxTFTMJgVUQnwP7+O//8fVwKAK7CdwDD/d83BABwxF6BAwKDxSf/BADpACtXgQGPyGDBB8WpzOWVPQcAqdWlw6NBEADz5anABMF6RsKLwsBFBsW36qL+/2wHALY3KWhCwQQAkPZW6QcDMfYwwsDBPdYAU3rldE/A/fw5/vx9/8JKExBSxeeHQ/xA+vz+NwVVEJJUB+l7w/8F/v97/P7A/8H+BMARklsW6XjC/wT++Hv8/MHAwf4EBhP8HQn9/z8S1ewcJlSAy8bEwgHAf0IJEG8lACMF/8eEEWkqDMH+8wQTKysiZAMQhPkT/IoR1zqiSv7mCAMl7EOXalJCxQtAgwEAC0VSAA==', 6, 0, 1, '10', '0', 0, 1, 0, '2021-08-31 16:03:29.695149', 'BOCK191760589', 56),
(12, NULL, NULL, '2021-09-03 09:43:51.768607', NULL, 0, 'SkFTUzIxAAADAgEECAUHCc7QAAAbA2kBAAAAgi8TNwIaANkPTgDjAOYNWgA1AFoP6QBDAlMPbwBCAKUPsgJDAIYPWQCBAOUNHwBeANIPgABjAlMPNABiABMPVQKHANcPMgBWANMNhwC3AEoP8wC6As0PtgDHAL4OjwLIAEEOrwAOACQMMQDZAEoPdwDlAiwOuffyigaAwo8sD84AbXQMdT78g4Bmffp6WH66CL9/fyuDL76jYo6Yik4Atf5HgLGAqHwKbbKCYIQyBGOFHgpah4oB7QSn+nP8aQmOJETT/4Ry/o/3tVZNUoc/9flCHfvLR6yU/97p/oA+fwh1EAsatO/sHSEEIioBAf0dtcMAHQJbfsEHACvFXoRlCQA1AF7DgFcAAkYAWsANAJEAZ8H+/8Nawf+4CQM8AF7CXcFmwgBgA2yUgxgAzteMXG2PfnT+dmvOAMkYkcB3wobD3wDYLpZ3cYiAwQTAwsLBwf/B/8AGDgNaNlpoi8BciBAD3TiafsGAljrEdg4BWT/e/v47/jM8CgBzP+3+O/39SDkQAGtBZwaBw1rCwEbCDwBoQo/AwpLBfFvCyQBeQeX+My7ASc8AbURjd3RfBQDZYlDDZwsAQWNXslhnBgFGZFBlGcXlZJx2wnmWwcIFdsPDwP/DOg4AIm6Uw1OZxcHBiN0A5Hihh8LAnsJCgGVUwRgA64miB//HXZ7CwMGEcQXASRoB55KkgH0FxMDDfcJuZVkYxeejq4KIoMN4i7ZWGwLmr6vCfMEGwsDBiMJ4wcH/BWwIAoS8T8LCXKzCFALmvqvBwcFBxKTAwIxmRQkAd8KAy8fCb8EGAHbKI/w2BwCMzkZGcgUCsc8rU8AXxd/TqcHCwJHFxFjCwcLD/sFvwRfF48uvwMF3w8PFBMSHgVNuBgCj1YaLwAcBqeA9wovTANznsXSIxcTFBJLCwsDAgQUAsCw3x3MCALbpMMPVANDtscHB/8TDDMbGZcF7FQDc73V0gcTEx/6dZ8BAUkECCkMBAAALgFI=', 8, 0, 1, '10', '0', 0, 1, 0, '2021-09-03 09:43:51.768607', 'BOCK191760589', 48),
(13, NULL, NULL, '2021-09-10 14:21:28.594789', NULL, 0, 'SqlTUzIxAAAD6usECAUHCc7QAAAb62kBAAAAgxcecOoXAAsPjADSAIjlKQAiAIoPUwAo6owPXQA7AE8PvupUAI0PUQCSAIvlVwBrAIMPlgCI6n0PNgCTALIPV+qSAAYPoABTAI3laQCbAIUPngCp6gAPzQDQANAPXOrnAAIOlQAoAInlRwDwAG0PJwDx6pcPgwAPAUYPcuoUAXMPJgDjAVjlfwApAW4PBgA/6ygNYAA/AZcPR+pBAVAPygCOAajh1wBQAZsLqQBV60MN1QBeAUAMemiPgs6DJQK8glzpCgMfB/ODZAaJbBYCSgTOg/oIlOhGA5sHMQUPADjntP1CCEJ+hXoiEXsECnAC/Od7N2SIgrEGcwoCA2hlWIWNgpULmH02FDeEloLbj9aL8n2ykYd6SgqSGnxgBG8z/msXU4Js5T5vcRFFFxf6Ahs0Bl4jRg468zThvP7Z73odQIB6eYemXROtB9PlMunP9kcQ5BNAhALAdfMpGIl3KPPUHg7Uweyl3m9eTJ5yPyA9AQKlIDHiAXsBEP9XkgUDuAMA/UoEAPoJACr8BQCvDBqrEQPHERzEUVnAO//BFMNVCAA5EMM2wrUJAJAYF2SnAwOfGxPBDAAs5wlAFXr/cQYAEuEXxxVhEwARLBoGacPUwFLA/1UHxZou/MHAwlESANc7EyhZwT5zWFnBACGhBz0EACBRyWgN6lRYCcD/VoD/whf+EwAIWQM6wf0p/MFV/8H+BWjC7QEBXBrFXQQUA+t19/83wME7TPwqwViREwAIuP3DKkZUS2RtBsVPiZfDOg0AAY01NkMrTf4LAFiPxT9XvAYAUJN3wQRAB+oylHdPCwCpmwUq/kRk/wgAoJ5+m8FZDQBfpjg2/SpZwjoHAFdvfcEqYwkAXq0AOj5X/wEJyvBVQDrA/b1FwEUEANALEDP4AQzU8Er+kUDDrGEFAM/UFzpdFuoJ4uv+V/+KwEOtw8EqDACRL5DBKsX/fMJlDcWZ7vzAPkrBwf85DwOg7/f9PcDBO/3Crv4VAAjv6TpEQ6vB/1XASwbFQuybwMHAwQcAgfRuK8F1GAAF/iE+LKvBP0M4hQvVgA1q/sKdi8IJ1W0QkJfChAkQddAA/BHA/v82CRCpGXcoiYERECkjIUv+2cD8V/9JCNV6Jp3CknMWEAvt3j0q/v4xwP3C7sA9FAUQJipXbsIQgcAH/P/+Xw3VRz82LyP9OP8W1Qk9JSlL//3/QIVKNe4RW0FXiATVQEG9iAMQYENPBAMTrEVTwgMQgI1iyu4RhkgXIgfVbVE8/fn6IwwQB2CDEvzCwsPGwwCDUagBC0MBAADORVHq', 5, 0, 1, '10', '0', 0, 1, 0, '2021-09-10 14:21:28.594789', 'BOCK191760589', 55),
(14, NULL, NULL, '2021-09-10 14:43:38.076582', NULL, 0, 'SrlTUzIxAAAD+voECAUHCc7QAAAb+2kBAAAAgyciafpUAGwP0QC3AIz1UABzAGYOTgB1+v4PlgCCALEP1vqDAIwPxABWABL3TACVAGIOqgCv+u4P4QCtAEoPoPqzAHAOhwBxAGv1ygC5AIQPVwC5+vIOVgDPAJ0P0PrSAIUPOwAkAFX10gDoAIEPrgDx+lMPPQAFAREP1foNAXMPVQDdAUT0MQAhAU4P2gAh+1MPQAApAYwP4PovASMPUAD3AUv0WAA9AUMOrgA++z8OJQBNAYoPM/pSAckPPACQAcn0VwBbAUEOvgBd+zAPcgo3bPL7Kv5DgWsfYgU//hyRpIwjlAebaHQcnkIFrfxVfu//UnxDhaqO5v3/dlj1oIqi/iqOmA6ReEMOgX2NC9/uL42kehX76fb0A7WMIY99hR4GVwRV8ANrPQWxAw/6FfprhTsFwf37EbgG2/6GD6OBD4z9cmuByvVCUQrygvmcA9Z0sfyABQWGLAQ6CRKDCP1O+xwHErEXp96jXv7MAQED4fz4BYH+xP3R+579gYtCfO//vANMfweKP/lEfsGLyXvDABn///XW8fPwuldKBwMgPQECP97HAPqEQHTACQCrUvI6/C8/BQBmlnSK/wFnWWvBZ8kA2Zadw27CwcOxEAM0bJBxwZnBBEnCOAcAj3H9//cOAzd1jG6RwG25BAMvdBNLCgCHs3HCO8DBwVUGAEp4ADo/DwCSf3oHh8GfbIMJAJqCxktXBQIA2YQTwMoAkXx1wcJqwcChwUnrAbWMfXHCB/97nmUEAMeSD5EEA7GXYmQFAMhcD8OlCwBwqOn/Oyn8oAgAc63w/wUqVPwBa69iwGrVAJxKdsTAeMB3O8Nh+QGnsgPACcWDtZfDwYXBwQ/Fx7h5wHnCdMDBBlAF+s67D0r/D8VayBo1wf4wRT7JAFEqX8LAbcBdBQwDNdOGgJmSwcAAVS5ddwYAN+KSwMOaCQA85VZkBV8M+tHmg5V5iwTDwDgZAQ/pnoQ6woBsf8F7wsBt1wEMCJtqbIDDdwZsBfpr9leIwRXEC/lmwGnCg8V6TcDCOsAVEQ8Flp3ChT7DkYTBwJ3PENDwgcfDxcLDOp8Q6wYPoHfDwQfFwWrCwcPCwcPNENvgasfFw8KJyxD14JvAwsLExgbDwTjF/sMMEO/llsI/xsXExP/EVBIS6iOcwMCEw2zEfnkHECwlUMAFwPz+ETIlTFQE1R8lrVwFEGEpQAVZAOo8LUzBAxCHLUo7BBDbLTGSxhDnyCPABRBMNozAwwcFEFI2SVzBEFW7R0oEEFtBhm0H6mlBQHMDEKtBQzgCEQdHnsHCEOnVn8rNxZJShwAIuQAAAAtFUg==', 5, 0, 1, '10', '0', 0, 1, 0, '2021-09-10 14:43:38.076582', 'BOCK191760589', 53),
(15, NULL, NULL, '2021-09-10 14:43:38.136589', NULL, 0, 'SglTUzIxAAADSksECAUHCc7QAAAbS2kBAAAAg/cakEpNAA8PXAC3AGRFRABzAO0PZgCTSogPOwCTAJ0PhEqoAGoPqwBvAIxFcgCuAPAPYgC/SoAPJgDDABMPjUrKAFgPaAAXAN5FcwDWAFQPDgDfSp4PgADmAIsOpErrABkPiwA2AEJFWAAFAdQOowAKS84PzQAKAVAPc0oNAdEOrwDdAY1FfwAaAesMUgAeS3gMlwA3AbAOcEo6AfEP26tui+BtmH57EE97VIrh37r/Lf9aIvML9ScK8HuFjX2LFRmXOBGlC3YlTIndXLOayfVpK1MZfMu2+7eHFdtfBH1GtYvCkHLueXtSQx/8UoojDEYgVkbU/Qb43duffu2E5PQ1K6JxfAS6TMPrvAM9/AjnWUKq+It9PAcU6T60aBbi+E4a8B2aPDAfAe6NkowHzrWLhbKOXglLfXQyul/WAyA0xAHzUgQHAJcJiQWN/EcBPSDpNf/3//4cDAAvMOlA+P78dAwAyDqJ/qOQws4HAJdKDDg6DAPFSoN5dcDBrw8DmUuXxP3/w6yDi08BmFEQPRPF42LUw8DDOsLARcLCOsMOAGBw7Tk7NrVT/xMA529fWXPBicCLwhAAjHHoC///MUT/wAUHAxJwbYRvAwAUcSGLBQBcdmd4ywCjxpGgxGlrVMgAnNiNwsSddMAFwAtKppMe/1iQwAA13l2FBAA8l5JsFkodmdrAQ/46/jC0/kZM/wUAbaiVjqEKAIupA+L/w4qEBACErWRGCQM6sFfAwMFgOgYD7rmQxaQFAGa+gI6WBACrvxqHFQNgwNpz/v/AOf/9tzr+wMDBVM0AkoP7/Pz/wXHTAOaDn//AwGbCB6DBi8CFwU4GAEzLXYjBxPwGAGUQU8MeBQBu2FdowQBwkFJgFgDq4FL+VyXEwMXEfsCuwP1JAXzpTP8GxavqannCAwCC6on/Ekri/pM4wcIDx8a1wf4vwA8QIgePtDbDxMvHwwHCwYoKEMgJk/84wNWAw4kDEGINpcAHWm0QXkQEEL8dYRMEEJseBsP/BRPZHnTCcAgQCil+HsOSBRDNNLjA/IgFEJQ6dFzNEMx3e0p+BRC2j31eGEMAC0MBAMULRhg=', 6, 0, 1, '10', '0', 0, 1, 0, '2021-09-10 14:43:38.136589', 'BOCK191760589', 53),
(16, NULL, NULL, '2021-09-10 14:47:54.867784', NULL, 0, 'TVVTUzIxAAAEFhUECAUHCc7QAAAcF2kBAAAAgzsebBYUAHwPKADTAH4ZeQAqAHkP+gApFnYPGgBBALQPQhZRAG8PZQCiAHYZhQB+AHQP9QCCFugPpgCGAMYPRhaNAF8PFQBIAGAZ4QCNAIgPbACWFn8PYgCpAJsPdxarAF0PRgB0AOAZJwDIAEgP+gDlFkMPgQD1ANoPIRb/AMUPeADEASUZrAABAQ0P2QAKF1MP9gASAUIPdRYWAR4PywDzAYMZcgBEAaEOmQBBFxAOjwBVAcsPLRFyBIcHKgSTCwMVrP+HBm8Pb/xGH3cL/v/e+9oEzu8v/qMAqgbvAmsDF3GqBiL7YI0JkcYEtIcKkUZ/tW9ffUIDEX/bBzOVdg5/h4MXfX+eGQL6JQCZfwcDoRaeePfokYufhQKIWwkiZnuGJ/2aaAZgvQC2AqoUFWObhn9+OQRoBmcD/vD37aOLwI0PBPYPXwKHf0JrNeg3AqJ/3wJif2NtXJL2lJ6HqHJH434FCmwD/aaLz+jWOyBDAQJJItIcAXsKg8BwlcABFmUSgHMFAKkVB2UJAGQZd1QHWQcWJBp0/wkAdyKH1E3BiAUAO+99ch8Bcyt3wME6e8YYAa0tgFx2nGIBFjowccA6EMW/PpVywMLC/8CawIAHAchEhnZposFefRMAzE6Da6/AgGTBhAcAQ1K0dMXXEwDrWINdtsB018DBwmEKACJheen/h8BsDQCkZXDXjWaFxAUApGt01nYXAOlvibViWNRywJ1vwQ7F536fwYFkwcDCBMAOFoF8d2+JfM8AjGj8wML9P1vIAIWUcf95i8PAuAUEvIP9/VYJAGeFhIZmwwUAqonGwPvWCgA9jWmTsMBfHgGljoPCwq/BABYUkVdzDACEkWTXwMF4wksHxa2WFVM/BgCllL9xxRsBd6fxOP+G/10TAV6oZI8YxW+ucoyAeMLBwQSDxJVYDgBhrWIGwZeWwcHCwRYAtLBkgMXAd8GIwLLCxGAIAEO1U8KTw8TrFQEHtYlWBcHEkMCfwZbAGcQCu59X/8LBesRli8DUwMHCcB0BwcqNT/5xj8XCwQTHfmR1eAUAI8yKwnISASjMRsDC3wEXw4dgXYbExQPBwteCwW5XCgBX2ekIwcBvDwEDGIZO1sHAw8LIxwCVDhaS3v3//VsHXQMWOuNJw8H92wkEV+VDg4PDCcWW4Rb9wVZtCQBf6xKRY8ENAIH55YR61nHCBgCx/8xYxRURJgI9/wbVsAEZcsMOEHkG54t61nk8BBBAF/V+CAZ0GB54fGkFChRnGynDfHjCxhA/Ox39BxC9O8VCxekEEF9JHMGqBRR4TRbBXwMQpVMe1wYQk1QPwb3CBwZUVhD9BhBUWRfV/5JSQgALhgEEFgpFUgA=', 5, 0, 1, '10', '0', 0, 1, 0, '2021-09-10 14:47:54.867784', 'BOCK191760589', 58),
(17, NULL, NULL, '2021-09-10 14:47:54.905860', NULL, 0, 'SptTUzIxAAAD2NwECAUHCc7QAAAb2WkBAAAAgwUigNgfAH4PowDpAAjXiQAzAHsP/wBA2O0PqABTANMPE9hwANoP1wC2ACHXggCFAHMPjQCJ2N8PjgCOANkPXdiTAOoPJwBaAETXeAChAEkPLQCs2CgPVQC0ABUP0Ni6ADAPhAB6AD3XuwDAADUP/ADC2D8PlgDBAP8PpNjJADsPuwAJADrXWQDPADQOqgDY2L4OYgDmAHEOY9j0AL4OXgDDAcfWVwAZAcUPIAAa2VUPaAAdAREOi9gmAVwO1QDqAdHXfwA0AdwOYwA62dcPOQYWde5r7ksHjbL2vf44cyW/9hfPE49z4w4NR4b215W7/0Lz+NaW+6P3KVibLIFSsPYOmtYTxKjKD+I0JQ6uoCcdZdIjak95GS/D2M24wPrL9MPyKJ8hTH/pPQrJ/nz7St339J6BiP94/UbeM3BWDfL6CP1a2UcF1QFNBfAJB9/QAS0LfYKkdwq/JAxVjxoA1PiyLHyCiQwJ/F8AgtAMAe3yxfFIAYnRhIebg9sf8BFeys/4gYCyifuJilsm/Dd7gYCDCKnSQ30y/qMEit9CugIgMAECHdgZANg3AXTCCACZAX5bwFwNAKIOQ8ByoMCADAB/GkbCfVzAghAArBpD/2wZesKHjAYAQh4AJ8H9/w4Af+V9wqjCasKBCQBbLIUYfokEAKUwyTwF2IUxgHfBBsWMMNHB/0EQAITzd8O2w8H/w/+QQQUD7kdiegQAq5ATPc4B1Vqawv8GwMIbSMLC/5DCBP+P3AHXdyJUGsXncULA/3n/wcMEbsAnklzBeQMAu4R0HBUARobT/e8p/xhHwP//wErSAE9f3/8n/f8xBf/8i8H9R8AGAE+MfnnCFQCSjBM7/vwmwP7A/0b9Bf38JsFBDQBFjomLwSfBcyYZAF5L2vgkKSlAVDvAO//9mA4AkZIcMO7AOyb/wRcAKZsM/jgmOjsyQMBJyAB/Rwf5/jv+/zr/Pd0BI6JMfgXFdKGIkgcAKqNDoH8P2HilQ2j//pNZANjqsynAGAAUt6i3wITEwcTDBKBaGE4NAIaqK+79/Cb/wf9UDgASvSr3Qf4wRgkAF78yGD8uDwC7wvX/Rev+/kD/BBC4V+hcCQCBwz3/OP9R0AGIwzr/Kp4LA0/FNy7B/jY6CQPhxD3AwWT+OB8C28upc2R0iAfCwlDCwsDCW8IEWw/Yps03//3A+yv80QG70DdEMTsDA47TOsMbAGQ0z8YZ/v3A+v35Pv/9J//+wf7//gX//CXB//8IEOTYUDUmQ1JCAAtDxAAD00RS', 6, 0, 1, '10', '0', 0, 1, 0, '2021-09-10 14:47:54.905860', 'BOCK191760589', 58),
(18, NULL, NULL, '2021-09-13 15:41:26.887090', NULL, 0, 'TatTUzIxAAAE6O8ECAUHCc7QAAAc6WkBAAAAhBUwMegXAGQPPwDgAGDngwAtAAIP4wA36OQPlQA0ALkPqOg3ABUPSAD/AF3niQA7AAcPlABX6OUPmABUAOUPvehXACQPbAClAPHm3gBwAKUPuwBz6E4NdAB7AJcOP+iDAEUPhQBGAEvlYwCEAN0PfwCP6DYPkgCNAI8OfuiaANAOnABYAEPnpwCdAD8PiQCg6DYPZQCkABUPXuioAMcORABoAMfnzgCuADgPfwCw6EAPTADAAM4NROjEACUOdwACAGnmxADbAEAPkgDb6KAOmQDlAJsPvujkAFAPcQAuAHDm2ADxAD0OpQD36O4O0wACAZMOKegGAZoPhwDCAeTnrwAZAdwODAAe6eUOnQApASwOuegxAfUOhgD3AfXnlgBTAf4PgAF2aEsOxQFNDkyDqRSMiYrviYO3gKJlcHSVfQlqNJqaGcf12fZZd3d1YWQoBKLoUY938EtoCxgepGb8JwQK+XaAwaexq9sQR5h2gCdvoP+YAN23IQdBBZ11rxI6gneH3QBNBAD9lWWTkOIMrftz8c4G0PxhBVEP5AKFa5yLOAvl/Xt5xBPc9yULqHeccE2CIQuhAjGabftNeDAGnI/tuXD+uRL3Atr7NQonBN4W5eslSU1HiR8ljn+FWvnCnr/OoRhnBPYCDbY0L5ZwJxB2gp7u0BC2HEMUfYWd1/eVlQHn/NbsgX2EUqL7+Bl9d84KHq7PE7J3Rm12hg/6AR6k+83r8fKokxnjeA4J+qL0pBIx8xcMgQq+9ZcTNuVLF2cJG7fAT2IAIT4BAoQhGgMEvwBrwQQAO8dnfOsBdgJwwAfFiQESNDAGAIEJv8Jt4AGIC/1AOMEASflqfgUANBqhwXPhAT4pYGfAB3of6N8plniEhEPAxCrBwmLBwWbJAIDE/DIpPsAGxZE1aJfCCACZNcz9T9EHAJE2eoAHCQRHNxNAQP8DxSMztMAIAI07A+/APPEBRj1ceGqzkYdhpo0qAO8/X2qBe4VvwsB4aqnCh2iPw4wvAO+IooFhwMKEwZZqomnGKonCwsLFwQfCjCh2iQsAlFJMw8AseMGGCQCclhf5Fz/A/g8AtZackivCwcOMwHbOALm+IUY/QgQAi1dXhAQAmlge/zj/D+i7WidHwP86Vhvobl3w/Rv9OkQy2/7+/cD+/+JGRvcB816iZ3WwiYqww/+LwsHDBMLH7AGDZ3qsBsWDaZjFwaEDAOOxLfv9AZJ4NMD7gf/6F/r//Pv+/TjA+ij+BAB5eUyOCgRleD38wMAuOPcC6H57TMD/PsEAd5ZWwsEFAD5ARnzhAYeHTED/OfX+5gG+jjRETTj++RX//g8AuI/ywEKi/UEzCQCRVEb6KP7//x0JAFmgQhdAwPz/BgBjoDnYwBcAV6XDOsD6Ffr/+v37/gXA+ij//sH+//84GgSuqMbAPS7+OS74F8H/wP//wTrAX+4BRLE3wsQAyAHozbE6wVUHxdK12f5SwRQAunJAxMP//v8x//84/cQrMAMAPskrBwYE6tQ6xcGEBcXF2tIlEQC66lD+NS8WLFYGEMUdrMD6qAkQJiYGOrsLFFEzcT5EwD/OEMXVdsBT/cHA+QMUU0h3wAYQVIoDVikCEJtXAMDDEGayDYD+UkIAzkMF6AELRVI=', 3, 0, 1, '10', '0', 0, 1, 0, '2021-09-13 15:41:26.887090', 'BOCK191760589', 55),
(19, NULL, NULL, '2021-09-13 15:41:26.943653', NULL, 0, 'TQtTUzIxAAAESE8ECAUHCc7QAAAcSWkBAAAAhPUiSkgTAOoPWwDmAGJHdQAqAO0PdAA0SPoPcwBIAKIPTkhIAOUPXACzAOFH5QChAAgPRAC+SOMPrQC+AD8P4UjRABQPPgAfAFNGwQDhAA0PYgDmSPkPtADxANUP7Uj6ACMPjAA4AN9HRgAAAdIOfQABSSgPzAAKAfcPRkgNAVAP3QDKATdHlwAdAdoOAAAgSUYO8AAkAfwPXUguAUIPqgD2AdVG4gBAAUMPcABISWQONgBNAYAPcEhRASwPkACXAQNGnQBUAYcOAABfSU4OvYWu/x4GxTUke26DIYsTiCpPChP7lw+XG3yezsMDnoJugwoAS0hygcsHu/QiE8u3o+vD7tsLCwW2pgsb3gqq8+oMZs5mCRt3zf00FrqtrOmJ7lIB0BlJTajptfLK8F/v3kmH5prPAIejfufZEBlh+YrlnAHdQZjvAINaEyr53UkkEnH/ygifAYr7BBemeB4ULAuesAMb6vdmG2b85SdT+J6MEgxn9tq2OBqR482X5gQ7Uwb3WSdapj/vhMv833algIMoJ87x0O4WDrrLb00+ggAgQgECjeYKAEhbAGvD/wPFbgQ4wwgAgAFwBv76inkGAJUBbbbBCEjGAn3CZ3g6cAxI0gp9wcFxBQ0EqBN9dHj/cgcTBKwafXjBWlwFwMUTwAYAVyFtB8B3TAHcJn11CMVZIyhZVg8ArTGxb8UewEttBgD79n35wxcA/jyGwotuxi7BwcE+dA3F90fISGfCXMEJxW5OL2pYwBcA+46AxIjBwmd4WcAFZHZNAUZNZMBT0gD4HYd7d3DBagVn+onBwBgBBmBMcGs4wHtrwv/ABWEcSP9ohmp+d71ixBPAWxMBB3NMcMTIdcJcZBkAP3qHGsPBwcF+wgVieLf+ZhMA+4VJfoiJwMF4YoQSxfaPzmfDfIBaZ84A8tmCWZCDCwA6mYeIaMGAwQMALZ4HtxcA4KCAbwd3bR5/Z8EEAOdhCcS2FQELuJDAB8CMyHZigQ8AfnhaxCLBgUrF/wfFsLq/MT0RAQ/BSWbEisLBwYt3wdAA5YWNk8PDwcEG/8WIw8LBxMLED8EASOjOEDgEACLUEx4VAQvWl8EG/8XLo4NmlQYA/Nxeiv98CgCq4DLB/7f9wMD//gjFxOVO/f9H/wwAfe4Ctfw4wPzAQsAQ8hXBdAsBAfBfwMWIxcONwA0AdfJ164jGz8HDwsMAPbtbwYEEALgxEC1MAev8Ij0I1bwCaiP8OwYQyMOXwIDDwwcQ0AvoLklNEawMZMOnwxA5RlLAwlsIEAkOMIj8PsAEELLKUFJOEUMQTMBgwhC5WDX8/cAiA9W3FQH/BxDhESk5wEJMEdwSMTUG1WkRAYr/EhD9IGxqlo3Bxox5wgbVxSwLKvwFEP4o8sAwTRFVMkP/ocAQWHtBdVJCAAuGAQRICkVSAA==', 4, 0, 1, '10', '0', 0, 1, 0, '2021-09-13 15:41:26.943653', 'BOCK191760589', 55),
(20, NULL, NULL, '2021-09-15 10:24:01.736215', NULL, 0, 'TZVTUzIxAAAE1tcECAUHCc7QAAAc12kBAAAAhHs1UNYfAG8PiQDaAITZMgAnAO8PcgA01hoOnwBEAEIPj9ZXABAP0QCfAKXZjQBeAHsP7gBn1twPTABwACMPY9aAAFoOkwBUAIHZgwCbAGwOAACh1iIPaQCnAJYNa9apAPAOwgBpAC/ZfwCwAFsOXQC61iYOHADAABUOGdbGAFQOQQACAEnZiADIAEUOYADN1qQNswDPAOINjtbZACwOXgAhAD/ZdQDlAMsPUQDu1iUOqgDxAG8Og9b1ADoNugAxAD/beAD1AD0NkAD91kMOlQAAAfMNqtYBAasOfgDDAU7bugAOAboO0AAS19QOegAXAQENPNYcAVsOWgDkAbnYkgAjAcUNrAAg18QNLQAmARwOC9YmAdUOeADvAdTbhgAvAdUNqgAy11MMKwA4ARsNYNY4AWkMIwCGAe/bgwBIAecOT4EXJzJjLvsTZEYRjlfaF8cLypQynJeqXHvebFYMaZZRXTKSi4hzHporxLjj9Gshtvmu879Rs4wqCcuXe3RCJ2cKZRlWLaOXBT9cEX1+rPpq/LtWNWY9+h3r3Z6hQniGJAqmBnOKvbrs8bUKdYQE5eoa7X66hseXLYYq3z4btvm+fpMWfc4kIenv7YC8gFm16ITyAKZ91OiF38BjSXKV+psA7UY4ktGSwezM+ZkkDADdcGWKAPwpzmQFzZClkECDRdL4dHn1EQr/BS6v6P0JFsHuSACxpvjxgYjtDcwRbceEg3IR+QEA/7KrhHwB9SEBTIR+qiuhzfj1VyNsGSZMAzH3RQgI9PWjjIDt/UEHvAGuKsP4DYC9/IQMPdKMECGGpOvMhOVb/PRpBXaEyRvlcPyacQxmFPsZZcA4l04YMqVTscz6BSA9AQI13zQA1kQAbcDCB8WGBcZWxv4IAIHBg8RHYAMA1wt6BQsEUxqGwpPAiwYHBIcfbcH/xIzKAM3Igf79hsDCBYh73wGNIAkxwIQLBFMjg8KIb2vOADPw5Sgw/0MExbw1zDkDAMkyGjoNBEo+jMKIw8AEbMXZAZtGicLBBoB1u8AIAKNGEzv/+xZVCgCPUwY5/zoWSwYAh1WABsLFFBEAz1aidAeWghR9CQCPWg/uTPvbAYhdgJ3AAXJkxAEvYtz/Ru/A+OhFwQQAJ2eWwMDbAWt/7fz87P7ELMRwCgBjgaWIM6UPAGeGXoO3SsToFwDfi6JasMOIXsBwawkAZFXi+S36//7A/gTFj5VGxcYMAGGbn8NmsjoTAMKhp6zCpEF/wGAGAHNt8P8tKAMAxakpBgsEs6pTeMFXUc8AaXpWwnTDwfwHCgSsr2fGhsP8kgQEFK4rXRcA33KnxSjC/sHCwMNawJYWwV3BEwCvf6vGFMLBxsX/xTrD+xfBwP9fBgBHvRQjxW0EALfA7m0A1pbBN8TAA8V/x4zFCAByxU8GxPqWCACFxVOYOMEf0wFAy1BrB8WJyIbCyPxCBQBy0iMUVwQAsdM0AMAC1l/oOsDAIMMAkDg1xf8WBgB79TQtNAcAh/o3Bfv5KsYEEK8DLT/9B8YmCFP+BhDoCFQo/sHCCRCfzjoZFMUnAxB4G4n8AcY5IFxZAxA/KRIWBBCvPn3CAf8AxkFUbSlSQsULR9cBAAtFUgA=', 6, 0, 1, '10', '0', 0, 1, 0, '2021-09-15 10:24:01.736215', 'BOCK191760589', 63);

-- --------------------------------------------------------

--
-- Table structure for table `iclock_biophoto`
--

CREATE TABLE `iclock_biophoto` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `first_name` varchar(25) DEFAULT NULL,
  `last_name` varchar(25) DEFAULT NULL,
  `email` varchar(254) DEFAULT NULL,
  `enroll_sn` varchar(50) DEFAULT NULL,
  `register_photo` varchar(100) NOT NULL,
  `register_time` datetime(6) NOT NULL,
  `approval_photo` varchar(100) DEFAULT NULL,
  `approval_state` smallint(6) NOT NULL,
  `approval_time` datetime(6) DEFAULT NULL,
  `remark` varchar(100) DEFAULT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `iclock_devicemoduleconfig`
--

CREATE TABLE `iclock_devicemoduleconfig` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `enable_registration` tinyint(1) NOT NULL,
  `enable_resigned_filter` tinyint(1) NOT NULL,
  `enable_auto_add` tinyint(1) NOT NULL,
  `enable_name_upload` tinyint(1) NOT NULL,
  `enable_name_download` tinyint(1) NOT NULL,
  `enable_card_upload` tinyint(1) NOT NULL,
  `encryption` tinyint(1) NOT NULL,
  `timezone` smallint(6) NOT NULL,
  `global_setup` tinyint(1) NOT NULL,
  `heartbeat` int(11) NOT NULL,
  `transfer_mode` smallint(6) NOT NULL,
  `transfer_interval` int(11) NOT NULL,
  `transfer_time` varchar(100) NOT NULL,
  `transaction_retention` int(11) NOT NULL,
  `command_retention` int(11) NOT NULL,
  `dev_log_retention` int(11) NOT NULL,
  `upload_log_retention` int(11) NOT NULL,
  `edit_policy` smallint(6) NOT NULL,
  `import_policy` smallint(6) NOT NULL,
  `mobile_policy` smallint(6) NOT NULL,
  `device_policy` smallint(6) NOT NULL,
  `api_policy` smallint(6) NOT NULL,
  `sync_mode` smallint(6) NOT NULL,
  `sync_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `iclock_devicemoduleconfig`
--

INSERT INTO `iclock_devicemoduleconfig` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `enable_registration`, `enable_resigned_filter`, `enable_auto_add`, `enable_name_upload`, `enable_name_download`, `enable_card_upload`, `encryption`, `timezone`, `global_setup`, `heartbeat`, `transfer_mode`, `transfer_interval`, `transfer_time`, `transaction_retention`, `command_retention`, `dev_log_retention`, `upload_log_retention`, `edit_policy`, `import_policy`, `mobile_policy`, `device_policy`, `api_policy`, `sync_mode`, `sync_time`) VALUES
(1, '2021-08-03 07:46:33.298798', NULL, '2021-08-03 07:46:33.298798', NULL, 0, 0, 0, 1, 1, 1, 1, 1, 8, 0, 10, 1, 1, '00:00;14:05', 9999, 9999, 9999, 9999, 0, 0, 0, 3, 3, 1, '00:00;12:00');

-- --------------------------------------------------------

--
-- Table structure for table `iclock_errorcommandlog`
--

CREATE TABLE `iclock_errorcommandlog` (
  `id` int(11) NOT NULL,
  `error_code` varchar(16) DEFAULT NULL,
  `error_msg` varchar(50) DEFAULT NULL,
  `data_origin` longtext DEFAULT NULL,
  `cmd` varchar(50) DEFAULT NULL,
  `additional` longtext DEFAULT NULL,
  `upload_time` datetime(6) NOT NULL,
  `terminal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `iclock_privatemessage`
--

CREATE TABLE `iclock_privatemessage` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `last_send` datetime(6) DEFAULT NULL,
  `employee_id` int(11) NOT NULL,
  `message_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `iclock_publicmessage`
--

CREATE TABLE `iclock_publicmessage` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `last_send` datetime(6) DEFAULT NULL,
  `message_id` int(11) DEFAULT NULL,
  `terminal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `iclock_shortmessage`
--

CREATE TABLE `iclock_shortmessage` (
  `id` int(11) NOT NULL,
  `message` longtext NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `duration` int(11) NOT NULL,
  `msg_type` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `iclock_terminal`
--

CREATE TABLE `iclock_terminal` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `sn` varchar(50) NOT NULL,
  `alias` varchar(50) NOT NULL,
  `ip_address` char(39) NOT NULL,
  `real_ip` char(39) DEFAULT NULL,
  `state` int(11) NOT NULL,
  `terminal_tz` smallint(6) NOT NULL,
  `heartbeat` int(11) NOT NULL,
  `transfer_mode` smallint(6) NOT NULL,
  `transfer_interval` int(11) NOT NULL,
  `transfer_time` varchar(100) NOT NULL,
  `product_type` smallint(6) DEFAULT NULL,
  `is_attendance` smallint(6) NOT NULL,
  `is_registration` smallint(6) NOT NULL,
  `purpose` smallint(6) DEFAULT NULL,
  `controller_type` smallint(6) DEFAULT NULL,
  `authentication` smallint(6) NOT NULL,
  `style` varchar(20) DEFAULT NULL,
  `upload_flag` varchar(10) DEFAULT NULL,
  `fw_ver` varchar(100) DEFAULT NULL,
  `push_protocol` varchar(30) NOT NULL,
  `push_ver` varchar(30) DEFAULT NULL,
  `language` int(11) DEFAULT NULL,
  `is_tft` tinyint(1) NOT NULL,
  `terminal_name` varchar(30) DEFAULT NULL,
  `platform` varchar(30) DEFAULT NULL,
  `oem_vendor` varchar(50) DEFAULT NULL,
  `log_stamp` varchar(30) DEFAULT NULL,
  `op_log_stamp` varchar(30) DEFAULT NULL,
  `capture_stamp` varchar(30) DEFAULT NULL,
  `user_count` int(11) DEFAULT NULL,
  `user_capacity` int(11) DEFAULT NULL,
  `photo_func_on` tinyint(1) NOT NULL,
  `transaction_count` int(11) DEFAULT NULL,
  `transaction_capacity` int(11) DEFAULT NULL,
  `fp_func_on` tinyint(1) NOT NULL,
  `fp_count` int(11) DEFAULT NULL,
  `fp_capacity` int(11) DEFAULT NULL,
  `fp_alg_ver` varchar(10) DEFAULT NULL,
  `face_func_on` tinyint(1) NOT NULL,
  `face_count` int(11) DEFAULT NULL,
  `face_capacity` int(11) DEFAULT NULL,
  `face_alg_ver` varchar(10) DEFAULT NULL,
  `fv_func_on` tinyint(1) NOT NULL,
  `fv_count` int(11) DEFAULT NULL,
  `fv_capacity` int(11) DEFAULT NULL,
  `fv_alg_ver` varchar(10) DEFAULT NULL,
  `palm_func_on` tinyint(1) NOT NULL,
  `palm_count` int(11) DEFAULT NULL,
  `palm_capacity` int(11) DEFAULT NULL,
  `palm_alg_ver` varchar(10) DEFAULT NULL,
  `lock_func` smallint(6) NOT NULL,
  `last_activity` datetime(6) DEFAULT NULL,
  `upload_time` datetime(6) DEFAULT NULL,
  `push_time` datetime(6) DEFAULT NULL,
  `is_access` smallint(6) NOT NULL,
  `area_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `iclock_terminal`
--

INSERT INTO `iclock_terminal` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `sn`, `alias`, `ip_address`, `real_ip`, `state`, `terminal_tz`, `heartbeat`, `transfer_mode`, `transfer_interval`, `transfer_time`, `product_type`, `is_attendance`, `is_registration`, `purpose`, `controller_type`, `authentication`, `style`, `upload_flag`, `fw_ver`, `push_protocol`, `push_ver`, `language`, `is_tft`, `terminal_name`, `platform`, `oem_vendor`, `log_stamp`, `op_log_stamp`, `capture_stamp`, `user_count`, `user_capacity`, `photo_func_on`, `transaction_count`, `transaction_capacity`, `fp_func_on`, `fp_count`, `fp_capacity`, `fp_alg_ver`, `face_func_on`, `face_count`, `face_capacity`, `face_alg_ver`, `fv_func_on`, `fv_count`, `fv_capacity`, `fv_alg_ver`, `palm_func_on`, `palm_count`, `palm_capacity`, `palm_alg_ver`, `lock_func`, `last_activity`, `upload_time`, `push_time`, `is_access`, `area_id`) VALUES
(4, '2021-08-24 14:28:39.612943', NULL, '2021-08-24 14:29:17.950507', NULL, 0, 'BOCK191760589', 'BCGI', '192.168.50.204', '192.168.50.204', 1, 8, 10, 1, 1, '00:00;14:05', 9, 1, 0, NULL, 0, 1, NULL, '1111100000', 'Ver 8.0.3.7-20181026', '2.2.14', 'Ver 2.0.26-20170428', 69, 1, 'F22/ID', 'ZLM60_TFT', ' ZKTeco Inc. ', '1631806354', '0', '0', 18, NULL, 0, 264, NULL, 1, 16, NULL, '10', 0, 0, NULL, '7', 0, 0, NULL, '3', 0, 0, NULL, '1', 0, '2021-09-16 15:32:39.512347', '2021-09-15 10:24:01.736215', '2021-09-13 15:12:50.929306', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `iclock_terminalcommand`
--

CREATE TABLE `iclock_terminalcommand` (
  `id` int(11) NOT NULL,
  `content` longtext NOT NULL,
  `commit_time` datetime(6) NOT NULL,
  `transfer_time` datetime(6) DEFAULT NULL,
  `return_time` datetime(6) DEFAULT NULL,
  `return_value` int(11) DEFAULT NULL,
  `package` int(11) DEFAULT NULL,
  `terminal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `iclock_terminalcommandlog`
--

CREATE TABLE `iclock_terminalcommandlog` (
  `id` int(11) NOT NULL,
  `content` longtext NOT NULL,
  `commit_time` datetime(6) NOT NULL,
  `transfer_time` datetime(6) DEFAULT NULL,
  `return_time` datetime(6) DEFAULT NULL,
  `return_value` int(11) DEFAULT NULL,
  `package` int(11) DEFAULT NULL,
  `terminal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `iclock_terminalcommandlog`
--

INSERT INTO `iclock_terminalcommandlog` (`id`, `content`, `commit_time`, `transfer_time`, `return_time`, `return_value`, `package`, `terminal_id`) VALUES
(163, 'INFO', '2021-08-24 14:29:17.998216', '2021-08-24 14:29:26.440639', '2021-08-24 14:29:31.841283', 0, NULL, 4),
(164, 'CHECK ALL', '2021-08-24 14:29:17.998216', '2021-08-24 14:29:26.440639', '2021-08-24 14:29:50.210612', 0, NULL, 4),
(165, 'DATA UPDATE USERINFO PIN=1	Name=Akosi	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:26.923850', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(166, 'DATA UPDATE FINGERTMP PIN=1	FID=6	Size=zk_bio_size	Valid=1	TMP=zk_bio_data_0000000005_06', '2021-08-24 14:29:27.042522', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(167, 'DATA UPDATE USERINFO PIN=19	Name=Lawrence	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:27.085635', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(168, 'DATA UPDATE USERINFO PIN=2	Name=RJ	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:27.129668', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(169, 'DATA UPDATE FINGERTMP PIN=2	FID=5	Size=zk_bio_size	Valid=1	TMP=zk_bio_data_0000000006_05', '2021-08-24 14:29:27.161494', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(170, 'DATA UPDATE USERINFO PIN=20	Name=Joseph	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:27.194343', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(171, 'DATA UPDATE FINGERTMP PIN=20	FID=6	Size=zk_bio_size	Valid=1	TMP=zk_bio_data_0000000008_06', '2021-08-24 14:29:27.244346', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(172, 'DATA UPDATE USERINFO PIN=21	Name=Ayesha	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:27.362494', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(173, 'DATA UPDATE USERINFO PIN=22	Name=Jelo	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:27.409944', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(174, 'DATA UPDATE USERINFO PIN=23	Name=Yow Lee	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:27.482949', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(175, 'DATA UPDATE USERINFO PIN=3	Name=Wilson	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:27.582591', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(176, 'DATA UPDATE FINGERTMP PIN=3	FID=7	Size=zk_bio_size	Valid=1	TMP=zk_bio_data_0000000007_07', '2021-08-24 14:29:27.668443', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(177, 'DATA UPDATE USERINFO PIN=4	Name=Charles	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:27.752664', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(178, 'DATA UPDATE USERINFO PIN=5	Name=Mark	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:28.606057', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(179, 'DATA UPDATE USERINFO PIN=6	Name=Francis	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:28.861731', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(180, 'DATA UPDATE USERINFO PIN=7	Name=Renna	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:29.019132', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(181, 'DATA UPDATE USERINFO PIN=8	Name=Matthew	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:29.290595', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(182, 'DATA UPDATE USERINFO PIN=9	Name=Errol	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:29.688278', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(183, 'DATA UPDATE USERINFO PIN=1	Name=Akosi	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:31.853022', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(184, 'DATA UPDATE FINGERTMP PIN=1	FID=6	Size=zk_bio_size	Valid=1	TMP=zk_bio_data_0000000005_06', '2021-08-24 14:29:31.923364', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(185, 'DATA UPDATE USERINFO PIN=19	Name=Lawrence	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:31.979027', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(186, 'DATA UPDATE USERINFO PIN=2	Name=RJ	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:32.038490', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(187, 'DATA UPDATE FINGERTMP PIN=2	FID=5	Size=zk_bio_size	Valid=1	TMP=zk_bio_data_0000000006_05', '2021-08-24 14:29:32.086885', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(188, 'DATA UPDATE USERINFO PIN=20	Name=Joseph	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:32.138024', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(189, 'DATA UPDATE FINGERTMP PIN=20	FID=6	Size=zk_bio_size	Valid=1	TMP=zk_bio_data_0000000008_06', '2021-08-24 14:29:32.196326', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(190, 'DATA UPDATE USERINFO PIN=21	Name=Ayesha	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:32.278941', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(191, 'DATA UPDATE USERINFO PIN=22	Name=Jelo	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:32.334664', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(192, 'DATA UPDATE USERINFO PIN=23	Name=Yow Lee	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:32.364667', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(193, 'DATA UPDATE USERINFO PIN=3	Name=Wilson	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:32.398669', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(194, 'DATA UPDATE FINGERTMP PIN=3	FID=7	Size=zk_bio_size	Valid=1	TMP=zk_bio_data_0000000007_07', '2021-08-24 14:29:32.428673', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(195, 'DATA UPDATE USERINFO PIN=4	Name=Charles	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:32.453673', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(196, 'DATA UPDATE USERINFO PIN=5	Name=Mark	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:32.481676', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(197, 'DATA UPDATE USERINFO PIN=6	Name=Francis	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:32.515581', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(198, 'DATA UPDATE USERINFO PIN=7	Name=Renna	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:32.552584', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(199, 'DATA UPDATE USERINFO PIN=8	Name=Matthew	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:32.589588', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(200, 'DATA UPDATE USERINFO PIN=9	Name=Errol	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-08-24 14:29:32.633590', '2021-08-24 14:29:50.396638', '2021-08-24 14:29:52.390663', 0, NULL, 4),
(201, 'DATA UPDATE USERINFO PIN=1	Name=Akosi	Pri=0	Passwd=	Card=	Grp=1		Verify=-1', '2021-09-13 15:12:50.955962', '2021-09-13 15:12:51.392834', '2021-09-13 15:12:56.950300', 0, NULL, 4),
(202, 'DATA UPDATE FINGERTMP PIN=1	FID=6	Size=zk_bio_size	Valid=1	TMP=zk_bio_data_0000000005_06', '2021-09-13 15:12:51.062710', '2021-09-13 15:12:51.392834', '2021-09-13 15:12:56.950300', 0, NULL, 4),
(203, 'DATA DELETE USERINFO PIN=27', '2021-09-14 08:03:42.648404', '2021-09-14 08:03:51.724521', '2021-09-14 08:03:52.163342', 0, NULL, 4);

-- --------------------------------------------------------

--
-- Table structure for table `iclock_terminalemployee`
--

CREATE TABLE `iclock_terminalemployee` (
  `id` int(11) NOT NULL,
  `terminal_sn` varchar(50) NOT NULL,
  `emp_code` varchar(20) NOT NULL,
  `privilege` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `iclock_terminallog`
--

CREATE TABLE `iclock_terminallog` (
  `id` int(11) NOT NULL,
  `terminal_tz` smallint(6) DEFAULT NULL,
  `admin` varchar(50) DEFAULT NULL,
  `action_name` smallint(6) DEFAULT NULL,
  `action_time` datetime(6) DEFAULT NULL,
  `object` varchar(50) DEFAULT NULL,
  `param1` int(11) DEFAULT NULL,
  `param2` int(11) DEFAULT NULL,
  `param3` int(11) DEFAULT NULL,
  `upload_time` datetime(6) DEFAULT NULL,
  `terminal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `iclock_terminallog`
--

INSERT INTO `iclock_terminallog` (`id`, `terminal_tz`, `admin`, `action_name`, `action_time`, `object`, `param1`, `param2`, `param3`, `upload_time`, `terminal_id`) VALUES
(62, 8, '0', 0, '2021-08-24 08:41:28.000000', '0', 0, 0, 0, '2021-08-24 14:29:49.193556', 4),
(63, 8, '1', 4, '2021-08-24 08:50:57.000000', '0', 0, 0, 0, '2021-08-24 14:29:49.250779', 4),
(64, 8, '1', 4, '2021-08-24 08:59:51.000000', '0', 0, 0, 0, '2021-08-24 14:29:49.317791', 4),
(65, 8, '1', 4, '2021-08-24 13:05:47.000000', '0', 0, 0, 0, '2021-08-24 14:29:49.564691', 4),
(66, 8, '1', 4, '2021-08-24 13:18:03.000000', '0', 0, 0, 0, '2021-08-24 14:29:49.795559', 4),
(67, 8, '1', 4, '2021-08-24 14:06:28.000000', '0', 0, 0, 0, '2021-08-24 14:29:49.847860', 4),
(68, 8, '1', 4, '2021-08-24 14:07:41.000000', '0', 0, 0, 0, '2021-08-24 14:29:49.895918', 4),
(69, 8, '1', 4, '2021-08-24 14:10:04.000000', '0', 0, 0, 0, '2021-08-24 14:29:50.002281', 4),
(70, 8, '0', 0, '2021-08-24 14:11:17.000000', '0', 0, 0, 0, '2021-08-24 14:29:50.049950', 4),
(71, 8, '1', 4, '2021-08-24 14:11:56.000000', '0', 0, 0, 0, '2021-08-24 14:29:50.130021', 4),
(72, 8, '1', 4, '2021-08-24 14:15:14.000000', '0', 0, 0, 0, '2021-08-24 14:29:50.213337', 4),
(73, 8, '1', 4, '2021-08-24 14:17:45.000000', '0', 0, 0, 0, '2021-08-24 14:29:50.282615', 4),
(74, 8, '0', 4, '2021-08-24 14:18:18.000000', '3002', 0, 0, 0, '2021-08-24 14:29:50.324789', 4),
(75, 8, '0', 0, '2021-08-24 14:19:29.000000', '0', 0, 0, 0, '2021-08-24 14:29:50.383595', 4),
(76, 8, '1', 4, '2021-08-24 14:20:14.000000', '0', 0, 0, 0, '2021-08-24 14:29:50.609568', 4),
(77, 8, '0', 4, '2021-08-24 14:23:11.000000', '3002', 0, 0, 0, '2021-08-24 14:29:50.782590', 4),
(78, 8, '0', 0, '2021-08-24 14:24:53.000000', '0', 0, 0, 0, '2021-08-24 14:29:50.962691', 4),
(79, 8, '1', 4, '2021-08-24 14:28:10.000000', '0', 0, 0, 0, '2021-08-24 14:29:51.017725', 4),
(80, 8, '0', 0, '2021-08-25 07:24:01.000000', '0', 0, 0, 0, '2021-08-25 13:37:56.643443', 4),
(81, 8, '0', 4, '2021-08-25 07:31:08.000000', '0', 0, 0, 0, '2021-08-25 13:37:56.846367', 4),
(82, 8, '0', 4, '2021-08-25 08:14:47.000000', '0', 0, 0, 0, '2021-08-25 13:37:56.946603', 4),
(83, 8, '0', 4, '2021-08-25 08:16:13.000000', '0', 0, 0, 0, '2021-08-25 13:37:57.267803', 4),
(84, 8, '0', 4, '2021-08-25 10:11:12.000000', '0', 0, 0, 0, '2021-08-25 13:37:57.430008', 4),
(85, 8, '0', 4, '2021-08-25 13:36:01.000000', '0', 0, 0, 0, '2021-08-25 13:37:57.599907', 4),
(86, 8, '0', 4, '2021-08-25 13:37:33.000000', '0', 0, 0, 0, '2021-08-25 13:37:57.675631', 4),
(87, 8, '0', 0, '2021-08-26 07:28:07.000000', '0', 0, 0, 0, '2021-08-26 07:36:01.748229', 4),
(88, 8, '0', 4, '2021-08-26 07:29:21.000000', '0', 0, 0, 0, '2021-08-26 07:36:01.848553', 4),
(89, 8, '0', 4, '2021-08-26 07:29:46.000000', '0', 0, 0, 0, '2021-08-26 07:36:01.895441', 4),
(90, 8, '0', 4, '2021-08-26 07:35:40.000000', '0', 0, 0, 0, '2021-08-26 07:36:01.926700', 4),
(91, 8, '0', 4, '2021-08-26 10:54:33.000000', '0', 0, 0, 0, '2021-08-26 10:54:33.706573', 4),
(92, 8, '5', 6, '2021-08-26 10:55:16.000000', '0', 0, 0, 0, '2021-08-26 10:55:16.335568', 4),
(93, 8, '5', 36, '2021-08-26 10:55:14.000000', '0', 0, 0, 0, '2021-08-26 10:55:16.401629', 4),
(94, 8, '0', 0, '2021-08-27 07:27:01.000000', '0', 0, 0, 0, '2021-08-27 07:36:06.342446', 4),
(95, 8, '0', 4, '2021-08-27 07:32:36.000000', '0', 0, 0, 0, '2021-08-27 07:36:06.408452', 4),
(96, 8, '0', 4, '2021-08-27 07:35:47.000000', '0', 0, 0, 0, '2021-08-27 07:36:06.459456', 4),
(97, 8, '0', 4, '2021-08-31 07:55:50.000000', '0', 0, 0, 0, '2021-08-31 09:32:23.449421', 4),
(98, 8, '0', 4, '2021-08-31 07:56:41.000000', '0', 0, 0, 0, '2021-08-31 09:32:24.037804', 4),
(99, 8, '0', 4, '2021-08-31 07:57:22.000000', '0', 0, 0, 0, '2021-08-31 09:32:24.379601', 4),
(100, 8, '0', 4, '2021-08-31 07:57:49.000000', '0', 0, 0, 0, '2021-08-31 09:32:24.465607', 4),
(101, 8, '0', 4, '2021-08-31 08:34:30.000000', '0', 0, 0, 0, '2021-08-31 09:32:24.636582', 4),
(102, 8, '0', 4, '2021-08-31 08:35:34.000000', '0', 0, 0, 0, '2021-08-31 09:32:24.732604', 4),
(103, 8, '0', 4, '2021-08-31 09:04:36.000000', '0', 0, 0, 0, '2021-08-31 09:32:24.970646', 4),
(104, 8, '0', 4, '2021-08-31 09:05:18.000000', '0', 0, 0, 0, '2021-08-31 09:32:25.581568', 4),
(105, 8, '0', 4, '2021-08-31 09:30:57.000000', '0', 0, 0, 0, '2021-08-31 09:32:25.762660', 4),
(106, 8, '0', 4, '2021-08-31 09:32:16.000000', '0', 0, 0, 0, '2021-08-31 09:32:26.125500', 4),
(107, 8, '0', 4, '2021-08-31 09:36:15.000000', '0', 0, 0, 0, '2021-08-31 09:36:16.444131', 4),
(108, 8, '0', 4, '2021-08-31 09:36:20.000000', '0', 0, 0, 0, '2021-08-31 09:36:21.199569', 4),
(109, 8, '0', 4, '2021-08-31 09:36:28.000000', '3002', 0, 0, 0, '2021-08-31 09:36:29.896037', 4),
(110, 8, '0', 4, '2021-08-31 09:36:34.000000', '3006', 0, 0, 0, '2021-08-31 09:36:35.200609', 4),
(111, 8, '0', 4, '2021-08-31 09:36:50.000000', '3002', 0, 0, 0, '2021-08-31 09:36:53.257060', 4),
(112, 8, '0', 4, '2021-08-31 09:36:55.000000', '3006', 0, 0, 0, '2021-08-31 09:36:57.284428', 4),
(113, 8, '0', 4, '2021-08-31 09:37:16.000000', '3007', 0, 0, 0, '2021-08-31 09:37:17.051589', 4),
(114, 8, '0', 4, '2021-08-31 16:02:51.000000', '0', 0, 0, 0, '2021-08-31 16:02:52.657470', 4),
(115, 8, '21', 6, '2021-08-31 16:03:27.000000', '0', 0, 0, 0, '2021-08-31 16:03:28.573056', 4),
(116, 8, '0', 0, '2021-09-01 07:18:46.000000', '0', 0, 0, 0, '2021-09-01 08:56:15.232713', 4),
(117, 8, '0', 4, '2021-09-01 08:55:40.000000', '0', 0, 0, 0, '2021-09-01 08:56:15.512610', 4),
(118, 8, '0', 4, '2021-09-01 15:35:37.000000', '0', 0, 0, 0, '2021-09-01 15:35:39.985778', 4),
(119, 8, '0', 0, '2021-09-02 07:25:44.000000', '0', 0, 0, 0, '2021-09-02 07:35:39.463817', 4),
(120, 8, '0', 4, '2021-09-02 07:35:09.000000', '0', 0, 0, 0, '2021-09-02 07:35:39.606702', 4),
(121, 8, '0', 0, '2021-09-03 07:29:33.000000', '0', 0, 0, 0, '2021-09-03 07:34:29.774352', 4),
(122, 8, '0', 4, '2021-09-03 07:34:00.000000', '0', 0, 0, 0, '2021-09-03 07:34:29.995286', 4),
(123, 8, '0', 4, '2021-09-03 09:43:18.000000', '0', 0, 0, 0, '2021-09-03 09:43:22.098311', 4),
(124, 8, '4', 6, '2021-09-03 09:43:46.000000', '0', 0, 0, 0, '2021-09-03 09:43:50.864881', 4),
(125, 8, '4', 36, '2021-09-03 09:43:44.000000', '0', 0, 0, 0, '2021-09-03 09:43:50.935679', 4),
(126, 8, '0', 0, '2021-09-06 08:32:01.000000', '0', 0, 0, 0, '2021-09-06 08:36:46.120678', 4),
(127, 8, '0', 4, '2021-09-06 08:33:12.000000', '0', 0, 0, 0, '2021-09-06 08:36:47.521984', 4),
(128, 8, '0', 4, '2021-09-06 08:36:10.000000', '0', 0, 0, 0, '2021-09-06 08:36:47.704782', 4),
(129, 8, '0', 4, '2021-09-06 15:17:04.000000', '0', 0, 0, 0, '2021-09-06 15:17:40.390837', 4),
(130, 8, '0', 0, '2021-09-07 07:09:33.000000', '0', 0, 0, 0, '2021-09-07 07:26:18.558160', 4),
(131, 8, '0', 4, '2021-09-07 07:25:48.000000', '0', 0, 0, 0, '2021-09-07 07:26:19.063324', 4),
(132, 8, '0', 0, '2021-09-08 07:07:03.000000', '0', 0, 0, 0, '2021-09-08 07:37:49.886066', 4),
(133, 8, '0', 4, '2021-09-08 07:37:26.000000', '0', 0, 0, 0, '2021-09-08 07:37:50.311723', 4),
(134, 8, '0', 4, '2021-09-08 15:57:45.000000', '0', 0, 0, 0, '2021-09-08 15:58:33.513721', 4),
(135, 8, '0', 0, '2021-09-09 08:33:50.000000', '0', 0, 0, 0, '2021-09-09 14:58:22.960722', 4),
(136, 8, '0', 4, '2021-09-09 09:29:55.000000', '0', 0, 0, 0, '2021-09-09 14:58:23.260950', 4),
(137, 8, '0', 4, '2021-09-09 14:56:33.000000', '0', 0, 0, 0, '2021-09-09 14:58:32.383520', 4),
(138, 8, '0', 0, '2021-09-10 07:30:02.000000', '0', 0, 0, 0, '2021-09-10 11:27:02.011238', 4),
(139, 8, '0', 4, '2021-09-10 11:26:30.000000', '0', 0, 0, 0, '2021-09-10 11:27:03.331712', 4),
(140, 8, '0', 0, '2021-09-10 14:18:20.000000', '0', 0, 0, 0, '2021-09-10 14:21:30.294519', 4),
(141, 8, '0', 4, '2021-09-10 14:18:24.000000', '0', 0, 0, 0, '2021-09-10 14:21:30.368206', 4),
(142, 8, '20', 36, '2021-09-10 14:20:59.000000', '0', 0, 0, 0, '2021-09-10 14:21:30.424273', 4),
(143, 8, '0', 4, '2021-09-10 14:21:09.000000', '0', 0, 0, 0, '2021-09-10 14:21:30.483809', 4),
(144, 8, '0', 4, '2021-09-10 14:21:44.000000', '0', 0, 0, 0, '2021-09-10 14:21:46.995053', 4),
(145, 8, '0', 4, '2021-09-10 14:31:50.000000', '0', 0, 0, 0, '2021-09-10 14:31:53.708561', 4),
(146, 8, '0', 4, '2021-09-10 14:42:46.000000', '0', 0, 0, 0, '2021-09-10 14:42:48.577965', 4),
(147, 8, '9', 6, '2021-09-10 14:43:34.000000', '0', 0, 0, 0, '2021-09-10 14:43:37.406745', 4),
(148, 8, '9', 36, '2021-09-10 14:43:33.000000', '0', 0, 0, 0, '2021-09-10 14:43:37.499227', 4),
(149, 8, '0', 4, '2021-09-10 14:47:11.000000', '0', 0, 0, 0, '2021-09-10 14:47:14.096402', 4),
(150, 8, '23', 36, '2021-09-10 14:47:49.000000', '0', 0, 0, 0, '2021-09-10 14:47:51.468317', 4),
(151, 8, '0', 4, '2021-09-10 15:16:03.000000', '0', 0, 0, 0, '2021-09-10 15:16:05.831534', 4),
(152, 8, '0', 0, '2021-09-13 15:08:00.000000', '0', 0, 0, 0, '2021-09-13 15:12:56.442617', 4),
(153, 8, '0', 4, '2021-09-13 15:08:13.000000', '0', 0, 0, 0, '2021-09-13 15:12:56.599172', 4),
(154, 8, '0', 4, '2021-09-13 15:08:34.000000', '0', 0, 0, 0, '2021-09-13 15:12:56.666613', 4),
(155, 8, '0', 4, '2021-09-13 15:09:53.000000', '0', 0, 0, 0, '2021-09-13 15:12:56.729469', 4),
(156, 8, '0', 4, '2021-09-13 15:09:57.000000', '0', 0, 0, 0, '2021-09-13 15:12:56.772470', 4),
(157, 8, '0', 4, '2021-09-13 15:10:32.000000', '0', 0, 0, 0, '2021-09-13 15:12:56.820917', 4),
(158, 8, '0', 4, '2021-09-13 15:12:18.000000', '0', 0, 0, 0, '2021-09-13 15:12:56.895847', 4),
(159, 8, '0', 4, '2021-09-13 15:40:19.000000', '0', 0, 0, 0, '2021-09-13 15:40:21.751133', 4),
(160, 8, '20', 6, '2021-09-13 15:41:20.000000', '0', 0, 0, 0, '2021-09-13 15:41:26.153826', 4),
(161, 8, '20', 36, '2021-09-13 15:41:18.000000', '0', 0, 0, 0, '2021-09-13 15:41:26.221255', 4),
(162, 8, '0', 4, '2021-09-13 16:21:05.000000', '0', 0, 0, 0, '2021-09-14 07:58:39.296469', 4),
(163, 8, '0', 0, '2021-09-14 07:37:00.000000', '0', 0, 0, 0, '2021-09-14 07:58:41.426328', 4),
(164, 8, '0', 4, '2021-09-14 07:58:05.000000', '0', 0, 0, 0, '2021-09-14 07:58:41.519880', 4),
(165, 8, '0', 4, '2021-09-14 07:58:38.000000', '0', 0, 0, 0, '2021-09-14 07:58:41.625972', 4),
(166, 8, '0', 4, '2021-09-14 08:04:03.000000', '0', 0, 0, 0, '2021-09-14 08:04:06.737683', 4),
(167, 8, '0', 4, '2021-09-15 10:23:57.000000', '0', 0, 0, 0, '2021-09-15 10:24:00.620591', 4),
(168, 8, '0', 4, '2021-09-14 17:17:11.000000', '0', 0, 0, 0, '2021-09-15 10:24:05.160582', 4),
(169, 8, '10', 70, '2021-09-14 17:17:38.000000', '0', 0, 0, 0, '2021-09-15 10:24:05.275908', 4),
(170, 8, '10', 30, '2021-09-14 17:18:12.000000', '0', 0, 0, 0, '2021-09-15 10:24:05.321244', 4),
(171, 8, '0', 0, '2021-09-14 17:19:39.000000', '0', 0, 0, 0, '2021-09-15 10:24:05.373290', 4),
(172, 8, '0', 4, '2021-09-14 18:08:32.000000', '0', 0, 0, 0, '2021-09-15 10:24:05.433638', 4),
(173, 8, '0', 0, '2021-09-15 10:22:50.000000', '0', 0, 0, 0, '2021-09-15 10:24:05.469555', 4),
(174, 8, '0', 4, '2021-09-15 10:23:09.000000', '0', 0, 0, 0, '2021-09-15 10:24:05.515609', 4),
(175, 8, '0', 4, '2021-09-15 10:23:25.000000', '0', 0, 0, 0, '2021-09-15 10:24:05.612110', 4);

-- --------------------------------------------------------

--
-- Table structure for table `iclock_terminalparameter`
--

CREATE TABLE `iclock_terminalparameter` (
  `id` int(11) NOT NULL,
  `param_type` varchar(10) DEFAULT NULL,
  `param_name` varchar(30) NOT NULL,
  `param_value` varchar(100) NOT NULL,
  `terminal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `iclock_terminalparameter`
--

INSERT INTO `iclock_terminalparameter` (`id`, `param_type`, `param_name`, `param_value`, `terminal_id`) VALUES
(100, NULL, 'IPAddress', '192.168.50.204', 4),
(101, NULL, 'ZKFaceVersion', '-1', 4),
(102, NULL, 'TransactionCount', '264', 4),
(103, NULL, 'Identifier', '101', 4),
(104, NULL, 'faceTempNumber', '0', 4),
(105, NULL, 'FingerFunOn', '1', 4),
(106, NULL, 'FWVersion', 'Ver 8.0.3.7-20181026', 4),
(107, NULL, 'UserCount', '18', 4),
(108, NULL, '~ZKFPVersion', '10', 4),
(109, NULL, 'FPCount', '16', 4),
(110, NULL, 'FaceCount', '0', 4),
(111, NULL, 'PvVersion', '1', 4),
(112, NULL, '~MaxPvCount', '0', 4),
(113, NULL, 'FreeFlashSize', '29020', 4),
(114, NULL, '~MaxFingerCount', '30', 4),
(115, NULL, 'OPT_VOLUME', '20', 4),
(116, NULL, 'FvCount', '0', 4),
(117, NULL, '~DeviceName', 'F22/ID', 4),
(118, NULL, '~AlgVer', '10', 4),
(119, NULL, '~MaxUserPhotoCount', '0', 4),
(120, NULL, 'FlashSize', '100736', 4),
(121, NULL, 'PvCount', '0', 4),
(122, NULL, '~OEMVendor', ' ZKTeco Inc. ', 4),
(123, NULL, 'FvFunOn', '0', 4),
(124, NULL, '~Platform', 'ZLM60_TFT', 4),
(125, NULL, 'FaceVersion', '7', 4),
(126, NULL, 'FPVersion', '10', 4),
(127, NULL, 'Brightness', '0', 4),
(128, NULL, 'PushVersion', 'Ver 2.0.26-20170428', 4),
(129, NULL, 'FaceFunOn', '0', 4),
(130, NULL, '~MaxFvCount', '10', 4),
(131, NULL, 'PhotoFunOn', '0', 4),
(132, NULL, 'PvFunOn', '0', 4),
(133, NULL, 'MAC', '00:17:61:11:32:53', 4),
(134, NULL, 'FvVersion', '3', 4),
(135, NULL, '~MaxUserCount', '50', 4),
(136, NULL, 'MainTime', '1970-01-01 00:00:00', 4),
(137, NULL, 'BackupDev', '0', 4),
(138, NULL, '~MaxAttLogCount', '3', 4),
(139, NULL, 'Language', '69', 4),
(140, NULL, 'DtFmt', '9', 4),
(141, NULL, '~SerialNumber', 'BOCK191760589', 4),
(142, NULL, '~MaxFaceCount', '400', 4),
(143, NULL, 'IsTFT', '1', 4);

-- --------------------------------------------------------

--
-- Table structure for table `iclock_terminaluploadlog`
--

CREATE TABLE `iclock_terminaluploadlog` (
  `id` int(11) NOT NULL,
  `event` varchar(80) NOT NULL,
  `content` varchar(80) NOT NULL,
  `upload_count` int(11) NOT NULL,
  `error_count` int(11) NOT NULL,
  `upload_time` datetime(6) NOT NULL,
  `terminal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `iclock_terminaluploadlog`
--

INSERT INTO `iclock_terminaluploadlog` (`id`, `event`, `content`, `upload_count`, `error_count`, `upload_time`, `terminal_id`) VALUES
(125, 'Transaction', 'Duplicate:10', 74, 0, '2021-08-24 14:29:42.408666', 4),
(126, 'User', '21,5,22,25,8,23,3,4,2,20,26,6,', 16, 0, '2021-08-24 14:29:46.861027', 4),
(127, 'Fingerprint Create', '26', 2, 0, '2021-08-24 14:29:49.120704', 4),
(128, 'Fingerprint Update', '2', 1, 0, '2021-08-24 14:29:49.151230', 4),
(129, 'Operation Log', '', 48, 0, '2021-08-24 14:29:51.198383', 4),
(130, 'Operation Log', '', 1, 0, '2021-08-24 14:33:20.988415', 4),
(131, 'Operation Log', '', 1, 0, '2021-08-24 14:35:39.326271', 4),
(132, 'Operation Log', '', 13, 0, '2021-08-25 13:37:57.911750', 4),
(133, 'Operation Log', '', 6, 0, '2021-08-26 07:36:01.964471', 4),
(134, 'Operation Log', '', 1, 0, '2021-08-26 10:54:32.311157', 4),
(135, 'Operation Log', '', 1, 0, '2021-08-26 10:54:33.770048', 4),
(136, 'User', '5', 1, 0, '2021-08-26 10:55:15.037680', 4),
(137, 'Operation Log', '', 2, 0, '2021-08-26 10:55:16.443821', 4),
(138, 'Fingerprint Create', '5', 1, 0, '2021-08-26 10:55:17.568372', 4),
(139, 'Operation Log', '', 4, 0, '2021-08-27 07:36:06.492457', 4),
(140, 'Operation Log', '', 1, 0, '2021-08-31 09:32:23.582444', 4),
(141, 'Operation Log', '', 9, 0, '2021-08-31 09:32:26.438090', 4),
(142, 'Operation Log', '', 1, 0, '2021-08-31 09:36:16.750854', 4),
(143, 'Operation Log', '', 1, 0, '2021-08-31 09:36:21.330514', 4),
(144, 'Operation Log', '', 1, 0, '2021-08-31 09:36:30.367638', 4),
(145, 'Operation Log', '', 1, 0, '2021-08-31 09:36:35.315908', 4),
(146, 'Operation Log', '', 1, 0, '2021-08-31 09:36:53.357517', 4),
(147, 'Operation Log', '', 1, 0, '2021-08-31 09:36:57.427441', 4),
(148, 'Operation Log', '', 1, 0, '2021-08-31 09:37:17.123883', 4),
(149, 'Operation Log', '', 1, 0, '2021-08-31 16:02:52.704159', 4),
(150, 'User', '21', 1, 0, '2021-08-31 16:03:28.017803', 4),
(151, 'Operation Log', '', 2, 0, '2021-08-31 16:03:28.619945', 4),
(152, 'Fingerprint Create', '21', 1, 0, '2021-08-31 16:03:30.028129', 4),
(153, 'Operation Log', '', 3, 0, '2021-09-01 08:56:15.615838', 4),
(154, 'Operation Log', '', 1, 0, '2021-09-01 15:35:40.624343', 4),
(155, 'Operation Log', '', 3, 0, '2021-09-02 07:35:39.758127', 4),
(156, 'Operation Log', '', 3, 0, '2021-09-03 07:34:30.081226', 4),
(157, 'Operation Log', '', 1, 0, '2021-09-03 09:43:22.946715', 4),
(158, 'User', '4', 1, 0, '2021-09-03 09:43:47.477369', 4),
(159, 'Operation Log', '', 2, 0, '2021-09-03 09:43:51.005698', 4),
(160, 'Fingerprint Create', '4', 1, 0, '2021-09-03 09:43:52.244661', 4),
(161, 'Operation Log', '', 4, 0, '2021-09-06 08:36:47.969196', 4),
(162, 'Operation Log', '', 1, 0, '2021-09-06 15:17:42.942859', 4),
(163, 'Operation Log', '', 3, 0, '2021-09-07 07:26:19.204050', 4),
(164, 'Operation Log', '', 3, 0, '2021-09-08 07:37:50.568182', 4),
(165, 'Operation Log', '', 1, 0, '2021-09-08 15:58:34.210100', 4),
(166, 'Operation Log', '', 3, 0, '2021-09-09 14:58:24.011170', 4),
(167, 'Operation Log', '', 1, 0, '2021-09-09 14:58:32.446616', 4),
(168, 'Operation Log', '', 3, 0, '2021-09-10 11:27:03.645932', 4),
(169, 'Fingerprint Create', '20', 1, 0, '2021-09-10 14:21:28.675326', 4),
(170, 'Operation Log', '', 6, 0, '2021-09-10 14:21:30.512816', 4),
(171, 'Operation Log', '', 1, 0, '2021-09-10 14:21:47.035602', 4),
(172, 'Operation Log', '', 1, 0, '2021-09-10 14:31:53.748506', 4),
(173, 'Operation Log', '', 1, 0, '2021-09-10 14:42:48.597968', 4),
(174, 'User', '9', 1, 0, '2021-09-10 14:43:36.165786', 4),
(175, 'Operation Log', '', 2, 0, '2021-09-10 14:43:37.556018', 4),
(176, 'Fingerprint Create', '9', 2, 0, '2021-09-10 14:43:38.505985', 4),
(177, 'Operation Log', '', 1, 0, '2021-09-10 14:47:14.127962', 4),
(178, 'Operation Log', '', 1, 0, '2021-09-10 14:47:51.536344', 4),
(179, 'Operation Log', '', 1, 0, '2021-09-10 14:47:53.266706', 4),
(180, 'User', '23', 1, 0, '2021-09-10 14:47:53.768000', 4),
(181, 'Fingerprint Create', '23', 2, 0, '2021-09-10 14:47:55.280875', 4),
(182, 'Operation Log', '', 1, 0, '2021-09-10 14:54:55.626783', 4),
(183, 'Operation Log', '', 1, 0, '2021-09-10 15:16:05.876501', 4),
(184, 'Operation Log', '', 1, 0, '2021-09-10 15:42:32.354752', 4),
(185, 'Operation Log', '', 11, 0, '2021-09-13 15:12:56.957301', 4),
(186, 'Operation Log', '', 1, 0, '2021-09-13 15:40:21.796671', 4),
(187, 'User', '20', 1, 0, '2021-09-13 15:41:22.432737', 4),
(188, 'Operation Log', '', 2, 0, '2021-09-13 15:41:26.267674', 4),
(189, 'Fingerprint Create', '20', 2, 0, '2021-09-13 15:41:26.973406', 4),
(190, 'Operation Log', '', 1, 0, '2021-09-13 15:50:42.170340', 4),
(191, 'Operation Log', '', 1, 0, '2021-09-13 16:11:27.108525', 4),
(192, 'Operation Log', '', 2, 0, '2021-09-14 07:58:39.376279', 4),
(193, 'Operation Log', '', 6, 0, '2021-09-14 07:58:41.556331', 4),
(194, 'Operation Log', '', 1, 0, '2021-09-14 07:58:41.666379', 4),
(195, 'Operation Log', '', 1, 0, '2021-09-14 07:59:44.966706', 4),
(196, 'Operation Log', '', 1, 0, '2021-09-14 08:02:29.725744', 4),
(197, 'Operation Log', '', 1, 0, '2021-09-14 08:02:29.777748', 4),
(198, 'Operation Log', '', 1, 0, '2021-09-14 08:04:06.767670', 4),
(199, 'Operation Log', '', 1, 0, '2021-09-14 08:04:12.797066', 4),
(200, 'Operation Log', '', 1, 0, '2021-09-14 08:04:18.232862', 4),
(201, 'Operation Log', '', 1, 0, '2021-09-14 08:04:20.251765', 4),
(202, 'Operation Log', '', 1, 0, '2021-09-14 08:04:20.293150', 4),
(203, 'Operation Log', '', 1, 0, '2021-09-14 08:04:22.132665', 4),
(204, 'Operation Log', '', 1, 0, '2021-09-14 08:04:37.195677', 4),
(205, 'Operation Log', '', 1, 0, '2021-09-14 08:04:40.398014', 4),
(206, 'Operation Log', '', 2, 0, '2021-09-14 08:04:42.932330', 4),
(207, 'Operation Log', '', 1, 0, '2021-09-14 08:04:42.999334', 4),
(208, 'Operation Log', '', 1, 0, '2021-09-14 12:07:00.906654', 4),
(209, 'Operation Log', '', 1, 0, '2021-09-14 13:05:27.370142', 4),
(210, 'Operation Log', '', 1, 0, '2021-09-14 13:05:33.489006', 4),
(211, 'Operation Log', '', 1, 0, '2021-09-14 13:06:24.495777', 4),
(212, 'Operation Log', '', 1, 0, '2021-09-14 13:37:17.169363', 4),
(213, 'Operation Log', '', 1, 0, '2021-09-14 13:37:17.540008', 4),
(214, 'Operation Log', '', 1, 0, '2021-09-14 13:37:18.604614', 4),
(215, 'Operation Log', '', 1, 0, '2021-09-14 13:37:19.770405', 4),
(216, 'Operation Log', '', 1, 0, '2021-09-14 13:37:20.760938', 4),
(217, 'Operation Log', '', 1, 0, '2021-09-14 13:37:27.240582', 4),
(218, 'Operation Log', '', 2, 0, '2021-09-15 10:23:50.560138', 4),
(219, 'User', '10', 1, 0, '2021-09-15 10:24:00.060343', 4),
(220, 'Operation Log', '', 1, 0, '2021-09-15 10:24:00.720604', 4),
(221, 'Fingerprint Create', '10', 1, 0, '2021-09-15 10:24:02.274194', 4),
(222, 'Operation Log', '', 12, 0, '2021-09-15 10:24:05.660368', 4);

-- --------------------------------------------------------

--
-- Table structure for table `iclock_terminalworkcode`
--

CREATE TABLE `iclock_terminalworkcode` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `code` varchar(8) NOT NULL,
  `alias` varchar(24) NOT NULL,
  `last_activity` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `iclock_transaction`
--

CREATE TABLE `iclock_transaction` (
  `id` int(11) NOT NULL,
  `emp_code` varchar(20) NOT NULL,
  `punch_time` datetime(6) NOT NULL,
  `punch_state` varchar(5) NOT NULL,
  `verify_type` int(11) NOT NULL,
  `work_code` varchar(20) DEFAULT NULL,
  `terminal_sn` varchar(50) DEFAULT NULL,
  `terminal_alias` varchar(50) DEFAULT NULL,
  `area_alias` varchar(30) DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `gps_location` longtext DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `source` smallint(6) DEFAULT NULL,
  `purpose` smallint(6) DEFAULT NULL,
  `crc` varchar(100) DEFAULT NULL,
  `is_attendance` smallint(6) DEFAULT NULL,
  `reserved` varchar(100) DEFAULT NULL,
  `upload_time` datetime(6) DEFAULT NULL,
  `sync_status` smallint(6) DEFAULT NULL,
  `sync_time` datetime(6) DEFAULT NULL,
  `is_mask` smallint(6) DEFAULT NULL,
  `temperature` decimal(4,1) DEFAULT NULL,
  `emp_id` int(11) DEFAULT NULL,
  `terminal_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `iclock_transaction`
--

INSERT INTO `iclock_transaction` (`id`, `emp_code`, `punch_time`, `punch_state`, `verify_type`, `work_code`, `terminal_sn`, `terminal_alias`, `area_alias`, `longitude`, `latitude`, `gps_location`, `mobile`, `source`, `purpose`, `crc`, `is_attendance`, `reserved`, `upload_time`, `sync_status`, `sync_time`, `is_mask`, `temperature`, `emp_id`, `terminal_id`) VALUES
(1, '1', '2021-08-03 10:16:56.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABAAABAGAFAGA', 1, NULL, '2021-08-03 10:17:05.279334', NULL, NULL, 255, '255.0', NULL, NULL),
(2, '1', '2021-08-03 11:25:17.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABABACAFABAHA', 1, NULL, '2021-08-03 11:25:25.613228', NULL, NULL, 255, '255.0', 45, NULL),
(3, '2', '2021-08-03 11:25:20.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABABACAFACAAA', 1, NULL, '2021-08-03 11:25:28.803926', NULL, NULL, 255, '255.0', 46, NULL),
(4, '1', '2021-08-03 11:26:44.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABABACAGAEAEA', 1, NULL, '2021-08-03 11:26:52.158309', NULL, NULL, 255, '255.0', 45, NULL),
(5, '2', '2021-08-03 12:51:04.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABACAFABAAAEA', 1, NULL, '2021-08-03 12:51:12.877640', NULL, NULL, 255, '255.0', 46, NULL),
(6, '1', '2021-08-03 17:07:47.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABAHAAAHAEAHA', 1, NULL, '2021-08-03 17:07:56.037641', NULL, NULL, 255, '255.0', 45, NULL),
(7, '1', '2021-08-03 17:11:39.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABAHABABADAJA', 1, NULL, '2021-08-03 17:11:48.269861', NULL, NULL, 255, '255.0', 45, NULL),
(8, '2', '2021-08-03 17:12:13.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABAHABACABADA', 1, NULL, '2021-08-03 17:12:20.595133', NULL, NULL, 255, '255.0', 46, NULL),
(9, '1', '2021-08-03 17:12:55.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABAHABACAFAFA', 1, NULL, '2021-08-03 17:13:03.860714', NULL, NULL, 255, '255.0', 45, NULL),
(10, '2', '2021-08-03 17:13:18.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABAHABADABAIA', 1, NULL, '2021-08-03 17:13:26.074338', NULL, NULL, 255, '255.0', 46, NULL),
(11, '1', '2021-08-03 17:14:27.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABAHABAEACAHA', 1, NULL, '2021-08-03 17:14:35.337659', NULL, NULL, 255, '255.0', 45, NULL),
(12, '1', '2021-08-03 17:47:22.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABAHAEAHACACA', 1, NULL, '2021-08-03 17:47:30.173487', NULL, NULL, 255, '255.0', 45, NULL),
(13, '2', '2021-08-03 17:47:53.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABAHAEAHAFADA', 1, NULL, '2021-08-03 17:48:00.436431', NULL, NULL, 255, '255.0', 46, NULL),
(14, '1', '2021-08-03 17:48:49.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABAHAEAIAEAJA', 1, NULL, '2021-08-03 17:48:56.641281', NULL, NULL, 255, '255.0', 45, NULL),
(15, '1', '2021-08-03 17:55:16.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABAHAFAFABAGA', 1, NULL, '2021-08-03 17:55:25.336661', NULL, NULL, 255, '255.0', 45, NULL),
(16, '2', '2021-08-03 17:55:36.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABAHAFAFADAGA', 1, NULL, '2021-08-03 17:55:44.448113', NULL, NULL, 255, '255.0', 46, NULL),
(17, '2', '2021-08-03 17:58:42.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAADABAHAFAIAEACA', 1, NULL, '2021-08-03 17:58:50.848834', NULL, NULL, 255, '255.0', 46, NULL),
(18, '1', '2021-08-03 07:41:41.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEAAAHAEABAEABA', 1, NULL, '2021-08-04 07:43:29.407459', NULL, NULL, 255, '255.0', 45, NULL),
(19, '1', '2021-08-03 07:43:51.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEAAAHAEADAFABA', 1, NULL, '2021-08-04 07:43:58.188740', NULL, NULL, 255, '255.0', 45, NULL),
(20, '2', '2021-08-03 07:44:36.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEAAAHAEAEADAGA', 1, NULL, '2021-08-04 07:44:42.334542', NULL, NULL, 255, '255.0', 46, NULL),
(21, '2', '2021-08-03 07:52:27.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEAAAHAFACACAHA', 1, NULL, '2021-08-04 07:52:34.861746', NULL, NULL, 255, '255.0', 46, NULL),
(22, '2', '2021-08-03 07:55:22.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEAAAHAFAFACACA', 1, NULL, '2021-08-04 07:55:29.337162', NULL, NULL, 255, '255.0', 46, NULL),
(23, '3', '2021-08-03 07:56:18.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEAAAHAFAGABAIA', 1, NULL, '2021-08-04 07:56:25.212802', NULL, NULL, 255, '255.0', 47, NULL),
(24, '1', '2021-08-03 08:33:58.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEAAAIADADAFAIA', 1, NULL, '2021-08-04 08:34:05.947686', NULL, NULL, 255, '255.0', 45, NULL),
(25, '2', '2021-08-04 08:34:24.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEAAAIADAEACAEA', 1, NULL, '2021-08-04 08:34:31.247560', NULL, NULL, 255, '255.0', 46, NULL),
(26, '1', '2021-08-03 08:35:01.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEAAAIADAFAAABA', 1, NULL, '2021-08-04 08:35:08.648571', NULL, NULL, 255, '255.0', 45, NULL),
(27, '2', '2021-08-04 08:35:30.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEAAAIADAFADAAA', 1, NULL, '2021-08-04 08:35:36.791225', NULL, NULL, 255, '255.0', 46, NULL),
(28, '1', '2021-08-03 13:16:27.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABADABAGACAHA', 1, NULL, '2021-08-04 13:16:32.633537', NULL, NULL, 255, '255.0', 45, NULL),
(29, '1', '2021-08-03 15:12:11.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFABACABABA', 1, NULL, '2021-08-04 15:12:17.555747', NULL, NULL, 255, '255.0', 45, NULL),
(30, '1', '2021-08-03 15:13:18.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFABADABAIA', 1, NULL, '2021-08-04 15:13:25.063892', NULL, NULL, 255, '255.0', 45, NULL),
(31, '2', '2021-08-03 15:18:45.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFABAIAEAFA', 1, NULL, '2021-08-04 15:18:52.473835', NULL, NULL, 255, '255.0', 46, NULL),
(32, '1', '2021-08-04 15:19:04.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFABAJAAAEA', 1, NULL, '2021-08-04 15:19:10.578726', NULL, NULL, 255, '255.0', 45, NULL),
(33, '20', '2021-08-04 15:25:21.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFACAFACABA', 1, NULL, '2021-08-04 15:25:27.620125', NULL, NULL, 255, '255.0', 55, NULL),
(34, '20', '2021-08-04 15:26:25.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFACAGACAFA', 1, NULL, '2021-08-04 15:26:33.018225', NULL, NULL, 255, '255.0', 55, NULL),
(35, '2', '2021-08-04 15:29:25.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFACAJACAFA', 1, NULL, '2021-08-04 15:29:31.398463', NULL, NULL, 255, '255.0', 46, NULL),
(36, '1', '2021-08-04 15:38:14.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFADAIABAEA', 1, NULL, '2021-08-04 15:38:20.060001', NULL, NULL, 255, '255.0', 45, NULL),
(37, '2', '2021-08-04 15:40:50.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFAEAAAFAAA', 1, NULL, '2021-08-04 15:40:56.816983', NULL, NULL, 255, '255.0', 46, NULL),
(38, '1', '2021-08-04 15:41:20.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFAEABACAAA', 1, NULL, '2021-08-04 15:41:26.006007', NULL, NULL, 255, '255.0', 45, NULL),
(39, '1', '2021-08-04 15:43:44.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFAEADAEAEA', 1, NULL, '2021-08-04 15:43:50.474556', NULL, NULL, 255, '255.0', 45, NULL),
(40, '1', '2021-08-04 15:46:13.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFAEAGABADA', 1, NULL, '2021-08-04 15:46:19.921162', NULL, NULL, 255, '255.0', 45, NULL),
(41, '1', '2021-08-04 15:46:16.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFAEAGABAGA', 1, NULL, '2021-08-04 15:46:22.013130', NULL, NULL, 255, '255.0', 45, NULL),
(42, '1', '2021-08-04 15:46:18.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFAEAGABAIA', 1, NULL, '2021-08-04 15:46:24.107624', NULL, NULL, 255, '255.0', 45, NULL),
(43, '1', '2021-08-04 15:46:20.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFAEAGACAAA', 1, NULL, '2021-08-04 15:46:26.326145', NULL, NULL, 255, '255.0', 45, NULL),
(44, '1', '2021-08-04 15:46:22.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFAEAGACACA', 1, NULL, '2021-08-04 15:46:27.456651', NULL, NULL, 255, '255.0', 45, NULL),
(45, '1', '2021-08-04 15:49:16.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFAEAJABAGA', 1, NULL, '2021-08-04 15:49:22.805196', NULL, NULL, 255, '255.0', 45, NULL),
(46, '1', '2021-08-04 15:49:18.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFAEAJABAIA', 1, NULL, '2021-08-04 15:49:23.910326', NULL, NULL, 255, '255.0', 45, NULL),
(47, '1', '2021-08-04 15:49:21.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFAEAJACABA', 1, NULL, '2021-08-04 15:49:28.000622', NULL, NULL, 255, '255.0', 45, NULL),
(48, '1', '2021-08-04 15:49:25.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFAEAJACAFA', 1, NULL, '2021-08-04 15:49:31.089218', NULL, NULL, 255, '255.0', 45, NULL),
(49, '1', '2021-08-04 15:49:27.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFAEAJACAHA', 1, NULL, '2021-08-04 15:49:34.170020', NULL, NULL, 255, '255.0', 45, NULL),
(50, '2', '2021-08-04 15:52:02.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFAFACAAACA', 1, NULL, '2021-08-04 15:52:07.638375', NULL, NULL, 255, '255.0', 46, NULL),
(51, '1', '2021-08-03 15:52:12.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFAFACABACA', 1, NULL, '2021-08-04 15:52:17.757921', NULL, NULL, 255, '255.0', 45, NULL),
(52, '1', '2021-08-03 15:52:30.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAFAFACADAAA', 1, NULL, '2021-08-04 15:52:36.304712', NULL, NULL, 255, '255.0', 45, NULL),
(53, '20', '2021-08-04 16:06:21.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAGAAAGACABA', 1, NULL, '2021-08-04 16:06:26.250952', NULL, NULL, 255, '255.0', 55, NULL),
(54, '20', '2021-08-04 16:06:45.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAGAAAGAEAFA', 1, NULL, '2021-08-04 16:06:51.387442', NULL, NULL, 255, '255.0', 55, NULL),
(55, '20', '2021-08-04 16:07:11.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAGAAAHABABA', 1, NULL, '2021-08-04 16:07:17.593725', NULL, NULL, 255, '255.0', 55, NULL),
(56, '1', '2021-08-03 17:03:30.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAHAAADADAAA', 1, NULL, '2021-08-04 17:05:56.719060', NULL, NULL, 255, '255.0', 45, NULL),
(57, '1', '2021-08-03 17:04:23.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAHAAAEACADA', 1, NULL, '2021-08-04 17:05:57.138758', NULL, NULL, 255, '255.0', 45, NULL),
(58, '1', '2021-08-03 17:14:49.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAHABAEAEAJA', 1, NULL, '2021-08-04 17:14:55.497814', NULL, NULL, 255, '255.0', 45, NULL),
(59, '1', '2021-08-03 17:16:46.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAHABAGAEAGA', 1, NULL, '2021-08-04 17:16:51.696177', NULL, NULL, 255, '255.0', 45, NULL),
(60, '1', '2021-08-03 17:44:46.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAHAEAEAEAGA', 1, NULL, '2021-08-04 17:44:52.436030', NULL, NULL, 255, '255.0', 45, NULL),
(61, '1', '2021-08-04 17:59:40.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAEABAHAFAJAEAAA', 1, NULL, '2021-08-04 17:59:45.413782', NULL, NULL, 255, '255.0', 45, NULL),
(62, '1', '2021-08-05 07:34:47.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFAAAHADAEAEAHA', 1, NULL, '2021-08-05 07:34:55.812401', NULL, NULL, 255, '255.0', 45, NULL),
(63, '1', '2021-08-05 09:47:53.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFAAAJAEAHAFADA', 1, NULL, '2021-08-05 09:48:00.797681', NULL, NULL, 255, '255.0', 45, NULL),
(64, '1', '2021-08-05 09:50:00.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFAAAJAFAAAAAAA', 1, NULL, '2021-08-05 09:50:07.638708', NULL, NULL, 255, '255.0', 45, NULL),
(65, '1', '2021-08-05 09:58:25.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFAAAJAFAIACAFA', 1, NULL, '2021-08-05 09:58:33.678027', NULL, NULL, 255, '255.0', 45, NULL),
(66, '1', '2021-08-05 09:58:49.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFAAAJAFAIAEAJA', 1, NULL, '2021-08-05 09:58:56.916205', NULL, NULL, 255, '255.0', 45, NULL),
(67, '1', '2021-08-05 10:02:44.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAAAAACAEAEA', 1, NULL, '2021-08-05 10:02:52.297111', NULL, NULL, 255, '255.0', 45, NULL),
(68, '1', '2021-08-05 10:02:46.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAAAAACAEAGA', 1, NULL, '2021-08-05 10:02:55.407134', NULL, NULL, 255, '255.0', 45, NULL),
(69, '1', '2021-08-05 10:02:50.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAAAAACAFAAA', 1, NULL, '2021-08-05 10:02:57.539149', NULL, NULL, 255, '255.0', 45, NULL),
(70, '1', '2021-08-05 10:05:31.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAAAAAFADABA', 1, NULL, '2021-08-05 10:05:38.830173', NULL, NULL, 255, '255.0', 45, NULL),
(71, '2', '2021-08-03 10:05:44.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAAAAAFAEAEA', 1, NULL, '2021-08-05 10:05:51.964435', NULL, NULL, 255, '255.0', 46, NULL),
(72, '2', '2021-08-03 10:08:21.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAAAAAIACABA', 1, NULL, '2021-08-05 10:08:28.583058', NULL, NULL, 255, '255.0', 46, NULL),
(73, '2', '2021-08-05 10:09:20.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAAAAAJACAAA', 1, NULL, '2021-08-05 10:09:27.922814', NULL, NULL, 255, '255.0', 46, NULL),
(74, '2', '2021-08-03 10:09:53.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAAAAAJAFADA', 1, NULL, '2021-08-05 10:10:00.094483', NULL, NULL, 255, '255.0', 46, NULL),
(75, '2', '2021-08-03 10:17:30.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAAABAHADAAA', 1, NULL, '2021-08-05 10:17:37.595265', NULL, NULL, 255, '255.0', 46, NULL),
(76, '2', '2021-08-03 10:20:31.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAAACAAADABA', 1, NULL, '2021-08-05 10:20:38.920432', NULL, NULL, 255, '255.0', 46, NULL),
(77, '2', '2021-08-05 11:17:49.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABABABAHAEAJA', 1, NULL, '2021-08-05 11:17:56.392835', NULL, NULL, 255, '255.0', 46, NULL),
(78, '2', '2021-08-05 11:18:13.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABABABAIABADA', 1, NULL, '2021-08-05 11:18:21.580781', NULL, NULL, 255, '255.0', 46, NULL),
(79, '1', '2021-08-05 13:07:02.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABADAAAHAAACA', 1, NULL, '2021-08-05 13:07:09.879846', NULL, NULL, 255, '255.0', 45, NULL),
(80, '1', '2021-08-05 13:26:55.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABADACAGAFAFA', 1, NULL, '2021-08-05 13:27:01.692321', NULL, NULL, 255, '255.0', 45, NULL),
(81, '1', '2021-08-05 13:58:56.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABADAFAIAFAGA', 1, NULL, '2021-08-05 13:59:49.751615', NULL, NULL, 255, '255.0', 45, NULL),
(82, '1', '2021-08-05 13:59:20.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABADAFAJACAAA', 1, NULL, '2021-08-05 13:59:49.794588', NULL, NULL, 255, '255.0', 45, NULL),
(83, '1', '2021-08-05 13:59:59.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABADAFAJAFAJA', 1, NULL, '2021-08-05 14:00:06.707619', NULL, NULL, 255, '255.0', 45, NULL),
(84, '1', '2021-08-05 14:00:12.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAEAAAAABACA', 1, NULL, '2021-08-05 14:00:19.830900', NULL, NULL, 255, '255.0', 45, NULL),
(85, '1', '2021-08-05 14:00:27.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAEAAAAACAHA', 1, NULL, '2021-08-05 14:00:34.077432', NULL, NULL, 255, '255.0', 45, NULL),
(86, '1', '2021-08-05 14:00:38.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAEAAAAADAIA', 1, NULL, '2021-08-05 14:00:45.254920', NULL, NULL, 255, '255.0', 45, NULL),
(87, '1', '2021-08-05 14:01:04.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAEAAABAAAEA', 1, NULL, '2021-08-05 14:01:11.373772', NULL, NULL, 255, '255.0', 45, NULL),
(88, '1', '2021-08-05 14:02:15.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAEAAACABAFA', 1, NULL, '2021-08-05 14:02:22.623737', NULL, NULL, 255, '255.0', 45, NULL),
(89, '1', '2021-08-05 15:03:51.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAFAAADAFABA', 1, NULL, '2021-08-05 15:03:58.171158', NULL, NULL, 255, '255.0', 45, NULL),
(90, '1', '2021-08-05 15:14:17.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAFABAEABAHA', 1, NULL, '2021-08-05 15:14:24.054743', NULL, NULL, 255, '255.0', 45, NULL),
(91, '1', '2021-08-05 16:11:47.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAFABAGABABAEAHA', 1, NULL, '2021-08-05 16:11:54.334439', NULL, NULL, 255, '255.0', 45, NULL),
(92, '1', '2021-08-23 08:14:00.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACADAAAIABAEAAAAA', 1, NULL, '2021-08-23 08:22:57.312334', NULL, NULL, 255, '255.0', 45, NULL),
(93, '1', '2021-08-23 08:23:31.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACADAAAIACADADABA', 1, NULL, '2021-08-23 08:23:33.759668', NULL, NULL, 255, '255.0', 45, NULL),
(94, '1', '2021-08-23 08:42:14.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACADAAAIAEACABAEA', 1, NULL, '2021-08-23 08:42:15.955482', NULL, NULL, 255, '255.0', 45, NULL),
(95, '1', '2021-08-23 10:50:38.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACADABAAAFAAADAIA', 1, NULL, '2021-08-23 10:50:36.845674', NULL, NULL, 255, '255.0', 45, NULL),
(96, '1', '2021-08-23 10:50:52.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACADABAAAFAAAFACA', 1, NULL, '2021-08-23 10:50:51.370609', NULL, NULL, 255, '255.0', 45, NULL),
(97, '1', '2021-08-23 10:53:19.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACADABAAAFADABAJA', 1, NULL, '2021-08-23 10:53:17.318558', NULL, NULL, 255, '255.0', 45, NULL),
(98, '1', '2021-08-23 10:56:21.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACADABAAAFAGACABA', 1, NULL, '2021-08-23 10:56:19.670885', NULL, NULL, 255, '255.0', 45, NULL),
(99, '2', '2021-08-24 14:01:39.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAEABAEAAABADAJA', 1, NULL, '2021-08-24 14:29:32.836672', NULL, NULL, 255, '255.0', 46, 4),
(100, '1', '2021-08-24 14:01:42.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAEABAEAAABAEACA', 1, NULL, '2021-08-24 14:29:33.721590', NULL, NULL, 255, '255.0', 45, 4),
(101, '1', '2021-08-24 14:09:52.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAEABAEAAAJAFACA', 1, NULL, '2021-08-24 14:29:33.787386', NULL, NULL, 255, '255.0', 45, 4),
(102, '26', '2021-08-06 19:30:05.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAGABAJADAAAAAFA', 1, NULL, '2021-08-24 14:29:36.962627', NULL, NULL, 255, '255.0', 61, 4),
(103, '26', '2021-08-06 19:32:24.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAGABAJADACACAEA', 1, NULL, '2021-08-24 14:29:37.009326', NULL, NULL, 255, '255.0', 61, 4),
(104, '26', '2021-08-06 19:33:48.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAGABAJADADAEAIA', 1, NULL, '2021-08-24 14:29:37.057839', NULL, NULL, 255, '255.0', 61, 4),
(105, '26', '2021-08-06 19:34:03.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAGABAJADAEAAADA', 1, NULL, '2021-08-24 14:29:37.094727', NULL, NULL, 255, '255.0', 61, 4),
(106, '1', '2021-08-07 10:04:48.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABAAAAAEAEAIA', 1, NULL, '2021-08-24 14:29:37.210663', NULL, NULL, 255, '255.0', 45, 4),
(107, '1', '2021-08-07 10:37:16.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABAAADAHABAGA', 1, NULL, '2021-08-24 14:29:37.293669', NULL, NULL, 255, '255.0', 45, 4),
(108, '1', '2021-08-07 10:38:03.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABAAADAIAAADA', 1, NULL, '2021-08-24 14:29:37.343675', NULL, NULL, 255, '255.0', 45, 4),
(109, '1', '2021-08-07 10:38:36.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABAAADAIADAGA', 1, NULL, '2021-08-24 14:29:37.377678', NULL, NULL, 255, '255.0', 45, 4),
(110, '1', '2021-08-07 10:38:51.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABAAADAIAFABA', 1, NULL, '2021-08-24 14:29:37.542947', NULL, NULL, 255, '255.0', 45, 4),
(111, '1', '2021-08-07 10:40:48.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABAAAEAAAEAIA', 1, NULL, '2021-08-24 14:29:37.596013', NULL, NULL, 255, '255.0', 45, 4),
(112, '1', '2021-08-07 12:15:21.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACABAFACABA', 1, NULL, '2021-08-24 14:29:37.644197', NULL, NULL, 255, '255.0', 45, 4),
(113, '1', '2021-08-07 12:16:39.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACABAGADAJA', 1, NULL, '2021-08-24 14:29:37.762721', NULL, NULL, 255, '255.0', 45, 4),
(114, '1', '2021-08-07 12:22:43.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACACACAEADA', 1, NULL, '2021-08-24 14:29:38.044851', NULL, NULL, 255, '255.0', 45, 4),
(115, '1', '2021-08-07 12:25:03.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACACAFAAADA', 1, NULL, '2021-08-24 14:29:38.188747', NULL, NULL, 255, '255.0', 45, 4),
(116, '1', '2021-08-07 12:31:30.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACADABADAAA', 1, NULL, '2021-08-24 14:29:38.294914', NULL, NULL, 255, '255.0', 45, 4),
(117, '1', '2021-08-07 12:35:19.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACADAFABAJA', 1, NULL, '2021-08-24 14:29:38.345499', NULL, NULL, 255, '255.0', 45, 4),
(118, '1', '2021-08-07 12:35:42.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACADAFAEACA', 1, NULL, '2021-08-24 14:29:38.396477', NULL, NULL, 255, '255.0', 45, 4),
(119, '1', '2021-08-07 12:36:09.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACADAGAAAJA', 1, NULL, '2021-08-24 14:29:38.508679', NULL, NULL, 255, '255.0', 45, 4),
(120, '1', '2021-08-07 12:36:46.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACADAGAEAGA', 1, NULL, '2021-08-24 14:29:38.776890', NULL, NULL, 255, '255.0', 45, 4),
(121, '1', '2021-08-07 12:37:54.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACADAHAFAEA', 1, NULL, '2021-08-24 14:29:38.841868', NULL, NULL, 255, '255.0', 45, 4),
(122, '1', '2021-08-07 12:38:10.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACADAIABAAA', 1, NULL, '2021-08-24 14:29:38.929681', NULL, NULL, 255, '255.0', 45, 4),
(123, '1', '2021-08-07 12:39:45.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACADAJAEAFA', 1, NULL, '2021-08-24 14:29:39.158034', NULL, NULL, 255, '255.0', 45, 4),
(124, '1', '2021-08-07 12:40:15.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACAEAAABAFA', 1, NULL, '2021-08-24 14:29:39.240035', NULL, NULL, 255, '255.0', 45, 4),
(125, '1', '2021-08-07 12:40:44.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACAEAAAEAEA', 1, NULL, '2021-08-24 14:29:39.279362', NULL, NULL, 255, '255.0', 45, 4),
(126, '1', '2021-08-07 12:40:56.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACAEAAAFAGA', 1, NULL, '2021-08-24 14:29:39.313009', NULL, NULL, 255, '255.0', 45, 4),
(127, '1', '2021-08-07 12:41:29.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACAEABACAJA', 1, NULL, '2021-08-24 14:29:39.346179', NULL, NULL, 255, '255.0', 45, 4),
(128, '1', '2021-08-07 12:41:37.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACAEABADAHA', 1, NULL, '2021-08-24 14:29:39.381066', NULL, NULL, 255, '255.0', 45, 4),
(129, '1', '2021-08-07 12:41:45.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACAEABAEAFA', 1, NULL, '2021-08-24 14:29:39.411057', NULL, NULL, 255, '255.0', 45, 4),
(130, '1', '2021-08-07 12:41:52.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACAEABAFACA', 1, NULL, '2021-08-24 14:29:39.448246', NULL, NULL, 255, '255.0', 45, 4),
(131, '1', '2021-08-07 12:42:00.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACAEACAAAAA', 1, NULL, '2021-08-24 14:29:39.480250', NULL, NULL, 255, '255.0', 45, 4),
(132, '1', '2021-08-07 12:58:30.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACAFAIADAAA', 1, NULL, '2021-08-24 14:29:39.512417', NULL, NULL, 255, '255.0', 45, 4),
(133, '1', '2021-08-07 12:59:46.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABACAFAJAEAGA', 1, NULL, '2021-08-24 14:29:39.538952', NULL, NULL, 255, '255.0', 45, 4),
(134, '1', '2021-08-07 13:00:13.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADAAAAABADA', 1, NULL, '2021-08-24 14:29:39.695178', NULL, NULL, 255, '255.0', 45, 4),
(135, '1', '2021-08-07 13:00:15.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADAAAAABAFA', 1, NULL, '2021-08-24 14:29:39.853709', NULL, NULL, 255, '255.0', 45, 4),
(136, '1', '2021-08-07 13:00:32.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADAAAAADACA', 1, NULL, '2021-08-24 14:29:39.965718', NULL, NULL, 255, '255.0', 45, 4),
(137, '1', '2021-08-07 13:00:42.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADAAAAAEACA', 1, NULL, '2021-08-24 14:29:40.050724', NULL, NULL, 255, '255.0', 45, 4),
(138, '1', '2021-08-07 13:00:53.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADAAAAAFADA', 1, NULL, '2021-08-24 14:29:40.129732', NULL, NULL, 255, '255.0', 45, 4),
(139, '1', '2021-08-07 13:00:59.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADAAAAAFAJA', 1, NULL, '2021-08-24 14:29:40.420598', NULL, NULL, 255, '255.0', 45, 4),
(140, '1', '2021-08-07 13:01:07.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADAAABAAAHA', 1, NULL, '2021-08-24 14:29:40.544113', NULL, NULL, 255, '255.0', 45, 4),
(141, '1', '2021-08-07 13:01:16.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADAAABABAGA', 1, NULL, '2021-08-24 14:29:40.638842', NULL, NULL, 255, '255.0', 45, 4),
(142, '1', '2021-08-07 13:16:39.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADABAGADAJA', 1, NULL, '2021-08-24 14:29:40.671407', NULL, NULL, 255, '255.0', 45, 4),
(143, '1', '2021-08-07 13:17:52.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADABAHAFACA', 1, NULL, '2021-08-24 14:29:40.705461', NULL, NULL, 255, '255.0', 45, 4),
(144, '1', '2021-08-07 13:18:08.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADABAIAAAIA', 1, NULL, '2021-08-24 14:29:40.765592', NULL, NULL, 255, '255.0', 45, 4),
(145, '1', '2021-08-07 13:18:20.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADABAIACAAA', 1, NULL, '2021-08-24 14:29:40.905740', NULL, NULL, 255, '255.0', 45, 4),
(146, '1', '2021-08-07 13:19:09.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADABAJAAAJA', 1, NULL, '2021-08-24 14:29:40.995181', NULL, NULL, 255, '255.0', 45, 4),
(147, '1', '2021-08-07 13:19:34.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADABAJADAEA', 1, NULL, '2021-08-24 14:29:41.036557', NULL, NULL, 255, '255.0', 45, 4),
(148, '1', '2021-08-07 13:20:11.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADACAAABABA', 1, NULL, '2021-08-24 14:29:41.078538', NULL, NULL, 255, '255.0', 45, 4),
(149, '1', '2021-08-07 13:20:18.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADACAAABAIA', 1, NULL, '2021-08-24 14:29:41.121213', NULL, NULL, 255, '255.0', 45, 4),
(150, '1', '2021-08-07 13:23:02.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADACADAAACA', 1, NULL, '2021-08-24 14:29:41.154257', NULL, NULL, 255, '255.0', 45, 4),
(151, '1', '2021-08-07 13:38:18.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABADADAIABAIA', 1, NULL, '2021-08-24 14:29:41.229491', NULL, NULL, 255, '255.0', 45, 4),
(152, '2', '2021-08-07 14:16:05.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABAEABAGAAAFA', 1, NULL, '2021-08-24 14:29:41.278623', NULL, NULL, 255, '255.0', 46, 4),
(153, '2', '2021-08-07 14:17:01.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABAEABAHAAABA', 1, NULL, '2021-08-24 14:29:41.332524', NULL, NULL, 255, '255.0', 46, 4),
(154, '2', '2021-08-07 14:17:07.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABAEABAHAAAHA', 1, NULL, '2021-08-24 14:29:41.379578', NULL, NULL, 255, '255.0', 46, 4),
(155, '2', '2021-08-07 14:17:34.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABAEABAHADAEA', 1, NULL, '2021-08-24 14:29:41.428588', NULL, NULL, 255, '255.0', 46, 4),
(156, '2', '2021-08-07 14:17:42.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABAEABAHAEACA', 1, NULL, '2021-08-24 14:29:41.508139', NULL, NULL, 255, '255.0', 46, 4),
(157, '2', '2021-08-07 14:17:52.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABAEABAHAFACA', 1, NULL, '2021-08-24 14:29:41.682077', NULL, NULL, 255, '255.0', 46, 4),
(158, '2', '2021-08-07 14:18:34.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABAEABAIADAEA', 1, NULL, '2021-08-24 14:29:41.889986', NULL, NULL, 255, '255.0', 46, 4),
(159, '2', '2021-08-07 14:19:47.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIAAAHABAEABAJAEAHA', 1, NULL, '2021-08-24 14:29:41.929601', NULL, NULL, 255, '255.0', 46, 4),
(160, '1', '2021-08-10 14:59:00.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIABAAABAEAFAJAAAAA', 1, NULL, '2021-08-24 14:29:41.953605', NULL, NULL, 255, '255.0', 45, 4),
(161, '1', '2021-08-10 15:00:35.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIABAAABAFAAAAADAFA', 1, NULL, '2021-08-24 14:29:41.986788', NULL, NULL, 255, '255.0', 45, 4),
(162, '1', '2021-08-10 15:00:41.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIABAAABAFAAAAAEABA', 1, NULL, '2021-08-24 14:29:42.021613', NULL, NULL, 255, '255.0', 45, 4),
(163, '2', '2021-08-10 15:01:57.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIABAAABAFAAABAFAHA', 1, NULL, '2021-08-24 14:29:42.054623', NULL, NULL, 255, '255.0', 46, 4),
(164, '2', '2021-08-10 15:02:46.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIABAAABAFAAACAEAGA', 1, NULL, '2021-08-24 14:29:42.103629', NULL, NULL, 255, '255.0', 46, 4),
(175, '1', '2021-08-24 14:33:20.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAEABAEADADACAAA', 1, NULL, '2021-08-24 14:33:19.867293', NULL, NULL, 255, '255.0', 45, 4),
(176, '1', '2021-08-24 14:33:56.000000', '2', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAEABAEADADAFAGA', 1, NULL, '2021-08-24 14:33:54.095397', NULL, NULL, 255, '255.0', 45, 4),
(177, '1', '2021-08-24 14:35:41.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAEABAEADAFAEABA', 1, NULL, '2021-08-24 14:35:41.379658', NULL, NULL, 255, '255.0', 45, 4),
(178, '1', '2021-08-24 14:36:36.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAEABAEADAGADAGA', 1, NULL, '2021-08-24 14:36:35.669505', NULL, NULL, 255, '255.0', 45, 4),
(179, '1', '2021-08-24 15:27:04.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAEABAFACAHAAAEA', 1, NULL, '2021-08-24 15:27:03.539492', NULL, NULL, 255, '255.0', 45, 4),
(180, '1', '2021-08-24 15:27:07.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAEABAFACAHAAAHA', 1, NULL, '2021-08-24 15:27:05.665623', NULL, NULL, 255, '255.0', 45, 4),
(181, '1', '2021-08-25 13:38:35.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAFABADADAIADAFA', 1, NULL, '2021-08-25 13:38:33.697812', NULL, NULL, 255, '255.0', 45, 4),
(182, '2', '2021-08-25 14:06:21.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAFABAEAAAGACABA', 1, NULL, '2021-08-25 14:06:19.704881', NULL, NULL, 255, '255.0', 46, 4),
(183, '1', '2021-08-25 15:05:17.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAFABAFAAAFABAHA', 1, NULL, '2021-08-25 15:05:16.895714', NULL, NULL, 255, '255.0', 45, 4),
(184, '1', '2021-08-25 15:05:19.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAFABAFAAAFABAJA', 1, NULL, '2021-08-25 15:05:18.913879', NULL, NULL, 255, '255.0', 45, 4),
(185, '2', '2021-08-25 16:13:39.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAFABAGABADADAJA', 1, NULL, '2021-08-25 16:13:37.952696', NULL, NULL, 255, '255.0', 46, 4),
(186, '1', '2021-08-26 07:29:04.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAGAAAHACAJAAAEA', 1, NULL, '2021-08-26 07:35:59.859598', NULL, NULL, 255, '255.0', 45, 4),
(187, '2', '2021-08-26 07:40:18.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAGAAAHAEAAABAIA', 1, NULL, '2021-08-26 07:40:18.688662', NULL, NULL, 255, '255.0', 46, 4),
(188, '5', '2021-08-26 10:55:24.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAGABAAAFAFACAEA', 1, NULL, '2021-08-26 10:55:23.689595', NULL, NULL, 255, '255.0', 49, 4),
(189, '2', '2021-08-26 14:59:45.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAGABAEAFAJAEAFA', 1, NULL, '2021-08-26 15:00:19.049583', NULL, NULL, 255, '255.0', 46, 4),
(190, '1', '2021-08-27 07:32:57.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAHAAAHADACAFAHA', 1, NULL, '2021-08-27 07:36:05.123864', NULL, NULL, 255, '255.0', 45, 4),
(191, '2', '2021-08-27 09:05:49.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAHAAAJAAAFAEAJA', 1, NULL, '2021-08-27 09:05:49.512599', NULL, NULL, 255, '255.0', 46, 4),
(192, '1', '2021-08-27 16:04:07.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIACAHABAGAAAEAAAHA', 1, NULL, '2021-08-27 16:05:40.158330', NULL, NULL, 255, '255.0', 45, 4),
(193, '1', '2021-08-31 07:41:10.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABAAAHAEABABAAA', 1, NULL, '2021-08-31 07:41:13.146046', NULL, NULL, 255, '255.0', 45, 4),
(194, '2', '2021-08-31 07:44:03.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABAAAHAEAEAAADA', 1, NULL, '2021-08-31 07:44:06.005280', NULL, NULL, 255, '255.0', 46, 4),
(195, '2', '2021-08-31 09:33:01.000000', '3', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABAAAJADADAAABA', 1, NULL, '2021-08-31 09:33:03.273597', NULL, NULL, 255, '255.0', 46, 4),
(196, '2', '2021-08-31 09:33:10.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABAAAJADADABAAA', 1, NULL, '2021-08-31 09:33:10.918341', NULL, NULL, 255, '255.0', 46, 4),
(197, '1', '2021-08-31 09:33:12.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABAAAJADADABACA', 1, NULL, '2021-08-31 09:33:13.180406', NULL, NULL, 255, '255.0', 45, 4),
(198, '1', '2021-08-31 09:41:08.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABAAAJAEABAAAIA', 1, NULL, '2021-08-31 09:41:09.366058', NULL, NULL, 255, '255.0', 45, 4),
(199, '1', '2021-08-31 09:50:58.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABAAAJAFAAAFAIA', 1, NULL, '2021-08-31 09:51:00.382140', NULL, NULL, 255, '255.0', 45, 4),
(200, '1', '2021-08-31 09:58:35.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABAAAJAFAIADAFA', 1, NULL, '2021-08-31 09:58:36.046460', NULL, NULL, 255, '255.0', 45, 4),
(201, '1', '2021-08-31 10:00:08.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABABAAAAAAAAAIA', 1, NULL, '2021-08-31 10:00:10.333634', NULL, NULL, 255, '255.0', 45, 4),
(202, '1', '2021-08-31 10:02:31.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABABAAAAACADABA', 1, NULL, '2021-08-31 10:02:31.600130', NULL, NULL, 255, '255.0', 45, 4),
(203, '2', '2021-08-31 10:02:51.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABABAAAAACAFABA', 1, NULL, '2021-08-31 10:02:52.779125', NULL, NULL, 255, '255.0', 46, 4),
(204, '1', '2021-08-31 10:06:03.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABABAAAAAGAAADA', 1, NULL, '2021-08-31 10:06:04.844585', NULL, NULL, 255, '255.0', 45, 4),
(205, '1', '2021-08-31 10:08:33.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABABAAAAAIADADA', 1, NULL, '2021-08-31 10:08:34.247128', NULL, NULL, 255, '255.0', 45, 4),
(206, '1', '2021-08-31 10:13:26.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABABAAABADACAGA', 1, NULL, '2021-08-31 10:13:26.774354', NULL, NULL, 255, '255.0', 45, 4),
(207, '2', '2021-08-31 10:13:49.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABABAAABADAEAJA', 1, NULL, '2021-08-31 10:13:50.900922', NULL, NULL, 255, '255.0', 46, 4),
(208, '2', '2021-08-31 10:14:22.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABABAAABAEACACA', 1, NULL, '2021-08-31 10:14:24.044140', NULL, NULL, 255, '255.0', 46, 4),
(209, '2', '2021-08-31 10:14:41.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABABAAABAEAEABA', 1, NULL, '2021-08-31 10:14:42.350484', NULL, NULL, 255, '255.0', 46, 4),
(210, '1', '2021-08-31 10:15:44.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABABAAABAFAEAEA', 1, NULL, '2021-08-31 10:15:45.523855', NULL, NULL, 255, '255.0', 45, 4),
(211, '1', '2021-08-31 10:16:00.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABABAAABAGAAAAA', 1, NULL, '2021-08-31 10:16:02.029472', NULL, NULL, 255, '255.0', 45, 4),
(212, '2', '2021-08-31 15:47:12.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABABAFAEAHABACA', 1, NULL, '2021-08-31 15:47:13.091913', NULL, NULL, 255, '255.0', 46, 4),
(213, '21', '2021-08-31 16:03:33.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAIADABABAGAAADADADA', 1, NULL, '2021-08-31 16:03:33.826617', NULL, NULL, 255, '255.0', 56, 4),
(214, '1', '2021-09-01 07:20:02.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAABAAAHACAAAAACA', 1, NULL, '2021-09-01 08:56:12.351652', NULL, NULL, 255, '255.0', 45, 4),
(215, '2', '2021-09-01 07:20:08.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAABAAAHACAAAAAIA', 1, NULL, '2021-09-01 08:56:12.692758', NULL, NULL, 255, '255.0', 46, 4),
(216, '2', '2021-09-01 15:19:37.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAABABAFABAJADAHA', 1, NULL, '2021-09-01 15:19:39.906727', NULL, NULL, 255, '255.0', 46, 4),
(217, '3', '2021-09-01 15:36:10.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAABABAFADAGABAAA', 1, NULL, '2021-09-01 15:36:12.839391', NULL, NULL, 255, '255.0', 47, 4),
(218, '2', '2021-09-02 07:27:30.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAACAAAHACAHADAAA', 1, NULL, '2021-09-02 07:35:36.909190', NULL, NULL, 255, '255.0', 46, 4),
(219, '1', '2021-09-02 07:27:41.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAACAAAHACAHAEABA', 1, NULL, '2021-09-02 07:35:37.285009', NULL, NULL, 255, '255.0', 45, 4),
(220, '3', '2021-09-02 07:27:43.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAACAAAHACAHAEADA', 1, NULL, '2021-09-02 07:35:37.347830', NULL, NULL, 255, '255.0', 47, 4),
(221, '2', '2021-09-02 19:58:29.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAACABAEAFAIACAJA', 1, NULL, '2021-09-02 14:58:31.239812', NULL, NULL, 255, '255.0', 46, 4),
(222, '3', '2021-09-02 14:59:15.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAACABAEAFAJABAFA', 1, NULL, '2021-09-02 14:59:17.915703', NULL, NULL, 255, '255.0', 47, 4),
(223, '1', '2021-09-02 15:15:28.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAACABAFABAFACAIA', 1, NULL, '2021-09-02 15:15:29.978326', NULL, NULL, 255, '255.0', 45, 4),
(224, '1', '2021-09-02 15:49:10.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAACABAFAEAJABAAA', 1, NULL, '2021-09-02 15:49:11.941126', NULL, NULL, 255, '255.0', 45, 4),
(225, '2', '2021-09-02 15:56:21.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAACABAFAFAGACABA', 1, NULL, '2021-09-02 15:56:23.555411', NULL, NULL, 255, '255.0', 46, 4),
(226, '2', '2021-09-02 15:56:30.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAACABAFAFAGADAAA', 1, NULL, '2021-09-02 15:56:32.677676', NULL, NULL, 255, '255.0', 46, 4),
(227, '1', '2021-09-02 16:03:03.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAACABAGAAADAAADA', 1, NULL, '2021-09-02 16:03:05.516764', NULL, NULL, 255, '255.0', 45, 4),
(228, '2', '2021-09-02 16:03:06.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAACABAGAAADAAAGA', 1, NULL, '2021-09-02 16:03:07.013963', NULL, NULL, 255, '255.0', 46, 4),
(229, '3', '2021-09-02 16:03:08.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAACABAGAAADAAAIA', 1, NULL, '2021-09-02 16:03:10.179610', NULL, NULL, 255, '255.0', 47, 4),
(230, '1', '2021-09-03 07:30:27.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAADAAAHADAAACAHA', 1, NULL, '2021-09-03 07:34:27.417053', NULL, NULL, 255, '255.0', 45, 4);
INSERT INTO `iclock_transaction` (`id`, `emp_code`, `punch_time`, `punch_state`, `verify_type`, `work_code`, `terminal_sn`, `terminal_alias`, `area_alias`, `longitude`, `latitude`, `gps_location`, `mobile`, `source`, `purpose`, `crc`, `is_attendance`, `reserved`, `upload_time`, `sync_status`, `sync_time`, `is_mask`, `temperature`, `emp_id`, `terminal_id`) VALUES
(231, '2', '2021-09-03 07:30:29.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAADAAAHADAAACAJA', 1, NULL, '2021-09-03 07:34:27.473340', NULL, NULL, 255, '255.0', 46, 4),
(232, '3', '2021-09-03 07:30:32.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAADAAAHADAAADACA', 1, NULL, '2021-09-03 07:34:27.549604', NULL, NULL, 255, '255.0', 47, 4),
(233, '4', '2021-09-03 09:43:55.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAADAAAJAEADAFAFA', 1, NULL, '2021-09-03 09:43:57.398862', NULL, NULL, 255, '255.0', 48, 4),
(234, '2', '2021-09-03 14:28:42.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAADABAEACAIAEACA', 1, NULL, '2021-09-03 14:28:44.516179', NULL, NULL, 255, '255.0', 46, 4),
(235, '1', '2021-09-03 14:28:46.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAADABAEACAIAEAGA', 1, NULL, '2021-09-03 14:28:48.984058', NULL, NULL, 255, '255.0', 45, 4),
(236, '2', '2021-09-03 15:57:40.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAADABAFAFAHAEAAA', 1, NULL, '2021-09-03 15:57:43.527999', NULL, NULL, 255, '255.0', 46, 4),
(237, '1', '2021-09-03 15:57:42.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAADABAFAFAHAEACA', 1, NULL, '2021-09-03 15:57:48.726354', NULL, NULL, 255, '255.0', 45, 4),
(238, '2', '2021-09-03 15:57:48.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAADABAFAFAHAEAIA', 1, NULL, '2021-09-03 15:57:50.338481', NULL, NULL, 255, '255.0', 46, 4),
(239, '2', '2021-09-03 15:57:57.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAADABAFAFAHAFAHA', 1, NULL, '2021-09-03 15:57:58.410624', NULL, NULL, 255, '255.0', 46, 4),
(240, '1', '2021-09-03 15:58:00.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAADABAFAFAIAAAAA', 1, NULL, '2021-09-03 15:58:01.624630', NULL, NULL, 255, '255.0', 45, 4),
(241, '3', '2021-09-03 15:58:02.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAADABAFAFAIAAACA', 1, NULL, '2021-09-03 15:58:03.781652', NULL, NULL, 255, '255.0', 47, 4),
(242, '1', '2021-09-06 08:37:05.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAGAAAIADAHAAAFA', 1, NULL, '2021-09-06 08:37:07.577453', NULL, NULL, 255, '255.0', 45, 4),
(243, '2', '2021-09-06 08:37:08.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAGAAAIADAHAAAIA', 1, NULL, '2021-09-06 08:37:12.427309', NULL, NULL, 255, '255.0', 46, 4),
(244, '4', '2021-09-06 08:37:10.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAGAAAIADAHABAAA', 1, NULL, '2021-09-06 08:37:15.370023', NULL, NULL, 255, '255.0', 48, 4),
(245, '3', '2021-09-06 08:37:13.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAGAAAIADAHABADA', 1, NULL, '2021-09-06 08:37:17.817725', NULL, NULL, 255, '255.0', 47, 4),
(246, '2', '2021-09-06 13:29:04.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAGABADACAJAAAEA', 1, NULL, '2021-09-06 13:29:06.713853', NULL, NULL, 255, '255.0', 46, 4),
(247, '2', '2021-09-06 13:29:34.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAGABADACAJADAEA', 1, NULL, '2021-09-06 13:29:35.918904', NULL, NULL, 255, '255.0', 46, 4),
(248, '3', '2021-09-06 15:15:52.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAGABAFABAFAFACA', 1, NULL, '2021-09-06 15:17:17.070560', NULL, NULL, 255, '255.0', 47, 4),
(249, '4', '2021-09-06 15:15:55.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAGABAFABAFAFAFA', 1, NULL, '2021-09-06 15:17:21.224980', NULL, NULL, 255, '255.0', 48, 4),
(250, '2', '2021-09-06 15:19:06.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAGABAFABAJAAAGA', 1, NULL, '2021-09-06 15:19:08.145101', NULL, NULL, 255, '255.0', 46, 4),
(251, '2', '2021-09-06 15:19:09.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAGABAFABAJAAAJA', 1, NULL, '2021-09-06 15:19:10.838057', NULL, NULL, 255, '255.0', 46, 4),
(252, '1', '2021-09-07 07:10:17.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAHAAAHABAAABAHA', 1, NULL, '2021-09-07 07:26:13.655394', NULL, NULL, 255, '255.0', 45, 4),
(253, '2', '2021-09-07 07:10:20.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAHAAAHABAAACAAA', 1, NULL, '2021-09-07 07:26:14.823617', NULL, NULL, 255, '255.0', 46, 4),
(254, '3', '2021-09-07 07:10:28.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAHAAAHABAAACAIA', 1, NULL, '2021-09-07 07:26:14.889047', NULL, NULL, 255, '255.0', 47, 4),
(255, '4', '2021-09-07 07:10:30.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAHAAAHABAAADAAA', 1, NULL, '2021-09-07 07:26:14.940065', NULL, NULL, 255, '255.0', 48, 4),
(256, '3', '2021-09-07 14:59:30.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAHABAEAFAJADAAA', 1, NULL, '2021-09-07 16:06:58.691623', NULL, NULL, 255, '255.0', 47, 4),
(257, '2', '2021-09-07 14:59:32.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAHABAEAFAJADACA', 1, NULL, '2021-09-07 16:07:06.096877', NULL, NULL, 255, '255.0', 46, 4),
(258, '3', '2021-09-07 14:59:39.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAHABAEAFAJADAJA', 1, NULL, '2021-09-07 16:07:06.364623', NULL, NULL, 255, '255.0', 47, 4),
(259, '1', '2021-09-07 14:59:42.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAHABAEAFAJAEACA', 1, NULL, '2021-09-07 16:07:06.636727', NULL, NULL, 255, '255.0', 45, 4),
(260, '1', '2021-09-08 07:07:08.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAIAAAHAAAHAAAIA', 1, NULL, '2021-09-08 07:37:42.660568', NULL, NULL, 255, '255.0', 45, 4),
(261, '3', '2021-09-08 07:07:11.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAIAAAHAAAHABABA', 1, NULL, '2021-09-08 07:37:43.516102', NULL, NULL, 255, '255.0', 47, 4),
(262, '4', '2021-09-08 07:07:13.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAIAAAHAAAHABADA', 1, NULL, '2021-09-08 07:37:43.588487', NULL, NULL, 255, '255.0', 48, 4),
(263, '2', '2021-09-08 07:07:16.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAIAAAHAAAHABAGA', 1, NULL, '2021-09-08 07:37:43.983246', NULL, NULL, 255, '255.0', 46, 4),
(264, '21', '2021-09-08 07:26:22.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAIAAAHACAGACACA', 1, NULL, '2021-09-08 07:37:44.293121', NULL, NULL, 255, '255.0', 56, 4),
(265, '4', '2021-09-08 07:46:05.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAIAAAHAEAGAAAFA', 1, NULL, '2021-09-08 07:46:07.751837', NULL, NULL, 255, '255.0', 48, 4),
(266, '2', '2021-09-08 15:32:06.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAIABAFADACAAAGA', 1, NULL, '2021-09-08 15:58:20.069102', NULL, NULL, 255, '255.0', 46, 4),
(267, '1', '2021-09-08 15:32:08.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAIABAFADACAAAIA', 1, NULL, '2021-09-08 15:58:25.522213', NULL, NULL, 255, '255.0', 45, 4),
(268, '3', '2021-09-08 15:32:10.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAIABAFADACABAAA', 1, NULL, '2021-09-08 15:58:26.147033', NULL, NULL, 255, '255.0', 47, 4),
(269, '4', '2021-09-08 15:32:12.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAIABAFADACABACA', 1, NULL, '2021-09-08 15:58:26.222991', NULL, NULL, 255, '255.0', 48, 4),
(270, '1', '2021-09-08 15:32:16.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAIABAFADACABAGA', 1, NULL, '2021-09-08 15:58:26.548002', NULL, NULL, 255, '255.0', 45, 4),
(271, '1', '2021-09-09 08:34:33.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJAAAIADAEADADA', 1, NULL, '2021-09-09 09:31:42.922863', NULL, NULL, 255, '255.0', 45, 4),
(272, '2', '2021-09-09 08:34:37.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJAAAIADAEADAHA', 1, NULL, '2021-09-09 09:31:47.172859', NULL, NULL, 255, '255.0', 46, 4),
(273, '3', '2021-09-09 08:34:39.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJAAAIADAEADAJA', 1, NULL, '2021-09-09 09:31:47.480928', NULL, NULL, 255, '255.0', 47, 4),
(274, '4', '2021-09-09 08:34:42.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJAAAIADAEAEACA', 1, NULL, '2021-09-09 09:31:47.740988', NULL, NULL, 255, '255.0', 48, 4),
(275, '2', '2021-09-09 14:56:22.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAEAFAGACACA', 1, NULL, '2021-09-09 14:58:26.198777', NULL, NULL, 255, '255.0', 46, 4),
(276, '1', '2021-09-09 14:56:24.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAEAFAGACAEA', 1, NULL, '2021-09-09 14:58:28.744827', NULL, NULL, 255, '255.0', 45, 4),
(277, '3', '2021-09-09 14:56:26.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAEAFAGACAGA', 1, NULL, '2021-09-09 14:58:29.060985', NULL, NULL, 255, '255.0', 47, 4),
(278, '4', '2021-09-09 14:56:27.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAEAFAGACAHA', 1, NULL, '2021-09-09 14:58:29.598963', NULL, NULL, 255, '255.0', 48, 4),
(279, '2', '2021-09-09 14:58:53.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAEAFAIAFADA', 1, NULL, '2021-09-09 14:58:56.855481', NULL, NULL, 255, '255.0', 46, 4),
(280, '2', '2021-09-09 14:58:57.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAEAFAIAFAHA', 1, NULL, '2021-09-09 14:59:00.111200', NULL, NULL, 255, '255.0', 46, 4),
(281, '1', '2021-09-09 14:59:00.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAEAFAJAAAAA', 1, NULL, '2021-09-09 14:59:02.391398', NULL, NULL, 255, '255.0', 45, 4),
(282, '2', '2021-09-09 14:59:09.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAEAFAJAAAJA', 1, NULL, '2021-09-09 14:59:11.633443', NULL, NULL, 255, '255.0', 46, 4),
(283, '1', '2021-09-09 14:59:11.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAEAFAJABABA', 1, NULL, '2021-09-09 14:59:14.819057', NULL, NULL, 255, '255.0', 45, 4),
(284, '3', '2021-09-09 14:59:14.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAEAFAJABAEA', 1, NULL, '2021-09-09 14:59:17.932849', NULL, NULL, 255, '255.0', 47, 4),
(285, '4', '2021-09-09 14:59:17.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAEAFAJABAHA', 1, NULL, '2021-09-09 14:59:20.231236', NULL, NULL, 255, '255.0', 48, 4),
(286, '1', '2021-09-09 15:00:04.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAFAAAAAAAEA', 1, NULL, '2021-09-09 15:00:06.575401', NULL, NULL, 255, '255.0', 45, 4),
(287, '1', '2021-09-09 15:04:31.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAFAAAEADABA', 1, NULL, '2021-09-09 15:04:32.927985', NULL, NULL, 255, '255.0', 45, 4),
(288, '2', '2021-09-09 16:05:59.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAGAAAFAFAJA', 1, NULL, '2021-09-09 16:06:01.960761', NULL, NULL, 255, '255.0', 46, 4),
(289, '1', '2021-09-09 16:06:00.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAGAAAGAAAAA', 1, NULL, '2021-09-09 16:06:04.948135', NULL, NULL, 255, '255.0', 45, 4),
(290, '3', '2021-09-09 16:06:03.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAGAAAGAAADA', 1, NULL, '2021-09-09 16:06:06.482706', NULL, NULL, 255, '255.0', 47, 4),
(291, '4', '2021-09-09 16:06:06.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAGAAAGAAAGA', 1, NULL, '2021-09-09 16:06:08.580293', NULL, NULL, 255, '255.0', 48, 4),
(292, '4', '2021-09-09 16:06:09.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJAAAJABAGAAAGAAAJA', 1, NULL, '2021-09-09 16:06:10.685964', NULL, NULL, 255, '255.0', 48, 4),
(293, '2', '2021-09-10 07:59:26.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAAAAHAFAJACAGA', 1, NULL, '2021-09-10 11:26:56.425154', NULL, NULL, 255, '255.0', 46, 4),
(294, '1', '2021-09-10 07:59:27.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAAAAHAFAJACAHA', 1, NULL, '2021-09-10 11:26:57.286748', NULL, NULL, 255, '255.0', 45, 4),
(295, '3', '2021-09-10 07:59:30.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAAAAHAFAJADAAA', 1, NULL, '2021-09-10 11:26:57.321220', NULL, NULL, 255, '255.0', 47, 4),
(296, '4', '2021-09-10 07:59:32.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAAAAHAFAJADACA', 1, NULL, '2021-09-10 11:26:57.408100', NULL, NULL, 255, '255.0', 48, 4),
(297, '2', '2021-09-10 14:12:50.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAEABACAFAAA', 1, NULL, '2021-09-10 14:12:53.396459', NULL, NULL, 255, '255.0', 46, 4),
(298, '1', '2021-09-10 14:12:52.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAEABACAFACA', 1, NULL, '2021-09-10 14:12:56.278808', NULL, NULL, 255, '255.0', 45, 4),
(299, '1', '2021-09-10 14:12:56.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAEABACAFAGA', 1, NULL, '2021-09-10 14:12:58.493869', NULL, NULL, 255, '255.0', 45, 4),
(300, '1', '2021-09-10 14:12:58.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAEABACAFAIA', 1, NULL, '2021-09-10 14:13:00.748549', NULL, NULL, 255, '255.0', 45, 4),
(301, '20', '2021-09-10 14:21:39.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAEACABADAJA', 1, NULL, '2021-09-10 14:21:42.463206', NULL, NULL, 255, '255.0', 55, 4),
(302, '21', '2021-09-10 14:24:18.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAEACAEABAIA', 1, NULL, '2021-09-10 14:24:20.781508', NULL, NULL, 255, '255.0', 56, 4),
(303, '20', '2021-09-10 14:32:08.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAEADACAAAIA', 1, NULL, '2021-09-10 14:32:11.417801', NULL, NULL, 255, '255.0', 55, 4),
(304, '20', '2021-09-10 14:32:11.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAEADACABABA', 1, NULL, '2021-09-10 14:32:13.558012', NULL, NULL, 255, '255.0', 55, 4),
(305, '20', '2021-09-10 14:32:14.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAEADACABAEA', 1, NULL, '2021-09-10 14:32:15.688691', NULL, NULL, 255, '255.0', 55, 4),
(306, '20', '2021-09-10 14:32:16.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAEADACABAGA', 1, NULL, '2021-09-10 14:32:17.786602', NULL, NULL, 255, '255.0', 55, 4),
(307, '9', '2021-09-10 14:43:43.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAEAEADAEADA', 1, NULL, '2021-09-10 14:43:46.706600', NULL, NULL, 255, '255.0', 53, 4),
(308, '9', '2021-09-10 14:45:13.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAEAEAFABADA', 1, NULL, '2021-09-10 14:45:14.916456', NULL, NULL, 255, '255.0', 53, 4),
(309, '9', '2021-09-10 14:45:27.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAEAEAFACAHA', 1, NULL, '2021-09-10 14:45:29.036454', NULL, NULL, 255, '255.0', 53, 4),
(310, '23', '2021-09-10 14:47:59.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAEAEAHAFAJA', 1, NULL, '2021-09-10 14:48:02.086398', NULL, NULL, 255, '255.0', 58, 4),
(311, '20', '2021-09-10 16:34:10.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAGADAEABAAA', 1, NULL, '2021-09-13 15:12:52.201636', NULL, NULL, 255, '255.0', 55, 4),
(312, '20', '2021-09-10 16:34:13.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAGADAEABADA', 1, NULL, '2021-09-13 15:12:55.155750', NULL, NULL, 255, '255.0', 55, 4),
(313, '20', '2021-09-10 16:34:16.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAAABAGADAEABAGA', 1, NULL, '2021-09-13 15:12:55.237757', NULL, NULL, 255, '255.0', 55, 4),
(314, '20', '2021-09-13 15:18:46.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABADABAFABAIAEAGA', 1, NULL, '2021-09-13 15:18:50.171338', NULL, NULL, 255, '255.0', 55, 4),
(315, '20', '2021-09-13 15:23:38.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABADABAFACADADAIA', 1, NULL, '2021-09-13 15:23:41.554290', NULL, NULL, 255, '255.0', 55, 4),
(316, '20', '2021-09-13 15:34:00.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABADABAFADAEAAAAA', 1, NULL, '2021-09-13 15:34:03.228810', NULL, NULL, 255, '255.0', 55, 4),
(317, '20', '2021-09-13 16:21:01.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABADABAGACABAAABA', 1, NULL, '2021-09-14 07:58:36.976401', NULL, NULL, 255, '255.0', 55, 4),
(318, '20', '2021-09-13 16:20:58.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABADABAGACAAAFAIA', 1, NULL, '2021-09-14 07:58:37.356341', NULL, NULL, 255, '255.0', 55, 4),
(319, '20', '2021-09-13 16:20:55.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABADABAGACAAAFAFA', 1, NULL, '2021-09-14 07:58:37.406300', NULL, NULL, 255, '255.0', 55, 4),
(320, '20', '2021-09-13 16:20:53.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABADABAGACAAAFADA', 1, NULL, '2021-09-14 07:58:37.456665', NULL, NULL, 255, '255.0', 55, 4),
(321, '20', '2021-09-13 16:20:49.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABADABAGACAAAEAJA', 1, NULL, '2021-09-14 07:58:37.526435', NULL, NULL, 255, '255.0', 55, 4),
(322, '20', '2021-09-13 16:20:47.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABADABAGACAAAEAHA', 1, NULL, '2021-09-14 07:58:37.566270', NULL, NULL, 255, '255.0', 55, 4),
(323, '20', '2021-09-13 16:18:43.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABADABAGABAIAEADA', 1, NULL, '2021-09-14 07:58:37.616675', NULL, NULL, 255, '255.0', 55, 4),
(324, '20', '2021-09-13 16:18:40.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABADABAGABAIAEAAA', 1, NULL, '2021-09-14 07:58:37.646150', NULL, NULL, 255, '255.0', 55, 4),
(325, '20', '2021-09-14 07:57:53.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAEAAAHAFAHAFADA', 1, NULL, '2021-09-14 07:58:39.206253', NULL, NULL, 255, '255.0', 55, 4),
(326, '20', '2021-09-14 08:04:42.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAEAAAIAAAEAEACA', 1, NULL, '2021-09-14 08:04:44.567100', NULL, NULL, 255, '255.0', 55, 4),
(327, '20', '2021-09-14 08:04:49.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAEAAAIAAAEAEAJA', 1, NULL, '2021-09-14 08:04:52.683571', NULL, NULL, 255, '255.0', 55, 4),
(328, '20', '2021-09-14 12:07:00.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAEABACAAAHAAAAA', 1, NULL, '2021-09-14 12:07:03.344761', NULL, NULL, 255, '255.0', 55, 4),
(329, '20', '2021-09-14 13:05:29.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAEABADAAAFACAJA', 1, NULL, '2021-09-14 13:05:31.888156', NULL, NULL, 255, '255.0', 55, 4),
(330, '20', '2021-09-14 13:06:20.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAEABADAAAGACAAA', 1, NULL, '2021-09-14 13:06:22.610114', NULL, NULL, 255, '255.0', 55, 4),
(331, '20', '2021-09-14 13:37:21.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAEABADADAHACABA', 1, NULL, '2021-09-14 13:37:22.904558', NULL, NULL, 255, '255.0', 55, 4),
(332, '20', '2021-09-14 13:37:23.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAEABADADAHACADA', 1, NULL, '2021-09-14 13:37:25.096235', NULL, NULL, 255, '255.0', 55, 4),
(333, '4', '2021-09-14 16:30:56.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAEABAGADAAAFAGA', 1, NULL, '2021-09-15 10:23:47.532215', NULL, NULL, 255, '255.0', 48, 4),
(334, '4', '2021-09-14 16:30:53.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAEABAGADAAAFADA', 1, NULL, '2021-09-15 10:23:48.525965', NULL, NULL, 255, '255.0', 48, 4),
(335, '3', '2021-09-14 16:30:50.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAEABAGADAAAFAAA', 1, NULL, '2021-09-15 10:23:48.619869', NULL, NULL, 255, '255.0', 47, 4),
(336, '2', '2021-09-14 16:30:47.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAEABAGADAAAEAHA', 1, NULL, '2021-09-15 10:23:48.694545', NULL, NULL, 255, '255.0', 46, 4),
(337, '1', '2021-09-14 16:30:42.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAEABAGADAAAEACA', 1, NULL, '2021-09-15 10:23:48.739551', NULL, NULL, 255, '255.0', 45, 4),
(338, '20', '2021-09-15 10:23:52.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAFABAAACADAFACA', 1, NULL, '2021-09-15 10:23:55.390071', NULL, NULL, 255, '255.0', 55, 4),
(339, '10', '2021-09-14 17:18:26.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAEABAHABAIACAGA', 1, NULL, '2021-09-15 10:24:03.878521', NULL, NULL, 255, '255.0', 63, 4),
(340, '20', '2021-09-14 18:08:16.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAEABAIAAAIABAGA', 1, NULL, '2021-09-15 10:24:03.909351', NULL, NULL, 255, '255.0', 55, 4),
(341, '20', '2021-09-14 18:08:19.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAEABAIAAAIABAJA', 1, NULL, '2021-09-15 10:24:03.946617', NULL, NULL, 255, '255.0', 55, 4),
(342, '20', '2021-09-15 10:57:13.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAFABAAAFAHABADA', 1, NULL, '2021-09-15 10:57:17.087308', NULL, NULL, 255, '255.0', 55, 4),
(343, '20', '2021-09-15 10:57:16.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAFABAAAFAHABAGA', 1, NULL, '2021-09-15 10:57:19.200833', NULL, NULL, 255, '255.0', 55, 4),
(344, '20', '2021-09-15 11:14:27.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAFABABABAEACAHA', 1, NULL, '2021-09-15 11:14:31.245651', NULL, NULL, 255, '255.0', 55, 4),
(345, '20', '2021-09-15 12:17:48.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAFABACABAHAEAIA', 1, NULL, '2021-09-16 14:04:44.693543', NULL, NULL, 255, '255.0', 55, 4),
(346, '20', '2021-09-15 12:17:50.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAFABACABAHAFAAA', 1, NULL, '2021-09-16 14:04:46.105699', NULL, NULL, 255, '255.0', 55, 4),
(347, '20', '2021-09-15 13:02:01.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAFABADAAACAAABA', 1, NULL, '2021-09-16 14:04:46.177522', NULL, NULL, 255, '255.0', 55, 4),
(348, '20', '2021-09-15 13:02:03.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAFABADAAACAAADA', 1, NULL, '2021-09-16 14:04:46.563338', NULL, NULL, 255, '255.0', 55, 4),
(349, '20', '2021-09-15 13:53:03.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAFABADAFADAAADA', 1, NULL, '2021-09-16 14:04:46.603722', NULL, NULL, 255, '255.0', 55, 4),
(350, '20', '2021-09-15 13:53:21.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAFABADAFADACABA', 1, NULL, '2021-09-16 14:04:46.653672', NULL, NULL, 255, '255.0', 55, 4),
(351, '20', '2021-09-15 13:53:23.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAFABADAFADACADA', 1, NULL, '2021-09-16 14:04:46.714895', NULL, NULL, 255, '255.0', 55, 4),
(352, '20', '2021-09-15 13:53:24.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAFABADAFADACAEA', 1, NULL, '2021-09-16 14:04:47.273687', NULL, NULL, 255, '255.0', 55, 4),
(353, '20', '2021-09-15 15:56:21.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAFABAFAFAGACABA', 1, NULL, '2021-09-16 14:04:47.319289', NULL, NULL, 255, '255.0', 55, 4),
(354, '20', '2021-09-15 16:01:05.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAFABAGAAABAAAFA', 1, NULL, '2021-09-16 14:04:47.373354', NULL, NULL, 255, '255.0', 55, 4),
(355, '20', '2021-09-16 13:57:03.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAGABADAFAHAAADA', 1, NULL, '2021-09-16 14:04:47.454117', NULL, NULL, 255, '255.0', 55, 4),
(356, '20', '2021-09-16 13:57:05.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAGABADAFAHAAAFA', 1, NULL, '2021-09-16 14:04:47.503404', NULL, NULL, 255, '255.0', 55, 4),
(357, '20', '2021-09-16 14:58:13.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAGABAEAFAIABADA', 1, NULL, '2021-09-16 14:58:16.515381', NULL, NULL, 255, '255.0', 55, 4),
(358, '20', '2021-09-16 14:58:17.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAGABAEAFAIABAHA', 1, NULL, '2021-09-16 14:58:19.993676', NULL, NULL, 255, '255.0', 55, 4),
(359, '20', '2021-09-16 15:02:50.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAGABAFAAACAFAAA', 1, NULL, '2021-09-16 15:02:53.431394', NULL, NULL, 255, '255.0', 55, 4),
(360, '20', '2021-09-16 15:03:26.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAGABAFAAADACAGA', 1, NULL, '2021-09-16 15:03:28.572569', NULL, NULL, 255, '255.0', 55, 4),
(361, '20', '2021-09-16 15:03:31.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAGABAFAAADADABA', 1, NULL, '2021-09-16 15:03:34.673577', NULL, NULL, 255, '255.0', 55, 4),
(362, '20', '2021-09-16 15:03:45.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAGABAFAAADAEAFA', 1, NULL, '2021-09-16 15:03:48.825060', NULL, NULL, 255, '255.0', 55, 4),
(363, '20', '2021-09-16 15:23:43.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAGABAFACADAEADA', 1, NULL, '2021-09-16 15:23:46.501381', NULL, NULL, 255, '255.0', 55, 4),
(364, '20', '2021-09-16 15:23:47.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAGABAFACADAEAHA', 1, NULL, '2021-09-16 15:23:50.634370', NULL, NULL, 255, '255.0', 55, 4),
(365, '20', '2021-09-16 15:32:34.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABAAAJABAGABAFADACADAEA', 1, NULL, '2021-09-16 15:32:37.243153', NULL, NULL, 255, '255.0', 55, 4);

--
-- Triggers `iclock_transaction`
--
DELIMITER $$
CREATE TRIGGER `iclock_transaction_AFTER_INSERT` AFTER INSERT ON `iclock_transaction` FOR EACH ROW BEGIN
	DECLARE inEmployeeID VARCHAR(100) DEFAULT '0';
    DECLARE inPunchStatus INT(6) DEFAULT 0;
    DECLARE inPunchTime DATETIME DEFAULT NULL;
    DECLARE inBreakID BIGINT(21) DEFAULT 0;
    DECLARE inBreakIn DATETIME DEFAULT NULL;
    DECLARE inBreakOut DATETIME DEFAULT NULL;
    DECLARE inDuration DECIMAL(10,2) DEFAULT 0.00;
    
    SET inEmployeeID  = NEW.emp_code;
	SET inPunchStatus = NEW.punch_state;
    SET inPunchTime   = NEW.punch_time;
        
    IF (inPunchStatus = 4 OR inPunchStatus = 5) THEN
		IF inPunchStatus = 5 THEN
			SELECT 
				breakOut INTO inBreakOut 
			FROM  
				#erpdb_backup.hris_attendance_break_tbl 
                erpdb.hris_attendance_break_tbl
			WHERE employeeID = inEmployeeID 
			ORDER BY breakID 
			DESC LIMIT 1;
			
			IF inBreakOut IS NULL THEN
				SELECT 
					breakID INTO inBreakID 
				FROM 
					#erpdb_backup.hris_attendance_break_tbl 
                    erpdb.hris_attendance_break_tbl 
				WHERE employeeID = inEmployeeID 
				ORDER BY breakID 
				DESC LIMIT 1;
			END IF;
            
            SELECT breakIn INTO inBreakIn 
            FROM 
				#erpdb_backup.hris_attendance_break_tbl 
                erpdb.hris_attendance_break_tbl 
			WHERE breakID = inBreakID;
            
            IF inBreakIn IS NOT NULL THEN
				SET inDuration = (SELECT (TIMESTAMPDIFF(SECOND, inBreakIn, inPunchTime) / 3600));
            END IF;
		END IF;
		
		IF (inBreakID = 0 AND inPunchStatus = 4) THEN
			INSERT INTO 
            #erpdb_backup.hris_attendance_break_tbl 
            erpdb.hris_attendance_break_tbl 
            (employeeID, breakIn, breakDuration) 
            VALUES (inEmployeeID, inPunchTime, inDuration);
		ELSE 
			UPDATE 
            #erpdb_backup.hris_attendance_break_tbl 
            erpdb.hris_attendance_break_tbl 
            SET breakOut = inPunchTime, breakDuration = inDuration 
            WHERE breakID = inBreakID;
		END IF;
    END IF;
            
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `iclock_transactionproofcmd`
--

CREATE TABLE `iclock_transactionproofcmd` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `terminal_count` int(11) DEFAULT NULL,
  `server_count` int(11) DEFAULT NULL,
  `flag` smallint(6) DEFAULT NULL,
  `reserved_init` int(11) DEFAULT NULL,
  `reserved_float` double DEFAULT NULL,
  `reserved_char` varchar(30) DEFAULT NULL,
  `terminal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `iclock_visitorbiodata`
--

CREATE TABLE `iclock_visitorbiodata` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `bio_tmp` longtext NOT NULL,
  `bio_no` int(11) DEFAULT NULL,
  `bio_index` int(11) DEFAULT NULL,
  `bio_type` int(11) NOT NULL,
  `major_ver` varchar(30) NOT NULL,
  `minor_ver` varchar(30) DEFAULT NULL,
  `bio_format` int(11) DEFAULT NULL,
  `valid` int(11) NOT NULL,
  `duress` int(11) NOT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `sn` varchar(50) DEFAULT NULL,
  `visitor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `meeting_meetingentity`
--

CREATE TABLE `meeting_meetingentity` (
  `workflowinstance_ptr_id` int(11) NOT NULL,
  `code` varchar(32) NOT NULL,
  `alias` varchar(50) NOT NULL,
  `content` varchar(200) DEFAULT NULL,
  `meeting_date` date NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `duration` int(11) NOT NULL,
  `in_required` tinyint(1) NOT NULL,
  `in_start` datetime(6) NOT NULL,
  `in_end` datetime(6) NOT NULL,
  `out_required` tinyint(1) NOT NULL,
  `out_start` datetime(6) NOT NULL,
  `out_end` datetime(6) NOT NULL,
  `apply_reason` varchar(200) NOT NULL,
  `apply_time` datetime(6) NOT NULL,
  `calculation_time` datetime(6) DEFAULT NULL,
  `sync_time` datetime(6) DEFAULT NULL,
  `room_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `meeting_meetingentity_attender`
--

CREATE TABLE `meeting_meetingentity_attender` (
  `id` int(11) NOT NULL,
  `meetingentity_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `meeting_meetingmanuallog`
--

CREATE TABLE `meeting_meetingmanuallog` (
  `workflowinstance_ptr_id` int(11) NOT NULL,
  `punch_time` datetime(6) NOT NULL,
  `punch_state` varchar(5) NOT NULL,
  `apply_reason` varchar(200) NOT NULL,
  `apply_time` datetime(6) NOT NULL,
  `meeting_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `meeting_meetingpayloadbase`
--

CREATE TABLE `meeting_meetingpayloadbase` (
  `id` char(32) NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `duration` int(11) NOT NULL,
  `meeting_date` date NOT NULL,
  `clock_in` datetime(6) DEFAULT NULL,
  `clock_out` datetime(6) DEFAULT NULL,
  `attended_duration` int(11) NOT NULL,
  `late_in` int(11) NOT NULL,
  `early_out` int(11) NOT NULL,
  `absent` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `meeting_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `meeting_meetingroom`
--

CREATE TABLE `meeting_meetingroom` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `code` varchar(32) NOT NULL,
  `alias` varchar(50) NOT NULL,
  `capacity` int(11) NOT NULL,
  `location` varchar(200) NOT NULL,
  `remark` longtext DEFAULT NULL,
  `state` smallint(6) NOT NULL,
  `enable_room` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `meeting_meetingroomdevice`
--

CREATE TABLE `meeting_meetingroomdevice` (
  `id` int(11) NOT NULL,
  `device_id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `meeting_meetingtransaction`
--

CREATE TABLE `meeting_meetingtransaction` (
  `id` int(11) NOT NULL,
  `emp_code` varchar(50) NOT NULL,
  `punch_datetime` datetime(6) NOT NULL,
  `punch_date` date NOT NULL,
  `punch_time` time(6) NOT NULL,
  `punch_state` varchar(5) NOT NULL,
  `source` smallint(6) NOT NULL,
  `upload_time` datetime(6) NOT NULL,
  `emp_id` int(11) DEFAULT NULL,
  `meeting_id` int(11) DEFAULT NULL,
  `terminal_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mobile_announcement`
--

CREATE TABLE `mobile_announcement` (
  `id` int(11) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `content` longtext NOT NULL,
  `category` smallint(6) NOT NULL,
  `sender` varchar(50) DEFAULT NULL,
  `system_sender` varchar(50) DEFAULT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `init_sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mobile_appactionlog`
--

CREATE TABLE `mobile_appactionlog` (
  `id` int(11) NOT NULL,
  `user` varchar(20) NOT NULL,
  `client` varchar(50) DEFAULT NULL,
  `action` varchar(50) DEFAULT NULL,
  `params` longtext DEFAULT NULL,
  `describe` longtext DEFAULT NULL,
  `request_status` smallint(6) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `remote_ip` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mobile_applist`
--

CREATE TABLE `mobile_applist` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `login_time` datetime(6) NOT NULL,
  `last_active` datetime(6) NOT NULL,
  `token` longtext NOT NULL,
  `device_token` longtext NOT NULL,
  `client_id` varchar(100) NOT NULL,
  `client_category` smallint(6) NOT NULL,
  `active` smallint(6) DEFAULT NULL,
  `enable` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mobile_appnotification`
--

CREATE TABLE `mobile_appnotification` (
  `id` int(11) NOT NULL,
  `sender` varchar(50) DEFAULT NULL,
  `system_sender` varchar(50) DEFAULT NULL,
  `category` smallint(6) NOT NULL,
  `sub_category` int(11) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `payload` longtext DEFAULT NULL,
  `source` int(11) DEFAULT NULL,
  `notification_time` datetime(6) NOT NULL,
  `read_status` smallint(6) NOT NULL,
  `read_time` datetime(6) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `init_sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mobile_gpsfordepartment`
--

CREATE TABLE `mobile_gpsfordepartment` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `distance` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `department_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mobile_gpsfordepartment_location`
--

CREATE TABLE `mobile_gpsfordepartment_location` (
  `id` int(11) NOT NULL,
  `gpsfordepartment_id` int(11) NOT NULL,
  `gpslocation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mobile_gpsforemployee`
--

CREATE TABLE `mobile_gpsforemployee` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `distance` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mobile_gpsforemployee_location`
--

CREATE TABLE `mobile_gpsforemployee_location` (
  `id` int(11) NOT NULL,
  `gpsforemployee_id` int(11) NOT NULL,
  `gpslocation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mobile_gpslocation`
--

CREATE TABLE `mobile_gpslocation` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `alias` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `longitude` double NOT NULL,
  `latitude` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_deductionformula`
--

CREATE TABLE `payroll_deductionformula` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `formula` varchar(100) NOT NULL,
  `remark` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_emploan`
--

CREATE TABLE `payroll_emploan` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `loan_amount` double NOT NULL,
  `loan_time` datetime(6) NOT NULL,
  `refund_cycle` smallint(6) NOT NULL,
  `per_cycle_refund` double NOT NULL,
  `loan_clean_time` datetime(6) DEFAULT NULL,
  `remark` varchar(300) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_emppayrollprofile`
--

CREATE TABLE `payroll_emppayrollprofile` (
  `id` int(11) NOT NULL,
  `payment_mode` smallint(6) DEFAULT NULL,
  `payment_type` smallint(6) DEFAULT NULL,
  `bank_name` varchar(30) DEFAULT NULL,
  `bank_account` varchar(30) DEFAULT NULL,
  `personnel_id` varchar(30) DEFAULT NULL,
  `agent_id` varchar(30) DEFAULT NULL,
  `agent_account` varchar(30) DEFAULT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payroll_emppayrollprofile`
--

INSERT INTO `payroll_emppayrollprofile` (`id`, `payment_mode`, `payment_type`, `bank_name`, `bank_account`, `personnel_id`, `agent_id`, `agent_account`, `employee_id`) VALUES
(7, 1, 1, '', '', '', '', '', 59),
(8, 1, 1, '', '', '', '', '', 60),
(9, 1, 1, '', '', '', '', '', 61),
(10, 1, 1, '', '', '', '', '', 63);

-- --------------------------------------------------------

--
-- Table structure for table `payroll_exceptionformula`
--

CREATE TABLE `payroll_exceptionformula` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `formula` varchar(100) NOT NULL,
  `remark` longtext DEFAULT NULL,
  `pay_code_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_extradeduction`
--

CREATE TABLE `payroll_extradeduction` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `amount` double NOT NULL,
  `issued_time` datetime(6) NOT NULL,
  `remark` varchar(300) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_extraincrease`
--

CREATE TABLE `payroll_extraincrease` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `amount` double NOT NULL,
  `issued_time` datetime(6) NOT NULL,
  `remark` varchar(300) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_increasementformula`
--

CREATE TABLE `payroll_increasementformula` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `formula` varchar(100) NOT NULL,
  `remark` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_leaveformula`
--

CREATE TABLE `payroll_leaveformula` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `formula` varchar(100) NOT NULL,
  `remark` longtext DEFAULT NULL,
  `pay_code_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_overtimeformula`
--

CREATE TABLE `payroll_overtimeformula` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `formula` varchar(100) NOT NULL,
  `remark` longtext DEFAULT NULL,
  `pay_code_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_payrollpayload`
--

CREATE TABLE `payroll_payrollpayload` (
  `id` int(11) NOT NULL,
  `calc_time` date DEFAULT NULL,
  `basic_salary` double DEFAULT NULL,
  `effective_date` date DEFAULT NULL,
  `format_dict` longtext DEFAULT NULL,
  `payment_mode` smallint(6) DEFAULT NULL,
  `increase` double DEFAULT NULL,
  `deduction` double DEFAULT NULL,
  `increase_formula` longtext DEFAULT NULL,
  `deduction_formula` longtext DEFAULT NULL,
  `increase_formula_name` longtext DEFAULT NULL,
  `deduction_formula_name` longtext DEFAULT NULL,
  `extra_increase` double DEFAULT NULL,
  `extra_deduction` double DEFAULT NULL,
  `total_loan_amount` double DEFAULT NULL,
  `refund_loan_amount` double DEFAULT NULL,
  `unrefund_loan_amount` double DEFAULT NULL,
  `loan_deduction` double DEFAULT NULL,
  `loan_increase` double DEFAULT NULL,
  `advance_increase` double DEFAULT NULL,
  `advance_deduction` double DEFAULT NULL,
  `reimbursement` double DEFAULT NULL,
  `total_increase_formula` longtext DEFAULT NULL,
  `total_increase_formula_name` longtext DEFAULT NULL,
  `total_increase_expression` longtext DEFAULT NULL,
  `total_increase` double DEFAULT NULL,
  `total_deduction_formula` longtext DEFAULT NULL,
  `total_deduction_formula_name` longtext DEFAULT NULL,
  `total_deduction_expression` longtext DEFAULT NULL,
  `total_deduction` double DEFAULT NULL,
  `total_salary_expression` longtext DEFAULT NULL,
  `total_salary` double DEFAULT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_payrollpayloadpaycode`
--

CREATE TABLE `payroll_payrollpayloadpaycode` (
  `id` int(11) NOT NULL,
  `amount` double DEFAULT NULL,
  `formula` longtext DEFAULT NULL,
  `formula_name` longtext DEFAULT NULL,
  `pay_code_id` int(11) NOT NULL,
  `payload_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_reimbursement`
--

CREATE TABLE `payroll_reimbursement` (
  `id` int(11) NOT NULL,
  `rmb_amount` double NOT NULL,
  `rmb_time` datetime(6) NOT NULL,
  `rmb_file` varchar(200) DEFAULT NULL,
  `rmb_remark` varchar(300) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_salaryadvance`
--

CREATE TABLE `payroll_salaryadvance` (
  `id` int(11) NOT NULL,
  `advance_amount` double NOT NULL,
  `advance_time` datetime(6) NOT NULL,
  `advance_remark` varchar(300) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_salarystructure`
--

CREATE TABLE `payroll_salarystructure` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `salary_amount` double NOT NULL,
  `effective_date` date NOT NULL,
  `salary_remark` varchar(300) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_salarystructure_deductionformula`
--

CREATE TABLE `payroll_salarystructure_deductionformula` (
  `id` int(11) NOT NULL,
  `salarystructure_id` int(11) NOT NULL,
  `deductionformula_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_salarystructure_exceptionformula`
--

CREATE TABLE `payroll_salarystructure_exceptionformula` (
  `id` int(11) NOT NULL,
  `salarystructure_id` int(11) NOT NULL,
  `exceptionformula_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_salarystructure_increasementformula`
--

CREATE TABLE `payroll_salarystructure_increasementformula` (
  `id` int(11) NOT NULL,
  `salarystructure_id` int(11) NOT NULL,
  `increasementformula_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_salarystructure_leaveformula`
--

CREATE TABLE `payroll_salarystructure_leaveformula` (
  `id` int(11) NOT NULL,
  `salarystructure_id` int(11) NOT NULL,
  `leaveformula_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll_salarystructure_overtimeformula`
--

CREATE TABLE `payroll_salarystructure_overtimeformula` (
  `id` int(11) NOT NULL,
  `salarystructure_id` int(11) NOT NULL,
  `overtimeformula_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `personnel_area`
--

CREATE TABLE `personnel_area` (
  `id` int(11) NOT NULL,
  `area_code` varchar(30) NOT NULL,
  `area_name` varchar(30) NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `parent_area_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `personnel_area`
--

INSERT INTO `personnel_area` (`id`, `area_code`, `area_name`, `is_default`, `parent_area_id`) VALUES
(1, '1', 'Not Authorized', 1, NULL),
(2, '2', 'Pasig City', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `personnel_assignareaemployee`
--

CREATE TABLE `personnel_assignareaemployee` (
  `id` int(11) NOT NULL,
  `assigned_time` datetime(6) NOT NULL,
  `area_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `personnel_certification`
--

CREATE TABLE `personnel_certification` (
  `id` int(11) NOT NULL,
  `cert_code` varchar(20) NOT NULL,
  `cert_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `personnel_department`
--

CREATE TABLE `personnel_department` (
  `id` int(11) NOT NULL,
  `dept_code` varchar(50) NOT NULL,
  `dept_name` varchar(100) NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `parent_dept_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `personnel_department`
--

INSERT INTO `personnel_department` (`id`, `dept_code`, `dept_name`, `is_default`, `parent_dept_id`) VALUES
(1, '1', 'Department', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `personnel_employee`
--

CREATE TABLE `personnel_employee` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `emp_code` varchar(20) NOT NULL,
  `first_name` varchar(25) DEFAULT NULL,
  `last_name` varchar(25) DEFAULT NULL,
  `nickname` varchar(25) DEFAULT NULL,
  `passport` varchar(30) DEFAULT NULL,
  `driver_license_automobile` varchar(30) DEFAULT NULL,
  `driver_license_motorcycle` varchar(30) DEFAULT NULL,
  `photo` varchar(200) DEFAULT NULL,
  `self_password` varchar(128) DEFAULT NULL,
  `device_password` varchar(20) DEFAULT NULL,
  `dev_privilege` int(11) DEFAULT NULL,
  `card_no` varchar(20) DEFAULT NULL,
  `acc_group` varchar(5) DEFAULT NULL,
  `acc_timezone` varchar(20) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `office_tel` varchar(20) DEFAULT NULL,
  `contact_tel` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `national` varchar(50) DEFAULT NULL,
  `religion` varchar(20) DEFAULT NULL,
  `title` varchar(20) DEFAULT NULL,
  `enroll_sn` varchar(20) DEFAULT NULL,
  `ssn` varchar(20) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `hire_date` date DEFAULT NULL,
  `verify_mode` int(11) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `emp_type` smallint(6) DEFAULT NULL,
  `enable_payroll` tinyint(1) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  `reserved` int(11) DEFAULT NULL,
  `del_tag` int(11) DEFAULT NULL,
  `app_status` smallint(6) DEFAULT NULL,
  `app_role` smallint(6) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `session_key` varchar(32) DEFAULT NULL,
  `login_ip` varchar(32) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `position_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `personnel_employee`
--

INSERT INTO `personnel_employee` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `emp_code`, `first_name`, `last_name`, `nickname`, `passport`, `driver_license_automobile`, `driver_license_motorcycle`, `photo`, `self_password`, `device_password`, `dev_privilege`, `card_no`, `acc_group`, `acc_timezone`, `gender`, `birthday`, `address`, `postcode`, `office_tel`, `contact_tel`, `mobile`, `national`, `religion`, `title`, `enroll_sn`, `ssn`, `update_time`, `hire_date`, `verify_mode`, `city`, `is_admin`, `emp_type`, `enable_payroll`, `deleted`, `reserved`, `del_tag`, `app_status`, `app_role`, `email`, `last_login`, `is_active`, `session_key`, `login_ip`, `department_id`, `position_id`) VALUES
(45, '2021-10-01 07:25:46.000000', NULL, '2021-10-01 07:25:46.000000', NULL, 0, '1', 'Juan', 'Dela Cruz', NULL, NULL, NULL, NULL, NULL, 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-09-10 14:20:55.476446', '2020-04-08', -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(46, '2021-10-01 07:25:47.000000', NULL, '2021-10-01 07:25:47.000000', NULL, 0, '2', 'RJ', 'Diangzon', NULL, NULL, NULL, NULL, NULL, 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-08-24 14:29:43.679436', '2018-05-15', -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(47, '2021-10-01 07:25:47.000000', NULL, '2021-10-01 07:25:47.000000', NULL, 0, '3', 'Wilson', 'Parajas', NULL, NULL, NULL, NULL, NULL, 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-08-24 14:29:45.230272', '2021-05-01', -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(48, '2021-10-01 07:25:47.000000', NULL, '2021-10-01 07:25:47.000000', NULL, 0, '4', 'Charles', 'Verdadero', NULL, NULL, NULL, NULL, NULL, 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-09-03 09:43:47.089803', '2021-04-27', -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(49, '2021-10-01 07:25:47.000000', NULL, '2021-10-01 07:25:47.000000', NULL, 0, '5', 'Mark', 'Nieto', NULL, NULL, NULL, NULL, NULL, 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-08-26 10:55:14.936551', '2021-05-06', -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(50, '2021-10-01 07:25:47.000000', NULL, '2021-10-01 07:25:47.000000', NULL, 0, '6', 'Francis', 'Bolster', NULL, NULL, NULL, NULL, NULL, 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-08-24 14:29:45.412924', '2017-02-06', -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(51, '2021-10-01 07:25:47.000000', NULL, '2021-10-01 07:25:47.000000', NULL, 0, '7', 'Renna', 'Telesforo', NULL, NULL, NULL, NULL, NULL, 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-08-24 14:29:46.387707', '2020-07-02', -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(52, '2021-10-01 07:25:48.000000', NULL, '2021-10-01 07:25:48.000000', NULL, 0, '8', 'Matthew', 'Isaac', NULL, NULL, NULL, NULL, NULL, 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-08-24 14:29:46.817826', '2021-05-01', -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(53, '2021-10-01 07:25:48.000000', NULL, '2021-10-01 07:25:48.000000', NULL, 0, '9', 'Errol', 'Garcia', NULL, NULL, NULL, NULL, NULL, 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-09-10 14:43:35.806434', '2020-03-12', -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(54, '2021-10-01 07:25:48.000000', NULL, '2021-10-01 07:25:48.000000', NULL, 0, '19', 'Lawrence', 'Mark', NULL, NULL, NULL, NULL, NULL, 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-08-24 14:29:43.641586', '2021-04-13', -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(55, '2021-10-01 07:25:48.000000', NULL, '2021-10-01 07:25:48.000000', NULL, 0, '20', 'Joseph', 'Berongoy', NULL, NULL, NULL, NULL, NULL, 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-09-13 15:41:22.396972', '2019-10-21', -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(56, '2021-10-01 07:25:48.000000', NULL, '2021-10-01 07:25:48.000000', NULL, 0, '21', 'Ayesha', 'Porras', NULL, NULL, NULL, NULL, NULL, 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-08-31 16:03:27.431464', '2021-05-03', -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(57, '2021-10-01 07:25:48.000000', NULL, '2021-10-01 07:25:48.000000', NULL, 0, '22', 'Jelo', 'De Guzman', NULL, NULL, NULL, NULL, NULL, 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-08-24 14:29:43.890627', '2020-01-06', -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(58, '2021-10-01 07:25:48.000000', NULL, '2021-10-01 07:25:48.000000', NULL, 0, '23', 'Yow Lee', 'Rah Me Zares', NULL, NULL, NULL, NULL, NULL, 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-09-10 14:47:53.736663', '2020-04-03', -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(59, '2021-10-01 07:25:48.000000', NULL, '2021-10-01 07:25:48.000000', NULL, 0, '24', 'Arjay', 'Diangzon', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-08-24 14:29:45.106200', NULL, -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(60, '2021-10-01 07:25:48.000000', NULL, '2021-10-01 07:25:48.000000', NULL, 0, '25', 'Charles', 'Verdadero', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-08-24 14:29:46.078728', NULL, -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(61, '2021-10-01 07:25:48.000000', NULL, '2021-10-01 07:25:48.000000', NULL, 0, '26', 'Mark', 'Gil', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-08-24 14:29:46.747464', NULL, -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(63, '2021-09-15 10:23:57.664179', NULL, '2021-09-15 10:23:58.958045', NULL, 0, '10', 'Mari', NULL, NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$9QgiFMCFBp5p$giBBqgKZKe5meEZK3Z5KKWykee/xlECcQHUfuyqMGII=', NULL, 0, NULL, '1', '0001000100000000', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'BOCK191760589', NULL, '2021-09-15 10:23:59.879184', '2021-09-15', 0, NULL, 0, NULL, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, NULL),
(64, '2021-10-01 07:25:48.000000', NULL, '2021-10-01 07:25:48.000000', NULL, 0, '27', 'Joseph', 'Berongoy', NULL, NULL, NULL, NULL, NULL, 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1),
(65, '2021-10-01 07:25:48.000000', NULL, '2021-10-01 07:25:48.000000', NULL, 0, '28', 'Wilson', 'Parajas', NULL, NULL, NULL, NULL, NULL, 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, -1, NULL, 0, 1, 1, 0, 0, 0, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `personnel_employeecalendar`
--

CREATE TABLE `personnel_employeecalendar` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `calendar` varchar(100) DEFAULT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `personnel_employeecertification`
--

CREATE TABLE `personnel_employeecertification` (
  `id` int(11) NOT NULL,
  `expire_on` date DEFAULT NULL,
  `email_alert` tinyint(1) NOT NULL,
  `before` int(11) DEFAULT NULL,
  `certification_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `personnel_employeecustomattribute`
--

CREATE TABLE `personnel_employeecustomattribute` (
  `id` int(11) NOT NULL,
  `attr_name` varchar(50) NOT NULL,
  `attr_type` smallint(6) NOT NULL,
  `attr_value` varchar(200) DEFAULT NULL,
  `enable` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `personnel_employeeextrainfo`
--

CREATE TABLE `personnel_employeeextrainfo` (
  `id` int(11) NOT NULL,
  `value` longtext NOT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `personnel_employeeleavebalance`
--

CREATE TABLE `personnel_employeeleavebalance` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `leave_balance` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `leave_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `personnel_employeeprofile`
--

CREATE TABLE `personnel_employeeprofile` (
  `id` int(11) NOT NULL,
  `column_order` longtext NOT NULL,
  `preferences` longtext NOT NULL,
  `pwd_update_time` datetime(6) DEFAULT NULL,
  `emp_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `personnel_employeeprofile`
--

INSERT INTO `personnel_employeeprofile` (`id`, `column_order`, `preferences`, `pwd_update_time`, `emp_id`) VALUES
(9, '', '', NULL, 59),
(10, '', '', NULL, 60),
(11, '', '', NULL, 61),
(12, '', '', NULL, 63);

-- --------------------------------------------------------

--
-- Table structure for table `personnel_employee_area`
--

CREATE TABLE `personnel_employee_area` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `area_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `personnel_employee_area`
--

INSERT INTO `personnel_employee_area` (`id`, `employee_id`, `area_id`) VALUES
(49, 45, 2),
(50, 46, 2),
(51, 47, 2),
(52, 48, 2),
(53, 49, 2),
(54, 50, 2),
(55, 51, 2),
(56, 52, 2),
(57, 53, 2),
(58, 54, 2),
(59, 55, 2),
(60, 56, 2),
(61, 57, 2),
(62, 58, 2),
(63, 59, 2),
(64, 60, 2),
(65, 61, 2),
(67, 63, 2),
(68, 64, 2),
(69, 65, 2);

-- --------------------------------------------------------

--
-- Table structure for table `personnel_employee_flow_role`
--

CREATE TABLE `personnel_employee_flow_role` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `workflowrole_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `personnel_employment`
--

CREATE TABLE `personnel_employment` (
  `id` int(11) NOT NULL,
  `employment_type` smallint(6) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `active_time` datetime(6) DEFAULT NULL,
  `inactive_time` datetime(6) DEFAULT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `personnel_position`
--

CREATE TABLE `personnel_position` (
  `id` int(11) NOT NULL,
  `position_code` varchar(50) NOT NULL,
  `position_name` varchar(100) NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `parent_position_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `personnel_position`
--

INSERT INTO `personnel_position` (`id`, `position_code`, `position_name`, `is_default`, `parent_position_id`) VALUES
(1, '1', 'Position', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `personnel_resign`
--

CREATE TABLE `personnel_resign` (
  `id` int(11) NOT NULL,
  `resign_date` date NOT NULL,
  `resign_type` int(11) DEFAULT NULL,
  `disableatt` tinyint(1) NOT NULL,
  `reason` varchar(200) DEFAULT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `staff_stafftoken`
--

CREATE TABLE `staff_stafftoken` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sync_area`
--

CREATE TABLE `sync_area` (
  `id` int(11) NOT NULL,
  `post_time` datetime(6) DEFAULT NULL,
  `flag` smallint(6) NOT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `sync_ret` varchar(200) DEFAULT NULL,
  `area_code` varchar(30) NOT NULL,
  `area_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sync_department`
--

CREATE TABLE `sync_department` (
  `id` int(11) NOT NULL,
  `post_time` datetime(6) DEFAULT NULL,
  `flag` smallint(6) NOT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `sync_ret` varchar(200) DEFAULT NULL,
  `dept_code` varchar(50) NOT NULL,
  `dept_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sync_employee`
--

CREATE TABLE `sync_employee` (
  `id` int(11) NOT NULL,
  `post_time` datetime(6) DEFAULT NULL,
  `flag` smallint(6) NOT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `sync_ret` varchar(200) DEFAULT NULL,
  `emp_code` varchar(20) NOT NULL,
  `first_name` varchar(25) DEFAULT NULL,
  `last_name` varchar(25) DEFAULT NULL,
  `dept_code` varchar(50) DEFAULT NULL,
  `dept_name` varchar(100) DEFAULT NULL,
  `job_code` varchar(50) DEFAULT NULL,
  `job_name` varchar(100) DEFAULT NULL,
  `area_code` varchar(30) DEFAULT NULL,
  `area_name` varchar(30) DEFAULT NULL,
  `card_no` varchar(20) DEFAULT NULL,
  `multi_area` tinyint(1) NOT NULL,
  `hire_date` date DEFAULT NULL,
  `gender` varchar(2) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `active_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sync_job`
--

CREATE TABLE `sync_job` (
  `id` int(11) NOT NULL,
  `post_time` datetime(6) DEFAULT NULL,
  `flag` smallint(6) NOT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `sync_ret` varchar(200) DEFAULT NULL,
  `job_code` varchar(50) NOT NULL,
  `job_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `visitor_reason`
--

CREATE TABLE `visitor_reason` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `visit_reason` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `visitor_reservation`
--

CREATE TABLE `visitor_reservation` (
  `workflowinstance_ptr_id` int(11) NOT NULL,
  `vis_first_name` varchar(25) DEFAULT NULL,
  `vis_last_name` varchar(25) DEFAULT NULL,
  `cert_no` varchar(50) NOT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `visit_quantity` int(11) NOT NULL,
  `visit_date` datetime(6) NOT NULL,
  `apply_time` datetime(6) NOT NULL,
  `apply_reason` longtext DEFAULT NULL,
  `cert_type_id` int(11) NOT NULL,
  `visit_department_id` int(11) DEFAULT NULL,
  `visit_reason_id` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `visitor_visitor`
--

CREATE TABLE `visitor_visitor` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `visitor_code` varchar(20) NOT NULL,
  `first_name` varchar(25) DEFAULT NULL,
  `last_name` varchar(25) DEFAULT NULL,
  `cert_no` varchar(50) NOT NULL,
  `photo` varchar(200) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `card_no` varchar(20) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `ssn` varchar(20) DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `visit_quantity` int(11) NOT NULL,
  `entry_carrying_goods` varchar(200) DEFAULT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `exit_time` datetime(6) DEFAULT NULL,
  `exit_carrying_goods` varchar(200) DEFAULT NULL,
  `remark` varchar(200) DEFAULT NULL,
  `cert_type_id` int(11) NOT NULL,
  `visit_department_id` int(11) DEFAULT NULL,
  `visit_reason_id` int(11) DEFAULT NULL,
  `visited_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `visitor_visitorconfig`
--

CREATE TABLE `visitor_visitorconfig` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `qr_code_policy` smallint(6) NOT NULL,
  `code_prefix` varchar(5) NOT NULL,
  `code_width` int(11) NOT NULL,
  `code_start` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `visitor_visitorconfig`
--

INSERT INTO `visitor_visitorconfig` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `qr_code_policy`, `code_prefix`, `code_width`, `code_start`) VALUES
(1, '2021-08-03 07:46:53.583688', NULL, '2021-08-03 07:46:53.583688', NULL, 0, 1, 'V', 8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `visitor_visitorlog`
--

CREATE TABLE `visitor_visitorlog` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `visitor_status` smallint(6) DEFAULT NULL,
  `visitor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `visitor_visitor_acc_groups`
--

CREATE TABLE `visitor_visitor_acc_groups` (
  `id` int(11) NOT NULL,
  `visitor_id` int(11) NOT NULL,
  `accgroups_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `visitor_visitor_area`
--

CREATE TABLE `visitor_visitor_area` (
  `id` int(11) NOT NULL,
  `visitor_id` int(11) NOT NULL,
  `area_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `workflow_nodeinstance`
--

CREATE TABLE `workflow_nodeinstance` (
  `id` int(11) NOT NULL,
  `node_name` varchar(30) NOT NULL,
  `order_id` int(11) NOT NULL,
  `approval_status` smallint(6) NOT NULL,
  `approval_time` datetime(6) DEFAULT NULL,
  `approval_remark` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `targeted` tinyint(1) NOT NULL,
  `approver_employee_id` int(11) DEFAULT NULL,
  `workflow_instance_id` int(11) DEFAULT NULL,
  `workflow_node_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `workflow_workflowengine`
--

CREATE TABLE `workflow_workflowengine` (
  `id` int(11) NOT NULL,
  `workflow_code` varchar(50) NOT NULL,
  `workflow_name` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `description` varchar(50) NOT NULL,
  `workflow_type` smallint(6) NOT NULL,
  `applicant_position_id` int(11) DEFAULT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `departments_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `workflow_workflowengine_employee`
--

CREATE TABLE `workflow_workflowengine_employee` (
  `id` int(11) NOT NULL,
  `workflowengine_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `workflow_workflowinstance`
--

CREATE TABLE `workflow_workflowinstance` (
  `id` int(11) NOT NULL,
  `approval_time` datetime(6) DEFAULT NULL,
  `approval_status` smallint(6) NOT NULL,
  `approval_remark` longtext DEFAULT NULL,
  `approver` varchar(30) DEFAULT NULL,
  `approver_instance` longtext DEFAULT NULL,
  `employee_id` int(11) NOT NULL,
  `workflow_engine_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `workflow_workflownode`
--

CREATE TABLE `workflow_workflownode` (
  `id` int(11) NOT NULL,
  `node_name` varchar(30) NOT NULL,
  `order_id` int(11) NOT NULL,
  `approver_by_overall` tinyint(1) NOT NULL,
  `notify_by_overall` tinyint(1) NOT NULL,
  `workflow_engine_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `workflow_workflownode_approver`
--

CREATE TABLE `workflow_workflownode_approver` (
  `id` int(11) NOT NULL,
  `workflownode_id` int(11) NOT NULL,
  `workflowrole_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `workflow_workflownode_notifier`
--

CREATE TABLE `workflow_workflownode_notifier` (
  `id` int(11) NOT NULL,
  `workflownode_id` int(11) NOT NULL,
  `workflowrole_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `workflow_workflowrole`
--

CREATE TABLE `workflow_workflowrole` (
  `id` int(11) NOT NULL,
  `role_code` varchar(30) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts_adminbiodata`
--
ALTER TABLE `accounts_adminbiodata`
  ADD PRIMARY KEY (`id`),
  ADD KEY `accounts_adminbiodata_admin_id_1e6d2d45_fk_auth_user_id` (`admin_id`);

--
-- Indexes for table `accounts_usernotification`
--
ALTER TABLE `accounts_usernotification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `accounts_usernotification_user_id_b86755b3_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `acc_acccombination`
--
ALTER TABLE `acc_acccombination`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `acc_acccombination_area_id_combination_no_619eb4f5_uniq` (`area_id`,`combination_no`),
  ADD KEY `acc_acccombination_area_id_0d22c34e` (`area_id`);

--
-- Indexes for table `acc_accgroups`
--
ALTER TABLE `acc_accgroups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `acc_accgroups_area_id_group_no_5130a89c_uniq` (`area_id`,`group_no`),
  ADD KEY `acc_accgroups_area_id_b83745c3` (`area_id`);

--
-- Indexes for table `acc_accholiday`
--
ALTER TABLE `acc_accholiday`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `acc_accholiday_area_id_holiday_id_6630c2eb_uniq` (`area_id`,`holiday_id`),
  ADD KEY `acc_accholiday_area_id_d15c19da` (`area_id`),
  ADD KEY `acc_accholiday_holiday_id_a9efe924_fk_att_holiday_id` (`holiday_id`),
  ADD KEY `acc_accholiday_timezone_id_450d2d1e_fk_acc_acctimezone_id` (`timezone_id`);

--
-- Indexes for table `acc_accprivilege`
--
ALTER TABLE `acc_accprivilege`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `acc_accprivilege_area_id_employee_id_group_id_f3b297d8_uniq` (`area_id`,`employee_id`,`group_id`),
  ADD KEY `acc_accprivilege_area_id_2123ff6f` (`area_id`),
  ADD KEY `acc_accprivilege_employee_id_5fc55f95_fk_personnel_employee_id` (`employee_id`),
  ADD KEY `acc_accprivilege_group_id_c5ed7003_fk_acc_accgroups_id` (`group_id`);

--
-- Indexes for table `acc_accterminal`
--
ALTER TABLE `acc_accterminal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `acc_accterminal_terminal_id_fc92cce2_fk_iclock_terminal_id` (`terminal_id`);

--
-- Indexes for table `acc_acctimezone`
--
ALTER TABLE `acc_acctimezone`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `acc_acctimezone_area_id_timezone_no_0cb8250f_uniq` (`area_id`,`timezone_no`),
  ADD KEY `acc_acctimezone_area_id_e9ce7a7a` (`area_id`);

--
-- Indexes for table `attparam`
--
ALTER TABLE `attparam`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `attparam_paraname_paratype_6f176d25_uniq` (`paraname`,`paratype`);

--
-- Indexes for table `att_attcalclog`
--
ALTER TABLE `att_attcalclog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `att_attcode`
--
ALTER TABLE `att_attcode`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `alias` (`alias`);

--
-- Indexes for table `att_attemployee`
--
ALTER TABLE `att_attemployee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `emp_id` (`emp_id`),
  ADD KEY `att_attemployee_group_id_18d3954d_fk_att_attgroup_id` (`group_id`);

--
-- Indexes for table `att_attgroup`
--
ALTER TABLE `att_attgroup`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `att_attpolicy`
--
ALTER TABLE `att_attpolicy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `att_attreportsetting`
--
ALTER TABLE `att_attreportsetting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `att_attrule`
--
ALTER TABLE `att_attrule`
  ADD PRIMARY KEY (`param_name`);

--
-- Indexes for table `att_attschedule`
--
ALTER TABLE `att_attschedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_attschedule_employee_id_caa61686_fk_personnel_employee_id` (`employee_id`),
  ADD KEY `att_attschedule_shift_id_13d2db9a_fk_att_attshift_id` (`shift_id`);

--
-- Indexes for table `att_attshift`
--
ALTER TABLE `att_attshift`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `att_breaktime`
--
ALTER TABLE `att_breaktime`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `att_breaktime_alias_6212d9cf_uniq` (`alias`),
  ADD KEY `att_breaktime_loss_code_id_2ffb5432_fk_att_paycode_id` (`loss_code_id`),
  ADD KEY `att_breaktime_profit_code_id_63cdbbcc_fk_att_paycode_id` (`profit_code_id`);

--
-- Indexes for table `att_changeschedule`
--
ALTER TABLE `att_changeschedule`
  ADD PRIMARY KEY (`workflowinstance_ptr_id`),
  ADD KEY `att_changeschedule_timeinterval_id_d41ac077_fk_att_timei` (`timeinterval_id`);

--
-- Indexes for table `att_departmentpolicy`
--
ALTER TABLE `att_departmentpolicy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_departmentpolicy_department_id_77059a9d_fk_personnel` (`department_id`);

--
-- Indexes for table `att_departmentschedule`
--
ALTER TABLE `att_departmentschedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_departmentschedu_department_id_c68fca3d_fk_personnel` (`department_id`),
  ADD KEY `att_departmentschedule_shift_id_c37d5ade_fk_att_attshift_id` (`shift_id`);

--
-- Indexes for table `att_deptattrule`
--
ALTER TABLE `att_deptattrule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_deptattrule_department_id_f333c8f0` (`department_id`);

--
-- Indexes for table `att_grouppolicy`
--
ALTER TABLE `att_grouppolicy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_grouppolicy_group_id_b2e4dfe8_fk_att_attgroup_id` (`group_id`);

--
-- Indexes for table `att_groupschedule`
--
ALTER TABLE `att_groupschedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_groupschedule_group_id_c341493f_fk_att_attgroup_id` (`group_id`),
  ADD KEY `att_groupschedule_shift_id_287e7fc0_fk_att_attshift_id` (`shift_id`),
  ADD KEY `att_groupschedule_start_date_638b6d85` (`start_date`);

--
-- Indexes for table `att_holiday`
--
ALTER TABLE `att_holiday`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_holiday_department_id_fbbbd185` (`department_id`),
  ADD KEY `att_holiday_att_group_id_9ddf13ba_fk_att_attgroup_id` (`att_group_id`);

--
-- Indexes for table `att_leave`
--
ALTER TABLE `att_leave`
  ADD PRIMARY KEY (`workflowinstance_ptr_id`),
  ADD KEY `att_leave_pay_code_id_2fadf493_fk_att_paycode_id` (`pay_code_id`);

--
-- Indexes for table `att_manuallog`
--
ALTER TABLE `att_manuallog`
  ADD PRIMARY KEY (`workflowinstance_ptr_id`);

--
-- Indexes for table `att_overtime`
--
ALTER TABLE `att_overtime`
  ADD PRIMARY KEY (`workflowinstance_ptr_id`),
  ADD KEY `att_overtime_pay_code_id_05600ee0_fk_att_paycode_id` (`pay_code_id`);

--
-- Indexes for table `att_overtimepolicy`
--
ALTER TABLE `att_overtimepolicy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_overtimepolicy_overnight_pay_code_i_274ce1b0_fk_att_payco` (`overnight_pay_code_id`),
  ADD KEY `att_overtimepolicy_pay_code_id_285b0a61_fk_att_paycode_id` (`pay_code_id`);

--
-- Indexes for table `att_paycode`
--
ALTER TABLE `att_paycode`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `att_payloadattcode`
--
ALTER TABLE `att_payloadattcode`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_payloadattcode_att_code_id_0d635efd_fk_att_attcode_id` (`att_code_id`),
  ADD KEY `att_payloadattcode_emp_id_36569f54_fk_personnel_employee_id` (`emp_id`),
  ADD KEY `att_payloadattcode_shift_id_731faddf_fk_att_attshift_id` (`shift_id`),
  ADD KEY `att_payloadattcode_att_date_19b2621e` (`att_date`),
  ADD KEY `att_payloadattcode_time_card_id_e8a37c7a` (`time_card_id`);

--
-- Indexes for table `att_payloadbase`
--
ALTER TABLE `att_payloadbase`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `break_time_id` (`break_time_id`),
  ADD UNIQUE KEY `overtime_id` (`overtime_id`),
  ADD KEY `att_payloadbase_emp_id_2c0f6a7b_fk_personnel_employee_id` (`emp_id`),
  ADD KEY `att_payloadbase_timetable_id_a389e3d8_fk_att_timeinterval_id` (`timetable_id`);

--
-- Indexes for table `att_payloadbreak`
--
ALTER TABLE `att_payloadbreak`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `att_payloadeffectpunch`
--
ALTER TABLE `att_payloadeffectpunch`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_payloadeffectpunch_emp_id_67e28e01_fk_personnel_employee_id` (`emp_id`),
  ADD KEY `att_payloadeffectpunch_att_date_1e3de2d4` (`att_date`),
  ADD KEY `att_payloadeffectpunch_time_card_id_52f69aaf` (`time_card_id`),
  ADD KEY `att_payloadeffectpun_trans_id_94affbe6_fk_iclock_tr` (`trans_id`);

--
-- Indexes for table `att_payloadexception`
--
ALTER TABLE `att_payloadexception`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `att_payloadexception_item_id_a08bfe48_fk_att_leave` (`item_id`),
  ADD KEY `att_payloadexception_skd_id_b2e9ecaa` (`skd_id`);

--
-- Indexes for table `att_payloadmulpunchset`
--
ALTER TABLE `att_payloadmulpunchset`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_payloadmulpunchset_emp_id_f47610c8_fk_personnel_employee_id` (`emp_id`),
  ADD KEY `att_payloadmulpunchset_timetable_id_9a439a09` (`timetable_id`);

--
-- Indexes for table `att_payloadovertime`
--
ALTER TABLE `att_payloadovertime`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `att_payloadparing`
--
ALTER TABLE `att_payloadparing`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_payloadparing_emp_id_c5daac4f_fk_personnel_employee_id` (`emp_id`),
  ADD KEY `att_payloadparing_in_trans_id_50a8040e_fk_iclock_transaction_id` (`in_trans_id`),
  ADD KEY `att_payloadparing_out_trans_id_8b2375b9_fk_iclock_transaction_id` (`out_trans_id`),
  ADD KEY `att_payloadparing_pay_code_id_aa241cca_fk_att_paycode_id` (`pay_code_id`),
  ADD KEY `att_payloadparing_att_date_5daaa45d` (`att_date`),
  ADD KEY `att_payloadparing_time_card_id_3adc3517` (`time_card_id`);

--
-- Indexes for table `att_payloadpaycode`
--
ALTER TABLE `att_payloadpaycode`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_payloadpaycode_emp_id_78e75279_fk_personnel_employee_id` (`emp_id`),
  ADD KEY `att_payloadpaycode_pay_code_id_4a096cc7_fk_att_paycode_id` (`pay_code_id`),
  ADD KEY `att_payloadpaycode_shift_id_79a0901e_fk_att_attshift_id` (`shift_id`),
  ADD KEY `att_payloadpaycode_att_date_aa048d7b` (`att_date`),
  ADD KEY `att_payloadpaycode_time_card_id_1696b969` (`time_card_id`);

--
-- Indexes for table `att_payloadpunch`
--
ALTER TABLE `att_payloadpunch`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `att_payloadpunch_emp_id_053da2f0_fk_personnel_employee_id` (`emp_id`),
  ADD KEY `att_payloadpunch_orig_id_16b26416_fk_iclock_transaction_id` (`orig_id`),
  ADD KEY `att_payloadpunch_skd_id_17596d82` (`skd_id`);

--
-- Indexes for table `att_payloadtimecard`
--
ALTER TABLE `att_payloadtimecard`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `att_payloadtimecard_emp_id_att_date_time_table_id_9df16bc5_uniq` (`emp_id`,`att_date`,`time_table_id`),
  ADD KEY `att_payloadtimecard_att_date_48c1dc00` (`att_date`),
  ADD KEY `att_payloadtimecard_time_table_id_6e0b0137_fk_att_timei` (`time_table_id`);

--
-- Indexes for table `att_reportparam`
--
ALTER TABLE `att_reportparam`
  ADD PRIMARY KEY (`param_name`);

--
-- Indexes for table `att_reporttemplate`
--
ALTER TABLE `att_reporttemplate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `att_shiftdetail`
--
ALTER TABLE `att_shiftdetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_shiftdetail_shift_id_7d694501_fk_att_attshift_id` (`shift_id`),
  ADD KEY `att_shiftdetail_time_interval_id_777dde8f_fk_att_timeinterval_id` (`time_interval_id`);

--
-- Indexes for table `att_temporaryschedule`
--
ALTER TABLE `att_temporaryschedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_temporaryschedul_employee_id_2b2b94c2_fk_personnel` (`employee_id`),
  ADD KEY `att_temporaryschedule_att_date_8aed8916` (`att_date`),
  ADD KEY `att_temporaryschedule_time_interval_id_2be60ee4` (`time_interval_id`);

--
-- Indexes for table `att_tempschedule`
--
ALTER TABLE `att_tempschedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_tempschedule_employee_id_b89c7e54_fk_personnel_employee_id` (`employee_id`),
  ADD KEY `att_tempschedule_time_interval_id_08dd8eb3` (`time_interval_id`);

--
-- Indexes for table `att_timeinterval`
--
ALTER TABLE `att_timeinterval`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `alias` (`alias`);

--
-- Indexes for table `att_timeinterval_break_time`
--
ALTER TABLE `att_timeinterval_break_time`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `att_timeinterval_break_t_timeinterval_id_breaktim_6e1bfb4e_uniq` (`timeinterval_id`,`breaktime_id`),
  ADD KEY `att_timeinterval_bre_breaktime_id_08462308_fk_att_break` (`breaktime_id`);

--
-- Indexes for table `att_training`
--
ALTER TABLE `att_training`
  ADD PRIMARY KEY (`workflowinstance_ptr_id`),
  ADD KEY `att_training_pay_code_id_5790afdd_fk_att_paycode_id` (`pay_code_id`);

--
-- Indexes for table `authtoken_token`
--
ALTER TABLE `authtoken_token`
  ADD PRIMARY KEY (`key`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_auth_area`
--
ALTER TABLE `auth_user_auth_area`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_auth_area_myuser_id_area_id_02a19d63_uniq` (`myuser_id`,`area_id`),
  ADD KEY `auth_user_auth_area_area_id_d1e54c70_fk_personnel_area_id` (`area_id`);

--
-- Indexes for table `auth_user_auth_dept`
--
ALTER TABLE `auth_user_auth_dept`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_auth_dept_myuser_id_department_id_61d83386_uniq` (`myuser_id`,`department_id`),
  ADD KEY `auth_user_auth_dept_department_id_5866c514_fk_personnel` (`department_id`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_myuser_id_group_id_664bdfc3_uniq` (`myuser_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_profile`
--
ALTER TABLE `auth_user_profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_myuser_id_permission_id_a558717f_uniq` (`myuser_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `base_adminlog`
--
ALTER TABLE `base_adminlog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `base_adminlog_content_type_id_3e553c30_fk_django_content_type_id` (`content_type_id`),
  ADD KEY `base_adminlog_user_id_ecf659f8_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `base_apilog`
--
ALTER TABLE `base_apilog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `base_apilog_content_type_id_43a54c7d_fk_django_content_type_id` (`content_type_id`),
  ADD KEY `base_apilog_user_id_c9f0bf2f_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `base_attparamdepts`
--
ALTER TABLE `base_attparamdepts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rulename` (`rulename`);

--
-- Indexes for table `base_autoattexporttask`
--
ALTER TABLE `base_autoattexporttask`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `task_code` (`task_code`);

--
-- Indexes for table `base_autoexporttask`
--
ALTER TABLE `base_autoexporttask`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `task_code` (`task_code`);

--
-- Indexes for table `base_bookmark`
--
ALTER TABLE `base_bookmark`
  ADD PRIMARY KEY (`id`),
  ADD KEY `base_bookmark_content_type_id_b6a0e799_fk_django_content_type_id` (`content_type_id`),
  ADD KEY `base_bookmark_user_id_5f2d5ca2_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `base_dbbackuplog`
--
ALTER TABLE `base_dbbackuplog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `base_dbmigrate`
--
ALTER TABLE `base_dbmigrate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `base_emailtemplate`
--
ALTER TABLE `base_emailtemplate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `base_eventalertsetting`
--
ALTER TABLE `base_eventalertsetting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `base_linenotifysetting`
--
ALTER TABLE `base_linenotifysetting`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `base_linenotifysetting_line_notify_dept_id_line_dd79374f_uniq` (`line_notify_dept_id`,`line_notify_token`,`message_type`),
  ADD KEY `base_linenotifysetting_line_notify_dept_id_0643a5ed` (`line_notify_dept_id`);

--
-- Indexes for table `base_securitypolicy`
--
ALTER TABLE `base_securitypolicy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `base_sendemail`
--
ALTER TABLE `base_sendemail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `base_sftpsetting`
--
ALTER TABLE `base_sftpsetting`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `base_sftpsetting_user_name_host_f95e6bd9_uniq` (`user_name`,`host`);

--
-- Indexes for table `base_sysparam`
--
ALTER TABLE `base_sysparam`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `base_sysparam_para_name_para_type_3086789a_uniq` (`para_name`,`para_type`);

--
-- Indexes for table `base_sysparamdept`
--
ALTER TABLE `base_sysparamdept`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rule_name` (`rule_name`);

--
-- Indexes for table `base_systemlog`
--
ALTER TABLE `base_systemlog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `base_systemsetting`
--
ALTER TABLE `base_systemsetting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `base_taskresultlog`
--
ALTER TABLE `base_taskresultlog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_celery_beat_clockedschedule`
--
ALTER TABLE `django_celery_beat_clockedschedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_celery_beat_crontabschedule`
--
ALTER TABLE `django_celery_beat_crontabschedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_celery_beat_intervalschedule`
--
ALTER TABLE `django_celery_beat_intervalschedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_celery_beat_periodictask`
--
ALTER TABLE `django_celery_beat_periodictask`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `django_celery_beat_p_crontab_id_d3cba168_fk_django_ce` (`crontab_id`),
  ADD KEY `django_celery_beat_p_interval_id_a8ca27da_fk_django_ce` (`interval_id`),
  ADD KEY `django_celery_beat_p_solar_id_a87ce72c_fk_django_ce` (`solar_id`),
  ADD KEY `django_celery_beat_p_clocked_id_47a69f82_fk_django_ce` (`clocked_id`);

--
-- Indexes for table `django_celery_beat_periodictasks`
--
ALTER TABLE `django_celery_beat_periodictasks`
  ADD PRIMARY KEY (`ident`);

--
-- Indexes for table `django_celery_beat_solarschedule`
--
ALTER TABLE `django_celery_beat_solarschedule`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_celery_beat_solar_event_latitude_longitude_ba64999a_uniq` (`event`,`latitude`,`longitude`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `ep_epsetup`
--
ALTER TABLE `ep_epsetup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ep_eptransaction`
--
ALTER TABLE `ep_eptransaction`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ep_eptransaction_emp_id_check_datetime_57cec995_uniq` (`emp_id`,`check_datetime`),
  ADD KEY `ep_eptransaction_terminal_id_4490b209_fk_iclock_terminal_id` (`terminal_id`);

--
-- Indexes for table `guardian_groupobjectpermission`
--
ALTER TABLE `guardian_groupobjectpermission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `guardian_groupobjectperm_group_id_permission_id_o_3f189f7c_uniq` (`group_id`,`permission_id`,`object_pk`),
  ADD KEY `guardian_groupobject_content_type_id_7ade36b8_fk_django_co` (`content_type_id`),
  ADD KEY `guardian_groupobject_permission_id_36572738_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `guardian_userobjectpermission`
--
ALTER TABLE `guardian_userobjectpermission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `guardian_userobjectpermi_user_id_permission_id_ob_b0b3d2fc_uniq` (`user_id`,`permission_id`,`object_pk`),
  ADD KEY `guardian_userobjectp_content_type_id_2e892405_fk_django_co` (`content_type_id`),
  ADD KEY `guardian_userobjectp_permission_id_71807bfc_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `iclock_biodata`
--
ALTER TABLE `iclock_biodata`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `iclock_biodata_employee_id_bio_no_bio_i_b71b2ca9_uniq` (`employee_id`,`bio_no`,`bio_index`,`bio_type`,`bio_format`,`major_ver`);

--
-- Indexes for table `iclock_biophoto`
--
ALTER TABLE `iclock_biophoto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iclock_biophoto_employee_id_3dba5819_fk_personnel_employee_id` (`employee_id`);

--
-- Indexes for table `iclock_devicemoduleconfig`
--
ALTER TABLE `iclock_devicemoduleconfig`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `iclock_errorcommandlog`
--
ALTER TABLE `iclock_errorcommandlog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iclock_errorcommandl_terminal_id_3b2d7cbd_fk_iclock_te` (`terminal_id`);

--
-- Indexes for table `iclock_privatemessage`
--
ALTER TABLE `iclock_privatemessage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iclock_privatemessag_employee_id_e84a34c0_fk_personnel` (`employee_id`),
  ADD KEY `iclock_privatemessag_message_id_e3145d3b_fk_iclock_sh` (`message_id`);

--
-- Indexes for table `iclock_publicmessage`
--
ALTER TABLE `iclock_publicmessage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iclock_publicmessage_message_id_7d125e28_fk_iclock_sh` (`message_id`),
  ADD KEY `iclock_publicmessage_terminal_id_c3b5e4cf_fk_iclock_terminal_id` (`terminal_id`);

--
-- Indexes for table `iclock_shortmessage`
--
ALTER TABLE `iclock_shortmessage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `iclock_terminal`
--
ALTER TABLE `iclock_terminal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sn` (`sn`),
  ADD KEY `iclock_terminal_area_id_c019c6f0` (`area_id`);

--
-- Indexes for table `iclock_terminalcommand`
--
ALTER TABLE `iclock_terminalcommand`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iclock_terminalcomma_terminal_id_3dcf836f_fk_iclock_te` (`terminal_id`);

--
-- Indexes for table `iclock_terminalcommandlog`
--
ALTER TABLE `iclock_terminalcommandlog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iclock_terminalcomma_terminal_id_35ea8b2b_fk_iclock_te` (`terminal_id`);

--
-- Indexes for table `iclock_terminalemployee`
--
ALTER TABLE `iclock_terminalemployee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `iclock_terminallog`
--
ALTER TABLE `iclock_terminallog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iclock_terminallog_terminal_id_667b3ea7_fk_iclock_terminal_id` (`terminal_id`);

--
-- Indexes for table `iclock_terminalparameter`
--
ALTER TABLE `iclock_terminalparameter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `iclock_terminalparameter_terminal_id_param_name_8abbb5c0_uniq` (`terminal_id`,`param_name`);

--
-- Indexes for table `iclock_terminaluploadlog`
--
ALTER TABLE `iclock_terminaluploadlog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iclock_terminaluploa_terminal_id_9c9a7664_fk_iclock_te` (`terminal_id`);

--
-- Indexes for table `iclock_terminalworkcode`
--
ALTER TABLE `iclock_terminalworkcode`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `iclock_transaction`
--
ALTER TABLE `iclock_transaction`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `iclock_transaction_emp_code_punch_time_ca282852_uniq` (`emp_code`,`punch_time`),
  ADD KEY `iclock_transaction_emp_id_60fa3521_fk_personnel_employee_id` (`emp_id`),
  ADD KEY `iclock_transaction_terminal_id_451c81c2_fk_iclock_terminal_id` (`terminal_id`);

--
-- Indexes for table `iclock_transactionproofcmd`
--
ALTER TABLE `iclock_transactionproofcmd`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iclock_transactionpr_terminal_id_08b81e1e_fk_iclock_te` (`terminal_id`);

--
-- Indexes for table `iclock_visitorbiodata`
--
ALTER TABLE `iclock_visitorbiodata`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `iclock_visitorbiodata_visitor_id_bio_no_bio_in_92df53c1_uniq` (`visitor_id`,`bio_no`,`bio_index`,`bio_type`,`bio_format`,`major_ver`);

--
-- Indexes for table `meeting_meetingentity`
--
ALTER TABLE `meeting_meetingentity`
  ADD PRIMARY KEY (`workflowinstance_ptr_id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `meeting_meetingentity_room_id_bc2c738e_fk_meeting_meetingroom_id` (`room_id`);

--
-- Indexes for table `meeting_meetingentity_attender`
--
ALTER TABLE `meeting_meetingentity_attender`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `meeting_meetingentity_at_meetingentity_id_employe_b556fc2d_uniq` (`meetingentity_id`,`employee_id`),
  ADD KEY `meeting_meetingentit_employee_id_ee898064_fk_personnel` (`employee_id`);

--
-- Indexes for table `meeting_meetingmanuallog`
--
ALTER TABLE `meeting_meetingmanuallog`
  ADD PRIMARY KEY (`workflowinstance_ptr_id`),
  ADD KEY `meeting_meetingmanua_meeting_id_a672eaaf_fk_meeting_m` (`meeting_id`);

--
-- Indexes for table `meeting_meetingpayloadbase`
--
ALTER TABLE `meeting_meetingpayloadbase`
  ADD PRIMARY KEY (`id`),
  ADD KEY `meeting_meetingpaylo_emp_id_ed6ec148_fk_personnel` (`emp_id`),
  ADD KEY `meeting_meetingpaylo_meeting_id_ca9d20cc_fk_meeting_m` (`meeting_id`);

--
-- Indexes for table `meeting_meetingroom`
--
ALTER TABLE `meeting_meetingroom`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `meeting_meetingroomdevice`
--
ALTER TABLE `meeting_meetingroomdevice`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `device_id` (`device_id`),
  ADD KEY `meeting_meetingroomd_room_id_e000d78d_fk_meeting_m` (`room_id`);

--
-- Indexes for table `meeting_meetingtransaction`
--
ALTER TABLE `meeting_meetingtransaction`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `meeting_meetingtransaction_emp_id_punch_datetime_65665dce_uniq` (`emp_id`,`punch_datetime`),
  ADD KEY `meeting_meetingtrans_meeting_id_e4e505e5_fk_meeting_m` (`meeting_id`),
  ADD KEY `meeting_meetingtrans_terminal_id_047426f2_fk_iclock_te` (`terminal_id`);

--
-- Indexes for table `mobile_announcement`
--
ALTER TABLE `mobile_announcement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mobile_announcement_admin_id_6af3868c_fk_auth_user_id` (`admin_id`),
  ADD KEY `mobile_announcement_init_sender_id_2f5e35bd_fk_personnel` (`init_sender_id`),
  ADD KEY `mobile_announcement_receiver_id_ddf2a860_fk_personnel` (`receiver_id`);

--
-- Indexes for table `mobile_appactionlog`
--
ALTER TABLE `mobile_appactionlog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mobile_applist`
--
ALTER TABLE `mobile_applist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mobile_appnotification`
--
ALTER TABLE `mobile_appnotification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mobile_appnotification_admin_id_29c27197_fk_auth_user_id` (`admin_id`),
  ADD KEY `mobile_appnotificati_init_sender_id_d8aff845_fk_personnel` (`init_sender_id`),
  ADD KEY `mobile_appnotificati_receiver_id_90c4a355_fk_personnel` (`receiver_id`);

--
-- Indexes for table `mobile_gpsfordepartment`
--
ALTER TABLE `mobile_gpsfordepartment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mobile_gpsfordepartm_department_id_988ccf22_fk_personnel` (`department_id`);

--
-- Indexes for table `mobile_gpsfordepartment_location`
--
ALTER TABLE `mobile_gpsfordepartment_location`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile_gpsfordepartment__gpsfordepartment_id_gpsl_58226033_uniq` (`gpsfordepartment_id`,`gpslocation_id`),
  ADD KEY `mobile_gpsfordepartm_gpslocation_id_48b82e9e_fk_mobile_gp` (`gpslocation_id`);

--
-- Indexes for table `mobile_gpsforemployee`
--
ALTER TABLE `mobile_gpsforemployee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mobile_gpsforemploye_employee_id_982b7cef_fk_personnel` (`employee_id`);

--
-- Indexes for table `mobile_gpsforemployee_location`
--
ALTER TABLE `mobile_gpsforemployee_location`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile_gpsforemployee_lo_gpsforemployee_id_gpsloc_9ceb93bf_uniq` (`gpsforemployee_id`,`gpslocation_id`),
  ADD KEY `mobile_gpsforemploye_gpslocation_id_497a214f_fk_mobile_gp` (`gpslocation_id`);

--
-- Indexes for table `mobile_gpslocation`
--
ALTER TABLE `mobile_gpslocation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payroll_deductionformula`
--
ALTER TABLE `payroll_deductionformula`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `payroll_emploan`
--
ALTER TABLE `payroll_emploan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payroll_emploan_employee_id_97a251ef_fk_personnel_employee_id` (`employee_id`);

--
-- Indexes for table `payroll_emppayrollprofile`
--
ALTER TABLE `payroll_emppayrollprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_id` (`employee_id`);

--
-- Indexes for table `payroll_exceptionformula`
--
ALTER TABLE `payroll_exceptionformula`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `payroll_exceptionformula_pay_code_id_97609b51_fk_att_paycode_id` (`pay_code_id`);

--
-- Indexes for table `payroll_extradeduction`
--
ALTER TABLE `payroll_extradeduction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payroll_extradeducti_employee_id_53072441_fk_personnel` (`employee_id`);

--
-- Indexes for table `payroll_extraincrease`
--
ALTER TABLE `payroll_extraincrease`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payroll_extraincreas_employee_id_f902e6bb_fk_personnel` (`employee_id`);

--
-- Indexes for table `payroll_increasementformula`
--
ALTER TABLE `payroll_increasementformula`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `payroll_leaveformula`
--
ALTER TABLE `payroll_leaveformula`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `payroll_leaveformula_pay_code_id_63c7b4bd_fk_att_paycode_id` (`pay_code_id`);

--
-- Indexes for table `payroll_overtimeformula`
--
ALTER TABLE `payroll_overtimeformula`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `payroll_overtimeformula_pay_code_id_36d2f10e_fk_att_paycode_id` (`pay_code_id`);

--
-- Indexes for table `payroll_payrollpayload`
--
ALTER TABLE `payroll_payrollpayload`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payroll_payrollpaylo_employee_id_bc868f2b_fk_personnel` (`employee_id`);

--
-- Indexes for table `payroll_payrollpayloadpaycode`
--
ALTER TABLE `payroll_payrollpayloadpaycode`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payroll_payrollpaylo_pay_code_id_c057af1f_fk_att_payco` (`pay_code_id`),
  ADD KEY `payroll_payrollpaylo_payload_id_f085c4e8_fk_payroll_p` (`payload_id`);

--
-- Indexes for table `payroll_reimbursement`
--
ALTER TABLE `payroll_reimbursement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payroll_reimbursemen_employee_id_c4bbde36_fk_personnel` (`employee_id`);

--
-- Indexes for table `payroll_salaryadvance`
--
ALTER TABLE `payroll_salaryadvance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payroll_salaryadvanc_employee_id_2abd43e5_fk_personnel` (`employee_id`);

--
-- Indexes for table `payroll_salarystructure`
--
ALTER TABLE `payroll_salarystructure`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payroll_salarystruct_employee_id_98996e15_fk_personnel` (`employee_id`);

--
-- Indexes for table `payroll_salarystructure_deductionformula`
--
ALTER TABLE `payroll_salarystructure_deductionformula`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payroll_salarystructure__salarystructure_id_deduc_794e8449_uniq` (`salarystructure_id`,`deductionformula_id`),
  ADD KEY `payroll_salarystruct_deductionformula_id_b174d5b6_fk_payroll_d` (`deductionformula_id`);

--
-- Indexes for table `payroll_salarystructure_exceptionformula`
--
ALTER TABLE `payroll_salarystructure_exceptionformula`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payroll_salarystructure__salarystructure_id_excep_a5e869ff_uniq` (`salarystructure_id`,`exceptionformula_id`),
  ADD KEY `payroll_salarystruct_exceptionformula_id_8f6dadb3_fk_payroll_e` (`exceptionformula_id`);

--
-- Indexes for table `payroll_salarystructure_increasementformula`
--
ALTER TABLE `payroll_salarystructure_increasementformula`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payroll_salarystructure__salarystructure_id_incre_749132b3_uniq` (`salarystructure_id`,`increasementformula_id`),
  ADD KEY `payroll_salarystruct_increasementformula__3cd77082_fk_payroll_i` (`increasementformula_id`);

--
-- Indexes for table `payroll_salarystructure_leaveformula`
--
ALTER TABLE `payroll_salarystructure_leaveformula`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payroll_salarystructure__salarystructure_id_leave_4efdce30_uniq` (`salarystructure_id`,`leaveformula_id`),
  ADD KEY `payroll_salarystruct_leaveformula_id_049f9024_fk_payroll_l` (`leaveformula_id`);

--
-- Indexes for table `payroll_salarystructure_overtimeformula`
--
ALTER TABLE `payroll_salarystructure_overtimeformula`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payroll_salarystructure__salarystructure_id_overt_0d0a0e81_uniq` (`salarystructure_id`,`overtimeformula_id`),
  ADD KEY `payroll_salarystruct_overtimeformula_id_40ad89ef_fk_payroll_o` (`overtimeformula_id`);

--
-- Indexes for table `personnel_area`
--
ALTER TABLE `personnel_area`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `area_code` (`area_code`),
  ADD KEY `personnel_area_parent_area_id_39028fda_fk_personnel_area_id` (`parent_area_id`);

--
-- Indexes for table `personnel_assignareaemployee`
--
ALTER TABLE `personnel_assignareaemployee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `personnel_assignarea_area_id_6f049d6a_fk_personnel` (`area_id`),
  ADD KEY `personnel_assignarea_employee_id_a3d4dd25_fk_personnel` (`employee_id`);

--
-- Indexes for table `personnel_certification`
--
ALTER TABLE `personnel_certification`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cert_code` (`cert_code`),
  ADD UNIQUE KEY `cert_name` (`cert_name`);

--
-- Indexes for table `personnel_department`
--
ALTER TABLE `personnel_department`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dept_code` (`dept_code`),
  ADD KEY `personnel_department_parent_dept_id_d0b44024_fk_personnel` (`parent_dept_id`);

--
-- Indexes for table `personnel_employee`
--
ALTER TABLE `personnel_employee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `emp_code` (`emp_code`),
  ADD KEY `personnel_employee_department_id_068bbd08` (`department_id`),
  ADD KEY `personnel_employee_position_id_c9321343` (`position_id`);

--
-- Indexes for table `personnel_employeecalendar`
--
ALTER TABLE `personnel_employeecalendar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personnel_employeecalendar_employee_id_calendar_10f7278d_uniq` (`employee_id`,`calendar`);

--
-- Indexes for table `personnel_employeecertification`
--
ALTER TABLE `personnel_employeecertification`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personnel_employeecertif_employee_id_certificatio_7bcf4c7d_uniq` (`employee_id`,`certification_id`),
  ADD KEY `personnel_employeece_certification_id_faabed40_fk_personnel` (`certification_id`);

--
-- Indexes for table `personnel_employeecustomattribute`
--
ALTER TABLE `personnel_employeecustomattribute`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `attr_name` (`attr_name`);

--
-- Indexes for table `personnel_employeeextrainfo`
--
ALTER TABLE `personnel_employeeextrainfo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_id` (`employee_id`);

--
-- Indexes for table `personnel_employeeleavebalance`
--
ALTER TABLE `personnel_employeeleavebalance`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personnel_employeeleaveb_employee_id_leave_type_i_4d9211f4_uniq` (`employee_id`,`leave_type_id`),
  ADD KEY `personnel_employeele_leave_type_id_c5be9dff_fk_att_payco` (`leave_type_id`);

--
-- Indexes for table `personnel_employeeprofile`
--
ALTER TABLE `personnel_employeeprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `emp_id` (`emp_id`);

--
-- Indexes for table `personnel_employee_area`
--
ALTER TABLE `personnel_employee_area`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personnel_employee_area_employee_id_area_id_00b3d777_uniq` (`employee_id`,`area_id`),
  ADD KEY `personnel_employee_area_area_id_64c21925_fk_personnel_area_id` (`area_id`);

--
-- Indexes for table `personnel_employee_flow_role`
--
ALTER TABLE `personnel_employee_flow_role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personnel_employee_flow__employee_id_workflowrole_46b0e5e0_uniq` (`employee_id`,`workflowrole_id`),
  ADD KEY `personnel_employee_f_workflowrole_id_4704db32_fk_workflow_` (`workflowrole_id`);

--
-- Indexes for table `personnel_employment`
--
ALTER TABLE `personnel_employment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_id` (`employee_id`);

--
-- Indexes for table `personnel_position`
--
ALTER TABLE `personnel_position`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `position_code` (`position_code`),
  ADD KEY `personnel_position_parent_position_id_a496a36b_fk_personnel` (`parent_position_id`);

--
-- Indexes for table `personnel_resign`
--
ALTER TABLE `personnel_resign`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employee_id` (`employee_id`);

--
-- Indexes for table `staff_stafftoken`
--
ALTER TABLE `staff_stafftoken`
  ADD PRIMARY KEY (`key`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `sync_area`
--
ALTER TABLE `sync_area`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sync_area_area_code_area_name_200046d1_uniq` (`area_code`,`area_name`);

--
-- Indexes for table `sync_department`
--
ALTER TABLE `sync_department`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sync_department_dept_code_dept_name_93923213_uniq` (`dept_code`,`dept_name`);

--
-- Indexes for table `sync_employee`
--
ALTER TABLE `sync_employee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sync_employee_emp_code_521bf06d_uniq` (`emp_code`);

--
-- Indexes for table `sync_job`
--
ALTER TABLE `sync_job`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sync_job_job_code_job_name_4ec5619e_uniq` (`job_code`,`job_name`);

--
-- Indexes for table `visitor_reason`
--
ALTER TABLE `visitor_reason`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visitor_reservation`
--
ALTER TABLE `visitor_reservation`
  ADD PRIMARY KEY (`workflowinstance_ptr_id`),
  ADD KEY `visitor_reservation_cert_type_id_4f047f2a_fk_personnel` (`cert_type_id`),
  ADD KEY `visitor_reservation_visit_reason_id_c9ac83ac_fk_visitor_r` (`visit_reason_id`),
  ADD KEY `visitor_reservation_visit_department_id_2d293e10` (`visit_department_id`);

--
-- Indexes for table `visitor_visitor`
--
ALTER TABLE `visitor_visitor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `visitor_code` (`visitor_code`),
  ADD KEY `visitor_visitor_cert_type_id_f62ea604_fk_personnel` (`cert_type_id`),
  ADD KEY `visitor_visitor_visit_reason_id_4b9a2d23_fk_visitor_reason_id` (`visit_reason_id`),
  ADD KEY `visitor_visitor_visit_department_id_f7dbdcb4` (`visit_department_id`),
  ADD KEY `visitor_visitor_visited_id_8043a7ea` (`visited_id`);

--
-- Indexes for table `visitor_visitorconfig`
--
ALTER TABLE `visitor_visitorconfig`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visitor_visitorlog`
--
ALTER TABLE `visitor_visitorlog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `visitor_visitorlog_visitor_id_ebaafde1_fk_visitor_visitor_id` (`visitor_id`);

--
-- Indexes for table `visitor_visitor_acc_groups`
--
ALTER TABLE `visitor_visitor_acc_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `visitor_visitor_acc_groups_visitor_id_accgroups_id_bb522609_uniq` (`visitor_id`,`accgroups_id`),
  ADD KEY `visitor_visitor_acc__accgroups_id_b1487149_fk_acc_accgr` (`accgroups_id`);

--
-- Indexes for table `visitor_visitor_area`
--
ALTER TABLE `visitor_visitor_area`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `visitor_visitor_area_visitor_id_area_id_27d158cc_uniq` (`visitor_id`,`area_id`),
  ADD KEY `visitor_visitor_area_area_id_b402c047_fk_personnel_area_id` (`area_id`);

--
-- Indexes for table `workflow_nodeinstance`
--
ALTER TABLE `workflow_nodeinstance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workflow_nodeinstanc_approver_employee_id_d36cd45d_fk_personnel` (`approver_employee_id`),
  ADD KEY `workflow_nodeinstanc_workflow_instance_id_afe84fe4_fk_workflow_` (`workflow_instance_id`),
  ADD KEY `workflow_nodeinstanc_workflow_node_id_166f36c4_fk_workflow_` (`workflow_node_id`);

--
-- Indexes for table `workflow_workflowengine`
--
ALTER TABLE `workflow_workflowengine`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `workflow_code` (`workflow_code`),
  ADD KEY `workflow_workfloweng_applicant_position_i_8a65e03a_fk_personnel` (`applicant_position_id`),
  ADD KEY `workflow_workfloweng_content_type_id_f7345c20_fk_django_co` (`content_type_id`),
  ADD KEY `workflow_workflowengine_departments_id_0f06d4c7` (`departments_id`);

--
-- Indexes for table `workflow_workflowengine_employee`
--
ALTER TABLE `workflow_workflowengine_employee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `workflow_workflowengine__workflowengine_id_employ_8128deb2_uniq` (`workflowengine_id`,`employee_id`),
  ADD KEY `workflow_workfloweng_employee_id_803a409e_fk_personnel` (`employee_id`);

--
-- Indexes for table `workflow_workflowinstance`
--
ALTER TABLE `workflow_workflowinstance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workflow_workflowins_workflow_engine_id_1e6ac40f_fk_workflow_` (`workflow_engine_id`),
  ADD KEY `workflow_workflowinstance_employee_id_c7cff08e` (`employee_id`);

--
-- Indexes for table `workflow_workflownode`
--
ALTER TABLE `workflow_workflownode`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workflow_workflownod_workflow_engine_id_04c8f470_fk_workflow_` (`workflow_engine_id`);

--
-- Indexes for table `workflow_workflownode_approver`
--
ALTER TABLE `workflow_workflownode_approver`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `workflow_workflownode_ap_workflownode_id_workflow_7543ba37_uniq` (`workflownode_id`,`workflowrole_id`),
  ADD KEY `workflow_workflownod_workflowrole_id_c8e00d42_fk_workflow_` (`workflowrole_id`);

--
-- Indexes for table `workflow_workflownode_notifier`
--
ALTER TABLE `workflow_workflownode_notifier`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `workflow_workflownode_no_workflownode_id_workflow_cac02b37_uniq` (`workflownode_id`,`workflowrole_id`),
  ADD KEY `workflow_workflownod_workflowrole_id_73de7fc2_fk_workflow_` (`workflowrole_id`);

--
-- Indexes for table `workflow_workflowrole`
--
ALTER TABLE `workflow_workflowrole`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_code` (`role_code`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts_adminbiodata`
--
ALTER TABLE `accounts_adminbiodata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `accounts_usernotification`
--
ALTER TABLE `accounts_usernotification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `acc_acccombination`
--
ALTER TABLE `acc_acccombination`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `acc_accgroups`
--
ALTER TABLE `acc_accgroups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `acc_accholiday`
--
ALTER TABLE `acc_accholiday`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `acc_accprivilege`
--
ALTER TABLE `acc_accprivilege`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `acc_accterminal`
--
ALTER TABLE `acc_accterminal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `acc_acctimezone`
--
ALTER TABLE `acc_acctimezone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `attparam`
--
ALTER TABLE `attparam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `att_attcalclog`
--
ALTER TABLE `att_attcalclog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_attcode`
--
ALTER TABLE `att_attcode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `att_attemployee`
--
ALTER TABLE `att_attemployee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `att_attgroup`
--
ALTER TABLE `att_attgroup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `att_attpolicy`
--
ALTER TABLE `att_attpolicy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `att_attreportsetting`
--
ALTER TABLE `att_attreportsetting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `att_attschedule`
--
ALTER TABLE `att_attschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_attshift`
--
ALTER TABLE `att_attshift`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_breaktime`
--
ALTER TABLE `att_breaktime`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_departmentpolicy`
--
ALTER TABLE `att_departmentpolicy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_departmentschedule`
--
ALTER TABLE `att_departmentschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_deptattrule`
--
ALTER TABLE `att_deptattrule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_grouppolicy`
--
ALTER TABLE `att_grouppolicy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_groupschedule`
--
ALTER TABLE `att_groupschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_holiday`
--
ALTER TABLE `att_holiday`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_overtimepolicy`
--
ALTER TABLE `att_overtimepolicy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_paycode`
--
ALTER TABLE `att_paycode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `att_payloadmulpunchset`
--
ALTER TABLE `att_payloadmulpunchset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_reporttemplate`
--
ALTER TABLE `att_reporttemplate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_shiftdetail`
--
ALTER TABLE `att_shiftdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_temporaryschedule`
--
ALTER TABLE `att_temporaryschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_tempschedule`
--
ALTER TABLE `att_tempschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_timeinterval`
--
ALTER TABLE `att_timeinterval`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_timeinterval_break_time`
--
ALTER TABLE `att_timeinterval_break_time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=866;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `auth_user_auth_area`
--
ALTER TABLE `auth_user_auth_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_auth_dept`
--
ALTER TABLE `auth_user_auth_dept`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_profile`
--
ALTER TABLE `auth_user_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `base_adminlog`
--
ALTER TABLE `base_adminlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `base_apilog`
--
ALTER TABLE `base_apilog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `base_attparamdepts`
--
ALTER TABLE `base_attparamdepts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `base_autoattexporttask`
--
ALTER TABLE `base_autoattexporttask`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `base_autoexporttask`
--
ALTER TABLE `base_autoexporttask`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `base_bookmark`
--
ALTER TABLE `base_bookmark`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `base_dbbackuplog`
--
ALTER TABLE `base_dbbackuplog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `base_dbmigrate`
--
ALTER TABLE `base_dbmigrate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `base_emailtemplate`
--
ALTER TABLE `base_emailtemplate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `base_eventalertsetting`
--
ALTER TABLE `base_eventalertsetting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `base_linenotifysetting`
--
ALTER TABLE `base_linenotifysetting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `base_securitypolicy`
--
ALTER TABLE `base_securitypolicy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `base_sendemail`
--
ALTER TABLE `base_sendemail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `base_sftpsetting`
--
ALTER TABLE `base_sftpsetting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `base_sysparam`
--
ALTER TABLE `base_sysparam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `base_sysparamdept`
--
ALTER TABLE `base_sysparamdept`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `base_systemlog`
--
ALTER TABLE `base_systemlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `base_systemsetting`
--
ALTER TABLE `base_systemsetting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `base_taskresultlog`
--
ALTER TABLE `base_taskresultlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `django_celery_beat_clockedschedule`
--
ALTER TABLE `django_celery_beat_clockedschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_celery_beat_crontabschedule`
--
ALTER TABLE `django_celery_beat_crontabschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `django_celery_beat_intervalschedule`
--
ALTER TABLE `django_celery_beat_intervalschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `django_celery_beat_periodictask`
--
ALTER TABLE `django_celery_beat_periodictask`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `django_celery_beat_solarschedule`
--
ALTER TABLE `django_celery_beat_solarschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=180;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `ep_epsetup`
--
ALTER TABLE `ep_epsetup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ep_eptransaction`
--
ALTER TABLE `ep_eptransaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guardian_groupobjectpermission`
--
ALTER TABLE `guardian_groupobjectpermission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `guardian_userobjectpermission`
--
ALTER TABLE `guardian_userobjectpermission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iclock_biodata`
--
ALTER TABLE `iclock_biodata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `iclock_biophoto`
--
ALTER TABLE `iclock_biophoto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iclock_devicemoduleconfig`
--
ALTER TABLE `iclock_devicemoduleconfig`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `iclock_errorcommandlog`
--
ALTER TABLE `iclock_errorcommandlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iclock_privatemessage`
--
ALTER TABLE `iclock_privatemessage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iclock_publicmessage`
--
ALTER TABLE `iclock_publicmessage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iclock_shortmessage`
--
ALTER TABLE `iclock_shortmessage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iclock_terminal`
--
ALTER TABLE `iclock_terminal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `iclock_terminalcommand`
--
ALTER TABLE `iclock_terminalcommand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=274;

--
-- AUTO_INCREMENT for table `iclock_terminalcommandlog`
--
ALTER TABLE `iclock_terminalcommandlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=204;

--
-- AUTO_INCREMENT for table `iclock_terminalemployee`
--
ALTER TABLE `iclock_terminalemployee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iclock_terminallog`
--
ALTER TABLE `iclock_terminallog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;

--
-- AUTO_INCREMENT for table `iclock_terminalparameter`
--
ALTER TABLE `iclock_terminalparameter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT for table `iclock_terminaluploadlog`
--
ALTER TABLE `iclock_terminaluploadlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=223;

--
-- AUTO_INCREMENT for table `iclock_terminalworkcode`
--
ALTER TABLE `iclock_terminalworkcode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iclock_transaction`
--
ALTER TABLE `iclock_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=366;

--
-- AUTO_INCREMENT for table `iclock_transactionproofcmd`
--
ALTER TABLE `iclock_transactionproofcmd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iclock_visitorbiodata`
--
ALTER TABLE `iclock_visitorbiodata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meeting_meetingentity_attender`
--
ALTER TABLE `meeting_meetingentity_attender`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meeting_meetingroom`
--
ALTER TABLE `meeting_meetingroom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meeting_meetingroomdevice`
--
ALTER TABLE `meeting_meetingroomdevice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meeting_meetingtransaction`
--
ALTER TABLE `meeting_meetingtransaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mobile_announcement`
--
ALTER TABLE `mobile_announcement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mobile_appactionlog`
--
ALTER TABLE `mobile_appactionlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mobile_applist`
--
ALTER TABLE `mobile_applist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mobile_appnotification`
--
ALTER TABLE `mobile_appnotification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mobile_gpsfordepartment`
--
ALTER TABLE `mobile_gpsfordepartment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mobile_gpsfordepartment_location`
--
ALTER TABLE `mobile_gpsfordepartment_location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mobile_gpsforemployee`
--
ALTER TABLE `mobile_gpsforemployee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mobile_gpsforemployee_location`
--
ALTER TABLE `mobile_gpsforemployee_location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mobile_gpslocation`
--
ALTER TABLE `mobile_gpslocation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_deductionformula`
--
ALTER TABLE `payroll_deductionformula`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_emploan`
--
ALTER TABLE `payroll_emploan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_emppayrollprofile`
--
ALTER TABLE `payroll_emppayrollprofile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `payroll_exceptionformula`
--
ALTER TABLE `payroll_exceptionformula`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_extradeduction`
--
ALTER TABLE `payroll_extradeduction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_extraincrease`
--
ALTER TABLE `payroll_extraincrease`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_increasementformula`
--
ALTER TABLE `payroll_increasementformula`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_leaveformula`
--
ALTER TABLE `payroll_leaveformula`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_overtimeformula`
--
ALTER TABLE `payroll_overtimeformula`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_payrollpayload`
--
ALTER TABLE `payroll_payrollpayload`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_payrollpayloadpaycode`
--
ALTER TABLE `payroll_payrollpayloadpaycode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_reimbursement`
--
ALTER TABLE `payroll_reimbursement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_salaryadvance`
--
ALTER TABLE `payroll_salaryadvance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_salarystructure`
--
ALTER TABLE `payroll_salarystructure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_salarystructure_deductionformula`
--
ALTER TABLE `payroll_salarystructure_deductionformula`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_salarystructure_exceptionformula`
--
ALTER TABLE `payroll_salarystructure_exceptionformula`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_salarystructure_increasementformula`
--
ALTER TABLE `payroll_salarystructure_increasementformula`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_salarystructure_leaveformula`
--
ALTER TABLE `payroll_salarystructure_leaveformula`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payroll_salarystructure_overtimeformula`
--
ALTER TABLE `payroll_salarystructure_overtimeformula`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personnel_area`
--
ALTER TABLE `personnel_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `personnel_assignareaemployee`
--
ALTER TABLE `personnel_assignareaemployee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personnel_certification`
--
ALTER TABLE `personnel_certification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personnel_department`
--
ALTER TABLE `personnel_department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personnel_employee`
--
ALTER TABLE `personnel_employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `personnel_employeecalendar`
--
ALTER TABLE `personnel_employeecalendar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personnel_employeecertification`
--
ALTER TABLE `personnel_employeecertification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personnel_employeecustomattribute`
--
ALTER TABLE `personnel_employeecustomattribute`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personnel_employeeextrainfo`
--
ALTER TABLE `personnel_employeeextrainfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `personnel_employeeleavebalance`
--
ALTER TABLE `personnel_employeeleavebalance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personnel_employeeprofile`
--
ALTER TABLE `personnel_employeeprofile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `personnel_employee_area`
--
ALTER TABLE `personnel_employee_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `personnel_employee_flow_role`
--
ALTER TABLE `personnel_employee_flow_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personnel_employment`
--
ALTER TABLE `personnel_employment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personnel_position`
--
ALTER TABLE `personnel_position`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personnel_resign`
--
ALTER TABLE `personnel_resign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sync_area`
--
ALTER TABLE `sync_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sync_department`
--
ALTER TABLE `sync_department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sync_employee`
--
ALTER TABLE `sync_employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sync_job`
--
ALTER TABLE `sync_job`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `visitor_reason`
--
ALTER TABLE `visitor_reason`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `visitor_visitor`
--
ALTER TABLE `visitor_visitor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `visitor_visitorconfig`
--
ALTER TABLE `visitor_visitorconfig`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `visitor_visitorlog`
--
ALTER TABLE `visitor_visitorlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `visitor_visitor_acc_groups`
--
ALTER TABLE `visitor_visitor_acc_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `visitor_visitor_area`
--
ALTER TABLE `visitor_visitor_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workflow_nodeinstance`
--
ALTER TABLE `workflow_nodeinstance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workflow_workflowengine`
--
ALTER TABLE `workflow_workflowengine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workflow_workflowengine_employee`
--
ALTER TABLE `workflow_workflowengine_employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workflow_workflowinstance`
--
ALTER TABLE `workflow_workflowinstance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workflow_workflownode`
--
ALTER TABLE `workflow_workflownode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workflow_workflownode_approver`
--
ALTER TABLE `workflow_workflownode_approver`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workflow_workflownode_notifier`
--
ALTER TABLE `workflow_workflownode_notifier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `workflow_workflowrole`
--
ALTER TABLE `workflow_workflowrole`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts_adminbiodata`
--
ALTER TABLE `accounts_adminbiodata`
  ADD CONSTRAINT `accounts_adminbiodata_admin_id_1e6d2d45_fk_auth_user_id` FOREIGN KEY (`admin_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `accounts_usernotification`
--
ALTER TABLE `accounts_usernotification`
  ADD CONSTRAINT `accounts_usernotification_user_id_b86755b3_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `acc_acccombination`
--
ALTER TABLE `acc_acccombination`
  ADD CONSTRAINT `acc_acccombination_area_id_0d22c34e_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`);

--
-- Constraints for table `acc_accgroups`
--
ALTER TABLE `acc_accgroups`
  ADD CONSTRAINT `acc_accgroups_area_id_b83745c3_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`);

--
-- Constraints for table `acc_accholiday`
--
ALTER TABLE `acc_accholiday`
  ADD CONSTRAINT `acc_accholiday_area_id_d15c19da_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`),
  ADD CONSTRAINT `acc_accholiday_holiday_id_a9efe924_fk_att_holiday_id` FOREIGN KEY (`holiday_id`) REFERENCES `att_holiday` (`id`),
  ADD CONSTRAINT `acc_accholiday_timezone_id_450d2d1e_fk_acc_acctimezone_id` FOREIGN KEY (`timezone_id`) REFERENCES `acc_acctimezone` (`id`);

--
-- Constraints for table `acc_accprivilege`
--
ALTER TABLE `acc_accprivilege`
  ADD CONSTRAINT `acc_accprivilege_area_id_2123ff6f_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`),
  ADD CONSTRAINT `acc_accprivilege_employee_id_5fc55f95_fk_personnel_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `acc_accprivilege_group_id_c5ed7003_fk_acc_accgroups_id` FOREIGN KEY (`group_id`) REFERENCES `acc_accgroups` (`id`);

--
-- Constraints for table `acc_accterminal`
--
ALTER TABLE `acc_accterminal`
  ADD CONSTRAINT `acc_accterminal_terminal_id_fc92cce2_fk_iclock_terminal_id` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`);

--
-- Constraints for table `acc_acctimezone`
--
ALTER TABLE `acc_acctimezone`
  ADD CONSTRAINT `acc_acctimezone_area_id_e9ce7a7a_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`);

--
-- Constraints for table `att_attemployee`
--
ALTER TABLE `att_attemployee`
  ADD CONSTRAINT `att_attemployee_emp_id_52457e3c_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `att_attemployee_group_id_18d3954d_fk_att_attgroup_id` FOREIGN KEY (`group_id`) REFERENCES `att_attgroup` (`id`);

--
-- Constraints for table `att_attschedule`
--
ALTER TABLE `att_attschedule`
  ADD CONSTRAINT `att_attschedule_employee_id_caa61686_fk_personnel_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `att_attschedule_shift_id_13d2db9a_fk_att_attshift_id` FOREIGN KEY (`shift_id`) REFERENCES `att_attshift` (`id`);

--
-- Constraints for table `att_breaktime`
--
ALTER TABLE `att_breaktime`
  ADD CONSTRAINT `att_breaktime_loss_code_id_2ffb5432_fk_att_paycode_id` FOREIGN KEY (`loss_code_id`) REFERENCES `att_paycode` (`id`),
  ADD CONSTRAINT `att_breaktime_profit_code_id_63cdbbcc_fk_att_paycode_id` FOREIGN KEY (`profit_code_id`) REFERENCES `att_paycode` (`id`);

--
-- Constraints for table `att_changeschedule`
--
ALTER TABLE `att_changeschedule`
  ADD CONSTRAINT `att_changeschedule_timeinterval_id_d41ac077_fk_att_timei` FOREIGN KEY (`timeinterval_id`) REFERENCES `att_timeinterval` (`id`),
  ADD CONSTRAINT `att_changeschedule_workflowinstance_ptr_cee602bb_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`);

--
-- Constraints for table `att_departmentpolicy`
--
ALTER TABLE `att_departmentpolicy`
  ADD CONSTRAINT `att_departmentpolicy_department_id_77059a9d_fk_personnel` FOREIGN KEY (`department_id`) REFERENCES `personnel_department` (`id`);

--
-- Constraints for table `att_departmentschedule`
--
ALTER TABLE `att_departmentschedule`
  ADD CONSTRAINT `att_departmentschedu_department_id_c68fca3d_fk_personnel` FOREIGN KEY (`department_id`) REFERENCES `personnel_department` (`id`),
  ADD CONSTRAINT `att_departmentschedule_shift_id_c37d5ade_fk_att_attshift_id` FOREIGN KEY (`shift_id`) REFERENCES `att_attshift` (`id`);

--
-- Constraints for table `att_deptattrule`
--
ALTER TABLE `att_deptattrule`
  ADD CONSTRAINT `att_deptattrule_department_id_f333c8f0_fk_personnel` FOREIGN KEY (`department_id`) REFERENCES `personnel_department` (`id`);

--
-- Constraints for table `att_grouppolicy`
--
ALTER TABLE `att_grouppolicy`
  ADD CONSTRAINT `att_grouppolicy_group_id_b2e4dfe8_fk_att_attgroup_id` FOREIGN KEY (`group_id`) REFERENCES `att_attgroup` (`id`);

--
-- Constraints for table `att_groupschedule`
--
ALTER TABLE `att_groupschedule`
  ADD CONSTRAINT `att_groupschedule_group_id_c341493f_fk_att_attgroup_id` FOREIGN KEY (`group_id`) REFERENCES `att_attgroup` (`id`),
  ADD CONSTRAINT `att_groupschedule_shift_id_287e7fc0_fk_att_attshift_id` FOREIGN KEY (`shift_id`) REFERENCES `att_attshift` (`id`);

--
-- Constraints for table `att_holiday`
--
ALTER TABLE `att_holiday`
  ADD CONSTRAINT `att_holiday_att_group_id_9ddf13ba_fk_att_attgroup_id` FOREIGN KEY (`att_group_id`) REFERENCES `att_attgroup` (`id`),
  ADD CONSTRAINT `att_holiday_department_id_fbbbd185_fk_personnel_department_id` FOREIGN KEY (`department_id`) REFERENCES `personnel_department` (`id`);

--
-- Constraints for table `att_leave`
--
ALTER TABLE `att_leave`
  ADD CONSTRAINT `att_leave_pay_code_id_2fadf493_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`),
  ADD CONSTRAINT `att_leave_workflowinstance_ptr_39aaa9d9_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`);

--
-- Constraints for table `att_manuallog`
--
ALTER TABLE `att_manuallog`
  ADD CONSTRAINT `att_manuallog_workflowinstance_ptr_22a3fbd0_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`);

--
-- Constraints for table `att_overtime`
--
ALTER TABLE `att_overtime`
  ADD CONSTRAINT `att_overtime_pay_code_id_05600ee0_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`),
  ADD CONSTRAINT `att_overtime_workflowinstance_ptr_6bd6a6f4_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`);

--
-- Constraints for table `att_overtimepolicy`
--
ALTER TABLE `att_overtimepolicy`
  ADD CONSTRAINT `att_overtimepolicy_overnight_pay_code_i_274ce1b0_fk_att_payco` FOREIGN KEY (`overnight_pay_code_id`) REFERENCES `att_paycode` (`id`),
  ADD CONSTRAINT `att_overtimepolicy_pay_code_id_285b0a61_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`);

--
-- Constraints for table `att_payloadattcode`
--
ALTER TABLE `att_payloadattcode`
  ADD CONSTRAINT `att_payloadattcode_att_code_id_0d635efd_fk_att_attcode_id` FOREIGN KEY (`att_code_id`) REFERENCES `att_attcode` (`id`),
  ADD CONSTRAINT `att_payloadattcode_emp_id_36569f54_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `att_payloadattcode_shift_id_731faddf_fk_att_attshift_id` FOREIGN KEY (`shift_id`) REFERENCES `att_attshift` (`id`);

--
-- Constraints for table `att_payloadbase`
--
ALTER TABLE `att_payloadbase`
  ADD CONSTRAINT `att_payloadbase_emp_id_2c0f6a7b_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `att_payloadbase_timetable_id_a389e3d8_fk_att_timeinterval_id` FOREIGN KEY (`timetable_id`) REFERENCES `att_timeinterval` (`id`);

--
-- Constraints for table `att_payloadeffectpunch`
--
ALTER TABLE `att_payloadeffectpunch`
  ADD CONSTRAINT `att_payloadeffectpun_trans_id_94affbe6_fk_iclock_tr` FOREIGN KEY (`trans_id`) REFERENCES `iclock_transaction` (`id`),
  ADD CONSTRAINT `att_payloadeffectpunch_emp_id_67e28e01_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `att_payloadexception`
--
ALTER TABLE `att_payloadexception`
  ADD CONSTRAINT `att_payloadexception_item_id_a08bfe48_fk_att_leave` FOREIGN KEY (`item_id`) REFERENCES `att_leave` (`workflowinstance_ptr_id`);

--
-- Constraints for table `att_payloadmulpunchset`
--
ALTER TABLE `att_payloadmulpunchset`
  ADD CONSTRAINT `att_payloadmulpunchset_emp_id_f47610c8_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `att_payloadparing`
--
ALTER TABLE `att_payloadparing`
  ADD CONSTRAINT `att_payloadparing_emp_id_c5daac4f_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `att_payloadparing_in_trans_id_50a8040e_fk_iclock_transaction_id` FOREIGN KEY (`in_trans_id`) REFERENCES `iclock_transaction` (`id`),
  ADD CONSTRAINT `att_payloadparing_out_trans_id_8b2375b9_fk_iclock_transaction_id` FOREIGN KEY (`out_trans_id`) REFERENCES `iclock_transaction` (`id`),
  ADD CONSTRAINT `att_payloadparing_pay_code_id_aa241cca_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`);

--
-- Constraints for table `att_payloadpaycode`
--
ALTER TABLE `att_payloadpaycode`
  ADD CONSTRAINT `att_payloadpaycode_emp_id_78e75279_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `att_payloadpaycode_pay_code_id_4a096cc7_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`),
  ADD CONSTRAINT `att_payloadpaycode_shift_id_79a0901e_fk_att_attshift_id` FOREIGN KEY (`shift_id`) REFERENCES `att_attshift` (`id`);

--
-- Constraints for table `att_payloadpunch`
--
ALTER TABLE `att_payloadpunch`
  ADD CONSTRAINT `att_payloadpunch_emp_id_053da2f0_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `att_payloadpunch_orig_id_16b26416_fk_iclock_transaction_id` FOREIGN KEY (`orig_id`) REFERENCES `iclock_transaction` (`id`);

--
-- Constraints for table `att_payloadtimecard`
--
ALTER TABLE `att_payloadtimecard`
  ADD CONSTRAINT `att_payloadtimecard_emp_id_47caeab4_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `att_payloadtimecard_time_table_id_6e0b0137_fk_att_timei` FOREIGN KEY (`time_table_id`) REFERENCES `att_timeinterval` (`id`);

--
-- Constraints for table `att_shiftdetail`
--
ALTER TABLE `att_shiftdetail`
  ADD CONSTRAINT `att_shiftdetail_shift_id_7d694501_fk_att_attshift_id` FOREIGN KEY (`shift_id`) REFERENCES `att_attshift` (`id`),
  ADD CONSTRAINT `att_shiftdetail_time_interval_id_777dde8f_fk_att_timeinterval_id` FOREIGN KEY (`time_interval_id`) REFERENCES `att_timeinterval` (`id`);

--
-- Constraints for table `att_temporaryschedule`
--
ALTER TABLE `att_temporaryschedule`
  ADD CONSTRAINT `att_temporaryschedul_employee_id_2b2b94c2_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `att_tempschedule`
--
ALTER TABLE `att_tempschedule`
  ADD CONSTRAINT `att_tempschedule_employee_id_b89c7e54_fk_personnel_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `att_timeinterval_break_time`
--
ALTER TABLE `att_timeinterval_break_time`
  ADD CONSTRAINT `att_timeinterval_bre_breaktime_id_08462308_fk_att_break` FOREIGN KEY (`breaktime_id`) REFERENCES `att_breaktime` (`id`),
  ADD CONSTRAINT `att_timeinterval_bre_timeinterval_id_2287017e_fk_att_timei` FOREIGN KEY (`timeinterval_id`) REFERENCES `att_timeinterval` (`id`);

--
-- Constraints for table `att_training`
--
ALTER TABLE `att_training`
  ADD CONSTRAINT `att_training_pay_code_id_5790afdd_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`),
  ADD CONSTRAINT `att_training_workflowinstance_ptr_0aef1508_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`);

--
-- Constraints for table `authtoken_token`
--
ALTER TABLE `authtoken_token`
  ADD CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_auth_area`
--
ALTER TABLE `auth_user_auth_area`
  ADD CONSTRAINT `auth_user_auth_area_area_id_d1e54c70_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`),
  ADD CONSTRAINT `auth_user_auth_area_myuser_id_5fb9a803_fk_auth_user_id` FOREIGN KEY (`myuser_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_auth_dept`
--
ALTER TABLE `auth_user_auth_dept`
  ADD CONSTRAINT `auth_user_auth_dept_department_id_5866c514_fk_personnel` FOREIGN KEY (`department_id`) REFERENCES `personnel_department` (`id`),
  ADD CONSTRAINT `auth_user_auth_dept_myuser_id_18a51b27_fk_auth_user_id` FOREIGN KEY (`myuser_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_myuser_id_d03e8dcc_fk_auth_user_id` FOREIGN KEY (`myuser_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_profile`
--
ALTER TABLE `auth_user_profile`
  ADD CONSTRAINT `auth_user_profile_user_id_f9aded29_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_myuser_id_679b1527_fk_auth_user_id` FOREIGN KEY (`myuser_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `base_adminlog`
--
ALTER TABLE `base_adminlog`
  ADD CONSTRAINT `base_adminlog_content_type_id_3e553c30_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `base_adminlog_user_id_ecf659f8_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `base_apilog`
--
ALTER TABLE `base_apilog`
  ADD CONSTRAINT `base_apilog_content_type_id_43a54c7d_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `base_apilog_user_id_c9f0bf2f_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `base_bookmark`
--
ALTER TABLE `base_bookmark`
  ADD CONSTRAINT `base_bookmark_content_type_id_b6a0e799_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `base_bookmark_user_id_5f2d5ca2_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `base_linenotifysetting`
--
ALTER TABLE `base_linenotifysetting`
  ADD CONSTRAINT `base_linenotifysetti_line_notify_dept_id_0643a5ed_fk_personnel` FOREIGN KEY (`line_notify_dept_id`) REFERENCES `personnel_department` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `django_celery_beat_periodictask`
--
ALTER TABLE `django_celery_beat_periodictask`
  ADD CONSTRAINT `django_celery_beat_p_clocked_id_47a69f82_fk_django_ce` FOREIGN KEY (`clocked_id`) REFERENCES `django_celery_beat_clockedschedule` (`id`),
  ADD CONSTRAINT `django_celery_beat_p_crontab_id_d3cba168_fk_django_ce` FOREIGN KEY (`crontab_id`) REFERENCES `django_celery_beat_crontabschedule` (`id`),
  ADD CONSTRAINT `django_celery_beat_p_interval_id_a8ca27da_fk_django_ce` FOREIGN KEY (`interval_id`) REFERENCES `django_celery_beat_intervalschedule` (`id`),
  ADD CONSTRAINT `django_celery_beat_p_solar_id_a87ce72c_fk_django_ce` FOREIGN KEY (`solar_id`) REFERENCES `django_celery_beat_solarschedule` (`id`);

--
-- Constraints for table `ep_eptransaction`
--
ALTER TABLE `ep_eptransaction`
  ADD CONSTRAINT `ep_eptransaction_emp_id_1006883f_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `ep_eptransaction_terminal_id_4490b209_fk_iclock_terminal_id` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`);

--
-- Constraints for table `guardian_groupobjectpermission`
--
ALTER TABLE `guardian_groupobjectpermission`
  ADD CONSTRAINT `guardian_groupobject_content_type_id_7ade36b8_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `guardian_groupobject_group_id_4bbbfb62_fk_auth_grou` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `guardian_groupobject_permission_id_36572738_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);

--
-- Constraints for table `guardian_userobjectpermission`
--
ALTER TABLE `guardian_userobjectpermission`
  ADD CONSTRAINT `guardian_userobjectp_content_type_id_2e892405_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `guardian_userobjectp_permission_id_71807bfc_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `guardian_userobjectpermission_user_id_d5c1e964_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `iclock_biodata`
--
ALTER TABLE `iclock_biodata`
  ADD CONSTRAINT `iclock_biodata_employee_id_ff748ea7_fk_personnel_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `iclock_biophoto`
--
ALTER TABLE `iclock_biophoto`
  ADD CONSTRAINT `iclock_biophoto_employee_id_3dba5819_fk_personnel_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `iclock_errorcommandlog`
--
ALTER TABLE `iclock_errorcommandlog`
  ADD CONSTRAINT `iclock_errorcommandl_terminal_id_3b2d7cbd_fk_iclock_te` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`);

--
-- Constraints for table `iclock_privatemessage`
--
ALTER TABLE `iclock_privatemessage`
  ADD CONSTRAINT `iclock_privatemessag_employee_id_e84a34c0_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `iclock_privatemessag_message_id_e3145d3b_fk_iclock_sh` FOREIGN KEY (`message_id`) REFERENCES `iclock_shortmessage` (`id`);

--
-- Constraints for table `iclock_publicmessage`
--
ALTER TABLE `iclock_publicmessage`
  ADD CONSTRAINT `iclock_publicmessage_message_id_7d125e28_fk_iclock_sh` FOREIGN KEY (`message_id`) REFERENCES `iclock_shortmessage` (`id`),
  ADD CONSTRAINT `iclock_publicmessage_terminal_id_c3b5e4cf_fk_iclock_terminal_id` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`);

--
-- Constraints for table `iclock_terminal`
--
ALTER TABLE `iclock_terminal`
  ADD CONSTRAINT `iclock_terminal_area_id_c019c6f0_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`);

--
-- Constraints for table `iclock_terminalcommand`
--
ALTER TABLE `iclock_terminalcommand`
  ADD CONSTRAINT `iclock_terminalcomma_terminal_id_3dcf836f_fk_iclock_te` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`);

--
-- Constraints for table `iclock_terminalcommandlog`
--
ALTER TABLE `iclock_terminalcommandlog`
  ADD CONSTRAINT `iclock_terminalcomma_terminal_id_35ea8b2b_fk_iclock_te` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`);

--
-- Constraints for table `iclock_terminallog`
--
ALTER TABLE `iclock_terminallog`
  ADD CONSTRAINT `iclock_terminallog_terminal_id_667b3ea7_fk_iclock_terminal_id` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`);

--
-- Constraints for table `iclock_terminalparameter`
--
ALTER TABLE `iclock_terminalparameter`
  ADD CONSTRAINT `iclock_terminalparam_terminal_id_443872e3_fk_iclock_te` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`);

--
-- Constraints for table `iclock_terminaluploadlog`
--
ALTER TABLE `iclock_terminaluploadlog`
  ADD CONSTRAINT `iclock_terminaluploa_terminal_id_9c9a7664_fk_iclock_te` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`);

--
-- Constraints for table `iclock_transaction`
--
ALTER TABLE `iclock_transaction`
  ADD CONSTRAINT `iclock_transaction_emp_id_60fa3521_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `iclock_transaction_terminal_id_451c81c2_fk_iclock_terminal_id` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`);

--
-- Constraints for table `iclock_transactionproofcmd`
--
ALTER TABLE `iclock_transactionproofcmd`
  ADD CONSTRAINT `iclock_transactionpr_terminal_id_08b81e1e_fk_iclock_te` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`);

--
-- Constraints for table `iclock_visitorbiodata`
--
ALTER TABLE `iclock_visitorbiodata`
  ADD CONSTRAINT `iclock_visitorbiodata_visitor_id_e0900ba5_fk_visitor_visitor_id` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_visitor` (`id`);

--
-- Constraints for table `meeting_meetingentity`
--
ALTER TABLE `meeting_meetingentity`
  ADD CONSTRAINT `meeting_meetingentit_workflowinstance_ptr_dbd9ab40_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`),
  ADD CONSTRAINT `meeting_meetingentity_room_id_bc2c738e_fk_meeting_meetingroom_id` FOREIGN KEY (`room_id`) REFERENCES `meeting_meetingroom` (`id`);

--
-- Constraints for table `meeting_meetingentity_attender`
--
ALTER TABLE `meeting_meetingentity_attender`
  ADD CONSTRAINT `meeting_meetingentit_employee_id_ee898064_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `meeting_meetingentit_meetingentity_id_b96dbc7d_fk_meeting_m` FOREIGN KEY (`meetingentity_id`) REFERENCES `meeting_meetingentity` (`workflowinstance_ptr_id`);

--
-- Constraints for table `meeting_meetingmanuallog`
--
ALTER TABLE `meeting_meetingmanuallog`
  ADD CONSTRAINT `meeting_meetingmanua_meeting_id_a672eaaf_fk_meeting_m` FOREIGN KEY (`meeting_id`) REFERENCES `meeting_meetingentity` (`workflowinstance_ptr_id`),
  ADD CONSTRAINT `meeting_meetingmanua_workflowinstance_ptr_bd514862_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`);

--
-- Constraints for table `meeting_meetingpayloadbase`
--
ALTER TABLE `meeting_meetingpayloadbase`
  ADD CONSTRAINT `meeting_meetingpaylo_emp_id_ed6ec148_fk_personnel` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `meeting_meetingpaylo_meeting_id_ca9d20cc_fk_meeting_m` FOREIGN KEY (`meeting_id`) REFERENCES `meeting_meetingentity` (`workflowinstance_ptr_id`);

--
-- Constraints for table `meeting_meetingroomdevice`
--
ALTER TABLE `meeting_meetingroomdevice`
  ADD CONSTRAINT `meeting_meetingroomd_device_id_a09e8a7d_fk_iclock_te` FOREIGN KEY (`device_id`) REFERENCES `iclock_terminal` (`id`),
  ADD CONSTRAINT `meeting_meetingroomd_room_id_e000d78d_fk_meeting_m` FOREIGN KEY (`room_id`) REFERENCES `meeting_meetingroom` (`id`);

--
-- Constraints for table `meeting_meetingtransaction`
--
ALTER TABLE `meeting_meetingtransaction`
  ADD CONSTRAINT `meeting_meetingtrans_emp_id_fbcdd686_fk_personnel` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `meeting_meetingtrans_meeting_id_e4e505e5_fk_meeting_m` FOREIGN KEY (`meeting_id`) REFERENCES `meeting_meetingentity` (`workflowinstance_ptr_id`),
  ADD CONSTRAINT `meeting_meetingtrans_terminal_id_047426f2_fk_iclock_te` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`);

--
-- Constraints for table `mobile_announcement`
--
ALTER TABLE `mobile_announcement`
  ADD CONSTRAINT `mobile_announcement_admin_id_6af3868c_fk_auth_user_id` FOREIGN KEY (`admin_id`) REFERENCES `auth_user` (`id`),
  ADD CONSTRAINT `mobile_announcement_init_sender_id_2f5e35bd_fk_personnel` FOREIGN KEY (`init_sender_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `mobile_announcement_receiver_id_ddf2a860_fk_personnel` FOREIGN KEY (`receiver_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `mobile_appnotification`
--
ALTER TABLE `mobile_appnotification`
  ADD CONSTRAINT `mobile_appnotificati_init_sender_id_d8aff845_fk_personnel` FOREIGN KEY (`init_sender_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `mobile_appnotificati_receiver_id_90c4a355_fk_personnel` FOREIGN KEY (`receiver_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `mobile_appnotification_admin_id_29c27197_fk_auth_user_id` FOREIGN KEY (`admin_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `mobile_gpsfordepartment`
--
ALTER TABLE `mobile_gpsfordepartment`
  ADD CONSTRAINT `mobile_gpsfordepartm_department_id_988ccf22_fk_personnel` FOREIGN KEY (`department_id`) REFERENCES `personnel_department` (`id`);

--
-- Constraints for table `mobile_gpsfordepartment_location`
--
ALTER TABLE `mobile_gpsfordepartment_location`
  ADD CONSTRAINT `mobile_gpsfordepartm_gpsfordepartment_id_23e9af3a_fk_mobile_gp` FOREIGN KEY (`gpsfordepartment_id`) REFERENCES `mobile_gpsfordepartment` (`id`),
  ADD CONSTRAINT `mobile_gpsfordepartm_gpslocation_id_48b82e9e_fk_mobile_gp` FOREIGN KEY (`gpslocation_id`) REFERENCES `mobile_gpslocation` (`id`);

--
-- Constraints for table `mobile_gpsforemployee`
--
ALTER TABLE `mobile_gpsforemployee`
  ADD CONSTRAINT `mobile_gpsforemploye_employee_id_982b7cef_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `mobile_gpsforemployee_location`
--
ALTER TABLE `mobile_gpsforemployee_location`
  ADD CONSTRAINT `mobile_gpsforemploye_gpsforemployee_id_a52023d5_fk_mobile_gp` FOREIGN KEY (`gpsforemployee_id`) REFERENCES `mobile_gpsforemployee` (`id`),
  ADD CONSTRAINT `mobile_gpsforemploye_gpslocation_id_497a214f_fk_mobile_gp` FOREIGN KEY (`gpslocation_id`) REFERENCES `mobile_gpslocation` (`id`);

--
-- Constraints for table `payroll_emploan`
--
ALTER TABLE `payroll_emploan`
  ADD CONSTRAINT `payroll_emploan_employee_id_97a251ef_fk_personnel_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `payroll_emppayrollprofile`
--
ALTER TABLE `payroll_emppayrollprofile`
  ADD CONSTRAINT `payroll_emppayrollpr_employee_id_6c97078c_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `payroll_exceptionformula`
--
ALTER TABLE `payroll_exceptionformula`
  ADD CONSTRAINT `payroll_exceptionformula_pay_code_id_97609b51_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`);

--
-- Constraints for table `payroll_extradeduction`
--
ALTER TABLE `payroll_extradeduction`
  ADD CONSTRAINT `payroll_extradeducti_employee_id_53072441_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `payroll_extraincrease`
--
ALTER TABLE `payroll_extraincrease`
  ADD CONSTRAINT `payroll_extraincreas_employee_id_f902e6bb_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `payroll_leaveformula`
--
ALTER TABLE `payroll_leaveformula`
  ADD CONSTRAINT `payroll_leaveformula_pay_code_id_63c7b4bd_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`);

--
-- Constraints for table `payroll_overtimeformula`
--
ALTER TABLE `payroll_overtimeformula`
  ADD CONSTRAINT `payroll_overtimeformula_pay_code_id_36d2f10e_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`);

--
-- Constraints for table `payroll_payrollpayload`
--
ALTER TABLE `payroll_payrollpayload`
  ADD CONSTRAINT `payroll_payrollpaylo_employee_id_bc868f2b_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `payroll_payrollpayloadpaycode`
--
ALTER TABLE `payroll_payrollpayloadpaycode`
  ADD CONSTRAINT `payroll_payrollpaylo_pay_code_id_c057af1f_fk_att_payco` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`),
  ADD CONSTRAINT `payroll_payrollpaylo_payload_id_f085c4e8_fk_payroll_p` FOREIGN KEY (`payload_id`) REFERENCES `payroll_payrollpayload` (`id`);

--
-- Constraints for table `payroll_reimbursement`
--
ALTER TABLE `payroll_reimbursement`
  ADD CONSTRAINT `payroll_reimbursemen_employee_id_c4bbde36_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `payroll_salaryadvance`
--
ALTER TABLE `payroll_salaryadvance`
  ADD CONSTRAINT `payroll_salaryadvanc_employee_id_2abd43e5_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `payroll_salarystructure`
--
ALTER TABLE `payroll_salarystructure`
  ADD CONSTRAINT `payroll_salarystruct_employee_id_98996e15_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `payroll_salarystructure_deductionformula`
--
ALTER TABLE `payroll_salarystructure_deductionformula`
  ADD CONSTRAINT `payroll_salarystruct_deductionformula_id_b174d5b6_fk_payroll_d` FOREIGN KEY (`deductionformula_id`) REFERENCES `payroll_deductionformula` (`id`),
  ADD CONSTRAINT `payroll_salarystruct_salarystructure_id_5ca7cdb5_fk_payroll_s` FOREIGN KEY (`salarystructure_id`) REFERENCES `payroll_salarystructure` (`id`);

--
-- Constraints for table `payroll_salarystructure_exceptionformula`
--
ALTER TABLE `payroll_salarystructure_exceptionformula`
  ADD CONSTRAINT `payroll_salarystruct_exceptionformula_id_8f6dadb3_fk_payroll_e` FOREIGN KEY (`exceptionformula_id`) REFERENCES `payroll_exceptionformula` (`id`),
  ADD CONSTRAINT `payroll_salarystruct_salarystructure_id_3c087208_fk_payroll_s` FOREIGN KEY (`salarystructure_id`) REFERENCES `payroll_salarystructure` (`id`);

--
-- Constraints for table `payroll_salarystructure_increasementformula`
--
ALTER TABLE `payroll_salarystructure_increasementformula`
  ADD CONSTRAINT `payroll_salarystruct_increasementformula__3cd77082_fk_payroll_i` FOREIGN KEY (`increasementformula_id`) REFERENCES `payroll_increasementformula` (`id`),
  ADD CONSTRAINT `payroll_salarystruct_salarystructure_id_8752401c_fk_payroll_s` FOREIGN KEY (`salarystructure_id`) REFERENCES `payroll_salarystructure` (`id`);

--
-- Constraints for table `payroll_salarystructure_leaveformula`
--
ALTER TABLE `payroll_salarystructure_leaveformula`
  ADD CONSTRAINT `payroll_salarystruct_leaveformula_id_049f9024_fk_payroll_l` FOREIGN KEY (`leaveformula_id`) REFERENCES `payroll_leaveformula` (`id`),
  ADD CONSTRAINT `payroll_salarystruct_salarystructure_id_cf98fdd7_fk_payroll_s` FOREIGN KEY (`salarystructure_id`) REFERENCES `payroll_salarystructure` (`id`);

--
-- Constraints for table `payroll_salarystructure_overtimeformula`
--
ALTER TABLE `payroll_salarystructure_overtimeformula`
  ADD CONSTRAINT `payroll_salarystruct_overtimeformula_id_40ad89ef_fk_payroll_o` FOREIGN KEY (`overtimeformula_id`) REFERENCES `payroll_overtimeformula` (`id`),
  ADD CONSTRAINT `payroll_salarystruct_salarystructure_id_64f75042_fk_payroll_s` FOREIGN KEY (`salarystructure_id`) REFERENCES `payroll_salarystructure` (`id`);

--
-- Constraints for table `personnel_area`
--
ALTER TABLE `personnel_area`
  ADD CONSTRAINT `personnel_area_parent_area_id_39028fda_fk_personnel_area_id` FOREIGN KEY (`parent_area_id`) REFERENCES `personnel_area` (`id`);

--
-- Constraints for table `personnel_assignareaemployee`
--
ALTER TABLE `personnel_assignareaemployee`
  ADD CONSTRAINT `personnel_assignarea_area_id_6f049d6a_fk_personnel` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`),
  ADD CONSTRAINT `personnel_assignarea_employee_id_a3d4dd25_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `personnel_department`
--
ALTER TABLE `personnel_department`
  ADD CONSTRAINT `personnel_department_parent_dept_id_d0b44024_fk_personnel` FOREIGN KEY (`parent_dept_id`) REFERENCES `personnel_department` (`id`);

--
-- Constraints for table `personnel_employee`
--
ALTER TABLE `personnel_employee`
  ADD CONSTRAINT `personnel_employee_department_id_068bbd08_fk_personnel` FOREIGN KEY (`department_id`) REFERENCES `personnel_department` (`id`),
  ADD CONSTRAINT `personnel_employee_position_id_c9321343_fk_personnel_position_id` FOREIGN KEY (`position_id`) REFERENCES `personnel_position` (`id`);

--
-- Constraints for table `personnel_employeecalendar`
--
ALTER TABLE `personnel_employeecalendar`
  ADD CONSTRAINT `personnel_employeeca_employee_id_165e0779_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `personnel_employeecertification`
--
ALTER TABLE `personnel_employeecertification`
  ADD CONSTRAINT `personnel_employeece_certification_id_faabed40_fk_personnel` FOREIGN KEY (`certification_id`) REFERENCES `personnel_certification` (`id`),
  ADD CONSTRAINT `personnel_employeece_employee_id_b7bd3867_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `personnel_employeeextrainfo`
--
ALTER TABLE `personnel_employeeextrainfo`
  ADD CONSTRAINT `personnel_employeeex_employee_id_41e2b04d_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `personnel_employeeleavebalance`
--
ALTER TABLE `personnel_employeeleavebalance`
  ADD CONSTRAINT `personnel_employeele_employee_id_2ef0fcfd_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `personnel_employeele_leave_type_id_c5be9dff_fk_att_payco` FOREIGN KEY (`leave_type_id`) REFERENCES `att_paycode` (`id`);

--
-- Constraints for table `personnel_employeeprofile`
--
ALTER TABLE `personnel_employeeprofile`
  ADD CONSTRAINT `personnel_employeepr_emp_id_3a69c313_fk_personnel` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `personnel_employee_area`
--
ALTER TABLE `personnel_employee_area`
  ADD CONSTRAINT `personnel_employee_a_employee_id_8e5cec21_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `personnel_employee_area_area_id_64c21925_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`);

--
-- Constraints for table `personnel_employee_flow_role`
--
ALTER TABLE `personnel_employee_flow_role`
  ADD CONSTRAINT `personnel_employee_f_employee_id_c27f8a56_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `personnel_employee_f_workflowrole_id_4704db32_fk_workflow_` FOREIGN KEY (`workflowrole_id`) REFERENCES `workflow_workflowrole` (`id`);

--
-- Constraints for table `personnel_employment`
--
ALTER TABLE `personnel_employment`
  ADD CONSTRAINT `personnel_employment_employee_id_f797c7d9_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `personnel_position`
--
ALTER TABLE `personnel_position`
  ADD CONSTRAINT `personnel_position_parent_position_id_a496a36b_fk_personnel` FOREIGN KEY (`parent_position_id`) REFERENCES `personnel_position` (`id`);

--
-- Constraints for table `personnel_resign`
--
ALTER TABLE `personnel_resign`
  ADD CONSTRAINT `personnel_resign_employee_id_dd9b7e08_fk_personnel_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `staff_stafftoken`
--
ALTER TABLE `staff_stafftoken`
  ADD CONSTRAINT `staff_stafftoken_user_id_39c937fa_fk_personnel_employee_id` FOREIGN KEY (`user_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `visitor_reservation`
--
ALTER TABLE `visitor_reservation`
  ADD CONSTRAINT `visitor_reservation_cert_type_id_4f047f2a_fk_personnel` FOREIGN KEY (`cert_type_id`) REFERENCES `personnel_certification` (`id`),
  ADD CONSTRAINT `visitor_reservation_visit_department_id_2d293e10_fk_personnel` FOREIGN KEY (`visit_department_id`) REFERENCES `personnel_department` (`id`),
  ADD CONSTRAINT `visitor_reservation_visit_reason_id_c9ac83ac_fk_visitor_r` FOREIGN KEY (`visit_reason_id`) REFERENCES `visitor_reason` (`id`),
  ADD CONSTRAINT `visitor_reservation_workflowinstance_ptr_3787bcd6_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`);

--
-- Constraints for table `visitor_visitor`
--
ALTER TABLE `visitor_visitor`
  ADD CONSTRAINT `visitor_visitor_cert_type_id_f62ea604_fk_personnel` FOREIGN KEY (`cert_type_id`) REFERENCES `personnel_certification` (`id`),
  ADD CONSTRAINT `visitor_visitor_visit_department_id_f7dbdcb4_fk_personnel` FOREIGN KEY (`visit_department_id`) REFERENCES `personnel_department` (`id`),
  ADD CONSTRAINT `visitor_visitor_visit_reason_id_4b9a2d23_fk_visitor_reason_id` FOREIGN KEY (`visit_reason_id`) REFERENCES `visitor_reason` (`id`),
  ADD CONSTRAINT `visitor_visitor_visited_id_8043a7ea_fk_personnel_employee_id` FOREIGN KEY (`visited_id`) REFERENCES `personnel_employee` (`id`);

--
-- Constraints for table `visitor_visitorlog`
--
ALTER TABLE `visitor_visitorlog`
  ADD CONSTRAINT `visitor_visitorlog_visitor_id_ebaafde1_fk_visitor_visitor_id` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_visitor` (`id`);

--
-- Constraints for table `visitor_visitor_acc_groups`
--
ALTER TABLE `visitor_visitor_acc_groups`
  ADD CONSTRAINT `visitor_visitor_acc__accgroups_id_b1487149_fk_acc_accgr` FOREIGN KEY (`accgroups_id`) REFERENCES `acc_accgroups` (`id`),
  ADD CONSTRAINT `visitor_visitor_acc__visitor_id_8ce09562_fk_visitor_v` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_visitor` (`id`);

--
-- Constraints for table `visitor_visitor_area`
--
ALTER TABLE `visitor_visitor_area`
  ADD CONSTRAINT `visitor_visitor_area_area_id_b402c047_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`),
  ADD CONSTRAINT `visitor_visitor_area_visitor_id_98d7ed05_fk_visitor_visitor_id` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_visitor` (`id`);

--
-- Constraints for table `workflow_nodeinstance`
--
ALTER TABLE `workflow_nodeinstance`
  ADD CONSTRAINT `workflow_nodeinstanc_approver_employee_id_d36cd45d_fk_personnel` FOREIGN KEY (`approver_employee_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `workflow_nodeinstanc_workflow_instance_id_afe84fe4_fk_workflow_` FOREIGN KEY (`workflow_instance_id`) REFERENCES `workflow_workflowinstance` (`id`),
  ADD CONSTRAINT `workflow_nodeinstanc_workflow_node_id_166f36c4_fk_workflow_` FOREIGN KEY (`workflow_node_id`) REFERENCES `workflow_workflownode` (`id`);

--
-- Constraints for table `workflow_workflowengine`
--
ALTER TABLE `workflow_workflowengine`
  ADD CONSTRAINT `workflow_workfloweng_applicant_position_i_8a65e03a_fk_personnel` FOREIGN KEY (`applicant_position_id`) REFERENCES `personnel_position` (`id`),
  ADD CONSTRAINT `workflow_workfloweng_content_type_id_f7345c20_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `workflow_workfloweng_departments_id_0f06d4c7_fk_personnel` FOREIGN KEY (`departments_id`) REFERENCES `personnel_department` (`id`);

--
-- Constraints for table `workflow_workflowengine_employee`
--
ALTER TABLE `workflow_workflowengine_employee`
  ADD CONSTRAINT `workflow_workfloweng_employee_id_803a409e_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `workflow_workfloweng_workflowengine_id_6ebcc5f2_fk_workflow_` FOREIGN KEY (`workflowengine_id`) REFERENCES `workflow_workflowengine` (`id`);

--
-- Constraints for table `workflow_workflowinstance`
--
ALTER TABLE `workflow_workflowinstance`
  ADD CONSTRAINT `workflow_workflowins_employee_id_c7cff08e_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `workflow_workflowins_workflow_engine_id_1e6ac40f_fk_workflow_` FOREIGN KEY (`workflow_engine_id`) REFERENCES `workflow_workflowengine` (`id`);

--
-- Constraints for table `workflow_workflownode`
--
ALTER TABLE `workflow_workflownode`
  ADD CONSTRAINT `workflow_workflownod_workflow_engine_id_04c8f470_fk_workflow_` FOREIGN KEY (`workflow_engine_id`) REFERENCES `workflow_workflowengine` (`id`);

--
-- Constraints for table `workflow_workflownode_approver`
--
ALTER TABLE `workflow_workflownode_approver`
  ADD CONSTRAINT `workflow_workflownod_workflownode_id_d814c941_fk_workflow_` FOREIGN KEY (`workflownode_id`) REFERENCES `workflow_workflownode` (`id`),
  ADD CONSTRAINT `workflow_workflownod_workflowrole_id_c8e00d42_fk_workflow_` FOREIGN KEY (`workflowrole_id`) REFERENCES `workflow_workflowrole` (`id`);

--
-- Constraints for table `workflow_workflownode_notifier`
--
ALTER TABLE `workflow_workflownode_notifier`
  ADD CONSTRAINT `workflow_workflownod_workflownode_id_57298016_fk_workflow_` FOREIGN KEY (`workflownode_id`) REFERENCES `workflow_workflownode` (`id`),
  ADD CONSTRAINT `workflow_workflownod_workflowrole_id_73de7fc2_fk_workflow_` FOREIGN KEY (`workflowrole_id`) REFERENCES `workflow_workflowrole` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
