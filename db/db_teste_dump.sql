-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: dojotech_teste
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `midia`
--

DROP TABLE IF EXISTS `midia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `midia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `alt` varchar(255) DEFAULT NULL,
  `id_projeto` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_projeto` (`id_projeto`),
  CONSTRAINT `midia_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projeto` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `midia`
--

LOCK TABLES `midia` WRITE;
/*!40000 ALTER TABLE `midia` DISABLE KEYS */;
/*!40000 ALTER TABLE `midia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ods`
--

DROP TABLE IF EXISTS `ods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `url_imagem` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ods`
--

LOCK TABLES `ods` WRITE;
/*!40000 ALTER TABLE `ods` DISABLE KEYS */;
INSERT INTO `ods` VALUES (1,'Erradica├º├úo da Pobreza','../img/ods/ods_1.svg','2023-08-15 13:10:29','2023-08-15 13:10:29'),(2,'Fome Zero e Agricultura Sustent├ível','../img/ods/ods_2.svg','2023-08-15 13:10:29','2023-08-15 13:10:29'),(3,'Sa├║de e Bem-Estar','../img/ods/ods_3.svg','2023-08-15 13:10:29','2023-08-15 13:10:29'),(4,'Educa├º├úo de Qualidade','../img/ods/ods_4.svg','2023-08-15 13:10:29','2023-08-15 13:10:29'),(5,'Igualdade de G├¬nero','../img/ods/ods_5.svg','2023-08-15 13:10:29','2023-08-15 13:10:29'),(6,'├ügua Pot├ível e Saneamento','../img/ods/ods_6.svg','2023-08-15 13:10:29','2023-08-15 13:10:29'),(7,'Energia Limpa e Acess├¡vel','../img/ods/ods_7.svg','2023-08-15 13:10:29','2023-08-15 13:10:29'),(8,'Trabalho Decente e Crescimento Econ├┤mico','../img/ods/ods_8.svg','2023-08-15 13:10:29','2023-08-15 13:10:29'),(9,'Ind├║stria, Inova├º├úo e Infraestrutura','../img/ods/ods_9.svg','2023-08-15 13:10:29','2023-08-15 13:10:29'),(10,'Redu├º├úo das Desigualdades','../img/ods/ods_10.svg','2023-08-15 13:10:29','2023-08-15 13:10:29'),(11,'Cidades e Comunidades Sustent├íveis','../img/ods/ods_11.svg','2023-08-15 13:10:29','2023-08-15 13:10:29'),(12,'Consumo e Produ├º├úo Respons├íveis','../img/ods/ods_12.svg','2023-08-15 13:10:29','2023-08-15 13:10:29'),(13,'A├º├úo Contra a Mudan├ºa Global do Clima','../img/ods/ods_13.svg','2023-08-15 13:10:29','2023-08-15 13:10:29'),(14,'Vida na ├ügua','../img/ods/ods_14.svg','2023-08-15 13:10:29','2023-08-15 13:10:29'),(15,'Vida Terrestre','../img/ods/ods_15.svg','2023-08-15 13:10:29','2023-08-15 13:10:29'),(16,'Paz, Justi├ºa e Institui├º├Áes Eficazes','../img/ods/ods_16.svg','2023-08-15 13:10:29','2023-08-15 13:10:29'),(17,'Parcerias e Meios de Implementa├º├úo','../img/ods/ods_17.svg','2023-08-15 13:10:29','2023-08-15 13:10:29');
/*!40000 ALTER TABLE `ods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto`
--

DROP TABLE IF EXISTS `projeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projeto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `causa` varchar(255) NOT NULL,
  `objetivo` varchar(255) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `parceiros` varchar(255) NOT NULL,
  `publico_alvo` varchar(255) NOT NULL,
  `resumo` text NOT NULL,
  `id_usuario` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `projeto_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto`
--

