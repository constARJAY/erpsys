-- MariaDB dump 10.17  Distrib 10.4.14-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: erpdb
-- ------------------------------------------------------
-- Server version	10.4.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fms_bank_tbl`
--

DROP TABLE IF EXISTS `fms_bank_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fms_bank_tbl` (
  `bankID` bigint(20) NOT NULL AUTO_INCREMENT,
  `bankCode` varchar(255) NOT NULL,
  `bankName` varchar(255) NOT NULL,
  `bankNumber` varchar(255) NOT NULL,
  `bankStatus` int(50) NOT NULL,
  `datecreated` date NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`bankID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_bank_tbl`
--

LOCK TABLES `fms_bank_tbl` WRITE;
/*!40000 ALTER TABLE `fms_bank_tbl` DISABLE KEYS */;
INSERT INTO `fms_bank_tbl` VALUES (1,'VEN-21-00001','BSP','999-999-999-999',1,'2021-03-23',3,1,'2021-03-23 10:02:31','2021-04-12 15:15:41'),(2,'VEN-21-00002','MARK','1232-3214-1232',1,'2021-03-25',1,1,'2021-03-25 13:24:27','2021-04-13 11:35:16'),(3,'BNK-21-00003','CHARLES','12314-32132',1,'2021-04-13',1,1,'2021-04-13 11:36:48','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `fms_bank_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fms_chart_of_accounts_tbl`
--

DROP TABLE IF EXISTS `fms_chart_of_accounts_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fms_chart_of_accounts_tbl` (
  `chartOfAccountID` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`chartOfAccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_chart_of_accounts_tbl`
--

LOCK TABLES `fms_chart_of_accounts_tbl` WRITE;
/*!40000 ALTER TABLE `fms_chart_of_accounts_tbl` DISABLE KEYS */;
INSERT INTO `fms_chart_of_accounts_tbl` VALUES (1,1,'132','12312','123123','123123',1,'Non-current Asset','Equity',1,'2021-03-23',3,3,'2021-03-23 10:02:54','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `fms_chart_of_accounts_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_approval_setup_tbl`
--

DROP TABLE IF EXISTS `gen_approval_setup_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gen_approval_setup_tbl` (
  `approvalID` bigint(20) NOT NULL AUTO_INCREMENT,
  `moduleID` bigint(20) NOT NULL,
  `moduleName` varchar(100) DEFAULT NULL,
  `designationID` bigint(20) NOT NULL,
  `roleID` bigint(20) NOT NULL,
  `userAccountID` text NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`approvalID`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_approval_setup_tbl`
--

