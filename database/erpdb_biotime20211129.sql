CREATE DATABASE  IF NOT EXISTS `erpdb_biotime` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `erpdb_biotime`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: erpdb_biotime
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acc_acccombination`
--

DROP TABLE IF EXISTS `acc_acccombination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acc_acccombination` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `area_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `acc_acccombination_area_id_combination_no_619eb4f5_uniq` (`area_id`,`combination_no`),
  KEY `acc_acccombination_area_id_0d22c34e` (`area_id`),
  CONSTRAINT `acc_acccombination_area_id_0d22c34e_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acc_acccombination`
--

LOCK TABLES `acc_acccombination` WRITE;
/*!40000 ALTER TABLE `acc_acccombination` DISABLE KEYS */;
INSERT INTO `acc_acccombination` VALUES (21,'2021-11-09 14:17:38.374152',NULL,'2021-11-09 14:17:38.374152',NULL,0,1,'1',1,0,0,0,0,NULL,'2021-11-09 14:17:38.374152',2),(22,'2021-11-09 14:17:38.375154',NULL,'2021-11-09 14:17:38.375154',NULL,0,2,'2',0,0,0,0,0,NULL,'2021-11-09 14:17:38.374152',2),(23,'2021-11-09 14:17:38.375154',NULL,'2021-11-09 14:17:38.375154',NULL,0,3,'3',0,0,0,0,0,NULL,'2021-11-09 14:17:38.374152',2),(24,'2021-11-09 14:17:38.375154',NULL,'2021-11-09 14:17:38.375154',NULL,0,4,'4',0,0,0,0,0,NULL,'2021-11-09 14:17:38.374152',2),(25,'2021-11-09 14:17:38.375154',NULL,'2021-11-09 14:17:38.375154',NULL,0,5,'5',0,0,0,0,0,NULL,'2021-11-09 14:17:38.374152',2),(26,'2021-11-09 14:17:38.375154',NULL,'2021-11-09 14:17:38.375154',NULL,0,6,'6',0,0,0,0,0,NULL,'2021-11-09 14:17:38.374152',2),(27,'2021-11-09 14:17:38.375154',NULL,'2021-11-09 14:17:38.375154',NULL,0,7,'7',0,0,0,0,0,NULL,'2021-11-09 14:17:38.374152',2),(28,'2021-11-09 14:17:38.375154',NULL,'2021-11-09 14:17:38.375154',NULL,0,8,'8',0,0,0,0,0,NULL,'2021-11-09 14:17:38.374152',2),(29,'2021-11-09 14:17:38.375154',NULL,'2021-11-09 14:17:38.375154',NULL,0,9,'9',0,0,0,0,0,NULL,'2021-11-09 14:17:38.374152',2),(30,'2021-11-09 14:17:38.375154',NULL,'2021-11-09 14:17:38.375154',NULL,0,10,'10',0,0,0,0,0,NULL,'2021-11-09 14:17:38.374152',2);
/*!40000 ALTER TABLE `acc_acccombination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acc_accgroups`
--

DROP TABLE IF EXISTS `acc_accgroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acc_accgroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `area_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `acc_accgroups_area_id_group_no_5130a89c_uniq` (`area_id`,`group_no`),
  KEY `acc_accgroups_area_id_b83745c3` (`area_id`),
  CONSTRAINT `acc_accgroups_area_id_b83745c3_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acc_accgroups`
--

LOCK TABLES `acc_accgroups` WRITE;
/*!40000 ALTER TABLE `acc_accgroups` DISABLE KEYS */;
INSERT INTO `acc_accgroups` VALUES (3,'2021-11-09 14:17:38.366839',NULL,'2021-11-09 14:17:38.366839',NULL,0,1,'1',0,1,0,0,0,'2021-11-09 14:17:38.366839',2);
/*!40000 ALTER TABLE `acc_accgroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acc_accholiday`
--

DROP TABLE IF EXISTS `acc_accholiday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acc_accholiday` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `area_id` int(11) NOT NULL,
  `holiday_id` int(11) NOT NULL,
  `timezone_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `acc_accholiday_area_id_holiday_id_6630c2eb_uniq` (`area_id`,`holiday_id`),
  KEY `acc_accholiday_area_id_d15c19da` (`area_id`),
  KEY `acc_accholiday_holiday_id_a9efe924_fk_att_holiday_id` (`holiday_id`),
  KEY `acc_accholiday_timezone_id_450d2d1e_fk_acc_acctimezone_id` (`timezone_id`),
  CONSTRAINT `acc_accholiday_area_id_d15c19da_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`),
  CONSTRAINT `acc_accholiday_holiday_id_a9efe924_fk_att_holiday_id` FOREIGN KEY (`holiday_id`) REFERENCES `att_holiday` (`id`),
  CONSTRAINT `acc_accholiday_timezone_id_450d2d1e_fk_acc_acctimezone_id` FOREIGN KEY (`timezone_id`) REFERENCES `acc_acctimezone` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acc_accholiday`
--

LOCK TABLES `acc_accholiday` WRITE;
/*!40000 ALTER TABLE `acc_accholiday` DISABLE KEYS */;
/*!40000 ALTER TABLE `acc_accholiday` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acc_accprivilege`
--

DROP TABLE IF EXISTS `acc_accprivilege`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acc_accprivilege` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `acc_accprivilege_area_id_employee_id_group_id_f3b297d8_uniq` (`area_id`,`employee_id`,`group_id`),
  KEY `acc_accprivilege_area_id_2123ff6f` (`area_id`),
  KEY `acc_accprivilege_employee_id_5fc55f95_fk_personnel_employee_id` (`employee_id`),
  KEY `acc_accprivilege_group_id_c5ed7003_fk_acc_accgroups_id` (`group_id`),
  CONSTRAINT `acc_accprivilege_area_id_2123ff6f_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`),
  CONSTRAINT `acc_accprivilege_employee_id_5fc55f95_fk_personnel_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `acc_accprivilege_group_id_c5ed7003_fk_acc_accgroups_id` FOREIGN KEY (`group_id`) REFERENCES `acc_accgroups` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acc_accprivilege`
--

LOCK TABLES `acc_accprivilege` WRITE;
/*!40000 ALTER TABLE `acc_accprivilege` DISABLE KEYS */;
/*!40000 ALTER TABLE `acc_accprivilege` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acc_accterminal`
--

DROP TABLE IF EXISTS `acc_accterminal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acc_accterminal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `terminal_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `acc_accterminal_terminal_id_fc92cce2_fk_iclock_terminal_id` (`terminal_id`),
  CONSTRAINT `acc_accterminal_terminal_id_fc92cce2_fk_iclock_terminal_id` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acc_accterminal`
--

LOCK TABLES `acc_accterminal` WRITE;
/*!40000 ALTER TABLE `acc_accterminal` DISABLE KEYS */;
/*!40000 ALTER TABLE `acc_accterminal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acc_acctimezone`
--

DROP TABLE IF EXISTS `acc_acctimezone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acc_acctimezone` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `area_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `acc_acctimezone_area_id_timezone_no_0cb8250f_uniq` (`area_id`,`timezone_no`),
  KEY `acc_acctimezone_area_id_e9ce7a7a` (`area_id`),
  CONSTRAINT `acc_acctimezone_area_id_e9ce7a7a_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acc_acctimezone`
--

LOCK TABLES `acc_acctimezone` WRITE;
/*!40000 ALTER TABLE `acc_acctimezone` DISABLE KEYS */;
INSERT INTO `acc_acctimezone` VALUES (3,'2021-11-09 14:17:38.361839',NULL,'2021-11-09 14:17:38.361839',NULL,0,1,'1','00:00:00.000000','23:59:00.000000',1,'00:00:00.000000','23:59:00.000000',1,'00:00:00.000000','23:59:00.000000',1,'00:00:00.000000','23:59:00.000000',1,'00:00:00.000000','23:59:00.000000',1,'00:00:00.000000','23:59:00.000000',1,'00:00:00.000000','23:59:00.000000',1,NULL,'2021-11-09 14:17:38.361839',2);
/*!40000 ALTER TABLE `acc_acctimezone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_adminbiodata`
--

DROP TABLE IF EXISTS `accounts_adminbiodata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_adminbiodata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `admin_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `accounts_adminbiodata_admin_id_1e6d2d45_fk_auth_user_id` (`admin_id`),
  CONSTRAINT `accounts_adminbiodata_admin_id_1e6d2d45_fk_auth_user_id` FOREIGN KEY (`admin_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_adminbiodata`
--

LOCK TABLES `accounts_adminbiodata` WRITE;
/*!40000 ALTER TABLE `accounts_adminbiodata` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_adminbiodata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_usernotification`
--

DROP TABLE IF EXISTS `accounts_usernotification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_usernotification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `send_time` datetime(6) NOT NULL,
  `read_time` datetime(6) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category` int(11) DEFAULT NULL,
  `event` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `accounts_usernotification_user_id_b86755b3_fk_auth_user_id` (`user_id`),
  CONSTRAINT `accounts_usernotification_user_id_b86755b3_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_usernotification`
--

LOCK TABLES `accounts_usernotification` WRITE;
/*!40000 ALTER TABLE `accounts_usernotification` DISABLE KEYS */;
INSERT INTO `accounts_usernotification` VALUES (1,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BLACKCODERS\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-09 13:45:01\"}','2021-11-09 13:49:57.177395',NULL,0,1,1,101),(2,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BLACKCODERS\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-09 13:51:20\"}','2021-11-09 13:53:16.159759','2021-11-09 14:02:42.007656',1,1,1,102),(3,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-09 16:08:07\"}','2021-11-10 07:19:54.565533',NULL,0,1,1,101),(4,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"193.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-10 07:23:04\"}','2021-11-10 07:23:11.112474',NULL,0,1,1,102),(5,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"193.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-10 07:34:16\"}','2021-11-10 07:39:52.112098',NULL,0,1,1,101),(6,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"193.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-10 07:30:40\"}','2021-11-10 07:44:13.984848',NULL,0,1,1,101),(7,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.203\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-10 07:54:14\"}','2021-11-10 07:54:14.753572',NULL,0,1,1,102),(8,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-10 15:59:55\"}','2021-11-11 07:25:34.319978',NULL,0,1,1,101),(9,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-11 07:28:42\"}','2021-11-11 07:28:52.945024',NULL,0,1,1,102),(10,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-12 16:10:52\"}','2021-11-15 07:14:42.035424',NULL,0,1,1,101),(11,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-16 17:53:59\"}','2021-11-16 17:59:09.388436',NULL,0,1,1,101),(12,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-18 10:34:20\"}','2021-11-18 10:34:30.548040',NULL,0,1,1,102),(13,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-18 17:09:27\"}','2021-11-22 07:22:46.419233',NULL,0,1,1,101),(14,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-22 07:46:02\"}','2021-11-22 07:46:05.799517',NULL,0,1,1,102),(15,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-22 14:39:54\"}','2021-11-22 14:46:12.840962',NULL,0,1,1,101),(16,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-24 10:17:36\"}','2021-11-24 10:17:47.746545',NULL,0,1,1,102),(17,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-24 10:24:12\"}','2021-11-24 10:31:02.351696',NULL,0,1,1,101),(18,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-24 11:07:40\"}','2021-11-24 11:07:43.351741',NULL,0,1,1,102),(19,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-24 15:22:10\"}','2021-11-24 15:27:43.665069',NULL,0,1,1,101),(20,'{\"sn\": \"BOCK191760589\", \"ip_address\": \"192.168.50.204\", \"alias\": \"BCGI\", \"terminal_name\": null, \"area_name\": \"Pasig City\", \"last_activity\": \"2021-11-29 11:27:10\"}','2021-11-29 11:33:27.064213',NULL,0,1,1,101);
/*!40000 ALTER TABLE `accounts_usernotification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_attcalclog`
--

DROP TABLE IF EXISTS `att_attcalclog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_attcalclog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dept_id` int(11) DEFAULT NULL,
  `emp_id` int(11) DEFAULT NULL,
  `start_date` datetime(6) NOT NULL,
  `end_date` datetime(6) NOT NULL,
  `update_time` datetime(6) NOT NULL,
  `log_type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_attcalclog`
--

LOCK TABLES `att_attcalclog` WRITE;
/*!40000 ALTER TABLE `att_attcalclog` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_attcalclog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_attcode`
--

DROP TABLE IF EXISTS `att_attcode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_attcode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `alias` varchar(50) NOT NULL,
  `display_format` smallint(6) NOT NULL,
  `symbol` varchar(20) NOT NULL,
  `round_off` smallint(6) NOT NULL,
  `min_val` decimal(4,1) NOT NULL,
  `symbol_only` tinyint(1) NOT NULL,
  `order` smallint(6) NOT NULL,
  `color_setting` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `alias` (`alias`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_attcode`
--

LOCK TABLES `att_attcode` WRITE;
/*!40000 ALTER TABLE `att_attcode` DISABLE KEYS */;
INSERT INTO `att_attcode` VALUES (1,'duration','Duration',4,'',1,0.1,0,1,NULL),(2,'duty_duration','Duty Duration',4,'',1,0.1,0,2,NULL),(3,'total_hrs','Total Hours',4,'',1,0.1,0,3,NULL),(4,'worked_hrs','Worked Hours',4,'',1,0.1,0,4,NULL),(5,'actual_worked','Actual Worked Hours',4,'',1,0.1,0,5,NULL),(6,'break_duration','Break Duration',4,'',1,0.1,0,6,NULL),(7,'break_total_hrs','Break Total Hours',4,'',1,0.1,0,7,NULL),(8,'break_hrs','Break Hours',4,'',1,0.1,0,8,NULL),(9,'actual_break','Actual Break Hours',4,'',1,0.1,0,9,NULL),(10,'approval_hrs','Approval Hours',4,'',1,0.1,0,10,NULL),(11,'early_in','Early In',4,'',1,0.1,0,11,NULL),(12,'late_out','Late Out',4,'',1,0.1,0,12,NULL),(13,'unschedule','Unscheduled',4,'',1,0.1,0,13,NULL),(14,'remaining','Remaining',4,'',1,0.1,0,14,NULL),(15,'total_ot','Total OT',4,'',1,0.1,0,15,NULL),(16,'rule_total_ot','Rule Total OT',4,'',1,0.1,0,16,NULL),(17,'total_leave','Total Leaves',2,'',1,0.1,0,17,NULL),(18,'day_off','Day Off',0,'Off',0,0.1,1,18,NULL),(19,'weekend','Weekend',0,'W',0,0.1,1,19,NULL),(20,'holiday','Holiday',0,'H',0,0.1,1,20,NULL);
/*!40000 ALTER TABLE `att_attcode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_attemployee`
--

DROP TABLE IF EXISTS `att_attemployee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_attemployee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `group_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emp_id` (`emp_id`),
  KEY `att_attemployee_group_id_18d3954d_fk_att_attgroup_id` (`group_id`),
  CONSTRAINT `att_attemployee_emp_id_52457e3c_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `att_attemployee_group_id_18d3954d_fk_att_attgroup_id` FOREIGN KEY (`group_id`) REFERENCES `att_attgroup` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_attemployee`
--

LOCK TABLES `att_attemployee` WRITE;
/*!40000 ALTER TABLE `att_attemployee` DISABLE KEYS */;
INSERT INTO `att_attemployee` VALUES (1,'2021-11-09 14:17:51.522884',NULL,'2021-11-09 14:17:51.522884',NULL,0,1,1,1,1,1,NULL),(2,'2021-11-09 14:17:51.691300',NULL,'2021-11-09 14:17:51.691300',NULL,0,1,1,1,1,10,NULL),(3,'2021-11-09 14:17:51.932977',NULL,'2021-11-09 14:17:51.932977',NULL,0,1,1,1,1,2,NULL),(4,'2021-11-09 14:17:52.014391',NULL,'2021-11-09 14:17:52.014391',NULL,0,1,1,1,1,11,NULL),(5,'2021-11-09 14:17:52.158080',NULL,'2021-11-09 14:17:52.158080',NULL,0,1,1,1,1,12,NULL),(6,'2021-11-09 14:17:52.536720',NULL,'2021-11-09 14:17:52.536720',NULL,0,1,1,1,1,13,NULL),(7,'2021-11-09 14:17:52.899373',NULL,'2021-11-09 14:17:52.899373',NULL,0,1,1,1,1,14,NULL),(8,'2021-11-09 14:17:53.050049',NULL,'2021-11-09 14:17:53.050049',NULL,0,1,1,1,1,15,NULL),(9,'2021-11-09 14:17:53.172670',NULL,'2021-11-09 14:17:53.172670',NULL,0,1,1,1,1,16,NULL),(10,'2021-11-09 14:17:53.258564',NULL,'2021-11-09 14:17:53.258564',NULL,0,1,1,1,1,17,NULL),(11,'2021-11-09 14:17:53.381347',NULL,'2021-11-09 14:17:53.381347',NULL,0,1,1,1,1,18,NULL),(12,'2021-11-09 14:17:53.533397',NULL,'2021-11-09 14:17:53.533397',NULL,0,1,1,1,1,19,NULL),(13,'2021-11-09 14:17:53.884420',NULL,'2021-11-09 14:17:53.884420',NULL,0,1,1,1,1,3,NULL),(14,'2021-11-09 14:17:54.058221',NULL,'2021-11-09 14:17:54.058221',NULL,0,1,1,1,1,20,NULL),(15,'2021-11-09 14:17:54.140541',NULL,'2021-11-09 14:17:54.140541',NULL,0,1,1,1,1,4,NULL),(16,'2021-11-09 14:17:54.225038',NULL,'2021-11-09 14:17:54.225038',NULL,0,1,1,1,1,5,NULL),(17,'2021-11-09 14:17:54.306178',NULL,'2021-11-09 14:17:54.306178',NULL,0,1,1,1,1,6,NULL),(18,'2021-11-09 14:17:54.448362',NULL,'2021-11-09 14:17:54.448362',NULL,0,1,1,1,1,7,NULL),(19,'2021-11-09 14:17:54.544579',NULL,'2021-11-09 14:17:54.544579',NULL,0,1,1,1,1,8,NULL),(20,'2021-11-09 14:17:54.992257',NULL,'2021-11-09 14:17:54.992257',NULL,0,1,1,1,1,9,NULL);
/*!40000 ALTER TABLE `att_attemployee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_attgroup`
--

DROP TABLE IF EXISTS `att_attgroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_attgroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_attgroup`
--

LOCK TABLES `att_attgroup` WRITE;
/*!40000 ALTER TABLE `att_attgroup` DISABLE KEYS */;
INSERT INTO `att_attgroup` VALUES (1,'2021-11-09 13:25:47.441050',NULL,'2021-11-09 13:25:47.441050',NULL,0,'1','default');
/*!40000 ALTER TABLE `att_attgroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_attpolicy`
--

DROP TABLE IF EXISTS `att_attpolicy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_attpolicy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `overtime_policy` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `att_attpolicy_ot_pay_code_id_b189b952_fk_att_paycode_id` (`ot_pay_code_id`),
  CONSTRAINT `att_attpolicy_ot_pay_code_id_b189b952_fk_att_paycode_id` FOREIGN KEY (`ot_pay_code_id`) REFERENCES `att_paycode` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_attpolicy`
--

LOCK TABLES `att_attpolicy` WRITE;
/*!40000 ALTER TABLE `att_attpolicy` DISABLE KEYS */;
INSERT INTO `att_attpolicy` VALUES (1,'2021-11-09 13:25:47.594505',NULL,'2021-11-09 13:25:47.594505',NULL,0,1,7,7,0,12.0,'00:00:00.000000',1,1,0,NULL,0,NULL,0,NULL,0,NULL,100,100,1,60,1,60,0,0,0,'00:00:00.000000',0,0,0,0,0,0,NULL,NULL,NULL,-1);
/*!40000 ALTER TABLE `att_attpolicy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_attreportsetting`
--

DROP TABLE IF EXISTS `att_attreportsetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_attreportsetting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resign_emp` smallint(6) NOT NULL,
  `short_date` smallint(6) NOT NULL,
  `short_time` smallint(6) NOT NULL,
  `filter_by_hire_date` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_attreportsetting`
--

LOCK TABLES `att_attreportsetting` WRITE;
/*!40000 ALTER TABLE `att_attreportsetting` DISABLE KEYS */;
INSERT INTO `att_attreportsetting` VALUES (1,1,1,1,1);
/*!40000 ALTER TABLE `att_attreportsetting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_attrule`
--

DROP TABLE IF EXISTS `att_attrule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_attrule` (
  `param_name` varchar(20) NOT NULL,
  `param_value` longtext NOT NULL,
  PRIMARY KEY (`param_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_attrule`
--

LOCK TABLES `att_attrule` WRITE;
/*!40000 ALTER TABLE `att_attrule` DISABLE KEYS */;
INSERT INTO `att_attrule` VALUES ('global_att_rule','{\"in_rule\": 1, \"out_rule\": 1, \"use_ot\": 1, \"punch_period\": 1, \"weekend\": [], \"mins_late_absent\": 100, \"mins_early_absent\": 100, \"miss_in\": 1, \"miss_in_mins\": 60, \"miss_out\": 1, \"miss_out_mins\": 60, \"leave_include_in\": 2, \"leave_include_out\": 2, \"training_include_in\": 2, \"training_include_out\": 2, \"check_in\": \"0\", \"check_out\": \"1\", \"break_out\": \"2\", \"break_in\": \"3\", \"overtime_in\": \"4\", \"overtime_out\": \"5\", \"enable_capture\": 0, \"enable_workcode\": 0, \"enable_funckey\": 0}');
/*!40000 ALTER TABLE `att_attrule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_attschedule`
--

DROP TABLE IF EXISTS `att_attschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_attschedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `employee_id` int(11) NOT NULL,
  `shift_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `att_attschedule_employee_id_caa61686_fk_personnel_employee_id` (`employee_id`),
  KEY `att_attschedule_shift_id_13d2db9a_fk_att_attshift_id` (`shift_id`),
  CONSTRAINT `att_attschedule_employee_id_caa61686_fk_personnel_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `att_attschedule_shift_id_13d2db9a_fk_att_attshift_id` FOREIGN KEY (`shift_id`) REFERENCES `att_attshift` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_attschedule`
--

LOCK TABLES `att_attschedule` WRITE;
/*!40000 ALTER TABLE `att_attschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_attschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_attshift`
--

DROP TABLE IF EXISTS `att_attshift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_attshift` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `ot_rule` char(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_attshift`
--

LOCK TABLES `att_attshift` WRITE;
/*!40000 ALTER TABLE `att_attshift` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_attshift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_breaktime`
--

DROP TABLE IF EXISTS `att_breaktime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_breaktime` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `profit_code_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `att_breaktime_alias_6212d9cf_uniq` (`alias`),
  KEY `att_breaktime_loss_code_id_2ffb5432_fk_att_paycode_id` (`loss_code_id`),
  KEY `att_breaktime_profit_code_id_63cdbbcc_fk_att_paycode_id` (`profit_code_id`),
  CONSTRAINT `att_breaktime_loss_code_id_2ffb5432_fk_att_paycode_id` FOREIGN KEY (`loss_code_id`) REFERENCES `att_paycode` (`id`),
  CONSTRAINT `att_breaktime_profit_code_id_63cdbbcc_fk_att_paycode_id` FOREIGN KEY (`profit_code_id`) REFERENCES `att_paycode` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_breaktime`
--

LOCK TABLES `att_breaktime` WRITE;
/*!40000 ALTER TABLE `att_breaktime` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_breaktime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_changeschedule`
--

DROP TABLE IF EXISTS `att_changeschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_changeschedule` (
  `workflowinstance_ptr_id` int(11) NOT NULL,
  `att_date` date NOT NULL,
  `previous_timeinterval` varchar(100) DEFAULT NULL,
  `apply_time` datetime(6) NOT NULL,
  `apply_reason` varchar(200) DEFAULT NULL,
  `attachment` varchar(100) DEFAULT NULL,
  `timeinterval_id` int(11) NOT NULL,
  PRIMARY KEY (`workflowinstance_ptr_id`),
  KEY `att_changeschedule_timeinterval_id_d41ac077_fk_att_timei` (`timeinterval_id`),
  CONSTRAINT `att_changeschedule_timeinterval_id_d41ac077_fk_att_timei` FOREIGN KEY (`timeinterval_id`) REFERENCES `att_timeinterval` (`id`),
  CONSTRAINT `att_changeschedule_workflowinstance_ptr_cee602bb_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_changeschedule`
--

LOCK TABLES `att_changeschedule` WRITE;
/*!40000 ALTER TABLE `att_changeschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_changeschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_departmentpolicy`
--

DROP TABLE IF EXISTS `att_departmentpolicy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_departmentpolicy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `overtime_policy` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `att_departmentpolicy_department_id_77059a9d_fk_personnel` (`department_id`),
  KEY `att_departmentpolicy_ot_pay_code_id_390411dd_fk_att_paycode_id` (`ot_pay_code_id`),
  CONSTRAINT `att_departmentpolicy_department_id_77059a9d_fk_personnel` FOREIGN KEY (`department_id`) REFERENCES `personnel_department` (`id`),
  CONSTRAINT `att_departmentpolicy_ot_pay_code_id_390411dd_fk_att_paycode_id` FOREIGN KEY (`ot_pay_code_id`) REFERENCES `att_paycode` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_departmentpolicy`
--

LOCK TABLES `att_departmentpolicy` WRITE;
/*!40000 ALTER TABLE `att_departmentpolicy` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_departmentpolicy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_departmentschedule`
--

DROP TABLE IF EXISTS `att_departmentschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_departmentschedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `department_id` int(11) NOT NULL,
  `shift_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `att_departmentschedu_department_id_c68fca3d_fk_personnel` (`department_id`),
  KEY `att_departmentschedule_shift_id_c37d5ade_fk_att_attshift_id` (`shift_id`),
  CONSTRAINT `att_departmentschedu_department_id_c68fca3d_fk_personnel` FOREIGN KEY (`department_id`) REFERENCES `personnel_department` (`id`),
  CONSTRAINT `att_departmentschedule_shift_id_c37d5ade_fk_att_attshift_id` FOREIGN KEY (`shift_id`) REFERENCES `att_attshift` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_departmentschedule`
--

LOCK TABLES `att_departmentschedule` WRITE;
/*!40000 ALTER TABLE `att_departmentschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_departmentschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_deptattrule`
--

DROP TABLE IF EXISTS `att_deptattrule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_deptattrule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(50) NOT NULL,
  `rule` longtext DEFAULT NULL,
  `department_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `att_deptattrule_department_id_f333c8f0` (`department_id`),
  CONSTRAINT `att_deptattrule_department_id_f333c8f0_fk_personnel` FOREIGN KEY (`department_id`) REFERENCES `personnel_department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_deptattrule`
--

LOCK TABLES `att_deptattrule` WRITE;
/*!40000 ALTER TABLE `att_deptattrule` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_deptattrule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_grouppolicy`
--

DROP TABLE IF EXISTS `att_grouppolicy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_grouppolicy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `overtime_policy` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `att_grouppolicy_group_id_b2e4dfe8_fk_att_attgroup_id` (`group_id`),
  KEY `att_grouppolicy_ot_pay_code_id_1ec83080_fk_att_paycode_id` (`ot_pay_code_id`),
  CONSTRAINT `att_grouppolicy_group_id_b2e4dfe8_fk_att_attgroup_id` FOREIGN KEY (`group_id`) REFERENCES `att_attgroup` (`id`),
  CONSTRAINT `att_grouppolicy_ot_pay_code_id_1ec83080_fk_att_paycode_id` FOREIGN KEY (`ot_pay_code_id`) REFERENCES `att_paycode` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_grouppolicy`
--

LOCK TABLES `att_grouppolicy` WRITE;
/*!40000 ALTER TABLE `att_grouppolicy` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_grouppolicy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_groupschedule`
--

DROP TABLE IF EXISTS `att_groupschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_groupschedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `group_id` int(11) NOT NULL,
  `shift_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `att_groupschedule_group_id_c341493f_fk_att_attgroup_id` (`group_id`),
  KEY `att_groupschedule_shift_id_287e7fc0_fk_att_attshift_id` (`shift_id`),
  KEY `att_groupschedule_start_date_638b6d85` (`start_date`),
  CONSTRAINT `att_groupschedule_group_id_c341493f_fk_att_attgroup_id` FOREIGN KEY (`group_id`) REFERENCES `att_attgroup` (`id`),
  CONSTRAINT `att_groupschedule_shift_id_287e7fc0_fk_att_attshift_id` FOREIGN KEY (`shift_id`) REFERENCES `att_attshift` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_groupschedule`
--

LOCK TABLES `att_groupschedule` WRITE;
/*!40000 ALTER TABLE `att_groupschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_groupschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_holiday`
--

DROP TABLE IF EXISTS `att_holiday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_holiday` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `duration_day` smallint(6) NOT NULL,
  `enable_ot_rule` tinyint(1) NOT NULL,
  `ot_rule` char(32) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `att_group_id` int(11) DEFAULT NULL,
  `color_setting` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `att_holiday_department_id_fbbbd185` (`department_id`),
  KEY `att_holiday_att_group_id_9ddf13ba_fk_att_attgroup_id` (`att_group_id`),
  CONSTRAINT `att_holiday_att_group_id_9ddf13ba_fk_att_attgroup_id` FOREIGN KEY (`att_group_id`) REFERENCES `att_attgroup` (`id`),
  CONSTRAINT `att_holiday_department_id_fbbbd185_fk_personnel_department_id` FOREIGN KEY (`department_id`) REFERENCES `personnel_department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_holiday`
--

LOCK TABLES `att_holiday` WRITE;
/*!40000 ALTER TABLE `att_holiday` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_holiday` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_leave`
--

DROP TABLE IF EXISTS `att_leave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_leave` (
  `workflowinstance_ptr_id` int(11) NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `apply_reason` longtext DEFAULT NULL,
  `apply_time` datetime(6) NOT NULL,
  `attachment` varchar(100) DEFAULT NULL,
  `pay_code_id` int(11) DEFAULT NULL,
  `leave_day` double NOT NULL,
  PRIMARY KEY (`workflowinstance_ptr_id`),
  KEY `att_leave_pay_code_id_2fadf493_fk_att_paycode_id` (`pay_code_id`),
  CONSTRAINT `att_leave_pay_code_id_2fadf493_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`),
  CONSTRAINT `att_leave_workflowinstance_ptr_39aaa9d9_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_leave`
--

LOCK TABLES `att_leave` WRITE;
/*!40000 ALTER TABLE `att_leave` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_leave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_leavegroup`
--

DROP TABLE IF EXISTS `att_leavegroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_leavegroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_leavegroup`
--

LOCK TABLES `att_leavegroup` WRITE;
/*!40000 ALTER TABLE `att_leavegroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_leavegroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_leavegroupdetail`
--

DROP TABLE IF EXISTS `att_leavegroupdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_leavegroupdetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `pay_code_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `att_leavegroupdetail_leave_group_id_28f69ada_fk_att_leave` (`leave_group_id`),
  KEY `att_leavegroupdetail_pay_code_id_5013b373_fk_att_paycode_id` (`pay_code_id`),
  CONSTRAINT `att_leavegroupdetail_leave_group_id_28f69ada_fk_att_leave` FOREIGN KEY (`leave_group_id`) REFERENCES `att_leavegroup` (`id`),
  CONSTRAINT `att_leavegroupdetail_pay_code_id_5013b373_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_leavegroupdetail`
--

LOCK TABLES `att_leavegroupdetail` WRITE;
/*!40000 ALTER TABLE `att_leavegroupdetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_leavegroupdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_leaveyearbalance`
--

DROP TABLE IF EXISTS `att_leaveyearbalance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_leaveyearbalance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `pay_code_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `att_leaveyearbalance_employee_id_year_pay_code_id_2ec71517_uniq` (`employee_id`,`year`,`pay_code_id`),
  KEY `att_leaveyearbalance_pay_code_id_82632aca_fk_att_paycode_id` (`pay_code_id`),
  KEY `att_leaveyearbalance_employee_id_14febdb3` (`employee_id`),
  CONSTRAINT `att_leaveyearbalance_employee_id_14febdb3_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `att_leaveyearbalance_pay_code_id_82632aca_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_leaveyearbalance`
--

LOCK TABLES `att_leaveyearbalance` WRITE;
/*!40000 ALTER TABLE `att_leaveyearbalance` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_leaveyearbalance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_manuallog`
--

DROP TABLE IF EXISTS `att_manuallog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_manuallog` (
  `workflowinstance_ptr_id` int(11) NOT NULL,
  `punch_time` datetime(6) NOT NULL,
  `punch_state` varchar(5) NOT NULL,
  `work_code` varchar(20) DEFAULT NULL,
  `apply_reason` longtext DEFAULT NULL,
  `apply_time` datetime(6) NOT NULL,
  `attachment` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`workflowinstance_ptr_id`),
  CONSTRAINT `att_manuallog_workflowinstance_ptr_22a3fbd0_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_manuallog`
--

LOCK TABLES `att_manuallog` WRITE;
/*!40000 ALTER TABLE `att_manuallog` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_manuallog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_overtime`
--

DROP TABLE IF EXISTS `att_overtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_overtime` (
  `workflowinstance_ptr_id` int(11) NOT NULL,
  `overtime_type` smallint(6) NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `apply_reason` longtext DEFAULT NULL,
  `apply_time` datetime(6) NOT NULL,
  `attachment` varchar(100) DEFAULT NULL,
  `pay_code_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`workflowinstance_ptr_id`),
  KEY `att_overtime_pay_code_id_05600ee0_fk_att_paycode_id` (`pay_code_id`),
  CONSTRAINT `att_overtime_pay_code_id_05600ee0_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`),
  CONSTRAINT `att_overtime_workflowinstance_ptr_6bd6a6f4_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_overtime`
--

LOCK TABLES `att_overtime` WRITE;
/*!40000 ALTER TABLE `att_overtime` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_overtime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_overtimepolicy`
--

DROP TABLE IF EXISTS `att_overtimepolicy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_overtimepolicy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `pay_code_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `att_overtimepolicy_overnight_pay_code_i_274ce1b0_fk_att_payco` (`overnight_pay_code_id`),
  KEY `att_overtimepolicy_pay_code_id_285b0a61_fk_att_paycode_id` (`pay_code_id`),
  CONSTRAINT `att_overtimepolicy_overnight_pay_code_i_274ce1b0_fk_att_payco` FOREIGN KEY (`overnight_pay_code_id`) REFERENCES `att_paycode` (`id`),
  CONSTRAINT `att_overtimepolicy_pay_code_id_285b0a61_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_overtimepolicy`
--

LOCK TABLES `att_overtimepolicy` WRITE;
/*!40000 ALTER TABLE `att_overtimepolicy` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_overtimepolicy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_paycode`
--

DROP TABLE IF EXISTS `att_paycode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_paycode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `color_setting` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_paycode`
--

LOCK TABLES `att_paycode` WRITE;
/*!40000 ALTER TABLE `att_paycode` DISABLE KEYS */;
INSERT INTO `att_paycode` VALUES (1,'2021-11-09 13:25:44.535483',NULL,'2021-11-09 13:25:44.535483',NULL,0,'REG','Regular',1,NULL,1,1,8.00,1,0,1,0.1,2,'P',1,NULL,1,1,NULL),(2,'2021-11-09 13:25:44.936910',NULL,'2021-11-09 13:25:44.936910',NULL,0,'L','Late In',4,NULL,2,1,8.00,1,0,1,1.0,1,'L',2,NULL,1,1,NULL),(3,'2021-11-09 13:25:45.115349',NULL,'2021-11-09 13:25:45.115349',NULL,0,'E','Early Out',4,NULL,3,1,8.00,1,0,1,1.0,1,'E',3,NULL,1,1,NULL),(4,'2021-11-09 13:25:45.200007',NULL,'2021-11-09 13:25:45.200007',NULL,0,'A','Absence',4,NULL,4,1,8.00,1,0,1,0.1,2,'A',4,NULL,1,1,NULL),(5,'2021-11-09 13:25:45.237779',NULL,'2021-11-09 13:25:45.237779',NULL,0,'NOT','Normal OT',2,NULL,NULL,1,8.00,1,0,1,0.1,2,'',5,NULL,1,1,NULL),(6,'2021-11-09 13:25:45.302328',NULL,'2021-11-09 13:25:45.302328',NULL,0,'WOT','Weekend OT',2,NULL,NULL,1,8.00,1,0,1,0.1,2,'',6,NULL,1,1,NULL),(7,'2021-11-09 13:25:45.338035',NULL,'2021-11-09 13:25:45.338035',NULL,0,'HOT','Holiday OT',2,NULL,NULL,1,8.00,1,0,1,0.1,2,'',7,NULL,1,1,NULL),(8,'2021-11-09 13:25:45.384928',NULL,'2021-11-09 13:25:45.384928',NULL,0,'OT1','OT1',2,6,NULL,1,8.00,1,0,1,0.1,2,'',8,NULL,1,1,NULL),(9,'2021-11-09 13:25:45.431814',NULL,'2021-11-09 13:25:45.431814',NULL,0,'OT2','OT2',2,7,NULL,1,8.00,1,0,1,0.1,2,'',9,NULL,1,1,NULL),(10,'2021-11-09 13:25:45.469585',NULL,'2021-11-09 13:25:45.469585',NULL,0,'OT3','OT3',2,8,NULL,1,8.00,1,0,1,0.1,2,'',10,NULL,1,1,NULL),(11,'2021-11-09 13:25:45.506437',NULL,'2021-11-09 13:25:45.506437',NULL,0,'AL','Annual Leave',3,NULL,NULL,0,8.00,1,1,1,0.1,2,'',11,NULL,1,1,NULL),(12,'2021-11-09 13:25:45.538225',NULL,'2021-11-09 13:25:45.538225',NULL,0,'SL','Sick Leave',3,NULL,NULL,0,8.00,0,1,1,0.1,2,'',12,NULL,1,1,NULL),(13,'2021-11-09 13:25:45.569505',NULL,'2021-11-09 13:25:45.569505',NULL,0,'CL','Casual Leave',3,NULL,NULL,0,8.00,0,1,1,0.1,2,'',13,NULL,1,1,NULL),(14,'2021-11-09 13:25:45.871808',NULL,'2021-11-09 13:25:45.871808',NULL,0,'ML','Maternity Leave',3,NULL,NULL,0,8.00,0,1,1,0.1,2,'',14,NULL,1,1,NULL),(15,'2021-11-09 13:25:45.903086',NULL,'2021-11-09 13:25:45.903086',NULL,0,'COL','Compassionate Leave',3,NULL,NULL,0,8.00,0,0,1,0.1,2,'',15,NULL,1,1,NULL),(16,'2021-11-09 13:25:45.988119',NULL,'2021-11-09 13:25:45.988119',NULL,0,'BT','Business Trip',3,NULL,NULL,0,8.00,0,0,1,0.1,2,'',16,NULL,1,1,NULL);
/*!40000 ALTER TABLE `att_paycode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_payloadattcode`
--

DROP TABLE IF EXISTS `att_payloadattcode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `time_card_id` char(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `att_payloadattcode_att_code_id_0d635efd_fk_att_attcode_id` (`att_code_id`),
  KEY `att_payloadattcode_emp_id_36569f54_fk_personnel_employee_id` (`emp_id`),
  KEY `att_payloadattcode_shift_id_731faddf_fk_att_attshift_id` (`shift_id`),
  KEY `att_payloadattcode_att_date_19b2621e` (`att_date`),
  KEY `att_payloadattcode_time_card_id_e8a37c7a` (`time_card_id`),
  CONSTRAINT `att_payloadattcode_att_code_id_0d635efd_fk_att_attcode_id` FOREIGN KEY (`att_code_id`) REFERENCES `att_attcode` (`id`),
  CONSTRAINT `att_payloadattcode_emp_id_36569f54_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `att_payloadattcode_shift_id_731faddf_fk_att_attshift_id` FOREIGN KEY (`shift_id`) REFERENCES `att_attshift` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_payloadattcode`
--

LOCK TABLES `att_payloadattcode` WRITE;
/*!40000 ALTER TABLE `att_payloadattcode` DISABLE KEYS */;
INSERT INTO `att_payloadattcode` VALUES ('07c2c0df484911eca2dc645d86dd6e62','2021-11-18',46,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,1,NULL,'f0bb0a63d3464be28c0090fc43c2f0be'),('07c2c0e0484911ecb557645d86dd6e62','2021-11-18',46,3,'Total OT','',0,0.0,0.0,0.0,0,15,1,NULL,'f0bb0a63d3464be28c0090fc43c2f0be'),('07c2c0e1484911ec821d645d86dd6e62','2021-11-18',46,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,1,NULL,'f0bb0a63d3464be28c0090fc43c2f0be'),('07c2c0e2484911ecb9ae645d86dd6e62','2021-11-18',46,3,'Duration','',43200,1.0,12.0,720.0,0,1,1,NULL,'f0bb0a63d3464be28c0090fc43c2f0be'),('07c2c0e3484911ec822b645d86dd6e62','2021-11-18',46,3,'Total Hours','',33348,0.8,9.3,555.8,0,3,1,NULL,'f0bb0a63d3464be28c0090fc43c2f0be'),('07c2c0e4484911ec9471645d86dd6e62','2021-11-18',46,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,1,NULL,'f0bb0a63d3464be28c0090fc43c2f0be'),('0f7bbdc941f411eca81f645d86dd6e62','2021-11-10',45,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,3,NULL,'de8fd22cb4104f79ab68e3e85bb35d27'),('0f7bbdca41f411ec9eb9645d86dd6e62','2021-11-10',45,2,'Total OT','',0,0.0,0.0,0.0,0,15,3,NULL,'de8fd22cb4104f79ab68e3e85bb35d27'),('0f7bbdcb41f411ec9899645d86dd6e62','2021-11-10',45,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,3,NULL,'de8fd22cb4104f79ab68e3e85bb35d27'),('0f7bbdcc41f411ec9aa7645d86dd6e62','2021-11-10',45,2,'Duration','',43200,1.0,12.0,720.0,0,1,3,NULL,'de8fd22cb4104f79ab68e3e85bb35d27'),('0f7bbdcd41f411ecba0c645d86dd6e62','2021-11-10',45,2,'Total Hours','',28010,0.6,7.8,466.8,0,3,3,NULL,'de8fd22cb4104f79ab68e3e85bb35d27'),('0f7bbdce41f411ec8e17645d86dd6e62','2021-11-10',45,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,3,NULL,'de8fd22cb4104f79ab68e3e85bb35d27'),('144cf607412611ecaf15645d86dd6e62','2021-11-09',45,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,2,NULL,'31ce892242ac4732b3798b9820ace701'),('144cf608412611ecbc38645d86dd6e62','2021-11-09',45,1,'Total OT','',0,0.0,0.0,0.0,0,15,2,NULL,'31ce892242ac4732b3798b9820ace701'),('144cf609412611ec9ed8645d86dd6e62','2021-11-09',45,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,2,NULL,'31ce892242ac4732b3798b9820ace701'),('144cf60a412611ecbf86645d86dd6e62','2021-11-09',45,1,'Duration','',43200,1.0,12.0,720.0,0,1,2,NULL,'31ce892242ac4732b3798b9820ace701'),('144cf60b412611ecaf41645d86dd6e62','2021-11-09',45,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,2,NULL,'31ce892242ac4732b3798b9820ace701'),('15822f31412611ec87f2645d86dd6e62','2021-11-09',45,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,3,NULL,'fca638b619fb40d1914b19ae48a7b208'),('15822f32412611ec874d645d86dd6e62','2021-11-09',45,1,'Total OT','',0,0.0,0.0,0.0,0,15,3,NULL,'fca638b619fb40d1914b19ae48a7b208'),('15822f33412611eca087645d86dd6e62','2021-11-09',45,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,3,NULL,'fca638b619fb40d1914b19ae48a7b208'),('15822f34412611ecb0f0645d86dd6e62','2021-11-09',45,1,'Duration','',43200,1.0,12.0,720.0,0,1,3,NULL,'fca638b619fb40d1914b19ae48a7b208'),('15822f35412611eca2e7645d86dd6e62','2021-11-09',45,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,3,NULL,'fca638b619fb40d1914b19ae48a7b208'),('16bc54ef412611eca457645d86dd6e62','2021-11-09',45,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,4,NULL,'99a4a4e0ff81423da17c2340b8cdf3db'),('16bc54f0412611ec8476645d86dd6e62','2021-11-09',45,1,'Total OT','',0,0.0,0.0,0.0,0,15,4,NULL,'99a4a4e0ff81423da17c2340b8cdf3db'),('16bc54f1412611ecb845645d86dd6e62','2021-11-09',45,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,4,NULL,'99a4a4e0ff81423da17c2340b8cdf3db'),('16bc54f2412611ec8274645d86dd6e62','2021-11-09',45,1,'Duration','',43200,1.0,12.0,720.0,0,1,4,NULL,'99a4a4e0ff81423da17c2340b8cdf3db'),('16bc54f3412611ecab85645d86dd6e62','2021-11-09',45,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,4,NULL,'99a4a4e0ff81423da17c2340b8cdf3db'),('18b6a3c9412611ecb93c645d86dd6e62','2021-11-09',45,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,10,NULL,'1360aa7da9e34cedb8d47acdcac25663'),('18b6a3ca412611ecbc69645d86dd6e62','2021-11-09',45,1,'Total OT','',0,0.0,0.0,0.0,0,15,10,NULL,'1360aa7da9e34cedb8d47acdcac25663'),('18b6a3cb412611ec9b22645d86dd6e62','2021-11-09',45,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,10,NULL,'1360aa7da9e34cedb8d47acdcac25663'),('18b6a3cc412611ecb992645d86dd6e62','2021-11-09',45,1,'Duration','',43200,1.0,12.0,720.0,0,1,10,NULL,'1360aa7da9e34cedb8d47acdcac25663'),('18b6a3cd412611ecbe7f645d86dd6e62','2021-11-09',45,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,10,NULL,'1360aa7da9e34cedb8d47acdcac25663'),('19e64f51412611ecba39645d86dd6e62','2021-11-09',45,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,8,NULL,'f4d1002f964240cdb47105004b4c146e'),('19e64f52412611ecb0bb645d86dd6e62','2021-11-09',45,1,'Total OT','',0,0.0,0.0,0.0,0,15,8,NULL,'f4d1002f964240cdb47105004b4c146e'),('19e64f53412611ecbd95645d86dd6e62','2021-11-09',45,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,8,NULL,'f4d1002f964240cdb47105004b4c146e'),('19e6eb24412611eca6a9645d86dd6e62','2021-11-09',45,1,'Duration','',43200,1.0,12.0,720.0,0,1,8,NULL,'f4d1002f964240cdb47105004b4c146e'),('19e6eb25412611eca878645d86dd6e62','2021-11-09',45,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,8,NULL,'f4d1002f964240cdb47105004b4c146e'),('1c493bdc412611ecb90e645d86dd6e62','2021-11-09',45,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,9,NULL,'61dd3941109245f9a5b49727a85bc0ef'),('1c493bdd412611ecb052645d86dd6e62','2021-11-09',45,1,'Total OT','',0,0.0,0.0,0.0,0,15,9,NULL,'61dd3941109245f9a5b49727a85bc0ef'),('1c493bde412611ec8684645d86dd6e62','2021-11-09',45,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,9,NULL,'61dd3941109245f9a5b49727a85bc0ef'),('1c493bdf412611ec8435645d86dd6e62','2021-11-09',45,1,'Duration','',43200,1.0,12.0,720.0,0,1,9,NULL,'61dd3941109245f9a5b49727a85bc0ef'),('1c493be0412611ec901e645d86dd6e62','2021-11-09',45,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,9,NULL,'61dd3941109245f9a5b49727a85bc0ef'),('1dedd06f412611ec92bf645d86dd6e62','2021-11-09',45,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,7,NULL,'cae9c07fdd1745679744a8b8f56acaeb'),('1dedd070412611ecbdaa645d86dd6e62','2021-11-09',45,1,'Total OT','',0,0.0,0.0,0.0,0,15,7,NULL,'cae9c07fdd1745679744a8b8f56acaeb'),('1dedd071412611ec906e645d86dd6e62','2021-11-09',45,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,7,NULL,'cae9c07fdd1745679744a8b8f56acaeb'),('1dedd072412611ec9b5c645d86dd6e62','2021-11-09',45,1,'Duration','',43200,1.0,12.0,720.0,0,1,7,NULL,'cae9c07fdd1745679744a8b8f56acaeb'),('1dee6c92412611eca194645d86dd6e62','2021-11-09',45,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,7,NULL,'cae9c07fdd1745679744a8b8f56acaeb'),('1f1b35d9412611ec95ce645d86dd6e62','2021-11-09',45,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,6,NULL,'2beccc8862d8402689d2025f67e850ab'),('1f1b35da412611ecba55645d86dd6e62','2021-11-09',45,1,'Total OT','',0,0.0,0.0,0.0,0,15,6,NULL,'2beccc8862d8402689d2025f67e850ab'),('1f1b35db412611eca160645d86dd6e62','2021-11-09',45,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,6,NULL,'2beccc8862d8402689d2025f67e850ab'),('1f1b35dc412611eca6ac645d86dd6e62','2021-11-09',45,1,'Duration','',43200,1.0,12.0,720.0,0,1,6,NULL,'2beccc8862d8402689d2025f67e850ab'),('1f1b35dd412611eca1ef645d86dd6e62','2021-11-09',45,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,6,NULL,'2beccc8862d8402689d2025f67e850ab'),('2c943f1e45ea11ec99c4645d86dd6e62','2021-11-15',46,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,1,NULL,'71e55377d17441078205a15f417265c6'),('2c943f1f45ea11ecb882645d86dd6e62','2021-11-15',46,0,'Total OT','',0,0.0,0.0,0.0,0,15,1,NULL,'71e55377d17441078205a15f417265c6'),('2c943f2045ea11ecb668645d86dd6e62','2021-11-15',46,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,1,NULL,'71e55377d17441078205a15f417265c6'),('2c943f2145ea11ecb4a9645d86dd6e62','2021-11-15',46,0,'Duration','',43200,1.0,12.0,720.0,0,1,1,NULL,'71e55377d17441078205a15f417265c6'),('2c94662445ea11ecaa7a645d86dd6e62','2021-11-15',46,0,'Total Hours','',31671,0.7,8.8,527.9,0,3,1,NULL,'71e55377d17441078205a15f417265c6'),('2c94662545ea11ec9a26645d86dd6e62','2021-11-15',46,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,1,NULL,'71e55377d17441078205a15f417265c6'),('2ed19e4d45ea11eca5cf645d86dd6e62','2021-11-15',46,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,3,NULL,'254a84a1e92c438ca052be923aca2a13'),('2ed19e4e45ea11ec8d44645d86dd6e62','2021-11-15',46,0,'Total OT','',0,0.0,0.0,0.0,0,15,3,NULL,'254a84a1e92c438ca052be923aca2a13'),('2ed19e4f45ea11eca30a645d86dd6e62','2021-11-15',46,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,3,NULL,'254a84a1e92c438ca052be923aca2a13'),('2ed19e5045ea11ecad19645d86dd6e62','2021-11-15',46,0,'Duration','',43200,1.0,12.0,720.0,0,1,3,NULL,'254a84a1e92c438ca052be923aca2a13'),('2ed19e5145ea11eca520645d86dd6e62','2021-11-15',46,0,'Total Hours','',31673,0.7,8.8,527.9,0,3,3,NULL,'254a84a1e92c438ca052be923aca2a13'),('2ed19e5245ea11eca594645d86dd6e62','2021-11-15',46,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,3,NULL,'254a84a1e92c438ca052be923aca2a13'),('3133f9fb45ea11ec903b645d86dd6e62','2021-11-15',46,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,4,NULL,'fabb79d9917c4899b973b547429d67fb'),('3134bd8c45ea11eca801645d86dd6e62','2021-11-15',46,0,'Total OT','',0,0.0,0.0,0.0,0,15,4,NULL,'fabb79d9917c4899b973b547429d67fb'),('3134bd8d45ea11ec9180645d86dd6e62','2021-11-15',46,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,4,NULL,'fabb79d9917c4899b973b547429d67fb'),('3134bd8e45ea11ec93f4645d86dd6e62','2021-11-15',46,0,'Duration','',43200,1.0,12.0,720.0,0,1,4,NULL,'fabb79d9917c4899b973b547429d67fb'),('3134bd8f45ea11ecb0b1645d86dd6e62','2021-11-15',46,0,'Total Hours','',31674,0.7,8.8,527.9,0,3,4,NULL,'fabb79d9917c4899b973b547429d67fb'),('3134bd9045ea11eca756645d86dd6e62','2021-11-15',46,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,4,NULL,'fabb79d9917c4899b973b547429d67fb'),('339de9a945ea11ec914b645d86dd6e62','2021-11-15',46,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,6,NULL,'8b18795b41e2417f94312bd72b2592b6'),('339ead2645ea11eca23f645d86dd6e62','2021-11-15',46,0,'Total OT','',0,0.0,0.0,0.0,0,15,6,NULL,'8b18795b41e2417f94312bd72b2592b6'),('339ead2745ea11ec8f23645d86dd6e62','2021-11-15',46,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,6,NULL,'8b18795b41e2417f94312bd72b2592b6'),('339ead2845ea11ec8b1c645d86dd6e62','2021-11-15',46,0,'Duration','',43200,1.0,12.0,720.0,0,1,6,NULL,'8b18795b41e2417f94312bd72b2592b6'),('339ead2945ea11ec8c13645d86dd6e62','2021-11-15',46,0,'Total Hours','',31671,0.7,8.8,527.9,0,3,6,NULL,'8b18795b41e2417f94312bd72b2592b6'),('339ead2a45ea11ec9a4b645d86dd6e62','2021-11-15',46,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,6,NULL,'8b18795b41e2417f94312bd72b2592b6'),('362e14e345ea11eca8b4645d86dd6e62','2021-11-15',46,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,9,NULL,'d53ab4dc98aa4293a4c0c570bffcba8e'),('362e14e445ea11ec8ab4645d86dd6e62','2021-11-15',46,0,'Total OT','',0,0.0,0.0,0.0,0,15,9,NULL,'d53ab4dc98aa4293a4c0c570bffcba8e'),('362e14e545ea11eca228645d86dd6e62','2021-11-15',46,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,9,NULL,'d53ab4dc98aa4293a4c0c570bffcba8e'),('362e14e645ea11ec815e645d86dd6e62','2021-11-15',46,0,'Duration','',43200,1.0,12.0,720.0,0,1,9,NULL,'d53ab4dc98aa4293a4c0c570bffcba8e'),('362e14e745ea11ec889c645d86dd6e62','2021-11-15',46,0,'Total Hours','',31668,0.7,8.8,527.8,0,3,9,NULL,'d53ab4dc98aa4293a4c0c570bffcba8e'),('362e14e845ea11ec934f645d86dd6e62','2021-11-15',46,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,9,NULL,'d53ab4dc98aa4293a4c0c570bffcba8e'),('38b8c48c46b511ec8b1b645d86dd6e62','2021-11-16',46,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,1,NULL,'f53b6c90052c484eb1f642f36ae31a51'),('38b8c48d46b511ecb193645d86dd6e62','2021-11-16',46,1,'Total OT','',0,0.0,0.0,0.0,0,15,1,NULL,'f53b6c90052c484eb1f642f36ae31a51'),('38ba429446b511ecbc4a645d86dd6e62','2021-11-16',46,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,1,NULL,'f53b6c90052c484eb1f642f36ae31a51'),('38cc9b9846b511ecb365645d86dd6e62','2021-11-16',46,1,'Duration','',43200,1.0,12.0,720.0,0,1,1,NULL,'f53b6c90052c484eb1f642f36ae31a51'),('38cc9b9946b511ec9491645d86dd6e62','2021-11-16',46,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,3,NULL,'a4347c9412ec4178b98cbab80a1bc454'),('38ce241a46b511ecace6645d86dd6e62','2021-11-16',46,1,'Total Hours','',33088,0.8,9.2,551.5,0,3,1,NULL,'f53b6c90052c484eb1f642f36ae31a51'),('38ce241b46b511ecb667645d86dd6e62','2021-11-16',46,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,1,NULL,'f53b6c90052c484eb1f642f36ae31a51'),('3943982646b511ec8258645d86dd6e62','2021-11-16',46,1,'Total OT','',0,0.0,0.0,0.0,0,15,3,NULL,'a4347c9412ec4178b98cbab80a1bc454'),('3946b0ee46b511ec867e645d86dd6e62','2021-11-16',46,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,3,NULL,'a4347c9412ec4178b98cbab80a1bc454'),('3946b0ef46b511ecba87645d86dd6e62','2021-11-16',46,1,'Duration','',43200,1.0,12.0,720.0,0,1,3,NULL,'a4347c9412ec4178b98cbab80a1bc454'),('3948382646b511ec8d7c645d86dd6e62','2021-11-16',46,1,'Total Hours','',33088,0.8,9.2,551.5,0,3,3,NULL,'a4347c9412ec4178b98cbab80a1bc454'),('394dd7e346b511ecb73f645d86dd6e62','2021-11-16',46,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,3,NULL,'a4347c9412ec4178b98cbab80a1bc454'),('395a850c46b511ecb643645d86dd6e62','2021-11-16',46,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,4,NULL,'f973aa5bf252484dbdc36a548e3ea4c4'),('3960a8b846b511ecb0dc645d86dd6e62','2021-11-16',46,1,'Total OT','',0,0.0,0.0,0.0,0,15,4,NULL,'f973aa5bf252484dbdc36a548e3ea4c4'),('3960a8b946b511ecba65645d86dd6e62','2021-11-16',46,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,4,NULL,'f973aa5bf252484dbdc36a548e3ea4c4'),('3960a8ba46b511ecb8aa645d86dd6e62','2021-11-16',46,1,'Duration','',43200,1.0,12.0,720.0,0,1,4,NULL,'f973aa5bf252484dbdc36a548e3ea4c4'),('3960a8bb46b511ecb793645d86dd6e62','2021-11-16',46,1,'Total Hours','',33085,0.8,9.2,551.4,0,3,4,NULL,'f973aa5bf252484dbdc36a548e3ea4c4'),('39622e1046b511ec985d645d86dd6e62','2021-11-16',46,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,4,NULL,'f973aa5bf252484dbdc36a548e3ea4c4'),('39c553f746b511ec9c5a645d86dd6e62','2021-11-16',46,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,5,NULL,'f60c95b6c629493bba8cc0ffebc3e52d'),('39c553f846b511ec9bf9645d86dd6e62','2021-11-16',46,1,'Total OT','',0,0.0,0.0,0.0,0,15,5,NULL,'f60c95b6c629493bba8cc0ffebc3e52d'),('39c553f946b511eca289645d86dd6e62','2021-11-16',46,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,5,NULL,'f60c95b6c629493bba8cc0ffebc3e52d'),('39c553fa46b511ec896e645d86dd6e62','2021-11-16',46,1,'Duration','',43200,1.0,12.0,720.0,0,1,5,NULL,'f60c95b6c629493bba8cc0ffebc3e52d'),('39c553fb46b511ecae0e645d86dd6e62','2021-11-16',46,1,'Total Hours','',33085,0.8,9.2,551.4,0,3,5,NULL,'f60c95b6c629493bba8cc0ffebc3e52d'),('39c553fc46b511ec9bb3645d86dd6e62','2021-11-16',46,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,5,NULL,'f60c95b6c629493bba8cc0ffebc3e52d'),('3ac61eb045ea11ecada3645d86dd6e62','2021-11-15',46,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,11,NULL,'a1404357b5a449f7bb1054e952066c22'),('3ac645d245ea11ecbd02645d86dd6e62','2021-11-15',46,0,'Total OT','',0,0.0,0.0,0.0,0,15,11,NULL,'a1404357b5a449f7bb1054e952066c22'),('3ac645d345ea11ecb4e5645d86dd6e62','2021-11-15',46,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,11,NULL,'a1404357b5a449f7bb1054e952066c22'),('3ac645d445ea11ec9407645d86dd6e62','2021-11-15',46,0,'Duration','',43200,1.0,12.0,720.0,0,1,11,NULL,'a1404357b5a449f7bb1054e952066c22'),('3ac66cee45ea11ecaf5d645d86dd6e62','2021-11-15',46,0,'Total Hours','',31668,0.7,8.8,527.8,0,3,11,NULL,'a1404357b5a449f7bb1054e952066c22'),('3ac693ee45ea11ec89d5645d86dd6e62','2021-11-15',46,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,11,NULL,'a1404357b5a449f7bb1054e952066c22'),('3bbe62cd46b511ec978c645d86dd6e62','2021-11-16',46,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,2,NULL,'6cbd3d16e3c0468eb706351f26e49513'),('3bbe62ce46b511ec8bda645d86dd6e62','2021-11-16',46,1,'Total OT','',0,0.0,0.0,0.0,0,15,2,NULL,'6cbd3d16e3c0468eb706351f26e49513'),('3bbe62cf46b511ecbcf5645d86dd6e62','2021-11-16',46,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,2,NULL,'6cbd3d16e3c0468eb706351f26e49513'),('3bbe62d046b511ecb6ca645d86dd6e62','2021-11-16',46,1,'Duration','',43200,1.0,12.0,720.0,0,1,2,NULL,'6cbd3d16e3c0468eb706351f26e49513'),('3bbe62d146b511eca051645d86dd6e62','2021-11-16',46,1,'Total Hours','',33102,0.8,9.2,551.7,0,3,2,NULL,'6cbd3d16e3c0468eb706351f26e49513'),('3bbe62d246b511ec8a9d645d86dd6e62','2021-11-16',46,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,2,NULL,'6cbd3d16e3c0468eb706351f26e49513'),('3d46993546b511ec8128645d86dd6e62','2021-11-16',46,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,6,NULL,'9287878d44a74926904ad17fa3628032'),('3d46993646b511ec90ee645d86dd6e62','2021-11-16',46,1,'Total OT','',0,0.0,0.0,0.0,0,15,6,NULL,'9287878d44a74926904ad17fa3628032'),('3d46993746b511ecb097645d86dd6e62','2021-11-16',46,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,6,NULL,'9287878d44a74926904ad17fa3628032'),('3d46993846b511ec812a645d86dd6e62','2021-11-16',46,1,'Duration','',43200,1.0,12.0,720.0,0,1,6,NULL,'9287878d44a74926904ad17fa3628032'),('3d46993946b511ecb45f645d86dd6e62','2021-11-16',46,1,'Total Hours','',33119,0.8,9.2,552.0,0,3,6,NULL,'9287878d44a74926904ad17fa3628032'),('3d46993a46b511eca9d3645d86dd6e62','2021-11-16',46,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,6,NULL,'9287878d44a74926904ad17fa3628032'),('3f54987f46b511ecb876645d86dd6e62','2021-11-16',46,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,7,NULL,'0e817e7dab75477b8681d1605cee568b'),('3f54988046b511ec9054645d86dd6e62','2021-11-16',46,1,'Total OT','',0,0.0,0.0,0.0,0,15,7,NULL,'0e817e7dab75477b8681d1605cee568b'),('3f5534dc46b511eca60e645d86dd6e62','2021-11-16',46,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,7,NULL,'0e817e7dab75477b8681d1605cee568b'),('3f5534dd46b511ec8a4c645d86dd6e62','2021-11-16',46,1,'Duration','',43200,1.0,12.0,720.0,0,1,7,NULL,'0e817e7dab75477b8681d1605cee568b'),('3f5534de46b511ec9c4a645d86dd6e62','2021-11-16',46,1,'Total Hours','',33120,0.8,9.2,552.0,0,3,7,NULL,'0e817e7dab75477b8681d1605cee568b'),('3f5534df46b511ecaa71645d86dd6e62','2021-11-16',46,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,7,NULL,'0e817e7dab75477b8681d1605cee568b'),('40c0db4046b511ec9d88645d86dd6e62','2021-11-16',46,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,8,NULL,'7548520b5725475abdca7bbbd4e5354c'),('40c0db4146b511eca54b645d86dd6e62','2021-11-16',46,1,'Total OT','',0,0.0,0.0,0.0,0,15,8,NULL,'7548520b5725475abdca7bbbd4e5354c'),('40c0db4246b511ec9279645d86dd6e62','2021-11-16',46,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,8,NULL,'7548520b5725475abdca7bbbd4e5354c'),('40c0db4346b511ecb67f645d86dd6e62','2021-11-16',46,1,'Duration','',43200,1.0,12.0,720.0,0,1,8,NULL,'7548520b5725475abdca7bbbd4e5354c'),('40c0db4446b511eca9c8645d86dd6e62','2021-11-16',46,1,'Total Hours','',33120,0.8,9.2,552.0,0,3,8,NULL,'7548520b5725475abdca7bbbd4e5354c'),('40c0db4546b511eca941645d86dd6e62','2021-11-16',46,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,8,NULL,'7548520b5725475abdca7bbbd4e5354c'),('41f080ad46b511ecac46645d86dd6e62','2021-11-16',46,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,9,NULL,'d24ed603efc64fadb32d7ddc54f0214b'),('41f080ae46b511eca5cb645d86dd6e62','2021-11-16',46,1,'Total OT','',0,0.0,0.0,0.0,0,15,9,NULL,'d24ed603efc64fadb32d7ddc54f0214b'),('41f080af46b511eca8f1645d86dd6e62','2021-11-16',46,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,9,NULL,'d24ed603efc64fadb32d7ddc54f0214b'),('41f080b046b511eca15e645d86dd6e62','2021-11-16',46,1,'Duration','',43200,1.0,12.0,720.0,0,1,9,NULL,'d24ed603efc64fadb32d7ddc54f0214b'),('41f080b146b511eca7c2645d86dd6e62','2021-11-16',46,1,'Total Hours','',33120,0.8,9.2,552.0,0,3,9,NULL,'d24ed603efc64fadb32d7ddc54f0214b'),('41f080b246b511ecac7b645d86dd6e62','2021-11-16',46,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,9,NULL,'d24ed603efc64fadb32d7ddc54f0214b'),('43815f2946b511ec8ca8645d86dd6e62','2021-11-16',46,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,11,NULL,'c5e34ad1ee8d41a5a4b7f5e61dc8ef64'),('43815f2a46b511eca0a8645d86dd6e62','2021-11-16',46,1,'Total OT','',0,0.0,0.0,0.0,0,15,11,NULL,'c5e34ad1ee8d41a5a4b7f5e61dc8ef64'),('43815f2b46b511ecb2d0645d86dd6e62','2021-11-16',46,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,11,NULL,'c5e34ad1ee8d41a5a4b7f5e61dc8ef64'),('43815f2c46b511ec975a645d86dd6e62','2021-11-16',46,1,'Duration','',43200,1.0,12.0,720.0,0,1,11,NULL,'c5e34ad1ee8d41a5a4b7f5e61dc8ef64'),('43815f2d46b511ecafc2645d86dd6e62','2021-11-16',46,1,'Total Hours','',33117,0.8,9.2,552.0,0,3,11,NULL,'c5e34ad1ee8d41a5a4b7f5e61dc8ef64'),('43815f2e46b511eca646645d86dd6e62','2021-11-16',46,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,11,NULL,'c5e34ad1ee8d41a5a4b7f5e61dc8ef64'),('5291b98841e511ecba12645d86dd6e62','2021-11-10',45,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,4,NULL,'a2a6bdf198ef40388cf6e37a7989eadf'),('5291b98941e511ecb044645d86dd6e62','2021-11-10',45,2,'Total OT','',0,0.0,0.0,0.0,0,15,4,NULL,'a2a6bdf198ef40388cf6e37a7989eadf'),('5291feca41e511ecb972645d86dd6e62','2021-11-10',45,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,4,NULL,'a2a6bdf198ef40388cf6e37a7989eadf'),('5291fecb41e511ecb88b645d86dd6e62','2021-11-10',45,2,'Duration','',43200,1.0,12.0,720.0,0,1,4,NULL,'a2a6bdf198ef40388cf6e37a7989eadf'),('5291fecc41e511eca061645d86dd6e62','2021-11-10',45,2,'Total Hours','',21678,0.5,6.0,361.3,0,3,4,NULL,'a2a6bdf198ef40388cf6e37a7989eadf'),('5291fecd41e511ec9431645d86dd6e62','2021-11-10',45,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,4,NULL,'a2a6bdf198ef40388cf6e37a7989eadf'),('5c2b344045e911ecab67645d86dd6e62','2021-11-15',46,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,2,NULL,'05857b25258c4d11b350d147b052640a'),('5c3d7ee345e911ec98d1645d86dd6e62','2021-11-15',46,0,'Total OT','',0,0.0,0.0,0.0,0,15,2,NULL,'05857b25258c4d11b350d147b052640a'),('5c3d7ee545e911ecb83b645d86dd6e62','2021-11-15',46,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,2,NULL,'05857b25258c4d11b350d147b052640a'),('5c3d7ee745e911ec8f9c645d86dd6e62','2021-11-15',46,0,'Duration','',43200,1.0,12.0,720.0,0,1,2,NULL,'05857b25258c4d11b350d147b052640a'),('5c3d7ee945e911ecb2b8645d86dd6e62','2021-11-15',46,0,'Total Hours','',31319,0.7,8.7,522.0,0,3,2,NULL,'05857b25258c4d11b350d147b052640a'),('5c3d7eeb45e911eca1aa645d86dd6e62','2021-11-15',46,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,2,NULL,'05857b25258c4d11b350d147b052640a'),('60713d1f45e911eca5c0645d86dd6e62','2021-11-15',46,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,5,NULL,'9edab3d5d3ea47dbbefeda55c44588bc'),('607200b845e911ecbd60645d86dd6e62','2021-11-15',46,0,'Total OT','',0,0.0,0.0,0.0,0,15,5,NULL,'9edab3d5d3ea47dbbefeda55c44588bc'),('607200b945e911ec9ecc645d86dd6e62','2021-11-15',46,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,5,NULL,'9edab3d5d3ea47dbbefeda55c44588bc'),('607200ba45e911ec879f645d86dd6e62','2021-11-15',46,0,'Duration','',43200,1.0,12.0,720.0,0,1,5,NULL,'9edab3d5d3ea47dbbefeda55c44588bc'),('607200bb45e911ec8702645d86dd6e62','2021-11-15',46,0,'Total Hours','',31318,0.7,8.7,522.0,0,3,5,NULL,'9edab3d5d3ea47dbbefeda55c44588bc'),('607200bc45e911ec8f5d645d86dd6e62','2021-11-15',46,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,5,NULL,'9edab3d5d3ea47dbbefeda55c44588bc'),('631cd80b45e911eca293645d86dd6e62','2021-11-15',46,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,7,NULL,'4244288bd6654460a67b9e0184938bbd'),('631cd80c45e911ec8359645d86dd6e62','2021-11-15',46,0,'Total OT','',0,0.0,0.0,0.0,0,15,7,NULL,'4244288bd6654460a67b9e0184938bbd'),('631cd80d45e911eca120645d86dd6e62','2021-11-15',46,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,7,NULL,'4244288bd6654460a67b9e0184938bbd'),('631cd80e45e911ec95f9645d86dd6e62','2021-11-15',46,0,'Duration','',43200,1.0,12.0,720.0,0,1,7,NULL,'4244288bd6654460a67b9e0184938bbd'),('631cd80f45e911ec9e1a645d86dd6e62','2021-11-15',46,0,'Total Hours','',31318,0.7,8.7,522.0,0,3,7,NULL,'4244288bd6654460a67b9e0184938bbd'),('631cd81045e911ecbee8645d86dd6e62','2021-11-15',46,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,7,NULL,'4244288bd6654460a67b9e0184938bbd'),('64203b1945e911eca3ce645d86dd6e62','2021-11-15',46,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,8,NULL,'04609902d09d46db92d77a5d9fba1e3e'),('64203b1a45e911ecae64645d86dd6e62','2021-11-15',46,0,'Total OT','',0,0.0,0.0,0.0,0,15,8,NULL,'04609902d09d46db92d77a5d9fba1e3e'),('64203b1b45e911ec9dbd645d86dd6e62','2021-11-15',46,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,8,NULL,'04609902d09d46db92d77a5d9fba1e3e'),('64203b1c45e911eca860645d86dd6e62','2021-11-15',46,0,'Duration','',43200,1.0,12.0,720.0,0,1,8,NULL,'04609902d09d46db92d77a5d9fba1e3e'),('64203b1d45e911ec9ac7645d86dd6e62','2021-11-15',46,0,'Total Hours','',31319,0.7,8.7,522.0,0,3,8,NULL,'04609902d09d46db92d77a5d9fba1e3e'),('64203b1e45e911ec9121645d86dd6e62','2021-11-15',46,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,8,NULL,'04609902d09d46db92d77a5d9fba1e3e'),('65a13e6e42c611eca721645d86dd6e62','2021-11-11',45,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,2,NULL,'fbf876b3e98646378c0932b77076ed9c'),('65a1657a42c611ec947a645d86dd6e62','2021-11-11',45,3,'Total OT','',0,0.0,0.0,0.0,0,15,2,NULL,'fbf876b3e98646378c0932b77076ed9c'),('65a1657b42c611ecad7e645d86dd6e62','2021-11-11',45,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,2,NULL,'fbf876b3e98646378c0932b77076ed9c'),('65a1657c42c611ecadad645d86dd6e62','2021-11-11',45,3,'Duration','',43200,1.0,12.0,720.0,0,1,2,NULL,'fbf876b3e98646378c0932b77076ed9c'),('65a18c8a42c611ec9476645d86dd6e62','2021-11-11',45,3,'Total Hours','',31599,0.7,8.8,526.7,0,3,2,NULL,'fbf876b3e98646378c0932b77076ed9c'),('65a18c8b42c611ec8402645d86dd6e62','2021-11-11',45,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,2,NULL,'fbf876b3e98646378c0932b77076ed9c'),('6798edd042c611ec8727645d86dd6e62','2021-11-11',45,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,1,NULL,'b8ae7b2d8b2f4095a1e8adb4f39edb7e'),('6798edd142c611ec8e7e645d86dd6e62','2021-11-11',45,3,'Total OT','',0,0.0,0.0,0.0,0,15,1,NULL,'b8ae7b2d8b2f4095a1e8adb4f39edb7e'),('679914e242c611ec8617645d86dd6e62','2021-11-11',45,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,1,NULL,'b8ae7b2d8b2f4095a1e8adb4f39edb7e'),('679914e342c611ec9869645d86dd6e62','2021-11-11',45,3,'Duration','',43200,1.0,12.0,720.0,0,1,1,NULL,'b8ae7b2d8b2f4095a1e8adb4f39edb7e'),('679914e442c611ecbbde645d86dd6e62','2021-11-11',45,3,'Total Hours','',31601,0.7,8.8,526.7,0,3,1,NULL,'b8ae7b2d8b2f4095a1e8adb4f39edb7e'),('67993bee42c611ec8a97645d86dd6e62','2021-11-11',45,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,1,NULL,'b8ae7b2d8b2f4095a1e8adb4f39edb7e'),('6981478142c611ec84f5645d86dd6e62','2021-11-11',45,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,3,NULL,'dca720404fc146a7abf050be8491aaf4'),('69814ac250a611eca91e645d86dd6e62','2021-11-24',47,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,2,NULL,'7bbf535bbfa345db9e33c04939940639'),('69816e9c42c611ec8d06645d86dd6e62','2021-11-11',45,3,'Total OT','',0,0.0,0.0,0.0,0,15,3,NULL,'dca720404fc146a7abf050be8491aaf4'),('69816e9d42c611ec9d67645d86dd6e62','2021-11-11',45,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,3,NULL,'dca720404fc146a7abf050be8491aaf4'),('698195b442c611ec8094645d86dd6e62','2021-11-11',45,3,'Duration','',43200,1.0,12.0,720.0,0,1,3,NULL,'dca720404fc146a7abf050be8491aaf4'),('698195b542c611ec953f645d86dd6e62','2021-11-11',45,3,'Total Hours','',31602,0.7,8.8,526.7,0,3,3,NULL,'dca720404fc146a7abf050be8491aaf4'),('6981bcc242c611ecaa4f645d86dd6e62','2021-11-11',45,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,3,NULL,'dca720404fc146a7abf050be8491aaf4'),('698ca29e50a611ecb64d645d86dd6e62','2021-11-24',47,2,'Total OT','',0,0.0,0.0,0.0,0,15,2,NULL,'7bbf535bbfa345db9e33c04939940639'),('698cc9ae50a611ecaaad645d86dd6e62','2021-11-24',47,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,1,NULL,'85f1e7a4cacd4d1cbaf53f38d6a5b9de'),('698d8d0050a611ec9f6f645d86dd6e62','2021-11-24',47,2,'Total OT','',0,0.0,0.0,0.0,0,15,1,NULL,'85f1e7a4cacd4d1cbaf53f38d6a5b9de'),('698fd71250a611ec9d6e645d86dd6e62','2021-11-24',47,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,2,NULL,'7bbf535bbfa345db9e33c04939940639'),('698ffe1a50a611ec9cce645d86dd6e62','2021-11-24',47,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,1,NULL,'85f1e7a4cacd4d1cbaf53f38d6a5b9de'),('69a3dcd850a611eca824645d86dd6e62','2021-11-24',47,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,3,NULL,'86da06ed8ba2494bb5f01baa7202cd59'),('69a403e850a611ecb246645d86dd6e62','2021-11-24',47,2,'Duration','',43200,1.0,12.0,720.0,0,1,2,NULL,'7bbf535bbfa345db9e33c04939940639'),('69a42b1450a611ec8a61645d86dd6e62','2021-11-24',47,2,'Duration','',43200,1.0,12.0,720.0,0,1,1,NULL,'85f1e7a4cacd4d1cbaf53f38d6a5b9de'),('69a4521c50a611eca718645d86dd6e62','2021-11-24',47,2,'Total OT','',0,0.0,0.0,0.0,0,15,3,NULL,'86da06ed8ba2494bb5f01baa7202cd59'),('69a4521d50a611ec9350645d86dd6e62','2021-11-24',47,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,3,NULL,'86da06ed8ba2494bb5f01baa7202cd59'),('69a4521e50a611ec99b7645d86dd6e62','2021-11-24',47,2,'Duration','',43200,1.0,12.0,720.0,0,1,3,NULL,'86da06ed8ba2494bb5f01baa7202cd59'),('69a4791850a611ec9b24645d86dd6e62','2021-11-24',47,2,'Total Hours','',32343,0.7,9.0,539.1,0,3,3,NULL,'86da06ed8ba2494bb5f01baa7202cd59'),('69ac2ae450a611ec8412645d86dd6e62','2021-11-24',47,2,'Total Hours','',32343,0.7,9.0,539.1,0,3,2,NULL,'7bbf535bbfa345db9e33c04939940639'),('69ac2ae550a611eca107645d86dd6e62','2021-11-24',47,2,'Total Hours','',32343,0.7,9.0,539.1,0,3,1,NULL,'85f1e7a4cacd4d1cbaf53f38d6a5b9de'),('69ac2ae650a611ec8244645d86dd6e62','2021-11-24',47,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,3,NULL,'86da06ed8ba2494bb5f01baa7202cd59'),('6a1d52e250a611ec9298645d86dd6e62','2021-11-24',47,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,4,NULL,'8f50d1e142e94e2793521a5f463adac6'),('6a1d52e350a611eca639645d86dd6e62','2021-11-24',47,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,2,NULL,'7bbf535bbfa345db9e33c04939940639'),('6a5b919850a611ecbac9645d86dd6e62','2021-11-24',47,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,1,NULL,'85f1e7a4cacd4d1cbaf53f38d6a5b9de'),('6a875be242c611ecb0b2645d86dd6e62','2021-11-11',45,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,4,NULL,'ecfd78252239443b946ab68eb77737eb'),('6a875be342c611eca391645d86dd6e62','2021-11-11',45,3,'Total OT','',0,0.0,0.0,0.0,0,15,4,NULL,'ecfd78252239443b946ab68eb77737eb'),('6a875be442c611ecb883645d86dd6e62','2021-11-11',45,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,4,NULL,'ecfd78252239443b946ab68eb77737eb'),('6a875be542c611ec8728645d86dd6e62','2021-11-11',45,3,'Duration','',43200,1.0,12.0,720.0,0,1,4,NULL,'ecfd78252239443b946ab68eb77737eb'),('6a8782e842c611ec88b9645d86dd6e62','2021-11-11',45,3,'Total Hours','',31583,0.7,8.8,526.4,0,3,4,NULL,'ecfd78252239443b946ab68eb77737eb'),('6a8782e942c611ecad35645d86dd6e62','2021-11-11',45,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,4,NULL,'ecfd78252239443b946ab68eb77737eb'),('6b024a5c50a611ec8706645d86dd6e62','2021-11-24',47,2,'Total OT','',0,0.0,0.0,0.0,0,15,4,NULL,'8f50d1e142e94e2793521a5f463adac6'),('6b22b1de50a611ecbfeb645d86dd6e62','2021-11-24',47,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,4,NULL,'8f50d1e142e94e2793521a5f463adac6'),('6b22d8e450a611ecad49645d86dd6e62','2021-11-24',47,2,'Duration','',43200,1.0,12.0,720.0,0,1,4,NULL,'8f50d1e142e94e2793521a5f463adac6'),('6b24adb650a611ec812d645d86dd6e62','2021-11-24',47,2,'Total Hours','',32343,0.7,9.0,539.1,0,3,4,NULL,'8f50d1e142e94e2793521a5f463adac6'),('6b2522e250a611ec85d3645d86dd6e62','2021-11-24',47,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,4,NULL,'8f50d1e142e94e2793521a5f463adac6'),('6c44b88c50a611ecb575645d86dd6e62','2021-11-24',47,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,5,NULL,'a8d8a6cf569e43229f077dbe8a250beb'),('6c54223650a611eca256645d86dd6e62','2021-11-24',47,2,'Total OT','',0,0.0,0.0,0.0,0,15,5,NULL,'a8d8a6cf569e43229f077dbe8a250beb'),('6c5581d850a611ec9bfc645d86dd6e62','2021-11-24',47,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,5,NULL,'a8d8a6cf569e43229f077dbe8a250beb'),('6c77da6e50a611ec84f6645d86dd6e62','2021-11-24',47,2,'Duration','',43200,1.0,12.0,720.0,0,1,5,NULL,'a8d8a6cf569e43229f077dbe8a250beb'),('6c77da6f50a611eca9ca645d86dd6e62','2021-11-24',47,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,6,NULL,'d5fea8ef9e0d459bb1dbbb4a39f79a3c'),('6c8ebe6250a611ec883b645d86dd6e62','2021-11-24',47,2,'Total Hours','',32329,0.7,9.0,538.8,0,3,5,NULL,'a8d8a6cf569e43229f077dbe8a250beb'),('6c8ee56850a611ecaac3645d86dd6e62','2021-11-24',47,2,'Total OT','',0,0.0,0.0,0.0,0,15,6,NULL,'d5fea8ef9e0d459bb1dbbb4a39f79a3c'),('6c8ee56950a611ec8abc645d86dd6e62','2021-11-24',47,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,7,NULL,'e77832cfcdf04fd58d24dcf6d4aa9bbc'),('6c8f81a850a611ecae8a645d86dd6e62','2021-11-24',47,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,5,NULL,'a8d8a6cf569e43229f077dbe8a250beb'),('6cf37b6650a611ecb3ff645d86dd6e62','2021-11-24',47,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,6,NULL,'d5fea8ef9e0d459bb1dbbb4a39f79a3c'),('6cf3c98a50a611ecb8bc645d86dd6e62','2021-11-24',47,2,'Duration','',43200,1.0,12.0,720.0,0,1,6,NULL,'d5fea8ef9e0d459bb1dbbb4a39f79a3c'),('6cf3c98b50a611ec982a645d86dd6e62','2021-11-24',47,2,'Total OT','',0,0.0,0.0,0.0,0,15,7,NULL,'e77832cfcdf04fd58d24dcf6d4aa9bbc'),('6cf6d6cc50a611ec8c03645d86dd6e62','2021-11-24',47,2,'Total Hours','',32328,0.7,9.0,538.8,0,3,6,NULL,'d5fea8ef9e0d459bb1dbbb4a39f79a3c'),('6cf6fde250a611eca760645d86dd6e62','2021-11-24',47,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,7,NULL,'e77832cfcdf04fd58d24dcf6d4aa9bbc'),('6cf6fde350a611ec85e6645d86dd6e62','2021-11-24',47,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,6,NULL,'d5fea8ef9e0d459bb1dbbb4a39f79a3c'),('6d2d05fe50a611ecbf0d645d86dd6e62','2021-11-24',47,2,'Duration','',43200,1.0,12.0,720.0,0,1,7,NULL,'e77832cfcdf04fd58d24dcf6d4aa9bbc'),('6d340b0a50a611ec8fe4645d86dd6e62','2021-11-24',47,2,'Total Hours','',32329,0.7,9.0,538.8,0,3,7,NULL,'e77832cfcdf04fd58d24dcf6d4aa9bbc'),('6d389f0650a611ec9c04645d86dd6e62','2021-11-24',47,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,7,NULL,'e77832cfcdf04fd58d24dcf6d4aa9bbc'),('6d9502b650a611ec9570645d86dd6e62','2021-11-24',47,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,8,NULL,'8b3cb7c07cee4116a7a47c8c4c05ee25'),('6da3ace850a611eca6e6645d86dd6e62','2021-11-24',47,2,'Total OT','',0,0.0,0.0,0.0,0,15,8,NULL,'8b3cb7c07cee4116a7a47c8c4c05ee25'),('6dac8ac842c611ecbd4f645d86dd6e62','2021-11-11',45,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,6,NULL,'25f6a7dc8bf446e686928ec23c1e3116'),('6dac8ac942c611ec9b2a645d86dd6e62','2021-11-11',45,3,'Total OT','',0,0.0,0.0,0.0,0,15,6,NULL,'25f6a7dc8bf446e686928ec23c1e3116'),('6dac8aca42c611ec99fa645d86dd6e62','2021-11-11',45,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,6,NULL,'25f6a7dc8bf446e686928ec23c1e3116'),('6dacb1ca42c611eca22e645d86dd6e62','2021-11-11',45,3,'Duration','',43200,1.0,12.0,720.0,0,1,6,NULL,'25f6a7dc8bf446e686928ec23c1e3116'),('6dacb1cb42c611ec9351645d86dd6e62','2021-11-11',45,3,'Total Hours','',31580,0.7,8.8,526.3,0,3,6,NULL,'25f6a7dc8bf446e686928ec23c1e3116'),('6dacb1cc42c611ecaed6645d86dd6e62','2021-11-11',45,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,6,NULL,'25f6a7dc8bf446e686928ec23c1e3116'),('6deac26e50a611ec93dd645d86dd6e62','2021-11-24',47,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,8,NULL,'8b3cb7c07cee4116a7a47c8c4c05ee25'),('6dedf6c250a611ec9226645d86dd6e62','2021-11-24',47,2,'Duration','',43200,1.0,12.0,720.0,0,1,8,NULL,'8b3cb7c07cee4116a7a47c8c4c05ee25'),('6def2f4250a611ec827d645d86dd6e62','2021-11-24',47,2,'Total Hours','',32328,0.7,9.0,538.8,0,3,8,NULL,'8b3cb7c07cee4116a7a47c8c4c05ee25'),('6df0b60b50a611ecb166645d86dd6e62','2021-11-24',47,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,8,NULL,'8b3cb7c07cee4116a7a47c8c4c05ee25'),('6e2f2dc250a611ecb423645d86dd6e62','2021-11-24',47,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,9,NULL,'622576a64b0041dcbcb47c72bface19c'),('6e31c5e850a611ec83e4645d86dd6e62','2021-11-24',47,2,'Total OT','',0,0.0,0.0,0.0,0,15,9,NULL,'622576a64b0041dcbcb47c72bface19c'),('6e31eceb50a611ec9f59645d86dd6e62','2021-11-24',47,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,9,NULL,'622576a64b0041dcbcb47c72bface19c'),('6e3213f650a611ecab97645d86dd6e62','2021-11-24',47,2,'Duration','',43200,1.0,12.0,720.0,0,1,9,NULL,'622576a64b0041dcbcb47c72bface19c'),('6e3213f750a611ec9f09645d86dd6e62','2021-11-24',47,2,'Total Hours','',32328,0.7,9.0,538.8,0,3,9,NULL,'622576a64b0041dcbcb47c72bface19c'),('6e3213f850a611ec96b8645d86dd6e62','2021-11-24',47,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,9,NULL,'622576a64b0041dcbcb47c72bface19c'),('6e96303a50a611ec8a18645d86dd6e62','2021-11-24',47,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,11,NULL,'bffbadc96d4149e69170ee707a7a9347'),('6ea5782850a611ec9918645d86dd6e62','2021-11-24',47,2,'Total OT','',0,0.0,0.0,0.0,0,15,11,NULL,'bffbadc96d4149e69170ee707a7a9347'),('6ea5782a50a611ecb922645d86dd6e62','2021-11-24',47,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,11,NULL,'bffbadc96d4149e69170ee707a7a9347'),('6eaa084650a611ec8498645d86dd6e62','2021-11-24',47,2,'Duration','',43200,1.0,12.0,720.0,0,1,11,NULL,'bffbadc96d4149e69170ee707a7a9347'),('6eab151850a611ec8906645d86dd6e62','2021-11-24',47,2,'Total Hours','',32329,0.7,9.0,538.8,0,3,11,NULL,'bffbadc96d4149e69170ee707a7a9347'),('6eabb12550a611ecba23645d86dd6e62','2021-11-24',47,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,11,NULL,'bffbadc96d4149e69170ee707a7a9347'),('6f184b1442c611eca0b1645d86dd6e62','2021-11-11',45,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,7,NULL,'ad2146b444c04606a5e5d28753bfcda7'),('6f184b1542c611ecb77e645d86dd6e62','2021-11-11',45,3,'Total OT','',0,0.0,0.0,0.0,0,15,7,NULL,'ad2146b444c04606a5e5d28753bfcda7'),('6f184b1642c611eca6d1645d86dd6e62','2021-11-11',45,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,7,NULL,'ad2146b444c04606a5e5d28753bfcda7'),('6f18722442c611ec8be1645d86dd6e62','2021-11-11',45,3,'Duration','',43200,1.0,12.0,720.0,0,1,7,NULL,'ad2146b444c04606a5e5d28753bfcda7'),('6f18722542c611ec8caa645d86dd6e62','2021-11-11',45,3,'Total Hours','',31580,0.7,8.8,526.3,0,3,7,NULL,'ad2146b444c04606a5e5d28753bfcda7'),('6f18722642c611ec8940645d86dd6e62','2021-11-11',45,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,7,NULL,'ad2146b444c04606a5e5d28753bfcda7'),('707614e842c611eca37b645d86dd6e62','2021-11-11',45,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,8,NULL,'802c26680d8f4e7188e8be0eb009e5dc'),('707614e942c611ecaa9c645d86dd6e62','2021-11-11',45,3,'Total OT','',0,0.0,0.0,0.0,0,15,8,NULL,'802c26680d8f4e7188e8be0eb009e5dc'),('70763be442c611ec8edd645d86dd6e62','2021-11-11',45,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,8,NULL,'802c26680d8f4e7188e8be0eb009e5dc'),('70763be542c611ecafdd645d86dd6e62','2021-11-11',45,3,'Duration','',43200,1.0,12.0,720.0,0,1,8,NULL,'802c26680d8f4e7188e8be0eb009e5dc'),('70763be642c611eca352645d86dd6e62','2021-11-11',45,3,'Total Hours','',31579,0.7,8.8,526.3,0,3,8,NULL,'802c26680d8f4e7188e8be0eb009e5dc'),('707662f842c611ec827a645d86dd6e62','2021-11-11',45,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,8,NULL,'802c26680d8f4e7188e8be0eb009e5dc'),('717a0bba42c611ec9f5e645d86dd6e62','2021-11-11',45,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,9,NULL,'a7b34d93151540e28362b39ee6781c34'),('717a0bbb42c611ec960d645d86dd6e62','2021-11-11',45,3,'Total OT','',0,0.0,0.0,0.0,0,15,9,NULL,'a7b34d93151540e28362b39ee6781c34'),('717a32be42c611ecb228645d86dd6e62','2021-11-11',45,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,9,NULL,'a7b34d93151540e28362b39ee6781c34'),('717a32bf42c611eca6b6645d86dd6e62','2021-11-11',45,3,'Duration','',43200,1.0,12.0,720.0,0,1,9,NULL,'a7b34d93151540e28362b39ee6781c34'),('717a32c042c611ecac84645d86dd6e62','2021-11-11',45,3,'Total Hours','',31579,0.7,8.8,526.3,0,3,9,NULL,'a7b34d93151540e28362b39ee6781c34'),('717a32c142c611ec8e8f645d86dd6e62','2021-11-11',45,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,9,NULL,'a7b34d93151540e28362b39ee6781c34'),('72960ff550a611ecae15645d86dd6e62','2021-11-25',47,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,6,NULL,'52a080e42cc840739dc522ab319710ae'),('72bf075d50a611ec97c5645d86dd6e62','2021-11-25',47,3,'Total OT','',0,0.0,0.0,0.0,0,15,6,NULL,'52a080e42cc840739dc522ab319710ae'),('7331d5b450a611eca072645d86dd6e62','2021-11-25',47,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,6,NULL,'52a080e42cc840739dc522ab319710ae'),('7333f89e50a611ec81ad645d86dd6e62','2021-11-25',47,3,'Duration','',43200,1.0,12.0,720.0,0,1,6,NULL,'52a080e42cc840739dc522ab319710ae'),('7334ed1c50a611ecb8ec645d86dd6e62','2021-11-25',47,3,'Total Hours','',33855,0.8,9.4,564.3,0,3,6,NULL,'52a080e42cc840739dc522ab319710ae'),('738a290b50a611ec8bdf645d86dd6e62','2021-11-25',47,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,7,NULL,'dcb5d8dff2f54db786c2c32d5ffc3cb3'),('73adab9a50a611ec83cb645d86dd6e62','2021-11-25',47,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,6,NULL,'52a080e42cc840739dc522ab319710ae'),('73e7887a42c611ec96f6645d86dd6e62','2021-11-11',45,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,11,NULL,'64ad1e5afae743b9bc130d28a496731a'),('73e7af7a42c611ecaabd645d86dd6e62','2021-11-11',45,3,'Total OT','',0,0.0,0.0,0.0,0,15,11,NULL,'64ad1e5afae743b9bc130d28a496731a'),('73e7af7b42c611ec8ecf645d86dd6e62','2021-11-11',45,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,11,NULL,'64ad1e5afae743b9bc130d28a496731a'),('73e7d69442c611ec83fd645d86dd6e62','2021-11-11',45,3,'Duration','',43200,1.0,12.0,720.0,0,1,11,NULL,'64ad1e5afae743b9bc130d28a496731a'),('73e7fda842c611ecafd1645d86dd6e62','2021-11-11',45,3,'Total Hours','',12205,0.3,3.4,203.4,0,3,11,NULL,'64ad1e5afae743b9bc130d28a496731a'),('73e7fda942c611ecbc4a645d86dd6e62','2021-11-11',45,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,11,NULL,'64ad1e5afae743b9bc130d28a496731a'),('73eb990a50a611ecadcd645d86dd6e62','2021-11-25',47,3,'Total OT','',0,0.0,0.0,0.0,0,15,7,NULL,'dcb5d8dff2f54db786c2c32d5ffc3cb3'),('73ebe71a50a611eca34f645d86dd6e62','2021-11-25',47,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,7,NULL,'dcb5d8dff2f54db786c2c32d5ffc3cb3'),('73ee0a0050a611ec9c4c645d86dd6e62','2021-11-25',47,3,'Duration','',43200,1.0,12.0,720.0,0,1,7,NULL,'dcb5d8dff2f54db786c2c32d5ffc3cb3'),('7404b4cc50a611eca0c5645d86dd6e62','2021-11-25',47,3,'Total Hours','',33852,0.8,9.4,564.2,0,3,7,NULL,'dcb5d8dff2f54db786c2c32d5ffc3cb3'),('7458720c50a611ecb9e4645d86dd6e62','2021-11-25',47,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,8,NULL,'5a9595fee4df4afe90766d63c82e6785'),('7458720d50a611ec946f645d86dd6e62','2021-11-25',47,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,7,NULL,'dcb5d8dff2f54db786c2c32d5ffc3cb3'),('74b0ab1e50a611eca13a645d86dd6e62','2021-11-25',47,3,'Total OT','',0,0.0,0.0,0.0,0,15,8,NULL,'5a9595fee4df4afe90766d63c82e6785'),('74b240e150a611ec8b2a645d86dd6e62','2021-11-25',47,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,8,NULL,'5a9595fee4df4afe90766d63c82e6785'),('74b240e250a611ec9d5c645d86dd6e62','2021-11-25',47,3,'Duration','',43200,1.0,12.0,720.0,0,1,8,NULL,'5a9595fee4df4afe90766d63c82e6785'),('74c36a2f50a611ec8280645d86dd6e62','2021-11-25',47,3,'Total Hours','',33849,0.8,9.4,564.2,0,3,8,NULL,'5a9595fee4df4afe90766d63c82e6785'),('74c5d310412e11ec9ac6645d86dd6e62','2021-11-09',45,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,1,NULL,'bad02a450b0a4efbb85f3a3e1478f0df'),('74c5d311412e11ecbfcf645d86dd6e62','2021-11-09',45,1,'Total OT','',0,0.0,0.0,0.0,0,15,1,NULL,'bad02a450b0a4efbb85f3a3e1478f0df'),('74c5d312412e11ec9e79645d86dd6e62','2021-11-09',45,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,1,NULL,'bad02a450b0a4efbb85f3a3e1478f0df'),('74c5d313412e11ecaac6645d86dd6e62','2021-11-09',45,1,'Duration','',43200,1.0,12.0,720.0,0,1,1,NULL,'bad02a450b0a4efbb85f3a3e1478f0df'),('74c5d314412e11ec9c7a645d86dd6e62','2021-11-09',45,1,'Total Hours','',3964,0.1,1.1,66.1,0,3,1,NULL,'bad02a450b0a4efbb85f3a3e1478f0df'),('74c5d315412e11eca021645d86dd6e62','2021-11-09',45,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,1,NULL,'bad02a450b0a4efbb85f3a3e1478f0df'),('74f2ca4c50a611ec8ff6645d86dd6e62','2021-11-25',47,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,9,NULL,'1b7e7811aad84d7385c639a0797f2915'),('74f2ca4d50a611ecb639645d86dd6e62','2021-11-25',47,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,8,NULL,'5a9595fee4df4afe90766d63c82e6785'),('75e057c050a611ec9813645d86dd6e62','2021-11-25',47,3,'Total OT','',0,0.0,0.0,0.0,0,15,9,NULL,'1b7e7811aad84d7385c639a0797f2915'),('75e1e02750a611eca315645d86dd6e62','2021-11-25',47,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,9,NULL,'1b7e7811aad84d7385c639a0797f2915'),('75f73d2d50a611ec8bb0645d86dd6e62','2021-11-25',47,3,'Duration','',43200,1.0,12.0,720.0,0,1,9,NULL,'1b7e7811aad84d7385c639a0797f2915'),('760e220a50a611ecafff645d86dd6e62','2021-11-25',47,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,11,NULL,'ca58363ee5e747fa86267ae2c5cdcfc0'),('760e220b50a611ec92a2645d86dd6e62','2021-11-25',47,3,'Total Hours','',33848,0.8,9.4,564.1,0,3,9,NULL,'1b7e7811aad84d7385c639a0797f2915'),('760e220c50a611ec8025645d86dd6e62','2021-11-25',47,3,'Total OT','',0,0.0,0.0,0.0,0,15,11,NULL,'ca58363ee5e747fa86267ae2c5cdcfc0'),('760e220d50a611ecaf7f645d86dd6e62','2021-11-25',47,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,11,NULL,'ca58363ee5e747fa86267ae2c5cdcfc0'),('760e220e50a611ec9a88645d86dd6e62','2021-11-25',47,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,9,NULL,'1b7e7811aad84d7385c639a0797f2915'),('767518da50a611ec81a8645d86dd6e62','2021-11-25',47,3,'Duration','',43200,1.0,12.0,720.0,0,1,11,NULL,'ca58363ee5e747fa86267ae2c5cdcfc0'),('768216fb50a611ecaf9d645d86dd6e62','2021-11-25',47,3,'Total Hours','',33835,0.8,9.4,563.9,0,3,11,NULL,'ca58363ee5e747fa86267ae2c5cdcfc0'),('769afb0a50a611ec9f23645d86dd6e62','2021-11-25',47,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,2,NULL,'ca4ccebccc474908a6343e9f74ca50ae'),('769b221850a611ec81b1645d86dd6e62','2021-11-25',47,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,11,NULL,'ca58363ee5e747fa86267ae2c5cdcfc0'),('77425dc850a611ecae38645d86dd6e62','2021-11-25',47,3,'Total OT','',0,0.0,0.0,0.0,0,15,2,NULL,'ca4ccebccc474908a6343e9f74ca50ae'),('7744a6c150a611ec95de645d86dd6e62','2021-11-25',47,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,2,NULL,'ca4ccebccc474908a6343e9f74ca50ae'),('7752169050a611ec9b36645d86dd6e62','2021-11-25',47,3,'Duration','',43200,1.0,12.0,720.0,0,1,2,NULL,'ca4ccebccc474908a6343e9f74ca50ae'),('77523db450a611ecb153645d86dd6e62','2021-11-25',47,3,'Total Hours','',33889,0.8,9.4,564.8,0,3,2,NULL,'ca4ccebccc474908a6343e9f74ca50ae'),('775ff06650a611ecba17645d86dd6e62','2021-11-25',47,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,1,NULL,'4aeed5daa7764c3a9781700564a68c2c'),('775ff06750a611ec83cd645d86dd6e62','2021-11-25',47,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,2,NULL,'ca4ccebccc474908a6343e9f74ca50ae'),('77dc7b1a50a611ec896c645d86dd6e62','2021-11-25',47,3,'Total OT','',0,0.0,0.0,0.0,0,15,1,NULL,'4aeed5daa7764c3a9781700564a68c2c'),('77de020350a611ecaee6645d86dd6e62','2021-11-25',47,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,1,NULL,'4aeed5daa7764c3a9781700564a68c2c'),('77f4e94050a611ec9fb6645d86dd6e62','2021-11-25',47,3,'Duration','',43200,1.0,12.0,720.0,0,1,1,NULL,'4aeed5daa7764c3a9781700564a68c2c'),('77fc876250a611eca751645d86dd6e62','2021-11-25',47,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,3,NULL,'cdddca17103149189caad71078bb57bf'),('77fc876350a611ec8991645d86dd6e62','2021-11-25',47,3,'Total Hours','',33882,0.8,9.4,564.7,0,3,1,NULL,'4aeed5daa7764c3a9781700564a68c2c'),('77fc876450a611ecaddd645d86dd6e62','2021-11-25',47,3,'Total OT','',0,0.0,0.0,0.0,0,15,3,NULL,'cdddca17103149189caad71078bb57bf'),('77fc876550a611ec8aa0645d86dd6e62','2021-11-25',47,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,1,NULL,'4aeed5daa7764c3a9781700564a68c2c'),('781e170950a611ec9726645d86dd6e62','2021-11-25',47,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,3,NULL,'cdddca17103149189caad71078bb57bf'),('782430cb50a611ec9ebe645d86dd6e62','2021-11-25',47,3,'Duration','',43200,1.0,12.0,720.0,0,1,3,NULL,'cdddca17103149189caad71078bb57bf'),('782430cc50a611ecaeee645d86dd6e62','2021-11-25',47,3,'Total Hours','',33882,0.8,9.4,564.7,0,3,3,NULL,'cdddca17103149189caad71078bb57bf'),('782430cd50a611ecb682645d86dd6e62','2021-11-25',47,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,3,NULL,'cdddca17103149189caad71078bb57bf'),('783ec5cc50a611ecb4d7645d86dd6e62','2021-11-25',47,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,4,NULL,'bda5ffdffd0c436fb720c6a2e206e48a'),('783eece250a611ec9f94645d86dd6e62','2021-11-25',47,3,'Total OT','',0,0.0,0.0,0.0,0,15,4,NULL,'bda5ffdffd0c436fb720c6a2e206e48a'),('7840256750a611ecb9f9645d86dd6e62','2021-11-25',47,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,4,NULL,'bda5ffdffd0c436fb720c6a2e206e48a'),('784e726e50a611ec96bb645d86dd6e62','2021-11-25',47,3,'Duration','',43200,1.0,12.0,720.0,0,1,4,NULL,'bda5ffdffd0c436fb720c6a2e206e48a'),('7852432250a611ecb5bb645d86dd6e62','2021-11-25',47,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,5,NULL,'b00ba0ca1bde404dbd4f2819a280d507'),('78526a2e50a611eca51e645d86dd6e62','2021-11-25',47,3,'Total Hours','',33882,0.8,9.4,564.7,0,3,4,NULL,'bda5ffdffd0c436fb720c6a2e206e48a'),('7852913450a611ecb5a6645d86dd6e62','2021-11-25',47,3,'Total OT','',0,0.0,0.0,0.0,0,15,5,NULL,'b00ba0ca1bde404dbd4f2819a280d507'),('7852913550a611ec8bb9645d86dd6e62','2021-11-25',47,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,4,NULL,'bda5ffdffd0c436fb720c6a2e206e48a'),('78951eb650a611ec893e645d86dd6e62','2021-11-25',47,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,5,NULL,'b00ba0ca1bde404dbd4f2819a280d507'),('789c4c9050a611ecb6c3645d86dd6e62','2021-11-25',47,3,'Duration','',43200,1.0,12.0,720.0,0,1,5,NULL,'b00ba0ca1bde404dbd4f2819a280d507'),('789ee49850a611ecaa3d645d86dd6e62','2021-11-25',47,3,'Total Hours','',33874,0.8,9.4,564.6,0,3,5,NULL,'b00ba0ca1bde404dbd4f2819a280d507'),('789f0bb650a611ecab38645d86dd6e62','2021-11-25',47,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,5,NULL,'b00ba0ca1bde404dbd4f2819a280d507'),('7b31752050a611ecafb2645d86dd6e62','2021-11-26',47,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,2,NULL,'794c1659f9ee408b8a7ab7247d2c28c0'),('7b86dd8a50a611ec900c645d86dd6e62','2021-11-26',47,4,'Total OT','',0,0.0,0.0,0.0,0,15,2,NULL,'794c1659f9ee408b8a7ab7247d2c28c0'),('7b86dd8b50a611ec8a51645d86dd6e62','2021-11-26',47,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,2,NULL,'794c1659f9ee408b8a7ab7247d2c28c0'),('7bc3ef1d50a611ecbe03645d86dd6e62','2021-11-26',47,4,'Duration','',43200,1.0,12.0,720.0,0,1,2,NULL,'794c1659f9ee408b8a7ab7247d2c28c0'),('7bcd9fed50a611eca311645d86dd6e62','2021-11-26',47,4,'Total Hours','',39825,0.9,11.1,663.8,0,3,2,NULL,'794c1659f9ee408b8a7ab7247d2c28c0'),('7bd2291a50a611ecbdd5645d86dd6e62','2021-11-26',47,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,1,NULL,'ef7cf0c71d9d4212a19125006bebbff3'),('7bd2291b50a611ecb774645d86dd6e62','2021-11-26',47,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,2,NULL,'794c1659f9ee408b8a7ab7247d2c28c0'),('7bd967d8484b11ec8d0b645d86dd6e62','2021-11-18',46,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,2,NULL,'72111f9ddddb4e62a5d40928687bead3'),('7bd967d9484b11ec8fb7645d86dd6e62','2021-11-18',46,3,'Total OT','',0,0.0,0.0,0.0,0,15,2,NULL,'72111f9ddddb4e62a5d40928687bead3'),('7bd98edc484b11ec9f8a645d86dd6e62','2021-11-18',46,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,2,NULL,'72111f9ddddb4e62a5d40928687bead3'),('7bd9b5f8484b11ec9e80645d86dd6e62','2021-11-18',46,3,'Duration','',43200,1.0,12.0,720.0,0,1,2,NULL,'72111f9ddddb4e62a5d40928687bead3'),('7bd9b5f9484b11ec932f645d86dd6e62','2021-11-18',46,3,'Total Hours','',34405,0.8,9.6,573.4,0,3,2,NULL,'72111f9ddddb4e62a5d40928687bead3'),('7bd9dd0a484b11eca1d5645d86dd6e62','2021-11-18',46,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,2,NULL,'72111f9ddddb4e62a5d40928687bead3'),('7bf2d24a50a611ecb57e645d86dd6e62','2021-11-26',47,4,'Total OT','',0,0.0,0.0,0.0,0,15,1,NULL,'ef7cf0c71d9d4212a19125006bebbff3'),('7bf5435850a611eca240645d86dd6e62','2021-11-26',47,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,1,NULL,'ef7cf0c71d9d4212a19125006bebbff3'),('7bfc640250a611ec9ba0645d86dd6e62','2021-11-26',47,4,'Duration','',43200,1.0,12.0,720.0,0,1,1,NULL,'ef7cf0c71d9d4212a19125006bebbff3'),('7bfc640350a611ec8420645d86dd6e62','2021-11-26',47,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,3,NULL,'96a0321ee9c64ab3af64852b54e8d6e5'),('7bfc640750a611ec9a79645d86dd6e62','2021-11-26',47,4,'Total Hours','',39837,0.9,11.1,664.0,0,3,1,NULL,'ef7cf0c71d9d4212a19125006bebbff3'),('7bfc640850a611ecb431645d86dd6e62','2021-11-26',47,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,1,NULL,'ef7cf0c71d9d4212a19125006bebbff3'),('7c133dd050a611ecb8d4645d86dd6e62','2021-11-26',47,4,'Total OT','',0,0.0,0.0,0.0,0,15,3,NULL,'96a0321ee9c64ab3af64852b54e8d6e5'),('7c228bfe50a611ec8e38645d86dd6e62','2021-11-26',47,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,3,NULL,'96a0321ee9c64ab3af64852b54e8d6e5'),('7c228bff50a611ecbd7e645d86dd6e62','2021-11-26',47,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,4,NULL,'4c9801f9234949a48e4a312dd35a1441'),('7c2408d250a611eca6cb645d86dd6e62','2021-11-26',47,4,'Duration','',43200,1.0,12.0,720.0,0,1,3,NULL,'96a0321ee9c64ab3af64852b54e8d6e5'),('7c2408d350a611ec8ff6645d86dd6e62','2021-11-26',47,4,'Total OT','',0,0.0,0.0,0.0,0,15,4,NULL,'4c9801f9234949a48e4a312dd35a1441'),('7c2408d450a611ec995b645d86dd6e62','2021-11-26',47,4,'Total Hours','',39829,0.9,11.1,663.8,0,3,3,NULL,'96a0321ee9c64ab3af64852b54e8d6e5'),('7c2408d550a611ecbdd9645d86dd6e62','2021-11-26',47,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,4,NULL,'4c9801f9234949a48e4a312dd35a1441'),('7c27e2f650a611ec8921645d86dd6e62','2021-11-26',47,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,3,NULL,'96a0321ee9c64ab3af64852b54e8d6e5'),('7c3f898050a611ec9fb0645d86dd6e62','2021-11-26',47,4,'Duration','',43200,1.0,12.0,720.0,0,1,4,NULL,'4c9801f9234949a48e4a312dd35a1441'),('7c7368de50a611ec9272645d86dd6e62','2021-11-26',47,4,'Total Hours','',39826,0.9,11.1,663.8,0,3,4,NULL,'4c9801f9234949a48e4a312dd35a1441'),('7c74f4e850a611ecbbb2645d86dd6e62','2021-11-26',47,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,4,NULL,'4c9801f9234949a48e4a312dd35a1441'),('7cc13b3050a611ec8a84645d86dd6e62','2021-11-26',47,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,5,NULL,'553ccdeaf14b4f33a01167d8c5fd0fb8'),('7cc2c26850a611ec82d1645d86dd6e62','2021-11-26',47,4,'Total OT','',0,0.0,0.0,0.0,0,15,5,NULL,'553ccdeaf14b4f33a01167d8c5fd0fb8'),('7cc44d4a50a611ecbb3a645d86dd6e62','2021-11-26',47,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,5,NULL,'553ccdeaf14b4f33a01167d8c5fd0fb8'),('7cd07ce850a611ecb96c645d86dd6e62','2021-11-26',47,4,'Duration','',43200,1.0,12.0,720.0,0,1,5,NULL,'553ccdeaf14b4f33a01167d8c5fd0fb8'),('7cd8651e50a611ecaeec645d86dd6e62','2021-11-26',47,4,'Total Hours','',39831,0.9,11.1,663.9,0,3,5,NULL,'553ccdeaf14b4f33a01167d8c5fd0fb8'),('7cd88c3050a611ecb758645d86dd6e62','2021-11-26',47,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,6,NULL,'07f132f1f85344c5bd142320e4451932'),('7cda12c650a611eca06e645d86dd6e62','2021-11-26',47,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,5,NULL,'553ccdeaf14b4f33a01167d8c5fd0fb8'),('7d22e5da50a611ec8c3e645d86dd6e62','2021-11-26',47,4,'Total OT','',0,0.0,0.0,0.0,0,15,6,NULL,'07f132f1f85344c5bd142320e4451932'),('7d22e5de50a611ec8ef1645d86dd6e62','2021-11-26',47,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,6,NULL,'07f132f1f85344c5bd142320e4451932'),('7d2900f450a611ec8630645d86dd6e62','2021-11-26',47,4,'Duration','',43200,1.0,12.0,720.0,0,1,6,NULL,'07f132f1f85344c5bd142320e4451932'),('7d2900f550a611ecaaa7645d86dd6e62','2021-11-26',47,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,7,NULL,'ecd1ae1ddeb149a6a0ce497e5a9e5392'),('7d2900f650a611ecaedb645d86dd6e62','2021-11-26',47,4,'Total Hours','',39831,0.9,11.1,663.9,0,3,6,NULL,'07f132f1f85344c5bd142320e4451932'),('7d2900f750a611ec83fb645d86dd6e62','2021-11-26',47,4,'Total OT','',0,0.0,0.0,0.0,0,15,7,NULL,'ecd1ae1ddeb149a6a0ce497e5a9e5392'),('7d2900fb50a611ec95f4645d86dd6e62','2021-11-26',47,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,6,NULL,'07f132f1f85344c5bd142320e4451932'),('7d4d5d6850a611ec8195645d86dd6e62','2021-11-26',47,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,7,NULL,'ecd1ae1ddeb149a6a0ce497e5a9e5392'),('7d61746650a611ecb124645d86dd6e62','2021-11-26',47,4,'Duration','',43200,1.0,12.0,720.0,0,1,7,NULL,'ecd1ae1ddeb149a6a0ce497e5a9e5392'),('7d62704c50a611ec9669645d86dd6e62','2021-11-26',47,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,8,NULL,'a95257c376af49b0a563199083367f8e'),('7d62704d50a611ec861d645d86dd6e62','2021-11-26',47,4,'Total OT','',0,0.0,0.0,0.0,0,15,8,NULL,'a95257c376af49b0a563199083367f8e'),('7d62704e50a611ecb6b7645d86dd6e62','2021-11-26',47,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,8,NULL,'a95257c376af49b0a563199083367f8e'),('7d62704f50a611ecb253645d86dd6e62','2021-11-26',47,4,'Duration','',43200,1.0,12.0,720.0,0,1,8,NULL,'a95257c376af49b0a563199083367f8e'),('7d62705050a611ecb2f7645d86dd6e62','2021-11-26',47,4,'Total Hours','',39831,0.9,11.1,663.9,0,3,8,NULL,'a95257c376af49b0a563199083367f8e'),('7d62705150a611ec82ad645d86dd6e62','2021-11-26',47,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,8,NULL,'a95257c376af49b0a563199083367f8e'),('7d73c3b650a611ec8d27645d86dd6e62','2021-11-26',47,4,'Total Hours','',39831,0.9,11.1,663.9,0,3,7,NULL,'ecd1ae1ddeb149a6a0ce497e5a9e5392'),('7d73c3b750a611ec81b0645d86dd6e62','2021-11-26',47,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,7,NULL,'ecd1ae1ddeb149a6a0ce497e5a9e5392'),('7d9bbcc050a611eca409645d86dd6e62','2021-11-26',47,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,9,NULL,'793f481b10664b089d37f3f10e7ebdd0'),('7d9cf75850a611ec9434645d86dd6e62','2021-11-26',47,4,'Total OT','',0,0.0,0.0,0.0,0,15,9,NULL,'793f481b10664b089d37f3f10e7ebdd0'),('7d9f7afe50a611ec881a645d86dd6e62','2021-11-26',47,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,9,NULL,'793f481b10664b089d37f3f10e7ebdd0'),('7da004a850a611ecafc5645d86dd6e62','2021-11-26',47,4,'Duration','',43200,1.0,12.0,720.0,0,1,9,NULL,'793f481b10664b089d37f3f10e7ebdd0'),('7dc011b650a611eca844645d86dd6e62','2021-11-26',47,4,'Total Hours','',39831,0.9,11.1,663.9,0,3,9,NULL,'793f481b10664b089d37f3f10e7ebdd0'),('7dc011b750a611ec9d5e645d86dd6e62','2021-11-26',47,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,11,NULL,'9e6b97a537794d9b96916d91a0fe37b0'),('7dc18ac850a611ecbbf2645d86dd6e62','2021-11-26',47,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,9,NULL,'793f481b10664b089d37f3f10e7ebdd0'),('7de075e450a611ec93e8645d86dd6e62','2021-11-26',47,4,'Total OT','',0,0.0,0.0,0.0,0,15,11,NULL,'9e6b97a537794d9b96916d91a0fe37b0'),('7de075e750a611ec988d645d86dd6e62','2021-11-26',47,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,11,NULL,'9e6b97a537794d9b96916d91a0fe37b0'),('7de6316250a611ecaede645d86dd6e62','2021-11-26',47,4,'Duration','',43200,1.0,12.0,720.0,0,1,11,NULL,'9e6b97a537794d9b96916d91a0fe37b0'),('7de6316350a611ec8ae8645d86dd6e62','2021-11-29',48,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,2,NULL,'f031d92d223f40d5a1adafae8a02e9b7'),('7de6316450a611ecbc83645d86dd6e62','2021-11-26',47,4,'Total Hours','',39830,0.9,11.1,663.8,0,3,11,NULL,'9e6b97a537794d9b96916d91a0fe37b0'),('7de6316550a611ec89d4645d86dd6e62','2021-11-29',48,0,'Total OT','',0,0.0,0.0,0.0,0,15,2,NULL,'f031d92d223f40d5a1adafae8a02e9b7'),('7de941d850a611eca52a645d86dd6e62','2021-11-26',47,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,11,NULL,'9e6b97a537794d9b96916d91a0fe37b0'),('7df7637850a611ec85b6645d86dd6e62','2021-11-29',48,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,2,NULL,'f031d92d223f40d5a1adafae8a02e9b7'),('7df874e450a611ecaf8c645d86dd6e62','2021-11-29',48,0,'Duration','',43200,1.0,12.0,720.0,0,1,2,NULL,'f031d92d223f40d5a1adafae8a02e9b7'),('7df9ad6250a611ecaff1645d86dd6e62','2021-11-29',48,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,2,NULL,'f031d92d223f40d5a1adafae8a02e9b7'),('7e1c248050a611ecba4d645d86dd6e62','2021-11-29',48,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,1,NULL,'fa8991279783497f9fc3f6413bd4b91e'),('7e1ea3a650a611ecabaf645d86dd6e62','2021-11-29',48,0,'Total OT','',0,0.0,0.0,0.0,0,15,1,NULL,'fa8991279783497f9fc3f6413bd4b91e'),('7e1f66fa50a611ecb420645d86dd6e62','2021-11-29',48,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,1,NULL,'fa8991279783497f9fc3f6413bd4b91e'),('7e1fb52250a611ec86bd645d86dd6e62','2021-11-29',48,0,'Duration','',43200,1.0,12.0,720.0,0,1,1,NULL,'fa8991279783497f9fc3f6413bd4b91e'),('7e28e3f550a611ecb1a8645d86dd6e62','2021-11-29',48,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,1,NULL,'fa8991279783497f9fc3f6413bd4b91e'),('7e47d2b450a611ecacaa645d86dd6e62','2021-11-29',48,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,3,NULL,'9959593b21f042e0843ca543a8327bd1'),('7e4af7ee50a611ec8e36645d86dd6e62','2021-11-29',48,0,'Total OT','',0,0.0,0.0,0.0,0,15,3,NULL,'9959593b21f042e0843ca543a8327bd1'),('7e4c7e9c50a611eca4ed645d86dd6e62','2021-11-29',48,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,3,NULL,'9959593b21f042e0843ca543a8327bd1'),('7e4d41fa50a611ecaba3645d86dd6e62','2021-11-29',48,0,'Duration','',43200,1.0,12.0,720.0,0,1,3,NULL,'9959593b21f042e0843ca543a8327bd1'),('7e72958b50a611ec9cd5645d86dd6e62','2021-11-29',48,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,3,NULL,'9959593b21f042e0843ca543a8327bd1'),('7ebbd79e50a611ecb072645d86dd6e62','2021-11-29',48,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,4,NULL,'758cbbf77d3d43e0bec708441e53d612'),('7ebd593250a611ecb096645d86dd6e62','2021-11-29',48,0,'Total OT','',0,0.0,0.0,0.0,0,15,4,NULL,'758cbbf77d3d43e0bec708441e53d612'),('7ec6854150a611eca1ca645d86dd6e62','2021-11-29',48,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,4,NULL,'758cbbf77d3d43e0bec708441e53d612'),('7ec6854250a611eca4f2645d86dd6e62','2021-11-29',48,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,5,NULL,'49e2cf2e88934575a16b128355b19b5a'),('7ec6854350a611eca8f6645d86dd6e62','2021-11-29',48,0,'Duration','',43200,1.0,12.0,720.0,0,1,4,NULL,'758cbbf77d3d43e0bec708441e53d612'),('7ec6854450a611ecb49e645d86dd6e62','2021-11-29',48,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,4,NULL,'758cbbf77d3d43e0bec708441e53d612'),('7ee3811c50a611ecbaeb645d86dd6e62','2021-11-29',48,0,'Total OT','',0,0.0,0.0,0.0,0,15,5,NULL,'49e2cf2e88934575a16b128355b19b5a'),('7ee3811d50a611eca9aa645d86dd6e62','2021-11-29',48,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,5,NULL,'49e2cf2e88934575a16b128355b19b5a'),('7ee5050e50a611ec88c6645d86dd6e62','2021-11-29',48,0,'Duration','',43200,1.0,12.0,720.0,0,1,5,NULL,'49e2cf2e88934575a16b128355b19b5a'),('7eefb45950a611ec8751645d86dd6e62','2021-11-29',48,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,5,NULL,'49e2cf2e88934575a16b128355b19b5a'),('7f2fcd3450a611ecb967645d86dd6e62','2021-11-29',48,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,6,NULL,'5ab429dd1a294d259e992bfa8800edc9'),('7f2fcd3550a611ec9148645d86dd6e62','2021-11-29',48,0,'Total OT','',0,0.0,0.0,0.0,0,15,6,NULL,'5ab429dd1a294d259e992bfa8800edc9'),('7f3152e850a611ec8022645d86dd6e62','2021-11-29',48,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,6,NULL,'5ab429dd1a294d259e992bfa8800edc9'),('7f3736ee50a611ec92ee645d86dd6e62','2021-11-29',48,0,'Duration','',43200,1.0,12.0,720.0,0,1,6,NULL,'5ab429dd1a294d259e992bfa8800edc9'),('7f3980e450a611ec8e9d645d86dd6e62','2021-11-29',48,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,7,NULL,'45f02114dd3340bdb9f717606610222f'),('7f3980e550a611ec9b94645d86dd6e62','2021-11-29',48,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,6,NULL,'5ab429dd1a294d259e992bfa8800edc9'),('7f48348c50a611eca634645d86dd6e62','2021-11-29',48,0,'Total OT','',0,0.0,0.0,0.0,0,15,7,NULL,'45f02114dd3340bdb9f717606610222f'),('7f4af5e450a611ec9a8d645d86dd6e62','2021-11-29',48,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,7,NULL,'45f02114dd3340bdb9f717606610222f'),('7f4b44f850a611ec81c7645d86dd6e62','2021-11-29',48,0,'Duration','',43200,1.0,12.0,720.0,0,1,7,NULL,'45f02114dd3340bdb9f717606610222f'),('7f5159a750a611ecb01d645d86dd6e62','2021-11-29',48,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,7,NULL,'45f02114dd3340bdb9f717606610222f'),('7f6840ac50a611ec9430645d86dd6e62','2021-11-29',48,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,8,NULL,'605c545dc42b4560a045436ea8cca701'),('7f6b4e3e50a611ec8c70645d86dd6e62','2021-11-29',48,0,'Total OT','',0,0.0,0.0,0.0,0,15,8,NULL,'605c545dc42b4560a045436ea8cca701'),('7f6b4e3f50a611eca7e7645d86dd6e62','2021-11-29',48,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,8,NULL,'605c545dc42b4560a045436ea8cca701'),('7f6cd4e850a611ec852c645d86dd6e62','2021-11-29',48,0,'Duration','',43200,1.0,12.0,720.0,0,1,8,NULL,'605c545dc42b4560a045436ea8cca701'),('7f76bbc050a611ec8071645d86dd6e62','2021-11-29',48,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,8,NULL,'605c545dc42b4560a045436ea8cca701'),('7f88706c50a611eca5aa645d86dd6e62','2021-11-29',48,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,9,NULL,'a79b76ad24e847749f8ae3a7ed67b334'),('7f88706d50a611ec9a2d645d86dd6e62','2021-11-29',48,0,'Total OT','',0,0.0,0.0,0.0,0,15,9,NULL,'a79b76ad24e847749f8ae3a7ed67b334'),('7f88977850a611ec9d12645d86dd6e62','2021-11-29',48,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,9,NULL,'a79b76ad24e847749f8ae3a7ed67b334'),('7f8c188c50a611eca9c4645d86dd6e62','2021-11-29',48,0,'Duration','',43200,1.0,12.0,720.0,0,1,9,NULL,'a79b76ad24e847749f8ae3a7ed67b334'),('7f8c3fa450a611ec8c11645d86dd6e62','2021-11-29',48,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,11,NULL,'53c4d2d369dc4df4a85a2baf5df2c03e'),('7f8c669c50a611ecb902645d86dd6e62','2021-11-29',48,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,9,NULL,'a79b76ad24e847749f8ae3a7ed67b334'),('7f99ce4c50a611ecb4e5645d86dd6e62','2021-11-29',48,0,'Total OT','',0,0.0,0.0,0.0,0,15,11,NULL,'53c4d2d369dc4df4a85a2baf5df2c03e'),('7f99f55850a611ecbd00645d86dd6e62','2021-11-29',48,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,11,NULL,'53c4d2d369dc4df4a85a2baf5df2c03e'),('7f99f55950a611ec82d5645d86dd6e62','2021-11-29',48,0,'Duration','',43200,1.0,12.0,720.0,0,1,11,NULL,'53c4d2d369dc4df4a85a2baf5df2c03e'),('7f9a1c6850a611ec90a7645d86dd6e62','2021-11-29',48,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,11,NULL,'53c4d2d369dc4df4a85a2baf5df2c03e'),('80cf41504ccc11eca230645d86dd6e62','2021-11-22',47,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,2,NULL,'793839fa6911449ca005d2981ce6e321'),('80d0a90c4ccc11ecae09645d86dd6e62','2021-11-22',47,0,'Total OT','',0,0.0,0.0,0.0,0,15,2,NULL,'793839fa6911449ca005d2981ce6e321'),('80d71e904ccc11ecad3e645d86dd6e62','2021-11-22',47,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,2,NULL,'793839fa6911449ca005d2981ce6e321'),('80f5664a4ccc11ecac88645d86dd6e62','2021-11-22',47,0,'Duration','',43200,1.0,12.0,720.0,0,1,2,NULL,'793839fa6911449ca005d2981ce6e321'),('80f5664b4ccc11ecaadf645d86dd6e62','2021-11-22',47,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,3,NULL,'782a5a9a66784bcdb82ddf5c035a5736'),('80fdca744ccc11ecb714645d86dd6e62','2021-11-22',47,0,'Total Hours','',32128,0.7,8.9,535.5,0,3,2,NULL,'793839fa6911449ca005d2981ce6e321'),('80fdf1764ccc11ec9fea645d86dd6e62','2021-11-22',47,0,'Total OT','',0,0.0,0.0,0.0,0,15,3,NULL,'782a5a9a66784bcdb82ddf5c035a5736'),('80fdf1774ccc11ec9f9d645d86dd6e62','2021-11-22',47,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,3,NULL,'782a5a9a66784bcdb82ddf5c035a5736'),('8109e3524ccc11ec9150645d86dd6e62','2021-11-22',47,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,2,NULL,'793839fa6911449ca005d2981ce6e321'),('81b29f744ccc11ec9662645d86dd6e62','2021-11-22',47,0,'Duration','',43200,1.0,12.0,720.0,0,1,3,NULL,'782a5a9a66784bcdb82ddf5c035a5736'),('81b29f754ccc11ec9b9e645d86dd6e62','2021-11-22',47,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,4,NULL,'b594e3f6cf53438b8d27113e5a53dd4b'),('81b737e64ccc11ec850f645d86dd6e62','2021-11-22',47,0,'Total Hours','',32126,0.7,8.9,535.4,0,3,3,NULL,'782a5a9a66784bcdb82ddf5c035a5736'),('81b737e74ccc11eca4c2645d86dd6e62','2021-11-22',47,0,'Total OT','',0,0.0,0.0,0.0,0,15,4,NULL,'b594e3f6cf53438b8d27113e5a53dd4b'),('81b8b4c04ccc11ec8ac8645d86dd6e62','2021-11-22',47,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,3,NULL,'782a5a9a66784bcdb82ddf5c035a5736'),('81da53244ccc11ec8db0645d86dd6e62','2021-11-22',47,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,4,NULL,'b594e3f6cf53438b8d27113e5a53dd4b'),('81e9465c4ccc11ecb708645d86dd6e62','2021-11-22',47,0,'Duration','',43200,1.0,12.0,720.0,0,1,4,NULL,'b594e3f6cf53438b8d27113e5a53dd4b'),('81e96d584ccc11ec831e645d86dd6e62','2021-11-22',47,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,4,NULL,'b594e3f6cf53438b8d27113e5a53dd4b'),('8239340c4ccc11ecb48d645d86dd6e62','2021-11-22',47,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,5,NULL,'7791cdfa8aa1418caff7bd05e600a818'),('8241253e4ccc11ecaa04645d86dd6e62','2021-11-22',47,0,'Total OT','',0,0.0,0.0,0.0,0,15,5,NULL,'7791cdfa8aa1418caff7bd05e600a818'),('8263a5a64ccc11eca912645d86dd6e62','2021-11-22',47,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,5,NULL,'7791cdfa8aa1418caff7bd05e600a818'),('8266a87a4ccc11ec8fb5645d86dd6e62','2021-11-22',47,0,'Duration','',43200,1.0,12.0,720.0,0,1,5,NULL,'7791cdfa8aa1418caff7bd05e600a818'),('828653d44ccc11ecba05645d86dd6e62','2021-11-22',47,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,5,NULL,'7791cdfa8aa1418caff7bd05e600a818'),('82a0ae5c4ccc11ecacc7645d86dd6e62','2021-11-22',47,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,6,NULL,'3222850f7c5a41189032765e31a48653'),('82a3bba44ccc11ecb07a645d86dd6e62','2021-11-22',47,0,'Total OT','',0,0.0,0.0,0.0,0,15,6,NULL,'3222850f7c5a41189032765e31a48653'),('82a3bba84ccc11ec8416645d86dd6e62','2021-11-22',47,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,6,NULL,'3222850f7c5a41189032765e31a48653'),('82d526304ccc11ec8a3f645d86dd6e62','2021-11-22',47,0,'Duration','',43200,1.0,12.0,720.0,0,1,6,NULL,'3222850f7c5a41189032765e31a48653'),('82d526314ccc11ecaa6b645d86dd6e62','2021-11-22',47,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,7,NULL,'41d480089ea84926a1eb3b9f3e5a4a39'),('82d722084ccc11ec8898645d86dd6e62','2021-11-22',47,0,'Total Hours','',29201,0.7,8.1,486.7,0,3,6,NULL,'3222850f7c5a41189032765e31a48653'),('82d749224ccc11ecb82b645d86dd6e62','2021-11-22',47,0,'Total OT','',0,0.0,0.0,0.0,0,15,7,NULL,'41d480089ea84926a1eb3b9f3e5a4a39'),('82d7be5c4ccc11ec9131645d86dd6e62','2021-11-22',47,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,6,NULL,'3222850f7c5a41189032765e31a48653'),('831f68c04ccc11ec9689645d86dd6e62','2021-11-22',47,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,7,NULL,'41d480089ea84926a1eb3b9f3e5a4a39'),('8326f65a4ccc11ec852c645d86dd6e62','2021-11-22',47,0,'Duration','',43200,1.0,12.0,720.0,0,1,7,NULL,'41d480089ea84926a1eb3b9f3e5a4a39'),('8326f65b4ccc11ec80cb645d86dd6e62','2021-11-22',47,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,8,NULL,'1c07f34559364523b55aec3c018ccc07'),('8326f65c4ccc11ecb414645d86dd6e62','2021-11-22',47,0,'Total Hours','',29201,0.7,8.1,486.7,0,3,7,NULL,'41d480089ea84926a1eb3b9f3e5a4a39'),('8328623e4ccc11ec9d95645d86dd6e62','2021-11-22',47,0,'Total OT','',0,0.0,0.0,0.0,0,15,8,NULL,'1c07f34559364523b55aec3c018ccc07'),('832d8d344ccc11ecbbb4645d86dd6e62','2021-11-22',47,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,7,NULL,'41d480089ea84926a1eb3b9f3e5a4a39'),('833d3fd24ccc11eca34c645d86dd6e62','2021-11-22',47,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,8,NULL,'1c07f34559364523b55aec3c018ccc07'),('833e818a4ccc11ecb6bf645d86dd6e62','2021-11-22',47,0,'Duration','',43200,1.0,12.0,720.0,0,1,8,NULL,'1c07f34559364523b55aec3c018ccc07'),('833f59884ccc11ec9164645d86dd6e62','2021-11-22',47,0,'Total Hours','',29199,0.7,8.1,486.7,0,3,8,NULL,'1c07f34559364523b55aec3c018ccc07'),('833f59894ccc11ec8192645d86dd6e62','2021-11-22',47,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,8,NULL,'1c07f34559364523b55aec3c018ccc07'),('839035364ccc11ecb782645d86dd6e62','2021-11-22',47,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,9,NULL,'415f9016123a428dae3ca2c1941aee3c'),('8396f8524ccc11ecb272645d86dd6e62','2021-11-22',47,0,'Total OT','',0,0.0,0.0,0.0,0,15,9,NULL,'415f9016123a428dae3ca2c1941aee3c'),('8397bba44ccc11ec97b4645d86dd6e62','2021-11-22',47,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,9,NULL,'415f9016123a428dae3ca2c1941aee3c'),('8398100c4ccc11ecb4d6645d86dd6e62','2021-11-22',47,0,'Duration','',43200,1.0,12.0,720.0,0,1,9,NULL,'415f9016123a428dae3ca2c1941aee3c'),('83a693644ccc11ecb2e6645d86dd6e62','2021-11-22',47,0,'Total Hours','',29197,0.7,8.1,486.6,0,3,9,NULL,'415f9016123a428dae3ca2c1941aee3c'),('83aa60c84ccc11ecaa1d645d86dd6e62','2021-11-22',47,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,9,NULL,'415f9016123a428dae3ca2c1941aee3c'),('86807c364ccc11ecb08a645d86dd6e62','2021-11-23',47,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,2,NULL,'dd5769f709144c749bfa48037170c82e'),('86820a5c4ccc11ec88be645d86dd6e62','2021-11-23',47,1,'Total OT','',0,0.0,0.0,0.0,0,15,2,NULL,'dd5769f709144c749bfa48037170c82e'),('86ed29424ccc11ec93fb645d86dd6e62','2021-11-23',47,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,2,NULL,'dd5769f709144c749bfa48037170c82e'),('86ed50484ccc11ec821d645d86dd6e62','2021-11-23',47,1,'Duration','',43200,1.0,12.0,720.0,0,1,2,NULL,'dd5769f709144c749bfa48037170c82e'),('86ed77544ccc11ecbaa8645d86dd6e62','2021-11-23',47,1,'Total Hours','',34125,0.8,9.5,568.8,0,3,2,NULL,'dd5769f709144c749bfa48037170c82e'),('86ed77554ccc11eca43b645d86dd6e62','2021-11-23',47,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,2,NULL,'dd5769f709144c749bfa48037170c82e'),('871366864ccc11ecbf31645d86dd6e62','2021-11-23',47,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,1,NULL,'9742f3bd36284213b86f4008390274a0'),('87138d924ccc11ecaa6b645d86dd6e62','2021-11-23',47,1,'Total OT','',0,0.0,0.0,0.0,0,15,1,NULL,'9742f3bd36284213b86f4008390274a0'),('87138d934ccc11eca7c7645d86dd6e62','2021-11-23',47,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,1,NULL,'9742f3bd36284213b86f4008390274a0'),('87138d944ccc11ecaa77645d86dd6e62','2021-11-23',47,1,'Duration','',43200,1.0,12.0,720.0,0,1,1,NULL,'9742f3bd36284213b86f4008390274a0'),('8713b4a84ccc11eca892645d86dd6e62','2021-11-23',47,1,'Total Hours','',34126,0.8,9.5,568.8,0,3,1,NULL,'9742f3bd36284213b86f4008390274a0'),('8713b4a94ccc11ecbc80645d86dd6e62','2021-11-23',47,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,1,NULL,'9742f3bd36284213b86f4008390274a0'),('875f75a84ccc11ecbdc3645d86dd6e62','2021-11-23',47,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,3,NULL,'2b8cc78828274502b77f51d002b10e71'),('878a30864ccc11ec9810645d86dd6e62','2021-11-23',47,1,'Total OT','',0,0.0,0.0,0.0,0,15,3,NULL,'2b8cc78828274502b77f51d002b10e71'),('878d3e004ccc11ec8143645d86dd6e62','2021-11-23',47,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,4,NULL,'ebe0dd545bbf488a882bfcb7a8db90ab'),('878d3e014ccc11eca939645d86dd6e62','2021-11-23',47,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,3,NULL,'2b8cc78828274502b77f51d002b10e71'),('878d3e024ccc11ec9fec645d86dd6e62','2021-11-23',47,1,'Total OT','',0,0.0,0.0,0.0,0,15,4,NULL,'ebe0dd545bbf488a882bfcb7a8db90ab'),('87a523ee4ccc11ec884e645d86dd6e62','2021-11-23',47,1,'Duration','',43200,1.0,12.0,720.0,0,1,3,NULL,'2b8cc78828274502b77f51d002b10e71'),('87a5721a4ccc11ec9663645d86dd6e62','2021-11-23',47,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,4,NULL,'ebe0dd545bbf488a882bfcb7a8db90ab'),('87a60e5a4ccc11ec978b645d86dd6e62','2021-11-23',47,1,'Total Hours','',34127,0.8,9.5,568.8,0,3,3,NULL,'2b8cc78828274502b77f51d002b10e71'),('87ae9a004ccc11ec8373645d86dd6e62','2021-11-23',47,1,'Duration','',43200,1.0,12.0,720.0,0,1,4,NULL,'ebe0dd545bbf488a882bfcb7a8db90ab'),('87b10b144ccc11ec92b5645d86dd6e62','2021-11-23',47,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,3,NULL,'2b8cc78828274502b77f51d002b10e71'),('87cd1d124ccc11ecb448645d86dd6e62','2021-11-23',47,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,5,NULL,'d9c6453974af49b08a0cf6f3876b1645'),('87ce82f44ccc11ecbf9e645d86dd6e62','2021-11-23',47,1,'Total Hours','',34129,0.8,9.5,568.8,0,3,4,NULL,'ebe0dd545bbf488a882bfcb7a8db90ab'),('87ceaae84ccc11eca6db645d86dd6e62','2021-11-23',47,1,'Total OT','',0,0.0,0.0,0.0,0,15,5,NULL,'d9c6453974af49b08a0cf6f3876b1645'),('87cedd824ccc11ecb1e3645d86dd6e62','2021-11-23',47,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,4,NULL,'ebe0dd545bbf488a882bfcb7a8db90ab'),('886d56a84ccc11ec82f4645d86dd6e62','2021-11-23',47,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,5,NULL,'d9c6453974af49b08a0cf6f3876b1645'),('887505c24ccc11ec94d4645d86dd6e62','2021-11-23',47,1,'Duration','',43200,1.0,12.0,720.0,0,1,5,NULL,'d9c6453974af49b08a0cf6f3876b1645'),('8876850c4ccc11ecb84e645d86dd6e62','2021-11-23',47,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,6,NULL,'4c3e6144950b41899588eb52337d8f01'),('887857364ccc11ec94fe645d86dd6e62','2021-11-23',47,1,'Total Hours','',34131,0.8,9.5,568.9,0,3,5,NULL,'d9c6453974af49b08a0cf6f3876b1645'),('887857374ccc11ec9f21645d86dd6e62','2021-11-23',47,1,'Total OT','',0,0.0,0.0,0.0,0,15,6,NULL,'4c3e6144950b41899588eb52337d8f01'),('887857384ccc11ec87c4645d86dd6e62','2021-11-23',47,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,6,NULL,'4c3e6144950b41899588eb52337d8f01'),('887857394ccc11ec86b2645d86dd6e62','2021-11-23',47,1,'Duration','',43200,1.0,12.0,720.0,0,1,6,NULL,'4c3e6144950b41899588eb52337d8f01'),('8878573a4ccc11ecad77645d86dd6e62','2021-11-23',47,1,'Total Hours','',34130,0.8,9.5,568.8,0,3,6,NULL,'4c3e6144950b41899588eb52337d8f01'),('8878573b4ccc11ec9fec645d86dd6e62','2021-11-23',47,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,6,NULL,'4c3e6144950b41899588eb52337d8f01'),('88b744dc4ccc11ec883f645d86dd6e62','2021-11-23',47,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,5,NULL,'d9c6453974af49b08a0cf6f3876b1645'),('88ea70ae4ccc11ec9e92645d86dd6e62','2021-11-23',47,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,7,NULL,'1727666f22334c818d226fb402a54935'),('8910d0644ccc11ecbbb2645d86dd6e62','2021-11-23',47,1,'Total OT','',0,0.0,0.0,0.0,0,15,7,NULL,'1727666f22334c818d226fb402a54935'),('8910d0654ccc11ecbafb645d86dd6e62','2021-11-23',47,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,8,NULL,'153ba675e0974fb09ba1cc1dad74346f'),('8913deba4ccc11ec8980645d86dd6e62','2021-11-23',47,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,7,NULL,'1727666f22334c818d226fb402a54935'),('8913debb4ccc11ec9fc5645d86dd6e62','2021-11-23',47,1,'Total OT','',0,0.0,0.0,0.0,0,15,8,NULL,'153ba675e0974fb09ba1cc1dad74346f'),('89152d124ccc11ecab11645d86dd6e62','2021-11-23',47,1,'Duration','',43200,1.0,12.0,720.0,0,1,7,NULL,'1727666f22334c818d226fb402a54935'),('89152d134ccc11ec999b645d86dd6e62','2021-11-23',47,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,8,NULL,'153ba675e0974fb09ba1cc1dad74346f'),('89152d144ccc11ec834f645d86dd6e62','2021-11-23',47,1,'Duration','',43200,1.0,12.0,720.0,0,1,8,NULL,'153ba675e0974fb09ba1cc1dad74346f'),('89152d154ccc11ec9009645d86dd6e62','2021-11-23',47,1,'Total Hours','',34130,0.8,9.5,568.8,0,3,8,NULL,'153ba675e0974fb09ba1cc1dad74346f'),('89152d164ccc11ec8c8e645d86dd6e62','2021-11-23',47,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,8,NULL,'153ba675e0974fb09ba1cc1dad74346f'),('893bb5dc4ccc11ecab27645d86dd6e62','2021-11-23',47,1,'Total Hours','',34130,0.8,9.5,568.8,0,3,7,NULL,'1727666f22334c818d226fb402a54935'),('8972657e4ccc11ecb36f645d86dd6e62','2021-11-23',47,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,7,NULL,'1727666f22334c818d226fb402a54935'),('899471824ccc11ecb863645d86dd6e62','2021-11-23',47,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,9,NULL,'5c4aac02db9e423a805f7cd132d7ead6'),('8994989e4ccc11ecbba9645d86dd6e62','2021-11-23',47,1,'Total OT','',0,0.0,0.0,0.0,0,15,9,NULL,'5c4aac02db9e423a805f7cd132d7ead6'),('8994bfb64ccc11ecb5f3645d86dd6e62','2021-11-23',47,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,9,NULL,'5c4aac02db9e423a805f7cd132d7ead6'),('89966d624ccc11ec8bfb645d86dd6e62','2021-11-23',47,1,'Duration','',43200,1.0,12.0,720.0,0,1,9,NULL,'5c4aac02db9e423a805f7cd132d7ead6'),('89b6c9484ccc11ec8c4d645d86dd6e62','2021-11-23',47,1,'Total Hours','',34129,0.8,9.5,568.8,0,3,9,NULL,'5c4aac02db9e423a805f7cd132d7ead6'),('89b6c9494ccc11ecb7d8645d86dd6e62','2021-11-23',47,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,9,NULL,'5c4aac02db9e423a805f7cd132d7ead6'),('89cfffa44ccc11ecaff2645d86dd6e62','2021-11-23',47,1,'Duty Duration','',43200,1.0,12.0,720.0,0,2,11,NULL,'a87d8856b91f48608f20730470c70efa'),('89d428404ccc11ecac6b645d86dd6e62','2021-11-23',47,1,'Total OT','',0,0.0,0.0,0.0,0,15,11,NULL,'a87d8856b91f48608f20730470c70efa'),('89d578664ccc11ec95f7645d86dd6e62','2021-11-23',47,1,'Rule Total OT','',0,0.0,0.0,0.0,0,16,11,NULL,'a87d8856b91f48608f20730470c70efa'),('89d6d3124ccc11ec80b2645d86dd6e62','2021-11-23',47,1,'Duration','',43200,1.0,12.0,720.0,0,1,11,NULL,'a87d8856b91f48608f20730470c70efa'),('89d7357c4ccc11ec995d645d86dd6e62','2021-11-23',47,1,'Total Hours','',34130,0.8,9.5,568.8,0,3,11,NULL,'a87d8856b91f48608f20730470c70efa'),('89e1a4694ccc11ec9bb2645d86dd6e62','2021-11-23',47,1,'Total Leaves','',0,0.0,0.0,0.0,0,17,11,NULL,'a87d8856b91f48608f20730470c70efa'),('9a17be76427d11ecacb2645d86dd6e62','2021-11-11',45,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,5,NULL,'b70e6fe7de944aa3aae0c5d682ad360e'),('9a1a20b6427d11ec83f7645d86dd6e62','2021-11-11',45,3,'Total OT','',0,0.0,0.0,0.0,0,15,5,NULL,'b70e6fe7de944aa3aae0c5d682ad360e'),('9a1c8312427d11ecadcc645d86dd6e62','2021-11-11',45,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,5,NULL,'b70e6fe7de944aa3aae0c5d682ad360e'),('9a33f4cc427d11eca961645d86dd6e62','2021-11-11',45,3,'Duration','',43200,1.0,12.0,720.0,0,1,5,NULL,'b70e6fe7de944aa3aae0c5d682ad360e'),('9a33f4d0427d11eca031645d86dd6e62','2021-11-11',45,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,5,NULL,'b70e6fe7de944aa3aae0c5d682ad360e'),('a309a7fa41f811ecbe31645d86dd6e62','2021-11-10',45,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,1,NULL,'896e7b8188084677b7c7bb27ea4f5446'),('a309a7fb41f811ecbce8645d86dd6e62','2021-11-10',45,2,'Total OT','',0,0.0,0.0,0.0,0,15,1,NULL,'896e7b8188084677b7c7bb27ea4f5446'),('a309a7fc41f811ecbab7645d86dd6e62','2021-11-10',45,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,1,NULL,'896e7b8188084677b7c7bb27ea4f5446'),('a309a7fd41f811ecbb3a645d86dd6e62','2021-11-10',45,2,'Duration','',43200,1.0,12.0,720.0,0,1,1,NULL,'896e7b8188084677b7c7bb27ea4f5446'),('a309a7fe41f811ecbb25645d86dd6e62','2021-11-10',45,2,'Total Hours','',29980,0.7,8.3,499.7,0,3,1,NULL,'896e7b8188084677b7c7bb27ea4f5446'),('a309a7ff41f811ec84da645d86dd6e62','2021-11-10',45,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,1,NULL,'896e7b8188084677b7c7bb27ea4f5446'),('a3adad0c41f811ec9603645d86dd6e62','2021-11-10',45,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,2,NULL,'d5dd6cde445a4bf997846f5a38087123'),('a3adad0d41f811ecbade645d86dd6e62','2021-11-10',45,2,'Total OT','',0,0.0,0.0,0.0,0,15,2,NULL,'d5dd6cde445a4bf997846f5a38087123'),('a3adad0e41f811ecbf90645d86dd6e62','2021-11-10',45,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,2,NULL,'d5dd6cde445a4bf997846f5a38087123'),('a3adad0f41f811ecb266645d86dd6e62','2021-11-10',45,2,'Duration','',43200,1.0,12.0,720.0,0,1,2,NULL,'d5dd6cde445a4bf997846f5a38087123'),('a3adad1041f811ecb677645d86dd6e62','2021-11-10',45,2,'Total Hours','',29980,0.7,8.3,499.7,0,3,2,NULL,'d5dd6cde445a4bf997846f5a38087123'),('a3adad1141f811ec83d7645d86dd6e62','2021-11-10',45,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,2,NULL,'d5dd6cde445a4bf997846f5a38087123'),('a580e542434a11ecbe88645d86dd6e62','2021-11-12',45,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,2,NULL,'4efdafd00c2541d3b6946c3bb246d16c'),('a581b388434a11ecac0c645d86dd6e62','2021-11-12',45,4,'Total OT','',0,0.0,0.0,0.0,0,15,2,NULL,'4efdafd00c2541d3b6946c3bb246d16c'),('a5910b5e434a11ecae38645d86dd6e62','2021-11-12',45,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,1,NULL,'f920b850464246c7a94fe71f1abdf22b'),('a591e98c434a11eca948645d86dd6e62','2021-11-12',45,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,2,NULL,'4efdafd00c2541d3b6946c3bb246d16c'),('a591e98d434a11ec9624645d86dd6e62','2021-11-12',45,4,'Total OT','',0,0.0,0.0,0.0,0,15,1,NULL,'f920b850464246c7a94fe71f1abdf22b'),('a59285da434a11ec9704645d86dd6e62','2021-11-12',45,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,1,NULL,'f920b850464246c7a94fe71f1abdf22b'),('a5a96d90434a11ec8c37645d86dd6e62','2021-11-12',45,4,'Duration','',43200,1.0,12.0,720.0,0,1,2,NULL,'4efdafd00c2541d3b6946c3bb246d16c'),('a5a96d91434a11eca0fe645d86dd6e62','2021-11-12',45,4,'Duration','',43200,1.0,12.0,720.0,0,1,1,NULL,'f920b850464246c7a94fe71f1abdf22b'),('a5a96d92434a11ecaac1645d86dd6e62','2021-11-12',45,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,3,NULL,'603c85894be441da949817493f46e32e'),('a5aa1446434a11ecb7a3645d86dd6e62','2021-11-12',45,4,'Total OT','',0,0.0,0.0,0.0,0,15,3,NULL,'603c85894be441da949817493f46e32e'),('a5aa1449434a11ec8c94645d86dd6e62','2021-11-12',45,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,2,NULL,'4efdafd00c2541d3b6946c3bb246d16c'),('a6732b70434a11ec9434645d86dd6e62','2021-11-12',45,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,1,NULL,'f920b850464246c7a94fe71f1abdf22b'),('a6945be8434a11ecaca9645d86dd6e62','2021-11-12',45,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,3,NULL,'603c85894be441da949817493f46e32e'),('a6a45350434a11ec8e48645d86dd6e62','2021-11-12',45,4,'Duration','',43200,1.0,12.0,720.0,0,1,3,NULL,'603c85894be441da949817493f46e32e'),('a6a4a162434a11ecaf91645d86dd6e62','2021-11-12',45,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,3,NULL,'603c85894be441da949817493f46e32e'),('a76face4434a11ecbe69645d86dd6e62','2021-11-12',45,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,5,NULL,'19d48a80d17a495f9b2409eb441d16a8'),('a772ccd8434a11ec9673645d86dd6e62','2021-11-12',45,4,'Total OT','',0,0.0,0.0,0.0,0,15,5,NULL,'19d48a80d17a495f9b2409eb441d16a8'),('a774c2c6434a11ec9c46645d86dd6e62','2021-11-12',45,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,5,NULL,'19d48a80d17a495f9b2409eb441d16a8'),('a78fa180434a11ec8dd2645d86dd6e62','2021-11-12',45,4,'Duration','',43200,1.0,12.0,720.0,0,1,5,NULL,'19d48a80d17a495f9b2409eb441d16a8'),('a78fa181434a11ec9799645d86dd6e62','2021-11-12',45,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,6,NULL,'c7c53bf52df748da877d51e04e3e04f5'),('a78fa182434a11ec8581645d86dd6e62','2021-11-12',45,4,'Total OT','',0,0.0,0.0,0.0,0,15,6,NULL,'c7c53bf52df748da877d51e04e3e04f5'),('a7924b3a434a11ec911d645d86dd6e62','2021-11-12',45,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,5,NULL,'19d48a80d17a495f9b2409eb441d16a8'),('a8211aca434a11ec8cf4645d86dd6e62','2021-11-12',45,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,6,NULL,'c7c53bf52df748da877d51e04e3e04f5'),('a822a176434a11ecbbb3645d86dd6e62','2021-11-12',45,4,'Duration','',43200,1.0,12.0,720.0,0,1,6,NULL,'c7c53bf52df748da877d51e04e3e04f5'),('a8233db6434a11eca706645d86dd6e62','2021-11-12',45,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,6,NULL,'c7c53bf52df748da877d51e04e3e04f5'),('a847e7ac434a11ec8583645d86dd6e62','2021-11-12',45,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,7,NULL,'3d778dfc85114efb890043a924442e98'),('a847e7af434a11ec8a6c645d86dd6e62','2021-11-12',45,4,'Total OT','',0,0.0,0.0,0.0,0,15,7,NULL,'3d778dfc85114efb890043a924442e98'),('a8566600434a11ec87a8645d86dd6e62','2021-11-12',45,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,7,NULL,'3d778dfc85114efb890043a924442e98'),('a8566601434a11ec82dd645d86dd6e62','2021-11-12',45,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,8,NULL,'c5c680a9a7674e768ff7ba126ee786da'),('a857a81a434a11ecaf1d645d86dd6e62','2021-11-12',45,4,'Duration','',43200,1.0,12.0,720.0,0,1,7,NULL,'3d778dfc85114efb890043a924442e98'),('a857a81b434a11ec8a03645d86dd6e62','2021-11-12',45,4,'Total OT','',0,0.0,0.0,0.0,0,15,8,NULL,'c5c680a9a7674e768ff7ba126ee786da'),('a85a8df4434a11ec8b6a645d86dd6e62','2021-11-12',45,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,7,NULL,'3d778dfc85114efb890043a924442e98'),('a8c65d1a434a11ecb03b645d86dd6e62','2021-11-12',45,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,8,NULL,'c5c680a9a7674e768ff7ba126ee786da'),('a8c6f94c434a11ec9f05645d86dd6e62','2021-11-12',45,4,'Duration','',43200,1.0,12.0,720.0,0,1,8,NULL,'c5c680a9a7674e768ff7ba126ee786da'),('a8c7476e434a11ec801a645d86dd6e62','2021-11-12',45,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,8,NULL,'c5c680a9a7674e768ff7ba126ee786da'),('a8f518a4434a11ecbdf2645d86dd6e62','2021-11-12',45,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,9,NULL,'3ee639bef6aa491d9841f1228e913073'),('a8f7b0ca434a11ecb1b7645d86dd6e62','2021-11-12',45,4,'Total OT','',0,0.0,0.0,0.0,0,15,9,NULL,'3ee639bef6aa491d9841f1228e913073'),('a8f9509c434a11ec9d8f645d86dd6e62','2021-11-12',45,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,9,NULL,'3ee639bef6aa491d9841f1228e913073'),('a908989f434a11ecb44c645d86dd6e62','2021-11-12',45,4,'Duration','',43200,1.0,12.0,720.0,0,1,9,NULL,'3ee639bef6aa491d9841f1228e913073'),('a90934a2434a11ec9b0d645d86dd6e62','2021-11-12',45,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,9,NULL,'3ee639bef6aa491d9841f1228e913073'),('b526616341e411ecbf1a645d86dd6e62','2021-11-10',45,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,5,NULL,'71b62fbb31234467ad0206be7d3c3bfe'),('b526616441e411ec9f6f645d86dd6e62','2021-11-10',45,2,'Total OT','',0,0.0,0.0,0.0,0,15,5,NULL,'71b62fbb31234467ad0206be7d3c3bfe'),('b526fdb641e411ec828d645d86dd6e62','2021-11-10',45,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,5,NULL,'71b62fbb31234467ad0206be7d3c3bfe'),('b526fdb741e411ec8378645d86dd6e62','2021-11-10',45,2,'Duration','',43200,1.0,12.0,720.0,0,1,5,NULL,'71b62fbb31234467ad0206be7d3c3bfe'),('b526fdb841e411ec916b645d86dd6e62','2021-11-10',45,2,'Total Hours','',21409,0.5,5.9,356.8,0,3,5,NULL,'71b62fbb31234467ad0206be7d3c3bfe'),('b52770ec41e411ec863b645d86dd6e62','2021-11-10',45,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,5,NULL,'71b62fbb31234467ad0206be7d3c3bfe'),('b53a576c484b11eca5b4645d86dd6e62','2021-11-18',46,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,3,NULL,'916496b489fe477d9d4ef38353a403da'),('b53a576d484b11ec8922645d86dd6e62','2021-11-18',46,3,'Total OT','',0,0.0,0.0,0.0,0,15,3,NULL,'916496b489fe477d9d4ef38353a403da'),('b53a7e70484b11ecbb1a645d86dd6e62','2021-11-18',46,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,3,NULL,'916496b489fe477d9d4ef38353a403da'),('b53a7e71484b11ec9555645d86dd6e62','2021-11-18',46,3,'Duration','',43200,1.0,12.0,720.0,0,1,3,NULL,'916496b489fe477d9d4ef38353a403da'),('b53aa580484b11ecaa23645d86dd6e62','2021-11-18',46,3,'Total Hours','',34496,0.8,9.6,574.9,0,3,3,NULL,'916496b489fe477d9d4ef38353a403da'),('b53aa581484b11ec80ed645d86dd6e62','2021-11-18',46,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,3,NULL,'916496b489fe477d9d4ef38353a403da'),('b880afd241e411ec96a2645d86dd6e62','2021-11-10',45,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,10,NULL,'03d222c7da7c4bfaab689976d9f7a134'),('b880afd341e411ec98a1645d86dd6e62','2021-11-10',45,2,'Total OT','',0,0.0,0.0,0.0,0,15,10,NULL,'03d222c7da7c4bfaab689976d9f7a134'),('b880afd441e411ecb294645d86dd6e62','2021-11-10',45,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,10,NULL,'03d222c7da7c4bfaab689976d9f7a134'),('b880afd541e411eca366645d86dd6e62','2021-11-10',45,2,'Duration','',43200,1.0,12.0,720.0,0,1,10,NULL,'03d222c7da7c4bfaab689976d9f7a134'),('b880afd641e411eca35d645d86dd6e62','2021-11-10',45,2,'Total Hours','',11831,0.3,3.3,197.2,0,3,10,NULL,'03d222c7da7c4bfaab689976d9f7a134'),('b8814c1c41e411ec987d645d86dd6e62','2021-11-10',45,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,10,NULL,'03d222c7da7c4bfaab689976d9f7a134'),('b9b93d1e41e411eca946645d86dd6e62','2021-11-10',45,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,9,NULL,'bdeeafc6bd374e669cd62f7208960a08'),('b9b93d1f41e411ecb30b645d86dd6e62','2021-11-10',45,2,'Total OT','',0,0.0,0.0,0.0,0,15,9,NULL,'bdeeafc6bd374e669cd62f7208960a08'),('b9b93d2041e411ecab83645d86dd6e62','2021-11-10',45,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,9,NULL,'bdeeafc6bd374e669cd62f7208960a08'),('b9b93d2141e411ec864c645d86dd6e62','2021-11-10',45,2,'Duration','',43200,1.0,12.0,720.0,0,1,9,NULL,'bdeeafc6bd374e669cd62f7208960a08'),('b9b93d2241e411ec8e76645d86dd6e62','2021-11-10',45,2,'Total Hours','',11837,0.3,3.3,197.3,0,3,9,NULL,'bdeeafc6bd374e669cd62f7208960a08'),('b9b93d2341e411ec8a1b645d86dd6e62','2021-11-10',45,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,9,NULL,'bdeeafc6bd374e669cd62f7208960a08'),('bab8b15c41e411ec86cd645d86dd6e62','2021-11-10',45,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,7,NULL,'8481f07c68c24059b4700d03d825c35f'),('bab8b15d41e411ecad92645d86dd6e62','2021-11-10',45,2,'Total OT','',0,0.0,0.0,0.0,0,15,7,NULL,'8481f07c68c24059b4700d03d825c35f'),('bab8b15e41e411ec99c7645d86dd6e62','2021-11-10',45,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,7,NULL,'8481f07c68c24059b4700d03d825c35f'),('bab8b15f41e411ec9664645d86dd6e62','2021-11-10',45,2,'Duration','',43200,1.0,12.0,720.0,0,1,7,NULL,'8481f07c68c24059b4700d03d825c35f'),('bab8b16041e411ec9112645d86dd6e62','2021-11-10',45,2,'Total Hours','',11845,0.3,3.3,197.4,0,3,7,NULL,'8481f07c68c24059b4700d03d825c35f'),('bab8b16141e411ec8c26645d86dd6e62','2021-11-10',45,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,7,NULL,'8481f07c68c24059b4700d03d825c35f'),('bb82faec41e411ec9a52645d86dd6e62','2021-11-10',45,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,8,NULL,'0f334823fc4d44769765014f35bb0e6c'),('bb8310ca41e411ecb9eb645d86dd6e62','2021-11-10',45,2,'Total OT','',0,0.0,0.0,0.0,0,15,8,NULL,'0f334823fc4d44769765014f35bb0e6c'),('bb8310cb41e411eca6cf645d86dd6e62','2021-11-10',45,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,8,NULL,'0f334823fc4d44769765014f35bb0e6c'),('bb8310cc41e411ec90b3645d86dd6e62','2021-11-10',45,2,'Duration','',43200,1.0,12.0,720.0,0,1,8,NULL,'0f334823fc4d44769765014f35bb0e6c'),('bb834c0241e411ec84ff645d86dd6e62','2021-11-10',45,2,'Total Hours','',11844,0.3,3.3,197.4,0,3,8,NULL,'0f334823fc4d44769765014f35bb0e6c'),('bb834c0341e411ec9c07645d86dd6e62','2021-11-10',45,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,8,NULL,'0f334823fc4d44769765014f35bb0e6c'),('bcb8d95941e411ec8e5f645d86dd6e62','2021-11-10',45,2,'Duty Duration','',43200,1.0,12.0,720.0,0,2,6,NULL,'005dab7d829a45baa4a65a97443af2d0'),('bcb975b441e411ecb54b645d86dd6e62','2021-11-10',45,2,'Total OT','',0,0.0,0.0,0.0,0,15,6,NULL,'005dab7d829a45baa4a65a97443af2d0'),('bcb975b541e411ec974a645d86dd6e62','2021-11-10',45,2,'Rule Total OT','',0,0.0,0.0,0.0,0,16,6,NULL,'005dab7d829a45baa4a65a97443af2d0'),('bcb975b641e411ecb750645d86dd6e62','2021-11-10',45,2,'Duration','',43200,1.0,12.0,720.0,0,1,6,NULL,'005dab7d829a45baa4a65a97443af2d0'),('bcb975b741e411ec8bb3645d86dd6e62','2021-11-10',45,2,'Total Hours','',11864,0.3,3.3,197.7,0,3,6,NULL,'005dab7d829a45baa4a65a97443af2d0'),('bcba11f441e411ecaee5645d86dd6e62','2021-11-10',45,2,'Total Leaves','',0,0.0,0.0,0.0,0,17,6,NULL,'005dab7d829a45baa4a65a97443af2d0'),('bf6dd31d484b11ecae35645d86dd6e62','2021-11-18',46,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,4,NULL,'3e14ce9ef63542f4b563efed5ff5d820'),('bf6dd31e484b11eca7d0645d86dd6e62','2021-11-18',46,3,'Total OT','',0,0.0,0.0,0.0,0,15,4,NULL,'3e14ce9ef63542f4b563efed5ff5d820'),('bf6dd31f484b11ecb6d2645d86dd6e62','2021-11-18',46,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,4,NULL,'3e14ce9ef63542f4b563efed5ff5d820'),('bf6dd320484b11ec9123645d86dd6e62','2021-11-18',46,3,'Duration','',43200,1.0,12.0,720.0,0,1,4,NULL,'3e14ce9ef63542f4b563efed5ff5d820'),('bf6dd321484b11ec839a645d86dd6e62','2021-11-18',46,3,'Total Hours','',34510,0.8,9.6,575.2,0,3,4,NULL,'3e14ce9ef63542f4b563efed5ff5d820'),('bf6dd322484b11eca5b4645d86dd6e62','2021-11-18',46,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,4,NULL,'3e14ce9ef63542f4b563efed5ff5d820'),('c01bc155484b11ec94b4645d86dd6e62','2021-11-18',46,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,5,NULL,'4d35a8480d844631ac6c8b7df7e55c97'),('c01bc156484b11ec923e645d86dd6e62','2021-11-18',46,3,'Total OT','',0,0.0,0.0,0.0,0,15,5,NULL,'4d35a8480d844631ac6c8b7df7e55c97'),('c01bc157484b11eca54f645d86dd6e62','2021-11-18',46,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,5,NULL,'4d35a8480d844631ac6c8b7df7e55c97'),('c01bc158484b11ec909d645d86dd6e62','2021-11-18',46,3,'Duration','',43200,1.0,12.0,720.0,0,1,5,NULL,'4d35a8480d844631ac6c8b7df7e55c97'),('c01bc159484b11eca63a645d86dd6e62','2021-11-18',46,3,'Total Hours','',34509,0.8,9.6,575.2,0,3,5,NULL,'4d35a8480d844631ac6c8b7df7e55c97'),('c01bc15a484b11ecaefe645d86dd6e62','2021-11-18',46,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,5,NULL,'4d35a8480d844631ac6c8b7df7e55c97'),('c17abb55484b11ec8309645d86dd6e62','2021-11-18',46,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,6,NULL,'f2163a57a5e24bb9b177f2541954ba86'),('c17abb56484b11ec9aef645d86dd6e62','2021-11-18',46,3,'Total OT','',0,0.0,0.0,0.0,0,15,6,NULL,'f2163a57a5e24bb9b177f2541954ba86'),('c17abb57484b11eca715645d86dd6e62','2021-11-18',46,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,6,NULL,'f2163a57a5e24bb9b177f2541954ba86'),('c17abb58484b11ec82c0645d86dd6e62','2021-11-18',46,3,'Duration','',43200,1.0,12.0,720.0,0,1,6,NULL,'f2163a57a5e24bb9b177f2541954ba86'),('c17c38d4484b11ec80ee645d86dd6e62','2021-11-18',46,3,'Total Hours','',34508,0.8,9.6,575.1,0,3,6,NULL,'f2163a57a5e24bb9b177f2541954ba86'),('c17c3a0a484b11eca6a3645d86dd6e62','2021-11-18',46,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,6,NULL,'f2163a57a5e24bb9b177f2541954ba86'),('c29c9eb7484b11ecbce5645d86dd6e62','2021-11-18',46,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,7,NULL,'0d1c1dbad5644f23be6490ce3323e25a'),('c29c9eb8484b11ec8ef2645d86dd6e62','2021-11-18',46,3,'Total OT','',0,0.0,0.0,0.0,0,15,7,NULL,'0d1c1dbad5644f23be6490ce3323e25a'),('c29c9eb9484b11ecb78e645d86dd6e62','2021-11-18',46,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,7,NULL,'0d1c1dbad5644f23be6490ce3323e25a'),('c29c9eba484b11ecac2d645d86dd6e62','2021-11-18',46,3,'Duration','',43200,1.0,12.0,720.0,0,1,7,NULL,'0d1c1dbad5644f23be6490ce3323e25a'),('c29c9ebb484b11ec972d645d86dd6e62','2021-11-18',46,3,'Total Hours','',34509,0.8,9.6,575.2,0,3,7,NULL,'0d1c1dbad5644f23be6490ce3323e25a'),('c29c9ebc484b11ec9f49645d86dd6e62','2021-11-18',46,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,7,NULL,'0d1c1dbad5644f23be6490ce3323e25a'),('c4b5be63484b11ec9def645d86dd6e62','2021-11-18',46,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,8,NULL,'2913bb855af14828956fb3ab8e7a19a6'),('c4b5be64484b11ec93be645d86dd6e62','2021-11-18',46,3,'Total OT','',0,0.0,0.0,0.0,0,15,8,NULL,'2913bb855af14828956fb3ab8e7a19a6'),('c4b5be65484b11ec9ab9645d86dd6e62','2021-11-18',46,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,8,NULL,'2913bb855af14828956fb3ab8e7a19a6'),('c4b5be66484b11ecbfc4645d86dd6e62','2021-11-18',46,3,'Duration','',43200,1.0,12.0,720.0,0,1,8,NULL,'2913bb855af14828956fb3ab8e7a19a6'),('c4b5be67484b11ec8b6c645d86dd6e62','2021-11-18',46,3,'Total Hours','',34509,0.8,9.6,575.2,0,3,8,NULL,'2913bb855af14828956fb3ab8e7a19a6'),('c4b5be68484b11ecb09d645d86dd6e62','2021-11-18',46,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,8,NULL,'2913bb855af14828956fb3ab8e7a19a6'),('c5e87281484b11ec82bf645d86dd6e62','2021-11-18',46,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,9,NULL,'ba9b17527d384ced8a5e5e1d99fea861'),('c5e87282484b11ec9d54645d86dd6e62','2021-11-18',46,3,'Total OT','',0,0.0,0.0,0.0,0,15,9,NULL,'ba9b17527d384ced8a5e5e1d99fea861'),('c5e87283484b11ecb8a1645d86dd6e62','2021-11-18',46,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,9,NULL,'ba9b17527d384ced8a5e5e1d99fea861'),('c5e87284484b11ecb3b3645d86dd6e62','2021-11-18',46,3,'Duration','',43200,1.0,12.0,720.0,0,1,9,NULL,'ba9b17527d384ced8a5e5e1d99fea861'),('c5e87285484b11ec9719645d86dd6e62','2021-11-18',46,3,'Total Hours','',34509,0.8,9.6,575.2,0,3,9,NULL,'ba9b17527d384ced8a5e5e1d99fea861'),('c5e87286484b11ec8913645d86dd6e62','2021-11-18',46,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,9,NULL,'ba9b17527d384ced8a5e5e1d99fea861'),('c72205f9484b11ec85dc645d86dd6e62','2021-11-18',46,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,11,NULL,'6b52036632fd4c1e93afd232f938defe'),('c72205fa484b11ec8de8645d86dd6e62','2021-11-18',46,3,'Total OT','',0,0.0,0.0,0.0,0,15,11,NULL,'6b52036632fd4c1e93afd232f938defe'),('c72205fb484b11ec8d14645d86dd6e62','2021-11-18',46,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,11,NULL,'6b52036632fd4c1e93afd232f938defe'),('c72205fc484b11ecb3eb645d86dd6e62','2021-11-18',46,3,'Duration','',43200,1.0,12.0,720.0,0,1,11,NULL,'6b52036632fd4c1e93afd232f938defe'),('c72205fd484b11ec9e62645d86dd6e62','2021-11-18',46,3,'Total Hours','',34509,0.8,9.6,575.2,0,3,11,NULL,'6b52036632fd4c1e93afd232f938defe'),('c72205fe484b11ec8c1f645d86dd6e62','2021-11-18',46,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,11,NULL,'6b52036632fd4c1e93afd232f938defe'),('d072fb69437411eca492645d86dd6e62','2021-11-12',45,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,4,NULL,'cd0b9e2a942541f6a22099224c528653'),('d074f74c437411ecb20b645d86dd6e62','2021-11-12',45,4,'Total OT','',0,0.0,0.0,0.0,0,15,4,NULL,'cd0b9e2a942541f6a22099224c528653'),('d074f74d437411ec9890645d86dd6e62','2021-11-12',45,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,4,NULL,'cd0b9e2a942541f6a22099224c528653'),('d0751e62437411eca386645d86dd6e62','2021-11-12',45,4,'Duration','',43200,1.0,12.0,720.0,0,1,4,NULL,'cd0b9e2a942541f6a22099224c528653'),('d0751e63437411ecb6d2645d86dd6e62','2021-11-12',45,4,'Total Hours','',21212,0.5,5.9,353.5,0,3,4,NULL,'cd0b9e2a942541f6a22099224c528653'),('d0751e64437411ecaddf645d86dd6e62','2021-11-12',45,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,4,NULL,'cd0b9e2a942541f6a22099224c528653'),('dca53d2c42a911ec841b645d86dd6e62','2021-11-11',45,3,'Duty Duration','',43200,1.0,12.0,720.0,0,2,10,NULL,'f771d2db94f9468ab57e8ff8f8c195fc'),('dca5643a42a911ec97c6645d86dd6e62','2021-11-11',45,3,'Total OT','',0,0.0,0.0,0.0,0,15,10,NULL,'f771d2db94f9468ab57e8ff8f8c195fc'),('dca5643b42a911ecb062645d86dd6e62','2021-11-11',45,3,'Rule Total OT','',0,0.0,0.0,0.0,0,16,10,NULL,'f771d2db94f9468ab57e8ff8f8c195fc'),('dca5643c42a911ec8df7645d86dd6e62','2021-11-11',45,3,'Duration','',43200,1.0,12.0,720.0,0,1,10,NULL,'f771d2db94f9468ab57e8ff8f8c195fc'),('dca5643d42a911ec84d2645d86dd6e62','2021-11-11',45,3,'Total Hours','',19291,0.4,5.4,321.5,0,3,10,NULL,'f771d2db94f9468ab57e8ff8f8c195fc'),('dca58b4c42a911ec8b75645d86dd6e62','2021-11-11',45,3,'Total Leaves','',0,0.0,0.0,0.0,0,17,10,NULL,'f771d2db94f9468ab57e8ff8f8c195fc'),('e31ac1464b2411ecb0ca645d86dd6e62','2021-11-22',47,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,1,NULL,'a33572ba2b2a470ea5e48dea07cf5860'),('e31ca5594b2411ecbaeb645d86dd6e62','2021-11-22',47,0,'Total OT','',0,0.0,0.0,0.0,0,15,1,NULL,'a33572ba2b2a470ea5e48dea07cf5860'),('e31ea12e4b2411ec897c645d86dd6e62','2021-11-22',47,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,1,NULL,'a33572ba2b2a470ea5e48dea07cf5860'),('e31f3d6e4b2411ecb7b2645d86dd6e62','2021-11-22',47,0,'Duration','',43200,1.0,12.0,720.0,0,1,1,NULL,'a33572ba2b2a470ea5e48dea07cf5860'),('e31fb2a44b2411ecba0f645d86dd6e62','2021-11-22',47,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,1,NULL,'a33572ba2b2a470ea5e48dea07cf5860'),('e42480404b2711ecbbd9645d86dd6e62','2021-11-22',47,0,'Duty Duration','',43200,1.0,12.0,720.0,0,2,11,NULL,'aa082fb572664f1c9a0205e8a41df7f2'),('e42480414b2711eca14b645d86dd6e62','2021-11-22',47,0,'Total OT','',0,0.0,0.0,0.0,0,15,11,NULL,'aa082fb572664f1c9a0205e8a41df7f2'),('e424a73e4b2711ecb628645d86dd6e62','2021-11-22',47,0,'Rule Total OT','',0,0.0,0.0,0.0,0,16,11,NULL,'aa082fb572664f1c9a0205e8a41df7f2'),('e424a73f4b2711ecbb6e645d86dd6e62','2021-11-22',47,0,'Duration','',43200,1.0,12.0,720.0,0,1,11,NULL,'aa082fb572664f1c9a0205e8a41df7f2'),('e424a7404b2711ec94ed645d86dd6e62','2021-11-22',47,0,'Total Leaves','',0,0.0,0.0,0.0,0,17,11,NULL,'aa082fb572664f1c9a0205e8a41df7f2'),('f2a4c4c9434d11ecb964645d86dd6e62','2021-11-12',45,4,'Duty Duration','',43200,1.0,12.0,720.0,0,2,11,NULL,'019994e6fa81456a8fdd0bf87aafb87e'),('f2a4c4ca434d11ec98b8645d86dd6e62','2021-11-12',45,4,'Total OT','',0,0.0,0.0,0.0,0,15,11,NULL,'019994e6fa81456a8fdd0bf87aafb87e'),('f2a4c4cb434d11ecacca645d86dd6e62','2021-11-12',45,4,'Rule Total OT','',0,0.0,0.0,0.0,0,16,11,NULL,'019994e6fa81456a8fdd0bf87aafb87e'),('f2a4c4cc434d11ecabf9645d86dd6e62','2021-11-12',45,4,'Duration','',43200,1.0,12.0,720.0,0,1,11,NULL,'019994e6fa81456a8fdd0bf87aafb87e'),('f2a4c4cd434d11ecbe2b645d86dd6e62','2021-11-12',45,4,'Total Hours','',4511,0.1,1.3,75.2,0,3,11,NULL,'019994e6fa81456a8fdd0bf87aafb87e'),('f2a5d736434d11ec9aa7645d86dd6e62','2021-11-12',45,4,'Total Leaves','',0,0.0,0.0,0.0,0,17,11,NULL,'019994e6fa81456a8fdd0bf87aafb87e');
/*!40000 ALTER TABLE `att_payloadattcode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_payloadbase`
--

DROP TABLE IF EXISTS `att_payloadbase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `timetable_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `break_time_id` (`break_time_id`),
  UNIQUE KEY `overtime_id` (`overtime_id`),
  KEY `att_payloadbase_emp_id_2c0f6a7b_fk_personnel_employee_id` (`emp_id`),
  KEY `att_payloadbase_timetable_id_a389e3d8_fk_att_timeinterval_id` (`timetable_id`),
  CONSTRAINT `att_payloadbase_emp_id_2c0f6a7b_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `att_payloadbase_timetable_id_a389e3d8_fk_att_timeinterval_id` FOREIGN KEY (`timetable_id`) REFERENCES `att_timeinterval` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_payloadbase`
--

LOCK TABLES `att_payloadbase` WRITE;
/*!40000 ALTER TABLE `att_payloadbase` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_payloadbase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_payloadbreak`
--

DROP TABLE IF EXISTS `att_payloadbreak`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `holiday_ot` int(11) DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_payloadbreak`
--

LOCK TABLES `att_payloadbreak` WRITE;
/*!40000 ALTER TABLE `att_payloadbreak` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_payloadbreak` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_payloadeffectpunch`
--

DROP TABLE IF EXISTS `att_payloadeffectpunch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `trans_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `att_payloadeffectpunch_emp_id_67e28e01_fk_personnel_employee_id` (`emp_id`),
  KEY `att_payloadeffectpunch_att_date_1e3de2d4` (`att_date`),
  KEY `att_payloadeffectpunch_time_card_id_52f69aaf` (`time_card_id`),
  KEY `att_payloadeffectpun_trans_id_94affbe6_fk_iclock_tr` (`trans_id`),
  CONSTRAINT `att_payloadeffectpun_trans_id_94affbe6_fk_iclock_tr` FOREIGN KEY (`trans_id`) REFERENCES `iclock_transaction` (`id`),
  CONSTRAINT `att_payloadeffectpunch_emp_id_67e28e01_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_payloadeffectpunch`
--

LOCK TABLES `att_payloadeffectpunch` WRITE;
/*!40000 ALTER TABLE `att_payloadeffectpunch` DISABLE KEYS */;
INSERT INTO `att_payloadeffectpunch` VALUES ('07be39fb484911ec9ae5645d86dd6e62','2021-11-18','2021-11-18 07:09:13.000000','2021-11-18','07:09:13.000000',46,3,'','0','0',1,'f0bb0a63d3464be28c0090fc43c2f0be',190),('07be39fc484911eca80a645d86dd6e62','2021-11-18','2021-11-18 16:25:01.000000','2021-11-18','16:25:01.000000',46,3,'','1','1',1,'f0bb0a63d3464be28c0090fc43c2f0be',243),('0f759d4941f411ec823f645d86dd6e62','2021-11-10','2021-11-10 07:14:59.000000','2021-11-10','07:14:59.000000',45,2,'','0','0',3,'de8fd22cb4104f79ab68e3e85bb35d27',23),('0f759d4a41f411ec9c7d645d86dd6e62','2021-11-10','2021-11-10 15:01:49.000000','2021-11-10','15:01:49.000000',45,2,'','1','1',3,'de8fd22cb4104f79ab68e3e85bb35d27',84),('144895f7412611ec893e645d86dd6e62','2021-11-09','2021-11-09 14:27:12.000000','2021-11-09','14:27:12.000000',45,1,'','0','0',2,'31ce892242ac4732b3798b9820ace701',4),('157c8cd3412611ec9d77645d86dd6e62','2021-11-09','2021-11-09 14:27:15.000000','2021-11-09','14:27:15.000000',45,1,'','0','0',3,'fca638b619fb40d1914b19ae48a7b208',5),('16af8c9f412611ec8a59645d86dd6e62','2021-11-09','2021-11-09 14:27:16.000000','2021-11-09','14:27:16.000000',45,1,'','0','0',4,'99a4a4e0ff81423da17c2340b8cdf3db',6),('18ab17e3412611ec95f5645d86dd6e62','2021-11-09','2021-11-09 14:27:19.000000','2021-11-09','14:27:19.000000',45,1,'','0','0',10,'1360aa7da9e34cedb8d47acdcac25663',7),('19de5c7b412611ec9c8d645d86dd6e62','2021-11-09','2021-11-09 14:27:22.000000','2021-11-09','14:27:22.000000',45,1,'','0','0',8,'f4d1002f964240cdb47105004b4c146e',8),('1c4439f5412611ecbcc3645d86dd6e62','2021-11-09','2021-11-09 14:27:26.000000','2021-11-09','14:27:26.000000',45,1,'','0','0',9,'61dd3941109245f9a5b49727a85bc0ef',9),('1ddf82f9412611eca621645d86dd6e62','2021-11-09','2021-11-09 14:27:28.000000','2021-11-09','14:27:28.000000',45,1,'','0','0',7,'cae9c07fdd1745679744a8b8f56acaeb',10),('1f128dfb412611eca37d645d86dd6e62','2021-11-09','2021-11-09 14:27:30.000000','2021-11-09','14:27:30.000000',45,1,'','0','0',6,'2beccc8862d8402689d2025f67e850ab',11),('2c7cff1b45ea11ecb6ff645d86dd6e62','2021-11-15','2021-11-15 07:13:10.000000','2021-11-15','07:13:10.000000',46,0,'','0','0',1,'71e55377d17441078205a15f417265c6',132),('2c7cff1c45ea11ec897c645d86dd6e62','2021-11-15','2021-11-15 16:01:01.000000','2021-11-15','16:01:01.000000',46,0,'','1','1',1,'71e55377d17441078205a15f417265c6',161),('2ec8a4a945ea11ecacc5645d86dd6e62','2021-11-15','2021-11-15 07:13:12.000000','2021-11-15','07:13:12.000000',46,0,'','0','0',3,'254a84a1e92c438ca052be923aca2a13',133),('2eca051845ea11ec9c26645d86dd6e62','2021-11-15','2021-11-15 16:01:05.000000','2021-11-15','16:01:05.000000',46,0,'','1','1',3,'254a84a1e92c438ca052be923aca2a13',162),('312de0a545ea11ecae25645d86dd6e62','2021-11-15','2021-11-15 07:13:14.000000','2021-11-15','07:13:14.000000',46,0,'','0','0',4,'fabb79d9917c4899b973b547429d67fb',134),('312de0a645ea11ec95f9645d86dd6e62','2021-11-15','2021-11-15 16:01:08.000000','2021-11-15','16:01:08.000000',46,0,'','1','1',4,'fabb79d9917c4899b973b547429d67fb',163),('3397dec745ea11ec81c2645d86dd6e62','2021-11-15','2021-11-15 07:13:22.000000','2021-11-15','07:13:22.000000',46,0,'','0','0',6,'8b18795b41e2417f94312bd72b2592b6',136),('3397dec845ea11ecaf2b645d86dd6e62','2021-11-15','2021-11-15 16:01:13.000000','2021-11-15','16:01:13.000000',46,0,'','1','1',6,'8b18795b41e2417f94312bd72b2592b6',164),('35eaed9d45ea11ec9c60645d86dd6e62','2021-11-15','2021-11-15 07:13:28.000000','2021-11-15','07:13:28.000000',46,0,'','0','0',9,'d53ab4dc98aa4293a4c0c570bffcba8e',139),('35eaed9e45ea11ec8675645d86dd6e62','2021-11-15','2021-11-15 16:01:16.000000','2021-11-15','16:01:16.000000',46,0,'','1','1',9,'d53ab4dc98aa4293a4c0c570bffcba8e',165),('38a36aa946b511ec8d3e645d86dd6e62','2021-11-16','2021-11-16 07:02:53.000000','2021-11-16','07:02:53.000000',46,1,'','0','0',1,'f53b6c90052c484eb1f642f36ae31a51',175),('38a5dbb846b511ecb1ed645d86dd6e62','2021-11-16','2021-11-16 16:14:21.000000','2021-11-16','16:14:21.000000',46,1,'','1','1',1,'f53b6c90052c484eb1f642f36ae31a51',179),('38b8c48f46b511ecbc55645d86dd6e62','2021-11-16','2021-11-16 07:02:56.000000','2021-11-16','07:02:56.000000',46,1,'','0','0',3,'a4347c9412ec4178b98cbab80a1bc454',176),('38b8c49046b511ecb505645d86dd6e62','2021-11-16','2021-11-16 16:14:24.000000','2021-11-16','16:14:24.000000',46,1,'','1','1',3,'a4347c9412ec4178b98cbab80a1bc454',180),('3946b0f146b511ecbec3645d86dd6e62','2021-11-16','2021-11-16 07:03:02.000000','2021-11-16','07:03:02.000000',46,1,'','0','0',4,'f973aa5bf252484dbdc36a548e3ea4c4',177),('3946b0f246b511eca591645d86dd6e62','2021-11-16','2021-11-16 16:14:27.000000','2021-11-16','16:14:27.000000',46,1,'','1','1',4,'f973aa5bf252484dbdc36a548e3ea4c4',181),('39c24b7b46b511eca655645d86dd6e62','2021-11-16','2021-11-16 07:03:04.000000','2021-11-16','07:03:04.000000',46,1,'','0','0',5,'f60c95b6c629493bba8cc0ffebc3e52d',178),('39c24b7c46b511ecaf4e645d86dd6e62','2021-11-16','2021-11-16 16:14:29.000000','2021-11-16','16:14:29.000000',46,1,'','1','1',5,'f60c95b6c629493bba8cc0ffebc3e52d',182),('3abb9df945ea11ecbb94645d86dd6e62','2021-11-15','2021-11-15 07:13:31.000000','2021-11-15','07:13:31.000000',46,0,'','0','0',11,'a1404357b5a449f7bb1054e952066c22',140),('3abb9dfa45ea11ec9a93645d86dd6e62','2021-11-15','2021-11-15 16:01:19.000000','2021-11-15','16:01:19.000000',46,0,'','1','1',11,'a1404357b5a449f7bb1054e952066c22',166),('3bb9d21946b511ecb50e645d86dd6e62','2021-11-16','2021-11-16 07:02:50.000000','2021-11-16','07:02:50.000000',46,1,'','0','0',2,'6cbd3d16e3c0468eb706351f26e49513',174),('3bb9d21a46b511ec892d645d86dd6e62','2021-11-16','2021-11-16 16:14:32.000000','2021-11-16','16:14:32.000000',46,1,'','1','1',2,'6cbd3d16e3c0468eb706351f26e49513',183),('3d2369e546b511ecbe0e645d86dd6e62','2021-11-16','2021-11-16 07:02:35.000000','2021-11-16','07:02:35.000000',46,1,'','0','0',6,'9287878d44a74926904ad17fa3628032',169),('3d2369e646b511ecb6cd645d86dd6e62','2021-11-16','2021-11-16 16:14:34.000000','2021-11-16','16:14:34.000000',46,1,'','1','1',6,'9287878d44a74926904ad17fa3628032',184),('3f50529346b511eca9aa645d86dd6e62','2021-11-16','2021-11-16 07:02:37.000000','2021-11-16','07:02:37.000000',46,1,'','0','0',7,'0e817e7dab75477b8681d1605cee568b',170),('3f50529446b511ec87a0645d86dd6e62','2021-11-16','2021-11-16 16:14:37.000000','2021-11-16','16:14:37.000000',46,1,'','1','1',7,'0e817e7dab75477b8681d1605cee568b',185),('40bbe65b46b511ecb4d9645d86dd6e62','2021-11-16','2021-11-16 07:02:40.000000','2021-11-16','07:02:40.000000',46,1,'','0','0',8,'7548520b5725475abdca7bbbd4e5354c',171),('40bbe65c46b511ecabef645d86dd6e62','2021-11-16','2021-11-16 16:14:40.000000','2021-11-16','16:14:40.000000',46,1,'','1','1',8,'7548520b5725475abdca7bbbd4e5354c',186),('41ebbb4946b511ecb972645d86dd6e62','2021-11-16','2021-11-16 07:02:42.000000','2021-11-16','07:02:42.000000',46,1,'','0','0',9,'d24ed603efc64fadb32d7ddc54f0214b',172),('41ebbb4a46b511ecacf6645d86dd6e62','2021-11-16','2021-11-16 16:14:42.000000','2021-11-16','16:14:42.000000',46,1,'','1','1',9,'d24ed603efc64fadb32d7ddc54f0214b',187),('437db4bf46b511ecb09f645d86dd6e62','2021-11-16','2021-11-16 07:02:48.000000','2021-11-16','07:02:48.000000',46,1,'','0','0',11,'c5e34ad1ee8d41a5a4b7f5e61dc8ef64',173),('437db4c046b511ec850a645d86dd6e62','2021-11-16','2021-11-16 16:14:45.000000','2021-11-16','16:14:45.000000',46,1,'','1','1',11,'c5e34ad1ee8d41a5a4b7f5e61dc8ef64',188),('528a5c9941e511ec8fe1645d86dd6e62','2021-11-10','2021-11-10 07:15:01.000000','2021-11-10','07:15:01.000000',45,2,'','0','0',4,'a2a6bdf198ef40388cf6e37a7989eadf',24),('528a5c9a41e511ec92fb645d86dd6e62','2021-11-10','2021-11-10 13:16:19.000000','2021-11-10','13:16:19.000000',45,2,'','1','1',4,'a2a6bdf198ef40388cf6e37a7989eadf',78),('5c144b8145e911ecaa2e645d86dd6e62','2021-11-15','2021-11-15 07:13:08.000000','2021-11-15','07:13:08.000000',46,0,'','0','0',2,'05857b25258c4d11b350d147b052640a',131),('5c1a681845e911ec99f9645d86dd6e62','2021-11-15','2021-11-15 15:55:07.000000','2021-11-15','15:55:07.000000',46,0,'','1','1',2,'05857b25258c4d11b350d147b052640a',151),('60699e3b45e911ecb556645d86dd6e62','2021-11-15','2021-11-15 07:13:20.000000','2021-11-15','07:13:20.000000',46,0,'','0','0',5,'9edab3d5d3ea47dbbefeda55c44588bc',135),('60699e3c45e911ec9dba645d86dd6e62','2021-11-15','2021-11-15 15:55:18.000000','2021-11-15','15:55:18.000000',46,0,'','1','1',5,'9edab3d5d3ea47dbbefeda55c44588bc',155),('6305ee5545e911ec8bab645d86dd6e62','2021-11-15','2021-11-15 07:13:25.000000','2021-11-15','07:13:25.000000',46,0,'','0','0',7,'4244288bd6654460a67b9e0184938bbd',137),('63077a9045e911ecaf07645d86dd6e62','2021-11-15','2021-11-15 15:55:23.000000','2021-11-15','15:55:23.000000',46,0,'','1','1',7,'4244288bd6654460a67b9e0184938bbd',157),('641ba40345e911ec92c4645d86dd6e62','2021-11-15','2021-11-15 07:13:26.000000','2021-11-15','07:13:26.000000',46,0,'','0','0',8,'04609902d09d46db92d77a5d9fba1e3e',138),('641ba40445e911eca059645d86dd6e62','2021-11-15','2021-11-15 15:55:25.000000','2021-11-15','15:55:25.000000',46,0,'','1','1',8,'04609902d09d46db92d77a5d9fba1e3e',158),('659ce80742c611ec99c9645d86dd6e62','2021-11-11','2021-11-11 07:20:40.000000','2021-11-11','07:20:40.000000',45,3,'','0','0',2,'fbf876b3e98646378c0932b77076ed9c',88),('659ce80842c611ec9ca1645d86dd6e62','2021-11-11','2021-11-11 16:07:19.000000','2021-11-11','16:07:19.000000',45,3,'','1','1',2,'fbf876b3e98646378c0932b77076ed9c',108),('6794055142c611ecb97d645d86dd6e62','2021-11-11','2021-11-11 07:20:42.000000','2021-11-11','07:20:42.000000',45,3,'','0','0',1,'b8ae7b2d8b2f4095a1e8adb4f39edb7e',89),('6794055242c611ec8393645d86dd6e62','2021-11-11','2021-11-11 16:07:23.000000','2021-11-11','16:07:23.000000',45,3,'','1','1',1,'b8ae7b2d8b2f4095a1e8adb4f39edb7e',109),('6912164350a611ec929f645d86dd6e62','2021-11-24','2021-11-24 07:01:57.000000','2021-11-24','07:01:57.000000',47,2,'','0','0',2,'7bbf535bbfa345db9e33c04939940639',295),('69123d5c50a611ec9348645d86dd6e62','2021-11-24','2021-11-24 16:01:00.000000','2021-11-24','16:01:00.000000',47,2,'','1','1',2,'7bbf535bbfa345db9e33c04939940639',305),('69729ba942c611ec99f5645d86dd6e62','2021-11-11','2021-11-11 07:20:44.000000','2021-11-11','07:20:44.000000',45,3,'','0','0',3,'dca720404fc146a7abf050be8491aaf4',90),('69729baa42c611eca32f645d86dd6e62','2021-11-11','2021-11-11 16:07:26.000000','2021-11-11','16:07:26.000000',45,3,'','1','1',3,'dca720404fc146a7abf050be8491aaf4',110),('698171d550a611ecb57e645d86dd6e62','2021-11-24','2021-11-24 07:01:59.000000','2021-11-24','07:01:59.000000',47,2,'','0','0',1,'85f1e7a4cacd4d1cbaf53f38d6a5b9de',296),('698171d650a611eca6af645d86dd6e62','2021-11-24','2021-11-24 16:01:02.000000','2021-11-24','16:01:02.000000',47,2,'','1','1',1,'85f1e7a4cacd4d1cbaf53f38d6a5b9de',306),('698d8d0250a611ecb254645d86dd6e62','2021-11-24','2021-11-24 07:02:01.000000','2021-11-24','07:02:01.000000',47,2,'','0','0',3,'86da06ed8ba2494bb5f01baa7202cd59',297),('698d8d0350a611ec9678645d86dd6e62','2021-11-24','2021-11-24 16:01:04.000000','2021-11-24','16:01:04.000000',47,2,'','1','1',3,'86da06ed8ba2494bb5f01baa7202cd59',307),('69a3dcda50a611ec8aaf645d86dd6e62','2021-11-24','2021-11-24 07:02:03.000000','2021-11-24','07:02:03.000000',47,2,'','0','0',4,'8f50d1e142e94e2793521a5f463adac6',298),('69a3dcdb50a611ec9860645d86dd6e62','2021-11-24','2021-11-24 16:01:06.000000','2021-11-24','16:01:06.000000',47,2,'','1','1',4,'8f50d1e142e94e2793521a5f463adac6',308),('6a7fd14b42c611eca897645d86dd6e62','2021-11-11','2021-11-11 07:21:06.000000','2021-11-11','07:21:06.000000',45,3,'','0','0',4,'ecfd78252239443b946ab68eb77737eb',91),('6a7ff85a42c611eca06a645d86dd6e62','2021-11-11','2021-11-11 16:07:29.000000','2021-11-11','16:07:29.000000',45,3,'','1','1',4,'ecfd78252239443b946ab68eb77737eb',111),('6c33b64950a611ecaba1645d86dd6e62','2021-11-24','2021-11-24 07:02:19.000000','2021-11-24','07:02:19.000000',47,2,'','0','0',5,'a8d8a6cf569e43229f077dbe8a250beb',299),('6c33dd4850a611ec9ac9645d86dd6e62','2021-11-24','2021-11-24 16:01:08.000000','2021-11-24','16:01:08.000000',47,2,'','1','1',5,'a8d8a6cf569e43229f077dbe8a250beb',309),('6c54494750a611ecb866645d86dd6e62','2021-11-24','2021-11-24 07:02:22.000000','2021-11-24','07:02:22.000000',47,2,'','0','0',6,'d5fea8ef9e0d459bb1dbbb4a39f79a3c',300),('6c54494850a611ecaa3c645d86dd6e62','2021-11-24','2021-11-24 16:01:10.000000','2021-11-24','16:01:10.000000',47,2,'','1','1',6,'d5fea8ef9e0d459bb1dbbb4a39f79a3c',310),('6c77da7150a611eca27c645d86dd6e62','2021-11-24','2021-11-24 07:02:24.000000','2021-11-24','07:02:24.000000',47,2,'','0','0',7,'e77832cfcdf04fd58d24dcf6d4aa9bbc',301),('6c78017e50a611ec8df7645d86dd6e62','2021-11-24','2021-11-24 16:01:13.000000','2021-11-24','16:01:13.000000',47,2,'','1','1',7,'e77832cfcdf04fd58d24dcf6d4aa9bbc',311),('6d2d2d1b50a611ec85f9645d86dd6e62','2021-11-24','2021-11-24 07:02:27.000000','2021-11-24','07:02:27.000000',47,2,'','0','0',8,'8b3cb7c07cee4116a7a47c8c4c05ee25',302),('6d2d2d1c50a611ec8d8e645d86dd6e62','2021-11-24','2021-11-24 16:01:15.000000','2021-11-24','16:01:15.000000',47,2,'','1','1',8,'8b3cb7c07cee4116a7a47c8c4c05ee25',312),('6da6f02d42c611ec9ce4645d86dd6e62','2021-11-11','2021-11-11 07:21:14.000000','2021-11-11','07:21:14.000000',45,3,'','0','0',6,'25f6a7dc8bf446e686928ec23c1e3116',93),('6da6f02e42c611ec96d9645d86dd6e62','2021-11-11','2021-11-11 16:07:34.000000','2021-11-11','16:07:34.000000',45,3,'','1','1',6,'25f6a7dc8bf446e686928ec23c1e3116',112),('6df0b60950a611ec8cea645d86dd6e62','2021-11-24','2021-11-24 07:02:29.000000','2021-11-24','07:02:29.000000',47,2,'','0','0',9,'622576a64b0041dcbcb47c72bface19c',303),('6df0b60a50a611eca9b6645d86dd6e62','2021-11-24','2021-11-24 16:01:17.000000','2021-11-24','16:01:17.000000',47,2,'','1','1',9,'622576a64b0041dcbcb47c72bface19c',313),('6e31ece950a611ecb65c645d86dd6e62','2021-11-24','2021-11-24 07:02:31.000000','2021-11-24','07:02:31.000000',47,2,'','0','0',11,'bffbadc96d4149e69170ee707a7a9347',304),('6e31ecea50a611ecb720645d86dd6e62','2021-11-24','2021-11-24 16:01:20.000000','2021-11-24','16:01:20.000000',47,2,'','1','1',11,'bffbadc96d4149e69170ee707a7a9347',314),('6f13de2f42c611ec9f74645d86dd6e62','2021-11-11','2021-11-11 07:21:16.000000','2021-11-11','07:21:16.000000',45,3,'','0','0',7,'ad2146b444c04606a5e5d28753bfcda7',94),('6f13de3042c611ec8cb8645d86dd6e62','2021-11-11','2021-11-11 16:07:36.000000','2021-11-11','16:07:36.000000',45,3,'','1','1',7,'ad2146b444c04606a5e5d28753bfcda7',113),('707133d942c611ec9481645d86dd6e62','2021-11-11','2021-11-11 07:21:19.000000','2021-11-11','07:21:19.000000',45,3,'','0','0',8,'802c26680d8f4e7188e8be0eb009e5dc',95),('707133da42c611eca536645d86dd6e62','2021-11-11','2021-11-11 16:07:38.000000','2021-11-11','16:07:38.000000',45,3,'','1','1',8,'802c26680d8f4e7188e8be0eb009e5dc',114),('7171581f42c611ecac63645d86dd6e62','2021-11-11','2021-11-11 07:21:21.000000','2021-11-11','07:21:21.000000',45,3,'','0','0',9,'a7b34d93151540e28362b39ee6781c34',96),('7171582042c611ec8c37645d86dd6e62','2021-11-11','2021-11-11 16:07:40.000000','2021-11-11','16:07:40.000000',45,3,'','1','1',9,'a7b34d93151540e28362b39ee6781c34',115),('7280b2c250a611ecbaea645d86dd6e62','2021-11-25','2021-11-25 07:03:09.000000','2021-11-25','07:03:09.000000',47,3,'','0','0',6,'52a080e42cc840739dc522ab319710ae',320),('7280b37650a611ec8ac0645d86dd6e62','2021-11-25','2021-11-25 16:27:24.000000','2021-11-25','16:27:24.000000',47,3,'','1','1',6,'52a080e42cc840739dc522ab319710ae',325),('73341fad50a611ec9367645d86dd6e62','2021-11-25','2021-11-25 07:03:14.000000','2021-11-25','07:03:14.000000',47,3,'','0','0',7,'dcb5d8dff2f54db786c2c32d5ffc3cb3',321),('73341fae50a611ecb0aa645d86dd6e62','2021-11-25','2021-11-25 16:27:26.000000','2021-11-25','16:27:26.000000',47,3,'','1','1',7,'dcb5d8dff2f54db786c2c32d5ffc3cb3',326),('73e0936942c611eca54d645d86dd6e62','2021-11-11','2021-11-11 12:44:19.000000','2021-11-11','12:44:19.000000',45,3,'','4','0',11,'64ad1e5afae743b9bc130d28a496731a',104),('73e0936a42c611ecb5a5645d86dd6e62','2021-11-11','2021-11-11 16:07:44.000000','2021-11-11','16:07:44.000000',45,3,'','1','1',11,'64ad1e5afae743b9bc130d28a496731a',116),('73ede2ef50a611ecad33645d86dd6e62','2021-11-25','2021-11-25 07:03:19.000000','2021-11-25','07:03:19.000000',47,3,'','0','0',8,'5a9595fee4df4afe90766d63c82e6785',322),('73ede2f050a611ecaef8645d86dd6e62','2021-11-25','2021-11-25 16:27:28.000000','2021-11-25','16:27:28.000000',47,3,'','1','1',8,'5a9595fee4df4afe90766d63c82e6785',327),('74b240df50a611ecada5645d86dd6e62','2021-11-25','2021-11-25 07:03:22.000000','2021-11-25','07:03:22.000000',47,3,'','0','0',9,'1b7e7811aad84d7385c639a0797f2915',323),('74b240e050a611ecaf22645d86dd6e62','2021-11-25','2021-11-25 16:27:30.000000','2021-11-25','16:27:30.000000',47,3,'','1','1',9,'1b7e7811aad84d7385c639a0797f2915',328),('74c0c9bf412e11ec8778645d86dd6e62','2021-11-09','2021-11-09 14:21:06.000000','2021-11-09','14:21:06.000000',45,1,'','0','0',1,'bad02a450b0a4efbb85f3a3e1478f0df',1),('74c0c9c0412e11ec81cd645d86dd6e62','2021-11-09','2021-11-09 15:27:10.000000','2021-11-09','15:27:10.000000',45,1,'','1','1',1,'bad02a450b0a4efbb85f3a3e1478f0df',20),('75e1e02550a611eca47a645d86dd6e62','2021-11-25','2021-11-25 07:03:37.000000','2021-11-25','07:03:37.000000',47,3,'','0','0',11,'ca58363ee5e747fa86267ae2c5cdcfc0',324),('75e1e02650a611ecb8eb645d86dd6e62','2021-11-25','2021-11-25 16:27:32.000000','2021-11-25','16:27:32.000000',47,3,'','1','1',11,'ca58363ee5e747fa86267ae2c5cdcfc0',329),('767518d850a611ec9637645d86dd6e62','2021-11-25','2021-11-25 07:02:45.000000','2021-11-25','07:02:45.000000',47,3,'','0','0',2,'ca4ccebccc474908a6343e9f74ca50ae',315),('767518d950a611ecb816645d86dd6e62','2021-11-25','2021-11-25 16:27:34.000000','2021-11-25','16:27:34.000000',47,3,'','1','1',2,'ca4ccebccc474908a6343e9f74ca50ae',330),('7744a6bf50a611ecb25d645d86dd6e62','2021-11-25','2021-11-25 07:02:54.000000','2021-11-25','07:02:54.000000',47,3,'','0','0',1,'4aeed5daa7764c3a9781700564a68c2c',316),('7744a6c050a611eca111645d86dd6e62','2021-11-25','2021-11-25 16:27:36.000000','2021-11-25','16:27:36.000000',47,3,'','1','1',1,'4aeed5daa7764c3a9781700564a68c2c',331),('77de020150a611ec8b40645d86dd6e62','2021-11-25','2021-11-25 07:02:56.000000','2021-11-25','07:02:56.000000',47,3,'','0','0',3,'cdddca17103149189caad71078bb57bf',317),('77de020250a611eca98b645d86dd6e62','2021-11-25','2021-11-25 16:27:38.000000','2021-11-25','16:27:38.000000',47,3,'','1','1',3,'cdddca17103149189caad71078bb57bf',332),('781e170750a611ec89e2645d86dd6e62','2021-11-25','2021-11-25 07:02:58.000000','2021-11-25','07:02:58.000000',47,3,'','0','0',4,'bda5ffdffd0c436fb720c6a2e206e48a',318),('781e170850a611eca8cb645d86dd6e62','2021-11-25','2021-11-25 16:27:40.000000','2021-11-25','16:27:40.000000',47,3,'','1','1',4,'bda5ffdffd0c436fb720c6a2e206e48a',333),('7840256550a611ec9aaf645d86dd6e62','2021-11-25','2021-11-25 07:03:07.000000','2021-11-25','07:03:07.000000',47,3,'','0','0',5,'b00ba0ca1bde404dbd4f2819a280d507',319),('7840256650a611ecaa5f645d86dd6e62','2021-11-25','2021-11-25 16:27:41.000000','2021-11-25','16:27:41.000000',47,3,'','1','1',5,'b00ba0ca1bde404dbd4f2819a280d507',334),('7b2b57a950a611ecafa6645d86dd6e62','2021-11-26','2021-11-26 07:05:57.000000','2021-11-26','07:05:57.000000',47,4,'','0','0',2,'794c1659f9ee408b8a7ab7247d2c28c0',337),('7b2b57aa50a611eca1e8645d86dd6e62','2021-11-26','2021-11-26 18:09:42.000000','2021-11-26','18:09:42.000000',47,4,'','1','1',2,'794c1659f9ee408b8a7ab7247d2c28c0',346),('7bc2684d50a611ecb265645d86dd6e62','2021-11-26','2021-11-26 07:05:48.000000','2021-11-26','07:05:48.000000',47,4,'','0','0',1,'ef7cf0c71d9d4212a19125006bebbff3',335),('7bc3ef1c50a611ecb25e645d86dd6e62','2021-11-26','2021-11-26 18:09:45.000000','2021-11-26','18:09:45.000000',47,4,'','1','1',1,'ef7cf0c71d9d4212a19125006bebbff3',347),('7bd066f7484b11ec9df2645d86dd6e62','2021-11-18','2021-11-18 07:09:11.000000','2021-11-18','07:09:11.000000',46,3,'','0','0',2,'72111f9ddddb4e62a5d40928687bead3',189),('7bd066f8484b11ecb5dd645d86dd6e62','2021-11-18','2021-11-18 16:42:36.000000','2021-11-18','16:42:36.000000',46,3,'','1','1',2,'72111f9ddddb4e62a5d40928687bead3',249),('7bf2d24c50a611ec9f6e645d86dd6e62','2021-11-26','2021-11-26 07:05:58.000000','2021-11-26','07:05:58.000000',47,4,'','0','0',3,'96a0321ee9c64ab3af64852b54e8d6e5',338),('7bf2f95450a611ecbb07645d86dd6e62','2021-11-26','2021-11-26 18:09:47.000000','2021-11-26','18:09:47.000000',47,4,'','1','1',3,'96a0321ee9c64ab3af64852b54e8d6e5',348),('7bfc640550a611ec8fab645d86dd6e62','2021-11-26','2021-11-26 07:06:03.000000','2021-11-26','07:06:03.000000',47,4,'','0','0',4,'4c9801f9234949a48e4a312dd35a1441',339),('7bfc640650a611eca371645d86dd6e62','2021-11-26','2021-11-26 18:09:49.000000','2021-11-26','18:09:49.000000',47,4,'','1','1',4,'4c9801f9234949a48e4a312dd35a1441',349),('7c7368e050a611ecb77b645d86dd6e62','2021-11-26','2021-11-26 07:06:05.000000','2021-11-26','07:06:05.000000',47,4,'','0','0',5,'553ccdeaf14b4f33a01167d8c5fd0fb8',340),('7c7368e150a611eca2c9645d86dd6e62','2021-11-26','2021-11-26 18:09:56.000000','2021-11-26','18:09:56.000000',47,4,'','1','1',5,'553ccdeaf14b4f33a01167d8c5fd0fb8',350),('7cc44d4c50a611ecacac645d86dd6e62','2021-11-26','2021-11-26 07:06:08.000000','2021-11-26','07:06:08.000000',47,4,'','0','0',6,'07f132f1f85344c5bd142320e4451932',341),('7cc44d4d50a611ec8b01645d86dd6e62','2021-11-26','2021-11-26 18:09:59.000000','2021-11-26','18:09:59.000000',47,4,'','1','1',6,'07f132f1f85344c5bd142320e4451932',351),('7d22e5dc50a611ec8101645d86dd6e62','2021-11-26','2021-11-26 07:06:10.000000','2021-11-26','07:06:10.000000',47,4,'','0','0',7,'ecd1ae1ddeb149a6a0ce497e5a9e5392',342),('7d22e5dd50a611ec9210645d86dd6e62','2021-11-26','2021-11-26 18:10:01.000000','2021-11-26','18:10:01.000000',47,4,'','1','1',7,'ecd1ae1ddeb149a6a0ce497e5a9e5392',352),('7d2900f950a611ec8467645d86dd6e62','2021-11-26','2021-11-26 07:06:12.000000','2021-11-26','07:06:12.000000',47,4,'','0','0',8,'a95257c376af49b0a563199083367f8e',343),('7d2900fa50a611ec9632645d86dd6e62','2021-11-26','2021-11-26 18:10:03.000000','2021-11-26','18:10:03.000000',47,4,'','1','1',8,'a95257c376af49b0a563199083367f8e',353),('7d924b9550a611ecafb1645d86dd6e62','2021-11-26','2021-11-26 07:06:14.000000','2021-11-26','07:06:14.000000',47,4,'','0','0',9,'793f481b10664b089d37f3f10e7ebdd0',344),('7d924b9650a611ec9b32645d86dd6e62','2021-11-26','2021-11-26 18:10:05.000000','2021-11-26','18:10:05.000000',47,4,'','1','1',9,'793f481b10664b089d37f3f10e7ebdd0',354),('7d9f7b0050a611eca66d645d86dd6e62','2021-11-26','2021-11-26 07:06:17.000000','2021-11-26','07:06:17.000000',47,4,'','0','0',11,'9e6b97a537794d9b96916d91a0fe37b0',345),('7d9f7b0150a611ec8f15645d86dd6e62','2021-11-26','2021-11-26 18:10:07.000000','2021-11-26','18:10:07.000000',47,4,'','1','1',11,'9e6b97a537794d9b96916d91a0fe37b0',355),('7de075e650a611eca150645d86dd6e62','2021-11-29','2021-11-29 06:59:59.000000','2021-11-29','06:59:59.000000',48,0,'','0','0',2,'f031d92d223f40d5a1adafae8a02e9b7',356),('7df874e650a611ecbf58645d86dd6e62','2021-11-29','2021-11-29 07:00:02.000000','2021-11-29','07:00:02.000000',48,0,'','0','0',1,'fa8991279783497f9fc3f6413bd4b91e',357),('7e1f8e1350a611ecb94b645d86dd6e62','2021-11-29','2021-11-29 07:00:04.000000','2021-11-29','07:00:04.000000',48,0,'','0','0',3,'9959593b21f042e0843ca543a8327bd1',358),('7e4d1ae450a611ec8285645d86dd6e62','2021-11-29','2021-11-29 07:00:06.000000','2021-11-29','07:00:06.000000',48,0,'','0','0',4,'758cbbf77d3d43e0bec708441e53d612',359),('7ebd593150a611ec931e645d86dd6e62','2021-11-29','2021-11-29 07:00:09.000000','2021-11-29','07:00:09.000000',48,0,'','0','0',5,'49e2cf2e88934575a16b128355b19b5a',360),('7ee5050d50a611ecb2a2645d86dd6e62','2021-11-29','2021-11-29 07:00:11.000000','2021-11-29','07:00:11.000000',48,0,'','0','0',6,'5ab429dd1a294d259e992bfa8800edc9',361),('7f3152e750a611ec82d6645d86dd6e62','2021-11-29','2021-11-29 07:00:13.000000','2021-11-29','07:00:13.000000',48,0,'','0','0',7,'45f02114dd3340bdb9f717606610222f',362),('7f4af5e350a611ecb4e2645d86dd6e62','2021-11-29','2021-11-29 07:00:16.000000','2021-11-29','07:00:16.000000',48,0,'','0','0',8,'605c545dc42b4560a045436ea8cca701',363),('7f6cd4e750a611ec9f03645d86dd6e62','2021-11-29','2021-11-29 07:00:18.000000','2021-11-29','07:00:18.000000',48,0,'','0','0',9,'a79b76ad24e847749f8ae3a7ed67b334',364),('7f88977750a611ec8d9b645d86dd6e62','2021-11-29','2021-11-29 07:00:21.000000','2021-11-29','07:00:21.000000',48,0,'','0','0',11,'53c4d2d369dc4df4a85a2baf5df2c03e',365),('80b3d0a54ccc11ec8d4c645d86dd6e62','2021-11-22','2021-11-22 07:16:14.000000','2021-11-22','07:16:14.000000',47,0,'','0','0',2,'793839fa6911449ca005d2981ce6e321',258),('80b894a84ccc11ec9a51645d86dd6e62','2021-11-22','2021-11-22 16:11:42.000000','2021-11-22','16:11:42.000000',47,0,'','1','1',2,'793839fa6911449ca005d2981ce6e321',266),('80d0a90e4ccc11ecbb6a645d86dd6e62','2021-11-22','2021-11-22 07:16:19.000000','2021-11-22','07:16:19.000000',47,0,'','0','0',3,'782a5a9a66784bcdb82ddf5c035a5736',260),('80d0a90f4ccc11eca8dd645d86dd6e62','2021-11-22','2021-11-22 16:11:45.000000','2021-11-22','16:11:45.000000',47,0,'','1','1',3,'782a5a9a66784bcdb82ddf5c035a5736',268),('80f5664d4ccc11ec9b8b645d86dd6e62','2021-11-22','2021-11-22 16:11:47.000000','2021-11-22','16:11:47.000000',47,0,'','1','0',4,'b594e3f6cf53438b8d27113e5a53dd4b',269),('820077c34ccc11ecb202645d86dd6e62','2021-11-22','2021-11-22 16:11:50.000000','2021-11-22','16:11:50.000000',47,0,'','1','0',5,'7791cdfa8aa1418caff7bd05e600a818',270),('8263a5a84ccc11ecaaa7645d86dd6e62','2021-11-22','2021-11-22 08:05:12.000000','2021-11-22','08:05:12.000000',47,0,'','1','0',6,'3222850f7c5a41189032765e31a48653',261),('8263a5a94ccc11ec8a65645d86dd6e62','2021-11-22','2021-11-22 16:11:53.000000','2021-11-22','16:11:53.000000',47,0,'','1','1',6,'3222850f7c5a41189032765e31a48653',271),('82a3bba64ccc11ec87f3645d86dd6e62','2021-11-22','2021-11-22 08:05:14.000000','2021-11-22','08:05:14.000000',47,0,'','1','0',7,'41d480089ea84926a1eb3b9f3e5a4a39',262),('82a3bba74ccc11ec8c08645d86dd6e62','2021-11-22','2021-11-22 16:11:55.000000','2021-11-22','16:11:55.000000',47,0,'','1','1',7,'41d480089ea84926a1eb3b9f3e5a4a39',272),('82d7703b4ccc11ec9725645d86dd6e62','2021-11-22','2021-11-22 08:05:17.000000','2021-11-22','08:05:17.000000',47,0,'','1','0',8,'1c07f34559364523b55aec3c018ccc07',263),('82d7703c4ccc11ec9690645d86dd6e62','2021-11-22','2021-11-22 16:11:56.000000','2021-11-22','16:11:56.000000',47,0,'','1','1',8,'1c07f34559364523b55aec3c018ccc07',273),('833e818c4ccc11eca30c645d86dd6e62','2021-11-22','2021-11-22 08:05:21.000000','2021-11-22','08:05:21.000000',47,0,'','1','0',9,'415f9016123a428dae3ca2c1941aee3c',264),('833e818d4ccc11ecbd2a645d86dd6e62','2021-11-22','2021-11-22 16:11:58.000000','2021-11-22','16:11:58.000000',47,0,'','1','1',9,'415f9016123a428dae3ca2c1941aee3c',274),('867927714ccc11ec9db5645d86dd6e62','2021-11-23','2021-11-23 07:06:19.000000','2021-11-23','07:06:19.000000',47,1,'','0','0',2,'dd5769f709144c749bfa48037170c82e',275),('867927724ccc11ec8b4c645d86dd6e62','2021-11-23','2021-11-23 16:35:04.000000','2021-11-23','16:35:04.000000',47,1,'','1','1',2,'dd5769f709144c749bfa48037170c82e',285),('87005a994ccc11ecb42a645d86dd6e62','2021-11-23','2021-11-23 07:06:21.000000','2021-11-23','07:06:21.000000',47,1,'','0','0',1,'9742f3bd36284213b86f4008390274a0',276),('87005a9a4ccc11ecb1a9645d86dd6e62','2021-11-23','2021-11-23 16:35:07.000000','2021-11-23','16:35:07.000000',47,1,'','1','1',1,'9742f3bd36284213b86f4008390274a0',286),('875084a34ccc11ec8bd1645d86dd6e62','2021-11-23','2021-11-23 07:06:23.000000','2021-11-23','07:06:23.000000',47,1,'','0','0',3,'2b8cc78828274502b77f51d002b10e71',277),('8750abae4ccc11ec9651645d86dd6e62','2021-11-23','2021-11-23 16:35:10.000000','2021-11-23','16:35:10.000000',47,1,'','1','1',3,'2b8cc78828274502b77f51d002b10e71',287),('875f75aa4ccc11eca393645d86dd6e62','2021-11-23','2021-11-23 07:06:26.000000','2021-11-23','07:06:26.000000',47,1,'','0','0',4,'ebe0dd545bbf488a882bfcb7a8db90ab',278),('875f75ab4ccc11ecaac4645d86dd6e62','2021-11-23','2021-11-23 16:35:15.000000','2021-11-23','16:35:15.000000',47,1,'','1','1',4,'ebe0dd545bbf488a882bfcb7a8db90ab',288),('87a54aff4ccc11ecaea4645d86dd6e62','2021-11-23','2021-11-23 07:06:28.000000','2021-11-23','07:06:28.000000',47,1,'','0','0',5,'d9c6453974af49b08a0cf6f3876b1645',279),('87a54b004ccc11ecbdc8645d86dd6e62','2021-11-23','2021-11-23 16:35:19.000000','2021-11-23','16:35:19.000000',47,1,'','1','1',5,'d9c6453974af49b08a0cf6f3876b1645',289),('883bb1254ccc11ecba18645d86dd6e62','2021-11-23','2021-11-23 07:06:31.000000','2021-11-23','07:06:31.000000',47,1,'','0','0',6,'4c3e6144950b41899588eb52337d8f01',280),('883bb1264ccc11ec81a7645d86dd6e62','2021-11-23','2021-11-23 16:35:21.000000','2021-11-23','16:35:21.000000',47,1,'','1','1',6,'4c3e6144950b41899588eb52337d8f01',290),('88e12f874ccc11ec8c8d645d86dd6e62','2021-11-23','2021-11-23 07:06:33.000000','2021-11-23','07:06:33.000000',47,1,'','0','0',7,'1727666f22334c818d226fb402a54935',281),('88e157464ccc11ecb4a9645d86dd6e62','2021-11-23','2021-11-23 16:35:23.000000','2021-11-23','16:35:23.000000',47,1,'','1','1',7,'1727666f22334c818d226fb402a54935',291),('88ea70b04ccc11ec9088645d86dd6e62','2021-11-23','2021-11-23 07:06:35.000000','2021-11-23','07:06:35.000000',47,1,'','0','0',8,'153ba675e0974fb09ba1cc1dad74346f',282),('88ea70b14ccc11ecbcd4645d86dd6e62','2021-11-23','2021-11-23 16:35:25.000000','2021-11-23','16:35:25.000000',47,1,'','1','1',8,'153ba675e0974fb09ba1cc1dad74346f',292),('8939d2a74ccc11ecb0bd645d86dd6e62','2021-11-23','2021-11-23 07:06:38.000000','2021-11-23','07:06:38.000000',47,1,'','0','0',9,'5c4aac02db9e423a805f7cd132d7ead6',283),('8939d2a84ccc11ecb296645d86dd6e62','2021-11-23','2021-11-23 16:35:27.000000','2021-11-23','16:35:27.000000',47,1,'','1','1',9,'5c4aac02db9e423a805f7cd132d7ead6',293),('8994e6c74ccc11ecbe84645d86dd6e62','2021-11-23','2021-11-23 07:06:40.000000','2021-11-23','07:06:40.000000',47,1,'','0','0',11,'a87d8856b91f48608f20730470c70efa',284),('8994e6c84ccc11ec8401645d86dd6e62','2021-11-23','2021-11-23 16:35:30.000000','2021-11-23','16:35:30.000000',47,1,'','1','1',11,'a87d8856b91f48608f20730470c70efa',294),('9a004cb1427d11ecb969645d86dd6e62','2021-11-11','2021-11-11 07:21:09.000000','2021-11-11','07:21:09.000000',45,3,'','0','0',5,'b70e6fe7de944aa3aae0c5d682ad360e',92),('a305186341f811ecb04c645d86dd6e62','2021-11-10','2021-11-10 07:14:54.000000','2021-11-10','07:14:54.000000',45,2,'','0','0',1,'896e7b8188084677b7c7bb27ea4f5446',21),('a305186441f811ecbe2e645d86dd6e62','2021-11-10','2021-11-10 15:34:34.000000','2021-11-10','15:34:34.000000',45,2,'','1','1',1,'896e7b8188084677b7c7bb27ea4f5446',86),('a3a78e6341f811ecb0fe645d86dd6e62','2021-11-10','2021-11-10 07:14:57.000000','2021-11-10','07:14:57.000000',45,2,'','0','0',2,'d5dd6cde445a4bf997846f5a38087123',22),('a3a78e6441f811ec87ea645d86dd6e62','2021-11-10','2021-11-10 15:34:37.000000','2021-11-10','15:34:37.000000',45,2,'','1','1',2,'d5dd6cde445a4bf997846f5a38087123',87),('a538a17f434a11ecb35e645d86dd6e62','2021-11-12','2021-11-12 07:02:13.000000','2021-11-12','07:02:13.000000',45,4,'','0','0',2,'4efdafd00c2541d3b6946c3bb246d16c',117),('a580e544434a11ec9ef2645d86dd6e62','2021-11-12','2021-11-12 07:02:15.000000','2021-11-12','07:02:15.000000',45,4,'','0','0',1,'f920b850464246c7a94fe71f1abdf22b',118),('a591e98f434a11ec92c6645d86dd6e62','2021-11-12','2021-11-12 07:02:16.000000','2021-11-12','07:02:16.000000',45,4,'','0','0',3,'603c85894be441da949817493f46e32e',119),('a75dee0d434a11ec9927645d86dd6e62','2021-11-12','2021-11-12 07:02:20.000000','2021-11-12','07:02:20.000000',45,4,'','0','0',5,'19d48a80d17a495f9b2409eb441d16a8',121),('a774c2c8434a11eca381645d86dd6e62','2021-11-12','2021-11-12 07:02:22.000000','2021-11-12','07:02:22.000000',45,4,'','0','0',6,'c7c53bf52df748da877d51e04e3e04f5',122),('a822c8a4434a11ec8a69645d86dd6e62','2021-11-12','2021-11-12 07:02:24.000000','2021-11-12','07:02:24.000000',45,4,'','0','0',7,'3d778dfc85114efb890043a924442e98',123),('a847e7ae434a11ec9d47645d86dd6e62','2021-11-12','2021-11-12 07:02:26.000000','2021-11-12','07:02:26.000000',45,4,'','0','0',8,'c5c680a9a7674e768ff7ba126ee786da',124),('a8c7476d434a11ecac94645d86dd6e62','2021-11-12','2021-11-12 07:02:28.000000','2021-11-12','07:02:28.000000',45,4,'','0','0',9,'3ee639bef6aa491d9841f1228e913073',125),('b51fa37541e411ecbd7b645d86dd6e62','2021-11-10','2021-11-10 07:15:06.000000','2021-11-10','07:15:06.000000',45,2,'','0','0',5,'71b62fbb31234467ad0206be7d3c3bfe',25),('b51fa37641e411ec9c2e645d86dd6e62','2021-11-10','2021-11-10 13:11:55.000000','2021-11-10','13:11:55.000000',45,2,'','1','1',5,'71b62fbb31234467ad0206be7d3c3bfe',71),('b5253e07484b11ec8194645d86dd6e62','2021-11-18','2021-11-18 07:09:16.000000','2021-11-18','07:09:16.000000',46,3,'','0','0',3,'916496b489fe477d9d4ef38353a403da',191),('b5253e08484b11ecbf72645d86dd6e62','2021-11-18','2021-11-18 16:44:12.000000','2021-11-18','16:44:12.000000',46,3,'','1','1',3,'916496b489fe477d9d4ef38353a403da',250),('b8428b2d41e411ec8fe7645d86dd6e62','2021-11-10','2021-11-10 09:54:47.000000','2021-11-10','09:54:47.000000',45,2,'','0','0',10,'03d222c7da7c4bfaab689976d9f7a134',62),('b8428b2e41e411ecb6ca645d86dd6e62','2021-11-10','2021-11-10 13:11:58.000000','2021-11-10','13:11:58.000000',45,2,'','1','1',10,'03d222c7da7c4bfaab689976d9f7a134',72),('b995a04d41e411eca035645d86dd6e62','2021-11-10','2021-11-10 09:54:44.000000','2021-11-10','09:54:44.000000',45,2,'','0','0',9,'bdeeafc6bd374e669cd62f7208960a08',61),('b995a04e41e411eca49a645d86dd6e62','2021-11-10','2021-11-10 13:12:01.000000','2021-11-10','13:12:01.000000',45,2,'','1','1',9,'bdeeafc6bd374e669cd62f7208960a08',73),('ba98510b41e411ecad84645d86dd6e62','2021-11-10','2021-11-10 09:54:39.000000','2021-11-10','09:54:39.000000',45,2,'','0','0',7,'8481f07c68c24059b4700d03d825c35f',59),('ba98510c41e411eca4b8645d86dd6e62','2021-11-10','2021-11-10 13:12:04.000000','2021-11-10','13:12:04.000000',45,2,'','1','1',7,'8481f07c68c24059b4700d03d825c35f',74),('bb7de10d41e411ec9163645d86dd6e62','2021-11-10','2021-11-10 09:54:42.000000','2021-11-10','09:54:42.000000',45,2,'','0','0',8,'0f334823fc4d44769765014f35bb0e6c',60),('bb7de10e41e411ec8da0645d86dd6e62','2021-11-10','2021-11-10 13:12:06.000000','2021-11-10','13:12:06.000000',45,2,'','1','1',8,'0f334823fc4d44769765014f35bb0e6c',75),('bcb4d82741e411ec824d645d86dd6e62','2021-11-10','2021-11-10 09:54:24.000000','2021-11-10','09:54:24.000000',45,2,'','5','0',6,'005dab7d829a45baa4a65a97443af2d0',57),('bcb4d82841e411ecb565645d86dd6e62','2021-11-10','2021-11-10 13:12:08.000000','2021-11-10','13:12:08.000000',45,2,'','1','1',6,'005dab7d829a45baa4a65a97443af2d0',76),('bf601337484b11ec8397645d86dd6e62','2021-11-18','2021-11-18 07:09:19.000000','2021-11-18','07:09:19.000000',46,3,'','0','0',4,'3e14ce9ef63542f4b563efed5ff5d820',192),('bf601338484b11ecb644645d86dd6e62','2021-11-18','2021-11-18 16:44:29.000000','2021-11-18','16:44:29.000000',46,3,'','1','1',4,'3e14ce9ef63542f4b563efed5ff5d820',251),('c018b7af484b11ecb255645d86dd6e62','2021-11-18','2021-11-18 07:09:22.000000','2021-11-18','07:09:22.000000',46,3,'','0','0',5,'4d35a8480d844631ac6c8b7df7e55c97',193),('c018b7b0484b11eca383645d86dd6e62','2021-11-18','2021-11-18 16:44:31.000000','2021-11-18','16:44:31.000000',46,3,'','1','1',5,'4d35a8480d844631ac6c8b7df7e55c97',252),('c171bdf7484b11ecbe60645d86dd6e62','2021-11-18','2021-11-18 07:09:25.000000','2021-11-18','07:09:25.000000',46,3,'','0','0',6,'f2163a57a5e24bb9b177f2541954ba86',194),('c171bdf8484b11ecb3c7645d86dd6e62','2021-11-18','2021-11-18 16:44:33.000000','2021-11-18','16:44:33.000000',46,3,'','1','1',6,'f2163a57a5e24bb9b177f2541954ba86',253),('c294f60b484b11ec861d645d86dd6e62','2021-11-18','2021-11-18 07:09:27.000000','2021-11-18','07:09:27.000000',46,3,'','0','0',7,'0d1c1dbad5644f23be6490ce3323e25a',195),('c294f60c484b11eca486645d86dd6e62','2021-11-18','2021-11-18 16:44:36.000000','2021-11-18','16:44:36.000000',46,3,'','1','1',7,'0d1c1dbad5644f23be6490ce3323e25a',254),('c4b12a5a484b11ec80b6645d86dd6e62','2021-11-18','2021-11-18 07:09:29.000000','2021-11-18','07:09:29.000000',46,3,'','0','0',8,'2913bb855af14828956fb3ab8e7a19a6',196),('c4b2a6a2484b11ecb25a645d86dd6e62','2021-11-18','2021-11-18 16:44:38.000000','2021-11-18','16:44:38.000000',46,3,'','1','1',8,'2913bb855af14828956fb3ab8e7a19a6',255),('c5e2585b484b11ec92d0645d86dd6e62','2021-11-18','2021-11-18 07:09:32.000000','2021-11-18','07:09:32.000000',46,3,'','0','0',9,'ba9b17527d384ced8a5e5e1d99fea861',197),('c5e2585c484b11ec89c5645d86dd6e62','2021-11-18','2021-11-18 16:44:41.000000','2021-11-18','16:44:41.000000',46,3,'','1','1',9,'ba9b17527d384ced8a5e5e1d99fea861',256),('c71cb125484b11ecbc36645d86dd6e62','2021-11-18','2021-11-18 07:09:34.000000','2021-11-18','07:09:34.000000',46,3,'','0','0',11,'6b52036632fd4c1e93afd232f938defe',198),('c71cb126484b11ecb050645d86dd6e62','2021-11-18','2021-11-18 16:44:43.000000','2021-11-18','16:44:43.000000',46,3,'','1','1',11,'6b52036632fd4c1e93afd232f938defe',257),('d0595f68437411ecbecb645d86dd6e62','2021-11-12','2021-11-12 07:02:18.000000','2021-11-12','07:02:18.000000',45,4,'','0','0',4,'cd0b9e2a942541f6a22099224c528653',120),('d069b230437411ecbff5645d86dd6e62','2021-11-12','2021-11-12 12:55:50.000000','2021-11-12','12:55:50.000000',45,4,'','1','1',4,'cd0b9e2a942541f6a22099224c528653',130),('dc90fe0942a911ec86bf645d86dd6e62','2021-11-11','2021-11-11 07:21:24.000000','2021-11-11','07:21:24.000000',45,3,'','0','0',10,'f771d2db94f9468ab57e8ff8f8c195fc',97),('dc955f4c42a911ecb1fd645d86dd6e62','2021-11-11','2021-11-11 12:42:55.000000','2021-11-11','12:42:55.000000',45,3,'','5','1',10,'f771d2db94f9468ab57e8ff8f8c195fc',103),('e2ac1ac74b2411eca47a645d86dd6e62','2021-11-22','2021-11-22 07:16:17.000000','2021-11-22','07:16:17.000000',47,0,'','0','0',1,'a33572ba2b2a470ea5e48dea07cf5860',259),('e41f621f4b2711ec859b645d86dd6e62','2021-11-22','2021-11-22 08:05:23.000000','2021-11-22','08:05:23.000000',47,0,'','1','0',11,'aa082fb572664f1c9a0205e8a41df7f2',265),('f29e5c43434d11eca1ef645d86dd6e62','2021-11-12','2021-11-12 07:02:30.000000','2021-11-12','07:02:30.000000',45,4,'','0','0',11,'019994e6fa81456a8fdd0bf87aafb87e',126),('f29e5c44434d11ecb638645d86dd6e62','2021-11-12','2021-11-12 08:17:41.000000','2021-11-12','08:17:41.000000',45,4,'','4','1',11,'019994e6fa81456a8fdd0bf87aafb87e',128);
/*!40000 ALTER TABLE `att_payloadeffectpunch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_payloadexception`
--

DROP TABLE IF EXISTS `att_payloadexception`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_payloadexception` (
  `uuid` varchar(36) NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `duration` int(11) DEFAULT NULL,
  `days` double DEFAULT NULL,
  `data_type` smallint(6) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `skd_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `att_payloadexception_item_id_a08bfe48_fk_att_leave` (`item_id`),
  KEY `att_payloadexception_skd_id_b2e9ecaa` (`skd_id`),
  CONSTRAINT `att_payloadexception_item_id_a08bfe48_fk_att_leave` FOREIGN KEY (`item_id`) REFERENCES `att_leave` (`workflowinstance_ptr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_payloadexception`
--

LOCK TABLES `att_payloadexception` WRITE;
/*!40000 ALTER TABLE `att_payloadexception` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_payloadexception` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_payloadmulpunchset`
--

DROP TABLE IF EXISTS `att_payloadmulpunchset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_payloadmulpunchset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `timetable_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `att_payloadmulpunchset_emp_id_f47610c8_fk_personnel_employee_id` (`emp_id`),
  KEY `att_payloadmulpunchset_timetable_id_9a439a09` (`timetable_id`),
  CONSTRAINT `att_payloadmulpunchset_emp_id_f47610c8_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_payloadmulpunchset`
--

LOCK TABLES `att_payloadmulpunchset` WRITE;
/*!40000 ALTER TABLE `att_payloadmulpunchset` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_payloadmulpunchset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_payloadovertime`
--

DROP TABLE IF EXISTS `att_payloadovertime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_payloadovertime` (
  `uuid` varchar(36) NOT NULL,
  `normal_wt` int(11) DEFAULT NULL,
  `normal_ot` int(11) DEFAULT NULL,
  `weekend_ot` int(11) DEFAULT NULL,
  `holiday_ot` int(11) DEFAULT NULL,
  `ot_lv1` int(11) DEFAULT NULL,
  `ot_lv2` int(11) DEFAULT NULL,
  `ot_lv3` int(11) DEFAULT NULL,
  `total_ot` int(11) DEFAULT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_payloadovertime`
--

LOCK TABLES `att_payloadovertime` WRITE;
/*!40000 ALTER TABLE `att_payloadovertime` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_payloadovertime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_payloadparing`
--

DROP TABLE IF EXISTS `att_payloadparing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `time_card_id` char(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `att_payloadparing_emp_id_c5daac4f_fk_personnel_employee_id` (`emp_id`),
  KEY `att_payloadparing_in_trans_id_50a8040e_fk_iclock_transaction_id` (`in_trans_id`),
  KEY `att_payloadparing_out_trans_id_8b2375b9_fk_iclock_transaction_id` (`out_trans_id`),
  KEY `att_payloadparing_pay_code_id_aa241cca_fk_att_paycode_id` (`pay_code_id`),
  KEY `att_payloadparing_att_date_5daaa45d` (`att_date`),
  KEY `att_payloadparing_time_card_id_3adc3517` (`time_card_id`),
  CONSTRAINT `att_payloadparing_emp_id_c5daac4f_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `att_payloadparing_in_trans_id_50a8040e_fk_iclock_transaction_id` FOREIGN KEY (`in_trans_id`) REFERENCES `iclock_transaction` (`id`),
  CONSTRAINT `att_payloadparing_out_trans_id_8b2375b9_fk_iclock_transaction_id` FOREIGN KEY (`out_trans_id`) REFERENCES `iclock_transaction` (`id`),
  CONSTRAINT `att_payloadparing_pay_code_id_aa241cca_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_payloadparing`
--

LOCK TABLES `att_payloadparing` WRITE;
/*!40000 ALTER TABLE `att_payloadparing` DISABLE KEYS */;
INSERT INTO `att_payloadparing` VALUES ('07be39fa484911ec9079645d86dd6e62',1637223901,'2021-11-18',46,3,1,'2021-11-18 07:09:13.000000','2021-11-18','07:09:13.000000','2021-11-18 16:25:01.000000','2021-11-18','16:25:01.000000',33348,0,1,0.8,1,190,243,NULL,'f0bb0a63d3464be28c0090fc43c2f0be'),('0f759d4841f411ec9cd0645d86dd6e62',1636527709,'2021-11-10',45,2,1,'2021-11-10 07:14:59.000000','2021-11-10','07:14:59.000000','2021-11-10 15:01:49.000000','2021-11-10','15:01:49.000000',28010,0,1,0.6,3,23,84,NULL,'de8fd22cb4104f79ab68e3e85bb35d27'),('144895f6412611ecb335645d86dd6e62',1636439232,'2021-11-09',45,1,1,'2021-11-09 14:27:12.000000','2021-11-09','14:27:12.000000',NULL,NULL,NULL,0,0,1,0.0,2,4,NULL,NULL,'31ce892242ac4732b3798b9820ace701'),('157c8cd2412611ec845b645d86dd6e62',1636439235,'2021-11-09',45,1,1,'2021-11-09 14:27:15.000000','2021-11-09','14:27:15.000000',NULL,NULL,NULL,0,0,1,0.0,3,5,NULL,NULL,'fca638b619fb40d1914b19ae48a7b208'),('16af8c9e412611eca8d9645d86dd6e62',1636439236,'2021-11-09',45,1,1,'2021-11-09 14:27:16.000000','2021-11-09','14:27:16.000000',NULL,NULL,NULL,0,0,1,0.0,4,6,NULL,NULL,'99a4a4e0ff81423da17c2340b8cdf3db'),('18ab17e2412611ec9fa4645d86dd6e62',1636439239,'2021-11-09',45,1,1,'2021-11-09 14:27:19.000000','2021-11-09','14:27:19.000000',NULL,NULL,NULL,0,0,1,0.0,10,7,NULL,NULL,'1360aa7da9e34cedb8d47acdcac25663'),('19de5c7a412611ec8699645d86dd6e62',1636439242,'2021-11-09',45,1,1,'2021-11-09 14:27:22.000000','2021-11-09','14:27:22.000000',NULL,NULL,NULL,0,0,1,0.0,8,8,NULL,NULL,'f4d1002f964240cdb47105004b4c146e'),('1c4439f4412611ec8c78645d86dd6e62',1636439246,'2021-11-09',45,1,1,'2021-11-09 14:27:26.000000','2021-11-09','14:27:26.000000',NULL,NULL,NULL,0,0,1,0.0,9,9,NULL,NULL,'61dd3941109245f9a5b49727a85bc0ef'),('1ddf82f8412611ec9b61645d86dd6e62',1636439248,'2021-11-09',45,1,1,'2021-11-09 14:27:28.000000','2021-11-09','14:27:28.000000',NULL,NULL,NULL,0,0,1,0.0,7,10,NULL,NULL,'cae9c07fdd1745679744a8b8f56acaeb'),('1f128dfa412611ecbd24645d86dd6e62',1636439250,'2021-11-09',45,1,1,'2021-11-09 14:27:30.000000','2021-11-09','14:27:30.000000',NULL,NULL,NULL,0,0,1,0.0,6,11,NULL,NULL,'2beccc8862d8402689d2025f67e850ab'),('2c7cff1a45ea11ec8825645d86dd6e62',1636963261,'2021-11-15',46,0,1,'2021-11-15 07:13:10.000000','2021-11-15','07:13:10.000000','2021-11-15 16:01:01.000000','2021-11-15','16:01:01.000000',31671,0,1,0.7,1,132,161,NULL,'71e55377d17441078205a15f417265c6'),('2ec8a4a845ea11ecba5d645d86dd6e62',1636963265,'2021-11-15',46,0,1,'2021-11-15 07:13:12.000000','2021-11-15','07:13:12.000000','2021-11-15 16:01:05.000000','2021-11-15','16:01:05.000000',31673,0,1,0.7,3,133,162,NULL,'254a84a1e92c438ca052be923aca2a13'),('312de0a445ea11ec8c77645d86dd6e62',1636963268,'2021-11-15',46,0,1,'2021-11-15 07:13:14.000000','2021-11-15','07:13:14.000000','2021-11-15 16:01:08.000000','2021-11-15','16:01:08.000000',31674,0,1,0.7,4,134,163,NULL,'fabb79d9917c4899b973b547429d67fb'),('3397dec645ea11ec9c7a645d86dd6e62',1636963273,'2021-11-15',46,0,1,'2021-11-15 07:13:22.000000','2021-11-15','07:13:22.000000','2021-11-15 16:01:13.000000','2021-11-15','16:01:13.000000',31671,0,1,0.7,6,136,164,NULL,'8b18795b41e2417f94312bd72b2592b6'),('35eaed9c45ea11eca310645d86dd6e62',1636963276,'2021-11-15',46,0,1,'2021-11-15 07:13:28.000000','2021-11-15','07:13:28.000000','2021-11-15 16:01:16.000000','2021-11-15','16:01:16.000000',31668,0,1,0.7,9,139,165,NULL,'d53ab4dc98aa4293a4c0c570bffcba8e'),('38a36aa846b511eca2db645d86dd6e62',1637050461,'2021-11-16',46,1,1,'2021-11-16 07:02:53.000000','2021-11-16','07:02:53.000000','2021-11-16 16:14:21.000000','2021-11-16','16:14:21.000000',33088,0,1,0.8,1,175,179,NULL,'f53b6c90052c484eb1f642f36ae31a51'),('38b8c48e46b511eca480645d86dd6e62',1637050464,'2021-11-16',46,1,1,'2021-11-16 07:02:56.000000','2021-11-16','07:02:56.000000','2021-11-16 16:14:24.000000','2021-11-16','16:14:24.000000',33088,0,1,0.8,3,176,180,NULL,'a4347c9412ec4178b98cbab80a1bc454'),('3946b0f046b511ec9406645d86dd6e62',1637050467,'2021-11-16',46,1,1,'2021-11-16 07:03:02.000000','2021-11-16','07:03:02.000000','2021-11-16 16:14:27.000000','2021-11-16','16:14:27.000000',33085,0,1,0.8,4,177,181,NULL,'f973aa5bf252484dbdc36a548e3ea4c4'),('39c24b7a46b511eca45a645d86dd6e62',1637050469,'2021-11-16',46,1,1,'2021-11-16 07:03:04.000000','2021-11-16','07:03:04.000000','2021-11-16 16:14:29.000000','2021-11-16','16:14:29.000000',33085,0,1,0.8,5,178,182,NULL,'f60c95b6c629493bba8cc0ffebc3e52d'),('3abb9df845ea11ec8e45645d86dd6e62',1636963279,'2021-11-15',46,0,1,'2021-11-15 07:13:31.000000','2021-11-15','07:13:31.000000','2021-11-15 16:01:19.000000','2021-11-15','16:01:19.000000',31668,0,1,0.7,11,140,166,NULL,'a1404357b5a449f7bb1054e952066c22'),('3bb9d21846b511eca63b645d86dd6e62',1637050472,'2021-11-16',46,1,1,'2021-11-16 07:02:50.000000','2021-11-16','07:02:50.000000','2021-11-16 16:14:32.000000','2021-11-16','16:14:32.000000',33102,0,1,0.8,2,174,183,NULL,'6cbd3d16e3c0468eb706351f26e49513'),('3d2369e446b511ec85c1645d86dd6e62',1637050474,'2021-11-16',46,1,1,'2021-11-16 07:02:35.000000','2021-11-16','07:02:35.000000','2021-11-16 16:14:34.000000','2021-11-16','16:14:34.000000',33119,0,1,0.8,6,169,184,NULL,'9287878d44a74926904ad17fa3628032'),('3f50529246b511ecb2c6645d86dd6e62',1637050477,'2021-11-16',46,1,1,'2021-11-16 07:02:37.000000','2021-11-16','07:02:37.000000','2021-11-16 16:14:37.000000','2021-11-16','16:14:37.000000',33120,0,1,0.8,7,170,185,NULL,'0e817e7dab75477b8681d1605cee568b'),('40bbe65a46b511ecb140645d86dd6e62',1637050480,'2021-11-16',46,1,1,'2021-11-16 07:02:40.000000','2021-11-16','07:02:40.000000','2021-11-16 16:14:40.000000','2021-11-16','16:14:40.000000',33120,0,1,0.8,8,171,186,NULL,'7548520b5725475abdca7bbbd4e5354c'),('41ebbb4846b511ecbe06645d86dd6e62',1637050482,'2021-11-16',46,1,1,'2021-11-16 07:02:42.000000','2021-11-16','07:02:42.000000','2021-11-16 16:14:42.000000','2021-11-16','16:14:42.000000',33120,0,1,0.8,9,172,187,NULL,'d24ed603efc64fadb32d7ddc54f0214b'),('437db4be46b511ecaff5645d86dd6e62',1637050485,'2021-11-16',46,1,1,'2021-11-16 07:02:48.000000','2021-11-16','07:02:48.000000','2021-11-16 16:14:45.000000','2021-11-16','16:14:45.000000',33117,0,1,0.8,11,173,188,NULL,'c5e34ad1ee8d41a5a4b7f5e61dc8ef64'),('528a5c9841e511ecba78645d86dd6e62',1636521379,'2021-11-10',45,2,1,'2021-11-10 07:15:01.000000','2021-11-10','07:15:01.000000','2021-11-10 13:16:19.000000','2021-11-10','13:16:19.000000',21678,0,1,0.5,4,24,78,NULL,'a2a6bdf198ef40388cf6e37a7989eadf'),('5c144b8045e911ecb91d645d86dd6e62',1636962907,'2021-11-15',46,0,1,'2021-11-15 07:13:08.000000','2021-11-15','07:13:08.000000','2021-11-15 15:55:07.000000','2021-11-15','15:55:07.000000',31319,0,1,0.7,2,131,151,NULL,'05857b25258c4d11b350d147b052640a'),('60699e3a45e911ec8967645d86dd6e62',1636962918,'2021-11-15',46,0,1,'2021-11-15 07:13:20.000000','2021-11-15','07:13:20.000000','2021-11-15 15:55:18.000000','2021-11-15','15:55:18.000000',31318,0,1,0.7,5,135,155,NULL,'9edab3d5d3ea47dbbefeda55c44588bc'),('6305ee5445e911ecb44d645d86dd6e62',1636962923,'2021-11-15',46,0,1,'2021-11-15 07:13:25.000000','2021-11-15','07:13:25.000000','2021-11-15 15:55:23.000000','2021-11-15','15:55:23.000000',31318,0,1,0.7,7,137,157,NULL,'4244288bd6654460a67b9e0184938bbd'),('641ba40245e911ecb56a645d86dd6e62',1636962925,'2021-11-15',46,0,1,'2021-11-15 07:13:26.000000','2021-11-15','07:13:26.000000','2021-11-15 15:55:25.000000','2021-11-15','15:55:25.000000',31319,0,1,0.7,8,138,158,NULL,'04609902d09d46db92d77a5d9fba1e3e'),('659ce80642c611eca9ec645d86dd6e62',1636618039,'2021-11-11',45,3,1,'2021-11-11 07:20:40.000000','2021-11-11','07:20:40.000000','2021-11-11 16:07:19.000000','2021-11-11','16:07:19.000000',31599,0,1,0.7,2,88,108,NULL,'fbf876b3e98646378c0932b77076ed9c'),('6794055042c611eca668645d86dd6e62',1636618043,'2021-11-11',45,3,1,'2021-11-11 07:20:42.000000','2021-11-11','07:20:42.000000','2021-11-11 16:07:23.000000','2021-11-11','16:07:23.000000',31601,0,1,0.7,1,89,109,NULL,'b8ae7b2d8b2f4095a1e8adb4f39edb7e'),('6912164250a611ec8342645d86dd6e62',1637740860,'2021-11-24',47,2,1,'2021-11-24 07:01:57.000000','2021-11-24','07:01:57.000000','2021-11-24 16:01:00.000000','2021-11-24','16:01:00.000000',32343,0,1,0.7,2,295,305,NULL,'7bbf535bbfa345db9e33c04939940639'),('69729ba842c611ec8c86645d86dd6e62',1636618046,'2021-11-11',45,3,1,'2021-11-11 07:20:44.000000','2021-11-11','07:20:44.000000','2021-11-11 16:07:26.000000','2021-11-11','16:07:26.000000',31602,0,1,0.7,3,90,110,NULL,'dca720404fc146a7abf050be8491aaf4'),('698171d450a611eca487645d86dd6e62',1637740862,'2021-11-24',47,2,1,'2021-11-24 07:01:59.000000','2021-11-24','07:01:59.000000','2021-11-24 16:01:02.000000','2021-11-24','16:01:02.000000',32343,0,1,0.7,1,296,306,NULL,'85f1e7a4cacd4d1cbaf53f38d6a5b9de'),('698d8d0150a611ec88c3645d86dd6e62',1637740864,'2021-11-24',47,2,1,'2021-11-24 07:02:01.000000','2021-11-24','07:02:01.000000','2021-11-24 16:01:04.000000','2021-11-24','16:01:04.000000',32343,0,1,0.7,3,297,307,NULL,'86da06ed8ba2494bb5f01baa7202cd59'),('69a3dcd950a611ecb95b645d86dd6e62',1637740866,'2021-11-24',47,2,1,'2021-11-24 07:02:03.000000','2021-11-24','07:02:03.000000','2021-11-24 16:01:06.000000','2021-11-24','16:01:06.000000',32343,0,1,0.7,4,298,308,NULL,'8f50d1e142e94e2793521a5f463adac6'),('6a7fd14a42c611ecbc2b645d86dd6e62',1636618049,'2021-11-11',45,3,1,'2021-11-11 07:21:06.000000','2021-11-11','07:21:06.000000','2021-11-11 16:07:29.000000','2021-11-11','16:07:29.000000',31583,0,1,0.7,4,91,111,NULL,'ecfd78252239443b946ab68eb77737eb'),('6c33b64850a611ecbd3d645d86dd6e62',1637740868,'2021-11-24',47,2,1,'2021-11-24 07:02:19.000000','2021-11-24','07:02:19.000000','2021-11-24 16:01:08.000000','2021-11-24','16:01:08.000000',32329,0,1,0.7,5,299,309,NULL,'a8d8a6cf569e43229f077dbe8a250beb'),('6c54494650a611ec8043645d86dd6e62',1637740870,'2021-11-24',47,2,1,'2021-11-24 07:02:22.000000','2021-11-24','07:02:22.000000','2021-11-24 16:01:10.000000','2021-11-24','16:01:10.000000',32328,0,1,0.7,6,300,310,NULL,'d5fea8ef9e0d459bb1dbbb4a39f79a3c'),('6c77da7050a611ec8a33645d86dd6e62',1637740873,'2021-11-24',47,2,1,'2021-11-24 07:02:24.000000','2021-11-24','07:02:24.000000','2021-11-24 16:01:13.000000','2021-11-24','16:01:13.000000',32329,0,1,0.7,7,301,311,NULL,'e77832cfcdf04fd58d24dcf6d4aa9bbc'),('6d2d2d1a50a611ecabab645d86dd6e62',1637740875,'2021-11-24',47,2,1,'2021-11-24 07:02:27.000000','2021-11-24','07:02:27.000000','2021-11-24 16:01:15.000000','2021-11-24','16:01:15.000000',32328,0,1,0.7,8,302,312,NULL,'8b3cb7c07cee4116a7a47c8c4c05ee25'),('6da6f02c42c611ecaa8a645d86dd6e62',1636618054,'2021-11-11',45,3,1,'2021-11-11 07:21:14.000000','2021-11-11','07:21:14.000000','2021-11-11 16:07:34.000000','2021-11-11','16:07:34.000000',31580,0,1,0.7,6,93,112,NULL,'25f6a7dc8bf446e686928ec23c1e3116'),('6df0b60850a611ec8d5a645d86dd6e62',1637740877,'2021-11-24',47,2,1,'2021-11-24 07:02:29.000000','2021-11-24','07:02:29.000000','2021-11-24 16:01:17.000000','2021-11-24','16:01:17.000000',32328,0,1,0.7,9,303,313,NULL,'622576a64b0041dcbcb47c72bface19c'),('6e31ece850a611ec8951645d86dd6e62',1637740880,'2021-11-24',47,2,1,'2021-11-24 07:02:31.000000','2021-11-24','07:02:31.000000','2021-11-24 16:01:20.000000','2021-11-24','16:01:20.000000',32329,0,1,0.7,11,304,314,NULL,'bffbadc96d4149e69170ee707a7a9347'),('6f13de2e42c611ecadbf645d86dd6e62',1636618056,'2021-11-11',45,3,1,'2021-11-11 07:21:16.000000','2021-11-11','07:21:16.000000','2021-11-11 16:07:36.000000','2021-11-11','16:07:36.000000',31580,0,1,0.7,7,94,113,NULL,'ad2146b444c04606a5e5d28753bfcda7'),('707133d842c611eca936645d86dd6e62',1636618058,'2021-11-11',45,3,1,'2021-11-11 07:21:19.000000','2021-11-11','07:21:19.000000','2021-11-11 16:07:38.000000','2021-11-11','16:07:38.000000',31579,0,1,0.7,8,95,114,NULL,'802c26680d8f4e7188e8be0eb009e5dc'),('7171581e42c611eca937645d86dd6e62',1636618060,'2021-11-11',45,3,1,'2021-11-11 07:21:21.000000','2021-11-11','07:21:21.000000','2021-11-11 16:07:40.000000','2021-11-11','16:07:40.000000',31579,0,1,0.7,9,96,115,NULL,'a7b34d93151540e28362b39ee6781c34'),('727f2da650a611ec9641645d86dd6e62',1637828844,'2021-11-25',47,3,1,'2021-11-25 07:03:09.000000','2021-11-25','07:03:09.000000','2021-11-25 16:27:24.000000','2021-11-25','16:27:24.000000',33855,0,1,0.8,6,320,325,NULL,'52a080e42cc840739dc522ab319710ae'),('73341fac50a611ec9ccc645d86dd6e62',1637828846,'2021-11-25',47,3,1,'2021-11-25 07:03:14.000000','2021-11-25','07:03:14.000000','2021-11-25 16:27:26.000000','2021-11-25','16:27:26.000000',33852,0,1,0.8,7,321,326,NULL,'dcb5d8dff2f54db786c2c32d5ffc3cb3'),('73e0936842c611eca393645d86dd6e62',1636618064,'2021-11-11',45,3,1,'2021-11-11 12:44:19.000000','2021-11-11','12:44:19.000000','2021-11-11 16:07:44.000000','2021-11-11','16:07:44.000000',12205,0,1,0.3,11,104,116,NULL,'64ad1e5afae743b9bc130d28a496731a'),('73ede2ee50a611ec8820645d86dd6e62',1637828848,'2021-11-25',47,3,1,'2021-11-25 07:03:19.000000','2021-11-25','07:03:19.000000','2021-11-25 16:27:28.000000','2021-11-25','16:27:28.000000',33849,0,1,0.8,8,322,327,NULL,'5a9595fee4df4afe90766d63c82e6785'),('74b240de50a611ec80ec645d86dd6e62',1637828850,'2021-11-25',47,3,1,'2021-11-25 07:03:22.000000','2021-11-25','07:03:22.000000','2021-11-25 16:27:30.000000','2021-11-25','16:27:30.000000',33848,0,1,0.8,9,323,328,NULL,'1b7e7811aad84d7385c639a0797f2915'),('74c0c9be412e11eca393645d86dd6e62',1636442830,'2021-11-09',45,1,1,'2021-11-09 14:21:06.000000','2021-11-09','14:21:06.000000','2021-11-09 15:27:10.000000','2021-11-09','15:27:10.000000',3964,0,1,0.1,1,1,20,NULL,'bad02a450b0a4efbb85f3a3e1478f0df'),('75e1e02450a611ec8a8c645d86dd6e62',1637828852,'2021-11-25',47,3,1,'2021-11-25 07:03:37.000000','2021-11-25','07:03:37.000000','2021-11-25 16:27:32.000000','2021-11-25','16:27:32.000000',33835,0,1,0.8,11,324,329,NULL,'ca58363ee5e747fa86267ae2c5cdcfc0'),('7674f1a850a611ec8657645d86dd6e62',1637828854,'2021-11-25',47,3,1,'2021-11-25 07:02:45.000000','2021-11-25','07:02:45.000000','2021-11-25 16:27:34.000000','2021-11-25','16:27:34.000000',33889,0,1,0.8,2,315,330,NULL,'ca4ccebccc474908a6343e9f74ca50ae'),('7744a6be50a611ecad6f645d86dd6e62',1637828856,'2021-11-25',47,3,1,'2021-11-25 07:02:54.000000','2021-11-25','07:02:54.000000','2021-11-25 16:27:36.000000','2021-11-25','16:27:36.000000',33882,0,1,0.8,1,316,331,NULL,'4aeed5daa7764c3a9781700564a68c2c'),('77de020050a611ec9d36645d86dd6e62',1637828858,'2021-11-25',47,3,1,'2021-11-25 07:02:56.000000','2021-11-25','07:02:56.000000','2021-11-25 16:27:38.000000','2021-11-25','16:27:38.000000',33882,0,1,0.8,3,317,332,NULL,'cdddca17103149189caad71078bb57bf'),('781e170650a611ec8b55645d86dd6e62',1637828860,'2021-11-25',47,3,1,'2021-11-25 07:02:58.000000','2021-11-25','07:02:58.000000','2021-11-25 16:27:40.000000','2021-11-25','16:27:40.000000',33882,0,1,0.8,4,318,333,NULL,'bda5ffdffd0c436fb720c6a2e206e48a'),('7840256450a611ec9ac2645d86dd6e62',1637828861,'2021-11-25',47,3,1,'2021-11-25 07:03:07.000000','2021-11-25','07:03:07.000000','2021-11-25 16:27:41.000000','2021-11-25','16:27:41.000000',33874,0,1,0.8,5,319,334,NULL,'b00ba0ca1bde404dbd4f2819a280d507'),('7b2b57a850a611ec9de3645d86dd6e62',1637921382,'2021-11-26',47,4,1,'2021-11-26 07:05:57.000000','2021-11-26','07:05:57.000000','2021-11-26 18:09:42.000000','2021-11-26','18:09:42.000000',39825,0,1,0.9,2,337,346,NULL,'794c1659f9ee408b8a7ab7247d2c28c0'),('7bc2684c50a611ec976c645d86dd6e62',1637921385,'2021-11-26',47,4,1,'2021-11-26 07:05:48.000000','2021-11-26','07:05:48.000000','2021-11-26 18:09:45.000000','2021-11-26','18:09:45.000000',39837,0,1,0.9,1,335,347,NULL,'ef7cf0c71d9d4212a19125006bebbff3'),('7bd066f6484b11ec9299645d86dd6e62',1637224956,'2021-11-18',46,3,1,'2021-11-18 07:09:11.000000','2021-11-18','07:09:11.000000','2021-11-18 16:42:36.000000','2021-11-18','16:42:36.000000',34405,0,1,0.8,2,189,249,NULL,'72111f9ddddb4e62a5d40928687bead3'),('7bf2d24b50a611ec9140645d86dd6e62',1637921387,'2021-11-26',47,4,1,'2021-11-26 07:05:58.000000','2021-11-26','07:05:58.000000','2021-11-26 18:09:47.000000','2021-11-26','18:09:47.000000',39829,0,1,0.9,3,338,348,NULL,'96a0321ee9c64ab3af64852b54e8d6e5'),('7bfc640450a611ec8d0f645d86dd6e62',1637921389,'2021-11-26',47,4,1,'2021-11-26 07:06:03.000000','2021-11-26','07:06:03.000000','2021-11-26 18:09:49.000000','2021-11-26','18:09:49.000000',39826,0,1,0.9,4,339,349,NULL,'4c9801f9234949a48e4a312dd35a1441'),('7c7368df50a611ec9287645d86dd6e62',1637921396,'2021-11-26',47,4,1,'2021-11-26 07:06:05.000000','2021-11-26','07:06:05.000000','2021-11-26 18:09:56.000000','2021-11-26','18:09:56.000000',39831,0,1,0.9,5,340,350,NULL,'553ccdeaf14b4f33a01167d8c5fd0fb8'),('7cc44d4b50a611ec96f8645d86dd6e62',1637921399,'2021-11-26',47,4,1,'2021-11-26 07:06:08.000000','2021-11-26','07:06:08.000000','2021-11-26 18:09:59.000000','2021-11-26','18:09:59.000000',39831,0,1,0.9,6,341,351,NULL,'07f132f1f85344c5bd142320e4451932'),('7d22e5db50a611ec8c20645d86dd6e62',1637921401,'2021-11-26',47,4,1,'2021-11-26 07:06:10.000000','2021-11-26','07:06:10.000000','2021-11-26 18:10:01.000000','2021-11-26','18:10:01.000000',39831,0,1,0.9,7,342,352,NULL,'ecd1ae1ddeb149a6a0ce497e5a9e5392'),('7d2900f850a611ec80d1645d86dd6e62',1637921403,'2021-11-26',47,4,1,'2021-11-26 07:06:12.000000','2021-11-26','07:06:12.000000','2021-11-26 18:10:03.000000','2021-11-26','18:10:03.000000',39831,0,1,0.9,8,343,353,NULL,'a95257c376af49b0a563199083367f8e'),('7d924b9450a611ecb191645d86dd6e62',1637921405,'2021-11-26',47,4,1,'2021-11-26 07:06:14.000000','2021-11-26','07:06:14.000000','2021-11-26 18:10:05.000000','2021-11-26','18:10:05.000000',39831,0,1,0.9,9,344,354,NULL,'793f481b10664b089d37f3f10e7ebdd0'),('7d9f7aff50a611eca9d8645d86dd6e62',1637921407,'2021-11-26',47,4,1,'2021-11-26 07:06:17.000000','2021-11-26','07:06:17.000000','2021-11-26 18:10:07.000000','2021-11-26','18:10:07.000000',39830,0,1,0.9,11,345,355,NULL,'9e6b97a537794d9b96916d91a0fe37b0'),('7de075e550a611ec8bb7645d86dd6e62',1638140399,'2021-11-29',48,0,1,'2021-11-29 06:59:59.000000','2021-11-29','06:59:59.000000',NULL,NULL,NULL,0,0,1,0.0,2,356,NULL,NULL,'f031d92d223f40d5a1adafae8a02e9b7'),('7df874e550a611ec9d4a645d86dd6e62',1638140402,'2021-11-29',48,0,1,'2021-11-29 07:00:02.000000','2021-11-29','07:00:02.000000',NULL,NULL,NULL,0,0,1,0.0,1,357,NULL,NULL,'fa8991279783497f9fc3f6413bd4b91e'),('7e1f8e1250a611ecb071645d86dd6e62',1638140404,'2021-11-29',48,0,1,'2021-11-29 07:00:04.000000','2021-11-29','07:00:04.000000',NULL,NULL,NULL,0,0,1,0.0,3,358,NULL,NULL,'9959593b21f042e0843ca543a8327bd1'),('7e4cf3da50a611ec8a01645d86dd6e62',1638140406,'2021-11-29',48,0,1,'2021-11-29 07:00:06.000000','2021-11-29','07:00:06.000000',NULL,NULL,NULL,0,0,1,0.0,4,359,NULL,NULL,'758cbbf77d3d43e0bec708441e53d612'),('7ebd593050a611ecb2e6645d86dd6e62',1638140409,'2021-11-29',48,0,1,'2021-11-29 07:00:09.000000','2021-11-29','07:00:09.000000',NULL,NULL,NULL,0,0,1,0.0,5,360,NULL,NULL,'49e2cf2e88934575a16b128355b19b5a'),('7ee5050c50a611eca141645d86dd6e62',1638140411,'2021-11-29',48,0,1,'2021-11-29 07:00:11.000000','2021-11-29','07:00:11.000000',NULL,NULL,NULL,0,0,1,0.0,6,361,NULL,NULL,'5ab429dd1a294d259e992bfa8800edc9'),('7f3152e650a611ec8535645d86dd6e62',1638140413,'2021-11-29',48,0,1,'2021-11-29 07:00:13.000000','2021-11-29','07:00:13.000000',NULL,NULL,NULL,0,0,1,0.0,7,362,NULL,NULL,'45f02114dd3340bdb9f717606610222f'),('7f4af5e250a611ecb114645d86dd6e62',1638140416,'2021-11-29',48,0,1,'2021-11-29 07:00:16.000000','2021-11-29','07:00:16.000000',NULL,NULL,NULL,0,0,1,0.0,8,363,NULL,NULL,'605c545dc42b4560a045436ea8cca701'),('7f6cd4e650a611ecab3a645d86dd6e62',1638140418,'2021-11-29',48,0,1,'2021-11-29 07:00:18.000000','2021-11-29','07:00:18.000000',NULL,NULL,NULL,0,0,1,0.0,9,364,NULL,NULL,'a79b76ad24e847749f8ae3a7ed67b334'),('7f88977650a611ec8583645d86dd6e62',1638140421,'2021-11-29',48,0,1,'2021-11-29 07:00:21.000000','2021-11-29','07:00:21.000000',NULL,NULL,NULL,0,0,1,0.0,11,365,NULL,NULL,'53c4d2d369dc4df4a85a2baf5df2c03e'),('80b3d0a44ccc11ec9574645d86dd6e62',1637568702,'2021-11-22',47,0,1,'2021-11-22 07:16:14.000000','2021-11-22','07:16:14.000000','2021-11-22 16:11:42.000000','2021-11-22','16:11:42.000000',32128,0,1,0.7,2,258,266,NULL,'793839fa6911449ca005d2981ce6e321'),('80d0a90d4ccc11ecb4fd645d86dd6e62',1637568705,'2021-11-22',47,0,1,'2021-11-22 07:16:19.000000','2021-11-22','07:16:19.000000','2021-11-22 16:11:45.000000','2021-11-22','16:11:45.000000',32126,0,1,0.7,3,260,268,NULL,'782a5a9a66784bcdb82ddf5c035a5736'),('80f5664c4ccc11ec855c645d86dd6e62',1637568707,'2021-11-22',47,0,1,'2021-11-22 16:11:47.000000','2021-11-22','16:11:47.000000',NULL,NULL,NULL,0,0,1,0.0,4,269,NULL,NULL,'b594e3f6cf53438b8d27113e5a53dd4b'),('820077c24ccc11ecb375645d86dd6e62',1637568710,'2021-11-22',47,0,1,'2021-11-22 16:11:50.000000','2021-11-22','16:11:50.000000',NULL,NULL,NULL,0,0,1,0.0,5,270,NULL,NULL,'7791cdfa8aa1418caff7bd05e600a818'),('8263a5a74ccc11ecaf61645d86dd6e62',1637568713,'2021-11-22',47,0,1,'2021-11-22 08:05:12.000000','2021-11-22','08:05:12.000000','2021-11-22 16:11:53.000000','2021-11-22','16:11:53.000000',29201,0,1,0.7,6,261,271,NULL,'3222850f7c5a41189032765e31a48653'),('82a3bba54ccc11ecaf33645d86dd6e62',1637568715,'2021-11-22',47,0,1,'2021-11-22 08:05:14.000000','2021-11-22','08:05:14.000000','2021-11-22 16:11:55.000000','2021-11-22','16:11:55.000000',29201,0,1,0.7,7,262,272,NULL,'41d480089ea84926a1eb3b9f3e5a4a39'),('82d7703a4ccc11ecb4ff645d86dd6e62',1637568716,'2021-11-22',47,0,1,'2021-11-22 08:05:17.000000','2021-11-22','08:05:17.000000','2021-11-22 16:11:56.000000','2021-11-22','16:11:56.000000',29199,0,1,0.7,8,263,273,NULL,'1c07f34559364523b55aec3c018ccc07'),('833e818b4ccc11ec9ce8645d86dd6e62',1637568718,'2021-11-22',47,0,1,'2021-11-22 08:05:21.000000','2021-11-22','08:05:21.000000','2021-11-22 16:11:58.000000','2021-11-22','16:11:58.000000',29197,0,1,0.7,9,264,274,NULL,'415f9016123a428dae3ca2c1941aee3c'),('867927704ccc11ecb420645d86dd6e62',1637656504,'2021-11-23',47,1,1,'2021-11-23 07:06:19.000000','2021-11-23','07:06:19.000000','2021-11-23 16:35:04.000000','2021-11-23','16:35:04.000000',34125,0,1,0.8,2,275,285,NULL,'dd5769f709144c749bfa48037170c82e'),('87005a984ccc11ec9bfa645d86dd6e62',1637656507,'2021-11-23',47,1,1,'2021-11-23 07:06:21.000000','2021-11-23','07:06:21.000000','2021-11-23 16:35:07.000000','2021-11-23','16:35:07.000000',34126,0,1,0.8,1,276,286,NULL,'9742f3bd36284213b86f4008390274a0'),('875084a24ccc11ecaaa5645d86dd6e62',1637656510,'2021-11-23',47,1,1,'2021-11-23 07:06:23.000000','2021-11-23','07:06:23.000000','2021-11-23 16:35:10.000000','2021-11-23','16:35:10.000000',34127,0,1,0.8,3,277,287,NULL,'2b8cc78828274502b77f51d002b10e71'),('875f75a94ccc11ec9bc3645d86dd6e62',1637656515,'2021-11-23',47,1,1,'2021-11-23 07:06:26.000000','2021-11-23','07:06:26.000000','2021-11-23 16:35:15.000000','2021-11-23','16:35:15.000000',34129,0,1,0.8,4,278,288,NULL,'ebe0dd545bbf488a882bfcb7a8db90ab'),('87a54afe4ccc11eca395645d86dd6e62',1637656519,'2021-11-23',47,1,1,'2021-11-23 07:06:28.000000','2021-11-23','07:06:28.000000','2021-11-23 16:35:19.000000','2021-11-23','16:35:19.000000',34131,0,1,0.8,5,279,289,NULL,'d9c6453974af49b08a0cf6f3876b1645'),('883bb1244ccc11ecb7b2645d86dd6e62',1637656521,'2021-11-23',47,1,1,'2021-11-23 07:06:31.000000','2021-11-23','07:06:31.000000','2021-11-23 16:35:21.000000','2021-11-23','16:35:21.000000',34130,0,1,0.8,6,280,290,NULL,'4c3e6144950b41899588eb52337d8f01'),('88e12f864ccc11ec8ebf645d86dd6e62',1637656523,'2021-11-23',47,1,1,'2021-11-23 07:06:33.000000','2021-11-23','07:06:33.000000','2021-11-23 16:35:23.000000','2021-11-23','16:35:23.000000',34130,0,1,0.8,7,281,291,NULL,'1727666f22334c818d226fb402a54935'),('88ea70af4ccc11ecbb41645d86dd6e62',1637656525,'2021-11-23',47,1,1,'2021-11-23 07:06:35.000000','2021-11-23','07:06:35.000000','2021-11-23 16:35:25.000000','2021-11-23','16:35:25.000000',34130,0,1,0.8,8,282,292,NULL,'153ba675e0974fb09ba1cc1dad74346f'),('8939d2a64ccc11ecb1e5645d86dd6e62',1637656527,'2021-11-23',47,1,1,'2021-11-23 07:06:38.000000','2021-11-23','07:06:38.000000','2021-11-23 16:35:27.000000','2021-11-23','16:35:27.000000',34129,0,1,0.8,9,283,293,NULL,'5c4aac02db9e423a805f7cd132d7ead6'),('8994e6c64ccc11ec9d35645d86dd6e62',1637656530,'2021-11-23',47,1,1,'2021-11-23 07:06:40.000000','2021-11-23','07:06:40.000000','2021-11-23 16:35:30.000000','2021-11-23','16:35:30.000000',34130,0,1,0.8,11,284,294,NULL,'a87d8856b91f48608f20730470c70efa'),('9a004cb0427d11ec8ae2645d86dd6e62',1636586469,'2021-11-11',45,3,1,'2021-11-11 07:21:09.000000','2021-11-11','07:21:09.000000',NULL,NULL,NULL,0,0,1,0.0,5,92,NULL,NULL,'b70e6fe7de944aa3aae0c5d682ad360e'),('a305186241f811ec96ca645d86dd6e62',1636529674,'2021-11-10',45,2,1,'2021-11-10 07:14:54.000000','2021-11-10','07:14:54.000000','2021-11-10 15:34:34.000000','2021-11-10','15:34:34.000000',29980,0,1,0.7,1,21,86,NULL,'896e7b8188084677b7c7bb27ea4f5446'),('a3a78e6241f811ec9188645d86dd6e62',1636529677,'2021-11-10',45,2,1,'2021-11-10 07:14:57.000000','2021-11-10','07:14:57.000000','2021-11-10 15:34:37.000000','2021-11-10','15:34:37.000000',29980,0,1,0.7,2,22,87,NULL,'d5dd6cde445a4bf997846f5a38087123'),('a538a17e434a11eca5cd645d86dd6e62',1636671733,'2021-11-12',45,4,1,'2021-11-12 07:02:13.000000','2021-11-12','07:02:13.000000',NULL,NULL,NULL,0,0,1,0.0,2,117,NULL,NULL,'4efdafd00c2541d3b6946c3bb246d16c'),('a580e543434a11ec9680645d86dd6e62',1636671735,'2021-11-12',45,4,1,'2021-11-12 07:02:15.000000','2021-11-12','07:02:15.000000',NULL,NULL,NULL,0,0,1,0.0,1,118,NULL,NULL,'f920b850464246c7a94fe71f1abdf22b'),('a591e98e434a11ecb636645d86dd6e62',1636671736,'2021-11-12',45,4,1,'2021-11-12 07:02:16.000000','2021-11-12','07:02:16.000000',NULL,NULL,NULL,0,0,1,0.0,3,119,NULL,NULL,'603c85894be441da949817493f46e32e'),('a75dee0c434a11ecadf5645d86dd6e62',1636671740,'2021-11-12',45,4,1,'2021-11-12 07:02:20.000000','2021-11-12','07:02:20.000000',NULL,NULL,NULL,0,0,1,0.0,5,121,NULL,NULL,'19d48a80d17a495f9b2409eb441d16a8'),('a774c2c7434a11ec948a645d86dd6e62',1636671742,'2021-11-12',45,4,1,'2021-11-12 07:02:22.000000','2021-11-12','07:02:22.000000',NULL,NULL,NULL,0,0,1,0.0,6,122,NULL,NULL,'c7c53bf52df748da877d51e04e3e04f5'),('a822a177434a11ecb74d645d86dd6e62',1636671744,'2021-11-12',45,4,1,'2021-11-12 07:02:24.000000','2021-11-12','07:02:24.000000',NULL,NULL,NULL,0,0,1,0.0,7,123,NULL,NULL,'3d778dfc85114efb890043a924442e98'),('a847e7ad434a11ec8788645d86dd6e62',1636671746,'2021-11-12',45,4,1,'2021-11-12 07:02:26.000000','2021-11-12','07:02:26.000000',NULL,NULL,NULL,0,0,1,0.0,8,124,NULL,NULL,'c5c680a9a7674e768ff7ba126ee786da'),('a8c7476c434a11ecad30645d86dd6e62',1636671748,'2021-11-12',45,4,1,'2021-11-12 07:02:28.000000','2021-11-12','07:02:28.000000',NULL,NULL,NULL,0,0,1,0.0,9,125,NULL,NULL,'3ee639bef6aa491d9841f1228e913073'),('b51fa37441e411ec9abd645d86dd6e62',1636521115,'2021-11-10',45,2,1,'2021-11-10 07:15:06.000000','2021-11-10','07:15:06.000000','2021-11-10 13:11:55.000000','2021-11-10','13:11:55.000000',21409,0,1,0.5,5,25,71,NULL,'71b62fbb31234467ad0206be7d3c3bfe'),('b5253e06484b11eca861645d86dd6e62',1637225052,'2021-11-18',46,3,1,'2021-11-18 07:09:16.000000','2021-11-18','07:09:16.000000','2021-11-18 16:44:12.000000','2021-11-18','16:44:12.000000',34496,0,1,0.8,3,191,250,NULL,'916496b489fe477d9d4ef38353a403da'),('b8428b2c41e411ec8a46645d86dd6e62',1636521118,'2021-11-10',45,2,1,'2021-11-10 09:54:47.000000','2021-11-10','09:54:47.000000','2021-11-10 13:11:58.000000','2021-11-10','13:11:58.000000',11831,0,1,0.3,10,62,72,NULL,'03d222c7da7c4bfaab689976d9f7a134'),('b995a04c41e411ec90a8645d86dd6e62',1636521121,'2021-11-10',45,2,1,'2021-11-10 09:54:44.000000','2021-11-10','09:54:44.000000','2021-11-10 13:12:01.000000','2021-11-10','13:12:01.000000',11837,0,1,0.3,9,61,73,NULL,'bdeeafc6bd374e669cd62f7208960a08'),('ba98510a41e411ecb7ab645d86dd6e62',1636521124,'2021-11-10',45,2,1,'2021-11-10 09:54:39.000000','2021-11-10','09:54:39.000000','2021-11-10 13:12:04.000000','2021-11-10','13:12:04.000000',11845,0,1,0.3,7,59,74,NULL,'8481f07c68c24059b4700d03d825c35f'),('bb7de10c41e411ecb947645d86dd6e62',1636521126,'2021-11-10',45,2,1,'2021-11-10 09:54:42.000000','2021-11-10','09:54:42.000000','2021-11-10 13:12:06.000000','2021-11-10','13:12:06.000000',11844,0,1,0.3,8,60,75,NULL,'0f334823fc4d44769765014f35bb0e6c'),('bcb4d82641e411ecb947645d86dd6e62',1636521128,'2021-11-10',45,2,1,'2021-11-10 09:54:24.000000','2021-11-10','09:54:24.000000','2021-11-10 13:12:08.000000','2021-11-10','13:12:08.000000',11864,0,1,0.3,6,57,76,NULL,'005dab7d829a45baa4a65a97443af2d0'),('bf601336484b11ecbfe0645d86dd6e62',1637225069,'2021-11-18',46,3,1,'2021-11-18 07:09:19.000000','2021-11-18','07:09:19.000000','2021-11-18 16:44:29.000000','2021-11-18','16:44:29.000000',34510,0,1,0.8,4,192,251,NULL,'3e14ce9ef63542f4b563efed5ff5d820'),('c018b7ae484b11ecaaab645d86dd6e62',1637225071,'2021-11-18',46,3,1,'2021-11-18 07:09:22.000000','2021-11-18','07:09:22.000000','2021-11-18 16:44:31.000000','2021-11-18','16:44:31.000000',34509,0,1,0.8,5,193,252,NULL,'4d35a8480d844631ac6c8b7df7e55c97'),('c171bdf6484b11eca047645d86dd6e62',1637225073,'2021-11-18',46,3,1,'2021-11-18 07:09:25.000000','2021-11-18','07:09:25.000000','2021-11-18 16:44:33.000000','2021-11-18','16:44:33.000000',34508,0,1,0.8,6,194,253,NULL,'f2163a57a5e24bb9b177f2541954ba86'),('c294f60a484b11ec9663645d86dd6e62',1637225076,'2021-11-18',46,3,1,'2021-11-18 07:09:27.000000','2021-11-18','07:09:27.000000','2021-11-18 16:44:36.000000','2021-11-18','16:44:36.000000',34509,0,1,0.8,7,195,254,NULL,'0d1c1dbad5644f23be6490ce3323e25a'),('c4afa362484b11ecbca7645d86dd6e62',1637225078,'2021-11-18',46,3,1,'2021-11-18 07:09:29.000000','2021-11-18','07:09:29.000000','2021-11-18 16:44:38.000000','2021-11-18','16:44:38.000000',34509,0,1,0.8,8,196,255,NULL,'2913bb855af14828956fb3ab8e7a19a6'),('c5e2585a484b11ecb4dc645d86dd6e62',1637225081,'2021-11-18',46,3,1,'2021-11-18 07:09:32.000000','2021-11-18','07:09:32.000000','2021-11-18 16:44:41.000000','2021-11-18','16:44:41.000000',34509,0,1,0.8,9,197,256,NULL,'ba9b17527d384ced8a5e5e1d99fea861'),('c71cb124484b11eca8c1645d86dd6e62',1637225083,'2021-11-18',46,3,1,'2021-11-18 07:09:34.000000','2021-11-18','07:09:34.000000','2021-11-18 16:44:43.000000','2021-11-18','16:44:43.000000',34509,0,1,0.8,11,198,257,NULL,'6b52036632fd4c1e93afd232f938defe'),('d0593850437411ec9fcd645d86dd6e62',1636692950,'2021-11-12',45,4,1,'2021-11-12 07:02:18.000000','2021-11-12','07:02:18.000000','2021-11-12 12:55:50.000000','2021-11-12','12:55:50.000000',21212,0,1,0.5,4,120,130,NULL,'cd0b9e2a942541f6a22099224c528653'),('dc90fe0842a911ecaba8645d86dd6e62',1636605775,'2021-11-11',45,3,1,'2021-11-11 07:21:24.000000','2021-11-11','07:21:24.000000','2021-11-11 12:42:55.000000','2021-11-11','12:42:55.000000',19291,0,1,0.4,10,97,103,NULL,'f771d2db94f9468ab57e8ff8f8c195fc'),('e2ac1ac64b2411ecb33f645d86dd6e62',1637536577,'2021-11-22',47,0,1,'2021-11-22 07:16:17.000000','2021-11-22','07:16:17.000000',NULL,NULL,NULL,0,0,1,0.0,1,259,NULL,NULL,'a33572ba2b2a470ea5e48dea07cf5860'),('e41f621e4b2711ec9782645d86dd6e62',1637539523,'2021-11-22',47,0,1,'2021-11-22 08:05:23.000000','2021-11-22','08:05:23.000000',NULL,NULL,NULL,0,0,1,0.0,11,265,NULL,NULL,'aa082fb572664f1c9a0205e8a41df7f2'),('f29e5c42434d11ec9fe4645d86dd6e62',1636676261,'2021-11-12',45,4,1,'2021-11-12 07:02:30.000000','2021-11-12','07:02:30.000000','2021-11-12 08:17:41.000000','2021-11-12','08:17:41.000000',4511,0,1,0.1,11,126,128,NULL,'019994e6fa81456a8fdd0bf87aafb87e');
/*!40000 ALTER TABLE `att_payloadparing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_payloadpaycode`
--

DROP TABLE IF EXISTS `att_payloadpaycode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `year` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `att_payloadpaycode_emp_id_78e75279_fk_personnel_employee_id` (`emp_id`),
  KEY `att_payloadpaycode_pay_code_id_4a096cc7_fk_att_paycode_id` (`pay_code_id`),
  KEY `att_payloadpaycode_shift_id_79a0901e_fk_att_attshift_id` (`shift_id`),
  KEY `att_payloadpaycode_att_date_aa048d7b` (`att_date`),
  KEY `att_payloadpaycode_time_card_id_1696b969` (`time_card_id`),
  CONSTRAINT `att_payloadpaycode_emp_id_78e75279_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `att_payloadpaycode_pay_code_id_4a096cc7_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`),
  CONSTRAINT `att_payloadpaycode_shift_id_79a0901e_fk_att_attshift_id` FOREIGN KEY (`shift_id`) REFERENCES `att_attshift` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_payloadpaycode`
--

LOCK TABLES `att_payloadpaycode` WRITE;
/*!40000 ALTER TABLE `att_payloadpaycode` DISABLE KEYS */;
INSERT INTO `att_payloadpaycode` VALUES ('07c2c0de484911ec8bdd645d86dd6e62','2021-11-18',46,3,'Regular','P',0,0.0,0.0,0.0,0,1,1,NULL,'f0bb0a63d3464be28c0090fc43c2f0be',0,2021),('0f7bbdc841f411ec8431645d86dd6e62','2021-11-10',45,2,'Regular','P',0,0.0,0.0,0.0,0,3,1,NULL,'de8fd22cb4104f79ab68e3e85bb35d27',0,2021),('144cf606412611ec8ec5645d86dd6e62','2021-11-09',45,1,'Regular','P',0,0.0,0.0,0.0,0,2,1,NULL,'31ce892242ac4732b3798b9820ace701',0,2021),('15822f30412611ec867c645d86dd6e62','2021-11-09',45,1,'Regular','P',0,0.0,0.0,0.0,0,3,1,NULL,'fca638b619fb40d1914b19ae48a7b208',0,2021),('16bc54ee412611eca771645d86dd6e62','2021-11-09',45,1,'Regular','P',0,0.0,0.0,0.0,0,4,1,NULL,'99a4a4e0ff81423da17c2340b8cdf3db',0,2021),('18b6a3c8412611ecbbf9645d86dd6e62','2021-11-09',45,1,'Regular','P',0,0.0,0.0,0.0,0,10,1,NULL,'1360aa7da9e34cedb8d47acdcac25663',0,2021),('19e64f50412611ec8fc7645d86dd6e62','2021-11-09',45,1,'Regular','P',0,0.0,0.0,0.0,0,8,1,NULL,'f4d1002f964240cdb47105004b4c146e',0,2021),('1c489f90412611eca6fc645d86dd6e62','2021-11-09',45,1,'Regular','P',0,0.0,0.0,0.0,0,9,1,NULL,'61dd3941109245f9a5b49727a85bc0ef',0,2021),('1dedd06e412611ec9e2a645d86dd6e62','2021-11-09',45,1,'Regular','P',0,0.0,0.0,0.0,0,7,1,NULL,'cae9c07fdd1745679744a8b8f56acaeb',0,2021),('1f1b35d8412611ec96c9645d86dd6e62','2021-11-09',45,1,'Regular','P',0,0.0,0.0,0.0,0,6,1,NULL,'2beccc8862d8402689d2025f67e850ab',0,2021),('2c94180245ea11eca5fd645d86dd6e62','2021-11-15',46,0,'Regular','P',0,0.0,0.0,0.0,0,1,1,NULL,'71e55377d17441078205a15f417265c6',0,2021),('2ed19e4c45ea11ec91f9645d86dd6e62','2021-11-15',46,0,'Regular','P',0,0.0,0.0,0.0,0,3,1,NULL,'254a84a1e92c438ca052be923aca2a13',0,2021),('3133f9fa45ea11ec9541645d86dd6e62','2021-11-15',46,0,'Regular','P',0,0.0,0.0,0.0,0,4,1,NULL,'fabb79d9917c4899b973b547429d67fb',0,2021),('339de9a845ea11ec9f87645d86dd6e62','2021-11-15',46,0,'Regular','P',0,0.0,0.0,0.0,0,6,1,NULL,'8b18795b41e2417f94312bd72b2592b6',0,2021),('362e14e245ea11ec9357645d86dd6e62','2021-11-15',46,0,'Regular','P',0,0.0,0.0,0.0,0,9,1,NULL,'d53ab4dc98aa4293a4c0c570bffcba8e',0,2021),('38ae1c7846b511ecb4ae645d86dd6e62','2021-11-16',46,1,'Regular','P',0,0.0,0.0,0.0,0,1,1,NULL,'f53b6c90052c484eb1f642f36ae31a51',0,2021),('38cb135e46b511ecbaa0645d86dd6e62','2021-11-16',46,1,'Regular','P',0,0.0,0.0,0.0,0,3,1,NULL,'a4347c9412ec4178b98cbab80a1bc454',0,2021),('394dd7e246b511ec90af645d86dd6e62','2021-11-16',46,1,'Regular','P',0,0.0,0.0,0.0,0,4,1,NULL,'f973aa5bf252484dbdc36a548e3ea4c4',0,2021),('39c553f646b511ec9861645d86dd6e62','2021-11-16',46,1,'Regular','P',0,0.0,0.0,0.0,0,5,1,NULL,'f60c95b6c629493bba8cc0ffebc3e52d',0,2021),('3ac5f79e45ea11ecb376645d86dd6e62','2021-11-15',46,0,'Regular','P',0,0.0,0.0,0.0,0,11,1,NULL,'a1404357b5a449f7bb1054e952066c22',0,2021),('3bbe62cc46b511eca141645d86dd6e62','2021-11-16',46,1,'Regular','P',0,0.0,0.0,0.0,0,2,1,NULL,'6cbd3d16e3c0468eb706351f26e49513',0,2021),('3d46993446b511eca752645d86dd6e62','2021-11-16',46,1,'Regular','P',0,0.0,0.0,0.0,0,6,1,NULL,'9287878d44a74926904ad17fa3628032',0,2021),('3f54987e46b511eca366645d86dd6e62','2021-11-16',46,1,'Regular','P',0,0.0,0.0,0.0,0,7,1,NULL,'0e817e7dab75477b8681d1605cee568b',0,2021),('40c03f1446b511ecbc63645d86dd6e62','2021-11-16',46,1,'Regular','P',0,0.0,0.0,0.0,0,8,1,NULL,'7548520b5725475abdca7bbbd4e5354c',0,2021),('41f080ac46b511eca024645d86dd6e62','2021-11-16',46,1,'Regular','P',0,0.0,0.0,0.0,0,9,1,NULL,'d24ed603efc64fadb32d7ddc54f0214b',0,2021),('43815f2846b511ecad80645d86dd6e62','2021-11-16',46,1,'Regular','P',0,0.0,0.0,0.0,0,11,1,NULL,'c5e34ad1ee8d41a5a4b7f5e61dc8ef64',0,2021),('52911d5441e511eca521645d86dd6e62','2021-11-10',45,2,'Regular','P',0,0.0,0.0,0.0,0,4,1,NULL,'a2a6bdf198ef40388cf6e37a7989eadf',0,2021),('5c2822d245e911ecb91f645d86dd6e62','2021-11-15',46,0,'Regular','P',0,0.0,0.0,0.0,0,2,1,NULL,'05857b25258c4d11b350d147b052640a',0,2021),('60713d1e45e911eca7cd645d86dd6e62','2021-11-15',46,0,'Regular','P',0,0.0,0.0,0.0,0,5,1,NULL,'9edab3d5d3ea47dbbefeda55c44588bc',0,2021),('631cd80a45e911ec8e1b645d86dd6e62','2021-11-15',46,0,'Regular','P',0,0.0,0.0,0.0,0,7,1,NULL,'4244288bd6654460a67b9e0184938bbd',0,2021),('64203b1845e911ecba6e645d86dd6e62','2021-11-15',46,0,'Regular','P',0,0.0,0.0,0.0,0,8,1,NULL,'04609902d09d46db92d77a5d9fba1e3e',0,2021),('65a1175e42c611ec8f6a645d86dd6e62','2021-11-11',45,3,'Regular','P',0,0.0,0.0,0.0,0,2,1,NULL,'fbf876b3e98646378c0932b77076ed9c',0,2021),('6798c6d242c611ecbed3645d86dd6e62','2021-11-11',45,3,'Regular','P',0,0.0,0.0,0.0,0,1,1,NULL,'b8ae7b2d8b2f4095a1e8adb4f39edb7e',0,2021),('697cdde850a611ecbce9645d86dd6e62','2021-11-24',47,2,'Regular','P',0,0.0,0.0,0.0,0,2,1,NULL,'7bbf535bbfa345db9e33c04939940639',0,2021),('6981478042c611ecb3e1645d86dd6e62','2021-11-11',45,3,'Regular','P',0,0.0,0.0,0.0,0,3,1,NULL,'dca720404fc146a7abf050be8491aaf4',0,2021),('69885cc250a611ec8274645d86dd6e62','2021-11-24',47,2,'Regular','P',0,0.0,0.0,0.0,0,1,1,NULL,'85f1e7a4cacd4d1cbaf53f38d6a5b9de',0,2021),('69a3199450a611ec872d645d86dd6e62','2021-11-24',47,2,'Regular','P',0,0.0,0.0,0.0,0,3,1,NULL,'86da06ed8ba2494bb5f01baa7202cd59',0,2021),('69ac03dc50a611ec97e5645d86dd6e62','2021-11-24',47,2,'Regular','P',0,0.0,0.0,0.0,0,4,1,NULL,'8f50d1e142e94e2793521a5f463adac6',0,2021),('6a8734d442c611ecab5d645d86dd6e62','2021-11-11',45,3,'Regular','P',0,0.0,0.0,0.0,0,4,1,NULL,'ecfd78252239443b946ab68eb77737eb',0,2021),('6c41f97450a611eca76f645d86dd6e62','2021-11-24',47,2,'Regular','P',0,0.0,0.0,0.0,0,5,1,NULL,'a8d8a6cf569e43229f077dbe8a250beb',0,2021),('6c75425e50a611ec83dc645d86dd6e62','2021-11-24',47,2,'Regular','P',0,0.0,0.0,0.0,0,6,1,NULL,'d5fea8ef9e0d459bb1dbbb4a39f79a3c',0,2021),('6c8c9b6250a611ec99b7645d86dd6e62','2021-11-24',47,2,'Regular','P',0,0.0,0.0,0.0,0,7,1,NULL,'e77832cfcdf04fd58d24dcf6d4aa9bbc',0,2021),('6d3877f650a611ecb433645d86dd6e62','2021-11-24',47,2,'Regular','P',0,0.0,0.0,0.0,0,8,1,NULL,'8b3cb7c07cee4116a7a47c8c4c05ee25',0,2021),('6dac63a842c611ec9881645d86dd6e62','2021-11-11',45,3,'Regular','P',0,0.0,0.0,0.0,0,6,1,NULL,'25f6a7dc8bf446e686928ec23c1e3116',0,2021),('6e2b843650a611ecadb6645d86dd6e62','2021-11-24',47,2,'Regular','P',0,0.0,0.0,0.0,0,9,1,NULL,'622576a64b0041dcbcb47c72bface19c',0,2021),('6e94a83650a611ecbda0645d86dd6e62','2021-11-24',47,2,'Regular','P',0,0.0,0.0,0.0,0,11,1,NULL,'bffbadc96d4149e69170ee707a7a9347',0,2021),('6f1823fa42c611ec9377645d86dd6e62','2021-11-11',45,3,'Regular','P',0,0.0,0.0,0.0,0,7,1,NULL,'ad2146b444c04606a5e5d28753bfcda7',0,2021),('7075edd242c611ecb8b1645d86dd6e62','2021-11-11',45,3,'Regular','P',0,0.0,0.0,0.0,0,8,1,NULL,'802c26680d8f4e7188e8be0eb009e5dc',0,2021),('7179e49442c611ecbd86645d86dd6e62','2021-11-11',45,3,'Regular','P',0,0.0,0.0,0.0,0,9,1,NULL,'a7b34d93151540e28362b39ee6781c34',0,2021),('72960ff450a611eca16e645d86dd6e62','2021-11-25',47,3,'Regular','P',0,0.0,0.0,0.0,0,6,1,NULL,'52a080e42cc840739dc522ab319710ae',0,2021),('738a290a50a611eca02b645d86dd6e62','2021-11-25',47,3,'Regular','P',0,0.0,0.0,0.0,0,7,1,NULL,'dcb5d8dff2f54db786c2c32d5ffc3cb3',0,2021),('73e7616242c611eca403645d86dd6e62','2021-11-11',45,3,'Regular','P',0,0.0,0.0,0.0,0,11,1,NULL,'64ad1e5afae743b9bc130d28a496731a',0,2021),('74048dbe50a611eca043645d86dd6e62','2021-11-25',47,3,'Regular','P',0,0.0,0.0,0.0,0,8,1,NULL,'5a9595fee4df4afe90766d63c82e6785',0,2021),('74c36a2e50a611ec896c645d86dd6e62','2021-11-25',47,3,'Regular','P',0,0.0,0.0,0.0,0,9,1,NULL,'1b7e7811aad84d7385c639a0797f2915',0,2021),('74c5ad24412e11ec9aa8645d86dd6e62','2021-11-09',45,1,'Regular','P',0,0.0,0.0,0.0,0,1,1,NULL,'bad02a450b0a4efbb85f3a3e1478f0df',0,2021),('75f73d2c50a611ecbdad645d86dd6e62','2021-11-25',47,3,'Regular','P',0,0.0,0.0,0.0,0,11,1,NULL,'ca58363ee5e747fa86267ae2c5cdcfc0',0,2021),('768216fa50a611ecac04645d86dd6e62','2021-11-25',47,3,'Regular','P',0,0.0,0.0,0.0,0,2,1,NULL,'ca4ccebccc474908a6343e9f74ca50ae',0,2021),('7751ef9a50a611ecaef9645d86dd6e62','2021-11-25',47,3,'Regular','P',0,0.0,0.0,0.0,0,1,1,NULL,'4aeed5daa7764c3a9781700564a68c2c',0,2021),('77f35f5e50a611ecb58f645d86dd6e62','2021-11-25',47,3,'Regular','P',0,0.0,0.0,0.0,0,3,1,NULL,'cdddca17103149189caad71078bb57bf',0,2021),('782430ca50a611ecadb3645d86dd6e62','2021-11-25',47,3,'Regular','P',0,0.0,0.0,0.0,0,4,1,NULL,'bda5ffdffd0c436fb720c6a2e206e48a',0,2021),('784e4b4c50a611ec88f4645d86dd6e62','2021-11-25',47,3,'Regular','P',0,0.0,0.0,0.0,0,5,1,NULL,'b00ba0ca1bde404dbd4f2819a280d507',0,2021),('7b31751e50a611ec8b30645d86dd6e62','2021-11-26',47,4,'Regular','P',0,0.0,0.0,0.0,0,2,1,NULL,'794c1659f9ee408b8a7ab7247d2c28c0',0,2021),('7bcd9fec50a611ecb817645d86dd6e62','2021-11-26',47,4,'Regular','P',0,0.0,0.0,0.0,0,1,1,NULL,'ef7cf0c71d9d4212a19125006bebbff3',0,2021),('7bd940b6484b11ec8e5e645d86dd6e62','2021-11-18',46,3,'Regular','P',0,0.0,0.0,0.0,0,2,1,NULL,'72111f9ddddb4e62a5d40928687bead3',0,2021),('7bfb8c8850a611eca23f645d86dd6e62','2021-11-26',47,4,'Regular','P',0,0.0,0.0,0.0,0,3,1,NULL,'96a0321ee9c64ab3af64852b54e8d6e5',0,2021),('7c1aea5e50a611ec96ce645d86dd6e62','2021-11-26',47,4,'Regular','P',0,0.0,0.0,0.0,0,4,1,NULL,'4c9801f9234949a48e4a312dd35a1441',0,2021),('7cbb24dc50a611eca374645d86dd6e62','2021-11-26',47,4,'Regular','P',0,0.0,0.0,0.0,0,5,1,NULL,'553ccdeaf14b4f33a01167d8c5fd0fb8',0,2021),('7cd530a850a611ecb95e645d86dd6e62','2021-11-26',47,4,'Regular','P',0,0.0,0.0,0.0,0,6,1,NULL,'07f132f1f85344c5bd142320e4451932',0,2021),('7d25f44250a611ec8427645d86dd6e62','2021-11-26',47,4,'Regular','P',0,0.0,0.0,0.0,0,7,1,NULL,'ecd1ae1ddeb149a6a0ce497e5a9e5392',0,2021),('7d58436450a611ec84f9645d86dd6e62','2021-11-26',47,4,'Regular','P',0,0.0,0.0,0.0,0,8,1,NULL,'a95257c376af49b0a563199083367f8e',0,2021),('7d9a6e7a50a611ec9bcf645d86dd6e62','2021-11-26',47,4,'Regular','P',0,0.0,0.0,0.0,0,9,1,NULL,'793f481b10664b089d37f3f10e7ebdd0',0,2021),('7dbe8ba450a611ec88dd645d86dd6e62','2021-11-26',47,4,'Regular','P',0,0.0,0.0,0.0,0,11,1,NULL,'9e6b97a537794d9b96916d91a0fe37b0',0,2021),('7de4ad2450a611ecad3f645d86dd6e62','2021-11-29',48,0,'Regular','P',0,0.0,0.0,0.0,0,2,1,NULL,'f031d92d223f40d5a1adafae8a02e9b7',0,2021),('7e1b613450a611ec91a8645d86dd6e62','2021-11-29',48,0,'Regular','P',0,0.0,0.0,0.0,0,1,1,NULL,'fa8991279783497f9fc3f6413bd4b91e',0,2021),('7e28e3f450a611ec8af9645d86dd6e62','2021-11-29',48,0,'Regular','P',0,0.0,0.0,0.0,0,3,1,NULL,'9959593b21f042e0843ca543a8327bd1',0,2021),('7e72958a50a611ec8d9d645d86dd6e62','2021-11-29',48,0,'Regular','P',0,0.0,0.0,0.0,0,4,1,NULL,'758cbbf77d3d43e0bec708441e53d612',0,2021),('7ec6854050a611ec927b645d86dd6e62','2021-11-29',48,0,'Regular','P',0,0.0,0.0,0.0,0,5,1,NULL,'49e2cf2e88934575a16b128355b19b5a',0,2021),('7eefb45850a611ecae60645d86dd6e62','2021-11-29',48,0,'Regular','P',0,0.0,0.0,0.0,0,6,1,NULL,'5ab429dd1a294d259e992bfa8800edc9',0,2021),('7f370fd850a611ec9832645d86dd6e62','2021-11-29',48,0,'Regular','P',0,0.0,0.0,0.0,0,7,1,NULL,'45f02114dd3340bdb9f717606610222f',0,2021),('7f5159a650a611ecac3e645d86dd6e62','2021-11-29',48,0,'Regular','P',0,0.0,0.0,0.0,0,8,1,NULL,'605c545dc42b4560a045436ea8cca701',0,2021),('7f76949e50a611ecbd98645d86dd6e62','2021-11-29',48,0,'Regular','P',0,0.0,0.0,0.0,0,9,1,NULL,'a79b76ad24e847749f8ae3a7ed67b334',0,2021),('7f8bca9850a611ecb224645d86dd6e62','2021-11-29',48,0,'Regular','P',0,0.0,0.0,0.0,0,11,1,NULL,'53c4d2d369dc4df4a85a2baf5df2c03e',0,2021),('80caedfa4ccc11ec8323645d86dd6e62','2021-11-22',47,0,'Regular','P',0,0.0,0.0,0.0,0,2,1,NULL,'793839fa6911449ca005d2981ce6e321',0,2021),('80e1c9ec4ccc11ecaee8645d86dd6e62','2021-11-22',47,0,'Regular','P',0,0.0,0.0,0.0,0,3,1,NULL,'782a5a9a66784bcdb82ddf5c035a5736',0,2021),('8105ebb64ccc11ec8cb9645d86dd6e62','2021-11-22',47,0,'Regular','P',0,0.0,0.0,0.0,0,4,1,NULL,'b594e3f6cf53438b8d27113e5a53dd4b',0,2021),('823748ee4ccc11eca164645d86dd6e62','2021-11-22',47,0,'Regular','P',0,0.0,0.0,0.0,0,5,1,NULL,'7791cdfa8aa1418caff7bd05e600a818',0,2021),('826df6784ccc11ecac46645d86dd6e62','2021-11-22',47,0,'Regular','P',0,0.0,0.0,0.0,0,6,1,NULL,'3222850f7c5a41189032765e31a48653',0,2021),('82c1801c4ccc11ec83f5645d86dd6e62','2021-11-22',47,0,'Regular','P',0,0.0,0.0,0.0,0,7,1,NULL,'41d480089ea84926a1eb3b9f3e5a4a39',0,2021),('8325bcfa4ccc11ecaf92645d86dd6e62','2021-11-22',47,0,'Regular','P',0,0.0,0.0,0.0,0,8,1,NULL,'1c07f34559364523b55aec3c018ccc07',0,2021),('838bcc8c4ccc11eca96d645d86dd6e62','2021-11-22',47,0,'Regular','P',0,0.0,0.0,0.0,0,9,1,NULL,'415f9016123a428dae3ca2c1941aee3c',0,2021),('867f41a44ccc11ec85f1645d86dd6e62','2021-11-23',47,1,'Regular','P',0,0.0,0.0,0.0,0,2,1,NULL,'dd5769f709144c749bfa48037170c82e',0,2021),('870543804ccc11ecae9b645d86dd6e62','2021-11-23',47,1,'Regular','P',0,0.0,0.0,0.0,0,1,1,NULL,'9742f3bd36284213b86f4008390274a0',0,2021),('8757ca144ccc11ec964a645d86dd6e62','2021-11-23',47,1,'Regular','P',0,0.0,0.0,0.0,0,3,1,NULL,'2b8cc78828274502b77f51d002b10e71',0,2021),('8766dcb64ccc11ec9a8d645d86dd6e62','2021-11-23',47,1,'Regular','P',0,0.0,0.0,0.0,0,4,1,NULL,'ebe0dd545bbf488a882bfcb7a8db90ab',0,2021),('87ae72f44ccc11ec8ce8645d86dd6e62','2021-11-23',47,1,'Regular','P',0,0.0,0.0,0.0,0,5,1,NULL,'d9c6453974af49b08a0cf6f3876b1645',0,2021),('887376924ccc11ecad33645d86dd6e62','2021-11-23',47,1,'Regular','P',0,0.0,0.0,0.0,0,6,1,NULL,'4c3e6144950b41899588eb52337d8f01',0,2021),('88e4db2c4ccc11ec8922645d86dd6e62','2021-11-23',47,1,'Regular','P',0,0.0,0.0,0.0,0,7,1,NULL,'1727666f22334c818d226fb402a54935',0,2021),('88ed7d344ccc11ec9ad4645d86dd6e62','2021-11-23',47,1,'Regular','P',0,0.0,0.0,0.0,0,8,1,NULL,'153ba675e0974fb09ba1cc1dad74346f',0,2021),('896a805a4ccc11ecb4d0645d86dd6e62','2021-11-23',47,1,'Regular','P',0,0.0,0.0,0.0,0,9,1,NULL,'5c4aac02db9e423a805f7cd132d7ead6',0,2021),('89b3e2904ccc11eca258645d86dd6e62','2021-11-23',47,1,'Regular','P',0,0.0,0.0,0.0,0,11,1,NULL,'a87d8856b91f48608f20730470c70efa',0,2021),('9a12f9b4427d11ecbb78645d86dd6e62','2021-11-11',45,3,'Regular','P',0,0.0,0.0,0.0,0,5,1,NULL,'b70e6fe7de944aa3aae0c5d682ad360e',0,2021),('a308242441f811ec84d0645d86dd6e62','2021-11-10',45,2,'Regular','P',0,0.0,0.0,0.0,0,1,1,NULL,'896e7b8188084677b7c7bb27ea4f5446',0,2021),('a3ace98041f811ecafde645d86dd6e62','2021-11-10',45,2,'Regular','P',0,0.0,0.0,0.0,0,2,1,NULL,'d5dd6cde445a4bf997846f5a38087123',0,2021),('a57c16c2434a11eca139645d86dd6e62','2021-11-12',45,4,'Regular','P',0,0.0,0.0,0.0,0,2,1,NULL,'4efdafd00c2541d3b6946c3bb246d16c',0,2021),('a58e2164434a11ecb286645d86dd6e62','2021-11-12',45,4,'Regular','P',0,0.0,0.0,0.0,0,1,1,NULL,'f920b850464246c7a94fe71f1abdf22b',0,2021),('a5a6fc48434a11eca04c645d86dd6e62','2021-11-12',45,4,'Regular','P',0,0.0,0.0,0.0,0,3,1,NULL,'603c85894be441da949817493f46e32e',0,2021),('a76ea826434a11ec8d0c645d86dd6e62','2021-11-12',45,4,'Regular','P',0,0.0,0.0,0.0,0,5,1,NULL,'19d48a80d17a495f9b2409eb441d16a8',0,2021),('a78e5f70434a11ecbc05645d86dd6e62','2021-11-12',45,4,'Regular','P',0,0.0,0.0,0.0,0,6,1,NULL,'c7c53bf52df748da877d51e04e3e04f5',0,2021),('a84325b0434a11ecadf0645d86dd6e62','2021-11-12',45,4,'Regular','P',0,0.0,0.0,0.0,0,7,1,NULL,'3d778dfc85114efb890043a924442e98',0,2021),('a8552d6e434a11ec813a645d86dd6e62','2021-11-12',45,4,'Regular','P',0,0.0,0.0,0.0,0,8,1,NULL,'c5c680a9a7674e768ff7ba126ee786da',0,2021),('a8f2f5d2434a11eca7de645d86dd6e62','2021-11-12',45,4,'Regular','P',0,0.0,0.0,0.0,0,9,1,NULL,'3ee639bef6aa491d9841f1228e913073',0,2021),('b526616241e411ecbf2f645d86dd6e62','2021-11-10',45,2,'Regular','P',0,0.0,0.0,0.0,0,5,1,NULL,'71b62fbb31234467ad0206be7d3c3bfe',0,2021),('b53a093e484b11eca315645d86dd6e62','2021-11-18',46,3,'Regular','P',0,0.0,0.0,0.0,0,3,1,NULL,'916496b489fe477d9d4ef38353a403da',0,2021),('b88013a441e411ecb4c9645d86dd6e62','2021-11-10',45,2,'Regular','P',0,0.0,0.0,0.0,0,10,1,NULL,'03d222c7da7c4bfaab689976d9f7a134',0,2021),('b9b8eadc41e411ec91e8645d86dd6e62','2021-11-10',45,2,'Regular','P',0,0.0,0.0,0.0,0,9,1,NULL,'bdeeafc6bd374e669cd62f7208960a08',0,2021),('bab8608a41e411ecbf6b645d86dd6e62','2021-11-10',45,2,'Regular','P',0,0.0,0.0,0.0,0,7,1,NULL,'8481f07c68c24059b4700d03d825c35f',0,2021),('bb828c1241e411ec9737645d86dd6e62','2021-11-10',45,2,'Regular','P',0,0.0,0.0,0.0,0,8,1,NULL,'0f334823fc4d44769765014f35bb0e6c',0,2021),('bcb8d95841e411ecad4a645d86dd6e62','2021-11-10',45,2,'Regular','P',0,0.0,0.0,0.0,0,6,1,NULL,'005dab7d829a45baa4a65a97443af2d0',0,2021),('bf6dd31c484b11ec9a5e645d86dd6e62','2021-11-18',46,3,'Regular','P',0,0.0,0.0,0.0,0,4,1,NULL,'3e14ce9ef63542f4b563efed5ff5d820',0,2021),('c01bc154484b11ecaad7645d86dd6e62','2021-11-18',46,3,'Regular','P',0,0.0,0.0,0.0,0,5,1,NULL,'4d35a8480d844631ac6c8b7df7e55c97',0,2021),('c17abb54484b11ec8d5b645d86dd6e62','2021-11-18',46,3,'Regular','P',0,0.0,0.0,0.0,0,6,1,NULL,'f2163a57a5e24bb9b177f2541954ba86',0,2021),('c29c9eb6484b11ecbd78645d86dd6e62','2021-11-18',46,3,'Regular','P',0,0.0,0.0,0.0,0,7,1,NULL,'0d1c1dbad5644f23be6490ce3323e25a',0,2021),('c4b5be62484b11ecb3f1645d86dd6e62','2021-11-18',46,3,'Regular','P',0,0.0,0.0,0.0,0,8,1,NULL,'2913bb855af14828956fb3ab8e7a19a6',0,2021),('c5e87280484b11ecbfa5645d86dd6e62','2021-11-18',46,3,'Regular','P',0,0.0,0.0,0.0,0,9,1,NULL,'ba9b17527d384ced8a5e5e1d99fea861',0,2021),('c72205f8484b11eca614645d86dd6e62','2021-11-18',46,3,'Regular','P',0,0.0,0.0,0.0,0,11,1,NULL,'6b52036632fd4c1e93afd232f938defe',0,2021),('d072fb68437411eca3af645d86dd6e62','2021-11-12',45,4,'Regular','P',0,0.0,0.0,0.0,0,4,1,NULL,'cd0b9e2a942541f6a22099224c528653',0,2021),('dc9fe5f442a911ec8131645d86dd6e62','2021-11-11',45,3,'Regular','P',0,0.0,0.0,0.0,0,10,1,NULL,'f771d2db94f9468ab57e8ff8f8c195fc',0,2021),('e2e6a31a4b2411eca91d645d86dd6e62','2021-11-22',47,0,'Regular','P',0,0.0,0.0,0.0,0,1,1,NULL,'a33572ba2b2a470ea5e48dea07cf5860',0,2021),('e424592e4b2711eca89c645d86dd6e62','2021-11-22',47,0,'Regular','P',0,0.0,0.0,0.0,0,11,1,NULL,'aa082fb572664f1c9a0205e8a41df7f2',0,2021),('f2a4c4c8434d11ecbdd1645d86dd6e62','2021-11-12',45,4,'Regular','P',0,0.0,0.0,0.0,0,11,1,NULL,'019994e6fa81456a8fdd0bf87aafb87e',0,2021);
/*!40000 ALTER TABLE `att_payloadpaycode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_payloadpunch`
--

DROP TABLE IF EXISTS `att_payloadpunch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_payloadpunch` (
  `uuid` varchar(36) NOT NULL,
  `att_date` date DEFAULT NULL,
  `correct_state` varchar(3) DEFAULT NULL,
  `emp_id` int(11) NOT NULL,
  `orig_id` int(11) DEFAULT NULL,
  `skd_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  KEY `att_payloadpunch_emp_id_053da2f0_fk_personnel_employee_id` (`emp_id`),
  KEY `att_payloadpunch_orig_id_16b26416_fk_iclock_transaction_id` (`orig_id`),
  KEY `att_payloadpunch_skd_id_17596d82` (`skd_id`),
  CONSTRAINT `att_payloadpunch_emp_id_053da2f0_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `att_payloadpunch_orig_id_16b26416_fk_iclock_transaction_id` FOREIGN KEY (`orig_id`) REFERENCES `iclock_transaction` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_payloadpunch`
--

LOCK TABLES `att_payloadpunch` WRITE;
/*!40000 ALTER TABLE `att_payloadpunch` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_payloadpunch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_payloadtimecard`
--

DROP TABLE IF EXISTS `att_payloadtimecard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `present` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `att_payloadtimecard_emp_id_att_date_time_table_id_9df16bc5_uniq` (`emp_id`,`att_date`,`time_table_id`),
  KEY `att_payloadtimecard_att_date_48c1dc00` (`att_date`),
  KEY `att_payloadtimecard_time_table_id_6e0b0137_fk_att_timei` (`time_table_id`),
  CONSTRAINT `att_payloadtimecard_emp_id_47caeab4_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `att_payloadtimecard_time_table_id_6e0b0137_fk_att_timei` FOREIGN KEY (`time_table_id`) REFERENCES `att_timeinterval` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_payloadtimecard`
--

LOCK TABLES `att_payloadtimecard` WRITE;
/*!40000 ALTER TABLE `att_payloadtimecard` DISABLE KEYS */;
INSERT INTO `att_payloadtimecard` VALUES ('005dab7d829a45baa4a65a97443af2d0','2021-11-10',45,2,1,'','2021-11-10 00:00:00.000000','2021-11-11 00:00:00.000000',1.0,'2021-11-10 09:54:24.000000','2021-11-10 13:12:08.000000',NULL,NULL,0,6,NULL,0),('019994e6fa81456a8fdd0bf87aafb87e','2021-11-12',45,4,1,'','2021-11-12 00:00:00.000000','2021-11-13 00:00:00.000000',1.0,'2021-11-12 07:02:30.000000','2021-11-12 08:17:41.000000',NULL,NULL,0,11,NULL,0),('03d222c7da7c4bfaab689976d9f7a134','2021-11-10',45,2,1,'','2021-11-10 00:00:00.000000','2021-11-11 00:00:00.000000',1.0,'2021-11-10 09:54:47.000000','2021-11-10 13:11:58.000000',NULL,NULL,0,10,NULL,0),('04609902d09d46db92d77a5d9fba1e3e','2021-11-15',46,0,1,'','2021-11-15 00:00:00.000000','2021-11-16 00:00:00.000000',1.0,'2021-11-15 07:13:26.000000','2021-11-15 15:55:25.000000',NULL,NULL,0,8,NULL,0),('05857b25258c4d11b350d147b052640a','2021-11-15',46,0,1,'','2021-11-15 00:00:00.000000','2021-11-16 00:00:00.000000',1.0,'2021-11-15 07:13:08.000000','2021-11-15 15:55:07.000000',NULL,NULL,0,2,NULL,0),('07f132f1f85344c5bd142320e4451932','2021-11-26',47,4,1,'','2021-11-26 00:00:00.000000','2021-11-27 00:00:00.000000',1.0,'2021-11-26 07:06:08.000000','2021-11-26 18:09:59.000000',NULL,NULL,0,6,NULL,0),('0d1c1dbad5644f23be6490ce3323e25a','2021-11-18',46,3,1,'','2021-11-18 00:00:00.000000','2021-11-19 00:00:00.000000',1.0,'2021-11-18 07:09:27.000000','2021-11-18 16:44:36.000000',NULL,NULL,0,7,NULL,0),('0e817e7dab75477b8681d1605cee568b','2021-11-16',46,1,1,'','2021-11-16 00:00:00.000000','2021-11-17 00:00:00.000000',1.0,'2021-11-16 07:02:37.000000','2021-11-16 16:14:37.000000',NULL,NULL,0,7,NULL,0),('0f334823fc4d44769765014f35bb0e6c','2021-11-10',45,2,1,'','2021-11-10 00:00:00.000000','2021-11-11 00:00:00.000000',1.0,'2021-11-10 09:54:42.000000','2021-11-10 13:12:06.000000',NULL,NULL,0,8,NULL,0),('1360aa7da9e34cedb8d47acdcac25663','2021-11-09',45,1,1,'','2021-11-09 00:00:00.000000','2021-11-10 00:00:00.000000',1.0,'2021-11-09 14:27:19.000000',NULL,NULL,NULL,0,10,NULL,0),('153ba675e0974fb09ba1cc1dad74346f','2021-11-23',47,1,1,'','2021-11-23 00:00:00.000000','2021-11-24 00:00:00.000000',1.0,'2021-11-23 07:06:35.000000','2021-11-23 16:35:25.000000',NULL,NULL,0,8,NULL,0),('1727666f22334c818d226fb402a54935','2021-11-23',47,1,1,'','2021-11-23 00:00:00.000000','2021-11-24 00:00:00.000000',1.0,'2021-11-23 07:06:33.000000','2021-11-23 16:35:23.000000',NULL,NULL,0,7,NULL,0),('19d48a80d17a495f9b2409eb441d16a8','2021-11-12',45,4,1,'','2021-11-12 00:00:00.000000','2021-11-13 00:00:00.000000',1.0,'2021-11-12 07:02:20.000000',NULL,NULL,NULL,0,5,NULL,0),('1b7e7811aad84d7385c639a0797f2915','2021-11-25',47,3,1,'','2021-11-25 00:00:00.000000','2021-11-26 00:00:00.000000',1.0,'2021-11-25 07:03:22.000000','2021-11-25 16:27:30.000000',NULL,NULL,0,9,NULL,0),('1c07f34559364523b55aec3c018ccc07','2021-11-22',47,0,1,'','2021-11-22 00:00:00.000000','2021-11-23 00:00:00.000000',1.0,'2021-11-22 08:05:17.000000','2021-11-22 16:11:56.000000',NULL,NULL,0,8,NULL,0),('254a84a1e92c438ca052be923aca2a13','2021-11-15',46,0,1,'','2021-11-15 00:00:00.000000','2021-11-16 00:00:00.000000',1.0,'2021-11-15 07:13:12.000000','2021-11-15 16:01:05.000000',NULL,NULL,0,3,NULL,0),('25f6a7dc8bf446e686928ec23c1e3116','2021-11-11',45,3,1,'','2021-11-11 00:00:00.000000','2021-11-12 00:00:00.000000',1.0,'2021-11-11 07:21:14.000000','2021-11-11 16:07:34.000000',NULL,NULL,0,6,NULL,0),('2913bb855af14828956fb3ab8e7a19a6','2021-11-18',46,3,1,'','2021-11-18 00:00:00.000000','2021-11-19 00:00:00.000000',1.0,'2021-11-18 07:09:29.000000','2021-11-18 16:44:38.000000',NULL,NULL,0,8,NULL,0),('2b8cc78828274502b77f51d002b10e71','2021-11-23',47,1,1,'','2021-11-23 00:00:00.000000','2021-11-24 00:00:00.000000',1.0,'2021-11-23 07:06:23.000000','2021-11-23 16:35:10.000000',NULL,NULL,0,3,NULL,0),('2beccc8862d8402689d2025f67e850ab','2021-11-09',45,1,1,'','2021-11-09 00:00:00.000000','2021-11-10 00:00:00.000000',1.0,'2021-11-09 14:27:30.000000',NULL,NULL,NULL,0,6,NULL,0),('31ce892242ac4732b3798b9820ace701','2021-11-09',45,1,1,'','2021-11-09 00:00:00.000000','2021-11-10 00:00:00.000000',1.0,'2021-11-09 14:27:12.000000',NULL,NULL,NULL,0,2,NULL,0),('3222850f7c5a41189032765e31a48653','2021-11-22',47,0,1,'','2021-11-22 00:00:00.000000','2021-11-23 00:00:00.000000',1.0,'2021-11-22 08:05:12.000000','2021-11-22 16:11:53.000000',NULL,NULL,0,6,NULL,0),('3d778dfc85114efb890043a924442e98','2021-11-12',45,4,1,'','2021-11-12 00:00:00.000000','2021-11-13 00:00:00.000000',1.0,'2021-11-12 07:02:24.000000',NULL,NULL,NULL,0,7,NULL,0),('3e14ce9ef63542f4b563efed5ff5d820','2021-11-18',46,3,1,'','2021-11-18 00:00:00.000000','2021-11-19 00:00:00.000000',1.0,'2021-11-18 07:09:19.000000','2021-11-18 16:44:29.000000',NULL,NULL,0,4,NULL,0),('3ee639bef6aa491d9841f1228e913073','2021-11-12',45,4,1,'','2021-11-12 00:00:00.000000','2021-11-13 00:00:00.000000',1.0,'2021-11-12 07:02:28.000000',NULL,NULL,NULL,0,9,NULL,0),('415f9016123a428dae3ca2c1941aee3c','2021-11-22',47,0,1,'','2021-11-22 00:00:00.000000','2021-11-23 00:00:00.000000',1.0,'2021-11-22 08:05:21.000000','2021-11-22 16:11:58.000000',NULL,NULL,0,9,NULL,0),('41d480089ea84926a1eb3b9f3e5a4a39','2021-11-22',47,0,1,'','2021-11-22 00:00:00.000000','2021-11-23 00:00:00.000000',1.0,'2021-11-22 08:05:14.000000','2021-11-22 16:11:55.000000',NULL,NULL,0,7,NULL,0),('4244288bd6654460a67b9e0184938bbd','2021-11-15',46,0,1,'','2021-11-15 00:00:00.000000','2021-11-16 00:00:00.000000',1.0,'2021-11-15 07:13:25.000000','2021-11-15 15:55:23.000000',NULL,NULL,0,7,NULL,0),('45f02114dd3340bdb9f717606610222f','2021-11-29',48,0,1,'','2021-11-29 00:00:00.000000','2021-11-30 00:00:00.000000',1.0,'2021-11-29 07:00:13.000000',NULL,NULL,NULL,0,7,NULL,0),('49e2cf2e88934575a16b128355b19b5a','2021-11-29',48,0,1,'','2021-11-29 00:00:00.000000','2021-11-30 00:00:00.000000',1.0,'2021-11-29 07:00:09.000000',NULL,NULL,NULL,0,5,NULL,0),('4aeed5daa7764c3a9781700564a68c2c','2021-11-25',47,3,1,'','2021-11-25 00:00:00.000000','2021-11-26 00:00:00.000000',1.0,'2021-11-25 07:02:54.000000','2021-11-25 16:27:36.000000',NULL,NULL,0,1,NULL,0),('4c3e6144950b41899588eb52337d8f01','2021-11-23',47,1,1,'','2021-11-23 00:00:00.000000','2021-11-24 00:00:00.000000',1.0,'2021-11-23 07:06:31.000000','2021-11-23 16:35:21.000000',NULL,NULL,0,6,NULL,0),('4c9801f9234949a48e4a312dd35a1441','2021-11-26',47,4,1,'','2021-11-26 00:00:00.000000','2021-11-27 00:00:00.000000',1.0,'2021-11-26 07:06:03.000000','2021-11-26 18:09:49.000000',NULL,NULL,0,4,NULL,0),('4d35a8480d844631ac6c8b7df7e55c97','2021-11-18',46,3,1,'','2021-11-18 00:00:00.000000','2021-11-19 00:00:00.000000',1.0,'2021-11-18 07:09:22.000000','2021-11-18 16:44:31.000000',NULL,NULL,0,5,NULL,0),('4efdafd00c2541d3b6946c3bb246d16c','2021-11-12',45,4,1,'','2021-11-12 00:00:00.000000','2021-11-13 00:00:00.000000',1.0,'2021-11-12 07:02:13.000000',NULL,NULL,NULL,0,2,NULL,0),('52a080e42cc840739dc522ab319710ae','2021-11-25',47,3,1,'','2021-11-25 00:00:00.000000','2021-11-26 00:00:00.000000',1.0,'2021-11-25 07:03:09.000000','2021-11-25 16:27:24.000000',NULL,NULL,0,6,NULL,0),('53c4d2d369dc4df4a85a2baf5df2c03e','2021-11-29',48,0,1,'','2021-11-29 00:00:00.000000','2021-11-30 00:00:00.000000',1.0,'2021-11-29 07:00:21.000000',NULL,NULL,NULL,0,11,NULL,0),('553ccdeaf14b4f33a01167d8c5fd0fb8','2021-11-26',47,4,1,'','2021-11-26 00:00:00.000000','2021-11-27 00:00:00.000000',1.0,'2021-11-26 07:06:05.000000','2021-11-26 18:09:56.000000',NULL,NULL,0,5,NULL,0),('5a9595fee4df4afe90766d63c82e6785','2021-11-25',47,3,1,'','2021-11-25 00:00:00.000000','2021-11-26 00:00:00.000000',1.0,'2021-11-25 07:03:19.000000','2021-11-25 16:27:28.000000',NULL,NULL,0,8,NULL,0),('5ab429dd1a294d259e992bfa8800edc9','2021-11-29',48,0,1,'','2021-11-29 00:00:00.000000','2021-11-30 00:00:00.000000',1.0,'2021-11-29 07:00:11.000000',NULL,NULL,NULL,0,6,NULL,0),('5c4aac02db9e423a805f7cd132d7ead6','2021-11-23',47,1,1,'','2021-11-23 00:00:00.000000','2021-11-24 00:00:00.000000',1.0,'2021-11-23 07:06:38.000000','2021-11-23 16:35:27.000000',NULL,NULL,0,9,NULL,0),('603c85894be441da949817493f46e32e','2021-11-12',45,4,1,'','2021-11-12 00:00:00.000000','2021-11-13 00:00:00.000000',1.0,'2021-11-12 07:02:16.000000',NULL,NULL,NULL,0,3,NULL,0),('605c545dc42b4560a045436ea8cca701','2021-11-29',48,0,1,'','2021-11-29 00:00:00.000000','2021-11-30 00:00:00.000000',1.0,'2021-11-29 07:00:16.000000',NULL,NULL,NULL,0,8,NULL,0),('61dd3941109245f9a5b49727a85bc0ef','2021-11-09',45,1,1,'','2021-11-09 00:00:00.000000','2021-11-10 00:00:00.000000',1.0,'2021-11-09 14:27:26.000000',NULL,NULL,NULL,0,9,NULL,0),('622576a64b0041dcbcb47c72bface19c','2021-11-24',47,2,1,'','2021-11-24 00:00:00.000000','2021-11-25 00:00:00.000000',1.0,'2021-11-24 07:02:29.000000','2021-11-24 16:01:17.000000',NULL,NULL,0,9,NULL,0),('64ad1e5afae743b9bc130d28a496731a','2021-11-11',45,3,1,'','2021-11-11 00:00:00.000000','2021-11-12 00:00:00.000000',1.0,'2021-11-11 12:44:19.000000','2021-11-11 16:07:44.000000',NULL,NULL,0,11,NULL,0),('6b52036632fd4c1e93afd232f938defe','2021-11-18',46,3,1,'','2021-11-18 00:00:00.000000','2021-11-19 00:00:00.000000',1.0,'2021-11-18 07:09:34.000000','2021-11-18 16:44:43.000000',NULL,NULL,0,11,NULL,0),('6cbd3d16e3c0468eb706351f26e49513','2021-11-16',46,1,1,'','2021-11-16 00:00:00.000000','2021-11-17 00:00:00.000000',1.0,'2021-11-16 07:02:50.000000','2021-11-16 16:14:32.000000',NULL,NULL,0,2,NULL,0),('71b62fbb31234467ad0206be7d3c3bfe','2021-11-10',45,2,1,'','2021-11-10 00:00:00.000000','2021-11-11 00:00:00.000000',1.0,'2021-11-10 07:15:06.000000','2021-11-10 13:11:55.000000',NULL,NULL,0,5,NULL,0),('71e55377d17441078205a15f417265c6','2021-11-15',46,0,1,'','2021-11-15 00:00:00.000000','2021-11-16 00:00:00.000000',1.0,'2021-11-15 07:13:10.000000','2021-11-15 16:01:01.000000',NULL,NULL,0,1,NULL,0),('72111f9ddddb4e62a5d40928687bead3','2021-11-18',46,3,1,'','2021-11-18 00:00:00.000000','2021-11-19 00:00:00.000000',1.0,'2021-11-18 07:09:11.000000','2021-11-18 16:42:36.000000',NULL,NULL,0,2,NULL,0),('7548520b5725475abdca7bbbd4e5354c','2021-11-16',46,1,1,'','2021-11-16 00:00:00.000000','2021-11-17 00:00:00.000000',1.0,'2021-11-16 07:02:40.000000','2021-11-16 16:14:40.000000',NULL,NULL,0,8,NULL,0),('758cbbf77d3d43e0bec708441e53d612','2021-11-29',48,0,1,'','2021-11-29 00:00:00.000000','2021-11-30 00:00:00.000000',1.0,'2021-11-29 07:00:06.000000',NULL,NULL,NULL,0,4,NULL,0),('7791cdfa8aa1418caff7bd05e600a818','2021-11-22',47,0,1,'','2021-11-22 00:00:00.000000','2021-11-23 00:00:00.000000',1.0,'2021-11-22 16:11:50.000000',NULL,NULL,NULL,0,5,NULL,0),('782a5a9a66784bcdb82ddf5c035a5736','2021-11-22',47,0,1,'','2021-11-22 00:00:00.000000','2021-11-23 00:00:00.000000',1.0,'2021-11-22 07:16:19.000000','2021-11-22 16:11:45.000000',NULL,NULL,0,3,NULL,0),('793839fa6911449ca005d2981ce6e321','2021-11-22',47,0,1,'','2021-11-22 00:00:00.000000','2021-11-23 00:00:00.000000',1.0,'2021-11-22 07:16:14.000000','2021-11-22 16:11:42.000000',NULL,NULL,0,2,NULL,0),('793f481b10664b089d37f3f10e7ebdd0','2021-11-26',47,4,1,'','2021-11-26 00:00:00.000000','2021-11-27 00:00:00.000000',1.0,'2021-11-26 07:06:14.000000','2021-11-26 18:10:05.000000',NULL,NULL,0,9,NULL,0),('794c1659f9ee408b8a7ab7247d2c28c0','2021-11-26',47,4,1,'','2021-11-26 00:00:00.000000','2021-11-27 00:00:00.000000',1.0,'2021-11-26 07:05:57.000000','2021-11-26 18:09:42.000000',NULL,NULL,0,2,NULL,0),('7bbf535bbfa345db9e33c04939940639','2021-11-24',47,2,1,'','2021-11-24 00:00:00.000000','2021-11-25 00:00:00.000000',1.0,'2021-11-24 07:01:57.000000','2021-11-24 16:01:00.000000',NULL,NULL,0,2,NULL,0),('802c26680d8f4e7188e8be0eb009e5dc','2021-11-11',45,3,1,'','2021-11-11 00:00:00.000000','2021-11-12 00:00:00.000000',1.0,'2021-11-11 07:21:19.000000','2021-11-11 16:07:38.000000',NULL,NULL,0,8,NULL,0),('8481f07c68c24059b4700d03d825c35f','2021-11-10',45,2,1,'','2021-11-10 00:00:00.000000','2021-11-11 00:00:00.000000',1.0,'2021-11-10 09:54:39.000000','2021-11-10 13:12:04.000000',NULL,NULL,0,7,NULL,0),('85f1e7a4cacd4d1cbaf53f38d6a5b9de','2021-11-24',47,2,1,'','2021-11-24 00:00:00.000000','2021-11-25 00:00:00.000000',1.0,'2021-11-24 07:01:59.000000','2021-11-24 16:01:02.000000',NULL,NULL,0,1,NULL,0),('86da06ed8ba2494bb5f01baa7202cd59','2021-11-24',47,2,1,'','2021-11-24 00:00:00.000000','2021-11-25 00:00:00.000000',1.0,'2021-11-24 07:02:01.000000','2021-11-24 16:01:04.000000',NULL,NULL,0,3,NULL,0),('896e7b8188084677b7c7bb27ea4f5446','2021-11-10',45,2,1,'','2021-11-10 00:00:00.000000','2021-11-11 00:00:00.000000',1.0,'2021-11-10 07:14:54.000000','2021-11-10 15:34:34.000000',NULL,NULL,0,1,NULL,0),('8b18795b41e2417f94312bd72b2592b6','2021-11-15',46,0,1,'','2021-11-15 00:00:00.000000','2021-11-16 00:00:00.000000',1.0,'2021-11-15 07:13:22.000000','2021-11-15 16:01:13.000000',NULL,NULL,0,6,NULL,0),('8b3cb7c07cee4116a7a47c8c4c05ee25','2021-11-24',47,2,1,'','2021-11-24 00:00:00.000000','2021-11-25 00:00:00.000000',1.0,'2021-11-24 07:02:27.000000','2021-11-24 16:01:15.000000',NULL,NULL,0,8,NULL,0),('8f50d1e142e94e2793521a5f463adac6','2021-11-24',47,2,1,'','2021-11-24 00:00:00.000000','2021-11-25 00:00:00.000000',1.0,'2021-11-24 07:02:03.000000','2021-11-24 16:01:06.000000',NULL,NULL,0,4,NULL,0),('916496b489fe477d9d4ef38353a403da','2021-11-18',46,3,1,'','2021-11-18 00:00:00.000000','2021-11-19 00:00:00.000000',1.0,'2021-11-18 07:09:16.000000','2021-11-18 16:44:12.000000',NULL,NULL,0,3,NULL,0),('9287878d44a74926904ad17fa3628032','2021-11-16',46,1,1,'','2021-11-16 00:00:00.000000','2021-11-17 00:00:00.000000',1.0,'2021-11-16 07:02:35.000000','2021-11-16 16:14:34.000000',NULL,NULL,0,6,NULL,0),('96a0321ee9c64ab3af64852b54e8d6e5','2021-11-26',47,4,1,'','2021-11-26 00:00:00.000000','2021-11-27 00:00:00.000000',1.0,'2021-11-26 07:05:58.000000','2021-11-26 18:09:47.000000',NULL,NULL,0,3,NULL,0),('9742f3bd36284213b86f4008390274a0','2021-11-23',47,1,1,'','2021-11-23 00:00:00.000000','2021-11-24 00:00:00.000000',1.0,'2021-11-23 07:06:21.000000','2021-11-23 16:35:07.000000',NULL,NULL,0,1,NULL,0),('9959593b21f042e0843ca543a8327bd1','2021-11-29',48,0,1,'','2021-11-29 00:00:00.000000','2021-11-30 00:00:00.000000',1.0,'2021-11-29 07:00:04.000000',NULL,NULL,NULL,0,3,NULL,0),('99a4a4e0ff81423da17c2340b8cdf3db','2021-11-09',45,1,1,'','2021-11-09 00:00:00.000000','2021-11-10 00:00:00.000000',1.0,'2021-11-09 14:27:16.000000',NULL,NULL,NULL,0,4,NULL,0),('9e6b97a537794d9b96916d91a0fe37b0','2021-11-26',47,4,1,'','2021-11-26 00:00:00.000000','2021-11-27 00:00:00.000000',1.0,'2021-11-26 07:06:17.000000','2021-11-26 18:10:07.000000',NULL,NULL,0,11,NULL,0),('9edab3d5d3ea47dbbefeda55c44588bc','2021-11-15',46,0,1,'','2021-11-15 00:00:00.000000','2021-11-16 00:00:00.000000',1.0,'2021-11-15 07:13:20.000000','2021-11-15 15:55:18.000000',NULL,NULL,0,5,NULL,0),('a1404357b5a449f7bb1054e952066c22','2021-11-15',46,0,1,'','2021-11-15 00:00:00.000000','2021-11-16 00:00:00.000000',1.0,'2021-11-15 07:13:31.000000','2021-11-15 16:01:19.000000',NULL,NULL,0,11,NULL,0),('a2a6bdf198ef40388cf6e37a7989eadf','2021-11-10',45,2,1,'','2021-11-10 00:00:00.000000','2021-11-11 00:00:00.000000',1.0,'2021-11-10 07:15:01.000000','2021-11-10 13:16:19.000000',NULL,NULL,0,4,NULL,0),('a33572ba2b2a470ea5e48dea07cf5860','2021-11-22',47,0,1,'','2021-11-22 00:00:00.000000','2021-11-23 00:00:00.000000',1.0,'2021-11-22 07:16:17.000000',NULL,NULL,NULL,0,1,NULL,0),('a4347c9412ec4178b98cbab80a1bc454','2021-11-16',46,1,1,'','2021-11-16 00:00:00.000000','2021-11-17 00:00:00.000000',1.0,'2021-11-16 07:02:56.000000','2021-11-16 16:14:24.000000',NULL,NULL,0,3,NULL,0),('a79b76ad24e847749f8ae3a7ed67b334','2021-11-29',48,0,1,'','2021-11-29 00:00:00.000000','2021-11-30 00:00:00.000000',1.0,'2021-11-29 07:00:18.000000',NULL,NULL,NULL,0,9,NULL,0),('a7b34d93151540e28362b39ee6781c34','2021-11-11',45,3,1,'','2021-11-11 00:00:00.000000','2021-11-12 00:00:00.000000',1.0,'2021-11-11 07:21:21.000000','2021-11-11 16:07:40.000000',NULL,NULL,0,9,NULL,0),('a87d8856b91f48608f20730470c70efa','2021-11-23',47,1,1,'','2021-11-23 00:00:00.000000','2021-11-24 00:00:00.000000',1.0,'2021-11-23 07:06:40.000000','2021-11-23 16:35:30.000000',NULL,NULL,0,11,NULL,0),('a8d8a6cf569e43229f077dbe8a250beb','2021-11-24',47,2,1,'','2021-11-24 00:00:00.000000','2021-11-25 00:00:00.000000',1.0,'2021-11-24 07:02:19.000000','2021-11-24 16:01:08.000000',NULL,NULL,0,5,NULL,0),('a95257c376af49b0a563199083367f8e','2021-11-26',47,4,1,'','2021-11-26 00:00:00.000000','2021-11-27 00:00:00.000000',1.0,'2021-11-26 07:06:12.000000','2021-11-26 18:10:03.000000',NULL,NULL,0,8,NULL,0),('aa082fb572664f1c9a0205e8a41df7f2','2021-11-22',47,0,1,'','2021-11-22 00:00:00.000000','2021-11-23 00:00:00.000000',1.0,'2021-11-22 08:05:23.000000',NULL,NULL,NULL,0,11,NULL,0),('ad2146b444c04606a5e5d28753bfcda7','2021-11-11',45,3,1,'','2021-11-11 00:00:00.000000','2021-11-12 00:00:00.000000',1.0,'2021-11-11 07:21:16.000000','2021-11-11 16:07:36.000000',NULL,NULL,0,7,NULL,0),('b00ba0ca1bde404dbd4f2819a280d507','2021-11-25',47,3,1,'','2021-11-25 00:00:00.000000','2021-11-26 00:00:00.000000',1.0,'2021-11-25 07:03:07.000000','2021-11-25 16:27:41.000000',NULL,NULL,0,5,NULL,0),('b594e3f6cf53438b8d27113e5a53dd4b','2021-11-22',47,0,1,'','2021-11-22 00:00:00.000000','2021-11-23 00:00:00.000000',1.0,'2021-11-22 16:11:47.000000',NULL,NULL,NULL,0,4,NULL,0),('b70e6fe7de944aa3aae0c5d682ad360e','2021-11-11',45,3,1,'','2021-11-11 00:00:00.000000','2021-11-12 00:00:00.000000',1.0,'2021-11-11 07:21:09.000000',NULL,NULL,NULL,0,5,NULL,0),('b8ae7b2d8b2f4095a1e8adb4f39edb7e','2021-11-11',45,3,1,'','2021-11-11 00:00:00.000000','2021-11-12 00:00:00.000000',1.0,'2021-11-11 07:20:42.000000','2021-11-11 16:07:23.000000',NULL,NULL,0,1,NULL,0),('ba9b17527d384ced8a5e5e1d99fea861','2021-11-18',46,3,1,'','2021-11-18 00:00:00.000000','2021-11-19 00:00:00.000000',1.0,'2021-11-18 07:09:32.000000','2021-11-18 16:44:41.000000',NULL,NULL,0,9,NULL,0),('bad02a450b0a4efbb85f3a3e1478f0df','2021-11-09',45,1,1,'','2021-11-09 00:00:00.000000','2021-11-10 00:00:00.000000',1.0,'2021-11-09 14:21:06.000000','2021-11-09 15:27:10.000000',NULL,NULL,0,1,NULL,0),('bda5ffdffd0c436fb720c6a2e206e48a','2021-11-25',47,3,1,'','2021-11-25 00:00:00.000000','2021-11-26 00:00:00.000000',1.0,'2021-11-25 07:02:58.000000','2021-11-25 16:27:40.000000',NULL,NULL,0,4,NULL,0),('bdeeafc6bd374e669cd62f7208960a08','2021-11-10',45,2,1,'','2021-11-10 00:00:00.000000','2021-11-11 00:00:00.000000',1.0,'2021-11-10 09:54:44.000000','2021-11-10 13:12:01.000000',NULL,NULL,0,9,NULL,0),('bffbadc96d4149e69170ee707a7a9347','2021-11-24',47,2,1,'','2021-11-24 00:00:00.000000','2021-11-25 00:00:00.000000',1.0,'2021-11-24 07:02:31.000000','2021-11-24 16:01:20.000000',NULL,NULL,0,11,NULL,0),('c5c680a9a7674e768ff7ba126ee786da','2021-11-12',45,4,1,'','2021-11-12 00:00:00.000000','2021-11-13 00:00:00.000000',1.0,'2021-11-12 07:02:26.000000',NULL,NULL,NULL,0,8,NULL,0),('c5e34ad1ee8d41a5a4b7f5e61dc8ef64','2021-11-16',46,1,1,'','2021-11-16 00:00:00.000000','2021-11-17 00:00:00.000000',1.0,'2021-11-16 07:02:48.000000','2021-11-16 16:14:45.000000',NULL,NULL,0,11,NULL,0),('c7c53bf52df748da877d51e04e3e04f5','2021-11-12',45,4,1,'','2021-11-12 00:00:00.000000','2021-11-13 00:00:00.000000',1.0,'2021-11-12 07:02:22.000000',NULL,NULL,NULL,0,6,NULL,0),('ca4ccebccc474908a6343e9f74ca50ae','2021-11-25',47,3,1,'','2021-11-25 00:00:00.000000','2021-11-26 00:00:00.000000',1.0,'2021-11-25 07:02:45.000000','2021-11-25 16:27:34.000000',NULL,NULL,0,2,NULL,0),('ca58363ee5e747fa86267ae2c5cdcfc0','2021-11-25',47,3,1,'','2021-11-25 00:00:00.000000','2021-11-26 00:00:00.000000',1.0,'2021-11-25 07:03:37.000000','2021-11-25 16:27:32.000000',NULL,NULL,0,11,NULL,0),('cae9c07fdd1745679744a8b8f56acaeb','2021-11-09',45,1,1,'','2021-11-09 00:00:00.000000','2021-11-10 00:00:00.000000',1.0,'2021-11-09 14:27:28.000000',NULL,NULL,NULL,0,7,NULL,0),('cd0b9e2a942541f6a22099224c528653','2021-11-12',45,4,1,'','2021-11-12 00:00:00.000000','2021-11-13 00:00:00.000000',1.0,'2021-11-12 07:02:18.000000','2021-11-12 12:55:50.000000',NULL,NULL,0,4,NULL,0),('cdddca17103149189caad71078bb57bf','2021-11-25',47,3,1,'','2021-11-25 00:00:00.000000','2021-11-26 00:00:00.000000',1.0,'2021-11-25 07:02:56.000000','2021-11-25 16:27:38.000000',NULL,NULL,0,3,NULL,0),('d24ed603efc64fadb32d7ddc54f0214b','2021-11-16',46,1,1,'','2021-11-16 00:00:00.000000','2021-11-17 00:00:00.000000',1.0,'2021-11-16 07:02:42.000000','2021-11-16 16:14:42.000000',NULL,NULL,0,9,NULL,0),('d53ab4dc98aa4293a4c0c570bffcba8e','2021-11-15',46,0,1,'','2021-11-15 00:00:00.000000','2021-11-16 00:00:00.000000',1.0,'2021-11-15 07:13:28.000000','2021-11-15 16:01:16.000000',NULL,NULL,0,9,NULL,0),('d5dd6cde445a4bf997846f5a38087123','2021-11-10',45,2,1,'','2021-11-10 00:00:00.000000','2021-11-11 00:00:00.000000',1.0,'2021-11-10 07:14:57.000000','2021-11-10 15:34:37.000000',NULL,NULL,0,2,NULL,0),('d5fea8ef9e0d459bb1dbbb4a39f79a3c','2021-11-24',47,2,1,'','2021-11-24 00:00:00.000000','2021-11-25 00:00:00.000000',1.0,'2021-11-24 07:02:22.000000','2021-11-24 16:01:10.000000',NULL,NULL,0,6,NULL,0),('d9c6453974af49b08a0cf6f3876b1645','2021-11-23',47,1,1,'','2021-11-23 00:00:00.000000','2021-11-24 00:00:00.000000',1.0,'2021-11-23 07:06:28.000000','2021-11-23 16:35:19.000000',NULL,NULL,0,5,NULL,0),('dca720404fc146a7abf050be8491aaf4','2021-11-11',45,3,1,'','2021-11-11 00:00:00.000000','2021-11-12 00:00:00.000000',1.0,'2021-11-11 07:20:44.000000','2021-11-11 16:07:26.000000',NULL,NULL,0,3,NULL,0),('dcb5d8dff2f54db786c2c32d5ffc3cb3','2021-11-25',47,3,1,'','2021-11-25 00:00:00.000000','2021-11-26 00:00:00.000000',1.0,'2021-11-25 07:03:14.000000','2021-11-25 16:27:26.000000',NULL,NULL,0,7,NULL,0),('dd5769f709144c749bfa48037170c82e','2021-11-23',47,1,1,'','2021-11-23 00:00:00.000000','2021-11-24 00:00:00.000000',1.0,'2021-11-23 07:06:19.000000','2021-11-23 16:35:04.000000',NULL,NULL,0,2,NULL,0),('de8fd22cb4104f79ab68e3e85bb35d27','2021-11-10',45,2,1,'','2021-11-10 00:00:00.000000','2021-11-11 00:00:00.000000',1.0,'2021-11-10 07:14:59.000000','2021-11-10 15:01:49.000000',NULL,NULL,0,3,NULL,0),('e77832cfcdf04fd58d24dcf6d4aa9bbc','2021-11-24',47,2,1,'','2021-11-24 00:00:00.000000','2021-11-25 00:00:00.000000',1.0,'2021-11-24 07:02:24.000000','2021-11-24 16:01:13.000000',NULL,NULL,0,7,NULL,0),('ebe0dd545bbf488a882bfcb7a8db90ab','2021-11-23',47,1,1,'','2021-11-23 00:00:00.000000','2021-11-24 00:00:00.000000',1.0,'2021-11-23 07:06:26.000000','2021-11-23 16:35:15.000000',NULL,NULL,0,4,NULL,0),('ecd1ae1ddeb149a6a0ce497e5a9e5392','2021-11-26',47,4,1,'','2021-11-26 00:00:00.000000','2021-11-27 00:00:00.000000',1.0,'2021-11-26 07:06:10.000000','2021-11-26 18:10:01.000000',NULL,NULL,0,7,NULL,0),('ecfd78252239443b946ab68eb77737eb','2021-11-11',45,3,1,'','2021-11-11 00:00:00.000000','2021-11-12 00:00:00.000000',1.0,'2021-11-11 07:21:06.000000','2021-11-11 16:07:29.000000',NULL,NULL,0,4,NULL,0),('ef7cf0c71d9d4212a19125006bebbff3','2021-11-26',47,4,1,'','2021-11-26 00:00:00.000000','2021-11-27 00:00:00.000000',1.0,'2021-11-26 07:05:48.000000','2021-11-26 18:09:45.000000',NULL,NULL,0,1,NULL,0),('f031d92d223f40d5a1adafae8a02e9b7','2021-11-29',48,0,1,'','2021-11-29 00:00:00.000000','2021-11-30 00:00:00.000000',1.0,'2021-11-29 06:59:59.000000',NULL,NULL,NULL,0,2,NULL,0),('f0bb0a63d3464be28c0090fc43c2f0be','2021-11-18',46,3,1,'','2021-11-18 00:00:00.000000','2021-11-19 00:00:00.000000',1.0,'2021-11-18 07:09:13.000000','2021-11-18 16:25:01.000000',NULL,NULL,0,1,NULL,0),('f2163a57a5e24bb9b177f2541954ba86','2021-11-18',46,3,1,'','2021-11-18 00:00:00.000000','2021-11-19 00:00:00.000000',1.0,'2021-11-18 07:09:25.000000','2021-11-18 16:44:33.000000',NULL,NULL,0,6,NULL,0),('f4d1002f964240cdb47105004b4c146e','2021-11-09',45,1,1,'','2021-11-09 00:00:00.000000','2021-11-10 00:00:00.000000',1.0,'2021-11-09 14:27:22.000000',NULL,NULL,NULL,0,8,NULL,0),('f53b6c90052c484eb1f642f36ae31a51','2021-11-16',46,1,1,'','2021-11-16 00:00:00.000000','2021-11-17 00:00:00.000000',1.0,'2021-11-16 07:02:53.000000','2021-11-16 16:14:21.000000',NULL,NULL,0,1,NULL,0),('f60c95b6c629493bba8cc0ffebc3e52d','2021-11-16',46,1,1,'','2021-11-16 00:00:00.000000','2021-11-17 00:00:00.000000',1.0,'2021-11-16 07:03:04.000000','2021-11-16 16:14:29.000000',NULL,NULL,0,5,NULL,0),('f771d2db94f9468ab57e8ff8f8c195fc','2021-11-11',45,3,1,'','2021-11-11 00:00:00.000000','2021-11-12 00:00:00.000000',1.0,'2021-11-11 07:21:24.000000','2021-11-11 12:42:55.000000',NULL,NULL,0,10,NULL,0),('f920b850464246c7a94fe71f1abdf22b','2021-11-12',45,4,1,'','2021-11-12 00:00:00.000000','2021-11-13 00:00:00.000000',1.0,'2021-11-12 07:02:15.000000',NULL,NULL,NULL,0,1,NULL,0),('f973aa5bf252484dbdc36a548e3ea4c4','2021-11-16',46,1,1,'','2021-11-16 00:00:00.000000','2021-11-17 00:00:00.000000',1.0,'2021-11-16 07:03:02.000000','2021-11-16 16:14:27.000000',NULL,NULL,0,4,NULL,0),('fa8991279783497f9fc3f6413bd4b91e','2021-11-29',48,0,1,'','2021-11-29 00:00:00.000000','2021-11-30 00:00:00.000000',1.0,'2021-11-29 07:00:02.000000',NULL,NULL,NULL,0,1,NULL,0),('fabb79d9917c4899b973b547429d67fb','2021-11-15',46,0,1,'','2021-11-15 00:00:00.000000','2021-11-16 00:00:00.000000',1.0,'2021-11-15 07:13:14.000000','2021-11-15 16:01:08.000000',NULL,NULL,0,4,NULL,0),('fbf876b3e98646378c0932b77076ed9c','2021-11-11',45,3,1,'','2021-11-11 00:00:00.000000','2021-11-12 00:00:00.000000',1.0,'2021-11-11 07:20:40.000000','2021-11-11 16:07:19.000000',NULL,NULL,0,2,NULL,0),('fca638b619fb40d1914b19ae48a7b208','2021-11-09',45,1,1,'','2021-11-09 00:00:00.000000','2021-11-10 00:00:00.000000',1.0,'2021-11-09 14:27:15.000000',NULL,NULL,NULL,0,3,NULL,0);
/*!40000 ALTER TABLE `att_payloadtimecard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_reportparam`
--

DROP TABLE IF EXISTS `att_reportparam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_reportparam` (
  `param_name` varchar(20) NOT NULL,
  `param_value` longtext NOT NULL,
  PRIMARY KEY (`param_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_reportparam`
--

LOCK TABLES `att_reportparam` WRITE;
/*!40000 ALTER TABLE `att_reportparam` DISABLE KEYS */;
INSERT INTO `att_reportparam` VALUES ('report_setting','{\"short_date\": 1, \"short_time\": 1, \"filter_emp\": 1, \"multiple_dept\": 0, \"funckey0\": \"Check In\", \"funckey1\": \"Check Out\", \"funckey2\": \"Break Out\", \"funckey3\": \"Break In\", \"funckey4\": \"Overtime In\", \"funckey5\": \"Overtime Out\", \"funckey6\": \"6\", \"funckey7\": \"7\", \"funckey8\": \"8\", \"funckey9\": \"9\", \"funckey10\": \"10\", \"funckey11\": \"11\", \"funckey12\": \"12\", \"funckey13\": \"13\", \"funckey14\": \"14\", \"funckey255\": \"Unknown\", \"LeaveClass\": [{\"RemaindCount\": 1, \"LeaveId\": 1000, \"Color\": 0, \"round_off\": 1, \"report_symbol\": \" \", \"minimum_unit\": 0.5, \"IsLeave\": 1, \"LeaveName\": \"Actual Worked Hours\", \"unit\": 3}, {\"RemaindCount\": 1, \"LeaveId\": 1001, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \" \", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Duty Duration/Short\", \"unit\": 2}, {\"RemaindCount\": 1, \"LeaveId\": 1002, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \" \", \"minimum_unit\": 1.0, \"IsLeave\": 2, \"LeaveName\": \"Total Time/Total Worked Hours\", \"unit\": 2}, {\"RemaindCount\": 1, \"LeaveId\": 1003, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \" \", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Break Time/Actual Break Time\", \"unit\": 2}, {\"RemaindCount\": 1, \"LeaveId\": 1004, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \" \", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Timetable Duration\", \"unit\": 2}, {\"RemaindCount\": 1, \"LeaveId\": 1005, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \">\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Late\", \"unit\": 2}, {\"RemaindCount\": 1, \"LeaveId\": 1006, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \"<\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Early Leave\", \"unit\": 2}, {\"RemaindCount\": 1, \"LeaveId\": 1007, \"Color\": 0, \"round_off\": 1, \"report_symbol\": \"V\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Leave\", \"unit\": 2}, {\"RemaindCount\": 1, \"LeaveId\": 1008, \"Color\": 0, \"round_off\": 1, \"report_symbol\": \"A\", \"minimum_unit\": 0.5, \"IsLeave\": 1, \"LeaveName\": \"Absent\", \"unit\": 3}, {\"RemaindCount\": 1, \"LeaveId\": 1009, \"Color\": 0, \"round_off\": 1, \"report_symbol\": \"+\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Overtime\", \"unit\": 1}, {\"RemaindCount\": 0, \"LeaveId\": 1010, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \"[\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"No Clock In\", \"unit\": 1}, {\"RemaindCount\": 0, \"LeaveId\": 1011, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \"]\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"No Clock Out\", \"unit\": 1}, {\"RemaindCount\": 0, \"LeaveId\": 1012, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \"P\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Present\", \"unit\": 1}, {\"RemaindCount\": 0, \"LeaveId\": 1013, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \"D\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Day Off\", \"unit\": 1}, {\"RemaindCount\": 0, \"LeaveId\": 1014, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \"W\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Weekend\", \"unit\": 1}, {\"RemaindCount\": 0, \"LeaveId\": 1015, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \"H\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Holiday\", \"unit\": 1}, {\"RemaindCount\": 0, \"LeaveId\": 1016, \"Color\": 0, \"round_off\": 2, \"report_symbol\": \"T\", \"minimum_unit\": 1.0, \"IsLeave\": 1, \"LeaveName\": \"Training\", \"unit\": 1}]}');
/*!40000 ALTER TABLE `att_reportparam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_reporttemplate`
--

DROP TABLE IF EXISTS `att_reporttemplate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_reporttemplate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `status` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `att_reporttemplate_builder_id_e1bb15c6_fk_auth_user_id` (`builder_id`),
  CONSTRAINT `att_reporttemplate_builder_id_e1bb15c6_fk_auth_user_id` FOREIGN KEY (`builder_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_reporttemplate`
--

LOCK TABLES `att_reporttemplate` WRITE;
/*!40000 ALTER TABLE `att_reporttemplate` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_reporttemplate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_shiftdetail`
--

DROP TABLE IF EXISTS `att_shiftdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_shiftdetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `in_time` time(6) NOT NULL,
  `out_time` time(6) NOT NULL,
  `day_index` int(11) NOT NULL,
  `shift_id` int(11) NOT NULL,
  `time_interval_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `att_shiftdetail_shift_id_7d694501_fk_att_attshift_id` (`shift_id`),
  KEY `att_shiftdetail_time_interval_id_777dde8f_fk_att_timeinterval_id` (`time_interval_id`),
  CONSTRAINT `att_shiftdetail_shift_id_7d694501_fk_att_attshift_id` FOREIGN KEY (`shift_id`) REFERENCES `att_attshift` (`id`),
  CONSTRAINT `att_shiftdetail_time_interval_id_777dde8f_fk_att_timeinterval_id` FOREIGN KEY (`time_interval_id`) REFERENCES `att_timeinterval` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_shiftdetail`
--

LOCK TABLES `att_shiftdetail` WRITE;
/*!40000 ALTER TABLE `att_shiftdetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_shiftdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_temporaryschedule`
--

DROP TABLE IF EXISTS `att_temporaryschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_temporaryschedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `att_date` date NOT NULL,
  `employee_id` int(11) NOT NULL,
  `time_interval_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `att_temporaryschedul_employee_id_2b2b94c2_fk_personnel` (`employee_id`),
  KEY `att_temporaryschedule_att_date_8aed8916` (`att_date`),
  KEY `att_temporaryschedule_time_interval_id_2be60ee4` (`time_interval_id`),
  CONSTRAINT `att_temporaryschedul_employee_id_2b2b94c2_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_temporaryschedule`
--

LOCK TABLES `att_temporaryschedule` WRITE;
/*!40000 ALTER TABLE `att_temporaryschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_temporaryschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_tempschedule`
--

DROP TABLE IF EXISTS `att_tempschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_tempschedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `att_date` date DEFAULT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `rule_flag` smallint(6) NOT NULL,
  `work_type` smallint(6) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `time_interval_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `att_tempschedule_employee_id_b89c7e54_fk_personnel_employee_id` (`employee_id`),
  KEY `att_tempschedule_time_interval_id_08dd8eb3` (`time_interval_id`),
  CONSTRAINT `att_tempschedule_employee_id_b89c7e54_fk_personnel_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_tempschedule`
--

LOCK TABLES `att_tempschedule` WRITE;
/*!40000 ALTER TABLE `att_tempschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_tempschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_timeinterval`
--

DROP TABLE IF EXISTS `att_timeinterval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_timeinterval` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `overtime_policy` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `alias` (`alias`),
  KEY `att_timeinterval_ot_pay_code_id_17438af8_fk_att_paycode_id` (`ot_pay_code_id`),
  CONSTRAINT `att_timeinterval_ot_pay_code_id_17438af8_fk_att_paycode_id` FOREIGN KEY (`ot_pay_code_id`) REFERENCES `att_paycode` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_timeinterval`
--

LOCK TABLES `att_timeinterval` WRITE;
/*!40000 ALTER TABLE `att_timeinterval` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_timeinterval` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_timeinterval_break_time`
--

DROP TABLE IF EXISTS `att_timeinterval_break_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_timeinterval_break_time` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timeinterval_id` int(11) NOT NULL,
  `breaktime_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `att_timeinterval_break_t_timeinterval_id_breaktim_6e1bfb4e_uniq` (`timeinterval_id`,`breaktime_id`),
  KEY `att_timeinterval_bre_breaktime_id_08462308_fk_att_break` (`breaktime_id`),
  CONSTRAINT `att_timeinterval_bre_breaktime_id_08462308_fk_att_break` FOREIGN KEY (`breaktime_id`) REFERENCES `att_breaktime` (`id`),
  CONSTRAINT `att_timeinterval_bre_timeinterval_id_2287017e_fk_att_timei` FOREIGN KEY (`timeinterval_id`) REFERENCES `att_timeinterval` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_timeinterval_break_time`
--

LOCK TABLES `att_timeinterval_break_time` WRITE;
/*!40000 ALTER TABLE `att_timeinterval_break_time` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_timeinterval_break_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_training`
--

DROP TABLE IF EXISTS `att_training`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_training` (
  `workflowinstance_ptr_id` int(11) NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `apply_time` datetime(6) NOT NULL,
  `apply_reason` longtext DEFAULT NULL,
  `attachment` varchar(100) DEFAULT NULL,
  `pay_code_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`workflowinstance_ptr_id`),
  KEY `att_training_pay_code_id_5790afdd_fk_att_paycode_id` (`pay_code_id`),
  CONSTRAINT `att_training_pay_code_id_5790afdd_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`),
  CONSTRAINT `att_training_workflowinstance_ptr_0aef1508_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_training`
--

LOCK TABLES `att_training` WRITE;
/*!40000 ALTER TABLE `att_training` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_training` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `att_webpunch`
--

DROP TABLE IF EXISTS `att_webpunch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `att_webpunch` (
  `workflowinstance_ptr_id` int(11) NOT NULL,
  `punch_time` datetime(6) NOT NULL,
  `punch_state` varchar(5) NOT NULL,
  `work_code` varchar(20) DEFAULT NULL,
  `apply_reason` longtext DEFAULT NULL,
  `apply_time` datetime(6) NOT NULL,
  `verify_type` int(11) NOT NULL,
  PRIMARY KEY (`workflowinstance_ptr_id`),
  CONSTRAINT `att_webpunch_workflowinstance_ptr_c5f1c02e_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `att_webpunch`
--

LOCK TABLES `att_webpunch` WRITE;
/*!40000 ALTER TABLE `att_webpunch` DISABLE KEYS */;
/*!40000 ALTER TABLE `att_webpunch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attparam`
--

DROP TABLE IF EXISTS `attparam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attparam` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paraname` varchar(30) NOT NULL,
  `paratype` varchar(10) DEFAULT NULL,
  `paravalue` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `attparam_paraname_paratype_6f176d25_uniq` (`paraname`,`paratype`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attparam`
--

LOCK TABLES `attparam` WRITE;
/*!40000 ALTER TABLE `attparam` DISABLE KEYS */;
INSERT INTO `attparam` VALUES (1,'ruleID','rule_0','0'),(2,'DeptID','rule_0','0'),(3,'ApplyName','rule_0','All'),(4,'ruleName','rule_0','Default Attendance Rules'),(5,'MinsEarly','rule_0','0'),(6,'MinsLate','rule_0','0'),(7,'MinsNoBreakIn','rule_0','60'),(8,'MinsNoBreakOut','rule_0','60'),(9,'MinsNoIn','rule_0','60'),(10,'MinsNoLeave','rule_0','60'),(11,'MinsNotOverTime','rule_0','60'),(12,'MinsWorkDay','rule_0','480'),(13,'NoBreakIn','rule_0','1012'),(14,'NoBreakOut','rule_0','1012'),(15,'NoIn','rule_0','1001'),(16,'NoLeave','rule_0','1002'),(17,'OutOverTime','rule_0','0'),(18,'TwoDay','rule_0','0'),(19,'CheckInColor','rule_0','16777151'),(20,'CheckOutColor','rule_0','12910591'),(21,'DBVersion','','2002'),(22,'InstallDate','','be65oaWZ0UqZiqXOkIxPx2rXeDevLONWSzHcMbiOJcL4EJmbbkoq'),(23,'SysDate','','be65oaWZ0UqZiqXOkIxPx2rXeDevLONWSzHcMbiOJcL4EJmbbkoq'),(24,'ADMSDBVersion','','544;');
/*!40000 ALTER TABLE `attparam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=847 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add permission',1,'add_permission'),(2,'Can change permission',1,'change_permission'),(3,'Can delete permission',1,'delete_permission'),(4,'Can add group',2,'add_group'),(5,'Can change group',2,'change_group'),(7,'Can view permission',1,'view_permission'),(8,'Can view group',2,'view_group'),(9,'Can GroupDelete group',2,'group_delete_group'),(10,'Can view email_template_setting',3,'view_email_template_setting'),(11,'Can view ad_server_setting',3,'view_ad_server_setting'),(12,'Can view db_migrate',3,'view_db_migrate'),(13,'Can view safe_setting',3,'view_safe_setting'),(14,'Can view zoom_setting',3,'view_zoom_setting'),(15,'Can view twilio_setting',3,'view_twilio_setting'),(16,'Can view system_setting',3,'view_system_setting'),(17,'Can view device_config',4,'view_device_config'),(18,'Can view employeeschedule_report',5,'view_employeeschedule_report'),(19,'Can view transaction_report',5,'view_transaction_report'),(20,'Can view time_card_report',5,'view_time_card_report'),(21,'Can view first_last_report',5,'view_first_last_report'),(22,'Can view first_in_last_out_report',5,'view_first_in_last_out_report'),(23,'Can view total_time_card_v2',5,'view_total_time_card_v2'),(24,'Can view daily_activity',5,'view_daily_activity'),(25,'Can view daily_overtime',5,'view_daily_overtime'),(26,'Can view daily_leave',5,'view_daily_leave'),(27,'Can view daily_late_in',5,'view_daily_late_in'),(28,'Can view daily_early_out',5,'view_daily_early_out'),(29,'Can view daily_absent',5,'view_daily_absent'),(30,'Can view daily_exception',5,'view_daily_exception'),(31,'Can view scheduled_punch_report',5,'view_scheduled_punch_report'),(32,'Can view punch_paring',5,'view_punch_paring'),(33,'Can view daily_multiple_punch_paring',5,'view_daily_multiple_punch_paring'),(34,'Can view daily_multiple_break_paring',5,'view_daily_multiple_break_paring'),(35,'Can view weekly_worked_hours',5,'view_weekly_worked_hours'),(36,'Can view weekly_overtime',5,'view_weekly_overtime'),(37,'Can view monthly_status',5,'view_monthly_status'),(38,'Can view monthly_work_hours',5,'view_monthly_work_hours'),(39,'Can view monthly_punch',5,'view_monthly_punch'),(40,'Can view monthly_overtime',5,'view_monthly_overtime'),(41,'Can view monthly_absence',5,'view_monthly_absence'),(42,'Can view emp_summary_report',5,'view_emp_summary_report'),(43,'Can view employee_overtime',5,'view_employee_overtime'),(44,'Can view employee_leave',5,'view_employee_leave'),(45,'Can view dept_summary_report',5,'view_dept_summary_report'),(46,'Can view department_overtime',5,'view_department_overtime'),(47,'Can view group_summary_report',5,'view_group_summary_report'),(48,'Can view group_overtime',5,'view_group_overtime'),(49,'Can view sage_vip',5,'view_sage_vip'),(50,'Can view leave_balance_summary_report',5,'view_leave_balance_summary_report'),(51,'Can view att_rule_page',6,'view_att_rule_page'),(52,'Can view report_setting_page',5,'view_report_setting_page'),(53,'Can view calculation_view',5,'view_calculation_view'),(54,'Can view view_by_personnel',5,'view_view_by_personnel'),(55,'Can view PayrollIncrease',7,'view_PayrollIncrease'),(56,'Can view PayrollDeduction',7,'view_PayrollDeduction'),(57,'Can view PayrollPayloadDetail',7,'view_PayrollPayloadDetail'),(58,'Can view PayrollPayloadCalcParam',7,'view_PayrollPayloadCalcParam'),(59,'Can view PayrollSalaryStructure',7,'view_PayrollSalaryStructure'),(60,'Can view payroll_reportcalculator',7,'view_payroll_reportcalculator'),(61,'Can view payroll_calculate_setting',7,'view_payroll_calculate_setting'),(62,'Can view meeting_attendance_report',8,'view_meeting_attendance_report'),(63,'Can view meeting_room_scheduled',8,'view_meeting_room_scheduled'),(64,'Can view ep_dashboard',9,'view_ep_dashboard'),(65,'Can view daily_detail_report',10,'view_daily_detail_report'),(66,'Can view department_summary_report',10,'view_department_summary_report'),(67,'Can view unusual_employees_report',10,'view_unusual_employees_report'),(68,'Can view ep_real_time_monitoring',9,'view_ep_real_time_monitoring'),(69,'Can add content type',122,'add_contenttype'),(70,'Can change content type',122,'change_contenttype'),(71,'Can delete content type',122,'delete_contenttype'),(72,'Can view contenttype',122,'view_contenttype'),(73,'Can add log entry',123,'add_logentry'),(74,'Can change log entry',123,'change_logentry'),(75,'Can delete log entry',123,'delete_logentry'),(76,'Can view logentry',123,'view_logentry'),(77,'Can add session',124,'add_session'),(78,'Can change session',124,'change_session'),(79,'Can delete session',124,'delete_session'),(80,'Can view session',124,'view_session'),(81,'Can add Token',125,'add_token'),(82,'Can change Token',125,'change_token'),(83,'Can delete Token',125,'delete_token'),(84,'Can view token',125,'view_token'),(85,'Can add API Request Log',14,'add_apirequestlog'),(86,'Can change API Request Log',14,'change_apirequestlog'),(87,'Can delete API Request Log',14,'delete_apirequestlog'),(88,'Can view apirequestlog',14,'view_apirequestlog'),(89,'Can add group object permission',126,'add_groupobjectpermission'),(90,'Can change group object permission',126,'change_groupobjectpermission'),(91,'Can delete group object permission',126,'delete_groupobjectpermission'),(92,'Can add user object permission',127,'add_userobjectpermission'),(93,'Can change user object permission',127,'change_userobjectpermission'),(94,'Can delete user object permission',127,'delete_userobjectpermission'),(95,'Can view userobjectpermission',127,'view_userobjectpermission'),(96,'Can view groupobjectpermission',126,'view_groupobjectpermission'),(97,'Can add crontab',128,'add_crontabschedule'),(98,'Can change crontab',128,'change_crontabschedule'),(99,'Can delete crontab',128,'delete_crontabschedule'),(100,'Can add interval',129,'add_intervalschedule'),(101,'Can change interval',129,'change_intervalschedule'),(102,'Can delete interval',129,'delete_intervalschedule'),(103,'Can add periodic task',130,'add_periodictask'),(104,'Can change periodic task',130,'change_periodictask'),(105,'Can delete periodic task',130,'delete_periodictask'),(106,'Can add periodic tasks',131,'add_periodictasks'),(107,'Can change periodic tasks',131,'change_periodictasks'),(108,'Can delete periodic tasks',131,'delete_periodictasks'),(109,'Can add solar event',132,'add_solarschedule'),(110,'Can change solar event',132,'change_solarschedule'),(111,'Can delete solar event',132,'delete_solarschedule'),(112,'Can add clocked',133,'add_clockedschedule'),(113,'Can change clocked',133,'change_clockedschedule'),(114,'Can delete clocked',133,'delete_clockedschedule'),(115,'Can view solarschedule',132,'view_solarschedule'),(116,'Can view intervalschedule',129,'view_intervalschedule'),(117,'Can view clockedschedule',133,'view_clockedschedule'),(118,'Can view crontabschedule',128,'view_crontabschedule'),(119,'Can view periodictasks',131,'view_periodictasks'),(120,'Can view periodictask',130,'view_periodictask'),(121,'Can view base.models.adminLog',13,'view_adminlog'),(122,'Can add attendance rule',134,'add_attparam'),(123,'Can change attendance rule',134,'change_attparam'),(124,'Can delete attendance rule',134,'delete_attparam'),(125,'Can add attParamDepts',135,'add_attparamdepts'),(126,'Can change attParamDepts',135,'change_attparamdepts'),(127,'Can delete attParamDepts',135,'delete_attparamdepts'),(128,'Can add base_model_autoAttExportTask',23,'add_autoattexporttask'),(129,'Can change base_model_autoAttExportTask',23,'change_autoattexporttask'),(130,'Can delete base_model_autoAttExportTask',23,'delete_autoattexporttask'),(131,'Can add base_model_autoExportTask',16,'add_autoexporttask'),(132,'Can change base_model_autoExportTask',16,'change_autoexporttask'),(133,'Can delete base_model_autoExportTask',16,'delete_autoexporttask'),(134,'Can delete base_model_bookmark',15,'delete_bookmark'),(135,'Can change base_model_bookmark',15,'change_bookmark'),(136,'Can add base_model_lineNotifySetting',17,'add_linenotifysetting'),(137,'Can change base_model_lineNotifySetting',17,'change_linenotifysetting'),(138,'Can delete base_model_lineNotifySetting',17,'delete_linenotifysetting'),(139,'Can add base.models.securityPolicy',26,'add_securitypolicy'),(140,'Can change base.models.securityPolicy',26,'change_securitypolicy'),(141,'Can delete base.models.securityPolicy',26,'delete_securitypolicy'),(142,'Can add model_send_email',136,'add_sendemail'),(143,'Can change model_send_email',136,'change_sendemail'),(144,'Can delete model_send_email',136,'delete_sendemail'),(145,'Can add sftp_setting',12,'add_sftpsetting'),(146,'Can change sftp_setting',12,'change_sftpsetting'),(147,'Can delete sftp_setting',12,'delete_sftpsetting'),(148,'Can view base_integrationTable_area',22,'view_syncarea'),(149,'Can view base_integrationTable_department',19,'view_syncdepartment'),(150,'Can view base_integrationTable_employee',21,'view_syncemployee'),(151,'Can view base_integrationTable_position',20,'view_syncjob'),(152,'Can add System Rule',137,'add_sysparam'),(153,'Can change System Rule',137,'change_sysparam'),(154,'Can delete System Rule',137,'delete_sysparam'),(155,'Can add System Parameter related to Department',138,'add_sysparamdept'),(156,'Can change System Parameter related to Department',138,'change_sysparamdept'),(157,'Can delete System Parameter related to Department',138,'delete_sysparamdept'),(158,'Can view base.models.systemLog',24,'view_systemlog'),(159,'Can add base.model.systemSetting',139,'add_systemsetting'),(160,'Can change base.model.systemSetting',139,'change_systemsetting'),(161,'Can delete base.model.systemSetting',139,'delete_systemsetting'),(162,'Can add Abstract Permission',1,'add_abstractpermission'),(163,'Can change Abstract Permission',1,'change_abstractpermission'),(164,'Can delete Abstract Permission',1,'delete_abstractpermission'),(165,'Can add System Setting Permission',1,'add_systemsettingpermission'),(166,'Can change System Setting Permission',1,'change_systemsettingpermission'),(167,'Can delete System Setting Permission',1,'delete_systemsettingpermission'),(168,'Can add base.model.emailTemplate',27,'add_emailtemplate'),(169,'Can change base.model.emailTemplate',27,'change_emailtemplate'),(170,'Can delete base.model.emailTemplate',27,'delete_emailtemplate'),(171,'Can add base.models.eventAlertSetting',28,'add_eventalertsetting'),(172,'Can change base.models.eventAlertSetting',28,'change_eventalertsetting'),(173,'Can delete base.models.eventAlertSetting',28,'delete_eventalertsetting'),(174,'Can view sendemail',136,'view_sendemail'),(175,'Can view sysparam',137,'view_sysparam'),(176,'Can view sftpsetting',12,'view_sftpsetting'),(177,'Can view linenotifysetting',17,'view_linenotifysetting'),(178,'Can view abstractpermission',140,'view_abstractpermission'),(179,'Can view systemsettingpermission',141,'view_systemsettingpermission'),(180,'Can view sysparamdept',138,'view_sysparamdept'),(181,'Can view attparam',134,'view_attparam'),(182,'Can view attparamdepts',135,'view_attparamdepts'),(183,'Can view systemsetting',139,'view_systemsetting'),(184,'Can view autoexporttask',16,'view_autoexporttask'),(185,'Can ManualExport autoexporttask',16,'manual_export_autoexporttask'),(186,'Can view autoattexporttask',23,'view_autoattexporttask'),(187,'Can ManualAttExport autoattexporttask',23,'manual_att_export_autoattexporttask'),(188,'Can DBBackupAuto dbbackuplog',18,'d_b_backup_auto_dbbackuplog'),(189,'Can DBBackupManually dbbackuplog',18,'d_b_backup_manually_dbbackuplog'),(190,'Can DBRestoreManually dbbackuplog',18,'d_b_restore_manually_dbbackuplog'),(191,'Can view securitypolicy',26,'view_securitypolicy'),(192,'Can view emailtemplate',27,'view_emailtemplate'),(193,'Can view eventalertsetting',28,'view_eventalertsetting'),(194,'Can view bookmark',15,'view_bookmark'),(195,'Can add iclock_model_bioData',35,'add_biodata'),(196,'Can change iclock_model_bioData',35,'change_biodata'),(197,'Can delete iclock_model_bioData',35,'delete_biodata'),(198,'Can delete iclock_model_bioPhoto',40,'delete_biophoto'),(199,'Can view iclock_model_bioPhoto',40,'view_biophoto'),(200,'Can add iclock_model_deviceConfig',39,'add_devicemoduleconfig'),(201,'Can change iclock_model_deviceConfig',39,'change_devicemoduleconfig'),(202,'Can delete iclock_model_deviceConfig',39,'delete_devicemoduleconfig'),(203,'Can add terminal_model_errorCommandLog',41,'add_errorcommandlog'),(204,'Can change terminal_model_errorCommandLog',41,'change_errorcommandlog'),(205,'Can delete terminal_model_errorCommandLog',41,'delete_errorcommandlog'),(206,'Can delete iclock_model_privateMessage',36,'delete_privatemessage'),(207,'Can change iclock_model_privateMessage',36,'change_privatemessage'),(208,'Can view iclock_model_privateMessage',36,'view_privatemessage'),(209,'Can delete iclock_model_publicMessage',37,'delete_publicmessage'),(210,'Can change iclock_model_publicMessage',37,'change_publicmessage'),(211,'Can view iclock_model_publicMessage',37,'view_publicmessage'),(212,'Can add terminal.models.shortMessage',142,'add_shortmessage'),(213,'Can change terminal.models.shortMessage',142,'change_shortmessage'),(214,'Can delete terminal.models.shortMessage',142,'delete_shortmessage'),(215,'Can add iclock_model_terminal',29,'add_terminal'),(216,'Can change iclock_model_terminal',29,'change_terminal'),(217,'Can delete iclock_model_terminal',29,'delete_terminal'),(218,'Can add iclock_model_terminalCommand',33,'add_terminalcommand'),(219,'Can change iclock_model_terminalCommand',33,'change_terminalcommand'),(220,'Can delete iclock_model_terminalCommand',33,'delete_terminalcommand'),(221,'Can add iclock_model_terminalEmployee',143,'add_terminalemployee'),(222,'Can change iclock_model_terminalEmployee',143,'change_terminalemployee'),(223,'Can delete iclock_model_terminalEmployee',143,'delete_terminalemployee'),(224,'Can add iclock_model_terminalLog',31,'add_terminallog'),(225,'Can change iclock_model_terminalLog',31,'change_terminallog'),(226,'Can delete iclock_model_terminalLog',31,'delete_terminallog'),(227,'Can add iclock_model_terminalParameter',50,'add_terminalparameter'),(228,'Can change iclock_model_terminalParameter',50,'change_terminalparameter'),(229,'Can delete iclock_model_terminalParameter',50,'delete_terminalparameter'),(230,'Can add iclock_model_terminalUploadLog',32,'add_terminaluploadlog'),(231,'Can change iclock_model_terminalUploadLog',32,'change_terminaluploadlog'),(232,'Can delete iclock_model_terminalUploadLog',32,'delete_terminaluploadlog'),(233,'Can add iclock_model_terminalWorkCode',38,'add_terminalworkcode'),(234,'Can change iclock_model_terminalWorkCode',38,'change_terminalworkcode'),(235,'Can delete iclock_model_terminalWorkCode',38,'delete_terminalworkcode'),(236,'Can view iclock_model_transaction',30,'view_transaction'),(237,'Can add transaction.proof.command',144,'add_transactionproofcmd'),(238,'Can change transaction.proof.command',144,'change_transactionproofcmd'),(239,'Can delete transaction.proof.command',144,'delete_transactionproofcmd'),(240,'Can add iclock.models.terminalCommandLog',34,'add_terminalcommandlog'),(241,'Can change iclock.models.terminalCommandLog',34,'change_terminalcommandlog'),(242,'Can delete iclock.models.terminalCommandLog',34,'delete_terminalcommandlog'),(243,'Can add Device Setting Permission',1,'add_devicesettingpermission'),(244,'Can change Device Setting Permission',1,'change_devicesettingpermission'),(245,'Can delete Device Setting Permission',1,'delete_devicesettingpermission'),(246,'Can view terminal',29,'view_terminal'),(247,'Can TerminalNewArea terminal',29,'terminal_new_area_terminal'),(248,'Can TerminalClearCommand terminal',29,'terminal_clear_command_terminal'),(249,'Can TerminalClearAttendanceData terminal',29,'terminal_clear_attendance_data_terminal'),(250,'Can TerminalDeleteCapture terminal',29,'terminal_delete_capture_terminal'),(251,'Can TerminalClearAll terminal',29,'terminal_clear_all_terminal'),(252,'Can TerminalReUploadData terminal',29,'terminal_re_upload_data_terminal'),(253,'Can TerminalReUploadTransaction terminal',29,'terminal_re_upload_transaction_terminal'),(254,'Can TerminalReloadData terminal',29,'terminal_reload_data_terminal'),(255,'Can TerminalManualSync terminal',29,'terminal_manual_sync_terminal'),(256,'Can TerminalReboot terminal',29,'terminal_reboot_terminal'),(257,'Can TerminalReadInformation terminal',29,'terminal_read_information_terminal'),(258,'Can TerminalEnrollRemotely terminal',29,'terminal_enroll_remotely_terminal'),(259,'Can TerminalDuplicatePunchPeriod terminal',29,'terminal_duplicate_punch_period_terminal'),(260,'Can TerminalCapture terminal',29,'terminal_capture_terminal'),(261,'Can TerminalUpgradeFirmware terminal',29,'terminal_upgrade_firmware_terminal'),(262,'Can TerminalDaylightSavingTime terminal',29,'terminal_daylight_saving_time_terminal'),(263,'Can TerminalPullFile terminal',29,'terminal_pull_file_terminal'),(264,'Can TerminalSetOption terminal',29,'terminal_set_option_terminal'),(265,'Can USBDataUpload transaction',30,'u_s_b_data_upload_transaction'),(266,'Can AttCaptureDownload transaction',30,'att_capture_download_transaction'),(267,'Can view terminallog',31,'view_terminallog'),(268,'Can view terminaluploadlog',32,'view_terminaluploadlog'),(269,'Can TerminalUploadLogBulkDelete terminaluploadlog',32,'terminal_upload_log_bulk_delete_terminaluploadlog'),(270,'Can view terminalcommand',33,'view_terminalcommand'),(271,'Can TerminalCommandBulkDelete terminalcommand',33,'terminal_command_bulk_delete_terminalcommand'),(272,'Can view terminalcommandlog',34,'view_terminalcommandlog'),(273,'Can TerminalCommandLogBulkDelete terminalcommandlog',34,'terminal_command_log_bulk_delete_terminalcommandlog'),(274,'Can view terminalparameter',50,'view_terminalparameter'),(275,'Can view terminalemployee',143,'view_terminalemployee'),(276,'Can view shortmessage',142,'view_shortmessage'),(277,'Can AddPublicMessage publicmessage',37,'add_public_message_publicmessage'),(278,'Can SendPublicMessage publicmessage',37,'send_public_message_publicmessage'),(279,'Can AddPrivateMessage privatemessage',36,'add_private_message_privatemessage'),(280,'Can SendPrivateMessage privatemessage',36,'send_private_message_privatemessage'),(281,'Can view terminalworkcode',38,'view_terminalworkcode'),(282,'Can SendWorkCode terminalworkcode',38,'send_work_code_terminalworkcode'),(283,'Can RemoveWorkCode terminalworkcode',38,'remove_work_code_terminalworkcode'),(284,'Can view transactionproofcmd',144,'view_transactionproofcmd'),(285,'Can view biodata',35,'view_biodata'),(286,'Can view devicemoduleconfig',39,'view_devicemoduleconfig'),(287,'Can BioPhotoApprove biophoto',40,'bio_photo_approve_biophoto'),(288,'Can BioPhotoQRCode biophoto',40,'bio_photo_q_r_code_biophoto'),(289,'Can ImportBioPhoto biophoto',40,'import_bio_photo_biophoto'),(290,'Can view errorcommandlog',41,'view_errorcommandlog'),(291,'Can view deviceemployee',146,'view_deviceemployee'),(292,'Can change model_deviceemployee',146,'change_deviceemployee'),(293,'Can AreaTransfer deviceemployee',146,'area_transfer_deviceemployee'),(294,'Can ReSync2Device deviceemployee',146,'re_sync2_device_deviceemployee'),(295,'Can ReUpload deviceemployee',146,'re_upload_deviceemployee'),(296,'Can DeleteBioData deviceemployee',146,'delete_bio_data_deviceemployee'),(297,'Can view devicesettingpermission',145,'view_devicesettingpermission'),(298,'Can add psnl_model_area',42,'add_area'),(299,'Can change psnl_model_area',42,'change_area'),(300,'Can delete psnl_model_area',42,'delete_area'),(301,'Can add model_assign_area_to_employee',147,'add_assignareaemployee'),(302,'Can change model_assign_area_to_employee',147,'change_assignareaemployee'),(303,'Can delete model_assign_area_to_employee',147,'delete_assignareaemployee'),(304,'Can add psnl_model_certification',43,'add_certification'),(305,'Can change psnl_model_certification',43,'change_certification'),(306,'Can delete psnl_model_certification',43,'delete_certification'),(307,'Can add psnl_model_department',44,'add_department'),(308,'Can change psnl_model_department',44,'change_department'),(309,'Can delete psnl_model_department',44,'delete_department'),(310,'Can add model_employee',45,'add_employee'),(311,'Can change model_employee',45,'change_employee'),(312,'Can delete model_employee',45,'delete_employee'),(313,'Can delete employee certification',48,'delete_employeecertification'),(314,'Can change employee certification',48,'change_employeecertification'),(315,'Can view employee certification',48,'view_employeecertification'),(316,'Can add pnsl_model_empProfile',148,'add_employeeprofile'),(317,'Can change pnsl_model_empProfile',148,'change_employeeprofile'),(318,'Can delete pnsl_model_empProfile',148,'delete_employeeprofile'),(319,'Can add psnl.models.employment',149,'add_employment'),(320,'Can change psnl.models.employment',149,'change_employment'),(321,'Can delete psnl.models.employment',149,'delete_employment'),(322,'Can add psnl_model_position',46,'add_position'),(323,'Can change psnl_model_position',46,'change_position'),(324,'Can delete psnl_model_position',46,'delete_position'),(325,'Can delete psnl_model_resign',47,'delete_resign'),(326,'Can change psnl_model_resign',47,'change_resign'),(327,'Can view psnl_model_resign',47,'view_resign'),(328,'Can add employee calendar',150,'add_employeecalendar'),(329,'Can change employee calendar',150,'change_employeecalendar'),(330,'Can delete employee calendar',150,'delete_employeecalendar'),(331,'Can add personnel.models.employeeCustomAttribute',49,'add_employeecustomattribute'),(332,'Can change personnel.models.employeeCustomAttribute',49,'change_employeecustomattribute'),(333,'Can delete personnel.models.employeeCustomAttribute',49,'delete_employeecustomattribute'),(334,'Can add personnel.models.employeeExtraInfo',151,'add_employeeextrainfo'),(335,'Can change personnel.models.employeeExtraInfo',151,'change_employeeextrainfo'),(336,'Can delete personnel.models.employeeExtraInfo',151,'delete_employeeextrainfo'),(337,'Can view department',44,'view_department'),(338,'Can Import department',44,'import_department'),(339,'Can SetDepartment department',44,'set_department_department'),(340,'Can view position',46,'view_position'),(341,'Can Import position',46,'import_position'),(342,'Can SetPosition position',46,'set_position_position'),(343,'Can view area',42,'view_area'),(344,'Can Import area',42,'import_area'),(345,'Can SetArea area',42,'set_area_area'),(346,'Can view certification',43,'view_certification'),(347,'Can Import certification',43,'import_certification'),(348,'Can view employee',45,'view_employee'),(349,'Can ImportEmployee employee',45,'import_employee_employee'),(350,'Can ImportDocument employee',45,'import_document_employee'),(351,'Can ImportPhoto employee',45,'import_photo_employee'),(352,'Can ImportUSBData employee',45,'import_u_s_b_data_employee'),(353,'Can AdjustDepartment employee',45,'adjust_department_employee'),(354,'Can PositionTransfer employee',45,'position_transfer_employee'),(355,'Can AdjustArea employee',45,'adjust_area_employee'),(356,'Can PassProbation employee',45,'pass_probation_employee'),(357,'Can Resignation employee',45,'resignation_employee'),(358,'Can EnableApp employee',45,'enable_app_employee'),(359,'Can DisableApp employee',45,'disable_app_employee'),(360,'Can ResynchronizeDevice employee',45,'resynchronize_device_employee'),(361,'Can ReUploadFromDevice employee',45,'re_upload_from_device_employee'),(362,'Can DeleteBiometricTemplates employee',45,'delete_biometric_templates_employee'),(363,'Can ExportUSBData employee',45,'export_u_s_b_data_employee'),(364,'Can view employment',149,'view_employment'),(365,'Can view assignareaemployee',147,'view_assignareaemployee'),(366,'Can AddEmployeeResign resign',47,'add_employee_resign_resign'),(367,'Can Reinstatement resign',47,'reinstatement_resign'),(368,'Can Import resign',47,'import_resign'),(369,'Can DisableAttendanceFunction resign',47,'disable_attendance_function_resign'),(370,'Can AddEmployeeCert employeecertification',48,'add_employee_cert_employeecertification'),(371,'Can Import employeecertification',48,'import_employeecertification'),(372,'Can view employeeprofile',148,'view_employeeprofile'),(373,'Can view employeecalendar',150,'view_employeecalendar'),(374,'Can view employeecustomattribute',49,'view_employeecustomattribute'),(375,'Can view employeeextrainfo',151,'view_employeeextrainfo'),(376,'Can add workflow_node_instance',152,'add_nodeinstance'),(377,'Can change workflow_node_instance',152,'change_nodeinstance'),(378,'Can delete workflow_node_instance',152,'delete_nodeinstance'),(379,'Can add workflow_model_workflowEngine',52,'add_workflowengine'),(380,'Can change workflow_model_workflowEngine',52,'change_workflowengine'),(381,'Can delete workflow_model_workflowEngine',52,'delete_workflowengine'),(382,'Can add workflow instance',153,'add_workflowinstance'),(383,'Can change workflow instance',153,'change_workflowinstance'),(384,'Can delete workflow instance',153,'delete_workflowinstance'),(385,'Can add workflow_model_workflowNode',53,'add_workflownode'),(386,'Can change workflow_model_workflowNode',53,'change_workflownode'),(387,'Can delete workflow_model_workflowNode',53,'delete_workflownode'),(388,'Can add workflow_model_workflowRole',51,'add_workflowrole'),(389,'Can change workflow_model_workflowRole',51,'change_workflowrole'),(390,'Can delete workflow_model_workflowRole',51,'delete_workflowrole'),(391,'Can view workflowrole',51,'view_workflowrole'),(392,'Can WorkFlowRoleAssignEmployee workflowrole',51,'work_flow_role_assign_employee_workflowrole'),(393,'Can view workflowengine',52,'view_workflowengine'),(394,'Can WorkFlowSetupForDepartment workflowengine',52,'work_flow_setup_for_department_workflowengine'),(395,'Can WorkFlowSetupForPosition workflowengine',52,'work_flow_setup_for_position_workflowengine'),(396,'Can WorkFlowSetupForEmployee workflowengine',52,'work_flow_setup_for_employee_workflowengine'),(397,'Can view workflownode',53,'view_workflownode'),(398,'Can view nodeinstance',152,'view_nodeinstance'),(399,'Can view workflowinstance',153,'view_workflowinstance'),(400,'Can add att_calc_log',154,'add_attcalclog'),(401,'Can change att_calc_log',154,'change_attcalclog'),(402,'Can delete att_calc_log',154,'delete_attcalclog'),(403,'Can change att.models.attCode',55,'change_attcode'),(404,'Can view att.models.attCode',55,'view_attcode'),(405,'Can add att.models.attEmployee',155,'add_attemployee'),(406,'Can change att.models.attEmployee',155,'change_attemployee'),(407,'Can delete att.models.attEmployee',155,'delete_attemployee'),(408,'Can add att.models.attGroup',56,'add_attgroup'),(409,'Can change att.models.attGroup',56,'change_attgroup'),(410,'Can delete att.models.attGroup',56,'delete_attgroup'),(411,'Can add att.models.attPolicy',57,'add_attpolicy'),(412,'Can change att.models.attPolicy',57,'change_attpolicy'),(413,'Can delete att.models.attPolicy',57,'delete_attpolicy'),(414,'Can add att.model.calculateItem',77,'add_attreportsetting'),(415,'Can change att.model.calculateItem',77,'change_attreportsetting'),(416,'Can delete att.model.calculateItem',77,'delete_attreportsetting'),(417,'Can add att_model_attRule',60,'add_attrule'),(418,'Can change att_model_attRule',60,'change_attrule'),(419,'Can delete att_model_attRule',60,'delete_attrule'),(420,'Can delete att_model_schedule',65,'delete_attschedule'),(421,'Can change att_model_schedule',65,'change_attschedule'),(422,'Can view att_model_schedule',65,'view_attschedule'),(423,'Can add att_model_shift',64,'add_attshift'),(424,'Can change att_model_shift',64,'change_attshift'),(425,'Can delete att_model_shift',64,'delete_attshift'),(426,'Can add att_model_breakTime',73,'add_breaktime'),(427,'Can change att_model_breakTime',73,'change_breaktime'),(428,'Can delete att_model_breakTime',73,'delete_breaktime'),(429,'Can add att_model_changeSchedule',74,'add_changeschedule'),(430,'Can change att_model_changeSchedule',74,'change_changeschedule'),(431,'Can delete att_model_changeSchedule',74,'delete_changeschedule'),(432,'Can add att.models.departmentPolicy',58,'add_departmentpolicy'),(433,'Can change att.models.departmentPolicy',58,'change_departmentpolicy'),(434,'Can delete att.models.departmentPolicy',58,'delete_departmentpolicy'),(435,'Can delete att_model_deptSchedule',75,'delete_departmentschedule'),(436,'Can change att_model_deptSchedule',75,'change_departmentschedule'),(437,'Can view att_model_deptSchedule',75,'view_departmentschedule'),(438,'Can delete att_model_deptAttRule',72,'delete_deptattrule'),(439,'Can change att_model_deptAttRule',72,'change_deptattrule'),(440,'Can view att_model_deptAttRule',72,'view_deptattrule'),(441,'Can add att.models.groupPolicy',59,'add_grouppolicy'),(442,'Can change att.models.groupPolicy',59,'change_grouppolicy'),(443,'Can delete att.models.groupPolicy',59,'delete_grouppolicy'),(444,'Can add att.models.groupSchedule',76,'add_groupschedule'),(445,'Can change att.models.groupSchedule',76,'change_groupschedule'),(446,'Can delete att.models.groupSchedule',76,'delete_groupschedule'),(447,'Can delete att_model_holiday',71,'delete_holiday'),(448,'Can change att_model_holiday',71,'change_holiday'),(449,'Can view att_model_holiday',71,'view_holiday'),(450,'Can delete att_model_leave',68,'delete_leave'),(451,'Can change att_model_leave',68,'change_leave'),(452,'Can view att_model_leave',68,'view_leave'),(453,'Can add att_model_manualLog',62,'add_manuallog'),(454,'Can change att_model_manualLog',62,'change_manuallog'),(455,'Can delete att_model_manualLog',62,'delete_manuallog'),(456,'Can delete att_model_overtime',70,'delete_overtime'),(457,'Can change att_model_overtime',70,'change_overtime'),(458,'Can view att_model_overtime',70,'view_overtime'),(459,'Can add att.models.overtimePolicy',156,'add_overtimepolicy'),(460,'Can change att.models.overtimePolicy',156,'change_overtimepolicy'),(461,'Can delete att.models.overtimePolicy',156,'delete_overtimepolicy'),(462,'Can add att.models.payCode',54,'add_paycode'),(463,'Can change att.models.payCode',54,'change_paycode'),(464,'Can delete att.models.payCode',54,'delete_paycode'),(465,'Can add payload att code',157,'add_payloadattcode'),(466,'Can change payload att code',157,'change_payloadattcode'),(467,'Can delete payload att code',157,'delete_payloadattcode'),(468,'Can add payload base',158,'add_payloadbase'),(469,'Can change payload base',158,'change_payloadbase'),(470,'Can delete payload base',158,'delete_payloadbase'),(471,'Can add payload break',159,'add_payloadbreak'),(472,'Can change payload break',159,'change_payloadbreak'),(473,'Can delete payload break',159,'delete_payloadbreak'),(474,'Can add payload effect punch',160,'add_payloadeffectpunch'),(475,'Can change payload effect punch',160,'change_payloadeffectpunch'),(476,'Can delete payload effect punch',160,'delete_payloadeffectpunch'),(477,'Can add payload exception',161,'add_payloadexception'),(478,'Can change payload exception',161,'change_payloadexception'),(479,'Can delete payload exception',161,'delete_payloadexception'),(480,'Can add payload mul punch set',162,'add_payloadmulpunchset'),(481,'Can change payload mul punch set',162,'change_payloadmulpunchset'),(482,'Can delete payload mul punch set',162,'delete_payloadmulpunchset'),(483,'Can add payload overtime',163,'add_payloadovertime'),(484,'Can change payload overtime',163,'change_payloadovertime'),(485,'Can delete payload overtime',163,'delete_payloadovertime'),(486,'Can add payload paring',164,'add_payloadparing'),(487,'Can change payload paring',164,'change_payloadparing'),(488,'Can delete payload paring',164,'delete_payloadparing'),(489,'Can add payload pay code',165,'add_payloadpaycode'),(490,'Can change payload pay code',165,'change_payloadpaycode'),(491,'Can delete payload pay code',165,'delete_payloadpaycode'),(492,'Can add payload punch',166,'add_payloadpunch'),(493,'Can change payload punch',166,'change_payloadpunch'),(494,'Can delete payload punch',166,'delete_payloadpunch'),(495,'Can add att.models.payloadTimeCard',167,'add_payloadtimecard'),(496,'Can change att.models.payloadTimeCard',167,'change_payloadtimecard'),(497,'Can delete att.models.payloadTimeCard',167,'delete_payloadtimecard'),(498,'Can add att_model_reportParameter',61,'add_reportparam'),(499,'Can change att_model_reportParameter',61,'change_reportparam'),(500,'Can delete att_model_reportParameter',61,'delete_reportparam'),(501,'Can add att_model_reportTemplate',168,'add_reporttemplate'),(502,'Can change att_model_reportTemplate',168,'change_reporttemplate'),(503,'Can delete att_model_reportTemplate',168,'delete_reporttemplate'),(504,'Can add att_model_shiftDetail',169,'add_shiftdetail'),(505,'Can change att_model_shiftDetail',169,'change_shiftdetail'),(506,'Can delete att_model_shiftDetail',169,'delete_shiftdetail'),(507,'Can delete att.models.temporarySchedule',67,'delete_temporaryschedule'),(508,'Can change att.models.temporarySchedule',67,'change_temporaryschedule'),(509,'Can view att.models.temporarySchedule',67,'view_temporaryschedule'),(510,'Can delete att_model_tempSchedule',66,'delete_tempschedule'),(511,'Can change att_model_tempSchedule',66,'change_tempschedule'),(512,'Can view att_model_tempSchedule',66,'view_tempschedule'),(513,'Can delete att_model_timeInterval',63,'delete_timeinterval'),(514,'Can change att_model_timeInterval',63,'change_timeinterval'),(515,'Can view att_model_timeInterval',63,'view_timeinterval'),(516,'Can add att_model_training',69,'add_training'),(517,'Can change att_model_training',69,'change_training'),(518,'Can delete att_model_training',69,'delete_training'),(519,'Can add Att Setting Permission',1,'add_attsettingpermission'),(520,'Can change Att Setting Permission',1,'change_attsettingpermission'),(521,'Can delete Att Setting Permission',1,'delete_attsettingpermission'),(522,'Can add Report Permission',1,'add_reportpermission'),(523,'Can change Report Permission',1,'change_reportpermission'),(524,'Can delete Report Permission',1,'delete_reportpermission'),(525,'Can add menu_att_leavegroup',78,'add_leavegroup'),(526,'Can change menu_att_leavegroup',78,'change_leavegroup'),(527,'Can delete menu_att_leavegroup',78,'delete_leavegroup'),(528,'Can add att_model_leavegroupdetail',79,'add_leavegroupdetail'),(529,'Can change att_model_leavegroupdetail',79,'change_leavegroupdetail'),(530,'Can delete att_model_leavegroupdetail',79,'delete_leavegroupdetail'),(531,'Can add att_model_leaveYearBalance',80,'add_leaveyearbalance'),(532,'Can change att_model_leaveYearBalance',80,'change_leaveyearbalance'),(533,'Can delete att_model_leaveYearBalance',80,'delete_leaveyearbalance'),(534,'Can add att.models.webPunch',170,'add_webpunch'),(535,'Can change att.models.webPunch',170,'change_webpunch'),(536,'Can delete att.models.webPunch',170,'delete_webpunch'),(537,'Can view paycode',54,'view_paycode'),(538,'Can view attgroup',56,'view_attgroup'),(539,'Can SetGroup attgroup',56,'set_group_attgroup'),(540,'Can view attpolicy',57,'view_attpolicy'),(541,'Can view departmentpolicy',58,'view_departmentpolicy'),(542,'Can AddDepartmentPolicy departmentpolicy',58,'add_department_policy_departmentpolicy'),(543,'Can view grouppolicy',59,'view_grouppolicy'),(544,'Can AddGroupPolicy grouppolicy',59,'add_group_policy_grouppolicy'),(545,'Can view attrule',60,'view_attrule'),(546,'Can view attemployee',155,'view_attemployee'),(547,'Can view attshift',64,'view_attshift'),(548,'Can AddAttSchedule attschedule',65,'add_att_schedule_attschedule'),(549,'Can Import attschedule',65,'import_attschedule'),(550,'Can view breaktime',73,'view_breaktime'),(551,'Can AddDepartmentHoliday holiday',71,'add_department_holiday_holiday'),(552,'Can AddLeave leave',68,'add_leave_leave'),(553,'Can BulkAddLeave leave',68,'bulk_add_leave_leave'),(554,'Can ApproveLeave leave',68,'approve_leave_leave'),(555,'Can Reject leave',68,'reject_leave'),(556,'Can Revoke leave',68,'revoke_leave'),(557,'Can Import leave',68,'import_leave'),(558,'Can view manuallog',62,'view_manuallog'),(559,'Can AddManualLog manuallog',62,'add_manual_log_manuallog'),(560,'Can BulkAddManualLog manuallog',62,'bulk_add_manual_log_manuallog'),(561,'Can Approve manuallog',62,'approve_manuallog'),(562,'Can Reject manuallog',62,'reject_manuallog'),(563,'Can Revoke manuallog',62,'revoke_manuallog'),(564,'Can Import manuallog',62,'import_manuallog'),(565,'Can AddOvertime overtime',70,'add_overtime_overtime'),(566,'Can BulkAddOvertime overtime',70,'bulk_add_overtime_overtime'),(567,'Can Approve overtime',70,'approve_overtime'),(568,'Can Reject overtime',70,'reject_overtime'),(569,'Can Revoke overtime',70,'revoke_overtime'),(570,'Can Import overtime',70,'import_overtime'),(571,'Can view reportparam',61,'view_reportparam'),(572,'Can view attreportsetting',77,'view_attreportsetting'),(573,'Can AddNormalTimetable timeinterval',63,'add_normal_timetable_timeinterval'),(574,'Can AddFlexibleTimetable timeinterval',63,'add_flexible_timetable_timeinterval'),(575,'Can view shiftdetail',169,'view_shiftdetail'),(576,'Can AddTempSchedule tempschedule',66,'add_temp_schedule_tempschedule'),(577,'Can Import tempschedule',66,'import_tempschedule'),(578,'Can AddTemporarySchedule temporaryschedule',67,'add_temporary_schedule_temporaryschedule'),(579,'Can ImportTemporarySchedule temporaryschedule',67,'import_temporary_schedule_temporaryschedule'),(580,'Can view training',69,'view_training'),(581,'Can AddTraining training',69,'add_training_training'),(582,'Can BulkAddTraining training',69,'bulk_add_training_training'),(583,'Can Approve training',69,'approve_training'),(584,'Can Reject training',69,'reject_training'),(585,'Can Revoke training',69,'revoke_training'),(586,'Can Import training',69,'import_training'),(587,'Can BatchAddDepartmentRule deptattrule',72,'batch_add_department_rule_deptattrule'),(588,'Can view changeschedule',74,'view_changeschedule'),(589,'Can Approve changeschedule',74,'approve_changeschedule'),(590,'Can Reject changeschedule',74,'reject_changeschedule'),(591,'Can Revoke changeschedule',74,'revoke_changeschedule'),(592,'Can AddDepartmentSchedule departmentschedule',75,'add_department_schedule_departmentschedule'),(593,'Can view groupschedule',76,'view_groupschedule'),(594,'Can AddGroupSchedule groupschedule',76,'add_group_schedule_groupschedule'),(595,'Can view payloadtimecard',167,'view_payloadtimecard'),(596,'Can view payloadpaycode',165,'view_payloadpaycode'),(597,'Can view payloadattcode',157,'view_payloadattcode'),(598,'Can view payloadparing',164,'view_payloadparing'),(599,'Can view payloadeffectpunch',160,'view_payloadeffectpunch'),(600,'Can view payloadovertime',163,'view_payloadovertime'),(601,'Can view payloadbreak',159,'view_payloadbreak'),(602,'Can view payloadbase',158,'view_payloadbase'),(603,'Can view payloadpunch',166,'view_payloadpunch'),(604,'Can view payloadexception',161,'view_payloadexception'),(605,'Can view payloadmulpunchset',162,'view_payloadmulpunchset'),(606,'Can view overtimepolicy',156,'view_overtimepolicy'),(607,'Can view reporttemplate',168,'view_reporttemplate'),(608,'Can view leavegroup',78,'view_leavegroup'),(609,'Can AssignLeaveGroup leavegroup',78,'assign_leave_group_leavegroup'),(610,'Can AddLeaveGroup leavegroup',78,'add_leave_group_leavegroup'),(611,'Can view leavegroupdetail',79,'view_leavegroupdetail'),(612,'Can view leaveyearbalance',80,'view_leaveyearbalance'),(613,'Can view webpunch',170,'view_webpunch'),(614,'Can view reportpermission',172,'view_reportpermission'),(615,'Can view attsettingpermission',171,'view_attsettingpermission'),(616,'Can view attcalclog',154,'view_attcalclog'),(617,'Can add base_model_user',11,'add_myuser'),(618,'Can change base_model_user',11,'change_myuser'),(619,'Can add iclock_model_bioData',173,'add_adminbiodata'),(620,'Can change iclock_model_bioData',173,'change_adminbiodata'),(621,'Can delete iclock_model_bioData',173,'delete_adminbiodata'),(622,'Can add accounts.models.userNotification',25,'add_usernotification'),(623,'Can change accounts.models.userNotification',25,'change_usernotification'),(624,'Can delete accounts.models.userNotification',25,'delete_usernotification'),(625,'can_enter_menu_system_module',174,'enter_system_module'),(626,'can_enter_personnel_module',174,'enter_personnel_module'),(627,'can_enter_terminal_module',174,'enter_terminal_module'),(628,'can_enter_attendance_module',174,'enter_attendance_module'),(629,'can_enter_payroll_module',174,'enter_payroll_module'),(630,'can_enter_access_module',174,'enter_access_module'),(631,'can_enter_visitor_module',174,'enter_visitor_module'),(632,'can_enter_meeting_module',174,'enter_meeting_module'),(633,'can_enter_ep_module',174,'enter_ep_module'),(634,'Can view myuser',11,'view_myuser'),(635,'Can ChangePassword myuser',11,'change_password_myuser'),(636,'Can UserDelete myuser',11,'user_delete_myuser'),(637,'Can view adminbiodata',173,'view_adminbiodata'),(638,'Can view usernotification',25,'view_usernotification'),(639,'Can MarkerAll usernotification',25,'marker_all_usernotification'),(640,'Can add StaffToken',175,'add_stafftoken'),(641,'Can change StaffToken',175,'change_stafftoken'),(642,'Can delete StaffToken',175,'delete_stafftoken'),(643,'Can view stafftoken',175,'view_stafftoken'),(644,'Can delete app_model_announcement',81,'delete_announcement'),(645,'Can delete app_model_actionLog',84,'delete_appactionlog'),(646,'Can delete app_model_appList',82,'delete_applist'),(647,'Can delete app_model_notification',83,'delete_appnotification'),(648,'Can delete mobile_model_gpsForDepartment',86,'delete_gpsfordepartment'),(649,'Can change mobile_model_gpsForDepartment',86,'change_gpsfordepartment'),(650,'Can view mobile_model_gpsForDepartment',86,'view_gpsfordepartment'),(651,'Can delete mobile_model_gpsForEmployee',85,'delete_gpsforemployee'),(652,'Can change mobile_model_gpsForEmployee',85,'change_gpsforemployee'),(653,'Can view mobile_model_gpsForEmployee',85,'view_gpsforemployee'),(654,'Can add mobile_model_gpsLocation',87,'add_gpslocation'),(655,'Can change mobile_model_gpsLocation',87,'change_gpslocation'),(656,'Can delete mobile_model_gpsLocation',87,'delete_gpslocation'),(657,'Can add mobile api request log',88,'add_mobileapirequestlog'),(658,'Can change mobile api request log',88,'change_mobileapirequestlog'),(659,'Can delete mobile api request log',88,'delete_mobileapirequestlog'),(660,'Can view appactionlog',84,'view_appactionlog'),(661,'Can view applist',82,'view_applist'),(662,'Can PushNotification applist',82,'push_notification_applist'),(663,'Can ForceOffline applist',82,'force_offline_applist'),(664,'Can Disable applist',82,'disable_applist'),(665,'Can Enable applist',82,'enable_applist'),(666,'Can view announcement',81,'view_announcement'),(667,'Can AddPublicNotice announcement',81,'add_public_notice_announcement'),(668,'Can AddPrivateNotice announcement',81,'add_private_notice_announcement'),(669,'Can view appnotification',83,'view_appnotification'),(670,'Can view gpslocation',87,'view_gpslocation'),(671,'Can AddGPSForDepartment gpsfordepartment',86,'add_g_p_s_for_department_gpsfordepartment'),(672,'Can AddGPSForEmployee gpsforemployee',85,'add_g_p_s_for_employee_gpsforemployee'),(673,'Can view mobileapirequestlog',88,'view_mobileapirequestlog'),(674,'Can add payroll_model_deductionFormula',90,'add_deductionformula'),(675,'Can change payroll_model_deductionFormula',90,'change_deductionformula'),(676,'Can delete payroll_model_deductionFormula',90,'delete_deductionformula'),(677,'Can delete payroll_model_empLoan',95,'delete_emploan'),(678,'Can add payroll_model_empPayrollProfile',89,'add_emppayrollprofile'),(679,'Can change payroll_model_empPayrollProfile',89,'change_emppayrollprofile'),(680,'Can delete payroll_model_empPayrollProfile',89,'delete_emppayrollprofile'),(681,'Can add payroll_model_exceptionFormula',91,'add_exceptionformula'),(682,'Can change payroll_model_exceptionFormula',91,'change_exceptionformula'),(683,'Can delete payroll_model_exceptionFormula',91,'delete_exceptionformula'),(684,'Can delete payroll_model_extraDeduction',100,'delete_extradeduction'),(685,'Can change payroll_model_extraDeduction',100,'change_extradeduction'),(686,'Can view payroll_model_extraDeduction',100,'view_extradeduction'),(687,'Can delete payroll_model_extraIncrease',99,'delete_extraincrease'),(688,'Can change payroll_model_extraIncrease',99,'change_extraincrease'),(689,'Can view payroll_model_extraIncrease',99,'view_extraincrease'),(690,'Can add payroll_model_increasementFormula',92,'add_increasementformula'),(691,'Can change payroll_model_increasementFormula',92,'change_increasementformula'),(692,'Can delete payroll_model_increasementFormula',92,'delete_increasementformula'),(693,'Can add payroll_model_leaveFormula',93,'add_leaveformula'),(694,'Can change payroll_model_leaveFormula',93,'change_leaveformula'),(695,'Can delete payroll_model_leaveFormula',93,'delete_leaveformula'),(696,'Can add payroll_model_overtimeFormula',94,'add_overtimeformula'),(697,'Can change payroll_model_overtimeFormula',94,'change_overtimeformula'),(698,'Can delete payroll_model_overtimeFormula',94,'delete_overtimeformula'),(699,'Can add payroll_model_payroll_payload',176,'add_payrollpayload'),(700,'Can change payroll_model_payroll_payload',176,'change_payrollpayload'),(701,'Can delete payroll_model_payroll_payload',176,'delete_payrollpayload'),(702,'Can add payroll payload pay code',177,'add_payrollpayloadpaycode'),(703,'Can change payroll payload pay code',177,'change_payrollpayloadpaycode'),(704,'Can delete payroll payload pay code',177,'delete_payrollpayloadpaycode'),(705,'Can delete payroll_model_Reimbursement',96,'delete_reimbursement'),(706,'Can delete payroll_model_SalaryAdvance',97,'delete_salaryadvance'),(707,'Can delete payroll_model_salarystructure',98,'delete_salarystructure'),(708,'Can change payroll_model_salarystructure',98,'change_salarystructure'),(709,'Can view payroll_model_salarystructure',98,'view_salarystructure'),(710,'Can add Payroll Report Permission',1,'add_payrollreportpermission'),(711,'Can change Payroll Report Permission',1,'change_payrollreportpermission'),(712,'Can delete Payroll Report Permission',1,'delete_payrollreportpermission'),(713,'Can view payrollreportpermission',178,'view_payrollreportpermission'),(714,'Can view emppayrollprofile',89,'view_emppayrollprofile'),(715,'Can view deductionformula',90,'view_deductionformula'),(716,'Can view exceptionformula',91,'view_exceptionformula'),(717,'Can view increasementformula',92,'view_increasementformula'),(718,'Can view leaveformula',93,'view_leaveformula'),(719,'Can view overtimeformula',94,'view_overtimeformula'),(720,'Can view emploan',95,'view_emploan'),(721,'Can AddEmpLoanAction emploan',95,'add_emp_loan_action_emploan'),(722,'Can view reimbursement',96,'view_reimbursement'),(723,'Can AddReimbursementAction reimbursement',96,'add_reimbursement_action_reimbursement'),(724,'Can view salaryadvance',97,'view_salaryadvance'),(725,'Can AddSalaryAdvanceAction salaryadvance',97,'add_salary_advance_action_salaryadvance'),(726,'Can AddSalaryStructureAction salarystructure',98,'add_salary_structure_action_salarystructure'),(727,'Can AddExtraIncreaseAction extraincrease',99,'add_extra_increase_action_extraincrease'),(728,'Can AddExtraDeductionAction extradeduction',100,'add_extra_deduction_action_extradeduction'),(729,'Can view payrollpayload',176,'view_payrollpayload'),(730,'Can view payrollpayloadpaycode',177,'view_payrollpayloadpaycode'),(731,'Can add acc_combination',104,'add_acccombination'),(732,'Can change acc_combination',104,'change_acccombination'),(733,'Can delete acc_combination',104,'delete_acccombination'),(734,'Can add acc_groups',103,'add_accgroups'),(735,'Can change acc_groups',103,'change_accgroups'),(736,'Can delete acc_groups',103,'delete_accgroups'),(737,'Can add acc_holiday',102,'add_accholiday'),(738,'Can change acc_holiday',102,'change_accholiday'),(739,'Can delete acc_holiday',102,'delete_accholiday'),(740,'Can add acc_privilege',105,'add_accprivilege'),(741,'Can change acc_privilege',105,'change_accprivilege'),(742,'Can delete acc_privilege',105,'delete_accprivilege'),(743,'Can change menu_access_terminal',106,'change_accterminal'),(744,'Can view menu_access_terminal',106,'view_accterminal'),(745,'Can add acc_timezone',101,'add_acctimezone'),(746,'Can change acc_timezone',101,'change_acctimezone'),(747,'Can delete acc_timezone',101,'delete_acctimezone'),(748,'Can view acctimezone',101,'view_acctimezone'),(749,'Can CloneToArea acctimezone',101,'clone_to_area_acctimezone'),(750,'Can view accholiday',102,'view_accholiday'),(751,'Can CloneToArea accholiday',102,'clone_to_area_accholiday'),(752,'Can view accgroups',103,'view_accgroups'),(753,'Can CloneToArea accgroups',103,'clone_to_area_accgroups'),(754,'Can SetEmployeeGroup accgroups',103,'set_employee_group_accgroups'),(755,'Can view acccombination',104,'view_acccombination'),(756,'Can CloneToArea acccombination',104,'clone_to_area_acccombination'),(757,'Can view accprivilege',105,'view_accprivilege'),(758,'Can AdjustEmployeePrivilege accprivilege',105,'adjust_employee_privilege_accprivilege'),(759,'Can OpenDoor accterminal',106,'open_door_accterminal'),(760,'Can CancelAlarm accterminal',106,'cancel_alarm_accterminal'),(761,'Can SetParameter accterminal',106,'set_parameter_accterminal'),(762,'Can add visitor.field.reason',109,'add_reason'),(763,'Can change visitor.field.reason',109,'change_reason'),(764,'Can delete visitor.field.reason',109,'delete_reason'),(765,'Can add menu.visitor.reservation',108,'add_reservation'),(766,'Can change menu.visitor.reservation',108,'change_reservation'),(767,'Can delete menu.visitor.reservation',108,'delete_reservation'),(768,'Can add menu.visitor',107,'add_visitor'),(769,'Can change menu.visitor',107,'change_visitor'),(770,'Can delete menu.visitor',107,'delete_visitor'),(771,'Can add visitor.model.configuration',111,'add_visitorconfig'),(772,'Can change visitor.model.configuration',111,'change_visitorconfig'),(773,'Can delete visitor.model.configuration',111,'delete_visitorconfig'),(774,'Can delete model.visitor.log',110,'delete_visitorlog'),(775,'Can view model.visitor.log',110,'view_visitorlog'),(776,'Can view visitor.model.VisitorBioData',113,'view_visitorbiodata'),(777,'Can delete visitor.model.VisitorBioPhoto',112,'delete_visitorbiophoto'),(778,'Can view visitor.model.VisitorBioPhoto',112,'view_visitorbiophoto'),(779,'Can add visitor.models.visitorTransaction',114,'add_visitortransaction'),(780,'Can change visitor.models.visitorTransaction',114,'change_visitortransaction'),(781,'Can delete visitor.models.visitorTransaction',114,'delete_visitortransaction'),(782,'Can view reason',109,'view_reason'),(783,'Can view visitor',107,'view_visitor'),(784,'Can ExitRegistration visitor',107,'exit_registration_visitor'),(785,'Can view reservation',108,'view_reservation'),(786,'Can AddReservation reservation',108,'add_reservation_reservation'),(787,'Can Approve reservation',108,'approve_reservation'),(788,'Can Reject reservation',108,'reject_reservation'),(789,'Can Revoke reservation',108,'revoke_reservation'),(790,'Can ReservationQRCode reservation',108,'reservation_q_r_code_reservation'),(791,'Can EnableVisitor visitorlog',110,'enable_visitor_visitorlog'),(792,'Can DisableVisitor visitorlog',110,'disable_visitor_visitorlog'),(793,'Can view visitorconfig',111,'view_visitorconfig'),(794,'Can VisitorBioPhotoApprove visitorbiophoto',112,'visitor_bio_photo_approve_visitorbiophoto'),(795,'Can view visitortransaction',114,'view_visitortransaction'),(796,'Can add meeting.models.meetingEntity',117,'add_meetingentity'),(797,'Can change meeting.models.meetingEntity',117,'change_meetingentity'),(798,'Can delete meeting.models.meetingEntity',117,'delete_meetingentity'),(799,'Can delete meeting.models.manualLog',118,'delete_meetingmanuallog'),(800,'Can change meeting.models.manualLog',118,'change_meetingmanuallog'),(801,'Can view meeting.models.manualLog',118,'view_meetingmanuallog'),(802,'Can add meeting.models.meetingPayloadBase',179,'add_meetingpayloadbase'),(803,'Can change meeting.models.meetingPayloadBase',179,'change_meetingpayloadbase'),(804,'Can delete meeting.models.meetingPayloadBase',179,'delete_meetingpayloadbase'),(805,'Can delete meeting.models.meetingRoom',115,'delete_meetingroom'),(806,'Can change meeting.models.meetingRoom',115,'change_meetingroom'),(807,'Can view meeting.models.meetingRoom',115,'view_meetingroom'),(808,'Can add meeting.models.device',116,'add_meetingroomdevice'),(809,'Can change meeting.models.device',116,'change_meetingroomdevice'),(810,'Can delete meeting.models.device',116,'delete_meetingroomdevice'),(811,'Can view meeting.models.transaction',119,'view_meetingtransaction'),(812,'Can add Meeting Report Permission',1,'add_meetingreportpermission'),(813,'Can change Meeting Report Permission',1,'change_meetingreportpermission'),(814,'Can delete Meeting Report Permission',1,'delete_meetingreportpermission'),(815,'Can view meetingreportpermission',180,'view_meetingreportpermission'),(816,'Can AddMeetingRoom meetingroom',115,'add_meeting_room_meetingroom'),(817,'Can view meetingroomdevice',116,'view_meetingroomdevice'),(818,'Can view meetingentity',117,'view_meetingentity'),(819,'Can MeetingCalculation meetingentity',117,'meeting_calculation_meetingentity'),(820,'Can Approve meetingentity',117,'approve_meetingentity'),(821,'Can Revoke meetingentity',117,'revoke_meetingentity'),(822,'Can Reject meetingentity',117,'reject_meetingentity'),(823,'Can AddMeetingAttender meetingentity',117,'add_meeting_attender_meetingentity'),(824,'Can SyncMeeting2Device meetingentity',117,'sync_meeting2_device_meetingentity'),(825,'Can AddMeetingManualLog meetingmanuallog',118,'add_meeting_manual_log_meetingmanuallog'),(826,'Can Approve meetingmanuallog',118,'approve_meetingmanuallog'),(827,'Can Reject meetingmanuallog',118,'reject_meetingmanuallog'),(828,'Can Revoke meetingmanuallog',118,'revoke_meetingmanuallog'),(829,'Can view meetingpayloadbase',179,'view_meetingpayloadbase'),(830,'Can add ep.models.epSetup',120,'add_epsetup'),(831,'Can change ep.models.epSetup',120,'change_epsetup'),(832,'Can delete ep.models.epSetup',120,'delete_epsetup'),(833,'Can add ep.models.epTransaction',121,'add_eptransaction'),(834,'Can change ep.models.epTransaction',121,'change_eptransaction'),(835,'Can delete ep.models.epTransaction',121,'delete_eptransaction'),(836,'Can add Ep Dashboard Permission',1,'add_epdashboardpermission'),(837,'Can change Ep Dashboard Permission',1,'change_epdashboardpermission'),(838,'Can delete Ep Dashboard Permission',1,'delete_epdashboardpermission'),(839,'Can add Report Permission',1,'add_epreportpermission'),(840,'Can change Report Permission',1,'change_epreportpermission'),(841,'Can delete Report Permission',1,'delete_epreportpermission'),(842,'Can view epdashboardpermission',181,'view_epdashboardpermission'),(843,'Can view epreportpermission',182,'view_epreportpermission'),(844,'Can view epsetup',120,'view_epsetup'),(845,'Can view eptransaction',121,'view_eptransaction');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `photo` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'arjaydiangzon','pbkdf2_sha256$36000$Wo3y2FuK0kmB$5kdPfjNxofVqqhqdk+8IJIiqjlIKFPW0PcK+8NzGE+M=','2021-11-09 13:40:32.540421','','',NULL,'bcgiarjay@gmail.com',NULL,0,0,0,7,1,1,1,0,0,0,'2021-11-09 13:40:32.540421','2021-11-12 07:54:08.313503',NULL,NULL,'user/default.gif');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_auth_area`
--

DROP TABLE IF EXISTS `auth_user_auth_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_auth_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `myuser_id` int(11) NOT NULL,
  `area_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_auth_area_myuser_id_area_id_02a19d63_uniq` (`myuser_id`,`area_id`),
  KEY `auth_user_auth_area_area_id_d1e54c70_fk_personnel_area_id` (`area_id`),
  CONSTRAINT `auth_user_auth_area_area_id_d1e54c70_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`),
  CONSTRAINT `auth_user_auth_area_myuser_id_5fb9a803_fk_auth_user_id` FOREIGN KEY (`myuser_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_auth_area`
--

LOCK TABLES `auth_user_auth_area` WRITE;
/*!40000 ALTER TABLE `auth_user_auth_area` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_auth_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_auth_dept`
--

DROP TABLE IF EXISTS `auth_user_auth_dept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_auth_dept` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `myuser_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_auth_dept_myuser_id_department_id_61d83386_uniq` (`myuser_id`,`department_id`),
  KEY `auth_user_auth_dept_department_id_5866c514_fk_personnel` (`department_id`),
  CONSTRAINT `auth_user_auth_dept_department_id_5866c514_fk_personnel` FOREIGN KEY (`department_id`) REFERENCES `personnel_department` (`id`),
  CONSTRAINT `auth_user_auth_dept_myuser_id_18a51b27_fk_auth_user_id` FOREIGN KEY (`myuser_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_auth_dept`
--

LOCK TABLES `auth_user_auth_dept` WRITE;
/*!40000 ALTER TABLE `auth_user_auth_dept` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_auth_dept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `myuser_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_myuser_id_group_id_664bdfc3_uniq` (`myuser_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_myuser_id_d03e8dcc_fk_auth_user_id` FOREIGN KEY (`myuser_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_profile`
--

DROP TABLE IF EXISTS `auth_user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_name` varchar(30) NOT NULL,
  `pin_tabs` longtext NOT NULL,
  `disabled_fields` longtext NOT NULL,
  `column_order` longtext NOT NULL,
  `preferences` longtext NOT NULL,
  `pwd_update_time` datetime(6) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `auth_user_profile_user_id_f9aded29_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_profile`
--

LOCK TABLES `auth_user_profile` WRITE;
/*!40000 ALTER TABLE `auth_user_profile` DISABLE KEYS */;
INSERT INTO `auth_user_profile` VALUES (1,'arjaydiangzon','','','','',NULL,1);
/*!40000 ALTER TABLE `auth_user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `myuser_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_myuser_id_permission_id_a558717f_uniq` (`myuser_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_myuser_id_679b1527_fk_auth_user_id` FOREIGN KEY (`myuser_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
INSERT INTO `authtoken_token` VALUES ('0e4214251a792b1d488f8ea5ba72566aaa7b295c','2021-11-09 13:40:32.802802',1);
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_adminlog`
--

DROP TABLE IF EXISTS `base_adminlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_adminlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action` varchar(50) NOT NULL,
  `targets` longtext DEFAULT NULL,
  `targets_repr` longtext DEFAULT NULL,
  `action_status` smallint(6) NOT NULL,
  `description` longtext DEFAULT NULL,
  `ip_address` char(39) DEFAULT NULL,
  `can_routable` tinyint(1) NOT NULL,
  `op_time` datetime(6) NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `base_adminlog_content_type_id_3e553c30_fk_django_content_type_id` (`content_type_id`),
  KEY `base_adminlog_user_id_ecf659f8_fk_auth_user_id` (`user_id`),
  CONSTRAINT `base_adminlog_content_type_id_3e553c30_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `base_adminlog_user_id_ecf659f8_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_adminlog`
--

LOCK TABLES `base_adminlog` WRITE;
/*!40000 ALTER TABLE `base_adminlog` DISABLE KEYS */;
INSERT INTO `base_adminlog` VALUES (1,'Login','[1]','arjaydiangzon',0,'','127.0.0.1',0,'2021-11-09 13:40:51.434870',11,1),(2,'Modify','[1]','BOCK191760589',0,'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','127.0.0.1',0,'2021-11-09 13:41:32.749557',29,1),(3,'Modify','[1]','BOCK191760589',0,'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','127.0.0.1',0,'2021-11-09 13:44:16.459437',29,1),(4,'Modify','[1]','BOCK191760589',0,'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','127.0.0.1',0,'2021-11-09 13:44:22.177793',29,1),(5,'Modify','[1]','BOCK191760589',0,'Device Name(Auto add->BLACKCODERS),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','127.0.0.1',0,'2021-11-09 13:45:13.192428',29,1),(6,'Logout','[1]','arjaydiangzon',0,'','127.0.0.1',0,'2021-11-09 13:48:49.460495',11,1),(7,'Login','[1]','arjaydiangzon',0,'','127.0.0.1',0,'2021-11-09 13:49:49.292493',11,1),(8,'Modify','[1]','BOCK191760589',0,'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','127.0.0.1',0,'2021-11-09 13:50:06.420559',29,1),(9,'Modify','[1]','BOCK191760589',0,'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','127.0.0.1',0,'2021-11-09 13:50:14.156200',29,1),(10,'Login','[1]','arjaydiangzon',0,'','192.168.50.250',0,'2021-11-09 13:52:16.844781',11,1),(11,'Modify','[1]','BOCK191760589',0,'Time Zone(8->8),Attendance Device(1->0),Transfer Mode(1->1)','192.168.50.250',0,'2021-11-09 13:52:36.998150',29,1),(12,'Modify','[1]','BOCK191760589',0,'Time Zone(8->8),Attendance Device(0->1),Transfer Mode(1->1)','192.168.50.250',0,'2021-11-09 13:52:48.160063',29,1),(13,'Delete','','BOCK191760589',0,'','192.168.50.250',0,'2021-11-09 13:53:17.519601',29,1),(14,'Modify','[2]','BOCK191760589',0,'Device Name(Auto add->BLACKCODERS),Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','192.168.50.250',0,'2021-11-09 13:54:19.828584',29,1),(15,'Reboot','[2]','BOCK191760589',0,'','192.168.50.250',0,'2021-11-09 13:54:46.758587',29,1),(16,'Delete','','BOCK191760589',0,'','192.168.50.250',0,'2021-11-09 13:58:34.755172',29,1),(17,'Modify','[3]','BOCK191760589',0,'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','192.168.50.250',0,'2021-11-09 13:58:48.337190',29,1),(18,'Clear Pending Command','[3]','BOCK191760589',0,'','192.168.50.250',0,'2021-11-09 13:59:15.040433',29,1),(19,'Read Information','[3]','BOCK191760589',0,'','192.168.50.250',0,'2021-11-09 13:59:36.438425',29,1),(20,'Add','[5]','test',0,'Area Name=test','192.168.50.250',0,'2021-11-09 13:59:55.626125',42,1),(21,'Modify','[3]','BOCK191760589',0,'Area(2->test),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','192.168.50.250',0,'2021-11-09 14:00:02.541810',29,1),(22,'Delete','','BOCK191760589',0,'','192.168.50.250',0,'2021-11-09 14:00:48.082056',29,1),(23,'Delete','','test',0,'','192.168.50.250',0,'2021-11-09 14:00:54.076439',42,1),(24,'Add','[4]','BOCK191760589',0,'Device IP=192.168.50.204,Serial Number=BOCK191760589,Device Name=BCGI,Area=Pasig City','192.168.50.250',0,'2021-11-09 14:01:33.890604',29,1),(25,'Reboot','[4]','BOCK191760589',0,'','192.168.50.250',0,'2021-11-09 14:01:56.788195',29,1),(26,'Reboot','[4]','BOCK191760589',0,'','192.168.50.250',0,'2021-11-09 14:02:33.283470',29,1),(27,'Logout','[1]','arjaydiangzon',0,'','192.168.50.250',0,'2021-11-09 14:02:49.515454',11,1),(28,'Login','[1]','arjaydiangzon',0,'','192.168.50.250',0,'2021-11-09 14:04:58.580592',11,1),(29,'Modify','[4]','BOCK191760589',0,'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','192.168.50.250',0,'2021-11-09 14:06:09.850436',29,1),(30,'Modify','[2]','Pasig City',0,'','192.168.50.250',0,'2021-11-09 14:06:28.810888',42,1),(31,'Modify','[4]','BOCK191760589',0,'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','192.168.50.250',0,'2021-11-09 14:06:42.301083',29,1),(32,'Modify','[4]','BOCK191760589',0,'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','192.168.50.250',0,'2021-11-09 14:06:48.735998',29,1),(33,'Clear Pending Command','[4]','BOCK191760589',0,'','192.168.50.250',0,'2021-11-09 14:07:41.293212',29,1),(34,'Modify','[4]','BOCK191760589',0,'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','192.168.50.250',0,'2021-11-09 14:08:52.769997',29,1),(35,'Modify','[4]','BOCK191760589',0,'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','192.168.50.250',0,'2021-11-09 14:08:57.432573',29,1),(36,'Delete','','BOCK191760589',0,'','192.168.50.250',0,'2021-11-09 14:09:00.104193',29,1),(37,'Add','[5]','BOCK191760589',0,'Device IP=192.168.50.204,Serial Number=BOCK191760589,Device Name=BCGI,Area=Pasig City','192.168.50.250',0,'2021-11-09 14:09:23.786445',29,1),(38,'Modify','[5]','BOCK191760589',0,'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','192.168.50.250',0,'2021-11-09 14:09:29.547924',29,1),(39,'Delete','','BOCK191760589',0,'','192.168.50.250',0,'2021-11-09 14:09:33.060337',29,1),(40,'Delete','','Pasig City',0,'','192.168.50.250',0,'2021-11-09 14:13:35.930371',42,1),(41,'Add','[2]','Pasig City',0,'Area Name=Pasig City','192.168.50.250',0,'2021-11-09 14:14:12.978459',42,1),(42,'Add','[6]','BOCK191760589',0,'Device IP=192.168.50.204,Serial Number=BOCK191760589,Device Name=BCGI,Area=Pasig City','192.168.50.250',0,'2021-11-09 14:15:10.617346',29,1),(43,'Modify','[6]','BOCK191760589',0,'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','192.168.50.250',0,'2021-11-09 14:15:18.010295',29,1),(44,'Modify','[6]','BOCK191760589',0,'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','192.168.50.250',0,'2021-11-09 14:15:23.287271',29,1),(45,'Modify','[2]','Pasig City',0,'','192.168.50.250',0,'2021-11-09 14:15:31.180423',42,1),(46,'Modify','[6]','BOCK191760589',0,'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','192.168.50.250',0,'2021-11-09 14:16:11.460418',29,1),(47,'Modify','[6]','BOCK191760589',0,'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','192.168.50.250',0,'2021-11-09 14:16:16.242468',29,1),(48,'Delete','','Pasig City',0,'','192.168.50.250',0,'2021-11-09 14:17:19.178192',42,1),(49,'Add','[2]','Pasig City',0,'Area Name=Pasig City','192.168.50.250',0,'2021-11-09 14:17:38.381154',42,1),(50,'Personnel Transfer','[1]','Not Authorized',0,'employee=[\'1\', \'10\', \'2\', \'11\', \'12\', \'13\', \'14\', \'15\', \'16\', \'17\', \'18\', \'19\', \'3\', \'20\', \'4\', \'5\', \'6\', \'7\', \'8\', \'9\']','192.168.50.250',0,'2021-11-09 14:17:55.040196',42,1),(51,'Personnel Transfer','[1]','Not Authorized',0,'employee=[\'1\', \'10\', \'2\', \'11\', \'12\', \'13\', \'14\', \'15\', \'16\', \'17\', \'18\', \'19\', \'3\', \'20\', \'4\', \'5\', \'6\', \'7\', \'8\', \'9\']','192.168.50.250',0,'2021-11-09 14:18:20.983943',42,1),(52,'Modify','[6]','BOCK191760589',0,'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','192.168.50.250',0,'2021-11-09 14:18:58.123585',29,1),(53,'Clear Pending Command','[6]','BOCK191760589',0,'','192.168.50.250',0,'2021-11-09 14:19:11.427531',29,1),(54,'Sync Data to the Device','[6]','BOCK191760589',0,'Employee=TruePhoto=FalseFingerprint=FalseFace=FalsePalm=FalseFinger Vein=FalseBio-Photo=False','192.168.50.250',0,'2021-11-09 14:22:20.214916',29,1),(55,'Resynchronize to device','[1, 10, 2, 11, 12, 13, 14, 15, 16, 17, 18, 19, 3, 20, 4, 5, 6, 7, 8, 9]','1 Juan,19 Lawrence,2 RJ,20 Joseph,21 Ayesha,22 Jelo,23 Yow Lee,24 Arjay,25 Charles,26 Mark,27 Joseph,28 Wilson,3 Wilson,30 Test,4 Charles,5 Mark,6 Francis,7 Renna,8 Matthew,9 Errol',0,'','192.168.50.250',0,'2021-11-09 14:38:21.594800',45,1),(56,'Login','[1]','arjaydiangzon',0,'','::1',0,'2021-11-10 07:21:03.917939',11,1),(57,'Login','[1]','arjaydiangzon',0,'','::1',0,'2021-11-10 07:50:31.591256',11,1),(58,'Modify','[6]','BOCK191760589',0,'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)','::1',0,'2021-11-10 07:51:16.624854',29,1),(59,'Login','[1]','arjaydiangzon',0,'','::1',0,'2021-11-12 07:54:09.161494',11,1);
/*!40000 ALTER TABLE `base_adminlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_attparamdepts`
--

DROP TABLE IF EXISTS `base_attparamdepts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_attparamdepts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rulename` varchar(40) NOT NULL,
  `deptid` int(11) NOT NULL,
  `operator` varchar(20) DEFAULT NULL,
  `optime` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rulename` (`rulename`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_attparamdepts`
--

LOCK TABLES `base_attparamdepts` WRITE;
/*!40000 ALTER TABLE `base_attparamdepts` DISABLE KEYS */;
/*!40000 ALTER TABLE `base_attparamdepts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_autoattexporttask`
--

DROP TABLE IF EXISTS `base_autoattexporttask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_autoattexporttask` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `task_code` varchar(30) NOT NULL,
  `task_name` varchar(30) NOT NULL,
  `params` longtext DEFAULT NULL,
  `enable` tinyint(1) NOT NULL,
  `process_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `task_code` (`task_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_autoattexporttask`
--

LOCK TABLES `base_autoattexporttask` WRITE;
/*!40000 ALTER TABLE `base_autoattexporttask` DISABLE KEYS */;
/*!40000 ALTER TABLE `base_autoattexporttask` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_autoexporttask`
--

DROP TABLE IF EXISTS `base_autoexporttask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_autoexporttask` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `task_code` varchar(30) NOT NULL,
  `task_name` varchar(30) NOT NULL,
  `params` longtext DEFAULT NULL,
  `enable` tinyint(1) NOT NULL,
  `process_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `task_code` (`task_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_autoexporttask`
--

LOCK TABLES `base_autoexporttask` WRITE;
/*!40000 ALTER TABLE `base_autoexporttask` DISABLE KEYS */;
/*!40000 ALTER TABLE `base_autoexporttask` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_bookmark`
--

DROP TABLE IF EXISTS `base_bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_bookmark` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `filters` varchar(1000) NOT NULL,
  `is_share` tinyint(1) NOT NULL,
  `time_saved` datetime(6) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `base_bookmark_content_type_id_b6a0e799_fk_django_content_type_id` (`content_type_id`),
  KEY `base_bookmark_user_id_5f2d5ca2_fk_auth_user_id` (`user_id`),
  CONSTRAINT `base_bookmark_content_type_id_b6a0e799_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `base_bookmark_user_id_5f2d5ca2_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_bookmark`
--

LOCK TABLES `base_bookmark` WRITE;
/*!40000 ALTER TABLE `base_bookmark` DISABLE KEYS */;
/*!40000 ALTER TABLE `base_bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_dbbackuplog`
--

DROP TABLE IF EXISTS `base_dbbackuplog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_dbbackuplog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `remark` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_dbbackuplog`
--

LOCK TABLES `base_dbbackuplog` WRITE;
/*!40000 ALTER TABLE `base_dbbackuplog` DISABLE KEYS */;
/*!40000 ALTER TABLE `base_dbbackuplog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_emailtemplate`
--

DROP TABLE IF EXISTS `base_emailtemplate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_emailtemplate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `enable` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_emailtemplate`
--

LOCK TABLES `base_emailtemplate` WRITE;
/*!40000 ALTER TABLE `base_emailtemplate` DISABLE KEYS */;
INSERT INTO `base_emailtemplate` VALUES (1,'2021-11-09 13:25:31.014798',NULL,'2021-11-09 13:25:31.014798',NULL,0,11,0,1,1,NULL,'',0),(2,'2021-11-09 13:25:31.030780',NULL,'2021-11-09 13:25:31.030780',NULL,0,11,0,2,1,NULL,'',0),(3,'2021-11-09 13:25:31.077796',NULL,'2021-11-09 13:25:31.077796',NULL,0,11,0,3,1,NULL,'',0),(4,'2021-11-09 13:25:31.278107',NULL,'2021-11-09 13:25:31.278107',NULL,0,11,0,7,1,NULL,'',0),(5,'2021-11-09 13:25:31.331871',NULL,'2021-11-09 13:25:31.331871',NULL,0,12,121,4,1,NULL,'',0),(6,'2021-11-09 13:25:31.400366',NULL,'2021-11-09 13:25:31.400366',NULL,0,12,121,5,1,NULL,'',0),(7,'2021-11-09 13:25:31.447537',NULL,'2021-11-09 13:25:31.447537',NULL,0,12,121,6,1,NULL,'',0),(8,'2021-11-09 13:25:31.663852',NULL,'2021-11-09 13:25:31.663852',NULL,0,12,122,4,1,NULL,'',0),(9,'2021-11-09 13:25:31.732882',NULL,'2021-11-09 13:25:31.732882',NULL,0,12,122,5,1,NULL,'',0),(10,'2021-11-09 13:25:31.748513',NULL,'2021-11-09 13:25:31.748513',NULL,0,12,122,6,1,NULL,'',0),(11,'2021-11-09 13:25:31.779772',NULL,'2021-11-09 13:25:31.779772',NULL,0,12,123,4,1,NULL,'',0),(12,'2021-11-09 13:25:31.801913',NULL,'2021-11-09 13:25:31.801913',NULL,0,12,123,5,1,NULL,'',0),(13,'2021-11-09 13:25:31.864435',NULL,'2021-11-09 13:25:31.864435',NULL,0,12,123,6,1,NULL,'',0),(14,'2021-11-09 13:25:31.880062',NULL,'2021-11-09 13:25:31.880062',NULL,0,12,124,4,1,NULL,'',0),(15,'2021-11-09 13:25:31.917829',NULL,'2021-11-09 13:25:31.917829',NULL,0,12,124,5,1,NULL,'',0),(16,'2021-11-09 13:25:31.933461',NULL,'2021-11-09 13:25:31.933461',NULL,0,12,124,6,1,NULL,'',0),(17,'2021-11-09 13:25:31.965083',NULL,'2021-11-09 13:25:31.965083',NULL,0,12,125,4,1,NULL,'',0),(18,'2021-11-09 13:25:32.018720',NULL,'2021-11-09 13:25:32.018720',NULL,0,12,125,5,1,NULL,'',0),(19,'2021-11-09 13:25:32.049618',NULL,'2021-11-09 13:25:32.049618',NULL,0,12,125,6,1,NULL,'',0),(20,'2021-11-09 13:25:32.065247',NULL,'2021-11-09 13:25:32.065247',NULL,0,13,1310,4,1,NULL,'',0),(21,'2021-11-09 13:25:32.096864',NULL,'2021-11-09 13:25:32.096864',NULL,0,13,1310,5,1,NULL,'',0),(22,'2021-11-09 13:25:32.150131',NULL,'2021-11-09 13:25:32.150131',NULL,0,13,1310,6,1,NULL,'',0),(23,'2021-11-09 13:25:32.165917',NULL,'2021-11-09 13:25:32.165917',NULL,0,13,1311,4,1,NULL,'',0),(24,'2021-11-09 13:25:32.335111',NULL,'2021-11-09 13:25:32.335111',NULL,0,13,1311,5,1,NULL,'',0),(25,'2021-11-09 13:25:32.366368',NULL,'2021-11-09 13:25:32.366368',NULL,0,13,1311,6,1,NULL,'',0),(26,'2021-11-09 13:25:32.397617',NULL,'2021-11-09 13:25:32.397617',NULL,0,14,149,4,1,NULL,'',0),(27,'2021-11-09 13:25:32.419283',NULL,'2021-11-09 13:25:32.419283',NULL,0,14,149,5,1,NULL,'',0),(28,'2021-11-09 13:25:32.450893',NULL,'2021-11-09 13:25:32.450893',NULL,0,14,149,6,1,NULL,'',0),(29,'2021-11-09 13:25:32.497773',NULL,'2021-11-09 13:25:32.497773',NULL,0,21,0,1,2,NULL,'',0),(30,'2021-11-09 13:25:32.535537',NULL,'2021-11-09 13:25:32.535537',NULL,0,21,0,2,2,NULL,'',0),(31,'2021-11-09 13:25:32.566672',NULL,'2021-11-09 13:25:32.566672',NULL,0,21,0,3,2,NULL,'',0),(32,'2021-11-09 13:25:32.582294',NULL,'2021-11-09 13:25:32.582294',NULL,0,21,0,7,2,NULL,'',0),(33,'2021-11-09 13:25:32.604296',NULL,'2021-11-09 13:25:32.604296',NULL,0,32,321,4,3,NULL,'',0),(34,'2021-11-09 13:25:32.635576',NULL,'2021-11-09 13:25:32.635576',NULL,0,32,321,5,3,NULL,'',0),(35,'2021-11-09 13:25:32.667184',NULL,'2021-11-09 13:25:32.667184',NULL,0,32,321,6,3,NULL,'',0),(36,'2021-11-09 13:25:32.883242',NULL,'2021-11-09 13:25:32.883242',NULL,0,32,322,4,3,NULL,'',0),(37,'2021-11-09 13:25:32.905383',NULL,'2021-11-09 13:25:32.905383',NULL,0,32,322,5,3,NULL,'',0),(38,'2021-11-09 13:25:32.936642',NULL,'2021-11-09 13:25:32.936642',NULL,0,32,322,6,3,NULL,'',0),(39,'2021-11-09 13:25:33.005987',NULL,'2021-11-09 13:25:33.005987',NULL,0,32,323,4,3,NULL,'',0),(40,'2021-11-09 13:25:33.021998',NULL,'2021-11-09 13:25:33.021998',NULL,0,32,323,5,3,NULL,'',0),(41,'2021-11-09 13:25:33.037251',NULL,'2021-11-09 13:25:33.037251',NULL,0,32,323,6,3,NULL,'',0),(42,'2021-11-09 13:25:33.068511',NULL,'2021-11-09 13:25:33.068511',NULL,0,32,324,4,3,NULL,'',0),(43,'2021-11-09 13:25:33.100139',NULL,'2021-11-09 13:25:33.100139',NULL,0,32,324,5,3,NULL,'',0),(44,'2021-11-09 13:25:33.122156',NULL,'2021-11-09 13:25:33.122156',NULL,0,32,324,6,3,NULL,'',0),(45,'2021-11-09 13:25:33.184753',NULL,'2021-11-09 13:25:33.184753',NULL,0,32,325,4,3,NULL,'',0),(46,'2021-11-09 13:25:33.206457',NULL,'2021-11-09 13:25:33.206457',NULL,0,32,325,5,3,NULL,'',0),(47,'2021-11-09 13:25:33.237716',NULL,'2021-11-09 13:25:33.237716',NULL,0,32,325,6,3,NULL,'',0),(48,'2021-11-09 13:25:33.470471',NULL,'2021-11-09 13:25:33.470471',NULL,0,33,3310,4,3,NULL,'',0),(49,'2021-11-09 13:25:33.508247',NULL,'2021-11-09 13:25:33.508247',NULL,0,33,3310,5,3,NULL,'',0),(50,'2021-11-09 13:25:33.539876',NULL,'2021-11-09 13:25:33.539876',NULL,0,33,3310,6,3,NULL,'',0),(51,'2021-11-09 13:25:33.555504',NULL,'2021-11-09 13:25:33.555504',NULL,0,33,3311,4,3,NULL,'',0),(52,'2021-11-09 13:25:33.586761',NULL,'2021-11-09 13:25:33.586761',NULL,0,33,3311,5,3,NULL,'',0),(53,'2021-11-09 13:25:33.608776',NULL,'2021-11-09 13:25:33.608776',NULL,0,33,3311,6,3,NULL,'',0),(54,'2021-11-09 13:25:33.640395',NULL,'2021-11-09 13:25:33.640395',NULL,0,34,349,4,3,NULL,'',0),(55,'2021-11-09 13:25:33.655669',NULL,'2021-11-09 13:25:33.655669',NULL,0,34,349,5,3,NULL,'',0),(56,'2021-11-09 13:25:33.687290',NULL,'2021-11-09 13:25:33.687290',NULL,0,34,349,6,3,NULL,'',0),(57,'2021-11-09 13:25:33.709067',NULL,'2021-11-09 13:25:33.709067',NULL,0,42,421,4,4,NULL,'',0),(58,'2021-11-09 13:25:33.740325',NULL,'2021-11-09 13:25:33.740325',NULL,0,42,421,5,4,NULL,'',0),(59,'2021-11-09 13:25:33.771585',NULL,'2021-11-09 13:25:33.771585',NULL,0,42,421,6,4,NULL,'',0),(60,'2021-11-09 13:25:33.802848',NULL,'2021-11-09 13:25:33.802848',NULL,0,42,422,4,4,NULL,'',0),(61,'2021-11-09 13:25:33.825351',NULL,'2021-11-09 13:25:33.825351',NULL,0,42,422,5,4,NULL,'',0),(62,'2021-11-09 13:25:34.073280',NULL,'2021-11-09 13:25:34.073280',NULL,0,42,422,6,4,NULL,'',0),(63,'2021-11-09 13:25:34.088913',NULL,'2021-11-09 13:25:34.088913',NULL,0,42,423,4,4,NULL,'',0),(64,'2021-11-09 13:25:34.154926',NULL,'2021-11-09 13:25:34.154926',NULL,0,42,423,5,4,NULL,'',0),(65,'2021-11-09 13:25:34.176662',NULL,'2021-11-09 13:25:34.176662',NULL,0,42,423,6,4,NULL,'',0),(66,'2021-11-09 13:25:34.210960',NULL,'2021-11-09 13:25:34.210960',NULL,0,42,424,4,4,NULL,'',0),(67,'2021-11-09 13:25:34.226589',NULL,'2021-11-09 13:25:34.226589',NULL,0,42,424,5,4,NULL,'',0),(68,'2021-11-09 13:25:34.257848',NULL,'2021-11-09 13:25:34.257848',NULL,0,42,424,6,4,NULL,'',0),(69,'2021-11-09 13:25:34.311115',NULL,'2021-11-09 13:25:34.311115',NULL,0,42,425,4,4,NULL,'',0),(70,'2021-11-09 13:25:34.458889',NULL,'2021-11-09 13:25:34.458889',NULL,0,42,425,5,4,NULL,'',0),(71,'2021-11-09 13:25:34.490151',NULL,'2021-11-09 13:25:34.490151',NULL,0,42,425,6,4,NULL,'',0),(72,'2021-11-09 13:25:34.512255',NULL,'2021-11-09 13:25:34.512255',NULL,0,43,4310,4,4,NULL,'',0),(73,'2021-11-09 13:25:34.574778',NULL,'2021-11-09 13:25:34.574778',NULL,0,43,4310,5,4,NULL,'',0),(74,'2021-11-09 13:25:34.590775',NULL,'2021-11-09 13:25:34.590775',NULL,0,43,4310,6,4,NULL,'',0),(75,'2021-11-09 13:25:34.628423',NULL,'2021-11-09 13:25:34.628423',NULL,0,43,4311,4,4,NULL,'',0),(76,'2021-11-09 13:25:34.644411',NULL,'2021-11-09 13:25:34.644411',NULL,0,43,4311,5,4,NULL,'',0),(77,'2021-11-09 13:25:34.675672',NULL,'2021-11-09 13:25:34.675672',NULL,0,43,4311,6,4,NULL,'',0),(78,'2021-11-09 13:25:34.690961',NULL,'2021-11-09 13:25:34.690961',NULL,0,44,449,4,4,NULL,'',0),(79,'2021-11-09 13:25:34.713082',NULL,'2021-11-09 13:25:34.713082',NULL,0,44,449,5,4,NULL,'',0),(80,'2021-11-09 13:25:34.744343',NULL,'2021-11-09 13:25:34.744343',NULL,0,44,449,6,4,NULL,'',0),(81,'2021-11-09 13:25:34.775601',NULL,'2021-11-09 13:25:34.775601',NULL,0,0,0,101,5,NULL,'',0),(82,'2021-11-09 13:25:34.791232',NULL,'2021-11-09 13:25:34.791232',NULL,0,0,0,102,5,NULL,'',0);
/*!40000 ALTER TABLE `base_emailtemplate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_eventalertsetting`
--

DROP TABLE IF EXISTS `base_eventalertsetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_eventalertsetting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `whatapp_alert` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_eventalertsetting`
--

LOCK TABLES `base_eventalertsetting` WRITE;
/*!40000 ALTER TABLE `base_eventalertsetting` DISABLE KEYS */;
INSERT INTO `base_eventalertsetting` VALUES (1,'2021-11-09 13:25:34.875890',NULL,'2021-11-09 13:25:34.875890',NULL,0,1,'menu_att_manualLog','menu_attendance','menu_group_approvalManagement',1,1,0,0),(2,'2021-11-09 13:25:34.907148',NULL,'2021-11-09 13:25:34.907148',NULL,0,2,'menu_att_leave','menu_attendance','menu_group_approvalManagement',1,1,0,0),(3,'2021-11-09 13:25:34.991824',NULL,'2021-11-09 13:25:34.991824',NULL,0,3,'menu_att_overtime','menu_attendance','menu_group_approvalManagement',1,1,0,0),(4,'2021-11-09 13:25:35.261351',NULL,'2021-11-09 13:25:35.261351',NULL,0,4,'menu_att_training','menu_attendance','menu_group_approvalManagement',1,1,0,0),(5,'2021-11-09 13:25:35.292611',NULL,'2021-11-09 13:25:35.292611',NULL,0,5,'menu_att_adjustSchedule','menu_attendance','menu_group_approvalManagement',1,1,0,0),(6,'2021-11-09 13:25:35.377275',NULL,'2021-11-09 13:25:35.377275',NULL,0,6,'payCode.default.lateIn','menu_attendance','menu_group_att_rule',1,1,0,0),(7,'2021-11-09 13:25:35.593707',NULL,'2021-11-09 13:25:35.593707',NULL,0,7,'payCode.default.earlyOut','menu_attendance','menu_group_att_rule',1,1,0,0),(8,'2021-11-09 13:25:35.632062',NULL,'2021-11-09 13:25:35.632062',NULL,0,8,'payCode.default.absence','menu_attendance','menu_group_att_rule',1,1,0,0),(9,'2021-11-09 13:25:35.694586',NULL,'2021-11-09 13:25:35.694586',NULL,0,9,'menu.visitor.registration','menu.visitor.registration.visitor','menu.visitor.reservation',1,0,0,0),(10,'2021-11-09 13:25:35.716606',NULL,'2021-11-09 13:25:35.716606',NULL,0,10,'meeting.menus.meeting','meeting.menus.meeting','meeting.menus.meeting',1,0,0,0),(11,'2021-11-09 13:25:35.732598',NULL,'2021-11-09 13:25:35.732598',NULL,0,11,'meeting.menus.manualLog','meeting.menus.meeting','meeting.menus.manualLog',1,0,0,0),(12,'2021-11-09 13:25:35.765742',NULL,'2021-11-09 13:25:35.765742',NULL,0,12,'menu_device_publicMessage','menu_group_device_deviceManagement','menu_mobile_announcement',0,1,0,0),(13,'2021-11-09 13:25:35.817013',NULL,'2021-11-09 13:25:35.817013',NULL,0,13,'menu_device_privateMessage','menu_group_device_deviceManagement','menu_mobile_announcement',0,1,0,0);
/*!40000 ALTER TABLE `base_eventalertsetting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_linenotifysetting`
--

DROP TABLE IF EXISTS `base_linenotifysetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_linenotifysetting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `include_sub_department` int(11) DEFAULT NULL,
  `line_notify_token` varchar(200) DEFAULT NULL,
  `message_type` int(11) DEFAULT NULL,
  `message_head` varchar(100) DEFAULT NULL,
  `message_tail` varchar(100) DEFAULT NULL,
  `push_time` time(6) DEFAULT NULL,
  `is_valid` int(11) DEFAULT NULL,
  `remark` varchar(200) DEFAULT NULL,
  `line_notify_dept_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `base_linenotifysetting_line_notify_dept_id_line_dd79374f_uniq` (`line_notify_dept_id`,`line_notify_token`,`message_type`),
  KEY `base_linenotifysetting_line_notify_dept_id_0643a5ed` (`line_notify_dept_id`),
  CONSTRAINT `base_linenotifysetti_line_notify_dept_id_0643a5ed_fk_personnel` FOREIGN KEY (`line_notify_dept_id`) REFERENCES `personnel_department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_linenotifysetting`
--

LOCK TABLES `base_linenotifysetting` WRITE;
/*!40000 ALTER TABLE `base_linenotifysetting` DISABLE KEYS */;
/*!40000 ALTER TABLE `base_linenotifysetting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_securitypolicy`
--

DROP TABLE IF EXISTS `base_securitypolicy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_securitypolicy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `export_encryption_password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_securitypolicy`
--

LOCK TABLES `base_securitypolicy` WRITE;
/*!40000 ALTER TABLE `base_securitypolicy` DISABLE KEYS */;
INSERT INTO `base_securitypolicy` VALUES (1,0,0,5,1,0,5,60,0,0,90,2,1,0,60,0,NULL);
/*!40000 ALTER TABLE `base_securitypolicy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_sendemail`
--

DROP TABLE IF EXISTS `base_sendemail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_sendemail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `purpose` int(11) NOT NULL,
  `email_to` longtext NOT NULL,
  `email_cc` longtext DEFAULT NULL,
  `email_bcc` longtext DEFAULT NULL,
  `email_subject` varchar(40) NOT NULL,
  `email_content` longtext DEFAULT NULL,
  `send_time` datetime(6) DEFAULT NULL,
  `send_status` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_sendemail`
--

LOCK TABLES `base_sendemail` WRITE;
/*!40000 ALTER TABLE `base_sendemail` DISABLE KEYS */;
/*!40000 ALTER TABLE `base_sendemail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_sftpsetting`
--

DROP TABLE IF EXISTS `base_sftpsetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_sftpsetting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `host` varchar(39) NOT NULL,
  `port` int(11) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `user_password` varchar(128) DEFAULT NULL,
  `user_key` longtext DEFAULT NULL,
  `is_sftp` smallint(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_sftpsetting`
--

LOCK TABLES `base_sftpsetting` WRITE;
/*!40000 ALTER TABLE `base_sftpsetting` DISABLE KEYS */;
/*!40000 ALTER TABLE `base_sftpsetting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_sysparam`
--

DROP TABLE IF EXISTS `base_sysparam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_sysparam` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `para_name` varchar(30) NOT NULL,
  `para_type` varchar(10) DEFAULT NULL,
  `para_value` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `base_sysparam_para_name_para_type_3086789a_uniq` (`para_name`,`para_type`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_sysparam`
--

LOCK TABLES `base_sysparam` WRITE;
/*!40000 ALTER TABLE `base_sysparam` DISABLE KEYS */;
INSERT INTO `base_sysparam` VALUES (1,'rule_id','rule_0','0'),(2,'dept_id','rule_0','0'),(3,'apply_name','rule_0','All'),(4,'rule_name','rule_0','Default Attendance Rules'),(5,'minutes_early','rule_0','0'),(6,'minutes_late','rule_0','0'),(7,'minutes_no_break_in','rule_0','60'),(8,'minutes_no_break_out','rule_0','60'),(9,'minutes_no_in','rule_0','60'),(10,'minutes_no_leave','rule_0','60'),(11,'minutes_not_over_time','rule_0','60'),(12,'minutes_work_day','rule_0','480'),(13,'no_break_in','rule_0','1012'),(14,'no_break_out','rule_0','1012'),(15,'no_in','rule_0','1001'),(16,'no_leave','rule_0','1002'),(17,'out_over_time','rule_0','0'),(18,'two_day','rule_0','0'),(19,'check_in_color','rule_0','16777151'),(20,'check_out_color','rule_0','12910591'),(21,'db_version','','2002'),(22,'installdate','','92ae-U4xNsCAYi1BCz6eTEeCtHAL_LlnMxefuWQH7JWd1Zg_BvMn'),(23,'sys_date','','92ae-U4xNsCAYi1BCz6eTEeCtHAL_LlnMxefuWQH7JWd1Zg_BvMn'),(24,'ADMSDBVersion','','544'),(25,'active_date','','95deCkyyRttRBdTf52u3UmfPQ-bJSN3mkJE9Cocv29gKLXAAsKcK');
/*!40000 ALTER TABLE `base_sysparam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_sysparamdept`
--

DROP TABLE IF EXISTS `base_sysparamdept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_sysparamdept` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rule_name` varchar(40) NOT NULL,
  `dept_id` int(11) NOT NULL,
  `operator` varchar(20) DEFAULT NULL,
  `op_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rule_name` (`rule_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_sysparamdept`
--

LOCK TABLES `base_sysparamdept` WRITE;
/*!40000 ALTER TABLE `base_sysparamdept` DISABLE KEYS */;
/*!40000 ALTER TABLE `base_sysparamdept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_systemlog`
--

DROP TABLE IF EXISTS `base_systemlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_systemlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `execute_time` datetime(6) NOT NULL,
  `operation` smallint(6) NOT NULL,
  `execute_status` smallint(6) NOT NULL,
  `description` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_systemlog`
--

LOCK TABLES `base_systemlog` WRITE;
/*!40000 ALTER TABLE `base_systemlog` DISABLE KEYS */;
INSERT INTO `base_systemlog` VALUES (1,'2021-11-29 07:53:25.945776',2,0,'Active: 0, Inactive: 0'),(2,'2021-11-29 07:53:36.337131',1,0,'Success: 0, Failed: 0');
/*!40000 ALTER TABLE `base_systemlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `base_systemsetting`
--

DROP TABLE IF EXISTS `base_systemsetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `base_systemsetting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `name` varchar(30) NOT NULL,
  `value` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_systemsetting`
--

LOCK TABLES `base_systemsetting` WRITE;
/*!40000 ALTER TABLE `base_systemsetting` DISABLE KEYS */;
/*!40000 ALTER TABLE `base_systemsetting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2021-11-09 13:41:32.304651','1','BOCK191760589',2,'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(2,'2021-11-09 13:44:16.420716','1','BOCK191760589',2,'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(3,'2021-11-09 13:44:22.061598','1','BOCK191760589',2,'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(4,'2021-11-09 13:45:13.153908','1','BOCK191760589',2,'Device Name(Auto add->BLACKCODERS),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(5,'2021-11-09 13:50:06.394979','1','BOCK191760589',2,'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(6,'2021-11-09 13:50:14.103058','1','BOCK191760589',2,'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(7,'2021-11-09 13:52:36.977116','1','BOCK191760589',2,'Time Zone(8->8),Attendance Device(1->0),Transfer Mode(1->1)',29,1),(8,'2021-11-09 13:52:48.089853','1','BOCK191760589',2,'Time Zone(8->8),Attendance Device(0->1),Transfer Mode(1->1)',29,1),(9,'2021-11-09 13:54:19.804090','2','BOCK191760589',2,'Device Name(Auto add->BLACKCODERS),Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(10,'2021-11-09 13:58:48.303171','3','BOCK191760589',2,'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(11,'2021-11-09 13:59:55.626125','5','test',1,'Area Name=test',42,1),(12,'2021-11-09 14:00:02.524809','3','BOCK191760589',2,'Area(2->test),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(13,'2021-11-09 14:01:33.887607','4','BOCK191760589',1,'Device IP=192.168.50.204,Serial Number=BOCK191760589,Device Name=BCGI,Area=Pasig City',29,1),(14,'2021-11-09 14:06:09.817725','4','BOCK191760589',2,'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(15,'2021-11-09 14:06:28.781285','2','Pasig City',2,'',42,1),(16,'2021-11-09 14:06:42.276081','4','BOCK191760589',2,'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(17,'2021-11-09 14:06:48.704645','4','BOCK191760589',2,'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(18,'2021-11-09 14:08:52.714315','4','BOCK191760589',2,'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(19,'2021-11-09 14:08:57.385735','4','BOCK191760589',2,'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(20,'2021-11-09 14:09:23.786445','5','BOCK191760589',1,'Device IP=192.168.50.204,Serial Number=BOCK191760589,Device Name=BCGI,Area=Pasig City',29,1),(21,'2021-11-09 14:09:29.463125','5','BOCK191760589',2,'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(22,'2021-11-09 14:14:12.977452','2','Pasig City',1,'Area Name=Pasig City',42,1),(23,'2021-11-09 14:15:10.537326','6','BOCK191760589',1,'Device IP=192.168.50.204,Serial Number=BOCK191760589,Device Name=BCGI,Area=Pasig City',29,1),(24,'2021-11-09 14:15:17.980190','6','BOCK191760589',2,'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(25,'2021-11-09 14:15:23.212270','6','BOCK191760589',2,'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(26,'2021-11-09 14:15:31.143424','2','Pasig City',2,'',42,1),(27,'2021-11-09 14:16:11.432871','6','BOCK191760589',2,'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(28,'2021-11-09 14:16:16.196599','6','BOCK191760589',2,'Area(2->Not Authorized),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(29,'2021-11-09 14:17:38.381154','2','Pasig City',1,'Area Name=Pasig City',42,1),(30,'2021-11-09 14:18:58.103745','6','BOCK191760589',2,'Area(1->Pasig City),Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1),(31,'2021-11-10 07:51:16.549079','6','BOCK191760589',2,'Time Zone(8->8),Attendance Device(1->1),Transfer Mode(1->1)',29,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_celery_beat_clockedschedule`
--

DROP TABLE IF EXISTS `django_celery_beat_clockedschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_celery_beat_clockedschedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clocked_time` datetime(6) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_celery_beat_clockedschedule`
--

LOCK TABLES `django_celery_beat_clockedschedule` WRITE;
/*!40000 ALTER TABLE `django_celery_beat_clockedschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_celery_beat_clockedschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_celery_beat_crontabschedule`
--

DROP TABLE IF EXISTS `django_celery_beat_crontabschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_celery_beat_crontabschedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `minute` varchar(240) NOT NULL,
  `hour` varchar(96) NOT NULL,
  `day_of_week` varchar(64) NOT NULL,
  `day_of_month` varchar(124) NOT NULL,
  `month_of_year` varchar(64) NOT NULL,
  `timezone` varchar(63) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_celery_beat_crontabschedule`
--

LOCK TABLES `django_celery_beat_crontabschedule` WRITE;
/*!40000 ALTER TABLE `django_celery_beat_crontabschedule` DISABLE KEYS */;
INSERT INTO `django_celery_beat_crontabschedule` VALUES (1,'0','4','*','*','*','Asia/Singapore'),(2,'30','0','*','*','*','Asia/Singapore'),(3,'1','0','*','*','*','Asia/Singapore'),(4,'5','0','*','*','*','Asia/Singapore'),(5,'10','0','*','*','*','Asia/Singapore'),(6,'20','0','*','1','1','Asia/Singapore'),(7,'0','2','*','*','*','Asia/Singapore'),(8,'30','2','*','*','*','Asia/Singapore'),(9,'0','0','*','*','*','Asia/Singapore');
/*!40000 ALTER TABLE `django_celery_beat_crontabschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_celery_beat_intervalschedule`
--

DROP TABLE IF EXISTS `django_celery_beat_intervalschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_celery_beat_intervalschedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `every` int(11) NOT NULL,
  `period` varchar(24) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_celery_beat_intervalschedule`
--

LOCK TABLES `django_celery_beat_intervalschedule` WRITE;
/*!40000 ALTER TABLE `django_celery_beat_intervalschedule` DISABLE KEYS */;
INSERT INTO `django_celery_beat_intervalschedule` VALUES (1,3,'seconds'),(2,200,'seconds'),(3,60,'seconds');
/*!40000 ALTER TABLE `django_celery_beat_intervalschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_celery_beat_periodictask`
--

DROP TABLE IF EXISTS `django_celery_beat_periodictask`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_celery_beat_periodictask` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `total_run_count` int(10) unsigned NOT NULL,
  `date_changed` datetime(6) NOT NULL,
  `description` longtext NOT NULL,
  `crontab_id` int(11) DEFAULT NULL,
  `interval_id` int(11) DEFAULT NULL,
  `solar_id` int(11) DEFAULT NULL,
  `one_off` tinyint(1) NOT NULL,
  `start_time` datetime(6) DEFAULT NULL,
  `priority` int(10) unsigned DEFAULT NULL,
  `headers` longtext NOT NULL,
  `clocked_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `django_celery_beat_p_crontab_id_d3cba168_fk_django_ce` (`crontab_id`),
  KEY `django_celery_beat_p_interval_id_a8ca27da_fk_django_ce` (`interval_id`),
  KEY `django_celery_beat_p_solar_id_a87ce72c_fk_django_ce` (`solar_id`),
  KEY `django_celery_beat_p_clocked_id_47a69f82_fk_django_ce` (`clocked_id`),
  CONSTRAINT `django_celery_beat_p_clocked_id_47a69f82_fk_django_ce` FOREIGN KEY (`clocked_id`) REFERENCES `django_celery_beat_clockedschedule` (`id`),
  CONSTRAINT `django_celery_beat_p_crontab_id_d3cba168_fk_django_ce` FOREIGN KEY (`crontab_id`) REFERENCES `django_celery_beat_crontabschedule` (`id`),
  CONSTRAINT `django_celery_beat_p_interval_id_a8ca27da_fk_django_ce` FOREIGN KEY (`interval_id`) REFERENCES `django_celery_beat_intervalschedule` (`id`),
  CONSTRAINT `django_celery_beat_p_solar_id_a87ce72c_fk_django_ce` FOREIGN KEY (`solar_id`) REFERENCES `django_celery_beat_solarschedule` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_celery_beat_periodictask`
--

LOCK TABLES `django_celery_beat_periodictask` WRITE;
/*!40000 ALTER TABLE `django_celery_beat_periodictask` DISABLE KEYS */;
INSERT INTO `django_celery_beat_periodictask` VALUES (1,'celery.backend_cleanup','celery.backend_cleanup','[]','{}',NULL,NULL,NULL,NULL,1,'2021-11-29 07:56:19.388153',10,'2021-11-29 07:56:19.388171','',1,NULL,NULL,0,NULL,NULL,'{}',NULL),(2,'iclock.tasks.data_sync','iclock.tasks.data_sync','[]','{}',NULL,NULL,NULL,NULL,1,'2021-11-29 13:15:05.646490',124361,'2021-11-29 13:15:05.646490','',NULL,1,NULL,0,NULL,NULL,'{}',NULL),(3,'iclock.tasks.device_online_monitor','iclock.tasks.device_online_monitor','[]','{}',NULL,NULL,NULL,NULL,1,'2021-11-29 13:15:05.540065',1895,'2021-11-29 13:15:05.541065','',NULL,2,NULL,0,NULL,NULL,'{}',NULL),(4,'mobile.task.upload_gps','mobile.task.upload_gps','[]','{}',NULL,NULL,NULL,NULL,1,'2021-11-29 07:56:19.078344',9,'2021-11-29 07:56:19.078344','',2,NULL,NULL,0,NULL,NULL,'{}',NULL),(5,'psnl.tasks.employment_status_monitoring','psnl.tasks.employment_status_monitoring','[]','{}',NULL,NULL,NULL,NULL,1,'2021-11-29 07:56:19.048298',10,'2021-11-29 07:56:19.048298','',3,NULL,NULL,0,NULL,NULL,'{}',NULL),(6,'psnl.tasks.resigned_scanner','psnl.tasks.resigned_scanner','[]','{}',NULL,NULL,NULL,NULL,1,'2021-11-29 07:56:18.938491',9,'2021-11-29 07:56:18.938491','',4,NULL,NULL,0,NULL,NULL,'{}',NULL),(7,'psnl.tasks.document_expired_alert','psnl.tasks.document_expired_alert','[]','{}',NULL,NULL,NULL,NULL,1,'2021-11-29 07:56:18.978251',9,'2021-11-29 07:56:18.978251','',5,NULL,NULL,0,NULL,NULL,'{}',NULL),(8,'meeting.tasks.meeting_monitor','meeting.tasks.meeting_monitor','[]','{}',NULL,NULL,NULL,NULL,1,'2021-11-29 13:15:05.611222',6296,'2021-11-29 13:15:05.612222','',NULL,3,NULL,0,NULL,NULL,'{}',NULL),(9,'att.tasks.restore_leaveyearbalance_all','att.tasks.restore_leaveyearbalance_all','[]','{}',NULL,NULL,NULL,NULL,1,NULL,0,'2021-11-29 07:53:12.267484','',6,NULL,NULL,0,NULL,NULL,'{}',NULL),(10,'base.tasks.daily_licence_verify','base.tasks.daily_licence_verify','[]','{}',NULL,NULL,NULL,NULL,1,'2021-11-29 07:56:19.108306',10,'2021-11-29 07:56:19.108306','',7,NULL,NULL,0,NULL,NULL,'{}',NULL),(11,'base.tasks.daily_aof_rewrite','base.tasks.daily_aof_rewrite','[]','{}',NULL,NULL,NULL,NULL,1,'2021-11-29 07:56:19.008346',9,'2021-11-29 07:56:19.008346','',8,NULL,NULL,0,NULL,NULL,'{}',NULL),(12,'beat_tasks.run_minute_task','beat_tasks.run_minute_task','[]','{}',NULL,NULL,NULL,NULL,1,'2021-11-29 13:15:05.570767',6296,'2021-11-29 13:15:05.571767','',NULL,3,NULL,0,NULL,NULL,'{}',NULL),(13,'iclock.tasks.data_clean','iclock.tasks.data_clean','[]','{}',NULL,NULL,NULL,NULL,1,'2021-11-29 07:56:19.178340',10,'2021-11-29 07:56:19.178340','',9,NULL,NULL,0,NULL,NULL,'{}',NULL),(14,'iclock.tasks.zip_clean','iclock.tasks.zip_clean','[]','{}',NULL,NULL,NULL,NULL,1,'2021-11-29 07:56:19.258227',10,'2021-11-29 07:56:19.258227','',9,NULL,NULL,0,NULL,NULL,'{}',NULL);
/*!40000 ALTER TABLE `django_celery_beat_periodictask` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_celery_beat_periodictasks`
--

DROP TABLE IF EXISTS `django_celery_beat_periodictasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_celery_beat_periodictasks` (
  `ident` smallint(6) NOT NULL,
  `last_update` datetime(6) NOT NULL,
  PRIMARY KEY (`ident`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_celery_beat_periodictasks`
--

LOCK TABLES `django_celery_beat_periodictasks` WRITE;
/*!40000 ALTER TABLE `django_celery_beat_periodictasks` DISABLE KEYS */;
INSERT INTO `django_celery_beat_periodictasks` VALUES (1,'2021-11-29 07:53:16.577586');
/*!40000 ALTER TABLE `django_celery_beat_periodictasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_celery_beat_solarschedule`
--

DROP TABLE IF EXISTS `django_celery_beat_solarschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_celery_beat_solarschedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event` varchar(24) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_celery_beat_solar_event_latitude_longitude_ba64999a_uniq` (`event`,`latitude`,`longitude`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_celery_beat_solarschedule`
--

LOCK TABLES `django_celery_beat_solarschedule` WRITE;
/*!40000 ALTER TABLE `django_celery_beat_solarschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_celery_beat_solarschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=183 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (104,'acc','acccombination'),(103,'acc','accgroups'),(102,'acc','accholiday'),(105,'acc','accprivilege'),(106,'acc','accterminal'),(101,'acc','acctimezone'),(173,'accounts','adminbiodata'),(11,'accounts','myuser'),(25,'accounts','usernotification'),(174,'accounts','userprofile'),(123,'admin','logentry'),(154,'att','attcalclog'),(55,'att','attcode'),(155,'att','attemployee'),(56,'att','attgroup'),(57,'att','attpolicy'),(77,'att','attreportsetting'),(60,'att','attrule'),(65,'att','attschedule'),(171,'att','attsettingpermission'),(64,'att','attshift'),(6,'att','att_setting_permission'),(73,'att','breaktime'),(74,'att','changeschedule'),(58,'att','departmentpolicy'),(75,'att','departmentschedule'),(72,'att','deptattrule'),(59,'att','grouppolicy'),(76,'att','groupschedule'),(71,'att','holiday'),(68,'att','leave'),(78,'att','leavegroup'),(79,'att','leavegroupdetail'),(80,'att','leaveyearbalance'),(62,'att','manuallog'),(70,'att','overtime'),(156,'att','overtimepolicy'),(54,'att','paycode'),(157,'att','payloadattcode'),(158,'att','payloadbase'),(159,'att','payloadbreak'),(160,'att','payloadeffectpunch'),(161,'att','payloadexception'),(162,'att','payloadmulpunchset'),(163,'att','payloadovertime'),(164,'att','payloadparing'),(165,'att','payloadpaycode'),(166,'att','payloadpunch'),(167,'att','payloadtimecard'),(61,'att','reportparam'),(172,'att','reportpermission'),(168,'att','reporttemplate'),(5,'att','report_permission'),(169,'att','shiftdetail'),(67,'att','temporaryschedule'),(66,'att','tempschedule'),(63,'att','timeinterval'),(69,'att','training'),(170,'att','webpunch'),(2,'auth','group'),(1,'auth','permission'),(125,'authtoken','token'),(140,'base','abstractpermission'),(13,'base','adminlog'),(134,'base','attparam'),(135,'base','attparamdepts'),(23,'base','autoattexporttask'),(16,'base','autoexporttask'),(15,'base','bookmark'),(18,'base','dbbackuplog'),(27,'base','emailtemplate'),(28,'base','eventalertsetting'),(17,'base','linenotifysetting'),(26,'base','securitypolicy'),(136,'base','sendemail'),(12,'base','sftpsetting'),(22,'base','syncarea'),(19,'base','syncdepartment'),(21,'base','syncemployee'),(20,'base','syncjob'),(137,'base','sysparam'),(138,'base','sysparamdept'),(24,'base','systemlog'),(139,'base','systemsetting'),(141,'base','systemsettingpermission'),(3,'base','system_setting_permission'),(122,'contenttypes','contenttype'),(133,'django_celery_beat','clockedschedule'),(128,'django_celery_beat','crontabschedule'),(129,'django_celery_beat','intervalschedule'),(130,'django_celery_beat','periodictask'),(131,'django_celery_beat','periodictasks'),(132,'django_celery_beat','solarschedule'),(181,'ep','epdashboardpermission'),(182,'ep','epreportpermission'),(120,'ep','epsetup'),(121,'ep','eptransaction'),(9,'ep','ep_dashboard_permission'),(10,'ep','ep_report_permission'),(126,'guardian','groupobjectpermission'),(127,'guardian','userobjectpermission'),(35,'iclock','biodata'),(40,'iclock','biophoto'),(146,'iclock','deviceemployee'),(39,'iclock','devicemoduleconfig'),(145,'iclock','devicesettingpermission'),(4,'iclock','device_setting_permission'),(41,'iclock','errorcommandlog'),(36,'iclock','privatemessage'),(37,'iclock','publicmessage'),(142,'iclock','shortmessage'),(29,'iclock','terminal'),(33,'iclock','terminalcommand'),(34,'iclock','terminalcommandlog'),(143,'iclock','terminalemployee'),(31,'iclock','terminallog'),(50,'iclock','terminalparameter'),(32,'iclock','terminaluploadlog'),(38,'iclock','terminalworkcode'),(30,'iclock','transaction'),(144,'iclock','transactionproofcmd'),(117,'meeting','meetingentity'),(118,'meeting','meetingmanuallog'),(179,'meeting','meetingpayloadbase'),(180,'meeting','meetingreportpermission'),(115,'meeting','meetingroom'),(116,'meeting','meetingroomdevice'),(119,'meeting','meetingtransaction'),(8,'meeting','meeting_report_permission'),(81,'mobile','announcement'),(84,'mobile','appactionlog'),(82,'mobile','applist'),(83,'mobile','appnotification'),(86,'mobile','gpsfordepartment'),(85,'mobile','gpsforemployee'),(87,'mobile','gpslocation'),(88,'mobile','mobileapirequestlog'),(90,'payroll','deductionformula'),(95,'payroll','emploan'),(89,'payroll','emppayrollprofile'),(91,'payroll','exceptionformula'),(100,'payroll','extradeduction'),(99,'payroll','extraincrease'),(92,'payroll','increasementformula'),(93,'payroll','leaveformula'),(94,'payroll','overtimeformula'),(176,'payroll','payrollpayload'),(177,'payroll','payrollpayloadpaycode'),(178,'payroll','payrollreportpermission'),(7,'payroll','payroll_report_permission'),(96,'payroll','reimbursement'),(97,'payroll','salaryadvance'),(98,'payroll','salarystructure'),(42,'personnel','area'),(147,'personnel','assignareaemployee'),(43,'personnel','certification'),(44,'personnel','department'),(45,'personnel','employee'),(150,'personnel','employeecalendar'),(48,'personnel','employeecertification'),(49,'personnel','employeecustomattribute'),(151,'personnel','employeeextrainfo'),(148,'personnel','employeeprofile'),(149,'personnel','employment'),(46,'personnel','position'),(47,'personnel','resign'),(14,'rest_framework_tracking','apirequestlog'),(124,'sessions','session'),(175,'staff','stafftoken'),(109,'visitor','reason'),(108,'visitor','reservation'),(107,'visitor','visitor'),(113,'visitor','visitorbiodata'),(112,'visitor','visitorbiophoto'),(111,'visitor','visitorconfig'),(110,'visitor','visitorlog'),(114,'visitor','visitortransaction'),(152,'workflow','nodeinstance'),(52,'workflow','workflowengine'),(153,'workflow','workflowinstance'),(53,'workflow','workflownode'),(51,'workflow','workflowrole');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'personnel','0001_initial','2021-11-09 13:13:34.018687'),(2,'contenttypes','0001_initial','2021-11-09 13:13:35.670169'),(3,'contenttypes','0002_remove_content_type_name','2021-11-09 13:13:38.009210'),(4,'workflow','0001_initial','2021-11-09 13:14:19.179816'),(5,'iclock','0001_initial','2021-11-09 13:14:29.961989'),(6,'auth','0001_initial','2021-11-09 13:14:38.370966'),(7,'auth','0002_alter_permission_name_max_length','2021-11-09 13:14:41.811751'),(8,'auth','0003_alter_user_email_max_length','2021-11-09 13:14:41.876089'),(9,'auth','0004_alter_user_username_opts','2021-11-09 13:14:41.935744'),(10,'auth','0005_alter_user_last_login_null','2021-11-09 13:14:42.002107'),(11,'auth','0006_require_contenttypes_0002','2021-11-09 13:14:42.037111'),(12,'auth','0007_alter_validators_add_error_messages','2021-11-09 13:14:42.094067'),(13,'auth','0008_alter_user_username_max_length','2021-11-09 13:14:42.151484'),(14,'base','0001_initial','2021-11-09 13:15:08.663668'),(15,'accounts','0001_initial','2021-11-09 13:15:17.705844'),(16,'base','0002_auto_20200901_1642','2021-11-09 13:15:27.807825'),(17,'att','0001_initial','2021-11-09 13:15:38.432459'),(18,'att','0002_auto_20200901_1642','2021-11-09 13:19:07.148839'),(19,'personnel','0002_auto_20200901_1642','2021-11-09 13:19:49.749858'),(20,'acc','0001_initial','2021-11-09 13:19:54.488098'),(21,'acc','0002_auto_20200901_1642','2021-11-09 13:20:06.840443'),(22,'acc','0003_auto_20200901_1642','2021-11-09 13:20:20.240572'),(23,'acc','0004_auto_20210721_1158','2021-11-09 13:20:20.721565'),(24,'acc','0005_auto_20210908_1006','2021-11-09 13:20:21.988128'),(25,'accounts','0002_auto_20200901_1642','2021-11-09 13:20:40.207496'),(26,'accounts','0003_auto_20201021_1551','2021-11-09 13:20:40.335882'),(27,'accounts','0004_auto_20201229_0852','2021-11-09 13:20:41.043516'),(28,'accounts','0005_auto_20210908_1006','2021-11-09 13:20:41.118616'),(29,'admin','0001_initial','2021-11-09 13:20:43.735127'),(30,'admin','0002_logentry_remove_auto_add','2021-11-09 13:20:43.919755'),(31,'personnel','0003_auto_20201229_0852','2021-11-09 13:20:48.742367'),(32,'personnel','0004_auto_20210908_1006','2021-11-09 13:20:53.485898'),(33,'att','0003_auto_20200909_1810','2021-11-09 13:20:54.040477'),(34,'att','0004_auto_20201021_1551','2021-11-09 13:20:55.033414'),(35,'att','0005_auto_20201106_1538','2021-11-09 13:20:56.204559'),(36,'att','0006_auto_20201116_1052','2021-11-09 13:20:56.305519'),(37,'att','0007_auto_20201229_0852','2021-11-09 13:21:08.234751'),(38,'att','0008_auto_20210908_1006','2021-11-09 13:21:36.246203'),(39,'authtoken','0001_initial','2021-11-09 13:21:38.748245'),(40,'authtoken','0002_auto_20160226_1747','2021-11-09 13:21:40.796221'),(41,'base','0003_auto_20201229_0852','2021-11-09 13:21:45.332819'),(42,'base','0004_auto_20210908_1006','2021-11-09 13:21:50.029217'),(43,'django_celery_beat','0001_initial','2021-11-09 13:21:56.237440'),(44,'django_celery_beat','0002_auto_20161118_0346','2021-11-09 13:21:58.815116'),(45,'django_celery_beat','0003_auto_20161209_0049','2021-11-09 13:21:59.470081'),(46,'django_celery_beat','0004_auto_20170221_0000','2021-11-09 13:21:59.570597'),(47,'django_celery_beat','0005_add_solarschedule_events_choices','2021-11-09 13:21:59.617485'),(48,'django_celery_beat','0006_auto_20180322_0932','2021-11-09 13:22:00.424569'),(49,'django_celery_beat','0007_auto_20180521_0826','2021-11-09 13:22:00.771409'),(50,'django_celery_beat','0008_auto_20180914_1922','2021-11-09 13:22:00.871701'),(51,'django_celery_beat','0006_auto_20180210_1226','2021-11-09 13:22:01.203828'),(52,'django_celery_beat','0006_periodictask_priority','2021-11-09 13:22:01.373155'),(53,'django_celery_beat','0009_periodictask_headers','2021-11-09 13:22:01.774288'),(54,'django_celery_beat','0010_auto_20190429_0326','2021-11-09 13:22:09.809168'),(55,'django_celery_beat','0011_auto_20190508_0153','2021-11-09 13:22:13.751396'),(56,'visitor','0001_initial','2021-11-09 13:22:14.405577'),(57,'visitor','0002_reservation_visitor_visitorconfig_visitorlog','2021-11-09 13:22:40.278254'),(58,'iclock','0002_auto_20200901_1642','2021-11-09 13:23:05.307859'),(59,'ep','0001_initial','2021-11-09 13:23:08.690449'),(60,'ep','0002_auto_20201217_1608','2021-11-09 13:23:09.775108'),(61,'ep','0003_auto_20201229_0852','2021-11-09 13:23:09.828736'),(62,'guardian','0001_initial','2021-11-09 13:23:18.182273'),(63,'iclock','0003_auto_20201229_0852','2021-11-09 13:23:20.656438'),(64,'iclock','0004_auto_20210908_1006','2021-11-09 13:23:23.713312'),(65,'meeting','0001_initial','2021-11-09 13:23:40.149452'),(66,'meeting','0002_meetingroom_enable_room','2021-11-09 13:23:40.334463'),(67,'meeting','0003_auto_20210908_1006','2021-11-09 13:23:44.594179'),(68,'mobile','0001_initial','2021-11-09 13:23:47.333930'),(69,'mobile','0002_auto_20200901_1642','2021-11-09 13:23:57.089920'),(70,'mobile','0003_auto_20201229_0852','2021-11-09 13:24:05.104947'),(71,'mobile','0004_mobileapirequestlog','2021-11-09 13:24:09.151763'),(72,'payroll','0001_initial','2021-11-09 13:24:18.808512'),(73,'payroll','0002_auto_20200901_1642','2021-11-09 13:24:36.372081'),(74,'payroll','0003_auto_20200901_1642','2021-11-09 13:24:51.747478'),(75,'payroll','0004_auto_20210908_1006','2021-11-09 13:24:52.231804'),(76,'rest_framework_tracking','0001_initial','2021-11-09 13:24:54.990189'),(77,'rest_framework_tracking','0002_auto_20170118_1713','2021-11-09 13:24:55.846795'),(78,'rest_framework_tracking','0003_add_errors','2021-11-09 13:24:55.978602'),(79,'rest_framework_tracking','0004_add_verbose_name','2021-11-09 13:24:56.047455'),(80,'rest_framework_tracking','0005_auto_20171219_1537','2021-11-09 13:24:57.839932'),(81,'rest_framework_tracking','0006_view_and_view_method_nullable','2021-11-09 13:25:00.633533'),(82,'rest_framework_tracking','0006_auto_20180315_1442','2021-11-09 13:25:01.830778'),(83,'rest_framework_tracking','0007_merge_20180419_1646','2021-11-09 13:25:01.899827'),(84,'rest_framework_tracking','0008_auto_20200201_2048','2021-11-09 13:25:02.069415'),(85,'rest_framework_tracking','0009_view_method_max_length_200','2021-11-09 13:25:02.317303'),(86,'rest_framework_tracking','0010_auto_20200609_1404','2021-11-09 13:25:02.417376'),(87,'rest_framework_tracking','0011_auto_20201117_2016','2021-11-09 13:25:02.671598'),(88,'sessions','0001_initial','2021-11-09 13:25:04.022797'),(89,'staff','0001_initial','2021-11-09 13:25:05.550902'),(90,'visitor','0003_reservation_email','2021-11-09 13:25:05.682162'),(91,'visitor','0004_auto_20210908_1006','2021-11-09 13:25:13.927297');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ep_epsetup`
--

DROP TABLE IF EXISTS `ep_epsetup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ep_epsetup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `is_default` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ep_epsetup`
--

LOCK TABLES `ep_epsetup` WRITE;
/*!40000 ALTER TABLE `ep_epsetup` DISABLE KEYS */;
INSERT INTO `ep_epsetup` VALUES (1,'2021-11-09 13:26:01.243139',NULL,'2021-11-09 13:26:01.243139',NULL,0,1,37.3,99.2,1,1,1);
/*!40000 ALTER TABLE `ep_epsetup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ep_eptransaction`
--

DROP TABLE IF EXISTS `ep_eptransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ep_eptransaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `emp_code` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ep_eptransaction_emp_id_check_datetime_57cec995_uniq` (`emp_id`,`check_datetime`),
  KEY `ep_eptransaction_terminal_id_4490b209_fk_iclock_terminal_id` (`terminal_id`),
  CONSTRAINT `ep_eptransaction_emp_id_1006883f_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `ep_eptransaction_terminal_id_4490b209_fk_iclock_terminal_id` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ep_eptransaction`
--

LOCK TABLES `ep_eptransaction` WRITE;
/*!40000 ALTER TABLE `ep_eptransaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `ep_eptransaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guardian_groupobjectpermission`
--

DROP TABLE IF EXISTS `guardian_groupobjectpermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guardian_groupobjectpermission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `object_pk` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `guardian_groupobjectperm_group_id_permission_id_o_3f189f7c_uniq` (`group_id`,`permission_id`,`object_pk`),
  KEY `guardian_groupobject_content_type_id_7ade36b8_fk_django_co` (`content_type_id`),
  KEY `guardian_groupobject_permission_id_36572738_fk_auth_perm` (`permission_id`),
  CONSTRAINT `guardian_groupobject_content_type_id_7ade36b8_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `guardian_groupobject_group_id_4bbbfb62_fk_auth_grou` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `guardian_groupobject_permission_id_36572738_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guardian_groupobjectpermission`
--

LOCK TABLES `guardian_groupobjectpermission` WRITE;
/*!40000 ALTER TABLE `guardian_groupobjectpermission` DISABLE KEYS */;
/*!40000 ALTER TABLE `guardian_groupobjectpermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guardian_userobjectpermission`
--

DROP TABLE IF EXISTS `guardian_userobjectpermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guardian_userobjectpermission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `object_pk` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `guardian_userobjectpermi_user_id_permission_id_ob_b0b3d2fc_uniq` (`user_id`,`permission_id`,`object_pk`),
  KEY `guardian_userobjectp_content_type_id_2e892405_fk_django_co` (`content_type_id`),
  KEY `guardian_userobjectp_permission_id_71807bfc_fk_auth_perm` (`permission_id`),
  CONSTRAINT `guardian_userobjectp_content_type_id_2e892405_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `guardian_userobjectp_permission_id_71807bfc_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `guardian_userobjectpermission_user_id_d5c1e964_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guardian_userobjectpermission`
--

LOCK TABLES `guardian_userobjectpermission` WRITE;
/*!40000 ALTER TABLE `guardian_userobjectpermission` DISABLE KEYS */;
/*!40000 ALTER TABLE `guardian_userobjectpermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_attendance_break_tbl`
--

DROP TABLE IF EXISTS `hris_attendance_break_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_attendance_break_tbl` (
  `breakID` bigint(21) NOT NULL AUTO_INCREMENT,
  `employeeID` bigint(21) DEFAULT NULL,
  `breakIn` datetime DEFAULT NULL,
  `breakOut` datetime DEFAULT NULL,
  `breakDuration` decimal(10,2) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`breakID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_attendance_break_tbl`
--

LOCK TABLES `hris_attendance_break_tbl` WRITE;
/*!40000 ALTER TABLE `hris_attendance_break_tbl` DISABLE KEYS */;
INSERT INTO `hris_attendance_break_tbl` VALUES (1,1,'2021-11-11 09:36:25','2021-11-11 10:03:51',0.46,'2021-11-11 01:36:28','2021-11-11 02:03:54'),(2,2,'2021-11-11 09:36:30',NULL,0.00,'2021-11-11 01:36:32','2021-11-11 01:36:32'),(3,2,'2021-11-11 09:36:33','2021-11-11 10:03:48',0.45,'2021-11-11 01:36:35','2021-11-11 02:03:50'),(4,20,'2021-11-11 12:44:19',NULL,0.00,'2021-11-11 04:44:23','2021-11-11 04:44:23'),(5,20,'2021-11-12 08:17:41',NULL,0.00,'2021-11-12 00:17:36','2021-11-12 00:17:36'),(6,20,'2021-11-12 08:17:43',NULL,0.00,'2021-11-12 00:17:39','2021-11-12 00:17:39'),(7,2,'2021-11-15 11:01:10','2021-11-15 12:25:48',1.41,'2021-11-15 03:01:11','2021-11-15 04:25:48'),(8,3,'2021-11-15 11:01:13',NULL,0.00,'2021-11-15 03:01:14','2021-11-15 03:01:14'),(9,4,'2021-11-15 11:01:16',NULL,0.00,'2021-11-15 03:01:16','2021-11-15 03:01:16'),(10,5,'2021-11-15 11:01:18',NULL,0.00,'2021-11-15 03:01:18','2021-11-15 03:01:18');
/*!40000 ALTER TABLE `hris_attendance_break_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iclock_biodata`
--

DROP TABLE IF EXISTS `iclock_biodata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_biodata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `iclock_biodata_employee_id_bio_no_bio_i_b71b2ca9_uniq` (`employee_id`,`bio_no`,`bio_index`,`bio_type`,`bio_format`,`major_ver`),
  CONSTRAINT `iclock_biodata_employee_id_ff748ea7_fk_personnel_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_biodata`
--

LOCK TABLES `iclock_biodata` WRITE;
/*!40000 ALTER TABLE `iclock_biodata` DISABLE KEYS */;
INSERT INTO `iclock_biodata` VALUES (1,NULL,NULL,'2021-11-09 14:21:06.651210',NULL,0,'St9TUzIxAAADnKAECAUHCc7QAAAbnWkBAAAAg0Eal5wjAA0PYgCGAHCTLQBLAF4P0wBPnOcPrACBAE8PQ5yMAFEOYgBRAO6TOwCfANIOUwCcnHgPHACrABcPVZy1AEwPywBwACOTgQC5AFIPCgDJnJsPnADLANEOM5zNAEcPfgAXAD6TOgDZAMwPWwDinCcOYADmAP4PsJzsACEPhQA0ADKTngD4ACcPQwAfnS4PhAA8AfMPm5xNAR8P359uh+Qvihb3a4uPZHoccloPmYqXdwKXUY0ib1M7fYH/ZV2b46EenQoeuIEhnMuJZini8YdnoZzbjpOABmEXfTljmInTDfOqtBZF3A/ZoX1Ce6KJqm7n2AbEXXwjdiVjCO46KH4MnITBDo6AGRaZArQGLZ1TDtZyzf4w/gmSWA86DAr0gAoanuT7lvgSA+8LZocPCBsT/evS8SRnb8XvAyA5xAJBgisFAGQGgAWEB5xtB/02BQCPDnkfDwCzHY/Bqv+TXH0FAJgkDKUQAygkjMDDUYwF/8ddhwwAXkF6B5bC+20QAM9Bk7H/wl2KfosLAGaHAMOsVsDADQBfgnTBXnlwew4AMI3p/l0z/cDAQ//DACvWZsPAdxEA30vk3cH/QP/AN48GA7BOXsFnAwDXUF9eGADre5rClXDA7cLAjMDAwQb/eJEBqYCMwZEHw8Jcw3MQAEOKGf8pYsH9wP3BwDpNFpzuiZrBUnRNeYfuCAA7j1bCk8B1kgFij+f9LvnAw2NOFwDpj5quwHRdkojBwHCHywBlD/H//jE/VDoGA8OWXsLAhxHFkp8fxcKfasDCnmcJnJugDP5BYjoIAw6gdMDEn//VAFos1v78/v4xOmD8xRQA+7ScWQXAwmPDwojDiP5WCgPOt1Bwg0sGxc20glnACwBXuIzAcuhDCgB8vFMGgPz4FwDMyJ7BTafGXpHAVcDAwAQEAwTLUKkIAKAPCSvWDQB+zdD9PPz+XP/C/cDABMUszdCBBwAyz0MFeP6UAZzPE/9GmQYD59RDwmoIAGfaGVzB/1UHADsYQ3vGCQCi4iBQoQkDAuQrwmXBb80AXnZBwv/C/WjMAGB2O8FMwVkGxbXzvMHAWQkAgzE3wfbAwcEIAIkxLWHgBgCj+ifBBWkEnJ/8LcLAwQXCFZzu/qd+acIByMQUZ3jCBxCK2yvDGsUEEIUfN7MEEx5BOsH7AxBZTR1YU0IAC0MBxQAI2VMA',6,0,1,'10.0','0',0,1,0,'2021-11-09 14:21:06.651210','BOCK191760589',1),(2,NULL,NULL,'2021-11-09 14:23:07.521682',NULL,0,'Sh9TUzIxAAADXGMECAUHCc7QAAAbXWkBAAAAg4EWRlwSAIIPWgD3AApSawA2AIkO4AA+XHIPkwA+AEsPPVxJAAQPgQCkAIlTowB1AJAPpwB1XHsPWQCHAMQPSVyQAHQPiQBnAIVTbQDDAHYPaQDzXJAP0wACAV8PjFwCAX0PkgDpAXBTZAAuAVQPQQBGXT8PGwBMAYAPmVxNAUYPWQCKAUNTJ3kf+VsRRIDdWSOJgYAC/66EHi/q8QduRga/ByheDJNi/W98mxENosv+igpHDWIGWiVnCe7x6Y2QiZQi9HXq/TcDnxPQpZKG6vOzB3p3WUkD+0MjeguiH1B37+1CDmcrpDdFcM/6fhVKGuvjUqYYz97uPwfq8zhXyAry1NP31+05W8b/PlMrIPcBAW8e8QUAkQHWWw1cSAQMwVc+rUALXIIGEFXAPc0ANFUHUP9VDwDxGgMQ/jhYUggA6iQDEMEzBwCVKNU+T1kBGzL6PgPFbjRQwREAKT39BUDDnEdDVQkAl4cTR5zAMxEAQUXF/z0TwcBV/10ExTlLJogQAEFMBpY/NAlVCgB8YIwEwMKciMENAAFozMXDo0f/Vf4HAJtzgyeCDgBmdgaJ//2cWVgIAF56ssBaBxcABXvwRIVLwqPBMlNdDgCZg/6jMsD+wv//kwcDCYl6wMB/D8VdiV/B//3AVVQEQQVcR5J3wsBuyQCG/oiEh8DCWdMACunswP/B/sM+//yj/MH/wP/BOv/Co8EKAGjBfQd+w98PAHDEAP7wwEWcTgsAaMd3B//BNXYXAATT4DjB/Bc5wP7+TFgFPhRcA+LeNj41/sD8o8HAwEMXAMTu4Zz+TDvA/v87wPyjUv9ZEQCpKpPDzoWDeGgVABT+nZ1jwsGOwWYHc5FQEYkCfcL/AMDHo8DBeBQQz8GX/JzBgoZ4g8BNBBOLByI8CBCP7YOznsP+DBBoKyf8IqP//0UZEOnpqcGcwv+BdZbBBcKHBMMGEJYtE+z/BkxhL1rCfAbVjiwrscEWEOpBaMLDncB4wYKAg7ETE4VGp8FywsJUwpUiwAMQkkg0BBcTu06pYsJpwQXDwNCKd8EKEHqavf+g+/v6PgcQSmG0o/D4IhMQ36SwwAVul8TBwZMFUkFcCkMBAAALgFI=',5,0,1,'10.0','0',0,1,0,'2021-11-09 14:23:07.521682','BOCK191760589',2),(3,NULL,NULL,'2021-11-09 14:23:22.038400',NULL,0,'Sj9TUzIxAAADfH4ECAUHCc7QAAAbfWkBAAAAg6EboHwbAA0OiQDaAHlzuAAiAIoOowAqfPkPtwAuANwOfXwzAHMPvwD9AJZzwgBVAIYPTABdfPkP9QCBAFEPXXyCANYPOwBRAMZzxQCvAGwPTgC3fNsPcgC3AAwP2Xy9AHsOywAOAAFy1QDWAEMOewDcfD0O2QDmAOAO53zoAB4O0AAvADFyjAD4ALsPmgACfb0PvgAKAX0P1HwLATIP7QDRASpygIbtl5X3mAoCE3+FPHMt9kB+mvt/gYPvLJNJhwpz5Pqdf/ZrVX+iciQTtfOubnL9QfvuJoN3PxtOE0xXGxLfDo/ib/LUg87vKfNNb4MrIm6mcksHtfKu9lB7ZHmdE1E7YMBi9dTK4UBxIEARXnE0+h0+zPehCxKY7fvh7QXe+Q9OaRjxPwDXBXaCvHyS95vnyYpbiYkDYArRfgYALPoRc+JwKaiQBOUsAn4XHp8UAKzAgFq8wmfCwsL/TmQHfLUID8DABcWmG3/9bRQAnhpG/8eDksKIcnNW3QDZXJFnwknCwAfBwr9/hcFxDwCnKm7uhMPAwMH/mAsDFiv9aEP+UM4AeUx8w5KIcwXFujNvaQUAgjH69goDBzdxeZJnCcW/V/qFxGEFABWdRvwKDQCNXPcvOv3CQ/4cAQJclgTAwhqFicHDiUmzwFpgAA9vmntqsomSuP7BwMF0wZ8bAnZ1lmRqiIsGw8G9wP/Cc8Bq0gDx/JZ4iH3ClrL/w71DGgEWkpeXZ8IFe8X/w8HCBcHDvMD/CAA6mIVZwxobAQ+Yl3KrwMe8wMOgwnN7lBECaKmewWp1wAbCwb7Ckg8Av6+xrsEHw/1d/g4AT7DMgSAo//7AdN8BFs6fwcH/wcFBw8C9wsN5wGlABA0D87LW/v37/znB/YLAbAUAiriDwlhzAde4kMfDAJbAg8D+RxoBFH+cwoPBwsGGwcUFxYoHwjJyDwDWe4PFuJ7BwT44BsXevGtEwBcBFNVZW3TpxI7Bwf/BkMEFfM/YMP/CwQUKA7DdQMB/Pf/SARehnWiAwcTFAcLAvMJQ/8BJBcXf3m8/CQC95zqTwTV5AdrpKYsExejqYG0MAQvpnARmxbuewwcA0O3xwsKCLQQA5O0iB/4SfQ72nsHAjgzId7xH/wQQ2Qz0O1E+AQtDAQAAzkVRfA==',7,0,1,'10.0','0',0,1,0,'2021-11-09 14:23:22.038400','BOCK191760589',3),(4,NULL,NULL,'2021-11-09 14:23:39.647745',NULL,0,'S5VTUzIxAAAC1tcECAUHCc7QAAAa12kBAAAAgnsSVtYWAOcPLADYAEjZpAA2AHQP5gBD1sgPQABBABEPTdZEAEsPagCIAFHZVABYANcP7gBn1kIPSwB6AIYPK9aEAMIPawBSAMTZTgCyAMAPGwCx1nsOqAC0APsPstbIADQPWgARAMLZYwD3AD0P057dSu4UgoEyZqd6ffWej3+fufc3iYBXuIgtD878BHhro0D7mX65C3+DX1uUhk4EgoAzfVTUC22ygdYCR4CwV+IHHgpah8IL9Nej/n9+d0lCPpFhdA5Dxtd7OPo5a+ZzdgH6hUr/+Kv6fy8L4KXHICjXAN0bERQApwFpT8PD/YP/wAXB/RbBaAQAegGxjQrWjwV3dcCX1ABG0F+WTsByTLMIApoJWoRqGABaC38UwYPDaYlEtf7DpAkAnhN3wE7Dw8YBKxVaxHueZGAVDAAfFlPDBW1IF1sIABIbTAfAZhYLALIdgIQEkcHeAa0mfcCRRgkC0zFGbXT9CMXEMFXBeYsSAKL9fZUScHRW/okWxcI5VcODwsT/k5hpYCgEAEpHTG/JAM2RiJDCw8GSBA8ChkhJYmdaUQQQArNOV8LCwWKfa1fBAdNPhsJhS3zCrcDBVmoLAK9RUVLAW3UWANOTg8MWw8LDksH/Bv/AsEvBBwBUXIzBwIcUANphiYAExcISdHLAwcDBnxUCDWqMkJ/DwQWLcRfBfRMA3nZJgMESkMGFdlcMxUt9kHFWWMIHAO+JRLxLFADvipcHecMQl8P/h23B1gDoR5J1w8TEwwSDXhdNEwDzn5MFecYTwsN4dmoSxe+pSMONxsTDgATAwynAwgsA2q9JxMoewMHBwMHAzQDYY4HIyMLBd8wAqm5BwYVwCQA2uZxaxcfHwQUACMVCFMLABADRyfRxBNa1zDd4wAfFr8/sw8BpBgDvCZ7GDsT+UkIAC4YBAtYKRVIA',8,0,1,'10.0','0',0,1,0,'2021-11-09 14:23:39.647745','BOCK191760589',4),(5,NULL,NULL,'2021-11-09 14:24:53.152557',NULL,0,'S+9TUzIxAAACrLMECAUHCc7QAAAarWkBAAAAglETNaxSAPIPSQCcAGijUABqAPYP5gBurF0PPQB8AKYPkKyFAIEPHgBMAOajXQCSAPcPWQClrAQPjgDGALUPn6zYABMPlgAmAA+jrQDmAJIP0gDlrLQPrAD7AFMPUKwhASkPngDiAQajnwAyARIORAA8rSYPnYnqmGv9R9mkeWYJOY0olyipbHs++AJsxG+0pI+BNn13joYTZyePgW/3JpaHAoHWz5Uyhb/18F5EyONtyAuNgdSmTlN4fiqcjYH0/Xcq7o+T06vDaAWMJJuFcwZfJ6Ybvlvj3UtwMBMn7DnSSxQ+JfMCIaIGjCoBAacVbsYAHJtswAQALDiuZQesPzpxaQYA+UFpU4oHAExDcQf/wPUFAGNGenfJAHPgfHbBg8GnzQB2/3bAkHINAIJaaW3AwcGCwcGqBALWXH3CwAUAVmaB1AQATWxp/0kEAoxvYokZAJu0hsDCwcN+nsHBQMLC7sARADp9YgWbicXAwFoWAKu7hlskwICgb3vA3ACMLYfCwcNvwlqBcW/+/8DAYQTFjoovjQgAG4xTVHIFrLOShnRvEMVYlsXAp8KDaf+sGgIUnIzDWoDDYpNrbGP/wPwYAH+li9eBocPDfHMFwcOZGQDKtYloTsLHb8XEwcLAwjrBwm3B/8IVALt7j3VSxMLGw6R4scTDrwECvzrADcWKwSzHxcfCwsEEwcFu/gYAkscJlsAWrM7PjFJ4xQDGxtB9mQcAg9M4/y1sCAB01z3FsJAFrHjZNMOIwsEAgXUIPQQAoNrKZwWsftwtksTAwACbSBFqBQAG5fFkBKwN5S3/wFzNABpHMcFVbQUAxvE1bWgEAJfpF0cGEvojJETCBBCUJC/BU0IAC0MBxQAJ6VMA',9,0,1,'10.0','0',0,1,0,'2021-11-09 14:24:53.152557','BOCK191760589',5),(6,NULL,NULL,'2021-11-09 14:25:13.564466',NULL,0,'SsdTUzIxAAADhIsECAUHCc7QAAAbhWkBAAAAg6kah4QRAPIPbgDbAGqLswAsAPgPRAAuhPMPyAA1AMQPR4RKAOYPvwCZAAaL6wB1AAwPWgB1hAMPTACGACUPW4SHAOYPtQBZAH2L0ADEABAPQQDLhPcPWADKACQPP4TbAFoPygAxABeLcwD9AOQPaAAKhREPRAARARIPgYQUAewPOADTAViLkAArAfsPDQBBhTMPmwBZAYAOkYRbAVQO+YsQA6R6NHoBe3eHXPoIjL71KYpVA0r8Eo7L/gcT1wu+f8yHRwbiBjMNzgncFyIPZv6qhzIfo3te/9sDHAuKA9yDr38rcMt7fvwYEPIfChfbFqp7CQyf78/+EnimhmiH1wU3BK/nAPsMicbqWv3OFyMnG/ua9Wd+vfP4C4lbFYfrAxd76BNha8aov+2/4yY7u3b2TCsVKBIqWByjHgTjAiA0xAIpmcMEAFkAbaENAw8Ba1vAb/++AwMiAHfBBQBgwWvC0AUAtwN0W84Ac4Jxwv9ce8HOALyJe3TCwcBawwDEkHzCwG0GAA4befLBCwBqHW2xwcF6wGAFACshp8HDRQIA1yF9wsgAbaZmZsL+wcAFwYKAAecnfXUSxa4t/nl4wH7AYo8NA/kxa8Bdg1gEFANAN31yf3jCncDC0RYA4EKDwASBhvPAVlhWDgAiTYX8wcDDfHINxfBaAv7BxEOTacsA/fWIwv3BbokHWQuEonUDRlQXxACGF3LCwMKDfjuUws7ACQBUiWS9WPyMAbKbgMLBRsEUhP6cmsNiwQX/x0d1wXBEiRbF/6Qewv/CwGeWu8Fr9RQA962TdKLDwkbDZsJSShTF8rQXdZDDbFJ2oQkDDMbwKv//wDoRA3HKkMDD/sBUlmTdFQEDy5NuiIDCR1jBwHADAPLeVEQSAOfdkMAFwn57xcHCZE3A1gDxaZvD/sP/wgbAlEbB/8DBWQ3FxfANwMGewcFkBAQDSfUQwP0MADbzk3vAeMORwQTFy/uTRgsAdv3gO/8ge0cGEG8BWgT/Z4IRsggPNf/PEIaW5v4q/EYQ1fIiJHXCksTBh54JExUm7fz7//0F/v2BEZUs+vwkwRCOq2FzDhDjPGiUx0WmwnAOEN+DrcFGwcOhwsL/mAoT/lTaNPr7/z7+B5SUVt72+AnVeWNtwsH6+vsbl0IDj0IBAAALRZcA',4,0,1,'10.0','0',0,1,0,'2021-11-09 14:25:13.564466','BOCK191760589',6),(7,NULL,NULL,'2021-11-09 14:25:46.136129',NULL,0,'TWlTUzIxAAAEKikECAUHCc7QAAAcK2kBAAAAhNcjjCopAHYPIwCFAOclnABCABgPlABNKu4PFgBUAKYPgSpaABAPqQCbAJQlRQBsAOkPUQB8Kh4PswCUAGcPeCqXACQPOQBeANslbgCgACMPbgCtKjMPTwCvAJ0OciqxAHcOzQB0ADQlbwCzAFUOoADEKlANbwDCAIYNCirCANgPXQAKAEoklwDnADoPTQDoKkAPEQDtAB0PhyoJAVQPXADQAdAlmgAYAT0PgAAnK9UPjwAlAZQPTyo5AeEPjQD7Ae4lnABDAaMP5wBJK+wPTwBPASwPNkpOaTfr9YJi9MPUm4gOpMoJJwkfJqLi9YIzfdJ3mtpT+XaBoniLcHKrZ/3jDC+JyxA6ur/+LXICdruHxSqkr7LQwoiq+KOURACNrKHR2JJeL94RRQvKeOsEeAy4VFk12gEzkrfRHeJpFIUE/RMN1oQExPf98MjN4imK+5+DCfzcDg7SuPie6oP89AiNxXIEZgPLB16P8T1EG14EFQPH9qaooO3d65JWJPaRKefvDRV1aif8USTY+nIOpUicmmKEaLiOVJ5rUweHJnIaUQoa/5cX3MhMVAYgOgHHYyTkCQBcAHDCmVQHKrwAEP4EAPABaaMGAEcBbXeJEgT8HJx5eMHCqnJgJwGEKXfAkK9kxDsB3TSgacOqhMbVw2oIAKFD1v776kIPAFNE6erA+NQywD4OAFWP7UQa/f9EwAoAiExgQMD+wcLBFMUZVc5ZwP8v/jU7QMTXCACnWpfCXsGEIAGJXBBL/oXADCqkYJDAw5MHCASHYB49OBYAImSp6GiMdYB7agUKBGtuXsH/e8BCAwS9eCDAEwC1VafG68LAw8LEwAfBxehCZg8AgJfb/fpoVFl7BwC3XStHFxQAPJnaMDgkMtT+wD7AcRDFc5sK/C9V/sD9OiIdKuKcsYRqwQSgc+jA/3vBWxLFqaGBw8HBqcPABv/F61PADgB1q1XKxun+eED+/wrFUqj0/P34/f020ADPhrHBgYnAxgfAlFJHCgCprTQFSmHqCACvrS3/hlgKKnOwdMSJaAQq+iABSrFac8E6/sTXCwBPs1fABMDEF/8MAHmzMPA7+9dEAwDMtDQECwRFvCL6Qf8oBAwES8Baflj/Ks0AYu5NW1QIAGsAScRgQQcAccU6Bf37GgoAXNRQZIb9LiwBbdRD//+FGgQ46N7CYFMsO/341f8ywFZZCcWa7hDBwGeRBwBQ6znq/loJAIjv+Dv511UdEAIF3gVuxG7B/iT7/v07wFHqwcH+mQwQRw1U1CrC/v/+/QYGFHIYWv/C/P/BEJ4xPIwFEEEnn/8jIxGOLVD7PwU8ADpJPGImBRCOUm8ZBhCmUprDA8FyLBFsW/AswMEQiHSBV1JCAAuGAQQqCkVSAA==',3,0,1,'10.0','0',0,1,0,'2021-11-09 14:25:46.136129','BOCK191760589',7),(8,NULL,NULL,'2021-11-09 14:26:01.859470',NULL,0,'SntTUzIxAAADODwECAUHCc7QAAAbOWkBAAAAg+UTyjgpAA8PUAD5AO43uABNACgLlwBfOF8OigBgANwPQThwAN8OdQC0AA43OACNAN8PlQC9OFoOaADDAIMNPDjMAN0PgAAtAEs3hAAcAUkPrQAjOVYPiwA1AYQOKzg5Ad4PhQCEAU02XQBGAdcPtABYOecOwurX+xIH0ajeEr/jKhoOEcQnfIPicDpSCA9Yye6+fYPtA2bVWs8LsvcxbQMWhnS6iIItFtd+AO6xU2cDhYaam6YD4T92AYvzbQt093nFJBN2gkIaUff2w9furwqXi3L7BzePaPYFyvCzgqWyPxB2mHekijAHGCsBAjMe08IAXDl1w2TCCwC5AXdJwGdUEwDL2p7AvnTCYsL/wQVvEDjEJZqIi4mZa3suAdo3gPr/VcPB+cDBhXvBaskAUQDmNSr//cEMDANsP+v/O/3/OP/G/gsATEBndwVi/CoBtUmew8EGjMHHwIdr/wgAfFEnxv42wgcAw5YnMGMSAFZZ6f4FJC0N/mhdCgBOmWLAacHA/8IOAEtgEMUrQkVkDwC8bQPDJURCwWYNxXFwSIrCwHNaDsV5dz79/f3+N/4EwGQ7EaQQOsIWxTuJ5sH//ynA+Tj///j+wP7C/8AFwR84CKfewVtX8/0wxDT9R8L+cc8AdZExMzdCDQC2q134cFNY/w0AqLs+x////lP/wPUIA3bAWmLATwzFZcF0RkRY/w0AtsNDCEbA/sE1DcV4wAX+/kz+/8E6QQg4acZD/zJEjgoDZctQVURUEcVAyOJN//v4+v46/8PHwP/AHQACE9ZJ+f7B//9M/jss/cX+/cD+wcE7wMElAQHf4sLABP/BE1X+//r9/jj+/Mf+wf/Awf8ECAO47UZM/0McxRX24sFqRsD+/jj6/8X8wP3BwP8H//z7wcAaAAr3EsBR+E3AKvv8/Tj+/Pj/wcDA/wTVnRMFdhsQEgrcB1HBxkr//vz5/Dj9wsfB/8L+wcEEHhMhH9pcVVf/OPT4xcH+wv7/wTozPccHEIIgRv4+wMI+EYggQP38hgYTWyNXS8AFEKwkVfg1UkIAC0PEAAMzRFI=',2,0,1,'10.0','0',0,1,0,'2021-11-09 14:26:01.859470','BOCK191760589',8),(9,NULL,NULL,'2021-11-09 14:26:27.816718',NULL,0,'TQFTUzIxAAAEQkUECAUHCc7QAAAcQ2kBAAAAhO8ieEIcAG8PjgDpAAxNWQAtAPAP/gArQuIOuwAxAEoP3UIyAJ4PiwCGAA9NagBQAPYPAABUQpcPBQFlAHAP4EJ0AK0PWQBFAO9NpQCEACcOpgCJQmMPzACTAGgPO0KWAN4PlgBfAC1NsACaAKYPrwC3QgEPnAC3APsORELJANcPcwAPAF9MgADLAEYOfQDPQroOTwDRAJAP0ELYAD4PcAAeAFZMngACAUQP8gADQ9YPhQALAZQPXkJNAeEPlACJATtPfABQAWANogBSQ+oPLWqCgodmubwUmn57DQ9Hgrq8nPe375d3M/AiuneLZhA+CcLrOUTnFSaefu3zCm+znwjG+Q/o/wlrWVojwvkyAr4Yucr7DWf1hYN0A249xHiWhVpmjAu2QGOLhvWafSYINUVYh5LshYOYf9W5sKaivDqiPxSuu1+FwYSb2K74LVZsCNVevexY9toK23xifYMUBIA+Ryf91oTbA27/8boQDr79sffKi9+1fodzA5OH5A/nQ+4PufimgWanuaC6VMNjlXbcIqLDMAyNjo+sDXREhgEgNgECh+Z/CkKyABpX//6RwfoiCwDBABD9Ov86AQQA4Ase/ocFBUdJN8BmFwCLG+2C/v/9//7AOcE3vcD+wP//wYkDBDsfcMEKAJLuA/kD/jIOAD8vIsBCbP7//jcOAH0wkoDFf4TAwWzbAB8p1zJLWCz+OksxCP7AwFkSAEpBB785/Uv/Pm0FEQTNRgYx/kE+kHQLQsBNl3mWcLvAF0JuUfT+/v06Nfq8/sDA/8D/qhsEYVDiVMH/MDr+Lb1A/0bAWAjFZ1YphcDB/xQAJXGvHpjDkINzXcwA4js1wDhtFwCZfuO9Jf4uKz7ArFkLQqGAl6fD/lbBX7wRAKiDIicE/WAoWAoAZ4rrO/z5vv7/KAoAX0lpxsI//xQAyI91w8WDjMLCwsLABMHFgv5cFADOj3GTxoCPwobAdGzPAGbTY3xdQxoAh5PYvcAq/vz/KgX7xIM/wMFmwQrFzpN2R2RgEACZWSL5vsE3c2LCxM4Az+M2///B/MOnwRRCb7H3+xb+BP77gfwzwA0Ar3y6x4HCwqVpwAzFnL54P8H9wmT+yQCqg0FFwMDAwQV8D0KyxT1DXXDOAHqFiMjDwmU2zAB1jl/CwP9b/84Aeo1Rw/3A/cE6/lNOAYTPPTM9OkYDQk/UVsBT/s4Ae5lH//81Vf7XAKafwoLBw8fEBsHFgsHBwFQGABHdOYLBZAkAbN6WTEK/CABy30w1BT4TUjgE18DAwuv7/rv8/v///sA6//uC/v4WECMIH8DFgv5VwPz++Dj5xIL/wP9kBxBaCke9wMGcBxCUykbFfP0GEIMRT/X/A1KGJkz9/kDAEIhkR/78/QMQMzAevQUQeVRpNpdCBElCAQAAC0WXAA==',1,0,1,'10.0','0',0,1,0,'2021-11-09 14:26:27.816718','BOCK191760589',9),(10,NULL,NULL,'2021-11-09 14:26:45.618136',NULL,0,'SltTUzIxAAADGBoECAUHCc7QAAAbGWkBAAAAg8UVkRgXAJkPagDiAIIXSwAsAAAPYwBJGKEPnABhAFoPVRhzAHEPEgC7AOUXYgCSACEPZgChGK0PDgCmABsPcxi9ADUOdgAVALcWSADdAE0OQwDeGDgOGgDjABEPVBjqAEoPYAAyAEQXbgAOAUcP+wASGc8PWQA8ARQPexg9AUUOWhve+lyDe4Dy6xfjv4C4i3ZrMQKTCrIjshoe91szQlFOj8hr4wqXd6fH17GV95ZvQ3o3+1YPaeLeD8OTgYGz/gEP6H2BgTJukAVVESqY5YXyBnb0qJDSC7OPXQQc/RmC4PxhA979JAPh53IEmouKh3aIsZRaBYONvnQyANRjCQAQICkBxPsYuAIAcwIQ/swAhxwS+8JEagXFmAs4RwwAWggA78Eo52kOAEYQ+jv/Ml5D/woAOBo/PP0g/gsALSX0Ov8qLf4GAGcmgwTDWRYBTSwAwP44//xTwf5dEgAc+/HD5/xGKThKwMMAqlUlS8AOAAec5PznQTH//cD/0AAIeOY8wv39wDj//ObA/v//wMAF/gQYU3R0wcLBvg8DDXrgMcD+/e84ww8BAnzaOP7q/f3lRz7/Vv8XxQiCzyg7/v/8QTrA/djBZcIOAGdRHClAV2QWAAOaEyk+5iXA/v//wTvA/GMXAAKx0zwF/vzm//3+/cD+Ov/82f/BwRYAB33a/XA6/SH//kqewggYV8Qr/j4r8BcDEMnawMA+LOE1W33ACQBUzmkD/24yCQBF0lp+OjYKGFbWNP4r/+wFA1XaQzYIAFMePfja/////hYA3+DVX/7/+/v6NAX/Xm/ACABI4Uyd/SoQAYfhOlxa0gAE/dLC/MH/wDsz+OX8/f//wf+TwBoYDuzQRzgmOCo92Vd4BwBW8Yz/QuYGAGD/ST04/hsICwXWZVT/OPn448E4wMDB/wSSFwgTCdrCRDw8+fjY/v7BwP9wwxBtDkf///nCFNUSGsLBdjj89Ps6wP3Y/ME1BhBx5UPD4ioEEHVAUz/AUVoBC0MBAADORVEY',0,0,1,'10.0','0',0,1,0,'2021-11-09 14:26:45.618136','BOCK191760589',10),(11,NULL,NULL,'2021-11-11 12:44:24.810428',NULL,0,'SjlTUzIxAAADenkECAUHCc7QAAAbe2kBAAAAg6cahXoiAA0PpgDmAI511QBWAKsP/QBleu8PxQBrAG8PfXptAH4PKgBLAOV1gACPACgPewCsercPbACzAK4OgHq2ADwOGgB8AFx1WgDIAFsN7ADIet4PhgDSAHkOl3rjAEUPaAA3AFB0QAABAdkPrwALe1UPbQAbAZUPK3omAeoPTAD3Ad11ZwA3AU0OnwA6e2oOZwBFAY8OVHpbAWkNdoB+k4wdd4AX5yfn9AN4WU4v4guXc27Lsnke91cvQllCkwCta/vriN8L062ZlK+/R383/+5zHkhwEzqyzdJEgwVsRILzeC8HxPMVWVsLRYKjhRYL6gOAg2pS3YkqCKyOaAJqBqJ/a4eZ8QPzZQXpAnN/6od8B4rlpg6rE6T7tHSpk76UaedyfrxzECOpjPAh9obU4ZHj8SMbAOlkBxAQACArxAIjZzILAKMID+7+O7v+DQCWCgzswP2EwcBKCQCNyRPCh0czBAByFMY8BXpeIPc1/gTF2CtTQw4AiSQJ60Y7GgQAqiUeRtYAUlb1/sH8/sA6/cOEwf3B/8DAO8IOej0691fA/IQvFXo0QgPFL/46/EK6Olv/SRcA81fnhDH+wPz//QX//ITBwP7B/8EF/QV61lowwEYPxTxgl0H+//39/zs+w2IBK2viwfz7/S2E/jhAZEkHxXtv+cOJwRkAEU7tfIc/Kv39Rv+S/251AYWRJyn/lsDDGMEZABuW3gX/M4X//v0qPv86wMO6wP7DGgATb+LDhGnA/v7++zv+/YVFVcBkCgCstGj7akAZABO2IVtXhf3/+sD7wDv/woTA/8DAZBDFbblT+kZLwP38if4Nem3BOjgzODg1Bnpiy1A/FgDuyN9Ewfz9+fzAOf/Dhf7B/8FvCMVXyx2G/zsJAFsJUDy6/DgbABLNJcP+Lj3++/4hU51YXnABaM1A//0F/jiFCQBXzl7BBP78QhoADt7gc4H//Yf6+/79wP46/1i7wcJbGQAYJuDDIjr6+fz+wer/whjCxMIJAJMhQ1sOwAgAW+VT9UEEemHmUP/+wPQYA2zw5ML/U/86+fuG/v/+wMDABf/CucPDCgBn9pVA/Yf+/+kEEGnIUzN9EWwgT/7B2wQTLD1pQAYQZflT/IJWBBBnSVDoUkF6CkMBAAALgFI=',0,0,1,'10.0','0',0,1,0,'2021-11-11 12:44:24.810428','BOCK191760589',11);
/*!40000 ALTER TABLE `iclock_biodata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iclock_biophoto`
--

DROP TABLE IF EXISTS `iclock_biophoto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_biophoto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `iclock_biophoto_employee_id_3dba5819_fk_personnel_employee_id` (`employee_id`),
  CONSTRAINT `iclock_biophoto_employee_id_3dba5819_fk_personnel_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_biophoto`
--

LOCK TABLES `iclock_biophoto` WRITE;
/*!40000 ALTER TABLE `iclock_biophoto` DISABLE KEYS */;
/*!40000 ALTER TABLE `iclock_biophoto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iclock_devicemoduleconfig`
--

DROP TABLE IF EXISTS `iclock_devicemoduleconfig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_devicemoduleconfig` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `visitor_policy` smallint(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_devicemoduleconfig`
--

LOCK TABLES `iclock_devicemoduleconfig` WRITE;
/*!40000 ALTER TABLE `iclock_devicemoduleconfig` DISABLE KEYS */;
INSERT INTO `iclock_devicemoduleconfig` VALUES (1,'2021-11-09 13:25:39.180692',NULL,'2021-11-09 13:25:39.180692',NULL,0,0,0,1,1,1,1,1,8,0,10,1,1,'00:00;14:05',9999,9999,9999,9999,0,0,0,3,3,1,'00:00;12:00',0);
/*!40000 ALTER TABLE `iclock_devicemoduleconfig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iclock_errorcommandlog`
--

DROP TABLE IF EXISTS `iclock_errorcommandlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_errorcommandlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `error_code` varchar(16) DEFAULT NULL,
  `error_msg` varchar(50) DEFAULT NULL,
  `data_origin` longtext DEFAULT NULL,
  `cmd` varchar(50) DEFAULT NULL,
  `additional` longtext DEFAULT NULL,
  `upload_time` datetime(6) NOT NULL,
  `terminal_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `iclock_errorcommandl_terminal_id_3b2d7cbd_fk_iclock_te` (`terminal_id`),
  CONSTRAINT `iclock_errorcommandl_terminal_id_3b2d7cbd_fk_iclock_te` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_errorcommandlog`
--

LOCK TABLES `iclock_errorcommandlog` WRITE;
/*!40000 ALTER TABLE `iclock_errorcommandlog` DISABLE KEYS */;
/*!40000 ALTER TABLE `iclock_errorcommandlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iclock_privatemessage`
--

DROP TABLE IF EXISTS `iclock_privatemessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_privatemessage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `last_send` datetime(6) DEFAULT NULL,
  `employee_id` int(11) NOT NULL,
  `message_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `iclock_privatemessag_employee_id_e84a34c0_fk_personnel` (`employee_id`),
  KEY `iclock_privatemessag_message_id_e3145d3b_fk_iclock_sh` (`message_id`),
  CONSTRAINT `iclock_privatemessag_employee_id_e84a34c0_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `iclock_privatemessag_message_id_e3145d3b_fk_iclock_sh` FOREIGN KEY (`message_id`) REFERENCES `iclock_shortmessage` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_privatemessage`
--

LOCK TABLES `iclock_privatemessage` WRITE;
/*!40000 ALTER TABLE `iclock_privatemessage` DISABLE KEYS */;
/*!40000 ALTER TABLE `iclock_privatemessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iclock_publicmessage`
--

DROP TABLE IF EXISTS `iclock_publicmessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_publicmessage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `last_send` datetime(6) DEFAULT NULL,
  `message_id` int(11) DEFAULT NULL,
  `terminal_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `iclock_publicmessage_message_id_7d125e28_fk_iclock_sh` (`message_id`),
  KEY `iclock_publicmessage_terminal_id_c3b5e4cf_fk_iclock_terminal_id` (`terminal_id`),
  CONSTRAINT `iclock_publicmessage_message_id_7d125e28_fk_iclock_sh` FOREIGN KEY (`message_id`) REFERENCES `iclock_shortmessage` (`id`),
  CONSTRAINT `iclock_publicmessage_terminal_id_c3b5e4cf_fk_iclock_terminal_id` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_publicmessage`
--

LOCK TABLES `iclock_publicmessage` WRITE;
/*!40000 ALTER TABLE `iclock_publicmessage` DISABLE KEYS */;
/*!40000 ALTER TABLE `iclock_publicmessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iclock_shortmessage`
--

DROP TABLE IF EXISTS `iclock_shortmessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_shortmessage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` longtext NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `duration` int(11) NOT NULL,
  `msg_type` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_shortmessage`
--

LOCK TABLES `iclock_shortmessage` WRITE;
/*!40000 ALTER TABLE `iclock_shortmessage` DISABLE KEYS */;
/*!40000 ALTER TABLE `iclock_shortmessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iclock_terminal`
--

DROP TABLE IF EXISTS `iclock_terminal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_terminal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `area_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sn` (`sn`),
  KEY `iclock_terminal_area_id_c019c6f0` (`area_id`),
  CONSTRAINT `iclock_terminal_area_id_c019c6f0_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_terminal`
--

LOCK TABLES `iclock_terminal` WRITE;
/*!40000 ALTER TABLE `iclock_terminal` DISABLE KEYS */;
INSERT INTO `iclock_terminal` VALUES (6,'2021-11-09 14:15:10.534326',NULL,'2021-11-10 07:51:16.470295',NULL,0,'BOCK191760589','BCGI','192.168.50.204','192.168.50.206',1,8,10,1,1,'00:00;14:05',9,1,0,NULL,0,1,NULL,'1111100000','Ver 8.0.3.7-20181026','2.2.14',NULL,84,0,NULL,NULL,NULL,'1638169221','1638174786',NULL,19,365,10,'10.0',0,'-1.0',0,NULL,NULL,NULL,0,'2021-11-29 11:24:46.859548','2021-11-11 12:44:24.810428','2021-11-09 14:38:22.378654',0,2);
/*!40000 ALTER TABLE `iclock_terminal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iclock_terminalcommand`
--

DROP TABLE IF EXISTS `iclock_terminalcommand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_terminalcommand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `commit_time` datetime(6) NOT NULL,
  `transfer_time` datetime(6) DEFAULT NULL,
  `return_time` datetime(6) DEFAULT NULL,
  `return_value` int(11) DEFAULT NULL,
  `package` int(11) DEFAULT NULL,
  `terminal_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `iclock_terminalcomma_terminal_id_3dcf836f_fk_iclock_te` (`terminal_id`),
  CONSTRAINT `iclock_terminalcomma_terminal_id_3dcf836f_fk_iclock_te` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_terminalcommand`
--

LOCK TABLES `iclock_terminalcommand` WRITE;
/*!40000 ALTER TABLE `iclock_terminalcommand` DISABLE KEYS */;
/*!40000 ALTER TABLE `iclock_terminalcommand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iclock_terminalcommandlog`
--

DROP TABLE IF EXISTS `iclock_terminalcommandlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_terminalcommandlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `commit_time` datetime(6) NOT NULL,
  `transfer_time` datetime(6) DEFAULT NULL,
  `return_time` datetime(6) DEFAULT NULL,
  `return_value` int(11) DEFAULT NULL,
  `package` int(11) DEFAULT NULL,
  `terminal_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `iclock_terminalcomma_terminal_id_35ea8b2b_fk_iclock_te` (`terminal_id`),
  CONSTRAINT `iclock_terminalcomma_terminal_id_35ea8b2b_fk_iclock_te` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_terminalcommandlog`
--

LOCK TABLES `iclock_terminalcommandlog` WRITE;
/*!40000 ALTER TABLE `iclock_terminalcommandlog` DISABLE KEYS */;
INSERT INTO `iclock_terminalcommandlog` VALUES (4,'DATA UPDATE USERINFO PIN=1	Name=Juan	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:36.038058','2021-11-09 14:19:36.936114','2021-11-09 14:19:39.260872',0,NULL,6),(5,'DATA UPDATE USERINFO PIN=19	Name=Lawrence	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:36.101702','2021-11-09 14:19:36.936114','2021-11-09 14:19:39.260872',0,NULL,6),(6,'DATA UPDATE USERINFO PIN=2	Name=RJ	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:36.143229','2021-11-09 14:19:36.936114','2021-11-09 14:19:39.260872',0,NULL,6),(7,'DATA UPDATE USERINFO PIN=20	Name=Joseph	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:36.183879','2021-11-09 14:19:36.936114','2021-11-09 14:19:39.260872',0,NULL,6),(8,'DATA UPDATE USERINFO PIN=21	Name=Ayesha	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:36.240074','2021-11-09 14:19:36.936114','2021-11-09 14:19:39.260872',0,NULL,6),(9,'DATA UPDATE USERINFO PIN=22	Name=Jelo	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:36.350431','2021-11-09 14:19:36.936114','2021-11-09 14:19:39.260872',0,NULL,6),(10,'DATA UPDATE USERINFO PIN=23	Name=Yow Lee	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:36.390545','2021-11-09 14:19:36.936114','2021-11-09 14:19:39.260872',0,NULL,6),(11,'DATA UPDATE USERINFO PIN=24	Name=Arjay	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:36.432144','2021-11-09 14:19:36.936114','2021-11-09 14:19:39.260872',0,NULL,6),(12,'DATA UPDATE USERINFO PIN=25	Name=Charles	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:36.477225','2021-11-09 14:19:36.936114','2021-11-09 14:19:39.260872',0,NULL,6),(13,'DATA UPDATE USERINFO PIN=26	Name=Mark	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:36.516163','2021-11-09 14:19:36.936114','2021-11-09 14:19:39.260872',0,NULL,6),(14,'DATA UPDATE USERINFO PIN=27	Name=Joseph	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:36.558289','2021-11-09 14:19:36.936114','2021-11-09 14:19:39.260872',0,NULL,6),(15,'DATA UPDATE USERINFO PIN=28	Name=Wilson	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:36.610466','2021-11-09 14:19:36.936114','2021-11-09 14:19:39.260872',0,NULL,6),(16,'DATA UPDATE USERINFO PIN=3	Name=Wilson	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:36.650149','2021-11-09 14:19:36.936114','2021-11-09 14:19:39.260872',0,NULL,6),(17,'DATA UPDATE USERINFO PIN=30	Name=Test	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:36.694601','2021-11-09 14:19:36.936114','2021-11-09 14:19:39.260872',0,NULL,6),(18,'DATA UPDATE USERINFO PIN=4	Name=Charles	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:36.867120','2021-11-09 14:19:36.936114','2021-11-09 14:19:39.260872',0,NULL,6),(19,'DATA UPDATE USERINFO PIN=5	Name=Mark	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:36.944299','2021-11-09 14:19:40.106897','2021-11-09 14:19:40.600057',0,NULL,6),(20,'DATA UPDATE USERINFO PIN=6	Name=Francis	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:37.050983','2021-11-09 14:19:40.106897','2021-11-09 14:19:40.600057',0,NULL,6),(21,'DATA UPDATE USERINFO PIN=7	Name=Renna	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:37.147241','2021-11-09 14:19:40.106897','2021-11-09 14:19:40.600057',0,NULL,6),(22,'DATA UPDATE USERINFO PIN=8	Name=Matthew	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:37.435826','2021-11-09 14:19:40.106897','2021-11-09 14:19:40.600057',0,NULL,6),(23,'DATA UPDATE USERINFO PIN=9	Name=Errol	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:19:37.510831','2021-11-09 14:19:40.106897','2021-11-09 14:19:40.600057',0,NULL,6),(24,'DATA UPDATE USERINFO PIN=1	Name=Juan	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:20.222644','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(25,'DATA UPDATE USERINFO PIN=19	Name=Lawrence	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:20.302641','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(26,'DATA UPDATE USERINFO PIN=2	Name=RJ	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:20.369559','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(27,'DATA UPDATE USERINFO PIN=20	Name=Joseph	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:20.419623','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(28,'DATA UPDATE USERINFO PIN=21	Name=Ayesha	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:20.447635','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(29,'DATA UPDATE USERINFO PIN=22	Name=Jelo	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:20.480109','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(30,'DATA UPDATE USERINFO PIN=23	Name=Yow Lee	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:20.513694','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(31,'DATA UPDATE USERINFO PIN=24	Name=Arjay	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:20.546716','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(32,'DATA UPDATE USERINFO PIN=25	Name=Charles	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:20.580726','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(33,'DATA UPDATE USERINFO PIN=26	Name=Mark	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:20.613631','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(34,'DATA UPDATE USERINFO PIN=27	Name=Joseph	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:20.648700','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(35,'DATA UPDATE USERINFO PIN=28	Name=Wilson	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:20.669949','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(36,'DATA UPDATE USERINFO PIN=3	Name=Wilson	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:20.694703','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(37,'DATA UPDATE USERINFO PIN=30	Name=Test	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:20.726650','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(38,'DATA UPDATE USERINFO PIN=4	Name=Charles	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:20.988914','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(39,'DATA UPDATE USERINFO PIN=5	Name=Mark	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:21.044892','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(40,'DATA UPDATE USERINFO PIN=6	Name=Francis	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:21.078852','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(41,'DATA UPDATE USERINFO PIN=7	Name=Renna	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:21.102886','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(42,'DATA UPDATE USERINFO PIN=8	Name=Matthew	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:21.136821','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(43,'DATA UPDATE USERINFO PIN=9	Name=Errol	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:22:21.167155','2021-11-09 14:22:22.513130','2021-11-09 14:22:23.475380',0,NULL,6),(44,'DATA UPDATE USERINFO PIN=1	Name=Juan	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:38:22.388442','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(45,'DATA UPDATE USERINFO PIN=19	Name=Lawrence	Pri=0	Passwd=	Card=		Grp=1	Verify=0','2021-11-09 14:38:22.425206','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(46,'DATA UPDATE USERINFO PIN=2	Name=RJ	Pri=0	Passwd=	Card=		Grp=1	Verify=0','2021-11-09 14:38:22.490851','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(47,'DATA UPDATE USERINFO PIN=20	Name=Joseph	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:38:22.550487','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(48,'DATA UPDATE USERINFO PIN=21	Name=Ayesha	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:38:22.646429','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(49,'DATA UPDATE USERINFO PIN=22	Name=Jelo	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:38:22.686944','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(50,'DATA UPDATE USERINFO PIN=23	Name=Yow Lee	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:38:22.720238','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(51,'DATA UPDATE USERINFO PIN=24	Name=Arjay	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:38:22.752077','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(52,'DATA UPDATE USERINFO PIN=25	Name=Charles	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:38:22.784106','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(53,'DATA UPDATE USERINFO PIN=26	Name=Mark	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:38:22.807770','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(54,'DATA UPDATE USERINFO PIN=27	Name=Joseph	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:38:22.841782','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(55,'DATA UPDATE USERINFO PIN=28	Name=Wilson	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:38:22.875799','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(56,'DATA UPDATE USERINFO PIN=3	Name=Wilson	Pri=0	Passwd=	Card=		Grp=1	Verify=0','2021-11-09 14:38:22.926143','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(57,'DATA UPDATE USERINFO PIN=30	Name=Test	Pri=0	Passwd=	Card=		Grp=1	Verify=-1','2021-11-09 14:38:23.152613','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(58,'DATA UPDATE USERINFO PIN=4	Name=Charles	Pri=0	Passwd=	Card=		Grp=1	Verify=0','2021-11-09 14:38:23.208240','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(59,'DATA UPDATE USERINFO PIN=5	Name=Mark	Pri=0	Passwd=	Card=		Grp=1	Verify=0','2021-11-09 14:38:23.240782','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(60,'DATA UPDATE USERINFO PIN=6	Name=Francis	Pri=0	Passwd=	Card=		Grp=1	Verify=0','2021-11-09 14:38:23.276656','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(61,'DATA UPDATE USERINFO PIN=7	Name=Renna	Pri=0	Passwd=	Card=		Grp=1	Verify=0','2021-11-09 14:38:23.308464','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(62,'DATA UPDATE USERINFO PIN=8	Name=Matthew	Pri=0	Passwd=	Card=		Grp=1	Verify=0','2021-11-09 14:38:23.340468','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(63,'DATA UPDATE USERINFO PIN=9	Name=Errol	Pri=0	Passwd=	Card=		Grp=1	Verify=0','2021-11-09 14:38:23.376977','2021-11-09 14:38:31.470636','2021-11-09 14:38:32.444528',0,NULL,6),(64,'CHECK','2021-11-10 07:51:16.426766','2021-11-10 07:52:52.703063','2021-11-10 07:52:53.383126',0,NULL,6);
/*!40000 ALTER TABLE `iclock_terminalcommandlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iclock_terminalemployee`
--

DROP TABLE IF EXISTS `iclock_terminalemployee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_terminalemployee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `terminal_sn` varchar(50) NOT NULL,
  `emp_code` varchar(20) NOT NULL,
  `privilege` smallint(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_terminalemployee`
--

LOCK TABLES `iclock_terminalemployee` WRITE;
/*!40000 ALTER TABLE `iclock_terminalemployee` DISABLE KEYS */;
/*!40000 ALTER TABLE `iclock_terminalemployee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iclock_terminallog`
--

DROP TABLE IF EXISTS `iclock_terminallog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_terminallog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `terminal_tz` smallint(6) DEFAULT NULL,
  `admin` varchar(50) DEFAULT NULL,
  `action_name` smallint(6) DEFAULT NULL,
  `action_time` datetime(6) DEFAULT NULL,
  `object` varchar(50) DEFAULT NULL,
  `param1` int(11) DEFAULT NULL,
  `param2` int(11) DEFAULT NULL,
  `param3` int(11) DEFAULT NULL,
  `upload_time` datetime(6) DEFAULT NULL,
  `terminal_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `iclock_terminallog_terminal_id_667b3ea7_fk_iclock_terminal_id` (`terminal_id`),
  CONSTRAINT `iclock_terminallog_terminal_id_667b3ea7_fk_iclock_terminal_id` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_terminallog`
--

LOCK TABLES `iclock_terminallog` WRITE;
/*!40000 ALTER TABLE `iclock_terminallog` DISABLE KEYS */;
INSERT INTO `iclock_terminallog` VALUES (18,8,'0',4,'2021-11-09 14:02:01.000000','0',0,0,0,'2021-11-09 14:19:34.962370',6),(19,8,'0',0,'2021-11-09 14:03:00.000000','0',0,0,0,'2021-11-09 14:19:38.211955',6),(20,8,'0',4,'2021-11-09 14:06:57.000000','0',0,0,0,'2021-11-09 14:19:38.273647',6),(21,8,'0',4,'2021-11-09 14:19:13.000000','0',0,0,0,'2021-11-09 14:19:38.477337',6),(22,8,'0',4,'2021-11-09 14:20:14.000000','0',0,0,0,'2021-11-09 14:20:16.391134',6),(23,8,'1',71,'2021-11-09 14:20:51.000000','0',0,0,0,'2021-11-09 14:20:52.565639',6),(24,8,'1',6,'2021-11-09 14:21:02.000000','0',0,0,0,'2021-11-09 14:21:04.580548',6),(25,8,'1',36,'2021-11-09 14:21:01.000000','0',0,0,0,'2021-11-09 14:21:04.653196',6),(26,8,'0',4,'2021-11-09 14:22:28.000000','0',0,0,0,'2021-11-09 14:22:29.646856',6),(27,8,'2',36,'2021-11-09 14:23:02.000000','0',0,0,0,'2021-11-09 14:23:04.442677',6),(28,8,'3',6,'2021-11-09 14:23:18.000000','0',0,0,0,'2021-11-09 14:23:21.408694',6),(29,8,'4',6,'2021-11-09 14:23:36.000000','0',0,0,0,'2021-11-09 14:23:38.681095',6),(30,8,'5',6,'2021-11-09 14:24:49.000000','0',0,0,0,'2021-11-09 14:24:51.062916',6),(31,8,'6',6,'2021-11-09 14:25:10.000000','0',0,0,0,'2021-11-09 14:25:12.484087',6),(32,8,'6',36,'2021-11-09 14:25:08.000000','0',0,0,0,'2021-11-09 14:25:12.524319',6),(33,8,'0',4,'2021-11-09 14:25:20.000000','0',0,0,0,'2021-11-09 14:25:22.054702',6),(34,8,'7',6,'2021-11-09 14:25:42.000000','0',0,0,0,'2021-11-09 14:25:45.416139',6),(35,8,'7',36,'2021-11-09 14:25:41.000000','0',0,0,0,'2021-11-09 14:25:45.526109',6),(36,8,'8',6,'2021-11-09 14:25:59.000000','0',0,0,0,'2021-11-09 14:26:00.716298',6),(37,8,'8',36,'2021-11-09 14:25:58.000000','0',0,0,0,'2021-11-09 14:26:00.763988',6),(38,8,'9',6,'2021-11-09 14:26:23.000000','0',0,0,0,'2021-11-09 14:26:26.876672',6),(39,8,'9',36,'2021-11-09 14:26:21.000000','0',0,0,0,'2021-11-09 14:26:26.972180',6),(40,8,'19',36,'2021-11-09 14:26:39.000000','0',0,0,0,'2021-11-09 14:26:41.031011',6),(41,8,'0',4,'2021-11-09 14:39:36.000000','0',0,0,0,'2021-11-09 14:39:38.519790',6),(42,8,'0',4,'2021-11-09 14:46:03.000000','0',0,0,0,'2021-11-09 14:46:06.139657',6),(43,8,'0',4,'2021-11-09 14:46:10.000000','3002',0,0,0,'2021-11-09 14:46:12.162740',6),(44,8,'0',4,'2021-11-09 14:46:13.000000','3006',0,0,0,'2021-11-09 14:46:15.094200',6),(45,8,'0',4,'2021-11-09 14:46:26.000000','3007',0,0,0,'2021-11-09 14:46:28.835034',6),(46,8,'0',4,'2021-11-09 14:46:33.000000','3002',0,0,0,'2021-11-09 14:46:35.188073',6),(47,8,'0',4,'2021-11-09 14:46:39.000000','3006',0,0,0,'2021-11-09 14:46:41.212952',6),(48,8,'0',4,'2021-11-09 14:47:08.000000','3002',0,0,0,'2021-11-09 14:47:13.074510',6),(49,8,'0',4,'2021-11-09 14:47:10.000000','3007',0,0,0,'2021-11-09 14:47:14.495161',6),(50,8,'0',4,'2021-11-09 14:47:15.000000','3061',0,0,0,'2021-11-09 14:47:18.525156',6),(51,8,'0',4,'2021-11-09 14:47:26.000000','3006',0,0,0,'2021-11-09 14:47:29.145974',6),(52,8,'0',4,'2021-11-09 14:48:43.000000','0',0,0,0,'2021-11-09 14:48:46.970797',6),(53,8,'0',0,'2021-11-10 07:10:18.000000','0',0,0,0,'2021-11-10 07:20:22.240599',6),(54,8,'0',4,'2021-11-10 07:14:50.000000','0',0,0,0,'2021-11-10 07:20:22.525942',6),(55,8,'0',4,'2021-11-10 07:15:15.000000','0',0,0,0,'2021-11-10 07:20:22.757799',6),(56,8,'0',4,'2021-11-10 07:40:52.000000','0',0,0,0,'2021-11-10 07:52:50.329570',6),(57,8,'0',4,'2021-11-10 07:42:17.000000','0',0,0,0,'2021-11-10 07:52:50.360961',6),(58,8,'0',4,'2021-11-10 07:43:49.000000','0',0,0,0,'2021-11-10 07:52:50.414145',6),(59,8,'0',4,'2021-11-10 07:50:04.000000','0',0,0,0,'2021-11-10 07:52:50.483157',6),(60,8,'0',4,'2021-11-10 07:51:49.000000','0',0,0,0,'2021-11-10 07:52:50.545659',6),(61,8,'0',4,'2021-11-10 11:38:41.000000','0',0,0,0,'2021-11-10 11:38:35.178630',6),(62,8,'0',0,'2021-11-11 07:06:15.000000','0',0,0,0,'2021-11-11 07:26:11.535693',6),(63,8,'0',4,'2021-11-11 07:25:25.000000','0',0,0,0,'2021-11-11 07:26:11.704977',6),(64,8,'0',4,'2021-11-11 12:43:10.000000','0',0,0,0,'2021-11-11 12:43:14.383849',6),(65,8,'19',9,'2021-11-11 12:43:43.000000','0',0,0,0,'2021-11-11 12:43:46.318893',6),(66,8,'20',6,'2021-11-11 12:44:13.000000','0',0,0,0,'2021-11-11 12:44:17.195796',6),(67,8,'0',4,'2021-11-12 07:36:17.000000','0',0,0,0,'2021-11-12 07:53:53.623295',6),(68,8,'0',4,'2021-11-12 07:51:51.000000','0',0,0,0,'2021-11-12 07:53:57.103010',6),(69,8,'0',0,'2021-11-12 06:57:46.000000','0',0,0,0,'2021-11-12 07:53:58.802934',6),(70,8,'0',4,'2021-11-12 07:33:44.000000','0',0,0,0,'2021-11-12 07:53:58.987787',6),(71,8,'0',4,'2021-11-12 07:53:08.000000','0',0,0,0,'2021-11-12 07:53:59.552688',6),(72,8,'0',0,'2021-11-15 07:08:43.000000','0',0,0,0,'2021-11-15 07:29:44.952387',6),(73,8,'0',4,'2021-11-15 07:29:35.000000','0',0,0,0,'2021-11-15 07:29:45.044396',6),(74,8,'0',0,'2021-11-16 07:01:55.000000','0',0,0,0,'2021-11-16 07:27:35.312761',6),(75,8,'0',4,'2021-11-16 07:27:17.000000','0',0,0,0,'2021-11-16 07:27:35.912801',6),(76,8,'0',0,'2021-11-18 07:06:25.000000','0',0,0,0,'2021-11-18 10:31:40.218749',6),(77,8,'0',4,'2021-11-18 10:31:22.000000','0',0,0,0,'2021-11-18 10:31:41.103580',6),(78,8,'0',0,'2021-11-19 07:45:09.000000','0',0,0,0,'2021-11-22 07:43:53.423106',6),(79,8,'0',4,'2021-11-19 07:45:31.000000','0',0,0,0,'2021-11-22 07:43:54.291399',6),(80,8,'0',0,'2021-11-22 07:14:36.000000','0',0,0,0,'2021-11-22 07:43:55.082494',6),(81,8,'0',4,'2021-11-22 07:44:04.000000','0',0,0,0,'2021-11-22 07:43:55.736451',6),(82,8,'0',0,'2021-11-23 07:03:29.000000','0',0,0,0,'2021-11-24 10:16:09.814356',6),(83,8,'0',0,'2021-11-24 07:01:01.000000','0',0,0,0,'2021-11-24 10:16:11.016550',6),(84,8,'0',4,'2021-11-24 10:15:47.000000','0',0,0,0,'2021-11-24 10:16:11.453263',6),(85,8,'0',0,'2021-11-25 07:00:33.000000','0',0,0,0,'2021-11-29 07:53:10.357035',6),(86,8,'0',0,'2021-11-26 07:05:43.000000','0',0,0,0,'2021-11-29 07:53:10.667067',6),(87,8,'0',4,'2021-11-26 10:47:07.000000','0',0,0,0,'2021-11-29 07:53:11.032076',6),(88,8,'0',0,'2021-11-29 06:59:56.000000','0',0,0,0,'2021-11-29 07:53:41.637133',6),(89,8,'0',4,'2021-11-29 07:03:13.000000','0',0,0,0,'2021-11-29 07:53:41.685263',6),(90,8,'0',4,'2021-11-29 07:50:40.000000','0',0,0,0,'2021-11-29 07:53:41.792033',6),(91,8,'0',4,'2021-11-29 07:51:26.000000','0',0,0,0,'2021-11-29 07:53:41.865037',6),(92,8,'0',4,'2021-11-29 07:53:13.000000','0',0,0,0,'2021-11-29 07:53:42.015145',6),(93,8,'0',4,'2021-11-29 08:30:33.000000','0',0,0,0,'2021-11-29 08:30:37.957873',6);
/*!40000 ALTER TABLE `iclock_terminallog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iclock_terminalparameter`
--

DROP TABLE IF EXISTS `iclock_terminalparameter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_terminalparameter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `param_type` varchar(10) DEFAULT NULL,
  `param_name` varchar(30) NOT NULL,
  `param_value` varchar(100) NOT NULL,
  `terminal_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `iclock_terminalparameter_terminal_id_param_name_8abbb5c0_uniq` (`terminal_id`,`param_name`),
  CONSTRAINT `iclock_terminalparam_terminal_id_443872e3_fk_iclock_te` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_terminalparameter`
--

LOCK TABLES `iclock_terminalparameter` WRITE;
/*!40000 ALTER TABLE `iclock_terminalparameter` DISABLE KEYS */;
INSERT INTO `iclock_terminalparameter` VALUES (45,NULL,'FWVersion','Ver 8.0.3.7-20181026',6),(46,NULL,'UserCount','19',6),(47,NULL,'ZKFaceVersion','-1',6),(48,NULL,'FaceCount','0',6),(49,NULL,'IPAddress','192.168.50.204',6),(50,NULL,'TransactionCount','365',6),(51,NULL,'FPCount','10',6),(52,NULL,'faceTempNumber','0',6),(53,NULL,'Identifier','101',6),(54,NULL,'~ZKFPVersion','10',6);
/*!40000 ALTER TABLE `iclock_terminalparameter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iclock_terminaluploadlog`
--

DROP TABLE IF EXISTS `iclock_terminaluploadlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_terminaluploadlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event` varchar(80) NOT NULL,
  `content` varchar(80) NOT NULL,
  `upload_count` int(11) NOT NULL,
  `error_count` int(11) NOT NULL,
  `upload_time` datetime(6) NOT NULL,
  `terminal_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `iclock_terminaluploa_terminal_id_9c9a7664_fk_iclock_te` (`terminal_id`),
  CONSTRAINT `iclock_terminaluploa_terminal_id_9c9a7664_fk_iclock_te` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_terminaluploadlog`
--

LOCK TABLES `iclock_terminaluploadlog` WRITE;
/*!40000 ALTER TABLE `iclock_terminaluploadlog` DISABLE KEYS */;
INSERT INTO `iclock_terminaluploadlog` VALUES (3,'Operation Log','',1,0,'2021-11-09 14:19:36.936114',6),(4,'Operation Log',',,,,',5,0,'2021-11-09 14:19:38.524018',6),(5,'Operation Log','',1,0,'2021-11-09 14:20:16.415576',6),(6,'Operation Log','',1,0,'2021-11-09 14:20:52.626777',6),(7,'User','1',1,0,'2021-11-09 14:21:03.829431',6),(8,'Operation Log',',',2,0,'2021-11-09 14:21:04.706216',6),(9,'Fingerprint Create','1',1,0,'2021-11-09 14:21:07.286368',6),(10,'Operation Log','',1,0,'2021-11-09 14:22:29.678908',6),(11,'Operation Log','',1,0,'2021-11-09 14:23:04.492733',6),(12,'Operation Log','',1,0,'2021-11-09 14:23:05.155010',6),(13,'User','2',1,0,'2021-11-09 14:23:06.454036',6),(14,'Fingerprint Create','2',1,0,'2021-11-09 14:23:07.814232',6),(15,'User','3',1,0,'2021-11-09 14:23:19.912851',6),(16,'Operation Log',',',2,0,'2021-11-09 14:23:21.500789',6),(17,'Fingerprint Create','3',1,0,'2021-11-09 14:23:22.578481',6),(18,'User','4',1,0,'2021-11-09 14:23:37.326657',6),(19,'Operation Log',',',2,0,'2021-11-09 14:23:38.712876',6),(20,'Fingerprint Create','4',1,0,'2021-11-09 14:23:39.683421',6),(21,'Operation Log',',',2,0,'2021-11-09 14:24:51.112579',6),(22,'User','5',1,0,'2021-11-09 14:24:52.012455',6),(23,'Fingerprint Create','5',1,0,'2021-11-09 14:24:53.922713',6),(24,'User','6',1,0,'2021-11-09 14:25:12.025203',6),(25,'Operation Log',',',2,0,'2021-11-09 14:25:12.564072',6),(26,'Fingerprint Create','6',1,0,'2021-11-09 14:25:14.022539',6),(27,'Operation Log','',1,0,'2021-11-09 14:25:22.182851',6),(28,'User','7',1,0,'2021-11-09 14:25:44.166913',6),(29,'Operation Log',',',2,0,'2021-11-09 14:25:45.661232',6),(30,'Fingerprint Create','7',1,0,'2021-11-09 14:25:46.182873',6),(31,'User','8',1,0,'2021-11-09 14:25:59.479515',6),(32,'Operation Log',',',2,0,'2021-11-09 14:26:00.792446',6),(33,'Fingerprint Create','8',1,0,'2021-11-09 14:26:02.246205',6),(34,'User','9',1,0,'2021-11-09 14:26:24.854720',6),(35,'Operation Log',',',2,0,'2021-11-09 14:26:27.134958',6),(36,'Fingerprint Create','9',1,0,'2021-11-09 14:26:28.362649',6),(37,'Operation Log','',1,0,'2021-11-09 14:26:41.070627',6),(38,'Operation Log','',1,0,'2021-11-09 14:26:42.172950',6),(39,'User','19',1,0,'2021-11-09 14:26:43.739014',6),(40,'Fingerprint Create','19',1,0,'2021-11-09 14:26:45.645860',6),(41,'Operation Log','',1,0,'2021-11-09 14:39:38.560209',6),(42,'Operation Log','',1,0,'2021-11-09 14:46:06.265327',6),(43,'Operation Log','',1,0,'2021-11-09 14:46:12.284457',6),(44,'Operation Log','',1,0,'2021-11-09 14:46:15.164646',6),(45,'Operation Log','',1,0,'2021-11-09 14:46:28.863828',6),(46,'Operation Log','',1,0,'2021-11-09 14:46:35.224898',6),(47,'Operation Log','',1,0,'2021-11-09 14:46:41.240792',6),(48,'Operation Log','',1,0,'2021-11-09 14:47:13.118024',6),(49,'Operation Log','',1,0,'2021-11-09 14:47:14.544737',6),(50,'Operation Log','',1,0,'2021-11-09 14:47:18.563098',6),(51,'Operation Log','',1,0,'2021-11-09 14:47:29.207300',6),(52,'Operation Log','',1,0,'2021-11-09 14:48:47.057352',6),(53,'Operation Log',',,,',4,0,'2021-11-10 07:20:23.043424',6),(54,'Operation Log',',,,,',5,0,'2021-11-10 07:52:50.561283',6),(55,'Operation Log','',1,0,'2021-11-10 09:10:59.014241',6),(56,'Operation Log','',1,0,'2021-11-10 11:38:35.316492',6),(57,'Operation Log',',,,',4,0,'2021-11-11 07:26:11.821117',6),(58,'Operation Log','',1,0,'2021-11-11 08:03:50.461998',6),(59,'Operation Log','',1,0,'2021-11-11 12:43:14.763362',6),(60,'Operation Log','',1,0,'2021-11-11 12:43:46.430650',6),(61,'Operation Log',',',2,0,'2021-11-11 12:44:17.443823',6),(62,'User','20',1,0,'2021-11-11 12:44:22.223576',6),(63,'Fingerprint Create','20',1,0,'2021-11-11 12:44:25.130265',6),(64,'Operation Log','',1,0,'2021-11-12 07:53:53.992777',6),(65,'Operation Log','',1,0,'2021-11-12 07:53:58.463748',6),(66,'Operation Log',',,,',4,0,'2021-11-12 07:53:59.802212',6),(67,'Operation Log','',1,0,'2021-11-12 12:09:15.740068',6),(68,'Operation Log',',,',3,0,'2021-11-15 07:29:45.104493',6),(69,'Operation Log',',,',3,0,'2021-11-16 07:27:36.013083',6),(70,'Operation Log',',,',3,0,'2021-11-18 10:31:41.307347',6),(71,'Operation Log',',,,,,',6,0,'2021-11-22 07:43:56.668914',6),(72,'Operation Log',',,,,,,,,',9,0,'2021-11-24 10:16:12.922606',6),(73,'Operation Log',',,,,,,,,,,,',12,0,'2021-11-29 07:53:12.887156',6),(74,'Operation Log',',,,,,',6,0,'2021-11-29 07:53:42.086189',6),(75,'Operation Log','',1,0,'2021-11-29 08:29:57.508243',6),(76,'Operation Log',',',2,0,'2021-11-29 08:29:59.660193',6),(77,'Operation Log',',',2,0,'2021-11-29 08:29:59.812427',6),(78,'Operation Log','',1,0,'2021-11-29 08:30:01.669253',6),(79,'Operation Log','',1,0,'2021-11-29 08:30:02.319351',6),(80,'Operation Log','',1,0,'2021-11-29 08:30:05.750079',6),(81,'Operation Log','',1,0,'2021-11-29 08:30:07.700313',6),(82,'Operation Log','',1,0,'2021-11-29 08:30:12.397135',6),(83,'Operation Log','',1,0,'2021-11-29 08:30:14.048082',6),(84,'Operation Log','',1,0,'2021-11-29 08:30:15.773183',6),(85,'Operation Log',',',2,0,'2021-11-29 08:30:16.417109',6),(86,'Operation Log','',1,0,'2021-11-29 08:30:20.452281',6),(87,'Operation Log',',,',3,0,'2021-11-29 08:30:21.439455',6),(88,'Operation Log',',',2,0,'2021-11-29 08:30:23.847097',6),(89,'Operation Log','',1,0,'2021-11-29 08:30:27.867395',6),(90,'Operation Log','',1,0,'2021-11-29 08:30:35.992215',6),(91,'Operation Log',',',2,0,'2021-11-29 08:30:37.999453',6),(92,'Operation Log','',1,0,'2021-11-29 08:30:44.050594',6),(93,'Operation Log','',1,0,'2021-11-29 08:30:46.003171',6),(94,'Operation Log','',1,0,'2021-11-29 08:30:52.037951',6),(95,'Operation Log','',1,0,'2021-11-29 08:30:54.050030',6),(96,'Operation Log','',1,0,'2021-11-29 08:30:54.707818',6),(97,'Operation Log',',',2,0,'2021-11-29 08:30:55.457904',6),(98,'Operation Log','',1,0,'2021-11-29 08:30:56.713661',6),(99,'Operation Log','',1,0,'2021-11-29 08:33:07.094179',6);
/*!40000 ALTER TABLE `iclock_terminaluploadlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iclock_terminalworkcode`
--

DROP TABLE IF EXISTS `iclock_terminalworkcode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_terminalworkcode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `code` varchar(8) NOT NULL,
  `alias` varchar(24) NOT NULL,
  `last_activity` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_terminalworkcode`
--

LOCK TABLES `iclock_terminalworkcode` WRITE;
/*!40000 ALTER TABLE `iclock_terminalworkcode` DISABLE KEYS */;
/*!40000 ALTER TABLE `iclock_terminalworkcode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iclock_transaction`
--

DROP TABLE IF EXISTS `iclock_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `terminal_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `iclock_transaction_emp_code_punch_time_ca282852_uniq` (`emp_code`,`punch_time`),
  KEY `iclock_transaction_emp_id_60fa3521_fk_personnel_employee_id` (`emp_id`),
  KEY `iclock_transaction_terminal_id_451c81c2_fk_iclock_terminal_id` (`terminal_id`),
  CONSTRAINT `iclock_transaction_emp_id_60fa3521_fk_personnel_employee_id` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `iclock_transaction_terminal_id_451c81c2_fk_iclock_terminal_id` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=366 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_transaction`
--

LOCK TABLES `iclock_transaction` WRITE;
/*!40000 ALTER TABLE `iclock_transaction` DISABLE KEYS */;
INSERT INTO `iclock_transaction` VALUES (1,'1','2021-11-09 14:21:06.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEACABAAAGA',1,NULL,'2021-11-09 14:21:08.855896',NULL,NULL,255,255.0,1,6),(2,'1','2021-11-09 14:26:43.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEACAGAEADA',1,NULL,'2021-11-09 14:26:44.505270',NULL,NULL,255,255.0,1,6),(3,'1','2021-11-09 14:27:08.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEACAHAAAIA',1,NULL,'2021-11-09 14:27:10.796332',NULL,NULL,255,255.0,1,6),(4,'2','2021-11-09 14:27:12.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEACAHABACA',1,NULL,'2021-11-09 14:27:13.908674',NULL,NULL,255,255.0,2,6),(5,'3','2021-11-09 14:27:15.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEACAHABAFA',1,NULL,'2021-11-09 14:27:16.021781',NULL,NULL,255,255.0,3,6),(6,'4','2021-11-09 14:27:16.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEACAHABAGA',1,NULL,'2021-11-09 14:27:18.162530',NULL,NULL,255,255.0,4,6),(7,'19','2021-11-09 14:27:19.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEACAHABAJA',1,NULL,'2021-11-09 14:27:21.352620',NULL,NULL,255,255.0,10,6),(8,'8','2021-11-09 14:27:22.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEACAHACACA',1,NULL,'2021-11-09 14:27:23.453857',NULL,NULL,255,255.0,8,6),(9,'9','2021-11-09 14:27:26.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEACAHACAGA',1,NULL,'2021-11-09 14:27:27.566869',NULL,NULL,255,255.0,9,6),(10,'7','2021-11-09 14:27:28.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEACAHACAIA',1,NULL,'2021-11-09 14:27:29.707388',NULL,NULL,255,255.0,7,6),(11,'6','2021-11-09 14:27:30.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEACAHADAAA',1,NULL,'2021-11-09 14:27:31.828495',NULL,NULL,255,255.0,6,6),(12,'1','2021-11-09 14:41:15.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEAEABABAFA',1,NULL,'2021-11-09 14:41:17.136875',NULL,NULL,255,255.0,1,6),(13,'1','2021-11-09 14:48:23.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEAEAIACADA',1,NULL,'2021-11-09 14:48:24.730076',NULL,NULL,255,255.0,1,6),(14,'1','2021-11-09 14:49:04.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEAEAJAAAEA',1,NULL,'2021-11-09 14:49:07.070775',NULL,NULL,255,255.0,1,6),(15,'1','2021-11-09 14:49:38.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEAEAJADAIA',1,NULL,'2021-11-09 14:49:40.327311',NULL,NULL,255,255.0,1,6),(16,'1','2021-11-09 14:52:04.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEAFACAAAEA',1,NULL,'2021-11-09 14:52:05.634032',NULL,NULL,255,255.0,1,6),(17,'1','2021-11-09 14:58:40.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAEAFAIAEAAA',1,NULL,'2021-11-09 14:58:42.096193',NULL,NULL,255,255.0,1,6),(18,'1','2021-11-09 15:04:11.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAFAAAEABABA',1,NULL,'2021-11-09 15:04:13.553271',NULL,NULL,255,255.0,1,6),(19,'1','2021-11-09 15:13:36.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAFABADADAGA',1,NULL,'2021-11-09 15:13:38.307040',NULL,NULL,255,255.0,1,6),(20,'1','2021-11-09 15:27:10.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABAAAJABAFACAHABAAA',1,NULL,'2021-11-09 15:27:12.153055',NULL,NULL,255,255.0,1,6),(21,'1','2021-11-10 07:14:54.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAHABAEAFAEA',1,NULL,'2021-11-10 07:20:19.457192',NULL,NULL,255,255.0,1,6),(22,'2','2021-11-10 07:14:57.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAHABAEAFAHA',1,NULL,'2021-11-10 07:20:20.413277',NULL,NULL,255,255.0,2,6),(23,'3','2021-11-10 07:14:59.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAHABAEAFAJA',1,NULL,'2021-11-10 07:20:20.475778',NULL,NULL,255,255.0,3,6),(24,'4','2021-11-10 07:15:01.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAHABAFAAABA',1,NULL,'2021-11-10 07:20:20.789883',NULL,NULL,255,255.0,4,6),(25,'5','2021-11-10 07:15:06.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAHABAFAAAGA',1,NULL,'2021-11-10 07:20:21.190922',NULL,NULL,255,255.0,5,6),(26,'1','2021-11-10 08:10:32.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAIABAAADACA',1,NULL,'2021-11-10 08:10:25.761885',NULL,NULL,255,255.0,1,6),(27,'2','2021-11-10 08:10:56.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAIABAAAFAGA',1,NULL,'2021-11-10 08:10:50.577127',NULL,NULL,255,255.0,2,6),(28,'3','2021-11-10 08:11:00.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAIABABAAAAA',1,NULL,'2021-11-10 08:10:54.698122',NULL,NULL,255,255.0,3,6),(29,'2','2021-11-10 08:11:14.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAIABABABAEA',1,NULL,'2021-11-10 08:11:06.881966',NULL,NULL,255,255.0,2,6),(30,'3','2021-11-10 08:11:50.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAIABABAFAAA',1,NULL,'2021-11-10 08:11:44.008951',NULL,NULL,255,255.0,3,6),(31,'3','2021-11-10 08:11:53.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAIABABAFADA',1,NULL,'2021-11-10 08:11:47.149042',NULL,NULL,255,255.0,3,6),(32,'5','2021-11-10 08:13:42.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAIABADAEACA',1,NULL,'2021-11-10 08:13:36.355854',NULL,NULL,255,255.0,5,6),(33,'2','2021-11-10 08:17:45.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAIABAHAEAFA',1,NULL,'2021-11-10 08:17:38.849987',NULL,NULL,255,255.0,2,6),(34,'2','2021-11-10 08:17:48.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAIABAHAEAIA',1,NULL,'2021-11-10 08:17:42.266198',NULL,NULL,255,255.0,2,6),(35,'1','2021-11-10 08:44:44.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAIAEAEAEAEA',1,NULL,'2021-11-10 08:44:37.300263',NULL,NULL,255,255.0,1,6),(36,'2','2021-11-10 08:44:57.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAIAEAEAFAHA',1,NULL,'2021-11-10 08:44:50.506491',NULL,NULL,255,255.0,2,6),(37,'1','2021-11-10 08:44:59.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAIAEAEAFAJA',1,NULL,'2021-11-10 08:44:53.907418',NULL,NULL,255,255.0,1,6),(38,'3','2021-11-10 08:45:02.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAIAEAFAAACA',1,NULL,'2021-11-10 08:44:56.319165',NULL,NULL,255,255.0,3,6),(39,'4','2021-11-10 08:45:05.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAIAEAFAAAFA',1,NULL,'2021-11-10 08:44:58.624385',NULL,NULL,255,255.0,4,6),(40,'2','2021-11-10 08:46:39.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAIAEAGADAJA',1,NULL,'2021-11-10 08:46:32.875313',NULL,NULL,255,255.0,2,6),(41,'3','2021-11-10 08:53:59.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAIAFADAFAJA',1,NULL,'2021-11-10 08:53:52.362189',NULL,NULL,255,255.0,3,6),(42,'4','2021-11-10 09:01:53.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJAAABAFADA',1,NULL,'2021-11-10 09:01:47.108988',NULL,NULL,255,255.0,4,6),(43,'2','2021-11-10 09:10:12.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJABAAABACA',1,NULL,'2021-11-10 09:10:05.693023',NULL,NULL,255,255.0,2,6),(44,'3','2021-11-10 09:10:15.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJABAAABAFA',1,NULL,'2021-11-10 09:10:09.026321',NULL,NULL,255,255.0,3,6),(45,'4','2021-11-10 09:10:18.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJABAAABAIA',1,NULL,'2021-11-10 09:10:12.193340',NULL,NULL,255,255.0,4,6),(46,'5','2021-11-10 09:10:21.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJABAAACABA',1,NULL,'2021-11-10 09:10:15.334477',NULL,NULL,255,255.0,5,6),(47,'1','2021-11-10 09:11:01.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJABABAAABA',1,NULL,'2021-11-10 09:10:57.404586',NULL,NULL,255,255.0,1,6),(48,'1','2021-11-10 09:11:40.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJABABAEAAA',1,NULL,'2021-11-10 09:11:33.790747',NULL,NULL,255,255.0,1,6),(49,'2','2021-11-10 09:22:29.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJACACACAJA',1,NULL,'2021-11-10 09:22:23.508015',NULL,NULL,255,255.0,2,6),(50,'2','2021-11-10 09:24:00.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJACAEAAAAA',1,NULL,'2021-11-10 09:23:53.682159',NULL,NULL,255,255.0,2,6),(51,'1','2021-11-10 09:24:02.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJACAEAAACA',1,NULL,'2021-11-10 09:23:56.808373',NULL,NULL,255,255.0,1,6),(52,'1','2021-11-10 09:24:05.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJACAEAAAFA',1,NULL,'2021-11-10 09:23:58.920078',NULL,NULL,255,255.0,1,6),(53,'4','2021-11-10 09:24:23.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJACAEACADA',1,NULL,'2021-11-10 09:24:16.062909',NULL,NULL,255,255.0,4,6),(54,'3','2021-11-10 09:29:54.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJACAJAFAEA',1,NULL,'2021-11-10 09:29:48.460812',NULL,NULL,255,255.0,3,6),(55,'5','2021-11-10 09:30:34.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJADAAADAEA',1,NULL,'2021-11-10 09:30:27.648618',NULL,NULL,255,255.0,5,6),(56,'2','2021-11-10 09:33:08.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJADADAAAIA',1,NULL,'2021-11-10 09:33:01.984924',NULL,NULL,255,255.0,2,6),(57,'6','2021-11-10 09:54:24.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJAFAEACAEA',1,NULL,'2021-11-10 09:54:17.466355',NULL,NULL,255,255.0,6,6),(58,'6','2021-11-10 09:54:36.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJAFAEADAGA',1,NULL,'2021-11-10 09:54:29.645056',NULL,NULL,255,255.0,6,6),(59,'7','2021-11-10 09:54:39.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJAFAEADAJA',1,NULL,'2021-11-10 09:54:32.914980',NULL,NULL,255,255.0,7,6),(60,'8','2021-11-10 09:54:42.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJAFAEAEACA',1,NULL,'2021-11-10 09:54:35.145104',NULL,NULL,255,255.0,8,6),(61,'9','2021-11-10 09:54:44.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJAFAEAEAEA',1,NULL,'2021-11-10 09:54:38.424975',NULL,NULL,255,255.0,9,6),(62,'19','2021-11-10 09:54:47.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJAFAEAEAHA',1,NULL,'2021-11-10 09:54:40.567544',NULL,NULL,255,255.0,10,6),(63,'5','2021-11-10 09:54:50.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJAFAEAFAAA',1,NULL,'2021-11-10 09:54:44.745472',NULL,NULL,255,255.0,5,6),(64,'4','2021-11-10 09:54:54.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJAFAEAFAEA',1,NULL,'2021-11-10 09:54:46.855150',NULL,NULL,255,255.0,4,6),(65,'3','2021-11-10 09:54:56.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJAFAEAFAGA',1,NULL,'2021-11-10 09:54:49.996626',NULL,NULL,255,255.0,3,6),(66,'1','2021-11-10 09:54:59.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJAFAEAFAJA',1,NULL,'2021-11-10 09:54:53.117311',NULL,NULL,255,255.0,1,6),(67,'2','2021-11-10 09:55:02.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAAAAJAFAFAAACA',1,NULL,'2021-11-10 09:54:56.290455',NULL,NULL,255,255.0,2,6),(68,'2','2021-11-10 13:11:45.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABADABABAEAFA',1,NULL,'2021-11-10 13:11:37.946903',NULL,NULL,255,255.0,2,6),(69,'3','2021-11-10 13:11:49.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABADABABAEAJA',1,NULL,'2021-11-10 13:11:43.045775',NULL,NULL,255,255.0,3,6),(70,'4','2021-11-10 13:11:52.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABADABABAFACA',1,NULL,'2021-11-10 13:11:46.240309',NULL,NULL,255,255.0,4,6),(71,'5','2021-11-10 13:11:55.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABADABABAFAFA',1,NULL,'2021-11-10 13:11:48.349844',NULL,NULL,255,255.0,5,6),(72,'19','2021-11-10 13:11:58.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABADABABAFAIA',1,NULL,'2021-11-10 13:11:53.515262',NULL,NULL,255,255.0,10,6),(73,'9','2021-11-10 13:12:01.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABADABACAAABA',1,NULL,'2021-11-10 13:11:54.689079',NULL,NULL,255,255.0,9,6),(74,'7','2021-11-10 13:12:04.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABADABACAAAEA',1,NULL,'2021-11-10 13:11:56.932299',NULL,NULL,255,255.0,7,6),(75,'8','2021-11-10 13:12:06.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABADABACAAAGA',1,NULL,'2021-11-10 13:11:58.479812',NULL,NULL,255,255.0,8,6),(76,'6','2021-11-10 13:12:08.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABADABACAAAIA',1,NULL,'2021-11-10 13:12:01.020086',NULL,NULL,255,255.0,6,6),(77,'3','2021-11-10 13:16:15.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABADABAGABAFA',1,NULL,'2021-11-10 13:16:08.384697',NULL,NULL,255,255.0,3,6),(78,'4','2021-11-10 13:16:19.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABADABAGABAJA',1,NULL,'2021-11-10 13:16:11.549727',NULL,NULL,255,255.0,4,6),(79,'2','2021-11-10 13:39:39.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABADADAJADAJA',1,NULL,'2021-11-10 13:39:32.933649',NULL,NULL,255,255.0,2,6),(80,'3','2021-11-10 13:39:43.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABADADAJAEADA',1,NULL,'2021-11-10 13:39:36.116955',NULL,NULL,255,255.0,3,6),(81,'1','2021-11-10 13:39:46.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABADADAJAEAGA',1,NULL,'2021-11-10 13:39:39.229884',NULL,NULL,255,255.0,1,6),(82,'2','2021-11-10 15:01:42.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABAFAAABAEACA',1,NULL,'2021-11-10 15:01:35.913248',NULL,NULL,255,255.0,2,6),(83,'1','2021-11-10 15:01:46.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABAFAAABAEAGA',1,NULL,'2021-11-10 15:01:39.433637',NULL,NULL,255,255.0,1,6),(84,'3','2021-11-10 15:01:49.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABAFAAABAEAJA',1,NULL,'2021-11-10 15:01:42.533664',NULL,NULL,255,255.0,3,6),(85,'2','2021-11-10 15:10:02.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABAFABAAAAACA',1,NULL,'2021-11-10 15:09:55.137351',NULL,NULL,255,255.0,2,6),(86,'1','2021-11-10 15:34:34.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABAFADAEADAEA',1,NULL,'2021-11-10 15:34:27.535977',NULL,NULL,255,255.0,1,6),(87,'2','2021-11-10 15:34:37.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAAABAFADAEADAHA',1,NULL,'2021-11-10 15:34:29.285693',NULL,NULL,255,255.0,2,6),(88,'2','2021-11-11 07:20:40.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABAAAHACAAAEAAA',1,NULL,'2021-11-11 07:26:07.756887',NULL,NULL,255,255.0,2,6),(89,'1','2021-11-11 07:20:42.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABAAAHACAAAEACA',1,NULL,'2021-11-11 07:26:08.675066',NULL,NULL,255,255.0,1,6),(90,'3','2021-11-11 07:20:44.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABAAAHACAAAEAEA',1,NULL,'2021-11-11 07:26:08.775329',NULL,NULL,255,255.0,3,6),(91,'4','2021-11-11 07:21:06.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABAAAHACABAAAGA',1,NULL,'2021-11-11 07:26:08.897722',NULL,NULL,255,255.0,4,6),(92,'5','2021-11-11 07:21:09.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABAAAHACABAAAJA',1,NULL,'2021-11-11 07:26:09.499266',NULL,NULL,255,255.0,5,6),(93,'6','2021-11-11 07:21:14.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABAAAHACABABAEA',1,NULL,'2021-11-11 07:26:09.599540',NULL,NULL,255,255.0,6,6),(94,'7','2021-11-11 07:21:16.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABAAAHACABABAGA',1,NULL,'2021-11-11 07:26:09.731051',NULL,NULL,255,255.0,7,6),(95,'8','2021-11-11 07:21:19.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABAAAHACABABAJA',1,NULL,'2021-11-11 07:26:10.063061',NULL,NULL,255,255.0,8,6),(96,'9','2021-11-11 07:21:21.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABAAAHACABACABA',1,NULL,'2021-11-11 07:26:10.147693',NULL,NULL,255,255.0,9,6),(97,'19','2021-11-11 07:21:24.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABAAAHACABACAEA',1,NULL,'2021-11-11 07:26:10.201075',NULL,NULL,255,255.0,10,6),(98,'1','2021-11-11 09:36:25.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABAAAJADAGACAFA',1,NULL,'2021-11-11 09:36:28.139188',NULL,NULL,255,255.0,1,6),(99,'2','2021-11-11 09:36:30.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABAAAJADAGADAAA',1,NULL,'2021-11-11 09:36:32.567812',NULL,NULL,255,255.0,2,6),(100,'2','2021-11-11 09:36:33.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABAAAJADAGADADA',1,NULL,'2021-11-11 09:36:35.730652',NULL,NULL,255,255.0,2,6),(101,'2','2021-11-11 10:03:48.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABABAAAAADAEAIA',1,NULL,'2021-11-11 10:03:50.795334',NULL,NULL,255,255.0,2,6),(102,'1','2021-11-11 10:03:51.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABABAAAAADAFABA',1,NULL,'2021-11-11 10:03:54.117146',NULL,NULL,255,255.0,1,6),(103,'19','2021-11-11 12:42:55.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABABACAEACAFAFA',1,NULL,'2021-11-11 12:42:57.420069',NULL,NULL,255,255.0,10,6),(104,'20','2021-11-11 12:44:19.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABABACAEAEABAJA',1,NULL,'2021-11-11 12:44:23.533409',NULL,NULL,255,255.0,11,6),(105,'20','2021-11-11 12:45:10.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABABACAEAFABAAA',1,NULL,'2021-11-11 12:45:12.319427',NULL,NULL,255,255.0,11,6),(106,'2','2021-11-11 13:01:25.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABABADAAABACAFA',1,NULL,'2021-11-11 13:01:26.480931',NULL,NULL,255,255.0,2,6),(107,'2','2021-11-11 15:54:58.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABABAFAFAEAFAIA',1,NULL,'2021-11-11 15:55:02.485499',NULL,NULL,255,255.0,2,6),(108,'2','2021-11-11 16:07:19.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABABAGAAAHABAJA',1,NULL,'2021-11-11 16:07:21.084971',NULL,NULL,255,255.0,2,6),(109,'1','2021-11-11 16:07:23.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABABAGAAAHACADA',1,NULL,'2021-11-11 16:07:24.244085',NULL,NULL,255,255.0,1,6),(110,'3','2021-11-11 16:07:26.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABABAGAAAHACAGA',1,NULL,'2021-11-11 16:07:27.518980',NULL,NULL,255,255.0,3,6),(111,'4','2021-11-11 16:07:29.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABABAGAAAHACAJA',1,NULL,'2021-11-11 16:07:29.716424',NULL,NULL,255,255.0,4,6),(112,'6','2021-11-11 16:07:34.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABABAGAAAHADAEA',1,NULL,'2021-11-11 16:07:34.855512',NULL,NULL,255,255.0,6,6),(113,'7','2021-11-11 16:07:36.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABABAGAAAHADAGA',1,NULL,'2021-11-11 16:07:36.998441',NULL,NULL,255,255.0,7,6),(114,'8','2021-11-11 16:07:38.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABABAGAAAHADAIA',1,NULL,'2021-11-11 16:07:39.147208',NULL,NULL,255,255.0,8,6),(115,'9','2021-11-11 16:07:40.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABABAGAAAHAEAAA',1,NULL,'2021-11-11 16:07:41.332924',NULL,NULL,255,255.0,9,6),(116,'20','2021-11-11 16:07:44.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABABABAGAAAHAEAEA',1,NULL,'2021-11-11 16:07:45.455380',NULL,NULL,255,255.0,11,6),(117,'2','2021-11-12 07:02:13.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABACAAAHAAACABADA',1,NULL,'2021-11-12 07:53:47.502487',NULL,NULL,255,255.0,2,6),(118,'1','2021-11-12 07:02:15.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABACAAAHAAACABAFA',1,NULL,'2021-11-12 07:53:50.545521',NULL,NULL,255,255.0,1,6),(119,'3','2021-11-12 07:02:16.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABACAAAHAAACABAGA',1,NULL,'2021-11-12 07:53:50.988119',NULL,NULL,255,255.0,3,6),(120,'4','2021-11-12 07:02:18.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABACAAAHAAACABAIA',1,NULL,'2021-11-12 07:53:51.427250',NULL,NULL,255,255.0,4,6),(121,'5','2021-11-12 07:02:20.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABACAAAHAAACACAAA',1,NULL,'2021-11-12 07:53:51.704472',NULL,NULL,255,255.0,5,6),(122,'6','2021-11-12 07:02:22.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABACAAAHAAACACACA',1,NULL,'2021-11-12 07:53:51.964267',NULL,NULL,255,255.0,6,6),(123,'7','2021-11-12 07:02:24.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABACAAAHAAACACAEA',1,NULL,'2021-11-12 07:53:52.144934',NULL,NULL,255,255.0,7,6),(124,'8','2021-11-12 07:02:26.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABACAAAHAAACACAGA',1,NULL,'2021-11-12 07:53:52.611224',NULL,NULL,255,255.0,8,6),(125,'9','2021-11-12 07:02:28.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABACAAAHAAACACAIA',1,NULL,'2021-11-12 07:53:53.123306',NULL,NULL,255,255.0,9,6),(126,'20','2021-11-12 07:02:30.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABACAAAHAAACADAAA',1,NULL,'2021-11-12 07:53:54.004774',NULL,NULL,255,255.0,11,6),(127,'20','2021-11-12 07:02:32.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABACAAAHAAACADACA',1,NULL,'2021-11-12 07:53:54.235677',NULL,NULL,255,255.0,11,6),(128,'20','2021-11-12 08:17:41.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABACAAAIABAHAEABA',1,NULL,'2021-11-12 08:17:36.604699',NULL,NULL,255,255.0,11,6),(129,'20','2021-11-12 08:17:43.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABACAAAIABAHAEADA',1,NULL,'2021-11-12 08:17:39.043855',NULL,NULL,255,255.0,11,6),(130,'4','2021-11-12 12:55:50.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABACABACAFAFAFAAA',1,NULL,'2021-11-12 12:55:45.569855',NULL,NULL,255,255.0,4,6),(131,'2','2021-11-15 07:13:08.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFAAAHABADAAAIA',1,NULL,'2021-11-15 07:29:41.331785',NULL,NULL,255,255.0,2,6),(132,'1','2021-11-15 07:13:10.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFAAAHABADABAAA',1,NULL,'2021-11-15 07:29:41.964829',NULL,NULL,255,255.0,1,6),(133,'3','2021-11-15 07:13:12.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFAAAHABADABACA',1,NULL,'2021-11-15 07:29:42.033836',NULL,NULL,255,255.0,3,6),(134,'4','2021-11-15 07:13:14.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFAAAHABADABAEA',1,NULL,'2021-11-15 07:29:42.096333',NULL,NULL,255,255.0,4,6),(135,'5','2021-11-15 07:13:20.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFAAAHABADACAAA',1,NULL,'2021-11-15 07:29:42.134096',NULL,NULL,255,255.0,5,6),(136,'6','2021-11-15 07:13:22.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFAAAHABADACACA',1,NULL,'2021-11-15 07:29:42.203107',NULL,NULL,255,255.0,6,6),(137,'7','2021-11-15 07:13:25.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFAAAHABADACAFA',1,NULL,'2021-11-15 07:29:42.266109',NULL,NULL,255,255.0,7,6),(138,'8','2021-11-15 07:13:26.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFAAAHABADACAGA',1,NULL,'2021-11-15 07:29:42.341114',NULL,NULL,255,255.0,8,6),(139,'9','2021-11-15 07:13:28.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFAAAHABADACAIA',1,NULL,'2021-11-15 07:29:42.399119',NULL,NULL,255,255.0,9,6),(140,'20','2021-11-15 07:13:31.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFAAAHABADADABA',1,NULL,'2021-11-15 07:29:42.449353',NULL,NULL,255,255.0,11,6),(141,'6','2021-11-15 07:14:47.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFAAAHABAEAEAHA',1,NULL,'2021-11-15 07:29:42.496941',NULL,NULL,255,255.0,6,6),(142,'7','2021-11-15 07:14:49.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFAAAHABAEAEAJA',1,NULL,'2021-11-15 07:29:42.698108',NULL,NULL,255,255.0,7,6),(143,'8','2021-11-15 07:14:52.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFAAAHABAEAFACA',1,NULL,'2021-11-15 07:29:42.906109',NULL,NULL,255,255.0,8,6),(144,'9','2021-11-15 07:14:57.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFAAAHABAEAFAHA',1,NULL,'2021-11-15 07:29:42.961745',NULL,NULL,255,255.0,9,6),(145,'20','2021-11-15 07:14:59.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFAAAHABAEAFAJA',1,NULL,'2021-11-15 07:29:43.014531',NULL,NULL,255,255.0,11,6),(146,'2','2021-11-15 11:01:10.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABABAAABABAAA',1,NULL,'2021-11-15 11:01:11.392879',NULL,NULL,255,255.0,2,6),(147,'3','2021-11-15 11:01:13.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABABAAABABADA',1,NULL,'2021-11-15 11:01:14.612966',NULL,NULL,255,255.0,3,6),(148,'4','2021-11-15 11:01:16.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABABAAABABAGA',1,NULL,'2021-11-15 11:01:16.142040',NULL,NULL,255,255.0,4,6),(149,'5','2021-11-15 11:01:18.000000','4',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABABAAABABAIA',1,NULL,'2021-11-15 11:01:18.303419',NULL,NULL,255,255.0,5,6),(150,'2','2021-11-15 12:25:48.000000','5',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABACACAFAEAIA',1,NULL,'2021-11-15 12:25:48.243559',NULL,NULL,255,255.0,2,6),(151,'2','2021-11-15 15:55:07.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAFAFAFAAAHA',1,NULL,'2021-11-15 15:55:06.627289',NULL,NULL,255,255.0,2,6),(152,'1','2021-11-15 15:55:09.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAFAFAFAAAJA',1,NULL,'2021-11-15 15:55:09.665742',NULL,NULL,255,255.0,1,6),(153,'3','2021-11-15 15:55:12.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAFAFAFABACA',1,NULL,'2021-11-15 15:55:12.847349',NULL,NULL,255,255.0,3,6),(154,'4','2021-11-15 15:55:16.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAFAFAFABAGA',1,NULL,'2021-11-15 15:55:15.168421',NULL,NULL,255,255.0,4,6),(155,'5','2021-11-15 15:55:18.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAFAFAFABAIA',1,NULL,'2021-11-15 15:55:17.617066',NULL,NULL,255,255.0,5,6),(156,'6','2021-11-15 15:55:20.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAFAFAFACAAA',1,NULL,'2021-11-15 15:55:19.727780',NULL,NULL,255,255.0,6,6),(157,'7','2021-11-15 15:55:23.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAFAFAFACADA',1,NULL,'2021-11-15 15:55:22.167462',NULL,NULL,255,255.0,7,6),(158,'8','2021-11-15 15:55:25.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAFAFAFACAFA',1,NULL,'2021-11-15 15:55:24.297435',NULL,NULL,255,255.0,8,6),(159,'9','2021-11-15 15:55:27.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAFAFAFACAHA',1,NULL,'2021-11-15 15:55:26.557305',NULL,NULL,255,255.0,9,6),(160,'20','2021-11-15 15:55:29.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAFAFAFACAJA',1,NULL,'2021-11-15 15:55:28.657420',NULL,NULL,255,255.0,11,6),(161,'1','2021-11-15 16:01:01.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAGAAABAAABA',1,NULL,'2021-11-15 16:01:01.129765',NULL,NULL,255,255.0,1,6),(162,'3','2021-11-15 16:01:05.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAGAAABAAAFA',1,NULL,'2021-11-15 16:01:04.299712',NULL,NULL,255,255.0,3,6),(163,'4','2021-11-15 16:01:08.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAGAAABAAAIA',1,NULL,'2021-11-15 16:01:08.409573',NULL,NULL,255,255.0,4,6),(164,'6','2021-11-15 16:01:13.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAGAAABABADA',1,NULL,'2021-11-15 16:01:12.553862',NULL,NULL,255,255.0,6,6),(165,'9','2021-11-15 16:01:16.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAGAAABABAGA',1,NULL,'2021-11-15 16:01:15.809725',NULL,NULL,255,255.0,9,6),(166,'20','2021-11-15 16:01:19.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAGAAABABAJA',1,NULL,'2021-11-15 16:01:18.929760',NULL,NULL,255,255.0,11,6),(167,'20','2021-11-15 16:01:21.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAGAAABACABA',1,NULL,'2021-11-15 16:01:21.099871',NULL,NULL,255,255.0,11,6),(168,'20','2021-11-15 16:01:24.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAFABAGAAABACAEA',1,NULL,'2021-11-15 16:01:24.214421',NULL,NULL,255,255.0,11,6),(169,'6','2021-11-16 07:02:35.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGAAAHAAACADAFA',1,NULL,'2021-11-16 07:27:23.067374',NULL,NULL,255,255.0,6,6),(170,'7','2021-11-16 07:02:37.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGAAAHAAACADAHA',1,NULL,'2021-11-16 07:27:23.368170',NULL,NULL,255,255.0,7,6),(171,'8','2021-11-16 07:02:40.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGAAAHAAACAEAAA',1,NULL,'2021-11-16 07:27:23.415240',NULL,NULL,255,255.0,8,6),(172,'9','2021-11-16 07:02:42.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGAAAHAAACAEACA',1,NULL,'2021-11-16 07:27:23.452844',NULL,NULL,255,255.0,9,6),(173,'20','2021-11-16 07:02:48.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGAAAHAAACAEAIA',1,NULL,'2021-11-16 07:27:23.500046',NULL,NULL,255,255.0,11,6),(174,'2','2021-11-16 07:02:50.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGAAAHAAACAFAAA',1,NULL,'2021-11-16 07:27:23.537580',NULL,NULL,255,255.0,2,6),(175,'1','2021-11-16 07:02:53.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGAAAHAAACAFADA',1,NULL,'2021-11-16 07:27:23.569161',NULL,NULL,255,255.0,1,6),(176,'3','2021-11-16 07:02:56.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGAAAHAAACAFAGA',1,NULL,'2021-11-16 07:27:23.631604',NULL,NULL,255,255.0,3,6),(177,'4','2021-11-16 07:03:02.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGAAAHAAADAAACA',1,NULL,'2021-11-16 07:27:23.668893',NULL,NULL,255,255.0,4,6),(178,'5','2021-11-16 07:03:04.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGAAAHAAADAAAEA',1,NULL,'2021-11-16 07:27:23.715762',NULL,NULL,255,255.0,5,6),(179,'1','2021-11-16 16:14:21.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGABAGABAEACABA',1,NULL,'2021-11-16 16:14:24.990086',NULL,NULL,255,255.0,1,6),(180,'3','2021-11-16 16:14:24.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGABAGABAEACAEA',1,NULL,'2021-11-16 16:14:27.460198',NULL,NULL,255,255.0,3,6),(181,'4','2021-11-16 16:14:27.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGABAGABAEACAHA',1,NULL,'2021-11-16 16:14:29.020116',NULL,NULL,255,255.0,4,6),(182,'5','2021-11-16 16:14:29.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGABAGABAEACAJA',1,NULL,'2021-11-16 16:14:31.230380',NULL,NULL,255,255.0,5,6),(183,'2','2021-11-16 16:14:32.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGABAGABAEADACA',1,NULL,'2021-11-16 16:14:33.380408',NULL,NULL,255,255.0,2,6),(184,'6','2021-11-16 16:14:34.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGABAGABAEADAEA',1,NULL,'2021-11-16 16:14:36.520237',NULL,NULL,255,255.0,6,6),(185,'7','2021-11-16 16:14:37.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGABAGABAEADAHA',1,NULL,'2021-11-16 16:14:39.624672',NULL,NULL,255,255.0,7,6),(186,'8','2021-11-16 16:14:40.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGABAGABAEAEAAA',1,NULL,'2021-11-16 16:14:41.780460',NULL,NULL,255,255.0,8,6),(187,'9','2021-11-16 16:14:42.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGABAGABAEAEACA',1,NULL,'2021-11-16 16:14:44.870815',NULL,NULL,255,255.0,9,6),(188,'20','2021-11-16 16:14:45.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAGABAGABAEAEAFA',1,NULL,'2021-11-16 16:14:47.077831',NULL,NULL,255,255.0,11,6),(189,'2','2021-11-18 07:09:11.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIAAAHAAAJABABA',1,NULL,'2021-11-18 10:31:33.732947',NULL,NULL,255,255.0,2,6),(190,'1','2021-11-18 07:09:13.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIAAAHAAAJABADA',1,NULL,'2021-11-18 10:31:35.545247',NULL,NULL,255,255.0,1,6),(191,'3','2021-11-18 07:09:16.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIAAAHAAAJABAGA',1,NULL,'2021-11-18 10:31:35.645455',NULL,NULL,255,255.0,3,6),(192,'4','2021-11-18 07:09:19.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIAAAHAAAJABAJA',1,NULL,'2021-11-18 10:31:35.711779',NULL,NULL,255,255.0,4,6),(193,'5','2021-11-18 07:09:22.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIAAAHAAAJACACA',1,NULL,'2021-11-18 10:31:35.831504',NULL,NULL,255,255.0,5,6),(194,'6','2021-11-18 07:09:25.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIAAAHAAAJACAFA',1,NULL,'2021-11-18 10:31:35.903837',NULL,NULL,255,255.0,6,6),(195,'7','2021-11-18 07:09:27.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIAAAHAAAJACAHA',1,NULL,'2021-11-18 10:31:36.118807',NULL,NULL,255,255.0,7,6),(196,'8','2021-11-18 07:09:29.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIAAAHAAAJACAJA',1,NULL,'2021-11-18 10:31:36.519901',NULL,NULL,255,255.0,8,6),(197,'9','2021-11-18 07:09:32.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIAAAHAAAJADACA',1,NULL,'2021-11-18 10:31:36.587824',NULL,NULL,255,255.0,9,6),(198,'20','2021-11-18 07:09:34.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIAAAHAAAJADAEA',1,NULL,'2021-11-18 10:31:36.643733',NULL,NULL,255,255.0,11,6),(199,'2','2021-11-18 10:35:54.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAAADAFAFAEA',1,NULL,'2021-11-18 10:35:56.356161',NULL,NULL,255,255.0,2,6),(200,'2','2021-11-18 10:38:46.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAAADAIAEAGA',1,NULL,'2021-11-18 10:38:47.668176',NULL,NULL,255,255.0,2,6),(201,'2','2021-11-18 10:39:30.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAAADAJADAAA',1,NULL,'2021-11-18 10:39:31.843411',NULL,NULL,255,255.0,2,6),(202,'2','2021-11-18 11:28:50.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABABACAIAFAAA',1,NULL,'2021-11-18 11:28:51.713942',NULL,NULL,255,255.0,2,6),(203,'2','2021-11-18 11:29:17.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABABACAJABAHA',1,NULL,'2021-11-18 11:29:20.106089',NULL,NULL,255,255.0,2,6),(204,'2','2021-11-18 11:31:46.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABABADABAEAGA',1,NULL,'2021-11-18 11:31:48.333784',NULL,NULL,255,255.0,2,6),(205,'2','2021-11-18 11:31:57.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABABADABAFAHA',1,NULL,'2021-11-18 11:31:59.542477',NULL,NULL,255,255.0,2,6),(206,'2','2021-11-18 11:36:52.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABABADAGAFACA',1,NULL,'2021-11-18 11:36:54.910843',NULL,NULL,255,255.0,2,6),(207,'2','2021-11-18 11:37:02.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABABADAHAAACA',1,NULL,'2021-11-18 11:37:04.140080',NULL,NULL,255,255.0,2,6),(208,'2','2021-11-18 11:39:34.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABABADAJADAEA',1,NULL,'2021-11-18 11:39:36.377813',NULL,NULL,255,255.0,2,6),(209,'2','2021-11-18 11:39:44.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABABADAJAEAEA',1,NULL,'2021-11-18 11:39:46.527000',NULL,NULL,255,255.0,2,6),(210,'2','2021-11-18 11:40:07.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABABAEAAAAAHA',1,NULL,'2021-11-18 11:40:08.647719',NULL,NULL,255,255.0,2,6),(211,'2','2021-11-18 11:57:07.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABABAFAHAAAHA',1,NULL,'2021-11-18 11:57:09.685555',NULL,NULL,255,255.0,2,6),(212,'2','2021-11-18 12:25:01.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABACACAFAAABA',1,NULL,'2021-11-18 12:25:02.316877',NULL,NULL,255,255.0,2,6),(213,'2','2021-11-18 12:39:33.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABACADAJADADA',1,NULL,'2021-11-18 12:39:34.250655',NULL,NULL,255,255.0,2,6),(214,'2','2021-11-18 12:42:44.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABACAEACAEAEA',1,NULL,'2021-11-18 12:42:46.565143',NULL,NULL,255,255.0,2,6),(215,'2','2021-11-18 12:45:37.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABACAEAFADAHA',1,NULL,'2021-11-18 12:45:38.971327',NULL,NULL,255,255.0,2,6),(216,'2','2021-11-18 12:47:05.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABACAEAHAAAFA',1,NULL,'2021-11-18 12:47:07.622152',NULL,NULL,255,255.0,2,6),(217,'2','2021-11-18 12:48:07.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABACAEAIAAAHA',1,NULL,'2021-11-18 12:48:09.892642',NULL,NULL,255,255.0,2,6),(218,'2','2021-11-18 12:52:55.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABACAFACAFAFA',1,NULL,'2021-11-18 12:52:57.326082',NULL,NULL,255,255.0,2,6),(219,'2','2021-11-18 12:53:39.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABACAFADADAJA',1,NULL,'2021-11-18 12:53:40.516070',NULL,NULL,255,255.0,2,6),(220,'2','2021-11-18 12:57:38.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABACAFAHADAIA',1,NULL,'2021-11-18 12:57:39.991577',NULL,NULL,255,255.0,2,6),(221,'2','2021-11-18 12:58:16.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABACAFAIABAGA',1,NULL,'2021-11-18 12:58:18.595317',NULL,NULL,255,255.0,2,6),(222,'2','2021-11-18 12:58:49.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABACAFAIAEAJA',1,NULL,'2021-11-18 12:58:50.715807',NULL,NULL,255,255.0,2,6),(223,'2','2021-11-18 12:59:35.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABACAFAJADAFA',1,NULL,'2021-11-18 12:59:36.860147',NULL,NULL,255,255.0,2,6),(224,'2','2021-11-18 13:00:39.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABADAAAAADAJA',1,NULL,'2021-11-18 13:00:41.033735',NULL,NULL,255,255.0,2,6),(225,'2','2021-11-18 13:10:49.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABADABAAAEAJA',1,NULL,'2021-11-18 13:10:50.690998',NULL,NULL,255,255.0,2,6),(226,'2','2021-11-18 13:11:52.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABADABABAFACA',1,NULL,'2021-11-18 13:11:53.929750',NULL,NULL,255,255.0,2,6),(227,'2','2021-11-18 13:12:06.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABADABACAAAGA',1,NULL,'2021-11-18 13:12:08.132916',NULL,NULL,255,255.0,2,6),(228,'2','2021-11-18 13:12:20.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABADABACACAAA',1,NULL,'2021-11-18 13:12:22.254858',NULL,NULL,255,255.0,2,6),(229,'2','2021-11-18 13:12:31.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABADABACADABA',1,NULL,'2021-11-18 13:12:33.542756',NULL,NULL,255,255.0,2,6),(230,'2','2021-11-18 13:21:04.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABADACABAAAEA',1,NULL,'2021-11-18 13:21:06.252273',NULL,NULL,255,255.0,2,6),(231,'2','2021-11-18 13:22:17.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABADACACABAHA',1,NULL,'2021-11-18 13:22:18.465692',NULL,NULL,255,255.0,2,6),(232,'1','2021-11-18 16:18:30.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGABAIADAAA',1,NULL,'2021-11-18 16:18:31.643277',NULL,NULL,255,255.0,1,6),(233,'3','2021-11-18 16:18:32.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGABAIADACA',1,NULL,'2021-11-18 16:18:34.887036',NULL,NULL,255,255.0,3,6),(234,'4','2021-11-18 16:18:35.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGABAIADAFA',1,NULL,'2021-11-18 16:18:37.053247',NULL,NULL,255,255.0,4,6),(235,'5','2021-11-18 16:18:38.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGABAIADAIA',1,NULL,'2021-11-18 16:18:39.193262',NULL,NULL,255,255.0,5,6),(236,'6','2021-11-18 16:18:41.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGABAIAEABA',1,NULL,'2021-11-18 16:18:41.333384',NULL,NULL,255,255.0,6,6),(237,'7','2021-11-18 16:18:43.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGABAIAEADA',1,NULL,'2021-11-18 16:18:43.448215',NULL,NULL,255,255.0,7,6),(238,'8','2021-11-18 16:18:45.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGABAIAEAFA',1,NULL,'2021-11-18 16:18:45.543566',NULL,NULL,255,255.0,8,6),(239,'9','2021-11-18 16:18:47.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGABAIAEAHA',1,NULL,'2021-11-18 16:18:47.713333',NULL,NULL,255,255.0,9,6),(240,'20','2021-11-18 16:18:49.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGABAIAEAJA',1,NULL,'2021-11-18 16:18:49.893330',NULL,NULL,255,255.0,11,6),(241,'2','2021-11-18 16:21:23.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGACABACADA',1,NULL,'2021-11-18 16:21:25.149057',NULL,NULL,255,255.0,2,6),(242,'2','2021-11-18 16:24:02.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGACAEAAACA',1,NULL,'2021-11-18 16:24:04.393171',NULL,NULL,255,255.0,2,6),(243,'1','2021-11-18 16:25:01.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGACAFAAABA',1,NULL,'2021-11-18 16:25:03.020405',NULL,NULL,255,255.0,1,6),(244,'2','2021-11-18 16:26:20.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGACAGACAAA',1,NULL,'2021-11-18 16:26:22.196005',NULL,NULL,255,255.0,2,6),(245,'2','2021-11-18 16:28:28.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGACAIACAIA',1,NULL,'2021-11-18 16:28:29.420614',NULL,NULL,255,255.0,2,6),(246,'2','2021-11-18 16:28:31.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGACAIADABA',1,NULL,'2021-11-18 16:28:31.556964',NULL,NULL,255,255.0,2,6),(247,'2','2021-11-18 16:31:33.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGADABADADA',1,NULL,'2021-11-18 16:31:34.867463',NULL,NULL,255,255.0,2,6),(248,'2','2021-11-18 16:32:33.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGADACADADA',1,NULL,'2021-11-18 16:32:35.038927',NULL,NULL,255,255.0,2,6),(249,'2','2021-11-18 16:42:36.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGAEACADAGA',1,NULL,'2021-11-18 16:42:37.692624',NULL,NULL,255,255.0,2,6),(250,'3','2021-11-18 16:44:12.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGAEAEABACA',1,NULL,'2021-11-18 16:44:13.893230',NULL,NULL,255,255.0,3,6),(251,'4','2021-11-18 16:44:29.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGAEAEACAJA',1,NULL,'2021-11-18 16:44:31.093689',NULL,NULL,255,255.0,4,6),(252,'5','2021-11-18 16:44:31.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGAEAEADABA',1,NULL,'2021-11-18 16:44:32.273861',NULL,NULL,255,255.0,5,6),(253,'6','2021-11-18 16:44:33.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGAEAEADADA',1,NULL,'2021-11-18 16:44:34.384206',NULL,NULL,255,255.0,6,6),(254,'7','2021-11-18 16:44:36.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGAEAEADAGA',1,NULL,'2021-11-18 16:44:36.485530',NULL,NULL,255,255.0,7,6),(255,'8','2021-11-18 16:44:38.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGAEAEADAIA',1,NULL,'2021-11-18 16:44:39.588698',NULL,NULL,255,255.0,8,6),(256,'9','2021-11-18 16:44:41.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGAEAEAEABA',1,NULL,'2021-11-18 16:44:41.703493',NULL,NULL,255,255.0,9,6),(257,'20','2021-11-18 16:44:43.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABABAIABAGAEAEAEADA',1,NULL,'2021-11-18 16:44:43.793684',NULL,NULL,255,255.0,11,6),(258,'2','2021-11-22 07:16:14.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACAAAHABAGABAEA',1,NULL,'2021-11-22 07:43:48.293124',NULL,NULL,255,255.0,2,6),(259,'1','2021-11-22 07:16:17.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACAAAHABAGABAHA',1,NULL,'2021-11-22 07:43:48.854038',NULL,NULL,255,255.0,1,6),(260,'3','2021-11-22 07:16:19.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACAAAHABAGABAJA',1,NULL,'2021-11-22 07:43:48.936766',NULL,NULL,255,255.0,3,6),(261,'6','2021-11-22 08:05:12.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACAAAIAAAFABACA',1,NULL,'2021-11-22 08:05:15.231987',NULL,NULL,255,255.0,6,6),(262,'7','2021-11-22 08:05:14.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACAAAIAAAFABAEA',1,NULL,'2021-11-22 08:05:17.848240',NULL,NULL,255,255.0,7,6),(263,'8','2021-11-22 08:05:17.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACAAAIAAAFABAHA',1,NULL,'2021-11-22 08:05:19.975103',NULL,NULL,255,255.0,8,6),(264,'9','2021-11-22 08:05:21.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACAAAIAAAFACABA',1,NULL,'2021-11-22 08:05:22.070444',NULL,NULL,255,255.0,9,6),(265,'20','2021-11-22 08:05:23.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACAAAIAAAFACADA',1,NULL,'2021-11-22 08:05:24.229429',NULL,NULL,255,255.0,11,6),(266,'2','2021-11-22 16:11:42.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACABAGABABAEACA',1,NULL,'2021-11-24 10:15:57.405145',NULL,NULL,255,255.0,2,6),(267,'2','2021-11-22 16:11:44.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACABAGABABAEAEA',1,NULL,'2021-11-24 10:16:00.294908',NULL,NULL,255,255.0,2,6),(268,'3','2021-11-22 16:11:45.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACABAGABABAEAFA',1,NULL,'2021-11-24 10:16:00.354987',NULL,NULL,255,255.0,3,6),(269,'4','2021-11-22 16:11:47.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACABAGABABAEAHA',1,NULL,'2021-11-24 10:16:00.673024',NULL,NULL,255,255.0,4,6),(270,'5','2021-11-22 16:11:50.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACABAGABABAFAAA',1,NULL,'2021-11-24 10:16:00.796386',NULL,NULL,255,255.0,5,6),(271,'6','2021-11-22 16:11:53.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACABAGABABAFADA',1,NULL,'2021-11-24 10:16:00.865137',NULL,NULL,255,255.0,6,6),(272,'7','2021-11-22 16:11:55.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACABAGABABAFAFA',1,NULL,'2021-11-24 10:16:00.934094',NULL,NULL,255,255.0,7,6),(273,'8','2021-11-22 16:11:56.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACABAGABABAFAGA',1,NULL,'2021-11-24 10:16:00.993938',NULL,NULL,255,255.0,8,6),(274,'9','2021-11-22 16:11:58.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACACABAGABABAFAIA',1,NULL,'2021-11-24 10:16:01.076502',NULL,NULL,255,255.0,9,6),(275,'2','2021-11-23 07:06:19.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADAAAHAAAGABAJA',1,NULL,'2021-11-24 10:16:01.172907',NULL,NULL,255,255.0,2,6),(276,'1','2021-11-23 07:06:21.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADAAAHAAAGACABA',1,NULL,'2021-11-24 10:16:01.245998',NULL,NULL,255,255.0,1,6),(277,'3','2021-11-23 07:06:23.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADAAAHAAAGACADA',1,NULL,'2021-11-24 10:16:01.315913',NULL,NULL,255,255.0,3,6),(278,'4','2021-11-23 07:06:26.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADAAAHAAAGACAGA',1,NULL,'2021-11-24 10:16:01.445373',NULL,NULL,255,255.0,4,6),(279,'5','2021-11-23 07:06:28.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADAAAHAAAGACAIA',1,NULL,'2021-11-24 10:16:01.499542',NULL,NULL,255,255.0,5,6),(280,'6','2021-11-23 07:06:31.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADAAAHAAAGADABA',1,NULL,'2021-11-24 10:16:01.615728',NULL,NULL,255,255.0,6,6),(281,'7','2021-11-23 07:06:33.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADAAAHAAAGADADA',1,NULL,'2021-11-24 10:16:01.675321',NULL,NULL,255,255.0,7,6),(282,'8','2021-11-23 07:06:35.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADAAAHAAAGADAFA',1,NULL,'2021-11-24 10:16:02.044803',NULL,NULL,255,255.0,8,6),(283,'9','2021-11-23 07:06:38.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADAAAHAAAGADAIA',1,NULL,'2021-11-24 10:16:02.236282',NULL,NULL,255,255.0,9,6),(284,'20','2021-11-23 07:06:40.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADAAAHAAAGAEAAA',1,NULL,'2021-11-24 10:16:02.345203',NULL,NULL,255,255.0,11,6),(285,'2','2021-11-23 16:35:04.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADABAGADAFAAAEA',1,NULL,'2021-11-24 10:16:02.433076',NULL,NULL,255,255.0,2,6),(286,'1','2021-11-23 16:35:07.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADABAGADAFAAAHA',1,NULL,'2021-11-24 10:16:02.504904',NULL,NULL,255,255.0,1,6),(287,'3','2021-11-23 16:35:10.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADABAGADAFABAAA',1,NULL,'2021-11-24 10:16:02.569335',NULL,NULL,255,255.0,3,6),(288,'4','2021-11-23 16:35:15.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADABAGADAFABAFA',1,NULL,'2021-11-24 10:16:02.615577',NULL,NULL,255,255.0,4,6),(289,'5','2021-11-23 16:35:19.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADABAGADAFABAJA',1,NULL,'2021-11-24 10:16:02.655173',NULL,NULL,255,255.0,5,6),(290,'6','2021-11-23 16:35:21.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADABAGADAFACABA',1,NULL,'2021-11-24 10:16:02.706368',NULL,NULL,255,255.0,6,6),(291,'7','2021-11-23 16:35:23.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADABAGADAFACADA',1,NULL,'2021-11-24 10:16:02.774939',NULL,NULL,255,255.0,7,6),(292,'8','2021-11-23 16:35:25.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADABAGADAFACAFA',1,NULL,'2021-11-24 10:16:02.834788',NULL,NULL,255,255.0,8,6),(293,'9','2021-11-23 16:35:27.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADABAGADAFACAHA',1,NULL,'2021-11-24 10:16:02.906402',NULL,NULL,255,255.0,9,6),(294,'20','2021-11-23 16:35:30.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACADABAGADAFADAAA',1,NULL,'2021-11-24 10:16:02.972365',NULL,NULL,255,255.0,11,6),(295,'2','2021-11-24 07:01:57.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEAAAHAAABAFAHA',1,NULL,'2021-11-24 10:16:03.210418',NULL,NULL,255,255.0,2,6),(296,'1','2021-11-24 07:01:59.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEAAAHAAABAFAJA',1,NULL,'2021-11-24 10:16:03.596482',NULL,NULL,255,255.0,1,6),(297,'3','2021-11-24 07:02:01.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEAAAHAAACAAABA',1,NULL,'2021-11-24 10:16:03.765084',NULL,NULL,255,255.0,3,6),(298,'4','2021-11-24 07:02:03.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEAAAHAAACAAADA',1,NULL,'2021-11-24 10:16:03.824724',NULL,NULL,255,255.0,4,6),(299,'5','2021-11-24 07:02:19.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEAAAHAAACABAJA',1,NULL,'2021-11-24 10:16:03.886529',NULL,NULL,255,255.0,5,6),(300,'6','2021-11-24 07:02:22.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEAAAHAAACACACA',1,NULL,'2021-11-24 10:16:03.975766',NULL,NULL,255,255.0,6,6),(301,'7','2021-11-24 07:02:24.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEAAAHAAACACAEA',1,NULL,'2021-11-24 10:16:04.060308',NULL,NULL,255,255.0,7,6),(302,'8','2021-11-24 07:02:27.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEAAAHAAACACAHA',1,NULL,'2021-11-24 10:16:04.186816',NULL,NULL,255,255.0,8,6),(303,'9','2021-11-24 07:02:29.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEAAAHAAACACAJA',1,NULL,'2021-11-24 10:16:04.274871',NULL,NULL,255,255.0,9,6),(304,'20','2021-11-24 07:02:31.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEAAAHAAACADABA',1,NULL,'2021-11-24 10:16:04.375096',NULL,NULL,255,255.0,11,6),(305,'2','2021-11-24 16:01:00.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEABAGAAABAAAAA',1,NULL,'2021-11-26 10:48:39.360178',NULL,NULL,255,255.0,2,6),(306,'1','2021-11-24 16:01:02.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEABAGAAABAAACA',1,NULL,'2021-11-26 10:48:41.161408',NULL,NULL,255,255.0,1,6),(307,'3','2021-11-24 16:01:04.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEABAGAAABAAAEA',1,NULL,'2021-11-26 10:48:41.232702',NULL,NULL,255,255.0,3,6),(308,'4','2021-11-24 16:01:06.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEABAGAAABAAAGA',1,NULL,'2021-11-26 10:48:41.292547',NULL,NULL,255,255.0,4,6),(309,'5','2021-11-24 16:01:08.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEABAGAAABAAAIA',1,NULL,'2021-11-26 10:48:41.366554',NULL,NULL,255,255.0,5,6),(310,'6','2021-11-24 16:01:10.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEABAGAAABABAAA',1,NULL,'2021-11-26 10:48:41.540674',NULL,NULL,255,255.0,6,6),(311,'7','2021-11-24 16:01:13.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEABAGAAABABADA',1,NULL,'2021-11-26 10:48:41.659176',NULL,NULL,255,255.0,7,6),(312,'8','2021-11-24 16:01:15.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEABAGAAABABAFA',1,NULL,'2021-11-26 10:48:41.717647',NULL,NULL,255,255.0,8,6),(313,'9','2021-11-24 16:01:17.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEABAGAAABABAHA',1,NULL,'2021-11-26 10:48:42.017504',NULL,NULL,255,255.0,9,6),(314,'20','2021-11-24 16:01:20.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAEABAGAAABACAAA',1,NULL,'2021-11-26 10:48:42.211936',NULL,NULL,255,255.0,11,6),(315,'2','2021-11-25 07:02:45.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFAAAHAAACAEAFA',1,NULL,'2021-11-26 10:48:42.263371',NULL,NULL,255,255.0,2,6),(316,'1','2021-11-25 07:02:54.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFAAAHAAACAFAEA',1,NULL,'2021-11-26 10:48:42.352039',NULL,NULL,255,255.0,1,6),(317,'3','2021-11-25 07:02:56.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFAAAHAAACAFAGA',1,NULL,'2021-11-26 10:48:42.441164',NULL,NULL,255,255.0,3,6),(318,'4','2021-11-25 07:02:58.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFAAAHAAACAFAIA',1,NULL,'2021-11-26 10:48:42.577461',NULL,NULL,255,255.0,4,6),(319,'5','2021-11-25 07:03:07.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFAAAHAAADAAAHA',1,NULL,'2021-11-26 10:48:42.698523',NULL,NULL,255,255.0,5,6),(320,'6','2021-11-25 07:03:09.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFAAAHAAADAAAJA',1,NULL,'2021-11-26 10:48:42.779804',NULL,NULL,255,255.0,6,6),(321,'7','2021-11-25 07:03:14.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFAAAHAAADABAEA',1,NULL,'2021-11-26 10:48:42.823443',NULL,NULL,255,255.0,7,6),(322,'8','2021-11-25 07:03:19.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFAAAHAAADABAJA',1,NULL,'2021-11-26 10:48:42.890839',NULL,NULL,255,255.0,8,6),(323,'9','2021-11-25 07:03:22.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFAAAHAAADACACA',1,NULL,'2021-11-26 10:48:42.967246',NULL,NULL,255,255.0,9,6),(324,'20','2021-11-25 07:03:37.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFAAAHAAADADAHA',1,NULL,'2021-11-26 10:48:43.013693',NULL,NULL,255,255.0,11,6),(325,'6','2021-11-25 16:27:24.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFABAGACAHACAEA',1,NULL,'2021-11-26 10:48:43.164613',NULL,NULL,255,255.0,6,6),(326,'7','2021-11-25 16:27:26.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFABAGACAHACAGA',1,NULL,'2021-11-26 10:48:43.433703',NULL,NULL,255,255.0,7,6),(327,'8','2021-11-25 16:27:28.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFABAGACAHACAIA',1,NULL,'2021-11-26 10:48:43.475414',NULL,NULL,255,255.0,8,6),(328,'9','2021-11-25 16:27:30.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFABAGACAHADAAA',1,NULL,'2021-11-26 10:48:43.550556',NULL,NULL,255,255.0,9,6),(329,'20','2021-11-25 16:27:32.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFABAGACAHADACA',1,NULL,'2021-11-26 10:48:43.587264',NULL,NULL,255,255.0,11,6),(330,'2','2021-11-25 16:27:34.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFABAGACAHADAEA',1,NULL,'2021-11-26 10:48:43.693535',NULL,NULL,255,255.0,2,6),(331,'1','2021-11-25 16:27:36.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFABAGACAHADAGA',1,NULL,'2021-11-26 10:48:43.731954',NULL,NULL,255,255.0,1,6),(332,'3','2021-11-25 16:27:38.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFABAGACAHADAIA',1,NULL,'2021-11-26 10:48:43.867939',NULL,NULL,255,255.0,3,6),(333,'4','2021-11-25 16:27:40.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFABAGACAHAEAAA',1,NULL,'2021-11-26 10:48:43.915269',NULL,NULL,255,255.0,4,6),(334,'5','2021-11-25 16:27:41.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAFABAGACAHAEABA',1,NULL,'2021-11-26 10:48:43.978649',NULL,NULL,255,255.0,5,6),(335,'1','2021-11-26 07:05:48.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGAAAHAAAFAEAIA',1,NULL,'2021-11-26 10:48:44.253629',NULL,NULL,255,255.0,1,6),(336,'1','2021-11-26 07:05:54.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGAAAHAAAFAFAEA',1,NULL,'2021-11-26 10:48:44.397566',NULL,NULL,255,255.0,1,6),(337,'2','2021-11-26 07:05:57.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGAAAHAAAFAFAHA',1,NULL,'2021-11-26 10:48:44.449365',NULL,NULL,255,255.0,2,6),(338,'3','2021-11-26 07:05:58.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGAAAHAAAFAFAIA',1,NULL,'2021-11-26 10:48:44.489082',NULL,NULL,255,255.0,3,6),(339,'4','2021-11-26 07:06:03.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGAAAHAAAGAAADA',1,NULL,'2021-11-26 10:48:44.540920',NULL,NULL,255,255.0,4,6),(340,'5','2021-11-26 07:06:05.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGAAAHAAAGAAAFA',1,NULL,'2021-11-26 10:48:44.614529',NULL,NULL,255,255.0,5,6),(341,'6','2021-11-26 07:06:08.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGAAAHAAAGAAAIA',1,NULL,'2021-11-26 10:48:44.659359',NULL,NULL,255,255.0,6,6),(342,'7','2021-11-26 07:06:10.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGAAAHAAAGABAAA',1,NULL,'2021-11-26 10:48:44.716033',NULL,NULL,255,255.0,7,6),(343,'8','2021-11-26 07:06:12.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGAAAHAAAGABACA',1,NULL,'2021-11-26 10:48:44.759622',NULL,NULL,255,255.0,8,6),(344,'9','2021-11-26 07:06:14.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGAAAHAAAGABAEA',1,NULL,'2021-11-26 10:48:44.804162',NULL,NULL,255,255.0,9,6),(345,'20','2021-11-26 07:06:17.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGAAAHAAAGABAHA',1,NULL,'2021-11-26 10:48:44.845164',NULL,NULL,255,255.0,11,6),(346,'2','2021-11-26 18:09:42.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGABAIAAAJAEACA',1,NULL,'2021-11-29 07:53:19.009228',NULL,NULL,255,255.0,2,6),(347,'1','2021-11-26 18:09:45.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGABAIAAAJAEAFA',1,NULL,'2021-11-29 07:53:36.352002',NULL,NULL,255,255.0,1,6),(348,'3','2021-11-26 18:09:47.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGABAIAAAJAEAHA',1,NULL,'2021-11-29 07:53:36.551575',NULL,NULL,255,255.0,3,6),(349,'4','2021-11-26 18:09:49.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGABAIAAAJAEAJA',1,NULL,'2021-11-29 07:53:36.626581',NULL,NULL,255,255.0,4,6),(350,'5','2021-11-26 18:09:56.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGABAIAAAJAFAGA',1,NULL,'2021-11-29 07:53:36.714015',NULL,NULL,255,255.0,5,6),(351,'6','2021-11-26 18:09:59.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGABAIAAAJAFAJA',1,NULL,'2021-11-29 07:53:36.778853',NULL,NULL,255,255.0,6,6),(352,'7','2021-11-26 18:10:01.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGABAIABAAAAABA',1,NULL,'2021-11-29 07:53:36.850397',NULL,NULL,255,255.0,7,6),(353,'8','2021-11-26 18:10:03.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGABAIABAAAAADA',1,NULL,'2021-11-29 07:53:36.936581',NULL,NULL,255,255.0,8,6),(354,'9','2021-11-26 18:10:05.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGABAIABAAAAAFA',1,NULL,'2021-11-29 07:53:37.087604',NULL,NULL,255,255.0,9,6),(355,'20','2021-11-26 18:10:07.000000','1',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAGABAIABAAAAAHA',1,NULL,'2021-11-29 07:53:37.506144',NULL,NULL,255,255.0,11,6),(356,'2','2021-11-29 06:59:59.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAJAAAGAFAJAFAJA',1,NULL,'2021-11-29 07:53:37.791463',NULL,NULL,255,255.0,2,6),(357,'1','2021-11-29 07:00:02.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAJAAAHAAAAAAACA',1,NULL,'2021-11-29 07:53:38.293815',NULL,NULL,255,255.0,1,6),(358,'3','2021-11-29 07:00:04.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAJAAAHAAAAAAAEA',1,NULL,'2021-11-29 07:53:38.428827',NULL,NULL,255,255.0,3,6),(359,'4','2021-11-29 07:00:06.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAJAAAHAAAAAAAGA',1,NULL,'2021-11-29 07:53:38.534834',NULL,NULL,255,255.0,4,6),(360,'5','2021-11-29 07:00:09.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAJAAAHAAAAAAAJA',1,NULL,'2021-11-29 07:53:38.675894',NULL,NULL,255,255.0,5,6),(361,'6','2021-11-29 07:00:11.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAJAAAHAAAAABABA',1,NULL,'2021-11-29 07:53:38.980377',NULL,NULL,255,255.0,6,6),(362,'7','2021-11-29 07:00:13.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAJAAAHAAAAABADA',1,NULL,'2021-11-29 07:53:39.214777',NULL,NULL,255,255.0,7,6),(363,'8','2021-11-29 07:00:16.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAJAAAHAAAAABAGA',1,NULL,'2021-11-29 07:53:39.382512',NULL,NULL,255,255.0,8,6),(364,'9','2021-11-29 07:00:18.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAJAAAHAAAAABAIA',1,NULL,'2021-11-29 07:53:39.528735',NULL,NULL,255,255.0,9,6),(365,'20','2021-11-29 07:00:21.000000','0',1,'','BOCK191760589','BCGI','Pasig City',NULL,NULL,NULL,'1',1,9,'CAAACABABABACAJAAAHAAAAACABA',1,NULL,'2021-11-29 07:53:39.613875',NULL,NULL,255,255.0,11,6);
/*!40000 ALTER TABLE `iclock_transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `erpdb_biotime`.`iclock_transaction_AFTER_INSERT` AFTER INSERT ON `iclock_transaction` FOR EACH ROW
BEGIN
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
            
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `iclock_transactionproofcmd`
--

DROP TABLE IF EXISTS `iclock_transactionproofcmd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iclock_transactionproofcmd` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `terminal_count` int(11) DEFAULT NULL,
  `server_count` int(11) DEFAULT NULL,
  `flag` smallint(6) DEFAULT NULL,
  `reserved_init` int(11) DEFAULT NULL,
  `reserved_float` double DEFAULT NULL,
  `reserved_char` varchar(30) DEFAULT NULL,
  `terminal_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `iclock_transactionpr_terminal_id_08b81e1e_fk_iclock_te` (`terminal_id`),
  CONSTRAINT `iclock_transactionpr_terminal_id_08b81e1e_fk_iclock_te` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iclock_transactionproofcmd`
--

LOCK TABLES `iclock_transactionproofcmd` WRITE;
/*!40000 ALTER TABLE `iclock_transactionproofcmd` DISABLE KEYS */;
/*!40000 ALTER TABLE `iclock_transactionproofcmd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meeting_meetingentity`
--

DROP TABLE IF EXISTS `meeting_meetingentity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `virutal_uuid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`workflowinstance_ptr_id`),
  UNIQUE KEY `code` (`code`),
  KEY `meeting_meetingentity_room_id_bc2c738e_fk_meeting_meetingroom_id` (`room_id`),
  CONSTRAINT `meeting_meetingentit_workflowinstance_ptr_dbd9ab40_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`),
  CONSTRAINT `meeting_meetingentity_room_id_bc2c738e_fk_meeting_meetingroom_id` FOREIGN KEY (`room_id`) REFERENCES `meeting_meetingroom` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting_meetingentity`
--

LOCK TABLES `meeting_meetingentity` WRITE;
/*!40000 ALTER TABLE `meeting_meetingentity` DISABLE KEYS */;
/*!40000 ALTER TABLE `meeting_meetingentity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meeting_meetingentity_attender`
--

DROP TABLE IF EXISTS `meeting_meetingentity_attender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meeting_meetingentity_attender` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `meetingentity_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `meeting_meetingentity_at_meetingentity_id_employe_b556fc2d_uniq` (`meetingentity_id`,`employee_id`),
  KEY `meeting_meetingentit_employee_id_ee898064_fk_personnel` (`employee_id`),
  CONSTRAINT `meeting_meetingentit_employee_id_ee898064_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `meeting_meetingentit_meetingentity_id_b96dbc7d_fk_meeting_m` FOREIGN KEY (`meetingentity_id`) REFERENCES `meeting_meetingentity` (`workflowinstance_ptr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting_meetingentity_attender`
--

LOCK TABLES `meeting_meetingentity_attender` WRITE;
/*!40000 ALTER TABLE `meeting_meetingentity_attender` DISABLE KEYS */;
/*!40000 ALTER TABLE `meeting_meetingentity_attender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meeting_meetingmanuallog`
--

DROP TABLE IF EXISTS `meeting_meetingmanuallog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meeting_meetingmanuallog` (
  `workflowinstance_ptr_id` int(11) NOT NULL,
  `punch_time` datetime(6) NOT NULL,
  `punch_state` varchar(5) NOT NULL,
  `apply_reason` varchar(200) NOT NULL,
  `apply_time` datetime(6) NOT NULL,
  `meeting_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`workflowinstance_ptr_id`),
  KEY `meeting_meetingmanua_meeting_id_a672eaaf_fk_meeting_m` (`meeting_id`),
  CONSTRAINT `meeting_meetingmanua_meeting_id_a672eaaf_fk_meeting_m` FOREIGN KEY (`meeting_id`) REFERENCES `meeting_meetingentity` (`workflowinstance_ptr_id`),
  CONSTRAINT `meeting_meetingmanua_workflowinstance_ptr_bd514862_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting_meetingmanuallog`
--

LOCK TABLES `meeting_meetingmanuallog` WRITE;
/*!40000 ALTER TABLE `meeting_meetingmanuallog` DISABLE KEYS */;
/*!40000 ALTER TABLE `meeting_meetingmanuallog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meeting_meetingpayloadbase`
--

DROP TABLE IF EXISTS `meeting_meetingpayloadbase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `meeting_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `meeting_meetingpaylo_emp_id_ed6ec148_fk_personnel` (`emp_id`),
  KEY `meeting_meetingpaylo_meeting_id_ca9d20cc_fk_meeting_m` (`meeting_id`),
  CONSTRAINT `meeting_meetingpaylo_emp_id_ed6ec148_fk_personnel` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `meeting_meetingpaylo_meeting_id_ca9d20cc_fk_meeting_m` FOREIGN KEY (`meeting_id`) REFERENCES `meeting_meetingentity` (`workflowinstance_ptr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting_meetingpayloadbase`
--

LOCK TABLES `meeting_meetingpayloadbase` WRITE;
/*!40000 ALTER TABLE `meeting_meetingpayloadbase` DISABLE KEYS */;
/*!40000 ALTER TABLE `meeting_meetingpayloadbase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meeting_meetingroom`
--

DROP TABLE IF EXISTS `meeting_meetingroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meeting_meetingroom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `enable_room` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting_meetingroom`
--

LOCK TABLES `meeting_meetingroom` WRITE;
/*!40000 ALTER TABLE `meeting_meetingroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `meeting_meetingroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meeting_meetingroomdevice`
--

DROP TABLE IF EXISTS `meeting_meetingroomdevice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meeting_meetingroomdevice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `device_id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `device_id` (`device_id`),
  KEY `meeting_meetingroomd_room_id_e000d78d_fk_meeting_m` (`room_id`),
  CONSTRAINT `meeting_meetingroomd_device_id_a09e8a7d_fk_iclock_te` FOREIGN KEY (`device_id`) REFERENCES `iclock_terminal` (`id`),
  CONSTRAINT `meeting_meetingroomd_room_id_e000d78d_fk_meeting_m` FOREIGN KEY (`room_id`) REFERENCES `meeting_meetingroom` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting_meetingroomdevice`
--

LOCK TABLES `meeting_meetingroomdevice` WRITE;
/*!40000 ALTER TABLE `meeting_meetingroomdevice` DISABLE KEYS */;
/*!40000 ALTER TABLE `meeting_meetingroomdevice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meeting_meetingtransaction`
--

DROP TABLE IF EXISTS `meeting_meetingtransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meeting_meetingtransaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_code` varchar(50) NOT NULL,
  `punch_datetime` datetime(6) NOT NULL,
  `punch_date` date NOT NULL,
  `punch_time` time(6) NOT NULL,
  `punch_state` varchar(5) NOT NULL,
  `source` smallint(6) NOT NULL,
  `upload_time` datetime(6) NOT NULL,
  `emp_id` int(11) DEFAULT NULL,
  `meeting_id` int(11) DEFAULT NULL,
  `terminal_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `meeting_meetingtransaction_emp_id_punch_datetime_65665dce_uniq` (`emp_id`,`punch_datetime`),
  KEY `meeting_meetingtrans_meeting_id_e4e505e5_fk_meeting_m` (`meeting_id`),
  KEY `meeting_meetingtrans_terminal_id_047426f2_fk_iclock_te` (`terminal_id`),
  CONSTRAINT `meeting_meetingtrans_emp_id_fbcdd686_fk_personnel` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `meeting_meetingtrans_meeting_id_e4e505e5_fk_meeting_m` FOREIGN KEY (`meeting_id`) REFERENCES `meeting_meetingentity` (`workflowinstance_ptr_id`),
  CONSTRAINT `meeting_meetingtrans_terminal_id_047426f2_fk_iclock_te` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting_meetingtransaction`
--

LOCK TABLES `meeting_meetingtransaction` WRITE;
/*!40000 ALTER TABLE `meeting_meetingtransaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `meeting_meetingtransaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobile_announcement`
--

DROP TABLE IF EXISTS `mobile_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mobile_announcement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(100) NOT NULL,
  `content` longtext NOT NULL,
  `category` smallint(6) NOT NULL,
  `sender` varchar(50) DEFAULT NULL,
  `system_sender` varchar(50) DEFAULT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `init_sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mobile_announcement_admin_id_6af3868c_fk_auth_user_id` (`admin_id`),
  KEY `mobile_announcement_init_sender_id_2f5e35bd_fk_personnel` (`init_sender_id`),
  KEY `mobile_announcement_receiver_id_ddf2a860_fk_personnel` (`receiver_id`),
  CONSTRAINT `mobile_announcement_admin_id_6af3868c_fk_auth_user_id` FOREIGN KEY (`admin_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `mobile_announcement_init_sender_id_2f5e35bd_fk_personnel` FOREIGN KEY (`init_sender_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `mobile_announcement_receiver_id_ddf2a860_fk_personnel` FOREIGN KEY (`receiver_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobile_announcement`
--

LOCK TABLES `mobile_announcement` WRITE;
/*!40000 ALTER TABLE `mobile_announcement` DISABLE KEYS */;
/*!40000 ALTER TABLE `mobile_announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobile_appactionlog`
--

DROP TABLE IF EXISTS `mobile_appactionlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mobile_appactionlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(20) NOT NULL,
  `client` varchar(50) DEFAULT NULL,
  `action` varchar(50) DEFAULT NULL,
  `params` longtext DEFAULT NULL,
  `describe` longtext DEFAULT NULL,
  `request_status` smallint(6) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `remote_ip` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobile_appactionlog`
--

LOCK TABLES `mobile_appactionlog` WRITE;
/*!40000 ALTER TABLE `mobile_appactionlog` DISABLE KEYS */;
/*!40000 ALTER TABLE `mobile_appactionlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobile_applist`
--

DROP TABLE IF EXISTS `mobile_applist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mobile_applist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `login_time` datetime(6) NOT NULL,
  `last_active` datetime(6) NOT NULL,
  `token` longtext NOT NULL,
  `device_token` longtext NOT NULL,
  `client_id` varchar(100) NOT NULL,
  `client_category` smallint(6) NOT NULL,
  `active` smallint(6) DEFAULT NULL,
  `enable` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobile_applist`
--

LOCK TABLES `mobile_applist` WRITE;
/*!40000 ALTER TABLE `mobile_applist` DISABLE KEYS */;
/*!40000 ALTER TABLE `mobile_applist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobile_appnotification`
--

DROP TABLE IF EXISTS `mobile_appnotification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mobile_appnotification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `receiver_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mobile_appnotification_admin_id_29c27197_fk_auth_user_id` (`admin_id`),
  KEY `mobile_appnotificati_init_sender_id_d8aff845_fk_personnel` (`init_sender_id`),
  KEY `mobile_appnotificati_receiver_id_90c4a355_fk_personnel` (`receiver_id`),
  CONSTRAINT `mobile_appnotificati_init_sender_id_d8aff845_fk_personnel` FOREIGN KEY (`init_sender_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `mobile_appnotificati_receiver_id_90c4a355_fk_personnel` FOREIGN KEY (`receiver_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `mobile_appnotification_admin_id_29c27197_fk_auth_user_id` FOREIGN KEY (`admin_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobile_appnotification`
--

LOCK TABLES `mobile_appnotification` WRITE;
/*!40000 ALTER TABLE `mobile_appnotification` DISABLE KEYS */;
/*!40000 ALTER TABLE `mobile_appnotification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobile_gpsfordepartment`
--

DROP TABLE IF EXISTS `mobile_gpsfordepartment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mobile_gpsfordepartment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `distance` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `department_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mobile_gpsfordepartm_department_id_988ccf22_fk_personnel` (`department_id`),
  CONSTRAINT `mobile_gpsfordepartm_department_id_988ccf22_fk_personnel` FOREIGN KEY (`department_id`) REFERENCES `personnel_department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobile_gpsfordepartment`
--

LOCK TABLES `mobile_gpsfordepartment` WRITE;
/*!40000 ALTER TABLE `mobile_gpsfordepartment` DISABLE KEYS */;
/*!40000 ALTER TABLE `mobile_gpsfordepartment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobile_gpsfordepartment_location`
--

DROP TABLE IF EXISTS `mobile_gpsfordepartment_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mobile_gpsfordepartment_location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gpsfordepartment_id` int(11) NOT NULL,
  `gpslocation_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile_gpsfordepartment__gpsfordepartment_id_gpsl_58226033_uniq` (`gpsfordepartment_id`,`gpslocation_id`),
  KEY `mobile_gpsfordepartm_gpslocation_id_48b82e9e_fk_mobile_gp` (`gpslocation_id`),
  CONSTRAINT `mobile_gpsfordepartm_gpsfordepartment_id_23e9af3a_fk_mobile_gp` FOREIGN KEY (`gpsfordepartment_id`) REFERENCES `mobile_gpsfordepartment` (`id`),
  CONSTRAINT `mobile_gpsfordepartm_gpslocation_id_48b82e9e_fk_mobile_gp` FOREIGN KEY (`gpslocation_id`) REFERENCES `mobile_gpslocation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobile_gpsfordepartment_location`
--

LOCK TABLES `mobile_gpsfordepartment_location` WRITE;
/*!40000 ALTER TABLE `mobile_gpsfordepartment_location` DISABLE KEYS */;
/*!40000 ALTER TABLE `mobile_gpsfordepartment_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobile_gpsforemployee`
--

DROP TABLE IF EXISTS `mobile_gpsforemployee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mobile_gpsforemployee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `distance` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mobile_gpsforemploye_employee_id_982b7cef_fk_personnel` (`employee_id`),
  CONSTRAINT `mobile_gpsforemploye_employee_id_982b7cef_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobile_gpsforemployee`
--

LOCK TABLES `mobile_gpsforemployee` WRITE;
/*!40000 ALTER TABLE `mobile_gpsforemployee` DISABLE KEYS */;
/*!40000 ALTER TABLE `mobile_gpsforemployee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobile_gpsforemployee_location`
--

DROP TABLE IF EXISTS `mobile_gpsforemployee_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mobile_gpsforemployee_location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gpsforemployee_id` int(11) NOT NULL,
  `gpslocation_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile_gpsforemployee_lo_gpsforemployee_id_gpsloc_9ceb93bf_uniq` (`gpsforemployee_id`,`gpslocation_id`),
  KEY `mobile_gpsforemploye_gpslocation_id_497a214f_fk_mobile_gp` (`gpslocation_id`),
  CONSTRAINT `mobile_gpsforemploye_gpsforemployee_id_a52023d5_fk_mobile_gp` FOREIGN KEY (`gpsforemployee_id`) REFERENCES `mobile_gpsforemployee` (`id`),
  CONSTRAINT `mobile_gpsforemploye_gpslocation_id_497a214f_fk_mobile_gp` FOREIGN KEY (`gpslocation_id`) REFERENCES `mobile_gpslocation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobile_gpsforemployee_location`
--

LOCK TABLES `mobile_gpsforemployee_location` WRITE;
/*!40000 ALTER TABLE `mobile_gpsforemployee_location` DISABLE KEYS */;
/*!40000 ALTER TABLE `mobile_gpsforemployee_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobile_gpslocation`
--

DROP TABLE IF EXISTS `mobile_gpslocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mobile_gpslocation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `alias` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `longitude` double NOT NULL,
  `latitude` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobile_gpslocation`
--

LOCK TABLES `mobile_gpslocation` WRITE;
/*!40000 ALTER TABLE `mobile_gpslocation` DISABLE KEYS */;
/*!40000 ALTER TABLE `mobile_gpslocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobile_mobileapirequestlog`
--

DROP TABLE IF EXISTS `mobile_mobileapirequestlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mobile_mobileapirequestlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username_persistent` varchar(200) DEFAULT NULL,
  `requested_at` datetime(6) NOT NULL,
  `response_ms` int(10) unsigned NOT NULL,
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
  `status_code` int(10) unsigned DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mobile_mobileapirequ_user_id_dfd3ded1_fk_personnel` (`user_id`),
  KEY `mobile_mobileapirequestlog_requested_at_a8c85067` (`requested_at`),
  KEY `mobile_mobileapirequestlog_path_830043b5` (`path`),
  KEY `mobile_mobileapirequestlog_view_50dbf600` (`view`),
  KEY `mobile_mobileapirequestlog_view_method_2e13cf95` (`view_method`),
  KEY `mobile_mobileapirequestlog_status_code_c2de0c48` (`status_code`),
  CONSTRAINT `mobile_mobileapirequ_user_id_dfd3ded1_fk_personnel` FOREIGN KEY (`user_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobile_mobileapirequestlog`
--

LOCK TABLES `mobile_mobileapirequestlog` WRITE;
/*!40000 ALTER TABLE `mobile_mobileapirequestlog` DISABLE KEYS */;
/*!40000 ALTER TABLE `mobile_mobileapirequestlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_deductionformula`
--

DROP TABLE IF EXISTS `payroll_deductionformula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_deductionformula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `formula` varchar(100) NOT NULL,
  `remark` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_deductionformula`
--

LOCK TABLES `payroll_deductionformula` WRITE;
/*!40000 ALTER TABLE `payroll_deductionformula` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_deductionformula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_emploan`
--

DROP TABLE IF EXISTS `payroll_emploan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_emploan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payroll_emploan_employee_id_97a251ef_fk_personnel_employee_id` (`employee_id`),
  CONSTRAINT `payroll_emploan_employee_id_97a251ef_fk_personnel_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_emploan`
--

LOCK TABLES `payroll_emploan` WRITE;
/*!40000 ALTER TABLE `payroll_emploan` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_emploan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_emppayrollprofile`
--

DROP TABLE IF EXISTS `payroll_emppayrollprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_emppayrollprofile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_mode` smallint(6) DEFAULT NULL,
  `payment_type` smallint(6) DEFAULT NULL,
  `bank_name` varchar(30) DEFAULT NULL,
  `bank_account` varchar(30) DEFAULT NULL,
  `personnel_id` varchar(30) DEFAULT NULL,
  `agent_id` varchar(30) DEFAULT NULL,
  `agent_account` varchar(30) DEFAULT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_id` (`employee_id`),
  CONSTRAINT `payroll_emppayrollpr_employee_id_6c97078c_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_emppayrollprofile`
--

LOCK TABLES `payroll_emppayrollprofile` WRITE;
/*!40000 ALTER TABLE `payroll_emppayrollprofile` DISABLE KEYS */;
INSERT INTO `payroll_emppayrollprofile` VALUES (1,1,1,'','','','','',1),(2,1,1,'','','','','',10),(3,1,1,'','','','','',2),(4,1,1,'','','','','',11),(5,1,1,'','','','','',12),(6,1,1,'','','','','',13),(7,1,1,'','','','','',14),(8,1,1,'','','','','',15),(9,1,1,'','','','','',16),(10,1,1,'','','','','',17),(11,1,1,'','','','','',18),(12,1,1,'','','','','',19),(13,1,1,'','','','','',3),(14,1,1,'','','','','',20),(15,1,1,'','','','','',4),(16,1,1,'','','','','',5),(17,1,1,'','','','','',6),(18,1,1,'','','','','',7),(19,1,1,'','','','','',8),(20,1,1,'','','','','',9);
/*!40000 ALTER TABLE `payroll_emppayrollprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_exceptionformula`
--

DROP TABLE IF EXISTS `payroll_exceptionformula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_exceptionformula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `formula` varchar(100) NOT NULL,
  `remark` longtext DEFAULT NULL,
  `pay_code_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `payroll_exceptionformula_pay_code_id_97609b51_fk_att_paycode_id` (`pay_code_id`),
  CONSTRAINT `payroll_exceptionformula_pay_code_id_97609b51_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_exceptionformula`
--

LOCK TABLES `payroll_exceptionformula` WRITE;
/*!40000 ALTER TABLE `payroll_exceptionformula` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_exceptionformula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_extradeduction`
--

DROP TABLE IF EXISTS `payroll_extradeduction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_extradeduction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `amount` double NOT NULL,
  `issued_time` datetime(6) NOT NULL,
  `remark` varchar(300) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payroll_extradeducti_employee_id_53072441_fk_personnel` (`employee_id`),
  CONSTRAINT `payroll_extradeducti_employee_id_53072441_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_extradeduction`
--

LOCK TABLES `payroll_extradeduction` WRITE;
/*!40000 ALTER TABLE `payroll_extradeduction` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_extradeduction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_extraincrease`
--

DROP TABLE IF EXISTS `payroll_extraincrease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_extraincrease` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `amount` double NOT NULL,
  `issued_time` datetime(6) NOT NULL,
  `remark` varchar(300) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payroll_extraincreas_employee_id_f902e6bb_fk_personnel` (`employee_id`),
  CONSTRAINT `payroll_extraincreas_employee_id_f902e6bb_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_extraincrease`
--

LOCK TABLES `payroll_extraincrease` WRITE;
/*!40000 ALTER TABLE `payroll_extraincrease` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_extraincrease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_increasementformula`
--

DROP TABLE IF EXISTS `payroll_increasementformula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_increasementformula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `formula` varchar(100) NOT NULL,
  `remark` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_increasementformula`
--

LOCK TABLES `payroll_increasementformula` WRITE;
/*!40000 ALTER TABLE `payroll_increasementformula` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_increasementformula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_leaveformula`
--

DROP TABLE IF EXISTS `payroll_leaveformula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_leaveformula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `formula` varchar(100) NOT NULL,
  `remark` longtext DEFAULT NULL,
  `pay_code_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `payroll_leaveformula_pay_code_id_63c7b4bd_fk_att_paycode_id` (`pay_code_id`),
  CONSTRAINT `payroll_leaveformula_pay_code_id_63c7b4bd_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_leaveformula`
--

LOCK TABLES `payroll_leaveformula` WRITE;
/*!40000 ALTER TABLE `payroll_leaveformula` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_leaveformula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_overtimeformula`
--

DROP TABLE IF EXISTS `payroll_overtimeformula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_overtimeformula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `formula` varchar(100) NOT NULL,
  `remark` longtext DEFAULT NULL,
  `pay_code_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `payroll_overtimeformula_pay_code_id_36d2f10e_fk_att_paycode_id` (`pay_code_id`),
  CONSTRAINT `payroll_overtimeformula_pay_code_id_36d2f10e_fk_att_paycode_id` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_overtimeformula`
--

LOCK TABLES `payroll_overtimeformula` WRITE;
/*!40000 ALTER TABLE `payroll_overtimeformula` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_overtimeformula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_payrollpayload`
--

DROP TABLE IF EXISTS `payroll_payrollpayload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_payrollpayload` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payroll_payrollpaylo_employee_id_bc868f2b_fk_personnel` (`employee_id`),
  CONSTRAINT `payroll_payrollpaylo_employee_id_bc868f2b_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_payrollpayload`
--

LOCK TABLES `payroll_payrollpayload` WRITE;
/*!40000 ALTER TABLE `payroll_payrollpayload` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_payrollpayload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_payrollpayloadpaycode`
--

DROP TABLE IF EXISTS `payroll_payrollpayloadpaycode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_payrollpayloadpaycode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` double DEFAULT NULL,
  `formula` longtext DEFAULT NULL,
  `formula_name` longtext DEFAULT NULL,
  `pay_code_id` int(11) NOT NULL,
  `payload_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payroll_payrollpaylo_pay_code_id_c057af1f_fk_att_payco` (`pay_code_id`),
  KEY `payroll_payrollpaylo_payload_id_f085c4e8_fk_payroll_p` (`payload_id`),
  CONSTRAINT `payroll_payrollpaylo_pay_code_id_c057af1f_fk_att_payco` FOREIGN KEY (`pay_code_id`) REFERENCES `att_paycode` (`id`),
  CONSTRAINT `payroll_payrollpaylo_payload_id_f085c4e8_fk_payroll_p` FOREIGN KEY (`payload_id`) REFERENCES `payroll_payrollpayload` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_payrollpayloadpaycode`
--

LOCK TABLES `payroll_payrollpayloadpaycode` WRITE;
/*!40000 ALTER TABLE `payroll_payrollpayloadpaycode` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_payrollpayloadpaycode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_reimbursement`
--

DROP TABLE IF EXISTS `payroll_reimbursement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_reimbursement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rmb_amount` double NOT NULL,
  `rmb_time` datetime(6) NOT NULL,
  `rmb_file` varchar(200) DEFAULT NULL,
  `rmb_remark` varchar(300) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payroll_reimbursemen_employee_id_c4bbde36_fk_personnel` (`employee_id`),
  CONSTRAINT `payroll_reimbursemen_employee_id_c4bbde36_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_reimbursement`
--

LOCK TABLES `payroll_reimbursement` WRITE;
/*!40000 ALTER TABLE `payroll_reimbursement` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_reimbursement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_salaryadvance`
--

DROP TABLE IF EXISTS `payroll_salaryadvance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_salaryadvance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `advance_amount` double NOT NULL,
  `advance_time` datetime(6) NOT NULL,
  `advance_remark` varchar(300) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payroll_salaryadvanc_employee_id_2abd43e5_fk_personnel` (`employee_id`),
  CONSTRAINT `payroll_salaryadvanc_employee_id_2abd43e5_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_salaryadvance`
--

LOCK TABLES `payroll_salaryadvance` WRITE;
/*!40000 ALTER TABLE `payroll_salaryadvance` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_salaryadvance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_salarystructure`
--

DROP TABLE IF EXISTS `payroll_salarystructure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_salarystructure` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `salary_amount` double NOT NULL,
  `effective_date` date NOT NULL,
  `salary_remark` varchar(300) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payroll_salarystruct_employee_id_98996e15_fk_personnel` (`employee_id`),
  CONSTRAINT `payroll_salarystruct_employee_id_98996e15_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_salarystructure`
--

LOCK TABLES `payroll_salarystructure` WRITE;
/*!40000 ALTER TABLE `payroll_salarystructure` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_salarystructure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_salarystructure_deductionformula`
--

DROP TABLE IF EXISTS `payroll_salarystructure_deductionformula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_salarystructure_deductionformula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `salarystructure_id` int(11) NOT NULL,
  `deductionformula_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payroll_salarystructure__salarystructure_id_deduc_794e8449_uniq` (`salarystructure_id`,`deductionformula_id`),
  KEY `payroll_salarystruct_deductionformula_id_b174d5b6_fk_payroll_d` (`deductionformula_id`),
  CONSTRAINT `payroll_salarystruct_deductionformula_id_b174d5b6_fk_payroll_d` FOREIGN KEY (`deductionformula_id`) REFERENCES `payroll_deductionformula` (`id`),
  CONSTRAINT `payroll_salarystruct_salarystructure_id_5ca7cdb5_fk_payroll_s` FOREIGN KEY (`salarystructure_id`) REFERENCES `payroll_salarystructure` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_salarystructure_deductionformula`
--

LOCK TABLES `payroll_salarystructure_deductionformula` WRITE;
/*!40000 ALTER TABLE `payroll_salarystructure_deductionformula` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_salarystructure_deductionformula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_salarystructure_exceptionformula`
--

DROP TABLE IF EXISTS `payroll_salarystructure_exceptionformula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_salarystructure_exceptionformula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `salarystructure_id` int(11) NOT NULL,
  `exceptionformula_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payroll_salarystructure__salarystructure_id_excep_a5e869ff_uniq` (`salarystructure_id`,`exceptionformula_id`),
  KEY `payroll_salarystruct_exceptionformula_id_8f6dadb3_fk_payroll_e` (`exceptionformula_id`),
  CONSTRAINT `payroll_salarystruct_exceptionformula_id_8f6dadb3_fk_payroll_e` FOREIGN KEY (`exceptionformula_id`) REFERENCES `payroll_exceptionformula` (`id`),
  CONSTRAINT `payroll_salarystruct_salarystructure_id_3c087208_fk_payroll_s` FOREIGN KEY (`salarystructure_id`) REFERENCES `payroll_salarystructure` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_salarystructure_exceptionformula`
--

LOCK TABLES `payroll_salarystructure_exceptionformula` WRITE;
/*!40000 ALTER TABLE `payroll_salarystructure_exceptionformula` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_salarystructure_exceptionformula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_salarystructure_increasementformula`
--

DROP TABLE IF EXISTS `payroll_salarystructure_increasementformula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_salarystructure_increasementformula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `salarystructure_id` int(11) NOT NULL,
  `increasementformula_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payroll_salarystructure__salarystructure_id_incre_749132b3_uniq` (`salarystructure_id`,`increasementformula_id`),
  KEY `payroll_salarystruct_increasementformula__3cd77082_fk_payroll_i` (`increasementformula_id`),
  CONSTRAINT `payroll_salarystruct_increasementformula__3cd77082_fk_payroll_i` FOREIGN KEY (`increasementformula_id`) REFERENCES `payroll_increasementformula` (`id`),
  CONSTRAINT `payroll_salarystruct_salarystructure_id_8752401c_fk_payroll_s` FOREIGN KEY (`salarystructure_id`) REFERENCES `payroll_salarystructure` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_salarystructure_increasementformula`
--

LOCK TABLES `payroll_salarystructure_increasementformula` WRITE;
/*!40000 ALTER TABLE `payroll_salarystructure_increasementformula` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_salarystructure_increasementformula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_salarystructure_leaveformula`
--

DROP TABLE IF EXISTS `payroll_salarystructure_leaveformula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_salarystructure_leaveformula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `salarystructure_id` int(11) NOT NULL,
  `leaveformula_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payroll_salarystructure__salarystructure_id_leave_4efdce30_uniq` (`salarystructure_id`,`leaveformula_id`),
  KEY `payroll_salarystruct_leaveformula_id_049f9024_fk_payroll_l` (`leaveformula_id`),
  CONSTRAINT `payroll_salarystruct_leaveformula_id_049f9024_fk_payroll_l` FOREIGN KEY (`leaveformula_id`) REFERENCES `payroll_leaveformula` (`id`),
  CONSTRAINT `payroll_salarystruct_salarystructure_id_cf98fdd7_fk_payroll_s` FOREIGN KEY (`salarystructure_id`) REFERENCES `payroll_salarystructure` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_salarystructure_leaveformula`
--

LOCK TABLES `payroll_salarystructure_leaveformula` WRITE;
/*!40000 ALTER TABLE `payroll_salarystructure_leaveformula` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_salarystructure_leaveformula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_salarystructure_overtimeformula`
--

DROP TABLE IF EXISTS `payroll_salarystructure_overtimeformula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payroll_salarystructure_overtimeformula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `salarystructure_id` int(11) NOT NULL,
  `overtimeformula_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `payroll_salarystructure__salarystructure_id_overt_0d0a0e81_uniq` (`salarystructure_id`,`overtimeformula_id`),
  KEY `payroll_salarystruct_overtimeformula_id_40ad89ef_fk_payroll_o` (`overtimeformula_id`),
  CONSTRAINT `payroll_salarystruct_overtimeformula_id_40ad89ef_fk_payroll_o` FOREIGN KEY (`overtimeformula_id`) REFERENCES `payroll_overtimeformula` (`id`),
  CONSTRAINT `payroll_salarystruct_salarystructure_id_64f75042_fk_payroll_s` FOREIGN KEY (`salarystructure_id`) REFERENCES `payroll_salarystructure` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_salarystructure_overtimeformula`
--

LOCK TABLES `payroll_salarystructure_overtimeformula` WRITE;
/*!40000 ALTER TABLE `payroll_salarystructure_overtimeformula` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroll_salarystructure_overtimeformula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personnel_area`
--

DROP TABLE IF EXISTS `personnel_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personnel_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `area_code` varchar(30) NOT NULL,
  `area_name` varchar(30) NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `parent_area_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `area_code` (`area_code`),
  KEY `personnel_area_parent_area_id_39028fda_fk_personnel_area_id` (`parent_area_id`),
  CONSTRAINT `personnel_area_parent_area_id_39028fda_fk_personnel_area_id` FOREIGN KEY (`parent_area_id`) REFERENCES `personnel_area` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personnel_area`
--

LOCK TABLES `personnel_area` WRITE;
/*!40000 ALTER TABLE `personnel_area` DISABLE KEYS */;
INSERT INTO `personnel_area` VALUES (1,'1','Not Authorized',1,NULL),(2,'2','Pasig City',0,NULL);
/*!40000 ALTER TABLE `personnel_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personnel_assignareaemployee`
--

DROP TABLE IF EXISTS `personnel_assignareaemployee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personnel_assignareaemployee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `assigned_time` datetime(6) NOT NULL,
  `area_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `personnel_assignarea_area_id_6f049d6a_fk_personnel` (`area_id`),
  KEY `personnel_assignarea_employee_id_a3d4dd25_fk_personnel` (`employee_id`),
  CONSTRAINT `personnel_assignarea_area_id_6f049d6a_fk_personnel` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`),
  CONSTRAINT `personnel_assignarea_employee_id_a3d4dd25_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personnel_assignareaemployee`
--

LOCK TABLES `personnel_assignareaemployee` WRITE;
/*!40000 ALTER TABLE `personnel_assignareaemployee` DISABLE KEYS */;
/*!40000 ALTER TABLE `personnel_assignareaemployee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personnel_certification`
--

DROP TABLE IF EXISTS `personnel_certification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personnel_certification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cert_code` varchar(20) NOT NULL,
  `cert_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cert_code` (`cert_code`),
  UNIQUE KEY `cert_name` (`cert_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personnel_certification`
--

LOCK TABLES `personnel_certification` WRITE;
/*!40000 ALTER TABLE `personnel_certification` DISABLE KEYS */;
/*!40000 ALTER TABLE `personnel_certification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personnel_department`
--

DROP TABLE IF EXISTS `personnel_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personnel_department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dept_code` varchar(50) NOT NULL,
  `dept_name` varchar(100) NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `parent_dept_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dept_code` (`dept_code`),
  KEY `personnel_department_parent_dept_id_d0b44024_fk_personnel` (`parent_dept_id`),
  CONSTRAINT `personnel_department_parent_dept_id_d0b44024_fk_personnel` FOREIGN KEY (`parent_dept_id`) REFERENCES `personnel_department` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personnel_department`
--

LOCK TABLES `personnel_department` WRITE;
/*!40000 ALTER TABLE `personnel_department` DISABLE KEYS */;
INSERT INTO `personnel_department` VALUES (1,'1','Department',1,NULL);
/*!40000 ALTER TABLE `personnel_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personnel_employee`
--

DROP TABLE IF EXISTS `personnel_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personnel_employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `leave_group` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emp_code` (`emp_code`),
  KEY `personnel_employee_department_id_068bbd08` (`department_id`),
  KEY `personnel_employee_position_id_c9321343` (`position_id`),
  CONSTRAINT `personnel_employee_department_id_068bbd08_fk_personnel` FOREIGN KEY (`department_id`) REFERENCES `personnel_department` (`id`),
  CONSTRAINT `personnel_employee_position_id_c9321343_fk_personnel_position_id` FOREIGN KEY (`position_id`) REFERENCES `personnel_position` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personnel_employee`
--

LOCK TABLES `personnel_employee` WRITE;
/*!40000 ALTER TABLE `personnel_employee` DISABLE KEYS */;
INSERT INTO `personnel_employee` VALUES (1,'2021-11-29 10:39:58.000000',NULL,'2021-11-29 10:39:58.000000',NULL,0,'1','Juan','Dela Cruz',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077','2020-04-08',-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(2,'2021-11-29 10:39:58.000000',NULL,'2021-11-29 10:39:58.000000',NULL,0,'2','RJ','Diangzon',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077','2018-05-15',-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(3,'2021-11-29 10:39:58.000000',NULL,'2021-11-29 10:39:58.000000',NULL,0,'3','Wilson','Parajas',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077','2021-05-01',-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(4,'2021-11-29 10:39:58.000000',NULL,'2021-11-29 10:39:58.000000',NULL,0,'4','Charles','Verdadero',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077','2021-04-27',-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(5,'2021-11-29 10:39:58.000000',NULL,'2021-11-29 10:39:58.000000',NULL,0,'5','Mark','Nieto',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077','2021-05-06',-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(6,'2021-11-29 10:39:58.000000',NULL,'2021-11-29 10:39:58.000000',NULL,0,'6','Francis','Bolster',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077','2017-02-06',-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(7,'2021-11-29 10:39:58.000000',NULL,'2021-11-29 10:39:58.000000',NULL,0,'7','Renna','Telesforo',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077','2020-07-02',-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(8,'2021-11-09 14:21:19.000000',NULL,'2021-11-09 14:21:19.000000',NULL,0,'8','Matthew','Isaac',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077','2021-05-01',0,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(9,'2021-11-29 10:39:58.000000',NULL,'2021-11-29 10:39:58.000000',NULL,0,'9','Errol','Garcia',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077','2020-03-12',-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(10,'2021-11-29 10:39:58.000000',NULL,'2021-11-29 10:39:58.000000',NULL,0,'19','Lawrence','Mark',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077','2021-04-13',-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(11,'2021-11-29 10:39:58.000000',NULL,'2021-11-29 10:39:58.000000',NULL,0,'20','Joseph','Berongoy',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,'1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BOCK191760589',NULL,'2021-11-11 12:44:21.949379','2019-10-21',-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(12,'2021-11-29 10:39:58.000000',NULL,'2021-11-29 10:39:58.000000',NULL,0,'21','Ayesha','Porras',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077','2021-05-03',-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(13,'2021-11-29 10:39:58.000000',NULL,'2021-11-29 10:39:58.000000',NULL,0,'22','Jelo','De Guzman',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077','2020-01-06',-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(14,'2021-11-29 10:39:58.000000',NULL,'2021-11-29 10:39:58.000000',NULL,0,'23','Yow Lee','Rah Me Zares',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077','2020-04-03',-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(15,'2021-11-09 14:21:19.000000',NULL,'2021-11-09 14:21:19.000000',NULL,0,'24','Arjay','Diangzon',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077',NULL,-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(16,'2021-11-09 14:21:19.000000',NULL,'2021-11-09 14:21:19.000000',NULL,0,'25','Charles','Verdadero',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077',NULL,-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(17,'2021-11-09 14:21:19.000000',NULL,'2021-11-09 14:21:19.000000',NULL,0,'26','Mark','Gil',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077',NULL,-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(18,'2021-11-09 14:21:19.000000',NULL,'2021-11-09 14:21:19.000000',NULL,0,'27','Joseph','Berongoy',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077',NULL,-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(19,'2021-11-09 14:21:20.000000',NULL,'2021-11-09 14:21:20.000000',NULL,0,'28','Wilson','Parajas',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077',NULL,-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL),(20,'2021-11-09 14:21:20.000000',NULL,'2021-11-09 14:21:20.000000',NULL,0,'30','Test','Person',NULL,NULL,NULL,NULL,'','pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=',NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,'2021-11-09 14:38:21.562077',NULL,-1,NULL,1,1,0,1,NULL,NULL,1,NULL,NULL,1,1,NULL);
/*!40000 ALTER TABLE `personnel_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personnel_employee_area`
--

DROP TABLE IF EXISTS `personnel_employee_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personnel_employee_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `area_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personnel_employee_area_employee_id_area_id_00b3d777_uniq` (`employee_id`,`area_id`),
  KEY `personnel_employee_area_area_id_64c21925_fk_personnel_area_id` (`area_id`),
  CONSTRAINT `personnel_employee_a_employee_id_8e5cec21_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `personnel_employee_area_area_id_64c21925_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personnel_employee_area`
--

LOCK TABLES `personnel_employee_area` WRITE;
/*!40000 ALTER TABLE `personnel_employee_area` DISABLE KEYS */;
INSERT INTO `personnel_employee_area` VALUES (3,1,2),(4,2,2),(5,3,2),(6,4,2),(7,5,2),(8,6,2),(9,7,2),(10,8,2),(11,9,2),(12,10,2),(13,11,2),(14,12,2),(15,13,2),(16,14,2),(17,15,2),(18,16,2),(19,17,2),(20,18,2),(21,19,2),(22,20,2);
/*!40000 ALTER TABLE `personnel_employee_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personnel_employee_flow_role`
--

DROP TABLE IF EXISTS `personnel_employee_flow_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personnel_employee_flow_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `workflowrole_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personnel_employee_flow__employee_id_workflowrole_46b0e5e0_uniq` (`employee_id`,`workflowrole_id`),
  KEY `personnel_employee_f_workflowrole_id_4704db32_fk_workflow_` (`workflowrole_id`),
  CONSTRAINT `personnel_employee_f_employee_id_c27f8a56_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `personnel_employee_f_workflowrole_id_4704db32_fk_workflow_` FOREIGN KEY (`workflowrole_id`) REFERENCES `workflow_workflowrole` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personnel_employee_flow_role`
--

LOCK TABLES `personnel_employee_flow_role` WRITE;
/*!40000 ALTER TABLE `personnel_employee_flow_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `personnel_employee_flow_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personnel_employeecalendar`
--

DROP TABLE IF EXISTS `personnel_employeecalendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personnel_employeecalendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `calendar` varchar(100) DEFAULT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personnel_employeecalendar_employee_id_calendar_10f7278d_uniq` (`employee_id`,`calendar`),
  CONSTRAINT `personnel_employeeca_employee_id_165e0779_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personnel_employeecalendar`
--

LOCK TABLES `personnel_employeecalendar` WRITE;
/*!40000 ALTER TABLE `personnel_employeecalendar` DISABLE KEYS */;
/*!40000 ALTER TABLE `personnel_employeecalendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personnel_employeecertification`
--

DROP TABLE IF EXISTS `personnel_employeecertification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personnel_employeecertification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `expire_on` date DEFAULT NULL,
  `email_alert` tinyint(1) NOT NULL,
  `before` int(11) DEFAULT NULL,
  `certification_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `certification_code` varchar(20) DEFAULT NULL,
  `file` varchar(200) DEFAULT NULL,
  `file_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personnel_employeecertif_employee_id_certificatio_7bcf4c7d_uniq` (`employee_id`,`certification_id`),
  KEY `personnel_employeece_certification_id_faabed40_fk_personnel` (`certification_id`),
  CONSTRAINT `personnel_employeece_certification_id_faabed40_fk_personnel` FOREIGN KEY (`certification_id`) REFERENCES `personnel_certification` (`id`),
  CONSTRAINT `personnel_employeece_employee_id_b7bd3867_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personnel_employeecertification`
--

LOCK TABLES `personnel_employeecertification` WRITE;
/*!40000 ALTER TABLE `personnel_employeecertification` DISABLE KEYS */;
/*!40000 ALTER TABLE `personnel_employeecertification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personnel_employeecustomattribute`
--

DROP TABLE IF EXISTS `personnel_employeecustomattribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personnel_employeecustomattribute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `attr_name` varchar(50) NOT NULL,
  `attr_type` smallint(6) NOT NULL,
  `attr_value` varchar(200) DEFAULT NULL,
  `enable` tinyint(1) NOT NULL,
  `is_unique` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `attr_name` (`attr_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personnel_employeecustomattribute`
--

LOCK TABLES `personnel_employeecustomattribute` WRITE;
/*!40000 ALTER TABLE `personnel_employeecustomattribute` DISABLE KEYS */;
/*!40000 ALTER TABLE `personnel_employeecustomattribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personnel_employeeextrainfo`
--

DROP TABLE IF EXISTS `personnel_employeeextrainfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personnel_employeeextrainfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` longtext NOT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_id` (`employee_id`),
  CONSTRAINT `personnel_employeeex_employee_id_41e2b04d_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personnel_employeeextrainfo`
--

LOCK TABLES `personnel_employeeextrainfo` WRITE;
/*!40000 ALTER TABLE `personnel_employeeextrainfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `personnel_employeeextrainfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personnel_employeeprofile`
--

DROP TABLE IF EXISTS `personnel_employeeprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personnel_employeeprofile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `column_order` longtext NOT NULL,
  `preferences` longtext NOT NULL,
  `pwd_update_time` datetime(6) DEFAULT NULL,
  `emp_id` int(11) NOT NULL,
  `disabled_fields` longtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emp_id` (`emp_id`),
  CONSTRAINT `personnel_employeepr_emp_id_3a69c313_fk_personnel` FOREIGN KEY (`emp_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personnel_employeeprofile`
--

LOCK TABLES `personnel_employeeprofile` WRITE;
/*!40000 ALTER TABLE `personnel_employeeprofile` DISABLE KEYS */;
/*!40000 ALTER TABLE `personnel_employeeprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personnel_employment`
--

DROP TABLE IF EXISTS `personnel_employment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personnel_employment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employment_type` smallint(6) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `active_time` datetime(6) DEFAULT NULL,
  `inactive_time` datetime(6) DEFAULT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_id` (`employee_id`),
  CONSTRAINT `personnel_employment_employee_id_f797c7d9_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personnel_employment`
--

LOCK TABLES `personnel_employment` WRITE;
/*!40000 ALTER TABLE `personnel_employment` DISABLE KEYS */;
/*!40000 ALTER TABLE `personnel_employment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personnel_position`
--

DROP TABLE IF EXISTS `personnel_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personnel_position` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `position_code` varchar(50) NOT NULL,
  `position_name` varchar(100) NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  `parent_position_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `position_code` (`position_code`),
  KEY `personnel_position_parent_position_id_a496a36b_fk_personnel` (`parent_position_id`),
  CONSTRAINT `personnel_position_parent_position_id_a496a36b_fk_personnel` FOREIGN KEY (`parent_position_id`) REFERENCES `personnel_position` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personnel_position`
--

LOCK TABLES `personnel_position` WRITE;
/*!40000 ALTER TABLE `personnel_position` DISABLE KEYS */;
INSERT INTO `personnel_position` VALUES (1,'1','Position',1,NULL);
/*!40000 ALTER TABLE `personnel_position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personnel_resign`
--

DROP TABLE IF EXISTS `personnel_resign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personnel_resign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resign_date` date NOT NULL,
  `resign_type` int(11) DEFAULT NULL,
  `disableatt` tinyint(1) NOT NULL,
  `reason` varchar(200) DEFAULT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_id` (`employee_id`),
  CONSTRAINT `personnel_resign_employee_id_dd9b7e08_fk_personnel_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personnel_resign`
--

LOCK TABLES `personnel_resign` WRITE;
/*!40000 ALTER TABLE `personnel_resign` DISABLE KEYS */;
/*!40000 ALTER TABLE `personnel_resign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rest_framework_tracking_apirequestlog`
--

DROP TABLE IF EXISTS `rest_framework_tracking_apirequestlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rest_framework_tracking_apirequestlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `requested_at` datetime(6) NOT NULL,
  `response_ms` int(10) unsigned NOT NULL,
  `path` varchar(200) NOT NULL,
  `remote_addr` char(39) NOT NULL,
  `host` varchar(200) NOT NULL,
  `method` varchar(10) NOT NULL,
  `query_params` longtext DEFAULT NULL,
  `data` longtext DEFAULT NULL,
  `response` longtext DEFAULT NULL,
  `status_code` int(10) unsigned DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `view` varchar(200) DEFAULT NULL,
  `view_method` varchar(200) DEFAULT NULL,
  `errors` longtext DEFAULT NULL,
  `username_persistent` varchar(200),
  PRIMARY KEY (`id`),
  KEY `rest_framework_tracking_apirequestlog_requested_at_b6f1c2f2` (`requested_at`),
  KEY `rest_framework_tracking_apirequestlog_path_fe81f91b` (`path`),
  KEY `rest_framework_tracking_apirequestlog_view_5bd1e407` (`view`),
  KEY `rest_framework_tracking_apirequestlog_view_method_dd790881` (`view_method`),
  KEY `rest_framework_track_user_id_671b70b7_fk_auth_user` (`user_id`),
  KEY `rest_framework_tracking_apirequestlog_status_code_3c9e2003` (`status_code`),
  CONSTRAINT `rest_framework_track_user_id_671b70b7_fk_auth_user` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rest_framework_tracking_apirequestlog`
--

LOCK TABLES `rest_framework_tracking_apirequestlog` WRITE;
/*!40000 ALTER TABLE `rest_framework_tracking_apirequestlog` DISABLE KEYS */;
/*!40000 ALTER TABLE `rest_framework_tracking_apirequestlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_stafftoken`
--

DROP TABLE IF EXISTS `staff_stafftoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff_stafftoken` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `staff_stafftoken_user_id_39c937fa_fk_personnel_employee_id` FOREIGN KEY (`user_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_stafftoken`
--

LOCK TABLES `staff_stafftoken` WRITE;
/*!40000 ALTER TABLE `staff_stafftoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_stafftoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sync_area`
--

DROP TABLE IF EXISTS `sync_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sync_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_time` datetime(6) DEFAULT NULL,
  `flag` smallint(6) NOT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `sync_ret` varchar(200) DEFAULT NULL,
  `area_code` varchar(30) NOT NULL,
  `area_name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sync_area_area_code_area_name_200046d1_uniq` (`area_code`,`area_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sync_area`
--

LOCK TABLES `sync_area` WRITE;
/*!40000 ALTER TABLE `sync_area` DISABLE KEYS */;
/*!40000 ALTER TABLE `sync_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sync_department`
--

DROP TABLE IF EXISTS `sync_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sync_department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_time` datetime(6) DEFAULT NULL,
  `flag` smallint(6) NOT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `sync_ret` varchar(200) DEFAULT NULL,
  `dept_code` varchar(50) NOT NULL,
  `dept_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sync_department_dept_code_dept_name_93923213_uniq` (`dept_code`,`dept_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sync_department`
--

LOCK TABLES `sync_department` WRITE;
/*!40000 ALTER TABLE `sync_department` DISABLE KEYS */;
/*!40000 ALTER TABLE `sync_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sync_employee`
--

DROP TABLE IF EXISTS `sync_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sync_employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `active_status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sync_employee_emp_code_521bf06d_uniq` (`emp_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sync_employee`
--

LOCK TABLES `sync_employee` WRITE;
/*!40000 ALTER TABLE `sync_employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `sync_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sync_job`
--

DROP TABLE IF EXISTS `sync_job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sync_job` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_time` datetime(6) DEFAULT NULL,
  `flag` smallint(6) NOT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `sync_ret` varchar(200) DEFAULT NULL,
  `job_code` varchar(50) NOT NULL,
  `job_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sync_job_job_code_job_name_4ec5619e_uniq` (`job_code`,`job_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sync_job`
--

LOCK TABLES `sync_job` WRITE;
/*!40000 ALTER TABLE `sync_job` DISABLE KEYS */;
/*!40000 ALTER TABLE `sync_job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_reason`
--

DROP TABLE IF EXISTS `visitor_reason`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_reason` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `visit_reason` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_reason`
--

LOCK TABLES `visitor_reason` WRITE;
/*!40000 ALTER TABLE `visitor_reason` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_reason` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_reservation`
--

DROP TABLE IF EXISTS `visitor_reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`workflowinstance_ptr_id`),
  KEY `visitor_reservation_cert_type_id_4f047f2a_fk_personnel` (`cert_type_id`),
  KEY `visitor_reservation_visit_reason_id_c9ac83ac_fk_visitor_r` (`visit_reason_id`),
  KEY `visitor_reservation_visit_department_id_2d293e10` (`visit_department_id`),
  CONSTRAINT `visitor_reservation_cert_type_id_4f047f2a_fk_personnel` FOREIGN KEY (`cert_type_id`) REFERENCES `personnel_certification` (`id`),
  CONSTRAINT `visitor_reservation_visit_department_id_2d293e10_fk_personnel` FOREIGN KEY (`visit_department_id`) REFERENCES `personnel_department` (`id`),
  CONSTRAINT `visitor_reservation_visit_reason_id_c9ac83ac_fk_visitor_r` FOREIGN KEY (`visit_reason_id`) REFERENCES `visitor_reason` (`id`),
  CONSTRAINT `visitor_reservation_workflowinstance_ptr_3787bcd6_fk_workflow_` FOREIGN KEY (`workflowinstance_ptr_id`) REFERENCES `workflow_workflowinstance` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_reservation`
--

LOCK TABLES `visitor_reservation` WRITE;
/*!40000 ALTER TABLE `visitor_reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_visitor`
--

DROP TABLE IF EXISTS `visitor_visitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_visitor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `visited_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `visitor_code` (`visitor_code`),
  KEY `visitor_visitor_cert_type_id_f62ea604_fk_personnel` (`cert_type_id`),
  KEY `visitor_visitor_visit_reason_id_4b9a2d23_fk_visitor_reason_id` (`visit_reason_id`),
  KEY `visitor_visitor_visit_department_id_f7dbdcb4` (`visit_department_id`),
  KEY `visitor_visitor_visited_id_8043a7ea` (`visited_id`),
  CONSTRAINT `visitor_visitor_cert_type_id_f62ea604_fk_personnel` FOREIGN KEY (`cert_type_id`) REFERENCES `personnel_certification` (`id`),
  CONSTRAINT `visitor_visitor_visit_department_id_f7dbdcb4_fk_personnel` FOREIGN KEY (`visit_department_id`) REFERENCES `personnel_department` (`id`),
  CONSTRAINT `visitor_visitor_visit_reason_id_4b9a2d23_fk_visitor_reason_id` FOREIGN KEY (`visit_reason_id`) REFERENCES `visitor_reason` (`id`),
  CONSTRAINT `visitor_visitor_visited_id_8043a7ea_fk_personnel_employee_id` FOREIGN KEY (`visited_id`) REFERENCES `personnel_employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_visitor`
--

LOCK TABLES `visitor_visitor` WRITE;
/*!40000 ALTER TABLE `visitor_visitor` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_visitor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_visitor_acc_groups`
--

DROP TABLE IF EXISTS `visitor_visitor_acc_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_visitor_acc_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visitor_id` int(11) NOT NULL,
  `accgroups_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `visitor_visitor_acc_groups_visitor_id_accgroups_id_bb522609_uniq` (`visitor_id`,`accgroups_id`),
  KEY `visitor_visitor_acc__accgroups_id_b1487149_fk_acc_accgr` (`accgroups_id`),
  CONSTRAINT `visitor_visitor_acc__accgroups_id_b1487149_fk_acc_accgr` FOREIGN KEY (`accgroups_id`) REFERENCES `acc_accgroups` (`id`),
  CONSTRAINT `visitor_visitor_acc__visitor_id_8ce09562_fk_visitor_v` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_visitor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_visitor_acc_groups`
--

LOCK TABLES `visitor_visitor_acc_groups` WRITE;
/*!40000 ALTER TABLE `visitor_visitor_acc_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_visitor_acc_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_visitor_area`
--

DROP TABLE IF EXISTS `visitor_visitor_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_visitor_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visitor_id` int(11) NOT NULL,
  `area_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `visitor_visitor_area_visitor_id_area_id_27d158cc_uniq` (`visitor_id`,`area_id`),
  KEY `visitor_visitor_area_area_id_b402c047_fk_personnel_area_id` (`area_id`),
  CONSTRAINT `visitor_visitor_area_area_id_b402c047_fk_personnel_area_id` FOREIGN KEY (`area_id`) REFERENCES `personnel_area` (`id`),
  CONSTRAINT `visitor_visitor_area_visitor_id_98d7ed05_fk_visitor_visitor_id` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_visitor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_visitor_area`
--

LOCK TABLES `visitor_visitor_area` WRITE;
/*!40000 ALTER TABLE `visitor_visitor_area` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_visitor_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_visitorbiodata`
--

DROP TABLE IF EXISTS `visitor_visitorbiodata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_visitorbiodata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `visitor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `visitor_visitorbiodata_visitor_id_bio_no_bio_in_e5d598fb_uniq` (`visitor_id`,`bio_no`,`bio_index`,`bio_type`,`bio_format`,`major_ver`),
  CONSTRAINT `visitor_visitorbiodata_visitor_id_b944ed37_fk_visitor_visitor_id` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_visitor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_visitorbiodata`
--

LOCK TABLES `visitor_visitorbiodata` WRITE;
/*!40000 ALTER TABLE `visitor_visitorbiodata` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_visitorbiodata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_visitorbiophoto`
--

DROP TABLE IF EXISTS `visitor_visitorbiophoto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_visitorbiophoto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `visitor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `visitor_visitorbioph_visitor_id_9816daf7_fk_visitor_v` (`visitor_id`),
  CONSTRAINT `visitor_visitorbioph_visitor_id_9816daf7_fk_visitor_v` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_visitor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_visitorbiophoto`
--

LOCK TABLES `visitor_visitorbiophoto` WRITE;
/*!40000 ALTER TABLE `visitor_visitorbiophoto` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_visitorbiophoto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_visitorconfig`
--

DROP TABLE IF EXISTS `visitor_visitorconfig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_visitorconfig` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `qr_code_policy` smallint(6) NOT NULL,
  `code_prefix` varchar(5) NOT NULL,
  `code_width` int(11) NOT NULL,
  `code_start` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_visitorconfig`
--

LOCK TABLES `visitor_visitorconfig` WRITE;
/*!40000 ALTER TABLE `visitor_visitorconfig` DISABLE KEYS */;
INSERT INTO `visitor_visitorconfig` VALUES (1,'2021-11-09 13:25:59.221719',NULL,'2021-11-09 13:25:59.221719',NULL,0,1,'V',8,1);
/*!40000 ALTER TABLE `visitor_visitorconfig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_visitorlog`
--

DROP TABLE IF EXISTS `visitor_visitorlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_visitorlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime(6) DEFAULT NULL,
  `create_user` varchar(150) DEFAULT NULL,
  `change_time` datetime(6) DEFAULT NULL,
  `change_user` varchar(150) DEFAULT NULL,
  `status` smallint(6) NOT NULL,
  `visitor_status` smallint(6) DEFAULT NULL,
  `visitor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `visitor_visitorlog_visitor_id_ebaafde1_fk_visitor_visitor_id` (`visitor_id`),
  CONSTRAINT `visitor_visitorlog_visitor_id_ebaafde1_fk_visitor_visitor_id` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_visitor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_visitorlog`
--

LOCK TABLES `visitor_visitorlog` WRITE;
/*!40000 ALTER TABLE `visitor_visitorlog` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_visitorlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor_visitortransaction`
--

DROP TABLE IF EXISTS `visitor_visitortransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor_visitortransaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `visitor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `visitor_visitortransaction_visitor_id_punch_time_836abbcf_uniq` (`visitor_id`,`punch_time`),
  KEY `visitor_visitortrans_terminal_id_7527ef69_fk_iclock_te` (`terminal_id`),
  CONSTRAINT `visitor_visitortrans_terminal_id_7527ef69_fk_iclock_te` FOREIGN KEY (`terminal_id`) REFERENCES `iclock_terminal` (`id`),
  CONSTRAINT `visitor_visitortrans_visitor_id_0ee95624_fk_visitor_v` FOREIGN KEY (`visitor_id`) REFERENCES `visitor_visitor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor_visitortransaction`
--

LOCK TABLES `visitor_visitortransaction` WRITE;
/*!40000 ALTER TABLE `visitor_visitortransaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitor_visitortransaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow_nodeinstance`
--

DROP TABLE IF EXISTS `workflow_nodeinstance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workflow_nodeinstance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_name` varchar(30) NOT NULL,
  `order_id` int(11) NOT NULL,
  `approval_status` smallint(6) NOT NULL,
  `approval_time` datetime(6) DEFAULT NULL,
  `approval_remark` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `targeted` tinyint(1) NOT NULL,
  `approver_employee_id` int(11) DEFAULT NULL,
  `workflow_instance_id` int(11) DEFAULT NULL,
  `workflow_node_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `workflow_nodeinstanc_approver_employee_id_d36cd45d_fk_personnel` (`approver_employee_id`),
  KEY `workflow_nodeinstanc_workflow_instance_id_afe84fe4_fk_workflow_` (`workflow_instance_id`),
  KEY `workflow_nodeinstanc_workflow_node_id_166f36c4_fk_workflow_` (`workflow_node_id`),
  CONSTRAINT `workflow_nodeinstanc_approver_employee_id_d36cd45d_fk_personnel` FOREIGN KEY (`approver_employee_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `workflow_nodeinstanc_workflow_instance_id_afe84fe4_fk_workflow_` FOREIGN KEY (`workflow_instance_id`) REFERENCES `workflow_workflowinstance` (`id`),
  CONSTRAINT `workflow_nodeinstanc_workflow_node_id_166f36c4_fk_workflow_` FOREIGN KEY (`workflow_node_id`) REFERENCES `workflow_workflownode` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow_nodeinstance`
--

LOCK TABLES `workflow_nodeinstance` WRITE;
/*!40000 ALTER TABLE `workflow_nodeinstance` DISABLE KEYS */;
/*!40000 ALTER TABLE `workflow_nodeinstance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow_workflowengine`
--

DROP TABLE IF EXISTS `workflow_workflowengine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workflow_workflowengine` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `workflow_code` varchar(50) NOT NULL,
  `workflow_name` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `description` varchar(50) NOT NULL,
  `workflow_type` smallint(6) NOT NULL,
  `applicant_position_id` int(11) DEFAULT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `departments_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `workflow_code` (`workflow_code`),
  KEY `workflow_workfloweng_applicant_position_i_8a65e03a_fk_personnel` (`applicant_position_id`),
  KEY `workflow_workfloweng_content_type_id_f7345c20_fk_django_co` (`content_type_id`),
  KEY `workflow_workflowengine_departments_id_0f06d4c7` (`departments_id`),
  CONSTRAINT `workflow_workfloweng_applicant_position_i_8a65e03a_fk_personnel` FOREIGN KEY (`applicant_position_id`) REFERENCES `personnel_position` (`id`),
  CONSTRAINT `workflow_workfloweng_content_type_id_f7345c20_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `workflow_workfloweng_departments_id_0f06d4c7_fk_personnel` FOREIGN KEY (`departments_id`) REFERENCES `personnel_department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow_workflowengine`
--

LOCK TABLES `workflow_workflowengine` WRITE;
/*!40000 ALTER TABLE `workflow_workflowengine` DISABLE KEYS */;
/*!40000 ALTER TABLE `workflow_workflowengine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow_workflowengine_employee`
--

DROP TABLE IF EXISTS `workflow_workflowengine_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workflow_workflowengine_employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `workflowengine_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `workflow_workflowengine__workflowengine_id_employ_8128deb2_uniq` (`workflowengine_id`,`employee_id`),
  KEY `workflow_workfloweng_employee_id_803a409e_fk_personnel` (`employee_id`),
  CONSTRAINT `workflow_workfloweng_employee_id_803a409e_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `workflow_workfloweng_workflowengine_id_6ebcc5f2_fk_workflow_` FOREIGN KEY (`workflowengine_id`) REFERENCES `workflow_workflowengine` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow_workflowengine_employee`
--

LOCK TABLES `workflow_workflowengine_employee` WRITE;
/*!40000 ALTER TABLE `workflow_workflowengine_employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `workflow_workflowengine_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow_workflowinstance`
--

DROP TABLE IF EXISTS `workflow_workflowinstance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workflow_workflowinstance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `approval_time` datetime(6) DEFAULT NULL,
  `approval_status` smallint(6) NOT NULL,
  `approval_remark` longtext DEFAULT NULL,
  `approver` varchar(30) DEFAULT NULL,
  `approver_instance` longtext DEFAULT NULL,
  `employee_id` int(11) NOT NULL,
  `workflow_engine_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `workflow_workflowins_workflow_engine_id_1e6ac40f_fk_workflow_` (`workflow_engine_id`),
  KEY `workflow_workflowinstance_employee_id_c7cff08e` (`employee_id`),
  CONSTRAINT `workflow_workflowins_employee_id_c7cff08e_fk_personnel` FOREIGN KEY (`employee_id`) REFERENCES `personnel_employee` (`id`),
  CONSTRAINT `workflow_workflowins_workflow_engine_id_1e6ac40f_fk_workflow_` FOREIGN KEY (`workflow_engine_id`) REFERENCES `workflow_workflowengine` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow_workflowinstance`
--

LOCK TABLES `workflow_workflowinstance` WRITE;
/*!40000 ALTER TABLE `workflow_workflowinstance` DISABLE KEYS */;
/*!40000 ALTER TABLE `workflow_workflowinstance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow_workflownode`
--

DROP TABLE IF EXISTS `workflow_workflownode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workflow_workflownode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_name` varchar(30) NOT NULL,
  `order_id` int(11) NOT NULL,
  `approver_by_overall` tinyint(1) NOT NULL,
  `notify_by_overall` tinyint(1) NOT NULL,
  `workflow_engine_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `workflow_workflownod_workflow_engine_id_04c8f470_fk_workflow_` (`workflow_engine_id`),
  CONSTRAINT `workflow_workflownod_workflow_engine_id_04c8f470_fk_workflow_` FOREIGN KEY (`workflow_engine_id`) REFERENCES `workflow_workflowengine` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow_workflownode`
--

LOCK TABLES `workflow_workflownode` WRITE;
/*!40000 ALTER TABLE `workflow_workflownode` DISABLE KEYS */;
/*!40000 ALTER TABLE `workflow_workflownode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow_workflownode_approver`
--

DROP TABLE IF EXISTS `workflow_workflownode_approver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workflow_workflownode_approver` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `workflownode_id` int(11) NOT NULL,
  `workflowrole_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `workflow_workflownode_ap_workflownode_id_workflow_7543ba37_uniq` (`workflownode_id`,`workflowrole_id`),
  KEY `workflow_workflownod_workflowrole_id_c8e00d42_fk_workflow_` (`workflowrole_id`),
  CONSTRAINT `workflow_workflownod_workflownode_id_d814c941_fk_workflow_` FOREIGN KEY (`workflownode_id`) REFERENCES `workflow_workflownode` (`id`),
  CONSTRAINT `workflow_workflownod_workflowrole_id_c8e00d42_fk_workflow_` FOREIGN KEY (`workflowrole_id`) REFERENCES `workflow_workflowrole` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow_workflownode_approver`
--

LOCK TABLES `workflow_workflownode_approver` WRITE;
/*!40000 ALTER TABLE `workflow_workflownode_approver` DISABLE KEYS */;
/*!40000 ALTER TABLE `workflow_workflownode_approver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow_workflownode_notifier`
--

DROP TABLE IF EXISTS `workflow_workflownode_notifier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workflow_workflownode_notifier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `workflownode_id` int(11) NOT NULL,
  `workflowrole_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `workflow_workflownode_no_workflownode_id_workflow_cac02b37_uniq` (`workflownode_id`,`workflowrole_id`),
  KEY `workflow_workflownod_workflowrole_id_73de7fc2_fk_workflow_` (`workflowrole_id`),
  CONSTRAINT `workflow_workflownod_workflownode_id_57298016_fk_workflow_` FOREIGN KEY (`workflownode_id`) REFERENCES `workflow_workflownode` (`id`),
  CONSTRAINT `workflow_workflownod_workflowrole_id_73de7fc2_fk_workflow_` FOREIGN KEY (`workflowrole_id`) REFERENCES `workflow_workflowrole` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow_workflownode_notifier`
--

LOCK TABLES `workflow_workflownode_notifier` WRITE;
/*!40000 ALTER TABLE `workflow_workflownode_notifier` DISABLE KEYS */;
/*!40000 ALTER TABLE `workflow_workflownode_notifier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow_workflowrole`
--

DROP TABLE IF EXISTS `workflow_workflowrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workflow_workflowrole` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_code` varchar(30) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_code` (`role_code`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow_workflowrole`
--

LOCK TABLES `workflow_workflowrole` WRITE;
/*!40000 ALTER TABLE `workflow_workflowrole` DISABLE KEYS */;
/*!40000 ALTER TABLE `workflow_workflowrole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'erpdb_biotime'
--

--
-- Dumping routines for database 'erpdb_biotime'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-29 13:16:18
