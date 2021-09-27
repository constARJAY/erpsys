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
INSERT INTO `fms_bank_tbl` VALUES (1,'BNK-21-00001','BDO','0000-0000-000',1,'2021-04-14',1,1,'2021-04-14 06:05:32','2021-04-22 00:24:24'),(2,'BNK-21-00002','UCPB','00-0000-000-0',1,'2021-04-14',1,1,'2021-04-14 06:06:35','2021-04-22 00:25:11'),(3,'BNK-21-00003','BPI','000-00-000-0',1,'2021-04-14',1,1,'2021-04-14 06:07:03','2021-04-22 00:25:24'),(4,'BNK-21-00004','RCBC','0000-000-00',1,'2021-04-14',1,1,'2021-04-14 06:07:30','2021-04-22 00:25:37'),(5,'BNK-21-00005','SECURITY BANK	','0000-000-000',1,'2021-04-14',1,1,'2021-04-14 06:31:53','2021-04-22 00:25:48'),(6,'BNK-21-00006','LBP','0000-0000-0000',1,'2021-04-21',1,1,'2021-04-21 02:27:57','0000-00-00 00:00:00'),(7,'BNK-21-00007','PNB','0000 0000 0000',0,'2021-04-28',1,1,'2021-04-28 07:05:38','2021-05-26 08:09:59');
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
  `activity` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` decimal(15,2) DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `vatType` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vatAmount` decimal(15,2) DEFAULT NULL,
  `totalAmount` decimal(15,2) DEFAULT NULL,
  `grandTotalAmount` decimal(15,2) DEFAULT NULL,
  `pendingAmount` decimal(15,2) DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`billingItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_billing_items_tbl`
--

LOCK TABLES `fms_billing_items_tbl` WRITE;
/*!40000 ALTER TABLE `fms_billing_items_tbl` DISABLE KEYS */;
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
  `billingReason` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientName` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientAddress` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billingComment` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_billing_tbl`
--

LOCK TABLES `fms_billing_tbl` WRITE;
/*!40000 ALTER TABLE `fms_billing_tbl` DISABLE KEYS */;
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
  `accountCode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountDescription` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountLevel` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ledgerClassificationID` bigint(20) NOT NULL,
  `accountGrouping` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `financialStatement` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountStatus` int(50) NOT NULL,
  `accountBudgetSource` int(50) NOT NULL,
  `accountDatecreated` date NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`chartOfAccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_chart_of_accounts_tbl`
--

LOCK TABLES `fms_chart_of_accounts_tbl` WRITE;
/*!40000 ALTER TABLE `fms_chart_of_accounts_tbl` DISABLE KEYS */;
INSERT INTO `fms_chart_of_accounts_tbl` VALUES (1,0,'1-1001','Cash on hand','The total amount of any accessible cash. \n','Cash',1,'Current Asset','Asset',1,1,'2021-04-14',1,1,'2021-04-13 06:18:28','2021-06-15 11:13:43'),(2,0,'1-1002','Petty Cash Fund','Small amount of cash kept on hand to pay for minor expenses, such as office supplies or reimbursements.\n','Petty Cash Fund',1,'Current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 06:20:26','0000-00-00 00:00:00'),(3,1,'1-1003','Cash in Bank - BDO','The sum of all coins, currency and other unrestricted liquid funds that have been placed on deposit with a financial institution. \n','Cash in Bank',1,'Current Asset','Asset',1,1,'2021-04-14',1,1,'2021-04-13 06:21:17','2021-06-15 08:04:56'),(4,2,'1-1004','Cash in Bank - UCPB','The sum of all coins, currency and other unrestricted liquid funds that have been placed on deposit with a financial institution. \n','Cash in Bank',1,'Current Asset','Asset',1,1,'2021-04-14',1,1,'2021-04-13 06:21:58','2021-06-15 09:01:27'),(5,3,'1-1005','Cash in Bank - BPI','The sum of all coins, currency and other unrestricted liquid funds that have been placed on deposit with a financial institution. \n','Cash in Bank',1,'Current Asset','Asset',1,1,'2021-04-14',1,1,'2021-04-13 06:22:37','2021-06-15 09:01:32'),(6,4,'1-1006','Cash in Bank - RCBC','The sum of all coins, currency and other unrestricted liquid funds that have been placed on deposit with a financial institution. \n','Cash in Bank',1,'Current Asset','Asset',1,1,'2021-04-14',1,1,'2021-04-13 06:33:07','2021-06-15 09:01:38'),(7,5,'1-1007','Cash in Bank - SECURITY BANK','The sum of all coins, currency and other unrestricted liquid funds that have been placed on deposit with a financial institution. \n','Cash in Bank',1,'Current Asset','Asset',1,1,'2021-04-14',1,1,'2021-04-13 06:35:01','2021-06-15 09:01:42'),(8,0,'1-2001','Accounts Receivable','The balance of money due to a firm for goods or services delivered or used but not yet paid for by customers. A\n','Accounts Receivable',2,'Current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 06:36:37','0000-00-00 00:00:00'),(9,0,'1-3001','Raw Materials Inventory','The total cost of all component parts currently in stock that have not yet been used in work-in-process or finished goods production.\n','Raw Materials Inventory',3,'Current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 06:38:34','2021-04-13 07:22:01'),(10,0,'1-3002','Work-in-Progress Inventory','Production and supply-chain management term describing partially finished goods awaiting completion. \n','Work-in-Progress Inventory',3,'Current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 06:40:32','2021-04-13 07:22:42'),(11,0,'1-3003','Finished Goods Inventory','Goods that have been completed by the manufacturing process, or purchased in a completed form, but which have not yet been sold to customers.\n','Finished Goods Inventory',3,'Current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 06:41:36','2021-04-13 07:24:12'),(12,0,'1-4001','Advances To Employee-Salary',' Temporary loan by a company to an employee. \n','Advances To Employee',4,'Current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 06:43:45','2021-04-13 07:16:37'),(13,0,'1-4002','Advances To Partners','Means loans or advances, if any, made by a Partner to the Partnership from time to time pursuant to Section 3.01(b) hereof. Sample 1 Sample 2 Based on 2 documents Save\n','Advances To Partners',5,'Non-current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 06:45:09','0000-00-00 00:00:00'),(14,0,'1-4003','Advances To Others (company)','Means any advances or open accounts owing by the Borrower or any Subsidiary of the Borrower to any Grantor.\n','Advances To Others (company)',4,'Current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 06:46:42','2021-04-13 07:25:55'),(15,0,'1-4004','Input VAT','The value added tax added to the price when you purchase goods or services that are liable to VAT. \n','Input VAT',4,'Current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 06:47:31','0000-00-00 00:00:00'),(16,0,'1-4005','Creditable Withholding Tax','The tax which is withheld by the buyer/withholding agent from his payment to the seller for the sale of the seller\'s ordinary asset/services, and which tax is creditable against the income tax payable of the seller.\n','Creditable Withholding Tax',4,'Current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 06:49:12','2021-04-13 07:26:33'),(17,0,'1-5001','Computer Equipment','Means all computers, software or other equipment that includes computing technology or embedded logic such as microchips and sensors whether owned or leased.\n','Computer Equipment',6,'Non-current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 07:01:20','0000-00-00 00:00:00'),(18,0,'1-5002','Accumulated Depreciation - Computer Equipment','The total amount an asset has been depreciated up until a single point.\n','Accumulated Depreciation',6,'Non-current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 07:05:39','2021-04-13 07:28:23'),(19,0,'1-5003','Office Equipment','A long-term asset account reported on the balance sheet under the heading of property, plant, and equipment. Included in this account would be copiers, computers, printers, fax machines, etc.\n','Office Equipment',6,'Non-current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 07:06:29','0000-00-00 00:00:00'),(20,0,'1-5004','Accumulated Depreciation - Office Equipment','The total amount an asset has been depreciated up until a single point.\n','Accumulated Depreciation',6,'Non-current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 07:11:55','2021-04-13 07:29:14'),(21,0,'1-5005','Leasehold Improvements','Any changes made to a rental property in order to customize it for the particular needs of a tenant.\n','Leasehold Improvements',6,'Non-current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 07:21:05','0000-00-00 00:00:00'),(22,0,'1-5006','Accumulated Depreciation - Leasehold Improvements','The total amount an asset has been depreciated up until a single point.\n','Accumulated Depreciation',6,'Non-current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 07:39:58','0000-00-00 00:00:00'),(23,0,'1-5007','Furnitures & Fixture','Refers to movable furniture, fixtures, or other equipment that have no permanent connection to the structure of a building.\n','Furnitures & Fixture',6,'Non-current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 07:41:19','0000-00-00 00:00:00'),(24,0,'1-5008','Accumulated Depreciation - Furniture & Fixtures','The total amount an asset has been depreciated up until a single point.\n','Accumulated Depreciation',6,'Non-current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 07:42:27','0000-00-00 00:00:00'),(25,0,'1-5009','Communication Equipment','Facility consisting of the physical plants and equipment for disseminating information. \n','Communication Equipment',6,'Non-current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 07:43:34','0000-00-00 00:00:00'),(26,0,'1-5010','Accumulated Depreciation - Communication Equipment','The total amount an asset has been depreciated up until a single point.\n','Accumulated Depreciation',6,'Non-current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 07:45:20','0000-00-00 00:00:00'),(27,0,'1-5013','Vehicles','A long-term asset account that reports a company\'s cost of automobiles, trucks, etc.\n','Vehicles',6,'Non-current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 07:48:27','0000-00-00 00:00:00'),(28,0,'1-5014','Accumulated Depreciation - Vehicles','The total amount an asset has been depreciated up until a single point.\n','Accumulated Depreciation',6,'Non-current Asset','Asset',1,0,'2021-04-14',1,1,'2021-04-13 07:49:34','0000-00-00 00:00:00'),(29,0,'1-6001','Accounts Payable','An account within the general ledger that represents a company\'s obligation to pay off a short-term debt to its creditors or suppliers.\n','Accounts Payable',7,'Current Liability','Liability',1,0,'2021-04-14',1,1,'2021-04-13 07:50:33','0000-00-00 00:00:00'),(30,0,'1-6002','Salaries Payable','A liability account that contains the amounts of any salaries owed to employees, which have not yet been paid to them.\n','Salaries Payable',8,'Current Liability','Liability',1,0,'2021-04-14',1,1,'2021-04-13 07:51:44','0000-00-00 00:00:00'),(31,0,'1-6003','13th Month Payable','A monetary benefit based of an employee\'s basic salary. \n','13th Month Payable',8,'Current Liability','Liability',1,0,'2021-04-14',1,1,'2021-04-13 07:52:39','0000-00-00 00:00:00'),(32,0,'1-6004','Provident Fund Payable','Another name for pension fund. Its purpose is to provide employees with lump sum payments at the time of exit from their place of employment.\n','Provident Fund Payable',8,'Current Liability','Liability',1,0,'2021-04-14',1,1,'2021-04-13 07:53:44','0000-00-00 00:00:00'),(33,0,'1-7001','Witholding Tax - Expanded','A kind of Withholding Tax imposed on income payments and is creditable against the income tax due of the payee for the taxable quarter/year in which the income was earned.\n','Witholding Tax',9,'Current Liability','Liability',1,0,'2021-04-14',1,1,'2021-04-13 07:55:29','0000-00-00 00:00:00'),(34,0,'1-7002','Witholding Tax - Compensation','An amount that an employer withholds from employees\' wages and pays directly to the government. \n','Witholding Tax',9,'Current Liability','Liability',1,0,'2021-04-14',1,1,'2021-04-13 07:57:58','0000-00-00 00:00:00'),(35,0,'1-7003','SSS Premium Payable','All actual remuneration for employment, including the mandated cost of living allowance. \n','SSS Premium Payable',9,'Current Liability','Liability',1,0,'2021-04-14',1,1,'2021-04-13 08:01:16','0000-00-00 00:00:00'),(36,0,'1-7004','HDMF Premium Payable','Basic Monthly Salary plus mandated cost of living allowance (maximum of Php 5,000)\n','HDMF Premium Payable',9,'Current Liability','Liability',1,0,'2021-04-14',1,1,'2021-04-13 08:02:01','0000-00-00 00:00:00'),(37,0,'1-7005','PHIC Premium Payable','Basic Monthly Compensation regularly paid for service rendered by the employee\n','PHIC Premium Payable',9,'Current Liability','Liability',1,0,'2021-04-14',1,1,'2021-04-13 08:02:50','0000-00-00 00:00:00'),(38,0,'1-7006','Output VAT','The value added tax you charge on your own sales of goods and services both to other businesses and to ordinary consumers.\n','Output VAT',9,'Current Liability','Liability',1,0,'2021-04-14',1,1,'2021-04-13 08:03:56','0000-00-00 00:00:00'),(39,0,'1-7007','SSS Loan Payable','A loan is an arrangement under which the owner of property allows another party the use of it (usually cash) in exchange for an interest payment and the return of the property at the end of the lending arrangement.\n','SSS Loan Payable',9,'Current Liability','Liability',1,0,'2021-04-14',1,1,'2021-04-13 08:04:57','0000-00-00 00:00:00'),(40,0,'1-7008','HDMF Loan Payable','A loan is an arrangement under which the owner of property allows another party the use of it (usually cash) in exchange for an interest payment and the return of the property at the end of the lending arrangement.\n','HDMF Loan Payable',9,'Current Liability','Liability',1,0,'2021-04-14',1,1,'2021-04-13 08:06:01','0000-00-00 00:00:00'),(41,0,'1-8001','Advances from Partners','Means loans or advances, if any, made by a Partner to the Partnership from time to time\n','Advances from Partners',10,'Non-current Liability','Liability',1,0,'2021-04-14',1,1,'2021-04-13 08:07:50','0000-00-00 00:00:00'),(42,0,'1-9001','Capital','Such as funds held in deposit accounts and/or funds obtained from special financing sources. \n','Capital',11,'Equity','Equity',1,0,'2021-04-14',1,1,'2021-04-13 08:08:46','0000-00-00 00:00:00'),(43,0,'1-9002','Investment Withdrawal','Involves removing funds from a bank account, savings plan, pension, or trust. \n','Investment Withdrawal',12,'Equity','Equity',1,0,'2021-04-14',1,1,'2021-04-13 08:11:44','0000-00-00 00:00:00'),(44,0,'2-1001','Salaries and Wages-Basic','The remuneration paid or payable to employees for work performed on behalf of an employer or services provided.\n','Salaries and Wages-Basic',13,'Cost of Sales','Cost of Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:13:02','0000-00-00 00:00:00'),(45,0,'2-1002','Allowance','Amount of money given or allotted usually at regular intervals for a specific purpose.\n','Allowance',13,'Cost of Sales','Cost of Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:13:53','0000-00-00 00:00:00'),(46,0,'2-1003','SSS Expense','The money spent on SSS.\n','SSS Expense',13,'Cost of Sales','Cost of Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:14:34','0000-00-00 00:00:00'),(47,0,'2-1004','PHIC Expense','The money spent on PHIC.\n','PHIC Expense',13,'Cost of Sales','Cost of Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:15:13','0000-00-00 00:00:00'),(48,0,'2-1005','HDMF Expense','The money spent on HDMF.\n','HDMF Expense',13,'Cost of Sales','Cost of Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:19:45','0000-00-00 00:00:00'),(49,0,'2-1006','13th Month Expense','The money spent on 13th Month.\n','13th Month Expense',13,'Cost of Sales','Cost of Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:20:42','0000-00-00 00:00:00'),(50,0,'2-1007','Mid-Year Bonuses','The money spent on Mid-Year Bonuses.\n','Mid-Year Bonuses',13,'Cost of Sales','Cost of Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:21:31','0000-00-00 00:00:00'),(51,0,'2-1008','Christmas Expense','The money spent on Christmas.\n','Christmas Expense',13,'Cost of Sales','Cost of Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:22:42','0000-00-00 00:00:00'),(52,0,'2-2001','Communication for Support','The actual cost of postage, long distance telephone, cellular phone, and teletype expense incurred in the direct performance of the Services.\n','Communication',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:24:00','0000-00-00 00:00:00'),(53,0,'2-2002','Communication for Operations','The actual cost of postage, long distance telephone, cellular phone, and teletype expense incurred in the direct performance of the Services.\n','Communication',13,'Cost of Sales','Cost of Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:24:52','0000-00-00 00:00:00'),(54,0,'2-2003','Communication for Partners','The actual cost of postage, long distance telephone, cellular phone, and teletype expense incurred in the direct performance of the Services.\n','Communication',13,'Cost of Sales','Cost of Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:25:48','0000-00-00 00:00:00'),(55,0,'2-3001','Electricity-Meralco','The cost incurred by using utilities such as electricity, water, waste disposal, heating, and sewage. \n','Utilities',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:26:45','0000-00-00 00:00:00'),(56,0,'2-3002','Electricity-PLDT','The cost incurred by using utilities such as electricity, water, waste disposal, heating, and sewage. \n','Utilities',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:27:37','0000-00-00 00:00:00'),(57,0,'2-3003','Electricity-Fiber','The cost incurred by using utilities such as electricity, water, waste disposal, heating, and sewage. \n','Utilities',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:28:17','0000-00-00 00:00:00'),(58,0,'2-3004','Subscription Fee','Means the fee actually paid by a Subscriber for the applicable Mobile Content.\n','Subcription Fee',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:28:56','0000-00-00 00:00:00'),(59,0,'2-3005','Water (gal)','The cost incurred by using utilities such as electricity, water, waste disposal, heating, and sewage. \n','Pantry Supplies',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:29:36','0000-00-00 00:00:00'),(60,0,'2-3006','Rental-Association Dues','Amount of money that must be paid monthly by owners of certain types of residential properties, and HOAs collect these fees to assist with maintaining and improving properties in the association.\n','Association Dues',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:30:26','0000-00-00 00:00:00'),(61,0,'2-3007','Rental-Parking Dues','Amount of money that must be paid monthly by owners of certain types of residential properties, and HOAs collect these fees to assist with maintaining and improving properties in the association.\n','Parking Dues',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:31:11','0000-00-00 00:00:00'),(62,0,'2-4001','Fuel and Oil for Messenger','The money spent on Fuel and Oil of Messengers.\n','Fuel and Oil',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:32:07','0000-00-00 00:00:00'),(63,0,'2-4002','Fuel and Oil for Partners','The money spent on Fuel and Oil of Partners.\n','Fuel and Oil',13,'Cost of Sales','Cost of Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:33:29','0000-00-00 00:00:00'),(64,0,'2-5001','Transportation and Travel for Support','Refers to specific costs incurred by an employee or self-employed taxpayer who travels for business purposes. \n','Transportation',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:34:16','0000-00-00 00:00:00'),(65,0,'2-5002','Transportation and Travel for Operations','Refers to specific costs incurred by an employee or self-employed taxpayer who travels for business purposes. \n','Transportation',13,'Cost of Sales','Cost of Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:34:59','0000-00-00 00:00:00'),(66,0,'2-5003','Transportation and Travel for Partners','Refers to specific costs incurred by an employee or self-employed taxpayer who travels for business purposes. \n','Transportation',13,'Cost of Sales','Cost of Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:36:05','0000-00-00 00:00:00'),(67,0,'2-6001','Repairs and Maintenance for Messenger','Expenses a business incurs to restore an asset to a previous operating condition or to keep an asset in its current operating condition.\n','Repairs and Maintenance',13,'Cost of Sales','Cost of Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:37:26','0000-00-00 00:00:00'),(68,0,'2-6002','Repairs and Maintenance for Partners','Expenses a business incurs to restore an asset to a previous operating condition or to keep an asset in its current operating condition.\n','Repairs and Maintenance',13,'Cost of Sales','Cost of Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:38:33','0000-00-00 00:00:00'),(69,0,'2-7001','Representation Expense','These expenses are charges incurred in representing the company before customers or suppliers. \n','Representation Expense',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:40:42','0000-00-00 00:00:00'),(70,0,'2-7003','Taxes and Licenses','The tax expense is what an entity has determined is owed in taxes based on standard business accounting rules. \n','Taxes and Licenses',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:41:21','0000-00-00 00:00:00'),(71,0,'2-7004','Office Supplies','The amount of administrative supplies charged to expense in a reporting period.\n','Office Supplies',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:42:05','0000-00-00 00:00:00'),(72,0,'2-7005','Pantry Supplies','Refers to the cost of consumables used during a reporting period. \n','Pantry Supplies',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:42:49','0000-00-00 00:00:00'),(73,0,'2-7006','Housekeeping and Cleaning Supplies','The cost required for housekeeping and cleaning supplies.\n','Cleaning Supplies Expense',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:43:43','0000-00-00 00:00:00'),(74,0,'2-7007','Recruitment Expense','The total amount spent to recruit a hire starting from the job posting to joining the organization.\n','Recruitment Expense',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:45:09','0000-00-00 00:00:00'),(75,0,'2-7008','Trainings and Seminars','The cost incurred in trainings and seminars.\n','Training and Seminar',13,'Cost of Sales','Cost of Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:46:14','0000-00-00 00:00:00'),(76,0,'2-7009','Advertising and Marketing Expense','Refers to cost incurred in promoting a business, such as publications in periodicals (newspapers and magazines), television, radio, the internet, billboards, fliers, and others.\n','Advertising',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:46:57','0000-00-00 00:00:00'),(77,0,'2-7010','Professional Fees','Usually an income account used by a professional firm in recording its revenues.\n','Professional Fees',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:47:56','0000-00-00 00:00:00'),(78,0,'2-7011','Insurance','The cost of insurance that has been incurred, has expired, or has been used up during the current accounting period for the nonmanufacturing functions of a business.\n','Insurance',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:48:35','0000-00-00 00:00:00'),(79,0,'2-7012','Medicine','Any costs incurred in the prevention or treatment of injury or disease.\n','Medical Expense',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:49:18','0000-00-00 00:00:00'),(80,0,'2-7013','Miscellaneous','Refer to a general ledger account in which small, infrequent transaction amounts are recorded.\n','Miscellaneous',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:50:08','0000-00-00 00:00:00'),(81,0,'2-7014','Bank Charges','Covers all charges and fees made by a bank to their customers.\n','Bank Service Charge',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:50:57','0000-00-00 00:00:00'),(82,0,'2-7015','Notarial Fees','Includes all fees paid to attorneys, appraisers, notaries, and witnesses, in addition to court costs and legal document recording fees.\n','Legal',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:51:45','0000-00-00 00:00:00'),(83,0,'2-7016','Registered Mail','A mail service offered by postal services in many countries, which allows the sender proof of mailing via a mailing receipt and, upon request, electronic verification that an article was delivered or that a delivery attempt was made.\n','Postage',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:53:02','0000-00-00 00:00:00'),(84,0,'2-7017','Postage','Particular place on the floor of an exchange where transactions in stocks listed on the exchange occur.\n','Postage',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:53:45','0000-00-00 00:00:00'),(85,0,'2-7018','Donation','A gift for charity, humanitarian aid, or to benefit a cause. \n','Donation',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:54:23','0000-00-00 00:00:00'),(86,0,'2-7019','Printing & Photocopy','Purchases related to printing and copying.\n','Printing',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:55:01','0000-00-00 00:00:00'),(87,0,'2-7020','Other Expenses','Expenses that do not relate to a company\'s main business.\n','Other Expenses',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:55:34','0000-00-00 00:00:00'),(88,0,'2-8001','Employee Benefits','Payments employers make to employees that are beyond the scope of wages.\n','Employee Benefits',14,'G&A Expenses','G&A Expenses',1,0,'2021-04-14',1,1,'2021-04-13 08:56:09','0000-00-00 00:00:00'),(89,0,'2-9001','Retained Earnings','The amount of net income left over for the business after it has paid out dividends to its shareholders.\n','Retained Earnings',15,'Equity','Equity',1,0,'2021-04-14',1,1,'2021-04-13 08:57:06','0000-00-00 00:00:00'),(90,0,'2-9002','Service Revenue','Income a company receives for performing a requested activity.\n','Service Revenue',16,'Sales','Sales',1,0,'2021-04-14',1,1,'2021-04-13 08:57:52','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `fms_chart_of_accounts_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fms_check_voucher_details_tbl`
--

DROP TABLE IF EXISTS `fms_check_voucher_details_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fms_check_voucher_details_tbl` (
  `voucherDetailsID` bigint(20) NOT NULL AUTO_INCREMENT,
  `voucherID` bigint(20) NOT NULL,
  `paymentRequestID` bigint(20) NOT NULL,
  `accountCode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chartOfAccountID` bigint(20) DEFAULT NULL,
  `debit` decimal(10,2) NOT NULL,
  `credit` decimal(10,2) NOT NULL,
  `balance` decimal(10,2) NOT NULL,
  PRIMARY KEY (`voucherDetailsID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_check_voucher_details_tbl`
--

LOCK TABLES `fms_check_voucher_details_tbl` WRITE;
/*!40000 ALTER TABLE `fms_check_voucher_details_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `fms_check_voucher_details_tbl` ENABLE KEYS */;
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
  `voucherRemarks` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `paymentRequestID` bigint(20) NOT NULL,
  `pettyRepID` bigint(20) DEFAULT NULL,
  `purchaseOrderID` bigint(20) DEFAULT NULL,
  `chartOfAccountID` bigint(20) DEFAULT NULL,
  `voucherTinPayee` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voucherDescription` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voucherBudgetSource` int(50) DEFAULT NULL,
  `checkNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voucherAmount` decimal(10,2) DEFAULT NULL,
  `checkVoucherLiquidationStatus` int(50) NOT NULL,
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`voucherID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_check_voucher_tbl`
--

LOCK TABLES `fms_check_voucher_tbl` WRITE;
/*!40000 ALTER TABLE `fms_check_voucher_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `fms_check_voucher_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fms_client_fund_replenishment_tbl`
--

DROP TABLE IF EXISTS `fms_client_fund_replenishment_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fms_client_fund_replenishment_tbl` (
  `clientRepID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseClientRepID` bigint(20) DEFAULT NULL,
  `clientRepStatus` int(50) NOT NULL,
  `clientRepRemarks` longtext DEFAULT NULL,
  `clientRepReason` text NOT NULL,
  `clientRepTotalBalance` decimal(19,2) NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `requestorID` bigint(20) DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) DEFAULT NULL,
  `updatedBy` bigint(20) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`clientRepID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_client_fund_replenishment_tbl`
--

LOCK TABLES `fms_client_fund_replenishment_tbl` WRITE;
/*!40000 ALTER TABLE `fms_client_fund_replenishment_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `fms_client_fund_replenishment_tbl` ENABLE KEYS */;
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
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientFundRequestStatus` int(11) NOT NULL,
  `clientFundRequestRemarks` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`clientFundRequestID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_client_fund_request_tbl`
--

LOCK TABLES `fms_client_fund_request_tbl` WRITE;
/*!40000 ALTER TABLE `fms_client_fund_request_tbl` DISABLE KEYS */;
INSERT INTO `fms_client_fund_request_tbl` VALUES (1,NULL,400.00,1,1,0,'2021-06-24','1','2','2021-06-24 15:30:32',5,NULL,'2021-06-24 15:30:32',1,1,'2021-06-24 15:28:22','2021-06-24 07:40:37'),(2,NULL,1000.00,1,1,11,'2021-06-24','2|4|5','2|2|2','2021-06-25 09:08:25|2021-06-25 09:09:54|2021-06-25 09:11:46',5,NULL,'2021-06-24 15:45:50',1,1,'2021-06-24 15:38:45','2021-06-25 01:44:05'),(3,NULL,2000.00,1,3,51,'2021-06-24','2|4|5','2|2|3','2021-06-25 09:08:52|2021-06-25 09:09:32|2021-06-25 09:12:16',3,'revise','2021-06-25 08:54:18',1,5,'2021-06-24 15:40:23','2021-06-25 01:12:19'),(4,NULL,250.00,1,4,10,'2021-06-24','2|4|5','2|2|2','2021-06-25 09:08:40|2021-06-25 09:10:07|2021-06-25 09:12:36',5,NULL,'2021-06-24 15:53:23',1,1,'2021-06-24 15:53:23','2021-06-29 02:19:11'),(5,NULL,100.00,1,2,65,'2021-06-25','2|4|5','2|2|2','2021-06-25 09:08:03|2021-06-25 09:10:20|2021-06-25 09:11:16',2,NULL,'2021-06-25 09:07:00',1,5,'2021-06-25 09:07:00','2021-06-25 01:11:18'),(6,3,1500.00,1,3,51,'2021-06-24','2|4|5','2|2|2','2021-06-25 09:48:16|2021-06-25 10:18:57|2021-06-25 10:42:11',2,NULL,'2021-06-25 09:20:49',1,5,'2021-06-25 09:20:49','2021-06-25 02:42:14'),(7,NULL,500.00,1,1,27,'2021-06-25','2|4|5','2|2|2','2021-06-25 09:48:30|2021-06-25 10:19:08|2021-06-25 10:42:20',2,NULL,'2021-06-25 09:26:29',1,5,'2021-06-25 09:26:29','2021-06-25 02:42:22'),(8,NULL,400.00,1,0,19,'2021-06-25','2|4|5',NULL,NULL,1,NULL,'2021-06-25 09:40:11',1,1,'2021-06-25 09:32:06','2021-06-25 01:40:17'),(9,NULL,600.00,1,2,26,'2021-06-25','2|4|5','2|2|2','2021-06-28 15:39:25|2021-06-28 15:40:11|2021-06-28 15:40:53',2,NULL,'2021-06-28 15:38:16',1,5,'2021-06-25 09:32:41','2021-06-28 07:40:54'),(10,NULL,0.00,1,0,0,'2021-06-25',NULL,NULL,NULL,4,NULL,NULL,1,1,'2021-06-25 09:33:21','2021-06-25 01:33:50'),(11,NULL,200.00,1,1,27,'2021-06-25','2|4|5',NULL,NULL,1,NULL,'2021-06-25 10:50:56',1,1,'2021-06-25 10:50:56','2021-06-25 02:51:00'),(12,NULL,2000.00,1,3,88,'2021-06-25','2|4|5',NULL,NULL,1,NULL,'2021-06-25 11:06:12',1,1,'2021-06-25 11:06:12','2021-06-25 03:06:20'),(13,NULL,1000.00,1,2,14,'2021-06-28','2|4|5',NULL,NULL,1,NULL,'2021-06-28 08:34:39',1,1,'2021-06-28 08:34:39','2021-06-28 00:34:42'),(14,NULL,1000.00,1,2,51,'2021-06-29','2|4|5',NULL,NULL,1,NULL,'2021-06-29 07:34:51',1,1,'2021-06-29 07:34:51','2021-06-28 23:34:59'),(15,NULL,2000.00,1,3,45,'2021-06-29','2|4|5',NULL,NULL,1,NULL,'2021-06-29 07:49:03',1,1,'2021-06-29 07:49:03','2021-06-28 23:49:09'),(16,NULL,100.00,1,1,53,'2021-06-29','2|4|5',NULL,NULL,1,NULL,'2021-06-29 10:16:42',1,1,'2021-06-29 10:16:42','2021-06-29 02:16:47');
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
  `activity` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `checkNumber` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `checkDate` date DEFAULT NULL,
  `depositoryAccount` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `termPayment` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vatType` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vatAmount` decimal(15,2) DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`collectionItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  `clientCode` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientName` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientAddress` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientContactNumber` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `collectionComment` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `collectionPaymentMethod` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateFrom` date DEFAULT NULL,
  `dateTo` date DEFAULT NULL,
  `collectionSubtotal` decimal(15,2) DEFAULT NULL,
  `collectionVatAmount` decimal(15,2) DEFAULT NULL,
  `collectionGrandTotal` decimal(15,2) DEFAULT NULL,
  `collectionReason` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `collectionStatus` int(11) DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`collectionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` decimal(15,2) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `totalAmount` decimal(15,2) DEFAULT NULL,
  `files` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `liquidationID` bigint(20) DEFAULT NULL,
  `pettyRepID` bigint(20) DEFAULT NULL,
  `clientRepID` bigint(20) DEFAULT NULL,
  `clientID` bigint(20) DEFAULT NULL,
  `srfNumber` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `chartOfAccountID` bigint(20) DEFAULT NULL,
  `remark` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiptNumber` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  PRIMARY KEY (`financeRequestID`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_finance_request_details_tbl`
--

LOCK TABLES `fms_finance_request_details_tbl` WRITE;
/*!40000 ALTER TABLE `fms_finance_request_details_tbl` DISABLE KEYS */;
INSERT INTO `fms_finance_request_details_tbl` VALUES (1,NULL,1,NULL,'Purchasing rim of Bond paper',2.00,250.00,500.00,'01624504674.jpeg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(2,NULL,1,NULL,'Purchasing ballpens',2.00,50.00,100.00,'11624504674.jpeg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(3,NULL,1,NULL,'Purchasing pencil',2.00,200.00,400.00,'21624504674.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(4,NULL,2,NULL,'Christmass Party decoration',5.00,100.00,500.00,'01624505106.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(5,NULL,3,NULL,'motor parking rental for sir Mark',1.00,100.00,100.00,'01624510906.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(6,NULL,3,NULL,'motor parking rental for sir Uly',1.00,200.00,200.00,'11624510906.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(7,NULL,3,NULL,'motor parking rental for sir JJ',2.00,500.00,1000.00,'21624510906.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(8,NULL,4,NULL,'Purchasing biogesic',50.00,7.00,350.00,'01624511392.jpeg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(9,NULL,4,NULL,'Purchasing neozep',50.00,10.00,500.00,'11624511392.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(10,NULL,5,NULL,'BCGI Client Allowance',15.00,50.00,750.00,'01624511587.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(11,NULL,5,NULL,'GTC Client Allowance',15.00,50.00,750.00,'11624511587.jpeg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(13,NULL,7,NULL,'test',1.00,725.00,725.00,'01624515235.docx',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(14,NULL,NULL,NULL,'\n							BCGI Client Allowance\n					',15.00,50.00,NULL,NULL,1,NULL,NULL,2,'SRF-21-00001',NULL,'food allowance','OR-000001',1,1),(15,NULL,NULL,NULL,'\n							GTC Client Allowance\n					',15.00,50.00,NULL,NULL,1,NULL,NULL,3,'SRF-21-00002',NULL,'food allowance','OR-000002',1,1),(16,NULL,NULL,NULL,'\n							Purchasing biogesic\n					',50.00,7.00,NULL,NULL,2,NULL,NULL,0,'',NULL,'','OR-986754',1,1),(17,NULL,NULL,NULL,'\n							Purchasing neozep\n					',50.00,10.00,NULL,NULL,2,NULL,NULL,0,'',NULL,'','OR-214345',1,1),(18,NULL,NULL,NULL,'\n							motor parking rental for sir Mark\n					',1.00,100.00,NULL,NULL,3,NULL,NULL,NULL,'',NULL,'','',1,1),(19,NULL,NULL,NULL,'\n							motor parking rental for sir Uly\n					',1.00,200.00,NULL,NULL,3,NULL,NULL,NULL,'',NULL,'','',1,1),(20,NULL,NULL,NULL,'\n							motor parking rental for sir JJ\n					',2.00,500.00,NULL,NULL,3,NULL,NULL,NULL,'',NULL,'','',1,1),(22,1,NULL,NULL,'BCGI Client Allowance',2.00,200.00,400.00,'01624519835.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(25,2,NULL,NULL,'Test',2.00,500.00,1000.00,'01624520751.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(26,4,NULL,NULL,'test file',5.00,50.00,250.00,'01624521255.mp3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(27,NULL,NULL,NULL,'\n							Purchasing rim of Bond paper\n					',2.00,250.00,NULL,NULL,4,NULL,NULL,0,'',NULL,'','OR-000001',1,1),(28,NULL,NULL,NULL,'\n							Purchasing ballpens\n					',2.00,50.00,NULL,NULL,4,NULL,NULL,0,'',NULL,'','OR-000002',1,1),(29,NULL,NULL,NULL,'\n							Purchasing pencil\n					',2.00,200.00,NULL,NULL,4,NULL,NULL,0,'',NULL,'','OR-000003',1,1),(30,3,NULL,NULL,'BCGI Christmas party',5.00,400.00,0.00,'01624582464.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(31,3,NULL,NULL,'GTC Christmas party',5.00,400.00,2000.00,'11624582464.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(32,5,NULL,NULL,'Bus Fare',2.00,25.00,50.00,'01624583225.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(33,5,NULL,NULL,'Tricycle Fare',2.00,25.00,50.00,'11624583225.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(34,6,NULL,NULL,'BCGI Christmas party',5.00,100.00,500.00,'01624584055.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(35,6,NULL,NULL,'GTC Christmas party',5.00,100.00,500.00,'11624584055.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(36,6,NULL,NULL,'CMT Christmas party',5.00,100.00,500.00,'21624584055.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(37,7,NULL,NULL,'Car Wash',1.00,500.00,500.00,'01624584394.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(44,10,NULL,NULL,'',0.00,0.00,0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(45,8,NULL,NULL,'test',2.00,100.00,200.00,'01624585217.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(46,8,NULL,NULL,'for purchasing papers',2.00,100.00,200.00,'11624585217.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(48,11,NULL,NULL,'test',2.00,100.00,200.00,'01624589460.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(49,12,NULL,NULL,'Sir Arjay Cake',1.00,500.00,500.00,'01624590380.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(50,12,NULL,NULL,'Sir Charles Cake',1.00,500.00,500.00,'11624590380.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(51,12,NULL,NULL,'Sir Joseph Cake',1.00,500.00,500.00,'21624590380.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(52,12,NULL,NULL,'Sir Math Cake',1.00,500.00,500.00,'31624590380.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(53,NULL,8,NULL,'BCGI Client Allowance',1.00,1000.00,1000.00,'01624590657.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(54,NULL,9,NULL,'Purchasing Computer Equipment',5.00,100.00,500.00,'01624590823.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(55,NULL,10,NULL,'Load for contacting client',1.00,50.00,50.00,'01624600807.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(56,NULL,11,NULL,'deny revise testing',1.00,100.00,100.00,'01624601726.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,5),(58,NULL,12,NULL,'Load for contacting client',1.00,50.00,0.00,'01624601904.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(59,NULL,6,NULL,'Sir Arjay Cake',1.00,100.00,100.00,'01624602040.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(60,NULL,NULL,NULL,'\n							test\n					',1.00,725.00,NULL,NULL,5,NULL,NULL,NULL,'',NULL,'','OR-00001',1,1),(61,NULL,NULL,NULL,'\n							BCGI Client Allowance\n					',1.00,1000.00,NULL,NULL,6,NULL,NULL,0,'',NULL,'testing','0R-000001',1,1),(70,NULL,NULL,NULL,'\n							BCGI Client Allowance\n					',1.00,1000.00,NULL,NULL,8,NULL,NULL,2,'SRF-21-00001',NULL,'food allowance','OR-000001',1,1),(71,NULL,NULL,NULL,'\n							BCGI Client Allowance\n					',1.00,1000.00,NULL,NULL,8,NULL,NULL,2,'SRF-21-00001',NULL,'food allowance','OR-000001',1,1),(72,NULL,NULL,NULL,'\n							BCGI Client Allowance\n					',1.00,1000.00,NULL,NULL,8,NULL,NULL,2,'SRF-21-00001',NULL,'food allowance','OR-000001',1,1),(73,NULL,NULL,NULL,'\n							BCGI Client Allowance\n					',1.00,1000.00,NULL,NULL,8,NULL,NULL,3,'SRF-21-00002',NULL,'food allowance','OR-000002',1,1),(74,NULL,NULL,NULL,'\n							BCGI Client Allowance\n					',1.00,1000.00,NULL,NULL,8,NULL,NULL,3,'SRF-21-00002',NULL,'food allowance','OR-000002',1,1),(75,NULL,NULL,NULL,'\n							BCGI Client Allowance\n					',1.00,1000.00,NULL,NULL,8,NULL,NULL,3,'SRF-21-00002',NULL,'food allowance','OR-000002',1,1),(77,NULL,13,NULL,'Load for internet connection',1.00,50.00,50.00,'01624839773.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(78,13,NULL,NULL,'Testing',2.00,500.00,1000.00,'01624840482.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(79,NULL,14,NULL,'Load for Internet Connection for client presentation',1.00,100.00,100.00,'01624864058.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(80,NULL,NULL,NULL,'\n							Load for contacting client\n					',1.00,50.00,NULL,NULL,9,NULL,NULL,NULL,'',NULL,'','test',1,1),(81,9,NULL,NULL,'BCGI Client Allowance',2.00,200.00,400.00,'01624865899.docx',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(82,9,NULL,NULL,'Sir Arjay Cake',1.00,200.00,200.00,'11624865899.docx',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(83,NULL,15,NULL,'Purchasing chairs',3.00,100.00,300.00,'01624922192.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(84,14,NULL,NULL,'BCGI Christmas expense',2.00,500.00,1000.00,'01624923299.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(85,15,NULL,NULL,'Allowance for client presentation',2.00,1000.00,2000.00,'01624924149.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(86,NULL,NULL,NULL,'\n							test\n					',1.00,725.00,NULL,NULL,7,NULL,NULL,3,'SRF-21-000001',NULL,'testing','0R-00001',1,1),(88,NULL,NULL,NULL,'\n							Load for contacting client\n					',1.00,50.00,NULL,NULL,10,NULL,NULL,2,'SRF-21-00001',NULL,'test','',1,1),(89,NULL,NULL,NULL,'\n							BCGI Client Allowance\n					',1.00,1000.00,NULL,NULL,11,NULL,NULL,2,'SRF-21-00001',NULL,'food allowance','OR-000001',1,1),(90,NULL,NULL,NULL,'\n							BCGI Client Allowance\n					',1.00,1000.00,NULL,NULL,11,NULL,NULL,2,'SRF-21-00001',NULL,'food allowance','OR-000001',1,1),(91,NULL,NULL,NULL,'\n							BCGI Client Allowance\n					',1.00,1000.00,NULL,NULL,11,NULL,NULL,2,'SRF-21-00001',NULL,'food allowance','OR-000001',1,1),(92,NULL,NULL,NULL,'\n							BCGI Client Allowance\n					',1.00,1000.00,NULL,NULL,11,NULL,NULL,3,'SRF-21-00002',NULL,'food allowance','OR-000002',1,1),(93,NULL,NULL,NULL,'\n							BCGI Client Allowance\n					',1.00,1000.00,NULL,NULL,11,NULL,NULL,3,'SRF-21-00002',NULL,'food allowance','OR-000002',1,1),(94,NULL,NULL,NULL,'\n							BCGI Client Allowance\n					',1.00,1000.00,NULL,NULL,11,NULL,NULL,3,'SRF-21-00002',NULL,'food allowance','OR-000002',1,1),(95,NULL,16,NULL,'',0.00,0.00,0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(96,NULL,17,NULL,'BCGI Client Allowance',1.00,1000.00,1000.00,'01624930565.15',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(97,NULL,18,NULL,'',0.00,0.00,0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(98,16,NULL,NULL,'BCGI Client Allowance',1.00,100.00,100.00,'01624933007.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(99,NULL,19,NULL,'Purchasing computer equipment',2.00,500.00,1000.00,'01624933303.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(100,NULL,20,NULL,'Purchasing Tables',3.00,500.00,1500.00,'01624933360.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(101,NULL,21,NULL,'Load for presentation',5.00,100.00,500.00,'01624933440.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1);
/*!40000 ALTER TABLE `fms_finance_request_details_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fms_liquidation_tbl`
--

DROP TABLE IF EXISTS `fms_liquidation_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fms_liquidation_tbl` (
  `liquidationID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseLiquidationID` bigint(20) DEFAULT NULL,
  `pettyCashRequestID` bigint(15) DEFAULT NULL,
  `voucherID` int(50) DEFAULT NULL,
  `chartOfAccountID` bigint(255) NOT NULL,
  `liquidationReferenceNumber` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `liquidationAmount` decimal(15,2) DEFAULT NULL,
  `liquidationVatAmount` decimal(15,2) NOT NULL,
  `liquidationExpenses` decimal(15,2) DEFAULT NULL,
  `liquidationBudget` decimal(15,2) DEFAULT NULL,
  `liquidationExcessOrShortage` decimal(15,2) DEFAULT NULL,
  `liquidationDispositionofExcessOrShortage` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `liquidationDate` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `liquidationPurpose` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `liquidationStatus` int(11) NOT NULL,
  `liquidationRemarks` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`liquidationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_liquidation_tbl`
--

LOCK TABLES `fms_liquidation_tbl` WRITE;
/*!40000 ALTER TABLE `fms_liquidation_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `fms_liquidation_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fms_payment_request_tbl`
--

DROP TABLE IF EXISTS `fms_payment_request_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fms_payment_request_tbl` (
  `paymentRequestID` bigint(20) NOT NULL AUTO_INCREMENT,
  `revisePaymentRequestID` bigint(20) DEFAULT NULL,
  `paymentRequestStatus` int(50) NOT NULL,
  `paymentRequestRemarks` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentRequestReason` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `requestorID` bigint(20) DEFAULT NULL,
  `referenceCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referencePurpose` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amountWords` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `pettyRepID` bigint(20) DEFAULT NULL,
  `purchaseOrderID` bigint(20) DEFAULT NULL,
  `chartOfAccountID` bigint(20) DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `approversID` text CHARACTER SET utf8mb4 DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) DEFAULT NULL,
  `updatedBy` bigint(20) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`paymentRequestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_payment_request_tbl`
--

LOCK TABLES `fms_payment_request_tbl` WRITE;
/*!40000 ALTER TABLE `fms_payment_request_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `fms_payment_request_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fms_petty_cash_replenishment_tbl`
--

DROP TABLE IF EXISTS `fms_petty_cash_replenishment_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fms_petty_cash_replenishment_tbl` (
  `pettyRepID` bigint(20) NOT NULL AUTO_INCREMENT,
  `revisePettyRepID` bigint(20) DEFAULT NULL,
  `pettyRepStatus` int(50) NOT NULL,
  `pettyRepRemarks` longtext DEFAULT NULL,
  `pettyRepReason` text NOT NULL,
  `pettyRepTotalBalance` decimal(19,2) NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `requestorID` bigint(20) DEFAULT NULL,
  `approversID` text DEFAULT NULL,
  `approversStatus` text DEFAULT NULL,
  `approversDate` text DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) DEFAULT NULL,
  `updatedBy` bigint(20) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`pettyRepID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_petty_cash_replenishment_tbl`
--

LOCK TABLES `fms_petty_cash_replenishment_tbl` WRITE;
/*!40000 ALTER TABLE `fms_petty_cash_replenishment_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `fms_petty_cash_replenishment_tbl` ENABLE KEYS */;
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
  `pettyCashRequestDetailsDescription` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` decimal(15,2) NOT NULL,
  `files` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  PRIMARY KEY (`pettyCashRequestDetailsID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pettyCashRequestStatus` int(11) NOT NULL,
  `pettyCashRequestRemarks` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pettyCashLiquidationStatus` int(11) NOT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`pettyCashRequestID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fms_petty_cash_request_tbl`
--

LOCK TABLES `fms_petty_cash_request_tbl` WRITE;
/*!40000 ALTER TABLE `fms_petty_cash_request_tbl` DISABLE KEYS */;
INSERT INTO `fms_petty_cash_request_tbl` VALUES (1,NULL,1000.00,1,19,'2021-06-24','2|4|5','2|2|2','2021-06-24 13:22:52|2021-06-24 13:24:57|2021-06-24 13:27:39',2,NULL,1,'2021-06-24 11:17:50',1,5,'2021-06-24 11:17:50','2021-06-24 23:51:21'),(2,NULL,500.00,1,51,'2021-06-24','2|4|5','2|2|3','2021-06-24 13:23:05|2021-06-24 13:25:11|2021-06-24 13:28:16',3,'revise',0,'2021-06-24 11:25:03',1,5,'2021-06-24 11:25:03','2021-06-24 05:28:18'),(3,NULL,1300.00,1,61,'2021-06-24','2|4|5','2|2|2','2021-06-24 13:23:23|2021-06-24 13:25:22|2021-06-24 13:29:03',2,NULL,1,'2021-06-24 13:01:41',1,5,'2021-06-24 13:01:41','2021-06-24 07:03:45'),(4,NULL,850.00,1,79,'2021-06-24','2|4|5','2|2|2','2021-06-24 13:23:37|2021-06-24 13:26:09|2021-06-24 13:28:39',2,NULL,1,'2021-06-24 13:09:47',1,5,'2021-06-24 13:09:47','2021-06-24 06:57:53'),(5,NULL,1500.00,1,45,'2021-06-24','2|4|5','2|2|2','2021-06-24 13:23:47|2021-06-24 13:26:46|2021-06-24 13:29:35',2,NULL,1,'2021-06-24 13:13:01',1,5,'2021-06-24 13:13:01','2021-06-24 06:29:59'),(6,NULL,100.00,1,88,'2021-06-24','2|4|5','2|3','2021-06-28 15:08:53|2021-06-28 15:09:52',3,'test',1,'2021-06-25 14:20:34',1,4,'2021-06-24 13:14:50','2021-06-28 07:09:53'),(7,NULL,725.00,1,19,'2021-06-24','2|4|5','2|2|2','2021-06-24 14:15:54|2021-06-24 14:17:15|2021-06-24 14:18:18',2,NULL,1,'2021-06-24 14:13:50',1,5,'2021-06-24 14:13:50','2021-06-25 06:23:53'),(8,NULL,1000.00,1,45,'2021-06-25','2|4|5','2|2|2','2021-06-25 14:04:36|2021-06-25 14:06:28|2021-06-25 14:13:23',2,NULL,1,'2021-06-25 11:10:52',1,5,'2021-06-25 11:10:52','2021-06-25 06:28:16'),(9,NULL,500.00,1,17,'2021-06-25','2|4|5','2|2|2','2021-06-25 14:04:16|2021-06-25 14:11:21|2021-06-25 14:12:49',2,NULL,1,'2021-06-25 11:13:39',1,5,'2021-06-25 11:13:39','2021-06-29 00:27:56'),(10,NULL,50.00,1,53,'2021-06-25','2|4|5','3','2021-06-25 14:02:06',3,'test',1,'2021-06-25 14:00:02',1,2,'2021-06-25 14:00:02','2021-06-29 00:28:53'),(11,NULL,100.00,5,19,'2021-06-25','5','2','2021-06-25 14:15:21',2,NULL,0,'2021-06-25 14:15:21',5,5,'2021-06-25 14:15:21','2021-06-25 06:15:26'),(12,10,50.00,1,53,'2021-06-25','2|4|5','2|2|2','2021-06-28 15:08:36|2021-06-28 15:10:00|2021-06-28 15:12:32',2,NULL,1,'2021-06-25 14:18:17',1,5,'2021-06-25 14:16:37','2021-06-28 07:19:46'),(13,NULL,50.00,1,53,'2021-06-28','2|4|5','2|2|2','2021-06-28 15:09:04|2021-06-28 15:09:34|2021-06-28 15:12:40',2,NULL,0,'2021-06-28 08:22:50',1,5,'2021-06-28 08:22:50','2021-06-28 07:12:41'),(14,NULL,100.00,1,53,'2021-06-28','2|4|5','2|2|2','2021-06-28 15:08:26|2021-06-28 15:10:12|2021-06-28 15:12:23',2,NULL,0,'2021-06-28 15:07:33',1,5,'2021-06-28 15:07:33','2021-06-28 07:12:24'),(15,NULL,300.00,1,23,'2021-06-29','2|4|5','2|2|2','2021-06-29 07:17:26|2021-06-29 07:19:45|2021-06-29 07:21:12',2,NULL,0,'2021-06-29 07:16:24',1,5,'2021-06-29 07:16:24','2021-06-28 23:21:13'),(16,NULL,0.00,1,0,'2021-06-29',NULL,NULL,NULL,0,NULL,0,NULL,1,1,'2021-06-29 09:30:28','2021-06-29 01:30:30'),(17,NULL,1000.00,1,45,'2021-06-29','2|4|5','2|2|2','2021-06-29 10:28:24|2021-06-29 10:31:53|2021-06-29 10:33:30',2,NULL,0,'2021-06-29 09:35:56',1,5,'2021-06-29 09:35:56','2021-06-29 02:33:33'),(18,NULL,0.00,1,0,'2021-06-29',NULL,NULL,NULL,0,NULL,0,NULL,1,1,'2021-06-29 09:36:32','2021-06-29 01:36:34'),(19,NULL,1000.00,1,17,'2021-06-29','2|4|5','2|2|2','2021-06-29 10:28:40|2021-06-29 10:32:07|2021-06-29 10:34:31',2,NULL,0,'2021-06-29 10:21:37',1,5,'2021-06-29 10:21:37','2021-06-29 02:34:33'),(20,NULL,1500.00,1,23,'2021-06-29','2|4|5','2|2|3','2021-06-29 10:28:52|2021-06-29 10:31:35|2021-06-29 10:34:11',3,'revised this',0,'2021-06-29 10:22:34',1,5,'2021-06-29 10:22:34','2021-06-29 02:34:12'),(21,NULL,500.00,1,53,'2021-06-29','2|4|5','2|2|2','2021-06-29 10:28:11|2021-06-29 10:32:19|2021-06-29 10:33:14',2,NULL,0,'2021-06-29 10:23:53',1,5,'2021-06-29 10:23:53','2021-06-29 02:33:17');
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
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_approval_setup_tbl`
--

LOCK TABLES `gen_approval_setup_tbl` WRITE;
/*!40000 ALTER TABLE `gen_approval_setup_tbl` DISABLE KEYS */;
INSERT INTO `gen_approval_setup_tbl` VALUES (129,55,'Leave Request',1,0,'4|2|6',1,1,'2021-04-07','2021-04-07 06:40:10'),(130,55,'Leave Request',2,0,'4|3|7',1,1,'2021-04-07','2021-04-07 23:22:37'),(131,60,'Change Schedule',1,0,'4|6|5',1,1,'2021-04-07','2021-04-15 03:28:37'),(132,60,'Change Schedule',2,0,'3|4|1',1,1,'2021-04-07','2021-04-07 06:21:55'),(133,60,'Change Schedule',3,0,'0',1,1,'2021-04-07','2021-04-07 06:21:15'),(134,60,'Change Schedule',4,0,'1|3|6',1,4,'2021-04-07','2021-04-19 08:42:10'),(139,57,'No Time In/Out',1,0,'2|4|5',1,1,'2021-04-08','2021-04-08 00:23:36'),(140,56,'Overtime Request',1,0,'4|8|7',1,1,'2021-04-08','2021-04-08 06:39:22'),(141,33,'Inventory Receiving',1,0,'4|2|5',1,1,'2021-04-12','2021-05-18 00:34:22'),(142,33,'Inventory Receiving',2,0,'0',1,1,'2021-04-12','2021-04-12 00:18:26'),(143,33,'Inventory Receiving',3,0,'0',1,1,'2021-04-12','2021-04-12 00:18:26'),(144,58,'Official Business',1,0,'2|3|5',1,1,'2021-04-12','2021-04-12 02:42:56'),(145,58,'Official Business',6,0,'1|3|0',1,1,'2021-04-12','2021-04-12 02:43:30'),(146,58,'Official Business',9,0,'1|3|0',1,1,'2021-04-12','2021-04-12 02:44:28'),(149,46,'Purchase Request',1,0,'4|2|7',1,1,'2021-04-21','2021-04-21 07:41:25'),(150,46,'Purchase Request',2,0,'0',1,1,'2021-04-21','2021-04-21 05:28:50'),(151,46,'Purchase Request',3,0,'0',1,1,'2021-04-21','2021-04-21 05:28:50'),(152,46,'Purchase Request',4,0,'0',1,1,'2021-04-21','2021-04-21 05:28:50'),(160,38,'Cost Estimate',1,0,'4|20|2',1,1,'2021-04-22','2021-05-17 07:50:52'),(161,38,'Cost Estimate',2,0,'6|3|0',1,1,'2021-04-22','2021-04-22 02:13:30'),(162,38,'Cost Estimate',3,0,'6|3|0',1,1,'2021-04-22','2021-04-22 02:12:53'),(163,38,'Cost Estimate',4,0,'6|3|0',1,1,'2021-04-22','2021-04-22 02:12:53'),(164,38,'Cost Estimate',5,0,'6|3|0',1,1,'2021-04-22','2021-04-22 02:12:53'),(165,38,'Cost Estimate',6,0,'6|3|0',1,1,'2021-04-22','2021-04-22 02:12:53'),(166,38,'Cost Estimate',7,0,'6|3|0',1,1,'2021-04-22','2021-04-22 02:12:53'),(167,38,'Cost Estimate',8,0,'0',1,1,'2021-04-22','2021-05-28 02:20:24'),(168,38,'Cost Estimate',9,0,'0',1,1,'2021-04-22','2021-05-28 02:20:24'),(169,59,'Loan',1,0,'2|3|4',1,1,'2021-04-30','2021-04-30 00:22:04'),(170,59,'Loan',3,0,'0',1,1,'2021-04-30','2021-05-28 02:20:24'),(171,59,'Loan',8,0,'0',1,1,'2021-04-30','2021-04-30 00:21:18'),(172,37,'Transfer Request',1,0,'2|3|4',1,1,'2021-04-30','2021-04-30 00:55:25'),(173,37,'Transfer Request',2,0,'0',1,1,'2021-04-30','2021-04-30 00:55:05'),(174,126,'Inventory Validation Form',1,0,'2|4|5',1,1,'2021-05-02','2021-05-02 12:28:34'),(175,126,'Inventory Validation Form',2,0,'0',1,1,'2021-05-02','2021-05-02 12:28:13'),(176,126,'Inventory Validation Form',3,0,'0',1,1,'2021-05-02','2021-05-02 12:28:13'),(177,44,'Inventory Incident',1,0,'5|2|4',1,1,'2021-05-03','2021-05-03 00:34:24'),(178,35,'Return Item',1,0,'2|5|4',1,1,'2021-05-03','2021-05-12 02:58:43'),(179,35,'Return Item',2,0,'0',1,1,'2021-05-03','2021-05-03 03:42:08'),(180,36,'Disposal',1,0,'2|3|4',1,1,'2021-05-03','2021-05-03 03:43:32'),(181,36,'Disposal',2,0,'0',1,1,'2021-05-03','2021-05-03 03:43:10'),(182,42,'Material Withdrawal',1,0,'4|2|5',1,1,'2021-05-04','2021-05-04 01:25:40'),(183,39,'Bill of Material',1,0,'4|20|2',1,1,'2021-05-07','2021-05-17 07:50:04'),(184,49,'Service Requisition',1,0,'2|4|5',1,1,'2021-05-08','2021-05-08 03:14:23'),(185,41,'Service Order',1,0,'2|4|5',1,1,'2021-05-08','2021-05-08 08:40:03'),(186,40,'Bid Recap',1,0,'2|4|20',1,1,'2021-05-10','2021-05-17 07:49:40'),(187,128,'Service Completion',1,0,'2|4|5',1,1,'2021-05-11','2021-05-11 23:09:18'),(188,45,'Material Usage',1,0,'2|4|5',1,1,'2021-05-12','2021-05-12 06:36:25'),(189,47,'Purchase Order',1,0,'2|5|4',1,1,'2021-05-15','2021-05-15 13:09:03'),(190,43,'Equipment Borrowing',1,0,'4|2|5',1,1,'2021-05-25','2021-05-25 07:09:58'),(191,53,'Petty Cash Request',1,0,'2|4|5',1,1,'2021-06-11','2021-06-11 04:35:15'),(193,132,'Liquidation',1,0,'2|4|5',1,1,'2021-06-23','2021-06-23 06:11:52'),(194,54,'Client Fund Request',1,0,'2|4|5',1,1,'2021-06-24','2021-06-24 07:37:42'),(199,52,'Sign-Off',1,0,'3|2',1,1,'2021-07-05','2021-07-05 06:56:49'),(200,52,'Sign-Off',2,0,'0',1,1,'2021-07-05','2021-07-05 06:43:37');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_ledger_classification_tbl`
--

LOCK TABLES `gen_ledger_classification_tbl` WRITE;
/*!40000 ALTER TABLE `gen_ledger_classification_tbl` DISABLE KEYS */;
INSERT INTO `gen_ledger_classification_tbl` VALUES (1,'Cash','2021-04-14'),(2,'Accounts Receivable','2021-04-14'),(3,'Inventory','2021-04-14'),(4,'Other current Assets','2021-04-14'),(5,'Due from Related Parties','2021-04-14'),(6,'Property Plant and Equipment','2021-04-14'),(7,'Trade Payable','2021-04-14'),(8,'Accrued Expenses','2021-04-14'),(9,'Due to Government','2021-04-14'),(10,'Due to Related Parties','2021-04-14'),(11,'Subscribed and Paid','2021-04-14'),(12,'Statement of Changes in Equity','2021-04-14'),(13,'Cost of Sale','2021-04-14'),(14,'Administrative Expense','2021-04-14'),(15,'Retained Earnings','2021-04-14'),(16,'Service Revenue','2021-04-14'),(17,'Ledger','2021-06-30');
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
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_module_list_tbl`
--

LOCK TABLES `gen_module_list_tbl` WRITE;
/*!40000 ALTER TABLE `gen_module_list_tbl` DISABLE KEYS */;
INSERT INTO `gen_module_list_tbl` VALUES (1,5,1,1,'Project Management System|Inventory Management System|Finance Management System','01618295087.svg|11618295087.svg|21618295087.svg|31618295087.svg|41618295087.svg|51618295087.svg|6161','Approval Setup',0,'approval_setup',1,'2021-03-23 23:22:25','2021-04-13 06:24:47'),(2,5,1,2,'Inventory Management System|Project Management System|Finance Management System|Human Resource Information System',NULL,'Roles and Permission',0,'roles_permission',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(3,5,1,3,'Inventory Management System|Project Management System|Finance Management System|Human Resource Information System',NULL,'System Notification',0,'system_notification',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(4,2,2,1,'Inventory Management System',NULL,'Inventory Item',0,'ims/inventory_item',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(5,2,2,2,'Inventory Management System',NULL,'Inventory Category',0,'ims/inventory_category',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(6,2,2,3,'Inventory Management System',NULL,'Inventory Classification',0,'ims/inventory_classification',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(7,2,2,4,'Inventory Management System',NULL,'Inventory Storage',0,'ims/inventory_storage',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(8,2,2,5,'Inventory Management System',NULL,'Inventory Vendor',0,'ims/inventory_vendor',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(9,2,2,6,'Inventory Management System',NULL,'Inventory Condition',0,'ims/inventory_condition',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(10,2,2,7,'Project Management System',NULL,'Project Milestone',0,'pms/project_milestone',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(11,2,2,8,'Project Management System',NULL,'Project List',0,'pms/project_list',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(12,2,2,9,'Project Management System',NULL,'Project Client',0,'pms/project_client',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(13,2,2,10,'Project Management System',NULL,'Project Category',0,'pms/project_category',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(14,2,2,11,'Finance Management System',NULL,'Bank',0,'fms/bank',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(15,2,2,12,'Finance Management System',NULL,'Chart of Accounts',0,'fms/chart_of_accounts',1,'2021-03-23 23:22:25','2021-05-05 06:09:55'),(16,2,2,13,'Finance Management System',NULL,'Ledger Classification',0,'fms/ledger_classification',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(17,2,2,14,'Human Resource Information System',NULL,'Designation',0,'hris/designation',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(18,2,2,15,'Human Resource Information System',NULL,'Department',0,'hris/department',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(19,2,2,16,'Human Resources Information System',NULL,'Requirement',0,'hris/requirements',1,'2021-03-23 23:22:25','2021-05-14 03:20:21'),(20,2,2,17,'Human Resource Information System',NULL,'Holiday',0,'hris/holiday',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(21,2,2,18,'Human Resource Information System',NULL,'Leave Type',0,'hris/leave_type',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(22,2,2,19,'Human Resource Information System',NULL,'Loan Type',0,'hris/loan_type',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(23,2,2,20,'Human Resource Information System',NULL,'Code of Conduct Category',0,'hris/code_conduct_category',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(24,2,2,21,'Human Resource Information System',NULL,'Code of Conduct Section',0,'hris/code_conduct_section',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(25,2,2,22,'Human Resource Information System',NULL,'Branch',0,'hris/branch',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(26,2,2,23,'Human Resource Information System',NULL,'Qualification',0,'hris/qualification',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(27,2,2,24,'Human Resource Information System',NULL,'Award',0,'hris/award',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(28,2,2,25,'Human Resource Information System',NULL,'SSS Table',0,'hris/sss_table',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(29,2,2,26,'Human Resource Information System',NULL,'PhilHealth Table',0,'hris/philhealth_table',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(30,2,2,27,'Human Resource Information System',NULL,'Tax Table',0,'hris/tax_table',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(31,2,2,28,'Human Resources Information System',NULL,'Training and Development Masterfile',0,'hris/training_development_setup',1,'2021-03-23 23:22:25','2021-08-23 02:47:38'),(32,2,2,29,'Human Resource Information System',NULL,'Examination',0,'hris/examination',1,'2021-03-23 23:22:25','2021-03-23 23:22:25'),(33,2,3,1,'Inventory Management System',NULL,'Inventory Receiving',3,'ims/inventory_receiving',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(34,2,3,2,'Inventory Management System',NULL,'List of Stocks',0,'ims/list_stocks',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(35,2,3,3,'Inventory Management System',NULL,'Return Item',3,'ims/return_item',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(36,2,3,4,'Inventory Management System',NULL,'Disposal',3,'ims/item_disposal',1,'2021-03-23 23:22:25','2021-05-05 05:53:05'),(37,2,3,5,'Inventory Management System',NULL,'Inventory Transfer',3,'ims/transfer_request',1,'2021-03-23 23:22:25','2021-06-10 02:43:19'),(38,2,5,6,'Project Management System',NULL,'Cost Estimate',3,'pms/cost_estimate',1,'2021-03-23 23:22:25','2021-05-02 05:09:04'),(39,2,5,7,'Project Management System',NULL,'Project Budget Rationale',3,'pms/project_budget_rationale',1,'2021-03-23 23:22:25','2021-05-25 06:04:50'),(40,2,3,8,'Inventory Management System',NULL,'Bid Recap',3,'ims/bid_recap',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(41,2,3,9,'Inventory Management System',NULL,'Service Order',3,'ims/service_order',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(42,2,3,1,'Inventory Management System',NULL,'Material Withdrawal',3,'ims/material_withdrawal',1,'2021-03-23 23:22:25','2021-05-25 04:57:02'),(43,2,3,2,'Inventory Management System',NULL,'Equipment Borrowing',3,'ims/equipment_borrowing',1,'2021-03-23 23:22:25','2021-05-31 06:13:52'),(44,2,3,3,'Inventory Management System',NULL,'Inventory Incident',3,'ims/inventory_incident',1,'2021-03-23 23:22:25','2021-05-26 23:38:34'),(45,2,3,4,'Inventory Management System',NULL,'Material Usage',3,'ims/material_usage',1,'2021-03-23 23:22:25','2021-05-11 05:37:06'),(46,2,3,5,'Inventory Management System',NULL,'Purchase Request',3,'ims/purchase_request',1,'2021-03-23 23:22:25','2021-05-09 10:50:44'),(47,2,3,6,'Inventory Management System',NULL,'Purchase Order',3,'ims/purchase_order',1,'2021-03-23 23:22:25','2021-05-09 10:50:28'),(48,2,4,7,'Inventory Management System',NULL,'Item Price List',0,'ims/item_price_list',0,'2021-03-23 23:22:25','2021-07-07 03:10:53'),(49,2,3,8,'Inventory Management System',NULL,'Service Requisition',3,'ims/service_requisition',1,'2021-03-23 23:22:25','2021-05-17 08:12:57'),(50,2,8,9,'Human Resources Information System',NULL,'Personnel Requisition',3,'pms/personel_requisition',1,'2021-03-23 23:22:25','2021-07-06 06:13:50'),(51,2,5,10,'Project Management System',NULL,'Employee Taskboard',3,'pms/employee_taskboard',1,'2021-03-23 23:22:25','2021-07-05 03:17:02'),(52,2,5,11,'Project Management System',NULL,'Sign-Off',3,'pms/sign_off',1,'2021-03-23 23:22:25','2021-06-29 04:52:21'),(53,2,7,12,'Finance Management System',NULL,'Petty Cash Request',3,'fms/petty_cash_request',1,'2021-03-23 23:22:25','2021-06-09 00:00:46'),(54,2,7,13,'Finance Management System',NULL,'Client Fund Request',3,'fms/client_fund_request',1,'2021-03-23 23:22:25','2021-06-21 23:25:31'),(55,2,4,14,'Human Resource Information System',NULL,'Leave Request',3,'hris/leave_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(56,2,4,15,'Human Resource Information System',NULL,'Overtime Request',3,'hris/overtime_request',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(57,2,4,16,'Human Resources Information System',NULL,'No Time In/Out',3,'hris/no_timein_timeout',1,'2021-03-23 23:22:25','2021-03-25 05:53:42'),(58,2,4,17,'Human Resource Information System',NULL,'Official Business',3,'hris/official_business',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(59,2,4,18,'Human Resources Information System',NULL,'Loan',3,'hris/loan_form',1,'2021-03-23 23:22:25','2021-04-13 03:47:55'),(60,2,4,19,'Human Resource Information System',NULL,'Change Schedule',3,'hris/change_schedule',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(61,2,4,20,'Human Resource Information System',NULL,'Employee Evaluation',3,'hris/employee_evaluation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(62,2,4,21,'Human Resource Information System',NULL,'Clearance',3,'hris/clearance',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(63,1,12,1,'Inventory Management System',NULL,'Purhcase Order Report',0,'ims/purchase_order_report',1,'2021-03-23 23:22:25','2021-07-13 00:58:26'),(64,4,6,2,'Inventory Management System',NULL,'Receiving Report',0,'ims/receiving_report',1,'2021-03-23 23:22:25','2021-07-13 00:59:02'),(65,4,6,3,'Inventory Management System',NULL,'Inventory Incident Report',0,'ims/inventory_incident_report',1,'2021-03-23 23:22:25','2021-07-13 00:59:20'),(66,4,6,4,'Inventory Management System',NULL,'Inventory Report',0,'ims/inventory_report',1,'2021-03-23 23:22:25','2021-07-13 00:59:36'),(67,1,12,1,'Inventory Management System',NULL,'Inventory Dashboard',0,'ims/inventory_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(68,1,12,2,'Project Management System',NULL,'Project Dashboard',0,'pms/project_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(69,1,12,3,'Finance Management System',NULL,'Finance Dashboard',0,'fms/finance_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(70,1,12,4,'Human Resource Information System',NULL,'HRIS Dashboard',0,'hris/hr_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(71,4,6,5,'Project Management System',NULL,'Project Management',0,'fms/project_management',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(72,4,6,6,'Project Management System',NULL,'Project Task',0,'fms/project_task',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(73,4,6,7,'Project Management System',NULL,'Project Timeline',0,'fms/project_timeline',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(74,4,6,8,'Finance Management System',NULL,'Petty Cash Voucher',0,'fms/petty_cash_voucher',0,'2021-03-23 23:22:25','2021-06-28 06:50:48'),(75,4,6,9,'Finance Management System',NULL,'Client Fund Voucher Report',0,'fms/client_fund_voucher',1,'2021-03-23 23:22:25','2021-06-18 06:11:11'),(76,2,7,10,'Finance Management System',NULL,'Payment Request',0,'fms/payment_request',1,'2021-03-23 23:22:25','2021-07-15 07:04:47'),(77,4,6,11,'Finance Management System',NULL,'Check Voucher',0,'fms/check_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(78,4,6,12,'Human Resource Information System',NULL,'Examination Report',0,'hris/examination_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(79,4,6,13,'Human Resource Information System',NULL,'Timekeeping Report',0,'hris/timekeeping_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(80,4,6,14,'Human Resource Information System',NULL,'Payroll Report',0,'hris/payroll_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(81,4,6,15,'Human Resource Information System',NULL,'Payroll Adjustment Report',0,'hris/payroll_adjustment_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(82,4,6,16,'Human Resource Information System',NULL,'Payslip Generation',0,'hris/payslip_generation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(83,4,6,17,'Human Resource Information System',NULL,'13th Month Report',0,'hris/13th_month_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(84,4,6,18,'Human Resource Information System',NULL,'PHIC Premium Payment',0,'hris/phic_premium_payment',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(85,4,6,19,'Human Resource Information System',NULL,'SSS Premium Payment',0,'hris/sss_premium_payment',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(86,4,6,20,'Human Resource Information System',NULL,'HDMF Premim Payment',0,'hris/hdmf_premium_payment',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(87,4,6,21,'Human Resource Information System',NULL,'Manpower Management Report',0,'hris/manpower_management_report',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(88,1,12,5,'Human Resource Information System',NULL,'Employee Dashboard',0,'hris/employee_dashboard',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(89,2,5,1,'Project Management System',NULL,'Milestone Builder',3,'pms/milestone_builder',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(90,2,5,2,'Project Management System',NULL,'Project Timeline Builder',3,'pms/project_timeline_builder',1,'2021-03-23 23:22:25','2021-07-05 04:53:07'),(91,2,5,3,'Project Management System',NULL,'Manage Project Budget',3,'pms/manage_project_budget',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(92,2,5,4,'Project Management System',NULL,'Project Management Board',3,'pms/project_management_board',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(93,2,7,1,'Finance Management System',NULL,'Petty Cash Voucher',3,'fms/petty_cash_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(94,2,7,2,'Finance Management System',NULL,'Client Fund Voucher',3,'fms/client_fund_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(95,4,6,3,'Finance Management System',NULL,'Payment Request',3,'fms/payment_request',0,'2021-03-23 23:22:25','2021-07-15 07:05:09'),(96,2,7,4,'Finance Management System',NULL,'Check Voucher',3,'fms/check_voucher',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(97,2,7,5,'Finance Management System',NULL,'Check Writer',3,'fms/check_writer',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(98,2,7,6,'Finance Management System',NULL,'Check Voucher Liquidation',3,'fms/check_voucher_liquidation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(99,2,7,7,'Finance Management System',NULL,'Billing Module',0,'fms/billing_module',1,'2021-03-23 23:22:25','2021-06-20 04:57:13'),(100,2,7,8,'Finance Management System',NULL,'Collection Module',3,'fms/collection_module',1,'2021-03-23 23:22:25','2021-06-20 04:52:03'),(101,5,9,1,'Human Resource Information System',NULL,'Schedule Setup',0,'hris/schedule_setup',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(102,5,9,2,'Human Resource Information System',NULL,'Orientation Setup',0,'hris/orientation_setup',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(103,2,10,1,'Human Resources Information System',NULL,'Job Posting',0,'hris/job_posting',1,'2021-03-23 23:22:25','2021-03-25 05:25:43'),(104,2,10,2,'Human Resource Information System',NULL,'Applicant Registration',0,'hris/application_registration',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(105,5,9,3,'Human Resources Information System',NULL,'Examination Setup',0,'hris/examination_setup',1,'2021-03-23 23:22:25','2021-07-29 00:41:52'),(106,2,10,4,'Human Resource Information System',NULL,'Applicant List',0,'hris/applicant_list',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(107,2,10,5,'Human Resources Information System',NULL,'Onboarding Module',0,'hris/on_boarding',1,'2021-03-23 23:22:25','2021-08-26 07:19:10'),(108,2,11,1,'Human Resource Information System',NULL,'Employee Attendance',0,'hris/employee_attendance',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(109,2,11,2,'Human Resources Information System',NULL,'Timekeeping Module',0,'hris/timekeeping_module',1,'2021-03-23 23:22:25','2021-08-24 05:04:18'),(110,2,11,3,'Human Resource Information System',NULL,'Payroll',0,'hris/payroll',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(111,2,11,4,'Human Resource Information System',NULL,'Payroll Adjustment',0,'hris/payroll_adjustment',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(112,2,11,5,'Human Resource Information System',NULL,'13th Month',0,'hris/13th_month',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(113,2,2,1,'Human Resources Information System',NULL,'Personnel Requisition',3,'hris/personnel_requisition',0,'2021-03-23 23:22:25','2021-07-06 06:12:00'),(114,2,8,2,'Human Resources Information System',NULL,'Employee Module',0,'hris/employee_module',1,'2021-03-23 23:22:25','2021-04-19 05:22:53'),(115,2,8,3,'Human Resource Information System',NULL,'Personal Action Notice',0,'hris/personal_action_notice',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(116,2,8,4,'Human Resource Information System',NULL,'Manpower Management',0,'hris/manpower_management',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(117,2,8,5,'Human Resource Information System',NULL,'Employee Relation',0,'hris/employee_relation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(118,2,8,6,'Human Resource Information System',NULL,'Employee Evaluation',0,'hris/employee_evaluation',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(119,2,8,7,'Human Resource Information System',NULL,'Employee Management',0,'hris/employee_management',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(120,2,8,8,'Human Resource Information System',NULL,'Memorandum',0,'hris/memorandum',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(121,2,8,9,'Human Resource Information System',NULL,'Employee Award',0,'hris/employee_award',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(122,2,8,10,'Human Resource Information System',NULL,'Leave Monitoring',0,'hris/leave_monitoring',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(123,2,8,11,'Human Resources Information System',NULL,'Training and Development',3,'hris/training_development',1,'2021-03-23 23:22:25','2021-08-25 05:47:53'),(124,2,8,12,'Human Resource Information System',NULL,'Event Calendar',0,'hris/event_calendar',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(125,2,3,1,'Inventory Management System',NULL,'Canvassing Form',1,'ims/inventory_canvassing',1,'2021-04-20 23:29:40','2021-04-20 23:29:40'),(126,2,3,1,'Inventory Management System',NULL,'Inventory Validation',3,'ims/inventory_validation',1,'2021-04-20 23:41:40','2021-06-02 05:46:41'),(127,2,3,1,'Inventory Management System',NULL,'Item Price List',0,'ims/item_price_list',1,'2021-04-22 16:09:10','2021-05-06 06:53:39'),(128,2,3,9,'Inventory Management System',NULL,'Service Completion',3,'ims/service_completion',1,'2021-03-23 23:22:25','2021-03-23 23:58:14'),(129,2,3,99,'Inventory Management System',NULL,'Inventory Stock In',0,'ims/inventory_stock_in',1,'2021-05-07 01:50:57','2021-05-07 01:50:57'),(130,2,2,3,'Inventory Management System',NULL,'Unit of Measurement',0,'ims/unit_of_measurement',1,'2021-05-24 13:09:23','2021-05-24 13:09:23'),(131,2,2,31,'Inventory Management System',NULL,'Service',0,'ims/service',1,'2021-05-26 05:39:58','2021-05-26 05:44:44'),(132,2,7,1,'Finance Management System',NULL,'Liquidation',3,'fms/liquidation',1,'2021-06-18 00:32:53','2021-06-18 00:32:53'),(133,2,7,1,'Finance Management System',NULL,'Petty Cash Replenishment',3,'fms/petty_cash_replenishment',1,'2021-06-18 06:12:41','2021-06-18 06:12:41'),(134,2,7,1,'Finance Management System',NULL,'Client Fund Replenishment',3,'fms/client_fund_replenishment',1,'2021-06-18 06:13:14','2021-06-18 06:13:14'),(135,2,2,1,'Inventory Management System',NULL,'Vehicle',1,'ims/vehicle',1,'2021-07-13 00:59:45','2021-07-13 01:00:09'),(136,4,6,1,'Inventory Management System',NULL,'Reservation Report',0,'ims/reservation_report',1,'2021-07-16 00:45:44','2021-07-16 00:45:44'),(137,2,3,1,'Inventory Management System',NULL,'Material Request',3,'ims/material_request',1,'2021-09-16 11:47:46','2021-09-16 11:47:46'),(138,2,3,1,'Inventory Management System',NULL,'Change Request',3,'ims/change_request',1,'2021-09-16 11:48:36','2021-09-16 11:48:36'),(139,2,3,1,'Inventory Management System',NULL,'Stock Out',1,'ims/stock_out',1,'2021-09-16 23:17:19','2021-09-16 23:17:19'),(140,2,2,1,'Inventory Management System',NULL,'Inventory Asset',0,'ims/invventory_asset',1,'2021-09-19 23:25:53','2021-09-19 23:25:53'),(141,2,3,1,'Inventory Management System',NULL,'Asset Price List',0,'ims/asset_price_list',1,'2021-09-22 11:39:26','2021-09-22 11:39:26');
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
) ENGINE=InnoDB AUTO_INCREMENT=2257 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_roles_permission_tbl`
--

LOCK TABLES `gen_roles_permission_tbl` WRITE;
/*!40000 ALTER TABLE `gen_roles_permission_tbl` DISABLE KEYS */;
INSERT INTO `gen_roles_permission_tbl` VALUES (1,1,0,1,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2,1,0,2,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(3,1,0,3,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(4,1,0,4,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(5,1,0,5,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(6,1,0,6,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(7,1,0,7,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(8,1,0,8,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(9,1,0,9,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(10,1,0,10,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(11,1,0,11,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(12,1,0,12,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(13,1,0,13,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(14,1,0,14,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(15,1,0,15,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(16,1,0,16,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(17,1,0,17,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(18,1,0,18,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(19,1,0,19,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(20,1,0,20,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(21,1,0,21,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(22,1,0,22,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(23,1,0,23,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(24,1,0,24,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(25,1,0,25,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(26,1,0,26,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(27,1,0,27,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(28,1,0,28,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(29,1,0,29,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(30,1,0,30,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(31,1,0,31,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(32,1,0,32,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(33,1,0,33,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(34,1,0,34,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(35,1,0,35,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(36,1,0,36,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(37,1,0,37,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(38,1,0,38,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(39,1,0,39,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(40,1,0,40,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(41,1,0,41,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(42,1,0,42,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(43,1,0,43,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(44,1,0,44,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(45,1,0,45,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(46,1,0,46,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(47,1,0,47,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(48,1,0,48,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(49,1,0,49,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(50,1,0,50,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(51,1,0,51,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(52,1,0,52,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(53,1,0,53,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(54,1,0,54,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(55,1,0,55,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(56,1,0,56,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(57,1,0,57,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(58,1,0,58,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(59,1,0,59,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(60,1,0,60,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(61,1,0,61,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(62,1,0,62,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(63,1,0,63,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(64,1,0,64,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(65,1,0,65,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(66,1,0,66,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(67,1,0,67,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(68,1,0,68,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(69,1,0,69,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(70,1,0,70,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(71,1,0,71,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(72,1,0,72,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(73,1,0,73,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(74,1,0,74,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(75,1,0,75,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(76,1,0,76,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(77,1,0,77,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(78,1,0,78,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(79,1,0,79,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(80,1,0,80,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(81,1,0,81,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(82,1,0,82,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(83,1,0,83,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(84,1,0,84,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(85,1,0,85,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(86,1,0,86,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(87,1,0,87,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(88,1,0,88,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(89,1,0,89,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(90,1,0,90,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(91,1,0,91,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(92,1,0,92,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(93,1,0,93,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(94,1,0,94,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(95,1,0,95,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(96,1,0,96,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(97,1,0,97,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(98,1,0,98,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(99,1,0,99,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(100,1,0,100,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(101,1,0,101,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(102,1,0,102,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(103,1,0,103,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(104,1,0,104,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(105,1,0,105,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(106,1,0,106,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(107,1,0,107,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(108,1,0,108,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(109,1,0,109,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(110,1,0,110,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(111,1,0,111,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(112,1,0,112,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(113,1,0,113,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(114,1,0,114,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(115,1,0,115,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(116,1,0,116,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(117,1,0,117,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(118,1,0,118,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(119,1,0,119,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(120,1,0,120,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(121,1,0,121,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(122,1,0,122,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(123,1,0,123,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(124,1,0,124,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(125,1,0,125,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(126,1,0,126,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(127,1,0,127,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(128,1,0,128,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(129,1,0,129,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(130,1,0,130,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(131,1,0,131,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(132,1,0,132,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(133,1,0,133,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(134,1,0,134,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(135,1,0,135,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(136,1,0,136,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(137,1,0,137,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(138,1,0,138,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(139,1,0,139,1,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(140,2,0,1,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(141,2,0,2,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(142,2,0,3,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(143,2,0,4,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(144,2,0,5,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(145,2,0,6,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(146,2,0,7,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(147,2,0,8,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(148,2,0,9,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(149,2,0,10,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(150,2,0,11,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(151,2,0,12,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(152,2,0,13,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(153,2,0,14,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(154,2,0,15,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(155,2,0,16,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(156,2,0,17,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(157,2,0,18,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(158,2,0,19,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(159,2,0,20,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(160,2,0,21,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(161,2,0,22,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(162,2,0,23,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(163,2,0,24,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(164,2,0,25,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(165,2,0,26,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(166,2,0,27,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(167,2,0,28,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(168,2,0,29,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(169,2,0,30,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(170,2,0,31,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(171,2,0,32,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(172,2,0,33,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(173,2,0,34,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(174,2,0,35,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(175,2,0,36,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(176,2,0,37,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(177,2,0,38,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(178,2,0,39,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(179,2,0,40,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(180,2,0,41,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(181,2,0,42,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(182,2,0,43,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(183,2,0,44,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(184,2,0,45,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(185,2,0,46,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(186,2,0,47,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(187,2,0,48,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(188,2,0,49,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(189,2,0,50,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(190,2,0,51,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(191,2,0,52,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(192,2,0,53,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(193,2,0,54,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(194,2,0,55,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(195,2,0,56,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(196,2,0,57,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(197,2,0,58,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(198,2,0,59,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(199,2,0,60,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(200,2,0,61,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(201,2,0,62,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(202,2,0,63,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(203,2,0,64,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(204,2,0,65,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(205,2,0,66,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(206,2,0,67,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(207,2,0,68,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(208,2,0,69,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(209,2,0,70,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(210,2,0,71,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(211,2,0,72,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(212,2,0,73,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(213,2,0,74,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(214,2,0,75,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(215,2,0,76,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(216,2,0,77,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(217,2,0,78,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(218,2,0,79,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(219,2,0,80,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(220,2,0,81,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(221,2,0,82,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(222,2,0,83,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(223,2,0,84,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(224,2,0,85,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(225,2,0,86,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(226,2,0,87,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(227,2,0,88,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(228,2,0,89,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(229,2,0,90,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(230,2,0,91,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(231,2,0,92,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(232,2,0,93,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(233,2,0,94,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(234,2,0,95,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(235,2,0,96,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(236,2,0,97,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(237,2,0,98,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(238,2,0,99,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(239,2,0,100,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(240,2,0,101,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(241,2,0,102,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(242,2,0,103,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(243,2,0,104,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(244,2,0,105,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(245,2,0,106,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(246,2,0,107,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(247,2,0,108,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(248,2,0,109,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(249,2,0,110,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(250,2,0,111,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(251,2,0,112,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(252,2,0,113,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(253,2,0,114,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(254,2,0,115,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(255,2,0,116,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(256,2,0,117,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(257,2,0,118,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(258,2,0,119,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(259,2,0,120,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(260,2,0,121,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(261,2,0,122,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(262,2,0,123,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(263,2,0,124,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(264,2,0,125,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(265,2,0,126,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(266,2,0,127,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(267,2,0,128,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(268,2,0,129,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(269,2,0,130,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(270,2,0,131,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(271,2,0,132,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(272,2,0,133,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(273,2,0,134,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(274,2,0,135,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(275,2,0,136,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(276,2,0,137,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(277,2,0,138,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(278,2,0,139,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(279,3,0,1,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(280,3,0,2,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(281,3,0,3,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(282,3,0,4,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(283,3,0,5,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(284,3,0,6,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(285,3,0,7,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(286,3,0,8,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(287,3,0,9,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(288,3,0,10,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(289,3,0,11,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(290,3,0,12,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(291,3,0,13,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(292,3,0,14,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(293,3,0,15,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(294,3,0,16,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(295,3,0,17,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(296,3,0,18,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(297,3,0,19,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(298,3,0,20,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(299,3,0,21,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(300,3,0,22,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(301,3,0,23,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(302,3,0,24,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(303,3,0,25,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(304,3,0,26,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(305,3,0,27,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(306,3,0,28,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(307,3,0,29,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(308,3,0,30,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(309,3,0,31,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(310,3,0,32,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(311,3,0,33,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(312,3,0,34,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(313,3,0,35,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(314,3,0,36,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(315,3,0,37,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(316,3,0,38,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(317,3,0,39,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(318,3,0,40,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(319,3,0,41,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(320,3,0,42,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(321,3,0,43,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(322,3,0,44,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(323,3,0,45,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(324,3,0,46,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(325,3,0,47,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(326,3,0,48,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(327,3,0,49,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(328,3,0,50,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(329,3,0,51,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(330,3,0,52,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(331,3,0,53,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(332,3,0,54,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(333,3,0,55,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(334,3,0,56,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(335,3,0,57,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(336,3,0,58,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(337,3,0,59,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(338,3,0,60,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(339,3,0,61,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(340,3,0,62,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(341,3,0,63,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(342,3,0,64,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(343,3,0,65,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(344,3,0,66,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(345,3,0,67,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(346,3,0,68,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(347,3,0,69,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(348,3,0,70,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(349,3,0,71,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(350,3,0,72,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(351,3,0,73,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(352,3,0,74,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(353,3,0,75,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(354,3,0,76,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(355,3,0,77,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(356,3,0,78,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(357,3,0,79,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(358,3,0,80,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(359,3,0,81,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(360,3,0,82,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(361,3,0,83,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(362,3,0,84,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(363,3,0,85,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(364,3,0,86,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(365,3,0,87,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(366,3,0,88,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(367,3,0,89,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(368,3,0,90,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(369,3,0,91,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(370,3,0,92,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(371,3,0,93,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(372,3,0,94,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(373,3,0,95,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(374,3,0,96,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(375,3,0,97,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(376,3,0,98,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(377,3,0,99,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(378,3,0,100,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(379,3,0,101,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(380,3,0,102,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(381,3,0,103,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(382,3,0,104,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(383,3,0,105,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(384,3,0,106,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(385,3,0,107,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(386,3,0,108,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(387,3,0,109,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(388,3,0,110,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(389,3,0,111,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(390,3,0,112,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(391,3,0,113,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(392,3,0,114,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(393,3,0,115,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(394,3,0,116,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(395,3,0,117,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(396,3,0,118,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(397,3,0,119,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(398,3,0,120,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(399,3,0,121,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(400,3,0,122,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(401,3,0,123,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(402,3,0,124,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(403,3,0,125,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(404,3,0,126,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(405,3,0,127,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(406,3,0,128,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(407,3,0,129,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(408,3,0,130,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(409,3,0,131,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(410,3,0,132,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(411,3,0,133,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(412,3,0,134,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(413,3,0,135,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(414,3,0,136,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(415,3,0,137,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(416,3,0,138,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(417,3,0,139,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(418,4,0,1,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(419,4,0,2,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(420,4,0,3,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(421,4,0,4,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(422,4,0,5,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(423,4,0,6,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(424,4,0,7,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(425,4,0,8,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(426,4,0,9,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(427,4,0,10,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(428,4,0,11,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(429,4,0,12,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(430,4,0,13,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(431,4,0,14,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(432,4,0,15,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(433,4,0,16,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(434,4,0,17,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(435,4,0,18,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(436,4,0,19,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(437,4,0,20,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(438,4,0,21,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(439,4,0,22,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(440,4,0,23,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(441,4,0,24,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(442,4,0,25,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(443,4,0,26,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(444,4,0,27,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(445,4,0,28,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(446,4,0,29,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(447,4,0,30,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(448,4,0,31,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(449,4,0,32,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(450,4,0,33,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(451,4,0,34,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(452,4,0,35,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(453,4,0,36,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(454,4,0,37,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(455,4,0,38,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(456,4,0,39,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(457,4,0,40,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(458,4,0,41,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(459,4,0,42,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(460,4,0,43,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(461,4,0,44,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(462,4,0,45,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(463,4,0,46,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(464,4,0,47,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(465,4,0,48,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(466,4,0,49,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(467,4,0,50,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(468,4,0,51,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(469,4,0,52,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(470,4,0,53,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(471,4,0,54,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(472,4,0,55,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(473,4,0,56,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(474,4,0,57,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(475,4,0,58,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(476,4,0,59,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(477,4,0,60,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(478,4,0,61,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(479,4,0,62,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(480,4,0,63,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(481,4,0,64,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(482,4,0,65,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(483,4,0,66,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(484,4,0,67,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(485,4,0,68,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(486,4,0,69,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(487,4,0,70,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(488,4,0,71,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(489,4,0,72,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(490,4,0,73,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(491,4,0,74,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(492,4,0,75,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(493,4,0,76,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(494,4,0,77,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(495,4,0,78,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(496,4,0,79,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(497,4,0,80,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(498,4,0,81,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(499,4,0,82,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(500,4,0,83,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(501,4,0,84,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(502,4,0,85,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(503,4,0,86,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(504,4,0,87,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(505,4,0,88,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(506,4,0,89,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(507,4,0,90,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(508,4,0,91,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(509,4,0,92,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(510,4,0,93,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(511,4,0,94,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(512,4,0,95,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(513,4,0,96,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(514,4,0,97,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(515,4,0,98,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(516,4,0,99,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(517,4,0,100,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(518,4,0,101,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(519,4,0,102,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(520,4,0,103,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(521,4,0,104,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(522,4,0,105,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(523,4,0,106,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(524,4,0,107,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(525,4,0,108,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(526,4,0,109,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(527,4,0,110,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(528,4,0,111,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(529,4,0,112,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(530,4,0,113,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(531,4,0,114,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(532,4,0,115,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(533,4,0,116,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(534,4,0,117,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(535,4,0,118,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(536,4,0,119,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(537,4,0,120,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(538,4,0,121,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(539,4,0,122,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(540,4,0,123,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(541,4,0,124,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(542,4,0,125,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(543,4,0,126,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(544,4,0,127,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(545,4,0,128,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(546,4,0,129,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(547,4,0,130,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(548,4,0,131,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(549,4,0,132,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(550,4,0,133,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(551,4,0,134,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(552,4,0,135,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(553,4,0,136,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(554,4,0,137,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(555,4,0,138,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(556,4,0,139,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(557,5,0,1,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(558,5,0,2,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(559,5,0,3,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(560,5,0,4,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(561,5,0,5,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(562,5,0,6,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(563,5,0,7,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(564,5,0,8,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(565,5,0,9,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(566,5,0,10,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(567,5,0,11,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(568,5,0,12,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(569,5,0,13,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(570,5,0,14,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(571,5,0,15,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(572,5,0,16,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(573,5,0,17,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(574,5,0,18,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(575,5,0,19,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(576,5,0,20,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(577,5,0,21,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(578,5,0,22,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(579,5,0,23,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(580,5,0,24,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(581,5,0,25,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(582,5,0,26,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(583,5,0,27,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(584,5,0,28,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(585,5,0,29,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(586,5,0,30,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(587,5,0,31,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(588,5,0,32,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(589,5,0,33,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(590,5,0,34,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(591,5,0,35,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(592,5,0,36,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(593,5,0,37,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(594,5,0,38,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(595,5,0,39,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(596,5,0,40,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(597,5,0,41,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(598,5,0,42,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(599,5,0,43,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(600,5,0,44,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(601,5,0,45,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(602,5,0,46,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(603,5,0,47,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(604,5,0,48,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(605,5,0,49,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(606,5,0,50,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(607,5,0,51,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(608,5,0,52,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(609,5,0,53,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(610,5,0,54,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(611,5,0,55,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(612,5,0,56,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(613,5,0,57,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(614,5,0,58,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(615,5,0,59,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(616,5,0,60,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(617,5,0,61,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(618,5,0,62,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(619,5,0,63,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(620,5,0,64,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(621,5,0,65,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(622,5,0,66,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(623,5,0,67,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(624,5,0,68,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(625,5,0,69,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(626,5,0,70,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(627,5,0,71,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(628,5,0,72,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(629,5,0,73,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(630,5,0,74,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(631,5,0,75,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(632,5,0,76,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(633,5,0,77,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(634,5,0,78,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(635,5,0,79,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(636,5,0,80,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(637,5,0,81,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(638,5,0,82,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(639,5,0,83,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(640,5,0,84,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(641,5,0,85,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(642,5,0,86,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(643,5,0,87,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(644,5,0,88,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(645,5,0,89,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(646,5,0,90,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(647,5,0,91,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(648,5,0,92,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(649,5,0,93,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(650,5,0,94,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(651,5,0,95,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(652,5,0,96,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(653,5,0,97,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(654,5,0,98,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(655,5,0,99,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(656,5,0,100,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(657,5,0,101,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(658,5,0,102,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(659,5,0,103,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(660,5,0,104,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(661,5,0,105,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(662,5,0,106,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(663,5,0,107,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(664,5,0,108,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(665,5,0,109,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(666,5,0,110,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(667,5,0,111,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(668,5,0,112,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(669,5,0,113,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(670,5,0,114,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(671,5,0,115,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(672,5,0,116,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(673,5,0,117,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(674,5,0,118,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(675,5,0,119,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(676,5,0,120,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(677,5,0,121,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(678,5,0,122,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(679,5,0,123,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(680,5,0,124,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(681,5,0,125,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(682,5,0,126,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(683,5,0,127,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(684,5,0,128,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(685,5,0,129,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(686,5,0,130,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(687,5,0,131,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(688,5,0,132,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(689,5,0,133,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(690,5,0,134,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(691,5,0,135,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(692,5,0,136,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(693,5,0,137,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(694,5,0,138,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(695,5,0,139,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(696,6,0,1,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(697,6,0,2,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(698,6,0,3,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(699,6,0,4,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(700,6,0,5,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(701,6,0,6,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(702,6,0,7,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(703,6,0,8,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(704,6,0,9,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(705,6,0,10,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(706,6,0,11,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(707,6,0,12,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(708,6,0,13,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(709,6,0,14,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(710,6,0,15,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(711,6,0,16,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(712,6,0,17,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(713,6,0,18,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(714,6,0,19,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(715,6,0,20,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(716,6,0,21,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(717,6,0,22,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(718,6,0,23,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(719,6,0,24,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(720,6,0,25,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(721,6,0,26,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(722,6,0,27,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(723,6,0,28,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(724,6,0,29,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(725,6,0,30,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(726,6,0,31,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(727,6,0,32,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(728,6,0,33,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(729,6,0,34,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(730,6,0,35,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(731,6,0,36,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(732,6,0,37,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(733,6,0,38,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(734,6,0,39,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(735,6,0,40,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(736,6,0,41,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(737,6,0,42,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(738,6,0,43,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(739,6,0,44,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(740,6,0,45,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(741,6,0,46,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(742,6,0,47,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(743,6,0,48,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(744,6,0,49,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(745,6,0,50,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(746,6,0,51,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(747,6,0,52,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(748,6,0,53,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(749,6,0,54,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(750,6,0,55,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(751,6,0,56,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(752,6,0,57,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(753,6,0,58,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(754,6,0,59,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(755,6,0,60,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(756,6,0,61,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(757,6,0,62,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(758,6,0,63,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(759,6,0,64,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(760,6,0,65,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(761,6,0,66,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(762,6,0,67,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(763,6,0,68,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(764,6,0,69,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(765,6,0,70,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(766,6,0,71,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(767,6,0,72,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(768,6,0,73,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(769,6,0,74,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(770,6,0,75,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(771,6,0,76,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(772,6,0,77,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(773,6,0,78,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(774,6,0,79,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(775,6,0,80,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(776,6,0,81,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(777,6,0,82,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(778,6,0,83,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(779,6,0,84,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(780,6,0,85,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(781,6,0,86,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(782,6,0,87,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(783,6,0,88,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(784,6,0,89,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(785,6,0,90,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(786,6,0,91,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(787,6,0,92,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(788,6,0,93,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(789,6,0,94,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(790,6,0,95,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(791,6,0,96,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(792,6,0,97,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(793,6,0,98,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(794,6,0,99,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(795,6,0,100,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(796,6,0,101,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(797,6,0,102,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(798,6,0,103,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(799,6,0,104,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(800,6,0,105,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(801,6,0,106,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(802,6,0,107,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(803,6,0,108,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(804,6,0,109,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(805,6,0,110,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(806,6,0,111,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(807,6,0,112,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(808,6,0,113,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(809,6,0,114,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(810,6,0,115,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(811,6,0,116,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(812,6,0,117,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(813,6,0,118,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(814,6,0,119,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(815,6,0,120,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(816,6,0,121,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(817,6,0,122,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(818,6,0,123,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(819,6,0,124,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(820,6,0,125,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(821,6,0,126,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(822,6,0,127,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(823,6,0,128,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(824,6,0,129,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(825,6,0,130,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(826,6,0,131,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(827,6,0,132,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(828,6,0,133,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(829,6,0,134,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(830,6,0,135,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(831,6,0,136,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(832,6,0,137,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(833,6,0,138,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(834,6,0,139,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(835,7,0,1,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(836,7,0,2,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(837,7,0,3,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(838,7,0,4,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(839,7,0,5,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(840,7,0,6,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(841,7,0,7,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(842,7,0,8,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(843,7,0,9,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(844,7,0,10,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(845,7,0,11,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(846,7,0,12,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(847,7,0,13,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(848,7,0,14,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(849,7,0,15,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(850,7,0,16,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(851,7,0,17,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(852,7,0,18,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(853,7,0,19,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(854,7,0,20,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(855,7,0,21,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(856,7,0,22,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(857,7,0,23,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(858,7,0,24,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(859,7,0,25,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(860,7,0,26,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(861,7,0,27,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(862,7,0,28,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(863,7,0,29,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(864,7,0,30,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(865,7,0,31,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(866,7,0,32,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(867,7,0,33,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(868,7,0,34,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(869,7,0,35,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(870,7,0,36,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(871,7,0,37,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(872,7,0,38,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(873,7,0,39,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(874,7,0,40,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(875,7,0,41,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(876,7,0,42,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(877,7,0,43,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(878,7,0,44,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(879,7,0,45,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(880,7,0,46,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(881,7,0,47,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(882,7,0,48,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(883,7,0,49,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(884,7,0,50,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(885,7,0,51,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(886,7,0,52,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(887,7,0,53,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(888,7,0,54,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(889,7,0,55,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(890,7,0,56,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(891,7,0,57,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(892,7,0,58,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(893,7,0,59,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(894,7,0,60,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(895,7,0,61,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(896,7,0,62,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(897,7,0,63,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(898,7,0,64,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(899,7,0,65,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(900,7,0,66,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(901,7,0,67,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(902,7,0,68,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(903,7,0,69,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(904,7,0,70,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(905,7,0,71,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(906,7,0,72,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(907,7,0,73,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(908,7,0,74,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(909,7,0,75,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(910,7,0,76,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(911,7,0,77,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(912,7,0,78,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(913,7,0,79,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(914,7,0,80,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(915,7,0,81,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(916,7,0,82,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(917,7,0,83,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(918,7,0,84,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(919,7,0,85,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(920,7,0,86,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(921,7,0,87,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(922,7,0,88,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(923,7,0,89,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(924,7,0,90,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(925,7,0,91,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(926,7,0,92,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(927,7,0,93,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(928,7,0,94,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(929,7,0,95,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(930,7,0,96,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(931,7,0,97,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(932,7,0,98,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(933,7,0,99,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(934,7,0,100,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(935,7,0,101,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(936,7,0,102,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(937,7,0,103,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(938,7,0,104,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(939,7,0,105,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(940,7,0,106,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(941,7,0,107,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(942,7,0,108,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(943,7,0,109,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(944,7,0,110,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(945,7,0,111,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(946,7,0,112,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(947,7,0,113,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(948,7,0,114,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(949,7,0,115,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(950,7,0,116,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(951,7,0,117,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(952,7,0,118,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(953,7,0,119,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(954,7,0,120,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(955,7,0,121,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(956,7,0,122,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(957,7,0,123,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(958,7,0,124,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(959,7,0,125,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(960,7,0,126,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(961,7,0,127,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(962,7,0,128,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(963,7,0,129,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(964,7,0,130,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(965,7,0,131,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(966,7,0,132,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(967,7,0,133,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(968,7,0,134,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(969,7,0,135,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(970,7,0,136,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(971,7,0,137,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(972,7,0,138,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(973,7,0,139,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(974,8,0,1,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(975,8,0,2,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(976,8,0,3,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(977,8,0,4,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(978,8,0,5,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(979,8,0,6,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(980,8,0,7,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(981,8,0,8,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(982,8,0,9,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(983,8,0,10,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(984,8,0,11,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(985,8,0,12,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(986,8,0,13,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(987,8,0,14,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(988,8,0,15,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(989,8,0,16,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(990,8,0,17,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(991,8,0,18,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(992,8,0,19,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(993,8,0,20,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(994,8,0,21,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(995,8,0,22,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(996,8,0,23,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(997,8,0,24,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(998,8,0,25,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(999,8,0,26,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1000,8,0,27,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1001,8,0,28,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1002,8,0,29,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1003,8,0,30,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1004,8,0,31,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1005,8,0,32,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1006,8,0,33,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1007,8,0,34,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1008,8,0,35,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1009,8,0,36,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1010,8,0,37,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1011,8,0,38,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1012,8,0,39,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1013,8,0,40,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1014,8,0,41,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1015,8,0,42,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1016,8,0,43,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1017,8,0,44,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1018,8,0,45,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1019,8,0,46,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1020,8,0,47,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1021,8,0,48,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1022,8,0,49,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1023,8,0,50,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1024,8,0,51,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1025,8,0,52,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1026,8,0,53,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1027,8,0,54,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1028,8,0,55,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1029,8,0,56,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1030,8,0,57,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1031,8,0,58,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1032,8,0,59,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1033,8,0,60,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1034,8,0,61,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1035,8,0,62,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1036,8,0,63,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1037,8,0,64,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1038,8,0,65,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1039,8,0,66,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1040,8,0,67,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1041,8,0,68,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1042,8,0,69,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1043,8,0,70,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1044,8,0,71,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1045,8,0,72,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1046,8,0,73,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1047,8,0,74,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1048,8,0,75,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1049,8,0,76,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1050,8,0,77,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1051,8,0,78,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1052,8,0,79,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1053,8,0,80,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1054,8,0,81,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1055,8,0,82,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1056,8,0,83,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1057,8,0,84,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1058,8,0,85,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1059,8,0,86,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1060,8,0,87,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1061,8,0,88,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1062,8,0,89,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1063,8,0,90,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1064,8,0,91,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1065,8,0,92,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1066,8,0,93,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1067,8,0,94,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1068,8,0,95,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1069,8,0,96,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1070,8,0,97,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1071,8,0,98,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1072,8,0,99,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1073,8,0,100,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1074,8,0,101,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1075,8,0,102,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1076,8,0,103,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1077,8,0,104,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1078,8,0,105,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1079,8,0,106,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1080,8,0,107,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1081,8,0,108,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1082,8,0,109,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1083,8,0,110,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1084,8,0,111,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1085,8,0,112,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1086,8,0,113,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1087,8,0,114,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1088,8,0,115,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1089,8,0,116,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1090,8,0,117,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1091,8,0,118,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1092,8,0,119,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1093,8,0,120,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1094,8,0,121,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1095,8,0,122,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1096,8,0,123,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1097,8,0,124,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1098,8,0,125,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1099,8,0,126,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1100,8,0,127,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1101,8,0,128,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1102,8,0,129,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1103,8,0,130,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1104,8,0,131,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1105,8,0,132,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1106,8,0,133,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1107,8,0,134,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1108,8,0,135,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1109,8,0,136,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1110,8,0,137,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1111,8,0,138,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1112,8,0,139,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1113,9,0,1,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1114,9,0,2,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1115,9,0,3,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1116,9,0,4,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1117,9,0,5,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1118,9,0,6,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1119,9,0,7,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1120,9,0,8,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1121,9,0,9,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1122,9,0,10,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1123,9,0,11,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1124,9,0,12,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1125,9,0,13,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1126,9,0,14,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1127,9,0,15,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1128,9,0,16,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1129,9,0,17,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1130,9,0,18,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1131,9,0,19,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1132,9,0,20,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1133,9,0,21,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1134,9,0,22,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1135,9,0,23,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1136,9,0,24,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1137,9,0,25,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1138,9,0,26,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1139,9,0,27,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1140,9,0,28,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1141,9,0,29,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1142,9,0,30,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1143,9,0,31,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1144,9,0,32,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1145,9,0,33,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1146,9,0,34,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1147,9,0,35,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1148,9,0,36,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1149,9,0,37,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1150,9,0,38,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1151,9,0,39,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1152,9,0,40,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1153,9,0,41,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1154,9,0,42,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1155,9,0,43,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1156,9,0,44,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1157,9,0,45,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1158,9,0,46,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1159,9,0,47,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1160,9,0,48,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1161,9,0,49,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1162,9,0,50,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1163,9,0,51,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1164,9,0,52,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1165,9,0,53,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1166,9,0,54,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1167,9,0,55,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1168,9,0,56,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1169,9,0,57,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1170,9,0,58,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1171,9,0,59,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1172,9,0,60,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1173,9,0,61,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1174,9,0,62,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1175,9,0,63,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1176,9,0,64,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1177,9,0,65,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1178,9,0,66,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1179,9,0,67,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1180,9,0,68,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1181,9,0,69,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1182,9,0,70,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1183,9,0,71,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1184,9,0,72,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1185,9,0,73,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1186,9,0,74,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1187,9,0,75,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1188,9,0,76,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1189,9,0,77,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1190,9,0,78,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1191,9,0,79,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1192,9,0,80,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1193,9,0,81,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1194,9,0,82,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1195,9,0,83,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1196,9,0,84,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1197,9,0,85,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1198,9,0,86,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1199,9,0,87,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1200,9,0,88,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1201,9,0,89,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1202,9,0,90,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1203,9,0,91,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1204,9,0,92,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1205,9,0,93,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1206,9,0,94,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1207,9,0,95,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1208,9,0,96,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1209,9,0,97,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1210,9,0,98,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1211,9,0,99,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1212,9,0,100,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1213,9,0,101,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1214,9,0,102,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1215,9,0,103,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1216,9,0,104,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1217,9,0,105,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1218,9,0,106,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1219,9,0,107,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1220,9,0,108,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1221,9,0,109,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1222,9,0,110,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1223,9,0,111,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1224,9,0,112,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1225,9,0,113,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1226,9,0,114,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1227,9,0,115,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1228,9,0,116,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1229,9,0,117,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1230,9,0,118,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1231,9,0,119,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1232,9,0,120,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1233,9,0,121,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1234,9,0,122,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1235,9,0,123,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1236,9,0,124,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1237,9,0,125,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1238,9,0,126,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1239,9,0,127,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1240,9,0,128,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1241,9,0,129,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1242,9,0,130,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1243,9,0,131,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1244,9,0,132,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1245,9,0,133,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1246,9,0,134,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1247,9,0,135,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1248,9,0,136,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1249,9,0,137,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1250,9,0,138,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1251,9,0,139,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1252,10,0,1,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1253,10,0,2,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1254,10,0,3,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1255,10,0,4,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1256,10,0,5,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1257,10,0,6,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1258,10,0,7,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1259,10,0,8,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1260,10,0,9,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1261,10,0,10,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1262,10,0,11,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1263,10,0,12,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1264,10,0,13,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1265,10,0,14,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1266,10,0,15,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1267,10,0,16,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1268,10,0,17,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1269,10,0,18,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1270,10,0,19,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1271,10,0,20,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1272,10,0,21,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1273,10,0,22,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1274,10,0,23,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1275,10,0,24,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1276,10,0,25,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1277,10,0,26,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1278,10,0,27,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1279,10,0,28,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1280,10,0,29,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1281,10,0,30,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1282,10,0,31,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1283,10,0,32,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1284,10,0,33,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1285,10,0,34,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1286,10,0,35,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1287,10,0,36,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1288,10,0,37,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1289,10,0,38,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1290,10,0,39,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1291,10,0,40,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1292,10,0,41,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1293,10,0,42,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1294,10,0,43,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1295,10,0,44,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1296,10,0,45,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1297,10,0,46,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1298,10,0,47,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1299,10,0,48,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1300,10,0,49,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1301,10,0,50,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1302,10,0,51,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1303,10,0,52,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1304,10,0,53,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1305,10,0,54,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1306,10,0,55,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1307,10,0,56,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1308,10,0,57,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1309,10,0,58,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1310,10,0,59,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1311,10,0,60,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1312,10,0,61,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1313,10,0,62,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1314,10,0,63,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1315,10,0,64,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1316,10,0,65,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1317,10,0,66,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1318,10,0,67,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1319,10,0,68,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1320,10,0,69,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1321,10,0,70,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1322,10,0,71,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1323,10,0,72,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1324,10,0,73,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1325,10,0,74,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1326,10,0,75,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1327,10,0,76,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1328,10,0,77,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1329,10,0,78,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1330,10,0,79,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1331,10,0,80,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1332,10,0,81,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1333,10,0,82,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1334,10,0,83,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1335,10,0,84,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1336,10,0,85,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1337,10,0,86,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1338,10,0,87,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1339,10,0,88,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1340,10,0,89,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1341,10,0,90,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1342,10,0,91,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1343,10,0,92,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1344,10,0,93,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1345,10,0,94,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1346,10,0,95,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1347,10,0,96,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1348,10,0,97,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1349,10,0,98,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1350,10,0,99,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1351,10,0,100,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1352,10,0,101,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1353,10,0,102,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1354,10,0,103,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1355,10,0,104,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1356,10,0,105,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1357,10,0,106,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1358,10,0,107,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1359,10,0,108,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1360,10,0,109,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1361,10,0,110,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1362,10,0,111,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1363,10,0,112,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1364,10,0,113,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1365,10,0,114,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1366,10,0,115,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1367,10,0,116,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1368,10,0,117,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1369,10,0,118,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1370,10,0,119,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1371,10,0,120,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1372,10,0,121,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1373,10,0,122,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1374,10,0,123,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1375,10,0,124,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1376,10,0,125,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1377,10,0,126,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1378,10,0,127,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1379,10,0,128,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1380,10,0,129,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1381,10,0,130,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1382,10,0,131,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1383,10,0,132,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1384,10,0,133,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1385,10,0,134,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1386,10,0,135,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1387,10,0,136,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1388,10,0,137,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1389,10,0,138,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1390,10,0,139,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1391,11,0,1,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1392,11,0,2,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1393,11,0,3,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1394,11,0,4,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1395,11,0,5,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1396,11,0,6,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1397,11,0,7,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1398,11,0,8,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1399,11,0,9,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1400,11,0,10,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1401,11,0,11,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1402,11,0,12,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1403,11,0,13,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1404,11,0,14,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1405,11,0,15,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1406,11,0,16,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1407,11,0,17,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1408,11,0,18,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1409,11,0,19,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1410,11,0,20,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1411,11,0,21,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1412,11,0,22,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1413,11,0,23,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1414,11,0,24,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1415,11,0,25,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1416,11,0,26,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1417,11,0,27,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1418,11,0,28,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1419,11,0,29,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1420,11,0,30,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1421,11,0,31,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1422,11,0,32,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1423,11,0,33,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1424,11,0,34,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1425,11,0,35,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1426,11,0,36,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1427,11,0,37,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1428,11,0,38,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1429,11,0,39,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1430,11,0,40,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1431,11,0,41,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1432,11,0,42,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1433,11,0,43,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1434,11,0,44,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1435,11,0,45,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1436,11,0,46,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1437,11,0,47,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1438,11,0,48,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1439,11,0,49,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1440,11,0,50,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1441,11,0,51,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1442,11,0,52,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1443,11,0,53,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1444,11,0,54,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1445,11,0,55,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1446,11,0,56,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1447,11,0,57,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1448,11,0,58,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1449,11,0,59,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1450,11,0,60,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1451,11,0,61,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1452,11,0,62,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1453,11,0,63,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1454,11,0,64,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1455,11,0,65,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1456,11,0,66,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1457,11,0,67,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1458,11,0,68,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1459,11,0,69,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1460,11,0,70,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1461,11,0,71,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1462,11,0,72,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1463,11,0,73,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1464,11,0,74,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1465,11,0,75,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1466,11,0,76,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1467,11,0,77,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1468,11,0,78,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1469,11,0,79,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1470,11,0,80,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1471,11,0,81,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1472,11,0,82,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1473,11,0,83,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1474,11,0,84,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1475,11,0,85,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1476,11,0,86,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1477,11,0,87,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1478,11,0,88,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1479,11,0,89,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1480,11,0,90,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1481,11,0,91,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1482,11,0,92,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1483,11,0,93,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1484,11,0,94,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1485,11,0,95,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1486,11,0,96,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1487,11,0,97,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1488,11,0,98,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1489,11,0,99,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1490,11,0,100,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1491,11,0,101,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1492,11,0,102,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1493,11,0,103,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1494,11,0,104,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1495,11,0,105,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1496,11,0,106,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1497,11,0,107,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1498,11,0,108,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1499,11,0,109,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1500,11,0,110,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1501,11,0,111,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1502,11,0,112,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1503,11,0,113,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1504,11,0,114,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1505,11,0,115,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1506,11,0,116,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1507,11,0,117,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1508,11,0,118,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1509,11,0,119,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1510,11,0,120,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1511,11,0,121,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1512,11,0,122,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1513,11,0,123,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1514,11,0,124,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1515,11,0,125,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1516,11,0,126,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1517,11,0,127,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1518,11,0,128,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1519,11,0,129,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1520,11,0,130,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1521,11,0,131,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1522,11,0,132,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1523,11,0,133,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1524,11,0,134,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1525,11,0,135,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1526,11,0,136,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1527,11,0,137,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1528,11,0,138,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1529,11,0,139,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1530,12,0,1,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1531,12,0,2,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1532,12,0,3,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1533,12,0,4,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1534,12,0,5,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1535,12,0,6,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1536,12,0,7,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1537,12,0,8,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1538,12,0,9,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1539,12,0,10,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1540,12,0,11,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1541,12,0,12,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1542,12,0,13,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1543,12,0,14,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1544,12,0,15,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1545,12,0,16,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1546,12,0,17,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1547,12,0,18,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1548,12,0,19,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1549,12,0,20,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1550,12,0,21,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1551,12,0,22,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1552,12,0,23,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1553,12,0,24,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1554,12,0,25,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1555,12,0,26,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1556,12,0,27,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1557,12,0,28,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1558,12,0,29,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1559,12,0,30,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1560,12,0,31,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1561,12,0,32,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1562,12,0,33,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1563,12,0,34,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1564,12,0,35,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1565,12,0,36,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1566,12,0,37,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1567,12,0,38,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1568,12,0,39,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1569,12,0,40,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1570,12,0,41,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1571,12,0,42,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1572,12,0,43,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1573,12,0,44,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1574,12,0,45,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1575,12,0,46,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1576,12,0,47,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1577,12,0,48,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1578,12,0,49,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1579,12,0,50,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1580,12,0,51,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1581,12,0,52,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1582,12,0,53,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1583,12,0,54,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1584,12,0,55,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1585,12,0,56,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1586,12,0,57,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1587,12,0,58,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1588,12,0,59,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1589,12,0,60,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1590,12,0,61,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1591,12,0,62,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1592,12,0,63,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1593,12,0,64,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1594,12,0,65,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1595,12,0,66,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1596,12,0,67,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1597,12,0,68,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1598,12,0,69,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1599,12,0,70,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1600,12,0,71,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1601,12,0,72,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1602,12,0,73,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1603,12,0,74,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1604,12,0,75,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1605,12,0,76,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1606,12,0,77,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1607,12,0,78,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1608,12,0,79,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1609,12,0,80,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1610,12,0,81,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1611,12,0,82,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1612,12,0,83,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1613,12,0,84,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1614,12,0,85,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1615,12,0,86,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1616,12,0,87,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1617,12,0,88,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1618,12,0,89,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1619,12,0,90,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1620,12,0,91,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1621,12,0,92,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1622,12,0,93,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1623,12,0,94,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1624,12,0,95,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1625,12,0,96,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1626,12,0,97,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1627,12,0,98,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1628,12,0,99,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1629,12,0,100,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1630,12,0,101,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1631,12,0,102,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1632,12,0,103,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1633,12,0,104,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1634,12,0,105,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1635,12,0,106,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1636,12,0,107,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1637,12,0,108,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1638,12,0,109,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1639,12,0,110,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1640,12,0,111,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1641,12,0,112,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1642,12,0,113,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1643,12,0,114,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1644,12,0,115,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1645,12,0,116,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1646,12,0,117,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1647,12,0,118,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1648,12,0,119,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1649,12,0,120,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1650,12,0,121,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1651,12,0,122,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1652,12,0,123,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1653,12,0,124,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1654,12,0,125,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1655,12,0,126,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1656,12,0,127,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1657,12,0,128,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1658,12,0,129,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1659,12,0,130,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1660,12,0,131,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1661,12,0,132,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1662,12,0,133,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1663,12,0,134,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1664,12,0,135,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1665,12,0,136,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1666,12,0,137,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1667,12,0,138,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1668,12,0,139,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1669,13,0,1,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1670,13,0,2,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1671,13,0,3,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1672,13,0,4,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1673,13,0,5,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1674,13,0,6,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1675,13,0,7,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1676,13,0,8,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1677,13,0,9,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1678,13,0,10,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1679,13,0,11,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1680,13,0,12,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1681,13,0,13,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1682,13,0,14,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1683,13,0,15,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1684,13,0,16,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1685,13,0,17,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1686,13,0,18,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1687,13,0,19,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1688,13,0,20,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1689,13,0,21,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1690,13,0,22,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1691,13,0,23,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1692,13,0,24,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1693,13,0,25,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1694,13,0,26,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1695,13,0,27,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1696,13,0,28,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1697,13,0,29,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1698,13,0,30,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1699,13,0,31,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1700,13,0,32,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1701,13,0,33,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1702,13,0,34,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1703,13,0,35,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1704,13,0,36,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1705,13,0,37,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1706,13,0,38,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1707,13,0,39,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1708,13,0,40,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1709,13,0,41,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1710,13,0,42,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1711,13,0,43,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1712,13,0,44,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1713,13,0,45,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1714,13,0,46,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1715,13,0,47,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1716,13,0,48,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1717,13,0,49,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1718,13,0,50,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1719,13,0,51,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1720,13,0,52,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1721,13,0,53,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1722,13,0,54,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1723,13,0,55,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1724,13,0,56,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1725,13,0,57,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1726,13,0,58,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1727,13,0,59,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1728,13,0,60,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1729,13,0,61,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1730,13,0,62,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1731,13,0,63,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1732,13,0,64,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1733,13,0,65,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1734,13,0,66,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1735,13,0,67,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1736,13,0,68,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1737,13,0,69,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1738,13,0,70,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1739,13,0,71,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1740,13,0,72,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1741,13,0,73,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1742,13,0,74,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1743,13,0,75,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1744,13,0,76,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1745,13,0,77,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1746,13,0,78,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1747,13,0,79,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1748,13,0,80,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1749,13,0,81,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1750,13,0,82,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1751,13,0,83,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1752,13,0,84,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1753,13,0,85,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1754,13,0,86,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1755,13,0,87,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1756,13,0,88,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1757,13,0,89,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1758,13,0,90,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1759,13,0,91,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1760,13,0,92,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1761,13,0,93,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1762,13,0,94,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1763,13,0,95,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1764,13,0,96,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1765,13,0,97,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1766,13,0,98,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1767,13,0,99,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1768,13,0,100,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1769,13,0,101,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1770,13,0,102,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1771,13,0,103,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1772,13,0,104,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1773,13,0,105,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1774,13,0,106,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1775,13,0,107,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1776,13,0,108,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1777,13,0,109,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1778,13,0,110,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1779,13,0,111,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1780,13,0,112,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1781,13,0,113,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1782,13,0,114,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1783,13,0,115,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1784,13,0,116,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1785,13,0,117,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1786,13,0,118,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1787,13,0,119,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1788,13,0,120,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1789,13,0,121,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1790,13,0,122,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1791,13,0,123,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1792,13,0,124,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1793,13,0,125,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1794,13,0,126,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1795,13,0,127,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1796,13,0,128,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1797,13,0,129,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1798,13,0,130,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1799,13,0,131,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1800,13,0,132,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1801,13,0,133,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1802,13,0,134,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1803,13,0,135,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1804,13,0,136,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1805,13,0,137,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1806,13,0,138,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1807,13,0,139,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1808,14,0,1,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1809,14,0,2,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1810,14,0,3,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1811,14,0,4,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1812,14,0,5,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1813,14,0,6,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1814,14,0,7,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1815,14,0,8,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1816,14,0,9,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1817,14,0,10,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1818,14,0,11,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1819,14,0,12,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1820,14,0,13,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1821,14,0,14,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1822,14,0,15,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1823,14,0,16,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1824,14,0,17,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1825,14,0,18,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1826,14,0,19,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1827,14,0,20,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1828,14,0,21,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1829,14,0,22,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1830,14,0,23,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1831,14,0,24,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1832,14,0,25,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1833,14,0,26,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1834,14,0,27,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1835,14,0,28,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1836,14,0,29,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1837,14,0,30,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1838,14,0,31,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1839,14,0,32,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1840,14,0,33,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1841,14,0,34,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1842,14,0,35,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1843,14,0,36,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1844,14,0,37,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1845,14,0,38,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1846,14,0,39,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1847,14,0,40,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1848,14,0,41,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1849,14,0,42,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1850,14,0,43,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1851,14,0,44,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1852,14,0,45,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1853,14,0,46,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1854,14,0,47,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1855,14,0,48,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1856,14,0,49,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1857,14,0,50,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1858,14,0,51,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1859,14,0,52,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1860,14,0,53,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1861,14,0,54,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1862,14,0,55,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1863,14,0,56,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1864,14,0,57,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1865,14,0,58,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1866,14,0,59,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1867,14,0,60,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1868,14,0,61,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1869,14,0,62,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1870,14,0,63,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1871,14,0,64,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1872,14,0,65,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1873,14,0,66,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1874,14,0,67,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1875,14,0,68,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1876,14,0,69,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1877,14,0,70,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1878,14,0,71,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1879,14,0,72,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1880,14,0,73,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1881,14,0,74,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1882,14,0,75,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1883,14,0,76,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1884,14,0,77,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1885,14,0,78,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1886,14,0,79,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1887,14,0,80,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1888,14,0,81,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1889,14,0,82,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1890,14,0,83,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1891,14,0,84,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1892,14,0,85,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1893,14,0,86,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1894,14,0,87,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1895,14,0,88,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1896,14,0,89,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1897,14,0,90,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1898,14,0,91,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1899,14,0,92,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1900,14,0,93,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1901,14,0,94,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1902,14,0,95,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1903,14,0,96,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1904,14,0,97,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1905,14,0,98,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1906,14,0,99,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1907,14,0,100,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1908,14,0,101,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1909,14,0,102,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1910,14,0,103,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1911,14,0,104,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1912,14,0,105,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1913,14,0,106,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1914,14,0,107,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1915,14,0,108,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1916,14,0,109,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1917,14,0,110,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1918,14,0,111,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1919,14,0,112,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1920,14,0,113,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1921,14,0,114,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1922,14,0,115,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1923,14,0,116,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1924,14,0,117,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1925,14,0,118,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1926,14,0,119,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1927,14,0,120,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1928,14,0,121,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1929,14,0,122,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1930,14,0,123,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1931,14,0,124,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1932,14,0,125,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1933,14,0,126,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1934,14,0,127,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1935,14,0,128,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1936,14,0,129,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1937,14,0,130,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1938,14,0,131,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1939,14,0,132,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1940,14,0,133,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1941,14,0,134,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1942,14,0,135,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1943,14,0,136,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1944,14,0,137,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1945,14,0,138,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1946,14,0,139,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1947,15,0,1,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1948,15,0,2,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1949,15,0,3,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1950,15,0,4,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1951,15,0,5,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1952,15,0,6,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1953,15,0,7,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1954,15,0,8,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1955,15,0,9,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1956,15,0,10,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1957,15,0,11,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1958,15,0,12,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1959,15,0,13,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1960,15,0,14,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1961,15,0,15,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1962,15,0,16,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1963,15,0,17,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1964,15,0,18,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1965,15,0,19,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1966,15,0,20,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1967,15,0,21,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1968,15,0,22,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1969,15,0,23,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1970,15,0,24,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1971,15,0,25,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1972,15,0,26,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1973,15,0,27,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1974,15,0,28,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1975,15,0,29,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1976,15,0,30,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1977,15,0,31,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1978,15,0,32,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1979,15,0,33,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1980,15,0,34,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1981,15,0,35,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1982,15,0,36,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1983,15,0,37,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1984,15,0,38,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1985,15,0,39,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1986,15,0,40,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1987,15,0,41,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1988,15,0,42,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1989,15,0,43,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1990,15,0,44,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1991,15,0,45,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1992,15,0,46,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1993,15,0,47,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1994,15,0,48,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1995,15,0,49,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1996,15,0,50,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1997,15,0,51,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1998,15,0,52,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(1999,15,0,53,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2000,15,0,54,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2001,15,0,55,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2002,15,0,56,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2003,15,0,57,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2004,15,0,58,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2005,15,0,59,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2006,15,0,60,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2007,15,0,61,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2008,15,0,62,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2009,15,0,63,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2010,15,0,64,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2011,15,0,65,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2012,15,0,66,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2013,15,0,67,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2014,15,0,68,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2015,15,0,69,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2016,15,0,70,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2017,15,0,71,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2018,15,0,72,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2019,15,0,73,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2020,15,0,74,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2021,15,0,75,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2022,15,0,76,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2023,15,0,77,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2024,15,0,78,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2025,15,0,79,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2026,15,0,80,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2027,15,0,81,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2028,15,0,82,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2029,15,0,83,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2030,15,0,84,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2031,15,0,85,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2032,15,0,86,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2033,15,0,87,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2034,15,0,88,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2035,15,0,89,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2036,15,0,90,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2037,15,0,91,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2038,15,0,92,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2039,15,0,93,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2040,15,0,94,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2041,15,0,95,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2042,15,0,96,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2043,15,0,97,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2044,15,0,98,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2045,15,0,99,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2046,15,0,100,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2047,15,0,101,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2048,15,0,102,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2049,15,0,103,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2050,15,0,104,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2051,15,0,105,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2052,15,0,106,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2053,15,0,107,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2054,15,0,108,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2055,15,0,109,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2056,15,0,110,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2057,15,0,111,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2058,15,0,112,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2059,15,0,113,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2060,15,0,114,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2061,15,0,115,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2062,15,0,116,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2063,15,0,117,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2064,15,0,118,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2065,15,0,119,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2066,15,0,120,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2067,15,0,121,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2068,15,0,122,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2069,15,0,123,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2070,15,0,124,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2071,15,0,125,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2072,15,0,126,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2073,15,0,127,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2074,15,0,128,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2075,15,0,129,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2076,15,0,130,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2077,15,0,131,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2078,15,0,132,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2079,15,0,133,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2080,15,0,134,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2081,15,0,135,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2082,15,0,136,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2083,15,0,137,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2084,15,0,138,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2085,15,0,139,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2086,17,0,1,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2087,17,0,2,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2088,17,0,3,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2089,17,0,4,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2090,17,0,5,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2091,17,0,6,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2092,17,0,7,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2093,17,0,8,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2094,17,0,9,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2095,17,0,10,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2096,17,0,11,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2097,17,0,12,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2098,17,0,13,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2099,17,0,14,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2100,17,0,15,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2101,17,0,16,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2102,17,0,17,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2103,17,0,18,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2104,17,0,19,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2105,17,0,20,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2106,17,0,21,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2107,17,0,22,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2108,17,0,23,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2109,17,0,24,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2110,17,0,25,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2111,17,0,26,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2112,17,0,27,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2113,17,0,28,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2114,17,0,29,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2115,17,0,30,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2116,17,0,31,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2117,17,0,32,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2118,17,0,33,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2119,17,0,34,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2120,17,0,35,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2121,17,0,36,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2122,17,0,37,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2123,17,0,38,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2124,17,0,39,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2125,17,0,40,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2126,17,0,41,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2127,17,0,42,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2128,17,0,43,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2129,17,0,44,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2130,17,0,45,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2131,17,0,46,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2132,17,0,47,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2133,17,0,48,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2134,17,0,49,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2135,17,0,50,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2136,17,0,51,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2137,17,0,52,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2138,17,0,53,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2139,17,0,54,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2140,17,0,55,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2141,17,0,56,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2142,17,0,57,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2143,17,0,58,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2144,17,0,59,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2145,17,0,60,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2146,17,0,61,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2147,17,0,62,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2148,17,0,63,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2149,17,0,64,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2150,17,0,65,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2151,17,0,66,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2152,17,0,67,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2153,17,0,68,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2154,17,0,69,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2155,17,0,70,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2156,17,0,71,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2157,17,0,72,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2158,17,0,73,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2159,17,0,74,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2160,17,0,75,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2161,17,0,76,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2162,17,0,77,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2163,17,0,78,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2164,17,0,79,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2165,17,0,80,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2166,17,0,81,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2167,17,0,82,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2168,17,0,83,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2169,17,0,84,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2170,17,0,85,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2171,17,0,86,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2172,17,0,87,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2173,17,0,88,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2174,17,0,89,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2175,17,0,90,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2176,17,0,91,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2177,17,0,92,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2178,17,0,93,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2179,17,0,94,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2180,17,0,95,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2181,17,0,96,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2182,17,0,97,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2183,17,0,98,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2184,17,0,99,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2185,17,0,100,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2186,17,0,101,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2187,17,0,102,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2188,17,0,103,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2189,17,0,104,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2190,17,0,105,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2191,17,0,106,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2192,17,0,107,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2193,17,0,108,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2194,17,0,109,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2195,17,0,110,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2196,17,0,111,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2197,17,0,112,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2198,17,0,113,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2199,17,0,114,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2200,17,0,115,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2201,17,0,116,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2202,17,0,117,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2203,17,0,118,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2204,17,0,119,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2205,17,0,120,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2206,17,0,121,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2207,17,0,122,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2208,17,0,123,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2209,17,0,124,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2210,17,0,125,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2211,17,0,126,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2212,17,0,127,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2213,17,0,128,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2214,17,0,129,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2215,17,0,130,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2216,17,0,131,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2217,17,0,132,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2218,17,0,133,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2219,17,0,134,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2220,17,0,135,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2221,17,0,136,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2222,17,0,137,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2223,17,0,138,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2224,17,0,139,0,'2021-09-16 23:52:39','2021-09-16 23:52:39'),(2225,1,0,140,1,'2021-09-19 23:25:54','2021-09-19 23:25:54'),(2226,2,0,140,0,'2021-09-19 23:25:54','2021-09-19 23:25:54'),(2227,3,0,140,0,'2021-09-19 23:25:54','2021-09-19 23:25:54'),(2228,4,0,140,0,'2021-09-19 23:25:54','2021-09-19 23:25:54'),(2229,5,0,140,0,'2021-09-19 23:25:54','2021-09-19 23:25:54'),(2230,6,0,140,0,'2021-09-19 23:25:54','2021-09-19 23:25:54'),(2231,7,0,140,0,'2021-09-19 23:25:54','2021-09-19 23:25:54'),(2232,8,0,140,0,'2021-09-19 23:25:54','2021-09-19 23:25:54'),(2233,9,0,140,0,'2021-09-19 23:25:54','2021-09-19 23:25:54'),(2234,10,0,140,0,'2021-09-19 23:25:54','2021-09-19 23:25:54'),(2235,11,0,140,0,'2021-09-19 23:25:54','2021-09-19 23:25:54'),(2236,12,0,140,0,'2021-09-19 23:25:54','2021-09-19 23:25:54'),(2237,13,0,140,0,'2021-09-19 23:25:54','2021-09-19 23:25:54'),(2238,14,0,140,0,'2021-09-19 23:25:54','2021-09-19 23:25:54'),(2239,15,0,140,0,'2021-09-19 23:25:54','2021-09-19 23:25:54'),(2240,17,0,140,0,'2021-09-19 23:25:54','2021-09-19 23:25:54'),(2241,1,0,141,1,'2021-09-22 11:39:27','2021-09-22 11:39:27'),(2242,2,0,141,0,'2021-09-22 11:39:27','2021-09-22 11:39:27'),(2243,3,0,141,0,'2021-09-22 11:39:27','2021-09-22 11:39:27'),(2244,4,0,141,0,'2021-09-22 11:39:27','2021-09-22 11:39:27'),(2245,5,0,141,0,'2021-09-22 11:39:27','2021-09-22 11:39:27'),(2246,6,0,141,0,'2021-09-22 11:39:27','2021-09-22 11:39:27'),(2247,7,0,141,0,'2021-09-22 11:39:27','2021-09-22 11:39:27'),(2248,8,0,141,0,'2021-09-22 11:39:27','2021-09-22 11:39:27'),(2249,9,0,141,0,'2021-09-22 11:39:27','2021-09-22 11:39:27'),(2250,10,0,141,0,'2021-09-22 11:39:27','2021-09-22 11:39:27'),(2251,11,0,141,0,'2021-09-22 11:39:27','2021-09-22 11:39:27'),(2252,12,0,141,0,'2021-09-22 11:39:27','2021-09-22 11:39:27'),(2253,13,0,141,0,'2021-09-22 11:39:27','2021-09-22 11:39:27'),(2254,14,0,141,0,'2021-09-22 11:39:27','2021-09-22 11:39:27'),(2255,15,0,141,0,'2021-09-22 11:39:27','2021-09-22 11:39:27'),(2256,17,0,141,0,'2021-09-22 11:39:27','2021-09-22 11:39:27');
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
) ENGINE=InnoDB AUTO_INCREMENT=2797 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gen_system_notification_tbl`
--

LOCK TABLES `gen_system_notification_tbl` WRITE;
/*!40000 ALTER TABLE `gen_system_notification_tbl` DISABLE KEYS */;
INSERT INTO `gen_system_notification_tbl` VALUES (1,3,58,20,'Official Business Form','1 asked for your approval.',2,0,1,0,'2021-04-11 23:21:20','2021-04-11 23:21:20'),(2,4,58,4,'No Time-in/ Time-out','1 asked for your approval.',2,1,1,0,'2021-04-12 00:05:13','2021-05-14 02:32:49'),(3,4,60,1,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-12 00:28:04','2021-05-14 02:32:49'),(4,4,58,6,'No Time-in/ Time-out','1 asked for your approval.',2,1,1,4,'2021-04-12 00:56:06','2021-04-15 07:37:12'),(5,3,58,24,'Official Business Form','6 asked for your approval.',2,0,6,0,'2021-04-12 02:46:35','2021-04-12 02:46:35'),(6,3,58,24,'Official Business','6 asked for your approval.',2,0,1,0,'2021-04-12 02:48:34','2021-04-12 02:48:34'),(7,6,58,24,'Official Business','OBF-21-00023: Your request has been approved.',2,0,3,0,'2021-04-12 02:54:44','2021-04-12 02:54:44'),(8,3,58,25,'Official Business Form','6 asked for your approval.',2,0,6,0,'2021-04-12 02:55:51','2021-04-12 02:55:51'),(9,3,58,33,'Official Business Form','1 asked for your approval.',2,0,1,0,'2021-04-12 06:38:20','2021-04-12 06:38:20'),(10,6,58,25,'Oficial Business Form','OBF-21-00024: Your request has been denied.',2,0,1,0,'2021-04-12 06:38:47','2021-04-12 06:38:47'),(11,3,58,34,'Official Business Form','1 asked for your approval.',2,0,1,0,'2021-04-12 06:46:36','2021-04-12 06:46:36'),(12,8,60,1,'Overtime Request Form','Akosi Admin asked for your approval.',2,0,4,0,'2021-04-12 07:26:28','2021-04-12 07:26:28'),(13,4,60,5,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-12 07:33:31','2021-05-14 02:32:49'),(14,3,58,35,'Official Business Form','1 asked for your approval.',2,0,1,0,'2021-04-12 07:35:40','2021-04-12 07:35:40'),(15,4,58,9,'No Time-in/ Time-out','1 asked for your approval.',2,1,1,0,'2021-04-12 07:40:20','2021-05-14 02:32:49'),(16,4,58,12,'No Time-in/ Time-out','1 asked for your approval.',2,1,1,0,'2021-04-12 07:41:41','2021-05-14 02:32:49'),(17,4,60,6,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,4,'2021-04-12 07:42:08','2021-05-05 03:34:47'),(18,4,60,1,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-12 23:02:56','2021-05-14 02:32:49'),(19,4,60,18,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-13 00:04:56','2021-05-14 02:32:49'),(20,4,60,19,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-13 00:05:25','2021-05-14 02:32:49'),(21,4,58,13,'No Time-in/ Time-out','1 asked for your approval.',2,1,1,0,'2021-04-13 01:14:08','2021-05-14 02:32:49'),(22,4,60,22,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-13 01:48:57','2021-05-14 02:32:49'),(23,4,60,22,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-13 01:50:14','2021-05-14 02:32:49'),(24,4,60,22,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-13 01:50:37','2021-05-14 02:32:49'),(25,8,60,21,'Overtime Request Form','Akosi Admin asked for your approval.',2,0,4,0,'2021-04-13 01:53:30','2021-04-13 01:53:30'),(26,1,60,20,'Overtime Request Form','OTR-21-00005: Your request has been denied.',2,1,4,1,'2021-04-13 01:55:23','2021-04-13 23:59:48'),(27,3,58,3,'Official Business Form','1 asked for your approval.',2,0,1,0,'2021-04-13 02:07:47','2021-04-13 02:07:47'),(28,4,60,2,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-13 23:57:32','2021-05-14 02:32:49'),(29,2,60,5,'Official Business Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-14 00:26:50','2021-05-14 02:33:44'),(30,3,58,5,'Official Business','Akosi Admin asked for your approval.',2,0,2,0,'2021-04-14 00:29:37','2021-04-14 00:29:37'),(31,3,58,5,'Official Business','Akosi Admin asked for your approval.',2,0,3,0,'2021-04-14 00:30:42','2021-04-14 00:30:42'),(32,1,58,5,'Official Business','OBF-21-00005: Your request has been approved.',7,1,5,1,'2021-04-14 00:31:46','2021-04-14 00:42:11'),(33,4,60,5,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-14 01:35:51','2021-05-14 02:32:49'),(34,4,60,3,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-15 03:30:30','2021-05-14 02:32:49'),(35,6,60,3,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,4,6,'2021-04-15 03:33:04','2021-04-15 07:37:59'),(36,5,60,3,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,6,0,'2021-04-15 03:33:59','2021-04-15 03:33:59'),(37,1,60,3,'Change Schedule Form','SCH-21-00003: Your request has been denied.',1,1,5,1,'2021-04-15 03:35:39','2021-04-15 05:19:16'),(38,4,60,4,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-15 03:45:29','2021-05-14 02:32:49'),(39,4,60,5,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-15 03:55:45','2021-05-14 02:32:49'),(40,4,60,6,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-15 03:56:31','2021-05-14 02:32:49'),(41,4,60,7,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-15 03:57:44','2021-05-14 02:32:49'),(42,4,60,8,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-15 05:06:04','2021-05-14 02:32:49'),(43,6,60,6,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,4,0,'2021-04-15 07:35:34','2021-04-15 07:35:34'),(44,4,60,2,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-19 08:39:26','2021-05-14 02:32:49'),(45,1,60,13,'Change Schedule Form','Charles Verdadero asked for your approval.',2,1,4,0,'2021-04-19 08:42:45','2021-05-04 22:57:39'),(46,1,60,14,'Change Schedule Form','Charles Verdadero asked for your approval.',2,1,4,1,'2021-04-19 08:43:17','2021-04-21 00:23:47'),(47,6,60,7,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,4,0,'2021-04-19 08:44:03','2021-04-19 08:44:03'),(48,1,60,8,'Change Schedule Form','SCH-21-00008: Your request has been denied.',1,1,4,1,'2021-04-19 08:44:28','2021-04-20 01:09:02'),(49,6,60,2,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,4,0,'2021-04-19 08:44:59','2021-04-19 08:44:59'),(50,3,60,13,'Change Schedule Form','Charles Verdadero asked for your approval.',2,0,1,0,'2021-04-19 08:46:01','2021-04-19 08:46:01'),(51,4,60,14,'Change Schedule Form','SCH-21-00014: Your request has been denied.',1,1,1,0,'2021-04-19 08:46:19','2021-05-14 02:32:49'),(52,4,60,6,'Overtime Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-19 08:49:50','2021-05-14 02:32:49'),(53,4,60,15,'Change Schedule Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-19 09:55:39','2021-05-14 02:32:49'),(54,2,60,9,'Official Business Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-21 00:42:41','2021-05-14 02:33:44'),(55,2,57,8,'No Time-in/Time-out','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-21 00:53:56','2021-05-14 02:33:44'),(56,2,57,9,'No Time-in/Time-out','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-21 00:56:42','2021-05-14 02:33:44'),(57,2,57,10,'No Time-in/Time-out','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-21 00:57:33','2021-05-14 02:33:44'),(58,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-21 07:47:02','2021-05-14 02:32:49'),(59,2,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-04-21 07:52:17','2021-05-14 02:33:44'),(60,7,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-04-21 07:53:47','2021-04-21 07:53:47'),(61,1,46,4,'Purchase Request','PR-21-00004: Your request has been approved.',7,1,7,0,'2021-04-21 07:55:42','2021-05-04 22:57:39'),(62,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-21 08:01:46','2021-05-14 02:32:49'),(63,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-22 00:55:18','2021-05-14 02:32:49'),(64,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-22 01:07:13','2021-05-14 02:32:49'),(65,4,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-22 01:13:35','2021-05-14 02:32:49'),(66,4,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-22 02:06:14','2021-05-14 02:32:49'),(67,6,46,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-04-22 02:14:48','2021-04-22 02:14:48'),(68,3,46,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,6,0,'2021-04-22 03:41:16','2021-04-22 03:41:16'),(69,1,46,2,'Cost Estimate','CEF-21-00002: Your request has been approved.',7,1,3,1,'2021-04-22 03:47:47','2021-04-22 03:49:19'),(70,1,46,9,'Purchase Request','PR-21-00009: Your request has been denied.',1,1,4,0,'2021-04-22 03:52:05','2021-05-04 22:57:39'),(71,4,46,11,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-22 03:55:25','2021-05-14 02:32:49'),(72,2,46,11,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-04-22 05:09:20','2021-05-14 02:33:44'),(73,2,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-04-22 06:05:48','2021-05-14 02:33:44'),(74,6,46,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-04-22 06:15:21','2021-04-22 06:15:21'),(75,2,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-04-22 06:41:13','2021-05-14 02:33:44'),(76,1,46,3,'Cost Estimate','CEF-21-00003: Your request has been denied.',1,1,6,1,'2021-04-22 06:51:42','2021-04-28 01:38:12'),(77,4,46,12,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-23 03:37:17','2021-05-14 02:32:49'),(78,6,46,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-04-28 06:19:52','2021-04-28 06:19:52'),(79,4,46,16,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-29 02:42:03','2021-05-14 02:32:49'),(80,2,37,16,'Transfer Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-30 00:56:04','2021-05-14 02:33:44'),(81,4,60,12,'Leave Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-30 01:52:48','2021-05-14 02:32:49'),(82,4,60,11,'Leave Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-30 01:53:51','2021-05-14 02:32:49'),(83,4,60,13,'Leave Request Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-30 02:14:18','2021-05-14 02:32:49'),(84,4,46,18,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-30 04:49:04','2021-05-14 02:32:49'),(85,4,46,19,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-30 04:49:59','2021-05-14 02:32:49'),(86,4,46,20,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-04-30 04:50:52','2021-05-14 02:32:49'),(87,6,46,7,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-02 11:50:48','2021-05-02 11:50:48'),(88,4,46,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-02 12:03:15','2021-05-14 02:32:49'),(89,4,46,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-02 12:04:05','2021-05-14 02:32:49'),(90,4,46,10,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-02 12:04:52','2021-05-14 02:32:49'),(91,5,46,8,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-02 12:05:35','2021-05-02 12:05:35'),(92,5,46,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-02 12:05:47','2021-05-02 12:05:47'),(93,5,46,10,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-02 12:06:00','2021-05-02 12:06:00'),(94,2,46,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-02 12:08:47','2021-05-14 02:33:44'),(95,2,46,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-02 12:08:59','2021-05-14 02:33:44'),(96,2,46,10,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-02 12:09:10','2021-05-14 02:33:44'),(97,1,46,8,'Cost Estimate','CEF-21-00008: Your request has been approved.',7,1,2,0,'2021-05-02 12:10:04','2021-05-04 22:57:39'),(98,1,46,10,'Cost Estimate','CEF-21-00010: Your request has been approved.',7,1,2,0,'2021-05-02 12:10:18','2021-05-04 22:57:39'),(99,1,46,9,'Cost Estimate','CEF-21-00009: Your request has been approved.',7,1,2,0,'2021-05-02 12:10:35','2021-05-04 22:57:39'),(100,4,46,11,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-02 12:40:13','2021-05-14 02:32:49'),(101,5,46,11,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-02 12:43:15','2021-05-02 12:43:15'),(102,2,46,11,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-02 12:44:07','2021-05-14 02:33:44'),(103,4,46,4,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-02 12:47:17','2021-05-14 02:32:49'),(104,4,46,3,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-02 12:49:10','2021-05-14 02:32:49'),(105,5,46,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-02 12:49:58','2021-05-02 12:49:58'),(106,5,46,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-02 12:50:41','2021-05-02 12:50:41'),(107,1,46,3,'Inventory Validation','IVR-21-00003: Your request has been approved.',7,1,5,0,'2021-05-02 12:52:03','2021-05-04 22:57:39'),(108,1,46,4,'Inventory Validation','IVR-21-00004: Your request has been approved.',7,1,5,0,'2021-05-02 12:52:30','2021-05-04 22:57:39'),(109,1,46,11,'Cost Estimate','CEF-21-00011: Your request has been approved.',7,1,2,0,'2021-05-02 12:53:33','2021-05-04 22:57:39'),(110,1,46,5,'Inventory Validation','IVR-21-00005: Your request has been denied.',1,1,2,0,'2021-05-02 13:07:26','2021-05-04 22:57:39'),(111,3,35,2,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-03 05:20:21','2021-05-03 05:20:21'),(112,2,59,1,'Loan Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-03 06:18:46','2021-05-14 02:33:44'),(113,4,46,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-03 06:27:26','2021-05-14 02:32:49'),(114,4,46,6,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-03 06:38:12','2021-05-14 02:32:49'),(115,4,46,7,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-03 06:40:13','2021-05-14 02:32:49'),(116,4,46,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-03 06:47:55','2021-05-14 02:32:49'),(117,5,46,8,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-03 06:49:27','2021-05-03 06:49:27'),(118,5,46,7,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-03 06:49:43','2021-05-03 06:49:43'),(119,5,46,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-03 06:50:00','2021-05-03 06:50:00'),(120,5,46,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-03 06:50:16','2021-05-03 06:50:16'),(121,1,46,4,'Cost Estimate','CEF-21-00004: Your request has been denied.',1,1,4,0,'2021-05-03 06:51:19','2021-05-04 22:57:39'),(122,1,46,3,'Cost Estimate','CEF-21-00003: Your request has been denied.',1,1,4,1,'2021-05-03 06:51:45','2021-05-04 22:55:59'),(123,5,46,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-03 06:52:02','2021-05-03 06:52:02'),(124,1,46,1,'Cost Estimate','CEF-21-00001: Your request has been denied.',1,1,4,1,'2021-05-03 06:52:24','2021-05-04 22:55:36'),(125,2,46,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-03 07:03:44','2021-05-14 02:33:44'),(126,2,46,7,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-03 07:04:16','2021-05-14 02:33:44'),(127,2,46,6,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-03 07:04:46','2021-05-14 02:33:44'),(128,2,46,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-03 07:05:00','2021-05-14 02:33:44'),(129,2,46,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-03 07:05:22','2021-05-14 02:33:44'),(130,1,46,8,'Cost Estimate','CEF-21-00008: Your request has been approved.',7,1,2,1,'2021-05-03 07:08:33','2021-05-04 22:56:14'),(131,1,46,7,'Cost Estimate','CEF-21-00007: Your request has been approved.',7,1,2,0,'2021-05-03 07:09:00','2021-05-04 22:57:39'),(132,1,46,6,'Cost Estimate','CEF-21-00006: Your request has been approved.',7,1,2,1,'2021-05-03 07:09:20','2021-05-04 22:55:23'),(133,1,46,5,'Cost Estimate','CEF-21-00005: Your request has been approved.',7,1,2,0,'2021-05-03 07:09:34','2021-05-04 22:57:39'),(134,5,44,1,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-04 00:58:10','2021-05-04 00:58:10'),(135,5,44,2,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-04 00:58:40','2021-05-04 00:58:40'),(136,5,44,3,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-04 00:59:12','2021-05-04 00:59:12'),(137,3,35,8,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-04 05:39:48','2021-05-04 05:39:48'),(138,3,35,7,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-04 05:55:22','2021-05-04 05:55:22'),(139,5,44,5,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-04 06:56:14','2021-05-04 06:56:14'),(140,4,42,4,'Material Withdrawal','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-04 06:58:23','2021-05-14 02:32:49'),(141,4,42,5,'Material Withdrawal','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-04 06:58:47','2021-05-14 02:32:49'),(142,4,42,6,'Material Withdrawal','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-04 06:59:11','2021-05-14 02:32:49'),(143,5,44,6,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-04 07:29:17','2021-05-04 07:29:17'),(144,4,42,8,'Material Withdrawal','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-04 07:32:30','2021-05-14 02:32:49'),(145,3,59,1,'Loan Form','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-04 07:36:22','2021-05-04 07:36:22'),(146,4,59,1,'Loan Form','Akosi Admin asked for your approval.',2,1,3,0,'2021-05-04 07:40:58','2021-05-14 02:32:49'),(147,1,59,1,'Loan Form','LNF-21-00001: Your request has been approved.',7,1,4,1,'2021-05-04 07:41:38','2021-05-04 22:57:27'),(148,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-04 07:49:59','2021-05-14 02:32:49'),(149,2,35,1,'Return Item','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-04 23:26:43','2021-05-14 02:33:44'),(150,2,35,3,'Return Item','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-04 23:27:30','2021-05-14 02:33:44'),(151,2,35,10,'Return Item','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-04 23:28:12','2021-05-14 02:33:44'),(152,2,35,9,'Return Item','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 02:00:34','2021-05-14 02:33:44'),(153,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 03:33:40','2021-05-14 02:32:49'),(154,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been denied.',1,1,4,0,'2021-05-05 03:34:31','2021-05-10 01:12:29'),(155,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 03:46:06','2021-05-14 02:32:49'),(156,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 03:46:35','2021-05-14 02:32:49'),(157,5,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 05:09:53','2021-05-05 05:09:53'),(158,5,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 05:10:22','2021-05-05 05:10:22'),(159,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-05 05:12:54','2021-05-14 02:33:44'),(160,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been denied.',1,1,5,0,'2021-05-05 05:13:26','2021-05-10 01:12:29'),(161,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been approved.',7,1,2,0,'2021-05-05 05:14:14','2021-05-10 01:12:29'),(162,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 05:27:37','2021-05-14 02:32:49'),(163,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 06:04:10','2021-05-14 02:32:49'),(164,5,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 06:05:28','2021-05-05 06:05:28'),(165,5,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 06:07:01','2021-05-05 06:07:01'),(166,6,38,1,'Cost Estimate','Charles Verdadero asked for your approval.',2,0,4,0,'2021-05-05 06:20:36','2021-05-05 06:20:36'),(167,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 06:23:02','2021-05-14 02:32:49'),(168,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 06:24:24','2021-05-14 02:32:49'),(169,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 06:26:36','2021-05-14 02:32:49'),(170,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 06:32:44','2021-05-14 02:32:49'),(171,4,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 06:40:35','2021-05-14 02:32:49'),(172,5,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 06:41:55','2021-05-05 06:41:55'),(173,5,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 06:45:34','2021-05-05 06:45:34'),(174,5,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 06:46:05','2021-05-05 06:46:05'),(175,5,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 06:46:21','2021-05-05 06:46:21'),(176,5,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-05 06:46:35','2021-05-05 06:46:35'),(177,2,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-05 06:47:33','2021-05-14 02:33:44'),(178,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-05 06:47:45','2021-05-14 02:33:44'),(179,2,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-05 06:48:14','2021-05-14 02:33:44'),(180,2,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-05 06:48:32','2021-05-14 02:33:44'),(181,2,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-05 06:48:56','2021-05-14 02:33:44'),(182,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been approved.',7,1,2,0,'2021-05-05 06:49:52','2021-05-10 01:12:29'),(183,1,38,4,'Cost Estimate','CEF-21-00004: Your request has been approved.',7,1,2,0,'2021-05-05 06:50:08','2021-05-10 01:12:29'),(184,1,38,6,'Cost Estimate','CEF-21-00006: Your request has been approved.',7,1,2,0,'2021-05-05 06:53:48','2021-05-10 01:12:29'),(185,1,38,5,'Cost Estimate','CEF-21-00005: Your request has been approved.',7,1,2,0,'2021-05-05 06:54:03','2021-05-10 01:12:29'),(186,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been approved.',7,1,2,0,'2021-05-05 06:54:44','2021-05-10 01:12:29'),(187,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 07:45:37','2021-05-14 02:32:49'),(188,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 07:46:38','2021-05-14 02:32:49'),(189,5,44,7,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-05 07:52:52','2021-05-05 07:52:52'),(190,5,44,10,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-05 07:55:20','2021-05-05 07:55:20'),(191,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-05 23:28:13','2021-05-14 02:33:44'),(192,2,36,1,'Item Disposal','Akosi Admin asked for your approval.',2,1,1,2,'2021-05-06 00:03:11','2021-05-06 00:05:25'),(193,3,36,2,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-06 00:04:38','2021-05-06 00:04:38'),(194,3,36,1,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-06 00:05:17','2021-05-06 00:05:17'),(195,2,36,3,'Item Disposal','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 00:23:00','2021-05-14 02:33:44'),(196,1,36,3,'Disposal Item','ADF-21-00003: Your request has been denied.',1,1,2,0,'2021-05-06 00:29:55','2021-05-10 01:12:29'),(197,2,36,4,'Item Disposal','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 00:39:27','2021-05-14 02:33:44'),(198,4,38,7,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 00:43:55','2021-05-14 02:32:49'),(199,1,38,7,'Cost Estimate','CEF-21-00007: Your request has been denied.',1,1,4,0,'2021-05-06 00:47:42','2021-05-10 01:12:29'),(200,4,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 00:49:44','2021-05-14 02:32:49'),(201,1,37,1,'Transfer Request','TR-21-00001: Your request has been denied.',1,1,2,0,'2021-05-06 00:53:16','2021-05-10 01:12:29'),(202,1,36,4,'Disposal Item','ADF-21-00004: Your request has been denied.',1,1,2,0,'2021-05-06 01:42:41','2021-05-10 01:12:29'),(203,4,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 05:09:15','2021-05-14 02:32:49'),(204,4,38,10,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 06:03:13','2021-05-14 02:32:49'),(205,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 06:22:34','2021-05-14 02:32:49'),(206,4,38,14,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 06:47:13','2021-05-14 02:32:49'),(207,1,38,14,'Cost Estimate','CEF-21-00014: Your request has been denied.',1,1,4,0,'2021-05-06 06:48:06','2021-05-10 01:12:29'),(208,1,38,10,'Cost Estimate','CEF-21-00010: Your request has been denied.',1,1,4,0,'2021-05-06 06:48:27','2021-05-10 01:12:29'),(209,1,126,2,'Inventory Validation','IVR-21-00002: Your request has been denied.',1,1,2,0,'2021-05-06 06:56:06','2021-05-10 01:12:29'),(210,4,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 11:34:51','2021-05-14 02:32:49'),(211,5,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-06 11:36:02','2021-05-06 11:36:02'),(212,2,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-06 11:37:36','2021-05-14 02:33:44'),(213,1,38,18,'Cost Estimate','CEF-21-00018: Your request has been approved.',7,1,2,0,'2021-05-06 11:38:30','2021-05-10 01:12:29'),(214,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 11:42:32','2021-05-14 02:32:49'),(215,2,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-06 11:43:44','2021-05-14 02:33:44'),(216,7,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-06 11:44:29','2021-05-06 11:44:29'),(217,1,46,4,'Purchase Request','PR-21-00004: Your request has been approved.',7,1,7,0,'2021-05-06 11:45:37','2021-05-10 01:12:29'),(218,4,38,19,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 22:33:18','2021-05-14 02:32:49'),(219,4,38,20,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 22:34:26','2021-05-14 02:32:49'),(220,4,38,21,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 22:37:14','2021-05-14 02:32:49'),(221,1,38,8,'Cost Estimate','CEF-21-00008: Your request has been denied.',1,1,4,0,'2021-05-06 22:38:23','2021-05-10 01:12:29'),(222,5,38,19,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-06 22:38:40','2021-05-06 22:38:40'),(223,5,38,20,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-06 22:39:05','2021-05-06 22:39:05'),(224,5,38,21,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-06 22:39:21','2021-05-06 22:39:21'),(225,1,38,9,'Cost Estimate','CEF-21-00009: Your request has been denied.',1,1,4,0,'2021-05-06 22:39:53','2021-05-10 01:12:29'),(226,2,38,19,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-06 22:40:57','2021-05-14 02:33:44'),(227,2,38,20,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-06 22:41:10','2021-05-14 02:33:44'),(228,2,38,21,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-06 22:41:29','2021-05-14 02:33:44'),(229,1,38,19,'Cost Estimate','CEF-21-00019: Your request has been approved.',7,1,2,0,'2021-05-06 22:45:29','2021-05-10 01:12:29'),(230,1,38,20,'Cost Estimate','CEF-21-00020: Your request has been approved.',7,1,2,0,'2021-05-06 22:45:50','2021-05-10 01:12:29'),(231,1,38,21,'Cost Estimate','CEF-21-00021: Your request has been approved.',7,1,2,0,'2021-05-06 22:46:04','2021-05-10 01:12:29'),(232,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-06 22:51:31','2021-05-14 02:32:49'),(233,4,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-06 22:59:58','2021-05-14 02:32:49'),(234,5,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-06 23:00:44','2021-05-06 23:00:44'),(235,1,126,3,'Inventory Validation','IVR-21-00003: Your request has been approved.',7,1,5,0,'2021-05-06 23:05:04','2021-05-10 01:12:29'),(236,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 00:55:37','2021-05-14 02:32:49'),(237,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 01:07:37','2021-05-14 02:32:49'),(238,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 01:09:31','2021-05-14 02:32:49'),(239,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 01:12:45','2021-05-14 02:32:49'),(240,5,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-07 01:14:08','2021-05-07 01:14:08'),(241,5,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-07 01:14:24','2021-05-07 01:14:24'),(242,5,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-07 01:14:37','2021-05-07 01:14:37'),(243,5,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-07 01:14:51','2021-05-07 01:14:51'),(244,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-07 01:15:37','2021-05-14 02:33:44'),(245,2,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-07 01:15:57','2021-05-14 02:33:44'),(246,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-07 01:16:14','2021-05-14 02:33:44'),(247,2,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-07 01:16:36','2021-05-14 02:33:44'),(248,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,1,2,0,'2021-05-07 01:19:10','2021-05-10 01:12:29'),(249,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been approved.',7,1,2,0,'2021-05-07 01:19:35','2021-05-10 01:12:29'),(250,1,38,4,'Cost Estimate','CEF-21-00004: Your request has been approved.',7,1,2,0,'2021-05-07 01:19:53','2021-05-10 01:12:29'),(251,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been approved.',7,1,2,0,'2021-05-07 01:20:48','2021-05-10 01:12:29'),(252,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 01:56:49','2021-05-14 02:32:49'),(253,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 02:25:02','2021-05-14 02:32:49'),(254,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 02:27:45','2021-05-14 02:32:49'),(255,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 02:29:23','2021-05-14 02:32:49'),(256,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 02:38:13','2021-05-14 02:32:49'),(257,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 02:39:12','2021-05-14 02:32:49'),(258,1,38,5,'Cost Estimate','CEF-21-00005: Your request has been denied.',1,1,4,0,'2021-05-07 03:05:26','2021-05-10 01:12:29'),(259,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 03:21:49','2021-05-14 02:32:49'),(260,4,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-07 03:48:35','2021-05-14 02:32:49'),(261,4,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-07 03:50:42','2021-05-14 02:32:49'),(262,1,126,6,'Inventory Validation','IVR-21-00006: Your request has been denied.',1,1,2,0,'2021-05-07 03:52:46','2021-05-10 01:12:29'),(263,4,126,8,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-07 03:53:15','2021-05-14 02:32:49'),(264,1,126,7,'Inventory Validation','IVR-21-00007: Your request has been denied.',1,1,2,0,'2021-05-07 03:54:37','2021-05-10 01:12:29'),(265,1,126,4,'Inventory Validation','IVR-21-00004: Your request has been denied.',1,1,4,0,'2021-05-07 03:58:24','2021-05-10 01:12:29'),(266,5,126,8,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-07 03:59:52','2021-05-07 03:59:52'),(267,5,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-07 04:02:08','2021-05-07 04:02:08'),(268,4,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 04:43:55','2021-05-14 02:32:49'),(269,4,38,7,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 04:46:54','2021-05-14 02:32:49'),(270,1,46,2,'Purchase Request','PR-21-00002: Your request has been denied.',1,1,4,0,'2021-05-07 05:32:13','2021-05-10 01:12:29'),(271,2,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-07 05:32:34','2021-05-14 02:33:44'),(272,2,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-07 05:32:52','2021-05-14 02:33:44'),(273,1,46,5,'Purchase Request','PR-21-00005: Your request has been denied.',1,1,4,0,'2021-05-07 05:33:15','2021-05-10 01:12:29'),(274,2,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-07 05:33:44','2021-05-14 02:33:44'),(275,2,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-07 05:34:10','2021-05-14 02:33:44'),(276,4,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 05:55:00','2021-05-14 02:32:49'),(277,4,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 05:55:54','2021-05-14 02:32:49'),(278,5,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-07 05:58:26','2021-05-07 05:58:26'),(279,5,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-07 06:01:14','2021-05-07 06:01:14'),(280,2,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-07 06:02:03','2021-05-14 02:33:44'),(281,2,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-07 06:02:19','2021-05-14 02:33:44'),(282,1,38,8,'Cost Estimate','CEF-21-00008: Your request has been approved.',7,1,2,0,'2021-05-07 06:03:06','2021-05-10 01:12:29'),(283,1,38,9,'Cost Estimate','CEF-21-00009: Your request has been approved.',7,1,2,0,'2021-05-07 06:03:19','2021-05-10 01:12:29'),(284,4,46,12,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 06:31:29','2021-05-14 02:32:49'),(285,4,38,10,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 06:32:14','2021-05-14 02:32:49'),(286,4,46,13,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-07 07:14:28','2021-05-14 02:32:49'),(287,1,126,5,'Inventory Validation','IVR-21-00005: Your request has been approved.',7,1,5,0,'2021-05-07 07:47:46','2021-05-10 01:12:29'),(288,1,126,8,'Inventory Validation','IVR-21-00008: Your request has been approved.',7,1,5,0,'2021-05-07 07:48:09','2021-05-10 01:12:29'),(289,4,46,14,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 03:05:07','2021-05-14 02:32:49'),(290,2,49,4,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 03:19:35','2021-05-14 02:33:44'),(291,2,49,5,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 03:23:34','2021-05-14 02:33:44'),(292,4,49,4,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-08 03:26:50','2021-05-14 02:32:49'),(293,4,49,5,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-08 03:27:30','2021-05-14 02:32:49'),(294,5,49,4,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-08 03:31:31','2021-05-08 03:31:31'),(295,1,49,5,'Service Requisition','SR-21-00005: Your request has been denied.',1,1,4,0,'2021-05-08 03:31:59','2021-05-10 01:12:29'),(296,1,49,4,'Service Requisition','SR-21-00004: Your request has been approved.',7,1,5,0,'2021-05-08 03:32:56','2021-05-10 01:12:29'),(297,2,49,6,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 03:37:32','2021-05-14 02:33:44'),(298,1,49,6,'Service Requisition','SR-21-00006: Your request has been denied.',1,1,2,0,'2021-05-08 03:38:53','2021-05-10 01:12:29'),(299,2,49,8,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 03:46:36','2021-05-14 02:33:44'),(300,2,49,7,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 03:46:49','2021-05-14 02:33:44'),(301,4,46,11,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 03:47:44','2021-05-14 02:32:49'),(302,2,41,4,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 08:42:05','2021-05-14 02:33:44'),(303,4,41,4,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-08 08:43:18','2021-05-14 02:32:49'),(304,1,41,4,'Service Order','P0-21-00004: Your request has been denied.',1,1,4,0,'2021-05-08 08:44:23','2021-05-10 01:12:29'),(305,2,41,5,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 08:45:58','2021-05-14 02:33:44'),(306,2,49,11,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 08:57:30','2021-05-14 02:33:44'),(307,2,49,12,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-08 08:58:01','2021-05-14 02:33:44'),(308,2,49,14,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-09 22:56:41','2021-05-14 02:33:44'),(309,4,46,15,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-09 23:02:13','2021-05-14 02:32:49'),(310,4,46,16,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-09 23:04:50','2021-05-14 02:32:49'),(311,2,49,15,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-09 23:09:43','2021-05-14 02:33:44'),(312,4,49,8,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-09 23:19:07','2021-05-14 02:32:49'),(313,4,49,7,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-09 23:19:43','2021-05-14 02:32:49'),(314,4,49,11,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-09 23:20:23','2021-05-14 02:32:49'),(315,4,49,12,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-09 23:20:42','2021-05-14 02:32:49'),(316,4,49,14,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-09 23:21:02','2021-05-14 02:32:49'),(317,4,49,15,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-09 23:21:20','2021-05-14 02:32:49'),(318,5,49,8,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-09 23:22:26','2021-05-09 23:22:26'),(319,5,49,7,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-09 23:22:41','2021-05-09 23:22:41'),(320,5,49,11,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-09 23:22:55','2021-05-09 23:22:55'),(321,5,49,12,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-09 23:23:39','2021-05-09 23:23:39'),(322,5,49,14,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-09 23:25:59','2021-05-09 23:25:59'),(323,5,49,15,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-09 23:26:10','2021-05-09 23:26:10'),(324,1,49,8,'Service Requisition','SR-21-00008: Your request has been approved.',7,1,5,0,'2021-05-09 23:26:51','2021-05-10 01:12:29'),(325,1,49,7,'Service Requisition','SR-21-00007: Your request has been approved.',7,1,5,0,'2021-05-09 23:28:03','2021-05-10 01:12:29'),(326,1,49,11,'Service Requisition','SR-21-00011: Your request has been approved.',7,1,5,0,'2021-05-09 23:28:14','2021-05-10 01:12:29'),(327,1,49,12,'Service Requisition','SR-21-00012: Your request has been approved.',7,1,5,0,'2021-05-09 23:28:24','2021-05-10 01:12:29'),(328,1,49,14,'Service Requisition','SR-21-00014: Your request has been approved.',7,1,5,0,'2021-05-09 23:28:35','2021-05-10 01:12:29'),(329,1,49,15,'Service Requisition','SR-21-00015: Your request has been approved.',7,1,5,0,'2021-05-09 23:28:47','2021-05-10 01:12:29'),(330,2,49,17,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-09 23:49:24','2021-05-14 02:33:44'),(331,4,49,17,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-09 23:53:58','2021-05-14 02:32:49'),(332,5,49,17,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-09 23:54:40','2021-05-09 23:54:40'),(333,1,49,17,'Service Requisition','SR-21-00017: Your request has been approved.',7,1,5,0,'2021-05-09 23:56:53','2021-05-10 01:12:29'),(334,2,41,7,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-09 23:59:29','2021-05-14 02:33:44'),(335,2,41,6,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 00:00:31','2021-05-14 02:33:44'),(336,4,41,5,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 00:15:12','2021-05-14 02:32:49'),(337,4,41,7,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 00:18:27','2021-05-14 02:32:49'),(338,4,41,6,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 00:18:47','2021-05-14 02:32:49'),(339,5,41,5,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 00:19:50','2021-05-10 00:19:50'),(340,5,41,7,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 00:20:11','2021-05-10 00:20:11'),(341,5,41,6,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 00:20:26','2021-05-10 00:20:26'),(342,1,41,5,'Service Order','P0-21-00005: Your request has been approved.',7,1,5,0,'2021-05-10 00:24:41','2021-05-10 01:12:29'),(343,1,41,7,'Service Order','P0-21-00007: Your request has been approved.',7,1,5,0,'2021-05-10 00:25:24','2021-05-10 01:12:29'),(344,2,49,13,'Service Requisition','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-10 00:25:28','2021-05-14 02:33:44'),(345,1,41,6,'Service Order','P0-21-00006: Your request has been denied.',1,1,5,0,'2021-05-10 00:26:13','2021-05-10 01:12:29'),(346,2,49,18,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 00:35:39','2021-05-14 02:33:44'),(347,4,49,18,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,4,'2021-05-10 00:37:35','2021-05-10 01:14:42'),(348,5,49,18,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 00:38:28','2021-05-10 00:38:28'),(349,1,49,18,'Service Requisition','SR-21-00018: Your request has been approved.',7,1,5,0,'2021-05-10 00:39:31','2021-05-10 01:12:29'),(350,2,41,8,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 00:45:34','2021-05-14 02:33:44'),(351,4,41,8,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 00:47:13','2021-05-14 02:32:49'),(352,1,41,8,'Service Order','P0-21-00008: Your request has been denied.',1,1,4,1,'2021-05-10 00:51:41','2021-05-10 01:12:14'),(353,2,41,9,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 00:52:55','2021-05-14 02:33:44'),(354,4,38,16,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,4,'2021-05-10 01:04:34','2021-05-10 01:14:08'),(355,5,38,16,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 01:08:15','2021-05-10 01:08:15'),(356,2,38,16,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-10 01:10:47','2021-05-14 02:33:44'),(357,1,38,16,'Cost Estimate','CEF-21-00016: Your request has been approved.',7,1,2,0,'2021-05-10 01:12:05','2021-05-10 01:12:29'),(358,2,41,10,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 01:39:15','2021-05-14 02:33:44'),(359,4,46,21,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,4,'2021-05-10 01:51:57','2021-05-10 01:57:20'),(360,2,46,21,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,2,'2021-05-10 01:57:40','2021-05-10 02:03:41'),(361,7,46,21,'Purchase Request','Akosi Admin asked for your approval.',2,1,2,7,'2021-05-10 02:03:59','2021-05-10 02:04:23'),(362,1,46,21,'Purchase Request','PR-21-00021: Your request has been approved.',7,1,7,1,'2021-05-10 02:04:40','2021-05-10 02:05:39'),(363,4,126,10,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 02:48:15','2021-05-14 02:32:49'),(364,4,126,12,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 02:48:46','2021-05-14 02:32:49'),(365,5,126,10,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 02:49:32','2021-05-10 02:49:32'),(366,5,126,12,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 02:49:51','2021-05-10 02:49:51'),(367,1,126,10,'Inventory Validation','IVR-21-00010: Your request has been approved.',7,1,5,0,'2021-05-10 02:50:41','2021-05-12 05:51:30'),(368,1,126,12,'Inventory Validation','IVR-21-00012: Your request has been approved.',7,1,5,0,'2021-05-10 02:50:59','2021-05-12 05:51:30'),(369,2,49,19,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 02:56:39','2021-05-14 02:33:44'),(370,4,49,13,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 02:57:26','2021-05-14 02:32:49'),(371,4,49,19,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 02:58:11','2021-05-14 02:32:49'),(372,5,49,19,'Service Requisition','Akosi Admin asked for your approval.',2,1,4,5,'2021-05-10 02:58:54','2021-05-10 02:59:15'),(373,1,49,19,'Service Requisition','SR-21-00019: Your request has been approved.',7,1,5,0,'2021-05-10 02:59:25','2021-05-12 05:51:30'),(374,2,41,11,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 03:07:46','2021-05-14 02:33:44'),(375,4,41,11,'Service Order','Akosi Admin asked for your approval.',2,1,2,4,'2021-05-10 03:08:56','2021-05-10 03:09:14'),(376,5,41,11,'Service Order','Akosi Admin asked for your approval.',2,1,4,5,'2021-05-10 03:09:26','2021-05-10 03:09:42'),(377,1,41,11,'Service Order','P0-21-00011: Your request has been approved.',7,1,5,0,'2021-05-10 03:09:56','2021-05-12 05:51:30'),(378,4,38,17,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 03:16:33','2021-05-14 02:32:49'),(379,5,38,17,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 03:19:51','2021-05-10 03:19:51'),(380,2,38,17,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-10 03:20:49','2021-05-14 02:33:44'),(381,1,38,17,'Cost Estimate','CEF-21-00017: Your request has been approved.',7,1,2,0,'2021-05-10 03:21:44','2021-05-12 05:51:30'),(382,1,126,13,'Inventory Validation','IVR-21-00013: Your request has been denied.',1,1,2,0,'2021-05-10 03:37:56','2021-05-12 05:51:30'),(383,4,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 05:09:45','2021-05-14 02:32:49'),(384,5,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 05:13:14','2021-05-10 05:13:14'),(385,2,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-10 05:14:57','2021-05-14 02:33:44'),(386,2,49,20,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 05:32:21','2021-05-14 02:33:44'),(387,4,49,20,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-10 05:35:28','2021-05-14 02:32:49'),(388,5,49,13,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 05:37:43','2021-05-10 05:37:43'),(389,5,49,20,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 05:39:10','2021-05-10 05:39:10'),(390,1,49,13,'Service Requisition','SR-21-00013: Your request has been approved.',7,1,5,0,'2021-05-10 05:41:53','2021-05-12 05:51:30'),(391,1,49,20,'Service Requisition','SR-21-00020: Your request has been approved.',7,1,5,0,'2021-05-10 05:42:14','2021-05-12 05:51:30'),(392,1,38,18,'Cost Estimate','CEF-21-00018: Your request has been approved.',7,1,2,0,'2021-05-10 06:28:31','2021-05-12 05:51:30'),(393,4,38,19,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 06:35:01','2021-05-14 02:32:49'),(394,5,38,19,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-10 06:38:50','2021-05-10 06:38:50'),(395,2,38,19,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-10 06:39:43','2021-05-14 02:33:44'),(396,1,38,19,'Cost Estimate','CEF-21-00019: Your request has been approved.',7,1,2,0,'2021-05-10 06:41:04','2021-05-12 05:51:30'),(397,4,38,20,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 06:49:57','2021-05-14 02:32:49'),(398,1,38,20,'Cost Estimate','CEF-21-00020: Your request has been denied.',1,1,4,0,'2021-05-10 06:51:21','2021-05-12 05:51:30'),(399,4,38,21,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-10 06:52:22','2021-05-14 02:32:49'),(400,4,46,22,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-11 03:33:42','2021-05-14 02:32:49'),(401,7,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-11 03:39:44','2021-05-11 03:39:44'),(402,2,36,5,'Item Disposal','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-11 05:26:29','2021-05-14 02:33:44'),(403,2,37,3,'Transfer Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-11 05:31:45','2021-05-14 02:33:44'),(404,5,44,12,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-11 05:53:16','2021-05-11 05:53:16'),(405,2,49,21,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-11 23:46:33','2021-05-14 02:33:44'),(406,2,49,22,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-11 23:48:30','2021-05-14 02:33:44'),(407,2,49,23,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-11 23:57:17','2021-05-14 02:33:44'),(408,2,49,24,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-11 23:58:05','2021-05-14 02:33:44'),(409,4,49,21,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 00:43:56','2021-05-14 02:32:49'),(410,4,49,22,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 00:44:12','2021-05-14 02:32:49'),(411,4,49,23,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 00:48:33','2021-05-14 02:32:49'),(412,5,49,21,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 00:50:39','2021-05-12 00:50:39'),(413,5,49,22,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 00:50:50','2021-05-12 00:50:50'),(414,5,49,23,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 00:51:02','2021-05-12 00:51:02'),(415,1,49,21,'Service Requisition','SR-21-00021: Your request has been approved.',7,1,5,0,'2021-05-12 00:53:18','2021-05-12 05:51:30'),(416,1,49,22,'Service Requisition','SR-21-00022: Your request has been approved.',7,1,5,0,'2021-05-12 01:03:52','2021-05-12 05:51:30'),(417,1,49,23,'Service Requisition','SR-21-00023: Your request has been approved.',7,1,5,0,'2021-05-12 01:04:05','2021-05-12 05:51:30'),(418,2,41,13,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 01:06:56','2021-05-14 02:33:44'),(419,2,41,14,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 01:07:29','2021-05-14 02:33:44'),(420,2,41,15,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 01:08:12','2021-05-14 02:33:44'),(421,2,41,16,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 01:10:14','2021-05-14 02:33:44'),(422,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,4,'2021-05-12 02:26:56','2021-05-12 02:31:54'),(423,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,4,'2021-05-12 02:27:25','2021-05-12 02:31:25'),(424,5,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 02:32:55','2021-05-12 02:32:55'),(425,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-12 02:34:14','2021-05-14 02:33:44'),(426,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,1,2,0,'2021-05-12 02:35:50','2021-05-12 05:51:30'),(427,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 02:36:28','2021-05-14 02:32:49'),(428,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 02:37:34','2021-05-14 02:32:49'),(429,2,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-12 02:39:21','2021-05-14 02:33:44'),(430,7,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-12 02:40:36','2021-05-12 02:40:36'),(431,1,46,1,'Purchase Request','PR-21-00001: Your request has been approved.',7,1,7,1,'2021-05-12 02:54:02','2021-05-12 03:39:59'),(432,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 03:43:14','2021-05-14 02:32:49'),(433,5,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 03:46:25','2021-05-12 03:46:25'),(434,4,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 03:58:25','2021-05-14 02:32:49'),(435,5,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 03:59:06','2021-05-12 03:59:06'),(436,1,126,1,'Inventory Validation','IVR-21-00001: Your request has been approved.',7,1,5,0,'2021-05-12 03:59:51','2021-05-12 05:51:30'),(437,2,59,2,'Loan Form','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 05:11:06','2021-05-14 02:33:44'),(438,5,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 05:15:49','2021-05-12 05:15:49'),(439,5,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 05:16:17','2021-05-12 05:16:17'),(440,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been denied.',1,1,5,0,'2021-05-12 05:17:51','2021-05-12 05:51:30'),(441,2,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-12 05:18:24','2021-05-14 02:33:44'),(442,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-12 05:18:39','2021-05-14 02:33:44'),(443,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been approved.',7,1,2,0,'2021-05-12 05:19:27','2021-05-12 05:51:30'),(444,1,38,4,'Cost Estimate','CEF-21-00004: Your request has been approved.',7,1,2,0,'2021-05-12 05:19:53','2021-05-12 05:51:30'),(445,2,49,25,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 05:30:52','2021-05-14 02:33:44'),(446,2,49,26,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 05:32:22','2021-05-14 02:33:44'),(447,2,49,27,'Service Requisition','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 05:32:55','2021-05-14 02:33:44'),(448,4,49,25,'Service Requisition','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 05:35:08','2021-05-14 02:32:49'),(449,5,49,25,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 05:44:36','2021-05-12 05:44:36'),(450,1,49,25,'Service Requisition','SR-21-00025: Your request has been approved.',7,1,5,1,'2021-05-12 05:50:55','2021-05-12 05:51:48'),(451,2,41,17,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 05:53:15','2021-05-14 02:33:44'),(452,2,41,18,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 05:53:56','2021-05-14 02:33:44'),(453,4,41,10,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 05:56:27','2021-05-14 02:32:49'),(454,4,41,13,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 05:56:52','2021-05-14 02:32:49'),(455,4,41,14,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 05:57:06','2021-05-14 02:32:49'),(456,4,41,15,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 05:57:31','2021-05-14 02:32:49'),(457,4,41,16,'Service Order','Akosi Admin asked for your approval.',2,1,2,0,'2021-05-12 05:57:55','2021-05-14 02:32:49'),(458,1,41,17,'Service Order','P0-21-00017: Your request has been denied.',1,1,2,0,'2021-05-12 05:58:28','2021-05-14 02:31:30'),(459,1,41,18,'Service Order','P0-21-00018: Your request has been denied.',1,1,2,0,'2021-05-12 05:59:44','2021-05-14 02:31:30'),(460,5,41,10,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 06:55:34','2021-05-12 06:55:34'),(461,5,41,13,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 06:55:52','2021-05-12 06:55:52'),(462,5,41,14,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 06:56:07','2021-05-12 06:56:07'),(463,5,41,15,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 06:56:21','2021-05-12 06:56:21'),(464,5,41,16,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 06:56:40','2021-05-12 06:56:40'),(465,1,41,10,'Service Order','P0-21-00010: Your request has been approved.',7,1,5,0,'2021-05-12 06:57:36','2021-05-14 02:31:30'),(466,1,41,14,'Service Order','P0-21-00014: Your request has been approved.',7,1,5,0,'2021-05-12 06:57:50','2021-05-14 02:31:30'),(467,1,41,13,'Service Order','P0-21-00013: Your request has been approved.',7,1,5,0,'2021-05-12 06:58:09','2021-05-14 02:31:30'),(468,1,41,15,'Service Order','P0-21-00015: Your request has been approved.',7,1,5,0,'2021-05-12 06:58:22','2021-05-14 02:31:30'),(469,1,41,16,'Service Order','P0-21-00016: Your request has been approved.',7,1,5,0,'2021-05-12 06:58:36','2021-05-14 02:31:30'),(470,2,41,19,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 07:05:16','2021-05-14 02:33:44'),(471,2,41,20,'Service Order','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 07:10:51','2021-05-14 02:33:44'),(472,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 07:14:57','2021-05-14 02:32:49'),(473,4,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 07:15:34','2021-05-14 02:32:49'),(474,5,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 07:16:59','2021-05-12 07:16:59'),(475,5,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-12 07:17:18','2021-05-12 07:17:18'),(476,2,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-12 07:18:00','2021-05-14 02:33:44'),(477,2,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-12 07:18:52','2021-05-14 02:33:44'),(478,1,38,5,'Cost Estimate','CEF-21-00005: Your request has been approved.',7,1,2,0,'2021-05-12 07:20:31','2021-05-14 02:31:30'),(479,1,38,6,'Cost Estimate','CEF-21-00006: Your request has been approved.',7,1,2,0,'2021-05-12 07:21:06','2021-05-14 02:31:30'),(480,6,38,7,'Cost Estimate','Charles Verdadero asked for your approval.',2,0,4,0,'2021-05-12 07:30:20','2021-05-12 07:30:20'),(481,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-12 07:46:48','2021-05-14 02:32:49'),(482,1,46,3,'Purchase Request','PR-21-00003: Your request has been denied.',1,1,4,0,'2021-05-12 07:47:51','2021-05-14 02:31:30'),(483,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-13 08:25:26','2021-05-14 02:32:49'),(484,4,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-13 09:17:58','2021-05-14 02:32:49'),(485,4,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-13 09:19:49','2021-05-14 02:32:49'),(486,5,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-13 09:21:43','2021-05-13 09:21:43'),(487,5,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-13 09:21:59','2021-05-13 09:21:59'),(488,2,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-13 09:22:54','2021-05-14 02:33:44'),(489,2,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,5,0,'2021-05-13 09:23:18','2021-05-14 02:33:44'),(490,1,38,8,'Cost Estimate','CEF-21-00008: Your request has been approved.',7,1,2,0,'2021-05-13 09:24:08','2021-05-14 02:31:30'),(491,1,38,9,'Cost Estimate','CEF-21-00009: Your request has been approved.',7,1,2,1,'2021-05-13 09:24:31','2021-05-14 02:32:20'),(492,4,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-13 09:36:16','2021-05-14 02:32:49'),(493,1,40,1,'Bid Recap','BRF-21-00001: Your request has been denied.',1,1,2,0,'2021-05-13 09:40:14','2021-05-14 02:31:30'),(494,4,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-13 09:43:01','2021-05-14 02:32:49'),(495,2,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-13 09:45:38','2021-05-14 02:33:44'),(496,2,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-13 09:45:49','2021-05-14 02:33:44'),(497,2,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-13 09:46:07','2021-05-14 02:33:44'),(498,7,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-13 09:49:04','2021-05-13 09:49:04'),(499,7,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-13 09:49:13','2021-05-13 09:49:13'),(500,7,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-13 09:49:24','2021-05-13 09:49:24'),(501,1,46,6,'Purchase Request','PR-21-00006: Your request has been approved.',7,1,7,0,'2021-05-13 09:50:02','2021-05-14 02:31:30'),(502,1,46,8,'Purchase Request','PR-21-00008: Your request has been approved.',7,1,7,0,'2021-05-13 09:50:19','2021-05-14 02:31:30'),(503,1,46,7,'Purchase Request','PR-21-00007: Your request has been approved.',7,1,7,0,'2021-05-13 09:50:29','2021-05-14 02:31:30'),(504,4,38,10,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-13 23:08:25','2021-05-14 02:32:49'),(505,5,44,13,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 01:35:04','2021-05-14 01:35:04'),(506,4,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,0,'2021-05-14 01:53:25','2021-05-14 02:32:49'),(507,4,38,11,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 03:42:00','2021-05-14 03:42:00'),(508,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 05:40:17','2021-05-14 05:40:17'),(509,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 06:01:09','2021-05-14 06:01:09'),(510,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 06:18:01','2021-05-14 06:18:01'),(511,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 06:20:01','2021-05-14 06:20:01'),(512,4,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 06:44:19','2021-05-14 06:44:19'),(513,4,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 06:58:52','2021-05-14 06:58:52'),(514,5,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:08:58','2021-05-14 07:08:58'),(515,5,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:09:39','2021-05-14 07:09:39'),(516,5,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:09:56','2021-05-14 07:09:56'),(517,5,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:10:18','2021-05-14 07:10:18'),(518,1,38,6,'Cost Estimate','CEF-21-00006: Your request has been denied.',1,1,4,0,'2021-05-14 07:10:43','2021-05-15 13:06:35'),(519,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-14 07:12:09','2021-05-14 07:12:09'),(520,2,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-14 07:12:22','2021-05-14 07:12:22'),(521,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-14 07:12:37','2021-05-14 07:12:37'),(522,1,38,4,'Cost Estimate','CEF-21-00004: Your request has been denied.',1,1,5,0,'2021-05-14 07:13:08','2021-05-15 13:06:35'),(523,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,1,2,0,'2021-05-14 07:14:20','2021-05-15 13:06:35'),(524,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been approved.',7,1,2,0,'2021-05-14 07:15:20','2021-05-15 13:06:35'),(525,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been approved.',7,1,2,0,'2021-05-14 07:15:39','2021-05-15 13:06:35'),(526,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:18:32','2021-05-14 07:18:32'),(527,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:19:18','2021-05-14 07:19:18'),(528,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:19:44','2021-05-14 07:19:44'),(529,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:27:02','2021-05-14 07:27:02'),(530,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:27:38','2021-05-14 07:27:38'),(531,4,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:28:37','2021-05-14 07:28:37'),(532,2,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:32:38','2021-05-14 07:32:38'),(533,2,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:32:55','2021-05-14 07:32:55'),(534,2,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:33:06','2021-05-14 07:33:06'),(535,1,46,7,'Purchase Request','PR-21-00007: Your request has been denied.',1,1,4,0,'2021-05-14 07:33:50','2021-05-15 13:06:35'),(536,2,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:34:58','2021-05-14 07:34:58'),(537,7,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 07:36:53','2021-05-14 07:36:53'),(538,7,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 07:37:44','2021-05-14 07:37:44'),(539,7,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 07:38:04','2021-05-14 07:38:04'),(540,7,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 07:39:21','2021-05-14 07:39:21'),(541,1,46,2,'Purchase Request','PR-21-00002: Your request has been approved.',7,1,7,0,'2021-05-14 07:40:34','2021-05-15 13:06:35'),(542,1,46,3,'Purchase Request','PR-21-00003: Your request has been approved.',7,1,7,0,'2021-05-14 07:40:50','2021-05-15 13:06:35'),(543,1,46,6,'Purchase Request','PR-21-00006: Your request has been approved.',7,1,7,0,'2021-05-14 07:41:07','2021-05-15 13:06:35'),(544,1,46,5,'Purchase Request','PR-21-00005: Your request has been approved.',7,1,7,0,'2021-05-14 07:41:49','2021-05-15 13:06:35'),(545,4,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:46:33','2021-05-14 07:46:33'),(546,4,38,12,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:54:57','2021-05-14 07:54:57'),(547,4,38,13,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:55:13','2021-05-14 07:55:13'),(548,4,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 07:55:41','2021-05-14 07:55:41'),(549,5,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:57:03','2021-05-14 07:57:03'),(550,2,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 07:57:28','2021-05-14 07:57:28'),(551,2,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-14 07:58:25','2021-05-14 07:58:25'),(552,7,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 07:58:33','2021-05-14 07:58:33'),(553,1,38,9,'Cost Estimate','CEF-21-00009: Your request has been approved.',7,1,2,0,'2021-05-14 07:59:33','2021-05-15 13:06:35'),(554,1,46,8,'Purchase Request','PR-21-00008: Your request has been denied.',1,1,7,0,'2021-05-14 07:59:34','2021-05-15 13:06:35'),(555,2,49,1,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 08:28:45','2021-05-14 08:28:45'),(556,2,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 08:29:11','2021-05-14 08:29:11'),(557,2,49,3,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 08:30:20','2021-05-14 08:30:20'),(558,1,49,1,'Service Requisition','SR-21-00001: Your request has been denied.',1,1,2,0,'2021-05-14 08:31:23','2021-05-15 13:06:35'),(559,4,49,3,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 08:31:36','2021-05-14 08:31:36'),(560,4,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 08:31:49','2021-05-14 08:31:49'),(561,5,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 08:32:29','2021-05-14 08:32:29'),(562,5,49,3,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 08:32:37','2021-05-14 08:32:37'),(563,1,49,2,'Service Requisition','SR-21-00002: Your request has been approved.',7,1,5,0,'2021-05-14 08:33:16','2021-05-15 13:06:35'),(564,1,49,3,'Service Requisition','SR-21-00003: Your request has been approved.',7,1,5,0,'2021-05-14 08:33:28','2021-05-15 13:06:35'),(565,2,49,5,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 08:44:48','2021-05-14 08:44:48'),(566,2,49,6,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 08:45:27','2021-05-14 08:45:27'),(567,2,49,7,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 08:46:36','2021-05-14 08:46:36'),(568,4,49,5,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 08:47:50','2021-05-14 08:47:50'),(569,4,49,6,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 08:47:59','2021-05-14 08:47:59'),(570,4,49,7,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 08:48:09','2021-05-14 08:48:09'),(571,5,49,5,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 08:48:45','2021-05-14 08:48:45'),(572,5,49,6,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 08:48:59','2021-05-14 08:48:59'),(573,5,49,7,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 08:49:10','2021-05-14 08:49:10'),(574,1,49,5,'Service Requisition','SR-21-00005: Your request has been approved.',7,1,5,0,'2021-05-14 08:49:44','2021-05-15 13:06:35'),(575,1,49,6,'Service Requisition','SR-21-00006: Your request has been approved.',7,1,5,0,'2021-05-14 08:49:54','2021-05-15 13:06:35'),(576,1,49,7,'Service Requisition','SR-21-00007: Your request has been approved.',7,1,5,0,'2021-05-14 08:50:05','2021-05-15 13:06:35'),(577,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 09:29:25','2021-05-14 09:29:25'),(578,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 09:29:45','2021-05-14 09:29:45'),(579,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 09:30:06','2021-05-14 09:30:06'),(580,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-14 09:30:27','2021-05-14 09:30:27'),(581,2,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 09:31:09','2021-05-14 09:31:09'),(582,2,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 09:31:20','2021-05-14 09:31:20'),(583,2,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 09:31:34','2021-05-14 09:31:34'),(584,2,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-14 09:31:46','2021-05-14 09:31:46'),(585,7,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 09:32:25','2021-05-14 09:32:25'),(586,7,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 09:32:41','2021-05-14 09:32:41'),(587,7,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-14 09:32:53','2021-05-14 09:32:53'),(588,7,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,2,7,'2021-05-14 09:33:08','2021-05-15 02:24:54'),(589,1,46,1,'Purchase Request','PR-21-00001: Your request has been approved.',7,1,7,0,'2021-05-14 09:33:53','2021-05-15 13:06:35'),(590,1,46,2,'Purchase Request','PR-21-00002: Your request has been approved.',7,1,7,0,'2021-05-14 09:34:03','2021-05-15 13:06:35'),(591,1,46,3,'Purchase Request','PR-21-00003: Your request has been approved.',7,1,7,0,'2021-05-14 09:34:41','2021-05-15 13:06:35'),(592,1,126,1,'Inventory Validation','IVR-21-00001: Your request has been denied.',1,1,2,0,'2021-05-14 10:06:44','2021-05-15 13:06:35'),(593,2,41,1,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-15 02:41:50','2021-05-15 02:41:50'),(594,2,41,2,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-15 02:42:10','2021-05-15 02:42:10'),(595,4,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 09:10:50','2021-05-15 09:10:50'),(596,4,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 09:11:05','2021-05-15 09:11:05'),(597,4,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 09:11:20','2021-05-15 09:11:20'),(598,5,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 09:13:18','2021-05-15 09:13:18'),(599,5,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 09:14:14','2021-05-15 09:14:14'),(600,5,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 09:14:27','2021-05-15 09:14:27'),(601,5,39,1,'Bill Material','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 09:17:39','2021-05-15 09:17:39'),(602,5,39,3,'Bill Material','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 09:17:56','2021-05-15 09:17:56'),(603,5,39,4,'Bill Material','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 09:24:14','2021-05-15 09:24:14'),(604,5,39,5,'Bill Material','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 09:24:29','2021-05-15 09:24:29'),(605,2,39,1,'Bill Material','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-15 09:25:31','2021-05-15 09:25:31'),(606,2,39,3,'Bill Material','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-15 09:25:44','2021-05-15 09:25:44'),(607,2,39,4,'Bill Material','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-15 09:25:57','2021-05-15 09:25:57'),(608,2,39,5,'Bill Material','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-15 09:26:30','2021-05-15 09:26:30'),(609,1,126,2,'Inventory Validation','IVR-21-00002: Your request has been approved.',7,1,5,0,'2021-05-15 09:29:46','2021-05-15 13:06:35'),(610,1,126,3,'Inventory Validation','IVR-21-00003: Your request has been approved.',7,1,5,0,'2021-05-15 09:30:01','2021-05-15 13:06:35'),(611,1,126,4,'Inventory Validation','IVR-21-00004: Your request has been approved.',7,1,5,0,'2021-05-15 09:30:32','2021-05-15 13:06:35'),(612,1,39,1,'Bill Material','BOM-21-00001: Your request has been approved.',7,1,2,0,'2021-05-15 09:32:16','2021-05-15 13:06:35'),(613,1,39,3,'Bill Material','BOM-21-00003: Your request has been approved.',7,1,2,0,'2021-05-15 09:32:32','2021-05-15 13:06:35'),(614,1,39,4,'Bill Material','BOM-21-00004: Your request has been approved.',7,1,2,0,'2021-05-15 09:32:53','2021-05-15 13:06:35'),(615,1,39,5,'Bill Material','BOM-21-00005: Your request has been approved.',7,1,2,0,'2021-05-15 09:33:07','2021-05-15 13:06:35'),(616,4,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 12:35:55','2021-05-15 12:35:55'),(617,4,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 12:36:19','2021-05-15 12:36:19'),(618,4,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 12:36:47','2021-05-15 12:36:47'),(619,4,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 12:37:06','2021-05-15 12:37:06'),(620,4,40,5,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 12:37:21','2021-05-15 12:37:21'),(621,5,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 12:39:14','2021-05-15 12:39:14'),(622,1,40,2,'Bid Recap','BRF-21-00002: Your request has been denied.',1,1,4,0,'2021-05-15 12:43:44','2021-05-15 13:06:35'),(623,5,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 12:44:47','2021-05-15 12:44:47'),(624,5,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 12:46:08','2021-05-15 12:46:08'),(625,5,40,5,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-15 12:46:31','2021-05-15 12:46:31'),(626,1,40,1,'Bid Recap','BRF-21-00001: Your request has been approved.',7,1,5,0,'2021-05-15 12:49:48','2021-05-15 13:06:35'),(627,1,40,3,'Bid Recap','BRF-21-00003: Your request has been approved.',7,1,5,0,'2021-05-15 12:50:03','2021-05-15 13:06:35'),(628,1,40,4,'Bid Recap','BRF-21-00004: Your request has been approved.',7,1,5,0,'2021-05-15 12:50:27','2021-05-15 13:06:35'),(629,1,40,5,'Bid Recap','BRF-21-00005: Your request has been denied.',1,1,5,0,'2021-05-15 12:51:36','2021-05-15 13:06:35'),(630,2,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-15 13:13:29','2021-05-15 13:13:29'),(631,2,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-15 13:16:55','2021-05-15 13:16:55'),(632,2,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-15 13:17:35','2021-05-15 13:17:35'),(633,2,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-15 13:18:01','2021-05-15 13:18:01'),(634,2,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-15 13:18:28','2021-05-15 13:18:28'),(635,5,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 13:23:46','2021-05-15 13:23:46'),(636,5,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 13:24:00','2021-05-15 13:24:00'),(637,5,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 13:24:18','2021-05-15 13:24:18'),(638,5,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 13:24:38','2021-05-15 13:24:38'),(639,5,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-15 13:25:09','2021-05-15 13:25:09'),(640,1,47,2,'Purchase Order','P0-21-00002: Your request has been denied.',1,1,5,0,'2021-05-15 13:26:10','2021-05-18 08:32:12'),(641,4,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-15 13:26:20','2021-05-15 13:26:20'),(642,4,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-15 13:26:33','2021-05-15 13:26:33'),(643,4,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-15 13:26:44','2021-05-15 13:26:44'),(644,1,47,3,'Purchase Order','P0-21-00003: Your request has been approved.',7,1,4,0,'2021-05-15 13:28:57','2021-05-18 08:32:12'),(645,1,47,4,'Purchase Order','P0-21-00004: Your request has been approved.',7,1,4,0,'2021-05-15 13:29:10','2021-05-18 08:32:12'),(646,1,47,5,'Purchase Order','P0-21-00005: Your request has been approved.',7,1,4,0,'2021-05-15 13:29:21','2021-05-18 08:32:12'),(647,2,60,8,'Official Business Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 00:31:18','2021-05-17 00:31:18'),(648,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 00:35:34','2021-05-17 00:35:34'),(649,5,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 00:56:33','2021-05-17 00:56:33'),(650,2,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-17 00:57:45','2021-05-17 00:57:45'),(651,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been approved.',7,1,2,0,'2021-05-17 00:58:53','2021-05-18 08:32:12'),(652,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 02:21:10','2021-05-17 02:21:10'),(653,5,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 02:22:27','2021-05-17 02:22:27'),(654,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-17 02:23:09','2021-05-17 02:23:09'),(655,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been approved.',7,1,2,0,'2021-05-17 02:23:47','2021-05-18 08:32:12'),(656,2,49,8,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 02:26:58','2021-05-17 02:26:58'),(657,2,49,9,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 02:38:47','2021-05-17 02:38:47'),(658,4,49,8,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 02:42:03','2021-05-17 02:42:03'),(659,4,49,9,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 02:42:47','2021-05-17 02:42:47'),(660,5,49,8,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 02:43:55','2021-05-17 02:43:55'),(661,5,49,9,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 02:44:15','2021-05-17 02:44:15'),(662,1,49,8,'Service Requisition','SR-21-00008: Your request has been approved.',7,1,5,0,'2021-05-17 02:47:35','2021-05-18 08:32:12'),(663,1,49,9,'Service Requisition','SR-21-00009: Your request has been approved.',7,1,5,0,'2021-05-17 02:49:15','2021-05-18 08:32:12'),(664,2,41,4,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 03:06:12','2021-05-17 03:06:12'),(665,2,41,5,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 03:10:26','2021-05-17 03:10:26'),(666,2,41,6,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 03:32:00','2021-05-17 03:32:00'),(667,4,41,1,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 03:38:38','2021-05-17 03:38:38'),(668,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 03:38:55','2021-05-17 03:38:55'),(669,4,41,2,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 03:39:36','2021-05-17 03:39:36'),(670,1,41,4,'Service Order','P0-21-00004: Your request has been denied.',1,1,2,0,'2021-05-17 03:40:21','2021-05-18 08:32:12'),(671,4,41,5,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 03:41:45','2021-05-17 03:41:45'),(672,2,41,8,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 03:47:58','2021-05-17 03:47:58'),(673,2,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 03:58:52','2021-05-17 03:58:52'),(674,7,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 05:28:50','2021-05-17 05:28:50'),(675,1,46,5,'Purchase Request','PR-21-00005: Your request has been approved.',7,1,7,0,'2021-05-17 05:29:29','2021-05-18 08:32:12'),(676,4,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 05:43:25','2021-05-17 05:43:25'),(677,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 05:45:41','2021-05-17 05:45:41'),(678,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 05:49:18','2021-05-17 05:49:18'),(679,2,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 05:49:57','2021-05-17 05:49:57'),(680,7,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 05:50:56','2021-05-17 05:50:56'),(681,1,46,1,'Purchase Request','PR-21-00001: Your request has been approved.',7,1,7,0,'2021-05-17 05:51:43','2021-05-18 08:32:12'),(682,4,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 05:54:26','2021-05-17 05:54:26'),(683,5,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 05:55:03','2021-05-17 05:55:03'),(684,1,126,1,'Inventory Validation','IVR-21-00001: Your request has been approved.',7,1,5,0,'2021-05-17 05:55:55','2021-05-18 08:32:12'),(685,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 05:58:27','2021-05-17 05:58:27'),(686,5,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 05:59:25','2021-05-17 05:59:25'),(687,5,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 06:00:37','2021-05-17 06:00:37'),(688,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 06:01:42','2021-05-17 06:01:42'),(689,5,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 06:02:37','2021-05-17 06:02:37'),(690,4,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 06:03:00','2021-05-17 06:03:00'),(691,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 06:03:07','2021-05-17 06:03:07'),(692,5,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 06:03:48','2021-05-17 06:03:48'),(693,2,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 06:04:35','2021-05-17 06:04:35'),(694,1,40,1,'Bid Recap','BRF-21-00001: Your request has been approved.',7,1,5,0,'2021-05-17 06:05:40','2021-05-18 08:32:12'),(695,7,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 06:06:22','2021-05-17 06:06:22'),(696,1,46,2,'Purchase Request','PR-21-00002: Your request has been approved.',7,1,7,0,'2021-05-17 06:07:14','2021-05-18 08:32:12'),(697,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-17 06:25:19','2021-05-17 06:25:19'),(698,2,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-17 06:25:37','2021-05-17 06:25:37'),(699,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-17 06:25:49','2021-05-17 06:25:49'),(700,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,1,2,0,'2021-05-17 06:26:45','2021-05-18 08:32:12'),(701,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been approved.',7,1,2,0,'2021-05-17 06:35:53','2021-05-18 08:32:12'),(702,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been denied.',1,1,2,0,'2021-05-17 06:36:34','2021-05-18 08:32:12'),(703,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 06:38:37','2021-05-17 06:38:37'),(704,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 06:41:20','2021-05-17 06:41:20'),(705,2,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 06:42:27','2021-05-17 06:42:27'),(706,2,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 06:42:43','2021-05-17 06:42:43'),(707,2,41,7,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 07:03:12','2021-05-17 07:03:12'),(708,7,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 07:11:13','2021-05-17 07:11:13'),(709,7,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 07:11:34','2021-05-17 07:11:34'),(710,1,46,4,'Purchase Request','PR-21-00004: Your request has been approved.',7,1,7,0,'2021-05-17 07:13:13','2021-05-18 08:32:12'),(711,1,46,5,'Purchase Request','PR-21-00005: Your request has been approved.',7,1,7,0,'2021-05-17 07:13:40','2021-05-18 08:32:12'),(712,2,41,9,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 07:27:27','2021-05-17 07:27:27'),(713,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 07:31:03','2021-05-17 07:31:03'),(714,2,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 07:32:17','2021-05-17 07:32:17'),(715,4,41,7,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 07:38:41','2021-05-17 07:38:41'),(716,1,41,9,'Service Order','P0-21-00009: Your request has been denied.',1,1,2,0,'2021-05-17 07:40:34','2021-05-18 08:32:12'),(717,5,41,7,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 07:41:35','2021-05-17 07:41:35'),(718,4,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 07:41:51','2021-05-17 07:41:51'),(719,4,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 07:42:17','2021-05-17 07:42:17'),(720,1,41,7,'Service Order','P0-21-00007: Your request has been approved.',7,1,5,0,'2021-05-17 07:42:17','2021-05-18 08:32:12'),(721,1,126,4,'Inventory Validation','IVR-21-00004: Your request has been denied.',1,1,2,0,'2021-05-17 07:42:44','2021-05-18 08:32:12'),(722,4,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 07:43:24','2021-05-17 07:43:24'),(723,2,128,1,'Service Completion','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 07:44:08','2021-05-17 07:44:08'),(724,5,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 07:44:23','2021-05-17 07:44:23'),(725,5,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 07:44:39','2021-05-17 07:44:39'),(726,5,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-17 07:44:53','2021-05-17 07:44:53'),(727,2,128,2,'Service Completion','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 07:45:42','2021-05-17 07:45:42'),(728,1,126,2,'Inventory Validation','IVR-21-00002: Your request has been approved.',7,1,5,0,'2021-05-17 07:46:55','2021-05-18 08:32:12'),(729,1,126,5,'Inventory Validation','IVR-21-00005: Your request has been approved.',7,1,5,0,'2021-05-17 07:47:16','2021-05-18 08:32:12'),(730,1,126,3,'Inventory Validation','IVR-21-00003: Your request has been approved.',7,1,5,0,'2021-05-17 07:47:34','2021-05-18 08:32:12'),(731,4,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 08:06:43','2021-05-17 08:06:43'),(732,20,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-17 08:07:35','2021-07-05 23:24:45'),(733,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 08:21:08','2021-05-17 08:21:08'),(734,4,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 22:56:46','2021-05-17 22:56:46'),(735,4,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 22:58:30','2021-05-17 22:58:30'),(736,20,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-17 22:59:49','2021-07-05 23:24:45'),(737,20,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-17 23:08:57','2021-07-05 23:24:45'),(738,1,40,2,'Bid Recap','BRF-21-00002: Your request has been approved.',7,1,20,0,'2021-05-17 23:10:58','2021-05-18 08:32:12'),(739,1,40,4,'Bid Recap','BRF-21-00004: Your request has been approved.',7,1,20,0,'2021-05-17 23:11:16','2021-05-18 08:32:12'),(740,1,40,3,'Bid Recap','BRF-21-00003: Your request has been approved.',7,1,20,0,'2021-05-17 23:11:40','2021-05-18 08:32:12'),(741,2,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 23:46:46','2021-05-17 23:46:46'),(742,2,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 23:47:32','2021-05-17 23:47:32'),(743,2,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 23:48:12','2021-05-17 23:48:12'),(744,2,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 23:50:19','2021-05-17 23:50:19'),(745,2,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 23:51:35','2021-05-17 23:51:35'),(746,2,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-17 23:52:29','2021-05-17 23:52:29'),(747,5,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 23:53:40','2021-05-17 23:53:40'),(748,5,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 23:54:02','2021-05-17 23:54:02'),(749,5,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-17 23:54:19','2021-05-17 23:54:19'),(750,5,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 00:01:39','2021-05-18 00:01:39'),(751,5,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 00:01:51','2021-05-18 00:01:51'),(752,1,47,6,'Purchase Order','P0-21-00006: Your request has been denied.',1,1,2,0,'2021-05-18 00:02:12','2021-05-18 08:32:12'),(753,4,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-18 00:07:44','2021-05-18 00:07:44'),(754,4,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-18 00:08:00','2021-05-18 00:08:00'),(755,4,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-18 00:15:25','2021-05-18 00:15:25'),(756,4,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-18 00:15:50','2021-05-18 00:15:50'),(757,4,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-18 00:16:18','2021-05-18 00:16:18'),(758,1,47,1,'Purchase Order','P0-21-00001: Your request has been approved.',7,1,4,0,'2021-05-18 00:17:06','2021-05-18 08:32:12'),(759,1,47,2,'Purchase Order','P0-21-00002: Your request has been approved.',7,1,4,0,'2021-05-18 00:17:23','2021-05-18 08:32:12'),(760,1,47,3,'Purchase Order','P0-21-00003: Your request has been approved.',7,1,4,0,'2021-05-18 00:18:15','2021-05-18 08:32:12'),(761,1,47,4,'Purchase Order','P0-21-00004: Your request has been approved.',7,1,4,0,'2021-05-18 00:19:13','2021-05-18 08:32:12'),(762,1,47,5,'Purchase Order','P0-21-00005: Your request has been approved.',7,1,4,0,'2021-05-18 00:19:59','2021-05-18 08:32:12'),(763,2,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 00:26:27','2021-05-18 00:26:27'),(764,2,41,11,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 00:50:12','2021-05-18 00:50:12'),(765,2,49,10,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 01:06:18','2021-05-18 01:06:18'),(766,2,49,11,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 01:12:29','2021-05-18 01:12:29'),(767,4,49,11,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 01:34:27','2021-05-18 01:34:27'),(768,5,49,11,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 01:35:33','2021-05-18 01:35:33'),(769,1,49,11,'Service Requisition','SR-21-00011: Your request has been approved.',7,1,5,0,'2021-05-18 01:36:33','2021-05-18 08:32:12'),(770,4,49,10,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 01:37:49','2021-05-18 01:37:49'),(771,5,49,10,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 01:38:24','2021-05-18 01:38:24'),(772,1,49,10,'Service Requisition','SR-21-00010: Your request has been approved.',7,1,5,0,'2021-05-18 01:38:58','2021-05-18 08:32:12'),(773,2,41,12,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 01:40:36','2021-05-18 01:40:36'),(774,2,41,13,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 01:41:13','2021-05-18 01:41:13'),(775,4,41,13,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 01:42:09','2021-05-18 01:42:09'),(776,5,41,13,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 01:43:44','2021-05-18 01:43:44'),(777,1,41,13,'Service Order','P0-21-00013: Your request has been approved.',7,1,5,0,'2021-05-18 01:44:17','2021-05-18 08:32:12'),(778,2,41,14,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 01:51:24','2021-05-18 01:51:24'),(779,4,126,6,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 02:21:01','2021-05-18 02:21:01'),(780,5,126,6,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 02:22:06','2021-05-18 02:22:06'),(781,1,126,6,'Inventory Validation','IVR-21-00006: Your request has been approved.',7,1,5,0,'2021-05-18 02:23:45','2021-05-18 08:32:12'),(782,4,126,7,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 02:26:54','2021-05-18 02:26:54'),(783,5,126,7,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 02:27:39','2021-05-18 02:27:39'),(784,1,126,7,'Inventory Validation','IVR-21-00007: Your request has been denied.',1,1,5,0,'2021-05-18 02:53:56','2021-05-18 08:32:12'),(785,4,126,8,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 02:55:44','2021-05-18 02:55:44'),(786,5,126,8,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 02:57:01','2021-05-18 02:57:01'),(787,1,126,8,'Inventory Validation','IVR-21-00008: Your request has been approved.',7,1,5,0,'2021-05-18 02:57:41','2021-05-18 08:32:12'),(788,4,40,6,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 03:03:22','2021-05-18 03:03:22'),(789,20,40,6,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-18 03:04:15','2021-07-05 23:24:45'),(790,1,40,6,'Bid Recap','BRF-21-00006: Your request has been approved.',7,1,20,0,'2021-05-18 03:15:56','2021-05-18 08:32:12'),(791,4,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 03:22:02','2021-05-18 03:22:02'),(792,2,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 03:55:23','2021-05-18 03:55:23'),(793,4,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 03:58:35','2021-05-18 03:58:35'),(794,1,46,6,'Purchase Request','PR-21-00006: Your request has been denied.',1,1,2,0,'2021-05-18 05:06:51','2021-05-18 08:32:12'),(795,1,47,7,'Purchase Order','P0-21-00007: Your request has been denied.',1,1,2,0,'2021-05-18 05:30:32','2021-05-18 08:32:12'),(796,2,49,12,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 05:44:21','2021-05-18 05:44:21'),(797,4,49,12,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 05:48:13','2021-05-18 05:48:13'),(798,5,49,12,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 05:58:48','2021-05-18 05:58:48'),(799,1,49,12,'Service Requisition','SR-21-00012: Your request has been approved.',7,1,5,0,'2021-05-18 06:00:43','2021-05-18 08:32:12'),(800,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 06:21:57','2021-05-18 06:21:57'),(801,1,38,4,'Cost Estimate','CEF-21-00004: Your request has been denied.',1,1,4,0,'2021-05-18 06:23:20','2021-05-18 08:32:12'),(802,1,38,5,'Cost Estimate','CEF-21-00005: Your request has been denied.',1,1,4,0,'2021-05-18 06:23:50','2021-05-18 08:32:12'),(803,4,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 06:25:31','2021-05-18 06:25:31'),(804,4,38,7,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 06:32:23','2021-05-18 06:32:23'),(805,4,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 06:35:26','2021-05-18 06:35:26'),(806,4,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 06:59:42','2021-05-18 06:59:42'),(807,2,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 07:01:02','2021-05-18 07:01:02'),(808,2,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 07:01:16','2021-05-18 07:01:16'),(809,7,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:02:49','2021-05-18 07:02:49'),(810,7,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:02:59','2021-05-18 07:02:59'),(811,7,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:03:17','2021-05-18 07:03:17'),(812,1,46,7,'Purchase Request','PR-21-00007: Your request has been approved.',7,1,7,0,'2021-05-18 07:04:21','2021-05-18 08:32:12'),(813,1,46,9,'Purchase Request','PR-21-00009: Your request has been approved.',7,1,7,0,'2021-05-18 07:04:36','2021-05-18 08:32:12'),(814,1,46,8,'Purchase Request','PR-21-00008: Your request has been approved.',7,1,7,0,'2021-05-18 07:04:49','2021-05-18 08:32:12'),(815,4,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 07:09:01','2021-05-18 07:09:01'),(816,4,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 07:12:40','2021-05-18 07:12:40'),(817,20,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-18 07:17:45','2021-07-05 23:24:45'),(818,2,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-18 07:18:58','2021-05-18 07:18:58'),(819,1,38,9,'Cost Estimate','CEF-21-00009: Your request has been approved.',7,1,2,0,'2021-05-18 07:19:40','2021-05-18 08:32:12'),(820,4,46,12,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-18 07:26:33','2021-05-18 07:26:33'),(821,2,46,12,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 07:28:09','2021-05-18 07:28:09'),(822,7,46,12,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:28:55','2021-05-18 07:28:55'),(823,1,46,12,'Purchase Request','PR-21-00012: Your request has been approved.',7,1,7,0,'2021-05-18 07:29:51','2021-05-18 08:32:12'),(824,4,126,9,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:33:56','2021-05-18 07:33:56'),(825,5,126,9,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 07:34:41','2021-05-18 07:34:41'),(826,1,126,9,'Inventory Validation','IVR-21-00009: Your request has been approved.',7,1,5,0,'2021-05-18 07:35:15','2021-05-18 08:32:12'),(827,4,40,7,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:42:40','2021-05-18 07:42:40'),(828,20,40,7,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-18 07:43:26','2021-07-05 23:24:45'),(829,4,126,10,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:43:57','2021-05-18 07:43:57'),(830,4,126,11,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:44:37','2021-05-18 07:44:37'),(831,4,126,12,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 07:45:33','2021-05-18 07:45:33'),(832,1,40,7,'Bid Recap','BRF-21-00007: Your request has been approved.',7,1,20,0,'2021-05-18 07:45:41','2021-05-18 08:32:12'),(833,5,126,10,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 07:46:47','2021-05-18 07:46:47'),(834,5,126,11,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 07:47:05','2021-05-18 07:47:05'),(835,5,126,12,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-18 07:47:35','2021-05-18 07:47:35'),(836,1,126,10,'Inventory Validation','IVR-21-00010: Your request has been approved.',7,1,5,0,'2021-05-18 07:48:54','2021-05-18 08:32:12'),(837,1,126,11,'Inventory Validation','IVR-21-00011: Your request has been approved.',7,1,5,0,'2021-05-18 07:49:08','2021-05-18 08:32:12'),(838,1,126,12,'Inventory Validation','IVR-21-00012: Your request has been approved.',7,1,5,1,'2021-05-18 07:49:21','2021-05-18 08:32:23'),(839,4,40,5,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 08:20:33','2021-05-18 08:20:33'),(840,4,40,8,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 08:20:49','2021-05-18 08:20:49'),(841,4,40,9,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-18 08:21:09','2021-05-18 08:21:09'),(842,20,40,5,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-18 08:22:38','2021-07-05 23:24:45'),(843,20,40,8,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-18 23:01:44','2021-07-05 23:24:45'),(844,20,40,9,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-18 23:03:19','2021-07-05 23:24:45'),(845,1,40,5,'Bid Recap','BRF-21-00005: Your request has been approved.',7,1,20,0,'2021-05-18 23:12:36','2021-06-30 23:48:21'),(846,1,40,8,'Bid Recap','BRF-21-00008: Your request has been approved.',7,1,20,0,'2021-05-18 23:15:38','2021-06-30 23:48:21'),(847,1,40,9,'Bid Recap','BRF-21-00009: Your request has been denied.',1,1,20,0,'2021-05-18 23:16:44','2021-06-30 23:48:21'),(848,4,46,14,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 00:17:32','2021-05-19 00:17:32'),(849,4,46,16,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 00:26:43','2021-05-19 00:26:43'),(850,4,46,17,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 00:29:07','2021-05-19 00:29:07'),(851,2,46,15,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 00:46:38','2021-05-19 00:46:38'),(852,7,46,15,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 00:48:13','2021-05-19 00:48:13'),(853,1,46,15,'Purchase Request','PR-21-00015: Your request has been approved.',7,1,7,0,'2021-05-19 00:53:42','2021-06-30 23:48:21'),(854,2,47,8,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 00:56:47','2021-05-19 00:56:47'),(855,4,126,13,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 01:05:17','2021-05-19 01:05:17'),(856,5,126,13,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 01:06:08','2021-05-19 01:06:08'),(857,1,126,13,'Inventory Validation','IVR-21-00013: Your request has been approved.',7,1,5,0,'2021-05-19 01:07:02','2021-06-30 23:48:21'),(858,4,40,11,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 01:40:12','2021-05-19 01:40:12'),(859,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 02:26:23','2021-05-19 02:26:23'),(860,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 02:28:31','2021-05-19 02:28:31'),(861,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 02:33:27','2021-05-19 02:33:27'),(862,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 02:39:10','2021-05-19 02:39:10'),(863,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 02:41:52','2021-05-19 02:41:52'),(864,20,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-19 02:58:42','2021-07-05 23:24:45'),(865,2,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-19 03:01:21','2021-05-19 03:01:21'),(866,1,38,5,'Cost Estimate','CEF-21-00005: Your request has been approved.',7,1,2,0,'2021-05-19 03:02:08','2021-06-30 23:48:21'),(867,20,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-19 03:04:14','2021-07-05 23:24:45'),(868,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been denied.',1,1,4,0,'2021-05-19 03:05:14','2021-06-30 23:48:21'),(869,20,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-19 03:07:10','2021-07-05 23:24:45'),(870,20,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-19 03:07:42','2021-07-05 23:24:45'),(871,2,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-19 03:09:15','2021-05-19 03:09:15'),(872,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-19 03:09:38','2021-05-19 03:09:38'),(873,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-19 03:09:57','2021-05-19 03:09:57'),(874,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,1,2,0,'2021-05-19 03:11:01','2021-06-30 23:48:21'),(875,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been approved.',7,1,2,0,'2021-05-19 03:11:24','2021-06-30 23:48:21'),(876,1,38,4,'Cost Estimate','CEF-21-00004: Your request has been approved.',7,1,2,0,'2021-05-19 03:11:59','2021-06-30 23:48:21'),(877,20,39,1,'Bill of Material','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-19 03:13:55','2021-07-05 23:24:45'),(878,2,39,1,'Bill of Material','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-19 03:16:43','2021-05-19 03:16:43'),(879,1,39,1,'Bill of Material','BOM-21-00001: Your request has been approved.',7,1,2,0,'2021-05-19 03:17:26','2021-06-30 23:48:21'),(880,4,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 03:18:19','2021-05-19 03:18:19'),(881,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 03:22:23','2021-05-19 03:22:23'),(882,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 03:27:23','2021-05-19 03:27:23'),(883,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 03:34:19','2021-05-19 03:34:19'),(884,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 03:38:04','2021-05-19 03:38:04'),(885,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 03:39:05','2021-05-19 03:39:05'),(886,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 03:39:25','2021-05-19 03:39:25'),(887,4,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 03:41:03','2021-05-19 03:41:03'),(888,1,38,6,'Cost Estimate','CEF-21-00006: Your request has been denied.',1,1,4,0,'2021-05-19 05:33:23','2021-06-30 23:48:21'),(889,2,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 05:35:10','2021-05-19 05:35:10'),(890,7,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 05:37:05','2021-05-19 05:37:05'),(891,1,46,5,'Purchase Request','PR-21-00005: Your request has been approved.',7,1,7,0,'2021-05-19 05:38:00','2021-06-30 23:48:21'),(892,2,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 05:38:17','2021-05-19 05:38:17'),(893,2,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 05:38:38','2021-05-19 05:38:38'),(894,1,46,4,'Purchase Request','PR-21-00004: Your request has been denied.',1,1,4,0,'2021-05-19 05:39:04','2021-06-30 23:48:21'),(895,2,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 05:39:19','2021-05-19 05:39:19'),(896,1,46,6,'Purchase Request','PR-21-00006: Your request has been denied.',1,1,4,0,'2021-05-19 05:39:45','2021-06-30 23:48:21'),(897,2,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 05:40:31','2021-05-19 05:40:31'),(898,7,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 05:41:42','2021-05-19 05:41:42'),(899,7,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 05:41:57','2021-05-19 05:41:57'),(900,7,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 05:42:08','2021-05-19 05:42:08'),(901,7,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 05:42:20','2021-05-19 05:42:20'),(902,1,46,1,'Purchase Request','PR-21-00001: Your request has been approved.',7,1,7,0,'2021-05-19 05:49:46','2021-06-30 23:48:21'),(903,1,46,2,'Purchase Request','PR-21-00002: Your request has been approved.',7,1,7,0,'2021-05-19 05:49:59','2021-06-30 23:48:21'),(904,1,46,3,'Purchase Request','PR-21-00003: Your request has been approved.',7,1,7,0,'2021-05-19 05:50:11','2021-06-30 23:48:21'),(905,1,46,7,'Purchase Request','PR-21-00007: Your request has been approved.',7,1,7,0,'2021-05-19 05:50:55','2021-06-30 23:48:21'),(906,4,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 06:03:08','2021-05-19 06:03:08'),(907,5,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 06:04:09','2021-05-19 06:04:09'),(908,1,126,2,'Inventory Validation','IVR-21-00002: Your request has been approved.',7,1,5,0,'2021-05-19 06:06:24','2021-06-30 23:48:21'),(909,4,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 06:09:43','2021-05-19 06:09:43'),(910,4,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 06:10:12','2021-05-19 06:10:12'),(911,4,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 06:11:30','2021-05-19 06:11:30'),(912,4,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 06:15:37','2021-05-19 06:15:37'),(913,1,126,5,'Inventory Validation','IVR-21-00005: Your request has been denied.',1,1,2,0,'2021-05-19 06:16:13','2021-06-30 23:48:21'),(914,20,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-19 06:17:29','2021-07-05 23:24:45'),(915,1,40,1,'Bid Recap','BRF-21-00001: Your request has been approved.',7,1,20,0,'2021-05-19 06:19:09','2021-06-30 23:48:21'),(916,2,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 06:23:44','2021-05-19 06:23:44'),(917,5,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 06:26:13','2021-05-19 06:26:13'),(918,5,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 06:26:45','2021-05-19 06:26:45'),(919,5,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 06:27:27','2021-05-19 06:27:27'),(920,5,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 06:28:41','2021-05-19 06:28:41'),(921,1,126,1,'Inventory Validation','IVR-21-00001: Your request has been approved.',7,1,5,0,'2021-05-19 06:28:52','2021-06-30 23:48:21'),(922,1,126,3,'Inventory Validation','IVR-21-00003: Your request has been approved.',7,1,5,0,'2021-05-19 06:29:07','2021-06-30 23:48:21'),(923,1,126,4,'Inventory Validation','IVR-21-00004: Your request has been approved.',7,1,5,0,'2021-05-19 06:29:20','2021-06-30 23:48:21'),(924,4,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-19 06:30:14','2021-05-19 06:30:14'),(925,1,47,1,'Purchase Order','P0-21-00001: Your request has been approved.',7,1,4,0,'2021-05-19 06:32:14','2021-06-30 23:48:21'),(926,4,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 07:00:16','2021-05-19 07:00:16'),(927,4,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 07:00:53','2021-05-19 07:00:53'),(928,4,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 07:12:15','2021-05-19 07:12:15'),(929,1,46,8,'Purchase Request','PR-21-00008: Your request has been denied.',1,1,4,0,'2021-05-19 07:13:09','2021-06-30 23:48:21'),(930,2,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 07:14:28','2021-05-19 07:14:28'),(931,2,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-19 07:14:41','2021-05-19 07:14:41'),(932,7,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 07:15:28','2021-05-19 07:15:28'),(933,7,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 07:15:46','2021-05-19 07:15:46'),(934,1,46,9,'Purchase Request','PR-21-00009: Your request has been approved.',7,1,7,0,'2021-05-19 07:16:33','2021-06-30 23:48:21'),(935,1,46,10,'Purchase Request','PR-21-00010: Your request has been approved.',7,1,7,0,'2021-05-19 07:16:43','2021-06-30 23:48:21'),(936,1,126,7,'Inventory Validation','IVR-21-00007: Your request has been denied.',1,1,2,0,'2021-05-19 07:21:14','2021-06-30 23:48:21'),(937,4,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 07:28:52','2021-05-19 07:28:52'),(938,4,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 07:29:23','2021-05-19 07:29:23'),(939,4,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-19 07:30:02','2021-05-19 07:30:02'),(940,1,40,5,'Bid Recap','BRF-21-00005: Your request has been denied.',1,1,2,0,'2021-05-19 07:30:39','2021-06-30 23:48:21'),(941,20,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-19 07:31:43','2021-07-05 23:24:45'),(942,20,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-19 07:31:58','2021-07-05 23:24:45'),(943,20,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-19 07:32:15','2021-07-05 23:24:45'),(944,1,40,2,'Bid Recap','BRF-21-00002: Your request has been approved.',7,1,20,0,'2021-05-19 07:34:02','2021-06-30 23:48:21'),(945,1,40,3,'Bid Recap','BRF-21-00003: Your request has been approved.',7,1,20,0,'2021-05-19 07:34:20','2021-06-30 23:48:21'),(946,1,40,4,'Bid Recap','BRF-21-00004: Your request has been approved.',7,1,20,0,'2021-05-19 07:34:38','2021-06-30 23:48:21'),(947,2,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 07:38:14','2021-05-19 07:38:14'),(948,2,49,1,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 22:52:52','2021-05-19 22:52:52'),(949,2,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-19 22:53:51','2021-05-19 22:53:51'),(950,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-20 00:01:34','2021-05-20 00:01:34'),(951,20,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-20 00:08:22','2021-07-05 23:24:45'),(952,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-20 00:10:44','2021-05-20 00:10:44'),(953,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,1,2,0,'2021-05-20 00:13:07','2021-06-30 23:48:21'),(954,20,39,1,'Bill of Material','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-20 01:07:45','2021-07-05 23:24:45'),(955,2,39,1,'Bill of Material','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-20 01:11:01','2021-05-20 01:11:01'),(956,1,39,1,'Bill of Material','BOM-21-00001: Your request has been approved.',7,1,2,0,'2021-05-20 01:11:43','2021-06-30 23:48:21'),(957,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-20 01:28:55','2021-05-20 01:28:55'),(958,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-20 01:32:51','2021-05-20 01:32:51'),(959,2,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-20 01:38:35','2021-05-20 01:38:35'),(960,7,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-20 01:39:43','2021-05-20 01:39:43'),(961,1,46,2,'Purchase Request','PR-21-00002: Your request has been approved.',7,1,7,0,'2021-05-20 01:40:22','2021-06-30 23:48:21'),(962,4,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-20 01:58:41','2021-05-20 01:58:41'),(963,5,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-20 01:59:20','2021-05-20 01:59:20'),(964,1,126,1,'Inventory Validation','IVR-21-00001: Your request has been approved.',7,1,5,0,'2021-05-20 02:00:05','2021-06-30 23:48:21'),(965,4,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-20 02:17:22','2021-05-20 02:17:22'),(966,20,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-20 02:17:55','2021-07-05 23:24:45'),(967,1,40,1,'Bid Recap','BRF-21-00001: Your request has been approved.',7,1,20,0,'2021-05-20 02:18:44','2021-06-30 23:48:21'),(968,2,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-20 02:34:07','2021-05-20 02:34:07'),(969,5,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-20 02:35:05','2021-05-20 02:35:05'),(970,4,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-20 02:35:43','2021-05-20 02:35:43'),(971,1,47,1,'Purchase Order','P0-21-00001: Your request has been approved.',7,1,4,0,'2021-05-20 02:36:29','2021-06-30 23:48:21'),(972,2,49,1,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-20 02:49:47','2021-05-20 02:49:47'),(973,4,49,1,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-20 02:51:51','2021-05-20 02:51:51'),(974,5,49,1,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-20 02:52:37','2021-05-20 02:52:37'),(975,1,49,1,'Service Requisition','SR-21-00001: Your request has been approved.',7,1,5,0,'2021-05-20 02:53:25','2021-06-30 23:48:21'),(976,2,41,1,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-20 02:56:35','2021-05-20 02:56:35'),(977,4,41,1,'Service Order','Akosi Admin asked for your approval.',2,1,2,4,'2021-05-20 02:57:42','2021-05-20 02:57:59'),(978,5,41,1,'Service Order','Akosi Admin asked for your approval.',2,1,4,5,'2021-05-20 02:58:13','2021-05-20 02:58:33'),(979,1,41,1,'Service Order','P0-21-00001: Your request has been approved.',7,1,5,0,'2021-05-20 02:58:47','2021-06-30 23:48:21'),(980,2,128,1,'Service Completion','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-20 03:01:23','2021-05-20 03:01:23'),(981,4,60,18,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-20 05:29:57','2021-05-20 05:29:57'),(982,2,36,1,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 01:10:46','2021-05-21 01:10:46'),(983,1,36,1,'Disposal Item','ADF-21-00001: Your request has been denied.',1,1,2,0,'2021-05-21 01:11:29','2021-06-30 23:48:21'),(984,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 01:12:04','2021-05-21 01:12:04'),(985,2,36,3,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 01:17:52','2021-05-21 01:17:52'),(986,2,36,4,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 01:29:19','2021-05-21 01:29:19'),(987,2,36,5,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 01:44:28','2021-05-21 01:44:28'),(988,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 02:59:51','2021-05-21 02:59:51'),(989,2,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-21 03:01:24','2021-05-21 03:01:24'),(990,2,35,1,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 03:02:01','2021-05-21 03:02:01'),(991,7,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-21 03:02:34','2021-05-21 03:02:34'),(992,1,46,3,'Purchase Request','PR-21-00003: Your request has been approved.',7,1,7,0,'2021-05-21 03:03:15','2021-06-30 23:48:21'),(993,4,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-21 03:05:50','2021-05-21 03:05:50'),(994,5,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-21 03:06:35','2021-05-21 03:06:35'),(995,1,126,2,'Inventory Validation','IVR-21-00002: Your request has been approved.',7,1,5,0,'2021-05-21 03:07:44','2021-06-30 23:48:21'),(996,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 03:12:37','2021-05-21 03:12:37'),(997,2,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-21 03:15:31','2021-05-21 03:15:31'),(998,7,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,1,2,7,'2021-05-21 03:16:21','2021-05-24 23:30:30'),(999,1,46,4,'Purchase Request','PR-21-00004: Your request has been approved.',7,1,7,0,'2021-05-21 03:17:55','2021-06-30 23:48:21'),(1000,1,126,3,'Inventory Validation','IVR-21-00003: Your request has been denied.',1,1,2,1,'2021-05-21 03:38:37','2021-05-24 13:14:01'),(1001,2,36,6,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 03:44:06','2021-05-21 03:44:06'),(1002,2,36,7,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 03:44:43','2021-05-21 03:44:43'),(1003,2,36,8,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 03:45:14','2021-05-21 03:45:14'),(1004,2,36,9,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 03:53:51','2021-05-21 03:53:51'),(1005,2,36,10,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 05:09:05','2021-05-21 05:09:05'),(1006,2,36,14,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-21 07:39:29','2021-05-21 07:39:29'),(1007,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-24 02:06:48','2021-05-24 02:06:48'),(1008,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-24 03:15:07','2021-05-24 03:15:07'),(1009,2,36,1,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-24 07:01:26','2021-05-24 07:01:26'),(1010,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-24 07:07:01','2021-05-24 07:07:01'),(1011,2,36,4,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-24 08:25:47','2021-05-24 08:25:47'),(1012,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-24 22:59:32','2021-05-24 22:59:32'),(1013,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-24 23:27:17','2021-05-24 23:27:17'),(1014,2,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-24 23:28:48','2021-05-24 23:28:48'),(1015,2,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-24 23:28:59','2021-05-24 23:28:59'),(1016,7,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,1,2,7,'2021-05-24 23:29:44','2021-05-24 23:30:42'),(1017,7,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,1,2,7,'2021-05-24 23:29:53','2021-05-24 23:30:10'),(1018,1,46,6,'Purchase Request','PR-21-00006: Your request has been approved.',7,1,7,0,'2021-05-24 23:30:24','2021-06-30 23:48:21'),(1019,1,46,1,'Purchase Request','PR-21-00001: Your request has been approved.',7,1,7,0,'2021-05-24 23:30:54','2021-06-30 23:48:21'),(1020,4,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-24 23:54:31','2021-05-24 23:54:31'),(1021,4,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-24 23:56:01','2021-05-24 23:56:01'),(1022,4,126,6,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-24 23:56:19','2021-05-24 23:56:19'),(1023,5,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-24 23:59:40','2021-05-24 23:59:40'),(1024,5,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-24 23:59:53','2021-05-24 23:59:53'),(1025,5,126,6,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 00:00:05','2021-05-25 00:00:05'),(1026,4,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 00:00:21','2021-05-25 00:00:21'),(1027,2,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 00:01:45','2021-05-25 00:01:45'),(1028,7,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 00:02:30','2021-05-25 00:02:30'),(1029,1,46,7,'Purchase Request','PR-21-00007: Your request has been approved.',7,1,7,0,'2021-05-25 00:03:18','2021-06-30 23:48:21'),(1030,1,126,4,'Inventory Validation','IVR-21-00004: Your request has been approved.',7,1,5,0,'2021-05-25 00:03:36','2021-06-30 23:48:21'),(1031,1,126,5,'Inventory Validation','IVR-21-00005: Your request has been approved.',7,1,5,0,'2021-05-25 00:03:51','2021-06-30 23:48:21'),(1032,1,126,6,'Inventory Validation','IVR-21-00006: Your request has been approved.',7,1,5,0,'2021-05-25 00:04:23','2021-06-30 23:48:21'),(1033,4,126,7,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 00:06:09','2021-05-25 00:06:09'),(1034,5,126,7,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 00:06:58','2021-05-25 00:06:58'),(1035,1,126,7,'Inventory Validation','IVR-21-00007: Your request has been approved.',7,1,5,0,'2021-05-25 00:08:20','2021-06-30 23:48:21'),(1036,4,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 00:11:37','2021-05-25 00:11:37'),(1037,20,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-25 00:12:21','2021-07-05 23:24:45'),(1038,1,40,2,'Bid Recap','BRF-21-00002: Your request has been approved.',7,1,20,0,'2021-05-25 00:14:53','2021-06-30 23:48:21'),(1039,2,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 00:16:25','2021-05-25 00:16:25'),(1040,4,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 00:39:39','2021-05-25 00:39:39'),(1041,4,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 00:40:12','2021-05-25 00:40:12'),(1042,20,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-25 00:41:12','2021-07-05 23:24:45'),(1043,20,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-25 00:41:36','2021-07-05 23:24:45'),(1044,1,40,3,'Bid Recap','BRF-21-00003: Your request has been approved.',7,1,20,0,'2021-05-25 00:47:53','2021-06-30 23:48:21'),(1045,1,40,4,'Bid Recap','BRF-21-00004: Your request has been approved.',7,1,20,0,'2021-05-25 00:48:06','2021-06-30 23:48:21'),(1046,5,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:04:46','2021-05-25 01:04:46'),(1047,4,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:05:32','2021-05-25 01:05:32'),(1048,1,47,2,'Purchase Order','P0-21-00002: Your request has been approved.',7,1,4,0,'2021-05-25 01:06:30','2021-06-30 23:48:21'),(1049,2,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 01:21:52','2021-05-25 01:21:52'),(1050,2,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 01:23:08','2021-05-25 01:23:08'),(1051,2,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 01:24:09','2021-05-25 01:24:09'),(1052,2,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 01:24:47','2021-05-25 01:24:47'),(1053,2,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 01:25:26','2021-05-25 01:25:26'),(1054,2,47,8,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 01:25:57','2021-05-25 01:25:57'),(1055,2,47,9,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 01:27:25','2021-05-25 01:27:25'),(1056,2,47,10,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 01:28:17','2021-05-25 01:28:17'),(1057,5,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:36:34','2021-05-25 01:36:34'),(1058,5,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:38:18','2021-05-25 01:38:18'),(1059,5,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:38:34','2021-05-25 01:38:34'),(1060,5,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:39:02','2021-05-25 01:39:02'),(1061,5,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:43:19','2021-05-25 01:43:19'),(1062,5,47,10,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:48:44','2021-05-25 01:48:44'),(1063,5,47,9,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:49:41','2021-05-25 01:49:41'),(1064,5,47,8,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 01:51:08','2021-05-25 01:51:08'),(1065,4,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:52:00','2021-05-25 01:52:00'),(1066,4,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:52:15','2021-05-25 01:52:15'),(1067,4,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:52:41','2021-05-25 01:52:41'),(1068,4,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:53:01','2021-05-25 01:53:01'),(1069,4,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:53:18','2021-05-25 01:53:18'),(1070,4,47,8,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:53:35','2021-05-25 01:53:35'),(1071,4,47,9,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:54:00','2021-05-25 01:54:00'),(1072,4,47,10,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 01:54:18','2021-05-25 01:54:18'),(1073,1,47,3,'Purchase Order','P0-21-00003: Your request has been approved.',7,1,4,0,'2021-05-25 01:55:46','2021-06-30 23:48:21'),(1074,1,47,5,'Purchase Order','P0-21-00005: Your request has been approved.',7,1,4,0,'2021-05-25 01:56:00','2021-06-30 23:48:21'),(1075,1,47,7,'Purchase Order','P0-21-00007: Your request has been approved.',7,1,4,0,'2021-05-25 01:56:21','2021-06-30 23:48:21'),(1076,1,47,4,'Purchase Order','P0-21-00004: Your request has been approved.',7,1,4,0,'2021-05-25 01:56:40','2021-06-30 23:48:21'),(1077,1,47,6,'Purchase Order','P0-21-00006: Your request has been approved.',7,1,4,0,'2021-05-25 01:57:01','2021-06-30 23:48:21'),(1078,1,47,8,'Purchase Order','P0-21-00008: Your request has been approved.',7,1,4,0,'2021-05-25 01:57:16','2021-06-30 23:48:21'),(1079,1,47,9,'Purchase Order','P0-21-00009: Your request has been approved.',7,1,4,0,'2021-05-25 01:57:33','2021-06-30 23:48:21'),(1080,1,47,10,'Purchase Order','P0-21-00010: Your request has been approved.',7,1,4,0,'2021-05-25 01:57:58','2021-06-30 23:48:21'),(1081,4,33,1,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 02:28:34','2021-05-25 02:28:34'),(1082,4,33,2,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 02:30:02','2021-05-25 02:30:02'),(1083,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 02:30:09','2021-05-25 02:30:09'),(1084,20,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-25 02:33:26','2021-07-05 23:24:45'),(1085,4,33,3,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 02:33:28','2021-05-25 02:33:28'),(1086,2,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-25 02:35:49','2021-05-25 02:35:49'),(1087,4,33,4,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 02:35:58','2021-05-25 02:35:58'),(1088,4,33,5,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 02:36:13','2021-05-25 02:36:13'),(1089,1,38,5,'Cost Estimate','CEF-21-00005: Your request has been approved.',7,1,2,0,'2021-05-25 02:38:24','2021-06-30 23:48:21'),(1090,4,33,6,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 02:43:55','2021-05-25 02:43:55'),(1091,4,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 02:49:42','2021-05-25 02:49:42'),(1092,4,33,7,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 03:05:11','2021-05-25 03:05:11'),(1093,4,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 03:05:16','2021-05-25 03:05:16'),(1094,2,33,1,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 03:07:27','2021-05-25 03:07:27'),(1095,1,33,2,'Inventory  Receiving','INRR-21-00002: Your request has been denied.',1,1,4,0,'2021-05-25 03:09:07','2021-06-30 23:48:21'),(1096,2,33,3,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 03:09:21','2021-05-25 03:09:21'),(1097,2,33,4,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 03:09:32','2021-05-25 03:09:32'),(1098,2,33,5,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 03:09:43','2021-05-25 03:09:43'),(1099,2,33,6,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 03:10:05','2021-05-25 03:10:05'),(1100,2,33,7,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 03:10:20','2021-05-25 03:10:20'),(1101,5,33,1,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 03:12:58','2021-05-25 03:12:58'),(1102,5,33,3,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 03:13:10','2021-05-25 03:13:10'),(1103,5,33,4,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 03:13:24','2021-05-25 03:13:24'),(1104,5,33,5,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 03:13:38','2021-05-25 03:13:38'),(1105,5,33,6,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 03:13:50','2021-05-25 03:13:50'),(1106,5,33,7,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 03:27:57','2021-05-25 03:27:57'),(1107,1,33,1,'Inventory  Receiving','INRR-21-00001: Your request has been approved.',7,1,5,0,'2021-05-25 03:29:23','2021-06-30 23:48:21'),(1108,1,33,3,'Inventory  Receiving','INRR-21-00003: Your request has been approved.',7,1,5,0,'2021-05-25 03:29:33','2021-06-30 23:48:21'),(1109,1,33,4,'Inventory  Receiving','INRR-21-00004: Your request has been approved.',7,1,5,0,'2021-05-25 03:29:42','2021-06-30 23:48:21'),(1110,1,33,5,'Inventory  Receiving','INRR-21-00005: Your request has been approved.',7,1,5,0,'2021-05-25 03:29:53','2021-06-30 23:48:21'),(1111,1,33,6,'Inventory  Receiving','INRR-21-00006: Your request has been approved.',7,1,5,0,'2021-05-25 03:30:03','2021-06-30 23:48:21'),(1112,1,33,7,'Inventory  Receiving','INRR-21-00007: Your request has been approved.',7,1,5,0,'2021-05-25 03:30:40','2021-06-30 23:48:21'),(1113,4,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 03:32:24','2021-05-25 03:32:24'),(1114,20,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-25 03:33:10','2021-07-05 23:24:45'),(1115,2,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-25 03:34:04','2021-05-25 03:34:04'),(1116,1,38,6,'Cost Estimate','CEF-21-00006: Your request has been approved.',7,1,2,0,'2021-05-25 03:35:07','2021-06-30 23:48:21'),(1117,20,39,3,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-25 05:15:09','2021-07-05 23:24:45'),(1118,4,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 05:22:45','2021-05-25 05:22:45'),(1119,2,39,3,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-25 05:24:51','2021-05-25 05:24:51'),(1120,2,35,2,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 05:25:22','2021-05-25 05:25:22'),(1121,1,39,3,'Project Budget Rationale','PBR-21-00003: Your request has been approved.',7,1,2,0,'2021-05-25 05:25:44','2021-06-30 23:48:21'),(1122,4,33,8,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 05:26:49','2021-05-25 05:26:49'),(1123,2,33,8,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 05:27:44','2021-05-25 05:27:44'),(1124,5,33,8,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 05:29:53','2021-05-25 05:29:53'),(1125,4,46,11,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 05:31:09','2021-05-25 05:31:09'),(1126,2,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 05:32:53','2021-05-25 05:32:53'),(1127,7,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 05:35:14','2021-05-25 05:35:14'),(1128,1,33,8,'Inventory  Receiving','INRR-21-00008: Your request has been approved.',7,1,5,0,'2021-05-25 05:35:23','2021-06-30 23:48:21'),(1129,2,35,3,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 05:57:54','2021-05-25 05:57:54'),(1130,2,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 06:43:54','2021-05-25 06:43:54'),(1131,2,46,11,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 06:44:06','2021-05-25 06:44:06'),(1132,7,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 06:49:32','2021-05-25 06:49:32'),(1133,7,46,11,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 06:49:41','2021-05-25 06:49:41'),(1134,1,46,9,'Purchase Request','PR-21-00009: Your request has been approved.',7,1,7,0,'2021-05-25 06:51:34','2021-06-30 23:48:21'),(1135,1,46,11,'Purchase Request','PR-21-00011: Your request has been approved.',7,1,7,0,'2021-05-25 06:51:46','2021-06-30 23:48:21'),(1136,4,126,8,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 06:56:41','2021-05-25 06:56:41'),(1137,5,126,8,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 06:57:26','2021-05-25 06:57:26'),(1138,1,126,8,'Inventory Validation','IVR-21-00008: Your request has been approved.',7,1,5,0,'2021-05-25 06:58:16','2021-06-30 23:48:21'),(1139,4,38,11,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 07:47:24','2021-05-25 07:47:24'),(1140,20,38,11,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-25 07:47:50','2021-07-05 23:24:45'),(1141,1,46,10,'Purchase Request','PR-21-00010: Your request has been approved.',7,1,7,0,'2021-05-25 07:48:28','2021-06-30 23:48:21'),(1142,2,38,11,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-25 07:49:21','2021-05-25 07:49:21'),(1143,1,38,11,'Cost Estimate','CEF-21-00011: Your request has been approved.',7,1,2,0,'2021-05-25 07:50:10','2021-06-30 23:48:21'),(1144,4,40,7,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 07:56:30','2021-05-25 07:56:30'),(1145,20,40,7,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-25 07:57:08','2021-07-05 23:24:45'),(1146,1,40,7,'Bid Recap','BRF-21-00007: Your request has been approved.',7,1,20,0,'2021-05-25 07:58:08','2021-06-30 23:48:21'),(1147,4,60,19,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 08:00:24','2021-05-25 08:00:24'),(1148,2,47,11,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 08:00:54','2021-05-25 08:00:54'),(1149,6,60,19,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 08:01:30','2021-05-25 08:01:30'),(1150,5,47,11,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 08:03:28','2021-05-25 08:03:28'),(1151,4,47,11,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-25 08:04:19','2021-05-25 08:04:19'),(1152,5,60,19,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,6,0,'2021-05-25 08:04:43','2021-05-25 08:04:43'),(1153,1,47,11,'Purchase Order','P0-21-00011: Your request has been approved.',7,1,4,0,'2021-05-25 08:05:07','2021-06-30 23:48:21'),(1154,1,60,19,'Change Schedule Form','SCH-21-00019: Your request has been approved.',7,1,5,0,'2021-05-25 08:05:12','2021-06-30 23:48:21'),(1155,4,60,20,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 08:07:00','2021-05-25 08:07:00'),(1156,2,36,1,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 22:54:14','2021-05-25 22:54:14'),(1157,2,36,3,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 22:56:26','2021-05-25 22:56:26'),(1158,2,36,4,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 22:57:57','2021-05-25 22:57:57'),(1159,2,36,5,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 22:58:40','2021-05-25 22:58:40'),(1160,1,36,3,'Disposal Item','ADF-21-00003: Your request has been denied.',1,1,2,0,'2021-05-25 23:00:02','2021-06-30 23:48:21'),(1161,3,36,4,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 23:00:41','2021-05-25 23:00:41'),(1162,3,36,5,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 23:00:58','2021-05-25 23:00:58'),(1163,4,36,4,'Disposal Item','Akosi Admin asked for your approval.',2,0,3,0,'2021-05-25 23:05:10','2021-05-25 23:05:10'),(1164,4,36,5,'Disposal Item','Akosi Admin asked for your approval.',2,0,3,0,'2021-05-25 23:05:20','2021-05-25 23:05:20'),(1165,1,36,4,'Disposal Item','ADF-21-00004: Your request has been approved.',7,1,4,0,'2021-05-25 23:06:18','2021-06-30 23:48:21'),(1166,1,36,5,'Disposal Item','ADF-21-00005: Your request has been approved.',7,1,4,0,'2021-05-25 23:06:31','2021-06-30 23:48:21'),(1167,2,36,7,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 23:09:38','2021-05-25 23:09:38'),(1168,2,36,8,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 23:10:29','2021-05-25 23:10:29'),(1169,4,60,21,'Change Schedule Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 23:47:26','2021-05-25 23:47:26'),(1170,2,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-25 23:52:18','2021-05-25 23:52:18'),(1171,4,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-25 23:56:14','2021-05-25 23:56:14'),(1172,5,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-25 23:56:57','2021-05-25 23:56:57'),(1173,1,49,2,'Service Requisition','SR-21-00002: Your request has been approved.',7,1,5,0,'2021-05-25 23:57:43','2021-06-30 23:48:21'),(1174,2,49,3,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:01:26','2021-05-26 00:01:26'),(1175,2,49,3,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:03:20','2021-05-26 00:03:20'),(1176,2,49,3,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:06:44','2021-05-26 00:06:44'),(1177,2,49,3,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:07:56','2021-05-26 00:07:56'),(1178,4,38,12,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:11:41','2021-05-26 00:11:41'),(1179,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:14:09','2021-05-26 00:14:09'),(1180,2,49,3,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:17:33','2021-05-26 00:17:33'),(1181,1,49,3,'Service Requisition','SR-21-00003: Your request has been denied.',1,1,2,0,'2021-05-26 00:17:56','2021-06-30 23:48:21'),(1182,2,49,4,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:18:38','2021-05-26 00:18:38'),(1183,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 00:30:01','2021-05-26 00:30:01'),(1184,20,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-26 00:49:31','2021-07-05 23:24:45'),(1185,20,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-26 00:50:02','2021-07-05 23:24:45'),(1186,20,38,12,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-26 00:51:15','2021-07-05 23:24:45'),(1187,2,38,12,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-26 00:57:59','2021-05-26 00:57:59'),(1188,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-26 00:58:50','2021-05-26 00:58:50'),(1189,2,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-26 01:00:00','2021-05-26 01:00:00'),(1190,1,38,12,'Cost Estimate','CEF-21-00012: Your request has been approved.',7,1,2,0,'2021-05-26 01:01:25','2021-06-30 23:48:21'),(1191,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been approved.',7,1,2,0,'2021-05-26 01:01:40','2021-06-30 23:48:21'),(1192,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,1,2,0,'2021-05-26 01:02:39','2021-06-30 23:48:21'),(1193,4,38,13,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 01:10:25','2021-05-26 01:10:25'),(1194,1,38,13,'Cost Estimate','CEF-21-00013: Your request has been denied.',1,1,4,0,'2021-05-26 01:41:20','2021-06-30 23:48:21'),(1195,2,36,9,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 01:41:55','2021-05-26 01:41:55'),(1196,4,38,14,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 01:43:01','2021-05-26 01:43:01'),(1197,1,38,14,'Cost Estimate','CEF-21-00014: Your request has been denied.',1,1,4,0,'2021-05-26 01:46:32','2021-06-30 23:48:21'),(1198,4,38,15,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 01:49:00','2021-05-26 01:49:00'),(1199,1,36,9,'Disposal Item','ADF-21-00009: Your request has been denied.',1,1,2,0,'2021-05-26 01:52:57','2021-06-30 23:48:21'),(1200,2,36,10,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 01:54:28','2021-05-26 01:54:28'),(1201,4,42,1,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 01:55:23','2021-05-26 01:55:23'),(1202,4,42,2,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 01:56:47','2021-05-26 01:56:47'),(1203,5,44,1,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 02:02:24','2021-05-26 02:02:24'),(1204,5,44,2,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 02:03:18','2021-05-26 02:03:18'),(1205,2,44,2,'Inventory Incident','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-26 02:23:08','2021-05-26 02:23:08'),(1206,4,126,12,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 02:26:03','2021-05-26 02:26:03'),(1207,5,126,12,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 02:27:23','2021-05-26 02:27:23'),(1208,1,126,12,'Inventory Validation','IVR-21-00012: Your request has been approved.',7,1,5,0,'2021-05-26 02:28:55','2021-06-30 23:48:21'),(1209,4,44,2,'Inventory Incident','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 02:35:17','2021-05-26 02:35:17'),(1210,1,44,2,'Inventory Incident','IR-21-00002: Your request has been approved.',7,1,4,0,'2021-05-26 02:38:10','2021-06-30 23:48:21'),(1211,4,38,17,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 02:47:17','2021-05-26 02:47:17'),(1212,2,42,2,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 02:55:15','2021-05-26 02:55:15'),(1213,5,42,2,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 02:56:12','2021-05-26 02:56:12'),(1214,1,42,2,'Material Withdrawal','MWF-21-00002: Your request has been approved.',7,1,5,0,'2021-05-26 02:56:53','2021-06-30 23:48:21'),(1215,4,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 02:57:13','2021-05-26 02:57:13'),(1216,4,42,3,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 02:58:53','2021-05-26 02:58:53'),(1217,2,42,3,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 02:59:46','2021-05-26 02:59:46'),(1218,5,42,3,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 03:00:43','2021-05-26 03:00:43'),(1219,1,42,3,'Material Withdrawal','MWF-21-00003: Your request has been approved.',7,1,5,0,'2021-05-26 03:01:47','2021-06-30 23:48:21'),(1220,4,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:02:10','2021-05-26 03:02:10'),(1221,2,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 03:06:23','2021-05-26 03:06:23'),(1222,5,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 03:08:46','2021-05-26 03:08:46'),(1223,1,43,3,'Borrowing Item','EBF-21-00003: Your request has been approved.',7,1,5,0,'2021-05-26 03:09:33','2021-06-30 23:48:21'),(1224,2,36,11,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:37:38','2021-05-26 03:37:38'),(1225,2,35,1,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:39:17','2021-05-26 03:39:17'),(1226,3,36,11,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 03:39:56','2021-05-26 03:39:56'),(1227,1,36,11,'Disposal Item','ADF-21-00011: Your request has been denied.',1,1,3,0,'2021-05-26 03:40:44','2021-06-30 23:48:21'),(1228,2,47,12,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:41:04','2021-05-26 03:41:04'),(1229,2,36,12,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:42:41','2021-05-26 03:42:41'),(1230,2,36,10,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:43:35','2021-05-26 03:43:35'),(1231,4,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:45:23','2021-05-26 03:45:23'),(1232,2,35,1,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:57:20','2021-05-26 03:57:20'),(1233,2,47,13,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 03:59:46','2021-05-26 03:59:46'),(1234,5,35,1,'Return Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 04:00:30','2021-05-26 04:00:30'),(1235,4,35,1,'Return Item','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-26 04:01:17','2021-05-26 04:01:17'),(1236,1,35,1,'Return Item','RI-21-00001: Your request has been approved.',7,1,4,0,'2021-05-26 04:01:59','2021-06-30 23:48:21'),(1237,1,47,12,'Purchase Order','P0-21-00012: Your request has been denied.',1,1,2,0,'2021-05-26 04:19:45','2021-06-30 23:48:21'),(1238,2,35,3,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 04:23:26','2021-05-26 04:23:26'),(1239,2,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 04:24:31','2021-05-26 04:24:31'),(1240,2,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 04:24:57','2021-05-26 04:24:57'),(1241,2,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 04:25:07','2021-05-26 04:25:07'),(1242,5,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 04:25:43','2021-05-26 04:25:43'),(1243,1,43,2,'Return Item','EBF-21-00002: Your request has been denied.',1,1,2,0,'2021-05-26 04:25:57','2021-06-30 23:48:21'),(1244,5,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 04:26:14','2021-05-26 04:26:14'),(1245,1,43,1,'Borrowing Item','EBF-21-00001: Your request has been approved.',7,1,5,0,'2021-05-26 04:26:48','2021-06-30 23:48:21'),(1246,1,43,4,'Borrowing Item','EBF-21-00004: Your request has been approved.',7,1,5,0,'2021-05-26 04:27:00','2021-06-30 23:48:21'),(1247,2,35,4,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 04:28:49','2021-05-26 04:28:49'),(1248,2,36,14,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:08:56','2021-05-26 05:08:56'),(1249,2,36,15,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:09:56','2021-05-26 05:09:56'),(1250,4,43,5,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:12:00','2021-05-26 05:12:00'),(1251,4,43,6,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:14:11','2021-05-26 05:14:11'),(1252,4,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:17:45','2021-05-26 05:17:45'),(1253,4,43,7,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:19:13','2021-05-26 05:19:13'),(1254,20,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-26 05:19:49','2021-07-05 23:24:45'),(1255,2,38,18,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-26 05:21:15','2021-05-26 05:21:15'),(1256,4,43,8,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:21:38','2021-05-26 05:21:38'),(1257,1,38,18,'Cost Estimate','CEF-21-00018: Your request has been approved.',7,1,2,0,'2021-05-26 05:23:01','2021-06-30 23:48:21'),(1258,4,43,9,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:24:49','2021-05-26 05:24:49'),(1259,20,39,6,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-26 05:31:59','2021-07-05 23:24:45'),(1260,2,35,2,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:32:46','2021-05-26 05:32:46'),(1261,2,39,6,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,20,0,'2021-05-26 05:33:12','2021-05-26 05:33:12'),(1262,1,39,6,'Project Budget Rationale','PBR-21-00006: Your request has been approved.',7,1,2,0,'2021-05-26 05:34:21','2021-06-30 23:48:21'),(1263,4,42,4,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:38:53','2021-05-26 05:38:53'),(1264,4,42,5,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:43:34','2021-05-26 05:43:34'),(1265,2,37,3,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:48:56','2021-05-26 05:48:56'),(1266,1,37,3,'Transfer Request','TR-21-00003: Your request has been denied.',1,1,2,0,'2021-05-26 05:55:34','2021-06-30 23:48:21'),(1267,4,60,21,'Change Schedule','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:57:53','2021-05-26 05:57:53'),(1268,2,37,6,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:59:00','2021-05-26 05:59:00'),(1269,4,60,22,'Change Schedule','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:59:00','2021-05-26 05:59:00'),(1270,4,42,6,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:59:29','2021-05-26 05:59:29'),(1271,4,60,22,'Change Schedule','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 05:59:34','2021-05-26 05:59:34'),(1272,1,60,22,'Change Schedule','SCH-21-00022: Your request has been denied.',1,1,4,0,'2021-05-26 06:00:56','2021-06-30 23:48:21'),(1273,4,60,23,'Change Schedule','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 06:03:19','2021-05-26 06:03:19'),(1274,2,37,7,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 06:13:09','2021-05-26 06:13:09'),(1275,2,49,1,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 06:18:05','2021-05-26 06:18:05'),(1276,4,49,1,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 06:20:04','2021-05-26 06:20:04'),(1277,5,49,1,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 06:21:00','2021-05-26 06:21:00'),(1278,1,49,1,'Service Requisition','SR-21-00001: Your request has been approved.',7,1,5,0,'2021-05-26 06:23:10','2021-06-30 23:48:21'),(1279,2,36,16,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 06:23:52','2021-05-26 06:23:52'),(1280,3,37,7,'Transfer Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 06:24:22','2021-05-26 06:24:22'),(1281,2,41,1,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 06:25:11','2021-05-26 06:25:11'),(1282,4,41,1,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 06:27:15','2021-05-26 06:27:15'),(1283,5,41,1,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 06:28:40','2021-05-26 06:28:40'),(1284,1,41,1,'Service Order','S0-21-00001: Your request has been denied.',1,1,5,0,'2021-05-26 06:30:52','2021-06-30 23:48:21'),(1285,1,37,7,'Transfer Request','TR-21-00007: Your request has been denied.',1,1,3,0,'2021-05-26 06:31:26','2021-06-30 23:48:21'),(1286,2,41,2,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 06:31:35','2021-05-26 06:31:35'),(1287,4,41,2,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 06:32:21','2021-05-26 06:32:21'),(1288,5,41,2,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 06:33:28','2021-05-26 06:33:28'),(1289,2,37,8,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 06:33:59','2021-05-26 06:33:59'),(1290,1,41,2,'Service Order','S0-21-00002: Your request has been approved.',7,1,5,0,'2021-05-26 06:34:23','2021-06-30 23:48:21'),(1291,1,37,8,'Transfer Request','TR-21-00008: Your request has been denied.',1,1,2,0,'2021-05-26 06:34:44','2021-06-30 23:48:21'),(1292,3,37,6,'Transfer Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 06:38:35','2021-05-26 06:38:35'),(1293,4,37,6,'Transfer Request','Akosi Admin asked for your approval.',2,0,3,0,'2021-05-26 06:39:05','2021-05-26 06:39:05'),(1294,1,37,6,'Transfer Request','TR-21-00006: Your request has been approved.',7,1,4,0,'2021-05-26 06:40:39','2021-06-30 23:48:21'),(1295,2,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:00:48','2021-05-26 07:00:48'),(1296,4,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 07:02:07','2021-05-26 07:02:07'),(1297,5,49,2,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 07:03:11','2021-05-26 07:03:11'),(1298,1,49,2,'Service Requisition','SR-21-00002: Your request has been approved.',7,1,5,0,'2021-05-26 07:04:05','2021-06-30 23:48:21'),(1299,2,41,3,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:04:39','2021-05-26 07:04:39'),(1300,2,41,3,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:05:06','2021-05-26 07:05:06'),(1301,1,41,3,'Service Order','S0-21-00003: Your request has been denied.',1,1,2,0,'2021-05-26 07:06:16','2021-06-30 23:48:21'),(1302,2,41,4,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:07:03','2021-05-26 07:07:03'),(1303,2,59,2,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:16:31','2021-05-26 07:16:31'),(1304,2,59,2,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:17:04','2021-05-26 07:17:04'),(1305,2,59,2,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:17:36','2021-05-26 07:17:36'),(1306,2,41,4,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:21:25','2021-05-26 07:21:25'),(1307,4,41,4,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 07:22:20','2021-05-26 07:22:20'),(1308,2,59,2,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:23:17','2021-05-26 07:23:17'),(1309,5,41,4,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 07:24:06','2021-05-26 07:24:06'),(1310,1,41,4,'Service Order','S0-21-00004: Your request has been approved.',7,1,5,0,'2021-05-26 07:25:26','2021-06-30 23:48:21'),(1311,3,59,2,'Loan Form','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 07:25:38','2021-05-26 07:25:38'),(1312,4,59,2,'Loan Form','Akosi Admin asked for your approval.',2,0,3,0,'2021-05-26 07:26:23','2021-05-26 07:26:23'),(1313,1,59,2,'Loan Form','LNF-21-00002: Your request has been approved.',7,1,4,0,'2021-05-26 07:27:01','2021-06-30 23:48:21'),(1314,4,43,10,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:40:15','2021-05-26 07:40:15'),(1315,2,36,17,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 07:40:20','2021-05-26 07:40:20'),(1316,2,43,10,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 07:42:36','2021-05-26 07:42:36'),(1317,5,43,10,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 07:43:16','2021-05-26 07:43:16'),(1318,1,43,10,'Borrowing Item','EBF-21-00010: Your request has been approved.',7,1,5,0,'2021-05-26 07:47:37','2021-06-30 23:48:21'),(1319,2,128,1,'Service Completion','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 08:00:55','2021-05-26 08:00:55'),(1320,2,128,1,'Service Completion','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 08:02:56','2021-05-26 08:02:56'),(1321,4,128,1,'Service Completion','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 08:04:03','2021-05-26 08:04:03'),(1322,4,43,12,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 08:04:14','2021-05-26 08:04:14'),(1323,4,43,13,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 08:04:30','2021-05-26 08:04:30'),(1324,5,128,1,'Service Completion','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 08:04:50','2021-05-26 08:04:50'),(1325,1,128,1,'Service Completion','SC-21-00001: Your request has been approved.',7,1,5,0,'2021-05-26 08:05:33','2021-06-30 23:48:21'),(1326,4,38,16,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 08:07:46','2021-05-26 08:07:46'),(1327,4,38,19,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 08:09:04','2021-05-26 08:09:04'),(1328,4,46,14,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-26 23:18:14','2021-05-26 23:18:14'),(1329,2,46,14,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-26 23:19:15','2021-05-26 23:19:15'),(1330,7,46,14,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-26 23:20:12','2021-05-26 23:20:12'),(1331,1,46,14,'Purchase Request','PR-21-00014: Your request has been approved.',7,1,7,0,'2021-05-26 23:21:08','2021-06-30 23:48:21'),(1332,4,38,23,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 00:18:13','2021-05-27 00:18:13'),(1333,4,38,24,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 00:26:28','2021-05-27 00:26:28'),(1334,4,38,25,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 00:30:10','2021-05-27 00:30:10'),(1335,4,38,26,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 00:30:10','2021-05-27 00:30:10'),(1336,4,38,16,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 00:31:53','2021-05-27 00:31:53'),(1337,20,38,25,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-27 00:32:30','2021-07-05 23:24:45'),(1338,1,38,7,'Cost Estimate','CEF-21-00007: Your request has been denied.',1,1,4,0,'2021-05-27 00:34:12','2021-06-30 23:48:21'),(1339,1,38,8,'Cost Estimate','CEF-21-00008: Your request has been denied.',1,1,4,0,'2021-05-27 00:34:29','2021-06-30 23:48:21'),(1340,20,38,15,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-27 00:34:44','2021-07-05 23:24:45'),(1341,20,38,19,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-27 00:35:01','2021-07-05 23:24:45'),(1342,20,38,23,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-27 00:35:17','2021-07-05 23:24:45'),(1343,20,38,24,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-27 00:35:45','2021-07-05 23:24:45'),(1344,20,38,26,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-27 00:36:03','2021-07-05 23:24:45'),(1345,20,38,16,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-27 00:36:23','2021-07-05 23:24:45'),(1346,4,46,16,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 00:40:21','2021-05-27 00:40:21'),(1347,4,46,17,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 00:40:54','2021-05-27 00:40:54'),(1348,4,46,18,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 00:41:25','2021-05-27 00:41:25'),(1349,2,46,16,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 01:32:27','2021-05-27 01:32:27'),(1350,2,46,17,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 01:32:39','2021-05-27 01:32:39'),(1351,2,46,18,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 01:34:18','2021-05-27 01:34:18'),(1352,7,46,16,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 01:35:10','2021-05-27 01:35:10'),(1353,7,46,17,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 01:35:22','2021-05-27 01:35:22'),(1354,7,46,18,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 01:35:36','2021-05-27 01:35:36'),(1355,1,46,16,'Purchase Request','PR-21-00016: Your request has been approved.',7,1,7,0,'2021-05-27 01:37:41','2021-06-30 23:48:21'),(1356,1,46,17,'Purchase Request','PR-21-00017: Your request has been approved.',7,1,7,0,'2021-05-27 01:37:51','2021-06-30 23:48:21'),(1357,1,46,18,'Purchase Request','PR-21-00018: Your request has been approved.',7,1,7,0,'2021-05-27 01:38:01','2021-06-30 23:48:21'),(1358,4,126,13,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:21:47','2021-05-27 02:21:47'),(1359,4,126,14,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:22:10','2021-05-27 02:22:10'),(1360,4,126,15,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:22:34','2021-05-27 02:22:34'),(1361,4,126,16,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:23:31','2021-05-27 02:23:31'),(1362,4,126,17,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:23:47','2021-05-27 02:23:47'),(1363,5,126,13,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 02:24:37','2021-05-27 02:24:37'),(1364,5,126,14,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 02:24:54','2021-05-27 02:24:54'),(1365,5,126,15,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 02:25:08','2021-05-27 02:25:08'),(1366,5,126,16,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 02:25:26','2021-05-27 02:25:26'),(1367,5,126,17,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 02:25:48','2021-05-27 02:25:48'),(1368,1,126,13,'Inventory Validation','IVR-21-00013: Your request has been approved.',7,1,5,0,'2021-05-27 02:27:17','2021-06-30 23:48:21'),(1369,1,126,15,'Inventory Validation','IVR-21-00015: Your request has been approved.',7,1,5,0,'2021-05-27 02:27:37','2021-06-30 23:48:21'),(1370,1,126,14,'Inventory Validation','IVR-21-00014: Your request has been approved.',7,1,5,0,'2021-05-27 02:27:55','2021-06-30 23:48:21'),(1371,1,126,16,'Inventory Validation','IVR-21-00016: Your request has been approved.',7,1,5,0,'2021-05-27 02:28:36','2021-06-30 23:48:21'),(1372,1,126,17,'Inventory Validation','IVR-21-00017: Your request has been approved.',7,1,5,0,'2021-05-27 02:29:10','2021-06-30 23:48:21'),(1373,4,40,8,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:45:57','2021-05-27 02:45:57'),(1374,4,40,10,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:47:01','2021-05-27 02:47:01'),(1375,4,40,11,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:47:36','2021-05-27 02:47:36'),(1376,4,40,12,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 02:48:19','2021-05-27 02:48:19'),(1377,20,40,8,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-27 02:53:54','2021-07-05 23:24:45'),(1378,20,40,10,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-27 02:54:12','2021-07-05 23:24:45'),(1379,20,40,11,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-27 02:54:32','2021-07-05 23:24:45'),(1380,20,40,12,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-05-27 02:54:58','2021-07-05 23:24:45'),(1381,1,40,8,'Bid Recap','BRF-21-00008: Your request has been approved.',7,1,20,0,'2021-05-27 02:55:54','2021-06-30 23:48:21'),(1382,1,40,10,'Bid Recap','BRF-21-00010: Your request has been approved.',7,1,20,0,'2021-05-27 02:56:11','2021-06-30 23:48:21'),(1383,1,40,11,'Bid Recap','BRF-21-00011: Your request has been approved.',7,1,20,0,'2021-05-27 02:56:46','2021-06-30 23:48:21'),(1384,1,40,12,'Bid Recap','BRF-21-00012: Your request has been approved.',7,1,20,0,'2021-05-27 02:57:05','2021-06-30 23:48:21'),(1385,4,33,9,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 03:23:40','2021-05-27 03:23:40'),(1386,4,33,10,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 03:36:05','2021-05-27 03:36:05'),(1387,4,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 03:58:31','2021-05-27 03:58:31'),(1388,4,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 04:01:44','2021-05-27 04:01:44'),(1389,4,42,7,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 04:02:36','2021-05-27 04:02:36'),(1390,2,33,9,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 05:20:17','2021-05-27 05:20:17'),(1391,5,33,9,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 05:21:12','2021-05-27 05:21:12'),(1392,1,33,9,'Inventory  Receiving','INRR-21-00009: Your request has been approved.',7,1,5,0,'2021-05-27 05:25:10','2021-06-30 23:48:21'),(1393,4,33,11,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 05:52:58','2021-05-27 05:52:58'),(1394,4,33,12,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 05:57:21','2021-05-27 05:57:21'),(1395,2,33,11,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 06:20:39','2021-05-27 06:20:39'),(1396,5,33,11,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 06:21:43','2021-05-27 06:21:43'),(1397,1,33,11,'Inventory  Receiving','INRR-21-00011: Your request has been approved.',7,1,5,0,'2021-05-27 06:22:18','2021-06-30 23:48:21'),(1398,2,36,1,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 06:23:29','2021-05-27 06:23:29'),(1399,3,36,1,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 06:25:36','2021-05-27 06:25:36'),(1400,4,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 06:26:30','2021-05-27 06:26:30'),(1401,4,36,1,'Disposal Item','Akosi Admin asked for your approval.',2,0,3,0,'2021-05-27 06:27:44','2021-05-27 06:27:44'),(1402,2,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 06:28:58','2021-05-27 06:28:58'),(1403,5,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 06:29:43','2021-05-27 06:29:43'),(1404,1,43,3,'Borrowing Item','EBF-21-00003: Your request has been approved.',7,1,5,0,'2021-05-27 06:30:36','2021-06-30 23:48:21'),(1405,1,36,1,'Disposal Item','ADF-21-00001: Your request has been approved.',7,1,4,0,'2021-05-27 06:31:20','2021-06-30 23:48:21'),(1406,2,35,1,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 06:33:40','2021-05-27 06:33:40'),(1407,2,35,2,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 06:34:34','2021-05-27 06:34:34'),(1408,2,42,6,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 06:35:54','2021-05-27 06:35:54'),(1409,2,42,7,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 06:36:03','2021-05-27 06:36:03'),(1410,5,35,2,'Return Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 06:36:35','2021-05-27 06:36:35'),(1411,5,42,6,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 06:36:48','2021-05-27 06:36:48'),(1412,5,42,7,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 06:36:56','2021-05-27 06:36:56'),(1413,1,35,2,'Return Item','RI-21-00002: Your request has been denied.',1,1,5,0,'2021-05-27 06:37:13','2021-06-30 23:48:21'),(1414,1,42,6,'Material Withdrawal','MWF-21-00006: Your request has been approved.',7,1,5,0,'2021-05-27 06:37:51','2021-06-30 23:48:21'),(1415,1,42,7,'Material Withdrawal','MWF-21-00007: Your request has been approved.',7,1,5,0,'2021-05-27 06:38:02','2021-06-30 23:48:21'),(1416,4,42,8,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 06:50:53','2021-05-27 06:50:53'),(1417,2,37,14,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:00:12','2021-05-27 07:00:12'),(1418,5,44,4,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:05:03','2021-05-27 07:05:03'),(1419,2,35,3,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:05:42','2021-05-27 07:05:42'),(1420,1,37,14,'Transfer Request','TR-21-00014: Your request has been denied.',1,1,2,0,'2021-05-27 07:06:58','2021-06-30 23:48:21'),(1421,2,42,8,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 07:17:46','2021-05-27 07:17:46'),(1422,5,42,8,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 07:18:33','2021-05-27 07:18:33'),(1423,1,42,8,'Material Withdrawal','MWF-21-00008: Your request has been approved.',7,1,5,0,'2021-05-27 07:19:17','2021-06-30 23:48:21'),(1424,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:20:01','2021-05-27 07:20:01'),(1425,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:20:51','2021-05-27 07:20:51'),(1426,2,37,15,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:34:44','2021-05-27 07:34:44'),(1427,2,59,3,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:34:49','2021-05-27 07:34:49'),(1428,2,59,4,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:36:29','2021-05-27 07:36:29'),(1429,2,59,4,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:39:42','2021-05-27 07:39:42'),(1430,1,37,15,'Transfer Request','TR-21-00015: Your request has been denied.',1,1,2,0,'2021-05-27 07:44:16','2021-06-30 23:48:21'),(1431,4,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:54:01','2021-05-27 07:54:01'),(1432,4,33,13,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:56:00','2021-05-27 07:56:00'),(1433,4,33,14,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-27 07:59:37','2021-05-27 07:59:37'),(1434,1,33,12,'Inventory  Receiving','INRR-21-00012: Your request has been denied.',1,1,4,0,'2021-05-27 08:00:58','2021-06-30 23:48:21'),(1435,1,33,10,'Inventory  Receiving','INRR-21-00010: Your request has been denied.',1,1,4,0,'2021-05-27 23:01:36','2021-06-30 23:48:21'),(1436,1,33,14,'Inventory  Receiving','INRR-21-00014: Your request has been denied.',1,1,4,0,'2021-05-27 23:02:08','2021-06-30 23:48:21'),(1437,2,33,13,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-27 23:04:51','2021-05-27 23:04:51'),(1438,5,33,13,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-27 23:05:47','2021-05-27 23:05:47'),(1439,1,33,13,'Inventory  Receiving','INRR-21-00013: Your request has been approved.',7,1,5,0,'2021-05-27 23:12:54','2021-06-30 23:48:21'),(1440,4,33,15,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 00:39:45','2021-05-28 00:39:45'),(1441,4,33,16,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 00:44:29','2021-05-28 00:44:29'),(1442,4,33,17,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 00:45:39','2021-05-28 00:45:39'),(1443,4,42,9,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 00:47:31','2021-05-28 00:47:31'),(1444,4,33,18,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 00:50:01','2021-05-28 00:50:01'),(1445,4,38,30,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 00:52:14','2021-05-28 00:52:14'),(1446,4,33,19,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 00:52:37','2021-05-28 00:52:37'),(1447,4,33,20,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 00:53:14','2021-05-28 00:53:14'),(1448,2,33,16,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 00:55:42','2021-05-28 00:55:42'),(1449,2,33,18,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 00:56:47','2021-05-28 00:56:47'),(1450,2,33,19,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 00:57:14','2021-05-28 00:57:14'),(1451,2,33,20,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 00:57:31','2021-05-28 00:57:31'),(1452,5,33,16,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 00:58:39','2021-05-28 00:58:39'),(1453,5,33,18,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 00:58:53','2021-05-28 00:58:53'),(1454,5,33,19,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 00:59:20','2021-05-28 00:59:20'),(1455,5,33,20,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 00:59:34','2021-05-28 00:59:34'),(1456,1,33,16,'Inventory  Receiving','INRR-21-00016: Your request has been approved.',7,1,5,0,'2021-05-28 01:00:24','2021-06-30 23:48:21'),(1457,1,33,18,'Inventory  Receiving','INRR-21-00018: Your request has been approved.',7,1,5,0,'2021-05-28 01:00:46','2021-06-30 23:48:21'),(1458,1,33,20,'Inventory  Receiving','INRR-21-00020: Your request has been approved.',7,1,5,0,'2021-05-28 01:01:26','2021-06-30 23:48:21'),(1459,1,33,19,'Inventory  Receiving','INRR-21-00019: Your request has been denied.',1,1,5,0,'2021-05-28 01:02:06','2021-06-30 23:48:21'),(1460,2,42,9,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 01:04:52','2021-05-28 01:04:52'),(1461,5,42,9,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:06:56','2021-05-28 01:06:56'),(1462,4,33,21,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:08:06','2021-05-28 01:08:06'),(1463,2,33,21,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 01:10:38','2021-05-28 01:10:38'),(1464,5,33,21,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:11:14','2021-05-28 01:11:14'),(1465,1,33,21,'Inventory  Receiving','INRR-21-00021: Your request has been approved.',7,1,5,0,'2021-05-28 01:12:21','2021-06-30 23:48:21'),(1466,4,33,23,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:22:45','2021-05-28 01:22:45'),(1467,1,42,9,'Material Withdrawal','MWF-21-00009: Your request has been approved.',7,1,5,0,'2021-05-28 01:29:10','2021-06-30 23:48:21'),(1468,2,47,14,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:34:12','2021-05-28 01:34:12'),(1469,2,47,15,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:35:15','2021-05-28 01:35:15'),(1470,2,47,16,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:35:54','2021-05-28 01:35:54'),(1471,2,47,17,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:36:36','2021-05-28 01:36:36'),(1472,2,47,18,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:37:14','2021-05-28 01:37:14'),(1473,2,47,19,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:38:24','2021-05-28 01:38:24'),(1474,2,47,20,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 01:39:25','2021-05-28 01:39:25'),(1475,5,47,13,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:40:56','2021-05-28 01:40:56'),(1476,5,47,14,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:41:34','2021-05-28 01:41:34'),(1477,5,47,15,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:41:53','2021-05-28 01:41:53'),(1478,5,47,16,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:43:02','2021-05-28 01:43:02'),(1479,5,47,17,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:43:31','2021-05-28 01:43:31'),(1480,5,47,18,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:43:48','2021-05-28 01:43:48'),(1481,5,47,19,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:44:08','2021-05-28 01:44:08'),(1482,5,47,20,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 01:44:25','2021-05-28 01:44:25'),(1483,4,47,13,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 01:45:16','2021-05-28 01:45:16'),(1484,4,47,14,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 01:45:30','2021-05-28 01:45:30'),(1485,4,47,15,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 01:45:43','2021-05-28 01:45:43'),(1486,4,47,16,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 01:46:02','2021-05-28 01:46:02'),(1487,4,47,17,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 01:46:16','2021-05-28 01:46:16'),(1488,4,47,18,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 01:46:41','2021-05-28 01:46:41'),(1489,4,47,19,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 01:46:56','2021-05-28 01:46:56'),(1490,4,47,20,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 01:47:15','2021-05-28 01:47:15'),(1491,1,47,13,'Purchase Order','P0-21-00013: Your request has been approved.',7,1,4,0,'2021-05-28 01:48:03','2021-06-30 23:48:21'),(1492,1,47,14,'Purchase Order','P0-21-00014: Your request has been approved.',7,1,4,0,'2021-05-28 01:48:16','2021-06-30 23:48:21'),(1493,1,47,15,'Purchase Order','P0-21-00015: Your request has been approved.',7,1,4,0,'2021-05-28 01:48:30','2021-06-30 23:48:21'),(1494,1,47,16,'Purchase Order','P0-21-00016: Your request has been approved.',7,1,4,0,'2021-05-28 01:48:49','2021-06-30 23:48:21'),(1495,1,47,17,'Purchase Order','P0-21-00017: Your request has been approved.',7,1,4,0,'2021-05-28 01:49:18','2021-06-30 23:48:21'),(1496,1,47,18,'Purchase Order','P0-21-00018: Your request has been approved.',7,1,4,0,'2021-05-28 01:49:44','2021-06-30 23:48:21'),(1497,1,47,19,'Purchase Order','P0-21-00019: Your request has been approved.',7,1,4,0,'2021-05-28 01:50:07','2021-06-30 23:48:21'),(1498,1,47,20,'Purchase Order','P0-21-00020: Your request has been denied.',1,1,4,0,'2021-05-28 01:51:06','2021-06-30 23:48:21'),(1499,4,33,24,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 02:10:00','2021-05-28 02:10:00'),(1500,2,33,23,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 02:12:09','2021-05-28 02:12:09'),(1501,2,33,24,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 02:12:31','2021-05-28 02:12:31'),(1502,5,33,23,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 02:13:11','2021-05-28 02:13:11'),(1503,5,33,24,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 02:13:24','2021-05-28 02:13:24'),(1504,1,33,23,'Inventory  Receiving','INRR-21-00023: Your request has been approved.',7,1,5,0,'2021-05-28 02:14:09','2021-06-30 23:48:21'),(1505,1,33,24,'Inventory  Receiving','INRR-21-00024: Your request has been approved.',7,1,5,0,'2021-05-28 02:14:21','2021-06-30 23:48:21'),(1506,3,36,2,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 02:37:12','2021-05-28 02:37:12'),(1507,4,36,2,'Disposal Item','Akosi Admin asked for your approval.',2,0,3,0,'2021-05-28 02:37:55','2021-05-28 02:37:55'),(1508,1,36,2,'Disposal Item','ADF-21-00002: Your request has been approved.',7,1,4,0,'2021-05-28 02:38:39','2021-06-30 23:48:21'),(1509,4,42,10,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 02:44:59','2021-05-28 02:44:59'),(1510,2,42,10,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 02:45:49','2021-05-28 02:45:49'),(1511,5,42,10,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 02:46:26','2021-05-28 02:46:26'),(1512,1,42,10,'Material Withdrawal','MWF-21-00010: Your request has been approved.',7,1,5,0,'2021-05-28 02:47:26','2021-06-30 23:48:21'),(1513,4,43,5,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 03:51:54','2021-05-28 03:51:54'),(1514,2,49,4,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 06:26:28','2021-05-28 06:26:28'),(1515,2,49,4,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 06:27:11','2021-05-28 06:27:11'),(1516,2,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 06:29:36','2021-05-28 06:29:36'),(1517,2,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 06:29:51','2021-05-28 06:29:51'),(1518,2,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-28 06:30:04','2021-05-28 06:30:04'),(1519,1,43,5,'Return Item','EBF-21-00005: Your request has been denied.',1,1,4,0,'2021-05-28 06:31:51','2021-06-30 23:48:21'),(1520,5,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 06:37:21','2021-05-28 06:37:21'),(1521,5,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 06:41:20','2021-05-28 06:41:20'),(1522,5,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 06:45:54','2021-05-28 06:45:54'),(1523,1,43,1,'Borrowing Item','EBF-21-00001: Your request has been approved.',7,1,5,0,'2021-05-28 06:47:01','2021-06-30 23:48:21'),(1524,1,43,4,'Borrowing Item','EBF-21-00004: Your request has been approved.',7,1,5,0,'2021-05-28 06:47:13','2021-06-30 23:48:21'),(1525,1,43,2,'Borrowing Item','EBF-21-00002: Your request has been approved.',7,1,5,0,'2021-05-28 06:47:26','2021-06-30 23:48:21'),(1526,4,33,25,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 07:18:07','2021-05-28 07:18:07'),(1527,4,33,27,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 07:24:27','2021-05-28 07:24:27'),(1528,5,35,3,'Return Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-28 07:32:27','2021-05-28 07:32:27'),(1529,4,35,3,'Return Item','Akosi Admin asked for your approval.',2,0,5,0,'2021-05-28 07:34:38','2021-05-28 07:34:38'),(1530,1,35,3,'Return Item','RI-21-00003: Your request has been approved.',7,1,4,1,'2021-05-28 07:35:37','2021-05-30 05:44:15'),(1531,4,43,6,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 07:41:47','2021-05-28 07:41:47'),(1532,2,36,3,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-28 08:36:18','2021-05-28 08:36:18'),(1533,4,33,28,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-30 23:27:01','2021-05-30 23:27:01'),(1534,4,33,29,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-30 23:30:27','2021-05-30 23:30:27'),(1535,2,33,29,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-30 23:49:06','2021-05-30 23:49:06'),(1536,5,33,29,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-30 23:50:15','2021-05-30 23:50:15'),(1537,1,33,29,'Inventory  Receiving','INRR-21-00029: Your request has been approved.',7,1,5,0,'2021-05-30 23:51:14','2021-06-30 23:48:21'),(1538,4,33,30,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 00:00:12','2021-05-31 00:00:12'),(1539,4,33,31,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 00:00:59','2021-05-31 00:00:59'),(1540,4,45,2,'Material Usage','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-31 00:56:09','2021-05-31 00:56:09'),(1541,6,38,32,'Cost Estimate','Charles Verdadero asked for your approval.',2,0,4,0,'2021-05-31 01:40:03','2021-05-31 01:40:03'),(1542,3,38,32,'Cost Estimate','Charles Verdadero asked for your approval.',2,0,6,0,'2021-05-31 01:51:26','2021-05-31 01:51:26'),(1543,4,38,32,'Cost Estimate','CEF-21-00032: Your request has been approved.',7,0,3,0,'2021-05-31 01:52:04','2021-05-31 01:52:04'),(1544,2,36,4,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 02:08:30','2021-05-31 02:08:30'),(1545,2,36,5,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 02:09:26','2021-05-31 02:09:26'),(1546,2,59,5,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 02:09:53','2021-05-31 02:09:53'),(1547,4,43,7,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 02:31:19','2021-05-31 02:31:19'),(1548,4,43,8,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 02:34:42','2021-05-31 02:34:42'),(1549,2,37,19,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 02:41:28','2021-05-31 02:41:28'),(1550,2,37,20,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 02:52:29','2021-05-31 02:52:29'),(1551,2,59,5,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 03:13:59','2021-05-31 03:13:59'),(1552,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 05:19:57','2021-05-31 05:19:57'),(1553,1,36,1,'Disposal Item','ADF-21-00001: Your request has been denied.',1,1,2,0,'2021-05-31 05:21:36','2021-06-30 23:48:21'),(1554,3,36,2,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-05-31 05:21:53','2021-05-31 05:21:53'),(1555,2,37,21,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 05:48:57','2021-05-31 05:48:57'),(1556,4,36,2,'Disposal Item','Akosi Admin asked for your approval.',2,0,3,0,'2021-05-31 05:51:02','2021-05-31 05:51:02'),(1557,1,36,2,'Disposal Item','ADF-21-00002: Your request has been approved.',7,1,4,0,'2021-05-31 05:52:34','2021-06-30 23:48:21'),(1558,1,43,1,'Return Item','EBF-21-00001: Your request has been denied.',1,1,4,0,'2021-05-31 06:47:52','2021-06-30 23:48:21'),(1559,1,43,2,'Return Item','EBF-21-00002: Your request has been denied.',1,1,4,0,'2021-05-31 06:48:11','2021-06-30 23:48:21'),(1560,4,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-05-31 07:57:11','2021-05-31 07:57:11'),(1561,2,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-05-31 07:58:03','2021-05-31 07:58:03'),(1562,4,43,14,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 01:16:07','2021-06-01 01:16:07'),(1563,4,43,15,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 01:16:55','2021-06-01 01:16:55'),(1564,1,43,8,'Return Item','EBF-21-00008: Your request has been denied.',1,1,4,0,'2021-06-01 01:17:51','2021-06-30 23:48:21'),(1565,1,43,15,'Return Item','EBF-21-00015: Your request has been denied.',1,1,4,0,'2021-06-01 01:18:22','2021-06-30 23:48:21'),(1566,2,43,14,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 01:19:08','2021-06-01 01:19:08'),(1567,4,43,16,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 01:33:34','2021-06-01 01:33:34'),(1568,4,43,17,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 01:34:53','2021-06-01 01:34:53'),(1569,2,43,16,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 01:40:11','2021-06-01 01:40:11'),(1570,2,43,17,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 01:40:22','2021-06-01 01:40:22'),(1571,5,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 01:41:36','2021-06-01 01:41:36'),(1572,5,43,14,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 01:41:46','2021-06-01 01:41:46'),(1573,5,43,16,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 01:41:55','2021-06-01 01:41:55'),(1574,5,43,17,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 01:42:04','2021-06-01 01:42:04'),(1575,1,43,3,'Borrowing Item','EBF-21-00003: Your request has been approved.',7,1,5,0,'2021-06-01 01:58:53','2021-06-30 23:48:21'),(1576,1,43,14,'Borrowing Item','EBF-21-00014: Your request has been approved.',7,1,5,0,'2021-06-01 02:06:09','2021-06-30 23:48:21'),(1577,1,43,16,'Borrowing Item','EBF-21-00016: Your request has been approved.',7,1,5,0,'2021-06-01 02:06:18','2021-06-30 23:48:21'),(1578,1,43,17,'Borrowing Item','EBF-21-00017: Your request has been approved.',7,1,5,0,'2021-06-01 02:06:28','2021-06-30 23:48:21'),(1579,1,43,13,'Return Item','EBF-21-00013: Your request has been denied.',1,1,4,0,'2021-06-01 02:07:18','2021-06-30 23:48:21'),(1580,2,36,3,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 02:13:57','2021-06-01 02:13:57'),(1581,2,36,4,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 02:16:17','2021-06-01 02:16:17'),(1582,2,35,4,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 02:31:56','2021-06-01 02:31:56'),(1583,4,43,18,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 02:47:09','2021-06-01 02:47:09'),(1584,2,43,18,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 02:48:10','2021-06-01 02:48:10'),(1585,5,43,18,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 02:48:56','2021-06-01 02:48:56'),(1586,1,43,18,'Borrowing Item','EBF-21-00018: Your request has been approved.',7,1,5,0,'2021-06-01 02:49:38','2021-06-30 23:48:21'),(1587,2,35,5,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 03:10:07','2021-06-01 03:10:07'),(1588,4,38,33,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 03:31:19','2021-06-01 03:31:19'),(1589,2,47,21,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 03:33:39','2021-06-01 03:33:39'),(1590,4,38,34,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 03:33:49','2021-06-01 03:33:49'),(1591,3,59,4,'Loan Form','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 03:38:33','2021-06-01 03:38:33'),(1592,4,59,4,'Loan Form','Akosi Admin asked for your approval.',2,0,3,0,'2021-06-01 03:46:44','2021-06-01 03:46:44'),(1593,20,38,33,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-01 03:54:57','2021-07-05 23:24:45'),(1594,20,38,34,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-01 03:55:12','2021-07-05 23:24:45'),(1595,2,38,33,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-01 03:58:17','2021-06-01 03:58:17'),(1596,2,38,34,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-01 03:58:31','2021-06-01 03:58:31'),(1597,1,38,33,'Cost Estimate','CEF-21-00033: Your request has been approved.',7,1,2,0,'2021-06-01 03:59:16','2021-06-30 23:48:21'),(1598,1,38,34,'Cost Estimate','CEF-21-00034: Your request has been approved.',7,1,2,0,'2021-06-01 03:59:27','2021-06-30 23:48:21'),(1599,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 06:41:16','2021-06-01 06:41:16'),(1600,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 06:45:44','2021-06-01 06:45:44'),(1601,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 06:48:33','2021-06-01 06:48:33'),(1602,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 06:49:40','2021-06-01 06:49:40'),(1603,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 06:54:11','2021-06-01 06:54:11'),(1604,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 06:56:38','2021-06-01 06:56:38'),(1605,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 07:07:21','2021-06-01 07:07:21'),(1606,20,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-01 07:10:55','2021-07-05 23:24:45'),(1607,20,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-01 07:11:16','2021-07-05 23:24:45'),(1608,20,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-01 07:12:05','2021-07-05 23:24:45'),(1609,1,38,4,'Cost Estimate','CEF-21-00004: Your request has been denied.',1,1,4,0,'2021-06-01 07:12:23','2021-06-30 23:48:21'),(1610,20,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-01 07:12:39','2021-07-05 23:24:45'),(1611,2,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 07:13:13','2021-06-01 07:13:13'),(1612,2,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 07:13:23','2021-06-01 07:13:23'),(1613,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-01 07:14:27','2021-06-01 07:14:27'),(1614,2,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-01 07:14:42','2021-06-01 07:14:42'),(1615,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-01 07:15:08','2021-06-01 07:15:08'),(1616,2,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-01 07:15:35','2021-06-01 07:15:35'),(1617,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,1,2,0,'2021-06-01 07:16:46','2021-06-30 23:48:21'),(1618,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been approved.',7,1,2,0,'2021-06-01 07:18:14','2021-06-30 23:48:21'),(1619,1,38,5,'Cost Estimate','CEF-21-00005: Your request has been approved.',7,1,2,0,'2021-06-01 07:18:52','2021-06-30 23:48:21'),(1620,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been approved.',7,1,2,0,'2021-06-01 07:19:08','2021-06-30 23:48:21'),(1621,7,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 07:19:37','2021-06-01 07:19:37'),(1622,1,46,2,'Purchase Request','PR-21-00002: Your request has been denied.',1,1,2,0,'2021-06-01 07:19:58','2021-06-30 23:48:21'),(1623,1,46,1,'Purchase Request','PR-21-00001: Your request has been approved.',7,1,7,0,'2021-06-01 07:21:02','2021-06-30 23:48:21'),(1624,20,39,1,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-01 07:31:16','2021-07-05 23:24:45'),(1625,20,39,2,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-01 07:31:31','2021-07-05 23:24:45'),(1626,20,39,3,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-01 07:31:44','2021-07-05 23:24:45'),(1627,20,39,4,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-01 07:34:46','2021-07-05 23:24:45'),(1628,2,39,1,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-01 07:40:50','2021-06-01 07:40:50'),(1629,2,39,2,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-01 07:41:12','2021-06-01 07:41:12'),(1630,2,39,3,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-01 07:41:26','2021-06-01 07:41:26'),(1631,2,39,4,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-01 07:43:12','2021-06-01 07:43:12'),(1632,1,39,1,'Project Budget Rationale','PBR-21-00001: Your request has been approved.',7,1,2,0,'2021-06-01 07:44:05','2021-06-30 23:48:21'),(1633,1,39,2,'Project Budget Rationale','PBR-21-00002: Your request has been approved.',7,1,2,0,'2021-06-01 07:45:08','2021-06-30 23:48:21'),(1634,1,39,4,'Project Budget Rationale','PBR-21-00004: Your request has been approved.',7,1,2,0,'2021-06-01 07:45:20','2021-06-30 23:48:21'),(1635,1,39,3,'Project Budget Rationale','PBR-21-00003: Your request has been approved.',7,1,2,0,'2021-06-01 07:45:35','2021-06-30 23:48:21'),(1636,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 07:49:30','2021-06-01 07:49:30'),(1637,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 07:51:47','2021-06-01 07:51:47'),(1638,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 07:52:10','2021-06-01 07:52:10'),(1639,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 07:56:01','2021-06-01 07:56:01'),(1640,2,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 08:00:16','2021-06-01 08:00:16'),(1641,2,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 08:00:26','2021-06-01 08:00:26'),(1642,2,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 08:00:34','2021-06-01 08:00:34'),(1643,2,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 08:00:43','2021-06-01 08:00:43'),(1644,7,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 08:01:18','2021-06-01 08:01:18'),(1645,7,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 08:01:26','2021-06-01 08:01:26'),(1646,1,46,3,'Purchase Request','PR-21-00003: Your request has been approved.',7,1,7,0,'2021-06-01 08:02:00','2021-06-30 23:48:21'),(1647,1,46,4,'Purchase Request','PR-21-00004: Your request has been approved.',7,1,7,0,'2021-06-01 08:02:08','2021-06-30 23:48:21'),(1648,4,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 08:06:07','2021-06-01 08:06:07'),(1649,4,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 08:06:20','2021-06-01 08:06:20'),(1650,5,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 23:05:00','2021-06-01 23:05:00'),(1651,5,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 23:05:20','2021-06-01 23:05:20'),(1652,1,126,1,'Inventory Validation','IVR-21-00001: Your request has been approved.',7,1,5,0,'2021-06-01 23:06:20','2021-06-30 23:48:21'),(1653,1,126,2,'Inventory Validation','IVR-21-00002: Your request has been approved.',7,1,5,0,'2021-06-01 23:06:40','2021-06-30 23:48:21'),(1654,4,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 23:19:07','2021-06-01 23:19:07'),(1655,4,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 23:19:25','2021-06-01 23:19:25'),(1656,20,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-01 23:20:55','2021-07-05 23:24:45'),(1657,20,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-01 23:21:11','2021-07-05 23:24:45'),(1658,1,40,1,'Bid Recap','BRF-21-00001: Your request has been approved.',7,1,20,0,'2021-06-01 23:22:07','2021-06-30 23:48:21'),(1659,1,40,2,'Bid Recap','BRF-21-00002: Your request has been approved.',7,1,20,0,'2021-06-01 23:22:20','2021-06-30 23:48:21'),(1660,2,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 23:25:22','2021-06-01 23:25:22'),(1661,2,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 23:26:10','2021-06-01 23:26:10'),(1662,2,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 23:27:12','2021-06-01 23:27:12'),(1663,2,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 23:28:07','2021-06-01 23:28:07'),(1664,5,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 23:30:42','2021-06-01 23:30:42'),(1665,5,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 23:30:56','2021-06-01 23:30:56'),(1666,5,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 23:31:09','2021-06-01 23:31:09'),(1667,5,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 23:31:21','2021-06-01 23:31:21'),(1668,4,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-01 23:32:20','2021-06-01 23:32:20'),(1669,4,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-01 23:32:36','2021-06-01 23:32:36'),(1670,4,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-01 23:32:48','2021-06-01 23:32:48'),(1671,4,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-01 23:32:59','2021-06-01 23:32:59'),(1672,1,47,1,'Purchase Order','P0-21-00001: Your request has been approved.',7,1,4,0,'2021-06-01 23:34:00','2021-06-30 23:48:21'),(1673,1,47,2,'Purchase Order','P0-21-00002: Your request has been approved.',7,1,4,0,'2021-06-01 23:34:15','2021-06-30 23:48:21'),(1674,1,47,3,'Purchase Order','P0-21-00003: Your request has been approved.',7,1,4,0,'2021-06-01 23:34:31','2021-06-30 23:48:21'),(1675,1,47,4,'Purchase Order','P0-21-00004: Your request has been approved.',7,1,4,0,'2021-06-01 23:34:49','2021-06-30 23:48:21'),(1676,4,33,1,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 23:36:27','2021-06-01 23:36:27'),(1677,4,33,2,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 23:37:07','2021-06-01 23:37:07'),(1678,4,33,3,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 23:37:35','2021-06-01 23:37:35'),(1679,4,33,4,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-01 23:38:00','2021-06-01 23:38:00'),(1680,2,33,1,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 23:38:39','2021-06-01 23:38:39'),(1681,2,33,2,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 23:38:59','2021-06-01 23:38:59'),(1682,2,33,3,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 23:43:52','2021-06-01 23:43:52'),(1683,2,33,4,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-01 23:44:24','2021-06-01 23:44:24'),(1684,5,33,1,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 23:50:19','2021-06-01 23:50:19'),(1685,5,33,2,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 23:50:34','2021-06-01 23:50:34'),(1686,5,33,3,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 23:50:45','2021-06-01 23:50:45'),(1687,5,33,4,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-01 23:51:15','2021-06-01 23:51:15'),(1688,1,33,1,'Inventory  Receiving','INRR-21-00001: Your request has been approved.',7,1,5,0,'2021-06-01 23:52:58','2021-06-30 23:48:21'),(1689,1,33,2,'Inventory  Receiving','INRR-21-00002: Your request has been approved.',7,1,5,0,'2021-06-01 23:53:15','2021-06-30 23:48:21'),(1690,1,33,4,'Inventory  Receiving','INRR-21-00004: Your request has been approved.',7,1,5,0,'2021-06-01 23:53:25','2021-06-30 23:48:21'),(1691,1,33,3,'Inventory  Receiving','INRR-21-00003: Your request has been approved.',7,1,5,0,'2021-06-01 23:53:36','2021-06-30 23:48:21'),(1692,2,36,1,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 00:16:35','2021-06-02 00:16:35'),(1693,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 00:16:57','2021-06-02 00:16:57'),(1694,3,36,1,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 00:19:09','2021-06-02 00:19:09'),(1695,3,36,2,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 00:19:18','2021-06-02 00:19:18'),(1696,4,36,1,'Disposal Item','Akosi Admin asked for your approval.',2,0,3,0,'2021-06-02 00:20:20','2021-06-02 00:20:20'),(1697,4,36,2,'Disposal Item','Akosi Admin asked for your approval.',2,0,3,0,'2021-06-02 00:20:31','2021-06-02 00:20:31'),(1698,1,36,1,'Disposal Item','ADF-21-00001: Your request has been approved.',7,1,4,0,'2021-06-02 00:21:05','2021-06-30 23:48:21'),(1699,1,36,2,'Disposal Item','ADF-21-00002: Your request has been approved.',7,1,4,0,'2021-06-02 00:21:14','2021-06-30 23:48:21'),(1700,4,43,19,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 00:36:41','2021-06-02 00:36:41'),(1701,4,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 00:47:08','2021-06-02 00:47:08'),(1702,4,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 00:48:16','2021-06-02 00:48:16'),(1703,2,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 00:51:04','2021-06-02 00:51:04'),(1704,2,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 00:51:17','2021-06-02 00:51:17'),(1705,5,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 00:51:51','2021-06-02 00:51:51'),(1706,5,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 00:51:59','2021-06-02 00:51:59'),(1707,1,43,1,'Borrowing Item','EBF-21-00001: Your request has been approved.',7,1,5,0,'2021-06-02 00:52:48','2021-06-30 23:48:21'),(1708,1,43,2,'Borrowing Item','EBF-21-00002: Your request has been approved.',7,1,5,0,'2021-06-02 00:52:59','2021-06-30 23:48:21'),(1709,2,35,1,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 00:54:38','2021-06-02 00:54:38'),(1710,2,35,2,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 00:56:47','2021-06-02 00:56:47'),(1711,2,35,3,'Return Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 00:57:42','2021-06-02 00:57:42'),(1712,1,35,1,'Return Item','RI-21-00001: Your request has been denied.',1,1,2,0,'2021-06-02 01:07:02','2021-06-30 23:48:21'),(1713,5,35,3,'Return Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 01:07:35','2021-06-02 01:07:35'),(1714,5,35,2,'Return Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 01:08:05','2021-06-02 01:08:05'),(1715,4,35,2,'Return Item','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-02 01:09:37','2021-06-02 01:09:37'),(1716,4,35,3,'Return Item','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-02 01:10:00','2021-06-02 01:10:00'),(1717,1,35,2,'Return Item','RI-21-00002: Your request has been approved.',7,1,4,0,'2021-06-02 01:10:46','2021-06-30 23:48:21'),(1718,1,35,3,'Return Item','RI-21-00003: Your request has been approved.',7,1,4,0,'2021-06-02 01:11:08','2021-06-30 23:48:21'),(1719,4,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 01:19:40','2021-06-02 01:19:40'),(1720,7,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 01:21:30','2021-06-02 01:21:30'),(1721,7,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 01:21:47','2021-06-02 01:21:47'),(1722,1,46,5,'Purchase Request','PR-21-00005: Your request has been approved.',7,1,7,0,'2021-06-02 01:22:40','2021-06-30 23:48:21'),(1723,1,46,6,'Purchase Request','PR-21-00006: Your request has been approved.',7,1,7,0,'2021-06-02 01:23:29','2021-06-30 23:48:21'),(1724,1,126,7,'Inventory Validation','IVR-21-00007: Your request has been denied.',1,1,2,0,'2021-06-02 01:27:12','2021-06-30 23:48:21'),(1725,4,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 01:28:01','2021-06-02 01:28:01'),(1726,4,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 01:28:24','2021-06-02 01:28:24'),(1727,4,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 01:29:25','2021-06-02 01:29:25'),(1728,4,126,6,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 01:29:39','2021-06-02 01:29:39'),(1729,5,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 01:32:46','2021-06-02 01:32:46'),(1730,5,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 01:33:17','2021-06-02 01:33:17'),(1731,5,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 01:33:34','2021-06-02 01:33:34'),(1732,5,126,6,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 01:33:47','2021-06-02 01:33:47'),(1733,1,126,3,'Inventory Validation','IVR-21-00003: Your request has been approved.',7,1,5,0,'2021-06-02 01:36:38','2021-06-30 23:48:21'),(1734,1,126,4,'Inventory Validation','IVR-21-00004: Your request has been approved.',7,1,5,0,'2021-06-02 01:36:52','2021-06-30 23:48:21'),(1735,1,126,5,'Inventory Validation','IVR-21-00005: Your request has been approved.',7,1,5,0,'2021-06-02 01:37:07','2021-06-30 23:48:21'),(1736,1,126,6,'Inventory Validation','IVR-21-00006: Your request has been approved.',7,1,5,0,'2021-06-02 01:37:20','2021-06-30 23:48:21'),(1737,4,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 01:42:18','2021-06-02 01:42:18'),(1738,4,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 01:42:33','2021-06-02 01:42:33'),(1739,4,40,5,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 01:42:48','2021-06-02 01:42:48'),(1740,20,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 01:44:17','2021-07-05 23:24:45'),(1741,20,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 01:44:30','2021-07-05 23:24:45'),(1742,20,40,5,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 01:44:43','2021-07-05 23:24:45'),(1743,1,40,3,'Bid Recap','BRF-21-00003: Your request has been approved.',7,1,20,0,'2021-06-02 01:45:32','2021-06-30 23:48:21'),(1744,1,40,4,'Bid Recap','BRF-21-00004: Your request has been approved.',7,1,20,0,'2021-06-02 01:45:47','2021-06-30 23:48:21'),(1745,1,40,5,'Bid Recap','BRF-21-00005: Your request has been approved.',7,1,20,0,'2021-06-02 01:46:16','2021-06-30 23:48:21'),(1746,2,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 01:47:50','2021-06-02 01:47:50'),(1747,2,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 01:48:55','2021-06-02 01:48:55'),(1748,2,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 01:49:52','2021-06-02 01:49:52'),(1749,2,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 01:50:12','2021-06-02 01:50:12'),(1750,7,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 01:51:02','2021-06-02 01:51:02'),(1751,1,46,7,'Purchase Request','PR-21-00007: Your request has been approved.',7,1,7,0,'2021-06-02 01:51:43','2021-06-30 23:48:21'),(1752,2,47,10,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 01:53:26','2021-06-02 01:53:26'),(1753,4,126,8,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 01:55:59','2021-06-02 01:55:59'),(1754,5,126,8,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 01:56:47','2021-06-02 01:56:47'),(1755,2,47,13,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 01:57:29','2021-06-02 01:57:29'),(1756,2,47,14,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 01:58:04','2021-06-02 01:58:04'),(1757,1,126,8,'Inventory Validation','IVR-21-00008: Your request has been approved.',7,1,5,0,'2021-06-02 01:58:09','2021-06-30 23:48:21'),(1758,5,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 01:58:48','2021-06-02 01:58:48'),(1759,5,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 01:59:04','2021-06-02 01:59:04'),(1760,5,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 01:59:18','2021-06-02 01:59:18'),(1761,1,47,13,'Purchase Order','P0-21-00013: Your request has been denied.',1,1,2,0,'2021-06-02 02:00:56','2021-06-30 23:48:21'),(1762,5,47,10,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 02:01:13','2021-06-02 02:01:13'),(1763,5,47,14,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 02:01:41','2021-06-02 02:01:41'),(1764,2,47,15,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 02:01:47','2021-06-02 02:01:47'),(1765,4,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-02 02:02:28','2021-06-02 02:02:28'),(1766,4,47,14,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-02 02:03:27','2021-06-02 02:03:27'),(1767,1,47,14,'Purchase Order','P0-21-00014: Your request has been approved.',7,1,4,0,'2021-06-02 02:04:18','2021-06-30 23:48:21'),(1768,4,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-02 02:09:40','2021-06-02 02:09:40'),(1769,4,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-02 02:09:57','2021-06-02 02:09:57'),(1770,4,47,10,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-02 02:10:21','2021-06-02 02:10:21'),(1771,1,47,5,'Purchase Order','P0-21-00005: Your request has been approved.',7,1,4,0,'2021-06-02 02:11:09','2021-06-30 23:48:21'),(1772,1,47,6,'Purchase Order','P0-21-00006: Your request has been approved.',7,1,4,0,'2021-06-02 02:11:22','2021-06-30 23:48:21'),(1773,1,47,7,'Purchase Order','P0-21-00007: Your request has been approved.',7,1,4,0,'2021-06-02 02:11:35','2021-06-30 23:48:21'),(1774,1,47,10,'Purchase Order','P0-21-00010: Your request has been approved.',7,1,4,0,'2021-06-02 02:11:47','2021-06-30 23:48:21'),(1775,4,33,5,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 02:20:01','2021-06-02 02:20:01'),(1776,2,33,5,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 02:21:00','2021-06-02 02:21:00'),(1777,5,33,5,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 02:22:11','2021-06-02 02:22:11'),(1778,1,33,5,'Inventory  Receiving','INRR-21-00005: Your request has been approved.',7,1,5,0,'2021-06-02 02:22:49','2021-06-30 23:48:21'),(1779,2,47,16,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 02:25:08','2021-06-02 02:25:08'),(1780,4,40,6,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 02:30:06','2021-06-02 02:30:06'),(1781,20,40,6,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 02:31:21','2021-07-05 23:24:45'),(1782,1,40,6,'Bid Recap','BRF-21-00006: Your request has been approved.',7,1,20,0,'2021-06-02 02:32:12','2021-06-30 23:48:21'),(1783,2,47,17,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 02:33:59','2021-06-02 02:33:59'),(1784,2,47,18,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 02:35:08','2021-06-02 02:35:08'),(1785,2,47,19,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 02:35:40','2021-06-02 02:35:40'),(1786,5,47,18,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 02:36:28','2021-06-02 02:36:28'),(1787,5,47,19,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 02:36:45','2021-06-02 02:36:45'),(1788,5,47,17,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 02:36:59','2021-06-02 02:36:59'),(1789,4,47,17,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-02 02:38:09','2021-06-02 02:38:09'),(1790,4,47,18,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-02 02:38:25','2021-06-02 02:38:25'),(1791,4,47,19,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-02 02:38:40','2021-06-02 02:38:40'),(1792,1,47,17,'Purchase Order','P0-21-00017: Your request has been approved.',7,1,4,0,'2021-06-02 02:39:28','2021-06-30 23:48:21'),(1793,1,47,18,'Purchase Order','P0-21-00018: Your request has been approved.',7,1,4,0,'2021-06-02 02:39:42','2021-06-30 23:48:21'),(1794,1,47,19,'Purchase Order','P0-21-00019: Your request has been approved.',7,1,4,0,'2021-06-02 02:39:57','2021-06-30 23:48:21'),(1795,2,59,6,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 03:02:50','2021-06-02 03:02:50'),(1796,4,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 03:24:47','2021-06-02 03:24:47'),(1797,2,36,3,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 03:26:03','2021-06-02 03:26:03'),(1798,4,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 03:26:11','2021-06-02 03:26:11'),(1799,4,38,7,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 03:26:29','2021-06-02 03:26:29'),(1800,2,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 03:27:10','2021-06-02 03:27:10'),(1801,5,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 03:27:45','2021-06-02 03:27:45'),(1802,4,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 03:29:09','2021-06-02 03:29:09'),(1803,1,43,4,'Borrowing Item','EBF-21-00004: Your request has been approved.',7,1,5,0,'2021-06-02 03:29:20','2021-06-30 23:48:21'),(1804,20,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 03:29:54','2021-07-05 23:24:45'),(1805,20,38,7,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 03:30:15','2021-07-05 23:24:45'),(1806,20,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 03:31:26','2021-07-05 23:24:45'),(1807,2,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-02 03:32:47','2021-06-02 03:32:47'),(1808,2,38,7,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-02 03:33:40','2021-06-02 03:33:40'),(1809,2,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-02 03:33:50','2021-06-02 03:33:50'),(1810,1,38,6,'Cost Estimate','CEF-21-00006: Your request has been approved.',7,1,2,0,'2021-06-02 03:34:44','2021-06-30 23:48:21'),(1811,1,38,7,'Cost Estimate','CEF-21-00007: Your request has been approved.',7,1,2,0,'2021-06-02 03:35:53','2021-06-30 23:48:21'),(1812,1,38,8,'Cost Estimate','CEF-21-00008: Your request has been approved.',7,1,2,0,'2021-06-02 03:36:08','2021-06-30 23:48:21'),(1813,4,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 03:36:47','2021-06-02 03:36:47'),(1814,2,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 03:37:56','2021-06-02 03:37:56'),(1815,4,39,6,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 03:38:08','2021-06-02 03:38:08'),(1816,7,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 03:38:58','2021-06-02 03:38:58'),(1817,4,39,7,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 03:39:31','2021-06-02 03:39:31'),(1818,1,46,8,'Purchase Request','PR-21-00008: Your request has been approved.',7,1,7,0,'2021-06-02 03:40:00','2021-06-30 23:48:21'),(1819,20,39,5,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 03:40:59','2021-07-05 23:24:45'),(1820,20,39,6,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 03:41:14','2021-07-05 23:24:45'),(1821,20,39,7,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 03:41:33','2021-07-05 23:24:45'),(1822,4,126,9,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 03:42:58','2021-06-02 03:42:58'),(1823,2,39,5,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-02 03:43:01','2021-06-02 03:43:01'),(1824,2,39,6,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-02 03:43:21','2021-06-02 03:43:21'),(1825,2,39,7,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-02 03:43:37','2021-06-02 03:43:37'),(1826,5,126,9,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 03:44:07','2021-06-02 03:44:07'),(1827,1,126,9,'Inventory Validation','IVR-21-00009: Your request has been approved.',7,1,5,0,'2021-06-02 03:45:14','2021-06-30 23:48:21'),(1828,1,39,5,'Project Budget Rationale','PBR-21-00005: Your request has been denied.',1,1,2,0,'2021-06-02 03:46:51','2021-06-30 23:48:21'),(1829,4,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 03:50:13','2021-06-02 03:50:13'),(1830,20,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 03:51:02','2021-07-05 23:24:45'),(1831,2,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-02 03:51:45','2021-06-02 03:51:45'),(1832,1,38,9,'Cost Estimate','CEF-21-00009: Your request has been approved.',7,1,2,0,'2021-06-02 03:52:23','2021-06-30 23:48:21'),(1833,4,39,8,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 03:53:14','2021-06-02 03:53:14'),(1834,20,39,8,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 03:54:23','2021-07-05 23:24:45'),(1835,1,39,6,'Project Budget Rationale','PBR-21-00006: Your request has been approved.',7,1,2,0,'2021-06-02 03:55:03','2021-06-30 23:48:21'),(1836,1,39,7,'Project Budget Rationale','PBR-21-00007: Your request has been approved.',7,1,2,0,'2021-06-02 03:55:17','2021-06-30 23:48:21'),(1837,4,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 03:56:45','2021-06-02 03:56:45'),(1838,4,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 03:57:00','2021-06-02 03:57:00'),(1839,2,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 03:57:50','2021-06-02 03:57:50'),(1840,2,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 03:58:17','2021-06-02 03:58:17'),(1841,7,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 03:59:51','2021-06-02 03:59:51'),(1842,7,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 04:00:21','2021-06-02 04:00:21'),(1843,1,46,9,'Purchase Request','PR-21-00009: Your request has been approved.',7,1,7,0,'2021-06-02 04:01:12','2021-06-30 23:48:21'),(1844,1,46,10,'Purchase Request','PR-21-00010: Your request has been approved.',7,1,7,0,'2021-06-02 04:01:23','2021-06-30 23:48:21'),(1845,4,126,10,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 05:07:08','2021-06-02 05:07:08'),(1846,4,126,11,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 05:07:25','2021-06-02 05:07:25'),(1847,4,126,12,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 05:07:39','2021-06-02 05:07:39'),(1848,5,126,10,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 05:08:49','2021-06-02 05:08:49'),(1849,5,126,11,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 05:09:08','2021-06-02 05:09:08'),(1850,5,126,12,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 05:09:20','2021-06-02 05:09:20'),(1851,1,126,10,'Inventory Validation','IVR-21-00010: Your request has been approved.',7,1,5,0,'2021-06-02 05:10:43','2021-06-30 23:48:21'),(1852,1,126,11,'Inventory Validation','IVR-21-00011: Your request has been approved.',7,1,5,0,'2021-06-02 05:10:57','2021-06-30 23:48:21'),(1853,1,126,12,'Inventory Validation','IVR-21-00012: Your request has been approved.',7,1,5,0,'2021-06-02 05:11:18','2021-06-30 23:48:21'),(1854,2,40,7,'Bid Recap','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 05:13:00','2021-06-02 05:13:00'),(1855,2,40,8,'Bid Recap','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 05:13:34','2021-06-02 05:13:34'),(1856,2,40,9,'Bid Recap','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 05:13:59','2021-06-02 05:13:59'),(1857,4,40,7,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 05:14:55','2021-06-02 05:14:55'),(1858,4,40,8,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 05:15:17','2021-06-02 05:15:17'),(1859,4,38,10,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 05:20:34','2021-06-02 05:20:34'),(1860,20,38,10,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 05:22:04','2021-07-05 23:24:45'),(1861,2,38,10,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-02 05:22:45','2021-06-02 05:22:45'),(1862,1,38,10,'Cost Estimate','CEF-21-00010: Your request has been approved.',7,1,2,0,'2021-06-02 05:23:23','2021-06-30 23:48:21'),(1863,4,46,11,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 05:26:19','2021-06-02 05:26:19'),(1864,2,46,11,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 05:29:20','2021-06-02 05:29:20'),(1865,7,46,11,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 05:29:58','2021-06-02 05:29:58'),(1866,1,46,11,'Purchase Request','PR-21-00011: Your request has been approved.',7,1,7,0,'2021-06-02 05:30:47','2021-06-30 23:48:21'),(1867,2,126,13,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 05:32:00','2021-06-02 05:32:00'),(1868,4,126,13,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 05:32:55','2021-06-02 05:32:55'),(1869,5,126,13,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 05:33:34','2021-06-02 05:33:34'),(1870,4,40,9,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 05:33:47','2021-06-02 05:33:47'),(1871,1,126,13,'Inventory Validation','IVR-21-00013: Your request has been approved.',7,1,5,0,'2021-06-02 05:34:50','2021-06-30 23:48:21'),(1872,4,40,10,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 05:36:20','2021-06-02 05:36:20'),(1873,20,40,7,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 05:36:36','2021-07-05 23:24:45'),(1874,20,40,8,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 05:37:10','2021-07-05 23:24:45'),(1875,20,40,9,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 05:37:32','2021-07-05 23:24:45'),(1876,1,40,7,'Bid Recap','BRF-21-00007: Your request has been approved.',7,1,20,0,'2021-06-02 05:39:24','2021-06-30 23:48:21'),(1877,1,40,8,'Bid Recap','BRF-21-00008: Your request has been approved.',7,1,20,0,'2021-06-02 05:39:49','2021-06-30 23:48:21'),(1878,1,40,9,'Bid Recap','BRF-21-00009: Your request has been approved.',7,1,20,0,'2021-06-02 05:40:04','2021-06-30 23:48:21'),(1879,20,40,10,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 05:43:03','2021-07-05 23:24:45'),(1880,1,40,10,'Bid Recap','BRF-21-00010: Your request has been approved.',7,1,20,0,'2021-06-02 05:44:49','2021-06-30 23:48:21'),(1881,2,47,20,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 05:45:45','2021-06-02 05:45:45'),(1882,5,47,20,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 05:46:47','2021-06-02 05:46:47'),(1883,4,47,20,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-02 05:47:25','2021-06-02 05:47:25'),(1884,1,47,20,'Purchase Order','P0-21-00020: Your request has been approved.',7,1,4,0,'2021-06-02 05:48:12','2021-06-30 23:48:21'),(1885,4,33,6,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 05:49:34','2021-06-02 05:49:34'),(1886,2,33,6,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 05:50:04','2021-06-02 05:50:04'),(1887,5,33,6,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 05:50:54','2021-06-02 05:50:54'),(1888,1,33,6,'Inventory  Receiving','INRR-21-00006: Your request has been approved.',7,1,5,0,'2021-06-02 05:51:30','2021-06-30 23:48:21'),(1889,4,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 05:56:36','2021-06-02 05:56:36'),(1890,2,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 05:57:23','2021-06-02 05:57:23'),(1891,5,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 05:57:58','2021-06-02 05:57:58'),(1892,1,43,1,'Borrowing Item','EBF-21-00001: Your request has been approved.',7,1,5,0,'2021-06-02 05:58:33','2021-06-30 23:48:21'),(1893,2,47,24,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:00:15','2021-06-02 06:00:15'),(1894,2,47,25,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:01:53','2021-06-02 06:01:53'),(1895,2,47,26,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:02:32','2021-06-02 06:02:32'),(1896,2,47,27,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:03:28','2021-06-02 06:03:28'),(1897,5,47,27,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:05:59','2021-06-02 06:05:59'),(1898,5,47,26,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:06:21','2021-06-02 06:06:21'),(1899,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:08:58','2021-06-02 06:08:58'),(1900,5,47,24,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:10:44','2021-06-02 06:10:44'),(1901,1,36,1,'Disposal Item','ADF-21-00001: Your request has been denied.',1,1,2,0,'2021-06-02 06:10:54','2021-06-30 23:48:21'),(1902,3,36,2,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:11:06','2021-06-02 06:11:06'),(1903,4,36,2,'Disposal Item','Akosi Admin asked for your approval.',2,0,3,0,'2021-06-02 06:12:42','2021-06-02 06:12:42'),(1904,4,47,24,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-02 06:13:06','2021-06-02 06:13:06'),(1905,1,36,2,'Disposal Item','ADF-21-00002: Your request has been approved.',7,1,4,0,'2021-06-02 06:13:17','2021-06-30 23:48:21'),(1906,4,47,26,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-02 06:13:35','2021-06-02 06:13:35'),(1907,4,47,27,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-02 06:13:48','2021-06-02 06:13:48'),(1908,1,47,24,'Purchase Order','P0-21-00024: Your request has been approved.',7,1,4,0,'2021-06-02 06:14:33','2021-06-30 23:48:21'),(1909,1,47,26,'Purchase Order','P0-21-00026: Your request has been approved.',7,1,4,0,'2021-06-02 06:14:45','2021-06-30 23:48:21'),(1910,1,47,27,'Purchase Order','P0-21-00027: Your request has been approved.',7,1,4,0,'2021-06-02 06:14:59','2021-06-30 23:48:21'),(1911,4,38,11,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:15:50','2021-06-02 06:15:50'),(1912,4,46,12,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:17:22','2021-06-02 06:17:22'),(1913,2,46,12,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 06:18:06','2021-06-02 06:18:06'),(1914,7,46,12,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:18:37','2021-06-02 06:18:37'),(1915,1,46,12,'Purchase Request','PR-21-00012: Your request has been approved.',7,1,7,0,'2021-06-02 06:19:12','2021-06-30 23:48:21'),(1916,2,126,14,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:21:30','2021-06-02 06:21:30'),(1917,4,126,14,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:22:21','2021-06-02 06:22:21'),(1918,4,33,7,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:22:34','2021-06-02 06:22:34'),(1919,5,126,14,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 06:23:01','2021-06-02 06:23:01'),(1920,4,33,8,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:23:07','2021-06-02 06:23:07'),(1921,1,126,14,'Inventory Validation','IVR-21-00014: Your request has been approved.',7,1,5,0,'2021-06-02 06:23:39','2021-06-30 23:48:21'),(1922,4,40,11,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:25:40','2021-06-02 06:25:40'),(1923,20,40,11,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 06:26:17','2021-07-05 23:24:45'),(1924,1,40,11,'Bid Recap','BRF-21-00011: Your request has been approved.',7,1,20,0,'2021-06-02 06:27:02','2021-06-30 23:48:21'),(1925,4,33,9,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:35:05','2021-06-02 06:35:05'),(1926,2,33,7,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 06:42:18','2021-06-02 06:42:18'),(1927,2,33,8,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 06:42:30','2021-06-02 06:42:30'),(1928,2,33,9,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 06:43:42','2021-06-02 06:43:42'),(1929,5,33,7,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:44:17','2021-06-02 06:44:17'),(1930,5,33,8,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:44:37','2021-06-02 06:44:37'),(1931,5,33,9,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:44:49','2021-06-02 06:44:49'),(1932,1,33,7,'Inventory  Receiving','INRR-21-00007: Your request has been approved.',7,1,5,0,'2021-06-02 06:45:38','2021-06-30 23:48:21'),(1933,1,33,8,'Inventory  Receiving','INRR-21-00008: Your request has been approved.',7,1,5,0,'2021-06-02 06:45:50','2021-06-30 23:48:21'),(1934,1,33,9,'Inventory  Receiving','INRR-21-00009: Your request has been approved.',7,1,5,0,'2021-06-02 06:46:13','2021-06-30 23:48:21'),(1935,4,46,13,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:46:37','2021-06-02 06:46:37'),(1936,2,46,13,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 06:47:28','2021-06-02 06:47:28'),(1937,7,46,13,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:48:05','2021-06-02 06:48:05'),(1938,1,46,13,'Purchase Request','PR-21-00013: Your request has been approved.',7,1,7,0,'2021-06-02 06:48:38','2021-06-30 23:48:21'),(1939,2,126,15,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 06:49:33','2021-06-02 06:49:33'),(1940,4,126,15,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:50:42','2021-06-02 06:50:42'),(1941,5,126,15,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 06:51:19','2021-06-02 06:51:19'),(1942,1,126,15,'Inventory Validation','IVR-21-00015: Your request has been approved.',7,1,5,0,'2021-06-02 06:51:55','2021-06-30 23:48:21'),(1943,4,40,12,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 06:53:32','2021-06-02 06:53:32'),(1944,20,40,12,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 06:54:15','2021-07-05 23:24:45'),(1945,1,40,12,'Bid Recap','BRF-21-00012: Your request has been approved.',7,1,20,0,'2021-06-02 06:54:58','2021-06-30 23:48:21'),(1946,4,46,14,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 07:03:35','2021-06-02 07:03:35'),(1947,4,46,15,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 07:29:22','2021-06-02 07:29:22'),(1948,2,46,15,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 07:30:16','2021-06-02 07:30:16'),(1949,2,46,14,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 07:30:57','2021-06-02 07:30:57'),(1950,7,46,14,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 07:31:50','2021-06-02 07:31:50'),(1951,7,46,15,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 07:32:00','2021-06-02 07:32:00'),(1952,1,46,14,'Purchase Request','PR-21-00014: Your request has been approved.',7,1,7,0,'2021-06-02 07:32:39','2021-06-30 23:48:21'),(1953,1,46,15,'Purchase Request','PR-21-00015: Your request has been approved.',7,1,7,0,'2021-06-02 07:32:56','2021-06-30 23:48:21'),(1954,2,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 07:34:12','2021-06-02 07:34:12'),(1955,2,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 07:41:27','2021-06-02 07:41:27'),(1956,2,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 07:42:26','2021-06-02 07:42:26'),(1957,4,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 23:26:09','2021-06-02 23:26:09'),(1958,4,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 23:26:34','2021-06-02 23:26:34'),(1959,4,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 23:26:54','2021-06-02 23:26:54'),(1960,20,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 23:28:57','2021-07-05 23:24:45'),(1961,20,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 23:29:53','2021-07-05 23:24:45'),(1962,20,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-02 23:30:41','2021-07-05 23:24:45'),(1963,1,40,1,'Bid Recap','BRF-21-00001: Your request has been approved.',7,1,20,0,'2021-06-02 23:40:51','2021-06-30 23:48:21'),(1964,1,40,2,'Bid Recap','BRF-21-00002: Your request has been approved.',7,1,20,0,'2021-06-02 23:45:33','2021-06-30 23:48:21'),(1965,1,40,3,'Bid Recap','BRF-21-00003: Your request has been approved.',7,1,20,0,'2021-06-02 23:45:49','2021-06-30 23:48:21'),(1966,2,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 23:46:37','2021-06-02 23:46:37'),(1967,5,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 23:48:40','2021-06-02 23:48:40'),(1968,4,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-02 23:49:43','2021-06-02 23:49:43'),(1969,1,47,1,'Purchase Order','P0-21-00001: Your request has been approved.',7,1,4,0,'2021-06-02 23:50:45','2021-06-30 23:48:21'),(1970,4,33,1,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 23:52:51','2021-06-02 23:52:51'),(1971,4,33,2,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-02 23:54:32','2021-06-02 23:54:32'),(1972,1,33,1,'Inventory  Receiving','INRR-21-00001: Your request has been denied.',1,1,4,0,'2021-06-02 23:55:07','2021-06-30 23:48:21'),(1973,2,33,2,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-02 23:55:32','2021-06-02 23:55:32'),(1974,5,33,2,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-02 23:56:54','2021-06-02 23:56:54'),(1975,1,33,2,'Inventory  Receiving','INRR-21-00002: Your request has been approved.',7,1,5,0,'2021-06-02 23:58:17','2021-06-30 23:48:21'),(1976,2,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:00:36','2021-06-03 00:00:36'),(1977,2,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:01:49','2021-06-03 00:01:49'),(1978,2,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:02:57','2021-06-03 00:02:57'),(1979,4,46,16,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:03:04','2021-06-03 00:03:04'),(1980,2,46,16,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-03 00:04:00','2021-06-03 00:04:00'),(1981,2,47,8,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:04:04','2021-06-03 00:04:04'),(1982,7,46,16,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:05:06','2021-06-03 00:05:06'),(1983,2,47,9,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:05:24','2021-06-03 00:05:24'),(1984,1,46,16,'Purchase Request','PR-21-00016: Your request has been approved.',7,1,7,0,'2021-06-03 00:05:51','2021-06-30 23:48:21'),(1985,2,47,10,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:07:02','2021-06-03 00:07:02'),(1986,2,126,16,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:07:58','2021-06-03 00:07:58'),(1987,4,126,16,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:10:54','2021-06-03 00:10:54'),(1988,5,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:11:31','2021-06-03 00:11:31'),(1989,5,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:11:43','2021-06-03 00:11:43'),(1990,5,126,16,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-03 00:11:45','2021-06-03 00:11:45'),(1991,5,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:12:12','2021-06-03 00:12:12'),(1992,1,126,16,'Inventory Validation','IVR-21-00016: Your request has been approved.',7,1,5,0,'2021-06-03 00:12:26','2021-06-30 23:48:21'),(1993,5,47,8,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:12:29','2021-06-03 00:12:29'),(1994,5,47,9,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:12:42','2021-06-03 00:12:42'),(1995,5,47,10,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:12:57','2021-06-03 00:12:57'),(1996,4,46,17,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:14:03','2021-06-03 00:14:03'),(1997,2,46,17,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-03 00:15:39','2021-06-03 00:15:39'),(1998,7,46,17,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:16:24','2021-06-03 00:16:24'),(1999,1,46,17,'Purchase Request','PR-21-00017: Your request has been approved.',7,1,7,0,'2021-06-03 00:17:08','2021-06-30 23:48:21'),(2000,2,126,17,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:18:40','2021-06-03 00:18:40'),(2001,2,126,17,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:19:30','2021-06-03 00:19:30'),(2002,4,126,17,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:20:27','2021-06-03 00:20:27'),(2003,5,126,17,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-03 00:21:18','2021-06-03 00:21:18'),(2004,1,126,17,'Inventory Validation','IVR-21-00017: Your request has been approved.',7,1,5,0,'2021-06-03 00:22:04','2021-06-30 23:48:21'),(2005,4,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:23:47','2021-06-03 00:23:47'),(2006,20,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-03 00:24:31','2021-07-05 23:24:45'),(2007,1,40,4,'Bid Recap','BRF-21-00004: Your request has been approved.',7,1,20,0,'2021-06-03 00:25:15','2021-06-30 23:48:21'),(2008,4,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-03 00:25:51','2021-06-03 00:25:51'),(2009,2,47,11,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:26:04','2021-06-03 00:26:04'),(2010,4,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-03 00:26:05','2021-06-03 00:26:05'),(2011,4,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-03 00:26:18','2021-06-03 00:26:18'),(2012,4,47,8,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-03 00:26:31','2021-06-03 00:26:31'),(2013,4,47,9,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-03 00:26:44','2021-06-03 00:26:44'),(2014,4,47,10,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-03 00:26:56','2021-06-03 00:26:56'),(2015,5,47,11,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:28:38','2021-06-03 00:28:38'),(2016,1,47,5,'Purchase Order','P0-21-00005: Your request has been approved.',7,1,4,0,'2021-06-03 00:28:49','2021-06-30 23:48:21'),(2017,4,47,11,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-03 00:29:21','2021-06-03 00:29:21'),(2018,1,47,6,'Purchase Order','P0-21-00006: Your request has been approved.',7,1,4,0,'2021-06-03 00:29:29','2021-06-30 23:48:21'),(2019,1,47,7,'Purchase Order','P0-21-00007: Your request has been approved.',7,1,4,0,'2021-06-03 00:30:08','2021-06-30 23:48:21'),(2020,1,47,8,'Purchase Order','P0-21-00008: Your request has been approved.',7,1,4,0,'2021-06-03 00:30:27','2021-06-30 23:48:21'),(2021,1,47,11,'Purchase Order','P0-21-00011: Your request has been approved.',7,1,4,0,'2021-06-03 00:30:35','2021-06-30 23:48:21'),(2022,1,47,9,'Purchase Order','P0-21-00009: Your request has been approved.',7,1,4,0,'2021-06-03 00:30:45','2021-06-30 23:48:21'),(2023,1,47,10,'Purchase Order','P0-21-00010: Your request has been approved.',7,1,4,0,'2021-06-03 00:31:15','2021-06-30 23:48:21'),(2024,4,33,3,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:31:43','2021-06-03 00:31:43'),(2025,2,33,3,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-03 00:32:10','2021-06-03 00:32:10'),(2026,5,33,3,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:32:51','2021-06-03 00:32:51'),(2027,4,33,4,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:33:09','2021-06-03 00:33:09'),(2028,1,33,3,'Inventory  Receiving','INRR-21-00003: Your request has been approved.',7,1,5,0,'2021-06-03 00:33:27','2021-06-30 23:48:21'),(2029,4,33,5,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:34:58','2021-06-03 00:34:58'),(2030,4,33,6,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:37:06','2021-06-03 00:37:06'),(2031,4,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 00:46:37','2021-06-03 00:46:37'),(2032,2,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-03 00:47:46','2021-06-03 00:47:46'),(2033,5,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:48:21','2021-06-03 00:48:21'),(2034,2,33,4,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-03 00:50:16','2021-06-03 00:50:16'),(2035,2,33,5,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-03 00:50:27','2021-06-03 00:50:27'),(2036,2,33,6,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-03 00:50:37','2021-06-03 00:50:37'),(2037,1,43,1,'Borrowing Item','EBF-21-00001: Your request has been approved.',7,1,5,0,'2021-06-03 00:50:46','2021-06-30 23:48:21'),(2038,5,33,4,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:51:16','2021-06-03 00:51:16'),(2039,5,33,5,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 00:51:26','2021-06-03 00:51:26'),(2040,1,33,4,'Inventory  Receiving','INRR-21-00004: Your request has been approved.',7,1,5,0,'2021-06-03 00:52:01','2021-06-30 23:48:21'),(2041,1,33,5,'Inventory  Receiving','INRR-21-00005: Your request has been approved.',7,1,5,0,'2021-06-03 00:52:12','2021-06-30 23:48:21'),(2042,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 01:06:00','2021-06-03 01:06:00'),(2043,20,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-03 01:10:52','2021-07-05 23:24:45'),(2044,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-03 01:11:22','2021-06-03 01:11:22'),(2045,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,1,2,0,'2021-06-03 01:11:52','2021-06-30 23:48:21'),(2046,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 01:20:48','2021-06-03 01:20:48'),(2047,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 01:23:01','2021-06-03 01:23:01'),(2048,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 01:27:57','2021-06-03 01:27:57'),(2049,20,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-03 01:28:33','2021-06-03 01:28:47'),(2050,2,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,20,2,'2021-06-03 01:29:03','2021-06-03 01:29:19'),(2051,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been approved.',7,1,2,0,'2021-06-03 01:29:34','2021-06-30 23:48:21'),(2052,4,39,1,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-03 01:35:21','2021-06-03 01:35:38'),(2053,20,39,1,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-03 01:35:55','2021-06-03 01:36:08'),(2054,2,39,1,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,20,2,'2021-06-03 01:36:25','2021-06-03 01:36:43'),(2055,1,39,1,'Project Budget Rationale','PBR-21-00001: Your request has been approved.',7,1,2,0,'2021-06-03 01:37:01','2021-06-30 23:48:21'),(2056,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-03 01:39:21','2021-06-03 01:40:36'),(2057,2,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-03 01:40:50','2021-06-03 01:41:11'),(2058,7,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,1,2,7,'2021-06-03 01:41:22','2021-06-03 01:41:44'),(2059,1,46,2,'Purchase Request','PR-21-00002: Your request has been approved.',7,1,7,0,'2021-06-03 01:41:56','2021-06-30 23:48:21'),(2060,2,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 01:43:43','2021-06-03 01:43:43'),(2061,4,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-03 01:44:21','2021-06-03 01:44:37'),(2062,5,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-03 01:44:57','2021-06-03 01:45:11'),(2063,1,126,1,'Inventory Validation','IVR-21-00001: Your request has been approved.',7,1,5,0,'2021-06-03 01:45:36','2021-06-30 23:48:21'),(2064,2,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-03 01:56:58','2021-06-03 01:57:32'),(2065,4,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-03 01:57:49','2021-06-03 01:58:14'),(2066,20,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-03 01:58:27','2021-06-03 01:58:46'),(2067,1,40,1,'Bid Recap','BRF-21-00001: Your request has been approved.',7,1,20,0,'2021-06-03 01:59:02','2021-06-30 23:48:21'),(2068,2,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-03 02:03:45','2021-06-03 02:04:07'),(2069,5,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,1,2,5,'2021-06-03 02:04:21','2021-06-03 02:04:42'),(2070,4,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,1,5,4,'2021-06-03 02:04:56','2021-06-03 02:05:18'),(2071,1,47,1,'Purchase Order','P0-21-00001: Your request has been approved.',7,1,4,0,'2021-06-03 02:05:34','2021-06-30 23:48:21'),(2072,4,49,4,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 02:11:46','2021-06-03 02:11:46'),(2073,5,49,4,'Service Requisition','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-03 02:12:58','2021-06-03 02:13:14'),(2074,1,49,4,'Service Requisition','SR-21-00004: Your request has been approved.',7,1,5,0,'2021-06-03 02:13:25','2021-06-30 23:48:21'),(2075,2,41,5,'Service Order','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-03 02:15:34','2021-06-03 02:15:52'),(2076,4,41,5,'Service Order','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-03 02:16:05','2021-06-03 02:16:25'),(2077,5,41,5,'Service Order','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-03 02:16:40','2021-06-03 02:17:04'),(2078,1,41,5,'Service Order','S0-21-00005: Your request has been approved.',7,1,5,0,'2021-06-03 02:17:18','2021-06-30 23:48:21'),(2079,1,59,4,'Loan Form','LNF-21-00004: Your request has been approved.',7,1,4,0,'2021-06-03 03:11:05','2021-06-30 23:48:21'),(2080,2,59,7,'Loan Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 03:13:07','2021-06-03 03:13:07'),(2081,3,59,7,'Loan Form','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 03:13:48','2021-06-03 03:13:48'),(2082,4,59,7,'Loan Form','Akosi Admin asked for your approval.',2,0,3,0,'2021-06-03 03:15:22','2021-06-03 03:15:22'),(2083,1,59,7,'Loan Form','LNF-21-00007: Your request has been approved.',7,1,4,0,'2021-06-03 03:15:55','2021-06-30 23:48:21'),(2084,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 03:29:33','2021-06-03 03:29:33'),(2085,2,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-03 03:31:22','2021-06-03 03:31:22'),(2086,7,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 03:32:44','2021-06-03 03:32:44'),(2087,1,46,3,'Purchase Request','PR-21-00003: Your request has been approved.',7,1,7,0,'2021-06-03 03:33:31','2021-06-30 23:48:21'),(2088,2,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 03:35:03','2021-06-03 03:35:03'),(2089,4,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 03:39:53','2021-06-03 03:39:53'),(2090,5,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-03 03:40:53','2021-06-03 03:40:53'),(2091,1,126,2,'Inventory Validation','IVR-21-00002: Your request has been approved.',7,1,5,0,'2021-06-03 03:41:37','2021-06-30 23:48:21'),(2092,4,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 03:45:51','2021-06-03 03:45:51'),(2093,20,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-03 03:47:03','2021-07-05 23:24:45'),(2094,1,40,2,'Bid Recap','BRF-21-00002: Your request has been approved.',7,1,20,0,'2021-06-03 05:12:31','2021-06-30 23:48:21'),(2095,2,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 05:13:38','2021-06-03 05:13:38'),(2096,5,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 05:14:38','2021-06-03 05:14:38'),(2097,4,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-03 05:15:22','2021-06-03 05:15:22'),(2098,1,47,2,'Purchase Order','P0-21-00002: Your request has been approved.',7,1,4,0,'2021-06-03 05:16:05','2021-06-30 23:48:21'),(2099,4,33,1,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 05:18:01','2021-06-03 05:18:01'),(2100,2,33,1,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-03 05:18:31','2021-06-03 05:18:31'),(2101,5,33,1,'Inventory  Receiving','Akosi Admin asked for your approval.',2,1,2,5,'2021-06-03 05:19:04','2021-06-03 05:54:36'),(2102,1,33,1,'Inventory  Receiving','INRR-21-00001: Your request has been approved.',7,1,5,0,'2021-06-03 05:19:38','2021-06-30 23:48:21'),(2103,2,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 05:30:34','2021-06-03 05:30:34'),(2104,4,33,2,'Inventory Receiving','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-03 05:33:51','2021-06-03 05:34:13'),(2105,2,33,2,'Inventory  Receiving','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-03 05:34:29','2021-06-03 05:34:45'),(2106,5,33,2,'Inventory  Receiving','Akosi Admin asked for your approval.',2,1,2,5,'2021-06-03 05:34:57','2021-06-03 05:35:13'),(2107,1,33,2,'Inventory  Receiving','INRR-21-00002: Your request has been approved.',7,1,5,0,'2021-06-03 05:35:25','2021-06-30 23:48:21'),(2108,4,42,1,'Material Withdrawal','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-03 05:42:31','2021-06-03 05:42:50'),(2109,2,42,1,'Material Withdrawal','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-03 05:43:03','2021-06-03 05:43:19'),(2110,5,42,1,'Material Withdrawal','Akosi Admin asked for your approval.',2,1,2,5,'2021-06-03 05:43:31','2021-06-03 05:43:46'),(2111,1,42,1,'Material Withdrawal','MWF-21-00001: Your request has been approved.',7,1,5,0,'2021-06-03 05:43:59','2021-06-30 23:48:21'),(2112,4,45,1,'Material Usage','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-03 05:48:12','2021-06-03 05:48:28'),(2113,5,45,1,'Material Usage','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-03 05:48:41','2021-06-03 05:48:55'),(2114,1,45,1,'Material Usage','MUF-21-00001: Your request has been approved.',7,1,5,0,'2021-06-03 05:49:09','2021-06-30 23:48:21'),(2115,4,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-03 05:53:18','2021-06-03 05:53:35'),(2116,2,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-03 05:53:45','2021-06-03 05:54:02'),(2117,5,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,1,2,5,'2021-06-03 05:54:11','2021-06-03 05:54:29'),(2118,1,43,1,'Borrowing Item','EBF-21-00001: Your request has been approved.',7,1,5,0,'2021-06-03 05:55:27','2021-06-30 23:48:21'),(2119,5,44,5,'Inventory Incident','Akosi Admin asked for your approval.',2,1,1,5,'2021-06-03 05:59:13','2021-06-03 05:59:43'),(2120,2,44,5,'Inventory Incident','Akosi Admin asked for your approval.',2,1,5,2,'2021-06-03 05:59:55','2021-06-03 06:00:13'),(2121,4,44,5,'Inventory Incident','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-03 06:00:26','2021-06-03 06:00:39'),(2122,1,44,5,'Inventory Incident','IR-21-00005: Your request has been approved.',7,1,4,0,'2021-06-03 06:00:51','2021-06-30 23:48:21'),(2123,2,36,1,'Item Disposal','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-03 06:02:28','2021-06-03 06:02:44'),(2124,3,36,1,'Disposal Item','Akosi Admin asked for your approval.',2,1,2,3,'2021-06-03 06:02:54','2021-06-03 06:03:08'),(2125,4,36,1,'Disposal Item','Akosi Admin asked for your approval.',2,1,3,4,'2021-06-03 06:03:17','2021-06-03 06:03:33'),(2126,1,36,1,'Disposal Item','ADF-21-00001: Your request has been approved.',7,1,4,0,'2021-06-03 06:03:42','2021-06-30 23:48:21'),(2127,2,37,1,'Transfer Request','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-03 06:07:40','2021-06-03 06:08:01'),(2128,3,37,1,'Transfer Request','Akosi Admin asked for your approval.',2,1,2,3,'2021-06-03 06:08:12','2021-06-03 06:08:25'),(2129,4,37,1,'Transfer Request','Akosi Admin asked for your approval.',2,1,3,4,'2021-06-03 06:08:36','2021-06-03 06:08:51'),(2130,1,37,1,'Transfer Request','TR-21-00001: Your request has been approved.',7,1,4,0,'2021-06-03 06:09:05','2021-06-30 23:48:21'),(2131,4,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-03 06:22:41','2021-06-03 06:22:41'),(2132,2,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-03 06:23:45','2021-06-03 06:23:45'),(2133,5,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-03 06:24:20','2021-06-03 06:24:20'),(2134,1,43,2,'Borrowing Item','EBF-21-00002: Your request has been approved.',7,1,5,0,'2021-06-03 06:24:51','2021-06-30 23:48:21'),(2135,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-04 05:34:56','2021-06-04 05:34:56'),(2136,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-04 05:35:40','2021-06-04 05:35:40'),(2137,4,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-04 05:36:07','2021-06-04 05:36:07'),(2138,4,38,7,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-04 05:36:51','2021-06-04 05:36:51'),(2139,2,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-08 23:52:35','2021-06-08 23:52:35'),(2140,7,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-08 23:59:23','2021-06-08 23:59:23'),(2141,1,46,1,'Purchase Request','PR-21-00001: Your request has been approved.',7,1,7,0,'2021-06-09 00:02:22','2021-06-30 23:48:21'),(2142,2,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-09 00:17:44','2021-06-09 00:17:44'),(2143,4,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-09 00:20:39','2021-06-09 00:20:39'),(2144,5,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-09 00:22:09','2021-06-09 00:22:09'),(2145,1,126,3,'Inventory Validation','IVR-21-00003: Your request has been approved.',7,1,5,0,'2021-06-09 00:23:33','2021-06-30 23:48:21'),(2146,2,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-09 00:25:14','2021-06-09 00:25:14'),(2147,4,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-09 00:29:17','2021-06-09 00:29:17'),(2148,20,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-09 00:32:40','2021-07-05 23:24:45'),(2149,1,40,3,'Bid Recap','BRF-21-00003: Your request has been approved.',7,1,20,0,'2021-06-09 00:34:06','2021-06-30 23:48:21'),(2150,2,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-09 00:35:57','2021-06-09 00:35:57'),(2151,2,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-09 00:37:49','2021-06-09 00:37:49'),(2152,2,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-09 00:38:36','2021-06-09 00:38:36'),(2153,5,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-09 00:41:49','2021-06-09 00:41:49'),(2154,5,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-09 00:42:23','2021-06-09 00:42:23'),(2155,5,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-09 00:42:36','2021-06-09 00:42:36'),(2156,5,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-09 00:43:47','2021-06-09 00:43:47'),(2157,4,47,3,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-09 00:45:13','2021-06-09 00:45:13'),(2158,4,47,4,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-09 00:55:12','2021-06-09 00:55:12'),(2159,4,47,5,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-09 00:56:36','2021-06-09 00:56:36'),(2160,4,47,6,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-09 00:59:26','2021-06-09 00:59:26'),(2161,1,47,3,'Purchase Order','P0-21-00003: Your request has been approved.',7,1,4,0,'2021-06-09 01:10:04','2021-06-30 23:48:21'),(2162,1,47,4,'Purchase Order','P0-21-00004: Your request has been approved.',7,1,4,0,'2021-06-09 01:11:32','2021-06-30 23:48:21'),(2163,1,47,5,'Purchase Order','P0-21-00005: Your request has been approved.',7,1,4,0,'2021-06-09 01:16:41','2021-06-30 23:48:21'),(2164,1,47,6,'Purchase Order','P0-21-00006: Your request has been approved.',7,1,4,0,'2021-06-09 01:18:39','2021-06-30 23:48:21'),(2165,4,33,3,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-09 01:22:08','2021-06-09 01:22:08'),(2166,4,49,4,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-09 01:25:11','2021-06-09 01:25:11'),(2167,4,49,5,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-09 01:25:38','2021-06-09 01:25:38'),(2168,4,49,6,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-09 01:26:02','2021-06-09 01:26:02'),(2169,2,33,3,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-09 01:28:40','2021-06-09 01:28:40'),(2170,2,33,4,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-09 01:28:54','2021-06-09 01:28:54'),(2171,2,33,5,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-09 01:29:06','2021-06-09 01:29:06'),(2172,2,33,6,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-09 01:29:28','2021-06-09 01:29:28'),(2173,5,33,3,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-09 01:31:02','2021-06-09 01:31:02'),(2174,5,33,4,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-09 01:31:14','2021-06-09 01:31:14'),(2175,5,33,5,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-09 01:31:34','2021-06-09 01:31:34'),(2176,5,33,6,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-09 01:32:10','2021-06-09 01:32:10'),(2177,1,33,3,'Inventory  Receiving','INRR-21-00003: Your request has been approved.',7,1,5,0,'2021-06-09 01:34:54','2021-06-30 23:48:21'),(2178,1,33,4,'Inventory  Receiving','INRR-21-00004: Your request has been approved.',7,1,5,0,'2021-06-09 01:37:19','2021-06-30 23:48:21'),(2179,1,33,5,'Inventory  Receiving','INRR-21-00005: Your request has been approved.',7,1,5,0,'2021-06-09 01:37:50','2021-06-30 23:48:21'),(2180,1,33,6,'Inventory  Receiving','INRR-21-00006: Your request has been approved.',7,1,5,0,'2021-06-09 01:38:04','2021-06-30 23:48:21'),(2181,4,42,3,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-09 02:00:26','2021-06-09 02:00:26'),(2182,2,42,3,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-09 02:22:08','2021-06-09 02:22:08'),(2183,5,42,3,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-09 02:23:34','2021-06-09 02:23:34'),(2184,1,42,3,'Material Withdrawal','MWF-21-00003: Your request has been approved.',7,1,5,0,'2021-06-09 02:25:39','2021-06-30 23:48:21'),(2185,2,45,2,'Material Usage','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-09 02:29:25','2021-06-09 02:29:25'),(2186,2,45,3,'Material Usage','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-09 02:30:25','2021-06-09 02:30:25'),(2187,4,45,2,'Material Usage','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-09 02:31:23','2021-06-09 02:31:23'),(2188,4,45,3,'Material Usage','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-09 02:31:36','2021-06-09 02:31:36'),(2189,5,45,2,'Material Usage','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-09 02:35:29','2021-06-09 02:35:29'),(2190,5,45,3,'Material Usage','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-09 02:35:41','2021-06-09 02:35:41'),(2191,1,45,2,'Material Usage','MUF-21-00002: Your request has been approved.',7,1,5,0,'2021-06-09 02:36:40','2021-06-30 23:48:21'),(2192,1,45,3,'Material Usage','MUF-21-00003: Your request has been approved.',7,1,5,0,'2021-06-09 02:36:51','2021-06-30 23:48:21'),(2193,4,42,4,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-09 02:41:37','2021-06-09 02:41:37'),(2194,2,42,4,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-09 02:42:10','2021-06-09 02:42:10'),(2195,5,42,4,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-09 02:42:48','2021-06-09 02:42:48'),(2196,1,42,4,'Material Withdrawal','MWF-21-00004: Your request has been approved.',7,1,5,0,'2021-06-09 02:43:22','2021-06-30 23:48:21'),(2197,2,45,4,'Material Usage','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-09 02:44:09','2021-06-09 02:44:09'),(2198,4,45,4,'Material Usage','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-09 02:44:45','2021-06-09 02:44:45'),(2199,5,45,4,'Material Usage','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-09 02:47:23','2021-06-09 02:47:23'),(2200,1,45,4,'Material Usage','MUF-21-00004: Your request has been approved.',7,1,5,0,'2021-06-09 02:48:29','2021-06-30 23:48:21'),(2201,2,37,2,'Transfer Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-10 02:16:16','2021-06-10 02:16:16'),(2202,3,37,2,'Transfer Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-10 02:18:43','2021-06-10 02:18:43'),(2203,4,37,2,'Transfer Request','Akosi Admin asked for your approval.',2,0,3,0,'2021-06-10 02:19:52','2021-06-10 02:19:52'),(2204,1,37,2,'Transfer Request','TR-21-00002: Your request has been approved.',7,1,4,0,'2021-06-10 02:22:25','2021-06-30 23:48:21'),(2205,20,38,7,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-10 02:53:37','2021-07-05 23:24:45'),(2206,2,38,7,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-10 02:55:13','2021-06-10 02:55:13'),(2207,1,38,7,'Cost Estimate','CEF-21-00007: Your request has been approved.',7,1,2,1,'2021-06-10 02:56:41','2021-06-10 02:57:08'),(2208,4,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-10 03:49:48','2021-06-10 03:51:35'),(2209,20,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-10 03:52:23','2021-06-10 03:52:54'),(2210,2,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-10 03:53:57','2021-06-10 03:53:57'),(2211,1,38,8,'Cost Estimate','CEF-21-00008: Your request has been approved.',7,1,2,1,'2021-06-10 03:55:28','2021-06-10 03:55:57'),(2212,2,53,3,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-14 00:51:51','2021-06-14 00:51:51'),(2213,2,53,4,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-14 00:53:34','2021-06-14 00:53:34'),(2214,2,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-16 23:43:00','2021-06-16 23:43:00'),(2215,2,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-16 23:43:34','2021-06-16 23:43:34'),(2216,1,43,8,'Return Item','EBF-21-00008: Your request has been denied.',1,1,4,0,'2021-06-16 23:43:49','2021-06-30 23:48:21'),(2217,5,43,3,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-16 23:44:38','2021-06-16 23:44:38'),(2218,1,43,3,'Borrowing Item','EBF-21-00003: Your request has been approved.',7,1,5,0,'2021-06-16 23:45:23','2021-06-30 23:48:21'),(2219,5,43,4,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-16 23:46:02','2021-06-16 23:46:02'),(2220,1,43,4,'Borrowing Item','EBF-21-00004: Your request has been approved.',7,1,5,0,'2021-06-16 23:47:02','2021-06-30 23:48:21'),(2221,2,43,9,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-16 23:48:51','2021-06-16 23:48:51'),(2222,5,43,9,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-16 23:49:31','2021-06-16 23:49:31'),(2223,1,43,9,'Borrowing Item','EBF-21-00009: Your request has been approved.',7,1,5,0,'2021-06-16 23:50:08','2021-06-30 23:48:21'),(2224,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-17 02:11:46','2021-06-17 02:11:46'),(2225,2,36,5,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-17 03:00:41','2021-06-17 03:00:41'),(2226,5,44,6,'Inventory Incident','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-17 06:54:07','2021-06-17 06:54:07'),(2227,4,39,2,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-17 07:25:58','2021-06-17 07:25:58'),(2228,20,39,2,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-17 07:27:36','2021-07-05 23:24:45'),(2229,2,39,2,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-17 07:28:52','2021-06-17 07:28:52'),(2230,1,39,2,'Project Budget Rationale','PBR-21-00002: Your request has been approved.',7,1,2,0,'2021-06-17 07:29:45','2021-06-30 23:48:21'),(2231,2,53,1,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-22 05:14:41','2021-06-22 05:14:41'),(2232,2,53,3,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-22 05:53:52','2021-06-22 05:53:52'),(2233,2,53,4,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-22 06:15:56','2021-06-22 06:15:56'),(2234,2,53,5,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-22 06:18:00','2021-06-22 06:18:00'),(2235,2,53,7,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-22 06:27:43','2021-06-22 06:27:43'),(2236,4,53,1,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-22 06:34:07','2021-06-22 06:34:07'),(2237,4,53,3,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-22 06:34:27','2021-06-22 06:34:27'),(2238,4,53,4,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-22 06:34:39','2021-06-22 06:34:39'),(2239,5,53,1,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-22 06:35:48','2021-06-22 06:35:48'),(2240,5,53,3,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-22 06:36:08','2021-06-22 06:36:08'),(2241,5,53,4,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-22 06:36:20','2021-06-22 06:40:24'),(2242,1,53,1,'Petty Cash Request','PCR-21-00001: Your request has been approved.',7,1,5,0,'2021-06-22 06:39:30','2021-06-30 23:48:21'),(2243,1,53,4,'Petty Cash Request','PCR-21-00004: Your request has been approved.',7,1,5,0,'2021-06-22 06:39:46','2021-06-30 23:48:21'),(2244,1,53,3,'Petty Cash Request','PCR-21-00003: Your request has been approved.',7,1,5,0,'2021-06-22 06:39:59','2021-06-30 23:48:21'),(2245,2,53,8,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-22 07:28:15','2021-06-22 07:28:15'),(2246,2,53,9,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-22 23:44:18','2021-06-22 23:44:18'),(2247,2,53,10,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-22 23:52:19','2021-06-22 23:52:19'),(2248,2,53,11,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-23 01:16:47','2021-06-23 01:16:47'),(2249,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-23 01:18:27','2021-06-23 01:18:27'),(2250,2,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-23 01:23:48','2021-06-23 01:23:48'),(2251,7,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-23 01:24:28','2021-06-23 01:24:28'),(2252,1,46,4,'Purchase Request','PR-21-00004: Your request has been approved.',7,1,7,0,'2021-06-23 01:25:31','2021-06-30 23:48:21'),(2253,2,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-23 01:40:05','2021-06-23 01:40:05'),(2254,4,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-23 01:41:49','2021-06-23 01:41:49'),(2255,5,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-23 01:43:18','2021-06-23 01:43:18'),(2256,1,126,4,'Inventory Validation','IVR-21-00004: Your request has been approved.',7,1,5,0,'2021-06-23 01:44:16','2021-06-30 23:48:21'),(2257,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-23 02:09:52','2021-06-23 02:09:52'),(2258,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-23 02:10:32','2021-06-23 02:10:32'),(2259,2,53,14,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-23 02:20:40','2021-06-23 02:20:40'),(2260,4,53,9,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-23 02:29:08','2021-06-23 02:29:08'),(2261,4,53,10,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-23 02:29:21','2021-06-23 02:29:21'),(2262,4,53,14,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-23 02:29:32','2021-06-23 02:29:32'),(2263,5,53,9,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-23 02:30:31','2021-06-23 02:30:31'),(2264,5,53,10,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-23 02:30:42','2021-06-23 02:30:42'),(2265,5,53,14,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-23 02:30:54','2021-06-23 02:30:54'),(2266,1,53,9,'Petty Cash Request','PCR-21-00009: Your request has been denied.',1,1,5,0,'2021-06-23 02:32:32','2021-06-30 23:48:21'),(2267,1,53,14,'Petty Cash Request','PCR-21-00014: Your request has been approved.',7,1,5,0,'2021-06-23 02:32:48','2021-06-30 23:48:21'),(2268,1,53,10,'Petty Cash Request','PCR-21-00010: Your request has been approved.',7,1,5,0,'2021-06-23 02:32:56','2021-06-30 23:48:21'),(2269,2,53,15,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-23 02:34:50','2021-06-23 05:57:27'),(2270,2,53,16,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-23 02:54:54','2021-06-23 02:54:54'),(2271,4,53,15,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-23 02:55:48','2021-06-23 02:55:48'),(2272,4,53,16,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-23 02:56:11','2021-06-23 02:56:11'),(2273,5,53,15,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-23 02:57:39','2021-06-23 02:57:39'),(2274,5,53,16,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-23 02:57:49','2021-06-23 02:57:49'),(2275,1,53,15,'Petty Cash Request','PCR-21-00015: Your request has been approved.',7,1,5,0,'2021-06-23 02:59:18','2021-06-30 23:48:21'),(2276,1,53,16,'Petty Cash Request','PCR-21-00016: Your request has been approved.',7,1,5,0,'2021-06-23 02:59:33','2021-06-30 23:48:21'),(2277,2,128,3,'Service Completion','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-23 03:03:50','2021-06-23 03:03:50'),(2278,2,128,3,'Service Completion','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-23 03:04:33','2021-06-23 03:04:33'),(2279,2,132,2,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-23 06:14:32','2021-06-23 06:14:32'),(2280,2,132,3,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-23 06:36:08','2021-06-23 06:36:08'),(2281,2,132,4,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-23 06:57:28','2021-06-23 06:57:28'),(2282,2,132,5,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-23 07:16:09','2021-06-23 07:16:09'),(2283,4,132,3,'Liquidation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-23 07:30:15','2021-06-23 07:30:15'),(2284,1,132,4,'Liquidation','PCR-21-00004: Your request has been denied.',1,1,2,0,'2021-06-23 07:38:30','2021-06-30 23:48:21'),(2285,4,132,5,'Liquidation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-23 07:41:41','2021-06-23 07:41:41'),(2286,1,132,3,'Liquidation','PCR-21-00003: Your request has been denied.',1,1,4,0,'2021-06-23 07:43:15','2021-06-30 23:48:21'),(2287,5,132,5,'Liquidation','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-23 07:46:26','2021-06-23 07:55:42'),(2288,1,132,5,'Liquidation','PCR-21-00005: Your request has been approved.',7,1,5,0,'2021-06-23 07:56:01','2021-06-30 23:48:21'),(2289,2,132,6,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-23 08:00:21','2021-06-23 08:00:21'),(2290,2,132,7,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-23 08:03:53','2021-06-23 08:03:53'),(2291,2,53,17,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 00:31:59','2021-06-24 00:31:59'),(2292,2,53,18,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 00:36:17','2021-06-24 00:36:17'),(2293,2,53,19,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 00:43:53','2021-06-24 00:43:53'),(2294,2,53,20,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-24 01:48:33','2021-06-24 01:57:34'),(2295,2,53,21,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-24 01:53:50','2021-06-24 01:54:30'),(2296,4,53,21,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-24 01:55:26','2021-06-24 01:55:26'),(2297,4,53,17,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-24 01:55:45','2021-06-24 01:55:45'),(2298,4,53,18,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-24 01:55:57','2021-06-24 01:55:57'),(2299,4,53,19,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-24 01:56:08','2021-06-24 01:56:08'),(2300,4,53,20,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-24 01:56:20','2021-06-24 01:58:22'),(2301,5,53,20,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-24 01:59:12','2021-06-24 01:59:12'),(2302,5,53,17,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-24 01:59:34','2021-06-24 01:59:34'),(2303,5,53,18,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-24 01:59:55','2021-06-24 01:59:55'),(2304,5,53,19,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-24 02:00:25','2021-06-24 02:01:38'),(2305,1,53,21,'Petty Cash Request','PCR-21-00021: Your request has been denied.',1,1,4,0,'2021-06-24 02:00:54','2021-06-30 23:48:21'),(2306,1,53,19,'Petty Cash Request','PCR-21-00019: Your request has been approved.',7,1,5,0,'2021-06-24 02:02:27','2021-06-30 23:48:21'),(2307,1,53,17,'Petty Cash Request','PCR-21-00017: Your request has been approved.',7,1,5,0,'2021-06-24 02:02:55','2021-06-30 23:48:21'),(2308,1,53,18,'Petty Cash Request','PCR-21-00018: Your request has been approved.',7,1,5,0,'2021-06-24 02:03:15','2021-06-30 23:48:21'),(2309,1,53,20,'Petty Cash Request','PCR-21-00020: Your request has been approved.',7,1,5,0,'2021-06-24 02:03:57','2021-06-30 23:48:21'),(2310,2,53,6,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 02:08:08','2021-06-24 02:08:08'),(2311,2,53,13,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 02:09:30','2021-06-24 02:09:30'),(2312,2,132,8,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 02:16:16','2021-06-24 02:16:16'),(2313,2,132,9,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 02:41:55','2021-06-24 02:41:55'),(2314,2,53,1,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 03:17:55','2021-06-24 03:17:55'),(2315,2,53,2,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 03:25:08','2021-06-24 03:25:08'),(2316,2,53,3,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 05:01:47','2021-06-24 05:01:47'),(2317,2,53,4,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 05:09:53','2021-06-24 05:09:53'),(2318,2,53,5,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 05:13:08','2021-06-24 05:13:08'),(2319,4,53,1,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-24 05:22:55','2021-06-24 05:22:55'),(2320,4,53,2,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-24 05:23:08','2021-06-24 05:23:08'),(2321,4,53,3,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-24 05:23:26','2021-06-24 05:23:26'),(2322,4,53,4,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-24 05:23:39','2021-06-24 05:23:39'),(2323,4,53,5,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-24 05:23:50','2021-06-24 05:23:50'),(2324,5,53,1,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-24 05:24:59','2021-06-24 05:24:59'),(2325,5,53,2,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-24 05:25:15','2021-06-24 05:25:15'),(2326,5,53,3,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-24 05:25:24','2021-06-24 05:25:24'),(2327,5,53,4,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-24 05:26:12','2021-06-24 05:26:12'),(2328,5,53,5,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-24 05:26:49','2021-06-24 05:26:49'),(2329,1,53,1,'Petty Cash Request','PCR-21-00001: Your request has been approved.',7,1,5,0,'2021-06-24 05:27:42','2021-06-30 23:48:21'),(2330,1,53,2,'Petty Cash Request','PCR-21-00002: Your request has been denied.',1,1,5,0,'2021-06-24 05:28:19','2021-06-30 23:48:21'),(2331,1,53,4,'Petty Cash Request','PCR-21-00004: Your request has been approved.',7,1,5,0,'2021-06-24 05:28:42','2021-06-30 23:48:21'),(2332,1,53,3,'Petty Cash Request','PCR-21-00003: Your request has been approved.',7,1,5,0,'2021-06-24 05:29:05','2021-06-30 23:48:21'),(2333,1,53,5,'Petty Cash Request','PCR-21-00005: Your request has been approved.',7,1,5,0,'2021-06-24 05:29:37','2021-06-30 23:48:21'),(2334,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 05:56:30','2021-06-24 05:56:30'),(2335,2,53,7,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 06:13:56','2021-06-24 06:13:56'),(2336,4,53,7,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-24 06:15:57','2021-06-24 06:16:55'),(2337,5,53,7,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-24 06:17:17','2021-06-24 06:17:57'),(2338,1,53,7,'Petty Cash Request','PCR-21-00007: Your request has been approved.',7,1,5,0,'2021-06-24 06:18:23','2021-06-30 23:48:21'),(2339,2,132,1,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 06:30:00','2021-06-24 06:30:00'),(2340,2,132,2,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 06:57:53','2021-06-24 06:57:53'),(2341,2,132,3,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 07:03:46','2021-06-24 07:03:46'),(2342,2,54,2,'Client Fund Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 07:38:52','2021-06-24 07:38:52'),(2343,2,54,3,'Client Fund Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 07:40:27','2021-06-24 07:40:27'),(2344,2,54,2,'Client Fund Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 07:45:53','2021-06-24 07:45:53'),(2345,2,54,4,'Client Fund Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 07:54:21','2021-06-24 07:54:21'),(2346,2,132,4,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 23:51:21','2021-06-24 23:51:21'),(2347,1,132,1,'Liquidation','LF-21-00001: Your request has been denied.',1,1,2,0,'2021-06-24 23:55:17','2021-06-30 23:48:21'),(2348,4,132,2,'Liquidation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-24 23:55:31','2021-06-24 23:55:31'),(2349,2,49,5,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-24 23:59:27','2021-06-24 23:59:27'),(2350,4,132,3,'Liquidation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-24 23:59:44','2021-06-24 23:59:44'),(2351,4,132,4,'Liquidation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-25 00:00:08','2021-06-25 00:00:08'),(2352,5,132,2,'Liquidation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-25 00:01:44','2021-06-25 00:01:44'),(2353,4,49,5,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-25 00:01:57','2021-06-25 00:01:57'),(2354,5,132,3,'Liquidation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-25 00:02:06','2021-06-25 00:02:06'),(2355,5,132,4,'Liquidation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-25 00:02:17','2021-06-25 00:02:17'),(2356,5,49,5,'Service Requisition','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-25 00:02:42','2021-06-25 00:02:42'),(2357,1,49,5,'Service Requisition','SR-21-00005: Your request has been approved.',7,1,5,0,'2021-06-25 00:03:32','2021-06-30 23:48:21'),(2358,2,41,6,'Service Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 00:04:14','2021-06-25 00:04:14'),(2359,4,41,6,'Service Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-25 00:05:08','2021-06-25 00:05:08'),(2360,5,41,6,'Service Order','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-25 00:05:52','2021-06-25 00:05:52'),(2361,1,41,6,'Service Order','S0-21-00006: Your request has been approved.',7,1,5,0,'2021-06-25 00:06:42','2021-06-30 23:48:21'),(2362,1,132,3,'Liquidation','LF-21-00003: Your request has been approved.',7,1,5,0,'2021-06-25 00:08:54','2021-06-30 23:48:21'),(2363,1,132,2,'Liquidation','LF-21-00002: Your request has been approved.',7,1,5,0,'2021-06-25 00:09:33','2021-06-30 23:48:21'),(2364,1,132,4,'Liquidation','LF-21-00004: Your request has been approved.',7,1,5,0,'2021-06-25 00:09:58','2021-06-30 23:48:21'),(2365,2,54,3,'Client Fund Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 00:54:25','2021-06-25 00:54:25'),(2366,2,54,5,'Client Fund Request','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-25 01:07:06','2021-06-25 01:07:54'),(2367,4,54,5,'Client Fund Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-25 01:08:06','2021-06-25 01:08:06'),(2368,4,54,2,'Client Fund Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-25 01:08:31','2021-06-25 01:08:31'),(2369,4,54,4,'Client Fund Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-25 01:08:44','2021-06-25 01:08:44'),(2370,4,54,3,'Client Fund Request','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-25 01:08:55','2021-06-25 01:09:20'),(2371,5,54,3,'Client Fund Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-25 01:09:36','2021-06-25 01:09:36'),(2372,5,54,2,'Client Fund Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-25 01:09:58','2021-06-25 01:09:58'),(2373,5,54,4,'Client Fund Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-25 01:10:11','2021-06-25 01:10:11'),(2374,5,54,5,'Client Fund Request','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-25 01:10:24','2021-06-25 01:10:54'),(2375,1,54,5,'Client Fund Request','CFR-21-00005: Your request has been approved.',7,1,5,0,'2021-06-25 01:11:19','2021-06-30 23:48:21'),(2376,1,54,2,'Client Fund Request','CFR-21-00002: Your request has been approved.',7,1,5,0,'2021-06-25 01:11:56','2021-06-30 23:48:21'),(2377,1,54,3,'Client Fund Request','CFR-21-00003: Your request has been denied.',1,1,5,0,'2021-06-25 01:12:20','2021-06-30 23:48:21'),(2378,1,54,4,'Client Fund Request','CFR-21-00004: Your request has been approved.',7,1,5,0,'2021-06-25 01:12:40','2021-06-30 23:48:21'),(2379,2,54,6,'Client Fund Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 01:20:56','2021-06-25 01:20:56'),(2380,2,54,7,'Client Fund Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 01:26:35','2021-06-25 01:26:35'),(2381,2,54,8,'Client Fund Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 01:40:18','2021-06-25 01:40:18'),(2382,4,54,6,'Client Fund Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-25 01:48:21','2021-06-25 01:48:21'),(2383,4,54,7,'Client Fund Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-25 01:48:33','2021-06-25 01:48:33'),(2384,5,54,6,'Client Fund Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-25 02:19:00','2021-06-25 02:19:00'),(2385,5,54,7,'Client Fund Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-25 02:19:11','2021-06-25 02:19:11'),(2386,1,54,6,'Client Fund Request','CFR-21-00006: Your request has been approved.',7,1,5,0,'2021-06-25 02:42:14','2021-06-30 23:48:21'),(2387,1,54,7,'Client Fund Request','CFR-21-00007: Your request has been approved.',7,1,5,0,'2021-06-25 02:42:23','2021-06-30 23:48:21'),(2388,2,54,9,'Client Fund Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 02:48:39','2021-06-25 02:48:39'),(2389,2,54,11,'Client Fund Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 02:51:01','2021-06-25 02:51:01'),(2390,2,54,12,'Client Fund Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 03:06:21','2021-06-25 03:06:21'),(2391,2,53,8,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 03:10:57','2021-06-25 03:10:57'),(2392,2,53,9,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 03:13:44','2021-06-25 03:13:44'),(2393,2,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 05:24:00','2021-06-25 05:24:00'),(2394,5,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-25 05:25:35','2021-06-25 05:25:35'),(2395,4,47,7,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-25 05:26:56','2021-06-25 05:26:56'),(2396,1,47,7,'Purchase Order','P0-21-00007: Your request has been approved.',7,1,4,0,'2021-06-25 05:27:33','2021-06-30 23:48:21'),(2397,4,33,7,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 05:29:11','2021-06-25 05:29:11'),(2398,2,33,7,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-25 05:29:53','2021-06-25 05:29:53'),(2399,5,33,7,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-25 05:30:30','2021-06-25 05:30:30'),(2400,1,33,7,'Inventory  Receiving','INRR-21-00007: Your request has been approved.',7,1,5,0,'2021-06-25 05:31:07','2021-06-30 23:48:21'),(2401,2,53,10,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-25 06:00:08','2021-06-25 06:01:44'),(2402,1,53,10,'Petty Cash Request','PCR-21-00010: Your request has been denied.',1,1,2,0,'2021-06-25 06:02:10','2021-06-30 23:48:21'),(2403,4,53,9,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-25 06:04:19','2021-06-25 06:04:19'),(2404,4,53,8,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-25 06:04:44','2021-06-25 06:06:17'),(2405,5,53,8,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-25 06:06:31','2021-06-25 06:06:31'),(2406,5,53,9,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-25 06:11:26','2021-06-25 06:12:36'),(2407,1,53,9,'Petty Cash Request','PCR-21-00009: Your request has been approved.',7,1,5,0,'2021-06-25 06:12:54','2021-06-30 23:48:21'),(2408,1,53,8,'Petty Cash Request','PCR-21-00008: Your request has been approved.',7,1,5,0,'2021-06-25 06:13:33','2021-06-30 23:48:21'),(2409,2,53,12,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 06:18:26','2021-06-25 06:18:26'),(2410,2,53,6,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 06:20:41','2021-06-25 06:20:41'),(2411,2,132,5,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 06:23:55','2021-06-25 06:23:55'),(2412,2,132,6,'Liquidation','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-25 06:28:18','2021-06-25 06:29:32'),(2413,1,132,6,'Liquidation','LF-21-00006: Your request has been denied.',1,1,2,0,'2021-06-25 06:30:01','2021-06-30 23:48:21'),(2414,4,132,5,'Liquidation','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-25 06:30:17','2021-06-25 06:31:12'),(2415,5,132,5,'Liquidation','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-25 06:31:29','2021-06-25 06:32:09'),(2416,1,132,5,'Liquidation','LF-21-00005: Your request has been approved.',7,1,5,1,'2021-06-25 06:32:25','2021-06-25 06:33:00'),(2417,2,132,8,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 06:56:08','2021-06-25 06:56:08'),(2418,2,132,7,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-25 07:07:11','2021-06-25 07:07:11'),(2419,2,53,13,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-28 00:22:54','2021-06-28 00:22:54'),(2420,2,54,13,'Client Fund Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-28 00:34:43','2021-06-28 00:34:43'),(2421,2,53,14,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-28 07:07:39','2021-06-28 07:08:17'),(2422,4,53,14,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-28 07:08:28','2021-06-28 07:08:28'),(2423,4,53,12,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-28 07:08:39','2021-06-28 07:08:39'),(2424,4,53,6,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-28 07:08:55','2021-06-28 07:08:55'),(2425,4,53,13,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-28 07:09:05','2021-06-28 07:09:24'),(2426,5,53,13,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-28 07:09:36','2021-06-28 07:09:36'),(2427,1,53,6,'Petty Cash Request','PCR-21-00006: Your request has been denied.',1,1,4,0,'2021-06-28 07:09:54','2021-06-30 23:48:21'),(2428,5,53,12,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-28 07:10:02','2021-06-28 07:10:02'),(2429,5,53,14,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-28 07:10:14','2021-06-28 07:12:13'),(2430,1,53,14,'Petty Cash Request','PCR-21-00014: Your request has been approved.',7,1,5,0,'2021-06-28 07:12:25','2021-06-30 23:48:21'),(2431,1,53,12,'Petty Cash Request','PCR-21-00012: Your request has been approved.',7,1,5,0,'2021-06-28 07:12:34','2021-06-30 23:48:21'),(2432,1,53,13,'Petty Cash Request','PCR-21-00013: Your request has been approved.',7,1,5,0,'2021-06-28 07:12:42','2021-06-30 23:48:21'),(2433,2,132,9,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-28 07:19:47','2021-06-28 07:19:47'),(2434,2,54,9,'Client Fund Request','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-28 07:38:20','2021-06-28 07:39:12'),(2435,4,54,9,'Client Fund Request','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-28 07:39:28','2021-06-28 07:39:59'),(2436,5,54,9,'Client Fund Request','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-28 07:40:13','2021-06-28 07:40:37'),(2437,1,54,9,'Client Fund Request','CFR-21-00009: Your request has been approved.',7,1,5,0,'2021-06-28 07:40:55','2021-06-30 23:48:21'),(2438,2,53,15,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-28 23:16:33','2021-06-28 23:17:14'),(2439,4,53,15,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-28 23:17:31','2021-06-28 23:18:18'),(2440,5,53,15,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-28 23:19:47','2021-06-28 23:20:32'),(2441,1,53,15,'Petty Cash Request','PCR-21-00015: Your request has been approved.',7,1,5,0,'2021-06-28 23:21:14','2021-06-30 23:48:21'),(2442,2,54,14,'Client Fund Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-28 23:35:01','2021-06-28 23:35:01'),(2443,2,54,15,'Client Fund Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-28 23:49:10','2021-06-28 23:49:10'),(2444,4,42,7,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-28 23:55:57','2021-06-28 23:55:57'),(2445,4,42,8,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-28 23:57:35','2021-06-28 23:57:35'),(2446,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 00:10:31','2021-06-29 00:10:31'),(2447,2,132,7,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 00:20:10','2021-06-29 00:20:10'),(2448,2,132,10,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 00:27:57','2021-06-29 00:27:57'),(2449,2,132,10,'Liquidation','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-29 00:28:54','2021-06-29 00:29:50'),(2450,4,132,10,'Liquidation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 00:30:12','2021-06-29 00:30:12'),(2451,1,132,8,'Liquidation','LF-21-00008: Your request has been denied.',1,1,2,0,'2021-06-29 00:30:51','2021-06-30 23:48:21'),(2452,1,132,9,'Liquidation','LF-21-00009: Your request has been denied.',1,1,2,0,'2021-06-29 00:31:16','2021-06-30 23:48:21'),(2453,4,132,7,'Liquidation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 00:31:30','2021-06-29 00:31:30'),(2454,2,132,11,'Liquidation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 00:34:27','2021-06-29 00:34:27'),(2455,2,53,17,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 01:36:06','2021-06-29 01:36:06'),(2456,4,38,10,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-29 02:09:38','2021-06-29 02:10:39'),(2457,20,38,10,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-29 02:11:18','2021-06-29 02:12:15'),(2458,2,38,10,'Cost Estimate','Akosi Admin asked for your approval.',2,1,20,2,'2021-06-29 02:13:07','2021-06-29 02:13:37'),(2459,1,38,10,'Cost Estimate','CEF-21-00010: Your request has been approved.',7,1,2,0,'2021-06-29 02:15:43','2021-06-30 23:48:21'),(2460,2,54,16,'Client Fund Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 02:16:48','2021-06-29 02:16:48'),(2461,2,53,19,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 02:21:44','2021-06-29 02:21:44'),(2462,2,53,20,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 02:22:41','2021-06-29 02:22:41'),(2463,2,53,21,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-29 02:24:00','2021-06-29 02:27:58'),(2464,4,53,21,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 02:28:14','2021-06-29 02:28:14'),(2465,4,53,17,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 02:28:27','2021-06-29 02:28:27'),(2466,4,53,19,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 02:28:42','2021-06-29 02:28:42'),(2467,4,53,20,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-29 02:28:54','2021-06-29 02:29:57'),(2468,5,53,20,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-29 02:31:39','2021-06-29 02:31:39'),(2469,5,53,17,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-29 02:31:55','2021-06-29 02:31:55'),(2470,5,53,19,'Petty Cash Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-29 02:32:09','2021-06-29 02:32:09'),(2471,5,53,21,'Petty Cash Request','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-29 02:32:23','2021-06-29 02:32:57'),(2472,1,53,21,'Petty Cash Request','PCR-21-00021: Your request has been approved.',7,1,5,0,'2021-06-29 02:33:18','2021-06-30 23:48:21'),(2473,1,53,17,'Petty Cash Request','PCR-21-00017: Your request has been approved.',7,1,5,0,'2021-06-29 02:33:33','2021-06-30 23:48:21'),(2474,1,53,20,'Petty Cash Request','PCR-21-00020: Your request has been denied.',1,1,5,0,'2021-06-29 02:34:13','2021-06-30 23:48:21'),(2475,1,53,19,'Petty Cash Request','PCR-21-00019: Your request has been approved.',7,1,5,0,'2021-06-29 02:34:35','2021-06-30 23:48:21'),(2476,4,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 04:51:46','2021-06-29 04:51:46'),(2477,4,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 05:00:40','2021-06-29 05:00:40'),(2478,4,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 05:22:43','2021-06-29 05:22:43'),(2479,4,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-29 05:24:00','2021-06-29 05:25:33'),(2480,20,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-29 05:25:53','2021-07-05 23:24:45'),(2481,20,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-29 05:26:17','2021-07-05 23:24:45'),(2482,20,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-29 05:26:32','2021-07-05 23:24:45'),(2483,20,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-29 05:26:45','2021-06-29 05:27:27'),(2484,2,38,3,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-29 05:27:53','2021-06-29 05:27:53'),(2485,2,38,1,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-29 05:28:10','2021-06-29 05:28:10'),(2486,2,38,2,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-29 05:28:39','2021-06-29 05:28:39'),(2487,2,38,4,'Cost Estimate','Akosi Admin asked for your approval.',2,1,20,2,'2021-06-29 05:29:01','2021-06-29 05:29:23'),(2488,1,38,4,'Cost Estimate','CEF-21-00004: Your request has been approved.',7,1,2,0,'2021-06-29 05:29:44','2021-06-30 23:48:21'),(2489,1,38,2,'Cost Estimate','CEF-21-00002: Your request has been denied.',1,1,2,0,'2021-06-29 05:30:16','2021-06-30 23:48:21'),(2490,1,38,3,'Cost Estimate','CEF-21-00003: Your request has been approved.',7,1,2,0,'2021-06-29 05:30:42','2021-06-30 23:48:21'),(2491,1,38,1,'Cost Estimate','CEF-21-00001: Your request has been approved.',7,1,2,0,'2021-06-29 05:30:59','2021-06-30 23:48:21'),(2492,4,39,1,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 05:38:23','2021-06-29 05:38:23'),(2493,4,39,2,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 05:58:20','2021-06-29 05:58:20'),(2494,4,39,3,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-29 05:59:26','2021-06-29 06:02:48'),(2495,4,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-29 06:01:48','2021-06-29 06:03:23'),(2496,20,39,3,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-29 06:03:16','2021-07-05 23:24:45'),(2497,20,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-29 06:03:50','2021-07-05 23:24:45'),(2498,20,39,1,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-29 06:04:48','2021-07-05 23:24:45'),(2499,20,39,2,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-29 06:05:08','2021-06-29 06:05:30'),(2500,2,39,2,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-29 06:05:57','2021-06-29 06:05:57'),(2501,2,39,1,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-29 06:06:21','2021-06-29 06:06:21'),(2502,2,39,3,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,20,2,'2021-06-29 06:06:40','2021-06-29 06:07:26'),(2503,1,39,3,'Project Budget Rationale','PBR-21-00003: Your request has been approved.',7,1,2,0,'2021-06-29 06:10:25','2021-06-30 23:48:21'),(2504,1,39,1,'Project Budget Rationale','PBR-21-00001: Your request has been approved.',7,1,2,0,'2021-06-29 06:10:54','2021-06-30 23:48:21'),(2505,1,39,2,'Project Budget Rationale','PBR-21-00002: Your request has been approved.',7,1,2,0,'2021-06-29 06:11:17','2021-06-30 23:48:21'),(2506,4,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 06:13:12','2021-06-29 06:13:12'),(2507,4,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 06:14:27','2021-06-29 06:14:27'),(2508,4,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 06:16:10','2021-06-29 06:16:10'),(2509,4,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 06:18:08','2021-06-29 06:18:08'),(2510,4,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 06:20:36','2021-06-29 06:20:36'),(2511,4,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-29 06:22:18','2021-06-29 06:22:48'),(2512,2,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-29 06:23:03','2021-06-29 06:23:03'),(2513,2,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-29 06:23:33','2021-06-29 06:23:33'),(2514,2,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-29 06:24:00','2021-06-29 06:24:00'),(2515,2,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-29 06:24:16','2021-06-29 06:24:16'),(2516,2,46,4,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-29 06:24:37','2021-06-29 06:24:37'),(2517,2,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-29 06:25:19','2021-06-29 06:27:54'),(2518,7,46,5,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 06:28:23','2021-06-29 06:28:23'),(2519,7,46,1,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 06:28:38','2021-06-29 06:28:38'),(2520,7,46,2,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 06:29:43','2021-06-29 06:29:43'),(2521,7,46,3,'Purchase Request','Akosi Admin asked for your approval.',2,1,2,7,'2021-06-29 06:38:21','2021-06-29 06:40:26'),(2522,1,46,4,'Purchase Request','PR-21-00004: Your request has been denied.',1,1,2,0,'2021-06-29 06:38:58','2021-06-30 23:48:21'),(2523,7,46,6,'Purchase Request','Akosi Admin asked for your approval.',2,1,2,7,'2021-06-29 06:39:21','2021-06-29 06:40:02'),(2524,1,46,3,'Purchase Request','PR-21-00003: Your request has been approved.',7,1,7,0,'2021-06-29 06:40:58','2021-06-30 23:48:21'),(2525,1,46,2,'Purchase Request','PR-21-00002: Your request has been approved.',7,1,7,0,'2021-06-29 06:41:20','2021-06-30 23:48:21'),(2526,1,46,1,'Purchase Request','PR-21-00001: Your request has been approved.',7,1,7,0,'2021-06-29 06:47:15','2021-06-30 23:48:21'),(2527,1,46,5,'Purchase Request','PR-21-00005: Your request has been approved.',7,1,7,0,'2021-06-29 06:47:52','2021-06-30 23:48:21'),(2528,1,46,6,'Purchase Request','PR-21-00006: Your request has been approved.',7,1,7,0,'2021-06-29 07:10:22','2021-06-30 23:48:21'),(2529,2,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 07:14:17','2021-06-29 07:14:17'),(2530,2,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 07:16:11','2021-06-29 07:16:11'),(2531,2,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 07:17:06','2021-06-29 07:17:06'),(2532,2,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-29 07:17:55','2021-06-29 07:18:38'),(2533,4,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 07:19:16','2021-06-29 07:19:16'),(2534,4,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 07:19:37','2021-06-29 07:19:37'),(2535,4,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 07:19:56','2021-06-29 07:19:56'),(2536,4,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-29 07:20:23','2021-06-29 07:20:57'),(2537,5,126,3,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-29 07:21:26','2021-06-29 07:21:26'),(2538,5,126,1,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-29 07:21:55','2021-06-29 07:21:55'),(2539,5,126,2,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-29 07:22:21','2021-06-29 07:22:21'),(2540,5,126,4,'Inventory Validation','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-29 07:22:42','2021-06-29 07:23:21'),(2541,1,126,4,'Inventory Validation','IVR-21-00004: Your request has been approved.',7,1,5,0,'2021-06-29 07:23:48','2021-06-30 23:48:21'),(2542,1,126,1,'Inventory Validation','IVR-21-00001: Your request has been approved.',7,1,5,0,'2021-06-29 07:24:12','2021-06-30 23:48:21'),(2543,1,126,3,'Inventory Validation','IVR-21-00003: Your request has been approved.',7,1,5,0,'2021-06-29 07:24:39','2021-06-30 23:48:21'),(2544,1,126,2,'Inventory Validation','IVR-21-00002: Your request has been approved.',7,1,5,0,'2021-06-29 07:25:40','2021-06-30 23:48:21'),(2545,2,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 07:28:02','2021-06-29 07:28:02'),(2546,2,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 07:29:07','2021-06-29 07:29:07'),(2547,2,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-29 07:31:44','2021-06-29 07:32:24'),(2548,4,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 07:33:04','2021-06-29 07:33:04'),(2549,4,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-29 07:33:38','2021-06-29 07:45:23'),(2550,4,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-29 07:35:38','2021-06-29 07:36:43'),(2551,20,40,2,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-29 07:42:48','2021-07-05 23:24:45'),(2552,20,40,1,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-29 07:45:48','2021-07-05 23:24:45'),(2553,20,40,3,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-29 07:46:05','2021-06-29 07:46:25'),(2554,1,40,3,'Bid Recap','BRF-21-00003: Your request has been approved.',7,1,20,0,'2021-06-29 07:46:49','2021-06-30 23:48:21'),(2555,1,40,1,'Bid Recap','BRF-21-00001: Your request has been approved.',7,1,20,0,'2021-06-29 07:47:11','2021-06-30 23:48:21'),(2556,1,40,2,'Bid Recap','BRF-21-00002: Your request has been approved.',7,1,20,0,'2021-06-29 07:47:35','2021-06-30 23:48:21'),(2557,2,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 07:50:18','2021-06-29 07:50:18'),(2558,2,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 07:51:47','2021-06-29 07:51:47'),(2559,2,47,8,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 07:57:39','2021-06-29 07:57:39'),(2560,2,47,9,'Purchase Order','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-29 07:58:24','2021-06-29 08:00:51'),(2561,5,47,9,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 08:01:12','2021-06-29 08:01:12'),(2562,5,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 08:01:28','2021-06-29 08:01:28'),(2563,5,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 08:01:42','2021-06-29 08:01:42'),(2564,5,47,8,'Purchase Order','Akosi Admin asked for your approval.',2,1,2,5,'2021-06-29 08:03:26','2021-06-29 08:03:51'),(2565,4,47,8,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-29 08:04:12','2021-06-29 08:04:12'),(2566,4,47,1,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-29 08:04:27','2021-06-29 08:04:27'),(2567,4,47,2,'Purchase Order','Akosi Admin asked for your approval.',2,1,5,4,'2021-06-29 08:05:22','2021-06-29 08:14:05'),(2568,1,47,3,'Purchase Order','P0-21-00003: Your request has been denied.',1,1,5,0,'2021-06-29 08:06:03','2021-06-30 23:48:21'),(2569,4,47,9,'Purchase Order','Akosi Admin asked for your approval.',2,1,5,4,'2021-06-29 08:06:28','2021-06-29 08:06:53'),(2570,2,47,10,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 08:06:49','2021-06-29 08:06:49'),(2571,1,47,9,'Purchase Order','P0-21-00009: Your request has been approved.',7,1,4,0,'2021-06-29 08:07:18','2021-06-30 23:48:21'),(2572,1,47,1,'Purchase Order','P0-21-00001: Your request has been approved.',7,1,4,0,'2021-06-29 08:07:41','2021-06-30 23:48:21'),(2573,1,47,8,'Purchase Order','P0-21-00008: Your request has been approved.',7,1,4,0,'2021-06-29 08:07:56','2021-06-30 23:48:21'),(2574,2,33,1,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-29 08:14:50','2021-06-29 08:14:50'),(2575,2,33,2,'Inventory  Receiving','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-29 08:15:12','2021-06-29 08:18:38'),(2576,2,33,3,'Inventory  Receiving','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-29 08:15:31','2021-06-29 08:17:27'),(2577,4,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 23:04:39','2021-06-29 23:04:39'),(2578,4,38,7,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 23:06:06','2021-06-29 23:06:06'),(2579,4,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-29 23:09:19','2021-06-29 23:09:51'),(2580,20,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-29 23:10:25','2021-07-05 23:24:45'),(2581,20,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-29 23:10:56','2021-06-29 23:21:05'),(2582,20,38,7,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-29 23:11:07','2021-06-29 23:17:45'),(2583,2,38,7,'Cost Estimate','Akosi Admin asked for your approval.',2,1,20,2,'2021-06-29 23:18:05','2021-06-29 23:20:09'),(2584,1,38,7,'Cost Estimate','CEF-21-00007: Your request has been approved.',7,1,2,0,'2021-06-29 23:20:31','2021-06-30 23:48:21'),(2585,2,38,6,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-29 23:21:24','2021-06-29 23:21:24'),(2586,2,38,5,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-29 23:21:46','2021-06-29 23:21:46'),(2587,2,38,8,'Cost Estimate','Akosi Admin asked for your approval.',2,1,20,2,'2021-06-29 23:21:56','2021-06-29 23:22:16'),(2588,1,38,8,'Cost Estimate','CEF-21-00008: Your request has been approved.',7,1,2,0,'2021-06-29 23:22:40','2021-06-30 23:48:21'),(2589,1,38,5,'Cost Estimate','CEF-21-00005: Your request has been approved.',7,1,2,0,'2021-06-29 23:22:51','2021-06-30 23:48:21'),(2590,1,38,6,'Cost Estimate','CEF-21-00006: Your request has been approved.',7,1,2,0,'2021-06-29 23:23:05','2021-06-30 23:48:21'),(2591,4,39,4,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 23:25:52','2021-06-29 23:25:52'),(2592,4,39,5,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-29 23:26:22','2021-06-29 23:26:47'),(2593,20,39,5,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,0,'2021-06-29 23:27:04','2021-07-05 23:24:45'),(2594,20,39,4,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-29 23:27:29','2021-06-29 23:27:47'),(2595,2,39,4,'Project Budget Rationale','Akosi Admin asked for your approval.',2,0,20,0,'2021-06-29 23:28:05','2021-06-29 23:28:05'),(2596,2,39,5,'Project Budget Rationale','Akosi Admin asked for your approval.',2,1,20,2,'2021-06-29 23:28:18','2021-06-29 23:28:35'),(2597,1,39,5,'Project Budget Rationale','PBR-21-00005: Your request has been approved.',7,1,2,0,'2021-06-29 23:28:49','2021-06-30 23:48:21'),(2598,1,39,4,'Project Budget Rationale','PBR-21-00004: Your request has been approved.',7,1,2,0,'2021-06-29 23:29:01','2021-06-30 23:48:21'),(2599,4,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 23:30:27','2021-06-29 23:30:27'),(2600,4,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 23:31:20','2021-06-29 23:31:20'),(2601,4,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-29 23:34:27','2021-06-29 23:34:54'),(2602,2,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-29 23:35:35','2021-06-29 23:35:35'),(2603,2,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-29 23:35:54','2021-06-29 23:35:54'),(2604,2,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-29 23:36:14','2021-06-29 23:38:31'),(2605,7,46,8,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 23:38:44','2021-06-29 23:38:44'),(2606,7,46,9,'Purchase Request','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 23:38:59','2021-06-29 23:38:59'),(2607,7,46,7,'Purchase Request','Akosi Admin asked for your approval.',2,1,2,7,'2021-06-29 23:39:09','2021-06-29 23:39:41'),(2608,1,46,7,'Purchase Request','PR-21-00007: Your request has been approved.',7,1,7,0,'2021-06-29 23:39:53','2021-06-30 23:48:21'),(2609,1,46,8,'Purchase Request','PR-21-00008: Your request has been approved.',7,1,7,0,'2021-06-29 23:40:04','2021-06-30 23:48:21'),(2610,1,46,9,'Purchase Request','PR-21-00009: Your request has been approved.',7,1,7,0,'2021-06-29 23:40:15','2021-06-30 23:48:21'),(2611,2,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 23:42:25','2021-06-29 23:42:25'),(2612,2,126,6,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 23:42:58','2021-06-29 23:42:58'),(2613,2,126,7,'Inventory Validation','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-29 23:44:03','2021-06-29 23:44:58'),(2614,4,126,7,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 23:45:14','2021-06-29 23:45:14'),(2615,4,126,6,'Inventory Validation','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 23:45:29','2021-06-29 23:45:29'),(2616,4,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-29 23:45:48','2021-06-29 23:46:09'),(2617,5,126,5,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-29 23:46:27','2021-06-29 23:46:27'),(2618,5,126,6,'Inventory Validation','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-29 23:46:47','2021-06-29 23:46:47'),(2619,5,126,7,'Inventory Validation','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-29 23:47:04','2021-06-29 23:47:22'),(2620,1,126,7,'Inventory Validation','IVR-21-00007: Your request has been approved.',7,1,5,0,'2021-06-29 23:47:38','2021-06-30 23:48:21'),(2621,1,126,5,'Inventory Validation','IVR-21-00005: Your request has been approved.',7,1,5,0,'2021-06-29 23:47:53','2021-06-30 23:48:21'),(2622,1,126,6,'Inventory Validation','IVR-21-00006: Your request has been approved.',7,1,5,0,'2021-06-29 23:48:06','2021-06-30 23:48:21'),(2623,2,40,5,'Bid Recap','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-29 23:50:34','2021-06-29 23:50:34'),(2624,2,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-29 23:52:58','2021-06-29 23:53:38'),(2625,4,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-29 23:53:58','2021-06-29 23:53:58'),(2626,4,40,5,'Bid Recap','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-29 23:54:38','2021-06-29 23:55:09'),(2627,20,40,5,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-29 23:55:33','2021-06-29 23:56:31'),(2628,20,40,4,'Bid Recap','Akosi Admin asked for your approval.',2,1,4,20,'2021-06-29 23:55:49','2021-06-29 23:56:15'),(2629,1,40,5,'Bid Recap','BRF-21-00005: Your request has been approved.',7,1,20,0,'2021-06-29 23:56:49','2021-06-30 23:48:21'),(2630,1,40,4,'Bid Recap','BRF-21-00004: Your request has been approved.',7,1,20,1,'2021-06-29 23:57:07','2021-06-30 00:00:30'),(2631,2,47,11,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 00:04:55','2021-06-30 00:04:55'),(2632,2,47,12,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 00:05:38','2021-06-30 00:05:38'),(2633,2,47,13,'Purchase Order','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-30 00:06:47','2021-06-30 00:07:32'),(2634,5,47,13,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-30 00:07:47','2021-06-30 00:07:47'),(2635,5,47,11,'Purchase Order','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-30 00:08:07','2021-06-30 00:08:07'),(2636,5,47,12,'Purchase Order','Akosi Admin asked for your approval.',2,1,2,5,'2021-06-30 00:08:21','2021-06-30 00:08:51'),(2637,4,47,12,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-30 00:09:06','2021-06-30 00:09:06'),(2638,4,47,11,'Purchase Order','Akosi Admin asked for your approval.',2,0,5,0,'2021-06-30 00:09:18','2021-06-30 00:09:18'),(2639,4,47,13,'Purchase Order','Akosi Admin asked for your approval.',2,1,5,4,'2021-06-30 00:09:36','2021-06-30 00:10:00'),(2640,1,47,13,'Purchase Order','P0-21-00013: Your request has been approved.',7,1,4,0,'2021-06-30 00:10:17','2021-06-30 23:48:21'),(2641,1,47,2,'Purchase Order','P0-21-00002: Your request has been approved.',7,1,4,0,'2021-06-30 00:10:31','2021-06-30 23:48:21'),(2642,1,47,11,'Purchase Order','P0-21-00011: Your request has been approved.',7,1,4,0,'2021-06-30 00:10:45','2021-06-30 23:48:21'),(2643,1,47,12,'Purchase Order','P0-21-00012: Your request has been approved.',7,1,4,0,'2021-06-30 00:11:00','2021-06-30 23:48:21'),(2644,4,33,6,'Inventory Receiving','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-30 00:13:51','2021-06-30 00:14:23'),(2645,2,33,6,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-30 00:14:38','2021-06-30 00:14:38'),(2646,2,33,5,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-30 00:14:52','2021-06-30 00:14:52'),(2647,2,33,4,'Inventory  Receiving','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-30 00:15:04','2021-06-30 00:21:46'),(2648,5,33,4,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-30 00:22:13','2021-06-30 00:22:13'),(2649,5,33,5,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-30 00:22:25','2021-06-30 00:22:25'),(2650,5,33,6,'Inventory  Receiving','Akosi Admin asked for your approval.',2,1,2,5,'2021-06-30 00:22:37','2021-06-30 00:22:56'),(2651,1,33,6,'Inventory  Receiving','INRR-21-00006: Your request has been approved.',7,1,5,0,'2021-06-30 00:23:13','2021-06-30 23:48:21'),(2652,1,33,5,'Inventory  Receiving','INRR-21-00005: Your request has been approved.',7,1,5,0,'2021-06-30 00:23:26','2021-06-30 23:48:21'),(2653,1,33,4,'Inventory  Receiving','INRR-21-00004: Your request has been approved.',7,1,5,0,'2021-06-30 00:23:38','2021-06-30 23:48:21'),(2654,4,33,1,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 00:28:28','2021-06-30 00:28:28'),(2655,4,33,2,'Inventory Receiving','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 00:28:49','2021-06-30 00:28:49'),(2656,4,33,3,'Inventory Receiving','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-30 00:29:10','2021-06-30 00:29:32'),(2657,2,33,3,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-30 00:33:55','2021-06-30 00:33:55'),(2658,2,33,1,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-30 00:34:14','2021-06-30 00:34:14'),(2659,2,33,2,'Inventory  Receiving','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-30 00:34:26','2021-06-30 00:34:46'),(2660,5,33,2,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-30 00:34:58','2021-06-30 00:34:58'),(2661,5,33,1,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-30 00:35:44','2021-06-30 00:35:44'),(2662,5,33,3,'Inventory  Receiving','Akosi Admin asked for your approval.',2,1,2,5,'2021-06-30 00:35:56','2021-06-30 00:36:19'),(2663,1,33,3,'Inventory  Receiving','INRR-21-00003: Your request has been approved.',7,1,5,0,'2021-06-30 00:36:33','2021-06-30 23:48:21'),(2664,1,33,1,'Inventory  Receiving','INRR-21-00001: Your request has been approved.',7,1,5,0,'2021-06-30 00:36:45','2021-06-30 23:48:21'),(2665,1,33,2,'Inventory  Receiving','INRR-21-00002: Your request has been approved.',7,1,5,0,'2021-06-30 00:36:57','2021-06-30 23:48:21'),(2666,4,42,1,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 00:42:49','2021-06-30 00:42:49'),(2667,4,42,2,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 00:43:21','2021-06-30 00:43:21'),(2668,4,42,3,'Material Withdrawal','Akosi Admin asked for your approval.',2,1,1,4,'2021-06-30 00:46:32','2021-06-30 00:46:55'),(2669,2,42,3,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-30 00:47:20','2021-06-30 00:47:20'),(2670,2,42,2,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-30 00:47:30','2021-06-30 00:47:30'),(2671,2,42,1,'Material Withdrawal','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-30 00:47:44','2021-06-30 00:47:59'),(2672,5,42,1,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-30 00:48:11','2021-06-30 00:48:11'),(2673,5,42,2,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-30 00:48:23','2021-06-30 00:48:23'),(2674,5,42,3,'Material Withdrawal','Akosi Admin asked for your approval.',2,1,2,5,'2021-06-30 00:49:37','2021-06-30 00:50:27'),(2675,1,42,3,'Material Withdrawal','MWF-21-00003: Your request has been approved.',7,1,5,0,'2021-06-30 00:50:45','2021-06-30 23:48:21'),(2676,1,42,2,'Material Withdrawal','MWF-21-00002: Your request has been approved.',7,1,5,0,'2021-06-30 00:50:55','2021-06-30 23:48:21'),(2677,1,42,1,'Material Withdrawal','MWF-21-00001: Your request has been approved.',7,1,5,0,'2021-06-30 00:51:03','2021-06-30 23:48:21'),(2678,2,45,1,'Material Usage','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 00:52:07','2021-06-30 00:52:07'),(2679,2,45,2,'Material Usage','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 00:52:48','2021-06-30 00:52:48'),(2680,2,45,3,'Material Usage','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-30 00:53:20','2021-06-30 00:53:36'),(2681,4,45,3,'Material Usage','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-30 00:53:51','2021-06-30 00:53:51'),(2682,4,45,2,'Material Usage','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-30 00:54:02','2021-06-30 01:08:10'),(2683,4,45,1,'Material Usage','Akosi Admin asked for your approval.',2,1,2,4,'2021-06-30 00:54:12','2021-06-30 00:54:29'),(2684,5,45,1,'Material Usage','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-30 00:54:43','2021-06-30 00:54:43'),(2685,5,45,2,'Material Usage','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-30 00:54:55','2021-06-30 00:54:55'),(2686,5,45,3,'Material Usage','Akosi Admin asked for your approval.',2,1,4,5,'2021-06-30 00:55:10','2021-06-30 00:55:28'),(2687,1,45,3,'Material Usage','MUF-21-00003: Your request has been approved.',7,1,5,0,'2021-06-30 00:55:43','2021-06-30 23:48:21'),(2688,1,45,2,'Material Usage','MUF-21-00002: Your request has been approved.',7,1,5,0,'2021-06-30 00:55:53','2021-06-30 23:48:21'),(2689,1,45,1,'Material Usage','MUF-21-00001: Your request has been approved.',7,1,5,0,'2021-06-30 00:56:05','2021-06-30 23:48:21'),(2690,2,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,0,4,0,'2021-06-30 01:08:48','2021-06-30 01:08:48'),(2691,2,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,1,4,2,'2021-06-30 01:09:01','2021-06-30 01:09:38'),(2692,5,43,2,'Borrowing Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-30 01:09:50','2021-06-30 01:09:50'),(2693,5,43,1,'Borrowing Item','Akosi Admin asked for your approval.',2,1,2,5,'2021-06-30 01:10:53','2021-06-30 01:13:16'),(2694,1,43,1,'Borrowing Item','EBF-21-00001: Your request has been approved.',7,1,5,0,'2021-06-30 01:13:28','2021-06-30 23:48:21'),(2695,1,43,2,'Borrowing Item','EBF-21-00002: Your request has been approved.',7,1,5,0,'2021-06-30 01:13:37','2021-06-30 23:48:21'),(2696,2,36,1,'Item Disposal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 01:18:17','2021-06-30 01:18:17'),(2697,2,36,2,'Item Disposal','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-30 01:18:46','2021-06-30 01:19:30'),(2698,3,36,2,'Disposal Item','Akosi Admin asked for your approval.',2,0,2,0,'2021-06-30 01:19:43','2021-06-30 01:19:43'),(2699,3,36,1,'Disposal Item','Akosi Admin asked for your approval.',2,1,2,3,'2021-06-30 01:19:54','2021-06-30 01:20:12'),(2700,4,36,1,'Disposal Item','Akosi Admin asked for your approval.',2,0,3,0,'2021-06-30 01:20:22','2021-06-30 01:20:22'),(2701,4,36,2,'Disposal Item','Akosi Admin asked for your approval.',2,1,3,4,'2021-06-30 01:20:35','2021-06-30 01:20:54'),(2702,1,36,2,'Disposal Item','ADF-21-00002: Your request has been approved.',7,1,4,0,'2021-06-30 01:21:12','2021-06-30 23:48:21'),(2703,1,36,1,'Disposal Item','ADF-21-00001: Your request has been approved.',7,1,4,0,'2021-06-30 01:21:22','2021-06-30 23:48:21'),(2704,2,35,1,'Return Item','Akosi Admin asked for your approval.',2,1,1,2,'2021-06-30 01:27:38','2021-06-30 01:28:35'),(2705,5,35,1,'Return Item','Akosi Admin asked for your approval.',2,1,2,5,'2021-06-30 01:28:52','2021-06-30 01:29:13'),(2706,4,35,1,'Return Item','Akosi Admin asked for your approval.',2,1,5,4,'2021-06-30 01:29:23','2021-06-30 01:29:42'),(2707,1,35,1,'Return Item','RI-21-00001: Your request has been approved.',7,1,4,1,'2021-06-30 01:29:55','2021-06-30 01:31:13'),(2708,2,49,6,'Service Requisition','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 01:35:42','2021-06-30 01:35:42'),(2709,2,37,1,'Inventory Transfer','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 01:37:03','2021-06-30 01:37:03'),(2710,2,37,2,'Inventory Transfer','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 01:38:27','2021-06-30 01:38:27'),(2711,2,37,3,'Inventory Transfer','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 02:03:23','2021-06-30 02:03:23'),(2712,4,42,4,'Material Withdrawal','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 02:06:49','2021-06-30 02:06:49'),(2713,4,60,10,'Overtime Request Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 05:30:42','2021-06-30 05:30:42'),(2714,4,60,16,'Leave Request Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 05:32:17','2021-06-30 05:32:17'),(2715,2,128,4,'Service Completion','Akosi Admin asked for your approval.',2,0,1,0,'2021-06-30 05:59:47','2021-06-30 05:59:47'),(2716,4,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-05 01:52:35','2021-07-05 01:52:35'),(2717,4,38,10,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-05 01:53:03','2021-07-05 01:53:03'),(2718,3,52,2,'Sign-Off Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-05 06:58:26','2021-07-05 06:58:26'),(2719,3,52,2,'Sign-Off Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-05 06:59:14','2021-07-05 06:59:14'),(2720,3,52,1,'Sign-Off Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-05 07:02:26','2021-07-05 07:02:26'),(2721,2,52,2,'Sign-Off Form','Akosi Admin asked for your approval.',2,0,3,0,'2021-07-05 07:02:30','2021-07-05 07:02:30'),(2722,1,52,1,'Sign-Off Form','SOF-21-00001: Your request has been denied.',1,0,3,0,'2021-07-05 07:02:39','2021-07-05 07:02:39'),(2723,3,52,3,'Sign-Off Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-05 07:03:22','2021-07-05 07:03:22'),(2724,3,52,4,'Sign-Off Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-05 07:04:11','2021-07-05 07:04:11'),(2725,2,52,4,'Sign-Off Form','Akosi Admin asked for your approval.',2,1,3,2,'2021-07-05 07:04:34','2021-07-05 07:04:48'),(2726,1,52,4,'Sign-Off Form','SOF-21-00004: Your request has been approved.',7,0,2,0,'2021-07-05 07:04:56','2021-07-05 07:04:56'),(2727,1,52,2,'Sign-Off Form','SOF-21-00002: Your request has been approved.',7,0,2,0,'2021-07-05 07:05:05','2021-07-05 07:05:05'),(2728,20,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,0,'2021-07-05 08:05:08','2021-07-05 23:24:45'),(2729,20,38,10,'Cost Estimate','Akosi Admin asked for your approval.',2,1,4,20,'2021-07-05 08:05:45','2021-07-05 08:06:56'),(2730,4,38,11,'Cost Estimate','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-05 23:10:33','2021-07-05 23:10:33'),(2731,2,38,9,'Cost Estimate','Akosi Admin asked for your approval.',2,0,20,0,'2021-07-05 23:11:53','2021-07-05 23:11:53'),(2732,2,126,8,'Inventory Validation','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-05 23:19:14','2021-07-05 23:19:14'),(2733,4,46,10,'Purchase Request','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-06 00:33:47','2021-07-06 00:33:47'),(2734,2,40,6,'Bid Recap','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-06 01:35:05','2021-07-06 01:35:05'),(2735,2,47,16,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-06 02:12:27','2021-07-06 02:12:27'),(2736,2,47,16,'Purchase Order','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-06 02:14:23','2021-07-06 02:14:23'),(2737,4,33,7,'Inventory Receiving','Akosi Admin asked for your approval.',2,1,1,4,'2021-07-06 02:28:29','2021-07-06 02:28:55'),(2738,2,33,7,'Inventory  Receiving','Akosi Admin asked for your approval.',2,0,4,0,'2021-07-06 02:33:08','2021-07-06 02:33:08'),(2739,3,37,1,'Inventory Transfer','Akosi Admin asked for your approval.',2,0,2,0,'2021-07-06 02:51:49','2021-07-06 02:51:49'),(2740,2,44,6,'Inventory Incident','Akosi Admin asked for your approval.',2,0,5,0,'2021-07-06 02:56:48','2021-07-06 02:56:48'),(2741,4,49,6,'Service Requisition','Akosi Admin asked for your approval.',2,0,2,0,'2021-07-06 02:59:31','2021-07-06 02:59:31'),(2742,3,52,3,'Sign-Off Form','Akosi Admin asked for your approval.',2,1,1,3,'2021-07-06 05:41:56','2021-07-06 05:42:16'),(2743,6,60,18,'Change Schedule','Akosi Admin asked for your approval.',2,0,4,0,'2021-07-06 05:56:48','2021-07-06 05:56:48'),(2744,2,60,12,'Leave Request Form','Akosi Admin asked for your approval.',2,0,4,0,'2021-07-06 06:09:45','2021-07-06 06:09:45'),(2745,8,60,2,'Overtime Request Form','Akosi Admin asked for your approval.',2,0,4,0,'2021-07-06 06:17:15','2021-07-06 06:17:15'),(2746,4,57,9,'No Time-in/Time-out','Akosi Admin asked for your approval.',2,0,2,0,'2021-07-06 06:26:51','2021-07-06 06:26:51'),(2747,1,57,8,'No Time-in / Time-out','NTI-21-00008: Your request has been denied.',1,0,2,0,'2021-07-06 06:29:40','2021-07-06 06:29:40'),(2748,1,60,12,'Leave Request Form','LRF-21-00012: Your request has been denied.',1,0,2,0,'2021-07-06 06:30:35','2021-07-06 06:30:35'),(2749,3,58,8,'Official Business','Akosi Admin asked for your approval.',2,0,2,0,'2021-07-06 06:38:38','2021-07-06 06:38:38'),(2750,4,60,20,'Leave Request Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-07 08:29:18','2021-07-07 08:29:18'),(2751,2,60,20,'Leave Request Form','Akosi Admin asked for your approval.',2,0,4,0,'2021-07-07 08:30:21','2021-07-07 08:30:21'),(2752,6,60,20,'Leave Request Form','Akosi Admin asked for your approval.',2,1,2,6,'2021-07-07 08:30:45','2021-07-07 08:31:32'),(2753,1,60,20,'Leave Request Form','LRF-21-00020: Your request has been approved.',7,0,6,0,'2021-07-07 08:39:51','2021-07-07 08:39:51'),(2754,1,60,20,'Leave Request Form','LRF-21-00020: Your request has been approved.',7,0,6,0,'2021-07-07 08:41:32','2021-07-07 08:41:32'),(2755,1,60,20,'Leave Request Form','LRF-21-00020: Your request has been approved.',7,0,6,0,'2021-07-07 08:46:59','2021-07-07 08:46:59'),(2756,1,60,20,'Leave Request Form','LRF-21-00020: Your request has been approved.',7,0,6,0,'2021-07-07 08:48:09','2021-07-07 08:48:09'),(2757,4,60,21,'Leave Request Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-07 08:49:08','2021-07-07 08:49:08'),(2758,2,55,21,'Leave Request Form','Akosi Admin asked for your approval.',2,1,4,2,'2021-07-07 08:49:52','2021-07-07 08:51:51'),(2759,6,55,21,'Leave Request Form','Akosi Admin asked for your approval.',2,1,2,6,'2021-07-07 08:51:58','2021-07-07 08:52:30'),(2760,1,55,21,'Leave Request Form','LRF-21-00021: Your request has been approved.',7,0,6,0,'2021-07-07 08:52:37','2021-07-07 08:52:37'),(2761,4,60,22,'Leave Request Form','Akosi Admin asked for your approval.',2,1,1,4,'2021-07-07 08:53:51','2021-07-07 08:54:22'),(2762,2,55,22,'Leave Request Form','Akosi Admin asked for your approval.',2,1,4,2,'2021-07-07 08:55:26','2021-07-07 08:55:47'),(2763,6,55,22,'Leave Request Form','Akosi Admin asked for your approval.',2,1,2,6,'2021-07-07 08:55:54','2021-07-07 08:56:07'),(2764,1,55,22,'Leave Request Form','LRF-21-00022: Your request has been approved.',7,0,6,0,'2021-07-07 08:56:19','2021-07-07 08:56:19'),(2765,1,55,22,'Leave Request Form','LRF-21-00022: Your request has been approved.',7,0,6,0,'2021-07-07 08:58:42','2021-07-07 08:58:42'),(2766,4,55,1,'Leave Request Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-07 23:45:41','2021-07-07 23:45:41'),(2767,4,55,2,'Leave Request Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-07 23:49:34','2021-07-07 23:49:34'),(2768,4,55,4,'Leave Request Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-07 23:50:30','2021-07-07 23:50:30'),(2769,4,55,3,'Leave Request Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-07 23:52:11','2021-07-07 23:52:11'),(2770,4,55,1,'Leave Request Form','Akosi Admin asked for your approval.',2,1,1,4,'2021-07-08 00:26:11','2021-07-08 00:26:35'),(2771,2,55,1,'Leave Request Form','Akosi Admin asked for your approval.',2,0,4,0,'2021-07-08 00:26:42','2021-07-08 00:26:42'),(2772,2,55,4,'Leave Request Form','Akosi Admin asked for your approval.',2,1,4,2,'2021-07-08 00:26:48','2021-07-08 00:28:46'),(2773,1,55,2,'Leave Request Form','LRF-21-00002: Your request has been denied.',1,0,4,0,'2021-07-08 00:28:24','2021-07-08 00:28:24'),(2774,6,55,4,'Leave Request Form','Akosi Admin asked for your approval.',2,1,2,6,'2021-07-08 00:28:53','2021-07-08 00:33:15'),(2775,1,55,1,'Leave Request Form','LRF-21-00001: Your request has been denied.',1,0,2,0,'2021-07-08 00:29:03','2021-07-08 00:29:03'),(2776,4,55,1,'Leave Request Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-08 00:30:24','2021-07-08 00:30:24'),(2777,1,55,4,'Leave Request Form','LRF-21-00004: Your request has been denied.',1,0,6,0,'2021-07-08 00:33:26','2021-07-08 00:33:26'),(2778,1,55,1,'Leave Request Form','LRF-21-00001: Your request has been approved.',7,0,6,0,'2021-07-08 00:33:32','2021-07-08 00:33:32'),(2779,4,55,4,'Leave Request Form','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-08 00:34:18','2021-07-08 00:34:18'),(2780,1,60,18,'Change Schedule','SCH-21-00018: Your request has been denied.',1,0,6,0,'2021-07-08 00:45:42','2021-07-08 00:45:42'),(2781,1,60,2,'Change Schedule','SCH-21-00002: Your request has been denied.',1,0,6,0,'2021-07-08 00:48:14','2021-07-08 00:48:14'),(2782,4,60,26,'Change Schedule','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-08 00:52:15','2021-07-08 00:52:15'),(2783,4,60,27,'Change Schedule','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-08 00:52:44','2021-07-08 00:52:44'),(2784,1,60,7,'Change Schedule','SCH-21-00007: Your request has been denied.',1,0,6,0,'2021-07-08 00:53:51','2021-07-08 00:53:51'),(2785,1,60,6,'Change Schedule','SCH-21-00006: Your request has been denied.',1,0,6,0,'2021-07-08 00:54:38','2021-07-08 00:54:38'),(2786,4,60,29,'Change Schedule','Akosi Admin asked for your approval.',2,1,1,4,'2021-07-08 00:55:24','2021-07-08 00:56:27'),(2787,1,60,29,'Change Schedule','SCH-21-00029: Your request has been denied.',1,0,4,0,'2021-07-08 00:56:38','2021-07-08 00:56:38'),(2788,4,60,30,'Change Schedule','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-08 00:57:04','2021-07-08 00:57:04'),(2789,1,60,21,'Change Schedule','SCH-21-00021: Your request has been denied.',1,0,4,0,'2021-07-08 01:03:09','2021-07-08 01:03:09'),(2790,4,60,31,'Change Schedule','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-08 01:03:59','2021-07-08 01:03:59'),(2791,1,60,23,'Change Schedule','SCH-21-00023: Your request has been denied.',1,0,4,0,'2021-07-08 01:04:22','2021-07-08 01:04:22'),(2792,1,60,26,'Change Schedule','SCH-21-00026: Your request has been denied.',1,0,4,0,'2021-07-08 01:06:07','2021-07-08 01:06:07'),(2793,4,60,33,'Change Schedule','Akosi Admin asked for your approval.',2,0,1,0,'2021-07-08 01:06:25','2021-07-08 01:06:25'),(2794,1,60,27,'Change Schedule','SCH-21-00027: Your request has been denied.',1,0,4,0,'2021-07-08 01:06:44','2021-07-08 01:06:44'),(2795,1,60,30,'Change Schedule','SCH-21-00030: Your request has been denied.',1,0,4,0,'2021-07-08 01:07:14','2021-07-08 01:07:14'),(2796,1,60,31,'Change Schedule','SCH-21-00031: Your request has been denied.',1,0,4,0,'2021-07-08 01:08:17','2021-07-08 01:08:17');
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_attendance_break_tbl`
--

LOCK TABLES `hris_attendance_break_tbl` WRITE;
/*!40000 ALTER TABLE `hris_attendance_break_tbl` DISABLE KEYS */;
INSERT INTO `hris_attendance_break_tbl` VALUES (1,20,'2021-09-10 14:32:08',NULL,0.00,'2021-09-10 06:32:11','2021-09-10 06:32:11'),(2,20,'2021-09-10 14:32:11',NULL,0.00,'2021-09-10 06:32:13','2021-09-10 06:32:13'),(3,20,'2021-09-10 14:32:14',NULL,0.00,'2021-09-10 06:32:15','2021-09-10 06:32:15'),(4,20,'2021-09-10 14:32:16',NULL,0.00,'2021-09-10 06:32:17','2021-09-10 06:32:17'),(5,9,'2021-09-10 14:45:27',NULL,0.00,'2021-09-10 06:45:29','2021-09-10 06:45:29'),(6,20,'2021-09-13 15:23:38','2021-09-13 15:34:00',0.17,'2021-09-13 07:23:41','2021-09-13 07:34:03'),(7,20,'2021-09-14 13:06:20','2021-09-14 13:37:21',0.52,'2021-09-14 05:06:22','2021-09-14 05:37:22'),(8,20,'2021-09-15 12:17:48',NULL,0.00,'2021-09-16 06:04:44','2021-09-16 06:04:44'),(9,20,'2021-09-15 12:17:50','2021-09-15 13:02:01',0.74,'2021-09-16 06:04:46','2021-09-16 06:04:46'),(10,20,'2021-09-15 15:56:21','2021-09-15 16:01:05',0.08,'2021-09-16 06:04:47','2021-09-16 06:04:47'),(11,20,'2021-09-16 14:58:13',NULL,0.00,'2021-09-16 06:58:16','2021-09-16 06:58:16'),(12,20,'2021-09-16 14:58:17',NULL,0.00,'2021-09-16 06:58:19','2021-09-16 06:58:19'),(13,20,'2021-09-16 15:03:26',NULL,0.00,'2021-09-16 07:03:28','2021-09-16 07:03:28'),(14,20,'2021-09-16 15:03:31',NULL,0.00,'2021-09-16 07:03:34','2021-09-16 07:03:34'),(15,20,'2021-09-16 15:03:45','2021-09-16 15:23:43',0.33,'2021-09-16 07:03:48','2021-09-16 07:23:46');
/*!40000 ALTER TABLE `hris_attendance_break_tbl` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_award_tbl`
--

LOCK TABLES `hris_award_tbl` WRITE;
/*!40000 ALTER TABLE `hris_award_tbl` DISABLE KEYS */;
INSERT INTO `hris_award_tbl` VALUES (1,'Employee of the Month','Outstanding employee for the month','3',1,1,1,'2021-04-15 02:48:17','2021-04-15 02:48:17'),(2,'Employee of the Year','Outstanding employee for the year','3',1,1,1,'2021-04-15 02:48:58','2021-04-15 02:48:58'),(3,'Certificate of Appreciation','Early Bird Award','2|4|5',1,1,1,'2021-06-18 02:20:43','2021-06-18 02:20:43'),(4,'Certificate of Participation','Champion in Bicycle Race','4|6|19',1,1,1,'2021-06-18 02:23:00','2021-06-18 02:23:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_change_schedule_tbl`
--

LOCK TABLES `hris_change_schedule_tbl` WRITE;
/*!40000 ALTER TABLE `hris_change_schedule_tbl` DISABLE KEYS */;
INSERT INTO `hris_change_schedule_tbl` VALUES (1,NULL,1,'2021-04-15','09:00:00','19:00:00','For Check up','1','2','2021-04-15 11:27:31',2,NULL,'2021-04-15 11:27:31',1,1,'2021-04-15 11:01:43','2021-04-15 03:27:35'),(2,NULL,1,'2021-04-15','00:00:00','17:00:00','Sample Change Schedule','4|6|5','2|3','2021-04-19 16:44:55|2021-07-08 08:48:12',3,'Tes','2021-04-19 16:39:22',1,6,'2021-04-15 11:23:06','2021-07-08 00:48:13'),(3,NULL,1,'2021-04-16','09:00:00','19:00:00','Attending event.','4|6|5','2|2|3','2021-04-15 11:32:58|2021-04-15 11:33:54|2021-04-15 11:35:33',3,'Need to report on time.','2021-04-15 11:30:24',1,5,'2021-04-15 11:30:24','2021-04-15 03:35:38'),(4,NULL,1,'2021-04-14','08:00:00','17:00:00','Testing Change Schedule','4|6|5',NULL,NULL,4,NULL,'2021-04-15 11:45:23',1,1,'2021-04-15 11:36:29','2021-04-15 03:47:44'),(5,NULL,1,'2021-04-26','08:00:00','17:00:00','Testing ','4|6|5',NULL,NULL,4,NULL,'2021-04-15 11:55:38',1,1,'2021-04-15 11:55:38','2021-04-15 03:56:55'),(6,NULL,1,'2021-04-30','08:00:00','17:00:00','Testing duplicate','4|6|5','2|3','2021-04-15 14:58:11|2021-07-08 08:54:37',3,'LAST','2021-04-15 11:56:25',1,6,'2021-04-15 11:56:25','2021-07-08 00:54:38'),(7,NULL,1,'2021-04-18','08:00:00','17:00:00','tesing langs','4|6|5','2|3','2021-04-19 16:43:55|2021-07-08 08:53:50',3,'reeeee','2021-04-15 11:57:38',1,6,'2021-04-15 11:57:38','2021-07-08 00:53:50'),(8,NULL,1,'2021-05-12','08:00:00','17:00:00','Testing','4|6|5','3','2021-04-19 16:44:24',3,'Ayoko','2021-04-15 13:05:59',1,4,'2021-04-15 13:01:43','2021-04-19 08:44:26'),(9,NULL,1,'2021-04-15','08:00:00','17:00:00','Try DUplication',NULL,NULL,NULL,4,NULL,NULL,1,1,'2021-04-15 13:04:50','2021-05-05 07:45:11'),(10,NULL,1,'2021-04-15','08:00:00','17:00:00','',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-04-15 13:06:25','2021-04-15 05:06:27'),(11,NULL,4,'2021-04-15','08:00:00','17:00:00','Change Schedule','4','2','2021-04-19 16:41:22',2,NULL,'2021-04-19 16:41:22',4,4,'2021-04-15 15:39:42','2021-04-19 08:41:25'),(12,NULL,1,'2021-04-20','08:00:00','17:00:00','',NULL,NULL,NULL,4,NULL,NULL,1,1,'2021-04-19 16:37:21','2021-04-20 07:28:29'),(13,NULL,4,'2021-04-19','08:00:00','17:00:00','Sample Change Request','1|3|6','2','2021-04-19 16:45:58',1,NULL,'2021-04-19 16:42:42',4,1,'2021-04-19 16:42:42','2021-04-19 08:46:00'),(14,NULL,4,'2021-04-30','08:00:00','17:00:00','Sample reason','1|3|6','3','2021-04-19 16:46:15',3,'Ayoko','2021-04-19 16:43:14',4,1,'2021-04-19 16:43:14','2021-04-19 08:46:17'),(15,NULL,1,'2021-04-01','08:00:00','17:00:00','Test','4|6|5',NULL,NULL,4,NULL,'2021-04-19 17:55:35',1,1,'2021-04-19 17:55:35','2021-04-21 00:59:42'),(16,NULL,1,'2021-04-16','08:00:00','17:00:00','Sample Duplication',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-04-20 15:32:20','2021-04-20 07:32:22'),(17,NULL,1,'2021-04-27','08:00:00','17:00:00','',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-04-27 13:36:18','2021-04-27 05:36:17'),(18,NULL,1,'2021-05-31','17:00:00','02:00:00','trip ko lang','4|6|5','2|3','2021-07-06 13:56:43|2021-07-08 08:45:40',3,'test','2021-05-20 13:29:53',1,6,'2021-05-20 13:29:53','2021-07-08 00:45:41'),(19,NULL,1,'2021-05-25','08:00:00','17:00:00','test','4|6|5','2|2|2','2021-05-25 16:01:27|2021-05-25 16:04:41|2021-05-25 16:05:10',5,NULL,'2021-05-25 16:00:21',1,1,'2021-05-25 16:00:21','2021-05-26 05:47:41'),(20,NULL,1,'2021-05-26','08:00:00','17:00:00','test','4|6|5',NULL,NULL,4,NULL,'2021-05-25 16:06:57',1,1,'2021-05-25 16:06:57','2021-05-25 08:07:12'),(21,3,1,'2021-04-16','09:00:00','19:00:00','Attending event sana','4|6|5','3','2021-07-08 09:03:07',3,'03','2021-05-26 13:57:40',1,4,'2021-05-26 07:47:20','2021-07-08 01:03:08'),(22,NULL,1,'2021-05-27','08:00:00','17:00:00','test','4|6|5','3','2021-05-26 14:00:53',3,'test','2021-05-26 13:59:32',1,4,'2021-05-26 13:58:58','2021-05-26 06:00:54'),(23,22,1,'2021-05-27','08:00:00','17:00:00','test','4|6|5','3','2021-07-08 09:04:20',3,'23','2021-05-26 14:03:16',1,4,'2021-05-26 14:03:16','2021-07-08 01:04:21'),(24,NULL,1,'2021-07-07','08:00:00','17:00:00','',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-07-07 01:56:21','2021-07-07 01:56:23'),(25,18,1,'2021-05-31','17:00:00','02:00:00','trip ko lang',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-07-08 00:45:54','2021-07-08 00:45:55'),(26,2,1,'2021-09-15','00:00:00','17:00:00','Sample Change Schedule','4|6|5','3','2021-07-08 09:06:05',3,'26','2021-07-08 00:52:14',1,4,'2021-07-08 00:52:14','2021-07-08 01:06:06'),(27,8,1,'2021-05-12','08:00:00','17:00:00','Testing','4|6|5','3','2021-07-08 09:06:42',3,'27','2021-07-08 00:52:39',1,4,'2021-07-08 00:52:39','2021-07-08 01:06:43'),(28,7,1,'2021-04-18','08:00:00','17:00:00','tesing langs',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-07-08 00:54:05','2021-07-08 00:54:08'),(29,6,1,'2021-04-30','08:00:00','17:00:00','Testing duplicate','4|6|5','3','2021-07-08 08:56:36',3,'REee','2021-07-08 00:55:18',1,4,'2021-07-08 00:55:18','2021-07-08 00:56:37'),(30,29,1,'2021-04-30','08:00:00','17:00:00','29','4|6|5','3','2021-07-08 09:07:12',3,'30','2021-07-08 00:57:02',1,4,'2021-07-08 00:57:02','2021-07-08 01:07:13'),(31,21,1,'2021-04-16','09:00:00','19:00:00','Attending event sana','4|6|5','3','2021-07-08 09:08:15',3,'32','2021-07-08 01:03:58',1,4,'2021-07-08 01:03:58','2021-07-08 01:08:16'),(32,23,1,'2021-05-27','08:00:00','17:00:00','23',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-07-08 01:04:32','2021-07-08 01:04:35'),(33,26,1,'2021-09-15','00:00:00','17:00:00','26','4|6|5',NULL,NULL,1,NULL,'2021-07-08 01:06:24',1,1,'2021-07-08 01:06:24','2021-07-08 01:06:25'),(34,27,1,'2021-05-12','08:00:00','17:00:00','Testing',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-07-08 01:07:00','2021-07-08 01:07:01'),(35,30,1,'2021-04-30','08:00:00','17:00:00','29',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-07-08 01:07:23','2021-07-08 01:07:24'),(36,31,1,'2021-04-16','09:00:00','19:00:00','Attending event sana',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-07-08 01:09:47','2021-07-08 01:09:50');
/*!40000 ALTER TABLE `hris_change_schedule_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_checklist_tbl`
--

DROP TABLE IF EXISTS `hris_checklist_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_checklist_tbl` (
  `checklistID` bigint(50) NOT NULL AUTO_INCREMENT,
  `checklistTitle` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checklistDescription` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdBy` int(11) NOT NULL,
  `updatedBy` int(11) NOT NULL,
  PRIMARY KEY (`checklistID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_checklist_tbl`
--

LOCK TABLES `hris_checklist_tbl` WRITE;
/*!40000 ALTER TABLE `hris_checklist_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_checklist_tbl` ENABLE KEYS */;
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
INSERT INTO `hris_department_tbl` VALUES (1,'DPT-21-00001','Human Resource Department',1,'2021-04-14 23:30:27',1,1,'2021-04-14 23:30:27','0000-00-00 00:00:00'),(2,'DPT-21-00002','Finance Department',1,'2021-04-14 23:30:52',1,1,'2021-04-14 23:30:52','0000-00-00 00:00:00'),(3,'DPT-21-00003','Operations Department',1,'2021-04-14 23:31:20',1,1,'2021-04-14 23:31:20','0000-00-00 00:00:00'),(4,'DPT-21-00004','Admin Department',1,'2021-04-14 23:32:51',1,1,'2021-04-14 23:32:51','0000-00-00 00:00:00'),(5,'DPT-21-00005','Marketing Department',1,'2021-04-14 23:35:50',1,1,'2021-04-14 23:35:50','0000-00-00 00:00:00'),(6,'DPT-21-00006','Accounting Department',0,'2021-04-28 08:04:38',1,1,'2021-04-28 08:04:38','2021-04-28 08:05:31');
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
  `designationHourlyRate` decimal(19,2) NOT NULL,
  `designationStatus` int(50) NOT NULL,
  `datecreated` date NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`designationID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_designation_tbl`
--

LOCK TABLES `hris_designation_tbl` WRITE;
/*!40000 ALTER TABLE `hris_designation_tbl` DISABLE KEYS */;
INSERT INTO `hris_designation_tbl` VALUES (1,'DSN-21-00001',4,'Administrator',0.00,1,'2021-03-24',1,1,'2021-03-24 05:07:13','2021-05-05 02:45:17'),(2,'DSN-21-00002',4,'Network Engineer',0.00,1,'2021-03-26',1,1,'2021-03-26 05:43:25','2021-04-14 23:35:13'),(3,'DSN-21-00003',1,'Human Resources',0.00,1,'2021-03-24',1,1,'2021-03-24 05:07:13','2021-04-07 01:17:08'),(4,'DSN-21-00004',3,'Junior Developer',0.00,1,'2021-03-26',1,1,'2021-03-26 05:43:25','2021-04-14 23:33:57'),(5,'DSN-21-00005',3,'Senior Developer',0.00,1,'2021-03-24',1,1,'2021-03-24 05:07:13','2021-04-14 23:34:07'),(6,'DSN-21-00006',2,'Finance',0.00,1,'2021-03-26',1,1,'2021-03-26 05:43:25','2021-04-14 23:34:19'),(7,'DSN-21-00007',1,'Installer',0.00,1,'2021-03-24',1,1,'2021-03-24 05:07:13','2021-04-07 01:17:08'),(8,'DSN-21-00008',4,'IT Admin',0.00,1,'2021-03-26',1,1,'2021-03-26 05:43:25','2021-05-05 02:46:16'),(9,'DSN-21-00009',3,'Quality Analyst',0.00,1,'2021-03-24',1,1,'2021-03-24 05:07:13','2021-04-14 23:33:32'),(10,'DSN-21-00010',5,'Marketing',0.00,0,'2021-03-26',1,1,'2021-03-26 05:43:25','2021-04-14 23:36:11'),(11,'DSN-21-00003',5,'Digital Marketing Specialist',0.00,1,'2021-04-22',1,1,'2021-04-22 02:24:08','2021-04-22 02:24:08'),(12,'DSN-21-00004',3,'UI/UX Designer',0.00,1,'2021-05-14',1,1,'2021-05-14 06:49:52','2021-05-14 06:49:52'),(13,'DSN-21-00005',2,'Finance Officer',0.00,1,'2021-05-24',1,1,'2021-05-24 00:24:35','2021-05-24 00:24:35'),(14,'DSN-21-00006',3,'Front-end Developer',0.00,1,'2021-06-14',1,1,'2021-06-14 07:45:16','2021-06-14 07:45:16'),(15,'DSN-21-00007',3,'Project Manager',0.00,1,'2021-06-30',1,1,'2021-06-30 04:57:14','2021-06-30 04:57:14'),(17,'DSN-21-00011',5,'Marketing Support',0.00,1,'2021-06-30',1,1,'2021-06-30 05:19:33','2021-06-30 05:19:33');
/*!40000 ALTER TABLE `hris_designation_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_employee_attendance_tbl`
--

DROP TABLE IF EXISTS `hris_employee_attendance_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_employee_attendance_tbl` (
  `attendanceID` bigint(21) NOT NULL AUTO_INCREMENT,
  `employeeID` bigint(21) NOT NULL,
  `scheduleDate` date DEFAULT NULL,
  `scheduleIn` datetime DEFAULT NULL,
  `scheduleOut` datetime DEFAULT NULL,
  `scheduleBreakDuration` decimal(10,2) DEFAULT NULL,
  `scheduleDuration` decimal(10,2) DEFAULT NULL,
  `checkIn` datetime DEFAULT NULL,
  `checkOut` datetime DEFAULT NULL,
  `checkDuration` decimal(10,2) DEFAULT NULL,
  `overtimeIn` datetime DEFAULT NULL,
  `overtimeOut` datetime DEFAULT NULL,
  `overtimeDuration` decimal(10,2) DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`attendanceID`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_employee_attendance_tbl`
--

LOCK TABLES `hris_employee_attendance_tbl` WRITE;
/*!40000 ALTER TABLE `hris_employee_attendance_tbl` DISABLE KEYS */;
INSERT INTO `hris_employee_attendance_tbl` VALUES (1,1,'2021-09-10','2021-09-10 07:00:00','2021-09-10 16:00:00',1.00,8.00,'2021-09-10 14:12:52',NULL,0.00,NULL,NULL,NULL,4,4,'2021-09-10 06:09:40','2021-09-10 06:12:57'),(2,2,'2021-09-10','2021-09-10 07:00:00','2021-09-10 16:00:00',1.00,8.00,'2021-09-10 14:12:50',NULL,0.00,NULL,NULL,NULL,4,4,'2021-09-10 06:09:40','2021-09-10 06:12:57'),(3,3,'2021-09-10','2021-09-10 07:00:00','2021-09-10 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,4,4,'2021-09-10 06:09:40','2021-09-10 06:09:40'),(4,4,'2021-09-10','2021-09-10 06:00:00','2021-09-10 17:00:00',1.00,10.00,NULL,NULL,NULL,NULL,NULL,NULL,4,4,'2021-09-10 06:09:40','2021-09-10 06:09:40'),(5,5,'2021-09-10','2021-09-10 07:00:00','2021-09-10 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,4,4,'2021-09-10 06:09:40','2021-09-10 06:09:40'),(6,6,'2021-09-10','2021-09-10 07:00:00','2021-09-10 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,4,4,'2021-09-10 06:09:40','2021-09-10 06:09:40'),(7,7,'2021-09-10','2021-09-10 07:00:00','2021-09-10 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,4,4,'2021-09-10 06:09:40','2021-09-10 06:09:40'),(8,8,'2021-09-10','2021-09-10 07:00:00','2021-09-10 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,4,4,'2021-09-10 06:09:40','2021-09-10 06:09:40'),(9,9,'2021-09-10','2021-09-10 07:00:00','2021-09-10 16:00:00',1.00,8.00,'2021-09-10 14:43:43',NULL,0.00,NULL,NULL,NULL,4,4,'2021-09-10 06:09:40','2021-09-10 06:43:58'),(10,19,'2021-09-10','2021-09-10 07:00:00','2021-09-10 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,4,4,'2021-09-10 06:09:40','2021-09-10 06:09:40'),(11,20,'2021-09-10','2021-09-10 06:00:00','2021-09-10 17:00:00',1.00,10.00,'2021-09-10 14:21:39','2021-09-10 16:34:16',2.21,NULL,NULL,NULL,4,4,'2021-09-10 06:09:40','2021-09-13 07:18:20'),(12,21,'2021-09-10','2021-09-10 07:00:00','2021-09-10 16:00:00',1.00,8.00,'2021-09-10 14:24:18',NULL,0.00,NULL,NULL,NULL,4,4,'2021-09-10 06:09:40','2021-09-10 06:43:58'),(13,22,'2021-09-10','2021-09-10 07:00:00','2021-09-10 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,4,4,'2021-09-10 06:09:40','2021-09-10 06:09:40'),(14,23,'2021-09-10','2021-09-10 07:00:00','2021-09-10 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,4,4,'2021-09-10 06:09:40','2021-09-10 06:09:40'),(15,1,'2021-09-13','2021-09-13 07:00:00','2021-09-13 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 00:42:28','2021-09-13 00:42:28'),(16,2,'2021-09-13','2021-09-13 07:00:00','2021-09-13 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 00:42:28','2021-09-13 00:42:28'),(17,3,'2021-09-13','2021-09-13 07:00:00','2021-09-13 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 00:42:28','2021-09-13 00:42:28'),(18,4,'2021-09-13','2021-09-13 06:00:00','2021-09-13 17:00:00',1.00,10.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 00:42:28','2021-09-13 00:42:28'),(19,5,'2021-09-13','2021-09-13 07:00:00','2021-09-13 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 00:42:28','2021-09-13 00:42:28'),(20,6,'2021-09-13','2021-09-13 07:00:00','2021-09-13 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 00:42:28','2021-09-13 00:42:28'),(21,7,'2021-09-13','2021-09-13 07:00:00','2021-09-13 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 00:42:28','2021-09-13 00:42:28'),(22,8,'2021-09-13','2021-09-13 07:00:00','2021-09-13 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 00:42:28','2021-09-13 00:42:28'),(23,9,'2021-09-13','2021-09-13 07:00:00','2021-09-13 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 00:42:28','2021-09-13 00:42:28'),(24,19,'2021-09-13','2021-09-13 07:00:00','2021-09-13 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 00:42:28','2021-09-13 00:42:28'),(25,20,'2021-09-13','2021-09-13 06:00:00','2021-09-13 17:00:00',1.00,10.00,'2021-09-13 15:18:46','2021-09-13 16:21:01',1.04,NULL,NULL,NULL,0,0,'2021-09-13 00:42:28','2021-09-13 23:58:59'),(26,21,'2021-09-13','2021-09-13 07:00:00','2021-09-13 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 00:42:28','2021-09-13 00:42:28'),(27,22,'2021-09-13','2021-09-13 07:00:00','2021-09-13 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 00:42:28','2021-09-13 00:42:28'),(28,23,'2021-09-13','2021-09-13 07:00:00','2021-09-13 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 00:42:28','2021-09-13 00:42:28'),(29,1,'2021-09-14','2021-09-14 07:00:00','2021-09-14 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 23:37:36','2021-09-13 23:37:36'),(30,2,'2021-09-14','2021-09-14 07:00:00','2021-09-14 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 23:37:36','2021-09-13 23:37:36'),(31,3,'2021-09-14','2021-09-14 07:00:00','2021-09-14 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 23:37:36','2021-09-13 23:37:36'),(32,4,'2021-09-14','2021-09-14 06:00:00','2021-09-14 17:00:00',1.00,10.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 23:37:36','2021-09-13 23:37:36'),(33,5,'2021-09-14','2021-09-14 07:00:00','2021-09-14 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 23:37:36','2021-09-13 23:37:36'),(34,6,'2021-09-14','2021-09-14 07:00:00','2021-09-14 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 23:37:36','2021-09-13 23:37:36'),(35,7,'2021-09-14','2021-09-14 07:00:00','2021-09-14 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 23:37:36','2021-09-13 23:37:36'),(36,8,'2021-09-14','2021-09-14 07:00:00','2021-09-14 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 23:37:36','2021-09-13 23:37:36'),(37,9,'2021-09-14','2021-09-14 07:00:00','2021-09-14 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 23:37:36','2021-09-13 23:37:36'),(38,19,'2021-09-14','2021-09-14 07:00:00','2021-09-14 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 23:37:36','2021-09-13 23:37:36'),(39,20,'2021-09-14','2021-09-14 06:00:00','2021-09-14 17:00:00',1.00,10.00,'2021-09-14 07:57:53','2021-09-14 12:07:00',4.15,NULL,NULL,NULL,0,0,'2021-09-13 23:37:36','2021-09-14 05:05:42'),(40,21,'2021-09-14','2021-09-14 07:00:00','2021-09-14 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 23:37:36','2021-09-13 23:37:36'),(41,22,'2021-09-14','2021-09-14 07:00:00','2021-09-14 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 23:37:36','2021-09-13 23:37:36'),(42,23,'2021-09-14','2021-09-14 07:00:00','2021-09-14 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-13 23:37:36','2021-09-13 23:37:36'),(43,1,'2021-09-16','2021-09-16 07:00:00','2021-09-16 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 06:01:43','2021-09-16 06:01:43'),(44,2,'2021-09-16','2021-09-16 07:00:00','2021-09-16 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 06:01:43','2021-09-16 06:01:43'),(45,3,'2021-09-16','2021-09-16 07:00:00','2021-09-16 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 06:01:43','2021-09-16 06:01:43'),(46,4,'2021-09-16','2021-09-16 00:00:00','2021-09-16 00:00:00',0.00,0.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 06:01:43','2021-09-16 06:01:43'),(47,5,'2021-09-16','2021-09-16 07:00:00','2021-09-16 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 06:01:43','2021-09-16 06:01:43'),(48,6,'2021-09-16','2021-09-16 07:00:00','2021-09-16 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 06:01:43','2021-09-16 06:01:43'),(49,7,'2021-09-16','2021-09-16 07:00:00','2021-09-16 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 06:01:43','2021-09-16 06:01:43'),(50,8,'2021-09-16','2021-09-16 07:00:00','2021-09-16 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 06:01:43','2021-09-16 06:01:43'),(51,9,'2021-09-16','2021-09-16 07:00:00','2021-09-16 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 06:01:43','2021-09-16 06:01:43'),(52,19,'2021-09-16','2021-09-16 07:00:00','2021-09-16 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 06:01:43','2021-09-16 06:01:43'),(53,20,'2021-09-16','2021-09-16 00:00:00','2021-09-16 00:00:00',0.00,0.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 06:01:43','2021-09-16 06:01:43'),(54,21,'2021-09-16','2021-09-16 07:00:00','2021-09-16 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 06:01:43','2021-09-16 06:01:43'),(55,22,'2021-09-16','2021-09-16 07:00:00','2021-09-16 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 06:01:43','2021-09-16 06:01:43'),(56,23,'2021-09-16','2021-09-16 07:00:00','2021-09-16 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 06:01:43','2021-09-16 06:01:43'),(57,1,'2021-09-17','2021-09-17 07:00:00','2021-09-17 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 23:19:09','2021-09-16 23:19:09'),(58,2,'2021-09-17','2021-09-17 07:00:00','2021-09-17 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 23:19:09','2021-09-16 23:19:09'),(59,3,'2021-09-17','2021-09-17 07:00:00','2021-09-17 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 23:19:09','2021-09-16 23:19:09'),(60,4,'2021-09-17','2021-09-17 06:00:00','2021-09-17 17:00:00',1.00,10.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 23:19:09','2021-09-16 23:19:09'),(61,5,'2021-09-17','2021-09-17 07:00:00','2021-09-17 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 23:19:09','2021-09-16 23:19:09'),(62,6,'2021-09-17','2021-09-17 07:00:00','2021-09-17 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 23:19:09','2021-09-16 23:19:09'),(63,7,'2021-09-17','2021-09-17 07:00:00','2021-09-17 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 23:19:09','2021-09-16 23:19:09'),(64,8,'2021-09-17','2021-09-17 07:00:00','2021-09-17 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 23:19:09','2021-09-16 23:19:09'),(65,9,'2021-09-17','2021-09-17 07:00:00','2021-09-17 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 23:19:09','2021-09-16 23:19:09'),(66,19,'2021-09-17','2021-09-17 07:00:00','2021-09-17 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 23:19:09','2021-09-16 23:19:09'),(67,20,'2021-09-17','2021-09-17 06:00:00','2021-09-17 17:00:00',1.00,10.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 23:19:09','2021-09-16 23:19:09'),(68,21,'2021-09-17','2021-09-17 07:00:00','2021-09-17 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 23:19:09','2021-09-16 23:19:09'),(69,22,'2021-09-17','2021-09-17 07:00:00','2021-09-17 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 23:19:09','2021-09-16 23:19:09'),(70,23,'2021-09-17','2021-09-17 07:00:00','2021-09-17 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-16 23:19:09','2021-09-16 23:19:09'),(71,1,'2021-09-20','2021-09-20 07:00:00','2021-09-20 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-19 23:24:37','2021-09-19 23:24:37'),(72,2,'2021-09-20','2021-09-20 07:00:00','2021-09-20 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-19 23:24:37','2021-09-19 23:24:37'),(73,3,'2021-09-20','2021-09-20 07:00:00','2021-09-20 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-19 23:24:37','2021-09-19 23:24:37'),(74,4,'2021-09-20','2021-09-20 06:00:00','2021-09-20 17:00:00',1.00,10.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-19 23:24:37','2021-09-19 23:24:37'),(75,5,'2021-09-20','2021-09-20 07:00:00','2021-09-20 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-19 23:24:37','2021-09-19 23:24:37'),(76,6,'2021-09-20','2021-09-20 07:00:00','2021-09-20 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-19 23:24:37','2021-09-19 23:24:37'),(77,7,'2021-09-20','2021-09-20 07:00:00','2021-09-20 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-19 23:24:37','2021-09-19 23:24:37'),(78,8,'2021-09-20','2021-09-20 07:00:00','2021-09-20 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-19 23:24:37','2021-09-19 23:24:37'),(79,9,'2021-09-20','2021-09-20 07:00:00','2021-09-20 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-19 23:24:37','2021-09-19 23:24:37'),(80,19,'2021-09-20','2021-09-20 07:00:00','2021-09-20 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-19 23:24:37','2021-09-19 23:24:37'),(81,20,'2021-09-20','2021-09-20 06:00:00','2021-09-20 17:00:00',1.00,10.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-19 23:24:37','2021-09-19 23:24:37'),(82,21,'2021-09-20','2021-09-20 07:00:00','2021-09-20 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-19 23:24:37','2021-09-19 23:24:37'),(83,22,'2021-09-20','2021-09-20 07:00:00','2021-09-20 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-19 23:24:37','2021-09-19 23:24:37'),(84,23,'2021-09-20','2021-09-20 07:00:00','2021-09-20 16:00:00',1.00,8.00,NULL,NULL,NULL,NULL,NULL,NULL,0,0,'2021-09-19 23:24:37','2021-09-19 23:24:37'),(85,1,'2021-09-22','2021-09-22 08:00:00','2021-09-22 16:00:00',1.00,7.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-22 11:35:38','2021-09-22 11:35:38'),(86,2,'2021-09-22','2021-09-22 08:00:00','2021-09-22 16:00:00',1.00,7.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-22 11:35:38','2021-09-22 11:35:38'),(87,3,'2021-09-22','2021-09-22 08:00:00','2021-09-22 16:00:00',1.00,7.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-22 11:35:38','2021-09-22 11:35:38'),(88,4,'2021-09-22','2021-09-22 00:00:00','2021-09-22 00:00:00',0.00,0.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-22 11:35:38','2021-09-22 11:35:38'),(89,5,'2021-09-22','2021-09-22 08:00:00','2021-09-22 16:00:00',1.00,7.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-22 11:35:38','2021-09-22 11:35:38'),(90,6,'2021-09-22','2021-09-22 08:00:00','2021-09-22 16:00:00',1.00,7.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-22 11:35:38','2021-09-22 11:35:38'),(91,7,'2021-09-22','2021-09-22 08:00:00','2021-09-22 16:00:00',1.00,7.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-22 11:35:38','2021-09-22 11:35:38'),(92,8,'2021-09-22','2021-09-22 08:00:00','2021-09-22 16:00:00',1.00,7.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-22 11:35:38','2021-09-22 11:35:38'),(93,9,'2021-09-22','2021-09-22 08:00:00','2021-09-22 16:00:00',1.00,7.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-22 11:35:38','2021-09-22 11:35:38'),(94,19,'2021-09-22','2021-09-22 08:00:00','2021-09-22 16:00:00',1.00,7.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-22 11:35:38','2021-09-22 11:35:38'),(95,20,'2021-09-22','2021-09-22 00:00:00','2021-09-22 00:00:00',0.00,0.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-22 11:35:38','2021-09-22 11:35:38'),(96,21,'2021-09-22','2021-09-22 08:00:00','2021-09-22 16:00:00',1.00,7.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-22 11:35:38','2021-09-22 11:35:38'),(97,22,'2021-09-22','2021-09-22 08:00:00','2021-09-22 16:00:00',1.00,7.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-22 11:35:38','2021-09-22 11:35:38'),(98,23,'2021-09-22','2021-09-22 08:00:00','2021-09-22 16:00:00',1.00,7.00,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-09-22 11:35:38','2021-09-22 11:35:38');
/*!40000 ALTER TABLE `hris_employee_attendance_tbl` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_employee_documents_tbl`
--

LOCK TABLES `hris_employee_documents_tbl` WRITE;
/*!40000 ALTER TABLE `hris_employee_documents_tbl` DISABLE KEYS */;
INSERT INTO `hris_employee_documents_tbl` VALUES (92,9,'Others','System Coding Standardso01619164393.docx','application',1,1,'2021-04-23 07:53:13','2021-04-23 07:53:13'),(93,19,'Contract and Appraisal','System Coding Standardsca01619165689.docx','application',1,1,'2021-04-23 08:14:49','2021-04-23 08:14:49'),(94,19,'Training and Development','IMG_1956td01619165720.JPG','image',1,1,'2021-04-23 08:15:20','2021-04-23 08:15:20'),(95,19,'Others','System Coding Standardso01619165720.docx','application',1,1,'2021-04-23 08:15:20','2021-04-23 08:15:20'),(96,19,'Employee Memoranda','IMG_1958em01619165799.JPG','image',1,1,'2021-04-23 08:16:39','2021-04-23 08:16:39'),(97,19,'Training and Development','IMG_2021td01619165799.JPG','image',1,1,'2021-04-23 08:16:39','2021-04-23 08:16:39'),(98,1,'Contract and Appraisal','logoca01619403200.png','image',1,1,'2021-04-26 02:13:20','2021-04-26 02:13:20'),(99,20,'Contract and Appraisal','BCGI-Personnel Requisition Formca01619666076.docx','application',1,1,'2021-04-29 03:14:36','2021-04-29 03:14:36'),(100,20,'Employee Memoranda','ProjectBuilderUIem01619666076.xlsx','application',1,1,'2021-04-29 03:14:36','2021-04-29 03:14:36'),(101,2,'Contract and Appraisal','defaultca01620790806.png','image',1,1,'2021-05-12 03:40:06','2021-05-12 03:40:06');
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
) ENGINE=InnoDB AUTO_INCREMENT=594 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_employee_leave_tbl`
--

LOCK TABLES `hris_employee_leave_tbl` WRITE;
/*!40000 ALTER TABLE `hris_employee_leave_tbl` DISABLE KEYS */;
INSERT INTO `hris_employee_leave_tbl` VALUES (3,12,1,10.00,0.00,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(4,12,2,10.00,0.00,1,1,'2021-04-22 01:49:37','2021-04-22 01:49:37'),(5,13,1,10.00,0.00,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(6,13,2,10.00,0.00,1,1,'2021-04-22 01:52:42','2021-04-22 01:52:42'),(7,14,1,10.00,0.00,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(8,14,2,10.00,0.00,1,1,'2021-04-22 01:55:15','2021-04-22 01:55:15'),(9,15,1,5.00,0.00,1,1,'2021-04-22 02:35:48','2021-04-22 02:35:48'),(10,15,2,8.00,0.00,1,1,'2021-04-22 02:35:48','2021-04-22 05:16:21'),(11,16,1,30.00,0.00,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(12,16,2,17.00,0.00,1,1,'2021-04-22 05:35:35','2021-04-22 05:35:35'),(246,22,1,0.00,0.00,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(247,22,2,0.00,0.00,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(248,22,3,0.00,0.00,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(249,22,4,0.00,0.00,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(250,22,5,0.00,0.00,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(296,19,1,5.00,0.00,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(297,19,2,14.00,0.00,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(298,19,3,0.00,0.00,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(299,19,4,0.00,0.00,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(300,19,5,0.00,0.00,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(306,21,1,0.00,0.00,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(307,21,2,0.00,0.00,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(308,21,3,0.00,0.00,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(309,21,4,0.00,0.00,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(310,21,5,0.00,0.00,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(406,7,1,0.00,0.00,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(407,7,2,0.00,0.00,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(408,7,3,0.00,0.00,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(409,7,4,0.00,0.00,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(410,7,5,0.00,0.00,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(506,23,1,7.00,44.09,1,1,'2021-06-03 02:58:03','2021-09-14 00:03:18'),(507,23,2,0.00,0.00,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(508,23,3,0.00,0.00,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(509,23,4,0.00,0.00,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(526,8,1,0.00,0.00,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(527,8,2,0.00,0.00,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(528,8,3,0.00,0.00,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(529,8,4,0.00,0.00,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(538,1,1,4.00,51.74,1,1,'2021-06-18 06:13:55','2021-09-14 00:03:18'),(539,1,2,4.00,0.00,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(540,1,3,10.00,0.00,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(541,1,4,5.00,0.00,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(550,4,1,0.00,0.00,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(551,4,2,0.00,0.00,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(552,4,3,0.00,0.00,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(553,4,4,0.00,0.00,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(554,5,1,0.00,0.00,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(555,5,2,0.00,0.00,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(556,5,3,0.00,0.00,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(557,5,4,0.00,0.00,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(558,9,1,4.00,41.15,1,1,'2021-06-30 03:05:09','2021-09-14 00:03:18'),(559,9,2,5.00,0.00,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(560,9,3,0.00,0.00,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(561,9,4,0.00,0.00,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(566,3,1,0.00,0.00,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(567,3,2,0.00,0.00,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(568,3,3,1.00,0.00,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(569,3,4,1.00,0.00,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(574,20,1,0.42,40.72,1,1,'2021-07-05 08:06:46','2021-09-14 00:03:18'),(575,20,2,5.00,0.00,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(576,20,3,0.00,0.00,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(577,20,4,0.00,0.00,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(586,2,1,0.42,18.06,1,1,'2021-07-06 07:51:06','2021-09-14 00:03:18'),(587,2,2,5.00,0.00,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(588,2,3,0.00,0.00,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(589,2,4,0.00,0.00,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(590,6,1,0.00,3.34,1,1,'2021-07-07 08:31:19','2021-09-14 00:03:18'),(591,6,2,0.00,0.00,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(592,6,3,0.00,0.00,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(593,6,4,0.00,0.00,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19');
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_employee_list_tbl`
--

LOCK TABLES `hris_employee_list_tbl` WRITE;
/*!40000 ALTER TABLE `hris_employee_list_tbl` DISABLE KEYS */;
INSERT INTO `hris_employee_list_tbl` VALUES (1,4,1,1,1,1,'Akosi','','Admin','Officer',7.00,17,'0943-216-5213','akosiadmin@gmail.com','admin','admin','U2FsdGVkX1/Xqq+Nmo9ckSzsBptKA62Pa/Ash96eYDw=','Akosi Admin','5132-5324-254','1619403200.png','Anonymous','2021-04-22','undefined','Philippine, Filipino','Single','432-532-643','53-2634274-3','32-532673245-2','4326-3246-7235','4A','RIZAL','CAINTA','SAN JUAN','1701','Antel','Julia Vargas','Ortigas','Philippines','1960',1000000.00,45454.55,5681.82,0.00,'2020-04-08',1,1,1,'2021-03-26 00:09:46','2021-09-10 06:44:33'),(2,4,2,2,1,1,'Arjay','','Diangzon','Rank and File',5.00,40,'0935-465-4654','arjaydiangzon@gmail.com','arjay','arjay','U2FsdGVkX1+qtnHaJWemIuuW5VYK6s4ZVgSgZAhJoJg=','ARJAY DIANGZON','5368-8125-563','1620788188.png','Female','2021-05-12','undefined','Philippine, Filipino','Single','','','','','01','ILOCOS SUR','BANAYOYO','BANBANAAL','','null','null','null','null','null',2700.00,90.00,11.25,400.00,'2018-05-15',1,1,1,'2021-03-26 00:09:46','2021-09-14 00:03:18'),(3,3,5,3,1,0,'Wilson','','Parajas','Officer',7.00,4,'0934-324-2423','wilsonparajas@gmail.com','wilson','wilson','U2FsdGVkX19eAC648eng7KE1bIyY+zCtbDVxdGuelP8=','','','1620959313.png','Female','1995-05-06','undefined','Philippine, Filipino','Single','','','','','01','PANGASINAN','AGNO','BANGAN-ODA','','null','null','null','null','null',2400.00,80.00,10.00,0.00,'2021-05-01',1,1,1,'2021-03-26 00:09:46','2021-09-10 06:44:33'),(4,3,4,4,2,0,'Charles','','Verdadero','Rank and File',5.00,4,'0954-165-1321','charlesverdadero@gmail.com','charles','charles','U2FsdGVkX18CB8KIVU1RzRAfZP6pBnVf+F4LmxKP6OA=','','1234 5678 9078','1620790164.png','Female','1999-02-12','undefined','Belgian','Separated','','','','','03','BULACAN','ANGAT','BINAGBAG','','28','null','null','null','null',2100.00,70.00,8.75,0.00,'2021-04-27',1,1,1,'2021-03-26 00:09:46','2021-09-10 06:44:33'),(5,3,4,5,1,0,'Mark','','Nieto','Rank and File',5.00,4,'0954-435-3452','marknieto@gmail.com','mark','marky','U2FsdGVkX1/gFpzZcamJB1HEyV4KLSi8QFyeh6Li+So=','','','1620790218.png','Female','2021-05-11','null','Philippine, Filipino','Single','','','','','NCR','NATIONAL CAPITAL REGION - FOURTH DISTRICT','CITY OF MUNTINLUPA','BULI','','null','null','null','null','null',1900.00,60.00,7.50,0.00,'2021-05-06',1,1,1,'2021-03-26 00:09:46','2021-09-10 06:44:33'),(6,5,11,6,1,0,'Francis','','Bolster','Rank and File',5.00,55,'0923-254-3534','ffbolster@gmail.com','francis','francis','U2FsdGVkX1/hCH+yCAdAxnqQvfcSnyDYRC8bXQKFQsA=','','','1620790505.png','Male','1986-04-15','null','American','Divorced','','','','','CAR','ABRA','BANGUED','BANGBANGAR','','3432-C','Uprising','Downside','United States of America','6431',1600.00,70.00,8.75,0.00,'2017-02-06',1,1,1,'2021-03-26 00:09:46','2021-09-10 06:44:33'),(7,3,9,7,1,0,'Renna','Porras','Telesforo',NULL,NULL,14,'0932-324-2343','rennatelesforo@gmail.com','renna','renna','U2FsdGVkX1/Wze0FuN7dfnBMkTrDsupvjdj/vg7GvgE=','','','1620790263.png','Female','1998-06-02','undefined','Philippine, Filipino','Single','','','','','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','QUEZON CITY','PAYATAS','','28','Payatas A','None','Philippine','1212',5300.00,240.91,30.11,0.00,'2020-07-02',1,1,1,'2021-03-26 00:09:46','2021-09-10 06:44:33'),(8,1,7,8,1,0,'Matthew','','Isaac','Rank and File',5.00,4,'0943-543-4645','matthewisaac@gmail.com','matthew','matthew','U2FsdGVkX1+ntDmYi8igu9DaxMYtXF1bkCxYbdlG4R4=','','','1620959339.png','Male','1972-03-31','null','Philippine, Filipino','Divorced','','','','','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','CITY OF PASIG','PALATIW','','null','null','null','null','null',1000.00,50.00,6.25,0.00,'2021-05-01',0,1,1,'2021-03-26 00:09:46','2021-09-10 06:44:33'),(9,3,4,0,1,2,'Errol','James','Garcia','Rank and File',5.00,18,'0923-000-0000','erroljames.garcia@theblackcoders.com','errol','errol','U2FsdGVkX18QkpkiR3XK1rb4qa4C1AndPTe2GC7uRy4=','TEST','31-2000-000-0','default.jpg','Male','1999-06-12','null','Philippine, Filipino','Single','321-732-432','32-5327436-3','64-327345745-7','5327-3474-5654','NCR','TAGUIG - PATEROS','PATEROS','SANTA ANA','','250','P. Rosales Street','Luna Compound','Philippines','1621',499632.00,22710.55,2838.82,500.00,'2020-03-12',1,1,1,'2021-04-22 06:38:46','2021-09-14 00:03:18'),(19,1,3,0,1,2,'Lawrence','','Mark',NULL,NULL,5,'0963-242-3432','mark@gmail.com','lawrence','lawrence','U2FsdGVkX19apNdfdvi63topGNN+FGzX3fb3Qk+6Rs4=','Mark','34-1265-123-4','1620790479.png','Female','2021-04-15',NULL,'Philippine, Filipino','Single','634-654-364','53-2523734-5','32-463274325-4','2346-7436-4374','01','ILOCOS SUR','BANAYOYO','BISANGOL','1701','Antel','Julia','Ortigas','Ph','1243',150000.00,6818.18,852.27,500.00,'2021-04-13',1,1,1,'2021-04-23 03:10:08','2021-09-14 00:03:18'),(20,3,9,0,2,2,'Joseph','','Berongoy','Rank and File',5.00,22,'0995-876-8725','joseph.berongoy@theblackcoders.com','joseph','joseph','U2FsdGVkX19V45ZkhRFLI/4nB9J5xpiA+ui9YFDh4jQ=','Joseph Berongoy','48-3492-347-3','1619663463.png','Male','1998-09-10','null','Philippine, Filipino','Single','253-453-532','32-5435435-3','24-353445653-4','4656-4562-4344','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','CITY OF PASIG','MANGGAHAN','','1600','Ampalaya Street','NAPICO','Philippines','1611',50000.00,2272.73,284.09,0.00,'2019-10-21',1,1,1,'2021-04-29 02:30:11','2021-09-10 06:44:33'),(21,3,4,0,1,2,'Ayesha','','Porras',NULL,NULL,4,'0920-542-9523','ayesha18@gmail.com','ayesha','ayesha','U2FsdGVkX19cK5POEThvyU79EA1xymHkgS94n63M51I=','Ayesha Porras','54-3535-353-5','1620790551.png','Female','1998-04-13',NULL,'Philippine, Filipino','Single','343-645-454','23-1214234-3','32-532543545-4','3432-5436-5463','4A','QUEZON','LUCENA CITY','BARANGAY 5 (POB.)','','28','St. Paul Payatas','none','Philippine','1191',15500.00,704.55,88.07,120.00,'2021-05-03',2,1,1,'2021-05-06 04:54:24','2021-09-10 06:44:33'),(22,1,7,0,1,0,'Jelo','','De Guzman',NULL,NULL,20,'0929-123-4567','jelodeguzman@gmail.com','installer','installer','U2FsdGVkX18DI+8QHRMktaJQ8QqXUn1WhLKd0Zzj8EQ=','','','1620629982.png','Male','1995-10-18',NULL,'Philippine, Filipino','Married','','','','','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','QUEZON CITY','COMMONWEALTH','1234','567','Street Kalsada','Jelo\'s','Philippines','0101',13000.00,590.91,73.86,0.00,'2020-01-06',1,1,1,'2021-05-10 06:59:42','2021-09-10 06:44:33'),(23,1,7,0,1,0,'Yow Lee','','Rah Me Zares','Officer',7.00,17,'0943-274-3284','yowlee@gmail.com','yowlee','yowlee','U2FsdGVkX18KECzEZzwSV/MoEKjuL1NfeMBiJTuijDY=','','','default.jpg','Male','1997-02-12','','Philippine, Filipino','Single','','','','','NCR','NATIONAL CAPITAL REGION - MANILA','INTRAMUROS','BARANGAY 657','','123','test','test','test','3231',21000.00,954.55,119.32,0.00,'2020-04-03',1,1,1,'2021-06-03 02:43:50','2021-09-10 06:44:33');
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
) ENGINE=InnoDB AUTO_INCREMENT=13507 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_employee_permission_tbl`
--

LOCK TABLES `hris_employee_permission_tbl` WRITE;
/*!40000 ALTER TABLE `hris_employee_permission_tbl` DISABLE KEYS */;
INSERT INTO `hris_employee_permission_tbl` VALUES (3407,22,1,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3408,22,2,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3409,22,3,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3410,22,4,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3411,22,5,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3412,22,6,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3413,22,7,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3414,22,8,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3415,22,9,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3416,22,10,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3417,22,11,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3418,22,12,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3419,22,13,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3420,22,14,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3421,22,15,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3422,22,16,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3423,22,17,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3424,22,18,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3425,22,19,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3426,22,20,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3427,22,21,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3428,22,22,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3429,22,23,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3430,22,24,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3431,22,25,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3432,22,26,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3433,22,27,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3434,22,28,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3435,22,29,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3436,22,30,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3437,22,31,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3438,22,32,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3439,22,33,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3440,22,34,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3441,22,35,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3442,22,36,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3443,22,37,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3444,22,38,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3445,22,39,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3446,22,40,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3447,22,41,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3448,22,42,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3449,22,43,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3450,22,44,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3451,22,45,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3452,22,46,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3453,22,47,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3454,22,48,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3455,22,49,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3456,22,50,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3457,22,51,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3458,22,52,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3459,22,53,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3460,22,54,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3461,22,55,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3462,22,56,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3463,22,57,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3464,22,58,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3465,22,59,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3466,22,60,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3467,22,61,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3468,22,62,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3469,22,63,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3470,22,64,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3471,22,65,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3472,22,66,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3473,22,67,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3474,22,68,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3475,22,69,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3476,22,70,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3477,22,71,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3478,22,72,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3479,22,73,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3480,22,74,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3481,22,75,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3482,22,76,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3483,22,77,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3484,22,78,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3485,22,79,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3486,22,80,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3487,22,81,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3488,22,82,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3489,22,83,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3490,22,84,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3491,22,85,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3492,22,86,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3493,22,87,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3494,22,88,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3495,22,89,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3496,22,90,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3497,22,91,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3498,22,92,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3499,22,93,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3500,22,94,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3501,22,95,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3502,22,96,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3503,22,97,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3504,22,98,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3505,22,99,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3506,22,100,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3507,22,101,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3508,22,102,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3509,22,103,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3510,22,104,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3511,22,105,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3512,22,106,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3513,22,107,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3514,22,108,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3515,22,109,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3516,22,110,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3517,22,111,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3518,22,112,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3519,22,113,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3520,22,114,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3521,22,115,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3522,22,116,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3523,22,117,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3524,22,118,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3525,22,119,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3526,22,120,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3527,22,121,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3528,22,122,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3529,22,123,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3530,22,124,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3531,22,125,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3532,22,126,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3533,22,127,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3534,22,128,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(3535,22,129,0,0,1,0,0,1,1,'2021-05-10 06:59:42','2021-05-10 06:59:42'),(4690,19,1,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4691,19,2,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4692,19,3,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4693,19,4,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4694,19,5,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4695,19,6,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4696,19,7,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4697,19,8,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4698,19,9,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4699,19,10,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4700,19,11,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4701,19,12,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4702,19,13,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4703,19,14,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4704,19,15,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4705,19,16,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4706,19,17,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4707,19,18,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4708,19,19,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4709,19,20,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4710,19,21,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4711,19,22,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4712,19,23,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4713,19,24,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4714,19,25,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4715,19,26,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4716,19,27,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4717,19,28,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4718,19,29,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4719,19,30,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4720,19,31,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4721,19,32,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4722,19,33,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4723,19,34,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4724,19,35,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4725,19,36,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4726,19,37,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4727,19,38,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4728,19,39,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4729,19,40,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4730,19,41,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4731,19,42,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4732,19,43,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4733,19,44,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4734,19,45,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4735,19,46,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4736,19,47,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4737,19,49,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4738,19,50,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4739,19,51,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4740,19,52,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4741,19,53,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4742,19,54,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4743,19,55,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4744,19,56,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4745,19,57,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4746,19,58,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4747,19,59,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4748,19,60,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4749,19,61,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4750,19,62,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4751,19,63,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4752,19,64,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4753,19,65,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4754,19,66,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4755,19,67,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4756,19,68,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4757,19,69,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4758,19,70,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4759,19,71,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4760,19,72,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4761,19,73,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4762,19,74,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4763,19,75,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4764,19,76,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4765,19,77,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4766,19,78,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4767,19,79,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4768,19,80,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4769,19,81,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4770,19,82,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4771,19,83,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4772,19,84,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4773,19,85,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4774,19,86,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4775,19,87,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4776,19,88,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4777,19,89,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4778,19,90,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4779,19,91,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4780,19,92,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4781,19,93,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4782,19,94,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4783,19,95,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4784,19,96,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4785,19,97,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4786,19,98,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4787,19,99,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4788,19,100,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4789,19,101,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4790,19,102,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4791,19,103,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4792,19,104,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4793,19,105,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4794,19,106,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4795,19,107,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4796,19,108,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4797,19,109,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4798,19,110,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4799,19,111,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4800,19,112,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4801,19,113,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4802,19,114,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4803,19,115,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4804,19,116,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4805,19,117,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4806,19,118,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4807,19,119,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4808,19,120,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4809,19,121,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4810,19,122,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4811,19,123,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4812,19,124,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4813,19,125,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4814,19,126,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4815,19,127,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4816,19,128,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4817,19,129,0,0,1,0,0,1,1,'2021-05-12 03:34:39','2021-05-12 03:34:39'),(4946,21,1,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4947,21,2,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4948,21,3,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4949,21,4,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4950,21,5,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4951,21,6,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4952,21,7,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4953,21,8,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4954,21,9,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4955,21,10,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4956,21,11,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4957,21,12,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4958,21,13,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4959,21,14,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4960,21,15,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4961,21,16,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4962,21,17,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4963,21,18,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4964,21,19,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4965,21,20,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4966,21,21,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4967,21,22,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4968,21,23,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4969,21,24,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4970,21,25,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4971,21,26,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4972,21,27,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4973,21,28,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4974,21,29,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4975,21,30,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4976,21,31,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4977,21,32,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4978,21,33,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4979,21,34,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4980,21,35,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4981,21,36,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4982,21,37,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4983,21,38,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4984,21,39,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4985,21,40,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4986,21,41,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4987,21,42,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4988,21,43,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4989,21,44,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4990,21,45,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4991,21,46,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4992,21,47,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4993,21,49,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4994,21,50,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4995,21,51,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4996,21,52,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4997,21,53,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4998,21,54,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(4999,21,55,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5000,21,56,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5001,21,57,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5002,21,58,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5003,21,59,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5004,21,60,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5005,21,61,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5006,21,62,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5007,21,63,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5008,21,64,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5009,21,65,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5010,21,66,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5011,21,67,1,1,1,1,1,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5012,21,68,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5013,21,69,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5014,21,70,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5015,21,71,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5016,21,72,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5017,21,73,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5018,21,74,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5019,21,75,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5020,21,76,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5021,21,77,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5022,21,78,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5023,21,79,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5024,21,80,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5025,21,81,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5026,21,82,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5027,21,83,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5028,21,84,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5029,21,85,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5030,21,86,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5031,21,87,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5032,21,88,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5033,21,89,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5034,21,90,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5035,21,91,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5036,21,92,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5037,21,93,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5038,21,94,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5039,21,95,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5040,21,96,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5041,21,97,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5042,21,98,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5043,21,99,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5044,21,100,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5045,21,101,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5046,21,102,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5047,21,103,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5048,21,104,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5049,21,105,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5050,21,106,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5051,21,107,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5052,21,108,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5053,21,109,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5054,21,110,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5055,21,111,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5056,21,112,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5057,21,113,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5058,21,114,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5059,21,115,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5060,21,116,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5061,21,117,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5062,21,118,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5063,21,119,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5064,21,120,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5065,21,121,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5066,21,122,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5067,21,123,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5068,21,124,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5069,21,125,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5070,21,126,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5071,21,127,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5072,21,128,1,1,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(5073,21,129,0,0,1,0,0,1,1,'2021-05-12 03:35:51','2021-05-12 03:35:51'),(7510,7,1,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7511,7,2,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7512,7,3,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7513,7,4,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7514,7,5,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7515,7,6,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7516,7,7,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7517,7,8,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7518,7,9,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7519,7,10,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7520,7,11,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7521,7,12,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7522,7,13,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7523,7,14,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7524,7,15,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7525,7,16,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7526,7,17,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7527,7,18,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7528,7,19,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7529,7,20,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7530,7,21,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7531,7,22,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7532,7,23,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7533,7,24,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7534,7,25,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7535,7,26,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7536,7,27,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7537,7,28,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7538,7,29,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7539,7,30,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7540,7,31,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7541,7,32,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7542,7,33,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7543,7,34,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7544,7,35,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7545,7,36,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7546,7,37,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7547,7,38,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7548,7,39,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7549,7,40,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7550,7,41,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7551,7,42,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7552,7,43,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7553,7,44,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7554,7,45,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7555,7,46,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7556,7,47,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7557,7,49,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7558,7,50,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7559,7,51,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7560,7,52,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7561,7,53,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7562,7,54,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7563,7,55,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7564,7,56,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7565,7,57,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7566,7,58,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7567,7,59,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7568,7,60,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7569,7,61,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7570,7,62,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7571,7,63,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7572,7,64,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7573,7,65,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7574,7,66,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7575,7,67,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7576,7,68,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7577,7,69,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7578,7,70,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7579,7,71,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7580,7,72,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7581,7,73,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7582,7,74,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7583,7,75,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7584,7,76,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7585,7,77,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7586,7,78,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7587,7,79,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7588,7,80,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7589,7,81,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7590,7,82,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7591,7,83,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7592,7,84,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7593,7,85,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7594,7,86,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7595,7,87,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7596,7,88,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7597,7,89,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7598,7,90,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7599,7,91,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7600,7,92,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7601,7,93,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7602,7,94,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7603,7,95,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7604,7,96,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7605,7,97,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7606,7,98,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7607,7,99,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7608,7,100,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7609,7,101,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7610,7,102,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7611,7,103,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7612,7,104,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7613,7,105,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7614,7,106,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7615,7,107,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7616,7,108,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7617,7,109,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7618,7,110,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7619,7,111,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7620,7,112,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7621,7,113,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7622,7,114,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7623,7,115,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7624,7,116,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7625,7,117,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7626,7,118,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7627,7,119,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7628,7,120,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7629,7,121,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7630,7,122,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7631,7,123,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7632,7,124,1,1,1,1,1,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7633,7,125,0,0,1,0,0,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7634,7,126,0,0,1,0,0,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7635,7,127,0,0,1,0,0,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7636,7,128,0,0,1,0,0,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7637,7,129,0,0,1,0,0,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(7638,7,130,0,0,1,0,0,1,1,'2021-05-26 00:08:55','2021-05-26 00:08:55'),(10628,23,1,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10629,23,2,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10630,23,3,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10631,23,4,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10632,23,5,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10633,23,6,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10634,23,7,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10635,23,8,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10636,23,9,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10637,23,10,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10638,23,11,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10639,23,12,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10640,23,13,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10641,23,14,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10642,23,15,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10643,23,16,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10644,23,17,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10645,23,18,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10646,23,19,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10647,23,20,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10648,23,21,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10649,23,22,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10650,23,23,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10651,23,24,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10652,23,25,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10653,23,26,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10654,23,27,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10655,23,28,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10656,23,29,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10657,23,30,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10658,23,31,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10659,23,32,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10660,23,33,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10661,23,34,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10662,23,35,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10663,23,36,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10664,23,37,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10665,23,38,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10666,23,39,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10667,23,40,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10668,23,41,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10669,23,42,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10670,23,43,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10671,23,44,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10672,23,45,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10673,23,46,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10674,23,47,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10675,23,49,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10676,23,50,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10677,23,51,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10678,23,52,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10679,23,53,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10680,23,54,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10681,23,55,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10682,23,56,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10683,23,57,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10684,23,58,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10685,23,59,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10686,23,60,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10687,23,61,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10688,23,62,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10689,23,63,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10690,23,64,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10691,23,65,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10692,23,66,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10693,23,67,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10694,23,68,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10695,23,69,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10696,23,70,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10697,23,71,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10698,23,72,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10699,23,73,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10700,23,74,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10701,23,75,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10702,23,76,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10703,23,77,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10704,23,78,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10705,23,79,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10706,23,80,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10707,23,81,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10708,23,82,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10709,23,83,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10710,23,84,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10711,23,85,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10712,23,86,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10713,23,87,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10714,23,88,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10715,23,89,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10716,23,90,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10717,23,91,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10718,23,92,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10719,23,93,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10720,23,94,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10721,23,95,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10722,23,96,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10723,23,97,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10724,23,98,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10725,23,99,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10726,23,100,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10727,23,101,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10728,23,102,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10729,23,103,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10730,23,104,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10731,23,105,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10732,23,106,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10733,23,107,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10734,23,108,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10735,23,109,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10736,23,110,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10737,23,111,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10738,23,112,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10739,23,113,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10740,23,114,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10741,23,115,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10742,23,116,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10743,23,117,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10744,23,118,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10745,23,119,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10746,23,120,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10747,23,121,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10748,23,122,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10749,23,123,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10750,23,124,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10751,23,125,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10752,23,126,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10753,23,127,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10754,23,128,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10755,23,129,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10756,23,130,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(10757,23,131,0,0,1,0,0,1,1,'2021-06-03 02:58:03','2021-06-03 02:58:03'),(11278,8,1,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11279,8,2,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11280,8,3,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11281,8,4,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11282,8,5,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11283,8,6,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11284,8,7,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11285,8,8,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11286,8,9,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11287,8,10,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11288,8,11,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11289,8,12,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11290,8,13,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11291,8,14,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11292,8,15,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11293,8,16,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11294,8,17,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11295,8,18,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11296,8,19,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11297,8,20,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11298,8,21,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11299,8,22,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11300,8,23,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11301,8,24,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11302,8,25,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11303,8,26,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11304,8,27,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11305,8,28,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11306,8,29,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11307,8,30,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11308,8,31,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11309,8,32,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11310,8,33,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11311,8,34,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11312,8,35,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11313,8,36,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11314,8,37,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11315,8,38,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11316,8,39,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11317,8,40,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11318,8,41,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11319,8,42,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11320,8,43,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11321,8,44,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11322,8,45,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11323,8,46,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11324,8,47,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11325,8,49,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11326,8,50,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11327,8,51,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11328,8,52,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11329,8,53,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11330,8,54,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11331,8,55,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11332,8,56,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11333,8,57,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11334,8,58,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11335,8,59,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11336,8,60,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11337,8,61,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11338,8,62,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11339,8,63,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11340,8,64,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11341,8,65,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11342,8,66,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11343,8,67,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11344,8,68,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11345,8,69,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11346,8,70,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11347,8,71,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11348,8,72,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11349,8,73,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11350,8,74,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11351,8,75,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11352,8,76,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11353,8,77,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11354,8,78,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11355,8,79,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11356,8,80,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11357,8,81,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11358,8,82,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11359,8,83,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11360,8,84,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11361,8,85,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11362,8,86,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11363,8,87,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11364,8,88,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11365,8,89,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11366,8,90,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11367,8,91,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11368,8,92,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11369,8,93,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11370,8,94,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11371,8,95,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11372,8,96,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11373,8,97,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11374,8,98,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11375,8,99,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11376,8,100,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11377,8,101,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11378,8,102,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11379,8,103,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11380,8,104,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11381,8,105,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11382,8,106,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11383,8,107,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11384,8,108,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11385,8,109,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11386,8,110,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11387,8,111,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11388,8,112,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11389,8,113,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11390,8,114,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11391,8,115,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11392,8,116,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11393,8,117,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11394,8,118,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11395,8,119,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11396,8,120,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11397,8,121,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11398,8,122,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11399,8,123,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11400,8,124,1,1,1,1,1,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11401,8,125,0,0,1,0,0,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11402,8,126,0,0,1,0,0,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11403,8,127,0,0,1,0,0,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11404,8,128,0,0,1,0,0,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11405,8,129,0,0,1,0,0,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11406,8,130,0,0,1,0,0,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11407,8,131,0,0,1,0,0,1,1,'2021-06-10 01:53:45','2021-06-10 01:53:45'),(11668,1,1,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11669,1,2,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11670,1,3,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11671,1,4,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11672,1,5,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11673,1,6,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11674,1,7,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11675,1,8,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11676,1,9,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11677,1,10,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11678,1,11,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11679,1,12,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11680,1,13,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11681,1,14,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11682,1,15,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11683,1,16,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11684,1,17,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11685,1,18,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11686,1,19,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11687,1,20,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11688,1,21,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11689,1,22,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11690,1,23,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11691,1,24,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11692,1,25,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11693,1,26,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11694,1,27,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11695,1,28,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11696,1,29,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11697,1,30,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11698,1,31,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11699,1,32,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11700,1,33,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11701,1,34,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11702,1,35,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11703,1,36,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11704,1,37,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11705,1,38,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11706,1,39,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11707,1,40,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11708,1,41,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11709,1,42,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11710,1,43,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11711,1,44,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11712,1,45,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11713,1,46,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11714,1,47,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11715,1,49,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11716,1,50,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11717,1,51,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11718,1,52,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11719,1,53,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11720,1,54,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11721,1,55,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11722,1,56,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11723,1,57,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11724,1,58,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11725,1,59,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11726,1,60,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11727,1,61,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11728,1,62,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11729,1,63,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11730,1,64,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11731,1,65,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11732,1,66,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11733,1,67,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11734,1,68,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11735,1,69,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11736,1,70,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11737,1,71,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11738,1,72,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11739,1,73,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11740,1,74,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11741,1,75,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11742,1,76,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11743,1,77,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11744,1,78,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11745,1,79,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11746,1,80,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11747,1,81,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11748,1,82,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11749,1,83,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11750,1,84,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11751,1,85,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11752,1,86,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11753,1,87,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11754,1,88,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11755,1,89,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11756,1,90,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11757,1,91,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11758,1,92,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11759,1,93,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11760,1,94,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11761,1,95,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11762,1,96,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11763,1,97,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11764,1,98,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11765,1,99,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11766,1,100,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11767,1,101,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11768,1,102,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11769,1,103,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11770,1,104,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11771,1,105,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11772,1,106,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11773,1,107,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11774,1,108,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11775,1,109,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11776,1,110,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11777,1,111,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11778,1,112,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11779,1,114,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11780,1,115,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11781,1,116,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11782,1,117,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11783,1,118,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11784,1,119,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11785,1,120,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11786,1,121,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11787,1,122,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11788,1,123,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11789,1,124,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11790,1,125,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11791,1,126,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11792,1,127,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11793,1,128,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11794,1,129,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11795,1,130,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11796,1,131,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11797,1,132,1,1,1,1,1,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11798,1,133,0,0,1,0,0,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(11799,1,134,0,0,1,0,0,1,1,'2021-06-18 06:13:55','2021-06-18 06:13:55'),(12064,4,1,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12065,4,2,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12066,4,3,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12067,4,4,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12068,4,5,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12069,4,6,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12070,4,7,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12071,4,8,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12072,4,9,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12073,4,10,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12074,4,11,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12075,4,12,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12076,4,13,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12077,4,14,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12078,4,15,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12079,4,16,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12080,4,17,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12081,4,18,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12082,4,19,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12083,4,20,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12084,4,21,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12085,4,22,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12086,4,23,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12087,4,24,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12088,4,25,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12089,4,26,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12090,4,27,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12091,4,28,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12092,4,29,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12093,4,30,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12094,4,31,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12095,4,32,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12096,4,33,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12097,4,34,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12098,4,35,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12099,4,36,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12100,4,37,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12101,4,38,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12102,4,39,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12103,4,40,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12104,4,41,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12105,4,42,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12106,4,43,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12107,4,44,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12108,4,45,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12109,4,46,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12110,4,47,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12111,4,49,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12112,4,50,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12113,4,51,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12114,4,52,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12115,4,53,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12116,4,54,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12117,4,55,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12118,4,56,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12119,4,57,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12120,4,58,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12121,4,59,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12122,4,60,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12123,4,61,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12124,4,62,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12125,4,63,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12126,4,64,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12127,4,65,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12128,4,66,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12129,4,67,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12130,4,68,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12131,4,69,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12132,4,70,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12133,4,71,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12134,4,72,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12135,4,73,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12136,4,74,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12137,4,75,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12138,4,76,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12139,4,77,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12140,4,78,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12141,4,79,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12142,4,80,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12143,4,81,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12144,4,82,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12145,4,83,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12146,4,84,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12147,4,85,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12148,4,86,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12149,4,87,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12150,4,88,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12151,4,89,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12152,4,90,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12153,4,91,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12154,4,92,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12155,4,93,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12156,4,94,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12157,4,95,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12158,4,96,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12159,4,97,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12160,4,98,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12161,4,99,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12162,4,100,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12163,4,101,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12164,4,102,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12165,4,103,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12166,4,104,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12167,4,105,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12168,4,106,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12169,4,107,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12170,4,108,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12171,4,109,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12172,4,110,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12173,4,111,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12174,4,112,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12175,4,114,0,0,1,0,0,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12176,4,115,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12177,4,116,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12178,4,117,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12179,4,118,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12180,4,119,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12181,4,120,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12182,4,121,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12183,4,122,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12184,4,123,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12185,4,124,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12186,4,125,0,0,1,0,0,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12187,4,126,0,0,1,0,0,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12188,4,127,0,0,1,0,0,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12189,4,128,0,0,1,0,0,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12190,4,129,0,0,1,0,0,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12191,4,130,0,0,1,0,0,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12192,4,131,0,0,1,0,0,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12193,4,132,1,1,1,1,1,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12194,4,133,0,0,1,0,0,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12195,4,134,0,0,1,0,0,1,1,'2021-06-23 07:28:06','2021-06-23 07:28:06'),(12196,5,1,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12197,5,2,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12198,5,3,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12199,5,4,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12200,5,5,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12201,5,6,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12202,5,7,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12203,5,8,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12204,5,9,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12205,5,10,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12206,5,11,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12207,5,12,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12208,5,13,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12209,5,14,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12210,5,15,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12211,5,16,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12212,5,17,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12213,5,18,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12214,5,19,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12215,5,20,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12216,5,21,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12217,5,22,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12218,5,23,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12219,5,24,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12220,5,25,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12221,5,26,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12222,5,27,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12223,5,28,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12224,5,29,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12225,5,30,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12226,5,31,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12227,5,32,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12228,5,33,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12229,5,34,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12230,5,35,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12231,5,36,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12232,5,37,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12233,5,38,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12234,5,39,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12235,5,40,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12236,5,41,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12237,5,42,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12238,5,43,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12239,5,44,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12240,5,45,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12241,5,46,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12242,5,47,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12243,5,49,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12244,5,50,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12245,5,51,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12246,5,52,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12247,5,53,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12248,5,54,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12249,5,55,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12250,5,56,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12251,5,57,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12252,5,58,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12253,5,59,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12254,5,60,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12255,5,61,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12256,5,62,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12257,5,63,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12258,5,64,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12259,5,65,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12260,5,66,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12261,5,67,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12262,5,68,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12263,5,69,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12264,5,70,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12265,5,71,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12266,5,72,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12267,5,73,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12268,5,74,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12269,5,75,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12270,5,76,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12271,5,77,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12272,5,78,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12273,5,79,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12274,5,80,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12275,5,81,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12276,5,82,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12277,5,83,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12278,5,84,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12279,5,85,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12280,5,86,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12281,5,87,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12282,5,88,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12283,5,89,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12284,5,90,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12285,5,91,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12286,5,92,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12287,5,93,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12288,5,94,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12289,5,95,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12290,5,96,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12291,5,97,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12292,5,98,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12293,5,99,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12294,5,100,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12295,5,101,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12296,5,102,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12297,5,103,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12298,5,104,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12299,5,105,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12300,5,106,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12301,5,107,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12302,5,108,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12303,5,109,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12304,5,110,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12305,5,111,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12306,5,112,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12307,5,114,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12308,5,115,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12309,5,116,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12310,5,117,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12311,5,118,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12312,5,119,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12313,5,120,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12314,5,121,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12315,5,122,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12316,5,123,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12317,5,124,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12318,5,125,0,0,1,0,0,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12319,5,126,0,0,1,0,0,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12320,5,127,0,0,1,0,0,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12321,5,128,0,0,1,0,0,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12322,5,129,0,0,1,0,0,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12323,5,130,0,0,1,0,0,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12324,5,131,0,0,1,0,0,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12325,5,132,1,1,1,1,1,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12326,5,133,0,0,1,0,0,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12327,5,134,0,0,1,0,0,1,1,'2021-06-23 07:28:41','2021-06-23 07:28:41'),(12328,9,1,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12329,9,2,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12330,9,3,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12331,9,4,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12332,9,5,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12333,9,6,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12334,9,7,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12335,9,8,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12336,9,9,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12337,9,10,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12338,9,11,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12339,9,12,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12340,9,13,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12341,9,14,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12342,9,15,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12343,9,16,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12344,9,17,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12345,9,18,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12346,9,19,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12347,9,20,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12348,9,21,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12349,9,22,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12350,9,23,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12351,9,24,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12352,9,25,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12353,9,26,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12354,9,27,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12355,9,28,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12356,9,29,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12357,9,30,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12358,9,31,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12359,9,32,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12360,9,33,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12361,9,34,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12362,9,35,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12363,9,36,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12364,9,37,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12365,9,38,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12366,9,39,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12367,9,40,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12368,9,41,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12369,9,42,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12370,9,43,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12371,9,44,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12372,9,45,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12373,9,46,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12374,9,47,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12375,9,49,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12376,9,50,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12377,9,51,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12378,9,52,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12379,9,53,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12380,9,54,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12381,9,55,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12382,9,56,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12383,9,57,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12384,9,58,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12385,9,59,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12386,9,60,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12387,9,61,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12388,9,62,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12389,9,63,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12390,9,64,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12391,9,65,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12392,9,66,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12393,9,67,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12394,9,68,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12395,9,69,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12396,9,70,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12397,9,71,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12398,9,72,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12399,9,73,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12400,9,75,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12401,9,76,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12402,9,77,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12403,9,78,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12404,9,79,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12405,9,80,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12406,9,81,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12407,9,82,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12408,9,83,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12409,9,84,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12410,9,85,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12411,9,86,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12412,9,87,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12413,9,88,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12414,9,89,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12415,9,90,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12416,9,91,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12417,9,92,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12418,9,93,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12419,9,94,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12420,9,95,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12421,9,96,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12422,9,97,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12423,9,98,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12424,9,99,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12425,9,100,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12426,9,101,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12427,9,102,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12428,9,103,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12429,9,104,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12430,9,105,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12431,9,106,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12432,9,107,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12433,9,108,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12434,9,109,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12435,9,110,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12436,9,111,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12437,9,112,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12438,9,114,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12439,9,115,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12440,9,116,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12441,9,117,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12442,9,118,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12443,9,119,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12444,9,120,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12445,9,121,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12446,9,122,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12447,9,123,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12448,9,124,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12449,9,125,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12450,9,126,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12451,9,127,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12452,9,128,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12453,9,129,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12454,9,130,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12455,9,131,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12456,9,132,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12457,9,133,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12458,9,134,0,0,1,0,0,1,1,'2021-06-30 03:05:09','2021-06-30 03:05:09'),(12590,3,1,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12591,3,2,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12592,3,3,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12593,3,4,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12594,3,5,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12595,3,6,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12596,3,7,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12597,3,8,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12598,3,9,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12599,3,10,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12600,3,11,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12601,3,12,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12602,3,13,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12603,3,14,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12604,3,15,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12605,3,16,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12606,3,17,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12607,3,18,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12608,3,19,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12609,3,20,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12610,3,21,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12611,3,22,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12612,3,23,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12613,3,24,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12614,3,25,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12615,3,26,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12616,3,27,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12617,3,28,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12618,3,29,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12619,3,30,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12620,3,31,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12621,3,32,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12622,3,33,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12623,3,34,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12624,3,35,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12625,3,36,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12626,3,37,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12627,3,38,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12628,3,39,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12629,3,40,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12630,3,41,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12631,3,42,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12632,3,43,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12633,3,44,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12634,3,45,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12635,3,46,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12636,3,47,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12637,3,49,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12638,3,50,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12639,3,51,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12640,3,52,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12641,3,53,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12642,3,54,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12643,3,55,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12644,3,56,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12645,3,57,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12646,3,58,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12647,3,59,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12648,3,60,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12649,3,61,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12650,3,62,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12651,3,63,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12652,3,64,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12653,3,65,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12654,3,66,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12655,3,67,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12656,3,68,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12657,3,69,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12658,3,70,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12659,3,71,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12660,3,72,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12661,3,73,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12662,3,75,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12663,3,76,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12664,3,77,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12665,3,78,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12666,3,79,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12667,3,80,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12668,3,81,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12669,3,82,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12670,3,83,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12671,3,84,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12672,3,85,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12673,3,86,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12674,3,87,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12675,3,88,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12676,3,89,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12677,3,90,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12678,3,91,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12679,3,92,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12680,3,93,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12681,3,94,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12682,3,95,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12683,3,96,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12684,3,97,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12685,3,98,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12686,3,99,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12687,3,100,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12688,3,101,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12689,3,102,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12690,3,103,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12691,3,104,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12692,3,105,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12693,3,106,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12694,3,107,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12695,3,108,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12696,3,109,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12697,3,110,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12698,3,111,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12699,3,112,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12700,3,114,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12701,3,115,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12702,3,116,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12703,3,117,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12704,3,118,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12705,3,119,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12706,3,120,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12707,3,121,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12708,3,122,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12709,3,123,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12710,3,124,1,1,1,1,1,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12711,3,125,0,0,1,0,0,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12712,3,126,0,0,1,0,0,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12713,3,127,0,0,1,0,0,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12714,3,128,0,0,1,0,0,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12715,3,129,0,0,1,0,0,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12716,3,130,0,0,1,0,0,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12717,3,131,0,0,1,0,0,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12718,3,132,0,0,1,0,0,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12719,3,133,0,0,1,0,0,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12720,3,134,0,0,1,0,0,1,1,'2021-07-05 07:00:59','2021-07-05 07:00:59'),(12852,20,1,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12853,20,2,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12854,20,3,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12855,20,4,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12856,20,5,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12857,20,6,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12858,20,7,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12859,20,8,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12860,20,9,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12861,20,10,1,1,1,1,0,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12862,20,11,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12863,20,12,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12864,20,13,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12865,20,14,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12866,20,15,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12867,20,16,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12868,20,17,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12869,20,18,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12870,20,19,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12871,20,20,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12872,20,21,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12873,20,22,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12874,20,23,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12875,20,24,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12876,20,25,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12877,20,26,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12878,20,27,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12879,20,28,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12880,20,29,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12881,20,30,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12882,20,31,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12883,20,32,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12884,20,33,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12885,20,34,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12886,20,35,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12887,20,36,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12888,20,37,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12889,20,38,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12890,20,39,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12891,20,40,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12892,20,41,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12893,20,42,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12894,20,43,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12895,20,44,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12896,20,45,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12897,20,46,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12898,20,47,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12899,20,49,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12900,20,50,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12901,20,51,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12902,20,52,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12903,20,53,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12904,20,54,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12905,20,55,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12906,20,56,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12907,20,57,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12908,20,58,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12909,20,59,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12910,20,60,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12911,20,61,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12912,20,62,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12913,20,63,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12914,20,64,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12915,20,65,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12916,20,66,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12917,20,67,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12918,20,68,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12919,20,69,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12920,20,70,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12921,20,71,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12922,20,72,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12923,20,73,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12924,20,75,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12925,20,76,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12926,20,77,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12927,20,78,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12928,20,79,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12929,20,80,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12930,20,81,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12931,20,82,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12932,20,83,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12933,20,84,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12934,20,85,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12935,20,86,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12936,20,87,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12937,20,88,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12938,20,89,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12939,20,90,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12940,20,91,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12941,20,92,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12942,20,93,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12943,20,94,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12944,20,95,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12945,20,96,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12946,20,97,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12947,20,98,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12948,20,99,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12949,20,100,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12950,20,101,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12951,20,102,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12952,20,103,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12953,20,104,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12954,20,105,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12955,20,106,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12956,20,107,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12957,20,108,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12958,20,109,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12959,20,110,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12960,20,111,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12961,20,112,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12962,20,114,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12963,20,115,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12964,20,116,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12965,20,117,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12966,20,118,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12967,20,119,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12968,20,120,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12969,20,121,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12970,20,122,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12971,20,123,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12972,20,124,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12973,20,125,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12974,20,126,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12975,20,127,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12976,20,128,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12977,20,129,1,1,1,1,1,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12978,20,130,0,0,1,0,0,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12979,20,131,0,0,1,0,0,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12980,20,132,0,0,1,0,0,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12981,20,133,0,0,1,0,0,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(12982,20,134,0,0,1,0,0,1,1,'2021-07-05 08:06:46','2021-07-05 08:06:46'),(13245,2,1,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13246,2,2,1,1,0,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13247,2,3,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13248,2,4,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13249,2,5,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13250,2,6,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13251,2,7,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13252,2,8,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13253,2,9,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13254,2,10,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13255,2,11,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13256,2,12,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13257,2,13,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13258,2,14,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13259,2,15,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13260,2,16,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13261,2,17,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13262,2,18,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13263,2,19,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13264,2,20,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13265,2,21,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13266,2,22,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13267,2,23,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13268,2,24,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13269,2,25,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13270,2,26,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13271,2,27,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13272,2,28,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13273,2,29,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13274,2,30,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13275,2,31,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13276,2,32,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13277,2,33,0,0,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13278,2,34,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13279,2,35,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13280,2,36,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13281,2,37,0,0,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13282,2,38,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13283,2,39,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13284,2,40,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13285,2,41,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13286,2,42,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13287,2,43,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13288,2,44,0,0,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13289,2,45,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13290,2,46,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13291,2,47,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13292,2,49,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13293,2,50,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13294,2,51,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13295,2,52,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13296,2,53,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13297,2,54,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13298,2,55,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13299,2,56,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13300,2,57,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13301,2,58,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13302,2,59,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13303,2,60,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13304,2,61,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13305,2,62,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13306,2,63,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13307,2,64,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13308,2,65,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13309,2,66,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13310,2,67,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13311,2,68,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13312,2,69,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13313,2,70,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13314,2,71,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13315,2,72,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13316,2,73,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13317,2,75,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13318,2,76,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13319,2,77,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13320,2,78,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13321,2,79,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13322,2,80,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13323,2,81,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13324,2,82,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13325,2,83,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13326,2,84,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13327,2,85,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13328,2,86,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13329,2,87,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13330,2,88,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13331,2,89,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13332,2,90,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13333,2,91,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13334,2,92,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13335,2,93,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13336,2,94,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13337,2,95,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13338,2,96,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13339,2,97,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13340,2,98,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13341,2,99,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13342,2,100,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13343,2,101,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13344,2,102,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13345,2,103,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13346,2,104,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13347,2,105,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13348,2,106,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13349,2,107,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13350,2,108,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13351,2,109,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13352,2,110,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13353,2,111,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13354,2,112,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13355,2,114,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13356,2,115,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13357,2,116,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13358,2,117,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13359,2,118,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13360,2,119,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13361,2,120,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13362,2,121,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13363,2,122,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13364,2,123,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13365,2,124,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13366,2,125,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13367,2,126,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13368,2,127,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13369,2,128,0,0,1,0,0,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13370,2,129,0,0,1,0,0,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13371,2,130,0,0,1,0,0,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13372,2,131,0,0,1,0,0,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13373,2,132,1,1,1,1,1,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13374,2,133,0,0,1,0,0,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13375,2,134,0,0,1,0,0,1,1,'2021-07-06 07:51:06','2021-07-06 07:51:06'),(13376,6,1,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13377,6,2,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13378,6,3,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13379,6,4,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13380,6,5,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13381,6,6,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13382,6,7,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13383,6,8,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13384,6,9,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13385,6,10,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13386,6,11,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13387,6,12,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13388,6,13,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13389,6,14,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13390,6,15,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13391,6,16,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13392,6,17,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13393,6,18,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13394,6,19,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13395,6,20,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13396,6,21,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13397,6,22,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13398,6,23,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13399,6,24,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13400,6,25,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13401,6,26,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13402,6,27,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13403,6,28,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13404,6,29,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13405,6,30,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13406,6,31,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13407,6,32,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13408,6,33,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13409,6,34,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13410,6,35,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13411,6,36,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13412,6,37,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13413,6,38,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13414,6,39,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13415,6,40,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13416,6,41,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13417,6,42,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13418,6,43,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13419,6,44,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13420,6,45,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13421,6,46,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13422,6,47,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13423,6,49,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13424,6,50,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13425,6,51,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13426,6,52,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13427,6,53,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13428,6,54,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13429,6,55,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13430,6,56,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13431,6,57,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13432,6,58,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13433,6,59,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13434,6,60,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13435,6,61,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13436,6,62,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13437,6,63,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13438,6,64,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13439,6,65,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13440,6,66,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13441,6,67,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13442,6,68,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13443,6,69,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13444,6,70,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13445,6,71,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13446,6,72,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13447,6,73,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13448,6,75,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13449,6,76,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13450,6,77,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13451,6,78,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13452,6,79,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13453,6,80,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13454,6,81,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13455,6,82,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13456,6,83,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13457,6,84,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13458,6,85,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13459,6,86,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13460,6,87,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13461,6,88,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13462,6,89,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13463,6,90,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13464,6,91,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13465,6,92,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13466,6,93,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13467,6,94,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13468,6,95,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13469,6,96,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13470,6,97,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13471,6,98,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13472,6,99,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13473,6,100,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13474,6,101,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13475,6,102,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13476,6,103,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13477,6,104,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13478,6,105,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13479,6,106,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13480,6,107,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13481,6,108,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13482,6,109,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13483,6,110,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13484,6,111,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13485,6,112,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13486,6,114,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13487,6,115,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13488,6,116,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13489,6,117,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13490,6,118,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13491,6,119,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13492,6,120,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13493,6,121,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13494,6,122,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13495,6,123,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13496,6,124,1,1,1,1,1,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13497,6,125,0,0,1,0,0,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13498,6,126,0,0,1,0,0,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13499,6,127,0,0,1,0,0,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13500,6,128,0,0,1,0,0,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13501,6,129,0,0,1,0,0,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13502,6,130,0,0,0,0,0,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13503,6,131,0,0,0,0,0,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13504,6,132,0,0,0,0,0,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13505,6,133,0,0,0,0,0,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19'),(13506,6,134,0,0,0,0,0,1,1,'2021-07-07 08:31:19','2021-07-07 08:31:19');
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
-- Table structure for table `hris_examination_choices_tbl`
--

DROP TABLE IF EXISTS `hris_examination_choices_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_examination_choices_tbl` (
  `examinationChoicesID` bigint(21) NOT NULL AUTO_INCREMENT,
  `examinationID` bigint(21) NOT NULL,
  `examinationQaID` bigint(21) NOT NULL,
  `keyID` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`examinationChoicesID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_examination_choices_tbl`
--

LOCK TABLES `hris_examination_choices_tbl` WRITE;
/*!40000 ALTER TABLE `hris_examination_choices_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_examination_choices_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_examination_qa_tbl`
--

DROP TABLE IF EXISTS `hris_examination_qa_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_examination_qa_tbl` (
  `examinationQaID` bigint(21) NOT NULL AUTO_INCREMENT,
  `examinationID` bigint(21) NOT NULL,
  `examinationType` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `question` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `points` decimal(10,2) DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`examinationQaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_examination_qa_tbl`
--

LOCK TABLES `hris_examination_qa_tbl` WRITE;
/*!40000 ALTER TABLE `hris_examination_qa_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_examination_qa_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_examination_setup_tbl`
--

DROP TABLE IF EXISTS `hris_examination_setup_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_examination_setup_tbl` (
  `examSetupID` bigint(20) NOT NULL AUTO_INCREMENT,
  `examinationID` bigint(20) NOT NULL,
  `designationID` bigint(20) NOT NULL,
  `timeLimit` time NOT NULL,
  `percentage` decimal(10,2) NOT NULL,
  `createdBy` bigint(20) DEFAULT NULL,
  `updatedBy` bigint(20) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`examSetupID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_examination_setup_tbl`
--

LOCK TABLES `hris_examination_setup_tbl` WRITE;
/*!40000 ALTER TABLE `hris_examination_setup_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_examination_setup_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_examination_tbl`
--

DROP TABLE IF EXISTS `hris_examination_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_examination_tbl` (
  `examinationID` bigint(21) NOT NULL AUTO_INCREMENT,
  `examinationName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `examinationDescription` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `examinationType` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `examinationPicture` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `examinationStatus` int(11) DEFAULT NULL,
  `examinationPoints` decimal(15,2) DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`examinationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_examination_tbl`
--

LOCK TABLES `hris_examination_tbl` WRITE;
/*!40000 ALTER TABLE `hris_examination_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_examination_tbl` ENABLE KEYS */;
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
  `requisitionID` bigint(20) NOT NULL,
  `requisitionCode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jobDescription` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `jobBenefits` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `jobSlot` int(50) NOT NULL,
  `jobStatus` int(50) NOT NULL,
  `datecreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  PRIMARY KEY (`jobID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_job_posting_tbl`
--

LOCK TABLES `hris_job_posting_tbl` WRITE;
/*!40000 ALTER TABLE `hris_job_posting_tbl` DISABLE KEYS */;
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
  `reviseLeaveRequestID` bigint(21) DEFAULT NULL,
  `leaveRequestCode` varchar(100) NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `leaveRequestDate` varchar(255) NOT NULL,
  `leaveRequestDateFrom` date NOT NULL,
  `leaveRequestDateTo` date NOT NULL,
  `leaveRequestNumberOfDate` bigint(20) NOT NULL,
  `leaveID` bigint(20) NOT NULL,
  `leaveName` varchar(100) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_leave_request_tbl`
--

LOCK TABLES `hris_leave_request_tbl` WRITE;
/*!40000 ALTER TABLE `hris_leave_request_tbl` DISABLE KEYS */;
INSERT INTO `hris_leave_request_tbl` VALUES (1,NULL,'',1,'July 30, 2021 - July 30, 2021','2021-07-30','2021-07-30',1,1,'Sick Leave',55,'Test','4|2|6','2|3|2','2021-07-08 08:26:40|2021-07-08 08:29:02|2021-07-08 08:33:31',2,'Rejected','2021-07-08 00:30:22',1,6,'2021-07-07 23:45:39','2021-07-08 00:33:32'),(2,NULL,'',1,'July 13, 2021 - July 19, 2021','2021-07-13','2021-07-19',7,1,'Sick Leave',55,'Reasons','4|2|6','3','2021-07-08 08:28:22',3,'Denied','2021-07-07 23:49:31',1,4,'2021-07-07 23:49:31','2021-07-08 00:28:24'),(3,NULL,'',1,'July 13, 2021 - July 16, 2021','2021-07-13','2021-07-16',4,2,'Vacation Leave',4,'ressss','4|2|6',NULL,NULL,4,NULL,'2021-07-07 23:51:21',1,1,'2021-07-07 23:50:12','2021-07-08 00:26:16'),(4,NULL,'',1,'August 30, 2021 - August 30, 2021','2021-08-30','2021-08-30',1,3,'Emergency Leave',10,'ressss','4|2|6','2|2|3','2021-07-08 08:26:46|2021-07-08 08:28:51|2021-07-08 08:33:25',3,'Rejected','2021-07-08 00:34:16',1,1,'2021-07-07 23:50:28','2021-07-08 00:35:34'),(5,NULL,'',1,'July 30, 2021 - July 30, 2021','2021-07-30','2021-07-30',1,2,'Vacation Leave',4,'test',NULL,NULL,NULL,4,NULL,NULL,1,1,'2021-07-08 00:21:36','2021-07-08 01:17:17'),(6,4,'',1,'August 11, 2021 - August 12, 2021','2021-08-11','2021-08-12',2,3,'Emergency Leave',10,'ressss',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-07-08 00:41:03','2021-07-08 00:41:05'),(7,2,'',1,'July 13, 2021 - July 19, 2021','2021-07-13','2021-07-19',7,1,'Sick Leave',55,'Reasons',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-07-08 01:26:44','2021-07-08 01:26:45');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_loan_form_tbl`
--

LOCK TABLES `hris_loan_form_tbl` WRITE;
/*!40000 ALTER TABLE `hris_loan_form_tbl` DISABLE KEYS */;
INSERT INTO `hris_loan_form_tbl` VALUES (1,NULL,'',1,3,1,'May 26, 2021 - September 26, 2021',0,1.00,7000.00,56.91,'','','',4,'',NULL,1,1,'2021-05-26 15:13:43','2021-05-26 07:14:00'),(2,NULL,'',1,2,1,'May 27, 2021 - October 26, 2021',0,1.00,9000.00,118.42,'2|3|4','2|2|2','2021-05-26 15:25:33|2021-05-26 15:26:20|2021-05-26 15:26:58',5,'','2021-05-26 15:23:14',1,1,'2021-05-26 15:16:11','2021-05-27 07:44:06'),(3,NULL,'',1,1,1,'May 27, 2021 - May 27, 2021',0,0.50,25000.00,0.00,'2|3|4','','',4,'','2021-05-27 15:34:45',1,1,'2021-05-27 15:34:45','2021-05-27 07:35:02'),(4,NULL,'',1,4,1,'June 3, 2021 - May 27, 2021',0,5.00,250000.00,0.00,'2|3|4','2|2|2','2021-06-01 11:38:29|2021-06-01 11:46:38|2021-06-03 11:11:01',2,'','2021-05-27 15:39:39',1,4,'2021-05-27 15:35:37','2021-06-03 03:11:02'),(5,NULL,'',1,2,1,'June 1, 2021 - June 1, 2022',0,10.00,150000.00,2260.27,'2|3|4','','',4,'','2021-05-31 11:13:56',1,1,'2021-05-31 10:09:48','2021-05-31 03:14:09'),(6,NULL,'',1,1,1,'June 2, 2021 - June 2, 2021',0,5.00,150000.00,0.00,'2|3|4','','',0,'','2021-06-02 11:02:48',1,1,'2021-06-02 11:02:48','2021-06-02 03:04:56'),(7,NULL,'',1,2,1,'June 3, 2021 - June 3, 2022',0,5.00,150000.00,6562.50,'2|3|4','2|2|2','2021-06-03 11:13:45|2021-06-03 11:15:19|2021-06-03 11:15:51',2,'','2021-06-03 11:13:03',1,4,'2021-06-03 11:13:03','2021-06-03 03:15:52');
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
INSERT INTO `hris_no_timein_timeout_tbl` VALUES (8,'',1,1,'2021-04-21','07:00:00','00:00:00','Sample no time-in','2|4|5','3','2021-07-06 14:29:38',3,'Reject','2021-04-21 08:53:49',1,2,'2021-04-21 08:53:49','2021-07-06 06:29:39'),(9,'',1,2,'2021-04-19','00:00:00','17:00:00','Sample reason for no time out','2|4|5','2','2021-07-06 14:26:49',1,NULL,'2021-04-21 08:56:32',1,2,'2021-04-21 08:56:32','2021-07-06 06:26:51'),(10,'',1,3,'2021-04-10','07:00:00','17:00:00','No Time-in/out','2|4|5',NULL,NULL,4,NULL,'2021-04-21 08:57:28',1,1,'2021-04-21 08:57:28','2021-04-21 00:59:51'),(11,'',1,2,'2021-04-08','00:00:00','00:00:00','',NULL,NULL,NULL,0,NULL,NULL,1,1,'2021-04-21 09:00:28','2021-04-21 01:00:31');
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
INSERT INTO `hris_official_business_tbl` VALUES (1,'OBF-21-00001',1,0,'','2021-04-13','08:00:00','17:00:00','TEST','','','',4,'','2021-04-13 09:25:50',1,1,'2021-04-13 08:32:04','2021-05-17 00:29:54'),(2,'OBF-21-00002',1,0,'','2021-04-13','08:00:00','17:00:00','','','','',0,'',NULL,1,1,'2021-04-13 08:33:24','2021-04-13 00:33:28'),(3,'OBF-21-00003',1,1,'2, Sample Building, Dilaguidi, Dilasag, Aurora, Philippines, 1212','2021-04-22','08:00:00','17:00:00','rererer','2|3|5','','',1,'','2021-04-13 10:07:46',1,1,'2021-04-13 10:07:46','2021-04-13 02:07:46'),(4,'OBF-21-00004',1,3,'1201, Katipunan Street, Batasan Hills, Quezon City, National Capital Region - Second District, Philippines, 1119','2021-04-20','08:00:00','17:00:00','dwa','','','',1,'','2021-04-13 10:09:07',1,1,'2021-04-13 10:08:05','2021-04-13 02:09:05'),(5,'',1,1,'2, Sample Building, Dilaguidi, Dilasag, Aurora, Philippines, 1212','2021-04-14','08:00:00','17:00:00','test','2|3|5','2|2|2','2021-04-14 08:29:33|2021-04-14 08:30:38|2021-04-14 08:31:42',2,'','2021-04-14 08:26:46',1,5,'2021-04-14 08:26:46','2021-04-14 00:31:45'),(6,'',1,0,'','2021-04-14','08:00:00','17:00:00','test','','','',0,'',NULL,1,1,'2021-04-14 09:26:56','2021-04-14 01:26:59'),(7,'',1,0,'','2021-04-14','08:00:00','17:00:00','test','','','',0,'',NULL,1,1,'2021-04-14 09:27:20','2021-04-14 01:27:22'),(8,'',1,3,'28D Eastwood Excelsior Eastwood Avenue, Eastwood City, Bagumbayan, Quezon City, National Capital Region - Second District, Philippines, 1110','2021-05-28','05:00:00','17:00:00','Test','2|3|5','2','2021-07-06 14:38:36',1,'','2021-05-17 08:31:15',1,2,'2021-04-14 09:27:29','2021-07-06 06:38:38'),(9,'',1,4,'1709, Antel Global Corporate Center, San Antonio, City Of Pasig, National Capital Region - Second District, Philippines, 1605','2021-04-21','09:00:00','17:00:00','UAT','2|3|5','','',4,'','2021-04-21 08:42:34',1,1,'2021-04-21 08:42:34','2021-04-21 00:59:20');
/*!40000 ALTER TABLE `hris_official_business_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_onboarding_progress_tbl`
--

DROP TABLE IF EXISTS `hris_onboarding_progress_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_onboarding_progress_tbl` (
  `onboardingProgressID` int(100) NOT NULL AUTO_INCREMENT,
  `employeeID` int(100) NOT NULL,
  `approvalCount` int(50) NOT NULL,
  `onboardingProgressCount` int(100) NOT NULL,
  `approvalEmployee` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`onboardingProgressID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_onboarding_progress_tbl`
--

LOCK TABLES `hris_onboarding_progress_tbl` WRITE;
/*!40000 ALTER TABLE `hris_onboarding_progress_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_onboarding_progress_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_onboarding_tbl`
--

DROP TABLE IF EXISTS `hris_onboarding_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_onboarding_tbl` (
  `onboardingID` bigint(25) unsigned NOT NULL AUTO_INCREMENT,
  `orientationID` int(11) NOT NULL,
  `employeeID` int(25) DEFAULT NULL,
  `designationID` int(50) NOT NULL,
  `approvalEmployeeID` int(50) NOT NULL,
  `onboardingDate` date NOT NULL,
  `onboardingStatus` int(20) NOT NULL,
  `createdBy` int(11) NOT NULL,
  PRIMARY KEY (`onboardingID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_onboarding_tbl`
--

LOCK TABLES `hris_onboarding_tbl` WRITE;
/*!40000 ALTER TABLE `hris_onboarding_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_onboarding_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_orientation_setup_tbl`
--

DROP TABLE IF EXISTS `hris_orientation_setup_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_orientation_setup_tbl` (
  `orientationID` bigint(11) NOT NULL AUTO_INCREMENT,
  `orientationCode` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `departmentID` bigint(11) NOT NULL,
  `designationID` int(20) NOT NULL,
  `employeeID` int(11) DEFAULT NULL,
  `employeeDesignationID` int(50) NOT NULL,
  `OrientationName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `orientationStatus` int(11) NOT NULL,
  PRIMARY KEY (`orientationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_orientation_setup_tbl`
--

LOCK TABLES `hris_orientation_setup_tbl` WRITE;
/*!40000 ALTER TABLE `hris_orientation_setup_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_orientation_setup_tbl` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_overtime_request_tbl`
--

LOCK TABLES `hris_overtime_request_tbl` WRITE;
/*!40000 ALTER TABLE `hris_overtime_request_tbl` DISABLE KEYS */;
INSERT INTO `hris_overtime_request_tbl` VALUES (1,'',1,'2021-04-14','08:00:00','17:00:00','','','','',0,'',NULL,1,1,'2021-04-14 07:57:11','2021-04-13 23:57:10'),(2,'',1,'2021-04-14','08:00:00','17:00:00','qweqweqwe','4|8|7','2','2021-07-06 14:17:13',1,'','2021-04-14 07:57:31',1,4,'2021-04-14 07:57:31','2021-07-06 06:17:14'),(3,'',1,'2021-04-14','08:00:00','17:00:00','test','','','',0,'',NULL,1,1,'2021-04-14 09:24:58','2021-04-14 01:25:00'),(4,'',1,'2021-04-14','08:00:00','17:00:00','test','','','',0,'',NULL,1,1,'2021-04-14 09:25:11','2021-04-14 01:25:13'),(5,'',1,'2021-04-15','08:00:00','17:00:00','test','4|8|7','','',1,'','2021-04-14 09:35:44',1,1,'2021-04-14 09:35:44','2021-04-14 01:35:49'),(6,'',1,'2021-04-19','08:00:00','19:00:00','OT ako','4|8|7','','',1,'','2021-04-19 16:49:45',1,1,'2021-04-19 16:49:45','2021-04-19 08:49:48'),(7,'',1,'2021-04-19','08:00:00','17:00:00','','','','',0,'',NULL,1,1,'2021-04-19 16:50:11','2021-04-19 08:50:15'),(8,'',1,'2021-06-24','08:00:00','17:00:00','','','','',0,'',NULL,1,1,'2021-06-24 13:48:17','2021-06-24 05:48:20'),(9,'',1,'2021-06-24','08:00:00','17:00:00','','','','',0,'',NULL,1,1,'2021-06-24 13:49:13','2021-06-24 05:49:15'),(10,'',1,'2021-06-30','05:00:00','18:00:00','Reason','4|8|7','','',1,'','2021-06-30 05:30:40',1,1,'2021-06-30 05:30:40','2021-06-30 05:30:42');
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
  `designationCode` text NOT NULL,
  `designation` text NOT NULL,
  `designationQuantity` decimal(10,0) NOT NULL,
  `designationTotalManHours` decimal(10,1) NOT NULL,
  `unitCost` decimal(10,2) NOT NULL,
  `totalCost` decimal(10,2) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`personnelRequestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_personnel_request_tbl`
--

LOCK TABLES `hris_personnel_request_tbl` WRITE;
/*!40000 ALTER TABLE `hris_personnel_request_tbl` DISABLE KEYS */;
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
INSERT INTO `hris_requirement_tbl` VALUES (1,'RQT-21-00001','SSS E1 Form','Official SSS registration form',1,'2021-04-15',1,1,'2021-04-15 02:54:41','0000-00-00 00:00:00'),(2,'RQT-21-00002','SSS E4 Form','Official SSS member data change form',1,'2021-04-15',1,1,'2021-04-15 02:56:22','0000-00-00 00:00:00'),(3,'RQT-21-00003','SSS List of Employment History','Official list of the SSS member\'s employment history',1,'2021-04-15',1,1,'2021-04-15 02:57:08','0000-00-00 00:00:00'),(4,'RQT-21-00004','PhilHealth ID','Official ID provided by PhilHealth to its members',1,'2021-04-15',1,1,'2021-04-15 02:57:47','0000-00-00 00:00:00'),(5,'RQT-21-00005','PhilHealth Member Data Record (MDR)','Member information provided by PhilHealth',1,'2021-04-15',1,1,'2021-04-15 02:59:23','0000-00-00 00:00:00'),(6,'RQT-21-00006','HDMF ID','Official ID provided by PAG-IBIG to its members',1,'2021-04-15',1,1,'2021-04-15 03:00:18','0000-00-00 00:00:00'),(7,'RQT-21-00007','HDMF Loyalty Card','Official loyalty card provided by PAG-IBIG to some of its members',1,'2021-04-15',1,1,'2021-04-15 03:13:43','0000-00-00 00:00:00'),(8,'RQT-21-00008','Tax Identification Number ID','Official ID provided by BIR to its members',1,'2021-04-15',1,1,'2021-04-15 03:14:58','0000-00-00 00:00:00'),(9,'RQT-21-00009','BIR Form 1902','Form accomplished by an old or new employee whether resident citizen or non-resident citizens earning purely compensation income.\nTo be filed with the RDO having jurisdiction over the taxpayer\'s residence or place of employment.',1,'2021-04-15',1,1,'2021-04-15 03:16:47','0000-00-00 00:00:00'),(10,'RQT-21-00010','BIR Form 1905','Form accomplished by all taxpayers who intend to update/change any data or information, e.g. transfer of business within the same RDO, change in registered activities, cancellation of business registration due to closure of business or transfer to other district, or replacement of lost TIN Card/ Certificate of Registration.\nTo be filed with the RDO having jurisdiction over the taxpayer, whether Head Office or branch.',1,'2021-04-15',1,1,'2021-04-15 03:17:48','0000-00-00 00:00:00'),(11,'RQT-21-00011','Certificate of Employment','Official document containing the employee\'s records from the specific company',1,'2021-04-15',1,1,'2021-04-15 03:22:08','0000-00-00 00:00:00'),(12,'RQT-21-00012','Diploma','Certificate award provided by educational establishments to an individual after completing a course or study',1,'2021-04-15',1,1,'2021-04-15 03:23:42','0000-00-00 00:00:00'),(13,'RQT-21-00013','Transcript of Records','Document provided an educational establishment containing the summary of units, credits and remarks given to an individual under the specific course or study',1,'2021-04-15',1,1,'2021-04-15 03:29:49','0000-00-00 00:00:00'),(14,'RQT-21-00014','Birth Certificate','Official record given by PSA (NSO) regarding the individual\'s birth',1,'2021-04-15',1,1,'2021-04-15 03:33:04','0000-00-00 00:00:00'),(15,'RQT-21-00015','2 Valid IDs','An individual\'s proof of Identification. Should present atleast 2 of country\'s primary and secondary IDs (ex. Passport, TIN, UMID, Driver\'s License, Postal ID, Voter\'s ID) ',1,'2021-04-15',1,1,'2021-04-15 03:35:49','0000-00-00 00:00:00'),(16,'RQT-21-00016','NBI Clearance','Government document released to an individual upon request. It certifies that the said individual, at the time of request, is not involved in any ongoing criminal cases',1,'2021-04-15',1,1,'2021-04-15 03:56:38','0000-00-00 00:00:00'),(17,'RQT-21-00017','Barangay Clearance','A document certifying that an individual is a good resident of the  barangay.',1,'2021-04-15',1,1,'2021-04-15 03:59:20','0000-00-00 00:00:00'),(18,'RQT-21-00018','Police Clearance','Document proving that an individual has no criminal or derogatory record based on the PNP database',1,'2021-04-15',1,1,'2021-04-15 04:00:32','0000-00-00 00:00:00'),(19,'RQT-21-00019','Medical Result with Drug Test','Document containing the results of all the medical examination of the individual',1,'2021-04-15',1,1,'2021-04-15 05:03:17','0000-00-00 00:00:00'),(20,'RQT-21-00020','2 pcs. 2x2 ID Picture','Photo (2 inches height, 2 inches width) of an individual wearing formal attire ',1,'2021-04-15',1,1,'2021-04-15 05:08:55','0000-00-00 00:00:00'),(21,'RQT-21-00021','2 pcs. 1x1 ID Picture','Photo (1 inch height, 1 inch width) of an individual wearing formal attire ',1,'2021-04-15',1,1,'2021-04-15 05:09:35','0000-00-00 00:00:00');
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
  `scheduleName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mondayFrom` time NOT NULL,
  `mondayTo` time NOT NULL,
  `mondayBreakDuration` decimal(10,2) DEFAULT NULL,
  `mondayStatus` int(11) NOT NULL,
  `tuesdayFrom` time NOT NULL,
  `tuesdayTo` time NOT NULL,
  `tuesdayBreakDuration` decimal(10,2) DEFAULT NULL,
  `tuesdayStatus` int(11) NOT NULL,
  `wednesdayFrom` time NOT NULL,
  `wednesdayTo` time NOT NULL,
  `wednesdayBreakDuration` decimal(10,2) DEFAULT NULL,
  `wednesdayStatus` int(11) NOT NULL,
  `thursdayFrom` time NOT NULL,
  `thursdayTo` time NOT NULL,
  `thursdayBreakDuration` decimal(10,2) DEFAULT NULL,
  `thursdayStatus` int(11) NOT NULL,
  `fridayFrom` time NOT NULL,
  `fridayTo` time NOT NULL,
  `fridayBreakDuration` decimal(10,2) DEFAULT NULL,
  `fridayStatus` int(11) NOT NULL,
  `saturdayFrom` time NOT NULL,
  `saturdayTo` time NOT NULL,
  `saturdayBreakDuration` decimal(10,2) DEFAULT NULL,
  `saturdayStatus` int(11) NOT NULL,
  `sundayFrom` time NOT NULL,
  `sundayTo` time NOT NULL,
  `sundayBreakDuration` decimal(10,2) DEFAULT NULL,
  `sundayStatus` int(11) NOT NULL,
  `scheduleStatus` int(11) NOT NULL,
  `createdBy` int(11) NOT NULL,
  `updatedBy` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`scheduleID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_schedule_setup_tbl`
--

LOCK TABLES `hris_schedule_setup_tbl` WRITE;
/*!40000 ALTER TABLE `hris_schedule_setup_tbl` DISABLE KEYS */;
INSERT INTO `hris_schedule_setup_tbl` VALUES (1,'Regular Schedule','07:00:00','16:00:00',1.00,1,'07:00:00','16:00:00',1.00,1,'08:00:00','16:00:00',1.00,1,'07:00:00','16:00:00',1.00,1,'07:00:00','16:00:00',1.00,1,'07:00:00','16:00:00',1.00,0,'07:00:00','16:00:00',0.50,0,1,0,0,'2021-04-14 19:25:39','2021-08-07 21:26:41'),(2,'ECQ Schedule','06:00:00','17:00:00',1.00,1,'06:00:00','17:00:00',1.00,1,'06:00:00','17:00:00',1.00,0,'06:00:00','17:00:00',1.00,0,'06:00:00','17:00:00',1.00,1,'08:00:00','17:00:00',1.00,0,'08:00:00','17:00:00',1.00,0,1,0,0,'2021-04-20 17:28:53','2021-08-07 21:23:50');
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
-- Table structure for table `hris_timekeeping_items_tbl`
--

DROP TABLE IF EXISTS `hris_timekeeping_items_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_timekeeping_items_tbl` (
  `timekeepingItemID` bigint(21) NOT NULL AUTO_INCREMENT,
  `timekeepingID` bigint(21) DEFAULT NULL,
  `employeeID` bigint(21) DEFAULT NULL,
  `scheduleDate` date DEFAULT NULL,
  `scheduleIn` datetime DEFAULT NULL,
  `scheduleOut` datetime DEFAULT NULL,
  `scheduleBreakDuration` decimal(10,2) DEFAULT NULL,
  `scheduleDuration` decimal(10,2) DEFAULT NULL,
  `checkIn` datetime DEFAULT NULL,
  `checkOut` datetime DEFAULT NULL,
  `noInOutID` bigint(21) DEFAULT NULL,
  `noInOutReference` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `noTimeIn` datetime DEFAULT NULL,
  `noTimeOut` datetime DEFAULT NULL,
  `overtimeID` bigint(21) DEFAULT NULL,
  `overtimeReference` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `overtimeIn` datetime DEFAULT NULL,
  `overtimeOut` datetime DEFAULT NULL,
  `overtimeBreakDuration` decimal(10,2) DEFAULT NULL,
  `leaveID` bigint(21) DEFAULT NULL,
  `leaveReference` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `leaveType` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `leaveIn` datetime DEFAULT NULL,
  `leaveOut` datetime DEFAULT NULL,
  `leaveDuration` decimal(10,2) DEFAULT NULL,
  `checkDuration` decimal(10,2) DEFAULT NULL,
  `basicHours` decimal(10,2) DEFAULT NULL,
  `overtimeHours` decimal(10,2) DEFAULT NULL,
  `nightDifferential` decimal(10,2) DEFAULT NULL,
  `totalHours` decimal(10,2) DEFAULT NULL,
  `timekeepingItemStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`timekeepingItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_timekeeping_items_tbl`
--

LOCK TABLES `hris_timekeeping_items_tbl` WRITE;
/*!40000 ALTER TABLE `hris_timekeeping_items_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_timekeeping_items_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_timekeeping_production_tbl`
--

DROP TABLE IF EXISTS `hris_timekeeping_production_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_timekeeping_production_tbl` (
  `timekeepingProductionID` bigint(21) NOT NULL AUTO_INCREMENT,
  `timekeepingID` bigint(21) DEFAULT NULL,
  `timekeepingItemID` bigint(21) DEFAULT NULL,
  `scheduleDate` date DEFAULT NULL,
  `odHours` decimal(10,2) DEFAULT NULL,
  `odOtHours` decimal(10,2) DEFAULT NULL,
  `odNsHours` decimal(10,2) DEFAULT NULL,
  `odNsOtHours` decimal(10,2) DEFAULT NULL,
  `odRdHours` decimal(10,2) DEFAULT NULL,
  `odRdOtHours` decimal(10,2) DEFAULT NULL,
  `odRdNsHours` decimal(10,2) DEFAULT NULL,
  `odRdNsOtHours` decimal(10,2) DEFAULT NULL,
  `sdRdHours` decimal(10,2) DEFAULT NULL,
  `sdRdOtHours` decimal(10,2) DEFAULT NULL,
  `sdRdNsHours` decimal(10,2) DEFAULT NULL,
  `sdRdNsOtHours` decimal(10,2) DEFAULT NULL,
  `rhRdHours` decimal(10,2) DEFAULT NULL,
  `rhRdOtHours` decimal(10,2) DEFAULT NULL,
  `rhRdNsHours` decimal(10,2) DEFAULT NULL,
  `rhRdNsOtHours` decimal(10,2) DEFAULT NULL,
  `dhRdHours` decimal(10,2) DEFAULT NULL,
  `dhRdOtHours` decimal(10,2) DEFAULT NULL,
  `dhRdNsHours` decimal(10,2) DEFAULT NULL,
  `dhRdNsOtHours` decimal(10,2) DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`timekeepingProductionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_timekeeping_production_tbl`
--

LOCK TABLES `hris_timekeeping_production_tbl` WRITE;
/*!40000 ALTER TABLE `hris_timekeeping_production_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_timekeeping_production_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_timekeeping_tbl`
--

DROP TABLE IF EXISTS `hris_timekeeping_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_timekeeping_tbl` (
  `timekeepingID` bigint(21) NOT NULL AUTO_INCREMENT,
  `reviseTimekeepingID` bigint(21) DEFAULT NULL,
  `employeeID` bigint(21) DEFAULT NULL,
  `timekeepingStartDate` date DEFAULT NULL,
  `timekeepingEndDate` date DEFAULT NULL,
  `timekeepingReason` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timekeepingStatus` int(10) DEFAULT NULL,
  `timekeepingRemarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`timekeepingID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_timekeeping_tbl`
--

LOCK TABLES `hris_timekeeping_tbl` WRITE;
/*!40000 ALTER TABLE `hris_timekeeping_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_timekeeping_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_training_development_module`
--

DROP TABLE IF EXISTS `hris_training_development_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_training_development_module` (
  `trainingDevelopmentModuleID` bigint(20) NOT NULL AUTO_INCREMENT,
  `trainingDevelopmentSetupID` bigint(20) NOT NULL,
  `reviseTrainingDevelopmentModuleID` bigint(20) DEFAULT NULL,
  `trainingDevelopmentModuleTrainee` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `trainingDevelopmentModuleTopic` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `trainingDevelopmentModuleTrainor` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trainingDevelopmentModuleType` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `trainingDevelopmentModuleBudget` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trainingDevelopmentModuleFile` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `trainingDevelopmentModuleDifficulty` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trainingDevelopmentModuleDate` date NOT NULL,
  `dateFilter` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateFrom` date NOT NULL,
  `dateTo` date NOT NULL,
  `employeeID` int(250) NOT NULL,
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trainingDevelopmentModuleStatus` int(11) NOT NULL,
  `trainingDevelopmentModuleDescription` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `trainingDevelopmentModuleRemarks` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`trainingDevelopmentModuleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_training_development_module`
--

LOCK TABLES `hris_training_development_module` WRITE;
/*!40000 ALTER TABLE `hris_training_development_module` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_training_development_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hris_training_development_setup_tbl`
--

DROP TABLE IF EXISTS `hris_training_development_setup_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hris_training_development_setup_tbl` (
  `trainingDevelopmentSetupID` bigint(20) NOT NULL AUTO_INCREMENT,
  `trainingDevelopmentSetupCode` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trainingDevelopmentSetupName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `trainingDevelopmentSetupTopic` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `trainingDevelopmentSetupType` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trainingDevelopmentSetupModuleFile` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `trainingDevelopmentSetupDifficulty` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trainingDevelopmentSetupStatus` int(50) NOT NULL,
  `createdBy` int(20) NOT NULL,
  `updatedBy` int(20) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`trainingDevelopmentSetupID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hris_training_development_setup_tbl`
--

LOCK TABLES `hris_training_development_setup_tbl` WRITE;
/*!40000 ALTER TABLE `hris_training_development_setup_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `hris_training_development_setup_tbl` ENABLE KEYS */;
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
  `categoryType` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bidPoStatus` int(10) DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`bidPoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_bid_po_tbl`
--

LOCK TABLES `ims_bid_po_tbl` WRITE;
/*!40000 ALTER TABLE `ims_bid_po_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_bid_po_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_bid_recap_tbl`
--

DROP TABLE IF EXISTS `ims_bid_recap_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_bid_recap_tbl` (
  `bidRecapID` bigint(21) NOT NULL AUTO_INCREMENT,
  `bidRecapCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reviseBidRecapID` bigint(21) DEFAULT NULL,
  `reviseBidRecapCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `costEstimateID` bigint(21) DEFAULT NULL,
  `costEstimateCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billMaterialID` bigint(21) DEFAULT NULL,
  `billMaterialCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `materialRequestID` bigint(21) DEFAULT NULL,
  `materialRequestCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventoryValidationID` bigint(21) DEFAULT NULL,
  `inventoryValidationCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timelineBuilderID` bigint(21) DEFAULT NULL,
  `projectCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectCategory` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientAddress` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeID` bigint(21) DEFAULT NULL,
  `bidRecapReason` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateNeeded` date DEFAULT NULL,
  `bidRecapStatus` int(11) DEFAULT NULL,
  `bidRecapRemarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assetFinalQuoteStatus` int(11) DEFAULT 0,
  `itemFinalQuoteStatus` int(11) DEFAULT 0,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`bidRecapID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_bid_recap_tbl`
--

LOCK TABLES `ims_bid_recap_tbl` WRITE;
/*!40000 ALTER TABLE `ims_bid_recap_tbl` DISABLE KEYS */;
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
  `itemName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `barcode` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `serialnumber` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateBorrowed` date NOT NULL,
  `quantity` int(50) NOT NULL,
  `unitOfMeasurement` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `borrowedPurpose` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`borrowingDetailID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_borrowing_details_tbl`
--

LOCK TABLES `ims_borrowing_details_tbl` WRITE;
/*!40000 ALTER TABLE `ims_borrowing_details_tbl` DISABLE KEYS */;
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
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `borrowingStatus` int(11) NOT NULL,
  `borrowingReason` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `borrowingRemarks` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`borrowingID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_borrowing_tbl`
--

LOCK TABLES `ims_borrowing_tbl` WRITE;
/*!40000 ALTER TABLE `ims_borrowing_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_borrowing_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_final_quote_tbl`
--

DROP TABLE IF EXISTS `ims_final_quote_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_final_quote_tbl` (
  `finalQuoteID` bigint(21) NOT NULL AUTO_INCREMENT,
  `bidRecapID` bigint(21) DEFAULT NULL,
  `classification` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventoryVendorID` bigint(21) DEFAULT NULL,
  `vendorCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendorName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendorAddress` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendorContactDetails` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendorContactPerson` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `finalQuoteRemarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `finalQuoteTotal` decimal(15,2) DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`finalQuoteID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_final_quote_tbl`
--

LOCK TABLES `ims_final_quote_tbl` WRITE;
/*!40000 ALTER TABLE `ims_final_quote_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_final_quote_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_asset_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_asset_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_asset_tbl` (
  `assetID` bigint(20) NOT NULL AUTO_INCREMENT,
  `assetCode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `assetName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brandName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `classificationID` bigint(20) NOT NULL,
  `categoryID` bigint(20) NOT NULL,
  `unitOfMeasurementID` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reOrderLevel` int(50) NOT NULL,
  `assetDescription` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `assetProviderFee` decimal(10,2) NOT NULL,
  `assetCost` decimal(10,2) NOT NULL,
  `assetSalvageValue` decimal(10,2) NOT NULL,
  `assetHourRate` decimal(10,2) NOT NULL,
  `assetDepreciation` decimal(10,2) DEFAULT NULL,
  `assetUsefulLife` int(50) NOT NULL,
  `acquisitionDate` date NOT NULL,
  `assetImage` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assetStatus` int(50) NOT NULL,
  `datecreated` date NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`assetID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_asset_tbl`
--

LOCK TABLES `ims_inventory_asset_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_asset_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_inventory_asset_tbl` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_category_tbl`
--

LOCK TABLES `ims_inventory_category_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_category_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_category_tbl` VALUES (1,'CTY-21-00001','PPE',8,'1',1,1,'2021-04-21 05:54:24','2021-06-01 00:26:31'),(2,'CTY-21-00002','CCTV',10,'1',1,1,'2021-04-21 05:54:42','2021-06-01 00:27:56'),(3,'CTY-21-00003','Screw',9,'1',1,1,'2021-04-21 05:54:59','2021-06-16 23:16:20'),(4,'CTY-21-00004','Television',3,'1',1,1,'2021-04-21 05:55:15','2021-06-01 00:52:09'),(5,'CTY-21-00005','Hard Hat Helmet',8,'1',1,1,'2021-04-21 05:55:26','2021-06-01 00:29:06'),(6,'CTY-21-00006','Headache',13,'1',1,1,'2021-04-21 05:55:42','2021-06-01 00:30:02'),(7,'CTY-21-00007','Mop',12,'1',1,1,'2021-04-21 05:55:55','2021-06-01 00:30:20'),(8,'CTY-21-00008','Ballpens',6,'1',1,1,'2021-04-21 05:56:08','2021-06-01 00:35:20'),(9,'CTY-21-00009','Batteries',9,'1',1,1,'2021-04-21 05:56:26','2021-06-01 00:36:29'),(10,'CTY-21-00010','Refrigerator',14,'1',1,1,'2021-04-21 05:56:49','2021-06-01 00:37:15'),(11,'CTY-21-00011','Hammer',5,'1',1,1,'2021-04-21 06:10:41','2021-06-01 00:37:53'),(12,'CTY-21-00012','Chairs',2,'1',1,1,'2021-04-21 06:22:39','2021-06-01 00:38:27'),(13,'CTY-21-00013','Mouse',3,'1',1,1,'2021-06-01 00:38:40','0000-00-00 00:00:00'),(14,'CTY-21-00014','Laptop',3,'1',1,1,'2021-06-01 00:38:49','0000-00-00 00:00:00'),(15,'CTY-21-00015','Monitor',3,'1',1,1,'2021-06-01 00:39:07','0000-00-00 00:00:00'),(16,'CTY-21-00016','Cabinets',3,'1',1,1,'2021-06-01 00:39:27','0000-00-00 00:00:00'),(17,'CTY-21-00017','Phones',3,'1',1,1,'2021-06-01 00:39:48','0000-00-00 00:00:00'),(18,'CTY-21-00018','Printer',3,'1',1,1,'2021-06-01 00:40:28','0000-00-00 00:00:00'),(19,'CTY-21-00019','Papers',6,'1',1,1,'2021-06-01 00:40:40','0000-00-00 00:00:00'),(20,'CTY-21-00020','Markers',6,'1',1,1,'2021-06-01 00:40:49','0000-00-00 00:00:00'),(21,'CTY-21-00021','Screw drivers',5,'1',1,1,'2021-06-01 00:41:16','0000-00-00 00:00:00'),(22,'CTY-21-00022','Printer Ink',6,'1',1,1,'2021-06-01 00:42:29','0000-00-00 00:00:00'),(23,'CTY-21-00023','Office Table',3,'1',1,1,'2021-06-01 00:42:51','0000-00-00 00:00:00'),(24,'CTY-21-00024','Electrical Tape',9,'1',1,1,'2021-06-01 00:47:57','0000-00-00 00:00:00'),(25,'CTY-21-00025','Plates',14,'1',1,1,'2021-06-01 00:52:51','2021-06-01 00:53:12'),(26,'CTY-21-00026','Vacuum',12,'1',1,1,'2021-06-01 01:04:13','0000-00-00 00:00:00'),(27,'CTY-21-00027','Electric Fan',3,'1',1,1,'2021-06-14 08:02:57','2021-06-14 08:02:57'),(28,'CTY-21-00028','Drill',4,'1',1,1,'2021-06-16 23:13:43','2021-06-16 23:13:43'),(29,'CTY-21-00029','Pantry Utensils',14,'1',1,1,'2021-06-29 03:38:58','2021-06-29 03:38:58'),(30,'CTY-21-00030','Barcode Scanner',10,'1',1,1,'2021-06-29 05:07:41','2021-06-29 05:07:41'),(31,'CTY-21-00031','Card Reader',10,'1',1,1,'2021-06-29 05:08:35','2021-06-29 05:08:35'),(32,'CTY-21-00032','Biometrics',10,'1',1,1,'2021-06-29 05:09:31','2021-06-29 05:09:31');
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
  `classificationShortcut` varchar(255) NOT NULL,
  `classificationName` text NOT NULL,
  `classificationStatus` int(10) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`classificationID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_classification_tbl`
--

LOCK TABLES `ims_inventory_classification_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_classification_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_classification_tbl` VALUES (1,'CFN-21-00001','','Goods',0,1,1,'2021-04-21 01:59:37','2021-06-30 05:36:54'),(2,'CFN-21-00002','','Furnitures & Fixtures',1,1,1,'2021-04-21 05:50:20','2021-05-14 03:02:06'),(3,'CFN-21-00003','','Office Equipment',1,1,1,'2021-04-21 05:50:55','2021-04-21 05:50:55'),(4,'CFN-21-00004','','Power Tools',1,1,1,'2021-04-21 05:51:13','2021-04-21 05:51:13'),(5,'CFN-21-00005','','Hand Tools',1,1,1,'2021-04-21 05:51:33','2021-04-21 05:51:33'),(6,'CFN-21-00006','','Office Supplies',1,1,1,'2021-04-21 05:51:45','2021-04-21 05:51:45'),(7,'CFN-21-00007','','Vehicle',1,1,1,'2021-04-21 05:51:57','2021-04-21 05:51:57'),(8,'CFN-21-00008','','Safety Equipment',1,1,1,'2021-04-21 05:52:11','2021-04-21 05:52:11'),(9,'CFN-21-00009','','Consumable Materials',1,1,1,'2021-04-21 05:52:25','2021-04-21 05:52:25'),(10,'CFN-21-00010','','Client Equipment',1,1,1,'2021-04-21 05:52:36','2021-04-21 05:52:36'),(11,'CFN-21-00011','','Housekeeping Supplies',1,1,1,'2021-04-21 05:52:46','2021-04-21 05:52:46'),(12,'CFN-21-00012','','Housekeeping Equipments',1,1,1,'2021-04-21 05:53:00','2021-04-21 05:53:00'),(13,'CFN-21-00013','','Medicine Supplies',1,1,1,'2021-04-21 05:53:12','2021-04-21 05:53:12'),(14,'CFN-21-00014','','Pantry Supplies',1,1,1,'2021-04-21 05:53:25','2021-04-21 05:53:25'),(15,'CFN-21-00015','','Test Classification',1,1,1,'2021-06-10 03:41:58','2021-06-10 03:41:58');
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
  `itemName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `barcode` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `serialnumber` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(50) NOT NULL,
  `unitOfMeasurement` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `disposalDetailRemarks` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`disposalDetailID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disposalStatus` int(11) NOT NULL,
  `disposalReason` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disposalRemarks` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`disposalID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_incident_tbl`
--

LOCK TABLES `ims_inventory_incident_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_incident_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_incident_tbl` VALUES (1,NULL,1,'no action plan',20,'2021-07-01','5|2|4',NULL,NULL,4,'undefined',NULL,'2021-05-26 10:02:20',1,1,'2021-05-26 10:02:20','2021-05-26 02:02:52'),(2,NULL,1,'no action plan',20,'2021-06-30','5|2|4','2|2|2','2021-05-26 10:23:04|2021-05-26 10:35:14|2021-05-26 10:38:00',5,'undefined',NULL,'2021-05-26 10:03:15',1,1,'2021-05-26 10:03:15','2021-05-26 02:38:39'),(3,NULL,1,'no action plan',2,'2021-06-05',NULL,NULL,NULL,0,'undefined',NULL,'2021-05-27 06:59:46',1,1,'2021-05-27 14:59:44','2021-05-27 06:59:46'),(4,NULL,1,'no action plan',4,'2021-05-27','5|2|4',NULL,NULL,1,'undefined',NULL,'2021-05-27 15:04:58',1,1,'2021-05-27 15:04:58','2021-05-27 07:05:01'),(5,NULL,1,'Test',2,'2021-06-03','5|2|4','2|2|2','2021-06-03 13:59:51|2021-06-03 14:00:23|2021-06-03 14:00:47',2,'test',NULL,'2021-06-03 13:59:08',1,4,'2021-06-03 13:59:08','2021-06-03 06:00:48'),(6,NULL,1,'Test',2,'2021-06-18','5|2|4','2','2021-07-06 10:56:46',1,'test',NULL,'2021-06-17 14:54:01',1,5,'2021-06-17 14:54:01','2021-07-06 02:56:47'),(7,NULL,1,'',2,'2021-06-17',NULL,NULL,NULL,0,'',NULL,'2021-06-17 06:54:15',1,1,'2021-06-17 14:54:14','2021-06-17 06:54:15');
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
  `itemImage` text DEFAULT NULL,
  `itemStatus` int(50) NOT NULL,
  `datecreated` date NOT NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`itemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_item_tbl`
--

LOCK TABLES `ims_inventory_item_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_item_tbl` DISABLE KEYS */;
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
  `itemID` bigint(20) DEFAULT NULL,
  `assetID` bigint(21) DEFAULT NULL,
  `inventoryVendorID` bigint(20) NOT NULL,
  `inventoryVendorName` text DEFAULT NULL,
  `vendorCurrentPrice` decimal(10,2) NOT NULL,
  `preferred` int(11) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`priceListID`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_price_list_tbl`
--

LOCK TABLES `ims_inventory_price_list_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_price_list_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_price_list_tbl` VALUES (1,1,NULL,11,'Samsung Inc.',32000.00,1,1,1,'2021-09-07 19:27:35','2021-09-08 11:27:26'),(2,2,NULL,11,'Samsung Inc.',50000.00,1,1,1,'2021-09-07 19:30:09','2021-09-08 11:30:02'),(3,3,NULL,11,'Samsung Inc.',25000.00,1,1,1,'2021-09-07 20:55:49','2021-09-08 12:55:41'),(4,23,NULL,3,'Acer Philippines',45000.00,1,1,1,'2021-09-07 20:57:30','2021-09-08 12:57:23'),(5,24,NULL,4,'Dell Technology',40000.00,1,1,1,'2021-09-07 20:58:17','2021-09-08 12:58:05'),(6,9,NULL,14,'Dewalt',2000.00,1,1,1,'2021-09-07 20:58:58','2021-09-08 12:58:52'),(7,10,NULL,14,'Dewalt',2500.00,1,1,1,'2021-09-07 20:59:52','2021-09-08 12:59:43'),(8,11,NULL,14,'Dewalt',1500.00,1,1,1,'2021-09-07 21:00:54','2021-09-08 01:00:47'),(9,14,NULL,1,'Ace Hardware',300.00,1,1,1,'2021-09-07 21:01:35','2021-09-08 01:01:29'),(10,18,NULL,14,'Dewalt',850.00,1,1,1,'2021-09-07 21:02:01','2021-09-08 01:01:56'),(12,25,NULL,2,'National Bookstore',500.00,1,1,1,'2021-09-07 21:03:13','2021-09-08 01:02:24'),(13,26,NULL,2,'National Bookstore',20.00,1,1,1,'2021-09-07 21:03:35','2021-09-08 01:03:28'),(14,4,NULL,1,'Ace Hardware',700.00,1,1,1,'2021-09-07 21:04:20','2021-09-08 01:04:16'),(18,8,NULL,1,'Ace Hardware',1000.00,1,1,1,'2021-09-07 21:06:05','2021-09-08 01:05:58'),(19,12,NULL,2,'National Bookstore',25.00,1,1,1,'2021-09-07 21:06:28','2021-09-08 01:06:23'),(20,13,NULL,1,'Ace Hardware',250.00,1,1,1,'2021-09-07 21:06:51','2021-09-08 01:06:46'),(21,19,NULL,1,'Ace Hardware',800.00,1,1,1,'2021-09-07 21:07:13','2021-09-08 01:07:08'),(22,20,NULL,1,'Ace Hardware',1500.00,1,1,1,'2021-09-07 21:07:55','2021-09-08 01:07:48'),(23,5,NULL,1,'Ace Hardware',300.00,0,1,1,'2021-09-07 21:08:26','2021-09-08 01:04:39'),(24,5,NULL,13,'Boysen',150.00,1,1,1,'2021-09-07 21:08:26','2021-09-08 01:08:20'),(27,6,NULL,1,'Ace Hardware',850.00,0,1,1,'2021-09-07 21:09:22','2021-09-08 01:05:06'),(28,6,NULL,13,'Boysen',500.00,1,1,1,'2021-09-07 21:09:22','2021-09-08 01:08:46'),(29,7,NULL,1,'Ace Hardware',700.00,0,1,1,'2021-09-07 21:10:09','2021-09-08 01:05:26'),(30,7,NULL,13,'Boysen',450.00,1,1,1,'2021-09-07 21:10:09','2021-09-08 01:10:03'),(33,17,NULL,12,'Hikvision',7000.00,1,1,1,'2021-09-07 21:11:27','2021-09-08 01:11:21'),(34,27,NULL,15,'Mercury Drug',500.00,1,1,1,'2021-09-07 21:38:48','2021-09-08 01:38:42'),(35,28,NULL,15,'Mercury Drug',50.00,1,1,1,'2021-09-07 21:39:10','2021-09-08 01:39:05'),(36,16,NULL,1,'Ace Hardware',10000.00,1,1,1,'2021-09-17 21:23:06','2021-09-18 01:23:04'),(37,15,NULL,1,'Ace Hardware',50000.00,1,1,1,'2021-09-17 21:24:27','2021-09-18 01:24:25'),(38,NULL,1,1,'Samsung Inc.',32000.00,1,1,1,'2021-09-07 19:27:35','2021-09-08 11:27:26'),(39,NULL,2,1,'Samsung Inc.',50000.00,1,1,1,'2021-09-07 19:30:09','2021-09-08 11:30:02'),(40,NULL,3,1,'Samsung Inc.',25000.00,1,1,1,'2021-09-07 20:55:49','2021-09-08 12:55:41'),(41,NULL,4,2,'Acer Philippines',45000.00,1,1,1,'2021-09-07 20:57:30','2021-09-08 12:57:23'),(42,NULL,5,2,'Dell Technology',40000.00,1,1,1,'2021-09-07 20:58:17','2021-09-08 12:58:05');
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
  `remarks` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`inventoryReceivingDetailsID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_receiving_details_tbl`
--

LOCK TABLES `ims_inventory_receiving_details_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_receiving_details_tbl` DISABLE KEYS */;
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
  `inventoryReceivingCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `purchaseOrderID` bigint(20) DEFAULT NULL,
  `purchaseOrderCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recordID` bigint(255) DEFAULT NULL,
  `timelineBuilderID` bigint(20) DEFAULT NULL,
  `projectCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectCategory` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientAddress` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiptNo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateReceived` date NOT NULL,
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventoryReceivingStatus` int(11) NOT NULL,
  `inventoryReceivingReason` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventoryReceivingRemarks` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`inventoryReceivingID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_receiving_tbl`
--

LOCK TABLES `ims_inventory_receiving_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_receiving_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_inventory_receiving_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_request_details_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_request_details_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_request_details_tbl` (
  `inventoryRequestID` bigint(255) NOT NULL AUTO_INCREMENT,
  `inventoryReceivingID` int(255) DEFAULT NULL,
  `inventoryCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `returnItemID` int(255) DEFAULT NULL,
  `materialUsageID` int(255) DEFAULT NULL,
  `requestItemID` int(255) NOT NULL,
  `recordID` bigint(255) NOT NULL,
  `itemID` int(255) DEFAULT NULL,
  `itemCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Brand` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `borrowedQuantity` decimal(15,2) DEFAULT NULL,
  `quantity` decimal(15,2) NOT NULL,
  `used` decimal(15,2) NOT NULL,
  `unused` decimal(15,2) NOT NULL,
  `receivedQuantity` decimal(15,2) DEFAULT NULL,
  `remainingQuantity` decimal(15,2) DEFAULT NULL,
  `classificationID` int(255) DEFAULT NULL,
  `classificationName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoryID` int(255) DEFAULT NULL,
  `categoryName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manHours` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdBy` int(255) NOT NULL,
  `updatedBy` int(255) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`inventoryRequestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_request_details_tbl`
--

LOCK TABLES `ims_inventory_request_details_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_request_details_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_inventory_request_details_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_request_serial_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_request_serial_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_request_serial_tbl` (
  `inventoryRequestSerialID` bigint(255) NOT NULL AUTO_INCREMENT,
  `inventoryRequestID` bigint(255) DEFAULT NULL,
  `returnItemID` bigint(255) DEFAULT NULL,
  `inventoryReceivingID` bigint(255) DEFAULT NULL,
  `materialUsageID` bigint(255) DEFAULT NULL,
  `itemID` bigint(255) NOT NULL,
  `serialNumber` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdBy` int(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedBy` int(255) NOT NULL,
  PRIMARY KEY (`inventoryRequestSerialID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_request_serial_tbl`
--

LOCK TABLES `ims_inventory_request_serial_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_request_serial_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_inventory_request_serial_tbl` ENABLE KEYS */;
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
  `inventoryStorageNumber` bigint(50) DEFAULT NULL,
  `inventoryStorageFloor` bigint(50) DEFAULT NULL,
  `inventoryStorageRoom` bigint(50) DEFAULT NULL,
  `inventoryStorageBay` bigint(50) DEFAULT NULL,
  `inventoryStorageLevel` bigint(50) DEFAULT NULL,
  `inventoryStorageShelves` bigint(50) DEFAULT NULL,
  `inventoryStorageRoomType` varchar(80) DEFAULT NULL,
  `inventoryStorageDepartment` varchar(80) DEFAULT NULL,
  `inventoryStorageStatus` varchar(120) NOT NULL,
  `createdBy` bigint(80) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedBy` bigint(80) NOT NULL,
  `updatedAt` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`inventoryStorageID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_storage_tbl`
--

LOCK TABLES `ims_inventory_storage_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_storage_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_storage_tbl` VALUES (1,'ISM-21-00001','BCGI-Operation Department','1701','Antel One Corporate Center','Julia Vargas','Ortigas Center','KAPITOLYO','CITY OF PASIG','NATIONAL CAPITAL REGION - SECOND DISTRICT','NCR','Philippines',1200,NULL,NULL,NULL,NULL,NULL,NULL,'Office','3','1',1,'2021-06-29 03:28:22.157248',1,'2021-06-29 03:34:02.220133'),(2,'ISM-21-00002','BCGI-Pantry','1701','Antel One Corporate Center','Julia Vargas','Ortigas Center','KAPITOLYO','CITY OF PASIG','NATIONAL CAPITAL REGION - SECOND DISTRICT','NCR','Philippines',1200,NULL,NULL,NULL,NULL,NULL,NULL,'Pantry Area','4','1',1,'2021-06-29 03:29:59.891482',1,'2021-06-29 03:34:24.913856'),(3,'ISM-21-00003','GTC-Conference Room','1709','Antel One Corporate Center','Julia Vargas','Ortigas Center','KAPASIGAN','CITY OF PASIG','NATIONAL CAPITAL REGION - SECOND DISTRICT','NCR','Philippines',1200,NULL,NULL,NULL,NULL,NULL,NULL,'Conference Room','4','1',1,'2021-06-29 03:35:54.682445',1,'2021-06-29 03:35:54.682445');
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
  `inventoryValidationCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `materialRequestID` bigint(20) NOT NULL,
  `materialRequestCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `costEstimateID` bigint(20) DEFAULT NULL,
  `costEstimateCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billMaterialID` bigint(20) DEFAULT NULL,
  `billMaterialCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `timelineBuilderID` bigint(20) DEFAULT NULL,
  `projectCode` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectCategory` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientCode` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientAddress` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventoryValidationStatus` int(11) NOT NULL,
  `inventoryValidationReason` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventoryValidationRemarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateNeeded` date DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) DEFAULT NULL,
  `updatedBy` bigint(20) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`inventoryValidationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_validation_tbl`
--

LOCK TABLES `ims_inventory_validation_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_validation_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_inventory_validation_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_inventory_vehicle_tbl`
--

DROP TABLE IF EXISTS `ims_inventory_vehicle_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_inventory_vehicle_tbl` (
  `vehicleID` bigint(20) NOT NULL AUTO_INCREMENT,
  `vehicleName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vehiclePlateNumber` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vehicleFuelConsumption` decimal(10,2) NOT NULL,
  `vehicleGasType` int(50) NOT NULL,
  `acquisitionDate` date NOT NULL,
  `vehicleCost` decimal(10,2) NOT NULL,
  `vehicleSalvageValue` decimal(10,2) NOT NULL,
  `vehicleUsefulLife` decimal(10,2) NOT NULL,
  `vehicleImage` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vehicleDepreciation` decimal(10,2) NOT NULL,
  `vehicleHourRate` decimal(10,2) NOT NULL,
  `vehicleStatus` int(50) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`vehicleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_vehicle_tbl`
--

LOCK TABLES `ims_inventory_vehicle_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_vehicle_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_inventory_vehicle_tbl` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_inventory_vendor_tbl`
--

LOCK TABLES `ims_inventory_vendor_tbl` WRITE;
/*!40000 ALTER TABLE `ims_inventory_vendor_tbl` DISABLE KEYS */;
INSERT INTO `ims_inventory_vendor_tbl` VALUES (1,'VEN-21-00001','Ace Hardware','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','QUEZON CITY','BATASAN HILLS','1209','Twin Tower','St. Kalayaan','','Philippines','1920','Ayesha Porras','ayesha13@gmail.com','475-756-869-679','0932-5464-575','','Ace Hardware',1,'23-213-1313','Sole Proprietorship','Manufacturing',1,'Ayesha Porras','5435352351242','08:00:00','17:00:00',NULL,1,1,1,'2021-04-21 01:54:39','2021-04-21 01:54:39'),(2,'VEN-21-00002','National Bookstore','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','CITY OF MANDALUYONG','ADDITION HILLS','313','Robinsons Forum','Pioneer Street','EDSA','Philippines','1550','Anastacio Policarpio','ana.poli@gmail.com','123-456-789-000','0923-7437-619','(02)-8687-4421','Office Supplies',0,'12-354-3546','Business Corporation','Office supplies & Equipments',5,'Anastacio Policarpio','12345678901234567890','08:00:00','17:00:00',NULL,1,1,1,'2021-04-21 03:21:37','2021-05-17 06:59:53'),(3,'VEN-21-00003','Acer Philippines','CAR','ABRA','BUCAY','BANGCAGAN','23','Twin Tower','Pilar','','Philippines','1234','Ayesha Porras','ayesha13@gmail.com','354-365-475-472','0932-4353-454','(34)-1241-2325','Acer',1,'22-312-3131','Business Corporation','Electronics',2,'Ayesha Porras','62-3634-265-2','08:00:00','17:00:00',NULL,1,1,1,'2021-04-28 02:26:57','2021-04-28 02:26:57'),(4,'VEN-21-00004','Dell Technology','4A','QUEZON','LUCENA CITY','BARANGAY 5 (POB.)','','23','Malvar St. Cor. Salazar','','Philippines','1223','Rodeny Bamba','rodeny23@gmail.com','214-324-235-657','0924-5465-856','(42)-3423-4243','Dell Technology',1,'23-454-6575','Business Corporation','Computer Electronics',3,'Rodeny Bamba','654-73-567-6','08:00:00','17:00:00',NULL,1,1,1,'2021-04-28 02:36:44','2021-04-28 03:01:30'),(5,'VEN-21-00005','UNILAB Trusted Quality Healthcare','NCR','NATIONAL CAPITAL REGION - FOURTH DISTRICT','CITY OF MAKATI','BEL-AIR','1201','UNILAB Building','Kalayaan ','','Philippines','1920','Mr. Henry Ceed','unilab13@yahoo.com','213-214-412-111','0932-112-1421','(12)-4123-1231','UNILAB',1,'','Business Corporation','PPE\'s',5,'Henry Ceed','3331-231-331','08:00:00','17:00:00',NULL,1,1,1,'2021-04-28 06:10:02','2021-05-28 01:53:21'),(6,'VEN-21-00006','RTG MaxiFlex Protective Gear ','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','CITY OF PASIG','BAMBANG','23','One Corporate Center','Kalayaan Street','','Philippines','1234','Rodeny Bamba','bits@gmail.com','432-432-423-523','0941-241-1411','(32)-3423-4234','RTG MaxiFlex',1,'','Business Corporation','Hardware, Electrical Supplies, Construction, Plumbing, Paints',2,'Rodeny Bamba','42-4234-324-2','08:00:00','17:00:00',NULL,1,1,1,'2021-05-18 02:49:49','2021-05-28 01:53:29'),(7,'VEN-21-00007','Canon','NCR','NATIONAL CAPITAL REGION - FOURTH DISTRICT','CITY OF MAKATI','MAGALLANES','23','Canon Building','San Genorimo','','Philippines','1232','Nhadley  Halcon','nhad@13gmail.com','313-232-131-231','0923-2543-546','(32)-4564-6575','Canon',0,'43546457575','Business Corporation','Printing Services',3,'Nhadley Halcon','534-53-453-4','08:00:00','17:00:00',NULL,1,1,1,'2021-05-19 02:52:54','2021-05-19 06:43:30'),(8,'VEN-21-00001','Datalogic Inc.','NCR','NATIONAL CAPITAL REGION - THIRD DISTRICT','NAVOTAS CITY','NAVOTAS WEST','1002','Datalogic Building','St. Martin','','Philippines','1008','Rodeny Bamba','rod.bamba@gmail.com','232-435-456-465','0932-434-5354','(32)-4332-4354','DataLogic',1,'','Business Corporation','Electronics',2,'Rodeny Bamba','43-5465-767-6','08:00:00','17:00:00','null',1,1,1,'2021-06-29 05:46:37','2021-06-29 05:46:37'),(9,'VEN-21-00002','HelCim Corporation','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','CITY OF MARIKINA','SANTO NIÑO','1020','HelCim Building','San Antonio','','Philippines','1909','Joseph Berongoy','joseph.berongoy@gmail.com','213-214-235-435','0933-454-3543','(21)-3247-3483','HelCim',1,'','Business Corporation','Electronics',4,'Joseph Berongoy','3243-543-45','08:00:00','17:00:00','null',1,1,1,'2021-06-29 05:49:36','2021-06-29 05:49:36'),(10,'VEN-21-00003','ZKTeco Inc.','NCR','NATIONAL CAPITAL REGION - MANILA','INTRAMUROS','BARANGAY 656','1212','ZKTeco Building','San Bernando','','Philippines','2121','Mathew Isaac','math31@gmail.com','232-343-243-546','0932-435-4464','(34)-3354-6546','ZKTeco',1,'','Business Corporation','Electronics',1,'','','08:00:00','17:00:00','null',1,1,1,'2021-06-29 05:53:31','2021-06-29 05:53:31');
/*!40000 ALTER TABLE `ims_inventory_vendor_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_material_request_tbl`
--

DROP TABLE IF EXISTS `ims_material_request_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_material_request_tbl` (
  `materialRequestID` bigint(20) NOT NULL AUTO_INCREMENT,
  `reviseMaterialRequestID` bigint(20) DEFAULT NULL,
  `materialRequestCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reviseMaterialRequestCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `costEstimateID` bigint(20) DEFAULT NULL,
  `costEstimateCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billMaterialID` bigint(20) DEFAULT NULL,
  `billMaterialCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeID` bigint(20) NOT NULL,
  `timelineBuilderID` bigint(20) DEFAULT NULL,
  `projectCode` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectCategory` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientCode` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientAddress` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `materialRequestStatus` int(11) NOT NULL,
  `materialRequestReason` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `materialRequestRemarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateNeeded` date DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) DEFAULT NULL,
  `updatedBy` bigint(20) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`materialRequestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_material_request_tbl`
--

LOCK TABLES `ims_material_request_tbl` WRITE;
/*!40000 ALTER TABLE `ims_material_request_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_material_request_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_material_usage_tbl`
--

DROP TABLE IF EXISTS `ims_material_usage_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_material_usage_tbl` (
  `materialUsageID` bigint(20) NOT NULL AUTO_INCREMENT,
  `materialUsageCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reviseMaterialUsageID` bigint(20) DEFAULT NULL,
  `materialWithdrawalID` int(255) DEFAULT NULL,
  `materialWithdrawalCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventoryValidationID` int(255) DEFAULT NULL,
  `inventoryValidationCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `materialRequestID` int(255) DEFAULT NULL,
  `materialRequestCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `StockOutID` bigint(20) NOT NULL,
  `referenceNo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `projectID` bigint(20) DEFAULT NULL,
  `projectCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `projectCategory` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientID` bigint(255) NOT NULL,
  `clientCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientAddress` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `materialUsageStatus` int(11) NOT NULL,
  `materialUsageReason` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `materialUsageRemarks` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `materialUsageDate` date DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `materialUsageCreateAt` date NOT NULL,
  PRIMARY KEY (`materialUsageID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_material_usage_tbl`
--

LOCK TABLES `ims_material_usage_tbl` WRITE;
/*!40000 ALTER TABLE `ims_material_usage_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_material_usage_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_material_withdrawal_asset_tbl`
--

DROP TABLE IF EXISTS `ims_material_withdrawal_asset_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_material_withdrawal_asset_tbl` (
  `withdrawalAssetID` bigint(20) NOT NULL AUTO_INCREMENT,
  `materialWithdrawalID` bigint(20) DEFAULT NULL,
  `requestAssetID` bigint(20) DEFAULT NULL,
  `costEstimateID` bigint(20) DEFAULT NULL,
  `billMaterialID` bigint(20) DEFAULT NULL,
  `materialRequestID` bigint(20) DEFAULT NULL,
  `inventoryValidationID` bigint(20) DEFAULT NULL,
  `bidRecapID` bigint(20) DEFAULT NULL,
  `purchaseRequestID` bigint(20) DEFAULT NULL,
  `purchaseOrderID` bigint(20) DEFAULT NULL,
  `changeRequestID` bigint(20) DEFAULT NULL,
  `inventoryReceivingID` bigint(20) DEFAULT NULL,
  `inventoryVendorID` bigint(20) DEFAULT NULL,
  `inventoryVendorCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventoryVendorName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `finalQuoteRemarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `milestoneBuilderID` bigint(20) DEFAULT NULL,
  `phaseDescription` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `milestoneListID` bigint(20) DEFAULT NULL,
  `projectMilestoneID` bigint(20) DEFAULT NULL,
  `projectMilestoneName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assetID` bigint(20) DEFAULT NULL,
  `assetCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assetBrandName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assetName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assetClassification` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assetCategory` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assetUom` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assetDescription` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `files` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `availableStocks` decimal(10,2) DEFAULT NULL,
  `requestQuantity` decimal(10,2) DEFAULT NULL,
  `reservedAsset` decimal(10,2) DEFAULT NULL,
  `forPurchase` decimal(10,2) DEFAULT NULL,
  `totalCost` decimal(10,2) DEFAULT NULL,
  `received` decimal(10,2) DEFAULT NULL,
  `dateReceived` date DEFAULT NULL,
  `remaining` decimal(10,2) DEFAULT NULL,
  `stockOut` decimal(10,2) DEFAULT NULL,
  `stockOutDate` date DEFAULT NULL,
  `dateNeeded` date DEFAULT NULL,
  `dateReturn` date DEFAULT NULL,
  `actualDateReturn` date DEFAULT NULL,
  `hourlyRate` decimal(10,2) DEFAULT NULL,
  `withdrawalAssetStatus` int(50) DEFAULT NULL,
  `createdBy` bigint(20) DEFAULT NULL,
  `updatedBy` bigint(20) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`withdrawalAssetID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_material_withdrawal_asset_tbl`
--

LOCK TABLES `ims_material_withdrawal_asset_tbl` WRITE;
/*!40000 ALTER TABLE `ims_material_withdrawal_asset_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_material_withdrawal_asset_tbl` ENABLE KEYS */;
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
  `purchaseRequestID` bigint(20) DEFAULT NULL,
  `inventoryStorageID` bigint(20) DEFAULT NULL,
  `itemCode` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `inventoryStorageOfficeCode` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `itemID` bigint(20) DEFAULT NULL,
  `barcode` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `itemName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `itemDescription` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `inventoryStorageOfficeName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `unitOfMeasurement` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `receivingQuantity` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `stockInQuantity` bigint(20) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `stocks` int(11) NOT NULL,
  `utilized` bigint(20) DEFAULT NULL,
  `unused` bigint(20) DEFAULT NULL,
  `itemWithdrawalRemarks` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `itemUsageRemarks` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`materialWithdrawalDetailsID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_material_withdrawal_details_tbl`
--

LOCK TABLES `ims_material_withdrawal_details_tbl` WRITE;
/*!40000 ALTER TABLE `ims_material_withdrawal_details_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_material_withdrawal_details_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_material_withdrawal_item_tbl`
--

DROP TABLE IF EXISTS `ims_material_withdrawal_item_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_material_withdrawal_item_tbl` (
  `withdrawalItemID` bigint(20) NOT NULL AUTO_INCREMENT,
  `requestItemID` bigint(20) DEFAULT NULL,
  `costEstimateID` bigint(20) DEFAULT NULL,
  `billMaterialID` bigint(20) DEFAULT NULL,
  `materialRequestID` bigint(20) DEFAULT NULL,
  `inventoryValidationID` bigint(20) DEFAULT NULL,
  `materialWithdrawalID` bigint(20) DEFAULT NULL,
  `bidRecapID` bigint(20) DEFAULT NULL,
  `purchaseRequestID` bigint(20) DEFAULT NULL,
  `purchaseOrderID` bigint(20) DEFAULT NULL,
  `changeRequestID` bigint(20) DEFAULT NULL,
  `inventoryReceivingID` bigint(20) DEFAULT NULL,
  `inventoryVendorID` bigint(20) DEFAULT NULL,
  `inventoryVendorCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventoryVendorName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `finalQuoteRemarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `milestoneBuilderID` bigint(20) DEFAULT NULL,
  `phaseDescription` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `milestoneListID` bigint(20) DEFAULT NULL,
  `projectMilestoneID` bigint(20) DEFAULT NULL,
  `projectMilestoneName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemID` bigint(20) DEFAULT NULL,
  `itemCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemBrandName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemClassification` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemCategory` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemUom` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemDescription` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `files` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `availableStocks` decimal(10,2) DEFAULT NULL,
  `requestQuantity` decimal(10,2) DEFAULT NULL,
  `reservedItem` decimal(10,2) DEFAULT NULL,
  `forPurchase` decimal(10,2) DEFAULT NULL,
  `unitCost` decimal(10,2) DEFAULT NULL,
  `totalCost` decimal(10,2) DEFAULT NULL,
  `received` decimal(10,2) DEFAULT NULL,
  `dateReceived` date DEFAULT NULL,
  `remaining` decimal(10,2) DEFAULT NULL,
  `stockOut` decimal(10,2) DEFAULT NULL,
  `stockOutDate` date DEFAULT NULL,
  `withdrawalItemStatus` int(50) DEFAULT NULL,
  `createdBy` bigint(20) DEFAULT NULL,
  `updatedBy` bigint(20) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`withdrawalItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_material_withdrawal_item_tbl`
--

LOCK TABLES `ims_material_withdrawal_item_tbl` WRITE;
/*!40000 ALTER TABLE `ims_material_withdrawal_item_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_material_withdrawal_item_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_material_withdrawal_tbl`
--

DROP TABLE IF EXISTS `ims_material_withdrawal_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_material_withdrawal_tbl` (
  `materialWithdrawalID` bigint(20) NOT NULL AUTO_INCREMENT,
  `materialWithdrawalCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventoryValidationID` bigint(20) DEFAULT NULL,
  `inventoryValidationCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `materialRequestID` bigint(20) DEFAULT NULL,
  `materialRequestCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `costEstimateID` bigint(20) DEFAULT NULL,
  `costEstimateCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billMaterialID` bigint(20) DEFAULT NULL,
  `billMaterialCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeID` bigint(20) DEFAULT NULL,
  `timelineBuilderID` bigint(20) DEFAULT NULL,
  `projectCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectCategory` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientAddress` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventoryItemStatus` int(50) DEFAULT NULL,
  `inventoryAssetStatus` int(50) DEFAULT NULL,
  `materialWithdrawalStatus` int(50) DEFAULT NULL,
  `materialWithdrawalReason` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `materialWithdrawalRemarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateNeeded` date DEFAULT NULL,
  `submittedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `createdBy` bigint(20) DEFAULT NULL,
  `updatedBy` bigint(20) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`materialWithdrawalID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_material_withdrawal_tbl`
--

LOCK TABLES `ims_material_withdrawal_tbl` WRITE;
/*!40000 ALTER TABLE `ims_material_withdrawal_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_material_withdrawal_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_purchase_order_tbl`
--

DROP TABLE IF EXISTS `ims_purchase_order_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_purchase_order_tbl` (
  `purchaseOrderID` bigint(21) NOT NULL AUTO_INCREMENT,
  `purchaseOrderCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purchaseRequestID` bigint(21) DEFAULT NULL,
  `purchaseRequestCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timelineBuilderID` bigint(21) DEFAULT NULL,
  `projectCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectCategory` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientAddress` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bidRecapID` bigint(21) DEFAULT NULL,
  `bidRecapCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeID` bigint(21) DEFAULT NULL,
  `inventoryVendorID` bigint(21) DEFAULT NULL,
  `vendorCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendorName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendorContactPerson` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendorContactDetails` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendorAddress` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purchaseOrderClassification` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentTerms` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shippingTerm` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shippingDate` date DEFAULT NULL,
  `purchaseOrderReason` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total` decimal(15,2) DEFAULT NULL,
  `discountType` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount` decimal(15,2) DEFAULT NULL,
  `totalAmount` decimal(15,2) DEFAULT NULL,
  `vatSales` decimal(15,2) DEFAULT NULL,
  `vat` decimal(15,2) DEFAULT NULL,
  `totalVat` decimal(15,2) DEFAULT NULL,
  `lessEwt` decimal(15,2) DEFAULT NULL,
  `grandTotalAmount` decimal(15,2) DEFAULT NULL,
  `purchaseOrderSignedPO` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purchaseOrderStatus` int(11) DEFAULT NULL,
  `purchaseOrderRemarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `printCount` int(11) DEFAULT 0,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`purchaseOrderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_purchase_order_tbl`
--

LOCK TABLES `ims_purchase_order_tbl` WRITE;
/*!40000 ALTER TABLE `ims_purchase_order_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_purchase_order_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_purchase_request_tbl`
--

DROP TABLE IF EXISTS `ims_purchase_request_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_purchase_request_tbl` (
  `purchaseRequestID` bigint(21) NOT NULL AUTO_INCREMENT,
  `purchaseRequestCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revisePurchaseRequestID` bigint(21) DEFAULT NULL,
  `revisePurchaseRequestCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `costEstimateID` bigint(21) DEFAULT NULL,
  `costEstimateCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billMaterialID` bigint(21) DEFAULT NULL,
  `billMaterialCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `materialRequestID` bigint(21) DEFAULT NULL,
  `materialRequestCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventoryValidationID` bigint(21) DEFAULT NULL,
  `inventoryValidationCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bidRecapID` bigint(21) DEFAULT NULL,
  `bidRecapCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timelineBuilderID` bigint(21) DEFAULT NULL,
  `projectCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectCategory` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientAddress` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employeeID` bigint(21) DEFAULT NULL,
  `inventoryVendorID` bigint(21) DEFAULT NULL,
  `vendorCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendorName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendorContactPerson` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendorContactDetails` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vendorAddress` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purchaseRequestClassification` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentTerms` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shippingTerm` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shippingDate` date DEFAULT NULL,
  `purchaseRequestReason` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total` decimal(15,2) DEFAULT NULL,
  `discountType` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount` decimal(15,2) DEFAULT NULL,
  `totalAmount` decimal(15,2) DEFAULT NULL,
  `vatSales` decimal(15,2) DEFAULT NULL,
  `vat` decimal(15,2) DEFAULT NULL,
  `totalVat` decimal(15,2) DEFAULT NULL,
  `lessEwt` decimal(15,2) DEFAULT NULL,
  `grandTotalAmount` decimal(15,2) DEFAULT NULL,
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purchaseRequestStatus` int(11) DEFAULT NULL,
  `purchaseRequestRemarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(21) DEFAULT NULL,
  `updatedBy` bigint(21) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`purchaseRequestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_purchase_request_tbl`
--

LOCK TABLES `ims_purchase_request_tbl` WRITE;
/*!40000 ALTER TABLE `ims_purchase_request_tbl` DISABLE KEYS */;
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
  `serialNumber` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`serialNumberID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_receiving_serial_number_tbl`
--

LOCK TABLES `ims_receiving_serial_number_tbl` WRITE;
/*!40000 ALTER TABLE `ims_receiving_serial_number_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_receiving_serial_number_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_request_assets_tbl`
--

DROP TABLE IF EXISTS `ims_request_assets_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_request_assets_tbl` (
  `requestAssetID` bigint(20) NOT NULL AUTO_INCREMENT,
  `costEstimateID` bigint(20) DEFAULT NULL,
  `billMaterialID` bigint(20) DEFAULT NULL,
  `materialRequestID` bigint(20) DEFAULT NULL,
  `inventoryValidationID` bigint(20) DEFAULT NULL,
  `bidRecapID` bigint(20) DEFAULT NULL,
  `finalQuoteID` bigint(21) DEFAULT NULL,
  `purchaseRequestID` bigint(20) DEFAULT NULL,
  `purchaseOrderID` bigint(20) DEFAULT NULL,
  `changeRequestID` bigint(20) DEFAULT NULL,
  `inventoryReceivingID` bigint(20) DEFAULT NULL,
  `candidateVendorID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `candidateSelectedVendor` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `candidateVendorName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `candidateVendorPrice` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventoryVendorID` bigint(20) DEFAULT NULL,
  `inventoryVendorCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventoryVendorName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `milestoneBuilderID` bigint(20) DEFAULT NULL,
  `phaseDescription` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `milestoneListID` bigint(20) DEFAULT NULL,
  `projectMilestoneID` bigint(20) DEFAULT NULL,
  `projectMilestoneName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assetID` bigint(20) DEFAULT NULL,
  `assetCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assetBrandName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assetName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assetClassification` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assetCategory` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assetUom` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assetDescription` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `files` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `availableStocks` decimal(15,2) DEFAULT NULL,
  `requestQuantity` decimal(10,2) DEFAULT NULL,
  `reservedAsset` decimal(10,2) DEFAULT NULL,
  `forPurchase` decimal(15,2) DEFAULT NULL,
  `requestManHours` decimal(10,2) DEFAULT NULL,
  `dateNeeded` date DEFAULT NULL,
  `dateReturn` date DEFAULT NULL,
  `actualDateReturn` date DEFAULT NULL,
  `hourlyRate` bigint(20) DEFAULT NULL,
  `unitCost` decimal(15,2) DEFAULT NULL,
  `totalCost` bigint(20) DEFAULT NULL,
  `finalQuoteRemarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`requestAssetID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_request_assets_tbl`
--

LOCK TABLES `ims_request_assets_tbl` WRITE;
/*!40000 ALTER TABLE `ims_request_assets_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_request_assets_tbl` ENABLE KEYS */;
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
  `billMaterialID` bigint(20) DEFAULT NULL,
  `materialRequestID` bigint(20) DEFAULT NULL,
  `inventoryValidationID` bigint(20) DEFAULT NULL,
  `bidRecapID` bigint(20) DEFAULT NULL,
  `finalQuoteID` bigint(21) DEFAULT NULL,
  `purchaseRequestID` bigint(20) DEFAULT NULL,
  `purchaseOrderID` bigint(20) DEFAULT NULL,
  `changeRequestID` bigint(20) DEFAULT NULL,
  `inventoryReceivingID` bigint(20) DEFAULT NULL,
  `candidateVendorID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `candidateSelectedVendor` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `candidateVendorName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `candidateVendorPrice` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventoryVendorID` bigint(20) DEFAULT NULL,
  `inventoryVendorCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inventoryVendorName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `milestoneBuilderID` bigint(20) DEFAULT NULL,
  `phaseDescription` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `milestoneListID` bigint(20) DEFAULT NULL,
  `projectMilestoneID` bigint(20) DEFAULT NULL,
  `projectMilestoneName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemID` bigint(20) DEFAULT NULL,
  `itemCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemBrandName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemClassification` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemCategory` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemUom` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `itemDescription` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `files` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `availableStocks` decimal(10,2) DEFAULT NULL,
  `requestQuantity` decimal(10,2) DEFAULT NULL,
  `reservedItem` decimal(10,2) DEFAULT NULL,
  `forPurchase` decimal(10,2) DEFAULT NULL,
  `unitCost` decimal(15,2) DEFAULT NULL,
  `totalCost` decimal(15,2) DEFAULT NULL,
  `finalQuoteRemarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`requestItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_request_items_tbl`
--

LOCK TABLES `ims_request_items_tbl` WRITE;
/*!40000 ALTER TABLE `ims_request_items_tbl` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_request_services_tbl`
--

LOCK TABLES `ims_request_services_tbl` WRITE;
/*!40000 ALTER TABLE `ims_request_services_tbl` DISABLE KEYS */;
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
  `itemName` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `barcode` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `serialnumber` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateBorrowed` date NOT NULL,
  `quantityBorrowed` decimal(15,2) NOT NULL,
  `borrowedpurpose` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `returnItemDate` date NOT NULL,
  `returnItemQuantity` decimal(15,2) NOT NULL,
  PRIMARY KEY (`returnItemDetailID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
  `returnItemCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `reviseReturnItemID` bigint(20) DEFAULT NULL,
  `borrowingID` bigint(20) NOT NULL,
  `borrowingCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `employeeID` bigint(20) NOT NULL,
  `projectID` bigint(20) DEFAULT NULL,
  `projectCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `projectName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `clientID` bigint(255) NOT NULL,
  `clientCode` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `clientName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `clientAddress` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `approversID` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `approversStatus` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `approversDate` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `returnItemStatus` int(11) NOT NULL,
  `returnItemReason` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `returnItemRemarks` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `returnItemDate` date DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `borrowingCreateAt` date NOT NULL,
  PRIMARY KEY (`returnItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_service_completion_tbl`
--

LOCK TABLES `ims_service_completion_tbl` WRITE;
/*!40000 ALTER TABLE `ims_service_completion_tbl` DISABLE KEYS */;
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
  `chartOfAccountID` bigint(21) DEFAULT NULL,
  `accountName` text DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_service_order_tbl`
--

LOCK TABLES `ims_service_order_tbl` WRITE;
/*!40000 ALTER TABLE `ims_service_order_tbl` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_service_requisition_tbl`
--

LOCK TABLES `ims_service_requisition_tbl` WRITE;
/*!40000 ALTER TABLE `ims_service_requisition_tbl` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_service_scope_tbl`
--

LOCK TABLES `ims_service_scope_tbl` WRITE;
/*!40000 ALTER TABLE `ims_service_scope_tbl` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_services_tbl`
--

LOCK TABLES `ims_services_tbl` WRITE;
/*!40000 ALTER TABLE `ims_services_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_services_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_stock_in_assets_tbl`
--

DROP TABLE IF EXISTS `ims_stock_in_assets_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_stock_in_assets_tbl` (
  `stockInAssetID` bigint(255) NOT NULL AUTO_INCREMENT,
  `returnItemID` bigint(255) NOT NULL,
  `materialUsageID` bigint(255) DEFAULT NULL,
  `inventoryReceivingID` bigint(255) DEFAULT NULL,
  `stockOutID` bigint(255) NOT NULL,
  `inventoryCode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `inventoryStorageID` int(255) NOT NULL,
  `inventoryStorageCode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `inventoryStorageOfficeName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemID` int(255) DEFAULT NULL,
  `itemName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brand` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `classificationName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `serialNumber` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ExpirationDate` date NOT NULL,
  `ManufactureDate` date NOT NULL,
  `barcode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` decimal(15,2) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `stockInDate` date NOT NULL,
  `stockOutDate` date NOT NULL,
  PRIMARY KEY (`stockInAssetID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_stock_in_assets_tbl`
--

LOCK TABLES `ims_stock_in_assets_tbl` WRITE;
/*!40000 ALTER TABLE `ims_stock_in_assets_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_stock_in_assets_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ims_stock_in_item_tbl`
--

DROP TABLE IF EXISTS `ims_stock_in_item_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ims_stock_in_item_tbl` (
  `stockInItemID` bigint(255) NOT NULL AUTO_INCREMENT,
  `returnItemID` bigint(255) NOT NULL,
  `materialUsageID` bigint(255) DEFAULT NULL,
  `inventoryReceivingID` bigint(255) DEFAULT NULL,
  `stockOutID` bigint(255) NOT NULL,
  `inventoryCode` varchar(255) NOT NULL,
  `inventoryStorageID` int(255) NOT NULL,
  `inventoryStorageCode` varchar(255) NOT NULL,
  `inventoryStorageOfficeName` varchar(255) NOT NULL,
  `itemID` int(255) DEFAULT NULL,
  `itemCode` varchar(255) NOT NULL,
  `itemName` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `classificationName` varchar(255) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `serialNumber` varchar(255) NOT NULL,
  `ExpirationDate` date NOT NULL,
  `ManufactureDate` date NOT NULL,
  `barcode` varchar(255) NOT NULL,
  `quantity` decimal(15,2) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `stockInDate` date NOT NULL,
  `stockOutDate` date NOT NULL,
  PRIMARY KEY (`stockInItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_stock_in_item_tbl`
--

LOCK TABLES `ims_stock_in_item_tbl` WRITE;
/*!40000 ALTER TABLE `ims_stock_in_item_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `ims_stock_in_item_tbl` ENABLE KEYS */;
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
  `itemName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `barcode` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `stockInSerialNumber` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stockInQuantity` decimal(15,2) NOT NULL,
  `stockInLocationID` bigint(255) NOT NULL,
  `manufacturedDate` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expirationDate` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `StockInStatus` bigint(255) NOT NULL,
  PRIMARY KEY (`stockinID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_stock_in_tbl`
--

LOCK TABLES `ims_stock_in_tbl` WRITE;
/*!40000 ALTER TABLE `ims_stock_in_tbl` DISABLE KEYS */;
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
  `barcode` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `itemName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `inventoryStorageID` int(11) NOT NULL,
  `stockInTotalStatus` int(11) NOT NULL,
  PRIMARY KEY (`stockInTotalID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_stock_in_total_tbl`
--

LOCK TABLES `ims_stock_in_total_tbl` WRITE;
/*!40000 ALTER TABLE `ims_stock_in_total_tbl` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_transfer_request_details_tbl`
--

LOCK TABLES `ims_transfer_request_details_tbl` WRITE;
/*!40000 ALTER TABLE `ims_transfer_request_details_tbl` DISABLE KEYS */;
INSERT INTO `ims_transfer_request_details_tbl` VALUES (1,1,'ITM-21-00001',1,'00001-00001-00000','Ballpen-Black','','pieces',1,36,1,1,'2021-06-30 01:37:00','2021-06-30 01:37:00'),(2,2,'ITM-21-00030',30,'00030-00001-60287','Bank - Hel Cim Phone Payment Terminal Bank Card Reader','','pieces',1,6,1,1,'2021-06-30 01:38:25','2021-06-30 01:38:25'),(3,3,'ITM-21-00001',1,'00001-00001-00000','Ballpen-Black','','pieces',1,36,1,1,'2021-06-30 02:03:20','2021-06-30 02:03:20');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_transfer_request_tbl`
--

LOCK TABLES `ims_transfer_request_tbl` WRITE;
/*!40000 ALTER TABLE `ims_transfer_request_tbl` DISABLE KEYS */;
INSERT INTO `ims_transfer_request_tbl` VALUES (1,NULL,1,1,2,'2|3|4','2','2021-07-06 10:51:47',1,'2021-06-30','transfer item',NULL,'2021-06-30 09:36:58',1,2,'2021-06-30 09:36:58','2021-07-06 02:51:48'),(2,NULL,1,1,2,'2|3|4',NULL,NULL,1,'2021-06-30','transfer item',NULL,'2021-06-30 09:38:22',1,1,'2021-06-30 09:38:22','2021-06-30 01:38:25'),(3,NULL,1,1,2,'2|3|4',NULL,NULL,1,'2021-06-30','transfer item',NULL,'2021-06-30 10:03:17',1,1,'2021-06-30 10:03:17','2021-06-30 02:03:20');
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
  `travelType` text NOT NULL,
  `vehicleID` bigint(20) DEFAULT NULL,
  `vehicleCode` text DEFAULT NULL,
  `vehicleName` text DEFAULT NULL,
  `vehiclePlateNumber` text DEFAULT NULL,
  `vehicleGasType` text DEFAULT NULL,
  `vehicleDistance` decimal(20,2) DEFAULT NULL,
  `vehicleFuelConsumption` decimal(20,2) DEFAULT NULL,
  `travelTypeDescription` text DEFAULT NULL,
  `vehicleLiters` decimal(20,2) DEFAULT NULL,
  `unitCost` decimal(10,2) NOT NULL,
  `totalCost` decimal(10,2) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`travelRequestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_travel_request_tbl`
--

LOCK TABLES `ims_travel_request_tbl` WRITE;
/*!40000 ALTER TABLE `ims_travel_request_tbl` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ims_uom_tbl`
--

LOCK TABLES `ims_uom_tbl` WRITE;
/*!40000 ALTER TABLE `ims_uom_tbl` DISABLE KEYS */;
INSERT INTO `ims_uom_tbl` VALUES (1,'UOM-21-00001','pieces',1,'2021-05-25 23:50:02',1,1,'2021-05-25 23:50:02','2021-05-25 23:51:33'),(2,'UOM-21-00002','kilo',1,'2021-05-26 03:10:53',1,1,'2021-05-26 03:10:53','2021-05-26 03:10:53'),(3,'UOM-21-00003','pounds',1,'2021-05-26 03:11:04',1,1,'2021-05-26 03:11:04','2021-05-28 06:17:57'),(4,'UOM-21-00004','grams',1,'2021-05-27 07:27:06',1,1,'2021-05-27 07:27:06','2021-05-27 07:27:19'),(5,'UOM-21-00005','ream',1,'2021-06-01 00:44:45',1,1,'2021-06-01 00:44:45','2021-06-01 00:44:55'),(6,'UOM-21-00006','Liters',1,'2021-06-24 05:30:10',1,1,'2021-06-24 05:30:10','2021-06-24 05:30:10');
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
  `costEstimateID` bigint(20) DEFAULT NULL,
  `costEstimateCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timelineBuilderID` bigint(20) DEFAULT NULL,
  `projectCode` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectCategory` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientAddress` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billMaterialStatus` int(11) NOT NULL,
  `billMaterialReason` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billMaterialRemarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`billMaterialID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_bill_material_tbl`
--

LOCK TABLES `pms_bill_material_tbl` WRITE;
/*!40000 ALTER TABLE `pms_bill_material_tbl` DISABLE KEYS */;
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
INSERT INTO `pms_category_tbl` VALUES (1,'PCT-21-00001','Infrastructure','5','INF',1,1,1,'0000-00-00','2021-04-15 05:28:31','2021-06-29 06:36:54'),(2,'PCT-21-00002','Maintenance','5','MTN',1,1,1,'0000-00-00','2021-04-21 02:00:40','2021-06-29 06:41:41'),(3,'PCT-21-00003','Software','5','SFW',1,1,1,'0000-00-00','2021-04-21 02:01:45','2021-06-29 06:41:57'),(4,'PCT-21-00004','Hardware','5','HRW',1,1,1,'0000-00-00','2021-05-06 07:03:16','2021-06-29 06:42:07'),(5,'PCT-21-00005','test test test','5','TT',0,1,1,'0000-00-00','2021-05-26 08:07:51','2021-06-29 06:36:29');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_client_tbl`
--

LOCK TABLES `pms_client_tbl` WRITE;
/*!40000 ALTER TABLE `pms_client_tbl` DISABLE KEYS */;
INSERT INTO `pms_client_tbl` VALUES (1,'CLT-21-00001','DeltaMike Security Inc.','DSI','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','QUEZON CITY','DOÑA IMELDA','547','96 Guirayan Street','Antel','Julia Vargas','Philippines',1113,'Noemi Gaylan','noemiegaylan@tactics.com.ph','686-474-574-575','0977-801-1202','(02)-8709-5430','https://deltamikesecurity.com/','01625034928.jpg','01625034928.jpg','01625034928.jpg',1,1,1,'2021-04-15 00:02:09','2021-06-30 06:37:33'),(2,'CLT-21-00002','Ricardo\'s Coffee + Classic Cuisine','','4A','CAVITE','AMADEO','DAGATAN','','Cristanto M. Delos Reyes, Higway, Brgy. Dagatan',NULL,NULL,'Philippines',4119,'Serafino Juliano','maryanne.concio@powerhouse-academy.com','','0917 8862 210','(02) 8171 433','',NULL,NULL,NULL,1,1,1,'2021-04-15 00:26:19','0000-00-00 00:00:00'),(3,'CLT-21-00003','Powerhouse (PDCA)','','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','QUEZON CITY','BAGUMBAYAN','','28D Eastwood Excelsior Eastwood Avenue, Eastwood City',NULL,NULL,'Philippines',1110,'Mary Ann Consio','maryanne.concio@powerhouse-academy.com','','0917 8862 210','','http://www.powerhouse-academy.com',NULL,NULL,NULL,1,1,1,'2021-04-15 00:47:21','0000-00-00 00:00:00'),(4,'CLT-21-00004','Gatchallan Tangalin and Co CPAs','','NCR','NATIONAL CAPITAL REGION - SECOND DISTRICT','CITY OF PASIG','SAN ANTONIO','1709','Antel Global Corporate Center',NULL,NULL,'Philippines',1605,'Kaycee Allen Tangalin','gtc.cpas@gmail.com','667-576-565-645','0995-078-2845','(02)-5310-2930','http://www.gtcnow.com',NULL,NULL,NULL,1,1,1,'2021-04-15 02:42:10','2021-05-28 01:59:27'),(5,'CLT-21-00005','Esquared Universal Company','','01','ILOCOS SUR','VIGAN CITY','BARANGAY I (POB.)','1','Antel global corporate center','null','null','Philippines',1533,'Carlota Montefalco','carly.monty@gmail.com','324-830-402-704','0993-320-0133','(21)-1231-3540','',NULL,NULL,NULL,1,1,1,'2021-05-18 07:01:52','2021-05-31 05:33:09');
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
  `referenceCode` text DEFAULT NULL,
  `timelineBuilderID` bigint(20) DEFAULT NULL,
  `projectCode` varchar(200) DEFAULT NULL,
  `projectName` text DEFAULT NULL,
  `projectCategory` varchar(200) DEFAULT NULL,
  `clientName` text DEFAULT NULL,
  `clientAddress` text DEFAULT NULL,
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
-- Table structure for table `pms_employeetaskboard_log_tbl`
--

DROP TABLE IF EXISTS `pms_employeetaskboard_log_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_employeetaskboard_log_tbl` (
  `logID` bigint(20) NOT NULL AUTO_INCREMENT,
  `taskboardID` bigint(20) DEFAULT NULL,
  `subtaskboardID` bigint(20) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `object_label` varchar(255) DEFAULT NULL,
  `object_value` longtext DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`logID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_employeetaskboard_log_tbl`
--

LOCK TABLES `pms_employeetaskboard_log_tbl` WRITE;
/*!40000 ALTER TABLE `pms_employeetaskboard_log_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `pms_employeetaskboard_log_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_employeetaskoard_details_tbl`
--

DROP TABLE IF EXISTS `pms_employeetaskoard_details_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_employeetaskoard_details_tbl` (
  `subtaskboardID` bigint(20) NOT NULL AUTO_INCREMENT,
  `taskboardID` bigint(20) DEFAULT NULL,
  `timelineBuilderID` bigint(20) DEFAULT NULL,
  `projectMilestoneID` bigint(20) DEFAULT NULL,
  `milestoneBuilderID` bigint(20) DEFAULT NULL,
  `taskID` bigint(20) DEFAULT NULL,
  `subTaskName` varchar(255) DEFAULT NULL,
  `subTaskAssignee` text DEFAULT NULL,
  `subTaskDescription` longtext DEFAULT NULL,
  `subTaskManHours` varchar(255) DEFAULT NULL,
  `subTaskUsedHours` decimal(10,2) DEFAULT NULL,
  `subTaskStartDates` date DEFAULT NULL,
  `subTaskEndDates` date DEFAULT NULL,
  `subTaskPriority` int(50) DEFAULT NULL,
  `subTaskSeverity` int(50) DEFAULT NULL,
  `subTaskTimeLeft` decimal(10,2) DEFAULT NULL,
  `subTaskStatus` int(50) DEFAULT NULL,
  `subTaskNotes` longtext DEFAULT NULL,
  `extension` date DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`subtaskboardID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_employeetaskoard_details_tbl`
--

LOCK TABLES `pms_employeetaskoard_details_tbl` WRITE;
/*!40000 ALTER TABLE `pms_employeetaskoard_details_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `pms_employeetaskoard_details_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_employeetaskoard_tbl`
--

DROP TABLE IF EXISTS `pms_employeetaskoard_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_employeetaskoard_tbl` (
  `taskboardID` bigint(20) NOT NULL AUTO_INCREMENT,
  `timelineBuilderID` bigint(20) DEFAULT NULL,
  `projectMilestoneID` bigint(20) DEFAULT NULL,
  `milestoneBuilderID` bigint(20) DEFAULT NULL,
  `taskID` bigint(20) DEFAULT NULL,
  `taskName` varchar(255) DEFAULT NULL,
  `taskUsedHours` decimal(10,2) DEFAULT NULL,
  `taskDescription` longtext DEFAULT NULL,
  `taskStartDates` date DEFAULT NULL,
  `taskEndDates` date DEFAULT NULL,
  `taskPriority` int(50) DEFAULT NULL,
  `taskSeverity` int(50) DEFAULT NULL,
  `taskTimeLeft` decimal(10,2) DEFAULT NULL,
  `taskStatus` int(50) DEFAULT NULL,
  `taskNotes` longtext DEFAULT NULL,
  `extension` date DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`taskboardID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_employeetaskoard_tbl`
--

LOCK TABLES `pms_employeetaskoard_tbl` WRITE;
/*!40000 ALTER TABLE `pms_employeetaskoard_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `pms_employeetaskoard_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_image_taskboard_tbl`
--

DROP TABLE IF EXISTS `pms_image_taskboard_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_image_taskboard_tbl` (
  `imageID` bigint(20) NOT NULL AUTO_INCREMENT,
  `imageName` longtext DEFAULT NULL,
  `imageComment` longtext DEFAULT NULL,
  `taskBoardID` bigint(20) DEFAULT NULL,
  `subtaskboardID` bigint(20) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`imageID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_image_taskboard_tbl`
--

LOCK TABLES `pms_image_taskboard_tbl` WRITE;
/*!40000 ALTER TABLE `pms_image_taskboard_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `pms_image_taskboard_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_milestone_builder_tbl`
--

DROP TABLE IF EXISTS `pms_milestone_builder_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_milestone_builder_tbl` (
  `milestoneBuilderID` bigint(20) NOT NULL AUTO_INCREMENT,
  `phaseCode` text NOT NULL,
  `phaseDescription` text NOT NULL,
  `categoryID` bigint(20) NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`milestoneBuilderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_milestone_builder_tbl`
--

LOCK TABLES `pms_milestone_builder_tbl` WRITE;
/*!40000 ALTER TABLE `pms_milestone_builder_tbl` DISABLE KEYS */;
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
  `projectMilestoneID` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectMilestoneName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `milestoneName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `milestoneNotes` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`milestoneListID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_milestone_list_tbl`
--

LOCK TABLES `pms_milestone_list_tbl` WRITE;
/*!40000 ALTER TABLE `pms_milestone_list_tbl` DISABLE KEYS */;
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
  `requisitionStatus` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `requisitionRemarks` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vacancy` int(50) DEFAULT NULL,
  `departmentID` bigint(20) DEFAULT NULL,
  `designationID` bigint(20) DEFAULT NULL,
  `salaryPackage` decimal(10,2) DEFAULT NULL,
  `personnelReportByID` bigint(20) DEFAULT NULL,
  `radioGroup1` int(50) DEFAULT NULL,
  `radioGroup2` int(50) DEFAULT NULL,
  `personnelOption` int(11) DEFAULT NULL,
  `personnelReplacement` int(50) DEFAULT NULL,
  `personnelDuration` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `personnelOthers` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `personnelQualification` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `personnelStatement` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `personnelDescription` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `personnelDateNeeded` date DEFAULT NULL,
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `submittedAt` timestamp(1) NULL DEFAULT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`requisitionID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_personnel_requisition_tbl`
--

LOCK TABLES `pms_personnel_requisition_tbl` WRITE;
/*!40000 ALTER TABLE `pms_personnel_requisition_tbl` DISABLE KEYS */;
INSERT INTO `pms_personnel_requisition_tbl` VALUES (1,NULL,1,'2',NULL,100,1,3,100.00,23,0,1,2,0,'null','null','1. Qualifications Required\n2. Qualifications Required\n3. Qualifications Required','1. Qualifications Required\n2. Qualifications Required\n3. Qualifications Required','TEST','2021-09-14','1','2','2021-09-14 07:45:50','2021-09-13 23:45:50.0',1,1,'2021-09-13 23:45:50','2021-09-13 23:45:52');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_project_list_tbl`
--

LOCK TABLES `pms_project_list_tbl` WRITE;
/*!40000 ALTER TABLE `pms_project_list_tbl` DISABLE KEYS */;
INSERT INTO `pms_project_list_tbl` VALUES (1,'PRJ-21-00001','BlackBox - Enterprise Resource Planning System','Official Enterprise Resource Planning System of BlackBox.',1,'2021-02-23','2021-05-31',4,3,2,'4|5|6|7',1,1,0,1,'2021-04-15 02:45:49','2021-05-28 01:59:15'),(2,'PRJ-21-00002','BlackBox POS and Inventory System','Project for Inventory and POS ',1,'2021-04-29','2021-04-29',2,6,4,'1|2|3|7',1,1,0,1,'2021-04-21 05:12:03','2021-04-26 01:42:49'),(3,'PRJ-21-00003','TACs (Tax and Accounting System)','Tax and Accounting System under BlackBox. The system features recording and adjusting of transaction',3,'2020-06-02','2020-06-02',4,20,5,'1|2|3|4|6|19|22',2,1,0,1,'2021-05-14 06:10:29','2021-06-29 07:04:23'),(4,'PRJ-21-00004','Hotel Mercante Hotel Management System ','The project that involves the new and automated process of the newly created Hotel Mercante in Vigan',3,'2020-10-01','2021-02-28',5,3,4,'2|9|20',1,1,0,1,'2021-05-18 06:47:08','2021-06-29 23:57:45'),(5,'PRJ-21-00005','CCTV Lingsat','Temporary Office',1,'2021-06-10','2021-06-30',4,1,2,'3',1,1,0,1,'2021-06-10 03:36:37','2021-06-29 23:58:55');
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
INSERT INTO `pms_project_milestone_tbl` VALUES (1,'MIL-21-00001','User Acceptance Testing','Present developed system to users for further testing and feedbacks inclusive in the project\'s scope and limitation',1,0,0,'2021-04-15 02:27:44','2021-04-15 02:27:44'),(2,'MIL-21-00002','Phase Sign-off and Project Status','Official closing milestone for the specific phase and project status report',1,0,0,'2021-04-15 02:29:57','2021-04-15 02:29:57'),(3,'MIL-21-00003','Training','Provide training of a specific software or hardware to the client\'s duly authorized representatives',1,0,0,'2021-04-15 02:31:16','2021-04-15 02:31:16'),(4,'MIL-21-00004','Go-Live','Official deployment of the software or hardware to production environment, engaging it to the client\'s day to day transactions.',1,0,1,'2021-04-15 02:33:05','2021-06-29 06:16:51'),(5,'MIL-21-00005','Software Development','Software Development is the process of defining, designing, testing, and implementing a new software application or program.',1,0,1,'2021-04-21 03:20:18','2021-04-21 03:20:29'),(6,'MIL-21-00006','Software Testing','The software that the developers developed will now undergo a software testing to ensure that it will be bug-free.',1,0,0,'2021-06-29 06:43:01','2021-06-29 06:43:01');
/*!40000 ALTER TABLE `pms_project_milestone_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_sign_off_details_tbl`
--

DROP TABLE IF EXISTS `pms_sign_off_details_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_sign_off_details_tbl` (
  `signOffDetailID` bigint(21) NOT NULL AUTO_INCREMENT,
  `signOffID` bigint(21) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdBy` bigint(21) NOT NULL,
  `updatedBy` bigint(21) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`signOffDetailID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_sign_off_details_tbl`
--

LOCK TABLES `pms_sign_off_details_tbl` WRITE;
/*!40000 ALTER TABLE `pms_sign_off_details_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `pms_sign_off_details_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pms_sign_off_tbl`
--

DROP TABLE IF EXISTS `pms_sign_off_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pms_sign_off_tbl` (
  `signOffID` bigint(21) NOT NULL AUTO_INCREMENT,
  `reviseSignOffID` bigint(21) DEFAULT NULL,
  `employeeID` bigint(21) DEFAULT NULL,
  `clientID` bigint(21) DEFAULT NULL,
  `clientName` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientAddress` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timelineBuilderID` bigint(21) DEFAULT NULL,
  `projectCode` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectName` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `projectCategory` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `milestoneBuilderID` bigint(21) DEFAULT NULL,
  `phaseName` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `signOffReason` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `signOffComment` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `signOffRemarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `signOffStatus` int(11) NOT NULL,
  `submittedAt` timestamp NULL DEFAULT NULL,
  `createdBy` bigint(21) NOT NULL,
  `updatedBy` bigint(21) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`signOffID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_sign_off_tbl`
--

LOCK TABLES `pms_sign_off_tbl` WRITE;
/*!40000 ALTER TABLE `pms_sign_off_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `pms_sign_off_tbl` ENABLE KEYS */;
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
  `projectCode` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientID` bigint(20) DEFAULT NULL,
  `approversID` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversStatus` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approversDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timelineBuilderStatus` int(11) NOT NULL,
  `timelineBuilderReason` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timelineBuilderRemarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timelineStartDate` date NOT NULL,
  `timelineEndDate` date NOT NULL,
  `timelinePriorityLevel` int(2) NOT NULL,
  `timelineIssued` int(2) NOT NULL,
  `timelineProjectManager` bigint(20) NOT NULL,
  `timelineTeamMember` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timelineTeamLeader` bigint(20) NOT NULL,
  `timelineProposedBudget` decimal(20,2) NOT NULL,
  `timelineAllocatedBudget` decimal(20,2) DEFAULT NULL,
  `allocatedBudgetBy` bigint(21) DEFAULT NULL,
  `timelineBudgetStatus` int(2) NOT NULL,
  `timelineManagementBy` bigint(21) DEFAULT NULL,
  `timelineManagementStatus` int(11) DEFAULT 1,
  `timelineDesign` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `submittedAt` timestamp NULL DEFAULT current_timestamp(),
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`timelineBuilderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_timeline_builder_tbl`
--

LOCK TABLES `pms_timeline_builder_tbl` WRITE;
/*!40000 ALTER TABLE `pms_timeline_builder_tbl` DISABLE KEYS */;
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
  `assignedEmployee` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assignedManHours` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assignedDesignation` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assignedStartDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assignedEndDate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assignedDays` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assignedRegularHours` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assignedOvertimeHours` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdBy` bigint(21) NOT NULL,
  `updatedBy` bigint(21) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`timelineManagementID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_timeline_management_tbl`
--

LOCK TABLES `pms_timeline_management_tbl` WRITE;
/*!40000 ALTER TABLE `pms_timeline_management_tbl` DISABLE KEYS */;
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
  `taskName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `allottedHours` decimal(10,2) DEFAULT NULL,
  `taskStartDate` date NOT NULL,
  `taskEndDate` date NOT NULL,
  `taskRemarks` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdBy` bigint(20) NOT NULL,
  `updatedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`taskID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pms_timeline_task_list_tbl`
--

LOCK TABLES `pms_timeline_task_list_tbl` WRITE;
/*!40000 ALTER TABLE `pms_timeline_task_list_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `pms_timeline_task_list_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `web_applicant_job_tbl`
--

DROP TABLE IF EXISTS `web_applicant_job_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_applicant_job_tbl` (
  `appJobID` bigint(20) NOT NULL AUTO_INCREMENT,
  `applicantID` bigint(20) DEFAULT NULL,
  `jobID` bigint(20) DEFAULT NULL,
  `appJobStatus` int(11) NOT NULL DEFAULT 0,
  `dateApplied` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`appJobID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_applicant_job_tbl`
--

LOCK TABLES `web_applicant_job_tbl` WRITE;
/*!40000 ALTER TABLE `web_applicant_job_tbl` DISABLE KEYS */;
INSERT INTO `web_applicant_job_tbl` VALUES (1,1,2,0,'2021-09-12 19:02:15');
/*!40000 ALTER TABLE `web_applicant_job_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `web_applicant_list_tbl`
--

DROP TABLE IF EXISTS `web_applicant_list_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_applicant_list_tbl` (
  `applicantID` bigint(20) NOT NULL AUTO_INCREMENT,
  `applicantFirstname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicantMiddlename` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantLastname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicantMobile` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantEmail` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicantUsername` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicantPassword` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicantEncryptedPassword` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantProfile` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantGender` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantBirthday` date DEFAULT NULL,
  `applicantResume` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantCitizenship` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantCivilStatus` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantTIN` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantSSS` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantPhilHealth` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantPagibig` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantRegion` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantProvince` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantCity` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantBarangay` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantUnit` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantBuilding` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantStreet` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantSubdivision` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantCountry` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantZipCode` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `applicantStatus` int(11) NOT NULL,
  `reset_link` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`applicantID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_applicant_list_tbl`
--

LOCK TABLES `web_applicant_list_tbl` WRITE;
/*!40000 ALTER TABLE `web_applicant_list_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `web_applicant_list_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `web_examination_form_details_tbl`
--

DROP TABLE IF EXISTS `web_examination_form_details_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_examination_form_details_tbl` (
  `examFormDetailID` bigint(20) NOT NULL AUTO_INCREMENT,
  `examFormID` bigint(20) NOT NULL,
  `applicantAnswer` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applicantPoint` decimal(10,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`examFormDetailID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_examination_form_details_tbl`
--

LOCK TABLES `web_examination_form_details_tbl` WRITE;
/*!40000 ALTER TABLE `web_examination_form_details_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `web_examination_form_details_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `web_examination_form_tbl`
--

DROP TABLE IF EXISTS `web_examination_form_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_examination_form_tbl` (
  `examFormID` bigint(20) NOT NULL AUTO_INCREMENT,
  `applicantID` bigint(20) NOT NULL,
  `totalPoints` decimal(10,2) NOT NULL,
  `percent` decimal(10,2) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`examFormID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_examination_form_tbl`
--

LOCK TABLES `web_examination_form_tbl` WRITE;
/*!40000 ALTER TABLE `web_examination_form_tbl` DISABLE KEYS */;
/*!40000 ALTER TABLE `web_examination_form_tbl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'erpdb'
--

--
-- Dumping routines for database 'erpdb'
--
/*!50003 DROP PROCEDURE IF EXISTS `proc_get_material_withdrawal_approve` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_get_material_withdrawal_approve`(IN id BIGINT(255))
BEGIN
DECLARE materialUsageID  INT DEFAULT NULL;
-- execute data into inventory receiving --
INSERT INTO  ims_material_usage_tbl(employeeID, materialWithdrawalID,	materialWithdrawalCode, inventoryValidationID, inventoryValidationCode, materialRequestID, materialRequestCode, projectCode, projectName, projectCategory,clientCode, clientName, clientAddress, materialUsageStatus) 
SELECT 
		employeeID, 				materialWithdrawalID, 		materialWithdrawalCode, inventoryValidationID,
        inventoryValidationCode,	materialRequestID, 			materialRequestCode, 	projectCode, 			
        projectName,				projectCategory, 			clientCode, 			clientName, 			
        clientAddress,				materialUsageStatus
FROM	
(
SELECT 
		employeeID, 				materialWithdrawalID, 	materialWithdrawalCode,		inventoryValidationID, 
		inventoryValidationCode,	materialRequestID, 	 	materialRequestCode,		projectCode,
		projectName, 				projectCategory,		clientCode,					clientName,
        clientAddress,	 'O' AS materialUsageStatus
FROM ims_material_withdrawal_tbl 
WHERE materialWithdrawalID =id AND inventoryItemStatus = 1
)w;
-- get inventory receiving ID--
 SET materialUsageID  = LAST_INSERT_ID();
 -- end of inventory receiving ID - 
-- end of execute --
-- execute data into request details --
INSERT INTO ims_inventory_request_details_tbl(materialUsageID, recordID, itemID, itemCode, Brand, itemName, classificationName, quantity)	
SELECT materialUsageID , recordID, itemID, itemCode, Brand, itemName, classificationName, quantity
FROM 
(
	SELECT '0' AS recordID, 				itemID,
			itemCode, 						itemBrandName AS Brand, 
			itemName, 						itemClassification AS classificationName,
			itemCategory AS categoryName, 	itemUom AS uom, 
            remaining AS quantity
	FROM ims_material_withdrawal_item_tbl AS ri
	LEFT JOIN ims_material_withdrawal_tbl AS po ON ri.materialWithdrawalID = po.materialWithdrawalID
	WHERE po.materialWithdrawalID = id AND po.inventoryItemStatus = 1
)a; 

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `proc_get_purchase_order_approve` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_get_purchase_order_approve`(IN id BIGINT(255))
BEGIN
DECLARE inventoryReceivingID INT DEFAULT NULL;
-- execute data into inventory receiving --
INSERT INTO  ims_inventory_receiving_tbl(employeeID, purchaseOrderID,purchaseOrderCode, timelineBuilderID, projectCode, projectName, projectCategory, clientCode,clientName, clientAddress,inventoryReceivingStatus) 
SELECT 
		employeeID, 		purchaseOrderID, purchaseOrderCode,
		timelineBuilderID, 	projectCode,	 projectName,
		projectCategory, 	clientCode, 	clientName, 
		clientAddress,		inventoryReceivingStatus
FROM
(
SELECT 
		employeeID, 		purchaseOrderID, purchaseOrderCode,	timelineBuilderID, 
		projectCode,		projectName, 	 projectCategory,	clientCode,
		clientName, 		clientAddress,	 'O' AS inventoryReceivingStatus
FROM ims_purchase_order_tbl 
WHERE purchaseOrderID =id AND purchaseOrderStatus = 2
)w;
-- get inventory receiving ID--
 SET inventoryReceivingID = LAST_INSERT_ID();
 -- end of inventory receiving ID - 
-- end of execute --
-- execute data into request details --
INSERT INTO ims_inventory_request_details_tbl(inventoryReceivingID, recordID, itemID, itemCode, Brand, itemName, classificationName, quantity)	
SELECT inventoryReceivingID, recordID, itemID, itemCode, Brand, itemName, classificationName, quantity
FROM 
(
	SELECT '0' AS recordID, 				itemID,
			itemCode, 						itemBrandName AS Brand, 
			itemName, 						itemClassification AS classificationName,
			itemCategory AS categoryName, 	itemUom AS uom, 
            forPurchase AS quantity
	FROM ims_request_items_tbl AS ri
	LEFT JOIN ims_purchase_order_tbl AS po ON ri.purchaseOrderID = po.purchaseOrderID
	WHERE po.purchaseOrderID = id AND purchaseOrderStatus = 2
	UNION ALL
	SELECT '1' AS recordID, 				assetID AS itemID, 
			assetCode AS itemCode, 			assetBrandName AS Brand, 
			assetName AS itemName,			assetClassification AS classificationName,
			assetCategory AS categoryName,	assetUom AS uom,
            forPurchase AS quantity
	FROM ims_request_assets_tbl AS ra
	LEFT JOIN ims_purchase_order_tbl AS po ON ra.purchaseOrderID = po.purchaseOrderID
	WHERE ra.purchaseOrderID = id AND purchaseOrderStatus = 2
)a; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_update_bid_po_items`(IN `iBidRecapID` BIGINT(21), IN `iInventoryVendorID` BIGINT(21), IN `documentStatus` INT(11))
BEGIN
	DECLARE itemStatus INT(11) DEFAULT 0;
    DECLARE primaryKey BIGINT(21);
    
    IF (documentStatus <> 3 AND documentStatus <> 4) THEN
		SET itemStatus = 1;
    ELSE 
		SET itemStatus = 0;
    END IF;

	IF (iBidRecapID <> 0 AND iInventoryVendorID <> 0) THEN
		SELECT bidPoID INTO primaryKey FROM ims_bid_po_tbl WHERE bidRecapID = iBidRecapID AND inventoryVendorID = iInventoryVendorID;
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

-- Dump completed on 2021-09-27 13:54:32
