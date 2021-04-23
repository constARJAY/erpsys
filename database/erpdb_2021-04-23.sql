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
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_module_list_tbl`
--

LOCK TABLES `gen_module_list_tbl` WRITE;
/*!40000 ALTER TABLE `gen_module_list_tbl` DISABLE KEYS */;
INSERT INTO `gen_module_list_tbl` VALUES (1,5,1,1,'Project Management System|Inventory Management System|Finance Management System','01618295087.svg|11618295087.svg|21618295087.svg|31618295087.svg|41618295087.svg|51618295087.svg|6161','Approval Setup',0,'approval_setup',1,'2021-03-23 23:22:25','2021-04-13 06:24:47'),(2,5,1,2,'Inventory Management System|Project Management System|Finance Management System|Human Resource Information System',NULL,'Roles and Permission',0,'roles_permission',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(3,5,1,3,'Inventory Management System|Project Management System|Finance Management System|Human Resource Information System',NULL,'System Notification',0,'system_notification',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(4,2,2,1,'Inventory Management System',NULL,'Inventory Item',0,'ims/inventory_item',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(5,2,2,2,'Inventory Management System',NULL,'Inventory Category',0,'ims/inventory_category',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(6,2,2,3,'Inventory Management System',NULL,'Inventory Classification',0,'ims/inventory_classification',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(7,2,2,4,'Inventory Management System',NULL,'Inventory Storage',0,'ims/inventory_storage',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(8,2,2,5,'Inventory Management System',NULL,'Inventory Vendor',0,'ims/inventory_vendor',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(9,2,2,6,'Inventory Management System',NULL,'Inventory Condition',0,'ims/inventory_condition',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(10,2,2,7,'Project Management System',NULL,'Project Milestone',0,'pms/project_milestone',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(11,2,2,8,'Project Management System',NULL,'Project List',0,'pms/project_list',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(12,2,2,9,'Project Management System',NULL,'Project Client',0,'pms/project_client',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(13,2,2,10,'Project Management System',NULL,'Project Category',0,'pms/project_category',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(14,2,2,11,'Finance Management System',NULL,'Bank',0,'fms/bank',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(15,2,2,12,'Finance Management System',NULL,'Chart of Accounts',0,'fms/chart_of_account',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(16,2,2,13,'Finance Management System',NULL,'Ledger Classification',0,'fms/ledger_classification',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(17,2,2,14,'Human Resource Information System',NULL,'Designation',0,'hris/designation',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(18,2,2,15,'Human Resource Information System',NULL,'Department',0,'hris/department',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(19,2,2,16,'Human Resource Information System',NULL,'Requirement',0,'hris/requirement',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(20,2,2,17,'Human Resource Information System',NULL,'Holiday',0,'hris/holiday',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(21,2,2,18,'Human Resource Information System',NULL,'Leave Type',0,'hris/leave_type',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(22,2,2,19,'Human Resource Information System',NULL,'Loan Type',0,'hris/loan_type',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(23,2,2,20,'Human Resource Information System',NULL,'Code of Conduct Category',0,'hris/code_conduct_category',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(24,2,2,21,'Human Resource Information System',NULL,'Code of Conduct Section',0,'hris/code_conduct_section',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(25,2,2,22,'Human Resource Information System',NULL,'Branch',0,'hris/branch',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(26,2,2,23,'Human Resource Information System',NULL,'Qualification',0,'hris/qualification',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(27,2,2,24,'Human Resource Information System',NULL,'Award',0,'hris/award',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(28,2,2,25,'Human Resource Information System',NULL,'SSS Table',0,'hris/sss_table',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(29,2,2,26,'Human Resource Information System',NULL,'PhilHealth Table',0,'hris/philhealth_table',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(30,2,2,27,'Human Resource Information System',NULL,'Tax Table',0,'hris/tax_table',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(31,2,2,28,'Human Resource Information System',NULL,'Training and Development',0,'hris/training_development',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(32,2,2,29,'Human Resource Information System',NULL,'Examination',0,'hris/examination',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(33,2,3,1,'Inventory Management System',NULL,'Inventory Receiving',3,'ims/inventory_receiving',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(34,2,3,2,'Inventory Management System',NULL,'List of Stocks',0,'ims/list_stocks',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(35,2,3,3,'Inventory Management System',NULL,'Return Item',3,'ims/return_item',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(36,2,3,4,'Inventory Management System',NULL,'Disposal',3,'ims/disposal',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(37,2,3,5,'Inventory Management System',NULL,'Transfer Request',3,'ims/transfer_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(38,2,3,6,'Inventory Management System',NULL,'Cost Estimate',3,'ims/cost_estimate',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(39,2,3,7,'Inventory Management System',NULL,'Bill of Material',3,'ims/bill_material',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(40,2,3,8,'Inventory Management System',NULL,'Bid Recap',3,'ims/bid_recap',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(41,2,3,9,'Inventory Management System',NULL,'Service Order',3,'ims/service_order',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(42,2,4,1,'Inventory Management System',NULL,'Material Withdrawal',3,'ims/material_withdrawal',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(43,2,4,2,'Inventory Management System',NULL,'Equipment Borrowing',3,'ims/equipment_borrowing',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(44,2,4,3,'Inventory Management System',NULL,'Inventory Incident',3,'ims/inventory_incident',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(45,2,4,4,'Inventory Management System',NULL,'Material Usage',3,'ims/material_usage',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(46,2,4,5,'Inventory Management System',NULL,'Purchase Request',3,'ims/purchase_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(47,2,4,6,'Inventory Management System',NULL,'Purchase Order',3,'ims/purchase_order',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(48,2,4,7,'Inventory Management System',NULL,'Item Price List',0,'ims/item_price_list',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(49,2,4,8,'Inventory Management System',NULL,'Service Order Requisition',3,'ims/service_order_requisition',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(50,2,4,9,'Project Management System',NULL,'Personel Requisition',3,'pms/personel_requisition',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(51,2,4,10,'Project Management System',NULL,'Employee Taskboard',3,'pms/employee_taskboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(52,2,4,11,'Project Management System',NULL,'Sign-off',3,'pms/sign_off',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(53,2,4,12,'Finance Management System',NULL,'Petty Cash Request',3,'fms/petty_cash_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(54,2,4,13,'Finance Management System',NULL,'Client Fund Request',3,'fms/client_fund_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(55,2,4,14,'Human Resource Information System',NULL,'Leave Request',3,'hris/leave_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(56,2,4,15,'Human Resource Information System',NULL,'Overtime Request',3,'hris/overtime_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(57,2,4,16,'Human Resources Information System',NULL,'No Time In/Out',3,'hris/no_timein_timeout',1,'2021-03-23 23:22:25','2021-03-25 05:53:42'),(58,2,4,17,'Human Resource Information System',NULL,'Official Business',3,'hris/official_business',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(59,2,4,18,'Human Resources Information System',NULL,'Loan',3,'hris/loan_form',1,'2021-03-23 23:22:25','2021-04-13 03:47:55'),(60,2,4,19,'Human Resource Information System',NULL,'Change Schedule',3,'hris/change_schedule',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(61,2,4,20,'Human Resource Information System',NULL,'Employee Evaluation',3,'hris/employee_evaluation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(62,2,4,21,'Human Resource Information System',NULL,'Clearance',3,'hris/clearance',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(63,6,4,1,'Inventory Management System',NULL,'Purhcase Order Report',0,'ims/purchase_order_report',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(64,6,4,2,'Inventory Management System',NULL,'Receiving Report',0,'ims/receiving_report',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(65,6,4,3,'Inventory Management System',NULL,'Inventory Incident Report',0,'ims/inventory_incident_report',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(66,6,4,4,'Inventory Management System',NULL,'Inventory Report',0,'ims/inventory_report',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(67,1,12,1,'Inventory Management System',NULL,'Inventory Dashboard',0,'ims/inventory_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(68,1,12,2,'Project Management System',NULL,'Project Dashboard',0,'pms/project_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(69,1,12,3,'Finance Management System',NULL,'Finance Dashboard',0,'fms/finance_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(70,1,12,4,'Human Resource Information System',NULL,'HRIS Dashboard',0,'hris/hr_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(71,4,6,5,'Project Management System',NULL,'Project Management',0,'fms/project_management',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(72,4,6,6,'Project Management System',NULL,'Project Task',0,'fms/project_task',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(73,4,6,7,'Project Management System',NULL,'Project Timeline',0,'fms/project_timeline',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(74,4,6,8,'Finance Management System',NULL,'Petty Cash Voucher',0,'fms/petty_cash_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(75,4,6,9,'Finance Management System',NULL,'Client Fund Voucher',0,'fms/client_fund_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(76,4,6,10,'Finance Management System',NULL,'Payment Request',0,'fms/payment_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(77,4,6,11,'Finance Management System',NULL,'Check Voucher',0,'fms/check_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(78,4,6,12,'Human Resource Information System',NULL,'Examination Report',0,'hris/examination_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(79,4,6,13,'Human Resource Information System',NULL,'Timekeeping Report',0,'hris/timekeeping_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(80,4,6,14,'Human Resource Information System',NULL,'Payroll Report',0,'hris/payroll_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(81,4,6,15,'Human Resource Information System',NULL,'Payroll Adjustment Report',0,'hris/payroll_adjustment_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(82,4,6,16,'Human Resource Information System',NULL,'Payslip Generation',0,'hris/payslip_generation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(83,4,6,17,'Human Resource Information System',NULL,'13th Month Report',0,'hris/13th_month_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(84,4,6,18,'Human Resource Information System',NULL,'PHIC Premium Payment',0,'hris/phic_premium_payment',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(85,4,6,19,'Human Resource Information System',NULL,'SSS Premium Payment',0,'hris/sss_premium_payment',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(86,4,6,20,'Human Resource Information System',NULL,'HDMF Premim Payment',0,'hris/hdmf_premium_payment',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(87,4,6,21,'Human Resource Information System',NULL,'Manpower Management Report',0,'hris/manpower_management_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(88,1,12,5,'Human Resource Information System',NULL,'Employee Dashboard',0,'hris/employee_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(89,2,5,1,'Project Management System',NULL,'Milestone Builder',3,'pms/milestone_builder',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(90,2,5,2,'Project Management System',NULL,'Project Timeline Builder',0,'pms/project_timeline_builder',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(91,2,5,3,'Project Management System',NULL,'Manage Project Budget',3,'pms/manage_project_budget',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(92,2,5,4,'Project Management System',NULL,'Project Management Board',3,'pms/project_management_board',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(93,2,7,1,'Finance Management System',NULL,'Petty Cash Voucher',3,'fms/petty_cash_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(94,2,7,2,'Finance Management System',NULL,'Client Fund Voucher',3,'fms/client_fund_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(95,2,7,3,'Finance Management System',NULL,'Payment Request',3,'fms/payment_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(96,2,7,4,'Finance Management System',NULL,'Check Voucher',3,'fms/check_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(97,2,7,5,'Finance Management System',NULL,'Check Writer',3,'fms/check_writer',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(98,2,7,6,'Finance Management System',NULL,'Check Voucher Liquidation',3,'fms/check_voucher_liquidation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(99,2,7,7,'Finance Management System',NULL,'Billing',3,'fms/billing',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(100,2,7,8,'Finance Management System',NULL,'Collection',3,'fms/collection',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(101,5,9,1,'Human Resource Information System',NULL,'Schedule Setup',0,'hris/schedule_setup',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(102,5,9,2,'Human Resource Information System',NULL,'Orientation Setup',0,'hris/orientation_setup',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(103,2,10,1,'Human Resources Information System',NULL,'Job Posting',0,'hris/job_posting',1,'2021-03-23 23:22:25','2021-03-25 05:25:43'),(104,2,10,2,'Human Resource Information System',NULL,'Applicant Registration',0,'hris/application_registration',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(105,2,10,3,'Human Resource Information System',NULL,'Examination',0,'hris/examination',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(106,2,10,4,'Human Resource Information System',NULL,'Applicant List',0,'hris/applicant_list',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(107,2,10,5,'Human Resource Information System',NULL,'On-boarding',0,'hris/on_boarding',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(108,2,11,1,'Human Resource Information System',NULL,'Employee Attendance',0,'hris/employee_attendance',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(109,2,11,2,'Human Resource Information System',NULL,'Timekeeping',0,'hris/timekeeping',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(110,2,11,3,'Human Resource Information System',NULL,'Payroll',0,'hris/payroll',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(111,2,11,4,'Human Resource Information System',NULL,'Payroll Adjustment',0,'hris/payroll_adjustment',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(112,2,11,5,'Human Resource Information System',NULL,'13th Month',0,'hris/13th_month',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(113,2,8,1,'Human Resource Information System',NULL,'Personnel Requisition',0,'hris/personnel_requisition',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(114,2,8,2,'Human Resources Information System',NULL,'Employee Module',0,'hris/employee_module',1,'2021-03-23 23:22:25','2021-04-19 05:22:53'),(115,2,8,3,'Human Resource Information System',NULL,'Personal Action Notice',0,'hris/personal_action_notice',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(116,2,8,4,'Human Resource Information System',NULL,'Manpower Management',0,'hris/manpower_management',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(117,2,8,5,'Human Resource Information System',NULL,'Employee Relation',0,'hris/employee_relation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(118,2,8,6,'Human Resource Information System',NULL,'Employee Evaluation',0,'hris/employee_evaluation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(119,2,8,7,'Human Resource Information System',NULL,'Employee Management',0,'hris/employee_management',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(120,2,8,8,'Human Resource Information System',NULL,'Memorandum',0,'hris/memorandum',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(121,2,8,9,'Human Resource Information System',NULL,'Employee Award',0,'hris/employee_award',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(122,2,8,10,'Human Resource Information System',NULL,'Leave Monitoring',0,'hris/leave_monitoring',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(123,2,8,11,'Human Resource Information System',NULL,'Training and Development',0,'hris/training_development',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(124,2,8,12,'Human Resource Information System',NULL,'Event Calendar',0,'hris/event_calendar',1,'2021-03-23 23:22:25','2021-03-23 23:58:14');
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
INSERT INTO `gen_roles_permission_tbl` VALUES (1,1,0,1,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(2,1,0,2,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(3,1,0,3,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(4,1,0,4,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(5,1,0,5,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(6,1,0,6,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(7,1,0,7,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(8,1,0,8,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(9,1,0,9,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(10,1,0,10,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(11,1,0,11,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(12,1,0,12,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(13,1,0,13,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(14,1,0,14,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(15,1,0,15,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(16,1,0,16,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(17,1,0,17,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(18,1,0,18,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(19,1,0,19,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(20,1,0,20,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(21,1,0,21,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(22,1,0,22,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(23,1,0,23,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(24,1,0,24,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(25,1,0,25,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(26,1,0,26,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(27,1,0,27,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(28,1,0,28,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(29,1,0,29,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(30,1,0,30,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(31,1,0,31,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(32,1,0,32,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(33,1,0,33,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(34,1,0,34,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(35,1,0,35,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(36,1,0,36,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(37,1,0,37,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(38,1,0,38,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(39,1,0,39,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(40,1,0,40,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(41,1,0,41,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(42,1,0,42,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(43,1,0,43,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(44,1,0,44,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(45,1,0,45,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(46,1,0,46,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(47,1,0,47,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(48,1,0,48,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(49,1,0,49,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(50,1,0,50,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(51,1,0,51,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(52,1,0,52,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(53,1,0,53,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(54,1,0,54,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(55,1,0,55,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(56,1,0,56,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(57,1,0,57,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(58,1,0,58,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(59,1,0,59,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(60,1,0,60,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(61,1,0,61,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(62,1,0,62,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(63,1,0,63,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(64,1,0,64,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(65,1,0,65,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(66,1,0,66,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(67,1,0,67,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(68,1,0,68,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(69,1,0,69,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(70,1,0,70,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(71,1,0,71,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(72,1,0,72,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(73,1,0,73,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(74,1,0,74,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(75,1,0,75,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(76,1,0,76,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(77,1,0,77,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(78,1,0,78,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(79,1,0,79,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(80,1,0,80,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(81,1,0,81,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(82,1,0,82,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(83,1,0,83,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(84,1,0,84,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(85,1,0,85,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(86,1,0,86,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(87,1,0,87,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(88,1,0,88,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(89,1,0,89,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(90,1,0,90,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(91,1,0,91,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(92,1,0,92,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(93,1,0,93,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(94,1,0,94,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(95,1,0,95,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(96,1,0,96,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(97,1,0,97,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(98,1,0,98,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(99,1,0,99,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(100,1,0,100,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(101,1,0,101,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(102,1,0,102,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(103,1,0,103,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(104,1,0,104,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(105,1,0,105,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(106,1,0,106,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(107,1,0,107,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(108,1,0,108,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(109,1,0,109,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(110,1,0,110,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(111,1,0,111,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(112,1,0,112,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(113,1,0,113,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(114,1,0,114,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(115,1,0,115,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(116,1,0,116,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(117,1,0,117,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(118,1,0,118,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(119,1,0,119,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(120,1,0,120,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(121,1,0,121,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(122,1,0,122,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(123,1,0,123,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(124,1,0,124,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(125,2,0,1,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(126,2,0,2,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(127,2,0,3,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(128,2,0,4,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(129,2,0,5,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(130,2,0,6,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(131,2,0,7,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(132,2,0,8,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(133,2,0,9,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(134,2,0,10,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(135,2,0,11,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(136,2,0,12,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(137,2,0,13,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(138,2,0,14,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(139,2,0,15,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(140,2,0,16,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(141,2,0,17,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(142,2,0,18,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(143,2,0,19,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(144,2,0,20,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(145,2,0,21,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(146,2,0,22,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(147,2,0,23,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(148,2,0,24,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(149,2,0,25,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(150,2,0,26,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(151,2,0,27,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(152,2,0,28,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(153,2,0,29,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(154,2,0,30,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(155,2,0,31,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(156,2,0,32,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(157,2,0,33,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(158,2,0,34,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(159,2,0,35,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(160,2,0,36,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(161,2,0,37,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(162,2,0,38,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(163,2,0,39,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(164,2,0,40,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(165,2,0,41,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(166,2,0,42,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(167,2,0,43,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(168,2,0,44,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(169,2,0,45,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(170,2,0,46,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(171,2,0,47,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(172,2,0,48,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(173,2,0,49,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(174,2,0,50,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(175,2,0,51,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(176,2,0,52,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(177,2,0,53,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(178,2,0,54,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(179,2,0,55,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(180,2,0,56,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(181,2,0,57,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(182,2,0,58,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(183,2,0,59,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(184,2,0,60,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(185,2,0,61,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(186,2,0,62,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(187,2,0,63,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(188,2,0,64,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(189,2,0,65,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(190,2,0,66,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(191,2,0,67,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(192,2,0,68,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(193,2,0,69,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(194,2,0,70,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(195,2,0,71,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(196,2,0,72,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(197,2,0,73,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(198,2,0,74,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(199,2,0,75,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(200,2,0,76,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(201,2,0,77,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(202,2,0,78,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(203,2,0,79,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(204,2,0,80,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(205,2,0,81,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(206,2,0,82,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(207,2,0,83,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(208,2,0,84,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(209,2,0,85,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(210,2,0,86,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(211,2,0,87,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(212,2,0,88,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(213,2,0,89,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(214,2,0,90,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(215,2,0,91,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(216,2,0,92,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(217,2,0,93,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(218,2,0,94,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(219,2,0,95,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(220,2,0,96,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(221,2,0,97,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(222,2,0,98,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(223,2,0,99,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(224,2,0,100,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(225,2,0,101,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(226,2,0,102,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(227,2,0,103,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(228,2,0,104,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(229,2,0,105,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(230,2,0,106,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(231,2,0,107,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(232,2,0,108,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(233,2,0,109,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(234,2,0,110,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(235,2,0,111,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(236,2,0,112,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(237,2,0,113,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(238,2,0,114,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(239,2,0,115,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(240,2,0,116,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(241,2,0,117,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(242,2,0,118,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(243,2,0,119,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(244,2,0,120,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(245,2,0,121,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(246,2,0,122,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(247,2,0,123,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(248,2,0,124,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(249,3,0,1,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(250,3,0,2,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(251,3,0,3,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(252,3,0,4,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(253,3,0,5,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(254,3,0,6,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(255,3,0,7,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(256,3,0,8,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(257,3,0,9,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(258,3,0,10,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(259,3,0,11,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(260,3,0,12,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(261,3,0,13,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(262,3,0,14,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(263,3,0,15,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(264,3,0,16,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(265,3,0,17,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(266,3,0,18,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(267,3,0,19,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(268,3,0,20,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(269,3,0,21,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(270,3,0,22,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(271,3,0,23,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(272,3,0,24,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(273,3,0,25,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(274,3,0,26,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(275,3,0,27,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(276,3,0,28,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(277,3,0,29,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(278,3,0,30,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(279,3,0,31,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(280,3,0,32,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(281,3,0,33,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(282,3,0,34,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(283,3,0,35,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(284,3,0,36,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(285,3,0,37,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(286,3,0,38,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(287,3,0,39,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(288,3,0,40,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(289,3,0,41,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(290,3,0,42,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(291,3,0,43,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(292,3,0,44,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(293,3,0,45,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(294,3,0,46,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(295,3,0,47,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(296,3,0,48,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(297,3,0,49,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(298,3,0,50,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(299,3,0,51,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(300,3,0,52,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(301,3,0,53,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(302,3,0,54,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(303,3,0,55,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(304,3,0,56,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(305,3,0,57,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(306,3,0,58,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(307,3,0,59,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(308,3,0,60,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(309,3,0,61,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(310,3,0,62,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(311,3,0,63,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(312,3,0,64,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(313,3,0,65,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(314,3,0,66,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(315,3,0,67,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(316,3,0,68,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(317,3,0,69,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(318,3,0,70,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(319,3,0,71,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(320,3,0,72,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(321,3,0,73,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(322,3,0,74,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(323,3,0,75,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(324,3,0,76,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(325,3,0,77,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(326,3,0,78,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(327,3,0,79,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(328,3,0,80,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(329,3,0,81,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(330,3,0,82,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(331,3,0,83,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(332,3,0,84,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(333,3,0,85,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(334,3,0,86,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(335,3,0,87,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(336,3,0,88,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(337,3,0,89,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(338,3,0,90,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(339,3,0,91,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(340,3,0,92,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(341,3,0,93,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(342,3,0,94,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(343,3,0,95,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(344,3,0,96,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(345,3,0,97,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(346,3,0,98,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(347,3,0,99,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(348,3,0,100,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(349,3,0,101,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(350,3,0,102,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(351,3,0,103,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(352,3,0,104,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(353,3,0,105,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(354,3,0,106,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(355,3,0,107,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(356,3,0,108,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(357,3,0,109,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(358,3,0,110,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(359,3,0,111,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(360,3,0,112,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(361,3,0,113,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(362,3,0,114,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(363,3,0,115,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(364,3,0,116,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(365,3,0,117,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(366,3,0,118,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(367,3,0,119,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(368,3,0,120,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(369,3,0,121,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(370,3,0,122,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(371,3,0,123,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(372,3,0,124,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(373,4,0,1,1,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(374,4,0,2,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(375,4,0,3,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(376,4,0,4,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(377,4,0,5,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(378,4,0,6,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(379,4,0,7,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(380,4,0,8,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(381,4,0,9,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(382,4,0,10,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(383,4,0,11,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(384,4,0,12,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(385,4,0,13,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(386,4,0,14,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(387,4,0,15,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(388,4,0,16,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(389,4,0,17,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(390,4,0,18,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(391,4,0,19,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(392,4,0,20,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(393,4,0,21,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(394,4,0,22,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(395,4,0,23,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(396,4,0,24,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(397,4,0,25,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(398,4,0,26,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(399,4,0,27,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(400,4,0,28,0,'2021-04-07 05:37:51','2021-04-07 05:37:51'),(401,4,0,29,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(402,4,0,30,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(403,4,0,31,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(404,4,0,32,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(405,4,0,33,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(406,4,0,34,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(407,4,0,35,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(408,4,0,36,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(409,4,0,37,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(410,4,0,38,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(411,4,0,39,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(412,4,0,40,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(413,4,0,41,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(414,4,0,42,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(415,4,0,43,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(416,4,0,44,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(417,4,0,45,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(418,4,0,46,1,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(419,4,0,47,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(420,4,0,48,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(421,4,0,49,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(422,4,0,50,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(423,4,0,51,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(424,4,0,52,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(425,4,0,53,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(426,4,0,54,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(427,4,0,55,1,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(428,4,0,56,1,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(429,4,0,57,1,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(430,4,0,58,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(431,4,0,59,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(432,4,0,60,1,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(433,4,0,61,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(434,4,0,62,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(435,4,0,63,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(436,4,0,64,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(437,4,0,65,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(438,4,0,66,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(439,4,0,67,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(440,4,0,68,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(441,4,0,69,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(442,4,0,70,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(443,4,0,71,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(444,4,0,72,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(445,4,0,73,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(446,4,0,74,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(447,4,0,75,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(448,4,0,76,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(449,4,0,77,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(450,4,0,78,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(451,4,0,79,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(452,4,0,80,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(453,4,0,81,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(454,4,0,82,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(455,4,0,83,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(456,4,0,84,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(457,4,0,85,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(458,4,0,86,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(459,4,0,87,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(460,4,0,88,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(461,4,0,89,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(462,4,0,90,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(463,4,0,91,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(464,4,0,92,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(465,4,0,93,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(466,4,0,94,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(467,4,0,95,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(468,4,0,96,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(469,4,0,97,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(470,4,0,98,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(471,4,0,99,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(472,4,0,100,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(473,4,0,101,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(474,4,0,102,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(475,4,0,103,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(476,4,0,104,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(477,4,0,105,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(478,4,0,106,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(479,4,0,107,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(480,4,0,108,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(481,4,0,109,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(482,4,0,110,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(483,4,0,111,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(484,4,0,112,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(485,4,0,113,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(486,4,0,114,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(487,4,0,115,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(488,4,0,116,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(489,4,0,117,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(490,4,0,118,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(491,4,0,119,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(492,4,0,120,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(493,4,0,121,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(494,4,0,122,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(495,4,0,123,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(496,4,0,124,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(497,5,0,1,1,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(498,5,0,2,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(499,5,0,3,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(500,5,0,4,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(501,5,0,5,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(502,5,0,6,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(503,5,0,7,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(504,5,0,8,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(505,5,0,9,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(506,5,0,10,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(507,5,0,11,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(508,5,0,12,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(509,5,0,13,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(510,5,0,14,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(511,5,0,15,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(512,5,0,16,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(513,5,0,17,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(514,5,0,18,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(515,5,0,19,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(516,5,0,20,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(517,5,0,21,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(518,5,0,22,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(519,5,0,23,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(520,5,0,24,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(521,5,0,25,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(522,5,0,26,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(523,5,0,27,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(524,5,0,28,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(525,5,0,29,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(526,5,0,30,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(527,5,0,31,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(528,5,0,32,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(529,5,0,33,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(530,5,0,34,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(531,5,0,35,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(532,5,0,36,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(533,5,0,37,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(534,5,0,38,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(535,5,0,39,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(536,5,0,40,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(537,5,0,41,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(538,5,0,42,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(539,5,0,43,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(540,5,0,44,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(541,5,0,45,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(542,5,0,46,1,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(543,5,0,47,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(544,5,0,48,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(545,5,0,49,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(546,5,0,50,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(547,5,0,51,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(548,5,0,52,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(549,5,0,53,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(550,5,0,54,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(551,5,0,55,1,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(552,5,0,56,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(553,5,0,57,1,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(554,5,0,58,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(555,5,0,59,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(556,5,0,60,1,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(557,5,0,61,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(558,5,0,62,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(559,5,0,63,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(560,5,0,64,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(561,5,0,65,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(562,5,0,66,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(563,5,0,67,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(564,5,0,68,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(565,5,0,69,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(566,5,0,70,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(567,5,0,71,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(568,5,0,72,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(569,5,0,73,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(570,5,0,74,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(571,5,0,75,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(572,5,0,76,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(573,5,0,77,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(574,5,0,78,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(575,5,0,79,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(576,5,0,80,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(577,5,0,81,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(578,5,0,82,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(579,5,0,83,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(580,5,0,84,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(581,5,0,85,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(582,5,0,86,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(583,5,0,87,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(584,5,0,88,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(585,5,0,89,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(586,5,0,90,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(587,5,0,91,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(588,5,0,92,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(589,5,0,93,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(590,5,0,94,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(591,5,0,95,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(592,5,0,96,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(593,5,0,97,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(594,5,0,98,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(595,5,0,99,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(596,5,0,100,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(597,5,0,101,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(598,5,0,102,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(599,5,0,103,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(600,5,0,104,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(601,5,0,105,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(602,5,0,106,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(603,5,0,107,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(604,5,0,108,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(605,5,0,109,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(606,5,0,110,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(607,5,0,111,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(608,5,0,112,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(609,5,0,113,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(610,5,0,114,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(611,5,0,115,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(612,5,0,116,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(613,5,0,117,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(614,5,0,118,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(615,5,0,119,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(616,5,0,120,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(617,5,0,121,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(618,5,0,122,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(619,5,0,123,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(620,5,0,124,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(621,6,0,1,1,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(622,6,0,2,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(623,6,0,3,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(624,6,0,4,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(625,6,0,5,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(626,6,0,6,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(627,6,0,7,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(628,6,0,8,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(629,6,0,9,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(630,6,0,10,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(631,6,0,11,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(632,6,0,12,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(633,6,0,13,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(634,6,0,14,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(635,6,0,15,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(636,6,0,16,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(637,6,0,17,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(638,6,0,18,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(639,6,0,19,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(640,6,0,20,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(641,6,0,21,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(642,6,0,22,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(643,6,0,23,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(644,6,0,24,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(645,6,0,25,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(646,6,0,26,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(647,6,0,27,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(648,6,0,28,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(649,6,0,29,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(650,6,0,30,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(651,6,0,31,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(652,6,0,32,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(653,6,0,33,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(654,6,0,34,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(655,6,0,35,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(656,6,0,36,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(657,6,0,37,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(658,6,0,38,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(659,6,0,39,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(660,6,0,40,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(661,6,0,41,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(662,6,0,42,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(663,6,0,43,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(664,6,0,44,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(665,6,0,45,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(666,6,0,46,1,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(667,6,0,47,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(668,6,0,48,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(669,6,0,49,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(670,6,0,50,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(671,6,0,51,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(672,6,0,52,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(673,6,0,53,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(674,6,0,54,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(675,6,0,55,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(676,6,0,56,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(677,6,0,57,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(678,6,0,58,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(679,6,0,59,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(680,6,0,60,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(681,6,0,61,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(682,6,0,62,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(683,6,0,63,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(684,6,0,64,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(685,6,0,65,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(686,6,0,66,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(687,6,0,67,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(688,6,0,68,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(689,6,0,69,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(690,6,0,70,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(691,6,0,71,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(692,6,0,72,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(693,6,0,73,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(694,6,0,74,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(695,6,0,75,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(696,6,0,76,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(697,6,0,77,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(698,6,0,78,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(699,6,0,79,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(700,6,0,80,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(701,6,0,81,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(702,6,0,82,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(703,6,0,83,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(704,6,0,84,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(705,6,0,85,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(706,6,0,86,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(707,6,0,87,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(708,6,0,88,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(709,6,0,89,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(710,6,0,90,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(711,6,0,91,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(712,6,0,92,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(713,6,0,93,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(714,6,0,94,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(715,6,0,95,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(716,6,0,96,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(717,6,0,97,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(718,6,0,98,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(719,6,0,99,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(720,6,0,100,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(721,6,0,101,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(722,6,0,102,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(723,6,0,103,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(724,6,0,104,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(725,6,0,105,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(726,6,0,106,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(727,6,0,107,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(728,6,0,108,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(729,6,0,109,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(730,6,0,110,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(731,6,0,111,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(732,6,0,112,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(733,6,0,113,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(734,6,0,114,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(735,6,0,115,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(736,6,0,116,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(737,6,0,117,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(738,6,0,118,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(739,6,0,119,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(740,6,0,120,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(741,6,0,121,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(742,6,0,122,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(743,6,0,123,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(744,6,0,124,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(745,7,0,1,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(746,7,0,2,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(747,7,0,3,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(748,7,0,4,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(749,7,0,5,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(750,7,0,6,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(751,7,0,7,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(752,7,0,8,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(753,7,0,9,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(754,7,0,10,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(755,7,0,11,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(756,7,0,12,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(757,7,0,13,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(758,7,0,14,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(759,7,0,15,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(760,7,0,16,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(761,7,0,17,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(762,7,0,18,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(763,7,0,19,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(764,7,0,20,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(765,7,0,21,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(766,7,0,22,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(767,7,0,23,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(768,7,0,24,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(769,7,0,25,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(770,7,0,26,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(771,7,0,27,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(772,7,0,28,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(773,7,0,29,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(774,7,0,30,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(775,7,0,31,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(776,7,0,32,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(777,7,0,33,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(778,7,0,34,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(779,7,0,35,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(780,7,0,36,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(781,7,0,37,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(782,7,0,38,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(783,7,0,39,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(784,7,0,40,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(785,7,0,41,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(786,7,0,42,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(787,7,0,43,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(788,7,0,44,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(789,7,0,45,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(790,7,0,46,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(791,7,0,47,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(792,7,0,48,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(793,7,0,49,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(794,7,0,50,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(795,7,0,51,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(796,7,0,52,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(797,7,0,53,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(798,7,0,54,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(799,7,0,55,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(800,7,0,56,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(801,7,0,57,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(802,7,0,58,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(803,7,0,59,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(804,7,0,60,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(805,7,0,61,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(806,7,0,62,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(807,7,0,63,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(808,7,0,64,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(809,7,0,65,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(810,7,0,66,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(811,7,0,67,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(812,7,0,68,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(813,7,0,69,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(814,7,0,70,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(815,7,0,71,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(816,7,0,72,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(817,7,0,73,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(818,7,0,74,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(819,7,0,75,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(820,7,0,76,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(821,7,0,77,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(822,7,0,78,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(823,7,0,79,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(824,7,0,80,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(825,7,0,81,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(826,7,0,82,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(827,7,0,83,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(828,7,0,84,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(829,7,0,85,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(830,7,0,86,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(831,7,0,87,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(832,7,0,88,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(833,7,0,89,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(834,7,0,90,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(835,7,0,91,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(836,7,0,92,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(837,7,0,93,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(838,7,0,94,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(839,7,0,95,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(840,7,0,96,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(841,7,0,97,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(842,7,0,98,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(843,7,0,99,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(844,7,0,100,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(845,7,0,101,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(846,7,0,102,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(847,7,0,103,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(848,7,0,104,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(849,7,0,105,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(850,7,0,106,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(851,7,0,107,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(852,7,0,108,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(853,7,0,109,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(854,7,0,110,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(855,7,0,111,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(856,7,0,112,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(857,7,0,113,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(858,7,0,114,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(859,7,0,115,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(860,7,0,116,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(861,7,0,117,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(862,7,0,118,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(863,7,0,119,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(864,7,0,120,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(865,7,0,121,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(866,7,0,122,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(867,7,0,123,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(868,7,0,124,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(869,8,0,1,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(870,8,0,2,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(871,8,0,3,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(872,8,0,4,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(873,8,0,5,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(874,8,0,6,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(875,8,0,7,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(876,8,0,8,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(877,8,0,9,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(878,8,0,10,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(879,8,0,11,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(880,8,0,12,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(881,8,0,13,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(882,8,0,14,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(883,8,0,15,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(884,8,0,16,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(885,8,0,17,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(886,8,0,18,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(887,8,0,19,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(888,8,0,20,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(889,8,0,21,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(890,8,0,22,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(891,8,0,23,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(892,8,0,24,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(893,8,0,25,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(894,8,0,26,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(895,8,0,27,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(896,8,0,28,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(897,8,0,29,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(898,8,0,30,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(899,8,0,31,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(900,8,0,32,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(901,8,0,33,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(902,8,0,34,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(903,8,0,35,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(904,8,0,36,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(905,8,0,37,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(906,8,0,38,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(907,8,0,39,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(908,8,0,40,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(909,8,0,41,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(910,8,0,42,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(911,8,0,43,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(912,8,0,44,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(913,8,0,45,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(914,8,0,46,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(915,8,0,47,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(916,8,0,48,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(917,8,0,49,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(918,8,0,50,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(919,8,0,51,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(920,8,0,52,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(921,8,0,53,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(922,8,0,54,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(923,8,0,55,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(924,8,0,56,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(925,8,0,57,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(926,8,0,58,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(927,8,0,59,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(928,8,0,60,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(929,8,0,61,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(930,8,0,62,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(931,8,0,63,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(932,8,0,64,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(933,8,0,65,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(934,8,0,66,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(935,8,0,67,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(936,8,0,68,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(937,8,0,69,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(938,8,0,70,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(939,8,0,71,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(940,8,0,72,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(941,8,0,73,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(942,8,0,74,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(943,8,0,75,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(944,8,0,76,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(945,8,0,77,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(946,8,0,78,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(947,8,0,79,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(948,8,0,80,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(949,8,0,81,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(950,8,0,82,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(951,8,0,83,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(952,8,0,84,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(953,8,0,85,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(954,8,0,86,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(955,8,0,87,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(956,8,0,88,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(957,8,0,89,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(958,8,0,90,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(959,8,0,91,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(960,8,0,92,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(961,8,0,93,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(962,8,0,94,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(963,8,0,95,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(964,8,0,96,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(965,8,0,97,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(966,8,0,98,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(967,8,0,99,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(968,8,0,100,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(969,8,0,101,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(970,8,0,102,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(971,8,0,103,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(972,8,0,104,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(973,8,0,105,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(974,8,0,106,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(975,8,0,107,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(976,8,0,108,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(977,8,0,109,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(978,8,0,110,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(979,8,0,111,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(980,8,0,112,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(981,8,0,113,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(982,8,0,114,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(983,8,0,115,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(984,8,0,116,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(985,8,0,117,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(986,8,0,118,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(987,8,0,119,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(988,8,0,120,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(989,8,0,121,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(990,8,0,122,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(991,8,0,123,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(992,8,0,124,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(993,9,0,1,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(994,9,0,2,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(995,9,0,3,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(996,9,0,4,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(997,9,0,5,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(998,9,0,6,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(999,9,0,7,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1000,9,0,8,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1001,9,0,9,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1002,9,0,10,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1003,9,0,11,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1004,9,0,12,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1005,9,0,13,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1006,9,0,14,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1007,9,0,15,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1008,9,0,16,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1009,9,0,17,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1010,9,0,18,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1011,9,0,19,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1012,9,0,20,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1013,9,0,21,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1014,9,0,22,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1015,9,0,23,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1016,9,0,24,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1017,9,0,25,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1018,9,0,26,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1019,9,0,27,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1020,9,0,28,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1021,9,0,29,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1022,9,0,30,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1023,9,0,31,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1024,9,0,32,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1025,9,0,33,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1026,9,0,34,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1027,9,0,35,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1028,9,0,36,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1029,9,0,37,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1030,9,0,38,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1031,9,0,39,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1032,9,0,40,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1033,9,0,41,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1034,9,0,42,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1035,9,0,43,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1036,9,0,44,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1037,9,0,45,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1038,9,0,46,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1039,9,0,47,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1040,9,0,48,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1041,9,0,49,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1042,9,0,50,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1043,9,0,51,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1044,9,0,52,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1045,9,0,53,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1046,9,0,54,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1047,9,0,55,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1048,9,0,56,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1049,9,0,57,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1050,9,0,58,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1051,9,0,59,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1052,9,0,60,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1053,9,0,61,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1054,9,0,62,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1055,9,0,63,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1056,9,0,64,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1057,9,0,65,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1058,9,0,66,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1059,9,0,67,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1060,9,0,68,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1061,9,0,69,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1062,9,0,70,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1063,9,0,71,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1064,9,0,72,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1065,9,0,73,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1066,9,0,74,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1067,9,0,75,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1068,9,0,76,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1069,9,0,77,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1070,9,0,78,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1071,9,0,79,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1072,9,0,80,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1073,9,0,81,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1074,9,0,82,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1075,9,0,83,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1076,9,0,84,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1077,9,0,85,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1078,9,0,86,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1079,9,0,87,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1080,9,0,88,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1081,9,0,89,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1082,9,0,90,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1083,9,0,91,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1084,9,0,92,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1085,9,0,93,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1086,9,0,94,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1087,9,0,95,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1088,9,0,96,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1089,9,0,97,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1090,9,0,98,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1091,9,0,99,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1092,9,0,100,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1093,9,0,101,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1094,9,0,102,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1095,9,0,103,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1096,9,0,104,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1097,9,0,105,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1098,9,0,106,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1099,9,0,107,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1100,9,0,108,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1101,9,0,109,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1102,9,0,110,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1103,9,0,111,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1104,9,0,112,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1105,9,0,113,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1106,9,0,114,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1107,9,0,115,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1108,9,0,116,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1109,9,0,117,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1110,9,0,118,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1111,9,0,119,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1112,9,0,120,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1113,9,0,121,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1114,9,0,122,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1115,9,0,123,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1116,9,0,124,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1117,10,0,1,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1118,10,0,2,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1119,10,0,3,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1120,10,0,4,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1121,10,0,5,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1122,10,0,6,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1123,10,0,7,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1124,10,0,8,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1125,10,0,9,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1126,10,0,10,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1127,10,0,11,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1128,10,0,12,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1129,10,0,13,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1130,10,0,14,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1131,10,0,15,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1132,10,0,16,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1133,10,0,17,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1134,10,0,18,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1135,10,0,19,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1136,10,0,20,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1137,10,0,21,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1138,10,0,22,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1139,10,0,23,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1140,10,0,24,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1141,10,0,25,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1142,10,0,26,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1143,10,0,27,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1144,10,0,28,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1145,10,0,29,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1146,10,0,30,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1147,10,0,31,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1148,10,0,32,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1149,10,0,33,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1150,10,0,34,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1151,10,0,35,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1152,10,0,36,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1153,10,0,37,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1154,10,0,38,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1155,10,0,39,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1156,10,0,40,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1157,10,0,41,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1158,10,0,42,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1159,10,0,43,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1160,10,0,44,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1161,10,0,45,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1162,10,0,46,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1163,10,0,47,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1164,10,0,48,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1165,10,0,49,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1166,10,0,50,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1167,10,0,51,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1168,10,0,52,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1169,10,0,53,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1170,10,0,54,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1171,10,0,55,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1172,10,0,56,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1173,10,0,57,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1174,10,0,58,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1175,10,0,59,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1176,10,0,60,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1177,10,0,61,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1178,10,0,62,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1179,10,0,63,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1180,10,0,64,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1181,10,0,65,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1182,10,0,66,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1183,10,0,67,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1184,10,0,68,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1185,10,0,69,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1186,10,0,70,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1187,10,0,71,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1188,10,0,72,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1189,10,0,73,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1190,10,0,74,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1191,10,0,75,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1192,10,0,76,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1193,10,0,77,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1194,10,0,78,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1195,10,0,79,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1196,10,0,80,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1197,10,0,81,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1198,10,0,82,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1199,10,0,83,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1200,10,0,84,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1201,10,0,85,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1202,10,0,86,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1203,10,0,87,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1204,10,0,88,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1205,10,0,89,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1206,10,0,90,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1207,10,0,91,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1208,10,0,92,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1209,10,0,93,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1210,10,0,94,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1211,10,0,95,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1212,10,0,96,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1213,10,0,97,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1214,10,0,98,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1215,10,0,99,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1216,10,0,100,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1217,10,0,101,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1218,10,0,102,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1219,10,0,103,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1220,10,0,104,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1221,10,0,105,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1222,10,0,106,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1223,10,0,107,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1224,10,0,108,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1225,10,0,109,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1226,10,0,110,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1227,10,0,111,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1228,10,0,112,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1229,10,0,113,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1230,10,0,114,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1231,10,0,115,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1232,10,0,116,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1233,10,0,117,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1234,10,0,118,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1235,10,0,119,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1236,10,0,120,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1237,10,0,121,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1238,10,0,122,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1239,10,0,123,0,'2021-04-07 05:37:52','2021-04-07 05:37:52'),(1240,10,0,124,0,'2021-04-07 05:37:52','2021-04-07 05:37:52');
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
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_employee_documents_tbl`
--