LOCK TABLES `gen_approval_setup_tbl` WRITE;
/*!40000 ALTER TABLE `gen_approval_setup_tbl` DISABLE KEYS */;
INSERT INTO `gen_approval_setup_tbl` VALUES (128,33,'Inventory Receiving',1,0,'0',1,1,'2021-04-07','2021-04-07 05:51:35'),(129,33,'Inventory Receiving',2,0,'0',1,1,'2021-04-07','2021-04-07 05:51:35'),(130,33,'Inventory Receiving',3,0,'0',1,1,'2021-04-07','2021-04-07 05:51:35'),(131,60,'Change Schedule',2,0,'3|4|1',1,1,'2021-04-08','2021-04-08 00:13:29'),(132,56,'Overtime Request',1,0,'3|4|2',1,1,'2021-04-08','2021-04-08 02:38:27'),(133,57,'No Time In/Out',1,0,'3|4|2',1,1,'2021-04-12','2021-04-12 01:02:59'),(135,55,'Leave Request',1,0,'3|4|2',1,1,'2021-04-12','2021-04-12 02:03:39'),(136,55,'Leave Request',2,0,'3|4|1',1,1,'2021-04-12','2021-04-12 02:03:53'),(137,55,'Leave Request',3,0,'0',1,1,'2021-04-12','2021-04-12 02:03:40'),(138,55,'Leave Request',4,0,'0',1,1,'2021-04-12','2021-04-12 02:03:40'),(139,55,'Leave Request',5,0,'0',1,1,'2021-04-12','2021-04-12 02:03:40'),(140,46,'Purchase Request',1,0,'3|4|2',1,1,'2021-04-15','2021-04-15 06:58:57');
/*!40000 ALTER TABLE `gen_approval_setup_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_ledger_classification_tbl`
--

DROP TABLE IF EXISTS `gen_ledger_classification_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gen_ledger_classification_tbl` (
  `ledgerClassificationID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ledgerClassificationName` varchar(255) NOT NULL,
  `ledgerClassificationDatecreated` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ledgerClassificationID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_ledger_classification_tbl`
--

LOCK TABLES `gen_ledger_classification_tbl` WRITE;
/*!40000 ALTER TABLE `gen_ledger_classification_tbl` DISABLE KEYS */;
INSERT INTO `gen_ledger_classification_tbl` VALUES (1,'test','2021-03-25'),(2,'Test','2021-03-25');
/*!40000 ALTER TABLE `gen_ledger_classification_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_module_category_tbl`
--

DROP TABLE IF EXISTS `gen_module_category_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gen_module_category_tbl` (
  `moduleCategoryID` bigint(20) NOT NULL AUTO_INCREMENT,
  `moduleHeaderID` bigint(20) NOT NULL,
  `moduleCategoryOrder` int(11) NOT NULL,
  `moduleCategoryIcon` varchar(100) NOT NULL,
  `moduleCategoryName` varchar(100) NOT NULL,
  `moduleCategoryStatus` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`moduleCategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_module_category_tbl`
--

LOCK TABLES `gen_module_category_tbl` WRITE;
/*!40000 ALTER TABLE `gen_module_category_tbl` DISABLE KEYS */;
INSERT INTO `gen_module_category_tbl` VALUES (1,5,1,'01616719509.svg','System Setting',1,'2021-03-23 22:19:25','2021-03-26 00:45:09'),(2,2,1,'01616718702.svg','Masterfiles',1,'2021-03-23 22:19:25','2021-03-26 00:31:42'),(3,2,2,'01616718748.svg','Inventory Modules',1,'2021-03-23 22:19:25','2021-03-26 00:32:28'),(4,2,3,'01616719413.svg','Employee Forms',1,'2021-03-23 22:19:25','2021-03-26 00:43:33'),(5,2,4,'01616719426.svg','Project Modules',1,'2021-03-23 22:19:25','2021-03-26 00:43:46'),(6,4,1,'01616719495.svg','Reports',1,'2021-03-23 22:19:25','2021-03-26 00:44:55'),(7,2,5,'01616719437.svg','Finance Modules',1,'2021-03-23 22:19:25','2021-03-26 00:43:57'),(8,2,6,'01616719446.svg','HR Modules',1,'2021-03-23 22:19:25','2021-03-26 00:44:06'),(9,5,2,'01616719521.svg','System Setup',1,'2021-03-23 22:19:25','2021-03-26 00:45:21'),(10,2,7,'01616719468.svg','Recruitment Modules',1,'2021-03-23 22:19:25','2021-03-26 00:44:28'),(11,2,8,'01616719482.svg','Payroll Modules',1,'2021-03-23 22:19:25','2021-03-26 00:44:42'),(12,1,1,'01616718684.svg','Dashboard',1,'2021-03-23 22:53:33','2021-03-26 00:31:24');
/*!40000 ALTER TABLE `gen_module_category_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_module_header_tbl`
--

DROP TABLE IF EXISTS `gen_module_header_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gen_module_header_tbl` (
  `moduleHeaderID` bigint(20) NOT NULL AUTO_INCREMENT,
  `moduleHeaderOrder` int(11) NOT NULL,
  `moduleHeaderName` varchar(100) NOT NULL,
  `moduleHeaderStatus` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`moduleHeaderID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_module_header_tbl`
--

LOCK TABLES `gen_module_header_tbl` WRITE;
/*!40000 ALTER TABLE `gen_module_header_tbl` DISABLE KEYS */;
INSERT INTO `gen_module_header_tbl` VALUES (1,1,'Main',1,'2021-03-23 23:26:04','2021-03-23 23:26:05'),(2,2,'Forms',1,'2021-03-18 23:26:06','2021-03-23 23:26:08'),(3,3,'Management',1,'2021-03-16 23:26:09','2021-03-23 23:26:10'),(4,4,'Reports',1,'2021-03-07 23:26:11','2021-03-23 23:26:12'),(5,5,'Settings',1,'2021-03-16 23:26:12','2021-03-23 23:26:13');
/*!40000 ALTER TABLE `gen_module_header_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_module_list_tbl`
--

DROP TABLE IF EXISTS `gen_module_list_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gen_module_list_tbl` (
  `moduleID` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`moduleID`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_module_list_tbl`
--

LOCK TABLES `gen_module_list_tbl` WRITE;
/*!40000 ALTER TABLE `gen_module_list_tbl` DISABLE KEYS */;
INSERT INTO `gen_module_list_tbl` VALUES (1,5,1,1,'Project Management System|Inventory Management System|Finance Management System','01618295087.svg|11618295087.svg|21618295087.svg|31618295087.svg|41618295087.svg|51618295087.svg|6161','Approval Setup',0,'approval_setup',1,'2021-03-23 23:22:25','2021-04-13 06:24:47'),(2,5,1,2,'Inventory Management System|Project Management System|Finance Management System|Human Resource Information System',NULL,'Roles and Permission',0,'roles_permission',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(3,5,1,3,'Inventory Management System|Project Management System|Finance Management System|Human Resource Information System',NULL,'System Notification',0,'system_notification',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(4,2,2,1,'Inventory Management System',NULL,'Inventory Item',0,'ims/inventory_item',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(5,2,2,2,'Inventory Management System',NULL,'Inventory Category',0,'ims/inventory_category',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(6,2,2,3,'Inventory Management System',NULL,'Inventory Classification',0,'ims/inventory_classification',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(7,2,2,4,'Inventory Management System',NULL,'Inventory Storage',0,'ims/inventory_storage',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(8,2,2,5,'Inventory Management System',NULL,'Inventory Vendor',0,'ims/inventory_vendor',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(9,2,2,6,'Inventory Management System',NULL,'Inventory Condition',0,'ims/inventory_condition',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(10,2,2,7,'Project Management System',NULL,'Project Milestone',0,'pms/project_milestone',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(11,2,2,8,'Project Management System',NULL,'Project List',0,'pms/project_list',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(12,2,2,9,'Project Management System',NULL,'Project Client',0,'pms/project_client',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(13,2,2,10,'Project Management System',NULL,'Project Category',0,'pms/project_category',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(14,2,2,11,'Finance Management System',NULL,'Bank',0,'fms/bank',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(15,2,2,12,'Finance Management System',NULL,'Chart of Accounts',0,'fms/chart_of_account',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(16,2,2,13,'Finance Management System',NULL,'Ledger Classification',0,'fms/ledger_classification',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(17,2,2,14,'Human Resource Information System',NULL,'Designation',0,'hris/designation',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(18,2,2,15,'Human Resource Information System',NULL,'Department',0,'hris/department',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(19,2,2,16,'Human Resource Information System',NULL,'Requirement',0,'hris/requirement',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(20,2,2,17,'Human Resource Information System',NULL,'Holiday',0,'hris/holiday',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(21,2,2,18,'Human Resource Information System',NULL,'Leave Type',0,'hris/leave_type',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(22,2,2,19,'Human Resource Information System',NULL,'Loan Type',0,'hris/loan_type',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(23,2,2,20,'Human Resource Information System',NULL,'Code of Conduct Category',0,'hris/code_conduct_category',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(24,2,2,21,'Human Resource Information System',NULL,'Code of Conduct Section',0,'hris/code_conduct_section',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(25,2,2,22,'Human Resource Information System',NULL,'Branch',0,'hris/branch',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(26,2,2,23,'Human Resource Information System',NULL,'Qualification',0,'hris/qualification',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(27,2,2,24,'Human Resource Information System',NULL,'Award',0,'hris/award',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(28,2,2,25,'Human Resource Information System',NULL,'SSS Table',0,'hris/sss_table',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(29,2,2,26,'Human Resource Information System',NULL,'PhilHealth Table',0,'hris/philhealth_table',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(30,2,2,27,'Human Resource Information System',NULL,'Tax Table',0,'hris/tax_table',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(31,2,2,28,'Human Resource Information System',NULL,'Training and Development',0,'hris/training_development',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(32,2,2,29,'Human Resource Information System',NULL,'Examination',0,'hris/examination',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(33,2,3,1,'Inventory Management System',NULL,'Inventory Receiving',3,'ims/inventory_receiving',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(34,2,3,2,'Inventory Management System',NULL,'List of Stocks',0,'ims/list_stocks',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(35,2,3,3,'Inventory Management System',NULL,'Return Item',3,'ims/return_item',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(36,2,3,4,'Inventory Management System',NULL,'Disposal',3,'ims/disposal',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(37,2,3,5,'Inventory Management System',NULL,'Transfer Request',3,'ims/transfer_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(38,2,3,6,'Inventory Management System',NULL,'Cost Estimate',3,'ims/cost_estimate',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(39,2,3,7,'Inventory Management System',NULL,'Bill of Material',3,'ims/bill_material',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(40,2,3,8,'Inventory Management System',NULL,'Bid Recap',3,'ims/bid_recap',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(41,2,3,9,'Inventory Management System',NULL,'Service Order',3,'ims/service_order',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(42,2,4,1,'Inventory Management System',NULL,'Material Withdrawal',3,'ims/material_withdrawal',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(43,2,4,2,'Inventory Management System',NULL,'Equipment Borrowing',3,'ims/equipment_borrowing',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(44,2,4,3,'Inventory Management System',NULL,'Inventory Incident',3,'ims/inventory_incident',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(45,2,4,4,'Inventory Management System',NULL,'Material Usage',3,'ims/material_usage',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(46,2,4,5,'Inventory Management System',NULL,'Purchase Request',3,'ims/purchase_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(47,2,4,6,'Inventory Management System',NULL,'Purchase Order',3,'ims/purchase_order',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(48,2,4,7,'Inventory Management System',NULL,'Item Price List',0,'ims/item_price_list',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(49,2,4,8,'Inventory Management System',NULL,'Service Order Requisition',3,'ims/service_order_requisition',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(50,2,4,9,'Project Management System',NULL,'Personel Requisition',3,'pms/personel_requisition',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(51,2,4,10,'Project Management System',NULL,'Employee Taskboard',3,'pms/employee_taskboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(52,2,4,11,'Project Management System',NULL,'Sign-off',3,'pms/sign_off',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(53,2,4,12,'Finance Management System',NULL,'Petty Cash Request',3,'fms/petty_cash_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(54,2,4,13,'Finance Management System',NULL,'Client Fund Request',3,'fms/client_fund_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(55,2,4,14,'Human Resource Information System',NULL,'Leave Request',3,'hris/leave_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(56,2,4,15,'Human Resource Information System',NULL,'Overtime Request',3,'hris/overtime_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(57,2,4,16,'Human Resources Information System',NULL,'No Time In/Out',3,'hris/no_timein_timeout',1,'2021-03-23 23:22:25','2021-03-25 05:53:42'),(58,2,4,17,'Human Resource Information System',NULL,'Official Business',3,'hris/official_business',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(59,2,4,18,'Human Resources Information System',NULL,'Loan',3,'hris/loan_form',1,'2021-03-23 23:22:25','2021-04-13 03:47:55'),(60,2,4,19,'Human Resource Information System',NULL,'Change Schedule',3,'hris/change_schedule',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(61,2,4,20,'Human Resource Information System',NULL,'Employee Evaluation',3,'hris/employee_evaluation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(62,2,4,21,'Human Resource Information System',NULL,'Clearance',3,'hris/clearance',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(63,6,4,1,'Inventory Management System',NULL,'Purhcase Order Report',0,'ims/purchase_order_report',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(64,6,4,2,'Inventory Management System',NULL,'Receiving Report',0,'ims/receiving_report',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(65,6,4,3,'Inventory Management System',NULL,'Inventory Incident Report',0,'ims/inventory_incident_report',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(66,6,4,4,'Inventory Management System',NULL,'Inventory Report',0,'ims/inventory_report',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(67,1,12,1,'Inventory Management System',NULL,'Inventory Dashboard',0,'ims/inventory_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(68,1,12,2,'Project Management System',NULL,'Project Dashboard',0,'pms/project_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(69,1,12,3,'Finance Management System',NULL,'Finance Dashboard',0,'fms/finance_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(70,1,12,4,'Human Resource Information System',NULL,'HRIS Dashboard',0,'hris/hr_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(71,4,6,5,'Project Management System',NULL,'Project Management',0,'fms/project_management',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(72,4,6,6,'Project Management System',NULL,'Project Task',0,'fms/project_task',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(73,4,6,7,'Project Management System',NULL,'Project Timeline',0,'fms/project_timeline',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(74,4,6,8,'Finance Management System',NULL,'Petty Cash Voucher',0,'fms/petty_cash_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(75,4,6,9,'Finance Management System',NULL,'Client Fund Voucher',0,'fms/client_fund_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(76,4,6,10,'Finance Management System',NULL,'Payment Request',0,'fms/payment_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(77,4,6,11,'Finance Management System',NULL,'Check Voucher',0,'fms/check_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(78,4,6,12,'Human Resource Information System',NULL,'Examination Report',0,'hris/examination_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(79,4,6,13,'Human Resource Information System',NULL,'Timekeeping Report',0,'hris/timekeeping_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(80,4,6,14,'Human Resource Information System',NULL,'Payroll Report',0,'hris/payroll_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(81,4,6,15,'Human Resource Information System',NULL,'Payroll Adjustment Report',0,'hris/payroll_adjustment_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(82,4,6,16,'Human Resource Information System',NULL,'Payslip Generation',0,'hris/payslip_generation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(83,4,6,17,'Human Resource Information System',NULL,'13th Month Report',0,'hris/13th_month_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(84,4,6,18,'Human Resource Information System',NULL,'PHIC Premium Payment',0,'hris/phic_premium_payment',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(85,4,6,19,'Human Resource Information System',NULL,'SSS Premium Payment',0,'hris/sss_premium_payment',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(86,4,6,20,'Human Resource Information System',NULL,'HDMF Premim Payment',0,'hris/hdmf_premium_payment',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(87,4,6,21,'Human Resource Information System',NULL,'Manpower Management Report',0,'hris/manpower_management_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(88,1,12,5,'Human Resource Information System',NULL,'Employee Dashboard',0,'hris/employee_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(89,2,5,1,'Project Management System',NULL,'Milestone Builder',3,'pms/milestone_builder',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(90,2,5,2,'Project Management System',NULL,'Project Timeline Builder',0,'pms/project_timeline_builder',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(91,2,5,3,'Project Management System',NULL,'Manage Project Budget',3,'pms/manage_project_budget',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(92,2,5,4,'Project Management System',NULL,'Project Management Board',3,'pms/project_management_board',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(93,2,7,1,'Finance Management System',NULL,'Petty Cash Voucher',3,'fms/petty_cash_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(94,2,7,2,'Finance Management System',NULL,'Client Fund Voucher',3,'fms/client_fund_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(95,2,7,3,'Finance Management System',NULL,'Payment Request',3,'fms/payment_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(96,2,7,4,'Finance Management System',NULL,'Check Voucher',3,'fms/check_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(97,2,7,5,'Finance Management System',NULL,'Check Writer',3,'fms/check_writer',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(98,2,7,6,'Finance Management System',NULL,'Check Voucher Liquidation',3,'fms/check_voucher_liquidation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(99,2,7,7,'Finance Management System',NULL,'Billing',3,'fms/billing',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(100,2,7,8,'Finance Management System',NULL,'Collection',3,'fms/collection',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(101,5,9,1,'Human Resource Information System',NULL,'Schedule Setup',0,'hris/schedule_setup',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(102,5,9,2,'Human Resource Information System',NULL,'Orientation Setup',0,'hris/orientation_setup',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(103,2,10,1,'Human Resources Information System',NULL,'Job Posting',0,'hris/job_posting',1,'2021-03-23 23:22:25','2021-03-25 05:25:43'),(104,2,10,2,'Human Resource Information System',NULL,'Applicant Registration',0,'hris/application_registration',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(105,2,10,3,'Human Resource Information System',NULL,'Examination',0,'hris/examination',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(106,2,10,4,'Human Resource Information System',NULL,'Applicant List',0,'hris/applicant_list',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(107,2,10,5,'Human Resource Information System',NULL,'On-boarding',0,'hris/on_boarding',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(108,2,11,1,'Human Resource Information System',NULL,'Employee Attendance',0,'hris/employee_attendance',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(109,2,11,2,'Human Resource Information System',NULL,'Timekeeping',0,'hris/timekeeping',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(110,2,11,3,'Human Resource Information System',NULL,'Payroll',0,'hris/payroll',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(111,2,11,4,'Human Resource Information System',NULL,'Payroll Adjustment',0,'hris/payroll_adjustment',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(112,2,11,5,'Human Resource Information System',NULL,'13th Month',0,'hris/13th_month',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(113,2,8,1,'Human Resource Information System',NULL,'Personnel Requisition',0,'hris/personnel_requisition',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(114,2,8,2,'Human Resources Information System',NULL,'Employee Module',0,'hris/employee_module',1,'2021-03-23 23:22:25','2021-04-19 05:22:53'),(115,2,8,3,'Human Resource Information System',NULL,'Personal Action Notice',0,'hris/personal_action_notice',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(116,2,8,4,'Human Resource Information System',NULL,'Manpower Management',0,'hris/manpower_management',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(117,2,8,5,'Human Resource Information System',NULL,'Employee Relation',0,'hris/employee_relation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(118,2,8,6,'Human Resource Information System',NULL,'Employee Evaluation',0,'hris/employee_evaluation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(119,2,8,7,'Human Resource Information System',NULL,'Employee Management',0,'hris/employee_management',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(120,2,8,8,'Human Resource Information System',NULL,'Memorandum',0,'hris/memorandum',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(121,2,8,9,'Human Resource Information System',NULL,'Employee Award',0,'hris/employee_award',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(122,2,8,10,'Human Resource Information System',NULL,'Leave Monitoring',0,'hris/leave_monitoring',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(123,2,8,11,'Human Resource Information System',NULL,'Training and Development',0,'hris/training_development',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(124,2,8,12,'Human Resource Information System',NULL,'Event Calendar',0,'hris/event_calendar',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(125,2,3,1,'Inventory Management System',NULL,'Canvassing Form',1,'ims/inventory_canvassing',1,'2021-04-20 23:29:40','2021-04-20 23:29:40'),(126,2,3,1,'Inventory Management System',NULL,'Inventory Validation Form',3,'ims/inventory_validation',1,'2021-04-20 23:41:40','2021-04-20 23:41:40'),(127,2,3,1,'Inventory Management System',NULL,'Inventory Price List',0,'ims/inventory_price_list',1,'2021-04-22 16:09:10','2021-04-22 16:09:10');
/*!40000 ALTER TABLE `gen_module_list_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_operations_tbl`
--

DROP TABLE IF EXISTS `gen_operations_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gen_operations_tbl` (
  `userAccountID` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`userAccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_operations_tbl`
--

LOCK TABLES `gen_operations_tbl` WRITE;
/*!40000 ALTER TABLE `gen_operations_tbl` DISABLE KEYS */;
INSERT INTO `gen_operations_tbl` VALUES (1,'Admin','Ako To Si','Natoy','rjpinca@gmail.com','(+63) 099 0908 595','(32) 1321 423','1709 Antel Bldg, Julia Vargas','Male','2021-02-03','http://theblackcoders.com','rjpinca','rjpinca',0.00,'CSS|HTML|JS','01614670888.svg|11614670888.svg|21614670888.svg|31614670888.svg',0,0,'2021-02-26 05:19:00','2021-03-02 07:41:28'),(2,'Operations','Akosi','RJ','hakdog123@gmail.com','(+63) 545 8987 987','(54) 6545 646','1709 Antel Bldg, Julia Vargas','Male','2021-03-05','http://theblackcoders.com','hakdog123','hakdog123',999.95,'CSS|JS','01614668556.svg|11614668556.svg|21614668556.svg|31614668556.svg|41614668556.svg|51614668556.svg',0,1,'2021-02-26 05:25:07','2021-03-02 07:02:36'),(9,'Admin','Charles','Vincent','charlesvincent@gmail.com','(+63) 123 2141 242','(53) 2432 423','Quezon City','Male','2021-03-09','http://theblackcoders.com','charles','charles',0.00,'CSS|HTML|JS','01614668026.svg|11614668026.svg|21614668026.svg|31614668026.svg|41614668026.svg|51614668026.svg',0,1,'2021-03-02 06:52:07','2021-03-02 06:53:46');
/*!40000 ALTER TABLE `gen_operations_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_roles_permission_tbl`
--

DROP TABLE IF EXISTS `gen_roles_permission_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gen_roles_permission_tbl` (
  `permissionID` bigint(20) NOT NULL AUTO_INCREMENT,
  `designationID` bigint(20) NOT NULL,
  `roleID` bigint(20) NOT NULL,
  `moduleID` bigint(20) NOT NULL,
  `permissionStatus` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`permissionID`)
) ENGINE=InnoDB AUTO_INCREMENT=1241 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_roles_permission_tbl`
--

LOCK TABLES `gen_roles_permission_tbl` WRITE;
/*!40000 ALTER TABLE `gen_roles_permission_tbl` DISABLE KEYS */;
INSERT INTO `gen_roles_permission_tbl` VALUES (1,1,0,1,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(2,1,0,2,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(3,1,0,3,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(4,1,0,4,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(5,1,0,5,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(6,1,0,6,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(7,1,0,7,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(8,1,0,8,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(9,1,0,9,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(10,1,0,10,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(11,1,0,11,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(12,1,0,12,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(13,1,0,13,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(14,1,0,14,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(15,1,0,15,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(16,1,0,16,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(17,1,0,17,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(18,1,0,18,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(19,1,0,19,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(20,1,0,20,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(21,1,0,21,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(22,1,0,22,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(23,1,0,23,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(24,1,0,24,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(25,1,0,25,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(26,1,0,26,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(27,1,0,27,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(28,1,0,28,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(29,1,0,29,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(30,1,0,30,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(31,1,0,31,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(32,1,0,32,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(33,1,0,33,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(34,1,0,34,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(35,1,0,35,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(36,1,0,36,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(37,1,0,37,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(38,1,0,38,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(39,1,0,39,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(40,1,0,40,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(41,1,0,41,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(42,1,0,42,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(43,1,0,43,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(44,1,0,44,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(45,1,0,45,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(46,1,0,46,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(47,1,0,47,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(48,1,0,48,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(49,1,0,49,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(50,1,0,50,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(51,1,0,51,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(52,1,0,52,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(53,1,0,53,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(54,1,0,54,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(55,1,0,55,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(56,1,0,56,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(57,1,0,57,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(58,1,0,58,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(59,1,0,59,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(60,1,0,60,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(61,1,0,61,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(62,1,0,62,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(63,1,0,63,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(64,1,0,64,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(65,1,0,65,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(66,1,0,66,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(67,1,0,67,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(68,1,0,68,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(69,1,0,69,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(70,1,0,70,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(71,1,0,71,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(72,1,0,72,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(73,1,0,73,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(74,1,0,74,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(75,1,0,75,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(76,1,0,76,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(77,1,0,77,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(78,1,0,78,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(79,1,0,79,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(80,1,0,80,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(81,1,0,81,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(82,1,0,82,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(83,1,0,83,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(84,1,0,84,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(85,1,0,85,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(86,1,0,86,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(87,1,0,87,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(88,1,0,88,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(89,1,0,89,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(90,1,0,90,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(91,1,0,91,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(92,1,0,92,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(93,1,0,93,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(94,1,0,94,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(95,1,0,95,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(96,1,0,96,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(97,1,0,97,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(98,1,0,98,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(99,1,0,99,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(100,1,0,100,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(101,1,0,101,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(102,1,0,102,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(103,1,0,103,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(104,1,0,104,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(105,1,0,105,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(106,1,0,106,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(107,1,0,107,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(108,1,0,108,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(109,1,0,109,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(110,1,0,110,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(111,1,0,111,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(112,1,0,112,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(113,1,0,113,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(114,1,0,114,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(115,1,0,115,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(116,1,0,116,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(117,1,0,117,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(118,1,0,118,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(119,1,0,119,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(120,1,0,120,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(121,1,0,121,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(122,1,0,122,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(123,1,0,123,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(124,1,0,124,1,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(125,2,0,1,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(126,2,0,2,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(127,2,0,3,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(128,2,0,4,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(129,2,0,5,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(130,2,0,6,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(131,2,0,7,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(132,2,0,8,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(133,2,0,9,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(134,2,0,10,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(135,2,0,11,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(136,2,0,12,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(137,2,0,13,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(138,2,0,14,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(139,2,0,15,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(140,2,0,16,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(141,2,0,17,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(142,2,0,18,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(143,2,0,19,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(144,2,0,20,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(145,2,0,21,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(146,2,0,22,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(147,2,0,23,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(148,2,0,24,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(149,2,0,25,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(150,2,0,26,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(151,2,0,27,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(152,2,0,28,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(153,2,0,29,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(154,2,0,30,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(155,2,0,31,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(156,2,0,32,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(157,2,0,33,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(158,2,0,34,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(159,2,0,35,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(160,2,0,36,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(161,2,0,37,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(162,2,0,38,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(163,2,0,39,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(164,2,0,40,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(165,2,0,41,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(166,2,0,42,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(167,2,0,43,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(168,2,0,44,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(169,2,0,45,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(170,2,0,46,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(171,2,0,47,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(172,2,0,48,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(173,2,0,49,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(174,2,0,50,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(175,2,0,51,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(176,2,0,52,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(177,2,0,53,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(178,2,0,54,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(179,2,0,55,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(180,2,0,56,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(181,2,0,57,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(182,2,0,58,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(183,2,0,59,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(184,2,0,60,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(185,2,0,61,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(186,2,0,62,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(187,2,0,63,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(188,2,0,64,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(189,2,0,65,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(190,2,0,66,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(191,2,0,67,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(192,2,0,68,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(193,2,0,69,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(194,2,0,70,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(195,2,0,71,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(196,2,0,72,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(197,2,0,73,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(198,2,0,74,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(199,2,0,75,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(200,2,0,76,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(201,2,0,77,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(202,2,0,78,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(203,2,0,79,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(204,2,0,80,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(205,2,0,81,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(206,2,0,82,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(207,2,0,83,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(208,2,0,84,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(209,2,0,85,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(210,2,0,86,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(211,2,0,87,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(212,2,0,88,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(213,2,0,89,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(214,2,0,90,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(215,2,0,91,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(216,2,0,92,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(217,2,0,93,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(218,2,0,94,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(219,2,0,95,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(220,2,0,96,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(221,2,0,97,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(222,2,0,98,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(223,2,0,99,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(224,2,0,100,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(225,2,0,101,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(226,2,0,102,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(227,2,0,103,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(228,2,0,104,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(229,2,0,105,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(230,2,0,106,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(231,2,0,107,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(232,2,0,108,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(233,2,0,109,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(234,2,0,110,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(235,2,0,111,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(236,2,0,112,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(237,2,0,113,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(238,2,0,114,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(239,2,0,115,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(240,2,0,116,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(241,2,0,117,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(242,2,0,118,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(243,2,0,119,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(244,2,0,120,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(245,2,0,121,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(246,2,0,122,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(247,2,0,123,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(248,2,0,124,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(249,3,0,1,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(250,3,0,2,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(251,3,0,3,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(252,3,0,4,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(253,3,0,5,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(254,3,0,6,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(255,3,0,7,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(256,3,0,8,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(257,3,0,9,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(258,3,0,10,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(259,3,0,11,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(260,3,0,12,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(261,3,0,13,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(262,3,0,14,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(263,3,0,15,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(264,3,0,16,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(265,3,0,17,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(266,3,0,18,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(267,3,0,19,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(268,3,0,20,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(269,3,0,21,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(270,3,0,22,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(271,3,0,23,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(272,3,0,24,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(273,3,0,25,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(274,3,0,26,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(275,3,0,27,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(276,3,0,28,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(277,3,0,29,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(278,3,0,30,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(279,3,0,31,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(280,3,0,32,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(281,3,0,33,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(282,3,0,34,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(283,3,0,35,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(284,3,0,36,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(285,3,0,37,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(286,3,0,38,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(287,3,0,39,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(288,3,0,40,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(289,3,0,41,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(290,3,0,42,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(291,3,0,43,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(292,3,0,44,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(293,3,0,45,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(294,3,0,46,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(295,3,0,47,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(296,3,0,48,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(297,3,0,49,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(298,3,0,50,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(299,3,0,51,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(300,3,0,52,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(301,3,0,53,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(302,3,0,54,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(303,3,0,55,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(304,3,0,56,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(305,3,0,57,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(306,3,0,58,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(307,3,0,59,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(308,3,0,60,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(309,3,0,61,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(310,3,0,62,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(311,3,0,63,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(312,3,0,64,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(313,3,0,65,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(314,3,0,66,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(315,3,0,67,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(316,3,0,68,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(317,3,0,69,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(318,3,0,70,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(319,3,0,71,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(320,3,0,72,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(321,3,0,73,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(322,3,0,74,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(323,3,0,75,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(324,3,0,76,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(325,3,0,77,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(326,3,0,78,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(327,3,0,79,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(328,3,0,80,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(329,3,0,81,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(330,3,0,82,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(331,3,0,83,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(332,3,0,84,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(333,3,0,85,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(334,3,0,86,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(335,3,0,87,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(336,3,0,88,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(337,3,0,89,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(338,3,0,90,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(339,3,0,91,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(340,3,0,92,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(341,3,0,93,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(342,3,0,94,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(343,3,0,95,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(344,3,0,96,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(345,3,0,97,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(346,3,0,98,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(347,3,0,99,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(348,3,0,100,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(349,3,0,101,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(350,3,0,102,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(351,3,0,103,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(352,3,0,104,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(353,3,0,105,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(354,3,0,106,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(355,3,0,107,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(356,3,0,108,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(357,3,0,109,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(358,3,0,110,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(359,3,0,111,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(360,3,0,112,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(361,3,0,113,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(362,3,0,114,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(363,3,0,115,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(364,3,0,116,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(365,3,0,117,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(366,3,0,118,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(367,3,0,119,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(368,3,0,120,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(369,3,0,121,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(370,3,0,122,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(371,3,0,123,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(372,3,0,124,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(373,4,0,1,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(374,4,0,2,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(375,4,0,3,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(376,4,0,4,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(377,4,0,5,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(378,4,0,6,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(379,4,0,7,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(380,4,0,8,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(381,4,0,9,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(382,4,0,10,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(383,4,0,11,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(384,4,0,12,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(385,4,0,13,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(386,4,0,14,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(387,4,0,15,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(388,4,0,16,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(389,4,0,17,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(390,4,0,18,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(391,4,0,19,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(392,4,0,20,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(393,4,0,21,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(394,4,0,22,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(395,4,0,23,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(396,4,0,24,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(397,4,0,25,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(398,4,0,26,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(399,4,0,27,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(400,4,0,28,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(401,4,0,29,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(402,4,0,30,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(403,4,0,31,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(404,4,0,32,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(405,4,0,33,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(406,4,0,34,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(407,4,0,35,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(408,4,0,36,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(409,4,0,37,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(410,4,0,38,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(411,4,0,39,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(412,4,0,40,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(413,4,0,41,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(414,4,0,42,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(415,4,0,43,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(416,4,0,44,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(417,4,0,45,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(418,4,0,46,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(419,4,0,47,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(420,4,0,48,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(421,4,0,49,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(422,4,0,50,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(423,4,0,51,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(424,4,0,52,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(425,4,0,53,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(426,4,0,54,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(427,4,0,55,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(428,4,0,56,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(429,4,0,57,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(430,4,0,58,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(431,4,0,59,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(432,4,0,60,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(433,4,0,61,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(434,4,0,62,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(435,4,0,63,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(436,4,0,64,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(437,4,0,65,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(438,4,0,66,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(439,4,0,67,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(440,4,0,68,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(441,4,0,69,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(442,4,0,70,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(443,4,0,71,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(444,4,0,72,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(445,4,0,73,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(446,4,0,74,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(447,4,0,75,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(448,4,0,76,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(449,4,0,77,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(450,4,0,78,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(451,4,0,79,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(452,4,0,80,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(453,4,0,81,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(454,4,0,82,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(455,4,0,83,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(456,4,0,84,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(457,4,0,85,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(458,4,0,86,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(459,4,0,87,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(460,4,0,88,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(461,4,0,89,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(462,4,0,90,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(463,4,0,91,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(464,4,0,92,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(465,4,0,93,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(466,4,0,94,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(467,4,0,95,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(468,4,0,96,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(469,4,0,97,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(470,4,0,98,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(471,4,0,99,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(472,4,0,100,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(473,4,0,101,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(474,4,0,102,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(475,4,0,103,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(476,4,0,104,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(477,4,0,105,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(478,4,0,106,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(479,4,0,107,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(480,4,0,108,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(481,4,0,109,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(482,4,0,110,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(483,4,0,111,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(484,4,0,112,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(485,4,0,113,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(486,4,0,114,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(487,4,0,115,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(488,4,0,116,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(489,4,0,117,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(490,4,0,118,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(491,4,0,119,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(492,4,0,120,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(493,4,0,121,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(494,4,0,122,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(495,4,0,123,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(496,4,0,124,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(497,5,0,1,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(498,5,0,2,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(499,5,0,3,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(500,5,0,4,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(501,5,0,5,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(502,5,0,6,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(503,5,0,7,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(504,5,0,8,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(505,5,0,9,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(506,5,0,10,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(507,5,0,11,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(508,5,0,12,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(509,5,0,13,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(510,5,0,14,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(511,5,0,15,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(512,5,0,16,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(513,5,0,17,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(514,5,0,18,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(515,5,0,19,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(516,5,0,20,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(517,5,0,21,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(518,5,0,22,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(519,5,0,23,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(520,5,0,24,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(521,5,0,25,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(522,5,0,26,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(523,5,0,27,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(524,5,0,28,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(525,5,0,29,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(526,5,0,30,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(527,5,0,31,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(528,5,0,32,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(529,5,0,33,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(530,5,0,34,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(531,5,0,35,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(532,5,0,36,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(533,5,0,37,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(534,5,0,38,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(535,5,0,39,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(536,5,0,40,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(537,5,0,41,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(538,5,0,42,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(539,5,0,43,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(540,5,0,44,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(541,5,0,45,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(542,5,0,46,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(543,5,0,47,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(544,5,0,48,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(545,5,0,49,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(546,5,0,50,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(547,5,0,51,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(548,5,0,52,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(549,5,0,53,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(550,5,0,54,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(551,5,0,55,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(552,5,0,56,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(553,5,0,57,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(554,5,0,58,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(555,5,0,59,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(556,5,0,60,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(557,5,0,61,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(558,5,0,62,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(559,5,0,63,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(560,5,0,64,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(561,5,0,65,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(562,5,0,66,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(563,5,0,67,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(564,5,0,68,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(565,5,0,69,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(566,5,0,70,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(567,5,0,71,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(568,5,0,72,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(569,5,0,73,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(570,5,0,74,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(571,5,0,75,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(572,5,0,76,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(573,5,0,77,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(574,5,0,78,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(575,5,0,79,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(576,5,0,80,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(577,5,0,81,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(578,5,0,82,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(579,5,0,83,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(580,5,0,84,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(581,5,0,85,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(582,5,0,86,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(583,5,0,87,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(584,5,0,88,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(585,5,0,89,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(586,5,0,90,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(587,5,0,91,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(588,5,0,92,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(589,5,0,93,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(590,5,0,94,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(591,5,0,95,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(592,5,0,96,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(593,5,0,97,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(594,5,0,98,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(595,5,0,99,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(596,5,0,100,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(597,5,0,101,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(598,5,0,102,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(599,5,0,103,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(600,5,0,104,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(601,5,0,105,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(602,5,0,106,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(603,5,0,107,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(604,5,0,108,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(605,5,0,109,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(606,5,0,110,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(607,5,0,111,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(608,5,0,112,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(609,5,0,113,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(610,5,0,114,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(611,5,0,115,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(612,5,0,116,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(613,5,0,117,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(614,5,0,118,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(615,5,0,119,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(616,5,0,120,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(617,5,0,121,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(618,5,0,122,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(619,5,0,123,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(620,5,0,124,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(621,6,0,1,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(622,6,0,2,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(623,6,0,3,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(624,6,0,4,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(625,6,0,5,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(626,6,0,6,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(627,6,0,7,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(628,6,0,8,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(629,6,0,9,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(630,6,0,10,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(631,6,0,11,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(632,6,0,12,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(633,6,0,13,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(634,6,0,14,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(635,6,0,15,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(636,6,0,16,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(637,6,0,17,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(638,6,0,18,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(639,6,0,19,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(640,6,0,20,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(641,6,0,21,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(642,6,0,22,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(643,6,0,23,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(644,6,0,24,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(645,6,0,25,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(646,6,0,26,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(647,6,0,27,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(648,6,0,28,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(649,6,0,29,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(650,6,0,30,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(651,6,0,31,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(652,6,0,32,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(653,6,0,33,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(654,6,0,34,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(655,6,0,35,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(656,6,0,36,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(657,6,0,37,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(658,6,0,38,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(659,6,0,39,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(660,6,0,40,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(661,6,0,41,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(662,6,0,42,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(663,6,0,43,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(664,6,0,44,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(665,6,0,45,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(666,6,0,46,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(667,6,0,47,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(668,6,0,48,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(669,6,0,49,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(670,6,0,50,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(671,6,0,51,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(672,6,0,52,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(673,6,0,53,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(674,6,0,54,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(675,6,0,55,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(676,6,0,56,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(677,6,0,57,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(678,6,0,58,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(679,6,0,59,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(680,6,0,60,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(681,6,0,61,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(682,6,0,62,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(683,6,0,63,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(684,6,0,64,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(685,6,0,65,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(686,6,0,66,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(687,6,0,67,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(688,6,0,68,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(689,6,0,69,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(690,6,0,70,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(691,6,0,71,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(692,6,0,72,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(693,6,0,73,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(694,6,0,74,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(695,6,0,75,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(696,6,0,76,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(697,6,0,77,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(698,6,0,78,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(699,6,0,79,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(700,6,0,80,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(701,6,0,81,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(702,6,0,82,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(703,6,0,83,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(704,6,0,84,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(705,6,0,85,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(706,6,0,86,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(707,6,0,87,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(708,6,0,88,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(709,6,0,89,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(710,6,0,90,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(711,6,0,91,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(712,6,0,92,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(713,6,0,93,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(714,6,0,94,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(715,6,0,95,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(716,6,0,96,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(717,6,0,97,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(718,6,0,98,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(719,6,0,99,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(720,6,0,100,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(721,6,0,101,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(722,6,0,102,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(723,6,0,103,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(724,6,0,104,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(725,6,0,105,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(726,6,0,106,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(727,6,0,107,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(728,6,0,108,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(729,6,0,109,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(730,6,0,110,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(731,6,0,111,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(732,6,0,112,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(733,6,0,113,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(734,6,0,114,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(735,6,0,115,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(736,6,0,116,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(737,6,0,117,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(738,6,0,118,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(739,6,0,119,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(740,6,0,120,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(741,6,0,121,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(742,6,0,122,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(743,6,0,123,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(744,6,0,124,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(745,7,0,1,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(746,7,0,2,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(747,7,0,3,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(748,7,0,4,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(749,7,0,5,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(750,7,0,6,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(751,7,0,7,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(752,7,0,8,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(753,7,0,9,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(754,7,0,10,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(755,7,0,11,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(756,7,0,12,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(757,7,0,13,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(758,7,0,14,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(759,7,0,15,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(760,7,0,16,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(761,7,0,17,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(762,7,0,18,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(763,7,0,19,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(764,7,0,20,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(765,7,0,21,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(766,7,0,22,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(767,7,0,23,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(768,7,0,24,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(769,7,0,25,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(770,7,0,26,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(771,7,0,27,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(772,7,0,28,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(773,7,0,29,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(774,7,0,30,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(775,7,0,31,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(776,7,0,32,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(777,7,0,33,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(778,7,0,34,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(779,7,0,35,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(780,7,0,36,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(781,7,0,37,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(782,7,0,38,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(783,7,0,39,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(784,7,0,40,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(785,7,0,41,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(786,7,0,42,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(787,7,0,43,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(788,7,0,44,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(789,7,0,45,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(790,7,0,46,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(791,7,0,47,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(792,7,0,48,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(793,7,0,49,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(794,7,0,50,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(795,7,0,51,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(796,7,0,52,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(797,7,0,53,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(798,7,0,54,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(799,7,0,55,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(800,7,0,56,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(801,7,0,57,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(802,7,0,58,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(803,7,0,59,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(804,7,0,60,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(805,7,0,61,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(806,7,0,62,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(807,7,0,63,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(808,7,0,64,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(809,7,0,65,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(810,7,0,66,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(811,7,0,67,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(812,7,0,68,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(813,7,0,69,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(814,7,0,70,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(815,7,0,71,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(816,7,0,72,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(817,7,0,73,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(818,7,0,74,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(819,7,0,75,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(820,7,0,76,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(821,7,0,77,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(822,7,0,78,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(823,7,0,79,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(824,7,0,80,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(825,7,0,81,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(826,7,0,82,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(827,7,0,83,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(828,7,0,84,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(829,7,0,85,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(830,7,0,86,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(831,7,0,87,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(832,7,0,88,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(833,7,0,89,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(834,7,0,90,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(835,7,0,91,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(836,7,0,92,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(837,7,0,93,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(838,7,0,94,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(839,7,0,95,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(840,7,0,96,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(841,7,0,97,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(842,7,0,98,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(843,7,0,99,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(844,7,0,100,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(845,7,0,101,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(846,7,0,102,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(847,7,0,103,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(848,7,0,104,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(849,7,0,105,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(850,7,0,106,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(851,7,0,107,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(852,7,0,108,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(853,7,0,109,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(854,7,0,110,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(855,7,0,111,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(856,7,0,112,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(857,7,0,113,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(858,7,0,114,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(859,7,0,115,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(860,7,0,116,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(861,7,0,117,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(862,7,0,118,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(863,7,0,119,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(864,7,0,120,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(865,7,0,121,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(866,7,0,122,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(867,7,0,123,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(868,7,0,124,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(869,8,0,1,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(870,8,0,2,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(871,8,0,3,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(872,8,0,4,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(873,8,0,5,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(874,8,0,6,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(875,8,0,7,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(876,8,0,8,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(877,8,0,9,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(878,8,0,10,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(879,8,0,11,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(880,8,0,12,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(881,8,0,13,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(882,8,0,14,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(883,8,0,15,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(884,8,0,16,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(885,8,0,17,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(886,8,0,18,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(887,8,0,19,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(888,8,0,20,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(889,8,0,21,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(890,8,0,22,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(891,8,0,23,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(892,8,0,24,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(893,8,0,25,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(894,8,0,26,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(895,8,0,27,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(896,8,0,28,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(897,8,0,29,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(898,8,0,30,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(899,8,0,31,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(900,8,0,32,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(901,8,0,33,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(902,8,0,34,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(903,8,0,35,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(904,8,0,36,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(905,8,0,37,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(906,8,0,38,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(907,8,0,39,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(908,8,0,40,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(909,8,0,41,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(910,8,0,42,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(911,8,0,43,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(912,8,0,44,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(913,8,0,45,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(914,8,0,46,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(915,8,0,47,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(916,8,0,48,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(917,8,0,49,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(918,8,0,50,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(919,8,0,51,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(920,8,0,52,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(921,8,0,53,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(922,8,0,54,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(923,8,0,55,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(924,8,0,56,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(925,8,0,57,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(926,8,0,58,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(927,8,0,59,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(928,8,0,60,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(929,8,0,61,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(930,8,0,62,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(931,8,0,63,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(932,8,0,64,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(933,8,0,65,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(934,8,0,66,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(935,8,0,67,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(936,8,0,68,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(937,8,0,69,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(938,8,0,70,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(939,8,0,71,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(940,8,0,72,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(941,8,0,73,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(942,8,0,74,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(943,8,0,75,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(944,8,0,76,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(945,8,0,77,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(946,8,0,78,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(947,8,0,79,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(948,8,0,80,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(949,8,0,81,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(950,8,0,82,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(951,8,0,83,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(952,8,0,84,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(953,8,0,85,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(954,8,0,86,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(955,8,0,87,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(956,8,0,88,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(957,8,0,89,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(958,8,0,90,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(959,8,0,91,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(960,8,0,92,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(961,8,0,93,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(962,8,0,94,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(963,8,0,95,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(964,8,0,96,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(965,8,0,97,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(966,8,0,98,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(967,8,0,99,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(968,8,0,100,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(969,8,0,101,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(970,8,0,102,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(971,8,0,103,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(972,8,0,104,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(973,8,0,105,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(974,8,0,106,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(975,8,0,107,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(976,8,0,108,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(977,8,0,109,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(978,8,0,110,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(979,8,0,111,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(980,8,0,112,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(981,8,0,113,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(982,8,0,114,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(983,8,0,115,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(984,8,0,116,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(985,8,0,117,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(986,8,0,118,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(987,8,0,119,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(988,8,0,120,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(989,8,0,121,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(990,8,0,122,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(991,8,0,123,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(992,8,0,124,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(993,9,0,1,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(994,9,0,2,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(995,9,0,3,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(996,9,0,4,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(997,9,0,5,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(998,9,0,6,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(999,9,0,7,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1000,9,0,8,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1001,9,0,9,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1002,9,0,10,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1003,9,0,11,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1004,9,0,12,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1005,9,0,13,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1006,9,0,14,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1007,9,0,15,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1008,9,0,16,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1009,9,0,17,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1010,9,0,18,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1011,9,0,19,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1012,9,0,20,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1013,9,0,21,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1014,9,0,22,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1015,9,0,23,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1016,9,0,24,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1017,9,0,25,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1018,9,0,26,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1019,9,0,27,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1020,9,0,28,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1021,9,0,29,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1022,9,0,30,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1023,9,0,31,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1024,9,0,32,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1025,9,0,33,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1026,9,0,34,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1027,9,0,35,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1028,9,0,36,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1029,9,0,37,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1030,9,0,38,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1031,9,0,39,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1032,9,0,40,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1033,9,0,41,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1034,9,0,42,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1035,9,0,43,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1036,9,0,44,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1037,9,0,45,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1038,9,0,46,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1039,9,0,47,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1040,9,0,48,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1041,9,0,49,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1042,9,0,50,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1043,9,0,51,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1044,9,0,52,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1045,9,0,53,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1046,9,0,54,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1047,9,0,55,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1048,9,0,56,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1049,9,0,57,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1050,9,0,58,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1051,9,0,59,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1052,9,0,60,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1053,9,0,61,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1054,9,0,62,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1055,9,0,63,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1056,9,0,64,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1057,9,0,65,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1058,9,0,66,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1059,9,0,67,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1060,9,0,68,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1061,9,0,69,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1062,9,0,70,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1063,9,0,71,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1064,9,0,72,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1065,9,0,73,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1066,9,0,74,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1067,9,0,75,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1068,9,0,76,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1069,9,0,77,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1070,9,0,78,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1071,9,0,79,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1072,9,0,80,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1073,9,0,81,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1074,9,0,82,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1075,9,0,83,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1076,9,0,84,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1077,9,0,85,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1078,9,0,86,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1079,9,0,87,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1080,9,0,88,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1081,9,0,89,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1082,9,0,90,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1083,9,0,91,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1084,9,0,92,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1085,9,0,93,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1086,9,0,94,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1087,9,0,95,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1088,9,0,96,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1089,9,0,97,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1090,9,0,98,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1091,9,0,99,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1092,9,0,100,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1093,9,0,101,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1094,9,0,102,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1095,9,0,103,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1096,9,0,104,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1097,9,0,105,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1098,9,0,106,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1099,9,0,107,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1100,9,0,108,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1101,9,0,109,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1102,9,0,110,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1103,9,0,111,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1104,9,0,112,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1105,9,0,113,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1106,9,0,114,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1107,9,0,115,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1108,9,0,116,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1109,9,0,117,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1110,9,0,118,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1111,9,0,119,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1112,9,0,120,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1113,9,0,121,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1114,9,0,122,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1115,9,0,123,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1116,9,0,124,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1117,10,0,1,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1118,10,0,2,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1119,10,0,3,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1120,10,0,4,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1121,10,0,5,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1122,10,0,6,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1123,10,0,7,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1124,10,0,8,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1125,10,0,9,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1126,10,0,10,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1127,10,0,11,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1128,10,0,12,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1129,10,0,13,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1130,10,0,14,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1131,10,0,15,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1132,10,0,16,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1133,10,0,17,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1134,10,0,18,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1135,10,0,19,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1136,10,0,20,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1137,10,0,21,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1138,10,0,22,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1139,10,0,23,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1140,10,0,24,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1141,10,0,25,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1142,10,0,26,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1143,10,0,27,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1144,10,0,28,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1145,10,0,29,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1146,10,0,30,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1147,10,0,31,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1148,10,0,32,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1149,10,0,33,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1150,10,0,34,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1151,10,0,35,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1152,10,0,36,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1153,10,0,37,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1154,10,0,38,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1155,10,0,39,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1156,10,0,40,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1157,10,0,41,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1158,10,0,42,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1159,10,0,43,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1160,10,0,44,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1161,10,0,45,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1162,10,0,46,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1163,10,0,47,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1164,10,0,48,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1165,10,0,49,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1166,10,0,50,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1167,10,0,51,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1168,10,0,52,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1169,10,0,53,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1170,10,0,54,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1171,10,0,55,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1172,10,0,56,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1173,10,0,57,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1174,10,0,58,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1175,10,0,59,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1176,10,0,60,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1177,10,0,61,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1178,10,0,62,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1179,10,0,63,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1180,10,0,64,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1181,10,0,65,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1182,10,0,66,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1183,10,0,67,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1184,10,0,68,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1185,10,0,69,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1186,10,0,70,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1187,10,0,71,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1188,10,0,72,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1189,10,0,73,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1190,10,0,74,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1191,10,0,75,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1192,10,0,76,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1193,10,0,77,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1194,10,0,78,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1195,10,0,79,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1196,10,0,80,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1197,10,0,81,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1198,10,0,82,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1199,10,0,83,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1200,10,0,84,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1201,10,0,85,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1202,10,0,86,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1203,10,0,87,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1204,10,0,88,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1205,10,0,89,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1206,10,0,90,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1207,10,0,91,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1208,10,0,92,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1209,10,0,93,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1210,10,0,94,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1211,10,0,95,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1212,10,0,96,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1213,10,0,97,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1214,10,0,98,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1215,10,0,99,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1216,10,0,100,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1217,10,0,101,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1218,10,0,102,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1219,10,0,103,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1220,10,0,104,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1221,10,0,105,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1222,10,0,106,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1223,10,0,107,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1224,10,0,108,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1225,10,0,109,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1226,10,0,110,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1227,10,0,111,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1228,10,0,112,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1229,10,0,113,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1230,10,0,114,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1231,10,0,115,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1232,10,0,116,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1233,10,0,117,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1234,10,0,118,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1235,10,0,119,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1236,10,0,120,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1237,10,0,121,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1238,10,0,122,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1239,10,0,123,0,'2021-04-26 00:00:33','2021-04-26 00:00:33'),(1240,10,0,124,0,'2021-04-26 00:00:33','2021-04-26 00:00:33');
/*!40000 ALTER TABLE `gen_roles_permission_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_system_notification_tbl`
--

DROP TABLE IF EXISTS `gen_system_notification_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gen_system_notification_tbl` (
  `notificationID` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`notificationID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_system_notification_tbl`
--

LOCK TABLES `gen_system_notification_tbl` WRITE;
/*!40000 ALTER TABLE `gen_system_notification_tbl` DISABLE KEYS */;
INSERT INTO `gen_system_notification_tbl` VALUES (1,3,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,3,'2021-04-18 23:29:09','2021-04-18 23:29:24'),(2,1,46,1,'Purchase Request','PR-21-00001: Your request has been denied.',1,1,3,0,'2021-04-19 00:01:22','2021-04-20 07:11:31'),(3,3,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,3,'2021-04-19 00:21:05','2021-04-19 00:22:17'),(4,1,46,4,'Purchase Request','PR-21-00004: Your request has been denied.',1,1,3,0,'2021-04-19 00:22:27','2021-04-20 07:11:31'),(5,3,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-04-19 00:24:17','2021-04-19 00:24:17'),(6,3,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,3,'2021-04-21 06:17:57','2021-04-21 06:18:14'),(7,1,46,2,'Purchase Request','PR-21-00002: Your request has been denied.',1,0,3,0,'2021-04-21 06:18:23','2021-04-21 06:18:23'),(8,3,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-04-21 06:18:36','2021-04-21 06:18:36');
/*!40000 ALTER TABLE `gen_system_notification_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_user_account_tbl`
--

DROP TABLE IF EXISTS `gen_user_account_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gen_user_account_tbl` (
  `userAccountID` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`userAccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_user_account_tbl`
--

LOCK TABLES `gen_user_account_tbl` WRITE;
/*!40000 ALTER TABLE `gen_user_account_tbl` DISABLE KEYS */;
INSERT INTO `gen_user_account_tbl` VALUES (1,'1','Ako To Si','Natoy','rjpinca@gmail.com','(+63) 099 0908 595','(32) 1321 423','1709 Antel Bldg, Julia Vargas','Male','2021-02-03','http://theblackcoders.com','admin','admin',0.00,'','01614667776.svg',1,1,'2021-02-26 05:19:00','2021-03-22 01:45:34'),(2,'2','Akosi','RJ','hakdog123@gmail.com','(+63) 545 8987 987','(54) 6545 646','1709 Antel Bldg, Julia Vargas','Male','2021-03-05','http://theblackcoders.com','arjay','arjay',999.95,'CSS|JS','01614668556.svg|11614668556.svg|21614668556.svg|31614668556.svg|41614668556.svg|51614668556.svg',1,1,'2021-02-26 05:25:07','2021-03-23 03:40:47'),(3,'3','Charles','Vincent','charlesvincent@gmail.com','(+63) 123 2141 242','(53) 2432 423','Quezon City','Male','2021-03-09','http://theblackcoders.com','charles','charles',0.00,'CSS|HTML|JS','01614668026.svg|11614668026.svg|21614668026.svg|31614668026.svg|41614668026.svg|51614668026.svg',1,1,'2021-03-02 06:52:07','2021-03-23 03:40:50'),(4,'4','Joseph','Berongoy','joseph@gmail.com','0909900905965','556565956','Pasig City','Male','2021-03-10','theblackcoders.com','joseph','joseph',NULL,NULL,NULL,1,1,'2021-03-21 23:56:09','2021-03-23 03:40:53');
/*!40000 ALTER TABLE `gen_user_account_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gen_user_role_tbl`
--

DROP TABLE IF EXISTS `gen_user_role_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gen_user_role_tbl` (
  `roleID` bigint(20) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(100) NOT NULL,
  `roleStatus` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`roleID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_user_role_tbl`
--

LOCK TABLES `gen_user_role_tbl` WRITE;
/*!40000 ALTER TABLE `gen_user_role_tbl` DISABLE KEYS */;
INSERT INTO `gen_user_role_tbl` VALUES (1,'Administrator',1,'2021-03-08 00:29:00','2021-03-08 00:44:40'),(2,'Network Engineer',1,'2021-03-08 02:14:34','2021-03-08 04:02:49'),(3,'Human Resources',1,'2021-03-08 02:14:55','2021-03-08 05:02:10'),(4,'Junior Developer',1,'2021-03-08 03:17:38','2021-03-08 03:17:38'),(5,'Senior Developer',1,'2021-03-08 03:18:39','2021-03-08 05:17:41'),(6,'Finance',1,'2021-03-08 03:19:57','2021-03-08 03:19:57'),(7,'Installer',1,'2021-03-08 03:46:14','2021-03-08 04:03:08'),(8,'IT Admin',1,'2021-03-08 03:46:45','2021-03-08 03:46:45'),(9,'Quality Analyst',1,'2021-03-09 23:31:46','2021-03-09 23:31:46'),(10,'Marketing',1,'2021-03-09 23:33:00','2021-03-09 23:33:00'),(16,'Testt',0,'2021-03-23 03:30:36','2021-03-23 03:30:36');
/*!40000 ALTER TABLE `gen_user_role_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_award_tbl`
--

DROP TABLE IF EXISTS `hris_award_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_award_tbl` (
  `awardID` bigint(20) NOT NULL AUTO_INCREMENT,
  `awardTitle` text NOT NULL,
  `awardDescription` text NOT NULL,
  `awardSignatories` text NOT NULL,
  `awardStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`awardID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_award_tbl`
--

LOCK TABLES `hris_award_tbl` WRITE;
/*!40000 ALTER TABLE `hris_award_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_award_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_branch_tbl`
--

DROP TABLE IF EXISTS `hris_branch_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_branch_tbl` (
  `branchID` bigint(20) NOT NULL AUTO_INCREMENT,
  `branchCode` text NOT NULL,
  `branchName` text NOT NULL,
  `branchStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`branchID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_branch_tbl`
--

LOCK TABLES `hris_branch_tbl` WRITE;
/*!40000 ALTER TABLE `hris_branch_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_branch_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_change_schedule_tbl`
--

DROP TABLE IF EXISTS `hris_change_schedule_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_change_schedule_tbl` (
  `changeScheduleID` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`changeScheduleID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_change_schedule_tbl`
--

LOCK TABLES `hris_change_schedule_tbl` WRITE;
/*!40000 ALTER TABLE `hris_change_schedule_tbl` DISABLE KEYS */;
INSERT INTO `hris_change_schedule_tbl` VALUES (1,2,'2021-04-12','08:00:00','17:00:00','TEST','3|4|1',NULL,NULL,1,NULL,'2021-04-11 23:07:54',2,2,'2021-04-11 23:07:54','2021-04-11 23:07:55'),(2,1,'2021-04-12','08:00:00','17:00:00','TEST',NULL,NULL,NULL,4,NULL,NULL,1,1,'2021-04-12 00:39:07','2021-04-16 07:41:17'),(3,1,'2021-04-12','08:00:00','17:00:00','TEST','1','2','2021-04-12 14:22:10',2,NULL,'2021-04-12 06:22:10',1,1,'2021-04-12 00:41:13','2021-04-12 06:22:12'),(4,1,'2021-04-16','08:00:00','17:00:00','TEST',NULL,NULL,NULL,4,NULL,NULL,1,1,'2021-04-16 07:41:30','2021-04-16 07:41:37');
/*!40000 ALTER TABLE `hris_change_schedule_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_code_conduct_category_tbl`
--

DROP TABLE IF EXISTS `hris_code_conduct_category_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_code_conduct_category_tbl` (
  `codeConductCategoryID` bigint(20) NOT NULL AUTO_INCREMENT,
  `codeConductCategoryName` text NOT NULL,
  `codeConductCategoryStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`codeConductCategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_code_conduct_category_tbl`
--

LOCK TABLES `hris_code_conduct_category_tbl` WRITE;
/*!40000 ALTER TABLE `hris_code_conduct_category_tbl` DISABLE KEYS */;
INSERT INTO `hris_code_conduct_category_tbl` VALUES (1,'Test',1,1,1,'2021-03-24 05:25:40','2021-03-24 05:25:40');
/*!40000 ALTER TABLE `hris_code_conduct_category_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_code_conduct_section_tbl`
--

DROP TABLE IF EXISTS `hris_code_conduct_section_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_code_conduct_section_tbl` (
  `codeConductSectionID` bigint(20) NOT NULL AUTO_INCREMENT,
  `codeConductCategoryID` bigint(20) NOT NULL,
  `codeConductSection` varchar(10) NOT NULL,
  `codeConductSectionDescription` text NOT NULL,
  `codeConductSectionStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`codeConductSectionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_code_conduct_section_tbl`
--

LOCK TABLES `hris_code_conduct_section_tbl` WRITE;
/*!40000 ALTER TABLE `hris_code_conduct_section_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_code_conduct_section_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_department_tbl`
--

DROP TABLE IF EXISTS `hris_department_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_department_tbl` (
  `departmentID` bigint(20) NOT NULL AUTO_INCREMENT,
  `departmentCode` varchar(255) NOT NULL,
  `departmentName` varchar(255) NOT NULL,
  `departmentStatus` int(50) NOT NULL,
  `datecreated` text NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`departmentID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_department_tbl`
--

LOCK TABLES `hris_department_tbl` WRITE;
/*!40000 ALTER TABLE `hris_department_tbl` DISABLE KEYS */;
INSERT INTO `hris_department_tbl` VALUES (1,'DPT-21-00001','Operations',1,'2021-03-24 13:06:48',1,1,'2021-03-24 13:06:48','2021-03-26 13:42:25');
/*!40000 ALTER TABLE `hris_department_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_designation_tbl`
--

DROP TABLE IF EXISTS `hris_designation_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_designation_tbl` (
  `designationID` bigint(20) NOT NULL AUTO_INCREMENT,
  `designationCode` varchar(255) NOT NULL,
  `departmentID` bigint(20) NOT NULL,
  `designationName` varchar(255) NOT NULL,
  `designationStatus` int(50) NOT NULL,
  `datecreated` date NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`designationID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_designation_tbl`
--

LOCK TABLES `hris_designation_tbl` WRITE;
/*!40000 ALTER TABLE `hris_designation_tbl` DISABLE KEYS */;
INSERT INTO `hris_designation_tbl` VALUES (1,'DSN-21-00001',1,'Administrator',1,'2021-03-24',1,1,'2021-03-24 05:07:13','2021-04-07 01:17:08'),(2,'DSN-21-00002',1,'Network Engineer',1,'2021-03-26',1,1,'2021-03-26 05:43:25','2021-04-07 01:17:24'),(3,'DSN-21-00003',1,'Human Resources',1,'2021-03-24',1,1,'2021-03-24 05:07:13','2021-04-07 01:17:08'),(4,'DSN-21-00004',1,'Junior Developer',1,'2021-03-26',1,1,'2021-03-26 05:43:25','2021-04-07 01:17:24'),(5,'DSN-21-00005',1,'Senior Developer',1,'2021-03-24',1,1,'2021-03-24 05:07:13','2021-04-07 01:17:08'),(6,'DSN-21-00006',1,'Finance',1,'2021-03-26',1,1,'2021-03-26 05:43:25','2021-04-07 01:17:24'),(7,'DSN-21-00007',1,'Installer',1,'2021-03-24',1,1,'2021-03-24 05:07:13','2021-04-07 01:17:08'),(8,'DSN-21-00008',1,'IT Admin',1,'2021-03-26',1,1,'2021-03-26 05:43:25','2021-04-07 01:17:24'),(9,'DSN-21-00009',1,'Quality Analyst',1,'2021-03-24',1,1,'2021-03-24 05:07:13','2021-04-07 01:17:08'),(10,'DSN-21-00010',1,'Marketing',0,'2021-03-26',1,1,'2021-03-26 05:43:25','2021-04-07 01:20:53');
/*!40000 ALTER TABLE `hris_designation_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_employee_documents_tbl`
--

DROP TABLE IF EXISTS `hris_employee_documents_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_employee_documents_tbl` (
  `documentID` bigint(20) NOT NULL AUTO_INCREMENT,
  `employeeID` bigint(20) NOT NULL,
  `documentType` varchar(100) DEFAULT NULL,
  `filename` text DEFAULT NULL,
  `filetype` varchar(20) DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`documentID`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_employee_documents_tbl`
--

LOCK TABLES `hris_employee_documents_tbl` WRITE;
/*!40000 ALTER TABLE `hris_employee_documents_tbl` DISABLE KEYS */;
INSERT INTO `hris_employee_documents_tbl` VALUES (92,9,'Others','System Coding Standardso01619164393.docx','application',1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(93,19,'Contract and Appraisal','System Coding Standardsca01619165689.docx','application',1,1,'2021-04-23 08:14:49','2021-04-23 08:14:49'),(94,19,'Training and Development','IMG_1956td01619165720.JPG','image',1,1,'2021-04-23 08:15:20','2021-04-23 08:15:20'),(95,19,'Others','System Coding Standardso01619165720.docx','application',1,1,'2021-04-23 08:15:20','2021-04-23 08:15:20'),(96,19,'Employee Memoranda','IMG_1958em01619165799.JPG','image',1,1,'2021-04-23 08:16:39','2021-04-23 08:16:39'),(97,19,'Training and Development','IMG_2021td01619165799.JPG','image',1,1,'2021-04-23 08:16:39','2021-04-23 08:16:39');
/*!40000 ALTER TABLE `hris_employee_documents_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_employee_leave_tbl`
--

DROP TABLE IF EXISTS `hris_employee_leave_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_employee_leave_tbl` (
  `employeeLeaveID` bigint(20) NOT NULL AUTO_INCREMENT,
  `employeeID` bigint(20) NOT NULL,
  `leaveID` bigint(20) NOT NULL,
  `leaveCredit` int(11) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`employeeLeaveID`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_employee_leave_tbl`
--

LOCK TABLES `hris_employee_leave_tbl` WRITE;
/*!40000 ALTER TABLE `hris_employee_leave_tbl` DISABLE KEYS */;
INSERT INTO `hris_employee_leave_tbl` VALUES (3,12,1,10,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(4,12,2,10,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(5,13,1,10,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(6,13,2,10,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(7,14,1,10,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(8,14,2,10,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(9,15,1,5,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(10,15,2,8,1,1,'2021-04-22 02:35:48','2021-04-22 05:16:21'),(11,16,1,30,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(12,16,2,17,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(21,1,1,5,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(22,1,2,1,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(151,9,1,4,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(152,9,2,5,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(159,19,1,5,1,1,'2021-04-23 08:16:39','2021-04-23 08:16:39'),(160,19,2,14,1,1,'2021-04-23 08:16:39','2021-04-23 08:16:39');
/*!40000 ALTER TABLE `hris_employee_leave_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_employee_list_tbl`
--

DROP TABLE IF EXISTS `hris_employee_list_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_employee_list_tbl` (
  `employeeID` bigint(20) NOT NULL AUTO_INCREMENT,
  `departmentID` bigint(20) NOT NULL,
  `designationID` bigint(20) NOT NULL,
  `roleID` bigint(20) NOT NULL,
  `scheduleID` bigint(20) NOT NULL,
  `bankID` bigint(20) NOT NULL,
  `employeeFirstname` varchar(100) NOT NULL,
  `employeeMiddlename` varchar(100) DEFAULT NULL,
  `employeeLastname` varchar(100) NOT NULL,
  `employeeMobile` varchar(50) DEFAULT NULL,
  `employeeEmail` text NOT NULL,
  `employeeUsername` text NOT NULL,
  `employeePassword` text NOT NULL,
  `employeeEncryptedPassword` text DEFAULT NULL,
  `employeeBankAccountName` varchar(100) DEFAULT NULL,
  `employeeBankAccountNo` varchar(100) DEFAULT NULL,
  `employeeProfile` varchar(100) DEFAULT NULL,
  `employeeGender` varchar(20) NOT NULL,
  `employeeBirthday` date DEFAULT NULL,
  `employeeSignature` text DEFAULT NULL,
  `employeeCitizenship` varchar(20) DEFAULT NULL,
  `employeeCivilStatus` varchar(50) NOT NULL,
  `employeeTIN` varchar(100) DEFAULT NULL,
  `employeeSSS` varchar(100) DEFAULT NULL,
  `employeePhilHealth` varchar(100) DEFAULT NULL,
  `employeePagibig` varchar(100) DEFAULT NULL,
  `employeeRegion` varchar(100) DEFAULT NULL,
  `employeeProvince` varchar(100) DEFAULT NULL,
  `employeeCity` varchar(100) DEFAULT NULL,
  `employeeBarangay` varchar(100) DEFAULT NULL,
  `employeeUnit` varchar(20) DEFAULT NULL,
  `employeeBuilding` varchar(100) DEFAULT NULL,
  `employeeStreet` varchar(100) DEFAULT NULL,
  `employeeSubdivision` varchar(100) DEFAULT NULL,
  `employeeCountry` varchar(100) DEFAULT NULL,
  `employeeZipCode` varchar(20) DEFAULT NULL,
  `employeeBasicSalary` decimal(15,2) DEFAULT NULL,
  `employeeDailyRate` decimal(15,2) DEFAULT NULL,
  `employeeHourlyRate` decimal(15,2) DEFAULT NULL,
  `employeeAllowance` decimal(15,2) DEFAULT NULL,
  `employeeHiredDate` date DEFAULT NULL,
  `employeeStatus` int(11) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`employeeID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_employee_list_tbl`
--

LOCK TABLES `hris_employee_list_tbl` WRITE;
/*!40000 ALTER TABLE `hris_employee_list_tbl` DISABLE KEYS */;
INSERT INTO `hris_employee_list_tbl` VALUES (1,1,1,1,0,0,'Akosi',NULL,'Admin',NULL,'akosiadmin@gmail','admin','admin',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3000.00,100.00,12.50,500.00,NULL,1,1,1,'2021-03-26 00:09:46','2021-04-20 05:35:57'),(2,1,2,2,0,0,'Arjay',NULL,'Diangzon',NULL,'arjaydiangzon@gmail.com','arjay','arjay',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2700.00,90.00,11.25,400.00,NULL,1,1,1,'2021-03-26 00:09:46','2021-04-20 05:36:10'),(3,1,3,3,0,0,'Wilson',NULL,'Parajas',NULL,'wilsonparajas@gmail.com','wilson','wilson',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2400.00,80.00,10.00,NULL,NULL,1,1,1,'2021-03-26 00:09:46','2021-04-20 05:36:18'),(4,1,4,4,0,0,'Charles',NULL,'Verdadero',NULL,'charlesverdadero@gmail.com','charles','charles',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2100.00,70.00,8.75,NULL,NULL,1,1,1,'2021-03-26 00:09:46','2021-04-20 05:36:33'),(5,1,5,5,0,0,'Mark',NULL,'Nieto',NULL,'marknieto@gmail.com','mark','mark',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1900.00,60.00,7.50,NULL,NULL,1,1,1,'2021-03-26 00:09:46','2021-04-20 05:36:42'),(6,1,6,6,0,0,'Joseph',NULL,'Berongoy',NULL,'josephberongoy@gmail.com','joseph','joseph',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1600.00,70.00,8.75,NULL,NULL,1,1,1,'2021-03-26 00:09:46','2021-04-20 05:37:41'),(7,1,7,7,0,0,'Renna',NULL,'Telesforo',NULL,'rennatelesforo@gmail.com','renna','renna',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1300.00,60.00,7.50,NULL,NULL,1,1,1,'2021-03-26 00:09:46','2021-04-20 05:37:48'),(8,1,8,8,0,0,'Matthew',NULL,'Isaac',NULL,'matthewisaac@gmail.com','matthew','matthew',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1000.00,50.00,6.25,NULL,NULL,0,1,1,'2021-03-26 00:09:46','2021-04-20 05:38:11'),(9,1,4,0,1,1,'Errol','','Macawille','0916-512-4312','errol@gmail.com','errol','errol','U2FsdGVkX193pbNfsmcOH+p0MKN72J352A11MeBI/6o=','TEST','612-417-435-353','1619074376.gif','Others','2021-04-21',NULL,'Philippine, Filipino','Widowed','321-732-432','32-5327436-3','64-327345745-7','5327-3474-5654','4A','RIZAL','BINANGONAN','BANGAD','1702','Antel2','Julia Vargas','Ortigas','Philippines','1609',499632.00,22710.55,2838.82,500.00,'2021-04-13',5,1,1,'2021-04-22 06:38:46','2021-04-23 07:53:13'),(19,1,3,0,3,2,'Lawrence','','Mark','0963-242-3432','mark@gmail.com','lawrence','lawrence','U2FsdGVkX1+gtutYcIo9Av6agD16rsDtWsxoBYGYWfQ=','Mark','3412-6512-3412','1619159626.png','','2021-04-15',NULL,'Philippine, Filipino','Single','634-654-364','53-2523734-5','32-463274325-4','2346-7436-4374','01','ILOCOS SUR','BANAYOYO','BISANGOL','1701','Antel','Julia','Ortigas','Ph','1243',150000.00,6818.18,852.27,500.00,'2021-04-13',1,1,1,'2021-04-23 03:10:08','2021-04-23 08:16:39');
/*!40000 ALTER TABLE `hris_employee_list_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_employee_permission_tbl`
--

DROP TABLE IF EXISTS `hris_employee_permission_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_employee_permission_tbl` (
  `employeePermissionID` bigint(20) NOT NULL AUTO_INCREMENT,
  `employeeID` bigint(20) NOT NULL,
  `moduleID` bigint(20) NOT NULL,
  `createStatus` int(11) NOT NULL,
  `updateStatus` int(11) NOT NULL,
  `readStatus` int(11) NOT NULL,
  `deleteStatus` int(11) NOT NULL,
  `printStatus` int(11) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`employeePermissionID`)
) ENGINE=InnoDB AUTO_INCREMENT=1241 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_employee_permission_tbl`
--

LOCK TABLES `hris_employee_permission_tbl` WRITE;
/*!40000 ALTER TABLE `hris_employee_permission_tbl` DISABLE KEYS */;
INSERT INTO `hris_employee_permission_tbl` VALUES (1,1,1,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(2,1,2,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(3,1,3,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(4,1,4,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(5,1,5,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(6,1,6,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(7,1,7,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(8,1,8,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(9,1,9,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(10,1,10,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(11,1,11,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(12,1,12,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(13,1,13,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(14,1,14,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(15,1,15,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(16,1,16,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(17,1,17,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(18,1,18,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(19,1,19,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(20,1,20,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(21,1,21,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(22,1,22,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(23,1,23,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(24,1,24,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(25,1,25,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(26,1,26,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(27,1,27,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(28,1,28,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(29,1,29,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(30,1,30,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(31,1,31,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(32,1,32,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(33,1,33,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(34,1,34,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(35,1,35,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(36,1,36,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(37,1,37,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(38,1,38,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(39,1,39,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(40,1,40,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(41,1,41,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(42,1,42,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(43,1,43,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(44,1,44,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(45,1,45,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(46,1,46,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(47,1,47,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(48,1,48,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(49,1,49,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(50,1,50,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(51,1,51,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(52,1,52,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(53,1,53,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(54,1,54,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(55,1,55,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(56,1,56,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(57,1,57,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(58,1,58,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(59,1,59,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(60,1,60,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(61,1,61,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(62,1,62,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(63,1,63,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(64,1,64,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(65,1,65,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(66,1,66,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(67,1,67,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(68,1,68,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(69,1,69,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(70,1,70,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(71,1,71,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(72,1,72,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(73,1,73,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(74,1,74,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(75,1,75,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(76,1,76,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(77,1,77,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(78,1,78,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(79,1,79,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(80,1,80,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(81,1,81,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(82,1,82,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(83,1,83,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(84,1,84,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(85,1,85,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(86,1,86,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(87,1,87,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(88,1,88,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(89,1,89,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(90,1,90,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(91,1,91,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(92,1,92,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(93,1,93,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(94,1,94,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(95,1,95,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(96,1,96,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(97,1,97,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(98,1,98,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(99,1,99,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(100,1,100,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(101,1,101,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(102,1,102,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(103,1,103,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(104,1,104,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(105,1,105,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(106,1,106,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(107,1,107,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(108,1,108,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(109,1,109,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(110,1,110,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(111,1,111,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(112,1,112,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(113,1,113,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(114,1,114,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(115,1,115,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(116,1,116,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(117,1,117,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(118,1,118,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(119,1,119,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(120,1,120,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(121,1,121,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(122,1,122,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(123,1,123,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(124,1,124,1,1,1,1,1,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(125,2,1,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(126,2,2,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(127,2,3,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(128,2,4,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(129,2,5,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(130,2,6,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(131,2,7,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(132,2,8,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(133,2,9,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(134,2,10,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(135,2,11,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(136,2,12,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(137,2,13,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(138,2,14,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(139,2,15,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(140,2,16,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(141,2,17,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(142,2,18,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(143,2,19,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(144,2,20,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(145,2,21,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(146,2,22,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(147,2,23,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(148,2,24,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(149,2,25,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(150,2,26,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(151,2,27,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(152,2,28,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(153,2,29,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(154,2,30,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(155,2,31,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(156,2,32,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(157,2,33,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(158,2,34,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(159,2,35,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(160,2,36,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(161,2,37,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(162,2,38,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(163,2,39,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(164,2,40,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(165,2,41,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(166,2,42,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(167,2,43,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(168,2,44,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(169,2,45,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(170,2,46,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(171,2,47,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(172,2,48,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(173,2,49,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(174,2,50,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(175,2,51,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(176,2,52,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(177,2,53,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(178,2,54,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(179,2,55,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(180,2,56,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(181,2,57,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(182,2,58,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(183,2,59,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(184,2,60,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(185,2,61,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(186,2,62,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(187,2,63,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(188,2,64,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(189,2,65,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(190,2,66,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(191,2,67,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(192,2,68,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(193,2,69,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(194,2,70,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(195,2,71,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(196,2,72,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(197,2,73,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(198,2,74,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(199,2,75,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(200,2,76,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(201,2,77,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(202,2,78,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(203,2,79,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(204,2,80,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(205,2,81,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(206,2,82,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(207,2,83,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(208,2,84,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(209,2,85,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(210,2,86,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(211,2,87,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(212,2,88,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(213,2,89,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(214,2,90,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(215,2,91,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(216,2,92,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(217,2,93,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(218,2,94,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(219,2,95,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(220,2,96,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(221,2,97,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(222,2,98,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(223,2,99,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(224,2,100,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(225,2,101,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(226,2,102,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(227,2,103,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(228,2,104,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(229,2,105,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(230,2,106,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(231,2,107,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(232,2,108,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(233,2,109,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(234,2,110,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(235,2,111,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(236,2,112,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(237,2,113,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(238,2,114,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(239,2,115,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(240,2,116,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(241,2,117,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(242,2,118,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(243,2,119,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(244,2,120,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(245,2,121,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(246,2,122,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(247,2,123,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(248,2,124,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(249,3,1,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(250,3,2,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(251,3,3,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(252,3,4,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(253,3,5,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(254,3,6,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(255,3,7,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(256,3,8,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(257,3,9,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(258,3,10,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(259,3,11,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(260,3,12,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(261,3,13,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(262,3,14,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(263,3,15,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(264,3,16,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(265,3,17,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(266,3,18,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(267,3,19,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(268,3,20,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(269,3,21,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(270,3,22,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(271,3,23,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(272,3,24,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(273,3,25,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(274,3,26,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(275,3,27,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(276,3,28,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(277,3,29,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(278,3,30,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(279,3,31,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(280,3,32,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(281,3,33,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(282,3,34,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(283,3,35,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(284,3,36,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(285,3,37,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(286,3,38,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(287,3,39,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(288,3,40,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(289,3,41,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(290,3,42,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(291,3,43,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(292,3,44,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(293,3,45,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(294,3,46,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(295,3,47,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(296,3,48,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(297,3,49,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(298,3,50,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(299,3,51,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(300,3,52,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(301,3,53,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(302,3,54,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(303,3,55,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(304,3,56,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(305,3,57,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(306,3,58,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(307,3,59,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(308,3,60,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(309,3,61,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(310,3,62,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(311,3,63,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(312,3,64,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(313,3,65,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(314,3,66,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(315,3,67,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(316,3,68,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(317,3,69,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(318,3,70,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(319,3,71,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(320,3,72,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(321,3,73,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(322,3,74,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(323,3,75,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(324,3,76,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(325,3,77,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(326,3,78,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(327,3,79,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(328,3,80,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(329,3,81,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(330,3,82,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(331,3,83,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(332,3,84,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(333,3,85,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(334,3,86,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(335,3,87,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(336,3,88,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(337,3,89,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(338,3,90,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(339,3,91,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(340,3,92,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(341,3,93,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(342,3,94,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(343,3,95,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(344,3,96,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(345,3,97,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(346,3,98,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(347,3,99,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(348,3,100,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(349,3,101,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(350,3,102,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(351,3,103,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(352,3,104,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(353,3,105,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(354,3,106,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(355,3,107,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(356,3,108,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(357,3,109,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(358,3,110,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(359,3,111,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(360,3,112,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(361,3,113,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(362,3,114,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(363,3,115,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(364,3,116,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(365,3,117,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(366,3,118,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(367,3,119,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(368,3,120,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(369,3,121,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(370,3,122,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(371,3,123,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(372,3,124,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(373,4,1,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(374,4,2,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(375,4,3,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(376,4,4,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(377,4,5,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(378,4,6,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(379,4,7,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(380,4,8,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(381,4,9,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(382,4,10,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(383,4,11,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(384,4,12,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(385,4,13,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(386,4,14,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(387,4,15,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(388,4,16,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(389,4,17,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(390,4,18,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(391,4,19,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(392,4,20,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(393,4,21,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(394,4,22,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(395,4,23,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(396,4,24,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(397,4,25,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(398,4,26,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(399,4,27,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(400,4,28,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(401,4,29,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(402,4,30,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(403,4,31,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(404,4,32,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(405,4,33,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(406,4,34,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(407,4,35,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(408,4,36,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(409,4,37,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(410,4,38,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(411,4,39,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(412,4,40,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(413,4,41,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(414,4,42,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(415,4,43,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(416,4,44,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(417,4,45,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(418,4,46,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(419,4,47,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(420,4,48,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(421,4,49,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(422,4,50,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(423,4,51,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(424,4,52,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(425,4,53,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(426,4,54,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(427,4,55,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(428,4,56,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(429,4,57,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(430,4,58,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(431,4,59,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(432,4,60,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(433,4,61,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(434,4,62,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(435,4,63,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(436,4,64,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(437,4,65,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(438,4,66,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(439,4,67,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(440,4,68,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(441,4,69,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(442,4,70,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(443,4,71,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(444,4,72,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(445,4,73,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(446,4,74,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(447,4,75,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(448,4,76,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(449,4,77,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(450,4,78,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(451,4,79,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(452,4,80,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(453,4,81,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(454,4,82,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(455,4,83,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(456,4,84,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(457,4,85,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(458,4,86,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(459,4,87,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(460,4,88,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(461,4,89,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(462,4,90,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(463,4,91,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(464,4,92,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(465,4,93,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(466,4,94,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(467,4,95,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(468,4,96,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(469,4,97,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(470,4,98,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(471,4,99,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(472,4,100,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(473,4,101,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(474,4,102,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(475,4,103,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(476,4,104,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(477,4,105,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(478,4,106,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(479,4,107,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(480,4,108,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(481,4,109,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(482,4,110,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(483,4,111,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(484,4,112,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(485,4,113,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(486,4,114,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(487,4,115,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(488,4,116,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(489,4,117,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(490,4,118,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(491,4,119,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(492,4,120,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(493,4,121,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(494,4,122,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(495,4,123,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(496,4,124,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(497,5,1,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(498,5,2,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(499,5,3,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(500,5,4,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(501,5,5,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(502,5,6,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(503,5,7,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(504,5,8,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(505,5,9,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(506,5,10,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(507,5,11,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(508,5,12,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(509,5,13,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(510,5,14,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(511,5,15,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(512,5,16,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(513,5,17,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(514,5,18,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(515,5,19,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(516,5,20,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(517,5,21,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(518,5,22,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(519,5,23,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(520,5,24,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(521,5,25,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(522,5,26,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(523,5,27,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(524,5,28,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(525,5,29,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(526,5,30,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(527,5,31,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(528,5,32,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(529,5,33,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(530,5,34,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(531,5,35,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(532,5,36,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(533,5,37,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(534,5,38,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(535,5,39,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(536,5,40,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(537,5,41,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(538,5,42,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(539,5,43,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(540,5,44,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(541,5,45,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(542,5,46,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(543,5,47,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(544,5,48,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(545,5,49,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(546,5,50,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(547,5,51,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(548,5,52,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(549,5,53,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(550,5,54,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(551,5,55,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(552,5,56,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(553,5,57,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(554,5,58,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(555,5,59,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(556,5,60,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(557,5,61,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(558,5,62,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(559,5,63,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(560,5,64,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(561,5,65,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(562,5,66,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(563,5,67,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(564,5,68,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(565,5,69,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(566,5,70,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(567,5,71,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(568,5,72,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(569,5,73,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(570,5,74,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(571,5,75,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(572,5,76,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(573,5,77,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(574,5,78,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(575,5,79,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(576,5,80,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(577,5,81,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(578,5,82,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(579,5,83,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(580,5,84,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(581,5,85,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(582,5,86,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(583,5,87,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(584,5,88,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(585,5,89,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(586,5,90,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(587,5,91,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(588,5,92,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(589,5,93,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(590,5,94,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(591,5,95,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(592,5,96,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(593,5,97,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(594,5,98,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(595,5,99,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(596,5,100,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(597,5,101,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(598,5,102,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(599,5,103,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(600,5,104,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(601,5,105,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(602,5,106,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(603,5,107,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(604,5,108,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(605,5,109,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(606,5,110,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(607,5,111,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(608,5,112,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(609,5,113,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(610,5,114,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(611,5,115,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(612,5,116,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(613,5,117,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(614,5,118,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(615,5,119,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(616,5,120,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(617,5,121,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(618,5,122,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(619,5,123,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(620,5,124,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(621,6,1,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(622,6,2,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(623,6,3,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(624,6,4,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(625,6,5,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(626,6,6,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(627,6,7,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(628,6,8,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(629,6,9,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(630,6,10,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(631,6,11,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(632,6,12,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(633,6,13,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(634,6,14,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(635,6,15,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(636,6,16,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(637,6,17,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(638,6,18,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(639,6,19,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(640,6,20,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(641,6,21,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(642,6,22,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(643,6,23,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(644,6,24,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(645,6,25,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(646,6,26,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(647,6,27,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(648,6,28,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(649,6,29,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(650,6,30,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(651,6,31,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(652,6,32,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(653,6,33,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(654,6,34,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(655,6,35,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(656,6,36,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(657,6,37,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(658,6,38,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(659,6,39,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(660,6,40,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(661,6,41,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(662,6,42,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(663,6,43,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(664,6,44,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(665,6,45,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(666,6,46,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(667,6,47,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(668,6,48,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(669,6,49,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(670,6,50,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(671,6,51,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(672,6,52,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(673,6,53,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(674,6,54,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(675,6,55,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(676,6,56,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(677,6,57,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(678,6,58,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(679,6,59,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(680,6,60,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(681,6,61,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(682,6,62,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(683,6,63,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(684,6,64,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(685,6,65,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(686,6,66,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(687,6,67,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(688,6,68,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(689,6,69,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(690,6,70,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(691,6,71,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(692,6,72,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(693,6,73,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(694,6,74,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(695,6,75,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(696,6,76,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(697,6,77,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(698,6,78,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(699,6,79,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(700,6,80,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(701,6,81,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(702,6,82,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(703,6,83,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(704,6,84,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(705,6,85,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(706,6,86,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(707,6,87,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(708,6,88,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(709,6,89,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(710,6,90,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(711,6,91,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(712,6,92,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(713,6,93,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(714,6,94,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(715,6,95,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(716,6,96,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(717,6,97,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(718,6,98,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(719,6,99,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(720,6,100,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(721,6,101,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(722,6,102,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(723,6,103,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(724,6,104,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(725,6,105,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(726,6,106,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(727,6,107,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(728,6,108,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(729,6,109,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(730,6,110,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(731,6,111,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(732,6,112,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(733,6,113,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(734,6,114,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(735,6,115,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(736,6,116,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(737,6,117,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(738,6,118,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(739,6,119,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(740,6,120,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(741,6,121,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(742,6,122,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(743,6,123,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(744,6,124,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(745,7,1,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(746,7,2,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(747,7,3,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(748,7,4,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(749,7,5,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(750,7,6,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(751,7,7,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(752,7,8,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(753,7,9,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(754,7,10,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(755,7,11,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(756,7,12,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(757,7,13,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(758,7,14,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(759,7,15,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(760,7,16,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(761,7,17,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(762,7,18,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(763,7,19,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(764,7,20,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(765,7,21,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(766,7,22,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(767,7,23,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(768,7,24,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(769,7,25,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(770,7,26,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(771,7,27,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(772,7,28,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(773,7,29,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(774,7,30,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(775,7,31,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(776,7,32,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(777,7,33,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(778,7,34,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(779,7,35,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(780,7,36,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(781,7,37,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(782,7,38,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(783,7,39,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(784,7,40,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(785,7,41,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(786,7,42,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(787,7,43,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(788,7,44,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(789,7,45,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(790,7,46,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(791,7,47,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(792,7,48,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(793,7,49,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(794,7,50,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(795,7,51,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(796,7,52,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(797,7,53,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(798,7,54,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(799,7,55,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(800,7,56,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(801,7,57,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(802,7,58,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(803,7,59,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(804,7,60,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(805,7,61,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(806,7,62,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(807,7,63,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(808,7,64,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(809,7,65,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(810,7,66,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(811,7,67,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(812,7,68,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(813,7,69,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(814,7,70,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(815,7,71,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(816,7,72,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(817,7,73,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(818,7,74,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(819,7,75,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(820,7,76,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(821,7,77,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(822,7,78,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(823,7,79,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(824,7,80,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(825,7,81,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(826,7,82,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(827,7,83,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(828,7,84,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(829,7,85,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(830,7,86,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(831,7,87,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(832,7,88,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(833,7,89,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(834,7,90,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(835,7,91,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(836,7,92,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(837,7,93,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(838,7,94,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(839,7,95,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(840,7,96,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(841,7,97,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(842,7,98,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(843,7,99,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(844,7,100,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(845,7,101,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(846,7,102,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(847,7,103,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(848,7,104,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(849,7,105,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(850,7,106,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(851,7,107,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(852,7,108,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(853,7,109,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(854,7,110,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(855,7,111,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(856,7,112,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(857,7,113,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(858,7,114,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(859,7,115,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(860,7,116,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(861,7,117,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(862,7,118,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(863,7,119,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(864,7,120,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(865,7,121,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(866,7,122,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(867,7,123,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(868,7,124,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(869,8,1,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(870,8,2,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(871,8,3,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(872,8,4,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(873,8,5,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(874,8,6,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(875,8,7,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(876,8,8,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(877,8,9,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(878,8,10,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(879,8,11,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(880,8,12,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(881,8,13,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(882,8,14,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(883,8,15,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(884,8,16,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(885,8,17,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(886,8,18,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(887,8,19,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(888,8,20,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(889,8,21,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(890,8,22,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(891,8,23,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(892,8,24,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(893,8,25,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(894,8,26,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(895,8,27,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(896,8,28,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(897,8,29,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(898,8,30,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(899,8,31,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(900,8,32,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(901,8,33,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(902,8,34,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(903,8,35,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(904,8,36,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(905,8,37,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(906,8,38,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(907,8,39,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(908,8,40,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(909,8,41,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(910,8,42,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(911,8,43,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(912,8,44,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(913,8,45,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(914,8,46,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(915,8,47,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(916,8,48,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(917,8,49,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(918,8,50,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(919,8,51,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(920,8,52,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(921,8,53,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(922,8,54,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(923,8,55,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(924,8,56,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(925,8,57,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(926,8,58,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(927,8,59,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(928,8,60,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(929,8,61,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(930,8,62,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(931,8,63,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(932,8,64,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(933,8,65,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(934,8,66,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(935,8,67,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(936,8,68,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(937,8,69,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(938,8,70,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(939,8,71,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(940,8,72,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(941,8,73,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(942,8,74,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(943,8,75,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(944,8,76,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(945,8,77,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(946,8,78,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(947,8,79,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(948,8,80,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(949,8,81,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(950,8,82,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(951,8,83,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(952,8,84,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(953,8,85,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(954,8,86,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(955,8,87,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(956,8,88,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(957,8,89,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(958,8,90,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(959,8,91,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(960,8,92,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(961,8,93,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(962,8,94,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(963,8,95,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(964,8,96,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(965,8,97,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(966,8,98,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(967,8,99,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(968,8,100,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(969,8,101,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(970,8,102,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(971,8,103,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(972,8,104,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(973,8,105,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(974,8,106,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(975,8,107,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(976,8,108,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(977,8,109,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(978,8,110,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(979,8,111,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(980,8,112,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(981,8,113,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(982,8,114,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(983,8,115,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(984,8,116,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(985,8,117,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(986,8,118,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(987,8,119,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(988,8,120,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(989,8,121,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(990,8,122,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(991,8,123,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(992,8,124,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(993,9,1,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(994,9,2,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(995,9,3,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(996,9,4,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(997,9,5,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(998,9,6,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(999,9,7,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1000,9,8,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1001,9,9,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1002,9,10,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1003,9,11,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1004,9,12,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1005,9,13,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1006,9,14,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1007,9,15,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1008,9,16,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1009,9,17,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1010,9,18,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1011,9,19,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1012,9,20,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1013,9,21,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1014,9,22,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1015,9,23,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1016,9,24,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1017,9,25,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1018,9,26,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1019,9,27,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1020,9,28,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1021,9,29,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1022,9,30,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1023,9,31,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1024,9,32,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1025,9,33,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1026,9,34,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1027,9,35,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1028,9,36,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1029,9,37,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1030,9,38,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1031,9,39,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1032,9,40,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1033,9,41,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1034,9,42,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1035,9,43,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1036,9,44,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1037,9,45,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1038,9,46,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1039,9,47,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1040,9,48,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1041,9,49,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1042,9,50,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1043,9,51,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1044,9,52,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1045,9,53,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1046,9,54,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1047,9,55,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1048,9,56,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1049,9,57,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1050,9,58,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1051,9,59,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1052,9,60,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1053,9,61,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1054,9,62,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1055,9,63,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1056,9,64,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1057,9,65,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1058,9,66,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1059,9,67,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1060,9,68,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1061,9,69,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1062,9,70,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1063,9,71,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1064,9,72,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1065,9,73,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1066,9,74,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1067,9,75,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1068,9,76,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1069,9,77,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1070,9,78,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1071,9,79,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1072,9,80,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1073,9,81,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1074,9,82,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1075,9,83,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1076,9,84,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1077,9,85,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1078,9,86,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1079,9,87,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1080,9,88,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1081,9,89,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1082,9,90,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1083,9,91,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1084,9,92,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1085,9,93,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1086,9,94,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1087,9,95,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1088,9,96,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1089,9,97,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1090,9,98,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1091,9,99,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1092,9,100,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1093,9,101,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1094,9,102,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1095,9,103,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1096,9,104,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1097,9,105,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1098,9,106,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1099,9,107,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1100,9,108,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1101,9,109,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1102,9,110,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1103,9,111,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1104,9,112,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1105,9,113,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1106,9,114,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1107,9,115,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1108,9,116,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1109,9,117,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1110,9,118,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1111,9,119,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1112,9,120,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1113,9,121,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1114,9,122,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1115,9,123,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1116,9,124,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1117,19,1,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1118,19,2,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1119,19,3,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1120,19,4,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1121,19,5,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1122,19,6,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1123,19,7,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1124,19,8,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1125,19,9,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1126,19,10,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1127,19,11,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1128,19,12,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1129,19,13,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1130,19,14,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1131,19,15,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1132,19,16,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1133,19,17,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1134,19,18,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1135,19,19,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1136,19,20,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1137,19,21,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1138,19,22,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1139,19,23,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1140,19,24,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1141,19,25,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1142,19,26,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1143,19,27,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1144,19,28,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1145,19,29,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1146,19,30,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1147,19,31,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1148,19,32,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1149,19,33,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1150,19,34,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1151,19,35,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1152,19,36,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1153,19,37,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1154,19,38,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1155,19,39,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1156,19,40,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1157,19,41,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1158,19,42,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1159,19,43,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1160,19,44,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1161,19,45,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1162,19,46,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1163,19,47,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1164,19,48,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1165,19,49,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1166,19,50,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1167,19,51,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1168,19,52,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1169,19,53,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1170,19,54,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1171,19,55,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1172,19,56,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1173,19,57,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1174,19,58,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1175,19,59,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1176,19,60,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1177,19,61,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1178,19,62,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1179,19,63,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1180,19,64,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1181,19,65,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1182,19,66,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1183,19,67,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1184,19,68,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1185,19,69,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1186,19,70,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1187,19,71,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1188,19,72,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1189,19,73,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1190,19,74,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1191,19,75,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1192,19,76,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1193,19,77,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1194,19,78,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1195,19,79,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1196,19,80,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1197,19,81,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1198,19,82,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1199,19,83,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1200,19,84,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1201,19,85,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1202,19,86,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1203,19,87,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1204,19,88,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1205,19,89,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1206,19,90,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1207,19,91,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1208,19,92,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1209,19,93,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1210,19,94,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1211,19,95,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1212,19,96,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1213,19,97,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1214,19,98,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1215,19,99,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1216,19,100,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1217,19,101,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1218,19,102,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1219,19,103,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1220,19,104,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1221,19,105,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1222,19,106,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1223,19,107,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1224,19,108,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1225,19,109,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1226,19,110,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1227,19,111,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1228,19,112,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1229,19,113,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1230,19,114,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1231,19,115,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1232,19,116,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1233,19,117,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1234,19,118,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1235,19,119,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1236,19,120,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1237,19,121,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1238,19,122,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1239,19,123,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05'),(1240,19,124,0,0,1,0,0,1,1,'2021-04-25 23:53:05','2021-04-25 23:53:05');
/*!40000 ALTER TABLE `hris_employee_permission_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_event_calendar_tbl`
--

DROP TABLE IF EXISTS `hris_event_calendar_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_event_calendar_tbl` (
  `eventCalendarID` bigint(20) NOT NULL AUTO_INCREMENT,
  `eventCalendarName` text NOT NULL,
  `eventCalendarBackground` text NOT NULL,
  `eventCalendarDateFrom` date NOT NULL,
  `eventCalendarDateTo` date NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`eventCalendarID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_event_calendar_tbl`
--

LOCK TABLES `hris_event_calendar_tbl` WRITE;
/*!40000 ALTER TABLE `hris_event_calendar_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_event_calendar_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_holiday_tbl`
--

DROP TABLE IF EXISTS `hris_holiday_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_holiday_tbl` (
  `holidayID` bigint(20) NOT NULL AUTO_INCREMENT,
  `holidayCode` text NOT NULL,
  `holidayName` text NOT NULL,
  `holidayDate` date NOT NULL,
  `holidayType` text NOT NULL,
  `holidayStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`holidayID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_holiday_tbl`
--

LOCK TABLES `hris_holiday_tbl` WRITE;
/*!40000 ALTER TABLE `hris_holiday_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_holiday_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_job_posting_tbl`
--

DROP TABLE IF EXISTS `hris_job_posting_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_job_posting_tbl` (
  `jobID` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `updatedBy` bigint(20) NOT NULL,
  PRIMARY KEY (`jobID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_job_posting_tbl`
--

LOCK TABLES `hris_job_posting_tbl` WRITE;
/*!40000 ALTER TABLE `hris_job_posting_tbl` DISABLE KEYS */;
INSERT INTO `hris_job_posting_tbl` VALUES (1,'VEN-21-00001','CMTLand Development Inc.','Title','Decription','Responsibilities','Part-Time','Computer/Information Technology','Test','Test','English',22,3,1500.00,1,'2021-03-24','2021-03-24 10:21:13','2021-03-24 11:24:35',1,1);
/*!40000 ALTER TABLE `hris_job_posting_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_leave_request_tbl`
--

DROP TABLE IF EXISTS `hris_leave_request_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_leave_request_tbl` (
  `leaveRequestID` bigint(20) NOT NULL AUTO_INCREMENT,
  `leaveRequestCode` varchar(100) NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `leaveRequestDate` varchar(255) NOT NULL,
  `leaveRequestDateFrom` date NOT NULL,
  `leaveRequestDateTo` date NOT NULL,
  `leaveRequestNumberOfDate` bigint(20) NOT NULL,
  `leaveID` varchar(140) NOT NULL,
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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`leaveRequestID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_leave_request_tbl`
--

LOCK TABLES `hris_leave_request_tbl` WRITE;
/*!40000 ALTER TABLE `hris_leave_request_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_leave_request_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_leave_tbl`
--

DROP TABLE IF EXISTS `hris_leave_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_leave_tbl` (
  `leaveID` bigint(20) NOT NULL AUTO_INCREMENT,
  `leaveCode` text NOT NULL,
  `leaveName` text NOT NULL,
  `leaveStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`leaveID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_leave_tbl`
--

LOCK TABLES `hris_leave_tbl` WRITE;
/*!40000 ALTER TABLE `hris_leave_tbl` DISABLE KEYS */;
INSERT INTO `hris_leave_tbl` VALUES (1,'LVE-21-00001','Vacation Leave',1,1,1,'2021-04-07 06:33:24','2021-04-20 06:45:25'),(2,'LVE-21-00002','Sick Leave',1,1,1,'2021-04-20 06:45:15','2021-04-20 06:45:15');
/*!40000 ALTER TABLE `hris_leave_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_loan_form_tbl`
--

DROP TABLE IF EXISTS `hris_loan_form_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_loan_form_tbl` (
  `loanFormID` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`loanFormID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_loan_form_tbl`
--

LOCK TABLES `hris_loan_form_tbl` WRITE;
/*!40000 ALTER TABLE `hris_loan_form_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_loan_form_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_loan_tbl`
--

DROP TABLE IF EXISTS `hris_loan_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_loan_tbl` (
  `loanID` bigint(20) NOT NULL AUTO_INCREMENT,
  `loanCode` text NOT NULL,
  `loanName` text NOT NULL,
  `loanStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`loanID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_loan_tbl`
--

LOCK TABLES `hris_loan_tbl` WRITE;
/*!40000 ALTER TABLE `hris_loan_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_loan_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_no_timein_timeout_tbl`
--

DROP TABLE IF EXISTS `hris_no_timein_timeout_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_no_timein_timeout_tbl` (
  `noTimeinTimeoutID` bigint(20) NOT NULL AUTO_INCREMENT,
  `noTimeinTimeoutCode` varchar(100) NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `noTimeinTimeoutNegligence` int(11) DEFAULT NULL,
  `noTimeinTimeoutDate` date NOT NULL,
  `noTimeinTimeoutTimeIn` time NOT NULL,
  `noTimeinTimeoutTimeOut` time NOT NULL,
  `noTimeinTimeoutReason` text DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `noTimeinTimeoutStatus` int(11) NOT NULL,
  `noTimeinTimeoutRemarks` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`noTimeinTimeoutID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_no_timein_timeout_tbl`
--

LOCK TABLES `hris_no_timein_timeout_tbl` WRITE;
/*!40000 ALTER TABLE `hris_no_timein_timeout_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_no_timein_timeout_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_official_business_tbl`
--

DROP TABLE IF EXISTS `hris_official_business_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_official_business_tbl` (
  `officialBusinessID` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`officialBusinessID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_official_business_tbl`
--

LOCK TABLES `hris_official_business_tbl` WRITE;
/*!40000 ALTER TABLE `hris_official_business_tbl` DISABLE KEYS */;
INSERT INTO `hris_official_business_tbl` VALUES (1,'OBF-21-00001',1,1,'123, 123, San Rafael (idiang), Itbayat, Batanes, Dsadsadas, 1233','2021-04-13','08:00:00','17:00:00','','','','',0,'',NULL,1,1,'2021-04-13 00:32:40','2021-04-13 00:50:58'),(2,'OBF-21-00002',1,2,'1701, Antel, Adams (pob.), Adams, Ilocos Norte, Philippines, 1609','2021-04-13','08:00:00','17:00:00','','','','',0,'',NULL,1,1,'2021-04-13 00:34:05','2021-04-13 00:49:50'),(3,'OBF-21-00003',1,1,'123, 123, San Rafael (idiang), Itbayat, Batanes, Dsadsadas, 1233','2021-04-13','08:00:00','17:00:00','TEST','','','',1,'','2021-04-13 00:43:21',1,1,'2021-04-13 00:35:09','2021-04-13 00:43:22'),(4,'OBF-21-00004',1,1,'123, 123, San Rafael (idiang), Itbayat, Batanes, Dsadsadas, 1233','2021-04-15','08:00:00','17:00:00','TEST','','','',1,'','2021-04-13 02:13:49',1,1,'2021-04-13 02:13:29','2021-04-13 02:13:50'),(5,'OBF-21-00005',1,2,'1701, Antel, Adams (pob.), Adams, Ilocos Norte, Philippines, 1609','2021-04-13','08:00:00','17:00:00','TEST','1','2','2021-04-13 10:14:11',2,'','2021-04-13 02:14:11',1,1,'2021-04-13 02:14:11','2021-04-13 02:14:12');
/*!40000 ALTER TABLE `hris_official_business_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_overtime_request_tbl`
--

DROP TABLE IF EXISTS `hris_overtime_request_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_overtime_request_tbl` (
  `overtimeRequestID` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`overtimeRequestID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_overtime_request_tbl`
--

LOCK TABLES `hris_overtime_request_tbl` WRITE;
/*!40000 ALTER TABLE `hris_overtime_request_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_overtime_request_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_philhealth_table_tbl`
--

DROP TABLE IF EXISTS `hris_philhealth_table_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_philhealth_table_tbl` (
  `phID` bigint(20) NOT NULL AUTO_INCREMENT,
  `phMinimumRange` decimal(15,2) NOT NULL,
  `phMaximumRange` decimal(15,2) NOT NULL,
  `phPercentage` decimal(15,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`phID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_philhealth_table_tbl`
--

LOCK TABLES `hris_philhealth_table_tbl` WRITE;
/*!40000 ALTER TABLE `hris_philhealth_table_tbl` DISABLE KEYS */;
INSERT INTO `hris_philhealth_table_tbl` VALUES (1,1000.00,10000.00,3.50,'2021-04-15 08:02:14','2021-04-15 08:02:14'),(2,10000.01,69999.99,3.50,'2021-04-15 08:02:14','2021-04-15 08:02:14'),(3,70000.00,999999.00,3.50,'2021-04-15 08:02:14','2021-04-15 08:02:14');
/*!40000 ALTER TABLE `hris_philhealth_table_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_qualification_tbl`
--

DROP TABLE IF EXISTS `hris_qualification_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_qualification_tbl` (
  `qualificationID` bigint(20) NOT NULL AUTO_INCREMENT,
  `qualificationName` text NOT NULL,
  `qualificationStatus` int(5) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`qualificationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_qualification_tbl`
--

LOCK TABLES `hris_qualification_tbl` WRITE;
/*!40000 ALTER TABLE `hris_qualification_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_qualification_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_requirement_tbl`
--

DROP TABLE IF EXISTS `hris_requirement_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_requirement_tbl` (
  `requirementID` bigint(20) NOT NULL AUTO_INCREMENT,
  `requirementCode` varchar(255) NOT NULL,
  `requirementName` varchar(255) NOT NULL,
  `requirementDescription` longtext NOT NULL,
  `requirementStatus` int(50) NOT NULL,
  `datecreated` date NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`requirementID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_requirement_tbl`
--

LOCK TABLES `hris_requirement_tbl` WRITE;
/*!40000 ALTER TABLE `hris_requirement_tbl` DISABLE KEYS */;
INSERT INTO `hris_requirement_tbl` VALUES (1,'RQT-21-00001','Test','Test',1,'2021-03-24',1,1,'2021-03-24 13:21:34','0000-00-00 00:00:00'),(2,'RQT-21-00002','Tests','Test',1,'2021-03-25',1,1,'2021-03-25 13:17:07','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `hris_requirement_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_schedule_setup_tbl`
--

DROP TABLE IF EXISTS `hris_schedule_setup_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_schedule_setup_tbl` (
  `scheduleID` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`scheduleID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_schedule_setup_tbl`
--

LOCK TABLES `hris_schedule_setup_tbl` WRITE;
/*!40000 ALTER TABLE `hris_schedule_setup_tbl` DISABLE KEYS */;
INSERT INTO `hris_schedule_setup_tbl` VALUES (1,'Mid Shift','08:00:00','17:00:00',1,'08:00:00','14:00:00',1,'08:00:00','17:00:00',1,'08:00:00','17:00:00',1,'08:00:00','17:00:00',1,'08:00:00','17:00:00',0,'08:00:00','17:00:00',0,1,1,1,'2021-03-11 02:54:03','2021-03-23 01:31:12'),(2,'Morning Shift','06:00:00','15:00:00',1,'06:00:00','15:00:00',1,'06:00:00','15:00:00',0,'06:00:00','15:00:00',0,'06:00:00','15:00:00',0,'06:00:00','15:00:00',0,'06:00:00','15:00:00',0,0,0,0,'2021-03-17 03:32:18','2021-03-17 03:50:04'),(3,'Graveyard','02:00:00','10:00:00',1,'08:00:00','17:00:00',0,'08:00:00','17:00:00',0,'08:00:00','17:00:00',0,'08:00:00','17:00:00',0,'08:00:00','17:00:00',0,'08:00:00','17:00:00',1,1,0,0,'2021-03-17 03:53:29','2021-03-17 03:54:06');
/*!40000 ALTER TABLE `hris_schedule_setup_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_sss_table_tbl`
--

DROP TABLE IF EXISTS `hris_sss_table_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_sss_table_tbl` (
  `sssID` bigint(20) NOT NULL AUTO_INCREMENT,
  `sssMinimumRange` decimal(15,2) NOT NULL,
  `sssMaximumRange` decimal(15,2) NOT NULL,
  `sssEmployerContribution` decimal(15,2) NOT NULL,
  `sssEmployeeContribution` decimal(15,2) NOT NULL,
  `sssECContribution` decimal(15,2) NOT NULL,
  `sssTotal` decimal(15,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`sssID`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_sss_table_tbl`
--

LOCK TABLES `hris_sss_table_tbl` WRITE;
/*!40000 ALTER TABLE `hris_sss_table_tbl` DISABLE KEYS */;
INSERT INTO `hris_sss_table_tbl` VALUES (1,1000.00,3250.00,255.70,135.00,10.00,390.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(2,3250.00,3749.99,297.50,157.50,10.00,455.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(3,3750.00,4249.99,340.00,180.00,10.00,520.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(4,4250.00,4749.99,382.50,202.50,10.00,585.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(5,4750.00,5249.99,425.00,225.00,10.00,650.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(6,5250.00,5749.99,467.50,247.50,10.00,715.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(7,5750.00,6249.99,510.00,270.00,10.00,780.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(8,6250.00,6749.99,552.50,292.50,10.00,845.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(9,6750.00,7249.99,595.00,315.00,10.00,910.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(10,7250.00,7749.99,637.50,337.50,10.00,975.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(11,7750.00,8249.99,680.00,360.00,10.00,1040.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(12,8250.00,8749.99,722.50,382.50,10.00,1105.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(13,8750.00,9249.99,765.00,405.00,10.00,1170.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(14,9250.00,9749.99,807.50,427.00,10.00,1235.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(15,9750.00,10249.99,850.00,450.00,10.00,1300.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(16,10250.00,10749.99,892.50,472.50,10.00,1365.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(17,10750.00,11249.99,935.00,495.00,10.00,1430.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(18,11250.00,11749.99,977.50,517.50,10.00,1495.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(19,11750.00,12249.99,1020.00,540.00,10.00,1560.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(20,12250.00,12749.99,1062.50,562.50,10.00,1625.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(21,12750.00,13249.99,1105.00,585.00,10.00,1690.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(22,13250.00,13749.99,1147.50,607.50,10.00,1755.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(23,13750.00,14249.99,1190.00,630.00,10.00,1820.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(24,14250.00,14749.99,1232.50,652.50,10.00,1885.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(25,14750.00,15249.99,1275.00,675.00,10.00,1950.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(26,15250.00,15749.99,1317.50,697.50,10.00,2015.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(27,15750.00,16249.99,1360.00,720.00,10.00,2080.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(28,16250.00,16749.99,1402.50,742.50,10.00,2145.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(29,16750.00,17249.99,1445.00,765.00,10.00,2210.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(30,17250.00,17749.99,1487.50,787.50,10.00,2275.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(31,17750.00,18249.99,1530.00,810.00,10.00,2340.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(32,18250.00,18749.99,1572.50,832.50,10.00,2405.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(33,18750.00,19249.99,1615.00,855.00,10.00,2470.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(34,19250.00,19749.99,1657.50,877.50,10.00,2535.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(35,19750.00,20249.99,1700.00,900.00,30.00,2600.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(36,20250.00,20749.99,1700.00,900.00,30.00,2600.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(37,20750.00,21249.99,1700.00,900.00,30.00,2600.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(38,21250.00,21749.99,1700.00,900.00,30.00,2600.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(39,21750.00,22249.99,1700.00,900.00,30.00,2600.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(40,22250.00,22749.99,1700.00,900.00,30.00,2600.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(41,22750.00,23249.99,1700.00,900.00,30.00,2600.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(42,23250.00,23749.99,1700.00,900.00,30.00,2600.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(43,23750.00,24249.99,1700.00,900.00,30.00,2600.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(44,24250.00,24749.99,1700.00,900.00,30.00,2600.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(45,24750.00,999999.99,1700.00,900.00,30.00,2600.00,'2021-04-15 08:02:13','2021-04-15 08:02:13');
/*!40000 ALTER TABLE `hris_sss_table_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_tax_table_tbl`
--

DROP TABLE IF EXISTS `hris_tax_table_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_tax_table_tbl` (
  `taxID` bigint(20) NOT NULL AUTO_INCREMENT,
  `taxMinimumRange` decimal(15,2) NOT NULL,
  `taxMaximumRange` decimal(15,2) NOT NULL,
  `taxAdditionalTax` decimal(15,2) NOT NULL,
  `taxPercentage` decimal(15,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`taxID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_tax_table_tbl`
--

LOCK TABLES `hris_tax_table_tbl` WRITE;
/*!40000 ALTER TABLE `hris_tax_table_tbl` DISABLE KEYS */;
INSERT INTO `hris_tax_table_tbl` VALUES (1,1.00,20832.00,0.00,0.00,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(2,20833.00,33332.00,0.00,0.20,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(3,33333.00,66666.00,2500.00,0.25,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(4,66667.00,166666.00,10833.33,0.30,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(5,166667.00,666666.00,40833.33,0.32,'2021-04-15 08:02:13','2021-04-15 08:02:13'),(6,666667.00,999999.00,200833.33,0.35,'2021-04-15 08:02:13','2021-04-15 08:02:13');
/*!40000 ALTER TABLE `hris_tax_table_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_category_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_category_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_category_tbl` (
  `categoryID` bigint(20) NOT NULL AUTO_INCREMENT,
  `categoryCode` varchar(255) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `classificationID` bigint(20) NOT NULL,
  `categoryStatus` varchar(50) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`categoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_category_tbl`
--

LOCK TABLES `ims_inventory_category_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_category_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_category_tbl` VALUES (1,'CTY-21-00001','Project',2,'1',1,1,'2021-03-24 11:46:42','2021-04-14 09:16:46'),(2,'CTY-21-00002','Equipment',2,'1',1,1,'2021-04-14 08:17:32','0000-00-00 00:00:00'),(3,'CTY-21-00003','Purchase',1,'1',1,1,'2021-04-14 09:08:55','2021-04-14 09:16:07'),(4,'CTY-21-00004','Equipment',3,'1',1,1,'2021-04-14 10:38:46','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `ims_inventory_category_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_classification_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_classification_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_classification_tbl` (
  `classificationID` bigint(20) NOT NULL AUTO_INCREMENT,
  `classificationCode` text NOT NULL,
  `classificationName` text NOT NULL,
  `classificationStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`classificationID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_classification_tbl`
--

LOCK TABLES `ims_inventory_classification_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_classification_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_classification_tbl` VALUES (1,'CFN-21-00001','Furnitures And Fixtures',1,1,1,'2021-03-24 03:45:17','2021-04-14 01:04:43'),(2,'CFN-21-00002','Equipment',1,1,1,'2021-04-14 00:15:44','2021-04-14 01:11:43'),(3,'CFN-21-00003','Power Tools',1,1,1,'2021-04-14 01:05:09','2021-04-14 01:05:09'),(4,'CFN-21-00004','Hand Tools',1,1,1,'2021-04-14 01:05:19','2021-04-14 01:05:19'),(5,'CFN-21-00005','Vehicle',1,1,1,'2021-04-14 01:05:26','2021-04-14 01:05:26'),(6,'CFN-21-00006','Office Supplies',1,1,1,'2021-04-14 01:05:36','2021-04-14 01:05:36'),(7,'CFN-21-00007','Safety Equipment',1,1,1,'2021-04-14 01:05:46','2021-04-14 01:05:46');
/*!40000 ALTER TABLE `ims_inventory_classification_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_condition_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_condition_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_condition_tbl` (
  `conditionID` bigint(20) NOT NULL AUTO_INCREMENT,
  `conditionCode` varchar(100) NOT NULL,
  `conditionName` varchar(100) NOT NULL,
  `conditionDescription` text NOT NULL,
  `conditionStatus` int(11) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`conditionID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_condition_tbl`
--

LOCK TABLES `ims_inventory_condition_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_condition_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_condition_tbl` VALUES (1,'ICO-21-00001','Good Condition','Good Condition Good Condition Good Condition Good Condition Good Condition ',1,0,0,'2021-03-16 00:55:24','2021-03-16 00:55:24');
/*!40000 ALTER TABLE `ims_inventory_condition_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_item_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_item_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_item_tbl` (
  `itemID` bigint(20) NOT NULL AUTO_INCREMENT,
  `itemCode` varchar(255) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `brandName` text NOT NULL,
  `classificationID` bigint(20) NOT NULL,
  `categoryID` bigint(20) NOT NULL,
  `itemSize` varchar(255) NOT NULL,
  `unitOfMeasurementID` varchar(255) NOT NULL,
  `basePrice` decimal(10,2) NOT NULL,
  `reOrderLevel` int(50) NOT NULL,
  `vatType` varchar(255) NOT NULL,
  `itemDescription` text NOT NULL,
  `itemStatus` int(50) NOT NULL,
  `datecreated` date NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`itemID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_item_tbl`
--

LOCK TABLES `ims_inventory_item_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_item_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_item_tbl` VALUES (1,'ITM-21-00001','Item 1','Brand 1',1,1,'ExtraSmall','Kg',0.00,10,'','TEST',1,'2021-04-14',1,1,'2021-04-14 09:57:25','2021-04-14 09:57:25'),(2,'ITM-21-00002','Test 2','Brand 2',2,2,'Small','Ounce',0.00,20,'','TEST 2',1,'2021-04-14',1,1,'2021-04-14 09:57:47','2021-04-14 09:57:47'),(3,'ITM-21-00003','Item 3','Brand 3',4,3,'Small','Kg',0.00,30,'','TEST 3',1,'2021-04-14',1,1,'2021-04-14 09:58:08','2021-04-14 09:58:08');
/*!40000 ALTER TABLE `ims_inventory_item_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_price_list_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_price_list_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_price_list_tbl` (
  `priceListID` bigint(20) NOT NULL AUTO_INCREMENT,
  `itemID` bigint(20) NOT NULL,
  `inventoryVendorID` bigint(20) NOT NULL,
  `vendorCurrentPrice` decimal(10,2) NOT NULL,
  `preferred` int(11) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`priceListID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_price_list_tbl`
--

LOCK TABLES `ims_inventory_price_list_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_price_list_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_inventory_price_list_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_storage_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_storage_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_storage_tbl` (
  `inventoryStorageID` bigint(120) NOT NULL AUTO_INCREMENT,
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
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`inventoryStorageID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_storage_tbl`
--

LOCK TABLES `ims_inventory_storage_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_storage_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_storage_tbl` VALUES (1,'ISM-21-00001','GTC','1021','Antel','Julia Vargas','Ortigas','ADAMS (POB.)','ADAMS','ILOCOS NORTE','01','Philippines',1900,'Test','1','1',1,'2021-03-24 04:22:07.130988',1,'2021-04-12 08:03:57.353172');
/*!40000 ALTER TABLE `ims_inventory_storage_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_vendor_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_vendor_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_vendor_tbl` (
  `inventoryVendorID` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `inventoryVendorFaxNumber` varchar(100) NOT NULL,
  `inventoryVendorEnterprise` varchar(100) NOT NULL,
  `inventoryVendorIndustry` varchar(100) NOT NULL,
  `bankID` bigint(20) NOT NULL,
  `inventoryVendorBankAccName` varchar(100) NOT NULL,
  `inventoryVendorBankAccNo` varchar(100) NOT NULL,
  `inventoryVendorOpeningHours` time NOT NULL,
  `inventoryVendorClosingHours` time NOT NULL,
  `inventoryVendorStatus` int(11) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`inventoryVendorID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_vendor_tbl`
--

LOCK TABLES `ims_inventory_vendor_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_vendor_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_inventory_vendor_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_purchase_order_tbl`
--

DROP TABLE IF EXISTS `ims_purchase_order_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_purchase_order_tbl` (
  `purchaseOrderID` bigint(20) NOT NULL AUTO_INCREMENT,
  `purchaseRequestID` bigint(20) NOT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `purchaseOrderStatus` int(11) NOT NULL,
  `purchaseOrderReason` text DEFAULT NULL,
  `projectTotalAmount` decimal(15,2) DEFAULT NULL,
  `companyTotalAmount` decimal(15,2) DEFAULT NULL,
  `purchaseOrderRemarks` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`purchaseOrderID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_purchase_order_tbl`
--

LOCK TABLES `ims_purchase_order_tbl` WRITE;
/*!40000 ALTER TABLE `ims_purchase_order_tbl` DISABLE KEYS */;
INSERT INTO `ims_purchase_order_tbl` VALUES (1,8,'3|4|1',NULL,NULL,1,'TEST',1500.56,16.52,NULL,'2021-04-21 10:35:40',1,1,'2021-04-24 10:37:46','2021-04-24 10:42:29'),(2,1,'3|4|1',NULL,NULL,1,'TEST',1500.56,16.52,NULL,'2021-04-21 10:35:40',1,1,'2021-04-24 10:38:01','2021-04-24 10:38:01');
/*!40000 ALTER TABLE `ims_purchase_order_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_purchase_request_tbl`
--

DROP TABLE IF EXISTS `ims_purchase_request_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_purchase_request_tbl` (
  `purchaseRequestID` bigint(20) NOT NULL AUTO_INCREMENT,
  `revisePurchaseRequestID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `projectID` bigint(20) DEFAULT NULL,
  `referenceCode` text DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `purchaseRequestStatus` int(11) NOT NULL,
  `purchaseRequestReason` text DEFAULT NULL,
  `projectTotalAmount` decimal(15,2) DEFAULT NULL,
  `companyTotalAmount` decimal(15,2) DEFAULT NULL,
  `purchaseRequestRemarks` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`purchaseRequestID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_purchase_request_tbl`
--

LOCK TABLES `ims_purchase_request_tbl` WRITE;
/*!40000 ALTER TABLE `ims_purchase_request_tbl` DISABLE KEYS */;
INSERT INTO `ims_purchase_request_tbl` VALUES (1,NULL,1,0,NULL,NULL,NULL,NULL,4,'',0.00,0.00,NULL,NULL,1,1,'2021-04-19 06:00:13','2021-04-19 06:00:26'),(2,NULL,1,0,NULL,'3|4|2','3','2021-04-21 14:18:22',3,'TERST',0.00,0.00,'DENIED','2021-04-21 06:17:53',1,3,'2021-04-19 06:00:42','2021-04-21 06:18:22'),(3,NULL,1,0,NULL,NULL,NULL,NULL,0,'',0.00,100.00,NULL,NULL,1,1,'2021-04-19 06:01:59','2021-04-19 06:02:00'),(4,NULL,1,0,NULL,NULL,NULL,NULL,0,'',0.00,0.00,NULL,NULL,1,1,'2021-04-19 06:03:36','2021-04-19 06:03:37'),(5,NULL,1,0,NULL,NULL,NULL,NULL,0,'',0.00,0.00,NULL,NULL,1,1,'2021-04-19 06:10:26','2021-04-19 06:10:27'),(6,NULL,1,0,NULL,NULL,NULL,NULL,0,'',0.00,0.00,NULL,NULL,1,1,'2021-04-19 06:12:08','2021-04-19 06:12:09'),(7,NULL,1,0,NULL,NULL,NULL,NULL,0,'',0.00,0.00,NULL,NULL,1,1,'2021-04-19 06:13:14','2021-04-19 06:13:15'),(8,NULL,1,0,NULL,NULL,NULL,NULL,0,'',0.00,0.00,NULL,NULL,1,1,'2021-04-19 06:13:47','2021-04-19 06:13:48'),(9,2,1,0,NULL,'3|4|2',NULL,NULL,1,'TERST',0.00,0.00,NULL,'2021-04-21 06:18:33',1,1,'2021-04-21 06:18:33','2021-04-21 06:18:35');
/*!40000 ALTER TABLE `ims_purchase_request_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_request_items_tbl`
--

DROP TABLE IF EXISTS `ims_request_items_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_request_items_tbl` (
  `requestItemID` bigint(20) NOT NULL AUTO_INCREMENT,
  `costEstimateID` bigint(20) DEFAULT NULL,
  `purchaseRequestID` bigint(20) DEFAULT NULL,
  `categoryType` varchar(50) DEFAULT NULL,
  `itemID` bigint(20) DEFAULT NULL,
  `designationID` bigint(20) DEFAULT NULL,
  `designationTotalHours` bigint(20) DEFAULT NULL,
  `travelDescription` text DEFAULT NULL,
  `travelUnitOfMeasure` text DEFAULT NULL,
  `quantity` bigint(20) NOT NULL,
  `supplierName1` bigint(20) DEFAULT NULL,
  `supplierUnitCost1` decimal(10,2) DEFAULT NULL,
  `supplierRecommendation15` bigint(20) DEFAULT NULL,
  `supplierName2` bigint(20) DEFAULT NULL,
  `supplierUnitCost2` decimal(10,2) DEFAULT NULL,
  `supplierRecommendation2` bigint(20) DEFAULT NULL,
  `supplierName3` bigint(20) DEFAULT NULL,
  `supplierUnitCost3` decimal(10,2) DEFAULT NULL,
  `supplierRecommendation3` bigint(20) DEFAULT NULL,
  `unitCost` decimal(15,2) NOT NULL,
  `totalCost` decimal(15,2) NOT NULL,
  `files` text DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`requestItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_request_items_tbl`
--

LOCK TABLES `ims_request_items_tbl` WRITE;
/*!40000 ALTER TABLE `ims_request_items_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_request_items_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_category_tbl`
--

DROP TABLE IF EXISTS `pms_category_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_category_tbl` (
  `categoryID` bigint(20) NOT NULL AUTO_INCREMENT,
  `categoryCode` varchar(255) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `categoryStatus` int(50) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `datecreated` date NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`categoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_category_tbl`
--

LOCK TABLES `pms_category_tbl` WRITE;
/*!40000 ALTER TABLE `pms_category_tbl` DISABLE KEYS */;
INSERT INTO `pms_category_tbl` VALUES (1,'PCT-21-00001','Test','Test',1,1,1,'0000-00-00','2021-03-24 11:41:45','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `pms_category_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_client_tbl`
--

DROP TABLE IF EXISTS `pms_client_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_client_tbl` (
  `clientID` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `updatedAt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`clientID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_client_tbl`
--

LOCK TABLES `pms_client_tbl` WRITE;
/*!40000 ALTER TABLE `pms_client_tbl` DISABLE KEYS */;
INSERT INTO `pms_client_tbl` VALUES (1,'CLT-21-00001','123','02','BATANES','ITBAYAT','SAN RAFAEL (IDIANG)','123','123','dsadsadas',1233,'qwe','','123 312 312 312','1233 1232 131','(31) 2312 312','',1,3,3,'2021-03-23 08:33:14','0000-00-00 00:00:00'),(2,'CLT-21-00002','BlackCoders','01','ILOCOS NORTE','ADAMS','ADAMS (POB.)','1701','Antel','Philippines',1609,'Mark Nieto','marknieto@gmail.com','125 123 125 213','0959 5956 598','(14) 5465 489','www.theblackcoders.com',1,1,1,'2021-04-08 11:21:01','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `pms_client_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_cost_estimate_tbl`
--

DROP TABLE IF EXISTS `pms_cost_estimate_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_cost_estimate_tbl` (
  `costEstimateID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseCostEstimateID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `projectID` bigint(20) DEFAULT NULL,
  `referenceCode` text DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `costEstimateStatus` int(11) NOT NULL,
  `costEstimateReason` text DEFAULT NULL,
  `costEstimateRemarks` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`costEstimateID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_cost_estimate_tbl`
--

LOCK TABLES `pms_cost_estimate_tbl` WRITE;
/*!40000 ALTER TABLE `pms_cost_estimate_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `pms_cost_estimate_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_project_list_tbl`
--

DROP TABLE IF EXISTS `pms_project_list_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_project_list_tbl` (
  `projectListID` bigint(20) NOT NULL AUTO_INCREMENT,
  `projectListCode` varchar(100) NOT NULL,
  `projectListName` varchar(100) NOT NULL,
  `projectListDescription` text NOT NULL,
  `categoryID` bigint(21) DEFAULT NULL,
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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`projectListID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_project_list_tbl`
--

LOCK TABLES `pms_project_list_tbl` WRITE;
/*!40000 ALTER TABLE `pms_project_list_tbl` DISABLE KEYS */;
INSERT INTO `pms_project_list_tbl` VALUES (1,'PRO-21-00001','TEST','TEST',1,'2021-03-30','2021-03-30',1,1,2,'2|3',3,1,0,0,'2021-04-08 03:24:17','2021-04-25 23:51:25'),(5,'PRJ-21-00002','TEST 2','TEST 2',1,'2021-04-14','2021-05-05',2,3,2,'5|6',2,2,0,1,'2021-04-14 06:42:04','2021-04-25 23:51:25');
/*!40000 ALTER TABLE `pms_project_list_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_project_milestone_tbl`
--

DROP TABLE IF EXISTS `pms_project_milestone_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_project_milestone_tbl` (
  `projectMilestoneID` bigint(20) NOT NULL AUTO_INCREMENT,
  `projectMilestoneCode` varchar(100) NOT NULL,
  `projectMilestoneName` varchar(100) NOT NULL,
  `projectMilestoneDescription` text NOT NULL,
  `projectMilestoneStatus` int(11) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`projectMilestoneID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_project_milestone_tbl`
--

LOCK TABLES `pms_project_milestone_tbl` WRITE;
/*!40000 ALTER TABLE `pms_project_milestone_tbl` DISABLE KEYS */;
INSERT INTO `pms_project_milestone_tbl` VALUES (5,'MIL-21-00001','Milestone 1','Milestone Desc',1,0,0,'2021-03-18 01:25:52','2021-03-18 01:25:52'),(6,'MIL-21-00002','TEST','TEST',1,0,1,'2021-04-08 03:06:26','2021-04-08 03:06:39');
/*!40000 ALTER TABLE `pms_project_milestone_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'erpdb'
--

--
-- Dumping routines for database 'erpdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-26  8:05:36