LOCK TABLES `projeto` WRITE;
/*!40000 ALTER TABLE `projeto` DISABLE KEYS */;
INSERT INTO `projeto` VALUES (1,'Tramanda├¡ mais Verde','Reflorestamento e arboriza├º├úo','Arborizar os espa├ºos p├║blicos de Tramanda├¡','Tramanda├¡ - RS','Sesc,Senac,Sindicato,Prefeitura Municipal de Tramanda├¡','Moradores e frequentadores de Tramanda├¡','O objetivo do projeto Tramanda├¡ mais Verde ├® arborizar os espa├ºos p├║blicos de Tramanda├¡ e, com isso, propiciar uma melhoria no bem-estar dos cidad├úos, bem como contribuir para a melhoria da qualidade do ar e da sensa├º├úo t├®rmica, entre outros benef├¡cios. Para atingir esse objetivo foi estruturado um projeto em conjunto com diversos parceiros, com a meta de plantar 5.000 ├írvores em espa├ºos p├║blicos da cidade, em 5 anos.',1,'2023-08-15 13:10:29','2023-08-15 13:10:29'),(2,'Alvorada mais Verde','Reflorestamento e arboriza├º├úo','Arborizar os espa├ºos p├║blicos de Alvorada','Alvorada - RS','Sesc,Senac,Sindicato,Prefeitura Municipal de Alvorada','Moradores e frequentadores de Alvorada','O objetivo do projeto Alvorada mais Verde ├® arborizar os espa├ºos p├║blicos de Alvorada e, com isso, propiciar uma melhoria no bem-estar dos cidad├úos, bem como contribuir para a melhoria da qualidade do ar e da sensa├º├úo t├®rmica, entre outros benef├¡cios. Para atingir esse objetivo foi estruturado um projeto em conjunto com diversos parceiros, com a meta de plantar 5.000 ├írvores em espa├ºos p├║blicos da cidade, em 5 anos.',2,'2023-08-15 13:10:29','2023-08-15 13:10:29'),(3,'Projeto Lorem Ipsum','Lorem ipsum dolor sit amet.','Lorem ipsum dolor sit amet','Porto Alegre - RS','Lorem, Ipsum, Dolor','Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet, consectetur adipiscing elit.',2,'2023-08-15 13:14:39','2023-08-15 13:14:39');
/*!40000 ALTER TABLE `projeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto_ods`
--

DROP TABLE IF EXISTS `projeto_ods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projeto_ods` (
  `id_projeto` int NOT NULL,
  `id_ods` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_projeto`,`id_ods`),
  KEY `id_ods` (`id_ods`),
  CONSTRAINT `projeto_ods_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projeto` (`id`) ON DELETE CASCADE,
  CONSTRAINT `projeto_ods_ibfk_2` FOREIGN KEY (`id_ods`) REFERENCES `ods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto_ods`
--

LOCK TABLES `projeto_ods` WRITE;
/*!40000 ALTER TABLE `projeto_ods` DISABLE KEYS */;
INSERT INTO `projeto_ods` VALUES (1,11,'2023-08-15 13:10:29','2023-08-15 13:10:29'),(1,13,'2023-08-15 13:10:29','2023-08-15 13:10:29'),(1,15,'2023-08-15 13:10:29','2023-08-15 13:10:29'),(2,11,'2023-08-15 13:10:29','2023-08-15 13:10:29'),(2,13,'2023-08-15 13:10:29','2023-08-15 13:10:29'),(2,15,'2023-08-15 13:10:29','2023-08-15 13:10:29'),(3,3,'2023-08-15 13:14:39','2023-08-15 13:14:39'),(3,6,'2023-08-15 13:14:39','2023-08-15 13:14:39'),(3,9,'2023-08-15 13:14:39','2023-08-15 13:14:39'),(3,12,'2023-08-15 13:14:39','2023-08-15 13:14:39');
/*!40000 ALTER TABLE `projeto_ods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20230413145343-create-ods.js'),('20230413154321-create-usuario.js'),('20230413154425-create-projeto.js'),('20230413154610-create-midia.js'),('20230413160139-create-projeto_ods.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `hash_senha` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `cep` varchar(255) NOT NULL,
  `logradouro` varchar(255) NOT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `bairro` varchar(255) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `uf` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Juca da Silva','juca@projetosomar.com','juca_s','ddbef2b610e422b4985c268c015a55e27e69a911790187413a2adf52bc3647e375d74c58d0c824b74572a469314ea28653006f85d1971d6fcf1fb03c9fbec6ec','2ceb3b70c876ad982127be383fc71a39','51 98765-0987','90040191','Avenida Ven├óncio Aires',NULL,'93','Azenha','Porto Alegre','RS','2023-08-15 13:10:29','2023-08-15 13:10:29'),(2,'S├¡lvia Dias','silvia@projetosomar.com','silviads','e3d8dbfe489a0009f42cbc8beae4580439949d431ca109331d293f73be28b4abd23e028b7d7ddf20d4c293f0af08f1d59cf46ef03be5ba51fdba07b26dcfff43','4da5646341c2a95935fd8ff1b2930b99','51 99875-0876','90040191','Avenida Ven├óncio Aires',NULL,'93','Azenha','Porto Alegre','RS','2023-08-15 13:10:29','2023-08-15 13:10:29');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-15 11:13:07
