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
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`bankID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_bank_tbl`
--

LOCK TABLES `fms_bank_tbl` WRITE;
/*!40000 ALTER TABLE `fms_bank_tbl` DISABLE KEYS */;
INSERT INTO `fms_bank_tbl` VALUES (1,'BNK-21-00001','BDO','0000-0000-000',1,'2021-04-14',1,1,'2021-04-13 22:05:32','2021-04-21 16:24:24'),(2,'BNK-21-00002','UCPB','00-0000-000-0',1,'2021-04-14',1,1,'2021-04-13 22:06:35','2021-04-21 16:25:11'),(3,'BNK-21-00003','BPI','000-00-000-0',1,'2021-04-14',1,1,'2021-04-13 22:07:03','2021-04-21 16:25:24'),(4,'BNK-21-00004','RCBC','0000-000-00',1,'2021-04-14',1,1,'2021-04-13 22:07:30','2021-04-21 16:25:37'),(5,'BNK-21-00005','SECURITY BANK	','0000-000-000',1,'2021-04-14',1,1,'2021-04-13 22:31:53','2021-04-21 16:25:48'),(6,'BNK-21-00006','LBP','0000-0000-0000',1,'2021-04-21',1,1,'2021-04-20 18:27:57','0000-00-00 00:00:00'),(7,'BNK-21-00007','PNB','0000 0000 0000',0,'2021-04-28',1,1,'2021-04-27 23:05:38','2021-05-26 00:09:59');
/*!40000 ALTER TABLE `fms_bank_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fms_billing_items_tbl`
--

DROP TABLE IF EXISTS `fms_billing_items_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fms_billing_items_tbl` (
  `billingItemID` bigint(21) NOT NULL AUTO_INCREMENT,
  `billingID` bigint(21) NOT NULL,
  `activity` text DEFAULT NULL,
  `quantity` decimal(15,2) DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `totalAmount` decimal(15,2) DEFAULT NULL,
  `vatAmount` decimal(15,2) DEFAULT NULL,
  `pendingAmount` decimal(15,2) DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`billingItemID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_billing_items_tbl`
--

LOCK TABLES `fms_billing_items_tbl` WRITE;
/*!40000 ALTER TABLE `fms_billing_items_tbl` DISABLE KEYS */;
INSERT INTO `fms_billing_items_tbl` VALUES (1,1,'Test',100.00,200.00,20000.00,2400.00,17600.00,1,1,'2021-06-16 23:07:57','2021-06-16 23:07:57'),(2,1,'Test 2',200.00,500.00,100000.00,12000.00,88000.00,1,1,'2021-06-16 23:07:57','2021-06-16 23:07:57'),(3,1,'test 3',50.00,100.00,5000.00,600.00,4400.00,1,1,'2021-06-16 23:07:57','2021-06-16 23:07:57'),(4,2,'This is an activity, This is an activity!!',100.00,1100.00,110000.00,13200.00,96800.00,1,1,'2021-06-17 05:24:58','2021-06-17 05:24:58'),(5,2,'Sample activity e21312',100.00,200.00,20000.00,2400.00,17600.00,1,1,'2021-06-17 05:24:58','2021-06-17 05:24:58'),(8,3,'Test',1000.00,500.00,500000.00,60000.00,440000.00,1,1,'2021-06-17 07:31:49','2021-06-17 07:31:49'),(9,3,'Test 2',12000.00,10.00,120000.00,14400.00,105600.00,1,1,'2021-06-17 07:31:49','2021-06-17 07:31:49'),(10,3,'213',100.00,5.00,500.00,60.00,440.00,1,1,'2021-06-17 07:31:49','2021-06-17 07:31:49');
/*!40000 ALTER TABLE `fms_billing_items_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fms_billing_tbl`
--

DROP TABLE IF EXISTS `fms_billing_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fms_billing_tbl` (
  `billingID` bigint(21) NOT NULL AUTO_INCREMENT,
  `employeeID` bigint(21) NOT NULL,
  `clientID` bigint(21) DEFAULT NULL,
  `billingReason` text DEFAULT NULL,
  `clientName` varchar(200) DEFAULT NULL,
  `clientAddress` text DEFAULT NULL,
  `billingComment` text DEFAULT NULL,
  `billingSubtotal` decimal(15,2) DEFAULT NULL,
  `billingVatAmount` decimal(15,2) DEFAULT NULL,
  `billingGrandTotal` decimal(15,2) DEFAULT NULL,
  `isBillingDone` int(11) DEFAULT 0,
  `billingStatus` int(11) DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`billingID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_billing_tbl`
--

LOCK TABLES `fms_billing_tbl` WRITE;
/*!40000 ALTER TABLE `fms_billing_tbl` DISABLE KEYS */;
INSERT INTO `fms_billing_tbl` VALUES (1,1,2,'Test','Ricardo\'s Coffee + Classic Cuisine','Cristanto M. Delos Reyes, Higway, Brgy. Dagatan, Dagatan, Amadeo, Cavite, Philippines, 4119','',125000.00,15000.00,110000.00,0,1,1,1,'2021-06-16 23:07:57','2021-06-16 23:07:57','2021-06-16 23:07:57'),(2,1,4,'Test','Gatchallan Tangalin and Co CPAs','1709, Antel Global Corporate Center, San Antonio, City Of Pasig, National Capital Region - Second District, Philippines, 1605','1. Sample Note.\n2. Sample Note 2\n     This is sample note.\n     This is sample note 2',130000.00,15600.00,114400.00,0,0,1,1,NULL,'2021-06-17 05:24:58','2021-06-17 05:24:58'),(3,1,2,'desc','Ricardo\'s Coffee + Classic Cuisine','Cristanto M. Delos Reyes, Higway, Brgy. Dagatan, Dagatan, Amadeo, Cavite, Philippines, 4119','ccc',546040.00,74460.00,620500.00,0,1,1,1,'2021-06-16 19:31:49','2021-06-17 07:31:21','2021-06-17 07:31:49');
/*!40000 ALTER TABLE `fms_billing_tbl` ENABLE KEYS */;
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
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`chartOfAccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_chart_of_accounts_tbl`
--

LOCK TABLES `fms_chart_of_accounts_tbl` WRITE;
/*!40000 ALTER TABLE `fms_chart_of_accounts_tbl` DISABLE KEYS */;
INSERT INTO `fms_chart_of_accounts_tbl` VALUES (1,0,'1-1001','Cash on hand','The total amount of any accessible cash. \n','Cash',1,'Current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 22:18:28','0000-00-00 00:00:00'),(2,0,'1-1002','Petty Cash Fund','Small amount of cash kept on hand to pay for minor expenses, such as office supplies or reimbursements.\n','Petty Cash Fund',1,'Current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 22:20:26','0000-00-00 00:00:00'),(3,1,'1-1003','Cash in Bank - BDO','The sum of all coins, currency and other unrestricted liquid funds that have been placed on deposit with a financial institution. \n','Cash in Bank',1,'Current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 22:21:17','0000-00-00 00:00:00'),(4,2,'1-1004','Cash in Bank - UCPB','The sum of all coins, currency and other unrestricted liquid funds that have been placed on deposit with a financial institution. \n','Cash in Bank',1,'Current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 22:21:58','0000-00-00 00:00:00'),(5,3,'1-1005','Cash in Bank - BPI','The sum of all coins, currency and other unrestricted liquid funds that have been placed on deposit with a financial institution. \n','Cash in Bank',1,'Current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 22:22:37','0000-00-00 00:00:00'),(6,4,'1-1006','Cash in Bank - RCBC','The sum of all coins, currency and other unrestricted liquid funds that have been placed on deposit with a financial institution. \n','Cash in Bank',1,'Current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 22:33:07','0000-00-00 00:00:00'),(7,5,'1-1007','Cash in Bank - SECURITY BANK','The sum of all coins, currency and other unrestricted liquid funds that have been placed on deposit with a financial institution. \n','Cash in Bank',1,'Current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 22:35:01','2021-04-13 23:13:36'),(8,0,'1-2001','Accounts Receivable','The balance of money due to a firm for goods or services delivered or used but not yet paid for by customers. A\n','Accounts Receivable',2,'Current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 22:36:37','0000-00-00 00:00:00'),(9,0,'1-3001','Raw Materials Inventory','The total cost of all component parts currently in stock that have not yet been used in work-in-process or finished goods production.\n','Raw Materials Inventory',3,'Current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 22:38:34','2021-04-13 23:22:01'),(10,0,'1-3002','Work-in-Progress Inventory','Production and supply-chain management term describing partially finished goods awaiting completion. \n','Work-in-Progress Inventory',3,'Current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 22:40:32','2021-04-13 23:22:42'),(11,0,'1-3003','Finished Goods Inventory','Goods that have been completed by the manufacturing process, or purchased in a completed form, but which have not yet been sold to customers.\n','Finished Goods Inventory',3,'Current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 22:41:36','2021-04-13 23:24:12'),(12,0,'1-4001','Advances To Employee-Salary',' Temporary loan by a company to an employee. \n','Advances To Employee',4,'Current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 22:43:45','2021-04-13 23:16:37'),(13,0,'1-4002','Advances To Partners','Means loans or advances, if any, made by a Partner to the Partnership from time to time pursuant to Section 3.01(b) hereof. Sample 1 Sample 2 Based on 2 documents Save\n','Advances To Partners',5,'Non-current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 22:45:09','0000-00-00 00:00:00'),(14,0,'1-4003','Advances To Others (company)','Means any advances or open accounts owing by the Borrower or any Subsidiary of the Borrower to any Grantor.\n','Advances To Others (company)',4,'Current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 22:46:42','2021-04-13 23:25:55'),(15,0,'1-4004','Input VAT','The value added tax added to the price when you purchase goods or services that are liable to VAT. \n','Input VAT',4,'Current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 22:47:31','0000-00-00 00:00:00'),(16,0,'1-4005','Creditable Withholding Tax','The tax which is withheld by the buyer/withholding agent from his payment to the seller for the sale of the seller\'s ordinary asset/services, and which tax is creditable against the income tax payable of the seller.\n','Creditable Withholding Tax',4,'Current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 22:49:12','2021-04-13 23:26:33'),(17,0,'1-5001','Computer Equipment','Means all computers, software or other equipment that includes computing technology or embedded logic such as microchips and sensors whether owned or leased.\n','Computer Equipment',6,'Non-current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 23:01:20','0000-00-00 00:00:00'),(18,0,'1-5002','Accumulated Depreciation - Computer Equipment','The total amount an asset has been depreciated up until a single point.\n','Accumulated Depreciation',6,'Non-current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 23:05:39','2021-04-13 23:28:23'),(19,0,'1-5003','Office Equipment','A long-term asset account reported on the balance sheet under the heading of property, plant, and equipment. Included in this account would be copiers, computers, printers, fax machines, etc.\n','Office Equipment',6,'Non-current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 23:06:29','0000-00-00 00:00:00'),(20,0,'1-5004','Accumulated Depreciation - Office Equipment','The total amount an asset has been depreciated up until a single point.\n','Accumulated Depreciation',6,'Non-current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 23:11:55','2021-04-13 23:29:14'),(21,0,'1-5005','Leasehold Improvements','Any changes made to a rental property in order to customize it for the particular needs of a tenant.\n','Leasehold Improvements',6,'Non-current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 23:21:05','0000-00-00 00:00:00'),(22,0,'1-5006','Accumulated Depreciation - Leasehold Improvements','The total amount an asset has been depreciated up until a single point.\n','Accumulated Depreciation',6,'Non-current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 23:39:58','0000-00-00 00:00:00'),(23,0,'1-5007','Furnitures & Fixture','Refers to movable furniture, fixtures, or other equipment that have no permanent connection to the structure of a building.\n','Furnitures & Fixture',6,'Non-current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 23:41:19','0000-00-00 00:00:00'),(24,0,'1-5008','Accumulated Depreciation - Furniture & Fixtures','The total amount an asset has been depreciated up until a single point.\n','Accumulated Depreciation',6,'Non-current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 23:42:27','0000-00-00 00:00:00'),(25,0,'1-5009','Communication Equipment','Facility consisting of the physical plants and equipment for disseminating information. \n','Communication Equipment',6,'Non-current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 23:43:34','0000-00-00 00:00:00'),(26,0,'1-5010','Accumulated Depreciation - Communication Equipment','The total amount an asset has been depreciated up until a single point.\n','Accumulated Depreciation',6,'Non-current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 23:45:20','0000-00-00 00:00:00'),(27,0,'1-5013','Vehicles','A long-term asset account that reports a company\'s cost of automobiles, trucks, etc.\n','Vehicles',6,'Non-current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 23:48:27','0000-00-00 00:00:00'),(28,0,'1-5014','Accumulated Depreciation - Vehicles','The total amount an asset has been depreciated up until a single point.\n','Accumulated Depreciation',6,'Non-current Asset','Asset',1,'2021-04-14',1,1,'2021-04-13 23:49:34','0000-00-00 00:00:00'),(29,0,'1-6001','Accounts Payable','An account within the general ledger that represents a company\'s obligation to pay off a short-term debt to its creditors or suppliers.\n','Accounts Payable',7,'Current Liability','Liability',1,'2021-04-14',1,1,'2021-04-13 23:50:33','0000-00-00 00:00:00'),(30,0,'1-6002','Salaries Payable','A liability account that contains the amounts of any salaries owed to employees, which have not yet been paid to them.\n','Salaries Payable',8,'Current Liability','Liability',1,'2021-04-14',1,1,'2021-04-13 23:51:44','0000-00-00 00:00:00'),(31,0,'1-6003','13th Month Payable','A monetary benefit based of an employee\'s basic salary. \n','13th Month Payable',8,'Current Liability','Liability',1,'2021-04-14',1,1,'2021-04-13 23:52:39','0000-00-00 00:00:00'),(32,0,'1-6004','Provident Fund Payable','Another name for pension fund. Its purpose is to provide employees with lump sum payments at the time of exit from their place of employment.\n','Provident Fund Payable',8,'Current Liability','Liability',1,'2021-04-14',1,1,'2021-04-13 23:53:44','0000-00-00 00:00:00'),(33,0,'1-7001','Witholding Tax - Expanded','A kind of Withholding Tax imposed on income payments and is creditable against the income tax due of the payee for the taxable quarter/year in which the income was earned.\n','Witholding Tax',9,'Current Liability','Liability',1,'2021-04-14',1,1,'2021-04-13 23:55:29','0000-00-00 00:00:00'),(34,0,'1-7002','Witholding Tax - Compensation','An amount that an employer withholds from employees\' wages and pays directly to the government. \n','Witholding Tax',9,'Current Liability','Liability',1,'2021-04-14',1,1,'2021-04-13 23:57:58','0000-00-00 00:00:00'),(35,0,'1-7003','SSS Premium Payable','All actual remuneration for employment, including the mandated cost of living allowance. \n','SSS Premium Payable',9,'Current Liability','Liability',1,'2021-04-14',1,1,'2021-04-14 00:01:16','0000-00-00 00:00:00'),(36,0,'1-7004','HDMF Premium Payable','Basic Monthly Salary plus mandated cost of living allowance (maximum of Php 5,000)\n','HDMF Premium Payable',9,'Current Liability','Liability',1,'2021-04-14',1,1,'2021-04-14 00:02:01','0000-00-00 00:00:00'),(37,0,'1-7005','PHIC Premium Payable','Basic Monthly Compensation regularly paid for service rendered by the employee\n','PHIC Premium Payable',9,'Current Liability','Liability',1,'2021-04-14',1,1,'2021-04-14 00:02:50','0000-00-00 00:00:00'),(38,0,'1-7006','Output VAT','The value added tax you charge on your own sales of goods and services both to other businesses and to ordinary consumers.\n','Output VAT',9,'Current Liability','Liability',1,'2021-04-14',1,1,'2021-04-14 00:03:56','0000-00-00 00:00:00'),(39,0,'1-7007','SSS Loan Payable','A loan is an arrangement under which the owner of property allows another party the use of it (usually cash) in exchange for an interest payment and the return of the property at the end of the lending arrangement.\n','SSS Loan Payable',9,'Current Liability','Liability',1,'2021-04-14',1,1,'2021-04-14 00:04:57','0000-00-00 00:00:00'),(40,0,'1-7008','HDMF Loan Payable','A loan is an arrangement under which the owner of property allows another party the use of it (usually cash) in exchange for an interest payment and the return of the property at the end of the lending arrangement.\n','HDMF Loan Payable',9,'Current Liability','Liability',1,'2021-04-14',1,1,'2021-04-14 00:06:01','0000-00-00 00:00:00'),(41,0,'1-8001','Advances from Partners','Means loans or advances, if any, made by a Partner to the Partnership from time to time\n','Advances from Partners',10,'Non-current Liability','Liability',1,'2021-04-14',1,1,'2021-04-14 00:07:50','0000-00-00 00:00:00'),(42,0,'1-9001','Capital','Such as funds held in deposit accounts and/or funds obtained from special financing sources. \n','Capital',11,'Equity','Equity',1,'2021-04-14',1,1,'2021-04-14 00:08:46','0000-00-00 00:00:00'),(43,0,'1-9002','Investment Withdrawal','Involves removing funds from a bank account, savings plan, pension, or trust. \n','Investment Withdrawal',12,'Equity','Equity',1,'2021-04-14',1,1,'2021-04-14 00:11:44','0000-00-00 00:00:00'),(44,0,'2-1001','Salaries and Wages-Basic','The remuneration paid or payable to employees for work performed on behalf of an employer or services provided.\n','Salaries and Wages-Basic',13,'Cost of Sales','Cost of Sales',1,'2021-04-14',1,1,'2021-04-14 00:13:02','0000-00-00 00:00:00'),(45,0,'2-1002','Allowance','Amount of money given or allotted usually at regular intervals for a specific purpose.\n','Allowance',13,'Cost of Sales','Cost of Sales',1,'2021-04-14',1,1,'2021-04-14 00:13:53','0000-00-00 00:00:00'),(46,0,'2-1003','SSS Expense','The money spent on SSS.\n','SSS Expense',13,'Cost of Sales','Cost of Sales',1,'2021-04-14',1,1,'2021-04-14 00:14:34','0000-00-00 00:00:00'),(47,0,'2-1004','PHIC Expense','The money spent on PHIC.\n','PHIC Expense',13,'Cost of Sales','Cost of Sales',1,'2021-04-14',1,1,'2021-04-14 00:15:13','0000-00-00 00:00:00'),(48,0,'2-1005','HDMF Expense','The money spent on HDMF.\n','HDMF Expense',13,'Cost of Sales','Cost of Sales',1,'2021-04-14',1,1,'2021-04-14 00:19:45','0000-00-00 00:00:00'),(49,0,'2-1006','13th Month Expense','The money spent on 13th Month.\n','13th Month Expense',13,'Cost of Sales','Cost of Sales',1,'2021-04-14',1,1,'2021-04-14 00:20:42','0000-00-00 00:00:00'),(50,0,'2-1007','Mid-Year Bonuses','The money spent on Mid-Year Bonuses.\n','Mid-Year Bonuses',13,'Cost of Sales','Cost of Sales',1,'2021-04-14',1,1,'2021-04-14 00:21:31','0000-00-00 00:00:00'),(51,0,'2-1008','Christmas Expense','The money spent on Christmas.\n','Christmas Expense',13,'Cost of Sales','Cost of Sales',1,'2021-04-14',1,1,'2021-04-14 00:22:42','0000-00-00 00:00:00'),(52,0,'2-2001','Communication for Support','The actual cost of postage, long distance telephone, cellular phone, and teletype expense incurred in the direct performance of the Services.\n','Communication',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:24:00','0000-00-00 00:00:00'),(53,0,'2-2002','Communication for Operations','The actual cost of postage, long distance telephone, cellular phone, and teletype expense incurred in the direct performance of the Services.\n','Communication',13,'Cost of Sales','Cost of Sales',1,'2021-04-14',1,1,'2021-04-14 00:24:52','0000-00-00 00:00:00'),(54,0,'2-2003','Communication for Partners','The actual cost of postage, long distance telephone, cellular phone, and teletype expense incurred in the direct performance of the Services.\n','Communication',13,'Cost of Sales','Cost of Sales',1,'2021-04-14',1,1,'2021-04-14 00:25:48','0000-00-00 00:00:00'),(55,0,'2-3001','Electricity-Meralco','The cost incurred by using utilities such as electricity, water, waste disposal, heating, and sewage. \n','Utilities',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:26:45','0000-00-00 00:00:00'),(56,0,'2-3002','Electricity-PLDT','The cost incurred by using utilities such as electricity, water, waste disposal, heating, and sewage. \n','Utilities',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:27:37','0000-00-00 00:00:00'),(57,0,'2-3003','Electricity-Fiber','The cost incurred by using utilities such as electricity, water, waste disposal, heating, and sewage. \n','Utilities',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:28:17','0000-00-00 00:00:00'),(58,0,'2-3004','Subscription Fee','Means the fee actually paid by a Subscriber for the applicable Mobile Content.\n','Subcription Fee',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:28:56','0000-00-00 00:00:00'),(59,0,'2-3005','Water (gal)','The cost incurred by using utilities such as electricity, water, waste disposal, heating, and sewage. \n','Pantry Supplies',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:29:36','0000-00-00 00:00:00'),(60,0,'2-3006','Rental-Association Dues','Amount of money that must be paid monthly by owners of certain types of residential properties, and HOAs collect these fees to assist with maintaining and improving properties in the association.\n','Association Dues',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:30:26','0000-00-00 00:00:00'),(61,0,'2-3007','Rental-Parking Dues','Amount of money that must be paid monthly by owners of certain types of residential properties, and HOAs collect these fees to assist with maintaining and improving properties in the association.\n','Parking Dues',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:31:11','0000-00-00 00:00:00'),(62,0,'2-4001','Fuel and Oil for Messenger','The money spent on Fuel and Oil of Messengers.\n','Fuel and Oil',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:32:07','0000-00-00 00:00:00'),(63,0,'2-4002','Fuel and Oil for Partners','The money spent on Fuel and Oil of Partners.\n','Fuel and Oil',13,'Cost of Sales','Cost of Sales',1,'2021-04-14',1,1,'2021-04-14 00:33:29','0000-00-00 00:00:00'),(64,0,'2-5001','Transportation and Travel for Support','Refers to specific costs incurred by an employee or self-employed taxpayer who travels for business purposes. \n','Transportation',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:34:16','0000-00-00 00:00:00'),(65,0,'2-5002','Transportation and Travel for Operations','Refers to specific costs incurred by an employee or self-employed taxpayer who travels for business purposes. \n','Transportation',13,'Cost of Sales','Cost of Sales',1,'2021-04-14',1,1,'2021-04-14 00:34:59','0000-00-00 00:00:00'),(66,0,'2-5003','Transportation and Travel for Partners','Refers to specific costs incurred by an employee or self-employed taxpayer who travels for business purposes. \n','Transportation',13,'Cost of Sales','Cost of Sales',1,'2021-04-14',1,1,'2021-04-14 00:36:05','0000-00-00 00:00:00'),(67,0,'2-6001','Repairs and Maintenance for Messenger','Expenses a business incurs to restore an asset to a previous operating condition or to keep an asset in its current operating condition.\n','Repairs and Maintenance',13,'Cost of Sales','Cost of Sales',1,'2021-04-14',1,1,'2021-04-14 00:37:26','0000-00-00 00:00:00'),(68,0,'2-6002','Repairs and Maintenance for Partners','Expenses a business incurs to restore an asset to a previous operating condition or to keep an asset in its current operating condition.\n','Repairs and Maintenance',13,'Cost of Sales','Cost of Sales',1,'2021-04-14',1,1,'2021-04-14 00:38:33','0000-00-00 00:00:00'),(69,0,'2-7001','Representation Expense','These expenses are charges incurred in representing the company before customers or suppliers. \n','Representation Expense',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:40:42','0000-00-00 00:00:00'),(70,0,'2-7003','Taxes and Licenses','The tax expense is what an entity has determined is owed in taxes based on standard business accounting rules. \n','Taxes and Licenses',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:41:21','0000-00-00 00:00:00'),(71,0,'2-7004','Office Supplies','The amount of administrative supplies charged to expense in a reporting period.\n','Office Supplies',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:42:05','0000-00-00 00:00:00'),(72,0,'2-7005','Pantry Supplies','Refers to the cost of consumables used during a reporting period. \n','Pantry Supplies',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:42:49','0000-00-00 00:00:00'),(73,0,'2-7006','Housekeeping and Cleaning Supplies','The cost required for housekeeping and cleaning supplies.\n','Cleaning Supplies Expense',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:43:43','0000-00-00 00:00:00'),(74,0,'2-7007','Recruitment Expense','The total amount spent to recruit a hire starting from the job posting to joining the organization.\n','Recruitment Expense',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:45:09','0000-00-00 00:00:00'),(75,0,'2-7008','Trainings and Seminars','The cost incurred in trainings and seminars.\n','Training and Seminar',13,'Cost of Sales','Cost of Sales',1,'2021-04-14',1,1,'2021-04-14 00:46:14','0000-00-00 00:00:00'),(76,0,'2-7009','Advertising and Marketing Expense','Refers to cost incurred in promoting a business, such as publications in periodicals (newspapers and magazines), television, radio, the internet, billboards, fliers, and others.\n','Advertising',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:46:57','0000-00-00 00:00:00'),(77,0,'2-7010','Professional Fees','Usually an income account used by a professional firm in recording its revenues.\n','Professional Fees',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:47:56','0000-00-00 00:00:00'),(78,0,'2-7011','Insurance','The cost of insurance that has been incurred, has expired, or has been used up during the current accounting period for the nonmanufacturing functions of a business.\n','Insurance',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:48:35','0000-00-00 00:00:00'),(79,0,'2-7012','Medicine','Any costs incurred in the prevention or treatment of injury or disease.\n','Medical Expense',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:49:18','0000-00-00 00:00:00'),(80,0,'2-7013','Miscellaneous','Refer to a general ledger account in which small, infrequent transaction amounts are recorded.\n','Miscellaneous',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:50:08','0000-00-00 00:00:00'),(81,0,'2-7014','Bank Charges','Covers all charges and fees made by a bank to their customers.\n','Bank Service Charge',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:50:57','0000-00-00 00:00:00'),(82,0,'2-7015','Notarial Fees','Includes all fees paid to attorneys, appraisers, notaries, and witnesses, in addition to court costs and legal document recording fees.\n','Legal',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:51:45','0000-00-00 00:00:00'),(83,0,'2-7016','Registered Mail','A mail service offered by postal services in many countries, which allows the sender proof of mailing via a mailing receipt and, upon request, electronic verification that an article was delivered or that a delivery attempt was made.\n','Postage',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:53:02','0000-00-00 00:00:00'),(84,0,'2-7017','Postage','Particular place on the floor of an exchange where transactions in stocks listed on the exchange occur.\n','Postage',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:53:45','0000-00-00 00:00:00'),(85,0,'2-7018','Donation','A gift for charity, humanitarian aid, or to benefit a cause. \n','Donation',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:54:23','0000-00-00 00:00:00'),(86,0,'2-7019','Printing & Photocopy','Purchases related to printing and copying.\n','Printing',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:55:01','0000-00-00 00:00:00'),(87,0,'2-7020','Other Expenses','Expenses that do not relate to a company\'s main business.\n','Other Expenses',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:55:34','0000-00-00 00:00:00'),(88,0,'2-8001','Employee Benefits','Payments employers make to employees that are beyond the scope of wages.\n','Employee Benefits',14,'G&A Expenses','G&A Expenses',1,'2021-04-14',1,1,'2021-04-14 00:56:09','0000-00-00 00:00:00'),(89,0,'2-9001','Retained Earnings','The amount of net income left over for the business after it has paid out dividends to its shareholders.\n','Retained Earnings',15,'Equity','Equity',1,'2021-04-14',1,1,'2021-04-14 00:57:06','0000-00-00 00:00:00'),(90,0,'2-9002','Service Revenue','Income a company receives for performing a requested activity.\n','Service Revenue',16,'Sales','Sales',1,'2021-04-14',1,1,'2021-04-14 00:57:52','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `fms_chart_of_accounts_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fms_check_voucher_tbl`
--

DROP TABLE IF EXISTS `fms_check_voucher_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fms_check_voucher_tbl` (
  `voucherID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseVoucherID` bigint(20) DEFAULT NULL,
  `voucherStatus` int(50) NOT NULL,
  `voucherRemarks` longtext DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `paymentID` bigint(20) NOT NULL,
  `voucherTinPayee` varchar(255) DEFAULT NULL,
  `voucherDescription` longtext DEFAULT NULL,
  `voucherBudgetSource` int(50) DEFAULT NULL,
  `checkNo` varchar(255) DEFAULT NULL,
  `voucherAmount` decimal(10,2) DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`voucherID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_check_voucher_tbl`
--

LOCK TABLES `fms_check_voucher_tbl` WRITE;
/*!40000 ALTER TABLE `fms_check_voucher_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `fms_check_voucher_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fms_client_fund_request_tbl`
--

DROP TABLE IF EXISTS `fms_client_fund_request_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fms_client_fund_request_tbl` (
  `clientFundRequestID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseClientFundRequestID` bigint(20) DEFAULT NULL,
  `clientFundRequestAmount` decimal(15,2) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `projectID` bigint(20) NOT NULL,
  `chartOfAccountID` bigint(25) NOT NULL,
  `clientFundRequestDate` date NOT NULL,
  `approversID` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientFundRequestStatus` int(11) NOT NULL,
  `clientFundRequestRemarks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`clientFundRequestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_client_fund_request_tbl`
--

LOCK TABLES `fms_client_fund_request_tbl` WRITE;
/*!40000 ALTER TABLE `fms_client_fund_request_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `fms_client_fund_request_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fms_collection_items_tbl`
--

DROP TABLE IF EXISTS `fms_collection_items_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fms_collection_items_tbl` (
  `collectionItemID` bigint(21) NOT NULL AUTO_INCREMENT,
  `collectionID` bigint(21) NOT NULL,
  `billingItemID` bigint(21) DEFAULT NULL,
  `activity` text DEFAULT NULL,
  `type` varchar(150) DEFAULT NULL,
  `checkNumber` varchar(100) DEFAULT NULL,
  `checkDate` date DEFAULT NULL,
  `depositoryAccount` varchar(200) DEFAULT NULL,
  `termPayment` varchar(150) DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`collectionItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_collection_items_tbl`
--

LOCK TABLES `fms_collection_items_tbl` WRITE;
/*!40000 ALTER TABLE `fms_collection_items_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `fms_collection_items_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fms_collection_tbl`
--

DROP TABLE IF EXISTS `fms_collection_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fms_collection_tbl` (
  `collectionID` bigint(21) NOT NULL AUTO_INCREMENT,
  `employeeID` bigint(21) NOT NULL,
  `clientID` bigint(21) DEFAULT NULL,
  `clientCode` varchar(150) DEFAULT NULL,
  `clientName` varchar(150) DEFAULT NULL,
  `clientAddress` text DEFAULT NULL,
  `clientContactNumber` varchar(50) DEFAULT NULL,
  `collectionComment` text DEFAULT NULL,
  `collectionPaymentMethod` varchar(100) DEFAULT NULL,
  `dateFrom` date DEFAULT NULL,
  `dateTo` date DEFAULT NULL,
  `collectionSubtotal` decimal(15,2) DEFAULT NULL,
  `collectionVatAmount` decimal(15,2) DEFAULT NULL,
  `collectionGrandTotal` decimal(15,2) DEFAULT NULL,
  `collectionReason` text DEFAULT NULL,
  `collectionStatus` int(11) DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`collectionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_collection_tbl`
--

LOCK TABLES `fms_collection_tbl` WRITE;
/*!40000 ALTER TABLE `fms_collection_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `fms_collection_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fms_finance_request_details_tbl`
--

DROP TABLE IF EXISTS `fms_finance_request_details_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fms_finance_request_details_tbl` (
  `financeRequestID` bigint(20) NOT NULL AUTO_INCREMENT,
  `clientFundRequestID` bigint(20) DEFAULT NULL,
  `pettyCashRequestID` bigint(20) DEFAULT NULL,
  `voucherID` bigint(20) DEFAULT NULL,
  `description` text NOT NULL,
  `quantity` decimal(15,2) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `files` text DEFAULT NULL,
  `liquidationID` bigint(20) DEFAULT NULL,
  `pettyRepID` bigint(20) DEFAULT NULL,
  `vatSales` decimal(15,2) DEFAULT NULL,
  `vat` decimal(15,2) DEFAULT NULL,
  `clientID` bigint(20) DEFAULT NULL,
  `srfNumber` text DEFAULT NULL,
  `chartOfAccountID` bigint(20) DEFAULT NULL,
  `remark` text DEFAULT NULL,
  `receiptNumber` text DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  PRIMARY KEY (`financeRequestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_finance_request_details_tbl`
--

LOCK TABLES `fms_finance_request_details_tbl` WRITE;
/*!40000 ALTER TABLE `fms_finance_request_details_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `fms_finance_request_details_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fms_petty_cash_request_details_tbl`
--

DROP TABLE IF EXISTS `fms_petty_cash_request_details_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fms_petty_cash_request_details_tbl` (
  `pettyCashRequestDetailsID` bigint(20) NOT NULL AUTO_INCREMENT,
  `pettyCashRequestID` bigint(20) DEFAULT NULL,
  `pettyCashRequestDetailsDescription` varchar(100) DEFAULT NULL,
  `amount` decimal(15,2) NOT NULL,
  `files` text DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  PRIMARY KEY (`pettyCashRequestDetailsID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_petty_cash_request_details_tbl`
--

LOCK TABLES `fms_petty_cash_request_details_tbl` WRITE;
/*!40000 ALTER TABLE `fms_petty_cash_request_details_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `fms_petty_cash_request_details_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fms_petty_cash_request_tbl`
--

DROP TABLE IF EXISTS `fms_petty_cash_request_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fms_petty_cash_request_tbl` (
  `pettyCashRequestID` bigint(20) NOT NULL AUTO_INCREMENT,
  `revisePettyCashRequestID` bigint(20) DEFAULT NULL,
  `pettyCashRequestAmount` decimal(15,2) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `chartOfAccountID` bigint(25) NOT NULL,
  `pettyCashRequestDate` date NOT NULL,
  `approversID` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pettyCashRequestStatus` int(11) NOT NULL,
  `pettyCashRequestRemarks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pettyCashLiquidationStatus` int(11) NOT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`pettyCashRequestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_petty_cash_request_tbl`
--

LOCK TABLES `fms_petty_cash_request_tbl` WRITE;
/*!40000 ALTER TABLE `fms_petty_cash_request_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `fms_petty_cash_request_tbl` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=191 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_approval_setup_tbl`
--

LOCK TABLES `gen_approval_setup_tbl` WRITE;
/*!40000 ALTER TABLE `gen_approval_setup_tbl` DISABLE KEYS */;
INSERT INTO `gen_approval_setup_tbl` VALUES (128,52,'Sign-off',0,1,'0',1,1,'2021-04-07','2021-04-07 05:57:06'),(129,55,'Leave Request',1,0,'4|2|6',1,1,'2021-04-07','2021-04-07 06:40:10'),(130,55,'Leave Request',2,0,'4|3|7',1,1,'2021-04-07','2021-04-07 23:22:37'),(131,60,'Change Schedule',1,0,'4|6|5',1,1,'2021-04-07','2021-04-15 03:28:37'),(132,60,'Change Schedule',2,0,'3|4|1',1,1,'2021-04-07','2021-04-07 06:21:55'),(133,60,'Change Schedule',3,0,'0',1,1,'2021-04-07','2021-04-07 06:21:15'),(134,60,'Change Schedule',4,0,'1|3|6',1,4,'2021-04-07','2021-04-19 08:42:10'),(139,57,'No Time In/Out',1,0,'2|4|5',1,1,'2021-04-08','2021-04-08 00:23:36'),(140,56,'Overtime Request',1,0,'4|8|7',1,1,'2021-04-08','2021-04-08 06:39:22'),(141,33,'Inventory Receiving',1,0,'4|2|5',1,1,'2021-04-12','2021-05-18 00:34:22'),(142,33,'Inventory Receiving',2,0,'0',1,1,'2021-04-12','2021-04-12 00:18:26'),(143,33,'Inventory Receiving',3,0,'0',1,1,'2021-04-12','2021-04-12 00:18:26'),(144,58,'Official Business',1,0,'2|3|5',1,1,'2021-04-12','2021-04-12 02:42:56'),(145,58,'Official Business',6,0,'1|3|0',1,1,'2021-04-12','2021-04-12 02:43:30'),(146,58,'Official Business',9,0,'1|3|0',1,1,'2021-04-12','2021-04-12 02:44:28'),(149,46,'Purchase Request',1,0,'4|2|7',1,1,'2021-04-21','2021-04-21 07:41:25'),(150,46,'Purchase Request',2,0,'0',1,1,'2021-04-21','2021-04-21 05:28:50'),(151,46,'Purchase Request',3,0,'0',1,1,'2021-04-21','2021-04-21 05:28:50'),(152,46,'Purchase Request',4,0,'0',1,1,'2021-04-21','2021-04-21 05:28:50'),(160,38,'Cost Estimate',1,0,'4|20|2',1,1,'2021-04-22','2021-05-17 07:50:52'),(161,38,'Cost Estimate',2,0,'6|3|0',1,1,'2021-04-22','2021-04-22 02:13:30'),(162,38,'Cost Estimate',3,0,'6|3|0',1,1,'2021-04-22','2021-04-22 02:12:53'),(163,38,'Cost Estimate',4,0,'6|3|0',1,1,'2021-04-22','2021-04-22 02:12:53'),(164,38,'Cost Estimate',5,0,'6|3|0',1,1,'2021-04-22','2021-04-22 02:12:53'),(165,38,'Cost Estimate',6,0,'6|3|0',1,1,'2021-04-22','2021-04-22 02:12:53'),(166,38,'Cost Estimate',7,0,'6|3|0',1,1,'2021-04-22','2021-04-22 02:12:53'),(167,38,'Cost Estimate',8,0,'0',1,1,'2021-04-22','2021-05-28 02:20:24'),(168,38,'Cost Estimate',9,0,'0',1,1,'2021-04-22','2021-05-28 02:20:24'),(169,59,'Loan',1,0,'2|3|4',1,1,'2021-04-30','2021-04-30 00:22:04'),(170,59,'Loan',3,0,'0',1,1,'2021-04-30','2021-05-28 02:20:24'),(171,59,'Loan',8,0,'0',1,1,'2021-04-30','2021-04-30 00:21:18'),(172,37,'Transfer Request',1,0,'2|3|4',1,1,'2021-04-30','2021-04-30 00:55:25'),(173,37,'Transfer Request',2,0,'0',1,1,'2021-04-30','2021-04-30 00:55:05'),(174,126,'Inventory Validation Form',1,0,'2|4|5',1,1,'2021-05-02','2021-05-02 12:28:34'),(175,126,'Inventory Validation Form',2,0,'0',1,1,'2021-05-02','2021-05-02 12:28:13'),(176,126,'Inventory Validation Form',3,0,'0',1,1,'2021-05-02','2021-05-02 12:28:13'),(177,44,'Inventory Incident',1,0,'5|2|4',1,1,'2021-05-03','2021-05-03 00:34:24'),(178,35,'Return Item',1,0,'2|5|4',1,1,'2021-05-03','2021-05-12 02:58:43'),(179,35,'Return Item',2,0,'0',1,1,'2021-05-03','2021-05-03 03:42:08'),(180,36,'Disposal',1,0,'2|3|4',1,1,'2021-05-03','2021-05-03 03:43:32'),(181,36,'Disposal',2,0,'0',1,1,'2021-05-03','2021-05-03 03:43:10'),(182,42,'Material Withdrawal',1,0,'4|2|5',1,1,'2021-05-04','2021-05-04 01:25:40'),(183,39,'Bill of Material',1,0,'4|20|2',1,1,'2021-05-07','2021-05-17 07:50:04'),(184,49,'Service Requisition',1,0,'2|4|5',1,1,'2021-05-08','2021-05-08 03:14:23'),(185,41,'Service Order',1,0,'2|4|5',1,1,'2021-05-08','2021-05-08 08:40:03'),(186,40,'Bid Recap',1,0,'2|4|20',1,1,'2021-05-10','2021-05-17 07:49:40'),(187,128,'Service Completion',1,0,'2|4|5',1,1,'2021-05-11','2021-05-11 23:09:18'),(188,45,'Material Usage',1,0,'2|4|5',1,1,'2021-05-12','2021-05-12 06:36:25'),(189,47,'Purchase Order',1,0,'2|5|4',1,1,'2021-05-15','2021-05-15 13:09:03'),(190,43,'Equipment Borrowing',1,0,'4|2|5',1,1,'2021-05-25','2021-05-25 07:09:58');
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_ledger_classification_tbl`
--

LOCK TABLES `gen_ledger_classification_tbl` WRITE;
/*!40000 ALTER TABLE `gen_ledger_classification_tbl` DISABLE KEYS */;
INSERT INTO `gen_ledger_classification_tbl` VALUES (1,'Cash','2021-04-14'),(2,'Accounts Receivable','2021-04-14'),(3,'Inventory','2021-04-14'),(4,'Other current Assets','2021-04-14'),(5,'Due from Related Parties','2021-04-14'),(6,'Property Plant and Equipment','2021-04-14'),(7,'Trade Payable','2021-04-14'),(8,'Accrued Expenses','2021-04-14'),(9,'Due to Government','2021-04-14'),(10,'Due to Related Parties','2021-04-14'),(11,'Subscribed and Paid','2021-04-14'),(12,'Statement of Changes in Equity','2021-04-14'),(13,'Cost of Sale','2021-04-14'),(14,'Administrative Expense','2021-04-14'),(15,'Retained Earnings','2021-04-14'),(16,'Service Revenue','2021-04-14');
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
INSERT INTO `gen_module_category_tbl` VALUES (1,5,1,'01616719743.svg','System Settings',1,'2021-03-24 06:19:25','2021-03-26 00:49:03'),(2,2,1,'01616719604.svg','Masterfiles',1,'2021-03-24 06:19:25','2021-03-26 00:46:44'),(3,2,2,'01616719620.svg','Inventory Modules',1,'2021-03-24 06:19:25','2021-03-26 00:47:00'),(4,2,3,'01616719637.svg','Employee Forms',1,'2021-03-24 06:19:25','2021-03-26 00:47:17'),(5,2,4,'01616719651.svg','Project Modules',1,'2021-03-24 06:19:25','2021-03-26 00:47:31'),(6,4,1,'01616719724.svg','Reports',1,'2021-03-24 06:19:25','2021-03-26 00:48:44'),(7,2,5,'01616719666.svg','Finance Modules',1,'2021-03-24 06:19:25','2021-03-26 00:47:46'),(8,2,6,'01616719678.svg','HR Modules',1,'2021-03-24 06:19:25','2021-03-26 00:47:58'),(9,5,2,'01616719756.svg','System Setup',1,'2021-03-24 06:19:25','2021-03-26 00:49:16'),(10,2,7,'01616719698.svg','Recruitment Modules',1,'2021-03-24 06:19:25','2021-03-26 00:48:18'),(11,2,8,'01616719711.svg','Payroll Modules',1,'2021-03-24 06:19:25','2021-03-26 00:48:31'),(12,1,1,'01616719589.svg','Dashboard',1,'2021-03-24 06:53:33','2021-03-26 00:46:29');
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
INSERT INTO `gen_module_header_tbl` VALUES (1,1,'Main',1,'2021-03-24 07:26:04','2021-03-24 07:26:05'),(2,2,'Forms',1,'2021-03-19 07:26:06','2021-03-24 07:26:08'),(3,3,'Management',1,'2021-03-17 07:26:09','2021-03-24 07:26:10'),(4,4,'Reports',1,'2021-03-08 07:26:11','2021-03-24 07:26:12'),(5,5,'Settings',1,'2021-03-17 07:26:12','2021-03-24 07:26:13');
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
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_module_list_tbl`
--

LOCK TABLES `gen_module_list_tbl` WRITE;
/*!40000 ALTER TABLE `gen_module_list_tbl` DISABLE KEYS */;
INSERT INTO `gen_module_list_tbl` VALUES (1,5,1,1,'Project Management System|Inventory Management System|Finance Management System','01618295087.svg|11618295087.svg|21618295087.svg|31618295087.svg|41618295087.svg|51618295087.svg|6161','Approval Setup',0,'approval_setup',1,'2021-03-23 23:22:25','2021-04-13 06:24:47'),(2,5,1,2,'Inventory Management System|Project Management System|Finance Management System|Human Resource Information System',NULL,'Roles and Permission',0,'roles_permission',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(3,5,1,3,'Inventory Management System|Project Management System|Finance Management System|Human Resource Information System',NULL,'System Notification',0,'system_notification',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(4,2,2,1,'Inventory Management System',NULL,'Inventory Item',0,'ims/inventory_item',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(5,2,2,2,'Inventory Management System',NULL,'Inventory Category',0,'ims/inventory_category',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(6,2,2,3,'Inventory Management System',NULL,'Inventory Classification',0,'ims/inventory_classification',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(7,2,2,4,'Inventory Management System',NULL,'Inventory Storage',0,'ims/inventory_storage',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(8,2,2,5,'Inventory Management System',NULL,'Inventory Vendor',0,'ims/inventory_vendor',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(9,2,2,6,'Inventory Management System',NULL,'Inventory Condition',0,'ims/inventory_condition',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(10,2,2,7,'Project Management System',NULL,'Project Milestone',0,'pms/project_milestone',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(11,2,2,8,'Project Management System',NULL,'Project List',0,'pms/project_list',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(12,2,2,9,'Project Management System',NULL,'Project Client',0,'pms/project_client',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(13,2,2,10,'Project Management System',NULL,'Project Category',0,'pms/project_category',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(14,2,2,11,'Finance Management System',NULL,'Bank',0,'fms/bank',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(15,2,2,12,'Finance Management System',NULL,'Chart of Accounts',0,'fms/chart_of_accounts',1,'2021-03-23 23:22:25','2021-05-05 06:09:55'),(16,2,2,13,'Finance Management System',NULL,'Ledger Classification',0,'fms/ledger_classification',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(17,2,2,14,'Human Resource Information System',NULL,'Designation',0,'hris/designation',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(18,2,2,15,'Human Resource Information System',NULL,'Department',0,'hris/department',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(19,2,2,16,'Human Resources Information System',NULL,'Requirement',0,'hris/requirements',1,'2021-03-23 23:22:25','2021-05-14 03:20:21'),(20,2,2,17,'Human Resource Information System',NULL,'Holiday',0,'hris/holiday',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(21,2,2,18,'Human Resource Information System',NULL,'Leave Type',0,'hris/leave_type',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(22,2,2,19,'Human Resource Information System',NULL,'Loan Type',0,'hris/loan_type',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(23,2,2,20,'Human Resource Information System',NULL,'Code of Conduct Category',0,'hris/code_conduct_category',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(24,2,2,21,'Human Resource Information System',NULL,'Code of Conduct Section',0,'hris/code_conduct_section',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(25,2,2,22,'Human Resource Information System',NULL,'Branch',0,'hris/branch',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(26,2,2,23,'Human Resource Information System',NULL,'Qualification',0,'hris/qualification',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(27,2,2,24,'Human Resource Information System',NULL,'Award',0,'hris/award',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(28,2,2,25,'Human Resource Information System',NULL,'SSS Table',0,'hris/sss_table',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(29,2,2,26,'Human Resource Information System',NULL,'PhilHealth Table',0,'hris/philhealth_table',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(30,2,2,27,'Human Resource Information System',NULL,'Tax Table',0,'hris/tax_table',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(31,2,2,28,'Human Resource Information System',NULL,'Training and Development',0,'hris/training_development',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(32,2,2,29,'Human Resource Information System',NULL,'Examination',0,'hris/examination',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(33,2,3,1,'Inventory Management System',NULL,'Inventory Receiving',3,'ims/inventory_receiving',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(34,2,3,2,'Inventory Management System',NULL,'List of Stocks',0,'ims/list_stocks',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(35,2,3,3,'Inventory Management System',NULL,'Return Item',3,'ims/return_item',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(36,2,3,4,'Inventory Management System',NULL,'Disposal',3,'ims/item_disposal',1,'2021-03-23 23:22:25','2021-05-05 05:53:05'),(37,2,3,5,'Inventory Management System',NULL,'Transfer Request',3,'ims/transfer_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(38,2,5,6,'Project Management System',NULL,'Cost Estimate',3,'pms/cost_estimate',1,'2021-03-23 23:22:25','2021-05-02 05:09:04'),(39,2,5,7,'Project Management System',NULL,'Project Budget Rationale',3,'pms/project_budget_rationale',1,'2021-03-23 23:22:25','2021-05-25 06:04:50'),(40,2,3,8,'Inventory Management System',NULL,'Bid Recap',3,'ims/bid_recap',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(41,2,3,9,'Inventory Management System',NULL,'Service Order',3,'ims/service_order',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(42,2,3,1,'Inventory Management System',NULL,'Material Withdrawal',3,'ims/material_withdrawal',1,'2021-03-23 23:22:25','2021-05-25 04:57:02'),(43,2,3,2,'Inventory Management System',NULL,'Equipment Borrowing',3,'ims/equipment_borrowing',1,'2021-03-23 23:22:25','2021-05-31 06:13:52'),(44,2,3,3,'Inventory Management System',NULL,'Inventory Incident',3,'ims/inventory_incident',1,'2021-03-23 23:22:25','2021-05-26 23:38:34'),(45,2,3,4,'Inventory Management System',NULL,'Material Usage',3,'ims/material_usage',1,'2021-03-23 23:22:25','2021-05-11 05:37:06'),(46,2,3,5,'Inventory Management System',NULL,'Purchase Request',3,'ims/purchase_request',1,'2021-03-23 23:22:25','2021-05-09 10:50:44'),(47,2,3,6,'Inventory Management System',NULL,'Purchase Order',3,'ims/purchase_order',1,'2021-03-23 23:22:25','2021-05-09 10:50:28'),(48,2,4,7,'Inventory Management System',NULL,'Item Price List',0,'ims/item_price_list',0,'2021-03-23 23:22:25','2021-05-12 02:09:43'),(49,2,3,8,'Inventory Management System',NULL,'Service Requisition',3,'ims/service_requisition',1,'2021-03-23 23:22:25','2021-05-17 08:12:57'),(50,2,4,9,'Project Management System',NULL,'Personel Requisition',3,'pms/personel_requisition',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(51,2,4,10,'Project Management System',NULL,'Employee Taskboard',3,'pms/employee_taskboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(52,2,4,11,'Project Management System',NULL,'Sign-off',3,'pms/sign_off',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(53,2,4,12,'Finance Management System',NULL,'Petty Cash Request',3,'fms/petty_cash_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(54,2,4,13,'Finance Management System',NULL,'Client Fund Request',3,'fms/client_fund_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(55,2,4,14,'Human Resource Information System',NULL,'Leave Request',3,'hris/leave_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(56,2,4,15,'Human Resource Information System',NULL,'Overtime Request',3,'hris/overtime_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(57,2,4,16,'Human Resources Information System',NULL,'No Time In/Out',3,'hris/no_timein_timeout',1,'2021-03-23 23:22:25','2021-03-25 05:53:42'),(58,2,4,17,'Human Resource Information System',NULL,'Official Business',3,'hris/official_business',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(59,2,4,18,'Human Resources Information System',NULL,'Loan',3,'hris/loan_form',1,'2021-03-23 23:22:25','2021-04-13 03:47:55'),(60,2,4,19,'Human Resource Information System',NULL,'Change Schedule',3,'hris/change_schedule',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(61,2,4,20,'Human Resource Information System',NULL,'Employee Evaluation',3,'hris/employee_evaluation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(62,2,4,21,'Human Resource Information System',NULL,'Clearance',3,'hris/clearance',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(63,6,4,1,'Inventory Management System',NULL,'Purhcase Order Report',0,'ims/purchase_order_report',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(64,6,4,2,'Inventory Management System',NULL,'Receiving Report',0,'ims/receiving_report',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(65,6,4,3,'Inventory Management System',NULL,'Inventory Incident Report',0,'ims/inventory_incident_report',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(66,6,4,4,'Inventory Management System',NULL,'Inventory Report',0,'ims/inventory_report',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(67,1,12,1,'Inventory Management System',NULL,'Inventory Dashboard',0,'ims/inventory_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(68,1,12,2,'Project Management System',NULL,'Project Dashboard',0,'pms/project_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(69,1,12,3,'Finance Management System',NULL,'Finance Dashboard',0,'fms/finance_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(70,1,12,4,'Human Resource Information System',NULL,'HRIS Dashboard',0,'hris/hr_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(71,4,6,5,'Project Management System',NULL,'Project Management',0,'fms/project_management',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(72,4,6,6,'Project Management System',NULL,'Project Task',0,'fms/project_task',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(73,4,6,7,'Project Management System',NULL,'Project Timeline',0,'fms/project_timeline',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(74,4,6,8,'Finance Management System',NULL,'Petty Cash Voucher',0,'fms/petty_cash_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(75,4,6,9,'Finance Management System',NULL,'Client Fund Voucher Report',0,'fms/client_fund_voucher',1,'2021-03-23 23:22:25','2021-06-18 06:10:34'),(76,4,6,10,'Finance Management System',NULL,'Payment Request',0,'fms/payment_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(77,4,6,11,'Finance Management System',NULL,'Check Voucher',0,'fms/check_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(78,4,6,12,'Human Resource Information System',NULL,'Examination Report',0,'hris/examination_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(79,4,6,13,'Human Resource Information System',NULL,'Timekeeping Report',0,'hris/timekeeping_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(80,4,6,14,'Human Resource Information System',NULL,'Payroll Report',0,'hris/payroll_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(81,4,6,15,'Human Resource Information System',NULL,'Payroll Adjustment Report',0,'hris/payroll_adjustment_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(82,4,6,16,'Human Resource Information System',NULL,'Payslip Generation',0,'hris/payslip_generation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(83,4,6,17,'Human Resource Information System',NULL,'13th Month Report',0,'hris/13th_month_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(84,4,6,18,'Human Resource Information System',NULL,'PHIC Premium Payment',0,'hris/phic_premium_payment',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(85,4,6,19,'Human Resource Information System',NULL,'SSS Premium Payment',0,'hris/sss_premium_payment',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(86,4,6,20,'Human Resource Information System',NULL,'HDMF Premim Payment',0,'hris/hdmf_premium_payment',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(87,4,6,21,'Human Resource Information System',NULL,'Manpower Management Report',0,'hris/manpower_management_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(88,1,12,5,'Human Resource Information System',NULL,'Employee Dashboard',0,'hris/employee_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(89,2,5,1,'Project Management System',NULL,'Milestone Builder',3,'pms/milestone_builder',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(90,2,5,2,'Project Management System',NULL,'Project Timeline Builder',0,'pms/project_timeline_builder',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(91,2,5,3,'Project Management System',NULL,'Manage Project Budget',3,'pms/manage_project_budget',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(92,2,5,4,'Project Management System',NULL,'Project Management Board',3,'pms/project_management_board',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(93,2,7,1,'Finance Management System',NULL,'Petty Cash Voucher',3,'fms/petty_cash_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(94,2,7,2,'Finance Management System',NULL,'Client Fund Voucher',3,'fms/client_fund_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(95,2,7,3,'Finance Management System',NULL,'Payment Request',3,'fms/payment_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(96,2,7,4,'Finance Management System',NULL,'Check Voucher',3,'fms/check_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(97,2,7,5,'Finance Management System',NULL,'Check Writer',3,'fms/check_writer',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(98,2,7,6,'Finance Management System',NULL,'Check Voucher Liquidation',3,'fms/check_voucher_liquidation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(99,2,7,7,'Finance Management System',NULL,'Billing Module',3,'fms/billing_module',1,'2021-03-23 23:22:25','2021-06-14 01:20:19'),(100,2,7,8,'Finance Management System',NULL,'Collection Module',3,'fms/collection_module',1,'2021-03-23 23:22:25','2021-06-15 02:51:51'),(101,5,9,1,'Human Resource Information System',NULL,'Schedule Setup',0,'hris/schedule_setup',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(102,5,9,2,'Human Resource Information System',NULL,'Orientation Setup',0,'hris/orientation_setup',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(103,2,10,1,'Human Resources Information System',NULL,'Job Posting',0,'hris/job_posting',1,'2021-03-23 23:22:25','2021-03-25 05:25:43'),(104,2,10,2,'Human Resource Information System',NULL,'Applicant Registration',0,'hris/application_registration',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(105,2,10,3,'Human Resource Information System',NULL,'Examination',0,'hris/examination',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(106,2,10,4,'Human Resource Information System',NULL,'Applicant List',0,'hris/applicant_list',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(107,2,10,5,'Human Resource Information System',NULL,'On-boarding',0,'hris/on_boarding',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(108,2,11,1,'Human Resource Information System',NULL,'Employee Attendance',0,'hris/employee_attendance',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(109,2,11,2,'Human Resource Information System',NULL,'Timekeeping',0,'hris/timekeeping',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(110,2,11,3,'Human Resource Information System',NULL,'Payroll',0,'hris/payroll',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(111,2,11,4,'Human Resource Information System',NULL,'Payroll Adjustment',0,'hris/payroll_adjustment',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(112,2,11,5,'Human Resource Information System',NULL,'13th Month',0,'hris/13th_month',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(113,2,8,1,'Human Resource Information System',NULL,'Personnel Requisition',0,'hris/personnel_requisition',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(114,2,8,2,'Human Resources Information System',NULL,'Employee Module',0,'hris/employee_module',1,'2021-03-23 23:22:25','2021-04-19 05:22:53'),(115,2,8,3,'Human Resource Information System',NULL,'Personal Action Notice',0,'hris/personal_action_notice',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(116,2,8,4,'Human Resource Information System',NULL,'Manpower Management',0,'hris/manpower_management',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(117,2,8,5,'Human Resource Information System',NULL,'Employee Relation',0,'hris/employee_relation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(118,2,8,6,'Human Resource Information System',NULL,'Employee Evaluation',0,'hris/employee_evaluation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(119,2,8,7,'Human Resource Information System',NULL,'Employee Management',0,'hris/employee_management',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(120,2,8,8,'Human Resource Information System',NULL,'Memorandum',0,'hris/memorandum',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(121,2,8,9,'Human Resource Information System',NULL,'Employee Award',0,'hris/employee_award',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(122,2,8,10,'Human Resource Information System',NULL,'Leave Monitoring',0,'hris/leave_monitoring',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(123,2,8,11,'Human Resource Information System',NULL,'Training and Development',0,'hris/training_development',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(124,2,8,12,'Human Resource Information System',NULL,'Event Calendar',0,'hris/event_calendar',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(125,2,3,1,'Inventory Management System',NULL,'Canvassing Form',1,'ims/inventory_canvassing',1,'2021-04-20 23:29:40','2021-04-20 23:29:40'),(126,2,3,1,'Inventory Management System',NULL,'Inventory Validation',3,'ims/inventory_validation',1,'2021-04-20 23:41:40','2021-06-02 05:46:10'),(127,2,3,1,'Inventory Management System',NULL,'Item Price List',0,'ims/item_price_list',1,'2021-04-22 16:09:10','2021-05-06 06:53:39'),(128,2,3,9,'Inventory Management System',NULL,'Service Completion',3,'ims/service_completion',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(129,2,3,99,'Inventory Management System',NULL,'Inventory Stock In',0,'ims/inventory_stock_in',1,'2021-05-07 01:50:57','2021-05-07 01:50:57'),(130,2,2,3,'Inventory Management System',NULL,'Unit of Measurement',0,'ims/unit_of_measurement',1,'2021-05-24 13:09:23','2021-05-24 13:09:23'),(131,2,2,31,'Inventory Management System',NULL,'Service',0,'ims/service',1,'2021-05-26 05:39:58','2021-05-26 05:44:44'),(132,2,7,1,'Finance Management System',NULL,'Liquidation',3,'fms/liquidation',1,'2021-06-17 23:54:38','2021-06-17 23:54:38'),(133,2,7,1,'Finance Management System',NULL,'Petty Cash Replenishment',3,'fms/petty_cash_replenishment',1,'2021-06-18 06:08:36','2021-06-18 06:08:36'),(134,2,7,1,'Finance Management System',NULL,'Client Fund Replenishment',3,'fms/client_fund_replenishment',1,'2021-06-18 06:11:49','2021-06-18 06:11:49');
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
) ENGINE=InnoDB AUTO_INCREMENT=1485 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_roles_permission_tbl`
--

LOCK TABLES `gen_roles_permission_tbl` WRITE;
/*!40000 ALTER TABLE `gen_roles_permission_tbl` DISABLE KEYS */;
INSERT INTO `gen_roles_permission_tbl` VALUES (1,1,0,1,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(2,1,0,2,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(3,1,0,3,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(4,1,0,4,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(5,1,0,5,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(6,1,0,6,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(7,1,0,7,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(8,1,0,8,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(9,1,0,9,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(10,1,0,10,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(11,1,0,11,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(12,1,0,12,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(13,1,0,13,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(14,1,0,14,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(15,1,0,15,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(16,1,0,16,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(17,1,0,17,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(18,1,0,18,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(19,1,0,19,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(20,1,0,20,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(21,1,0,21,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(22,1,0,22,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(23,1,0,23,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(24,1,0,24,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(25,1,0,25,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(26,1,0,26,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(27,1,0,27,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(28,1,0,28,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(29,1,0,29,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(30,1,0,30,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(31,1,0,31,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(32,1,0,32,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(33,1,0,33,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(34,1,0,34,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(35,1,0,35,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(36,1,0,36,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(37,1,0,37,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(38,1,0,38,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(39,1,0,39,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(40,1,0,40,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(41,1,0,41,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(42,1,0,42,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(43,1,0,43,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(44,1,0,44,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(45,1,0,45,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(46,1,0,46,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(47,1,0,47,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(48,1,0,48,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(49,1,0,49,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(50,1,0,50,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(51,1,0,51,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(52,1,0,52,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(53,1,0,53,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(54,1,0,54,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(55,1,0,55,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(56,1,0,56,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(57,1,0,57,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(58,1,0,58,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(59,1,0,59,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(60,1,0,60,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(61,1,0,61,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(62,1,0,62,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(63,1,0,63,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(64,1,0,64,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(65,1,0,65,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(66,1,0,66,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(67,1,0,67,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(68,1,0,68,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(69,1,0,69,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(70,1,0,70,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(71,1,0,71,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(72,1,0,72,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(73,1,0,73,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(74,1,0,74,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(75,1,0,75,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(76,1,0,76,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(77,1,0,77,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(78,1,0,78,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(79,1,0,79,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(80,1,0,80,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(81,1,0,81,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(82,1,0,82,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(83,1,0,83,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(84,1,0,84,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(85,1,0,85,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(86,1,0,86,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(87,1,0,87,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(88,1,0,88,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(89,1,0,89,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(90,1,0,90,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(91,1,0,91,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(92,1,0,92,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(93,1,0,93,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(94,1,0,94,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(95,1,0,95,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(96,1,0,96,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(97,1,0,97,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(98,1,0,98,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(99,1,0,99,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(100,1,0,100,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(101,1,0,101,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(102,1,0,102,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(103,1,0,103,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(104,1,0,104,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(105,1,0,105,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(106,1,0,106,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(107,1,0,107,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(108,1,0,108,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(109,1,0,109,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(110,1,0,110,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(111,1,0,111,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(112,1,0,112,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(113,1,0,113,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(114,1,0,114,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(115,1,0,115,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(116,1,0,116,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(117,1,0,117,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(118,1,0,118,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(119,1,0,119,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(120,1,0,120,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(121,1,0,121,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(122,1,0,122,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(123,1,0,123,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(124,1,0,124,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(125,1,0,125,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(126,1,0,126,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(127,1,0,127,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(128,1,0,128,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(129,1,0,129,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(130,2,0,1,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(131,2,0,2,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(132,2,0,3,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(133,2,0,4,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(134,2,0,5,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(135,2,0,6,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(136,2,0,7,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(137,2,0,8,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(138,2,0,9,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(139,2,0,10,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(140,2,0,11,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(141,2,0,12,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(142,2,0,13,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(143,2,0,14,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(144,2,0,15,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(145,2,0,16,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(146,2,0,17,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(147,2,0,18,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(148,2,0,19,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(149,2,0,20,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(150,2,0,21,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(151,2,0,22,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(152,2,0,23,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(153,2,0,24,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(154,2,0,25,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(155,2,0,26,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(156,2,0,27,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(157,2,0,28,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(158,2,0,29,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(159,2,0,30,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(160,2,0,31,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(161,2,0,32,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(162,2,0,33,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(163,2,0,34,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(164,2,0,35,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(165,2,0,36,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(166,2,0,37,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(167,2,0,38,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(168,2,0,39,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(169,2,0,40,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(170,2,0,41,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(171,2,0,42,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(172,2,0,43,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(173,2,0,44,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(174,2,0,45,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(175,2,0,46,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(176,2,0,47,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(177,2,0,48,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(178,2,0,49,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(179,2,0,50,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(180,2,0,51,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(181,2,0,52,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(182,2,0,53,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(183,2,0,54,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(184,2,0,55,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(185,2,0,56,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(186,2,0,57,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(187,2,0,58,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(188,2,0,59,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(189,2,0,60,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(190,2,0,61,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(191,2,0,62,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(192,2,0,63,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(193,2,0,64,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(194,2,0,65,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(195,2,0,66,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(196,2,0,67,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(197,2,0,68,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(198,2,0,69,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(199,2,0,70,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(200,2,0,71,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(201,2,0,72,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(202,2,0,73,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(203,2,0,74,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(204,2,0,75,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(205,2,0,76,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(206,2,0,77,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(207,2,0,78,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(208,2,0,79,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(209,2,0,80,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(210,2,0,81,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(211,2,0,82,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(212,2,0,83,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(213,2,0,84,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(214,2,0,85,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(215,2,0,86,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(216,2,0,87,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(217,2,0,88,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(218,2,0,89,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(219,2,0,90,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(220,2,0,91,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(221,2,0,92,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(222,2,0,93,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(223,2,0,94,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(224,2,0,95,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(225,2,0,96,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(226,2,0,97,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(227,2,0,98,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(228,2,0,99,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(229,2,0,100,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(230,2,0,101,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(231,2,0,102,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(232,2,0,103,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(233,2,0,104,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(234,2,0,105,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(235,2,0,106,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(236,2,0,107,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(237,2,0,108,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(238,2,0,109,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(239,2,0,110,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(240,2,0,111,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(241,2,0,112,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(242,2,0,113,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(243,2,0,114,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(244,2,0,115,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(245,2,0,116,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(246,2,0,117,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(247,2,0,118,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(248,2,0,119,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(249,2,0,120,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(250,2,0,121,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(251,2,0,122,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(252,2,0,123,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(253,2,0,124,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(254,2,0,125,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(255,2,0,126,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(256,2,0,127,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(257,2,0,128,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(258,2,0,129,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(259,3,0,1,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(260,3,0,2,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(261,3,0,3,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(262,3,0,4,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(263,3,0,5,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(264,3,0,6,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(265,3,0,7,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(266,3,0,8,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(267,3,0,9,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(268,3,0,10,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(269,3,0,11,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(270,3,0,12,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(271,3,0,13,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(272,3,0,14,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(273,3,0,15,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(274,3,0,16,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(275,3,0,17,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(276,3,0,18,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(277,3,0,19,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(278,3,0,20,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(279,3,0,21,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(280,3,0,22,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(281,3,0,23,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(282,3,0,24,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(283,3,0,25,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(284,3,0,26,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(285,3,0,27,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(286,3,0,28,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(287,3,0,29,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(288,3,0,30,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(289,3,0,31,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(290,3,0,32,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(291,3,0,33,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(292,3,0,34,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(293,3,0,35,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(294,3,0,36,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(295,3,0,37,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(296,3,0,38,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(297,3,0,39,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(298,3,0,40,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(299,3,0,41,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(300,3,0,42,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(301,3,0,43,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(302,3,0,44,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(303,3,0,45,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(304,3,0,46,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(305,3,0,47,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(306,3,0,48,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(307,3,0,49,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(308,3,0,50,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(309,3,0,51,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(310,3,0,52,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(311,3,0,53,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(312,3,0,54,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(313,3,0,55,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(314,3,0,56,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(315,3,0,57,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(316,3,0,58,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(317,3,0,59,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(318,3,0,60,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(319,3,0,61,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(320,3,0,62,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(321,3,0,63,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(322,3,0,64,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(323,3,0,65,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(324,3,0,66,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(325,3,0,67,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(326,3,0,68,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(327,3,0,69,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(328,3,0,70,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(329,3,0,71,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(330,3,0,72,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(331,3,0,73,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(332,3,0,74,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(333,3,0,75,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(334,3,0,76,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(335,3,0,77,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(336,3,0,78,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(337,3,0,79,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(338,3,0,80,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(339,3,0,81,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(340,3,0,82,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(341,3,0,83,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(342,3,0,84,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(343,3,0,85,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(344,3,0,86,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(345,3,0,87,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(346,3,0,88,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(347,3,0,89,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(348,3,0,90,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(349,3,0,91,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(350,3,0,92,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(351,3,0,93,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(352,3,0,94,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(353,3,0,95,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(354,3,0,96,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(355,3,0,97,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(356,3,0,98,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(357,3,0,99,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(358,3,0,100,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(359,3,0,101,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(360,3,0,102,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(361,3,0,103,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(362,3,0,104,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(363,3,0,105,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(364,3,0,106,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(365,3,0,107,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(366,3,0,108,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(367,3,0,109,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(368,3,0,110,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(369,3,0,111,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(370,3,0,112,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(371,3,0,113,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(372,3,0,114,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(373,3,0,115,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(374,3,0,116,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(375,3,0,117,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(376,3,0,118,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(377,3,0,119,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(378,3,0,120,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(379,3,0,121,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(380,3,0,122,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(381,3,0,123,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(382,3,0,124,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(383,3,0,125,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(384,3,0,126,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(385,3,0,127,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(386,3,0,128,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(387,3,0,129,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(388,4,0,1,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(389,4,0,2,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(390,4,0,3,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(391,4,0,4,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(392,4,0,5,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(393,4,0,6,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(394,4,0,7,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(395,4,0,8,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(396,4,0,9,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(397,4,0,10,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(398,4,0,11,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(399,4,0,12,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(400,4,0,13,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(401,4,0,14,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(402,4,0,15,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(403,4,0,16,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(404,4,0,17,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(405,4,0,18,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(406,4,0,19,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(407,4,0,20,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(408,4,0,21,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(409,4,0,22,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(410,4,0,23,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(411,4,0,24,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(412,4,0,25,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(413,4,0,26,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(414,4,0,27,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(415,4,0,28,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(416,4,0,29,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(417,4,0,30,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(418,4,0,31,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(419,4,0,32,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(420,4,0,33,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(421,4,0,34,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(422,4,0,35,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(423,4,0,36,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(424,4,0,37,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(425,4,0,38,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(426,4,0,39,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(427,4,0,40,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(428,4,0,41,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(429,4,0,42,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(430,4,0,43,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(431,4,0,44,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(432,4,0,45,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(433,4,0,46,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(434,4,0,47,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(435,4,0,48,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(436,4,0,49,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(437,4,0,50,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(438,4,0,51,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(439,4,0,52,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(440,4,0,53,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(441,4,0,54,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(442,4,0,55,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(443,4,0,56,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(444,4,0,57,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(445,4,0,58,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(446,4,0,59,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(447,4,0,60,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(448,4,0,61,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(449,4,0,62,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(450,4,0,63,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(451,4,0,64,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(452,4,0,65,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(453,4,0,66,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(454,4,0,67,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(455,4,0,68,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(456,4,0,69,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(457,4,0,70,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(458,4,0,71,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(459,4,0,72,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(460,4,0,73,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(461,4,0,74,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(462,4,0,75,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(463,4,0,76,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(464,4,0,77,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(465,4,0,78,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(466,4,0,79,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(467,4,0,80,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(468,4,0,81,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(469,4,0,82,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(470,4,0,83,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(471,4,0,84,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(472,4,0,85,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(473,4,0,86,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(474,4,0,87,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(475,4,0,88,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(476,4,0,89,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(477,4,0,90,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(478,4,0,91,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(479,4,0,92,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(480,4,0,93,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(481,4,0,94,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(482,4,0,95,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(483,4,0,96,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(484,4,0,97,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(485,4,0,98,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(486,4,0,99,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(487,4,0,100,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(488,4,0,101,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(489,4,0,102,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(490,4,0,103,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(491,4,0,104,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(492,4,0,105,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(493,4,0,106,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(494,4,0,107,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(495,4,0,108,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(496,4,0,109,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(497,4,0,110,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(498,4,0,111,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(499,4,0,112,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(500,4,0,113,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(501,4,0,114,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(502,4,0,115,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(503,4,0,116,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(504,4,0,117,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(505,4,0,118,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(506,4,0,119,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(507,4,0,120,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(508,4,0,121,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(509,4,0,122,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(510,4,0,123,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(511,4,0,124,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(512,4,0,125,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(513,4,0,126,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(514,4,0,127,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(515,4,0,128,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(516,4,0,129,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(517,5,0,1,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(518,5,0,2,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(519,5,0,3,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(520,5,0,4,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(521,5,0,5,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(522,5,0,6,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(523,5,0,7,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(524,5,0,8,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(525,5,0,9,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(526,5,0,10,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(527,5,0,11,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(528,5,0,12,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(529,5,0,13,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(530,5,0,14,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(531,5,0,15,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(532,5,0,16,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(533,5,0,17,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(534,5,0,18,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(535,5,0,19,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(536,5,0,20,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(537,5,0,21,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(538,5,0,22,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(539,5,0,23,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(540,5,0,24,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(541,5,0,25,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(542,5,0,26,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(543,5,0,27,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(544,5,0,28,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(545,5,0,29,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(546,5,0,30,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(547,5,0,31,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(548,5,0,32,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(549,5,0,33,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(550,5,0,34,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(551,5,0,35,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(552,5,0,36,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(553,5,0,37,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(554,5,0,38,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(555,5,0,39,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(556,5,0,40,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(557,5,0,41,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(558,5,0,42,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(559,5,0,43,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(560,5,0,44,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(561,5,0,45,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(562,5,0,46,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(563,5,0,47,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(564,5,0,48,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(565,5,0,49,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(566,5,0,50,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(567,5,0,51,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(568,5,0,52,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(569,5,0,53,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(570,5,0,54,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(571,5,0,55,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(572,5,0,56,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(573,5,0,57,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(574,5,0,58,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(575,5,0,59,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(576,5,0,60,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(577,5,0,61,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(578,5,0,62,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(579,5,0,63,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(580,5,0,64,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(581,5,0,65,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(582,5,0,66,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(583,5,0,67,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(584,5,0,68,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(585,5,0,69,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(586,5,0,70,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(587,5,0,71,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(588,5,0,72,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(589,5,0,73,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(590,5,0,74,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(591,5,0,75,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(592,5,0,76,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(593,5,0,77,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(594,5,0,78,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(595,5,0,79,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(596,5,0,80,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(597,5,0,81,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(598,5,0,82,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(599,5,0,83,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(600,5,0,84,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(601,5,0,85,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(602,5,0,86,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(603,5,0,87,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(604,5,0,88,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(605,5,0,89,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(606,5,0,90,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(607,5,0,91,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(608,5,0,92,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(609,5,0,93,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(610,5,0,94,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(611,5,0,95,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(612,5,0,96,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(613,5,0,97,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(614,5,0,98,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(615,5,0,99,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(616,5,0,100,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(617,5,0,101,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(618,5,0,102,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(619,5,0,103,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(620,5,0,104,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(621,5,0,105,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(622,5,0,106,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(623,5,0,107,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(624,5,0,108,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(625,5,0,109,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(626,5,0,110,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(627,5,0,111,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(628,5,0,112,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(629,5,0,113,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(630,5,0,114,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(631,5,0,115,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(632,5,0,116,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(633,5,0,117,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(634,5,0,118,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(635,5,0,119,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(636,5,0,120,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(637,5,0,121,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(638,5,0,122,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(639,5,0,123,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(640,5,0,124,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(641,5,0,125,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(642,5,0,126,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(643,5,0,127,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(644,5,0,128,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(645,5,0,129,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(646,6,0,1,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(647,6,0,2,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(648,6,0,3,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(649,6,0,4,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(650,6,0,5,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(651,6,0,6,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(652,6,0,7,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(653,6,0,8,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(654,6,0,9,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(655,6,0,10,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(656,6,0,11,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(657,6,0,12,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(658,6,0,13,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(659,6,0,14,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(660,6,0,15,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(661,6,0,16,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(662,6,0,17,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(663,6,0,18,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(664,6,0,19,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(665,6,0,20,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(666,6,0,21,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(667,6,0,22,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(668,6,0,23,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(669,6,0,24,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(670,6,0,25,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(671,6,0,26,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(672,6,0,27,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(673,6,0,28,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(674,6,0,29,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(675,6,0,30,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(676,6,0,31,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(677,6,0,32,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(678,6,0,33,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(679,6,0,34,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(680,6,0,35,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(681,6,0,36,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(682,6,0,37,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(683,6,0,38,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(684,6,0,39,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(685,6,0,40,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(686,6,0,41,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(687,6,0,42,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(688,6,0,43,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(689,6,0,44,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(690,6,0,45,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(691,6,0,46,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(692,6,0,47,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(693,6,0,48,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(694,6,0,49,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(695,6,0,50,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(696,6,0,51,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(697,6,0,52,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(698,6,0,53,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(699,6,0,54,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(700,6,0,55,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(701,6,0,56,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(702,6,0,57,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(703,6,0,58,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(704,6,0,59,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(705,6,0,60,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(706,6,0,61,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(707,6,0,62,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(708,6,0,63,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(709,6,0,64,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(710,6,0,65,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(711,6,0,66,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(712,6,0,67,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(713,6,0,68,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(714,6,0,69,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(715,6,0,70,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(716,6,0,71,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(717,6,0,72,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(718,6,0,73,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(719,6,0,74,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(720,6,0,75,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(721,6,0,76,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(722,6,0,77,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(723,6,0,78,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(724,6,0,79,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(725,6,0,80,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(726,6,0,81,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(727,6,0,82,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(728,6,0,83,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(729,6,0,84,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(730,6,0,85,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(731,6,0,86,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(732,6,0,87,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(733,6,0,88,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(734,6,0,89,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(735,6,0,90,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(736,6,0,91,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(737,6,0,92,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(738,6,0,93,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(739,6,0,94,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(740,6,0,95,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(741,6,0,96,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(742,6,0,97,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(743,6,0,98,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(744,6,0,99,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(745,6,0,100,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(746,6,0,101,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(747,6,0,102,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(748,6,0,103,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(749,6,0,104,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(750,6,0,105,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(751,6,0,106,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(752,6,0,107,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(753,6,0,108,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(754,6,0,109,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(755,6,0,110,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(756,6,0,111,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(757,6,0,112,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(758,6,0,113,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(759,6,0,114,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(760,6,0,115,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(761,6,0,116,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(762,6,0,117,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(763,6,0,118,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(764,6,0,119,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(765,6,0,120,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(766,6,0,121,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(767,6,0,122,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(768,6,0,123,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(769,6,0,124,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(770,6,0,125,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(771,6,0,126,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(772,6,0,127,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(773,6,0,128,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(774,6,0,129,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(775,7,0,1,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(776,7,0,2,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(777,7,0,3,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(778,7,0,4,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(779,7,0,5,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(780,7,0,6,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(781,7,0,7,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(782,7,0,8,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(783,7,0,9,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(784,7,0,10,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(785,7,0,11,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(786,7,0,12,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(787,7,0,13,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(788,7,0,14,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(789,7,0,15,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(790,7,0,16,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(791,7,0,17,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(792,7,0,18,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(793,7,0,19,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(794,7,0,20,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(795,7,0,21,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(796,7,0,22,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(797,7,0,23,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(798,7,0,24,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(799,7,0,25,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(800,7,0,26,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(801,7,0,27,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(802,7,0,28,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(803,7,0,29,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(804,7,0,30,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(805,7,0,31,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(806,7,0,32,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(807,7,0,33,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(808,7,0,34,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(809,7,0,35,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(810,7,0,36,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(811,7,0,37,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(812,7,0,38,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(813,7,0,39,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(814,7,0,40,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(815,7,0,41,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(816,7,0,42,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(817,7,0,43,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(818,7,0,44,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(819,7,0,45,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(820,7,0,46,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(821,7,0,47,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(822,7,0,48,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(823,7,0,49,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(824,7,0,50,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(825,7,0,51,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(826,7,0,52,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(827,7,0,53,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(828,7,0,54,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(829,7,0,55,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(830,7,0,56,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(831,7,0,57,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(832,7,0,58,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(833,7,0,59,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(834,7,0,60,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(835,7,0,61,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(836,7,0,62,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(837,7,0,63,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(838,7,0,64,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(839,7,0,65,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(840,7,0,66,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(841,7,0,67,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(842,7,0,68,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(843,7,0,69,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(844,7,0,70,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(845,7,0,71,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(846,7,0,72,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(847,7,0,73,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(848,7,0,74,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(849,7,0,75,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(850,7,0,76,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(851,7,0,77,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(852,7,0,78,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(853,7,0,79,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(854,7,0,80,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(855,7,0,81,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(856,7,0,82,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(857,7,0,83,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(858,7,0,84,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(859,7,0,85,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(860,7,0,86,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(861,7,0,87,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(862,7,0,88,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(863,7,0,89,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(864,7,0,90,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(865,7,0,91,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(866,7,0,92,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(867,7,0,93,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(868,7,0,94,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(869,7,0,95,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(870,7,0,96,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(871,7,0,97,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(872,7,0,98,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(873,7,0,99,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(874,7,0,100,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(875,7,0,101,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(876,7,0,102,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(877,7,0,103,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(878,7,0,104,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(879,7,0,105,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(880,7,0,106,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(881,7,0,107,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(882,7,0,108,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(883,7,0,109,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(884,7,0,110,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(885,7,0,111,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(886,7,0,112,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(887,7,0,113,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(888,7,0,114,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(889,7,0,115,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(890,7,0,116,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(891,7,0,117,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(892,7,0,118,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(893,7,0,119,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(894,7,0,120,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(895,7,0,121,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(896,7,0,122,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(897,7,0,123,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(898,7,0,124,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(899,7,0,125,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(900,7,0,126,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(901,7,0,127,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(902,7,0,128,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(903,7,0,129,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(904,8,0,1,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(905,8,0,2,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(906,8,0,3,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(907,8,0,4,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(908,8,0,5,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(909,8,0,6,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(910,8,0,7,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(911,8,0,8,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(912,8,0,9,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(913,8,0,10,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(914,8,0,11,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(915,8,0,12,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(916,8,0,13,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(917,8,0,14,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(918,8,0,15,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(919,8,0,16,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(920,8,0,17,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(921,8,0,18,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(922,8,0,19,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(923,8,0,20,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(924,8,0,21,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(925,8,0,22,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(926,8,0,23,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(927,8,0,24,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(928,8,0,25,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(929,8,0,26,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(930,8,0,27,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(931,8,0,28,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(932,8,0,29,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(933,8,0,30,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(934,8,0,31,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(935,8,0,32,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(936,8,0,33,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(937,8,0,34,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(938,8,0,35,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(939,8,0,36,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(940,8,0,37,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(941,8,0,38,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(942,8,0,39,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(943,8,0,40,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(944,8,0,41,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(945,8,0,42,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(946,8,0,43,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(947,8,0,44,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(948,8,0,45,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(949,8,0,46,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(950,8,0,47,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(951,8,0,48,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(952,8,0,49,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(953,8,0,50,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(954,8,0,51,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(955,8,0,52,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(956,8,0,53,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(957,8,0,54,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(958,8,0,55,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(959,8,0,56,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(960,8,0,57,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(961,8,0,58,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(962,8,0,59,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(963,8,0,60,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(964,8,0,61,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(965,8,0,62,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(966,8,0,63,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(967,8,0,64,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(968,8,0,65,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(969,8,0,66,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(970,8,0,67,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(971,8,0,68,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(972,8,0,69,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(973,8,0,70,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(974,8,0,71,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(975,8,0,72,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(976,8,0,73,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(977,8,0,74,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(978,8,0,75,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(979,8,0,76,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(980,8,0,77,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(981,8,0,78,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(982,8,0,79,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(983,8,0,80,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(984,8,0,81,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(985,8,0,82,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(986,8,0,83,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(987,8,0,84,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(988,8,0,85,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(989,8,0,86,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(990,8,0,87,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(991,8,0,88,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(992,8,0,89,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(993,8,0,90,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(994,8,0,91,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(995,8,0,92,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(996,8,0,93,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(997,8,0,94,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(998,8,0,95,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(999,8,0,96,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1000,8,0,97,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1001,8,0,98,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1002,8,0,99,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1003,8,0,100,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1004,8,0,101,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1005,8,0,102,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1006,8,0,103,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1007,8,0,104,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1008,8,0,105,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1009,8,0,106,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1010,8,0,107,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1011,8,0,108,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1012,8,0,109,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1013,8,0,110,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1014,8,0,111,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1015,8,0,112,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1016,8,0,113,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1017,8,0,114,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1018,8,0,115,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1019,8,0,116,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1020,8,0,117,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1021,8,0,118,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1022,8,0,119,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1023,8,0,120,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1024,8,0,121,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1025,8,0,122,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1026,8,0,123,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1027,8,0,124,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1028,8,0,125,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1029,8,0,126,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1030,8,0,127,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1031,8,0,128,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1032,8,0,129,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1033,9,0,1,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1034,9,0,2,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1035,9,0,3,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1036,9,0,4,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1037,9,0,5,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1038,9,0,6,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1039,9,0,7,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1040,9,0,8,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1041,9,0,9,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1042,9,0,10,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1043,9,0,11,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1044,9,0,12,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1045,9,0,13,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1046,9,0,14,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1047,9,0,15,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1048,9,0,16,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1049,9,0,17,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1050,9,0,18,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1051,9,0,19,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1052,9,0,20,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1053,9,0,21,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1054,9,0,22,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1055,9,0,23,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1056,9,0,24,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1057,9,0,25,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1058,9,0,26,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1059,9,0,27,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1060,9,0,28,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1061,9,0,29,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1062,9,0,30,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1063,9,0,31,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1064,9,0,32,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1065,9,0,33,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1066,9,0,34,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1067,9,0,35,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1068,9,0,36,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1069,9,0,37,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1070,9,0,38,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1071,9,0,39,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1072,9,0,40,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1073,9,0,41,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1074,9,0,42,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1075,9,0,43,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1076,9,0,44,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1077,9,0,45,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1078,9,0,46,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1079,9,0,47,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1080,9,0,48,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1081,9,0,49,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1082,9,0,50,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1083,9,0,51,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1084,9,0,52,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1085,9,0,53,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1086,9,0,54,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1087,9,0,55,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1088,9,0,56,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1089,9,0,57,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1090,9,0,58,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1091,9,0,59,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1092,9,0,60,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1093,9,0,61,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1094,9,0,62,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1095,9,0,63,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1096,9,0,64,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1097,9,0,65,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1098,9,0,66,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1099,9,0,67,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1100,9,0,68,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1101,9,0,69,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1102,9,0,70,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1103,9,0,71,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1104,9,0,72,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1105,9,0,73,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1106,9,0,74,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1107,9,0,75,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1108,9,0,76,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1109,9,0,77,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1110,9,0,78,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1111,9,0,79,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1112,9,0,80,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1113,9,0,81,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1114,9,0,82,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1115,9,0,83,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1116,9,0,84,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1117,9,0,85,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1118,9,0,86,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1119,9,0,87,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1120,9,0,88,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1121,9,0,89,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1122,9,0,90,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1123,9,0,91,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1124,9,0,92,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1125,9,0,93,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1126,9,0,94,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1127,9,0,95,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1128,9,0,96,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1129,9,0,97,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1130,9,0,98,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1131,9,0,99,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1132,9,0,100,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1133,9,0,101,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1134,9,0,102,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1135,9,0,103,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1136,9,0,104,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1137,9,0,105,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1138,9,0,106,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1139,9,0,107,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1140,9,0,108,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1141,9,0,109,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1142,9,0,110,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1143,9,0,111,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1144,9,0,112,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1145,9,0,113,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1146,9,0,114,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1147,9,0,115,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1148,9,0,116,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1149,9,0,117,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1150,9,0,118,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1151,9,0,119,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1152,9,0,120,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1153,9,0,121,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1154,9,0,122,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1155,9,0,123,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1156,9,0,124,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1157,9,0,125,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1158,9,0,126,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1159,9,0,127,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1160,9,0,128,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1161,9,0,129,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1162,10,0,1,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1163,10,0,2,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1164,10,0,3,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1165,10,0,4,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1166,10,0,5,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1167,10,0,6,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1168,10,0,7,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1169,10,0,8,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1170,10,0,9,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1171,10,0,10,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1172,10,0,11,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1173,10,0,12,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1174,10,0,13,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1175,10,0,14,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1176,10,0,15,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1177,10,0,16,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1178,10,0,17,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1179,10,0,18,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1180,10,0,19,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1181,10,0,20,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1182,10,0,21,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1183,10,0,22,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1184,10,0,23,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1185,10,0,24,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1186,10,0,25,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1187,10,0,26,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1188,10,0,27,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1189,10,0,28,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1190,10,0,29,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1191,10,0,30,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1192,10,0,31,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1193,10,0,32,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1194,10,0,33,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1195,10,0,34,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1196,10,0,35,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1197,10,0,36,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1198,10,0,37,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1199,10,0,38,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1200,10,0,39,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1201,10,0,40,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1202,10,0,41,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1203,10,0,42,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1204,10,0,43,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1205,10,0,44,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1206,10,0,45,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1207,10,0,46,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1208,10,0,47,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1209,10,0,48,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1210,10,0,49,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1211,10,0,50,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1212,10,0,51,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1213,10,0,52,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1214,10,0,53,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1215,10,0,54,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1216,10,0,55,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1217,10,0,56,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1218,10,0,57,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1219,10,0,58,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1220,10,0,59,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1221,10,0,60,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1222,10,0,61,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1223,10,0,62,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1224,10,0,63,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1225,10,0,64,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1226,10,0,65,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1227,10,0,66,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1228,10,0,67,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1229,10,0,68,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1230,10,0,69,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1231,10,0,70,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1232,10,0,71,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1233,10,0,72,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1234,10,0,73,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1235,10,0,74,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1236,10,0,75,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1237,10,0,76,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1238,10,0,77,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1239,10,0,78,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1240,10,0,79,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1241,10,0,80,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1242,10,0,81,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1243,10,0,82,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1244,10,0,83,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1245,10,0,84,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1246,10,0,85,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1247,10,0,86,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1248,10,0,87,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1249,10,0,88,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1250,10,0,89,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1251,10,0,90,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1252,10,0,91,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1253,10,0,92,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1254,10,0,93,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1255,10,0,94,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1256,10,0,95,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1257,10,0,96,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1258,10,0,97,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1259,10,0,98,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1260,10,0,99,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1261,10,0,100,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1262,10,0,101,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1263,10,0,102,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1264,10,0,103,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1265,10,0,104,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1266,10,0,105,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1267,10,0,106,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1268,10,0,107,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1269,10,0,108,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1270,10,0,109,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1271,10,0,110,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1272,10,0,111,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1273,10,0,112,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1274,10,0,113,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1275,10,0,114,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1276,10,0,115,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1277,10,0,116,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1278,10,0,117,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1279,10,0,118,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1280,10,0,119,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1281,10,0,120,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1282,10,0,121,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1283,10,0,122,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1284,10,0,123,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1285,10,0,124,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1286,10,0,125,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1287,10,0,126,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1288,10,0,127,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1289,10,0,128,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1290,10,0,129,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1291,11,0,1,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1292,11,0,2,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1293,11,0,3,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1294,11,0,4,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1295,11,0,5,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1296,11,0,6,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1297,11,0,7,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1298,11,0,8,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1299,11,0,9,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1300,11,0,10,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1301,11,0,11,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1302,11,0,12,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1303,11,0,13,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1304,11,0,14,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1305,11,0,15,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1306,11,0,16,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1307,11,0,17,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1308,11,0,18,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1309,11,0,19,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1310,11,0,20,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1311,11,0,21,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1312,11,0,22,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1313,11,0,23,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1314,11,0,24,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1315,11,0,25,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1316,11,0,26,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1317,11,0,27,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1318,11,0,28,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1319,11,0,29,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1320,11,0,30,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1321,11,0,31,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1322,11,0,32,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1323,11,0,33,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1324,11,0,34,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1325,11,0,35,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1326,11,0,36,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1327,11,0,37,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1328,11,0,38,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1329,11,0,39,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1330,11,0,40,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1331,11,0,41,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1332,11,0,42,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1333,11,0,43,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1334,11,0,44,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1335,11,0,45,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1336,11,0,46,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1337,11,0,47,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1338,11,0,48,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1339,11,0,49,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1340,11,0,50,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1341,11,0,51,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1342,11,0,52,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1343,11,0,53,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1344,11,0,54,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1345,11,0,55,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1346,11,0,56,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1347,11,0,57,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1348,11,0,58,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1349,11,0,59,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1350,11,0,60,1,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1351,11,0,61,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1352,11,0,62,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1353,11,0,63,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1354,11,0,64,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1355,11,0,65,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1356,11,0,66,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1357,11,0,67,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1358,11,0,68,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1359,11,0,69,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1360,11,0,70,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1361,11,0,71,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1362,11,0,72,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1363,11,0,73,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1364,11,0,74,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1365,11,0,75,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1366,11,0,76,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1367,11,0,77,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1368,11,0,78,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1369,11,0,79,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1370,11,0,80,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1371,11,0,81,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1372,11,0,82,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1373,11,0,83,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1374,11,0,84,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1375,11,0,85,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1376,11,0,86,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1377,11,0,87,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1378,11,0,88,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1379,11,0,89,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1380,11,0,90,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1381,11,0,91,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1382,11,0,92,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1383,11,0,93,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1384,11,0,94,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1385,11,0,95,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1386,11,0,96,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1387,11,0,97,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1388,11,0,98,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1389,11,0,99,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1390,11,0,100,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1391,11,0,101,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1392,11,0,102,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1393,11,0,103,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1394,11,0,104,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1395,11,0,105,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1396,11,0,106,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1397,11,0,107,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1398,11,0,108,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1399,11,0,109,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1400,11,0,110,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1401,11,0,111,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1402,11,0,112,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1403,11,0,113,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1404,11,0,114,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1405,11,0,115,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1406,11,0,116,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1407,11,0,117,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1408,11,0,118,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1409,11,0,119,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1410,11,0,120,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1411,11,0,121,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1412,11,0,122,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1413,11,0,123,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1414,11,0,124,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1415,11,0,125,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1416,11,0,126,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1417,11,0,127,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1418,11,0,128,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1419,11,0,129,0,'2021-05-11 06:18:56','2021-05-11 06:18:56'),(1420,1,0,130,1,'2021-05-25 00:16:26','2021-05-25 00:16:26'),(1421,2,0,130,0,'2021-05-25 00:16:26','2021-05-25 00:16:26'),(1422,3,0,130,0,'2021-05-25 00:16:26','2021-05-25 00:16:26'),(1423,4,0,130,0,'2021-05-25 00:16:26','2021-05-25 00:16:26'),(1424,5,0,130,0,'2021-05-25 00:16:26','2021-05-25 00:16:26'),(1425,6,0,130,0,'2021-05-25 00:16:26','2021-05-25 00:16:26'),(1426,7,0,130,0,'2021-05-25 00:16:26','2021-05-25 00:16:26'),(1427,8,0,130,0,'2021-05-25 00:16:26','2021-05-25 00:16:26'),(1428,9,0,130,0,'2021-05-25 00:16:26','2021-05-25 00:16:26'),(1429,10,0,130,0,'2021-05-25 00:16:26','2021-05-25 00:16:26'),(1430,11,0,130,0,'2021-05-25 00:16:26','2021-05-25 00:16:26'),(1431,12,0,130,0,'2021-05-25 00:16:26','2021-05-25 00:16:26'),(1432,13,0,130,0,'2021-05-25 00:16:26','2021-05-25 00:16:26'),(1433,1,0,131,1,'2021-05-26 05:42:38','2021-05-26 05:42:38'),(1434,2,0,131,0,'2021-05-26 05:42:38','2021-05-26 05:42:38'),(1435,3,0,131,0,'2021-05-26 05:42:38','2021-05-26 05:42:38'),(1436,4,0,131,0,'2021-05-26 05:42:38','2021-05-26 05:42:38'),(1437,5,0,131,0,'2021-05-26 05:42:38','2021-05-26 05:42:38'),(1438,6,0,131,0,'2021-05-26 05:42:38','2021-05-26 05:42:38'),(1439,7,0,131,0,'2021-05-26 05:42:38','2021-05-26 05:42:38'),(1440,8,0,131,0,'2021-05-26 05:42:38','2021-05-26 05:42:38'),(1441,9,0,131,0,'2021-05-26 05:42:38','2021-05-26 05:42:38'),(1442,10,0,131,0,'2021-05-26 05:42:38','2021-05-26 05:42:38'),(1443,11,0,131,0,'2021-05-26 05:42:38','2021-05-26 05:42:38'),(1444,12,0,131,0,'2021-05-26 05:42:38','2021-05-26 05:42:38'),(1445,13,0,131,0,'2021-05-26 05:42:38','2021-05-26 05:42:38'),(1446,1,0,132,1,'2021-06-17 23:54:39','2021-06-17 23:54:39'),(1447,2,0,132,0,'2021-06-17 23:54:39','2021-06-17 23:54:39'),(1448,3,0,132,0,'2021-06-17 23:54:39','2021-06-17 23:54:39'),(1449,4,0,132,0,'2021-06-17 23:54:39','2021-06-17 23:54:39'),(1450,5,0,132,0,'2021-06-17 23:54:39','2021-06-17 23:54:39'),(1451,6,0,132,0,'2021-06-17 23:54:39','2021-06-17 23:54:39'),(1452,7,0,132,0,'2021-06-17 23:54:39','2021-06-17 23:54:39'),(1453,8,0,132,0,'2021-06-17 23:54:39','2021-06-17 23:54:39'),(1454,9,0,132,0,'2021-06-17 23:54:39','2021-06-17 23:54:39'),(1455,10,0,132,0,'2021-06-17 23:54:39','2021-06-17 23:54:39'),(1456,11,0,132,0,'2021-06-17 23:54:39','2021-06-17 23:54:39'),(1457,12,0,132,0,'2021-06-17 23:54:39','2021-06-17 23:54:39'),(1458,13,0,132,0,'2021-06-17 23:54:39','2021-06-17 23:54:39'),(1459,1,0,133,1,'2021-06-18 06:08:37','2021-06-18 06:08:37'),(1460,2,0,133,0,'2021-06-18 06:08:37','2021-06-18 06:08:37'),(1461,3,0,133,0,'2021-06-18 06:08:37','2021-06-18 06:08:37'),(1462,4,0,133,0,'2021-06-18 06:08:37','2021-06-18 06:08:37'),(1463,5,0,133,0,'2021-06-18 06:08:37','2021-06-18 06:08:37'),(1464,6,0,133,0,'2021-06-18 06:08:37','2021-06-18 06:08:37'),(1465,7,0,133,0,'2021-06-18 06:08:37','2021-06-18 06:08:37'),(1466,8,0,133,0,'2021-06-18 06:08:37','2021-06-18 06:08:37'),(1467,9,0,133,0,'2021-06-18 06:08:37','2021-06-18 06:08:37'),(1468,10,0,133,0,'2021-06-18 06:08:37','2021-06-18 06:08:37'),(1469,11,0,133,0,'2021-06-18 06:08:37','2021-06-18 06:08:37'),(1470,12,0,133,0,'2021-06-18 06:08:37','2021-06-18 06:08:37'),(1471,13,0,133,0,'2021-06-18 06:08:37','2021-06-18 06:08:37'),(1472,1,0,134,1,'2021-06-18 06:11:49','2021-06-18 06:11:49'),(1473,2,0,134,0,'2021-06-18 06:11:49','2021-06-18 06:11:49'),(1474,3,0,134,0,'2021-06-18 06:11:49','2021-06-18 06:11:49'),(1475,4,0,134,0,'2021-06-18 06:11:49','2021-06-18 06:11:49'),(1476,5,0,134,0,'2021-06-18 06:11:49','2021-06-18 06:11:49'),(1477,6,0,134,0,'2021-06-18 06:11:49','2021-06-18 06:11:49'),(1478,7,0,134,0,'2021-06-18 06:11:49','2021-06-18 06:11:49'),(1479,8,0,134,0,'2021-06-18 06:11:49','2021-06-18 06:11:49'),(1480,9,0,134,0,'2021-06-18 06:11:49','2021-06-18 06:11:49'),(1481,10,0,134,0,'2021-06-18 06:11:49','2021-06-18 06:11:49'),(1482,11,0,134,0,'2021-06-18 06:11:49','2021-06-18 06:11:49'),(1483,12,0,134,0,'2021-06-18 06:11:49','2021-06-18 06:11:49'),(1484,13,0,134,0,'2021-06-18 06:11:49','2021-06-18 06:11:49');
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
) ENGINE=InnoDB AUTO_INCREMENT=1702 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_system_notification_tbl`
--

LOCK TABLES `gen_system_notification_tbl` WRITE;
/*!40000 ALTER TABLE `gen_system_notification_tbl` DISABLE KEYS */;
INSERT INTO `gen_system_notification_tbl` VALUES (1,3,58,20,'Official Business Form','1 asked for your approval.',2,0,1,0,'2021-04-11 23:21:20','2021-04-11 23:21:20'),(2,4,58,4,'No Time-in/ Time-out','1 asked for your approval.',2,1,1,0,'2021-04-12 00:05:13','2021-05-14 02:32:49'),(3,4,60,1,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-12 00:28:04','2021-05-14 02:32:49'),(4,4,58,6,'No Time-in/ Time-out','1 asked for your approval.',2,1,1,4,'2021-04-12 00:56:06','2021-04-15 07:37:12'),(5,3,58,24,'Official Business Form','6 asked for your approval.',2,0,6,0,'2021-04-12 02:46:35','2021-04-12 02:46:35'),(6,3,58,24,'Official Business','6 asked for your approval.',2,0,1,0,'2021-04-12 02:48:34','2021-04-12 02:48:34'),(7,6,58,24,'Official Business','OBF-21-00023: Your request has been approved.',2,0,3,0,'2021-04-12 02:54:44','2021-04-12 02:54:44'),(8,3,58,25,'Official Business Form','6 asked for your approval.',2,0,6,0,'2021-04-12 02:55:51','2021-04-12 02:55:51'),(9,3,58,33,'Official Business Form','1 asked for your approval.',2,0,1,0,'2021-04-12 06:38:20','2021-04-12 06:38:20'),(10,6,58,25,'Oficial Business Form','OBF-21-00024: Your request has been denied.',2,0,1,0,'2021-04-12 06:38:47','2021-04-12 06:38:47'),(11,3,58,34,'Official Business Form','1 asked for your approval.',2,0,1,0,'2021-04-12 06:46:36','2021-04-12 06:46:36'),(12,8,60,1,'Overtime Request Form','Akosi Admin asked for your approval.',2,0,4,0,'2021-04-12 07:26:28','2021-04-12 07:26:28'),(13,4,60,5,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-12 07:33:31','2021-05-14 02:32:49'),(14,3,58,35,'Official Business Form','1 asked for your approval.',2,0,1,0,'2021-04-12 07:35:40','2021-04-12 07:35:40'),(15,4,58,9,'No Time-in/ Time-out','1 asked for your approval.',2,1,1,0,'2021-04-12 07:40:20','2021-05-14 02:32:49'),(16,4,58,12,'No Time-in/ Time-out','1 asked for your approval.',2,1,1,0,'2021-04-12 07:41:41','2021-05-14 02:32:49'),(17,4,60,6,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,4,'2021-04-12 07:42:08','2021-05-05 03:34:47'),(18,4,60,1,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-12 23:02:56','2021-05-14 02:32:49'),(19,4,60,18,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-13 00:04:56','2021-05-14 02:32:49'),(20,4,60,19,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-13 00:05:25','2021-05-14 02:32:49'),(21,4,58,13,'No Time-in/ Time-out','1 asked for your approval.',2,1,1,0,'2021-04-13 01:14:08','2021-05-14 02:32:49'),(22,4,60,22,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-13 01:48:57','2021-05-14 02:32:49'),(23,4,60,22,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-13 01:50:14','2021-05-14 02:32:49'),(24,4,60,22,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-13 01:50:37','2021-05-14 02:32:49'),(25,8,60,21,'Overtime Request Form','Akosi Admin asked for your approval.',2,0,4,0,'2021-04-13 01:53:30','2021-04-13 01:53:30'),(26,1,60,20,'Overtime Request Form','OTR-21-00005: Your request has been denied.',2,1,4,1,'2021-04-13 01:55:23','2021-04-13 23:59:48'),(27,3,58,3,'Official Business Form','1 asked for your approval.',2,0,1,0,'2021-04-13 02:07:47','2021-04-13 02:07:47'),(28,4,60,2,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-13 23:57:32','2021-05-14 02:32:49'),(29,2,60,5,'Official Business Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-14 00:26:50','2021-05-14 02:33:44'),(30,3,58,5,'Official Business','Akosi Admin asked for your approval.',2,0,2,0,'2021-04-14 00:29:37','2021-04-14 00:29:37'),(31,3,58,5,'Official Business','Akosi Admin asked for your approval.',2,0,3,0,'2021-04-14 00:30:42','2021-04-14 00:30:42'),(32,1,58,5,'Official Business','OBF-21-00005: Your request has been approved.',7,1,5,1,'2021-04-14 00:31:46','2021-04-14 00:42:11'),(33,4,60,5,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-14 01:35:51','2021-05-14 02:32:49'),(34,4,60,3,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-15 03:30:30','2021-05-14 02:32:49'),(35,6,60,3,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,4,6,'2021-04-15 03:33:04','2021-04-15 07:37:59'),(36,5,60,3,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,6,0,'2021-04-15 03:33:59','2021-04-15 03:33:59'),(37,1,60,3,'Change Schedule Form','SCH-21-00003: Your request has been denied.',1,1,5,1,'2021-04-15 03:35:39','2021-04-15 05:19:16'),(38,4,60,4,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-15 03:45:29','2021-05-14 02:32:49'),(39,4,60,5,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-15 03:55:45','2021-05-14 02:32:49'),(40,4,60,6,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-15 03:56:31','2021-05-14 02:32:49'),(41,4,60,7,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-15 03:57:44','2021-05-14 02:32:49'),(42,4,60,8,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-15 05:06:04','2021-05-14 02:32:49'),(43,6,60,6,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,4,0,'2021-04-15 07:35:34','2021-04-15 07:35:34'),(44,4,60,2,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-19 08:39:26','2021-05-14 02:32:49'),(45,1,60,13,'Change Schedule Form','Charles Verdadero asked for your approval.',2,1,4,0,'2021-04-19 08:42:45','2021-05-04 22:57:39'),(46,1,60,14,'Change Schedule Form','Charles Verdadero asked for your approval.',2,1,4,1,'2021-04-19 08:43:17','2021-04-21 00:23:47'),(47,6,60,7,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,4,0,'2021-04-19 08:44:03','2021-04-19 08:44:03'),(48,1,60,8,'Change Schedule Form','SCH-21-00008: Your request has been denied.',1,1,4,1,'2021-04-19 08:44:28','2021-04-20 01:09:02'),(49,6,60,2,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,4,0,'2021-04-19 08:44:59','2021-04-19 08:44:59'),(50,3,60,13,'Change Schedule Form','Charles Verdadero asked for your approval.',2,0,1,0,'2021-04-19 08:46:01','2021-04-19 08:46:01'),(51,4,60,14,'Change Schedule Form','SCH-21-00014: Your request has been denied.',1,1,1,0,'2021-04-19 08:46:19','2021-05-14 02:32:49'),(52,4,60,6,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-19 08:49:50','2021-05-14 02:32:49'),(53,4,60,15,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-19 09:55:39','2021-05-14 02:32:49'),(54,2,60,9,'Official Business Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-21 00:42:41','2021-05-14 02:33:44'),(55,2,57,8,'No Time-in/Time-out','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-21 00:53:56','2021-05-14 02:33:44'),(56,2,57,9,'No Time-in/Time-out','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-21 00:56:42','2021-05-14 02:33:44'),(57,2,57,10,'No Time-in/Time-out','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-21 00:57:33','2021-05-14 02:33:44'),(58,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-21 07:47:02','2021-05-14 02:32:49'),(59,2,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-04-21 07:52:17','2021-05-14 02:33:44'),(60,7,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-04-21 07:53:47','2021-04-21 07:53:47'),(61,1,46,4,'Purchase Request','PR-21-00004: Your request has been approved.',7,1,7,0,'2021-04-21 07:55:42','2021-05-04 22:57:39'),(62,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-21 08:01:46','2021-05-14 02:32:49'),(63,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-22 00:55:18','2021-05-14 02:32:49'),(64,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-22 01:07:13','2021-05-14 02:32:49'),(65,4,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-22 01:13:35','2021-05-14 02:32:49'),(66,4,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-22 02:06:14','2021-05-14 02:32:49'),(67,6,46,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-04-22 02:14:48','2021-04-22 02:14:48'),(68,3,46,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,6,0,'2021-04-22 03:41:16','2021-04-22 03:41:16'),(69,1,46,2,'Cost Estimate','CEF-21-00002: Your request has been approved.',7,1,3,1,'2021-04-22 03:47:47','2021-04-22 03:49:19'),(70,1,46,9,'Purchase Request','PR-21-00009: Your request has been denied.',1,1,4,0,'2021-04-22 03:52:05','2021-05-04 22:57:39'),(71,4,46,11,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-22 03:55:25','2021-05-14 02:32:49'),(72,2,46,11,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-04-22 05:09:20','2021-05-14 02:33:44'),(73,2,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-04-22 06:05:48','2021-05-14 02:33:44'),(74,6,46,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-04-22 06:15:21','2021-04-22 06:15:21'),(75,2,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-04-22 06:41:13','2021-05-14 02:33:44'),(76,1,46,3,'Cost Estimate','CEF-21-00003: Your request has been denied.',1,1,6,1,'2021-04-22 06:51:42','2021-04-28 01:38:12'),(77,4,46,12,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-23 03:37:17','2021-05-14 02:32:49'),(78,6,46,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-04-28 06:19:52','2021-04-28 06:19:52'),(79,4,46,16,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-29 02:42:03','2021-05-14 02:32:49'),(80,2,37,16,'Transfer Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-30 00:56:04','2021-05-14 02:33:44'),(81,4,60,12,'Leave Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-30 01:52:48','2021-05-14 02:32:49'),(82,4,60,11,'Leave Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-30 01:53:51','2021-05-14 02:32:49'),(83,4,60,13,'Leave Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-30 02:14:18','2021-05-14 02:32:49'),(84,4,46,18,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-30 04:49:04','2021-05-14 02:32:49'),(85,4,46,19,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-30 04:49:59','2021-05-14 02:32:49'),(86,4,46,20,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-30 04:50:52','2021-05-14 02:32:49'),(87,6,46,7,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-02 11:50:48','2021-05-02 11:50:48'),(88,4,46,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-02 12:03:15','2021-05-14 02:32:49'),(89,4,46,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-02 12:04:05','2021-05-14 02:32:49'),(90,4,46,10,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-02 12:04:52','2021-05-14 02:32:49'),(91,5,46,8,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-02 12:05:35','2021-05-02 12:05:35'),(92,5,46,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-02 12:05:47','2021-05-02 12:05:47'),(93,5,46,10,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-02 12:06:00','2021-05-02 12:06:00'),(94,2,46,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-02 12:08:47','2021-05-14 02:33:44'),(95,2,46,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-02 12:08:59','2021-05-14 02:33:44'),(96,2,46,10,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-02 12:09:10','2021-05-14 02:33:44'),(97,1,46,8,'Cost Estimate','CEF-21-00008: Your request has been approved.',7,1,2,0,'2021-05-02 12:10:04','2021-05-04 22:57:39'),(98,1,46,10,'Cost Estimate','CEF-21-00010: Your request has been approved.',7,1,2,0,'2021-05-02 12:10:18','2021-05-04 22:57:39'),(99,1,46,9,'Cost Estimate','CEF-21-00009: Your request has been approved.',7,1,2,0,'2021-05-02 12:10:35','2021-05-04 22:57:39'),(100,4,46,11,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-02 12:40:13','2021-05-14 02:32:49'),(101,5,46,11,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-02 12:43:15','2021-05-02 12:43:15'),(102,2,46,11,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-02 12:44:07','2021-05-14 02:33:44'),(103,4,46,4,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-02 12:47:17','2021-05-14 02:32:49'),(104,4,46,3,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-02 12:49:10','2021-05-14 02:32:49'),(105,5,46,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-02 12:49:58','2021-05-02 12:49:58'),(106,5,46,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-02 12:50:41','2021-05-02 12:50:41'),(107,1,46,3,'Inventory Validation','IVR-21-00003: Your request has been approved.',7,1,5,0,'2021-05-02 12:52:03','2021-05-04 22:57:39'),(108,1,46,4,'Inventory Validation','IVR-21-00004: Your request has been approved.',7,1,5,0,'2021-05-02 12:52:30','2021-05-04 22:57:39'),(109,1,46,11,'Cost Estimate','CEF-21-00011: Your request has been approved.',7,1,2,0,'2021-05-02 12:53:33','2021-05-04 22:57:39'),(110,1,46,5,'Inventory Validation','IVR-21-00005: Your request has been denied.',1,1,2,0,'2021-05-02 13:07:26','2021-05-04 22:57:39'),(111,3,35,2,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-03 05:20:21','2021-05-03 05:20:21'),(112,2,59,1,'Loan Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-03 06:18:46','2021-05-14 02:33:44'),(113,4,46,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-03 06:27:26','2021-05-14 02:32:49'),(114,4,46,6,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-03 06:38:12','2021-05-14 02:32:49'),(115,4,46,7,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-03 06:40:13','2021-05-14 02:32:49'),(116,4,46,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-03 06:47:55','2021-05-14 02:32:49'),(117,5,46,8,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-03 06:49:27','2021-05-03 06:49:27'),(118,5,46,7,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-03 06:49:43','2021-05-03 06:49:43'),(119,5,46,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-03 06:50:00','2021-05-03 06:50:00'),(120,5,46,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-03 06:50:16','2021-05-03 06:50:16'),(121,1,46,4,'Cost Estimate','CEF-21-00004: Your request has been denied.',1,1,4,0,'2021-05-03 06:51:19','2021-05-04 22:57:39'),(122,1,46,3,'Cost Estimate','CEF-21-00003: Your request has been denied.',1,1,4,1,'2021-05-03 06:51:45','2021-05-04 22:55:59'),(123,5,46,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-03 06:52:02','2021-05-03 06:52:02'),(124,1,46,1,'Cost Estimate','CEF-21-00001: Your request has been denied.',1,1,4,1,'2021-05-03 06:52:24','2021-05-04 22:55:36'),(125,2,46,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-03 07:03:44','2021-05-14 02:33:44'),(126,2,46,7,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-03 07:04:16','2021-05-14 02:33:44'),(127,2,46,6,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-03 07:04:46','2021-05-14 02:33:44'),(128,2,46,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-03 07:05:00','2021-05-14 02:33:44'),(129,2,46,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-03 07:05:22','2021-05-14 02:33:44'),(130,1,46,8,'Cost Estimate','CEF-21-00008: Your request has been approved.',7,1,2,1,'2021-05-03 07:08:33','2021-05-04 22:56:14'),(131,1,46,7,'Cost Estimate','CEF-21-00007: Your request has been approved.',7,1,2,0,'2021-05-03 07:09:00','2021-05-04 22:57:39'),(132,1,46,6,'Cost Estimate','CEF-21-00006: Your request has been approved.',7,1,2,1,'2021-05-03 07:09:20','2021-05-04 22:55:23'),(133,1,46,5,'Cost Estimate','CEF-21-00005: Your request has been approved.',7,1,2,0,'2021-05-03 07:09:34','2021-05-04 22:57:39'),(134,5,44,1,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-04 00:58:10','2021-05-04 00:58:10'),(135,5,44,2,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-04 00:58:40','2021-05-04 00:58:40'),(136,5,44,3,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-04 00:59:12','2021-05-04 00:59:12'),(137,3,35,8,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-04 05:39:48','2021-05-04 05:39:48'),(138,3,35,7,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-04 05:55:22','2021-05-04 05:55:22'),(139,5,44,5,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-04 06:56:14','2021-05-04 06:56:14'),(140,4,42,4,'Material Withdrawal','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-04 06:58:23','2021-05-14 02:32:49'),(141,4,42,5,'Material Withdrawal','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-04 06:58:47','2021-05-14 02:32:49'),(142,4,42,6,'Material Withdrawal','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-04 06:59:11','2021-05-14 02:32:49'),(143,5,44,6,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-04 07:29:17','2021-05-04 07:29:17'),(144,4,42,8,'Material Withdrawal','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-04 07:32:30','2021-05-14 02:32:49'),(145,3,59,1,'Loan Form','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-04 07:36:22','2021-05-04 07:36:22'),(146,4,59,1,'Loan Form','Akosi Admin asked for your approval.',2,1,3,0,'2021-05-04 07:40:58','2021-05-14 02:32:49'),(147,1,59,1,'Loan Form','LNF-21-00001: Your request has been approved.',7,1,4,1,'2021-05-04 07:41:38','2021-05-04 22:57:27'),(148,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-04 07:49:59','2021-05-14 02:32:49'),(149,2,35,1,'Return Item','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-04 23:26:43','2021-05-14 02:33:44'),(150,2,35,3,'Return Item','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-04 23:27:30','2021-05-14 02:33:44'),(151,2,35,10,'Return Item','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-04 23:28:12','2021-05-14 02:33:44'),(152,2,35,9,'Return Item','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 02:00:34','2021-05-14 02:33:44'),(153,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 03:33:40','2021-05-14 02:32:49'),(154,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been denied.',1,1,4,0,'2021-05-05 03:34:31','2021-05-10 01:12:29'),(155,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 03:46:06','2021-05-14 02:32:49'),(156,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 03:46:35','2021-05-14 02:32:49'),(157,5,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 05:09:53','2021-05-05 05:09:53'),(158,5,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 05:10:22','2021-05-05 05:10:22'),(159,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-05 05:12:54','2021-05-14 02:33:44'),(160,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been denied.',1,1,5,0,'2021-05-05 05:13:26','2021-05-10 01:12:29'),(161,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been approved.',7,1,2,0,'2021-05-05 05:14:14','2021-05-10 01:12:29'),(162,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 05:27:37','2021-05-14 02:32:49'),(163,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 06:04:10','2021-05-14 02:32:49'),(164,5,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 06:05:28','2021-05-05 06:05:28'),(165,5,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 06:07:01','2021-05-05 06:07:01'),(166,6,38,1,'Cost Estimate','Charles Verdadero asked for your approval.',2,0,4,0,'2021-05-05 06:20:36','2021-05-05 06:20:36'),(167,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 06:23:02','2021-05-14 02:32:49'),(168,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 06:24:24','2021-05-14 02:32:49'),(169,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 06:26:36','2021-05-14 02:32:49'),(170,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 06:32:44','2021-05-14 02:32:49'),(171,4,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 06:40:35','2021-05-14 02:32:49'),(172,5,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 06:41:55','2021-05-05 06:41:55'),(173,5,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 06:45:34','2021-05-05 06:45:34'),(174,5,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 06:46:05','2021-05-05 06:46:05'),(175,5,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 06:46:21','2021-05-05 06:46:21'),(176,5,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 06:46:35','2021-05-05 06:46:35'),(177,2,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-05 06:47:33','2021-05-14 02:33:44'),(178,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-05 06:47:45','2021-05-14 02:33:44'),(179,2,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-05 06:48:14','2021-05-14 02:33:44'),(180,2,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-05 06:48:32','2021-05-14 02:33:44'),(181,2,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-05 06:48:56','2021-05-14 02:33:44'),(182,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been approved.',7,1,2,0,'2021-05-05 06:49:52','2021-05-10 01:12:29'),(183,1,38,4,'Cost Estimate','CEF-21-00004: Your request has been approved.',7,1,2,0,'2021-05-05 06:50:08','2021-05-10 01:12:29'),(184,1,38,6,'Cost Estimate','CEF-21-00006: Your request has been approved.',7,1,2,0,'2021-05-05 06:53:48','2021-05-10 01:12:29'),(185,1,38,5,'Cost Estimate','CEF-21-00005: Your request has been approved.',7,1,2,0,'2021-05-05 06:54:03','2021-05-10 01:12:29'),(186,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been approved.',7,1,2,0,'2021-05-05 06:54:44','2021-05-10 01:12:29'),(187,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 07:45:37','2021-05-14 02:32:49'),(188,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 07:46:38','2021-05-14 02:32:49'),(189,5,44,7,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-05 07:52:52','2021-05-05 07:52:52'),(190,5,44,10,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-05 07:55:20','2021-05-05 07:55:20'),(191,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 23:28:13','2021-05-14 02:33:44'),(192,2,36,1,'Item Disposal','Akosi Admin asked for your approval.',2,1,1,2,'2021-05-06 00:03:11','2021-05-06 00:05:25'),(193,3,36,2,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-06 00:04:38','2021-05-06 00:04:38'),(194,3,36,1,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-06 00:05:17','2021-05-06 00:05:17'),(195,2,36,3,'Item Disposal','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 00:23:00','2021-05-14 02:33:44'),(196,1,36,3,'Disposal Item','ADF-21-00003: Your request has been denied.',1,1,2,0,'2021-05-06 00:29:55','2021-05-10 01:12:29'),(197,2,36,4,'Item Disposal','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 00:39:27','2021-05-14 02:33:44'),(198,4,38,7,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 00:43:55','2021-05-14 02:32:49'),(199,1,38,7,'Cost Estimate','CEF-21-00007: Your request has been denied.',1,1,4,0,'2021-05-06 00:47:42','2021-05-10 01:12:29'),(200,4,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 00:49:44','2021-05-14 02:32:49'),(201,1,37,1,'Transfer Request','TR-21-00001: Your request has been denied.',1,1,2,0,'2021-05-06 00:53:16','2021-05-10 01:12:29'),(202,1,36,4,'Disposal Item','ADF-21-00004: Your request has been denied.',1,1,2,0,'2021-05-06 01:42:41','2021-05-10 01:12:29'),(203,4,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 05:09:15','2021-05-14 02:32:49'),(204,4,38,10,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 06:03:13','2021-05-14 02:32:49'),(205,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 06:22:34','2021-05-14 02:32:49'),(206,4,38,14,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 06:47:13','2021-05-14 02:32:49'),(207,1,38,14,'Cost Estimate','CEF-21-00014: Your request has been denied.',1,1,4,0,'2021-05-06 06:48:06','2021-05-10 01:12:29'),(208,1,38,10,'Cost Estimate','CEF-21-00010: Your request has been denied.',1,1,4,0,'2021-05-06 06:48:27','2021-05-10 01:12:29'),(209,1,126,2,'Inventory Validation','IVR-21-00002: Your request has been denied.',1,1,2,0,'2021-05-06 06:56:06','2021-05-10 01:12:29'),(210,4,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 11:34:51','2021-05-14 02:32:49'),(211,5,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-06 11:36:02','2021-05-06 11:36:02'),(212,2,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-06 11:37:36','2021-05-14 02:33:44'),(213,1,38,18,'Cost Estimate','CEF-21-00018: Your request has been approved.',7,1,2,0,'2021-05-06 11:38:30','2021-05-10 01:12:29'),(214,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 11:42:32','2021-05-14 02:32:49'),(215,2,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-06 11:43:44','2021-05-14 02:33:44'),(216,7,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-06 11:44:29','2021-05-06 11:44:29'),(217,1,46,4,'Purchase Request','PR-21-00004: Your request has been approved.',7,1,7,0,'2021-05-06 11:45:37','2021-05-10 01:12:29'),(218,4,38,19,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 22:33:18','2021-05-14 02:32:49'),(219,4,38,20,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 22:34:26','2021-05-14 02:32:49'),(220,4,38,21,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 22:37:14','2021-05-14 02:32:49'),(221,1,38,8,'Cost Estimate','CEF-21-00008: Your request has been denied.',1,1,4,0,'2021-05-06 22:38:23','2021-05-10 01:12:29'),(222,5,38,19,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-06 22:38:40','2021-05-06 22:38:40'),(223,5,38,20,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-06 22:39:05','2021-05-06 22:39:05'),(224,5,38,21,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-06 22:39:21','2021-05-06 22:39:21'),(225,1,38,9,'Cost Estimate','CEF-21-00009: Your request has been denied.',1,1,4,0,'2021-05-06 22:39:53','2021-05-10 01:12:29'),(226,2,38,19,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-06 22:40:57','2021-05-14 02:33:44'),(227,2,38,20,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-06 22:41:10','2021-05-14 02:33:44'),(228,2,38,21,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-06 22:41:29','2021-05-14 02:33:44'),(229,1,38,19,'Cost Estimate','CEF-21-00019: Your request has been approved.',7,1,2,0,'2021-05-06 22:45:29','2021-05-10 01:12:29'),(230,1,38,20,'Cost Estimate','CEF-21-00020: Your request has been approved.',7,1,2,0,'2021-05-06 22:45:50','2021-05-10 01:12:29'),(231,1,38,21,'Cost Estimate','CEF-21-00021: Your request has been approved.',7,1,2,0,'2021-05-06 22:46:04','2021-05-10 01:12:29'),(232,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 22:51:31','2021-05-14 02:32:49'),(233,4,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-06 22:59:58','2021-05-14 02:32:49'),(234,5,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-06 23:00:44','2021-05-06 23:00:44'),(235,1,126,3,'Inventory Validation','IVR-21-00003: Your request has been approved.',7,1,5,0,'2021-05-06 23:05:04','2021-05-10 01:12:29'),(236,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 00:55:37','2021-05-14 02:32:49'),(237,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 01:07:37','2021-05-14 02:32:49'),(238,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 01:09:31','2021-05-14 02:32:49'),(239,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 01:12:45','2021-05-14 02:32:49'),(240,5,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-07 01:14:08','2021-05-07 01:14:08'),(241,5,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-07 01:14:24','2021-05-07 01:14:24'),(242,5,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-07 01:14:37','2021-05-07 01:14:37'),(243,5,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-07 01:14:51','2021-05-07 01:14:51'),(244,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-07 01:15:37','2021-05-14 02:33:44'),(245,2,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-07 01:15:57','2021-05-14 02:33:44'),(246,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-07 01:16:14','2021-05-14 02:33:44'),(247,2,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-07 01:16:36','2021-05-14 02:33:44'),(248,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,1,2,0,'2021-05-07 01:19:10','2021-05-10 01:12:29'),(249,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been approved.',7,1,2,0,'2021-05-07 01:19:35','2021-05-10 01:12:29'),(250,1,38,4,'Cost Estimate','CEF-21-00004: Your request has been approved.',7,1,2,0,'2021-05-07 01:19:53','2021-05-10 01:12:29'),(251,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been approved.',7,1,2,0,'2021-05-07 01:20:48','2021-05-10 01:12:29'),(252,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 01:56:49','2021-05-14 02:32:49'),(253,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 02:25:02','2021-05-14 02:32:49'),(254,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 02:27:45','2021-05-14 02:32:49'),(255,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 02:29:23','2021-05-14 02:32:49'),(256,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 02:38:13','2021-05-14 02:32:49'),(257,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 02:39:12','2021-05-14 02:32:49'),(258,1,38,5,'Cost Estimate','CEF-21-00005: Your request has been denied.',1,1,4,0,'2021-05-07 03:05:26','2021-05-10 01:12:29'),(259,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 03:21:49','2021-05-14 02:32:49'),(260,4,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-07 03:48:35','2021-05-14 02:32:49'),(261,4,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-07 03:50:42','2021-05-14 02:32:49'),(262,1,126,6,'Inventory Validation','IVR-21-00006: Your request has been denied.',1,1,2,0,'2021-05-07 03:52:46','2021-05-10 01:12:29'),(263,4,126,8,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-07 03:53:15','2021-05-14 02:32:49'),(264,1,126,7,'Inventory Validation','IVR-21-00007: Your request has been denied.',1,1,2,0,'2021-05-07 03:54:37','2021-05-10 01:12:29'),(265,1,126,4,'Inventory Validation','IVR-21-00004: Your request has been denied.',1,1,4,0,'2021-05-07 03:58:24','2021-05-10 01:12:29'),(266,5,126,8,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-07 03:59:52','2021-05-07 03:59:52'),(267,5,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-07 04:02:08','2021-05-07 04:02:08'),(268,4,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 04:43:55','2021-05-14 02:32:49'),(269,4,38,7,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 04:46:54','2021-05-14 02:32:49'),(270,1,46,2,'Purchase Request','PR-21-00002: Your request has been denied.',1,1,4,0,'2021-05-07 05:32:13','2021-05-10 01:12:29'),(271,2,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-07 05:32:34','2021-05-14 02:33:44'),(272,2,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-07 05:32:52','2021-05-14 02:33:44'),(273,1,46,5,'Purchase Request','PR-21-00005: Your request has been denied.',1,1,4,0,'2021-05-07 05:33:15','2021-05-10 01:12:29'),(274,2,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-07 05:33:44','2021-05-14 02:33:44'),(275,2,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-07 05:34:10','2021-05-14 02:33:44'),(276,4,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 05:55:00','2021-05-14 02:32:49'),(277,4,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 05:55:54','2021-05-14 02:32:49'),(278,5,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-07 05:58:26','2021-05-07 05:58:26'),(279,5,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-07 06:01:14','2021-05-07 06:01:14'),(280,2,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-07 06:02:03','2021-05-14 02:33:44'),(281,2,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-07 06:02:19','2021-05-14 02:33:44'),(282,1,38,8,'Cost Estimate','CEF-21-00008: Your request has been approved.',7,1,2,0,'2021-05-07 06:03:06','2021-05-10 01:12:29'),(283,1,38,9,'Cost Estimate','CEF-21-00009: Your request has been approved.',7,1,2,0,'2021-05-07 06:03:19','2021-05-10 01:12:29'),(284,4,46,12,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 06:31:29','2021-05-14 02:32:49'),(285,4,38,10,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 06:32:14','2021-05-14 02:32:49'),(286,4,46,13,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 07:14:28','2021-05-14 02:32:49'),(287,1,126,5,'Inventory Validation','IVR-21-00005: Your request has been approved.',7,1,5,0,'2021-05-07 07:47:46','2021-05-10 01:12:29'),(288,1,126,8,'Inventory Validation','IVR-21-00008: Your request has been approved.',7,1,5,0,'2021-05-07 07:48:09','2021-05-10 01:12:29'),(289,4,46,14,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 03:05:07','2021-05-14 02:32:49'),(290,2,49,4,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 03:19:35','2021-05-14 02:33:44'),(291,2,49,5,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 03:23:34','2021-05-14 02:33:44'),(292,4,49,4,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-08 03:26:50','2021-05-14 02:32:49'),(293,4,49,5,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-08 03:27:30','2021-05-14 02:32:49'),(294,5,49,4,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-08 03:31:31','2021-05-08 03:31:31'),(295,1,49,5,'Service Requisition','SR-21-00005: Your request has been denied.',1,1,4,0,'2021-05-08 03:31:59','2021-05-10 01:12:29'),(296,1,49,4,'Service Requisition','SR-21-00004: Your request has been approved.',7,1,5,0,'2021-05-08 03:32:56','2021-05-10 01:12:29'),(297,2,49,6,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 03:37:32','2021-05-14 02:33:44'),(298,1,49,6,'Service Requisition','SR-21-00006: Your request has been denied.',1,1,2,0,'2021-05-08 03:38:53','2021-05-10 01:12:29'),(299,2,49,8,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 03:46:36','2021-05-14 02:33:44'),(300,2,49,7,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 03:46:49','2021-05-14 02:33:44'),(301,4,46,11,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 03:47:44','2021-05-14 02:32:49'),(302,2,41,4,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 08:42:05','2021-05-14 02:33:44'),(303,4,41,4,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-08 08:43:18','2021-05-14 02:32:49'),(304,1,41,4,'Service Order','P0-21-00004: Your request has been denied.',1,1,4,0,'2021-05-08 08:44:23','2021-05-10 01:12:29'),(305,2,41,5,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 08:45:58','2021-05-14 02:33:44'),(306,2,49,11,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 08:57:30','2021-05-14 02:33:44'),(307,2,49,12,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 08:58:01','2021-05-14 02:33:44'),(308,2,49,14,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-09 22:56:41','2021-05-14 02:33:44'),(309,4,46,15,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-09 23:02:13','2021-05-14 02:32:49'),(310,4,46,16,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-09 23:04:50','2021-05-14 02:32:49'),(311,2,49,15,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-09 23:09:43','2021-05-14 02:33:44'),(312,4,49,8,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-09 23:19:07','2021-05-14 02:32:49'),(313,4,49,7,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-09 23:19:43','2021-05-14 02:32:49'),(314,4,49,11,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-09 23:20:23','2021-05-14 02:32:49'),(315,4,49,12,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-09 23:20:42','2021-05-14 02:32:49'),(316,4,49,14,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-09 23:21:02','2021-05-14 02:32:49'),(317,4,49,15,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-09 23:21:20','2021-05-14 02:32:49'),(318,5,49,8,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-09 23:22:26','2021-05-09 23:22:26'),(319,5,49,7,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-09 23:22:41','2021-05-09 23:22:41'),(320,5,49,11,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-09 23:22:55','2021-05-09 23:22:55'),(321,5,49,12,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-09 23:23:39','2021-05-09 23:23:39'),(322,5,49,14,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-09 23:25:59','2021-05-09 23:25:59'),(323,5,49,15,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-09 23:26:10','2021-05-09 23:26:10'),(324,1,49,8,'Service Requisition','SR-21-00008: Your request has been approved.',7,1,5,0,'2021-05-09 23:26:51','2021-05-10 01:12:29'),(325,1,49,7,'Service Requisition','SR-21-00007: Your request has been approved.',7,1,5,0,'2021-05-09 23:28:03','2021-05-10 01:12:29'),(326,1,49,11,'Service Requisition','SR-21-00011: Your request has been approved.',7,1,5,0,'2021-05-09 23:28:14','2021-05-10 01:12:29'),(327,1,49,12,'Service Requisition','SR-21-00012: Your request has been approved.',7,1,5,0,'2021-05-09 23:28:24','2021-05-10 01:12:29'),(328,1,49,14,'Service Requisition','SR-21-00014: Your request has been approved.',7,1,5,0,'2021-05-09 23:28:35','2021-05-10 01:12:29'),(329,1,49,15,'Service Requisition','SR-21-00015: Your request has been approved.',7,1,5,0,'2021-05-09 23:28:47','2021-05-10 01:12:29'),(330,2,49,17,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-09 23:49:24','2021-05-14 02:33:44'),(331,4,49,17,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-09 23:53:58','2021-05-14 02:32:49'),(332,5,49,17,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-09 23:54:40','2021-05-09 23:54:40'),(333,1,49,17,'Service Requisition','SR-21-00017: Your request has been approved.',7,1,5,0,'2021-05-09 23:56:53','2021-05-10 01:12:29'),(334,2,41,7,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-09 23:59:29','2021-05-14 02:33:44'),(335,2,41,6,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 00:00:31','2021-05-14 02:33:44'),(336,4,41,5,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 00:15:12','2021-05-14 02:32:49'),(337,4,41,7,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 00:18:27','2021-05-14 02:32:49'),(338,4,41,6,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 00:18:47','2021-05-14 02:32:49'),(339,5,41,5,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 00:19:50','2021-05-10 00:19:50'),(340,5,41,7,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 00:20:11','2021-05-10 00:20:11'),(341,5,41,6,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 00:20:26','2021-05-10 00:20:26'),(342,1,41,5,'Service Order','P0-21-00005: Your request has been approved.',7,1,5,0,'2021-05-10 00:24:41','2021-05-10 01:12:29'),(343,1,41,7,'Service Order','P0-21-00007: Your request has been approved.',7,1,5,0,'2021-05-10 00:25:24','2021-05-10 01:12:29'),(344,2,49,13,'Service Requisition','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-10 00:25:28','2021-05-14 02:33:44'),(345,1,41,6,'Service Order','P0-21-00006: Your request has been denied.',1,1,5,0,'2021-05-10 00:26:13','2021-05-10 01:12:29'),(346,2,49,18,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 00:35:39','2021-05-14 02:33:44'),(347,4,49,18,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,4,'2021-05-10 00:37:35','2021-05-10 01:14:42'),(348,5,49,18,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 00:38:28','2021-05-10 00:38:28'),(349,1,49,18,'Service Requisition','SR-21-00018: Your request has been approved.',7,1,5,0,'2021-05-10 00:39:31','2021-05-10 01:12:29'),(350,2,41,8,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 00:45:34','2021-05-14 02:33:44'),(351,4,41,8,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 00:47:13','2021-05-14 02:32:49'),(352,1,41,8,'Service Order','P0-21-00008: Your request has been denied.',1,1,4,1,'2021-05-10 00:51:41','2021-05-10 01:12:14'),(353,2,41,9,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 00:52:55','2021-05-14 02:33:44'),(354,4,38,16,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,4,'2021-05-10 01:04:34','2021-05-10 01:14:08'),(355,5,38,16,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 01:08:15','2021-05-10 01:08:15'),(356,2,38,16,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-10 01:10:47','2021-05-14 02:33:44'),(357,1,38,16,'Cost Estimate','CEF-21-00016: Your request has been approved.',7,1,2,0,'2021-05-10 01:12:05','2021-05-10 01:12:29'),(358,2,41,10,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 01:39:15','2021-05-14 02:33:44'),(359,4,46,21,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,4,'2021-05-10 01:51:57','2021-05-10 01:57:20'),(360,2,46,21,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,2,'2021-05-10 01:57:40','2021-05-10 02:03:41'),(361,7,46,21,'Purchase Request','Akosi Admin asked for your approval.',2,1,2,7,'2021-05-10 02:03:59','2021-05-10 02:04:23'),(362,1,46,21,'Purchase Request','PR-21-00021: Your request has been approved.',7,1,7,1,'2021-05-10 02:04:40','2021-05-10 02:05:39'),(363,4,126,10,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 02:48:15','2021-05-14 02:32:49'),(364,4,126,12,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 02:48:46','2021-05-14 02:32:49'),(365,5,126,10,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 02:49:32','2021-05-10 02:49:32'),(366,5,126,12,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 02:49:51','2021-05-10 02:49:51'),(367,1,126,10,'Inventory Validation','IVR-21-00010: Your request has been approved.',7,1,5,0,'2021-05-10 02:50:41','2021-05-12 05:51:30'),(368,1,126,12,'Inventory Validation','IVR-21-00012: Your request has been approved.',7,1,5,0,'2021-05-10 02:50:59','2021-05-12 05:51:30'),(369,2,49,19,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 02:56:39','2021-05-14 02:33:44'),(370,4,49,13,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 02:57:26','2021-05-14 02:32:49'),(371,4,49,19,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 02:58:11','2021-05-14 02:32:49'),(372,5,49,19,'Service Requisition','Akosi Admin asked for your approval.',2,1,4,5,'2021-05-10 02:58:54','2021-05-10 02:59:15'),(373,1,49,19,'Service Requisition','SR-21-00019: Your request has been approved.',7,1,5,0,'2021-05-10 02:59:25','2021-05-12 05:51:30'),(374,2,41,11,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 03:07:46','2021-05-14 02:33:44'),(375,4,41,11,'Service Order','Akosi Admin asked for your approval.',2,1,2,4,'2021-05-10 03:08:56','2021-05-10 03:09:14'),(376,5,41,11,'Service Order','Akosi Admin asked for your approval.',2,1,4,5,'2021-05-10 03:09:26','2021-05-10 03:09:42'),(377,1,41,11,'Service Order','P0-21-00011: Your request has been approved.',7,1,5,0,'2021-05-10 03:09:56','2021-05-12 05:51:30'),(378,4,38,17,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 03:16:33','2021-05-14 02:32:49'),(379,5,38,17,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 03:19:51','2021-05-10 03:19:51'),(380,2,38,17,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-10 03:20:49','2021-05-14 02:33:44'),(381,1,38,17,'Cost Estimate','CEF-21-00017: Your request has been approved.',7,1,2,0,'2021-05-10 03:21:44','2021-05-12 05:51:30'),(382,1,126,13,'Inventory Validation','IVR-21-00013: Your request has been denied.',1,1,2,0,'2021-05-10 03:37:56','2021-05-12 05:51:30'),(383,4,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 05:09:45','2021-05-14 02:32:49'),(384,5,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 05:13:14','2021-05-10 05:13:14'),(385,2,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-10 05:14:57','2021-05-14 02:33:44'),(386,2,49,20,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 05:32:21','2021-05-14 02:33:44'),(387,4,49,20,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 05:35:28','2021-05-14 02:32:49'),(388,5,49,13,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 05:37:43','2021-05-10 05:37:43'),(389,5,49,20,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 05:39:10','2021-05-10 05:39:10'),(390,1,49,13,'Service Requisition','SR-21-00013: Your request has been approved.',7,1,5,0,'2021-05-10 05:41:53','2021-05-12 05:51:30'),(391,1,49,20,'Service Requisition','SR-21-00020: Your request has been approved.',7,1,5,0,'2021-05-10 05:42:14','2021-05-12 05:51:30'),(392,1,38,18,'Cost Estimate','CEF-21-00018: Your request has been approved.',7,1,2,0,'2021-05-10 06:28:31','2021-05-12 05:51:30'),(393,4,38,19,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 06:35:01','2021-05-14 02:32:49'),(394,5,38,19,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 06:38:50','2021-05-10 06:38:50'),(395,2,38,19,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-10 06:39:43','2021-05-14 02:33:44'),(396,1,38,19,'Cost Estimate','CEF-21-00019: Your request has been approved.',7,1,2,0,'2021-05-10 06:41:04','2021-05-12 05:51:30'),(397,4,38,20,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 06:49:57','2021-05-14 02:32:49'),(398,1,38,20,'Cost Estimate','CEF-21-00020: Your request has been denied.',1,1,4,0,'2021-05-10 06:51:21','2021-05-12 05:51:30'),(399,4,38,21,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 06:52:22','2021-05-14 02:32:49'),(400,4,46,22,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-11 03:33:42','2021-05-14 02:32:49'),(401,7,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-11 03:39:44','2021-05-11 03:39:44'),(402,2,36,5,'Item Disposal','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-11 05:26:29','2021-05-14 02:33:44'),(403,2,37,3,'Transfer Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-11 05:31:45','2021-05-14 02:33:44'),(404,5,44,12,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-11 05:53:16','2021-05-11 05:53:16'),(405,2,49,21,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-11 23:46:33','2021-05-14 02:33:44'),(406,2,49,22,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-11 23:48:30','2021-05-14 02:33:44'),(407,2,49,23,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-11 23:57:17','2021-05-14 02:33:44'),(408,2,49,24,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-11 23:58:05','2021-05-14 02:33:44'),(409,4,49,21,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 00:43:56','2021-05-14 02:32:49'),(410,4,49,22,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 00:44:12','2021-05-14 02:32:49'),(411,4,49,23,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 00:48:33','2021-05-14 02:32:49'),(412,5,49,21,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 00:50:39','2021-05-12 00:50:39'),(413,5,49,22,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 00:50:50','2021-05-12 00:50:50'),(414,5,49,23,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 00:51:02','2021-05-12 00:51:02'),(415,1,49,21,'Service Requisition','SR-21-00021: Your request has been approved.',7,1,5,0,'2021-05-12 00:53:18','2021-05-12 05:51:30'),(416,1,49,22,'Service Requisition','SR-21-00022: Your request has been approved.',7,1,5,0,'2021-05-12 01:03:52','2021-05-12 05:51:30'),(417,1,49,23,'Service Requisition','SR-21-00023: Your request has been approved.',7,1,5,0,'2021-05-12 01:04:05','2021-05-12 05:51:30'),(418,2,41,13,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 01:06:56','2021-05-14 02:33:44'),(419,2,41,14,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 01:07:29','2021-05-14 02:33:44'),(420,2,41,15,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 01:08:12','2021-05-14 02:33:44'),(421,2,41,16,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 01:10:14','2021-05-14 02:33:44'),(422,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,4,'2021-05-12 02:26:56','2021-05-12 02:31:54'),(423,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,4,'2021-05-12 02:27:25','2021-05-12 02:31:25'),(424,5,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 02:32:55','2021-05-12 02:32:55'),(425,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-12 02:34:14','2021-05-14 02:33:44'),(426,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,1,2,0,'2021-05-12 02:35:50','2021-05-12 05:51:30'),(427,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 02:36:28','2021-05-14 02:32:49'),(428,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 02:37:34','2021-05-14 02:32:49'),(429,2,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-12 02:39:21','2021-05-14 02:33:44'),(430,7,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-12 02:40:36','2021-05-12 02:40:36'),(431,1,46,1,'Purchase Request','PR-21-00001: Your request has been approved.',7,1,7,1,'2021-05-12 02:54:02','2021-05-12 03:39:59'),(432,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 03:43:14','2021-05-14 02:32:49'),(433,5,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 03:46:25','2021-05-12 03:46:25'),(434,4,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 03:58:25','2021-05-14 02:32:49'),(435,5,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 03:59:06','2021-05-12 03:59:06'),(436,1,126,1,'Inventory Validation','IVR-21-00001: Your request has been approved.',7,1,5,0,'2021-05-12 03:59:51','2021-05-12 05:51:30'),(437,2,59,2,'Loan Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 05:11:06','2021-05-14 02:33:44'),(438,5,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 05:15:49','2021-05-12 05:15:49'),(439,5,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 05:16:17','2021-05-12 05:16:17'),(440,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been denied.',1,1,5,0,'2021-05-12 05:17:51','2021-05-12 05:51:30'),(441,2,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-12 05:18:24','2021-05-14 02:33:44'),(442,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-12 05:18:39','2021-05-14 02:33:44'),(443,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been approved.',7,1,2,0,'2021-05-12 05:19:27','2021-05-12 05:51:30'),(444,1,38,4,'Cost Estimate','CEF-21-00004: Your request has been approved.',7,1,2,0,'2021-05-12 05:19:53','2021-05-12 05:51:30'),(445,2,49,25,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 05:30:52','2021-05-14 02:33:44'),(446,2,49,26,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 05:32:22','2021-05-14 02:33:44'),(447,2,49,27,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 05:32:55','2021-05-14 02:33:44'),(448,4,49,25,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 05:35:08','2021-05-14 02:32:49'),(449,5,49,25,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 05:44:36','2021-05-12 05:44:36'),(450,1,49,25,'Service Requisition','SR-21-00025: Your request has been approved.',7,1,5,1,'2021-05-12 05:50:55','2021-05-12 05:51:48'),(451,2,41,17,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 05:53:15','2021-05-14 02:33:44'),(452,2,41,18,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 05:53:56','2021-05-14 02:33:44'),(453,4,41,10,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 05:56:27','2021-05-14 02:32:49'),(454,4,41,13,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 05:56:52','2021-05-14 02:32:49'),(455,4,41,14,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 05:57:06','2021-05-14 02:32:49'),(456,4,41,15,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 05:57:31','2021-05-14 02:32:49'),(457,4,41,16,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 05:57:55','2021-05-14 02:32:49'),(458,1,41,17,'Service Order','P0-21-00017: Your request has been denied.',1,1,2,0,'2021-05-12 05:58:28','2021-05-14 02:31:30'),(459,1,41,18,'Service Order','P0-21-00018: Your request has been denied.',1,1,2,0,'2021-05-12 05:59:44','2021-05-14 02:31:30'),(460,5,41,10,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 06:55:34','2021-05-12 06:55:34'),(461,5,41,13,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 06:55:52','2021-05-12 06:55:52'),(462,5,41,14,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 06:56:07','2021-05-12 06:56:07'),(463,5,41,15,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 06:56:21','2021-05-12 06:56:21'),(464,5,41,16,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 06:56:40','2021-05-12 06:56:40'),(465,1,41,10,'Service Order','P0-21-00010: Your request has been approved.',7,1,5,0,'2021-05-12 06:57:36','2021-05-14 02:31:30'),(466,1,41,14,'Service Order','P0-21-00014: Your request has been approved.',7,1,5,0,'2021-05-12 06:57:50','2021-05-14 02:31:30'),(467,1,41,13,'Service Order','P0-21-00013: Your request has been approved.',7,1,5,0,'2021-05-12 06:58:09','2021-05-14 02:31:30'),(468,1,41,15,'Service Order','P0-21-00015: Your request has been approved.',7,1,5,0,'2021-05-12 06:58:22','2021-05-14 02:31:30'),(469,1,41,16,'Service Order','P0-21-00016: Your request has been approved.',7,1,5,0,'2021-05-12 06:58:36','2021-05-14 02:31:30'),(470,2,41,19,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 07:05:16','2021-05-14 02:33:44'),(471,2,41,20,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 07:10:51','2021-05-14 02:33:44'),(472,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 07:14:57','2021-05-14 02:32:49'),(473,4,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 07:15:34','2021-05-14 02:32:49'),(474,5,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 07:16:59','2021-05-12 07:16:59'),(475,5,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 07:17:18','2021-05-12 07:17:18'),(476,2,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-12 07:18:00','2021-05-14 02:33:44'),(477,2,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-12 07:18:52','2021-05-14 02:33:44'),(478,1,38,5,'Cost Estimate','CEF-21-00005: Your request has been approved.',7,1,2,0,'2021-05-12 07:20:31','2021-05-14 02:31:30'),(479,1,38,6,'Cost Estimate','CEF-21-00006: Your request has been approved.',7,1,2,0,'2021-05-12 07:21:06','2021-05-14 02:31:30'),(480,6,38,7,'Cost Estimate','Charles Verdadero asked for your approval.',2,0,4,0,'2021-05-12 07:30:20','2021-05-12 07:30:20'),(481,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 07:46:48','2021-05-14 02:32:49'),(482,1,46,3,'Purchase Request','PR-21-00003: Your request has been denied.',1,1,4,0,'2021-05-12 07:47:51','2021-05-14 02:31:30'),(483,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-13 08:25:26','2021-05-14 02:32:49'),(484,4,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-13 09:17:58','2021-05-14 02:32:49'),(485,4,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-13 09:19:49','2021-05-14 02:32:49'),(486,5,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-13 09:21:43','2021-05-13 09:21:43'),(487,5,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-13 09:21:59','2021-05-13 09:21:59'),(488,2,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-13 09:22:54','2021-05-14 02:33:44'),(489,2,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-13 09:23:18','2021-05-14 02:33:44'),(490,1,38,8,'Cost Estimate','CEF-21-00008: Your request has been approved.',7,1,2,0,'2021-05-13 09:24:08','2021-05-14 02:31:30'),(491,1,38,9,'Cost Estimate','CEF-21-00009: Your request has been approved.',7,1,2,1,'2021-05-13 09:24:31','2021-05-14 02:32:20'),(492,4,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-13 09:36:16','2021-05-14 02:32:49'),(493,1,40,1,'Bid Recap','BRF-21-00001: Your request has been denied.',1,1,2,0,'2021-05-13 09:40:14','2021-05-14 02:31:30'),(494,4,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-13 09:43:01','2021-05-14 02:32:49'),(495,2,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-13 09:45:38','2021-05-14 02:33:44'),(496,2,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-13 09:45:49','2021-05-14 02:33:44'),(497,2,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-13 09:46:07','2021-05-14 02:33:44'),(498,7,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-13 09:49:04','2021-05-13 09:49:04'),(499,7,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-13 09:49:13','2021-05-13 09:49:13'),(500,7,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-13 09:49:24','2021-05-13 09:49:24'),(501,1,46,6,'Purchase Request','PR-21-00006: Your request has been approved.',7,1,7,0,'2021-05-13 09:50:02','2021-05-14 02:31:30'),(502,1,46,8,'Purchase Request','PR-21-00008: Your request has been approved.',7,1,7,0,'2021-05-13 09:50:19','2021-05-14 02:31:30'),(503,1,46,7,'Purchase Request','PR-21-00007: Your request has been approved.',7,1,7,0,'2021-05-13 09:50:29','2021-05-14 02:31:30'),(504,4,38,10,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-13 23:08:25','2021-05-14 02:32:49'),(505,5,44,13,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 01:35:04','2021-05-14 01:35:04'),(506,4,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-14 01:53:25','2021-05-14 02:32:49'),(507,4,38,11,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 03:42:00','2021-05-14 03:42:00'),(508,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 05:40:17','2021-05-14 05:40:17'),(509,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 06:01:09','2021-05-14 06:01:09'),(510,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 06:18:01','2021-05-14 06:18:01'),(511,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 06:20:01','2021-05-14 06:20:01'),(512,4,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 06:44:19','2021-05-14 06:44:19'),(513,4,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 06:58:52','2021-05-14 06:58:52'),(514,5,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:08:58','2021-05-14 07:08:58'),(515,5,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:09:39','2021-05-14 07:09:39'),(516,5,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:09:56','2021-05-14 07:09:56'),(517,5,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:10:18','2021-05-14 07:10:18'),(518,1,38,6,'Cost Estimate','CEF-21-00006: Your request has been denied.',1,1,4,0,'2021-05-14 07:10:43','2021-05-15 13:06:35'),(519,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-14 07:12:09','2021-05-14 07:12:09'),(520,2,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-14 07:12:22','2021-05-14 07:12:22'),(521,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-14 07:12:37','2021-05-14 07:12:37'),(522,1,38,4,'Cost Estimate','CEF-21-00004: Your request has been denied.',1,1,5,0,'2021-05-14 07:13:08','2021-05-15 13:06:35'),(523,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,1,2,0,'2021-05-14 07:14:20','2021-05-15 13:06:35'),(524,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been approved.',7,1,2,0,'2021-05-14 07:15:20','2021-05-15 13:06:35'),(525,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been approved.',7,1,2,0,'2021-05-14 07:15:39','2021-05-15 13:06:35'),(526,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:18:32','2021-05-14 07:18:32'),(527,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:19:18','2021-05-14 07:19:18'),(528,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:19:44','2021-05-14 07:19:44'),(529,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:27:02','2021-05-14 07:27:02'),(530,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:27:38','2021-05-14 07:27:38'),(531,4,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:28:37','2021-05-14 07:28:37'),(532,2,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:32:38','2021-05-14 07:32:38'),(533,2,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:32:55','2021-05-14 07:32:55'),(534,2,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:33:06','2021-05-14 07:33:06'),(535,1,46,7,'Purchase Request','PR-21-00007: Your request has been denied.',1,1,4,0,'2021-05-14 07:33:50','2021-05-15 13:06:35'),(536,2,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:34:58','2021-05-14 07:34:58'),(537,7,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 07:36:53','2021-05-14 07:36:53'),(538,7,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 07:37:44','2021-05-14 07:37:44'),(539,7,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 07:38:04','2021-05-14 07:38:04'),(540,7,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 07:39:21','2021-05-14 07:39:21'),(541,1,46,2,'Purchase Request','PR-21-00002: Your request has been approved.',7,1,7,0,'2021-05-14 07:40:34','2021-05-15 13:06:35'),(542,1,46,3,'Purchase Request','PR-21-00003: Your request has been approved.',7,1,7,0,'2021-05-14 07:40:50','2021-05-15 13:06:35'),(543,1,46,6,'Purchase Request','PR-21-00006: Your request has been approved.',7,1,7,0,'2021-05-14 07:41:07','2021-05-15 13:06:35'),(544,1,46,5,'Purchase Request','PR-21-00005: Your request has been approved.',7,1,7,0,'2021-05-14 07:41:49','2021-05-15 13:06:35'),(545,4,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:46:33','2021-05-14 07:46:33'),(546,4,38,12,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:54:57','2021-05-14 07:54:57'),(547,4,38,13,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:55:13','2021-05-14 07:55:13'),(548,4,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:55:41','2021-05-14 07:55:41'),(549,5,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:57:03','2021-05-14 07:57:03'),(550,2,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:57:28','2021-05-14 07:57:28'),(551,2,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-14 07:58:25','2021-05-14 07:58:25'),(552,7,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 07:58:33','2021-05-14 07:58:33'),(553,1,38,9,'Cost Estimate','CEF-21-00009: Your request has been approved.',7,1,2,0,'2021-05-14 07:59:33','2021-05-15 13:06:35'),(554,1,46,8,'Purchase Request','PR-21-00008: Your request has been denied.',1,1,7,0,'2021-05-14 07:59:34','2021-05-15 13:06:35'),(555,2,49,1,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 08:28:45','2021-05-14 08:28:45'),(556,2,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 08:29:11','2021-05-14 08:29:11'),(557,2,49,3,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 08:30:20','2021-05-14 08:30:20'),(558,1,49,1,'Service Requisition','SR-21-00001: Your request has been denied.',1,1,2,0,'2021-05-14 08:31:23','2021-05-15 13:06:35'),(559,4,49,3,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 08:31:36','2021-05-14 08:31:36'),(560,4,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 08:31:49','2021-05-14 08:31:49'),(561,5,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 08:32:29','2021-05-14 08:32:29'),(562,5,49,3,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 08:32:37','2021-05-14 08:32:37'),(563,1,49,2,'Service Requisition','SR-21-00002: Your request has been approved.',7,1,5,0,'2021-05-14 08:33:16','2021-05-15 13:06:35'),(564,1,49,3,'Service Requisition','SR-21-00003: Your request has been approved.',7,1,5,0,'2021-05-14 08:33:28','2021-05-15 13:06:35'),(565,2,49,5,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 08:44:48','2021-05-14 08:44:48'),(566,2,49,6,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 08:45:27','2021-05-14 08:45:27'),(567,2,49,7,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 08:46:36','2021-05-14 08:46:36'),(568,4,49,5,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 08:47:50','2021-05-14 08:47:50'),(569,4,49,6,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 08:47:59','2021-05-14 08:47:59'),(570,4,49,7,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 08:48:09','2021-05-14 08:48:09'),(571,5,49,5,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 08:48:45','2021-05-14 08:48:45'),(572,5,49,6,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 08:48:59','2021-05-14 08:48:59'),(573,5,49,7,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 08:49:10','2021-05-14 08:49:10'),(574,1,49,5,'Service Requisition','SR-21-00005: Your request has been approved.',7,1,5,0,'2021-05-14 08:49:44','2021-05-15 13:06:35'),(575,1,49,6,'Service Requisition','SR-21-00006: Your request has been approved.',7,1,5,0,'2021-05-14 08:49:54','2021-05-15 13:06:35'),(576,1,49,7,'Service Requisition','SR-21-00007: Your request has been approved.',7,1,5,0,'2021-05-14 08:50:05','2021-05-15 13:06:35'),(577,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 09:29:25','2021-05-14 09:29:25'),(578,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 09:29:45','2021-05-14 09:29:45'),(579,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 09:30:06','2021-05-14 09:30:06'),(580,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 09:30:27','2021-05-14 09:30:27'),(581,2,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 09:31:09','2021-05-14 09:31:09'),(582,2,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 09:31:20','2021-05-14 09:31:20'),(583,2,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 09:31:34','2021-05-14 09:31:34'),(584,2,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 09:31:46','2021-05-14 09:31:46'),(585,7,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 09:32:25','2021-05-14 09:32:25'),(586,7,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 09:32:41','2021-05-14 09:32:41'),(587,7,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 09:32:53','2021-05-14 09:32:53'),(588,7,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,2,7,'2021-05-14 09:33:08','2021-05-15 02:24:54'),(589,1,46,1,'Purchase Request','PR-21-00001: Your request has been approved.',7,1,7,0,'2021-05-14 09:33:53','2021-05-15 13:06:35'),(590,1,46,2,'Purchase Request','PR-21-00002: Your request has been approved.',7,1,7,0,'2021-05-14 09:34:03','2021-05-15 13:06:35'),(591,1,46,3,'Purchase Request','PR-21-00003: Your request has been approved.',7,1,7,0,'2021-05-14 09:34:41','2021-05-15 13:06:35'),(592,1,126,1,'Inventory Validation','IVR-21-00001: Your request has been denied.',1,1,2,0,'2021-05-14 10:06:44','2021-05-15 13:06:35'),(593,2,41,1,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-15 02:41:50','2021-05-15 02:41:50'),(594,2,41,2,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-15 02:42:10','2021-05-15 02:42:10'),(595,4,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 09:10:50','2021-05-15 09:10:50'),(596,4,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 09:11:05','2021-05-15 09:11:05'),(597,4,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 09:11:20','2021-05-15 09:11:20'),(598,5,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 09:13:18','2021-05-15 09:13:18'),(599,5,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 09:14:14','2021-05-15 09:14:14'),(600,5,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 09:14:27','2021-05-15 09:14:27'),(601,5,39,1,'Bill Material','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 09:17:39','2021-05-15 09:17:39'),(602,5,39,3,'Bill Material','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 09:17:56','2021-05-15 09:17:56'),(603,5,39,4,'Bill Material','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 09:24:14','2021-05-15 09:24:14'),(604,5,39,5,'Bill Material','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 09:24:29','2021-05-15 09:24:29'),(605,2,39,1,'Bill Material','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-15 09:25:31','2021-05-15 09:25:31'),(606,2,39,3,'Bill Material','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-15 09:25:44','2021-05-15 09:25:44'),(607,2,39,4,'Bill Material','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-15 09:25:57','2021-05-15 09:25:57'),(608,2,39,5,'Bill Material','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-15 09:26:30','2021-05-15 09:26:30'),(609,1,126,2,'Inventory Validation','IVR-21-00002: Your request has been approved.',7,1,5,0,'2021-05-15 09:29:46','2021-05-15 13:06:35'),(610,1,126,3,'Inventory Validation','IVR-21-00003: Your request has been approved.',7,1,5,0,'2021-05-15 09:30:01','2021-05-15 13:06:35'),(611,1,126,4,'Inventory Validation','IVR-21-00004: Your request has been approved.',7,1,5,0,'2021-05-15 09:30:32','2021-05-15 13:06:35'),(612,1,39,1,'Bill Material','BOM-21-00001: Your request has been approved.',7,1,2,0,'2021-05-15 09:32:16','2021-05-15 13:06:35'),(613,1,39,3,'Bill Material','BOM-21-00003: Your request has been approved.',7,1,2,0,'2021-05-15 09:32:32','2021-05-15 13:06:35'),(614,1,39,4,'Bill Material','BOM-21-00004: Your request has been approved.',7,1,2,0,'2021-05-15 09:32:53','2021-05-15 13:06:35'),(615,1,39,5,'Bill Material','BOM-21-00005: Your request has been approved.',7,1,2,0,'2021-05-15 09:33:07','2021-05-15 13:06:35'),(616,4,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 12:35:55','2021-05-15 12:35:55'),(617,4,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 12:36:19','2021-05-15 12:36:19'),(618,4,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 12:36:47','2021-05-15 12:36:47'),(619,4,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 12:37:06','2021-05-15 12:37:06'),(620,4,40,5,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 12:37:21','2021-05-15 12:37:21'),(621,5,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 12:39:14','2021-05-15 12:39:14'),(622,1,40,2,'Bid Recap','BRF-21-00002: Your request has been denied.',1,1,4,0,'2021-05-15 12:43:44','2021-05-15 13:06:35'),(623,5,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 12:44:47','2021-05-15 12:44:47'),(624,5,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 12:46:08','2021-05-15 12:46:08'),(625,5,40,5,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 12:46:31','2021-05-15 12:46:31'),(626,1,40,1,'Bid Recap','BRF-21-00001: Your request has been approved.',7,1,5,0,'2021-05-15 12:49:48','2021-05-15 13:06:35'),(627,1,40,3,'Bid Recap','BRF-21-00003: Your request has been approved.',7,1,5,0,'2021-05-15 12:50:03','2021-05-15 13:06:35'),(628,1,40,4,'Bid Recap','BRF-21-00004: Your request has been approved.',7,1,5,0,'2021-05-15 12:50:27','2021-05-15 13:06:35'),(629,1,40,5,'Bid Recap','BRF-21-00005: Your request has been denied.',1,1,5,0,'2021-05-15 12:51:36','2021-05-15 13:06:35'),(630,2,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-15 13:13:29','2021-05-15 13:13:29'),(631,2,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-15 13:16:55','2021-05-15 13:16:55'),(632,2,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-15 13:17:35','2021-05-15 13:17:35'),(633,2,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-15 13:18:01','2021-05-15 13:18:01'),(634,2,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-15 13:18:28','2021-05-15 13:18:28'),(635,5,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 13:23:46','2021-05-15 13:23:46'),(636,5,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 13:24:00','2021-05-15 13:24:00'),(637,5,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 13:24:18','2021-05-15 13:24:18'),(638,5,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 13:24:38','2021-05-15 13:24:38'),(639,5,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 13:25:09','2021-05-15 13:25:09'),(640,1,47,2,'Purchase Order','P0-21-00002: Your request has been denied.',1,1,5,0,'2021-05-15 13:26:10','2021-05-18 08:32:12'),(641,4,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-15 13:26:20','2021-05-15 13:26:20'),(642,4,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-15 13:26:33','2021-05-15 13:26:33'),(643,4,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-15 13:26:44','2021-05-15 13:26:44'),(644,1,47,3,'Purchase Order','P0-21-00003: Your request has been approved.',7,1,4,0,'2021-05-15 13:28:57','2021-05-18 08:32:12'),(645,1,47,4,'Purchase Order','P0-21-00004: Your request has been approved.',7,1,4,0,'2021-05-15 13:29:10','2021-05-18 08:32:12'),(646,1,47,5,'Purchase Order','P0-21-00005: Your request has been approved.',7,1,4,0,'2021-05-15 13:29:21','2021-05-18 08:32:12'),(647,2,60,8,'Official Business Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 00:31:18','2021-05-17 00:31:18'),(648,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 00:35:34','2021-05-17 00:35:34'),(649,5,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 00:56:33','2021-05-17 00:56:33'),(650,2,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-17 00:57:45','2021-05-17 00:57:45'),(651,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been approved.',7,1,2,0,'2021-05-17 00:58:53','2021-05-18 08:32:12'),(652,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 02:21:10','2021-05-17 02:21:10'),(653,5,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 02:22:27','2021-05-17 02:22:27'),(654,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-17 02:23:09','2021-05-17 02:23:09'),(655,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been approved.',7,1,2,0,'2021-05-17 02:23:47','2021-05-18 08:32:12'),(656,2,49,8,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 02:26:58','2021-05-17 02:26:58'),(657,2,49,9,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 02:38:47','2021-05-17 02:38:47'),(658,4,49,8,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 02:42:03','2021-05-17 02:42:03'),(659,4,49,9,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 02:42:47','2021-05-17 02:42:47'),(660,5,49,8,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 02:43:55','2021-05-17 02:43:55'),(661,5,49,9,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 02:44:15','2021-05-17 02:44:15'),(662,1,49,8,'Service Requisition','SR-21-00008: Your request has been approved.',7,1,5,0,'2021-05-17 02:47:35','2021-05-18 08:32:12'),(663,1,49,9,'Service Requisition','SR-21-00009: Your request has been approved.',7,1,5,0,'2021-05-17 02:49:15','2021-05-18 08:32:12'),(664,2,41,4,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 03:06:12','2021-05-17 03:06:12'),(665,2,41,5,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 03:10:26','2021-05-17 03:10:26'),(666,2,41,6,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 03:32:00','2021-05-17 03:32:00'),(667,4,41,1,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 03:38:38','2021-05-17 03:38:38'),(668,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 03:38:55','2021-05-17 03:38:55'),(669,4,41,2,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 03:39:36','2021-05-17 03:39:36'),(670,1,41,4,'Service Order','P0-21-00004: Your request has been denied.',1,1,2,0,'2021-05-17 03:40:21','2021-05-18 08:32:12'),(671,4,41,5,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 03:41:45','2021-05-17 03:41:45'),(672,2,41,8,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 03:47:58','2021-05-17 03:47:58'),(673,2,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 03:58:52','2021-05-17 03:58:52'),(674,7,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 05:28:50','2021-05-17 05:28:50'),(675,1,46,5,'Purchase Request','PR-21-00005: Your request has been approved.',7,1,7,0,'2021-05-17 05:29:29','2021-05-18 08:32:12'),(676,4,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 05:43:25','2021-05-17 05:43:25'),(677,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 05:45:41','2021-05-17 05:45:41'),(678,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 05:49:18','2021-05-17 05:49:18'),(679,2,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 05:49:57','2021-05-17 05:49:57'),(680,7,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 05:50:56','2021-05-17 05:50:56'),(681,1,46,1,'Purchase Request','PR-21-00001: Your request has been approved.',7,1,7,0,'2021-05-17 05:51:43','2021-05-18 08:32:12'),(682,4,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 05:54:26','2021-05-17 05:54:26'),(683,5,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 05:55:03','2021-05-17 05:55:03'),(684,1,126,1,'Inventory Validation','IVR-21-00001: Your request has been approved.',7,1,5,0,'2021-05-17 05:55:55','2021-05-18 08:32:12'),(685,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 05:58:27','2021-05-17 05:58:27'),(686,5,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 05:59:25','2021-05-17 05:59:25'),(687,5,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 06:00:37','2021-05-17 06:00:37'),(688,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 06:01:42','2021-05-17 06:01:42'),(689,5,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 06:02:37','2021-05-17 06:02:37'),(690,4,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 06:03:00','2021-05-17 06:03:00'),(691,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 06:03:07','2021-05-17 06:03:07'),(692,5,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 06:03:48','2021-05-17 06:03:48'),(693,2,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 06:04:35','2021-05-17 06:04:35'),(694,1,40,1,'Bid Recap','BRF-21-00001: Your request has been approved.',7,1,5,0,'2021-05-17 06:05:40','2021-05-18 08:32:12'),(695,7,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 06:06:22','2021-05-17 06:06:22'),(696,1,46,2,'Purchase Request','PR-21-00002: Your request has been approved.',7,1,7,0,'2021-05-17 06:07:14','2021-05-18 08:32:12'),(697,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-17 06:25:19','2021-05-17 06:25:19'),(698,2,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-17 06:25:37','2021-05-17 06:25:37'),(699,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-17 06:25:49','2021-05-17 06:25:49'),(700,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,1,2,0,'2021-05-17 06:26:45','2021-05-18 08:32:12'),(701,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been approved.',7,1,2,0,'2021-05-17 06:35:53','2021-05-18 08:32:12'),(702,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been denied.',1,1,2,0,'2021-05-17 06:36:34','2021-05-18 08:32:12'),(703,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 06:38:37','2021-05-17 06:38:37'),(704,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 06:41:20','2021-05-17 06:41:20'),(705,2,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 06:42:27','2021-05-17 06:42:27'),(706,2,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 06:42:43','2021-05-17 06:42:43'),(707,2,41,7,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 07:03:12','2021-05-17 07:03:12'),(708,7,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 07:11:13','2021-05-17 07:11:13'),(709,7,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 07:11:34','2021-05-17 07:11:34'),(710,1,46,4,'Purchase Request','PR-21-00004: Your request has been approved.',7,1,7,0,'2021-05-17 07:13:13','2021-05-18 08:32:12'),(711,1,46,5,'Purchase Request','PR-21-00005: Your request has been approved.',7,1,7,0,'2021-05-17 07:13:40','2021-05-18 08:32:12'),(712,2,41,9,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 07:27:27','2021-05-17 07:27:27'),(713,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 07:31:03','2021-05-17 07:31:03'),(714,2,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 07:32:17','2021-05-17 07:32:17'),(715,4,41,7,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 07:38:41','2021-05-17 07:38:41'),(716,1,41,9,'Service Order','P0-21-00009: Your request has been denied.',1,1,2,0,'2021-05-17 07:40:34','2021-05-18 08:32:12'),(717,5,41,7,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 07:41:35','2021-05-17 07:41:35'),(718,4,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 07:41:51','2021-05-17 07:41:51'),(719,4,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 07:42:17','2021-05-17 07:42:17'),(720,1,41,7,'Service Order','P0-21-00007: Your request has been approved.',7,1,5,0,'2021-05-17 07:42:17','2021-05-18 08:32:12'),(721,1,126,4,'Inventory Validation','IVR-21-00004: Your request has been denied.',1,1,2,0,'2021-05-17 07:42:44','2021-05-18 08:32:12'),(722,4,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 07:43:24','2021-05-17 07:43:24'),(723,2,128,1,'Service Completion','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 07:44:08','2021-05-17 07:44:08'),(724,5,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 07:44:23','2021-05-17 07:44:23'),(725,5,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 07:44:39','2021-05-17 07:44:39'),(726,5,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 07:44:53','2021-05-17 07:44:53'),(727,2,128,2,'Service Completion','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 07:45:42','2021-05-17 07:45:42'),(728,1,126,2,'Inventory Validation','IVR-21-00002: Your request has been approved.',7,1,5,0,'2021-05-17 07:46:55','2021-05-18 08:32:12'),(729,1,126,5,'Inventory Validation','IVR-21-00005: Your request has been approved.',7,1,5,0,'2021-05-17 07:47:16','2021-05-18 08:32:12'),(730,1,126,3,'Inventory Validation','IVR-21-00003: Your request has been approved.',7,1,5,0,'2021-05-17 07:47:34','2021-05-18 08:32:12'),(731,4,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 08:06:43','2021-05-17 08:06:43'),(732,20,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 08:07:35','2021-05-17 08:07:35'),(733,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 08:21:08','2021-05-17 08:21:08'),(734,4,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 22:56:46','2021-05-17 22:56:46'),(735,4,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 22:58:30','2021-05-17 22:58:30'),(736,20,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 22:59:49','2021-05-17 22:59:49'),(737,20,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 23:08:57','2021-05-17 23:08:57'),(738,1,40,2,'Bid Recap','BRF-21-00002: Your request has been approved.',7,1,20,0,'2021-05-17 23:10:58','2021-05-18 08:32:12'),(739,1,40,4,'Bid Recap','BRF-21-00004: Your request has been approved.',7,1,20,0,'2021-05-17 23:11:16','2021-05-18 08:32:12'),(740,1,40,3,'Bid Recap','BRF-21-00003: Your request has been approved.',7,1,20,0,'2021-05-17 23:11:40','2021-05-18 08:32:12'),(741,2,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 23:46:46','2021-05-17 23:46:46'),(742,2,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 23:47:32','2021-05-17 23:47:32'),(743,2,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 23:48:12','2021-05-17 23:48:12'),(744,2,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 23:50:19','2021-05-17 23:50:19'),(745,2,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 23:51:35','2021-05-17 23:51:35'),(746,2,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 23:52:29','2021-05-17 23:52:29'),(747,5,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 23:53:40','2021-05-17 23:53:40'),(748,5,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 23:54:02','2021-05-17 23:54:02'),(749,5,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 23:54:19','2021-05-17 23:54:19'),(750,5,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 00:01:39','2021-05-18 00:01:39'),(751,5,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 00:01:51','2021-05-18 00:01:51'),(752,1,47,6,'Purchase Order','P0-21-00006: Your request has been denied.',1,1,2,0,'2021-05-18 00:02:12','2021-05-18 08:32:12'),(753,4,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-18 00:07:44','2021-05-18 00:07:44'),(754,4,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-18 00:08:00','2021-05-18 00:08:00'),(755,4,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-18 00:15:25','2021-05-18 00:15:25'),(756,4,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-18 00:15:50','2021-05-18 00:15:50'),(757,4,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-18 00:16:18','2021-05-18 00:16:18'),(758,1,47,1,'Purchase Order','P0-21-00001: Your request has been approved.',7,1,4,0,'2021-05-18 00:17:06','2021-05-18 08:32:12'),(759,1,47,2,'Purchase Order','P0-21-00002: Your request has been approved.',7,1,4,0,'2021-05-18 00:17:23','2021-05-18 08:32:12'),(760,1,47,3,'Purchase Order','P0-21-00003: Your request has been approved.',7,1,4,0,'2021-05-18 00:18:15','2021-05-18 08:32:12'),(761,1,47,4,'Purchase Order','P0-21-00004: Your request has been approved.',7,1,4,0,'2021-05-18 00:19:13','2021-05-18 08:32:12'),(762,1,47,5,'Purchase Order','P0-21-00005: Your request has been approved.',7,1,4,0,'2021-05-18 00:19:59','2021-05-18 08:32:12'),(763,2,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 00:26:27','2021-05-18 00:26:27'),(764,2,41,11,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 00:50:12','2021-05-18 00:50:12'),(765,2,49,10,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 01:06:18','2021-05-18 01:06:18'),(766,2,49,11,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 01:12:29','2021-05-18 01:12:29'),(767,4,49,11,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 01:34:27','2021-05-18 01:34:27'),(768,5,49,11,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 01:35:33','2021-05-18 01:35:33'),(769,1,49,11,'Service Requisition','SR-21-00011: Your request has been approved.',7,1,5,0,'2021-05-18 01:36:33','2021-05-18 08:32:12'),(770,4,49,10,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 01:37:49','2021-05-18 01:37:49'),(771,5,49,10,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 01:38:24','2021-05-18 01:38:24'),(772,1,49,10,'Service Requisition','SR-21-00010: Your request has been approved.',7,1,5,0,'2021-05-18 01:38:58','2021-05-18 08:32:12'),(773,2,41,12,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 01:40:36','2021-05-18 01:40:36'),(774,2,41,13,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 01:41:13','2021-05-18 01:41:13'),(775,4,41,13,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 01:42:09','2021-05-18 01:42:09'),(776,5,41,13,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 01:43:44','2021-05-18 01:43:44'),(777,1,41,13,'Service Order','P0-21-00013: Your request has been approved.',7,1,5,0,'2021-05-18 01:44:17','2021-05-18 08:32:12'),(778,2,41,14,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 01:51:24','2021-05-18 01:51:24'),(779,4,126,6,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 02:21:01','2021-05-18 02:21:01'),(780,5,126,6,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 02:22:06','2021-05-18 02:22:06'),(781,1,126,6,'Inventory Validation','IVR-21-00006: Your request has been approved.',7,1,5,0,'2021-05-18 02:23:45','2021-05-18 08:32:12'),(782,4,126,7,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 02:26:54','2021-05-18 02:26:54'),(783,5,126,7,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 02:27:39','2021-05-18 02:27:39'),(784,1,126,7,'Inventory Validation','IVR-21-00007: Your request has been denied.',1,1,5,0,'2021-05-18 02:53:56','2021-05-18 08:32:12'),(785,4,126,8,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 02:55:44','2021-05-18 02:55:44'),(786,5,126,8,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 02:57:01','2021-05-18 02:57:01'),(787,1,126,8,'Inventory Validation','IVR-21-00008: Your request has been approved.',7,1,5,0,'2021-05-18 02:57:41','2021-05-18 08:32:12'),(788,4,40,6,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 03:03:22','2021-05-18 03:03:22'),(789,20,40,6,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 03:04:15','2021-05-18 03:04:15'),(790,1,40,6,'Bid Recap','BRF-21-00006: Your request has been approved.',7,1,20,0,'2021-05-18 03:15:56','2021-05-18 08:32:12'),(791,4,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 03:22:02','2021-05-18 03:22:02'),(792,2,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 03:55:23','2021-05-18 03:55:23'),(793,4,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 03:58:35','2021-05-18 03:58:35'),(794,1,46,6,'Purchase Request','PR-21-00006: Your request has been denied.',1,1,2,0,'2021-05-18 05:06:51','2021-05-18 08:32:12'),(795,1,47,7,'Purchase Order','P0-21-00007: Your request has been denied.',1,1,2,0,'2021-05-18 05:30:32','2021-05-18 08:32:12'),(796,2,49,12,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 05:44:21','2021-05-18 05:44:21'),(797,4,49,12,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 05:48:13','2021-05-18 05:48:13'),(798,5,49,12,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 05:58:48','2021-05-18 05:58:48'),(799,1,49,12,'Service Requisition','SR-21-00012: Your request has been approved.',7,1,5,0,'2021-05-18 06:00:43','2021-05-18 08:32:12'),(800,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 06:21:57','2021-05-18 06:21:57'),(801,1,38,4,'Cost Estimate','CEF-21-00004: Your request has been denied.',1,1,4,0,'2021-05-18 06:23:20','2021-05-18 08:32:12'),(802,1,38,5,'Cost Estimate','CEF-21-00005: Your request has been denied.',1,1,4,0,'2021-05-18 06:23:50','2021-05-18 08:32:12'),(803,4,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 06:25:31','2021-05-18 06:25:31'),(804,4,38,7,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 06:32:23','2021-05-18 06:32:23'),(805,4,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 06:35:26','2021-05-18 06:35:26'),(806,4,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 06:59:42','2021-05-18 06:59:42'),(807,2,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 07:01:02','2021-05-18 07:01:02'),(808,2,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 07:01:16','2021-05-18 07:01:16'),(809,7,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:02:49','2021-05-18 07:02:49'),(810,7,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:02:59','2021-05-18 07:02:59'),(811,7,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:03:17','2021-05-18 07:03:17'),(812,1,46,7,'Purchase Request','PR-21-00007: Your request has been approved.',7,1,7,0,'2021-05-18 07:04:21','2021-05-18 08:32:12'),(813,1,46,9,'Purchase Request','PR-21-00009: Your request has been approved.',7,1,7,0,'2021-05-18 07:04:36','2021-05-18 08:32:12'),(814,1,46,8,'Purchase Request','PR-21-00008: Your request has been approved.',7,1,7,0,'2021-05-18 07:04:49','2021-05-18 08:32:12'),(815,4,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 07:09:01','2021-05-18 07:09:01'),(816,4,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 07:12:40','2021-05-18 07:12:40'),(817,20,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 07:17:45','2021-05-18 07:17:45'),(818,2,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-18 07:18:58','2021-05-18 07:18:58'),(819,1,38,9,'Cost Estimate','CEF-21-00009: Your request has been approved.',7,1,2,0,'2021-05-18 07:19:40','2021-05-18 08:32:12'),(820,4,46,12,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 07:26:33','2021-05-18 07:26:33'),(821,2,46,12,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 07:28:09','2021-05-18 07:28:09'),(822,7,46,12,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:28:55','2021-05-18 07:28:55'),(823,1,46,12,'Purchase Request','PR-21-00012: Your request has been approved.',7,1,7,0,'2021-05-18 07:29:51','2021-05-18 08:32:12'),(824,4,126,9,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:33:56','2021-05-18 07:33:56'),(825,5,126,9,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 07:34:41','2021-05-18 07:34:41'),(826,1,126,9,'Inventory Validation','IVR-21-00009: Your request has been approved.',7,1,5,0,'2021-05-18 07:35:15','2021-05-18 08:32:12'),(827,4,40,7,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:42:40','2021-05-18 07:42:40'),(828,20,40,7,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 07:43:26','2021-05-18 07:43:26'),(829,4,126,10,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:43:57','2021-05-18 07:43:57'),(830,4,126,11,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:44:37','2021-05-18 07:44:37'),(831,4,126,12,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:45:33','2021-05-18 07:45:33'),(832,1,40,7,'Bid Recap','BRF-21-00007: Your request has been approved.',7,1,20,0,'2021-05-18 07:45:41','2021-05-18 08:32:12'),(833,5,126,10,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 07:46:47','2021-05-18 07:46:47'),(834,5,126,11,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 07:47:05','2021-05-18 07:47:05'),(835,5,126,12,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 07:47:35','2021-05-18 07:47:35'),(836,1,126,10,'Inventory Validation','IVR-21-00010: Your request has been approved.',7,1,5,0,'2021-05-18 07:48:54','2021-05-18 08:32:12'),(837,1,126,11,'Inventory Validation','IVR-21-00011: Your request has been approved.',7,1,5,0,'2021-05-18 07:49:08','2021-05-18 08:32:12'),(838,1,126,12,'Inventory Validation','IVR-21-00012: Your request has been approved.',7,1,5,1,'2021-05-18 07:49:21','2021-05-18 08:32:23'),(839,4,40,5,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 08:20:33','2021-05-18 08:20:33'),(840,4,40,8,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 08:20:49','2021-05-18 08:20:49'),(841,4,40,9,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 08:21:09','2021-05-18 08:21:09'),(842,20,40,5,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 08:22:38','2021-05-18 08:22:38'),(843,20,40,8,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 23:01:44','2021-05-18 23:01:44'),(844,20,40,9,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 23:03:19','2021-05-18 23:03:19'),(845,1,40,5,'Bid Recap','BRF-21-00005: Your request has been approved.',7,0,20,0,'2021-05-18 23:12:36','2021-05-18 23:12:36'),(846,1,40,8,'Bid Recap','BRF-21-00008: Your request has been approved.',7,0,20,0,'2021-05-18 23:15:38','2021-05-18 23:15:38'),(847,1,40,9,'Bid Recap','BRF-21-00009: Your request has been denied.',1,0,20,0,'2021-05-18 23:16:44','2021-05-18 23:16:44'),(848,4,46,14,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 00:17:32','2021-05-19 00:17:32'),(849,4,46,16,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 00:26:43','2021-05-19 00:26:43'),(850,4,46,17,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 00:29:07','2021-05-19 00:29:07'),(851,2,46,15,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 00:46:38','2021-05-19 00:46:38'),(852,7,46,15,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 00:48:13','2021-05-19 00:48:13'),(853,1,46,15,'Purchase Request','PR-21-00015: Your request has been approved.',7,0,7,0,'2021-05-19 00:53:42','2021-05-19 00:53:42'),(854,2,47,8,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 00:56:47','2021-05-19 00:56:47'),(855,4,126,13,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 01:05:17','2021-05-19 01:05:17'),(856,5,126,13,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 01:06:08','2021-05-19 01:06:08'),(857,1,126,13,'Inventory Validation','IVR-21-00013: Your request has been approved.',7,0,5,0,'2021-05-19 01:07:02','2021-05-19 01:07:02'),(858,4,40,11,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 01:40:12','2021-05-19 01:40:12'),(859,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 02:26:23','2021-05-19 02:26:23'),(860,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 02:28:31','2021-05-19 02:28:31'),(861,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 02:33:27','2021-05-19 02:33:27'),(862,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 02:39:10','2021-05-19 02:39:10'),(863,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 02:41:52','2021-05-19 02:41:52'),(864,20,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 02:58:42','2021-05-19 02:58:42'),(865,2,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-19 03:01:21','2021-05-19 03:01:21'),(866,1,38,5,'Cost Estimate','CEF-21-00005: Your request has been approved.',7,0,2,0,'2021-05-19 03:02:08','2021-05-19 03:02:08'),(867,20,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 03:04:14','2021-05-19 03:04:14'),(868,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been denied.',1,0,4,0,'2021-05-19 03:05:14','2021-05-19 03:05:14'),(869,20,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 03:07:10','2021-05-19 03:07:10'),(870,20,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 03:07:42','2021-05-19 03:07:42'),(871,2,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-19 03:09:15','2021-05-19 03:09:15'),(872,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-19 03:09:38','2021-05-19 03:09:38'),(873,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-19 03:09:57','2021-05-19 03:09:57'),(874,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,0,2,0,'2021-05-19 03:11:01','2021-05-19 03:11:01'),(875,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been approved.',7,0,2,0,'2021-05-19 03:11:24','2021-05-19 03:11:24'),(876,1,38,4,'Cost Estimate','CEF-21-00004: Your request has been approved.',7,0,2,0,'2021-05-19 03:11:59','2021-05-19 03:11:59'),(877,20,39,1,'Bill of Material','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 03:13:55','2021-05-19 03:13:55'),(878,2,39,1,'Bill of Material','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-19 03:16:43','2021-05-19 03:16:43'),(879,1,39,1,'Bill of Material','BOM-21-00001: Your request has been approved.',7,0,2,0,'2021-05-19 03:17:26','2021-05-19 03:17:26'),(880,4,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 03:18:19','2021-05-19 03:18:19'),(881,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 03:22:23','2021-05-19 03:22:23'),(882,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 03:27:23','2021-05-19 03:27:23'),(883,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 03:34:19','2021-05-19 03:34:19'),(884,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 03:38:04','2021-05-19 03:38:04'),(885,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 03:39:05','2021-05-19 03:39:05'),(886,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 03:39:25','2021-05-19 03:39:25'),(887,4,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 03:41:03','2021-05-19 03:41:03'),(888,1,38,6,'Cost Estimate','CEF-21-00006: Your request has been denied.',1,0,4,0,'2021-05-19 05:33:23','2021-05-19 05:33:23'),(889,2,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 05:35:10','2021-05-19 05:35:10'),(890,7,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 05:37:05','2021-05-19 05:37:05'),(891,1,46,5,'Purchase Request','PR-21-00005: Your request has been approved.',7,0,7,0,'2021-05-19 05:38:00','2021-05-19 05:38:00'),(892,2,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 05:38:17','2021-05-19 05:38:17'),(893,2,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 05:38:38','2021-05-19 05:38:38'),(894,1,46,4,'Purchase Request','PR-21-00004: Your request has been denied.',1,0,4,0,'2021-05-19 05:39:04','2021-05-19 05:39:04'),(895,2,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 05:39:19','2021-05-19 05:39:19'),(896,1,46,6,'Purchase Request','PR-21-00006: Your request has been denied.',1,0,4,0,'2021-05-19 05:39:45','2021-05-19 05:39:45'),(897,2,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 05:40:31','2021-05-19 05:40:31'),(898,7,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 05:41:42','2021-05-19 05:41:42'),(899,7,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 05:41:57','2021-05-19 05:41:57'),(900,7,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 05:42:08','2021-05-19 05:42:08'),(901,7,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 05:42:20','2021-05-19 05:42:20'),(902,1,46,1,'Purchase Request','PR-21-00001: Your request has been approved.',7,0,7,0,'2021-05-19 05:49:46','2021-05-19 05:49:46'),(903,1,46,2,'Purchase Request','PR-21-00002: Your request has been approved.',7,0,7,0,'2021-05-19 05:49:59','2021-05-19 05:49:59'),(904,1,46,3,'Purchase Request','PR-21-00003: Your request has been approved.',7,0,7,0,'2021-05-19 05:50:11','2021-05-19 05:50:11'),(905,1,46,7,'Purchase Request','PR-21-00007: Your request has been approved.',7,0,7,0,'2021-05-19 05:50:55','2021-05-19 05:50:55'),(906,4,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 06:03:08','2021-05-19 06:03:08'),(907,5,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 06:04:09','2021-05-19 06:04:09'),(908,1,126,2,'Inventory Validation','IVR-21-00002: Your request has been approved.',7,0,5,0,'2021-05-19 06:06:24','2021-05-19 06:06:24'),(909,4,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 06:09:43','2021-05-19 06:09:43'),(910,4,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 06:10:12','2021-05-19 06:10:12'),(911,4,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 06:11:30','2021-05-19 06:11:30'),(912,4,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 06:15:37','2021-05-19 06:15:37'),(913,1,126,5,'Inventory Validation','IVR-21-00005: Your request has been denied.',1,0,2,0,'2021-05-19 06:16:13','2021-05-19 06:16:13'),(914,20,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 06:17:29','2021-05-19 06:17:29'),(915,1,40,1,'Bid Recap','BRF-21-00001: Your request has been approved.',7,0,20,0,'2021-05-19 06:19:09','2021-05-19 06:19:09'),(916,2,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 06:23:44','2021-05-19 06:23:44'),(917,5,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 06:26:13','2021-05-19 06:26:13'),(918,5,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 06:26:45','2021-05-19 06:26:45'),(919,5,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 06:27:27','2021-05-19 06:27:27'),(920,5,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 06:28:41','2021-05-19 06:28:41'),(921,1,126,1,'Inventory Validation','IVR-21-00001: Your request has been approved.',7,0,5,0,'2021-05-19 06:28:52','2021-05-19 06:28:52'),(922,1,126,3,'Inventory Validation','IVR-21-00003: Your request has been approved.',7,0,5,0,'2021-05-19 06:29:07','2021-05-19 06:29:07'),(923,1,126,4,'Inventory Validation','IVR-21-00004: Your request has been approved.',7,0,5,0,'2021-05-19 06:29:20','2021-05-19 06:29:20'),(924,4,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-19 06:30:14','2021-05-19 06:30:14'),(925,1,47,1,'Purchase Order','P0-21-00001: Your request has been approved.',7,0,4,0,'2021-05-19 06:32:14','2021-05-19 06:32:14'),(926,4,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 07:00:16','2021-05-19 07:00:16'),(927,4,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 07:00:53','2021-05-19 07:00:53'),(928,4,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 07:12:15','2021-05-19 07:12:15'),(929,1,46,8,'Purchase Request','PR-21-00008: Your request has been denied.',1,0,4,0,'2021-05-19 07:13:09','2021-05-19 07:13:09'),(930,2,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 07:14:28','2021-05-19 07:14:28'),(931,2,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 07:14:41','2021-05-19 07:14:41'),(932,7,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 07:15:28','2021-05-19 07:15:28'),(933,7,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 07:15:46','2021-05-19 07:15:46'),(934,1,46,9,'Purchase Request','PR-21-00009: Your request has been approved.',7,0,7,0,'2021-05-19 07:16:33','2021-05-19 07:16:33'),(935,1,46,10,'Purchase Request','PR-21-00010: Your request has been approved.',7,0,7,0,'2021-05-19 07:16:43','2021-05-19 07:16:43'),(936,1,126,7,'Inventory Validation','IVR-21-00007: Your request has been denied.',1,0,2,0,'2021-05-19 07:21:14','2021-05-19 07:21:14'),(937,4,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 07:28:52','2021-05-19 07:28:52'),(938,4,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 07:29:23','2021-05-19 07:29:23'),(939,4,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 07:30:02','2021-05-19 07:30:02'),(940,1,40,5,'Bid Recap','BRF-21-00005: Your request has been denied.',1,0,2,0,'2021-05-19 07:30:39','2021-05-19 07:30:39'),(941,20,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 07:31:43','2021-05-19 07:31:43'),(942,20,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 07:31:58','2021-05-19 07:31:58'),(943,20,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 07:32:15','2021-05-19 07:32:15'),(944,1,40,2,'Bid Recap','BRF-21-00002: Your request has been approved.',7,0,20,0,'2021-05-19 07:34:02','2021-05-19 07:34:02'),(945,1,40,3,'Bid Recap','BRF-21-00003: Your request has been approved.',7,0,20,0,'2021-05-19 07:34:20','2021-05-19 07:34:20'),(946,1,40,4,'Bid Recap','BRF-21-00004: Your request has been approved.',7,0,20,0,'2021-05-19 07:34:38','2021-05-19 07:34:38'),(947,2,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 07:38:14','2021-05-19 07:38:14'),(948,2,49,1,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 22:52:52','2021-05-19 22:52:52'),(949,2,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 22:53:51','2021-05-19 22:53:51'),(950,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-20 00:01:34','2021-05-20 00:01:34'),(951,20,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-20 00:08:22','2021-05-20 00:08:22'),(952,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-20 00:10:44','2021-05-20 00:10:44'),(953,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,0,2,0,'2021-05-20 00:13:07','2021-05-20 00:13:07'),(954,20,39,1,'Bill of Material','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-20 01:07:45','2021-05-20 01:07:45'),(955,2,39,1,'Bill of Material','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-20 01:11:01','2021-05-20 01:11:01'),(956,1,39,1,'Bill of Material','BOM-21-00001: Your request has been approved.',7,0,2,0,'2021-05-20 01:11:43','2021-05-20 01:11:43'),(957,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-20 01:28:55','2021-05-20 01:28:55'),(958,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-20 01:32:51','2021-05-20 01:32:51'),(959,2,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-20 01:38:35','2021-05-20 01:38:35'),(960,7,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-20 01:39:43','2021-05-20 01:39:43'),(961,1,46,2,'Purchase Request','PR-21-00002: Your request has been approved.',7,0,7,0,'2021-05-20 01:40:22','2021-05-20 01:40:22'),(962,4,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-20 01:58:41','2021-05-20 01:58:41'),(963,5,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-20 01:59:20','2021-05-20 01:59:20'),(964,1,126,1,'Inventory Validation','IVR-21-00001: Your request has been approved.',7,0,5,0,'2021-05-20 02:00:05','2021-05-20 02:00:05'),(965,4,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-20 02:17:22','2021-05-20 02:17:22'),(966,20,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-20 02:17:55','2021-05-20 02:17:55'),(967,1,40,1,'Bid Recap','BRF-21-00001: Your request has been approved.',7,0,20,0,'2021-05-20 02:18:44','2021-05-20 02:18:44'),(968,2,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-20 02:34:07','2021-05-20 02:34:07'),(969,5,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-20 02:35:05','2021-05-20 02:35:05'),(970,4,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-20 02:35:43','2021-05-20 02:35:43'),(971,1,47,1,'Purchase Order','P0-21-00001: Your request has been approved.',7,0,4,0,'2021-05-20 02:36:29','2021-05-20 02:36:29'),(972,2,49,1,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-20 02:49:47','2021-05-20 02:49:47'),(973,4,49,1,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-20 02:51:51','2021-05-20 02:51:51'),(974,5,49,1,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-20 02:52:37','2021-05-20 02:52:37'),(975,1,49,1,'Service Requisition','SR-21-00001: Your request has been approved.',7,0,5,0,'2021-05-20 02:53:25','2021-05-20 02:53:25'),(976,2,41,1,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-20 02:56:35','2021-05-20 02:56:35'),(977,4,41,1,'Service Order','Akosi Admin asked for your approval.',2,1,2,4,'2021-05-20 02:57:42','2021-05-20 02:57:59'),(978,5,41,1,'Service Order','Akosi Admin asked for your approval.',2,1,4,5,'2021-05-20 02:58:13','2021-05-20 02:58:33'),(979,1,41,1,'Service Order','P0-21-00001: Your request has been approved.',7,0,5,0,'2021-05-20 02:58:47','2021-05-20 02:58:47'),(980,2,128,1,'Service Completion','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-20 03:01:23','2021-05-20 03:01:23'),(981,4,60,18,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-20 05:29:57','2021-05-20 05:29:57'),(982,2,36,1,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 01:10:46','2021-05-21 01:10:46'),(983,1,36,1,'Disposal Item','ADF-21-00001: Your request has been denied.',1,0,2,0,'2021-05-21 01:11:29','2021-05-21 01:11:29'),(984,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 01:12:04','2021-05-21 01:12:04'),(985,2,36,3,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 01:17:52','2021-05-21 01:17:52'),(986,2,36,4,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 01:29:19','2021-05-21 01:29:19'),(987,2,36,5,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 01:44:28','2021-05-21 01:44:28'),(988,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 02:59:51','2021-05-21 02:59:51'),(989,2,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-21 03:01:24','2021-05-21 03:01:24'),(990,2,35,1,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 03:02:01','2021-05-21 03:02:01'),(991,7,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-21 03:02:34','2021-05-21 03:02:34'),(992,1,46,3,'Purchase Request','PR-21-00003: Your request has been approved.',7,0,7,0,'2021-05-21 03:03:15','2021-05-21 03:03:15'),(993,4,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-21 03:05:50','2021-05-21 03:05:50'),(994,5,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-21 03:06:35','2021-05-21 03:06:35'),(995,1,126,2,'Inventory Validation','IVR-21-00002: Your request has been approved.',7,0,5,0,'2021-05-21 03:07:44','2021-05-21 03:07:44'),(996,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 03:12:37','2021-05-21 03:12:37'),(997,2,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-21 03:15:31','2021-05-21 03:15:31'),(998,7,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,2,7,'2021-05-21 03:16:21','2021-05-24 23:30:30'),(999,1,46,4,'Purchase Request','PR-21-00004: Your request has been approved.',7,0,7,0,'2021-05-21 03:17:55','2021-05-21 03:17:55'),(1000,1,126,3,'Inventory Validation','IVR-21-00003: Your request has been denied.',1,1,2,1,'2021-05-21 03:38:37','2021-05-24 13:14:01'),(1001,2,36,6,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 03:44:06','2021-05-21 03:44:06'),(1002,2,36,7,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 03:44:43','2021-05-21 03:44:43'),(1003,2,36,8,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 03:45:14','2021-05-21 03:45:14'),(1004,2,36,9,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 03:53:51','2021-05-21 03:53:51'),(1005,2,36,10,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 05:09:05','2021-05-21 05:09:05'),(1006,2,36,14,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 07:39:29','2021-05-21 07:39:29'),(1007,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-24 02:06:48','2021-05-24 02:06:48'),(1008,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-24 03:15:07','2021-05-24 03:15:07'),(1009,2,36,1,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-24 07:01:26','2021-05-24 07:01:26'),(1010,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-24 07:07:01','2021-05-24 07:07:01'),(1011,2,36,4,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-24 08:25:47','2021-05-24 08:25:47'),(1012,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-24 22:59:32','2021-05-24 22:59:32'),(1013,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-24 23:27:17','2021-05-24 23:27:17'),(1014,2,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-24 23:28:48','2021-05-24 23:28:48'),(1015,2,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-24 23:28:59','2021-05-24 23:28:59'),(1016,7,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,1,2,7,'2021-05-24 23:29:44','2021-05-24 23:30:42'),(1017,7,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,1,2,7,'2021-05-24 23:29:53','2021-05-24 23:30:10'),(1018,1,46,6,'Purchase Request','PR-21-00006: Your request has been approved.',7,0,7,0,'2021-05-24 23:30:24','2021-05-24 23:30:24'),(1019,1,46,1,'Purchase Request','PR-21-00001: Your request has been approved.',7,0,7,0,'2021-05-24 23:30:54','2021-05-24 23:30:54'),(1020,4,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-24 23:54:31','2021-05-24 23:54:31'),(1021,4,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-24 23:56:01','2021-05-24 23:56:01'),(1022,4,126,6,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-24 23:56:19','2021-05-24 23:56:19'),(1023,5,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-24 23:59:40','2021-05-24 23:59:40'),(1024,5,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-24 23:59:53','2021-05-24 23:59:53'),(1025,5,126,6,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 00:00:05','2021-05-25 00:00:05'),(1026,4,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 00:00:21','2021-05-25 00:00:21'),(1027,2,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 00:01:45','2021-05-25 00:01:45'),(1028,7,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 00:02:30','2021-05-25 00:02:30'),(1029,1,46,7,'Purchase Request','PR-21-00007: Your request has been approved.',7,0,7,0,'2021-05-25 00:03:18','2021-05-25 00:03:18'),(1030,1,126,4,'Inventory Validation','IVR-21-00004: Your request has been approved.',7,0,5,0,'2021-05-25 00:03:36','2021-05-25 00:03:36'),(1031,1,126,5,'Inventory Validation','IVR-21-00005: Your request has been approved.',7,0,5,0,'2021-05-25 00:03:51','2021-05-25 00:03:51'),(1032,1,126,6,'Inventory Validation','IVR-21-00006: Your request has been approved.',7,0,5,0,'2021-05-25 00:04:23','2021-05-25 00:04:23'),(1033,4,126,7,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 00:06:09','2021-05-25 00:06:09'),(1034,5,126,7,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 00:06:58','2021-05-25 00:06:58'),(1035,1,126,7,'Inventory Validation','IVR-21-00007: Your request has been approved.',7,0,5,0,'2021-05-25 00:08:20','2021-05-25 00:08:20'),(1036,4,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 00:11:37','2021-05-25 00:11:37'),(1037,20,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 00:12:21','2021-05-25 00:12:21'),(1038,1,40,2,'Bid Recap','BRF-21-00002: Your request has been approved.',7,0,20,0,'2021-05-25 00:14:53','2021-05-25 00:14:53'),(1039,2,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 00:16:25','2021-05-25 00:16:25'),(1040,4,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 00:39:39','2021-05-25 00:39:39'),(1041,4,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 00:40:12','2021-05-25 00:40:12'),(1042,20,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 00:41:12','2021-05-25 00:41:12'),(1043,20,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 00:41:36','2021-05-25 00:41:36'),(1044,1,40,3,'Bid Recap','BRF-21-00003: Your request has been approved.',7,0,20,0,'2021-05-25 00:47:53','2021-05-25 00:47:53'),(1045,1,40,4,'Bid Recap','BRF-21-00004: Your request has been approved.',7,0,20,0,'2021-05-25 00:48:06','2021-05-25 00:48:06'),(1046,5,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:04:46','2021-05-25 01:04:46'),(1047,4,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:05:32','2021-05-25 01:05:32'),(1048,1,47,2,'Purchase Order','P0-21-00002: Your request has been approved.',7,0,4,0,'2021-05-25 01:06:30','2021-05-25 01:06:30'),(1049,2,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 01:21:52','2021-05-25 01:21:52'),(1050,2,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 01:23:08','2021-05-25 01:23:08'),(1051,2,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 01:24:09','2021-05-25 01:24:09'),(1052,2,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 01:24:47','2021-05-25 01:24:47'),(1053,2,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 01:25:26','2021-05-25 01:25:26'),(1054,2,47,8,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 01:25:57','2021-05-25 01:25:57'),(1055,2,47,9,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 01:27:25','2021-05-25 01:27:25'),(1056,2,47,10,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 01:28:17','2021-05-25 01:28:17'),(1057,5,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:36:34','2021-05-25 01:36:34'),(1058,5,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:38:18','2021-05-25 01:38:18'),(1059,5,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:38:34','2021-05-25 01:38:34'),(1060,5,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:39:02','2021-05-25 01:39:02'),(1061,5,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:43:19','2021-05-25 01:43:19'),(1062,5,47,10,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:48:44','2021-05-25 01:48:44'),(1063,5,47,9,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:49:41','2021-05-25 01:49:41'),(1064,5,47,8,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:51:08','2021-05-25 01:51:08'),(1065,4,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:52:00','2021-05-25 01:52:00'),(1066,4,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:52:15','2021-05-25 01:52:15'),(1067,4,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:52:41','2021-05-25 01:52:41'),(1068,4,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:53:01','2021-05-25 01:53:01'),(1069,4,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:53:18','2021-05-25 01:53:18'),(1070,4,47,8,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:53:35','2021-05-25 01:53:35'),(1071,4,47,9,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:54:00','2021-05-25 01:54:00'),(1072,4,47,10,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:54:18','2021-05-25 01:54:18'),(1073,1,47,3,'Purchase Order','P0-21-00003: Your request has been approved.',7,0,4,0,'2021-05-25 01:55:46','2021-05-25 01:55:46'),(1074,1,47,5,'Purchase Order','P0-21-00005: Your request has been approved.',7,0,4,0,'2021-05-25 01:56:00','2021-05-25 01:56:00'),(1075,1,47,7,'Purchase Order','P0-21-00007: Your request has been approved.',7,0,4,0,'2021-05-25 01:56:21','2021-05-25 01:56:21'),(1076,1,47,4,'Purchase Order','P0-21-00004: Your request has been approved.',7,0,4,0,'2021-05-25 01:56:40','2021-05-25 01:56:40'),(1077,1,47,6,'Purchase Order','P0-21-00006: Your request has been approved.',7,0,4,0,'2021-05-25 01:57:01','2021-05-25 01:57:01'),(1078,1,47,8,'Purchase Order','P0-21-00008: Your request has been approved.',7,0,4,0,'2021-05-25 01:57:16','2021-05-25 01:57:16'),(1079,1,47,9,'Purchase Order','P0-21-00009: Your request has been approved.',7,0,4,0,'2021-05-25 01:57:33','2021-05-25 01:57:33'),(1080,1,47,10,'Purchase Order','P0-21-00010: Your request has been approved.',7,0,4,0,'2021-05-25 01:57:58','2021-05-25 01:57:58'),(1081,4,33,1,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 02:28:34','2021-05-25 02:28:34'),(1082,4,33,2,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 02:30:02','2021-05-25 02:30:02'),(1083,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 02:30:09','2021-05-25 02:30:09'),(1084,20,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 02:33:26','2021-05-25 02:33:26'),(1085,4,33,3,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 02:33:28','2021-05-25 02:33:28'),(1086,2,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-25 02:35:49','2021-05-25 02:35:49'),(1087,4,33,4,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 02:35:58','2021-05-25 02:35:58'),(1088,4,33,5,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 02:36:13','2021-05-25 02:36:13'),(1089,1,38,5,'Cost Estimate','CEF-21-00005: Your request has been approved.',7,0,2,0,'2021-05-25 02:38:24','2021-05-25 02:38:24'),(1090,4,33,6,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 02:43:55','2021-05-25 02:43:55'),(1091,4,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 02:49:42','2021-05-25 02:49:42'),(1092,4,33,7,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 03:05:11','2021-05-25 03:05:11'),(1093,4,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 03:05:16','2021-05-25 03:05:16'),(1094,2,33,1,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 03:07:27','2021-05-25 03:07:27'),(1095,1,33,2,'Inventory  Receiving','INRR-21-00002: Your request has been denied.',1,0,4,0,'2021-05-25 03:09:07','2021-05-25 03:09:07'),(1096,2,33,3,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 03:09:21','2021-05-25 03:09:21'),(1097,2,33,4,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 03:09:32','2021-05-25 03:09:32'),(1098,2,33,5,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 03:09:43','2021-05-25 03:09:43'),(1099,2,33,6,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 03:10:05','2021-05-25 03:10:05'),(1100,2,33,7,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 03:10:20','2021-05-25 03:10:20'),(1101,5,33,1,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 03:12:58','2021-05-25 03:12:58'),(1102,5,33,3,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 03:13:10','2021-05-25 03:13:10'),(1103,5,33,4,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 03:13:24','2021-05-25 03:13:24'),(1104,5,33,5,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 03:13:38','2021-05-25 03:13:38'),(1105,5,33,6,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 03:13:50','2021-05-25 03:13:50'),(1106,5,33,7,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 03:27:57','2021-05-25 03:27:57'),(1107,1,33,1,'Inventory  Receiving','INRR-21-00001: Your request has been approved.',7,0,5,0,'2021-05-25 03:29:23','2021-05-25 03:29:23'),(1108,1,33,3,'Inventory  Receiving','INRR-21-00003: Your request has been approved.',7,0,5,0,'2021-05-25 03:29:33','2021-05-25 03:29:33'),(1109,1,33,4,'Inventory  Receiving','INRR-21-00004: Your request has been approved.',7,0,5,0,'2021-05-25 03:29:42','2021-05-25 03:29:42'),(1110,1,33,5,'Inventory  Receiving','INRR-21-00005: Your request has been approved.',7,0,5,0,'2021-05-25 03:29:53','2021-05-25 03:29:53'),(1111,1,33,6,'Inventory  Receiving','INRR-21-00006: Your request has been approved.',7,0,5,0,'2021-05-25 03:30:03','2021-05-25 03:30:03'),(1112,1,33,7,'Inventory  Receiving','INRR-21-00007: Your request has been approved.',7,0,5,0,'2021-05-25 03:30:40','2021-05-25 03:30:40'),(1113,4,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 03:32:24','2021-05-25 03:32:24'),(1114,20,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 03:33:10','2021-05-25 03:33:10'),(1115,2,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-25 03:34:04','2021-05-25 03:34:04'),(1116,1,38,6,'Cost Estimate','CEF-21-00006: Your request has been approved.',7,0,2,0,'2021-05-25 03:35:07','2021-05-25 03:35:07'),(1117,20,39,3,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 05:15:09','2021-05-25 05:15:09'),(1118,4,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 05:22:45','2021-05-25 05:22:45'),(1119,2,39,3,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-25 05:24:51','2021-05-25 05:24:51'),(1120,2,35,2,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 05:25:22','2021-05-25 05:25:22'),(1121,1,39,3,'Project Budget Rationale','PBR-21-00003: Your request has been approved.',7,0,2,0,'2021-05-25 05:25:44','2021-05-25 05:25:44'),(1122,4,33,8,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 05:26:49','2021-05-25 05:26:49'),(1123,2,33,8,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 05:27:44','2021-05-25 05:27:44'),(1124,5,33,8,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 05:29:53','2021-05-25 05:29:53'),(1125,4,46,11,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 05:31:09','2021-05-25 05:31:09'),(1126,2,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 05:32:53','2021-05-25 05:32:53'),(1127,7,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 05:35:14','2021-05-25 05:35:14'),(1128,1,33,8,'Inventory  Receiving','INRR-21-00008: Your request has been approved.',7,0,5,0,'2021-05-25 05:35:23','2021-05-25 05:35:23'),(1129,2,35,3,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 05:57:54','2021-05-25 05:57:54'),(1130,2,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 06:43:54','2021-05-25 06:43:54'),(1131,2,46,11,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 06:44:06','2021-05-25 06:44:06'),(1132,7,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 06:49:32','2021-05-25 06:49:32'),(1133,7,46,11,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 06:49:41','2021-05-25 06:49:41'),(1134,1,46,9,'Purchase Request','PR-21-00009: Your request has been approved.',7,0,7,0,'2021-05-25 06:51:34','2021-05-25 06:51:34'),(1135,1,46,11,'Purchase Request','PR-21-00011: Your request has been approved.',7,0,7,0,'2021-05-25 06:51:46','2021-05-25 06:51:46'),(1136,4,126,8,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 06:56:41','2021-05-25 06:56:41'),(1137,5,126,8,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 06:57:26','2021-05-25 06:57:26'),(1138,1,126,8,'Inventory Validation','IVR-21-00008: Your request has been approved.',7,0,5,0,'2021-05-25 06:58:16','2021-05-25 06:58:16'),(1139,4,38,11,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 07:47:24','2021-05-25 07:47:24'),(1140,20,38,11,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 07:47:50','2021-05-25 07:47:50'),(1141,1,46,10,'Purchase Request','PR-21-00010: Your request has been approved.',7,0,7,0,'2021-05-25 07:48:28','2021-05-25 07:48:28'),(1142,2,38,11,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-25 07:49:21','2021-05-25 07:49:21'),(1143,1,38,11,'Cost Estimate','CEF-21-00011: Your request has been approved.',7,0,2,0,'2021-05-25 07:50:10','2021-05-25 07:50:10'),(1144,4,40,7,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 07:56:30','2021-05-25 07:56:30'),(1145,20,40,7,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 07:57:08','2021-05-25 07:57:08'),(1146,1,40,7,'Bid Recap','BRF-21-00007: Your request has been approved.',7,0,20,0,'2021-05-25 07:58:08','2021-05-25 07:58:08'),(1147,4,60,19,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 08:00:24','2021-05-25 08:00:24'),(1148,2,47,11,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 08:00:54','2021-05-25 08:00:54'),(1149,6,60,19,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 08:01:30','2021-05-25 08:01:30'),(1150,5,47,11,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 08:03:28','2021-05-25 08:03:28'),(1151,4,47,11,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 08:04:19','2021-05-25 08:04:19'),(1152,5,60,19,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,6,0,'2021-05-25 08:04:43','2021-05-25 08:04:43'),(1153,1,47,11,'Purchase Order','P0-21-00011: Your request has been approved.',7,0,4,0,'2021-05-25 08:05:07','2021-05-25 08:05:07'),(1154,1,60,19,'Change Schedule Form','SCH-21-00019: Your request has been approved.',7,0,5,0,'2021-05-25 08:05:12','2021-05-25 08:05:12'),(1155,4,60,20,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 08:07:00','2021-05-25 08:07:00'),(1156,2,36,1,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 22:54:14','2021-05-25 22:54:14'),(1157,2,36,3,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 22:56:26','2021-05-25 22:56:26'),(1158,2,36,4,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 22:57:57','2021-05-25 22:57:57'),(1159,2,36,5,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 22:58:40','2021-05-25 22:58:40'),(1160,1,36,3,'Disposal Item','ADF-21-00003: Your request has been denied.',1,0,2,0,'2021-05-25 23:00:02','2021-05-25 23:00:02'),(1161,3,36,4,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 23:00:41','2021-05-25 23:00:41'),(1162,3,36,5,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 23:00:58','2021-05-25 23:00:58'),(1163,4,36,4,'Disposal Item','Akosi Admin asked for your approval.',2,0,3,0,'2021-05-25 23:05:10','2021-05-25 23:05:10'),(1164,4,36,5,'Disposal Item','Akosi Admin asked for your approval.',2,0,3,0,'2021-05-25 23:05:20','2021-05-25 23:05:20'),(1165,1,36,4,'Disposal Item','ADF-21-00004: Your request has been approved.',7,0,4,0,'2021-05-25 23:06:18','2021-05-25 23:06:18'),(1166,1,36,5,'Disposal Item','ADF-21-00005: Your request has been approved.',7,0,4,0,'2021-05-25 23:06:31','2021-05-25 23:06:31'),(1167,2,36,7,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 23:09:38','2021-05-25 23:09:38'),(1168,2,36,8,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 23:10:29','2021-05-25 23:10:29'),(1169,4,60,21,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 23:47:26','2021-05-25 23:47:26'),(1170,2,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 23:52:18','2021-05-25 23:52:18'),(1171,4,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 23:56:14','2021-05-25 23:56:14'),(1172,5,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 23:56:57','2021-05-25 23:56:57'),(1173,1,49,2,'Service Requisition','SR-21-00002: Your request has been approved.',7,0,5,0,'2021-05-25 23:57:43','2021-05-25 23:57:43'),(1174,2,49,3,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:01:26','2021-05-26 00:01:26'),(1175,2,49,3,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:03:20','2021-05-26 00:03:20'),(1176,2,49,3,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:06:44','2021-05-26 00:06:44'),(1177,2,49,3,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:07:56','2021-05-26 00:07:56'),(1178,4,38,12,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:11:41','2021-05-26 00:11:41'),(1179,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:14:09','2021-05-26 00:14:09'),(1180,2,49,3,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:17:33','2021-05-26 00:17:33'),(1181,1,49,3,'Service Requisition','SR-21-00003: Your request has been denied.',1,0,2,0,'2021-05-26 00:17:56','2021-05-26 00:17:56'),(1182,2,49,4,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:18:38','2021-05-26 00:18:38'),(1183,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:30:01','2021-05-26 00:30:01'),(1184,20,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 00:49:31','2021-05-26 00:49:31'),(1185,20,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 00:50:02','2021-05-26 00:50:02'),(1186,20,38,12,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 00:51:15','2021-05-26 00:51:15'),(1187,2,38,12,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-26 00:57:59','2021-05-26 00:57:59'),(1188,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-26 00:58:50','2021-05-26 00:58:50'),(1189,2,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-26 01:00:00','2021-05-26 01:00:00'),(1190,1,38,12,'Cost Estimate','CEF-21-00012: Your request has been approved.',7,0,2,0,'2021-05-26 01:01:25','2021-05-26 01:01:25'),(1191,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been approved.',7,0,2,0,'2021-05-26 01:01:40','2021-05-26 01:01:40'),(1192,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,0,2,0,'2021-05-26 01:02:39','2021-05-26 01:02:39'),(1193,4,38,13,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 01:10:25','2021-05-26 01:10:25'),(1194,1,38,13,'Cost Estimate','CEF-21-00013: Your request has been denied.',1,0,4,0,'2021-05-26 01:41:20','2021-05-26 01:41:20'),(1195,2,36,9,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 01:41:55','2021-05-26 01:41:55'),(1196,4,38,14,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 01:43:01','2021-05-26 01:43:01'),(1197,1,38,14,'Cost Estimate','CEF-21-00014: Your request has been denied.',1,0,4,0,'2021-05-26 01:46:32','2021-05-26 01:46:32'),(1198,4,38,15,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 01:49:00','2021-05-26 01:49:00'),(1199,1,36,9,'Disposal Item','ADF-21-00009: Your request has been denied.',1,0,2,0,'2021-05-26 01:52:57','2021-05-26 01:52:57'),(1200,2,36,10,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 01:54:28','2021-05-26 01:54:28'),(1201,4,42,1,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 01:55:23','2021-05-26 01:55:23'),(1202,4,42,2,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 01:56:47','2021-05-26 01:56:47'),(1203,5,44,1,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 02:02:24','2021-05-26 02:02:24'),(1204,5,44,2,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 02:03:18','2021-05-26 02:03:18'),(1205,2,44,2,'Inventory Incident','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-26 02:23:08','2021-05-26 02:23:08'),(1206,4,126,12,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 02:26:03','2021-05-26 02:26:03'),(1207,5,126,12,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 02:27:23','2021-05-26 02:27:23'),(1208,1,126,12,'Inventory Validation','IVR-21-00012: Your request has been approved.',7,0,5,0,'2021-05-26 02:28:55','2021-05-26 02:28:55'),(1209,4,44,2,'Inventory Incident','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 02:35:17','2021-05-26 02:35:17'),(1210,1,44,2,'Inventory Incident','IR-21-00002: Your request has been approved.',7,0,4,0,'2021-05-26 02:38:10','2021-05-26 02:38:10'),(1211,4,38,17,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 02:47:17','2021-05-26 02:47:17'),(1212,2,42,2,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 02:55:15','2021-05-26 02:55:15'),(1213,5,42,2,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 02:56:12','2021-05-26 02:56:12'),(1214,1,42,2,'Material Withdrawal','MWF-21-00002: Your request has been approved.',7,0,5,0,'2021-05-26 02:56:53','2021-05-26 02:56:53'),(1215,4,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 02:57:13','2021-05-26 02:57:13'),(1216,4,42,3,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 02:58:53','2021-05-26 02:58:53'),(1217,2,42,3,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 02:59:46','2021-05-26 02:59:46'),(1218,5,42,3,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 03:00:43','2021-05-26 03:00:43'),(1219,1,42,3,'Material Withdrawal','MWF-21-00003: Your request has been approved.',7,0,5,0,'2021-05-26 03:01:47','2021-05-26 03:01:47'),(1220,4,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:02:10','2021-05-26 03:02:10'),(1221,2,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 03:06:23','2021-05-26 03:06:23'),(1222,5,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 03:08:46','2021-05-26 03:08:46'),(1223,1,43,3,'Borrowing Item','EBF-21-00003: Your request has been approved.',7,0,5,0,'2021-05-26 03:09:33','2021-05-26 03:09:33'),(1224,2,36,11,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:37:38','2021-05-26 03:37:38'),(1225,2,35,1,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:39:17','2021-05-26 03:39:17'),(1226,3,36,11,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 03:39:56','2021-05-26 03:39:56'),(1227,1,36,11,'Disposal Item','ADF-21-00011: Your request has been denied.',1,0,3,0,'2021-05-26 03:40:44','2021-05-26 03:40:44'),(1228,2,47,12,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:41:04','2021-05-26 03:41:04'),(1229,2,36,12,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:42:41','2021-05-26 03:42:41'),(1230,2,36,10,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:43:35','2021-05-26 03:43:35'),(1231,4,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:45:23','2021-05-26 03:45:23'),(1232,2,35,1,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:57:20','2021-05-26 03:57:20'),(1233,2,47,13,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:59:46','2021-05-26 03:59:46'),(1234,5,35,1,'Return Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 04:00:30','2021-05-26 04:00:30'),(1235,4,35,1,'Return Item','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-26 04:01:17','2021-05-26 04:01:17'),(1236,1,35,1,'Return Item','RI-21-00001: Your request has been approved.',7,0,4,0,'2021-05-26 04:01:59','2021-05-26 04:01:59'),(1237,1,47,12,'Purchase Order','P0-21-00012: Your request has been denied.',1,0,2,0,'2021-05-26 04:19:45','2021-05-26 04:19:45'),(1238,2,35,3,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 04:23:26','2021-05-26 04:23:26'),(1239,2,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 04:24:31','2021-05-26 04:24:31'),(1240,2,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 04:24:57','2021-05-26 04:24:57'),(1241,2,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 04:25:07','2021-05-26 04:25:07'),(1242,5,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 04:25:43','2021-05-26 04:25:43'),(1243,1,43,2,'Return Item','EBF-21-00002: Your request has been denied.',1,0,2,0,'2021-05-26 04:25:57','2021-05-26 04:25:57'),(1244,5,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 04:26:14','2021-05-26 04:26:14'),(1245,1,43,1,'Borrowing Item','EBF-21-00001: Your request has been approved.',7,0,5,0,'2021-05-26 04:26:48','2021-05-26 04:26:48'),(1246,1,43,4,'Borrowing Item','EBF-21-00004: Your request has been approved.',7,0,5,0,'2021-05-26 04:27:00','2021-05-26 04:27:00'),(1247,2,35,4,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 04:28:49','2021-05-26 04:28:49'),(1248,2,36,14,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:08:56','2021-05-26 05:08:56'),(1249,2,36,15,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:09:56','2021-05-26 05:09:56'),(1250,4,43,5,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:12:00','2021-05-26 05:12:00'),(1251,4,43,6,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:14:11','2021-05-26 05:14:11'),(1252,4,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:17:45','2021-05-26 05:17:45'),(1253,4,43,7,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:19:13','2021-05-26 05:19:13'),(1254,20,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 05:19:49','2021-05-26 05:19:49'),(1255,2,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-26 05:21:15','2021-05-26 05:21:15'),(1256,4,43,8,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:21:38','2021-05-26 05:21:38'),(1257,1,38,18,'Cost Estimate','CEF-21-00018: Your request has been approved.',7,0,2,0,'2021-05-26 05:23:01','2021-05-26 05:23:01'),(1258,4,43,9,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:24:49','2021-05-26 05:24:49'),(1259,20,39,6,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 05:31:59','2021-05-26 05:31:59'),(1260,2,35,2,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:32:46','2021-05-26 05:32:46'),(1261,2,39,6,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-26 05:33:12','2021-05-26 05:33:12'),(1262,1,39,6,'Project Budget Rationale','PBR-21-00006: Your request has been approved.',7,0,2,0,'2021-05-26 05:34:21','2021-05-26 05:34:21'),(1263,4,42,4,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:38:53','2021-05-26 05:38:53'),(1264,4,42,5,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:43:34','2021-05-26 05:43:34'),(1265,2,37,3,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:48:56','2021-05-26 05:48:56'),(1266,1,37,3,'Transfer Request','TR-21-00003: Your request has been denied.',1,0,2,0,'2021-05-26 05:55:34','2021-05-26 05:55:34'),(1267,4,60,21,'Change Schedule','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:57:53','2021-05-26 05:57:53'),(1268,2,37,6,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:59:00','2021-05-26 05:59:00'),(1269,4,60,22,'Change Schedule','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:59:00','2021-05-26 05:59:00'),(1270,4,42,6,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:59:29','2021-05-26 05:59:29'),(1271,4,60,22,'Change Schedule','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:59:34','2021-05-26 05:59:34'),(1272,1,60,22,'Change Schedule','SCH-21-00022: Your request has been denied.',1,0,4,0,'2021-05-26 06:00:56','2021-05-26 06:00:56'),(1273,4,60,23,'Change Schedule','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 06:03:19','2021-05-26 06:03:19'),(1274,2,37,7,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 06:13:09','2021-05-26 06:13:09'),(1275,2,49,1,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 06:18:05','2021-05-26 06:18:05'),(1276,4,49,1,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 06:20:04','2021-05-26 06:20:04'),(1277,5,49,1,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 06:21:00','2021-05-26 06:21:00'),(1278,1,49,1,'Service Requisition','SR-21-00001: Your request has been approved.',7,0,5,0,'2021-05-26 06:23:10','2021-05-26 06:23:10'),(1279,2,36,16,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 06:23:52','2021-05-26 06:23:52'),(1280,3,37,7,'Transfer Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 06:24:22','2021-05-26 06:24:22'),(1281,2,41,1,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 06:25:11','2021-05-26 06:25:11'),(1282,4,41,1,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 06:27:15','2021-05-26 06:27:15'),(1283,5,41,1,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 06:28:40','2021-05-26 06:28:40'),(1284,1,41,1,'Service Order','S0-21-00001: Your request has been denied.',1,0,5,0,'2021-05-26 06:30:52','2021-05-26 06:30:52'),(1285,1,37,7,'Transfer Request','TR-21-00007: Your request has been denied.',1,0,3,0,'2021-05-26 06:31:26','2021-05-26 06:31:26'),(1286,2,41,2,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 06:31:35','2021-05-26 06:31:35'),(1287,4,41,2,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 06:32:21','2021-05-26 06:32:21'),(1288,5,41,2,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 06:33:28','2021-05-26 06:33:28'),(1289,2,37,8,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 06:33:59','2021-05-26 06:33:59'),(1290,1,41,2,'Service Order','S0-21-00002: Your request has been approved.',7,0,5,0,'2021-05-26 06:34:23','2021-05-26 06:34:23'),(1291,1,37,8,'Transfer Request','TR-21-00008: Your request has been denied.',1,0,2,0,'2021-05-26 06:34:44','2021-05-26 06:34:44'),(1292,3,37,6,'Transfer Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 06:38:35','2021-05-26 06:38:35'),(1293,4,37,6,'Transfer Request','Akosi Admin asked for your approval.',2,0,3,0,'2021-05-26 06:39:05','2021-05-26 06:39:05'),(1294,1,37,6,'Transfer Request','TR-21-00006: Your request has been approved.',7,0,4,0,'2021-05-26 06:40:39','2021-05-26 06:40:39'),(1295,2,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:00:48','2021-05-26 07:00:48'),(1296,4,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 07:02:07','2021-05-26 07:02:07'),(1297,5,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 07:03:11','2021-05-26 07:03:11'),(1298,1,49,2,'Service Requisition','SR-21-00002: Your request has been approved.',7,0,5,0,'2021-05-26 07:04:05','2021-05-26 07:04:05'),(1299,2,41,3,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:04:39','2021-05-26 07:04:39'),(1300,2,41,3,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:05:06','2021-05-26 07:05:06'),(1301,1,41,3,'Service Order','S0-21-00003: Your request has been denied.',1,0,2,0,'2021-05-26 07:06:16','2021-05-26 07:06:16'),(1302,2,41,4,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:07:03','2021-05-26 07:07:03'),(1303,2,59,2,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:16:31','2021-05-26 07:16:31'),(1304,2,59,2,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:17:04','2021-05-26 07:17:04'),(1305,2,59,2,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:17:36','2021-05-26 07:17:36'),(1306,2,41,4,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:21:25','2021-05-26 07:21:25'),(1307,4,41,4,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 07:22:20','2021-05-26 07:22:20'),(1308,2,59,2,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:23:17','2021-05-26 07:23:17'),(1309,5,41,4,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 07:24:06','2021-05-26 07:24:06'),(1310,1,41,4,'Service Order','S0-21-00004: Your request has been approved.',7,0,5,0,'2021-05-26 07:25:26','2021-05-26 07:25:26'),(1311,3,59,2,'Loan Form','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 07:25:38','2021-05-26 07:25:38'),(1312,4,59,2,'Loan Form','Akosi Admin asked for your approval.',2,0,3,0,'2021-05-26 07:26:23','2021-05-26 07:26:23'),(1313,1,59,2,'Loan Form','LNF-21-00002: Your request has been approved.',7,0,4,0,'2021-05-26 07:27:01','2021-05-26 07:27:01'),(1314,4,43,10,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:40:15','2021-05-26 07:40:15'),(1315,2,36,17,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:40:20','2021-05-26 07:40:20'),(1316,2,43,10,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 07:42:36','2021-05-26 07:42:36'),(1317,5,43,10,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 07:43:16','2021-05-26 07:43:16'),(1318,1,43,10,'Borrowing Item','EBF-21-00010: Your request has been approved.',7,0,5,0,'2021-05-26 07:47:37','2021-05-26 07:47:37'),(1319,2,128,1,'Service Completion','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 08:00:55','2021-05-26 08:00:55'),(1320,2,128,1,'Service Completion','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 08:02:56','2021-05-26 08:02:56'),(1321,4,128,1,'Service Completion','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 08:04:03','2021-05-26 08:04:03'),(1322,4,43,12,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 08:04:14','2021-05-26 08:04:14'),(1323,4,43,13,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 08:04:30','2021-05-26 08:04:30'),(1324,5,128,1,'Service Completion','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 08:04:50','2021-05-26 08:04:50'),(1325,1,128,1,'Service Completion','SC-21-00001: Your request has been approved.',7,0,5,0,'2021-05-26 08:05:33','2021-05-26 08:05:33'),(1326,4,38,16,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 08:07:46','2021-05-26 08:07:46'),(1327,4,38,19,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 08:09:04','2021-05-26 08:09:04'),(1328,4,46,14,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 23:18:14','2021-05-26 23:18:14'),(1329,2,46,14,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 23:19:15','2021-05-26 23:19:15'),(1330,7,46,14,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 23:20:12','2021-05-26 23:20:12'),(1331,1,46,14,'Purchase Request','PR-21-00014: Your request has been approved.',7,0,7,0,'2021-05-26 23:21:08','2021-05-26 23:21:08'),(1332,4,38,23,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 00:18:13','2021-05-27 00:18:13'),(1333,4,38,24,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 00:26:28','2021-05-27 00:26:28'),(1334,4,38,25,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 00:30:10','2021-05-27 00:30:10'),(1335,4,38,26,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 00:30:10','2021-05-27 00:30:10'),(1336,4,38,16,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 00:31:53','2021-05-27 00:31:53'),(1337,20,38,25,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 00:32:30','2021-05-27 00:32:30'),(1338,1,38,7,'Cost Estimate','CEF-21-00007: Your request has been denied.',1,0,4,0,'2021-05-27 00:34:12','2021-05-27 00:34:12'),(1339,1,38,8,'Cost Estimate','CEF-21-00008: Your request has been denied.',1,0,4,0,'2021-05-27 00:34:29','2021-05-27 00:34:29'),(1340,20,38,15,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 00:34:44','2021-05-27 00:34:44'),(1341,20,38,19,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 00:35:01','2021-05-27 00:35:01'),(1342,20,38,23,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 00:35:17','2021-05-27 00:35:17'),(1343,20,38,24,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 00:35:45','2021-05-27 00:35:45'),(1344,20,38,26,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 00:36:03','2021-05-27 00:36:03'),(1345,20,38,16,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 00:36:23','2021-05-27 00:36:23'),(1346,4,46,16,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 00:40:21','2021-05-27 00:40:21'),(1347,4,46,17,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 00:40:54','2021-05-27 00:40:54'),(1348,4,46,18,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 00:41:25','2021-05-27 00:41:25'),(1349,2,46,16,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 01:32:27','2021-05-27 01:32:27'),(1350,2,46,17,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 01:32:39','2021-05-27 01:32:39'),(1351,2,46,18,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 01:34:18','2021-05-27 01:34:18'),(1352,7,46,16,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 01:35:10','2021-05-27 01:35:10'),(1353,7,46,17,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 01:35:22','2021-05-27 01:35:22'),(1354,7,46,18,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 01:35:36','2021-05-27 01:35:36'),(1355,1,46,16,'Purchase Request','PR-21-00016: Your request has been approved.',7,0,7,0,'2021-05-27 01:37:41','2021-05-27 01:37:41'),(1356,1,46,17,'Purchase Request','PR-21-00017: Your request has been approved.',7,0,7,0,'2021-05-27 01:37:51','2021-05-27 01:37:51'),(1357,1,46,18,'Purchase Request','PR-21-00018: Your request has been approved.',7,0,7,0,'2021-05-27 01:38:01','2021-05-27 01:38:01'),(1358,4,126,13,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:21:47','2021-05-27 02:21:47'),(1359,4,126,14,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:22:10','2021-05-27 02:22:10'),(1360,4,126,15,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:22:34','2021-05-27 02:22:34'),(1361,4,126,16,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:23:31','2021-05-27 02:23:31'),(1362,4,126,17,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:23:47','2021-05-27 02:23:47'),(1363,5,126,13,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 02:24:37','2021-05-27 02:24:37'),(1364,5,126,14,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 02:24:54','2021-05-27 02:24:54'),(1365,5,126,15,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 02:25:08','2021-05-27 02:25:08'),(1366,5,126,16,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 02:25:26','2021-05-27 02:25:26'),(1367,5,126,17,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 02:25:48','2021-05-27 02:25:48'),(1368,1,126,13,'Inventory Validation','IVR-21-00013: Your request has been approved.',7,0,5,0,'2021-05-27 02:27:17','2021-05-27 02:27:17'),(1369,1,126,15,'Inventory Validation','IVR-21-00015: Your request has been approved.',7,0,5,0,'2021-05-27 02:27:37','2021-05-27 02:27:37'),(1370,1,126,14,'Inventory Validation','IVR-21-00014: Your request has been approved.',7,0,5,0,'2021-05-27 02:27:55','2021-05-27 02:27:55'),(1371,1,126,16,'Inventory Validation','IVR-21-00016: Your request has been approved.',7,0,5,0,'2021-05-27 02:28:36','2021-05-27 02:28:36'),(1372,1,126,17,'Inventory Validation','IVR-21-00017: Your request has been approved.',7,0,5,0,'2021-05-27 02:29:10','2021-05-27 02:29:10'),(1373,4,40,8,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:45:57','2021-05-27 02:45:57'),(1374,4,40,10,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:47:01','2021-05-27 02:47:01'),(1375,4,40,11,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:47:36','2021-05-27 02:47:36'),(1376,4,40,12,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:48:19','2021-05-27 02:48:19'),(1377,20,40,8,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 02:53:54','2021-05-27 02:53:54'),(1378,20,40,10,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 02:54:12','2021-05-27 02:54:12'),(1379,20,40,11,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 02:54:32','2021-05-27 02:54:32'),(1380,20,40,12,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 02:54:58','2021-05-27 02:54:58'),(1381,1,40,8,'Bid Recap','BRF-21-00008: Your request has been approved.',7,0,20,0,'2021-05-27 02:55:54','2021-05-27 02:55:54'),(1382,1,40,10,'Bid Recap','BRF-21-00010: Your request has been approved.',7,0,20,0,'2021-05-27 02:56:11','2021-05-27 02:56:11'),(1383,1,40,11,'Bid Recap','BRF-21-00011: Your request has been approved.',7,0,20,0,'2021-05-27 02:56:46','2021-05-27 02:56:46'),(1384,1,40,12,'Bid Recap','BRF-21-00012: Your request has been approved.',7,0,20,0,'2021-05-27 02:57:05','2021-05-27 02:57:05'),(1385,4,33,9,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 03:23:40','2021-05-27 03:23:40'),(1386,4,33,10,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 03:36:05','2021-05-27 03:36:05'),(1387,4,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 03:58:31','2021-05-27 03:58:31'),(1388,4,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 04:01:44','2021-05-27 04:01:44'),(1389,4,42,7,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 04:02:36','2021-05-27 04:02:36'),(1390,2,33,9,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 05:20:17','2021-05-27 05:20:17'),(1391,5,33,9,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 05:21:12','2021-05-27 05:21:12'),(1392,1,33,9,'Inventory  Receiving','INRR-21-00009: Your request has been approved.',7,0,5,0,'2021-05-27 05:25:10','2021-05-27 05:25:10'),(1393,4,33,11,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 05:52:58','2021-05-27 05:52:58'),(1394,4,33,12,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 05:57:21','2021-05-27 05:57:21'),(1395,2,33,11,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 06:20:39','2021-05-27 06:20:39'),(1396,5,33,11,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 06:21:43','2021-05-27 06:21:43'),(1397,1,33,11,'Inventory  Receiving','INRR-21-00011: Your request has been approved.',7,0,5,0,'2021-05-27 06:22:18','2021-05-27 06:22:18'),(1398,2,36,1,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 06:23:29','2021-05-27 06:23:29'),(1399,3,36,1,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 06:25:36','2021-05-27 06:25:36'),(1400,4,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 06:26:30','2021-05-27 06:26:30'),(1401,4,36,1,'Disposal Item','Akosi Admin asked for your approval.',2,0,3,0,'2021-05-27 06:27:44','2021-05-27 06:27:44'),(1402,2,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 06:28:58','2021-05-27 06:28:58'),(1403,5,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 06:29:43','2021-05-27 06:29:43'),(1404,1,43,3,'Borrowing Item','EBF-21-00003: Your request has been approved.',7,0,5,0,'2021-05-27 06:30:36','2021-05-27 06:30:36'),(1405,1,36,1,'Disposal Item','ADF-21-00001: Your request has been approved.',7,0,4,0,'2021-05-27 06:31:20','2021-05-27 06:31:20'),(1406,2,35,1,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 06:33:40','2021-05-27 06:33:40'),(1407,2,35,2,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 06:34:34','2021-05-27 06:34:34'),(1408,2,42,6,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 06:35:54','2021-05-27 06:35:54'),(1409,2,42,7,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 06:36:03','2021-05-27 06:36:03'),(1410,5,35,2,'Return Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 06:36:35','2021-05-27 06:36:35'),(1411,5,42,6,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 06:36:48','2021-05-27 06:36:48'),(1412,5,42,7,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 06:36:56','2021-05-27 06:36:56'),(1413,1,35,2,'Return Item','RI-21-00002: Your request has been denied.',1,0,5,0,'2021-05-27 06:37:13','2021-05-27 06:37:13'),(1414,1,42,6,'Material Withdrawal','MWF-21-00006: Your request has been approved.',7,0,5,0,'2021-05-27 06:37:51','2021-05-27 06:37:51'),(1415,1,42,7,'Material Withdrawal','MWF-21-00007: Your request has been approved.',7,0,5,0,'2021-05-27 06:38:02','2021-05-27 06:38:02'),(1416,4,42,8,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 06:50:53','2021-05-27 06:50:53'),(1417,2,37,14,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:00:12','2021-05-27 07:00:12'),(1418,5,44,4,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:05:03','2021-05-27 07:05:03'),(1419,2,35,3,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:05:42','2021-05-27 07:05:42'),(1420,1,37,14,'Transfer Request','TR-21-00014: Your request has been denied.',1,0,2,0,'2021-05-27 07:06:58','2021-05-27 07:06:58'),(1421,2,42,8,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 07:17:46','2021-05-27 07:17:46'),(1422,5,42,8,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 07:18:33','2021-05-27 07:18:33'),(1423,1,42,8,'Material Withdrawal','MWF-21-00008: Your request has been approved.',7,0,5,0,'2021-05-27 07:19:17','2021-05-27 07:19:17'),(1424,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:20:01','2021-05-27 07:20:01'),(1425,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:20:51','2021-05-27 07:20:51'),(1426,2,37,15,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:34:44','2021-05-27 07:34:44'),(1427,2,59,3,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:34:49','2021-05-27 07:34:49'),(1428,2,59,4,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:36:29','2021-05-27 07:36:29'),(1429,2,59,4,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:39:42','2021-05-27 07:39:42'),(1430,1,37,15,'Transfer Request','TR-21-00015: Your request has been denied.',1,0,2,0,'2021-05-27 07:44:16','2021-05-27 07:44:16'),(1431,4,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:54:01','2021-05-27 07:54:01'),(1432,4,33,13,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:56:00','2021-05-27 07:56:00'),(1433,4,33,14,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:59:37','2021-05-27 07:59:37'),(1434,1,33,12,'Inventory  Receiving','INRR-21-00012: Your request has been denied.',1,0,4,0,'2021-05-27 08:00:58','2021-05-27 08:00:58'),(1435,1,33,10,'Inventory  Receiving','INRR-21-00010: Your request has been denied.',1,0,4,0,'2021-05-27 23:01:36','2021-05-27 23:01:36'),(1436,1,33,14,'Inventory  Receiving','INRR-21-00014: Your request has been denied.',1,0,4,0,'2021-05-27 23:02:08','2021-05-27 23:02:08'),(1437,2,33,13,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 23:04:51','2021-05-27 23:04:51'),(1438,5,33,13,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 23:05:47','2021-05-27 23:05:47'),(1439,1,33,13,'Inventory  Receiving','INRR-21-00013: Your request has been approved.',7,0,5,0,'2021-05-27 23:12:54','2021-05-27 23:12:54'),(1440,4,33,15,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 00:39:45','2021-05-28 00:39:45'),(1441,4,33,16,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 00:44:29','2021-05-28 00:44:29'),(1442,4,33,17,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 00:45:39','2021-05-28 00:45:39'),(1443,4,42,9,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 00:47:31','2021-05-28 00:47:31'),(1444,4,33,18,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 00:50:01','2021-05-28 00:50:01'),(1445,4,38,30,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 00:52:14','2021-05-28 00:52:14'),(1446,4,33,19,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 00:52:37','2021-05-28 00:52:37'),(1447,4,33,20,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 00:53:14','2021-05-28 00:53:14'),(1448,2,33,16,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 00:55:42','2021-05-28 00:55:42'),(1449,2,33,18,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 00:56:47','2021-05-28 00:56:47'),(1450,2,33,19,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 00:57:14','2021-05-28 00:57:14'),(1451,2,33,20,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 00:57:31','2021-05-28 00:57:31'),(1452,5,33,16,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 00:58:39','2021-05-28 00:58:39'),(1453,5,33,18,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 00:58:53','2021-05-28 00:58:53'),(1454,5,33,19,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 00:59:20','2021-05-28 00:59:20'),(1455,5,33,20,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 00:59:34','2021-05-28 00:59:34'),(1456,1,33,16,'Inventory  Receiving','INRR-21-00016: Your request has been approved.',7,0,5,0,'2021-05-28 01:00:24','2021-05-28 01:00:24'),(1457,1,33,18,'Inventory  Receiving','INRR-21-00018: Your request has been approved.',7,0,5,0,'2021-05-28 01:00:46','2021-05-28 01:00:46'),(1458,1,33,20,'Inventory  Receiving','INRR-21-00020: Your request has been approved.',7,0,5,0,'2021-05-28 01:01:26','2021-05-28 01:01:26'),(1459,1,33,19,'Inventory  Receiving','INRR-21-00019: Your request has been denied.',1,0,5,0,'2021-05-28 01:02:06','2021-05-28 01:02:06'),(1460,2,42,9,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 01:04:52','2021-05-28 01:04:52'),(1461,5,42,9,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:06:56','2021-05-28 01:06:56'),(1462,4,33,21,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:08:06','2021-05-28 01:08:06'),(1463,2,33,21,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 01:10:38','2021-05-28 01:10:38'),(1464,5,33,21,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:11:14','2021-05-28 01:11:14'),(1465,1,33,21,'Inventory  Receiving','INRR-21-00021: Your request has been approved.',7,0,5,0,'2021-05-28 01:12:21','2021-05-28 01:12:21'),(1466,4,33,23,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:22:45','2021-05-28 01:22:45'),(1467,1,42,9,'Material Withdrawal','MWF-21-00009: Your request has been approved.',7,0,5,0,'2021-05-28 01:29:10','2021-05-28 01:29:10'),(1468,2,47,14,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:34:12','2021-05-28 01:34:12'),(1469,2,47,15,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:35:15','2021-05-28 01:35:15'),(1470,2,47,16,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:35:54','2021-05-28 01:35:54'),(1471,2,47,17,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:36:36','2021-05-28 01:36:36'),(1472,2,47,18,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:37:14','2021-05-28 01:37:14'),(1473,2,47,19,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:38:24','2021-05-28 01:38:24'),(1474,2,47,20,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:39:25','2021-05-28 01:39:25'),(1475,5,47,13,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:40:56','2021-05-28 01:40:56'),(1476,5,47,14,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:41:34','2021-05-28 01:41:34'),(1477,5,47,15,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:41:53','2021-05-28 01:41:53'),(1478,5,47,16,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:43:02','2021-05-28 01:43:02'),(1479,5,47,17,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:43:31','2021-05-28 01:43:31'),(1480,5,47,18,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:43:48','2021-05-28 01:43:48'),(1481,5,47,19,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:44:08','2021-05-28 01:44:08'),(1482,5,47,20,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:44:25','2021-05-28 01:44:25'),(1483,4,47,13,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 01:45:16','2021-05-28 01:45:16'),(1484,4,47,14,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 01:45:30','2021-05-28 01:45:30'),(1485,4,47,15,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 01:45:43','2021-05-28 01:45:43'),(1486,4,47,16,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 01:46:02','2021-05-28 01:46:02'),(1487,4,47,17,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 01:46:16','2021-05-28 01:46:16'),(1488,4,47,18,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 01:46:41','2021-05-28 01:46:41'),(1489,4,47,19,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 01:46:56','2021-05-28 01:46:56'),(1490,4,47,20,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 01:47:15','2021-05-28 01:47:15'),(1491,1,47,13,'Purchase Order','P0-21-00013: Your request has been approved.',7,0,4,0,'2021-05-28 01:48:03','2021-05-28 01:48:03'),(1492,1,47,14,'Purchase Order','P0-21-00014: Your request has been approved.',7,0,4,0,'2021-05-28 01:48:16','2021-05-28 01:48:16'),(1493,1,47,15,'Purchase Order','P0-21-00015: Your request has been approved.',7,0,4,0,'2021-05-28 01:48:30','2021-05-28 01:48:30'),(1494,1,47,16,'Purchase Order','P0-21-00016: Your request has been approved.',7,0,4,0,'2021-05-28 01:48:49','2021-05-28 01:48:49'),(1495,1,47,17,'Purchase Order','P0-21-00017: Your request has been approved.',7,0,4,0,'2021-05-28 01:49:18','2021-05-28 01:49:18'),(1496,1,47,18,'Purchase Order','P0-21-00018: Your request has been approved.',7,0,4,0,'2021-05-28 01:49:44','2021-05-28 01:49:44'),(1497,1,47,19,'Purchase Order','P0-21-00019: Your request has been approved.',7,0,4,0,'2021-05-28 01:50:07','2021-05-28 01:50:07'),(1498,1,47,20,'Purchase Order','P0-21-00020: Your request has been denied.',1,0,4,0,'2021-05-28 01:51:06','2021-05-28 01:51:06'),(1499,4,33,24,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 02:10:00','2021-05-28 02:10:00'),(1500,2,33,23,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 02:12:09','2021-05-28 02:12:09'),(1501,2,33,24,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 02:12:31','2021-05-28 02:12:31'),(1502,5,33,23,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 02:13:11','2021-05-28 02:13:11'),(1503,5,33,24,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 02:13:24','2021-05-28 02:13:24'),(1504,1,33,23,'Inventory  Receiving','INRR-21-00023: Your request has been approved.',7,0,5,0,'2021-05-28 02:14:09','2021-05-28 02:14:09'),(1505,1,33,24,'Inventory  Receiving','INRR-21-00024: Your request has been approved.',7,0,5,0,'2021-05-28 02:14:21','2021-05-28 02:14:21'),(1506,3,36,2,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 02:37:12','2021-05-28 02:37:12'),(1507,4,36,2,'Disposal Item','Akosi Admin asked for your approval.',2,0,3,0,'2021-05-28 02:37:55','2021-05-28 02:37:55'),(1508,1,36,2,'Disposal Item','ADF-21-00002: Your request has been approved.',7,0,4,0,'2021-05-28 02:38:39','2021-05-28 02:38:39'),(1509,4,42,10,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 02:44:59','2021-05-28 02:44:59'),(1510,2,42,10,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 02:45:49','2021-05-28 02:45:49'),(1511,5,42,10,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 02:46:26','2021-05-28 02:46:26'),(1512,1,42,10,'Material Withdrawal','MWF-21-00010: Your request has been approved.',7,0,5,0,'2021-05-28 02:47:26','2021-05-28 02:47:26'),(1513,4,43,5,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 03:51:54','2021-05-28 03:51:54'),(1514,2,49,4,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 06:26:28','2021-05-28 06:26:28'),(1515,2,49,4,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 06:27:11','2021-05-28 06:27:11'),(1516,2,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 06:29:36','2021-05-28 06:29:36'),(1517,2,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 06:29:51','2021-05-28 06:29:51'),(1518,2,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 06:30:04','2021-05-28 06:30:04'),(1519,1,43,5,'Return Item','EBF-21-00005: Your request has been denied.',1,0,4,0,'2021-05-28 06:31:51','2021-05-28 06:31:51'),(1520,5,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 06:37:21','2021-05-28 06:37:21'),(1521,5,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 06:41:20','2021-05-28 06:41:20'),(1522,5,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 06:45:54','2021-05-28 06:45:54'),(1523,1,43,1,'Borrowing Item','EBF-21-00001: Your request has been approved.',7,0,5,0,'2021-05-28 06:47:01','2021-05-28 06:47:01'),(1524,1,43,4,'Borrowing Item','EBF-21-00004: Your request has been approved.',7,0,5,0,'2021-05-28 06:47:13','2021-05-28 06:47:13'),(1525,1,43,2,'Borrowing Item','EBF-21-00002: Your request has been approved.',7,0,5,0,'2021-05-28 06:47:26','2021-05-28 06:47:26'),(1526,4,33,25,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 07:18:07','2021-05-28 07:18:07'),(1527,4,33,27,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 07:24:27','2021-05-28 07:24:27'),(1528,5,35,3,'Return Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 07:32:27','2021-05-28 07:32:27'),(1529,4,35,3,'Return Item','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 07:34:38','2021-05-28 07:34:38'),(1530,1,35,3,'Return Item','RI-21-00003: Your request has been approved.',7,1,4,1,'2021-05-28 07:35:37','2021-05-30 05:44:15'),(1531,4,43,6,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 07:41:47','2021-05-28 07:41:47'),(1532,2,36,3,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 08:36:18','2021-05-28 08:36:18'),(1533,4,33,28,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-30 23:27:01','2021-05-30 23:27:01'),(1534,4,33,29,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-30 23:30:27','2021-05-30 23:30:27'),(1535,2,33,29,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-30 23:49:06','2021-05-30 23:49:06'),(1536,5,33,29,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-30 23:50:15','2021-05-30 23:50:15'),(1537,1,33,29,'Inventory  Receiving','INRR-21-00029: Your request has been approved.',7,0,5,0,'2021-05-30 23:51:14','2021-05-30 23:51:14'),(1538,4,33,30,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 00:00:12','2021-05-31 00:00:12'),(1539,4,33,31,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 00:00:59','2021-05-31 00:00:59'),(1540,4,45,2,'Material Usage','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-31 00:56:09','2021-05-31 00:56:09'),(1541,6,38,32,'Cost Estimate','Charles Verdadero asked for your approval.',2,0,4,0,'2021-05-31 01:40:03','2021-05-31 01:40:03'),(1542,3,38,32,'Cost Estimate','Charles Verdadero asked for your approval.',2,0,6,0,'2021-05-31 01:51:26','2021-05-31 01:51:26'),(1543,4,38,32,'Cost Estimate','CEF-21-00032: Your request has been approved.',7,0,3,0,'2021-05-31 01:52:04','2021-05-31 01:52:04'),(1544,2,36,4,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 02:08:30','2021-05-31 02:08:30'),(1545,2,36,5,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 02:09:26','2021-05-31 02:09:26'),(1546,2,59,5,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 02:09:53','2021-05-31 02:09:53'),(1547,4,43,7,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 02:31:19','2021-05-31 02:31:19'),(1548,4,43,8,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 02:34:42','2021-05-31 02:34:42'),(1549,2,37,19,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 02:41:28','2021-05-31 02:41:28'),(1550,2,37,20,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 02:52:29','2021-05-31 02:52:29'),(1551,2,59,5,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 03:13:59','2021-05-31 03:13:59'),(1552,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 05:19:57','2021-05-31 05:19:57'),(1553,1,36,1,'Disposal Item','ADF-21-00001: Your request has been denied.',1,0,2,0,'2021-05-31 05:21:36','2021-05-31 05:21:36'),(1554,3,36,2,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-31 05:21:53','2021-05-31 05:21:53'),(1555,2,37,21,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 05:48:57','2021-05-31 05:48:57'),(1556,4,36,2,'Disposal Item','Akosi Admin asked for your approval.',2,0,3,0,'2021-05-31 05:51:02','2021-05-31 05:51:02'),(1557,1,36,2,'Disposal Item','ADF-21-00002: Your request has been approved.',7,0,4,0,'2021-05-31 05:52:34','2021-05-31 05:52:34'),(1558,1,43,1,'Return Item','EBF-21-00001: Your request has been denied.',1,0,4,0,'2021-05-31 06:47:52','2021-05-31 06:47:52'),(1559,1,43,2,'Return Item','EBF-21-00002: Your request has been denied.',1,0,4,0,'2021-05-31 06:48:11','2021-05-31 06:48:11'),(1560,4,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 07:57:11','2021-05-31 07:57:11'),(1561,2,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-31 07:58:03','2021-05-31 07:58:03'),(1562,4,43,14,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 01:16:07','2021-06-01 01:16:07'),(1563,4,43,15,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 01:16:55','2021-06-01 01:16:55'),(1564,1,43,8,'Return Item','EBF-21-00008: Your request has been denied.',1,0,4,0,'2021-06-01 01:17:51','2021-06-01 01:17:51'),(1565,1,43,15,'Return Item','EBF-21-00015: Your request has been denied.',1,0,4,0,'2021-06-01 01:18:22','2021-06-01 01:18:22'),(1566,2,43,14,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 01:19:08','2021-06-01 01:19:08'),(1567,4,43,16,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 01:33:34','2021-06-01 01:33:34'),(1568,4,43,17,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 01:34:53','2021-06-01 01:34:53'),(1569,2,43,16,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 01:40:11','2021-06-01 01:40:11'),(1570,2,43,17,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 01:40:22','2021-06-01 01:40:22'),(1571,5,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 01:41:36','2021-06-01 01:41:36'),(1572,5,43,14,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 01:41:46','2021-06-01 01:41:46'),(1573,5,43,16,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 01:41:55','2021-06-01 01:41:55'),(1574,5,43,17,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 01:42:04','2021-06-01 01:42:04'),(1575,1,43,3,'Borrowing Item','EBF-21-00003: Your request has been approved.',7,0,5,0,'2021-06-01 01:58:53','2021-06-01 01:58:53'),(1576,1,43,14,'Borrowing Item','EBF-21-00014: Your request has been approved.',7,0,5,0,'2021-06-01 02:06:09','2021-06-01 02:06:09'),(1577,1,43,16,'Borrowing Item','EBF-21-00016: Your request has been approved.',7,0,5,0,'2021-06-01 02:06:18','2021-06-01 02:06:18'),(1578,1,43,17,'Borrowing Item','EBF-21-00017: Your request has been approved.',7,0,5,0,'2021-06-01 02:06:28','2021-06-01 02:06:28'),(1579,1,43,13,'Return Item','EBF-21-00013: Your request has been denied.',1,0,4,0,'2021-06-01 02:07:18','2021-06-01 02:07:18'),(1580,2,36,3,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 02:13:57','2021-06-01 02:13:57'),(1581,2,36,4,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 02:16:17','2021-06-01 02:16:17'),(1582,2,35,4,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 02:31:56','2021-06-01 02:31:56'),(1583,4,43,18,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 02:47:09','2021-06-01 02:47:09'),(1584,2,43,18,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 02:48:10','2021-06-01 02:48:10'),(1585,5,43,18,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 02:48:56','2021-06-01 02:48:56'),(1586,1,43,18,'Borrowing Item','EBF-21-00018: Your request has been approved.',7,0,5,0,'2021-06-01 02:49:38','2021-06-01 02:49:38'),(1587,2,35,5,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 03:10:07','2021-06-01 03:10:07'),(1588,1,43,4,'Return Item','EBF-21-00004: Your request has been denied.',1,0,4,0,'2021-06-01 05:27:23','2021-06-01 05:27:23'),(1589,4,43,19,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 05:30:33','2021-06-01 05:30:33'),(1590,4,43,20,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 05:34:18','2021-06-01 05:34:18'),(1591,2,43,19,'Borrowing Item','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-01 05:37:54','2021-06-01 05:44:17'),(1592,2,43,20,'Borrowing Item','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-01 05:38:06','2021-06-01 05:38:41'),(1593,5,43,20,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 05:38:47','2021-06-01 05:38:47'),(1594,5,43,19,'Borrowing Item','Akosi Admin asked for your approval.',2,1,2,5,'2021-06-01 05:44:24','2021-06-01 05:45:19'),(1595,1,43,19,'Borrowing Item','EBF-21-00019: Your request has been approved.',7,0,5,0,'2021-06-01 05:45:27','2021-06-01 05:45:27'),(1596,1,43,20,'Borrowing Item','EBF-21-00020: Your request has been approved.',7,0,5,0,'2021-06-01 05:45:40','2021-06-01 05:45:40'),(1597,4,46,20,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-01 07:59:51','2021-06-01 08:00:35'),(1598,1,46,20,'Purchase Request','PR-21-00020: Your request has been denied.',1,0,4,0,'2021-06-01 08:00:43','2021-06-01 08:00:43'),(1599,4,46,21,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-01 08:01:10','2021-06-01 08:01:25'),(1600,2,46,21,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-01 08:01:32','2021-06-01 08:01:43'),(1601,7,46,21,'Purchase Request','Akosi Admin asked for your approval.',2,1,2,7,'2021-06-01 08:01:50','2021-06-01 08:02:02'),(1602,1,46,21,'Purchase Request','PR-21-00021: Your request has been approved.',7,0,7,0,'2021-06-01 08:02:09','2021-06-01 08:02:09'),(1603,2,47,27,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 02:36:11','2021-06-02 02:36:11'),(1604,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-02 05:33:02','2021-06-02 05:33:42'),(1605,20,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-02 05:33:58','2021-06-02 05:34:19'),(1606,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,20,2,'2021-06-02 05:34:26','2021-06-02 05:34:38'),(1607,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,0,2,0,'2021-06-02 05:34:54','2021-06-02 05:34:54'),(1608,4,39,1,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-02 05:37:10','2021-06-02 05:37:28'),(1609,20,39,1,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-02 05:37:36','2021-06-02 05:37:58'),(1610,2,39,1,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,20,2,'2021-06-02 05:38:09','2021-06-02 05:38:29'),(1611,1,39,1,'Project Budget Rationale','PBR-21-00001: Your request has been approved.',7,0,2,0,'2021-06-02 05:38:37','2021-06-02 05:38:37'),(1612,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 05:39:53','2021-06-02 05:39:53'),(1613,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-02 05:40:11','2021-06-02 05:40:30'),(1614,2,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 05:42:27','2021-06-02 05:42:27'),(1615,2,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-02 05:42:47','2021-06-02 05:43:07'),(1616,7,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 05:43:13','2021-06-02 05:43:13'),(1617,7,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,1,2,7,'2021-06-02 05:43:21','2021-06-02 05:43:31'),(1618,1,46,2,'Purchase Request','PR-21-00002: Your request has been approved.',7,0,7,0,'2021-06-02 05:43:37','2021-06-02 05:43:37'),(1619,1,46,1,'Purchase Request','PR-21-00001: Your request has been approved.',7,0,7,0,'2021-06-02 05:43:44','2021-06-02 05:43:44'),(1620,2,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 05:48:04','2021-06-02 05:48:04'),(1621,2,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-02 05:48:54','2021-06-02 05:49:09'),(1622,4,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 05:49:17','2021-06-02 05:49:17'),(1623,4,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-02 05:49:50','2021-06-02 05:50:09'),(1624,5,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 05:50:20','2021-06-02 05:50:20'),(1625,5,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-02 05:50:33','2021-06-02 05:50:44'),(1626,1,126,2,'Inventory Validation','IVR-21-00002: Your request has been approved.',7,0,5,0,'2021-06-02 05:50:50','2021-06-02 05:50:50'),(1627,1,126,1,'Inventory Validation','IVR-21-00001: Your request has been approved.',7,0,5,0,'2021-06-02 05:51:02','2021-06-02 05:51:02'),(1628,2,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 05:51:55','2021-06-02 05:51:55'),(1629,2,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-02 05:52:16','2021-06-02 06:02:37'),(1630,4,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:02:49','2021-06-02 06:02:49'),(1631,4,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-02 06:03:17','2021-06-02 06:06:02'),(1632,20,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 06:06:08','2021-06-02 06:06:08'),(1633,20,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-02 06:06:23','2021-06-02 06:06:36'),(1634,1,40,2,'Bid Recap','BRF-21-00002: Your request has been approved.',7,0,20,0,'2021-06-02 06:06:44','2021-06-02 06:06:44'),(1635,1,40,1,'Bid Recap','BRF-21-00001: Your request has been approved.',7,0,20,0,'2021-06-02 06:07:25','2021-06-02 06:07:25'),(1636,2,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:13:21','2021-06-02 06:13:21'),(1637,2,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:13:44','2021-06-02 06:13:44'),(1638,2,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:14:20','2021-06-02 06:14:20'),(1639,2,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:26:22','2021-06-02 06:26:22'),(1640,2,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:26:59','2021-06-02 06:26:59'),(1641,2,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:28:34','2021-06-02 06:28:34'),(1642,2,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:32:19','2021-06-02 06:32:19'),(1643,2,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-02 06:33:13','2021-06-02 06:33:28'),(1644,4,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:33:35','2021-06-02 06:33:35'),(1645,4,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-02 06:33:43','2021-06-02 06:34:04'),(1646,5,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 06:34:11','2021-06-02 06:34:11'),(1647,5,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-02 06:34:19','2021-06-02 06:34:31'),(1648,1,126,2,'Inventory Validation','IVR-21-00002: Your request has been approved.',7,0,5,0,'2021-06-02 06:34:37','2021-06-02 06:34:37'),(1649,1,126,1,'Inventory Validation','IVR-21-00001: Your request has been approved.',7,0,5,0,'2021-06-02 06:35:19','2021-06-02 06:35:19'),(1650,2,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:36:23','2021-06-02 06:36:23'),(1651,2,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-02 06:37:15','2021-06-02 06:43:28'),(1652,4,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:43:36','2021-06-02 06:43:36'),(1653,4,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-02 06:43:55','2021-06-02 06:44:10'),(1654,20,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 06:44:17','2021-06-02 06:44:17'),(1655,20,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-02 06:44:27','2021-06-02 06:44:40'),(1656,1,40,2,'Bid Recap','BRF-21-00002: Your request has been approved.',7,0,20,0,'2021-06-02 06:44:59','2021-06-02 06:44:59'),(1657,1,40,1,'Bid Recap','BRF-21-00001: Your request has been approved.',7,0,20,0,'2021-06-02 06:45:38','2021-06-02 06:45:38'),(1658,2,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:46:35','2021-06-02 06:46:35'),(1659,2,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:52:03','2021-06-02 06:52:03'),(1660,2,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:53:07','2021-06-02 06:53:07'),(1661,2,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:54:17','2021-06-02 06:54:17'),(1662,2,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:55:44','2021-06-02 06:55:44'),(1663,2,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:56:02','2021-06-02 06:56:02'),(1664,2,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-02 06:56:18','2021-06-02 06:56:47'),(1665,5,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:56:54','2021-06-02 06:56:54'),(1666,5,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:57:06','2021-06-02 06:57:06'),(1667,5,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:57:16','2021-06-02 06:57:16'),(1668,2,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 23:33:08','2021-06-02 23:33:08'),(1669,2,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 23:53:45','2021-06-02 23:53:45'),(1670,5,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:06:46','2021-06-03 00:06:46'),(1671,5,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:07:03','2021-06-03 00:07:03'),(1672,5,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,1,2,5,'2021-06-03 00:07:11','2021-06-03 00:07:38'),(1673,4,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-03 00:07:46','2021-06-03 00:07:46'),(1674,4,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-03 00:07:55','2021-06-03 00:07:55'),(1675,4,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-03 00:08:04','2021-06-03 00:08:04'),(1676,4,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-03 00:08:12','2021-06-03 00:08:12'),(1677,4,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-03 00:08:18','2021-06-03 00:08:18'),(1678,4,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,1,5,4,'2021-06-03 00:08:25','2021-06-03 00:08:38'),(1679,1,47,6,'Purchase Order','P0-21-00006: Your request has been approved.',7,0,4,0,'2021-06-03 00:08:45','2021-06-03 00:08:45'),(1680,1,47,1,'Purchase Order','P0-21-00001: Your request has been approved.',7,0,4,0,'2021-06-03 00:08:52','2021-06-03 00:08:52'),(1681,1,47,3,'Purchase Order','P0-21-00003: Your request has been approved.',7,0,4,0,'2021-06-03 00:09:16','2021-06-03 00:09:16'),(1682,1,47,7,'Purchase Order','P0-21-00007: Your request has been approved.',7,0,4,0,'2021-06-03 00:09:37','2021-06-03 00:09:37'),(1683,1,47,5,'Purchase Order','P0-21-00005: Your request has been approved.',7,0,4,0,'2021-06-03 00:09:43','2021-06-03 00:09:43'),(1684,1,47,4,'Purchase Order','P0-21-00004: Your request has been approved.',7,0,4,0,'2021-06-03 00:09:55','2021-06-03 00:09:55'),(1685,4,33,1,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:17:04','2021-06-03 00:17:04'),(1686,2,33,1,'Inventory  Receiving','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-03 00:17:29','2021-06-03 00:17:38'),(1687,5,33,1,'Inventory  Receiving','Akosi Admin asked for your approval.',2,1,2,5,'2021-06-03 00:17:44','2021-06-03 00:18:01'),(1688,1,33,1,'Inventory  Receiving','INRR-21-00001: Your request has been approved.',7,0,5,0,'2021-06-03 00:18:08','2021-06-03 00:18:08'),(1689,4,49,2,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 03:54:46','2021-06-03 03:54:46'),(1690,4,49,3,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 03:55:08','2021-06-03 03:55:08'),(1691,4,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-03 06:02:16','2021-06-03 06:02:39'),(1692,2,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-03 06:02:46','2021-06-03 06:03:04'),(1693,5,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,1,2,5,'2021-06-03 06:03:10','2021-06-03 06:03:23'),(1694,1,43,1,'Borrowing Item','EBF-21-00001: Your request has been approved.',7,0,5,0,'2021-06-03 06:03:30','2021-06-03 06:03:30'),(1695,4,42,1,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 06:55:54','2021-06-03 06:55:54'),(1696,2,45,1,'Material Usage','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-03 07:16:59','2021-06-03 07:17:41'),(1697,4,45,1,'Material Usage','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 07:17:50','2021-06-03 07:17:50'),(1698,4,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-03 07:20:56','2021-06-03 07:21:22'),(1699,2,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-03 07:21:29','2021-06-03 07:21:29'),(1700,4,49,4,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 07:26:52','2021-06-03 07:26:52'),(1701,4,49,5,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 07:32:20','2021-06-03 07:32:20');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_user_role_tbl`
--

LOCK TABLES `gen_user_role_tbl` WRITE;
/*!40000 ALTER TABLE `gen_user_role_tbl` DISABLE KEYS */;
INSERT INTO `gen_user_role_tbl` VALUES (1,'Administrator',1,'2021-03-08 00:29:00','2021-03-08 00:44:40'),(2,'Network Engineer',1,'2021-03-08 02:14:34','2021-03-08 04:02:49'),(3,'Human Resources',1,'2021-03-08 02:14:55','2021-03-08 05:02:10'),(4,'Junior Developer',1,'2021-03-08 03:17:38','2021-03-08 03:17:38'),(5,'Senior Developer',1,'2021-03-08 03:18:39','2021-03-08 05:17:41'),(6,'Finance',1,'2021-03-08 03:19:57','2021-03-08 03:19:57'),(7,'Installer',0,'2021-03-08 03:46:14','2021-03-08 04:03:08'),(8,'IT Admin',1,'2021-03-08 03:46:45','2021-03-08 03:46:45'),(9,'Quality Analyst',1,'2021-03-09 23:31:46','2021-03-09 23:31:46'),(10,'Marketing',1,'2021-03-09 23:33:00','2021-03-09 23:33:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_award_tbl`
--

LOCK TABLES `hris_award_tbl` WRITE;
/*!40000 ALTER TABLE `hris_award_tbl` DISABLE KEYS */;
INSERT INTO `hris_award_tbl` VALUES (1,'Employee of the Month','Outstanding employee for the month','3',1,1,1,'2021-04-15 02:48:17','2021-04-15 02:48:17'),(2,'Employee of the Year','Outstanding employee for the year','3',1,1,1,'2021-04-15 02:48:58','2021-04-15 02:48:58');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_branch_tbl`
--

LOCK TABLES `hris_branch_tbl` WRITE;
/*!40000 ALTER TABLE `hris_branch_tbl` DISABLE KEYS */;
INSERT INTO `hris_branch_tbl` VALUES (1,'BRC-21-00001','Ortigas Branch',1,1,1,'2021-04-15 01:09:13','2021-04-15 01:09:13'),(2,'BRC-21-00002','La Union Branch',1,1,1,'2021-04-15 01:09:47','2021-04-15 01:09:47');
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
  `reviseChangeScheduleID` bigint(20) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_change_schedule_tbl`
--

LOCK TABLES `hris_change_schedule_tbl` WRITE;
/*!40000 ALTER TABLE `hris_change_schedule_tbl` DISABLE KEYS */;
INSERT INTO `hris_change_schedule_tbl` VALUES (1,NULL,1,'2021-04-15','09:00:00','19:00:00','For Check up','1','2','2021-04-15 11:27:31',2,NULL,'2021-04-15 11:27:31',1,1,'2021-04-15 11:01:43','2021-04-15 03:27:35'),(2,NULL,1,'2021-04-15','00:00:00','17:00:00','Sample Change Schedule','4|6|5','2','2021-04-19 16:44:55',1,NULL,'2021-04-19 16:39:22',1,4,'2021-04-15 11:23:06','2021-04-19 08:44:57'),(3,NULL,1,'2021-04-16','09:00:00','19:00:00','Attending event.','4|6|5','2|2|3','2021-04-15 11:32:58|2021-04-15 11:33:54|2021-04-15 11:35:33',3,'Need to report on time.','2021-04-15 11:30:24',1,5,'2021-04-15 11:30:24','2021-04-15 03:35:38'),(4,NULL,1,'2021-04-14','08:00:00','17:00:00','Testing Change Schedule','4|6|5',NULL,NULL,4,NULL,'2021-04-15 11:45:23',1,1,'2021-04-15 11:36:29','2021-04-15 03:47:44'),(5,NULL,1,'2021-04-26','08:00:00','17:00:00','Testing ','4|6|5',NULL,NULL,4,NULL,'2021-04-15 11:55:38',1,1,'2021-04-15 11:55:38','2021-04-15 03:56:55'),(6,NULL,1,'2021-04-30','08:00:00','17:00:00','Testing duplicate','4|6|5','2','2021-04-15 14:58:11',1,NULL,'2021-04-15 11:56:25',1,4,'2021-04-15 11:56:25','2021-04-15 07:35:31'),(7,NULL,1,'2021-04-18','08:00:00','17:00:00','tesing langs','4|6|5','2','2021-04-19 16:43:55',1,NULL,'2021-04-15 11:57:38',1,4,'2021-04-15 11:57:38','2021-04-19 08:44:01'),(8,NULL,1,'2021-05-12','08:00:00','17:00:00','Testing','4|6|5','3','2021-04-19 16:44:24',3,'Ayoko','2021-04-15 13:05:59',1,4,'2021-04-15 13:01:43','2021-04-19 08:44:26'),(9,NULL,1,'2021-04-15','08:00:00','17:00:00','Try DUplication',NULL,NULL,NULL,4,NULL,NULL,1,1,'2021-04-15 13:04:50','2021-05-05 07:45:11'),(10,NULL,1,'2021-04-15','08:00:00','17:00:00','',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-04-15 13:06:25','2021-04-15 05:06:27'),(11,NULL,4,'2021-04-15','08:00:00','17:00:00','Change Schedule','4','2','2021-04-19 16:41:22',2,NULL,'2021-04-19 16:41:22',4,4,'2021-04-15 15:39:42','2021-04-19 08:41:25'),(12,NULL,1,'2021-04-20','08:00:00','17:00:00','',NULL,NULL,NULL,4,NULL,NULL,1,1,'2021-04-19 16:37:21','2021-04-20 07:28:29'),(13,NULL,4,'2021-04-19','08:00:00','17:00:00','Sample Change Request','1|3|6','2','2021-04-19 16:45:58',1,NULL,'2021-04-19 16:42:42',4,1,'2021-04-19 16:42:42','2021-04-19 08:46:00'),(14,NULL,4,'2021-04-30','08:00:00','17:00:00','Sample reason','1|3|6','3','2021-04-19 16:46:15',3,'Ayoko','2021-04-19 16:43:14',4,1,'2021-04-19 16:43:14','2021-04-19 08:46:17'),(15,NULL,1,'2021-04-01','08:00:00','17:00:00','Test','4|6|5',NULL,NULL,4,NULL,'2021-04-19 17:55:35',1,1,'2021-04-19 17:55:35','2021-04-21 00:59:42'),(16,NULL,1,'2021-04-16','08:00:00','17:00:00','Sample Duplication',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-04-20 15:32:20','2021-04-20 07:32:22'),(17,NULL,1,'2021-04-27','08:00:00','17:00:00','',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-04-27 13:36:18','2021-04-27 05:36:17'),(18,NULL,1,'2021-05-31','17:00:00','02:00:00','trip ko lang','4|6|5',NULL,NULL,1,NULL,'2021-05-20 13:29:53',1,1,'2021-05-20 13:29:53','2021-05-20 05:29:56'),(19,NULL,1,'2021-05-25','08:00:00','17:00:00','test','4|6|5','2|2|2','2021-05-25 16:01:27|2021-05-25 16:04:41|2021-05-25 16:05:10',5,NULL,'2021-05-25 16:00:21',1,1,'2021-05-25 16:00:21','2021-05-26 05:47:41'),(20,NULL,1,'2021-05-26','08:00:00','17:00:00','test','4|6|5',NULL,NULL,4,NULL,'2021-05-25 16:06:57',1,1,'2021-05-25 16:06:57','2021-05-25 08:07:12'),(21,3,1,'2021-04-16','09:00:00','19:00:00','Attending event sana','4|6|5',NULL,NULL,1,NULL,'2021-05-26 13:57:40',1,1,'2021-05-26 07:47:20','2021-05-26 05:57:51'),(22,NULL,1,'2021-05-27','08:00:00','17:00:00','test','4|6|5','3','2021-05-26 14:00:53',3,'test','2021-05-26 13:59:32',1,4,'2021-05-26 13:58:58','2021-05-26 06:00:54'),(23,22,1,'2021-05-27','08:00:00','17:00:00','test','4|6|5',NULL,NULL,1,NULL,'2021-05-26 14:03:16',1,1,'2021-05-26 14:03:16','2021-05-26 06:03:17');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_code_conduct_category_tbl`
--

LOCK TABLES `hris_code_conduct_category_tbl` WRITE;
/*!40000 ALTER TABLE `hris_code_conduct_category_tbl` DISABLE KEYS */;
INSERT INTO `hris_code_conduct_category_tbl` VALUES (1,'Late and Absences',1,1,1,'2021-05-24 06:59:19','2021-05-06 03:08:49'),(2,'asdasdasd',1,1,1,'2021-05-26 08:28:05','2021-05-25 06:55:14');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_code_conduct_section_tbl`
--

LOCK TABLES `hris_code_conduct_section_tbl` WRITE;
/*!40000 ALTER TABLE `hris_code_conduct_section_tbl` DISABLE KEYS */;
INSERT INTO `hris_code_conduct_section_tbl` VALUES (1,1,'1.1','To test',1,1,2,'2021-05-06 06:41:34','2021-05-06 06:41:53'),(2,2,'2.1','asdsadsad',1,1,1,'2021-05-26 08:28:13','2021-05-26 08:28:13');
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
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`departmentID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_department_tbl`
--

LOCK TABLES `hris_department_tbl` WRITE;
/*!40000 ALTER TABLE `hris_department_tbl` DISABLE KEYS */;
INSERT INTO `hris_department_tbl` VALUES (1,'DPT-21-00001','Human Resource Department',1,'2021-04-14 23:30:27',1,1,'2021-04-14 15:30:27','0000-00-00 00:00:00'),(2,'DPT-21-00002','Finance Department',1,'2021-04-14 23:30:52',1,1,'2021-04-14 15:30:52','0000-00-00 00:00:00'),(3,'DPT-21-00003','Operations Department',1,'2021-04-14 23:31:20',1,1,'2021-04-14 15:31:20','0000-00-00 00:00:00'),(4,'DPT-21-00004','Admin Department',1,'2021-04-14 23:32:51',1,1,'2021-04-14 15:32:51','0000-00-00 00:00:00'),(5,'DPT-21-00005','Marketing Department',1,'2021-04-14 23:35:50',1,1,'2021-04-14 15:35:50','0000-00-00 00:00:00'),(6,'DPT-21-00006','Accounting Department',0,'2021-04-28 08:04:38',1,1,'2021-04-28 00:04:38','2021-04-28 00:05:31');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_designation_tbl`
--

LOCK TABLES `hris_designation_tbl` WRITE;
/*!40000 ALTER TABLE `hris_designation_tbl` DISABLE KEYS */;
INSERT INTO `hris_designation_tbl` VALUES (1,'DSN-21-00001',4,'Administrator',1,'2021-03-24',1,1,'2021-03-24 05:07:13','2021-05-05 02:45:17'),(2,'DSN-21-00002',4,'Network Engineer',1,'2021-03-26',1,1,'2021-03-26 05:43:25','2021-04-14 23:35:13'),(3,'DSN-21-00003',1,'Human Resources',1,'2021-03-24',1,1,'2021-03-24 05:07:13','2021-04-07 01:17:08'),(4,'DSN-21-00004',3,'Junior Developer',1,'2021-03-26',1,1,'2021-03-26 05:43:25','2021-04-14 23:33:57'),(5,'DSN-21-00005',3,'Senior Developer',1,'2021-03-24',1,1,'2021-03-24 05:07:13','2021-04-14 23:34:07'),(6,'DSN-21-00006',2,'Finance',1,'2021-03-26',1,1,'2021-03-26 05:43:25','2021-04-14 23:34:19'),(7,'DSN-21-00007',1,'Installer',1,'2021-03-24',1,1,'2021-03-24 05:07:13','2021-04-07 01:17:08'),(8,'DSN-21-00008',4,'IT Admin',1,'2021-03-26',1,1,'2021-03-26 05:43:25','2021-05-05 02:46:16'),(9,'DSN-21-00009',3,'Quality Analyst',1,'2021-03-24',1,1,'2021-03-24 05:07:13','2021-04-14 23:33:32'),(10,'DSN-21-00010',5,'Marketing',0,'2021-03-26',1,1,'2021-03-26 05:43:25','2021-04-14 23:36:11'),(11,'DSN-21-00003',5,'Digital Marketing Specialist',1,'2021-04-22',1,1,'2021-04-22 02:24:08','2021-04-22 02:24:08'),(12,'DSN-21-00004',3,'UI/UX Designer',1,'2021-05-14',1,1,'2021-05-14 06:49:52','2021-05-14 06:49:52'),(13,'DSN-21-00005',2,'Finance Officer',1,'2021-05-24',1,1,'2021-05-24 00:24:35','2021-05-24 00:24:35');
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
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_employee_documents_tbl`
--

LOCK TABLES `hris_employee_documents_tbl` WRITE;
/*!40000 ALTER TABLE `hris_employee_documents_tbl` DISABLE KEYS */;
INSERT INTO `hris_employee_documents_tbl` VALUES (92,9,'Others','System Coding Standardso01619164393.docx','application',1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(93,19,'Contract and Appraisal','System Coding Standardsca01619165689.docx','application',1,1,'2021-04-23 08:14:49','2021-04-23 08:14:49'),(94,19,'Training and Development','IMG_1956td01619165720.JPG','image',1,1,'2021-04-23 08:15:20','2021-04-23 08:15:20'),(95,19,'Others','System Coding Standardso01619165720.docx','application',1,1,'2021-04-23 08:15:20','2021-04-23 08:15:20'),(96,19,'Employee Memoranda','IMG_1958em01619165799.JPG','image',1,1,'2021-04-23 08:16:39','2021-04-23 08:16:39'),(97,19,'Training and Development','IMG_2021td01619165799.JPG','image',1,1,'2021-04-23 08:16:39','2021-04-23 08:16:39'),(98,1,'Contract and Appraisal','logoca01619403200.png','image',1,1,'2021-04-26 02:13:20','2021-04-26 02:13:20'),(99,20,'Contract and Appraisal','BCGI-Personnel Requisition Formca01619666076.docx','application',1,1,'2021-04-29 03:14:36','2021-04-29 03:14:36'),(100,20,'Employee Memoranda','ProjectBuilderUIem01619666076.xlsx','application',1,1,'2021-04-29 03:14:36','2021-04-29 03:14:36'),(102,1,'Employee Memoranda','defaultem01623032498.png','image',1,1,'2021-06-07 02:21:38','2021-06-07 02:21:38'),(103,1,'Others','gallery-2o01623032498.jpg','image',1,1,'2021-06-07 02:21:38','2021-06-07 02:21:38'),(104,2,'Contract and Appraisal','details-3ca01623997421.jpg','image',1,1,'2021-06-18 06:23:41','2021-06-18 06:23:41'),(105,2,'Contract and Appraisal','details-4ca11623997421.jpg','image',1,1,'2021-06-18 06:23:41','2021-06-18 06:23:41'),(106,2,'Contract and Appraisal','details-bgca21623997421.jpg','image',1,1,'2021-06-18 06:23:41','2021-06-18 06:23:41'),(107,2,'Contract and Appraisal','empty-living-room-with-blue-sofa-plants-table-empty-white-wall-background-3d-renderingca31623997421.jpg','image',1,1,'2021-06-18 06:23:41','2021-06-18 06:23:41'),(108,2,'Contract and Appraisal','gallery-1ca41623997421.jpg','image',1,1,'2021-06-18 06:23:41','2021-06-18 06:23:41'),(109,2,'Contract and Appraisal','gallery-2ca51623997421.jpg','image',1,1,'2021-06-18 06:23:41','2021-06-18 06:23:41');
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
  `leaveCredit` decimal(10,2) NOT NULL,
  `leaveAccumulated` decimal(10,2) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`employeeLeaveID`)
) ENGINE=InnoDB AUTO_INCREMENT=566 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_employee_leave_tbl`
--

LOCK TABLES `hris_employee_leave_tbl` WRITE;
/*!40000 ALTER TABLE `hris_employee_leave_tbl` DISABLE KEYS */;
INSERT INTO `hris_employee_leave_tbl` VALUES (3,12,1,10.00,0.00,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(4,12,2,10.00,0.00,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(5,13,1,10.00,0.00,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(6,13,2,10.00,0.00,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(7,14,1,10.00,0.00,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(8,14,2,10.00,0.00,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(9,15,1,5.00,0.00,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(10,15,2,8.00,0.00,1,1,'2021-04-22 02:35:48','2021-04-22 05:16:21'),(11,16,1,30.00,0.00,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(12,16,2,17.00,0.00,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(246,22,1,0.00,0.00,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(247,22,2,0.00,0.00,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(248,22,3,0.00,0.00,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(249,22,4,0.00,0.00,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(250,22,5,0.00,0.00,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(281,5,1,0.00,0.00,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(282,5,2,0.00,0.00,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(283,5,3,0.00,0.00,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(284,5,4,0.00,0.00,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(285,5,5,0.00,0.00,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(296,19,1,5.00,0.00,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(297,19,2,14.00,0.00,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(298,19,3,0.00,0.00,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(299,19,4,0.00,0.00,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(300,19,5,0.00,0.00,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(306,21,1,0.00,0.00,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(307,21,2,0.00,0.00,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(308,21,3,0.00,0.00,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(309,21,4,0.00,0.00,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(310,21,5,0.00,0.00,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(341,8,1,0.00,0.00,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(342,8,2,0.00,0.00,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(343,8,3,0.00,0.00,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(344,8,4,0.00,0.00,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(345,8,5,0.00,0.00,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(376,6,1,0.00,0.00,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(377,6,2,0.00,0.00,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(378,6,3,0.00,0.00,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(379,6,4,0.00,0.00,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(380,6,5,0.00,0.00,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(406,7,1,0.00,0.00,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(407,7,2,0.00,0.00,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(408,7,3,0.00,0.00,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(409,7,4,0.00,0.00,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(410,7,5,0.00,0.00,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(430,3,1,0.00,0.00,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(431,3,2,0.00,0.00,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(432,3,3,0.00,0.00,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(433,3,4,0.00,0.00,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(466,20,1,0.42,24.76,1,1,'2021-05-28 07:42:36','2021-06-18 06:22:27'),(467,20,2,5.00,0.00,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(468,20,3,0.00,0.00,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(469,20,4,0.00,0.00,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(478,9,1,4.00,25.61,1,1,'2021-06-01 07:47:24','2021-06-18 06:22:27'),(479,9,2,5.00,0.00,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(480,9,3,0.00,0.00,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(481,9,4,0.00,0.00,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(502,4,1,0.00,0.00,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(503,4,2,0.00,0.00,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(504,4,3,0.00,0.00,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(505,4,4,0.00,0.00,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(554,1,1,5.00,35.96,1,1,'2021-06-18 06:09:12','2021-06-18 06:22:27'),(555,1,2,4.00,0.00,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(556,1,3,10.00,0.00,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(557,1,4,5.00,0.00,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(562,2,1,0.42,8.82,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(563,2,2,5.00,0.00,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(564,2,3,0.00,0.00,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(565,2,4,0.00,0.00,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57');
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
  `employeeRanking` varchar(100) DEFAULT NULL,
  `employeeRankingCredit` decimal(10,2) DEFAULT NULL,
  `employeeLeaveInterval` bigint(20) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_employee_list_tbl`
--

LOCK TABLES `hris_employee_list_tbl` WRITE;
/*!40000 ALTER TABLE `hris_employee_list_tbl` DISABLE KEYS */;
INSERT INTO `hris_employee_list_tbl` VALUES (1,4,1,1,1,1,'Akosi','','Admin','Officer',7.00,14,'0943-216-5213','akosiadmin@gmail.com','admin','admin','U2FsdGVkX195M+anWFZO8igyYq+T1xWFK665OzzcUdI=','Akosi Admin','5132-5324-254','1619403200.png','Anonymous','2021-04-22','1623972615.png','Philippine, Filipino','Single','432-532-643','53-2634274-3','32-532673245-2','4326-3246-7235','4A','RIZAL','CAINTA','SAN JUAN','1701','Antel','Julia Vargas','Ortigas','Philippines','1960',1000000.00,45454.55,5681.82,0.00,'2020-04-08',1,1,1,'2021-03-26 00:09:46','2021-06-18 06:09:12'),(2,4,2,2,1,1,'Arjay','','Diangzon','Rank and File',5.00,37,'0935-465-4654','arjaydiangzon@gmail.com','arjay','arjay','U2FsdGVkX18g4T3y3/V0DHn5DCjD2UZEx+Rek0edo+s=','ARJAY DIANGZON','5368-8125-563','1620788188.png','Female','2021-05-12','1623997421.png','Philippine, Filipino','Single','','','','','01','ILOCOS SUR','BANAYOYO','BANBANAAL','','null','null','null','null','null',2700.00,90.00,11.25,400.00,'2018-05-15',1,1,1,'2021-03-26 00:09:46','2021-06-18 06:23:57'),(3,1,3,3,1,0,'Wilson','','Parajas',NULL,NULL,1,'0934-324-2423','wilsonparajas@gmail.com','wilson','wilson','U2FsdGVkX194gDEMTb4pw1VlmCUCdSPHsPgEWr90zVg=','','','1620959313.png','Female','1995-05-06','undefined','Philippine, Filipino','Single','','','','','01','PANGASINAN','AGNO','BANGAN-ODA','','null','null','null','null','null',2400.00,80.00,10.00,0.00,'2021-05-01',1,1,1,'2021-03-26 00:09:46','2021-05-30 05:42:47'),(4,3,4,4,2,0,'Charles','','Verdadero','Rank and File',5.00,1,'0954-165-1321','charlesverdadero@gmail.com','charles','charles','U2FsdGVkX1/J+6uWbMj9TwQAo+8VVtD5bLJrToi1nz0=','','1234 5678 9078','1620790164.png','Female','1999-02-12','undefined','Belgian','Separated','','','','','03','BULACAN','ANGAT','BINAGBAG','','28','null','null','null','null',2100.00,70.00,8.75,0.00,'2021-04-27',1,1,1,'2021-03-26 00:09:46','2021-06-04 08:08:41'),(5,3,4,5,1,0,'Mark','','Nieto',NULL,NULL,1,'0954-435-3452','marknieto@gmail.com','mark','marky','U2FsdGVkX19aaEEc55z9gAYXLfy0mrLv9dBn9n+XXoo=','','','1620790218.png','Female','2021-05-11',NULL,'Philippine, Filipino','Single','','','','','NCR','NATIONAL CAPITAL REGION - FOURTH DISTRICT','CITY OF MUNTINLUPA','BULI','','null','null','null','null','null',1900.00,60.00,7.50,0.00,'2021-05-06',1,1,1,'2021-03-26 00:09:46','2021-06-07 01:28:20'),(6,5,11,6,1,0,'Francis','','Bolster',NULL,NULL,52,'0923-254-3534','ffbolster@gmail.com','ffbolster','password123','U2FsdGVkX1/ZQNbt9qo90aGtDLAMdgXv+NMQ5hCs/R8=','','','1620790505.png','Male','1986-04-15','null','American','Divorced','','','','','CAR','ABRA','BANGUED','BANGBANGAR','','3432-C','Uprising','Downside','United States of America','6431',1600.00,70.00,8.75,0.00,'2017-02-06',1,1,1,'2021-03-26 00:09:46','2021-06-07 01:28:20'),(7,3,9,7,1,0,'Renna','Porras','Telesforo',NULL,NULL,11,'0932-324-2343','rennatelesforo@gmail.com','renna','renna','U2FsdGVkX1/Wze0FuN7dfnBMkTrDsupvjdj/vg7GvgE=','','','1620790263.png','Female','1998-06-02','undefined','Philippine, Filipino','Single','','','','','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','QUEZON CITY','PAYATAS','','28','Payatas A','None','Philippine','1212',5300.00,240.91,30.11,0.00,'2020-07-02',1,1,1,'2021-03-26 00:09:46','2021-05-31 01:19:48'),(8,1,7,8,1,0,'Matthew','','Isaac',NULL,NULL,1,'0943-543-4645','matthewisaac@gmail.com','matthew','matthew','U2FsdGVkX19mEbOuPUJzo4mcrA+1mNj7rmsrV4SqfAs=','','','1620959339.png','Female','1972-03-31',NULL,'Philippine, Filipino','Divorced','','','','','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','CITY OF PASIG','PALATIW','','null','null','null','null','null',1000.00,50.00,6.25,0.00,'2021-05-01',0,1,1,'2021-03-26 00:09:46','2021-05-30 05:42:47'),(9,3,4,0,1,2,'Errol','James','Garcia','Rank and File',5.00,15,'0923-000-0000','erroljames.garcia@theblackcoders.com','errol','errol','U2FsdGVkX19V12GTST7JfYpGGHKqebDMxtMGivdkV2Q=','TEST','31-2000-000-0','default.jpg','Male','1999-06-12','null','Philippine, Filipino','Single','321-732-432','32-5327436-3','64-327345745-7','5327-3474-5654','NCR','TAGUIG - PATEROS','PATEROS','SANTA ANA','','250','P. Rosales Street','Luna Compound','Philippines','1621',499632.00,22710.55,2838.82,500.00,'2020-03-12',1,1,1,'2021-04-22 06:38:46','2021-06-14 06:42:07'),(19,1,3,0,1,2,'Lawrence','','Mark',NULL,NULL,2,'0963-242-3432','mark@gmail.com','lawrence','lawrence','U2FsdGVkX19apNdfdvi63topGNN+FGzX3fb3Qk+6Rs4=','Mark','34-1265-123-4','1620790479.png','Female','2021-04-15',NULL,'Philippine, Filipino','Single','634-654-364','53-2523734-5','32-463274325-4','2346-7436-4374','01','ILOCOS SUR','BANAYOYO','BISANGOL','1701','Antel','Julia','Ortigas','Ph','1243',150000.00,6818.18,852.27,500.00,'2021-04-13',1,1,1,'2021-04-23 03:10:08','2021-06-14 06:42:07'),(20,3,9,0,2,2,'Joseph','','Berongoy','Rank and File',5.00,19,'0995-876-8725','joseph.berongoy@theblackcoders.com','heeeyseph','admin','U2FsdGVkX1/vlEYhgxJAYc8wiI4oUTsdEw0rZmpXwV0=','Joseph Berongoy','48-3492-347-3','1619663463.png','Male','1998-09-10','null','Philippine, Filipino','Single','253-453-532','32-5435435-3','24-353445653-4','4656-4562-4344','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','CITY OF PASIG','MANGGAHAN','','1600','Ampalaya Street','NAPICO','Philippines','1611',50000.00,2272.73,284.09,0.00,'2019-10-21',1,1,1,'2021-04-29 02:30:11','2021-05-28 07:42:36'),(21,3,4,0,1,2,'Ayesha','','Porras',NULL,NULL,1,'0920-542-9523','ayesha18@gmail.com','ayesha','ayesha','U2FsdGVkX19cK5POEThvyU79EA1xymHkgS94n63M51I=','Ayesha Porras','54-3535-353-5','1620790551.png','Female','1998-04-13',NULL,'Philippine, Filipino','Single','343-645-454','23-1214234-3','32-532543545-4','3432-5436-5463','4A','QUEZON','LUCENA CITY','BARANGAY 5 (POB.)','','28','St. Paul Payatas','none','Philippine','1191',15500.00,704.55,88.07,120.00,'2021-05-03',2,1,1,'2021-05-06 04:54:24','2021-06-03 03:02:38'),(22,1,7,0,1,0,'Jelo','','De Guzman',NULL,NULL,17,'0929-123-4567','jelodeguzman@gmail.com','installer','installer','U2FsdGVkX18DI+8QHRMktaJQ8QqXUn1WhLKd0Zzj8EQ=','','','1620629982.png','Male','1995-10-18',NULL,'Philippine, Filipino','Married','','','','','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','QUEZON CITY','COMMONWEALTH','1234','567','Street Kalsada','Jelo\'s','Philippines','0101',13000.00,590.91,73.86,0.00,'2020-01-06',1,1,1,'2021-05-10 06:59:42','2021-06-07 01:28:20');
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
) ENGINE=InnoDB AUTO_INCREMENT=12593 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_employee_permission_tbl`
--

LOCK TABLES `hris_employee_permission_tbl` WRITE;
/*!40000 ALTER TABLE `hris_employee_permission_tbl` DISABLE KEYS */;
INSERT INTO `hris_employee_permission_tbl` VALUES (3407,22,1,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3408,22,2,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3409,22,3,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3410,22,4,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3411,22,5,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3412,22,6,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3413,22,7,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3414,22,8,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3415,22,9,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3416,22,10,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3417,22,11,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3418,22,12,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3419,22,13,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3420,22,14,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3421,22,15,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3422,22,16,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3423,22,17,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3424,22,18,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3425,22,19,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3426,22,20,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3427,22,21,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3428,22,22,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3429,22,23,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3430,22,24,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3431,22,25,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3432,22,26,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3433,22,27,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3434,22,28,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3435,22,29,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3436,22,30,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3437,22,31,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3438,22,32,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3439,22,33,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3440,22,34,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3441,22,35,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3442,22,36,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3443,22,37,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3444,22,38,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3445,22,39,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3446,22,40,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3447,22,41,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3448,22,42,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3449,22,43,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3450,22,44,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3451,22,45,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3452,22,46,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3453,22,47,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3454,22,48,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3455,22,49,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3456,22,50,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3457,22,51,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3458,22,52,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3459,22,53,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3460,22,54,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3461,22,55,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3462,22,56,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3463,22,57,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3464,22,58,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3465,22,59,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3466,22,60,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3467,22,61,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3468,22,62,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3469,22,63,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3470,22,64,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3471,22,65,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3472,22,66,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3473,22,67,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3474,22,68,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3475,22,69,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3476,22,70,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3477,22,71,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3478,22,72,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3479,22,73,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3480,22,74,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3481,22,75,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3482,22,76,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3483,22,77,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3484,22,78,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3485,22,79,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3486,22,80,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3487,22,81,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3488,22,82,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3489,22,83,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3490,22,84,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3491,22,85,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3492,22,86,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3493,22,87,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3494,22,88,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3495,22,89,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3496,22,90,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3497,22,91,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3498,22,92,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3499,22,93,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3500,22,94,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3501,22,95,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3502,22,96,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3503,22,97,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3504,22,98,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3505,22,99,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3506,22,100,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3507,22,101,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3508,22,102,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3509,22,103,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3510,22,104,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3511,22,105,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3512,22,106,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3513,22,107,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3514,22,108,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3515,22,109,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3516,22,110,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3517,22,111,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3518,22,112,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3519,22,113,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3520,22,114,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3521,22,115,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3522,22,116,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3523,22,117,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3524,22,118,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3525,22,119,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3526,22,120,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3527,22,121,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3528,22,122,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3529,22,123,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3530,22,124,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3531,22,125,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3532,22,126,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3533,22,127,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3534,22,128,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3535,22,129,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(4306,5,1,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4307,5,2,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4308,5,3,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4309,5,4,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4310,5,5,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4311,5,6,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4312,5,7,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4313,5,8,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4314,5,9,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4315,5,10,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4316,5,11,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4317,5,12,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4318,5,13,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4319,5,14,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4320,5,15,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4321,5,16,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4322,5,17,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4323,5,18,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4324,5,19,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4325,5,20,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4326,5,21,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4327,5,22,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4328,5,23,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4329,5,24,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4330,5,25,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4331,5,26,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4332,5,27,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4333,5,28,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4334,5,29,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4335,5,30,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4336,5,31,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4337,5,32,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4338,5,33,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4339,5,34,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4340,5,35,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4341,5,36,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4342,5,37,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4343,5,38,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4344,5,39,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4345,5,40,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4346,5,41,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4347,5,42,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4348,5,43,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4349,5,44,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4350,5,45,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4351,5,46,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4352,5,47,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4353,5,49,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4354,5,50,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4355,5,51,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4356,5,52,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4357,5,53,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4358,5,54,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4359,5,55,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4360,5,56,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4361,5,57,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4362,5,58,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4363,5,59,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4364,5,60,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4365,5,61,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4366,5,62,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4367,5,63,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4368,5,64,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4369,5,65,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4370,5,66,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4371,5,67,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4372,5,68,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4373,5,69,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4374,5,70,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4375,5,71,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4376,5,72,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4377,5,73,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4378,5,74,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4379,5,75,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4380,5,76,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4381,5,77,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4382,5,78,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4383,5,79,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4384,5,80,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4385,5,81,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4386,5,82,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4387,5,83,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4388,5,84,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4389,5,85,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4390,5,86,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4391,5,87,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4392,5,88,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4393,5,89,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4394,5,90,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4395,5,91,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4396,5,92,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4397,5,93,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4398,5,94,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4399,5,95,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4400,5,96,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4401,5,97,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4402,5,98,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4403,5,99,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4404,5,100,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4405,5,101,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4406,5,102,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4407,5,103,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4408,5,104,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4409,5,105,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4410,5,106,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4411,5,107,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4412,5,108,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4413,5,109,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4414,5,110,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4415,5,111,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4416,5,112,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4417,5,113,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4418,5,114,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4419,5,115,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4420,5,116,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4421,5,117,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4422,5,118,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4423,5,119,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4424,5,120,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4425,5,121,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4426,5,122,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4427,5,123,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4428,5,124,1,1,1,1,1,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4429,5,125,0,0,1,0,0,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4430,5,126,0,0,1,0,0,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4431,5,127,0,0,1,0,0,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4432,5,128,0,0,1,0,0,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4433,5,129,0,0,1,0,0,1,1,'2021-05-12 03:30:18','2021-05-12 03:30:18'),(4690,19,1,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4691,19,2,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4692,19,3,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4693,19,4,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4694,19,5,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4695,19,6,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4696,19,7,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4697,19,8,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4698,19,9,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4699,19,10,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4700,19,11,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4701,19,12,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4702,19,13,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4703,19,14,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4704,19,15,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4705,19,16,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4706,19,17,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4707,19,18,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4708,19,19,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4709,19,20,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4710,19,21,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4711,19,22,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4712,19,23,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4713,19,24,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4714,19,25,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4715,19,26,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4716,19,27,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4717,19,28,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4718,19,29,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4719,19,30,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4720,19,31,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4721,19,32,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4722,19,33,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4723,19,34,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4724,19,35,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4725,19,36,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4726,19,37,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4727,19,38,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4728,19,39,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4729,19,40,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4730,19,41,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4731,19,42,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4732,19,43,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4733,19,44,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4734,19,45,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4735,19,46,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4736,19,47,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4737,19,49,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4738,19,50,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4739,19,51,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4740,19,52,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4741,19,53,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4742,19,54,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4743,19,55,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4744,19,56,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4745,19,57,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4746,19,58,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4747,19,59,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4748,19,60,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4749,19,61,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4750,19,62,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4751,19,63,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4752,19,64,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4753,19,65,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4754,19,66,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4755,19,67,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4756,19,68,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4757,19,69,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4758,19,70,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4759,19,71,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4760,19,72,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4761,19,73,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4762,19,74,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4763,19,75,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4764,19,76,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4765,19,77,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4766,19,78,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4767,19,79,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4768,19,80,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4769,19,81,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4770,19,82,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4771,19,83,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4772,19,84,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4773,19,85,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4774,19,86,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4775,19,87,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4776,19,88,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4777,19,89,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4778,19,90,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4779,19,91,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4780,19,92,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4781,19,93,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4782,19,94,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4783,19,95,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4784,19,96,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4785,19,97,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4786,19,98,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4787,19,99,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4788,19,100,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4789,19,101,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4790,19,102,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4791,19,103,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4792,19,104,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4793,19,105,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4794,19,106,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4795,19,107,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4796,19,108,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4797,19,109,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4798,19,110,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4799,19,111,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4800,19,112,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4801,19,113,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4802,19,114,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4803,19,115,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4804,19,116,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4805,19,117,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4806,19,118,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4807,19,119,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4808,19,120,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4809,19,121,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4810,19,122,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4811,19,123,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4812,19,124,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4813,19,125,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4814,19,126,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4815,19,127,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4816,19,128,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4817,19,129,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4946,21,1,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4947,21,2,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4948,21,3,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4949,21,4,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4950,21,5,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4951,21,6,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4952,21,7,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4953,21,8,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4954,21,9,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4955,21,10,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4956,21,11,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4957,21,12,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4958,21,13,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4959,21,14,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4960,21,15,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4961,21,16,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4962,21,17,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4963,21,18,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4964,21,19,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4965,21,20,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4966,21,21,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4967,21,22,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4968,21,23,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4969,21,24,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4970,21,25,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4971,21,26,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4972,21,27,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4973,21,28,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4974,21,29,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4975,21,30,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4976,21,31,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4977,21,32,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4978,21,33,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4979,21,34,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4980,21,35,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4981,21,36,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4982,21,37,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4983,21,38,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4984,21,39,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4985,21,40,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4986,21,41,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4987,21,42,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4988,21,43,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4989,21,44,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4990,21,45,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4991,21,46,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4992,21,47,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4993,21,49,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4994,21,50,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4995,21,51,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4996,21,52,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4997,21,53,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4998,21,54,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4999,21,55,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5000,21,56,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5001,21,57,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5002,21,58,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5003,21,59,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5004,21,60,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5005,21,61,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5006,21,62,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5007,21,63,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5008,21,64,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5009,21,65,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5010,21,66,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5011,21,67,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5012,21,68,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5013,21,69,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5014,21,70,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5015,21,71,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5016,21,72,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5017,21,73,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5018,21,74,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5019,21,75,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5020,21,76,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5021,21,77,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5022,21,78,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5023,21,79,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5024,21,80,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5025,21,81,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5026,21,82,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5027,21,83,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5028,21,84,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5029,21,85,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5030,21,86,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5031,21,87,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5032,21,88,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5033,21,89,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5034,21,90,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5035,21,91,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5036,21,92,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5037,21,93,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5038,21,94,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5039,21,95,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5040,21,96,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5041,21,97,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5042,21,98,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5043,21,99,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5044,21,100,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5045,21,101,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5046,21,102,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5047,21,103,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5048,21,104,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5049,21,105,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5050,21,106,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5051,21,107,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5052,21,108,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5053,21,109,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5054,21,110,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5055,21,111,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5056,21,112,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5057,21,113,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5058,21,114,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5059,21,115,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5060,21,116,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5061,21,117,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5062,21,118,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5063,21,119,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5064,21,120,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5065,21,121,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5066,21,122,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5067,21,123,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5068,21,124,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5069,21,125,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5070,21,126,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5071,21,127,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5072,21,128,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5073,21,129,0,0,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5842,8,1,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5843,8,2,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5844,8,3,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5845,8,4,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5846,8,5,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5847,8,6,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5848,8,7,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5849,8,8,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5850,8,9,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5851,8,10,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5852,8,11,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5853,8,12,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5854,8,13,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5855,8,14,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5856,8,15,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5857,8,16,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5858,8,17,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5859,8,18,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5860,8,19,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5861,8,20,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5862,8,21,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5863,8,22,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5864,8,23,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5865,8,24,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5866,8,25,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5867,8,26,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5868,8,27,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5869,8,28,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5870,8,29,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5871,8,30,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5872,8,31,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5873,8,32,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5874,8,33,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5875,8,34,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5876,8,35,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5877,8,36,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5878,8,37,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5879,8,38,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5880,8,39,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5881,8,40,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5882,8,41,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5883,8,42,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5884,8,43,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5885,8,44,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5886,8,45,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5887,8,46,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5888,8,47,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5889,8,49,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5890,8,50,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5891,8,51,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5892,8,52,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5893,8,53,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5894,8,54,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5895,8,55,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5896,8,56,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5897,8,57,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5898,8,58,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5899,8,59,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5900,8,60,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5901,8,61,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5902,8,62,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5903,8,63,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5904,8,64,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5905,8,65,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5906,8,66,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5907,8,67,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5908,8,68,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5909,8,69,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5910,8,70,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5911,8,71,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5912,8,72,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5913,8,73,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5914,8,74,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5915,8,75,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5916,8,76,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5917,8,77,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5918,8,78,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5919,8,79,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5920,8,80,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5921,8,81,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5922,8,82,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5923,8,83,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5924,8,84,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5925,8,85,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5926,8,86,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5927,8,87,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5928,8,88,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5929,8,89,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5930,8,90,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5931,8,91,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5932,8,92,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5933,8,93,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5934,8,94,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5935,8,95,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5936,8,96,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5937,8,97,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5938,8,98,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5939,8,99,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5940,8,100,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5941,8,101,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5942,8,102,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5943,8,103,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5944,8,104,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5945,8,105,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5946,8,106,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5947,8,107,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5948,8,108,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5949,8,109,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5950,8,110,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5951,8,111,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5952,8,112,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5953,8,113,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5954,8,114,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5955,8,115,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5956,8,116,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5957,8,117,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5958,8,118,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5959,8,119,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5960,8,120,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5961,8,121,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5962,8,122,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5963,8,123,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5964,8,124,1,1,1,1,1,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5965,8,125,0,0,1,0,0,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5966,8,126,0,0,1,0,0,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5967,8,127,0,0,1,0,0,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5968,8,128,0,0,1,0,0,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(5969,8,129,0,0,1,0,0,1,1,'2021-05-14 02:28:59','2021-05-14 02:28:59'),(6738,6,1,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6739,6,2,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6740,6,3,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6741,6,4,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6742,6,5,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6743,6,6,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6744,6,7,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6745,6,8,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6746,6,9,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6747,6,10,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6748,6,11,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6749,6,12,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6750,6,13,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6751,6,14,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6752,6,15,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6753,6,16,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6754,6,17,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6755,6,18,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6756,6,19,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6757,6,20,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6758,6,21,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6759,6,22,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6760,6,23,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6761,6,24,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6762,6,25,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6763,6,26,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6764,6,27,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6765,6,28,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6766,6,29,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6767,6,30,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6768,6,31,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6769,6,32,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6770,6,33,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6771,6,34,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6772,6,35,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6773,6,36,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6774,6,37,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6775,6,38,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6776,6,39,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6777,6,40,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6778,6,41,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6779,6,42,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6780,6,43,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6781,6,44,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6782,6,45,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6783,6,46,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6784,6,47,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6785,6,49,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6786,6,50,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6787,6,51,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6788,6,52,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6789,6,53,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6790,6,54,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6791,6,55,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6792,6,56,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6793,6,57,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6794,6,58,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6795,6,59,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6796,6,60,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6797,6,61,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6798,6,62,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6799,6,63,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6800,6,64,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6801,6,65,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6802,6,66,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6803,6,67,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6804,6,68,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6805,6,69,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6806,6,70,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6807,6,71,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6808,6,72,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6809,6,73,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6810,6,74,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6811,6,75,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6812,6,76,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6813,6,77,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6814,6,78,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6815,6,79,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6816,6,80,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6817,6,81,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6818,6,82,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6819,6,83,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6820,6,84,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6821,6,85,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6822,6,86,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6823,6,87,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6824,6,88,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6825,6,89,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6826,6,90,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6827,6,91,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6828,6,92,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6829,6,93,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6830,6,94,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6831,6,95,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6832,6,96,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6833,6,97,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6834,6,98,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6835,6,99,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6836,6,100,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6837,6,101,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6838,6,102,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6839,6,103,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6840,6,104,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6841,6,105,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6842,6,106,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6843,6,107,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6844,6,108,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6845,6,109,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6846,6,110,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6847,6,111,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6848,6,112,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6849,6,113,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6850,6,114,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6851,6,115,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6852,6,116,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6853,6,117,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6854,6,118,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6855,6,119,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6856,6,120,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6857,6,121,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6858,6,122,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6859,6,123,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6860,6,124,1,1,1,1,1,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6861,6,125,0,0,1,0,0,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6862,6,126,0,0,1,0,0,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6863,6,127,0,0,1,0,0,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6864,6,128,0,0,1,0,0,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(6865,6,129,0,0,1,0,0,1,1,'2021-05-19 23:45:36','2021-05-19 23:45:36'),(7510,7,1,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7511,7,2,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7512,7,3,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7513,7,4,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7514,7,5,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7515,7,6,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7516,7,7,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7517,7,8,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7518,7,9,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7519,7,10,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7520,7,11,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7521,7,12,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7522,7,13,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7523,7,14,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7524,7,15,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7525,7,16,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7526,7,17,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7527,7,18,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7528,7,19,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7529,7,20,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7530,7,21,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7531,7,22,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7532,7,23,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7533,7,24,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7534,7,25,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7535,7,26,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7536,7,27,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7537,7,28,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7538,7,29,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7539,7,30,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7540,7,31,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7541,7,32,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7542,7,33,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7543,7,34,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7544,7,35,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7545,7,36,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7546,7,37,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7547,7,38,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7548,7,39,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7549,7,40,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7550,7,41,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7551,7,42,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7552,7,43,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7553,7,44,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7554,7,45,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7555,7,46,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7556,7,47,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7557,7,49,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7558,7,50,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7559,7,51,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7560,7,52,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7561,7,53,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7562,7,54,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7563,7,55,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7564,7,56,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7565,7,57,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7566,7,58,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7567,7,59,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7568,7,60,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7569,7,61,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7570,7,62,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7571,7,63,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7572,7,64,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7573,7,65,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7574,7,66,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7575,7,67,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7576,7,68,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7577,7,69,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7578,7,70,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7579,7,71,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7580,7,72,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7581,7,73,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7582,7,74,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7583,7,75,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7584,7,76,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7585,7,77,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7586,7,78,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7587,7,79,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7588,7,80,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7589,7,81,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7590,7,82,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7591,7,83,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7592,7,84,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7593,7,85,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7594,7,86,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7595,7,87,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7596,7,88,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7597,7,89,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7598,7,90,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7599,7,91,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7600,7,92,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7601,7,93,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7602,7,94,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7603,7,95,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7604,7,96,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7605,7,97,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7606,7,98,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7607,7,99,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7608,7,100,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7609,7,101,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7610,7,102,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7611,7,103,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7612,7,104,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7613,7,105,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7614,7,106,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7615,7,107,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7616,7,108,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7617,7,109,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7618,7,110,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7619,7,111,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7620,7,112,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7621,7,113,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7622,7,114,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7623,7,115,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7624,7,116,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7625,7,117,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7626,7,118,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7627,7,119,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7628,7,120,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7629,7,121,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7630,7,122,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7631,7,123,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7632,7,124,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7633,7,125,0,0,1,0,0,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7634,7,126,0,0,1,0,0,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7635,7,127,0,0,1,0,0,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7636,7,128,0,0,1,0,0,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7637,7,129,0,0,1,0,0,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7638,7,130,0,0,1,0,0,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(8158,3,1,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8159,3,2,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8160,3,3,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8161,3,4,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8162,3,5,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8163,3,6,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8164,3,7,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8165,3,8,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8166,3,9,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8167,3,10,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8168,3,11,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8169,3,12,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8170,3,13,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8171,3,14,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8172,3,15,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8173,3,16,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8174,3,17,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8175,3,18,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8176,3,19,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8177,3,20,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8178,3,21,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8179,3,22,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8180,3,23,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8181,3,24,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8182,3,25,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8183,3,26,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8184,3,27,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8185,3,28,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8186,3,29,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8187,3,30,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8188,3,31,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8189,3,32,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8190,3,33,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8191,3,34,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8192,3,35,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8193,3,36,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8194,3,37,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8195,3,38,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8196,3,39,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8197,3,40,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8198,3,41,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8199,3,42,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8200,3,43,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8201,3,44,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8202,3,45,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8203,3,46,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8204,3,47,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8205,3,49,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8206,3,50,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8207,3,51,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8208,3,52,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8209,3,53,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8210,3,54,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8211,3,55,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8212,3,56,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8213,3,57,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8214,3,58,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8215,3,59,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8216,3,60,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8217,3,61,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8218,3,62,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8219,3,63,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8220,3,64,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8221,3,65,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8222,3,66,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8223,3,67,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8224,3,68,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8225,3,69,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8226,3,70,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8227,3,71,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8228,3,72,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8229,3,73,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8230,3,74,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8231,3,75,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8232,3,76,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8233,3,77,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8234,3,78,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8235,3,79,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8236,3,80,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8237,3,81,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8238,3,82,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8239,3,83,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8240,3,84,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8241,3,85,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8242,3,86,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8243,3,87,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8244,3,88,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8245,3,89,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8246,3,90,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8247,3,91,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8248,3,92,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8249,3,93,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8250,3,94,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8251,3,95,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8252,3,96,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8253,3,97,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8254,3,98,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8255,3,99,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8256,3,100,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8257,3,101,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8258,3,102,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8259,3,103,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8260,3,104,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8261,3,105,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8262,3,106,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8263,3,107,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8264,3,108,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8265,3,109,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8266,3,110,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8267,3,111,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8268,3,112,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8269,3,113,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8270,3,114,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8271,3,115,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8272,3,116,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8273,3,117,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8274,3,118,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8275,3,119,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8276,3,120,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8277,3,121,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8278,3,122,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8279,3,123,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8280,3,124,1,1,1,1,1,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8281,3,125,0,0,1,0,0,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8282,3,126,0,0,1,0,0,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8283,3,127,0,0,1,0,0,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8284,3,128,0,0,1,0,0,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8285,3,129,0,0,1,0,0,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8286,3,130,0,0,1,0,0,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(8287,3,131,0,0,1,0,0,1,1,'2021-05-27 06:53:20','2021-05-27 06:53:20'),(9328,20,1,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9329,20,2,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9330,20,3,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9331,20,4,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9332,20,5,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9333,20,6,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9334,20,7,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9335,20,8,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9336,20,9,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9337,20,10,1,1,1,1,0,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9338,20,11,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9339,20,12,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9340,20,13,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9341,20,14,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9342,20,15,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9343,20,16,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9344,20,17,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9345,20,18,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9346,20,19,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9347,20,20,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9348,20,21,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9349,20,22,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9350,20,23,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9351,20,24,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9352,20,25,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9353,20,26,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9354,20,27,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9355,20,28,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9356,20,29,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9357,20,30,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9358,20,31,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9359,20,32,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9360,20,33,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9361,20,34,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9362,20,35,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9363,20,36,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9364,20,37,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9365,20,38,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9366,20,39,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9367,20,40,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9368,20,41,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9369,20,42,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9370,20,43,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9371,20,44,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9372,20,45,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9373,20,46,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9374,20,47,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9375,20,49,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9376,20,50,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9377,20,51,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9378,20,52,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9379,20,53,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9380,20,54,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9381,20,55,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9382,20,56,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9383,20,57,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9384,20,58,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9385,20,59,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9386,20,60,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9387,20,61,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9388,20,62,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9389,20,63,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9390,20,64,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9391,20,65,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9392,20,66,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9393,20,67,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9394,20,68,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9395,20,69,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9396,20,70,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9397,20,71,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9398,20,72,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9399,20,73,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9400,20,74,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9401,20,75,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9402,20,76,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9403,20,77,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9404,20,78,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9405,20,79,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9406,20,80,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9407,20,81,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9408,20,82,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9409,20,83,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9410,20,84,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9411,20,85,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9412,20,86,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9413,20,87,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9414,20,88,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9415,20,89,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9416,20,90,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9417,20,91,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9418,20,92,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9419,20,93,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9420,20,94,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9421,20,95,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9422,20,96,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9423,20,97,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9424,20,98,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9425,20,99,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9426,20,100,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9427,20,101,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9428,20,102,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9429,20,103,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9430,20,104,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9431,20,105,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9432,20,106,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9433,20,107,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9434,20,108,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9435,20,109,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9436,20,110,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9437,20,111,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9438,20,112,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9439,20,113,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9440,20,114,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9441,20,115,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9442,20,116,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9443,20,117,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9444,20,118,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9445,20,119,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9446,20,120,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9447,20,121,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9448,20,122,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9449,20,123,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9450,20,124,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9451,20,125,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9452,20,126,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9453,20,127,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9454,20,128,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9455,20,129,1,1,1,1,1,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9456,20,130,0,0,1,0,0,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9457,20,131,0,0,1,0,0,1,1,'2021-05-28 07:42:36','2021-05-28 07:42:36'),(9718,9,1,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9719,9,2,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9720,9,3,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9721,9,4,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9722,9,5,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9723,9,6,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9724,9,7,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9725,9,8,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9726,9,9,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9727,9,10,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9728,9,11,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9729,9,12,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9730,9,13,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9731,9,14,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9732,9,15,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9733,9,16,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9734,9,17,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9735,9,18,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9736,9,19,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9737,9,20,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9738,9,21,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9739,9,22,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9740,9,23,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9741,9,24,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9742,9,25,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9743,9,26,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9744,9,27,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9745,9,28,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9746,9,29,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9747,9,30,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9748,9,31,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9749,9,32,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9750,9,33,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9751,9,34,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9752,9,35,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9753,9,36,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9754,9,37,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9755,9,38,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9756,9,39,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9757,9,40,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9758,9,41,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9759,9,42,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9760,9,43,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9761,9,44,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9762,9,45,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9763,9,46,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9764,9,47,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9765,9,49,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9766,9,50,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9767,9,51,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9768,9,52,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9769,9,53,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9770,9,54,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9771,9,55,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9772,9,56,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9773,9,57,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9774,9,58,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9775,9,59,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9776,9,60,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9777,9,61,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9778,9,62,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9779,9,63,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9780,9,64,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9781,9,65,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9782,9,66,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9783,9,67,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9784,9,68,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9785,9,69,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9786,9,70,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9787,9,71,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9788,9,72,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9789,9,73,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9790,9,74,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9791,9,75,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9792,9,76,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9793,9,77,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9794,9,78,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9795,9,79,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9796,9,80,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9797,9,81,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9798,9,82,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9799,9,83,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9800,9,84,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9801,9,85,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9802,9,86,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9803,9,87,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9804,9,88,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9805,9,89,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9806,9,90,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9807,9,91,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9808,9,92,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9809,9,93,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9810,9,94,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9811,9,95,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9812,9,96,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9813,9,97,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9814,9,98,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9815,9,99,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9816,9,100,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9817,9,101,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9818,9,102,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9819,9,103,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9820,9,104,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9821,9,105,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9822,9,106,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9823,9,107,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9824,9,108,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9825,9,109,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9826,9,110,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9827,9,111,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9828,9,112,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9829,9,113,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9830,9,114,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9831,9,115,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9832,9,116,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9833,9,117,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9834,9,118,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9835,9,119,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9836,9,120,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9837,9,121,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9838,9,122,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9839,9,123,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9840,9,124,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9841,9,125,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9842,9,126,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9843,9,127,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9844,9,128,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9845,9,129,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9846,9,130,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(9847,9,131,0,0,1,0,0,1,1,'2021-06-01 07:47:24','2021-06-01 07:47:24'),(10498,4,1,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10499,4,2,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10500,4,3,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10501,4,4,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10502,4,5,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10503,4,6,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10504,4,7,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10505,4,8,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10506,4,9,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10507,4,10,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10508,4,11,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10509,4,12,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10510,4,13,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10511,4,14,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10512,4,15,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10513,4,16,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10514,4,17,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10515,4,18,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10516,4,19,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10517,4,20,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10518,4,21,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10519,4,22,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10520,4,23,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10521,4,24,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10522,4,25,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10523,4,26,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10524,4,27,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10525,4,28,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10526,4,29,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10527,4,30,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10528,4,31,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10529,4,32,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10530,4,33,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10531,4,34,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10532,4,35,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10533,4,36,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10534,4,37,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10535,4,38,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10536,4,39,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10537,4,40,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10538,4,41,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10539,4,42,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10540,4,43,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10541,4,44,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10542,4,45,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10543,4,46,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10544,4,47,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10545,4,49,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10546,4,50,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10547,4,51,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10548,4,52,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10549,4,53,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10550,4,54,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10551,4,55,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10552,4,56,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10553,4,57,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10554,4,58,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10555,4,59,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10556,4,60,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10557,4,61,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10558,4,62,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10559,4,63,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10560,4,64,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10561,4,65,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10562,4,66,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10563,4,67,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10564,4,68,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10565,4,69,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10566,4,70,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10567,4,71,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10568,4,72,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10569,4,73,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10570,4,74,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10571,4,75,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10572,4,76,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10573,4,77,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10574,4,78,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10575,4,79,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10576,4,80,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10577,4,81,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10578,4,82,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10579,4,83,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10580,4,84,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10581,4,85,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10582,4,86,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10583,4,87,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10584,4,88,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10585,4,89,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10586,4,90,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10587,4,91,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10588,4,92,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10589,4,93,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10590,4,94,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10591,4,95,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10592,4,96,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10593,4,97,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10594,4,98,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10595,4,99,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10596,4,100,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10597,4,101,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10598,4,102,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10599,4,103,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10600,4,104,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10601,4,105,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10602,4,106,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10603,4,107,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10604,4,108,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10605,4,109,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10606,4,110,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10607,4,111,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10608,4,112,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10609,4,113,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10610,4,114,0,0,1,0,0,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10611,4,115,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10612,4,116,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10613,4,117,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10614,4,118,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10615,4,119,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10616,4,120,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10617,4,121,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10618,4,122,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10619,4,123,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10620,4,124,1,1,1,1,1,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10621,4,125,0,0,1,0,0,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10622,4,126,0,0,1,0,0,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10623,4,127,0,0,1,0,0,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10624,4,128,0,0,1,0,0,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10625,4,129,0,0,1,0,0,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10626,4,130,0,0,1,0,0,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(10627,4,131,0,0,1,0,0,1,1,'2021-06-04 08:08:41','2021-06-04 08:08:41'),(12195,1,1,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12196,1,2,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12197,1,3,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12198,1,4,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12199,1,5,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12200,1,6,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12201,1,7,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12202,1,8,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12203,1,9,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12204,1,10,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12205,1,11,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12206,1,12,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12207,1,13,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12208,1,14,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12209,1,15,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12210,1,16,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12211,1,17,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12212,1,18,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12213,1,19,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12214,1,20,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12215,1,21,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12216,1,22,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12217,1,23,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12218,1,24,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12219,1,25,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12220,1,26,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12221,1,27,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12222,1,28,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12223,1,29,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12224,1,30,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12225,1,31,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12226,1,32,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12227,1,33,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12228,1,34,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12229,1,35,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12230,1,36,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12231,1,37,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12232,1,38,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12233,1,39,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12234,1,40,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12235,1,41,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12236,1,42,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12237,1,43,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12238,1,44,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12239,1,45,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12240,1,46,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12241,1,47,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12242,1,49,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12243,1,50,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12244,1,51,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12245,1,52,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12246,1,53,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12247,1,54,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12248,1,55,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12249,1,56,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12250,1,57,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12251,1,58,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12252,1,59,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12253,1,60,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12254,1,61,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12255,1,62,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12256,1,63,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12257,1,64,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12258,1,65,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12259,1,66,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12260,1,67,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12261,1,68,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12262,1,69,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12263,1,70,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12264,1,71,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12265,1,72,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12266,1,73,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12267,1,74,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12268,1,75,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12269,1,76,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12270,1,77,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12271,1,78,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12272,1,79,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12273,1,80,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12274,1,81,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12275,1,82,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12276,1,83,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12277,1,84,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12278,1,85,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12279,1,86,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12280,1,87,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12281,1,88,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12282,1,89,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12283,1,90,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12284,1,91,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12285,1,92,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12286,1,93,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12287,1,94,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12288,1,95,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12289,1,96,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12290,1,97,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12291,1,98,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12292,1,99,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12293,1,100,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12294,1,101,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12295,1,102,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12296,1,103,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12297,1,104,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12298,1,105,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12299,1,106,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12300,1,107,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12301,1,108,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12302,1,109,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12303,1,110,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12304,1,111,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12305,1,112,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12306,1,113,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12307,1,114,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12308,1,115,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12309,1,116,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12310,1,117,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12311,1,118,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12312,1,119,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12313,1,120,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12314,1,121,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12315,1,122,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12316,1,123,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12317,1,124,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12318,1,125,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12319,1,126,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12320,1,127,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12321,1,128,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12322,1,129,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12323,1,130,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12324,1,131,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12325,1,132,1,1,1,1,1,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12326,1,133,0,0,1,0,0,1,1,'2021-06-18 06:09:12','2021-06-18 06:09:12'),(12460,2,1,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12461,2,2,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12462,2,3,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12463,2,4,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12464,2,5,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12465,2,6,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12466,2,7,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12467,2,8,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12468,2,9,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12469,2,10,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12470,2,11,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12471,2,12,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12472,2,13,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12473,2,14,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12474,2,15,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12475,2,16,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12476,2,17,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12477,2,18,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12478,2,19,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12479,2,20,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12480,2,21,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12481,2,22,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12482,2,23,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12483,2,24,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12484,2,25,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12485,2,26,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12486,2,27,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12487,2,28,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12488,2,29,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12489,2,30,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12490,2,31,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12491,2,32,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12492,2,33,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12493,2,34,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12494,2,35,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12495,2,36,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12496,2,37,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12497,2,38,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12498,2,39,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12499,2,40,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12500,2,41,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12501,2,42,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12502,2,43,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12503,2,44,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12504,2,45,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12505,2,46,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12506,2,47,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12507,2,49,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12508,2,50,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12509,2,51,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12510,2,52,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12511,2,53,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12512,2,54,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12513,2,55,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12514,2,56,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12515,2,57,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12516,2,58,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12517,2,59,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12518,2,60,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12519,2,61,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12520,2,62,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12521,2,63,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12522,2,64,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12523,2,65,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12524,2,66,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12525,2,67,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12526,2,68,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12527,2,69,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12528,2,70,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12529,2,71,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12530,2,72,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12531,2,73,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12532,2,74,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12533,2,75,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12534,2,76,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12535,2,77,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12536,2,78,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12537,2,79,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12538,2,80,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12539,2,81,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12540,2,82,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12541,2,83,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12542,2,84,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12543,2,85,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12544,2,86,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12545,2,87,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12546,2,88,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12547,2,89,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12548,2,90,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12549,2,91,1,1,1,0,0,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12550,2,92,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12551,2,93,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12552,2,94,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12553,2,95,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12554,2,96,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12555,2,97,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12556,2,98,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12557,2,99,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12558,2,100,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12559,2,101,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12560,2,102,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12561,2,103,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12562,2,104,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12563,2,105,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12564,2,106,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12565,2,107,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12566,2,108,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12567,2,109,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12568,2,110,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12569,2,111,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12570,2,112,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12571,2,113,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12572,2,114,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12573,2,115,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12574,2,116,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12575,2,117,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12576,2,118,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12577,2,119,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12578,2,120,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12579,2,121,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12580,2,122,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12581,2,123,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12582,2,124,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12583,2,125,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12584,2,126,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12585,2,127,1,1,1,1,1,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12586,2,128,0,0,1,0,0,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12587,2,129,0,0,1,0,0,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12588,2,130,0,0,1,0,0,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12589,2,131,0,0,1,0,0,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12590,2,132,0,0,1,0,0,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12591,2,133,0,0,1,0,0,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57'),(12592,2,134,0,0,1,0,0,1,1,'2021-06-18 06:23:57','2021-06-18 06:23:57');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_event_calendar_tbl`
--

LOCK TABLES `hris_event_calendar_tbl` WRITE;
/*!40000 ALTER TABLE `hris_event_calendar_tbl` DISABLE KEYS */;
INSERT INTO `hris_event_calendar_tbl` VALUES (1,'Departmental Meeting','bg-green','2021-05-17','2021-05-18',0,1,'2021-05-14 06:54:48','2021-05-14 06:54:48'),(2,'General Meeting','bg-yellow','2021-05-24','2021-05-26',0,1,'2021-05-14 06:55:24','2021-05-14 06:55:24'),(3,'Operation Meeting','bg-orange','2021-05-07','2021-05-08',0,1,'2021-05-14 06:55:54','2021-05-14 06:55:54');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_holiday_tbl`
--

LOCK TABLES `hris_holiday_tbl` WRITE;
/*!40000 ALTER TABLE `hris_holiday_tbl` DISABLE KEYS */;
INSERT INTO `hris_holiday_tbl` VALUES (1,'HLD-21-00001','New Year\'s Day','2021-01-01','Regular Holiday',1,1,1,'2021-04-14 23:37:43','2021-04-14 23:37:43'),(2,'HLD-21-00002','Chinese Lunar New Year\'s Day','2021-02-12','Special Non-Working Holiday',1,1,1,'2021-04-14 23:38:15','2021-04-14 23:38:15'),(3,'HLD-21-00003','People Power Anniversary','2021-02-25','Special Non-Working Holiday',1,1,1,'2021-04-14 23:38:44','2021-04-14 23:38:44'),(4,'HLD-21-00004','Maundy Thursday','2021-04-01','Regular Holiday',1,1,1,'2021-04-14 23:39:35','2021-04-14 23:39:35'),(5,'HLD-21-00005','Good Friday','2021-04-02','Regular Holiday',1,1,2,'2021-04-14 23:40:13','2021-05-28 02:02:04'),(6,'HLD-21-00006','The Day of Valor','2021-04-09','Regular Holiday',1,1,1,'2021-04-14 23:40:38','2021-04-14 23:40:38'),(7,'HLD-21-00007','Eidul-Fitar','2021-05-13','Regular Holiday',1,1,1,'2021-04-14 23:41:23','2021-04-14 23:41:23'),(8,'HLD-21-00008','Eid al-Adha (Feast of the Sacrifice)','2021-07-20','Regular Holiday',1,1,1,'2021-04-14 23:42:04','2021-04-14 23:42:04'),(9,'HLD-21-00009','National Heroes Day','2021-08-30','Regular Holiday',1,1,1,'2021-04-14 23:42:36','2021-04-14 23:42:36'),(10,'HLD-21-00010','All Saints\' Day','2021-11-01','Special Non-Working Holiday',1,1,1,'2021-04-14 23:44:32','2021-04-14 23:44:32'),(11,'HLD-21-00011','Bonifacio Day','2021-11-30','Regular Holiday',1,1,1,'2021-04-14 23:45:08','2021-04-14 23:45:08'),(12,'HLD-21-00012','Feast of the Immaculate Conception','2021-12-08','Special Non-Working Holiday',1,1,1,'2021-04-14 23:45:36','2021-04-14 23:45:36'),(13,'HLD-21-00013','Christmas Day','2021-12-25','Regular Holiday',1,1,1,'2021-04-14 23:46:07','2021-04-14 23:46:07'),(14,'HLD-21-00014','Rizal Day','2021-12-30','Regular Holiday',1,1,1,'2021-04-14 23:46:30','2021-04-14 23:46:30');
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
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  PRIMARY KEY (`jobID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_job_posting_tbl`
--

LOCK TABLES `hris_job_posting_tbl` WRITE;
/*!40000 ALTER TABLE `hris_job_posting_tbl` DISABLE KEYS */;
INSERT INTO `hris_job_posting_tbl` VALUES (1,'JPG-21-00001','BlackCoders Group Inc.','Programmer','Code and test programming for software and mobile apps. Develop and deploy computer applications. Execute code builds to test and production environments. Fix bugs in existing code.','Coding and debugging.\nDesigning and testing computer structures.\nTroubleshooting system errors.\nWriting computer instructions.\nManaging database systems.','Full-Time','Computer/Information Technology','Degree in Computer Science or Computer Programming.\nEnd user-oriented.\nExpert IT skills.\nStrong aptitude for math.\nAdvanced knowledge of operating systems.\nAnalytical and problem-solving skills.\nJava, C++, SQL, C#, and HTML experience.','Overtime pay, Night Shift Differential','Tagalog|English',2,1,20000.00,1,'2021-05-14','2021-05-13 22:27:33','0000-00-00 00:00:00',1,1),(2,'JPG-21-00002','BlackCoders Group Inc.','Software Quality Analyst ','Software quality assurance (SQA) analysts are in charge of ensuring that software packages contain no errors by analyzing development data. They implement test plans using diverse troubleshooting computer applications.','Write, implement, and document test cases to identify bugs and rewrite requirements.\nConduct exploratory testing to evaluate robustness and functionality of products.\nDesign, develop, and implement automated testing systems, and evaluate output.','Full-Time','Computer/Information Technology','A software quality assurance analyst will need to have a problem-solving and analytical mind to excel at this job, as they are in charge of creating test plans, automation tests and maintenance procedures. They also ensure that software is coded to industry regulations. Communication skills are very important because analysts are responsible for communicating changes that need to be made to the programming team.','HMO, 13th Month Pay','English',2,1,20000.00,1,'2021-05-14','2021-05-13 22:53:42','0000-00-00 00:00:00',1,1);
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
  `leaveID` bigint(20) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_leave_request_tbl`
--

LOCK TABLES `hris_leave_request_tbl` WRITE;
/*!40000 ALTER TABLE `hris_leave_request_tbl` DISABLE KEYS */;
INSERT INTO `hris_leave_request_tbl` VALUES (10,'',1,'April 13, 2021 - April 15, 2021','0000-00-00','0000-00-00',2,1,1,'gk',NULL,NULL,NULL,4,NULL,NULL,1,1,'2021-04-13 19:03:12','2021-04-13 11:03:29'),(11,'',1,'April 30, 2021 - May 1, 2021','0000-00-00','0000-00-00',2,1,3,'test','4|2|6',NULL,NULL,1,NULL,'2021-04-30 09:53:16',1,1,'2021-04-14 08:57:18','2021-04-30 01:53:18'),(12,'',1,'April 30, 2021 - May 1, 2021','0000-00-00','0000-00-00',2,2,3,'to test','4|2|6',NULL,NULL,1,NULL,'2021-04-30 09:52:43',1,1,'2021-04-30 09:52:43','2021-04-30 01:52:46'),(13,'',1,'April 30, 2021 - May 1, 2021','0000-00-00','0000-00-00',2,2,3,'to test','4|2|6',NULL,NULL,1,NULL,'2021-04-30 10:13:47',1,1,'2021-04-30 09:55:01','2021-04-30 02:13:49'),(14,'',1,'May 3, 2021 - May 4, 2021','0000-00-00','0000-00-00',2,0,3,'',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-05-03 15:53:23','2021-05-03 07:53:26'),(15,'',1,'May 28, 2021 - May 29, 2021','0000-00-00','0000-00-00',2,0,3,'tset',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-05-28 15:59:30','2021-05-28 07:59:31');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_leave_tbl`
--

LOCK TABLES `hris_leave_tbl` WRITE;
/*!40000 ALTER TABLE `hris_leave_tbl` DISABLE KEYS */;
INSERT INTO `hris_leave_tbl` VALUES (1,'LVE-21-00001','Sick Leave',1,1,1,'2021-04-14 23:47:43','2021-04-14 23:47:43'),(2,'LVE-21-00002','Vacation Leave',1,1,1,'2021-04-14 23:47:54','2021-04-14 23:47:54'),(3,'LVE-21-00003','Emergency Leave',1,1,1,'2021-04-14 23:48:07','2021-04-14 23:48:07'),(4,'LVE-21-00004','Maternity Leave',1,1,1,'2021-04-14 23:48:20','2021-04-14 23:48:20'),(5,'LVE-21-00005','Paternity Leave',0,1,1,'2021-04-14 23:48:38','2021-05-26 08:25:59');
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
  `reviseLoanFormID` bigint(20) DEFAULT NULL,
  `loanFormCode` text NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `loanID` bigint(20) NOT NULL,
  `loanFormTermPayment` int(10) NOT NULL,
  `loanFormDate` text NOT NULL,
  `loanFormNoOfDays` int(10) NOT NULL,
  `loanFormInterest` decimal(10,2) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_loan_form_tbl`
--

LOCK TABLES `hris_loan_form_tbl` WRITE;
/*!40000 ALTER TABLE `hris_loan_form_tbl` DISABLE KEYS */;
INSERT INTO `hris_loan_form_tbl` VALUES (1,NULL,'',1,3,1,'May 26, 2021 - September 26, 2021',0,1.00,7000.00,56.91,'','','',4,'',NULL,1,1,'2021-05-26 15:13:43','2021-05-26 07:14:00'),(2,NULL,'',1,2,1,'May 27, 2021 - October 26, 2021',0,1.00,9000.00,118.42,'2|3|4','2|2|2','2021-05-26 15:25:33|2021-05-26 15:26:20|2021-05-26 15:26:58',5,'','2021-05-26 15:23:14',1,1,'2021-05-26 15:16:11','2021-05-27 07:44:06'),(3,NULL,'',1,1,1,'May 27, 2021 - May 27, 2021',0,0.50,25000.00,0.00,'2|3|4','','',4,'','2021-05-27 15:34:45',1,1,'2021-05-27 15:34:45','2021-05-27 07:35:02'),(4,NULL,'',1,4,1,'May 27, 2021 - May 27, 2021',0,5.00,250000.00,0.00,'2|3|4','','',1,'','2021-05-27 15:39:39',1,1,'2021-05-27 15:35:37','2021-05-27 07:39:41'),(5,NULL,'',1,2,1,'June 1, 2021 - June 1, 2022',0,10.00,150000.00,2260.27,'2|3|4','','',4,'','2021-05-31 11:13:56',1,1,'2021-05-31 10:09:48','2021-05-31 03:14:09');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_loan_tbl`
--

LOCK TABLES `hris_loan_tbl` WRITE;
/*!40000 ALTER TABLE `hris_loan_tbl` DISABLE KEYS */;
INSERT INTO `hris_loan_tbl` VALUES (1,'LON-21-00001','Cash Loan',1,1,1,'2021-04-15 01:04:36','2021-04-15 01:04:36'),(2,'LON-21-00002','Car Loan',1,1,1,'2021-04-15 01:05:44','2021-04-15 01:05:44'),(3,'LON-21-00003','Salary Loan',1,1,1,'2021-04-15 01:06:42','2021-04-15 01:06:42'),(4,'LON-21-00004','Calamity Loan',1,1,1,'2021-04-15 01:06:53','2021-04-20 23:14:19'),(5,'LON-21-00005','House Loan',0,1,1,'2021-04-15 01:07:37','2021-04-20 23:10:04');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_no_timein_timeout_tbl`
--

LOCK TABLES `hris_no_timein_timeout_tbl` WRITE;
/*!40000 ALTER TABLE `hris_no_timein_timeout_tbl` DISABLE KEYS */;
INSERT INTO `hris_no_timein_timeout_tbl` VALUES (8,'',1,1,'2021-04-21','07:00:00','00:00:00','Sample no time-in','2|4|5',NULL,NULL,1,NULL,'2021-04-21 08:53:49',1,1,'2021-04-21 08:53:49','2021-04-21 00:53:54'),(9,'',1,2,'2021-04-19','00:00:00','17:00:00','Sample reason for no time out','2|4|5',NULL,NULL,1,NULL,'2021-04-21 08:56:32',1,1,'2021-04-21 08:56:32','2021-04-21 00:56:41'),(10,'',1,3,'2021-04-10','07:00:00','17:00:00','No Time-in/out','2|4|5',NULL,NULL,4,NULL,'2021-04-21 08:57:28',1,1,'2021-04-21 08:57:28','2021-04-21 00:59:51'),(11,'',1,2,'2021-04-08','00:00:00','00:00:00','',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-04-21 09:00:28','2021-04-21 01:00:31');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_official_business_tbl`
--

LOCK TABLES `hris_official_business_tbl` WRITE;
/*!40000 ALTER TABLE `hris_official_business_tbl` DISABLE KEYS */;
INSERT INTO `hris_official_business_tbl` VALUES (1,'OBF-21-00001',1,0,'','2021-04-13','08:00:00','17:00:00','TEST','','','',4,'','2021-04-13 09:25:50',1,1,'2021-04-13 08:32:04','2021-05-17 00:29:54'),(2,'OBF-21-00002',1,0,'','2021-04-13','08:00:00','17:00:00','','','','',0,'',NULL,1,1,'2021-04-13 08:33:24','2021-04-13 00:33:28'),(3,'OBF-21-00003',1,1,'2, Sample Building, Dilaguidi, Dilasag, Aurora, Philippines, 1212','2021-04-22','08:00:00','17:00:00','rererer','2|3|5','','',1,'','2021-04-13 10:07:46',1,1,'2021-04-13 10:07:46','2021-04-13 02:07:46'),(4,'OBF-21-00004',1,3,'1201, Katipunan Street, Batasan Hills, Quezon City, National Capital Region - Second District, Philippines, 1119','2021-04-20','08:00:00','17:00:00','dwa','','','',1,'','2021-04-13 10:09:07',1,1,'2021-04-13 10:08:05','2021-04-13 02:09:05'),(5,'',1,1,'2, Sample Building, Dilaguidi, Dilasag, Aurora, Philippines, 1212','2021-04-14','08:00:00','17:00:00','test','2|3|5','2|2|2','2021-04-14 08:29:33|2021-04-14 08:30:38|2021-04-14 08:31:42',2,'','2021-04-14 08:26:46',1,5,'2021-04-14 08:26:46','2021-04-14 00:31:45'),(6,'',1,0,'','2021-04-14','08:00:00','17:00:00','test','','','',0,'',NULL,1,1,'2021-04-14 09:26:56','2021-04-14 01:26:59'),(7,'',1,0,'','2021-04-14','08:00:00','17:00:00','test','','','',0,'',NULL,1,1,'2021-04-14 09:27:20','2021-04-14 01:27:22'),(8,'',1,3,'28D Eastwood Excelsior Eastwood Avenue, Eastwood City, Bagumbayan, Quezon City, National Capital Region - Second District, Philippines, 1110','2021-05-28','05:00:00','17:00:00','Test','2|3|5','','',1,'','2021-05-17 08:31:15',1,1,'2021-04-14 09:27:29','2021-05-17 00:31:17'),(9,'',1,4,'1709, Antel Global Corporate Center, San Antonio, City Of Pasig, National Capital Region - Second District, Philippines, 1605','2021-04-21','09:00:00','17:00:00','UAT','2|3|5','','',4,'','2021-04-21 08:42:34',1,1,'2021-04-21 08:42:34','2021-04-21 00:59:20');
/*!40000 ALTER TABLE `hris_official_business_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_on_timein_timeout_tbl`
--

DROP TABLE IF EXISTS `hris_on_timein_timeout_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_on_timein_timeout_tbl` (
  `no_Timein_timeoutID` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `no_Timein_timeoutNegligence` int(11) DEFAULT NULL,
  PRIMARY KEY (`no_Timein_timeoutID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_on_timein_timeout_tbl`
--

LOCK TABLES `hris_on_timein_timeout_tbl` WRITE;
/*!40000 ALTER TABLE `hris_on_timein_timeout_tbl` DISABLE KEYS */;
INSERT INTO `hris_on_timein_timeout_tbl` VALUES (1,'SCH-21-00001',1,'2021-04-05','08:00:00','17:00:00','No Time out','1','2','2021-04-08 08:21:27',2,NULL,'2021-04-08 08:21:27',1,1,'2021-04-08 08:21:27','2021-04-08 00:21:31',NULL),(2,'SCH-21-00002',1,'0000-00-00','08:00:00','17:00:00','Testing III','2|4|5','3','2021-04-08 12:11:08',3,'test','2021-04-08 08:25:51',1,2,'2021-04-08 08:25:51','2021-04-08 04:11:09',NULL),(3,'SCH-21-00003',1,'0000-00-00','08:00:00','17:00:00','1','2|4|5',NULL,NULL,1,NULL,'2021-04-12 07:30:12',1,1,'2021-04-12 07:30:12','2021-04-11 23:28:05',NULL),(4,'SCH-21-00004',1,'2021-04-12','01:00:00','05:00:00','TEST','2|4|5',NULL,NULL,1,NULL,'2021-04-12 08:05:09',1,1,'2021-04-12 08:05:09','2021-04-12 00:05:12',3),(5,'SCH-21-00005',1,'2021-04-12','08:00:00','17:00:00','',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-04-12 08:36:15','2021-04-12 00:36:18',0),(6,'SCH-21-00006',1,'2021-04-13','04:00:00','17:00:00','Sample reason for No Time In ','2|4|5',NULL,NULL,1,NULL,'2021-04-12 08:56:01',1,1,'2021-04-12 08:56:01','2021-04-12 00:56:05',3),(7,'SCH-21-00007',1,'2021-04-12','09:00:00','11:00:00',' Sample reason for',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-04-12 08:56:59','2021-04-12 00:57:01',3),(8,'SCH-21-00008',1,'2021-04-12','08:00:00','17:00:00','',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-04-12 02:35:43','2021-04-12 06:35:46',0),(9,'SCH-21-00008',1,'2021-04-14','10:00:00','00:00:00','No time -In Testing','2|4|5',NULL,NULL,1,NULL,'2021-04-12 03:40:16',1,1,'2021-04-12 03:40:16','2021-04-12 07:40:19',1),(10,'SCH-21-00008',1,'2021-04-12','08:00:00','17:00:00','',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-04-12 03:40:40','2021-04-12 07:40:43',0),(11,'SCH-21-00008',1,'2021-04-12','08:00:00','17:00:00','',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-04-12 03:40:57','2021-04-12 07:40:59',0),(12,'SCH-21-00008',1,'2021-04-17','11:00:00','00:00:00','dwqfw','2|4|5',NULL,NULL,1,NULL,'2021-04-12 03:41:37',1,1,'2021-04-12 03:41:37','2021-04-12 07:41:39',1),(13,'SCH-21-00008',1,'2021-04-30','00:00:00','05:00:00','test','2|4|5',NULL,NULL,1,NULL,'2021-04-13 09:14:07',1,1,'2021-04-13 09:14:07','2021-04-13 01:14:07',3),(14,'SCH-21-00009',1,'2021-04-13','08:00:00','17:00:00','',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-04-13 03:43:48','2021-04-13 07:43:50',0);
/*!40000 ALTER TABLE `hris_on_timein_timeout_tbl` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_overtime_request_tbl`
--

LOCK TABLES `hris_overtime_request_tbl` WRITE;
/*!40000 ALTER TABLE `hris_overtime_request_tbl` DISABLE KEYS */;
INSERT INTO `hris_overtime_request_tbl` VALUES (1,'',1,'2021-04-14','08:00:00','17:00:00','','','','',0,'',NULL,1,1,'2021-04-14 07:57:11','2021-04-13 23:57:10'),(2,'',1,'2021-04-14','08:00:00','17:00:00','qweqweqwe','4|8|7','','',1,'','2021-04-14 07:57:31',1,1,'2021-04-14 07:57:31','2021-04-13 23:57:31'),(3,'',1,'2021-04-14','08:00:00','17:00:00','test','','','',0,'',NULL,1,1,'2021-04-14 09:24:58','2021-04-14 01:25:00'),(4,'',1,'2021-04-14','08:00:00','17:00:00','test','','','',0,'',NULL,1,1,'2021-04-14 09:25:11','2021-04-14 01:25:13'),(5,'',1,'2021-04-15','08:00:00','17:00:00','test','4|8|7','','',1,'','2021-04-14 09:35:44',1,1,'2021-04-14 09:35:44','2021-04-14 01:35:49'),(6,'',1,'2021-04-19','08:00:00','19:00:00','OT ako','4|8|7','','',1,'','2021-04-19 16:49:45',1,1,'2021-04-19 16:49:45','2021-04-19 08:49:48'),(7,'',1,'2021-04-19','08:00:00','17:00:00','','','','',0,'',NULL,1,1,'2021-04-19 16:50:11','2021-04-19 08:50:15');
/*!40000 ALTER TABLE `hris_overtime_request_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_personnel_request_tbl`
--

DROP TABLE IF EXISTS `hris_personnel_request_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_personnel_request_tbl` (
  `personnelRequestID` bigint(20) NOT NULL AUTO_INCREMENT,
  `costEstimateID` bigint(20) DEFAULT NULL,
  `billMaterialID` bigint(20) DEFAULT NULL,
  `designationID` bigint(20) NOT NULL,
  `designationName` text NOT NULL,
  `designationTotalHours` decimal(10,1) NOT NULL,
  `quantity` bigint(20) NOT NULL,
  `unitCost` decimal(10,2) NOT NULL,
  `totalCost` decimal(10,2) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`personnelRequestID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_personnel_request_tbl`
--

LOCK TABLES `hris_personnel_request_tbl` WRITE;
/*!40000 ALTER TABLE `hris_personnel_request_tbl` DISABLE KEYS */;
INSERT INTO `hris_personnel_request_tbl` VALUES (1,1,NULL,7,'Installer',1.5,1,0.00,0.00,1,1,'2021-06-02 05:33:01','2021-06-02 05:33:01'),(2,1,1,7,'Installer',1.5,0,1100.00,1650.00,1,1,'2021-06-02 05:37:09','2021-06-02 05:37:09');
/*!40000 ALTER TABLE `hris_personnel_request_tbl` ENABLE KEYS */;
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
INSERT INTO `hris_philhealth_table_tbl` VALUES (1,1000.00,10000.00,3.50,'2021-04-15 23:01:29','2021-04-15 23:01:29'),(2,10000.01,69999.99,3.50,'2021-04-15 23:01:29','2021-04-15 23:01:29'),(3,70000.00,999999.00,3.50,'2021-04-15 23:01:29','2021-04-15 23:01:29');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_qualification_tbl`
--

LOCK TABLES `hris_qualification_tbl` WRITE;
/*!40000 ALTER TABLE `hris_qualification_tbl` DISABLE KEYS */;
INSERT INTO `hris_qualification_tbl` VALUES (1,'To test',1,1,1,'2021-05-06 07:22:05','2021-05-06 07:22:05');
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
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`requirementID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_requirement_tbl`
--

LOCK TABLES `hris_requirement_tbl` WRITE;
/*!40000 ALTER TABLE `hris_requirement_tbl` DISABLE KEYS */;
INSERT INTO `hris_requirement_tbl` VALUES (1,'RQT-21-00001','SSS E1 Form','Official SSS registration form',1,'2021-04-15',1,1,'2021-04-14 18:54:41','0000-00-00 00:00:00'),(2,'RQT-21-00002','SSS E4 Form','Official SSS member data change form',1,'2021-04-15',1,1,'2021-04-14 18:56:22','0000-00-00 00:00:00'),(3,'RQT-21-00003','SSS List of Employment History','Official list of the SSS member\'s employment history',1,'2021-04-15',1,1,'2021-04-14 18:57:08','0000-00-00 00:00:00'),(4,'RQT-21-00004','PhilHealth ID','Official ID provided by PhilHealth to its members',1,'2021-04-15',1,1,'2021-04-14 18:57:47','0000-00-00 00:00:00'),(5,'RQT-21-00005','PhilHealth Member Data Record (MDR)','Member information provided by PhilHealth',1,'2021-04-15',1,1,'2021-04-14 18:59:23','0000-00-00 00:00:00'),(6,'RQT-21-00006','HDMF ID','Official ID provided by PAG-IBIG to its members',1,'2021-04-15',1,1,'2021-04-14 19:00:18','0000-00-00 00:00:00'),(7,'RQT-21-00007','HDMF Loyalty Card','Official loyalty card provided by PAG-IBIG to some of its members',1,'2021-04-15',1,1,'2021-04-14 19:13:43','0000-00-00 00:00:00'),(8,'RQT-21-00008','Tax Identification Number ID','Official ID provided by BIR to its members',1,'2021-04-15',1,1,'2021-04-14 19:14:58','0000-00-00 00:00:00'),(9,'RQT-21-00009','BIR Form 1902','Form accomplished by an old or new employee whether resident citizen or non-resident citizens earning purely compensation income.\nTo be filed with the RDO having jurisdiction over the taxpayer\'s residence or place of employment.',1,'2021-04-15',1,1,'2021-04-14 19:16:47','0000-00-00 00:00:00'),(10,'RQT-21-00010','BIR Form 1905','Form accomplished by all taxpayers who intend to update/change any data or information, e.g. transfer of business within the same RDO, change in registered activities, cancellation of business registration due to closure of business or transfer to other district, or replacement of lost TIN Card/ Certificate of Registration.\nTo be filed with the RDO having jurisdiction over the taxpayer, whether Head Office or branch.',1,'2021-04-15',1,1,'2021-04-14 19:17:48','0000-00-00 00:00:00'),(11,'RQT-21-00011','Certificate of Employment','Official document containing the employee\'s records from the specific company',1,'2021-04-15',1,1,'2021-04-14 19:22:08','0000-00-00 00:00:00'),(12,'RQT-21-00012','Diploma','Certificate award provided by educational establishments to an individual after completing a course or study',1,'2021-04-15',1,1,'2021-04-14 19:23:42','0000-00-00 00:00:00'),(13,'RQT-21-00013','Transcript of Records','Document provided an educational establishment containing the summary of units, credits and remarks given to an individual under the specific course or study',1,'2021-04-15',1,1,'2021-04-14 19:29:49','0000-00-00 00:00:00'),(14,'RQT-21-00014','Birth Certificate','Official record given by PSA (NSO) regarding the individual\'s birth',1,'2021-04-15',1,1,'2021-04-14 19:33:04','0000-00-00 00:00:00'),(15,'RQT-21-00015','2 Valid IDs','An individual\'s proof of Identification. Should present atleast 2 of country\'s primary and secondary IDs (ex. Passport, TIN, UMID, Driver\'s License, Postal ID, Voter\'s ID) ',1,'2021-04-15',1,1,'2021-04-14 19:35:49','0000-00-00 00:00:00'),(16,'RQT-21-00016','NBI Clearance','Government document released to an individual upon request. It certifies that the said individual, at the time of request, is not involved in any ongoing criminal cases',1,'2021-04-15',1,1,'2021-04-14 19:56:38','0000-00-00 00:00:00'),(17,'RQT-21-00017','Barangay Clearance','A document certifying that an individual is a good resident of the  barangay.',1,'2021-04-15',1,1,'2021-04-14 19:59:20','0000-00-00 00:00:00'),(18,'RQT-21-00018','Police Clearance','Document proving that an individual has no criminal or derogatory record based on the PNP database',1,'2021-04-15',1,1,'2021-04-14 20:00:32','0000-00-00 00:00:00'),(19,'RQT-21-00019','Medical Result with Drug Test','Document containing the results of all the medical examination of the individual',1,'2021-04-15',1,1,'2021-04-14 21:03:17','0000-00-00 00:00:00'),(20,'RQT-21-00020','2 pcs. 2x2 ID Picture','Photo (2 inches height, 2 inches width) of an individual wearing formal attire ',1,'2021-04-15',1,1,'2021-04-14 21:08:55','0000-00-00 00:00:00'),(21,'RQT-21-00021','2 pcs. 1x1 ID Picture','Photo (1 inch height, 1 inch width) of an individual wearing formal attire ',1,'2021-04-15',1,1,'2021-04-14 21:09:35','0000-00-00 00:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_schedule_setup_tbl`
--

LOCK TABLES `hris_schedule_setup_tbl` WRITE;
/*!40000 ALTER TABLE `hris_schedule_setup_tbl` DISABLE KEYS */;
INSERT INTO `hris_schedule_setup_tbl` VALUES (1,'Regular Schedule','07:00:00','16:00:00',1,'07:00:00','16:00:00',1,'07:00:00','16:00:00',1,'07:00:00','16:00:00',1,'07:00:00','16:00:00',1,'07:00:00','16:00:00',0,'07:00:00','16:00:00',0,1,0,0,'2021-04-15 03:25:39','2021-04-21 01:27:40'),(2,'ECQ Schedule','06:00:00','17:00:00',1,'06:00:00','17:00:00',1,'06:00:00','17:00:00',0,'06:00:00','17:00:00',1,'06:00:00','17:00:00',1,'08:00:00','17:00:00',0,'08:00:00','17:00:00',0,1,0,0,'2021-04-21 01:28:53','2021-04-21 01:29:32');
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
INSERT INTO `hris_sss_table_tbl` VALUES (1,1000.00,3250.00,255.70,135.00,10.00,390.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(2,3250.00,3749.99,297.50,157.50,10.00,455.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(3,3750.00,4249.99,340.00,180.00,10.00,520.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(4,4250.00,4749.99,382.50,202.50,10.00,585.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(5,4750.00,5249.99,425.00,225.00,10.00,650.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(6,5250.00,5749.99,467.50,247.50,10.00,715.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(7,5750.00,6249.99,510.00,270.00,10.00,780.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(8,6250.00,6749.99,552.50,292.50,10.00,845.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(9,6750.00,7249.99,595.00,315.00,10.00,910.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(10,7250.00,7749.99,637.50,337.50,10.00,975.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(11,7750.00,8249.99,680.00,360.00,10.00,1040.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(12,8250.00,8749.99,722.50,382.50,10.00,1105.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(13,8750.00,9249.99,765.00,405.00,10.00,1170.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(14,9250.00,9749.99,807.50,427.00,10.00,1235.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(15,9750.00,10249.99,850.00,450.00,10.00,1300.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(16,10250.00,10749.99,892.50,472.50,10.00,1365.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(17,10750.00,11249.99,935.00,495.00,10.00,1430.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(18,11250.00,11749.99,977.50,517.50,10.00,1495.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(19,11750.00,12249.99,1020.00,540.00,10.00,1560.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(20,12250.00,12749.99,1062.50,562.50,10.00,1625.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(21,12750.00,13249.99,1105.00,585.00,10.00,1690.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(22,13250.00,13749.99,1147.50,607.50,10.00,1755.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(23,13750.00,14249.99,1190.00,630.00,10.00,1820.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(24,14250.00,14749.99,1232.50,652.50,10.00,1885.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(25,14750.00,15249.99,1275.00,675.00,10.00,1950.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(26,15250.00,15749.99,1317.50,697.50,10.00,2015.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(27,15750.00,16249.99,1360.00,720.00,10.00,2080.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(28,16250.00,16749.99,1402.50,742.50,10.00,2145.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(29,16750.00,17249.99,1445.00,765.00,10.00,2210.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(30,17250.00,17749.99,1487.50,787.50,10.00,2275.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(31,17750.00,18249.99,1530.00,810.00,10.00,2340.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(32,18250.00,18749.99,1572.50,832.50,10.00,2405.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(33,18750.00,19249.99,1615.00,855.00,10.00,2470.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(34,19250.00,19749.99,1657.50,877.50,10.00,2535.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(35,19750.00,20249.99,1700.00,900.00,30.00,2600.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(36,20250.00,20749.99,1700.00,900.00,30.00,2600.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(37,20750.00,21249.99,1700.00,900.00,30.00,2600.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(38,21250.00,21749.99,1700.00,900.00,30.00,2600.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(39,21750.00,22249.99,1700.00,900.00,30.00,2600.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(40,22250.00,22749.99,1700.00,900.00,30.00,2600.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(41,22750.00,23249.99,1700.00,900.00,30.00,2600.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(42,23250.00,23749.99,1700.00,900.00,30.00,2600.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(43,23750.00,24249.99,1700.00,900.00,30.00,2600.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(44,24250.00,24749.99,1700.00,900.00,30.00,2600.00,'2021-04-15 23:01:27','2021-04-15 23:01:27'),(45,24750.00,999999.99,1700.00,900.00,30.00,2600.00,'2021-04-15 23:01:27','2021-04-15 23:01:27');
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
INSERT INTO `hris_tax_table_tbl` VALUES (1,1.00,20832.00,0.00,0.00,'2021-04-15 23:01:28','2021-04-15 23:01:28'),(2,20833.00,33332.00,0.00,0.20,'2021-04-15 23:01:28','2021-04-15 23:01:28'),(3,33333.00,66666.00,2500.00,0.25,'2021-04-15 23:01:28','2021-04-15 23:01:28'),(4,66667.00,166666.00,10833.33,0.30,'2021-04-15 23:01:28','2021-04-15 23:01:28'),(5,166667.00,666666.00,40833.33,0.32,'2021-04-15 23:01:28','2021-04-15 23:01:28'),(6,666667.00,999999.00,200833.33,0.35,'2021-04-15 23:01:28','2021-04-15 23:01:28');
/*!40000 ALTER TABLE `hris_tax_table_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_bid_po_tbl`
--

DROP TABLE IF EXISTS `ims_bid_po_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_bid_po_tbl` (
  `bidPoID` bigint(21) NOT NULL AUTO_INCREMENT,
  `purchaseOrderID` bigint(21) DEFAULT NULL,
  `bidRecapID` bigint(21) DEFAULT NULL,
  `inventoryVendorID` bigint(21) DEFAULT NULL,
  `categoryType` varchar(100) DEFAULT NULL,
  `bidPoStatus` int(10) DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`bidPoID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_bid_po_tbl`
--

LOCK TABLES `ims_bid_po_tbl` WRITE;
/*!40000 ALTER TABLE `ims_bid_po_tbl` DISABLE KEYS */;
INSERT INTO `ims_bid_po_tbl` VALUES (1,NULL,2,2,'company',1,20,20,'2021-06-02 06:44:57','2021-06-02 23:33:07'),(2,NULL,2,3,'project',1,20,20,'2021-06-02 06:44:57','2021-06-02 23:53:45'),(3,NULL,2,4,'company',0,20,20,'2021-06-02 06:44:57','2021-06-02 06:44:57'),(4,NULL,2,4,'project',0,20,20,'2021-06-02 06:44:57','2021-06-02 06:44:57'),(5,NULL,1,1,'project',1,20,20,'2021-06-02 06:45:37','2021-06-02 06:53:06'),(6,NULL,1,2,'project',1,20,20,'2021-06-02 06:45:37','2021-06-02 06:55:07'),(7,NULL,1,3,'project',1,20,20,'2021-06-02 06:45:37','2021-06-02 06:56:01'),(8,NULL,1,4,'project',1,20,20,'2021-06-02 06:45:37','2021-06-02 06:56:17');
/*!40000 ALTER TABLE `ims_bid_po_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_bid_recap_tbl`
--

DROP TABLE IF EXISTS `ims_bid_recap_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_bid_recap_tbl` (
  `bidRecapID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseBidRecapID` bigint(20) DEFAULT NULL,
  `inventoryValidationID` bigint(20) DEFAULT NULL,
  `purchaseRequestID` bigint(20) NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `projectID` bigint(20) DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `bidRecapStatus` int(11) NOT NULL,
  `bidRecapReason` text DEFAULT NULL,
  `bidRecapRemarks` text DEFAULT NULL,
  `bidRecapProjectTotal` decimal(10,2) DEFAULT NULL,
  `bidRecapCompanyTotal` decimal(10,2) DEFAULT NULL,
  `bidRecapGrandTotal` decimal(10,2) NOT NULL,
  `submittedAt` timestamp NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`bidRecapID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_bid_recap_tbl`
--

LOCK TABLES `ims_bid_recap_tbl` WRITE;
/*!40000 ALTER TABLE `ims_bid_recap_tbl` DISABLE KEYS */;
INSERT INTO `ims_bid_recap_tbl` VALUES (1,NULL,1,1,1,2,'2|4|20','2|2|2','2021-06-02 14:43:53|2021-06-02 14:44:15|2021-06-02 14:45:35',2,'test',NULL,34800.00,0.00,34800.00,'2021-06-02 06:36:21',1,20,'2021-06-02 06:36:21','2021-06-02 06:45:37'),(2,NULL,2,2,1,2,'2|4|20','2|2|2','2021-06-02 14:43:35|2021-06-02 14:44:25|2021-06-02 14:44:56',2,'test',NULL,328500.00,3480.00,331980.00,'2021-06-02 06:37:12',1,20,'2021-06-02 06:37:12','2021-06-02 06:44:57');
/*!40000 ALTER TABLE `ims_bid_recap_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_borrowing_details_tbl`
--

DROP TABLE IF EXISTS `ims_borrowing_details_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_borrowing_details_tbl` (
  `borrowingDetailID` bigint(20) NOT NULL AUTO_INCREMENT,
  `borrowingID` bigint(20) NOT NULL,
  `inventoryStorageID` bigint(50) NOT NULL,
  `itemID` bigint(50) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `barcode` varchar(50) NOT NULL,
  `serialnumber` varchar(60) NOT NULL,
  `dateBorrowed` date NOT NULL,
  `quantity` int(50) NOT NULL,
  `unitOfMeasurement` varchar(255) NOT NULL,
  `borrowedPurpose` varchar(255) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`borrowingDetailID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_borrowing_details_tbl`
--

LOCK TABLES `ims_borrowing_details_tbl` WRITE;
/*!40000 ALTER TABLE `ims_borrowing_details_tbl` DISABLE KEYS */;
INSERT INTO `ims_borrowing_details_tbl` VALUES (1,1,1,6,'','00006-00001-00000','','2021-06-02',1,'piece','',1,1,'2021-06-03 06:02:15','2021-06-03 06:02:15'),(2,2,1,2,'','00002-00001-31231','32131232132131231','2021-06-04',1,'pieces','',1,1,'2021-06-03 07:20:55','2021-06-03 07:20:55');
/*!40000 ALTER TABLE `ims_borrowing_details_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_borrowing_tbl`
--

DROP TABLE IF EXISTS `ims_borrowing_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_borrowing_tbl` (
  `borrowingID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseBorrowingID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `projectID` bigint(20) DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `borrowingStatus` int(11) NOT NULL,
  `borrowingReason` longtext DEFAULT NULL,
  `borrowingRemarks` longtext DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`borrowingID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_borrowing_tbl`
--

LOCK TABLES `ims_borrowing_tbl` WRITE;
/*!40000 ALTER TABLE `ims_borrowing_tbl` DISABLE KEYS */;
INSERT INTO `ims_borrowing_tbl` VALUES (1,NULL,1,1,'4|2|5','2|2|2','2021-06-03 14:02:44|2021-06-03 14:03:08|2021-06-03 14:03:28',2,'Test',NULL,'2021-06-03 06:02:14',1,5,'2021-06-03 06:02:14','2021-06-03 06:03:29'),(2,NULL,1,1,'4|2|5','2','2021-06-03 15:21:27',1,'test',NULL,'2021-06-03 07:20:50',1,4,'2021-06-03 07:20:50','2021-06-03 07:21:28');
/*!40000 ALTER TABLE `ims_borrowing_tbl` ENABLE KEYS */;
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
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`categoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_category_tbl`
--

LOCK TABLES `ims_inventory_category_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_category_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_category_tbl` VALUES (1,'CTY-21-00001','PPE',8,'1',1,1,'2021-04-20 21:54:24','2021-05-31 16:26:31'),(2,'CTY-21-00002','CCTV',10,'1',1,1,'2021-04-20 21:54:42','2021-05-31 16:27:56'),(3,'CTY-21-00003','Screws',9,'1',1,1,'2021-04-20 21:54:59','2021-05-31 16:27:40'),(4,'CTY-21-00004','Television',3,'1',1,1,'2021-04-20 21:55:15','2021-05-31 16:52:09'),(5,'CTY-21-00005','Hard Hat Helmet',8,'1',1,1,'2021-04-20 21:55:26','2021-05-31 16:29:06'),(6,'CTY-21-00006','Headache',13,'1',1,1,'2021-04-20 21:55:42','2021-05-31 16:30:02'),(7,'CTY-21-00007','Mop',12,'1',1,1,'2021-04-20 21:55:55','2021-05-31 16:30:20'),(8,'CTY-21-00008','Ballpens',6,'1',1,1,'2021-04-20 21:56:08','2021-05-31 16:35:20'),(9,'CTY-21-00009','Batteries',9,'1',1,1,'2021-04-20 21:56:26','2021-05-31 16:36:29'),(10,'CTY-21-00010','Refrigerator',14,'1',1,1,'2021-04-20 21:56:49','2021-05-31 16:37:15'),(11,'CTY-21-00011','Hammer',5,'1',1,1,'2021-04-20 22:10:41','2021-05-31 16:37:53'),(12,'CTY-21-00012','Chairs',2,'1',1,1,'2021-04-20 22:22:39','2021-05-31 16:38:27'),(13,'CTY-21-00013','Mouse',3,'1',1,1,'2021-05-31 16:38:40','0000-00-00 00:00:00'),(14,'CTY-21-00014','Laptop',3,'1',1,1,'2021-05-31 16:38:49','0000-00-00 00:00:00'),(15,'CTY-21-00015','Monitor',3,'1',1,1,'2021-05-31 16:39:07','0000-00-00 00:00:00'),(16,'CTY-21-00016','Cabinets',3,'1',1,1,'2021-05-31 16:39:27','0000-00-00 00:00:00'),(17,'CTY-21-00017','Phones',3,'1',1,1,'2021-05-31 16:39:48','0000-00-00 00:00:00'),(18,'CTY-21-00018','Printer',3,'1',1,1,'2021-05-31 16:40:28','0000-00-00 00:00:00'),(19,'CTY-21-00019','Papers',6,'1',1,1,'2021-05-31 16:40:40','0000-00-00 00:00:00'),(20,'CTY-21-00020','Markers',6,'1',1,1,'2021-05-31 16:40:49','0000-00-00 00:00:00'),(21,'CTY-21-00021','Screw drivers',5,'1',1,1,'2021-05-31 16:41:16','0000-00-00 00:00:00'),(22,'CTY-21-00022','Printer Ink',6,'1',1,1,'2021-05-31 16:42:29','0000-00-00 00:00:00'),(23,'CTY-21-00023','Office Table',3,'1',1,1,'2021-05-31 16:42:51','0000-00-00 00:00:00'),(24,'CTY-21-00024','Electrical Tape',9,'1',1,1,'2021-05-31 16:47:57','0000-00-00 00:00:00'),(25,'CTY-21-00025','Plates',14,'1',1,1,'2021-05-31 16:52:51','2021-05-31 16:53:12'),(26,'CTY-21-00026','Vacuum',12,'1',1,1,'2021-05-31 17:04:13','0000-00-00 00:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_classification_tbl`
--

LOCK TABLES `ims_inventory_classification_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_classification_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_classification_tbl` VALUES (1,'CFN-21-00001','goods',0,1,1,'2021-04-21 01:59:37','2021-04-21 05:50:39'),(2,'CFN-21-00002','Furnitures & Fixtures',1,1,1,'2021-04-21 05:50:20','2021-05-14 03:02:06'),(3,'CFN-21-00003','Office Equipment',1,1,1,'2021-04-21 05:50:55','2021-04-21 05:50:55'),(4,'CFN-21-00004','Power Tools',1,1,1,'2021-04-21 05:51:13','2021-04-21 05:51:13'),(5,'CFN-21-00005','Hand Tools',1,1,1,'2021-04-21 05:51:33','2021-04-21 05:51:33'),(6,'CFN-21-00006','Office Supplies',1,1,1,'2021-04-21 05:51:45','2021-04-21 05:51:45'),(7,'CFN-21-00007','Vehicle',1,1,1,'2021-04-21 05:51:57','2021-04-21 05:51:57'),(8,'CFN-21-00008','Safety Equipment',1,1,1,'2021-04-21 05:52:11','2021-04-21 05:52:11'),(9,'CFN-21-00009','Consumable Materials',1,1,1,'2021-04-21 05:52:25','2021-04-21 05:52:25'),(10,'CFN-21-00010','Client Equipment',1,1,1,'2021-04-21 05:52:36','2021-04-21 05:52:36'),(11,'CFN-21-00011','Housekeeping Supplies',1,1,1,'2021-04-21 05:52:46','2021-04-21 05:52:46'),(12,'CFN-21-00012','Housekeeping Equipments',1,1,1,'2021-04-21 05:53:00','2021-04-21 05:53:00'),(13,'CFN-21-00013','Medicine Supplies',1,1,1,'2021-04-21 05:53:12','2021-04-21 05:53:12'),(14,'CFN-21-00014','Pantry Supplies',1,1,1,'2021-04-21 05:53:25','2021-04-21 05:53:25');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_condition_tbl`
--

LOCK TABLES `ims_inventory_condition_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_condition_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_condition_tbl` VALUES (1,'ICO-21-00001','For Approval','Item set for approval',1,0,0,'2021-04-14 06:27:27','2021-04-14 06:27:27'),(2,'ICO-21-00002','For Payment Request','test',1,0,0,'2021-04-14 06:28:07','2021-04-14 06:28:07'),(3,'ICO-21-00003','For Check Prep','Item for check preparation',1,0,0,'2021-04-14 06:29:06','2021-04-14 06:29:06'),(4,'ICO-21-00004','For Pick-up/Deliver','Item for pick-up or for delivery',1,0,0,'2021-04-14 06:29:27','2021-04-14 06:29:27'),(5,'ICO-21-00005','Cancelled','Item process cancelled',1,0,0,'2021-04-14 06:29:53','2021-04-14 06:29:53'),(6,'ICO-21-00006','Complete','Item process complete',1,0,0,'2021-04-14 06:30:25','2021-04-14 06:30:25'),(7,'ICO-21-00007','For Canvassing','Item for canvassing',1,0,0,'2021-04-14 06:30:44','2021-04-14 06:30:44');
/*!40000 ALTER TABLE `ims_inventory_condition_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_disposal_details_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_disposal_details_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_disposal_details_tbl` (
  `disposalDetailID` bigint(20) NOT NULL AUTO_INCREMENT,
  `disposalID` bigint(20) NOT NULL,
  `inventoryStorageID` bigint(50) NOT NULL,
  `itemID` bigint(50) NOT NULL,
  `itemName` text NOT NULL,
  `barcode` varchar(50) NOT NULL,
  `serialnumber` varchar(60) NOT NULL,
  `quantity` int(50) NOT NULL,
  `unitOfMeasurement` varchar(255) NOT NULL,
  `disposalDetailRemarks` varchar(255) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`disposalDetailID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_disposal_details_tbl`
--

LOCK TABLES `ims_inventory_disposal_details_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_disposal_details_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_inventory_disposal_details_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_disposal_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_disposal_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_disposal_tbl` (
  `disposalID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseDisposalID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `projectID` bigint(20) DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `disposalStatus` int(11) NOT NULL,
  `disposalReason` longtext DEFAULT NULL,
  `disposalRemarks` longtext DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`disposalID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_disposal_tbl`
--

LOCK TABLES `ims_inventory_disposal_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_disposal_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_inventory_disposal_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_incident_details_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_incident_details_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_incident_details_tbl` (
  `incidentDetailsID` bigint(20) NOT NULL AUTO_INCREMENT,
  `incidentID` bigint(20) NOT NULL,
  `inventoryStorageID` bigint(20) DEFAULT NULL,
  `itemCode` varchar(255) NOT NULL,
  `itemID` bigint(20) DEFAULT NULL,
  `barcode` varchar(255) NOT NULL,
  `itemName` varchar(255) DEFAULT NULL,
  `classificationName` varchar(255) DEFAULT NULL,
  `unitOfMeasurement` varchar(255) DEFAULT NULL,
  `inventoryStorageOfficeName` varchar(255) DEFAULT NULL,
  `inventoryStorageOfficeCode` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `incidentInformation` longtext DEFAULT NULL,
  `incidentRecommendation` longtext DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`incidentDetailsID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_incident_details_tbl`
--

LOCK TABLES `ims_inventory_incident_details_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_incident_details_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_inventory_incident_details_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_incident_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_incident_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_incident_tbl` (
  `incidentID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseIncidentID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `incidentActionPlan` longtext NOT NULL,
  `incidentEmployeeID` bigint(20) DEFAULT NULL,
  `incidentTargetCompletion` date DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `incidentStatus` int(11) NOT NULL,
  `incidentReason` longtext DEFAULT NULL,
  `incidentRemarks` longtext DEFAULT NULL,
  `submittedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`incidentID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_incident_tbl`
--

LOCK TABLES `ims_inventory_incident_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_incident_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_incident_tbl` VALUES (1,NULL,1,'no action plan',20,'2021-07-01','5|2|4',NULL,NULL,4,'undefined',NULL,'2021-05-26 10:02:20',1,1,'2021-05-26 10:02:20','2021-05-26 02:02:52'),(2,NULL,1,'no action plan',20,'2021-06-30','5|2|4','2|2|2','2021-05-26 10:23:04|2021-05-26 10:35:14|2021-05-26 10:38:00',5,'undefined',NULL,'2021-05-26 10:03:15',1,1,'2021-05-26 10:03:15','2021-05-26 02:38:39'),(3,NULL,1,'no action plan',2,'2021-06-05',NULL,NULL,NULL,0,'undefined',NULL,'2021-05-27 06:59:46',1,1,'2021-05-27 14:59:44','2021-05-27 06:59:46'),(4,NULL,1,'no action plan',4,'2021-05-27','5|2|4',NULL,NULL,1,'undefined',NULL,'2021-05-27 15:04:58',1,1,'2021-05-27 15:04:58','2021-05-27 07:05:01');
/*!40000 ALTER TABLE `ims_inventory_incident_tbl` ENABLE KEYS */;
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
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`itemID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_item_tbl`
--

LOCK TABLES `ims_inventory_item_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_item_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_item_tbl` VALUES (1,'ITM-21-00001','Ballpen-Black','Panda',6,8,'Small','pieces',0.00,50,'','Black Ballpen / 0.5mm ',1,'2021-04-21',1,1,'2021-04-20 22:00:14','2021-04-20 22:00:14'),(2,'ITM-21-00002','Ballpen-Red','Panda',6,8,'Small','pieces',0.00,50,'','Ballpen-Red / 0.5mm',1,'2021-04-21',1,1,'2021-04-20 22:01:39','2021-04-20 22:01:39'),(3,'ITM-21-00003','Bond Paper- A4','Bond Paper',6,19,'Medium','ream',0.00,1000,'','Bond Paper - A4 / White',1,'2021-04-21',1,1,'2021-04-20 22:03:57','2021-04-20 22:03:57'),(4,'ITM-21-00004','Claw Hammer','Ace Hardware',5,11,'Medium','piece',0.00,3,'','Claw Hammer / Black and Orange',1,'2021-04-21',1,1,'2021-04-20 22:13:03','2021-04-20 22:13:03'),(5,'ITM-21-00005','Club Hammer','Ace Hardware',5,11,'Medium','piece',0.00,3,'','Club Hammer- Black and Yellow',1,'2021-04-21',1,1,'2021-04-20 22:14:29','2021-04-20 22:14:29'),(6,'ITM-21-00006','Office Chair- Black','Office Warehouse',2,12,'Medium','piece',0.00,30,'','Office Chair- Black',1,'2021-04-21',1,1,'2021-04-20 22:23:47','2021-04-20 22:23:47'),(7,'ITM-21-00007','Office Table- Wooden Brown','Office Warehouse',3,4,'Large','pieces',0.00,30,'','Office Table- Wooden Brown 50 inch',0,'2021-04-21',1,1,'2021-04-20 22:25:30','2021-04-20 22:25:30'),(8,'ITM-21-00008','File Cabinet- 5 Drawer','Office Warehouse ',6,19,'Large','pieces',0.00,3,'','File Cabinet- 5 Drawer/ Gray',1,'2021-04-21',1,1,'2021-04-20 22:40:25','2021-04-20 22:40:25'),(9,'ITM-21-00009','Folder- Long','Office Warehouse',6,8,'Medium','piece',0.00,50,'','Folder-Long / Red',1,'2021-04-21',1,1,'2021-04-20 22:44:01','2021-04-20 22:44:01'),(10,'ITM-21-00010','Screw-Lag Bolts','Ace Hardware',9,3,'Small','pieces',0.00,100,'','Screw- Lag Bolts / 1.5 inch',1,'2021-04-21',1,1,'2021-04-20 22:46:33','2021-04-20 22:46:33'),(11,'ITM-21-00011','Electrical Tape- Black','Ace Hardware',9,24,'Small','pieces',0.00,50,'','Electrical Tape- Black/ 50 rolls',1,'2021-04-21',1,1,'2021-04-20 22:49:50','2021-04-20 22:49:50'),(12,'ITM-21-00012','Network Indoor IR CCTV Camera','RS Components',10,2,'Medium','pieces',0.00,20,'','RS PRO Network Indoor IR CCTV Camera, 1920 x 1080 Resolution/ support onvif latest version\ntrue day and night, Mega 3.6mm fixed lens',1,'2021-04-21',1,1,'2021-04-20 22:54:50','2021-04-20 22:54:50'),(13,'ITM-21-00013','Dual Purpose Screwdriver Magnetic','Philips',5,21,'Medium','pieces',0.00,10,'','Test Pencil CRV Slotted Screwdriver with Magnetic/ 4mm*80mm',1,'2021-04-21',1,1,'2021-04-20 23:01:18','2021-04-20 23:01:18'),(14,'ITM-21-00014','Dell Laptop Core i5','Dell',3,4,'Medium','pieces',0.00,20,'','Core i5 7th Gen, 4 GB RAM',1,'2021-04-22',1,1,'2021-04-21 17:44:59','2021-04-21 17:44:59'),(15,'ITM-21-00015','Pilot Marker- Red','Pilot',6,8,'ExtraSmall','pieces',0.00,5,'','Marker-Red .55mm',1,'2021-04-28',1,1,'2021-04-27 18:19:39','2021-04-27 18:19:39'),(16,'ITM-21-00016','Acer Laptop- Intel Core i7 ','Acer',3,4,'Medium','pieces',0.00,20,'','Acer Laptop /  Intel Core i7 7th Gen',1,'2021-04-28',1,1,'2021-04-27 18:22:46','2021-04-27 18:22:46'),(17,'ITM-21-00017','Plate-Glass','Lenox',14,25,'Medium','pieces',0.00,15,'','Glass Plate / round',1,'2021-04-28',1,1,'2021-04-27 22:00:54','2021-04-27 22:00:54'),(18,'ITM-21-00018','Paracetamol Biogesic','Dymadon®',13,6,'ExtraSmall','pieces',0.00,50,'','500mg/ pain reliever and fever reducer',1,'2021-04-28',1,1,'2021-04-27 22:04:31','2021-04-27 22:04:31'),(19,'ITM-21-00019','Wireless Mouse','Genius',3,13,'Small','pieces',0.00,15,'','Genius wireless mouse chargeable battery',1,'2021-05-06',1,1,'2021-05-05 21:30:19','2021-05-05 21:30:19'),(20,'ITM-21-00020','HP Wireless Printer A0002','HP',3,18,'Medium','pieces',0.00,5,'','HP Wireless Printer A0002/ Wifi / with Scan and ',1,'2021-05-06',1,1,'2021-05-05 21:39:49','2021-05-05 21:39:49'),(21,'ITM-21-00021','Laptop- Intel Core i5','Lenovo',3,14,'Small','pieces',0.00,5,'','Laptop- Intel Core i5 7th Gen',1,'2021-05-07',1,1,'2021-05-06 19:13:40','2021-05-06 19:13:40'),(22,'ITM-21-00022','RTG MaxiFlex Protective Gloves-Blue','RTG MaxiFlex',8,1,'Small','piece',0.00,50,'','Protection for hands-blue',1,'2021-05-18',1,1,'2021-05-17 18:27:24','2021-05-17 18:27:24'),(23,'ITM-21-00023','RTG MaxiFlex Protective Helmet-Yellow','RTG MaxiFlex',8,5,'Medium','pieces',0.00,50,'','Protective helmet-yellow',1,'2021-05-18',1,1,'2021-05-17 18:29:53','2021-05-17 18:29:53'),(24,'ITM-21-00024','PIXMA G3000 Canon Ink Black','Canon',6,22,'Small','pieces',0.00,5,'','Canon Ink Black for PIXMA G3000',1,'2021-05-19',1,1,'2021-05-18 18:48:05','2021-05-18 18:48:05'),(25,'ITM-21-00025','Epson Ink-Black','Epson',6,22,'Small','pieces',0.00,50,'','Epson Ink-Black compatible in Epson Printer',1,'2021-05-31',1,1,'2021-05-30 16:21:19','2021-05-30 16:21:19');
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
  `inventoryVendorName` text DEFAULT NULL,
  `vendorCurrentPrice` decimal(10,2) NOT NULL,
  `preferred` int(11) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`priceListID`)
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_price_list_tbl`
--

LOCK TABLES `ims_inventory_price_list_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_price_list_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_price_list_tbl` VALUES (28,16,1,'Ace Hardware',10000.00,1,1,1,'2021-05-11 02:48:36','2021-05-11 10:48:23'),(29,19,4,'Dell Technology',2000.00,1,1,1,'2021-05-11 02:49:27','2021-05-11 10:49:20'),(37,4,3,'Acer Philippines',200.00,1,1,1,'2021-05-11 02:53:58','2021-04-28 02:26:57'),(38,4,4,'Dell Technology',300.00,0,1,1,'2021-05-11 02:53:58','2021-04-28 03:01:30'),(39,4,2,'National Bookstore',200.00,0,1,1,'2021-05-11 02:53:58','2021-04-28 05:30:19'),(40,5,3,'Acer Philippines',2000.00,1,1,1,'2021-05-11 02:54:35','2021-05-11 10:54:28'),(41,13,2,'National Bookstore',2000.00,1,1,1,'2021-05-11 02:55:18','2021-05-11 10:55:11'),(45,9,2,'National Bookstore',100.00,1,1,1,'2021-05-11 02:59:04','2021-05-11 10:58:53'),(46,15,2,'National Bookstore',299.00,1,1,1,'2021-05-11 03:00:50','2021-05-11 11:00:40'),(47,10,4,'Dell Technology',25.00,1,1,1,'2021-05-11 03:20:45','2021-05-11 11:02:36'),(48,11,2,'National Bookstore',1000.00,0,1,1,'2021-05-11 03:21:35','2021-05-11 11:21:18'),(49,11,1,'Ace Hardware',200.00,1,1,1,'2021-05-11 03:21:35','2021-05-11 11:21:28'),(50,18,5,'UNILAB Trusted Quality Healthcare',15.00,1,1,1,'2021-05-11 03:22:19','2021-05-11 11:22:13'),(51,17,1,'Ace Hardware',3500.00,1,1,1,'2021-05-11 03:23:03','2021-05-11 11:22:57'),(54,20,1,'Ace Hardware',200.00,1,1,1,'2021-05-12 00:27:41','2021-04-21 01:54:39'),(58,21,4,'Dell Technology',4000.00,1,1,1,'2021-05-12 00:36:51','2021-04-28 03:01:30'),(59,21,1,'Ace Hardware',9.00,0,1,1,'2021-05-12 00:36:51','2021-04-21 01:54:39'),(70,14,3,'Acer Philippines',1000.00,0,1,1,'2021-05-16 23:58:25','2021-04-28 02:26:57'),(71,14,4,'Dell Technology',15000.00,1,1,1,'2021-05-16 23:58:25','2021-05-17 07:58:04'),(72,12,4,'Dell Technology',900.00,1,1,1,'2021-05-18 00:31:52','2021-04-28 03:01:30'),(73,12,2,'National Bookstore',1000.00,0,1,1,'2021-05-18 00:31:52','2021-05-18 08:31:44'),(78,22,6,'RTG MaxiFlex Protective Gear ',500.00,1,1,1,'2021-05-18 02:51:13','2021-05-18 10:50:46'),(82,23,2,'National Bookstore',1500.00,0,1,1,'2021-05-18 07:25:43','2021-05-17 06:59:53'),(83,23,5,'UNILAB Trusted Quality Healthcare',2000.00,0,1,1,'2021-05-18 07:25:43','2021-04-28 06:10:02'),(84,23,6,'RTG MaxiFlex Protective Gear ',5000.00,1,1,1,'2021-05-18 07:25:43','2021-05-18 02:49:49'),(94,24,7,'Canon',500.00,1,1,1,'2021-05-19 02:56:38','2021-05-19 02:52:54'),(126,7,2,'National Bookstore',10.00,0,1,1,'2021-05-24 06:41:52','2021-05-24 02:41:34'),(127,7,4,'Dell Technology',100.00,0,1,1,'2021-05-24 06:41:52','2021-05-24 02:41:20'),(128,7,6,'RTG MaxiFlex Protective Gear ',12.00,1,1,1,'2021-05-24 06:41:52','2021-05-24 02:41:46'),(129,8,2,'National Bookstore',10.00,1,1,1,'2021-05-24 06:42:31','2021-05-24 02:42:27'),(130,3,4,'Dell Technology',50.00,1,1,1,'2021-05-24 06:46:00','2021-05-24 02:45:54'),(151,1,2,'National Bookstore',19.00,0,1,1,'2021-05-26 03:31:38','2021-05-17 06:59:53'),(152,1,4,'Dell Technology',15.00,1,1,1,'2021-05-26 03:31:38','2021-05-25 08:29:29'),(153,1,1,'Ace Hardware',18.00,0,1,1,'2021-05-26 03:31:38','2021-05-26 11:31:29'),(154,2,1,'Ace Hardware',100.00,0,1,1,'2021-05-27 02:32:18','2021-04-21 01:54:39'),(155,2,2,'National Bookstore',5.00,1,1,1,'2021-05-27 02:32:18','2021-05-27 10:32:14'),(156,6,1,'Ace Hardware',10.00,1,1,1,'2021-05-28 03:02:01','2021-04-21 01:54:39'),(157,6,2,'National Bookstore',50.00,0,1,1,'2021-05-28 03:02:01','2021-05-17 06:59:53'),(158,6,4,'Dell Technology',200.00,0,1,1,'2021-05-28 03:02:01','2021-04-28 03:01:30'),(159,6,3,'Acer Philippines',25.00,0,1,1,'2021-05-28 03:02:01','2021-04-28 02:26:57');
/*!40000 ALTER TABLE `ims_inventory_price_list_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_receiving_details_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_receiving_details_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_receiving_details_tbl` (
  `inventoryReceivingDetailsID` bigint(20) NOT NULL AUTO_INCREMENT,
  `inventoryReceivingID` bigint(20) NOT NULL,
  `requestItemID` bigint(20) DEFAULT NULL,
  `itemID` bigint(20) NOT NULL,
  `received` decimal(10,2) DEFAULT NULL,
  `remarks` longtext DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`inventoryReceivingDetailsID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_receiving_details_tbl`
--

LOCK TABLES `ims_inventory_receiving_details_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_receiving_details_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_receiving_details_tbl` VALUES (1,1,71,6,10.00,'',1,1,'2021-06-03 00:17:04','2021-06-03 00:17:04'),(2,2,74,2,3.00,'test',1,1,'2021-06-03 03:54:45','2021-06-03 03:54:45'),(3,3,71,6,20.00,'Test',1,1,'2021-06-03 03:55:07','2021-06-03 03:55:07'),(4,4,75,4,100.00,'',1,1,'2021-06-03 07:26:52','2021-06-03 07:26:52'),(5,5,78,2,10.00,'',1,1,'2021-06-03 07:32:20','2021-06-03 07:32:20');
/*!40000 ALTER TABLE `ims_inventory_receiving_details_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_receiving_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_receiving_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_receiving_tbl` (
  `inventoryReceivingID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseInventoryReceivingID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `purchaseOrderID` bigint(20) DEFAULT NULL,
  `receiptNo` varchar(255) NOT NULL,
  `dateReceived` date NOT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `inventoryReceivingStatus` int(11) NOT NULL,
  `inventoryReceivingReason` longtext DEFAULT NULL,
  `inventoryReceivingRemarks` longtext DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`inventoryReceivingID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_receiving_tbl`
--

LOCK TABLES `ims_inventory_receiving_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_receiving_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_receiving_tbl` VALUES (1,NULL,1,1,'12312321','2021-06-03','4|2|5','2|2|2','2021-06-03 08:17:27|2021-06-03 08:17:42|2021-06-03 08:18:06',2,'Yr',NULL,'2021-06-03 00:17:02',1,5,'2021-06-03 00:17:02','2021-06-03 00:18:07'),(2,NULL,1,3,'321312','2021-06-03','4|2|5','2|2|2','2021-06-03 08:17:27|2021-06-03 08:17:42|2021-06-03 08:18:06',2,'tea',NULL,'2021-06-03 03:54:44',1,1,'2021-06-03 03:54:44','2021-06-03 06:53:02'),(3,NULL,1,1,'1321312312','2021-06-03','4|2|5','2|2|2','2021-06-03 08:17:27|2021-06-03 08:17:42|2021-06-03 08:18:06',2,'dsadasdasdasdas',NULL,'2021-06-03 03:55:06',1,1,'2021-06-03 03:55:06','2021-06-03 06:53:02'),(4,NULL,1,4,'1233213','2021-06-03','4|2|5','2|2|2','2021-06-03 08:17:27|2021-06-03 08:17:42|2021-06-03 08:18:06',2,'sadsa',NULL,'2021-06-03 07:26:51',1,1,'2021-06-03 07:26:51','2021-06-03 07:27:35'),(5,NULL,1,6,'12321312','2021-06-03','4|2|5','2|2|2','2021-06-03 08:17:27|2021-06-03 08:17:42|2021-06-03 08:18:06',2,'test',NULL,'2021-06-03 07:32:18',1,1,'2021-06-03 07:32:18','2021-06-03 07:32:35');
/*!40000 ALTER TABLE `ims_inventory_receiving_tbl` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_storage_tbl`
--

LOCK TABLES `ims_inventory_storage_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_storage_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_storage_tbl` VALUES (1,'ISM-21-00001','GTC','123','Test','test','test','ADAMS (POB.)','ADAMS','ILOCOS NORTE','01','test',2132,'test','1','1',1,'2021-06-03 00:19:35.921963',1,'2021-06-03 00:19:35.921963'),(2,'ISM-21-00002','BCGI','1234','Antel','Street','Subdi','BALLIAO','BENITO SOLIVEN','ISABELA','02','Countr',1234,'Room Type','1','1',1,'2021-06-03 07:36:01.908802',1,'2021-06-03 07:36:01.908802');
/*!40000 ALTER TABLE `ims_inventory_storage_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_validation_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_validation_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_validation_tbl` (
  `inventoryValidationID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseInventoryValidationID` bigint(20) DEFAULT NULL,
  `purchaseRequestID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `projectID` bigint(20) DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `inventoryValidationStatus` int(11) NOT NULL,
  `inventoryValidationReason` text DEFAULT NULL,
  `inventoryValidationRemarks` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`inventoryValidationID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_validation_tbl`
--

LOCK TABLES `ims_inventory_validation_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_validation_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_validation_tbl` VALUES (1,NULL,1,1,2,'2|4|5','2|2|2','2021-06-02 14:33:41|2021-06-02 14:34:09|2021-06-02 14:35:17',2,'Test',NULL,'2021-06-02 06:32:17',1,5,'2021-06-02 06:32:17','2021-06-02 06:35:18'),(2,NULL,2,1,2,'2|4|5','2|2|2','2021-06-02 14:33:33|2021-06-02 14:34:17|2021-06-02 14:34:35',2,'test',NULL,'2021-06-02 06:33:11',1,5,'2021-06-02 06:33:11','2021-06-02 06:34:36');
/*!40000 ALTER TABLE `ims_inventory_validation_tbl` ENABLE KEYS */;
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
  `file` text DEFAULT NULL,
  `inventoryVendorStatus` int(11) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`inventoryVendorID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_vendor_tbl`
--

LOCK TABLES `ims_inventory_vendor_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_vendor_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_vendor_tbl` VALUES (1,'VEN-21-00001','Ace Hardware','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','QUEZON CITY','BATASAN HILLS','1209','Twin Tower','St. Kalayaan','','Philippines','1920','Ayesha Porras','ayesha13@gmail.com','475-756-869-679','0932-5464-575','','Ace Hardware',1,'23-213-1313','Sole Proprietorship','Manufacturing',1,'Ayesha Porras','5435352351242','08:00:00','17:00:00',NULL,1,1,1,'2021-04-21 01:54:39','2021-04-21 01:54:39'),(2,'VEN-21-00002','National Bookstore','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','CITY OF MANDALUYONG','ADDITION HILLS','313','Robinsons Forum','Pioneer Street','EDSA','Philippines','1550','Anastacio Policarpio','ana.poli@gmail.com','123-456-789-000','0923-7437-619','(02)-8687-4421','Office Supplies',0,'12-354-3546','Business Corporation','Office supplies & Equipments',5,'Anastacio Policarpio','12345678901234567890','08:00:00','17:00:00',NULL,1,1,1,'2021-04-21 03:21:37','2021-05-17 06:59:53'),(3,'VEN-21-00003','Acer Philippines','CAR','ABRA','BUCAY','BANGCAGAN','23','Twin Tower','Pilar','','Philippines','1234','Ayesha Porras','ayesha13@gmail.com','354-365-475-472','0932-4353-454','(34)-1241-2325','Acer',1,'22-312-3131','Business Corporation','Electronics',2,'Ayesha Porras','62-3634-265-2','08:00:00','17:00:00',NULL,1,1,1,'2021-04-28 02:26:57','2021-04-28 02:26:57'),(4,'VEN-21-00004','Dell Technology','4A','QUEZON','LUCENA CITY','BARANGAY 5 (POB.)','','23','Malvar St. Cor. Salazar','','Philippines','1223','Rodeny Bamba','rodeny23@gmail.com','214-324-235-657','0924-5465-856','(42)-3423-4243','Dell Technology',1,'23-454-6575','Business Corporation','Computer Electronics',3,'Rodeny Bamba','654-73-567-6','08:00:00','17:00:00',NULL,1,1,1,'2021-04-28 02:36:44','2021-04-28 03:01:30'),(5,'VEN-21-00005','UNILAB Trusted Quality Healthcare','NCR','NATIONAL CAPITAL REGION - FOURTH DISTRICT','CITY OF MAKATI','BEL-AIR','1201','UNILAB Building','Kalayaan ','','Philippines','1920','Mr. Henry Ceed','unilab13@yahoo.com','213-214-412-111','0932-112-1421','(12)-4123-1231','UNILAB',1,'','Business Corporation','PPE\'s',5,'Henry Ceed','3331-231-331','08:00:00','17:00:00',NULL,1,1,1,'2021-04-28 06:10:02','2021-05-28 01:53:21'),(6,'VEN-21-00006','RTG MaxiFlex Protective Gear ','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','CITY OF PASIG','BAMBANG','23','One Corporate Center','Kalayaan Street','','Philippines','1234','Rodeny Bamba','bits@gmail.com','432-432-423-523','0941-241-1411','(32)-3423-4234','RTG MaxiFlex',1,'','Business Corporation','Hardware, Electrical Supplies, Construction, Plumbing, Paints',2,'Rodeny Bamba','42-4234-324-2','08:00:00','17:00:00',NULL,1,1,1,'2021-05-18 02:49:49','2021-05-28 01:53:29'),(7,'VEN-21-00007','Canon','NCR','NATIONAL CAPITAL REGION - FOURTH DISTRICT','CITY OF MAKATI','MAGALLANES','23','Canon Building','San Genorimo','','Philippines','1232','Nhadley  Halcon','nhad@13gmail.com','313-232-131-231','0923-2543-546','(32)-4564-6575','Canon',0,'43546457575','Business Corporation','Printing Services',3,'Nhadley Halcon','534-53-453-4','08:00:00','17:00:00',NULL,1,1,1,'2021-05-19 02:52:54','2021-05-19 06:43:30');
/*!40000 ALTER TABLE `ims_inventory_vendor_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_material_usage_tbl`
--

DROP TABLE IF EXISTS `ims_material_usage_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_material_usage_tbl` (
  `materialUsageID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseMaterialUsageID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `projectID` bigint(20) DEFAULT NULL,
  `referenceCode` text DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `materialUsageStatus` int(11) NOT NULL,
  `materialUsageReason` text DEFAULT NULL,
  `materialUsageRemarks` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`materialUsageID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_material_usage_tbl`
--

LOCK TABLES `ims_material_usage_tbl` WRITE;
/*!40000 ALTER TABLE `ims_material_usage_tbl` DISABLE KEYS */;
INSERT INTO `ims_material_usage_tbl` VALUES (1,NULL,1,1,'1','2|4|5','2','2021-06-03 15:17:48',1,'Test',NULL,'2021-06-03 07:16:55',1,2,'2021-06-03 07:10:10','2021-06-03 07:17:49');
/*!40000 ALTER TABLE `ims_material_usage_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_material_withdrawal_details_tbl`
--

DROP TABLE IF EXISTS `ims_material_withdrawal_details_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_material_withdrawal_details_tbl` (
  `materialWithdrawalDetailsID` bigint(20) NOT NULL AUTO_INCREMENT,
  `materialWithdrawalID` bigint(20) NOT NULL,
  `materialUsageID` bigint(20) DEFAULT NULL,
  `inventoryStorageID` bigint(20) DEFAULT NULL,
  `itemCode` varchar(255) NOT NULL,
  `inventoryStorageOfficeCode` varchar(255) NOT NULL,
  `itemID` bigint(20) DEFAULT NULL,
  `barcode` varchar(255) NOT NULL,
  `itemName` varchar(255) DEFAULT NULL,
  `itemDescription` varchar(255) DEFAULT NULL,
  `inventoryStorageOfficeName` varchar(255) DEFAULT NULL,
  `unitOfMeasurement` varchar(255) DEFAULT NULL,
  `receivingQuantity` varchar(255) DEFAULT NULL,
  `stockInQuantity` bigint(20) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `stocks` int(11) NOT NULL,
  `utilized` bigint(20) DEFAULT NULL,
  `unused` bigint(20) DEFAULT NULL,
  `itemWithdrawalRemarks` longtext DEFAULT NULL,
  `itemUsageRemarks` text DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`materialWithdrawalDetailsID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_material_withdrawal_details_tbl`
--

LOCK TABLES `ims_material_withdrawal_details_tbl` WRITE;
/*!40000 ALTER TABLE `ims_material_withdrawal_details_tbl` DISABLE KEYS */;
INSERT INTO `ims_material_withdrawal_details_tbl` VALUES (1,1,NULL,1,'ITM-21-00006','ISM-21-00001',6,'00006-00001-00000','Office Chair- Black','Office Chair- Black','GTC','piece',NULL,NULL,1,0,NULL,NULL,NULL,NULL,1,1,'2021-06-03 06:55:53','2021-06-03 06:55:53'),(3,1,1,1,'','',6,'','Office Chair- Black','Office Chair- Black','GTC','piece','',NULL,1,0,0,1,NULL,'test',1,1,'2021-06-03 07:16:58','2021-06-03 07:16:58');
/*!40000 ALTER TABLE `ims_material_withdrawal_details_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_material_withdrawal_tbl`
--

DROP TABLE IF EXISTS `ims_material_withdrawal_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_material_withdrawal_tbl` (
  `materialWithdrawalID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseMaterialWithdrawalID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `projectID` bigint(20) DEFAULT NULL,
  `materialWithdrawalPurpose` longtext NOT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `materialWithdrawalStatus` int(11) NOT NULL,
  `materialWithdrawalRemarks` longtext DEFAULT NULL,
  `materialWithdrawalReason` longtext NOT NULL,
  `submittedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`materialWithdrawalID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_material_withdrawal_tbl`
--

LOCK TABLES `ims_material_withdrawal_tbl` WRITE;
/*!40000 ALTER TABLE `ims_material_withdrawal_tbl` DISABLE KEYS */;
INSERT INTO `ims_material_withdrawal_tbl` VALUES (1,NULL,1,1,'test','4|2|5','2|2|2','2021-06-03 08:17:27|2021-06-03 08:17:42|2021-06-03 08:18:06',2,NULL,'undefined','2021-06-03 06:55:52',1,1,'2021-06-03 06:55:52','2021-06-03 06:56:44');
/*!40000 ALTER TABLE `ims_material_withdrawal_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_purchase_order_tbl`
--

DROP TABLE IF EXISTS `ims_purchase_order_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_purchase_order_tbl` (
  `purchaseOrderID` bigint(20) NOT NULL AUTO_INCREMENT,
  `revisePurchaseOrderID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `purchaseRequestID` bigint(20) DEFAULT NULL,
  `bidRecapID` bigint(20) DEFAULT NULL,
  `categoryType` varchar(100) DEFAULT NULL,
  `inventoryVendorID` bigint(20) NOT NULL,
  `vendorName` text DEFAULT NULL,
  `vendorAddress` text DEFAULT NULL,
  `vendorContactDetails` text DEFAULT NULL,
  `vendorContactPerson` text DEFAULT NULL,
  `paymentTerms` text DEFAULT NULL,
  `deliveryTerm` varchar(100) DEFAULT NULL,
  `deliveryDate` date DEFAULT NULL,
  `total` decimal(15,2) DEFAULT NULL,
  `discountType` varchar(100) DEFAULT NULL,
  `discount` decimal(15,2) DEFAULT NULL,
  `totalAmount` decimal(15,2) DEFAULT NULL,
  `vatSales` decimal(15,2) DEFAULT NULL,
  `vat` decimal(15,2) DEFAULT NULL,
  `totalVat` decimal(15,2) DEFAULT NULL,
  `lessEwt` decimal(15,2) DEFAULT NULL,
  `grandTotalAmount` decimal(15,2) DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `purchaseOrderStatus` int(11) NOT NULL,
  `purchaseOrderReason` text DEFAULT NULL,
  `purchaseOrderRemarks` text DEFAULT NULL,
  `contractFile` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`purchaseOrderID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_purchase_order_tbl`
--

LOCK TABLES `ims_purchase_order_tbl` WRITE;
/*!40000 ALTER TABLE `ims_purchase_order_tbl` DISABLE KEYS */;
INSERT INTO `ims_purchase_order_tbl` VALUES (1,NULL,1,1,1,'project',1,'Ace Hardware','1209, Twin Tower, Batasan Hills, Quezon City, National Capital Region - Second District, Philippines, 1920','0932-5464-575 / ','Ayesha Porras','Test','Delivery','2021-06-02',1300.00,'percent',10.00,1170.00,1044.64,125.36,1170.00,11.61,1158.39,'2|5|4','2|2|2','2021-06-02 14:57:05|2021-06-03 08:07:53|2021-06-03 08:08:50',2,'test',NULL,NULL,'2021-06-02 06:53:05',1,4,'2021-06-02 06:53:06','2021-06-03 00:08:51'),(2,NULL,1,1,1,'project',2,'National Bookstore','313, Robinsons Forum, Addition Hills, City Of Mandaluyong, National Capital Region - Second District, Philippines, 1550','0923-7437-619 / (02)-8687-4421','Anastacio Policarpio','test','Delivery','2021-06-02',500.00,'amount',0.00,500.00,0.00,0.00,500.00,0.00,500.00,'2|5|4',NULL,NULL,4,'Test',NULL,NULL,'2021-06-02 06:54:14',1,1,'2021-06-02 06:54:16','2021-06-02 06:54:32'),(3,NULL,1,1,1,'project',2,'National Bookstore','313, Robinsons Forum, Addition Hills, City Of Mandaluyong, National Capital Region - Second District, Philippines, 1550','0923-7437-619 / (02)-8687-4421','Anastacio Policarpio','Test','Delivery','2021-06-02',500.00,'percent',10.00,450.00,0.00,0.00,450.00,0.00,450.00,'2|5|4','2|2|2','2021-06-02 14:57:14|2021-06-03 08:08:00|2021-06-03 08:09:15',2,'test',NULL,NULL,'2021-06-02 06:55:43',1,4,'2021-06-02 06:55:07','2021-06-03 00:09:16'),(4,NULL,1,1,1,'project',3,'Acer Philippines','23, Twin Tower, Bangcagan, Bucay, Abra, Philippines, 1234','0932-4353-454 / (34)-1241-2325','Ayesha Porras','test','Delivery','2021-06-02',24000.00,'amount',1000.00,23000.00,20535.71,2464.29,23000.00,214.29,22785.71,'2|5|4','2|2|2','2021-06-03 08:06:44|2021-06-03 08:08:10|2021-06-03 08:09:53',2,'test',NULL,NULL,'2021-06-02 06:56:00',1,4,'2021-06-02 06:56:01','2021-06-03 00:09:54'),(5,NULL,1,1,1,'project',4,'Dell Technology','23, Barangay 5 (pob.), Lucena City, Quezon, Philippines, 1223','0924-5465-856 / (42)-3423-4243','Rodeny Bamba','rwar','Meet-up','2021-06-02',9000.00,'amount',421.00,8579.00,7659.82,919.18,8579.00,80.36,8498.64,'2|5|4','2|2|2','2021-06-02 14:56:52|2021-06-03 08:08:16|2021-06-03 08:09:41',2,'test',NULL,NULL,'2021-06-02 06:56:16',1,4,'2021-06-02 06:56:17','2021-06-03 00:09:43'),(6,NULL,1,2,2,'company',2,'National Bookstore','313, Robinsons Forum, Addition Hills, City Of Mandaluyong, National Capital Region - Second District, Philippines, 1550','0923-7437-619 / (02)-8687-4421','Anastacio Policarpio','Test','Meet-up','2021-06-03',495.00,'percent',10.00,445.50,0.00,0.00,445.50,0.00,445.50,'2|5|4','2|2|2','2021-06-03 08:07:01|2021-06-03 08:08:23|2021-06-03 08:08:43',2,'Test',NULL,NULL,'2021-06-02 23:33:06',1,4,'2021-06-02 23:33:07','2021-06-03 00:08:44'),(7,NULL,1,2,2,'project',3,'Acer Philippines','23, Twin Tower, Bangcagan, Bucay, Abra, Philippines, 1234','0932-4353-454 / (34)-1241-2325','Ayesha Porras','Test','Delivery','2021-06-03',320000.00,'percent',10.00,288000.00,257142.86,30857.14,288000.00,2857.14,285142.86,'2|5|4','2|2|2','2021-06-03 08:07:09|2021-06-03 08:07:44|2021-06-03 08:09:35',2,'test',NULL,NULL,'2021-06-02 23:53:43',1,4,'2021-06-02 23:53:45','2021-06-03 00:09:36');
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
  `costEstimateID` bigint(20) DEFAULT NULL,
  `billMaterialID` bigint(20) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_purchase_request_tbl`
--

LOCK TABLES `ims_purchase_request_tbl` WRITE;
/*!40000 ALTER TABLE `ims_purchase_request_tbl` DISABLE KEYS */;
INSERT INTO `ims_purchase_request_tbl` VALUES (1,NULL,1,NULL,0,2,NULL,'4|2|7','2|2|2','2021-06-02 13:42:45|2021-06-02 13:43:12|2021-06-02 13:43:42',2,'test',34800.00,0.00,NULL,'2021-06-02 05:39:50',1,7,'2021-06-02 05:39:50','2021-06-02 05:43:43'),(2,NULL,1,NULL,1,2,NULL,'4|2|7','2|2|2','2021-06-02 13:42:18|2021-06-02 13:43:19|2021-06-02 13:43:35',2,'yrdy',328500.00,3500.00,NULL,'2021-06-02 05:40:09',1,7,'2021-06-02 05:40:09','2021-06-02 05:43:37');
/*!40000 ALTER TABLE `ims_purchase_request_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_receiving_serial_number_tbl`
--

DROP TABLE IF EXISTS `ims_receiving_serial_number_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_receiving_serial_number_tbl` (
  `serialNumberID` bigint(20) NOT NULL AUTO_INCREMENT,
  `inventoryReceivingID` bigint(20) NOT NULL,
  `inventoryReceivingDetailsID` bigint(20) NOT NULL,
  `itemID` bigint(20) NOT NULL,
  `serialNumber` varchar(255) DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`serialNumberID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_receiving_serial_number_tbl`
--

LOCK TABLES `ims_receiving_serial_number_tbl` WRITE;
/*!40000 ALTER TABLE `ims_receiving_serial_number_tbl` DISABLE KEYS */;
INSERT INTO `ims_receiving_serial_number_tbl` VALUES (1,1,1,6,'12332132154665456',1,1,'2021-06-03 00:17:04','2021-06-03 00:17:04'),(2,1,1,6,'1233213215466545s',1,1,'2021-06-03 00:17:04','2021-06-03 00:17:04'),(3,1,1,6,'1233213215466545a',1,1,'2021-06-03 00:17:04','2021-06-03 00:17:04'),(4,1,1,6,'123321321546ds456',1,1,'2021-06-03 00:17:04','2021-06-03 00:17:04'),(5,1,1,6,'sdadasty3134dsfas',1,1,'2021-06-03 00:17:04','2021-06-03 00:17:04'),(6,1,1,6,'',1,1,'2021-06-03 00:17:04','2021-06-03 00:17:04'),(7,1,1,6,'',1,1,'2021-06-03 00:17:04','2021-06-03 00:17:04'),(8,1,1,6,'',1,1,'2021-06-03 00:17:04','2021-06-03 00:17:04'),(9,1,1,6,'',1,1,'2021-06-03 00:17:04','2021-06-03 00:17:04'),(10,1,1,6,'',1,1,'2021-06-03 00:17:04','2021-06-03 00:17:04'),(11,2,2,2,'32131232132131231',1,1,'2021-06-03 03:54:45','2021-06-03 03:54:45'),(12,2,2,2,'32132142132132132',1,1,'2021-06-03 03:54:45','2021-06-03 03:54:45'),(13,2,2,2,'42132132132143124',1,1,'2021-06-03 03:54:45','2021-06-03 03:54:45'),(14,3,3,6,'',1,1,'2021-06-03 03:55:07','2021-06-03 03:55:07'),(15,4,4,4,'',1,1,'2021-06-03 07:26:52','2021-06-03 07:26:52'),(16,5,5,2,'13221312312321312',1,1,'2021-06-03 07:32:20','2021-06-03 07:32:20'),(17,5,5,2,'13221312312321313',1,1,'2021-06-03 07:32:20','2021-06-03 07:32:20'),(18,5,5,2,'13221312312321311',1,1,'2021-06-03 07:32:20','2021-06-03 07:32:20'),(19,5,5,2,'13221312312321314',1,1,'2021-06-03 07:32:20','2021-06-03 07:32:20'),(20,5,5,2,'13221312312321315',1,1,'2021-06-03 07:32:20','2021-06-03 07:32:20'),(21,5,5,2,'13221312312321316',1,1,'2021-06-03 07:32:20','2021-06-03 07:32:20'),(22,5,5,2,'13221312312321317',1,1,'2021-06-03 07:32:20','2021-06-03 07:32:20'),(23,5,5,2,'13221312312321318',1,1,'2021-06-03 07:32:20','2021-06-03 07:32:20'),(24,5,5,2,'13221312312321319',1,1,'2021-06-03 07:32:20','2021-06-03 07:32:20'),(25,5,5,2,'1322131231232131a',1,1,'2021-06-03 07:32:20','2021-06-03 07:32:20');
/*!40000 ALTER TABLE `ims_receiving_serial_number_tbl` ENABLE KEYS */;
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
  `inventoryValidationID` bigint(20) DEFAULT NULL,
  `billMaterialID` bigint(20) DEFAULT NULL,
  `purchaseRequestID` bigint(20) DEFAULT NULL,
  `bidRecapID` bigint(20) DEFAULT NULL,
  `referencePurchaseOrderID` bigint(20) DEFAULT NULL,
  `purchaseOrderID` bigint(20) DEFAULT NULL,
  `inventoryReceivingID` bigint(20) DEFAULT NULL,
  `categoryType` varchar(50) DEFAULT NULL,
  `inventoryVendorID` bigint(20) DEFAULT NULL,
  `inventoryVendorName` text DEFAULT NULL,
  `itemID` bigint(20) DEFAULT NULL,
  `itemName` varchar(100) DEFAULT NULL,
  `itemDescription` text DEFAULT NULL,
  `itemUom` varchar(100) DEFAULT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `unitCost` decimal(15,2) NOT NULL,
  `totalCost` decimal(15,2) NOT NULL,
  `files` text DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `brandName` varchar(255) DEFAULT NULL,
  `orderedPending` decimal(20,2) DEFAULT NULL,
  `stocks` decimal(20,2) DEFAULT NULL,
  `forPurchase` decimal(20,2) DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`requestItemID`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_request_items_tbl`
--

LOCK TABLES `ims_request_items_tbl` WRITE;
/*!40000 ALTER TABLE `ims_request_items_tbl` DISABLE KEYS */;
INSERT INTO `ims_request_items_tbl` VALUES (1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'project',NULL,NULL,1,'Ballpen-Black','Black Ballpen / 0.5mm ','pieces',100.00,0.00,0.00,'01622611981.png',NULL,'Panda',NULL,NULL,NULL,1,1,'2021-06-02 05:33:01','2021-06-02 05:33:01'),(2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'project',NULL,NULL,3,'Bond Paper- A4','Bond Paper - A4 / White','ream',140.00,0.00,0.00,'11622611981.jpg',NULL,'Bond Paper',NULL,NULL,NULL,1,1,'2021-06-02 05:33:01','2021-06-02 05:33:01'),(3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'project',NULL,NULL,5,'Club Hammer','Club Hammer- Black and Yellow','piece',160.00,0.00,0.00,'21622611981.jpg',NULL,'Ace Hardware',NULL,NULL,NULL,1,1,'2021-06-02 05:33:01','2021-06-02 05:33:01'),(4,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'company',NULL,NULL,2,'Ballpen-Red','Ballpen-Red / 0.5mm','pieces',100.00,0.00,0.00,'31622611981.jpg',NULL,'Panda',NULL,NULL,NULL,1,1,'2021-06-02 05:33:01','2021-06-02 05:33:01'),(5,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'company',NULL,NULL,1,'Ballpen-Black','Black Ballpen / 0.5mm ','pieces',200.00,0.00,0.00,'41622611981.jpg',NULL,'Panda',NULL,NULL,NULL,1,1,'2021-06-02 05:33:01','2021-06-02 05:33:01'),(6,1,NULL,1,NULL,NULL,NULL,NULL,NULL,'project',NULL,NULL,1,'Ballpen-Black','Black Ballpen / 0.5mm ','pieces',100.00,19.00,1900.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-06-02 05:37:09','2021-06-02 05:37:09'),(7,1,NULL,1,NULL,NULL,NULL,NULL,NULL,'project',NULL,NULL,3,'Bond Paper- A4','Bond Paper - A4 / White','ream',140.00,50.00,7000.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-06-02 05:37:09','2021-06-02 05:37:09'),(8,1,NULL,1,NULL,NULL,NULL,NULL,NULL,'project',NULL,NULL,5,'Club Hammer','Club Hammer- Black and Yellow','piece',160.00,2000.00,320000.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-06-02 05:37:09','2021-06-02 05:37:09'),(9,1,NULL,1,NULL,NULL,NULL,NULL,NULL,'company',NULL,NULL,1,'Ballpen-Black','Black Ballpen / 0.5mm ','pieces',200.00,19.00,3800.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-06-02 05:37:09','2021-06-02 05:37:09'),(10,1,NULL,1,NULL,NULL,NULL,NULL,NULL,'company',NULL,NULL,2,'Ballpen-Red','Ballpen-Red / 0.5mm','pieces',100.00,100.00,10000.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-06-02 05:37:09','2021-06-02 05:37:09'),(11,NULL,NULL,0,1,NULL,NULL,NULL,NULL,'project',0,NULL,1,'Ballpen-Black','Black Ballpen / 0.5mm ','pieces',100.00,15.00,1500.00,'01622612392.jpg','test','Panda',NULL,NULL,NULL,1,1,'2021-06-02 05:39:52','2021-06-02 05:43:43'),(12,NULL,NULL,0,1,NULL,NULL,NULL,NULL,'project',0,NULL,4,'Claw Hammer','Claw Hammer / Black and Orange','piece',120.00,200.00,24000.00,'11622612392.jpg','test2','Ace Hardware',NULL,NULL,NULL,1,1,'2021-06-02 05:39:52','2021-06-02 05:43:43'),(13,NULL,NULL,0,1,NULL,NULL,NULL,NULL,'project',0,NULL,6,'Office Chair- Black','Office Chair- Black','piece',130.00,10.00,1300.00,'21622612392.jpg','test3','Office Warehouse',NULL,NULL,NULL,1,1,'2021-06-02 05:39:52','2021-06-02 05:43:43'),(14,NULL,NULL,0,1,NULL,NULL,NULL,NULL,'project',0,NULL,3,'Bond Paper- A4','Bond Paper - A4 / White','ream',150.00,50.00,7500.00,'31622612392.png','test4','Bond Paper',NULL,NULL,NULL,1,1,'2021-06-02 05:39:52','2021-06-02 05:43:43'),(15,NULL,NULL,0,1,NULL,NULL,NULL,NULL,'project',0,NULL,2,'Ballpen-Red','Ballpen-Red / 0.5mm','pieces',100.00,5.00,500.00,'41622612392.jpg','test5','Panda',NULL,NULL,NULL,1,1,'2021-06-02 05:39:52','2021-06-02 05:43:43'),(16,NULL,NULL,0,1,NULL,NULL,NULL,NULL,'company',0,NULL,0,'N/A','','-',0.00,0.00,0.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-06-02 05:39:52','2021-06-02 05:39:52'),(17,NULL,NULL,1,2,NULL,NULL,NULL,NULL,'project',0,NULL,1,'Ballpen-Black','Black Ballpen / 0.5mm ','pieces',100.00,15.00,1500.00,'',NULL,'Panda',NULL,NULL,NULL,1,1,'2021-06-02 05:40:11','2021-06-02 05:43:36'),(18,NULL,NULL,1,2,NULL,NULL,NULL,NULL,'project',0,NULL,3,'Bond Paper- A4','Bond Paper - A4 / White','ream',140.00,50.00,7000.00,'',NULL,'Bond Paper',NULL,NULL,NULL,1,1,'2021-06-02 05:40:11','2021-06-02 05:43:36'),(19,NULL,NULL,1,2,NULL,NULL,NULL,NULL,'project',0,NULL,5,'Club Hammer','Club Hammer- Black and Yellow','piece',160.00,2000.00,320000.00,'',NULL,'Ace Hardware',NULL,NULL,NULL,1,1,'2021-06-02 05:40:11','2021-06-02 05:43:36'),(20,NULL,NULL,1,2,NULL,NULL,NULL,NULL,'company',0,NULL,1,'Ballpen-Black','Black Ballpen / 0.5mm ','pieces',200.00,15.00,3000.00,'',NULL,'Panda',NULL,NULL,NULL,1,1,'2021-06-02 05:40:11','2021-06-02 05:43:36'),(21,NULL,NULL,1,2,NULL,NULL,NULL,NULL,'company',0,NULL,2,'Ballpen-Red','Ballpen-Red / 0.5mm','pieces',100.00,5.00,500.00,'',NULL,'Panda',NULL,NULL,NULL,1,1,'2021-06-02 05:40:11','2021-06-02 05:43:36'),(49,0,1,NULL,1,NULL,NULL,NULL,NULL,'project',NULL,NULL,1,'Ballpen-Black','Black Ballpen / 0.5mm ','pieces',100.00,0.00,0.00,'01622612392.jpg',NULL,'Panda',NULL,0.00,100.00,1,1,'2021-06-02 06:32:19','2021-06-02 06:32:19'),(50,0,1,NULL,1,NULL,NULL,NULL,NULL,'project',NULL,NULL,4,'Claw Hammer','Claw Hammer / Black and Orange','piece',120.00,0.00,0.00,'11622612392.jpg',NULL,'Ace Hardware',NULL,0.00,120.00,1,1,'2021-06-02 06:32:19','2021-06-02 06:32:19'),(51,0,1,NULL,1,NULL,NULL,NULL,NULL,'project',NULL,NULL,6,'Office Chair- Black','Office Chair- Black','piece',130.00,0.00,0.00,'21622612392.jpg',NULL,'Office Warehouse',NULL,0.00,130.00,1,1,'2021-06-02 06:32:19','2021-06-02 06:32:19'),(52,0,1,NULL,1,NULL,NULL,NULL,NULL,'project',NULL,NULL,3,'Bond Paper- A4','Bond Paper - A4 / White','ream',150.00,0.00,0.00,'31622612392.png',NULL,'Bond Paper',NULL,0.00,150.00,1,1,'2021-06-02 06:32:19','2021-06-02 06:32:19'),(53,0,1,NULL,1,NULL,NULL,NULL,NULL,'project',NULL,NULL,2,'Ballpen-Red','Ballpen-Red / 0.5mm','pieces',100.00,0.00,0.00,'41622612392.jpg',NULL,'Panda',NULL,0.00,100.00,1,1,'2021-06-02 06:32:19','2021-06-02 06:32:19'),(54,0,2,NULL,2,NULL,NULL,NULL,NULL,'project',NULL,NULL,1,'Ballpen-Black','Black Ballpen / 0.5mm ','pieces',100.00,0.00,0.00,'',NULL,'Panda',NULL,0.00,100.00,1,1,'2021-06-02 06:33:12','2021-06-02 06:33:12'),(55,0,2,NULL,2,NULL,NULL,NULL,NULL,'project',NULL,NULL,3,'Bond Paper- A4','Bond Paper - A4 / White','ream',140.00,0.00,0.00,'',NULL,'Bond Paper',NULL,0.00,140.00,1,1,'2021-06-02 06:33:12','2021-06-02 06:33:12'),(56,0,2,NULL,2,NULL,NULL,NULL,NULL,'project',NULL,NULL,5,'Club Hammer','Club Hammer- Black and Yellow','piece',160.00,0.00,0.00,'',NULL,'Ace Hardware',NULL,0.00,160.00,1,1,'2021-06-02 06:33:12','2021-06-02 06:33:12'),(57,0,2,NULL,2,NULL,NULL,NULL,NULL,'company',NULL,NULL,1,'Ballpen-Black','Black Ballpen / 0.5mm ','pieces',200.00,0.00,0.00,'',NULL,'Panda',NULL,1.00,199.00,1,1,'2021-06-02 06:33:12','2021-06-02 06:33:12'),(58,0,2,NULL,2,NULL,NULL,NULL,NULL,'company',NULL,NULL,2,'Ballpen-Red','Ballpen-Red / 0.5mm','pieces',100.00,0.00,0.00,'',NULL,'Panda',NULL,1.00,99.00,1,1,'2021-06-02 06:33:12','2021-06-02 06:33:12'),(59,0,1,NULL,NULL,1,8,NULL,NULL,'project',4,'Dell Technology',1,'Ballpen-Black','Black Ballpen / 0.5mm ','pieces',100.00,15.00,1500.00,'01622612392.jpg',NULL,'Panda',NULL,0.00,100.00,1,1,'2021-06-02 06:36:22','2021-06-02 06:45:37'),(60,0,1,NULL,NULL,1,8,NULL,NULL,'project',4,'Dell Technology',3,'Bond Paper- A4','Bond Paper - A4 / White','ream',150.00,50.00,7500.00,'31622612392.png',NULL,'Bond Paper',NULL,0.00,150.00,1,1,'2021-06-02 06:36:22','2021-06-02 06:45:37'),(61,0,1,NULL,NULL,1,8,NULL,NULL,'project',3,'Acer Philippines',4,'Claw Hammer','Claw Hammer / Black and Orange','piece',120.00,200.00,24000.00,'11622612392.jpg',NULL,'Ace Hardware',NULL,0.00,120.00,1,1,'2021-06-02 06:36:22','2021-06-02 06:45:37'),(62,0,1,NULL,NULL,1,8,NULL,NULL,'project',1,'Ace Hardware',6,'Office Chair- Black','Office Chair- Black','piece',130.00,10.00,1300.00,'21622612392.jpg',NULL,'Office Warehouse',NULL,0.00,130.00,1,1,'2021-06-02 06:36:22','2021-06-02 06:45:37'),(63,0,1,NULL,NULL,1,8,NULL,NULL,'project',2,'National Bookstore',2,'Ballpen-Red','Ballpen-Red / 0.5mm','pieces',100.00,5.00,500.00,'41622612392.jpg',NULL,'Panda',NULL,0.00,100.00,1,1,'2021-06-02 06:36:22','2021-06-02 06:45:37'),(64,0,2,NULL,NULL,2,4,NULL,NULL,'project',4,'Dell Technology',1,'Ballpen-Black','Black Ballpen / 0.5mm ','pieces',100.00,15.00,1500.00,'',NULL,'Panda',NULL,0.00,100.00,1,1,'2021-06-02 06:37:14','2021-06-02 06:44:58'),(65,0,2,NULL,NULL,2,4,NULL,NULL,'project',4,'Dell Technology',3,'Bond Paper- A4','Bond Paper - A4 / White','ream',140.00,50.00,7000.00,'',NULL,'Bond Paper',NULL,0.00,140.00,1,1,'2021-06-02 06:37:14','2021-06-02 06:44:58'),(66,0,2,NULL,NULL,2,4,NULL,NULL,'project',3,'Acer Philippines',5,'Club Hammer','Club Hammer- Black and Yellow','piece',160.00,2000.00,320000.00,'',NULL,'Ace Hardware',NULL,0.00,160.00,1,1,'2021-06-02 06:37:14','2021-06-02 06:44:58'),(67,0,2,NULL,NULL,2,3,NULL,NULL,'company',4,'Dell Technology',1,'Ballpen-Black','Black Ballpen / 0.5mm ','pieces',200.00,15.00,2985.00,'',NULL,'Panda',NULL,1.00,199.00,1,1,'2021-06-02 06:37:14','2021-06-02 06:44:58'),(68,0,2,NULL,NULL,2,3,NULL,NULL,'company',2,'National Bookstore',2,'Ballpen-Red','Ballpen-Red / 0.5mm','pieces',100.00,5.00,495.00,'',NULL,'Panda',NULL,1.00,99.00,1,1,'2021-06-02 06:37:14','2021-06-02 06:44:58'),(71,0,1,NULL,1,1,8,1,NULL,'project',1,'Ace Hardware',6,'Office Chair- Black','Office Chair- Black','piece',130.00,10.00,1300.00,'21622612392.jpg','-','Office Warehouse',120.00,0.00,130.00,1,1,'2021-06-02 06:53:06','2021-06-03 00:18:07'),(72,0,1,NULL,1,1,8,2,NULL,'project',2,'National Bookstore',2,'Ballpen-Red','Ballpen-Red / 0.5mm','pieces',100.00,5.00,500.00,'41622612392.jpg','-','Panda',NULL,0.00,100.00,1,1,'2021-06-02 06:54:16','2021-06-02 06:54:16'),(74,0,1,NULL,1,1,8,3,NULL,'project',2,'National Bookstore',2,'Ballpen-Red','Ballpen-Red / 0.5mm','pieces',100.00,5.00,500.00,'41622612392.jpg','-','Panda',NULL,0.00,100.00,1,1,'2021-06-02 06:55:44','2021-06-02 06:55:44'),(75,0,1,NULL,1,1,8,4,NULL,'project',3,'Acer Philippines',4,'Claw Hammer','Claw Hammer / Black and Orange','piece',120.00,200.00,24000.00,'11622612392.jpg','-','Ace Hardware',NULL,0.00,120.00,1,1,'2021-06-02 06:56:01','2021-06-02 06:56:01'),(76,0,1,NULL,1,1,8,5,NULL,'project',4,'Dell Technology',1,'Ballpen-Black','Black Ballpen / 0.5mm ','pieces',100.00,15.00,1500.00,'01622612392.jpg','-','Panda',NULL,0.00,100.00,1,1,'2021-06-02 06:56:17','2021-06-02 06:56:17'),(77,0,1,NULL,1,1,8,5,NULL,'project',4,'Dell Technology',3,'Bond Paper- A4','Bond Paper - A4 / White','ream',150.00,50.00,7500.00,'31622612392.png','-','Bond Paper',NULL,0.00,150.00,1,1,'2021-06-02 06:56:17','2021-06-02 06:56:17'),(78,0,2,NULL,2,2,3,6,NULL,'company',2,'National Bookstore',2,'Ballpen-Red','Ballpen-Red / 0.5mm','pieces',100.00,5.00,495.00,'','-','Panda',NULL,1.00,99.00,1,1,'2021-06-02 23:33:07','2021-06-02 23:33:07'),(79,0,2,NULL,2,2,4,7,NULL,'project',3,'Acer Philippines',5,'Club Hammer','Club Hammer- Black and Yellow','piece',160.00,2000.00,320000.00,'','-','Ace Hardware',NULL,0.00,160.00,1,1,'2021-06-02 23:53:45','2021-06-02 23:53:45');
/*!40000 ALTER TABLE `ims_request_items_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_request_services_tbl`
--

DROP TABLE IF EXISTS `ims_request_services_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_request_services_tbl` (
  `requestServiceID` bigint(20) NOT NULL AUTO_INCREMENT,
  `serviceRequisitionID` bigint(20) NOT NULL,
  `serviceOrderID` bigint(20) DEFAULT NULL,
  `serviceCompletionID` bigint(20) DEFAULT NULL,
  `serviceID` bigint(20) DEFAULT NULL,
  `serviceName` text DEFAULT NULL,
  `serviceDateFrom` date DEFAULT NULL,
  `serviceDateTo` date DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`requestServiceID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_request_services_tbl`
--

LOCK TABLES `ims_request_services_tbl` WRITE;
/*!40000 ALTER TABLE `ims_request_services_tbl` DISABLE KEYS */;
INSERT INTO `ims_request_services_tbl` VALUES (1,1,NULL,NULL,1,'Payroll',NULL,NULL,'',1,1,'2021-05-26 06:18:04','2021-05-26 06:18:04'),(2,1,1,NULL,1,'Payroll',NULL,NULL,'-',1,1,'2021-05-26 06:25:10','2021-05-26 06:25:10'),(3,1,2,NULL,1,'Payroll',NULL,NULL,'-',1,1,'2021-05-26 06:31:34','2021-05-26 06:31:34'),(4,2,NULL,NULL,1,'Payroll',NULL,NULL,'',1,1,'2021-05-26 07:00:48','2021-05-26 07:00:48'),(6,2,3,NULL,1,'Payroll',NULL,NULL,'-',1,1,'2021-05-26 07:05:06','2021-05-26 07:05:06'),(8,2,4,NULL,1,'Payroll',NULL,NULL,'-',1,1,'2021-05-26 07:21:25','2021-05-26 07:21:25'),(11,2,4,1,1,'Payroll','2021-05-01','2021-06-30','-',1,1,'2021-05-26 08:02:55','2021-05-26 08:02:55'),(12,3,NULL,NULL,2,'Aircon Cleaning',NULL,NULL,'',1,1,'2021-05-28 06:18:22','2021-05-28 06:18:22'),(14,4,NULL,NULL,2,'Aircon Cleaning',NULL,NULL,'',1,1,'2021-05-28 06:27:09','2021-05-28 06:27:09');
/*!40000 ALTER TABLE `ims_request_services_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_return_item_details_tbl`
--

DROP TABLE IF EXISTS `ims_return_item_details_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_return_item_details_tbl` (
  `returnItemDetailID` bigint(20) NOT NULL AUTO_INCREMENT,
  `returnItemID` bigint(20) NOT NULL,
  `borrowingDetailID` bigint(20) NOT NULL,
  `inventoryStorageID` bigint(50) NOT NULL,
  `itemID` bigint(50) NOT NULL,
  `itemName` varchar(250) NOT NULL,
  `barcode` varchar(50) NOT NULL,
  `serialnumber` varchar(60) NOT NULL,
  `dateBorrowed` date NOT NULL,
  `quantityBorrowed` decimal(15,2) NOT NULL,
  `borrowedpurpose` varchar(255) NOT NULL,
  `returnItemDate` date NOT NULL,
  `returnItemQuantity` decimal(15,2) NOT NULL,
  PRIMARY KEY (`returnItemDetailID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_return_item_details_tbl`
--

LOCK TABLES `ims_return_item_details_tbl` WRITE;
/*!40000 ALTER TABLE `ims_return_item_details_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_return_item_details_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_return_item_tbl`
--

DROP TABLE IF EXISTS `ims_return_item_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_return_item_tbl` (
  `returnItemID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseReturnItemID` bigint(20) DEFAULT NULL,
  `borrowingID` bigint(20) NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `projectID` bigint(20) DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `returnItemStatus` int(11) NOT NULL,
  `returnItemReason` longtext DEFAULT NULL,
  `returnItemRemarks` longtext DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`returnItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_return_item_tbl`
--

LOCK TABLES `ims_return_item_tbl` WRITE;
/*!40000 ALTER TABLE `ims_return_item_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_return_item_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_service_completion_tbl`
--

DROP TABLE IF EXISTS `ims_service_completion_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_service_completion_tbl` (
  `serviceCompletionID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseServiceCompletionID` bigint(20) DEFAULT NULL,
  `serviceRequisitionID` bigint(20) DEFAULT NULL,
  `serviceOrderID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `serviceCompletionStatus` int(11) NOT NULL,
  `serviceCompletionRemarks` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`serviceCompletionID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_service_completion_tbl`
--

LOCK TABLES `ims_service_completion_tbl` WRITE;
/*!40000 ALTER TABLE `ims_service_completion_tbl` DISABLE KEYS */;
INSERT INTO `ims_service_completion_tbl` VALUES (1,NULL,2,4,1,'2|4|5','2|2|2','2021-05-26 16:03:59|2021-05-26 16:04:48|2021-05-26 16:05:31',5,NULL,'2021-05-26 16:02:53',1,1,'2021-05-26 16:00:50','2021-05-26 08:05:57');
/*!40000 ALTER TABLE `ims_service_completion_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_service_order_tbl`
--

DROP TABLE IF EXISTS `ims_service_order_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_service_order_tbl` (
  `serviceOrderID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseServiceOrderID` bigint(20) DEFAULT NULL,
  `serviceRequisitionID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `projectID` bigint(20) NOT NULL,
  `clientID` bigint(20) NOT NULL,
  `clientName` text DEFAULT NULL,
  `clientAddress` text DEFAULT NULL,
  `clientContactDetails` text DEFAULT NULL,
  `clientContactPerson` text DEFAULT NULL,
  `inventoryVendorID` bigint(20) DEFAULT NULL,
  `companyName` text DEFAULT NULL,
  `companyContactDetails` text DEFAULT NULL,
  `companyContactPerson` text DEFAULT NULL,
  `companyAddress` text DEFAULT NULL,
  `paymentTerms` varchar(100) DEFAULT NULL,
  `discountType` varchar(100) DEFAULT NULL,
  `scheduleDate` date DEFAULT NULL,
  `total` decimal(15,2) DEFAULT NULL,
  `discount` decimal(15,2) DEFAULT NULL,
  `totalAmount` decimal(15,2) DEFAULT NULL,
  `vatSales` decimal(15,2) DEFAULT NULL,
  `vat` decimal(15,2) DEFAULT NULL,
  `totalVat` decimal(15,2) DEFAULT NULL,
  `lessEwt` decimal(15,2) DEFAULT NULL,
  `grandTotalAmount` decimal(15,2) DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `serviceOrderStatus` int(11) NOT NULL,
  `serviceOrderReason` text DEFAULT NULL,
  `serviceOrderRemarks` text DEFAULT NULL,
  `contractFile` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`serviceOrderID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_service_order_tbl`
--

LOCK TABLES `ims_service_order_tbl` WRITE;
/*!40000 ALTER TABLE `ims_service_order_tbl` DISABLE KEYS */;
INSERT INTO `ims_service_order_tbl` VALUES (1,NULL,1,1,2,2,'Ricardo\'s Coffee + Classic Cuisine','Cristanto M. Delos Reyes, Higway, Brgy. Dagatan, Dagatan, Amadeo, Cavite, Philippines, 4119','0917 8862 210 / (02) 8171 433','Serafino Juliano',1,'Ace Hardware','0932-5464-575 /','Ayesha Porras','1209, Twin Tower, Batasan Hills, Quezon City, National Capital Region - Second District, Philippines, 1920','test','amount','2021-05-26',250.00,0.00,250.00,223.21,26.79,250.00,4.46,245.54,'2|4|5','2|2|3','2021-05-26 14:27:13|2021-05-26 14:28:39|2021-05-26 14:30:51',3,'test','test',NULL,'2021-05-26 14:25:09',1,5,'2021-05-26 06:25:10','2021-05-26 06:30:51'),(2,NULL,1,1,2,2,'Ricardo\'s Coffee + Classic Cuisine','Cristanto M. Delos Reyes, Higway, Brgy. Dagatan, Dagatan, Amadeo, Cavite, Philippines, 4119','0917 8862 210 / (02) 8171 433','Serafino Juliano',1,'Ace Hardware','0932-5464-575 /','Ayesha Porras','1209, Twin Tower, Batasan Hills, Quezon City, National Capital Region - Second District, Philippines, 1920','test','amount','2021-05-26',250.00,0.00,250.00,223.21,26.79,250.00,4.46,245.54,'2|4|5','2|2|2','2021-05-26 14:32:20|2021-05-26 14:33:27|2021-05-26 14:34:21',5,'test',NULL,NULL,'2021-05-26 14:31:33',1,1,'2021-05-26 06:31:34','2021-05-26 06:34:48'),(3,NULL,2,1,0,2,'Ricardo\'s Coffee + Classic Cuisine','Cristanto M. Delos Reyes, Higway, Brgy. Dagatan, Dagatan, Amadeo, Cavite, Philippines, 4119','0917 8862 210 / (02) 8171 433','Serafino Juliano',1,'Ace Hardware','0932-5464-575 /','Ayesha Porras','1209, Twin Tower, Batasan Hills, Quezon City, National Capital Region - Second District, Philippines, 1920','test','amount','2021-05-26',25.00,0.00,25.00,22.32,2.68,25.00,0.45,24.55,'2|4|5','3','2021-05-26 15:06:15',3,'test','test',NULL,'2021-05-26 15:05:05',1,2,'2021-05-26 07:04:38','2021-05-26 07:06:16'),(4,3,2,1,0,2,'Ricardo\'s Coffee + Classic Cuisine','Cristanto M. Delos Reyes, Higway, Brgy. Dagatan, Dagatan, Amadeo, Cavite, Philippines, 4119','0917 8862 210 / (02) 8171 433','Serafino Juliano',1,'Ace Hardware','0932-5464-575 /','Ayesha Porras','1209, Twin Tower, Batasan Hills, Quezon City, National Capital Region - Second District, Philippines, 1920','test','amount','2021-05-26',25.00,0.00,25.00,22.32,2.68,25.00,0.45,24.55,'2|4|5','2|2|2','2021-05-26 15:22:14|2021-05-26 15:24:06|2021-05-26 15:25:11',2,'test',NULL,'gallery-2.jpg1622706606.jpg','2021-05-26 15:21:24',1,5,'2021-05-26 07:07:02','2021-06-03 07:50:06');
/*!40000 ALTER TABLE `ims_service_order_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_service_requisition_tbl`
--

DROP TABLE IF EXISTS `ims_service_requisition_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_service_requisition_tbl` (
  `serviceRequisitionID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseServiceRequisitionID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `clientID` bigint(20) DEFAULT NULL,
  `projectID` bigint(20) DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `serviceRequisitionStatus` int(11) NOT NULL,
  `serviceRequisitionReason` text DEFAULT NULL,
  `serviceRequisitionRemarks` text DEFAULT NULL,
  `serviceRequisitionTotalAmount` decimal(15,2) DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`serviceRequisitionID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_service_requisition_tbl`
--

LOCK TABLES `ims_service_requisition_tbl` WRITE;
/*!40000 ALTER TABLE `ims_service_requisition_tbl` DISABLE KEYS */;
INSERT INTO `ims_service_requisition_tbl` VALUES (1,NULL,1,2,2,'2|4|5','2|2|2','2021-05-26 14:20:04|2021-05-26 14:20:59|2021-05-26 14:23:09',5,'test',NULL,250.00,'2021-05-26 14:18:03',1,1,'2021-05-26 14:18:03','2021-05-28 06:20:09'),(2,NULL,1,2,0,'2|4|5','2|2|2','2021-05-26 15:02:06|2021-05-26 15:03:10|2021-05-26 15:04:03',2,'test',NULL,25.00,'2021-05-26 15:00:47',1,5,'2021-05-26 15:00:47','2021-05-26 07:04:04'),(3,NULL,1,0,0,NULL,NULL,NULL,0,'',NULL,0.00,NULL,1,1,'2021-05-28 14:18:18','2021-05-28 06:18:22'),(4,NULL,1,0,0,'2|4|5',NULL,NULL,1,'test',NULL,3000.00,'2021-05-28 14:27:04',1,1,'2021-05-28 14:26:24','2021-05-28 06:27:09');
/*!40000 ALTER TABLE `ims_service_requisition_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_service_scope_tbl`
--

DROP TABLE IF EXISTS `ims_service_scope_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_service_scope_tbl` (
  `scopeID` bigint(20) NOT NULL AUTO_INCREMENT,
  `serviceRequisitionID` bigint(20) DEFAULT NULL,
  `serviceOrderID` bigint(20) DEFAULT NULL,
  `serviceCompletionID` bigint(20) DEFAULT NULL,
  `requestServiceID` bigint(20) NOT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `uom` varchar(100) DEFAULT NULL,
  `unitCost` decimal(15,2) DEFAULT NULL,
  `totalCost` decimal(15,2) DEFAULT NULL,
  `file` text DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`scopeID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_service_scope_tbl`
--

LOCK TABLES `ims_service_scope_tbl` WRITE;
/*!40000 ALTER TABLE `ims_service_scope_tbl` DISABLE KEYS */;
INSERT INTO `ims_service_scope_tbl` VALUES (1,1,NULL,NULL,1,'test',5,'pieces',50.00,250.00,NULL,1,1,'2021-05-26 06:18:04','2021-05-26 06:18:04'),(2,1,1,NULL,2,'test',5,'pieces',50.00,250.00,NULL,1,1,'2021-05-26 06:25:10','2021-05-26 06:25:10'),(3,1,2,NULL,3,'test',5,'pieces',50.00,250.00,NULL,1,1,'2021-05-26 06:31:34','2021-05-26 06:31:34'),(4,2,NULL,NULL,4,'test',5,'pieces',5.00,25.00,NULL,1,1,'2021-05-26 07:00:48','2021-05-26 07:00:48'),(6,2,3,NULL,6,'test',5,'pieces',5.00,25.00,NULL,1,1,'2021-05-26 07:05:06','2021-05-26 07:05:06'),(8,2,4,NULL,8,'test',5,'pieces',5.00,25.00,NULL,1,1,'2021-05-26 07:21:25','2021-05-26 07:21:25'),(11,2,4,1,11,'test',5,'pieces',5.00,25.00,'005-home-101622016053.svg',1,1,'2021-05-26 08:02:55','2021-05-26 08:02:55'),(12,3,NULL,NULL,12,'',0,'pcs',0.00,0.00,NULL,1,1,'2021-05-28 06:18:22','2021-05-28 06:18:22'),(14,4,NULL,NULL,14,'General Cleaning',2,'pieces',1500.00,3000.00,NULL,1,1,'2021-05-28 06:27:09','2021-05-28 06:27:09');
/*!40000 ALTER TABLE `ims_service_scope_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_services_tbl`
--

DROP TABLE IF EXISTS `ims_services_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_services_tbl` (
  `serviceID` bigint(20) NOT NULL AUTO_INCREMENT,
  `serviceCode` varchar(255) NOT NULL,
  `serviceName` varchar(255) NOT NULL,
  `serviceDescription` varchar(255) NOT NULL,
  `serviceStatus` int(50) NOT NULL,
  `datecreated` text NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`serviceID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_services_tbl`
--

LOCK TABLES `ims_services_tbl` WRITE;
/*!40000 ALTER TABLE `ims_services_tbl` DISABLE KEYS */;
INSERT INTO `ims_services_tbl` VALUES (1,'SVC-21-00001','Payroll','Provide third-party payroll service',1,'2021-05-26 06:15:35',1,1,'2021-05-26 06:15:35','2021-05-26 06:15:35'),(2,'SVC-21-00002','Aircon Cleaning','For aircon cleaning and maintenance',1,'2021-05-27 07:45:40',1,1,'2021-05-27 07:45:40','2021-05-27 07:45:57'),(3,'SVC-21-00003','CCTV Installation','Install CCTVs for a specific client',1,'2021-05-28 06:20:09',1,1,'2021-05-28 06:20:09','2021-05-28 06:20:15');
/*!40000 ALTER TABLE `ims_services_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_stock_in_tbl`
--

DROP TABLE IF EXISTS `ims_stock_in_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_stock_in_tbl` (
  `stockinID` bigint(255) NOT NULL AUTO_INCREMENT,
  `inventoryReceivingID` bigint(255) NOT NULL,
  `itemID` bigint(255) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `barcode` text NOT NULL,
  `stockInSerialNumber` varchar(255) DEFAULT NULL,
  `stockInQuantity` decimal(15,2) NOT NULL,
  `stockInLocationID` bigint(255) NOT NULL,
  `manufacturedDate` varchar(255) NOT NULL,
  `expirationDate` varchar(255) NOT NULL,
  `StockInStatus` bigint(255) NOT NULL,
  PRIMARY KEY (`stockinID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_stock_in_tbl`
--

LOCK TABLES `ims_stock_in_tbl` WRITE;
/*!40000 ALTER TABLE `ims_stock_in_tbl` DISABLE KEYS */;
INSERT INTO `ims_stock_in_tbl` VALUES (1,1,6,'Office Chair- Black','00006-00001-65456','12332132154665456',1.00,1,'','',0),(2,1,6,'Office Chair- Black','00006-00001-6545s','1233213215466545s',1.00,1,'','',0),(3,1,6,'Office Chair- Black','00006-00001-6545a','1233213215466545a',1.00,1,'','',0),(4,1,6,'Office Chair- Black','00006-00001-ds456','123321321546ds456',1.00,1,'','',0),(5,1,6,'Office Chair- Black','00006-00001-dsfas','sdadasty3134dsfas',1.00,1,'','',0),(6,1,6,'Office Chair- Black','00006-00001-00000','',1.00,1,'','',0),(7,1,6,'Office Chair- Black','00006-00001-00000','',1.00,1,'','',0),(8,1,6,'Office Chair- Black','00006-00001-00000','',1.00,1,'','',0),(9,1,6,'Office Chair- Black','00006-00001-00000','',1.00,1,'','',0),(10,1,6,'Office Chair- Black','00006-00001-00000','',1.00,1,'','',0),(11,2,2,'Ballpen-Red','00002-00001-31231','32131232132131231',1.00,1,'June 02, 2021','',0),(12,2,2,'Ballpen-Red','00002-00001-32132','32132142132132132',1.00,1,'June 01, 2021','',0),(13,2,2,'Ballpen-Red','00002-00001-43124','42132132132143124',1.00,1,'','',0),(14,3,6,'Office Chair- Black','00006-00001-00000','',20.00,1,'June 02, 2021','June 09, 2021',0),(15,4,4,'Claw Hammer','00004-00001-00000','',50.00,1,'','',0),(16,4,4,'Claw Hammer','00004-00001-00000','',20.00,1,'','',0),(17,4,4,'Claw Hammer','00004-00001-00000','',1.00,1,'','',0),(18,5,2,'Ballpen-Red','00002-00001-21312','13221312312321312',1.00,1,'','',0),(19,5,2,'Ballpen-Red','00002-00001-21313','13221312312321313',1.00,1,'','',0),(20,5,2,'Ballpen-Red','00002-00001-21311','13221312312321311',1.00,1,'','',0),(21,5,2,'Ballpen-Red','00002-00001-21314','13221312312321314',1.00,1,'','',0),(22,5,2,'Ballpen-Red','00002-00001-21315','13221312312321315',1.00,1,'','',0),(23,5,2,'Ballpen-Red','00002-00001-21316','13221312312321316',1.00,1,'','',0),(24,5,2,'Ballpen-Red','00002-00001-21317','13221312312321317',1.00,1,'','',0),(25,5,2,'Ballpen-Red','00002-00001-21318','13221312312321318',1.00,1,'','',0),(26,5,2,'Ballpen-Red','00002-00001-21319','13221312312321319',1.00,1,'','',0),(27,5,2,'Ballpen-Red','00002-00001-2131a','1322131231232131a',1.00,1,'','',0);
/*!40000 ALTER TABLE `ims_stock_in_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_stock_in_total_tbl`
--

DROP TABLE IF EXISTS `ims_stock_in_total_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_stock_in_total_tbl` (
  `stockInTotalID` int(11) NOT NULL AUTO_INCREMENT,
  `itemID` int(11) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `inventoryStorageID` int(11) NOT NULL,
  `stockInTotalStatus` int(11) NOT NULL,
  PRIMARY KEY (`stockInTotalID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_stock_in_total_tbl`
--

LOCK TABLES `ims_stock_in_total_tbl` WRITE;
/*!40000 ALTER TABLE `ims_stock_in_total_tbl` DISABLE KEYS */;
INSERT INTO `ims_stock_in_total_tbl` VALUES (1,6,'Office Chair- Black',21,1,0),(2,2,'Ballpen-Red',2,1,0),(3,4,'Claw Hammer',71,1,0);
/*!40000 ALTER TABLE `ims_stock_in_total_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_transfer_request_details_tbl`
--

DROP TABLE IF EXISTS `ims_transfer_request_details_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_transfer_request_details_tbl` (
  `transferRequestItemID` bigint(20) NOT NULL AUTO_INCREMENT,
  `transferRequestID` bigint(20) NOT NULL,
  `itemCode` varchar(255) NOT NULL,
  `itemID` bigint(20) DEFAULT NULL,
  `barcode` varchar(255) NOT NULL,
  `itemName` varchar(255) DEFAULT NULL,
  `brandName` varchar(255) DEFAULT NULL,
  `unitOfMeasurement` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `stocks` int(11) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`transferRequestItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_transfer_request_details_tbl`
--

LOCK TABLES `ims_transfer_request_details_tbl` WRITE;
/*!40000 ALTER TABLE `ims_transfer_request_details_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_transfer_request_details_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_transfer_request_tbl`
--

DROP TABLE IF EXISTS `ims_transfer_request_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_transfer_request_tbl` (
  `transferRequestID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseTransferRequestID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `inventoryStorageIDSender` bigint(20) DEFAULT NULL,
  `inventoryStorageIDReceiver` bigint(20) DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `transferRequestStatus` int(11) NOT NULL,
  `transferDate` date DEFAULT NULL,
  `transferRequestReason` longtext DEFAULT NULL,
  `transferRequestRemarks` longtext DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`transferRequestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_transfer_request_tbl`
--

LOCK TABLES `ims_transfer_request_tbl` WRITE;
/*!40000 ALTER TABLE `ims_transfer_request_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_transfer_request_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_travel_request_tbl`
--

DROP TABLE IF EXISTS `ims_travel_request_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_travel_request_tbl` (
  `travelRequestID` bigint(20) NOT NULL AUTO_INCREMENT,
  `costEstimateID` bigint(20) DEFAULT NULL,
  `billMaterialID` bigint(20) DEFAULT NULL,
  `travelDescription` text NOT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `unitOfMeasure` text NOT NULL,
  `unitCost` decimal(10,2) NOT NULL,
  `totalCost` decimal(10,2) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`travelRequestID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_travel_request_tbl`
--

LOCK TABLES `ims_travel_request_tbl` WRITE;
/*!40000 ALTER TABLE `ims_travel_request_tbl` DISABLE KEYS */;
INSERT INTO `ims_travel_request_tbl` VALUES (1,1,NULL,'Travel and Transportation',100.50,'kilo',0.00,0.00,1,1,'2021-06-02 05:33:01','2021-06-02 05:33:01'),(2,1,1,'Travel and Transportation',100.50,'kilo',0.00,0.00,1,1,'2021-06-02 05:37:09','2021-06-02 05:37:09'),(3,1,1,'Test',100.00,'Pieces',100.00,10000.00,1,1,'2021-06-02 05:37:09','2021-06-02 05:37:09'),(4,1,1,'Test 2',200.00,'Kilo',200.00,40000.00,1,1,'2021-06-02 05:37:09','2021-06-02 05:37:09');
/*!40000 ALTER TABLE `ims_travel_request_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_uom_tbl`
--

DROP TABLE IF EXISTS `ims_uom_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_uom_tbl` (
  `uomID` bigint(20) NOT NULL AUTO_INCREMENT,
  `uomCode` varchar(255) NOT NULL,
  `uomName` varchar(255) NOT NULL,
  `uomStatus` int(50) NOT NULL,
  `datecreated` text NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`uomID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_uom_tbl`
--

LOCK TABLES `ims_uom_tbl` WRITE;
/*!40000 ALTER TABLE `ims_uom_tbl` DISABLE KEYS */;
INSERT INTO `ims_uom_tbl` VALUES (1,'UOM-21-00001','pieces',1,'2021-05-25 23:50:02',1,1,'2021-05-25 23:50:02','2021-05-25 23:51:33'),(2,'UOM-21-00002','kilo',1,'2021-05-26 03:10:53',1,1,'2021-05-26 03:10:53','2021-05-26 03:10:53'),(3,'UOM-21-00003','pounds',1,'2021-05-26 03:11:04',1,1,'2021-05-26 03:11:04','2021-05-28 06:17:57'),(4,'UOM-21-00004','grams',1,'2021-05-27 07:27:06',1,1,'2021-05-27 07:27:06','2021-05-27 07:27:19'),(5,'UOM-21-00005','ream',1,'2021-06-01 00:44:45',1,1,'2021-06-01 00:44:45','2021-06-01 00:44:55');
/*!40000 ALTER TABLE `ims_uom_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_bill_material_tbl`
--

DROP TABLE IF EXISTS `pms_bill_material_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_bill_material_tbl` (
  `billMaterialID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseBillMaterialID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `projectID` bigint(20) DEFAULT NULL,
  `referenceCode` text DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `billMaterialStatus` int(11) NOT NULL,
  `billMaterialReason` text DEFAULT NULL,
  `billMaterialRemarks` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`billMaterialID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_bill_material_tbl`
--

LOCK TABLES `pms_bill_material_tbl` WRITE;
/*!40000 ALTER TABLE `pms_bill_material_tbl` DISABLE KEYS */;
INSERT INTO `pms_bill_material_tbl` VALUES (1,NULL,1,2,'1','4|20|2','2|2|2','2021-06-02 13:37:34|2021-06-02 13:38:07|2021-06-02 13:38:35',2,'Test Description',NULL,'2021-06-02 05:37:07',1,2,'2021-06-02 05:37:07','2021-06-02 05:38:36');
/*!40000 ALTER TABLE `pms_bill_material_tbl` ENABLE KEYS */;
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
  `categoryShortcut` varchar(255) DEFAULT NULL,
  `categoryStatus` int(50) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `datecreated` date NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`categoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_category_tbl`
--

LOCK TABLES `pms_category_tbl` WRITE;
/*!40000 ALTER TABLE `pms_category_tbl` DISABLE KEYS */;
INSERT INTO `pms_category_tbl` VALUES (1,'PCT-21-00001','Infrastructure','4',NULL,1,1,1,'0000-00-00','2021-04-14 21:28:31','2021-05-27 17:59:41'),(2,'PCT-21-00002','Maintenance','3',NULL,1,1,1,'0000-00-00','2021-04-20 18:00:40','2021-05-27 18:00:54'),(3,'PCT-21-00003','Software','3',NULL,1,1,1,'0000-00-00','2021-04-20 18:01:45','2021-05-27 17:59:50'),(4,'PCT-21-00004','Hardware','4',NULL,1,1,1,'0000-00-00','2021-05-05 23:03:16','2021-05-27 17:59:33'),(5,'PCT-21-00005','test test test','3',NULL,1,1,1,'0000-00-00','2021-05-26 00:07:51','0000-00-00 00:00:00');
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
  `clientShortcut` varchar(255) NOT NULL,
  `clientRegion` varchar(255) NOT NULL,
  `clientProvince` varchar(255) NOT NULL,
  `clientCity` varchar(255) NOT NULL,
  `clientBarangay` varchar(255) NOT NULL,
  `clientUnitNumber` varchar(255) NOT NULL,
  `clientHouseNumber` varchar(255) NOT NULL,
  `clientStreetName` text DEFAULT NULL,
  `clientSubdivisionName` text DEFAULT NULL,
  `clientCountry` varchar(255) NOT NULL,
  `clientPostalCode` int(50) NOT NULL,
  `clientContactPerson` varchar(255) NOT NULL,
  `clientEmailAddress` varchar(255) NOT NULL,
  `clientTin` varchar(255) NOT NULL,
  `client_MobileNo` varchar(255) NOT NULL,
  `clientTelephoneNo` varchar(255) NOT NULL,
  `clientBrandName` varchar(255) NOT NULL,
  `clientContract` text DEFAULT NULL,
  `clientJobOrder` text DEFAULT NULL,
  `clientEngagementLetter` text DEFAULT NULL,
  `clientStatus` int(50) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`clientID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_client_tbl`
--

LOCK TABLES `pms_client_tbl` WRITE;
/*!40000 ALTER TABLE `pms_client_tbl` DISABLE KEYS */;
INSERT INTO `pms_client_tbl` VALUES (1,'CLT-21-00001','DeltaMike Security Inc.','DSI','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','QUEZON CITY','DOÑA IMELDA','547','96 Guirayan Street','null','null','Philippines',1113,'Noemi Gaylan','noemiegaylan@tactics.com.ph','686-474-574-575','0977-801-1202','(02)-8709-5430','https://deltamikesecurity.com/','01624000763.png','','',0,1,1,'2021-04-14 16:02:09','2021-06-18 07:19:23'),(2,'CLT-21-00002','Ricardo\'s Coffee + Classic Cuisine','TCC','4A','CAVITE','AMADEO','DAGATAN','','Cristanto M. Delos Reyes, Higway, Brgy. Dagatan','null','null','Philippines',4119,'Serafino Juliano','maryanne.concio@powerhouse-academy.com','230-000-000-000','0917-886-2210','(02)-8171-4330','','01623996145.jpg','01623996145.jpg','01623996145.jpg',1,1,1,'2021-04-14 16:26:19','2021-06-18 06:02:25'),(3,'CLT-21-00003','Powerhouse (PDCA)','PDC','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','QUEZON CITY','BAGUMBAYAN','','28D Eastwood Excelsior Eastwood Avenue, Eastwood City','null','null','Philippines',1110,'Mary Ann Consio','maryanne.concio@powerhouse-academy.com','200-000-000-000','0917-886-2210','(30)-0000-0000','http://www.powerhouse-academy.com','01623996196.jpg','','01623996231.jpg',1,1,1,'2021-04-14 16:47:21','2021-06-18 07:29:46'),(4,'CLT-21-00004','Gatchallan Tangalin and Co CPAs','','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','CITY OF PASIG','SAN ANTONIO','1709','Antel Global Corporate Center',NULL,NULL,'Philippines',1605,'Kaycee Allen Tangalin','gtc.cpas@gmail.com','667-576-565-645','0995-078-2845','(02)-5310-2930','http://www.gtcnow.com',NULL,NULL,NULL,1,1,1,'2021-04-14 18:42:10','2021-05-27 17:59:27'),(5,'CLT-21-00005','Esquared Universal Company','','01','ILOCOS SUR','VIGAN CITY','BARANGAY I (POB.)','1','Antel global corporate center','null','null','Philippines',1533,'Carlota Montefalco','carly.monty@gmail.com','324-830-402-704','0993-320-0133','(21)-1231-3540','',NULL,NULL,NULL,1,1,1,'2021-05-17 23:01:52','2021-05-30 21:33:09'),(6,'CLT-21-00006','Karlito Management Timber','KMT','03','NUEVA ECIJA','CABANATUAN CITY','ADUAS NORTE','1701','Antel','Julia','Ortigas','Philippines',1900,'Charles Gil','ch4rl3rGiL@gmail.com','321-521-521-321','0956-234-9561','(13)-2168-5216','website.com','01624001025.jpg','','',0,1,1,'2021-06-18 07:23:11','2021-06-18 07:25:57');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_cost_estimate_tbl`
--

LOCK TABLES `pms_cost_estimate_tbl` WRITE;
/*!40000 ALTER TABLE `pms_cost_estimate_tbl` DISABLE KEYS */;
INSERT INTO `pms_cost_estimate_tbl` VALUES (1,NULL,1,2,NULL,'4|20|2','2|2|2','2021-06-02 13:33:57|2021-06-02 13:34:25|2021-06-02 13:34:50',2,'Test Description',NULL,'2021-06-02 05:33:00',1,2,'2021-06-02 05:33:00','2021-06-02 05:34:53');
/*!40000 ALTER TABLE `pms_cost_estimate_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_milestone_builder_tbl`
--

DROP TABLE IF EXISTS `pms_milestone_builder_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_milestone_builder_tbl` (
  `milestoneBuilderID` bigint(21) NOT NULL AUTO_INCREMENT,
  `phaseCode` varchar(255) DEFAULT NULL,
  `phaseDescription` text NOT NULL,
  `categoryID` bigint(20) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`milestoneBuilderID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_milestone_builder_tbl`
--

LOCK TABLES `pms_milestone_builder_tbl` WRITE;
/*!40000 ALTER TABLE `pms_milestone_builder_tbl` DISABLE KEYS */;
INSERT INTO `pms_milestone_builder_tbl` VALUES (1,'PHS-21-00001','Sample Description 1',1,1,1,'2021-06-09 02:23:21','2021-06-09 02:23:21'),(2,'PHS-21-00002','Sample Description 2',2,1,1,'2021-06-09 02:23:21','2021-06-09 02:23:21'),(3,'PHS-21-00003','Sample Description 3',1,1,1,'2021-06-09 02:23:21','2021-06-09 02:23:21'),(4,'PHS-21-00004','Sample Description 4',1,1,1,'2021-06-09 02:23:21','2021-06-09 02:23:21'),(5,'PHS-21-00005','Sample Description 5',2,1,1,'2021-06-09 02:23:21','2021-06-09 02:23:21'),(6,'PHS-21-00006','Sample Description 6',1,1,1,'2021-06-09 02:23:21','2021-06-09 02:23:21'),(7,'PHS-21-00007','Sample Description 7',1,1,1,'2021-06-09 02:23:21','2021-06-09 02:23:21');
/*!40000 ALTER TABLE `pms_milestone_builder_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_milestone_list_tbl`
--

DROP TABLE IF EXISTS `pms_milestone_list_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_milestone_list_tbl` (
  `milestoneListID` bigint(20) NOT NULL AUTO_INCREMENT,
  `milestoneBuilderID` bigint(20) NOT NULL,
  `projectMilestoneID` varchar(100) DEFAULT NULL,
  `projectMilestoneName` text DEFAULT NULL,
  `milestoneName` text NOT NULL,
  `milestoneNotes` text NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`milestoneListID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_milestone_list_tbl`
--

LOCK TABLES `pms_milestone_list_tbl` WRITE;
/*!40000 ALTER TABLE `pms_milestone_list_tbl` DISABLE KEYS */;
INSERT INTO `pms_milestone_list_tbl` VALUES (1,1,'1','User Acceptance Testing','','test',1,1,'2021-06-16 05:58:16','2021-06-16 05:58:16'),(2,1,'5','Software Development','','test 2',1,1,'2021-06-16 05:58:16','2021-06-16 05:58:16'),(3,1,'2','Phase Sign-off and Project Status','','test 3',1,1,'2021-06-16 05:58:16','2021-06-16 05:58:16');
/*!40000 ALTER TABLE `pms_milestone_list_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_personnel_requisition_tbl`
--

DROP TABLE IF EXISTS `pms_personnel_requisition_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_personnel_requisition_tbl` (
  `requisitionID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseRequisitionID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `requisitionStatus` varchar(255) NOT NULL,
  `requisitionRemarks` longtext DEFAULT NULL,
  `departmentID` bigint(20) DEFAULT NULL,
  `designationID` bigint(20) DEFAULT NULL,
  `salaryPackage` decimal(10,2) DEFAULT NULL,
  `personnelReportByID` bigint(20) DEFAULT NULL,
  `radioGroup1` int(50) DEFAULT NULL,
  `radioGroup2` int(50) DEFAULT NULL,
  `personnelOption` int(11) DEFAULT NULL,
  `personnelReplacement` int(50) DEFAULT NULL,
  `personnelDuration` varchar(255) DEFAULT NULL,
  `personnelOthers` varchar(255) DEFAULT NULL,
  `personnelQualification` longtext DEFAULT NULL,
  `personnelStatement` longtext DEFAULT NULL,
  `personnelDescription` longtext NOT NULL,
  `personnelDateNeeded` date DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `submittedAt` timestamp(1) NOT NULL DEFAULT current_timestamp(1),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`requisitionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_personnel_requisition_tbl`
--

LOCK TABLES `pms_personnel_requisition_tbl` WRITE;
/*!40000 ALTER TABLE `pms_personnel_requisition_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `pms_personnel_requisition_tbl` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_project_list_tbl`
--

LOCK TABLES `pms_project_list_tbl` WRITE;
/*!40000 ALTER TABLE `pms_project_list_tbl` DISABLE KEYS */;
INSERT INTO `pms_project_list_tbl` VALUES (1,'PRJ-21-00001','BlackBox - Enterprise Resource Planning System','Official Enterprise Resource Planning System of BlackBox.',1,'2021-02-23','2021-05-31',4,3,2,'4|5|6|7',1,1,0,1,'2021-04-15 02:45:49','2021-05-28 01:59:15'),(2,'PRJ-21-00002','BlackBox POS and Inventory System','Project for Inventory and POS ',1,'2021-04-29','2021-04-29',2,6,4,'1|2|3|7',1,1,0,1,'2021-04-21 05:12:03','2021-04-26 01:42:49'),(3,'PRJ-21-00003','TACs (Tax and Accounting System)','Tax and Accounting System under BlackBox. The system features recording and adjusting of transaction',2,'2020-06-02','2020-06-02',4,20,5,'1|2|3|4|6|19|22',2,1,0,1,'2021-05-14 06:10:29','2021-05-14 06:15:33'),(4,'PRJ-21-00004','Hotel Mercante Hotel Management System ','The project that involves the new and automated process of the newly created Hotel Mercante in Vigan',2,'2020-10-01','2021-02-28',5,3,4,'2|9|20',1,1,0,1,'2021-05-18 06:47:08','2021-05-18 07:02:25');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_project_milestone_tbl`
--

LOCK TABLES `pms_project_milestone_tbl` WRITE;
/*!40000 ALTER TABLE `pms_project_milestone_tbl` DISABLE KEYS */;
INSERT INTO `pms_project_milestone_tbl` VALUES (1,'MIL-21-00001','User Acceptance Testing','Present developed system to users for further testing and feedbacks inclusive in the project\'s scope and limitation',1,0,0,'2021-04-15 02:27:44','2021-04-15 02:27:44'),(2,'MIL-21-00002','Phase Sign-off and Project Status','Official closing milestone for the specific phase and project status report',1,0,0,'2021-04-15 02:29:57','2021-04-15 02:29:57'),(3,'MIL-21-00003','Training','Provide training of a specific software or hardware to the client\'s duly authorized representatives',1,0,0,'2021-04-15 02:31:16','2021-04-15 02:31:16'),(4,'MIL-21-00004','Go-Live','Official deployment of the software or hardware to production environment, engaging it to the client\'s day to day transactions.',0,0,1,'2021-04-15 02:33:05','2021-04-21 03:18:42'),(5,'MIL-21-00005','Software Development','Software Development is the process of defining, designing, testing, and implementing a new software application or program.',1,0,1,'2021-04-21 03:20:18','2021-04-21 03:20:29');
/*!40000 ALTER TABLE `pms_project_milestone_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_timeline_builder_tbl`
--

DROP TABLE IF EXISTS `pms_timeline_builder_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_timeline_builder_tbl` (
  `timelineBuilderID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseTimelineBuilderID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `projectID` bigint(20) DEFAULT NULL,
  `clientID` bigint(20) DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `timelineBuilderStatus` int(11) NOT NULL,
  `timelineBuilderReason` text DEFAULT NULL,
  `timelineBuilderRemarks` text DEFAULT NULL,
  `timelineStartDate` date NOT NULL,
  `timelineEndDate` date NOT NULL,
  `timelinePriorityLevel` int(2) NOT NULL,
  `timelineIssued` int(2) NOT NULL,
  `timelineProjectManager` bigint(20) NOT NULL,
  `timelineTeamMember` text DEFAULT NULL,
  `timelineTeamLeader` bigint(20) NOT NULL,
  `timelineProposedBudget` decimal(20,2) NOT NULL,
  `timelineAllocatedBudget` decimal(20,2) DEFAULT NULL,
  `allocatedBudgetBy` bigint(21) DEFAULT NULL,
  `timelineBudgetStatus` int(2) NOT NULL,
  `timelineManagementBy` bigint(21) DEFAULT NULL,
  `timelineManagementStatus` int(11) DEFAULT 1,
  `timelineDesign` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`timelineBuilderID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_timeline_builder_tbl`
--

LOCK TABLES `pms_timeline_builder_tbl` WRITE;
/*!40000 ALTER TABLE `pms_timeline_builder_tbl` DISABLE KEYS */;
INSERT INTO `pms_timeline_builder_tbl` VALUES (1,NULL,1,1,2,'1','2','2021-06-16 13:59:47',2,'',NULL,'2021-06-07','2021-06-06',3,0,1,'1|3|4',1,999999.00,500000.00,1,1,2,2,NULL,'2021-06-16 05:59:47',1,1,'2021-06-16 05:59:47','2021-06-18 03:09:12'),(2,NULL,1,1,2,'1','2','2021-06-16 14:01:26',2,'',NULL,'0000-00-00','2021-06-16',2,1,4,'4|5',2,5000.00,5000.00,1,1,1,0,NULL,'2021-06-16 06:01:26',1,1,'2021-06-16 06:01:26','2021-06-18 03:10:23');
/*!40000 ALTER TABLE `pms_timeline_builder_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_timeline_management_tbl`
--

DROP TABLE IF EXISTS `pms_timeline_management_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_timeline_management_tbl` (
  `timelineManagementID` bigint(21) NOT NULL AUTO_INCREMENT,
  `timelineBuilderID` bigint(21) NOT NULL,
  `taskID` bigint(21) NOT NULL,
  `projectMilestoneID` bigint(21) NOT NULL,
  `manHours` decimal(15,2) NOT NULL DEFAULT 0.00,
  `assignedEmployee` varchar(100) DEFAULT NULL,
  `createdBy` bigint(21) NOT NULL,
  `updatedBy` bigint(21) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`timelineManagementID`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_timeline_management_tbl`
--

LOCK TABLES `pms_timeline_management_tbl` WRITE;
/*!40000 ALTER TABLE `pms_timeline_management_tbl` DISABLE KEYS */;
INSERT INTO `pms_timeline_management_tbl` VALUES (73,1,1,1,1000.00,'1|3',2,2,'2021-06-18 03:09:12','2021-06-18 03:09:12'),(74,1,1,5,900000.00,'4',2,2,'2021-06-18 03:09:12','2021-06-18 03:09:12'),(75,1,1,2,99000.00,'4',2,2,'2021-06-18 03:09:12','2021-06-18 03:09:12'),(76,1,2,1,1000.00,'1|4',2,2,'2021-06-18 03:09:12','2021-06-18 03:09:12'),(77,1,2,5,4000.00,'3',2,2,'2021-06-18 03:09:12','2021-06-18 03:09:12'),(78,1,2,2,0.00,'',2,2,'2021-06-18 03:09:12','2021-06-18 03:09:12'),(85,2,3,1,1.00,'4|5',1,1,'2021-06-18 03:10:46','2021-06-18 03:10:46'),(86,2,3,5,9.00,'5',1,1,'2021-06-18 03:10:46','2021-06-18 03:10:46'),(87,2,3,2,0.00,'',1,1,'2021-06-18 03:10:46','2021-06-18 03:10:46'),(88,2,4,1,2.00,'5',1,1,'2021-06-18 03:10:46','2021-06-18 03:10:46'),(89,2,4,5,500000.00,'',1,1,'2021-06-18 03:10:46','2021-06-18 03:10:46'),(90,2,4,2,0.00,'4',1,1,'2021-06-18 03:10:46','2021-06-18 03:10:46');
/*!40000 ALTER TABLE `pms_timeline_management_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_timeline_task_list_tbl`
--

DROP TABLE IF EXISTS `pms_timeline_task_list_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_timeline_task_list_tbl` (
  `taskID` bigint(20) NOT NULL AUTO_INCREMENT,
  `timelineBuilderID` bigint(20) NOT NULL,
  `milestoneBuilderID` bigint(20) NOT NULL,
  `milestoneListID` bigint(20) NOT NULL,
  `taskName` text NOT NULL,
  `allottedHours` decimal(10,2) DEFAULT NULL,
  `taskStartDate` date NOT NULL,
  `taskEndDate` date NOT NULL,
  `taskRemarks` text NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`taskID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_timeline_task_list_tbl`
--

LOCK TABLES `pms_timeline_task_list_tbl` WRITE;
/*!40000 ALTER TABLE `pms_timeline_task_list_tbl` DISABLE KEYS */;
INSERT INTO `pms_timeline_task_list_tbl` VALUES (1,1,1,0,'Task 1',1000000.00,'2021-06-07','2021-06-25','re',1,1,'2021-06-16 05:59:59','2021-06-16 05:59:59'),(2,1,1,0,'Tesk 2',5000.00,'2021-06-06','2021-06-06','re 2',1,1,'2021-06-16 05:59:59','2021-06-16 05:59:59'),(3,2,1,0,'test',10.00,'2021-06-16','2021-06-16','res',1,1,'2021-06-16 06:01:28','2021-06-16 06:01:28'),(4,2,1,0,'test 2',2.00,'2021-06-16','2021-06-16','re',1,1,'2021-06-16 06:01:28','2021-06-18 02:20:27');
/*!40000 ALTER TABLE `pms_timeline_task_list_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'erpdb'
--

--
-- Dumping routines for database 'erpdb'
--
/*!50003 DROP PROCEDURE IF EXISTS `proc_update_bid_po_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_update_bid_po_items`(IN iBidRecapID BIGINT(21), IN iInventoryVendorID BIGINT(21), IN iCategoryType VARCHAR(100), IN documentStatus INT(11))
BEGIN
	DECLARE itemStatus INT(11) DEFAULT 0;
    DECLARE primaryKey BIGINT(21);
    
    IF (documentStatus <> 3 AND documentStatus <> 4) THEN
		SET itemStatus = 1;
    ELSE 
		SET itemStatus = 0;
    END IF;

	IF (iBidRecapID <> 0 AND iInventoryVendorID <> 0 AND iCategoryType <> "") THEN
		SELECT bidPoID INTO primaryKey FROM ims_bid_po_tbl WHERE bidRecapID = iBidRecapID AND inventoryVendorID = iInventoryVendorID AND categoryType = iCategoryType;
		UPDATE ims_bid_po_tbl SET bidPoStatus = itemStatus WHERE bidPoID = primaryKey;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-18 15:34:37
