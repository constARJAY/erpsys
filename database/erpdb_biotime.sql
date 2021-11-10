-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2021 at 03:32 AM
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
(1, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BLACKCODERS\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-09 13:45:01\"}', '2021-11-09 13:49:57.177395', NULL, 0, 1, 1, 101),
(2, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BLACKCODERS\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-09 13:51:20\"}', '2021-11-09 13:53:16.159759', '2021-11-09 14:02:42.007656', 1, 1, 1, 102),
(3, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-09 16:08:07\"}', '2021-11-10 07:19:54.565533', NULL, 0, 1, 1, 101),
(4, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"193.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-10 07:23:04\"}', '2021-11-10 07:23:11.112474', NULL, 0, 1, 1, 102),
(5, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"193.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-10 07:34:16\"}', '2021-11-10 07:39:52.112098', NULL, 0, 1, 1, 101),
(6, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"193.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-10 07:30:40\"}', '2021-11-10 07:44:13.984848', NULL, 0, 1, 1, 101),
(7, '{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.203\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-10 07:54:14\"}', '2021-11-10 07:54:14.753572', NULL, 0, 1, 1, 102);

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
(21, '2021-11-09 14:17:38.374152', NULL, '2021-11-09 14:17:38.374152', NULL, 0, 1, '1', 1, 0, 0, 0, 0, NULL, '2021-11-09 14:17:38.374152', 2),
(22, '2021-11-09 14:17:38.375154', NULL, '2021-11-09 14:17:38.375154', NULL, 0, 2, '2', 0, 0, 0, 0, 0, NULL, '2021-11-09 14:17:38.374152', 2),
(23, '2021-11-09 14:17:38.375154', NULL, '2021-11-09 14:17:38.375154', NULL, 0, 3, '3', 0, 0, 0, 0, 0, NULL, '2021-11-09 14:17:38.374152', 2),
(24, '2021-11-09 14:17:38.375154', NULL, '2021-11-09 14:17:38.375154', NULL, 0, 4, '4', 0, 0, 0, 0, 0, NULL, '2021-11-09 14:17:38.374152', 2),
(25, '2021-11-09 14:17:38.375154', NULL, '2021-11-09 14:17:38.375154', NULL, 0, 5, '5', 0, 0, 0, 0, 0, NULL, '2021-11-09 14:17:38.374152', 2),
(26, '2021-11-09 14:17:38.375154', NULL, '2021-11-09 14:17:38.375154', NULL, 0, 6, '6', 0, 0, 0, 0, 0, NULL, '2021-11-09 14:17:38.374152', 2),
(27, '2021-11-09 14:17:38.375154', NULL, '2021-11-09 14:17:38.375154', NULL, 0, 7, '7', 0, 0, 0, 0, 0, NULL, '2021-11-09 14:17:38.374152', 2),
(28, '2021-11-09 14:17:38.375154', NULL, '2021-11-09 14:17:38.375154', NULL, 0, 8, '8', 0, 0, 0, 0, 0, NULL, '2021-11-09 14:17:38.374152', 2),
(29, '2021-11-09 14:17:38.375154', NULL, '2021-11-09 14:17:38.375154', NULL, 0, 9, '9', 0, 0, 0, 0, 0, NULL, '2021-11-09 14:17:38.374152', 2),
(30, '2021-11-09 14:17:38.375154', NULL, '2021-11-09 14:17:38.375154', NULL, 0, 10, '10', 0, 0, 0, 0, 0, NULL, '2021-11-09 14:17:38.374152', 2);

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
(3, '2021-11-09 14:17:38.366839', NULL, '2021-11-09 14:17:38.366839', NULL, 0, 1, '1', 0, 1, 0, 0, 0, '2021-11-09 14:17:38.366839', 2);

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
(3, '2021-11-09 14:17:38.361839', NULL, '2021-11-09 14:17:38.361839', NULL, 0, 1, '1', '00:00:00.000000', '23:59:00.000000', 1, '00:00:00.000000', '23:59:00.000000', 1, '00:00:00.000000', '23:59:00.000000', 1, '00:00:00.000000', '23:59:00.000000', 1, '00:00:00.000000', '23:59:00.000000', 1, '00:00:00.000000', '23:59:00.000000', 1, '00:00:00.000000', '23:59:00.000000', 1, NULL, '2021-11-09 14:17:38.361839', 2);

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
(22, 'InstallDate', '', 'be65oaWZ0UqZiqXOkIxPx2rXeDevLONWSzHcMbiOJcL4EJmbbkoq'),
(23, 'SysDate', '', 'be65oaWZ0UqZiqXOkIxPx2rXeDevLONWSzHcMbiOJcL4EJmbbkoq'),
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
(1, '2021-11-09 14:17:51.522884', NULL, '2021-11-09 14:17:51.522884', NULL, 0, 1, 1, 1, 1, 1, NULL),
(2, '2021-11-09 14:17:51.691300', NULL, '2021-11-09 14:17:51.691300', NULL, 0, 1, 1, 1, 1, 10, NULL),
(3, '2021-11-09 14:17:51.932977', NULL, '2021-11-09 14:17:51.932977', NULL, 0, 1, 1, 1, 1, 2, NULL),
(4, '2021-11-09 14:17:52.014391', NULL, '2021-11-09 14:17:52.014391', NULL, 0, 1, 1, 1, 1, 11, NULL),
(5, '2021-11-09 14:17:52.158080', NULL, '2021-11-09 14:17:52.158080', NULL, 0, 1, 1, 1, 1, 12, NULL),
(6, '2021-11-09 14:17:52.536720', NULL, '2021-11-09 14:17:52.536720', NULL, 0, 1, 1, 1, 1, 13, NULL),
(7, '2021-11-09 14:17:52.899373', NULL, '2021-11-09 14:17:52.899373', NULL, 0, 1, 1, 1, 1, 14, NULL),
(8, '2021-11-09 14:17:53.050049', NULL, '2021-11-09 14:17:53.050049', NULL, 0, 1, 1, 1, 1, 15, NULL),
(9, '2021-11-09 14:17:53.172670', NULL, '2021-11-09 14:17:53.172670', NULL, 0, 1, 1, 1, 1, 16, NULL),
(10, '2021-11-09 14:17:53.258564', NULL, '2021-11-09 14:17:53.258564', NULL, 0, 1, 1, 1, 1, 17, NULL),
(11, '2021-11-09 14:17:53.381347', NULL, '2021-11-09 14:17:53.381347', NULL, 0, 1, 1, 1, 1, 18, NULL),
(12, '2021-11-09 14:17:53.533397', NULL, '2021-11-09 14:17:53.533397', NULL, 0, 1, 1, 1, 1, 19, NULL),
(13, '2021-11-09 14:17:53.884420', NULL, '2021-11-09 14:17:53.884420', NULL, 0, 1, 1, 1, 1, 3, NULL),
(14, '2021-11-09 14:17:54.058221', NULL, '2021-11-09 14:17:54.058221', NULL, 0, 1, 1, 1, 1, 20, NULL),
(15, '2021-11-09 14:17:54.140541', NULL, '2021-11-09 14:17:54.140541', NULL, 0, 1, 1, 1, 1, 4, NULL),
(16, '2021-11-09 14:17:54.225038', NULL, '2021-11-09 14:17:54.225038', NULL, 0, 1, 1, 1, 1, 5, NULL),
(17, '2021-11-09 14:17:54.306178', NULL, '2021-11-09 14:17:54.306178', NULL, 0, 1, 1, 1, 1, 6, NULL),
(18, '2021-11-09 14:17:54.448362', NULL, '2021-11-09 14:17:54.448362', NULL, 0, 1, 1, 1, 1, 7, NULL),
(19, '2021-11-09 14:17:54.544579', NULL, '2021-11-09 14:17:54.544579', NULL, 0, 1, 1, 1, 1, 8, NULL),
(20, '2021-11-09 14:17:54.992257', NULL, '2021-11-09 14:17:54.992257', NULL, 0, 1, 1, 1, 1, 9, NULL);

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
(1, '2021-11-09 13:25:47.441050', NULL, '2021-11-09 13:25:47.441050', NULL, 0, '1', 'default');

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
  `weekend2_color_setting` varchar(30) DEFAULT NULL,
  `ot_pay_code_id` int(11) DEFAULT NULL,
  `overtime_policy` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `att_attpolicy`
--

INSERT INTO `att_attpolicy` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `use_ot`, `weekend1`, `weekend2`, `start_of_week`, `max_hrs`, `day_change`, `paring_rule`, `punch_period`, `daily_ot`, `daily_ot_rule`, `weekly_ot`, `weekly_ot_rule`, `weekend_ot`, `weekend_ot_rule`, `holiday_ot`, `holiday_ot_rule`, `late_in2absence`, `early_out2absence`, `miss_in`, `late_in_hrs`, `miss_out`, `early_out_hrs`, `require_capture`, `require_work_code`, `require_punch_state`, `email_send_time`, `global_frequency`, `global_send_day`, `max_absent`, `max_early_out`, `max_late_in`, `sending_day`, `weekend1_color_setting`, `weekend2_color_setting`, `ot_pay_code_id`, `overtime_policy`) VALUES
(1, '2021-11-09 13:25:47.594505', NULL, '2021-11-09 13:25:47.594505', NULL, 0, 1, 7, 7, 0, '12.0', '00:00:00.000000', 1, 1, 0, NULL, 0, NULL, 0, NULL, 0, NULL, 100, 100, 1, 60, 1, 60, 0, 0, 0, '00:00:00.000000', 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, -1);

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
  `weekend2_color_setting` varchar(30) DEFAULT NULL,
  `ot_pay_code_id` int(11) DEFAULT NULL,
  `overtime_policy` smallint(6) NOT NULL
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
  `weekend2_color_setting` varchar(30) DEFAULT NULL,
  `ot_pay_code_id` int(11) DEFAULT NULL,
  `overtime_policy` smallint(6) NOT NULL
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
  `pay_code_id` int(11) DEFAULT NULL,
  `leave_day` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_leavegroup`
--

CREATE TABLE `att_leavegroup` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_leavegroupdetail`
--

CREATE TABLE `att_leavegroupdetail` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `leave_type` int(11) NOT NULL,
  `allow_leave_day` int(11) NOT NULL,
  `min_leave_day` double NOT NULL,
  `deduct_holiday_day` smallint(6) NOT NULL,
  `leave_entitlement` int(11) DEFAULT NULL,
  `leave_interval` int(11) NOT NULL,
  `leave_distribution_time` int(11) DEFAULT NULL,
  `start_day` varchar(5) NOT NULL,
  `set_hire_day` smallint(6) NOT NULL,
  `allow_exceed_limit` smallint(6) NOT NULL,
  `allow_balance` smallint(6) NOT NULL,
  `max_balance` int(11) DEFAULT NULL,
  `entitlement_detail` varchar(999) DEFAULT NULL,
  `leave_group_id` int(11) NOT NULL,
  `pay_code_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `att_leaveyearbalance`
--

CREATE TABLE `att_leaveyearbalance` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `leave_type` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `entitlement_days` smallint(6) DEFAULT NULL,
  `leave_day` double DEFAULT NULL,
  `pre_balance` smallint(6) DEFAULT NULL,
  `employee_id` int(11) NOT NULL,
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
(1, '2021-11-09 13:25:44.535483', NULL, '2021-11-09 13:25:44.535483', NULL, 0, 'REG', 'Regular', 1, NULL, 1, 1, '8.00', 1, 0, 1, '0.1', 2, 'P', 1, NULL, 1, 1, NULL),
(2, '2021-11-09 13:25:44.936910', NULL, '2021-11-09 13:25:44.936910', NULL, 0, 'L', 'Late In', 4, NULL, 2, 1, '8.00', 1, 0, 1, '1.0', 1, 'L', 2, NULL, 1, 1, NULL),
(3, '2021-11-09 13:25:45.115349', NULL, '2021-11-09 13:25:45.115349', NULL, 0, 'E', 'Early Out', 4, NULL, 3, 1, '8.00', 1, 0, 1, '1.0', 1, 'E', 3, NULL, 1, 1, NULL),
(4, '2021-11-09 13:25:45.200007', NULL, '2021-11-09 13:25:45.200007', NULL, 0, 'A', 'Absence', 4, NULL, 4, 1, '8.00', 1, 0, 1, '0.1', 2, 'A', 4, NULL, 1, 1, NULL),
(5, '2021-11-09 13:25:45.237779', NULL, '2021-11-09 13:25:45.237779', NULL, 0, 'NOT', 'Normal OT', 2, NULL, NULL, 1, '8.00', 1, 0, 1, '0.1', 2, '', 5, NULL, 1, 1, NULL),
(6, '2021-11-09 13:25:45.302328', NULL, '2021-11-09 13:25:45.302328', NULL, 0, 'WOT', 'Weekend OT', 2, NULL, NULL, 1, '8.00', 1, 0, 1, '0.1', 2, '', 6, NULL, 1, 1, NULL),
(7, '2021-11-09 13:25:45.338035', NULL, '2021-11-09 13:25:45.338035', NULL, 0, 'HOT', 'Holiday OT', 2, NULL, NULL, 1, '8.00', 1, 0, 1, '0.1', 2, '', 7, NULL, 1, 1, NULL),
(8, '2021-11-09 13:25:45.384928', NULL, '2021-11-09 13:25:45.384928', NULL, 0, 'OT1', 'OT1', 2, 6, NULL, 1, '8.00', 1, 0, 1, '0.1', 2, '', 8, NULL, 1, 1, NULL),
(9, '2021-11-09 13:25:45.431814', NULL, '2021-11-09 13:25:45.431814', NULL, 0, 'OT2', 'OT2', 2, 7, NULL, 1, '8.00', 1, 0, 1, '0.1', 2, '', 9, NULL, 1, 1, NULL),
(10, '2021-11-09 13:25:45.469585', NULL, '2021-11-09 13:25:45.469585', NULL, 0, 'OT3', 'OT3', 2, 8, NULL, 1, '8.00', 1, 0, 1, '0.1', 2, '', 10, NULL, 1, 1, NULL),
(11, '2021-11-09 13:25:45.506437', NULL, '2021-11-09 13:25:45.506437', NULL, 0, 'AL', 'Annual Leave', 3, NULL, NULL, 0, '8.00', 1, 1, 1, '0.1', 2, '', 11, NULL, 1, 1, NULL),
(12, '2021-11-09 13:25:45.538225', NULL, '2021-11-09 13:25:45.538225', NULL, 0, 'SL', 'Sick Leave', 3, NULL, NULL, 0, '8.00', 0, 1, 1, '0.1', 2, '', 12, NULL, 1, 1, NULL),
(13, '2021-11-09 13:25:45.569505', NULL, '2021-11-09 13:25:45.569505', NULL, 0, 'CL', 'Casual Leave', 3, NULL, NULL, 0, '8.00', 0, 1, 1, '0.1', 2, '', 13, NULL, 1, 1, NULL),
(14, '2021-11-09 13:25:45.871808', NULL, '2021-11-09 13:25:45.871808', NULL, 0, 'ML', 'Maternity Leave', 3, NULL, NULL, 0, '8.00', 0, 1, 1, '0.1', 2, '', 14, NULL, 1, 1, NULL),
(15, '2021-11-09 13:25:45.903086', NULL, '2021-11-09 13:25:45.903086', NULL, 0, 'COL', 'Compassionate Leave', 3, NULL, NULL, 0, '8.00', 0, 0, 1, '0.1', 2, '', 15, NULL, 1, 1, NULL),
(16, '2021-11-09 13:25:45.988119', NULL, '2021-11-09 13:25:45.988119', NULL, 0, 'BT', 'Business Trip', 3, NULL, NULL, 0, '8.00', 0, 0, 1, '0.1', 2, '', 16, NULL, 1, 1, NULL);

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

--
-- Dumping data for table `att_payloadattcode`
--

INSERT INTO `att_payloadattcode` (`id`, `att_date`, `week`, `weekday`, `att_code_alias`, `att_code_symbol`, `duration`, `workday`, `hours`, `minutes`, `is_weekly`, `att_code_id`, `emp_id`, `shift_id`, `time_card_id`) VALUES
('144cf607412611ecaf15645d86dd6e62', '2021-11-09', 45, 1, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 2, NULL, '31ce892242ac4732b3798b9820ace701'),
('144cf608412611ecbc38645d86dd6e62', '2021-11-09', 45, 1, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 2, NULL, '31ce892242ac4732b3798b9820ace701'),
('144cf609412611ec9ed8645d86dd6e62', '2021-11-09', 45, 1, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 2, NULL, '31ce892242ac4732b3798b9820ace701'),
('144cf60a412611ecbf86645d86dd6e62', '2021-11-09', 45, 1, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 2, NULL, '31ce892242ac4732b3798b9820ace701'),
('144cf60b412611ecaf41645d86dd6e62', '2021-11-09', 45, 1, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 2, NULL, '31ce892242ac4732b3798b9820ace701'),
('15822f31412611ec87f2645d86dd6e62', '2021-11-09', 45, 1, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 3, NULL, 'fca638b619fb40d1914b19ae48a7b208'),
('15822f32412611ec874d645d86dd6e62', '2021-11-09', 45, 1, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 3, NULL, 'fca638b619fb40d1914b19ae48a7b208'),
('15822f33412611eca087645d86dd6e62', '2021-11-09', 45, 1, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 3, NULL, 'fca638b619fb40d1914b19ae48a7b208'),
('15822f34412611ecb0f0645d86dd6e62', '2021-11-09', 45, 1, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 3, NULL, 'fca638b619fb40d1914b19ae48a7b208'),
('15822f35412611eca2e7645d86dd6e62', '2021-11-09', 45, 1, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 3, NULL, 'fca638b619fb40d1914b19ae48a7b208'),
('16bc54ef412611eca457645d86dd6e62', '2021-11-09', 45, 1, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 4, NULL, '99a4a4e0ff81423da17c2340b8cdf3db'),
('16bc54f0412611ec8476645d86dd6e62', '2021-11-09', 45, 1, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 4, NULL, '99a4a4e0ff81423da17c2340b8cdf3db'),
('16bc54f1412611ecb845645d86dd6e62', '2021-11-09', 45, 1, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 4, NULL, '99a4a4e0ff81423da17c2340b8cdf3db'),
('16bc54f2412611ec8274645d86dd6e62', '2021-11-09', 45, 1, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 4, NULL, '99a4a4e0ff81423da17c2340b8cdf3db'),
('16bc54f3412611ecab85645d86dd6e62', '2021-11-09', 45, 1, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 4, NULL, '99a4a4e0ff81423da17c2340b8cdf3db'),
('18b6a3c9412611ecb93c645d86dd6e62', '2021-11-09', 45, 1, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 10, NULL, '1360aa7da9e34cedb8d47acdcac25663'),
('18b6a3ca412611ecbc69645d86dd6e62', '2021-11-09', 45, 1, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 10, NULL, '1360aa7da9e34cedb8d47acdcac25663'),
('18b6a3cb412611ec9b22645d86dd6e62', '2021-11-09', 45, 1, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 10, NULL, '1360aa7da9e34cedb8d47acdcac25663'),
('18b6a3cc412611ecb992645d86dd6e62', '2021-11-09', 45, 1, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 10, NULL, '1360aa7da9e34cedb8d47acdcac25663'),
('18b6a3cd412611ecbe7f645d86dd6e62', '2021-11-09', 45, 1, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 10, NULL, '1360aa7da9e34cedb8d47acdcac25663'),
('19e64f51412611ecba39645d86dd6e62', '2021-11-09', 45, 1, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 8, NULL, 'f4d1002f964240cdb47105004b4c146e'),
('19e64f52412611ecb0bb645d86dd6e62', '2021-11-09', 45, 1, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 8, NULL, 'f4d1002f964240cdb47105004b4c146e'),
('19e64f53412611ecbd95645d86dd6e62', '2021-11-09', 45, 1, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 8, NULL, 'f4d1002f964240cdb47105004b4c146e'),
('19e6eb24412611eca6a9645d86dd6e62', '2021-11-09', 45, 1, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 8, NULL, 'f4d1002f964240cdb47105004b4c146e'),
('19e6eb25412611eca878645d86dd6e62', '2021-11-09', 45, 1, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 8, NULL, 'f4d1002f964240cdb47105004b4c146e'),
('1c493bdc412611ecb90e645d86dd6e62', '2021-11-09', 45, 1, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 9, NULL, '61dd3941109245f9a5b49727a85bc0ef'),
('1c493bdd412611ecb052645d86dd6e62', '2021-11-09', 45, 1, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 9, NULL, '61dd3941109245f9a5b49727a85bc0ef'),
('1c493bde412611ec8684645d86dd6e62', '2021-11-09', 45, 1, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 9, NULL, '61dd3941109245f9a5b49727a85bc0ef'),
('1c493bdf412611ec8435645d86dd6e62', '2021-11-09', 45, 1, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 9, NULL, '61dd3941109245f9a5b49727a85bc0ef'),
('1c493be0412611ec901e645d86dd6e62', '2021-11-09', 45, 1, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 9, NULL, '61dd3941109245f9a5b49727a85bc0ef'),
('1dedd06f412611ec92bf645d86dd6e62', '2021-11-09', 45, 1, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 7, NULL, 'cae9c07fdd1745679744a8b8f56acaeb'),
('1dedd070412611ecbdaa645d86dd6e62', '2021-11-09', 45, 1, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 7, NULL, 'cae9c07fdd1745679744a8b8f56acaeb'),
('1dedd071412611ec906e645d86dd6e62', '2021-11-09', 45, 1, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 7, NULL, 'cae9c07fdd1745679744a8b8f56acaeb'),
('1dedd072412611ec9b5c645d86dd6e62', '2021-11-09', 45, 1, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 7, NULL, 'cae9c07fdd1745679744a8b8f56acaeb'),
('1dee6c92412611eca194645d86dd6e62', '2021-11-09', 45, 1, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 7, NULL, 'cae9c07fdd1745679744a8b8f56acaeb'),
('1f1b35d9412611ec95ce645d86dd6e62', '2021-11-09', 45, 1, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 6, NULL, '2beccc8862d8402689d2025f67e850ab'),
('1f1b35da412611ecba55645d86dd6e62', '2021-11-09', 45, 1, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 6, NULL, '2beccc8862d8402689d2025f67e850ab'),
('1f1b35db412611eca160645d86dd6e62', '2021-11-09', 45, 1, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 6, NULL, '2beccc8862d8402689d2025f67e850ab'),
('1f1b35dc412611eca6ac645d86dd6e62', '2021-11-09', 45, 1, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 6, NULL, '2beccc8862d8402689d2025f67e850ab'),
('1f1b35dd412611eca1ef645d86dd6e62', '2021-11-09', 45, 1, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 6, NULL, '2beccc8862d8402689d2025f67e850ab'),
('2481cebf41c911ec8508645d86dd6e62', '2021-11-10', 45, 2, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 6, NULL, '7634c4c5c9594a8a932e542e394f70c7'),
('2481cec041c911ec9942645d86dd6e62', '2021-11-10', 45, 2, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 6, NULL, '7634c4c5c9594a8a932e542e394f70c7'),
('2481cec141c911ec84ac645d86dd6e62', '2021-11-10', 45, 2, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 6, NULL, '7634c4c5c9594a8a932e542e394f70c7'),
('2481cec241c911eca0cc645d86dd6e62', '2021-11-10', 45, 2, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 6, NULL, '7634c4c5c9594a8a932e542e394f70c7'),
('2481cec341c911ecbe36645d86dd6e62', '2021-11-10', 45, 2, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 6, NULL, '7634c4c5c9594a8a932e542e394f70c7'),
('26fb158141c911ecbfca645d86dd6e62', '2021-11-10', 45, 2, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 7, NULL, '18e572cb10424d6385078a7c44156ad4'),
('26fb158241c911ec9efd645d86dd6e62', '2021-11-10', 45, 2, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 7, NULL, '18e572cb10424d6385078a7c44156ad4'),
('26fb158341c911ec8b7c645d86dd6e62', '2021-11-10', 45, 2, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 7, NULL, '18e572cb10424d6385078a7c44156ad4'),
('26fb158441c911ecbcd7645d86dd6e62', '2021-11-10', 45, 2, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 7, NULL, '18e572cb10424d6385078a7c44156ad4'),
('26fb158541c911eca6e9645d86dd6e62', '2021-11-10', 45, 2, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 7, NULL, '18e572cb10424d6385078a7c44156ad4'),
('2824abdb41c911ecab06645d86dd6e62', '2021-11-10', 45, 2, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 8, NULL, '7fbce299e3844775a2f8d634b00d5497'),
('2824abdc41c911ec82d7645d86dd6e62', '2021-11-10', 45, 2, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 8, NULL, '7fbce299e3844775a2f8d634b00d5497'),
('2824abdd41c911ec9a2f645d86dd6e62', '2021-11-10', 45, 2, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 8, NULL, '7fbce299e3844775a2f8d634b00d5497'),
('2824abde41c911ecbcec645d86dd6e62', '2021-11-10', 45, 2, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 8, NULL, '7fbce299e3844775a2f8d634b00d5497'),
('2824abdf41c911eca8e9645d86dd6e62', '2021-11-10', 45, 2, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 8, NULL, '7fbce299e3844775a2f8d634b00d5497'),
('29f481e341c911ecb80a645d86dd6e62', '2021-11-10', 45, 2, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 9, NULL, 'f72036763f9a498795ddd721f494a0df'),
('29f5bba841c911ec997c645d86dd6e62', '2021-11-10', 45, 2, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 9, NULL, 'f72036763f9a498795ddd721f494a0df'),
('29f5d05241c911ecbd0a645d86dd6e62', '2021-11-10', 45, 2, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 9, NULL, 'f72036763f9a498795ddd721f494a0df'),
('29f5d05341c911ec8023645d86dd6e62', '2021-11-10', 45, 2, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 9, NULL, 'f72036763f9a498795ddd721f494a0df'),
('29f5d05441c911ec8da7645d86dd6e62', '2021-11-10', 45, 2, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 9, NULL, 'f72036763f9a498795ddd721f494a0df'),
('2b2ee24341c911ec8a9e645d86dd6e62', '2021-11-10', 45, 2, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 10, NULL, 'd7e1a9ce021b4825a4f100486a05b840'),
('2b2ee24441c911eca914645d86dd6e62', '2021-11-10', 45, 2, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 10, NULL, 'd7e1a9ce021b4825a4f100486a05b840'),
('2b2ee24541c911ecab1c645d86dd6e62', '2021-11-10', 45, 2, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 10, NULL, 'd7e1a9ce021b4825a4f100486a05b840'),
('2b2ee24641c911ec8ae3645d86dd6e62', '2021-11-10', 45, 2, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 10, NULL, 'd7e1a9ce021b4825a4f100486a05b840'),
('2b2ee24741c911ec9b90645d86dd6e62', '2021-11-10', 45, 2, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 10, NULL, 'd7e1a9ce021b4825a4f100486a05b840'),
('2d945b8241c911ecb714645d86dd6e62', '2021-11-10', 45, 2, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 5, NULL, '2806014eddc24659af96fbf6e835b39a'),
('2d945b8341c911ec87eb645d86dd6e62', '2021-11-10', 45, 2, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 5, NULL, '2806014eddc24659af96fbf6e835b39a'),
('2d945b8441c911ec9385645d86dd6e62', '2021-11-10', 45, 2, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 5, NULL, '2806014eddc24659af96fbf6e835b39a'),
('2d945b8541c911ec9225645d86dd6e62', '2021-11-10', 45, 2, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 5, NULL, '2806014eddc24659af96fbf6e835b39a'),
('2d945b8641c911ec85c7645d86dd6e62', '2021-11-10', 45, 2, 'Total Hours', '', 9584, '0.2', '2.7', '159.7', 0, 3, 5, NULL, '2806014eddc24659af96fbf6e835b39a'),
('2d945b8741c911ecb9fe645d86dd6e62', '2021-11-10', 45, 2, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 5, NULL, '2806014eddc24659af96fbf6e835b39a'),
('2ece61d941c911ec82f5645d86dd6e62', '2021-11-10', 45, 2, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 4, NULL, 'd39c2371a31348d7b69cf457a651bde4'),
('2ece61da41c911ec804e645d86dd6e62', '2021-11-10', 45, 2, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 4, NULL, 'd39c2371a31348d7b69cf457a651bde4'),
('2ece61db41c911eca5a4645d86dd6e62', '2021-11-10', 45, 2, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 4, NULL, 'd39c2371a31348d7b69cf457a651bde4'),
('2ece61dc41c911ec8eaa645d86dd6e62', '2021-11-10', 45, 2, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 4, NULL, 'd39c2371a31348d7b69cf457a651bde4'),
('2ece61dd41c911ec85a4645d86dd6e62', '2021-11-10', 45, 2, 'Total Hours', '', 9593, '0.2', '2.7', '159.9', 0, 3, 4, NULL, 'd39c2371a31348d7b69cf457a651bde4'),
('2ece61de41c911ecb55c645d86dd6e62', '2021-11-10', 45, 2, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 4, NULL, 'd39c2371a31348d7b69cf457a651bde4'),
('312d801041c911ec8cba645d86dd6e62', '2021-11-10', 45, 2, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 3, NULL, 'f2bc3cf8443c4770a2bcfec4c267d71a'),
('312da75241c911ec969f645d86dd6e62', '2021-11-10', 45, 2, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 3, NULL, 'f2bc3cf8443c4770a2bcfec4c267d71a'),
('312da7f441c911ec99b0645d86dd6e62', '2021-11-10', 45, 2, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 3, NULL, 'f2bc3cf8443c4770a2bcfec4c267d71a'),
('312da7f541c911ec9990645d86dd6e62', '2021-11-10', 45, 2, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 3, NULL, 'f2bc3cf8443c4770a2bcfec4c267d71a'),
('312da7f641c911ecaf50645d86dd6e62', '2021-11-10', 45, 2, 'Total Hours', '', 9597, '0.2', '2.7', '160.0', 0, 3, 3, NULL, 'f2bc3cf8443c4770a2bcfec4c267d71a'),
('312da7f741c911ec8ff1645d86dd6e62', '2021-11-10', 45, 2, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 3, NULL, 'f2bc3cf8443c4770a2bcfec4c267d71a'),
('32f528a841c911ecb0d1645d86dd6e62', '2021-11-10', 45, 2, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 1, NULL, '7abff2097cfe48d7998b303e0eb31b46'),
('32f528a941c911ec8f75645d86dd6e62', '2021-11-10', 45, 2, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 1, NULL, '7abff2097cfe48d7998b303e0eb31b46'),
('32f528aa41c911ec84b0645d86dd6e62', '2021-11-10', 45, 2, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 1, NULL, '7abff2097cfe48d7998b303e0eb31b46'),
('32f528ab41c911ecbd86645d86dd6e62', '2021-11-10', 45, 2, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 1, NULL, '7abff2097cfe48d7998b303e0eb31b46'),
('32f528ac41c911ecad7b645d86dd6e62', '2021-11-10', 45, 2, 'Total Hours', '', 9605, '0.2', '2.7', '160.1', 0, 3, 1, NULL, '7abff2097cfe48d7998b303e0eb31b46'),
('32f528ad41c911eca70d645d86dd6e62', '2021-11-10', 45, 2, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 1, NULL, '7abff2097cfe48d7998b303e0eb31b46'),
('34c9b9dd41c911ec8e32645d86dd6e62', '2021-11-10', 45, 2, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 2, NULL, '6129562539ff462fa137c4134484d95d'),
('34ca2ff441c911ecbc84645d86dd6e62', '2021-11-10', 45, 2, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 2, NULL, '6129562539ff462fa137c4134484d95d'),
('34ca2ff541c911ecb3d8645d86dd6e62', '2021-11-10', 45, 2, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 2, NULL, '6129562539ff462fa137c4134484d95d'),
('34ca2ff641c911ec9da8645d86dd6e62', '2021-11-10', 45, 2, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 2, NULL, '6129562539ff462fa137c4134484d95d'),
('34ca2ff741c911eca8c9645d86dd6e62', '2021-11-10', 45, 2, 'Total Hours', '', 9605, '0.2', '2.7', '160.1', 0, 3, 2, NULL, '6129562539ff462fa137c4134484d95d'),
('34ca2ff841c911ecb33f645d86dd6e62', '2021-11-10', 45, 2, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 2, NULL, '6129562539ff462fa137c4134484d95d'),
('74c5d310412e11ec9ac6645d86dd6e62', '2021-11-09', 45, 1, 'Duty Duration', '', 43200, '1.0', '12.0', '720.0', 0, 2, 1, NULL, 'bad02a450b0a4efbb85f3a3e1478f0df'),
('74c5d311412e11ecbfcf645d86dd6e62', '2021-11-09', 45, 1, 'Total OT', '', 0, '0.0', '0.0', '0.0', 0, 15, 1, NULL, 'bad02a450b0a4efbb85f3a3e1478f0df'),
('74c5d312412e11ec9e79645d86dd6e62', '2021-11-09', 45, 1, 'Rule Total OT', '', 0, '0.0', '0.0', '0.0', 0, 16, 1, NULL, 'bad02a450b0a4efbb85f3a3e1478f0df'),
('74c5d313412e11ecaac6645d86dd6e62', '2021-11-09', 45, 1, 'Duration', '', 43200, '1.0', '12.0', '720.0', 0, 1, 1, NULL, 'bad02a450b0a4efbb85f3a3e1478f0df'),
('74c5d314412e11ec9c7a645d86dd6e62', '2021-11-09', 45, 1, 'Total Hours', '', 3964, '0.1', '1.1', '66.1', 0, 3, 1, NULL, 'bad02a450b0a4efbb85f3a3e1478f0df'),
('74c5d315412e11eca021645d86dd6e62', '2021-11-09', 45, 1, 'Total Leaves', '', 0, '0.0', '0.0', '0.0', 0, 17, 1, NULL, 'bad02a450b0a4efbb85f3a3e1478f0df');

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

--
-- Dumping data for table `att_payloadeffectpunch`
--

INSERT INTO `att_payloadeffectpunch` (`id`, `att_date`, `punch_datetime`, `punch_date`, `punch_time`, `week`, `weekday`, `work_code`, `punch_state`, `adjust_state`, `emp_id`, `time_card_id`, `trans_id`) VALUES
('144895f7412611ec893e645d86dd6e62', '2021-11-09', '2021-11-09 14:27:12.000000', '2021-11-09', '14:27:12.000000', 45, 1, '', '0', '0', 2, '31ce892242ac4732b3798b9820ace701', 4),
('157c8cd3412611ec9d77645d86dd6e62', '2021-11-09', '2021-11-09 14:27:15.000000', '2021-11-09', '14:27:15.000000', 45, 1, '', '0', '0', 3, 'fca638b619fb40d1914b19ae48a7b208', 5),
('16af8c9f412611ec8a59645d86dd6e62', '2021-11-09', '2021-11-09 14:27:16.000000', '2021-11-09', '14:27:16.000000', 45, 1, '', '0', '0', 4, '99a4a4e0ff81423da17c2340b8cdf3db', 6),
('18ab17e3412611ec95f5645d86dd6e62', '2021-11-09', '2021-11-09 14:27:19.000000', '2021-11-09', '14:27:19.000000', 45, 1, '', '0', '0', 10, '1360aa7da9e34cedb8d47acdcac25663', 7),
('19de5c7b412611ec9c8d645d86dd6e62', '2021-11-09', '2021-11-09 14:27:22.000000', '2021-11-09', '14:27:22.000000', 45, 1, '', '0', '0', 8, 'f4d1002f964240cdb47105004b4c146e', 8),
('1c4439f5412611ecbcc3645d86dd6e62', '2021-11-09', '2021-11-09 14:27:26.000000', '2021-11-09', '14:27:26.000000', 45, 1, '', '0', '0', 9, '61dd3941109245f9a5b49727a85bc0ef', 9),
('1ddf82f9412611eca621645d86dd6e62', '2021-11-09', '2021-11-09 14:27:28.000000', '2021-11-09', '14:27:28.000000', 45, 1, '', '0', '0', 7, 'cae9c07fdd1745679744a8b8f56acaeb', 10),
('1f128dfb412611eca37d645d86dd6e62', '2021-11-09', '2021-11-09 14:27:30.000000', '2021-11-09', '14:27:30.000000', 45, 1, '', '0', '0', 6, '2beccc8862d8402689d2025f67e850ab', 11),
('247d07ed41c911eca853645d86dd6e62', '2021-11-10', '2021-11-10 09:54:24.000000', '2021-11-10', '09:54:24.000000', 45, 2, '', '5', '0', 6, '7634c4c5c9594a8a932e542e394f70c7', 57),
('26ed334141c911ecb611645d86dd6e62', '2021-11-10', '2021-11-10 09:54:39.000000', '2021-11-10', '09:54:39.000000', 45, 2, '', '0', '0', 7, '18e572cb10424d6385078a7c44156ad4', 59),
('281b885941c911eca05d645d86dd6e62', '2021-11-10', '2021-11-10 09:54:42.000000', '2021-11-10', '09:54:42.000000', 45, 2, '', '0', '0', 8, '7fbce299e3844775a2f8d634b00d5497', 60),
('29ee815b41c911eca7e3645d86dd6e62', '2021-11-10', '2021-11-10 09:54:44.000000', '2021-11-10', '09:54:44.000000', 45, 2, '', '0', '0', 9, 'f72036763f9a498795ddd721f494a0df', 61),
('2b2a102941c911eca89e645d86dd6e62', '2021-11-10', '2021-11-10 09:54:47.000000', '2021-11-10', '09:54:47.000000', 45, 2, '', '0', '0', 10, 'd7e1a9ce021b4825a4f100486a05b840', 62),
('2d8f666741c911eca58b645d86dd6e62', '2021-11-10', '2021-11-10 07:15:06.000000', '2021-11-10', '07:15:06.000000', 45, 2, '', '0', '0', 5, '2806014eddc24659af96fbf6e835b39a', 25),
('2d8f666841c911eca12e645d86dd6e62', '2021-11-10', '2021-11-10 09:54:50.000000', '2021-11-10', '09:54:50.000000', 45, 2, '', '0', '1', 5, '2806014eddc24659af96fbf6e835b39a', 63),
('2ec9a47441c911eca717645d86dd6e62', '2021-11-10', '2021-11-10 07:15:01.000000', '2021-11-10', '07:15:01.000000', 45, 2, '', '0', '0', 4, 'd39c2371a31348d7b69cf457a651bde4', 24),
('2ec9a9cc41c911eca77c645d86dd6e62', '2021-11-10', '2021-11-10 09:54:54.000000', '2021-11-10', '09:54:54.000000', 45, 2, '', '0', '1', 4, 'd39c2371a31348d7b69cf457a651bde4', 64),
('3127910a41c911ec845c645d86dd6e62', '2021-11-10', '2021-11-10 07:14:59.000000', '2021-11-10', '07:14:59.000000', 45, 2, '', '0', '0', 3, 'f2bc3cf8443c4770a2bcfec4c267d71a', 23),
('3127910b41c911ec880a645d86dd6e62', '2021-11-10', '2021-11-10 09:54:56.000000', '2021-11-10', '09:54:56.000000', 45, 2, '', '0', '1', 3, 'f2bc3cf8443c4770a2bcfec4c267d71a', 65),
('32efe07541c911ecbe26645d86dd6e62', '2021-11-10', '2021-11-10 07:14:54.000000', '2021-11-10', '07:14:54.000000', 45, 2, '', '0', '0', 1, '7abff2097cfe48d7998b303e0eb31b46', 21),
('32efe07641c911ecbfd9645d86dd6e62', '2021-11-10', '2021-11-10 09:54:59.000000', '2021-11-10', '09:54:59.000000', 45, 2, '', '0', '1', 1, '7abff2097cfe48d7998b303e0eb31b46', 66),
('34c3ea9341c911ec954d645d86dd6e62', '2021-11-10', '2021-11-10 07:14:57.000000', '2021-11-10', '07:14:57.000000', 45, 2, '', '0', '0', 2, '6129562539ff462fa137c4134484d95d', 22),
('34c3ea9441c911ecb96d645d86dd6e62', '2021-11-10', '2021-11-10 09:55:02.000000', '2021-11-10', '09:55:02.000000', 45, 2, '', '0', '1', 2, '6129562539ff462fa137c4134484d95d', 67),
('74c0c9bf412e11ec8778645d86dd6e62', '2021-11-09', '2021-11-09 14:21:06.000000', '2021-11-09', '14:21:06.000000', 45, 1, '', '0', '0', 1, 'bad02a450b0a4efbb85f3a3e1478f0df', 1),
('74c0c9c0412e11ec81cd645d86dd6e62', '2021-11-09', '2021-11-09 15:27:10.000000', '2021-11-09', '15:27:10.000000', 45, 1, '', '1', '1', 1, 'bad02a450b0a4efbb85f3a3e1478f0df', 20);

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

--
-- Dumping data for table `att_payloadparing`
--

INSERT INTO `att_payloadparing` (`id`, `stamp`, `att_date`, `week`, `weekday`, `data_type`, `clock_in`, `in_date`, `in_time`, `clock_out`, `out_date`, `out_time`, `duration`, `worked_duration`, `data_index`, `workday`, `emp_id`, `in_trans_id`, `out_trans_id`, `pay_code_id`, `time_card_id`) VALUES
('144895f6412611ecb335645d86dd6e62', 1636439232, '2021-11-09', 45, 1, 1, '2021-11-09 14:27:12.000000', '2021-11-09', '14:27:12.000000', NULL, NULL, NULL, 0, 0, 1, '0.0', 2, 4, NULL, NULL, '31ce892242ac4732b3798b9820ace701'),
('157c8cd2412611ec845b645d86dd6e62', 1636439235, '2021-11-09', 45, 1, 1, '2021-11-09 14:27:15.000000', '2021-11-09', '14:27:15.000000', NULL, NULL, NULL, 0, 0, 1, '0.0', 3, 5, NULL, NULL, 'fca638b619fb40d1914b19ae48a7b208'),
('16af8c9e412611eca8d9645d86dd6e62', 1636439236, '2021-11-09', 45, 1, 1, '2021-11-09 14:27:16.000000', '2021-11-09', '14:27:16.000000', NULL, NULL, NULL, 0, 0, 1, '0.0', 4, 6, NULL, NULL, '99a4a4e0ff81423da17c2340b8cdf3db'),
('18ab17e2412611ec9fa4645d86dd6e62', 1636439239, '2021-11-09', 45, 1, 1, '2021-11-09 14:27:19.000000', '2021-11-09', '14:27:19.000000', NULL, NULL, NULL, 0, 0, 1, '0.0', 10, 7, NULL, NULL, '1360aa7da9e34cedb8d47acdcac25663'),
('19de5c7a412611ec8699645d86dd6e62', 1636439242, '2021-11-09', 45, 1, 1, '2021-11-09 14:27:22.000000', '2021-11-09', '14:27:22.000000', NULL, NULL, NULL, 0, 0, 1, '0.0', 8, 8, NULL, NULL, 'f4d1002f964240cdb47105004b4c146e'),
('1c4439f4412611ec8c78645d86dd6e62', 1636439246, '2021-11-09', 45, 1, 1, '2021-11-09 14:27:26.000000', '2021-11-09', '14:27:26.000000', NULL, NULL, NULL, 0, 0, 1, '0.0', 9, 9, NULL, NULL, '61dd3941109245f9a5b49727a85bc0ef'),
('1ddf82f8412611ec9b61645d86dd6e62', 1636439248, '2021-11-09', 45, 1, 1, '2021-11-09 14:27:28.000000', '2021-11-09', '14:27:28.000000', NULL, NULL, NULL, 0, 0, 1, '0.0', 7, 10, NULL, NULL, 'cae9c07fdd1745679744a8b8f56acaeb'),
('1f128dfa412611ecbd24645d86dd6e62', 1636439250, '2021-11-09', 45, 1, 1, '2021-11-09 14:27:30.000000', '2021-11-09', '14:27:30.000000', NULL, NULL, NULL, 0, 0, 1, '0.0', 6, 11, NULL, NULL, '2beccc8862d8402689d2025f67e850ab'),
('247d07ec41c911ecb6ef645d86dd6e62', 1636509264, '2021-11-10', 45, 2, 1, '2021-11-10 09:54:24.000000', '2021-11-10', '09:54:24.000000', NULL, NULL, NULL, 0, 0, 1, '0.0', 6, 57, NULL, NULL, '7634c4c5c9594a8a932e542e394f70c7'),
('26ed334041c911ec83d1645d86dd6e62', 1636509279, '2021-11-10', 45, 2, 1, '2021-11-10 09:54:39.000000', '2021-11-10', '09:54:39.000000', NULL, NULL, NULL, 0, 0, 1, '0.0', 7, 59, NULL, NULL, '18e572cb10424d6385078a7c44156ad4'),
('281b885841c911ecaaf7645d86dd6e62', 1636509282, '2021-11-10', 45, 2, 1, '2021-11-10 09:54:42.000000', '2021-11-10', '09:54:42.000000', NULL, NULL, NULL, 0, 0, 1, '0.0', 8, 60, NULL, NULL, '7fbce299e3844775a2f8d634b00d5497'),
('29ee815a41c911eca3ae645d86dd6e62', 1636509284, '2021-11-10', 45, 2, 1, '2021-11-10 09:54:44.000000', '2021-11-10', '09:54:44.000000', NULL, NULL, NULL, 0, 0, 1, '0.0', 9, 61, NULL, NULL, 'f72036763f9a498795ddd721f494a0df'),
('2b2a102841c911ecab4b645d86dd6e62', 1636509287, '2021-11-10', 45, 2, 1, '2021-11-10 09:54:47.000000', '2021-11-10', '09:54:47.000000', NULL, NULL, NULL, 0, 0, 1, '0.0', 10, 62, NULL, NULL, 'd7e1a9ce021b4825a4f100486a05b840'),
('2d8f666641c911ec8de0645d86dd6e62', 1636509290, '2021-11-10', 45, 2, 1, '2021-11-10 07:15:06.000000', '2021-11-10', '07:15:06.000000', '2021-11-10 09:54:50.000000', '2021-11-10', '09:54:50.000000', 9584, 0, 1, '0.2', 5, 25, 63, NULL, '2806014eddc24659af96fbf6e835b39a'),
('2ec8466c41c911ecaa6a645d86dd6e62', 1636509294, '2021-11-10', 45, 2, 1, '2021-11-10 07:15:01.000000', '2021-11-10', '07:15:01.000000', '2021-11-10 09:54:54.000000', '2021-11-10', '09:54:54.000000', 9593, 0, 1, '0.2', 4, 24, 64, NULL, 'd39c2371a31348d7b69cf457a651bde4'),
('3127692e41c911ecaa26645d86dd6e62', 1636509296, '2021-11-10', 45, 2, 1, '2021-11-10 07:14:59.000000', '2021-11-10', '07:14:59.000000', '2021-11-10 09:54:56.000000', '2021-11-10', '09:54:56.000000', 9597, 0, 1, '0.2', 3, 23, 65, NULL, 'f2bc3cf8443c4770a2bcfec4c267d71a'),
('32efe07441c911ec97f1645d86dd6e62', 1636509299, '2021-11-10', 45, 2, 1, '2021-11-10 07:14:54.000000', '2021-11-10', '07:14:54.000000', '2021-11-10 09:54:59.000000', '2021-11-10', '09:54:59.000000', 9605, 0, 1, '0.2', 1, 21, 66, NULL, '7abff2097cfe48d7998b303e0eb31b46'),
('34c3ea9241c911ec9b01645d86dd6e62', 1636509302, '2021-11-10', 45, 2, 1, '2021-11-10 07:14:57.000000', '2021-11-10', '07:14:57.000000', '2021-11-10 09:55:02.000000', '2021-11-10', '09:55:02.000000', 9605, 0, 1, '0.2', 2, 22, 67, NULL, '6129562539ff462fa137c4134484d95d'),
('74c0c9be412e11eca393645d86dd6e62', 1636442830, '2021-11-09', 45, 1, 1, '2021-11-09 14:21:06.000000', '2021-11-09', '14:21:06.000000', '2021-11-09 15:27:10.000000', '2021-11-09', '15:27:10.000000', 3964, 0, 1, '0.1', 1, 1, 20, NULL, 'bad02a450b0a4efbb85f3a3e1478f0df');

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
  `time_card_id` char(32) DEFAULT NULL,
  `is_exception` smallint(6) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `att_payloadpaycode`
--

INSERT INTO `att_payloadpaycode` (`id`, `att_date`, `week`, `weekday`, `pay_code_alias`, `pay_code_symbol`, `duration`, `workday`, `hours`, `minutes`, `is_weekly`, `emp_id`, `pay_code_id`, `shift_id`, `time_card_id`, `is_exception`, `year`) VALUES
('144cf606412611ec8ec5645d86dd6e62', '2021-11-09', 45, 1, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 2, 1, NULL, '31ce892242ac4732b3798b9820ace701', 0, 2021),
('15822f30412611ec867c645d86dd6e62', '2021-11-09', 45, 1, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 3, 1, NULL, 'fca638b619fb40d1914b19ae48a7b208', 0, 2021),
('16bc54ee412611eca771645d86dd6e62', '2021-11-09', 45, 1, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 4, 1, NULL, '99a4a4e0ff81423da17c2340b8cdf3db', 0, 2021),
('18b6a3c8412611ecbbf9645d86dd6e62', '2021-11-09', 45, 1, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 10, 1, NULL, '1360aa7da9e34cedb8d47acdcac25663', 0, 2021),
('19e64f50412611ec8fc7645d86dd6e62', '2021-11-09', 45, 1, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 8, 1, NULL, 'f4d1002f964240cdb47105004b4c146e', 0, 2021),
('1c489f90412611eca6fc645d86dd6e62', '2021-11-09', 45, 1, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 9, 1, NULL, '61dd3941109245f9a5b49727a85bc0ef', 0, 2021),
('1dedd06e412611ec9e2a645d86dd6e62', '2021-11-09', 45, 1, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 7, 1, NULL, 'cae9c07fdd1745679744a8b8f56acaeb', 0, 2021),
('1f1b35d8412611ec96c9645d86dd6e62', '2021-11-09', 45, 1, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 6, 1, NULL, '2beccc8862d8402689d2025f67e850ab', 0, 2021),
('2481cebe41c911ec8511645d86dd6e62', '2021-11-10', 45, 2, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 6, 1, NULL, '7634c4c5c9594a8a932e542e394f70c7', 0, 2021),
('26fb158041c911eca9bd645d86dd6e62', '2021-11-10', 45, 2, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 7, 1, NULL, '18e572cb10424d6385078a7c44156ad4', 0, 2021),
('2824abda41c911ec91d2645d86dd6e62', '2021-11-10', 45, 2, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 8, 1, NULL, '7fbce299e3844775a2f8d634b00d5497', 0, 2021),
('29f481e241c911eca935645d86dd6e62', '2021-11-10', 45, 2, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 9, 1, NULL, 'f72036763f9a498795ddd721f494a0df', 0, 2021),
('2b2ee24241c911ecac4c645d86dd6e62', '2021-11-10', 45, 2, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 10, 1, NULL, 'd7e1a9ce021b4825a4f100486a05b840', 0, 2021),
('2d9414d241c911ec8725645d86dd6e62', '2021-11-10', 45, 2, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 5, 1, NULL, '2806014eddc24659af96fbf6e835b39a', 0, 2021),
('2ece61d841c911ec8b61645d86dd6e62', '2021-11-10', 45, 2, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 4, 1, NULL, 'd39c2371a31348d7b69cf457a651bde4', 0, 2021),
('312c6dfe41c911ecbbbd645d86dd6e62', '2021-11-10', 45, 2, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 3, 1, NULL, 'f2bc3cf8443c4770a2bcfec4c267d71a', 0, 2021),
('32f4c2c041c911ec9c2c645d86dd6e62', '2021-11-10', 45, 2, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 1, 1, NULL, '7abff2097cfe48d7998b303e0eb31b46', 0, 2021),
('34c9b9dc41c911ec9ef6645d86dd6e62', '2021-11-10', 45, 2, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 2, 1, NULL, '6129562539ff462fa137c4134484d95d', 0, 2021),
('74c5ad24412e11ec9aa8645d86dd6e62', '2021-11-09', 45, 1, 'Regular', 'P', 0, '0.0', '0.0', '0.0', 0, 1, 1, NULL, 'bad02a450b0a4efbb85f3a3e1478f0df', 0, 2021);

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
  `time_table_id` int(11) DEFAULT NULL,
  `present` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `att_payloadtimecard`
--

INSERT INTO `att_payloadtimecard` (`id`, `att_date`, `week`, `weekday`, `date_type`, `time_table_alias`, `check_in`, `check_out`, `work_day`, `clock_in`, `clock_out`, `break_out`, `break_in`, `lock_down`, `emp_id`, `time_table_id`, `present`) VALUES
('1360aa7da9e34cedb8d47acdcac25663', '2021-11-09', 45, 1, 1, '', '2021-11-09 00:00:00.000000', '2021-11-10 00:00:00.000000', '1.0', '2021-11-09 14:27:19.000000', NULL, NULL, NULL, 0, 10, NULL, 0),
('18e572cb10424d6385078a7c44156ad4', '2021-11-10', 45, 2, 1, '', '2021-11-10 00:00:00.000000', '2021-11-11 00:00:00.000000', '1.0', '2021-11-10 09:54:39.000000', NULL, NULL, NULL, 0, 7, NULL, 0),
('2806014eddc24659af96fbf6e835b39a', '2021-11-10', 45, 2, 1, '', '2021-11-10 00:00:00.000000', '2021-11-11 00:00:00.000000', '1.0', '2021-11-10 07:15:06.000000', '2021-11-10 09:54:50.000000', NULL, NULL, 0, 5, NULL, 0),
('2beccc8862d8402689d2025f67e850ab', '2021-11-09', 45, 1, 1, '', '2021-11-09 00:00:00.000000', '2021-11-10 00:00:00.000000', '1.0', '2021-11-09 14:27:30.000000', NULL, NULL, NULL, 0, 6, NULL, 0),
('31ce892242ac4732b3798b9820ace701', '2021-11-09', 45, 1, 1, '', '2021-11-09 00:00:00.000000', '2021-11-10 00:00:00.000000', '1.0', '2021-11-09 14:27:12.000000', NULL, NULL, NULL, 0, 2, NULL, 0),
('6129562539ff462fa137c4134484d95d', '2021-11-10', 45, 2, 1, '', '2021-11-10 00:00:00.000000', '2021-11-11 00:00:00.000000', '1.0', '2021-11-10 07:14:57.000000', '2021-11-10 09:55:02.000000', NULL, NULL, 0, 2, NULL, 0),
('61dd3941109245f9a5b49727a85bc0ef', '2021-11-09', 45, 1, 1, '', '2021-11-09 00:00:00.000000', '2021-11-10 00:00:00.000000', '1.0', '2021-11-09 14:27:26.000000', NULL, NULL, NULL, 0, 9, NULL, 0),
('7634c4c5c9594a8a932e542e394f70c7', '2021-11-10', 45, 2, 1, '', '2021-11-10 00:00:00.000000', '2021-11-11 00:00:00.000000', '1.0', '2021-11-10 09:54:24.000000', NULL, NULL, NULL, 0, 6, NULL, 0),
('7abff2097cfe48d7998b303e0eb31b46', '2021-11-10', 45, 2, 1, '', '2021-11-10 00:00:00.000000', '2021-11-11 00:00:00.000000', '1.0', '2021-11-10 07:14:54.000000', '2021-11-10 09:54:59.000000', NULL, NULL, 0, 1, NULL, 0),
('7fbce299e3844775a2f8d634b00d5497', '2021-11-10', 45, 2, 1, '', '2021-11-10 00:00:00.000000', '2021-11-11 00:00:00.000000', '1.0', '2021-11-10 09:54:42.000000', NULL, NULL, NULL, 0, 8, NULL, 0),
('99a4a4e0ff81423da17c2340b8cdf3db', '2021-11-09', 45, 1, 1, '', '2021-11-09 00:00:00.000000', '2021-11-10 00:00:00.000000', '1.0', '2021-11-09 14:27:16.000000', NULL, NULL, NULL, 0, 4, NULL, 0),
('bad02a450b0a4efbb85f3a3e1478f0df', '2021-11-09', 45, 1, 1, '', '2021-11-09 00:00:00.000000', '2021-11-10 00:00:00.000000', '1.0', '2021-11-09 14:21:06.000000', '2021-11-09 15:27:10.000000', NULL, NULL, 0, 1, NULL, 0),
('cae9c07fdd1745679744a8b8f56acaeb', '2021-11-09', 45, 1, 1, '', '2021-11-09 00:00:00.000000', '2021-11-10 00:00:00.000000', '1.0', '2021-11-09 14:27:28.000000', NULL, NULL, NULL, 0, 7, NULL, 0),
('d39c2371a31348d7b69cf457a651bde4', '2021-11-10', 45, 2, 1, '', '2021-11-10 00:00:00.000000', '2021-11-11 00:00:00.000000', '1.0', '2021-11-10 07:15:01.000000', '2021-11-10 09:54:54.000000', NULL, NULL, 0, 4, NULL, 0),
('d7e1a9ce021b4825a4f100486a05b840', '2021-11-10', 45, 2, 1, '', '2021-11-10 00:00:00.000000', '2021-11-11 00:00:00.000000', '1.0', '2021-11-10 09:54:47.000000', NULL, NULL, NULL, 0, 10, NULL, 0),
('f2bc3cf8443c4770a2bcfec4c267d71a', '2021-11-10', 45, 2, 1, '', '2021-11-10 00:00:00.000000', '2021-11-11 00:00:00.000000', '1.0', '2021-11-10 07:14:59.000000', '2021-11-10 09:54:56.000000', NULL, NULL, 0, 3, NULL, 0),
('f4d1002f964240cdb47105004b4c146e', '2021-11-09', 45, 1, 1, '', '2021-11-09 00:00:00.000000', '2021-11-10 00:00:00.000000', '1.0', '2021-11-09 14:27:22.000000', NULL, NULL, NULL, 0, 8, NULL, 0),
('f72036763f9a498795ddd721f494a0df', '2021-11-10', 45, 2, 1, '', '2021-11-10 00:00:00.000000', '2021-11-11 00:00:00.000000', '1.0', '2021-11-10 09:54:44.000000', NULL, NULL, NULL, 0, 9, NULL, 0),
('fca638b619fb40d1914b19ae48a7b208', '2021-11-09', 45, 1, 1, '', '2021-11-09 00:00:00.000000', '2021-11-10 00:00:00.000000', '1.0', '2021-11-09 14:27:15.000000', NULL, NULL, NULL, 0, 3, NULL, 0);

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
  `template_name` varchar(50) NOT NULL,
  `template_value` longtext NOT NULL,
  `is_share` tinyint(1) NOT NULL,
  `is_auto_export` tinyint(1) NOT NULL,
  `builder_id` int(11) DEFAULT NULL,
  `change_time` datetime(6),
  `change_user` varchar(150) DEFAULT NULL,
  `create_time` datetime(6),
  `create_user` varchar(150) DEFAULT NULL,
  `fixed_date_period` tinyint(1) NOT NULL,
  `language` varchar(10) NOT NULL,
  `status` smallint(6) NOT NULL
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
  `max_ot_limit` int(11) NOT NULL,
  `count_early_in_interval` tinyint(1) NOT NULL,
  `count_late_out_interval` tinyint(1) NOT NULL,
  `ot_pay_code_id` int(11) DEFAULT NULL,
  `overtime_policy` smallint(6) NOT NULL
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
-- Table structure for table `att_webpunch`
--

CREATE TABLE `att_webpunch` (
  `workflowinstance_ptr_id` int(11) NOT NULL,
  `punch_time` datetime(6) NOT NULL,
  `punch_state` varchar(5) NOT NULL,
  `work_code` varchar(20) DEFAULT NULL,
  `apply_reason` longtext DEFAULT NULL,
  `apply_time` datetime(6) NOT NULL,
  `verify_type` int(11) NOT NULL
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
('0e4214251a792b1d488f8ea5ba72566aaa7b295c', '2021-11-09 13:40:32.802802', 1);

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
(10, 'Can view email_template_setting', 3, 'view_email_template_setting'),
(11, 'Can view ad_server_setting', 3, 'view_ad_server_setting'),
(12, 'Can view db_migrate', 3, 'view_db_migrate'),
(13, 'Can view safe_setting', 3, 'view_safe_setting'),
(14, 'Can view zoom_setting', 3, 'view_zoom_setting'),
(15, 'Can view twilio_setting', 3, 'view_twilio_setting'),
(16, 'Can view system_setting', 3, 'view_system_setting'),
(17, 'Can view device_config', 4, 'view_device_config'),
(18, 'Can view employeeschedule_report', 5, 'view_employeeschedule_report'),
(19, 'Can view transaction_report', 5, 'view_transaction_report'),
(20, 'Can view time_card_report', 5, 'view_time_card_report'),
(21, 'Can view first_last_report', 5, 'view_first_last_report'),
(22, 'Can view first_in_last_out_report', 5, 'view_first_in_last_out_report'),
(23, 'Can view total_time_card_v2', 5, 'view_total_time_card_v2'),
(24, 'Can view daily_activity', 5, 'view_daily_activity'),
(25, 'Can view daily_overtime', 5, 'view_daily_overtime'),
(26, 'Can view daily_leave', 5, 'view_daily_leave'),
(27, 'Can view daily_late_in', 5, 'view_daily_late_in'),
(28, 'Can view daily_early_out', 5, 'view_daily_early_out'),
(29, 'Can view daily_absent', 5, 'view_daily_absent'),
(30, 'Can view daily_exception', 5, 'view_daily_exception'),
(31, 'Can view scheduled_punch_report', 5, 'view_scheduled_punch_report'),
(32, 'Can view punch_paring', 5, 'view_punch_paring'),
(33, 'Can view daily_multiple_punch_paring', 5, 'view_daily_multiple_punch_paring'),
(34, 'Can view daily_multiple_break_paring', 5, 'view_daily_multiple_break_paring'),
(35, 'Can view weekly_worked_hours', 5, 'view_weekly_worked_hours'),
(36, 'Can view weekly_overtime', 5, 'view_weekly_overtime'),
(37, 'Can view monthly_status', 5, 'view_monthly_status'),
(38, 'Can view monthly_work_hours', 5, 'view_monthly_work_hours'),
(39, 'Can view monthly_punch', 5, 'view_monthly_punch'),
(40, 'Can view monthly_overtime', 5, 'view_monthly_overtime'),
(41, 'Can view monthly_absence', 5, 'view_monthly_absence'),
(42, 'Can view emp_summary_report', 5, 'view_emp_summary_report'),
(43, 'Can view employee_overtime', 5, 'view_employee_overtime'),
(44, 'Can view employee_leave', 5, 'view_employee_leave'),
(45, 'Can view dept_summary_report', 5, 'view_dept_summary_report'),
(46, 'Can view department_overtime', 5, 'view_department_overtime'),
(47, 'Can view group_summary_report', 5, 'view_group_summary_report'),
(48, 'Can view group_overtime', 5, 'view_group_overtime'),
(49, 'Can view sage_vip', 5, 'view_sage_vip'),
(50, 'Can view leave_balance_summary_report', 5, 'view_leave_balance_summary_report'),
(51, 'Can view att_rule_page', 6, 'view_att_rule_page'),
(52, 'Can view report_setting_page', 5, 'view_report_setting_page'),
(53, 'Can view calculation_view', 5, 'view_calculation_view'),
(54, 'Can view view_by_personnel', 5, 'view_view_by_personnel'),
(55, 'Can view PayrollIncrease', 7, 'view_PayrollIncrease'),
(56, 'Can view PayrollDeduction', 7, 'view_PayrollDeduction'),
(57, 'Can view PayrollPayloadDetail', 7, 'view_PayrollPayloadDetail'),
(58, 'Can view PayrollPayloadCalcParam', 7, 'view_PayrollPayloadCalcParam'),
(59, 'Can view PayrollSalaryStructure', 7, 'view_PayrollSalaryStructure'),
(60, 'Can view payroll_reportcalculator', 7, 'view_payroll_reportcalculator'),
(61, 'Can view payroll_calculate_setting', 7, 'view_payroll_calculate_setting'),
(62, 'Can view meeting_attendance_report', 8, 'view_meeting_attendance_report'),
(63, 'Can view meeting_room_scheduled', 8, 'view_meeting_room_scheduled'),
(64, 'Can view ep_dashboard', 9, 'view_ep_dashboard'),
(65, 'Can view daily_detail_report', 10, 'view_daily_detail_report'),
(66, 'Can view department_summary_report', 10, 'view_department_summary_report'),
(67, 'Can view unusual_employees_report', 10, 'view_unusual_employees_report'),
(68, 'Can view ep_real_time_monitoring', 9, 'view_ep_real_time_monitoring'),
(69, 'Can add content type', 122, 'add_contenttype'),
(70, 'Can change content type', 122, 'change_contenttype'),
(71, 'Can delete content type', 122, 'delete_contenttype'),
(72, 'Can view contenttype', 122, 'view_contenttype'),
(73, 'Can add log entry', 123, 'add_logentry'),
(74, 'Can change log entry', 123, 'change_logentry'),
(75, 'Can delete log entry', 123, 'delete_logentry'),
(76, 'Can view logentry', 123, 'view_logentry'),
(77, 'Can add session', 124, 'add_session'),
(78, 'Can change session', 124, 'change_session'),
(79, 'Can delete session', 124, 'delete_session'),
(80, 'Can view session', 124, 'view_session'),
(81, 'Can add Token', 125, 'add_token'),
(82, 'Can change Token', 125, 'change_token'),
(83, 'Can delete Token', 125, 'delete_token'),
(84, 'Can view token', 125, 'view_token'),
(85, 'Can add API Request Log', 14, 'add_apirequestlog'),
(86, 'Can change API Request Log', 14, 'change_apirequestlog'),
(87, 'Can delete API Request Log', 14, 'delete_apirequestlog'),
(88, 'Can view apirequestlog', 14, 'view_apirequestlog'),
(89, 'Can add group object permission', 126, 'add_groupobjectpermission'),
(90, 'Can change group object permission', 126, 'change_groupobjectpermission'),
(91, 'Can delete group object permission', 126, 'delete_groupobjectpermission'),
(92, 'Can add user object permission', 127, 'add_userobjectpermission'),
(93, 'Can change user object permission', 127, 'change_userobjectpermission'),
(94, 'Can delete user object permission', 127, 'delete_userobjectpermission'),
(95, 'Can view userobjectpermission', 127, 'view_userobjectpermission'),
(96, 'Can view groupobjectpermission', 126, 'view_groupobjectpermission'),
(97, 'Can add crontab', 128, 'add_crontabschedule'),
(98, 'Can change crontab', 128, 'change_crontabschedule'),
(99, 'Can delete crontab', 128, 'delete_crontabschedule'),
(100, 'Can add interval', 129, 'add_intervalschedule'),
(101, 'Can change interval', 129, 'change_intervalschedule'),
(102, 'Can delete interval', 129, 'delete_intervalschedule'),
(103, 'Can add periodic task', 130, 'add_periodictask'),
(104, 'Can change periodic task', 130, 'change_periodictask'),
(105, 'Can delete periodic task', 130, 'delete_periodictask'),
(106, 'Can add periodic tasks', 131, 'add_periodictasks'),
(107, 'Can change periodic tasks', 131, 'change_periodictasks'),
(108, 'Can delete periodic tasks', 131, 'delete_periodictasks'),
(109, 'Can add solar event', 132, 'add_solarschedule'),
(110, 'Can change solar event', 132, 'change_solarschedule'),
(111, 'Can delete solar event', 132, 'delete_solarschedule'),
(112, 'Can add clocked', 133, 'add_clockedschedule'),
(113, 'Can change clocked', 133, 'change_clockedschedule'),
(114, 'Can delete clocked', 133, 'delete_clockedschedule'),
(115, 'Can view solarschedule', 132, 'view_solarschedule'),
(116, 'Can view intervalschedule', 129, 'view_intervalschedule'),
(117, 'Can view clockedschedule', 133, 'view_clockedschedule'),
(118, 'Can view crontabschedule', 128, 'view_crontabschedule'),
(119, 'Can view periodictasks', 131, 'view_periodictasks'),
(120, 'Can view periodictask', 130, 'view_periodictask'),
(121, 'Can view base.models.adminLog', 13, 'view_adminlog'),
(122, 'Can add attendance rule', 134, 'add_attparam'),
(123, 'Can change attendance rule', 134, 'change_attparam'),
(124, 'Can delete attendance rule', 134, 'delete_attparam'),
(125, 'Can add attParamDepts', 135, 'add_attparamdepts'),
(126, 'Can change attParamDepts', 135, 'change_attparamdepts'),
(127, 'Can delete attParamDepts', 135, 'delete_attparamdepts'),
(128, 'Can add base_model_autoAttExportTask', 23, 'add_autoattexporttask'),
(129, 'Can change base_model_autoAttExportTask', 23, 'change_autoattexporttask'),
(130, 'Can delete base_model_autoAttExportTask', 23, 'delete_autoattexporttask'),
(131, 'Can add base_model_autoExportTask', 16, 'add_autoexporttask'),
(132, 'Can change base_model_autoExportTask', 16, 'change_autoexporttask'),
(133, 'Can delete base_model_autoExportTask', 16, 'delete_autoexporttask'),
(134, 'Can delete base_model_bookmark', 15, 'delete_bookmark'),
(135, 'Can change base_model_bookmark', 15, 'change_bookmark'),
(136, 'Can add base_model_lineNotifySetting', 17, 'add_linenotifysetting'),
(137, 'Can change base_model_lineNotifySetting', 17, 'change_linenotifysetting'),
(138, 'Can delete base_model_lineNotifySetting', 17, 'delete_linenotifysetting'),
(139, 'Can add base.models.securityPolicy', 26, 'add_securitypolicy'),
(140, 'Can change base.models.securityPolicy', 26, 'change_securitypolicy'),
(141, 'Can delete base.models.securityPolicy', 26, 'delete_securitypolicy'),
(142, 'Can add model_send_email', 136, 'add_sendemail'),
(143, 'Can change model_send_email', 136, 'change_sendemail'),
(144, 'Can delete model_send_email', 136, 'delete_sendemail'),
(145, 'Can add sftp_setting', 12, 'add_sftpsetting'),
(146, 'Can change sftp_setting', 12, 'change_sftpsetting'),
(147, 'Can delete sftp_setting', 12, 'delete_sftpsetting'),
(148, 'Can view base_integrationTable_area', 22, 'view_syncarea'),
(149, 'Can view base_integrationTable_department', 19, 'view_syncdepartment'),
(150, 'Can view base_integrationTable_employee', 21, 'view_syncemployee'),
(151, 'Can view base_integrationTable_position', 20, 'view_syncjob'),
(152, 'Can add System Rule', 137, 'add_sysparam'),
(153, 'Can change System Rule', 137, 'change_sysparam'),
(154, 'Can delete System Rule', 137, 'delete_sysparam'),
(155, 'Can add System Parameter related to Department', 138, 'add_sysparamdept'),
(156, 'Can change System Parameter related to Department', 138, 'change_sysparamdept'),
(157, 'Can delete System Parameter related to Department', 138, 'delete_sysparamdept'),
(158, 'Can view base.models.systemLog', 24, 'view_systemlog'),
(159, 'Can add base.model.systemSetting', 139, 'add_systemsetting'),
(160, 'Can change base.model.systemSetting', 139, 'change_systemsetting'),
(161, 'Can delete base.model.systemSetting', 139, 'delete_systemsetting'),
(162, 'Can add Abstract Permission', 1, 'add_abstractpermission'),
(163, 'Can change Abstract Permission', 1, 'change_abstractpermission'),
(164, 'Can delete Abstract Permission', 1, 'delete_abstractpermission'),
(165, 'Can add System Setting Permission', 1, 'add_systemsettingpermission'),
(166, 'Can change System Setting Permission', 1, 'change_systemsettingpermission'),
(167, 'Can delete System Setting Permission', 1, 'delete_systemsettingpermission'),
(168, 'Can add base.model.emailTemplate', 27, 'add_emailtemplate'),
(169, 'Can change base.model.emailTemplate', 27, 'change_emailtemplate'),
(170, 'Can delete base.model.emailTemplate', 27, 'delete_emailtemplate'),
(171, 'Can add base.models.eventAlertSetting', 28, 'add_eventalertsetting'),
(172, 'Can change base.models.eventAlertSetting', 28, 'change_eventalertsetting'),
(173, 'Can delete base.models.eventAlertSetting', 28, 'delete_eventalertsetting'),
(174, 'Can view sendemail', 136, 'view_sendemail'),
(175, 'Can view sysparam', 137, 'view_sysparam'),
(176, 'Can view sftpsetting', 12, 'view_sftpsetting'),
(177, 'Can view linenotifysetting', 17, 'view_linenotifysetting'),
(178, 'Can view abstractpermission', 140, 'view_abstractpermission'),
(179, 'Can view systemsettingpermission', 141, 'view_systemsettingpermission'),
(180, 'Can view sysparamdept', 138, 'view_sysparamdept'),
(181, 'Can view attparam', 134, 'view_attparam'),
(182, 'Can view attparamdepts', 135, 'view_attparamdepts'),
(183, 'Can view systemsetting', 139, 'view_systemsetting'),
(184, 'Can view autoexporttask', 16, 'view_autoexporttask'),
(185, 'Can ManualExport autoexporttask', 16, 'manual_export_autoexporttask'),
(186, 'Can view autoattexporttask', 23, 'view_autoattexporttask'),
(187, 'Can ManualAttExport autoattexporttask', 23, 'manual_att_export_autoattexporttask'),
(188, 'Can DBBackupAuto dbbackuplog', 18, 'd_b_backup_auto_dbbackuplog'),
(189, 'Can DBBackupManually dbbackuplog', 18, 'd_b_backup_manually_dbbackuplog'),
(190, 'Can DBRestoreManually dbbackuplog', 18, 'd_b_restore_manually_dbbackuplog'),
(191, 'Can view securitypolicy', 26, 'view_securitypolicy'),
(192, 'Can view emailtemplate', 27, 'view_emailtemplate'),
(193, 'Can view eventalertsetting', 28, 'view_eventalertsetting'),
(194, 'Can view bookmark', 15, 'view_bookmark'),
(195, 'Can add iclock_model_bioData', 35, 'add_biodata'),
(196, 'Can change iclock_model_bioData', 35, 'change_biodata'),
(197, 'Can delete iclock_model_bioData', 35, 'delete_biodata'),
(198, 'Can delete iclock_model_bioPhoto', 40, 'delete_biophoto'),
(199, 'Can view iclock_model_bioPhoto', 40, 'view_biophoto'),
(200, 'Can add iclock_model_deviceConfig', 39, 'add_devicemoduleconfig'),
(201, 'Can change iclock_model_deviceConfig', 39, 'change_devicemoduleconfig'),
(202, 'Can delete iclock_model_deviceConfig', 39, 'delete_devicemoduleconfig'),
(203, 'Can add terminal_model_errorCommandLog', 41, 'add_errorcommandlog'),
(204, 'Can change terminal_model_errorCommandLog', 41, 'change_errorcommandlog'),
(205, 'Can delete terminal_model_errorCommandLog', 41, 'delete_errorcommandlog'),
(206, 'Can delete iclock_model_privateMessage', 36, 'delete_privatemessage'),
(207, 'Can change iclock_model_privateMessage', 36, 'change_privatemessage'),
(208, 'Can view iclock_model_privateMessage', 36, 'view_privatemessage'),
(209, 'Can delete iclock_model_publicMessage', 37, 'delete_publicmessage'),
(210, 'Can change iclock_model_publicMessage', 37, 'change_publicmessage'),
(211, 'Can view iclock_model_publicMessage', 37, 'view_publicmessage'),
(212, 'Can add terminal.models.shortMessage', 142, 'add_shortmessage'),
(213, 'Can change terminal.models.shortMessage', 142, 'change_shortmessage'),
(214, 'Can delete terminal.models.shortMessage', 142, 'delete_shortmessage'),
(215, 'Can add iclock_model_terminal', 29, 'add_terminal'),
(216, 'Can change iclock_model_terminal', 29, 'change_terminal'),
(217, 'Can delete iclock_model_terminal', 29, 'delete_terminal'),
(218, 'Can add iclock_model_terminalCommand', 33, 'add_terminalcommand'),
(219, 'Can change iclock_model_terminalCommand', 33, 'change_terminalcommand'),
(220, 'Can delete iclock_model_terminalCommand', 33, 'delete_terminalcommand'),
(221, 'Can add iclock_model_terminalEmployee', 143, 'add_terminalemployee'),
(222, 'Can change iclock_model_terminalEmployee', 143, 'change_terminalemployee'),
(223, 'Can delete iclock_model_terminalEmployee', 143, 'delete_terminalemployee'),
(224, 'Can add iclock_model_terminalLog', 31, 'add_terminallog'),
(225, 'Can change iclock_model_terminalLog', 31, 'change_terminallog'),
(226, 'Can delete iclock_model_terminalLog', 31, 'delete_terminallog'),
(227, 'Can add iclock_model_terminalParameter', 50, 'add_terminalparameter'),
(228, 'Can change iclock_model_terminalParameter', 50, 'change_terminalparameter'),
(229, 'Can delete iclock_model_terminalParameter', 50, 'delete_terminalparameter'),
(230, 'Can add iclock_model_terminalUploadLog', 32, 'add_terminaluploadlog'),
(231, 'Can change iclock_model_terminalUploadLog', 32, 'change_terminaluploadlog'),
(232, 'Can delete iclock_model_terminalUploadLog', 32, 'delete_terminaluploadlog'),
(233, 'Can add iclock_model_terminalWorkCode', 38, 'add_terminalworkcode'),
(234, 'Can change iclock_model_terminalWorkCode', 38, 'change_terminalworkcode'),
(235, 'Can delete iclock_model_terminalWorkCode', 38, 'delete_terminalworkcode'),
(236, 'Can view iclock_model_transaction', 30, 'view_transaction'),
(237, 'Can add transaction.proof.command', 144, 'add_transactionproofcmd'),
(238, 'Can change transaction.proof.command', 144, 'change_transactionproofcmd'),
(239, 'Can delete transaction.proof.command', 144, 'delete_transactionproofcmd'),
(240, 'Can add iclock.models.terminalCommandLog', 34, 'add_terminalcommandlog'),
(241, 'Can change iclock.models.terminalCommandLog', 34, 'change_terminalcommandlog'),
(242, 'Can delete iclock.models.terminalCommandLog', 34, 'delete_terminalcommandlog'),
(243, 'Can add Device Setting Permission', 1, 'add_devicesettingpermission'),
(244, 'Can change Device Setting Permission', 1, 'change_devicesettingpermission'),
(245, 'Can delete Device Setting Permission', 1, 'delete_devicesettingpermission'),
(246, 'Can view terminal', 29, 'view_terminal'),
(247, 'Can TerminalNewArea terminal', 29, 'terminal_new_area_terminal'),
(248, 'Can TerminalClearCommand terminal', 29, 'terminal_clear_command_terminal'),
(249, 'Can TerminalClearAttendanceData terminal', 29, 'terminal_clear_attendance_data_terminal'),
(250, 'Can TerminalDeleteCapture terminal', 29, 'terminal_delete_capture_terminal'),
(251, 'Can TerminalClearAll terminal', 29, 'terminal_clear_all_terminal'),
(252, 'Can TerminalReUploadData terminal', 29, 'terminal_re_upload_data_terminal'),
(253, 'Can TerminalReUploadTransaction terminal', 29, 'terminal_re_upload_transaction_terminal'),
(254, 'Can TerminalReloadData terminal', 29, 'terminal_reload_data_terminal'),
(255, 'Can TerminalManualSync terminal', 29, 'terminal_manual_sync_terminal'),
(256, 'Can TerminalReboot terminal', 29, 'terminal_reboot_terminal'),
(257, 'Can TerminalReadInformation terminal', 29, 'terminal_read_information_terminal'),
(258, 'Can TerminalEnrollRemotely terminal', 29, 'terminal_enroll_remotely_terminal'),
(259, 'Can TerminalDuplicatePunchPeriod terminal', 29, 'terminal_duplicate_punch_period_terminal'),
(260, 'Can TerminalCapture terminal', 29, 'terminal_capture_terminal'),
(261, 'Can TerminalUpgradeFirmware terminal', 29, 'terminal_upgrade_firmware_terminal'),
(262, 'Can TerminalDaylightSavingTime terminal', 29, 'terminal_daylight_saving_time_terminal'),
(263, 'Can TerminalPullFile terminal', 29, 'terminal_pull_file_terminal'),
(264, 'Can TerminalSetOption terminal', 29, 'terminal_set_option_terminal'),
(265, 'Can USBDataUpload transaction', 30, 'u_s_b_data_upload_transaction'),
(266, 'Can AttCaptureDownload transaction', 30, 'att_capture_download_transaction'),
(267, 'Can view terminallog', 31, 'view_terminallog'),
(268, 'Can view terminaluploadlog', 32, 'view_terminaluploadlog'),
(269, 'Can TerminalUploadLogBulkDelete terminaluploadlog', 32, 'terminal_upload_log_bulk_delete_terminaluploadlog'),
(270, 'Can view terminalcommand', 33, 'view_terminalcommand'),
(271, 'Can TerminalCommandBulkDelete terminalcommand', 33, 'terminal_command_bulk_delete_terminalcommand'),
(272, 'Can view terminalcommandlog', 34, 'view_terminalcommandlog'),
(273, 'Can TerminalCommandLogBulkDelete terminalcommandlog', 34, 'terminal_command_log_bulk_delete_terminalcommandlog'),
(274, 'Can view terminalparameter', 50, 'view_terminalparameter'),
(275, 'Can view terminalemployee', 143, 'view_terminalemployee'),
(276, 'Can view shortmessage', 142, 'view_shortmessage'),
(277, 'Can AddPublicMessage publicmessage', 37, 'add_public_message_publicmessage'),
(278, 'Can SendPublicMessage publicmessage', 37, 'send_public_message_publicmessage'),
(279, 'Can AddPrivateMessage privatemessage', 36, 'add_private_message_privatemessage'),
(280, 'Can SendPrivateMessage privatemessage', 36, 'send_private_message_privatemessage'),
(281, 'Can view terminalworkcode', 38, 'view_terminalworkcode'),
(282, 'Can SendWorkCode terminalworkcode', 38, 'send_work_code_terminalworkcode'),
(283, 'Can RemoveWorkCode terminalworkcode', 38, 'remove_work_code_terminalworkcode'),
(284, 'Can view transactionproofcmd', 144, 'view_transactionproofcmd'),
(285, 'Can view biodata', 35, 'view_biodata'),
(286, 'Can view devicemoduleconfig', 39, 'view_devicemoduleconfig'),
(287, 'Can BioPhotoApprove biophoto', 40, 'bio_photo_approve_biophoto'),
(288, 'Can BioPhotoQRCode biophoto', 40, 'bio_photo_q_r_code_biophoto'),
(289, 'Can ImportBioPhoto biophoto', 40, 'import_bio_photo_biophoto'),
(290, 'Can view errorcommandlog', 41, 'view_errorcommandlog'),
(291, 'Can view deviceemployee', 146, 'view_deviceemployee'),
(292, 'Can change model_deviceemployee', 146, 'change_deviceemployee'),
(293, 'Can AreaTransfer deviceemployee', 146, 'area_transfer_deviceemployee'),
(294, 'Can ReSync2Device deviceemployee', 146, 're_sync2_device_deviceemployee'),
(295, 'Can ReUpload deviceemployee', 146, 're_upload_deviceemployee'),
(296, 'Can DeleteBioData deviceemployee', 146, 'delete_bio_data_deviceemployee'),
(297, 'Can view devicesettingpermission', 145, 'view_devicesettingpermission'),
(298, 'Can add psnl_model_area', 42, 'add_area'),
(299, 'Can change psnl_model_area', 42, 'change_area'),
(300, 'Can delete psnl_model_area', 42, 'delete_area'),
(301, 'Can add model_assign_area_to_employee', 147, 'add_assignareaemployee'),
(302, 'Can change model_assign_area_to_employee', 147, 'change_assignareaemployee'),
(303, 'Can delete model_assign_area_to_employee', 147, 'delete_assignareaemployee'),
(304, 'Can add psnl_model_certification', 43, 'add_certification'),
(305, 'Can change psnl_model_certification', 43, 'change_certification'),
(306, 'Can delete psnl_model_certification', 43, 'delete_certification'),
(307, 'Can add psnl_model_department', 44, 'add_department'),
(308, 'Can change psnl_model_department', 44, 'change_department'),
(309, 'Can delete psnl_model_department', 44, 'delete_department'),
(310, 'Can add model_employee', 45, 'add_employee'),
(311, 'Can change model_employee', 45, 'change_employee'),
(312, 'Can delete model_employee', 45, 'delete_employee'),
(313, 'Can delete employee certification', 48, 'delete_employeecertification'),
(314, 'Can change employee certification', 48, 'change_employeecertification'),
(315, 'Can view employee certification', 48, 'view_employeecertification'),
(316, 'Can add pnsl_model_empProfile', 148, 'add_employeeprofile'),
(317, 'Can change pnsl_model_empProfile', 148, 'change_employeeprofile'),
(318, 'Can delete pnsl_model_empProfile', 148, 'delete_employeeprofile'),
(319, 'Can add psnl.models.employment', 149, 'add_employment'),
(320, 'Can change psnl.models.employment', 149, 'change_employment'),
(321, 'Can delete psnl.models.employment', 149, 'delete_employment'),
(322, 'Can add psnl_model_position', 46, 'add_position'),
(323, 'Can change psnl_model_position', 46, 'change_position'),
(324, 'Can delete psnl_model_position', 46, 'delete_position'),
(325, 'Can delete psnl_model_resign', 47, 'delete_resign'),
(326, 'Can change psnl_model_resign', 47, 'change_resign'),
(327, 'Can view psnl_model_resign', 47, 'view_resign'),
(328, 'Can add employee calendar', 150, 'add_employeecalendar'),
(329, 'Can change employee calendar', 150, 'change_employeecalendar'),
(330, 'Can delete employee calendar', 150, 'delete_employeecalendar'),
(331, 'Can add personnel.models.employeeCustomAttribute', 49, 'add_employeecustomattribute'),
(332, 'Can change personnel.models.employeeCustomAttribute', 49, 'change_employeecustomattribute'),
(333, 'Can delete personnel.models.employeeCustomAttribute', 49, 'delete_employeecustomattribute'),
(334, 'Can add personnel.models.employeeExtraInfo', 151, 'add_employeeextrainfo'),
(335, 'Can change personnel.models.employeeExtraInfo', 151, 'change_employeeextrainfo'),
(336, 'Can delete personnel.models.employeeExtraInfo', 151, 'delete_employeeextrainfo'),
(337, 'Can view department', 44, 'view_department'),
(338, 'Can Import department', 44, 'import_department'),
(339, 'Can SetDepartment department', 44, 'set_department_department'),
(340, 'Can view position', 46, 'view_position'),
(341, 'Can Import position', 46, 'import_position'),
(342, 'Can SetPosition position', 46, 'set_position_position'),
(343, 'Can view area', 42, 'view_area'),
(344, 'Can Import area', 42, 'import_area'),
(345, 'Can SetArea area', 42, 'set_area_area'),
(346, 'Can view certification', 43, 'view_certification'),
(347, 'Can Import certification', 43, 'import_certification'),
(348, 'Can view employee', 45, 'view_employee'),
(349, 'Can ImportEmployee employee', 45, 'import_employee_employee'),
(350, 'Can ImportDocument employee', 45, 'import_document_employee'),
(351, 'Can ImportPhoto employee', 45, 'import_photo_employee'),
(352, 'Can ImportUSBData employee', 45, 'import_u_s_b_data_employee'),
(353, 'Can AdjustDepartment employee', 45, 'adjust_department_employee'),
(354, 'Can PositionTransfer employee', 45, 'position_transfer_employee'),
(355, 'Can AdjustArea employee', 45, 'adjust_area_employee'),
(356, 'Can PassProbation employee', 45, 'pass_probation_employee'),
(357, 'Can Resignation employee', 45, 'resignation_employee'),
(358, 'Can EnableApp employee', 45, 'enable_app_employee'),
(359, 'Can DisableApp employee', 45, 'disable_app_employee'),
(360, 'Can ResynchronizeDevice employee', 45, 'resynchronize_device_employee'),
(361, 'Can ReUploadFromDevice employee', 45, 're_upload_from_device_employee'),
(362, 'Can DeleteBiometricTemplates employee', 45, 'delete_biometric_templates_employee'),
(363, 'Can ExportUSBData employee', 45, 'export_u_s_b_data_employee'),
(364, 'Can view employment', 149, 'view_employment'),
(365, 'Can view assignareaemployee', 147, 'view_assignareaemployee'),
(366, 'Can AddEmployeeResign resign', 47, 'add_employee_resign_resign'),
(367, 'Can Reinstatement resign', 47, 'reinstatement_resign'),
(368, 'Can Import resign', 47, 'import_resign'),
(369, 'Can DisableAttendanceFunction resign', 47, 'disable_attendance_function_resign'),
(370, 'Can AddEmployeeCert employeecertification', 48, 'add_employee_cert_employeecertification'),
(371, 'Can Import employeecertification', 48, 'import_employeecertification'),
(372, 'Can view employeeprofile', 148, 'view_employeeprofile'),
(373, 'Can view employeecalendar', 150, 'view_employeecalendar'),
(374, 'Can view employeecustomattribute', 49, 'view_employeecustomattribute'),
(375, 'Can view employeeextrainfo', 151, 'view_employeeextrainfo'),
(376, 'Can add workflow_node_instance', 152, 'add_nodeinstance'),
(377, 'Can change workflow_node_instance', 152, 'change_nodeinstance'),
(378, 'Can delete workflow_node_instance', 152, 'delete_nodeinstance'),
(379, 'Can add workflow_model_workflowEngine', 52, 'add_workflowengine'),
(380, 'Can change workflow_model_workflowEngine', 52, 'change_workflowengine'),
(381, 'Can delete workflow_model_workflowEngine', 52, 'delete_workflowengine'),
(382, 'Can add workflow instance', 153, 'add_workflowinstance'),
(383, 'Can change workflow instance', 153, 'change_workflowinstance'),
(384, 'Can delete workflow instance', 153, 'delete_workflowinstance'),
(385, 'Can add workflow_model_workflowNode', 53, 'add_workflownode'),
(386, 'Can change workflow_model_workflowNode', 53, 'change_workflownode'),
(387, 'Can delete workflow_model_workflowNode', 53, 'delete_workflownode'),
(388, 'Can add workflow_model_workflowRole', 51, 'add_workflowrole'),
(389, 'Can change workflow_model_workflowRole', 51, 'change_workflowrole'),
(390, 'Can delete workflow_model_workflowRole', 51, 'delete_workflowrole'),
(391, 'Can view workflowrole', 51, 'view_workflowrole'),
(392, 'Can WorkFlowRoleAssignEmployee workflowrole', 51, 'work_flow_role_assign_employee_workflowrole'),
(393, 'Can view workflowengine', 52, 'view_workflowengine'),
(394, 'Can WorkFlowSetupForDepartment workflowengine', 52, 'work_flow_setup_for_department_workflowengine'),
(395, 'Can WorkFlowSetupForPosition workflowengine', 52, 'work_flow_setup_for_position_workflowengine'),
(396, 'Can WorkFlowSetupForEmployee workflowengine', 52, 'work_flow_setup_for_employee_workflowengine'),
(397, 'Can view workflownode', 53, 'view_workflownode'),
(398, 'Can view nodeinstance', 152, 'view_nodeinstance'),
(399, 'Can view workflowinstance', 153, 'view_workflowinstance'),
(400, 'Can add att_calc_log', 154, 'add_attcalclog'),
(401, 'Can change att_calc_log', 154, 'change_attcalclog'),
(402, 'Can delete att_calc_log', 154, 'delete_attcalclog'),
(403, 'Can change att.models.attCode', 55, 'change_attcode'),
(404, 'Can view att.models.attCode', 55, 'view_attcode'),
(405, 'Can add att.models.attEmployee', 155, 'add_attemployee'),
(406, 'Can change att.models.attEmployee', 155, 'change_attemployee'),
(407, 'Can delete att.models.attEmployee', 155, 'delete_attemployee'),
(408, 'Can add att.models.attGroup', 56, 'add_attgroup'),
(409, 'Can change att.models.attGroup', 56, 'change_attgroup'),
(410, 'Can delete att.models.attGroup', 56, 'delete_attgroup'),
(411, 'Can add att.models.attPolicy', 57, 'add_attpolicy'),
(412, 'Can change att.models.attPolicy', 57, 'change_attpolicy'),
(413, 'Can delete att.models.attPolicy', 57, 'delete_attpolicy'),
(414, 'Can add att.model.calculateItem', 77, 'add_attreportsetting'),
(415, 'Can change att.model.calculateItem', 77, 'change_attreportsetting'),
(416, 'Can delete att.model.calculateItem', 77, 'delete_attreportsetting'),
(417, 'Can add att_model_attRule', 60, 'add_attrule'),
(418, 'Can change att_model_attRule', 60, 'change_attrule'),
(419, 'Can delete att_model_attRule', 60, 'delete_attrule'),
(420, 'Can delete att_model_schedule', 65, 'delete_attschedule'),
(421, 'Can change att_model_schedule', 65, 'change_attschedule'),
(422, 'Can view att_model_schedule', 65, 'view_attschedule'),
(423, 'Can add att_model_shift', 64, 'add_attshift'),
(424, 'Can change att_model_shift', 64, 'change_attshift'),
(425, 'Can delete att_model_shift', 64, 'delete_attshift'),
(426, 'Can add att_model_breakTime', 73, 'add_breaktime'),
(427, 'Can change att_model_breakTime', 73, 'change_breaktime'),
(428, 'Can delete att_model_breakTime', 73, 'delete_breaktime'),
(429, 'Can add att_model_changeSchedule', 74, 'add_changeschedule'),
(430, 'Can change att_model_changeSchedule', 74, 'change_changeschedule'),
(431, 'Can delete att_model_changeSchedule', 74, 'delete_changeschedule'),
(432, 'Can add att.models.departmentPolicy', 58, 'add_departmentpolicy'),
(433, 'Can change att.models.departmentPolicy', 58, 'change_departmentpolicy'),
(434, 'Can delete att.models.departmentPolicy', 58, 'delete_departmentpolicy'),
(435, 'Can delete att_model_deptSchedule', 75, 'delete_departmentschedule'),
(436, 'Can change att_model_deptSchedule', 75, 'change_departmentschedule'),
(437, 'Can view att_model_deptSchedule', 75, 'view_departmentschedule'),
(438, 'Can delete att_model_deptAttRule', 72, 'delete_deptattrule'),
(439, 'Can change att_model_deptAttRule', 72, 'change_deptattrule'),
(440, 'Can view att_model_deptAttRule', 72, 'view_deptattrule'),
(441, 'Can add att.models.groupPolicy', 59, 'add_grouppolicy'),
(442, 'Can change att.models.groupPolicy', 59, 'change_grouppolicy'),
(443, 'Can delete att.models.groupPolicy', 59, 'delete_grouppolicy'),
(444, 'Can add att.models.groupSchedule', 76, 'add_groupschedule'),
(445, 'Can change att.models.groupSchedule', 76, 'change_groupschedule'),
(446, 'Can delete att.models.groupSchedule', 76, 'delete_groupschedule'),
(447, 'Can delete att_model_holiday', 71, 'delete_holiday'),
(448, 'Can change att_model_holiday', 71, 'change_holiday'),
(449, 'Can view att_model_holiday', 71, 'view_holiday'),
(450, 'Can delete att_model_leave', 68, 'delete_leave'),
(451, 'Can change att_model_leave', 68, 'change_leave'),
(452, 'Can view att_model_leave', 68, 'view_leave'),
(453, 'Can add att_model_manualLog', 62, 'add_manuallog'),
(454, 'Can change att_model_manualLog', 62, 'change_manuallog'),
(455, 'Can delete att_model_manualLog', 62, 'delete_manuallog'),
(456, 'Can delete att_model_overtime', 70, 'delete_overtime'),
(457, 'Can change att_model_overtime', 70, 'change_overtime'),
(458, 'Can view att_model_overtime', 70, 'view_overtime'),
(459, 'Can add att.models.overtimePolicy', 156, 'add_overtimepolicy'),
(460, 'Can change att.models.overtimePolicy', 156, 'change_overtimepolicy'),
(461, 'Can delete att.models.overtimePolicy', 156, 'delete_overtimepolicy'),
(462, 'Can add att.models.payCode', 54, 'add_paycode'),
(463, 'Can change att.models.payCode', 54, 'change_paycode'),
(464, 'Can delete att.models.payCode', 54, 'delete_paycode'),
(465, 'Can add payload att code', 157, 'add_payloadattcode'),
(466, 'Can change payload att code', 157, 'change_payloadattcode'),
(467, 'Can delete payload att code', 157, 'delete_payloadattcode'),
(468, 'Can add payload base', 158, 'add_payloadbase'),
(469, 'Can change payload base', 158, 'change_payloadbase'),
(470, 'Can delete payload base', 158, 'delete_payloadbase'),
(471, 'Can add payload break', 159, 'add_payloadbreak'),
(472, 'Can change payload break', 159, 'change_payloadbreak'),
(473, 'Can delete payload break', 159, 'delete_payloadbreak'),
(474, 'Can add payload effect punch', 160, 'add_payloadeffectpunch'),
(475, 'Can change payload effect punch', 160, 'change_payloadeffectpunch'),
(476, 'Can delete payload effect punch', 160, 'delete_payloadeffectpunch'),
(477, 'Can add payload exception', 161, 'add_payloadexception'),
(478, 'Can change payload exception', 161, 'change_payloadexception'),
(479, 'Can delete payload exception', 161, 'delete_payloadexception'),
(480, 'Can add payload mul punch set', 162, 'add_payloadmulpunchset'),
(481, 'Can change payload mul punch set', 162, 'change_payloadmulpunchset'),
(482, 'Can delete payload mul punch set', 162, 'delete_payloadmulpunchset'),
(483, 'Can add payload overtime', 163, 'add_payloadovertime'),
(484, 'Can change payload overtime', 163, 'change_payloadovertime'),
(485, 'Can delete payload overtime', 163, 'delete_payloadovertime'),
(486, 'Can add payload paring', 164, 'add_payloadparing'),
(487, 'Can change payload paring', 164, 'change_payloadparing'),
(488, 'Can delete payload paring', 164, 'delete_payloadparing'),
(489, 'Can add payload pay code', 165, 'add_payloadpaycode'),
(490, 'Can change payload pay code', 165, 'change_payloadpaycode'),
(491, 'Can delete payload pay code', 165, 'delete_payloadpaycode'),
(492, 'Can add payload punch', 166, 'add_payloadpunch'),
(493, 'Can change payload punch', 166, 'change_payloadpunch'),
(494, 'Can delete payload punch', 166, 'delete_payloadpunch'),
(495, 'Can add att.models.payloadTimeCard', 167, 'add_payloadtimecard'),
(496, 'Can change att.models.payloadTimeCard', 167, 'change_payloadtimecard'),
(497, 'Can delete att.models.payloadTimeCard', 167, 'delete_payloadtimecard'),
(498, 'Can add att_model_reportParameter', 61, 'add_reportparam'),
(499, 'Can change att_model_reportParameter', 61, 'change_reportparam'),
(500, 'Can delete att_model_reportParameter', 61, 'delete_reportparam'),
(501, 'Can add att_model_reportTemplate', 168, 'add_reporttemplate'),
(502, 'Can change att_model_reportTemplate', 168, 'change_reporttemplate'),
(503, 'Can delete att_model_reportTemplate', 168, 'delete_reporttemplate'),
(504, 'Can add att_model_shiftDetail', 169, 'add_shiftdetail'),
(505, 'Can change att_model_shiftDetail', 169, 'change_shiftdetail'),
(506, 'Can delete att_model_shiftDetail', 169, 'delete_shiftdetail'),
(507, 'Can delete att.models.temporarySchedule', 67, 'delete_temporaryschedule'),
(508, 'Can change att.models.temporarySchedule', 67, 'change_temporaryschedule'),
(509, 'Can view att.models.temporarySchedule', 67, 'view_temporaryschedule'),
(510, 'Can delete att_model_tempSchedule', 66, 'delete_tempschedule'),
(511, 'Can change att_model_tempSchedule', 66, 'change_tempschedule'),
(512, 'Can view att_model_tempSchedule', 66, 'view_tempschedule'),
(513, 'Can delete att_model_timeInterval', 63, 'delete_timeinterval'),
(514, 'Can change att_model_timeInterval', 63, 'change_timeinterval'),
(515, 'Can view att_model_timeInterval', 63, 'view_timeinterval'),
(516, 'Can add att_model_training', 69, 'add_training'),
(517, 'Can change att_model_training', 69, 'change_training'),
(518, 'Can delete att_model_training', 69, 'delete_training'),
(519, 'Can add Att Setting Permission', 1, 'add_attsettingpermission'),
(520, 'Can change Att Setting Permission', 1, 'change_attsettingpermission'),
(521, 'Can delete Att Setting Permission', 1, 'delete_attsettingpermission'),
(522, 'Can add Report Permission', 1, 'add_reportpermission'),
(523, 'Can change Report Permission', 1, 'change_reportpermission'),
(524, 'Can delete Report Permission', 1, 'delete_reportpermission'),
(525, 'Can add menu_att_leavegroup', 78, 'add_leavegroup'),
(526, 'Can change menu_att_leavegroup', 78, 'change_leavegroup'),
(527, 'Can delete menu_att_leavegroup', 78, 'delete_leavegroup'),
(528, 'Can add att_model_leavegroupdetail', 79, 'add_leavegroupdetail'),
(529, 'Can change att_model_leavegroupdetail', 79, 'change_leavegroupdetail'),
(530, 'Can delete att_model_leavegroupdetail', 79, 'delete_leavegroupdetail'),
(531, 'Can add att_model_leaveYearBalance', 80, 'add_leaveyearbalance'),
(532, 'Can change att_model_leaveYearBalance', 80, 'change_leaveyearbalance'),
(533, 'Can delete att_model_leaveYearBalance', 80, 'delete_leaveyearbalance'),
(534, 'Can add att.models.webPunch', 170, 'add_webpunch'),
(535, 'Can change att.models.webPunch', 170, 'change_webpunch'),
(536, 'Can delete att.models.webPunch', 170, 'delete_webpunch'),
(537, 'Can view paycode', 54, 'view_paycode'),
(538, 'Can view attgroup', 56, 'view_attgroup'),
(539, 'Can SetGroup attgroup', 56, 'set_group_attgroup'),
(540, 'Can view attpolicy', 57, 'view_attpolicy'),
(541, 'Can view departmentpolicy', 58, 'view_departmentpolicy'),
(542, 'Can AddDepartmentPolicy departmentpolicy', 58, 'add_department_policy_departmentpolicy'),
(543, 'Can view grouppolicy', 59, 'view_grouppolicy'),
(544, 'Can AddGroupPolicy grouppolicy', 59, 'add_group_policy_grouppolicy'),
(545, 'Can view attrule', 60, 'view_attrule'),
(546, 'Can view attemployee', 155, 'view_attemployee'),
(547, 'Can view attshift', 64, 'view_attshift'),
(548, 'Can AddAttSchedule attschedule', 65, 'add_att_schedule_attschedule'),
(549, 'Can Import attschedule', 65, 'import_attschedule'),
(550, 'Can view breaktime', 73, 'view_breaktime'),
(551, 'Can AddDepartmentHoliday holiday', 71, 'add_department_holiday_holiday'),
(552, 'Can AddLeave leave', 68, 'add_leave_leave'),
(553, 'Can BulkAddLeave leave', 68, 'bulk_add_leave_leave'),
(554, 'Can ApproveLeave leave', 68, 'approve_leave_leave'),
(555, 'Can Reject leave', 68, 'reject_leave'),
(556, 'Can Revoke leave', 68, 'revoke_leave'),
(557, 'Can Import leave', 68, 'import_leave'),
(558, 'Can view manuallog', 62, 'view_manuallog'),
(559, 'Can AddManualLog manuallog', 62, 'add_manual_log_manuallog'),
(560, 'Can BulkAddManualLog manuallog', 62, 'bulk_add_manual_log_manuallog'),
(561, 'Can Approve manuallog', 62, 'approve_manuallog'),
(562, 'Can Reject manuallog', 62, 'reject_manuallog'),
(563, 'Can Revoke manuallog', 62, 'revoke_manuallog'),
(564, 'Can Import manuallog', 62, 'import_manuallog'),
(565, 'Can AddOvertime overtime', 70, 'add_overtime_overtime'),
(566, 'Can BulkAddOvertime overtime', 70, 'bulk_add_overtime_overtime'),
(567, 'Can Approve overtime', 70, 'approve_overtime'),
(568, 'Can Reject overtime', 70, 'reject_overtime'),
(569, 'Can Revoke overtime', 70, 'revoke_overtime'),
(570, 'Can Import overtime', 70, 'import_overtime'),
(571, 'Can view reportparam', 61, 'view_reportparam'),
(572, 'Can view attreportsetting', 77, 'view_attreportsetting'),
(573, 'Can AddNormalTimetable timeinterval', 63, 'add_normal_timetable_timeinterval'),
(574, 'Can AddFlexibleTimetable timeinterval', 63, 'add_flexible_timetable_timeinterval'),
(575, 'Can view shiftdetail', 169, 'view_shiftdetail'),
(576, 'Can AddTempSchedule tempschedule', 66, 'add_temp_schedule_tempschedule'),
(577, 'Can Import tempschedule', 66, 'import_tempschedule'),
(578, 'Can AddTemporarySchedule temporaryschedule', 67, 'add_temporary_schedule_temporaryschedule'),
(579, 'Can ImportTemporarySchedule temporaryschedule', 67, 'import_temporary_schedule_temporaryschedule'),
(580, 'Can view training', 69, 'view_training'),
(581, 'Can AddTraining training', 69, 'add_training_training'),
(582, 'Can BulkAddTraining training', 69, 'bulk_add_training_training'),
(583, 'Can Approve training', 69, 'approve_training'),
(584, 'Can Reject training', 69, 'reject_training'),
(585, 'Can Revoke training', 69, 'revoke_training'),
(586, 'Can Import training', 69, 'import_training'),
(587, 'Can BatchAddDepartmentRule deptattrule', 72, 'batch_add_department_rule_deptattrule'),
(588, 'Can view changeschedule', 74, 'view_changeschedule'),
(589, 'Can Approve changeschedule', 74, 'approve_changeschedule'),
(590, 'Can Reject changeschedule', 74, 'reject_changeschedule'),
(591, 'Can Revoke changeschedule', 74, 'revoke_changeschedule'),
(592, 'Can AddDepartmentSchedule departmentschedule', 75, 'add_department_schedule_departmentschedule'),
(593, 'Can view groupschedule', 76, 'view_groupschedule'),
(594, 'Can AddGroupSchedule groupschedule', 76, 'add_group_schedule_groupschedule'),
(595, 'Can view payloadtimecard', 167, 'view_payloadtimecard'),
(596, 'Can view payloadpaycode', 165, 'view_payloadpaycode'),
(597, 'Can view payloadattcode', 157, 'view_payloadattcode'),
(598, 'Can view payloadparing', 164, 'view_payloadparing'),
(599, 'Can view payloadeffectpunch', 160, 'view_payloadeffectpunch'),
(600, 'Can view payloadovertime', 163, 'view_payloadovertime'),
(601, 'Can view payloadbreak', 159, 'view_payloadbreak'),
(602, 'Can view payloadbase', 158, 'view_payloadbase'),
(603, 'Can view payloadpunch', 166, 'view_payloadpunch'),
(604, 'Can view payloadexception', 161, 'view_payloadexception'),
(605, 'Can view payloadmulpunchset', 162, 'view_payloadmulpunchset'),
(606, 'Can view overtimepolicy', 156, 'view_overtimepolicy'),
(607, 'Can view reporttemplate', 168, 'view_reporttemplate'),
(608, 'Can view leavegroup', 78, 'view_leavegroup'),
(609, 'Can AssignLeaveGroup leavegroup', 78, 'assign_leave_group_leavegroup'),
(610, 'Can AddLeaveGroup leavegroup', 78, 'add_leave_group_leavegroup'),
(611, 'Can view leavegroupdetail', 79, 'view_leavegroupdetail'),
(612, 'Can view leaveyearbalance', 80, 'view_leaveyearbalance'),
(613, 'Can view webpunch', 170, 'view_webpunch'),
(614, 'Can view reportpermission', 172, 'view_reportpermission'),
(615, 'Can view attsettingpermission', 171, 'view_attsettingpermission'),
(616, 'Can view attcalclog', 154, 'view_attcalclog'),
(617, 'Can add base_model_user', 11, 'add_myuser'),
(618, 'Can change base_model_user', 11, 'change_myuser'),
(619, 'Can add iclock_model_bioData', 173, 'add_adminbiodata'),
(620, 'Can change iclock_model_bioData', 173, 'change_adminbiodata'),
(621, 'Can delete iclock_model_bioData', 173, 'delete_adminbiodata'),
(622, 'Can add accounts.models.userNotification', 25, 'add_usernotification'),
(623, 'Can change accounts.models.userNotification', 25, 'change_usernotification'),
(624, 'Can delete accounts.models.userNotification', 25, 'delete_usernotification'),
(625, 'can_enter_menu_system_module', 174, 'enter_system_module'),
(626, 'can_enter_personnel_module', 174, 'enter_personnel_module'),
(627, 'can_enter_terminal_module', 174, 'enter_terminal_module'),
(628, 'can_enter_attendance_module', 174, 'enter_attendance_module'),
(629, 'can_enter_payroll_module', 174, 'enter_payroll_module'),
(630, 'can_enter_access_module', 174, 'enter_access_module'),
(631, 'can_enter_visitor_module', 174, 'enter_visitor_module'),
(632, 'can_enter_meeting_module', 174, 'enter_meeting_module'),
(633, 'can_enter_ep_module', 174, 'enter_ep_module'),
(634, 'Can view myuser', 11, 'view_myuser'),
(635, 'Can ChangePassword myuser', 11, 'change_password_myuser'),
(636, 'Can UserDelete myuser', 11, 'user_delete_myuser'),
(637, 'Can view adminbiodata', 173, 'view_adminbiodata'),
(638, 'Can view usernotification', 25, 'view_usernotification'),
(639, 'Can MarkerAll usernotification', 25, 'marker_all_usernotification'),
(640, 'Can add StaffToken', 175, 'add_stafftoken'),
(641, 'Can change StaffToken', 175, 'change_stafftoken'),
(642, 'Can delete StaffToken', 175, 'delete_stafftoken'),
(643, 'Can view stafftoken', 175, 'view_stafftoken'),
(644, 'Can delete app_model_announcement', 81, 'delete_announcement'),
(645, 'Can delete app_model_actionLog', 84, 'delete_appactionlog'),
(646, 'Can delete app_model_appList', 82, 'delete_applist'),
(647, 'Can delete app_model_notification', 83, 'delete_appnotification'),
(648, 'Can delete mobile_model_gpsForDepartment', 86, 'delete_gpsfordepartment'),
(649, 'Can change mobile_model_gpsForDepartment', 86, 'change_gpsfordepartment'),
(650, 'Can view mobile_model_gpsForDepartment', 86, 'view_gpsfordepartment'),
(651, 'Can delete mobile_model_gpsForEmployee', 85, 'delete_gpsforemployee'),
(652, 'Can change mobile_model_gpsForEmployee', 85, 'change_gpsforemployee'),
(653, 'Can view mobile_model_gpsForEmployee', 85, 'view_gpsforemployee'),
(654, 'Can add mobile_model_gpsLocation', 87, 'add_gpslocation'),
(655, 'Can change mobile_model_gpsLocation', 87, 'change_gpslocation'),
(656, 'Can delete mobile_model_gpsLocation', 87, 'delete_gpslocation'),
(657, 'Can add mobile api request log', 88, 'add_mobileapirequestlog'),
(658, 'Can change mobile api request log', 88, 'change_mobileapirequestlog'),
(659, 'Can delete mobile api request log', 88, 'delete_mobileapirequestlog'),
(660, 'Can view appactionlog', 84, 'view_appactionlog'),
(661, 'Can view applist', 82, 'view_applist'),
(662, 'Can PushNotification applist', 82, 'push_notification_applist'),
(663, 'Can ForceOffline applist', 82, 'force_offline_applist'),
(664, 'Can Disable applist', 82, 'disable_applist'),
(665, 'Can Enable applist', 82, 'enable_applist'),
(666, 'Can view announcement', 81, 'view_announcement'),
(667, 'Can AddPublicNotice announcement', 81, 'add_public_notice_announcement'),
(668, 'Can AddPrivateNotice announcement', 81, 'add_private_notice_announcement'),
(669, 'Can view appnotification', 83, 'view_appnotification'),
(670, 'Can view gpslocation', 87, 'view_gpslocation'),
(671, 'Can AddGPSForDepartment gpsfordepartment', 86, 'add_g_p_s_for_department_gpsfordepartment'),
(672, 'Can AddGPSForEmployee gpsforemployee', 85, 'add_g_p_s_for_employee_gpsforemployee'),
(673, 'Can view mobileapirequestlog', 88, 'view_mobileapirequestlog'),
(674, 'Can add payroll_model_deductionFormula', 90, 'add_deductionformula'),
(675, 'Can change payroll_model_deductionFormula', 90, 'change_deductionformula'),
(676, 'Can delete payroll_model_deductionFormula', 90, 'delete_deductionformula'),
(677, 'Can delete payroll_model_empLoan', 95, 'delete_emploan'),
(678, 'Can add payroll_model_empPayrollProfile', 89, 'add_emppayrollprofile'),
(679, 'Can change payroll_model_empPayrollProfile', 89, 'change_emppayrollprofile'),
(680, 'Can delete payroll_model_empPayrollProfile', 89, 'delete_emppayrollprofile'),
(681, 'Can add payroll_model_exceptionFormula', 91, 'add_exceptionformula'),
(682, 'Can change payroll_model_exceptionFormula', 91, 'change_exceptionformula'),
(683, 'Can delete payroll_model_exceptionFormula', 91, 'delete_exceptionformula'),
(684, 'Can delete payroll_model_extraDeduction', 100, 'delete_extradeduction'),
(685, 'Can change payroll_model_extraDeduction', 100, 'change_extradeduction'),
(686, 'Can view payroll_model_extraDeduction', 100, 'view_extradeduction'),
(687, 'Can delete payroll_model_extraIncrease', 99, 'delete_extraincrease'),
(688, 'Can change payroll_model_extraIncrease', 99, 'change_extraincrease'),
(689, 'Can view payroll_model_extraIncrease', 99, 'view_extraincrease'),
(690, 'Can add payroll_model_increasementFormula', 92, 'add_increasementformula'),
(691, 'Can change payroll_model_increasementFormula', 92, 'change_increasementformula'),
(692, 'Can delete payroll_model_increasementFormula', 92, 'delete_increasementformula'),
(693, 'Can add payroll_model_leaveFormula', 93, 'add_leaveformula'),
(694, 'Can change payroll_model_leaveFormula', 93, 'change_leaveformula'),
(695, 'Can delete payroll_model_leaveFormula', 93, 'delete_leaveformula'),
(696, 'Can add payroll_model_overtimeFormula', 94, 'add_overtimeformula'),
(697, 'Can change payroll_model_overtimeFormula', 94, 'change_overtimeformula'),
(698, 'Can delete payroll_model_overtimeFormula', 94, 'delete_overtimeformula'),
(699, 'Can add payroll_model_payroll_payload', 176, 'add_payrollpayload'),
(700, 'Can change payroll_model_payroll_payload', 176, 'change_payrollpayload'),
(701, 'Can delete payroll_model_payroll_payload', 176, 'delete_payrollpayload'),
(702, 'Can add payroll payload pay code', 177, 'add_payrollpayloadpaycode'),
(703, 'Can change payroll payload pay code', 177, 'change_payrollpayloadpaycode'),
(704, 'Can delete payroll payload pay code', 177, 'delete_payrollpayloadpaycode'),
(705, 'Can delete payroll_model_Reimbursement', 96, 'delete_reimbursement'),
(706, 'Can delete payroll_model_SalaryAdvance', 97, 'delete_salaryadvance'),
(707, 'Can delete payroll_model_salarystructure', 98, 'delete_salarystructure'),
(708, 'Can change payroll_model_salarystructure', 98, 'change_salarystructure'),
(709, 'Can view payroll_model_salarystructure', 98, 'view_salarystructure'),
(710, 'Can add Payroll Report Permission', 1, 'add_payrollreportpermission'),
(711, 'Can change Payroll Report Permission', 1, 'change_payrollreportpermission'),
(712, 'Can delete Payroll Report Permission', 1, 'delete_payrollreportpermission'),
(713, 'Can view payrollreportpermission', 178, 'view_payrollreportpermission'),
(714, 'Can view emppayrollprofile', 89, 'view_emppayrollprofile'),
(715, 'Can view deductionformula', 90, 'view_deductionformula'),
(716, 'Can view exceptionformula', 91, 'view_exceptionformula'),
(717, 'Can view increasementformula', 92, 'view_increasementformula'),
(718, 'Can view leaveformula', 93, 'view_leaveformula'),
(719, 'Can view overtimeformula', 94, 'view_overtimeformula'),
(720, 'Can view emploan', 95, 'view_emploan'),
(721, 'Can AddEmpLoanAction emploan', 95, 'add_emp_loan_action_emploan'),
(722, 'Can view reimbursement', 96, 'view_reimbursement'),
(723, 'Can AddReimbursementAction reimbursement', 96, 'add_reimbursement_action_reimbursement'),
(724, 'Can view salaryadvance', 97, 'view_salaryadvance'),
(725, 'Can AddSalaryAdvanceAction salaryadvance', 97, 'add_salary_advance_action_salaryadvance'),
(726, 'Can AddSalaryStructureAction salarystructure', 98, 'add_salary_structure_action_salarystructure'),
(727, 'Can AddExtraIncreaseAction extraincrease', 99, 'add_extra_increase_action_extraincrease'),
(728, 'Can AddExtraDeductionAction extradeduction', 100, 'add_extra_deduction_action_extradeduction'),
(729, 'Can view payrollpayload', 176, 'view_payrollpayload'),
(730, 'Can view payrollpayloadpaycode', 177, 'view_payrollpayloadpaycode'),
(731, 'Can add acc_combination', 104, 'add_acccombination'),
(732, 'Can change acc_combination', 104, 'change_acccombination'),
(733, 'Can delete acc_combination', 104, 'delete_acccombination'),
(734, 'Can add acc_groups', 103, 'add_accgroups'),
(735, 'Can change acc_groups', 103, 'change_accgroups'),
(736, 'Can delete acc_groups', 103, 'delete_accgroups'),
(737, 'Can add acc_holiday', 102, 'add_accholiday'),
(738, 'Can change acc_holiday', 102, 'change_accholiday'),
(739, 'Can delete acc_holiday', 102, 'delete_accholiday'),
(740, 'Can add acc_privilege', 105, 'add_accprivilege'),
(741, 'Can change acc_privilege', 105, 'change_accprivilege'),
(742, 'Can delete acc_privilege', 105, 'delete_accprivilege'),
(743, 'Can change menu_access_terminal', 106, 'change_accterminal'),
(744, 'Can view menu_access_terminal', 106, 'view_accterminal'),
(745, 'Can add acc_timezone', 101, 'add_acctimezone'),
(746, 'Can change acc_timezone', 101, 'change_acctimezone'),
(747, 'Can delete acc_timezone', 101, 'delete_acctimezone'),
(748, 'Can view acctimezone', 101, 'view_acctimezone');
INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(749, 'Can CloneToArea acctimezone', 101, 'clone_to_area_acctimezone'),
(750, 'Can view accholiday', 102, 'view_accholiday'),
(751, 'Can CloneToArea accholiday', 102, 'clone_to_area_accholiday'),
(752, 'Can view accgroups', 103, 'view_accgroups'),
(753, 'Can CloneToArea accgroups', 103, 'clone_to_area_accgroups'),
(754, 'Can SetEmployeeGroup accgroups', 103, 'set_employee_group_accgroups'),
(755, 'Can view acccombination', 104, 'view_acccombination'),
(756, 'Can CloneToArea acccombination', 104, 'clone_to_area_acccombination'),
(757, 'Can view accprivilege', 105, 'view_accprivilege'),
(758, 'Can AdjustEmployeePrivilege accprivilege', 105, 'adjust_employee_privilege_accprivilege'),
(759, 'Can OpenDoor accterminal', 106, 'open_door_accterminal'),
(760, 'Can CancelAlarm accterminal', 106, 'cancel_alarm_accterminal'),
(761, 'Can SetParameter accterminal', 106, 'set_parameter_accterminal'),
(762, 'Can add visitor.field.reason', 109, 'add_reason'),
(763, 'Can change visitor.field.reason', 109, 'change_reason'),
(764, 'Can delete visitor.field.reason', 109, 'delete_reason'),
(765, 'Can add menu.visitor.reservation', 108, 'add_reservation'),
(766, 'Can change menu.visitor.reservation', 108, 'change_reservation'),
(767, 'Can delete menu.visitor.reservation', 108, 'delete_reservation'),
(768, 'Can add menu.visitor', 107, 'add_visitor'),
(769, 'Can change menu.visitor', 107, 'change_visitor'),
(770, 'Can delete menu.visitor', 107, 'delete_visitor'),
(771, 'Can add visitor.model.configuration', 111, 'add_visitorconfig'),
(772, 'Can change visitor.model.configuration', 111, 'change_visitorconfig'),
(773, 'Can delete visitor.model.configuration', 111, 'delete_visitorconfig'),
(774, 'Can delete model.visitor.log', 110, 'delete_visitorlog'),
(775, 'Can view model.visitor.log', 110, 'view_visitorlog'),
(776, 'Can view visitor.model.VisitorBioData', 113, 'view_visitorbiodata'),
(777, 'Can delete visitor.model.VisitorBioPhoto', 112, 'delete_visitorbiophoto'),
(778, 'Can view visitor.model.VisitorBioPhoto', 112, 'view_visitorbiophoto'),
(779, 'Can add visitor.models.visitorTransaction', 114, 'add_visitortransaction'),
(780, 'Can change visitor.models.visitorTransaction', 114, 'change_visitortransaction'),
(781, 'Can delete visitor.models.visitorTransaction', 114, 'delete_visitortransaction'),
(782, 'Can view reason', 109, 'view_reason'),
(783, 'Can view visitor', 107, 'view_visitor'),
(784, 'Can ExitRegistration visitor', 107, 'exit_registration_visitor'),
(785, 'Can view reservation', 108, 'view_reservation'),
(786, 'Can AddReservation reservation', 108, 'add_reservation_reservation'),
(787, 'Can Approve reservation', 108, 'approve_reservation'),
(788, 'Can Reject reservation', 108, 'reject_reservation'),
(789, 'Can Revoke reservation', 108, 'revoke_reservation'),
(790, 'Can ReservationQRCode reservation', 108, 'reservation_q_r_code_reservation'),
(791, 'Can EnableVisitor visitorlog', 110, 'enable_visitor_visitorlog'),
(792, 'Can DisableVisitor visitorlog', 110, 'disable_visitor_visitorlog'),
(793, 'Can view visitorconfig', 111, 'view_visitorconfig'),
(794, 'Can VisitorBioPhotoApprove visitorbiophoto', 112, 'visitor_bio_photo_approve_visitorbiophoto'),
(795, 'Can view visitortransaction', 114, 'view_visitortransaction'),
(796, 'Can add meeting.models.meetingEntity', 117, 'add_meetingentity'),
(797, 'Can change meeting.models.meetingEntity', 117, 'change_meetingentity'),
(798, 'Can delete meeting.models.meetingEntity', 117, 'delete_meetingentity'),
(799, 'Can delete meeting.models.manualLog', 118, 'delete_meetingmanuallog'),
(800, 'Can change meeting.models.manualLog', 118, 'change_meetingmanuallog'),
(801, 'Can view meeting.models.manualLog', 118, 'view_meetingmanuallog'),
(802, 'Can add meeting.models.meetingPayloadBase', 179, 'add_meetingpayloadbase'),
(803, 'Can change meeting.models.meetingPayloadBase', 179, 'change_meetingpayloadbase'),
(804, 'Can delete meeting.models.meetingPayloadBase', 179, 'delete_meetingpayloadbase'),
(805, 'Can delete meeting.models.meetingRoom', 115, 'delete_meetingroom'),
(806, 'Can change meeting.models.meetingRoom', 115, 'change_meetingroom'),
(807, 'Can view meeting.models.meetingRoom', 115, 'view_meetingroom'),
(808, 'Can add meeting.models.device', 116, 'add_meetingroomdevice'),
(809, 'Can change meeting.models.device', 116, 'change_meetingroomdevice'),
(810, 'Can delete meeting.models.device', 116, 'delete_meetingroomdevice'),
(811, 'Can view meeting.models.transaction', 119, 'view_meetingtransaction'),
(812, 'Can add Meeting Report Permission', 1, 'add_meetingreportpermission'),
(813, 'Can change Meeting Report Permission', 1, 'change_meetingreportpermission'),
(814, 'Can delete Meeting Report Permission', 1, 'delete_meetingreportpermission'),
(815, 'Can view meetingreportpermission', 180, 'view_meetingreportpermission'),
(816, 'Can AddMeetingRoom meetingroom', 115, 'add_meeting_room_meetingroom'),
(817, 'Can view meetingroomdevice', 116, 'view_meetingroomdevice'),
(818, 'Can view meetingentity', 117, 'view_meetingentity'),
(819, 'Can MeetingCalculation meetingentity', 117, 'meeting_calculation_meetingentity'),
(820, 'Can Approve meetingentity', 117, 'approve_meetingentity'),
(821, 'Can Revoke meetingentity', 117, 'revoke_meetingentity'),
(822, 'Can Reject meetingentity', 117, 'reject_meetingentity'),
(823, 'Can AddMeetingAttender meetingentity', 117, 'add_meeting_attender_meetingentity'),
(824, 'Can SyncMeeting2Device meetingentity', 117, 'sync_meeting2_device_meetingentity'),
(825, 'Can AddMeetingManualLog meetingmanuallog', 118, 'add_meeting_manual_log_meetingmanuallog'),
(826, 'Can Approve meetingmanuallog', 118, 'approve_meetingmanuallog'),
(827, 'Can Reject meetingmanuallog', 118, 'reject_meetingmanuallog'),
(828, 'Can Revoke meetingmanuallog', 118, 'revoke_meetingmanuallog'),
(829, 'Can view meetingpayloadbase', 179, 'view_meetingpayloadbase'),
(830, 'Can add ep.models.epSetup', 120, 'add_epsetup'),
(831, 'Can change ep.models.epSetup', 120, 'change_epsetup'),
(832, 'Can delete ep.models.epSetup', 120, 'delete_epsetup'),
(833, 'Can add ep.models.epTransaction', 121, 'add_eptransaction'),
(834, 'Can change ep.models.epTransaction', 121, 'change_eptransaction'),
(835, 'Can delete ep.models.epTransaction', 121, 'delete_eptransaction'),
(836, 'Can add Ep Dashboard Permission', 1, 'add_epdashboardpermission'),
(837, 'Can change Ep Dashboard Permission', 1, 'change_epdashboardpermission'),
(838, 'Can delete Ep Dashboard Permission', 1, 'delete_epdashboardpermission'),
(839, 'Can add Report Permission', 1, 'add_epreportpermission'),
(840, 'Can change Report Permission', 1, 'change_epreportpermission'),
(841, 'Can delete Report Permission', 1, 'delete_epreportpermission'),
(842, 'Can view epdashboardpermission', 181, 'view_epdashboardpermission'),
(843, 'Can view epreportpermission', 182, 'view_epreportpermission'),
(844, 'Can view epsetup', 120, 'view_epsetup'),
(845, 'Can view eptransaction', 121, 'view_eptransaction');

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
(1, 'arjaydiangzon', 'pbkdf2_sha256$36000$Wo3y2FuK0kmB$5kdPfjNxofVqqhqdk+8IJIiqjlIKFPW0PcK+8NzGE+M=', '2021-11-09 13:40:32.540421', '', '', NULL, 'bcgiarjay@gmail.com', NULL, 0, 0, 0, 6, 1, 1, 1, 0, 0, 0, '2021-11-09 13:40:32.540421', '2021-11-10 07:50:31.547642', NULL, NULL, 'user/default.gif');

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
(1, 'Login', '[1]', 'arjaydiangzon', 0, '', '127.0.0.1', 0, '2021-11-09 13:40:51.434870', 11, 1),
(2, 'Modify', '[1]', 'BOCK191760589', 0, 'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '127.0.0.1', 0, '2021-11-09 13:41:32.749557', 29, 1),
(3, 'Modify', '[1]', 'BOCK191760589', 0, 'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '127.0.0.1', 0, '2021-11-09 13:44:16.459437', 29, 1),
(4, 'Modify', '[1]', 'BOCK191760589', 0, 'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '127.0.0.1', 0, '2021-11-09 13:44:22.177793', 29, 1),
(5, 'Modify', '[1]', 'BOCK191760589', 0, 'Device Name(Auto add->BLACKCODERS),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '127.0.0.1', 0, '2021-11-09 13:45:13.192428', 29, 1),
(6, 'Logout', '[1]', 'arjaydiangzon', 0, '', '127.0.0.1', 0, '2021-11-09 13:48:49.460495', 11, 1),
(7, 'Login', '[1]', 'arjaydiangzon', 0, '', '127.0.0.1', 0, '2021-11-09 13:49:49.292493', 11, 1),
(8, 'Modify', '[1]', 'BOCK191760589', 0, 'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '127.0.0.1', 0, '2021-11-09 13:50:06.420559', 29, 1),
(9, 'Modify', '[1]', 'BOCK191760589', 0, 'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '127.0.0.1', 0, '2021-11-09 13:50:14.156200', 29, 1),
(10, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-11-09 13:52:16.844781', 11, 1),
(11, 'Modify', '[1]', 'BOCK191760589', 0, 'Time Zone(8->8),Attendance Device(1->0),Transfer Mode(1->1)', '192.168.50.250', 0, '2021-11-09 13:52:36.998150', 29, 1),
(12, 'Modify', '[1]', 'BOCK191760589', 0, 'Time Zone(8->8),Attendance Device(0->1),Transfer Mode(1->1)', '192.168.50.250', 0, '2021-11-09 13:52:48.160063', 29, 1),
(13, 'Delete', '', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-11-09 13:53:17.519601', 29, 1),
(14, 'Modify', '[2]', 'BOCK191760589', 0, 'Device Name(Auto add->BLACKCODERS),Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '192.168.50.250', 0, '2021-11-09 13:54:19.828584', 29, 1),
(15, 'Reboot', '[2]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-11-09 13:54:46.758587', 29, 1),
(16, 'Delete', '', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-11-09 13:58:34.755172', 29, 1),
(17, 'Modify', '[3]', 'BOCK191760589', 0, 'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '192.168.50.250', 0, '2021-11-09 13:58:48.337190', 29, 1),
(18, 'Clear Pending Command', '[3]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-11-09 13:59:15.040433', 29, 1),
(19, 'Read Information', '[3]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-11-09 13:59:36.438425', 29, 1),
(20, 'Add', '[5]', 'test', 0, 'Area Name=test', '192.168.50.250', 0, '2021-11-09 13:59:55.626125', 42, 1),
(21, 'Modify', '[3]', 'BOCK191760589', 0, 'Area(2->test),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '192.168.50.250', 0, '2021-11-09 14:00:02.541810', 29, 1),
(22, 'Delete', '', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-11-09 14:00:48.082056', 29, 1),
(23, 'Delete', '', 'test', 0, '', '192.168.50.250', 0, '2021-11-09 14:00:54.076439', 42, 1),
(24, 'Add', '[4]', 'BOCK191760589', 0, 'Device IP=192.168.50.204,Serial Number=BOCK191760589,Device Name=BCGI,Area=Pasig City', '192.168.50.250', 0, '2021-11-09 14:01:33.890604', 29, 1),
(25, 'Reboot', '[4]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-11-09 14:01:56.788195', 29, 1),
(26, 'Reboot', '[4]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-11-09 14:02:33.283470', 29, 1),
(27, 'Logout', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-11-09 14:02:49.515454', 11, 1),
(28, 'Login', '[1]', 'arjaydiangzon', 0, '', '192.168.50.250', 0, '2021-11-09 14:04:58.580592', 11, 1),
(29, 'Modify', '[4]', 'BOCK191760589', 0, 'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '192.168.50.250', 0, '2021-11-09 14:06:09.850436', 29, 1),
(30, 'Modify', '[2]', 'Pasig City', 0, '', '192.168.50.250', 0, '2021-11-09 14:06:28.810888', 42, 1),
(31, 'Modify', '[4]', 'BOCK191760589', 0, 'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '192.168.50.250', 0, '2021-11-09 14:06:42.301083', 29, 1),
(32, 'Modify', '[4]', 'BOCK191760589', 0, 'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '192.168.50.250', 0, '2021-11-09 14:06:48.735998', 29, 1),
(33, 'Clear Pending Command', '[4]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-11-09 14:07:41.293212', 29, 1),
(34, 'Modify', '[4]', 'BOCK191760589', 0, 'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '192.168.50.250', 0, '2021-11-09 14:08:52.769997', 29, 1),
(35, 'Modify', '[4]', 'BOCK191760589', 0, 'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '192.168.50.250', 0, '2021-11-09 14:08:57.432573', 29, 1),
(36, 'Delete', '', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-11-09 14:09:00.104193', 29, 1),
(37, 'Add', '[5]', 'BOCK191760589', 0, 'Device IP=192.168.50.204,Serial Number=BOCK191760589,Device Name=BCGI,Area=Pasig City', '192.168.50.250', 0, '2021-11-09 14:09:23.786445', 29, 1),
(38, 'Modify', '[5]', 'BOCK191760589', 0, 'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '192.168.50.250', 0, '2021-11-09 14:09:29.547924', 29, 1),
(39, 'Delete', '', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-11-09 14:09:33.060337', 29, 1),
(40, 'Delete', '', 'Pasig City', 0, '', '192.168.50.250', 0, '2021-11-09 14:13:35.930371', 42, 1),
(41, 'Add', '[2]', 'Pasig City', 0, 'Area Name=Pasig City', '192.168.50.250', 0, '2021-11-09 14:14:12.978459', 42, 1),
(42, 'Add', '[6]', 'BOCK191760589', 0, 'Device IP=192.168.50.204,Serial Number=BOCK191760589,Device Name=BCGI,Area=Pasig City', '192.168.50.250', 0, '2021-11-09 14:15:10.617346', 29, 1),
(43, 'Modify', '[6]', 'BOCK191760589', 0, 'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '192.168.50.250', 0, '2021-11-09 14:15:18.010295', 29, 1),
(44, 'Modify', '[6]', 'BOCK191760589', 0, 'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '192.168.50.250', 0, '2021-11-09 14:15:23.287271', 29, 1),
(45, 'Modify', '[2]', 'Pasig City', 0, '', '192.168.50.250', 0, '2021-11-09 14:15:31.180423', 42, 1),
(46, 'Modify', '[6]', 'BOCK191760589', 0, 'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '192.168.50.250', 0, '2021-11-09 14:16:11.460418', 29, 1),
(47, 'Modify', '[6]', 'BOCK191760589', 0, 'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '192.168.50.250', 0, '2021-11-09 14:16:16.242468', 29, 1),
(48, 'Delete', '', 'Pasig City', 0, '', '192.168.50.250', 0, '2021-11-09 14:17:19.178192', 42, 1),
(49, 'Add', '[2]', 'Pasig City', 0, 'Area Name=Pasig City', '192.168.50.250', 0, '2021-11-09 14:17:38.381154', 42, 1),
(50, 'Personnel Transfer', '[1]', 'Not Authorized', 0, 'employee=[\'1\', \'10\', \'2\', \'11\', \'12\', \'13\', \'14\', \'15\', \'16\', \'17\', \'18\', \'19\', \'3\', \'20\', \'4\', \'5\', \'6\', \'7\', \'8\', \'9\']', '192.168.50.250', 0, '2021-11-09 14:17:55.040196', 42, 1),
(51, 'Personnel Transfer', '[1]', 'Not Authorized', 0, 'employee=[\'1\', \'10\', \'2\', \'11\', \'12\', \'13\', \'14\', \'15\', \'16\', \'17\', \'18\', \'19\', \'3\', \'20\', \'4\', \'5\', \'6\', \'7\', \'8\', \'9\']', '192.168.50.250', 0, '2021-11-09 14:18:20.983943', 42, 1),
(52, 'Modify', '[6]', 'BOCK191760589', 0, 'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '192.168.50.250', 0, '2021-11-09 14:18:58.123585', 29, 1),
(53, 'Clear Pending Command', '[6]', 'BOCK191760589', 0, '', '192.168.50.250', 0, '2021-11-09 14:19:11.427531', 29, 1),
(54, 'Sync Data to the Device', '[6]', 'BOCK191760589', 0, 'Employee=TruePhoto=FalseFingerprint=FalseFace=FalsePalm=FalseFinger Vein=FalseBio-Photo=False', '192.168.50.250', 0, '2021-11-09 14:22:20.214916', 29, 1),
(55, 'Resynchronize to device', '[1, 10, 2, 11, 12, 13, 14, 15, 16, 17, 18, 19, 3, 20, 4, 5, 6, 7, 8, 9]', '1 Juan,19 Lawrence,2 RJ,20 Joseph,21 Ayesha,22 Jelo,23 Yow Lee,24 Arjay,25 Charles,26 Mark,27 Joseph,28 Wilson,3 Wilson,30 Test,4 Charles,5 Mark,6 Francis,7 Renna,8 Matthew,9 Errol', 0, '', '192.168.50.250', 0, '2021-11-09 14:38:21.594800', 45, 1),
(56, 'Login', '[1]', 'arjaydiangzon', 0, '', '::1', 0, '2021-11-10 07:21:03.917939', 11, 1),
(57, 'Login', '[1]', 'arjaydiangzon', 0, '', '::1', 0, '2021-11-10 07:50:31.591256', 11, 1),
(58, 'Modify', '[6]', 'BOCK191760589', 0, 'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', '::1', 0, '2021-11-10 07:51:16.624854', 29, 1);

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
  `params` longtext DEFAULT NULL,
  `enable` tinyint(1) NOT NULL,
  `process_time` datetime(6) DEFAULT NULL
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
  `params` longtext DEFAULT NULL,
  `enable` tinyint(1) NOT NULL,
  `process_time` datetime(6) DEFAULT NULL
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
(1, '2021-11-09 13:25:31.014798', NULL, '2021-11-09 13:25:31.014798', NULL, 0, 11, 0, 1, 1, NULL, '', 0),
(2, '2021-11-09 13:25:31.030780', NULL, '2021-11-09 13:25:31.030780', NULL, 0, 11, 0, 2, 1, NULL, '', 0),
(3, '2021-11-09 13:25:31.077796', NULL, '2021-11-09 13:25:31.077796', NULL, 0, 11, 0, 3, 1, NULL, '', 0),
(4, '2021-11-09 13:25:31.278107', NULL, '2021-11-09 13:25:31.278107', NULL, 0, 11, 0, 7, 1, NULL, '', 0),
(5, '2021-11-09 13:25:31.331871', NULL, '2021-11-09 13:25:31.331871', NULL, 0, 12, 121, 4, 1, NULL, '', 0),
(6, '2021-11-09 13:25:31.400366', NULL, '2021-11-09 13:25:31.400366', NULL, 0, 12, 121, 5, 1, NULL, '', 0),
(7, '2021-11-09 13:25:31.447537', NULL, '2021-11-09 13:25:31.447537', NULL, 0, 12, 121, 6, 1, NULL, '', 0),
(8, '2021-11-09 13:25:31.663852', NULL, '2021-11-09 13:25:31.663852', NULL, 0, 12, 122, 4, 1, NULL, '', 0),
(9, '2021-11-09 13:25:31.732882', NULL, '2021-11-09 13:25:31.732882', NULL, 0, 12, 122, 5, 1, NULL, '', 0),
(10, '2021-11-09 13:25:31.748513', NULL, '2021-11-09 13:25:31.748513', NULL, 0, 12, 122, 6, 1, NULL, '', 0),
(11, '2021-11-09 13:25:31.779772', NULL, '2021-11-09 13:25:31.779772', NULL, 0, 12, 123, 4, 1, NULL, '', 0),
(12, '2021-11-09 13:25:31.801913', NULL, '2021-11-09 13:25:31.801913', NULL, 0, 12, 123, 5, 1, NULL, '', 0),
(13, '2021-11-09 13:25:31.864435', NULL, '2021-11-09 13:25:31.864435', NULL, 0, 12, 123, 6, 1, NULL, '', 0),
(14, '2021-11-09 13:25:31.880062', NULL, '2021-11-09 13:25:31.880062', NULL, 0, 12, 124, 4, 1, NULL, '', 0),
(15, '2021-11-09 13:25:31.917829', NULL, '2021-11-09 13:25:31.917829', NULL, 0, 12, 124, 5, 1, NULL, '', 0),
(16, '2021-11-09 13:25:31.933461', NULL, '2021-11-09 13:25:31.933461', NULL, 0, 12, 124, 6, 1, NULL, '', 0),
(17, '2021-11-09 13:25:31.965083', NULL, '2021-11-09 13:25:31.965083', NULL, 0, 12, 125, 4, 1, NULL, '', 0),
(18, '2021-11-09 13:25:32.018720', NULL, '2021-11-09 13:25:32.018720', NULL, 0, 12, 125, 5, 1, NULL, '', 0),
(19, '2021-11-09 13:25:32.049618', NULL, '2021-11-09 13:25:32.049618', NULL, 0, 12, 125, 6, 1, NULL, '', 0),
(20, '2021-11-09 13:25:32.065247', NULL, '2021-11-09 13:25:32.065247', NULL, 0, 13, 1310, 4, 1, NULL, '', 0),
(21, '2021-11-09 13:25:32.096864', NULL, '2021-11-09 13:25:32.096864', NULL, 0, 13, 1310, 5, 1, NULL, '', 0),
(22, '2021-11-09 13:25:32.150131', NULL, '2021-11-09 13:25:32.150131', NULL, 0, 13, 1310, 6, 1, NULL, '', 0),
(23, '2021-11-09 13:25:32.165917', NULL, '2021-11-09 13:25:32.165917', NULL, 0, 13, 1311, 4, 1, NULL, '', 0),
(24, '2021-11-09 13:25:32.335111', NULL, '2021-11-09 13:25:32.335111', NULL, 0, 13, 1311, 5, 1, NULL, '', 0),
(25, '2021-11-09 13:25:32.366368', NULL, '2021-11-09 13:25:32.366368', NULL, 0, 13, 1311, 6, 1, NULL, '', 0),
(26, '2021-11-09 13:25:32.397617', NULL, '2021-11-09 13:25:32.397617', NULL, 0, 14, 149, 4, 1, NULL, '', 0),
(27, '2021-11-09 13:25:32.419283', NULL, '2021-11-09 13:25:32.419283', NULL, 0, 14, 149, 5, 1, NULL, '', 0),
(28, '2021-11-09 13:25:32.450893', NULL, '2021-11-09 13:25:32.450893', NULL, 0, 14, 149, 6, 1, NULL, '', 0),
(29, '2021-11-09 13:25:32.497773', NULL, '2021-11-09 13:25:32.497773', NULL, 0, 21, 0, 1, 2, NULL, '', 0),
(30, '2021-11-09 13:25:32.535537', NULL, '2021-11-09 13:25:32.535537', NULL, 0, 21, 0, 2, 2, NULL, '', 0),
(31, '2021-11-09 13:25:32.566672', NULL, '2021-11-09 13:25:32.566672', NULL, 0, 21, 0, 3, 2, NULL, '', 0),
(32, '2021-11-09 13:25:32.582294', NULL, '2021-11-09 13:25:32.582294', NULL, 0, 21, 0, 7, 2, NULL, '', 0),
(33, '2021-11-09 13:25:32.604296', NULL, '2021-11-09 13:25:32.604296', NULL, 0, 32, 321, 4, 3, NULL, '', 0),
(34, '2021-11-09 13:25:32.635576', NULL, '2021-11-09 13:25:32.635576', NULL, 0, 32, 321, 5, 3, NULL, '', 0),
(35, '2021-11-09 13:25:32.667184', NULL, '2021-11-09 13:25:32.667184', NULL, 0, 32, 321, 6, 3, NULL, '', 0),
(36, '2021-11-09 13:25:32.883242', NULL, '2021-11-09 13:25:32.883242', NULL, 0, 32, 322, 4, 3, NULL, '', 0),
(37, '2021-11-09 13:25:32.905383', NULL, '2021-11-09 13:25:32.905383', NULL, 0, 32, 322, 5, 3, NULL, '', 0),
(38, '2021-11-09 13:25:32.936642', NULL, '2021-11-09 13:25:32.936642', NULL, 0, 32, 322, 6, 3, NULL, '', 0),
(39, '2021-11-09 13:25:33.005987', NULL, '2021-11-09 13:25:33.005987', NULL, 0, 32, 323, 4, 3, NULL, '', 0),
(40, '2021-11-09 13:25:33.021998', NULL, '2021-11-09 13:25:33.021998', NULL, 0, 32, 323, 5, 3, NULL, '', 0),
(41, '2021-11-09 13:25:33.037251', NULL, '2021-11-09 13:25:33.037251', NULL, 0, 32, 323, 6, 3, NULL, '', 0),
(42, '2021-11-09 13:25:33.068511', NULL, '2021-11-09 13:25:33.068511', NULL, 0, 32, 324, 4, 3, NULL, '', 0),
(43, '2021-11-09 13:25:33.100139', NULL, '2021-11-09 13:25:33.100139', NULL, 0, 32, 324, 5, 3, NULL, '', 0),
(44, '2021-11-09 13:25:33.122156', NULL, '2021-11-09 13:25:33.122156', NULL, 0, 32, 324, 6, 3, NULL, '', 0),
(45, '2021-11-09 13:25:33.184753', NULL, '2021-11-09 13:25:33.184753', NULL, 0, 32, 325, 4, 3, NULL, '', 0),
(46, '2021-11-09 13:25:33.206457', NULL, '2021-11-09 13:25:33.206457', NULL, 0, 32, 325, 5, 3, NULL, '', 0),
(47, '2021-11-09 13:25:33.237716', NULL, '2021-11-09 13:25:33.237716', NULL, 0, 32, 325, 6, 3, NULL, '', 0),
(48, '2021-11-09 13:25:33.470471', NULL, '2021-11-09 13:25:33.470471', NULL, 0, 33, 3310, 4, 3, NULL, '', 0),
(49, '2021-11-09 13:25:33.508247', NULL, '2021-11-09 13:25:33.508247', NULL, 0, 33, 3310, 5, 3, NULL, '', 0),
(50, '2021-11-09 13:25:33.539876', NULL, '2021-11-09 13:25:33.539876', NULL, 0, 33, 3310, 6, 3, NULL, '', 0),
(51, '2021-11-09 13:25:33.555504', NULL, '2021-11-09 13:25:33.555504', NULL, 0, 33, 3311, 4, 3, NULL, '', 0),
(52, '2021-11-09 13:25:33.586761', NULL, '2021-11-09 13:25:33.586761', NULL, 0, 33, 3311, 5, 3, NULL, '', 0),
(53, '2021-11-09 13:25:33.608776', NULL, '2021-11-09 13:25:33.608776', NULL, 0, 33, 3311, 6, 3, NULL, '', 0),
(54, '2021-11-09 13:25:33.640395', NULL, '2021-11-09 13:25:33.640395', NULL, 0, 34, 349, 4, 3, NULL, '', 0),
(55, '2021-11-09 13:25:33.655669', NULL, '2021-11-09 13:25:33.655669', NULL, 0, 34, 349, 5, 3, NULL, '', 0),
(56, '2021-11-09 13:25:33.687290', NULL, '2021-11-09 13:25:33.687290', NULL, 0, 34, 349, 6, 3, NULL, '', 0),
(57, '2021-11-09 13:25:33.709067', NULL, '2021-11-09 13:25:33.709067', NULL, 0, 42, 421, 4, 4, NULL, '', 0),
(58, '2021-11-09 13:25:33.740325', NULL, '2021-11-09 13:25:33.740325', NULL, 0, 42, 421, 5, 4, NULL, '', 0),
(59, '2021-11-09 13:25:33.771585', NULL, '2021-11-09 13:25:33.771585', NULL, 0, 42, 421, 6, 4, NULL, '', 0),
(60, '2021-11-09 13:25:33.802848', NULL, '2021-11-09 13:25:33.802848', NULL, 0, 42, 422, 4, 4, NULL, '', 0),
(61, '2021-11-09 13:25:33.825351', NULL, '2021-11-09 13:25:33.825351', NULL, 0, 42, 422, 5, 4, NULL, '', 0),
(62, '2021-11-09 13:25:34.073280', NULL, '2021-11-09 13:25:34.073280', NULL, 0, 42, 422, 6, 4, NULL, '', 0),
(63, '2021-11-09 13:25:34.088913', NULL, '2021-11-09 13:25:34.088913', NULL, 0, 42, 423, 4, 4, NULL, '', 0),
(64, '2021-11-09 13:25:34.154926', NULL, '2021-11-09 13:25:34.154926', NULL, 0, 42, 423, 5, 4, NULL, '', 0),
(65, '2021-11-09 13:25:34.176662', NULL, '2021-11-09 13:25:34.176662', NULL, 0, 42, 423, 6, 4, NULL, '', 0),
(66, '2021-11-09 13:25:34.210960', NULL, '2021-11-09 13:25:34.210960', NULL, 0, 42, 424, 4, 4, NULL, '', 0),
(67, '2021-11-09 13:25:34.226589', NULL, '2021-11-09 13:25:34.226589', NULL, 0, 42, 424, 5, 4, NULL, '', 0),
(68, '2021-11-09 13:25:34.257848', NULL, '2021-11-09 13:25:34.257848', NULL, 0, 42, 424, 6, 4, NULL, '', 0),
(69, '2021-11-09 13:25:34.311115', NULL, '2021-11-09 13:25:34.311115', NULL, 0, 42, 425, 4, 4, NULL, '', 0),
(70, '2021-11-09 13:25:34.458889', NULL, '2021-11-09 13:25:34.458889', NULL, 0, 42, 425, 5, 4, NULL, '', 0),
(71, '2021-11-09 13:25:34.490151', NULL, '2021-11-09 13:25:34.490151', NULL, 0, 42, 425, 6, 4, NULL, '', 0),
(72, '2021-11-09 13:25:34.512255', NULL, '2021-11-09 13:25:34.512255', NULL, 0, 43, 4310, 4, 4, NULL, '', 0),
(73, '2021-11-09 13:25:34.574778', NULL, '2021-11-09 13:25:34.574778', NULL, 0, 43, 4310, 5, 4, NULL, '', 0),
(74, '2021-11-09 13:25:34.590775', NULL, '2021-11-09 13:25:34.590775', NULL, 0, 43, 4310, 6, 4, NULL, '', 0),
(75, '2021-11-09 13:25:34.628423', NULL, '2021-11-09 13:25:34.628423', NULL, 0, 43, 4311, 4, 4, NULL, '', 0),
(76, '2021-11-09 13:25:34.644411', NULL, '2021-11-09 13:25:34.644411', NULL, 0, 43, 4311, 5, 4, NULL, '', 0),
(77, '2021-11-09 13:25:34.675672', NULL, '2021-11-09 13:25:34.675672', NULL, 0, 43, 4311, 6, 4, NULL, '', 0),
(78, '2021-11-09 13:25:34.690961', NULL, '2021-11-09 13:25:34.690961', NULL, 0, 44, 449, 4, 4, NULL, '', 0),
(79, '2021-11-09 13:25:34.713082', NULL, '2021-11-09 13:25:34.713082', NULL, 0, 44, 449, 5, 4, NULL, '', 0),
(80, '2021-11-09 13:25:34.744343', NULL, '2021-11-09 13:25:34.744343', NULL, 0, 44, 449, 6, 4, NULL, '', 0),
(81, '2021-11-09 13:25:34.775601', NULL, '2021-11-09 13:25:34.775601', NULL, 0, 0, 0, 101, 5, NULL, '', 0),
(82, '2021-11-09 13:25:34.791232', NULL, '2021-11-09 13:25:34.791232', NULL, 0, 0, 0, 102, 5, NULL, '', 0);

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
  `app_alert` tinyint(1) NOT NULL,
  `sms_alert` tinyint(1) NOT NULL,
  `whatapp_alert` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `base_eventalertsetting`
--

INSERT INTO `base_eventalertsetting` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `event_id`, `event`, `module`, `sub_module`, `email_alert`, `app_alert`, `sms_alert`, `whatapp_alert`) VALUES
(1, '2021-11-09 13:25:34.875890', NULL, '2021-11-09 13:25:34.875890', NULL, 0, 1, 'menu_att_manualLog', 'menu_attendance', 'menu_group_approvalManagement', 1, 1, 0, 0),
(2, '2021-11-09 13:25:34.907148', NULL, '2021-11-09 13:25:34.907148', NULL, 0, 2, 'menu_att_leave', 'menu_attendance', 'menu_group_approvalManagement', 1, 1, 0, 0),
(3, '2021-11-09 13:25:34.991824', NULL, '2021-11-09 13:25:34.991824', NULL, 0, 3, 'menu_att_overtime', 'menu_attendance', 'menu_group_approvalManagement', 1, 1, 0, 0),
(4, '2021-11-09 13:25:35.261351', NULL, '2021-11-09 13:25:35.261351', NULL, 0, 4, 'menu_att_training', 'menu_attendance', 'menu_group_approvalManagement', 1, 1, 0, 0),
(5, '2021-11-09 13:25:35.292611', NULL, '2021-11-09 13:25:35.292611', NULL, 0, 5, 'menu_att_adjustSchedule', 'menu_attendance', 'menu_group_approvalManagement', 1, 1, 0, 0),
(6, '2021-11-09 13:25:35.377275', NULL, '2021-11-09 13:25:35.377275', NULL, 0, 6, 'payCode.default.lateIn', 'menu_attendance', 'menu_group_att_rule', 1, 1, 0, 0),
(7, '2021-11-09 13:25:35.593707', NULL, '2021-11-09 13:25:35.593707', NULL, 0, 7, 'payCode.default.earlyOut', 'menu_attendance', 'menu_group_att_rule', 1, 1, 0, 0),
(8, '2021-11-09 13:25:35.632062', NULL, '2021-11-09 13:25:35.632062', NULL, 0, 8, 'payCode.default.absence', 'menu_attendance', 'menu_group_att_rule', 1, 1, 0, 0),
(9, '2021-11-09 13:25:35.694586', NULL, '2021-11-09 13:25:35.694586', NULL, 0, 9, 'menu.visitor.registration', 'menu.visitor.registration.visitor', 'menu.visitor.reservation', 1, 0, 0, 0),
(10, '2021-11-09 13:25:35.716606', NULL, '2021-11-09 13:25:35.716606', NULL, 0, 10, 'meeting.menus.meeting', 'meeting.menus.meeting', 'meeting.menus.meeting', 1, 0, 0, 0),
(11, '2021-11-09 13:25:35.732598', NULL, '2021-11-09 13:25:35.732598', NULL, 0, 11, 'meeting.menus.manualLog', 'meeting.menus.meeting', 'meeting.menus.manualLog', 1, 0, 0, 0),
(12, '2021-11-09 13:25:35.765742', NULL, '2021-11-09 13:25:35.765742', NULL, 0, 12, 'menu_device_publicMessage', 'menu_group_device_deviceManagement', 'menu_mobile_announcement', 0, 1, 0, 0),
(13, '2021-11-09 13:25:35.817013', NULL, '2021-11-09 13:25:35.817013', NULL, 0, 13, 'menu_device_privateMessage', 'menu_group_device_deviceManagement', 'menu_mobile_announcement', 0, 1, 0, 0);

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
  `session_timeout` int(11) NOT NULL,
  `export_encryption` tinyint(1) NOT NULL,
  `export_encryption_password` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `base_securitypolicy`
--

INSERT INTO `base_securitypolicy` (`id`, `single_login`, `security_code`, `code_length`, `valid_duration`, `failed_locked`, `lock_failed_count`, `lock_duration`, `enforce_pwd_change`, `enforce_pwd_expiration`, `validity_period`, `password_level`, `is_default`, `app_single_user_login`, `session_timeout`, `export_encryption`, `export_encryption_password`) VALUES
(1, 0, 0, 5, 1, 0, 5, 60, 0, 0, 90, 2, 1, 0, 60, 0, NULL);

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
  `user_name` varchar(30) NOT NULL,
  `user_password` varchar(128) DEFAULT NULL,
  `user_key` longtext DEFAULT NULL,
  `is_sftp` smallint(6) NOT NULL
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
(22, 'installdate', '', '92ae-U4xNsCAYi1BCz6eTEeCtHAL_LlnMxefuWQH7JWd1Zg_BvMn'),
(23, 'sys_date', '', '92ae-U4xNsCAYi1BCz6eTEeCtHAL_LlnMxefuWQH7JWd1Zg_BvMn'),
(24, 'ADMSDBVersion', '', '544'),
(25, 'active_date', '', '95deCkyyRttRBdTf52u3UmfPQ-bJSN3mkJE9Cocv29gKLXAAsKcK');

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
(1, '2021-11-09 13:41:32.304651', '1', 'BOCK191760589', 2, 'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(2, '2021-11-09 13:44:16.420716', '1', 'BOCK191760589', 2, 'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(3, '2021-11-09 13:44:22.061598', '1', 'BOCK191760589', 2, 'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(4, '2021-11-09 13:45:13.153908', '1', 'BOCK191760589', 2, 'Device Name(Auto add->BLACKCODERS),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(5, '2021-11-09 13:50:06.394979', '1', 'BOCK191760589', 2, 'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(6, '2021-11-09 13:50:14.103058', '1', 'BOCK191760589', 2, 'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(7, '2021-11-09 13:52:36.977116', '1', 'BOCK191760589', 2, 'Time Zone(8->8),Attendance Device(1->0),Transfer Mode(1->1)', 29, 1),
(8, '2021-11-09 13:52:48.089853', '1', 'BOCK191760589', 2, 'Time Zone(8->8),Attendance Device(0->1),Transfer Mode(1->1)', 29, 1),
(9, '2021-11-09 13:54:19.804090', '2', 'BOCK191760589', 2, 'Device Name(Auto add->BLACKCODERS),Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(10, '2021-11-09 13:58:48.303171', '3', 'BOCK191760589', 2, 'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(11, '2021-11-09 13:59:55.626125', '5', 'test', 1, 'Area Name=test', 42, 1),
(12, '2021-11-09 14:00:02.524809', '3', 'BOCK191760589', 2, 'Area(2->test),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(13, '2021-11-09 14:01:33.887607', '4', 'BOCK191760589', 1, 'Device IP=192.168.50.204,Serial Number=BOCK191760589,Device Name=BCGI,Area=Pasig City', 29, 1),
(14, '2021-11-09 14:06:09.817725', '4', 'BOCK191760589', 2, 'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(15, '2021-11-09 14:06:28.781285', '2', 'Pasig City', 2, '', 42, 1),
(16, '2021-11-09 14:06:42.276081', '4', 'BOCK191760589', 2, 'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(17, '2021-11-09 14:06:48.704645', '4', 'BOCK191760589', 2, 'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(18, '2021-11-09 14:08:52.714315', '4', 'BOCK191760589', 2, 'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(19, '2021-11-09 14:08:57.385735', '4', 'BOCK191760589', 2, 'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(20, '2021-11-09 14:09:23.786445', '5', 'BOCK191760589', 1, 'Device IP=192.168.50.204,Serial Number=BOCK191760589,Device Name=BCGI,Area=Pasig City', 29, 1),
(21, '2021-11-09 14:09:29.463125', '5', 'BOCK191760589', 2, 'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(22, '2021-11-09 14:14:12.977452', '2', 'Pasig City', 1, 'Area Name=Pasig City', 42, 1),
(23, '2021-11-09 14:15:10.537326', '6', 'BOCK191760589', 1, 'Device IP=192.168.50.204,Serial Number=BOCK191760589,Device Name=BCGI,Area=Pasig City', 29, 1),
(24, '2021-11-09 14:15:17.980190', '6', 'BOCK191760589', 2, 'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(25, '2021-11-09 14:15:23.212270', '6', 'BOCK191760589', 2, 'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(26, '2021-11-09 14:15:31.143424', '2', 'Pasig City', 2, '', 42, 1),
(27, '2021-11-09 14:16:11.432871', '6', 'BOCK191760589', 2, 'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(28, '2021-11-09 14:16:16.196599', '6', 'BOCK191760589', 2, 'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(29, '2021-11-09 14:17:38.381154', '2', 'Pasig City', 1, 'Area Name=Pasig City', 42, 1),
(30, '2021-11-09 14:18:58.103745', '6', 'BOCK191760589', 2, 'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1),
(31, '2021-11-10 07:51:16.549079', '6', 'BOCK191760589', 2, 'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)', 29, 1);

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
(2, '30', '0', '*', '*', '*', 'Asia/Singapore'),
(3, '1', '0', '*', '*', '*', 'Asia/Singapore'),
(4, '5', '0', '*', '*', '*', 'Asia/Singapore'),
(5, '10', '0', '*', '*', '*', 'Asia/Singapore'),
(6, '20', '0', '*', '1', '1', 'Asia/Singapore'),
(7, '0', '2', '*', '*', '*', 'Asia/Singapore'),
(8, '30', '2', '*', '*', '*', 'Asia/Singapore'),
(9, '0', '0', '*', '*', '*', 'Asia/Singapore');

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
(2, 200, 'seconds'),
(3, 60, 'seconds');

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
(1, 'celery.backend_cleanup', 'celery.backend_cleanup', '[]', '{}', NULL, NULL, NULL, NULL, 1, NULL, 0, '2021-11-10 07:42:33.754813', '', 1, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(2, 'iclock.tasks.data_sync', 'iclock.tasks.data_sync', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-11-10 10:30:58.105901', 6656, '2021-11-10 10:30:58.105901', '', NULL, 1, NULL, 0, NULL, NULL, '{}', NULL),
(3, 'iclock.tasks.device_online_monitor', 'iclock.tasks.device_online_monitor', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-11-10 10:30:58.177461', 101, '2021-11-10 10:30:58.177461', '', NULL, 2, NULL, 0, NULL, NULL, '{}', NULL),
(4, 'mobile.task.upload_gps', 'mobile.task.upload_gps', '[]', '{}', NULL, NULL, NULL, NULL, 1, NULL, 0, '2021-11-10 07:42:34.441870', '', 2, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(5, 'psnl.tasks.employment_status_monitoring', 'psnl.tasks.employment_status_monitoring', '[]', '{}', NULL, NULL, NULL, NULL, 1, NULL, 0, '2021-11-10 07:42:34.635885', '', 3, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(6, 'psnl.tasks.resigned_scanner', 'psnl.tasks.resigned_scanner', '[]', '{}', NULL, NULL, NULL, NULL, 1, NULL, 0, '2021-11-10 07:42:34.729892', '', 4, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(7, 'psnl.tasks.document_expired_alert', 'psnl.tasks.document_expired_alert', '[]', '{}', NULL, NULL, NULL, NULL, 1, NULL, 0, '2021-11-10 07:42:34.854903', '', 5, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(8, 'meeting.tasks.meeting_monitor', 'meeting.tasks.meeting_monitor', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-11-10 10:30:58.206225', 336, '2021-11-10 10:30:58.206225', '', NULL, 3, NULL, 0, NULL, NULL, '{}', NULL),
(9, 'att.tasks.restore_leaveyearbalance_all', 'att.tasks.restore_leaveyearbalance_all', '[]', '{}', NULL, NULL, NULL, NULL, 1, NULL, 0, '2021-11-10 07:42:35.421740', '', 6, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(10, 'base.tasks.daily_licence_verify', 'base.tasks.daily_licence_verify', '[]', '{}', NULL, NULL, NULL, NULL, 1, NULL, 0, '2021-11-10 07:42:35.546776', '', 7, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(11, 'base.tasks.daily_aof_rewrite', 'base.tasks.daily_aof_rewrite', '[]', '{}', NULL, NULL, NULL, NULL, 1, NULL, 0, '2021-11-10 07:42:35.717857', '', 8, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(12, 'beat_tasks.run_minute_task', 'beat_tasks.run_minute_task', '[]', '{}', NULL, NULL, NULL, NULL, 1, '2021-11-10 10:30:58.057474', 336, '2021-11-10 10:30:58.057474', '', NULL, 3, NULL, 0, NULL, NULL, '{}', NULL),
(13, 'iclock.tasks.data_clean', 'iclock.tasks.data_clean', '[]', '{}', NULL, NULL, NULL, NULL, 1, NULL, 0, '2021-11-10 07:42:36.343280', '', 9, NULL, NULL, 0, NULL, NULL, '{}', NULL),
(14, 'iclock.tasks.zip_clean', 'iclock.tasks.zip_clean', '[]', '{}', NULL, NULL, NULL, NULL, 1, NULL, 0, '2021-11-10 07:42:36.613778', '', 9, NULL, NULL, 0, NULL, NULL, '{}', NULL);

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
(1, '2021-11-10 07:42:36.557230');

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
(104, 'acc', 'acccombination'),
(103, 'acc', 'accgroups'),
(102, 'acc', 'accholiday'),
(105, 'acc', 'accprivilege'),
(106, 'acc', 'accterminal'),
(101, 'acc', 'acctimezone'),
(173, 'accounts', 'adminbiodata'),
(11, 'accounts', 'myuser'),
(25, 'accounts', 'usernotification'),
(174, 'accounts', 'userprofile'),
(123, 'admin', 'logentry'),
(154, 'att', 'attcalclog'),
(55, 'att', 'attcode'),
(155, 'att', 'attemployee'),
(56, 'att', 'attgroup'),
(57, 'att', 'attpolicy'),
(77, 'att', 'attreportsetting'),
(60, 'att', 'attrule'),
(65, 'att', 'attschedule'),
(171, 'att', 'attsettingpermission'),
(64, 'att', 'attshift'),
(6, 'att', 'att_setting_permission'),
(73, 'att', 'breaktime'),
(74, 'att', 'changeschedule'),
(58, 'att', 'departmentpolicy'),
(75, 'att', 'departmentschedule'),
(72, 'att', 'deptattrule'),
(59, 'att', 'grouppolicy'),
(76, 'att', 'groupschedule'),
(71, 'att', 'holiday'),
(68, 'att', 'leave'),
(78, 'att', 'leavegroup'),
(79, 'att', 'leavegroupdetail'),
(80, 'att', 'leaveyearbalance'),
(62, 'att', 'manuallog'),
(70, 'att', 'overtime'),
(156, 'att', 'overtimepolicy'),
(54, 'att', 'paycode'),
(157, 'att', 'payloadattcode'),
(158, 'att', 'payloadbase'),
(159, 'att', 'payloadbreak'),
(160, 'att', 'payloadeffectpunch'),
(161, 'att', 'payloadexception'),
(162, 'att', 'payloadmulpunchset'),
(163, 'att', 'payloadovertime'),
(164, 'att', 'payloadparing'),
(165, 'att', 'payloadpaycode'),
(166, 'att', 'payloadpunch'),
(167, 'att', 'payloadtimecard'),
(61, 'att', 'reportparam'),
(172, 'att', 'reportpermission'),
(168, 'att', 'reporttemplate'),
(5, 'att', 'report_permission'),
(169, 'att', 'shiftdetail'),
(67, 'att', 'temporaryschedule'),
(66, 'att', 'tempschedule'),
(63, 'att', 'timeinterval'),
(69, 'att', 'training'),
(170, 'att', 'webpunch'),
(2, 'auth', 'group'),
(1, 'auth', 'permission'),
(125, 'authtoken', 'token'),
(140, 'base', 'abstractpermission'),
(13, 'base', 'adminlog'),
(134, 'base', 'attparam'),
(135, 'base', 'attparamdepts'),
(23, 'base', 'autoattexporttask'),
(16, 'base', 'autoexporttask'),
(15, 'base', 'bookmark'),
(18, 'base', 'dbbackuplog'),
(27, 'base', 'emailtemplate'),
(28, 'base', 'eventalertsetting'),
(17, 'base', 'linenotifysetting'),
(26, 'base', 'securitypolicy'),
(136, 'base', 'sendemail'),
(12, 'base', 'sftpsetting'),
(22, 'base', 'syncarea'),
(19, 'base', 'syncdepartment'),
(21, 'base', 'syncemployee'),
(20, 'base', 'syncjob'),
(137, 'base', 'sysparam'),
(138, 'base', 'sysparamdept'),
(24, 'base', 'systemlog'),
(139, 'base', 'systemsetting'),
(141, 'base', 'systemsettingpermission'),
(3, 'base', 'system_setting_permission'),
(122, 'contenttypes', 'contenttype'),
(133, 'django_celery_beat', 'clockedschedule'),
(128, 'django_celery_beat', 'crontabschedule'),
(129, 'django_celery_beat', 'intervalschedule'),
(130, 'django_celery_beat', 'periodictask'),
(131, 'django_celery_beat', 'periodictasks'),
(132, 'django_celery_beat', 'solarschedule'),
(181, 'ep', 'epdashboardpermission'),
(182, 'ep', 'epreportpermission'),
(120, 'ep', 'epsetup'),
(121, 'ep', 'eptransaction'),
(9, 'ep', 'ep_dashboard_permission'),
(10, 'ep', 'ep_report_permission'),
(126, 'guardian', 'groupobjectpermission'),
(127, 'guardian', 'userobjectpermission'),
(35, 'iclock', 'biodata'),
(40, 'iclock', 'biophoto'),
(146, 'iclock', 'deviceemployee'),
(39, 'iclock', 'devicemoduleconfig'),
(145, 'iclock', 'devicesettingpermission'),
(4, 'iclock', 'device_setting_permission'),
(41, 'iclock', 'errorcommandlog'),
(36, 'iclock', 'privatemessage'),
(37, 'iclock', 'publicmessage'),
(142, 'iclock', 'shortmessage'),
(29, 'iclock', 'terminal'),
(33, 'iclock', 'terminalcommand'),
(34, 'iclock', 'terminalcommandlog'),
(143, 'iclock', 'terminalemployee'),
(31, 'iclock', 'terminallog'),
(50, 'iclock', 'terminalparameter'),
(32, 'iclock', 'terminaluploadlog'),
(38, 'iclock', 'terminalworkcode'),
(30, 'iclock', 'transaction'),
(144, 'iclock', 'transactionproofcmd'),
(117, 'meeting', 'meetingentity'),
(118, 'meeting', 'meetingmanuallog'),
(179, 'meeting', 'meetingpayloadbase'),
(180, 'meeting', 'meetingreportpermission'),
(115, 'meeting', 'meetingroom'),
(116, 'meeting', 'meetingroomdevice'),
(119, 'meeting', 'meetingtransaction'),
(8, 'meeting', 'meeting_report_permission'),
(81, 'mobile', 'announcement'),
(84, 'mobile', 'appactionlog'),
(82, 'mobile', 'applist'),
(83, 'mobile', 'appnotification'),
(86, 'mobile', 'gpsfordepartment'),
(85, 'mobile', 'gpsforemployee'),
(87, 'mobile', 'gpslocation'),
(88, 'mobile', 'mobileapirequestlog'),
(90, 'payroll', 'deductionformula'),
(95, 'payroll', 'emploan'),
(89, 'payroll', 'emppayrollprofile'),
(91, 'payroll', 'exceptionformula'),
(100, 'payroll', 'extradeduction'),
(99, 'payroll', 'extraincrease'),
(92, 'payroll', 'increasementformula'),
(93, 'payroll', 'leaveformula'),
(94, 'payroll', 'overtimeformula'),
(176, 'payroll', 'payrollpayload'),
(177, 'payroll', 'payrollpayloadpaycode'),
(178, 'payroll', 'payrollreportpermission'),
(7, 'payroll', 'payroll_report_permission'),
(96, 'payroll', 'reimbursement'),
(97, 'payroll', 'salaryadvance'),
(98, 'payroll', 'salarystructure'),
(42, 'personnel', 'area'),
(147, 'personnel', 'assignareaemployee'),
(43, 'personnel', 'certification'),
(44, 'personnel', 'department'),
(45, 'personnel', 'employee'),
(150, 'personnel', 'employeecalendar'),
(48, 'personnel', 'employeecertification'),
(49, 'personnel', 'employeecustomattribute'),
(151, 'personnel', 'employeeextrainfo'),
(148, 'personnel', 'employeeprofile'),
(149, 'personnel', 'employment'),
(46, 'personnel', 'position'),
(47, 'personnel', 'resign'),
(14, 'rest_framework_tracking', 'apirequestlog'),
(124, 'sessions', 'session'),
(175, 'staff', 'stafftoken'),
(109, 'visitor', 'reason'),
(108, 'visitor', 'reservation'),
(107, 'visitor', 'visitor'),
(113, 'visitor', 'visitorbiodata'),
(112, 'visitor', 'visitorbiophoto'),
(111, 'visitor', 'visitorconfig'),
(110, 'visitor', 'visitorlog'),
(114, 'visitor', 'visitortransaction'),
(152, 'workflow', 'nodeinstance'),
(52, 'workflow', 'workflowengine'),
(153, 'workflow', 'workflowinstance'),
(53, 'workflow', 'workflownode'),
(51, 'workflow', 'workflowrole');

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
(1, 'personnel', '0001_initial', '2021-11-09 13:13:34.018687'),
(2, 'contenttypes', '0001_initial', '2021-11-09 13:13:35.670169'),
(3, 'contenttypes', '0002_remove_content_type_name', '2021-11-09 13:13:38.009210'),
(4, 'workflow', '0001_initial', '2021-11-09 13:14:19.179816'),
(5, 'iclock', '0001_initial', '2021-11-09 13:14:29.961989'),
(6, 'auth', '0001_initial', '2021-11-09 13:14:38.370966'),
(7, 'auth', '0002_alter_permission_name_max_length', '2021-11-09 13:14:41.811751'),
(8, 'auth', '0003_alter_user_email_max_length', '2021-11-09 13:14:41.876089'),
(9, 'auth', '0004_alter_user_username_opts', '2021-11-09 13:14:41.935744'),
(10, 'auth', '0005_alter_user_last_login_null', '2021-11-09 13:14:42.002107'),
(11, 'auth', '0006_require_contenttypes_0002', '2021-11-09 13:14:42.037111'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2021-11-09 13:14:42.094067'),
(13, 'auth', '0008_alter_user_username_max_length', '2021-11-09 13:14:42.151484'),
(14, 'base', '0001_initial', '2021-11-09 13:15:08.663668'),
(15, 'accounts', '0001_initial', '2021-11-09 13:15:17.705844'),
(16, 'base', '0002_auto_20200901_1642', '2021-11-09 13:15:27.807825'),
(17, 'att', '0001_initial', '2021-11-09 13:15:38.432459'),
(18, 'att', '0002_auto_20200901_1642', '2021-11-09 13:19:07.148839'),
(19, 'personnel', '0002_auto_20200901_1642', '2021-11-09 13:19:49.749858'),
(20, 'acc', '0001_initial', '2021-11-09 13:19:54.488098'),
(21, 'acc', '0002_auto_20200901_1642', '2021-11-09 13:20:06.840443'),
(22, 'acc', '0003_auto_20200901_1642', '2021-11-09 13:20:20.240572'),
(23, 'acc', '0004_auto_20210721_1158', '2021-11-09 13:20:20.721565'),
(24, 'acc', '0005_auto_20210908_1006', '2021-11-09 13:20:21.988128'),
(25, 'accounts', '0002_auto_20200901_1642', '2021-11-09 13:20:40.207496'),
(26, 'accounts', '0003_auto_20201021_1551', '2021-11-09 13:20:40.335882'),
(27, 'accounts', '0004_auto_20201229_0852', '2021-11-09 13:20:41.043516'),
(28, 'accounts', '0005_auto_20210908_1006', '2021-11-09 13:20:41.118616'),
(29, 'admin', '0001_initial', '2021-11-09 13:20:43.735127'),
(30, 'admin', '0002_logentry_remove_auto_add', '2021-11-09 13:20:43.919755'),
(31, 'personnel', '0003_auto_20201229_0852', '2021-11-09 13:20:48.742367'),
(32, 'personnel', '0004_auto_20210908_1006', '2021-11-09 13:20:53.485898'),
(33, 'att', '0003_auto_20200909_1810', '2021-11-09 13:20:54.040477'),
(34, 'att', '0004_auto_20201021_1551', '2021-11-09 13:20:55.033414'),
(35, 'att', '0005_auto_20201106_1538', '2021-11-09 13:20:56.204559'),
(36, 'att', '0006_auto_20201116_1052', '2021-11-09 13:20:56.305519'),
(37, 'att', '0007_auto_20201229_0852', '2021-11-09 13:21:08.234751'),
(38, 'att', '0008_auto_20210908_1006', '2021-11-09 13:21:36.246203'),
(39, 'authtoken', '0001_initial', '2021-11-09 13:21:38.748245'),
(40, 'authtoken', '0002_auto_20160226_1747', '2021-11-09 13:21:40.796221'),
(41, 'base', '0003_auto_20201229_0852', '2021-11-09 13:21:45.332819'),
(42, 'base', '0004_auto_20210908_1006', '2021-11-09 13:21:50.029217'),
(43, 'django_celery_beat', '0001_initial', '2021-11-09 13:21:56.237440'),
(44, 'django_celery_beat', '0002_auto_20161118_0346', '2021-11-09 13:21:58.815116'),
(45, 'django_celery_beat', '0003_auto_20161209_0049', '2021-11-09 13:21:59.470081'),
(46, 'django_celery_beat', '0004_auto_20170221_0000', '2021-11-09 13:21:59.570597'),
(47, 'django_celery_beat', '0005_add_solarschedule_events_choices', '2021-11-09 13:21:59.617485'),
(48, 'django_celery_beat', '0006_auto_20180322_0932', '2021-11-09 13:22:00.424569'),
(49, 'django_celery_beat', '0007_auto_20180521_0826', '2021-11-09 13:22:00.771409'),
(50, 'django_celery_beat', '0008_auto_20180914_1922', '2021-11-09 13:22:00.871701'),
(51, 'django_celery_beat', '0006_auto_20180210_1226', '2021-11-09 13:22:01.203828'),
(52, 'django_celery_beat', '0006_periodictask_priority', '2021-11-09 13:22:01.373155'),
(53, 'django_celery_beat', '0009_periodictask_headers', '2021-11-09 13:22:01.774288'),
(54, 'django_celery_beat', '0010_auto_20190429_0326', '2021-11-09 13:22:09.809168'),
(55, 'django_celery_beat', '0011_auto_20190508_0153', '2021-11-09 13:22:13.751396'),
(56, 'visitor', '0001_initial', '2021-11-09 13:22:14.405577'),
(57, 'visitor', '0002_reservation_visitor_visitorconfig_visitorlog', '2021-11-09 13:22:40.278254'),
(58, 'iclock', '0002_auto_20200901_1642', '2021-11-09 13:23:05.307859'),
(59, 'ep', '0001_initial', '2021-11-09 13:23:08.690449'),
(60, 'ep', '0002_auto_20201217_1608', '2021-11-09 13:23:09.775108'),
(61, 'ep', '0003_auto_20201229_0852', '2021-11-09 13:23:09.828736'),
(62, 'guardian', '0001_initial', '2021-11-09 13:23:18.182273'),
(63, 'iclock', '0003_auto_20201229_0852', '2021-11-09 13:23:20.656438'),
(64, 'iclock', '0004_auto_20210908_1006', '2021-11-09 13:23:23.713312'),
(65, 'meeting', '0001_initial', '2021-11-09 13:23:40.149452'),
(66, 'meeting', '0002_meetingroom_enable_room', '2021-11-09 13:23:40.334463'),
(67, 'meeting', '0003_auto_20210908_1006', '2021-11-09 13:23:44.594179'),
(68, 'mobile', '0001_initial', '2021-11-09 13:23:47.333930'),
(69, 'mobile', '0002_auto_20200901_1642', '2021-11-09 13:23:57.089920'),
(70, 'mobile', '0003_auto_20201229_0852', '2021-11-09 13:24:05.104947'),
(71, 'mobile', '0004_mobileapirequestlog', '2021-11-09 13:24:09.151763'),
(72, 'payroll', '0001_initial', '2021-11-09 13:24:18.808512'),
(73, 'payroll', '0002_auto_20200901_1642', '2021-11-09 13:24:36.372081'),
(74, 'payroll', '0003_auto_20200901_1642', '2021-11-09 13:24:51.747478'),
(75, 'payroll', '0004_auto_20210908_1006', '2021-11-09 13:24:52.231804'),
(76, 'rest_framework_tracking', '0001_initial', '2021-11-09 13:24:54.990189'),
(77, 'rest_framework_tracking', '0002_auto_20170118_1713', '2021-11-09 13:24:55.846795'),
(78, 'rest_framework_tracking', '0003_add_errors', '2021-11-09 13:24:55.978602'),
(79, 'rest_framework_tracking', '0004_add_verbose_name', '2021-11-09 13:24:56.047455'),
(80, 'rest_framework_tracking', '0005_auto_20171219_1537', '2021-11-09 13:24:57.839932'),
(81, 'rest_framework_tracking', '0006_view_and_view_method_nullable', '2021-11-09 13:25:00.633533'),
(82, 'rest_framework_tracking', '0006_auto_20180315_1442', '2021-11-09 13:25:01.830778'),
(83, 'rest_framework_tracking', '0007_merge_20180419_1646', '2021-11-09 13:25:01.899827'),
(84, 'rest_framework_tracking', '0008_auto_20200201_2048', '2021-11-09 13:25:02.069415'),
(85, 'rest_framework_tracking', '0009_view_method_max_length_200', '2021-11-09 13:25:02.317303'),
(86, 'rest_framework_tracking', '0010_auto_20200609_1404', '2021-11-09 13:25:02.417376'),
(87, 'rest_framework_tracking', '0011_auto_20201117_2016', '2021-11-09 13:25:02.671598'),
(88, 'sessions', '0001_initial', '2021-11-09 13:25:04.022797'),
(89, 'staff', '0001_initial', '2021-11-09 13:25:05.550902'),
(90, 'visitor', '0003_reservation_email', '2021-11-09 13:25:05.682162'),
(91, 'visitor', '0004_auto_20210908_1006', '2021-11-09 13:25:13.927297');

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
(1, '2021-11-09 13:26:01.243139', NULL, '2021-11-09 13:26:01.243139', NULL, 0, 1, '37.3', '99.2', 1, 1, 1);

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
-- Table structure for table `hris_attendance_break_tbl`
--

CREATE TABLE `hris_attendance_break_tbl` (
  `breakID` bigint(21) NOT NULL,
  `employeeID` bigint(21) DEFAULT NULL,
  `breakIn` datetime DEFAULT NULL,
  `breakOut` datetime DEFAULT NULL,
  `breakDuration` decimal(10,2) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hris_attendance_break_tbl`
--

INSERT INTO `hris_attendance_break_tbl` (`breakID`, `employeeID`, `breakIn`, `breakOut`, `breakDuration`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2021-11-10 08:10:32', '2021-11-10 08:44:44', '1893.86', '2021-11-10 00:10:25', '2021-11-10 00:44:37'),
(2, 2, '2021-11-10 08:10:56', NULL, '0.00', '2021-11-10 00:10:50', '2021-11-10 00:10:50'),
(3, 3, '2021-11-10 08:11:00', '2021-11-10 08:11:50', '2277.56', '2021-11-10 00:10:54', '2021-11-10 00:11:44'),
(4, 2, '2021-11-10 08:11:14', '2021-11-10 08:17:45', '2277.65', '2021-11-10 00:11:06', '2021-11-10 00:17:38'),
(5, 2, '2021-11-10 08:44:57', '2021-11-10 08:46:39', '2276.18', '2021-11-10 00:44:50', '2021-11-10 00:46:32'),
(6, 1, '2021-11-10 08:44:59', '2021-11-10 09:11:01', '8195417.00', '2021-11-10 00:44:53', '2021-11-10 01:10:57'),
(7, 3, '2021-11-10 08:45:02', '2021-11-10 08:53:59', '2276.21', '2021-11-10 00:44:56', '2021-11-10 00:53:52'),
(8, 4, '2021-11-10 08:45:05', '2021-11-10 09:01:53', '2276.34', '2021-11-10 00:44:58', '2021-11-10 01:01:47'),
(9, 2, '2021-11-10 09:10:12', '2021-11-10 09:22:29', '2276.37', '2021-11-10 01:10:05', '2021-11-10 01:22:23'),
(10, 3, '2021-11-10 09:10:15', '2021-08-07 13:00:15', '0.63', '2021-11-10 01:10:09', '2021-11-10 01:29:48'),
(11, 4, '2021-11-10 09:10:18', '2021-11-10 09:24:23', '0.63', '2021-11-10 01:10:12', '2021-11-10 01:24:16'),
(12, 5, '2021-11-10 09:10:21', '2021-08-07 13:00:59', '0.63', '2021-11-10 01:10:15', '2021-11-10 01:30:27'),
(13, 2, '2021-11-10 09:24:00', '2021-11-10 09:33:08', '0.15', '2021-11-10 01:23:53', '2021-11-10 01:33:01'),
(14, 1, '2021-11-10 09:24:02', NULL, '0.00', '2021-11-10 01:23:56', '2021-11-10 01:23:56'),
(15, 1, '2021-11-10 09:24:05', NULL, '0.00', '2021-11-10 01:23:58', '2021-11-10 01:23:58');

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
(1, NULL, NULL, '2021-11-09 14:21:06.651210', NULL, 0, 'St9TUzIxAAADnKAECAUHCc7QAAAbnWkBAAAAg0Eal5wjAA0PYgCGAHCTLQBLAF4P0wBPnOcPrACBAE8PQ5yMAFEOYgBRAO6TOwCfANIOUwCcnHgPHACrABcPVZy1AEwPywBwACOTgQC5AFIPCgDJnJsPnADLANEOM5zNAEcPfgAXAD6TOgDZAMwPWwDinCcOYADmAP4PsJzsACEPhQA0ADKTngD4ACcPQwAfnS4PhAA8AfMPm5xNAR8P359uh+Qvihb3a4uPZHoccloPmYqXdwKXUY0ib1M7fYH/ZV2b46EenQoeuIEhnMuJZini8YdnoZzbjpOABmEXfTljmInTDfOqtBZF3A/ZoX1Ce6KJqm7n2AbEXXwjdiVjCO46KH4MnITBDo6AGRaZArQGLZ1TDtZyzf4w/gmSWA86DAr0gAoanuT7lvgSA+8LZocPCBsT/evS8SRnb8XvAyA5xAJBgisFAGQGgAWEB5xtB/02BQCPDnkfDwCzHY/Bqv+TXH0FAJgkDKUQAygkjMDDUYwF/8ddhwwAXkF6B5bC+20QAM9Bk7H/wl2KfosLAGaHAMOsVsDADQBfgnTBXnlwew4AMI3p/l0z/cDAQ//DACvWZsPAdxEA30vk3cH/QP/AN48GA7BOXsFnAwDXUF9eGADre5rClXDA7cLAjMDAwQb/eJEBqYCMwZEHw8Jcw3MQAEOKGf8pYsH9wP3BwDpNFpzuiZrBUnRNeYfuCAA7j1bCk8B1kgFij+f9LvnAw2NOFwDpj5quwHRdkojBwHCHywBlD/H//jE/VDoGA8OWXsLAhxHFkp8fxcKfasDCnmcJnJugDP5BYjoIAw6gdMDEn//VAFos1v78/v4xOmD8xRQA+7ScWQXAwmPDwojDiP5WCgPOt1Bwg0sGxc20glnACwBXuIzAcuhDCgB8vFMGgPz4FwDMyJ7BTafGXpHAVcDAwAQEAwTLUKkIAKAPCSvWDQB+zdD9PPz+XP/C/cDABMUszdCBBwAyz0MFeP6UAZzPE/9GmQYD59RDwmoIAGfaGVzB/1UHADsYQ3vGCQCi4iBQoQkDAuQrwmXBb80AXnZBwv/C/WjMAGB2O8FMwVkGxbXzvMHAWQkAgzE3wfbAwcEIAIkxLWHgBgCj+ifBBWkEnJ/8LcLAwQXCFZzu/qd+acIByMQUZ3jCBxCK2yvDGsUEEIUfN7MEEx5BOsH7AxBZTR1YU0IAC0MBxQAI2VMA', 6, 0, 1, '10.0', '0', 0, 1, 0, '2021-11-09 14:21:06.651210', 'BOCK191760589', 1),
(2, NULL, NULL, '2021-11-09 14:23:07.521682', NULL, 0, 'Sh9TUzIxAAADXGMECAUHCc7QAAAbXWkBAAAAg4EWRlwSAIIPWgD3AApSawA2AIkO4AA+XHIPkwA+AEsPPVxJAAQPgQCkAIlTowB1AJAPpwB1XHsPWQCHAMQPSVyQAHQPiQBnAIVTbQDDAHYPaQDzXJAP0wACAV8PjFwCAX0PkgDpAXBTZAAuAVQPQQBGXT8PGwBMAYAPmVxNAUYPWQCKAUNTJ3kf+VsRRIDdWSOJgYAC/66EHi/q8QduRga/ByheDJNi/W98mxENosv+igpHDWIGWiVnCe7x6Y2QiZQi9HXq/TcDnxPQpZKG6vOzB3p3WUkD+0MjeguiH1B37+1CDmcrpDdFcM/6fhVKGuvjUqYYz97uPwfq8zhXyAry1NP31+05W8b/PlMrIPcBAW8e8QUAkQHWWw1cSAQMwVc+rUALXIIGEFXAPc0ANFUHUP9VDwDxGgMQ/jhYUggA6iQDEMEzBwCVKNU+T1kBGzL6PgPFbjRQwREAKT39BUDDnEdDVQkAl4cTR5zAMxEAQUXF/z0TwcBV/10ExTlLJogQAEFMBpY/NAlVCgB8YIwEwMKciMENAAFozMXDo0f/Vf4HAJtzgyeCDgBmdgaJ//2cWVgIAF56ssBaBxcABXvwRIVLwqPBMlNdDgCZg/6jMsD+wv//kwcDCYl6wMB/D8VdiV/B//3AVVQEQQVcR5J3wsBuyQCG/oiEh8DCWdMACunswP/B/sM+//yj/MH/wP/BOv/Co8EKAGjBfQd+w98PAHDEAP7wwEWcTgsAaMd3B//BNXYXAATT4DjB/Bc5wP7+TFgFPhRcA+LeNj41/sD8o8HAwEMXAMTu4Zz+TDvA/v87wPyjUv9ZEQCpKpPDzoWDeGgVABT+nZ1jwsGOwWYHc5FQEYkCfcL/AMDHo8DBeBQQz8GX/JzBgoZ4g8BNBBOLByI8CBCP7YOznsP+DBBoKyf8IqP//0UZEOnpqcGcwv+BdZbBBcKHBMMGEJYtE+z/BkxhL1rCfAbVjiwrscEWEOpBaMLDncB4wYKAg7ETE4VGp8FywsJUwpUiwAMQkkg0BBcTu06pYsJpwQXDwNCKd8EKEHqavf+g+/v6PgcQSmG0o/D4IhMQ36SwwAVul8TBwZMFUkFcCkMBAAALgFI=', 5, 0, 1, '10.0', '0', 0, 1, 0, '2021-11-09 14:23:07.521682', 'BOCK191760589', 2),
(3, NULL, NULL, '2021-11-09 14:23:22.038400', NULL, 0, 'Sj9TUzIxAAADfH4ECAUHCc7QAAAbfWkBAAAAg6EboHwbAA0OiQDaAHlzuAAiAIoOowAqfPkPtwAuANwOfXwzAHMPvwD9AJZzwgBVAIYPTABdfPkP9QCBAFEPXXyCANYPOwBRAMZzxQCvAGwPTgC3fNsPcgC3AAwP2Xy9AHsOywAOAAFy1QDWAEMOewDcfD0O2QDmAOAO53zoAB4O0AAvADFyjAD4ALsPmgACfb0PvgAKAX0P1HwLATIP7QDRASpygIbtl5X3mAoCE3+FPHMt9kB+mvt/gYPvLJNJhwpz5Pqdf/ZrVX+iciQTtfOubnL9QfvuJoN3PxtOE0xXGxLfDo/ib/LUg87vKfNNb4MrIm6mcksHtfKu9lB7ZHmdE1E7YMBi9dTK4UBxIEARXnE0+h0+zPehCxKY7fvh7QXe+Q9OaRjxPwDXBXaCvHyS95vnyYpbiYkDYArRfgYALPoRc+JwKaiQBOUsAn4XHp8UAKzAgFq8wmfCwsL/TmQHfLUID8DABcWmG3/9bRQAnhpG/8eDksKIcnNW3QDZXJFnwknCwAfBwr9/hcFxDwCnKm7uhMPAwMH/mAsDFiv9aEP+UM4AeUx8w5KIcwXFujNvaQUAgjH69goDBzdxeZJnCcW/V/qFxGEFABWdRvwKDQCNXPcvOv3CQ/4cAQJclgTAwhqFicHDiUmzwFpgAA9vmntqsomSuP7BwMF0wZ8bAnZ1lmRqiIsGw8G9wP/Cc8Bq0gDx/JZ4iH3ClrL/w71DGgEWkpeXZ8IFe8X/w8HCBcHDvMD/CAA6mIVZwxobAQ+Yl3KrwMe8wMOgwnN7lBECaKmewWp1wAbCwb7Ckg8Av6+xrsEHw/1d/g4AT7DMgSAo//7AdN8BFs6fwcH/wcFBw8C9wsN5wGlABA0D87LW/v37/znB/YLAbAUAiriDwlhzAde4kMfDAJbAg8D+RxoBFH+cwoPBwsGGwcUFxYoHwjJyDwDWe4PFuJ7BwT44BsXevGtEwBcBFNVZW3TpxI7Bwf/BkMEFfM/YMP/CwQUKA7DdQMB/Pf/SARehnWiAwcTFAcLAvMJQ/8BJBcXf3m8/CQC95zqTwTV5AdrpKYsExejqYG0MAQvpnARmxbuewwcA0O3xwsKCLQQA5O0iB/4SfQ72nsHAjgzId7xH/wQQ2Qz0O1E+AQtDAQAAzkVRfA==', 7, 0, 1, '10.0', '0', 0, 1, 0, '2021-11-09 14:23:22.038400', 'BOCK191760589', 3),
(4, NULL, NULL, '2021-11-09 14:23:39.647745', NULL, 0, 'S5VTUzIxAAAC1tcECAUHCc7QAAAa12kBAAAAgnsSVtYWAOcPLADYAEjZpAA2AHQP5gBD1sgPQABBABEPTdZEAEsPagCIAFHZVABYANcP7gBn1kIPSwB6AIYPK9aEAMIPawBSAMTZTgCyAMAPGwCx1nsOqAC0APsPstbIADQPWgARAMLZYwD3AD0P057dSu4UgoEyZqd6ffWej3+fufc3iYBXuIgtD878BHhro0D7mX65C3+DX1uUhk4EgoAzfVTUC22ygdYCR4CwV+IHHgpah8IL9Nej/n9+d0lCPpFhdA5Dxtd7OPo5a+ZzdgH6hUr/+Kv6fy8L4KXHICjXAN0bERQApwFpT8PD/YP/wAXB/RbBaAQAegGxjQrWjwV3dcCX1ABG0F+WTsByTLMIApoJWoRqGABaC38UwYPDaYlEtf7DpAkAnhN3wE7Dw8YBKxVaxHueZGAVDAAfFlPDBW1IF1sIABIbTAfAZhYLALIdgIQEkcHeAa0mfcCRRgkC0zFGbXT9CMXEMFXBeYsSAKL9fZUScHRW/okWxcI5VcODwsT/k5hpYCgEAEpHTG/JAM2RiJDCw8GSBA8ChkhJYmdaUQQQArNOV8LCwWKfa1fBAdNPhsJhS3zCrcDBVmoLAK9RUVLAW3UWANOTg8MWw8LDksH/Bv/AsEvBBwBUXIzBwIcUANphiYAExcISdHLAwcDBnxUCDWqMkJ/DwQWLcRfBfRMA3nZJgMESkMGFdlcMxUt9kHFWWMIHAO+JRLxLFADvipcHecMQl8P/h23B1gDoR5J1w8TEwwSDXhdNEwDzn5MFecYTwsN4dmoSxe+pSMONxsTDgATAwynAwgsA2q9JxMoewMHBwMHAzQDYY4HIyMLBd8wAqm5BwYVwCQA2uZxaxcfHwQUACMVCFMLABADRyfRxBNa1zDd4wAfFr8/sw8BpBgDvCZ7GDsT+UkIAC4YBAtYKRVIA', 8, 0, 1, '10.0', '0', 0, 1, 0, '2021-11-09 14:23:39.647745', 'BOCK191760589', 4),
(5, NULL, NULL, '2021-11-09 14:24:53.152557', NULL, 0, 'S+9TUzIxAAACrLMECAUHCc7QAAAarWkBAAAAglETNaxSAPIPSQCcAGijUABqAPYP5gBurF0PPQB8AKYPkKyFAIEPHgBMAOajXQCSAPcPWQClrAQPjgDGALUPn6zYABMPlgAmAA+jrQDmAJIP0gDlrLQPrAD7AFMPUKwhASkPngDiAQajnwAyARIORAA8rSYPnYnqmGv9R9mkeWYJOY0olyipbHs++AJsxG+0pI+BNn13joYTZyePgW/3JpaHAoHWz5Uyhb/18F5EyONtyAuNgdSmTlN4fiqcjYH0/Xcq7o+T06vDaAWMJJuFcwZfJ6Ybvlvj3UtwMBMn7DnSSxQ+JfMCIaIGjCoBAacVbsYAHJtswAQALDiuZQesPzpxaQYA+UFpU4oHAExDcQf/wPUFAGNGenfJAHPgfHbBg8GnzQB2/3bAkHINAIJaaW3AwcGCwcGqBALWXH3CwAUAVmaB1AQATWxp/0kEAoxvYokZAJu0hsDCwcN+nsHBQMLC7sARADp9YgWbicXAwFoWAKu7hlskwICgb3vA3ACMLYfCwcNvwlqBcW/+/8DAYQTFjoovjQgAG4xTVHIFrLOShnRvEMVYlsXAp8KDaf+sGgIUnIzDWoDDYpNrbGP/wPwYAH+li9eBocPDfHMFwcOZGQDKtYloTsLHb8XEwcLAwjrBwm3B/8IVALt7j3VSxMLGw6R4scTDrwECvzrADcWKwSzHxcfCwsEEwcFu/gYAkscJlsAWrM7PjFJ4xQDGxtB9mQcAg9M4/y1sCAB01z3FsJAFrHjZNMOIwsEAgXUIPQQAoNrKZwWsftwtksTAwACbSBFqBQAG5fFkBKwN5S3/wFzNABpHMcFVbQUAxvE1bWgEAJfpF0cGEvojJETCBBCUJC/BU0IAC0MBxQAJ6VMA', 9, 0, 1, '10.0', '0', 0, 1, 0, '2021-11-09 14:24:53.152557', 'BOCK191760589', 5),
(6, NULL, NULL, '2021-11-09 14:25:13.564466', NULL, 0, 'SsdTUzIxAAADhIsECAUHCc7QAAAbhWkBAAAAg6kah4QRAPIPbgDbAGqLswAsAPgPRAAuhPMPyAA1AMQPR4RKAOYPvwCZAAaL6wB1AAwPWgB1hAMPTACGACUPW4SHAOYPtQBZAH2L0ADEABAPQQDLhPcPWADKACQPP4TbAFoPygAxABeLcwD9AOQPaAAKhREPRAARARIPgYQUAewPOADTAViLkAArAfsPDQBBhTMPmwBZAYAOkYRbAVQO+YsQA6R6NHoBe3eHXPoIjL71KYpVA0r8Eo7L/gcT1wu+f8yHRwbiBjMNzgncFyIPZv6qhzIfo3te/9sDHAuKA9yDr38rcMt7fvwYEPIfChfbFqp7CQyf78/+EnimhmiH1wU3BK/nAPsMicbqWv3OFyMnG/ua9Wd+vfP4C4lbFYfrAxd76BNha8aov+2/4yY7u3b2TCsVKBIqWByjHgTjAiA0xAIpmcMEAFkAbaENAw8Ba1vAb/++AwMiAHfBBQBgwWvC0AUAtwN0W84Ac4Jxwv9ce8HOALyJe3TCwcBawwDEkHzCwG0GAA4befLBCwBqHW2xwcF6wGAFACshp8HDRQIA1yF9wsgAbaZmZsL+wcAFwYKAAecnfXUSxa4t/nl4wH7AYo8NA/kxa8Bdg1gEFANAN31yf3jCncDC0RYA4EKDwASBhvPAVlhWDgAiTYX8wcDDfHINxfBaAv7BxEOTacsA/fWIwv3BbokHWQuEonUDRlQXxACGF3LCwMKDfjuUws7ACQBUiWS9WPyMAbKbgMLBRsEUhP6cmsNiwQX/x0d1wXBEiRbF/6Qewv/CwGeWu8Fr9RQA962TdKLDwkbDZsJSShTF8rQXdZDDbFJ2oQkDDMbwKv//wDoRA3HKkMDD/sBUlmTdFQEDy5NuiIDCR1jBwHADAPLeVEQSAOfdkMAFwn57xcHCZE3A1gDxaZvD/sP/wgbAlEbB/8DBWQ3FxfANwMGewcFkBAQDSfUQwP0MADbzk3vAeMORwQTFy/uTRgsAdv3gO/8ge0cGEG8BWgT/Z4IRsggPNf/PEIaW5v4q/EYQ1fIiJHXCksTBh54JExUm7fz7//0F/v2BEZUs+vwkwRCOq2FzDhDjPGiUx0WmwnAOEN+DrcFGwcOhwsL/mAoT/lTaNPr7/z7+B5SUVt72+AnVeWNtwsH6+vsbl0IDj0IBAAALRZcA', 4, 0, 1, '10.0', '0', 0, 1, 0, '2021-11-09 14:25:13.564466', 'BOCK191760589', 6),
(7, NULL, NULL, '2021-11-09 14:25:46.136129', NULL, 0, 'TWlTUzIxAAAEKikECAUHCc7QAAAcK2kBAAAAhNcjjCopAHYPIwCFAOclnABCABgPlABNKu4PFgBUAKYPgSpaABAPqQCbAJQlRQBsAOkPUQB8Kh4PswCUAGcPeCqXACQPOQBeANslbgCgACMPbgCtKjMPTwCvAJ0OciqxAHcOzQB0ADQlbwCzAFUOoADEKlANbwDCAIYNCirCANgPXQAKAEoklwDnADoPTQDoKkAPEQDtAB0PhyoJAVQPXADQAdAlmgAYAT0PgAAnK9UPjwAlAZQPTyo5AeEPjQD7Ae4lnABDAaMP5wBJK+wPTwBPASwPNkpOaTfr9YJi9MPUm4gOpMoJJwkfJqLi9YIzfdJ3mtpT+XaBoniLcHKrZ/3jDC+JyxA6ur/+LXICdruHxSqkr7LQwoiq+KOURACNrKHR2JJeL94RRQvKeOsEeAy4VFk12gEzkrfRHeJpFIUE/RMN1oQExPf98MjN4imK+5+DCfzcDg7SuPie6oP89AiNxXIEZgPLB16P8T1EG14EFQPH9qaooO3d65JWJPaRKefvDRV1aif8USTY+nIOpUicmmKEaLiOVJ5rUweHJnIaUQoa/5cX3MhMVAYgOgHHYyTkCQBcAHDCmVQHKrwAEP4EAPABaaMGAEcBbXeJEgT8HJx5eMHCqnJgJwGEKXfAkK9kxDsB3TSgacOqhMbVw2oIAKFD1v776kIPAFNE6erA+NQywD4OAFWP7UQa/f9EwAoAiExgQMD+wcLBFMUZVc5ZwP8v/jU7QMTXCACnWpfCXsGEIAGJXBBL/oXADCqkYJDAw5MHCASHYB49OBYAImSp6GiMdYB7agUKBGtuXsH/e8BCAwS9eCDAEwC1VafG68LAw8LEwAfBxehCZg8AgJfb/fpoVFl7BwC3XStHFxQAPJnaMDgkMtT+wD7AcRDFc5sK/C9V/sD9OiIdKuKcsYRqwQSgc+jA/3vBWxLFqaGBw8HBqcPABv/F61PADgB1q1XKxun+eED+/wrFUqj0/P34/f020ADPhrHBgYnAxgfAlFJHCgCprTQFSmHqCACvrS3/hlgKKnOwdMSJaAQq+iABSrFac8E6/sTXCwBPs1fABMDEF/8MAHmzMPA7+9dEAwDMtDQECwRFvCL6Qf8oBAwES8Baflj/Ks0AYu5NW1QIAGsAScRgQQcAccU6Bf37GgoAXNRQZIb9LiwBbdRD//+FGgQ46N7CYFMsO/341f8ywFZZCcWa7hDBwGeRBwBQ6znq/loJAIjv+Dv511UdEAIF3gVuxG7B/iT7/v07wFHqwcH+mQwQRw1U1CrC/v/+/QYGFHIYWv/C/P/BEJ4xPIwFEEEnn/8jIxGOLVD7PwU8ADpJPGImBRCOUm8ZBhCmUprDA8FyLBFsW/AswMEQiHSBV1JCAAuGAQQqCkVSAA==', 3, 0, 1, '10.0', '0', 0, 1, 0, '2021-11-09 14:25:46.136129', 'BOCK191760589', 7),
(8, NULL, NULL, '2021-11-09 14:26:01.859470', NULL, 0, 'SntTUzIxAAADODwECAUHCc7QAAAbOWkBAAAAg+UTyjgpAA8PUAD5AO43uABNACgLlwBfOF8OigBgANwPQThwAN8OdQC0AA43OACNAN8PlQC9OFoOaADDAIMNPDjMAN0PgAAtAEs3hAAcAUkPrQAjOVYPiwA1AYQOKzg5Ad4PhQCEAU02XQBGAdcPtABYOecOwurX+xIH0ajeEr/jKhoOEcQnfIPicDpSCA9Yye6+fYPtA2bVWs8LsvcxbQMWhnS6iIItFtd+AO6xU2cDhYaam6YD4T92AYvzbQt093nFJBN2gkIaUff2w9furwqXi3L7BzePaPYFyvCzgqWyPxB2mHekijAHGCsBAjMe08IAXDl1w2TCCwC5AXdJwGdUEwDL2p7AvnTCYsL/wQVvEDjEJZqIi4mZa3suAdo3gPr/VcPB+cDBhXvBaskAUQDmNSr//cEMDANsP+v/O/3/OP/G/gsATEBndwVi/CoBtUmew8EGjMHHwIdr/wgAfFEnxv42wgcAw5YnMGMSAFZZ6f4FJC0N/mhdCgBOmWLAacHA/8IOAEtgEMUrQkVkDwC8bQPDJURCwWYNxXFwSIrCwHNaDsV5dz79/f3+N/4EwGQ7EaQQOsIWxTuJ5sH//ynA+Tj///j+wP7C/8AFwR84CKfewVtX8/0wxDT9R8L+cc8AdZExMzdCDQC2q134cFNY/w0AqLs+x////lP/wPUIA3bAWmLATwzFZcF0RkRY/w0AtsNDCEbA/sE1DcV4wAX+/kz+/8E6QQg4acZD/zJEjgoDZctQVURUEcVAyOJN//v4+v46/8PHwP/AHQACE9ZJ+f7B//9M/jss/cX+/cD+wcE7wMElAQHf4sLABP/BE1X+//r9/jj+/Mf+wf/Awf8ECAO47UZM/0McxRX24sFqRsD+/jj6/8X8wP3BwP8H//z7wcAaAAr3EsBR+E3AKvv8/Tj+/Pj/wcDA/wTVnRMFdhsQEgrcB1HBxkr//vz5/Dj9wsfB/8L+wcEEHhMhH9pcVVf/OPT4xcH+wv7/wTozPccHEIIgRv4+wMI+EYggQP38hgYTWyNXS8AFEKwkVfg1UkIAC0PEAAMzRFI=', 2, 0, 1, '10.0', '0', 0, 1, 0, '2021-11-09 14:26:01.859470', 'BOCK191760589', 8),
(9, NULL, NULL, '2021-11-09 14:26:27.816718', NULL, 0, 'TQFTUzIxAAAEQkUECAUHCc7QAAAcQ2kBAAAAhO8ieEIcAG8PjgDpAAxNWQAtAPAP/gArQuIOuwAxAEoP3UIyAJ4PiwCGAA9NagBQAPYPAABUQpcPBQFlAHAP4EJ0AK0PWQBFAO9NpQCEACcOpgCJQmMPzACTAGgPO0KWAN4PlgBfAC1NsACaAKYPrwC3QgEPnAC3APsORELJANcPcwAPAF9MgADLAEYOfQDPQroOTwDRAJAP0ELYAD4PcAAeAFZMngACAUQP8gADQ9YPhQALAZQPXkJNAeEPlACJATtPfABQAWANogBSQ+oPLWqCgodmubwUmn57DQ9Hgrq8nPe375d3M/AiuneLZhA+CcLrOUTnFSaefu3zCm+znwjG+Q/o/wlrWVojwvkyAr4Yucr7DWf1hYN0A249xHiWhVpmjAu2QGOLhvWafSYINUVYh5LshYOYf9W5sKaivDqiPxSuu1+FwYSb2K74LVZsCNVevexY9toK23xifYMUBIA+Ryf91oTbA27/8boQDr79sffKi9+1fodzA5OH5A/nQ+4PufimgWanuaC6VMNjlXbcIqLDMAyNjo+sDXREhgEgNgECh+Z/CkKyABpX//6RwfoiCwDBABD9Ov86AQQA4Ase/ocFBUdJN8BmFwCLG+2C/v/9//7AOcE3vcD+wP//wYkDBDsfcMEKAJLuA/kD/jIOAD8vIsBCbP7//jcOAH0wkoDFf4TAwWzbAB8p1zJLWCz+OksxCP7AwFkSAEpBB785/Uv/Pm0FEQTNRgYx/kE+kHQLQsBNl3mWcLvAF0JuUfT+/v06Nfq8/sDA/8D/qhsEYVDiVMH/MDr+Lb1A/0bAWAjFZ1YphcDB/xQAJXGvHpjDkINzXcwA4js1wDhtFwCZfuO9Jf4uKz7ArFkLQqGAl6fD/lbBX7wRAKiDIicE/WAoWAoAZ4rrO/z5vv7/KAoAX0lpxsI//xQAyI91w8WDjMLCwsLABMHFgv5cFADOj3GTxoCPwobAdGzPAGbTY3xdQxoAh5PYvcAq/vz/KgX7xIM/wMFmwQrFzpN2R2RgEACZWSL5vsE3c2LCxM4Az+M2///B/MOnwRRCb7H3+xb+BP77gfwzwA0Ar3y6x4HCwqVpwAzFnL54P8H9wmT+yQCqg0FFwMDAwQV8D0KyxT1DXXDOAHqFiMjDwmU2zAB1jl/CwP9b/84Aeo1Rw/3A/cE6/lNOAYTPPTM9OkYDQk/UVsBT/s4Ae5lH//81Vf7XAKafwoLBw8fEBsHFgsHBwFQGABHdOYLBZAkAbN6WTEK/CABy30w1BT4TUjgE18DAwuv7/rv8/v///sA6//uC/v4WECMIH8DFgv5VwPz++Dj5xIL/wP9kBxBaCke9wMGcBxCUykbFfP0GEIMRT/X/A1KGJkz9/kDAEIhkR/78/QMQMzAevQUQeVRpNpdCBElCAQAAC0WXAA==', 1, 0, 1, '10.0', '0', 0, 1, 0, '2021-11-09 14:26:27.816718', 'BOCK191760589', 9),
(10, NULL, NULL, '2021-11-09 14:26:45.618136', NULL, 0, 'SltTUzIxAAADGBoECAUHCc7QAAAbGWkBAAAAg8UVkRgXAJkPagDiAIIXSwAsAAAPYwBJGKEPnABhAFoPVRhzAHEPEgC7AOUXYgCSACEPZgChGK0PDgCmABsPcxi9ADUOdgAVALcWSADdAE0OQwDeGDgOGgDjABEPVBjqAEoPYAAyAEQXbgAOAUcP+wASGc8PWQA8ARQPexg9AUUOWhve+lyDe4Dy6xfjv4C4i3ZrMQKTCrIjshoe91szQlFOj8hr4wqXd6fH17GV95ZvQ3o3+1YPaeLeD8OTgYGz/gEP6H2BgTJukAVVESqY5YXyBnb0qJDSC7OPXQQc/RmC4PxhA979JAPh53IEmouKh3aIsZRaBYONvnQyANRjCQAQICkBxPsYuAIAcwIQ/swAhxwS+8JEagXFmAs4RwwAWggA78Eo52kOAEYQ+jv/Ml5D/woAOBo/PP0g/gsALSX0Ov8qLf4GAGcmgwTDWRYBTSwAwP44//xTwf5dEgAc+/HD5/xGKThKwMMAqlUlS8AOAAec5PznQTH//cD/0AAIeOY8wv39wDj//ObA/v//wMAF/gQYU3R0wcLBvg8DDXrgMcD+/e84ww8BAnzaOP7q/f3lRz7/Vv8XxQiCzyg7/v/8QTrA/djBZcIOAGdRHClAV2QWAAOaEyk+5iXA/v//wTvA/GMXAAKx0zwF/vzm//3+/cD+Ov/82f/BwRYAB33a/XA6/SH//kqewggYV8Qr/j4r8BcDEMnawMA+LOE1W33ACQBUzmkD/24yCQBF0lp+OjYKGFbWNP4r/+wFA1XaQzYIAFMePfja/////hYA3+DVX/7/+/v6NAX/Xm/ACABI4Uyd/SoQAYfhOlxa0gAE/dLC/MH/wDsz+OX8/f//wf+TwBoYDuzQRzgmOCo92Vd4BwBW8Yz/QuYGAGD/ST04/hsICwXWZVT/OPn448E4wMDB/wSSFwgTCdrCRDw8+fjY/v7BwP9wwxBtDkf///nCFNUSGsLBdjj89Ps6wP3Y/ME1BhBx5UPD4ioEEHVAUz/AUVoBC0MBAADORVEY', 0, 0, 1, '10.0', '0', 0, 1, 0, '2021-11-09 14:26:45.618136', 'BOCK191760589', 10);

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
  `sync_time` varchar(100) NOT NULL,
  `visitor_policy` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `iclock_devicemoduleconfig`
--

INSERT INTO `iclock_devicemoduleconfig` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `enable_registration`, `enable_resigned_filter`, `enable_auto_add`, `enable_name_upload`, `enable_name_download`, `enable_card_upload`, `encryption`, `timezone`, `global_setup`, `heartbeat`, `transfer_mode`, `transfer_interval`, `transfer_time`, `transaction_retention`, `command_retention`, `dev_log_retention`, `upload_log_retention`, `edit_policy`, `import_policy`, `mobile_policy`, `device_policy`, `api_policy`, `sync_mode`, `sync_time`, `visitor_policy`) VALUES
(1, '2021-11-09 13:25:39.180692', NULL, '2021-11-09 13:25:39.180692', NULL, 0, 0, 0, 1, 1, 1, 1, 1, 8, 0, 10, 1, 1, '00:00;14:05', 9999, 9999, 9999, 9999, 0, 0, 0, 3, 3, 1, '00:00;12:00', 0);

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
  `transaction_count` int(11) DEFAULT NULL,
  `fp_count` int(11) DEFAULT NULL,
  `fp_alg_ver` varchar(10) DEFAULT NULL,
  `face_count` int(11) DEFAULT NULL,
  `face_alg_ver` varchar(10) DEFAULT NULL,
  `fv_count` int(11) DEFAULT NULL,
  `fv_alg_ver` varchar(10) DEFAULT NULL,
  `palm_count` int(11) DEFAULT NULL,
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

INSERT INTO `iclock_terminal` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `sn`, `alias`, `ip_address`, `real_ip`, `state`, `terminal_tz`, `heartbeat`, `transfer_mode`, `transfer_interval`, `transfer_time`, `product_type`, `is_attendance`, `is_registration`, `purpose`, `controller_type`, `authentication`, `style`, `upload_flag`, `fw_ver`, `push_protocol`, `push_ver`, `language`, `is_tft`, `terminal_name`, `platform`, `oem_vendor`, `log_stamp`, `op_log_stamp`, `capture_stamp`, `user_count`, `transaction_count`, `fp_count`, `fp_alg_ver`, `face_count`, `face_alg_ver`, `fv_count`, `fv_alg_ver`, `palm_count`, `palm_alg_ver`, `lock_func`, `last_activity`, `upload_time`, `push_time`, `is_access`, `area_id`) VALUES
(6, '2021-11-09 14:15:10.534326', NULL, '2021-11-10 07:51:16.470295', NULL, 0, 'BOCK191760589', 'BCGI', '192.168.50.204', '192.168.50.204', 1, 8, 10, 1, 1, '00:00;14:05', 9, 1, 0, NULL, 0, 1, NULL, '1111100000', 'Ver 8.0.3.7-20181026', '2.2.14', NULL, 84, 0, NULL, NULL, NULL, '1636538102', '1636535458', NULL, 20, 67, 10, '10.0', 0, '-1.0', 0, NULL, NULL, NULL, 0, '2021-11-10 10:30:30.827840', '2021-11-09 14:26:45.618136', '2021-11-09 14:38:22.378654', 0, 2);

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
(4, 'DATA UPDATE USERINFO PIN=1	Name=Juan	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:36.038058', '2021-11-09 14:19:36.936114', '2021-11-09 14:19:39.260872', 0, NULL, 6),
(5, 'DATA UPDATE USERINFO PIN=19	Name=Lawrence	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:36.101702', '2021-11-09 14:19:36.936114', '2021-11-09 14:19:39.260872', 0, NULL, 6),
(6, 'DATA UPDATE USERINFO PIN=2	Name=RJ	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:36.143229', '2021-11-09 14:19:36.936114', '2021-11-09 14:19:39.260872', 0, NULL, 6),
(7, 'DATA UPDATE USERINFO PIN=20	Name=Joseph	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:36.183879', '2021-11-09 14:19:36.936114', '2021-11-09 14:19:39.260872', 0, NULL, 6),
(8, 'DATA UPDATE USERINFO PIN=21	Name=Ayesha	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:36.240074', '2021-11-09 14:19:36.936114', '2021-11-09 14:19:39.260872', 0, NULL, 6),
(9, 'DATA UPDATE USERINFO PIN=22	Name=Jelo	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:36.350431', '2021-11-09 14:19:36.936114', '2021-11-09 14:19:39.260872', 0, NULL, 6),
(10, 'DATA UPDATE USERINFO PIN=23	Name=Yow Lee	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:36.390545', '2021-11-09 14:19:36.936114', '2021-11-09 14:19:39.260872', 0, NULL, 6),
(11, 'DATA UPDATE USERINFO PIN=24	Name=Arjay	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:36.432144', '2021-11-09 14:19:36.936114', '2021-11-09 14:19:39.260872', 0, NULL, 6),
(12, 'DATA UPDATE USERINFO PIN=25	Name=Charles	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:36.477225', '2021-11-09 14:19:36.936114', '2021-11-09 14:19:39.260872', 0, NULL, 6),
(13, 'DATA UPDATE USERINFO PIN=26	Name=Mark	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:36.516163', '2021-11-09 14:19:36.936114', '2021-11-09 14:19:39.260872', 0, NULL, 6),
(14, 'DATA UPDATE USERINFO PIN=27	Name=Joseph	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:36.558289', '2021-11-09 14:19:36.936114', '2021-11-09 14:19:39.260872', 0, NULL, 6),
(15, 'DATA UPDATE USERINFO PIN=28	Name=Wilson	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:36.610466', '2021-11-09 14:19:36.936114', '2021-11-09 14:19:39.260872', 0, NULL, 6),
(16, 'DATA UPDATE USERINFO PIN=3	Name=Wilson	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:36.650149', '2021-11-09 14:19:36.936114', '2021-11-09 14:19:39.260872', 0, NULL, 6),
(17, 'DATA UPDATE USERINFO PIN=30	Name=Test	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:36.694601', '2021-11-09 14:19:36.936114', '2021-11-09 14:19:39.260872', 0, NULL, 6),
(18, 'DATA UPDATE USERINFO PIN=4	Name=Charles	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:36.867120', '2021-11-09 14:19:36.936114', '2021-11-09 14:19:39.260872', 0, NULL, 6),
(19, 'DATA UPDATE USERINFO PIN=5	Name=Mark	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:36.944299', '2021-11-09 14:19:40.106897', '2021-11-09 14:19:40.600057', 0, NULL, 6),
(20, 'DATA UPDATE USERINFO PIN=6	Name=Francis	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:37.050983', '2021-11-09 14:19:40.106897', '2021-11-09 14:19:40.600057', 0, NULL, 6),
(21, 'DATA UPDATE USERINFO PIN=7	Name=Renna	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:37.147241', '2021-11-09 14:19:40.106897', '2021-11-09 14:19:40.600057', 0, NULL, 6),
(22, 'DATA UPDATE USERINFO PIN=8	Name=Matthew	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:37.435826', '2021-11-09 14:19:40.106897', '2021-11-09 14:19:40.600057', 0, NULL, 6),
(23, 'DATA UPDATE USERINFO PIN=9	Name=Errol	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:19:37.510831', '2021-11-09 14:19:40.106897', '2021-11-09 14:19:40.600057', 0, NULL, 6),
(24, 'DATA UPDATE USERINFO PIN=1	Name=Juan	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:20.222644', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(25, 'DATA UPDATE USERINFO PIN=19	Name=Lawrence	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:20.302641', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(26, 'DATA UPDATE USERINFO PIN=2	Name=RJ	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:20.369559', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(27, 'DATA UPDATE USERINFO PIN=20	Name=Joseph	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:20.419623', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(28, 'DATA UPDATE USERINFO PIN=21	Name=Ayesha	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:20.447635', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(29, 'DATA UPDATE USERINFO PIN=22	Name=Jelo	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:20.480109', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(30, 'DATA UPDATE USERINFO PIN=23	Name=Yow Lee	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:20.513694', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(31, 'DATA UPDATE USERINFO PIN=24	Name=Arjay	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:20.546716', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(32, 'DATA UPDATE USERINFO PIN=25	Name=Charles	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:20.580726', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(33, 'DATA UPDATE USERINFO PIN=26	Name=Mark	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:20.613631', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(34, 'DATA UPDATE USERINFO PIN=27	Name=Joseph	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:20.648700', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(35, 'DATA UPDATE USERINFO PIN=28	Name=Wilson	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:20.669949', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(36, 'DATA UPDATE USERINFO PIN=3	Name=Wilson	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:20.694703', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(37, 'DATA UPDATE USERINFO PIN=30	Name=Test	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:20.726650', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(38, 'DATA UPDATE USERINFO PIN=4	Name=Charles	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:20.988914', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(39, 'DATA UPDATE USERINFO PIN=5	Name=Mark	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:21.044892', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(40, 'DATA UPDATE USERINFO PIN=6	Name=Francis	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:21.078852', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(41, 'DATA UPDATE USERINFO PIN=7	Name=Renna	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:21.102886', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(42, 'DATA UPDATE USERINFO PIN=8	Name=Matthew	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:21.136821', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(43, 'DATA UPDATE USERINFO PIN=9	Name=Errol	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:22:21.167155', '2021-11-09 14:22:22.513130', '2021-11-09 14:22:23.475380', 0, NULL, 6),
(44, 'DATA UPDATE USERINFO PIN=1	Name=Juan	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:38:22.388442', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(45, 'DATA UPDATE USERINFO PIN=19	Name=Lawrence	Pri=0	Passwd=	Card=		Grp=1	Verify=0', '2021-11-09 14:38:22.425206', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(46, 'DATA UPDATE USERINFO PIN=2	Name=RJ	Pri=0	Passwd=	Card=		Grp=1	Verify=0', '2021-11-09 14:38:22.490851', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(47, 'DATA UPDATE USERINFO PIN=20	Name=Joseph	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:38:22.550487', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(48, 'DATA UPDATE USERINFO PIN=21	Name=Ayesha	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:38:22.646429', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(49, 'DATA UPDATE USERINFO PIN=22	Name=Jelo	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:38:22.686944', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(50, 'DATA UPDATE USERINFO PIN=23	Name=Yow Lee	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:38:22.720238', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(51, 'DATA UPDATE USERINFO PIN=24	Name=Arjay	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:38:22.752077', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(52, 'DATA UPDATE USERINFO PIN=25	Name=Charles	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:38:22.784106', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(53, 'DATA UPDATE USERINFO PIN=26	Name=Mark	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:38:22.807770', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(54, 'DATA UPDATE USERINFO PIN=27	Name=Joseph	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:38:22.841782', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(55, 'DATA UPDATE USERINFO PIN=28	Name=Wilson	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:38:22.875799', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(56, 'DATA UPDATE USERINFO PIN=3	Name=Wilson	Pri=0	Passwd=	Card=		Grp=1	Verify=0', '2021-11-09 14:38:22.926143', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(57, 'DATA UPDATE USERINFO PIN=30	Name=Test	Pri=0	Passwd=	Card=		Grp=1	Verify=-1', '2021-11-09 14:38:23.152613', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(58, 'DATA UPDATE USERINFO PIN=4	Name=Charles	Pri=0	Passwd=	Card=		Grp=1	Verify=0', '2021-11-09 14:38:23.208240', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(59, 'DATA UPDATE USERINFO PIN=5	Name=Mark	Pri=0	Passwd=	Card=		Grp=1	Verify=0', '2021-11-09 14:38:23.240782', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(60, 'DATA UPDATE USERINFO PIN=6	Name=Francis	Pri=0	Passwd=	Card=		Grp=1	Verify=0', '2021-11-09 14:38:23.276656', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(61, 'DATA UPDATE USERINFO PIN=7	Name=Renna	Pri=0	Passwd=	Card=		Grp=1	Verify=0', '2021-11-09 14:38:23.308464', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(62, 'DATA UPDATE USERINFO PIN=8	Name=Matthew	Pri=0	Passwd=	Card=		Grp=1	Verify=0', '2021-11-09 14:38:23.340468', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(63, 'DATA UPDATE USERINFO PIN=9	Name=Errol	Pri=0	Passwd=	Card=		Grp=1	Verify=0', '2021-11-09 14:38:23.376977', '2021-11-09 14:38:31.470636', '2021-11-09 14:38:32.444528', 0, NULL, 6),
(64, 'CHECK', '2021-11-10 07:51:16.426766', '2021-11-10 07:52:52.703063', '2021-11-10 07:52:53.383126', 0, NULL, 6);

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
(18, 8, '0', 4, '2021-11-09 14:02:01.000000', '0', 0, 0, 0, '2021-11-09 14:19:34.962370', 6),
(19, 8, '0', 0, '2021-11-09 14:03:00.000000', '0', 0, 0, 0, '2021-11-09 14:19:38.211955', 6),
(20, 8, '0', 4, '2021-11-09 14:06:57.000000', '0', 0, 0, 0, '2021-11-09 14:19:38.273647', 6),
(21, 8, '0', 4, '2021-11-09 14:19:13.000000', '0', 0, 0, 0, '2021-11-09 14:19:38.477337', 6),
(22, 8, '0', 4, '2021-11-09 14:20:14.000000', '0', 0, 0, 0, '2021-11-09 14:20:16.391134', 6),
(23, 8, '1', 71, '2021-11-09 14:20:51.000000', '0', 0, 0, 0, '2021-11-09 14:20:52.565639', 6),
(24, 8, '1', 6, '2021-11-09 14:21:02.000000', '0', 0, 0, 0, '2021-11-09 14:21:04.580548', 6),
(25, 8, '1', 36, '2021-11-09 14:21:01.000000', '0', 0, 0, 0, '2021-11-09 14:21:04.653196', 6),
(26, 8, '0', 4, '2021-11-09 14:22:28.000000', '0', 0, 0, 0, '2021-11-09 14:22:29.646856', 6),
(27, 8, '2', 36, '2021-11-09 14:23:02.000000', '0', 0, 0, 0, '2021-11-09 14:23:04.442677', 6),
(28, 8, '3', 6, '2021-11-09 14:23:18.000000', '0', 0, 0, 0, '2021-11-09 14:23:21.408694', 6),
(29, 8, '4', 6, '2021-11-09 14:23:36.000000', '0', 0, 0, 0, '2021-11-09 14:23:38.681095', 6),
(30, 8, '5', 6, '2021-11-09 14:24:49.000000', '0', 0, 0, 0, '2021-11-09 14:24:51.062916', 6),
(31, 8, '6', 6, '2021-11-09 14:25:10.000000', '0', 0, 0, 0, '2021-11-09 14:25:12.484087', 6),
(32, 8, '6', 36, '2021-11-09 14:25:08.000000', '0', 0, 0, 0, '2021-11-09 14:25:12.524319', 6),
(33, 8, '0', 4, '2021-11-09 14:25:20.000000', '0', 0, 0, 0, '2021-11-09 14:25:22.054702', 6),
(34, 8, '7', 6, '2021-11-09 14:25:42.000000', '0', 0, 0, 0, '2021-11-09 14:25:45.416139', 6),
(35, 8, '7', 36, '2021-11-09 14:25:41.000000', '0', 0, 0, 0, '2021-11-09 14:25:45.526109', 6),
(36, 8, '8', 6, '2021-11-09 14:25:59.000000', '0', 0, 0, 0, '2021-11-09 14:26:00.716298', 6),
(37, 8, '8', 36, '2021-11-09 14:25:58.000000', '0', 0, 0, 0, '2021-11-09 14:26:00.763988', 6),
(38, 8, '9', 6, '2021-11-09 14:26:23.000000', '0', 0, 0, 0, '2021-11-09 14:26:26.876672', 6),
(39, 8, '9', 36, '2021-11-09 14:26:21.000000', '0', 0, 0, 0, '2021-11-09 14:26:26.972180', 6),
(40, 8, '19', 36, '2021-11-09 14:26:39.000000', '0', 0, 0, 0, '2021-11-09 14:26:41.031011', 6),
(41, 8, '0', 4, '2021-11-09 14:39:36.000000', '0', 0, 0, 0, '2021-11-09 14:39:38.519790', 6),
(42, 8, '0', 4, '2021-11-09 14:46:03.000000', '0', 0, 0, 0, '2021-11-09 14:46:06.139657', 6),
(43, 8, '0', 4, '2021-11-09 14:46:10.000000', '3002', 0, 0, 0, '2021-11-09 14:46:12.162740', 6),
(44, 8, '0', 4, '2021-11-09 14:46:13.000000', '3006', 0, 0, 0, '2021-11-09 14:46:15.094200', 6),
(45, 8, '0', 4, '2021-11-09 14:46:26.000000', '3007', 0, 0, 0, '2021-11-09 14:46:28.835034', 6),
(46, 8, '0', 4, '2021-11-09 14:46:33.000000', '3002', 0, 0, 0, '2021-11-09 14:46:35.188073', 6),
(47, 8, '0', 4, '2021-11-09 14:46:39.000000', '3006', 0, 0, 0, '2021-11-09 14:46:41.212952', 6),
(48, 8, '0', 4, '2021-11-09 14:47:08.000000', '3002', 0, 0, 0, '2021-11-09 14:47:13.074510', 6),
(49, 8, '0', 4, '2021-11-09 14:47:10.000000', '3007', 0, 0, 0, '2021-11-09 14:47:14.495161', 6),
(50, 8, '0', 4, '2021-11-09 14:47:15.000000', '3061', 0, 0, 0, '2021-11-09 14:47:18.525156', 6),
(51, 8, '0', 4, '2021-11-09 14:47:26.000000', '3006', 0, 0, 0, '2021-11-09 14:47:29.145974', 6),
(52, 8, '0', 4, '2021-11-09 14:48:43.000000', '0', 0, 0, 0, '2021-11-09 14:48:46.970797', 6),
(53, 8, '0', 0, '2021-11-10 07:10:18.000000', '0', 0, 0, 0, '2021-11-10 07:20:22.240599', 6),
(54, 8, '0', 4, '2021-11-10 07:14:50.000000', '0', 0, 0, 0, '2021-11-10 07:20:22.525942', 6),
(55, 8, '0', 4, '2021-11-10 07:15:15.000000', '0', 0, 0, 0, '2021-11-10 07:20:22.757799', 6),
(56, 8, '0', 4, '2021-11-10 07:40:52.000000', '0', 0, 0, 0, '2021-11-10 07:52:50.329570', 6),
(57, 8, '0', 4, '2021-11-10 07:42:17.000000', '0', 0, 0, 0, '2021-11-10 07:52:50.360961', 6),
(58, 8, '0', 4, '2021-11-10 07:43:49.000000', '0', 0, 0, 0, '2021-11-10 07:52:50.414145', 6),
(59, 8, '0', 4, '2021-11-10 07:50:04.000000', '0', 0, 0, 0, '2021-11-10 07:52:50.483157', 6),
(60, 8, '0', 4, '2021-11-10 07:51:49.000000', '0', 0, 0, 0, '2021-11-10 07:52:50.545659', 6);

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
(45, NULL, 'FWVersion', 'Ver 8.0.3.7-20181026', 6),
(46, NULL, 'UserCount', '20', 6),
(47, NULL, 'ZKFaceVersion', '-1', 6),
(48, NULL, 'FaceCount', '0', 6),
(49, NULL, 'IPAddress', '192.168.50.204', 6),
(50, NULL, 'TransactionCount', '67', 6),
(51, NULL, 'FPCount', '10', 6),
(52, NULL, 'faceTempNumber', '0', 6),
(53, NULL, 'Identifier', '101', 6),
(54, NULL, '~ZKFPVersion', '10', 6);

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
(3, 'Operation Log', '', 1, 0, '2021-11-09 14:19:36.936114', 6),
(4, 'Operation Log', ',,,,', 5, 0, '2021-11-09 14:19:38.524018', 6),
(5, 'Operation Log', '', 1, 0, '2021-11-09 14:20:16.415576', 6),
(6, 'Operation Log', '', 1, 0, '2021-11-09 14:20:52.626777', 6),
(7, 'User', '1', 1, 0, '2021-11-09 14:21:03.829431', 6),
(8, 'Operation Log', ',', 2, 0, '2021-11-09 14:21:04.706216', 6),
(9, 'Fingerprint Create', '1', 1, 0, '2021-11-09 14:21:07.286368', 6),
(10, 'Operation Log', '', 1, 0, '2021-11-09 14:22:29.678908', 6),
(11, 'Operation Log', '', 1, 0, '2021-11-09 14:23:04.492733', 6),
(12, 'Operation Log', '', 1, 0, '2021-11-09 14:23:05.155010', 6),
(13, 'User', '2', 1, 0, '2021-11-09 14:23:06.454036', 6),
(14, 'Fingerprint Create', '2', 1, 0, '2021-11-09 14:23:07.814232', 6),
(15, 'User', '3', 1, 0, '2021-11-09 14:23:19.912851', 6),
(16, 'Operation Log', ',', 2, 0, '2021-11-09 14:23:21.500789', 6),
(17, 'Fingerprint Create', '3', 1, 0, '2021-11-09 14:23:22.578481', 6),
(18, 'User', '4', 1, 0, '2021-11-09 14:23:37.326657', 6),
(19, 'Operation Log', ',', 2, 0, '2021-11-09 14:23:38.712876', 6),
(20, 'Fingerprint Create', '4', 1, 0, '2021-11-09 14:23:39.683421', 6),
(21, 'Operation Log', ',', 2, 0, '2021-11-09 14:24:51.112579', 6),
(22, 'User', '5', 1, 0, '2021-11-09 14:24:52.012455', 6),
(23, 'Fingerprint Create', '5', 1, 0, '2021-11-09 14:24:53.922713', 6),
(24, 'User', '6', 1, 0, '2021-11-09 14:25:12.025203', 6),
(25, 'Operation Log', ',', 2, 0, '2021-11-09 14:25:12.564072', 6),
(26, 'Fingerprint Create', '6', 1, 0, '2021-11-09 14:25:14.022539', 6),
(27, 'Operation Log', '', 1, 0, '2021-11-09 14:25:22.182851', 6),
(28, 'User', '7', 1, 0, '2021-11-09 14:25:44.166913', 6),
(29, 'Operation Log', ',', 2, 0, '2021-11-09 14:25:45.661232', 6),
(30, 'Fingerprint Create', '7', 1, 0, '2021-11-09 14:25:46.182873', 6),
(31, 'User', '8', 1, 0, '2021-11-09 14:25:59.479515', 6),
(32, 'Operation Log', ',', 2, 0, '2021-11-09 14:26:00.792446', 6),
(33, 'Fingerprint Create', '8', 1, 0, '2021-11-09 14:26:02.246205', 6),
(34, 'User', '9', 1, 0, '2021-11-09 14:26:24.854720', 6),
(35, 'Operation Log', ',', 2, 0, '2021-11-09 14:26:27.134958', 6),
(36, 'Fingerprint Create', '9', 1, 0, '2021-11-09 14:26:28.362649', 6),
(37, 'Operation Log', '', 1, 0, '2021-11-09 14:26:41.070627', 6),
(38, 'Operation Log', '', 1, 0, '2021-11-09 14:26:42.172950', 6),
(39, 'User', '19', 1, 0, '2021-11-09 14:26:43.739014', 6),
(40, 'Fingerprint Create', '19', 1, 0, '2021-11-09 14:26:45.645860', 6),
(41, 'Operation Log', '', 1, 0, '2021-11-09 14:39:38.560209', 6),
(42, 'Operation Log', '', 1, 0, '2021-11-09 14:46:06.265327', 6),
(43, 'Operation Log', '', 1, 0, '2021-11-09 14:46:12.284457', 6),
(44, 'Operation Log', '', 1, 0, '2021-11-09 14:46:15.164646', 6),
(45, 'Operation Log', '', 1, 0, '2021-11-09 14:46:28.863828', 6),
(46, 'Operation Log', '', 1, 0, '2021-11-09 14:46:35.224898', 6),
(47, 'Operation Log', '', 1, 0, '2021-11-09 14:46:41.240792', 6),
(48, 'Operation Log', '', 1, 0, '2021-11-09 14:47:13.118024', 6),
(49, 'Operation Log', '', 1, 0, '2021-11-09 14:47:14.544737', 6),
(50, 'Operation Log', '', 1, 0, '2021-11-09 14:47:18.563098', 6),
(51, 'Operation Log', '', 1, 0, '2021-11-09 14:47:29.207300', 6),
(52, 'Operation Log', '', 1, 0, '2021-11-09 14:48:47.057352', 6),
(53, 'Operation Log', ',,,', 4, 0, '2021-11-10 07:20:23.043424', 6),
(54, 'Operation Log', ',,,,', 5, 0, '2021-11-10 07:52:50.561283', 6),
(55, 'Operation Log', '', 1, 0, '2021-11-10 09:10:59.014241', 6);

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
(1, '1', '2021-11-09 14:21:06.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEACABAAAGA', 1, NULL, '2021-11-09 14:21:08.855896', NULL, NULL, 255, '255.0', 1, 6),
(2, '1', '2021-11-09 14:26:43.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEACAGAEADA', 1, NULL, '2021-11-09 14:26:44.505270', NULL, NULL, 255, '255.0', 1, 6),
(3, '1', '2021-11-09 14:27:08.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEACAHAAAIA', 1, NULL, '2021-11-09 14:27:10.796332', NULL, NULL, 255, '255.0', 1, 6),
(4, '2', '2021-11-09 14:27:12.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEACAHABACA', 1, NULL, '2021-11-09 14:27:13.908674', NULL, NULL, 255, '255.0', 2, 6),
(5, '3', '2021-11-09 14:27:15.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEACAHABAFA', 1, NULL, '2021-11-09 14:27:16.021781', NULL, NULL, 255, '255.0', 3, 6),
(6, '4', '2021-11-09 14:27:16.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEACAHABAGA', 1, NULL, '2021-11-09 14:27:18.162530', NULL, NULL, 255, '255.0', 4, 6),
(7, '19', '2021-11-09 14:27:19.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEACAHABAJA', 1, NULL, '2021-11-09 14:27:21.352620', NULL, NULL, 255, '255.0', 10, 6),
(8, '8', '2021-11-09 14:27:22.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEACAHACACA', 1, NULL, '2021-11-09 14:27:23.453857', NULL, NULL, 255, '255.0', 8, 6),
(9, '9', '2021-11-09 14:27:26.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEACAHACAGA', 1, NULL, '2021-11-09 14:27:27.566869', NULL, NULL, 255, '255.0', 9, 6),
(10, '7', '2021-11-09 14:27:28.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEACAHACAIA', 1, NULL, '2021-11-09 14:27:29.707388', NULL, NULL, 255, '255.0', 7, 6),
(11, '6', '2021-11-09 14:27:30.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEACAHADAAA', 1, NULL, '2021-11-09 14:27:31.828495', NULL, NULL, 255, '255.0', 6, 6),
(12, '1', '2021-11-09 14:41:15.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEAEABABAFA', 1, NULL, '2021-11-09 14:41:17.136875', NULL, NULL, 255, '255.0', 1, 6),
(13, '1', '2021-11-09 14:48:23.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEAEAIACADA', 1, NULL, '2021-11-09 14:48:24.730076', NULL, NULL, 255, '255.0', 1, 6),
(14, '1', '2021-11-09 14:49:04.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEAEAJAAAEA', 1, NULL, '2021-11-09 14:49:07.070775', NULL, NULL, 255, '255.0', 1, 6),
(15, '1', '2021-11-09 14:49:38.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEAEAJADAIA', 1, NULL, '2021-11-09 14:49:40.327311', NULL, NULL, 255, '255.0', 1, 6),
(16, '1', '2021-11-09 14:52:04.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEAFACAAAEA', 1, NULL, '2021-11-09 14:52:05.634032', NULL, NULL, 255, '255.0', 1, 6),
(17, '1', '2021-11-09 14:58:40.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAEAFAIAEAAA', 1, NULL, '2021-11-09 14:58:42.096193', NULL, NULL, 255, '255.0', 1, 6),
(18, '1', '2021-11-09 15:04:11.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAFAAAEABABA', 1, NULL, '2021-11-09 15:04:13.553271', NULL, NULL, 255, '255.0', 1, 6),
(19, '1', '2021-11-09 15:13:36.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAFABADADAGA', 1, NULL, '2021-11-09 15:13:38.307040', NULL, NULL, 255, '255.0', 1, 6),
(20, '1', '2021-11-09 15:27:10.000000', '1', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABAAAJABAFACAHABAAA', 1, NULL, '2021-11-09 15:27:12.153055', NULL, NULL, 255, '255.0', 1, 6),
(21, '1', '2021-11-10 07:14:54.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAHABAEAFAEA', 1, NULL, '2021-11-10 07:20:19.457192', NULL, NULL, 255, '255.0', 1, 6),
(22, '2', '2021-11-10 07:14:57.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAHABAEAFAHA', 1, NULL, '2021-11-10 07:20:20.413277', NULL, NULL, 255, '255.0', 2, 6),
(23, '3', '2021-11-10 07:14:59.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAHABAEAFAJA', 1, NULL, '2021-11-10 07:20:20.475778', NULL, NULL, 255, '255.0', 3, 6),
(24, '4', '2021-11-10 07:15:01.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAHABAFAAABA', 1, NULL, '2021-11-10 07:20:20.789883', NULL, NULL, 255, '255.0', 4, 6),
(25, '5', '2021-11-10 07:15:06.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAHABAFAAAGA', 1, NULL, '2021-11-10 07:20:21.190922', NULL, NULL, 255, '255.0', 5, 6),
(26, '1', '2021-11-10 08:10:32.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAIABAAADACA', 1, NULL, '2021-11-10 08:10:25.761885', NULL, NULL, 255, '255.0', 1, 6),
(27, '2', '2021-11-10 08:10:56.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAIABAAAFAGA', 1, NULL, '2021-11-10 08:10:50.577127', NULL, NULL, 255, '255.0', 2, 6),
(28, '3', '2021-11-10 08:11:00.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAIABABAAAAA', 1, NULL, '2021-11-10 08:10:54.698122', NULL, NULL, 255, '255.0', 3, 6),
(29, '2', '2021-11-10 08:11:14.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAIABABABAEA', 1, NULL, '2021-11-10 08:11:06.881966', NULL, NULL, 255, '255.0', 2, 6),
(30, '3', '2021-11-10 08:11:50.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAIABABAFAAA', 1, NULL, '2021-11-10 08:11:44.008951', NULL, NULL, 255, '255.0', 3, 6),
(31, '3', '2021-11-10 08:11:53.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAIABABAFADA', 1, NULL, '2021-11-10 08:11:47.149042', NULL, NULL, 255, '255.0', 3, 6),
(32, '5', '2021-11-10 08:13:42.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAIABADAEACA', 1, NULL, '2021-11-10 08:13:36.355854', NULL, NULL, 255, '255.0', 5, 6),
(33, '2', '2021-11-10 08:17:45.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAIABAHAEAFA', 1, NULL, '2021-11-10 08:17:38.849987', NULL, NULL, 255, '255.0', 2, 6),
(34, '2', '2021-11-10 08:17:48.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAIABAHAEAIA', 1, NULL, '2021-11-10 08:17:42.266198', NULL, NULL, 255, '255.0', 2, 6),
(35, '1', '2021-11-10 08:44:44.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAIAEAEAEAEA', 1, NULL, '2021-11-10 08:44:37.300263', NULL, NULL, 255, '255.0', 1, 6),
(36, '2', '2021-11-10 08:44:57.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAIAEAEAFAHA', 1, NULL, '2021-11-10 08:44:50.506491', NULL, NULL, 255, '255.0', 2, 6),
(37, '1', '2021-11-10 08:44:59.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAIAEAEAFAJA', 1, NULL, '2021-11-10 08:44:53.907418', NULL, NULL, 255, '255.0', 1, 6),
(38, '3', '2021-11-10 08:45:02.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAIAEAFAAACA', 1, NULL, '2021-11-10 08:44:56.319165', NULL, NULL, 255, '255.0', 3, 6),
(39, '4', '2021-11-10 08:45:05.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAIAEAFAAAFA', 1, NULL, '2021-11-10 08:44:58.624385', NULL, NULL, 255, '255.0', 4, 6),
(40, '2', '2021-11-10 08:46:39.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAIAEAGADAJA', 1, NULL, '2021-11-10 08:46:32.875313', NULL, NULL, 255, '255.0', 2, 6),
(41, '3', '2021-11-10 08:53:59.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAIAFADAFAJA', 1, NULL, '2021-11-10 08:53:52.362189', NULL, NULL, 255, '255.0', 3, 6),
(42, '4', '2021-11-10 09:01:53.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJAAABAFADA', 1, NULL, '2021-11-10 09:01:47.108988', NULL, NULL, 255, '255.0', 4, 6),
(43, '2', '2021-11-10 09:10:12.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJABAAABACA', 1, NULL, '2021-11-10 09:10:05.693023', NULL, NULL, 255, '255.0', 2, 6),
(44, '3', '2021-11-10 09:10:15.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJABAAABAFA', 1, NULL, '2021-11-10 09:10:09.026321', NULL, NULL, 255, '255.0', 3, 6),
(45, '4', '2021-11-10 09:10:18.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJABAAABAIA', 1, NULL, '2021-11-10 09:10:12.193340', NULL, NULL, 255, '255.0', 4, 6),
(46, '5', '2021-11-10 09:10:21.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJABAAACABA', 1, NULL, '2021-11-10 09:10:15.334477', NULL, NULL, 255, '255.0', 5, 6),
(47, '1', '2021-11-10 09:11:01.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJABABAAABA', 1, NULL, '2021-11-10 09:10:57.404586', NULL, NULL, 255, '255.0', 1, 6),
(48, '1', '2021-11-10 09:11:40.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJABABAEAAA', 1, NULL, '2021-11-10 09:11:33.790747', NULL, NULL, 255, '255.0', 1, 6),
(49, '2', '2021-11-10 09:22:29.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJACACACAJA', 1, NULL, '2021-11-10 09:22:23.508015', NULL, NULL, 255, '255.0', 2, 6),
(50, '2', '2021-11-10 09:24:00.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJACAEAAAAA', 1, NULL, '2021-11-10 09:23:53.682159', NULL, NULL, 255, '255.0', 2, 6),
(51, '1', '2021-11-10 09:24:02.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJACAEAAACA', 1, NULL, '2021-11-10 09:23:56.808373', NULL, NULL, 255, '255.0', 1, 6),
(52, '1', '2021-11-10 09:24:05.000000', '4', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJACAEAAAFA', 1, NULL, '2021-11-10 09:23:58.920078', NULL, NULL, 255, '255.0', 1, 6),
(53, '4', '2021-11-10 09:24:23.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJACAEACADA', 1, NULL, '2021-11-10 09:24:16.062909', NULL, NULL, 255, '255.0', 4, 6),
(54, '3', '2021-11-10 09:29:54.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJACAJAFAEA', 1, NULL, '2021-11-10 09:29:48.460812', NULL, NULL, 255, '255.0', 3, 6),
(55, '5', '2021-11-10 09:30:34.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJADAAADAEA', 1, NULL, '2021-11-10 09:30:27.648618', NULL, NULL, 255, '255.0', 5, 6),
(56, '2', '2021-11-10 09:33:08.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJADADAAAIA', 1, NULL, '2021-11-10 09:33:01.984924', NULL, NULL, 255, '255.0', 2, 6),
(57, '6', '2021-11-10 09:54:24.000000', '5', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJAFAEACAEA', 1, NULL, '2021-11-10 09:54:17.466355', NULL, NULL, 255, '255.0', 6, 6),
(58, '6', '2021-11-10 09:54:36.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJAFAEADAGA', 1, NULL, '2021-11-10 09:54:29.645056', NULL, NULL, 255, '255.0', 6, 6),
(59, '7', '2021-11-10 09:54:39.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJAFAEADAJA', 1, NULL, '2021-11-10 09:54:32.914980', NULL, NULL, 255, '255.0', 7, 6),
(60, '8', '2021-11-10 09:54:42.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJAFAEAEACA', 1, NULL, '2021-11-10 09:54:35.145104', NULL, NULL, 255, '255.0', 8, 6),
(61, '9', '2021-11-10 09:54:44.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJAFAEAEAEA', 1, NULL, '2021-11-10 09:54:38.424975', NULL, NULL, 255, '255.0', 9, 6),
(62, '19', '2021-11-10 09:54:47.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJAFAEAEAHA', 1, NULL, '2021-11-10 09:54:40.567544', NULL, NULL, 255, '255.0', 10, 6),
(63, '5', '2021-11-10 09:54:50.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJAFAEAFAAA', 1, NULL, '2021-11-10 09:54:44.745472', NULL, NULL, 255, '255.0', 5, 6),
(64, '4', '2021-11-10 09:54:54.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJAFAEAFAEA', 1, NULL, '2021-11-10 09:54:46.855150', NULL, NULL, 255, '255.0', 4, 6),
(65, '3', '2021-11-10 09:54:56.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJAFAEAFAGA', 1, NULL, '2021-11-10 09:54:49.996626', NULL, NULL, 255, '255.0', 3, 6),
(66, '1', '2021-11-10 09:54:59.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJAFAEAFAJA', 1, NULL, '2021-11-10 09:54:53.117311', NULL, NULL, 255, '255.0', 1, 6),
(67, '2', '2021-11-10 09:55:02.000000', '0', 1, '', 'BOCK191760589', 'BCGI', 'Pasig City', NULL, NULL, NULL, '1', 1, 9, 'CAAACABABABABAAAAAJAFAFAAACA', 1, NULL, '2021-11-10 09:54:56.290455', NULL, NULL, 255, '255.0', 2, 6);

--
-- Triggers `iclock_transaction`
--
DELIMITER $$
CREATE TRIGGER `iclock_transaction_AFTER_INSERT` AFTER INSERT ON `iclock_transaction` FOR EACH ROW BEGIN
	DECLARE inEmployeeID  VARCHAR(100)  DEFAULT '0';
    DECLARE inPunchStatus INT(6)        DEFAULT 0;
    DECLARE inPunchTime   DATETIME      DEFAULT NULL;
    DECLARE inBreakID     BIGINT(21)    DEFAULT 0;
    DECLARE inBreakIn     DATETIME      DEFAULT NULL;
    DECLARE inBreakOut    DATETIME      DEFAULT NULL;
    DECLARE inDuration    DECIMAL(10,2) DEFAULT 0.00;
    
    SET inEmployeeID  = NEW.emp_code;
	SET inPunchStatus = NEW.punch_state;
    SET inPunchTime   = NEW.punch_time;
        
    IF (inPunchStatus = 4 OR inPunchStatus = 5) THEN
		IF inPunchStatus = 5 THEN
			SELECT 
				breakOut INTO inBreakOut 
			FROM  
				#erpdb_backup.hris_attendance_break_tbl 
                #erpdb.hris_attendance_break_tbl
                hris_attendance_break_tbl
			WHERE employeeID = inEmployeeID 
			ORDER BY breakID 
			DESC LIMIT 1;
			
			IF inBreakOut IS NULL THEN
				SELECT 
					breakID INTO inBreakID 
				FROM 
					#erpdb_backup.hris_attendance_break_tbl 
                    #erpdb.hris_attendance_break_tbl 
                    hris_attendance_break_tbl
				WHERE employeeID = inEmployeeID 
				ORDER BY breakID 
				DESC LIMIT 1;
			END IF;
            
            SELECT breakIn INTO inBreakIn 
            FROM 
				#erpdb_backup.hris_attendance_break_tbl 
                #erpdb.hris_attendance_break_tbl 
                hris_attendance_break_tbl 
			WHERE breakID = inBreakID;
            
            IF inBreakIn IS NOT NULL THEN
				SET inDuration = (SELECT (TIMESTAMPDIFF(SECOND, inBreakIn, inPunchTime) / 3600));
			ELSE
				SET inDuration = 0;
            END IF;
		END IF;
		
		IF (inBreakID = 0 AND inPunchStatus = 4) THEN
			INSERT INTO 
				#erpdb_backup.hris_attendance_break_tbl 
				#erpdb.hris_attendance_break_tbl 
                hris_attendance_break_tbl
            (employeeID, breakIn, breakDuration) 
            VALUES (inEmployeeID, inPunchTime, inDuration);
		ELSE 
			UPDATE 
				#erpdb_backup.hris_attendance_break_tbl 
				#erpdb.hris_attendance_break_tbl 
                hris_attendance_break_tbl
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
  `room_id` int(11) DEFAULT NULL,
  `auto_recording` varchar(50) NOT NULL,
  `enable_virtual` tinyint(1) NOT NULL,
  `enable_waiting_room` tinyint(1) NOT NULL,
  `host_video` tinyint(1) NOT NULL,
  `jbh_anytime` tinyint(1) NOT NULL,
  `link_data` longtext DEFAULT NULL,
  `mute_upon_entry` tinyint(1) NOT NULL,
  `participant_video` tinyint(1) NOT NULL,
  `preferences` longtext DEFAULT NULL,
  `time_zone` smallint(6) NOT NULL,
  `view_date` date NOT NULL,
  `virutal_uuid` varchar(50) DEFAULT NULL
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
-- Table structure for table `mobile_mobileapirequestlog`
--

CREATE TABLE `mobile_mobileapirequestlog` (
  `id` int(11) NOT NULL,
  `username_persistent` varchar(200) DEFAULT NULL,
  `requested_at` datetime(6) NOT NULL,
  `response_ms` int(10) UNSIGNED NOT NULL,
  `path` varchar(200) NOT NULL,
  `view` varchar(200) DEFAULT NULL,
  `view_method` varchar(200) DEFAULT NULL,
  `remote_addr` char(39) NOT NULL,
  `host` varchar(200) NOT NULL,
  `method` varchar(10) NOT NULL,
  `query_params` longtext DEFAULT NULL,
  `data` longtext DEFAULT NULL,
  `response` longtext DEFAULT NULL,
  `errors` longtext DEFAULT NULL,
  `status_code` int(10) UNSIGNED DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
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
(1, 1, 1, '', '', '', '', '', 1),
(2, 1, 1, '', '', '', '', '', 10),
(3, 1, 1, '', '', '', '', '', 2),
(4, 1, 1, '', '', '', '', '', 11),
(5, 1, 1, '', '', '', '', '', 12),
(6, 1, 1, '', '', '', '', '', 13),
(7, 1, 1, '', '', '', '', '', 14),
(8, 1, 1, '', '', '', '', '', 15),
(9, 1, 1, '', '', '', '', '', 16),
(10, 1, 1, '', '', '', '', '', 17),
(11, 1, 1, '', '', '', '', '', 18),
(12, 1, 1, '', '', '', '', '', 19),
(13, 1, 1, '', '', '', '', '', 3),
(14, 1, 1, '', '', '', '', '', 20),
(15, 1, 1, '', '', '', '', '', 4),
(16, 1, 1, '', '', '', '', '', 5),
(17, 1, 1, '', '', '', '', '', 6),
(18, 1, 1, '', '', '', '', '', 7),
(19, 1, 1, '', '', '', '', '', 8),
(20, 1, 1, '', '', '', '', '', 9);

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
  `emp_type` smallint(6) DEFAULT NULL,
  `enable_payroll` tinyint(1) NOT NULL,
  `app_status` smallint(6) DEFAULT NULL,
  `app_role` smallint(6) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `session_key` varchar(32) DEFAULT NULL,
  `login_ip` varchar(32) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `position_id` int(11) DEFAULT NULL,
  `leave_group` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `personnel_employee`
--

INSERT INTO `personnel_employee` (`id`, `create_time`, `create_user`, `change_time`, `change_user`, `status`, `emp_code`, `first_name`, `last_name`, `nickname`, `passport`, `driver_license_automobile`, `driver_license_motorcycle`, `photo`, `self_password`, `device_password`, `dev_privilege`, `card_no`, `acc_group`, `acc_timezone`, `gender`, `birthday`, `address`, `postcode`, `office_tel`, `contact_tel`, `mobile`, `national`, `religion`, `title`, `enroll_sn`, `ssn`, `update_time`, `hire_date`, `verify_mode`, `city`, `emp_type`, `enable_payroll`, `app_status`, `app_role`, `email`, `last_login`, `is_active`, `session_key`, `login_ip`, `department_id`, `position_id`, `leave_group`) VALUES
(1, '2021-11-10 09:37:29.000000', NULL, '2021-11-10 09:37:29.000000', NULL, 0, '1', 'Juan', 'Dela Cruz', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', '2020-04-08', -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(2, '2021-11-10 10:09:10.000000', NULL, '2021-11-10 10:09:10.000000', NULL, 0, '2', 'RJ', 'Diangzon', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', '2018-05-15', -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(3, '2021-11-10 10:09:10.000000', NULL, '2021-11-10 10:09:10.000000', NULL, 0, '3', 'Wilson', 'Parajas', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', '2021-05-01', -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(4, '2021-11-10 10:09:10.000000', NULL, '2021-11-10 10:09:10.000000', NULL, 0, '4', 'Charles', 'Verdadero', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', '2021-04-27', -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(5, '2021-11-10 10:09:10.000000', NULL, '2021-11-10 10:09:10.000000', NULL, 0, '5', 'Mark', 'Nieto', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', '2021-05-06', -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(6, '2021-11-10 10:09:10.000000', NULL, '2021-11-10 10:09:10.000000', NULL, 0, '6', 'Francis', 'Bolster', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', '2017-02-06', -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(7, '2021-11-10 10:09:10.000000', NULL, '2021-11-10 10:09:10.000000', NULL, 0, '7', 'Renna', 'Telesforo', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', '2020-07-02', -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(8, '2021-11-09 14:21:19.000000', NULL, '2021-11-09 14:21:19.000000', NULL, 0, '8', 'Matthew', 'Isaac', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', '2021-05-01', 0, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(9, '2021-11-10 10:09:10.000000', NULL, '2021-11-10 10:09:10.000000', NULL, 0, '9', 'Errol', 'Garcia', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', '2020-03-12', -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(10, '2021-11-10 10:09:11.000000', NULL, '2021-11-10 10:09:11.000000', NULL, 0, '19', 'Lawrence', 'Mark', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', '2021-04-13', -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(11, '2021-11-10 10:09:11.000000', NULL, '2021-11-10 10:09:11.000000', NULL, 0, '20', 'Joseph', 'Berongoy', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', '2019-10-21', -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(12, '2021-11-10 10:09:11.000000', NULL, '2021-11-10 10:09:11.000000', NULL, 0, '21', 'Ayesha', 'Porras', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', '2021-05-03', -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(13, '2021-11-10 10:09:11.000000', NULL, '2021-11-10 10:09:11.000000', NULL, 0, '22', 'Jelo', 'De Guzman', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', '2020-01-06', -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(14, '2021-11-10 10:09:11.000000', NULL, '2021-11-10 10:09:11.000000', NULL, 0, '23', 'Yow Lee', 'Rah Me Zares', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', '2020-04-03', -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(15, '2021-11-09 14:21:19.000000', NULL, '2021-11-09 14:21:19.000000', NULL, 0, '24', 'Arjay', 'Diangzon', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', NULL, -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(16, '2021-11-09 14:21:19.000000', NULL, '2021-11-09 14:21:19.000000', NULL, 0, '25', 'Charles', 'Verdadero', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', NULL, -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(17, '2021-11-09 14:21:19.000000', NULL, '2021-11-09 14:21:19.000000', NULL, 0, '26', 'Mark', 'Gil', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', NULL, -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(18, '2021-11-09 14:21:19.000000', NULL, '2021-11-09 14:21:19.000000', NULL, 0, '27', 'Joseph', 'Berongoy', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', NULL, -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(19, '2021-11-09 14:21:20.000000', NULL, '2021-11-09 14:21:20.000000', NULL, 0, '28', 'Wilson', 'Parajas', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', NULL, -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL),
(20, '2021-11-09 14:21:20.000000', NULL, '2021-11-09 14:21:20.000000', NULL, 0, '30', 'Test', 'Person', NULL, NULL, NULL, NULL, '', 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, '2021-11-09 14:38:21.562077', NULL, -1, NULL, 1, 1, 0, 1, NULL, NULL, 1, NULL, NULL, 1, 1, NULL);

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
  `employee_id` int(11) NOT NULL,
  `certification_code` varchar(20) DEFAULT NULL,
  `file` varchar(200) DEFAULT NULL,
  `file_name` varchar(200) DEFAULT NULL
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
  `enable` tinyint(1) NOT NULL,
  `is_unique` tinyint(1) NOT NULL
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
-- Table structure for table `personnel_employeeprofile`
--

CREATE TABLE `personnel_employeeprofile` (
  `id` int(11) NOT NULL,
  `column_order` longtext NOT NULL,
  `preferences` longtext NOT NULL,
  `pwd_update_time` datetime(6) DEFAULT NULL,
  `emp_id` int(11) NOT NULL,
  `disabled_fields` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(3, 1, 2),
(4, 2, 2),
(5, 3, 2),
(6, 4, 2),
(7, 5, 2),
(8, 6, 2),
(9, 7, 2),
(10, 8, 2),
(11, 9, 2),
(12, 10, 2),
(13, 11, 2),
(14, 12, 2),
(15, 13, 2),
(16, 14, 2),
(17, 15, 2),
(18, 16, 2),
(19, 17, 2),
(20, 18, 2),
(21, 19, 2),
(22, 20, 2);

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
-- Table structure for table `rest_framework_tracking_apirequestlog`
--

CREATE TABLE `rest_framework_tracking_apirequestlog` (
  `id` int(11) NOT NULL,
  `requested_at` datetime(6) NOT NULL,
  `response_ms` int(10) UNSIGNED NOT NULL,
  `path` varchar(200) NOT NULL,
  `remote_addr` char(39) NOT NULL,
  `host` varchar(200) NOT NULL,
  `method` varchar(10) NOT NULL,
  `query_params` longtext DEFAULT NULL,
  `data` longtext DEFAULT NULL,
  `response` longtext DEFAULT NULL,
  `status_code` int(10) UNSIGNED DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `view` varchar(200) DEFAULT NULL,
  `view_method` varchar(200) DEFAULT NULL,
  `errors` longtext DEFAULT NULL,
  `username_persistent` varchar(200)
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
-- Table structure for table `visitor_visitorbiodata`
--

CREATE TABLE `visitor_visitorbiodata` (
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
-- Table structure for table `visitor_visitorbiophoto`
--

CREATE TABLE `visitor_visitorbiophoto` (
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
  `visitor_id` int(11) NOT NULL
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
(1, '2021-11-09 13:25:59.221719', NULL, '2021-11-09 13:25:59.221719', NULL, 0, 1, 'V', 8, 1);

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
-- Table structure for table `visitor_visitortransaction`
--

CREATE TABLE `visitor_visitortransaction` (
  `id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `visitor_code` varchar(50) NOT NULL,
  `area` varchar(30) NOT NULL,
  `punch_time` datetime(6) DEFAULT NULL,
  `punch_state` varchar(5) NOT NULL,
  `verify_type` int(11) NOT NULL,
  `temperature` decimal(4,1) NOT NULL,
  `is_mask` int(11) NOT NULL,
  `upload_time` datetime(6) NOT NULL,
  `source` smallint(6) NOT NULL,
  `terminal_sn` varchar(50) DEFAULT NULL,
  `terminal_alias` varchar(50) DEFAULT NULL,
  `terminal_id` int(11) DEFAULT NULL,
  `visitor_id` int(11) DEFAULT NULL
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
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_attpolicy_ot_pay_code_id_b189b952_fk_att_paycode_id` (`ot_pay_code_id`);

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
  ADD KEY `att_departmentpolicy_department_id_77059a9d_fk_personnel` (`department_id`),
  ADD KEY `att_departmentpolicy_ot_pay_code_id_390411dd_fk_att_paycode_id` (`ot_pay_code_id`);

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
  ADD KEY `att_grouppolicy_group_id_b2e4dfe8_fk_att_attgroup_id` (`group_id`),
  ADD KEY `att_grouppolicy_ot_pay_code_id_1ec83080_fk_att_paycode_id` (`ot_pay_code_id`);

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
-- Indexes for table `att_leavegroup`
--
ALTER TABLE `att_leavegroup`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `att_leavegroupdetail`
--
ALTER TABLE `att_leavegroupdetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_leavegroupdetail_leave_group_id_28f69ada_fk_att_leave` (`leave_group_id`),
  ADD KEY `att_leavegroupdetail_pay_code_id_5013b373_fk_att_paycode_id` (`pay_code_id`);

--
-- Indexes for table `att_leaveyearbalance`
--
ALTER TABLE `att_leaveyearbalance`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `att_leaveyearbalance_employee_id_year_pay_code_id_2ec71517_uniq` (`employee_id`,`year`,`pay_code_id`),
  ADD KEY `att_leaveyearbalance_pay_code_id_82632aca_fk_att_paycode_id` (`pay_code_id`),
  ADD KEY `att_leaveyearbalance_employee_id_14febdb3` (`employee_id`);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `att_reporttemplate_builder_id_e1bb15c6_fk_auth_user_id` (`builder_id`);

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
  ADD UNIQUE KEY `alias` (`alias`),
  ADD KEY `att_timeinterval_ot_pay_code_id_17438af8_fk_att_paycode_id` (`ot_pay_code_id`);

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
-- Indexes for table `att_webpunch`
--
ALTER TABLE `att_webpunch`
  ADD PRIMARY KEY (`workflowinstance_ptr_id`);

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
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `hris_attendance_break_tbl`
--
ALTER TABLE `hris_attendance_break_tbl`
  ADD PRIMARY KEY (`breakID`);

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
-- Indexes for table `mobile_mobileapirequestlog`
--
ALTER TABLE `mobile_mobileapirequestlog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mobile_mobileapirequ_user_id_dfd3ded1_fk_personnel` (`user_id`),
  ADD KEY `mobile_mobileapirequestlog_requested_at_a8c85067` (`requested_at`),
  ADD KEY `mobile_mobileapirequestlog_path_830043b5` (`path`),
  ADD KEY `mobile_mobileapirequestlog_view_50dbf600` (`view`),
  ADD KEY `mobile_mobileapirequestlog_view_method_2e13cf95` (`view_method`),
  ADD KEY `mobile_mobileapirequestlog_status_code_c2de0c48` (`status_code`);

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
-- Indexes for table `rest_framework_tracking_apirequestlog`
--
ALTER TABLE `rest_framework_tracking_apirequestlog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rest_framework_tracking_apirequestlog_requested_at_b6f1c2f2` (`requested_at`),
  ADD KEY `rest_framework_tracking_apirequestlog_path_fe81f91b` (`path`),
  ADD KEY `rest_framework_tracking_apirequestlog_view_5bd1e407` (`view`),
  ADD KEY `rest_framework_tracking_apirequestlog_view_method_dd790881` (`view_method`),
  ADD KEY `rest_framework_track_user_id_671b70b7_fk_auth_user` (`user_id`),
  ADD KEY `rest_framework_tracking_apirequestlog_status_code_3c9e2003` (`status_code`);

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
-- Indexes for table `visitor_visitorbiodata`
--
ALTER TABLE `visitor_visitorbiodata`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `visitor_visitorbiodata_visitor_id_bio_no_bio_in_e5d598fb_uniq` (`visitor_id`,`bio_no`,`bio_index`,`bio_type`,`bio_format`,`major_ver`);

--
-- Indexes for table `visitor_visitorbiophoto`
--
ALTER TABLE `visitor_visitorbiophoto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `visitor_visitorbioph_visitor_id_9816daf7_fk_visitor_v` (`visitor_id`);

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
-- Indexes for table `visitor_visitortransaction`
--
ALTER TABLE `visitor_visitortransaction`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `visitor_visitortransaction_visitor_id_punch_time_836abbcf_uniq` (`visitor_id`,`punch_time`),
  ADD KEY `visitor_visitortrans_terminal_id_7527ef69_fk_iclock_te` (`terminal_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `acc_acccombination`
--
ALTER TABLE `acc_acccombination`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `acc_accgroups`
--
ALTER TABLE `acc_accgroups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `acc_accholiday`
--
ALTER TABLE `acc_accholiday`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `acc_accprivilege`
--
ALTER TABLE `acc_accprivilege`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `acc_accterminal`
--
ALTER TABLE `acc_accterminal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `acc_acctimezone`
--
ALTER TABLE `acc_acctimezone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
-- AUTO_INCREMENT for table `att_leavegroup`
--
ALTER TABLE `att_leavegroup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_leavegroupdetail`
--
ALTER TABLE `att_leavegroupdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `att_leaveyearbalance`
--
ALTER TABLE `att_leaveyearbalance`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=847;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `base_systemsetting`
--
ALTER TABLE `base_systemsetting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `django_celery_beat_clockedschedule`
--
ALTER TABLE `django_celery_beat_clockedschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_celery_beat_crontabschedule`
--
ALTER TABLE `django_celery_beat_crontabschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `django_celery_beat_intervalschedule`
--
ALTER TABLE `django_celery_beat_intervalschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `django_celery_beat_periodictask`
--
ALTER TABLE `django_celery_beat_periodictask`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `django_celery_beat_solarschedule`
--
ALTER TABLE `django_celery_beat_solarschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=183;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

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
-- AUTO_INCREMENT for table `hris_attendance_break_tbl`
--
ALTER TABLE `hris_attendance_break_tbl`
  MODIFY `breakID` bigint(21) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `iclock_biodata`
--
ALTER TABLE `iclock_biodata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `iclock_terminalcommand`
--
ALTER TABLE `iclock_terminalcommand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `iclock_terminalcommandlog`
--
ALTER TABLE `iclock_terminalcommandlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `iclock_terminalemployee`
--
ALTER TABLE `iclock_terminalemployee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iclock_terminallog`
--
ALTER TABLE `iclock_terminallog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `iclock_terminalparameter`
--
ALTER TABLE `iclock_terminalparameter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `iclock_terminaluploadlog`
--
ALTER TABLE `iclock_terminaluploadlog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `iclock_terminalworkcode`
--
ALTER TABLE `iclock_terminalworkcode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iclock_transaction`
--
ALTER TABLE `iclock_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `iclock_transactionproofcmd`
--
ALTER TABLE `iclock_transactionproofcmd`
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
-- AUTO_INCREMENT for table `mobile_mobileapirequestlog`
--
ALTER TABLE `mobile_mobileapirequestlog`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `personnel_employee`
--
ALTER TABLE `personnel_employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personnel_employeeprofile`
--
ALTER TABLE `personnel_employeeprofile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personnel_employee_area`
--
ALTER TABLE `personnel_employee_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
-- AUTO_INCREMENT for table `rest_framework_tracking_apirequestlog`
--
ALTER TABLE `rest_framework_tracking_apirequestlog`
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
-- AUTO_INCREMENT for table `visitor_visitorbiodata`
--
ALTER TABLE `visitor_visitorbiodata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `visitor_visitorbiophoto`
--
ALTER TABLE `visitor_visitorbiophoto`
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
-- AUTO_INCREMENT for table `visitor_visitortransaction`
--
ALTER TABLE `visitor_visitortransaction`
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
-- Constraints for table `att_attpolicy`
--
ALTER TABLE `att_attpolicy`
  ADD CONSTRAINT `att_attpolicy_ot_pay_code_id_b189b952_fk_att_paycode_id` FOREIGN KEY (`ot_pay_code_id`) REFERENCES `att_paycode` (`id`);

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
  ADD CONSTRAINT `att_departmentpolicy_department_id_77059a9d_fk_personnel` FOREIGN KEY (`department_id`) REFERENCES `personnel_department` (`id`),
  ADD CONSTRAINT `att_departmentpolicy_ot_pay_code_id_390411dd_fk_att_paycode_id` FOREIGN KEY (`ot_pay_code_id`) REFERENCES `att_paycode` (`id`);

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
  ADD CONSTRAINT `att_grouppolicy_group_id_b2e4dfe8_fk_att_attgroup_id` FOREIGN KEY (`group_id`) REFERENCES `att_attgroup` (`id`),
  ADD CONSTRAINT `att_grouppolicy_ot_pay_code_id_1ec83080_fk_att_paycode_id` FOREIGN KEY (`ot_pay_code_id`) REFERENCES `att_paycode` (`id`);

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
-- Constraints for table `att_leavegroupdetail`
--
ALTER TABLE `att_leavegroupdetail`
  ADD CONSTRAINT `att_leavegroupdetail_leave_group_id_28f69ada_fk_att_leave` FOREIGN KEY (`leave_group_id`) REFERENCES `att_leavegroup` (`id`),
  ADD CONSTRAINT `att_leavegroupdetail_pay_code_id_5013b373_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`);

--
-- Constraints for table `att_leaveyearbalance`
--
ALTER TABLE `att_leaveyearbalance`
  ADD CONSTRAINT `att_leaveyearbalance_employee_id_14febdb3_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  ADD CONSTRAINT `att_leaveyearbalance_pay_code_id_82632aca_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`);

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
-- Constraints for table `att_reporttemplate`
--
ALTER TABLE `att_reporttemplate`
  ADD CONSTRAINT `att_reporttemplate_builder_id_e1bb15c6_fk_auth_user_id` FOREIGN KEY (`builder_id`) REFERENCES `auth_user` (`id`);

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
-- Constraints for table `att_timeinterval`
--
ALTER TABLE `att_timeinterval`
  ADD CONSTRAINT `att_timeinterval_ot_pay_code_id_17438af8_fk_att_paycode_id` FOREIGN KEY (`ot_pay_code_id`) REFERENCES `att_paycode` (`id`);

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
-- Constraints for table `att_webpunch`
--
ALTER TABLE `att_webpunch`
  ADD CONSTRAINT `att_webpunch_workflowinstance_ptr_c5f1c02e_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`);

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
-- Constraints for table `mobile_mobileapirequestlog`
--
ALTER TABLE `mobile_mobileapirequestlog`
  ADD CONSTRAINT `mobile_mobileapirequ_user_id_dfd3ded1_fk_personnel` FOREIGN KEY (`user_id`) REFERENCES `personnel_employee` (`id`);

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
-- Constraints for table `rest_framework_tracking_apirequestlog`
--
ALTER TABLE `rest_framework_tracking_apirequestlog`
  ADD CONSTRAINT `rest_framework_track_user_id_671b70b7_fk_auth_user` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

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
-- Constraints for table `visitor_visitorbiodata`
--
ALTER TABLE `visitor_visitorbiodata`
  ADD CONSTRAINT `visitor_visitorbiodata_visitor_id_b944ed37_fk_visitor_visitor_id` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_visitor` (`id`);

--
-- Constraints for table `visitor_visitorbiophoto`
--
ALTER TABLE `visitor_visitorbiophoto`
  ADD CONSTRAINT `visitor_visitorbioph_visitor_id_9816daf7_fk_visitor_v` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_visitor` (`id`);

--
-- Constraints for table `visitor_visitorlog`
--
ALTER TABLE `visitor_visitorlog`
  ADD CONSTRAINT `visitor_visitorlog_visitor_id_ebaafde1_fk_visitor_visitor_id` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_visitor` (`id`);

--
-- Constraints for table `visitor_visitortransaction`
--
ALTER TABLE `visitor_visitortransaction`
  ADD CONSTRAINT `visitor_visitortrans_terminal_id_7527ef69_fk_iclock_te` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`),
  ADD CONSTRAINT `visitor_visitortrans_visitor_id_0ee95624_fk_visitor_v` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_visitor` (`id`);

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