LOCK TABLES `hris_employee_documents_tbl` WRITE;
/*!40000 ALTER TABLE `hris_employee_documents_tbl` DISABLE KEYS */;
INSERT INTO `hris_employee_documents_tbl` VALUES (63,19,'Contract and Appraisal','recent-301619162041.jpg','image',1,1,'2021-04-23 07:14:01','2021-04-23 07:14:01'),(83,19,'Training and Development','blog-largetd01619163505.jpg','image',1,1,'2021-04-23 07:38:25','2021-04-23 07:38:25'),(84,19,'Training and Development','comment-1td11619163505.png','image',1,1,'2021-04-23 07:38:25','2021-04-23 07:38:25'),(85,19,'Training and Development','comment-2td21619163505.png','image',1,1,'2021-04-23 07:38:25','2021-04-23 07:38:25'),(86,19,'Training and Development','comment-3td31619163505.png','image',1,1,'2021-04-23 07:38:25','2021-04-23 07:38:25'),(87,19,'Training and Development','defaulttd41619163505.png','image',1,1,'2021-04-23 07:38:25','2021-04-23 07:38:25'),(88,19,'Training and Development','details-1td51619163505.jpg','image',1,1,'2021-04-23 07:38:25','2021-04-23 07:38:25'),(89,19,'Contract and Appraisal','System Coding Standardsca01619164310.docx','application',1,1,'2021-04-23 07:51:50','2021-04-23 07:51:50'),(90,19,'Employee Memoranda','System Coding Standardsem01619164310.docx','application',1,1,'2021-04-23 07:51:50','2021-04-23 07:51:50'),(91,19,'Others','System Coding Standardso01619164368.docx','application',1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(92,9,'Others','System Coding Standardso01619164393.docx','application',1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13');
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
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_employee_leave_tbl`
--

LOCK TABLES `hris_employee_leave_tbl` WRITE;
/*!40000 ALTER TABLE `hris_employee_leave_tbl` DISABLE KEYS */;
INSERT INTO `hris_employee_leave_tbl` VALUES (3,12,1,10,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(4,12,2,10,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(5,13,1,10,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(6,13,2,10,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(7,14,1,10,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(8,14,2,10,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(9,15,1,5,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(10,15,2,8,1,1,'2021-04-22 02:35:48','2021-04-22 05:16:21'),(11,16,1,30,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(12,16,2,17,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(21,1,1,5,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(22,1,2,1,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(149,19,1,5,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(150,19,2,14,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(151,9,1,4,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(152,9,2,5,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13');
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
INSERT INTO `hris_employee_list_tbl` VALUES (1,1,1,1,0,0,'Akosi',NULL,'Admin',NULL,'akosiadmin@gmail','admin','admin',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3000.00,100.00,12.50,500.00,NULL,1,1,1,'2021-03-26 00:09:46','2021-04-20 05:35:57'),(2,1,2,2,0,0,'Arjay',NULL,'Diangzon',NULL,'arjaydiangzon@gmail.com','arjay','arjay',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2700.00,90.00,11.25,400.00,NULL,1,1,1,'2021-03-26 00:09:46','2021-04-20 05:36:10'),(3,1,3,3,0,0,'Wilson',NULL,'Parajas',NULL,'wilsonparajas@gmail.com','wilson','wilson',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2400.00,80.00,10.00,NULL,NULL,1,1,1,'2021-03-26 00:09:46','2021-04-20 05:36:18'),(4,1,4,4,0,0,'Charles',NULL,'Verdadero',NULL,'charlesverdadero@gmail.com','charles','charles',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2100.00,70.00,8.75,NULL,NULL,1,1,1,'2021-03-26 00:09:46','2021-04-20 05:36:33'),(5,1,5,5,0,0,'Mark',NULL,'Nieto',NULL,'marknieto@gmail.com','mark','mark',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1900.00,60.00,7.50,NULL,NULL,1,1,1,'2021-03-26 00:09:46','2021-04-20 05:36:42'),(6,1,6,6,0,0,'Joseph',NULL,'Berongoy',NULL,'josephberongoy@gmail.com','joseph','joseph',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1600.00,70.00,8.75,NULL,NULL,1,1,1,'2021-03-26 00:09:46','2021-04-20 05:37:41'),(7,1,7,7,0,0,'Renna',NULL,'Telesforo',NULL,'rennatelesforo@gmail.com','renna','renna',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1300.00,60.00,7.50,NULL,NULL,1,1,1,'2021-03-26 00:09:46','2021-04-20 05:37:48'),(8,1,8,8,0,0,'Matthew',NULL,'Isaac',NULL,'matthewisaac@gmail.com','matthew','matthew',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1000.00,50.00,6.25,NULL,NULL,0,1,1,'2021-03-26 00:09:46','2021-04-20 05:38:11'),(9,1,4,0,1,1,'Errol','','Macawille','0916-512-4312','errol@gmail.com','errol','errol','U2FsdGVkX193pbNfsmcOH+p0MKN72J352A11MeBI/6o=','TEST','612-417-435-353','1619074376.gif','Others','2021-04-21',NULL,'Philippine, Filipino','Widowed','321-732-432','32-5327436-3','64-327345745-7','5327-3474-5654','4A','RIZAL','BINANGONAN','BANGAD','1702','Antel2','Julia Vargas','Ortigas','Philippines','1609',499632.00,22710.55,2838.82,500.00,'2021-04-13',5,1,1,'2021-04-22 06:38:46','2021-04-23 07:53:13'),(19,1,3,0,3,2,'Lawrence','','Mark','0963-242-3432','mark@gmail.com','lawrence','lawrence','U2FsdGVkX1/93FObusQ7DA0rNQLgmUFPFV1FvFjNKLg=','Mark','3412-6512-3412','1619159626.png','','2021-04-15',NULL,'Philippine, Filipino','Single','634-654-364','53-2523734-5','32-463274325-4','2346-7436-4374','01','ILOCOS SUR','BANAYOYO','BISANGOL','1701','Antel','Julia','Ortigas','Ph','1243',150000.00,6818.18,852.27,500.00,'2021-04-13',1,1,1,'2021-04-23 03:10:08','2021-04-23 07:52:48');
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
) ENGINE=InnoDB AUTO_INCREMENT=10169 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_employee_permission_tbl`
--

LOCK TABLES `hris_employee_permission_tbl` WRITE;
/*!40000 ALTER TABLE `hris_employee_permission_tbl` DISABLE KEYS */;
INSERT INTO `hris_employee_permission_tbl` VALUES (125,2,1,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(126,2,2,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(127,2,3,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(128,2,4,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(129,2,5,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(130,2,6,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(131,2,7,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(132,2,8,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(133,2,9,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(134,2,10,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(135,2,11,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(136,2,12,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(137,2,13,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(138,2,14,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(139,2,15,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(140,2,16,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(141,2,17,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(142,2,18,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(143,2,19,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(144,2,20,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(145,2,21,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(146,2,22,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(147,2,23,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(148,2,24,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(149,2,25,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(150,2,26,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(151,2,27,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(152,2,28,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(153,2,29,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(154,2,30,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(155,2,31,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(156,2,32,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(157,2,33,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(158,2,34,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(159,2,35,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(160,2,36,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(161,2,37,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(162,2,38,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(163,2,39,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(164,2,40,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(165,2,41,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(166,2,42,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(167,2,43,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(168,2,44,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(169,2,45,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(170,2,46,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(171,2,47,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(172,2,48,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(173,2,49,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(174,2,50,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(175,2,51,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(176,2,52,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(177,2,53,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(178,2,54,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(179,2,55,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(180,2,56,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(181,2,57,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(182,2,58,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(183,2,59,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(184,2,60,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(185,2,61,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(186,2,62,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(187,2,63,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(188,2,64,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(189,2,65,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(190,2,66,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(191,2,67,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(192,2,68,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(193,2,69,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(194,2,70,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(195,2,71,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(196,2,72,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(197,2,73,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(198,2,74,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(199,2,75,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(200,2,76,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(201,2,77,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(202,2,78,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(203,2,79,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(204,2,80,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(205,2,81,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(206,2,82,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(207,2,83,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(208,2,84,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(209,2,85,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(210,2,86,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(211,2,87,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(212,2,88,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(213,2,89,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(214,2,90,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(215,2,91,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(216,2,92,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(217,2,93,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(218,2,94,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(219,2,95,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(220,2,96,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(221,2,97,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(222,2,98,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(223,2,99,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(224,2,100,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(225,2,101,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(226,2,102,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(227,2,103,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(228,2,104,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(229,2,105,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(230,2,106,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(231,2,107,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(232,2,108,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(233,2,109,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(234,2,110,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(235,2,111,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(236,2,112,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(237,2,113,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(238,2,114,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(239,2,115,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(240,2,116,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(241,2,117,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(242,2,118,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(243,2,119,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(244,2,120,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(245,2,121,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(246,2,122,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(247,2,123,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(248,2,124,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(249,3,1,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(250,3,2,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(251,3,3,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(252,3,4,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(253,3,5,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(254,3,6,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(255,3,7,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(256,3,8,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(257,3,9,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(258,3,10,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(259,3,11,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(260,3,12,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(261,3,13,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(262,3,14,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(263,3,15,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(264,3,16,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(265,3,17,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(266,3,18,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(267,3,19,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(268,3,20,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(269,3,21,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(270,3,22,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(271,3,23,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(272,3,24,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(273,3,25,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(274,3,26,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(275,3,27,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(276,3,28,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(277,3,29,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(278,3,30,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(279,3,31,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(280,3,32,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(281,3,33,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(282,3,34,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(283,3,35,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(284,3,36,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(285,3,37,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(286,3,38,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(287,3,39,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(288,3,40,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(289,3,41,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(290,3,42,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(291,3,43,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(292,3,44,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(293,3,45,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(294,3,46,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(295,3,47,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(296,3,48,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(297,3,49,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(298,3,50,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(299,3,51,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(300,3,52,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(301,3,53,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(302,3,54,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(303,3,55,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(304,3,56,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(305,3,57,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(306,3,58,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(307,3,59,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(308,3,60,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(309,3,61,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(310,3,62,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(311,3,63,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(312,3,64,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(313,3,65,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(314,3,66,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(315,3,67,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(316,3,68,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(317,3,69,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(318,3,70,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(319,3,71,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(320,3,72,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(321,3,73,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(322,3,74,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(323,3,75,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(324,3,76,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(325,3,77,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(326,3,78,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(327,3,79,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(328,3,80,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(329,3,81,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(330,3,82,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(331,3,83,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(332,3,84,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(333,3,85,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(334,3,86,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(335,3,87,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(336,3,88,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(337,3,89,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(338,3,90,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(339,3,91,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(340,3,92,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(341,3,93,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(342,3,94,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(343,3,95,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(344,3,96,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(345,3,97,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(346,3,98,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(347,3,99,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(348,3,100,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(349,3,101,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(350,3,102,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(351,3,103,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(352,3,104,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(353,3,105,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(354,3,106,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(355,3,107,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(356,3,108,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(357,3,109,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(358,3,110,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(359,3,111,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(360,3,112,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(361,3,113,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(362,3,114,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(363,3,115,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(364,3,116,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(365,3,117,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(366,3,118,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(367,3,119,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(368,3,120,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(369,3,121,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(370,3,122,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(371,3,123,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(372,3,124,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(373,4,1,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(374,4,2,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(375,4,3,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(376,4,4,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(377,4,5,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(378,4,6,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(379,4,7,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(380,4,8,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(381,4,9,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(382,4,10,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(383,4,11,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(384,4,12,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(385,4,13,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(386,4,14,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(387,4,15,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(388,4,16,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(389,4,17,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(390,4,18,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(391,4,19,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(392,4,20,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(393,4,21,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(394,4,22,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(395,4,23,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(396,4,24,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(397,4,25,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(398,4,26,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(399,4,27,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(400,4,28,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(401,4,29,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(402,4,30,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(403,4,31,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(404,4,32,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(405,4,33,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(406,4,34,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(407,4,35,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(408,4,36,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(409,4,37,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(410,4,38,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(411,4,39,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(412,4,40,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(413,4,41,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(414,4,42,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(415,4,43,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(416,4,44,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(417,4,45,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(418,4,46,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(419,4,47,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(420,4,48,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(421,4,49,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(422,4,50,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(423,4,51,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(424,4,52,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(425,4,53,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(426,4,54,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(427,4,55,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(428,4,56,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(429,4,57,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(430,4,58,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(431,4,59,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(432,4,60,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(433,4,61,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(434,4,62,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(435,4,63,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(436,4,64,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(437,4,65,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(438,4,66,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(439,4,67,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(440,4,68,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(441,4,69,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(442,4,70,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(443,4,71,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(444,4,72,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(445,4,73,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(446,4,74,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(447,4,75,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(448,4,76,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(449,4,77,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(450,4,78,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(451,4,79,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(452,4,80,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(453,4,81,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(454,4,82,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(455,4,83,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(456,4,84,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(457,4,85,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(458,4,86,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(459,4,87,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(460,4,88,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(461,4,89,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(462,4,90,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(463,4,91,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(464,4,92,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(465,4,93,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(466,4,94,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(467,4,95,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(468,4,96,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(469,4,97,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(470,4,98,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(471,4,99,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(472,4,100,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(473,4,101,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(474,4,102,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(475,4,103,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(476,4,104,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(477,4,105,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(478,4,106,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(479,4,107,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(480,4,108,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(481,4,109,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(482,4,110,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(483,4,111,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(484,4,112,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(485,4,113,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(486,4,114,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(487,4,115,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(488,4,116,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(489,4,117,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(490,4,118,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(491,4,119,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(492,4,120,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(493,4,121,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(494,4,122,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(495,4,123,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(496,4,124,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(497,5,1,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(498,5,2,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(499,5,3,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(500,5,4,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(501,5,5,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(502,5,6,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(503,5,7,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(504,5,8,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(505,5,9,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(506,5,10,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(507,5,11,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(508,5,12,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(509,5,13,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(510,5,14,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(511,5,15,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(512,5,16,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(513,5,17,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(514,5,18,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(515,5,19,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(516,5,20,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(517,5,21,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(518,5,22,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(519,5,23,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(520,5,24,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(521,5,25,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(522,5,26,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(523,5,27,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(524,5,28,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(525,5,29,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(526,5,30,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(527,5,31,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(528,5,32,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(529,5,33,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(530,5,34,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(531,5,35,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(532,5,36,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(533,5,37,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(534,5,38,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(535,5,39,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(536,5,40,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(537,5,41,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(538,5,42,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(539,5,43,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(540,5,44,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(541,5,45,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(542,5,46,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(543,5,47,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(544,5,48,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(545,5,49,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(546,5,50,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(547,5,51,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(548,5,52,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(549,5,53,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(550,5,54,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(551,5,55,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(552,5,56,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(553,5,57,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(554,5,58,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(555,5,59,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(556,5,60,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(557,5,61,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(558,5,62,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(559,5,63,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(560,5,64,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(561,5,65,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(562,5,66,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(563,5,67,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(564,5,68,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(565,5,69,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(566,5,70,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(567,5,71,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(568,5,72,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(569,5,73,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(570,5,74,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(571,5,75,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(572,5,76,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(573,5,77,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(574,5,78,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(575,5,79,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(576,5,80,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(577,5,81,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(578,5,82,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(579,5,83,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(580,5,84,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(581,5,85,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(582,5,86,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(583,5,87,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(584,5,88,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(585,5,89,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(586,5,90,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(587,5,91,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(588,5,92,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(589,5,93,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(590,5,94,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(591,5,95,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(592,5,96,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(593,5,97,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(594,5,98,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(595,5,99,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(596,5,100,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(597,5,101,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(598,5,102,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(599,5,103,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(600,5,104,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(601,5,105,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(602,5,106,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(603,5,107,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(604,5,108,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(605,5,109,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(606,5,110,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(607,5,111,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(608,5,112,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(609,5,113,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(610,5,114,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(611,5,115,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(612,5,116,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(613,5,117,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(614,5,118,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(615,5,119,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(616,5,120,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(617,5,121,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(618,5,122,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(619,5,123,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(620,5,124,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(621,6,1,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(622,6,2,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(623,6,3,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(624,6,4,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(625,6,5,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(626,6,6,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(627,6,7,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(628,6,8,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(629,6,9,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(630,6,10,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(631,6,11,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(632,6,12,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(633,6,13,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(634,6,14,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(635,6,15,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(636,6,16,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(637,6,17,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(638,6,18,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(639,6,19,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(640,6,20,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(641,6,21,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(642,6,22,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(643,6,23,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(644,6,24,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(645,6,25,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(646,6,26,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(647,6,27,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(648,6,28,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(649,6,29,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(650,6,30,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(651,6,31,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(652,6,32,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(653,6,33,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(654,6,34,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(655,6,35,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(656,6,36,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(657,6,37,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(658,6,38,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(659,6,39,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(660,6,40,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(661,6,41,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(662,6,42,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(663,6,43,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(664,6,44,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(665,6,45,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(666,6,46,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(667,6,47,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(668,6,48,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(669,6,49,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(670,6,50,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(671,6,51,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(672,6,52,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(673,6,53,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(674,6,54,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(675,6,55,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(676,6,56,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(677,6,57,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(678,6,58,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(679,6,59,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(680,6,60,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(681,6,61,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(682,6,62,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(683,6,63,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(684,6,64,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(685,6,65,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(686,6,66,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(687,6,67,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(688,6,68,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(689,6,69,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(690,6,70,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(691,6,71,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(692,6,72,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(693,6,73,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(694,6,74,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(695,6,75,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(696,6,76,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(697,6,77,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(698,6,78,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(699,6,79,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(700,6,80,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(701,6,81,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(702,6,82,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(703,6,83,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(704,6,84,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(705,6,85,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(706,6,86,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(707,6,87,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(708,6,88,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(709,6,89,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(710,6,90,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(711,6,91,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(712,6,92,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(713,6,93,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(714,6,94,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(715,6,95,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(716,6,96,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(717,6,97,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(718,6,98,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(719,6,99,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(720,6,100,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(721,6,101,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(722,6,102,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(723,6,103,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(724,6,104,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(725,6,105,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(726,6,106,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(727,6,107,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(728,6,108,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(729,6,109,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(730,6,110,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(731,6,111,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(732,6,112,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(733,6,113,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(734,6,114,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(735,6,115,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(736,6,116,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(737,6,117,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(738,6,118,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(739,6,119,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(740,6,120,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(741,6,121,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(742,6,122,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(743,6,123,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(744,6,124,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(745,7,1,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(746,7,2,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(747,7,3,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(748,7,4,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(749,7,5,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(750,7,6,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(751,7,7,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(752,7,8,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(753,7,9,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(754,7,10,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(755,7,11,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(756,7,12,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(757,7,13,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(758,7,14,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(759,7,15,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(760,7,16,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(761,7,17,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(762,7,18,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(763,7,19,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(764,7,20,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(765,7,21,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(766,7,22,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(767,7,23,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(768,7,24,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(769,7,25,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(770,7,26,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(771,7,27,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(772,7,28,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(773,7,29,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(774,7,30,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(775,7,31,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(776,7,32,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(777,7,33,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(778,7,34,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(779,7,35,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(780,7,36,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(781,7,37,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(782,7,38,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(783,7,39,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(784,7,40,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(785,7,41,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(786,7,42,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(787,7,43,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(788,7,44,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(789,7,45,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(790,7,46,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(791,7,47,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(792,7,48,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(793,7,49,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(794,7,50,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(795,7,51,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(796,7,52,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(797,7,53,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(798,7,54,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(799,7,55,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(800,7,56,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(801,7,57,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(802,7,58,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(803,7,59,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(804,7,60,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(805,7,61,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(806,7,62,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(807,7,63,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(808,7,64,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(809,7,65,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(810,7,66,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(811,7,67,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(812,7,68,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(813,7,69,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(814,7,70,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(815,7,71,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(816,7,72,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(817,7,73,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(818,7,74,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(819,7,75,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(820,7,76,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(821,7,77,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(822,7,78,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(823,7,79,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(824,7,80,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(825,7,81,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(826,7,82,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(827,7,83,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(828,7,84,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(829,7,85,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(830,7,86,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(831,7,87,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(832,7,88,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(833,7,89,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(834,7,90,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(835,7,91,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(836,7,92,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(837,7,93,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(838,7,94,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(839,7,95,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(840,7,96,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(841,7,97,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(842,7,98,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(843,7,99,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(844,7,100,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(845,7,101,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(846,7,102,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(847,7,103,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(848,7,104,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(849,7,105,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(850,7,106,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(851,7,107,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(852,7,108,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(853,7,109,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(854,7,110,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(855,7,111,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(856,7,112,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(857,7,113,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(858,7,114,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(859,7,115,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(860,7,116,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(861,7,117,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(862,7,118,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(863,7,119,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(864,7,120,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(865,7,121,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(866,7,122,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(867,7,123,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(868,7,124,1,1,1,1,1,1,1,'2021-04-06 07:29:08','2021-04-06 07:29:08'),(869,12,1,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(870,12,2,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(871,12,3,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(872,12,4,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(873,12,5,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(874,12,6,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(875,12,7,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(876,12,8,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(877,12,9,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(878,12,10,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(879,12,11,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(880,12,12,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(881,12,13,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(882,12,14,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(883,12,15,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(884,12,16,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(885,12,17,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(886,12,18,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(887,12,19,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(888,12,20,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(889,12,21,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(890,12,22,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(891,12,23,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(892,12,24,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(893,12,25,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(894,12,26,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(895,12,27,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(896,12,28,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(897,12,29,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(898,12,30,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(899,12,31,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(900,12,32,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(901,12,33,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(902,12,34,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(903,12,35,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(904,12,36,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(905,12,37,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(906,12,38,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(907,12,39,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(908,12,40,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(909,12,41,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(910,12,42,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(911,12,43,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(912,12,44,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(913,12,45,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(914,12,46,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(915,12,47,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(916,12,48,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(917,12,49,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(918,12,50,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(919,12,51,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(920,12,52,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(921,12,53,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(922,12,54,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(923,12,55,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(924,12,56,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(925,12,57,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(926,12,58,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(927,12,59,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(928,12,60,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(929,12,61,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(930,12,62,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(931,12,63,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(932,12,64,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(933,12,65,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(934,12,66,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(935,12,67,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(936,12,68,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(937,12,69,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(938,12,70,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(939,12,71,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(940,12,72,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(941,12,73,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(942,12,74,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(943,12,75,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(944,12,76,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(945,12,77,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(946,12,78,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(947,12,79,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(948,12,80,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(949,12,81,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(950,12,82,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(951,12,83,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(952,12,84,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(953,12,85,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(954,12,86,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(955,12,87,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(956,12,88,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(957,12,89,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(958,12,90,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(959,12,91,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(960,12,92,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(961,12,93,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(962,12,94,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(963,12,95,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(964,12,96,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(965,12,97,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(966,12,98,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(967,12,99,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(968,12,100,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(969,12,101,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(970,12,102,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(971,12,103,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(972,12,104,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(973,12,105,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(974,12,106,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(975,12,107,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(976,12,108,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(977,12,109,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(978,12,110,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(979,12,111,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(980,12,112,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(981,12,113,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(982,12,114,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(983,12,115,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(984,12,116,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(985,12,117,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(986,12,118,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(987,12,119,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(988,12,120,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(989,12,121,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(990,12,122,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(991,12,123,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(992,12,124,0,0,1,0,0,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(993,13,1,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(994,13,2,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(995,13,3,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(996,13,4,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(997,13,5,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(998,13,6,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(999,13,7,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1000,13,8,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1001,13,9,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1002,13,10,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1003,13,11,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1004,13,12,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1005,13,13,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1006,13,14,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1007,13,15,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1008,13,16,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1009,13,17,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1010,13,18,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1011,13,19,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1012,13,20,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1013,13,21,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1014,13,22,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1015,13,23,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1016,13,24,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1017,13,25,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1018,13,26,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1019,13,27,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1020,13,28,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1021,13,29,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1022,13,30,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1023,13,31,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1024,13,32,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1025,13,33,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1026,13,34,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1027,13,35,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1028,13,36,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1029,13,37,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1030,13,38,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1031,13,39,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1032,13,40,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1033,13,41,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1034,13,42,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1035,13,43,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1036,13,44,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1037,13,45,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1038,13,46,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1039,13,47,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1040,13,48,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1041,13,49,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1042,13,50,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1043,13,51,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1044,13,52,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1045,13,53,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1046,13,54,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1047,13,55,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1048,13,56,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1049,13,57,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1050,13,58,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1051,13,59,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1052,13,60,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1053,13,61,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1054,13,62,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1055,13,63,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1056,13,64,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1057,13,65,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1058,13,66,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1059,13,67,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1060,13,68,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1061,13,69,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1062,13,70,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1063,13,71,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1064,13,72,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1065,13,73,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1066,13,74,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1067,13,75,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1068,13,76,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1069,13,77,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1070,13,78,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1071,13,79,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1072,13,80,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1073,13,81,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1074,13,82,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1075,13,83,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1076,13,84,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1077,13,85,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1078,13,86,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1079,13,87,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1080,13,88,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1081,13,89,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1082,13,90,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1083,13,91,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1084,13,92,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1085,13,93,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1086,13,94,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1087,13,95,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1088,13,96,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1089,13,97,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1090,13,98,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1091,13,99,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1092,13,100,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1093,13,101,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1094,13,102,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1095,13,103,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1096,13,104,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1097,13,105,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1098,13,106,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1099,13,107,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1100,13,108,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1101,13,109,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1102,13,110,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1103,13,111,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1104,13,112,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1105,13,113,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1106,13,114,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1107,13,115,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1108,13,116,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1109,13,117,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1110,13,118,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1111,13,119,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1112,13,120,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1113,13,121,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1114,13,122,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1115,13,123,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1116,13,124,0,0,1,0,0,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(1117,14,1,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1118,14,2,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1119,14,3,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1120,14,4,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1121,14,5,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1122,14,6,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1123,14,7,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1124,14,8,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1125,14,9,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1126,14,10,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1127,14,11,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1128,14,12,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1129,14,13,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1130,14,14,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1131,14,15,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1132,14,16,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1133,14,17,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1134,14,18,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1135,14,19,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1136,14,20,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1137,14,21,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1138,14,22,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1139,14,23,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1140,14,24,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1141,14,25,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1142,14,26,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1143,14,27,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1144,14,28,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1145,14,29,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1146,14,30,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1147,14,31,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1148,14,32,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1149,14,33,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1150,14,34,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1151,14,35,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1152,14,36,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1153,14,37,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1154,14,38,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1155,14,39,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1156,14,40,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1157,14,41,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1158,14,42,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1159,14,43,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1160,14,44,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1161,14,45,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1162,14,46,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1163,14,47,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1164,14,48,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1165,14,49,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1166,14,50,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1167,14,51,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1168,14,52,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1169,14,53,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1170,14,54,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1171,14,55,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1172,14,56,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1173,14,57,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1174,14,58,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1175,14,59,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1176,14,60,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1177,14,61,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1178,14,62,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1179,14,63,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1180,14,64,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1181,14,65,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1182,14,66,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1183,14,67,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1184,14,68,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1185,14,69,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1186,14,70,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1187,14,71,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1188,14,72,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1189,14,73,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1190,14,74,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1191,14,75,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1192,14,76,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1193,14,77,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1194,14,78,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1195,14,79,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1196,14,80,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1197,14,81,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1198,14,82,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1199,14,83,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1200,14,84,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1201,14,85,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1202,14,86,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1203,14,87,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1204,14,88,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1205,14,89,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1206,14,90,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1207,14,91,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1208,14,92,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1209,14,93,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1210,14,94,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1211,14,95,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1212,14,96,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1213,14,97,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1214,14,98,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1215,14,99,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1216,14,100,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1217,14,101,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1218,14,102,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1219,14,103,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1220,14,104,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1221,14,105,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1222,14,106,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1223,14,107,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1224,14,108,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1225,14,109,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1226,14,110,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1227,14,111,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1228,14,112,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1229,14,113,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1230,14,114,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1231,14,115,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1232,14,116,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1233,14,117,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1234,14,118,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1235,14,119,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1236,14,120,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1237,14,121,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1238,14,122,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1239,14,123,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1240,14,124,0,0,1,0,0,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(1241,15,1,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1242,15,2,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1243,15,3,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1244,15,4,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1245,15,5,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1246,15,6,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1247,15,7,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1248,15,8,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1249,15,9,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1250,15,10,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1251,15,11,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1252,15,12,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1253,15,13,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1254,15,14,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1255,15,15,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1256,15,16,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1257,15,17,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1258,15,18,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1259,15,19,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1260,15,20,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1261,15,21,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1262,15,22,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1263,15,23,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1264,15,24,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1265,15,25,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1266,15,26,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1267,15,27,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1268,15,28,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1269,15,29,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1270,15,30,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1271,15,31,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1272,15,32,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1273,15,33,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1274,15,34,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1275,15,35,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1276,15,36,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1277,15,37,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1278,15,38,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1279,15,39,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1280,15,40,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1281,15,41,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1282,15,42,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1283,15,43,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1284,15,44,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1285,15,45,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1286,15,46,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1287,15,47,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1288,15,48,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1289,15,49,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1290,15,50,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1291,15,51,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1292,15,52,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1293,15,53,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1294,15,54,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1295,15,55,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1296,15,56,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1297,15,57,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1298,15,58,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1299,15,59,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1300,15,60,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1301,15,61,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1302,15,62,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1303,15,63,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1304,15,64,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1305,15,65,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1306,15,66,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1307,15,67,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1308,15,68,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1309,15,69,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1310,15,70,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1311,15,71,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1312,15,72,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1313,15,73,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1314,15,74,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1315,15,75,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1316,15,76,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1317,15,77,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1318,15,78,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1319,15,79,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1320,15,80,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1321,15,81,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1322,15,82,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1323,15,83,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1324,15,84,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1325,15,85,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1326,15,86,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1327,15,87,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1328,15,88,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1329,15,89,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1330,15,90,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1331,15,91,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1332,15,92,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1333,15,93,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1334,15,94,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1335,15,95,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1336,15,96,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1337,15,97,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1338,15,98,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1339,15,99,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1340,15,100,0,0,1,0,0,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(1341,15,101,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1342,15,102,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1343,15,103,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1344,15,104,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1345,15,105,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1346,15,106,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1347,15,107,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1348,15,108,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1349,15,109,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1350,15,110,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1351,15,111,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1352,15,112,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1353,15,113,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1354,15,114,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1355,15,115,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1356,15,116,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1357,15,117,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1358,15,118,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1359,15,119,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1360,15,120,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1361,15,121,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1362,15,122,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1363,15,123,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1364,15,124,0,0,1,0,0,1,1,'2021-04-22 02:35:49','2021-04-22 02:35:49'),(1365,16,1,0,1,1,0,1,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1366,16,2,1,0,0,1,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1367,16,3,0,1,1,0,1,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1368,16,4,1,0,1,1,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1369,16,5,1,1,0,0,1,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1370,16,6,0,1,0,1,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1371,16,7,0,0,0,1,1,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1372,16,8,0,0,1,0,1,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1373,16,9,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1374,16,10,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1375,16,11,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1376,16,12,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1377,16,13,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1378,16,14,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1379,16,15,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1380,16,16,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1381,16,17,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1382,16,18,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1383,16,19,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1384,16,20,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1385,16,21,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1386,16,22,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1387,16,23,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1388,16,24,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1389,16,25,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1390,16,26,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1391,16,27,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1392,16,28,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1393,16,29,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1394,16,30,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1395,16,31,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1396,16,32,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1397,16,33,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1398,16,34,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1399,16,35,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1400,16,36,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1401,16,37,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1402,16,38,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1403,16,39,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1404,16,40,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1405,16,41,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1406,16,42,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1407,16,43,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1408,16,44,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1409,16,45,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1410,16,46,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1411,16,47,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1412,16,48,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1413,16,49,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1414,16,50,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1415,16,51,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1416,16,52,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1417,16,53,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1418,16,54,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1419,16,55,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1420,16,56,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1421,16,57,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1422,16,58,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1423,16,59,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1424,16,60,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1425,16,61,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1426,16,62,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1427,16,63,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1428,16,64,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1429,16,65,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1430,16,66,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1431,16,67,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1432,16,68,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1433,16,69,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1434,16,70,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1435,16,71,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1436,16,72,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1437,16,73,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1438,16,74,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1439,16,75,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1440,16,76,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1441,16,77,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1442,16,78,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1443,16,79,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1444,16,80,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1445,16,81,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1446,16,82,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1447,16,83,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1448,16,84,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1449,16,85,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1450,16,86,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1451,16,87,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1452,16,88,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1453,16,89,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1454,16,90,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1455,16,91,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1456,16,92,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1457,16,93,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1458,16,94,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1459,16,95,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1460,16,96,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1461,16,97,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1462,16,98,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1463,16,99,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1464,16,100,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1465,16,101,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1466,16,102,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1467,16,103,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1468,16,104,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1469,16,105,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1470,16,106,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1471,16,107,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1472,16,108,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1473,16,109,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1474,16,110,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1475,16,111,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1476,16,112,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1477,16,113,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1478,16,114,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1479,16,115,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1480,16,116,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1481,16,117,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1482,16,118,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1483,16,119,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1484,16,120,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1485,16,121,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1486,16,122,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1487,16,123,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1488,16,124,0,0,1,0,0,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(1489,0,1,0,1,1,0,1,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1490,0,2,1,0,0,1,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1491,0,3,0,1,1,0,1,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1492,0,4,1,0,1,1,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1493,0,5,1,1,0,0,1,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1494,0,6,0,1,0,1,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1495,0,7,0,0,0,1,1,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1496,0,8,0,0,1,0,1,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1497,0,9,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1498,0,10,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1499,0,11,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1500,0,12,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1501,0,13,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1502,0,14,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1503,0,15,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1504,0,16,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1505,0,17,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1506,0,18,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1507,0,19,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1508,0,20,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1509,0,21,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1510,0,22,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1511,0,23,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1512,0,24,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1513,0,25,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1514,0,26,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1515,0,27,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1516,0,28,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1517,0,29,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1518,0,30,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1519,0,31,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1520,0,32,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1521,0,33,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1522,0,34,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1523,0,35,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1524,0,36,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1525,0,37,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1526,0,38,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1527,0,39,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1528,0,40,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1529,0,41,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1530,0,42,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1531,0,43,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1532,0,44,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1533,0,45,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1534,0,46,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1535,0,47,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1536,0,48,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1537,0,49,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1538,0,50,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1539,0,51,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1540,0,52,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1541,0,53,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1542,0,54,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1543,0,55,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1544,0,56,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1545,0,57,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1546,0,58,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1547,0,59,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1548,0,60,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1549,0,61,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1550,0,62,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1551,0,63,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1552,0,64,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1553,0,65,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1554,0,66,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1555,0,67,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1556,0,68,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1557,0,69,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1558,0,70,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1559,0,71,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1560,0,72,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1561,0,73,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1562,0,74,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1563,0,75,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1564,0,76,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1565,0,77,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1566,0,78,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1567,0,79,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1568,0,80,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1569,0,81,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1570,0,82,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1571,0,83,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1572,0,84,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1573,0,85,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1574,0,86,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1575,0,87,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1576,0,88,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1577,0,89,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1578,0,90,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1579,0,91,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1580,0,92,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1581,0,93,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1582,0,94,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1583,0,95,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1584,0,96,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1585,0,97,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1586,0,98,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1587,0,99,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1588,0,100,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1589,0,101,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1590,0,102,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1591,0,103,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1592,0,104,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1593,0,105,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1594,0,106,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1595,0,107,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1596,0,108,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1597,0,109,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1598,0,110,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1599,0,111,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1600,0,112,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1601,0,113,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1602,0,114,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1603,0,115,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1604,0,116,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1605,0,117,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1606,0,118,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1607,0,119,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1608,0,120,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1609,0,121,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1610,0,122,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1611,0,123,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1612,0,124,0,0,1,0,0,1,1,'2021-04-22 06:06:24','2021-04-22 06:06:24'),(1985,1,1,0,0,1,1,1,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(1986,1,2,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(1987,1,3,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(1988,1,4,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(1989,1,5,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(1990,1,6,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(1991,1,7,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(1992,1,8,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(1993,1,9,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(1994,1,10,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(1995,1,11,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(1996,1,12,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(1997,1,13,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(1998,1,14,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(1999,1,15,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2000,1,16,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2001,1,17,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2002,1,18,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2003,1,19,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2004,1,20,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2005,1,21,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2006,1,22,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2007,1,23,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2008,1,24,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2009,1,25,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2010,1,26,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2011,1,27,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2012,1,28,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2013,1,29,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2014,1,30,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2015,1,31,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2016,1,32,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2017,1,33,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2018,1,34,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2019,1,35,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2020,1,36,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2021,1,37,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2022,1,38,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2023,1,39,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2024,1,40,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2025,1,41,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2026,1,42,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2027,1,43,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2028,1,44,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2029,1,45,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2030,1,46,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2031,1,47,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2032,1,48,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2033,1,49,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2034,1,50,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2035,1,51,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2036,1,52,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2037,1,53,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2038,1,54,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2039,1,55,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2040,1,56,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2041,1,57,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2042,1,58,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2043,1,59,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2044,1,60,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2045,1,61,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2046,1,62,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2047,1,63,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2048,1,64,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2049,1,65,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2050,1,66,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2051,1,67,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2052,1,68,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2053,1,69,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2054,1,70,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2055,1,71,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2056,1,72,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2057,1,73,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2058,1,74,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2059,1,75,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2060,1,76,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2061,1,77,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2062,1,78,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2063,1,79,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2064,1,80,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2065,1,81,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2066,1,82,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2067,1,83,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2068,1,84,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2069,1,85,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2070,1,86,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2071,1,87,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2072,1,88,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2073,1,89,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2074,1,90,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2075,1,91,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2076,1,92,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2077,1,93,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2078,1,94,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2079,1,95,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2080,1,96,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2081,1,97,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2082,1,98,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2083,1,99,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2084,1,100,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2085,1,101,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2086,1,102,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2087,1,103,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2088,1,104,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2089,1,105,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2090,1,106,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2091,1,107,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2092,1,108,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2093,1,109,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2094,1,110,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2095,1,111,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2096,1,112,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2097,1,113,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2098,1,114,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2099,1,115,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2100,1,116,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2101,1,117,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2102,1,118,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2103,1,119,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2104,1,120,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2105,1,121,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2106,1,122,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2107,1,123,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(2108,1,124,0,0,1,0,0,1,1,'2021-04-22 06:47:43','2021-04-22 06:47:43'),(9921,19,1,0,0,1,1,1,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9922,19,2,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9923,19,3,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9924,19,4,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9925,19,5,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9926,19,6,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9927,19,7,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9928,19,8,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9929,19,9,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9930,19,10,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9931,19,11,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9932,19,12,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9933,19,13,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9934,19,14,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9935,19,15,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9936,19,16,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9937,19,17,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9938,19,18,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9939,19,19,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9940,19,20,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9941,19,21,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9942,19,22,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9943,19,23,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9944,19,24,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9945,19,25,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9946,19,26,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9947,19,27,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9948,19,28,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9949,19,29,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9950,19,30,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9951,19,31,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9952,19,32,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9953,19,33,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9954,19,34,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9955,19,35,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9956,19,36,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9957,19,37,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9958,19,38,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9959,19,39,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9960,19,40,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9961,19,41,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9962,19,42,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9963,19,43,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9964,19,44,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9965,19,45,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9966,19,46,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9967,19,47,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9968,19,48,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9969,19,49,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9970,19,50,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9971,19,51,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9972,19,52,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9973,19,53,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9974,19,54,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9975,19,55,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9976,19,56,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9977,19,57,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9978,19,58,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9979,19,59,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9980,19,60,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9981,19,61,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9982,19,62,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9983,19,63,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9984,19,64,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9985,19,65,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9986,19,66,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9987,19,67,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9988,19,68,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9989,19,69,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9990,19,70,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9991,19,71,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9992,19,72,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9993,19,73,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9994,19,74,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9995,19,75,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9996,19,76,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9997,19,77,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9998,19,78,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(9999,19,79,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10000,19,80,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10001,19,81,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10002,19,82,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10003,19,83,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10004,19,84,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10005,19,85,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10006,19,86,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10007,19,87,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10008,19,88,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10009,19,89,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10010,19,90,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10011,19,91,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10012,19,92,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10013,19,93,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10014,19,94,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10015,19,95,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10016,19,96,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10017,19,97,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10018,19,98,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10019,19,99,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10020,19,100,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10021,19,101,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10022,19,102,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10023,19,103,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10024,19,104,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10025,19,105,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10026,19,106,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10027,19,107,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10028,19,108,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10029,19,109,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10030,19,110,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10031,19,111,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10032,19,112,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10033,19,113,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10034,19,114,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10035,19,115,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10036,19,116,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10037,19,117,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10038,19,118,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10039,19,119,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10040,19,120,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10041,19,121,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10042,19,122,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10043,19,123,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10044,19,124,0,0,1,0,0,1,1,'2021-04-23 07:52:48','2021-04-23 07:52:48'),(10045,9,1,0,1,1,0,1,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10046,9,2,0,0,1,1,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10047,9,3,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10048,9,4,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10049,9,5,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10050,9,6,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10051,9,7,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10052,9,8,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10053,9,9,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10054,9,10,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10055,9,11,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10056,9,12,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10057,9,13,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10058,9,14,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10059,9,15,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10060,9,16,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10061,9,17,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10062,9,18,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10063,9,19,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10064,9,20,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10065,9,21,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10066,9,22,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10067,9,23,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10068,9,24,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10069,9,25,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10070,9,26,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10071,9,27,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10072,9,28,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10073,9,29,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10074,9,30,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10075,9,31,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10076,9,32,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10077,9,33,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10078,9,34,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10079,9,35,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10080,9,36,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10081,9,37,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10082,9,38,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10083,9,39,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10084,9,40,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10085,9,41,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10086,9,42,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10087,9,43,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10088,9,44,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10089,9,45,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10090,9,46,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10091,9,47,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10092,9,48,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10093,9,49,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10094,9,50,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10095,9,51,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10096,9,52,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10097,9,53,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10098,9,54,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10099,9,55,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10100,9,56,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10101,9,57,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10102,9,58,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10103,9,59,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10104,9,60,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10105,9,61,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10106,9,62,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10107,9,63,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10108,9,64,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10109,9,65,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10110,9,66,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10111,9,67,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10112,9,68,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10113,9,69,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10114,9,70,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10115,9,71,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10116,9,72,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10117,9,73,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10118,9,74,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10119,9,75,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10120,9,76,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10121,9,77,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10122,9,78,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10123,9,79,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10124,9,80,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10125,9,81,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10126,9,82,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10127,9,83,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10128,9,84,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10129,9,85,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10130,9,86,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10131,9,87,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10132,9,88,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10133,9,89,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10134,9,90,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10135,9,91,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10136,9,92,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10137,9,93,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10138,9,94,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10139,9,95,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10140,9,96,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10141,9,97,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10142,9,98,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10143,9,99,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10144,9,100,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10145,9,101,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10146,9,102,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10147,9,103,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10148,9,104,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10149,9,105,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10150,9,106,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10151,9,107,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10152,9,108,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10153,9,109,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10154,9,110,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10155,9,111,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10156,9,112,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10157,9,113,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10158,9,114,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10159,9,115,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10160,9,116,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10161,9,117,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10162,9,118,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10163,9,119,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10164,9,120,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10165,9,121,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10166,9,122,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10167,9,123,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(10168,9,124,0,0,1,0,0,1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13');
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
INSERT INTO `pms_project_list_tbl` VALUES (1,'PRO-21-00001','TEST','TEST','2021-03-30','2021-03-30',1,1,2,'2|3',3,1,0,0,'2021-04-08 03:24:17','2021-04-14 04:48:20'),(5,'PRJ-21-00002','TEST 2','TEST 2','2021-04-14','2021-05-05',2,3,2,'5|6',2,2,0,1,'2021-04-14 06:42:04','2021-04-21 05:19:41');
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

-- Dump completed on 2021-04-23 16:11:39
